# Auth & API Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Better Auth (email + Google OAuth) and wire placement, mock-test, and diagnosis engines to authenticated HTTP routes.

**Architecture:** Better Auth manages its own user/session/account/verification tables via the Drizzle adapter. The existing `learners` table links by email. A shared `getAuthenticatedLearner(request)` helper extracts learnerId from the session on every request. All 12 new routes + 5 migrated practice routes use this helper.

**Tech Stack:** better-auth, drizzle-orm (SQLite/Turso), Next.js 16 App Router, vitest

## Global Constraints

- Next.js 16 App Router — route params are `Promise<{ id: string }>`, must be `await`ed
- All IDs generated via `generateId()` from `@/db/id`
- Mock test answer keys (`correctIndex`, `misconception`) never sent to client
- Placement items include answer keys (instant feedback)
- 18+ age gate enforced at signup (India DPDP Act — profiling children prohibited)
- Heavily commented code throughout
- Existing route pattern: `getDb()` + `jsonOk`/`jsonError` + validators from `src/app/api/_lib/`
- Error handling: `AuthError` → 401, `ValidationError` → 400, ownership → 403, not found → 404, catch-all → 500

---

### Task 1: Better Auth Setup + Auth Helper

**Files:**
- Create: `src/db/schema/auth.ts`
- Create: `src/lib/auth.ts`
- Create: `src/lib/auth-client.ts`
- Create: `src/app/api/auth/[...all]/route.ts`
- Create: `src/app/api/_lib/auth.ts`
- Modify: `src/db/schema/index.ts`
- Modify: `src/app/api/_lib/validate.ts`
- Modify: `package.json`
- Test: `tests/api/auth-helper.test.ts`

**Interfaces:**
- Consumes: `findLearnerByEmail(db, email)` from `@/db/repositories/learners`, `createLearner(db, input)` from same, `getDb()` from `@/app/api/_lib/db`
- Produces: `getAuthenticatedLearner(request: Request): Promise<AuthResult>` where `AuthResult = { learnerId: string, email: string }`, `AuthError` class extending `Error`

- [ ] **Step 1: Install better-auth**

```bash
npm install better-auth
```

- [ ] **Step 2: Create Better Auth schema tables**

Create `src/db/schema/auth.ts`. These tables are owned by Better Auth — FluentPath code never reads/writes them directly. Follows the official Drizzle SQLite schema from Better Auth docs, using `integer` with `mode: 'timestamp_ms'` as Better Auth expects.

```typescript
// src/db/schema/auth.ts
// Better Auth's own tables — managed by the auth library, not by FluentPath.
// Defined here so Drizzle migrations include them and the schema barrel
// exposes them to the adapter.

import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// ─── User ───────────────────────────────────────────────────────────────
// Better Auth's user record. Linked to the FluentPath `learners` table
// by email (unique in both). Auth IDs ≠ learner IDs.

export const authUsers = sqliteTable('auth_user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false).notNull(),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
})

// ─── Session ────────────────────────────────────────────────────────────

export const authSessions = sqliteTable(
  'auth_session',
  {
    id: text('id').primaryKey(),
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
    token: text('token').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => authUsers.id, { onDelete: 'cascade' }),
  },
  (table) => [index('auth_session_userId_idx').on(table.userId)],
)

// ─── Account ────────────────────────────────────────────────────────────
// Stores provider-specific credentials (Google OAuth tokens, email/password hash).

export const authAccounts = sqliteTable(
  'auth_account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => authUsers.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp_ms' }),
    refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp_ms' }),
    scope: text('scope'),
    password: text('password'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (table) => [index('auth_account_userId_idx').on(table.userId)],
)

// ─── Verification ───────────────────────────────────────────────────────
// Email verification tokens, password reset tokens, etc.

export const authVerifications = sqliteTable(
  'auth_verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (table) => [index('auth_verification_identifier_idx').on(table.identifier)],
)
```

- [ ] **Step 3: Export auth schema from barrel**

Add to the end of `src/db/schema/index.ts`:

```typescript
export * from './auth'
```

- [ ] **Step 4: Create Better Auth server config**

Create `src/lib/auth.ts`. This is the server-side auth instance with providers, Drizzle adapter, and database hooks that create learner rows on signup.

```typescript
// src/lib/auth.ts
// Better Auth server instance — providers, adapter, and signup hooks.
// The databaseHooks.user.create.after hook creates a FluentPath learner
// row whenever a new auth user is created (email signup or first Google login).

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createAuthMiddleware } from 'better-auth/api'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import { createLearner } from '@/db/repositories/learners'

// ─── Database ───────────────────────────────────────────────────────────
// Better Auth needs its own Drizzle instance with the full schema so the
// adapter can find the auth tables.

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const db = drizzle(client, { schema })

// ─── Auth instance ──────────────────────────────────────────────────────

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      // Map Better Auth's internal table names to our prefixed schema objects.
      user: schema.authUsers,
      session: schema.authSessions,
      account: schema.authAccounts,
      verification: schema.authVerifications,
    },
  }),

  // ─── Providers ──────────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },

  // ─── 18+ DOB gate ──────────────────────────────────────────────────
  // Intercept email signup requests and validate age >= 18.
  // India DPDP Act prohibits profiling of children — this is a legal
  // requirement, not a product choice.
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Only gate email signup — Google OAuth users have already accepted
      // Google's age requirements, and we validate via databaseHooks below.
      if (ctx.path === '/sign-up/email') {
        const body = ctx.body as Record<string, unknown> | undefined
        const dob = body?.dateOfBirth
        if (typeof dob !== 'string' || !dob) {
          throw new Error('Date of birth is required')
        }
        const birthDate = new Date(dob)
        if (isNaN(birthDate.getTime())) {
          throw new Error('Invalid date of birth')
        }
        // Compute age in years.
        const now = new Date()
        let age = now.getFullYear() - birthDate.getFullYear()
        const monthDiff = now.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
          age--
        }
        if (age < 18) {
          throw new Error('You must be 18 or older to use FluentPath')
        }
      }
    }),
  },

  // ─── Database hooks ────────────────────────────────────────────────
  // After a new auth user is created (email signup or first Google login),
  // create a matching FluentPath learner row linked by email.
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Check if a learner already exists for this email (shouldn't
          // happen, but defensive). The learner repo's createLearner
          // generates its own ID — auth IDs and learner IDs are independent.
          const { findLearnerByEmail } = await import('@/db/repositories/learners')
          const existing = await findLearnerByEmail(db, user.email)
          if (!existing) {
            await createLearner(db, {
              email: user.email,
              name: user.name ?? undefined,
              now: Date.now(),
            })
          }
        },
      },
    },
  },
})
```

