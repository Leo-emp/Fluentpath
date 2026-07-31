# Item Bank Operations (R1b-c) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bridge the generation pipeline to Drizzle/Turso persistence with item bank queries, a generation-to-storage bridge, and item statistics recording — making the content pipeline end-to-end.

**Architecture:** Three new files under `src/content/` — `item-bank.ts` (query layer returning `McqItem[]`), `ingest.ts` (generation bridge), `statistics.ts` (attempt/abandonment/report recording via upsert). All additive — no schema changes, no modifications to existing files. All tables already exist.

**Tech Stack:** TypeScript, Drizzle ORM (libSQL/Turso), Vitest

## Global Constraints

- All code uses `//` comments throughout for learning
- All functions take `Db` as the first parameter (pattern from existing repositories)
- No new npm dependencies
- Use `drizzle-orm` operators (`eq`, `and`, `inArray`, `notInArray`, `sql`) — no raw SQL strings
- Follow the `toNode()` row-to-domain conversion pattern from `skill-graph/repository.ts`
- Tests use `makeTestDb()` from `tests/helpers/test-db.ts` for isolated in-memory databases
- Timestamps are epoch milliseconds stored as `INTEGER`

---

### Task 1: Item Bank Queries

**Files:**
- Create: `src/content/item-bank.ts`
- Create: `tests/content/item-bank.test.ts`

**Interfaces:**
- Consumes: `items`, `itemVersions`, `itemNodes` tables from `@/db/schema`
- Consumes: `McqItem`, `McqOption` from `@/items/types`
- Consumes: `CefrLevel`, `SkillArea` from `@/skill-graph/types`
- Consumes: `ContentStatus` from `@/db/schema/content`
- Consumes: `Db` from `@/db/client`
- Produces:
  - `interface ItemBankFilter { level?: CefrLevel; skill?: SkillArea; type?: string; nodeIds?: string[]; status?: ContentStatus; excludeIds?: string[]; limit?: number }`
  - `interface ItemBankOptions { excludeIds?: string[]; limit?: number }`
  - `findItemsByNodes(db: Db, nodeIds: string[], opts?: ItemBankOptions): Promise<McqItem[]>`
  - `findItemsByLevel(db: Db, level: CefrLevel, opts?: ItemBankOptions): Promise<McqItem[]>`
  - `findItemsByFilter(db: Db, filter: ItemBankFilter): Promise<McqItem[]>`

- [ ] **Step 1: Write the failing tests**

