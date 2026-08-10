'use client'

// # Learning Path — guided curriculum based on the learner's CEFR level.
// # Shows all skills (Grammar → Writing → Reading → Listening → Speaking)
// # in a structured order. Each lesson shows completion status.
// # Users progress sequentially through their level, then advance.

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'

// # Import all lesson data files.
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
import { LESSON_CATEGORIES_32 } from '@/lib/reference/lesson-data-32'
import type { LessonCategory, Lesson } from '@/lib/reference/types'

// # ═══════════════════════════════════════════════════════════════════
// # DATA SETUP
// # ═══════════════════════════════════════════════════════════════════

// # Merge lesson categories from multiple data files.
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
  LESSON_CATEGORIES, LESSON_CATEGORIES_2, LESSON_CATEGORIES_3,
  LESSON_CATEGORIES_4, LESSON_CATEGORIES_5, LESSON_CATEGORIES_6,
  LESSON_CATEGORIES_7, LESSON_CATEGORIES_8, LESSON_CATEGORIES_9,
  LESSON_CATEGORIES_10, LESSON_CATEGORIES_11, LESSON_CATEGORIES_12,
  LESSON_CATEGORIES_13, LESSON_CATEGORIES_14, LESSON_CATEGORIES_15,
  LESSON_CATEGORIES_16, LESSON_CATEGORIES_17, LESSON_CATEGORIES_18,
  LESSON_CATEGORIES_19, LESSON_CATEGORIES_20, LESSON_CATEGORIES_21,
  LESSON_CATEGORIES_22,
  LESSON_CATEGORIES_23,
  LESSON_CATEGORIES_24,
  LESSON_CATEGORIES_25,
  LESSON_CATEGORIES_26,
  LESSON_CATEGORIES_27,
  LESSON_CATEGORIES_28,
  LESSON_CATEGORIES_29,
  LESSON_CATEGORIES_30,
  LESSON_CATEGORIES_31, LESSON_CATEGORIES_32,
)

// # CEFR levels in order.
const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

// # Skills in the recommended learning order.
// # Grammar first (foundation), then receptive skills, then productive skills.
const SKILL_ORDER = ['grammar', 'reading', 'listening', 'writing', 'speaking'] as const

// # Skill display config.
const SKILL_META: Record<string, { label: string; icon: string; colour: string }> = {
  grammar: { label: 'Grammar', icon: '📐', colour: 'border-amber-300 dark:border-amber-700' },
  reading: { label: 'Reading', icon: '📖', colour: 'border-blue-300 dark:border-blue-700' },
  listening: { label: 'Listening', icon: '🎧', colour: 'border-orange-300 dark:border-orange-700' },
  writing: { label: 'Writing', icon: '✏️', colour: 'border-green-300 dark:border-green-700' },
  speaking: { label: 'Speaking', icon: '🗣️', colour: 'border-purple-300 dark:border-purple-700' },
}

// # Level badge colours.
const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

// # Flatten all lessons once for filtering.
const ALL_LESSONS_FLAT = ALL_LESSON_CATEGORIES.flatMap(c => c.lessons)

// # Build the ordered lesson list for a given CEFR level.
// # Returns lessons grouped by skill in SKILL_ORDER.
// # Uses each lesson's own skill + level fields (not category IDs)
// # because grammar categories use non-standard IDs like 'a1-foundations'.
function getLessonsForLevel(level: string): { skill: string; lessons: Lesson[] }[] {
  const groups: { skill: string; lessons: Lesson[] }[] = []

  for (const skill of SKILL_ORDER) {
    // # Filter lessons by matching level AND skill metadata.
    const lessons = ALL_LESSONS_FLAT.filter(
      l => l.level === level && l.skill === skill
    )
    if (lessons.length > 0) {
      groups.push({ skill, lessons })
    }
  }

  return groups
}

// # ═══════════════════════════════════════════════════════════════════
// # COMPONENTS
// # ═══════════════════════════════════════════════════════════════════

