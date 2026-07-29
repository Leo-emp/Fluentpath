import { describe, it, expect } from 'vitest'
import { checkMisconceptions } from '@/items/misconceptions'
import type { McqItem } from '@/items/types'

function item(
  options: Array<[text: string, misconception: string | null]>,
  correctIndex = 0,
): McqItem {
  return {
    id: 'test',
    stem: 'I ______ my keys.',
    options: options.map(([text, misconception]) => ({ text, misconception })),
    correctIndex,
    nodeIds: ['gram.b1.present_perfect'],
    level: 'B1',
  }
}

const GOOD = 'uses past simple where the result still matters now'

describe('missing misconceptions', () => {
  it('rejects a distractor with no misconception', () => {
    const issues = checkMisconceptions(item([['have lost', null], ['lost', null]]))
    expect(issues.some((i) => i.code === 'NO_MISCONCEPTION' && i.severity === 'reject')).toBe(true)
  })

  it('rejects a distractor with an empty misconception', () => {
    const issues = checkMisconceptions(item([['have lost', null], ['lost', '   ']]))
    expect(issues.some((i) => i.code === 'NO_MISCONCEPTION')).toBe(true)
  })

  it('accepts a distractor with a specific misconception', () => {
    const issues = checkMisconceptions(item([['have lost', null], ['lost', GOOD]]))
    expect(issues).toHaveLength(0)
  })
})

describe('vague misconceptions', () => {
  it('rejects one that merely restates that the answer is wrong', () => {
    const issues = checkMisconceptions(item([['have lost', null], ['lost', 'wrong tense']]))
    expect(issues.some((i) => i.code === 'VAGUE_MISCONCEPTION')).toBe(true)
  })

  it('rejects a one-word misconception', () => {
    const issues = checkMisconceptions(item([['have lost', null], ['lost', 'incorrect']]))
    expect(issues.some((i) => i.code === 'VAGUE_MISCONCEPTION')).toBe(true)
  })

  it('rejects "distractor" as a misconception', () => {
    const issues = checkMisconceptions(item([['have lost', null], ['lost', 'just a distractor']]))
    expect(issues.some((i) => i.code === 'VAGUE_MISCONCEPTION')).toBe(true)
  })
})

describe('duplicate misconceptions', () => {
  it('warns when two distractors describe the same confusion', () => {
    const issues = checkMisconceptions(
      item([
        ['have lost', null],
        ['lost', GOOD],
        ['was losing', GOOD],
      ]),
    )
    expect(issues.some((i) => i.code === 'DUPLICATE_MISCONCEPTION' && i.severity === 'warn')).toBe(true)
  })

  it('does not warn when the confusions differ', () => {
    const issues = checkMisconceptions(
      item([
        ['have lost', null],
        ['lost', GOOD],
        ['was losing', 'treats a completed action as ongoing'],
      ]),
    )
    expect(issues).toHaveLength(0)
  })
})

describe('the correct option', () => {
  it('warns when the correct option carries a misconception', () => {
    const issues = checkMisconceptions(item([['have lost', 'something'], ['lost', GOOD]]))
    expect(issues.some((i) => i.code === 'NO_MISCONCEPTION' && i.severity === 'warn')).toBe(true)
  })

  it('respects a correctIndex other than zero', () => {
    const issues = checkMisconceptions(item([['lost', GOOD], ['have lost', null]], 1))
    expect(issues).toHaveLength(0)
  })
})
