import { describe, it, expect } from 'vitest'
import {
  convertRawToBand,
  roundToHalf,
  computeOverallBand,
  computeTestResult,
} from '@/mock-test/convert'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { PerformanceRecord } from '@/mock-test/types'

describe('convertRawToBand', () => {
  const table = IELTS_ACADEMIC.scoring.sectionConversions['listening']!

  it('converts 40 raw to band 9', () => {
    expect(convertRawToBand(40, table)).toBe(9)
  })

  it('converts 30 raw to band 7', () => {
    expect(convertRawToBand(30, table)).toBe(7)
  })

  it('converts 23 raw to band 6', () => {
    expect(convertRawToBand(23, table)).toBe(6)
  })

  it('converts 1 raw to band 1', () => {
    expect(convertRawToBand(1, table)).toBe(1)
  })

  it('returns 0 for raw score of 0', () => {
    expect(convertRawToBand(0, table)).toBe(0)
  })

  it('handles boundary: 37 raw = band 8.5', () => {
    expect(convertRawToBand(37, table)).toBe(8.5)
  })

  it('handles boundary: 36 raw = band 8 (falls into 35-36 range)', () => {
    expect(convertRawToBand(36, table)).toBe(8)
  })

  it('handles reading conversion table too', () => {
    const readingTable = IELTS_ACADEMIC.scoring.sectionConversions['reading']!
    expect(convertRawToBand(30, readingTable)).toBe(7)
    expect(convertRawToBand(23, readingTable)).toBe(6)
    expect(convertRawToBand(15, readingTable)).toBe(5)
  })
})

describe('roundToHalf', () => {
  it('rounds 6.625 to 6.5', () => {
    expect(roundToHalf(6.625)).toBe(6.5)
  })

  it('rounds 7.25 to 7.5', () => {
    expect(roundToHalf(7.25)).toBe(7.5)
  })

  it('rounds 6.75 to 7.0', () => {
    expect(roundToHalf(6.75)).toBe(7)
  })

  it('leaves 7.0 unchanged', () => {
    expect(roundToHalf(7)).toBe(7)
  })

  it('leaves 7.5 unchanged', () => {
    expect(roundToHalf(7.5)).toBe(7.5)
  })

  it('rounds 5.124 to 5.0', () => {
    expect(roundToHalf(5.124)).toBe(5)
  })
})

describe('computeOverallBand', () => {
  it('averages 4 section bands and rounds: L7 R6.5 W6 S7 → 6.5', () => {
    const result = computeOverallBand(
      { listening: 7, reading: 6.5, writing: 6, speaking: 7 },
      'mean_round_half',
    )
    expect(result).toBe(6.5)
  })

  it('averages 4 section bands: L8 R7 W7 S7 → 7.5', () => {
    const result = computeOverallBand(
      { listening: 8, reading: 7, writing: 7, speaking: 7 },
      'mean_round_half',
    )
    expect(result).toBe(7.5)
  })

  it('computes from only 2 available sections: W6.5 S7 → 7.0', () => {
    const result = computeOverallBand(
      { writing: 6.5, speaking: 7 },
      'mean_round_half',
    )
    expect(result).toBe(7)
  })

  it('returns 0 for no sections', () => {
    expect(computeOverallBand({}, 'mean_round_half')).toBe(0)
  })

  it('handles single section', () => {
    expect(computeOverallBand({ writing: 6 }, 'mean_round_half')).toBe(6)
  })
})

describe('computeTestResult', () => {
  it('assembles a complete test result with section bands', () => {
    const record: PerformanceRecord = {
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
          responses: [],
          durationMs: 3600_000,
          timedOut: false,
        },
        {
          sectionId: 'speaking',
          skill: 'speaking',
          bandScore: 7,
          responses: [],
          durationMs: 840_000,
          timedOut: false,
        },
      ],
    }
    const result = computeTestResult(record, IELTS_ACADEMIC)
    expect(result.sectionBands['writing']).toBe(6.5)
    expect(result.sectionBands['speaking']).toBe(7)
    expect(result.overallBand).toBe(7)
    expect(result.sectionsIncluded).toContain('writing')
    expect(result.sectionsIncluded).toContain('speaking')
    expect(result.sectionsMissing).toContain('listening')
    expect(result.sectionsMissing).toContain('reading')
  })

  it('handles all 4 sections present', () => {
    const record: PerformanceRecord = {
      sessionId: 'sess_002',
      examId: 'ielts_academic',
      learnerId: 'learner_001',
      startedAt: 1000,
      completedAt: 5000,
      totalDurationMs: 4000,
      sectionResults: [
        { sectionId: 'listening', skill: 'listening', bandScore: 7, responses: [], durationMs: 0, timedOut: false },
        { sectionId: 'reading', skill: 'reading', bandScore: 6.5, responses: [], durationMs: 0, timedOut: false },
        { sectionId: 'writing', skill: 'writing', bandScore: 6, responses: [], durationMs: 0, timedOut: false },
        { sectionId: 'speaking', skill: 'speaking', bandScore: 7, responses: [], durationMs: 0, timedOut: false },
      ],
    }
    const result = computeTestResult(record, IELTS_ACADEMIC)
    // avg = (7 + 6.5 + 6 + 7) / 4 = 6.625 → 6.5
    expect(result.overallBand).toBe(6.5)
    expect(result.sectionsMissing).toHaveLength(0)
  })
})
