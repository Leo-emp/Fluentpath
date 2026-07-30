import { eq, desc } from 'drizzle-orm'
import { testResults } from '@/db/schema/test-results'
import { generateId } from '@/db/id'
import type { Db } from '@/db/client'

// Input for creating a test result. All fields from the TestResult
// interface are passed in — the repository just persists them.
export interface CreateTestResultInput {
  sessionId: string
  learnerId: string
  examId: string
  overallBand: number
  sectionBands: Record<string, number>
  sectionsIncluded: string[]
  sectionsMissing: string[]
  performanceRecord: Record<string, unknown>
  completedAt: number
}

/**
 * Create a test result from a completed test session.
 *
 * Generates a new UUID for the result. Stores queryable columns
 * (overallBand, examId) plus the full PerformanceRecord as JSON
 * for diagnosis re-runs.
 */
export async function createTestResult(db: Db, input: CreateTestResultInput) {
  const id = generateId()

  const [row] = await db
    .insert(testResults)
    .values({
      id,
      sessionId: input.sessionId,
      learnerId: input.learnerId,
      examId: input.examId,
      overallBand: input.overallBand,
      sectionBands: input.sectionBands,
      sectionsIncluded: input.sectionsIncluded,
      sectionsMissing: input.sectionsMissing,
      performanceRecord: input.performanceRecord,
      completedAt: input.completedAt,
    })
    .returning()

  return row!
}

/**
 * Find all test results for a learner, newest first.
 *
 * This is the "My Results" page query. Ordered by completion date
 * descending so the most recent result is first.
 */
export async function findTestResultsByLearner(db: Db, learnerId: string) {
  return db
    .select()
    .from(testResults)
    .where(eq(testResults.learnerId, learnerId))
    .orderBy(desc(testResults.completedAt))
}

/**
 * Find a test result by its ID.
 *
 * Returns undefined if the ID doesn't exist.
 * Used for the detail view and as input to the diagnosis engine.
 */
export async function findTestResultById(db: Db, id: string) {
  const rows = await db
    .select()
    .from(testResults)
    .where(eq(testResults.id, id))
    .limit(1)

  return rows[0]
}
