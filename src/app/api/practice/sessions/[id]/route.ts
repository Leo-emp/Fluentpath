import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, requireNumber } from '@/app/api/_lib/validate'
import { getPracticeSession, updateProgress } from '@/sequencer/session-store'

// GET /api/practice/sessions/[id]
// Fetch a specific practice session by ID.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const db = getDb()

    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    return jsonOk({ session })
  } catch (err) {
    console.error('[GET /api/practice/sessions/[id]]', err)
    return jsonError(500, 'Internal server error')
  }
}

// PATCH /api/practice/sessions/[id]
// Update the progress counter.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    // Verify the session exists before updating.
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')

    const progress = requireNumber(body, 'progress')
    await updateProgress(db, id, progress, Date.now())

    return jsonOk({ ok: true })
  } catch (err) {
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[PATCH /api/practice/sessions/[id]]', err)
    return jsonError(500, 'Internal server error')
  }
}
