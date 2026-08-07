'use client'

// # Grammar reference page — browse complete English grammar patterns.
// # Dropdown selects a category (tenses, conditionals, modals, etc.),
// # then patterns are shown with structure, meaning, examples, and
// # common mistakes. Each pattern expands for full detail.

import { useState, useMemo } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { GRAMMAR_CATEGORIES } from '@/lib/reference/grammar-data'
import { GRAMMAR_CATEGORIES_2 } from '@/lib/reference/grammar-data-2'
import { GRAMMAR_CATEGORIES_3 } from '@/lib/reference/grammar-data-3'
import { GRAMMAR_CATEGORIES_4 } from '@/lib/reference/grammar-data-4'
import { GRAMMAR_CATEGORIES_5 } from '@/lib/reference/grammar-data-5'
import type { GrammarCategory, GrammarPattern } from '@/lib/reference/types'

// # Merge grammar categories from multiple data files.
// # Categories with matching IDs get their patterns combined.
// # New categories (unique IDs) are appended to the list.
function mergeGrammarCategories(...sources: GrammarCategory[][]): GrammarCategory[] {
  const merged = new Map<string, GrammarCategory>()

  for (const source of sources) {
    for (const cat of source) {
      const existing = merged.get(cat.id)
      if (existing) {
        // # Same ID — append patterns from expansion file to existing category.
        existing.patterns = [...existing.patterns, ...cat.patterns]
      } else {
        // # New category — add with a copy of the patterns array.
        merged.set(cat.id, { ...cat, patterns: [...cat.patterns] })
      }
    }
  }

  return Array.from(merged.values())
}

// # Combine all grammar data files into one merged list.
const ALL_GRAMMAR_CATEGORIES = mergeGrammarCategories(
  GRAMMAR_CATEGORIES,
  GRAMMAR_CATEGORIES_2,
  GRAMMAR_CATEGORIES_3,
  GRAMMAR_CATEGORIES_4,
  GRAMMAR_CATEGORIES_5,
)

// # Colour badges for CEFR levels.
const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

function PatternCard({ pattern }: { pattern: GrammarPattern }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="transition-all hover:ring-2 hover:ring-primary/20">
      <CardContent className="pt-4">
        {/* # Pattern header — name and level */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start justify-between text-left"
          aria-expanded={expanded}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold">{pattern.name}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[pattern.level] ?? ''}`}>
              {pattern.level}
            </span>
          </div>
          <span className="ml-2 text-muted-foreground">{expanded ? '▲' : '▼'}</span>
        </button>

        {/* # Structure — always visible */}
        <div className="mt-2 rounded-md bg-muted/50 px-3 py-2">
          <p className="font-mono text-sm">{pattern.structure}</p>
        </div>

        {/* # Meaning — always visible */}
        <p className="mt-2 text-sm">
          <strong>Meaning:</strong> {pattern.meaning}
        </p>

        {/* # Example — always visible */}
        <p className="mt-1 text-sm italic text-muted-foreground">
          &ldquo;{pattern.example}&rdquo;
        </p>

        {/* # Expanded details */}
        {expanded && (
          <div className="mt-3 space-y-3 border-t border-border pt-3 text-sm">
            <p><strong>Context:</strong> {pattern.context}</p>
            <p><strong>Explanation:</strong> {pattern.explanation}</p>

            {/* # More examples */}
            {pattern.moreExamples && pattern.moreExamples.length > 0 && (
              <div>
                <p className="font-medium">More examples:</p>
                <ul className="ml-4 mt-1 list-disc space-y-1 text-muted-foreground">
                  {pattern.moreExamples.map((ex, i) => (
                    <li key={i} className="italic">{ex}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* # Common mistakes */}
            {pattern.commonMistakes && pattern.commonMistakes.length > 0 && (
              <div>
                <p className="font-medium text-red-600 dark:text-red-400">Common mistakes:</p>
                <ul className="ml-4 mt-1 list-disc space-y-1">
                  {pattern.commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function GrammarPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_GRAMMAR_CATEGORIES[0]?.id ?? '')
  const selectedCategory = ALL_GRAMMAR_CATEGORIES.find(c => c.id === selectedCategoryId)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* # Page header */}
        <h1 className="text-3xl font-bold tracking-tight">Grammar Patterns</h1>
        <p className="mt-2 text-muted-foreground">
          Complete English grammar reference from A1 to C2. Each pattern includes
          structure, meaning, examples, explanations, and common mistakes.
        </p>

        {/* # Category selector dropdown */}
        <div className="mt-6">
          <label htmlFor="category-select" className="mb-2 block text-sm font-medium">
            Choose a category
          </label>
          <select
            id="category-select"
            value={selectedCategoryId}
            onChange={e => setSelectedCategoryId(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:w-80"
          >
            {ALL_GRAMMAR_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* # Category description */}
        {selectedCategory && (
          <p className="mt-3 text-sm text-muted-foreground">{selectedCategory.description}</p>
        )}

        {/* # Patterns list */}
        <div className="mt-8 space-y-4">
          {selectedCategory?.patterns.map(pattern => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>

        {/* # Stats footer */}
        {selectedCategory && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {selectedCategory.patterns.length} patterns in {selectedCategory.name}
          </p>
        )}
      </main>
    </div>
  )
}
