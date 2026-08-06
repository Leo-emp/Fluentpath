import { describe, it, expect } from 'vitest'
import { checkTargeting } from '@/items/targeting'
import type { McqItem } from '@/items/types'

function mcq(overrides: Partial<McqItem> = {}): McqItem {
  return {
    id: 'test.target',
    type: 'mcq' as const,
    stem: 'I ______ my keys.',
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

describe('checkTargeting', () => {
  it('passes a well-targeted pp_vs_past_simple item', () => {
    // "have lost" (present perfect) vs "lost" (past simple) — both sides present.
    expect(checkTargeting(mcq())).toHaveLength(0)
  })

  it('skips non-grammar nodes', () => {
    const item = mcq({ nodeIds: ['cando.b1.understand_monologue'] })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('skips items with no nodeIds', () => {
    const item = mcq({ nodeIds: [] })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('rejects a present_perfect item with no present-perfect forms', () => {
    const item = mcq({
      nodeIds: ['gram.b1.present_perfect'],
      options: [
        { text: 'went', misconception: null },
        { text: 'walked', misconception: 'uses a different past-tense verb' },
        { text: 'ran', misconception: 'uses running instead of going' },
        { text: 'drove', misconception: 'uses driving instead of going' },
      ],
    })
    const issues = checkTargeting(item)
    expect(issues.some((i) => i.code === 'OFF_TARGET' && i.severity === 'reject')).toBe(true)
  })

  it('warns when a contrast node only has one side', () => {
    // pp_vs_past_simple needs both present perfect AND past simple.
    // This item has present perfect but no past simple forms.
    const item = mcq({
      nodeIds: ['gram.b1.pp_vs_past_simple'],
      options: [
        { text: 'have been', misconception: null },
        { text: 'have gone', misconception: 'confuses the verb but keeps the right tense' },
        { text: 'have seen', misconception: 'confuses the verb but keeps the right tense' },
        { text: 'have done', misconception: 'confuses the verb but keeps the right tense' },
      ],
    })
    const issues = checkTargeting(item)
    expect(issues.some((i) => i.code === 'OFF_TARGET' && i.severity === 'warn')).toBe(true)
  })

  it('passes a modals item with modal verbs in options', () => {
    const item = mcq({
      nodeIds: ['gram.b1.modals'],
      options: [
        { text: 'should go', misconception: null },
        { text: 'must go', misconception: 'uses obligation instead of advice' },
        { text: 'might go', misconception: 'uses possibility instead of advice' },
        { text: 'go', misconception: 'omits the modal entirely' },
      ],
    })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('passes a past_simple item with past-tense forms', () => {
    const item = mcq({
      nodeIds: ['gram.a2.past_simple'],
      options: [
        { text: 'went', misconception: null },
        { text: 'go', misconception: 'uses present form for a past event' },
        { text: 'going', misconception: 'uses the gerund for a completed action' },
        { text: 'goes', misconception: 'uses third-person present for a past event' },
      ],
    })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('rejects a passive item with no passive forms', () => {
    const item = mcq({
      nodeIds: ['gram.b2.passive'],
      options: [
        { text: 'runs', misconception: null },
        { text: 'ran', misconception: 'uses past tense instead of passive' },
        { text: 'running', misconception: 'uses gerund instead of passive' },
        { text: 'run', misconception: 'uses bare form instead of passive' },
      ],
    })
    const issues = checkTargeting(item)
    expect(issues.some((i) => i.code === 'OFF_TARGET' && i.severity === 'reject')).toBe(true)
  })

  it('passes when nodeId segment is not in the lookup table', () => {
    // Unknown grammar structure — no pattern defined, so the gate
    // cannot check it and should not guess.
    const item = mcq({ nodeIds: ['gram.c2.cleft_sentences'] })
    expect(checkTargeting(item)).toHaveLength(0)
  })
})
