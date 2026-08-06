import { createClient } from '@libsql/client'

async function main() {
  const c = createClient({ url: 'file:./local.db' })

  const statements = [
    `CREATE TABLE IF NOT EXISTS discussion_posts (id text PRIMARY KEY NOT NULL, author_id text NOT NULL, title text NOT NULL, body text NOT NULL, category text DEFAULT 'general' NOT NULL, reply_count integer DEFAULT 0 NOT NULL, created_at integer NOT NULL, updated_at integer NOT NULL, FOREIGN KEY (author_id) REFERENCES learners(id) ON DELETE cascade)`,
    `CREATE INDEX IF NOT EXISTS discussion_posts_category_idx ON discussion_posts (category)`,
    `CREATE INDEX IF NOT EXISTS discussion_posts_author_idx ON discussion_posts (author_id)`,
    `CREATE INDEX IF NOT EXISTS discussion_posts_created_idx ON discussion_posts (created_at)`,
    `CREATE TABLE IF NOT EXISTS discussion_replies (id text PRIMARY KEY NOT NULL, post_id text NOT NULL, author_id text NOT NULL, body text NOT NULL, created_at integer NOT NULL, FOREIGN KEY (post_id) REFERENCES discussion_posts(id) ON DELETE cascade, FOREIGN KEY (author_id) REFERENCES learners(id) ON DELETE cascade)`,
    `CREATE INDEX IF NOT EXISTS discussion_replies_post_idx ON discussion_replies (post_id)`,
    `CREATE INDEX IF NOT EXISTS discussion_replies_author_idx ON discussion_replies (author_id)`,
  ]

  for (const sql of statements) {
    await c.execute(sql)
  }

  const r = await c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'discussion%'")
  console.log('Tables created:', r.rows)
}

main()
