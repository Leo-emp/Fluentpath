/**
 * Placement test type definitions.
 *
 * The placement test is NOT a mock test — it's an adaptive algorithm
 * that quickly determines a learner's CEFR level by selecting items
 * from the skill graph and adjusting difficulty based on responses.
 *
 * The algorithm:
 *   1. Start at a target level (B1 is the median for IELTS candidates)
 *   2. Present items at that level
 *   3. If the pass rate meets the threshold, move up; otherwise move down
 *   4. Stop when the level is bracketed (passed one, failed the next),
 *      maxItems is reached, or there's nowhere to go (top/bottom)
 *   5. Populate initial mastery records for all skill graph nodes
 *
 * SERIALIZATION: all state uses plain arrays, not Sets, so it
 * JSON round-trips cleanly. This is critical for interruption safety —
 * the placement can be persisted and resumed at any point.
 */

import type { CefrLevel } from '@/skill-graph/types'

/**
 * Configuration for the placement test.
 */
export interface PlacementConfig {
  // Which level to start testing at.
  startLevel: CefrLevel
  // How many items to present at each level before deciding.
  itemsPerLevel: number
  // Proportion correct needed to "pass" a level and move up (0..1).
  correctThreshold: number
  // Maximum total items across all levels (safety cap).
  maxItems: number
}

/**
 * Per-level tracking during the placement test.
 */
export interface LevelResult {
  correct: number
  total: number
}

/**
 * State of a placement test in progress.
 *
 * Fully serializable (JSON round-trip) for interruption safety.
 * Uses arrays instead of Sets so JSON.parse(JSON.stringify(state))
 * produces an identical object.
 */
export interface PlacementState {
  config: PlacementConfig
  currentLevel: CefrLevel
  itemsAnswered: number
  // Results per level tested.
  levelResults: Record<string, LevelResult>
  // IDs of items already answered (prevents re-selection).
  // Array instead of Set for JSON serialization.
  answeredItemIds: string[]
  // Whether the test has terminated.
  finished: boolean
  // Direction of movement: 'up' if last level was passed, 'down' if
  // failed, null if no level has been completed yet.
  direction: 'up' | 'down' | null
  // Levels that have been fully tested (itemsPerLevel items answered).
  // Array instead of Set for JSON serialization.
  completedLevels: string[]
}

/**
 * The output of a completed placement test.
 */
export interface PlacementResult {
  // The highest level the learner passed.
  estimatedLevel: CefrLevel
  // Per-level pass rates (for confidence and mastery population).
  levelResults: Record<string, LevelResult>
  // Total items used.
  itemsUsed: number
  // Which items were answered (for deduplication if retested).
  answeredItemIds: string[]
}
