'use client'

// # Placement flow — intro screen → adaptive questions → result redirect.
// # Uses SessionShell for distraction-free full-screen experience.

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SessionShell } from '@/components/session-shell'
import { McqCard } from '@/components/mcq-card'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'

// # Types matching the placement API responses.

interface PlacementItem {
  id: string
  stem: string
  options: { text: string; misconception: string | null }[]
  correctIndex: number
}

interface PlacementState {
  placementId: string
  item: PlacementItem
  level: string
  progress: { answered: number; maxItems: number }
}

type Phase = 'intro' | 'active' | 'loading'

export default function PlacementPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('loading')
  const [state, setState] = useState<PlacementState | null>(null)

  // # Check for active placement on mount.
  useEffect(() => {
    async function check() {
      try {
        await apiFetch<{ placement: unknown | null }>('/api/placement/active')
        // # Whether active or not, show intro — user can start or resume.
        setPhase('intro')
      } catch {
        setPhase('intro')
      }
    }
    check()
  }, [])

  // # Start button handler — creates a new placement test.
  const handleStart = async () => {
    setPhase('loading')
    try {
      const data = await apiFetch<PlacementState>('/api/placement/start', {
        method: 'POST',
        body: JSON.stringify({ startLevel: 'B1' }),
      })
      setState(data)
      setPhase('active')
    } catch {
      // # 409 = already in progress.
      setPhase('intro')
    }
  }

  // # Answer handler — posts answer and either shows next question or redirects.
  const handleAnswer = useCallback(
    async (selectedIndex: number) => {
      if (!state) return

      try {
        const data = await apiFetch<{
          finished: boolean
          correct: boolean
          item?: PlacementItem
          level?: string
          progress: { answered: number; maxItems: number }
          result?: { estimatedLevel: string; perSkillLevels?: Record<string, string>; confidence?: number }
        }>('/api/placement/answer', {
          method: 'POST',
          body: JSON.stringify({
            placementId: state.placementId,
            itemId: state.item.id,
            selectedIndex,
          }),
        })

        if (data.finished && data.result) {
          // # Store result in sessionStorage for the result page.
          sessionStorage.setItem('placement-result', JSON.stringify(data.result))
          sessionStorage.setItem('placement-progress', JSON.stringify(data.progress))
          router.push('/placement/result')
        } else if (data.item) {
          // # Show the next question.
          setState({
            placementId: state.placementId,
            item: data.item,
            level: data.level ?? state.level,
            progress: data.progress,
          })
        }
      } catch {
        // # Network error — stay on current question.
      }
    },
    [state, router],
  )

  const handleQuit = () => {
    router.push('/dashboard')
  }

  if (phase === 'loading') return <PageSkeleton />

  // # Intro screen — brief explanation + "Begin" button.
  if (phase === 'intro') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold">Placement Test</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          We&apos;ll ask you up to 20 questions to find your level.
          There&apos;s no time limit.
        </p>
        <Button size="lg" onClick={handleStart}>
          Begin
        </Button>
      </div>
    )
  }

  if (!state) return null

  // # Active question screen — one question at a time inside SessionShell.
  return (
    <SessionShell
      current={state.progress.answered}
      total={state.progress.maxItems}
      onQuit={handleQuit}
    >
      <p className="mb-2 text-sm text-muted-foreground">Level {state.level}</p>
      <McqCard
        stem={state.item.stem}
        options={state.item.options}
        correctIndex={state.item.correctIndex}
        showFeedback={true}
        onSelect={handleAnswer}
      />
    </SessionShell>
  )
}