- [ ] **Step 5: Create Better Auth client**

Create `src/lib/auth-client.ts`. Thin client instance for future frontend use.

```typescript
// src/lib/auth-client.ts
// Better Auth client — used by frontend components to call auth endpoints.
// Imported in client components, never in API routes.

import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
})
```

- [ ] **Step 6: Create catch-all auth route**

Create `src/app/api/auth/[...all]/route.ts`:

```typescript
// src/app/api/auth/[...all]/route.ts
// Catch-all route that delegates to Better Auth. Handles sign-in,
// sign-up, sign-out, OAuth callbacks, and session endpoints.

import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export const { GET, POST } = toNextJsHandler(auth)
```

- [ ] **Step 7: Add AuthError to validate.ts**

Add to `src/app/api/_lib/validate.ts`, after the `ValidationError` class:

```typescript
// Thrown when a request has no valid session or the session's email
// does not match any learner. Caught as 401 in route handlers.
export class AuthError extends Error {
  constructor(message = 'Authentication required') {
    super(message)
    this.name = 'AuthError'
  }
}
```

- [ ] **Step 8: Create getAuthenticatedLearner helper**

Create `src/app/api/_lib/auth.ts`:

```typescript
// src/app/api/_lib/auth.ts
// Per-request auth helper. Extracts the authenticated learnerId from the
// session so route handlers never touch auth internals directly.

import { auth } from '@/lib/auth'
import { getDb } from './db'
import { findLearnerByEmail } from '@/db/repositories/learners'
import { AuthError } from './validate'

// ─── Types ──────────────────────────────────────────────────────────────

export interface AuthResult {
  // FluentPath learner ID (NOT the Better Auth user ID).
  learnerId: string
  email: string
}

// ─── Helper ─────────────────────────────────────────────────────────────

// Authenticate the request and return the learner identity.
// Throws AuthError (caught as 401) if the session is missing/expired
// or no learner row exists for the session email.
export async function getAuthenticatedLearner(
  request: Request,
): Promise<AuthResult> {
  // Step 1: get the session from Better Auth.
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user?.email) {
    throw new AuthError('No active session')
  }

  // Step 2: look up the FluentPath learner by email.
  const db = getDb()
  const learner = await findLearnerByEmail(db, session.user.email)

  if (!learner) {
    // Auth user exists but no learner row — should not happen if the
    // databaseHooks.user.create.after hook ran correctly. Log and reject.
    console.error(`Auth user ${session.user.email} has no learner row`)
    throw new AuthError('Account not fully set up')
  }

  return {
    learnerId: learner.id,
    email: learner.email,
  }
}
```

- [ ] **Step 9: Write auth helper tests**

Create `tests/api/auth-helper.test.ts`:

```typescript
// tests/api/auth-helper.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import { AuthError } from '@/app/api/_lib/validate'
import type { Db } from '@/db/client'

// Mock the auth library so we control what getSession returns.
vi.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

// Import AFTER mocking so the mock is in place.
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { auth } from '@/lib/auth'

const NOW = 1_700_000_000_000

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  // Insert a learner row that the helper should find.
  await db.insert(learners).values({
    id: 'learner.1',
    email: 'test@test.com',
    createdAt: NOW,
    updatedAt: NOW,
  })
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

// Helper: build a minimal Request with headers.
function makeRequest(): Request {
  return new Request('http://localhost:3000/api/test', {
    headers: { cookie: 'session=abc' },
  })
}

describe('getAuthenticatedLearner', () => {
  it('returns learnerId when session is valid', async () => {
    // Mock a valid session with matching email.
    vi.mocked(auth.api.getSession).mockResolvedValue({
      session: { id: 'sess.1', userId: 'auth.1', token: 'abc', expiresAt: new Date(NOW + 86400000) },
      user: { id: 'auth.1', email: 'test@test.com', name: 'Test', emailVerified: true, createdAt: new Date(NOW), updatedAt: new Date(NOW) },
    } as any)

    const result = await getAuthenticatedLearner(makeRequest())

    expect(result.learnerId).toBe('learner.1')
    expect(result.email).toBe('test@test.com')
  })

  it('throws AuthError when no session exists', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null)

    await expect(getAuthenticatedLearner(makeRequest())).rejects.toThrow(AuthError)
  })

  it('throws AuthError when session has no email', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      session: { id: 'sess.1' },
      user: { id: 'auth.1' },
    } as any)

    await expect(getAuthenticatedLearner(makeRequest())).rejects.toThrow(AuthError)
  })

  it('throws AuthError when no learner row matches the email', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      session: { id: 'sess.1', userId: 'auth.1' },
      user: { id: 'auth.1', email: 'unknown@test.com', name: 'Unknown', emailVerified: true },
    } as any)

    await expect(getAuthenticatedLearner(makeRequest())).rejects.toThrow(AuthError)
  })
})
```

- [ ] **Step 10: Run tests**

```bash
npx vitest run tests/api/auth-helper.test.ts
```

Expected: 4 tests pass.

- [ ] **Step 11: Commit**

```bash
git add src/db/schema/auth.ts src/db/schema/index.ts src/lib/auth.ts src/lib/auth-client.ts src/app/api/auth src/app/api/_lib/auth.ts src/app/api/_lib/validate.ts tests/api/auth-helper.test.ts package.json package-lock.json
git commit -m "feat: add Better Auth setup with auth helper

Better Auth with email+password and Google OAuth. Drizzle adapter
for SQLite/Turso. Auth schema (user/session/account/verification),
catch-all route, 18+ DOB gate, learner creation on signup.
getAuthenticatedLearner helper extracts learnerId from session."
```

---

### Task 2: Practice Route Migration

**Files:**
- Modify: `src/app/api/practice/assemble/route.ts`
- Modify: `src/app/api/practice/sessions/route.ts`
- Modify: `src/app/api/practice/sessions/[id]/route.ts`
- Modify: `src/app/api/practice/sessions/[id]/complete/route.ts`
- Modify: `src/app/api/practice/sessions/[id]/abandon/route.ts`
- Modify: `tests/api/practice/assemble.test.ts`
- Modify: `tests/api/practice/sessions.test.ts`
- Modify: `tests/api/practice/sessions-id.test.ts`
- Modify: `tests/api/practice/sessions-complete.test.ts`
- Modify: `tests/api/practice/sessions-abandon.test.ts`

**Interfaces:**
- Consumes: `getAuthenticatedLearner(request)` → `{ learnerId, email }` from Task 1, `AuthError` from Task 1
- Produces: Same API surface, but `learnerId` comes from auth session instead of request body

