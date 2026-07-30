import { eq } from 'drizzle-orm'
import { learners } from '@/db/schema/learners'
import { generateId } from '@/db/id'
import type { Db } from '@/db/client'
import type { SubscriptionStatus, Tier } from '@/db/schema/learners'

// Input for creating a new learner. Only email is required —
// everything else has sensible defaults.
export interface CreateLearnerInput {
  email: string
  name?: string
  l1?: string
  now: number
}

// Paddle payment data attached when upgrading a tier.
export interface PaddleData {
  paddleCustomerId: string
  paddleSubscriptionId: string
  subscriptionStatus: SubscriptionStatus
}

/**
 * Create a new learner profile.
 *
 * Generates a UUID, sets tier to 'free' and subscription to 'none'.
 * Throws if the email already exists (UNIQUE constraint).
 */
export async function createLearner(db: Db, input: CreateLearnerInput) {
  const id = generateId()

  // Insert the new learner row with defaults.
  const [row] = await db
    .insert(learners)
    .values({
      id,
      email: input.email,
      name: input.name ?? null,
      l1: input.l1 ?? null,
      currentLevel: null,
      tier: 'free',
      paddleCustomerId: null,
      paddleSubscriptionId: null,
      subscriptionStatus: 'none',
      createdAt: input.now,
      updatedAt: input.now,
    })
    .returning()

  return row!
}

/**
 * Find a learner by email address.
 *
 * Returns undefined if no learner exists with that email.
 * Used during auth to check if a FluentPath profile already exists.
 */
export async function findLearnerByEmail(db: Db, email: string) {
  const rows = await db
    .select()
    .from(learners)
    .where(eq(learners.email, email))
    .limit(1)

  // Return the first row or undefined.
  return rows[0]
}

/**
 * Find a learner by their UUID.
 *
 * Returns undefined if the ID doesn't exist.
 */
export async function findLearnerById(db: Db, id: string) {
  const rows = await db
    .select()
    .from(learners)
    .where(eq(learners.id, id))
    .limit(1)

  return rows[0]
}

/**
 * Update a learner's subscription tier.
 *
 * Optionally attaches Paddle payment data (customer ID, subscription ID,
 * subscription status) when the upgrade comes from a Paddle webhook.
 */
export async function updateLearnerTier(
  db: Db,
  id: string,
  tier: Tier,
  paddleData?: PaddleData,
) {
  await db
    .update(learners)
    .set({
      tier,
      // Spread Paddle data if provided, otherwise leave untouched.
      ...(paddleData ?? {}),
      updatedAt: Date.now(),
    })
    .where(eq(learners.id, id))
}

/**
 * Update a learner's current CEFR level.
 *
 * Called when a placement test completes to record the result.
 */
export async function updateLearnerLevel(db: Db, id: string, level: string) {
  await db
    .update(learners)
    .set({
      currentLevel: level,
      updatedAt: Date.now(),
    })
    .where(eq(learners.id, id))
}
