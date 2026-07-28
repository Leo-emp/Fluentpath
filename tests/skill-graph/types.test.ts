import { describe, it, expect } from 'vitest'
import { CEFR_LEVELS, NODE_TYPES, SKILL_AREAS, levelIndex } from '@/skill-graph/types'

describe('CEFR levels', () => {
  it('lists all seven levels in ascending order', () => {
    expect(CEFR_LEVELS).toEqual(['preA1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  })

  it('maps a level to its ordinal position', () => {
    expect(levelIndex('preA1')).toBe(0)
    expect(levelIndex('B1')).toBe(3)
    expect(levelIndex('C2')).toBe(6)
  })

  it('orders levels correctly for comparison', () => {
    expect(levelIndex('A2')).toBeLessThan(levelIndex('B2'))
  })
})

describe('node types', () => {
  it('lists exactly the five node types', () => {
    expect(NODE_TYPES).toEqual(['cando', 'grammar', 'lexical', 'phono', 'strategy'])
  })
})

describe('skill areas', () => {
  it('lists the four skills plus general', () => {
    expect(SKILL_AREAS).toEqual(['reading', 'writing', 'listening', 'speaking', 'general'])
  })
})
