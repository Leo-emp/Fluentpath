// GET /api/placement/latest
// Returns the most recent completed placement result, or null.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findLatestCompletedPlacement } from '@/db/repositories/placement'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const placement = await findLatestCompletedPlacement(db, learnerId)
    return jsonOk({ placement: placement ?? null })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/placement/latest]', error)
    return jsonError(500, 'Internal server error')
  }
}
