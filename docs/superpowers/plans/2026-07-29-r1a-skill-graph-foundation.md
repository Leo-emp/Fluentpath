# FluentPath R1a — Skill Graph Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the CEFR skill graph, the learner mastery model, and the sequencer that decides what a learner practises next — the data foundation every other part of FluentPath queries.

**Architecture:** A directed acyclic graph of atomic skill nodes (can-do, grammar, lexical, phonological, strategy) connected by prerequisite edges. Per-learner mastery is stored per node and decays over time, so spaced review falls out of the model rather than being bolted on. The sequencer selects what to practise next by finding nodes whose prerequisites are satisfied, prioritising review-due material over new material, and interleaving node types. All scoring and selection logic is written as pure functions so it is exhaustively testable without a database.

**Tech Stack:** TypeScript, Next.js 16 (App Router), Turso (libSQL), Drizzle ORM, Vitest.

## Global Constraints

- Node IDs are stable, human-readable dotted strings — `gram.b1.present_perfect_for_since`. Never auto-increment integers; content references these by hand.
- CEFR levels are exactly: `preA1`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`. No other values anywhere.
- Node types are exactly: `cando`, `grammar`, `lexical`, `phono`, `strategy`.
- Skill areas are exactly: `reading`, `writing`, `listening`, `speaking`, `general`.
- All timestamps are epoch milliseconds stored as SQLite integers. Never store dates as strings.
- Mastery and confidence are floats clamped to `0..1` inclusive at every write.
- The graph must remain acyclic. A cycle is a data error that fails validation, never a runtime condition to handle.
- No `Date.now()` inside pure functions — time is always an explicit parameter, so tests are deterministic.
- Every pure function lives in its own module with no database imports.

---

### Task 1: Project scaffold and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `drizzle.config.ts`
- Create: `.env.example`
- Create: `src/db/client.ts`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `db` (Drizzle client instance) exported from `src/db/client.ts`

- [ ] **Step 1: Initialise the project**

```bash
cd C:/Users/User/fluentpath
npm init -y
npm install next@latest react@latest react-dom@latest
npm install drizzle-orm @libsql/client
npm install -D typescript @types/node vitest drizzle-kit
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "types": ["vitest/globals"],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*", "tests/**/*", "*.config.ts"]
}
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 4: Create `.env.example`**

```
TURSO_DATABASE_URL=file:./local.db
TURSO_AUTH_TOKEN=
```

- [ ] **Step 5: Create `src/db/client.ts`**

```ts
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })
export type Db = typeof db
```

- [ ] **Step 6: Create `src/db/schema/index.ts` as an empty barrel**

```ts
// Populated by Task 2 and Task 5.
export {}
```

- [ ] **Step 7: Create `drizzle.config.ts`**

```ts
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL ?? 'file:./local.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config
```

- [ ] **Step 8: Write the smoke test**

```ts
// tests/smoke.test.ts
import { describe, it, expect } from 'vitest'

describe('harness', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 9: Add the test script to `package.json`**

Add to the `"scripts"` object:

```json
"test": "vitest run",
"test:watch": "vitest",
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate"
```

- [ ] **Step 10: Run the test**

Run: `npm test`
Expected: PASS, 1 test.

- [ ] **Step 11: Commit**

```bash
git init
git add -A
git commit -m "chore: project scaffold with drizzle, turso and vitest"
```

---

### Task 2: Skill graph schema

**Files:**
- Create: `src/skill-graph/types.ts`
- Create: `src/db/schema/skill-graph.ts`
- Modify: `src/db/schema/index.ts`
- Test: `tests/skill-graph/types.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - Types `CefrLevel`, `NodeType`, `SkillArea`, `SkillNode`, `SkillEdge`
  - Constants `CEFR_LEVELS`, `NODE_TYPES`, `SKILL_AREAS`
  - Function `levelIndex(level: CefrLevel): number`
  - Tables `skillNodes`, `skillEdges`

- [ ] **Step 1: Write the failing test**

```ts
// tests/skill-graph/types.test.ts
import { describe, it, expect } from 'vitest'
import { CEFR_LEVELS, levelIndex } from '@/skill-graph/types'

describe('CEFR levels', () => {
  it('lists all seven levels in ascending order', () => {
    expect(CEFR_LEVELS).toEqual(['preA1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  })

  it('maps a level to its ordinal position', () => {
    expect(levelIndex('preA1')).toBe(0)
    expect(levelIndex('B1')).toBe(3)
    expect(levelIndex('C2')).toBe(6)
  })

  it('orders levels correctly for comparison', () => {
    expect(levelIndex('A2')).toBeLessThan(levelIndex('B2'))
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/skill-graph/types.test.ts`
Expected: FAIL — cannot resolve `@/skill-graph/types`.

- [ ] **Step 3: Create `src/skill-graph/types.ts`**

```ts
export const CEFR_LEVELS = ['preA1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type CefrLevel = (typeof CEFR_LEVELS)[number]

export const NODE_TYPES = ['cando', 'grammar', 'lexical', 'phono', 'strategy'] as const
export type NodeType = (typeof NODE_TYPES)[number]

export const SKILL_AREAS = ['reading', 'writing', 'listening', 'speaking', 'general'] as const
export type SkillArea = (typeof SKILL_AREAS)[number]

/** Ordinal position of a CEFR level, 0 (preA1) through 6 (C2). */
export function levelIndex(level: CefrLevel): number {
  return CEFR_LEVELS.indexOf(level)
}

export interface SkillNode {
  id: string
  type: NodeType
  level: CefrLevel
  skill: SkillArea
  title: string
  description: string
  metadata: Record<string, unknown> | null
}

export interface SkillEdge {
  /** Prerequisite node — must be learned first. */
  fromNodeId: string
  /** Dependent node — becomes eligible once the prerequisite is met. */
  toNodeId: string
  /** How strongly the prerequisite gates the dependent, 0..1. */
  strength: number
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/skill-graph/types.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Create `src/db/schema/skill-graph.ts`**

```ts
import { sqliteTable, text, real, integer, primaryKey, index } from 'drizzle-orm/sqlite-core'

export const skillNodes = sqliteTable(
  'skill_nodes',
  {
    id: text('id').primaryKey(),
    type: text('type').notNull(),
    level: text('level').notNull(),
    skill: text('skill').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull().default(''),
    metadata: text('metadata', { mode: 'json' }).$type<Record<string, unknown> | null>(),
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    levelIdx: index('skill_nodes_level_idx').on(t.level),
    typeIdx: index('skill_nodes_type_idx').on(t.type),
    skillIdx: index('skill_nodes_skill_idx').on(t.skill),
  }),
)

export const skillEdges = sqliteTable(
  'skill_edges',
  {
    fromNodeId: text('from_node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),
    toNodeId: text('to_node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),
    strength: real('strength').notNull().default(1),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.fromNodeId, t.toNodeId] }),
    toIdx: index('skill_edges_to_idx').on(t.toNodeId),
  }),
)
```

- [ ] **Step 6: Update `src/db/schema/index.ts`**

```ts
export * from './skill-graph'
```

- [ ] **Step 7: Generate and apply the migration**

Run: `npm run db:generate && npm run db:migrate`
Expected: a migration file appears in `drizzle/`, and `local.db` contains `skill_nodes` and `skill_edges`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: skill graph types and schema"
```

---

### Task 3: Graph validation

**Files:**
- Create: `src/skill-graph/validation.ts`
- Test: `tests/skill-graph/validation.test.ts`

**Interfaces:**
- Consumes: `SkillNode`, `SkillEdge`, `levelIndex` from `@/skill-graph/types`
- Produces: `validateGraph(nodes: SkillNode[], edges: SkillEdge[]): GraphValidationResult` where `GraphValidationResult = { valid: boolean; errors: GraphError[] }` and `GraphError = { code: 'CYCLE' | 'MISSING_NODE' | 'LEVEL_INVERSION'; message: string; nodeIds: string[] }`

