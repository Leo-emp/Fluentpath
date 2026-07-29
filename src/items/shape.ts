import type { ItemIssue, McqItem } from './types'

/**
 * Detect surface tells — patterns that let a learner guess without knowing.
 *
 * Test-wise learners exploit these constantly, and they are invisible to an
 * author focused on the language. A learner who can guess an item has learned
 * nothing from it, and the diagnosis engine records a success that did not
 * happen.
 */

/** Ratio at which the correct option's length becomes a tell. */
const LENGTH_TELL_RATIO = 1.6

/** Below this many characters, length differences are noise. */
const MIN_LENGTH_FOR_TELL = 8

export function checkShape(item: McqItem): ItemIssue[] {
  const issues: ItemIssue[] = []
  const options = item.options

  if (options.length < 3) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: `An item needs at least three options; this has ${options.length}. Two options make guessing a coin toss.`,
    })
  }

  if (item.correctIndex < 0 || item.correctIndex >= options.length) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: `correctIndex ${item.correctIndex} is outside the ${options.length} options.`,
    })
    return issues // Nothing below is meaningful without a valid correct answer.
  }

  // Duplicate options make one of them unchoosable and the item unfair.
  const seen = new Map<string, number>()
  options.forEach((option, index) => {
    const key = option.text.trim().toLowerCase()
    const previous = seen.get(key)
    if (previous !== undefined) {
      issues.push({
        code: 'STRUCTURE',
        severity: 'reject',
        message: `Options ${previous} and ${index} are identical ("${option.text}").`,
        optionIndex: index,
      })
    } else seen.set(key, index)
  })

  issues.push(...checkLengthTell(item))

  return issues
}

/**
 * The classic tell: the correct answer is noticeably longer.
 *
 * Authors qualify the right answer to make it unambiguous and leave the wrong
 * ones terse, so length alone predicts the key. A learner who has spotted this
 * scores well without understanding anything.
 */
function checkLengthTell(item: McqItem): ItemIssue[] {
  const lengths = item.options.map((o) => o.text.trim().length)
  const correctLength = lengths[item.correctIndex]!

  const others = lengths.filter((_, i) => i !== item.correctIndex)
  if (others.length === 0) return []

  const longestOther = Math.max(...others)
  if (correctLength < MIN_LENGTH_FOR_TELL) return []
  if (longestOther === 0) return []

  if (correctLength / longestOther >= LENGTH_TELL_RATIO) {
    return [
      {
        code: 'LENGTH_TELL',
        severity: 'warn',
        message: `The correct option is ${correctLength} characters against a longest distractor of ${longestOther}. Length alone predicts the answer, so a test-wise learner can guess it.`,
        optionIndex: item.correctIndex,
      },
    ]
  }

  return []
}
