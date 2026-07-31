# Session Sequencer (R1b-d) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire together node selection and item bank into a single `assembleSession()` call that produces a practice session, with diagnosis-driven priority boosting and practice session persistence.

**Architecture:** Three new files under `src/sequencer/` (diagnosis bridge, session assembly, session store), one new schema file, one type extension. All additive except a one-line type change in `select.ts`. Pure functions where possible; DB access only in the session store and assembly orchestrator.

**Tech Stack:** TypeScript, Drizzle ORM (libSQL/Turso), Vitest

## Global Constraints

- All code uses `//` comments throughout for learning
- All DB-accessing functions take `Db` as the first parameter
- No new npm dependencies
- Tests use `makeTestDb()` from `tests/helpers/test-db.ts`
- Timestamps are epoch milliseconds stored as `INTEGER`
- Follow existing patterns: `test-sessions.ts` schema for table definition, `test-sessions` repository for CRUD, `select.test.ts` for sequencer test helpers

---

### Task 1: Diagnosis Bridge + Candidate Type Extension

**Files:**
- Modify: `src/sequencer/select.ts:27` (extend `Candidate.reason` type)
- Create: `src/sequencer/diagnosis-bridge.ts`
- Create: `tests/sequencer/diagnosis-bridge.test.ts`

**Interfaces:**
- Consumes: `Candidate` from `@/sequencer/select`, `ActionPlan` and `RemediationStep` from `@/diagnosis/types`
- Produces: `boostFromDiagnosis(candidates: Candidate[], actionPlan: ActionPlan): Candidate[]`

- [ ] **Step 1: Extend `Candidate.reason` type**

In `src/sequencer/select.ts`, change line 27:

```typescript
// Before:
  reason: 'review' | 'new'

// After:
  reason: 'review' | 'new' | 'remediation'
```

- [ ] **Step 2: Run existing sequencer tests to verify no regression**

