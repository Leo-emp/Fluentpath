import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'

// Placement test lifecycle states.
// 'in_progress' = adaptive algorithm is still running.
// 'completed'   = level has been determined.
export const PLACEMENT_STATUSES = ['in_progress', 'completed'] as const
export type PlacementStatusDb = (typeof PLACEMENT_STATUSES)[number]

/**
 * Placement test outcomes — both in-progress (resumable) and completed.
 *
 * The placement test is adaptive: it moves up and down CEFR levels based
 * on the learner's responses. The full PlacementState is stored as JSON
 * for instant resume. On completion, the estimated level is extracted
 * into a real column.
 *
 * A learner can have multiple placement results over time (retesting),
 * but only one can be 'in_progress' at a time (enforced in the repository).
 */
export const placementResults = sqliteTable(
  'placement_results',
  {
    // UUID v4 for the placement record.
    id: text('id').primaryKey(),

    // Which learner is being placed.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // The determined CEFR level — null while in_progress.
    estimatedLevel: text('estimated_level'),

    // Per-level breakdown as JSON: {"A1": {"correct": 4, "total": 5}, ...}.
    levelResults: text('level_results', { mode: 'json' })
      .$type<Record<string, { correct: number; total: number }> | null>(),

    // How many items have been answered so far.
    itemsUsed: integer('items_used').notNull().default(0),

    // Full PlacementState object as JSON for instant resume.
    state: text('state', { mode: 'json' })
      .$type<Record<string, unknown>>()
      .notNull(),

    // 'in_progress' or 'completed'.
    status: text('status').notNull(),

    // Epoch ms — when the placement test started.
    startedAt: integer('started_at').notNull(),

    // Epoch ms — null until the test completes.
    completedAt: integer('completed_at'),
  },
  (t) => ({
    // "My placement results".
    learnerIdx: index('placement_results_learner_idx').on(t.learnerId),

    // "My active placement" — composite for single lookup.
    learnerStatusIdx: index('placement_results_learner_status_idx').on(
      t.learnerId,
      t.status,
    ),
  }),
)
