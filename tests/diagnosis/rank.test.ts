import { describe, it, expect } from 'vitest'
import { rankWeakNodes } from '@/diagnosis/rank'
import type { NodeOutcome } from '@/diagnosis/types'
import type { SkillNode } from '@/skill-graph/types'

const NODES: SkillNode[] = [
  {
    id: 'gram.b1.present_perfect',
    type: 'grammar',
    level: 'B1',
    skill: 'general',
    title: 'Present Perfect',
    description: '',
    metadata: null,
  },
  {
    id: 'gram.b2.third_conditional',
    type: 'grammar',
    level: 'B2',
    skill: 'general',
    title: 'Third Conditional',
    description: '',
    metadata: null,
  },
  {
    id: 'cando.b1.describe_data',
    type: 'cando',
    level: 'B1',
    skill: 'writing',
    title: 'Describe Data',
    description: '',
    metadata: null,
  },
]

function makeOutcome(
  nodeId: string,
  correct: boolean,
  latencyMs: number = 5000,
): NodeOutcome {
  return {
    nodeId,
    sectionId: 'writing',
    skill: 'writing',
    correct,
    score: correct ? 7 : 3,
    maxScore: 9,
    latencyMs,
    responseIndex: 0,
  }
}

describe('rankWeakNodes', () => {
  it('aggregates multiple outcomes for the same node', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)

    const node = weakNodes.find(
      (w) => w.nodeId === 'gram.b1.present_perfect',
    )!
    expect(node.totalAttempts).toBe(3)
    expect(node.totalCorrect).toBe(1)
    expect(node.accuracy).toBeCloseTo(1 / 3, 2)
  })

  it('suppresses nodes with insufficient evidence (< minAttempts)', () => {
    const outcomes = [makeOutcome('gram.b1.present_perfect', false)]
    // Default minAttempts is 2.
    const weakNodes = rankWeakNodes(outcomes, NODES, 2)
    expect(
      weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect'),
    ).toBeUndefined()
  })

  it('includes nodes that meet the minAttempts threshold', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES, 2)
    expect(
      weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect'),
    ).toBeDefined()
  })

  it('excludes nodes with high accuracy (>= 0.8)', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    // 4/5 = 0.8, which is the boundary — should be excluded.
    expect(
      weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect'),
    ).toBeUndefined()
  })

  it('ranks by impact × confidence descending', () => {
    const outcomes = [
      // Node A: 0/3 correct → very weak, high confidence.
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
      // Node B: 0/2 correct → very weak, lower confidence.
      makeOutcome('gram.b2.third_conditional', false),
      makeOutcome('gram.b2.third_conditional', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    expect(weakNodes.length).toBeGreaterThanOrEqual(2)
    // Node A should rank higher (more evidence).
    const indexA = weakNodes.findIndex(
      (w) => w.nodeId === 'gram.b1.present_perfect',
    )
    const indexB = weakNodes.findIndex(
      (w) => w.nodeId === 'gram.b2.third_conditional',
    )
    expect(indexA).toBeLessThan(indexB)
  })

  it('computes mean latency', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', false, 3000),
      makeOutcome('gram.b1.present_perfect', false, 7000),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    const node = weakNodes.find(
      (w) => w.nodeId === 'gram.b1.present_perfect',
    )!
    expect(node.meanLatencyMs).toBe(5000)
  })

  it('enriches with node metadata (title, type, level, skill)', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    const node = weakNodes.find(
      (w) => w.nodeId === 'gram.b1.present_perfect',
    )!
    expect(node.nodeTitle).toBe('Present Perfect')
    expect(node.nodeType).toBe('grammar')
    expect(node.level).toBe('B1')
    expect(node.skill).toBe('general')
  })

  it('returns empty array when no outcomes', () => {
    expect(rankWeakNodes([], NODES)).toHaveLength(0)
  })

  it('ignores outcomes for nodes not in the provided node list', () => {
    const outcomes = [
      makeOutcome('nonexistent_node', false),
      makeOutcome('nonexistent_node', false),
    ]
    expect(rankWeakNodes(outcomes, NODES)).toHaveLength(0)
  })
})
