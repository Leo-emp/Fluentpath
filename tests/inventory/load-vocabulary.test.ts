import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { loadVocabulary } from '@/inventory/load-vocabulary'

const CEFRJ = 'headword,pos,CEFR,CoreInventory 1,CoreInventory 2,Threshold\n'
const OCT = 'headword,pos,CEFR,notes\n'

describe('loadVocabulary', () => {
  it('loads a simple entry', () => {
    const out = loadVocabulary(CEFRJ + 'cat,noun,A1,,,', OCT)
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({
      headword: 'cat',
      pos: 'noun',
      level: 'A1',
      levelSource: 'source',
      confidence: 1,
    })
  })

  it('lowercases headwords', () => {
    expect(loadVocabulary(CEFRJ + 'March,noun,A1,,,', OCT)[0]?.headword).toBe('march')
  })

  it('splits slash-separated spelling variants into separate entries', () => {
    const out = loadVocabulary(CEFRJ + 'airplane/aeroplane,noun,A1,,,', OCT)
    expect(out.map((e) => e.headword).sort()).toEqual(['aeroplane', 'airplane'])
  })

  it('keeps the lowest level when a headword+pos repeats', () => {
    const out = loadVocabulary(CEFRJ + 'march,noun,B1,,,\nmarch,noun,A1,,,', OCT)
    expect(out).toHaveLength(1)
    expect(out[0]?.level).toBe('A1')
  })

  it('treats different parts of speech as separate entries', () => {
    const out = loadVocabulary(CEFRJ + 'water,noun,A1,,,\nwater,verb,B2,,,', OCT)
    expect(out).toHaveLength(2)
  })

  it('normalises CEFR-J verb variants', () => {
    expect(loadVocabulary(CEFRJ + 'be,be-verb,A1,,,', OCT)[0]?.pos).toBe('verb')
  })

  it('merges the Octanove C1/C2 file', () => {
    const out = loadVocabulary(CEFRJ + 'cat,noun,A1,,,', OCT + 'timid,adjective,C1,')
    expect(out).toHaveLength(2)
    expect(out.find((e) => e.headword === 'timid')?.level).toBe('C1')
  })

  it('repairs the Octanove vern typo', () => {
    expect(loadVocabulary(CEFRJ, OCT + 'remonstrate,vern,C2,')[0]?.pos).toBe('verb')
  })

  it('keeps an entry whose pos is blank, as other', () => {
    expect(loadVocabulary(CEFRJ, OCT + 'batter,,C1,')[0]?.pos).toBe('other')
  })

  it('skips rows with no parseable level', () => {
    expect(loadVocabulary(CEFRJ + 'ghost,noun,,,,', OCT)).toHaveLength(0)
  })

  it('records which dataset each entry came from', () => {
    const out = loadVocabulary(CEFRJ + 'cat,noun,A1,,,', OCT + 'timid,adjective,C1,')
    expect(out.find((e) => e.headword === 'cat')?.source).toBe('cefrj-1.5')
    expect(out.find((e) => e.headword === 'timid')?.source).toBe('octanove-c1c2-1.0')
  })
})

describe('against the real vendored files', () => {
  const entries = loadVocabulary(
    readFileSync('data/inventories/cefrj-vocabulary-profile-1.5.csv', 'utf8'),
    readFileSync('data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv', 'utf8'),
  )

  it('loads a realistic number of entries', () => {
    // 7,799 + 2,136 source rows, minus duplicates, plus slash-variant splits.
    expect(entries.length).toBeGreaterThan(9000)
    expect(entries.length).toBeLessThan(12000)
  })

  it('covers every level A1 to C2', () => {
    const levels = new Set(entries.map((e) => e.level))
    expect([...levels].sort()).toEqual(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  })

  it('places core words at A1', () => {
    const lowest = (w: string) =>
      entries
        .filter((e) => e.headword === w)
        .map((e) => e.level)
        .sort()[0]

    for (const w of ['the', 'be', 'have', 'go', 'want', 'water', 'house', 'good']) {
      expect(lowest(w), `${w} should be A1`).toBe('A1')
    }
  })

  it('places academic words above A2', () => {
    const lowest = (w: string) =>
      entries
        .filter((e) => e.headword === w)
        .map((e) => e.level)
        .sort()[0]

    expect(lowest('notwithstanding')).toBe('C1')
    expect(lowest('hypothesis')).toBe('C2')
  })
})
