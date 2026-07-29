import nlp from 'compromise'
import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import { lemmaCandidates } from './lemmas'

export interface PhraseEntry {
  level: CefrLevel
  /**
   * 1 when a dataset stated the level; below 1 when this project derived it.
   *
   * Derived levels do not contribute to the measured level of a text — see
   * `CONFIDENT_LEVEL_THRESHOLD`.
   */
  confidence: number
}

export interface ProfilerInventory {
  /** headword -> lowest level. All stated by a dataset, so all confident. */
  words: Map<string, CefrLevel>
  /** space-separated phrase -> level and confidence */
  phrases: Map<string, PhraseEntry>
}

export interface ProfiledItem {
  surface: string
  lemma: string
  level: CefrLevel
  isPhrase: boolean
}

export interface ProfileResult {
  totalTokens: number
  matched: number
  counts: Record<CefrLevel, number>
  aboveLevel: ProfiledItem[]
  /**
   * Phrases whose level is an estimate rather than evidence.
   *
   * Reported for review rather than folded into `counts` or `coverageLevel`.
   * These are the phrases whose meaning may not be the sum of their parts —
   * "carry out", "put off" — but the derivation cannot reliably tell those
   * apart from transparent ones like "go to" and "live in", so they are
   * surfaced as a question rather than asserted as a fact.
   */
  uncertainPhrases: ProfiledItem[]
  unmatched: string[]
  properNouns: string[]
  /**
   * Level at which cumulative coverage reaches 90% of confidently matched
   * tokens. Derived phrase levels are excluded, so this figure is only ever
   * as good as the evidence behind it.
   */
  coverageLevel: CefrLevel | null
  unmatchedRate: number
}

/** Longest phrase considered. WordNet multi-word verbs are almost all 2-3. */
const MAX_PHRASE_WORDS = 4

/**
 * Minimum confidence for a level to count toward the measured level of a text.
 *
 * Three tiers sit either side of this line:
 *
 *   1.0   stated by a source dataset          -> counts
 *   0.9   curated phrasal verb list           -> counts
 *   ≤0.7  derived from component words        -> reported, does not count
 *
 * The gap is deliberate. Letting derived levels drive the measurement was
 * tried and produced exactly the failure this guards against: "I live in a
 * small house. I go to school by bus." profiled as B1, because `live in` and
 * `go to` were inflated by an idiomaticity assumption true of "give up" and
 * false of them. Two attempts to tell those cases apart from WordNet data
 * (definition glosses, tagged-sense frequency) both failed, so the common
 * phrasal verbs are curated instead and the long tail stays advisory.
 */
const CONFIDENT_LEVEL_THRESHOLD = 0.8

/**
 * Report what CEFR level a text is, and what sits above a target level.
 *
 * Phrases are matched before single words, longest first. That ordering is the
 * entire point of this module: without it, "carried out" reads as carry (A1)
 * plus out (A1), and a B2 sentence profiles as A2 — approving material two
 * levels too hard while reporting that everything is fine. That defect was
 * measured before this was written.
 */
