'use client'

// # Client-side learning path — receives all lessons from server component,
// # handles level selection, completion tracking, and navigation.

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import type { Lesson } from '@/lib/reference/types'

// # CEFR levels in order.
const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

// # Skills in the recommended learning order.
const SKILL_ORDER = ['grammar', 'reading', 'listening', 'writing', 'speaking'] as const

const SKILL_META: Record<string, { label: string; icon: string; colour: string }> = {
  grammar: { label: 'Grammar', icon: '📐', colour: 'border-amber-300 dark:border-amber-700' },
  reading: { label: 'Reading', icon: '📖', colour: 'border-blue-300 dark:border-blue-700' },
  listening: { label: 'Listening', icon: '🎧', colour: 'border-orange-300 dark:border-orange-700' },
  writing: { label: 'Writing', icon: '✏️', colour: 'border-green-300 dark:border-green-700' },
  speaking: { label: 'Speaking', icon: '🗣️', colour: 'border-purple-300 dark:border-purple-700' },
}

const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

function LessonRow({
  lesson, index, isCompleted, isNext, onClick,
}: {
  lesson: Lesson; index: number; isCompleted: boolean; isNext: boolean; onClick: () => void
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
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
        isCompleted ? 'bg-green-500 text-white' : isNext ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
      }`}>
        {isCompleted ? '✓' : index + 1}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium leading-snug ${isCompleted ? 'text-muted-foreground line-through decoration-green-500/50' : ''}`}>
          {lesson.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{lesson.duration} min · {lesson.sections.length} sections</p>
      </div>
      {isNext && (
        <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">Next</span>
      )}
    </button>
  )
}

function SkillGroup({
  skill, lessons, completedSet, globalIndex, firstIncompleteIndex, onLessonClick,
}: {
  skill: string; lessons: Lesson[]; completedSet: Set<string>; globalIndex: number; firstIncompleteIndex: number; onLessonClick: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const meta = SKILL_META[skill] ?? { label: skill, icon: '📚', colour: 'border-gray-300' }
  const completedCount = lessons.filter(l => completedSet.has(l.id)).length
  const allDone = completedCount === lessons.length

  return (
    <div className={`rounded-xl border-l-4 ${meta.colour} bg-card`}>
      <button onClick={() => setExpanded(!expanded)} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <span className="text-xl">{meta.icon}</span>
          <div>
            <h3 className="font-semibold">{meta.label}</h3>
            <p className="text-xs text-muted-foreground">{completedCount} / {lessons.length} completed</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-muted sm:block">
            <div
              className={`h-full rounded-full transition-all ${allDone ? 'bg-green-500' : 'bg-primary'}`}
              style={{ width: `${lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0}%` }}
            />
          </div>
          <span className={`text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </button>
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

// # Build ordered lesson groups for a given CEFR level.
function getLessonsForLevel(allLessons: Lesson[], level: string): { skill: string; lessons: Lesson[] }[] {
  const groups: { skill: string; lessons: Lesson[] }[] = []
  for (const skill of SKILL_ORDER) {
    const lessons = allLessons.filter(l => l.level === level && l.skill === skill)
    if (lessons.length > 0) groups.push({ skill, lessons })
  }
  return groups
}

export function LearningPathClient({ allLessons }: { allLessons: Lesson[] }) {
  const router = useRouter()
  const [level, setLevel] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

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

  const skillGroups = useMemo(() => {
    if (!selectedLevel) return []
    return getLessonsForLevel(allLessons, selectedLevel)
  }, [selectedLevel, allLessons])

  const levelLessons = useMemo(() => skillGroups.flatMap(g => g.lessons), [skillGroups])
  const firstIncompleteIndex = useMemo(() => {
    const idx = levelLessons.findIndex(l => !completedSet.has(l.id))
    return idx === -1 ? -1 : idx
  }, [levelLessons, completedSet])

  const totalLessons = levelLessons.length
  const completedCount = levelLessons.filter(l => completedSet.has(l.id)).length
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  if (loading) return <><NavBar /><PageSkeleton /></>

  if (!level) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main className="mx-auto max-w-lg px-6 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Find Your Level First</h1>
          <p className="mb-6 text-muted-foreground">Take a 5-minute placement test so we can build your personalised learning path.</p>
          <Button size="lg" onClick={() => router.push('/placement')}>Start Placement Test</Button>
        </main>
      </div>
    )
  }

  let cumulativeIndex = 0

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Learning Path</h1>
          <p className="mt-2 text-muted-foreground">Your guided curriculum — work through each skill in order.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              <div className="text-right">
                <p className="text-2xl font-bold">{progressPercent}%</p>
                <p className="text-xs text-muted-foreground">{completedCount} / {totalLessons} lessons</p>
              </div>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressPercent === 100 ? 'bg-green-500' : 'bg-primary'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {firstIncompleteIndex >= 0 && levelLessons[firstIncompleteIndex] && (
              <div className="mt-4">
                <Button size="sm" onClick={() => router.push(`/lessons/${levelLessons[firstIncompleteIndex]!.id}`)}>
                  Continue: {levelLessons[firstIncompleteIndex]!.title}
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

        {skillGroups.length === 0 ? (
          <p className="text-center text-muted-foreground">No lessons available for {selectedLevel} yet.</p>
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
        <p className="mt-10 text-center text-sm text-muted-foreground">
          {totalLessons} lessons across {skillGroups.length} skills at {selectedLevel}
        </p>
      </main>
    </div>
  )
}
