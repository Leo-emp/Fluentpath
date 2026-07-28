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

function reading(nodes: SkillNode[], mastery: MasteryRecord[], now = NOW) {
  return estimateLevels(nodes, mastery, now).find((e) => e.skill === 'reading')
}

describe('basics', () => {
  it('returns nothing for an empty graph', () => {
    expect(estimateLevels([], [], NOW)).toEqual([])
  })

  it('places a learner with no mastery at preA1', () => {
    expect(reading([node('r1', 'A1', 'reading')], [])?.level).toBe('preA1')
  })

  it('promotes a learner who has mastered a level', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A1', 'reading')]
    expect(reading(nodes, [known('r1'), known('r2')])?.level).toBe('A1')
  })

  it('does not promote on partial coverage', () => {
    const nodes = [
      node('r1', 'A1', 'reading'),
      node('r2', 'A1', 'reading'),
      node('r3', 'A1', 'reading'),
      node('r4', 'A1', 'reading'),
    ]
    expect(reading(nodes, [known('r1')])?.level).toBe('preA1')
  })

  it('climbs several levels when all are mastered', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A2', 'reading'), node('r3', 'B1', 'reading')]
    expect(reading(nodes, [known('r1'), known('r2'), known('r3')])?.level).toBe('B1')
  })

  it('reports skills independently and never blends them', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('s1', 'A1', 'speaking')]
    const result = estimateLevels(nodes, [known('r1')], NOW)
    expect(result.find((e) => e.skill === 'reading')?.level).toBe('A1')
    expect(result.find((e) => e.skill === 'speaking')?.level).toBe('preA1')
  })

  it('omits skills that have no nodes at all', () => {
    expect(estimateLevels([node('r1', 'A1', 'reading')], [], NOW).map((e) => e.skill)).toEqual(['reading'])
  })
})

describe('levels are cumulative', () => {
  it('does not credit a higher level when a lower one with content is unmastered', () => {
    const nodes = [
      node('r1', 'A1', 'reading'),
      node('r2', 'A1', 'reading'),
      node('r3', 'A2', 'reading'),
    ]
    // A2 mastered, A1 not. Levels are cumulative, so this is still preA1.
    expect(reading(nodes, [known('r3')])?.level).toBe('preA1')
  })

  it('uses decayed mastery, so a long absence can demote a learner', () => {
    const nodes = [node('r1', 'A1', 'reading')]
    const stale = known('r1', { mastery: 0.7, confidence: 0.3, lastSeenAt: NOW - 800 * DAY })
    expect(reading(nodes, [stale])?.level).toBe('preA1')
  })
})

describe('empty levels are transparent', () => {
  it('does NOT promote through levels that have no content', () => {
    // The original bug: with only A1 authored, mastering it promoted the
    // learner through every empty level up to C2.
    const nodes = [node('r1', 'A1', 'reading')]
    expect(reading(nodes, [known('r1')])?.level).toBe('A1')
  })

  it('does not stop at an empty level either', () => {
    // A2 is unauthored. Mastering A1 and B1 should credit B1 — there is no A2
    // content to have failed at.
    const nodes = [node('r1', 'A1', 'reading'), node('r3', 'B1', 'reading')]
    expect(reading(nodes, [known('r1'), known('r3')])?.level).toBe('B1')
  })

  it('still stops at a real ceiling above an empty level', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r3', 'B1', 'reading')]
    expect(reading(nodes, [known('r1')])?.level).toBe('A1')
  })
})

describe('next level and content ceiling', () => {
  it('names the next level with content', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A2', 'reading')]
    const result = reading(nodes, [known('r1')])
    expect(result?.level).toBe('A1')
    expect(result?.nextLevel).toBe('A2')
    expect(result?.atContentCeiling).toBe(false)
  })

  it('skips empty levels when naming the next one', () => {
    // A2 unauthored, so the next thing to work on is B1, not A2.
    const nodes = [node('r1', 'A1', 'reading'), node('r3', 'B1', 'reading')]
    expect(reading(nodes, [known('r1')])?.nextLevel).toBe('B1')
  })

  it('reports the content ceiling when everything authored is mastered', () => {
    const nodes = [node('r1', 'A1', 'reading')]
    const result = reading(nodes, [known('r1')])
    expect(result?.nextLevel).toBeNull()
    expect(result?.atContentCeiling).toBe(true)
  })

  it('does not report a ceiling merely because the learner is a beginner', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A2', 'reading')]
    const result = reading(nodes, [])
    expect(result?.level).toBe('preA1')
    expect(result?.nextLevel).toBe('A1')
    expect(result?.atContentCeiling).toBe(false)
  })
})

describe('coverage', () => {
  it('reports zero progress into an untouched next level', () => {
    const nodes = [node('r1', 'A1', 'reading'), node('r2', 'A2', 'reading')]
    expect(reading(nodes, [known('r1')])?.coverage).toBeCloseTo(0)
  })

  it('reports partial progress through the next level', () => {
    const nodes = [
      node('r1', 'A1', 'reading'),
      node('r2', 'A2', 'reading'),
      node('r3', 'A2', 'reading'),
    ]
    expect(reading(nodes, [known('r1'), known('r2')])?.coverage).toBeCloseTo(0.5)
  })

  it('reports zero coverage at the content ceiling, paired with the flag', () => {
    const nodes = [node('r1', 'A1', 'reading')]
    const result = reading(nodes, [known('r1')])
    // Coverage alone would read as "no progress"; atContentCeiling is what
    // makes it interpretable as "nothing left to do".
    expect(result?.coverage).toBe(0)
    expect(result?.atContentCeiling).toBe(true)
  })
})

describe('confidence', () => {
  it('reports confidence alongside the level', () => {
    const result = reading([node('r1', 'A1', 'reading')], [known('r1')])
    expect(result?.confidence).toBeGreaterThan(0)
    expect(result?.confidence).toBeLessThanOrEqual(1)
  })

  it('reports zero confidence for an untouched skill', () => {
    expect(reading([node('r1', 'A1', 'reading')], [])?.confidence).toBe(0)
  })
})
