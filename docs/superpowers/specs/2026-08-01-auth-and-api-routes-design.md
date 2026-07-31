# Auth & API Routes Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Better Auth (email + Google OAuth) and wire the placement, mock-test, and diagnosis engines to HTTP routes — so the frontend can call every engine function through authenticated endpoints.

**Depends on:** Practice API routes (already shipped), all engine modules (placement, mock-test, diagnosis — already built and tested).

---

## 1. Auth Architecture

### 1.1 Provider: Better Auth

Better Auth with the Drizzle adapter for Turso. Two sign-in methods at launch:

- **Email + password** — built-in, no external setup
- **Google OAuth** — requires a Google Cloud project with OAuth credentials

### 1.2 Tables

Better Auth manages its own tables via the Drizzle adapter:

| Table | Owner | Columns (key) |
|---|---|---|
| `user` | Better Auth | id, email, name, image, createdAt, updatedAt |
| `session` | Better Auth | id, userId, token, expiresAt, ipAddress, userAgent |
| `account` | Better Auth | id, userId, providerId, accountId |
| `verification` | Better Auth | id, identifier, value, expiresAt |

The existing `learners` table stays unchanged. Link is via **email** (unique in both tables). Auth IDs and learner IDs are independent — full decoupling.

### 1.3 Signup Flow

1. User signs up via Better Auth (email+password or Google)
2. Better Auth's `afterSignUp` hook fires
3. Hook creates a `learners` row with the same email, tier `'free'`, currentLevel `null`
4. For Google OAuth (where signup is implicit on first login), use `afterOAuthSignIn` — check if a learner row exists for the email, create one if not

**18+ DOB gate:** The signup form collects a date of birth. The `afterSignUp` hook validates age >= 18. If under 18, the user row is deleted and signup is rejected. This is a legal requirement (spec §4e — India DPDP prohibits profiling of children).

### 1.4 Per-Request Auth Helper

A shared function in `src/app/api/_lib/auth.ts`:

```typescript
interface AuthResult {
  learnerId: string
  email: string
}

async function getAuthenticatedLearner(request: Request): Promise<AuthResult>
```

