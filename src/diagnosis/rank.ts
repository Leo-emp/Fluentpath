/**
 * Weakness ranking — aggregate node outcomes into ranked weak nodes.
 *
 * This is the second stage of the diagnosis pipeline. It groups
 * NodeOutcomes by nodeId, computes aggregate statistics (accuracy,
 * mean latency), and ranks weak nodes by impact × confidence.
 *
 * The spec (§3.5): "identify weak nodes ranked by (impact × confidence),
 * suppressing anything with insufficient evidence."
 *
 * Impact is how much this gap hurts: (1 - accuracy). A node the learner
 * gets right 80% of the time has low impact; one they get right 20% of
 * the time has high impact.
 *
 * Confidence is how sure we are: scales with the number of attempts.
 * One wrong answer could be a fluke; five wrong answers is a pattern.
 * Formula: 1 - e^(-n/3), which saturates at ~1.0 around 5-6 attempts.
 */

import type { NodeOutcome, WeakNode } from './types'
import type { SkillNode } from '@/skill-graph/types'

// Nodes with accuracy at or above this are not considered weak.
// 80% correct means the learner has functional mastery — move on.
const STRENGTH_THRESHOLD = 0.8

// Default minimum attempts required before a node is included.
// Prevents single-response flukes from triggering a diagnosis.
const DEFAULT_MIN_ATTEMPTS = 2

/**
 * Aggregate outcomes and rank weak nodes.
 *
 * @param outcomes    All node outcomes from the attribution stage.
 * @param nodes       Skill graph nodes (for enrichment: title, type, level).
 * @param minAttempts Minimum attempts to include a node (default 2).
 * @returns WeakNodes sorted by rank (impact × confidence) descending.
 */
export function rankWeakNodes(
  outcomes: NodeOutcome[],
  nodes: SkillNode[],
  minAttempts: number = DEFAULT_MIN_ATTEMPTS,
): WeakNode[] {
  // Index nodes by ID for fast lookup.
  const nodeById = new Map<string, SkillNode>()
  for (const node of nodes) {
    nodeById.set(node.id, node)
  }

  // Group outcomes by nodeId.
  const grouped = new Map<string, NodeOutcome[]>()
  for (const outcome of outcomes) {
    // Skip outcomes for nodes we don't know about.
    if (!nodeById.has(outcome.nodeId)) continue

    const list = grouped.get(outcome.nodeId) ?? []
    list.push(outcome)
    grouped.set(outcome.nodeId, list)
  }

  const weakNodes: WeakNode[] = []

  for (const [nodeId, nodeOutcomes] of grouped) {
    const node = nodeById.get(nodeId)!

    // Suppress nodes with insufficient evidence.
    if (nodeOutcomes.length < minAttempts) continue

    const totalAttempts = nodeOutcomes.length
    const totalCorrect = nodeOutcomes.filter((o) => o.correct).length
    const accuracy = totalCorrect / totalAttempts

    // Skip nodes the learner is already strong on.
    if (accuracy >= STRENGTH_THRESHOLD) continue

    const meanLatencyMs =
      nodeOutcomes.reduce((sum, o) => sum + o.latencyMs, 0) / totalAttempts

    // Impact: how much this gap hurts (inverted accuracy).
    const impact = 1 - accuracy

    // Confidence: scales with evidence quantity.
    // Saturates at ~1.0 around 5-6 attempts (1 - e^(-n/3)).
    const confidence = 1 - Math.exp(-totalAttempts / 3)

    const rank = impact * confidence

    weakNodes.push({
      nodeId,
      nodeTitle: node.title,
      nodeType: node.type,
      level: node.level,
      skill: node.skill,
      totalAttempts,
      totalCorrect,
      accuracy,
      meanLatencyMs,
      impact,
      confidence,
      rank,
    })
  }

  // Sort by rank descending — highest priority gap first.
  weakNodes.sort((a, b) => b.rank - a.rank)

  return weakNodes
}
