import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { loadGrammar, GRAMMAR_LEVEL_COLUMNS } from '@/inventory/load-grammar'

const HEAD =
  'ID,Shorthand Code,Grammatical Item,Sentence Type,CEFR-J Level,FREQ*DISP,Core Inventory,EGP,GSELO,Notes\n'

describe('loadGrammar', () => {
  it('uses the CEFR-J level when present', () => {
    const { entries } = loadGrammar(HEAD + '1,PP.I_am,I am,AFF. DEC.,A1.1,A1,A1,A1,A1,')
    expect(entries[0]).toMatchObject({
      id: 'PP.I_am',
      item: 'I am',
      level: 'A1',
      levelSource: 'source',
    })
  })

  it('falls back to EGP when the CEFR-J level is blank', () => {
    const { entries } = loadGrammar(HEAD + '2,X.y,thing,DEC.,,,,B1,,')
    expect(entries[0]?.level).toBe('B1')
  })

  it('falls back to Core Inventory when CEFR-J and EGP are absent', () => {
    const { entries } = loadGrammar(HEAD + '3,X.z,thing,DEC.,,,A2,N/A,,')
    expect(entries[0]?.level).toBe('A2')
  })

  it('falls back to GSELO last', () => {
    const { entries } = loadGrammar(HEAD + '4,X.w,thing,DEC.,,,,N/A,B2,')
    expect(entries[0]?.level).toBe('B2')
  })

  it('takes the lowest level of a range in a fallback column', () => {
    const { entries } = loadGrammar(HEAD + '5,X.v,thing,DEC.,,,A1-C1,,,')
    expect(entries[0]?.level).toBe('A1')
  })

  it('reports rows with no level anywhere instead of dropping them', () => {
    const { entries, unresolved } = loadGrammar(HEAD + '6,X.u,thing,DEC.,,,,N/A,,')
    expect(entries).toHaveLength(0)
    expect(unresolved).toEqual(['X.u'])
  })

  it('skips rows with no shorthand code', () => {
    const { entries } = loadGrammar(HEAD + '7,,thing,DEC.,A1,,,,,')
    expect(entries).toHaveLength(0)
  })

  it('falls back to frequency-derived level only as a last resort', () => {
    const { entries } = loadGrammar(HEAD + '8,X.t,thing,DEC.,,B1,,N/A,,')
    expect(entries[0]?.level).toBe('B1')
  })

  it('prefers a framework level over the frequency-derived one', () => {
    // FREQ*DISP says C1, but EGP says A2 — the expert judgement wins.
    const { entries } = loadGrammar(HEAD + '9,X.s,thing,DEC.,,C1,,A2,,')
    expect(entries[0]?.level).toBe('A2')
  })

  it('exposes the fallback order it uses', () => {
    expect(GRAMMAR_LEVEL_COLUMNS).toEqual([
      'CEFR-J Level',
      'EGP',
      'Core Inventory',
      'GSELO',
      'FREQ*DISP',
    ])
  })
})

describe('against the real vendored file', () => {
  const { entries, unresolved } = loadGrammar(
    readFileSync('data/inventories/cefrj-grammar-profile-20180315.csv', 'utf8'),
  )

  it('resolves the great majority of rows', () => {
    // Measured against the real file: 424 of 500 carry a level in some column.
    // An earlier estimate of 484 was wrong because it treated the literal
    // "N/A" as a level; EGP contains 151 of those.
    expect(entries.length).toBeGreaterThanOrEqual(420)
    expect(entries.length).toBeLessThanOrEqual(500)
  })

  it('leaves the genuinely unclassified rows unresolved', () => {
    // 76 rows carry no level anywhere: 63 have EGP="N/A", 10 have
    // Core Inventory="N/A", 16 are entirely blank. These are marginal
    // structures absent from every framework, not data we failed to read.
    expect(unresolved.length).toBeLessThanOrEqual(80)
  })

  it('produces unique ids', () => {
    const ids = entries.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers a spread of levels', () => {
    const levels = new Set(entries.map((e) => e.level))
    expect(levels.size).toBeGreaterThanOrEqual(4)
  })
})
