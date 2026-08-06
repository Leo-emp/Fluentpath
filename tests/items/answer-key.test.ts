import { describe, it, expect } from 'vitest'
import { checkAnswerKey } from '@/items/answer-key'
import type { McqItem } from '@/items/types'

function mcq(overrides: Partial<McqItem> = {}): McqItem {
  return {
    id: 'test.key',
    type: 'mcq' as const,
    stem: 'I ______ my keys. I cannot open the door.',
    options: [
      { text: 'have lost', misconception: null },
      { text: 'lost', misconception: 'uses past simple though the result still matters now' },
      { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
      { text: 'am losing', misconception: 'places a finished event in the present moment' },
    ],
    correctIndex: 0,
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    level: 'B1',
    ...overrides,
  }
}

describe('checkAnswerKey', () => {
  it('does not reject a well-formed item', () => {
    // AMBIGUOUS_KEY may warn (distractors are grammatically valid in
    // tense-contrast items), but nothing should reject.
    const issues = checkAnswerKey(mcq())
    expect(issues.filter((i) => i.severity === 'reject')).toHaveLength(0)
  })

  it('skips items without a blank', () => {
    const noBlank = mcq({ stem: 'Choose the correct form of the verb.' })
    expect(checkAnswerKey(noBlank)).toHaveLength(0)
  })

  it('rejects when the correct option is ungrammatical', () => {
    // correctIndex points to "have lose" which is broken English.
    const bad = mcq({
      options: [
        { text: 'have lose', misconception: null },
        { text: 'lost', misconception: 'uses past simple though the result still matters now' },
        { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
        { text: 'am losing', misconception: 'places a finished event in the present moment' },
      ],
    })
    const issues = checkAnswerKey(bad)
    expect(issues.some((i) => i.code === 'WRONG_KEY' && i.severity === 'reject')).toBe(true)
  })

  it('warns when no distractor is detectably wrong', () => {
    // All options are valid English — the gate can't tell which is "correct".
    const ambiguous = mcq({
      stem: 'She ______ to work every day.',
      options: [
        { text: 'walks', misconception: null },
        { text: 'drives', misconception: 'chooses driving over walking as the routine action' },
        { text: 'runs', misconception: 'chooses running over walking as the routine action' },
        { text: 'cycles', misconception: 'chooses cycling over walking as the routine action' },
      ],
    })
    const issues = checkAnswerKey(ambiguous)
    expect(issues.some((i) => i.code === 'AMBIGUOUS_KEY' && i.severity === 'warn')).toBe(true)
  })

  it('rejects a misconception that contradicts the option text', () => {
    // Distractor says "uses past simple" but the option is "has gone" (present perfect).
    const mismatch = mcq({
      options: [
        { text: 'have lost', misconception: null },
        { text: 'has gone', misconception: 'uses past simple for a current-result situation' },
        { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
        { text: 'am losing', misconception: 'places a finished event in the present moment' },
      ],
    })
    const issues = checkAnswerKey(mismatch)
    expect(issues.some((i) => i.code === 'MISCONCEPTION_MISMATCH' && i.severity === 'reject')).toBe(true)
  })

  it('does not reject when misconception does not name a tense', () => {
    // "treats a completed event as ongoing" doesn't name a specific tense,
    // so no cross-check is possible — no reject should fire.
    const issues = checkAnswerKey(mcq())
    expect(issues.filter((i) => i.severity === 'reject')).toHaveLength(0)
  })

  it('accepts invariant verb "has read" as a valid correct answer', () => {
    const item = mcq({
      stem: 'She ______ three books this month.',
      options: [
        { text: 'has read', misconception: null },
        { text: 'read', misconception: 'uses past simple for an unfinished time period' },
        { text: 'was reading', misconception: 'treats a quantity as a continuous action' },
        { text: 'reads', misconception: 'uses present simple for a recent achievement' },
      ],
    })
    const issues = checkAnswerKey(item)
    expect(issues.some((i) => i.code === 'WRONG_KEY')).toBe(false)
  })
})
