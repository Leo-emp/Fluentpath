import { describe, it, expect } from 'vitest'
// Import side-effect modules to register exam rubrics.
import '@/writing/rubrics-pte'
import '@/writing/rubrics-oet'
import { getRubric } from '@/writing/rubrics'

describe('PTE Written Essay rubric', () => {
  const rubric = getRubric('pte_essay')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('has 7 criteria matching the published PTE scoring', () => {
    expect(rubric!.criteria.map((c) => c.id)).toEqual([
      'content',
      'form',
      'development',
      'grammar',
      'linguistic_range',
      'vocabulary',
      'spelling',
    ])
  })

  it('content scores 0-3, other criteria score 0-2', () => {
    const content = rubric!.criteria.find((c) => c.id === 'content')!
    const form = rubric!.criteria.find((c) => c.id === 'form')!
    expect(content.descriptors[content.descriptors.length - 1]!.score).toBe(3)
    expect(form.descriptors[form.descriptors.length - 1]!.score).toBe(2)
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

describe('OET Writing rubric', () => {
  const rubric = getRubric('oet_writing')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('has 5 criteria matching published OET scoring', () => {
    expect(rubric!.criteria).toHaveLength(5)
    expect(rubric!.criteria.map((c) => c.id)).toEqual([
      'task_fulfilment',
      'appropriateness',
      'comprehension',
      'linguistic_features',
      'presentation',
    ])
  })

  it('uses 0-5 scale (mapped from A-E + 0)', () => {
    expect(rubric!.scoreRange).toEqual({ min: 0, max: 5, step: 1 })
  })

  it('criterion weights sum to 1', () => {
    const sum = rubric!.criteria.reduce((s, c) => s + c.weight, 0)
    expect(Math.abs(sum - 1)).toBeLessThan(0.001)
  })

  it('has 6 descriptors per criterion (0 through 5)', () => {
    for (const criterion of rubric!.criteria) {
      expect(criterion.descriptors).toHaveLength(6)
      expect(criterion.descriptors[0]!.score).toBe(0)
      expect(criterion.descriptors[5]!.score).toBe(5)
    }
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
