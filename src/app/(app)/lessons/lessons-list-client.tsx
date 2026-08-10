'use client'

// # Client-side lessons browser with category filter.
// # Receives pre-resolved categories from the server component.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import type { LessonCategory, Lesson } from '@/lib/reference/types'

// # Colour badges for CEFR levels.
const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

const SKILL_COLOURS: Record<string, string> = {
  reading: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  writing: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  speaking: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  listening: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  grammar: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  vocabulary: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  pronunciation: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  general: 'bg-gray-50 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300',
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const router = useRouter()

  return (
    <Card
      className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 hover:shadow-md"
      onClick={() => router.push(`/lessons/${lesson.id}`)}
    >
      <CardContent className="pt-5 pb-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${SKILL_COLOURS[lesson.skill] ?? ''}`}>
            {lesson.skill}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[lesson.level] ?? ''}`}>
            {lesson.level}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {lesson.duration} min
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug">{lesson.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
        <div className="mt-3 space-y-1">
          {lesson.objectives.slice(0, 2).map((obj, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 text-xs text-primary">&#10003;</span>
              <span>{obj}</span>
            </div>
          ))}
          {lesson.objectives.length > 2 && (
            <p className="pl-5 text-xs text-muted-foreground">+{lesson.objectives.length - 2} more objectives</p>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">{lesson.sections.length} sections</span>
          <span className="text-xs font-medium text-primary">Start lesson →</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function LessonsListClient({ categories }: { categories: LessonCategory[] }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')

  const displayedCategories = selectedCategoryId === 'all'
    ? categories
    : categories.filter(c => c.id === selectedCategoryId)

  const totalLessons = displayedCategories.reduce((sum, cat) => sum + cat.lessons.length, 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
        <p className="mt-2 text-muted-foreground">
          Structured lessons from A1 to C2 — each with clear objectives, explanations,
          examples, practice exercises, and key takeaways.
        </p>

        <div className="mt-6">
          <label htmlFor="category-select" className="mb-2 block text-sm font-medium">Choose a category</label>
          <select
            id="category-select"
            value={selectedCategoryId}
            onChange={e => setSelectedCategoryId(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:w-80"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>

        {displayedCategories.map(cat => (
          <section key={cat.id} className="mt-10">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{cat.icon} {cat.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cat.lessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
            </div>
          </section>
        ))}

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {totalLessons} lessons across {displayedCategories.length} {displayedCategories.length === 1 ? 'category' : 'categories'}
        </p>
      </main>
    </div>
  )
}
