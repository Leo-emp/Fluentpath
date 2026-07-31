import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getPracticeSession, abandonPracticeSession } from '@/sequencer/session-store'

// POST /api/practice/sessions/[id]/abandon
// Abandon a session (learner quit before finishing). No outcomes recorded.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)

    const { id } = await params
    const db = getDb()

    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    // Ownership check — the caller must own this session.
    if (session.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session.')
    }

    await abandonPracticeSession(db, id, Date.now())

    return jsonOk({ ok: true })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/practice/sessions/[id]/abandon]', err)
    return jsonError(500, 'Internal server error')
  }
}
