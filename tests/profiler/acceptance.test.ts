import { describe, it, expect } from 'vitest'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { profileText } from '@/profiler/profile'
import { levelIndex } from '@/skill-graph/types'

const inventory = buildProfilerInventory()

describe('inventory is populated from the real sources', () => {
  it('has the expected order of magnitude of words', () => {
    expect(inventory.words.size).toBeGreaterThan(8000)
  })

  it('has the multi-word verbs from WordNet', () => {
    expect(inventory.phrases.size).toBeGreaterThan(2500)
    for (const p of ['give up', 'look after', 'carry out', 'put off']) {
      expect(inventory.phrases.has(p), `missing phrase "${p}"`).toBe(true)
    }
  })
})

describe('the measured defect is fixed', () => {
  // Before phrases were matched at all, each of these profiled as A2 — the
  // profiler saw only easy component words. Measured, not suspected. Kept as
  // regression tests so the blind spot cannot silently return.
  //
  // These phrases are in the curated list, so their levels are confident and
  // do move the measured level of the text.

  it('rates "gave up" above A2', () => {
    const r = profileText('She gave up smoking last year.', inventory)
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('rates "look after" above A2', () => {
    const r = profileText('Please look after my cat while I am away.', inventory)
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('rates a sentence with two phrasal verbs above A2', () => {
    const r = profileText('The committee carried out a review and put off the decision.', inventory)
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('flags the phrase itself when targeting A2', () => {
    const r = profileText('She gave up smoking.', inventory, 'A2')
    expect(r.aboveLevel.filter((i) => i.isPhrase).map((i) => i.lemma)).toContain('give up')
  })

  it('matches the phrase rather than counting its parts separately', () => {
    const r = profileText('She gave up smoking.', inventory)
    const singles = r.aboveLevel.concat(r.uncertainPhrases).filter((i) => !i.isPhrase)
    expect(singles.map((i) => i.lemma)).not.toContain('give')
  })

  it('places the common phrasal verbs at their curated levels', () => {
    expect(inventory.phrases.get('give up')).toMatchObject({ level: 'B1' })
    expect(inventory.phrases.get('carry out')).toMatchObject({ level: 'B2' })
    expect(inventory.phrases.get('eke out')).toMatchObject({ level: 'C2' })
  })
})

describe('does not inflate simple text', () => {
  // The regression this design exists to prevent. Treating every WordNet
  // multi-word verb as idiomatic made "I live in a small house. I go to
  // school by bus." profile as B1.

  it('keeps a beginner sentence full of transparent phrases at A1', () => {
    const r = profileText(
      'My name is Anna. I live in a small house with my family. I go to school by bus.',
      inventory,
    )
    expect(r.coverageLevel).toBe('A1')
  })

  it('levels the transparent phrases correctly rather than inflating them', () => {
    // The fix: these are curated at A1, so they neither inflate the text nor
    // fall through to a derivation that would guess B1.
    expect(inventory.phrases.get('go to')).toMatchObject({ level: 'A1' })
    expect(inventory.phrases.get('live in')).toMatchObject({ level: 'A1' })
    expect(inventory.phrases.get('look at')).toMatchObject({ level: 'A1' })
  })

  it('separates a transparent phrase from an idiomatic one built of the same words', () => {
    // Both are two A1 words. Only one is hard.
    expect(inventory.phrases.get('go to')?.level).toBe('A1')
    expect(inventory.phrases.get('give up')?.level).toBe('B1')
  })
})

describe('still discriminates level on ordinary prose', () => {
  it('rates simple everyday text at A1 or A2', () => {
    const r = profileText(
      'My name is Anna. I live in a small house with my family. I eat bread and drink milk. ' +
        'Then I go to school by bus. I like my teacher because she is kind.',
      inventory,
    )
    expect(levelIndex(r.coverageLevel!)).toBeLessThanOrEqual(levelIndex('A2'))
  })

  it('rates academic prose at C1 or C2, with many unknown words', () => {
    const r = profileText(
      'The ubiquity of algorithmic mediation has engendered considerable scholarly disquiet, ' +
        'particularly regarding the opacity of proprietary systems whose deliberations remain ' +
        'inaccessible to scrutiny.',
      inventory,
    )
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThanOrEqual(levelIndex('C1'))
    // Advanced text uses words outside an A1-C2 inventory; that rate is itself
    // an independent level signal.
    expect(r.unmatchedRate).toBeGreaterThan(0.15)
  })
})
