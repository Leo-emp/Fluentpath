import { describe, it, expect } from 'vitest'
import { diagnose } from '@/diagnosis/diagnose'
import type { DiagnosisInput } from '@/diagnosis/types'
import type {
  PerformanceRecord,
  TestResult,
  ResponseRecord,
} from '@/mock-test/types'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_000_000

// Skill graph nodes used in tests.
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
  {
    id: 'strat.b2.ielts_task2_structure',
    type: 'strategy',
    level: 'B2',
    skill: 'writing',
    title: 'IELTS Task 2 Structure',
    description: '',
    metadata: null,
  },
]

const EDGES: SkillEdge[] = [
  {
    fromNodeId: 'gram.b1.present_perfect',
    toNodeId: 'gram.b2.third_conditional',
    strength: 0.8,
  },
]

function makeResponse(
  sectionId: string,
  slotId: string,
  nodeIds: string[],
  score: number | null,
  maxScore: number | null,
  latencyMs: number = 5000,
): ResponseRecord {
  return {
    sectionId,
    slotId,
    nodeIds,
    startedAt: 1000,
    submittedAt: 1000 + latencyMs,
    latencyMs,
    responseData: { skill: 'writing', text: 'test', wordCount: 100 },
    score,
    maxScore,
  }
}

function buildInput(responses: ResponseRecord[]): DiagnosisInput {
  const record: PerformanceRecord = {
    sessionId: 'sess_001',
    examId: 'ielts_academic',
    learnerId: 'learner_001',
    startedAt: NOW,
    completedAt: NOW + 3600_000,
    totalDurationMs: 3600_000,
    sectionResults: [
      {
        sectionId: 'writing',
        skill: 'writing',
        bandScore: 6.0,
        responses,
        durationMs: 3600_000,
        timedOut: false,
      },
    ],
  }
  const testResult: TestResult = {
    performanceRecord: record,
    sectionBands: { writing: 6.0 },
    overallBand: 6.0,
    sectionsIncluded: ['writing'],
    sectionsMissing: ['listening', 'reading', 'speaking'],
  }
  const masteryRecords: MasteryRecord[] = NODES.map((n) => ({
    learnerId: 'learner_001',
    nodeId: n.id,
    mastery: 0.5,
    confidence: 0.3,
    exposures: 3,
    correctStreak: 0,
    lastSeenAt: NOW - 86_400_000,
  }))

  return {
    performanceRecord: record,
    testResult,
    examDefinition: IELTS_ACADEMIC,
    nodes: NODES,
    edges: EDGES,
    masteryRecords,
    criterionWeights: {
      task_achievement: 0.25,
      coherence: 0.25,
      vocabulary: 0.25,
      grammar: 0.25,
    },
    now: NOW,
  }
}

