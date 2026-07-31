# R1b-e Practice API Routes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the practice-loop engine to Next.js App Router API routes so the frontend can assemble sessions, persist progress, and record outcomes over HTTP.

**Architecture:** Thin route handlers that parse → validate → call engine → return JSON. A shared `_lib/` folder provides an HMR-safe DB singleton, response helpers, and manual validation. Tests call route handler functions directly with constructed `NextRequest` objects — no HTTP server needed.

**Tech Stack:** Next.js 16 App Router, Drizzle/Turso, Vitest

## Global Constraints

- No auth — `learnerId` is an explicit parameter on every route. Auth middleware replaces it later.
- No Zod — manual validation helpers.
- Next.js 16 route params are `Promise` — must be `await`ed.
- All route handler files are named `route.ts` inside the App Router directory tree under `src/app/api/`.
- Use `//` comments throughout for learning (project convention).

---

### Task 1: Shared Infrastructure

**Files:**
- Create: `src/app/api/_lib/db.ts`
- Create: `src/app/api/_lib/response.ts`
- Create: `src/app/api/_lib/validate.ts`
- Create: `tests/api/_lib/validate.test.ts`

**Interfaces:**
- Consumes: `Db` type and DB setup from `@/db/client`
- Produces:
  - `getDb(): Db` — HMR-safe singleton used by all route handlers
  - `_setTestDb(db: Db | null): void` — test-only override
  - `jsonOk(data, status?): NextResponse` — success response
  - `jsonError(status, message): NextResponse` — error response
  - `ValidationError` class — caught by route handlers to return 400
  - `requireString(body, field): string`
  - `requireNumber(body, field): number`
  - `optionalNumber(body, field): number | undefined`
  - `optionalArray(body, field): unknown[] | undefined`
  - `optionalObject(body, field): Record<string, unknown> | undefined`

- [ ] **Step 1: Create the DB singleton**

Create `src/app/api/_lib/db.ts`:

```typescript
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '@/db/schema'
import type { Db } from '@/db/client'

// Test-only override. When set, getDb() returns this instead of the
// production connection. Reset to null in afterEach.
let _testDb: Db | null = null

// Inject a test database. Only use in test files.
export function _setTestDb(db: Db | null): void {
  _testDb = db
}

// HMR-safe database singleton. In development, Next.js re-evaluates
// modules on hot reload — storing the client on globalThis prevents
// creating multiple connections. In production, module caching handles it.
function createProductionDb(): Db {
  const g = globalThis as Record<string, unknown>
  if (g.__fluentpath_db) return g.__fluentpath_db as Db

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? 'file:./local.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const db = drizzle(client, { schema })

  g.__fluentpath_db = db
  return db
}

// Get the database instance. Route handlers call this instead of
// importing db directly.
export function getDb(): Db {
  if (_testDb) return _testDb
  return createProductionDb()
}
```

- [ ] **Step 2: Create the response helpers**

Create `src/app/api/_lib/response.ts`:

```typescript
import { NextResponse } from 'next/server'

// Return a JSON success response. Defaults to 200.
export function jsonOk(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

// Return a JSON error response with { error: message }.
export function jsonError(status: number, message: string): NextResponse {
  return NextResponse.json({ error: message }, { status })
}
```

- [ ] **Step 3: Create the validation helpers**

Create `src/app/api/_lib/validate.ts`:

