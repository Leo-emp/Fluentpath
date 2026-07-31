import { describe, it, expect } from 'vitest'
import { boostFromDiagnosis } from '@/sequencer/diagnosis-bridge'
import type { Candidate } from '@/sequencer/select'
import type { SkillNode } from '@/skill-graph/types'
import type { ActionPlan } from '@/diagnosis/types'

function node(id: string, level: SkillNode['level'] = 'B1'): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

function candidate(id: string, reason: Candidate['reason'], priority: number): Candidate {
  return { node: node(id), reason, priority }
}

// An action plan that flags node 'b' and 'c' for remediation.
const PLAN: ActionPlan = {
  steps: [
    { order: 1, nodeId: 'b', nodeTitle: 'B', rootCause: 'knowledge', activity: 'drill', estimatedMinutes: 10, prerequisiteNodeIds: [] },
    { order: 2, nodeId: 'c', nodeTitle: 'C', rootCause: 'processing', activity: 'drill', estimatedMinutes: 5, prerequisiteNodeIds: [] },
  ],
  totalEstimatedMinutes: 15,
  gapCount: 2,
}

describe('boostFromDiagnosis', () => {
  it('boosts candidates that appear in the action plan', () => {
    const candidates = [
      candidate('a', 'new', 94),
      candidate('b', 'review', 1010),
      candidate('c', 'new', 93),
    ]

    const result = boostFromDiagnosis(candidates, PLAN)

    // 'b' and 'c' should now be remediation with +2000 priority.
    const boosted = result.filter((c) => c.reason === 'remediation')
    expect(boosted).toHaveLength(2)
    expect(boosted.map((c) => c.node.id)).toContain('b')
    expect(boosted.map((c) => c.node.id)).toContain('c')
  })

  it('remediation outranks review and new', () => {
    const candidates = [
      candidate('a', 'review', 1050),
      candidate('b', 'new', 94),
    ]

    const result = boostFromDiagnosis(candidates, {
      steps: [{ order: 1, nodeId: 'b', nodeTitle: 'B', rootCause: 'knowledge', activity: 'drill', estimatedMinutes: 10, prerequisiteNodeIds: [] }],
      totalEstimatedMinutes: 10,
      gapCount: 1,
    })

    // 'b' should be first (94 + 2000 = 2094 > 1050).
    expect(result[0]!.node.id).toBe('b')
    expect(result[0]!.reason).toBe('remediation')
  })

  it('leaves non-matching candidates unchanged', () => {
    const candidates = [
      candidate('a', 'new', 94),
      candidate('d', 'review', 1010),
    ]

    const result = boostFromDiagnosis(candidates, PLAN)

    // Neither 'a' nor 'd' is in the plan — no change.
    expect(result[0]!.reason).toBe('review')
    expect(result[0]!.node.id).toBe('d')
    expect(result[1]!.reason).toBe('new')
    expect(result[1]!.node.id).toBe('a')
  })

  it('handles an empty action plan', () => {
    const candidates = [candidate('a', 'new', 94)]
    const emptyPlan: ActionPlan = { steps: [], totalEstimatedMinutes: 0, gapCount: 0 }

    const result = boostFromDiagnosis(candidates, emptyPlan)
    expect(result).toHaveLength(1)
    expect(result[0]!.reason).toBe('new')
  })

  it('handles empty candidates', () => {
    const result = boostFromDiagnosis([], PLAN)
    expect(result).toHaveLength(0)
  })

  it('preserves relative order within boosted candidates', () => {
    const candidates = [
      candidate('b', 'review', 1020),
      candidate('c', 'review', 1010),
    ]

    const result = boostFromDiagnosis(candidates, PLAN)

    // Both boosted by 2000. 'b' was 1020 → 3020, 'c' was 1010 → 3010.
    expect(result[0]!.node.id).toBe('b')
    expect(result[1]!.node.id).toBe('c')
  })
})
