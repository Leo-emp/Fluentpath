// POST /api/mock-test/sessions/[id]/abandon
// Abandon a mock test session.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findActiveSession, abandonSession } from '@/db/repositories/test-sessions'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    // Load session and verify ownership.
    const row = await findActiveSession(db, learnerId)
    if (!row || row.id !== id) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session')
    }

    await abandonSession(db, id, Date.now())
    return jsonOk({ ok: true })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[POST /api/mock-test/sessions/[id]/abandon]', error)
    return jsonError(500, 'Internal server error')
  }
}