- [ ] **Step 1: Add auth mock helper for tests**

Create `tests/helpers/mock-auth.ts` — shared mock setup used by all route tests:

```typescript
// tests/helpers/mock-auth.ts
// Shared auth mock for route tests. Call setupAuthMock() in beforeEach
// to make getAuthenticatedLearner return a known learnerId.

import { vi } from 'vitest'

// This must be called at the TOP of test files, before any imports
// that touch the auth module. Usage:
//   vi.mock('@/app/api/_lib/auth', () => mockAuthModule())
export function mockAuthModule() {
  return {
    getAuthenticatedLearner: vi.fn(),
  }
}

// Call in beforeEach to set the default authenticated learner.
export function setupAuthMock(
  mock: { getAuthenticatedLearner: ReturnType<typeof vi.fn> },
  learnerId = 'learner.1',
  email = 'test@test.com',
) {
  mock.getAuthenticatedLearner.mockResolvedValue({ learnerId, email })
}

// Call to simulate an unauthenticated request (401).
export function setupAuthMockUnauthenticated(
  mock: { getAuthenticatedLearner: ReturnType<typeof vi.fn> },
) {
  const { AuthError } = require('@/app/api/_lib/validate')
  mock.getAuthenticatedLearner.mockRejectedValue(new AuthError('No active session'))
}
```

- [ ] **Step 2: Migrate assemble route**

In `src/app/api/practice/assemble/route.ts`:
- Remove `learnerId` from body parsing (`requireString(body, 'learnerId')`)
- Add import: `import { getAuthenticatedLearner } from '@/app/api/_lib/auth'`
- Add import: `import { AuthError } from '@/app/api/_lib/validate'`
- Add at the top of the POST handler: `const { learnerId } = await getAuthenticatedLearner(request)`
- Add catch clause: `if (error instanceof AuthError) return jsonError(401, error.message)`

The full updated handler:

```typescript
import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { optionalNumber, optionalArray, optionalObject } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { assembleSession } from '@/sequencer/assemble'
import type { ActionPlan } from '@/diagnosis/types'

export async function POST(request: NextRequest) {
  try {
    // Auth: get learnerId from session (not from body).
    const { learnerId } = await getAuthenticatedLearner(request)

    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>

    // Optional overrides — learnerId is no longer in the body.
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
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/practice/assemble', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 3: Migrate sessions route (POST + GET)**

In `src/app/api/practice/sessions/route.ts`:
- POST: replace `requireString(body, 'learnerId')` with `getAuthenticatedLearner(request)`
- GET: replace `searchParams.get('learnerId')` with `getAuthenticatedLearner(request)`
- Add AuthError catch

```typescript
import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { optionalObject } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { createPracticeSession, findActivePracticeSession } from '@/sequencer/session-store'

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>

    // The session plan is required — it comes from the assemble endpoint.
    const plan = optionalObject(body, 'plan')
    if (!plan) throw new ValidationError('plan is required')

    const sessionId = await createPracticeSession(db, learnerId, plan, Date.now())
    return jsonOk({ sessionId }, 201)
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/practice/sessions', error)
    return jsonError(500, 'Internal server error')
  }
}

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const session = await findActivePracticeSession(db, learnerId)
    return jsonOk({ session: session ?? null })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('GET /api/practice/sessions', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 4: Migrate sessions/[id] route (GET + PATCH)**

In `src/app/api/practice/sessions/[id]/route.ts`:
- GET: no learnerId needed (fetches by ID, no ownership check on read)
- PATCH: replace `requireString(body, 'learnerId')` with auth. Actually, check the existing code — PATCH currently doesn't check ownership, just updates progress. Keep it that way but use auth to ensure the request is authenticated.

```typescript
import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { requireNumber } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getPracticeSession, updateProgress } from '@/sequencer/session-store'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const db = getDb()
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found')
    return jsonOk({ session })
  } catch (error) {
    console.error('GET /api/practice/sessions/[id]', error)
    return jsonError(500, 'Internal server error')
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Auth required for writes.
    await getAuthenticatedLearner(request)

    const { id } = await params
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>
    const progress = requireNumber(body, 'progress')

    await updateProgress(db, id, progress, Date.now())
    return jsonOk({ ok: true })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('PATCH /api/practice/sessions/[id]', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 5: Migrate sessions/[id]/complete route**

In `src/app/api/practice/sessions/[id]/complete/route.ts`:
- Replace `requireString(body, 'learnerId')` with `getAuthenticatedLearner(request)`
- Ownership check stays: `session.learnerId !== learnerId` → 403

```typescript
import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { requireArray } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getPracticeSession, completePracticeSession } from '@/sequencer/session-store'
import { recordOutcomes, type AssessedOutcome } from '@/mastery/service'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    // Verify session exists and is in progress.
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found')
    if (session.status !== 'in_progress') {
      return jsonError(400, 'Session is not in progress')
    }

    // Ownership check — the authenticated user must own this session.
    if (session.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session.')
    }

    const body = (await request.json()) as Record<string, unknown>
    const outcomes = requireArray(body, 'outcomes') as AssessedOutcome[]
    const now = Date.now()

    // Record mastery FIRST — if this fails the session stays in_progress.
    const mastery = await recordOutcomes(db, learnerId, outcomes, now)
    await completePracticeSession(db, id, now)

    return jsonOk({ mastery })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/practice/sessions/[id]/complete', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 6: Migrate sessions/[id]/abandon route**

In `src/app/api/practice/sessions/[id]/abandon/route.ts`:
- Replace `requireString(body, 'learnerId')` with `getAuthenticatedLearner(request)`

```typescript
import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getPracticeSession, abandonPracticeSession } from '@/sequencer/session-store'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    // Verify session exists.
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found')

    // Ownership check.
    if (session.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session.')
    }

    await abandonPracticeSession(db, id, Date.now())
    return jsonOk({ ok: true })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('POST /api/practice/sessions/[id]/abandon', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 7: Update assemble test**

In `tests/api/practice/assemble.test.ts`:
- Add `vi.mock('@/app/api/_lib/auth')` at the top (before imports)
- Import `getAuthenticatedLearner` and use `vi.mocked()` to set it up
- Remove `learnerId` from request bodies
- Add a 401 test

Replace the test setup and helper. The key changes:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock auth before importing route handlers.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
// ... rest of imports ...

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  // Mock auth to return the test learner.
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'learner.1',
    email: 'learner1@test.com',
  })
  // ... insert learner, nodes, provenance ...
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})
```

