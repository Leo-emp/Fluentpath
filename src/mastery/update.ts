import { retainedMastery } from './decay'
import { clamp01, type MasteryRecord } from './types'

/**
 * Folding one assessed outcome into a learner's mastery estimate.
 *
 * The model is deliberately simple and explainable rather than statistically
 * elaborate. Every number a learner sees has to be defensible, and a model
 * whose behaviour cannot be described in a sentence produces diagnoses nobody
 * trusts.
 */

/** How far the estimate moves on a learner's very first observation. */
const BASE_LEARNING_RATE = 0.4

/**
 * How much a confident estimate resists movement.
 *
 * At confidence 1 the learning rate drops to a quarter of the base, so a
 * single unlucky answer cannot undo twenty consistent ones — but it is never
 * zero, so genuine decline is still detectable.
 */
const CONFIDENCE_DAMPING = 0.75

/** Exposures needed for confidence to reach roughly 63%. */
const CONFIDENCE_SCALE = 8

/**
 * What one outcome suggests about the learner's true ability, 0..1.
 *
 * Difficulty carries information in both directions:
 *
 *   correct on a hard item  → strong evidence of ability      (1.0)
 *   correct on an easy item → weak evidence of ability        (0.6)
 *   wrong on a hard item    → little evidence against         (0.4)
 *   wrong on an easy item   → strong evidence against         (0.0)
 *
 * Partial credit interpolates between the correct and wrong cases.
 */
function evidenceFrom(outcome: number, difficulty: number): number {
  const ifCorrect = 0.6 + 0.4 * difficulty
  const ifWrong = 0.4 * difficulty
  return outcome * ifCorrect + (1 - outcome) * ifWrong
}

/**
 * Update a mastery record with one assessed outcome.
 *
 * @param outcome    0 (wrong) .. 1 (fully correct); partial credit allowed
 * @param difficulty 0 (trivial) .. 1 (very hard)
 * @param now        epoch milliseconds of the observation
 */
export function updateMastery(
  record: MasteryRecord,
  outcome: number,
  difficulty: number,
  now: number,
): MasteryRecord {
  // Start from what the learner has actually retained, not from what they
  // knew when last assessed. Someone returning after three months is measured
  // against their faded ability, which is the honest baseline.
  const current = retainedMastery(record, now)

  const safeOutcome = clamp01(outcome)
  const safeDifficulty = clamp01(difficulty)
  const evidence = evidenceFrom(safeOutcome, safeDifficulty)

  // Confident estimates move less. Early observations are informative; the
  // fiftieth adds little, so it should not swing the estimate.
  const learningRate = BASE_LEARNING_RATE * (1 - CONFIDENCE_DAMPING * clamp01(record.confidence))

  // Move a fraction of the way toward what this outcome implies. Because the
  // step is always proportional to the remaining distance, mastery approaches
  // its target asymptotically and can never overshoot 0 or 1.
  const nextMastery = clamp01(current + learningRate * (evidence - current))

  const nextExposures = record.exposures + 1

  // Saturating curve: fast early, flattening off. Roughly 0.63 at eight
  // exposures, 0.86 at sixteen, approaching but never reaching 1.
  const nextConfidence = clamp01(1 - Math.exp(-nextExposures / CONFIDENCE_SCALE))

  return {
    ...record,
    mastery: nextMastery,
    confidence: nextConfidence,
    exposures: nextExposures,
    // Half credit or better counts as a success for streak purposes.
    correctStreak: safeOutcome >= 0.5 ? record.correctStreak + 1 : 0,
    lastSeenAt: now,
  }
}
