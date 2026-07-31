import { eq, sql } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { itemStatistics } from '@/db/schema'

// ─── Types ───────────────────────────────────────────────────────────────

export interface ItemStatistics {
  itemVersionId: string
  attempts: number
  correct: number
  pValue: number | null
  discrimination: number | null
  abandonments: number
  reports: number
  updatedAt: number
}

// ─── Recording functions ─────────────────────────────────────────────────

// Record a learner's attempt at an item version. Creates the statistics
// row on first call (upsert), increments counters, and recomputes p_value.
export async function recordAttempt(
  db: Db,
  versionId: string,
  correct: boolean,
  now: number,
): Promise<void> {
  const correctIncrement = correct ? 1 : 0

  await db
    .insert(itemStatistics)
    .values({
      itemVersionId: versionId,
      attempts: 1,
      correct: correctIncrement,
      pValue: correctIncrement,
      discrimination: null,
      abandonments: 0,
      reports: 0,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: itemStatistics.itemVersionId,
      set: {
        // Increment attempts and correct counters.
        attempts: sql`${itemStatistics.attempts} + 1`,
        correct: sql`${itemStatistics.correct} + ${correctIncrement}`,
        // Recompute p_value as correct / attempts after incrementing.
        pValue: sql`CAST(${itemStatistics.correct} + ${correctIncrement} AS REAL) / (${itemStatistics.attempts} + 1)`,
        updatedAt: now,
      },
    })
}

// Record that a learner abandoned this item without answering.
export async function recordAbandonment(
  db: Db,
  versionId: string,
  now: number,
): Promise<void> {
  await db
    .insert(itemStatistics)
    .values({
      itemVersionId: versionId,
      attempts: 0,
      correct: 0,
      pValue: null,
      discrimination: null,
      abandonments: 1,
      reports: 0,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: itemStatistics.itemVersionId,
      set: {
        abandonments: sql`${itemStatistics.abandonments} + 1`,
        updatedAt: now,
      },
    })
}

// Record a one-tap "this item is wrong or confusing" report.
export async function recordReport(
  db: Db,
  versionId: string,
  now: number,
): Promise<void> {
  await db
    .insert(itemStatistics)
    .values({
      itemVersionId: versionId,
      attempts: 0,
      correct: 0,
      pValue: null,
      discrimination: null,
      abandonments: 0,
      reports: 1,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: itemStatistics.itemVersionId,
      set: {
        reports: sql`${itemStatistics.reports} + 1`,
        updatedAt: now,
      },
    })
}

// ─── Query ───────────────────────────────────────────────────────────────

// Fetch current statistics for an item version. Returns null when no
// attempts, abandonments, or reports have been recorded.
export async function getStatistics(
  db: Db,
  versionId: string,
): Promise<ItemStatistics | null> {
  const rows = await db
    .select()
    .from(itemStatistics)
    .where(eq(itemStatistics.itemVersionId, versionId))
    .limit(1)

  const row = rows[0]
  if (!row) return null

  return {
    itemVersionId: row.itemVersionId,
    attempts: row.attempts,
    correct: row.correct,
    pValue: row.pValue,
    discrimination: row.discrimination,
    abandonments: row.abandonments,
    reports: row.reports,
    updatedAt: row.updatedAt,
  }
}
