import { describe, it, expect, beforeEach } from 'vitest'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import {
  createTestResult,
  findTestResultsByLearner,
  findTestResultById,
} from '@/db/repositories/test-results'
import { createLearner } from '@/db/repositories/learners'
import { createTestSession } from '@/db/repositories/test-sessions'

function createTestDb() {
  const client = createClient({ url: ':memory:' })
  return drizzle(client, { schema })
}

async function migrateTestDb(db: ReturnType<typeof createTestDb>) {
  await db.run(`
    CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT, l1 TEXT, current_level TEXT,
      tier TEXT NOT NULL DEFAULT 'free',
      paddle_customer_id TEXT, paddle_subscription_id TEXT,
      subscription_status TEXT NOT NULL DEFAULT 'none',
      created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
    )
  `)
  await db.run(`
    CREATE TABLE IF NOT EXISTS test_sessions (
      id TEXT PRIMARY KEY,
      learner_id TEXT NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
      exam_id TEXT NOT NULL, status TEXT NOT NULL,
      state TEXT NOT NULL,
      started_at INTEGER NOT NULL, completed_at INTEGER,
      updated_at INTEGER NOT NULL
    )
  `)
  await db.run(`
    CREATE TABLE IF NOT EXISTS test_results (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL UNIQUE REFERENCES test_sessions(id) ON DELETE CASCADE,
      learner_id TEXT NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
      exam_id TEXT NOT NULL,
      overall_band REAL NOT NULL,
      section_bands TEXT NOT NULL,
      sections_included TEXT NOT NULL,
      sections_missing TEXT NOT NULL,
      performance_record TEXT NOT NULL,
      completed_at INTEGER NOT NULL
    )
  `)
}

describe('test-results repository', () => {
  let db: ReturnType<typeof createTestDb>
  let learnerId: string
  const now = 1_000_000

  beforeEach(async () => {
    db = createTestDb()
    await migrateTestDb(db)

    const learner = await createLearner(db, {
      email: 'results@example.com',
      now,
    })
    learnerId = learner.id

    // Create a session so test_results has a valid FK target.
    await createTestSession(db, {
      sessionId: 'sess_for_result',
      learnerId,
      examId: 'ielts_academic',
      state: { id: 'sess_for_result', status: 'completed' },
      now,
    })
  })

  const mockPerformanceRecord = {
    sessionId: 'sess_for_result',
    examId: 'ielts_academic',
    learnerId: 'will-be-set',
    startedAt: 1000,
    completedAt: 5000,
    totalDurationMs: 4000,
    sectionResults: [],
  }

  describe('createTestResult', () => {
    it('creates a result linked to session and learner', async () => {
      const result = await createTestResult(db, {
        sessionId: 'sess_for_result',
        learnerId,
        examId: 'ielts_academic',
        overallBand: 6.5,
        sectionBands: { writing: 6.0, speaking: 7.0 },
        sectionsIncluded: ['writing', 'speaking'],
        sectionsMissing: ['listening', 'reading'],
        performanceRecord: { ...mockPerformanceRecord, learnerId },
        completedAt: now + 3600_000,
      })

      expect(result.overallBand).toBe(6.5)
      expect(result.examId).toBe('ielts_academic')
      expect(result.learnerId).toBe(learnerId)
      expect(typeof result.id).toBe('string')
    })
  })

  describe('findTestResultsByLearner', () => {
    it('returns all results for a learner', async () => {
      await createTestResult(db, {
        sessionId: 'sess_for_result',
        learnerId,
        examId: 'ielts_academic',
        overallBand: 6.5,
        sectionBands: { writing: 6.0 },
        sectionsIncluded: ['writing'],
        sectionsMissing: ['listening', 'reading', 'speaking'],
        performanceRecord: { ...mockPerformanceRecord, learnerId },
        completedAt: now + 3600_000,
      })

      const results = await findTestResultsByLearner(db, learnerId)
      expect(results).toHaveLength(1)
      expect(results[0]!.learnerId).toBe(learnerId)
    })

    it('returns empty array when no results exist', async () => {
      const results = await findTestResultsByLearner(db, 'no-one')
      expect(results).toHaveLength(0)
    })
  })

  describe('findTestResultById', () => {
    it('returns the result when found', async () => {
      const created = await createTestResult(db, {
        sessionId: 'sess_for_result',
        learnerId,
        examId: 'ielts_academic',
        overallBand: 6.5,
        sectionBands: { writing: 6.0 },
        sectionsIncluded: ['writing'],
        sectionsMissing: ['listening', 'reading', 'speaking'],
        performanceRecord: { ...mockPerformanceRecord, learnerId },
        completedAt: now + 3600_000,
      })

      const found = await findTestResultById(db, created.id)
      expect(found).toBeDefined()
      expect(found!.id).toBe(created.id)
    })

    it('returns undefined when not found', async () => {
      const found = await findTestResultById(db, 'nonexistent')
      expect(found).toBeUndefined()
    })
  })
})