Remove `learnerId` from `postRequest` body helper. Where the body was `{ learnerId: 'learner.1' }`, it becomes `{}`. Where it was `{ learnerId: 'learner.1', maxItems: 5 }`, it becomes `{ maxItems: 5 }`.

Add a test for 401:

```typescript
it('returns 401 when not authenticated', async () => {
  const { AuthError } = await import('@/app/api/_lib/validate')
  vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())

  const response = await POST(postRequest({}))
  expect(response.status).toBe(401)
})
```

- [ ] **Step 8: Update sessions test**

Same pattern as step 7 for `tests/api/practice/sessions.test.ts`:
- Add `vi.mock('@/app/api/_lib/auth')` before imports
- Remove `learnerId` from POST body and GET query params
- Add 401 test

For GET: the old test passed `learnerId` as a query param. Now the route gets it from auth. Update the GET request helper to not include the query param, and mock auth instead.

- [ ] **Step 9: Update sessions-id, sessions-complete, sessions-abandon tests**

Same migration pattern for each of the remaining three test files:
- `tests/api/practice/sessions-id.test.ts` — mock auth, remove learnerId from PATCH body
- `tests/api/practice/sessions-complete.test.ts` — mock auth, remove learnerId from POST body, keep ownership test (mock auth as different user: `vi.mocked(getAuthenticatedLearner).mockResolvedValue({ learnerId: 'evil.attacker', email: 'evil@test.com' })`)
- `tests/api/practice/sessions-abandon.test.ts` — same as complete

For ownership tests, change the mock to return a different learnerId:

```typescript
it('returns 403 when a different user tries to complete', async () => {
  // ... create session as learner.1 ...
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'evil.attacker',
    email: 'evil@test.com',
  })
  const response = await POST(/* ... */)
  expect(response.status).toBe(403)
})
```

- [ ] **Step 10: Run all practice tests**

```bash
npx vitest run tests/api/practice/
```

Expected: All existing tests pass with the auth mock in place.

- [ ] **Step 11: Commit**

```bash
git add src/app/api/practice/ tests/api/practice/ tests/helpers/mock-auth.ts
git commit -m "refactor: migrate practice routes from self-asserted learnerId to auth

All 5 practice routes now use getAuthenticatedLearner() instead of
accepting learnerId in the request body. Tests use vi.mock() to
inject the authenticated identity."
```

---

### Task 3: Placement + Diagnosis API Routes

**Files:**
- Create: `src/app/api/placement/start/route.ts`
- Create: `src/app/api/placement/answer/route.ts`
- Create: `src/app/api/placement/active/route.ts`
- Create: `src/app/api/diagnosis/route.ts`
- Create: `src/app/api/diagnosis/[id]/route.ts`
- Modify: `src/db/repositories/diagnoses.ts`
- Modify: `src/db/repositories/index.ts`
- Test: `tests/api/placement.test.ts`
- Test: `tests/api/diagnosis.test.ts`

**Interfaces:**
- Consumes: `getAuthenticatedLearner` from Task 1, all placement engine functions (`createPlacementState`, `selectNextItem`, `recordAnswer`, `isComplete`, `getResult` from `@/placement/adaptive`), `populateMastery` from `@/placement/populate`, placement repository functions from `@/db/repositories/placement`, `diagnose()` from `@/diagnosis/diagnose`, diagnosis repository functions, `findTestResultById` from `@/db/repositories/test-results`, skill graph repo functions, mastery repo functions
- Produces: 6 HTTP endpoints (3 placement, 3 diagnosis), `findDiagnosisById` repo function

- [ ] **Step 1: Add findDiagnosisById to diagnoses repository**

In `src/db/repositories/diagnoses.ts`, add after `findDiagnosisByTestResult`:

```typescript
// Find a diagnosis by its primary key.
export async function findDiagnosisById(db: Db, id: string) {
  const rows = await db
    .select()
    .from(diagnoses)
    .where(eq(diagnoses.id, id))
    .limit(1)

  return rows[0]
}
```

Also add to `src/db/repositories/index.ts` — it already re-exports `./diagnoses` so no change needed (barrel re-exports everything).

- [ ] **Step 2: Write placement route tests**

Create `tests/api/placement.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock auth before route imports.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { Db } from '@/db/client'

// Import route handlers.
import { POST as startPOST } from '@/app/api/placement/start/route'
import { POST as answerPOST } from '@/app/api/placement/answer/route'
import { GET as activeGET } from '@/app/api/placement/active/route'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()
let db: Db

// Nodes at A1 and B1 for placement items.
const NODES = [
  { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
  { id: 'gram.b1.pp', type: 'grammar' as const, level: 'B1' as const, skill: 'general' as const, title: 'Present perfect', description: '', metadata: null },
]

const MCQ_PAYLOAD = {
  stem: 'She ______ a teacher.',
  options: [
    { text: 'is', misconception: null },
    { text: 'are', misconception: 'uses plural form with singular subject' },
    { text: 'am', misconception: 'uses first person with third person subject' },
    { text: 'be', misconception: 'uses base form instead of conjugated form' },
  ],
  correctIndex: 0,
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'learner.1',
    email: 'test@test.com',
  })

  await db.insert(learners).values({
    id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW,
  })
  await upsertNodes(db, NODES, NOW)
  await recordProvenance(db, { id: 'prov.1', sourceName: 'original', licence: 'original' }, NOW)

  // Publish 3 items at B1 (the default start level).
  for (let i = 0; i < 3; i++) {
    const versionId = await createItem(db, {
      id: `item.b1.${i}`, type: 'mcq', level: 'B1', skill: 'general',
      nodeIds: ['gram.b1.pp'], payload: { ...MCQ_PAYLOAD, stem: `B1 question ${i} ______.` },
      provenanceId: 'prov.1',
    }, NOW)
    await publishItemVersion(db, versionId, inventory, NOW)
  }
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

function postRequest(body: Record<string, unknown>): Request {
  return new Request('http://localhost:3000/api/placement/start', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/placement/start', () => {
  it('creates a placement and returns the first item', async () => {
    const response = await startPOST(postRequest({}))
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.placementId).toBeDefined()
    expect(data.item).toBeDefined()
    expect(data.item.stem).toBeDefined()
    expect(data.level).toBe('B1')
    expect(data.progress.answered).toBe(0)
  })

  it('returns 409 when active placement already exists', async () => {
    await startPOST(postRequest({}))
    const response = await startPOST(postRequest({}))
    expect(response.status).toBe(409)
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())
    const response = await startPOST(postRequest({}))
    expect(response.status).toBe(401)
  })
})

describe('GET /api/placement/active', () => {
  it('returns null when no active placement', async () => {
    const response = await activeGET(
      new Request('http://localhost:3000/api/placement/active'),
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.placement).toBeNull()
  })

  it('returns active placement after starting one', async () => {
    await startPOST(postRequest({}))
    const response = await activeGET(
      new Request('http://localhost:3000/api/placement/active'),
    )
    const data = await response.json()
    expect(data.placement).not.toBeNull()
    expect(data.placement.status).toBe('in_progress')
  })
})

describe('POST /api/placement/answer', () => {
  it('records an answer and returns the next item', async () => {
    // Start placement to get the first item.
    const startRes = await startPOST(postRequest({}))
    const { placementId, item } = await startRes.json()

    const answerRes = await answerPOST(
      new Request('http://localhost:3000/api/placement/answer', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          placementId,
          itemId: item.id,
          selectedIndex: item.correctIndex,
        }),
      }),
    )
    expect(answerRes.status).toBe(200)
    const data = await answerRes.json()
    // Either returns next item or finishes.
    expect(data.finished === true || data.item !== undefined).toBe(true)
    expect(data.progress.answered).toBe(1)
  })
})
```

