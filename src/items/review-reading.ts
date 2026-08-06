// # Quality gates for reading passage items.
// # Checks: passage length, question count, valid answers, explanations present.

import type { ReadingPassageItem, ItemIssue } from './types'

// # Minimum word counts by level — real exam passages are substantial.
const MIN_WORDS_BY_LEVEL: Record<string, number> = {
  A1: 100,
  A2: 150,
  B1: 300,
  B2: 500,
  C1: 600,
  C2: 700,
}

export function reviewReadingPassage(item: ReadingPassageItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Passage must exist and meet minimum length for its level.
  if (!item.passage || item.passage.trim().length === 0) {
    issues.push({
      code: 'PASSAGE_TOO_SHORT',
      severity: 'reject',
      message: 'Reading passage is empty.',
    })
    return issues
  }

  const wordCount = item.passage.split(/\s+/).length
  const minWords = MIN_WORDS_BY_LEVEL[item.level] ?? 300
  if (wordCount < minWords) {
    issues.push({
      code: 'PASSAGE_TOO_SHORT',
      severity: 'reject',
      message: `Passage has ${wordCount} words; ${item.level} requires at least ${minWords}.`,
    })
  }

  // # Must have at least one question.
  if (!item.questions || item.questions.length === 0) {
    issues.push({
      code: 'NO_QUESTIONS',
      severity: 'reject',
      message: 'Reading passage has no attached questions.',
    })
    return issues
  }

  // # Each question must have an explanation and a valid answer.
  for (const q of item.questions) {
    if (!q.explanation || q.explanation.trim().length === 0) {
      issues.push({
        code: 'MISSING_EXPLANATION',
        severity: 'reject',
        message: `Question "${q.id}" has no explanation for the correct answer.`,
      })
    }

    // # MCQ/TFNG/matching: correctAnswer must be a valid index.
    if (q.questionType === 'mcq' || q.questionType === 'tfng' || q.questionType === 'matching') {
      const idx = Number(q.correctAnswer)
      if (isNaN(idx) || idx < 0 || idx >= q.options.length) {
        issues.push({
          code: 'INVALID_ANSWER',
          severity: 'reject',
          message: `Question "${q.id}" has invalid correct answer index ${q.correctAnswer} for ${q.options.length} options.`,
        })
      }
    }

    // # Sentence completion / short answer: correctAnswer must be a non-empty string.
    if (q.questionType === 'sentence_completion' || q.questionType === 'short_answer') {
      if (typeof q.correctAnswer !== 'string' || q.correctAnswer.trim().length === 0) {
        issues.push({
          code: 'INVALID_ANSWER',
          severity: 'reject',
          message: `Question "${q.id}" needs a text answer for ${q.questionType}.`,
        })
      }
    }
  }

  // # Title must exist.
  if (!item.title || item.title.trim().length === 0) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'warn',
      message: 'Reading passage has no title.',
    })
  }

  return issues
}
