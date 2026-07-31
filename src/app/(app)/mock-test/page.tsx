'use client'

// # Mock test selector — lists available exams and starts a test session.

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

export default function MockTestPage() {
  const router = useRouter()
  const [exams, setExams] = useState<ExamSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)

  // # Fetch available exams on mount.
  useEffect(() => {
    apiFetch<{ exams: ExamSummary[] }>('/api/mock-test/exams')
      .then((data) => setExams(data.exams))
      .finally(() => setLoading(false))
  }, [])

  // # Create a new test session and redirect to the active page.
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
        <h1 className="mb-8 font-serif text-3xl font-bold">Mock Tests</h1>
        <div className="flex flex-col gap-6">
          {exams.map((exam) => {
            const totalMinutes = exam.sections.reduce((s, sec) => s + sec.durationMinutes, 0)
            return (
              <Card key={exam.id} className="border border-border p-6">
                <h2 className="mb-4 font-serif text-2xl font-bold">{exam.name}</h2>
                {/* # Section list — name, slot count, duration */}
                <div className="mb-4 flex flex-col gap-2">
                  {exam.sections.map((sec) => (
                    <div key={sec.id} className="flex items-center justify-between text-sm">
                      <span>{sec.name}</span>
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
                    {starting ? '...' : 'Start Test'}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </>
  )
}
