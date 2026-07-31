// # CLI entry point for seeding the database.
// # Usage: npx tsx src/seed/cli.ts
// # Requires TURSO_DATABASE_URL (defaults to file:./local.db).

import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import { seedGraph } from './run-seed'

async function main() {
  const url = process.env.TURSO_DATABASE_URL ?? 'file:./local.db'
  const authToken = process.env.TURSO_AUTH_TOKEN

  const label = url.startsWith('file:') ? 'local' : 'remote'
  console.log(`Seeding database: ${label}`)

  const client = createClient({ url, authToken })
  const db = drizzle(client, { schema })

  const now = Date.now()
  await seedGraph(db, now)

  console.log('Seed complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
