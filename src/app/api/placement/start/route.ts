// POST /api/placement/start
// Start a new placement test. Returns the first item to present.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { createPlacementState, selectNextItem } from '@/placement/adaptive'
import { findActivePlacement, createPlacementResult } from '@/db/repositories/placement'
import { findItemsByLevel } from '@/content/item-bank'
import type { CefrLevel } from '@/skill-graph/types'
import type { PlacementConfig } from '@/placement/types'

// Default placement config — matches the adaptive test defaults.
const DEFAULT_CONFIG: Omit<PlacementConfig, 'startLevel'> = {
  itemsPerLevel: 3,
  correctThreshold: 0.66,
  maxItems: 20,
}

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const now = Date.now()

    // Check no active placement exists — one at a time.
    const existing = await findActivePlacement(db, learnerId)
    if (existing) {
      return jsonError(409, 'A placement test is already in progress')
    }

    // Parse optional start level from body.
    let startLevel: CefrLevel = 'B1'
    try {
      const body = (await request.json()) as Record<string, unknown>
      if (typeof body.startLevel === 'string') {
        startLevel = body.startLevel as CefrLevel
      }
    } catch {
      // Empty body is fine — use defaults.
    }

    // Create the placement state.
    const config: PlacementConfig = { ...DEFAULT_CONFIG, startLevel }
    const state = createPlacementState(config)

    // Fetch items at the start level.
    const items = await findItemsByLevel(db, startLevel, { limit: 20 })
    const firstItem = selectNextItem(state, items)

    if (!firstItem) {
      return jsonError(500, 'No items available for placement at this level')
    }

    // Persist the placement state.
    const row = await createPlacementResult(db, {
      learnerId,
      state: state as unknown as Record<string, unknown>,
      now,
    })

    return jsonOk({
      placementId: row.id,
      item: firstItem,
      level: state.currentLevel,
      progress: { answered: 0, maxItems: config.maxItems },
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[POST /api/placement/start]', error)
    return jsonError(500, 'Internal server error')
  }
}
