import { sqliteTable, text, real, integer, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'
import { testSessions } from './test-sessions'

/**
 * Completed test results with queryable band scores.
 *
 * Created when a test session transitions to 'completed'. The full
 * PerformanceRecord is stored as JSON for the diagnosis engine,
 * while band scores are extracted into real columns for dashboards
 * and list views.
 *
 * One result per session (UNIQUE on session_id).
 */
export const testResults = sqliteTable(
  'test_results',
  {
    // UUID v4 — not the session ID. A result is a separate entity.
    id: text('id').primaryKey(),

    // Which session produced this result. UNIQUE: one result per session.
    sessionId: text('session_id')
      .notNull()
      .unique()
      .references(() => testSessions.id, { onDelete: 'cascade' }),

    // Denormalized from the session — the most common query is
    // "show me MY results", so this avoids a join through test_sessions.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // e.g. 'ielts_academic'. Denormalized for filtering.
    examId: text('exam_id').notNull(),

    // Overall band score (e.g. 6.5 for IELTS). Real for 0.5 increments.
    overallBand: real('overall_band').notNull(),

    // Per-section band scores as JSON: {"writing": 6.0, "speaking": 7.0}.
    sectionBands: text('section_bands', { mode: 'json' })
      .$type<Record<string, number>>()
      .notNull(),

    // Which sections were included: ["writing", "speaking"].
    sectionsIncluded: text('sections_included', { mode: 'json' })
      .$type<string[]>()
      .notNull(),

    // Which sections were missing: ["listening", "reading"].
    sectionsMissing: text('sections_missing', { mode: 'json' })
      .$type<string[]>()
      .notNull(),

    // Full PerformanceRecord as JSON — the diagnosis engine's input.
    // Stored so diagnosis can be re-run with updated algorithms later.
    performanceRecord: text('performance_record', { mode: 'json' })
      .$type<Record<string, unknown>>()
      .notNull(),

    // Epoch ms — when the test was completed.
    completedAt: integer('completed_at').notNull(),
  },
  (t) => ({
    // "My results" — the primary query.
    learnerIdx: index('test_results_learner_idx').on(t.learnerId),

    // "My results for IELTS Academic".
    examIdx: index('test_results_exam_idx').on(t.examId),

    // "My results, newest first" — composite covers both filter and sort.
    learnerCompletedIdx: index('test_results_learner_completed_idx').on(
      t.learnerId,
      t.completedAt,
    ),
  }),
)
