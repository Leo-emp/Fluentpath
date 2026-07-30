# Database Layer Design

## Purpose

Persistence layer for FluentPath's learner-facing features. Adds the tables needed to store learner accounts, mock test sessions, test results, diagnosis reports, and placement outcomes — enabling all UI and monetisation work.

## Context

The core engine (R1a–R1f) is built as pure functions consuming and producing TypeScript interfaces. Nothing persists yet. This layer bridges those pure functions to Turso (libSQL) via the existing Drizzle ORM setup.

### What already exists

| Table | Purpose |
|-------|---------|
| `skill_nodes` | Skill graph nodes (grammar, cando, lexical, phono, strategy) |
| `skill_edges` | Prerequisite relationships between nodes |
| `learner_mastery` | Per-learner, per-node mastery state |
| `provenance` | Where content came from, under what licence |
| `lessons` / `lesson_versions` | Lesson identity + immutable versions |
| `items` / `item_versions` | Item identity + immutable versions |
| `item_statistics` | Live performance stats per item version |
| `lesson_nodes` / `item_nodes` | Which skill nodes lessons/items target |

Infrastructure: `src/db/client.ts` (Drizzle client), `src/db/sql-helpers.ts` (upsert helper), `drizzle.config.ts` (Turso config).

## Architecture decisions

### 1. JSON for state, columns for queries

In-flight session state is stored as a single JSON column. The existing reducer pattern (`transition(session, action, now) → nextSession`) produces a fully serializable `TestSession` object — storing it as JSON means one read to resume, one write per action. No joins, no multi-table assembly.

Queryable data (band scores, levels, gap counts) gets extracted into real columns when a session completes. This gives us the best of both: instant resume during tests, efficient queries for dashboards and lists.

### 2. Separate learners table from NextAuth

NextAuth (chosen for auth) manages its own `users`, `accounts`, `sessions`, and `verification_tokens` tables via its Drizzle adapter. Those tables own auth concerns.

The `learners` table owns FluentPath-specific state: current level, subscription tier, Paddle IDs, L1. Linked by email. This separation means switching auth providers later doesn't touch our data, and NextAuth schema changes don't affect our queries.

### 3. Paddle for payments

The spec recommends Paddle as merchant-of-record for consumer payments across jurisdictions (India, Philippines, Bangladesh, Nigeria — the target markets). Paddle handles global VAT/GST/sales tax.

R0 has one product and one subscription per learner, so subscription state lives directly on the `learners` table. A separate subscriptions table is deferred until multiple products exist.

### 4. Denormalized learnerId

`test_results` and `diagnoses` carry `learnerId` directly rather than requiring a join through `test_sessions`. The most common query — "show me my results" — should be a single indexed lookup.

### 5. Diagnosis is immutable

A diagnosis for a given test result never changes. The full `Diagnosis` object is stored as JSON. Extracted columns (`gapCount`, `topRootCause`, `totalStudyMinutes`) exist for list/summary views without parsing the JSON blob.

## Schema: new tables

### `learners`

FluentPath-specific learner profile, linked to NextAuth via email.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | TEXT | PK | nanoid |
| `email` | TEXT | UNIQUE, NOT NULL | Links to NextAuth user |
| `name` | TEXT | | Display name |
| `l1` | TEXT | | First language code (ISO 639-1) for L1-aware feedback |
| `current_level` | TEXT | | Latest CEFR level from placement |
| `tier` | TEXT | NOT NULL, DEFAULT 'free' | `free` / `exam` / `complete` |
| `paddle_customer_id` | TEXT | | Null until first payment |
| `paddle_subscription_id` | TEXT | | Active subscription ID |
| `subscription_status` | TEXT | NOT NULL, DEFAULT 'none' | `none` / `active` / `past_due` / `cancelled` |
| `created_at` | INTEGER | NOT NULL | Epoch ms |
| `updated_at` | INTEGER | NOT NULL | Epoch ms |

Indexes: `email` (unique), `tier`.

### `test_sessions`

In-flight and completed mock test sessions. The `state` column holds the full serializable `TestSession` object.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | TEXT | PK | Same as TestSession.id |
| `learner_id` | TEXT | FK → learners, NOT NULL | |
| `exam_id` | TEXT | NOT NULL | e.g. `ielts_academic` |
| `status` | TEXT | NOT NULL | `in_progress` / `completed` / `abandoned` |
| `state` | TEXT (JSON) | NOT NULL | Full TestSession object |
| `started_at` | INTEGER | NOT NULL | Epoch ms |
| `completed_at` | INTEGER | | Null until done |
| `updated_at` | INTEGER | NOT NULL | Written on every action |