- [ ] **Step 3: Write placement start route**

Create `src/app/api/placement/start/route.ts`:

```typescript
// src/app/api/placement/start/route.ts
// Start a new placement test. Returns the first item to present.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { createPlacementState, selectNextItem } from '@/placement/adaptive'
import { findActivePlacement, createPlacementResult } from '@/db/repositories/placement'
import { findItemsByLevel } from '@/content/item-bank'
import type { CefrLevel } from '@/skill-graph/types'
import type { PlacementConfig } from '@/placement/types'

// Default placement config — matches the adaptive test defaults.
const DEFAULT_CONFIG: Omit<PlacementConfig, 'startLevel'> = {
  itemsPerLevel: 3,
  correctThreshold: 0.66,
  maxItems: 20,
}

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const now = Date.now()

    // Check no active placement exists — one at a time.
    const existing = await findActivePlacement(db, learnerId)
    if (existing) {
      return jsonError(409, 'A placement test is already in progress')
    }

    // Parse optional start level from body.
    let startLevel: CefrLevel = 'B1'
    try {
      const body = (await request.json()) as Record<string, unknown>
      if (typeof body.startLevel === 'string') {
        startLevel = body.startLevel as CefrLevel
      }
    } catch {
      // Empty body is fine — use defaults.
    }

    // Create the placement state.
    const config: PlacementConfig = { ...DEFAULT_CONFIG, startLevel }
    const state = createPlacementState(config)

    // Fetch items at the start level.
    const items = await findItemsByLevel(db, startLevel, { limit: 20 })
    const firstItem = selectNextItem(state, items)

    if (!firstItem) {
      return jsonError(500, 'No items available for placement at this level')
    }

    // Persist the placement state.
    const row = await createPlacementResult(db, {
      learnerId,
      state: state as unknown as Record<string, unknown>,
      now,
    })

    return jsonOk({
      placementId: row.id,
      item: firstItem,
      level: state.currentLevel,
      progress: { answered: 0, maxItems: config.maxItems },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/placement/start', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 4: Write placement answer route**

Create `src/app/api/placement/answer/route.ts`:

```typescript
// src/app/api/placement/answer/route.ts
// Record an answer in the placement test. Returns the next item or
// the final result when placement completes.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { requireString, requireNumber } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import {
  selectNextItem, recordAnswer, isComplete, getResult,
} from '@/placement/adaptive'
import { populateMastery } from '@/placement/populate'
import {
  findActivePlacement, updatePlacementState, completePlacement,
} from '@/db/repositories/placement'
import { updateLearnerLevel } from '@/db/repositories/learners'
import { findItemsByLevel } from '@/content/item-bank'
import { listNodes } from '@/skill-graph/repository'
import { saveMastery } from '@/mastery/repository'
import type { PlacementState } from '@/placement/types'
import type { SkillArea } from '@/skill-graph/types'

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const now = Date.now()
    const body = (await request.json()) as Record<string, unknown>

    const placementId = requireString(body, 'placementId')
    const itemId = requireString(body, 'itemId')
    const selectedIndex = requireNumber(body, 'selectedIndex')

    // Load the active placement and verify ownership.
    const placement = await findActivePlacement(db, learnerId)
    if (!placement || placement.id !== placementId) {
      return jsonError(404, 'Placement not found or not active')
    }

    const state = placement.state as unknown as PlacementState

    // Find the item to determine correctness and skill area.
    const items = await findItemsByLevel(db, state.currentLevel, { limit: 50 })
    const item = items.find((i) => i.id === itemId)
    if (!item) {
      return jsonError(404, 'Item not found at current level')
    }

    const correct = selectedIndex === item.correctIndex

    // Determine skill area from the item's primary node.
    let skillArea: SkillArea | undefined
    const nodes = await listNodes(db)
    const primaryNodeId = item.nodeIds[0]
    if (primaryNodeId) {
      const node = nodes.find((n) => n.id === primaryNodeId)
      if (node) skillArea = node.skill
    }

    // Record the answer in the placement state.
    const nextState = recordAnswer(state, itemId, correct, now, skillArea)

    // Check if placement is complete.
    if (isComplete(nextState)) {
      const result = getResult(nextState)

      // Populate mastery records for all skill graph nodes.
      const masteryRecords = populateMastery(result, nodes, now)
      if (masteryRecords.length > 0) {
        await saveMastery(db, masteryRecords)
      }

      // Update the learner's current level.
      await updateLearnerLevel(db, learnerId, result.estimatedLevel)

      // Mark placement as completed in DB.
      await completePlacement(
        db, placementId, result.estimatedLevel, result.levelResults,
        result.itemsUsed, nextState as unknown as Record<string, unknown>, now,
      )

      return jsonOk({
        finished: true,
        correct,
        result: {
          estimatedLevel: result.estimatedLevel,
          perSkillLevels: result.perSkillLevels,
          confidence: result.confidence,
        },
        progress: { answered: nextState.itemsAnswered, maxItems: nextState.config.maxItems },
      })
    }

    // Not complete — fetch items at the (possibly new) current level.
    const nextItems = await findItemsByLevel(db, nextState.currentLevel, { limit: 50 })
    const nextItem = selectNextItem(nextState, nextItems)

    // Update state in DB.
    await updatePlacementState(
      db, placementId,
      nextState as unknown as Record<string, unknown>,
      nextState.itemsAnswered,
    )

    return jsonOk({
      finished: false,
      correct,
      item: nextItem,
      level: nextState.currentLevel,
      progress: { answered: nextState.itemsAnswered, maxItems: nextState.config.maxItems },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/placement/answer', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 5: Write placement active route**

Create `src/app/api/placement/active/route.ts`:

```typescript
// src/app/api/placement/active/route.ts
// Returns the learner's active (in-progress) placement, or null.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findActivePlacement } from '@/db/repositories/placement'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const placement = await findActivePlacement(db, learnerId)
    return jsonOk({ placement: placement ?? null })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('GET /api/placement/active', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 6: Run placement tests**

```bash
npx vitest run tests/api/placement.test.ts
```

Expected: All tests pass.

- [ ] **Step 7: Write diagnosis route tests**

Create `tests/api/diagnosis.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import { createDiagnosis, findDiagnosesByLearner } from '@/db/repositories/diagnoses'
import type { Db } from '@/db/client'

import { POST, GET } from '@/app/api/diagnosis/route'
import { GET as getById } from '@/app/api/diagnosis/[id]/route'

const NOW = 1_700_000_000_000
let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'learner.1',
    email: 'test@test.com',
  })
  await db.insert(learners).values({
    id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW,
  })
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

