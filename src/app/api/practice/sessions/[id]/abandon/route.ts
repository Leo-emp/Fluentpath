import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { getPracticeSession, abandonPracticeSession } from '@/sequencer/session-store'

// POST /api/practice/sessions/[id]/abandon
// Abandon a session (learner quit before finishing). No outcomes recorded.
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const db = getDb()

    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    await abandonPracticeSession(db, id, Date.now())

    return jsonOk({ ok: true })
  } catch (err) {
    console.error('[POST /api/practice/sessions/[id]/abandon]', err)
    return jsonError(500, 'Internal server error')
  }
}
