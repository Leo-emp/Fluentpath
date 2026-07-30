import { describe, it, expect } from 'vitest'
import { buildActionPlan } from '@/diagnosis/plan'
import type { ClassifiedGap } from '@/diagnosis/types'
import type { SkillEdge } from '@/skill-graph/types'

function makeGap(overrides: Partial<ClassifiedGap> = {}): ClassifiedGap {
  return {
    nodeId: 'gram.b1.present_perfect',
    nodeTitle: 'Present Perfect',
    nodeType: 'grammar',
    level: 'B1',
    skill: 'general',
    rootCause: 'knowledge',
    evidence: 'Low accuracy.',
    accuracy: 0.2,
    meanLatencyMs: 5000,
    impact: 0.8,
    rank: 0.6,
    ...overrides,
  }
}

describe('buildActionPlan', () => {
  it('creates one step per gap', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a', nodeTitle: 'Node A' }),
      makeGap({ nodeId: 'node_b', nodeTitle: 'Node B' }),
    ]
    const plan = buildActionPlan(gaps, [])
    expect(plan.steps).toHaveLength(2)
    expect(plan.gapCount).toBe(2)
  })

  it('assigns sequential order numbers starting at 1', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a' }),
      makeGap({ nodeId: 'node_b' }),
    ]
    const plan = buildActionPlan(gaps, [])
    expect(plan.steps[0]!.order).toBe(1)
    expect(plan.steps[1]!.order).toBe(2)
  })

  it('respects prerequisite ordering from graph edges', () => {
    const gaps = [
      makeGap({ nodeId: 'node_b', nodeTitle: 'Node B', rank: 0.9 }),
      makeGap({ nodeId: 'node_a', nodeTitle: 'Node A', rank: 0.5 }),
    ]
    // node_a is a prerequisite of node_b.
    const edges: SkillEdge[] = [
      { fromNodeId: 'node_a', toNodeId: 'node_b', strength: 1 },
    ]
    const plan = buildActionPlan(gaps, edges)
    // Even though node_b has higher rank, node_a must come first.
    const orderA = plan.steps.find((s) => s.nodeId === 'node_a')!.order
    const orderB = plan.steps.find((s) => s.nodeId === 'node_b')!.order
    expect(orderA).toBeLessThan(orderB)
  })

  it('lists prerequisite nodeIds on each step', () => {
    const gaps = [
      makeGap({ nodeId: 'node_b', rank: 0.9 }),
      makeGap({ nodeId: 'node_a', rank: 0.5 }),
    ]
    const edges: SkillEdge[] = [
      { fromNodeId: 'node_a', toNodeId: 'node_b', strength: 1 },
    ]
    const plan = buildActionPlan(gaps, edges)
    const stepB = plan.steps.find((s) => s.nodeId === 'node_b')!
    expect(stepB.prerequisiteNodeIds).toContain('node_a')
  })

  it('generates different activities based on root cause', () => {
    const gaps = [
      makeGap({ nodeId: 'node_k', rootCause: 'knowledge' }),
      makeGap({ nodeId: 'node_p', rootCause: 'processing' }),
      makeGap({ nodeId: 'node_s', rootCause: 'strategy' }),
      makeGap({ nodeId: 'node_d', rootCause: 'production' }),
    ]
    const plan = buildActionPlan(gaps, [])
    const activities = plan.steps.map((s) => s.activity)
    // All four should have different activity descriptions.
    const unique = new Set(activities)
    expect(unique.size).toBe(4)
  })

  it('estimates time differently per root cause', () => {
    const gaps = [
      makeGap({ nodeId: 'node_k', rootCause: 'knowledge' }),
      makeGap({ nodeId: 'node_p', rootCause: 'processing' }),
    ]
    const plan = buildActionPlan(gaps, [])
    // Both should have non-zero estimates.
    for (const step of plan.steps) {
      expect(step.estimatedMinutes).toBeGreaterThan(0)
    }
  })

  it('sums total estimated minutes', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a' }),
      makeGap({ nodeId: 'node_b' }),
    ]
    const plan = buildActionPlan(gaps, [])
    const sum = plan.steps.reduce(
      (total, s) => total + s.estimatedMinutes,
      0,
    )
    expect(plan.totalEstimatedMinutes).toBe(sum)
  })

  it('limits steps to maxSteps when specified', () => {
    const gaps = Array.from({ length: 20 }, (_, i) =>
      makeGap({ nodeId: `node_${i}`, rank: 20 - i }),
    )
    const plan = buildActionPlan(gaps, [], 5)
    expect(plan.steps).toHaveLength(5)
    // gapCount still reflects total gaps found.
    expect(plan.gapCount).toBe(20)
  })

  it('returns empty plan for no gaps', () => {
    const plan = buildActionPlan([], [])
    expect(plan.steps).toHaveLength(0)
    expect(plan.totalEstimatedMinutes).toBe(0)
    expect(plan.gapCount).toBe(0)
  })
})
