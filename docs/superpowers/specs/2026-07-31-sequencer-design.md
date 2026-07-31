# R1b-d: Session Sequencer — Design Spec

**Date:** 2026-07-31
**Status:** Draft for review
**Depends on:** Skill graph (done — 45 nodes, 49 edges), mastery model (done — decay, update, batch persistence), node selection (done — `eligibility.ts`, `select.ts`, `level.ts`), item bank operations (done — R1b-c), diagnosis pipeline (done — ActionPlan with RemediationStep[])

---

## Goal

Wire together the existing node selection and item bank into a single function that assembles a practice session: "given this learner's current state, what should they practice next?" The spec calls this the thing behind the "continue" button — the learner presses one button, the sequencer decides everything.

Three new modules:

1. **Diagnosis bridge** — converts a diagnosis ActionPlan into priority boosts for `selectNext()`
2. **Session assembly** — orchestrates: load state → boost from diagnosis → select nodes → fetch items → interleave → return plan
3. **Practice session persistence** — stores session plans and their completion state (mock test sessions already have a table; practice sessions do not)

---

## Why now

The generation pipeline produces items. The item bank stores and queries them. The mastery model tracks learner state. The node selector picks what to practice. But nothing orchestrates the flow from "learner presses continue" to "here are your next 10 items." Without this:

- The "continue" button cannot exist
- Practice has no persistence — if the learner closes the tab, progress is lost
- Diagnosis produces an action plan that nobody consumes
- The learning loop is incomplete: items exist but are never served

---

## Module 1: Diagnosis bridge

**File:** `src/sequencer/diagnosis-bridge.ts`

### The problem

After a mock test, diagnosis produces an `ActionPlan` with ordered `RemediationStep[]` — each naming a `nodeId`, a `rootCause`, and `prerequisiteNodeIds`. The sequencer's `selectNext()` already ranks nodes by priority, but it has no concept of "this node was flagged by a diagnosis." Without a bridge, post-diagnosis practice is indistinguishable from random practice.

### Function

#### `boostFromDiagnosis(candidates, actionPlan): Candidate[]`

Pure function. Takes the candidates that `selectNext()` would normally return and boosts those that appear in the diagnosis action plan.

```typescript
interface Candidate {
  node: SkillNode
  reason: 'review' | 'new' | 'remediation'
  priority: number
}
```

Logic:

1. Build a set of `nodeId`s from `actionPlan.steps`
2. For each candidate whose `nodeId` is in the set:
   - Add `2000` to its priority (outranks both review at ~1000 and new at ~100)
   - Change `reason` to `'remediation'`
3. Re-sort by priority descending
4. Return the boosted list

### Why a separate function

- Keeps `selectNext()` pure and unchanged — no new parameters, no coupling to diagnosis types
- Testable independently: "given these candidates and this action plan, these nodes get boosted"
- The boost is applied *after* `selectNext()` so eligibility gating still applies — a diagnosis cannot recommend a node whose prerequisites have decayed

### Extending `Candidate.reason`

The existing `Candidate` type has `reason: 'review' | 'new'`. This spec adds `'remediation'` as a third option. The change is in `select.ts`'s type definition — a one-line edit.

---

## Module 2: Session assembly

**File:** `src/sequencer/assemble.ts`

### The problem

The consumer (API route, client) needs one call: "give me a session for this learner." Currently that requires manually loading mastery, loading the graph, calling `selectNext`, calling `findItemsByNodes`, and interleaving items. This ceremony should be one function.

### Function

#### `assembleSession(db, learnerId, options?): Promise<SessionPlan>`

```typescript
interface AssembleOptions {
  // Maximum number of items in the session. Default 10.
  maxItems?: number
  // Maximum number of nodes to select. Default 6.
  maxNodes?: number
  // Items the learner has already seen (e.g. earlier in the same sitting).
  excludeItemIds?: string[]
  // If provided, remediation nodes from this plan get priority.
  actionPlan?: ActionPlan
}

interface SessionPlan {
  // Ordered list of items to present.
  items: SessionItem[]
  // Unique node IDs covered in this session.
  nodeIds: string[]
  // Estimated session duration in minutes (items × 30 seconds baseline).
  estimatedMinutes: number
}

interface SessionItem {
  item: McqItem
  // The primary node this item targets (from item.nodeIds[0]).
  nodeId: string
  // Why this node was selected.
  reason: 'review' | 'new' | 'remediation'
}
```

