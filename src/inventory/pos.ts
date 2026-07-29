export const NORMALISED_POS = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'determiner',
  'conjunction',
  'interjection',
  'number',
  'other',
] as const

export type NormalisedPos = (typeof NORMALISED_POS)[number]

/**
 * Map a source dataset's part-of-speech string onto one vocabulary.
 *
 * CEFR-J splits verbs into be-verb / do-verb / have-verb / modal auxiliary,
 * which is a useful distinction for teaching grammar but not for vocabulary
 * lookup, so all of them collapse to `verb`. `vern` is a typo in the Octanove
 * file, and one Octanove row has a blank part of speech.
 *
 * Note the profiler does not use part of speech for lookup — it keys words by
 * headword alone and takes the lowest level across parts of speech, which is
 * the conservative choice for a quality gate. This is retained because it is
 * linguistically meaningful and R1b-b stores it.
 */
export function normalisePos(raw: string): NormalisedPos {
  const key = raw.trim().toLowerCase()

  const map: Record<string, NormalisedPos> = {
    noun: 'noun',
    verb: 'verb',
    vern: 'verb', // typo in octanove-vocabulary-profile-c1c2-1.0.csv
    'be-verb': 'verb',
    'do-verb': 'verb',
    'have-verb': 'verb',
    'modal auxiliary': 'verb',
    adjective: 'adjective',
    adverb: 'adverb',
    pronoun: 'pronoun',
    preposition: 'preposition',
    determiner: 'determiner',
    conjunction: 'conjunction',
    interjection: 'interjection',
    number: 'number',
  }

  return map[key] ?? 'other'
}
