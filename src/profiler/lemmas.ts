import nlp from 'compromise'

/**
 * Possible dictionary forms of a surface word.
 *
 * The inventory is keyed on headwords ("run"), but real text contains
 * inflections ("running", "ran", "runs"). Without this the profiler matches
 * almost nothing and every text looks advanced, because the unmatched rate
 * goes through the roof.
 *
 * A list is returned rather than a single answer because the caller takes the
 * lowest level found across all candidates. Over-generating costs a few map
 * lookups; under-generating silently loses matches, which is far worse.
 */
export function lemmaCandidates(surface: string, tags: string[]): string[] {
  const word = surface.toLowerCase()
  const out = new Set<string>([word])

  // Very short words are function words; suffix rules would only corrupt them
  // ("as" must not become "a").
  if (word.length <= 2) return [...out]

  if (tags.includes('Verb')) {
    const infinitive = nlp(word).verbs().toInfinitive().text().toLowerCase()
    if (infinitive) out.add(infinitive)
  }

  if (tags.includes('Noun')) {
    const singular = nlp(word).nouns().toSingular().text().toLowerCase()
    if (singular) out.add(singular)
  }

  // Suffix fallbacks for forms compromise does not resolve — when it has
  // mis-tagged the word, or when the tags array is empty because the word
  // appeared without enough context.
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) {
    out.add(word.slice(0, -1))
  }
  if (word.endsWith('es') && word.length > 4) out.add(word.slice(0, -2))

  if (word.endsWith('ed') && word.length > 4) {
    out.add(word.slice(0, -2)) // walked -> walk
    out.add(word.slice(0, -1)) // hoped  -> hope
  }

  if (word.endsWith('ing') && word.length > 5) {
    out.add(word.slice(0, -3)) // hoping -> hop
    out.add(word.slice(0, -3) + 'e') // hoping -> hope
  }

  if (word.endsWith('ly') && word.length > 4) out.add(word.slice(0, -2))

  return [...out]
}
