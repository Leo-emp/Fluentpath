# R1b-e Practice API Routes — Design Spec

## Goal

Wire the practice-loop engine (sequencer, session store, mastery) to Next.js App Router API routes so the frontend can assemble sessions, persist progress, and record outcomes over HTTP.

## Scope

Only the practice learning loop — what the "continue learning" button needs. Placement and diagnosis routes are separate milestones with their own UI flows.

## Constraints

- **No auth yet.** Every route takes `learnerId` as an explicit parameter (body for mutations, query for reads). When auth lands, middleware replaces this with `session.user.learnerId`.
- **No Zod.** Manual validation with small helpers — consistent with the codebase's existing pattern.
- **No `next.config.ts` needed.** Default App Router settings work.
- **HMR-safe DB.** The current `src/db/client.ts` exports a module-level `db` constant. Next.js dev mode re-evaluates modules on hot reload, which would create multiple libSQL clients. A `getDb()` wrapper using `globalThis` fixes this.

## File Tree

```
src/app/
  api/
    _lib/
      db.ts              -- HMR-safe getDb() singleton
      response.ts        -- jsonOk(), jsonError() helpers
      validate.ts        -- requireString(), requireNumber(), optionalArray()
    practice/
      assemble/
        route.ts         -- POST: assemble a session plan
      sessions/
        route.ts         -- POST: create session | GET: find active
        [id]/
          route.ts       -- GET: fetch by ID | PATCH: update progress
          complete/
            route.ts     -- POST: complete session + record outcomes
          abandon/
            route.ts     -- POST: abandon session
```

## Shared Infrastructure

### `src/app/api/_lib/db.ts`

HMR-safe database singleton. In development, stores the Drizzle instance on `globalThis` so hot reloads reuse the same connection. In production, module caching handles it.

```typescript
function getDb(): Db
```

All route handlers call `getDb()` instead of importing `db` directly.

### `src/app/api/_lib/response.ts`

Two helpers that standardise JSON responses:

```typescript
function jsonOk(data: unknown, status?: number): NextResponse
function jsonError(status: number, message: string): NextResponse
```

Every success response is `{ ...data }`. Every error response is `{ error: string }`.

### `src/app/api/_lib/validate.ts`

Lightweight field validators that throw a `ValidationError` with a human-readable message. The route handler catches it and returns 400.

```typescript
class ValidationError extends Error { }

function requireString(body: Record<string, unknown>, field: string): string
function requireNumber(body: Record<string, unknown>, field: string): number
function optionalNumber(body: Record<string, unknown>, field: string): number | undefined
function optionalArray(body: Record<string, unknown>, field: string): unknown[] | undefined
function optionalObject(body: Record<string, unknown>, field: string): Record<string, unknown> | undefined
```

## Endpoints

### 1. `POST /api/practice/assemble`

Assemble a practice session plan (node selection + item fetching). Does NOT persist — the client reviews the plan and then calls create.

**Request body:**
```json
{
  "learnerId": "string (required)",
  "maxItems": "number (optional, default 10)",
  "maxNodes": "number (optional, default 6)",
  "excludeItemIds": ["string[] (optional)"],
  "actionPlan": "ActionPlan object (optional, from diagnosis)"
}
```

**Response 200:**
```json
{
  "items": [
    {
      "item": { "id": "...", "nodeIds": [...], "payload": {...} },
      "nodeId": "gram.a1.be",
      "reason": "new"
    }
  ],
  "nodeIds": ["gram.a1.be", "lex.a1.greetings"],
  "estimatedMinutes": 5
}
```

**Errors:** 400 (missing learnerId), 500 (server error).

**Engine call:** `assembleSession(db, learnerId, { now: Date.now(), maxItems, maxNodes, excludeItemIds, actionPlan })`

### 2. `POST /api/practice/sessions`

Create a practice session from an assembled plan. Returns the session ID for subsequent progress/complete calls.

