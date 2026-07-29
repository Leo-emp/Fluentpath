import { levelIndex } from '@/skill-graph/types'
import { profileText } from '@/profiler/profile'
import type { ProfilerInventory } from '@/profiler/profile'
import { checkMisconceptions } from './misconceptions'
import { checkWellFormed } from './wellformed'
import { checkGiveaway } from './giveaway'
import { checkShape } from './shape'
import type { ItemIssue, ItemReview, McqItem } from './types'

/**
 * Run every gate over one item.
 *
 * The gates are deliberately separate and each was built from a real failure
 * rather than from imagining what might go wrong. An item passes only when
 * nothing rejects it; warnings are surfaced but do not block.
 */
export function reviewItem(item: McqItem, inventory: ProfilerInventory): ItemReview {
  const issues: ItemIssue[] = [
    ...checkShape(item),
    ...checkWellFormed(item),
    ...checkMisconceptions(item),
    ...checkGiveaway(item),
    ...checkLevel(item, inventory),
  ]

  return {
    passed: !issues.some((i) => i.severity === 'reject'),
    issues,
  }
}

/**
 * Reject an item whose own language sits above the level it targets.
 *
 * An A2 item written in B2 English tests reading comprehension the learner
 * does not have, so a wrong answer says nothing about the thing being taught.
 * This is Quality bar 1a applied to items rather than explanations.
 *
 * Only confidently-levelled vocabulary counts — derived phrase estimates are
 * reported as warnings, never used to reject an item.
 */
function checkLevel(item: McqItem, inventory: ProfilerInventory): ItemIssue[] {
  const issues: ItemIssue[] = []

  // The stem carries the reading load; the options are usually the target
  // language itself and may legitimately sit at level.
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