```typescript
// Thrown when a required field is missing or has the wrong type.
// Route handlers catch this and return 400.
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Require a string field. Throws ValidationError if missing or not a string.
export function requireString(body: Record<string, unknown>, field: string): string {
  const value = body[field]
  if (typeof value !== 'string' || value.length === 0) {
    throw new ValidationError(`"${field}" is required and must be a non-empty string.`)
  }
  return value
}

// Require a number field. Throws ValidationError if missing or not a number.
export function requireNumber(body: Record<string, unknown>, field: string): number {
  const value = body[field]
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new ValidationError(`"${field}" is required and must be a number.`)
  }
  return value
}

// Optional number — returns undefined if the field is absent.
export function optionalNumber(body: Record<string, unknown>, field: string): number | undefined {
  if (!(field in body) || body[field] === undefined || body[field] === null) return undefined
  const value = body[field]
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new ValidationError(`"${field}" must be a number when provided.`)
  }
  return value
}

// Optional array — returns undefined if the field is absent.
export function optionalArray(body: Record<string, unknown>, field: string): unknown[] | undefined {
  if (!(field in body) || body[field] === undefined || body[field] === null) return undefined
  const value = body[field]
  if (!Array.isArray(value)) {
    throw new ValidationError(`"${field}" must be an array when provided.`)
  }
  return value
}

// Optional object — returns undefined if the field is absent.
export function optionalObject(body: Record<string, unknown>, field: string): Record<string, unknown> | undefined {
  if (!(field in body) || body[field] === undefined || body[field] === null) return undefined
  const value = body[field]
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new ValidationError(`"${field}" must be an object when provided.`)
  }
  return value as Record<string, unknown>
}

// Require an array field. Throws ValidationError if missing or not an array.
export function requireArray(body: Record<string, unknown>, field: string): unknown[] {
  const value = body[field]
  if (!Array.isArray(value)) {
    throw new ValidationError(`"${field}" is required and must be an array.`)
  }
  return value
}
```

- [ ] **Step 4: Write validation tests**

Create `tests/api/_lib/validate.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import {
  ValidationError,
  requireString,
  requireNumber,
  optionalNumber,
  optionalArray,
  optionalObject,
  requireArray,
} from '@/app/api/_lib/validate'

describe('requireString', () => {
  it('returns the value when present', () => {
    expect(requireString({ name: 'alice' }, 'name')).toBe('alice')
  })

  it('throws on missing field', () => {
    expect(() => requireString({}, 'name')).toThrow(ValidationError)
  })

  it('throws on empty string', () => {
    expect(() => requireString({ name: '' }, 'name')).toThrow(ValidationError)
  })

  it('throws on non-string', () => {
    expect(() => requireString({ name: 42 }, 'name')).toThrow(ValidationError)
  })
})

describe('requireNumber', () => {
  it('returns the value when present', () => {
    expect(requireNumber({ count: 5 }, 'count')).toBe(5)
  })

  it('throws on missing field', () => {
    expect(() => requireNumber({}, 'count')).toThrow(ValidationError)
  })

  it('throws on NaN', () => {
    expect(() => requireNumber({ count: NaN }, 'count')).toThrow(ValidationError)
  })
})

describe('optionalNumber', () => {
  it('returns the value when present', () => {
    expect(optionalNumber({ n: 3 }, 'n')).toBe(3)
  })

  it('returns undefined when absent', () => {
    expect(optionalNumber({}, 'n')).toBeUndefined()
  })

  it('throws on wrong type', () => {
    expect(() => optionalNumber({ n: 'three' }, 'n')).toThrow(ValidationError)
  })
})

describe('optionalArray', () => {
  it('returns the array when present', () => {
    expect(optionalArray({ ids: [1, 2] }, 'ids')).toEqual([1, 2])
  })

  it('returns undefined when absent', () => {
    expect(optionalArray({}, 'ids')).toBeUndefined()
  })

  it('throws on non-array', () => {
    expect(() => optionalArray({ ids: 'nope' }, 'ids')).toThrow(ValidationError)
  })
})

describe('optionalObject', () => {
  it('returns the object when present', () => {
    expect(optionalObject({ plan: { a: 1 } }, 'plan')).toEqual({ a: 1 })
  })

  it('returns undefined when absent', () => {
    expect(optionalObject({}, 'plan')).toBeUndefined()
  })

  it('throws on array (not an object)', () => {
    expect(() => optionalObject({ plan: [1] }, 'plan')).toThrow(ValidationError)
  })
})

describe('requireArray', () => {
  it('returns the array when present', () => {
    expect(requireArray({ items: [1] }, 'items')).toEqual([1])
  })

  it('throws on missing field', () => {
    expect(() => requireArray({}, 'items')).toThrow(ValidationError)
  })

  it('throws on non-array', () => {
    expect(() => requireArray({ items: 'nope' }, 'items')).toThrow(ValidationError)
  })
})
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run tests/api/_lib/validate.test.ts --reporter verbose`
Expected: All 16 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/_lib/db.ts src/app/api/_lib/response.ts src/app/api/_lib/validate.ts tests/api/_lib/validate.test.ts
git commit -m "feat(api): add shared infrastructure — db singleton, response helpers, validation

