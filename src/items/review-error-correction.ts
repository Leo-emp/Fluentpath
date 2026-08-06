// # Quality gates for error correction items.
// # Checks: sentence exists, error part exists and appears in the sentence,
// # correction exists and differs from error, explanation present.

import type { ItemIssue, ErrorCorrectionItem } from './types'

export function reviewErrorCorrection(item: ErrorCorrectionItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Must have a sentence.
  if (!item.sentence || item.sentence.trim().length < 5) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Error correction item has no sentence.',
    })
  }

  // # Must identify the error part.
  if (!item.errorPart || item.errorPart.trim().length === 0) {
    issues.push({
      code: 'NO_ERROR_PART',
      severity: 'reject',
      message: 'Error correction item does not identify the error.',
    })
  }

  // # The error must actually appear in the sentence.
  if (item.sentence && item.errorPart && !item.sentence.includes(item.errorPart)) {
    issues.push({
      code: 'ERROR_NOT_IN_SENTENCE',
      severity: 'reject',
      message: `Error part "${item.errorPart}" does not appear in the sentence.`,
    })
  }

  // # Must have a correction.
  if (!item.correction || item.correction.trim().length === 0) {
    issues.push({
      code: 'NO_CORRECTION',
      severity: 'reject',
      message: 'Error correction item has no correction.',
    })
  }

  // # Must have an explanation.
  if (!item.explanation || item.explanation.trim().length < 5) {
    issues.push({
      code: 'NO_EXPLANATION',
      severity: 'reject',
      message: 'Error correction item has no explanation.',
    })
  }

  return issues
}
