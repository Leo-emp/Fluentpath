// # GET /api/test-results
// # Lists all test results for the authenticated learner, newest first.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findTestResultsByLearner } from '@/db/repositories/test-results'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    const results = await findTestResultsByLearner(db, learnerId)

    return jsonOk({
      results: results.map((r) => ({
        id: r.id,
        examId: r.examId,
        overallBand: r.overallBand,
        sectionBands: r.sectionBands,
        completedAt: r.completedAt,
      })),
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/test-results]', error)
    return jsonError(500, 'Internal server error')
  }
}
