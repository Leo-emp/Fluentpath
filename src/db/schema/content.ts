import { sqliteTable, text, real, integer, index, primaryKey } from 'drizzle-orm/sqlite-core'
import { skillNodes } from './skill-graph'

/**
 * Content storage: provenance, lessons, items, and their versions.
 *
 * Two decisions shape all of this.
 *
 * **Provenance is a first-class row, not a note.** Every asset records where it
 * came from and under what licence. Retrofitted, this is unprovable — there
 * would be thousands of assets and no record of any of them — so it exists
 * before there is any content to attach it to (spec §3.7).
 *
 * **Content is immutable and versioned.** A published version never changes;
 * an edit publishes a new one and moves a pointer. That buys instant rollback,
 * removes cache invalidation entirely, allows A/B testing, and keeps an audit
 * trail of exactly what a learner saw when they answered (spec §4b).
 */

/**
 * Where a piece of content came from.
 *
 * Referenced by every version, so licence obligations can be discharged
 * mechanically — the attributions page is generated from these rows rather
 * than maintained by hand.
 */
export const provenance = sqliteTable('provenance', {
  id: text('id').primaryKey(),

  /** e.g. 'VOA Learning English', 'CEFR-J 1.5', 'original'. */
  sourceName: text('source_name').notNull(),
  sourceUrl: text('source_url'),

  /** e.g. 'public-domain', 'CC BY 4.0', 'original'. */
  licence: text('licence').notNull(),
  licenceUrl: text('licence_url'),

  /** Exact credit line this source requires, empty when none is required. */
  attributionText: text('attribution_text').notNull().default(''),

  /** Epoch ms the source was retrieved, for re-verification against upstream. */
  retrievedAt: integer('retrieved_at'),

  /**
   * What was done to the source material — 'adapted to A2', 'excerpted',
   * 'unmodified'. Several licences distinguish verbatim use from derivative
   * use, so this is recorded rather than inferred.
   */
  modifications: text('modifications').notNull().default(''),

  createdAt: integer('created_at').notNull(),
})

/** Lifecycle states. Only `published` content is ever served to a learner. */
export const CONTENT_STATUS = ['draft', 'in_review', 'published', 'retired'] as const
export type ContentStatus = (typeof CONTENT_STATUS)[number]

/**
 * A lesson: the stable identity, independent of its versions.
 *
 * Holds no content itself. The text lives in `lessonVersions`, and ultimately
 * on the CDN — this row carries only metadata and a pointer.
 */
export const lessons = sqliteTable(
  'lessons',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    level: text('level').notNull(),
    skill: text('skill').notNull(),
    status: text('status').notNull().default('draft'),

    /** Version currently served. Null until something is published. */
    currentVersionId: text('current_version_id'),

    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    statusIdx: index('lessons_status_idx').on(t.status),
    levelIdx: index('lessons_level_idx').on(t.level),
  }),
)

/** Which skill nodes a lesson teaches. A lesson targets one to three. */
export const lessonNodes = sqliteTable(
  'lesson_nodes',
  {
    lessonId: text('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'cascade' }),
    nodeId: text('node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.lessonId, t.nodeId] }),
    nodeIdx: index('lesson_nodes_node_idx').on(t.nodeId),
  }),
)

/**
 * One immutable version of a lesson.
 *
 * Rows are never updated after publication. Correcting a lesson means
 * inserting a new version and repointing `lessons.currentVersionId`, which is
 * why rollback is a single field update rather than a redeploy.
 */
export const lessonVersions = sqliteTable(
  'lesson_versions',
  {
    id: text('id').primaryKey(),
    lessonId: text('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'cascade' }),

    /** Monotonic per lesson, starting at 1. */
    version: integer('version').notNull(),

    /** CDN URL of the published content. Null while still a draft. */
    contentUrl: text('content_url'),

    /** Body held inline while drafting, before publication to the CDN. */
    body: text('body', { mode: 'json' }).$type<Record<string, unknown> | null>(),

    provenanceId: text('provenance_id')
      .notNull()
      .references(() => provenance.id),

    publishedAt: integer('published_at'),
    retiredAt: integer('retired_at'),
    createdAt: integer('created_at').notNull(),
  },
  (t) => ({
    lessonIdx: index('lesson_versions_lesson_idx').on(t.lessonId),
  }),
)

/** An item: stable identity, independent of its versions. */
export const items = sqliteTable(
  'items',
  {
    id: text('id').primaryKey(),

    /** 'mcq', 'gap_fill', 'writing_task', 'speaking_prompt', and so on. */
    type: text('type').notNull(),
    level: text('level').notNull(),
    skill: text('skill').notNull(),
    status: text('status').notNull().default('draft'),

    /** Optional — items can stand alone, outside any lesson. */
    lessonId: text('lesson_id').references(() => lessons.id, { onDelete: 'set null' }),

    currentVersionId: text('current_version_id'),

    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    statusIdx: index('items_status_idx').on(t.status),
    levelIdx: index('items_level_idx').on(t.level),
    lessonIdx: index('items_lesson_idx').on(t.lessonId),
  }),
)

/** Which skill nodes an item exercises. Drives node attribution in diagnosis. */
export const itemNodes = sqliteTable(
  'item_nodes',
  {
    itemId: text('item_id')
      .notNull()
      .references(() => items.id, { onDelete: 'cascade' }),
    nodeId: text('node_id')
      .notNull()
      .references(() => skillNodes.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.itemId, t.nodeId] }),
    nodeIdx: index('item_nodes_node_idx').on(t.nodeId),
  }),
)

export const itemVersions = sqliteTable(
  'item_versions',
  {
    id: text('id').primaryKey(),
    itemId: text('item_id')
      .notNull()
      .references(() => items.id, { onDelete: 'cascade' }),
    version: integer('version').notNull(),

    /** The item itself — stem, options, misconceptions, answer key. */
    payload: text('payload', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),

    provenanceId: text('provenance_id')
      .notNull()
      .references(() => provenance.id),

    publishedAt: integer('published_at'),
    retiredAt: integer('retired_at'),
    createdAt: integer('created_at').notNull(),
  },
  (t) => ({
    itemIdx: index('item_versions_item_idx').on(t.itemId),
  }),
)

/**
 * Live performance statistics, per item **version**.
 *
 * Keyed on the version rather than the item because editing an item
 * invalidates its history. Fix a confusing distractor and the old difficulty
 * no longer describes anything — mixing the two produces numbers that look
 * authoritative and mean nothing.
 */
export const itemStatistics = sqliteTable('item_statistics', {
  itemVersionId: text('item_version_id')
    .primaryKey()
    .references(() => itemVersions.id, { onDelete: 'cascade' }),

  attempts: integer('attempts').notNull().default(0),
  correct: integer('correct').notNull().default(0),

  /**
   * Proportion answering correctly, 0..1. Confusingly, higher means easier.
   *
   * An item everyone gets right measures nothing, so both extremes are
   * grounds for retirement.
   */
  pValue: real('p_value'),

  /**
   * How well the item separates stronger learners from weaker ones, -1..1.
   *
   * Near zero or negative means the item is broken — strong learners are
   * getting it wrong as often as weak ones, which usually points to an
   * ambiguous stem or a second defensible answer.
   */
  discrimination: real('discrimination'),

  /** Learners who abandoned this item rather than answering. */
  abandonments: integer('abandonments').notNull().default(0),

  /** One-tap "this item is wrong or confusing" reports. */
  reports: integer('reports').notNull().default(0),

  updatedAt: integer('updated_at').notNull(),
})
