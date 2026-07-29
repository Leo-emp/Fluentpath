import type { ItemIssue, McqItem } from './types'

/**
 * Detect stems that can be answered without understanding anything.
 *
 * This exists because of a real failure. A generated lesson contained:
 *
 *   "We ______ to Japan in 2018."   a) went  b) have gone  ...
 *
 * A learner can answer that by seeing a year and pattern-matching to past
 * simple. They never have to grasp the distinction the item claims to test,
 * so the item measures recognition of a date rather than knowledge of tense.
 *
 * The check is scoped to what it can justify: when an item targets a known
 * grammar contrast, certain words in the stem hand over the answer.
 */

/**
 * Time expressions that determine tense on sight.
 *
 * A finished-time marker forces past simple; an unfinished-time marker forces
 * present perfect. Either way the learner needs no understanding of the
 * contrast — only the ability to spot the word.
 */
const FINISHED_TIME = [
  'yesterday',
  'last night',
  'last week',
  'last month',
  'last year',
  'ago',
  'in 19',
  'in 20',
  'when i was',
]

const UNFINISHED_TIME = ['since', 'so far', 'up to now', 'this week', 'this month', 'this year']

/** Node ids whose whole point is the tense contrast these markers resolve. */
const TENSE_CONTRAST_NODES = ['pp_vs_past_simple', 'present_perfect', 'past_simple']

export function checkGiveaway(item: McqItem): ItemIssue[] {
  const issues: ItemIssue[] = []
  const stem = item.stem.toLowerCase()

  const testsTenseContrast = item.nodeIds.some((id) =>
    TENSE_CONTRAST_NODES.some((fragment) => id.includes(fragment)),
  )

  if (!testsTenseContrast) return issues

  // A four-digit year is the commonest form of this, and the reason the check
  // exists — "in 2018" resolves the tense before the learner reads the verb.
  const year = stem.match(/\b(1[89]\d{2}|20\d{2})\b/)
  if (year) {
    issues.push({
      code: 'STEM_GIVEAWAY',
      severity: 'reject',
      message: `The stem contains the year "${year[0]}", which fixes the tense on sight. A learner answers by spotting the date, not by understanding the contrast this item claims to test.`,
    })
  }

  const finished = FINISHED_TIME.find((marker) => stem.includes(marker))
  if (finished) {
    issues.push({
      code: 'STEM_GIVEAWAY',
      severity: 'reject',
      message: `The stem contains "${finished}", a finished-time marker that forces past simple. The item tests whether the learner can spot the marker, not whether they understand the tense.`,
    })
  }

  const unfinished = UNFINISHED_TIME.find((marker) => stem.includes(marker))
  if (unfinished) {
    issues.push({
      code: 'STEM_GIVEAWAY',
      severity: 'reject',
      message: `The stem contains "${unfinished}", an unfinished-time marker that forces present perfect. The item tests marker-spotting rather than understanding.`,
    })
  }

  return issues
}
