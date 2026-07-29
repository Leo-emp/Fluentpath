import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { extractMultiwordVerbs } from '@/inventory/load-multiword'

describe('extractMultiwordVerbs', () => {
  it('extracts an underscore-joined lemma as a spaced phrase', () => {
    expect(extractMultiwordVerbs('give_up v 2 1 @ 2 0 01234567 02345678')).toEqual(['give up'])
  })

  it('ignores single-word lemmas', () => {
    expect(extractMultiwordVerbs('run v 1 1 @ 1 0 01234567')).toEqual([])
  })

  it('skips the licence header, whose lines begin with two spaces', () => {
    expect(extractMultiwordVerbs('  1 This software and database is being provided')).toEqual([])
  })

  it('deduplicates repeated lemmas', () => {
    expect(extractMultiwordVerbs('give_up v 1\ngive_up v 1')).toEqual(['give up'])
  })

  it('lowercases and ignores blank lines', () => {
    expect(extractMultiwordVerbs('\nGive_Up v 1\n')).toEqual(['give up'])
  })
})

describe('against the real WordNet database', () => {
  const text = readFileSync('node_modules/wordnet-db/dict/index.verb', 'utf8')
  const phrases = extractMultiwordVerbs(text)

  it('extracts the expected number of multi-word verbs', () => {
    // Verified directly against WordNet 3.1: 2,838 entries contain '_'.
    expect(phrases.length).toBeGreaterThan(2500)
    expect(phrases.length).toBeLessThan(3200)
  })

  it('contains the phrasal verbs the profiler currently misses', () => {
    for (const p of ['give up', 'look after', 'find out', 'carry out', 'put off', 'get on']) {
      expect(phrases, `missing "${p}"`).toContain(p)
    }
  })

  it('produces phrases with no underscores remaining', () => {
    expect(phrases.some((p) => p.includes('_'))).toBe(false)
  })
})
