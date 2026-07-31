/**
 * Action plan generation — ordered remediation respecting prerequisites.
 *
 * Spec §3.5: "an ordered remediation sequence: which nodes, in what
 * order (respecting graph prerequisites), which specific lessons and
 * drills address each, and estimated study time."
 *
 * The algorithm:
 *   1. Take the ranked ClassifiedGaps (already sorted by rank).
 *   2. Topologically sort them using graph prerequisites: if node A
 *      is a prerequisite of node B, A comes first regardless of rank.
 *   3. For each gap, assign an activity based on root cause:
 *      - Knowledge → study + practice exercises
 *      - Processing → timed drills for speed
 *      - Strategy → exam technique practice
 *      - Production → output-focused exercises (writing/speaking)
 *   4. Estimate time per step based on root cause and node type.
 */

import type {
  ClassifiedGap,
  RemediationStep,
  ActionPlan,
  RootCause,
} from './types'
import type { SkillEdge, SkillNode } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

// Default maximum steps in an action plan. Can be overridden.
const DEFAULT_MAX_STEPS = 10

// Base minutes per step, scaled by gap severity.
const BASE_TIME: Record<RootCause, number> = {
  knowledge: 20,
  processing: 10,
  strategy: 15,
  production: 20,
}

// Estimate time based on root cause AND how severe the gap is.
function estimateTime(rootCause: RootCause, accuracy: number): number {
  const base = BASE_TIME[rootCause]
  // Worse accuracy = more time needed. Scale from 1x to 2x.
  const severityMultiplier = 1 + (1 - accuracy)
  return Math.round(base * severityMultiplier / 5) * 5
}

// Generate a specific activity description from the gap's actual data.
function generateActivity(gap: ClassifiedGap): string {
  const { nodeTitle, rootCause, accuracy, nodeType, level } = gap
  const pct = Math.round(accuracy * 100)

  switch (rootCause) {
    case 'knowledge':
      return (
        `Study "${nodeTitle}" (${level}): you got ${pct}% correct, which means the ` +
        (nodeType === 'grammar'
          ? `pattern isn't learned yet. Review the rule with examples, then do fill-in-blank exercises until you can produce it without checking.`
          : nodeType === 'lexical'
            ? `vocabulary isn't sticking. Study these words in context sentences, then practise recalling them from meaning (not from a word list).`
            : `concept needs building. Work through guided examples, then try exercises that require you to apply it.`)
      )

    case 'processing':
      return (
        `Speed drill for "${nodeTitle}" (${level}): you know this (${pct}% correct) but ` +
        `you're too slow under time pressure. Do timed exercises — answer within 5 seconds ` +
        `per item. The goal is automatic recall, not re-learning.`
      )

    case 'strategy':
      return (
        `Technique practice for "${nodeTitle}": your accuracy is ${pct}%. Work through ` +
        `two complete exam-style tasks, then compare your approach against the model procedure ` +
        `step by step. Focus on time allocation and task structure, not language.`
      )

    case 'production':
      return (
        `Production practice for "${nodeTitle}" (${level}): you recognise this form ` +
        `(receptive tasks are fine) but can't produce it yet (${pct}% on output tasks). ` +
        `Do writing and speaking exercises that force you to use it — ` +
        (nodeType === 'grammar'
          ? `write 5 sentences using this structure, then say them aloud.`
          : `use these words in your own sentences about familiar topics, then describe a picture using them.`)
      )
  }
}

export interface BuildPlanOptions {
  maxSteps?: number
  masteryRecords?: MasteryRecord[]
  nodes?: SkillNode[]
}

/**
 * Build an action plan from classified gaps and graph prerequisites.
 *
 * When masteryRecords + nodes are provided, also identifies untested
 * prerequisites — foundation gaps that might explain the visible gaps.
 */