Create `tests/content/item-bank.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { findItemsByNodes, findItemsByLevel, findItemsByFilter } from '@/content/item-bank'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

// Two nodes at different levels for filtering tests.
const NODES = [
  {
    id: 'gram.b1.pp_vs_past',
    type: 'grammar' as const,
    level: 'B1' as const,
    skill: 'general' as const,
    title: 'Present perfect vs past simple',
    description: '',
    metadata: null,
  },
  {
    id: 'gram.a2.past_simple',
    type: 'grammar' as const,
    level: 'A2' as const,
    skill: 'general' as const,
    title: 'Past simple with regular verbs',
    description: '',
    metadata: null,
  },
]

// A valid B1 MCQ payload targeting the B1 node.
const B1_PAYLOAD = {
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past'],
}

// A valid A2 MCQ payload targeting the A2 node.
const A2_PAYLOAD = {
  stem: 'They ______ football every Saturday when they were young.',
  options: [
    { text: 'played', misconception: null },
    { text: 'play', misconception: 'uses present tense for a finished habit' },
    { text: 'are playing', misconception: 'treats a past habit as a current action' },
    { text: 'have played', misconception: 'uses present perfect for a habit that has ended' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.a2.past_simple'],
}

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(db, NODES, NOW)
  await recordProvenance(
    db,
    { id: 'prov.original', sourceName: 'original', licence: 'original' },
    NOW,
  )
})

// Helper: create and publish an item in one step.
async function publishItem(
  id: string,
  payload: Record<string, unknown>,
  level: string,
  nodeIds: string[],
) {
  const versionId = await createItem(
    db,
    {
      id,
      type: 'mcq',
      level: level as 'B1',
      skill: 'general',
      nodeIds,
      payload,
      provenanceId: 'prov.original',
    },
    NOW,
  )
  await publishItemVersion(db, versionId, inventory, NOW)
  return versionId
}

// ─── findItemsByNodes ────────────────────────────────────────────────────

describe('findItemsByNodes', () => {
  it('returns published items targeting any of the given nodes', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'])
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.1')
    expect(result[0]!.stem).toContain('keys')
    expect(result[0]!.level).toBe('B1')
    expect(result[0]!.nodeIds).toContain('gram.b1.pp_vs_past')
  })

  it('returns items for multiple nodes', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past', 'gram.a2.past_simple'])
    expect(result).toHaveLength(2)
  })

  it('returns empty when no items match', async () => {
    const result = await findItemsByNodes(db, ['gram.c1.nonexistent'])
    expect(result).toHaveLength(0)
  })

  it('excludes items by id', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem(
      'item.b1.2',
      { ...B1_PAYLOAD, stem: 'She ______ to three different countries.' },
      'B1',
      ['gram.b1.pp_vs_past'],
    )

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'], { excludeIds: ['item.b1.1'] })
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.2')
  })

  it('respects the limit option', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem(
      'item.b1.2',
      { ...B1_PAYLOAD, stem: 'She ______ to three different countries.' },
      'B1',
      ['gram.b1.pp_vs_past'],
    )

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'], { limit: 1 })
    expect(result).toHaveLength(1)
  })

  it('skips draft items', async () => {
    // Create but do NOT publish.
    await createItem(
      db,
      {
        id: 'item.draft',
        type: 'mcq',
        level: 'B1',
        skill: 'general',
        nodeIds: ['gram.b1.pp_vs_past'],
        payload: B1_PAYLOAD,
        provenanceId: 'prov.original',
      },
      NOW,
    )

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'])
    expect(result).toHaveLength(0)
  })
})

// ─── findItemsByLevel ────────────────────────────────────────────────────

describe('findItemsByLevel', () => {
  it('returns published items at the given level', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByLevel(db, 'A2')
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.a2.1')
    expect(result[0]!.level).toBe('A2')
  })

  it('returns empty when no items at that level', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    const result = await findItemsByLevel(db, 'C1')
    expect(result).toHaveLength(0)
  })

  it('excludes items by id', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    const result = await findItemsByLevel(db, 'B1', { excludeIds: ['item.b1.1'] })
    expect(result).toHaveLength(0)
  })
})

// ─── findItemsByFilter ───────────────────────────────────────────────────

describe('findItemsByFilter', () => {
  it('filters by level and node simultaneously', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByFilter(db, {
      level: 'B1',
      nodeIds: ['gram.b1.pp_vs_past', 'gram.a2.past_simple'],
    })
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.1')
  })

  it('defaults to published mcq items', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    // Draft item should not appear.
    await createItem(
      db,
      {
        id: 'item.draft',
        type: 'mcq',
        level: 'B1',
        skill: 'general',
        nodeIds: ['gram.b1.pp_vs_past'],
        payload: B1_PAYLOAD,
        provenanceId: 'prov.original',
      },
      NOW,
    )

    const result = await findItemsByFilter(db, {})
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.1')
  })

  it('can query draft items when status is overridden', async () => {
    await createItem(
      db,
      {
        id: 'item.draft',
        type: 'mcq',
        level: 'B1',
        skill: 'general',
        nodeIds: ['gram.b1.pp_vs_past'],
        payload: B1_PAYLOAD,
        provenanceId: 'prov.original',
      },
      NOW,
    )

    const result = await findItemsByFilter(db, { status: 'draft' })
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.draft')
  })

  it('reconstructs McqItem with correct fields', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])

    const [item] = await findItemsByFilter(db, {})
    expect(item!.id).toBe('item.b1.1')
    expect(item!.stem).toBe('I ______ my keys. I cannot open the door.')
    expect(item!.options).toHaveLength(4)
    expect(item!.options[0]!.text).toBe('have lost')
    expect(item!.options[0]!.misconception).toBeNull()
    expect(item!.options[1]!.misconception).toContain('past simple')
    expect(item!.correctIndex).toBe(0)
    expect(item!.nodeIds).toEqual(['gram.b1.pp_vs_past'])
    expect(item!.level).toBe('B1')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/content/item-bank.test.ts --reporter verbose`
