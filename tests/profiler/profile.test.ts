import { describe, it, expect } from 'vitest'
import { profileText, type ProfilerInventory } from '@/profiler/profile'
import type { CefrLevel } from '@/skill-graph/types'

/** Phrases default to confidence 1 (stated) unless a tuple supplies one. */
function inv(
  words: Record<string, CefrLevel>,
  phrases: Record<string, CefrLevel | [CefrLevel, number]> = {},
): ProfilerInventory {
  return {
    words: new Map(Object.entries(words)) as Map<string, CefrLevel>,
    phrases: new Map(
      Object.entries(phrases).map(([phrase, value]) =>
        Array.isArray(value)
          ? [phrase, { level: value[0], confidence: value[1] }]
          : [phrase, { level: value, confidence: 1 }],
      ),
    ),
  }
}

describe('single words', () => {
  it('counts matched words by level', () => {
    const r = profileText('the cat', inv({ the: 'A1', cat: 'A1' }))
    expect(r.matched).toBe(2)
    expect(r.counts.A1).toBe(2)
  })

  it('matches inflected forms via lemmatisation', () => {
    const r = profileText('cats', inv({ cat: 'A1' }))
    expect(r.matched).toBe(1)
  })

  it('reports unmatched words', () => {
    const r = profileText('the frobnicator', inv({ the: 'A1' }))
    expect(r.unmatched).toContain('frobnicator')
  })

  it('separates proper nouns from unmatched words', () => {
    const r = profileText('I visited London', inv({ i: 'A1', visit: 'A1' }))
    expect(r.properNouns).toContain('London')
    expect(r.unmatched).not.toContain('London')
  })

  it('ignores punctuation', () => {
    expect(profileText('cat, cat.', inv({ cat: 'A1' })).matched).toBe(2)
  })
})

describe('multi-word phrases', () => {
  it('matches a phrase rather than its parts', () => {
    const r = profileText(
      'She gave up smoking',
      inv({ she: 'A1', give: 'A1', up: 'A1', smoke: 'A2' }, { 'give up': 'B1' }),
    )
    expect(r.counts.B1).toBe(1)
    // give and up must NOT also be counted individually — only "she" is A1.
    expect(r.counts.A1).toBe(1)
  })

  it('prefers the longest phrase when several match', () => {
    const r = profileText(
      'I look forward to it',
      inv(
        { i: 'A1', look: 'A1', forward: 'A2', to: 'A1', it: 'A1' },
        { 'look forward': 'B1', 'look forward to': 'B2' },
      ),
    )
    expect(r.counts.B2).toBe(1)
    expect(r.counts.B1).toBe(0)
  })

  it('matches a phrase whose verb is inflected', () => {
    const r = profileText(
      'He carried out the plan',
      inv({ he: 'A1', carry: 'A1', out: 'A1', the: 'A1', plan: 'A2' }, { 'carry out': 'B2' }),
    )
    expect(r.counts.B2).toBe(1)
  })
})

describe('level reporting', () => {
  it('reports the level at which 90% coverage is reached', () => {
    const easy = ['cat', 'dog', 'run', 'jump', 'blue', 'green', 'happy', 'small', 'quick']
    const words: Record<string, CefrLevel> = { ubiquitous: 'C1' }
    for (const w of easy) words[w] = 'A1'

    // Nine A1 words and one C1 word: 90% coverage is reached at A1.
    const r = profileText(`${easy.join(' ')} ubiquitous`, inv(words))
    expect(r.coverageLevel).toBe('A1')
  })

  it('skips numeric tokens entirely', () => {
    const r = profileText('the 2018 cat', inv({ the: 'A1', cat: 'A1' }))
    expect(r.totalTokens).toBe(2)
    expect(r.unmatched).toHaveLength(0)
  })

  it('never invents a word by stripping digits out of a token', () => {
    // Stripping rather than skipping would turn "3D" into "D" and "web2" into
    // "web", counting words that were never in the text.
    const r = profileText('3D web2', inv({ d: 'A1', web: 'A2' }))
    expect(r.matched).toBe(0)
    expect(r.unmatched).toHaveLength(0)
    expect(r.totalTokens).toBe(0)
  })

  it('lists items above the target level', () => {
    const r = profileText('easy hard', inv({ easy: 'A1', hard: 'B2' }), 'A2')
    expect(r.aboveLevel.map((i) => i.lemma)).toContain('hard')
    expect(r.aboveLevel.map((i) => i.lemma)).not.toContain('easy')
  })

  it('flags an above-level phrase', () => {
    const r = profileText(
      'She gave up',
      inv({ she: 'A1', give: 'A1', up: 'A1' }, { 'give up': 'B1' }),
      'A2',
    )
    expect(r.aboveLevel[0]).toMatchObject({ lemma: 'give up', level: 'B1', isPhrase: true })
  })

  it('reports the unmatched rate', () => {
    const r = profileText('cat dog', inv({ cat: 'A1' }))
    expect(r.unmatchedRate).toBeCloseTo(0.5)
  })

  it('reports a low-confidence phrase separately without moving the level', () => {
    // "go to" derived at B1 must not make a beginner sentence read as B1.
    const r = profileText(
      'I go to school',
      inv({ i: 'A1', go: 'A1', to: 'A1', school: 'A1' }, { 'go to': ['B1', 0.7] }),
    )
    expect(r.coverageLevel).toBe('A1')
    expect(r.counts.B1).toBe(0)
    expect(r.uncertainPhrases.map((i) => i.lemma)).toEqual(['go to'])
  })

  it('still lets a stated phrase level move the measured level', () => {
    const r = profileText(
      'I go to school',
      inv({ i: 'A1', go: 'A1', to: 'A1', school: 'A1' }, { 'go to': 'B1' }),
    )
    expect(r.counts.B1).toBe(1)
    expect(r.uncertainPhrases).toHaveLength(0)
  })

  it('handles empty text without dividing by zero', () => {
    const r = profileText('', inv({}))
    expect(r.totalTokens).toBe(0)
    expect(r.unmatchedRate).toBe(0)
    expect(r.coverageLevel).toBeNull()
  })
})