- [ ] **Step 1: Write the failing test**

```ts
// tests/skill-graph/validation.test.ts
import { describe, it, expect } from 'vitest'
import { validateGraph } from '@/skill-graph/validation'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'

function node(id: string, level: SkillNode['level']): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

describe('validateGraph', () => {
  it('accepts a valid acyclic graph', () => {
    const nodes = [node('a', 'A1'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    expect(validateGraph(nodes, edges)).toEqual({ valid: true, errors: [] })
  })

  it('rejects a cycle', () => {
    const nodes = [node('a', 'A1'), node('b', 'A1')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'b', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'a', strength: 1 },
    ]
    const result = validateGraph(nodes, edges)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === 'CYCLE')).toBe(true)
  })

  it('rejects an edge referencing an unknown node', () => {
    const nodes = [node('a', 'A1')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'ghost', strength: 1 }]
    const result = validateGraph(nodes, edges)
    expect(result.valid).toBe(false)
    expect(result.errors[0]?.code).toBe('MISSING_NODE')
  })

  it('rejects a prerequisite at a higher level than its dependent', () => {
    const nodes = [node('hard', 'C1'), node('easy', 'A1')]
    const edges: SkillEdge[] = [{ fromNodeId: 'hard', toNodeId: 'easy', strength: 1 }]
    const result = validateGraph(nodes, edges)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === 'LEVEL_INVERSION')).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/skill-graph/validation.test.ts`
Expected: FAIL — cannot resolve `@/skill-graph/validation`.

- [ ] **Step 3: Create `src/skill-graph/validation.ts`**

```ts
import { levelIndex, type SkillEdge, type SkillNode } from './types'

export interface GraphError {
  code: 'CYCLE' | 'MISSING_NODE' | 'LEVEL_INVERSION'
  message: string
  nodeIds: string[]
}

export interface GraphValidationResult {
  valid: boolean
  errors: GraphError[]
}

export function validateGraph(nodes: SkillNode[], edges: SkillEdge[]): GraphValidationResult {
  const errors: GraphError[] = []
  const byId = new Map(nodes.map((n) => [n.id, n]))

  // Every edge endpoint must exist.
  const validEdges: SkillEdge[] = []
  for (const edge of edges) {
    const from = byId.get(edge.fromNodeId)
    const to = byId.get(edge.toNodeId)
    if (!from || !to) {
      const missing = !from ? edge.fromNodeId : edge.toNodeId
      errors.push({
        code: 'MISSING_NODE',
        message: `Edge references unknown node "${missing}".`,
        nodeIds: [edge.fromNodeId, edge.toNodeId],
      })
      continue
    }
    // A prerequisite may sit at the same level, never above its dependent.
    if (levelIndex(from.level) > levelIndex(to.level)) {
      errors.push({
        code: 'LEVEL_INVERSION',
        message: `Prerequisite "${from.id}" (${from.level}) is above dependent "${to.id}" (${to.level}).`,
        nodeIds: [from.id, to.id],
      })
    }
    validEdges.push(edge)
  }

  // Depth-first cycle detection over edges with known endpoints.
  const adjacency = new Map<string, string[]>()
  for (const edge of validEdges) {
    const list = adjacency.get(edge.fromNodeId) ?? []
    list.push(edge.toNodeId)
    adjacency.set(edge.fromNodeId, list)
  }

  const UNVISITED = 0
  const IN_PROGRESS = 1
  const DONE = 2
  const state = new Map<string, number>()
  for (const n of nodes) state.set(n.id, UNVISITED)

  const stack: string[] = []
  function visit(id: string): void {
    state.set(id, IN_PROGRESS)
    stack.push(id)
    for (const next of adjacency.get(id) ?? []) {
      const s = state.get(next) ?? UNVISITED
      if (s === IN_PROGRESS) {
        const start = stack.indexOf(next)
        errors.push({
          code: 'CYCLE',
          message: `Cycle detected: ${[...stack.slice(start), next].join(' -> ')}`,
          nodeIds: stack.slice(start),
        })
      } else if (s === UNVISITED) {
        visit(next)
      }
    }
    stack.pop()
    state.set(id, DONE)
  }

  for (const n of nodes) {
    if (state.get(n.id) === UNVISITED) visit(n.id)
  }

  return { valid: errors.length === 0, errors }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/skill-graph/validation.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: skill graph validation with cycle and level-inversion detection"
```

---

### Task 4: Skill graph repository

**Files:**
- Create: `src/skill-graph/repository.ts`
- Create: `tests/helpers/test-db.ts`
- Test: `tests/skill-graph/repository.test.ts`

**Interfaces:**
- Consumes: `db` from `@/db/client`, tables from `@/db/schema`, types from `@/skill-graph/types`
- Produces:
  - `upsertNodes(db: Db, nodes: SkillNode[], now: number): Promise<void>`
  - `upsertEdges(db: Db, edges: SkillEdge[]): Promise<void>`
  - `getNode(db: Db, id: string): Promise<SkillNode | null>`
  - `listNodes(db: Db, filter?: { level?: CefrLevel; type?: NodeType; skill?: SkillArea }): Promise<SkillNode[]>`
  - `listEdges(db: Db): Promise<SkillEdge[]>`
  - `getPrerequisites(db: Db, nodeId: string): Promise<SkillEdge[]>`

- [ ] **Step 1: Create the in-memory test database helper**

```ts
// tests/helpers/test-db.ts
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import * as schema from '@/db/schema'
import type { Db } from '@/db/client'

/** Fresh in-memory database with all migrations applied. */
export async function makeTestDb(): Promise<Db> {
  const client = createClient({ url: ':memory:' })
  const db = drizzle(client, { schema })
  await migrate(db, { migrationsFolder: './drizzle' })
  return db as unknown as Db
}
```

- [ ] **Step 2: Write the failing test**

```ts
// tests/skill-graph/repository.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { upsertNodes, upsertEdges, getNode, listNodes, getPrerequisites } from '@/skill-graph/repository'
import type { Db } from '@/db/client'
import type { SkillNode } from '@/skill-graph/types'

const NOW = 1_700_000_000_000

function node(id: string, level: SkillNode['level'] = 'A1'): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
})

describe('skill graph repository', () => {
  it('stores and retrieves a node', async () => {
    await upsertNodes(db, [node('gram.a1.be')], NOW)
    const found = await getNode(db, 'gram.a1.be')
    expect(found?.id).toBe('gram.a1.be')
    expect(found?.level).toBe('A1')
  })

  it('returns null for an unknown node', async () => {
    expect(await getNode(db, 'nope')).toBeNull()
  })

  it('upserts idempotently', async () => {
    await upsertNodes(db, [node('gram.a1.be')], NOW)
    await upsertNodes(db, [{ ...node('gram.a1.be'), title: 'updated' }], NOW + 1000)
    const all = await listNodes(db)
    expect(all).toHaveLength(1)
    expect(all[0]?.title).toBe('updated')
  })

  it('filters nodes by level', async () => {
    await upsertNodes(db, [node('a', 'A1'), node('b', 'B1')], NOW)
    const result = await listNodes(db, { level: 'B1' })
    expect(result.map((n) => n.id)).toEqual(['b'])
  })

  it('returns the prerequisites of a node', async () => {
    await upsertNodes(db, [node('base', 'A1'), node('next', 'A2')], NOW)
    await upsertEdges(db, [{ fromNodeId: 'base', toNodeId: 'next', strength: 1 }])
    const prereqs = await getPrerequisites(db, 'next')
    expect(prereqs.map((e) => e.fromNodeId)).toEqual(['base'])
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- tests/skill-graph/repository.test.ts`
Expected: FAIL — cannot resolve `@/skill-graph/repository`.

