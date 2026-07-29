import type { CefrLevel } from '@/skill-graph/types'

/**
 * Where a level came from.
 *
 * `source` means the dataset stated it. `derived` means this project computed
 * it — currently only multi-word verbs, because WordNet supplies the phrases
 * but no levels.
 *
 * The distinction is carried through the system and never collapsed. Derived
 * levels are estimates, and a reviewer looking at content must be able to see
 * which numbers are evidence and which are inference.
 */
export type LevelSource = 'source' | 'derived'

export interface LexicalEntry {
  headword: string
  /** Normalised part of speech — see `normalisePos`. */
  pos: string
  level: CefrLevel
  /** Dataset identifier, e.g. 'cefrj-1.5'. */
  source: string
  levelSource: LevelSource
  /** 1 for stated levels; below 1 for derived ones. */
  confidence: number
}

export interface GrammarEntry {
  /** Shorthand code from the source, e.g. 'PP.I_am'. */
  id: string
  item: string
  sentenceType: string
  level: CefrLevel
  source: string
  levelSource: LevelSource
  confidence: number
}
