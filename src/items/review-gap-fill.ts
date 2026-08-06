// # Quality gates for gap-fill items.
// # Checks: has gaps, stem contains gap markers, accepted answers non-empty,
// # gap count matches marker count.

import type { GapFillItem, ItemIssue } from './types'

// # Count how many `______` markers appear in the stem.
function countGapMarkers(stem: string): number {
  return (stem.match(/______/g) || []).length
}

export function reviewGapFill(item: GapFillItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Must have at least one gap defined.
  if (!item.gaps || item.gaps.length === 0) {
    issues.push({
      code: 'NO_GAPS',
      severity: 'reject',
      message: 'Gap-fill item has no gaps defined.',
    })
    return issues
  }

  // # Gap count must match the number of `______` markers in the stem.
  const markerCount = countGapMarkers(item.stem)
  if (markerCount !== item.gaps.length) {
    issues.push({
      code: 'GAP_COUNT_MISMATCH',
      severity: 'reject',
      message: `Stem has ${markerCount} gap markers but ${item.gaps.length} gaps defined.`,
    })
  }

  // # Every gap must have at least one accepted answer.
  for (const gap of item.gaps) {
    if (!gap.acceptedAnswers || gap.acceptedAnswers.length === 0) {
      issues.push({
        code: 'EMPTY_ACCEPTED_ANSWERS',
        severity: 'reject',
        message: `Gap at index ${gap.index} has no accepted answers.`,
      })
    }
  }

  // # Stem must not be empty.
  if (!item.stem || item.stem.trim().length === 0) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Gap-fill item has an empty stem.',
    })
  }

  return issues
}
