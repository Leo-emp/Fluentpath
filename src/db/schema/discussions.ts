// # Discussion board schema — community Q&A for learners.
// # Simple thread model: posts (topics) and replies.

import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'

// # ═══════════════════════════════════════════════════════════════════
// # DISCUSSION POSTS — top-level threads
// # ═══════════════════════════════════════════════════════════════════

export const discussionPosts = sqliteTable(
  'discussion_posts',
  {
    id: text('id').primaryKey(),

    // # Author — FK to learners.
    authorId: text('author_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // # Post title.
    title: text('title').notNull(),

    // # Post body (markdown).
    body: text('body').notNull(),

    // # Category — groups posts by topic.
    category: text('category').notNull().default('general'),

    // # Counts — denormalised for list display.
    replyCount: integer('reply_count').notNull().default(0),

    // # Epoch ms.
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => ({
    // # List posts by category.
    categoryIdx: index('discussion_posts_category_idx').on(t.category),
    // # List posts by author.
    authorIdx: index('discussion_posts_author_idx').on(t.authorId),
    // # Sort by most recent.
    createdIdx: index('discussion_posts_created_idx').on(t.createdAt),
  }),
)

// # ═══════════════════════════════════════════════════════════════════
// # DISCUSSION REPLIES — responses to posts
// # ═══════════════════════════════════════════════════════════════════

export const discussionReplies = sqliteTable(
  'discussion_replies',
  {
    id: text('id').primaryKey(),

    // # Which post this is a reply to.
    postId: text('post_id')
      .notNull()
      .references(() => discussionPosts.id, { onDelete: 'cascade' }),

    // # Author — FK to learners.
    authorId: text('author_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // # Reply body (markdown).
    body: text('body').notNull(),

    // # Epoch ms.
    createdAt: integer('created_at').notNull(),
  },
  (t) => ({
    // # All replies for a post.
    postIdx: index('discussion_replies_post_idx').on(t.postId),
    // # Author's replies.
    authorIdx: index('discussion_replies_author_idx').on(t.authorId),
  }),
)