HMR-safe getDb() with _setTestDb() for testing, jsonOk/jsonError response
helpers, and manual field validators (requireString, requireNumber, etc).

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Assemble + Session CRUD Routes

**Files:**
- Create: `src/app/api/practice/assemble/route.ts`
- Create: `src/app/api/practice/sessions/route.ts`
- Create: `src/app/api/practice/sessions/[id]/route.ts`
- Create: `tests/api/practice/assemble.test.ts`
- Create: `tests/api/practice/sessions.test.ts`
- Create: `tests/api/practice/sessions-id.test.ts`

**Interfaces:**
- Consumes:
  - `getDb()`, `_setTestDb()` from `@/app/api/_lib/db`
  - `jsonOk()`, `jsonError()` from `@/app/api/_lib/response`
  - `ValidationError`, `requireString`, `optionalNumber`, `optionalArray`, `optionalObject` from `@/app/api/_lib/validate`
  - `assembleSession(db, learnerId, options)` from `@/sequencer/assemble`
  - `createPracticeSession(db, learnerId, plan, now)` from `@/sequencer/session-store`
  - `findActivePracticeSession(db, learnerId)` from `@/sequencer/session-store`
  - `getPracticeSession(db, sessionId)` from `@/sequencer/session-store`
  - `updateProgress(db, sessionId, progress, now)` from `@/sequencer/session-store`
- Produces: Three working API routes (POST assemble, POST+GET sessions, GET+PATCH sessions/[id])

- [ ] **Step 1: Create the assemble route**

Create `src/app/api/practice/assemble/route.ts`:

```typescript
import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, requireString, optionalNumber, optionalArray, optionalObject } from '@/app/api/_lib/validate'
import { assembleSession } from '@/sequencer/assemble'
import type { ActionPlan } from '@/diagnosis/types'

// POST /api/practice/assemble
// Assemble a practice session plan (node selection + item fetching).
// Does NOT persist — the client reviews the plan and then calls
// POST /api/practice/sessions to create the session.
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    const learnerId = requireString(body, 'learnerId')
    const maxItems = optionalNumber(body, 'maxItems')
    const maxNodes = optionalNumber(body, 'maxNodes')
    const excludeItemIds = optionalArray(body, 'excludeItemIds') as string[] | undefined
    const actionPlan = optionalObject(body, 'actionPlan') as ActionPlan | undefined

    const plan = await assembleSession(db, learnerId, {
      now: Date.now(),
      maxItems,
      maxNodes,
      excludeItemIds,
      actionPlan,
    })

    return jsonOk(plan)
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/assemble]', err)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 2: Create the sessions route (POST create + GET active)**

Create `src/app/api/practice/sessions/route.ts`:

```typescript
import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, requireString, optionalObject } from '@/app/api/_lib/validate'
import { createPracticeSession, findActivePracticeSession } from '@/sequencer/session-store'

// POST /api/practice/sessions
// Create a practice session from an assembled plan.
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    const learnerId = requireString(body, 'learnerId')
    // The plan is required — it comes from the /assemble response.
    const plan = optionalObject(body, 'plan')
    if (!plan) {
      return jsonError(400, '"plan" is required and must be an object.')
    }

    const sessionId = await createPracticeSession(db, learnerId, plan, Date.now())

    return jsonOk({ sessionId }, 201)
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/sessions]', err)
    return jsonError(500, 'Internal server error')
  }
}