### Flow

1. **Load state** — `listMastery(db, learnerId)`, `listNodes(db)`, `listEdges(db)`. Three parallel reads.
2. **Select nodes** — Call `selectNext({ nodes, edges, mastery, now, limit: maxNodes })`.
3. **Boost from diagnosis** — If `actionPlan` is provided, call `boostFromDiagnosis(candidates, actionPlan)`.
4. **Fetch items** — Call `findItemsByNodes(db, candidateNodeIds, { excludeIds, limit: maxItems * 2 })`. Fetch 2× to have room for per-node balancing.
5. **Allocate items per node** — Distribute items across selected nodes:
   - Each node gets at least 1 item, up to `ceil(maxItems / nodeCount)`.
   - If a node has zero items in the bank, drop it silently (the bank may be sparse early on).
6. **Interleave** — Arrange items so no two consecutive items target the same node. Same algorithm as `interleaveByType` in `select.ts`, adapted for items instead of candidates.
7. **Cap at maxItems** — Slice to the configured limit.
8. **Return** — `SessionPlan` with items, nodeIds, and estimatedMinutes (items.length × 0.5).

### Edge cases

- **Empty item bank**: returns `{ items: [], nodeIds: [], estimatedMinutes: 0 }`. The caller renders "no items available yet" — not an error.
- **Learner with no mastery records** (brand new, pre-placement): `selectNext` returns the lowest-level nodes with no prerequisites. This is correct — they start at the bottom.
- **All nodes are solid** (retained >= 0.75, nothing new eligible): `selectNext` returns empty. Session has zero items. The caller renders "you're all caught up" — this is the desired state.
- **Diagnosis references nodes outside the eligible set**: the boost is applied after eligibility gating, so ineligible nodes are never in the candidate list and the boost is a no-op for them. This is correct — if a prerequisite has decayed, the learner needs to review that first.

### What this does NOT do

- **Record outcomes** — that's `recordOutcomes()` in the mastery service, called at session end by the client.
- **Record item statistics** — that's `recordAttempt()` in `statistics.ts`, called at session end.
- **Manage session state** — the client holds item state locally. The server creates the plan and receives the results.
- **Version-pin items** — items are fetched once at session start. The session plan is immutable; the client works through it. If an item version changes mid-session, it doesn't affect the learner because they already have the payload.

---

## Module 3: Practice session persistence

**File:** `src/sequencer/session-store.ts`

### The problem

Mock test sessions have `test_sessions` in the DB. Practice sessions have nothing. If the learner closes the tab mid-session, everything is lost. The spec says outcomes are batched at session end, which means the client needs to know what session it's in and the server needs to store the plan for resume.

### Schema addition

New table `practice_sessions`:

```
practice_sessions
├── id              TEXT PK
├── learner_id      TEXT FK → learners.id
├── status          TEXT ('in_progress' | 'completed' | 'abandoned')
├── plan            JSON (the full SessionPlan)
├── progress        INTEGER (number of items completed so far)
├── started_at      INTEGER (epoch ms)
├── completed_at    INTEGER (epoch ms, nullable)
├── updated_at      INTEGER (epoch ms)
└── INDEX on (learner_id, status)
```

### Functions

#### `createPracticeSession(db, learnerId, plan, now): Promise<string>`

Insert a new row with status `'in_progress'`, progress `0`. Returns the session ID.

#### `updateProgress(db, sessionId, progress, now): Promise<void>`

Update the `progress` counter. Called periodically by the client to enable resume (e.g. every 3 items, or on tab blur).

#### `completePracticeSession(db, sessionId, now): Promise<void>`

Set status to `'completed'`, `completed_at` to `now`.

#### `abandonPracticeSession(db, sessionId, now): Promise<void>`

Set status to `'abandoned'`, `completed_at` to `now`.

#### `findActiveSession(db, learnerId): Promise<PracticeSessionRow | null>`