// # Single lesson row in the path — shows title, duration, and completion status.
function LessonRow({
  lesson,
  index,
  isCompleted,
  isNext,
  onClick,
}: {
  lesson: Lesson
  index: number
  isCompleted: boolean
  isNext: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left transition-all ${
        isCompleted
          ? 'bg-green-50/50 hover:bg-green-50 dark:bg-green-950/20 dark:hover:bg-green-950/30'
          : isNext
            ? 'bg-primary/5 ring-2 ring-primary/30 hover:bg-primary/10'
            : 'hover:bg-muted'
      }`}
    >
      {/* # Lesson number / completion indicator */}
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
        isCompleted
          ? 'bg-green-500 text-white'
          : isNext
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
      }`}>
        {isCompleted ? '✓' : index + 1}
      </div>

      {/* # Lesson info */}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium leading-snug ${
          isCompleted ? 'text-muted-foreground line-through decoration-green-500/50' : ''
        }`}>
          {lesson.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {lesson.duration} min · {lesson.sections.length} sections
        </p>
      </div>

      {/* # Status indicator */}
      {isNext && (
        <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
          Next
        </span>
      )}
    </button>
  )
}

// # Skill group — collapsible section showing all lessons for one skill.
function SkillGroup({
  skill,
  lessons,
  completedSet,
  globalIndex,
  firstIncompleteIndex,
  onLessonClick,
}: {
  skill: string
  lessons: Lesson[]
  completedSet: Set<string>
  globalIndex: number
  firstIncompleteIndex: number
  onLessonClick: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const meta = SKILL_META[skill] ?? { label: skill, icon: '📚', colour: 'border-gray-300' }
  const completedCount = lessons.filter(l => completedSet.has(l.id)).length
  const allDone = completedCount === lessons.length

  return (
    <div className={`rounded-xl border-l-4 ${meta.colour} bg-card`}>
      {/* # Skill header — click to expand/collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{meta.icon}</span>
          <div>
            <h3 className="font-semibold">{meta.label}</h3>
            <p className="text-xs text-muted-foreground">
              {completedCount} / {lessons.length} completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* # Progress bar */}
          <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-muted sm:block">
            <div
              className={`h-full rounded-full transition-all ${allDone ? 'bg-green-500' : 'bg-primary'}`}
              style={{ width: `${lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0}%` }}
            />
          </div>
          {/* # Expand/collapse chevron */}
          <span className={`text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </div>
      </button>

      {/* # Lesson list */}
      {expanded && (
        <div className="space-y-1 px-3 pb-4">
          {lessons.map((lesson, i) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              index={globalIndex + i}
              isCompleted={completedSet.has(lesson.id)}
              isNext={globalIndex + i === firstIncompleteIndex}
              onClick={() => onLessonClick(lesson.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// # ═══════════════════════════════════════════════════════════════════
// # MAIN PAGE
// # ═══════════════════════════════════════════════════════════════════

export default function LearningPathPage() {
  const router = useRouter()
  const [level, setLevel] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  // # Fetch learner profile + completion data on mount.
  useEffect(() => {
    async function load() {
      try {
        const [meData, compData] = await Promise.all([
          apiFetch<{ learner: { currentLevel: string | null } }>('/api/me'),
          apiFetch<{ completions: { lessonId: string }[] }>('/api/lesson-completions'),
        ])
        const lvl = meData.learner.currentLevel
        setLevel(lvl)
        setSelectedLevel(lvl)
        setCompletedSet(new Set(compData.completions.map(c => c.lessonId)))
      } catch {
        // # apiFetch handles 401 redirect.
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // # Build the lesson groups for the selected level.
  const skillGroups = useMemo(() => {
    if (!selectedLevel) return []
    return getLessonsForLevel(selectedLevel)
  }, [selectedLevel])

  // # Flatten all lessons and find the first incomplete one.
  const allLessons = useMemo(() => skillGroups.flatMap(g => g.lessons), [skillGroups])
  const firstIncompleteIndex = useMemo(() => {
    const idx = allLessons.findIndex(l => !completedSet.has(l.id))
    return idx === -1 ? -1 : idx
  }, [allLessons, completedSet])

  // # Overall progress stats.
  const totalLessons = allLessons.length
  const completedCount = allLessons.filter(l => completedSet.has(l.id)).length
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  if (loading) return <><NavBar /><PageSkeleton /></>

  // # No level — send to placement.
  if (!level) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main className="mx-auto max-w-lg px-6 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Find Your Level First</h1>
          <p className="mb-6 text-muted-foreground">
            Take a 5-minute placement test so we can build your personalised learning path.
          </p>
          <Button size="lg" onClick={() => router.push('/placement')}>
            Start Placement Test
          </Button>
        </main>
      </div>
    )
  }

  // # Track cumulative index for numbering across skill groups.
  let cumulativeIndex = 0

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        {/* # Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Learning Path</h1>
          <p className="mt-2 text-muted-foreground">
            Your guided curriculum — work through each skill in order.
          </p>
        </div>

        {/* # Level selector + progress overview */}
        <Card className="mb-8">
          <CardContent className="pt-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* # Level picker */}
              <div className="flex items-center gap-3">
                <label htmlFor="level-select" className="text-sm font-medium">Level</label>
                <div className="flex gap-1.5">
                  {CEFR_LEVELS.map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        selectedLevel === lvl
                          ? LEVEL_COLOURS[lvl] + ' ring-2 ring-offset-1 ring-primary/30'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* # Progress summary */}
              <div className="text-right">
                <p className="text-2xl font-bold">{progressPercent}%</p>
                <p className="text-xs text-muted-foreground">
                  {completedCount} / {totalLessons} lessons
                </p>
              </div>
            </div>

            {/* # Full-width progress bar */}
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  progressPercent === 100 ? 'bg-green-500' : 'bg-primary'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* # Continue button — navigates to the next incomplete lesson */}
            {firstIncompleteIndex >= 0 && allLessons[firstIncompleteIndex] && (
              <div className="mt-4">
                <Button
                  size="sm"
                  onClick={() => router.push(`/lessons/${allLessons[firstIncompleteIndex]!.id}`)}
                >
                  Continue: {allLessons[firstIncompleteIndex]!.title}
                </Button>
              </div>
            )}

            {progressPercent === 100 && (
              <p className="mt-4 text-sm font-medium text-green-600 dark:text-green-400">
                Level {selectedLevel} complete! Select the next level above to continue.
              </p>
            )}
          </CardContent>
        </Card>

        {/* # Skill groups */}
        {skillGroups.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No lessons available for {selectedLevel} yet.
          </p>
        ) : (
          <div className="space-y-4">
            {skillGroups.map(group => {
              const startIndex = cumulativeIndex
              cumulativeIndex += group.lessons.length
              return (
                <SkillGroup
                  key={group.skill}
                  skill={group.skill}
                  lessons={group.lessons}
                  completedSet={completedSet}
                  globalIndex={startIndex}
                  firstIncompleteIndex={firstIncompleteIndex}
                  onLessonClick={(id) => router.push(`/lessons/${id}`)}
                />
              )
            })}
          </div>
        )}

        {/* # Stats footer */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          {totalLessons} lessons across {skillGroups.length} skills at {selectedLevel}
        </p>
      </main>
    </div>
  )
}
