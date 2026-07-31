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
import type { NodeType } from '@/skill-graph/types'

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

// ─── L1 interference rules ──────────────────────────────────────────────

interface L1Rule {
  nodeTypes: NodeType[]
  misconceptionPattern: RegExp
  explanation: string
}

// Keyed by ISO 639-1 language code. Each rule matches a node type and
// a misconception pattern that is predictable from the L1.
const L1_RULES: Record<string, L1Rule[]> = {
  // Thai, Chinese, Japanese, Korean — no article system.
  th: [
    { nodeTypes: ['grammar'], misconceptionPattern: /article|determiner|a\/an|the\b/i, explanation: 'Thai has no articles. Learners often drop or misuse a/an/the because no equivalent exists in L1.' },
    { nodeTypes: ['grammar'], misconceptionPattern: /plural|countable|uncountable/i, explanation: 'Thai nouns have no plural inflection. Learners may omit plural -s or confuse countable/uncountable.' },
    { nodeTypes: ['grammar'], misconceptionPattern: /tense|past.*simple|present.*perfect/i, explanation: 'Thai uses context and particles for time reference, not verb inflection. Tense marking is a common L1 transfer error.' },
  ],
  zh: [
    { nodeTypes: ['grammar'], misconceptionPattern: /article|determiner|a\/an|the\b/i, explanation: 'Chinese has no articles. Learners often drop or misuse a/an/the because no equivalent exists in L1.' },
    { nodeTypes: ['grammar'], misconceptionPattern: /plural|countable|uncountable/i, explanation: 'Chinese nouns have no plural inflection. Learners may omit plural -s or confuse countable/uncountable.' },
    { nodeTypes: ['grammar'], misconceptionPattern: /tense|past.*simple|present.*perfect/i, explanation: 'Chinese uses context and time adverbs rather than verb inflection for tense. Tense errors are a predictable L1 transfer.' },
  ],
  ja: [
    { nodeTypes: ['grammar'], misconceptionPattern: /article|determiner|a\/an|the\b/i, explanation: 'Japanese has no articles. Learners often omit or misuse a/an/the.' },
    { nodeTypes: ['grammar'], misconceptionPattern: /plural|countable/i, explanation: 'Japanese nouns are not inflected for number. Plural marking is a predictable difficulty.' },
    { nodeTypes: ['phono'], misconceptionPattern: /l.*r|r.*l|lateral|rhotic/i, explanation: 'Japanese does not distinguish /l/ and /r/. This is a well-documented L1 phonological transfer.' },
  ],
  ko: [
    { nodeTypes: ['grammar'], misconceptionPattern: /article|determiner|a\/an|the\b/i, explanation: 'Korean has no articles. Learners often omit or misuse a/an/the.' },
    { nodeTypes: ['grammar'], misconceptionPattern: /relative.*clause|word.*order/i, explanation: 'Korean is SOV with relative clauses preceding the noun. English SVO and post-nominal relatives are a common transfer challenge.' },
  ],
  // Arabic — different tense system, no copula in present.
  ar: [
    { nodeTypes: ['grammar'], misconceptionPattern: /tense|present.*perfect|past.*continuous/i, explanation: 'Arabic has a two-tense system (perfect/imperfect). English multi-tense distinctions (simple vs continuous vs perfect) are a predictable L1 transfer difficulty.' },
    { nodeTypes: ['grammar'], misconceptionPattern: /copula|verb.*be|is\/are|subject.*verb/i, explanation: 'Arabic drops the copula in present tense ("He tall" = valid). Learners often omit "is/are" in English.' },
  ],
  // Spanish — false cognates, ser/estar, subjunctive.
  es: [
    { nodeTypes: ['grammar'], misconceptionPattern: /present.*perfect|simple.*past/i, explanation: 'Spanish present perfect usage differs from English. Learners may overuse present perfect where English prefers past simple.' },
    { nodeTypes: ['lexical'], misconceptionPattern: /false.*friend|false.*cognate|embarr/i, explanation: 'Spanish–English false cognates (e.g. "embarrassed" vs "embarazada") cause predictable lexical confusion.' },
  ],
}

