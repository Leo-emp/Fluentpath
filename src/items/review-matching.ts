// # Quality gates for matching items.
// # Checks: at least 3 pairs, no empty left/right values, stem exists.

import type { ItemIssue, MatchingItem } from './types'

export function reviewMatching(item: MatchingItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Must have a stem/instruction.
  if (!item.stem || item.stem.trim().length < 3) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Matching item has no instruction text.',
    })
  }

  // # Must have at least 3 pairs to be a meaningful exercise.
  if (!item.pairs || item.pairs.length < 3) {
    issues.push({
      code: 'TOO_FEW_PAIRS',
      severity: 'reject',
      message: `Matching item needs at least 3 pairs (has ${item.pairs?.length ?? 0}).`,
    })
  }

  // # No pair should have an empty left or right value.
  if (item.pairs) {
    for (let i = 0; i < item.pairs.length; i++) {
      const pair = item.pairs[i]!
      if (!pair.left || pair.left.trim().length === 0 || !pair.right || pair.right.trim().length === 0) {
        issues.push({
          code: 'EMPTY_PAIR',
          severity: 'reject',
          message: `Pair ${i + 1} has an empty left or right value.`,
        })
      }
    }
  }

  return issues
}
