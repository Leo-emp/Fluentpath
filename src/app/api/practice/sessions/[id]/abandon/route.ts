import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, requireString } from '@/app/api/_lib/validate'
import { getPracticeSession, abandonPracticeSession } from '@/sequencer/session-store'

// POST /api/practice/sessions/[id]/abandon
// Abandon a session (learner quit before finishing). No outcomes recorded.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    const learnerId = requireString(body, 'learnerId')

    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    // Ownership check — the caller must own this session.
    if (session.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session.')
    }

    await abandonPracticeSession(db, id, Date.now())

    return jsonOk({ ok: true })
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/sessions/[id]/abandon]', err)
    return jsonError(500, 'Internal server error')
  }
}