- [ ] **Step 4: Create `src/skill-graph/repository.ts`**

```ts
import { and, eq } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { skillEdges, skillNodes } from '@/db/schema'
import type { CefrLevel, NodeType, SkillArea, SkillEdge, SkillNode } from './types'

type NodeRow = typeof skillNodes.$inferSelect

function toNode(row: NodeRow): SkillNode {
  return {
    id: row.id,
    type: row.type as NodeType,
    level: row.level as CefrLevel,
    skill: row.skill as SkillArea,
    title: row.title,
    description: row.description,
    metadata: row.metadata,
  }
}

export async function upsertNodes(db: Db, nodes: SkillNode[], now: number): Promise<void> {
  if (nodes.length === 0) return
  await db
    .insert(skillNodes)
    .values(nodes.map((n) => ({ ...n, createdAt: now, updatedAt: now })))
    .onConflictDoUpdate({
      target: skillNodes.id,
      set: {
        type: sqlExcluded('type'),
        level: sqlExcluded('level'),
        skill: sqlExcluded('skill'),
        title: sqlExcluded('title'),
        description: sqlExcluded('description'),
        metadata: sqlExcluded('metadata'),
        updatedAt: now,
      },
    })
}

export async function upsertEdges(db: Db, edges: SkillEdge[]): Promise<void> {
  if (edges.length === 0) return
  await db
    .insert(skillEdges)
    .values(edges)
    .onConflictDoUpdate({
      target: [skillEdges.fromNodeId, skillEdges.toNodeId],
      set: { strength: sqlExcluded('strength') },
    })
}

export async function getNode(db: Db, id: string): Promise<SkillNode | null> {
  const rows = await db.select().from(skillNodes).where(eq(skillNodes.id, id)).limit(1)
  const row = rows[0]
  return row ? toNode(row) : null
}

export async function listNodes(
  db: Db,
  filter: { level?: CefrLevel; type?: NodeType; skill?: SkillArea } = {},
): Promise<SkillNode[]> {
  const conditions = []
  if (filter.level) conditions.push(eq(skillNodes.level, filter.level))
  if (filter.type) conditions.push(eq(skillNodes.type, filter.type))
  if (filter.skill) conditions.push(eq(skillNodes.skill, filter.skill))

  const rows = conditions.length
    ? await db.select().from(skillNodes).where(and(...conditions))
    : await db.select().from(skillNodes)

  return rows.map(toNode)
}

export async function listEdges(db: Db): Promise<SkillEdge[]> {
  return db.select().from(skillEdges)
}

export async function getPrerequisites(db: Db, nodeId: string): Promise<SkillEdge[]> {
  return db.select().from(skillEdges).where(eq(skillEdges.toNodeId, nodeId))
}
```

- [ ] **Step 5: Add the `sqlExcluded` helper**

Create `src/db/sql-helpers.ts`:

```ts
import { sql } from 'drizzle-orm'

/** References the conflicting row's value in an upsert, e.g. `excluded.title`. */
export function sqlExcluded(column: string) {
  return sql.raw(`excluded.${column}`)
}
```

Then add the import to the top of `src/skill-graph/repository.ts`:

```ts
import { sqlExcluded } from '@/db/sql-helpers'
```

Note the column names passed to `sqlExcluded` are the **SQL** column names, so `metadata` stays `metadata` but any snake_case column must use its database name.

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- tests/skill-graph/repository.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: skill graph repository with upsert and filtered queries"
```

---

### Task 5: Learner mastery schema and repository

**Files:**
- Create: `src/mastery/types.ts`
- Create: `src/db/schema/mastery.ts`
- Modify: `src/db/schema/index.ts`
- Create: `src/mastery/repository.ts`
- Test: `tests/mastery/repository.test.ts`

**Interfaces:**
- Consumes: `Db`, `skillNodes`
- Produces:
  - Type `MasteryRecord = { learnerId: string; nodeId: string; mastery: number; confidence: number; exposures: number; correctStreak: number; lastSeenAt: number }`
  - Table `learnerMastery`
  - `getMastery(db, learnerId, nodeId): Promise<MasteryRecord | null>`
  - `listMastery(db, learnerId): Promise<MasteryRecord[]>`
  - `saveMastery(db, record: MasteryRecord): Promise<void>`

- [ ] **Step 1: Create `src/mastery/types.ts`**

```ts
export interface MasteryRecord {
  learnerId: string
  nodeId: string
  /** Estimated ability on this node at `lastSeenAt`, 0..1. Undecayed. */
  mastery: number
  /** How much evidence supports the estimate, 0..1. */
  confidence: number
  exposures: number
  correctStreak: number
  lastSeenAt: number
}

/** Clamp any computed value into the 0..1 range. */
export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0
  return Math.min(1, Math.max(0, value))
}
```

- [ ] **Step 2: Write the failing test**

```ts
// tests/mastery/repository.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { upsertNodes } from '@/skill-graph/repository'
import { getMastery, listMastery, saveMastery } from '@/mastery/repository'
import type { Db } from '@/db/client'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000
let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(
    db,
    [
      { id: 'n1', type: 'grammar', level: 'A1', skill: 'general', title: 'n1', description: '', metadata: null },
      { id: 'n2', type: 'grammar', level: 'A2', skill: 'general', title: 'n2', description: '', metadata: null },
    ],
    NOW,
  )
})

function record(nodeId: string, mastery: number): MasteryRecord {
  return { learnerId: 'u1', nodeId, mastery, confidence: 0.5, exposures: 3, correctStreak: 1, lastSeenAt: NOW }
}

