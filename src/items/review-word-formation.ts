// # Quality gates for word formation items.
// # Checks: stem with gap exists, root word exists, accepted forms exist,
// # explanation present.

import type { ItemIssue, WordFormationItem } from './types'

export function reviewWordFormation(item: WordFormationItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Must have a stem with a gap marker.
  if (!item.stem || !item.stem.includes('______')) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Word formation item needs a stem with a ______ gap marker.',
    })
  }

  // # Must have a root word.
  if (!item.rootWord || item.rootWord.trim().length === 0) {
    issues.push({
      code: 'NO_ROOT_WORD',
      severity: 'reject',
      message: 'Word formation item has no root word.',
    })
  }

  // # Must have at least one accepted form.
  if (!item.acceptedAnswers || item.acceptedAnswers.length === 0) {
    issues.push({
      code: 'NO_ACCEPTED_FORMS',
      severity: 'reject',
      message: 'Word formation item has no accepted answer forms.',
    })
  }

  // # Must have an explanation.
  if (!item.explanation || item.explanation.trim().length < 5) {
    issues.push({
      code: 'NO_EXPLANATION',
      severity: 'reject',
      message: 'Word formation item has no explanation.',
    })
  }

  return issues
}
