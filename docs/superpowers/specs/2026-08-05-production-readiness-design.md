# FluentPath — Production Readiness Design

**Date:** 2026-08-05
**Status:** Approved
**Depends on:** `2026-07-29-fluentpath-design.md` (the full product spec)

---

## Scope

Everything needed to take FluentPath from code-complete R1 (1,038 tests, 171 source files, 14 pages) to deployable, payable, legally compliant production. Ten work items, three batches.

---

## 1. PTE Academic Exam Definition

**File:** `src/mock-test/exams/pte-academic.ts`

PTE Academic has three sections (not four — speaking and writing are combined):

| Section | Duration | Items | Scoring |
|---|---|---|---|
| Speaking & Writing (combined) | 54–67 min | ~15 tasks | 10–90 per communicative skill |
| Reading | 29–30 min | ~13–18 items | 10–90 |
| Listening | 30–43 min | ~12–20 items | 10–90 |

**Scoring model:** PTE does NOT use band conversion tables. It reports four communicative skill scores (Listening, Reading, Speaking, Writing) on a 10–90 scale, plus an overall score that is the mean of the four. Additionally it reports six enabling skills (grammar, oral fluency, pronunciation, spelling, vocabulary, written discourse) — informational, not used in the overall.

**Type system change required:** `OverallRule` currently only supports `'mean_round_half'`. Add `'mean_10_90'` for PTE (mean of communicative skills, rounded to nearest integer) and `'grade_lookup'` for OET. The `ScoringRule` interface needs a `scoreScale` field to distinguish band (0–9, 0.5 steps) from PTE (10–90, integer) from OET (A–E).

**Slots:** Speaking & Writing combined section has mixed slots — some are speaking tasks (Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture, Answer Short Question), some are writing tasks (Summarize Written Text, Write Essay). Each slot's `skill` field handles this already.

---

## 2. OET Exam Definition

**File:** `src/mock-test/exams/oet.ts`

OET has four sub-tests, administered on different days in the real exam but sequential here:

| Sub-test | Duration | Scoring |
|---|---|---|
| Listening (Part A + B) | ~50 min | 0–500 → grade A–E |
| Reading (Part A + B + C) | 60 min | 0–500 → grade A–E |
| Writing (referral/discharge letter) | 45 min | A–E from 6 criteria |
| Speaking (2 role-plays) | ~20 min | A–E from 6 criteria |

**Grade conversion:**

| Grade | Score range | Meaning |
|---|---|---|
| A | 450–500 | Very high |
| B | 350–440 | High (passing for most boards) |
| C+ | 300–340 | Borderline |
| C | 200–290 | Below passing |
| D | 100–190 | Low |
| E | 0–90 | Very low |

**No overall score.** OET reports four separate sub-test grades. Most nursing/medical boards require B in all four. The `OverallRule` for OET is `'none'` — report per-section grades only.

**Type system additions:** Add `'none'` to `OverallRule`. Add a `GradeConversionTable` type (numerical score → letter grade) alongside `BandConversionTable`.

---

## 3. IELTS General Training

**File:** `src/mock-test/exams/ielts-general.ts`

Identical structure to IELTS Academic except:
- Reading section uses different conversion table (GT is scored more leniently because passages are easier)
- Reading content is workplace/survival English rather than academic texts
- Writing Task 1 is a letter (not a chart description)

Same `ExamDefinition` shape, different data.

---

## 4. EU + Sanctions Geo-Blocking

**File:** `src/middleware.ts`

Single Next.js middleware checking `x-vercel-ip-country` (provided free by Vercel edge).

**Blocked regions:**
- **EU/EEA (30 countries):** AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO
- **UK sanctions:** RU, BY, IR, KP, SY, CU, VE (partial)

**Behavior:** Redirect to `/blocked` — a static page explaining the service is not available in their region. No auth check needed (runs before the app).

