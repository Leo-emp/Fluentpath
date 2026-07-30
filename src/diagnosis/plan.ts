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
import type { SkillEdge } from '@/skill-graph/types'

// Default maximum steps in an action plan. Can be overridden.
const DEFAULT_MAX_STEPS = 10

// Estimated minutes per step, keyed by root cause.
// Calibrated for one focused study session per gap.
const TIME_ESTIMATES: Record<RootCause, number> = {
  knowledge: 30, // Study the concept + practice exercises.
  processing: 15, // Timed drills — the concept is known, just slow.
  strategy: 20, // Technique practice with worked examples.
  production: 25, // Output exercises (writing/speaking practice).
}

// Activity descriptions per root cause. Template uses the node title.
const ACTIVITY_TEMPLATES: Record<RootCause, (title: string) => string> = {
  knowledge: (title) =>
    `Study ${title}: review the rules and patterns, then complete targeted practice exercises to build understanding.`,
  processing: (title) =>
    `Speed drill for ${title}: timed practice to build automatic recall — the concept is understood but needs faster access under pressure.`,
  strategy: (title) =>
    `Technique practice for ${title}: work through exam-style tasks focusing on approach, structure, and time management.`,
  production: (title) =>
    `Production practice for ${title}: writing and speaking exercises — the form is recognised but needs active output practice to become producible.`,
}

/**
 * Build an action plan from classified gaps and graph prerequisites.
 *
 * @param gaps      Classified gaps from the classification stage.
 * @param edges     Skill graph prerequisite edges.
 * @param maxSteps  Maximum steps to include (default 10).
 * @returns An ActionPlan with steps in prerequisite-respecting order.
 */
export function buildActionPlan(
  gaps: ClassifiedGap[],
  edges: SkillEdge[],
  maxSteps: number = DEFAULT_MAX_STEPS,
): ActionPlan {
  if (gaps.length === 0) {
    return { steps: [], totalEstimatedMinutes: 0, gapCount: 0 }
  }

  // Collect the set of gap node IDs for prerequisite filtering.
  const gapNodeIds = new Set(gaps.map((g) => g.nodeId))

  // Build a prerequisite map: for each gap node, which other gap
  // nodes are its prerequisites? Only edges where both endpoints
  // are in the gap set matter — external prerequisites are assumed met.
  const prereqsOf = new Map<string, string[]>()
  for (const gap of gaps) {
    prereqsOf.set(gap.nodeId, [])
  }
  for (const edge of edges) {
    if (gapNodeIds.has(edge.fromNodeId) && gapNodeIds.has(edge.toNodeId)) {
      prereqsOf.get(edge.toNodeId)!.push(edge.fromNodeId)
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
    activity: ACTIVITY_TEMPLATES[gap.rootCause](gap.nodeTitle),
    estimatedMinutes: TIME_ESTIMATES[gap.rootCause],
    prerequisiteNodeIds: prereqsOf.get(gap.nodeId) ?? [],
  }))

  const totalEstimatedMinutes = steps.reduce(
    (sum, s) => sum + s.estimatedMinutes,
    0,
  )

  return {
    steps,
    totalEstimatedMinutes,
    gapCount: gaps.length,
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
