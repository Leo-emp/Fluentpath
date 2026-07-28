import { describe, it, expect } from 'vitest'
import { estimateLevels } from '@/sequencer/level'
import type { SkillNode, CefrLevel, SkillArea } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000
const DAY = 86_400_000

function node(id: string, level: CefrLevel, skill: SkillArea): SkillNode {
  return { id, type: 'cando', level, skill, title: id, description: '', metadata: null }
}

function known(nodeId: string, over: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    learnerId: 'u1',
    nodeId,
    mastery: 0.9,
    confidence: 0.9,
    exposures: 10,
    correctStreak: 5,
    lastSeenAt: NOW,
    ...over,
  }
}

describe('estimateLevels', () => {
  it('returns nothing for an empty graph', () => {
    expect(estimateLevels([], [], NOW)).toEqual([])
  })

  it('places a learner with no mastery at preA1', () => {
    const result = estimateLevels([node('r1', 'A1', 'reading')], [], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('preA1')
  })

  it('promotes a learner who has mastered a level', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A1', 'reading')]
    const result = estimateLevels(nodes, [known('r1'), known('r2')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('A1')
  })

  it('does not promote on partial coverage', () => {
    const nodes = [
      node('r1', 'A1', 'reading'),
      node('r2', 'A1', 'reading'),
      node('r3', 'A1', 'reading'),
      node('r4', 'A1', 'reading'),
    ]
    const result = estimateLevels(nodes, [known('r1')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('preA1')
  })

  it('does not skip a level that is unmastered', () => {
    // A2 fully mastered but A1 is not — the learner is still preA1, because
    // levels are cumulative.
    const nodes = [
      node('r1', 'A1', 'reading'),
      node('r2', 'A1', 'reading'),
      node('r3', 'A2', 'reading'),
    ]
    const result = estimateLevels(nodes, [known('r3')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('preA1')
  })

  it('climbs several levels when all are mastered', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A2', 'reading'), node('r3', 'B1', 'reading')]
    const result = estimateLevels(nodes, [known('r1'), known('r2'), known('r3')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('B1')
  })

  it('reports skills independently and never blends them', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('s1', 'A1', 'speaking')]
    const result = estimateLevels(nodes, [known('r1')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('A1')
    expect(result.find((e) => e.skill === 'speaking')?.level).toBe('preA1')
  })

  it('reports progress through the level above the estimate', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A2', 'reading')]
    const reading = estimateLevels(nodes, [known('r1')], NOW).find((e) => e.skill === 'reading')
    expect(reading?.level).toBe('A1')
    expect(reading?.coverage).toBeCloseTo(0)
  })

  it('shows partial coverage of the next level', () => {
    const nodes = [
      node('r1', 'A1', 'reading'),
      node('r2', 'A2', 'reading'),
      node('r3', 'A2', 'reading'),
    ]
    const reading = estimateLevels(nodes, [known('r1'), known('r2')], NOW).find((e) => e.skill === 'reading')
    expect(reading?.coverage).toBeCloseTo(0.5)
  })

  it('omits skills that have no nodes at all', () => {
    const result = estimateLevels([node('r1', 'A1', 'reading')], [], NOW)
    expect(result.map((e) => e.skill)).toEqual(['reading'])
  })

  it('uses decayed mastery, so a long absence can demote a learner', () => {
    const nodes = [node('r1', 'A1', 'reading')]
    const stale = known('r1', { mastery: 0.7, confidence: 0.3, lastSeenAt: NOW - 800 * DAY })
    expect(estimateLevels(nodes, [stale], NOW).find((e) => e.skill === 'reading')?.level).toBe('preA1')
  })

  it('reports confidence alongside the level', () => {
    const nodes = [node('r1', 'A1', 'reading')]
    const reading = estimateLevels(nodes, [known('r1')], NOW).find((e) => e.skill === 'reading')
    expect(reading?.confidence).toBeGreaterThan(0)
    expect(reading?.confidence).toBeLessThanOrEqual(1)
  })

  it('reports zero confidence for an untouched skill', () => {
    const reading = estimateLevels([node('r1', 'A1', 'reading')], [], NOW).find((e) => e.skill === 'reading')
    expect(reading?.confidence).toBe(0)
  })
})
