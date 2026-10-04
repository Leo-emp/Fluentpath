'use client'

// # Mock test result page — overall band + per-section scores + band descriptors.
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

// # Human-readable section names and icons for IELTS.
const SECTION_META: Record<string, { name: string; icon: string }> = {
  listening: { name: 'Listening', icon: '🎧' },
  reading: { name: 'Reading', icon: '📖' },
  writing: { name: 'Writing', icon: '✍️' },
  speaking: { name: 'Speaking', icon: '🎤' },
}

// # Band score descriptors — what each band range means.
function getBandDescriptor(band: number): string {
  if (band >= 9) return 'Expert User'
  if (band >= 8) return 'Very Good User'
  if (band >= 7) return 'Good User'
  if (band >= 6) return 'Competent User'
  if (band >= 5) return 'Modest User'
  if (band >= 4) return 'Limited User'
  if (band >= 3) return 'Extremely Limited User'
  return 'Non User'
}

// # Colour for band score — green for high, amber for mid, red for low.
function getBandColour(band: number): string {
  if (band >= 7) return 'text-green-600 dark:text-green-400'
  if (band >= 5.5) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

// # Visual ring colour for section cards.
function getBandRingColour(band: number): string {
  if (band >= 7) return 'ring-green-500/30'
  if (band >= 5.5) return 'ring-amber-500/30'
  return 'ring-red-500/30'
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

  const descriptor = getBandDescriptor(result.overallBand)
  const bandColour = getBandColour(result.overallBand)

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-2xl px-6 py-12">
        {/* # Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Test Complete
          </p>
          <h1 className="mb-6 font-serif text-3xl font-bold">Your IELTS Score</h1>

          {/* # Overall band — large centred number with descriptor */}
          <div className="mb-2 flex items-center justify-center">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                Overall Band
              </p>
              <p className={`font-serif text-7xl font-bold ${bandColour}`}>
                {result.overallBand}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {descriptor}
              </p>
            </div>
          </div>
        </div>

        {/* # Per-section band scores — 2x2 grid */}
        <div className="mb-10 grid grid-cols-2 gap-4">
          {Object.entries(result.sectionBands).map(([key, band]) => {
            const meta = SECTION_META[key] ?? { name: key, icon: '' }
            return (
              <Card
                key={key}
                className={`border border-border p-5 text-center ring-2 ${getBandRingColour(band)}`}
              >
                <p className="mb-1 text-lg">{meta.icon}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {meta.name}
                </p>
                <p className={`font-serif text-4xl font-bold ${getBandColour(band)}`}>
                  {band}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {getBandDescriptor(band)}
                </p>
              </Card>
            )
          })}
        </div>

        {/* # Band scale reference */}
        <div className="mb-10 rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            IELTS Band Scale
          </p>
          <div className="flex flex-col gap-1 text-xs">
            {[
              { band: '9', label: 'Expert User', desc: 'Full command of the language' },
              { band: '8', label: 'Very Good User', desc: 'Occasional inaccuracies' },
              { band: '7', label: 'Good User', desc: 'Handles complex language well' },
              { band: '6', label: 'Competent User', desc: 'Generally effective command' },
              { band: '5', label: 'Modest User', desc: 'Partial command, many errors' },
            ].map((row) => (
              <div key={row.band} className="flex items-center gap-2">
                <span className="w-5 text-right font-mono font-bold text-foreground">
                  {row.band}
                </span>
                <span className="w-32 font-medium">{row.label}</span>
                <span className="text-muted-foreground">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* # CTAs */}
        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={handleDiagnosis}>
            Get AI Diagnosis
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => router.push('/mock-test')}
          >
            Take Another Test
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onClick={() => router.push('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </main>
    </>
  )
}
