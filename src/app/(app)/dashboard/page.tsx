'use client'

// # Dashboard page — three states based on learner progress:
// # 1. New user (no level) → "Find Your Level" CTA
// # 2. Has level, minimal activity → level badge + action cards
// # 3. Active user → level badge + recent diagnosis summaries

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { LevelBadge } from '@/components/level-badge'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// # Types for the API responses used by this page.

interface LearnerProfile {
  id: string
  email: string
  name: string | null
  currentLevel: string | null
  createdAt: number
}

interface DiagnosisSummary {
  id: string
  gapCount: number
  topRootCause: string | null
  createdAt: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [learner, setLearner] = useState<LearnerProfile | null>(null)
  const [activePlacement, setActivePlacement] = useState(false)
  const [diagnoses, setDiagnoses] = useState<DiagnosisSummary[]>([])
  const [loading, setLoading] = useState(true)

  // # Fetch learner profile + placement status + diagnoses on mount.
  useEffect(() => {
    async function load() {
      try {
        const [meData, placementData, diagnosisData] = await Promise.all([
          apiFetch<{ learner: LearnerProfile }>('/api/me'),
          apiFetch<{ placement: unknown | null }>('/api/placement/active'),
          apiFetch<{ diagnoses: DiagnosisSummary[] }>('/api/diagnosis').catch(() => ({ diagnoses: [] })),
        ])
        setLearner(meData.learner)
        setActivePlacement(!!placementData.placement)
        setDiagnoses(diagnosisData.diagnoses)
      } catch {
        // # apiFetch handles 401 redirect automatically.
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <><NavBar /><PageSkeleton /></>
  if (!learner) return null

  const hasLevel = !!learner.currentLevel

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-12">

        {/* # State 1: New user — no placement done yet */}
        {!hasLevel && !activePlacement && (
          <Card className="border border-border p-8 text-center">
            <h2 className="mb-2 font-serif text-3xl font-bold">Find Your Level</h2>
            <p className="mb-6 text-muted-foreground">
              Take a 5-minute adaptive test to discover your CEFR level.
            </p>
            <Button size="lg" onClick={() => router.push('/placement')}>
              Start Placement
            </Button>
          </Card>
        )}

        {/* # Active placement in progress — resume */}
        {activePlacement && (
          <Card className="border border-border p-8 text-center">
            <h2 className="mb-2 font-serif text-3xl font-bold">Resume Placement</h2>
            <p className="mb-6 text-muted-foreground">
              You have a placement test in progress.
            </p>
            <Button size="lg" onClick={() => router.push('/placement')}>
              Continue
            </Button>
          </Card>
        )}

        {/* # State 2 & 3: Has level — show badge + action cards */}
        {hasLevel && (
          <>
            {/* # Level badge — centered at top */}
            <div className="mb-10 flex flex-col items-center">
              <p className="mb-2 text-sm text-muted-foreground">Your Level</p>
              <LevelBadge level={learner.currentLevel!} />
            </div>

            {/* # Quick action cards — Practice and Mock Test */}
            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              <Card
                className="cursor-pointer border border-border p-6 transition-colors hover:bg-muted"
                onClick={() => router.push('/practice')}
              >
                <h3 className="mb-1 font-serif text-xl font-bold">Practice</h3>
                <p className="text-sm text-muted-foreground">Work on your weak areas</p>
              </Card>
              <Card
                className="cursor-pointer border border-border p-6 transition-colors hover:bg-muted"
                onClick={() => router.push('/mock-test')}
              >
                <h3 className="mb-1 font-serif text-xl font-bold">Mock Test</h3>
                <p className="text-sm text-muted-foreground">Take a full IELTS exam</p>
              </Card>
            </div>

            {/* # State 3: Recent diagnosis reports */}
            {diagnoses.length > 0 && (
              <section className="mb-8">
                <h3 className="mb-3 font-serif text-lg font-bold">Diagnosis Reports</h3>
                {diagnoses.slice(0, 3).map((d) => (
                  <Card
                    key={d.id}
                    className="mb-2 cursor-pointer border border-border p-4 transition-colors hover:bg-muted"
                    onClick={() => router.push(`/diagnosis/${d.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{d.gapCount} skill gaps</span>
                      {d.topRootCause && (
                        <span className="rounded-full bg-foreground px-3 py-0.5 text-xs text-background">
                          {d.topRootCause}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </>
  )
}