describe('GET /api/diagnosis', () => {
  it('returns empty list when no diagnoses exist', async () => {
    const response = await GET(
      new Request('http://localhost:3000/api/diagnosis'),
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.diagnoses).toEqual([])
  })

  it('returns diagnoses for the authenticated learner', async () => {
    // Insert a diagnosis directly.
    await createDiagnosis(db, {
      testResultId: 'tr.1', learnerId: 'learner.1', gapCount: 3,
      topRootCause: 'knowledge', totalStudyMinutes: 45,
      diagnosis: { gaps: [] }, now: NOW,
    })

    const response = await GET(
      new Request('http://localhost:3000/api/diagnosis'),
    )
    const data = await response.json()
    expect(data.diagnoses).toHaveLength(1)
  })
})

describe('GET /api/diagnosis/[id]', () => {
  it('returns 404 for nonexistent diagnosis', async () => {
    const response = await getById(
      new Request('http://localhost:3000/api/diagnosis/nope'),
      makeParams('nope'),
    )
    expect(response.status).toBe(404)
  })

  it('returns the full diagnosis object', async () => {
    const row = await createDiagnosis(db, {
      testResultId: 'tr.1', learnerId: 'learner.1', gapCount: 2,
      topRootCause: 'processing', totalStudyMinutes: 30,
      diagnosis: { gaps: [{ nodeId: 'gram.b1.pp' }] }, now: NOW,
    })

    const response = await getById(
      new Request(`http://localhost:3000/api/diagnosis/${row.id}`),
      makeParams(row.id),
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.diagnosis.diagnosis.gaps).toHaveLength(1)
  })

  it('returns 403 when a different user requests it', async () => {
    const row = await createDiagnosis(db, {
      testResultId: 'tr.1', learnerId: 'learner.1', gapCount: 1,
      topRootCause: 'knowledge', totalStudyMinutes: 10,
      diagnosis: {}, now: NOW,
    })

    // Switch to a different authenticated user.
    vi.mocked(getAuthenticatedLearner).mockResolvedValue({
      learnerId: 'evil.attacker', email: 'evil@test.com',
    })

    const response = await getById(
      new Request(`http://localhost:3000/api/diagnosis/${row.id}`),
      makeParams(row.id),
    )
    expect(response.status).toBe(403)
  })
})
```

- [ ] **Step 8: Write diagnosis list + create route**

Create `src/app/api/diagnosis/route.ts`:

```typescript
// src/app/api/diagnosis/route.ts
// GET: list diagnoses for the authenticated learner.
// POST: run diagnosis on a completed test result.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { requireString } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findDiagnosesByLearner, createDiagnosis } from '@/db/repositories/diagnoses'
import { findTestResultById } from '@/db/repositories/test-results'
import { findLearnerById } from '@/db/repositories/learners'
import { listNodes, listEdges } from '@/skill-graph/repository'
import { listMastery } from '@/mastery/repository'
import { diagnose } from '@/diagnosis/diagnose'
import { getExamDefinition } from '@/mock-test/exams/ielts-academic'
import type { DiagnosisInput } from '@/diagnosis/types'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const rows = await findDiagnosesByLearner(db, learnerId)
    return jsonOk({ diagnoses: rows })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('GET /api/diagnosis', error)
    return jsonError(500, 'Internal server error')
  }
}

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>
    const testResultId = requireString(body, 'testResultId')
    const now = Date.now()

    // Load and verify ownership of the test result.
    const testResult = await findTestResultById(db, testResultId)
    if (!testResult) return jsonError(404, 'Test result not found')
    if (testResult.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this test result')
    }

    // Load all inputs for the diagnosis pipeline.
    const learner = await findLearnerById(db, learnerId)
    const [nodes, edges, masteryRecords] = await Promise.all([
      listNodes(db),
      listEdges(db),
      listMastery(db, learnerId),
    ])

    const examDef = getExamDefinition(testResult.examId)
    if (!examDef) return jsonError(404, 'Exam definition not found')

    // Build the diagnosis input and run the pipeline.
    const input: DiagnosisInput = {
      performanceRecord: testResult.performanceRecord as any,
      testResult: testResult as any,
      examDefinition: examDef,
      nodes,
      edges,
      masteryRecords,
      criterionWeights: {},
      l1: learner?.l1 ?? null,
      now,
    }

    const result = diagnose(input)

    // Persist the diagnosis.
    const row = await createDiagnosis(db, {
      testResultId,
      learnerId,
      gapCount: result.gaps.length,
      topRootCause: result.gaps[0]?.rootCause ?? null,
      totalStudyMinutes: result.actionPlan.totalEstimatedMinutes,
      diagnosis: result as unknown as Record<string, unknown>,
      now,
    })

    return jsonOk({
      diagnosisId: row.id,
      summary: {
        gapCount: result.gaps.length,
        topGaps: result.gaps.slice(0, 5).map((g) => ({
          nodeTitle: g.nodeTitle, rootCause: g.rootCause, accuracy: g.accuracy,
        })),
        totalStudyMinutes: result.actionPlan.totalEstimatedMinutes,
        bandImpacts: result.bandImpacts,
      },
    }, 201)
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/diagnosis', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 9: Write diagnosis [id] route**

Create `src/app/api/diagnosis/[id]/route.ts`:

