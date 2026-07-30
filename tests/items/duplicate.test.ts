import { describe, it, expect } from 'vitest'
import { checkDuplicate, jaccardBigram, normalizeStem } from '@/items/duplicate'
import type { McqItem } from '@/items/types'

function mcq(stem: string): McqItem {
  return {
    id: 'test.dup',
    stem,
    options: [
      { text: 'have lost', misconception: null },
      { text: 'lost', misconception: 'uses past simple though the result still matters now' },
      { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    ],
    correctIndex: 0,
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    level: 'B1',
  }
}

describe('normalizeStem', () => {
  it('lowercases and strips punctuation', () => {
    expect(normalizeStem('Hello, World!')).toBe('hello world')
  })

  it('replaces blank markers with standard token', () => {
    expect(normalizeStem('I ______ my keys.')).toBe('i _blank_ my keys')
  })

  it('collapses whitespace', () => {
    expect(normalizeStem('too   much    space')).toBe('too much space')
  })
})

describe('jaccardBigram', () => {
  it('returns 1 for identical strings', () => {
    expect(jaccardBigram('the cat sat', 'the cat sat')).toBe(1)
  })

  it('returns 0 for completely different strings', () => {
    expect(jaccardBigram('the cat sat', 'dogs run fast')).toBe(0)
  })

  it('returns a value between 0 and 1 for partial overlap', () => {
    const sim = jaccardBigram('the cat sat on the mat', 'the cat sat on the floor')
    expect(sim).toBeGreaterThan(0.3)
    expect(sim).toBeLessThan(1)
  })

  it('returns 0 for empty inputs', () => {
    expect(jaccardBigram('', '')).toBe(0)
  })

  it('ignores punctuation differences', () => {
    expect(jaccardBigram('Hello, world!', 'hello world')).toBe(1)
  })
})

describe('checkDuplicate', () => {
  it('passes when no existing stems match', () => {
    const item = mcq('I ______ my keys. I cannot open the door.')
    const existing = ['She ______ to school every day.']
    expect(checkDuplicate(item, existing)).toHaveLength(0)
  })

  it('rejects a near-identical stem', () => {
    const item = mcq('I ______ my keys. I cannot open the door.')
    const existing = ['I ______ my keys. I cannot open the door.']
    const issues = checkDuplicate(item, existing)
    expect(issues.some((i) => i.code === 'NEAR_DUPLICATE' && i.severity === 'reject')).toBe(true)
  })

  it('rejects a stem with trivial rewording', () => {
    const item = mcq('I ______ my keys. I cannot open the front door.')
    const existing = ['I ______ my keys. I cannot open the door.']
    const issues = checkDuplicate(item, existing)
    // With such high overlap, should be at least a warning.
    expect(issues.some((i) => i.code === 'NEAR_DUPLICATE')).toBe(true)
  })

  it('passes when stems are sufficiently different', () => {
    const item = mcq('She ______ to the store to buy groceries for dinner.')
    const existing = ['I ______ my keys. I cannot open the door.']
    expect(checkDuplicate(item, existing)).toHaveLength(0)
  })

  it('passes with an empty bank', () => {
    const item = mcq('I ______ my keys.')
    expect(checkDuplicate(item, [])).toHaveLength(0)
  })

  it('stops after the first reject (no need to check the rest)', () => {
    const item = mcq('I ______ my keys. I cannot open the door.')
    const existing = [
      'I ______ my keys. I cannot open the door.',
      'I ______ my keys. I cannot open the door.',
    ]
    const issues = checkDuplicate(item, existing)
    // Should return exactly one reject, not two.
    expect(issues.filter((i) => i.severity === 'reject')).toHaveLength(1)
  })
})
