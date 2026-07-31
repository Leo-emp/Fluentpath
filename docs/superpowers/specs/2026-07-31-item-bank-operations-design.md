# R1b-c: Item Bank Operations — Design Spec

**Date:** 2026-07-31
**Status:** Draft for review
**Depends on:** Content schema (done — `items`, `item_versions`, `item_nodes`, `item_statistics`, `provenance` tables), content repository (`repository.ts` — CRUD), publish pipeline (`publish.ts` — quality-gated publication), generation pipeline with 12 quality gates (R1b-b + R1b-e — done)

---

## Goal

Bridge the gap between the generation pipeline (pure functions producing `McqItem`) and the content layer (Drizzle/Turso persistence) so that:

1. Generated items flow into the database and get published in one call
2. Consumers (sequencer, placement, mock-test) can query the published item bank
3. Item performance data accumulates from the first item served

The schema and CRUD repository already exist. This spec adds **three operational modules** on top of them.

---

## Why now

The generation pipeline produces items. The content layer stores them. But nothing connects the two, and nothing can read them back out. Until these operations exist:

- The sequencer cannot fetch items for the nodes it selects
- Placement cannot pull items at each CEFR level
- The mock-test engine cannot populate `taskRef: null` slots from the item bank
- Generated items exist only in memory — they vanish when the process exits
- Item performance data cannot be recorded, so retirement decisions have no signal

---

## Module 1: Item bank queries

**File:** `src/content/item-bank.ts`

### The problem

Consumers need published MCQ items filtered by different criteria. The data is spread across three tables (`items`, `item_versions`, `item_nodes`) and stored as JSON in `item_versions.payload`. Each consumer needs items reconstructed as `McqItem` objects.

### Functions

#### `findItemsByNodes(db, nodeIds, opts?): Promise<McqItem[]>`

Returns published MCQ items that target any of the given node IDs.

- Joins `items` → `item_nodes` → `item_versions` (via `current_version_id`)
- Filters: `status = 'published'`, `type = 'mcq'`, `node_id IN (nodeIds)`
- Reconstructs `McqItem` from the version payload + item row metadata
- `opts.excludeIds?: string[]` — skip items already seen (e.g. in a session)
- `opts.limit?: number` — cap the result set (default: no limit)

**Primary consumer:** Sequencer — selects nodes, needs items for them.

#### `findItemsByLevel(db, level, opts?): Promise<McqItem[]>`

Returns published MCQ items at a specific CEFR level.

- Same join pattern, filtered by `items.level = level`
- Same `excludeIds` and `limit` options

**Primary consumer:** Placement — needs items at each level for the adaptive algorithm.

#### `findItemsByFilter(db, filter): Promise<McqItem[]>`

General-purpose query with all filter dimensions.

```typescript
interface ItemBankFilter {
  level?: CefrLevel
  skill?: SkillArea
  type?: string           // default 'mcq'
  nodeIds?: string[]       // items targeting ANY of these nodes
  status?: ContentStatus   // default 'published'
  excludeIds?: string[]
  limit?: number
}
```

**Primary consumer:** Mock-test engine (needs items by level + skill + type), future admin UI.

### Reconstruction

All three functions share a private `toMcqItem(itemRow, versionRow, nodeIds)` helper that reconstructs the in-memory `McqItem` from DB rows:

```typescript
{
  id: itemRow.id,
  stem: String(versionRow.payload.stem),
  options: versionRow.payload.options as McqOption[],
  correctIndex: Number(versionRow.payload.correctIndex),
  nodeIds,                     // from item_nodes join, not payload
  level: itemRow.level as CefrLevel,
}
```

Node IDs come from the `item_nodes` join table, not from the payload. The join table is the source of truth — it drives the sequencer and diagnosis attribution. The payload may carry `nodeIds` for display, but the join table is authoritative.

### Why three functions instead of just `findItemsByFilter`

`findItemsByNodes` and `findItemsByLevel` are the hot-path queries — the sequencer and placement call them on every interaction. They exist as named, typed functions because:

1. **Intent is clear** — `findItemsByNodes(db, nodeIds)` reads better than `findItemsByFilter(db, { nodeIds, type: 'mcq', status: 'published' })`
2. **Defaults are baked in** — callers don't need to remember to set `type` and `status`
3. **The general filter still exists** for everything else

All three delegate to a shared private query builder so the SQL logic is not duplicated.

---

## Module 2: Generation bridge

**File:** `src/content/ingest.ts`

### The problem

The generation pipeline produces a `GenerateItemResult` in memory. To persist it, a caller currently needs to manually call `recordProvenance`, `createItem`, and `publishItemVersion` in the right order with the right arguments. This is ceremony that should be one call.

### Function

#### `ingestGeneratedItem(db, result, options, now): Promise<IngestResult>`

```typescript
interface IngestOptions {
  provenance: ProvenanceInput
  inventory: ProfilerInventory
  skill?: SkillArea          // default 'general'
}

type IngestResult =
  | { status: 'published'; itemId: string; versionId: string }
  | { status: 'rejected'; itemId: string; versionId: string; review: ItemReview }
  | { status: 'failed' }    // all generation attempts failed, nothing stored
```

**Flow:**

1. If `result.item` is null → return `{ status: 'failed' }`
2. Call `recordProvenance(db, provenance, now)` — idempotent via `onConflictDoNothing`
3. Call `createItem(db, ...)` with:
   - `id`: the item's existing `id` from `result.item.id`
   - `type`: `'mcq'`
   - `level`: from `result.item.level`
   - `skill`: from options, default `'general'`
   - `nodeIds`: from `result.item.nodeIds`
   - `payload`: `{ stem, options, correctIndex, nodeIds }` from the item
   - `provenanceId`: from provenance input
