# FluentPath Production Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take FluentPath from code-complete R1 to deployable, payable, legally compliant production.

**Architecture:** Extend existing mock-test engine types for PTE/OET scoring, add geo-blocking middleware, legal pages, Paddle webhooks, TTS/R2 storage providers, and polish the frontend. All new exam definitions are pure data files following the IELTS Academic pattern.

**Tech Stack:** Next.js 16, TypeScript 7, Turso + Drizzle, Better Auth, Vitest, Tailwind 4, shadcn/ui

## Global Constraints

- All `.tsx` files are client components (`'use client'`) unless noted
- Monochrome palette: `#000` / `#fff` / `#888` / `#f5f5f5`. Green `#22c55e` / red `#ef4444` only for correct/incorrect
- Path alias: `@/*` → `./src/*`
- `noUncheckedIndexedAccess: true`
- API routes: `getDb()` + `getAuthenticatedLearner()` + `jsonOk`/`jsonError`
- Tests: Vitest with `makeTestDb()` from `tests/helpers/test-db.ts`
- Every MCQ distractor maps to a named misconception
- Comments throughout code for learning (user preference)

---

### Task 1: Extend Type System for PTE/OET Scoring

**Files:**
- Modify: `src/mock-test/types.ts`
- Modify: `src/mock-test/convert.ts`
- Modify: `tests/mock-test/convert.test.ts`

**Interfaces:**
- Produces: `OverallRule` union with `'mean_round_half' | 'mean_round_int' | 'none'`
- Produces: `GradeConversionTable` type (numerical → letter grade)
- Produces: `ScoreScale` type `'band_0_9' | 'score_10_90' | 'grade_a_e'`
- Produces: `computeOverallScore()` updated to handle all 3 rules
- Produces: `convertScoreToGrade()` function

- [ ] **Step 1:** Add `GradeConversionTable` and `ScoreScale` types to `types.ts`. Extend `OverallRule` to include `'mean_round_int'` (PTE) and `'none'` (OET). Add `scoreScale` field to `ScoringRule`. Add `gradeConversions` to `ScoringRule` alongside `sectionConversions`.

- [ ] **Step 2:** Write tests for `convertScoreToGrade()` — PTE 10-90 rounding and OET grade lookup (A=450-500, B=350-440, C+=300-340, C=200-290, D=100-190, E=0-90).

- [ ] **Step 3:** Write tests for `computeOverallBand()` with `'mean_round_int'` rule (PTE: mean of 4 scores, round to integer) and `'none'` rule (OET: returns 0, no overall).

- [ ] **Step 4:** Implement `convertScoreToGrade()` in `convert.ts`.

- [ ] **Step 5:** Update `computeOverallBand()` switch to handle `'mean_round_int'` and `'none'`.

- [ ] **Step 6:** Run all tests: `npx vitest run tests/mock-test/`

- [ ] **Step 7:** Commit: `feat: extend scoring types for PTE (10-90) and OET (A-E grades)`

---

### Task 2: PTE Academic Exam Definition

**Files:**
- Create: `src/mock-test/exams/pte-academic.ts`
- Create: `tests/mock-test/exams/pte-academic.test.ts`

**Interfaces:**
- Consumes: `ExamDefinition`, `ExamSection`, `SectionSlot` from `@/mock-test/types`
- Produces: `PTE_ACADEMIC` exported const

- [ ] **Step 1:** Write test file following `ielts-academic.test.ts` pattern — verify 3 sections (Speaking & Writing combined, Reading, Listening), durations (57min, 30min, 43min = 130 total), slot counts, `'mean_round_int'` overall rule, `'score_10_90'` scale.

- [ ] **Step 2:** Run test to verify it fails.

- [ ] **Step 3:** Create `pte-academic.ts` with the `PTE_ACADEMIC` definition. Speaking & Writing combined section has mixed slots: Read Aloud (speaking), Repeat Sentence (speaking), Describe Image (speaking), Re-tell Lecture (speaking), Answer Short Question (speaking), Summarize Written Text (writing), Write Essay (writing). Reading section: MCQ, Re-order Paragraphs, Fill in Blanks. Listening section: Summarize Spoken Text, MCQ, Fill in Blanks, Highlight Correct Summary, Select Missing Word, Write from Dictation.

