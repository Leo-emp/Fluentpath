/**
 * Lexical feature extraction — vocabulary analysis from STT transcript.
 *
 * Computes:
 * - Type-token ratio (TTR): unique words / total words
 * - Vocabulary level profile: what % of words fall at each CEFR level
 * - Lexical density: proportion of content words to total words
 * - Repetition rate: how often words repeat within a 10-word window
 *
 * Uses the existing profiler inventory for CEFR level classification
 * and compromise NLP for part-of-speech tagging (content vs function words).
 */

import nlp from 'compromise'
import { profileText, type ProfilerInventory } from '@/profiler/profile'
import { CEFR_LEVELS } from '@/skill-graph/types'
import type { SttResult, LexicalFeatures } from '../types'

// Content word POS tags from compromise — nouns, verbs, adjectives, adverbs.
// Function words (determiners, prepositions, pronouns, conjunctions) are excluded.
const CONTENT_POS = new Set([
  'Noun', 'Verb', 'Adjective', 'Adverb',
])

/**
 * Extract lexical features from the STT transcript.
 *
 * Takes the transcript text and the profiler inventory (for CEFR level
 * classification). All computation is deterministic.
 */
export function extractLexical(
  stt: SttResult,
  inventory: ProfilerInventory,
): LexicalFeatures {
  const words = stt.transcript
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .map((w) => w.toLowerCase().replace(/[^a-z'-]/g, ''))
    .filter((w) => w.length > 0)

  if (words.length === 0) {
    return {
      typeTokenRatio: 0,
      vocabularyLevelProfile: Object.fromEntries(
        CEFR_LEVELS.map((l) => [l, 0]),
      ),
      lexicalDensity: 0,
      repetitionRate: 0,
    }
  }

  // --- Type-token ratio ---
  // Unique words / total words. Simple but effective for short samples.
  const uniqueWords = new Set(words)
  const typeTokenRatio =
    Math.round((uniqueWords.size / words.length) * 100) / 100

  // --- Vocabulary level profile ---
  // Use the profiler to classify each word by CEFR level, then compute
  // the proportion at each level.
  const profile = profileText(stt.transcript, inventory)
  const totalMatched = CEFR_LEVELS.reduce(
    (sum, level) => sum + profile.counts[level],
    0,
  )
  const vocabularyLevelProfile: Record<string, number> = {}
  for (const level of CEFR_LEVELS) {
    vocabularyLevelProfile[level] =
      totalMatched > 0
        ? Math.round((profile.counts[level] / totalMatched) * 100) / 100
        : 0
  }

  // --- Lexical density ---
  // Proportion of content words (nouns, verbs, adjectives, adverbs)
  // to total words. Uses compromise NLP for POS tagging.
  const doc = nlp(stt.transcript)
  let contentCount = 0
  for (const sentence of doc.json()) {
    for (const term of sentence.terms) {
      const tags: string[] = term.tags ?? []
      if (tags.some((t: string) => CONTENT_POS.has(t))) {
        contentCount++
      }
    }
  }
  const totalTerms = doc.json().reduce(
    (sum: number, s: { terms: unknown[] }) => sum + s.terms.length,
    0,
  )
  const lexicalDensity =
    totalTerms > 0
      ? Math.round((contentCount / totalTerms) * 100) / 100
      : 0

  // --- Repetition rate ---
  // For each word, check if it appeared in the previous 10 words.
  // High repetition suggests limited vocabulary range.
  let repeats = 0
  for (let i = 0; i < words.length; i++) {
    const windowStart = Math.max(0, i - 10)
    for (let j = windowStart; j < i; j++) {
      if (words[j] === words[i]) {
        repeats++
        break // Count each repeated word only once.
      }
    }
  }
  const repetitionRate =
    words.length > 1
      ? Math.round((repeats / words.length) * 100) / 100
      : 0

  return {
    typeTokenRatio,
    vocabularyLevelProfile,
    lexicalDensity,
    repetitionRate,
  }
}
