import { describe, it, expect, beforeEach } from 'vitest'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import {
  createTestSession,
  findActiveSession,
  updateSessionState,
  completeSession,
  abandonSession,
} from '@/db/repositories/test-sessions'
import { createLearner } from '@/db/repositories/learners'

function createTestDb() {
  const client = createClient({ url: ':memory:' })
  return drizzle(client, { schema })
}

// Create all tables needed for test sessions (learners + test_sessions).
async function migrateTestDb(db: ReturnType<typeof createTestDb>) {
  await db.run(`
    CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      l1 TEXT,
      current_level TEXT,
      tier TEXT NOT NULL DEFAULT 'free',
      paddle_customer_id TEXT,
      paddle_subscription_id TEXT,
      subscription_status TEXT NOT NULL DEFAULT 'none',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `)
  await db.run(`
    CREATE TABLE IF NOT EXISTS test_sessions (
      id TEXT PRIMARY KEY,
      learner_id TEXT NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
      exam_id TEXT NOT NULL,
      status TEXT NOT NULL,
      state TEXT NOT NULL,
      started_at INTEGER NOT NULL,
      completed_at INTEGER,
      updated_at INTEGER NOT NULL
    )
  `)
}

describe('test-sessions repository', () => {
  let db: ReturnType<typeof createTestDb>
  let learnerId: string

  beforeEach(async () => {
    db = createTestDb()
    await migrateTestDb(db)
    // Create a learner for FK references.
    const learner = await createLearner(db, {
      email: 'learner@example.com',
      now: Date.now(),
    })
    learnerId = learner.id
  })

  // A minimal TestSession-like object for the state column.
  const mockState = {
    id: 'sess_001',
    examId: 'ielts_academic',
    learnerId: 'will-be-set',
    status: 'in_progress',
    startedAt: 1000,
    completedAt: null,
    activeSectionIndex: 0,
    sectionStates: [],
    responses: [],
  }

  describe('createTestSession', () => {
    it('creates a session with in_progress status', async () => {
      const now = Date.now()
      const session = await createTestSession(db, {
        sessionId: 'sess_001',
        learnerId,
        examId: 'ielts_academic',
        state: { ...mockState, learnerId },
        now,
      })

      expect(session.id).toBe('sess_001')
      expect(session.learnerId).toBe(learnerId)
      expect(session.examId).toBe('ielts_academic')
      expect(session.status).toBe('in_progress')
      expect(session.startedAt).toBe(now)
    })
  })

  describe('findActiveSession', () => {
    it('returns the active session for a learner', async () => {
      const now = Date.now()
      await createTestSession(db, {
        sessionId: 'sess_active',
        learnerId,
        examId: 'ielts_academic',
        state: { ...mockState, id: 'sess_active', learnerId },
        now,
      })

      const active = await findActiveSession(db, learnerId)
      expect(active).toBeDefined()
      expect(active!.id).toBe('sess_active')
      expect(active!.status).toBe('in_progress')
    })

    it('returns undefined when no active session exists', async () => {
      const active = await findActiveSession(db, learnerId)
      expect(active).toBeUndefined()
    })

    it('does not return completed sessions', async () => {
      const now = Date.now()
      await createTestSession(db, {
        sessionId: 'sess_done',
        learnerId,
        examId: 'ielts_academic',
        state: { ...mockState, id: 'sess_done', learnerId },
        now,
      })
      await completeSession(db, 'sess_done', { ...mockState, status: 'completed' }, now + 1000)

      const active = await findActiveSession(db, learnerId)
      expect(active).toBeUndefined()
    })
  })

  describe('updateSessionState', () => {
    it('updates the state JSON and updatedAt timestamp', async () => {
      const now = Date.now()
      await createTestSession(db, {
        sessionId: 'sess_update',
        learnerId,
        examId: 'ielts_academic',
        state: { ...mockState, id: 'sess_update', learnerId },
        now,
      })

      const updatedState = {
        ...mockState,
        id: 'sess_update',
        learnerId,
        activeSectionIndex: 1,
      }
      await updateSessionState(db, 'sess_update', updatedState, now + 5000)

      const found = await findActiveSession(db, learnerId)
      expect(found!.updatedAt).toBe(now + 5000)
      // The state should reflect the update.
      const state = found!.state as Record<string, unknown>
      expect(state.activeSectionIndex).toBe(1)
    })
  })

  describe('completeSession', () => {
    it('marks the session as completed', async () => {
      const now = Date.now()
      await createTestSession(db, {
        sessionId: 'sess_complete',
        learnerId,
        examId: 'ielts_academic',
        state: { ...mockState, id: 'sess_complete', learnerId },
        now,
      })

      await completeSession(
        db,
        'sess_complete',
        { ...mockState, status: 'completed' },
        now + 60000,
      )

      // Should no longer appear as active.
      const active = await findActiveSession(db, learnerId)
      expect(active).toBeUndefined()
    })
  })

  describe('abandonSession', () => {
    it('marks the session as abandoned', async () => {
      const now = Date.now()
      await createTestSession(db, {
        sessionId: 'sess_abandon',
        learnerId,
        examId: 'ielts_academic',
        state: { ...mockState, id: 'sess_abandon', learnerId },
        now,
      })

      await abandonSession(db, 'sess_abandon', now + 10000)

      // Should no longer appear as active.
      const active = await findActiveSession(db, learnerId)
      expect(active).toBeUndefined()
    })
  })
})
