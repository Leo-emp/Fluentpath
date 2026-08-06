// # Quality gates for sentence transformation items.
// # Checks: original sentence exists, key word exists, accepted answers
// # exist and contain the key word, explanation present.

import type { ItemIssue, SentenceTransformItem } from './types'

export function reviewSentenceTransform(item: SentenceTransformItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Must have an original sentence to transform.
  if (!item.originalSentence || item.originalSentence.trim().length < 5) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Sentence transformation has no original sentence.',
    })
  }

  // # Must have a key word.
  if (!item.keyWord || item.keyWord.trim().length === 0) {
    issues.push({
      code: 'NO_KEY_WORD',
      severity: 'reject',
      message: 'Sentence transformation has no key word.',
    })
  }

  // # Must have at least one accepted answer.
  if (!item.acceptedAnswers || item.acceptedAnswers.length === 0) {
    issues.push({
      code: 'NO_ACCEPTED_TRANSFORMS',
      severity: 'reject',
      message: 'Sentence transformation has no accepted answers.',
    })
  }

  // # Every accepted answer must contain the key word.
  if (item.keyWord && item.acceptedAnswers) {
    const kw = item.keyWord.toLowerCase()
    for (const ans of item.acceptedAnswers) {
      if (!ans.toLowerCase().includes(kw)) {
        issues.push({
          code: 'NO_KEY_WORD',
          severity: 'reject',
          message: `Accepted answer "${ans}" does not contain the key word "${item.keyWord}".`,
        })
      }
    }
  }

  // # Must have an explanation.
  if (!item.explanation || item.explanation.trim().length < 5) {
    issues.push({
      code: 'NO_EXPLANATION',
      severity: 'reject',
      message: 'Sentence transformation has no explanation.',
    })
  }

  return issues
}
