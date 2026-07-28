import { sqliteTable, text, real, integer, primaryKey, index } from 'drizzle-orm/sqlite-core'
import { skillNodes } from './skill-graph'

/**
 * Per-learner, per-node mastery state.
 *
 * This is the highest-write table in the system — every assessed item touches
 * a row. Session outcomes are therefore batched into a single write at session
 * end rather than written per item, which is what keeps write volume inside
 * Turso's serialised-write ceiling.
 */
export const learnerMastery = sqliteTable(
  'learner_mastery',
  {
    learnerId: text('learner_id').notNull(),

    nodeId: text('node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),

    mastery: real('mastery').notNull().default(0),
    confidence: real('confidence').notNull().default(0),
    exposures: integer('exposures').notNull().default(0),
    correctStreak: integer('correct_streak').notNull().default(0),

    /** Epoch milliseconds. Decay is computed from this on read. */
    lastSeenAt: integer('last_seen_at').notNull(),
  },
  (t) => ({
    // A learner has exactly one record per node, so the pair is the identity.
    // This also makes the upsert on session sync a single statement.
    pk: primaryKey({ columns: [t.learnerId, t.nodeId] }),

    // The composite key indexes (learner, node) in that order, which already
    // covers "everything for this learner". This explicit index exists because
    // that query - loading a learner's whole state to run the sequencer - is
    // the hottest read in the product and benefits from a narrower index.
    learnerIdx: index('learner_mastery_learner_idx').on(t.learnerId),
  }),
)
