// # Plan gating — checks if a learner's subscription tier allows access to a feature.
// # Used by API routes alongside getAuthenticatedLearner() to enforce paid features.
// # Free tier: placement + 1 mock test + 10 practice items/day.
// # Exam tier: unlimited practice + all mock tests + diagnosis.
// # Complete tier: everything + OET + TTS pronunciation.

import { eq } from 'drizzle-orm'
import { getDb } from './db'
import { learners } from '@/db/schema/learners'
import type { Tier } from '@/db/schema/learners'

// # Features and the minimum tier required to access them.
const FEATURE_TIERS: Record<string, Tier[]> = {
  // # Available to all tiers (including free).
  placement: ['free', 'exam', 'complete'],
  // # Practice is available to all but limited to 10 items/day for free.
  practice: ['free', 'exam', 'complete'],
  // # Mock tests: free gets 1, paid gets unlimited.
  'mock-test': ['free', 'exam', 'complete'],
  // # Diagnosis requires exam or complete tier.
  diagnosis: ['exam', 'complete'],
  // # TTS pronunciation requires complete tier.
  tts: ['complete'],
}

export interface PlanCheckResult {
  allowed: boolean
  tier: Tier
  reason?: string
}

// # Check if a learner can access a feature.
export async function checkPlanAccess(
  learnerId: string,
  feature: string,
): Promise<PlanCheckResult> {
  const db = getDb()

  const result = await db
    .select({ tier: learners.tier, subscriptionStatus: learners.subscriptionStatus })
    .from(learners)
    .where(eq(learners.id, learnerId))
    .limit(1)

  const learner = result[0]
  if (!learner) {
    return { allowed: false, tier: 'free', reason: 'Learner not found' }
  }

  const tier = learner.tier as Tier

  // # If subscription is past_due, treat as free tier.
  const effectiveTier: Tier =
    learner.subscriptionStatus === 'past_due' ? 'free' : tier

  const allowedTiers = FEATURE_TIERS[feature]
  if (!allowedTiers) {
    // # Unknown feature — deny by default.
    return { allowed: false, tier: effectiveTier, reason: 'Unknown feature' }
  }

  if (!allowedTiers.includes(effectiveTier)) {
    return {
      allowed: false,
      tier: effectiveTier,
      reason: `Upgrade to access ${feature}`,
    }
  }

  return { allowed: true, tier: effectiveTier }
}
