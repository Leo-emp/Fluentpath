import { describe, it, expect } from 'vitest'
// Import the side-effect module to register IELTS rubrics.
import '@/writing/rubrics-ielts'
import { getRubric } from '@/writing/rubrics'

describe('IELTS Task 1 rubric', () => {
  const rubric = getRubric('ielts_task1')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('has 4 criteria matching the published descriptors', () => {
    expect(rubric!.criteria.map((c) => c.id)).toEqual([
      'task_achievement',
      'coherence',
      'vocabulary',
      'grammar',
    ])
  })

  it('uses 0-9 band scale with 0.5 steps', () => {
    expect(rubric!.scoreRange).toEqual({ min: 0, max: 9, step: 0.5 })
  })

  it('has descriptors at every whole band 0 through 9', () => {
    for (const criterion of rubric!.criteria) {
      const scores = criterion.descriptors.map((d) => d.score)
      for (let band = 0; band <= 9; band++) {
        expect(scores, `${criterion.id} missing band ${band}`).toContain(band)
      }
    }
  })

  it('criterion weights sum to 1', () => {
    const sum = rubric!.criteria.reduce((s, c) => s + c.weight, 0)
    expect(Math.abs(sum - 1)).toBeLessThan(0.001)
  })

  it('every descriptor has a non-empty description', () => {
    for (const criterion of rubric!.criteria) {
      for (const desc of criterion.descriptors) {
        expect(
          desc.description.length,
          `${criterion.id}@${desc.score}`,
        ).toBeGreaterThan(10)
      }
    }
  })
})

describe('IELTS Task 2 rubric', () => {
  const rubric = getRubric('ielts_task2')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('uses Task Response as the first criterion (not Task Achievement)', () => {
    expect(rubric!.criteria[0]!.id).toBe('task_response')
  })

  it('uses 0-9 band scale', () => {
    expect(rubric!.scoreRange.max).toBe(9)
  })

  it('has band descriptors that distinguish it from Task 1', () => {
    const t1 = getRubric('ielts_task1')!
    const t2 = getRubric('ielts_task2')!
    // Task 1 uses "task_achievement", Task 2 uses "task_response"
    expect(t1.criteria[0]!.id).not.toBe(t2.criteria[0]!.id)
  })

  it('criterion weights sum to 1', () => {
    const sum = rubric!.criteria.reduce((s, c) => s + c.weight, 0)
    expect(Math.abs(sum - 1)).toBeLessThan(0.001)
  })

  it('has 4 criteria', () => {
    expect(rubric!.criteria).toHaveLength(4)
  })
})
