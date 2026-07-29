import { levelIndex } from '@/skill-graph/types'
import { parseCsv } from './csv'
import { parseCefrLevel } from './level-parser'
import { normalisePos } from './pos'
import type { LexicalEntry } from './types'

const CEFRJ_SOURCE = 'cefrj-1.5'
const OCTANOVE_SOURCE = 'octanove-c1c2-1.0'

/**
 * Load the two vocabulary files into one deduplicated inventory.
 *
 * Both share the columns we need (`headword`, `pos`, `CEFR`), so they are
 * processed identically and differ only in the source recorded against each
 * entry. CEFR-J covers A1-B2; Octanove covers C1-C2.
 */
export function loadVocabulary(cefrjCsv: string, octanoveCsv: string): LexicalEntry[] {
  // Keyed by "headword|pos" so a word can hold different levels as a noun and
  // as a verb, which is linguistically correct — "water" the noun is A1, the
  // verb is harder.
  const byKey = new Map<string, LexicalEntry>()

  const ingest = (csv: string, source: string) => {
    for (const row of parseCsv(csv)) {
      const level = parseCefrLevel(row.CEFR ?? '')
      if (!level) continue // A row without a level tells us nothing.

      const pos = normalisePos(row.pos ?? '')

      // Entries like "airplane/aeroplane" and "adviser/advisor" list spelling
      // variants. Each becomes its own entry so either spelling matches during
      // profiling — 299 rows in the real file take this form.
      for (const variant of (row.headword ?? '').split('/')) {
        const headword = variant.trim().toLowerCase()
        if (!headword) continue

        const key = `${headword}|${pos}`
        const existing = byKey.get(key)

        // Lowest level wins. The real file has "March|noun" at both A1 and B1;
        // a learner meets the word at the earlier level, so that is the one
        // that matters for gating.
        if (existing && levelIndex(existing.level) <= levelIndex(level)) continue

        byKey.set(key, {
          headword,
          pos,
          level,
          source,
          levelSource: 'source',
          confidence: 1,
        })
      }
    }
  }

  ingest(cefrjCsv, CEFRJ_SOURCE)
  ingest(octanoveCsv, OCTANOVE_SOURCE)

  return [...byKey.values()]
}
