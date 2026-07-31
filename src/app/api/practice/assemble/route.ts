import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError, optionalNumber, optionalArray, optionalObject } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { assembleSession } from '@/sequencer/assemble'
import type { ActionPlan } from '@/diagnosis/types'

// POST /api/practice/assemble
// Assemble a practice session plan (node selection + item fetching).
// Does NOT persist — the client reviews the plan and then calls
// POST /api/practice/sessions to create the session.
export async function POST(request: NextRequest) {
  try {
    // Auth: get learnerId from session (not from body).
    const { learnerId } = await getAuthenticatedLearner(request)

    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    const maxItems = optionalNumber(body, 'maxItems')
    const maxNodes = optionalNumber(body, 'maxNodes')
    const excludeItemIds = optionalArray(body, 'excludeItemIds') as string[] | undefined
    const actionPlan = optionalObject(body, 'actionPlan') as ActionPlan | undefined

    const plan = await assembleSession(db, learnerId, {
      now: Date.now(),
      maxItems,
      maxNodes,
      excludeItemIds,
      actionPlan,
    })

    return jsonOk(plan)
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/assemble]', err)
    return jsonError(500, 'Internal server error')
  }
}
