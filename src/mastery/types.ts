/**
 * What the system believes about one learner's grasp of one skill node.
 *
 * There is a row of this per learner per node they have encountered. It is the
 * single source of truth for the sequencer, the level estimate and the
 * diagnosis — everything else is derived from it.
 */
export interface MasteryRecord {
  learnerId: string
  nodeId: string

  /**
   * Estimated ability on this node **as at `lastSeenAt`**, 0..1.
   *
   * This value is not decayed. Reading it directly tells you what the learner
   * knew when last assessed, not what they know now — use `retainedMastery()`
   * for that. Storing the undecayed value means the record never has to be
   * rewritten just because time passed.
   */
  mastery: number

  /**
   * How much evidence supports the estimate, 0..1.
   *
   * Separate from mastery, because "we are fairly sure they don't know this"
   * and "we have barely tested them" are different states that call for
   * different behaviour. Rises with exposures; also slows decay.
   */
  confidence: number

  exposures: number
  correctStreak: number

  /** Epoch milliseconds of the most recent assessed interaction. */
  lastSeenAt: number
}

/**
 * Force a computed value into the 0..1 range.
 *
 * Applied at every write. Probability-like quantities drifting outside their
 * range is the classic way a scoring model quietly corrupts itself, and NaN
 * (from a divide-by-zero upstream) is treated as 0 rather than propagating.
 */
export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0
  return Math.min(1, Math.max(0, value))
}