// GET /api/practice/sessions/active?learnerId=xxx
// Find the learner's active (in_progress) practice session.
export async function GET(request: NextRequest) {
  try {
    const db = getDb()
    const learnerId = request.nextUrl.searchParams.get('learnerId')
    if (!learnerId) {
      return jsonError(400, '"learnerId" query parameter is required.')
    }

    const session = await findActivePracticeSession(db, learnerId)
    return jsonOk({ session })
  } catch (err) {
    console.error('[GET /api/practice/sessions]', err)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 3: Create the sessions/[id] route (GET by ID + PATCH progress)**

Create `src/app/api/practice/sessions/[id]/route.ts`:

```typescript
import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, requireNumber } from '@/app/api/_lib/validate'
import { getPracticeSession, updateProgress } from '@/sequencer/session-store'

// GET /api/practice/sessions/[id]
// Fetch a specific practice session by ID.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const db = getDb()

    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    return jsonOk({ session })
  } catch (err) {
    console.error('[GET /api/practice/sessions/[id]]', err)
    return jsonError(500, 'Internal server error')
  }
}

// PATCH /api/practice/sessions/[id]
// Update the progress counter.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    // Verify the session exists before updating.
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    const progress = requireNumber(body, 'progress')
    await updateProgress(db, id, progress, Date.now())

    return jsonOk({ ok: true })
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[PATCH /api/practice/sessions/[id]]', err)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 4: Write the assemble route tests**

Create `tests/api/practice/assemble.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST } from '@/app/api/practice/assemble/route'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

// Minimal A1 grammar node.
const NODES = [
  { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
]

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

// Helper to build a POST request with JSON body.
function postRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost/api/practice/assemble', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  // Insert a learner for FK constraints.
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
  await upsertNodes(db, NODES, NOW)
  await recordProvenance(db, { id: 'prov.1', sourceName: 'original', licence: 'original' }, NOW)
})

afterEach(() => {
  _setTestDb(null)
})

describe('POST /api/practice/assemble', () => {
  it('returns a session plan with items', async () => {
    // Publish one item so the bank is not empty.
    const versionId = await createItem(db, {
      id: 'item.be.1', type: 'mcq', level: 'A1', skill: 'general',
      nodeIds: ['gram.a1.be'], payload: BE_PAYLOAD, provenanceId: 'prov.1',
    }, NOW)
    await publishItemVersion(db, versionId, inventory, NOW)

    const res = await POST(postRequest({ learnerId: 'learner.1' }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.items.length).toBeGreaterThan(0)
    expect(data.nodeIds).toContain('gram.a1.be')
    expect(data.estimatedMinutes).toBeGreaterThan(0)
  })

  it('returns empty plan when no items are published', async () => {
    const res = await POST(postRequest({ learnerId: 'learner.1' }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.items).toHaveLength(0)
  })

  it('returns 400 when learnerId is missing', async () => {
    const res = await POST(postRequest({}))
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toContain('learnerId')
  })
})
```

- [ ] **Step 5: Write the sessions route tests**

Create `tests/api/practice/sessions.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST, GET } from '@/app/api/practice/sessions/route'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

function postRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost/api/practice/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function getRequest(learnerId?: string): NextRequest {
  const url = learnerId
    ? `http://localhost/api/practice/sessions?learnerId=${learnerId}`
    : 'http://localhost/api/practice/sessions'
  return new NextRequest(url, { method: 'GET' })
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
})

afterEach(() => {
  _setTestDb(null)
})

describe('POST /api/practice/sessions', () => {
  it('creates a session and returns 201 with sessionId', async () => {
    const res = await POST(postRequest({ learnerId: 'learner.1', plan: PLAN }))
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(typeof data.sessionId).toBe('string')
  })

  it('returns 400 when learnerId is missing', async () => {
    const res = await POST(postRequest({ plan: PLAN }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when plan is missing', async () => {
    const res = await POST(postRequest({ learnerId: 'learner.1' }))
    expect(res.status).toBe(400)
  })
})

describe('GET /api/practice/sessions (active)', () => {
  it('returns null when no active session', async () => {
    const res = await GET(getRequest('learner.1'))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session).toBeNull()
  })

  it('returns the active session after creating one', async () => {
    // Create a session first.
    await POST(postRequest({ learnerId: 'learner.1', plan: PLAN }))

    const res = await GET(getRequest('learner.1'))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session).not.toBeNull()
    expect(data.session.status).toBe('in_progress')
  })

  it('returns 400 when learnerId is missing', async () => {
    const res = await GET(getRequest())
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 6: Write the sessions/[id] route tests**

Create `tests/api/practice/sessions-id.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { GET, PATCH } from '@/app/api/practice/sessions/[id]/route'
import { createPracticeSession } from '@/sequencer/session-store'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

// Build a GET request for /api/practice/sessions/[id].
function getRequest(id: string): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}`, { method: 'GET' })
}

// Build a PATCH request for /api/practice/sessions/[id].
function patchRequest(id: string, body: Record<string, unknown>): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

// Next.js 16 passes params as a Promise.
function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
})

afterEach(() => {
  _setTestDb(null)
})

