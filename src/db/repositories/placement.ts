import { eq, and, desc } from 'drizzle-orm'
import { placementResults } from '@/db/schema/placement-results'
import { generateId } from '@/db/id'
import type { Db } from '@/db/client'

// Input for creating a new placement test. Only the learner ID
// and initial state are needed — everything else starts empty.
export interface CreatePlacementInput {
  learnerId: string
  state: Record<string, unknown>
  now: number
}

/**
 * Create a new placement test record.
 *
 * Starts in 'in_progress' status with no estimated level.
 * The full PlacementState is stored as JSON for instant resume.
 */
export async function createPlacementResult(db: Db, input: CreatePlacementInput) {
  const id = generateId()

  const [row] = await db
    .insert(placementResults)
    .values({
      id,
      learnerId: input.learnerId,
      estimatedLevel: null,
      levelResults: null,
      itemsUsed: 0,
      state: input.state,
      status: 'in_progress',
      startedAt: input.now,
      completedAt: null,
    })
    .returning()

  return row!
}

/**
 * Find the active (in_progress) placement test for a learner.
 *
 * Returns undefined if the learner has no active placement.
 * A learner should have at most one active placement at a time
 * (enforced by the app, not the schema — a learner can retake
 * the placement test, but only one can be in progress).
 */
export async function findActivePlacement(db: Db, learnerId: string) {
  const rows = await db
    .select()
    .from(placementResults)
    .where(
      and(
        eq(placementResults.learnerId, learnerId),
        eq(placementResults.status, 'in_progress'),
      ),
    )
    .limit(1)

  return rows[0]
}

/**
 * Update the placement state (called on every item answer).
 *
 * Writes the full PlacementState object and the item count.
 * This is the hot write path during placement.
 */
export async function updatePlacementState(
  db: Db,
  id: string,
  state: Record<string, unknown>,
  itemsUsed: number,
) {
  await db
    .update(placementResults)
    .set({
      state,
      itemsUsed,
    })
    .where(eq(placementResults.id, id))
}

/**
 * Mark a placement test as completed.
 *
 * Stores the final estimated level, per-level results, and
 * completion timestamp. After this, the placement no longer
 * appears as "active".
 */
/**
 * Find the most recently completed placement test for a learner.
 *
 * Returns undefined if no completed placement exists (new user
 * or never finished a placement test).
 */
export async function findLatestCompletedPlacement(db: Db, learnerId: string) {
  const rows = await db
    .select()
    .from(placementResults)
    .where(
      and(
        eq(placementResults.learnerId, learnerId),
        eq(placementResults.status, 'completed'),
      ),
    )
    .orderBy(desc(placementResults.completedAt))
    .limit(1)

  return rows[0]
}

export async function completePlacement(
  db: Db,
  id: string,
  estimatedLevel: string,
  levelResults: Record<string, { correct: number; total: number }>,
  itemsUsed: number,
  finalState: Record<string, unknown>,
  now: number,
) {
  await db
    .update(placementResults)
    .set({
      status: 'completed',
      estimatedLevel,
      levelResults,
      itemsUsed,
      state: finalState,
      completedAt: now,
    })
    .where(eq(placementResults.id, id))
}