**No billing-address check yet** — that layer activates when Paddle goes live (Paddle's own geo-restrictions handle it for paid users).

**Config:** The country list lives in a `BLOCKED_COUNTRIES` constant, not env vars — these are legal decisions, not deployment config.

---

## 5. Privacy & Legal Pages

Three pages under a new `(marketing)` route group (no auth required):

| Route | Content |
|---|---|
| `/privacy` | Privacy notice — UK GDPR + DPDP Act compliant |
| `/terms` | Terms of service — UK Ltd, 18+ age gate, no score promises |
| `/cookies` | Cookie policy — functional cookies only at launch |

**Content sourced from spec §4e decisions:**
- Voice for assessment only, never identification
- 18+ globally with real DOB field (not checkbox)
- No EU data subjects at launch
- Audio deleted on retention schedule, transcripts kept
- Paddle as merchant of record (when live)
- Exam trademark disclaimers on every exam-related page

**Each page carries a visible "DRAFT — pending legal review" banner** until reviewed by a solicitor.

**Exam disclaimer** added to mock test pages: *"FluentPath is not affiliated with, endorsed by, or approved by the owners of IELTS, PTE Academic, or OET."*

**Footer update:** Landing page and app footer get links to /privacy, /terms, /cookies.

---

## 6. Production Polish

### 6a. Error Boundary

A client-side error boundary component wrapping the `(app)` layout. Shows a "Something went wrong" card with a retry button. Reports to Sentry when available.

### 6b. Loading Skeletons

Already have `PageSkeleton`. Verify it's used on every `(app)` page and that it matches the layout of the actual content (not just a generic spinner).

### 6c. Mobile Responsive Audit

Checklist (applied to every page):
- Touch targets ≥ 44×44px
- No horizontal scroll on 320px viewport
- Font ≥ 16px on inputs (prevents iOS zoom)
- Cards stack vertically on mobile
- NavBar collapses to hamburger or simplified layout

### 6d. Accessibility

- Focus rings on all interactive elements (keyboard nav)
- `aria-label` on icon-only buttons
- Form inputs have associated labels
- Color contrast ≥ 4.5:1 (monochrome palette should pass, verify)
- Skip-to-content link
- Page titles update per route

### 6e. Landing Page Update

Current landing page only mentions IELTS. Update:
- Feature cards: add PTE Academic and OET
- Hero subtitle: mention all three exams
- Add exam disclaimer footer text

### 6f. Dashboard Text Updates

"Take a full IELTS exam" → "Take a full mock exam" (now supports multiple exams).

---

## 7. Content Seeding Expansion

Current: 45 skill-graph nodes, 60 MCQ items (A1–C1).

**Target: 300+ items** covering:
- All levels A1–C2 (currently missing C2)
- Grammar items targeting each grammar node
- Vocabulary items targeting each lexical node
- Reading comprehension items (passage + questions)
- At least 5 items per skill-graph node for statistical validity

**Approach:** Expand `src/seed/seed-data.ts` with deterministic, hand-crafted items. No LLM generation for seeds — these are the golden set the evaluator calibrates against. Every item must meet the quality bar from §1 of the main spec.

**Misconception coverage:** Every MCQ distractor maps to a named misconception. This is what separates the seed bank from generated filler.

---

## 8. ElevenLabs TTS Integration

**Files:**
- `src/tts/provider.ts` — TTS provider interface
- `src/tts/elevenlabs.ts` — ElevenLabs implementation
- `src/tts/types.ts` — shared types

**Architecture:**
- Provider interface: `generateSpeech(text: string, opts: TtsOptions) → Promise<TtsResult>`
- Options: voice ID, accent (British/American/Australian), speed
- Result: audio buffer + format + duration
- Audio stored in R2 (when available) or filesystem (dev)

**Usage:**
- Content publish pipeline calls TTS to generate audio for listening items
- Audio URL stored in item metadata
- Frontend preloads audio before item display (spec §4b latency budgets)
- Multiple accents per item for exam practice (spec §3.3)

**Cost control:** Audio generated once at publish time, cached permanently. Never real-time TTS during a session.

---

## 9. Cloudflare R2 Setup

**Files:**
- `src/storage/provider.ts` — storage provider interface
- `src/storage/r2.ts` — R2 implementation via S3-compatible API
- `src/storage/local.ts` — local filesystem for dev

**Architecture:**
- R2 accessed via S3-compatible API (aws-sdk v3 `@aws-sdk/client-s3`)
- Bucket: `fluentpath-content`
- Public access via custom domain or R2 public URL
- Presigned URLs for upload from CLI/pipeline scripts
- Immutable files with one-year cache headers (spec §4b)

**Content types stored:**
- Audio files (TTS-generated listening items)
- Reading passages (versioned text/JSON)
- Images (if any future visual items)

**Versioning:** Path includes version hash — `audio/{itemId}/{version}.mp3`. No cache invalidation needed (spec §4b).

---

## 10. Paddle Payment Integration

**Files:**
- `src/app/api/webhooks/paddle/route.ts` — webhook handler
- `src/app/(marketing)/pricing/page.tsx` — pricing page
- `src/lib/paddle.ts` — Paddle client + types
- `src/middleware.ts` — plan check on protected routes (extends geo-block middleware)

**Architecture:**
- Paddle JS overlay for checkout (no hosted checkout redirect)
- Webhook handler for subscription events: `subscription.created`, `subscription.updated`, `subscription.canceled`, `subscription.past_due`
- Learner record gets `planId` and `planExpiresAt` fields
- Middleware checks plan status on protected routes, redirects to pricing if expired

**Tiers (from spec):**

| Tier | Monthly | Other |
|---|---|---|
| Learner (A1–C2 ladder) | $19 | $149/year |
| Exam (IELTS/PTE) | $49 | $119 / 3-month pass |
| Complete (both) | $55 | — |
| OET | $79 | $199 / 3-month pass |

**Free tier access:** Placement test + one full mock with band score (no diagnosis) + limited daily practice. Enforced by plan check middleware — no feature flags, just route-level checks.

**Built against Paddle sandbox** — prod keys wired after registration.

**DB schema additions:**
- `subscriptions` table: paddleSubscriptionId, planId, status, currentPeriodEnd, learnerId
- `learners` table: add `subscriptionId` nullable FK

---

## 11. Deploy

### Turso Production DB

- Create production database on Turso dashboard
- Run `drizzle-kit migrate` against prod URL
- Run seed script post-migration

### Vercel

- `vercel.json`: region `sin1` (Singapore), as specified
- Environment variables checklist:
  - `DATABASE_URL` — Turso prod URL
  - `DATABASE_AUTH_TOKEN` — Turso auth token
  - `BETTER_AUTH_SECRET` — random 32-byte hex
  - `BETTER_AUTH_URL` — production domain
  - `ELEVENLABS_API_KEY` — from existing projects
  - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` — Cloudflare
  - `R2_BUCKET_NAME` — `fluentpath-content`
  - `PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET` — when registered
  - `SENTRY_DSN` — when configured

### Domain

Not decided yet — `fluentpath.com` availability TBD.

---

## Batch Execution Order

```
Batch 1 (parallel, pure code):
  ├── PTE Academic exam definition
  ├── OET exam definition
  ├── IELTS General Training exam definition
  ├── Type system extensions (OverallRule, GradeConversion, scoreScale)
  ├── EU + sanctions geo-blocking middleware
  ├── Privacy/terms/cookies pages
  ├── Production polish (error boundary, mobile, a11y, landing update)
  └── Content seeding expansion (300+ items)

Batch 2 (needs existing API keys):
  ├── ElevenLabs TTS integration
  └── Cloudflare R2 setup

Batch 3 (needs Paddle registration):
  └── Paddle payment integration

Deploy (after batches 1-2 minimum):
  ├── Turso production DB
  ├── Vercel deployment
  └── Domain setup
```

Batch 1 items are independent and can be built in parallel. Batch 2 depends on having API keys but not on batch 1. Batch 3 can be stubbed in batch 1 and wired when Paddle is ready. Deploy can happen after batch 1+2 with Paddle in sandbox mode.
