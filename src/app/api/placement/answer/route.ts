// POST /api/placement/answer
// Record an answer in the placement test. Returns the next item or
// the final result when placement completes.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError, requireString, requireNumber } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import {
  selectNextItem, recordAnswer, isComplete, getResult,
} from '@/placement/adaptive'
import { populateMastery } from '@/placement/populate'
import {
  findActivePlacement, updatePlacementState, completePlacement,
} from '@/db/repositories/placement'
import { updateLearnerLevel } from '@/db/repositories/learners'
import { findItemsByLevel } from '@/content/item-bank'
import { listNodes } from '@/skill-graph/repository'
import { saveMastery } from '@/mastery/repository'
import type { PlacementState } from '@/placement/types'
import type { SkillArea } from '@/skill-graph/types'

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const now = Date.now()
    const body = (await request.json()) as Record<string, unknown>

    const placementId = requireString(body, 'placementId')
    const itemId = requireString(body, 'itemId')
    const selectedIndex = requireNumber(body, 'selectedIndex')

    // Load the active placement and verify ownership.
    const placement = await findActivePlacement(db, learnerId)
    if (!placement || placement.id !== placementId) {
      return jsonError(404, 'Placement not found or not active')
    }

    const state = placement.state as unknown as PlacementState

    // Find the item to determine correctness and skill area.
    const items = await findItemsByLevel(db, state.currentLevel, { limit: 50 })
    const item = items.find((i) => i.id === itemId)
    if (!item) {
      return jsonError(404, 'Item not found at current level')
    }

    const correct = selectedIndex === item.correctIndex

    // Determine skill area from the item's primary node.
    let skillArea: SkillArea | undefined
    const nodes = await listNodes(db)
    const primaryNodeId = item.nodeIds[0]
    if (primaryNodeId) {
      const node = nodes.find((n) => n.id === primaryNodeId)
      if (node) skillArea = node.skill
    }

    // Record the answer in the placement state.
    const nextState = recordAnswer(state, itemId, correct, now, skillArea)

    // Check if placement is complete.
    if (isComplete(nextState)) {
      const result = getResult(nextState)

      // Populate mastery records for all skill graph nodes.
      const masteryRecords = populateMastery(result, nodes, now)
      if (masteryRecords.length > 0) {
        await saveMastery(db, masteryRecords)
      }

      // Update the learner's current level.
      await updateLearnerLevel(db, learnerId, result.estimatedLevel)

      // Mark placement as completed in DB.
      await completePlacement(
        db, placementId, result.estimatedLevel, result.levelResults,
        result.itemsUsed, nextState as unknown as Record<string, unknown>, now,
      )

      return jsonOk({
        finished: true,
        correct,
        result: {
          estimatedLevel: result.estimatedLevel,
          perSkillLevels: result.perSkillLevels,
          confidence: result.confidence,
        },
        progress: { answered: nextState.itemsAnswered, maxItems: nextState.config.maxItems },
      })
    }

    // Not complete — fetch items at the (possibly new) current level.
    const nextItems = await findItemsByLevel(db, nextState.currentLevel, { limit: 50 })
    const nextItem = selectNextItem(nextState, nextItems)

    // Update state in DB.
    await updatePlacementState(
      db, placementId,
      nextState as unknown as Record<string, unknown>,
      nextState.itemsAnswered,
    )

    return jsonOk({
      finished: false,
      correct,
      item: nextItem,
      level: nextState.currentLevel,
      progress: { answered: nextState.itemsAnswered, maxItems: nextState.config.maxItems },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('[POST /api/placement/answer]', error)
    return jsonError(500, 'Internal server error')
  }
}
