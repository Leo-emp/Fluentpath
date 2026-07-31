import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'

// Practice session lifecycle — matches test_sessions convention.
export const PRACTICE_SESSION_STATUSES = ['in_progress', 'completed', 'abandoned'] as const
export type PracticeSessionStatus = (typeof PRACTICE_SESSION_STATUSES)[number]

// Practice sessions — the "continue" button's state.
//
// Unlike test_sessions which store a full state machine, practice sessions
// store the session plan (the items chosen by the sequencer) and a progress
// counter (how many the learner has completed). The client works through
// the plan locally; this table enables resume on tab close/reopen.
export const practiceSessions = sqliteTable(
  'practice_sessions',
  {
    id: text('id').primaryKey(),

    // Which learner owns this session.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // Lifecycle status.
    status: text('status').notNull(),

    // The full SessionPlan as JSON — items, nodeIds, estimatedMinutes.
    plan: text('plan', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),

    // How many items the learner has completed (0-based). Updated
    // periodically by the client for resume support.
    progress: integer('progress').notNull().default(0),

    startedAt: integer('started_at').notNull(),
    completedAt: integer('completed_at'),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    // "My active practice session" — the resume query on app load.
    learnerStatusIdx: index('practice_sessions_learner_status_idx').on(
      t.learnerId,
      t.status,
    ),
  }),
)
