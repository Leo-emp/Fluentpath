import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock auth before importing route handlers.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST } from '@/app/api/practice/sessions/[id]/abandon/route'
import { createPracticeSession, getPracticeSession } from '@/sequencer/session-store'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

function postRequest(id: string): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}/abandon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
}

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'learner.1',
    email: 'test@test.com',
  })
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

describe('POST /api/practice/sessions/[id]/abandon', () => {
  it('abandons the session', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await POST(postRequest(sessionId), makeParams(sessionId))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.ok).toBe(true)

    // Verify the session status changed.
    const session = await getPracticeSession(db, sessionId)
    expect(session!.status).toBe('abandoned')
  })

  it('returns 404 for unknown session', async () => {
    const res = await POST(postRequest('ghost'), makeParams('ghost'))
    expect(res.status).toBe(404)
  })

  it('returns 403 when a different user tries to abandon', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    // Switch to a different authenticated user.
    vi.mocked(getAuthenticatedLearner).mockResolvedValue({
      learnerId: 'evil.attacker',
      email: 'evil@test.com',
    })

    const res = await POST(postRequest(sessionId), makeParams(sessionId))
    expect(res.status).toBe(403)

    // Session should remain in_progress.
    const session = await getPracticeSession(db, sessionId)
    expect(session!.status).toBe('in_progress')
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())

    const res = await POST(postRequest('any'), makeParams('any'))
    expect(res.status).toBe(401)
  })
})
