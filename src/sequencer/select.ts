import { retainedMastery } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'
import { levelIndex, type SkillEdge, type SkillNode } from '@/skill-graph/types'
import { eligibleNodes } from './eligibility'

/**
 * Choosing what a learner practises next.
 *
 * This is what sits behind the single "continue" button. The interface
 * deliberately never asks a learner to choose from a menu — decision fatigue
 * is what ends practice habits, and the graph knows their position better
 * than they do.
 */

/**
 * Retained mastery below this makes a known node due for review.
 *
 * Higher than MASTERY_THRESHOLD (0.6) on purpose. Something that has faded to
 * 0.65 still counts as "known" for unlocking dependents, but is worth
 * refreshing — catching it here, before it drops below 0.6 and starts blocking
 * things, is exactly the point of spaced review.
 */
export const REVIEW_THRESHOLD = 0.75

export interface Candidate {
  node: SkillNode
  reason: 'review' | 'new'
  /** Higher is more urgent. */
  priority: number
}

export interface SelectInput {
  nodes: SkillNode[]
  edges: SkillEdge[]
  mastery: MasteryRecord[]
  now: number
  limit: number
}

/**
 * Rank and return the next things to practise.
 *
 * Review always outranks new material: reviving knowledge that is slipping is
 * cheaper than acquiring more, and letting it slip further would eventually
 * block everything downstream of it.
 */
export function selectNext(input: SelectInput): Candidate[] {
  const { nodes, edges, mastery, now, limit } = input
  if (limit <= 0) return []

  const retainedById = new Map<string, number>()
  for (const record of mastery) retainedById.set(record.nodeId, retainedMastery(record, now))

  const candidates: Candidate[] = []

  for (const node of eligibleNodes(nodes, edges, mastery, now)) {
    const retained = retainedById.get(node.id)

    if (retained === undefined) {
      // Never seen. Lower levels first, so a learner works upward rather than
      // being handed B2 material because it happened to be unlocked.
      candidates.push({ node, reason: 'new', priority: 100 - levelIndex(node.level) })
      continue
    }

    // Solid enough — nothing to gain from practising it right now.
    if (retained >= REVIEW_THRESHOLD) continue

    // Known but fading. The weaker it has become, the more urgent. The +1000
    // base keeps every review item ahead of every new one.
    candidates.push({
      node,
      reason: 'review',
      priority: 1000 + (REVIEW_THRESHOLD - retained) * 100,
    })
  }

  candidates.sort((a, b) => b.priority - a.priority)

  return interleaveByType(candidates).slice(0, limit)
}

/**
 * Break up runs of the same node type, preserving priority order otherwise.
 *
 * Interleaving different kinds of practice produces better retention than
 * doing all the grammar, then all the vocabulary. The effect is well
 * established, and it costs nothing to arrange here.
 *
 * Only intervenes when a third consecutive item of one type would appear, so
 * the priority ordering is disturbed as little as possible.
 */
function interleaveByType(candidates: Candidate[]): Candidate[] {
  const remaining = [...candidates]
  const result: Candidate[] = []

  while (remaining.length > 0) {
    const lastType = result[result.length - 1]?.node.type
    const secondLastType = result[result.length - 2]?.node.type
    const wouldMakeThree = lastType !== undefined && lastType === secondLastType

    // Look for a different type only when we are about to make a run of
    // three. If there isn't one, index is -1 and we fall back to the highest
    // priority item — better to allow the run than to drop material.
    const index = wouldMakeThree ? remaining.findIndex((c) => c.node.type !== lastType) : 0
    const pick = index === -1 ? 0 : index

    result.push(remaining[pick]!)
    remaining.splice(pick, 1)
  }

  return result
}
