import { and, eq } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { learnerMastery } from '@/db/schema'
import { sqlExcluded } from '@/db/sql-helpers'
import { clamp01, type MasteryRecord } from './types'

/**
 * Storage for learner mastery.
 *
 * `saveMastery` accepts a batch because that is how the product actually
 * writes: a practice session accumulates outcomes locally, then flushes every
 * touched node in one statement at session end. Writing per item would
 * multiply write volume by ~50 against a database that serialises writes.
 */

export async function getMastery(
  db: Db,
  learnerId: string,
  nodeId: string,
): Promise<MasteryRecord | null> {
  const rows = await db
    .select()
    .from(learnerMastery)
    .where(and(eq(learnerMastery.learnerId, learnerId), eq(learnerMastery.nodeId, nodeId)))
    .limit(1)

  return rows[0] ?? null
}

/** Every node this learner has encountered. Drives the sequencer. */
export async function listMastery(db: Db, learnerId: string): Promise<MasteryRecord[]> {
  return db.select().from(learnerMastery).where(eq(learnerMastery.learnerId, learnerId))
}

/**
 * Insert or update one record, or a whole batch, in a single statement.
 *
 * Mastery and confidence are clamped here rather than trusting callers. This
 * is the last gate before persistence, so it is the right place to guarantee
 * the invariant — a value outside 0..1 in the database would corrupt every
 * downstream calculation silently.
 */
export async function saveMastery(
  db: Db,
  recordOrBatch: MasteryRecord | MasteryRecord[],
): Promise<void> {
  const batch = Array.isArray(recordOrBatch) ? recordOrBatch : [recordOrBatch]
  if (batch.length === 0) return

  const safe = batch.map((r) => ({
    ...r,
    mastery: clamp01(r.mastery),
    confidence: clamp01(r.confidence),
  }))

  await db
    .insert(learnerMastery)
    .values(safe)
    .onConflictDoUpdate({
      target: [learnerMastery.learnerId, learnerMastery.nodeId],
      set: {
        mastery: sqlExcluded('mastery'),
        confidence: sqlExcluded('confidence'),
        exposures: sqlExcluded('exposures'),
        correctStreak: sqlExcluded('correct_streak'),
        lastSeenAt: sqlExcluded('last_seen_at'),
      },
    })
}