Expected: FAIL — module `@/content/item-bank` does not exist yet.

- [ ] **Step 3: Write the implementation**

Create `src/content/item-bank.ts`:

```typescript
import { and, eq, inArray, notInArray } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { itemNodes, itemVersions, items } from '@/db/schema'
import type { ContentStatus } from '@/db/schema/content'
import type { McqItem, McqOption } from '@/items/types'
import type { CefrLevel, SkillArea } from '@/skill-graph/types'

// ─── Types ───────────────────────────────────────────────────────────────

export interface ItemBankOptions {
  excludeIds?: string[]
  limit?: number
}

export interface ItemBankFilter {
  level?: CefrLevel
  skill?: SkillArea
  type?: string
  nodeIds?: string[]
  status?: ContentStatus
  excludeIds?: string[]
  limit?: number
}

// ─── Row-to-domain conversion ────────────────────────────────────────────

// Reconstruct an McqItem from a DB item row, its current version payload,
// and the node IDs from the join table. Node IDs come from item_nodes, not
// the payload — the join table is authoritative.
function toMcqItem(
  itemRow: { id: string; level: string },
  payload: Record<string, unknown>,
  nodeIds: string[],
): McqItem {
  return {
    id: itemRow.id,
    stem: String(payload.stem ?? ''),
    options: Array.isArray(payload.options)
      ? (payload.options as McqOption[])
      : [],
    correctIndex: Number(payload.correctIndex ?? -1),
    nodeIds,
    level: itemRow.level as CefrLevel,
  }
}

// ─── Shared query builder ────────────────────────────────────────────────

// Build and execute an item bank query with the given filters. All three
// public functions delegate here so the SQL join logic is not duplicated.
async function queryItems(db: Db, filter: ItemBankFilter): Promise<McqItem[]> {
  const status = filter.status ?? 'published'
  const type = filter.type ?? 'mcq'

  // Build conditions. Drizzle's .where() replaces rather than accumulates,
  // so conditions are collected into an array and combined with and().
  const conditions = [
    eq(items.status, status),
    eq(items.type, type),
  ]

  if (filter.level) conditions.push(eq(items.level, filter.level))
  if (filter.skill) conditions.push(eq(items.skill, filter.skill))
  if (filter.excludeIds && filter.excludeIds.length > 0) {
    conditions.push(notInArray(items.id, filter.excludeIds))
  }

  // When filtering by nodeIds, join through item_nodes to find items
  // targeting any of the given nodes.
  if (filter.nodeIds && filter.nodeIds.length > 0) {
    conditions.push(inArray(itemNodes.nodeId, filter.nodeIds))
  }

  // Query: items joined to item_versions (via current_version_id) and
  // optionally to item_nodes for node filtering.
  const needsNodeJoin = (filter.nodeIds && filter.nodeIds.length > 0)

  let query = db
    .selectDistinct({
      id: items.id,
      level: items.level,
      currentVersionId: items.currentVersionId,
    })
    .from(items)
    .$dynamic()

  // Always join item_versions to get the payload from the current version.
  // But first, we need the item IDs. We'll do the version lookup separately
  // to keep the query clean and avoid issues with JSON columns in joins.

  // Step 1: find matching item IDs.
  if (needsNodeJoin) {
    query = query.innerJoin(itemNodes, eq(items.id, itemNodes.itemId))
  }

  const baseQuery = query.where(and(...conditions))
  const limitedQuery = filter.limit ? baseQuery.limit(filter.limit) : baseQuery
  const matchedItems = await limitedQuery

  if (matchedItems.length === 0) return []

  // Step 2: fetch the current version payload for each matched item.
  const versionIds = matchedItems
    .map((r) => r.currentVersionId)
    .filter((v): v is string => v !== null)

  if (versionIds.length === 0) return []

  const versions = await db
    .select()
    .from(itemVersions)
    .where(inArray(itemVersions.id, versionIds))

  const versionMap = new Map(versions.map((v) => [v.id, v]))

  // Step 3: fetch node IDs for each matched item.
  const itemIds = matchedItems.map((r) => r.id)
  const nodeRows = await db
    .select()
    .from(itemNodes)
    .where(inArray(itemNodes.itemId, itemIds))

  // Group node IDs by item ID.
  const nodeMap = new Map<string, string[]>()
  for (const row of nodeRows) {
    const list = nodeMap.get(row.itemId) ?? []
    list.push(row.nodeId)
    nodeMap.set(row.itemId, list)
  }

  // Step 4: assemble McqItem objects.
  const result: McqItem[] = []
  for (const row of matchedItems) {
    if (!row.currentVersionId) continue
    const version = versionMap.get(row.currentVersionId)
    if (!version) continue
    result.push(toMcqItem(row, version.payload, nodeMap.get(row.id) ?? []))
  }

  return result
}

// ─── Public API ──────────────────────────────────────────────────────────

// Find published MCQ items targeting any of the given skill graph nodes.
// Used by the sequencer to fetch items for the nodes it selects.
export async function findItemsByNodes(
  db: Db,
  nodeIds: string[],
  opts?: ItemBankOptions,
): Promise<McqItem[]> {
  return queryItems(db, {
    nodeIds,
    excludeIds: opts?.excludeIds,
    limit: opts?.limit,
  })
}

// Find published MCQ items at a specific CEFR level.
// Used by placement to pull items at each level for the adaptive algorithm.
export async function findItemsByLevel(
  db: Db,
  level: CefrLevel,
  opts?: ItemBankOptions,
): Promise<McqItem[]> {
  return queryItems(db, {
    level,
    excludeIds: opts?.excludeIds,
    limit: opts?.limit,
  })
}

// General-purpose item bank query with all filter dimensions.
// Used by the mock-test engine and future admin UI.
export async function findItemsByFilter(
  db: Db,
  filter: ItemBankFilter,
): Promise<McqItem[]> {
  return queryItems(db, filter)
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/content/item-bank.test.ts --reporter verbose`
Expected: All tests pass.

