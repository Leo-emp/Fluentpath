/**
 * Grammar feature extraction — structural analysis from STT transcript.
 *
 * Computes:
 * - Structures attempted: approximate clause count (splitting on
 *   conjunctions, relative pronouns, and sentence boundaries)
 * - Structures accurate: clauses without low-confidence regions
 * - Mean length of utterance (MLU): words per clause
 * - Error density: ratio of low-confidence word clusters to total words
 *
 * This is an approximation — accurate grammar checking requires a
 * dedicated parser or grammar checker. But these metrics are still
 * useful for tracking improvement over time and comparing to CEFR
 * benchmarks (e.g. B1 learners typically produce ~7 words per T-unit).
 */

import type { SttResult, GrammarFeatures } from '../types'

// Words that typically mark clause boundaries in spoken English.
// We split the transcript at these points to approximate clause count.
const CLAUSE_MARKERS = new Set([
  'and', 'but', 'because', 'so', 'although', 'while', 'when',
  'if', 'that', 'which', 'who', 'where', 'however', 'therefore',
  'whereas', 'unless', 'since', 'after', 'before',
])

// Confidence below this threshold suggests the word was unclear —
// a proxy for pronunciation/grammar errors in the absence of a
// dedicated grammar checker.
const ERROR_CONFIDENCE_THRESHOLD = 0.6

/**
 * Extract grammar features from STT output.
 *
 * Uses word timings for error proxy (low-confidence regions) and the
 * transcript for clause boundary estimation.
 */
export function extractGrammar(stt: SttResult): GrammarFeatures {
  if (stt.words.length === 0) {
    return {
      structuresAttempted: 0,
      structuresAccurate: 0,
      meanLengthOfUtterance: 0,
      errorDensity: 0,
    }
  }

  // Split transcript into approximate clauses by counting clause markers
  // and sentence-ending punctuation.
  const words = stt.transcript
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .map((w) => w.toLowerCase().replace(/[^a-z'-]/g, ''))
    .filter((w) => w.length > 0)

  // Count clause boundaries: each clause marker starts a new clause,
  // plus we always have at least one clause if there are words.
  let clauseCount = 1
  for (const word of words) {
    if (CLAUSE_MARKERS.has(word)) {
      clauseCount++
    }
  }

  // Also count sentence-ending punctuation in the raw transcript
  // as clause boundaries (the STT may include periods/question marks).
  const sentenceEnds = (stt.transcript.match(/[.!?]+/g) || []).length
  // Each sentence end beyond the first adds a clause.
  if (sentenceEnds > 1) {
    clauseCount += sentenceEnds - 1
  }

  const structuresAttempted = clauseCount

  // Mean length of utterance: words per clause.
  const meanLengthOfUtterance =
    clauseCount > 0
      ? Math.round((words.length / clauseCount) * 10) / 10
      : 0

  // Error density: proportion of words with low STT confidence.
  // This is a crude proxy — low confidence often means the word was
  // unclear, which correlates with grammar errors in non-native speech.
  const lowConfWords = stt.words.filter(
    (w) => w.confidence < ERROR_CONFIDENCE_THRESHOLD,
  )
  const errorDensity =
    stt.words.length > 0
      ? Math.round((lowConfWords.length / stt.words.length) * 100) / 100
      : 0

  // Structures accurate: clauses that don't contain any low-confidence
  // words. Approximated by: total clauses minus the number of clauses
  // containing at least one low-confidence word.
  // For simplicity, we estimate: if X% of words are low-confidence,
  // then roughly X% of clauses contain an error.
  const errorRate = lowConfWords.length / stt.words.length
  const errorClauses = Math.round(clauseCount * errorRate)
  const structuresAccurate = Math.max(0, clauseCount - errorClauses)

  return {
    structuresAttempted,
    structuresAccurate,
    meanLengthOfUtterance,
    errorDensity,
  }
}
