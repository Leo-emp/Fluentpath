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
  // Each of these profiled as A2 before phrases were matched — measured, not
  // suspected. Kept as regression tests so the defect cannot silently return.

  it('recognises "gave up" as above A2', () => {
    const r = profileText('She gave up smoking last year.', inventory)
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('recognises "look after" as above A2', () => {
    const r = profileText('Please look after my cat while I am away.', inventory)
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('recognises a sentence with two phrasal verbs as clearly above A2', () => {
    const r = profileText('The committee carried out a review and put off the decision.', inventory)
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('flags the phrase itself when targeting A2', () => {
    const r = profileText('She gave up smoking.', inventory, 'A2')
    const phrases = r.aboveLevel.filter((i) => i.isPhrase).map((i) => i.lemma)
    expect(phrases).toContain('give up')
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
