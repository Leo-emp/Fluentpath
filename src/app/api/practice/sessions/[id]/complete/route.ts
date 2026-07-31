import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, requireString, requireArray } from '@/app/api/_lib/validate'
import { getPracticeSession, completePracticeSession } from '@/sequencer/session-store'
import { recordOutcomes, type AssessedOutcome } from '@/mastery/service'

// POST /api/practice/sessions/[id]/complete
// Complete a session and record mastery outcomes. This is the "session end
// write" — outcomes are batched here, not written per item.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    // Verify the session exists and is still in progress.
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')
    if (session.status !== 'in_progress') {
      return jsonError(400, `Session is already "${session.status}".`)
    }

    const learnerId = requireString(body, 'learnerId')
    const rawOutcomes = requireArray(body, 'outcomes')

    // Cast the raw outcomes — recordOutcomes validates nodeIds exist.
    const outcomes = rawOutcomes as AssessedOutcome[]

    // Mark the session as completed, then write mastery.
    const now = Date.now()
    await completePracticeSession(db, id, now)
    const mastery = await recordOutcomes(db, learnerId, outcomes, now)

    return jsonOk({ mastery })
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/sessions/[id]/complete]', err)
    return jsonError(500, 'Internal server error')
  }
}
