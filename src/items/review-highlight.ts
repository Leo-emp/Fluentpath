// # Quality gates for PTE highlight-incorrect-words items.
// # Checks: transcript exists, incorrect word indices valid, corrections provided.

import type { HighlightIncorrectItem, ItemIssue } from './types'

export function reviewHighlightIncorrect(item: HighlightIncorrectItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Transcript must exist.
  if (!item.transcript || item.transcript.trim().length === 0) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Highlight incorrect item has no transcript.',
    })
    return issues
  }

  // # Must have at least one incorrect word.
  if (!item.incorrectWordIndices || item.incorrectWordIndices.length === 0) {
    issues.push({
      code: 'NO_INCORRECT_WORDS',
      severity: 'reject',
      message: 'Highlight incorrect item has no incorrect words marked.',
    })
    return issues
  }

  // # Correct words array must match incorrect indices count.
  if (!item.correctWords || item.correctWords.length !== item.incorrectWordIndices.length) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: `${item.incorrectWordIndices.length} incorrect indices but ${item.correctWords?.length ?? 0} correct words.`,
    })
  }

  // # All indices must be within the transcript's word count.
  const words = item.transcript.split(/\s+/)
  for (const idx of item.incorrectWordIndices) {
    if (idx < 0 || idx >= words.length) {
      issues.push({
        code: 'INDEX_OUT_OF_RANGE',
        severity: 'reject',
        message: `Incorrect word index ${idx} is out of range (transcript has ${words.length} words).`,
      })
    }
  }

  return issues
}
