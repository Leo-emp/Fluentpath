'use client'

// # Practice session — assembles items of ALL types → presents them → shows summary.
// # Immediate correct/incorrect feedback on each answer.

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SessionShell } from '@/components/session-shell'
import { ItemCard, type PracticeItem } from '@/components/items/item-card'
import { PageSkeleton } from '@/components/page-skeleton'
import { NavBar } from '@/components/nav-bar'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'

// # Types matching the practice API responses.

interface SessionItem {
  item: PracticeItem
  nodeId: string
  reason: 'review' | 'new' | 'remediation'
}

interface Outcome {
  nodeId: string
  outcome: number
  difficulty: number
}

type Phase = 'loading' | 'active' | 'summary'

export default function PracticePage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('loading')
  const [sessionId, setSessionId] = useState('')
  const [items, setItems] = useState<SessionItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [outcomes, setOutcomes] = useState<Outcome[]>([])
  const [correctCount, setCorrectCount] = useState(0)

  // # Assemble items and create session on mount.
  useEffect(() => {
    async function init() {
      try {
        // # Step 1: Ask the server to assemble a practice session.
        const plan = await apiFetch<{ items: SessionItem[]; nodeIds: string[]; estimatedMinutes: number }>(
          '/api/practice/assemble',
          { method: 'POST', body: JSON.stringify({}) },
        )

        if (plan.items.length === 0) {
          router.replace('/dashboard')
          return
        }

        // # Step 2: Create the session in the backend.
        const session = await apiFetch<{ sessionId: string }>(
          '/api/practice/sessions',
          { method: 'POST', body: JSON.stringify({ plan }) },
        )

        setSessionId(session.sessionId)
        // # Normalize items — API may return ContentItem shape or raw payload.
        const normalized: SessionItem[] = plan.items.map((si) => ({
          ...si,
          item: normalizeItem(si.item as unknown as Record<string, unknown>),
        }))
        setItems(normalized)
        setPhase('active')
      } catch {
        router.replace('/dashboard')
      }
    }
    init()
  }, [router])

  // # Handle answer completion — records outcome and advances.
  const handleComplete = useCallback(
    async (correct: boolean) => {
      const sessionItem = items[currentIndex]
      if (!sessionItem) return

      if (correct) setCorrectCount((c) => c + 1)

      const outcome: Outcome = {
        nodeId: sessionItem.nodeId,
        outcome: correct ? 1 : 0,
        difficulty: sessionItem.item.difficulty ?? 0.5,
      }
      const nextOutcomes = [...outcomes, outcome]
      setOutcomes(nextOutcomes)

      const nextIndex = currentIndex + 1

      // # Update progress counter in the backend.
      await apiFetch(`/api/practice/sessions/${sessionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ progress: nextIndex }),
      }).catch(() => {})

      if (nextIndex >= items.length) {
        // # Last item — complete the session.
        await apiFetch(`/api/practice/sessions/${sessionId}/complete`, {
          method: 'POST',
          body: JSON.stringify({ outcomes: nextOutcomes }),
        }).catch(() => {})
        setPhase('summary')
      } else {
        setCurrentIndex(nextIndex)
      }
    },
    [items, currentIndex, outcomes, sessionId],
  )

  // # Quit handler — abandons the session.
  const handleQuit = async () => {
    await apiFetch(`/api/practice/sessions/${sessionId}/abandon`, {
      method: 'POST',
      body: JSON.stringify({}),
    }).catch(() => {})
    router.push('/dashboard')
  }

  if (phase === 'loading') return <PageSkeleton />

  // # Summary screen — shown after all items are answered.
  if (phase === 'summary') {
    return (
      <>
        <NavBar />
        <main className="mx-auto max-w-lg px-6 py-16 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold">Session Complete</h1>
          <p className="mb-2 text-5xl font-bold">
            {correctCount}/{items.length}
          </p>
          <p className="mb-10 text-muted-foreground">correct answers</p>
          <Button size="lg" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </main>
      </>
    )
  }

  // # Active question screen.
  const sessionItem = items[currentIndex]
  if (!sessionItem) return null

  return (
    <SessionShell
      current={currentIndex}
      total={items.length}
      onQuit={handleQuit}
    >
      <ItemCard
        item={sessionItem.item}
        showFeedback={true}
        onComplete={handleComplete}
      />
    </SessionShell>
  )
}

// # Normalize an item from the API into the PracticeItem shape.
// # The assembler returns ContentItem objects where the payload fields
// # are spread across the top level. We need to collect them into a payload.
function normalizeItem(raw: Record<string, unknown>): PracticeItem {
  const type = String(raw.type ?? 'mcq')
  const id = String(raw.id ?? '')
  const nodeIds = Array.isArray(raw.nodeIds) ? raw.nodeIds as string[] : []
  const difficulty = typeof raw.difficulty === 'number' ? raw.difficulty : null

  // # Everything except id/type/nodeIds/difficulty/level is payload.
  const exclude = new Set(['id', 'type', 'nodeIds', 'difficulty', 'level'])
  const payload: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(raw)) {
    if (!exclude.has(key)) {
      payload[key] = value
    }
  }

  return { id, type, payload, nodeIds, difficulty }
}
