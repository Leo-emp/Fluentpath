'use client'

// # Active mock test session — shows session status with complete/abandon actions.
// # Note: Full question-by-question flow with section transitions requires
// # the mock test engine to expose per-question navigation via the API.
// # Currently, answer keys are stripped from GET responses (by design),
// # so the "Complete Test" button triggers band score computation.

import { useState, useEffect, useCallback, use } from 'react'
import { useRouter } from 'next/navigation'
import { SessionShell } from '@/components/session-shell'
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

export default function MockTestSessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [session, setSession] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [showQuitDialog, setShowQuitDialog] = useState(false)
  const [completing, setCompleting] = useState(false)

  // # Fetch session state on mount.
  useEffect(() => {
    apiFetch<{ session: Record<string, unknown> }>(`/api/mock-test/sessions/${id}`)
      .then((data) => setSession(data.session))
      .catch(() => router.replace('/dashboard'))
      .finally(() => setLoading(false))
  }, [id, router])

  // # Complete the test and navigate to result page.
  const handleComplete = useCallback(async () => {
    setCompleting(true)
    try {
      const data = await apiFetch<{ testResultId: string }>(`/api/mock-test/sessions/${id}/complete`, {
        method: 'POST',
        body: '{}',
      })
      router.push(`/mock-test/${id}/result?rid=${data.testResultId}`)
    } catch {
      setCompleting(false)
    }
  }, [id, router])

  // # Abandon the test — confirm via dialog first.
  const handleAbandon = async () => {
    await apiFetch(`/api/mock-test/sessions/${id}/abandon`, {
      method: 'POST',
      body: '{}',
    }).catch(() => {})
    router.push('/dashboard')
  }

  if (loading) return <PageSkeleton />
  if (!session) return null

  return (
    <SessionShell current={0} total={1} onQuit={() => setShowQuitDialog(true)}>
      <div className="text-center">
        <h1 className="mb-4 font-serif text-3xl font-bold">Mock Test In Progress</h1>
        <p className="mb-2 text-muted-foreground">
          Session: {id.slice(0, 8)}...
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          Writing and speaking sections coming soon.
          <br />
          Complete the test to see your band scores.
        </p>
        <Button size="lg" onClick={handleComplete} disabled={completing}>
          {completing ? '...' : 'Complete Test'}
        </Button>
      </div>

      {/* # Abandon confirmation dialog */}
      <Dialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abandon Test?</DialogTitle>
            <DialogDescription>
              Your progress will be lost. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQuitDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleAbandon}>
              Abandon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SessionShell>
  )
}
