import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import * as schema from '@/db/schema'
import type { Db } from '@/db/client'

/**
 * A fresh, empty database for one test, held entirely in memory.
 *
 * Each call gets its own isolated instance, so tests never see each other's
 * rows and can run in any order. Migrations are applied from the same folder
 * production uses, which means a schema change that breaks a migration fails
 * the test suite rather than surfacing on deploy.
 */
export async function makeTestDb(): Promise<Db> {
  const client = createClient({ url: ':memory:' })
  const db = drizzle(client, { schema })
  await migrate(db, { migrationsFolder: './drizzle' })
  return db as unknown as Db
}
