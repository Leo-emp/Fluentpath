/**
 * Speaking assessment type definitions.
 *
 * These types form the contract between every module in the speaking
 * assessment pipeline: task definitions, rubric engine, feature extraction,
 * scoring prompt, parser, feedback gates, and the score-and-retry loop.
 *
 * The key architectural decision (spec §3.3): objective speech features
 * (fluency, lexis, grammar, pronunciation) are computed DETERMINISTICALLY
 * from STT output — the LLM never guesses them. The LLM only judges what
 * genuinely requires judgment (coherence, discourse management, task
 * fulfilment), and it does so WITH the measurements in front of it.
 */

import type { CefrLevel } from '@/skill-graph/types'
import type { CriterionScore, GroupedIssue, WritingRubric } from '@/writing/types'

// Reuse the writing rubric structure — the shape is identical
// (criteria + band descriptors + weighted scoring). Speaking rubrics
// have different criteria names but the same data shape.
export type SpeakingRubric = WritingRubric

// ---------------------------------------------------------------------------
// Speaking tasks — what the learner is asked to say
// ---------------------------------------------------------------------------

export interface SpeakingTask {
  id: string

  // The kind of speaking task. Determines UI presentation, prep time,
  // and which rubric to use.
  type:
    | 'describe_image'  // Describe a visual — CEFR A2+, PTE
    | 'read_aloud'      // Read text aloud — PTE
    | 'short_answer'    // Brief response — CEFR A1-A2, IELTS Part 1
    | 'long_turn'       // Extended monologue — CEFR B1+, IELTS Part 2
    | 'discussion'      // Argue a position — CEFR B2+, IELTS Part 3
    | 'retell_lecture'  // Summarise what was heard — PTE
    | 'role_play'       // Simulated interaction — OET

  // CEFR level this task is pitched at.
  level: CefrLevel

  // Which exam context this belongs to.
  exam: 'cefr' | 'ielts_speaking' | 'pte_speaking' | 'oet_speaking'

  // The prompt shown to the learner.
  prompt: string

  // How long the learner has to speak (seconds).
  timeLimitSeconds: number

  // Preparation time before recording starts (null = no prep time).
  // IELTS Part 1 has no prep; Part 2 has 60s; PTE Read Aloud has 30s.
  prepTimeSeconds: number | null

  // Which rubric to score against.
  rubricId: string
}

// ---------------------------------------------------------------------------
// Learner response — audio metadata
// ---------------------------------------------------------------------------

export interface SpeakingResponse {
  taskId: string
  // In production: a URL or blob reference to the audio file.
  // In tests: an empty string (we work from SttResult fixtures).
  audioRef: string
  submittedAt: number
  durationMs: number
}

// ---------------------------------------------------------------------------
// STT output — word-level timings, confidence, and optional phonemes
// ---------------------------------------------------------------------------

/**
 * One word from the STT transcript with timing and confidence.
 * Every STT service must provide at least this level of detail —
 * it's how we compute fluency features deterministically.
 */
export interface SttWord {
  word: string
  startMs: number
  endMs: number
  // Per-word confidence from the STT service (0.0–1.0).
  confidence: number
}

/**
 * Phoneme-level pronunciation data. Only available from services
 * that support pronunciation assessment (e.g. Azure Speech, Speechace).
 */
export interface SttPhoneme {
  phoneme: string
  // IPA representation of the expected phoneme.
  expected: string
  // Accuracy score from the pronunciation service (0.0–1.0).
  accuracy: number
  // Which word this phoneme belongs to.
  word: string
}

/**
 * Complete STT output for one recording. This is the input to the
 * entire speaking assessment pipeline — everything downstream works
 * from this structure, never from raw audio.
 */
export interface SttResult {
  transcript: string
  words: SttWord[]
  durationMs: number
  // Null when the STT service doesn't provide phoneme-level scores.
  phonemes: SttPhoneme[] | null
}

// ---------------------------------------------------------------------------
// Objective speech features — computed deterministically, NEVER by LLM
// ---------------------------------------------------------------------------

export interface FluencyFeatures {
  // Words per minute, including pauses (overall rate).
  speechRateWpm: number
  // Words per minute, excluding pauses (pure speaking time).
  articulationRateWpm: number
  // Number of pauses > 250ms (Skehan 2009 threshold).
  pauseCount: number
  // Average pause duration in ms.
  meanPauseDurationMs: number
  // Count of filler words (um, uh, er, erm, like, you know).
  fillerCount: number
  // Count of false starts (abandoned words/phrases).
  falseStartCount: number
  // Average number of words between pauses — higher = more fluent.
  meanLengthOfRunWords: number
}

export interface LexicalFeatures {
  // Type-token ratio (unique words / total words). Higher = more varied.
  typeTokenRatio: number
  // What proportion of vocabulary falls at each CEFR level.
  vocabularyLevelProfile: Record<string, number>
  // Proportion of content words (nouns, verbs, adjectives, adverbs)
  // to total words. Academic speech has higher density (~0.5).
  lexicalDensity: number
  // Proportion of words that repeat a word from the previous 10 words.
  repetitionRate: number
}

export interface GrammarFeatures {
  // How many distinct grammatical structures the learner attempted.
  structuresAttempted: number
  // How many of those were used accurately.
  structuresAccurate: number
  // Average words per T-unit (clause). Higher = more complex syntax.
  meanLengthOfUtterance: number
  // Errors per word. Lower = more accurate.
  errorDensity: number
}

export interface PronunciationFeatures {
  // Average STT confidence across all words (0.0–1.0).
  meanWordConfidence: number
  // Words where confidence dropped below 0.6 — likely mispronounced.
  lowConfidenceWords: Array<{
    word: string
    confidence: number
    startMs: number
    endMs: number
  }>
}

/**
 * All four feature groups in one object. This is what the scoring
 * prompt receives alongside the transcript, so the LLM has the
 * measurements in front of it when scoring.
 */
export interface SpeechFeatures {
  fluency: FluencyFeatures
  lexical: LexicalFeatures
  grammar: GrammarFeatures
  pronunciation: PronunciationFeatures
}

// ---------------------------------------------------------------------------
// Speaking score — the complete result of scoring a spoken response
// ---------------------------------------------------------------------------

export interface SpeakingScore {
  taskId: string
  overallScore: number
  maxOverallScore: number
  criterionScores: CriterionScore[]
  groupedIssues: GroupedIssue[]
  // The objective features, reported alongside the score so the
  // learner sees exactly what was measured — not just a band number.
  features: SpeechFeatures
  // The transcript, so feedback can reference specific words.
  transcript: string
  durationMs: number
  level: CefrLevel
}

// ---------------------------------------------------------------------------
// Filter for listing tasks
// ---------------------------------------------------------------------------

export interface TaskFilter {
  level?: CefrLevel
  exam?: SpeakingTask['exam']
  type?: SpeakingTask['type']
}