export function profileText(
  text: string,
  inventory: ProfilerInventory,
  targetLevel?: CefrLevel,
): ProfileResult {
  const counts = Object.fromEntries(CEFR_LEVELS.map((l) => [l, 0])) as Record<CefrLevel, number>
  const aboveLevel: ProfiledItem[] = []
  const uncertainPhrases: ProfiledItem[] = []
  const unmatched: string[] = []
  const properNouns: string[] = []

  // Flatten to one term list. Sentence boundaries do not matter here, and
  // phrases occasionally straddle clause punctuation.
  const terms: Array<{ surface: string; tags: string[] }> = []
  for (const sentence of nlp(text).json()) {
    for (const term of sentence.terms) {
      const raw = term.text ?? ''

      // Tokens containing digits are skipped entirely rather than stripped.
      // Stripping turns "COVID-19" into "COVID-" and "3D" into "D", inventing
      // words that were never in the text and polluting the counts. A token
      // with digits is not vocabulary, so it contributes nothing either way.
      if (/\d/.test(raw)) continue

      const surface = raw.replace(/[^A-Za-z'-]/g, '')
      if (surface) terms.push({ surface, tags: term.tags ?? [] })
    }
  }

  const record = (item: ProfiledItem) => {
    counts[item.level]++
    if (targetLevel && levelIndex(item.level) > levelIndex(targetLevel)) aboveLevel.push(item)
  }

  let i = 0
  while (i < terms.length) {
    const phrase = matchPhraseAt(terms, i, inventory)

    if (phrase) {
      const item: ProfiledItem = {
        surface: phrase.surface,
        lemma: phrase.lemma,
        level: phrase.level,
        isPhrase: true,
      }

      if (phrase.confidence >= CONFIDENT_LEVEL_THRESHOLD) {
        record(item)
      } else {
        // An estimate. Surfaced for review, but never allowed to move the
        // measured level of the text.
        uncertainPhrases.push(item)
      }

      i += phrase.length
      continue
    }

    const term = terms[i]!
    i++

    if (term.tags.includes('ProperNoun')) {
      properNouns.push(term.surface)
      continue
    }

    const single = matchWord(term.surface, term.tags, inventory)
    if (single) record({ ...single, isPhrase: false })
    else unmatched.push(term.surface)
  }

  const matched = CEFR_LEVELS.reduce((sum, l) => sum + counts[l], 0)

  let cumulative = 0
  let coverageLevel: CefrLevel | null = null
  for (const level of CEFR_LEVELS) {
    cumulative += counts[level]
    if (coverageLevel === null && matched > 0 && cumulative / matched >= 0.9) coverageLevel = level
  }

  return {
    totalTokens: terms.length,
    matched,
    counts,
    aboveLevel,
    uncertainPhrases,
    unmatched,
    properNouns,
    coverageLevel,
    unmatchedRate: terms.length ? unmatched.length / terms.length : 0,
  }
}

/**
 * Longest phrase starting at `index`, or null.
 *
 * The head word is lemmatised so inflected phrases match — "carried out" has
 * to find "carry out". Later words are used as written, since particles and
 * prepositions do not inflect.
 */
function matchPhraseAt(
  terms: Array<{ surface: string; tags: string[] }>,
  index: number,
  inventory: ProfilerInventory,
): { surface: string; lemma: string; level: CefrLevel; confidence: number; length: number } | null {
  const maxLength = Math.min(MAX_PHRASE_WORDS, terms.length - index)

  // Longest first, so "look forward to" wins over "look forward".
  for (let length = maxLength; length >= 2; length--) {
    const window = terms.slice(index, index + length)
    const head = window[0]!
    const tail = window.slice(1).map((t) => t.surface.toLowerCase())

    for (const headLemma of lemmaCandidates(head.surface, head.tags)) {
      const candidate = [headLemma, ...tail].join(' ')
      const entry = inventory.phrases.get(candidate)

      if (entry) {
        return {
          surface: window.map((t) => t.surface).join(' '),
          lemma: candidate,
          level: entry.level,
          confidence: entry.confidence,
          length,
        }
      }
    }
  }

  return null
}

/** Lowest level across all lemma candidates for a single word. */
function matchWord(
  surface: string,
  tags: string[],
  inventory: ProfilerInventory,
): { surface: string; lemma: string; level: CefrLevel } | null {
  let best: { lemma: string; level: CefrLevel } | null = null

  for (const candidate of lemmaCandidates(surface, tags)) {
    const level = inventory.words.get(candidate)
    if (!level) continue
    if (!best || levelIndex(level) < levelIndex(best.level)) best = { lemma: candidate, level }
  }

  return best ? { surface, lemma: best.lemma, level: best.level } : null
}
