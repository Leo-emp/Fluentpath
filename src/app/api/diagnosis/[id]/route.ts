// GET /api/diagnosis/[id]
// Fetch a full diagnosis report by ID.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findDiagnosisById } from '@/db/repositories/diagnoses'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    const row = await findDiagnosisById(db, id)
    if (!row) return jsonError(404, 'Diagnosis not found')

    // Ownership check.
    if (row.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this diagnosis')
    }

    return jsonOk({ diagnosis: row })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/diagnosis/[id]]', error)
    return jsonError(500, 'Internal server error')
  }
}
