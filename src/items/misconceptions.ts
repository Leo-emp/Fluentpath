import type { ItemIssue, McqItem } from './types'

/**
 * Words that describe the *item* rather than the learner's thinking.
 *
 * These never appear in a genuine account of a wrong belief, so finding one
 * anywhere in the text means the author has described their own authoring
 * rather than the learner's confusion. "just a distractor" is not a
 * misconception; it is an admission.
 */
const META_TERMS = ['distractor', 'filler', 'dummy', 'placeholder', 'decoy', 'random option']

/**
 * Words that are vague only when they carry the whole description.
 *
 * "wrong tense" diagnoses nothing — it restates that the answer is incorrect.
 * But "confuses the wrong time reference with an unfinished one" is fine, so
 * these are only rejected when the text opens with them, not wherever they
 * appear. A usable misconception names the belief; the diagnosis engine can
 * act on that and can do nothing with a restatement.
 */
const WEAK_OPENERS = [
  'wrong',
  'incorrect',
  'not correct',
  'mistake',
  'error',
  'bad grammar',
  'nonsense',
  'random',
]

/** Below this, a misconception cannot be describing anything specific. */
const MIN_MISCONCEPTION_WORDS = 3

/**
 * Check that every wrong option carries a real, specific misconception.
 *
 * This is the gate that stops filler distractors. It was written because a
 * lesson I generated contained the option "have lose" — broken English that
 * no learner picks for a reason, offered alongside three plausible ones.
 */
export function checkMisconceptions(item: McqItem): ItemIssue[] {
  const issues: ItemIssue[] = []
  const seen = new Map<string, number>()

  item.options.forEach((option, index) => {
    const isCorrect = index === item.correctIndex

    if (isCorrect) {
      // The correct option should not claim a misconception; that would mean
      // the author has mislabelled which answer is right.
      if (option.misconception !== null) {
        issues.push({
          code: 'NO_MISCONCEPTION',
          severity: 'warn',
          message: 'The correct option carries a misconception, which suggests correctIndex is wrong.',
          optionIndex: index,
        })
      }
      return
    }

    const raw = (option.misconception ?? '').trim()

    if (raw === '') {
      issues.push({
        code: 'NO_MISCONCEPTION',
        severity: 'reject',
        message: `Option ${index} ("${option.text}") has no misconception. A distractor that represents no specific wrong belief is a free elimination and diagnoses nothing.`,
        optionIndex: index,
      })
      return
    }

    const normalised = raw.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim()

    if (normalised.split(' ').length < MIN_MISCONCEPTION_WORDS) {
      issues.push({
        code: 'VAGUE_MISCONCEPTION',
        severity: 'reject',
        message: `Option ${index} has a misconception of only ${normalised.split(' ').length} words ("${raw}"). Name the belief, not the fact that it is wrong.`,
        optionIndex: index,
      })
      return
    }

    if (META_TERMS.some((term) => normalised.includes(term))) {
      issues.push({
        code: 'VAGUE_MISCONCEPTION',
        severity: 'reject',
        message: `Option ${index} describes the item rather than the learner ("${raw}"). Say what the learner wrongly believes, not what role this option plays.`,
        optionIndex: index,
      })
      return
    }

    if (WEAK_OPENERS.some((phrase) => normalised === phrase || normalised.startsWith(`${phrase} `))) {
      issues.push({
        code: 'VAGUE_MISCONCEPTION',
        severity: 'reject',
        message: `Option ${index} restates that the answer is wrong ("${raw}") instead of naming the misconception behind it.`,
        optionIndex: index,
      })
      return
    }

    // Two distractors sharing a misconception means one of them is redundant —
    // the item is testing the same confusion twice and offering a free
    // elimination for the other.
    const previous = seen.get(normalised)
    if (previous !== undefined) {
      issues.push({
        code: 'DUPLICATE_MISCONCEPTION',
        severity: 'warn',
        message: `Options ${previous} and ${index} describe the same misconception, so one of them adds nothing.`,
        optionIndex: index,
      })
    } else {
      seen.set(normalised, index)
    }
  })

  return issues
}
