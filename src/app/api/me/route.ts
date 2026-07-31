// GET /api/me
// Returns the authenticated learner's profile.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findLearnerById } from '@/db/repositories/learners'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    const learner = await findLearnerById(db, learnerId)
    if (!learner) return jsonError(404, 'Learner not found')

    return jsonOk({
      learner: {
        id: learner.id,
        email: learner.email,
        name: learner.name,
        currentLevel: learner.currentLevel,
        createdAt: learner.createdAt,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/me]', error)
    return jsonError(500, 'Internal server error')
  }
}
