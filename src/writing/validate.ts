/**
 * Writing response validation — checks the learner's submission before
 * sending it to the LLM for scoring.
 *
 * This is a cost gate: invalid responses (empty, too short) are rejected
 * immediately without burning an API call. Over-maximum is a warning,
 * not a rejection — the learner may need to express ideas fully.
 */

import type { WritingTask, WritingResponse } from './types'

export interface ValidationResult {
  valid: boolean
  wordCount: number
  issues: string[]
  warnings: string[]
}

/**
 * Validate a writing response against its task requirements.
 *
 * - Empty or whitespace-only: rejected (issue: 'empty')
 * - Below minimum words: rejected (issue: 'below_minimum')
 * - Above maximum words: warned but NOT rejected (warning: 'above_maximum')
 * - Contains the prompt text: warned (warning: 'contains_prompt')
 */
export function validateResponse(
  response: WritingResponse,
  task: WritingTask,
): ValidationResult {
  const issues: string[] = []
  const warnings: string[] = []

  const trimmed = response.text.trim()

  // Empty or whitespace-only submission is always a hard rejection.
  if (trimmed.length === 0) {
    return { valid: false, wordCount: 0, issues: ['empty'], warnings }
  }

  const wordCount = countWords(trimmed)

  // Under the minimum word count is a hard rejection. There is not
  // enough text to score meaningfully.
  if (wordCount < task.minWords) {
    issues.push('below_minimum')
  }

  // Over the maximum word count is a warning. In real exams (IELTS,
  // PTE) there is no penalty for exceeding the word count — the
  // learner just risks running out of time. We warn but don't reject.
  if (wordCount > task.maxWords) {
    warnings.push('above_maximum')
  }

  // Detect if the learner copied the prompt into their response.
  // This is common with beginners who paste the question before
  // answering. We normalise to lowercase and strip non-alpha chars
  // before comparing — the prompt might have been reformatted.
  const promptNorm = task.prompt.toLowerCase().replace(/[^a-z\s]/g, '').trim()
  const responseNorm = trimmed.toLowerCase().replace(/[^a-z\s]/g, '').trim()
  if (promptNorm.length > 20 && responseNorm.includes(promptNorm)) {
    warnings.push('contains_prompt')
  }

  return { valid: issues.length === 0, wordCount, issues, warnings }
}

/**
 * Count words by splitting on whitespace. Hyphenated words count as
 * one word (matching IELTS/PTE word-counting conventions).
 */
function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length
}
