import { readFileSync } from 'node:fs'
import { loadVocabulary } from '@/inventory/load-vocabulary'
import { extractMultiwordVerbs } from '@/inventory/load-multiword'
import { buildLexicalLookup, deriveMultiwordLevel } from '@/inventory/level-multiword'
import { levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { ProfilerInventory } from './profile'

const VOCAB_CSV = 'data/inventories/cefrj-vocabulary-profile-1.5.csv'
const OCTANOVE_CSV = 'data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv'
const WORDNET_VERBS = 'node_modules/wordnet-db/dict/index.verb'

/**
 * Assemble the profiler's inventory from the vendored sources.
 *
 * Reads from disk on each call, which suits tests and the offline content
 * pipeline. The application will load this from the database instead, built by
 * the ingestion step in a later release.
 */
export function buildProfilerInventory(): ProfilerInventory {
  const entries = loadVocabulary(
    readFileSync(VOCAB_CSV, 'utf8'),
    readFileSync(OCTANOVE_CSV, 'utf8'),
  )

  // Single-word lookup: headword to its lowest level across parts of speech.
  // Collapsing parts of speech is the conservative choice for a gate — it
  // errs toward treating a word as easier, so above-level flags are reliable
  // rather than noisy.
  const words = new Map<string, CefrLevel>()
  for (const e of entries) {
    if (e.headword.includes(' ')) continue // multi-word entries go in `phrases`
    const existing = words.get(e.headword)
    if (!existing || levelIndex(e.level) < levelIndex(existing)) words.set(e.headword, e.level)
  }

  const phrases = new Map<string, CefrLevel>()

  // Multi-word entries that came with a stated level are authoritative and
  // take precedence over anything derived.
  for (const e of entries) {
    if (!e.headword.includes(' ')) continue
    const existing = phrases.get(e.headword)
    if (!existing || levelIndex(e.level) < levelIndex(existing)) phrases.set(e.headword, e.level)
  }

  // WordNet phrases have no stated level, so derive one. Multi-word verbs are
  // treated as idiomatic by default: that is precisely what makes them worth
  // listing separately, and it is the conservative choice for a gate.
  // Over-estimating difficulty rejects content for review; under-estimating
  // ships it to a learner who cannot read it.
  const lookup = buildLexicalLookup(entries.filter((e) => !e.headword.includes(' ')))

  for (const phrase of extractMultiwordVerbs(readFileSync(WORDNET_VERBS, 'utf8'))) {
    if (phrases.has(phrase)) continue // never override a stated level
    phrases.set(phrase, deriveMultiwordLevel(phrase, lookup, { idiomatic: true }).level)
  }

  return { words, phrases }
}
