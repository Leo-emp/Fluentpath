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

// ─── Quality thresholds ─────────────────────────────────────────────────

// Minimum attempts before thresholds apply (avoid acting on sparse data).
const MIN_ATTEMPTS_FOR_THRESHOLD = 20

// Items easier than this are trivial — learners aren't learning.
const P_VALUE_CEILING = 0.95
// Items harder than this are broken — almost nobody gets them right.
const P_VALUE_FLOOR = 0.10
// More than 5% of attempts result in a report = something is wrong.
const REPORT_RATE_CEILING = 0.05
// More than 20% abandonment = item is confusing or off-putting.
const ABANDONMENT_RATE_CEILING = 0.20

export type ItemHealthFlag =
  | 'too_easy'
  | 'too_hard'
  | 'high_report_rate'
  | 'high_abandonment'

export interface ItemHealth {
  versionId: string
  flags: ItemHealthFlag[]
  shouldRetire: boolean
}

// Check an item's statistics against quality thresholds.
export function checkItemHealth(stats: ItemStatistics): ItemHealth {
  const flags: ItemHealthFlag[] = []

  if (stats.attempts >= MIN_ATTEMPTS_FOR_THRESHOLD) {
    if (stats.pValue !== null && stats.pValue >= P_VALUE_CEILING) {
      flags.push('too_easy')
    }
    if (stats.pValue !== null && stats.pValue <= P_VALUE_FLOOR) {
      flags.push('too_hard')
    }
  }

  const totalInteractions = stats.attempts + stats.abandonments
  if (totalInteractions >= MIN_ATTEMPTS_FOR_THRESHOLD) {
    if (stats.reports / totalInteractions >= REPORT_RATE_CEILING) {
      flags.push('high_report_rate')
    }
    if (stats.abandonments / totalInteractions >= ABANDONMENT_RATE_CEILING) {
      flags.push('high_abandonment')
    }
  }

  return {
    versionId: stats.itemVersionId,
    flags,
    shouldRetire: flags.includes('too_hard') || flags.includes('high_report_rate'),
  }
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
