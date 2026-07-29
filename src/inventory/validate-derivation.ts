import { levelIndex } from '@/skill-graph/types'
import { buildLexicalLookup, deriveMultiwordLevel } from './level-multiword'
import type { LexicalEntry } from './types'

export interface DerivationAccuracy {
  /** Multi-word entries with a stated level that could be measured. */
  total: number
  exact: number
  /** Derived level within one CEFR level of the stated one. */
  withinOne: number
  exactRate: number
  withinOneRate: number
}

/**
 * Measure how accurate the multi-word derivation rule actually is.
 *
 * The vocabulary file contains several hundred multi-word entries that already
 * carry stated CEFR levels — "according to", "air conditioning". Hiding those
 * levels, deriving them from their component words, and comparing gives a real
 * accuracy figure for the same method applied to WordNet phrases, which have
 * no stated level to check against.
 *
 * Without this, derived levels would be unfalsifiable. With it they carry a
 * number, and a bad rule fails loudly instead of quietly mislabelling content.
 */
export function measureDerivationAccuracy(
  entries: LexicalEntry[],
  sampleSize: number,
  seed: number,
): DerivationAccuracy {
  const multiword = entries.filter((e) => e.headword.includes(' '))

  // Single words only, so a phrase is never used to derive itself.
  const lookup = buildLexicalLookup(entries.filter((e) => !e.headword.includes(' ')))

  const sample = seededSample(multiword, sampleSize, seed)

  let exact = 0
  let withinOne = 0

  for (const e of sample) {
    // Idiomaticity is unknown for these, so the neutral setting is used —
    // matching how an unclassified WordNet phrase would be treated.
    const derived = deriveMultiwordLevel(e.headword, lookup)
    const distance = Math.abs(levelIndex(derived.level) - levelIndex(e.level))

    if (distance === 0) exact++
    if (distance <= 1) withinOne++
  }

  const total = sample.length

  return {
    total,
    exact,
    withinOne,
    exactRate: total ? exact / total : 0,
    withinOneRate: total ? withinOne / total : 0,
  }
}

/**
 * Deterministic sample.
 *
 * A seeded generator rather than Math.random, so a disappointing accuracy
 * figure can be reproduced and investigated instead of shifting on every run.
 */
function seededSample<T>(items: T[], size: number, seed: number): T[] {
  if (items.length <= size) return [...items]

  // Mulberry32 — small, fast, entirely adequate for sampling.
  let state = seed >>> 0
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }

  return shuffled.slice(0, size)
}
