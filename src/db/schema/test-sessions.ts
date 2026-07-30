import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'

// Session lifecycle states matching the TestSession.status type from
// src/mock-test/types.ts, but simplified for DB queries.
// 'in_progress' = learner is working or paused.
// 'completed'   = all sections finished.
// 'abandoned'   = learner quit before finishing.
export const SESSION_STATUSES = ['in_progress', 'completed', 'abandoned'] as const
export type SessionStatusDb = (typeof SESSION_STATUSES)[number]

/**
 * Mock test sessions — in-flight and completed.
 *
 * The `state` column holds the full serializable TestSession object as JSON.
 * This means one read to resume a session and one write per action — no joins,
 * no multi-table assembly. The existing reducer pattern
 * (transition(session, action, now) → nextSession) produces a fully serializable
 * object, so storing it as JSON is the natural fit.
 *
 * Queryable data (status, exam_id, timestamps) exists as real columns so the
 * database can filter and sort without parsing JSON.
 */
export const testSessions = sqliteTable(
  'test_sessions',
  {
    // Same ID as TestSession.id from the engine — not a new UUID.
    // The engine creates the session ID, the DB just stores it.
    id: text('id').primaryKey(),

    // Which learner owns this session.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // e.g. 'ielts_academic'. Matches ExamDefinition.id.
    examId: text('exam_id').notNull(),

    // Queryable session status (see SESSION_STATUSES above).
    status: text('status').notNull(),

    // The full TestSession object as JSON. This is the state that the
    // session reducer produces — storing it means instant resume with
    // a single read.
    state: text('state', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),

    // Epoch ms — when the session was created.
    startedAt: integer('started_at').notNull(),

    // Epoch ms — null until the session completes or is abandoned.
    completedAt: integer('completed_at'),

    // Epoch ms — updated on every action for staleness checks.
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    // "Show me my sessions" — the most common query.
    learnerIdx: index('test_sessions_learner_idx').on(t.learnerId),

    // "Do I have an active session?" — used on app load to offer resume.
    statusIdx: index('test_sessions_status_idx').on(t.status),

    // Composite: "My active session" — single index lookup instead of
    // intersecting two indexes.
    learnerStatusIdx: index('test_sessions_learner_status_idx').on(
      t.learnerId,
      t.status,
    ),
  }),
)