describe('mastery repository', () => {
  it('returns null when no record exists', async () => {
    expect(await getMastery(db, 'u1', 'n1')).toBeNull()
  })

  it('saves and reads back a record', async () => {
    await saveMastery(db, record('n1', 0.7))
    const found = await getMastery(db, 'u1', 'n1')
    expect(found?.mastery).toBeCloseTo(0.7)
    expect(found?.exposures).toBe(3)
  })

  it('overwrites an existing record for the same learner and node', async () => {
    await saveMastery(db, record('n1', 0.2))
    await saveMastery(db, { ...record('n1', 0.9), exposures: 4 })
    const all = await listMastery(db, 'u1')
    expect(all).toHaveLength(1)
    expect(all[0]?.mastery).toBeCloseTo(0.9)
    expect(all[0]?.exposures).toBe(4)
  })

  it('keeps learners separate', async () => {
    await saveMastery(db, record('n1', 0.5))
    await saveMastery(db, { ...record('n1', 0.8), learnerId: 'u2' })
    expect(await listMastery(db, 'u1')).toHaveLength(1)
    expect((await listMastery(db, 'u2'))[0]?.mastery).toBeCloseTo(0.8)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- tests/mastery/repository.test.ts`
Expected: FAIL — cannot resolve `@/mastery/repository`.

- [ ] **Step 4: Create `src/db/schema/mastery.ts`**

```ts
import { sqliteTable, text, real, integer, primaryKey, index } from 'drizzle-orm/sqlite-core'
import { skillNodes } from './skill-graph'

export const learnerMastery = sqliteTable(
  'learner_mastery',
  {
    learnerId: text('learner_id').notNull(),
    nodeId: text('node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),
    mastery: real('mastery').notNull().default(0),
    confidence: real('confidence').notNull().default(0),
    exposures: integer('exposures').notNull().default(0),
    correctStreak: integer('correct_streak').notNull().default(0),
    lastSeenAt: integer('last_seen_at').notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.learnerId, t.nodeId] }),
    learnerIdx: index('learner_mastery_learner_idx').on(t.learnerId),
  }),
)
```

- [ ] **Step 5: Update `src/db/schema/index.ts`**

```ts
export * from './skill-graph'
export * from './mastery'
```

- [ ] **Step 6: Create `src/mastery/repository.ts`**

```ts
import { and, eq } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { learnerMastery } from '@/db/schema'
import { sqlExcluded } from '@/db/sql-helpers'
import { clamp01, type MasteryRecord } from './types'

export async function getMastery(db: Db, learnerId: string, nodeId: string): Promise<MasteryRecord | null> {
  const rows = await db
    .select()
    .from(learnerMastery)
    .where(and(eq(learnerMastery.learnerId, learnerId), eq(learnerMastery.nodeId, nodeId)))
    .limit(1)
  return rows[0] ?? null
}

export async function listMastery(db: Db, learnerId: string): Promise<MasteryRecord[]> {
  return db.select().from(learnerMastery).where(eq(learnerMastery.learnerId, learnerId))
}

export async function saveMastery(db: Db, record: MasteryRecord): Promise<void> {
  const safe: MasteryRecord = {
    ...record,
    mastery: clamp01(record.mastery),
    confidence: clamp01(record.confidence),
  }
  await db
    .insert(learnerMastery)
    .values(safe)
    .onConflictDoUpdate({
      target: [learnerMastery.learnerId, learnerMastery.nodeId],
      set: {
        mastery: sqlExcluded('mastery'),
        confidence: sqlExcluded('confidence'),
        exposures: sqlExcluded('exposures'),
        correctStreak: sqlExcluded('correct_streak'),
        lastSeenAt: sqlExcluded('last_seen_at'),
      },
    })
}
```

- [ ] **Step 7: Regenerate migrations and run the test**

Run: `npm run db:generate && npm test -- tests/mastery/repository.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: learner mastery schema and repository"
```

---

### Task 6: Mastery decay

**Files:**
- Create: `src/mastery/decay.ts`
- Test: `tests/mastery/decay.test.ts`

**Interfaces:**
- Consumes: `MasteryRecord`, `clamp01` from `@/mastery/types`
- Produces:
  - `RETENTION_FLOOR = 0.25`
  - `DEFAULT_HALF_LIFE_DAYS = 30`
  - `halfLifeDays(confidence: number): number`
  - `retainedMastery(record: MasteryRecord, now: number): number`

**Design note:** mastery decays toward a floor, not toward zero — a learner who once knew something retains partial recognition indefinitely. Decay is slower for well-established knowledge, so half-life scales with confidence.

- [ ] **Step 1: Write the failing test**

```ts
// tests/mastery/decay.test.ts
import { describe, it, expect } from 'vitest'
import { retainedMastery, halfLifeDays, RETENTION_FLOOR } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000
const DAY = 86_400_000

function rec(over: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    learnerId: 'u1',
    nodeId: 'n1',
    mastery: 1,
    confidence: 0.5,
    exposures: 5,
    correctStreak: 2,
    lastSeenAt: NOW,
    ...over,
  }
}

describe('halfLifeDays', () => {
  it('gives well-established knowledge a longer half-life', () => {
    expect(halfLifeDays(0.9)).toBeGreaterThan(halfLifeDays(0.1))
  })
})