- [ ] **Step 5: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 902+ tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/item-bank.ts tests/content/item-bank.test.ts
git commit -m "feat(content): add item bank query layer

findItemsByNodes, findItemsByLevel, findItemsByFilter — returns published
McqItem[] reconstructed from DB. Shared query builder, node IDs from
join table. Used by sequencer, placement, mock-test.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Generation Bridge

**Files:**
- Create: `src/content/ingest.ts`
- Create: `tests/content/ingest.test.ts`

**Interfaces:**
- Consumes: `recordProvenance`, `createItem`, `ProvenanceInput` from `@/content/repository`
- Consumes: `publishItemVersion`, `PublishRejectedError` from `@/content/publish`
- Consumes: `GenerateItemResult` from `@/generation/generate`
- Consumes: `McqItem`, `ItemReview` from `@/items/types`
- Consumes: `ProfilerInventory` from `@/profiler/profile`
- Consumes: `SkillArea` from `@/skill-graph/types`
- Consumes: `Db` from `@/db/client`
- Produces:
  - `interface IngestOptions { provenance: ProvenanceInput; inventory: ProfilerInventory; skill?: SkillArea }`
  - `type IngestResult = { status: 'published'; itemId: string; versionId: string } | { status: 'rejected'; itemId: string; versionId: string; review: ItemReview } | { status: 'failed' }`
  - `ingestGeneratedItem(db: Db, result: GenerateItemResult, options: IngestOptions, now: number): Promise<IngestResult>`

- [ ] **Step 1: Write the failing tests**