Indexes: `learner_id`, `status`, composite `(learner_id, status)` for "my active session" query.

### `test_results`

Completed test results with queryable band scores. Created when a test session completes.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | TEXT | PK | nanoid |
| `session_id` | TEXT | FK → test_sessions, UNIQUE | One result per session |
| `learner_id` | TEXT | FK → learners, NOT NULL | Denormalized |
| `exam_id` | TEXT | NOT NULL | |
| `overall_band` | REAL | NOT NULL | |
| `section_bands` | TEXT (JSON) | NOT NULL | `{"writing": 6.0, ...}` |
| `sections_included` | TEXT (JSON) | NOT NULL | `["writing", "speaking"]` |
| `sections_missing` | TEXT (JSON) | NOT NULL | `["listening", "reading"]` |
| `performance_record` | TEXT (JSON) | NOT NULL | Full PerformanceRecord |
| `completed_at` | INTEGER | NOT NULL | Epoch ms |

Indexes: `learner_id`, `exam_id`, composite `(learner_id, completed_at)` for "my results, newest first".

### `diagnoses`

Paid diagnosis reports — the feature people pay for.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | TEXT | PK | nanoid |
| `test_result_id` | TEXT | FK → test_results, UNIQUE | One diagnosis per result |
| `learner_id` | TEXT | FK → learners, NOT NULL | Denormalized |
| `gap_count` | INTEGER | NOT NULL | Quick display stat |
| `top_root_cause` | TEXT | | Most common root cause |
| `total_study_minutes` | INTEGER | NOT NULL | From action plan |
| `diagnosis` | TEXT (JSON) | NOT NULL | Full Diagnosis object |
| `created_at` | INTEGER | NOT NULL | Epoch ms |

Indexes: `learner_id`, `test_result_id` (unique).

### `placement_results`

Placement test outcomes. Supports both in-progress (resumable) and completed states.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | TEXT | PK | nanoid |
| `learner_id` | TEXT | FK → learners, NOT NULL | |
| `estimated_level` | TEXT | | Null while in progress |
| `level_results` | TEXT (JSON) | | Per-level breakdown |
| `items_used` | INTEGER | NOT NULL, DEFAULT 0 | |
| `state` | TEXT (JSON) | NOT NULL | Full PlacementState for resume |
| `status` | TEXT | NOT NULL | `in_progress` / `completed` |
| `started_at` | INTEGER | NOT NULL | Epoch ms |
| `completed_at` | INTEGER | | Null until done |

Indexes: `learner_id`, composite `(learner_id, status)` for "my active placement".

## What is NOT in scope

- **NextAuth tables** — auto-generated by NextAuth's Drizzle adapter when auth is set up. Separate concern.
- **Practice session tables** — R2 scope (lesson sequencer + adaptive practice loop).
- **Analytics / event tracking** — separate analytical store, spec acknowledges this.
- **Paddle webhook log** — added when payment integration is wired up.

## Repository layer

Each table gets a thin repository module in `src/db/repositories/` that wraps Drizzle queries. Repositories accept `Db` (the Drizzle instance) as a parameter — no global imports — so they remain testable.

Pattern:
```
src/db/repositories/
├── learners.ts        — create, findByEmail, findById, updateTier
├── test-sessions.ts   — create, findActive, updateState, complete
├── test-results.ts    — create, findByLearner, findById
├── diagnoses.ts       — create, findByLearner, findByTestResult
├── placement.ts       — create, findActive, updateState, complete
```

Each repository converts between Drizzle row types and the pure TypeScript interfaces from the engine layer (e.g. `TestSession`, `Diagnosis`, `PlacementState`).

## Existing table update

`learner_mastery.learner_id` currently has no FK constraint (it was created before the learners table). The schema update adds a FK reference to `learners.id` with `ON DELETE CASCADE`. This is a schema-only change — no data migration, since no mastery rows exist yet.

## Migration strategy

Drizzle Kit generates SQL migrations from schema diffs. The existing `db:generate` and `db:migrate` scripts handle this. New tables are added to `src/db/schema/` and re-exported from `src/db/schema/index.ts`.

No data migration needed — this is greenfield. The tables don't exist yet.
