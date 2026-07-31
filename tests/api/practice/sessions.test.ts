import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock auth before importing route handlers.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
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

function getRequest(): NextRequest {
  return new NextRequest('http://localhost/api/practice/sessions', { method: 'GET' })
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

describe('POST /api/practice/sessions', () => {
  it('creates a session and returns 201 with sessionId', async () => {
    const res = await POST(postRequest({ plan: PLAN }))
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(typeof data.sessionId).toBe('string')
  })

  it('returns 400 when plan is missing', async () => {
    const res = await POST(postRequest({}))
    expect(res.status).toBe(400)
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())

    const res = await POST(postRequest({ plan: PLAN }))
    expect(res.status).toBe(401)
  })
})

describe('GET /api/practice/sessions (active)', () => {
  it('returns null when no active session', async () => {
    const res = await GET(getRequest())
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session).toBeNull()
  })

  it('returns the active session after creating one', async () => {
    // Create a session first.
    await POST(postRequest({ plan: PLAN }))

    const res = await GET(getRequest())
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.session).not.toBeNull()
    expect(data.session.status).toBe('in_progress')
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())

    const res = await GET(getRequest())
    expect(res.status).toBe(401)
  })
})
