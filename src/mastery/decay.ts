import { clamp01, type MasteryRecord } from './types'

/**
 * Forgetting over time.
 *
 * Knowledge fades. Modelling that explicitly is what makes spaced review fall
 * out of the system for free: the sequencer simply asks "what has dropped
 * below the review threshold?" rather than maintaining a separate schedule of
 * flashcards and due dates.
 *
 * Pure function — `now` is always passed in, never read from the clock, so
 * tests are deterministic and can simulate years passing instantly.
 */

const DAY_MS = 86_400_000

/**
 * Mastery never decays below this.
 *
 * Forgetting is not symmetric with never having learned. Someone who studied
 * the present perfect two years ago and has not touched it since will still
 * recognise it far better than someone meeting it for the first time. Decaying
 * to zero would make the sequencer re-teach known material from scratch, which
 * learners find insulting and which wastes their time.
 */
export const RETENTION_FLOOR = 0.25

/** Half-life for a learner with no supporting evidence yet. */
export const DEFAULT_HALF_LIFE_DAYS = 30

/**
 * How many days until half the remaining mastery is lost.
 *
 * Scales with confidence: something practised once fades in about a month,
 * something drilled twenty times over weeks takes about four. This mirrors
 * the real effect where repeated, spaced retrieval produces durable memory
 * while a single exposure does not.
 *
 * 30 days at confidence 0, rising to 120 days at confidence 1.
 */
export function halfLifeDays(confidence: number): number {
  return DEFAULT_HALF_LIFE_DAYS * (1 + 3 * clamp01(confidence))
}

/**
 * Mastery as at `now`, after decay.
 *
 * Exponential decay toward RETENTION_FLOOR rather than toward zero. The
 * quantity that halves is the *distance above the floor*, so mastery of 1.0
 * with a floor of 0.25 sits at 0.625 after one half-life, not 0.5.
 */
export function retainedMastery(record: MasteryRecord, now: number): number {
  const elapsedMs = now - record.lastSeenAt

  // A clock skew or a replayed event could hand us a time before the record
  // was written. Treat that as "no time has passed" rather than letting the
  // maths run backwards and inflate mastery.
  if (elapsedMs <= 0) return clamp01(record.mastery)

  // Already at or below the floor — there is nothing left to lose.
  if (record.mastery <= RETENTION_FLOOR) return clamp01(record.mastery)

  const days = elapsedMs / DAY_MS
  const decayFactor = Math.pow(0.5, days / halfLifeDays(record.confidence))

  return clamp01(RETENTION_FLOOR + (record.mastery - RETENTION_FLOOR) * decayFactor)
}
