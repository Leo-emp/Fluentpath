import { describe, it, expect } from 'vitest'
import { eligibleNodes, MASTERY_THRESHOLD } from '@/sequencer/eligibility'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000
const DAY = 86_400_000

function node(id: string, level: SkillNode['level'] = 'A1'): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

function mastery(nodeId: string, value: number, over: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    learnerId: 'u1',
    nodeId,
    mastery: value,
    confidence: 0.8,
    exposures: 10,
    correctStreak: 3,
    lastSeenAt: NOW,
    ...over,
  }
}

describe('eligibleNodes', () => {
  it('returns nothing for an empty graph', () => {
    expect(eligibleNodes([], [], [], NOW)).toEqual([])
  })

  it('treats a node with no prerequisites as eligible', () => {
    expect(eligibleNodes([node('a')], [], [], NOW).map((n) => n.id)).toEqual(['a'])
  })

  it('blocks a node whose prerequisite is unmet', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    expect(eligibleNodes(nodes, edges, [], NOW).map((n) => n.id)).toEqual(['a'])
  })

  it('unblocks a node once its prerequisite is mastered', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const result = eligibleNodes(nodes, edges, [mastery('a', 0.9)], NOW)
    expect(result.map((n) => n.id).sort()).toEqual(['a', 'b'])
  })

  it('requires every prerequisite, not just one', () => {
    const nodes = [node('a'), node('b'), node('c', 'A2')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'c', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'c', strength: 1 },
    ]
    const result = eligibleNodes(nodes, edges, [mastery('a', 0.9)], NOW)
    expect(result.map((n) => n.id)).not.toContain('c')
  })

  it('unblocks once all prerequisites are met', () => {
    const nodes = [node('a'), node('b'), node('c', 'A2')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'c', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'c', strength: 1 },
    ]
    const result = eligibleNodes(nodes, edges, [mastery('a', 0.9), mastery('b', 0.9)], NOW)
    expect(result.map((n) => n.id)).toContain('c')
  })

  it('gates loosely on a weak edge', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 0.2 }]
    // Required is 0.6 * 0.2 = 0.12, and the learner is at 0.2.
    expect(eligibleNodes(nodes, edges, [mastery('a', 0.2)], NOW).map((n) => n.id)).toContain('b')
  })

  it('gates fully on a strength-1 edge', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    expect(eligibleNodes(nodes, edges, [mastery('a', 0.5)], NOW).map((n) => n.id)).not.toContain('b')
  })

  it('admits a node sitting exactly on the threshold', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const result = eligibleNodes(nodes, edges, [mastery('a', MASTERY_THRESHOLD)], NOW)
    expect(result.map((n) => n.id)).toContain('b')
  })

  it('uses decayed mastery, so a stale prerequisite re-blocks', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const stale = mastery('a', 0.7, { lastSeenAt: NOW - 500 * DAY })
    expect(eligibleNodes(nodes, edges, [stale], NOW).map((n) => n.id)).not.toContain('b')
  })

  it('keeps a recently practised prerequisite unblocked', () => {
    const nodes = [node('a'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    const fresh = mastery('a', 0.9, { lastSeenAt: NOW - 2 * DAY })
    expect(eligibleNodes(nodes, edges, [fresh], NOW).map((n) => n.id)).toContain('b')
  })

  it('exposes a sensible threshold', () => {
    expect(MASTERY_THRESHOLD).toBeGreaterThan(0)
    expect(MASTERY_THRESHOLD).toBeLessThan(1)
  })
})
