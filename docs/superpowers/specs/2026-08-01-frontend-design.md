# FluentPath Frontend Design Spec

## Overview

Build the complete frontend for FluentPath — a high-end, sophisticated English learning platform. The backend (17 API routes, Better Auth, Drizzle/Turso) is fully built. This spec covers every user-facing page: auth, dashboard, placement test, practice sessions, mock tests, and diagnosis reports.

## Design Language

**Palette:** Pure black `#000` on white `#fff`. One mid-grey `#888` for secondary text. One light grey `#f5f5f5` for card/section backgrounds. Black buttons with white text. No colour accents anywhere — typography and whitespace carry the design.

**Typography:** Inter (Google Font) for body text. Playfair Display (Google Font, serif) for headings — gives the editorial, higher-learning feel. Font sizes follow a tight scale: 14/16/20/28/40/56px. Line height 1.5 for body, 1.2 for headings.

**Spacing:** 8px base unit. Generous vertical rhythm — sections breathe. Max content width 720px for reading-heavy pages (diagnosis, results), 480px for forms (auth), full-width with padding for session flows.

**Components:** shadcn/ui primitives (Button, Card, Dialog, Progress, Input, Label) with a monochrome theme override. All components are accessible by default (keyboard nav, focus rings, ARIA).

**Tone:** Clean, minimal, confident. No decorative elements, no illustrations, no gradients. The sophistication comes from restraint.

## Stack

- Next.js 16 App Router
- Tailwind CSS 4
- shadcn/ui (monochrome theme override)
- `next/font/google` — Inter + Playfair Display
- `better-auth/react` client (`authClient` from `src/lib/auth-client.ts`)
- TypeScript (strict)

## Page Map

| Route | Purpose | Auth | Layout |
|-------|---------|------|--------|
| `/` | Landing — hero, value prop, CTA | Public | Standalone |
| `/sign-up` | Email/password + Google OAuth + DOB | Public | AuthLayout |
| `/sign-in` | Email/password + Google OAuth | Public | AuthLayout |
| `/dashboard` | Learner home — level, progress, quick actions | Protected | AppLayout |
| `/placement` | Adaptive placement test (one Q per screen) | Protected | SessionLayout |
| `/placement/result` | Level result after placement completes | Protected | AppLayout |
| `/practice` | Practice session (item sequence) | Protected | SessionLayout |
| `/mock-test` | Exam selector | Protected | AppLayout |
| `/mock-test/[id]` | Active test (one Q per screen, timer) | Protected | SessionLayout |
| `/mock-test/[id]/result` | Band scores after completion | Protected | AppLayout |
| `/diagnosis/[id]` | Gap analysis — skill gaps, root causes, study plan | Protected | AppLayout |

## Layouts

### Root Layout (`src/app/layout.tsx`)

- Loads Inter + Playfair Display via `next/font/google`
- Sets `<html lang="en">`, metadata (title, description)
- Wraps children in a minimal body with `antialiased` class
- No global nav — each sub-layout handles its own chrome

### AuthLayout (`src/app/(auth)/layout.tsx`)

- Route group for `/sign-up` and `/sign-in`
- Centered vertically and horizontally
- Max-width 480px card with subtle border
- Logo/wordmark at top
- No navigation bar

### AppLayout (`src/app/(app)/layout.tsx`)

- Route group for `/dashboard`, `/placement/result`, `/mock-test`, `/mock-test/[id]/result`, `/diagnosis/[id]`
- Top nav bar: "FluentPath" wordmark (Playfair Display, black) left, user menu (name + sign-out) right
- Content area: centered, max-width varies by page (720px default)
- Protected: checks session via `authClient.useSession()`, redirects to `/sign-in` if unauthenticated

### SessionLayout (`src/app/(session)/layout.tsx`)

- Route group for `/placement`, `/practice`, `/mock-test/[id]`
- Full-screen, distraction-free — no nav bar
- Thin progress bar at very top of viewport
- "Quit" link in top-right corner (subtle, grey)
- Protected: same auth check as AppLayout

## Page Designs

### Landing Page (`/`)

Hero section: large Playfair Display heading ("Master English. Precisely."), one-line subtitle in Inter, two CTAs — "Get Started" (black button → `/sign-up`) and "Sign In" (text link → `/sign-in`).

Below the fold: three feature cards in a row — "Adaptive Placement" (find your level in minutes), "Targeted Practice" (exercises matched to your gaps), "IELTS Mock Tests" (full-length timed exams with band scores). Each card: icon-free, just a bold title and one sentence.

Footer: minimal — copyright line only.

### Sign-Up (`/sign-up`)

Inside AuthLayout card:

1. "Create your account" heading (Playfair Display)
2. Google OAuth button — full-width, black, "Continue with Google"
3. Horizontal divider with "or" text
4. Form fields (shadcn Input + Label):
   - Name (text)
   - Email (email)
   - Password (password, min 8 chars client-side)
   - Date of birth (date input — server enforces 18+ via Better Auth hook)
5. "Create Account" submit button — full-width, black
6. Toggle link: "Already have an account? Sign in" → `/sign-in`

API: `authClient.signUp.email({ name, email, password, dateOfBirth })` or `authClient.signIn.social({ provider: 'google' })`. On success → redirect to `/dashboard`.

Error states: inline field validation, server error displayed as a banner above the form.

### Sign-In (`/sign-in`)

Same AuthLayout card:

1. "Welcome back" heading
2. Google OAuth button
3. Divider
4. Email + Password fields
5. "Sign In" button
6. Toggle link: "Don't have an account? Sign up" → `/sign-up`

API: `authClient.signIn.email({ email, password })`. On success → `/dashboard`.

### Dashboard (`/dashboard`)

Three states based on learner progress:

**State 1 — New user (no placement result):**
Full-width card with Playfair heading "Find Your Level", subtitle "Take a 5-minute adaptive test to discover your CEFR level", CTA button "Start Placement" → `/placement`.

**State 2 — Has level, minimal activity:**
- Level badge (large): shows CEFR level (e.g. "B1") in a bold black circle with label "Your Level"
- Two action cards side by side:
  - "Practice" — "Work on your weak areas" → `/practice`
  - "Mock Test" — "Take a full IELTS exam" → `/mock-test`

**State 3 — Active user:**
- Level badge (same as state 2)
- Recent activity section: last 3-5 practice sessions with dates and scores
- Diagnosis summaries: if any exist, show gap count and top root cause
- Same action cards

API calls on mount:
- `GET /api/placement/active` — check for in-progress placement (if active, show "Resume Placement" instead)
- `GET /api/practice/sessions` — recent sessions
- `GET /api/diagnosis` — past diagnoses

### Placement Flow (`/placement`)

Full-screen via SessionLayout. No nav bar.

**Start screen:** Brief intro — "We'll ask you up to 20 questions to find your level. There's no time limit." + "Begin" button. Calls `POST /api/placement/start { startLevel: 'B1' }`.

**Question screen (one per screen):**
- Progress bar at top (items answered / max items)
- CEFR level indicator (small, top-left): shows current level being tested
- Stem text: large, centered, Playfair Display. The blank shown as a long underscore.
- Four options: tall rectangular cards, stacked vertically, full-width (max 480px centered). Black border, white fill. On hover: black fill, white text. On select: black fill, white text, holds for 400ms showing correct/incorrect (green check or red X icon — the only colour in the app, used sparingly for feedback), then auto-advances.
- Keyboard support: 1/2/3/4 keys select options, Enter confirms

API per question: `POST /api/placement/answer { placementId, itemId, selectedIndex }`. Response tells whether to show next item or placement is finished.

**Completion:** When API returns `finished: true`, redirect to `/placement/result`.

### Placement Result (`/placement/result`)

Inside AppLayout.

- Large centered level display: CEFR level (e.g. "B1") in 56px Playfair Display, with label "Your Estimated Level"
- Confidence indicator: text like "Based on 15 questions"
- Per-skill breakdown if available: small horizontal bars or text list showing relative strength across skills
- CTA: "Start Practising" → `/practice`
- Secondary link: "Take a Mock Test" → `/mock-test`

Data comes from the placement result stored after the last answer.

### Practice Session (`/practice`)

Full-screen via SessionLayout.

**Assembly:** On mount, calls `POST /api/practice/assemble { level }` (uses learner's current level — the backend selects nodes from the learner's weak areas automatically) to get items, then `POST /api/practice/sessions` to create the session. If arriving from a diagnosis CTA, pass `nodeIds` from the diagnosis gaps to target specific weaknesses.

**Question flow:** Same McqCard component as placement. One question per screen, progress bar at top. Immediate feedback on answer — correct (brief green flash) or incorrect (red flash + shows the misconception text from the item as a one-line explanation below the options for 2 seconds).

**Progress update:** After each answer, `PATCH /api/practice/sessions/[id] { progress: currentIndex }`.

**Completion:** After last item, `POST /api/practice/sessions/[id]/complete`. Show summary screen: total correct / total, time taken, "Back to Dashboard" button.

**Quit:** "Quit" link calls `POST /api/practice/sessions/[id]/abandon`, redirects to `/dashboard`.

### Mock Test — Exam Selector (`/mock-test`)

Inside AppLayout.

Lists exams from `GET /api/mock-test/exams`. Each exam as a card:

- Exam name (e.g. "IELTS Academic") in Playfair Display
- Section list: each section with name, skill tag, duration, slot count
- Total duration
- "Start Test" button

On click: `POST /api/mock-test/sessions { examId }` → redirect to `/mock-test/[sessionId]`.

### Mock Test — Active Session (`/mock-test/[id]`)

Full-screen via SessionLayout.

**Top bar:**
- Section name (e.g. "Reading") — left
- Question progress (e.g. "3 / 40") — center
- Countdown timer — right. Black text, turns to bold when under 5 minutes. When time expires, section auto-completes.

**Question area:** Same McqCard layout but NO feedback (answer keys are stripped by the API — the learner doesn't know if they're right or wrong during the test). On selection, option highlights black and a "Next" button appears (or auto-advance after 300ms).

**Section transitions:** When all items in a section are answered, show an interstitial: "Section Complete. Next: Writing (60 minutes)." + "Continue" button. Calls session transition API.

**Completion:** After all sections, `POST /api/mock-test/sessions/[id]/complete` → redirect to `/mock-test/[id]/result`.

**Abandon:** "Quit" link → confirmation dialog ("Are you sure? Your progress will be lost.") → `POST /api/mock-test/sessions/[id]/abandon` → `/dashboard`.

### Mock Test — Result (`/mock-test/[id]/result`)

Inside AppLayout.

- Overall band score: large 56px number (e.g. "6.5") centered, with "Overall Band" label
- Per-section bands: four scores in a row — Listening, Reading, Writing, Speaking — each in a bordered card
- "Get Diagnosis" CTA → calls `POST /api/diagnosis { testResultId }` → redirect to `/diagnosis/[id]`
- "Back to Dashboard" secondary link

### Diagnosis Report (`/diagnosis/[id]`)

Inside AppLayout. Editorial layout — the "medical report for English skills."

**Header:** "Diagnosis Report" (Playfair Display), gap count badge (e.g. "7 skill gaps identified"), top root cause tag.

**Skill Gaps List:** Each gap as a row/card:
- Node title (e.g. "Present Perfect Continuous")
- CEFR level tag (e.g. "B1")
- Root cause tag: "knowledge" / "processing" / "L1 interference" — styled as small black pills
- Accuracy: percentage with a thin horizontal bar

Gaps sorted by severity (lowest accuracy first).

**Action Plan:**
- Total estimated study time (e.g. "3 hours 20 minutes")
- Prioritised list of focus areas

**Band Impact:** If available, show projected band improvements.

**CTA:** "Practice Weak Areas" → starts a practice session targeting the diagnosed gaps.

Data: `GET /api/diagnosis/[id]`.

## Shared Components

| Component | File | Description |
|-----------|------|-------------|
| `McqCard` | `src/components/mcq-card.tsx` | Stem + 4 option cards + optional feedback. Props: `stem`, `options`, `onSelect`, `showFeedback`, `correctIndex?` |
| `ProgressBar` | `src/components/progress-bar.tsx` | Thin black bar, props: `current`, `total` |
| `LevelBadge` | `src/components/level-badge.tsx` | CEFR level in a bold black circle. Props: `level`, `size` |
| `Timer` | `src/components/timer.tsx` | Countdown display. Props: `durationMs`, `onExpire`, `warnAtMs` |
| `AuthGuard` | `src/components/auth-guard.tsx` | Client component wrapping protected routes. Uses `authClient.useSession()`, redirects to `/sign-in` if no session |

## Auth Flow

- `authClient` from `src/lib/auth-client.ts` handles all client-side auth
- Protected layouts wrap children in `AuthGuard`
- `AuthGuard` calls `authClient.useSession()` — if loading, show skeleton; if no session, redirect to `/sign-in`
- Sign-out: `authClient.signOut()` → redirect to `/`
- The Better Auth server hook auto-creates a `learner` row on signup, so the dashboard API calls work immediately after first sign-in

## Route Protection

All routes under `(app)` and `(session)` route groups are protected via `AuthGuard` in their respective layouts. Public routes (`/`, `/sign-up`, `/sign-in`) have no auth check.

## Error Handling

- API errors: toast notification (shadcn Sonner/Toast) for transient errors, inline messages for validation errors
- 401 from any API call: redirect to `/sign-in`
- 404: show a simple "Not Found" page
- Network errors: retry button in the UI

## Non-Goals (Excluded from this spec)

- Admin panel
- User profile/settings page
- Writing/speaking input UI (mock test writing and speaking sections show placeholder text: "Writing and speaking sections coming soon")
- Mobile app
- Internationalisation
- Dark mode (monochrome design works in light mode only)
- Social features, leaderboards, streaks
