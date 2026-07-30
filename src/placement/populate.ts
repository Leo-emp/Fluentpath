/**
 * Populate initial mastery records from placement test results.
 *
 * After placement determines the learner's approximate level, every
 * node in the skill graph gets an initial MasteryRecord. This saves
 * the sequencer from having to test every node individually — the
 * placement gives a reasonable starting estimate that subsequent
 * practice refines.
 *
 * The logic:
 *   - Nodes BELOW the estimated level: high mastery (assumed known).
 *   - Nodes AT the estimated level: mastery proportional to the
 *     pass rate at that level (partial knowledge).
 *   - Nodes ABOVE the estimated level: low mastery (assumed unknown).
 *
 * Confidence is higher for levels that were actually tested (direct
 * evidence) and lower for levels that were inferred (indirect evidence
 * from adjacent levels).
 */

import { levelIndex, type SkillNode } from '@/skill-graph/types'
import { clamp01, type MasteryRecord } from '@/mastery/types'
import type { PlacementResult } from './types'

// Mastery assigned to nodes below the estimated level.
// High but not 1.0 — the placement test is approximate, not definitive.
const BELOW_LEVEL_MASTERY = 0.85

// Mastery assigned to nodes above the estimated level.
// Low but not 0 — they may know some things above their level.
const ABOVE_LEVEL_MASTERY = 0.15

// Confidence when a level was directly tested.
const TESTED_CONFIDENCE = 0.4

// Confidence when a level was inferred (not tested directly).
const INFERRED_CONFIDENCE = 0.15

/**
 * Create initial MasteryRecords for all nodes based on placement results.
 *
 * @param result  The completed placement test result.
 * @param nodes   All skill graph nodes to populate.
 * @param now     Current timestamp (epoch ms).
 * @returns One MasteryRecord per node.
 */
export function populateMastery(
  result: PlacementResult,
  nodes: SkillNode[],
  now: number,
): MasteryRecord[] {
  const estimatedIndex = levelIndex(result.estimatedLevel)

  return nodes.map((node) => {
    const nodeIndex = levelIndex(node.level)
    const levelResult = result.levelResults[node.level]
    const wasTested = levelResult !== undefined && levelResult.total > 0

    let mastery: number
    let confidence: number

    if (nodeIndex < estimatedIndex) {
      // Below estimated level — assume known.
      mastery = BELOW_LEVEL_MASTERY
      confidence = wasTested ? TESTED_CONFIDENCE : INFERRED_CONFIDENCE
    } else if (nodeIndex === estimatedIndex) {
      // At estimated level — use the actual pass rate as mastery.
      mastery = levelResult
        ? clamp01(levelResult.correct / levelResult.total)
        : 0.5
      confidence = wasTested ? TESTED_CONFIDENCE : INFERRED_CONFIDENCE
    } else {
      // Above estimated level — assume unknown.
      mastery = ABOVE_LEVEL_MASTERY
      confidence = wasTested ? TESTED_CONFIDENCE : INFERRED_CONFIDENCE
    }

    return {
      learnerId: '',
      nodeId: node.id,
      mastery: clamp01(mastery),
      confidence: clamp01(confidence),
      exposures: wasTested ? (levelResult?.total ?? 0) : 0,
      correctStreak: 0,
      lastSeenAt: now,
    }
  })
}