- [ ] **Step 4:** Run tests. Commit: `feat: add PTE Academic exam definition`

---

### Task 3: OET Exam Definition

**Files:**
- Create: `src/mock-test/exams/oet.ts`
- Create: `tests/mock-test/exams/oet.test.ts`

**Interfaces:**
- Consumes: `ExamDefinition`, `GradeConversionTable` from `@/mock-test/types`
- Produces: `OET` exported const

- [ ] **Step 1:** Write test — verify 4 sub-tests (Listening 50min, Reading 60min, Writing 45min, Speaking 20min = 175 total), `'none'` overall rule, `'grade_a_e'` scale, grade conversion table (A=450+, B=350+, C+=300+, C=200+, D=100+, E=0+).

- [ ] **Step 2:** Create `oet.ts`. Listening: Part A (consultation extracts, 5 items) + Part B (presentations, 6 items). Reading: Part A (expeditious reading, 20 items) + Part B (detailed reading, 6 items) + Part C (careful reading, 8 items). Writing: referral/discharge letter. Speaking: 2 role-plays with 5min each + 2min prep.

- [ ] **Step 3:** Run tests. Commit: `feat: add OET exam definition`

---

### Task 4: IELTS General Training Exam Definition

**Files:**
- Create: `src/mock-test/exams/ielts-general.ts`
- Create: `tests/mock-test/exams/ielts-general.test.ts`

**Interfaces:**
- Produces: `IELTS_GENERAL` exported const

