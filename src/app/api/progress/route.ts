// # GET /api/progress
// # Returns the learner's skill breakdown and predicted IELTS score.
// # Aggregates mastery data + skill graph to compute per-skill bands.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { listMastery } from '@/mastery/repository'
import { listNodes } from '@/skill-graph/repository'
import { predictScore } from '@/prediction/score'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # Fetch mastery records and skill graph nodes in parallel.
    const [masteryRecords, graphNodes] = await Promise.all([
      listMastery(db, learnerId),
      listNodes(db),
    ])

    // # Compute predicted score.
    const prediction = predictScore(
      masteryRecords.map(r => ({
        nodeId: r.nodeId,
        mastery: r.mastery,
        confidence: r.confidence,
        exposures: r.exposures,
      })),
      graphNodes.map(n => ({ id: n.id, skill: n.skill })),
    )

    return jsonOk({ prediction })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/progress]', err)
    return jsonError(500, 'Internal server error')
  }
}
