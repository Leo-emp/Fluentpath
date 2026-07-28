import { sql } from 'drizzle-orm'

/**
 * References the incoming row's value inside an upsert.
 *
 * In SQL, `INSERT ... ON CONFLICT DO UPDATE SET x = excluded.x` means "keep
 * the value we tried to insert". Drizzle has no typed helper for this, so we
 * drop to raw SQL.
 *
 * The argument is the **database** column name (snake_case), not the
 * TypeScript property name — `correct_streak`, not `correctStreak`.
 */
export function sqlExcluded(column: string) {
  return sql.raw(`excluded.${column}`)
}
