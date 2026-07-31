import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import { AuthError } from '@/app/api/_lib/validate'
import type { Db } from '@/db/client'

// Mock the auth library so we control what getSession returns.
vi.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

// Import AFTER mocking so the mock is in place.
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { auth } from '@/lib/auth'

const NOW = 1_700_000_000_000

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  // Insert a learner row that the helper should find.
  await db.insert(learners).values({
    id: 'learner.1',
    email: 'test@test.com',
    createdAt: NOW,
    updatedAt: NOW,
  })
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

// Helper: build a minimal Request with headers.
function makeRequest(): Request {
  return new Request('http://localhost:3000/api/test', {
    headers: { cookie: 'session=abc' },
  })
}

describe('getAuthenticatedLearner', () => {
  it('returns learnerId when session is valid', async () => {
    // Mock a valid session with matching email.
    vi.mocked(auth.api.getSession).mockResolvedValue({
      session: { id: 'sess.1', userId: 'auth.1', token: 'abc', expiresAt: new Date(NOW + 86400000) },
      user: { id: 'auth.1', email: 'test@test.com', name: 'Test', emailVerified: true, createdAt: new Date(NOW), updatedAt: new Date(NOW) },
    } as any)

    const result = await getAuthenticatedLearner(makeRequest())

    expect(result.learnerId).toBe('learner.1')
    expect(result.email).toBe('test@test.com')
  })

  it('throws AuthError when no session exists', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null as any)

    await expect(getAuthenticatedLearner(makeRequest())).rejects.toThrow(AuthError)
  })

  it('throws AuthError when session has no email', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      session: { id: 'sess.1' },
      user: { id: 'auth.1' },
    } as any)

    await expect(getAuthenticatedLearner(makeRequest())).rejects.toThrow(AuthError)
  })

  it('throws AuthError when no learner row matches the email', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      session: { id: 'sess.1', userId: 'auth.1' },
      user: { id: 'auth.1', email: 'unknown@test.com', name: 'Unknown', emailVerified: true },
    } as any)

    await expect(getAuthenticatedLearner(makeRequest())).rejects.toThrow(AuthError)
  })
})
