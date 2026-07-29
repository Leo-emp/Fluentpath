import type { CefrLevel } from '@/skill-graph/types'

/**
 * One option in a multiple-choice item.
 *
 * Note what is required rather than optional: every wrong option must name the
 * misconception it represents. That is not documentation — it is the thing
 * separating a diagnostic distractor from a filler one.
 *
 * A wrong answer nobody would choose for a reason tests nothing. It hands the
 * learner a free elimination and tells the diagnosis engine nothing about why
 * they went wrong. Making this mandatory means an author cannot write a lazy
 * distractor without noticing they have done so.
 */
export interface McqOption {
  text: string
  /**
   * The specific wrong belief that would lead a learner to choose this.
   *
   * Null only for the correct option. For every other option it must describe
   * a real confusion — "uses past simple with an unfinished time reference",
   * not "wrong tense".
   */
  misconception: string | null
}

export interface McqItem {
  id: string
  /** The question, with a blank written as `______` where one is needed. */
  stem: string
  options: McqOption[]
  /** Index into `options`. */
  correctIndex: number
  /** Skill graph nodes this item is meant to exercise. */
  nodeIds: string[]
  /** The level this item is written for. */
  level: CefrLevel
}

export type IssueSeverity = 'reject' | 'warn'

export type ItemIssueCode =
  | 'STRUCTURE'
  | 'MALFORMED_OPTION'
  | 'NO_MISCONCEPTION'
  | 'VAGUE_MISCONCEPTION'
  | 'DUPLICATE_MISCONCEPTION'
  | 'STEM_GIVEAWAY'
  | 'LENGTH_TELL'
  | 'ABOVE_LEVEL'

export interface ItemIssue {
  code: ItemIssueCode
  severity: IssueSeverity
  message: string
  /** Index into `options` when the issue concerns one specific option. */
  optionIndex?: number
}

export interface ItemReview {
  /** True when no issue has severity 'reject'. */
  passed: boolean
  issues: ItemIssue[]
}
