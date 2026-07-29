import { describe, it, expect } from 'vitest'
import { parseCefrLevel } from '@/inventory/level-parser'

describe('plain levels', () => {
  it('parses a bare level', () => {
    expect(parseCefrLevel('A1')).toBe('A1')
    expect(parseCefrLevel('C2')).toBe('C2')
  })

  it('is case and whitespace tolerant', () => {
    expect(parseCefrLevel('  b1 ')).toBe('B1')
  })
})

describe('sub-levels', () => {
  it('collapses a sub-level to its major level', () => {
    expect(parseCefrLevel('A1.1')).toBe('A1')
    expect(parseCefrLevel('B2.2')).toBe('B2')
  })
})

describe('annotations', () => {
  it('strips a trailing asterisk', () => {
    expect(parseCefrLevel('B2.2*')).toBe('B2')
    expect(parseCefrLevel('B1*')).toBe('B1')
  })
})

describe('ranges', () => {
  it('takes the lowest level of an ASCII range', () => {
    expect(parseCefrLevel('A1-B1')).toBe('A1')
    expect(parseCefrLevel('B2-C1')).toBe('B2')
  })

  it('handles the Japanese full-width dash used in the real file', () => {
    expect(parseCefrLevel('A1ーB1')).toBe('A1')
  })

  it('handles parenthesised ranges', () => {
    expect(parseCefrLevel('A1-(A2)-B1')).toBe('A1')
  })

  it('handles comma lists', () => {
    expect(parseCefrLevel('B1, C2')).toBe('B1')
    expect(parseCefrLevel('A1,B1,B2')).toBe('A1')
  })
})

describe('absent values', () => {
  it('returns null for blank', () => {
    expect(parseCefrLevel('')).toBeNull()
    expect(parseCefrLevel('   ')).toBeNull()
  })

  it('returns null for N/A', () => {
    expect(parseCefrLevel('N/A')).toBeNull()
    expect(parseCefrLevel('n/a')).toBeNull()
  })

  it('returns null for unrecognisable text', () => {
    expect(parseCefrLevel('unknown')).toBeNull()
    expect(parseCefrLevel('Z9')).toBeNull()
  })
})
