/**
 * Root-cause classification — the step competitors skip.
 *
 * Spec §3.5: "Distinguish knowledge / processing / strategy / production
 * gaps. These four require completely different remedies. Telling a
 * processing-gap learner to study more grammar is why people plateau."
 *
 * The classification logic (order matters — first match wins):
 *
 * 1. **Strategy** — if the node type is 'strategy', the gap is always
 *    strategic. Strategy nodes represent task/exam techniques, not
 *    language knowledge.
 *
 * 2. **Production** — if the learner is correct on receptive items
 *    (listening/reading) but incorrect on productive items
 *    (writing/speaking) for the same node. They recognise it but
 *    can't produce it.
 *
 * 3. **Processing** — if accuracy is moderate (they do get it right
 *    sometimes) but latency is significantly above the median.
 *    They know it but can't access it quickly under time pressure.
 *
 * 4. **Knowledge** — the default when none of the above apply.
 *    The structure or word simply isn't known.
 */

import type { NodeOutcome, WeakNode, ClassifiedGap, RootCause } from './types'
import type { SectionSkill } from '@/mock-test/types'

// A response is "slow" if it exceeds this multiple of the median
// latency across all outcomes. 2× means twice as slow as typical.
const SLOW_LATENCY_MULTIPLIER = 2.0

// Minimum accuracy for a processing gap. Below this, it's more likely
// a knowledge gap — they're not just slow, they don't know it.
const PROCESSING_MIN_ACCURACY = 0.3

// A production gap requires this minimum proportion of receptive
// items to be correct. If they're wrong on receptive items too,
// it's a knowledge gap, not a production gap.
const PRODUCTION_RECEPTIVE_THRESHOLD = 0.6

// Receptive skills (recognising language).
const RECEPTIVE_SKILLS: SectionSkill[] = ['listening', 'reading']
// Productive skills (producing language).
const PRODUCTIVE_SKILLS: SectionSkill[] = ['writing', 'speaking']

/**
 * Classify each weak node's root cause.
 *
 * @param weakNodes  Ranked weak nodes from the ranking stage.
 * @param outcomes   All node outcomes from the attribution stage.
 * @returns ClassifiedGaps in the same order as weakNodes.
 */
export function classifyGaps(
  weakNodes: WeakNode[],
  outcomes: NodeOutcome[],
): ClassifiedGap[] {
  // Group outcomes by nodeId for fast lookup.
  const outcomesByNode = new Map<string, NodeOutcome[]>()
  for (const outcome of outcomes) {
    const list = outcomesByNode.get(outcome.nodeId) ?? []
    list.push(outcome)
    outcomesByNode.set(outcome.nodeId, list)
  }

  // Compute median latency across all outcomes for the processing check.
  const allLatencies = outcomes
    .map((o) => o.latencyMs)
    .sort((a, b) => a - b)
  const medianLatency =
    allLatencies.length > 0
      ? allLatencies[Math.floor(allLatencies.length / 2)]!
      : 5000

  return weakNodes.map((weak) => {
    const nodeOutcomes = outcomesByNode.get(weak.nodeId) ?? []
    const { rootCause, evidence } = classify(weak, nodeOutcomes, medianLatency)

    return {
      nodeId: weak.nodeId,
      nodeTitle: weak.nodeTitle,
      nodeType: weak.nodeType,
      level: weak.level,
      skill: weak.skill,
      rootCause,
      evidence,
      accuracy: weak.accuracy,
      meanLatencyMs: weak.meanLatencyMs,
      impact: weak.impact,
      rank: weak.rank,
    }
  })
}

/**
 * Classify a single weak node. Returns the root cause and a
 * human-readable evidence string explaining the classification.
 */
function classify(
  weak: WeakNode,
  outcomes: NodeOutcome[],
  medianLatency: number,
): { rootCause: RootCause; evidence: string } {
  // 1. Strategy nodes are always strategy gaps.
  if (weak.nodeType === 'strategy') {
    return {
      rootCause: 'strategy',
      evidence: `Strategy node with ${formatPercent(weak.accuracy)} accuracy. Task/exam technique needs targeted practice.`,
    }
  }

  // 2. Check for production gap: receptive correct, productive incorrect.
  const productionResult = checkProductionGap(outcomes)
  if (productionResult !== null) {
    return productionResult
  }

  // 3. Check for processing gap: moderate accuracy but slow.
  if (
    weak.accuracy >= PROCESSING_MIN_ACCURACY &&
    weak.meanLatencyMs > medianLatency * SLOW_LATENCY_MULTIPLIER
  ) {
    return {
      rootCause: 'processing',
      evidence: `${formatPercent(weak.accuracy)} accuracy but mean response time ${formatMs(weak.meanLatencyMs)} is ${formatMultiple(weak.meanLatencyMs / medianLatency)} the median (${formatMs(medianLatency)}). Known but too slow under time pressure.`,
    }
  }

  // 4. Default: knowledge gap.
  return {
    rootCause: 'knowledge',
    evidence: `${formatPercent(weak.accuracy)} accuracy across ${weak.totalAttempts} attempts. The structure or concept is not yet learned.`,
  }
}

/**
 * Check whether the learner recognises the item (receptive correct)
 * but can't produce it (productive incorrect).
 *
 * Returns null if there's insufficient cross-skill evidence.
 */
function checkProductionGap(
  outcomes: NodeOutcome[],
): { rootCause: RootCause; evidence: string } | null {
  const receptive = outcomes.filter((o) =>
    RECEPTIVE_SKILLS.includes(o.skill),
  )
  const productive = outcomes.filter((o) =>
    PRODUCTIVE_SKILLS.includes(o.skill),
  )

  // Need evidence from both sides to make this call.
  if (receptive.length === 0 || productive.length === 0) return null

  const receptiveAccuracy =
    receptive.filter((o) => o.correct).length / receptive.length
  const productiveAccuracy =
    productive.filter((o) => o.correct).length / productive.length

  if (
    receptiveAccuracy >= PRODUCTION_RECEPTIVE_THRESHOLD &&
    productiveAccuracy < PRODUCTION_RECEPTIVE_THRESHOLD
  ) {
    return {
      rootCause: 'production',
      evidence: `Receptive accuracy ${formatPercent(receptiveAccuracy)} vs productive accuracy ${formatPercent(productiveAccuracy)}. Recognises the form but cannot produce it.`,
    }
  }

  return null
}

// Formatting helpers for human-readable evidence strings.
function formatPercent(n: number): string {
  return `${Math.round(n * 100)}%`
}

function formatMs(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`
}

function formatMultiple(n: number): string {
  return `${n.toFixed(1)}×`
}
