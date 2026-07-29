import nlp from 'compromise'
import type { ItemIssue, McqItem } from './types'

/**
 * Reject options that are not plausible English.
 *
 * A malformed option is not a distractor. "have lose" is something no learner
 * would ever choose, so it silently converts a four-option question into a
 * three-option one — and the item measures less than the author thinks.
 *
 * The checks are deliberately narrow. Detecting all ungrammatical English is
 * not possible here, and a gate that guesses would reject good items. These
 * catch the specific patterns that generated content actually produces.
 */

/** Auxiliaries that force a particular form of the verb that follows. */
const AUXILIARY_RULES: Array<{
  aux: string[]
  requires: 'pastParticiple' | 'infinitive' | 'gerund'
  describe: string
}> = [
  // "have lose" / "has went" — perfect aspect needs a past participle.
  { aux: ['have', 'has', 'had'], requires: 'pastParticiple', describe: 'a past participle' },
  // "must to go" / "can goes" — modals take a bare infinitive.
  {
    aux: ['can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must'],
    requires: 'infinitive',
    describe: 'a bare infinitive',
  },
]

const MODALS = new Set(AUXILIARY_RULES[1]!.aux)

/**
 * Verbs whose base form, past tense and past participle are identical.
 *
 * "has read" is correct English, but the participle is spelled exactly like
 * the bare form, so a tagger sees a bare verb after an auxiliary and reports a
 * problem that is not there.
 *
 * Found by measurement rather than reasoning: a batch of ten generated items
 * scored 9/10, and the single failure was this false positive on "has read".
 * Left unfixed it would have rejected every correct item using read, put, cut,
 * set, cost or hit — the exact failure this module was written to avoid.
 */
const INVARIANT_VERBS = new Set([
  'bet',
  'broadcast',
  'burst',
  'cast',
  'cost',
  'cut',
  'forecast',
  'hit',
  'hurt',
  'let',
  'put',
  'quit',
  'read',
  'rid',
  'set',
  'shed',
  'shut',
  'slit',
  'split',
  'spread',
  'thrust',
  'upset',
  'wed',
])

export function checkWellFormed(item: McqItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  item.options.forEach((option, index) => {
    const text = option.text.trim()

    if (text === '') {
      issues.push({
        code: 'MALFORMED_OPTION',
        severity: 'reject',
        message: `Option ${index} is empty.`,
        optionIndex: index,
      })
      return
    }

    const problem = findAuxiliaryProblem(text)
    if (problem) {
      issues.push({
        code: 'MALFORMED_OPTION',
        severity: 'reject',
        message: `Option ${index} ("${text}") is not plausible English: ${problem}. A malformed option is a free elimination, not a distractor.`,
        optionIndex: index,
      })
    }
  })

  return issues
}

/**
 * Look for an auxiliary followed by the wrong verb form.
 *
 * Returns a description of the problem, or null when nothing is detectably
 * wrong. Silence means "no problem found", not "definitely correct" — this
 * only recognises a handful of patterns.
 */
function findAuxiliaryProblem(text: string): string | null {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean)

  for (let i = 0; i < words.length - 1; i++) {
    const first = words[i]!
    const second = words[i + 1]!

    // "must to go" — a modal followed by infinitival "to".
    if (MODALS.has(first) && second === 'to') {
      return `"${first} to" — modals take a bare infinitive, with no "to"`
    }

    const rule = AUXILIARY_RULES.find((r) => r.aux.includes(first))
    if (!rule) continue

    // Skip a following adverb: "have never lost".
    let j = i + 1
    while (j < words.length && isAdverb(words[j]!)) j++
    const verb = words[j]
    if (!verb) continue

    // "have been", "have got" and similar are fine; only flag when the word is
    // a verb in a form the auxiliary cannot take.
    if (rule.requires === 'pastParticiple' && isBareOrPresentVerb(verb)) {
      return `"${first} ${verb}" needs ${rule.describe}`
    }
    if (rule.requires === 'infinitive' && isInflectedVerb(verb)) {
      return `"${first} ${verb}" needs ${rule.describe}`
    }
  }

  return null
}

function isAdverb(word: string): boolean {
  return nlp(word).json()[0]?.terms?.[0]?.tags?.includes('Adverb') ?? false
}

/**
 * True when the word is a verb in bare or present form — the forms that cannot
 * follow "have".
 *
 * compromise tags irregular participles ("lost", "gone", "eaten") distinctly
 * from the bare form ("lose", "go", "eat"), which is exactly the distinction
 * needed to catch "have lose".
 */
function isBareOrPresentVerb(word: string): boolean {
  // "has read" is correct — the participle is spelled like the bare form, so
  // these can never be judged from the surface word alone.
  if (INVARIANT_VERBS.has(word)) return false

  const term = nlp(word).json()[0]?.terms?.[0]
  const tags = term?.tags ?? []
  if (!tags.includes('Verb')) return false

  // A participle or past form is acceptable after "have".
  if (tags.includes('PastTense') || tags.includes('Participle')) return false

  // Infinitive or present tense is not.
  return tags.includes('Infinitive') || tags.includes('PresentTense')
}

/** True when the word is an inflected verb — cannot follow a modal. */
function isInflectedVerb(word: string): boolean {
  const tags = nlp(word).json()[0]?.terms?.[0]?.tags ?? []
  if (!tags.includes('Verb')) return false
  return tags.includes('PastTense') || tags.includes('Gerund')
}