**Request body:**
```json
{
  "learnerId": "string (required)",
  "plan": "SessionPlan object (required, from /assemble response)"
}
```

**Response 201:**
```json
{
  "sessionId": "uuid"
}
```

**Errors:** 400 (missing fields).

**Engine call:** `createPracticeSession(db, learnerId, plan, Date.now())`

### 3. `GET /api/practice/sessions/active?learnerId=xxx`

Find the learner's active (in_progress) practice session. Used on app load to offer resume.

**Response 200:**
```json
{
  "session": { "id": "...", "status": "in_progress", "plan": {...}, "progress": 3, ... }
}
```

or `{ "session": null }` if no active session.

**Errors:** 400 (missing learnerId).

**Engine call:** `findActivePracticeSession(db, learnerId)`

### 4. `GET /api/practice/sessions/[id]`

Fetch a specific practice session by ID.

**Response 200:**
```json
{
  "session": { "id": "...", "status": "...", "plan": {...}, "progress": 5, ... }
}
```

**Errors:** 404 (session not found).

**Engine call:** `getPracticeSession(db, sessionId)`

### 5. `PATCH /api/practice/sessions/[id]`

Update progress counter. Called periodically by the client (e.g. every 3 items or on tab blur).

**Request body:**
```json
{
  "progress": "number (required)"
}
```

**Response 200:**
```json
{ "ok": true }
```

**Errors:** 400 (missing progress), 404 (session not found).

**Engine call:** `updateProgress(db, sessionId, progress, Date.now())`

### 6. `POST /api/practice/sessions/[id]/complete`

Complete a session and record mastery outcomes. This is the "session end write" — outcomes are batched here, not written per item.

**Request body:**
```json
{
  "learnerId": "string (required)",
  "outcomes": [
    { "nodeId": "gram.a1.be", "outcome": 1, "difficulty": 0.5 }
  ]
}
```

**Response 200:**
```json
{
  "mastery": [
    { "learnerId": "...", "nodeId": "gram.a1.be", "mastery": 0.72, "confidence": 0.6, ... }
  ]
}
```

**Errors:** 400 (missing fields), 404 (session not found).

**Engine calls (in order):**
1. `getPracticeSession(db, sessionId)` — verify exists and is in_progress
2. `completePracticeSession(db, sessionId, Date.now())`
3. `recordOutcomes(db, learnerId, outcomes, Date.now())`

### 7. `POST /api/practice/sessions/[id]/abandon`

Abandon a session (learner quit before finishing). No outcomes recorded.

**Request body:**
```json
{}
```

**Response 200:**
```json
{ "ok": true }
```

**Errors:** 404 (session not found).

**Engine call:** `abandonPracticeSession(db, sessionId, Date.now())`

## Error Handling

Every route handler follows this pattern:

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // validate + call engine
    return jsonOk(result)
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error(err)
    return jsonError(500, 'Internal server error')
  }
}
```

## Testing Strategy

Each route gets a test file that:
1. Creates a test DB via `makeTestDb()`
2. Calls the route handler function directly (not via HTTP) — Next.js route handlers are just async functions that take a `NextRequest` and return a `NextResponse`
3. Verifies response status and body

This avoids spinning up an HTTP server in tests while still exercising the full handler → validation → engine → response path.

Test files mirror the route tree:
```
tests/api/practice/assemble.test.ts
tests/api/practice/sessions.test.ts
tests/api/practice/sessions-id.test.ts
tests/api/practice/sessions-complete.test.ts
tests/api/practice/sessions-abandon.test.ts
```

## Auth Migration Path

When Better Auth or NextAuth is added:
1. Add `middleware.ts` at the project root that checks session cookies
2. In each route handler, replace `requireString(body, 'learnerId')` with `getLearnerId(request)` that reads from the auth session
3. The `learnerId` body param becomes ignored (or removed)
4. No engine function changes needed — they already accept `learnerId` as a parameter
