'use client'

// # Mock test result page — displays overall band + per-section scores.
// # Reads test result ID from URL query param (?rid=...).

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TestResult {
  id: string
  overallBand: number
  sectionBands: Record<string, number>
}

// # Human-readable section names for IELTS.
const SECTION_NAMES: Record<string, string> = {
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing',
  speaking: 'Speaking',
}

export default function MockTestResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)

  // # Fetch the test result using the rid query parameter.
  useEffect(() => {
    const rid = searchParams.get('rid')
    if (!rid) {
      router.replace('/dashboard')
      return
    }

    apiFetch<{ result: TestResult }>(`/api/test-results/${rid}`)
      .then((data) => setResult(data.result))
      .catch(() => router.replace('/dashboard'))
      .finally(() => setLoading(false))
  }, [searchParams, router])

  // # Run diagnosis on this test result.
  const handleDiagnosis = async () => {
    if (!result) return
    try {
      const data = await apiFetch<{ diagnosisId: string }>('/api/diagnosis', {
        method: 'POST',
        body: JSON.stringify({ testResultId: result.id }),
      })
      router.push(`/diagnosis/${data.diagnosisId}`)
    } catch {
      // # Stay on page if diagnosis fails.
    }
  }

  if (loading) return <><NavBar /><PageSkeleton /></>
  if (!result) return null

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-lg px-6 py-16 text-center">
        {/* # Overall band score — large centered number */}
        <p className="mb-2 text-sm text-muted-foreground">Overall Band</p>
        <p className="mb-8 font-serif text-6xl font-bold">{result.overallBand}</p>

        {/* # Per-section band scores */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(result.sectionBands).map(([key, band]) => (
            <Card key={key} className="border border-border p-4 text-center">
              <p className="text-xs text-muted-foreground">
                {SECTION_NAMES[key] ?? key}
              </p>
              <p className="font-serif text-2xl font-bold">{band}</p>
            </Card>
          ))}
        </div>

        {/* # Next-step CTAs */}
        <div className="flex flex-col gap-3">
          <Button size="lg" onClick={handleDiagnosis}>
            Get Diagnosis
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </main>
    </>
  )
}
