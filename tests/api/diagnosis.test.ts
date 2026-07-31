import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import { createDiagnosis } from '@/db/repositories/diagnoses'
import { createTestSession } from '@/db/repositories/test-sessions'
import { createTestResult } from '@/db/repositories/test-results'
import type { Db } from '@/db/client'

import { GET } from '@/app/api/diagnosis/route'
import { GET as getById } from '@/app/api/diagnosis/[id]/route'

const NOW = 1_700_000_000_000
let db: Db

// These IDs are set up in beforeEach — a test session + test result
// that the diagnosis FK references.
let testResultId: string

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

  // Create prerequisite test session + result for diagnosis FK.
  await createTestSession(db, {
    sessionId: 'sess.1', learnerId: 'learner.1', examId: 'ielts_academic',
    state: {}, now: NOW,
  })
  const result = await createTestResult(db, {
    sessionId: 'sess.1', learnerId: 'learner.1', examId: 'ielts_academic',
    overallBand: 6.0, sectionBands: {}, sectionsIncluded: [], sectionsMissing: [],
    performanceRecord: {}, completedAt: NOW,
  })
  testResultId = result.id
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

describe('GET /api/diagnosis', () => {
  it('returns empty list when no diagnoses exist', async () => {
    const response = await GET(
      new Request('http://localhost:3000/api/diagnosis') as any,
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.diagnoses).toEqual([])
  })

  it('returns diagnoses for the authenticated learner', async () => {
    await createDiagnosis(db, {
      testResultId, learnerId: 'learner.1', gapCount: 3,
      topRootCause: 'knowledge', totalStudyMinutes: 45,
      diagnosis: { gaps: [] }, now: NOW,
    })

    const response = await GET(
      new Request('http://localhost:3000/api/diagnosis') as any,
    )
    const data = await response.json()
    expect(data.diagnoses).toHaveLength(1)
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())

    const response = await GET(
      new Request('http://localhost:3000/api/diagnosis') as any,
    )
    expect(response.status).toBe(401)
  })
})

describe('GET /api/diagnosis/[id]', () => {
  it('returns 404 for nonexistent diagnosis', async () => {
    const response = await getById(
      new Request('http://localhost:3000/api/diagnosis/nope') as any,
      makeParams('nope'),
    )
    expect(response.status).toBe(404)
  })

  it('returns the full diagnosis object', async () => {
    const row = await createDiagnosis(db, {
      testResultId, learnerId: 'learner.1', gapCount: 2,
      topRootCause: 'processing', totalStudyMinutes: 30,
      diagnosis: { gaps: [{ nodeId: 'gram.b1.pp' }] }, now: NOW,
    })

    const response = await getById(
      new Request(`http://localhost:3000/api/diagnosis/${row.id}`) as any,
      makeParams(row.id),
    )
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.diagnosis.diagnosis.gaps).toHaveLength(1)
  })

  it('returns 403 when a different user requests it', async () => {
    const row = await createDiagnosis(db, {
      testResultId, learnerId: 'learner.1', gapCount: 1,
      topRootCause: 'knowledge', totalStudyMinutes: 10,
      diagnosis: {}, now: NOW,
    })

    // Switch to a different authenticated user.
    vi.mocked(getAuthenticatedLearner).mockResolvedValue({
      learnerId: 'evil.attacker', email: 'evil@test.com',
    })

    const response = await getById(
      new Request(`http://localhost:3000/api/diagnosis/${row.id}`) as any,
      makeParams(row.id),
    )
    expect(response.status).toBe(403)
  })
})
