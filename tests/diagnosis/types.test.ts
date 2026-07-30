import { describe, it, expect } from 'vitest'
import type {
  NodeOutcome,
  WeakNode,
  ClassifiedGap,
  ActionPlan,
  BandImpact,
  Diagnosis,
} from '@/diagnosis/types'

describe('diagnosis types', () => {
  it('NodeOutcome compiles and round-trips', () => {
    const outcome: NodeOutcome = {
      nodeId: 'gram.b1.present_perfect',
      sectionId: 'writing',
      skill: 'writing',
      correct: true,
      score: 6.5,
      maxScore: 9,
      latencyMs: 45000,
      responseIndex: 0,
    }
    expect(JSON.parse(JSON.stringify(outcome))).toEqual(outcome)
  })

  it('WeakNode compiles and round-trips', () => {
    const weak: WeakNode = {
      nodeId: 'gram.b1.present_perfect',
      nodeTitle: 'Present Perfect',
      nodeType: 'grammar',
      level: 'B1',
      skill: 'general',
      totalAttempts: 5,
      totalCorrect: 1,
      accuracy: 0.2,
      meanLatencyMs: 8000,
      impact: 0.85,
      confidence: 0.7,
      rank: 0.595,
    }
    expect(JSON.parse(JSON.stringify(weak))).toEqual(weak)
  })

  it('ClassifiedGap compiles and round-trips', () => {
    const gap: ClassifiedGap = {
      nodeId: 'gram.b1.present_perfect',
      nodeTitle: 'Present Perfect',
      nodeType: 'grammar',
      level: 'B1',
      skill: 'general',
      rootCause: 'knowledge',
      evidence: 'Low accuracy (20%) across both receptive and productive items.',
      accuracy: 0.2,
      meanLatencyMs: 8000,
      impact: 0.85,
      rank: 0.595,
    }
    expect(JSON.parse(JSON.stringify(gap))).toEqual(gap)
  })

  it('ActionPlan compiles and round-trips', () => {
    const plan: ActionPlan = {
      steps: [
        {
          order: 1,
          nodeId: 'gram.b1.present_perfect',
          nodeTitle: 'Present Perfect',
          rootCause: 'knowledge',
          activity: 'Study the present perfect form and usage, then complete practice exercises.',
          estimatedMinutes: 30,
          prerequisiteNodeIds: [],
        },
      ],
      totalEstimatedMinutes: 30,
      gapCount: 1,
    }
    expect(JSON.parse(JSON.stringify(plan))).toEqual(plan)
  })

  it('BandImpact compiles and round-trips', () => {
    const impact: BandImpact = {
      section: 'writing',
      currentBand: 6.0,
      projectedRange: { low: 6.5, high: 7.0 },
      confidence: 'moderate',
      closedGapCount: 3,
      totalGapCount: 5,
    }
    expect(JSON.parse(JSON.stringify(impact))).toEqual(impact)
  })

  it('Diagnosis compiles and round-trips', () => {
    const diagnosis: Diagnosis = {
      learnerId: 'learner_001',
      sessionId: 'sess_001',
      examId: 'ielts_academic',
      createdAt: 1000,
      outcomes: [],
      weakNodes: [],
      gaps: [],
      actionPlan: { steps: [], totalEstimatedMinutes: 0, gapCount: 0 },
      bandImpacts: [],
    }
    expect(JSON.parse(JSON.stringify(diagnosis))).toEqual(diagnosis)
  })
})