describe('GET /api/practice/sessions/[id]', () => {
  it('returns the session by ID', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await GET(getRequest(sessionId), makeParams(sessionId))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session.id).toBe(sessionId)
    expect(data.session.status).toBe('in_progress')
  })

  it('returns 404 for unknown session', async () => {
    const res = await GET(getRequest('nonexistent'), makeParams('nonexistent'))
    expect(res.status).toBe(404)
  })
})

describe('PATCH /api/practice/sessions/[id]', () => {
  it('updates progress', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await PATCH(patchRequest(sessionId, { progress: 5 }), makeParams(sessionId))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.ok).toBe(true)
  })

  it('returns 404 for unknown session', async () => {
    const res = await PATCH(patchRequest('ghost', { progress: 1 }), makeParams('ghost'))
    expect(res.status).toBe(404)
  })

  it('returns 400 when progress is missing', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const res = await PATCH(patchRequest(sessionId, {}), makeParams(sessionId))
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 7: Run all tests to verify**

Run: `npx vitest run tests/api/ --reporter verbose`
Expected: All tests pass (3 assemble + 6 sessions + 5 sessions-id = 14 tests).

- [ ] **Step 8: Run full suite to check for regressions**

Run: `npx vitest run`
Expected: 954+ tests pass, no regressions.

- [ ] **Step 9: Commit**

```bash
git add src/app/api/practice/assemble/route.ts src/app/api/practice/sessions/route.ts src/app/api/practice/sessions/\[id\]/route.ts tests/api/practice/assemble.test.ts tests/api/practice/sessions.test.ts tests/api/practice/sessions-id.test.ts
git commit -m "feat(api): add assemble and session CRUD routes

POST /api/practice/assemble — assembles a SessionPlan.
POST /api/practice/sessions — creates a practice session.
GET /api/practice/sessions?learnerId= — finds active session.
GET /api/practice/sessions/[id] — fetches session by ID.
PATCH /api/practice/sessions/[id] — updates progress counter.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Complete + Abandon Routes

**Files:**
- Create: `src/app/api/practice/sessions/[id]/complete/route.ts`
- Create: `src/app/api/practice/sessions/[id]/abandon/route.ts`
- Create: `tests/api/practice/sessions-complete.test.ts`
- Create: `tests/api/practice/sessions-abandon.test.ts`

**Interfaces:**
- Consumes:
  - `getDb()`, `_setTestDb()` from `@/app/api/_lib/db`
  - `jsonOk()`, `jsonError()` from `@/app/api/_lib/response`
  - `ValidationError`, `requireString`, `requireArray` from `@/app/api/_lib/validate`
  - `getPracticeSession(db, sessionId)` from `@/sequencer/session-store`
  - `completePracticeSession(db, sessionId, now)` from `@/sequencer/session-store`
  - `abandonPracticeSession(db, sessionId, now)` from `@/sequencer/session-store`
  - `recordOutcomes(db, learnerId, outcomes, now)` from `@/mastery/service`
- Produces: Two working API routes (POST complete, POST abandon)

- [ ] **Step 1: Create the complete route**

Create `src/app/api/practice/sessions/[id]/complete/route.ts`:

```typescript
import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, requireString, requireArray } from '@/app/api/_lib/validate'
import { getPracticeSession, completePracticeSession } from '@/sequencer/session-store'
import { recordOutcomes, type AssessedOutcome } from '@/mastery/service'

// POST /api/practice/sessions/[id]/complete
// Complete a session and record mastery outcomes. This is the "session end
// write" — outcomes are batched here, not written per item.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    // Verify the session exists and is still in progress.
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')
    if (session.status !== 'in_progress') {
      return jsonError(400, `Session is already "${session.status}".`)
    }

    const learnerId = requireString(body, 'learnerId')
    const rawOutcomes = requireArray(body, 'outcomes')

    // Cast the raw outcomes — recordOutcomes validates nodeIds exist.
    const outcomes = rawOutcomes as AssessedOutcome[]

    // Mark the session as completed, then write mastery.
    const now = Date.now()
    await completePracticeSession(db, id, now)
    const mastery = await recordOutcomes(db, learnerId, outcomes, now)

    return jsonOk({ mastery })
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/sessions/[id]/complete]', err)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 2: Create the abandon route**

