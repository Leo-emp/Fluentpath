import { describe, it, expect } from 'vitest'
import { getRubric, listRubrics, computeOverallScore } from '@/writing/rubrics'
import type { CriterionScore } from '@/writing/types'

describe('CEFR rubrics', () => {
  it('has rubrics for every CEFR level A1 through C2', () => {
    for (const level of ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']) {
      const rubric = getRubric(`cefr_${level}`)
      expect(rubric, `missing rubric cefr_${level}`).not.toBeNull()
    }
  })

  it('every CEFR rubric has exactly 4 criteria', () => {
    const rubrics = listRubrics().filter((r) => r.exam === 'cefr')
    for (const rubric of rubrics) {
      expect(
        rubric.criteria.length,
        `${rubric.id} has wrong criteria count`,
      ).toBe(4)
    }
  })

  it('criterion weights sum to 1', () => {
    const rubrics = listRubrics()
    for (const rubric of rubrics) {
      const sum = rubric.criteria.reduce((s, c) => s + c.weight, 0)
      expect(Math.abs(sum - 1)).toBeLessThan(0.001)
    }
  })

  it('every criterion has descriptors covering the full score range', () => {
    const rubric = getRubric('cefr_b1')!
    for (const criterion of rubric.criteria) {
      const scores = criterion.descriptors.map((d) => d.score)
      expect(scores).toContain(rubric.scoreRange.min)
      expect(scores).toContain(rubric.scoreRange.max)
    }
  })

  it('descriptors are sorted by score ascending', () => {
    for (const rubric of listRubrics()) {
      for (const criterion of rubric.criteria) {
        for (let i = 1; i < criterion.descriptors.length; i++) {
          expect(criterion.descriptors[i]!.score).toBeGreaterThan(
            criterion.descriptors[i - 1]!.score,
          )
        }
      }
    }
  })

  it('every descriptor has a non-empty description', () => {
    for (const rubric of listRubrics()) {
      for (const criterion of rubric.criteria) {
        for (const desc of criterion.descriptors) {
          expect(
            desc.description.length,
            `${rubric.id}.${criterion.id}@${desc.score}`,
          ).toBeGreaterThan(10)
        }
      }
    }
  })

  it('A1/A2 use 0–3 scale, B1–C2 use 0–5 scale', () => {
    expect(getRubric('cefr_a1')!.scoreRange.max).toBe(3)
    expect(getRubric('cefr_a2')!.scoreRange.max).toBe(3)
    expect(getRubric('cefr_b1')!.scoreRange.max).toBe(5)
    expect(getRubric('cefr_c2')!.scoreRange.max).toBe(5)
  })
})

describe('computeOverallScore', () => {
  it('computes a weighted average', () => {
    const rubric = getRubric('cefr_b1')!
    const scores: CriterionScore[] = rubric.criteria.map((c) => ({
      criterionId: c.id,
      criterionName: c.name,
      score: 3,
      maxScore: 5,
      evidence: [],
      feedback: '',
    }))
    // All criteria scored 3/5 → overall 3
    expect(computeOverallScore(scores, rubric)).toBe(3)
  })

  it('respects different weights', () => {
    const rubric = getRubric('cefr_b1')!
    const scores: CriterionScore[] = rubric.criteria.map((c, i) => ({
      criterionId: c.id,
      criterionName: c.name,
      score: i === 0 ? 5 : 1,
      maxScore: 5,
      evidence: [],
      feedback: '',
    }))
    const result = computeOverallScore(scores, rubric)
    // With equal 0.25 weights: (5+1+1+1)/4 = 2.0
    expect(result).toBe(2)
  })

  it('rounds to the nearest step', () => {
    const rubric = getRubric('cefr_b1')!
    const scores: CriterionScore[] = rubric.criteria.map((c) => ({
      criterionId: c.id,
      criterionName: c.name,
      score: 3,
      maxScore: 5,
      evidence: [],
      feedback: '',
    }))
    const result = computeOverallScore(scores, rubric)
    // With step=1, result must be an integer
    expect(result % rubric.scoreRange.step).toBe(0)
  })
})
