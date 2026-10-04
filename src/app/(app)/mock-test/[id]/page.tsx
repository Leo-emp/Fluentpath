'use client'

// # Full IELTS mock test session — question-by-question UI with timer,
// # section navigation, passage viewer, and writing editor.
// # Matches Engnovate-quality computer-based test experience.

import { useState, useEffect, useCallback, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

// # ─── Types ────────────────────────────────────────────────────────

interface QuestionItem {
  stem: string
  options?: string[]
  type?: string
}

interface SlotContent {
  slotId: string
  type: string
  // # Reading passage
  title?: string
  passage?: string
  questions?: QuestionItem[]
  // # Listening
  stem?: string
  transcript?: string
  options?: Array<{ text: string }>
  gaps?: Array<{ hint: string }>
  // # Writing
  prompt?: string
  minWords?: number
  maxWords?: number
  timeLimitMinutes?: number | null
  taskType?: string
  // # Speaking
  timeLimitSeconds?: number
  prepTimeSeconds?: number | null
}

interface SectionData {
  id: string
  name: string
  skill: string
  durationMinutes: number
  allowBacktrack: boolean
  status: string
  elapsedMs: number
  currentSlotIndex: number
  slots: SlotContent[]
}

interface SessionContent {
  examName: string
  status: string
  activeSectionIndex: number
  sections: SectionData[]
  responses: Array<{ slotId: string; sectionId: string }>
}

// # ─── Timer Hook ───────────────────────────────────────────────────

function useTimer(durationMs: number, elapsedMs: number, active: boolean) {
  const [remaining, setRemaining] = useState(durationMs - elapsedMs)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setRemaining(durationMs - elapsedMs)
  }, [durationMs, elapsedMs])

  useEffect(() => {
    if (!active) return
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        const next = prev - 1000
        return next < 0 ? 0 : next
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [active])

  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  const formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`
  const isLow = remaining < 300000 // # Under 5 minutes
  const isExpired = remaining <= 0

  return { remaining, formatted, isLow, isExpired }
}

// # ─── Main Component ───────────────────────────────────────────────

export default function MockTestSessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [content, setContent] = useState<SessionContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const [activeSectionIdx, setActiveSectionIdx] = useState(0)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | string>>({})
  const [gapAnswers, setGapAnswers] = useState<Record<string, string[]>>({})
  const [writingText, setWritingText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showQuitDialog, setShowQuitDialog] = useState(false)
  const [showConfirmSection, setShowConfirmSection] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [flagged, setFlagged] = useState<Set<string>>(new Set())

  // # Fetch session content on mount.
  useEffect(() => {
    apiFetch<SessionContent>(`/api/mock-test/sessions/${id}/content`)
      .then((data) => {
        setContent(data)
        // # If session already started, jump to active section.
        if (data.status === 'in_progress') {
          setStarted(true)
          setActiveSectionIdx(data.activeSectionIndex >= 0 ? data.activeSectionIndex : 0)
        }
      })
      .catch(() => router.replace('/dashboard'))
      .finally(() => setLoading(false))
  }, [id, router])

  // # Start the test session.
  const handleStart = useCallback(async () => {
    try {
      await apiFetch(`/api/mock-test/sessions/${id}/start`, {
        method: 'POST',
        body: '{}',
      })
      setStarted(true)
      setActiveSectionIdx(0)
    } catch {
      // # Session might already be started.
      setStarted(true)
    }
  }, [id])

  // # Submit an answer for a reading/listening MCQ slot.
  const submitMcqAnswer = useCallback(async (slotId: string, selectedIndex: number, skill: string) => {
    setSubmitting(true)
    try {
      await apiFetch(`/api/mock-test/sessions/${id}/answer`, {
        method: 'POST',
        body: JSON.stringify({ slotId, skill, selectedIndex }),
      })
    } catch { /* # Best effort — answer is tracked locally too */ }
    setSubmitting(false)
  }, [id])

  // # Submit writing response.
  const submitWritingAnswer = useCallback(async (slotId: string, text: string) => {
    setSubmitting(true)
    try {
      await apiFetch(`/api/mock-test/sessions/${id}/answer`, {
        method: 'POST',
        body: JSON.stringify({
          slotId,
          skill: 'writing',
          text,
          wordCount: text.trim().split(/\s+/).filter(Boolean).length,
        }),
      })
    } catch { /* # Best effort */ }
    setSubmitting(false)
  }, [id])

  // # Advance to next section.
  const handleNextSection = useCallback(async () => {
    setSubmitting(true)
    try {
      const result = await apiFetch<{ testComplete: boolean; activeSectionIndex: number }>(
        `/api/mock-test/sessions/${id}/advance`,
        { method: 'POST', body: '{}' },
      )
      if (result.testComplete) {
        // # Complete the test.
        const data = await apiFetch<{ testResultId: string }>(
          `/api/mock-test/sessions/${id}/complete`,
          { method: 'POST', body: '{}' },
        )
        router.push(`/mock-test/${id}/result?rid=${data.testResultId}`)
      } else {
        setActiveSectionIdx(result.activeSectionIndex)
        setCurrentQuestionIdx(0)
        setWritingText('')
        setShowConfirmSection(false)
      }
    } catch { /* # Handle error */ }
    setSubmitting(false)
  }, [id, router])

  // # Abandon.
  const handleAbandon = async () => {
    await apiFetch(`/api/mock-test/sessions/${id}/abandon`, {
      method: 'POST',
      body: '{}',
    }).catch(() => {})
    router.push('/dashboard')
  }

  // # Complete (final section).
  const handleComplete = useCallback(async () => {
    setCompleting(true)
    try {
      // # Submit any pending writing.
      const section = content?.sections[activeSectionIdx]
      if (section?.skill === 'writing') {
        const slot = section.slots[currentQuestionIdx]
        if (slot && writingText.trim()) {
          await submitWritingAnswer(slot.slotId, writingText)
        }
      }
      // # Advance (which will complete if it's the last section).
      await handleNextSection()
    } catch {
      setCompleting(false)
    }
  }, [content, activeSectionIdx, currentQuestionIdx, writingText, submitWritingAnswer, handleNextSection])

  // # Toggle flag for review.
  const toggleFlag = (key: string) => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  if (loading) return <PageSkeleton />
  if (!content) return null

  // # ─── Pre-test Screen ──────────────────────────────────────────

  if (!started) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="mb-2 font-serif text-3xl font-bold">{content.examName}</h1>
          <p className="mb-8 text-muted-foreground">Full Mock Test</p>

          <div className="mb-8 space-y-3">
            {content.sections.map((section) => (
              <div key={section.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                <div>
                  <p className="font-medium">{section.name}</p>
                  <p className="text-sm text-muted-foreground">{section.slots.length} parts</p>
                </div>
                <span className="text-sm font-medium">{section.durationMinutes} min</span>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-lg bg-muted/50 p-4 text-left text-sm text-muted-foreground">
            <p className="mb-2 font-medium text-foreground">Before you begin:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Each section is timed — the timer starts immediately</li>
              <li>You cannot go back to a previous section</li>
              <li>Reading and Writing sections allow reviewing questions</li>
              <li>Listening plays once only (transcript provided)</li>
            </ul>
          </div>

          <Button size="lg" onClick={handleStart} className="w-full">
            Start Test
          </Button>
        </div>
      </div>
    )
  }

  // # ─── Active Test UI ───────────────────────────────────────────

  const section = content.sections[activeSectionIdx]
  if (!section) return null

  const isLastSection = activeSectionIdx === content.sections.length - 1

  return (
    <div className="flex min-h-screen flex-col">
      {/* # ─── Top Bar: Timer + Section Info ─── */}
      <TestTopBar
        section={section}
        sectionIndex={activeSectionIdx}
        totalSections={content.sections.length}
        examName={content.examName}
        onQuit={() => setShowQuitDialog(true)}
      />

      {/* # ─── Section Content ─── */}
      <div className="flex flex-1 overflow-hidden">
        {section.skill === 'reading' && (
          <ReadingSection
            section={section}
            currentIdx={currentQuestionIdx}
            onChangeIdx={setCurrentQuestionIdx}
            answers={answers}
            onAnswer={(key, val) => {
              setAnswers(prev => ({ ...prev, [key]: val }))
              const slot = section.slots[0]
              if (slot) submitMcqAnswer(slot.slotId, val as number, 'reading')
            }}
            flagged={flagged}
            onToggleFlag={toggleFlag}
          />
        )}

        {section.skill === 'listening' && (
          <ListeningSection
            section={section}
            currentIdx={currentQuestionIdx}
            onChangeIdx={setCurrentQuestionIdx}
            answers={answers}
            onAnswer={(key, val) => {
              setAnswers(prev => ({ ...prev, [key]: val }))
            }}
            gapAnswers={gapAnswers}
            onGapAnswer={(slotId, gapIdx, val) => {
              setGapAnswers(prev => {
                const existing = prev[slotId] ?? []
                const updated = [...existing]
                updated[gapIdx] = val
                return { ...prev, [slotId]: updated }
              })
            }}
            flagged={flagged}
            onToggleFlag={toggleFlag}
            submitting={submitting}
            onSubmitSlot={async (slot) => {
              if (slot.type === 'mcq' && answers[`${section.id}-${slot.slotId}`] !== undefined) {
                await submitMcqAnswer(slot.slotId, answers[`${section.id}-${slot.slotId}`] as number, 'listening')
              }
            }}
          />
        )}

        {section.skill === 'writing' && (
          <WritingSection
            section={section}
            currentIdx={currentQuestionIdx}
            onChangeIdx={setCurrentQuestionIdx}
            writingText={writingText}
            onWritingChange={setWritingText}
          />
        )}

        {section.skill === 'speaking' && (
          <SpeakingSection section={section} />
        )}
      </div>

      {/* # ─── Bottom Bar: Navigation ─── */}
      <div className="flex items-center justify-between border-t border-border bg-background px-6 py-3">
        <div className="flex gap-2">
          {section.skill === 'reading' && section.slots[0]?.questions && (
            <QuestionNav
              total={section.slots[0].questions.length}
              current={currentQuestionIdx}
              onSelect={setCurrentQuestionIdx}
              answers={answers}
              sectionId={section.id}
              flagged={flagged}
            />
          )}
          {section.skill === 'listening' && (
            <QuestionNav
              total={section.slots.length}
              current={currentQuestionIdx}
              onSelect={setCurrentQuestionIdx}
              answers={answers}
              sectionId={section.id}
              flagged={flagged}
              slotIds={section.slots.map(s => s.slotId)}
            />
          )}
        </div>
        <div className="flex gap-3">
          {section.allowBacktrack && currentQuestionIdx > 0 && (
            <Button variant="outline" size="sm" onClick={() => setCurrentQuestionIdx(prev => prev - 1)}>
              Previous
            </Button>
          )}
          {section.skill === 'reading' && section.slots[0]?.questions && currentQuestionIdx < section.slots[0].questions.length - 1 && (
            <Button size="sm" onClick={() => setCurrentQuestionIdx(prev => prev + 1)}>
              Next
            </Button>
          )}
          {section.skill === 'listening' && currentQuestionIdx < section.slots.length - 1 && (
            <Button size="sm" onClick={() => setCurrentQuestionIdx(prev => prev + 1)}>
              Next
            </Button>
          )}
          {section.skill === 'writing' && section.slots.length > 1 && currentQuestionIdx < section.slots.length - 1 && (
            <Button size="sm" onClick={() => {
              const slot = section.slots[currentQuestionIdx]
              if (slot && writingText.trim()) {
                submitWritingAnswer(slot.slotId, writingText)
              }
              setCurrentQuestionIdx(prev => prev + 1)
              setWritingText('')
            }}>
              Next Task
            </Button>
          )}
          <Button
            size="sm"
            variant={isLastSection ? 'default' : 'outline'}
            onClick={() => {
              if (isLastSection) {
                handleComplete()
              } else {
                setShowConfirmSection(true)
              }
            }}
            disabled={completing || submitting}
          >
            {isLastSection ? (completing ? 'Completing...' : 'Finish Test') : 'Next Section →'}
          </Button>
        </div>
      </div>

      {/* # ─── Quit Dialog ─── */}
      <Dialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abandon Test?</DialogTitle>
            <DialogDescription>
              Your progress will be lost. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQuitDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleAbandon}>Abandon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* # ─── Confirm Next Section Dialog ─── */}
      <Dialog open={showConfirmSection} onOpenChange={setShowConfirmSection}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move to next section?</DialogTitle>
            <DialogDescription>
              You cannot return to {section.name} once you move on.
              {section.skill === 'writing' && writingText.trim() && ' Your writing will be submitted.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmSection(false)}>Stay</Button>
            <Button onClick={async () => {
              // # Submit pending writing if any.
              if (section.skill === 'writing') {
                const slot = section.slots[currentQuestionIdx]
                if (slot && writingText.trim()) {
                  await submitWritingAnswer(slot.slotId, writingText)
                }
              }
              await handleNextSection()
            }} disabled={submitting}>
              {submitting ? '...' : 'Continue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// # ═══════════════════════════════════════════════════════════════════
// # Sub-components
// # ═══════════════════════════════════════════════════════════════════

// # ─── Top Bar ──────────────────────────────────────────────────────

function TestTopBar({
  section,
  sectionIndex,
  totalSections,
  examName,
  onQuit,
}: {
  section: SectionData
  sectionIndex: number
  totalSections: number
  examName: string
  onQuit: () => void
}) {
  const timer = useTimer(
    section.durationMinutes * 60000,
    section.elapsedMs,
    section.status === 'active',
  )

  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-6 py-3">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">{examName}</span>
        <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium">
          Section {sectionIndex + 1}/{totalSections}
        </span>
        <span className="font-medium">{section.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className={`font-mono text-lg font-bold tabular-nums ${timer.isLow ? 'text-red-500' : ''} ${timer.isExpired ? 'animate-pulse text-red-600' : ''}`}>
          {timer.formatted}
        </div>
        <button onClick={onQuit} className="text-sm text-muted-foreground hover:text-foreground">
          Quit
        </button>
      </div>
    </div>
  )
}

// # ─── Reading Section ──────────────────────────────────────────────

function ReadingSection({
  section,
  currentIdx,
  onChangeIdx,
  answers,
  onAnswer,
  flagged,
  onToggleFlag,
}: {
  section: SectionData
  currentIdx: number
  onChangeIdx: (idx: number) => void
  answers: Record<string, number | string>
  onAnswer: (key: string, val: number) => void
  flagged: Set<string>
  onToggleFlag: (key: string) => void
}) {
  // # Reading has passages with embedded questions. First slot is the passage.
  const passage = section.slots[0]
  if (!passage || passage.type !== 'reading_passage') {
    return <div className="flex flex-1 items-center justify-center text-muted-foreground">No reading content available</div>
  }

  const questions = passage.questions ?? []
  const currentQ = questions[currentIdx]
  const answerKey = `${section.id}-q${currentIdx}`
  const flagKey = `${section.id}-q${currentIdx}`

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* # Left: Passage */}
      <div className="w-1/2 overflow-y-auto border-r border-border p-6">
        <h2 className="mb-4 font-serif text-xl font-bold">{passage.title}</h2>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {passage.passage?.split('\n\n').map((para, i) => (
            <p key={i} className="mb-3 leading-relaxed">{para}</p>
          ))}
        </div>
      </div>

      {/* # Right: Questions */}
      <div className="flex w-1/2 flex-col overflow-y-auto p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentIdx + 1} of {questions.length}
          </span>
          <button
            onClick={() => onToggleFlag(flagKey)}
            className={`rounded px-2 py-1 text-xs ${flagged.has(flagKey) ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-muted text-muted-foreground'}`}
          >
            {flagged.has(flagKey) ? '★ Flagged' : '☆ Flag for review'}
          </button>
        </div>

        {currentQ && (
          <div className="flex-1">
            <p className="mb-6 text-base font-medium leading-relaxed">{currentQ.stem}</p>
            <div className="space-y-3">
              {currentQ.options?.map((opt, optIdx) => {
                const selected = answers[answerKey] === optIdx
                return (
                  <button
                    key={optIdx}
                    onClick={() => onAnswer(answerKey, optIdx)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                      selected
                        ? 'border-foreground bg-foreground/5 font-medium'
                        : 'border-border hover:border-foreground/30 hover:bg-muted/50'
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                      selected ? 'border-foreground bg-foreground text-background' : 'border-muted-foreground/30'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* # Quick nav for reading */}
        <div className="mt-6 flex gap-2">
          {currentIdx > 0 && (
            <Button variant="outline" size="sm" onClick={() => onChangeIdx(currentIdx - 1)}>
              ← Previous
            </Button>
          )}
          {currentIdx < questions.length - 1 && (
            <Button size="sm" onClick={() => onChangeIdx(currentIdx + 1)}>
              Next →
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// # ─── Listening Section ────────────────────────────────────────────

function ListeningSection({
  section,
  currentIdx,
  onChangeIdx,
  answers,
  onAnswer,
  gapAnswers,
  onGapAnswer,
  flagged,
  onToggleFlag,
  submitting,
  onSubmitSlot,
}: {
  section: SectionData
  currentIdx: number
  onChangeIdx: (idx: number) => void
  answers: Record<string, number | string>
  onAnswer: (key: string, val: number) => void
  gapAnswers: Record<string, string[]>
  onGapAnswer: (slotId: string, gapIdx: number, val: string) => void
  flagged: Set<string>
  onToggleFlag: (key: string) => void
  submitting: boolean
  onSubmitSlot: (slot: SlotContent) => Promise<void>
}) {
  const slot = section.slots[currentIdx]
  if (!slot) return null

  const answerKey = `${section.id}-${slot.slotId}`
  const flagKey = answerKey

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* # Left: Transcript */}
      <div className="w-1/2 overflow-y-auto border-r border-border p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-sm">🎧</span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Part {currentIdx + 1} of {section.slots.length}
          </span>
        </div>
        <h3 className="mb-3 font-serif text-lg font-bold">
          {slot.stem?.split('\n')[0]}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {slot.stem?.split('\n').slice(1).join(' ').trim()}
        </p>

        {/* # Audio placeholder */}
        <div className="mb-6 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10">
              <span className="text-lg">▶</span>
            </div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-foreground/10">
                <div className="h-full w-0 rounded-full bg-foreground/40" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Audio coming soon — read transcript below</p>
            </div>
          </div>
        </div>

        {/* # Transcript */}
        {slot.transcript && (
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Transcript</p>
            <p className="leading-relaxed text-sm">{slot.transcript}</p>
          </div>
        )}
      </div>

      {/* # Right: Questions */}
      <div className="flex w-1/2 flex-col overflow-y-auto p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Part {currentIdx + 1}: {slot.type === 'mcq' ? 'Multiple Choice' : 'Note Completion'}
          </span>
          <button
            onClick={() => onToggleFlag(flagKey)}
            className={`rounded px-2 py-1 text-xs ${flagged.has(flagKey) ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-muted text-muted-foreground'}`}
          >
            {flagged.has(flagKey) ? '★ Flagged' : '☆ Flag'}
          </button>
        </div>

        {/* # MCQ */}
        {slot.type === 'mcq' && slot.options && (
          <div className="flex-1">
            <p className="mb-6 font-medium">Choose the correct answer:</p>
            <div className="space-y-3">
              {slot.options.map((opt, optIdx) => {
                const selected = answers[answerKey] === optIdx
                return (
                  <button
                    key={optIdx}
                    onClick={() => onAnswer(answerKey, optIdx)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                      selected
                        ? 'border-foreground bg-foreground/5 font-medium'
                        : 'border-border hover:border-foreground/30 hover:bg-muted/50'
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                      selected ? 'border-foreground bg-foreground text-background' : 'border-muted-foreground/30'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* # Gap Fill */}
        {slot.type === 'gap_fill' && slot.gaps && (
          <div className="flex-1">
            <p className="mb-6 font-medium">Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER.</p>
            <div className="space-y-4">
              {slot.gaps.map((gap, gapIdx) => (
                <div key={gapIdx}>
                  <label className="mb-1 block text-sm text-muted-foreground">
                    {gapIdx + 1}. {gap.hint}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                    value={gapAnswers[slot.slotId]?.[gapIdx] ?? ''}
                    onChange={(e) => onGapAnswer(slot.slotId, gapIdx, e.target.value)}
                    placeholder="Type your answer..."
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// # ─── Writing Section ──────────────────────────────────────────────

function WritingSection({
  section,
  currentIdx,
  onChangeIdx,
  writingText,
  onWritingChange,
}: {
  section: SectionData
  currentIdx: number
  onChangeIdx: (idx: number) => void
  writingText: string
  onWritingChange: (text: string) => void
}) {
  const slot = section.slots[currentIdx]
  if (!slot) return null

  const wordCount = writingText.trim().split(/\s+/).filter(Boolean).length
  const minWords = slot.minWords ?? 150
  const maxWords = slot.maxWords ?? 350
  const isUnderMin = wordCount < minWords && wordCount > 0
  const isOverMax = wordCount > maxWords

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* # Left: Task prompt */}
      <div className="w-2/5 overflow-y-auto border-r border-border p-6">
        {section.slots.length > 1 && (
          <div className="mb-4 flex gap-2">
            {section.slots.map((s, i) => (
              <button
                key={s.slotId}
                onClick={() => onChangeIdx(i)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  i === currentIdx ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Task {i + 1}
              </button>
            ))}
          </div>
        )}

        <h3 className="mb-2 font-serif text-lg font-bold">
          {slot.taskType === 'report' ? 'Task 1' : slot.taskType === 'essay' ? 'Task 2' : slot.taskType === 'letter' ? 'Task 1 (Letter)' : `Task ${currentIdx + 1}`}
        </h3>
        {slot.timeLimitMinutes && (
          <p className="mb-4 text-sm text-muted-foreground">
            Recommended time: {slot.timeLimitMinutes} minutes
          </p>
        )}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="leading-relaxed">{slot.prompt}</p>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Minimum: {minWords} words</p>
          {maxWords && <p>Target: up to {maxWords} words</p>}
        </div>
      </div>

      {/* # Right: Text editor */}
      <div className="flex w-3/5 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Your response</span>
          <span className={`text-sm font-mono tabular-nums ${isUnderMin ? 'text-amber-500' : isOverMax ? 'text-red-500' : 'text-muted-foreground'}`}>
            {wordCount} words
            {isUnderMin && ` (${minWords - wordCount} more needed)`}
            {isOverMax && ` (${wordCount - maxWords} over limit)`}
          </span>
        </div>
        <textarea
          className="flex-1 resize-none rounded-lg border border-border bg-background p-4 font-serif text-base leading-relaxed focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
          value={writingText}
          onChange={(e) => onWritingChange(e.target.value)}
          placeholder="Start writing your response here..."
        />
        {/* # Word count bar */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              wordCount >= minWords ? 'bg-green-500' : wordCount > 0 ? 'bg-amber-400' : 'bg-muted'
            }`}
            style={{ width: `${Math.min((wordCount / minWords) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// # ─── Speaking Section ─────────────────────────────────────────────

function SpeakingSection({ section }: { section: SectionData }) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
          <span className="text-3xl">🎙️</span>
        </div>
        <h2 className="mb-2 font-serif text-2xl font-bold">{section.name}</h2>
        <p className="mb-6 text-muted-foreground">
          Speaking assessment requires a microphone. This feature is coming soon.
        </p>
        <div className="space-y-3 text-left">
          {section.slots.map((slot, i) => (
            <div key={slot.slotId} className="rounded-lg border border-border p-4">
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                Part {i + 1}
                {slot.prepTimeSeconds ? ` (${slot.prepTimeSeconds}s prep time)` : ''}
              </p>
              <p className="text-sm">{slot.prompt}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Click "Next Section" to continue to the next part of the test.
        </p>
      </div>
    </div>
  )
}

// # ─── Question Navigator ───────────────────────────────────────────

function QuestionNav({
  total,
  current,
  onSelect,
  answers,
  sectionId,
  flagged,
  slotIds,
}: {
  total: number
  current: number
  onSelect: (idx: number) => void
  answers: Record<string, number | string>
  sectionId: string
  flagged: Set<string>
  slotIds?: string[]
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const key = slotIds ? `${sectionId}-${slotIds[i]}` : `${sectionId}-q${i}`
        const answered = answers[key] !== undefined
        const isFlagged = flagged.has(key)
        const isCurrent = i === current

        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`flex h-7 w-7 items-center justify-center rounded text-xs font-medium transition-colors ${
              isCurrent
                ? 'bg-foreground text-background'
                : answered
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
            } ${isFlagged ? 'ring-2 ring-amber-400' : ''}`}
          >
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}
