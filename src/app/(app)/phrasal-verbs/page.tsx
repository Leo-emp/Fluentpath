'use client'

// # Phrasal verbs reference page — browse phrasal verbs by field/profession.
// # Dropdown selects a field, then entries are shown with meaning, context,
// # example, explanation, separability, and formal equivalent.

import { useState } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { PHRASAL_VERB_FIELDS } from '@/lib/reference/phrasal-verbs-data'
import type { PhrasalVerbEntry } from '@/lib/reference/types'

// # Colour badges for CEFR levels.
const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

function PhrasalVerbCard({ entry }: { entry: PhrasalVerbEntry }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="transition-all hover:ring-2 hover:ring-primary/20">
      <CardContent className="pt-4">
        {/* # Phrasal verb header — verb, level, separability */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start justify-between text-left"
          aria-expanded={expanded}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold">{entry.phrasalVerb}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[entry.level] ?? ''}`}>
              {entry.level}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              entry.separable
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
            }`}>
              {entry.separable ? 'separable' : 'inseparable'}
            </span>
          </div>
          <span className="ml-2 text-muted-foreground">{expanded ? '▲' : '▼'}</span>
        </button>

        {/* # Meaning — always visible */}
        <p className="mt-2 text-sm">
          <strong>Meaning:</strong> {entry.meaning}
        </p>

        {/* # Formal equivalent — always visible */}
        {entry.formalEquivalent && (
          <p className="mt-1 text-sm text-muted-foreground">
            <strong>Formal equivalent:</strong> {entry.formalEquivalent}
          </p>
        )}

        {/* # Expanded details */}
        {expanded && (
          <div className="mt-3 space-y-2 border-t border-border pt-3 text-sm">
            <p><strong>Context:</strong> {entry.context}</p>
            <p className="italic text-muted-foreground">
              &ldquo;{entry.example}&rdquo;
            </p>
            <p><strong>Explanation:</strong> {entry.explanation}</p>

            {/* # Separability note */}
            <div className={`mt-2 rounded-md px-3 py-2 ${
              entry.separable
                ? 'bg-amber-50 dark:bg-amber-950'
                : 'bg-slate-50 dark:bg-slate-900'
            }`}>
              <p className="text-xs">
                {entry.separable
                  ? `Separable: You can put the object between the verb and particle. Example: "${entry.phrasalVerb.split(' ')[0]} it ${entry.phrasalVerb.split(' ').slice(1).join(' ')}"`
                  : `Inseparable: The verb and particle must stay together. You cannot put the object between them.`
                }
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function PhrasalVerbsPage() {
  const [selectedFieldId, setSelectedFieldId] = useState(PHRASAL_VERB_FIELDS[0]?.id ?? '')
  const selectedField = PHRASAL_VERB_FIELDS.find(f => f.id === selectedFieldId)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* # Page header */}
        <h1 className="text-3xl font-bold tracking-tight">Phrasal Verbs</h1>
        <p className="mt-2 text-muted-foreground">
          Essential phrasal verbs organised by field and profession. Each entry
          includes meaning, context, examples, formal equivalents, and whether
          the verb is separable or inseparable.
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
            {PHRASAL_VERB_FIELDS.map(field => (
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

        {/* # Entries list */}
        <div className="mt-8 space-y-3">
          {selectedField?.entries.map(entry => (
            <PhrasalVerbCard key={entry.phrasalVerb} entry={entry} />
          ))}
        </div>

        {/* # Stats footer */}
        {selectedField && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {selectedField.entries.length} phrasal verbs in {selectedField.name}
          </p>
        )}
      </main>
    </div>
  )
}
