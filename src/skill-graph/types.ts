/**
 * Core vocabulary of the skill graph.
 *
 * Everything in FluentPath — placement, lesson sequencing, drills, mock-test
 * diagnosis, action plans — is a query against a graph of "skill nodes".
 * This file defines what a node is. Nothing here touches the database.
 */

// `as const` makes this a readonly tuple of literal strings rather than
// `string[]`. That lets us derive the CefrLevel union type from it below, so
// the list and the type can never drift apart — add a level here and the type
// updates automatically.
export const CEFR_LEVELS = ['preA1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

// `(typeof CEFR_LEVELS)[number]` means "the type of any element of that array",
// which resolves to 'preA1' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'.
export type CefrLevel = (typeof CEFR_LEVELS)[number]

/**
 * The five kinds of thing a learner can know.
 *
 * - cando    — a CEFR "can-do" statement, e.g. "can understand short notices"
 * - grammar  — a grammatical structure, e.g. present perfect with for/since
 * - lexical  — a word, phrase or idiom, at the level of a specific sense
 * - phono    — a sound, stress pattern or intonation contour
 * - strategy — exam or task technique, e.g. structuring an IELTS Task 2 essay
 */
export const NODE_TYPES = ['cando', 'grammar', 'lexical', 'phono', 'strategy'] as const
export type NodeType = (typeof NODE_TYPES)[number]

/**
 * Which skill a node belongs to.
 *
 * `general` covers nodes that aren't tied to one skill — most grammar and
 * vocabulary sits here, because knowing the past simple serves reading,
 * writing, listening and speaking alike.
 */
export const SKILL_AREAS = ['reading', 'writing', 'listening', 'speaking', 'general'] as const
export type SkillArea = (typeof SKILL_AREAS)[number]

/**
 * Ordinal position of a CEFR level: 0 (preA1) through 6 (C2).
 *
 * Levels are stored as strings because that is what content authors and the
 * CEFR itself use, but comparing them ("is B2 above A2?") needs numbers.
 * This is the single place that conversion happens.
 */
export function levelIndex(level: CefrLevel): number {
  return CEFR_LEVELS.indexOf(level)
}

/**
 * One atomic, assessable capability.
 *
 * IDs are stable, human-readable dotted strings — `gram.b1.present_perfect` —
 * never auto-increment integers, because content authors reference these by
 * hand and they must survive a database rebuild.
 */
export interface SkillNode {
  id: string
  type: NodeType
  level: CefrLevel
  skill: SkillArea
  title: string
  description: string
  /** Free-form extras that vary by node type; null when there are none. */
  metadata: Record<string, unknown> | null
}

/**
 * A prerequisite relationship: `fromNodeId` must be learned before `toNodeId`.
 *
 * The graph must stay acyclic — a cycle would mean "A requires B requires A",
 * which no learner could ever enter. That is treated as a data error caught by
 * validation, never as a condition to handle at runtime.
 */
export interface SkillEdge {
  /** The prerequisite — learned first. */
  fromNodeId: string
  /** The dependent — becomes available once the prerequisite is met. */
  toNodeId: string
  /**
   * How strongly the prerequisite gates the dependent, 0..1.
   *
   * 1 means fully blocking: you cannot sensibly attempt the dependent without
   * it. Lower values mean the prerequisite helps but does not block — word
   * stress supports describing a routine, but does not prevent it.
   */
  strength: number
}
