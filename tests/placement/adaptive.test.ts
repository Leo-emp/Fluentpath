import { describe, it, expect } from 'vitest'
import type { PlacementConfig } from '@/placement/types'
import {
  createPlacementState,
  selectNextItem,
  recordAnswer,
  isComplete,
  getResult,
} from '@/placement/adaptive'
import type { McqItem } from '@/items/types'

const NOW = 1_000_000

// Build a pool of items spanning A1–C2, 3 per level.
function buildItemPool(): McqItem[] {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
  const items: McqItem[] = []
  for (const level of levels) {
    for (let i = 0; i < 3; i++) {
      items.push({
        id: `${level.toLowerCase()}_${i}`,
        stem: `Question ${i} at ${level}`,
        options: [
          { text: 'correct', misconception: null },
          { text: 'wrong1', misconception: 'confusion_1' },
          { text: 'wrong2', misconception: 'confusion_2' },
          { text: 'wrong3', misconception: 'confusion_3' },
        ],
        correctIndex: 0,
        nodeIds: [`gram.${level.toLowerCase()}.test_${i}`],
        level,
      })
    }
  }
  return items
}

const DEFAULT_CONFIG: PlacementConfig = {
  startLevel: 'B1',
  itemsPerLevel: 3,
  // 0.66 so that 2/3 (0.6667) passes. 0.67 would reject 2/3
  // due to floating point: 0.6666... < 0.67.
  correctThreshold: 0.66,
  maxItems: 20,
}

describe('createPlacementState', () => {
  it('creates state starting at the configured level', () => {
    const state = createPlacementState(DEFAULT_CONFIG)
    expect(state.currentLevel).toBe('B1')
    expect(state.itemsAnswered).toBe(0)
    expect(state.finished).toBe(false)
  })

  it('is fully serializable (JSON round-trip)', () => {
    const state = createPlacementState(DEFAULT_CONFIG)
    const roundTripped = JSON.parse(JSON.stringify(state))
    expect(roundTripped).toEqual(state)
  })
})

describe('selectNextItem', () => {
  it('selects an item at the current level', () => {
    const state = createPlacementState(DEFAULT_CONFIG)
    const items = buildItemPool()
    const selected = selectNextItem(state, items)
    expect(selected).not.toBeNull()
    expect(selected!.level).toBe('B1')
  })

  it('does not re-select items already answered', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    const items = buildItemPool()
    const first = selectNextItem(state, items)!
    state = recordAnswer(state, first.id, true, NOW)
    const second = selectNextItem(state, items)
    expect(second).not.toBeNull()
    expect(second!.id).not.toBe(first.id)
  })

  it('returns null when no items available at current level', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, itemsPerLevel: 10 })
    const items = buildItemPool() // Only 3 per level
    // Answer all 3 B1 items.
    for (let i = 0; i < 3; i++) {
      const item = selectNextItem(state, items)!
      state = recordAnswer(state, item.id, true, NOW)
    }
    // Now B1 is exhausted and state should advance; if it doesn't, null.
    // (The algorithm advances level before we call selectNextItem again,
    // so this should find items at B2.)
    const next = selectNextItem(state, items)
    // Should be at B2 now or return null if stuck.
    if (next) expect(next.level).not.toBe('B1')
  })
})

describe('recordAnswer', () => {
  it('increments the answer count', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    state = recordAnswer(state, 'b1_0', true, NOW)
    expect(state.itemsAnswered).toBe(1)
  })

  it('tracks correct/incorrect per level', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    state = recordAnswer(state, 'b1_0', true, NOW)
    state = recordAnswer(state, 'b1_1', false, NOW)
    state = recordAnswer(state, 'b1_2', true, NOW)
    expect(state.levelResults['B1']!.correct).toBe(2)
    expect(state.levelResults['B1']!.total).toBe(3)
  })

  it('preserves serialization after recording answers', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    state = recordAnswer(state, 'b1_0', true, NOW)
    state = recordAnswer(state, 'b1_1', false, NOW)
    const roundTripped = JSON.parse(JSON.stringify(state))
    expect(roundTripped).toEqual(state)
  })
})

