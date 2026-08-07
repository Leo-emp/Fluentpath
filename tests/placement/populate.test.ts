import { describe, it, expect } from 'vitest'
import { populateMastery } from '@/placement/populate'
import type { PlacementResult } from '@/placement/types'
import type { SkillNode } from '@/skill-graph/types'

// A set of skill nodes spanning A1–B2.
function buildNodes(): SkillNode[] {
  return [
    { id: 'gram.a1.present_simple', type: 'grammar', level: 'A1', skill: 'general', title: 'Present Simple', description: '', metadata: null },
    { id: 'gram.a2.past_simple', type: 'grammar', level: 'A2', skill: 'general', title: 'Past Simple', description: '', metadata: null },
    { id: 'gram.b1.present_perfect', type: 'grammar', level: 'B1', skill: 'general', title: 'Present Perfect', description: '', metadata: null },
    { id: 'gram.b2.third_conditional', type: 'grammar', level: 'B2', skill: 'general', title: 'Third Conditional', description: '', metadata: null },
  ]
}

describe('populateMastery', () => {
  it('sets high mastery for nodes below the estimated level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        A1: { correct: 3, total: 3 },
        A2: { correct: 3, total: 3 },
        B1: { correct: 2, total: 3 },
        B2: { correct: 1, total: 3 },
      },
      itemsUsed: 12,
      answeredItemIds: [],
      confidence: 'moderate',
      perSkillLevels: {},
    }
    const nodes = buildNodes()
    const now = 1_000_000
    const records = populateMastery(result, nodes, now)

    // A1 node: below estimated level → high mastery.
    const a1 = records.find((r) => r.nodeId === 'gram.a1.present_simple')!
    expect(a1.mastery).toBeGreaterThanOrEqual(0.8)

    // A2 node: below estimated level → high mastery.
    const a2 = records.find((r) => r.nodeId === 'gram.a2.past_simple')!
    expect(a2.mastery).toBeGreaterThanOrEqual(0.8)
  })

  it('sets moderate mastery for nodes at the estimated level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        B1: { correct: 2, total: 3 },
        B2: { correct: 1, total: 3 },
      },
      itemsUsed: 6,
      answeredItemIds: [],
      confidence: 'moderate',
      perSkillLevels: {},
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, 1_000_000)

    const b1 = records.find((r) => r.nodeId === 'gram.b1.present_perfect')!
    // At estimated level: mastery should reflect the pass rate (2/3 ≈ 0.67).
    expect(b1.mastery).toBeGreaterThanOrEqual(0.5)
    expect(b1.mastery).toBeLessThanOrEqual(0.8)
  })

  it('sets low mastery for nodes above the estimated level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        B1: { correct: 2, total: 3 },
        B2: { correct: 1, total: 3 },
      },
      itemsUsed: 6,
      answeredItemIds: [],
      confidence: 'moderate',
      perSkillLevels: {},
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, 1_000_000)

    const b2 = records.find((r) => r.nodeId === 'gram.b2.third_conditional')!
    // Above estimated level: low mastery.
    expect(b2.mastery).toBeLessThanOrEqual(0.4)
  })

  it('sets confidence based on evidence at each level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        B1: { correct: 2, total: 3 },
      },
      itemsUsed: 3,
      answeredItemIds: [],
      confidence: 'moderate',
      perSkillLevels: {},
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, 1_000_000)

    // Nodes at tested levels should have moderate confidence.
    const b1 = records.find((r) => r.nodeId === 'gram.b1.present_perfect')!
    expect(b1.confidence).toBeGreaterThan(0)

    // Nodes at untested levels should have low confidence.
    const a1 = records.find((r) => r.nodeId === 'gram.a1.present_simple')!
    expect(a1.confidence).toBeLessThan(b1.confidence)
  })

  it('returns a MasteryRecord for every node', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {},
      itemsUsed: 0,
      answeredItemIds: [],
      confidence: 'moderate',
      perSkillLevels: {},
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, 1_000_000)
    expect(records).toHaveLength(nodes.length)
  })

  it('sets lastSeenAt to now', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {},
      itemsUsed: 0,
      answeredItemIds: [],
      confidence: 'moderate',
      perSkillLevels: {},
    }
    const now = 999_999
    const records = populateMastery(result, buildNodes(), now)
    expect(records.every((r) => r.lastSeenAt === now)).toBe(true)
  })
})
