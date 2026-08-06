import { describe, it, expect } from 'vitest'
import { checkGiveaway } from '@/items/giveaway'
import type { McqItem } from '@/items/types'

function item(stem: string, nodeIds = ['gram.b1.pp_vs_past_simple']): McqItem {
  return {
    id: 'test',
    type: 'mcq' as const,
    stem,
    options: [
      { text: 'went', misconception: null },
      { text: 'have gone', misconception: 'treats a finished time as still open' },
    ],
    correctIndex: 0,
    nodeIds,
    level: 'B1',
  }
}

describe('the real failure this was built for', () => {
  it('rejects "We ______ to Japan in 2018."', () => {
    // From a generated lesson. The year fixes the tense before the learner
    // reads the options, so the item measures date-spotting.
    const issues = checkGiveaway(item('We ______ to Japan in 2018.'))
    expect(issues.some((i) => i.code === 'STEM_GIVEAWAY')).toBe(true)
  })
})

describe('finished-time markers', () => {
  it('rejects "yesterday"', () => {
    expect(checkGiveaway(item('I ______ that film yesterday.'))).not.toHaveLength(0)
  })

  it('rejects "last week"', () => {
    expect(checkGiveaway(item('She ______ to Paris last week.'))).not.toHaveLength(0)
  })

  it('rejects "ago"', () => {
    expect(checkGiveaway(item('They ______ ten minutes ago.'))).not.toHaveLength(0)
  })
})

describe('unfinished-time markers', () => {
  it('rejects "since"', () => {
    expect(checkGiveaway(item('He ______ here since 2019.'))).not.toHaveLength(0)
  })

  it('rejects "so far"', () => {
    expect(checkGiveaway(item('We ______ three chapters so far.'))).not.toHaveLength(0)
  })
})

describe('items that genuinely test understanding', () => {
  it('accepts a stem with no time marker', () => {
    // Nothing here resolves the tense — the learner must weigh whether the
    // result still matters. That is the actual skill.
    expect(checkGiveaway(item('I ______ my keys. I cannot open the door.'))).toHaveLength(0)
  })

  it('accepts a stem whose context is meaning rather than a marker', () => {
    expect(checkGiveaway(item('She ______ in Spain, and she still lives there.'))).toHaveLength(0)
  })
})

describe('scope', () => {
  it('ignores items that are not about the tense contrast', () => {
    // "yesterday" is unremarkable in a vocabulary item.
    const vocab = item('I bought bread yesterday.', ['lex.a2.food'])
    expect(checkGiveaway(vocab)).toHaveLength(0)
  })

  it('applies to a present perfect item', () => {
    const pp = item('I ______ that film yesterday.', ['gram.b1.present_perfect'])
    expect(checkGiveaway(pp)).not.toHaveLength(0)
  })
})
