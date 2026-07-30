/**
 * Pronunciation feature extraction — confidence-based analysis from
 * STT word-level data.
 *
 * Uses per-word confidence scores as a proxy for pronunciation accuracy.
 * Words below the confidence threshold (0.6) are flagged as likely
 * mispronounced — the STT service was uncertain about what was said.
 *
 * When phoneme-level data is available (from services like Azure Speech
 * or Speechace), it's reported directly. When it's not, word confidence
 * is the best available signal.
 */

import type { SttResult, PronunciationFeatures } from '../types'

// Words below this confidence threshold are flagged.
// 0.6 is chosen empirically: above this, the word is almost certainly
// correct; below it, the STT service was genuinely uncertain.
const LOW_CONFIDENCE_THRESHOLD = 0.6

/**
 * Extract pronunciation features from STT word-level confidence scores.
 *
 * Pure computation — no LLM, no randomness. The flagged words give the
 * learner specific pronunciation targets.
 */
export function extractPronunciation(stt: SttResult): PronunciationFeatures {
  if (stt.words.length === 0) {
    return {
      meanWordConfidence: 0,
      lowConfidenceWords: [],
    }
  }

  // Mean confidence across all words.
  const totalConfidence = stt.words.reduce(
    (sum, w) => sum + w.confidence,
    0,
  )
  const meanWordConfidence =
    Math.round((totalConfidence / stt.words.length) * 100) / 100

  // Flag words below the threshold — these are likely mispronounced.
  const lowConfidenceWords = stt.words
    .filter((w) => w.confidence < LOW_CONFIDENCE_THRESHOLD)
    .map((w) => ({
      word: w.word,
      confidence: w.confidence,
      startMs: w.startMs,
      endMs: w.endMs,
    }))

  return {
    meanWordConfidence,
    lowConfidenceWords,
  }
}
