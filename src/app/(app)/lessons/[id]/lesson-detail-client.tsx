'use client'

// # Client-side interactive lesson renderer.
// # Receives a single pre-resolved lesson as a prop (NOT all lessons).
// # This keeps the client bundle small — lesson data stays server-side.

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'
import { LessonContent } from '@/components/lesson-content'
import { AudioPlayer } from '@/components/audio-player'
import type { LessonSection, Lesson } from '@/lib/reference/types'

// # ═══════════════════════════════════════════════════════════════════════
// # STYLE CONSTANTS
// # ═══════════════════════════════════════════════════════════════════════

const LEVEL_COLOURS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  B1: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  C1: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  C2: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
}

const SECTION_STYLES: Record<string, { icon: string; border: string; bg: string; label: string }> = {
  rule: { icon: '>', border: 'border-l-amber-400', bg: 'bg-amber-50/60 dark:bg-amber-950/20', label: 'Rule' },
  tip: { icon: '!', border: 'border-l-blue-400', bg: 'bg-blue-50/60 dark:bg-blue-950/20', label: 'Tip' },
  example: { icon: '#', border: 'border-l-violet-400', bg: 'bg-violet-50/60 dark:bg-violet-950/20', label: 'Example' },
  exercise: { icon: '?', border: 'border-l-emerald-400', bg: 'bg-emerald-50/60 dark:bg-emerald-950/20', label: 'Practice' },
  text: { icon: 'i', border: 'border-l-gray-300', bg: 'bg-muted/30', label: 'Info' },
}

const AUDIO_SKILLS = new Set(['listening', 'speaking', 'vocabulary', 'pronunciation'])
const WRITING_SKILLS = new Set(['writing'])

const SKILL_COLOURS: Record<string, string> = {
  grammar: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  writing: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  speaking: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  reading: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  listening: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  vocabulary: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  pronunciation: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  general: 'bg-gray-50 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300',
}

// # ═══════════════════════════════════════════════════════════════════════
// # SECTION RENDERERS
// # ═══════════════════════════════════════════════════════════════════════