Create `tests/content/ingest.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes } from '@/skill-graph/repository'
import { getItem, getItemVersion } from '@/content/repository'
import { ingestGeneratedItem } from '@/content/ingest'
import type { IngestOptions } from '@/content/ingest'
import type { GenerateItemResult } from '@/generation/generate'
import type { McqItem, ItemReview } from '@/items/types'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(
    db,
    [
      {
        id: 'gram.b1.pp_vs_past',
        type: 'grammar',
        level: 'B1',
        skill: 'general',
        title: 'Present perfect vs past simple',
        description: '',
        metadata: null,
      },
    ],
    NOW,
  )
})

// A good McqItem that passes all deterministic gates.
const GOOD_ITEM: McqItem = {
  id: 'item.gen.1',
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past'],
  level: 'B1',
}

const GOOD_REVIEW: ItemReview = { passed: true, issues: [] }

const OPTIONS: IngestOptions = {
  provenance: {
    id: 'prov.generated.gemini-2.0-flash',
    sourceName: 'generated',
    licence: 'original',
    modifications: 'Generated by gemini-2.0-flash',
  },
  inventory,
}

describe('ingestGeneratedItem', () => {
  it('stores and publishes a successful generation result', async () => {
    const result: GenerateItemResult = {
      item: GOOD_ITEM,
      review: GOOD_REVIEW,
      attempts: [{ kind: 'success', item: GOOD_ITEM, review: GOOD_REVIEW }],
    }

    const ingestResult = await ingestGeneratedItem(db, result, OPTIONS, NOW)
    expect(ingestResult.status).toBe('published')

    if (ingestResult.status !== 'published') throw new Error('expected published')

    expect(ingestResult.itemId).toBe('item.gen.1')
    expect(ingestResult.versionId).toBe('item.gen.1@1')

    // Verify the item is in the database and published.
    const item = await getItem(db, 'item.gen.1')
    expect(item?.status).toBe('published')
    expect(item?.currentVersionId).toBe('item.gen.1@1')
    expect(item?.level).toBe('B1')
    expect(item?.type).toBe('mcq')
  })

  it('returns failed when generation produced no item', async () => {
    const result: GenerateItemResult = {
      item: null,
      review: null,
      attempts: [{ kind: 'parse_failure', raw: 'garbage' }],
    }

    const ingestResult = await ingestGeneratedItem(db, result, OPTIONS, NOW)
    expect(ingestResult.status).toBe('failed')
  })

  it('stores the payload in the version', async () => {
    const result: GenerateItemResult = {
      item: GOOD_ITEM,
      review: GOOD_REVIEW,
      attempts: [{ kind: 'success', item: GOOD_ITEM, review: GOOD_REVIEW }],
    }

    await ingestGeneratedItem(db, result, OPTIONS, NOW)

    const version = await getItemVersion(db, 'item.gen.1@1')
    expect(version).not.toBeNull()
    const payload = version!.payload as Record<string, unknown>
    expect(payload.stem).toBe('I ______ my keys. I cannot open the door.')
    expect(payload.correctIndex).toBe(0)
  })

  it('records provenance for generated items', async () => {
    const result: GenerateItemResult = {
      item: GOOD_ITEM,
      review: GOOD_REVIEW,
      attempts: [{ kind: 'success', item: GOOD_ITEM, review: GOOD_REVIEW }],
    }

    await ingestGeneratedItem(db, result, OPTIONS, NOW)

    const version = await getItemVersion(db, 'item.gen.1@1')
    expect(version!.provenanceId).toBe('prov.generated.gemini-2.0-flash')
  })

  it('uses the skill option when provided', async () => {
    const result: GenerateItemResult = {
      item: GOOD_ITEM,
      review: GOOD_REVIEW,
      attempts: [{ kind: 'success', item: GOOD_ITEM, review: GOOD_REVIEW }],
    }

    await ingestGeneratedItem(db, result, { ...OPTIONS, skill: 'reading' }, NOW)

    const item = await getItem(db, 'item.gen.1')
    expect(item?.skill).toBe('reading')
  })

  it('is idempotent on provenance (multiple ingests with same model)', async () => {
    const result1: GenerateItemResult = {
      item: GOOD_ITEM,
      review: GOOD_REVIEW,
      attempts: [{ kind: 'success', item: GOOD_ITEM, review: GOOD_REVIEW }],
    }
    const result2: GenerateItemResult = {
      item: { ...GOOD_ITEM, id: 'item.gen.2' },
      review: GOOD_REVIEW,
      attempts: [{ kind: 'success', item: { ...GOOD_ITEM, id: 'item.gen.2' }, review: GOOD_REVIEW }],
    }

    // Both use the same provenance ID — should not throw.
    await ingestGeneratedItem(db, result1, OPTIONS, NOW)
    await ingestGeneratedItem(db, result2, OPTIONS, NOW + 1000)

    expect((await getItem(db, 'item.gen.1'))?.status).toBe('published')
    expect((await getItem(db, 'item.gen.2'))?.status).toBe('published')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/content/ingest.test.ts --reporter verbose`