Run: `npx vitest run tests/sequencer/ --reporter verbose`
Expected: All existing tests pass (the new union member doesn't break anything).

- [ ] **Step 3: Write the failing tests**

Create `tests/sequencer/diagnosis-bridge.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { boostFromDiagnosis } from '@/sequencer/diagnosis-bridge'
import type { Candidate } from '@/sequencer/select'
import type { SkillNode } from '@/skill-graph/types'
import type { ActionPlan } from '@/diagnosis/types'

function node(id: string, level: SkillNode['level'] = 'B1'): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

function candidate(id: string, reason: Candidate['reason'], priority: number): Candidate {
  return { node: node(id), reason, priority }
}

// An action plan that flags node 'b' and 'c' for remediation.
const PLAN: ActionPlan = {
  steps: [
    { order: 1, nodeId: 'b', nodeTitle: 'B', rootCause: 'knowledge', activity: 'drill', estimatedMinutes: 10, prerequisiteNodeIds: [] },
    { order: 2, nodeId: 'c', nodeTitle: 'C', rootCause: 'processing', activity: 'drill', estimatedMinutes: 5, prerequisiteNodeIds: [] },
  ],
  totalEstimatedMinutes: 15,
  gapCount: 2,
}

describe('boostFromDiagnosis', () => {
  it('boosts candidates that appear in the action plan', () => {
    const candidates = [
      candidate('a', 'new', 94),
      candidate('b', 'review', 1010),
      candidate('c', 'new', 93),
    ]

    const result = boostFromDiagnosis(candidates, PLAN)

    // 'b' and 'c' should now be remediation with +2000 priority.
    const boosted = result.filter((c) => c.reason === 'remediation')
    expect(boosted).toHaveLength(2)
    expect(boosted.map((c) => c.node.id)).toContain('b')
    expect(boosted.map((c) => c.node.id)).toContain('c')
  })

  it('remediation outranks review and new', () => {
    const candidates = [
      candidate('a', 'review', 1050),
      candidate('b', 'new', 94),
    ]

    const result = boostFromDiagnosis(candidates, {
      steps: [{ order: 1, nodeId: 'b', nodeTitle: 'B', rootCause: 'knowledge', activity: 'drill', estimatedMinutes: 10, prerequisiteNodeIds: [] }],
      totalEstimatedMinutes: 10,
      gapCount: 1,
    })

    // 'b' should be first (94 + 2000 = 2094 > 1050).
    expect(result[0]!.node.id).toBe('b')
    expect(result[0]!.reason).toBe('remediation')
  })

  it('leaves non-matching candidates unchanged', () => {
    const candidates = [
      candidate('a', 'new', 94),
      candidate('d', 'review', 1010),
    ]

    const result = boostFromDiagnosis(candidates, PLAN)

    // Neither 'a' nor 'd' is in the plan — no change.
    expect(result[0]!.reason).toBe('review')
    expect(result[0]!.node.id).toBe('d')
    expect(result[1]!.reason).toBe('new')
    expect(result[1]!.node.id).toBe('a')
  })

  it('handles an empty action plan', () => {
    const candidates = [candidate('a', 'new', 94)]
    const emptyPlan: ActionPlan = { steps: [], totalEstimatedMinutes: 0, gapCount: 0 }

    const result = boostFromDiagnosis(candidates, emptyPlan)
    expect(result).toHaveLength(1)
    expect(result[0]!.reason).toBe('new')
  })

  it('handles empty candidates', () => {
    const result = boostFromDiagnosis([], PLAN)
    expect(result).toHaveLength(0)
  })

  it('preserves relative order within boosted candidates', () => {
    const candidates = [
      candidate('b', 'review', 1020),
      candidate('c', 'review', 1010),
    ]

    const result = boostFromDiagnosis(candidates, PLAN)

    // Both boosted by 2000. 'b' was 1020 → 3020, 'c' was 1010 → 3010.
    expect(result[0]!.node.id).toBe('b')
    expect(result[1]!.node.id).toBe('c')
  })
})
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npx vitest run tests/sequencer/diagnosis-bridge.test.ts --reporter verbose`
Expected: FAIL — module `@/sequencer/diagnosis-bridge` does not exist.

- [ ] **Step 5: Write the implementation**

Create `src/sequencer/diagnosis-bridge.ts`:

```typescript
import type { ActionPlan } from '@/diagnosis/types'
import type { Candidate } from './select'

// Priority boost for remediation candidates. 2000 outranks both review
// (~1000) and new (~100), so diagnosis-flagged nodes always come first.
const REMEDIATION_BOOST = 2000

// Boost candidates that appear in a diagnosis action plan. Changes their
// reason to 'remediation' and adds REMEDIATION_BOOST to their priority.
// Re-sorts by priority descending so the caller gets the final ordering.
//
// This is applied *after* selectNext() so eligibility gating has already
// run — a diagnosis cannot promote a node whose prerequisites have decayed.
export function boostFromDiagnosis(
  candidates: Candidate[],
  actionPlan: ActionPlan,
): Candidate[] {
  if (candidates.length === 0 || actionPlan.steps.length === 0) return candidates

  // Build a lookup set from the action plan's node IDs.
  const remediationNodeIds = new Set(actionPlan.steps.map((s) => s.nodeId))

  const boosted = candidates.map((c) => {
    if (!remediationNodeIds.has(c.node.id)) return c
    return {
      ...c,
      reason: 'remediation' as const,
      priority: c.priority + REMEDIATION_BOOST,
    }
  })

  // Re-sort by priority descending. Stable sort preserves original order
  // for equal priorities.
  boosted.sort((a, b) => b.priority - a.priority)

  return boosted
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run tests/sequencer/diagnosis-bridge.test.ts --reporter verbose`
Expected: All 6 tests pass.

- [ ] **Step 7: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 931+ tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/sequencer/select.ts src/sequencer/diagnosis-bridge.ts tests/sequencer/diagnosis-bridge.test.ts
git commit -m "feat(sequencer): add diagnosis bridge for remediation priority

boostFromDiagnosis takes selectNext() candidates and action plan,
boosts gap nodes by +2000 priority with 'remediation' reason.
Candidate.reason extended to include 'remediation'.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Practice Session Schema + Store

**Files:**
- Create: `src/db/schema/practice-sessions.ts`
- Modify: `src/db/schema/index.ts:10` (add re-export)
- Create: `src/sequencer/session-store.ts`
- Create: `tests/sequencer/session-store.test.ts`

**Interfaces:**
- Consumes: `learners` from `@/db/schema/learners`, `generateId` from `@/db/id`, `Db` from `@/db/client`
- Produces:
  - Table: `practiceSessions`
  - `createPracticeSession(db, learnerId, plan, now): Promise<string>`
  - `updateProgress(db, sessionId, progress, now): Promise<void>`
  - `completePracticeSession(db, sessionId, now): Promise<void>`
  - `abandonPracticeSession(db, sessionId, now): Promise<void>`
  - `findActivePracticeSession(db, learnerId): Promise<PracticeSessionRow | null>`
  - `getPracticeSession(db, sessionId): Promise<PracticeSessionRow | null>`

- [ ] **Step 1: Create the schema file**

Create `src/db/schema/practice-sessions.ts`:

```typescript
import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'

// Practice session lifecycle — matches test_sessions convention.
export const PRACTICE_SESSION_STATUSES = ['in_progress', 'completed', 'abandoned'] as const
export type PracticeSessionStatus = (typeof PRACTICE_SESSION_STATUSES)[number]

// Practice sessions — the "continue" button's state.
//
// Unlike test_sessions which store a full state machine, practice sessions
// store the session plan (the items chosen by the sequencer) and a progress
// counter (how many the learner has completed). The client works through
// the plan locally; this table enables resume on tab close/reopen.
export const practiceSessions = sqliteTable(
  'practice_sessions',
  {
    id: text('id').primaryKey(),

    // Which learner owns this session.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // Lifecycle status.
    status: text('status').notNull(),

    // The full SessionPlan as JSON — items, nodeIds, estimatedMinutes.
    plan: text('plan', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),

    // How many items the learner has completed (0-based). Updated
    // periodically by the client for resume support.
    progress: integer('progress').notNull().default(0),

    startedAt: integer('started_at').notNull(),
    completedAt: integer('completed_at'),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    // "My active practice session" — the resume query on app load.
    learnerStatusIdx: index('practice_sessions_learner_status_idx').on(
      t.learnerId,
      t.status,
    ),
  }),
)
```

- [ ] **Step 2: Add re-export to barrel**

In `src/db/schema/index.ts`, add after line 9:

```typescript
export * from './practice-sessions'
```

- [ ] **Step 3: Generate the migration**

Run: `npx drizzle-kit generate`
Expected: A new migration file `drizzle/0003_*.sql` with `CREATE TABLE practice_sessions`.

- [ ] **Step 4: Write the failing tests**

Create `tests/sequencer/session-store.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import {
  createPracticeSession,
  updateProgress,
  completePracticeSession,
  abandonPracticeSession,
  findActivePracticeSession,
  getPracticeSession,
} from '@/sequencer/session-store'
import type { Db } from '@/db/client'
import { learners } from '@/db/schema'

const NOW = 1_700_000_000_000

// A minimal session plan (the real one has McqItem objects, but the store
// treats it as opaque JSON).
const PLAN = {
  items: [{ item: { id: 'item.1' }, nodeId: 'gram.a1.be', reason: 'new' }],
  nodeIds: ['gram.a1.be'],
  estimatedMinutes: 0.5,
}

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  // Insert a learner for the FK constraint.
  await db.insert(learners).values({
    id: 'learner.1',
    displayName: 'Test',
    email: 'test@test.com',
    createdAt: NOW,
    updatedAt: NOW,
  })
})

describe('createPracticeSession', () => {
  it('creates a session and returns its ID', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  it('stores the plan as JSON', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const session = await getPracticeSession(db, id)
    expect(session).not.toBeNull()
    expect(session!.status).toBe('in_progress')
    expect(session!.progress).toBe(0)
    expect((session!.plan as Record<string, unknown>).nodeIds).toEqual(['gram.a1.be'])
  })
})

describe('updateProgress', () => {
  it('updates the progress counter', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await updateProgress(db, id, 3, NOW + 1000)

    const session = await getPracticeSession(db, id)
    expect(session!.progress).toBe(3)
    expect(session!.updatedAt).toBe(NOW + 1000)
  })
})

describe('completePracticeSession', () => {
  it('sets status to completed', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await completePracticeSession(db, id, NOW + 5000)

    const session = await getPracticeSession(db, id)
    expect(session!.status).toBe('completed')
    expect(session!.completedAt).toBe(NOW + 5000)
  })
})

describe('abandonPracticeSession', () => {
  it('sets status to abandoned', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await abandonPracticeSession(db, id, NOW + 5000)

    const session = await getPracticeSession(db, id)
    expect(session!.status).toBe('abandoned')
    expect(session!.completedAt).toBe(NOW + 5000)
  })
})

describe('findActivePracticeSession', () => {
  it('returns the active session for a learner', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const active = await findActivePracticeSession(db, 'learner.1')
    expect(active).not.toBeNull()
    expect(active!.id).toBe(id)
  })

  it('returns null when no active session', async () => {
    const active = await findActivePracticeSession(db, 'learner.1')
    expect(active).toBeNull()
  })

  it('ignores completed sessions', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await completePracticeSession(db, id, NOW + 5000)

    const active = await findActivePracticeSession(db, 'learner.1')
    expect(active).toBeNull()
  })
})
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `npx vitest run tests/sequencer/session-store.test.ts --reporter verbose`
Expected: FAIL — module `@/sequencer/session-store` does not exist.

- [ ] **Step 6: Write the implementation**

Create `src/sequencer/session-store.ts`:

```typescript
import { eq, and } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { generateId } from '@/db/id'
import { practiceSessions } from '@/db/schema'

// The row type returned by queries. The plan is stored as opaque JSON —
// the caller casts it to SessionPlan.
export interface PracticeSessionRow {
  id: string
  learnerId: string
  status: string
  plan: Record<string, unknown>
  progress: number
  startedAt: number
  completedAt: number | null
  updatedAt: number
}

// Create a new practice session in 'in_progress' status. Returns the
// generated session ID.
export async function createPracticeSession(
  db: Db,
  learnerId: string,
  plan: Record<string, unknown>,
  now: number,
): Promise<string> {
  const id = generateId()

  await db.insert(practiceSessions).values({
    id,
    learnerId,
    status: 'in_progress',
    plan,
    progress: 0,
    startedAt: now,
    completedAt: null,
    updatedAt: now,
  })

  return id
}

// Update the progress counter. Called periodically by the client
// (e.g. every 3 items, or on tab blur) to enable resume.
export async function updateProgress(
  db: Db,
  sessionId: string,
  progress: number,
  now: number,
): Promise<void> {
  await db
    .update(practiceSessions)
    .set({ progress, updatedAt: now })
    .where(eq(practiceSessions.id, sessionId))
}

// Mark a session as completed.
export async function completePracticeSession(
  db: Db,
  sessionId: string,
  now: number,
): Promise<void> {
  await db
    .update(practiceSessions)
    .set({ status: 'completed', completedAt: now, updatedAt: now })
    .where(eq(practiceSessions.id, sessionId))
}

// Mark a session as abandoned (learner quit before finishing).
export async function abandonPracticeSession(
  db: Db,
  sessionId: string,
  now: number,
): Promise<void> {
  await db
    .update(practiceSessions)
    .set({ status: 'abandoned', completedAt: now, updatedAt: now })
    .where(eq(practiceSessions.id, sessionId))
}

// Find the active (in_progress) practice session for a learner.
// Returns null if none. Used on app load to offer resume.
export async function findActivePracticeSession(
  db: Db,
  learnerId: string,
): Promise<PracticeSessionRow | null> {
  const rows = await db
    .select()
    .from(practiceSessions)
    .where(
      and(
        eq(practiceSessions.learnerId, learnerId),
        eq(practiceSessions.status, 'in_progress'),
      ),
    )
    .limit(1)

  return rows[0] ?? null
}

// Fetch a session by ID.
export async function getPracticeSession(
  db: Db,
  sessionId: string,
): Promise<PracticeSessionRow | null> {
  const rows = await db
    .select()
    .from(practiceSessions)
    .where(eq(practiceSessions.id, sessionId))
    .limit(1)

  return rows[0] ?? null
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run tests/sequencer/session-store.test.ts --reporter verbose`
Expected: All 7 tests pass.

- [ ] **Step 8: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 931+ tests pass.

- [ ] **Step 9: Commit**

```bash
git add src/db/schema/practice-sessions.ts src/db/schema/index.ts drizzle/ src/sequencer/session-store.ts tests/sequencer/session-store.test.ts
git commit -m "feat(sequencer): add practice session schema and store

New practice_sessions table with CRUD. createPracticeSession,
updateProgress, completePracticeSession, abandonPracticeSession,
findActivePracticeSession, getPracticeSession.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Session Assembly Orchestrator

**Files:**
- Create: `src/sequencer/assemble.ts`
- Create: `tests/sequencer/assemble.test.ts`

**Interfaces:**
- Consumes:
  - `listMastery(db, learnerId)` from `@/mastery/repository`
  - `listNodes(db)`, `listEdges(db)` from `@/skill-graph/repository`
  - `selectNext(input)` from `@/sequencer/select`
  - `boostFromDiagnosis(candidates, actionPlan)` from `@/sequencer/diagnosis-bridge`
  - `findItemsByNodes(db, nodeIds, opts)` from `@/content/item-bank`
  - `McqItem` from `@/items/types`
  - `ActionPlan` from `@/diagnosis/types`
  - `Db` from `@/db/client`
- Produces:
  - `interface SessionItem { item: McqItem; nodeId: string; reason: 'review' | 'new' | 'remediation' }`
  - `interface SessionPlan { items: SessionItem[]; nodeIds: string[]; estimatedMinutes: number }`
  - `interface AssembleOptions { maxItems?: number; maxNodes?: number; excludeItemIds?: string[]; actionPlan?: ActionPlan }`
  - `assembleSession(db, learnerId, options?): Promise<SessionPlan>`

- [ ] **Step 1: Write the failing tests**

Create `tests/sequencer/assemble.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes, upsertEdges } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { saveMastery } from '@/mastery/repository'
import { assembleSession } from '@/sequencer/assemble'
import type { ActionPlan } from '@/diagnosis/types'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

// Two nodes: A1 grammar (no prereqs) and A2 grammar (requires A1).
const NODES = [
  { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
  { id: 'gram.a2.past', type: 'grammar' as const, level: 'A2' as const, skill: 'general' as const, title: 'Past simple', description: '', metadata: null },
  { id: 'lex.a1.greetings', type: 'lexical' as const, level: 'A1' as const, skill: 'general' as const, title: 'Greetings', description: '', metadata: null },
]

const EDGES = [
  { fromNodeId: 'gram.a1.be', toNodeId: 'gram.a2.past', strength: 1.0 },
]

// MCQ payloads.
const BE_PAYLOAD = {
  stem: 'She ______ a teacher.',
  options: [
    { text: 'is', misconception: null },
    { text: 'are', misconception: 'uses plural form with singular subject' },
    { text: 'am', misconception: 'uses first person with third person subject' },
    { text: 'be', misconception: 'uses base form instead of conjugated form' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.a1.be'],
}

const PAST_PAYLOAD = {
  stem: 'They ______ football yesterday.',
  options: [
    { text: 'played', misconception: null },
    { text: 'play', misconception: 'uses present tense for a past event' },
    { text: 'playing', misconception: 'uses present participle without auxiliary' },
    { text: 'plays', misconception: 'uses third person present for past event' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.a2.past'],
}

const GREETINGS_PAYLOAD = {
  stem: '"______" is a common way to say hello.',
  options: [
    { text: 'Hi', misconception: null },
    { text: 'Bye', misconception: 'confuses greeting with farewell' },
    { text: 'Thanks', misconception: 'confuses greeting with gratitude' },
    { text: 'Sorry', misconception: 'confuses greeting with apology' },
  ],
  correctIndex: 0,
  nodeIds: ['lex.a1.greetings'],
}

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(db, NODES, NOW)
  await upsertEdges(db, EDGES, NOW)
  await recordProvenance(db, { id: 'prov.1', sourceName: 'original', licence: 'original' }, NOW)
})

// Helper: create, publish, and return an item.
async function publishItem(id: string, payload: Record<string, unknown>, level: string, nodeIds: string[]) {
  const versionId = await createItem(db, {
    id, type: 'mcq', level: level as 'A1', skill: 'general', nodeIds, payload, provenanceId: 'prov.1',
  }, NOW)
  await publishItemVersion(db, versionId, inventory, NOW)
}

describe('assembleSession', () => {
  it('returns items for a new learner (no mastery)', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])

    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    // New learner gets A1 items (A2 is blocked by prerequisite).
    expect(plan.items.length).toBeGreaterThan(0)
    expect(plan.items.every((si) => si.reason === 'new')).toBe(true)
    expect(plan.nodeIds).not.toContain('gram.a2.past')
    expect(plan.estimatedMinutes).toBeGreaterThan(0)
  })

  it('includes review items when mastery has decayed', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])

    // Set mastery to 0.65 (below REVIEW_THRESHOLD 0.75 but above MASTERY_THRESHOLD 0.6).
    await saveMastery(db, {
      learnerId: 'learner.1', nodeId: 'gram.a1.be',
      mastery: 0.65, confidence: 0.8, exposures: 10, correctStreak: 2, lastSeenAt: NOW,
    })

    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    expect(plan.items.length).toBeGreaterThan(0)
    const reviewItems = plan.items.filter((si) => si.reason === 'review')
    expect(reviewItems.length).toBeGreaterThan(0)
  })

  it('respects prerequisite gating', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.past.1', PAST_PAYLOAD, 'A2', ['gram.a2.past'])

    // gram.a2.past requires gram.a1.be at mastery >= 0.6.
    // New learner has 0 mastery on gram.a1.be, so A2 should be blocked.
    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    const a2Items = plan.items.filter((si) => si.nodeId === 'gram.a2.past')
    expect(a2Items).toHaveLength(0)
  })

  it('unlocks A2 when prerequisite is mastered', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.past.1', PAST_PAYLOAD, 'A2', ['gram.a2.past'])

    // Master the prerequisite.
    await saveMastery(db, {
      learnerId: 'learner.1', nodeId: 'gram.a1.be',
      mastery: 0.85, confidence: 0.8, exposures: 10, correctStreak: 5, lastSeenAt: NOW,
    })

    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    const a2Items = plan.items.filter((si) => si.nodeId === 'gram.a2.past')
    expect(a2Items.length).toBeGreaterThan(0)
  })

  it('returns empty plan when item bank is empty', async () => {
    // Nodes exist but no items published.
    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    expect(plan.items).toHaveLength(0)
    expect(plan.nodeIds).toHaveLength(0)
    expect(plan.estimatedMinutes).toBe(0)
  })

  it('excludes items by ID', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.be.2', { ...BE_PAYLOAD, stem: 'He ______ tall.' }, 'A1', ['gram.a1.be'])

    const plan = await assembleSession(db, 'learner.1', {
      now: NOW,
      excludeItemIds: ['item.be.1'],
    })

    const itemIds = plan.items.map((si) => si.item.id)
    expect(itemIds).not.toContain('item.be.1')
  })

  it('boosts remediation nodes when actionPlan is provided', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])

    const actionPlan: ActionPlan = {
      steps: [{ order: 1, nodeId: 'lex.a1.greetings', nodeTitle: 'Greetings', rootCause: 'knowledge', activity: 'drill', estimatedMinutes: 10, prerequisiteNodeIds: [] }],
      totalEstimatedMinutes: 10,
      gapCount: 1,
    }

    const plan = await assembleSession(db, 'learner.1', { now: NOW, actionPlan })

    const remediationItems = plan.items.filter((si) => si.reason === 'remediation')
    expect(remediationItems.length).toBeGreaterThan(0)
    expect(remediationItems[0]!.nodeId).toBe('lex.a1.greetings')
  })

  it('respects maxItems', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.be.2', { ...BE_PAYLOAD, stem: 'He ______ tall.' }, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])

    const plan = await assembleSession(db, 'learner.1', { now: NOW, maxItems: 2 })

    expect(plan.items.length).toBeLessThanOrEqual(2)
  })

  it('interleaves items from different nodes', async () => {
    // Publish 2 items per node.
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.be.2', { ...BE_PAYLOAD, stem: 'He ______ tall.' }, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])
    await publishItem('item.greet.2', { ...GREETINGS_PAYLOAD, stem: '"______" is informal.' }, 'A1', ['lex.a1.greetings'])

    const plan = await assembleSession(db, 'learner.1', { now: NOW, maxItems: 4 })

    // No three consecutive items from the same node.
    for (let i = 2; i < plan.items.length; i++) {
      const threeInARow =
        plan.items[i]!.nodeId === plan.items[i - 1]!.nodeId &&
        plan.items[i]!.nodeId === plan.items[i - 2]!.nodeId
      expect(threeInARow).toBe(false)
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/sequencer/assemble.test.ts --reporter verbose`
Expected: FAIL — module `@/sequencer/assemble` does not exist.

- [ ] **Step 3: Write the implementation**

Create `src/sequencer/assemble.ts`:

```typescript
import type { Db } from '@/db/client'
import type { ActionPlan } from '@/diagnosis/types'
import type { McqItem } from '@/items/types'
import { listMastery } from '@/mastery/repository'
import { listEdges, listNodes } from '@/skill-graph/repository'
import { findItemsByNodes } from '@/content/item-bank'
import { selectNext, type Candidate } from './select'
import { boostFromDiagnosis } from './diagnosis-bridge'

// ─── Types ───────────────────────────────────────────────────────────────

export interface AssembleOptions {
  // Current timestamp (epoch ms). Required so tests can freeze time.
  now: number
  // Maximum number of items in the session. Default 10.
  maxItems?: number
  // Maximum number of nodes to select. Default 6.
  maxNodes?: number
  // Items the learner has already seen (e.g. earlier in the same sitting).
  excludeItemIds?: string[]
  // If provided, remediation nodes from this plan get priority.
  actionPlan?: ActionPlan
}

export interface SessionItem {
  // The MCQ item to present.
  item: McqItem
  // The primary node this item targets.
  nodeId: string
  // Why this node was selected.
  reason: 'review' | 'new' | 'remediation'
}

export interface SessionPlan {
  // Ordered list of items to present.
  items: SessionItem[]
  // Unique node IDs covered in this session.
  nodeIds: string[]
  // Estimated session duration (items × 30 seconds).
  estimatedMinutes: number
}

// ─── Interleaving ────────────────────────────────────────────────────────

// Arrange items so no three consecutive items target the same node.
// Same algorithm as interleaveByType in select.ts, adapted for SessionItems.
function interleaveItems(items: SessionItem[]): SessionItem[] {
  const remaining = [...items]
  const result: SessionItem[] = []

  while (remaining.length > 0) {
    const lastNode = result[result.length - 1]?.nodeId
    const secondLastNode = result[result.length - 2]?.nodeId
    const wouldMakeThree = lastNode !== undefined && lastNode === secondLastNode

    const index = wouldMakeThree
      ? remaining.findIndex((si) => si.nodeId !== lastNode)
      : 0
    const pick = index === -1 ? 0 : index

    result.push(remaining[pick]!)
    remaining.splice(pick, 1)
  }

  return result
}

// ─── Assembly ────────────────────────────────────────────────────────────

// Assemble a practice session for a learner. This is the single function
// behind the "continue" button — it selects nodes from the skill graph,
// fetches items from the bank, and returns an ordered plan.
export async function assembleSession(
  db: Db,
  learnerId: string,
  options: AssembleOptions,
): Promise<SessionPlan> {
  const { now } = options
  const maxItems = options.maxItems ?? 10
  const maxNodes = options.maxNodes ?? 6

  // Step 1: load state — mastery, skill graph.
  const [mastery, nodes, edges] = await Promise.all([
    listMastery(db, learnerId),
    listNodes(db),
    listEdges(db),
  ])

  // Step 2: select candidate nodes (eligibility + priority ranking).
  let candidates = selectNext({ nodes, edges, mastery, now, limit: maxNodes })

  // Step 3: boost from diagnosis if an action plan is provided.
  if (options.actionPlan) {
    candidates = boostFromDiagnosis(candidates, options.actionPlan)
  }

  if (candidates.length === 0) {
    return { items: [], nodeIds: [], estimatedMinutes: 0 }
  }

  // Step 4: fetch items from the item bank for the selected nodes.
  const candidateNodeIds = candidates.map((c) => c.node.id)
  const bankItems = await findItemsByNodes(db, candidateNodeIds, {
    excludeIds: options.excludeItemIds,
    limit: maxItems * 2,
  })

  if (bankItems.length === 0) {
    return { items: [], nodeIds: [], estimatedMinutes: 0 }
  }

  // Step 5: allocate items per node.
  // Group items by their primary node (first nodeId).
  const itemsByNode = new Map<string, McqItem[]>()
  for (const item of bankItems) {
    const nodeId = item.nodeIds[0]
    if (!nodeId) continue
    const list = itemsByNode.get(nodeId) ?? []
    list.push(item)
    itemsByNode.set(nodeId, list)
  }

  // Build a reason lookup from candidates.
  const reasonByNode = new Map<string, Candidate['reason']>()
  for (const c of candidates) {
    reasonByNode.set(c.node.id, c.reason)
  }

  // Each node gets up to ceil(maxItems / nodeCount) items.
  const nodesWithItems = candidates.filter((c) => itemsByNode.has(c.node.id))
  const perNode = nodesWithItems.length > 0
    ? Math.ceil(maxItems / nodesWithItems.length)
    : 1

  const sessionItems: SessionItem[] = []
  for (const c of nodesWithItems) {
    const nodeItems = itemsByNode.get(c.node.id) ?? []
    const selected = nodeItems.slice(0, perNode)
    for (const item of selected) {
      sessionItems.push({
        item,
        nodeId: c.node.id,
        reason: c.reason,
      })
    }
  }

  // Step 6: interleave so no three consecutive items are from the same node.
  const interleaved = interleaveItems(sessionItems)

  // Step 7: cap at maxItems.
  const capped = interleaved.slice(0, maxItems)

  // Compute unique node IDs covered.
  const nodeIds = [...new Set(capped.map((si) => si.nodeId))]

  return {
    items: capped,
    nodeIds,
    // 30 seconds per item baseline.
    estimatedMinutes: capped.length * 0.5,
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/sequencer/assemble.test.ts --reporter verbose`
Expected: All 8 tests pass.

- [ ] **Step 5: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 931+ tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/sequencer/assemble.ts tests/sequencer/assemble.test.ts
git commit -m "feat(sequencer): add session assembly orchestrator

assembleSession wires listMastery → selectNext → boostFromDiagnosis →
findItemsByNodes → interleave → SessionPlan. One function behind the
'continue' button.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
