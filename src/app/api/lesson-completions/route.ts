// # GET /api/lesson-completions — returns all completed lesson IDs for the learner.
// # POST /api/lesson-completions — marks a lesson as completed (idempotent).

import { type NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { lessonCompletions } from '@/db/schema'

// # GET — fetch all completed lesson IDs for the authenticated learner.
export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # Fetch all completion records for this learner.
    const rows = await db
      .select({
        lessonId: lessonCompletions.lessonId,
        completedAt: lessonCompletions.completedAt,
      })
      .from(lessonCompletions)
      .where(eq(lessonCompletions.learnerId, learnerId))

    return jsonOk({ completions: rows })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/lesson-completions]', err)
    return jsonError(500, 'Internal server error')
  }
}

// # POST — mark a lesson as completed. Idempotent — completing the same
// # lesson twice silently succeeds without error.
export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # Parse and validate the request body.
    const body = await request.json()
    const lessonId = body?.lessonId
    if (typeof lessonId !== 'string' || lessonId.length === 0) {
      return jsonError(400, 'lessonId is required')
    }

    // # Upsert — insert if not exists, ignore if already completed.
    await db
      .insert(lessonCompletions)
      .values({
        learnerId,
        lessonId,
        completedAt: Date.now(),
      })
      .onConflictDoNothing()

    return jsonOk({ completed: true, lessonId })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/lesson-completions]', err)
    return jsonError(500, 'Internal server error')
  }
}
