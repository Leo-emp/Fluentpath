import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'

const FILES = [
  'data/inventories/cefrj-vocabulary-profile-1.5.csv',
  'data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv',
  'data/inventories/cefrj-grammar-profile-20180315.csv',
]

describe('vendored inventory data', () => {
  it('has all three source files', () => {
    for (const f of FILES) expect(existsSync(f), `missing ${f}`).toBe(true)
  })

  it('has a SOURCES.md recording licence and attribution', () => {
    expect(existsSync('data/inventories/SOURCES.md')).toBe(true)
    const text = readFileSync('data/inventories/SOURCES.md', 'utf8')
    // Attribution is a legal obligation, so assert the required names appear.
    expect(text).toContain('CEFR-J')
    expect(text).toContain('Tono')
    expect(text).toContain('Octanove')
    expect(text).toContain('CC BY-SA')
    expect(text).toContain('WordNet')
    expect(text).toContain('Princeton')
  })
})
