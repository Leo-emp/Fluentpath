import type { Db } from '@/db/client'
import { listNodes } from '@/skill-graph/repository'
import { listMastery, saveMastery } from './repository'
import type { MasteryRecord } from './types'
import { updateMastery } from './update'

/**
 * Turning assessed answers into stored mastery.
 *
 * This is the write path for the whole product, and it is deliberately
 * batch-shaped. A practice session accumulates outcomes on the client and
 * flushes them once at the end: one read of the learner's state, all the
 * arithmetic in memory, one write. Doing it per item would multiply write
 * volume by roughly fifty against a database that serialises writes.
 */

export interface AssessedOutcome {
  nodeId: string
  /** 0 (wrong) .. 1 (fully correct); partial credit allowed. */
  outcome: number
  /** 0 (trivial) .. 1 (very hard). */
  difficulty: number
}

function blankRecord(learnerId: string, nodeId: string, now: number): MasteryRecord {
  return { learnerId, nodeId, mastery: 0, confidence: 0, exposures: 0, correctStreak: 0, lastSeenAt: now }
}

/**
 * Apply a batch of outcomes to a learner's mastery and persist the result.
 *
 * Outcomes are applied **in order**, so several answers on the same node
 * within one session compound correctly — three correct answers count as
 * three exposures, and ending on a failure resets the streak.
 *
 * @returns the updated records, one per distinct node touched
 */
export async function recordOutcomes(
  db: Db,
  learnerId: string,
  outcomes: AssessedOutcome[],
  now: number,
): Promise<MasteryRecord[]> {
  if (outcomes.length === 0) return []

  // Fail loudly on an unknown node rather than writing an orphan row. A
  // foreign key would catch this too, but only after the arithmetic, and with
  // an error message that names a constraint rather than the actual problem.
  const known = new Set((await listNodes(db)).map((n) => n.id))
  for (const o of outcomes) {
    if (!known.has(o.nodeId)) {
      throw new Error(`Cannot record an outcome for unknown skill node "${o.nodeId}".`)
    }
  }

  // One read of everything this learner has ever done. Cheaper than one query
  // per node, and the sequencer needs the same data immediately afterwards.
  const existing = new Map((await listMastery(db, learnerId)).map((r) => [r.nodeId, r]))

  // Fold each outcome in turn. Later outcomes on the same node see the result
  // of earlier ones, which is what makes a repeated node compound.
  const touched = new Map<string, MasteryRecord>()

  for (const o of outcomes) {
    const before =
      touched.get(o.nodeId) ?? existing.get(o.nodeId) ?? blankRecord(learnerId, o.nodeId, now)

    touched.set(o.nodeId, updateMastery(before, o.outcome, o.difficulty, now))
  }

  const updated = [...touched.values()]
  await saveMastery(db, updated)

  return updated
}
