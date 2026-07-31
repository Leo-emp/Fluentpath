import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST } from '@/app/api/practice/sessions/[id]/complete/route'
import { createPracticeSession, completePracticeSession } from '@/sequencer/session-store'
import { upsertNodes } from '@/skill-graph/repository'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

function postRequest(id: string, body: Record<string, unknown>): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
  // Insert a node so recordOutcomes can validate it.
  await upsertNodes(db, [
    { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
  ], NOW)
})

afterEach(() => {
  _setTestDb(null)
})

describe('POST /api/practice/sessions/[id]/complete', () => {
  it('completes the session and returns updated mastery', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await POST(
      postRequest(sessionId, {
        learnerId: 'learner.1',
        outcomes: [{ nodeId: 'gram.a1.be', outcome: 1, difficulty: 0.5 }],
      }),
      makeParams(sessionId),
    )
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.mastery).toHaveLength(1)
    expect(data.mastery[0].nodeId).toBe('gram.a1.be')
    expect(data.mastery[0].mastery).toBeGreaterThan(0)
  })

  it('returns 404 for unknown session', async () => {
    const res = await POST(
      postRequest('ghost', { learnerId: 'learner.1', outcomes: [] }),
      makeParams('ghost'),
    )
    expect(res.status).toBe(404)
  })

  it('returns 400 for already-completed session', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await completePracticeSession(db, sessionId, NOW)

    const res = await POST(
      postRequest(sessionId, { learnerId: 'learner.1', outcomes: [] }),
      makeParams(sessionId),
    )
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('completed')
  })

  it('returns 403 when learnerId does not match session owner', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await POST(
      postRequest(sessionId, {
        learnerId: 'evil.attacker',
        outcomes: [{ nodeId: 'gram.a1.be', outcome: 1, difficulty: 0.5 }],
      }),
      makeParams(sessionId),
    )
    expect(res.status).toBe(403)
  })

  it('returns 400 when learnerId is missing', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const res = await POST(
      postRequest(sessionId, { outcomes: [] }),
      makeParams(sessionId),
    )
    expect(res.status).toBe(400)
  })

  it('returns 400 when outcomes is missing', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const res = await POST(
      postRequest(sessionId, { learnerId: 'learner.1' }),
      makeParams(sessionId),
    )
    expect(res.status).toBe(400)
  })
})
