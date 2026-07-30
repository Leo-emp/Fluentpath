import { levelIndex } from '@/skill-graph/types'
import { profileText } from '@/profiler/profile'
import type { ProfilerInventory } from '@/profiler/profile'
import { checkMisconceptions } from './misconceptions'
import { checkWellFormed } from './wellformed'
import { checkGiveaway } from './giveaway'
import { checkShape } from './shape'
import { checkAnswerKey } from './answer-key'
import { checkTargeting } from './targeting'
import { checkDuplicate } from './duplicate'
import type { ItemIssue, ItemReview, McqItem } from './types'

// Context needed by the review pipeline. The inventory is always
// required; other fields enable optional gates.
export interface ReviewContext {
  inventory: ProfilerInventory
  // Stems of items already in the bank. When provided, the duplicate
  // gate compares the candidate against them. When omitted (e.g. in
  // unit tests that don't need dedup), the gate is skipped.
  existingStems?: string[]
}

// Run every gate over one item.
//
// The gates are deliberately separate and each was built from a real
// failure rather than from imagining what might go wrong. An item passes
// only when nothing rejects it; warnings are surfaced but do not block.
export function reviewItem(item: McqItem, context: ReviewContext): ItemReview {
  const issues: ItemIssue[] = [
    // Cheapest gates first, all run regardless — an item collects every issue.
    ...checkShape(item),
    ...checkWellFormed(item),
    ...checkMisconceptions(item),
    ...checkGiveaway(item),
    ...checkAnswerKey(item),
    ...checkTargeting(item),
    ...checkLevel(item, context.inventory),
    // Duplicate gate only runs when a bank is provided.
    ...(context.existingStems ? checkDuplicate(item, context.existingStems) : []),
  ]

  return {
    passed: !issues.some((i) => i.severity === 'reject'),
    issues,
  }
}

// Reject an item whose own language sits above the level it targets.
function checkLevel(item: McqItem, inventory: ProfilerInventory): ItemIssue[] {
  const issues: ItemIssue[] = []

  const profile = profileText(item.stem, inventory, item.level)

  for (const above of profile.aboveLevel) {
    issues.push({
      code: 'ABOVE_LEVEL',
      severity: 'reject',
      message: `The stem uses "${above.lemma}" (${above.level}) in an item targeting ${item.level}. A learner who cannot read the question cannot demonstrate what it tests.`,
    })
  }

  for (const uncertain of profile.uncertainPhrases) {
    if (levelIndex(uncertain.level) <= levelIndex(item.level)) continue
    issues.push({
      code: 'ABOVE_LEVEL',
      severity: 'warn',
      message: `The stem may use "${uncertain.lemma}" above ${item.level} — its level is estimated, not established, so this needs a human decision.`,
    })
  }

  return issues
}
