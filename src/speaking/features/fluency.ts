/**
 * Fluency feature extraction — pure deterministic computation from
 * STT word timings.
 *
 * Spec §3.3: "The measurable is measured; the LLM only judges what
 * genuinely requires judgment." These features are NEVER guessed by
 * the model — they are computed here and passed to the LLM as facts.
 *
 * Key metrics:
 * - Speech rate (wpm): words per minute including pauses
 * - Articulation rate (wpm): words per minute excluding pauses
 * - Pause count/duration: gaps > 250ms between words
 * - Filler count: um, uh, er, erm, like, you know
 * - Mean length of run: average words between pauses (higher = more fluent)
 */

import type { SttResult, FluencyFeatures } from '../types'

// Fillers are common hesitation markers in English. Detected by exact
// match (case-insensitive). Multi-word fillers like "you know" can't
// be detected from single-word STT output, so they're excluded — the
// STT service tokenises them as separate words.
const FILLERS = new Set([
  'um', 'uh', 'er', 'erm', 'hmm', 'mm',
])

// A pause is a gap between consecutive words longer than this threshold.
// 250ms is the standard threshold in fluency research (Skehan 2009,
// de Jong & Perfetti 2011). Shorter gaps are normal articulation gaps.
const PAUSE_THRESHOLD_MS = 250

/**
 * Extract fluency features from STT word timings.
 *
 * Takes the full SttResult (needs word timings and duration).
 * Returns a FluencyFeatures object with all metrics computed
 * deterministically — no randomness, no LLM calls.
 */
export function extractFluency(stt: SttResult): FluencyFeatures {
  // Edge case: no words at all (empty recording or silence).
  if (stt.words.length === 0) {
    return {
      speechRateWpm: 0,
      articulationRateWpm: 0,
      pauseCount: 0,
      meanPauseDurationMs: 0,
      fillerCount: 0,
      falseStartCount: 0,
      meanLengthOfRunWords: 0,
    }
  }

  // Count filler words.
  const fillerCount = stt.words.filter(
    (w) => FILLERS.has(w.word.toLowerCase()),
  ).length

  // "Real" words are non-fillers — these are what we count for rate.
  const realWordCount = stt.words.length - fillerCount

  // Speech rate: real words per minute based on TOTAL duration
  // (including pauses). This is the overall communicative rate.
  const durationMinutes = stt.durationMs / 60_000
  const speechRateWpm =
    durationMinutes > 0 ? Math.round(realWordCount / durationMinutes) : 0

  // Find pauses: gaps between consecutive words > threshold.
  const pauses: number[] = []
  for (let i = 1; i < stt.words.length; i++) {
    const gap = stt.words[i]!.startMs - stt.words[i - 1]!.endMs
    if (gap > PAUSE_THRESHOLD_MS) {
      pauses.push(gap)
    }
  }

  const pauseCount = pauses.length
  const totalPauseMs = pauses.reduce((sum, p) => sum + p, 0)
  const meanPauseDurationMs =
    pauseCount > 0 ? Math.round(totalPauseMs / pauseCount) : 0

  // Articulation rate: real words per minute of SPEAKING time only
  // (total duration minus pauses). This isolates speech production
  // speed from planning time.
  const speakingTimeMs = stt.durationMs - totalPauseMs
  const speakingTimeMinutes = speakingTimeMs / 60_000
  const articulationRateWpm =
    speakingTimeMinutes > 0
      ? Math.round(realWordCount / speakingTimeMinutes)
      : 0

  // Mean length of run: average number of real words between pauses.
  // Split the word sequence at each pause to get "runs", then average.
  // Higher = more fluent (fewer pauses interrupting speech).
  const runs: number[] = []
  let currentRun = 0
  for (let i = 0; i < stt.words.length; i++) {
    // Only count real words (not fillers) in run length.
    if (!FILLERS.has(stt.words[i]!.word.toLowerCase())) {
      currentRun++
    }
    // Check if there's a pause AFTER this word (before the next).
    if (i < stt.words.length - 1) {
      const gap = stt.words[i + 1]!.startMs - stt.words[i]!.endMs
      if (gap > PAUSE_THRESHOLD_MS) {
        if (currentRun > 0) runs.push(currentRun)
        currentRun = 0
      }
    }
  }
  // Don't forget the last run (no pause after the last word).
  if (currentRun > 0) runs.push(currentRun)

  const meanLengthOfRunWords =
    runs.length > 0
      ? Math.round(
          (runs.reduce((sum, r) => sum + r, 0) / runs.length) * 10,
        ) / 10
      : 0

  return {
    speechRateWpm,
    articulationRateWpm,
    pauseCount,
    meanPauseDurationMs,
    fillerCount,
    // False start detection requires comparing abandoned word fragments
    // against completed words — more sophisticated than word-level STT
    // provides. Deferred until we have a service that supports it.
    falseStartCount: 0,
    meanLengthOfRunWords,
  }
}
