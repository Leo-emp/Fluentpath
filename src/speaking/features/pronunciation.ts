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

// Phoneme accuracy below this is flagged as mispronounced.
const LOW_PHONEME_ACCURACY = 0.5

/**
 * Extract pronunciation features from STT output.
 *
 * When phoneme-level data is available (Azure Speech, Speechace),
 * provides per-phoneme accuracy. Otherwise falls back to word-level
 * confidence as a proxy.
 *
 * Pure computation — no LLM, no randomness.
 */
export function extractPronunciation(stt: SttResult): PronunciationFeatures {
  if (stt.words.length === 0) {
    return {
      meanWordConfidence: 0,
      lowConfidenceWords: [],
      phonemeAccuracy: null,
      mispronounced: [],
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

  // Phoneme-level analysis when available.
  let phonemeAccuracy: number | null = null
  const mispronounced: Array<{ word: string; phoneme: string; expected: string; accuracy: number }> = []

  if (stt.phonemes && stt.phonemes.length > 0) {
    const totalPhonemeAccuracy = stt.phonemes.reduce(
      (sum, p) => sum + p.accuracy, 0,
    )
    phonemeAccuracy = Math.round((totalPhonemeAccuracy / stt.phonemes.length) * 100) / 100

    for (const p of stt.phonemes) {
      if (p.accuracy < LOW_PHONEME_ACCURACY) {
        mispronounced.push({
          word: p.word,
          phoneme: p.phoneme,
          expected: p.expected,
          accuracy: p.accuracy,
        })
      }
    }
  }

  return {
    meanWordConfidence,
    lowConfidenceWords,
    phonemeAccuracy,
    mispronounced,
  }
}
