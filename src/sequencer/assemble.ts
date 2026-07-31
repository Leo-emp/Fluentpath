import type { Db } from '@/db/client'
import type { ActionPlan } from '@/diagnosis/types'
import type { McqItem } from '@/items/types'
import { listMastery } from '@/mastery/repository'
import { listEdges, listNodes } from '@/skill-graph/repository'
import { findItemsByNodes } from '@/content/item-bank'
import { selectNext, type Candidate } from './select'
import { boostFromDiagnosis } from './diagnosis-bridge'

// ─── Types ───────────────────────────────────────────────────────────────

export interface AssembleOptions {
  // Current timestamp (epoch ms). Required so tests can freeze time.
  now: number
  // Maximum number of items in the session. Default 10.
  maxItems?: number
  // Maximum number of nodes to select. Default 6.
  maxNodes?: number
  // Items the learner has already seen (e.g. earlier in the same sitting).
  excludeItemIds?: string[]
  // If provided, remediation nodes from this plan get priority.
  actionPlan?: ActionPlan
}

export interface SessionItem {
  // The MCQ item to present.
  item: McqItem
  // The primary node this item targets.
  nodeId: string
  // Why this node was selected.
  reason: 'review' | 'new' | 'remediation'
}

export interface SessionPlan {
  // Ordered list of items to present.
  items: SessionItem[]
  // Unique node IDs covered in this session.
  nodeIds: string[]
  // Estimated session duration (items × 30 seconds each).
  estimatedMinutes: number
}

// ─── Interleaving ────────────────────────────────────────────────────────

// Arrange items so no three consecutive items target the same node.
// Same algorithm as interleaveByType in select.ts, adapted for SessionItems.
function interleaveItems(items: SessionItem[]): SessionItem[] {
  const remaining = [...items]
  const result: SessionItem[] = []

  while (remaining.length > 0) {
    const lastNode = result[result.length - 1]?.nodeId
    const secondLastNode = result[result.length - 2]?.nodeId
    const wouldMakeThree = lastNode !== undefined && lastNode === secondLastNode

    const index = wouldMakeThree
      ? remaining.findIndex((si) => si.nodeId !== lastNode)
      : 0
    const pick = index === -1 ? 0 : index

    result.push(remaining[pick]!)
    remaining.splice(pick, 1)
  }

  return result
}

// ─── Assembly ────────────────────────────────────────────────────────────

// Assemble a practice session for a learner. This is the single function
// behind the "continue" button — it selects nodes from the skill graph,
// fetches items from the bank, and returns an ordered plan.
export async function assembleSession(
  db: Db,
  learnerId: string,
  options: AssembleOptions,
): Promise<SessionPlan> {
  const { now } = options
  const maxItems = options.maxItems ?? 20
  const maxNodes = options.maxNodes ?? 6

  // Step 1: load state — mastery, skill graph.
  const [mastery, nodes, edges] = await Promise.all([
    listMastery(db, learnerId),
    listNodes(db),
    listEdges(db),
  ])

  // Step 2: select candidate nodes (eligibility + priority ranking).
  let candidates = selectNext({ nodes, edges, mastery, now, limit: maxNodes })

  // Step 3: boost from diagnosis if an action plan is provided.
  if (options.actionPlan) {
    candidates = boostFromDiagnosis(candidates, options.actionPlan)
  }

  if (candidates.length === 0) {
    return { items: [], nodeIds: [], estimatedMinutes: 0 }
  }

  // Step 4: fetch items from the item bank for the selected nodes.
  const candidateNodeIds = candidates.map((c) => c.node.id)
  const bankItems = await findItemsByNodes(db, candidateNodeIds, {
    excludeIds: options.excludeItemIds,
    limit: maxItems * 2,
  })

  if (bankItems.length === 0) {
    return { items: [], nodeIds: [], estimatedMinutes: 0 }
  }

  // Step 5: allocate items per node.
  // Group items by their primary node (first nodeId).
  const itemsByNode = new Map<string, McqItem[]>()
  for (const item of bankItems) {
    const nodeId = item.nodeIds[0]
    if (!nodeId) continue
    const list = itemsByNode.get(nodeId) ?? []
    list.push(item)
    itemsByNode.set(nodeId, list)
  }

  // Build a reason lookup from candidates.
  const reasonByNode = new Map<string, Candidate['reason']>()
  for (const c of candidates) {
    reasonByNode.set(c.node.id, c.reason)
  }

  // Each node gets up to ceil(maxItems / nodeCount) items.
  const nodesWithItems = candidates.filter((c) => itemsByNode.has(c.node.id))
  const perNode = nodesWithItems.length > 0
    ? Math.ceil(maxItems / nodesWithItems.length)
    : 1

  const sessionItems: SessionItem[] = []
  for (const c of nodesWithItems) {
    const nodeItems = itemsByNode.get(c.node.id) ?? []
    const selected = nodeItems.slice(0, perNode)
    for (const item of selected) {
      sessionItems.push({
        item,
        nodeId: c.node.id,
        reason: c.reason,
      })
    }
  }

  // Step 6: interleave so no three consecutive items are from the same node.
  const interleaved = interleaveItems(sessionItems)

  // Step 7: cap at maxItems.
  const capped = interleaved.slice(0, maxItems)

  // Compute unique node IDs covered.
  const nodeIds = [...new Set(capped.map((si) => si.nodeId))]

  return {
    items: capped,
    nodeIds,
    // 30 seconds per item baseline.
    estimatedMinutes: capped.length * 0.5,
  }
}
