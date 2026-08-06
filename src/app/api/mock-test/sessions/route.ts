// POST /api/mock-test/sessions
// Create a new mock test session for the authenticated learner.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError, requireString } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getExamDefinition } from '@/mock-test/exams/registry'
import { createSession } from '@/mock-test/session'
import { createTestSession, findActiveSession } from '@/db/repositories/test-sessions'
import { generateId } from '@/db/id'

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>
    const examId = requireString(body, 'examId')
    const now = Date.now()

    // Look up the exam definition.
    const exam = getExamDefinition(examId)
    if (!exam) return jsonError(404, 'Exam not found')

    // Check no active session exists for this learner.
    const existing = await findActiveSession(db, learnerId)
    if (existing) {
      return jsonError(409, 'A test session is already in progress')
    }

    // Create the engine session state.
    const sessionId = generateId()
    const session = createSession(exam, learnerId, sessionId, now)

    // Persist to DB.
    await createTestSession(db, {
      sessionId,
      learnerId,
      examId,
      state: session as unknown as Record<string, unknown>,
      now,
    })

    return jsonOk({
      sessionId,
      examName: exam.name,
      sections: exam.sections.map((s) => ({
        id: s.id, name: s.name, skill: s.skill,
        durationMinutes: s.durationMinutes,
      })),
    }, 201)
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('[POST /api/mock-test/sessions]', error)
    return jsonError(500, 'Internal server error')
  }
}
