import { readFileSync } from 'node:fs'
import { loadVocabulary } from '@/inventory/load-vocabulary'
import { extractMultiwordVerbs } from '@/inventory/load-multiword'
import { buildLexicalLookup, deriveMultiwordLevel } from '@/inventory/level-multiword'
import { levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { PhraseEntry, ProfilerInventory } from './profile'

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

  const phrases = new Map<string, PhraseEntry>()

  // Multi-word entries that came with a stated level are authoritative. These
  // carry confidence 1 and do drive the measured level of a text.
  for (const e of entries) {
    if (!e.headword.includes(' ')) continue
    const existing = phrases.get(e.headword)
    if (!existing || levelIndex(e.level) < levelIndex(existing.level)) {
      phrases.set(e.headword, { level: e.level, confidence: 1 })
    }
  }

  // WordNet phrases have no stated level, so one is derived. They are treated
  // as idiomatic, which is right for "give up" and wrong for "go to" — and
  // nothing in WordNet reliably distinguishes the two. Both glosses and
  // tagged-sense frequency were tested as discriminators and neither worked.
  //
  // So the derived level is carried at low confidence and reported as a
  // question rather than asserted as a measurement. That keeps genuinely hard
  // phrases visible for review without inflating the level of simple text.
  const lookup = buildLexicalLookup(entries.filter((e) => !e.headword.includes(' ')))

  for (const phrase of extractMultiwordVerbs(readFileSync(WORDNET_VERBS, 'utf8'))) {
    if (phrases.has(phrase)) continue // never override a stated level

    const derived = deriveMultiwordLevel(phrase, lookup, { idiomatic: true })
    phrases.set(phrase, { level: derived.level, confidence: derived.confidence })
  }

  return { words, phrases }
}