Expected: FAIL — module `@/content/ingest` does not exist yet.

- [ ] **Step 3: Write the implementation**

Create `src/content/ingest.ts`:

```typescript
import type { Db } from '@/db/client'
import type { GenerateItemResult } from '@/generation/generate'
import type { ItemReview } from '@/items/types'
import type { ProfilerInventory } from '@/profiler/profile'
import type { SkillArea } from '@/skill-graph/types'
import { createItem, recordProvenance } from './repository'
import type { ProvenanceInput } from './repository'
import { PublishRejectedError, publishItemVersion } from './publish'

// ─── Types ───────────────────────────────────────────────────────────────

export interface IngestOptions {
  provenance: ProvenanceInput
  inventory: ProfilerInventory
  // Skill area for the item. Defaults to 'general'.
  skill?: SkillArea
}

export type IngestResult =
  | { status: 'published'; itemId: string; versionId: string }
  | { status: 'rejected'; itemId: string; versionId: string; review: ItemReview }
  | { status: 'failed' }

// ─── Bridge ──────────────────────────────────────────────────────────────

// Take a generation result and store it in the database. If generation
// succeeded, the item is created as a draft and then published through the
// same quality-gated publish boundary that all content passes through.
//
// Provenance is recorded idempotently — multiple items from the same model
// share one provenance row.
export async function ingestGeneratedItem(
  db: Db,
  result: GenerateItemResult,
  options: IngestOptions,
  now: number,
): Promise<IngestResult> {
  // Nothing to store when generation failed entirely.
  if (!result.item) return { status: 'failed' }

  const item = result.item
  const skill = options.skill ?? 'general'

  // Record provenance once per model. The onConflictDoNothing in
  // recordProvenance makes this idempotent.
  await recordProvenance(db, options.provenance, now)

  // Create the item as a draft with its first version.
  const versionId = await createItem(
    db,
    {
      id: item.id,
      type: 'mcq',
      level: item.level,
      skill,
      nodeIds: item.nodeIds,
      payload: {
        stem: item.stem,
        options: item.options,
        correctIndex: item.correctIndex,
        nodeIds: item.nodeIds,
      },
      provenanceId: options.provenance.id,
    },
    now,
  )

  // Publish through the quality-gated boundary. The deterministic gates
  // run again here as a safety net — they should pass since the generation
  // pipeline already gated the item.
  try {
    await publishItemVersion(db, versionId, options.inventory, now)
    return { status: 'published', itemId: item.id, versionId }
  } catch (err) {
    if (err instanceof PublishRejectedError) {
      return { status: 'rejected', itemId: item.id, versionId, review: err.review }
    }
    throw err
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/content/ingest.test.ts --reporter verbose`
Expected: All tests pass.

- [ ] **Step 5: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 902+ tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/ingest.ts tests/content/ingest.test.ts
git commit -m "feat(content): add generation-to-storage bridge

ingestGeneratedItem takes a GenerateItemResult, records provenance,
creates the item as a draft, and publishes through the quality-gated
boundary. Idempotent on provenance.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Item Statistics Repository