/**
 * Check whether an L1 interference rule matches a weak node and its outcomes.
 */
function matchL1Rule(
  l1: string,
  weak: WeakNode,
  outcomes: NodeOutcome[],
): string | null {
  const rules = L1_RULES[l1]
  if (!rules) return null

  for (const rule of rules) {
    if (!rule.nodeTypes.includes(weak.nodeType)) continue

    // Check node title/ID for the pattern.
    if (rule.misconceptionPattern.test(weak.nodeTitle) || rule.misconceptionPattern.test(weak.nodeId)) {
      return rule.explanation
    }

    // Check misconceptions from incorrect outcomes.
    for (const outcome of outcomes) {
      if (outcome.nodeId !== weak.nodeId) continue
      if (outcome.selectedMisconception && rule.misconceptionPattern.test(outcome.selectedMisconception)) {
        return rule.explanation
      }
    }
  }

  return null
}

// ─── Classification ─────────────────────────────────────────────────────

export interface ClassifyOptions {
  // Learner's first language (ISO 639-1 code). When provided, matched
  // against L1 interference rules for targeted evidence.
  l1?: string | null
}

/**
 * Classify each weak node's root cause.
 *
 * @param weakNodes  Ranked weak nodes from the ranking stage.
 * @param outcomes   All node outcomes from the attribution stage.
 * @param options    Optional — pass l1 to enable L1 interference detection.
 * @returns ClassifiedGaps in the same order as weakNodes.
 */
export function classifyGaps(
  weakNodes: WeakNode[],
  outcomes: NodeOutcome[],
  options?: ClassifyOptions,
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

  const l1 = options?.l1 ?? null

  return weakNodes.map((weak) => {
    const nodeOutcomes = outcomesByNode.get(weak.nodeId) ?? []
    const { rootCause, evidence } = classify(weak, nodeOutcomes, medianLatency)

    const l1Interference = l1 ? matchL1Rule(l1, weak, outcomes) : null

    return {
      nodeId: weak.nodeId,
      nodeTitle: weak.nodeTitle,
      nodeType: weak.nodeType,
      level: weak.level,
      skill: weak.skill,
      rootCause,
      evidence: l1Interference ? `${evidence} [L1 transfer: ${l1Interference}]` : evidence,
      accuracy: weak.accuracy,
      meanLatencyMs: weak.meanLatencyMs,
      impact: weak.impact,
      rank: weak.rank,
      l1Interference,
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

/**
 * Detect confusable pairs — recurring misconception patterns that
 * reveal the learner keeps making the SAME kind of mistake.
 *
 * E.g. repeatedly choosing present-perfect distractors on past-simple
 * items means "confuses present perfect with past simple", not just
 * "past simple is weak".
 */
export interface ConfusablePair {
  nodeId: string
  misconception: string
  count: number
}

export function detectConfusablePairs(outcomes: NodeOutcome[]): ConfusablePair[] {
  // Count misconception occurrences per node.
  const counts = new Map<string, Map<string, number>>()

  for (const outcome of outcomes) {
    if (outcome.correct || !outcome.selectedMisconception) continue
    const nodeMap = counts.get(outcome.nodeId) ?? new Map()
    const current = nodeMap.get(outcome.selectedMisconception) ?? 0
    nodeMap.set(outcome.selectedMisconception, current + 1)
    counts.set(outcome.nodeId, nodeMap)
  }

  const pairs: ConfusablePair[] = []
  for (const [nodeId, misconceptions] of counts) {
    for (const [misconception, count] of misconceptions) {
      // Only report if the same misconception appears 2+ times —
      // once could be a guess, twice is a pattern.
      if (count >= 2) {
        pairs.push({ nodeId, misconception, count })
      }
    }
  }

  return pairs.sort((a, b) => b.count - a.count)
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
