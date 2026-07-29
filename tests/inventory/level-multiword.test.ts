import { describe, it, expect } from 'vitest'
import { buildLexicalLookup, deriveMultiwordLevel } from '@/inventory/level-multiword'
import type { LexicalEntry } from '@/inventory/types'

function entry(headword: string, level: LexicalEntry['level'], pos = 'verb'): LexicalEntry {
  return { headword, pos, level, source: 'test', levelSource: 'source', confidence: 1 }
}

const lookup = buildLexicalLookup([
  entry('give', 'A1'),
  entry('up', 'A1', 'preposition'),
  entry('look', 'A1'),
  entry('after', 'A1', 'preposition'),
  entry('carry', 'A1'),
  entry('out', 'A1', 'preposition'),
  entry('abandon', 'B1'),
  entry('ship', 'A2', 'noun'),
])

describe('buildLexicalLookup', () => {
  it('keeps the lowest level across parts of speech', () => {
    const l = buildLexicalLookup([entry('water', 'B2', 'verb'), entry('water', 'A1', 'noun')])
    expect(l.get('water')).toBe('A1')
  })
})

describe('deriveMultiwordLevel', () => {
  it('is at least as hard as its hardest component', () => {
    expect(deriveMultiwordLevel('abandon ship', lookup).level).toBe('B1')
  })

  it('raises an idiomatic phrase two levels above its components', () => {
    // give (A1) + up (A1), but "give up" means quit. Cambridge places it at
    // B1 — two levels above its parts, which is typical for phrasal verbs.
    expect(deriveMultiwordLevel('give up', lookup, { idiomatic: true }).level).toBe('B1')
  })

  it('leaves a transparent phrase at its component level', () => {
    expect(deriveMultiwordLevel('carry out', lookup, { idiomatic: false }).level).toBe('A1')
  })

  it('never exceeds C2 when raising', () => {
    const l = buildLexicalLookup([entry('arcane', 'C2'), entry('lore', 'C2')])
    expect(deriveMultiwordLevel('arcane lore', l, { idiomatic: true }).level).toBe('C2')
  })

  it('reports lower confidence than a stated level', () => {
    expect(deriveMultiwordLevel('give up', lookup, { idiomatic: true }).confidence).toBeLessThan(1)
  })

  it('reports lower confidence when a component is unknown', () => {
    const known = deriveMultiwordLevel('abandon ship', lookup).confidence
    const partial = deriveMultiwordLevel('abandon frobnicate', lookup).confidence
    expect(partial).toBeLessThan(known)
  })

  it('falls back to B1 when no component is known', () => {
    // Mid-scale is the least-wrong default when there is no evidence at all.
    const r = deriveMultiwordLevel('frobnicate quux', lookup)
    expect(r.level).toBe('B1')
    expect(r.confidence).toBeLessThan(0.5)
  })
})
