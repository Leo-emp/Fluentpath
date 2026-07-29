import nlp from 'compromise'
import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import { lemmaCandidates } from './lemmas'

export interface ProfilerInventory {
  /** headword -> lowest level */
  words: Map<string, CefrLevel>
  /** space-separated phrase -> level */
  phrases: Map<string, CefrLevel>
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
  unmatched: string[]
  properNouns: string[]
  /** Level at which cumulative coverage reaches 90% of matched tokens. */
  coverageLevel: CefrLevel | null
  unmatchedRate: number
}

/** Longest phrase considered. WordNet multi-word verbs are almost all 2-3. */
const MAX_PHRASE_WORDS = 4

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
      record({ surface: phrase.surface, lemma: phrase.lemma, level: phrase.level, isPhrase: true })
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
): { surface: string; lemma: string; level: CefrLevel; length: number } | null {
  const maxLength = Math.min(MAX_PHRASE_WORDS, terms.length - index)

  // Longest first, so "look forward to" wins over "look forward".
  for (let length = maxLength; length >= 2; length--) {
    const window = terms.slice(index, index + length)
    const head = window[0]!
    const tail = window.slice(1).map((t) => t.surface.toLowerCase())

    for (const headLemma of lemmaCandidates(head.surface, head.tags)) {
      const candidate = [headLemma, ...tail].join(' ')
      const level = inventory.phrases.get(candidate)

      if (level) {
        return {
          surface: window.map((t) => t.surface).join(' '),
          lemma: candidate,
          level,
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
