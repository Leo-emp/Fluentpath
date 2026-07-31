// GET /api/placement/active
// Returns the learner's active (in-progress) placement, or null.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findActivePlacement } from '@/db/repositories/placement'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const placement = await findActivePlacement(db, learnerId)
    return jsonOk({ placement: placement ?? null })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/placement/active]', error)
    return jsonError(500, 'Internal server error')
  }
}
