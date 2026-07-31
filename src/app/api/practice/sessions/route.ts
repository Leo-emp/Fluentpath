import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError, optionalObject } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { createPracticeSession, findActivePracticeSession } from '@/sequencer/session-store'

// POST /api/practice/sessions
// Create a practice session from an assembled plan.
export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)

    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    // The plan is required — it comes from the /assemble response.
    const plan = optionalObject(body, 'plan')
    if (!plan) {
      return jsonError(400, '"plan" is required and must be an object.')
    }

    const sessionId = await createPracticeSession(db, learnerId, plan, Date.now())

    return jsonOk({ sessionId }, 201)
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/sessions]', err)
    return jsonError(500, 'Internal server error')
  }
}

// GET /api/practice/sessions
// Find the learner's active (in_progress) practice session.
export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    const session = await findActivePracticeSession(db, learnerId)
    return jsonOk({ session: session ?? null })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/practice/sessions]', err)
    return jsonError(500, 'Internal server error')
  }
}
