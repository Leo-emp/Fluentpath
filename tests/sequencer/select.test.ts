import { describe, it, expect } from 'vitest'
import { selectNext, REVIEW_THRESHOLD } from '@/sequencer/select'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000

function node(
  id: string,
  type: SkillNode['type'] = 'grammar',
  level: SkillNode['level'] = 'A1',
): SkillNode {
  return { id, type, level, skill: 'general', title: id, description: '', metadata: null }
}

function mastery(nodeId: string, value: number): MasteryRecord {
  return {
    learnerId: 'u1',
    nodeId,
    mastery: value,
    confidence: 0.8,
    exposures: 10,
    correctStreak: 2,
    lastSeenAt: NOW,
  }
}

const noEdges: SkillEdge[] = []

describe('basics', () => {
  it('returns nothing when there are no nodes', () => {
    expect(selectNext({ nodes: [], edges: noEdges, mastery: [], now: NOW, limit: 5 })).toEqual([])
  })

  it('labels unseen nodes as new', () => {
    const result = selectNext({ nodes: [node('a')], edges: noEdges, mastery: [], now: NOW, limit: 5 })
    expect(result[0]?.reason).toBe('new')
  })

  it('respects the limit', () => {
    const nodes = [node('a'), node('b'), node('c'), node('d')]
    expect(selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 2 })).toHaveLength(2)
  })

  it('returns nothing when the limit is zero', () => {
    expect(selectNext({ nodes: [node('a')], edges: noEdges, mastery: [], now: NOW, limit: 0 })).toEqual([])
  })
})

describe('review versus new', () => {
  it('labels a partially decayed known node as review', () => {
    const result = selectNext({
      nodes: [node('a')],
      edges: noEdges,
      mastery: [mastery('a', 0.65)],
      now: NOW,
      limit: 5,
    })
    expect(result[0]?.reason).toBe('review')
  })

  it('puts review ahead of new material', () => {
    const result = selectNext({
      nodes: [node('fresh'), node('rusty')],
      edges: noEdges,
      mastery: [mastery('rusty', 0.65)],
      now: NOW,
      limit: 5,
    })
    expect(result[0]?.node.id).toBe('rusty')
  })

  it('excludes nodes already above the review threshold', () => {
    const result = selectNext({
      nodes: [node('solid')],
      edges: noEdges,
      mastery: [mastery('solid', 0.95)],
      now: NOW,
      limit: 5,
    })
    expect(result).toEqual([])
  })

  it('orders weaker review material first', () => {
    const result = selectNext({
      nodes: [node('weak'), node('stronger')],
      edges: noEdges,
      mastery: [mastery('weak', 0.3), mastery('stronger', 0.7)],
      now: NOW,
      limit: 5,
    })
    expect(result[0]?.node.id).toBe('weak')
  })

  it('exposes a review threshold above the eligibility threshold', () => {
    expect(REVIEW_THRESHOLD).toBeGreaterThan(0)
    expect(REVIEW_THRESHOLD).toBeLessThan(1)
  })
})

describe('prerequisites and level', () => {
  it('excludes nodes blocked by prerequisites', () => {
    const nodes = [node('a'), node('b', 'grammar', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const result = selectNext({ nodes, edges, mastery: [], now: NOW, limit: 5 })
    expect(result.map((c) => c.node.id)).toEqual(['a'])
  })

  it('prefers lower levels among new material', () => {
    const nodes = [node('hard', 'grammar', 'B2'), node('easy', 'grammar', 'A1')]
    const result = selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 5 })
    expect(result[0]?.node.id).toBe('easy')
  })
})

describe('interleaving', () => {
  it('never returns three consecutive nodes of the same type', () => {
    const nodes = [
      node('g1', 'grammar'),
      node('g2', 'grammar'),
      node('g3', 'grammar'),
      node('l1', 'lexical'),
      node('l2', 'lexical'),
    ]
    const result = selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 5 })

    for (let i = 2; i < result.length; i++) {
      const threeInARow =
        result[i]!.node.type === result[i - 1]!.node.type &&
        result[i - 1]!.node.type === result[i - 2]!.node.type
      expect(threeInARow).toBe(false)
    }
  })

  it('still returns everything when only one type is available', () => {
    const nodes = [node('g1', 'grammar'), node('g2', 'grammar'), node('g3', 'grammar')]
    const result = selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 5 })
    expect(result).toHaveLength(3)
  })

  it('does not drop or duplicate candidates while interleaving', () => {
    const nodes = [
      node('g1', 'grammar'),
      node('g2', 'grammar'),
      node('g3', 'grammar'),
      node('l1', 'lexical'),
      node('p1', 'phono'),
    ]
    const result = selectNext({ nodes, edges: noEdges, mastery: [], now: NOW, limit: 10 })
    const ids = result.map((c) => c.node.id).sort()
    expect(ids).toEqual(['g1', 'g2', 'g3', 'l1', 'p1'])
  })
})
