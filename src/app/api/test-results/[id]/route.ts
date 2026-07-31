// GET /api/test-results/[id]
// Returns a test result by ID with ownership check.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findTestResultById } from '@/db/repositories/test-results'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    const result = await findTestResultById(db, id)
    if (!result) return jsonError(404, 'Test result not found')
    if (result.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this test result')
    }

    return jsonOk({ result })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/test-results/[id]]', error)
    return jsonError(500, 'Internal server error')
  }
}
