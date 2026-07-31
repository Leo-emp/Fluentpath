/**
 * Adaptive placement test algorithm.
 *
 * Uses a simple staircase method: test at a level, decide pass/fail,
 * move up or down. Stop when the level is bracketed.
 *
 * This is intentionally simpler than a full CAT (computerized adaptive
 * test) — the skill graph provides per-node precision later. The
 * placement test only needs to estimate the overall starting level
 * quickly enough that the learner isn't bored or overwhelmed.
 *
 * All state uses plain arrays (not Sets) so it JSON round-trips cleanly
 * for interruption safety.
 */

import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { McqItem } from '@/items/types'
import type { PlacementConfig, PlacementState, PlacementResult, LevelResult } from './types'

// preA1 is excluded from placement — it's the fallback when
// everything fails, not a testable level.
const TESTABLE_LEVELS = CEFR_LEVELS.filter((l) => l !== 'preA1') as CefrLevel[]

/**
 * Create the initial state for a placement test.
 */
export function createPlacementState(config: PlacementConfig): PlacementState {
  return {
    config,
    currentLevel: config.startLevel,
    itemsAnswered: 0,
    levelResults: {},
    // Arrays instead of Sets — serialization-safe by construction.
    answeredItemIds: [],
    finished: false,
    direction: null,
    completedLevels: [],
  }
}

/**
 * Select the next item to present from the pool.
 *
 * Picks an unanswered item at the current level. Returns null if no
 * items are available (pool exhausted for this level).
 */
export function selectNextItem(
  state: PlacementState,
  items: McqItem[],
): McqItem | null {
  // Filter to items at the current level that haven't been answered.
  const available = items.filter(
    (item) =>
      item.level === state.currentLevel &&
      !state.answeredItemIds.includes(item.id),
  )
  if (available.length === 0) return null

  // Pick the first available item. In production, this would use a
  // more sophisticated selection (e.g. maximise information gain),
  // but for placement speed the order doesn't matter much.
  return available[0]!
}

/**
 * Record an answer and potentially advance the algorithm.
 *
 * After recording, checks whether enough items have been answered at
 * the current level to make a decision. If so, advances the level
 * up or down and checks for completion.
 */
export function recordAnswer(
  state: PlacementState,
  itemId: string,
  correct: boolean,
  _now: number,
): PlacementState {
  const level = state.currentLevel

  // Update per-level results.
  const existing: LevelResult = state.levelResults[level] ?? { correct: 0, total: 0 }
  const levelResults = {
    ...state.levelResults,
    [level]: {
      correct: existing.correct + (correct ? 1 : 0),
      total: existing.total + 1,
    },
  }

  // Track which items have been answered (array, not Set).
  const answeredItemIds = [...state.answeredItemIds, itemId]
  const itemsAnswered = state.itemsAnswered + 1

  let nextState: PlacementState = {
    ...state,
    levelResults,
    answeredItemIds,
    itemsAnswered,
  }

  // Check if we've answered enough items at this level to decide.
  const levelResult = levelResults[level]!
  if (levelResult.total >= state.config.itemsPerLevel) {
    nextState = advanceLevel(nextState, level, levelResult)
  }

  // Check global completion conditions.
  if (itemsAnswered >= state.config.maxItems) {
    nextState = { ...nextState, finished: true }
  }

  return nextState
}

/**
 * Advance to the next level after completing the current one.
 *
 * If the learner passed (met the threshold), move up.
 * If they failed, move down.
 * If the level is bracketed (passed one, failed the adjacent), finish.
 */
function advanceLevel(
  state: PlacementState,
  level: CefrLevel,
  result: LevelResult,
): PlacementState {
  const passed = result.correct / result.total >= state.config.correctThreshold

  // Track completed levels (array, not Set).
  const completedLevels = state.completedLevels.includes(level)
    ? state.completedLevels
    : [...state.completedLevels, level]

  const currentIndex = TESTABLE_LEVELS.indexOf(level)
  const previousDirection = state.direction
  const newDirection = passed ? 'up' : 'down'

  // Bracketing: if we were going up and now fail, or going down and
  // now pass, the level is bracketed — we've found the boundary.
  const bracketed =
    (previousDirection === 'up' && newDirection === 'down') ||
    (previousDirection === 'down' && newDirection === 'up')

  if (bracketed) {
    return { ...state, completedLevels, direction: newDirection, finished: true }
  }

  // Move to the next level.
  if (passed) {
    const nextIndex = currentIndex + 1
    if (nextIndex >= TESTABLE_LEVELS.length) {
      // Passed the highest testable level (C2) — done.
      return { ...state, completedLevels, direction: 'up', finished: true }
    }
    return {
      ...state,
      currentLevel: TESTABLE_LEVELS[nextIndex]!,
      completedLevels,
      direction: 'up',
    }
  } else {
    const nextIndex = currentIndex - 1
    if (nextIndex < 0) {
      // Failed the lowest testable level (A1) — done.
      return { ...state, completedLevels, direction: 'down', finished: true }
    }
    return {
      ...state,
      currentLevel: TESTABLE_LEVELS[nextIndex]!,
      completedLevels,
      direction: 'down',
    }
  }
}

/**
 * Check whether the placement test has finished.
 */
export function isComplete(state: PlacementState): boolean {
  return state.finished
}

/**
 * Extract the placement result from a completed (or in-progress) state.
 *
 * The estimated level is the highest level that was passed. If no level
 * was passed, returns 'preA1'.
 */
export function getResult(state: PlacementState): PlacementResult {
  let estimatedLevel: CefrLevel = 'preA1'
  let passMargin = 0

  for (const level of TESTABLE_LEVELS) {
    const result = state.levelResults[level]
    if (!result || result.total === 0) continue
    const passRate = result.correct / result.total
    if (passRate >= state.config.correctThreshold) {
      estimatedLevel = level
      passMargin = passRate - state.config.correctThreshold
    }
  }

  // Confidence: based on how many levels were tested and pass margin.
  const levelsCompleted = state.completedLevels.length
  let confidence: 'low' | 'moderate' | 'high'
  if (levelsCompleted <= 1 || (!state.finished && state.itemsAnswered < 4)) {
    confidence = 'low'
  } else if (state.finished && passMargin >= 0.2) {
    confidence = 'high'
  } else {
    confidence = 'moderate'
  }

  return {
    estimatedLevel,
    confidence,
    levelResults: { ...state.levelResults },
    itemsUsed: state.itemsAnswered,
    answeredItemIds: [...state.answeredItemIds],
  }
}