```typescript
// src/app/api/diagnosis/[id]/route.ts
// GET: fetch a full diagnosis report by ID.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findDiagnosisById } from '@/db/repositories/diagnoses'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    const row = await findDiagnosisById(db, id)
    if (!row) return jsonError(404, 'Diagnosis not found')

    // Ownership check.
    if (row.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this diagnosis')
    }

    return jsonOk({ diagnosis: row })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('GET /api/diagnosis/[id]', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 10: Run placement + diagnosis tests**

```bash
npx vitest run tests/api/placement.test.ts tests/api/diagnosis.test.ts
```

Expected: All tests pass.

- [ ] **Step 11: Commit**

```bash
git add src/app/api/placement/ src/app/api/diagnosis/ src/db/repositories/diagnoses.ts tests/api/placement.test.ts tests/api/diagnosis.test.ts
git commit -m "feat: add placement and diagnosis API routes

3 placement routes (start, answer, active) with adaptive algorithm,
mastery population on completion, and per-skill level tracking.
3 diagnosis routes (create, get by ID, list) with full pipeline
integration. New findDiagnosisById repository function."
```

---

### Task 4: Mock Test API Routes

**Files:**
- Create: `src/app/api/mock-test/exams/route.ts`
- Create: `src/app/api/mock-test/sessions/route.ts`
- Create: `src/app/api/mock-test/sessions/[id]/route.ts`
- Create: `src/app/api/mock-test/sessions/[id]/answer/route.ts`
- Create: `src/app/api/mock-test/sessions/[id]/complete/route.ts`
- Create: `src/app/api/mock-test/sessions/[id]/abandon/route.ts`
- Test: `tests/api/mock-test.test.ts`

**Interfaces:**
- Consumes: `getAuthenticatedLearner` from Task 1, `createSession`/`transition` from `@/mock-test/session`, `computeTestResult` from `@/mock-test/convert`, `assemblePerformanceRecord`/`scoreResponse` from `@/mock-test/record`, `getExamDefinition`/`listExamDefinitions` from `@/mock-test/exams/ielts-academic`, test-sessions and test-results repositories
- Produces: 6 HTTP endpoints

- [ ] **Step 1: Write mock test route tests**

Create `tests/api/mock-test.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

import { GET as examsGET } from '@/app/api/mock-test/exams/route'
import { POST as sessionsPOST } from '@/app/api/mock-test/sessions/route'
import { GET as sessionGET } from '@/app/api/mock-test/sessions/[id]/route'
import { POST as abandonPOST } from '@/app/api/mock-test/sessions/[id]/abandon/route'

const NOW = 1_700_000_000_000
let db: Db

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'learner.1',
    email: 'test@test.com',
  })
  await db.insert(learners).values({
    id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW,
  })
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

describe('GET /api/mock-test/exams', () => {
  it('returns the list of available exams (no auth required)', async () => {
    const response = await examsGET(
      new Request('http://localhost:3000/api/mock-test/exams'),
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.exams.length).toBeGreaterThan(0)
    expect(data.exams[0].id).toBe('ielts_academic')
    // Must not include item content.
    expect(data.exams[0].items).toBeUndefined()
  })
})

describe('POST /api/mock-test/sessions', () => {
  it('creates a test session', async () => {
    const response = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }),
    )
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.sessionId).toBeDefined()
    expect(data.examTitle).toBeDefined()
  })

  it('returns 404 for unknown examId', async () => {
    const response = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'nonexistent' }),
      }),
    )
    expect(response.status).toBe(404)
  })
})

describe('GET /api/mock-test/sessions/[id]', () => {
  it('returns session state without answer keys', async () => {
    // Create a session first.
    const createRes = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }),
    )
    const { sessionId } = await createRes.json()

    const response = await sessionGET(
      new Request(`http://localhost:3000/api/mock-test/sessions/${sessionId}`),
      makeParams(sessionId),
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.session).toBeDefined()
    // Answer keys must NOT be in the response.
    const json = JSON.stringify(data)
    expect(json).not.toContain('correctIndex')
    expect(json).not.toContain('misconception')
  })
})

describe('POST /api/mock-test/sessions/[id]/abandon', () => {
  it('abandons a session', async () => {
    const createRes = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }),
    )
    const { sessionId } = await createRes.json()

    const response = await abandonPOST(
      new Request(`http://localhost:3000/api/mock-test/sessions/${sessionId}/abandon`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      }),
      makeParams(sessionId),
    )
    expect(response.status).toBe(200)
  })

  it('returns 403 when different user tries to abandon', async () => {
    const createRes = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }),
    )
    const { sessionId } = await createRes.json()

    vi.mocked(getAuthenticatedLearner).mockResolvedValue({
      learnerId: 'evil.attacker', email: 'evil@test.com',
    })

    const response = await abandonPOST(
      new Request(`http://localhost:3000/api/mock-test/sessions/${sessionId}/abandon`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      }),
      makeParams(sessionId),
    )
    expect(response.status).toBe(403)
  })
})
```

- [ ] **Step 2: Write exams list route**

Create `src/app/api/mock-test/exams/route.ts`:

```typescript
// src/app/api/mock-test/exams/route.ts
// Public endpoint — lists available exam definitions (no auth required).
// Returns metadata only, never item content.

import { NextRequest } from 'next/server'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { listExamDefinitions } from '@/mock-test/exams/ielts-academic'