Create `src/app/api/practice/sessions/[id]/abandon/route.ts`:

```typescript
import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { getPracticeSession, abandonPracticeSession } from '@/sequencer/session-store'

// POST /api/practice/sessions/[id]/abandon
// Abandon a session (learner quit before finishing). No outcomes recorded.
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const db = getDb()

    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    await abandonPracticeSession(db, id, Date.now())

    return jsonOk({ ok: true })
  } catch (err) {
    console.error('[POST /api/practice/sessions/[id]/abandon]', err)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 3: Write the complete route tests**

Create `tests/api/practice/sessions-complete.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST } from '@/app/api/practice/sessions/[id]/complete/route'
import { createPracticeSession, completePracticeSession } from '@/sequencer/session-store'
import { upsertNodes } from '@/skill-graph/repository'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

function postRequest(id: string, body: Record<string, unknown>): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
  // Insert a node so recordOutcomes can validate it.
  await upsertNodes(db, [
    { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
  ], NOW)
})

afterEach(() => {
  _setTestDb(null)
})

describe('POST /api/practice/sessions/[id]/complete', () => {
  it('completes the session and returns updated mastery', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await POST(
      postRequest(sessionId, {
        learnerId: 'learner.1',
        outcomes: [{ nodeId: 'gram.a1.be', outcome: 1, difficulty: 0.5 }],
      }),
      makeParams(sessionId),
    )
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.mastery).toHaveLength(1)
    expect(data.mastery[0].nodeId).toBe('gram.a1.be')
    expect(data.mastery[0].mastery).toBeGreaterThan(0)
  })

  it('returns 404 for unknown session', async () => {
    const res = await POST(
      postRequest('ghost', { learnerId: 'learner.1', outcomes: [] }),
      makeParams('ghost'),
    )
    expect(res.status).toBe(404)
  })

  it('returns 400 for already-completed session', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await completePracticeSession(db, sessionId, NOW)

    const res = await POST(
      postRequest(sessionId, { learnerId: 'learner.1', outcomes: [] }),
      makeParams(sessionId),
    )
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('completed')
  })

  it('returns 400 when learnerId is missing', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const res = await POST(
      postRequest(sessionId, { outcomes: [] }),
      makeParams(sessionId),
    )
    expect(res.status).toBe(400)
  })

  it('returns 400 when outcomes is missing', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const res = await POST(
      postRequest(sessionId, { learnerId: 'learner.1' }),
      makeParams(sessionId),
    )
    expect(res.status).toBe(400)
  })
})
```

- [ ] **Step 4: Write the abandon route tests**

Create `tests/api/practice/sessions-abandon.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST } from '@/app/api/practice/sessions/[id]/abandon/route'
import { createPracticeSession, getPracticeSession } from '@/sequencer/session-store'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

function postRequest(id: string): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}/abandon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
}

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
})

afterEach(() => {
  _setTestDb(null)
})

describe('POST /api/practice/sessions/[id]/abandon', () => {
  it('abandons the session', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await POST(postRequest(sessionId), makeParams(sessionId))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.ok).toBe(true)

    // Verify the session status changed.
    const session = await getPracticeSession(db, sessionId)
    expect(session!.status).toBe('abandoned')
  })

  it('returns 404 for unknown session', async () => {
    const res = await POST(postRequest('ghost'), makeParams('ghost'))
    expect(res.status).toBe(404)
  })
})
```

- [ ] **Step 5: Run all API tests to verify**

Run: `npx vitest run tests/api/ --reporter verbose`
Expected: All tests pass (16 validate + 14 route = 30 tests from Task 1+2+3).

- [ ] **Step 6: Run full suite to check for regressions**

Run: `npx vitest run`
Expected: 954+ tests pass, no regressions.

- [ ] **Step 7: Commit**

```bash
git add src/app/api/practice/sessions/\[id\]/complete/route.ts src/app/api/practice/sessions/\[id\]/abandon/route.ts tests/api/practice/sessions-complete.test.ts tests/api/practice/sessions-abandon.test.ts
git commit -m "feat(api): add complete and abandon routes with mastery integration

POST /api/practice/sessions/[id]/complete — marks session completed,
records mastery outcomes in one batch write.
POST /api/practice/sessions/[id]/abandon — marks session abandoned.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
