import { sqliteTable, text, real, integer, primaryKey, index } from 'drizzle-orm/sqlite-core'

/**
 * The skill graph: nodes are things a learner can know, edges are prerequisites.
 *
 * Note what is NOT here — no lesson text, no passages, no audio. Content lives
 * on Cloudflare R2 and is served from the CDN; the database only ever holds
 * metadata and pointers. That separation is what keeps content delivery free
 * and instant regardless of how many learners there are.
 */

export const skillNodes = sqliteTable(
  'skill_nodes',
  {
    // Human-readable dotted IDs, e.g. 'gram.b1.present_perfect'. Content
    // authors reference these by hand, so they must be stable and meaningful —
    // never auto-increment integers.
    id: text('id').primaryKey(),

    // These four are constrained to fixed sets in TypeScript (see
    // src/skill-graph/types.ts). SQLite has no enum type, so they are stored
    // as text and validated in the application layer.
    type: text('type').notNull(),
    level: text('level').notNull(),
    skill: text('skill').notNull(),

    title: text('title').notNull(),
    description: text('description').notNull().default(''),

    // `mode: 'json'` makes Drizzle serialise and parse this automatically, so
    // reads and writes deal in objects rather than strings.
    metadata: text('metadata', { mode: 'json' }).$type<Record<string, unknown> | null>(),

    // Epoch milliseconds. SQLite integers are 64-bit, so these fit comfortably.
    // Stored as numbers rather than date strings so comparisons are cheap and
    // time can be passed explicitly into pure functions during tests.
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    // The sequencer filters heavily by level, type and skill, so each gets an
    // index. Without these, choosing what to practise next scans every row.
    levelIdx: index('skill_nodes_level_idx').on(t.level),
    typeIdx: index('skill_nodes_type_idx').on(t.type),
    skillIdx: index('skill_nodes_skill_idx').on(t.skill),
  }),
)

export const skillEdges = sqliteTable(
  'skill_edges',
  {
    /** The prerequisite — must be learned first. */
    fromNodeId: text('from_node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),

    /** The dependent — unlocked once the prerequisite is met. */
    toNodeId: text('to_node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),

    /**
     * How strongly the prerequisite gates the dependent, 0..1.
     * 1 fully blocks; lower values mean it helps without blocking.
     */
    strength: real('strength').notNull().default(1),
  },
  (t) => ({
    // The pair is the identity of an edge — there is only ever one edge
    // between a given prerequisite and dependent.
    pk: primaryKey({ columns: [t.fromNodeId, t.toNodeId] }),

    // The composite primary key already indexes (from, to) in that order, so
    // looking up "what does X unlock" is fast. This index covers the opposite
    // question — "what does Y require" — which is the one the eligibility
    // check asks constantly.
    toIdx: index('skill_edges_to_idx').on(t.toNodeId),
  }),
)
