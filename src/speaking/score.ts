/**
 * Speaking score-and-feedback loop — the main entry point for speaking
 * assessment.
 *
 * Orchestrates the full pipeline:
 *   1. Extract objective features deterministically from STT output
 *   2. Build the scoring prompt (transcript + features + rubric)
 *   3. Send to LLM via the provider interface
 *   4. Parse the structured output (reuses writing's parseScoringOutput)
 *   5. Run feedback quality gates (reuses writing's checkFeedbackQuality)
 *   6. Retry up to MAX_RETRIES on parse or gate failure
 *   7. Assemble final SpeakingScore with features included
 *
 * The function takes an already-transcribed SttResult rather than raw
 * audio. The STT call happens at a different layer (API route / client),
 * which keeps the scoring engine testable without audio files.
 */

import type { GenerationProvider } from '@/generation/provider'
import type { ProfilerInventory } from '@/profiler/profile'
import type { SpeakingTask, SttResult, SpeakingScore, SpeechFeatures } from './types'
import { getSpeakingRubric } from './rubrics'
import { extractAllFeatures } from './features/extract'
import { buildSpeakingScoringPrompt } from './prompt'
import { parseScoringOutput, type ParsedScore } from '@/writing/parse-score'
import { checkFeedbackQuality } from '@/writing/feedback-gates'
import { computeOverallScore } from '@/writing/rubrics'

// Match the writing pipeline: 3 retries (4 total attempts).
const MAX_RETRIES = 3

// Speaking scoring output tends to be even longer than writing because
// the prompt includes computed features the model must reference.
const MAX_TOKENS = 2048

export interface ScoreSpeakingResult {
  // The complete score with features, or null if all attempts failed.
  score: SpeakingScore | null
  // How many LLM calls were made.
  attempts: number
  // Feedback quality issues from the last attempt (for diagnostics).
  feedbackIssues: string[]
}

/**
 * Score a spoken response against the appropriate rubric.
 *
 * Returns a ScoreSpeakingResult with the complete score (or null on
 * failure), the number of LLM attempts, and any feedback quality
 * issues encountered.
 *
 * The objective features (fluency, lexis, grammar, pronunciation)
 * are computed once from the STT output and included in both the
 * prompt to the LLM and the final result. This makes every metric
 * reproducible and explainable.
 */
export async function scoreSpeaking(
  provider: GenerationProvider,
  sttResult: SttResult,
  task: SpeakingTask,
  inventory: ProfilerInventory,
): Promise<ScoreSpeakingResult> {
  // Look up the rubric for this task.
  const rubric = getSpeakingRubric(task.rubricId)
  if (!rubric) {
    return {
      score: null,
      attempts: 0,
      feedbackIssues: [`Unknown rubric: ${task.rubricId}`],
    }
  }

  // Edge case: empty transcript (silence or no speech detected).
  if (sttResult.words.length === 0) {
    return {
      score: null,
      attempts: 0,
      feedbackIssues: ['Empty transcript — no speech detected'],
    }
  }

  // Step 1: Extract objective features ONCE (deterministic).
  const features = extractAllFeatures(sttResult, inventory)

  // Step 2: Build the prompt (includes transcript + features + rubric).
  const prompt = buildSpeakingScoringPrompt(
    sttResult,
    features,
    task,
    rubric,
    inventory,
  )

  // Step 3: Score-and-retry loop (same pattern as writing).
  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    const llmResponse = await provider.generate({
      prompt,
      maxTokens: MAX_TOKENS,
    })

    // Stage 1: Parse the structured output. Reuses the writing parser
    // because the JSON shape is identical (criterion scores + evidence
    // spans + grouped issues).
    const parsed = parseScoringOutput(
      llmResponse.raw,
      rubric,
      sttResult.transcript,
    )
    if (!parsed) continue

    // Stage 2: Run feedback quality gates. Same gates as writing —
    // evidence required, no generic phrases, priority layering.
    const feedbackReview = checkFeedbackQuality(parsed, task.level, inventory)

    if (!feedbackReview.passed) {
      // On the last attempt, return imperfect feedback rather than nothing.
      if (attempt === MAX_RETRIES + 1) {
        return {
          score: assembleScore(parsed, features, sttResult, task, rubric),
          attempts: attempt,
          feedbackIssues: feedbackReview.issues,
        }
      }
      continue
    }

    // All checks passed — return the clean result.
    return {
      score: assembleScore(parsed, features, sttResult, task, rubric),
      attempts: attempt,
      feedbackIssues: [],
    }
  }

  // All attempts failed — parse errors every time.
  return {
    score: null,
    attempts: MAX_RETRIES + 1,
    feedbackIssues: [],
  }
}

/**
 * Assemble the final SpeakingScore from parsed data and computed features.
 *
 * Unlike WritingScore, SpeakingScore includes the objective features and
 * the transcript — so the learner sees exactly what was measured alongside
 * the LLM's assessment.
 */
function assembleScore(
  parsed: ParsedScore,
  features: SpeechFeatures,
  sttResult: SttResult,
  task: SpeakingTask,
  rubric: NonNullable<ReturnType<typeof getSpeakingRubric>>,
): SpeakingScore {
  return {
    taskId: task.id,
    overallScore: computeOverallScore(parsed.criterionScores, rubric),
    maxOverallScore: rubric.scoreRange.max,
    criterionScores: parsed.criterionScores,
    groupedIssues: parsed.groupedIssues,
    features,
    transcript: sttResult.transcript,
    durationMs: sttResult.durationMs,
    level: task.level,
  }
}
