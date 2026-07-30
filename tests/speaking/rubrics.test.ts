import { describe, it, expect } from 'vitest'
import { getSpeakingRubric, listSpeakingRubrics } from '@/speaking/rubrics'

describe('CEFR speaking rubrics', () => {
  it('has rubrics for every CEFR level A1 through C2', () => {
    for (const level of ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']) {
      const rubric = getSpeakingRubric(`cefr_${level}_speaking`)
      expect(rubric, `missing rubric cefr_${level}_speaking`).not.toBeNull()
    }
  })

  it('every CEFR speaking rubric has exactly 4 criteria', () => {
    const rubrics = listSpeakingRubrics().filter((r) => r.exam === 'cefr')
    for (const rubric of rubrics) {
      expect(rubric.criteria.length, `${rubric.id}`).toBe(4)
    }
  })

  it('criterion weights sum to 1', () => {
    for (const rubric of listSpeakingRubrics()) {
      const sum = rubric.criteria.reduce((s, c) => s + c.weight, 0)
      expect(Math.abs(sum - 1), `${rubric.id} weights sum to ${sum}`).toBeLessThan(0.001)
    }
  })

  it('descriptors are sorted by score ascending', () => {
    for (const rubric of listSpeakingRubrics()) {
      for (const criterion of rubric.criteria) {
        for (let i = 1; i < criterion.descriptors.length; i++) {
          expect(
            criterion.descriptors[i]!.score,
            `${rubric.id}.${criterion.id} desc[${i}]`,
          ).toBeGreaterThan(criterion.descriptors[i - 1]!.score)
        }
      }
    }
  })

  it('every descriptor has a non-empty description', () => {
    for (const rubric of listSpeakingRubrics()) {
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
})

describe('exam speaking rubrics', () => {
  it('has IELTS speaking rubric with 0-9 scale and 0.5 steps', () => {
    const rubric = getSpeakingRubric('ielts_speaking')
    expect(rubric).not.toBeNull()
    expect(rubric!.scoreRange).toEqual({ min: 0, max: 9, step: 0.5 })
  })

  it('IELTS speaking has 4 criteria', () => {
    const rubric = getSpeakingRubric('ielts_speaking')!
    expect(rubric.criteria).toHaveLength(4)
  })

  it('has PTE speaking rubric with 3 criteria', () => {
    const rubric = getSpeakingRubric('pte_speaking')
    expect(rubric).not.toBeNull()
    expect(rubric!.criteria).toHaveLength(3)
  })

  it('has OET speaking rubric with 5 criteria', () => {
    const rubric = getSpeakingRubric('oet_speaking')
    expect(rubric).not.toBeNull()
    expect(rubric!.criteria).toHaveLength(5)
  })

  it('returns null for unknown rubric id', () => {
    expect(getSpeakingRubric('nonexistent')).toBeNull()
  })
})
