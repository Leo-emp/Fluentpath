'use client'

// # Placement result page — shows the learner's estimated CEFR level.
// # Data comes from sessionStorage (via placement flow) or API fallback.

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { LevelBadge } from '@/components/level-badge'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'

interface PlacementResult {
  estimatedLevel: string
  perSkillLevels?: Record<string, string>
  confidence?: number
}

export default function PlacementResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<PlacementResult | null>(null)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // # Try sessionStorage first (came directly from placement flow).
    const stored = sessionStorage.getItem('placement-result')
    const storedProgress = sessionStorage.getItem('placement-progress')
    if (stored) {
      setResult(JSON.parse(stored))
      if (storedProgress) {
        const progress = JSON.parse(storedProgress)
        setQuestionsAnswered(progress.answered)
      }
      sessionStorage.removeItem('placement-result')
      sessionStorage.removeItem('placement-progress')
      setLoading(false)
      return
    }

    // # Fallback: fetch latest completed placement from API (page refresh).
    async function fetchLatest() {
      try {
        const data = await apiFetch<{ placement: { estimatedLevel: string; itemsUsed: number } | null }>(
          '/api/placement/latest',
        )
        if (data.placement) {
          setResult({ estimatedLevel: data.placement.estimatedLevel })
          setQuestionsAnswered(data.placement.itemsUsed)
        } else {
          // # No completed placement — redirect to dashboard.
          router.replace('/dashboard')
        }
      } catch {
        router.replace('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchLatest()
  }, [router])

  if (loading) return <><NavBar /><PageSkeleton /></>
  if (!result) return null

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="mb-4 text-sm text-muted-foreground">Your Estimated Level</p>
        <div className="mb-6 flex justify-center">
          <LevelBadge level={result.estimatedLevel} />
        </div>
        <p className="mb-10 text-muted-foreground">
          Based on {questionsAnswered} questions
        </p>

        {/* # Per-skill breakdown if available */}
        {result.perSkillLevels && Object.keys(result.perSkillLevels).length > 0 && (
          <div className="mb-10 text-left">
            <h3 className="mb-3 font-serif text-lg font-bold">Per-Skill Breakdown</h3>
            {Object.entries(result.perSkillLevels).map(([skill, level]) => (
              <div key={skill} className="flex items-center justify-between border-b border-border py-2">
                <span className="capitalize">{skill}</span>
                <span className="font-bold">{level}</span>
              </div>
            ))}
          </div>
        )}

        {/* # Next-step CTAs */}
        <div className="flex flex-col gap-3">
          <Button size="lg" onClick={() => router.push('/learning-path')}>
            Start Your Learning Path
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push('/practice')}>
            Start Practising
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push('/mock-test')}>
            Take a Mock Test
          </Button>
        </div>
      </main>
    </>
  )
}
