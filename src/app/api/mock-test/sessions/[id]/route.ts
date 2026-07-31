// GET /api/mock-test/sessions/[id]
// Fetch current session state. Answer keys are stripped — the client
// sees stems and options only, never correctIndex or misconception data.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findTestSessionById } from '@/db/repositories/test-sessions'

// Recursively strip answer keys from any object. Removes correctIndex
// and misconception fields so the client cannot cheat.
function stripAnswerKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(stripAnswerKeys)
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (key === 'correctIndex' || key === 'misconception') continue
      result[key] = stripAnswerKeys(value)
    }
    return result
  }
  return obj
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    const session = await findTestSessionById(db, id)
    if (!session) return jsonError(404, 'Session not found')

    // Ownership check.
    if (session.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session')
    }

    // Strip answer keys before sending to client.
    const sanitised = stripAnswerKeys(session)

    return jsonOk({ session: sanitised })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/mock-test/sessions/[id]]', error)
    return jsonError(500, 'Internal server error')
  }
}
