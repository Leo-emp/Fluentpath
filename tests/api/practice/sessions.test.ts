import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST, GET } from '@/app/api/practice/sessions/route'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
let db: Db

const PLAN = { items: [], nodeIds: ['gram.a1.be'], estimatedMinutes: 5 }

function postRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost/api/practice/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function getRequest(learnerId?: string): NextRequest {
  const url = learnerId
    ? `http://localhost/api/practice/sessions?learnerId=${learnerId}`
    : 'http://localhost/api/practice/sessions'
  return new NextRequest(url, { method: 'GET' })
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
})

afterEach(() => {
  _setTestDb(null)
})

describe('POST /api/practice/sessions', () => {
  it('creates a session and returns 201 with sessionId', async () => {
    const res = await POST(postRequest({ learnerId: 'learner.1', plan: PLAN }))
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(typeof data.sessionId).toBe('string')
  })

  it('returns 400 when learnerId is missing', async () => {
    const res = await POST(postRequest({ plan: PLAN }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when plan is missing', async () => {
    const res = await POST(postRequest({ learnerId: 'learner.1' }))
    expect(res.status).toBe(400)
  })
})

describe('GET /api/practice/sessions (active)', () => {
  it('returns null when no active session', async () => {
    const res = await GET(getRequest('learner.1'))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session).toBeNull()
  })

  it('returns the active session after creating one', async () => {
    // Create a session first.
    await POST(postRequest({ learnerId: 'learner.1', plan: PLAN }))

    const res = await GET(getRequest('learner.1'))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session).not.toBeNull()
    expect(data.session.status).toBe('in_progress')
  })

  it('returns 400 when learnerId is missing', async () => {
    const res = await GET(getRequest())
    expect(res.status).toBe(400)
  })
})
