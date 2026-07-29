import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'

/**
 * Parse a CEFR level out of the messy strings the source data actually
 * contains.
 *
 * Every format handled here was observed in the real CEFR-J grammar file:
 * sub-levels (A1.1), asterisks (B2.2*), ASCII ranges (A1-B1), ranges using a
 * Japanese full-width dash (A1ーB1), parenthesised ranges (A1-(A2)-B1),
 * comma lists (B1, C2), and the literal "N/A".
 *
 * Ranges resolve to the LOWEST level in them, because a structure spanning
 * A1-B1 is introduced at A1.
 *
 * @returns the level, or null when the value carries no level information
 */
export function parseCefrLevel(raw: string): CefrLevel | null {
  if (!raw) return null

  const cleaned = raw.trim().toUpperCase()
  if (cleaned === '' || cleaned === 'N/A') return null

  // Find every level-shaped token, ignoring sub-level digits, asterisks,
  // brackets and whichever separator was used. Matching the levels rather
  // than parsing the separator deliberately sidesteps the Japanese
  // full-width dash (U+30FC), which appears in the real file and is easy
  // to miss when writing a range parser.
  const matches = cleaned.match(/[ABC][12]/g)
  if (!matches || matches.length === 0) return null

  let lowest: CefrLevel | null = null
  for (const token of matches) {
    // The pattern can only produce valid two-character tokens, but guard
    // anyway so a future change to it cannot inject an invalid level.
    if (!(CEFR_LEVELS as readonly string[]).includes(token)) continue

    const level = token as CefrLevel
    if (lowest === null || levelIndex(level) < levelIndex(lowest)) lowest = level
  }

  return lowest
}
