/**
 * Score-and-feedback loop — the main entry point for writing assessment.
 *
 * This module orchestrates the full pipeline:
 *   1. Validate the learner's response (word count, empty check)
 *   2. Build the scoring prompt (rubric + text + quality rules)
 *   3. Send to LLM via the provider interface
 *   4. Parse the structured output
 *   5. Run feedback quality gates
 *   6. Retry up to MAX_RETRIES on parse or gate failure
 *
 * The function reuses the existing GenerationProvider interface from
 * the MCQ generation pipeline — it's just "send prompt, get text"
 * which is exactly what scoring needs.
 *
 * Each retry sends a FRESH prompt (not the rejected output). This
 * matches the MCQ generation pattern and avoids anchoring the model
 * to its previous mistakes.
 */

import type { GenerationProvider } from '@/generation/provider'
import type { ProfilerInventory } from '@/profiler/profile'
import type { WritingTask, WritingResponse, WritingScore } from './types'
import { getRubric, computeOverallScore } from './rubrics'
import { validateResponse } from './validate'
import { buildScoringPrompt } from './prompt'
import { parseScoringOutput, type ParsedScore } from './parse-score'
import { checkFeedbackQuality } from './feedback-gates'
import { extractWritingFeatures } from './features'

// Match the MCQ pipeline: 3 retries (4 total attempts).
const MAX_RETRIES = 3

// Scoring output tends to be longer than MCQ generation — the model
// needs room for evidence spans, rewrites, and per-criterion feedback.
const MAX_TOKENS = 2048

export interface ScoreWritingResult {
  // The complete score, or null if all attempts failed.
  score: WritingScore | null
  // How many LLM calls were made.
  attempts: number
  // Validation issues that prevented scoring (e.g. 'below_minimum').
  validationIssues: string[]
  // Feedback quality issues from the last attempt (for diagnostics).
  feedbackIssues: string[]
}

/**
 * Score a piece of learner writing against the appropriate rubric.
 *
 * Returns a ScoreWritingResult with the complete score (or null on
 * failure), the number of LLM attempts made, and any validation or
 * feedback quality issues encountered.
 *
 * The function validates the response BEFORE calling the LLM, so
 * invalid submissions (empty, too short) don't cost API credits.
 */
export async function scoreWriting(
  provider: GenerationProvider,
  response: WritingResponse,
  task: WritingTask,
  inventory: ProfilerInventory,
): Promise<ScoreWritingResult> {
  // Look up the rubric for this task.
  const rubric = getRubric(task.rubricId)
  if (!rubric) {
    return {
      score: null,
      attempts: 0,
      validationIssues: [`Unknown rubric: ${task.rubricId}`],
      feedbackIssues: [],
    }
  }

  // Validate BEFORE spending money on an LLM call.
  const validation = validateResponse(response, task)
  if (!validation.valid) {
    return {
      score: null,
      attempts: 0,
      validationIssues: validation.issues,
      feedbackIssues: [],
    }
  }

  // Extract deterministic features BEFORE calling the LLM — same
  // pattern as the speaking pipeline. These become facts in the prompt.
  const features = extractWritingFeatures(response.text, inventory, task.level)

  // Build the prompt once — it doesn't change between retries because
  // we send a fresh prompt each time (no rejected output in context).
  const prompt = buildScoringPrompt(response, task, rubric, inventory, features)
  const wordCount = validation.wordCount

  // Try up to MAX_RETRIES + 1 times (initial + retries).
  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    const llmResponse = await provider.generate({
      prompt,
      maxTokens: MAX_TOKENS,
    })

    // Stage 1: Parse the structured output.
    const parsed = parseScoringOutput(llmResponse.raw, rubric, response.text)
    if (!parsed) continue

    // Stage 2: Run feedback quality gates.
    const feedbackReview = checkFeedbackQuality(parsed, task.level, inventory)

    if (!feedbackReview.passed) {
      // On the last attempt, return what we have with the quality
      // issues noted — imperfect feedback is better than no feedback.
      if (attempt === MAX_RETRIES + 1) {
        return {
          score: assembleScore(parsed, task, rubric, wordCount),
          attempts: attempt,
          validationIssues: [],
          feedbackIssues: feedbackReview.issues,
        }
      }
      continue
    }

    // All checks passed — return the clean result.
    return {
      score: assembleScore(parsed, task, rubric, wordCount),
      attempts: attempt,
      validationIssues: [],
      feedbackIssues: [],
    }
  }

  // All attempts failed — parse errors every time.
  return {
    score: null,
    attempts: MAX_RETRIES + 1,
    validationIssues: [],
    feedbackIssues: [],
  }
}

/**
 * Assemble the final WritingScore from parsed data.
 * This is the last step before returning to the caller.
 */
function assembleScore(
  parsed: ParsedScore,
  task: WritingTask,
  rubric: NonNullable<ReturnType<typeof getRubric>>,
  wordCount: number,
): WritingScore {
  return {
    taskId: task.id,
    overallScore: computeOverallScore(parsed.criterionScores, rubric),
    maxOverallScore: rubric.scoreRange.max,
    criterionScores: parsed.criterionScores,
    groupedIssues: parsed.groupedIssues,
    wordCount,
    level: task.level,
  }
}
