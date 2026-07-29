import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { loadVocabulary } from '@/inventory/load-vocabulary'
import { measureDerivationAccuracy } from '@/inventory/validate-derivation'
import type { LexicalEntry } from '@/inventory/types'

function entry(headword: string, level: LexicalEntry['level']): LexicalEntry {
  return { headword, pos: 'other', level, source: 'test', levelSource: 'source', confidence: 1 }
}

describe('measureDerivationAccuracy', () => {
  it('reports perfect accuracy when derivation matches', () => {
    const entries = [entry('big', 'A1'), entry('house', 'A1'), entry('big house', 'A1')]
    const r = measureDerivationAccuracy(entries, 10, 1)
    expect(r.total).toBe(1)
    expect(r.exact).toBe(1)
    expect(r.exactRate).toBe(1)
  })

  it('counts a one-level miss as withinOne but not exact', () => {
    const entries = [entry('big', 'A1'), entry('house', 'A1'), entry('big house', 'A2')]
    const r = measureDerivationAccuracy(entries, 10, 1)
    expect(r.exact).toBe(0)
    expect(r.withinOne).toBe(1)
  })

  it('returns zeroed results when there is nothing to measure', () => {
    const r = measureDerivationAccuracy([entry('solo', 'A1')], 10, 1)
    expect(r).toMatchObject({ total: 0, exact: 0, exactRate: 0, withinOneRate: 0 })
  })

  it('is reproducible for a given seed', () => {
    const entries = [entry('big', 'A1'), entry('house', 'A1'), entry('big house', 'A2')]
    expect(measureDerivationAccuracy(entries, 1, 42)).toEqual(
      measureDerivationAccuracy(entries, 1, 42),
    )
  })
})

describe('measured accuracy on the real vocabulary', () => {
  const entries = loadVocabulary(
    readFileSync('data/inventories/cefrj-vocabulary-profile-1.5.csv', 'utf8'),
    readFileSync('data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv', 'utf8'),
  )
  const result = measureDerivationAccuracy(entries, 250, 20260729)

  it('has enough multi-word entries to measure against', () => {
    expect(result.total).toBeGreaterThan(50)
  })

  it('lands within one level most of the time', () => {
    // A floor, not a target. If this fails, the derivation rule in
    // level-multiword.ts is wrong and must be fixed — never the threshold.
    console.log(
      `\n  derivation accuracy: exact ${(result.exactRate * 100).toFixed(1)}%, ` +
        `within one level ${(result.withinOneRate * 100).toFixed(1)}% ` +
        `(n=${result.total})\n`,
    )
    expect(result.withinOneRate).toBeGreaterThan(0.6)
  })
})
