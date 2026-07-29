import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { SkillNode } from '@/skill-graph/types'
import type { ProfilerInventory } from '@/profiler/profile'

/**
 * Assembling the constraints a generated item must obey.
 *
 * This is where content quality is actually determined. A model asked to
 * "write an A2 item" will drift above level, because it has no reliable sense
 * of what A2 means. A model given the specific words permitted at A2 cannot.
 *
 * The gates in `items/` catch what slips through. Constraints stop most of it
 * being produced in the first place, which is cheaper and produces better
 * content than generate-and-reject.
 */

export interface GenerationConstraints {
  /** The node this item must exercise. */
  targetNode: SkillNode
  level: CefrLevel

  /**
   * Words permitted at or below the target level.
   *
   * Capped — see `VOCABULARY_SAMPLE_CAP`. The full A2 list is thousands of
   * words and would dominate the prompt without improving anything.
   */
  allowedVocabulary: string[]

  /** True size of the permitted vocabulary, before capping. */
  allowedVocabularySize: number

  /**
   * Words to avoid: just above the target level, so the nearest temptations
   * are named explicitly rather than left to inference.
   */
  discouragedVocabulary: string[]

  /** Phrases at or below level, which may be used freely. */
  allowedPhrases: string[]

  /** Phrases above level — the commonest source of accidental drift. */
  forbiddenPhrases: string[]
}

/**
 * How many example words to include.
 *
 * Enough to convey the register of the level; not so many that the prompt is
 * mostly a word list. The gate checks the output regardless, so this is a
 * steer rather than an enumeration.
 */
const VOCABULARY_SAMPLE_CAP = 250

/** How many above-level words to name as things to avoid. */
const DISCOURAGED_SAMPLE_CAP = 60

/**
 * Forbidden phrases are NOT capped.
 *
 * They are the most valuable constraint here, because they are the one thing
 * the model cannot infer. It already knows "notwithstanding" is difficult —
 * the word looks difficult. It has no way to know that "give up", two of the
 * commonest words in English, is B1 while "go to" is A1.
 *
 * The confidently-levelled phrase set is only a few hundred entries, and only
 * those above the target level appear, so listing all of them is cheap.
 * Sampling would drop precisely the information worth sending.
 */

export function buildConstraints(
  targetNode: SkillNode,
  inventory: ProfilerInventory,
  level: CefrLevel = targetNode.level,
): GenerationConstraints {
  const target = levelIndex(level)

  const allowed: string[] = []
  const discouraged: string[] = []

  for (const [word, wordLevel] of inventory.words) {
    const index = levelIndex(wordLevel)

    if (index <= target) {
      allowed.push(word)
      continue
    }

    // Only the level immediately above. Naming C2 words as forbidden in an A1
    // item is noise — the model was never going to reach for them.
    if (index === target + 1) discouraged.push(word)
  }

  const allowedPhrases: string[] = []
  const forbiddenPhrases: string[] = []

  for (const [phrase, entry] of inventory.phrases) {
    // Only confidently-levelled phrases constrain generation. A derived
    // estimate is not firm enough to forbid a phrase over, and forbidding
    // "go to" on a guess would cripple beginner content.
    if (entry.confidence < 0.8) continue

    if (levelIndex(entry.level) <= target) allowedPhrases.push(phrase)
    else forbiddenPhrases.push(phrase)
  }

  return {
    targetNode,
    level,
    allowedVocabulary: sample(allowed, VOCABULARY_SAMPLE_CAP),
    allowedVocabularySize: allowed.length,
    discouragedVocabulary: sample(discouraged, DISCOURAGED_SAMPLE_CAP),
    allowedPhrases,
    forbiddenPhrases,
  }
}

/**
 * Take an evenly spread sample rather than the first n.
 *
 * The inventory is roughly alphabetical, so slicing would give a prompt full
 * of words beginning with "a" and convey nothing about the level's range.
 */
function sample<T>(items: T[], cap: number): T[] {
  if (items.length <= cap) return [...items]

  const step = items.length / cap
  const out: T[] = []
  for (let i = 0; i < cap; i++) out.push(items[Math.floor(i * step)]!)
  return out
}

/**
 * Render constraints as prompt text.
 *
 * Kept separate from assembly so the rules can be inspected and tested as
 * data, without a model or a network call.
 */
export function renderConstraints(c: GenerationConstraints): string {
  const lines: string[] = []

  lines.push(`TARGET: ${c.targetNode.title} (${c.targetNode.id})`)
  lines.push(`LEVEL: ${c.level}`)
  lines.push('')
  lines.push('The item must exercise the target above. An item that merely')
  lines.push('mentions it without testing it does not count.')
  lines.push('')
  lines.push(`VOCABULARY: use only words at ${c.level} or below.`)
  lines.push(`There are ${c.allowedVocabularySize} such words. A sample, to convey the register:`)
  lines.push(c.allowedVocabulary.join(', '))

  if (c.discouragedVocabulary.length > 0) {
    lines.push('')
    lines.push(`AVOID these, which sit just above ${c.level}:`)
    lines.push(c.discouragedVocabulary.join(', '))
  }

  if (c.forbiddenPhrases.length > 0) {
    lines.push('')
    lines.push('DO NOT USE these phrases — they are above level even though')
    lines.push('their individual words may not be:')
    lines.push(c.forbiddenPhrases.join(', '))
  }

  lines.push('')
  lines.push('EVERY wrong option must state the specific mistaken belief that')
  lines.push('would lead a learner to choose it. "wrong tense" is not a belief.')
  lines.push('"uses past simple though the result still matters now" is.')
  lines.push('')
  lines.push('The question must NOT be answerable without understanding the')
  lines.push('target. Avoid dates and time markers that settle the answer on')
  lines.push('sight.')

  return lines.join('\n')
}
