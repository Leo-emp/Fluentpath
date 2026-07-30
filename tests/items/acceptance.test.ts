import { describe, it, expect } from 'vitest'
import { reviewItem } from '@/items/review'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { McqItem } from '@/items/types'

const inventory = buildProfilerInventory()

/**
 * The two questions from the sample lesson generated earlier in development.
 *
 * Both were critiqued by hand and found wanting. This is the test of whether
 * the gate finds what a careful reader found — written exactly as they were,
 * with no misconceptions supplied, because none were.
 */

const QUESTION_ONE: McqItem = {
  id: 'sample-1',
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'lost', misconception: null },
    { text: 'have lost', misconception: null },
    { text: 'have lose', misconception: null },
    { text: 'was losing', misconception: null },
  ],
  correctIndex: 1,
  nodeIds: ['gram.b1.pp_vs_past_simple'],
  level: 'B1',
}

const QUESTION_TWO: McqItem = {
  id: 'sample-2',
  stem: 'We ______ to Japan in 2018.',
  options: [
    { text: 'went', misconception: null },
    { text: 'have gone', misconception: null },
    { text: 'have been going', misconception: null },
    { text: 'has gone', misconception: null },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past_simple'],
  level: 'B1',
}

describe('question 1 — the broken-English distractor', () => {
  const review = reviewItem(QUESTION_ONE, { inventory })
  const codes = review.issues.map((i) => i.code)

  it('is rejected', () => {
    expect(review.passed).toBe(false)
  })

  it('catches "have lose" as not plausible English', () => {
    const malformed = review.issues.filter((i) => i.code === 'MALFORMED_OPTION')
    expect(malformed).not.toHaveLength(0)
    expect(malformed.some((i) => i.message.includes('have lose'))).toBe(true)
  })

  it('also catches the missing misconceptions I had not flagged', () => {
    // Found by hand: the broken distractor. Found additionally by the gate:
    // no option explains why a learner would choose it, so the item cannot
    // feed the diagnosis engine at all.
    expect(codes).toContain('NO_MISCONCEPTION')
  })
})

describe('question 2 — answerable without understanding', () => {
  const review = reviewItem(QUESTION_TWO, { inventory })
  const codes = review.issues.map((i) => i.code)

  it('is rejected', () => {
    expect(review.passed).toBe(false)
  })

  it('catches the year as a giveaway', () => {
    const giveaway = review.issues.filter((i) => i.code === 'STEM_GIVEAWAY')
    expect(giveaway).not.toHaveLength(0)
    expect(giveaway.some((i) => i.message.includes('2018'))).toBe(true)
  })

  it('also catches the missing misconceptions', () => {
    expect(codes).toContain('NO_MISCONCEPTION')
  })
})

describe('the repaired versions pass', () => {
  // Repairing exactly the faults the gate reported must be sufficient to make
  // an item acceptable. If it were not, the gate would be reporting something
  // other than what it requires.

  it('accepts question 1 with a real distractor and stated misconceptions', () => {
    const repaired: McqItem = {
      ...QUESTION_ONE,
      options: [
        { text: 'lost', misconception: 'uses past simple though the result still matters now' },
        { text: 'have lost', misconception: null },
        { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
        { text: 'am losing', misconception: 'treats a finished event as happening at this moment' },
      ],
      correctIndex: 1,
    }
    const review = reviewItem(repaired, { inventory })
    expect(review.passed, JSON.stringify(review.issues, null, 2)).toBe(true)
  })

  it('accepts question 2 once the date is replaced by meaning', () => {
    const repaired: McqItem = {
      ...QUESTION_TWO,
      // The learner must now decide from context whether the trip is a
      // finished event or a life experience — the actual skill.
      stem: 'We ______ to Japan, and we still talk about it.',
      options: [
        { text: 'went', misconception: null },
        {
          text: 'have gone',
          misconception: 'uses present perfect for a completed trip with a known occasion',
        },
        {
          text: 'have been going',
          misconception: 'treats a single completed trip as a repeated habit',
        },
        { text: 'has gone', misconception: 'fails to agree the auxiliary with a plural subject' },
      ],
      correctIndex: 0,
    }
    const review = reviewItem(repaired, { inventory })
    expect(review.passed, JSON.stringify(review.issues, null, 2)).toBe(true)
  })
})
