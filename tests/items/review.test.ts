import { describe, it, expect } from 'vitest'
import { reviewItem } from '@/items/review'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { McqItem } from '@/items/types'

const inventory = buildProfilerInventory()

function item(over: Partial<McqItem> = {}): McqItem {
  return {
    id: 'test',
    type: 'mcq' as const,
    stem: 'I ______ my keys. I cannot open the door.',
    options: [
      { text: 'have lost', misconception: null },
      { text: 'lost', misconception: 'uses past simple where the result still matters now' },
      { text: 'was losing', misconception: 'treats a completed action as ongoing' },
      { text: 'am losing', misconception: 'treats a finished event as happening right now' },
    ],
    correctIndex: 0,
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    level: 'B1',
    ...over,
  }
}

const codes = (i: McqItem) => reviewItem(i, { inventory }).issues.map((x) => x.code)

describe('a well-built item', () => {
  it('passes every gate', () => {
    const review = reviewItem(item(), { inventory })
    expect(review.passed, JSON.stringify(review.issues, null, 2)).toBe(true)
    // Tense-contrast items may get AMBIGUOUS_KEY warnings (distractors are
    // grammatically valid), but no rejects.
    expect(review.issues.filter((i) => i.severity === 'reject')).toHaveLength(0)
  })
})

describe('structure', () => {
  it('rejects fewer than three options', () => {
    const two = item({
      options: [
        { text: 'have lost', misconception: null },
        { text: 'lost', misconception: 'uses past simple where the result still matters' },
      ],
    })
    expect(codes(two)).toContain('STRUCTURE')
  })

  it('rejects duplicate options', () => {
    const dupe = item({
      options: [
        { text: 'have lost', misconception: null },
        { text: 'lost', misconception: 'uses past simple where the result still matters' },
        { text: 'lost', misconception: 'treats a completed action as ongoing' },
      ],
    })
    expect(codes(dupe)).toContain('STRUCTURE')
  })

  it('rejects an out-of-range correctIndex', () => {
    expect(codes(item({ correctIndex: 9 }))).toContain('STRUCTURE')
  })
})

describe('length tell', () => {
  it('warns when the correct option is far longer than the rest', () => {
    const telling = item({
      options: [
        { text: 'have lost them somewhere in the house', misconception: null },
        { text: 'lost', misconception: 'uses past simple where the result still matters' },
        { text: 'losing', misconception: 'treats a completed action as ongoing' },
      ],
    })
    const review = reviewItem(telling, { inventory })
    expect(review.issues.map((i) => i.code)).toContain('LENGTH_TELL')
    // A tell is a warning, not a rejection — the item may still be usable.
    expect(review.issues.find((i) => i.code === 'LENGTH_TELL')?.severity).toBe('warn')
  })
})

describe('level', () => {
  it('rejects a stem written above the level it targets', () => {
    const tooHard = item({
      stem: 'Notwithstanding the delay, I ______ my keys.',
      level: 'A2',
    })
    expect(codes(tooHard)).toContain('ABOVE_LEVEL')
  })

  it('accepts a stem at or below the target level', () => {
    expect(codes(item({ level: 'C1' }))).not.toContain('ABOVE_LEVEL')
  })
})

describe('the gates compose', () => {
  it('reports every problem in a badly built item at once', () => {
    const bad = item({
      stem: 'We ______ to Japan in 2018.',
      options: [
        { text: 'went', misconception: null },
        { text: 'have gone', misconception: 'wrong' },
        { text: 'have go', misconception: null },
      ],
    })
    const found = new Set(codes(bad))
    expect(found.has('STEM_GIVEAWAY')).toBe(true)
    expect(found.has('MALFORMED_OPTION')).toBe(true)
    expect(found.has('VAGUE_MISCONCEPTION')).toBe(true)
    expect(found.has('NO_MISCONCEPTION')).toBe(true)
    expect(reviewItem(bad, { inventory }).passed).toBe(false)
  })
})
