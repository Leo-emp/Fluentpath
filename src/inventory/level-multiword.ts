import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { LexicalEntry } from './types'

export type LexicalLookup = Map<string, CefrLevel>

/** Headword to its lowest level across all parts of speech. */
export function buildLexicalLookup(entries: LexicalEntry[]): LexicalLookup {
  const lookup: LexicalLookup = new Map()

  for (const e of entries) {
    const existing = lookup.get(e.headword)
    if (!existing || levelIndex(e.level) < levelIndex(existing)) {
      lookup.set(e.headword, e.level)
    }
  }

  return lookup
}

/** Used when not one component word is known — the least-wrong default. */
const UNKNOWN_FALLBACK: CefrLevel = 'B1'

/**
 * How far above its components an idiomatic phrase sits.
 *
 * Two, not one. Phrasal verbs are built from the commonest words in English
 * and are still hard — "give up" is two A1 words that Cambridge places at B1.
 * A one-level boost was tried first and left the acceptance sentences scoring
 * A2, which is the very defect this exists to fix.
 */
const IDIOMATIC_BOOST = 2

/**
 * Derive a CEFR level for a multi-word phrase.
 *
 * WordNet supplies phrases without levels, so one must be computed. Two
 * signals are available offline and behave deterministically:
 *
 *   1. Component difficulty — a phrase is at least as hard as its hardest word.
 *   2. Idiomaticity — when the meaning is not the sum of its parts, the learner
 *      must acquire it as a separate item, so it is harder than the components
 *      suggest. "give up" is two A1 words meaning "quit".
 *
 * Confidence is always below 1: these are estimates. `measureDerivationAccuracy`
 * quantifies how good they actually are rather than leaving it to assertion.
 */
export function deriveMultiwordLevel(
  phrase: string,
  lookup: LexicalLookup,
  opts: { idiomatic?: boolean } = {},
): { level: CefrLevel; confidence: number } {
  const words = phrase.toLowerCase().split(/\s+/).filter(Boolean)

  const known: CefrLevel[] = []
  for (const w of words) {
    const level = lookup.get(w)
    if (level) known.push(level)
  }

  if (known.length === 0) {
    return { level: UNKNOWN_FALLBACK, confidence: 0.2 }
  }

  // Hardest component sets the floor.
  let base = known[0]!
  for (const level of known) {
    if (levelIndex(level) > levelIndex(base)) base = level
  }

  // Idiomatic phrases must be learned as whole units, so they sit above what
  // their parts imply. Clamped so C2 cannot overflow.
  let index = levelIndex(base)
  if (opts.idiomatic) index = Math.min(index + IDIOMATIC_BOOST, CEFR_LEVELS.length - 1)

  // Derived levels never claim full confidence. Complete component coverage
  // caps at 0.7; partial coverage scales down proportionally.
  const coverage = known.length / words.length
  const confidence = Number((0.7 * coverage).toFixed(2))

  return { level: CEFR_LEVELS[index]!, confidence }
}