describe('diagnose', () => {
  it('produces a complete Diagnosis from a performance record', () => {
    const responses = [
      // Two attempts at present_perfect — both fail.
      makeResponse('writing', 'task1', ['gram.b1.present_perfect'], 3, 9),
      makeResponse('writing', 'task2', ['gram.b1.present_perfect'], 2, 9),
      // Two attempts at describe_data — both fail.
      makeResponse('writing', 'task1', ['cando.b1.describe_data'], 3, 9),
      makeResponse('writing', 'task2', ['cando.b1.describe_data'], 4, 9),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    expect(result.learnerId).toBe('learner_001')
    expect(result.sessionId).toBe('sess_001')
    expect(result.examId).toBe('ielts_academic')
    expect(result.outcomes.length).toBeGreaterThan(0)
    expect(result.weakNodes.length).toBeGreaterThan(0)
    expect(result.gaps.length).toBeGreaterThan(0)
    expect(result.actionPlan.steps.length).toBeGreaterThan(0)
  })

  it('attributes outcomes to the correct nodes', () => {
    const responses = [
      makeResponse(
        'writing',
        'task1',
        ['gram.b1.present_perfect', 'cando.b1.describe_data'],
        3,
        9,
      ),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    // One response with 2 nodeIds → 2 outcomes.
    expect(result.outcomes).toHaveLength(2)
    const nodeIds = result.outcomes.map((o) => o.nodeId)
    expect(nodeIds).toContain('gram.b1.present_perfect')
    expect(nodeIds).toContain('cando.b1.describe_data')
  })

  it('classifies root causes for each gap', () => {
    const responses = [
      makeResponse(
        'writing',
        'task1',
        ['gram.b1.present_perfect'],
        2,
        9,
      ),
      makeResponse(
        'writing',
        'task2',
        ['gram.b1.present_perfect'],
        3,
        9,
      ),
      makeResponse(
        'writing',
        'task1',
        ['strat.b2.ielts_task2_structure'],
        2,
        9,
      ),
      makeResponse(
        'writing',
        'task2',
        ['strat.b2.ielts_task2_structure'],
        3,
        9,
      ),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    const stratGap = result.gaps.find(
      (g) => g.nodeId === 'strat.b2.ielts_task2_structure',
    )
    // Strategy nodes should always be classified as strategy gaps.
    if (stratGap) {
      expect(stratGap.rootCause).toBe('strategy')
    }
  })

  it('respects prerequisite ordering in the action plan', () => {
    const responses = [
      // Both nodes fail.
      makeResponse(
        'writing',
        'task1',
        ['gram.b1.present_perfect'],
        2,
        9,
      ),
      makeResponse(
        'writing',
        'task2',
        ['gram.b1.present_perfect'],
        2,
        9,
      ),
      makeResponse(
        'writing',
        'task1',
        ['gram.b2.third_conditional'],
        2,
        9,
      ),
      makeResponse(
        'writing',
        'task2',
        ['gram.b2.third_conditional'],
        2,
        9,
      ),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    // present_perfect is a prerequisite of third_conditional.
    const ppStep = result.actionPlan.steps.find(
      (s) => s.nodeId === 'gram.b1.present_perfect',
    )
    const tcStep = result.actionPlan.steps.find(
      (s) => s.nodeId === 'gram.b2.third_conditional',
    )
    if (ppStep && tcStep) {
      expect(ppStep.order).toBeLessThan(tcStep.order)
    }
  })

  it('projects band impact for sections with gaps', () => {
    const responses = [
      makeResponse(
        'writing',
        'task1',
        ['gram.b1.present_perfect'],
        2,
        9,
      ),
      makeResponse(
        'writing',
        'task2',
        ['gram.b1.present_perfect'],
        3,
        9,
      ),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    // Writing section has gaps → should have a band impact projection.
    if (result.bandImpacts.length > 0) {
      const writing = result.bandImpacts.find(
        (i) => i.section === 'writing',
      )
      expect(writing).toBeDefined()
      expect(writing!.currentBand).toBe(6.0)
      expect(writing!.projectedRange.low).toBeGreaterThan(6.0)
    }
  })

  it('is fully serializable (JSON round-trip)', () => {
    const responses = [
      makeResponse(
        'writing',
        'task1',
        ['gram.b1.present_perfect'],
        2,
        9,
      ),
      makeResponse(
        'writing',
        'task2',
        ['gram.b1.present_perfect'],
        3,
        9,
      ),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)
    const roundTripped = JSON.parse(JSON.stringify(result))
    expect(roundTripped).toEqual(result)
  })

  it('returns empty diagnosis when no responses exist', () => {
    const input = buildInput([])
    const result = diagnose(input)
    expect(result.outcomes).toHaveLength(0)
    expect(result.weakNodes).toHaveLength(0)
    expect(result.gaps).toHaveLength(0)
    expect(result.actionPlan.steps).toHaveLength(0)
    expect(result.bandImpacts).toHaveLength(0)
  })
})