function ContentSection({ section, skill }: { section: LessonSection; skill: string }) {
  const style = SECTION_STYLES[section.type] ?? SECTION_STYLES.text!
  const ttsText = AUDIO_SKILLS.has(skill) ? extractListenableText(section) : null

  return (
    <div className={`rounded-lg border-l-4 ${style.border} ${style.bg} p-5`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-foreground/40">
          {style.icon}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          {style.label}
        </span>
      </div>
      <h3 className="mb-3 text-lg font-bold tracking-tight">{section.title}</h3>
      {section.content && <LessonContent content={section.content} />}
      {ttsText && (
        <div className="mt-4">
          <p className="mb-1.5 text-xs font-medium text-foreground/50">Listen to this section</p>
          <AudioPlayer text={ttsText} compact />
        </div>
      )}
    </div>
  )
}

function ExampleSection({ section }: { section: LessonSection }) {
  const style = SECTION_STYLES.example!
  return (
    <div className={`rounded-lg border-l-4 ${style.border} ${style.bg} p-5`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-foreground/40">#</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Examples</span>
      </div>
      <h3 className="mb-3 text-lg font-bold tracking-tight">{section.title}</h3>
      {section.examples && section.examples.length > 0 && (
        <div className="mb-4 space-y-2">
          {section.examples.map((ex, i) => (
            <div key={i} className="rounded-md border-l-4 border-primary/30 bg-background/60 px-4 py-2.5">
              <p className="text-sm font-medium italic text-foreground/90">&ldquo;{ex}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
      {section.analysis && (
        <div className="rounded-md bg-background/40 p-3">
          <LessonContent content={section.analysis} />
        </div>
      )}
    </div>
  )
}

interface WritingFeedback {
  score: number
  strengths: string[]
  improvements: string[]
  corrected: string
  tip: string
}

function ExerciseSection({ section, skill, level }: { section: LessonSection; skill: string; level: string }) {
  const [revealed, setRevealed] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null)

  const style = SECTION_STYLES.exercise!
  const isWritingSkill = WRITING_SKILLS.has(skill)
  const ttsText = AUDIO_SKILLS.has(skill) && section.question ? section.question : null

  const handleGetFeedback = useCallback(async () => {
    if (!userInput.trim() || feedbackLoading) return
    setFeedbackLoading(true)
    try {
      const data = await apiFetch<{ feedback: WritingFeedback }>('/api/lessons/writing-feedback', {
        method: 'POST',
        body: JSON.stringify({
          text: userInput,
          prompt: section.question ?? section.content ?? '',
          level,
          skill,
        }),
      })
      setFeedback(data.feedback)
    } catch {
      // # Silently fail — show answer button is always available as fallback.
    } finally {
      setFeedbackLoading(false)
    }
  }, [userInput, feedbackLoading, section, level, skill])

  return (
    <div className={`rounded-lg border-l-4 ${style.border} ${style.bg} p-5`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-foreground/40">?</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Practice</span>
      </div>
      <h3 className="mb-3 text-lg font-bold tracking-tight">{section.title}</h3>
      {section.content && <p className="mb-3 text-sm text-muted-foreground">{section.content}</p>}
      {section.question && <div className="mb-4"><LessonContent content={section.question} /></div>}
      {ttsText && <div className="mb-4"><AudioPlayer text={ttsText} compact /></div>}

      {!revealed && (
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-foreground/50">
            {isWritingSkill ? 'Write your answer here' : 'Try answering before you look'}
          </label>
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder={isWritingSkill ? 'Write your response...' : 'Type your answer here (optional)...'}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            rows={isWritingSkill ? 6 : 3}
          />
          {isWritingSkill && userInput.trim() && (
            <p className="mt-1 text-xs text-muted-foreground">{userInput.trim().split(/\s+/).length} words</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {isWritingSkill && !revealed && userInput.trim().length >= 10 && (
          <Button variant="outline" size="sm" onClick={handleGetFeedback} disabled={feedbackLoading} className="border-primary/30 text-primary">
            {feedbackLoading ? 'Analysing...' : 'Get AI Feedback'}
          </Button>
        )}
        {!revealed && (
          <Button variant="outline" size="sm" onClick={() => setRevealed(true)}>
            {userInput.trim() ? 'Compare with Model Answer' : 'Show Answer'}
          </Button>
        )}
      </div>

      {feedback && (
        <div className="mt-4 space-y-3 rounded-lg border border-primary/20 bg-background/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-lg font-bold text-primary">{feedback.score}</span>
            </div>
            <div>
              <p className="text-sm font-semibold">AI Feedback</p>
              <p className="text-xs text-muted-foreground">Score out of 10 for {level} level</p>
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-green-700 dark:text-green-400">Strengths</p>
            <ul className="space-y-1">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><span className="mt-0.5 text-green-500 shrink-0">+</span><span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-amber-700 dark:text-amber-400">To Improve</p>
            <ul className="space-y-1">
              {feedback.improvements.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><span className="mt-0.5 text-amber-500 shrink-0">~</span><span>{s}</span></li>
              ))}
            </ul>
          </div>
          {feedback.corrected && (
            <div>
              <p className="mb-1 text-xs font-semibold text-foreground/60">Improved Version</p>
              <p className="rounded-md bg-muted/50 p-3 text-sm leading-relaxed italic">{feedback.corrected}</p>
            </div>
          )}
          {feedback.tip && (
            <p className="rounded-md bg-primary/5 px-3 py-2 text-sm font-medium text-primary">{feedback.tip}</p>
          )}
        </div>
      )}

      {revealed && (
        <div className="mt-4 space-y-3">
          {userInput.trim() && (
            <div className="rounded-md border border-border bg-muted/30 px-4 py-3">
              <p className="mb-1 text-xs font-semibold text-foreground/50">Your Answer</p>
              <p className="text-sm leading-relaxed">{userInput}</p>
            </div>
          )}
          <div className="rounded-md border-l-4 border-green-500 bg-green-50 px-4 py-3 dark:bg-green-950/30">
            <p className="mb-1 text-xs font-semibold text-green-700 dark:text-green-400">Model Answer</p>
            <div className="text-sm text-green-800 dark:text-green-300">
              <LessonContent content={section.answer ?? ''} />
            </div>
          </div>
          {section.answerExplanation && (
            <div className="rounded-md bg-muted/30 p-4">
              <p className="mb-1 text-xs font-semibold text-foreground/50">Why?</p>
              <LessonContent content={section.answerExplanation} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function extractListenableText(section: LessonSection): string | null {
  if (section.examples && section.examples.length > 0) return section.examples.join('. ')
  if (section.question) return section.question
  if (section.content) {
    const text = section.content
    return text.length > 500 ? text.slice(0, 500) + '...' : text
  }
  return null
}

function SectionRenderer({ section, index, total, skill, level }: {
  section: LessonSection; index: number; total: number; skill: string; level: string
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold text-foreground/50">{index + 1}</div>
        <div className="flex-1"><div className="text-xs text-foreground/30">Step {index + 1} of {total}</div></div>
      </div>
      {section.type === 'exercise' ? (
        <ExerciseSection section={section} skill={skill} level={level} />
      ) : section.type === 'example' ? (
        <ExampleSection section={section} />
      ) : (
        <ContentSection section={section} skill={skill} />
      )}
    </div>
  )
}

// # ═══════════════════════════════════════════════════════════════════════
// # MAIN CLIENT COMPONENT — receives pre-resolved lesson data from server
// # ═══════════════════════════════════════════════════════════════════════

interface LessonDetailClientProps {
  lesson: Lesson
  nextLesson: Lesson | null
  relatedLessons: Lesson[]
  isInitiallyCompleted: boolean
}

export function LessonDetailClient({
  lesson,
  nextLesson,
  relatedLessons,
  isInitiallyCompleted,
}: LessonDetailClientProps) {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(isInitiallyCompleted)
  const [completing, setCompleting] = useState(false)

  const handleComplete = useCallback(async () => {
    if (completing) return
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

  const skillColour = SKILL_COLOURS[lesson.skill] ?? SKILL_COLOURS.general!

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-8">
        {/* # Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => router.push('/lessons')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Lessons
          </button>
          <div className="flex items-center gap-1.5">
            {lesson.sections.map((_, i) => (
              <div key={i} className="h-1.5 w-6 rounded-full bg-foreground/15" />
            ))}
          </div>
        </div>

        {/* # Lesson header */}
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${skillColour}`}>{lesson.skill}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[lesson.level] ?? ''}`}>{lesson.level}</span>
            <span className="text-xs text-muted-foreground">{lesson.duration} min</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="mt-2 leading-relaxed text-muted-foreground">{lesson.description}</p>
        </header>

        {/* # Objectives */}
        <Card className="mb-10 border-primary/20">
          <CardContent className="pt-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground/50">What You Will Learn</h2>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">{i + 1}</span>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* # Sections */}
        <div className="space-y-10">
          {lesson.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} index={i} total={lesson.sections.length} skill={lesson.skill} level={lesson.level} />
          ))}
        </div>

        {/* # Key Takeaways */}
        <div className="mt-12 rounded-lg border border-green-200 bg-green-50/50 p-5 dark:border-green-800 dark:bg-green-950/20">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-green-700 dark:text-green-400">Key Takeaways</h2>
          <ul className="space-y-2">
            {lesson.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 text-green-600 dark:text-green-400 shrink-0">&#10003;</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* # Common Mistakes */}
        {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50/50 p-5 dark:border-red-800 dark:bg-red-950/20">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Common Mistakes to Avoid</h2>
            <ul className="space-y-2">
              {lesson.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 text-red-500 shrink-0">&#10007;</span>
                  <span className="leading-relaxed">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* # Related Lessons */}
        {relatedLessons.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground/50">Continue Learning</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedLessons.map(related => (
                <Card key={related.id} className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/20" onClick={() => router.push(`/lessons/${related.id}`)}>
                  <CardContent className="pt-4 pb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOURS[related.level] ?? ''}`}>{related.level}</span>
                      <span className="text-xs text-muted-foreground">{related.duration} min</span>
                    </div>
                    <h3 className="text-sm font-semibold">{related.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* # Bottom Navigation */}
        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => router.push('/learning-path')}>← Learning Path</Button>
            {!isCompleted ? (
              <Button size="lg" disabled={completing} onClick={handleComplete}>
                {completing ? 'Saving...' : nextLesson ? 'Complete & Next →' : 'Complete Lesson ✓'}
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">✓ Completed</span>
                {nextLesson && (
                  <Button variant="outline" onClick={() => router.push(`/lessons/${nextLesson.id}`)}>
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
