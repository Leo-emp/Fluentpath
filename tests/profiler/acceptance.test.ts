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
  // Before phrases were matched at all, each of these was invisible — the
  // profiler saw only easy component words and reported A2. Kept as regression
  // tests so the blind spot cannot silently return.
  //
  // Note what is asserted: the phrase is DETECTED and surfaced, not that the
  // measured level rises. WordNet cannot reliably tell "carry out" (idiomatic)
  // from "go to" (transparent), so their derived levels are reported as
  // questions for review rather than asserted as measurements.

  const uncertain = (text: string) =>
    profileText(text, inventory).uncertainPhrases.map((i) => i.lemma)

  it('detects "give up"', () => {
    expect(uncertain('She gave up smoking last year.')).toContain('give up')
  })

  it('detects "look after"', () => {
    expect(uncertain('Please look after my cat while I am away.')).toContain('look after')
  })

  it('detects both phrasal verbs in one sentence', () => {
    const found = uncertain('The committee carried out a review and put off the decision.')
    expect(found).toContain('carry out')
    expect(found).toContain('put off')
  })

  it('matches the phrase rather than counting its parts separately', () => {
    const r = profileText('She gave up smoking.', inventory)
    // "give" and "up" must not appear as separate A1 hits — the phrase
    // consumed both tokens.
    const singles = r.aboveLevel.concat(r.uncertainPhrases).filter((i) => !i.isPhrase)
    expect(singles.map((i) => i.lemma)).not.toContain('give')
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

  it('still surfaces those transparent phrases for review', () => {
    const r = profileText('I live in a house and go to school.', inventory)
    // They are reported — a reviewer may confirm or dismiss them — but they
    // do not move the number.
    expect(r.uncertainPhrases.length).toBeGreaterThan(0)
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
