// POST /api/mock-test/sessions/[id]/answer
// Submit an answer for a slot in a mock test session.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError, requireString, requireNumber } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { transition } from '@/mock-test/session'
import { getExamDefinition } from '@/mock-test/exams/ielts-academic'
import { findActiveSession, updateSessionState } from '@/db/repositories/test-sessions'
import type { TestSession, ResponseData, SectionSkill } from '@/mock-test/types'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>
    const now = Date.now()

    // The client provides the slotId + skill-specific response data.
    const slotId = requireString(body, 'slotId')
    const skill = requireString(body, 'skill') as SectionSkill

    // Load session and verify ownership.
    const row = await findActiveSession(db, learnerId)
    if (!row || row.id !== id) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) return jsonError(403, 'You do not own this session')

    const session = row.state as unknown as TestSession
    const exam = getExamDefinition(row.examId)
    if (!exam) return jsonError(500, 'Exam definition not found')

    // Build the ResponseData based on the skill type.
    let responseData: ResponseData
    if (skill === 'reading' || skill === 'listening') {
      const selectedIndex = requireNumber(body, 'selectedIndex')
      responseData = { skill, selectedIndex }
    } else if (skill === 'writing') {
      const text = requireString(body, 'text')
      const wordCount = typeof body.wordCount === 'number' ? body.wordCount : text.split(/\s+/).length
      responseData = { skill: 'writing', text, wordCount }
    } else if (skill === 'speaking') {
      const audioRef = requireString(body, 'audioRef')
      responseData = { skill: 'speaking', audioRef, sttResult: null }
    } else {
      return jsonError(400, `Unknown skill: ${skill}`)
    }

    // Record the response via the engine's transition function.
    const nextSession = transition(
      session,
      { type: 'respond', slotId, responseData },
      exam,
      now,
    )

    // Persist updated state.
    await updateSessionState(db, id, nextSession as unknown as Record<string, unknown>, now)

    // Determine progress from the active section.
    const activeSectionState = nextSession.sectionStates[nextSession.activeSectionIndex]
    const testComplete = nextSession.status === 'completed'
    const sectionComplete = activeSectionState?.status === 'completed'

    return jsonOk({
      sectionComplete,
      testComplete,
      progress: {
        activeSectionIndex: nextSession.activeSectionIndex,
        currentSlotIndex: activeSectionState?.currentSlotIndex ?? 0,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('[POST /api/mock-test/sessions/[id]/answer]', error)
    return jsonError(500, 'Internal server error')
  }
}