describe('retainedMastery', () => {
  it('returns full mastery when no time has passed', () => {
    expect(retainedMastery(rec(), NOW)).toBeCloseTo(1)
  })

  it('decays roughly halfway to the floor after one half-life', () => {
    const record = rec({ mastery: 1, confidence: 0.5 })
    const days = halfLifeDays(0.5)
    const result = retainedMastery(record, NOW + days * DAY)
    const expected = RETENTION_FLOOR + (1 - RETENTION_FLOOR) * 0.5
    expect(result).toBeCloseTo(expected, 5)
  })

  it('never falls below the retention floor', () => {
    const result = retainedMastery(rec({ mastery: 1 }), NOW + 10_000 * DAY)
    expect(result).toBeGreaterThanOrEqual(RETENTION_FLOOR)
  })

  it('does not raise mastery that already sits below the floor', () => {
    expect(retainedMastery(rec({ mastery: 0.1 }), NOW + 100 * DAY)).toBeCloseTo(0.1)
  })

  it('treats a future timestamp as no elapsed time', () => {
    expect(retainedMastery(rec(), NOW - 5 * DAY)).toBeCloseTo(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/mastery/decay.test.ts`
Expected: FAIL — cannot resolve `@/mastery/decay`.

- [ ] **Step 3: Create `src/mastery/decay.ts`**

```ts
import { clamp01, type MasteryRecord } from './types'

const DAY_MS = 86_400_000

/** Mastery never decays below this — recognition outlives recall. */
export const RETENTION_FLOOR = 0.25

/** Half-life for a learner with zero confidence. */
export const DEFAULT_HALF_LIFE_DAYS = 30

/**
 * Half-life in days for the given confidence.
 * Well-evidenced knowledge fades more slowly: 30 days at confidence 0,
 * rising to 120 days at confidence 1.
 */
export function halfLifeDays(confidence: number): number {
  return DEFAULT_HALF_LIFE_DAYS * (1 + 3 * clamp01(confidence))
}

/**
 * Mastery as of `now`, after exponential decay toward RETENTION_FLOOR.
 * Mastery already at or below the floor is returned unchanged.
 */
export function retainedMastery(record: MasteryRecord, now: number): number {
  const elapsedMs = now - record.lastSeenAt
  if (elapsedMs <= 0) return clamp01(record.mastery)
  if (record.mastery <= RETENTION_FLOOR) return clamp01(record.mastery)

  const days = elapsedMs / DAY_MS
  const decayFactor = Math.pow(0.5, days / halfLifeDays(record.confidence))
  return clamp01(RETENTION_FLOOR + (record.mastery - RETENTION_FLOOR) * decayFactor)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/mastery/decay.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: mastery decay toward retention floor with confidence-scaled half-life"
```

---

### Task 7: Mastery update

**Files:**
- Create: `src/mastery/update.ts`
- Test: `tests/mastery/update.test.ts`

**Interfaces:**
- Consumes: `MasteryRecord`, `clamp01`, `retainedMastery`
- Produces: `updateMastery(record: MasteryRecord, outcome: number, difficulty: number, now: number): MasteryRecord`

**Design note:** the update starts from *decayed* mastery, not stored mastery, so a learner returning after a month is assessed against what they actually retained. Learning rate falls as confidence rises, so early observations move the estimate more than later ones. Difficulty weights the evidence: succeeding on a hard item is stronger proof than succeeding on an easy one.

- [ ] **Step 1: Write the failing test**

```ts
// tests/mastery/update.test.ts
import { describe, it, expect } from 'vitest'
import { updateMastery } from '@/mastery/update'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000

function rec(over: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    learnerId: 'u1',
    nodeId: 'n1',
    mastery: 0.5,
    confidence: 0,
    exposures: 0,
    correctStreak: 0,
    lastSeenAt: NOW,
    ...over,
  }
}

describe('updateMastery', () => {
  it('raises mastery on a correct answer', () => {
    const next = updateMastery(rec(), 1, 0.5, NOW)
    expect(next.mastery).toBeGreaterThan(0.5)
  })

  it('lowers mastery on a wrong answer', () => {
    const next = updateMastery(rec(), 0, 0.5, NOW)
    expect(next.mastery).toBeLessThan(0.5)
  })

  it('rewards a hard item more than an easy one', () => {
    const hard = updateMastery(rec(), 1, 0.9, NOW)
    const easy = updateMastery(rec(), 1, 0.1, NOW)
    expect(hard.mastery).toBeGreaterThan(easy.mastery)
  })

  it('moves less once confidence is high', () => {
    const green = updateMastery(rec({ confidence: 0 }), 1, 0.5, NOW)
    const seasoned = updateMastery(rec({ confidence: 0.9, exposures: 20 }), 1, 0.5, NOW)
    expect(green.mastery - 0.5).toBeGreaterThan(seasoned.mastery - 0.5)
  })

  it('increments exposures and extends the streak on success', () => {
    const next = updateMastery(rec({ exposures: 3, correctStreak: 2 }), 1, 0.5, NOW)
    expect(next.exposures).toBe(4)
    expect(next.correctStreak).toBe(3)
  })

  it('resets the streak on failure', () => {
    const next = updateMastery(rec({ correctStreak: 5 }), 0, 0.5, NOW)
    expect(next.correctStreak).toBe(0)
  })

  it('raises confidence with every exposure', () => {
    const next = updateMastery(rec({ confidence: 0.2, exposures: 2 }), 1, 0.5, NOW)
    expect(next.confidence).toBeGreaterThan(0.2)
  })

  it('stamps lastSeenAt with the supplied time', () => {
    const later = NOW + 5000
    expect(updateMastery(rec(), 1, 0.5, later).lastSeenAt).toBe(later)
  })

  it('keeps mastery within 0..1 under repeated success', () => {
    let r = rec()
    for (let i = 0; i < 100; i++) r = updateMastery(r, 1, 0.9, NOW)
    expect(r.mastery).toBeLessThanOrEqual(1)
    expect(r.mastery).toBeGreaterThan(0.9)
  })

  it('assesses against decayed mastery, not stored mastery', () => {
    const DAY = 86_400_000
    const stale = rec({ mastery: 1, confidence: 0.5, lastSeenAt: NOW - 200 * DAY })
    const next = updateMastery(stale, 0, 0.5, NOW)
    // Decayed mastery is well below 1, so a wrong answer lands below the floor region
    expect(next.mastery).toBeLessThan(0.5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/mastery/update.test.ts`
Expected: FAIL — cannot resolve `@/mastery/update`.

- [ ] **Step 3: Create `src/mastery/update.ts`**

```ts
import { retainedMastery } from './decay'
import { clamp01, type MasteryRecord } from './types'

/** Learning rate applied to a learner's very first observation on a node. */
const BASE_LEARNING_RATE = 0.4

/** Exposures needed for confidence to reach roughly 63%. */
const CONFIDENCE_SCALE = 8

/**
 * Fold one assessed outcome into a learner's mastery estimate.
 *
 * @param outcome    0 (wrong) .. 1 (fully correct); partial credit permitted
 * @param difficulty 0 (trivial) .. 1 (very hard)
 * @param now        epoch ms of the observation
 */
export function updateMastery(
  record: MasteryRecord,
  outcome: number,
  difficulty: number,
  now: number,
): MasteryRecord {
  const current = retainedMastery(record, now)
  const safeOutcome = clamp01(outcome)
  const safeDifficulty = clamp01(difficulty)

  // Succeeding on a hard item is stronger evidence than succeeding on an easy
  // one; failing an easy item is stronger evidence than failing a hard one.
  const evidence =
    safeOutcome >= 0.5
      ? safeOutcome * (0.6 + 0.4 * safeDifficulty)
      : safeOutcome * (0.6 + 0.4 * (1 - safeDifficulty))

  // Confident estimates move less.
  const learningRate = BASE_LEARNING_RATE * (1 - 0.75 * clamp01(record.confidence))

  const nextMastery = clamp01(current + learningRate * (evidence - current))
  const nextExposures = record.exposures + 1
  const nextConfidence = clamp01(1 - Math.exp(-nextExposures / CONFIDENCE_SCALE))

  return {
    ...record,
    mastery: nextMastery,
    confidence: nextConfidence,
    exposures: nextExposures,
    correctStreak: safeOutcome >= 0.5 ? record.correctStreak + 1 : 0,
    lastSeenAt: now,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/mastery/update.test.ts`
Expected: PASS, 10 tests.

Note: if the "hard item" test fails marginally, the evidence weighting is the knob — do not weaken the assertion, adjust the weighting so hard successes genuinely count for more.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: mastery update with difficulty weighting and confidence-damped learning rate"
```

---

### Task 8: Recording an outcome end to end

**Files:**
- Create: `src/mastery/service.ts`
- Test: `tests/mastery/service.test.ts`

**Interfaces:**
- Consumes: `getMastery`, `saveMastery`, `updateMastery`
- Produces: `recordOutcome(db: Db, learnerId: string, nodeId: string, outcome: number, difficulty: number, now: number): Promise<MasteryRecord>`

- [ ] **Step 1: Write the failing test**

```ts
// tests/mastery/service.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { upsertNodes } from '@/skill-graph/repository'
import { recordOutcome } from '@/mastery/service'
import { getMastery } from '@/mastery/repository'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(
    db,
    [{ id: 'n1', type: 'grammar', level: 'A1', skill: 'general', title: 'n1', description: '', metadata: null }],
    NOW,
  )
})

describe('recordOutcome', () => {
  it('creates a record on first observation', async () => {
    const result = await recordOutcome(db, 'u1', 'n1', 1, 0.5, NOW)
    expect(result.exposures).toBe(1)
    expect(result.mastery).toBeGreaterThan(0)
    expect(await getMastery(db, 'u1', 'n1')).not.toBeNull()
  })

  it('accumulates across observations', async () => {
    await recordOutcome(db, 'u1', 'n1', 1, 0.5, NOW)
    const second = await recordOutcome(db, 'u1', 'n1', 1, 0.5, NOW + 1000)
    expect(second.exposures).toBe(2)
  })

  it('persists what it returns', async () => {
    const returned = await recordOutcome(db, 'u1', 'n1', 1, 0.5, NOW)
    const stored = await getMastery(db, 'u1', 'n1')
    expect(stored?.mastery).toBeCloseTo(returned.mastery)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/mastery/service.test.ts`
Expected: FAIL — cannot resolve `@/mastery/service`.

- [ ] **Step 3: Create `src/mastery/service.ts`**

```ts
import type { Db } from '@/db/client'
import { getMastery, saveMastery } from './repository'
import type { MasteryRecord } from './types'
import { updateMastery } from './update'

function blankRecord(learnerId: string, nodeId: string, now: number): MasteryRecord {
  return { learnerId, nodeId, mastery: 0, confidence: 0, exposures: 0, correctStreak: 0, lastSeenAt: now }
}

/** Fold one assessed outcome into a learner's mastery and persist it. */
export async function recordOutcome(
  db: Db,
  learnerId: string,
  nodeId: string,
  outcome: number,
  difficulty: number,
  now: number,
): Promise<MasteryRecord> {
  const existing = (await getMastery(db, learnerId, nodeId)) ?? blankRecord(learnerId, nodeId, now)
  const updated = updateMastery(existing, outcome, difficulty, now)
  await saveMastery(db, updated)
  return updated
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/mastery/service.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: persist assessed outcomes into learner mastery"
```

---

### Task 9: Prerequisite eligibility

**Files:**
- Create: `src/sequencer/eligibility.ts`
- Test: `tests/sequencer/eligibility.test.ts`

**Interfaces:**
- Consumes: `SkillNode`, `SkillEdge`, `MasteryRecord`, `retainedMastery`
- Produces:
  - `MASTERY_THRESHOLD = 0.6`
  - `eligibleNodes(nodes: SkillNode[], edges: SkillEdge[], mastery: MasteryRecord[], now: number): SkillNode[]`

**Design note:** a node is eligible when every prerequisite's *retained* mastery, weighted by edge strength, meets the threshold. Weak edges gate loosely; strength-1 edges gate fully.

- [ ] **Step 1: Write the failing test**

```ts
// tests/sequencer/eligibility.test.ts
import { describe, it, expect } from 'vitest'
import { eligibleNodes, MASTERY_THRESHOLD } from '@/sequencer/eligibility'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000

function node(id: string, level: SkillNode['level'] = 'A1'): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

function mastery(nodeId: string, value: number): MasteryRecord {
  return { learnerId: 'u1', nodeId, mastery: value, confidence: 0.8, exposures: 10, correctStreak: 3, lastSeenAt: NOW }
}

describe('eligibleNodes', () => {
  it('treats a node with no prerequisites as eligible', () => {
    const result = eligibleNodes([node('a')], [], [], NOW)
    expect(result.map((n) => n.id)).toEqual(['a'])
  })

  it('blocks a node whose prerequisite is unmet', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const result = eligibleNodes(nodes, edges, [], NOW)
    expect(result.map((n) => n.id)).toEqual(['a'])
  })

  it('unblocks a node once its prerequisite is mastered', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const result = eligibleNodes(nodes, edges, [mastery('a', 0.9)], NOW)
    expect(result.map((n) => n.id).sort()).toEqual(['a', 'b'])
  })

  it('requires every prerequisite, not just one', () => {
    const nodes = [node('a'), node('b'), node('c', 'A2')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'c', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'c', strength: 1 },
    ]
    const result = eligibleNodes(nodes, edges, [mastery('a', 0.9)], NOW)
    expect(result.map((n) => n.id)).not.toContain('c')
  })

  it('gates loosely on a weak edge', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 0.2 }]
    const result = eligibleNodes(nodes, edges, [mastery('a', 0.2)], NOW)
    expect(result.map((n) => n.id)).toContain('b')
  })

  it('uses decayed mastery, so stale prerequisites re-block', () => {
    const DAY = 86_400_000
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const stale: MasteryRecord = { ...mastery('a', 0.7), lastSeenAt: NOW - 500 * DAY }
    const result = eligibleNodes(nodes, edges, [stale], NOW)
    expect(result.map((n) => n.id)).not.toContain('b')
  })

  it('exposes the threshold it uses', () => {
    expect(MASTERY_THRESHOLD).toBeGreaterThan(0)
    expect(MASTERY_THRESHOLD).toBeLessThan(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/sequencer/eligibility.test.ts`
Expected: FAIL — cannot resolve `@/sequencer/eligibility`.

- [ ] **Step 3: Create `src/sequencer/eligibility.ts`**

```ts
import { retainedMastery } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'
import type { SkillEdge, SkillNode } from '@/skill-graph/types'

/** Retained mastery at or above this counts a node as "known". */
export const MASTERY_THRESHOLD = 0.6

/**
 * Nodes whose prerequisites are all satisfied at `now`.
 * A prerequisite is satisfied when its retained mastery meets the threshold
 * scaled by edge strength — a strength-1 edge gates fully, a weak edge barely.
 */
export function eligibleNodes(
  nodes: SkillNode[],
  edges: SkillEdge[],
  mastery: MasteryRecord[],
  now: number,
): SkillNode[] {
  const retainedById = new Map<string, number>()
  for (const record of mastery) {
    retainedById.set(record.nodeId, retainedMastery(record, now))
  }

  const prerequisitesByNode = new Map<string, SkillEdge[]>()
  for (const edge of edges) {
    const list = prerequisitesByNode.get(edge.toNodeId) ?? []
    list.push(edge)
    prerequisitesByNode.set(edge.toNodeId, list)
  }

  return nodes.filter((node) => {
    const prerequisites = prerequisitesByNode.get(node.id) ?? []
    return prerequisites.every((edge) => {
      const required = MASTERY_THRESHOLD * edge.strength
      const actual = retainedById.get(edge.fromNodeId) ?? 0
      return actual >= required
    })
  })
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/sequencer/eligibility.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: prerequisite eligibility using decayed mastery and edge strength"
```

---

### Task 10: Next-node selection

**Files:**
- Create: `src/sequencer/select.ts`
- Test: `tests/sequencer/select.test.ts`

**Interfaces:**
- Consumes: `eligibleNodes`, `MASTERY_THRESHOLD`, `retainedMastery`, `levelIndex`
- Produces:
  - `REVIEW_THRESHOLD = 0.75`
  - `Candidate = { node: SkillNode; reason: 'review' | 'new'; priority: number }`
  - `selectNext(input: SelectInput): Candidate[]` where `SelectInput = { nodes: SkillNode[]; edges: SkillEdge[]; mastery: MasteryRecord[]; now: number; limit: number }`

**Design note:** review always outranks new material — reviving decaying knowledge is cheaper than acquiring more. Within each group, weaker items come first. The result is interleaved so no more than two consecutive candidates share a node type, which produces better retention than blocking on one type.

- [ ] **Step 1: Write the failing test**

```ts
// tests/sequencer/select.test.ts
import { describe, it, expect } from 'vitest'
import { selectNext, REVIEW_THRESHOLD } from '@/sequencer/select'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000

function node(id: string, type: SkillNode['type'] = 'grammar', level: SkillNode['level'] = 'A1'): SkillNode {
  return { id, type, level, skill: 'general', title: id, description: '', metadata: null }
}

function mastery(nodeId: string, value: number): MasteryRecord {
  return { learnerId: 'u1', nodeId, mastery: value, confidence: 0.8, exposures: 10, correctStreak: 2, lastSeenAt: NOW }
}

const noEdges: SkillEdge[] = []

describe('selectNext', () => {
  it('returns nothing when there are no nodes', () => {
    expect(selectNext({ nodes: [], edges: noEdges, mastery: [], now: NOW, limit: 5 })).toEqual([])
  })

  it('labels unseen nodes as new', () => {
    const result = selectNext({ nodes: [node('a')], edges: noEdges, mastery: [], now: NOW, limit: 5 })
    expect(result[0]?.reason).toBe('new')
  })

  it('labels a partially-decayed known node as review', () => {
    const result = selectNext({
      nodes: [node('a')],
      edges: noEdges,
      mastery: [mastery('a', 0.65)],
      now: NOW,
      limit: 5,
    })
    expect(result[0]?.reason).toBe('review')
  })

  it('puts review ahead of new material', () => {
    const result = selectNext({
      nodes: [node('fresh'), node('rusty')],
      edges: noEdges,
      mastery: [mastery('rusty', 0.65)],
      now: NOW,
      limit: 5,
    })
    expect(result[0]?.node.id).toBe('rusty')
  })

  it('excludes nodes already above the review threshold', () => {
    const result = selectNext({
      nodes: [node('solid')],
      edges: noEdges,
      mastery: [mastery('solid', 0.95)],
      now: NOW,
      limit: 5,
    })
    expect(result).toEqual([])
  })

  it('excludes nodes blocked by prerequisites', () => {
    const nodes = [node('a'), node('b', 'grammar', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const result = selectNext({ nodes, edges, mastery: [], now: NOW, limit: 5 })
    expect(result.map((c) => c.node.id)).toEqual(['a'])
  })

  it('respects the limit', () => {
    const nodes = [node('a'), node('b'), node('c'), node('d')]
    const result = selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 2 })
    expect(result).toHaveLength(2)
  })

  it('prefers lower levels among new material', () => {
    const nodes = [node('hard', 'grammar', 'B2'), node('easy', 'grammar', 'A1')]
    const result = selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 5 })
    expect(result[0]?.node.id).toBe('easy')
  })

  it('never returns three consecutive nodes of the same type', () => {
    const nodes = [
      node('g1', 'grammar'), node('g2', 'grammar'), node('g3', 'grammar'),
      node('l1', 'lexical'), node('l2', 'lexical'),
    ]
    const result = selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 5 })
    for (let i = 2; i < result.length; i++) {
      const run = result[i]!.node.type === result[i - 1]!.node.type && result[i - 1]!.node.type === result[i - 2]!.node.type
      expect(run).toBe(false)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/sequencer/select.test.ts`
Expected: FAIL — cannot resolve `@/sequencer/select`.

- [ ] **Step 3: Create `src/sequencer/select.ts`**

```ts
import { retainedMastery } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'
import { levelIndex, type SkillEdge, type SkillNode } from '@/skill-graph/types'
import { eligibleNodes } from './eligibility'

/** Retained mastery below this makes a known node due for review. */
export const REVIEW_THRESHOLD = 0.75

export interface Candidate {
  node: SkillNode
  reason: 'review' | 'new'
  /** Higher is more urgent. */
  priority: number
}

export interface SelectInput {
  nodes: SkillNode[]
  edges: SkillEdge[]
  mastery: MasteryRecord[]
  now: number
  limit: number
}

/**
 * Choose what a learner should practise next.
 * Review outranks new material; within a group, weaker or easier comes first.
 * The result is interleaved so no three consecutive candidates share a type.
 */
export function selectNext(input: SelectInput): Candidate[] {
  const { nodes, edges, mastery, now, limit } = input

  const retainedById = new Map<string, number>()
  for (const record of mastery) retainedById.set(record.nodeId, retainedMastery(record, now))

  const eligible = eligibleNodes(nodes, edges, mastery, now)

  const candidates: Candidate[] = []
  for (const node of eligible) {
    const retained = retainedById.get(node.id)

    if (retained === undefined) {
      // Never seen. Lower levels first, so priority falls as level rises.
      candidates.push({ node, reason: 'new', priority: 100 - levelIndex(node.level) })
      continue
    }

    if (retained >= REVIEW_THRESHOLD) continue // Solid enough — skip.

    // Seen but faded. The weaker it is, the more urgent.
    candidates.push({ node, reason: 'review', priority: 1000 + (REVIEW_THRESHOLD - retained) * 100 })
  }

  candidates.sort((a, b) => b.priority - a.priority)
  return interleaveByType(candidates).slice(0, limit)
}

/**
 * Reorder so no three consecutive candidates share a node type, preserving
 * priority order as far as that constraint allows.
 */
function interleaveByType(candidates: Candidate[]): Candidate[] {
  const remaining = [...candidates]
  const result: Candidate[] = []

  while (remaining.length > 0) {
    const lastType = result[result.length - 1]?.node.type
    const secondLastType = result[result.length - 2]?.node.type
    const wouldRunOn = lastType !== undefined && lastType === secondLastType

    const index = wouldRunOn ? remaining.findIndex((c) => c.node.type !== lastType) : 0
    const pick = index === -1 ? 0 : index
    result.push(remaining[pick]!)
    remaining.splice(pick, 1)
  }

  return result
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/sequencer/select.test.ts`
Expected: PASS, 9 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: next-node sequencer with review priority and type interleaving"
```

---

### Task 11: Per-skill level estimation

**Files:**
- Create: `src/sequencer/level.ts`
- Test: `tests/sequencer/level.test.ts`

**Interfaces:**
- Consumes: `SkillNode`, `MasteryRecord`, `retainedMastery`, `CEFR_LEVELS`, `levelIndex`, `MASTERY_THRESHOLD`
- Produces:
  - `LevelEstimate = { skill: SkillArea; level: CefrLevel; coverage: number; confidence: number }`
  - `estimateLevels(nodes: SkillNode[], mastery: MasteryRecord[], now: number): LevelEstimate[]`

**Design note:** a learner is *at* the highest level where they have mastered at least 80% of that level's nodes for that skill. Reported per skill, never blended — the dashboard requires this (spec §4a).

- [ ] **Step 1: Write the failing test**

```ts
// tests/sequencer/level.test.ts
import { describe, it, expect } from 'vitest'
import { estimateLevels } from '@/sequencer/level'
import type { SkillNode, CefrLevel, SkillArea } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000

function node(id: string, level: CefrLevel, skill: SkillArea): SkillNode {
  return { id, type: 'cando', level, skill, title: id, description: '', metadata: null }
}

function known(nodeId: string): MasteryRecord {
  return { learnerId: 'u1', nodeId, mastery: 0.9, confidence: 0.9, exposures: 10, correctStreak: 5, lastSeenAt: NOW }
}

describe('estimateLevels', () => {
  it('returns preA1 for a learner with no mastery', () => {
    const nodes = [node('r1', 'A1', 'reading')]
    const result = estimateLevels(nodes, [], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('preA1')
  })

  it('promotes a learner who has mastered a level', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A1', 'reading')]
    const result = estimateLevels(nodes, [known('r1'), known('r2')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('A1')
  })

  it('does not promote on partial coverage', () => {
    const nodes = [
      node('r1', 'A1', 'reading'), node('r2', 'A1', 'reading'),
      node('r3', 'A1', 'reading'), node('r4', 'A1', 'reading'),
    ]
    const result = estimateLevels(nodes, [known('r1')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('preA1')
  })

  it('reports skills independently', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('s1', 'A1', 'speaking')]
    const result = estimateLevels(nodes, [known('r1')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('A1')
    expect(result.find((e) => e.skill === 'speaking')?.level).toBe('preA1')
  })

  it('reports coverage of the level above the estimate', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A2', 'reading')]
    const result = estimateLevels(nodes, [known('r1')], NOW)
    const reading = result.find((e) => e.skill === 'reading')
    expect(reading?.level).toBe('A1')
    expect(reading?.coverage).toBeCloseTo(0)
  })

  it('omits skills with no nodes at all', () => {
    const result = estimateLevels([node('r1', 'A1', 'reading')], [], NOW)
    expect(result.map((e) => e.skill)).toEqual(['reading'])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/sequencer/level.test.ts`
Expected: FAIL — cannot resolve `@/sequencer/level`.

- [ ] **Step 3: Create `src/sequencer/level.ts`**

```ts
import { retainedMastery } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'
import { CEFR_LEVELS, levelIndex, type CefrLevel, type SkillArea, type SkillNode } from '@/skill-graph/types'
import { MASTERY_THRESHOLD } from './eligibility'

/** Share of a level's nodes that must be mastered to count as being at it. */
const COVERAGE_TO_PROMOTE = 0.8

export interface LevelEstimate {
  skill: SkillArea
  level: CefrLevel
  /** Progress through the level immediately above `level`, 0..1. */
  coverage: number
  /** Mean confidence across mastered nodes for this skill, 0..1. */
  confidence: number
}

export function estimateLevels(
  nodes: SkillNode[],
  mastery: MasteryRecord[],
  now: number,
): LevelEstimate[] {
  const retainedById = new Map<string, number>()
  const confidenceById = new Map<string, number>()
  for (const record of mastery) {
    retainedById.set(record.nodeId, retainedMastery(record, now))
    confidenceById.set(record.nodeId, record.confidence)
  }

  const bySkill = new Map<SkillArea, SkillNode[]>()
  for (const node of nodes) {
    const list = bySkill.get(node.skill) ?? []
    list.push(node)
    bySkill.set(node.skill, list)
  }

  const estimates: LevelEstimate[] = []

  for (const [skill, skillNodes] of bySkill) {
    const coverageByLevel = new Map<CefrLevel, number>()

    for (const level of CEFR_LEVELS) {
      const atLevel = skillNodes.filter((n) => n.level === level)
      if (atLevel.length === 0) {
        coverageByLevel.set(level, 1) // No content at this level cannot block progress.
        continue
      }
      const mastered = atLevel.filter((n) => (retainedById.get(n.id) ?? 0) >= MASTERY_THRESHOLD)
      coverageByLevel.set(level, mastered.length / atLevel.length)
    }

    // Highest level where this and every level below it are covered.
    let attained: CefrLevel = 'preA1'
    for (const level of CEFR_LEVELS) {
      if (level === 'preA1') continue
      if ((coverageByLevel.get(level) ?? 0) >= COVERAGE_TO_PROMOTE) {
        attained = level
      } else {
        break
      }
    }

    const nextIndex = levelIndex(attained) + 1
    const nextLevel = CEFR_LEVELS[nextIndex]
    const coverage = nextLevel ? (coverageByLevel.get(nextLevel) ?? 0) : 1

    const confidences = skillNodes
      .map((n) => confidenceById.get(n.id))
      .filter((c): c is number => c !== undefined)
    const confidence =
      confidences.length === 0 ? 0 : confidences.reduce((a, b) => a + b, 0) / confidences.length

    estimates.push({ skill, level: attained, coverage, confidence })
  }

  return estimates
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/sequencer/level.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: per-skill CEFR level estimation from mastery coverage"
```

---

### Task 12: Seed script and graph integrity check

**Files:**
- Create: `src/seed/seed-data.ts`
- Create: `src/seed/run-seed.ts`
- Test: `tests/seed/seed.test.ts`

**Interfaces:**
- Consumes: `upsertNodes`, `upsertEdges`, `listNodes`, `listEdges`, `validateGraph`
- Produces:
  - `SEED_NODES: SkillNode[]`
  - `SEED_EDGES: SkillEdge[]`
  - `seedGraph(db: Db, now: number): Promise<void>`

**Note:** this seed is a small, correct starter slice — enough to exercise every code path end to end. The full CEFR inventory is generated by the content pipeline in a later plan, not hand-written here.

- [ ] **Step 1: Create `src/seed/seed-data.ts`**

```ts
import type { SkillEdge, SkillNode } from '@/skill-graph/types'

function n(
  id: string,
  type: SkillNode['type'],
  level: SkillNode['level'],
  skill: SkillNode['skill'],
  title: string,
): SkillNode {
  return { id, type, level, skill, title, description: '', metadata: null }
}

export const SEED_NODES: SkillNode[] = [
  n('gram.a1.be_present', 'grammar', 'A1', 'general', 'Present simple: be'),
  n('gram.a1.present_simple', 'grammar', 'A1', 'general', 'Present simple: other verbs'),
  n('gram.a2.past_simple', 'grammar', 'A2', 'general', 'Past simple'),
  n('gram.b1.present_perfect', 'grammar', 'B1', 'general', 'Present perfect'),
  n('gram.b1.pp_vs_past_simple', 'grammar', 'B1', 'general', 'Present perfect vs past simple'),
  n('lex.a1.everyday_objects', 'lexical', 'A1', 'general', 'Everyday objects'),
  n('lex.a2.travel', 'lexical', 'A2', 'general', 'Travel and transport'),
  n('cando.a1.read_signs', 'cando', 'A1', 'reading', 'Can understand short simple signs and notices'),
  n('cando.a2.read_personal_letter', 'cando', 'A2', 'reading', 'Can understand short personal letters'),
  n('cando.a1.introduce_self', 'cando', 'A1', 'speaking', 'Can introduce themselves and others'),
  n('cando.a2.describe_routine', 'cando', 'A2', 'speaking', 'Can describe daily routine in simple terms'),
  n('phono.a1.word_stress', 'phono', 'A1', 'speaking', 'Word stress in common two-syllable words'),
  n('strat.ielts.task2_structure', 'strategy', 'B1', 'writing', 'IELTS Writing Task 2: essay structure'),
]

export const SEED_EDGES: SkillEdge[] = [
  { fromNodeId: 'gram.a1.be_present', toNodeId: 'gram.a1.present_simple', strength: 1 },
  { fromNodeId: 'gram.a1.present_simple', toNodeId: 'gram.a2.past_simple', strength: 1 },
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b1.present_perfect', strength: 1 },
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'gram.b1.pp_vs_past_simple', strength: 1 },
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b1.pp_vs_past_simple', strength: 1 },
  { fromNodeId: 'lex.a1.everyday_objects', toNodeId: 'lex.a2.travel', strength: 0.5 },
  { fromNodeId: 'cando.a1.read_signs', toNodeId: 'cando.a2.read_personal_letter', strength: 1 },
  { fromNodeId: 'cando.a1.introduce_self', toNodeId: 'cando.a2.describe_routine', strength: 1 },
  { fromNodeId: 'gram.a1.present_simple', toNodeId: 'cando.a2.describe_routine', strength: 0.7 },
  { fromNodeId: 'phono.a1.word_stress', toNodeId: 'cando.a2.describe_routine', strength: 0.3 },
]
```

- [ ] **Step 2: Write the failing test**

```ts
// tests/seed/seed.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { seedGraph } from '@/seed/run-seed'
import { SEED_EDGES, SEED_NODES } from '@/seed/seed-data'
import { listEdges, listNodes } from '@/skill-graph/repository'
import { validateGraph } from '@/skill-graph/validation'
import { selectNext } from '@/sequencer/select'
import { estimateLevels } from '@/sequencer/level'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

beforeEach(async () => {
  db = await makeTestDb()
})

describe('seed data', () => {
  it('is a valid graph', () => {
    expect(validateGraph(SEED_NODES, SEED_EDGES)).toEqual({ valid: true, errors: [] })
  })

  it('loads into the database', async () => {
    await seedGraph(db, NOW)
    expect(await listNodes(db)).toHaveLength(SEED_NODES.length)
    expect(await listEdges(db)).toHaveLength(SEED_EDGES.length)
  })

  it('is idempotent', async () => {
    await seedGraph(db, NOW)
    await seedGraph(db, NOW + 1000)
    expect(await listNodes(db)).toHaveLength(SEED_NODES.length)
  })

  it('gives a brand-new learner something to do', async () => {
    await seedGraph(db, NOW)
    const nodes = await listNodes(db)
    const edges = await listEdges(db)
    const next = selectNext({ nodes, edges, mastery: [], now: NOW, limit: 5 })
    expect(next.length).toBeGreaterThan(0)
    expect(next.every((c) => c.reason === 'new')).toBe(true)
  })

  it('places a brand-new learner at preA1 in every skill', async () => {
    await seedGraph(db, NOW)
    const nodes = await listNodes(db)
    const levels = estimateLevels(nodes, [], NOW)
    expect(levels.every((l) => l.level === 'preA1')).toBe(true)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- tests/seed/seed.test.ts`
Expected: FAIL — cannot resolve `@/seed/run-seed`.

- [ ] **Step 4: Create `src/seed/run-seed.ts`**

```ts
import type { Db } from '@/db/client'
import { upsertEdges, upsertNodes } from '@/skill-graph/repository'
import { validateGraph } from '@/skill-graph/validation'
import { SEED_EDGES, SEED_NODES } from './seed-data'

/** Load the starter graph. Refuses to write an invalid graph. */
export async function seedGraph(db: Db, now: number): Promise<void> {
  const validation = validateGraph(SEED_NODES, SEED_EDGES)
  if (!validation.valid) {
    const detail = validation.errors.map((e) => `${e.code}: ${e.message}`).join('\n')
    throw new Error(`Refusing to seed an invalid graph:\n${detail}`)
  }
  await upsertNodes(db, SEED_NODES, now)
  await upsertEdges(db, SEED_EDGES)
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- tests/seed/seed.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 6: Run the whole suite**

Run: `npm test`
Expected: PASS, all tests across every file.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: starter skill graph seed with integrity check"
```

---

## Done when

- `npm test` passes with every task's tests green.
- A learner with no history receives sensible next-node suggestions from the seeded graph.
- Recording outcomes moves mastery, and mastery decays over simulated time.
- Prerequisites gate correctly, and stale prerequisites re-block their dependents.
- Per-skill level estimation reports each skill independently.

## What this plan deliberately excludes

Handled by later R1 plans, each building on this foundation:

- **R1b — Content pipeline:** item and lesson schema, constrained generation, correctness and teaching-quality gates, golden set, review queue.
- **R1c — Writing assessment:** rubric scoring, evidence-linked feedback, issue grouping and ranking.
- **R1d — Speaking assessment:** capture, transcription, objective feature extraction, rubric scoring.
- **R1e — Placement test and IELTS Academic mock engine:** timed sectioned delivery, performance record.
- **R1f — Diagnosis, action plan and dashboard:** root-cause classification, band impact projection, learner UI.

Authentication, billing and the Next.js application shell are introduced in R1e, when there is first a user-facing surface that needs them.