Steps:
1. Call `auth.api.getSession({ headers: request.headers })` — returns session or null
2. If no session → throw `AuthError` (caught as 401)
3. Call `findLearnerByEmail(db, session.user.email)` — returns learner or null
4. If no learner → throw `AuthError` (orphaned auth user, shouldn't happen)
5. Return `{ learnerId: learner.id, email: learner.email }`

All routes switch from `requireString(body, 'learnerId')` to `getAuthenticatedLearner(request)`. The self-asserted learnerId in request bodies is removed entirely.

### 1.5 Auth Route Handler

Better Auth needs a catch-all route at `src/app/api/auth/[...all]/route.ts` that delegates to the Better Auth handler. This serves sign-in, sign-up, sign-out, OAuth callbacks, and session endpoints.

### 1.6 Existing Route Migration

The 5 practice API routes currently accept `learnerId` in the request body. After auth is added:
- Remove `learnerId` from request body validation
- Call `getAuthenticatedLearner(request)` at the top of each handler
- Ownership checks remain but now compare against the authenticated learnerId

---

## 2. API Routes

All routes follow the established practice API pattern:
- Import `getDb`, `jsonOk`/`jsonError`, validators from `src/app/api/_lib/`
- Import `getAuthenticatedLearner` from `src/app/api/_lib/auth`
- Parse body, validate, call engine functions, return JSON
- Error handling: `AuthError` → 401, `ValidationError` → 400, ownership mismatch → 403, not found → 404, catch-all → 500

### 2.1 Placement Routes (3 routes)

**POST `/api/placement/start`**
- Auth: required
- Body: `{ startLevel?: CefrLevel }` (defaults to B1)
- Logic:
  1. Check no active placement exists (`findActivePlacement`)
  2. Create config with defaults (itemsPerLevel: 3, correctThreshold: 0.66, maxItems: 20)
  3. `createPlacementState(config)`
  4. Fetch items at the start level (`findItemsByLevel`)
  5. `selectNextItem(state, items)`
  6. Persist state (`createPlacementResult`)
  7. Return `{ placementId, item, level, progress: { answered: 0, maxItems } }`
- Item includes answer key (placement needs instant feedback for engagement)

**POST `/api/placement/answer`**
- Auth: required
- Body: `{ placementId: string, itemId: string, selectedIndex: number }`
- Logic:
  1. Load active placement, verify ownership
  2. Determine `correct` from item's `correctIndex`
  3. Determine `skillArea` from the item's primary node
  4. `recordAnswer(state, itemId, correct, now, skillArea)`
  5. If `isComplete(state)`:
     - `getResult(state)` → `populateMastery(result, nodes, now)`
     - Save mastery records, `completePlacement()`
     - Update learner's `currentLevel`
     - Return `{ finished: true, result: { estimatedLevel, perSkillLevels, confidence } }`
  6. If not complete:
     - Fetch items at new `currentLevel`, `selectNextItem()`
     - Update state in DB
     - Return `{ finished: false, item, level, progress }`

**GET `/api/placement/active`**
- Auth: required
- Logic: `findActivePlacement(db, learnerId)` → return state or `null`

### 2.2 Mock Test Routes (6 routes)

**GET `/api/mock-test/exams`**
- Auth: not required (public catalog)
- Logic: `listExamDefinitions()` → return list with id, title, sections summary
- Does NOT include item content — just metadata

**POST `/api/mock-test/sessions`**
- Auth: required
- Body: `{ examId: string }`
- Logic:
  1. `getExamDefinition(examId)` — 404 if not found
  2. Check no active session exists for this learner
  3. `createSession(examDefinition)` — creates engine state
  4. Persist via `createTestSession(db, ...)`
  5. Return `{ sessionId, examTitle, sections, currentSection, timeLimit }`

**GET `/api/mock-test/sessions/[id]`**
- Auth: required, ownership check
- Logic: Load session state, return current section/item position
- **No answer keys sent** — mock test items exclude `correctIndex` and misconception data in the response. The client sees stem + options only.

**POST `/api/mock-test/sessions/[id]/answer`**
- Auth: required, ownership check
- Body: `{ sectionId: string, itemIndex: number, selectedIndex: number }` for MCQ; `{ sectionId: string, itemIndex: number, text: string }` for writing; `{ sectionId: string, itemIndex: number, audioUrl: string }` for speaking
- Logic:
  1. `scoreResponse()` — records the response in the performance record
  2. Advance to next item/section via `transition()`
  3. Update session state in DB
  4. Return `{ nextItem?, sectionComplete?, testComplete? }`
- Writing/speaking responses are stored but scored at completion (batch scoring)

**POST `/api/mock-test/sessions/[id]/complete`**
- Auth: required, ownership check
- Logic:
  1. `assemblePerformanceRecord()` — gather all responses
  2. `computeTestResult()` — band scores per section + overall
  3. Persist via `createTestResult(db, ...)`
  4. `completeSession(db, id, now)`
  5. Return `{ testResultId, bandScores: { listening, reading, writing, speaking, overall } }`
- Band scores are the only result returned. Diagnosis is a separate action.

**POST `/api/mock-test/sessions/[id]/abandon`**
- Auth: required, ownership check
- Logic: `abandonSession(db, id, now)` → 200

### 2.3 Diagnosis Routes (3 routes)

**POST `/api/diagnosis`**
- Auth: required
- Body: `{ testResultId: string }`
- Logic:
  1. Load test result, verify ownership
  2. Load performance record, exam definition, skill graph, mastery records
  3. Build `DiagnosisInput` with learner's `l1` from the learners table
  4. `diagnose(input)` → full Diagnosis object
  5. Persist via `createDiagnosis(db, ...)`
  6. Return `{ diagnosisId, summary: { gapCount, topGaps, actionPlan.totalEstimatedMinutes, bandImpacts } }`
- The full diagnosis is stored; the response is a summary. Frontend fetches full detail via GET.

**GET `/api/diagnosis/[id]`**
- Auth: required, ownership check
- Logic: `findDiagnosisById(db, id)` → return full Diagnosis object
- Note: `findDiagnosisById` is a new repository function (the repo currently has `findDiagnosesByLearner` and `findDiagnosisByTestResult` but not by primary key)
- Includes: gaps with root causes + l1Interference, action plan, band impacts, confusable pairs

**GET `/api/diagnosis`**
- Auth: required
- Query: `?limit=10&offset=0` (optional pagination)
- Logic: `findDiagnosesByLearner(db, learnerId)` → return list with id, examId, createdAt, gapCount, estimatedLevel

---

## 3. Error Handling

Extends the existing pattern with one new error class:

| Error | Status | When |
|---|---|---|
| `AuthError` | 401 | No session, expired session, no matching learner |
| `ValidationError` | 400 | Missing/invalid fields in request body |
| Ownership mismatch | 403 | Authenticated user doesn't own the resource |
| Not found | 404 | Resource doesn't exist |
| Catch-all | 500 | Unexpected errors (logged, generic message returned) |

---

## 4. Files

### New files

| File | Purpose |
|---|---|
| `src/lib/auth.ts` | Better Auth server instance config (providers, adapter, hooks) |
| `src/lib/auth-client.ts` | Better Auth client instance (for future frontend) |
| `src/app/api/auth/[...all]/route.ts` | Catch-all auth route handler |
| `src/app/api/_lib/auth.ts` | `getAuthenticatedLearner()` helper |
| `src/app/api/placement/start/route.ts` | Start placement |
| `src/app/api/placement/answer/route.ts` | Answer placement item |
| `src/app/api/placement/active/route.ts` | Get active placement |
| `src/app/api/mock-test/exams/route.ts` | List exams |
| `src/app/api/mock-test/sessions/route.ts` | Create test session |
| `src/app/api/mock-test/sessions/[id]/route.ts` | Get session state |
| `src/app/api/mock-test/sessions/[id]/answer/route.ts` | Submit answer |
| `src/app/api/mock-test/sessions/[id]/complete/route.ts` | Complete test |
| `src/app/api/mock-test/sessions/[id]/abandon/route.ts` | Abandon test |
| `src/app/api/diagnosis/route.ts` | Create + list diagnoses |
| `src/app/api/diagnosis/[id]/route.ts` | Get diagnosis |

### Modified files

| File | Change |
|---|---|
| `src/app/api/practice/assemble/route.ts` | Remove learnerId from body, use `getAuthenticatedLearner` |
| `src/app/api/practice/sessions/route.ts` | Same migration |
| `src/app/api/practice/sessions/[id]/route.ts` | Same migration |
| `src/app/api/practice/sessions/[id]/complete/route.ts` | Same migration |
| `src/app/api/practice/sessions/[id]/abandon/route.ts` | Same migration |
| `src/app/api/_lib/validate.ts` | Add `AuthError` class |
| `package.json` | Add `better-auth` dependency |
| `src/db/schema/` | Add Better Auth tables (user, session, account, verification) |

---

## 5. Testing Strategy

- **Auth helper tests:** Mock Better Auth session, verify learnerId extraction, 401 on no session
- **Route tests:** Same pattern as practice API tests — call handler directly with NextRequest, mock auth helper to inject learnerId
- **Integration:** Each route group (placement, mock-test, diagnosis) gets its own test file testing the happy path + error cases
- **Existing tests:** Practice API tests updated to use the auth helper mock instead of passing learnerId in body

---

## 6. Global Constraints

- Next.js 16 App Router — route params are `Promise`, must be awaited
- All IDs generated via `generateId()` from `@/db/id`
- Mock test answer keys never sent to client
- Placement items include answer keys (instant feedback)
- 18+ age gate enforced at signup
- Heavily commented code (per user preference)
