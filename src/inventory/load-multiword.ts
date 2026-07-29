/**
 * Multi-word verbs from WordNet.
 *
 * This is the fix for a measured defect. Without these, the profiler reads
 * "carried out" as carry (A1) + out (A1) and scores a B2 sentence as A2 —
 * approving material two levels too hard while reporting that all is well.
 *
 * WordNet supplies the phrases but no CEFR levels. Those are derived
 * separately in `level-multiword.ts` and marked as estimates.
 *
 * File format: one lemma per line, space-delimited fields, multi-word lemmas
 * joined by underscores. The file opens with a licence header whose lines
 * each begin with two spaces.
 */
export function extractMultiwordVerbs(indexVerbText: string): string[] {
  const seen = new Set<string>()

  for (const line of indexVerbText.split(/\r?\n/)) {
    if (line === '' || line.startsWith('  ')) continue // blank or licence header

    const lemma = line.split(' ')[0]
    if (!lemma || !lemma.includes('_')) continue

    seen.add(lemma.toLowerCase().replace(/_/g, ' '))
  }

  return [...seen]
}
