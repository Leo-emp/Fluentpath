import { describe, it, expect } from 'vitest'
import { attributeOutcomes } from '@/diagnosis/attribute'
import type { PerformanceRecord, ResponseRecord } from '@/mock-test/types'

// Helper: build a minimal PerformanceRecord with given responses.
function buildRecord(responses: ResponseRecord[]): PerformanceRecord {
  return {
    sessionId: 'sess_001',
    examId: 'ielts_academic',
    learnerId: 'learner_001',
    startedAt: 1000,
    completedAt: 5000,
    totalDurationMs: 4000,
    sectionResults: [
      {
        sectionId: 'writing',
        skill: 'writing',
        bandScore: 6.5,
        responses: responses.filter((r) => r.sectionId === 'writing'),
        durationMs: 3600_000,
        timedOut: false,
      },
      {
        sectionId: 'listening',
        skill: 'listening',
        bandScore: 7,
        responses: responses.filter((r) => r.sectionId === 'listening'),
        durationMs: 2400_000,
        timedOut: false,
      },
    ],
  }
}

function makeResponse(
  overrides: Partial<ResponseRecord> & {
    sectionId: string
    slotId: string
    nodeIds: string[]
  },
): ResponseRecord {
  return {
    sectionId: overrides.sectionId,
    slotId: overrides.slotId,
    nodeIds: overrides.nodeIds,
    startedAt: overrides.startedAt ?? 1000,
    submittedAt: overrides.submittedAt ?? 2000,
    latencyMs: overrides.latencyMs ?? 1000,
    responseData: overrides.responseData ?? {
      skill: 'writing',
      text: 'test',
      wordCount: 10,
    },
    score: overrides.score ?? null,
    maxScore: overrides.maxScore ?? null,
  }
}

describe('attributeOutcomes', () => {
  it('creates one NodeOutcome per nodeId per response', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect', 'cando.b1.describe_data'],
        score: 6,
        maxScore: 9,
      }),
    ]
    const record = buildRecord(responses)
    const outcomes = attributeOutcomes(record)

    // Two nodeIds on one response → two outcomes.
    expect(outcomes).toHaveLength(2)
    expect(outcomes[0]!.nodeId).toBe('gram.b1.present_perfect')
    expect(outcomes[1]!.nodeId).toBe('cando.b1.describe_data')
  })

  it('marks scored responses as correct when score >= 50% of max', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        score: 5,
        maxScore: 9,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    // 5/9 = 0.556 >= 0.5 → correct
    expect(outcomes[0]!.correct).toBe(true)
  })

  it('marks scored responses as incorrect when score < 50% of max', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        score: 3,
        maxScore: 9,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    // 3/9 = 0.333 < 0.5 → incorrect
    expect(outcomes[0]!.correct).toBe(false)
  })

  it('marks unscored responses as incorrect', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        score: null,
        maxScore: null,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.correct).toBe(false)
  })

  it('carries latency from the response', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        latencyMs: 45000,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.latencyMs).toBe(45000)
  })

  it('carries section skill from the section result', () => {
    const responses = [
      makeResponse({
        sectionId: 'listening',
        slotId: 'part1',
        nodeIds: ['cando.a2.understand_conversation'],
        responseData: { skill: 'listening', selectedIndex: 2 },
        score: 1,
        maxScore: 1,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.skill).toBe('listening')
  })

  it('assigns sequential response indices across all sections', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['node_a'],
      }),
      makeResponse({
        sectionId: 'listening',
        slotId: 'part1',
        nodeIds: ['node_b'],
        responseData: { skill: 'listening', selectedIndex: 0 },
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.responseIndex).toBe(0)
    expect(outcomes[1]!.responseIndex).toBe(1)
  })

  it('returns empty array when there are no responses', () => {
    const record = buildRecord([])
    expect(attributeOutcomes(record)).toHaveLength(0)
  })
})
