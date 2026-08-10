'use client'

// # Individual lesson page — renders structured lesson content with
// # premium visual treatment for each section type:
// # 'text' = explanatory prose, 'rule' = highlighted rule box,
// # 'tip' = practical advice callout, 'example' = annotated examples,
// # 'exercise' = interactive question with reveal-answer button.
// # Also shows objectives, key takeaways, common mistakes, and related lessons.

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'
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
import type { LessonSection, Lesson, LessonCategory } from '@/lib/reference/types'

// # Merge all lesson data (same merge logic as the list page).
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

// # Flatten all lessons for ID lookup.
const ALL_LESSONS = ALL_LESSON_CATEGORIES.flatMap(c => c.lessons)

// # Colour badges for CEFR levels.
const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

// # ─── Section Renderers ───

// # 'text' sections — clean explanatory prose.
function TextSection({ section }: { section: LessonSection }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{section.title}</h3>
      <p className="whitespace-pre-line leading-relaxed text-foreground/90">{section.content}</p>
    </div>
  )
}

// # 'rule' sections — highlighted box with structured grammar rules.
function RuleSection({ section }: { section: LessonSection }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{section.title}</h3>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="whitespace-pre-line text-sm leading-relaxed text-amber-900 dark:text-amber-200">
          {section.content}
        </p>
      </div>
    </div>
  )
}

// # 'tip' sections — callout box with practical advice.
function TipSection({ section }: { section: LessonSection }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{section.title}</h3>
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <p className="whitespace-pre-line text-sm leading-relaxed text-blue-900 dark:text-blue-200">
          {section.content}
        </p>
      </div>
    </div>
  )
}

