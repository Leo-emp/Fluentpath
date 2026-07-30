import { describe, it, expect } from 'vitest'
import type {
  ExamDefinition,
  ExamSection,
  SectionSlot,
  BandConversionTable,
  ScoringRule,
  TestSession,
  SessionStatus,
  SectionState,
  SectionStatus,
  ResponseRecord,
  ResponseData,
  PerformanceRecord,
  SectionResult,
  TestResult,
} from '@/mock-test/types'

// Type-level tests: these compile if the types are correct.
describe('mock test type definitions', () => {
  it('ExamDefinition has all required fields', () => {
    const exam: ExamDefinition = {
      id: 'ielts_academic',
      name: 'IELTS Academic',
      sections: [],
      totalDurationMinutes: 165,
      scoring: {
        sectionConversions: {},
        overallRule: 'mean_round_half',
      },
    }
    expect(exam.id).toBe('ielts_academic')
    expect(exam.totalDurationMinutes).toBe(165)
  })

  it('ExamSection defines a section with slots', () => {
    const section: ExamSection = {
      id: 'writing',
      name: 'Writing',
      skill: 'writing',
      order: 2,
      durationMinutes: 60,
      slots: [
        {
          id: 'task1',
          skill: 'writing',
          taskRef: 'ielts.task1.chart.1',
          durationMinutes: 20,
          prepTimeSeconds: null,
          nodeIds: ['cando.b2.describe_data'],
        },
      ],
      allowBacktrack: true,
    }
    expect(section.slots).toHaveLength(1)
    expect(section.slots[0]!.skill).toBe('writing')
  })

  it('TestSession is fully serializable', () => {
    const session: TestSession = {
      id: 'sess_001',
      examId: 'ielts_academic',
      learnerId: 'learner_001',
      status: 'not_started',
      startedAt: null,
      completedAt: null,
      activeSectionIndex: -1,
      sectionStates: [],
      responses: [],
    }
    // The key property: round-trip through JSON must preserve the value.
    const roundTripped = JSON.parse(JSON.stringify(session)) as TestSession
    expect(roundTripped).toEqual(session)
  })

  it('ResponseRecord captures timing and node mapping', () => {
    const response: ResponseRecord = {
      sectionId: 'writing',
      slotId: 'task1',
      nodeIds: ['cando.b2.describe_data'],
      startedAt: 1000,
      submittedAt: 2000,
      latencyMs: 1000,
      responseData: { skill: 'writing', text: 'The chart shows...', wordCount: 150 },
      score: null,
      maxScore: null,
    }
    expect(response.latencyMs).toBe(1000)
    expect(response.nodeIds).toContain('cando.b2.describe_data')
  })

  it('PerformanceRecord assembles a complete test record', () => {
    const record: PerformanceRecord = {
      sessionId: 'sess_001',
      examId: 'ielts_academic',
      learnerId: 'learner_001',
      startedAt: 1000,
      completedAt: 5000,
      totalDurationMs: 4000,
      sectionResults: [],
    }
    expect(record.totalDurationMs).toBe(4000)
  })

  it('TestResult includes overall and section bands', () => {
    const result: TestResult = {
      performanceRecord: {
        sessionId: 'sess_001',
        examId: 'ielts_academic',
        learnerId: 'learner_001',
        startedAt: 1000,
        completedAt: 5000,
        totalDurationMs: 4000,
        sectionResults: [],
      },
      sectionBands: { writing: 6.5, speaking: 7.0 },
      overallBand: 6.5,
      sectionsIncluded: ['writing', 'speaking'],
      sectionsMissing: ['listening', 'reading'],
    }
    expect(result.overallBand).toBe(6.5)
    expect(result.sectionsMissing).toContain('listening')
  })
})
