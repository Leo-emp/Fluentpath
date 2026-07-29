import { parseCsv } from './csv'
import { parseCefrLevel } from './level-parser'
import type { GrammarEntry } from './types'

const GRAMMAR_SOURCE = 'cefrj-grammar-20180315'

/**
 * Columns that may carry a level, in order of reliability.
 *
 * Two-thirds of rows in the real file leave the CEFR-J assignment blank — 330
 * of 500 — so the other frameworks the file cross-references act as fallbacks.
 * EGP covers the most of the remainder; Core Inventory and GSELO fill fewer.
 *
 * `FREQ*DISP` comes last because it is derived from corpus frequency and
 * dispersion rather than from expert framework judgement. It is real evidence
 * — frequency is the strongest single predictor of level — but it is weaker
 * than a framework's considered assignment, so it is only consulted when every
 * other column is silent. It recovers 13 rows nothing else reaches.
 *
 * With all five, 424 of 500 rows resolve. The remaining 76 carry no level
 * anywhere: 63 have EGP="N/A", 10 have Core Inventory="N/A", and 16 are
 * entirely blank. "N/A" means the structure is absent from that framework, so
 * these are genuinely unclassified rather than lost — mostly marginal
 * constructions such as PASSIVE+MODAL+PROGRESSIVE and "to have been done".
 */
export const GRAMMAR_LEVEL_COLUMNS = [
  'CEFR-J Level',
  'EGP',
  'Core Inventory',
  'GSELO',
  'FREQ*DISP',
] as const

export function loadGrammar(csv: string): { entries: GrammarEntry[]; unresolved: string[] } {
  const entries: GrammarEntry[] = []
  const unresolved: string[] = []

  for (const row of parseCsv(csv)) {
    const id = (row['Shorthand Code'] ?? '').trim()
    if (!id) continue // Without a stable code the row cannot be referenced.

    let level = null
    for (const column of GRAMMAR_LEVEL_COLUMNS) {
      level = parseCefrLevel(row[column] ?? '')
      if (level) break
    }

    if (!level) {
      // Surfaced rather than dropped, so a content author can see exactly what
      // the source data failed to classify instead of silently losing rows.
      unresolved.push(id)
      continue
    }

    entries.push({
      id,
      item: (row['Grammatical Item'] ?? '').trim(),
      sentenceType: (row['Sentence Type'] ?? '').trim(),
      level,
      source: GRAMMAR_SOURCE,
      levelSource: 'source',
      confidence: 1,
    })
  }

  return { entries, unresolved }
}
