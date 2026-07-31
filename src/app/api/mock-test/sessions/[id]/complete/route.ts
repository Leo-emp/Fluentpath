// POST /api/mock-test/sessions/[id]/complete
// Complete a mock test session and compute band scores.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getExamDefinition } from '@/mock-test/exams/ielts-academic'
import { computeTestResult } from '@/mock-test/convert'
import { assemblePerformanceRecord } from '@/mock-test/record'
import {
  findActiveSession, completeSession,
} from '@/db/repositories/test-sessions'
import { createTestResult } from '@/db/repositories/test-results'
import type { TestSession } from '@/mock-test/types'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()
    const now = Date.now()

    // Load session.
    const row = await findActiveSession(db, learnerId)
    if (!row || row.id !== id) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) return jsonError(403, 'You do not own this session')

    const session = row.state as unknown as TestSession
    const exam = getExamDefinition(row.examId)
    if (!exam) return jsonError(500, 'Exam definition not found')

    // Compute band scores.
    const perfRecord = assemblePerformanceRecord(session, exam, {})
    const testResult = computeTestResult(perfRecord, exam)

    // Persist the test result.
    const resultRow = await createTestResult(db, {
      sessionId: id,
      learnerId,
      examId: row.examId,
      overallBand: testResult.overallBand,
      sectionBands: testResult.sectionBands,
      sectionsIncluded: testResult.sectionsIncluded,
      sectionsMissing: testResult.sectionsMissing,
      performanceRecord: testResult as unknown as Record<string, unknown>,
      completedAt: now,
    })

    // Mark session as completed.
    await completeSession(db, id, session as unknown as Record<string, unknown>, now)

    return jsonOk({
      testResultId: resultRow.id,
      bandScores: {
        overall: testResult.overallBand,
        ...testResult.sectionBands,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[POST /api/mock-test/sessions/[id]/complete]', error)
    return jsonError(500, 'Internal server error')
  }
}
