import { describe, it, expect } from 'vitest'
import { classifyGaps } from '@/diagnosis/classify'
import type { WeakNode, NodeOutcome } from '@/diagnosis/types'

function makeWeakNode(overrides: Partial<WeakNode> = {}): WeakNode {
  return {
    nodeId: 'gram.b1.present_perfect',
    nodeTitle: 'Present Perfect',
    nodeType: 'grammar',
    level: 'B1',
    skill: 'general',
    totalAttempts: 4,
    totalCorrect: 1,
    accuracy: 0.25,
    meanLatencyMs: 5000,
    impact: 0.75,
    confidence: 0.7,
    rank: 0.525,
    ...overrides,
  }
}

function makeOutcome(overrides: Partial<NodeOutcome> = {}): NodeOutcome {
  return {
    nodeId: 'gram.b1.present_perfect',
    sectionId: 'writing',
    skill: 'writing',
    correct: false,
    score: 3,
    maxScore: 9,
    latencyMs: 5000,
    responseIndex: 0,
    ...overrides,
  }
}

describe('classifyGaps', () => {
  it('classifies as knowledge when accuracy is low across all item types', () => {
    const weak = makeWeakNode({ accuracy: 0.15 })
    const outcomes = [
      makeOutcome({ correct: false, latencyMs: 3000 }),
      makeOutcome({ correct: false, latencyMs: 4000 }),
      makeOutcome({ correct: false, latencyMs: 3500 }),
      makeOutcome({ correct: true, latencyMs: 5000 }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('knowledge')
  })

  it('classifies as processing when accuracy is moderate but latency is high', () => {
    // The learner gets it right sometimes, but takes much longer than
    // the median. They know it but can't access it quickly.
    const weak = makeWeakNode({
      accuracy: 0.5,
      meanLatencyMs: 25000,
    })
    // Include fast outcomes from other nodes to establish a low median
    // baseline. The target node's 25s mean is then clearly 2× above
    // the ~5s median of the full outcome set.
    const outcomes = [
      makeOutcome({ correct: true, latencyMs: 30000 }),
      makeOutcome({ correct: false, latencyMs: 20000 }),
      makeOutcome({ correct: true, latencyMs: 28000 }),
      makeOutcome({ correct: false, latencyMs: 22000 }),
      // Fast outcomes from other nodes to pull the median down.
      // With these 10 fast + 4 slow, median lands around 5000ms.
      // 25000 > 2 × 5000 = 10000 → triggers processing classification.
      makeOutcome({ nodeId: 'other_a', correct: true, latencyMs: 3000 }),
      makeOutcome({ nodeId: 'other_a', correct: true, latencyMs: 4000 }),
      makeOutcome({ nodeId: 'other_a', correct: true, latencyMs: 4000 }),
      makeOutcome({ nodeId: 'other_a', correct: true, latencyMs: 5000 }),
      makeOutcome({ nodeId: 'other_a', correct: true, latencyMs: 5000 }),
      makeOutcome({ nodeId: 'other_b', correct: true, latencyMs: 5000 }),
      makeOutcome({ nodeId: 'other_b', correct: true, latencyMs: 5000 }),
      makeOutcome({ nodeId: 'other_b', correct: true, latencyMs: 5000 }),
      makeOutcome({ nodeId: 'other_b', correct: true, latencyMs: 3000 }),
      makeOutcome({ nodeId: 'other_b', correct: true, latencyMs: 5000 }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('processing')
  })

  it('classifies as production when receptive correct but productive incorrect', () => {
    const weak = makeWeakNode({
      nodeId: 'gram.b1.present_perfect',
      accuracy: 0.5,
      meanLatencyMs: 5000,
    })
    const outcomes = [
      // Receptive (listening/reading) — correct.
      makeOutcome({ correct: true, skill: 'listening', latencyMs: 3000 }),
      makeOutcome({ correct: true, skill: 'reading', latencyMs: 4000 }),
      // Productive (writing/speaking) — incorrect.
      makeOutcome({ correct: false, skill: 'writing', latencyMs: 5000 }),
      makeOutcome({ correct: false, skill: 'speaking', latencyMs: 6000 }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('production')
  })

  it('classifies as strategy when node type is strategy', () => {
    const weak = makeWeakNode({
      nodeId: 'strat.b2.ielts_task2_structure',
      nodeType: 'strategy',
      accuracy: 0.3,
    })
    const outcomes = [
      makeOutcome({
        nodeId: 'strat.b2.ielts_task2_structure',
        correct: false,
      }),
      makeOutcome({
        nodeId: 'strat.b2.ielts_task2_structure',
        correct: false,
      }),
      makeOutcome({
        nodeId: 'strat.b2.ielts_task2_structure',
        correct: true,
      }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('strategy')
  })

  it('carries impact and rank from the weak node', () => {
    const weak = makeWeakNode({ impact: 0.85, rank: 0.6 })
    const outcomes = [
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: true }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.impact).toBe(0.85)
    expect(gaps[0]!.rank).toBe(0.6)
  })

  it('provides human-readable evidence string', () => {
    const weak = makeWeakNode()
    const outcomes = [
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: true }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.evidence.length).toBeGreaterThan(10)
  })

  it('preserves weak node ordering (already ranked)', () => {
    const weakA = makeWeakNode({ nodeId: 'node_a', rank: 0.9 })
    const weakB = makeWeakNode({ nodeId: 'node_b', rank: 0.5 })
    const outcomes = [
      makeOutcome({ nodeId: 'node_a', correct: false }),
      makeOutcome({ nodeId: 'node_a', correct: false }),
      makeOutcome({ nodeId: 'node_a', correct: false }),
      makeOutcome({ nodeId: 'node_a', correct: true }),
      makeOutcome({ nodeId: 'node_b', correct: false }),
      makeOutcome({ nodeId: 'node_b', correct: false }),
      makeOutcome({ nodeId: 'node_b', correct: false }),
      makeOutcome({ nodeId: 'node_b', correct: true }),
    ]
    const gaps = classifyGaps([weakA, weakB], outcomes)
    expect(gaps[0]!.nodeId).toBe('node_a')
    expect(gaps[1]!.nodeId).toBe('node_b')
  })

  it('returns empty array when no weak nodes', () => {
    expect(classifyGaps([], [])).toHaveLength(0)
  })
})