4. Call `publishItemVersion(db, versionId, inventory, now)`
5. If publish succeeds → return `{ status: 'published', itemId, versionId }`
6. If publish throws `PublishRejectedError` → catch, return `{ status: 'rejected', itemId, versionId, review }`

### Provenance convention for generated items

```typescript
{
  id: 'prov.generated.<model>',      // e.g. 'prov.generated.gemini-2.0-flash'
  sourceName: 'generated',
  licence: 'original',
  modifications: 'Generated by gemini-2.0-flash',
}
```

The provenance ID is deterministic per model, so all items from the same model share one provenance row (idempotent insert).

### Why publish immediately

Generated items have already passed 12 quality gates (8 deterministic + 4 LLM) during generation. The publish boundary runs the deterministic gates again as a safety net. There is no human review step for generated items in R1b — that belongs to R1b-g (review queue). For now, the pipeline is: generate → gate → store → publish.

---

## Module 3: Item statistics

**File:** `src/content/statistics.ts`

### The problem

The `item_statistics` table exists but has no code to write to it. Without recording attempts, p-value and discrimination cannot be computed, and R1b-g has no signal for item retirement.

### Functions

#### `recordAttempt(db, versionId, correct, now): Promise<void>`

Upserts a row in `item_statistics`:
- Increments `attempts` by 1
- Increments `correct` by 1 if `correct === true`
- Recomputes `p_value` as `correct / attempts`
- Sets `updated_at` to `now`

Uses SQLite's `INSERT ... ON CONFLICT DO UPDATE` so the first attempt for a version creates the row automatically.

#### `recordAbandonment(db, versionId, now): Promise<void>`

Upserts, incrementing `abandonments` by 1.

#### `recordReport(db, versionId, now): Promise<void>`

Upserts, incrementing `reports` by 1.

#### `getStatistics(db, versionId): Promise<ItemStatistics | null>`

Returns the current statistics for a version, or null if no data exists.

```typescript
interface ItemStatistics {
  itemVersionId: string
  attempts: number
  correct: number
  pValue: number | null
  discrimination: number | null
  abandonments: number
  reports: number
  updatedAt: number
}
```

### What is deferred

**Discrimination** is not computed here. It requires comparing performance of strong learners vs weak learners across many items, which is a batch computation — not a per-attempt update. The column exists and will be populated by the statistics pipeline in R1b-g.

**Retirement triggers** (auto-retire when p_value > 0.95 or reports > threshold) belong to R1b-g. This module only records the data.

---

## Types summary

### New types

```typescript
// item-bank.ts
interface ItemBankFilter {
  level?: CefrLevel
  skill?: SkillArea
  type?: string
  nodeIds?: string[]
  status?: ContentStatus
  excludeIds?: string[]
  limit?: number
}

// ingest.ts
interface IngestOptions {
  provenance: ProvenanceInput
  inventory: ProfilerInventory
  skill?: SkillArea
}

type IngestResult =
  | { status: 'published'; itemId: string; versionId: string }
  | { status: 'rejected'; itemId: string; versionId: string; review: ItemReview }
  | { status: 'failed' }

// statistics.ts
interface ItemStatistics {
  itemVersionId: string
  attempts: number
  correct: number
  pValue: number | null
  discrimination: number | null
  abandonments: number
  reports: number
  updatedAt: number
}
```

### Existing types consumed

- `McqItem`, `McqOption`, `ItemReview` from `@/items/types`
- `GenerateItemResult` from `@/generation/generate`
- `ProfilerInventory` from `@/profiler/profile`
- `ProvenanceInput` from `@/content/repository`
- `CefrLevel`, `SkillArea` from `@/skill-graph/types`
- `ContentStatus` from `@/db/schema/content`
- `Db` from `@/db/client`

---

## Files changed

| File | Change |
|---|---|
| `src/content/item-bank.ts` | **Create** — 3 query functions + shared query builder |
| `src/content/ingest.ts` | **Create** — generation-to-storage bridge |
| `src/content/statistics.ts` | **Create** — attempt/abandonment/report recording |
| `tests/content/item-bank.test.ts` | **Create** — ~10 tests |
| `tests/content/ingest.test.ts` | **Create** — ~6 tests |
| `tests/content/statistics.test.ts` | **Create** — ~6 tests |

No schema changes. No modifications to existing files. All three modules are additive.

---

## What this does NOT include (and why)

| Excluded | Reason |
|---|---|
| Discrimination computation | Batch job requiring cross-learner comparison — R1b-g |
| Auto-retirement triggers | Needs discrimination + threshold policy — R1b-g |
| Human review queue | UI/workflow concern — R1b-g |
| Lesson bank queries | Lessons don't exist yet — R1b-f (source connectors) creates them |
| Batch generation orchestrator | "Generate 50 items for node X" is a pipeline concern, not a storage concern |
| CDN upload | Spec says R2 for production; local development uses DB directly. CDN integration is deployment concern |

---

## What this enables

After R1b-c, the content pipeline is end-to-end:

```
SkillNode → generate (12 gates) → ingest → DB → item bank query → McqItem[]
                                                       ↓
                                              sequencer / placement / mock-test
                                                       ↓
                                              learner answers
                                                       ↓
                                              recordAttempt → item_statistics
```

The sequencer can select nodes and fetch items. Placement can pull level-appropriate items. Statistics start accumulating from the first answer. R1b-g has data to work with when it arrives.
