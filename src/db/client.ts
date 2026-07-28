import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

// Local development falls back to a file-backed SQLite database so the project
// runs with no configuration. Production supplies a Turso libSQL URL and token.
const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })

export type Db = typeof db
