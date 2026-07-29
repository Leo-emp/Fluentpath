import { describe, it, expect } from 'vitest'
import { checkWellFormed } from '@/items/wellformed'
import type { McqItem } from '@/items/types'

function item(optionTexts: string[]): McqItem {
  return {
    id: 'test',
    stem: 'I ______ my keys.',
    options: optionTexts.map((text, i) => ({
      text,
      misconception: i === 0 ? null : 'uses a form the auxiliary cannot take',
    })),
    correctIndex: 0,
    nodeIds: ['gram.b1.present_perfect'],
    level: 'B1',
  }
}

const codes = (i: McqItem) => checkWellFormed(i).map((x) => x.code)

describe('the real failure this was built for', () => {
  it('rejects "have lose"', () => {
    // From a generated lesson: offered alongside three plausible options,
    // turning a four-option question into a three-option one.
    expect(codes(item(['have lost', 'have lose']))).toContain('MALFORMED_OPTION')
  })
})

describe('perfect aspect', () => {
  it('accepts a past participle after have', () => {
    expect(checkWellFormed(item(['have lost', 'have eaten']))).toHaveLength(0)
  })

  it('accepts an adverb between the auxiliary and the participle', () => {
    expect(checkWellFormed(item(['have never lost']))).toHaveLength(0)
  })

  it('accepts "has been"', () => {
    expect(checkWellFormed(item(['has been']))).toHaveLength(0)
  })
})

describe('modals', () => {
  it('rejects a modal followed by "to"', () => {
    expect(codes(item(['can go', 'must to go']))).toContain('MALFORMED_OPTION')
  })

  it('accepts a bare infinitive after a modal', () => {
    expect(checkWellFormed(item(['can go', 'should eat']))).toHaveLength(0)
  })
})

describe('basics', () => {
  it('rejects an empty option', () => {
    expect(codes(item(['have lost', '   ']))).toContain('MALFORMED_OPTION')
  })

  it('accepts ordinary single words', () => {
    expect(checkWellFormed(item(['lost', 'losing', 'loses']))).toHaveLength(0)
  })

  it('accepts a plain noun phrase', () => {
    expect(checkWellFormed(item(['the red car', 'a blue house']))).toHaveLength(0)
  })

  it('does not flag correct English it simply cannot parse', () => {
    // Silence must mean "no problem found", never "definitely correct" —
    // a gate that guesses would reject good items.
    expect(checkWellFormed(item(['notwithstanding the delay']))).toHaveLength(0)
  })
})

describe('verbs whose participle looks like the bare form', () => {
  // Found by measuring a batch of generated items: 9 of 10 passed, and the
  // one failure was this false positive. Unfixed it would have rejected every
  // correct item using read, put, cut, set, cost or hit.

  it('accepts "has read"', () => {
    expect(checkWellFormed(item(['has read']))).toHaveLength(0)
  })

  it('accepts the other invariant verbs after an auxiliary', () => {
    for (const phrase of ['have put', 'has cut', 'had set', 'have cost', 'has hit', 'have let']) {
      expect(checkWellFormed(item([phrase])), `rejected "${phrase}"`).toHaveLength(0)
    }
  })

  it('still rejects a regular bare verb after an auxiliary', () => {
    expect(checkWellFormed(item(['have lose']))).not.toHaveLength(0)
  })
})
