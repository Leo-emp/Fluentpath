// # Subscribers table — stores emails from the landing page capture form.
// # Used for newsletter/tips email campaigns.

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const subscribers = sqliteTable('subscribers', {
  // # Email address — primary key, unique by nature.
  email: text('email').primaryKey(),
  // # Timestamp when they subscribed.
  subscribedAt: integer('subscribed_at').notNull(),
  // # Whether they've unsubscribed.
  unsubscribedAt: integer('unsubscribed_at'),
})