// # 'example' sections — example sentences + analysis.
function ExampleSection({ section }: { section: LessonSection }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{section.title}</h3>
      {/* # Example sentences in a styled list */}
      {section.examples && section.examples.length > 0 && (
        <div className="mb-3 space-y-2">
          {section.examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-md border-l-4 border-primary bg-muted/50 px-4 py-2.5"
            >
              <p className="text-sm font-medium italic">&ldquo;{ex}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
      {/* # Analysis of the examples */}
      {section.analysis && (
        <div className="rounded-lg bg-muted/30 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {section.analysis}
          </p>
        </div>
      )}
    </div>
  )
}

// # 'exercise' sections — question with reveal-answer button.
function ExerciseSection({ section }: { section: LessonSection }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{section.title}</h3>
      <div className="rounded-lg border border-border bg-card p-5">
        {/* # Exercise instruction (optional — some skills skip this) */}
        {section.content && (
          <p className="mb-3 text-sm text-muted-foreground">{section.content}</p>
        )}

        {/* # Question */}
        {section.question && (
          <p className="mb-4 text-base font-medium">{section.question}</p>
        )}

        {/* # Reveal answer button */}
        {!revealed ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRevealed(true)}
          >
            Show Answer
          </Button>
        ) : (
          <div className="space-y-3">
            {/* # Answer */}
            <div className="rounded-md border-l-4 border-green-500 bg-green-50 px-4 py-3 dark:bg-green-950/30">
              <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                {section.answer}
              </p>
            </div>
            {/* # Explanation */}
            {section.answerExplanation && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.answerExplanation}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// # Route each section to the correct renderer.
function SectionRenderer({ section }: { section: LessonSection }) {
  switch (section.type) {
    case 'rule': return <RuleSection section={section} />
    case 'tip': return <TipSection section={section} />
    case 'example': return <ExampleSection section={section} />
    case 'exercise': return <ExerciseSection section={section} />
    default: return <TextSection section={section} />
  }
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)
  const [completing, setCompleting] = useState(false)

  // # Find the lesson by ID.
  const lesson = ALL_LESSONS.find(l => l.id === id)

  // # Find the next lesson in the same skill + level group.
  // # Uses lesson metadata (not category IDs) because grammar
  // # categories use non-standard IDs like 'a1-foundations'.
  const nextLesson = (() => {
    if (!lesson) return null
    const sameSkilllevel = ALL_LESSONS.filter(
      l => l.level === lesson.level && l.skill === lesson.skill
    )
    const idx = sameSkilllevel.findIndex(l => l.id === lesson.id)
    return idx >= 0 && idx < sameSkilllevel.length - 1 ? sameSkilllevel[idx + 1] : null
  })()

  // # Check if this lesson is already completed.
  useEffect(() => {
    if (!lesson) return
    apiFetch<{ completions: { lessonId: string }[] }>('/api/lesson-completions')
      .then(data => {
        if (data.completions.some(c => c.lessonId === lesson.id)) {
          setIsCompleted(true)
        }
      })
      .catch(() => {})
  }, [lesson])

  // # Mark lesson as completed and navigate to next.
  const handleComplete = useCallback(async () => {
    if (!lesson || completing) return
    setCompleting(true)
    try {
      await apiFetch('/api/lesson-completions', {
        method: 'POST',
        body: JSON.stringify({ lessonId: lesson.id }),
      })
      setIsCompleted(true)
      if (nextLesson) {
        router.push(`/lessons/${nextLesson.id}`)
      } else {
        router.push('/learning-path')
      }
    } catch {
      setCompleting(false)
    }
  }, [lesson, nextLesson, completing, router])

  // # If lesson not found, show a fallback.
  if (!lesson) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Lesson Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            This lesson does not exist or may have been removed.
          </p>
          <Button onClick={() => router.push('/lessons')}>
            Back to Lessons
          </Button>
        </main>
      </div>
    )
  }

  // # Find related lessons for the "up next" section.
  const relatedLessons = (lesson.relatedLessons ?? [])
    .map(rid => ALL_LESSONS.find(l => l.id === rid))
    .filter(Boolean) as Lesson[]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        {/* # Back link */}
        <button
          onClick={() => router.push('/lessons')}
          className="mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Lessons
        </button>

        {/* # ─── Lesson Header ─── */}
        <header className="mb-8">
          {/* # Badges row */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
              lesson.skill === 'grammar' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              : lesson.skill === 'writing' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : lesson.skill === 'speaking' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
              : lesson.skill === 'reading' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : lesson.skill === 'listening' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
              : lesson.skill === 'vocabulary' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300'
              : lesson.skill === 'pronunciation' ? 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
              : 'bg-gray-50 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300'
            }`}>
              {lesson.skill}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[lesson.level] ?? ''}`}>
              {lesson.level}
            </span>
            <span className="text-xs text-muted-foreground">
              {lesson.duration} min
            </span>
          </div>

          {/* # Title and description */}
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">{lesson.description}</p>
        </header>

        {/* # ─── Learning Objectives ─── */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="pt-5">
            <h2 className="mb-3 text-base font-semibold">What You Will Learn</h2>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* # ─── Lesson Sections ─── */}
        <div className="space-y-8">
          {lesson.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} />
          ))}
        </div>

        {/* # ─── Key Takeaways ─── */}
        <Card className="mt-10 border-green-200 dark:border-green-800">
          <CardContent className="pt-5">
            <h2 className="mb-3 text-base font-semibold text-green-700 dark:text-green-400">
              Key Takeaways
            </h2>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-green-600 dark:text-green-400">&#10003;</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* # ─── Common Mistakes ─── */}
        {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
          <Card className="mt-6 border-red-200 dark:border-red-800">
            <CardContent className="pt-5">
              <h2 className="mb-3 text-base font-semibold text-red-600 dark:text-red-400">
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-2">
                {lesson.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-red-500">&#10007;</span>
                    <span className="leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* # ─── Related Lessons ─── */}
        {relatedLessons.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-base font-semibold">Continue Learning</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedLessons.map(related => (
                <Card
                  key={related.id}
                  className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/20"
                  onClick={() => router.push(`/lessons/${related.id}`)}
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[related.level] ?? ''}`}>
                        {related.level}
                      </span>
                      <span className="text-xs text-muted-foreground">{related.duration} min</span>
                    </div>
                    <h3 className="text-sm font-semibold">{related.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* # ─── Bottom Navigation ─── */}
        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => router.push('/learning-path')}>
              ← Learning Path
            </Button>

            {/* # Complete & Next — primary action */}
            {!isCompleted ? (
              <Button
                size="lg"
                disabled={completing}
                onClick={handleComplete}
              >
                {completing
                  ? 'Saving...'
                  : nextLesson
                    ? `Complete & Next →`
                    : 'Complete Lesson ✓'}
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  ✓ Completed
                </span>
                {nextLesson && (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/lessons/${nextLesson.id}`)}
                  >
                    Next: {nextLesson.title} →
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
