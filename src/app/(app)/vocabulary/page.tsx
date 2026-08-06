'use client'

// # Vocabulary reference page — browse vocabulary by field/area of life.
// # Dropdown selects a field, then entries are shown grouped by word class
// # (nouns, verbs with V1/V2/V3, adjectives, adverbs).
// # Each entry includes: meaning, context, example, and full explanation.

import { useState } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { VOCAB_FIELDS } from '@/lib/reference/vocabulary-data'
import { VOCAB_FIELDS_2 } from '@/lib/reference/vocabulary-data-2'
import { VOCAB_FIELDS_3 } from '@/lib/reference/vocabulary-data-3'
import { VOCAB_FIELDS_4 } from '@/lib/reference/vocabulary-data-4'
import { VOCAB_FIELDS_5 } from '@/lib/reference/vocabulary-data-5'
import { VOCAB_FIELDS_6 } from '@/lib/reference/vocabulary-data-6'
import { VOCAB_FIELDS_7 } from '@/lib/reference/vocabulary-data-7'
import { VOCAB_FIELDS_8 } from '@/lib/reference/vocabulary-data-8'
import type { VocabField } from '@/lib/reference/types'

// # Merge all data files, combining entries for fields with matching IDs.
// # Expansion files use the same field ID as originals so entries merge
// # into one dropdown entry with 50+ words per category.
function mergeVocabFields(...arrays: VocabField[][]): VocabField[] {
  const map = new Map<string, VocabField>()
  for (const arr of arrays) {
    for (const field of arr) {
      const existing = map.get(field.id)
      if (existing) {
        // # Append entries from expansion file to existing category
        existing.entries = [...existing.entries, ...field.entries]
      } else {
        map.set(field.id, { ...field, entries: [...field.entries] })
      }
    }
  }
  return Array.from(map.values())
}

const ALL_VOCAB_FIELDS = mergeVocabFields(
  VOCAB_FIELDS,   // # Part 1: 10 original categories
  VOCAB_FIELDS_2, // # Part 2: 10 more categories
  VOCAB_FIELDS_3, // # Part 3: 5 new diverse categories
  VOCAB_FIELDS_4, // # Part 4: Expansion for Part 1 categories (same IDs → merge)
  VOCAB_FIELDS_5, // # Part 5: Expansion for Part 2 categories (same IDs → merge)
  VOCAB_FIELDS_6, // # Part 6: Second expansion for Part 1 categories (50+ target)
  VOCAB_FIELDS_7, // # Part 7: Second expansion for Part 2 categories (50+ target)
  VOCAB_FIELDS_8, // # Part 8: Expansion for Part 3 categories (50+ target)
)
import type { VocabEntry } from '@/lib/reference/types'

// # Group entries by word class for display.
const WORD_CLASSES = ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction'] as const
const WORD_CLASS_LABELS: Record<string, string> = {
  noun: 'Nouns',
  verb: 'Verbs',
  adjective: 'Adjectives',
  adverb: 'Adverbs',
  preposition: 'Prepositions',
  conjunction: 'Conjunctions',
}

// # Colour badges for CEFR levels.
const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

function VocabCard({ entry }: { entry: VocabEntry }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="transition-all hover:ring-2 hover:ring-primary/20">
      <CardContent className="pt-4">
        {/* # Word header — word, class badge, level badge */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start justify-between text-left"
          aria-expanded={expanded}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold">{entry.word}</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
              {entry.wordClass}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[entry.level] ?? ''}`}>
              {entry.level}
            </span>
          </div>
          <span className="ml-2 text-muted-foreground">{expanded ? '▲' : '▼'}</span>
        </button>

        {/* # Verb forms — V1/V2/V3 */}
        {entry.verbForms && (
          <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
            <span><strong>V1:</strong> {entry.verbForms.v1}</span>
            <span><strong>V2:</strong> {entry.verbForms.v2}</span>
            <span><strong>V3:</strong> {entry.verbForms.v3}</span>
          </div>
        )}

        {/* # Meaning — always visible */}
        <p className="mt-2 text-sm">
          <strong>Meaning:</strong> {entry.meaning}
        </p>

        {/* # Expanded details */}
        {expanded && (
          <div className="mt-3 space-y-2 border-t border-border pt-3 text-sm">
            <p><strong>Context:</strong> {entry.context}</p>
            <p className="italic text-muted-foreground">
              &ldquo;{entry.example}&rdquo;
            </p>
            <p><strong>Explanation:</strong> {entry.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function VocabularyPage() {
  // # Default to the first field.
  const [selectedFieldId, setSelectedFieldId] = useState(ALL_VOCAB_FIELDS[0]?.id ?? '')
  const selectedField = ALL_VOCAB_FIELDS.find(f => f.id === selectedFieldId)

  // # Group entries by word class.
  const grouped = WORD_CLASSES.reduce<Record<string, VocabEntry[]>>((acc, wc) => {
    const entries = selectedField?.entries.filter(e => e.wordClass === wc) ?? []
    if (entries.length > 0) acc[wc] = entries
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* # Page header */}
        <h1 className="text-3xl font-bold tracking-tight">Vocabulary</h1>
        <p className="mt-2 text-muted-foreground">
          Browse vocabulary organised by area of life. Each word includes meaning,
          verb forms, context, examples, and detailed explanations.
        </p>

        {/* # Field selector dropdown */}
        <div className="mt-6">
          <label htmlFor="field-select" className="mb-2 block text-sm font-medium">
            Choose a field
          </label>
          <select
            id="field-select"
            value={selectedFieldId}
            onChange={e => setSelectedFieldId(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:w-80"
          >
            {ALL_VOCAB_FIELDS.map(field => (
              <option key={field.id} value={field.id}>
                {field.icon} {field.name}
              </option>
            ))}
          </select>
        </div>

        {/* # Field description */}
        {selectedField && (
          <p className="mt-3 text-sm text-muted-foreground">{selectedField.description}</p>
        )}

        {/* # Entries grouped by word class */}
        <div className="mt-8 space-y-8">
          {Object.entries(grouped).map(([wc, entries]) => (
            <section key={wc}>
              <h2 className="mb-4 text-xl font-semibold">
                {WORD_CLASS_LABELS[wc] ?? wc}
              </h2>
              <div className="space-y-3">
                {entries.map(entry => (
                  <VocabCard key={entry.word} entry={entry} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* # Stats footer */}
        {selectedField && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {selectedField.entries.length} words in {selectedField.name}
          </p>
        )}
      </main>
    </div>
  )
}
