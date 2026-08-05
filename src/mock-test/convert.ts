/**
 * Score conversion — raw marks to band scores, and overall band computation.
 *
 * IELTS uses two scoring mechanisms:
 *   - Listening and Reading: raw marks (out of 40) converted to bands
 *     via a lookup table. The table varies by test form in real IELTS;
 *     we use standard indicative values.
 *   - Writing and Speaking: scored directly on the rubric (bands 0-9
 *     with 0.5 steps). No conversion needed.
 *
 * The overall band is the average of all section bands, rounded to the
 * nearest 0.5. IELTS uses standard mathematical rounding at the .25
 * boundary: 6.25 rounds to 6.5, 6.75 rounds to 7.0.
 */

import type {
  BandConversionTable,
  GradeConversionTable,
  OverallRule,
  PerformanceRecord,
  ExamDefinition,
  TestResult,
} from './types'

/**
 * Convert a raw mark to a band score using a conversion table.
 *
 * The table entries are ordered descending by minRaw. The first entry
 * whose minRaw the raw score meets or exceeds gives the band.
 * Returns 0 if the raw score is below all entries (or the table is empty).
 */
export function convertRawToBand(raw: number, table: BandConversionTable): number {
  for (const entry of table.entries) {
    if (raw >= entry.minRaw) return entry.band
  }
  return 0
}

/**
 * Convert a numerical score to a letter grade using a grade table.
 *
 * # Used by OET. The table entries are ordered descending by minScore.
 * # The first entry whose minScore the score meets or exceeds gives the grade.
 * # Returns '?' if score is below all entries (or the table is empty).
 */
export function convertScoreToGrade(score: number, table: GradeConversionTable): string {
  for (const entry of table.entries) {
    if (score >= entry.minScore) return entry.grade
  }
  return '?'
}

/**
 * Round a number to the nearest 0.5.
 *
 * This is the IELTS overall band rounding rule:
 *   6.25  → 6.5
 *   6.625 → 6.5
 *   6.75  → 7.0
 *   7.0   → 7.0
 */
export function roundToHalf(n: number): number {
  return Math.round(n * 2) / 2
}

/**
 * Compute the overall band from section bands.
 *
 * For 'mean_round_half': average all section bands, then round to
 * nearest 0.5. Only sections present in the map are included.
 * Returns 0 if no sections are provided.
 */
export function computeOverallBand(
  sectionBands: Record<string, number>,
  rule: OverallRule,
): number {
  const bands = Object.values(sectionBands)
  if (bands.length === 0) return 0

  switch (rule) {
    case 'mean_round_half': {
      // # IELTS: mean of section bands, rounded to nearest 0.5.
      const mean = bands.reduce((sum, b) => sum + b, 0) / bands.length
      return roundToHalf(mean)
    }
    case 'mean_round_int': {
      // # PTE: mean of communicative skill scores, rounded to integer.
      const mean = bands.reduce((sum, b) => sum + b, 0) / bands.length
      return Math.round(mean)
    }
    case 'none': {
      // # OET: no overall score. Return 0.
      return 0
    }
  }
}

/**
 * Assemble a TestResult from a completed PerformanceRecord.
 *
 * The performance record carries per-section band scores (set during
 * scoring). This function collects them, computes the overall band,
 * and identifies which sections were completed vs missing.
 */
export function computeTestResult(
  record: PerformanceRecord,
  exam: ExamDefinition,
): TestResult {
  // Collect band scores from completed sections.
  const sectionBands: Record<string, number> = {}
  for (const sr of record.sectionResults) {
    sectionBands[sr.sectionId] = sr.bandScore
  }

  // Identify which sections are included vs missing.
  const sectionsIncluded = record.sectionResults.map((sr) => sr.sectionId)
  const sectionsMissing = exam.sections
    .map((s) => s.id)
    .filter((id) => !sectionsIncluded.includes(id))

  const overallBand = computeOverallBand(sectionBands, exam.scoring.overallRule)

  return {
    performanceRecord: record,
    sectionBands,
    overallBand,
    sectionsIncluded,
    sectionsMissing,
  }
}
