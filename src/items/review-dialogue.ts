// # Quality gates for dialogue completion items.
// # Checks: has lines, at least one missing line, missing lines have
// # accepted answers, stem/context exists.

import type { ItemIssue, DialogueCompletionItem } from './types'

export function reviewDialogueCompletion(item: DialogueCompletionItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Must have a stem/context.
  if (!item.stem || item.stem.trim().length < 5) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Dialogue completion has no context or instruction.',
    })
  }

  // # Must have lines.
  if (!item.lines || item.lines.length < 2) {
    issues.push({
      code: 'NO_LINES',
      severity: 'reject',
      message: 'Dialogue completion needs at least 2 lines.',
    })
    return issues
  }

  // # Must have at least one missing line (text === null).
  const missingLines = item.lines.filter((l) => l.text === null)
  if (missingLines.length === 0) {
    issues.push({
      code: 'NO_MISSING_LINES',
      severity: 'reject',
      message: 'Dialogue completion has no missing lines for the learner to complete.',
    })
  }

  // # Every missing line must have accepted answers.
  for (let i = 0; i < item.lines.length; i++) {
    const line = item.lines[i]!
    if (line.text === null && (!line.acceptedAnswers || line.acceptedAnswers.length === 0)) {
      issues.push({
        code: 'MISSING_LINE_NO_ANSWERS',
        severity: 'reject',
        message: `Line ${i + 1} (${line.speaker}) is missing but has no accepted answers.`,
      })
    }
  }

  return issues
}