- [ ] **Step 1:** Write test — verify same 4-section structure as Academic, different Reading conversion table (more lenient: 30 raw = 6 vs Academic's 30 = 7), Writing Task 1 is a letter (taskRef `ielts_gt.task1.letter.1`).

- [ ] **Step 2:** Create `ielts-general.ts`. Identical to Academic except: Reading uses GT conversion table, Reading passages are workplace/survival (nodeIds reference different can-do nodes), Writing Task 1 is a letter.

- [ ] **Step 3:** Run tests. Commit: `feat: add IELTS General Training exam definition`

---

### Task 5: Central Exam Registry + API Route Update

**Files:**
- Create: `src/mock-test/exams/registry.ts`
- Modify: `src/mock-test/exams/ielts-academic.ts` (remove registry functions)
- Modify: `src/app/api/mock-test/exams/route.ts` (import from registry)
- Modify: `tests/mock-test/exams/ielts-academic.test.ts` (update imports)

**Interfaces:**
- Produces: `getExamDefinition(id)`, `listExamDefinitions()` from `@/mock-test/exams/registry`

- [ ] **Step 1:** Create `registry.ts` that imports all 4 exam definitions and re-exports `getExamDefinition` and `listExamDefinitions`.

- [ ] **Step 2:** Remove `getExamDefinition`, `listExamDefinitions`, and `EXAM_REGISTRY` from `ielts-academic.ts`.

- [ ] **Step 3:** Update API route import: `import { listExamDefinitions } from '@/mock-test/exams/registry'`

- [ ] **Step 4:** Update test imports. Add registry test verifying all 4 exams are registered.

- [ ] **Step 5:** Run all tests: `npx vitest run`. Commit: `refactor: centralize exam registry, register PTE/OET/IELTS GT`

---

### Task 6: EU + Sanctions Geo-Blocking

**Files:**
- Create: `src/middleware.ts`
- Create: `src/app/blocked/page.tsx`

- [ ] **Step 1:** Create `src/middleware.ts`. Check `request.headers.get('x-vercel-ip-country')` against `BLOCKED_COUNTRIES` set. EU/EEA: AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO. Sanctions: RU, BY, IR, KP, SY, CU. Redirect to `/blocked`. Matcher: exclude `_next`, `api/webhooks`, static assets.

- [ ] **Step 2:** Create `/blocked` page — static, no auth. Message: "FluentPath is not yet available in your region." Monochrome, centered.

- [ ] **Step 3:** Commit: `feat: add EU/EEA + sanctions geo-blocking middleware`

---

### Task 7: Privacy, Terms, Cookies Pages

**Files:**
- Create: `src/app/(marketing)/layout.tsx`
- Create: `src/app/(marketing)/privacy/page.tsx`
- Create: `src/app/(marketing)/terms/page.tsx`
- Create: `src/app/(marketing)/cookies/page.tsx`

- [ ] **Step 1:** Create `(marketing)` layout — same fonts as root, no auth guard.

- [ ] **Step 2:** Create privacy page based on spec §4e: UK GDPR + India DPDP, data collected (email, DOB, voice recordings for assessment only, learning progress), legal basis, retention policy (audio deleted per schedule, transcripts kept), rights (access, correction, deletion), no EU data subjects, Paddle as data processor, 18+ only. Add "DRAFT — pending legal review" banner.

- [ ] **Step 3:** Create terms page: UK Ltd entity, 18+ requirement, no score guarantees ("estimated band range" only), exam trademark disclaimer, account termination, limitation of liability. Add draft banner.

- [ ] **Step 4:** Create cookies page: functional cookies only at launch (auth session), no analytics cookies yet, no third-party cookies. Add draft banner.

- [ ] **Step 5:** Commit: `feat: add privacy, terms, and cookies pages (draft templates)`

---

### Task 8: Landing + Dashboard + Footer Updates

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/(app)/dashboard/page.tsx`
- Create: `src/components/footer.tsx`

- [ ] **Step 1:** Update landing page hero subtitle: "Adaptive placement, targeted practice, and full IELTS, PTE & OET mock tests — all in one platform." Update feature cards to include PTE and OET. Add exam disclaimer to footer.

- [ ] **Step 2:** Create `Footer` component with links to /privacy, /terms, /cookies, disclaimer text, copyright. Use in landing page and `(marketing)` layout.

- [ ] **Step 3:** Update dashboard: "Take a full IELTS exam" → "Take a full mock exam".

- [ ] **Step 4:** Commit: `feat: update landing page for PTE/OET, add footer with legal links`

---

### Task 9: Error Boundary + Accessibility

**Files:**
- Create: `src/components/error-boundary.tsx`
- Modify: `src/app/(app)/layout.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/nav-bar.tsx`

- [ ] **Step 1:** Create `ErrorBoundary` class component (React error boundaries require class components). "Something went wrong" card with retry button.

- [ ] **Step 2:** Wrap `(app)` layout children with `ErrorBoundary`.

- [ ] **Step 3:** Add skip-to-content link in root layout. Add `aria-label` to NavBar links. Ensure focus rings via Tailwind `focus-visible:ring-2`.

- [ ] **Step 4:** Add `<title>` meta per route using Next.js `metadata` exports.

- [ ] **Step 5:** Commit: `feat: add error boundary, skip-to-content, aria labels`

---

### Task 10: Content Seeding Expansion

**Files:**
- Modify: `src/seed/seed-content.ts`
- Modify: `src/seed/seed-data.ts`

- [ ] **Step 1:** Add C2 nodes to `seed-data.ts`: `gram.c1.inversion`, `gram.c1.cleft_sentences`, `gram.c2.subjunctive`, `lex.c1.academic_vocabulary`, `lex.c2.idiomatic_language`, `cando.c2.understand_virtually_everything` (listening), `cando.c2.read_any_text` (reading), `cando.c2.write_complex_reports` (writing), `cando.c2.discuss_any_topic` (speaking). Add edges.

- [ ] **Step 2:** Expand `seed-content.ts` to 300+ items. Distribution: A1=30, A2=40, B1=60, B2=80, C1=60, C2=30. Each item targets specific nodes. Every distractor has a named misconception. Cover grammar, vocabulary, reading comprehension, and listening comprehension item types.

- [ ] **Step 3:** Run seed test: `npx vitest run tests/seed/`

- [ ] **Step 4:** Commit: `feat: expand seed content to 300+ items across A1-C2`

---

### Task 11: Storage Provider + Cloudflare R2

**Files:**
- Create: `src/storage/types.ts`
- Create: `src/storage/provider.ts`
- Create: `src/storage/r2.ts`
- Create: `src/storage/local.ts`
- Create: `tests/storage/local.test.ts`

**Interfaces:**
- Produces: `StorageProvider` interface with `put(key, data, contentType)`, `getUrl(key)`, `delete(key)`
- Produces: `createR2Provider(config)` and `createLocalProvider(dir)` factories

- [ ] **Step 1:** Define `StorageProvider` interface in `types.ts`. Write tests against local provider.

- [ ] **Step 2:** Implement `local.ts` — filesystem-backed for dev. Implement `r2.ts` — S3-compatible via `@aws-sdk/client-s3` with one-year immutable cache headers.

- [ ] **Step 3:** Create `provider.ts` factory that returns R2 in production (when env vars present) or local in dev.

- [ ] **Step 4:** Run tests. Commit: `feat: add storage provider abstraction with R2 and local backends`

---

### Task 12: ElevenLabs TTS Integration

**Files:**
- Create: `src/tts/types.ts`
- Create: `src/tts/provider.ts`
- Create: `src/tts/elevenlabs.ts`
- Create: `tests/tts/provider.test.ts`

**Interfaces:**
- Consumes: `StorageProvider` from `@/storage/types`
- Produces: `TtsProvider` interface, `createElevenLabsProvider(apiKey, storage)` factory

- [ ] **Step 1:** Define `TtsProvider` interface: `generateSpeech(text, opts) → Promise<TtsResult>` where opts has voiceId, accent, speed. Result has audioUrl, durationMs, format.

- [ ] **Step 2:** Write tests with a mock provider (no real API calls in tests).

- [ ] **Step 3:** Implement `elevenlabs.ts` — POST to ElevenLabs API, store result via StorageProvider, return URL.

- [ ] **Step 4:** Run tests. Commit: `feat: add TTS provider with ElevenLabs implementation`

---

### Task 13: Paddle Payment Integration

**Files:**
- Create: `src/lib/paddle.ts`
- Create: `src/app/api/webhooks/paddle/route.ts`
- Create: `src/app/(marketing)/pricing/page.tsx`
- Modify: `src/middleware.ts` (add plan check)
- Create: `tests/api/webhooks/paddle.test.ts`

- [ ] **Step 1:** Create `paddle.ts` with plan definitions (Learner $19/mo, Exam $49/mo, Complete $55/mo, OET $79/mo), webhook signature verification, and helper types.

- [ ] **Step 2:** Create webhook route handler for `subscription.created`, `subscription.updated`, `subscription.canceled`, `subscription.past_due`. Updates learner's `tier`, `subscriptionStatus`, `paddleSubscriptionId`, `paddleCustomerId`.

- [ ] **Step 3:** Write webhook tests with mocked DB.

- [ ] **Step 4:** Create pricing page — 4-tier card layout, Paddle JS checkout overlay (loaded via script tag), free tier comparison, exam disclaimer.

- [ ] **Step 5:** Extend middleware to check plan status on `/practice`, `/mock-test`, `/diagnosis` routes. Free tier: placement + one mock (no diagnosis) + 10 items/day.

- [ ] **Step 6:** Run tests. Commit: `feat: add Paddle payment integration with webhook handler and pricing page`

---

### Task 14: Vercel Deploy Configuration

**Files:**
- Create: `vercel.json`

- [ ] **Step 1:** Create `vercel.json` with `{ "regions": ["sin1"] }`.

- [ ] **Step 2:** Create env var checklist doc at `docs/deploy-checklist.md`.

- [ ] **Step 3:** Commit: `chore: add Vercel config (sin1 region) and deploy checklist`
