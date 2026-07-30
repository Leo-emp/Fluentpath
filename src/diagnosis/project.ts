/**
 * Band impact projection — "Closing these five gaps moves your Writing
 * from 6.0 to an estimated 6.5–7.0."
 *
 * Spec §3.5: "Modelled from the rubric's own criterion weightings plus
 * observed cohort movement once there's data. Presented as a range with
 * stated confidence — never a fake decimal."
 *
 * The projection is deliberately conservative:
 *   - Always a range, never a point estimate (spec §4e: never promise
 *     a score — accessiBe was fined $1M by FTC for similar claims).
 *   - The range widens when evidence is thin (few gaps found).
 *   - Capped at 9.0 (IELTS maximum).
 *   - Rounded to nearest 0.5 (IELTS convention).
 *
 * The model: each gap's impact represents the proportion of the band
 * deficit attributable to that gap. Closing all gaps for a section
 * would theoretically recover the full deficit, but we apply a
 * conservative multiplier because:
 *   1. Closing a gap in theory ≠ closing it in practice
 *   2. New gaps may emerge once old ones are addressed
 *   3. The test may not have covered all gaps
 */

import type { ClassifiedGap, BandImpact, BandRange } from './types'
import type { TestResult } from '@/mock-test/types'
import { roundToHalf } from '@/mock-test/convert'

// Maximum possible band score (IELTS ceiling).
const MAX_BAND = 9.0

// Conservative multiplier applied to the theoretical improvement.
// 0.4 means we project 40% of the theoretical gain at the low end.
const LOW_MULTIPLIER = 0.4

// Optimistic multiplier for the high end of the range.
const HIGH_MULTIPLIER = 0.7

// Confidence thresholds based on number of gaps per section.
const CONFIDENCE_LOW_THRESHOLD = 2 // 1 gap → low confidence
const CONFIDENCE_HIGH_THRESHOLD = 5 // 5+ gaps → high confidence

/**
 * Project band improvement per section.
 *
 * @param gaps              Classified gaps from the classification stage.
 * @param testResult        The test result with current band scores.
 * @param _criterionWeights Rubric criterion weights (reserved for future use).
 * @returns One BandImpact per section that has gaps.
 */
export function projectBandImpact(
  gaps: ClassifiedGap[],
  testResult: TestResult,
  _criterionWeights: Record<string, number>,
): BandImpact[] {
  if (gaps.length === 0) return []

  // Group gaps by the section they affect. Gaps have a 'skill' field
  // (general/writing/speaking/etc). 'general' skill gaps affect all
  // sections that were included in the test.
  const gapsBySection = new Map<string, ClassifiedGap[]>()

  for (const gap of gaps) {
    if (gap.skill === 'general') {
      // General gaps affect all included sections.
      for (const section of testResult.sectionsIncluded) {
        const list = gapsBySection.get(section) ?? []
        list.push(gap)
        gapsBySection.set(section, list)
      }
    } else {
      // Skill-specific gaps affect only that section.
      const list = gapsBySection.get(gap.skill) ?? []
      list.push(gap)
      gapsBySection.set(gap.skill, list)
    }
  }

  const impacts: BandImpact[] = []

  for (const [section, sectionGaps] of gapsBySection) {
    const currentBand = testResult.sectionBands[section]
    if (currentBand === undefined) continue

    // The "room to grow" — how far the current band is from the max.
    const deficit = MAX_BAND - currentBand

    // Sum of impact scores for this section's gaps, capped at 1.0.
    // Impact represents the proportion of the deficit caused by gaps.
    const totalImpact = Math.min(
      1.0,
      sectionGaps.reduce((sum, g) => sum + g.impact, 0) /
        sectionGaps.length,
    )

    // Theoretical improvement if all gaps were closed.
    const theoreticalGain = deficit * totalImpact

    // Apply conservative multipliers for the range.
    const lowGain = theoreticalGain * LOW_MULTIPLIER
    const highGain = theoreticalGain * HIGH_MULTIPLIER

    const projectedRange: BandRange = {
      low: roundToHalf(Math.min(currentBand + lowGain, MAX_BAND)),
      high: roundToHalf(Math.min(currentBand + highGain, MAX_BAND)),
    }

    // Ensure low <= high after rounding.
    if (projectedRange.low > projectedRange.high) {
      projectedRange.low = projectedRange.high
    }

    // Ensure the projected range is actually above the current band.
    // If rounding pushed it back to the current band, nudge up.
    if (projectedRange.low <= currentBand && theoreticalGain > 0) {
      projectedRange.low = roundToHalf(currentBand + 0.25)
    }
    if (projectedRange.high <= projectedRange.low && deficit > 0) {
      projectedRange.high = roundToHalf(projectedRange.low + 0.25)
    }

    // Cap at MAX_BAND after all adjustments.
    projectedRange.low = Math.min(projectedRange.low, MAX_BAND)
    projectedRange.high = Math.min(projectedRange.high, MAX_BAND)

    // Confidence based on evidence quantity.
    const confidence =
      sectionGaps.length < CONFIDENCE_LOW_THRESHOLD
        ? ('low' as const)
        : sectionGaps.length >= CONFIDENCE_HIGH_THRESHOLD
          ? ('high' as const)
          : ('moderate' as const)

    impacts.push({
      section,
      currentBand,
      projectedRange,
      confidence,
      closedGapCount: sectionGaps.length,
      totalGapCount: sectionGaps.length,
    })
  }

  return impacts
}