**Files:**
- Create: `src/content/statistics.ts`
- Create: `tests/content/statistics.test.ts`

**Interfaces:**
- Consumes: `itemStatistics` table from `@/db/schema`
- Consumes: `sqlExcluded` from `@/db/sql-helpers`
- Consumes: `Db` from `@/db/client`
- Produces:
  - `interface ItemStatistics { itemVersionId: string; attempts: number; correct: number; pValue: number | null; discrimination: number | null; abandonments: number; reports: number; updatedAt: number }`
  - `recordAttempt(db: Db, versionId: string, correct: boolean, now: number): Promise<void>`
  - `recordAbandonment(db: Db, versionId: string, now: number): Promise<void>`
  - `recordReport(db: Db, versionId: string, now: number): Promise<void>`
  - `getStatistics(db: Db, versionId: string): Promise<ItemStatistics | null>`

- [ ] **Step 1: Write the failing tests**

Create `tests/content/statistics.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import {
  recordAttempt,
  recordAbandonment,
  recordReport,
  getStatistics,
} from '@/content/statistics'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db
let versionId: string

const PAYLOAD = {
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past'],
}

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(
    db,
    [
      {
        id: 'gram.b1.pp_vs_past',
        type: 'grammar',
        level: 'B1',
        skill: 'general',
        title: 'Present perfect vs past simple',
        description: '',
        metadata: null,
      },
    ],
    NOW,
  )
  await recordProvenance(
    db,
    { id: 'prov.original', sourceName: 'original', licence: 'original' },
    NOW,
  )
  versionId = await createItem(
    db,
    {
      id: 'item.1',
      type: 'mcq',
      level: 'B1',
      skill: 'general',
      nodeIds: ['gram.b1.pp_vs_past'],
      payload: PAYLOAD,
      provenanceId: 'prov.original',
    },
    NOW,
  )
  await publishItemVersion(db, versionId, inventory, NOW)
})

// ─── recordAttempt ───────────────────────────────────────────────────────

describe('recordAttempt', () => {
  it('creates statistics on first attempt', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats).not.toBeNull()
    expect(stats!.attempts).toBe(1)
    expect(stats!.correct).toBe(1)
    expect(stats!.pValue).toBeCloseTo(1.0)
  })

  it('increments on subsequent attempts', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)
    await recordAttempt(db, versionId, false, NOW + 2000)
    await recordAttempt(db, versionId, true, NOW + 3000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.attempts).toBe(3)
    expect(stats!.correct).toBe(2)
    expect(stats!.pValue).toBeCloseTo(2 / 3)
  })

  it('tracks incorrect answers without incrementing correct', async () => {
    await recordAttempt(db, versionId, false, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.attempts).toBe(1)
    expect(stats!.correct).toBe(0)
    expect(stats!.pValue).toBeCloseTo(0)
  })

  it('updates the timestamp on each attempt', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)
    await recordAttempt(db, versionId, true, NOW + 5000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.updatedAt).toBe(NOW + 5000)
  })
})

// ─── recordAbandonment ───────────────────────────────────────────────────

describe('recordAbandonment', () => {
  it('tracks abandonments separately from attempts', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)
    await recordAbandonment(db, versionId, NOW + 2000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.attempts).toBe(1)
    expect(stats!.abandonments).toBe(1)
  })

  it('creates statistics on first abandonment', async () => {
    await recordAbandonment(db, versionId, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats).not.toBeNull()
    expect(stats!.abandonments).toBe(1)
    expect(stats!.attempts).toBe(0)
  })
})

// ─── recordReport ────────────────────────────────────────────────────────

describe('recordReport', () => {
  it('tracks reports', async () => {
    await recordReport(db, versionId, NOW + 1000)
    await recordReport(db, versionId, NOW + 2000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.reports).toBe(2)
  })

  it('creates statistics on first report', async () => {
    await recordReport(db, versionId, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats).not.toBeNull()
    expect(stats!.reports).toBe(1)
    expect(stats!.attempts).toBe(0)
  })
})

// ─── getStatistics ───────────────────────────────────────────────────────

describe('getStatistics', () => {
  it('returns null when no statistics exist', async () => {
    const stats = await getStatistics(db, versionId)
    expect(stats).toBeNull()
  })

  it('leaves discrimination null (computed by batch pipeline)', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.discrimination).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/content/statistics.test.ts --reporter verbose`
