'use client'

// # Mock test hub — exam selector + score history.
// # Matches Engnovate: lists available exams, past scores, and a start button.

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// # ─── Types ────────────────────────────────────────────────────────

interface ExamSection {
  id: string
  name: string
  skill: string
  slotCount: number
  durationMinutes: number
}

interface ExamSummary {
  id: string
  name: string
  sections: ExamSection[]
}

interface PastResult {
  id: string
  examId: string
  overallBand: number
  sectionBands: Record<string, number>
  completedAt: number
}

// # Skill icon map.
const SKILL_ICONS: Record<string, string> = {
  listening: '🎧',
  reading: '📖',
  writing: '✍️',
  speaking: '🎤',
}

// # Band colour.
function bandColour(band: number): string {
  if (band >= 7) return 'text-green-600 dark:text-green-400'
  if (band >= 5.5) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

export default function MockTestPage() {
  const router = useRouter()
  const [exams, setExams] = useState<ExamSummary[]>([])
  const [history, setHistory] = useState<PastResult[]>([])
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)

  // # Fetch exams and history in parallel.
  useEffect(() => {
    Promise.all([
      apiFetch<{ exams: ExamSummary[] }>('/api/mock-test/exams'),
      apiFetch<{ results: PastResult[] }>('/api/test-results').catch(() => ({ results: [] })),
    ])
      .then(([examData, historyData]) => {
        setExams(examData.exams)
        setHistory(historyData.results)
      })
      .finally(() => setLoading(false))
  }, [])

  // # Create a new test session and redirect.
  const handleStart = async (examId: string) => {
    setStarting(true)
    try {
      const data = await apiFetch<{ sessionId: string }>('/api/mock-test/sessions', {
        method: 'POST',
        body: JSON.stringify({ examId }),
      })
      router.push(`/mock-test/${data.sessionId}`)
    } catch {
      setStarting(false)
    }
  }

  if (loading) return <><NavBar /><PageSkeleton /></>

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 font-serif text-3xl font-bold">Mock Tests</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Take a full computer-based IELTS test with timer, AI scoring, and detailed feedback.
        </p>

        {/* # ── Available exams ── */}
        <div className="mb-12 flex flex-col gap-6">
          {exams.map((exam) => {
            const totalMinutes = exam.sections.reduce((s, sec) => s + sec.durationMinutes, 0)
            return (
              <Card key={exam.id} className="border border-border p-6">
                <h2 className="mb-4 font-serif text-2xl font-bold">{exam.name}</h2>
                {/* # Section list */}
                <div className="mb-4 flex flex-col gap-2">
                  {exam.sections.map((sec) => (
                    <div key={sec.id} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{SKILL_ICONS[sec.skill] ?? ''}</span>
                        <span>{sec.name}</span>
                      </span>
                      <span className="text-muted-foreground">
                        {sec.slotCount} items &middot; {sec.durationMinutes} min
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total: {totalMinutes} minutes
                  </span>
                  <Button onClick={() => handleStart(exam.id)} disabled={starting}>
                    {starting ? 'Starting...' : 'Start Test'}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* # ── Score history ── */}
        {history.length > 0 && (
          <>
            <h2 className="mb-4 font-serif text-xl font-bold">Score History</h2>
            <div className="flex flex-col gap-3">
              {history.map((r) => {
                const date = new Date(r.completedAt)
                const dateStr = date.toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })
                return (
                  <Card
                    key={r.id}
                    className="flex cursor-pointer items-center justify-between border border-border p-4 transition-colors hover:bg-muted/50"
                    onClick={() => router.push(`/mock-test/${r.id}/result?rid=${r.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      {/* # Overall band */}
                      <div className="text-center">
                        <p className={`font-serif text-2xl font-bold ${bandColour(r.overallBand)}`}>
                          {r.overallBand}
                        </p>
                        <p className="text-[10px] uppercase text-muted-foreground">Overall</p>
                      </div>
                      {/* # Section bands — compact row */}
                      <div className="flex gap-3">
                        {Object.entries(r.sectionBands).map(([key, band]) => (
                          <div key={key} className="text-center">
                            <p className={`text-sm font-bold ${bandColour(band)}`}>{band}</p>
                            <p className="text-[9px] uppercase text-muted-foreground">
                              {key.slice(0, 1).toUpperCase()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{dateStr}</span>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </main>
    </>
  )
}