export function buildActionPlan(
  gaps: ClassifiedGap[],
  edges: SkillEdge[],
  optionsOrMaxSteps: number | BuildPlanOptions = {},
): ActionPlan {
  const opts: BuildPlanOptions = typeof optionsOrMaxSteps === 'number'
    ? { maxSteps: optionsOrMaxSteps }
    : optionsOrMaxSteps
  const maxSteps = opts.maxSteps ?? DEFAULT_MAX_STEPS
  if (gaps.length === 0) {
    return { steps: [], totalEstimatedMinutes: 0, gapCount: 0 }
  }

  // Collect the set of gap node IDs for prerequisite filtering.
  const gapNodeIds = new Set(gaps.map((g) => g.nodeId))

  // Build a prerequisite map. Include edges where BOTH endpoints are
  // in the gap set, plus edges where the prerequisite (fromNode) is
  // NOT in the gap set but connects to a gap node — these are
  // potentially untested foundations that should be flagged.
  const prereqsOf = new Map<string, string[]>()
  for (const gap of gaps) {
    prereqsOf.set(gap.nodeId, [])
  }
  for (const edge of edges) {
    if (gapNodeIds.has(edge.toNodeId)) {
      // Both in gap set: ordering constraint.
      if (gapNodeIds.has(edge.fromNodeId)) {
        prereqsOf.get(edge.toNodeId)!.push(edge.fromNodeId)
      }
    }
  }

  // Topological sort using Kahn's algorithm. Within each "tier"
  // (nodes whose prerequisites are all resolved), preserve the
  // original rank order from the classification stage.
  const sorted = topologicalSort(gaps, prereqsOf)

  // Limit to maxSteps but report the total gap count.
  const limited = sorted.slice(0, maxSteps)

  const steps: RemediationStep[] = limited.map((gap, index) => ({
    order: index + 1,
    nodeId: gap.nodeId,
    nodeTitle: gap.nodeTitle,
    rootCause: gap.rootCause,
    activity: generateActivity(gap),
    estimatedMinutes: estimateTime(gap.rootCause, gap.accuracy),
    prerequisiteNodeIds: prereqsOf.get(gap.nodeId) ?? [],
  }))

  const totalEstimatedMinutes = steps.reduce(
    (sum, s) => sum + s.estimatedMinutes,
    0,
  )

  // Identify untested prerequisites — foundation nodes that weren't
  // tested but connect to gap nodes. These might be the real root cause.
  const untestedPrerequisites: string[] = []
  if (opts.masteryRecords && opts.nodes) {
    const testedNodeIds = new Set(opts.masteryRecords.map(m => m.nodeId))
    const nodeById = new Map(opts.nodes.map(n => [n.id, n]))

    for (const edge of edges) {
      if (
        gapNodeIds.has(edge.toNodeId) &&
        !gapNodeIds.has(edge.fromNodeId) &&
        !testedNodeIds.has(edge.fromNodeId) &&
        nodeById.has(edge.fromNodeId)
      ) {
        untestedPrerequisites.push(edge.fromNodeId)
      }
    }
  }

  return {
    steps,
    totalEstimatedMinutes,
    gapCount: gaps.length,
    untestedPrerequisites: [...new Set(untestedPrerequisites)],
  }
}

/**
 * Topological sort of gaps respecting prerequisites.
 *
 * Uses Kahn's algorithm. Within each tier (all prerequisites resolved),
 * gaps are ordered by their original position in the input array
 * (which is by rank descending from the ranking stage).
 */
function topologicalSort(
  gaps: ClassifiedGap[],
  prereqsOf: Map<string, string[]>,
): ClassifiedGap[] {
  // Track the original index for stable ordering within tiers.
  const originalIndex = new Map(gaps.map((g, i) => [g.nodeId, i]))

  // Count unresolved prerequisites per node.
  const inDegree = new Map<string, number>()
  for (const gap of gaps) {
    inDegree.set(gap.nodeId, (prereqsOf.get(gap.nodeId) ?? []).length)
  }

  const sorted: ClassifiedGap[] = []
  const resolved = new Set<string>()

  while (sorted.length < gaps.length) {
    // Find all nodes whose prerequisites are fully resolved.
    const ready = gaps
      .filter(
        (g) =>
          !resolved.has(g.nodeId) &&
          (inDegree.get(g.nodeId) ?? 0) === 0,
      )
      .sort(
        (a, b) =>
          (originalIndex.get(a.nodeId) ?? 0) -
          (originalIndex.get(b.nodeId) ?? 0),
      )

    if (ready.length === 0) {
      // Cycle detected — shouldn't happen with a valid skill graph,
      // but break rather than loop forever.
      break
    }

    for (const gap of ready) {
      sorted.push(gap)
      resolved.add(gap.nodeId)

      // Decrement in-degree for nodes that depend on this one.
      for (const [nodeId, prereqs] of prereqsOf) {
        if (prereqs.includes(gap.nodeId)) {
          inDegree.set(nodeId, (inDegree.get(nodeId) ?? 1) - 1)
        }
      }
    }
  }

  return sorted
}
