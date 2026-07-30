import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'
import { testResults } from './test-results'

/**
 * Diagnosis reports — the feature people pay for.
 *
 * A diagnosis is immutable: once created for a test result, it never changes.
 * The full Diagnosis object (outcomes, weak nodes, gaps, action plan, band
 * impacts) is stored as JSON. Extracted columns (gapCount, topRootCause,
 * totalStudyMinutes) exist for list/summary views without parsing JSON.
 *
 * One diagnosis per test result (UNIQUE on test_result_id).
 */
export const diagnoses = sqliteTable(
  'diagnoses',
  {
    // UUID v4 for the diagnosis record.
    id: text('id').primaryKey(),

    // Which test result this diagnosis analyses. UNIQUE: one diagnosis per result.
    testResultId: text('test_result_id')
      .notNull()
      .unique()
      .references(() => testResults.id, { onDelete: 'cascade' }),

    // Denormalized — "show me MY diagnoses" avoids a join through test_results.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // Quick display stat: how many gaps the diagnosis found.
    gapCount: integer('gap_count').notNull(),

    // Most common root cause across all gaps: 'knowledge', 'processing',
    // 'strategy', or 'production'. Null if zero gaps.
    topRootCause: text('top_root_cause'),

    // Total estimated study minutes from the action plan.
    totalStudyMinutes: integer('total_study_minutes').notNull(),

    // The full Diagnosis object as JSON — everything the UI needs.
    diagnosis: text('diagnosis', { mode: 'json' })
      .$type<Record<string, unknown>>()
      .notNull(),

    // Epoch ms — when this diagnosis was created.
    createdAt: integer('created_at').notNull(),
  },
  (t) => ({
    // "My diagnoses" — primary query.
    learnerIdx: index('diagnoses_learner_idx').on(t.learnerId),
  }),
)