Expected: FAIL — module `@/content/statistics` does not exist yet.

- [ ] **Step 3: Write the implementation**

Create `src/content/statistics.ts`:

```typescript
import { eq, sql } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { itemStatistics } from '@/db/schema'

// ─── Types ───────────────────────────────────────────────────────────────

export interface ItemStatistics {
  itemVersionId: string
  attempts: number
  correct: number
  pValue: number | null
  discrimination: number | null
  abandonments: number
  reports: number
  updatedAt: number
}

// ─── Recording functions ─────────────────────────────────────────────────

// Record a learner's attempt at an item version. Creates the statistics
// row on first call (upsert), increments counters, and recomputes p_value.
export async function recordAttempt(
  db: Db,
  versionId: string,
  correct: boolean,
  now: number,
): Promise<void> {
  const correctIncrement = correct ? 1 : 0

  await db
    .insert(itemStatistics)
    .values({
      itemVersionId: versionId,
      attempts: 1,
      correct: correctIncrement,
      pValue: correctIncrement,
      discrimination: null,
      abandonments: 0,
      reports: 0,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: itemStatistics.itemVersionId,
      set: {
        attempts: sql`${itemStatistics.attempts} + 1`,
        correct: sql`${itemStatistics.correct} + ${correctIncrement}`,
        pValue: sql`CAST(${itemStatistics.correct} + ${correctIncrement} AS REAL) / (${itemStatistics.attempts} + 1)`,
        updatedAt: now,
      },
    })
}

// Record that a learner abandoned this item without answering.
export async function recordAbandonment(
  db: Db,
  versionId: string,
  now: number,
): Promise<void> {
  await db
    .insert(itemStatistics)
    .values({
      itemVersionId: versionId,
      attempts: 0,
      correct: 0,
      pValue: null,
      discrimination: null,
      abandonments: 1,
      reports: 0,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: itemStatistics.itemVersionId,
      set: {
        abandonments: sql`${itemStatistics.abandonments} + 1`,
        updatedAt: now,
      },
    })
}

// Record a one-tap "this item is wrong or confusing" report.
export async function recordReport(
  db: Db,
  versionId: string,
  now: number,
): Promise<void> {
  await db
    .insert(itemStatistics)
    .values({
      itemVersionId: versionId,
      attempts: 0,
      correct: 0,
      pValue: null,
      discrimination: null,
      abandonments: 0,
      reports: 1,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: itemStatistics.itemVersionId,
      set: {
        reports: sql`${itemStatistics.reports} + 1`,
        updatedAt: now,
      },
    })
}

// ─── Query ───────────────────────────────────────────────────────────────

// Fetch current statistics for an item version. Returns null when no
// attempts, abandonments, or reports have been recorded.
export async function getStatistics(
  db: Db,
  versionId: string,
): Promise<ItemStatistics | null> {
  const rows = await db
    .select()
    .from(itemStatistics)
    .where(eq(itemStatistics.itemVersionId, versionId))
    .limit(1)

  const row = rows[0]
  if (!row) return null

  return {
    itemVersionId: row.itemVersionId,
    attempts: row.attempts,
    correct: row.correct,
    pValue: row.pValue,
    discrimination: row.discrimination,
    abandonments: row.abandonments,
    reports: row.reports,
    updatedAt: row.updatedAt,
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/content/statistics.test.ts --reporter verbose`
Expected: All tests pass.

- [ ] **Step 5: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 902+ tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/statistics.ts tests/content/statistics.test.ts
git commit -m "feat(content): add item statistics recording

recordAttempt, recordAbandonment, recordReport — upsert-based counters
with p_value recomputation. Discrimination left null for R1b-g batch
pipeline.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