Find the most recent `in_progress` session for a learner. Returns null if none. Used on app open to resume where they left off.

#### `getPracticeSession(db, sessionId): Promise<PracticeSessionRow | null>`

Fetch a session by ID.

### Why not reuse `test_sessions`

Different lifecycle. Mock tests have an exam ID, sections, and scores. Practice sessions have a plan, progress counter, and no scoring. Combining them would require nullable columns for both shapes and type-guarding everywhere. Two focused tables is cleaner.

---

## Types summary

### New types

```typescript
// diagnosis-bridge.ts
// (no new types — extends Candidate.reason to include 'remediation')

// assemble.ts
interface AssembleOptions {
  maxItems?: number
  maxNodes?: number
  excludeItemIds?: string[]
  actionPlan?: ActionPlan
}

interface SessionPlan {
  items: SessionItem[]
  nodeIds: string[]
  estimatedMinutes: number
}

interface SessionItem {
  item: McqItem
  nodeId: string
  reason: 'review' | 'new' | 'remediation'
}

// session-store.ts
interface PracticeSessionRow {
  id: string
  learnerId: string
  status: 'in_progress' | 'completed' | 'abandoned'
  plan: SessionPlan
  progress: number
  startedAt: number
  completedAt: number | null
  updatedAt: number
}
```

### Modified types

```typescript
// select.ts — Candidate.reason
reason: 'review' | 'new'  →  reason: 'review' | 'new' | 'remediation'
```

### Existing types consumed

- `McqItem` from `@/items/types`
- `SkillNode`, `SkillEdge`, `CefrLevel`, `SkillArea` from `@/skill-graph/types`
- `MasteryRecord` from `@/mastery/types`
- `Candidate`, `SelectInput` from `@/sequencer/select`
- `ActionPlan`, `RemediationStep` from `@/diagnosis/types`
- `Db` from `@/db/client`

---

## Files changed

| File | Change |
|---|---|
| `src/sequencer/diagnosis-bridge.ts` | **Create** — `boostFromDiagnosis` pure function |
| `src/sequencer/assemble.ts` | **Create** — `assembleSession` orchestrator |
| `src/sequencer/session-store.ts` | **Create** — practice session CRUD |
| `src/db/schema/practice-sessions.ts` | **Create** — new table definition |
| `src/db/schema/index.ts` | **Modify** — re-export new schema |
| `src/sequencer/select.ts` | **Modify** — extend `Candidate.reason` type to include `'remediation'` |
| `tests/sequencer/diagnosis-bridge.test.ts` | **Create** — ~6 tests |
| `tests/sequencer/assemble.test.ts` | **Create** — ~8 tests |
| `tests/sequencer/session-store.test.ts` | **Create** — ~6 tests |

---

## What this does NOT include (and why)

| Excluded | Reason |
|---|---|
| Outcome recording | Already exists: `recordOutcomes()` in mastery service, `recordAttempt()` in statistics |
| Level estimation | Already exists: `estimateLevels()` in `level.ts` |
| Eligibility checking | Already exists: `eligibleNodes()` in `eligibility.ts` |
| API routes | R1c (API layer) — this is the domain logic only |
| Client-side session management | Frontend concern — this provides the server contract |
| Adaptive item difficulty within a session | R1b-g (statistics pipeline needs p-value data first) |
| Lesson sequencing | R1b-f (source connectors create lessons first) |

---

## What this enables

After R1b-d, the "continue" button works end-to-end:

```
Learner presses "continue"
        ↓
assembleSession(db, learnerId, { actionPlan })
        ↓
┌─ listMastery ──┐
│  listNodes     │ ← 3 parallel reads
│  listEdges     │
└────────────────┘
        ↓
selectNext (eligibility + priority ranking)
        ↓
boostFromDiagnosis (if action plan provided)
        ↓
findItemsByNodes (from item bank)
        ↓
interleave + cap
        ↓
SessionPlan { items, nodeIds, estimatedMinutes }
        ↓
createPracticeSession (persist for resume)
        ↓
Client works through items locally
        ↓
On completion: recordOutcomes + recordAttempt + completePracticeSession
```

The learning loop is closed. Diagnosis feeds back into practice. Mastery drives what comes next.
