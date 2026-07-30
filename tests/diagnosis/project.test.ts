import { describe, it, expect } from 'vitest'
import { projectBandImpact } from '@/diagnosis/project'
import type { ClassifiedGap } from '@/diagnosis/types'
import type { TestResult, PerformanceRecord } from '@/mock-test/types'

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

function makeTestResult(
  sectionBands: Record<string, number>,
): TestResult {
  const sectionResults = Object.entries(sectionBands).map(
    ([id, band]) => ({
      sectionId: id,
      skill: id as 'writing' | 'speaking' | 'listening' | 'reading',
      bandScore: band,
      responses: [],
      durationMs: 0,
      timedOut: false,
    }),
  )
  const record: PerformanceRecord = {
    sessionId: 'sess_001',
    examId: 'ielts_academic',
    learnerId: 'learner_001',
    startedAt: 1000,
    completedAt: 5000,
    totalDurationMs: 4000,
    sectionResults,
  }
  return {
    performanceRecord: record,
    sectionBands,
    overallBand: 6.5,
    sectionsIncluded: Object.keys(sectionBands),
    sectionsMissing: [],
  }
}

const CRITERION_WEIGHTS: Record<string, number> = {
  task_achievement: 0.25,
  coherence: 0.25,
  vocabulary: 0.25,
  grammar: 0.25,
}

describe('projectBandImpact', () => {
  it('projects improvement for sections with gaps', () => {
    const gaps = [
      makeGap({ skill: 'writing', impact: 0.8 }),
      makeGap({ nodeId: 'node_b', skill: 'writing', impact: 0.6 }),
    ]
    const testResult = makeTestResult({ writing: 6.0, speaking: 7.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    expect(writing.currentBand).toBe(6.0)
    expect(writing.projectedRange.low).toBeGreaterThan(6.0)
    expect(writing.projectedRange.high).toBeGreaterThanOrEqual(
      writing.projectedRange.low,
    )
  })

  it('does not project improvement for sections without gaps', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 0.8 })]
    const testResult = makeTestResult({ writing: 6.0, speaking: 7.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    // Speaking has no gaps → no impact entry.
    const speaking = impacts.find((i) => i.section === 'speaking')
    expect(speaking).toBeUndefined()
  })

  it('uses a range, never a point estimate', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 0.8 })]
    const testResult = makeTestResult({ writing: 6.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    expect(writing.projectedRange.high).toBeGreaterThan(
      writing.projectedRange.low,
    )
  })

  it('never projects above the maximum band (9.0 for IELTS)', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 1.0 })]
    const testResult = makeTestResult({ writing: 8.5 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    expect(writing.projectedRange.high).toBeLessThanOrEqual(9.0)
  })

  it('sets confidence based on gap count', () => {
    // Few gaps → lower confidence in the projection.
    const fewGaps = [makeGap({ skill: 'writing' })]
    const testResult = makeTestResult({ writing: 6.0 })
    const fewImpacts = projectBandImpact(
      fewGaps,
      testResult,
      CRITERION_WEIGHTS,
    )
    expect(fewImpacts[0]!.confidence).toBe('low')

    // Many gaps → higher confidence.
    const manyGaps = Array.from({ length: 5 }, (_, i) =>
      makeGap({ nodeId: `node_${i}`, skill: 'writing' }),
    )
    const manyImpacts = projectBandImpact(
      manyGaps,
      testResult,
      CRITERION_WEIGHTS,
    )
    expect(['moderate', 'high']).toContain(manyImpacts[0]!.confidence)
  })

  it('reports gap counts per section', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a', skill: 'writing' }),
      makeGap({ nodeId: 'node_b', skill: 'writing' }),
    ]
    const testResult = makeTestResult({ writing: 6.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)
    expect(impacts[0]!.totalGapCount).toBe(2)
    expect(impacts[0]!.closedGapCount).toBe(2)
  })

  it('returns empty array when no gaps', () => {
    const testResult = makeTestResult({ writing: 6.0 })
    expect(
      projectBandImpact([], testResult, CRITERION_WEIGHTS),
    ).toHaveLength(0)
  })

  it('rounds projected bands to nearest 0.5 (IELTS convention)', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 0.4 })]
    const testResult = makeTestResult({ writing: 6.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    // Both ends of the range should be on 0.5 boundaries.
    expect((writing.projectedRange.low * 2) % 1).toBe(0)
    expect((writing.projectedRange.high * 2) % 1).toBe(0)
  })
})
