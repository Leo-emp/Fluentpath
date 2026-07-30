/**
 * Node attribution — map every response in a PerformanceRecord to
 * skill-graph node outcomes.
 *
 * This is the first stage of the diagnosis pipeline. Each response in
 * the performance record carries a list of nodeIds (from the exam
 * definition's slot). For each (response, nodeId) pair, we produce one
 * NodeOutcome recording whether the response was successful, its score,
 * and its latency.
 *
 * The "correct" decision for scored responses uses a 50% threshold:
 *   score >= 0.5 × maxScore → correct
 * This works for both binary items (1/1 = correct, 0/1 = incorrect)
 * and rubric-scored tasks (5/9 = partial credit, still counts as
 * "demonstrated competence" for this node). Unscored responses default
 * to incorrect — the conservative assumption.
 */

import type { PerformanceRecord } from '@/mock-test/types'
import type { NodeOutcome } from './types'

// Threshold: a response is "correct" for a node when the score is
// at least this proportion of the max score.
const CORRECT_THRESHOLD = 0.5

/**
 * Flatten a PerformanceRecord into per-node outcomes.
 *
 * Returns one NodeOutcome per (response × nodeId). A response with
 * 3 nodeIds produces 3 outcomes, all sharing the same score and latency.
 */
export function attributeOutcomes(record: PerformanceRecord): NodeOutcome[] {
  const outcomes: NodeOutcome[] = []
  // Running index across all responses in all sections.
  let responseIndex = 0

  for (const sectionResult of record.sectionResults) {
    for (const response of sectionResult.responses) {
      // Determine correctness from the score.
      const correct = isCorrect(response.score, response.maxScore)

      // One outcome per nodeId on this response.
      for (const nodeId of response.nodeIds) {
        outcomes.push({
          nodeId,
          sectionId: sectionResult.sectionId,
          skill: sectionResult.skill,
          correct,
          score: response.score,
          maxScore: response.maxScore,
          latencyMs: response.latencyMs,
          responseIndex,
        })
      }

      responseIndex++
    }
  }

  return outcomes
}

/**
 * Determine whether a scored response counts as "correct" for
 * node attribution. Uses a 50% threshold.
 *
 * Unscored responses (score or maxScore is null) default to false —
 * the conservative assumption when we have no evidence.
 */
function isCorrect(score: number | null, maxScore: number | null): boolean {
  if (score === null || maxScore === null || maxScore === 0) return false
  return score / maxScore >= CORRECT_THRESHOLD
}
