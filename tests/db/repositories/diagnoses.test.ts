import { describe, it, expect, beforeEach } from 'vitest'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import {
  createDiagnosis,
  findDiagnosesByLearner,
  findDiagnosisByTestResult,
} from '@/db/repositories/diagnoses'
import { createLearner } from '@/db/repositories/learners'
import { createTestSession } from '@/db/repositories/test-sessions'
import { createTestResult } from '@/db/repositories/test-results'

function createTestDb() {
  const client = createClient({ url: ':memory:' })
  return drizzle(client, { schema })
}

async function migrateTestDb(db: ReturnType<typeof createTestDb>) {
  await db.run(`
    CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE,
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
      exam_id TEXT NOT NULL, overall_band REAL NOT NULL,
      section_bands TEXT NOT NULL, sections_included TEXT NOT NULL,
      sections_missing TEXT NOT NULL, performance_record TEXT NOT NULL,
      completed_at INTEGER NOT NULL
    )
  `)
  await db.run(`
    CREATE TABLE IF NOT EXISTS diagnoses (
      id TEXT PRIMARY KEY,
      test_result_id TEXT NOT NULL UNIQUE REFERENCES test_results(id) ON DELETE CASCADE,
      learner_id TEXT NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
      gap_count INTEGER NOT NULL,
      top_root_cause TEXT,
      total_study_minutes INTEGER NOT NULL,
      diagnosis TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `)
}

describe('diagnoses repository', () => {
  let db: ReturnType<typeof createTestDb>
  let learnerId: string
  let testResultId: string
  const now = 1_000_000

  beforeEach(async () => {
    db = createTestDb()
    await migrateTestDb(db)

    // Set up the full chain: learner → session → result.
    const learner = await createLearner(db, {
      email: 'diag@example.com',
      now,
    })
    learnerId = learner.id

    await createTestSession(db, {
      sessionId: 'sess_diag',
      learnerId,
      examId: 'ielts_academic',
      state: { id: 'sess_diag', status: 'completed' },
      now,
    })

    const result = await createTestResult(db, {
      sessionId: 'sess_diag',
      learnerId,
      examId: 'ielts_academic',
      overallBand: 6.0,
      sectionBands: { writing: 6.0 },
      sectionsIncluded: ['writing'],
      sectionsMissing: ['listening', 'reading', 'speaking'],
      performanceRecord: { sessionId: 'sess_diag', sectionResults: [] },
      completedAt: now + 3600_000,
    })
    testResultId = result.id
  })

  // A minimal Diagnosis-like object for the JSON column.
  const mockDiagnosis = {
    learnerId: 'will-be-set',
    sessionId: 'sess_diag',
    examId: 'ielts_academic',
    createdAt: 1_000_000,
    outcomes: [],
    weakNodes: [],
    gaps: [
      { nodeId: 'gram.b1.pp', rootCause: 'knowledge' },
      { nodeId: 'gram.b2.tc', rootCause: 'knowledge' },
      { nodeId: 'strat.b2.t2', rootCause: 'strategy' },
    ],
    actionPlan: { steps: [], totalEstimatedMinutes: 75, gapCount: 3 },
    bandImpacts: [],
  }

  describe('createDiagnosis', () => {
    it('creates a diagnosis linked to a test result', async () => {
      const diag = await createDiagnosis(db, {
        testResultId,
        learnerId,
        gapCount: 3,
        topRootCause: 'knowledge',
        totalStudyMinutes: 75,
        diagnosis: { ...mockDiagnosis, learnerId },
        now,
      })

      expect(diag.gapCount).toBe(3)
      expect(diag.topRootCause).toBe('knowledge')
      expect(diag.totalStudyMinutes).toBe(75)
      expect(typeof diag.id).toBe('string')
    })

    it('allows null topRootCause when zero gaps', async () => {
      const diag = await createDiagnosis(db, {
        testResultId,
        learnerId,
        gapCount: 0,
        topRootCause: null,
        totalStudyMinutes: 0,
        diagnosis: { ...mockDiagnosis, gaps: [], learnerId },
        now,
      })

      expect(diag.topRootCause).toBeNull()
    })
  })

  describe('findDiagnosesByLearner', () => {
    it('returns all diagnoses for a learner', async () => {
      await createDiagnosis(db, {
        testResultId,
        learnerId,
        gapCount: 3,
        topRootCause: 'knowledge',
        totalStudyMinutes: 75,
        diagnosis: { ...mockDiagnosis, learnerId },
        now,
      })

      const results = await findDiagnosesByLearner(db, learnerId)
      expect(results).toHaveLength(1)
    })

    it('returns empty array when none exist', async () => {
      const results = await findDiagnosesByLearner(db, 'no-one')
      expect(results).toHaveLength(0)
    })
  })

  describe('findDiagnosisByTestResult', () => {
    it('returns the diagnosis for a test result', async () => {
      await createDiagnosis(db, {
        testResultId,
        learnerId,
        gapCount: 3,
        topRootCause: 'knowledge',
        totalStudyMinutes: 75,
        diagnosis: { ...mockDiagnosis, learnerId },
        now,
      })

      const found = await findDiagnosisByTestResult(db, testResultId)
      expect(found).toBeDefined()
      expect(found!.testResultId).toBe(testResultId)
    })

    it('returns undefined when no diagnosis exists', async () => {
      const found = await findDiagnosisByTestResult(db, 'no-result')
      expect(found).toBeUndefined()
    })
  })
})
