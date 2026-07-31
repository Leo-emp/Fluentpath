import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock auth before importing route handlers.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import { createPlacementResult, completePlacement } from '@/db/repositories/placement'
import { createTestSession } from '@/db/repositories/test-sessions'
import { createTestResult } from '@/db/repositories/test-results'
import type { Db } from '@/db/client'

import { GET as meGET } from '@/app/api/me/route'
import { GET as latestGET } from '@/app/api/placement/latest/route'
import { GET as resultGET } from '@/app/api/test-results/[id]/route'

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
    id: 'learner.1', email: 'test@test.com', currentLevel: 'B1',
    createdAt: NOW, updatedAt: NOW,
  })
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

describe('GET /api/me', () => {
  it('returns the learner profile', async () => {
    const res = await meGET(new Request('http://localhost:3000/api/me') as any)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.learner.id).toBe('learner.1')
    expect(data.learner.currentLevel).toBe('B1')
    expect(data.learner.email).toBe('test@test.com')
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())
    const res = await meGET(new Request('http://localhost:3000/api/me') as any)
    expect(res.status).toBe(401)
  })
})

describe('GET /api/placement/latest', () => {
  it('returns null when no completed placement', async () => {
    const res = await latestGET(new Request('http://localhost:3000/api/placement/latest') as any)
    const data = await res.json()
    expect(data.placement).toBeNull()
  })

  it('returns the latest completed placement', async () => {
    const row = await createPlacementResult(db, {
      learnerId: 'learner.1', state: {}, now: NOW,
    })
    await completePlacement(db, row.id, 'B1', { B1: { correct: 2, total: 3 } }, 3, {}, NOW + 1000)

    const res = await latestGET(new Request('http://localhost:3000/api/placement/latest') as any)
    const data = await res.json()
    expect(data.placement).not.toBeNull()
    expect(data.placement.estimatedLevel).toBe('B1')
  })
})

describe('GET /api/test-results/[id]', () => {
  it('returns a test result by ID', async () => {
    await createTestSession(db, {
      sessionId: 'sess.1', learnerId: 'learner.1', examId: 'ielts_academic',
      state: {}, now: NOW,
    })
    const result = await createTestResult(db, {
      sessionId: 'sess.1', learnerId: 'learner.1', examId: 'ielts_academic',
      overallBand: 6.5, sectionBands: {}, sectionsIncluded: [], sectionsMissing: [],
      performanceRecord: {}, completedAt: NOW,
    })

    const res = await resultGET(
      new Request(`http://localhost:3000/api/test-results/${result.id}`) as any,
      makeParams(result.id),
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.result.overallBand).toBe(6.5)
  })

  it('returns 403 when different user requests it', async () => {
    await createTestSession(db, {
      sessionId: 'sess.1', learnerId: 'learner.1', examId: 'ielts_academic',
      state: {}, now: NOW,
    })
    const result = await createTestResult(db, {
      sessionId: 'sess.1', learnerId: 'learner.1', examId: 'ielts_academic',
      overallBand: 6.5, sectionBands: {}, sectionsIncluded: [], sectionsMissing: [],
      performanceRecord: {}, completedAt: NOW,
    })

    vi.mocked(getAuthenticatedLearner).mockResolvedValue({
      learnerId: 'evil.attacker', email: 'evil@test.com',
    })

    const res = await resultGET(
      new Request(`http://localhost:3000/api/test-results/${result.id}`) as any,
      makeParams(result.id),
    )
    expect(res.status).toBe(403)
  })
})
