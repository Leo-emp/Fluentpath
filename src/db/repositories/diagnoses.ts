import { eq, desc } from 'drizzle-orm'
import { diagnoses } from '@/db/schema/diagnoses'
import { generateId } from '@/db/id'
import type { Db } from '@/db/client'

// Input for creating a diagnosis record. The full Diagnosis object
// from the engine is stored as JSON, plus extracted summary columns.
export interface CreateDiagnosisInput {
  testResultId: string
  learnerId: string
  gapCount: number
  topRootCause: string | null
  totalStudyMinutes: number
  diagnosis: Record<string, unknown>
  now: number
}

/**
 * Create a diagnosis record for a test result.
 *
 * Generates a new UUID. The Diagnosis is immutable — once created,
 * it never changes. The full object is stored as JSON alongside
 * extracted summary columns for list views.
 */
export async function createDiagnosis(db: Db, input: CreateDiagnosisInput) {
  const id = generateId()

  const [row] = await db
    .insert(diagnoses)
    .values({
      id,
      testResultId: input.testResultId,
      learnerId: input.learnerId,
      gapCount: input.gapCount,
      topRootCause: input.topRootCause,
      totalStudyMinutes: input.totalStudyMinutes,
      diagnosis: input.diagnosis,
      createdAt: input.now,
    })
    .returning()

  return row!
}

/**
 * Find all diagnoses for a learner, newest first.
 *
 * Used for the "My Diagnoses" list view. Returns summary columns
 * without parsing the full JSON blob.
 */
export async function findDiagnosesByLearner(db: Db, learnerId: string) {
  return db
    .select()
    .from(diagnoses)
    .where(eq(diagnoses.learnerId, learnerId))
    .orderBy(desc(diagnoses.createdAt))
}

/**
 * Find the diagnosis for a specific test result.
 *
 * Returns undefined if no diagnosis exists for that result yet.
 * Used to check whether the paywall has been passed for a given result.
 */
// Find a diagnosis by its primary key.
export async function findDiagnosisById(db: Db, id: string) {
  const rows = await db
    .select()
    .from(diagnoses)
    .where(eq(diagnoses.id, id))
    .limit(1)

  return rows[0]
}

export async function findDiagnosisByTestResult(db: Db, testResultId: string) {
  const rows = await db
    .select()
    .from(diagnoses)
    .where(eq(diagnoses.testResultId, testResultId))
    .limit(1)

  return rows[0]
}