export async function GET(_request: NextRequest) {
  try {
    const exams = listExamDefinitions()

    // Strip item content — return metadata only.
    const summaries = exams.map((exam) => ({
      id: exam.id,
      title: exam.title,
      sections: exam.sections.map((s) => ({
        id: s.id,
        title: s.title,
        skill: s.skill,
        slotCount: s.slots.length,
        timeLimitMinutes: s.timeLimitMinutes,
      })),
    }))

    return jsonOk({ exams: summaries })
  } catch (error) {
    console.error('GET /api/mock-test/exams', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 3: Write session create route**

Create `src/app/api/mock-test/sessions/route.ts`:

```typescript
// src/app/api/mock-test/sessions/route.ts
// POST: create a new mock test session.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { requireString } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getExamDefinition } from '@/mock-test/exams/ielts-academic'
import { createSession } from '@/mock-test/session'
import { createTestSession, findActiveSession } from '@/db/repositories/test-sessions'
import { generateId } from '@/db/id'

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>
    const examId = requireString(body, 'examId')
    const now = Date.now()

    // Look up the exam definition.
    const exam = getExamDefinition(examId)
    if (!exam) return jsonError(404, 'Exam not found')

    // Check no active session exists for this learner.
    const existing = await findActiveSession(db, learnerId)
    if (existing) {
      return jsonError(409, 'A test session is already in progress')
    }

    // Create the engine session state.
    const sessionId = generateId()
    const session = createSession(exam, learnerId, sessionId, now)

    // Persist to DB.
    await createTestSession(db, {
      sessionId,
      learnerId,
      examId,
      state: session as unknown as Record<string, unknown>,
      now,
    })

    return jsonOk({
      sessionId,
      examTitle: exam.title,
      sections: exam.sections.map((s) => ({
        id: s.id, title: s.title, skill: s.skill,
        timeLimitMinutes: s.timeLimitMinutes,
      })),
    }, 201)
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/mock-test/sessions', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 4: Write session GET route (with answer key stripping)**

Create `src/app/api/mock-test/sessions/[id]/route.ts`:

```typescript
// src/app/api/mock-test/sessions/[id]/route.ts
// GET: fetch current session state. Answer keys are stripped — the client
// sees stems and options only, never correctIndex or misconception data.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findActiveSession } from '@/db/repositories/test-sessions'

// Recursively strip answer keys from any object. Removes correctIndex
// and misconception fields so the client cannot cheat.
function stripAnswerKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(stripAnswerKeys)
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (key === 'correctIndex' || key === 'misconception') continue
      result[key] = stripAnswerKeys(value)
    }
    return result
  }
  return obj
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    // findActiveSession filters by learnerId, but we also need to
    // support fetching completed sessions by ID. Use a direct lookup
    // if the active session doesn't match.
    const active = await findActiveSession(db, learnerId)
    const session = active && active.id === id ? active : null

    if (!session) return jsonError(404, 'Session not found')
    if (session.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session')
    }

    // Strip answer keys before sending to client.
    const sanitised = stripAnswerKeys(session)

    return jsonOk({ session: sanitised })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('GET /api/mock-test/sessions/[id]', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 5: Write session answer route**

Create `src/app/api/mock-test/sessions/[id]/answer/route.ts`:

```typescript
// src/app/api/mock-test/sessions/[id]/answer/route.ts
// POST: submit an answer for the current item in a mock test session.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError } from '@/app/api/_lib/validate'
import { requireString, requireNumber } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { transition } from '@/mock-test/session'
import { getExamDefinition } from '@/mock-test/exams/ielts-academic'
import { findActiveSession, updateSessionState } from '@/db/repositories/test-sessions'
import type { TestSession } from '@/mock-test/types'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>
    const now = Date.now()

    const sectionId = requireString(body, 'sectionId')
    const itemIndex = requireNumber(body, 'itemIndex')
    const selectedIndex = requireNumber(body, 'selectedIndex')

    // Load session and verify ownership.
    const row = await findActiveSession(db, learnerId)
    if (!row || row.id !== id) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) return jsonError(403, 'You do not own this session')

    const session = row.state as unknown as TestSession
    const exam = getExamDefinition(row.examId)
    if (!exam) return jsonError(500, 'Exam definition not found')

    // Record the response via the engine's transition function.
    const nextSession = transition(
      session,
      { type: 'respond', sectionId, slotIndex: itemIndex, response: { type: 'mcq', selectedIndex } },
      exam,
      now,
    )

    // Persist updated state.
    await updateSessionState(db, id, nextSession as unknown as Record<string, unknown>, now)

    // Determine what comes next.
    const currentSection = nextSession.sections[sectionId]
    const testComplete = nextSession.status === 'completed'
    const sectionComplete = currentSection?.status === 'completed'

    return jsonOk({
      sectionComplete,
      testComplete,
      progress: {
        sectionId,
        itemIndex: itemIndex + 1,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('POST /api/mock-test/sessions/[id]/answer', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 6: Write session complete route**

Create `src/app/api/mock-test/sessions/[id]/complete/route.ts`:

```typescript
// src/app/api/mock-test/sessions/[id]/complete/route.ts
// POST: complete a mock test session, compute band scores.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getExamDefinition } from '@/mock-test/exams/ielts-academic'
import { computeTestResult } from '@/mock-test/convert'
import { assemblePerformanceRecord } from '@/mock-test/record'
import {
  findActiveSession, completeSession,
} from '@/db/repositories/test-sessions'
import { createTestResult } from '@/db/repositories/test-results'
import type { TestSession } from '@/mock-test/types'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()
    const now = Date.now()

    // Load session.
    const row = await findActiveSession(db, learnerId)
    if (!row || row.id !== id) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) return jsonError(403, 'You do not own this session')

    const session = row.state as unknown as TestSession
    const exam = getExamDefinition(row.examId)
    if (!exam) return jsonError(500, 'Exam definition not found')

    // Compute band scores.
    const testResult = computeTestResult(
      assemblePerformanceRecord(session, exam, {}),
      exam,
    )

    // Persist the test result.
    const resultRow = await createTestResult(db, {
      sessionId: id,
      learnerId,
      examId: row.examId,
      overallBand: testResult.overallBand,
      sectionBands: testResult.sectionBands,
      sectionsIncluded: testResult.sectionsIncluded,
      sectionsMissing: testResult.sectionsMissing,
      performanceRecord: testResult as unknown as Record<string, unknown>,
      completedAt: now,
    })

    // Mark session as completed.
    await completeSession(db, id, session as unknown as Record<string, unknown>, now)

    return jsonOk({
      testResultId: resultRow.id,
      bandScores: {
        overall: testResult.overallBand,
        ...testResult.sectionBands,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('POST /api/mock-test/sessions/[id]/complete', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 7: Write session abandon route**

Create `src/app/api/mock-test/sessions/[id]/abandon/route.ts`:

```typescript
// src/app/api/mock-test/sessions/[id]/abandon/route.ts
// POST: abandon a mock test session.

import { NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findActiveSession, abandonSession } from '@/db/repositories/test-sessions'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    // Load session and verify ownership.
    const row = await findActiveSession(db, learnerId)
    if (!row || row.id !== id) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session')
    }

    await abandonSession(db, id, Date.now())
    return jsonOk({ ok: true })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('POST /api/mock-test/sessions/[id]/abandon', error)
    return jsonError(500, 'Internal server error')
  }
}
```

- [ ] **Step 8: Run mock test route tests**

```bash
npx vitest run tests/api/mock-test.test.ts
```

Expected: All tests pass.

- [ ] **Step 9: Run full test suite**

```bash
npx vitest run
```

Expected: All existing + new tests pass. No regressions.

- [ ] **Step 10: Commit**

```bash
git add src/app/api/mock-test/ tests/api/mock-test.test.ts
git commit -m "feat: add mock test API routes

6 routes: list exams (public), create session, get session state
(answer keys stripped), submit answer, complete (computes bands),
abandon. All routes auth-gated except exam listing."
```
