// # POST /api/mock-test/sessions/[id]/start
// # Transition session from not_started to in_progress.
// # This activates the first section and starts the timer.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { transition } from '@/mock-test/session'
import { getExamDefinition } from '@/mock-test/exams/registry'
import { findTestSessionById, updateSessionState } from '@/db/repositories/test-sessions'
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

    const row = await findTestSessionById(db, id)
    if (!row) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) return jsonError(403, 'You do not own this session')

    const session = row.state as unknown as TestSession
    const exam = getExamDefinition(row.examId)
    if (!exam) return jsonError(500, 'Exam definition not found')

    // # Transition to in_progress — activates section 0.
    const nextSession = transition(session, { type: 'start' }, exam, now)
    await updateSessionState(db, id, nextSession as unknown as Record<string, unknown>, now)

    return jsonOk({
      status: nextSession.status,
      activeSectionIndex: nextSession.activeSectionIndex,
      sectionStates: nextSession.sectionStates,
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[POST /api/mock-test/sessions/[id]/start]', error)
    return jsonError(500, 'Internal server error')
  }
}
