import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '@/db/schema'
import type { Db } from '@/db/client'

// Test-only override. When set, getDb() returns this instead of the
// production connection. Reset to null in afterEach.
let _testDb: Db | null = null

// Inject a test database. Only use in test files.
export function _setTestDb(db: Db | null): void {
  _testDb = db
}

// HMR-safe database singleton. In development, Next.js re-evaluates
// modules on hot reload — storing the client on globalThis prevents
// creating multiple connections. In production, module caching handles it.
function createProductionDb(): Db {
  const g = globalThis as Record<string, unknown>
  if (g.__fluentpath_db) return g.__fluentpath_db as Db

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? 'file:./local.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const db = drizzle(client, { schema })

  g.__fluentpath_db = db
  return db
}

// Get the database instance. Route handlers call this instead of
// importing db directly.
export function getDb(): Db {
  if (_testDb) return _testDb
  return createProductionDb()
}
