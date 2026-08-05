import { describe, it, expect } from 'vitest'
import {
  convertRawToBand,
  convertScoreToGrade,
  roundToHalf,
  computeOverallBand,
  computeTestResult,
} from '@/mock-test/convert'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { GradeConversionTable, PerformanceRecord } from '@/mock-test/types'

// # OET grade conversion table used across tests.
// # Entries ordered descending by minScore — first match wins.
const OET_GRADES: GradeConversionTable = {
  entries: [
    { minScore: 450, grade: 'A' },
    { minScore: 350, grade: 'B' },
    { minScore: 300, grade: 'C+' },
    { minScore: 200, grade: 'C' },
    { minScore: 100, grade: 'D' },
    { minScore: 0, grade: 'E' },
  ],
}

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

describe('convertScoreToGrade', () => {
  // # OET grade conversion: numerical score → letter grade.
  it('converts 500 to A (above top threshold)', () => {
    expect(convertScoreToGrade(500, OET_GRADES)).toBe('A')
  })

  it('converts 450 to A (exact boundary)', () => {
    expect(convertScoreToGrade(450, OET_GRADES)).toBe('A')
  })

  it('converts 440 to B (just below A)', () => {
    expect(convertScoreToGrade(440, OET_GRADES)).toBe('B')
  })

  it('converts 350 to B (exact boundary)', () => {
    expect(convertScoreToGrade(350, OET_GRADES)).toBe('B')
  })

  it('converts 340 to C+ (just below B)', () => {
    expect(convertScoreToGrade(340, OET_GRADES)).toBe('C+')
  })

  it('converts 300 to C+ (exact boundary)', () => {
    expect(convertScoreToGrade(300, OET_GRADES)).toBe('C+')
  })

  it('converts 290 to C (just below C+)', () => {
    expect(convertScoreToGrade(290, OET_GRADES)).toBe('C')
  })

  it('converts 200 to C (exact boundary)', () => {
    expect(convertScoreToGrade(200, OET_GRADES)).toBe('C')
  })

  it('converts 190 to D (just below C)', () => {
    expect(convertScoreToGrade(190, OET_GRADES)).toBe('D')
  })

  it('converts 100 to D (exact boundary)', () => {
    expect(convertScoreToGrade(100, OET_GRADES)).toBe('D')
  })

  it('converts 90 to E (just below D)', () => {
    expect(convertScoreToGrade(90, OET_GRADES)).toBe('E')
  })

  it('converts 0 to E (minimum)', () => {
    expect(convertScoreToGrade(0, OET_GRADES)).toBe('E')
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

  // # PTE: mean rounded to nearest integer.
  it('PTE: L65 R70 S55 W60 → mean 62.5 → rounds to 63', () => {
    const result = computeOverallBand(
      { listening: 65, reading: 70, speaking: 55, writing: 60 },
      'mean_round_int',
    )
    expect(result).toBe(63)
  })

  it('PTE: L80 R80 S80 W80 → 80', () => {
    const result = computeOverallBand(
      { listening: 80, reading: 80, speaking: 80, writing: 80 },
      'mean_round_int',
    )
    expect(result).toBe(80)
  })

  it('PTE: L45 R50 S40 W55 → mean 47.5 → rounds to 48', () => {
    const result = computeOverallBand(
      { listening: 45, reading: 50, speaking: 40, writing: 55 },
      'mean_round_int',
    )
    expect(result).toBe(48)
  })

  // # OET: no overall score.
  it('OET (none): any input returns 0', () => {
    expect(computeOverallBand(
      { listening: 350, reading: 400, speaking: 300, writing: 280 },
      'none',
    )).toBe(0)
  })

  it('OET (none): empty input also returns 0', () => {
    expect(computeOverallBand({}, 'none')).toBe(0)
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
