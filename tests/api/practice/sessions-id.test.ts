import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { GET, PATCH } from '@/app/api/practice/sessions/[id]/route'
import { createPracticeSession } from '@/sequencer/session-store'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

// Build a GET request for /api/practice/sessions/[id].
function getRequest(id: string): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}`, { method: 'GET' })
}

// Build a PATCH request for /api/practice/sessions/[id].
function patchRequest(id: string, body: Record<string, unknown>): NextRequest {
  return new NextRequest(`http://localhost/api/practice/sessions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

// Next.js 16 passes params as a Promise.
function makeParams(id: string) {
  return { params: Promise.resolve({ id }) }
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
})

afterEach(() => {
  _setTestDb(null)
})

describe('GET /api/practice/sessions/[id]', () => {
  it('returns the session by ID', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await GET(getRequest(sessionId), makeParams(sessionId))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session.id).toBe(sessionId)
    expect(data.session.status).toBe('in_progress')
  })

  it('returns 404 for unknown session', async () => {
    const res = await GET(getRequest('nonexistent'), makeParams('nonexistent'))
    expect(res.status).toBe(404)
  })
})

describe('PATCH /api/practice/sessions/[id]', () => {
  it('updates progress', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const res = await PATCH(patchRequest(sessionId, { progress: 5 }), makeParams(sessionId))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.ok).toBe(true)
  })

  it('returns 404 for unknown session', async () => {
    const res = await PATCH(patchRequest('ghost', { progress: 1 }), makeParams('ghost'))
    expect(res.status).toBe(404)
  })

  it('returns 400 when progress is missing', async () => {
    const sessionId = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const res = await PATCH(patchRequest(sessionId, {}), makeParams(sessionId))
    expect(res.status).toBe(400)
  })
})
