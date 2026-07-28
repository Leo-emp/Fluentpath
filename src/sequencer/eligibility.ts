import { retainedMastery } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'
import type { SkillEdge, SkillNode } from '@/skill-graph/types'

/**
 * What a learner is ready for right now.
 *
 * This is the gate that stops the sequencer offering the present perfect to
 * someone who cannot yet form the past simple — the single most common way a
 * learning app wastes a learner's time and convinces them they are stupid.
 */

/**
 * Retained mastery at or above this counts a node as "known".
 *
 * 0.6 rather than something higher because prerequisites need to be *usable*,
 * not perfect. Requiring near-mastery of everything upstream would leave
 * learners grinding foundations they already function with.
 */
export const MASTERY_THRESHOLD = 0.6

/**
 * Nodes whose prerequisites are all satisfied as at `now`.
 *
 * A prerequisite counts as satisfied when its **decayed** mastery meets the
 * threshold scaled by edge strength. Two consequences worth noting:
 *
 * - A strength-1 edge gates fully; a strength-0.2 edge barely gates at all,
 *   which models "this helps but does not block".
 * - Because decay is applied, a prerequisite the learner has not touched for
 *   months can fall back below the line and re-block its dependents. That is
 *   correct: they genuinely are not ready any more, and the sequencer will
 *   route them back through review first.
 */
export function eligibleNodes(
  nodes: SkillNode[],
  edges: SkillEdge[],
  mastery: MasteryRecord[],
  now: number,
): SkillNode[] {
  // Decay every record once up front rather than recomputing per edge.
  const retainedById = new Map<string, number>()
  for (const record of mastery) {
    retainedById.set(record.nodeId, retainedMastery(record, now))
  }

  // Index edges by dependent, since the question asked is always
  // "what does this node require", never "what does it unlock".
  const prerequisitesByNode = new Map<string, SkillEdge[]>()
  for (const edge of edges) {
    const list = prerequisitesByNode.get(edge.toNodeId) ?? []
    list.push(edge)
    prerequisitesByNode.set(edge.toNodeId, list)
  }

  return nodes.filter((node) => {
    const prerequisites = prerequisitesByNode.get(node.id) ?? []

    // A node with no prerequisites is always available — that is where every
    // brand-new learner starts.
    return prerequisites.every((edge) => {
      const required = MASTERY_THRESHOLD * edge.strength
      const actual = retainedById.get(edge.fromNodeId) ?? 0
      return actual >= required
    })
  })
}