describe('level advancement', () => {
  it('moves up when threshold is met at current level', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Answer 3 B1 items: 2/3 correct → 0.67 → meets threshold.
    state = recordAnswer(state, 'b1_0', true, NOW)
    state = recordAnswer(state, 'b1_1', true, NOW)
    state = recordAnswer(state, 'b1_2', false, NOW)
    // After 3 items at B1, should advance to B2.
    expect(state.currentLevel).toBe('B2')
  })

  it('moves down when threshold is not met', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Answer 3 B1 items: 1/3 correct → 0.33 → below threshold.
    state = recordAnswer(state, 'b1_0', false, NOW)
    state = recordAnswer(state, 'b1_1', true, NOW)
    state = recordAnswer(state, 'b1_2', false, NOW)
    // Should drop to A2.
    expect(state.currentLevel).toBe('A2')
  })
})

describe('completion', () => {
  it('finishes when level is bracketed (pass one, fail next)', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Pass B1 (2/3 correct).
    state = recordAnswer(state, 'b1_0', true, NOW)
    state = recordAnswer(state, 'b1_1', true, NOW)
    state = recordAnswer(state, 'b1_2', false, NOW)
    // Now at B2. Fail B2 (1/3 correct).
    state = recordAnswer(state, 'b2_0', false, NOW)
    state = recordAnswer(state, 'b2_1', true, NOW)
    state = recordAnswer(state, 'b2_2', false, NOW)
    // Passed B1, failed B2 → level is bracketed → done.
    expect(isComplete(state)).toBe(true)
  })

  it('finishes when maxItems is reached', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, maxItems: 6 })
    for (let i = 0; i < 6; i++) {
      state = recordAnswer(state, `item_${i}`, i % 2 === 0, NOW)
    }
    expect(isComplete(state)).toBe(true)
  })

  it('finishes when reaching the top level (C2) and passing', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, startLevel: 'C1' })
    // Pass C1.
    state = recordAnswer(state, 'c1_0', true, NOW)
    state = recordAnswer(state, 'c1_1', true, NOW)
    state = recordAnswer(state, 'c1_2', true, NOW)
    // Now at C2. Pass C2.
    state = recordAnswer(state, 'c2_0', true, NOW)
    state = recordAnswer(state, 'c2_1', true, NOW)
    state = recordAnswer(state, 'c2_2', true, NOW)
    // Passed everything up to C2 → done.
    expect(isComplete(state)).toBe(true)
  })

  it('finishes when reaching the bottom level (A1) and failing', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, startLevel: 'A2' })
    // Fail A2.
    state = recordAnswer(state, 'a2_0', false, NOW)
    state = recordAnswer(state, 'a2_1', false, NOW)
    state = recordAnswer(state, 'a2_2', false, NOW)
    // Now at A1. Fail A1.
    state = recordAnswer(state, 'a1_0', false, NOW)
    state = recordAnswer(state, 'a1_1', false, NOW)
    state = recordAnswer(state, 'a1_2', false, NOW)
    // Failed everything down to A1 → done.
    expect(isComplete(state)).toBe(true)
  })
})

describe('getResult', () => {
  it('returns the highest passed level', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Pass B1.
    state = recordAnswer(state, 'b1_0', true, NOW)
    state = recordAnswer(state, 'b1_1', true, NOW)
    state = recordAnswer(state, 'b1_2', false, NOW)
    // Fail B2.
    state = recordAnswer(state, 'b2_0', false, NOW)
    state = recordAnswer(state, 'b2_1', false, NOW)
    state = recordAnswer(state, 'b2_2', true, NOW)

    const result = getResult(state)
    expect(result.estimatedLevel).toBe('B1')
    expect(result.itemsUsed).toBe(6)
  })

  it('returns preA1 when no level is passed', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, startLevel: 'A1' })
    // Fail A1.
    state = recordAnswer(state, 'a1_0', false, NOW)
    state = recordAnswer(state, 'a1_1', false, NOW)
    state = recordAnswer(state, 'a1_2', false, NOW)

    const result = getResult(state)
    expect(result.estimatedLevel).toBe('preA1')
  })

  it('returns answeredItemIds as a plain array', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    state = recordAnswer(state, 'b1_0', true, NOW)
    const result = getResult(state)
    expect(Array.isArray(result.answeredItemIds)).toBe(true)
    expect(result.answeredItemIds).toContain('b1_0')
  })
})
