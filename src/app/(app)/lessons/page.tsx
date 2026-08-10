'use client'

// # Lessons library page — browse structured lessons by category.
// # Each lesson card shows title, skill badge, level badge, duration,
// # and objective count. Category dropdown filters by topic area.
// # Uses the same premium expandable card pattern as grammar/vocab/phrasal verbs.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { LESSON_CATEGORIES } from '@/lib/reference/lesson-data'
import { LESSON_CATEGORIES_2 } from '@/lib/reference/lesson-data-2'
import { LESSON_CATEGORIES_3 } from '@/lib/reference/lesson-data-3'
import { LESSON_CATEGORIES_4 } from '@/lib/reference/lesson-data-4'
import { LESSON_CATEGORIES_5 } from '@/lib/reference/lesson-data-5'
import { LESSON_CATEGORIES_6 } from '@/lib/reference/lesson-data-6'
import { LESSON_CATEGORIES_7 } from '@/lib/reference/lesson-data-7'
import { LESSON_CATEGORIES_8 } from '@/lib/reference/lesson-data-8'
import { LESSON_CATEGORIES_9 } from '@/lib/reference/lesson-data-9'
import { LESSON_CATEGORIES_10 } from '@/lib/reference/lesson-data-10'
import { LESSON_CATEGORIES_11 } from '@/lib/reference/lesson-data-11'
import { LESSON_CATEGORIES_12 } from '@/lib/reference/lesson-data-12'
import { LESSON_CATEGORIES_13 } from '@/lib/reference/lesson-data-13'
import { LESSON_CATEGORIES_14 } from '@/lib/reference/lesson-data-14'
import { LESSON_CATEGORIES_15 } from '@/lib/reference/lesson-data-15'
import { LESSON_CATEGORIES_16 } from '@/lib/reference/lesson-data-16'
import { LESSON_CATEGORIES_17 } from '@/lib/reference/lesson-data-17'
import { LESSON_CATEGORIES_18 } from '@/lib/reference/lesson-data-18'
import { LESSON_CATEGORIES_19 } from '@/lib/reference/lesson-data-19'
import { LESSON_CATEGORIES_20 } from '@/lib/reference/lesson-data-20'
import { LESSON_CATEGORIES_21 } from '@/lib/reference/lesson-data-21'
import { LESSON_CATEGORIES_22 } from '@/lib/reference/lesson-data-22'
import { LESSON_CATEGORIES_23 } from '@/lib/reference/lesson-data-23'
import { LESSON_CATEGORIES_24 } from '@/lib/reference/lesson-data-24'
import { LESSON_CATEGORIES_25 } from '@/lib/reference/lesson-data-25'
import { LESSON_CATEGORIES_26 } from '@/lib/reference/lesson-data-26'
import { LESSON_CATEGORIES_27 } from '@/lib/reference/lesson-data-27'
import { LESSON_CATEGORIES_28 } from '@/lib/reference/lesson-data-28'
import { LESSON_CATEGORIES_29 } from '@/lib/reference/lesson-data-29'
import { LESSON_CATEGORIES_30 } from '@/lib/reference/lesson-data-30'
import { LESSON_CATEGORIES_31 } from '@/lib/reference/lesson-data-31'
import type { LessonCategory, Lesson } from '@/lib/reference/types'

// # Merge lesson categories from multiple data files.
// # Categories with matching IDs get their lessons combined.
function mergeLessonCategories(...sources: LessonCategory[][]): LessonCategory[] {
  const merged = new Map<string, LessonCategory>()

  for (const source of sources) {
    for (const cat of source) {
      const existing = merged.get(cat.id)
      if (existing) {
        existing.lessons = [...existing.lessons, ...cat.lessons]
      } else {
        merged.set(cat.id, { ...cat, lessons: [...cat.lessons] })
      }
    }
  }

  return Array.from(merged.values())
}

const ALL_LESSON_CATEGORIES = mergeLessonCategories(
  LESSON_CATEGORIES,
  LESSON_CATEGORIES_2,
  LESSON_CATEGORIES_3,
  LESSON_CATEGORIES_4,
  LESSON_CATEGORIES_5,
  LESSON_CATEGORIES_6,
  LESSON_CATEGORIES_7,
  LESSON_CATEGORIES_8,
  LESSON_CATEGORIES_9,
  LESSON_CATEGORIES_10,
  LESSON_CATEGORIES_11,
  LESSON_CATEGORIES_12,
  LESSON_CATEGORIES_13,
  LESSON_CATEGORIES_14,
  LESSON_CATEGORIES_15,
  LESSON_CATEGORIES_16,
  LESSON_CATEGORIES_17,
  LESSON_CATEGORIES_18,
  LESSON_CATEGORIES_19,
  LESSON_CATEGORIES_20,
  LESSON_CATEGORIES_21,
  LESSON_CATEGORIES_22,
  LESSON_CATEGORIES_23,
  LESSON_CATEGORIES_24,
  LESSON_CATEGORIES_25,
  LESSON_CATEGORIES_26,
  LESSON_CATEGORIES_27,
  LESSON_CATEGORIES_28,
  LESSON_CATEGORIES_29,
  LESSON_CATEGORIES_30,
  LESSON_CATEGORIES_31,
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

// # Colour badges for skill areas.
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
        {/* # Badges row — skill + level + duration */}
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

        {/* # Title */}
        <h3 className="text-lg font-semibold leading-snug">{lesson.title}</h3>

        {/* # Description */}
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          {lesson.description}
        </p>

        {/* # Objectives preview — first 2 objectives shown */}
        <div className="mt-3 space-y-1">
          {lesson.objectives.slice(0, 2).map((obj, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 text-xs text-primary">&#10003;</span>
              <span>{obj}</span>
            </div>
          ))}
          {lesson.objectives.length > 2 && (
            <p className="pl-5 text-xs text-muted-foreground">
              +{lesson.objectives.length - 2} more objectives
            </p>
          )}
        </div>

        {/* # Footer — section count + CTA hint */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            {lesson.sections.length} sections
          </span>
          <span className="text-xs font-medium text-primary">
            Start lesson →
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LessonsPage() {
  // # "all" shows every lesson; otherwise filter by category ID.
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')

  // # Get lessons for the selected category (or all).
  const displayedCategories = selectedCategoryId === 'all'
    ? ALL_LESSON_CATEGORIES
    : ALL_LESSON_CATEGORIES.filter(c => c.id === selectedCategoryId)

  // # Total lesson count for the current view.
  const totalLessons = displayedCategories.reduce((sum, cat) => sum + cat.lessons.length, 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* # Page header */}
        <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
        <p className="mt-2 text-muted-foreground">
          Structured lessons from A1 to C2 — each with clear objectives, explanations,
          examples, practice exercises, and key takeaways.
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
            <option value="all">All Categories</option>
            {ALL_LESSON_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* # Lessons grouped by category */}
        {displayedCategories.map(cat => (
          <section key={cat.id} className="mt-10">
            {/* # Category header */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {cat.icon} {cat.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
            </div>

            {/* # Lesson cards in responsive grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {cat.lessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>
        ))}

        {/* # Stats footer */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          {totalLessons} lessons across {displayedCategories.length} {displayedCategories.length === 1 ? 'category' : 'categories'}
        </p>
      </main>
    </div>
  )
}
