import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock auth before importing route handlers.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

import { GET as examsGET } from '@/app/api/mock-test/exams/route'
import { POST as sessionsPOST } from '@/app/api/mock-test/sessions/route'
import { GET as sessionGET } from '@/app/api/mock-test/sessions/[id]/route'
import { POST as abandonPOST } from '@/app/api/mock-test/sessions/[id]/abandon/route'

const NOW = 1_700_000_000_000
let db: Db

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
  await db.insert(learners).values({
    id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW,
  })
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

describe('GET /api/mock-test/exams', () => {
  it('returns the list of available exams (no auth required)', async () => {
    const response = await examsGET(
      new Request('http://localhost:3000/api/mock-test/exams') as any,
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.exams.length).toBeGreaterThan(0)
    expect(data.exams[0].id).toBe('ielts_academic')
    // Must not include item content.
    expect(data.exams[0].items).toBeUndefined()
    expect(data.exams[0].slots).toBeUndefined()
  })
})

describe('POST /api/mock-test/sessions', () => {
  it('creates a test session', async () => {
    const response = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }) as any,
    )
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.sessionId).toBeDefined()
    expect(data.examName).toBeDefined()
  })

  it('returns 404 for unknown examId', async () => {
    const response = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'nonexistent' }),
      }) as any,
    )
    expect(response.status).toBe(404)
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())
    const response = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }) as any,
    )
    expect(response.status).toBe(401)
  })
})

describe('GET /api/mock-test/sessions/[id]', () => {
  it('returns session state without answer keys', async () => {
    // Create a session first.
    const createRes = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }) as any,
    )
    const { sessionId } = await createRes.json()

    const response = await sessionGET(
      new Request(`http://localhost:3000/api/mock-test/sessions/${sessionId}`) as any,
      makeParams(sessionId),
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.session).toBeDefined()
    // Answer keys must NOT be in the response.
    const json = JSON.stringify(data)
    expect(json).not.toContain('correctIndex')
    expect(json).not.toContain('misconception')
  })

  it('returns 404 for nonexistent session', async () => {
    const response = await sessionGET(
      new Request('http://localhost:3000/api/mock-test/sessions/nope') as any,
      makeParams('nope'),
    )
    expect(response.status).toBe(404)
  })
})

describe('POST /api/mock-test/sessions/[id]/abandon', () => {
  it('abandons a session', async () => {
    const createRes = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }) as any,
    )
    const { sessionId } = await createRes.json()

    const response = await abandonPOST(
      new Request(`http://localhost:3000/api/mock-test/sessions/${sessionId}/abandon`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      }) as any,
      makeParams(sessionId),
    )
    expect(response.status).toBe(200)
  })

  it('returns 404 when different user tries to abandon (session not visible)', async () => {
    const createRes = await sessionsPOST(
      new Request('http://localhost:3000/api/mock-test/sessions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ examId: 'ielts_academic' }),
      }) as any,
    )
    const { sessionId } = await createRes.json()

    // Switch to a different authenticated user.
    vi.mocked(getAuthenticatedLearner).mockResolvedValue({
      learnerId: 'evil.attacker', email: 'evil@test.com',
    })

    const response = await abandonPOST(
      new Request(`http://localhost:3000/api/mock-test/sessions/${sessionId}/abandon`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      }) as any,
      makeParams(sessionId),
    )
    expect(response.status).toBe(404)
  })
})
