'use client'

// # Diagnosis report page — "medical report for English skills."
// # Shows skill gaps, root causes, action plan, and projected band impact.

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// # Types for the diagnosis API response.

interface Gap {
  nodeTitle?: string
  nodeId?: string
  rootCause?: string
  accuracy?: number
  level?: string
}

interface ActionPlan {
  totalEstimatedMinutes?: number
  steps?: { title: string; priority: number }[]
}

interface DiagnosisData {
  id: string
  gapCount: number
  topRootCause: string | null
  totalStudyMinutes: number
  diagnosis: {
    gaps?: Gap[]
    actionPlan?: ActionPlan
    bandImpacts?: Record<string, number>
  }
}

export default function DiagnosisPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [data, setData] = useState<DiagnosisData | null>(null)
  const [loading, setLoading] = useState(true)

  // # Fetch the full diagnosis report.
  useEffect(() => {
    apiFetch<{ diagnosis: DiagnosisData }>(`/api/diagnosis/${id}`)
      .then((res) => setData(res.diagnosis))
      .catch(() => router.replace('/dashboard'))
      .finally(() => setLoading(false))
  }, [id, router])

  if (loading) return <><NavBar /><PageSkeleton /></>
  if (!data) return null

  const gaps = data.diagnosis.gaps ?? []
  const plan = data.diagnosis.actionPlan

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* # Header — title + summary badges */}
        <div className="mb-8">
          <h1 className="mb-2 font-serif text-3xl font-bold">Diagnosis Report</h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-foreground px-3 py-1 text-sm text-background">
              {data.gapCount} skill gaps
            </span>
            {data.topRootCause && (
              <span className="rounded-full border border-border px-3 py-1 text-sm">
                {data.topRootCause}
              </span>
            )}
          </div>
        </div>

        {/* # Skill Gaps — sorted by severity (lowest accuracy first) */}
        {gaps.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-serif text-xl font-bold">Skill Gaps</h2>
            <div className="flex flex-col gap-3">
              {gaps.map((gap, i) => (
                <Card key={i} className="border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{gap.nodeTitle ?? gap.nodeId}</span>
                    <div className="flex items-center gap-2">
                      {gap.level && (
                        <span className="text-xs text-muted-foreground">{gap.level}</span>
                      )}
                      {gap.rootCause && (
                        <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
                          {gap.rootCause}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* # Accuracy bar — visual representation of gap severity */}
                  {gap.accuracy !== undefined && (
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-foreground"
                          style={{ width: `${Math.round(gap.accuracy * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(gap.accuracy * 100)}%
                      </span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* # Action Plan — estimated study time */}
        {plan && (
          <section className="mb-10">
            <h2 className="mb-4 font-serif text-xl font-bold">Action Plan</h2>
            {plan.totalEstimatedMinutes !== undefined && (
              <p className="mb-4 text-muted-foreground">
                Estimated study time: {Math.floor(plan.totalEstimatedMinutes / 60)}h{' '}
                {plan.totalEstimatedMinutes % 60}m
              </p>
            )}
          </section>
        )}

        {/* # Projected Band Impact — how much improvement to expect */}
        {data.diagnosis.bandImpacts && Object.keys(data.diagnosis.bandImpacts).length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-serif text-xl font-bold">Projected Band Impact</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(data.diagnosis.bandImpacts).map(([section, impact]) => (
                <Card key={section} className="border border-border p-4 text-center">
                  <p className="text-xs text-muted-foreground capitalize">{section}</p>
                  <p className="font-serif text-xl font-bold">+{impact}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* # CTA — start practising the weak areas */}
        <Button size="lg" onClick={() => router.push('/practice')}>
          Practice Weak Areas
        </Button>
      </main>
    </>
  )
}
