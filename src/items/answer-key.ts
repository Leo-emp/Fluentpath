import type { ItemIssue, McqItem } from './types'
import { findAuxiliaryProblem } from './wellformed'
import { detectTense, extractTenseFromMisconception } from './tense-detect'

// The blank marker used in fill-in-blank MCQ stems.
const BLANK = '______'

// Substitute an option's text into the stem's blank to form a complete
// sentence. Returns null if the stem has no blank.
function substitute(stem: string, optionText: string): string | null {
  if (!stem.includes(BLANK)) return null
  return stem.replace(BLANK, optionText)
}

// Verify the answer key by substituting options into the stem.
//
// For fill-in-blank items, three checks:
// 1. The correct option must produce grammatically valid English.
// 2. At least one distractor must be detectably wrong in context.
// 3. Each distractor's misconception must match what the option actually does.
//
// For non-blank MCQs, structural checks:
// 1. correctIndex must point to a valid option.
// 2. The correct option must not be empty.
export function checkAnswerKey(item: McqItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // Structural check for ALL MCQ types: correctIndex must be valid.
  if (item.correctIndex < 0 || item.correctIndex >= item.options.length) {
    issues.push({
      code: 'WRONG_KEY',
      severity: 'reject',
      message: `correctIndex is ${item.correctIndex} but there are only ${item.options.length} options.`,
    })
    return issues
  }

  const correctOption = item.options[item.correctIndex]
  if (correctOption && correctOption.text.trim() === '') {
    issues.push({
      code: 'WRONG_KEY',
      severity: 'reject',
      message: 'The correct option has empty text.',
    })
  }

  // Non-blank MCQs: check misconception consistency (tense cross-check
  // still applies even without a fill-in stem).
  if (!item.stem.includes(BLANK)) {
    item.options.forEach((option, index) => {
      if (index === item.correctIndex) return
      if (!option.misconception) return

      const claimedTense = extractTenseFromMisconception(option.misconception)
      if (claimedTense === null) return
      const actualTense = detectTense(option.text)
      if (actualTense === null) return

      if (claimedTense !== actualTense) {
        issues.push({
          code: 'MISCONCEPTION_MISMATCH',
          severity: 'reject',
          message:
            `Option ${index} ("${option.text}") is detected as ${actualTense}, ` +
            `but its misconception says "${option.misconception}" which names ` +
            `${claimedTense}. Either the option or the misconception is wrong.`,
          optionIndex: index,
        })
      }
    })
    return issues
  }

  // 1. Check the correct option produces valid English.
  const correctText = item.options[item.correctIndex]?.text
  if (correctText !== undefined) {
    const correctSentence = substitute(item.stem, correctText)!
    const problem = findAuxiliaryProblem(correctSentence)
    if (problem) {
      issues.push({
        code: 'WRONG_KEY',
        severity: 'reject',
        message:
          `The correct option ("${correctText}") produces ungrammatical English ` +
          `when placed in the stem: ${problem}. The answer key is wrong.`,
      })
    }
  }

  // 2. Check that at least one distractor is detectably wrong.
  let anyDistractorBroken = false
  item.options.forEach((option, index) => {
    if (index === item.correctIndex) return
    const sentence = substitute(item.stem, option.text)!
    if (findAuxiliaryProblem(sentence)) {
      anyDistractorBroken = true
    }
  })

  // If no distractor is detectably wrong, the answer key may be
  // arbitrary. This is a warning — the item might still be valid if the
  // grammar difference is subtler than the auxiliary check can detect.
  if (!anyDistractorBroken && item.options.length > 1) {
    issues.push({
      code: 'AMBIGUOUS_KEY',
      severity: 'warn',
      message:
        'No distractor is detectably ungrammatical in context. The answer key ' +
        'may be arbitrary — all options look equally valid to the grammar checker.',
    })
  }

  // 3. Cross-check misconceptions against what the option text actually does.
  item.options.forEach((option, index) => {
    if (index === item.correctIndex) return
    if (!option.misconception) return

    const claimedTense = extractTenseFromMisconception(option.misconception)
    if (claimedTense === null) return // misconception doesn't name a tense

    const actualTense = detectTense(option.text)
    if (actualTense === null) return // can't determine the tense

    if (claimedTense !== actualTense) {
      issues.push({
        code: 'MISCONCEPTION_MISMATCH',
        severity: 'reject',
        message:
          `Option ${index} ("${option.text}") is detected as ${actualTense}, ` +
          `but its misconception says "${option.misconception}" which names ` +
          `${claimedTense}. Either the option or the misconception is wrong.`,
        optionIndex: index,
      })
    }
  })

  return issues
}
