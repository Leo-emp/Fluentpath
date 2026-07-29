import { describe, it, expect } from 'vitest'
import { parseCsv } from '@/inventory/csv'

describe('parseCsv', () => {
  it('parses headers and rows', () => {
    const rows = parseCsv('a,b\n1,2\n3,4')
    expect(rows).toEqual([
      { a: '1', b: '2' },
      { a: '3', b: '4' },
    ])
  })

  it('handles quoted fields containing commas', () => {
    const rows = parseCsv('a,b\n"x,y",z')
    expect(rows[0]).toEqual({ a: 'x,y', b: 'z' })
  })

  it('trims whitespace around values', () => {
    expect(parseCsv('a,b\n  x ,  y ')[0]).toEqual({ a: 'x', b: 'y' })
  })

  it('tolerates CRLF line endings', () => {
    expect(parseCsv('a,b\r\n1,2\r\n')).toEqual([{ a: '1', b: '2' }])
  })

  it('skips blank lines', () => {
    expect(parseCsv('a\n1\n\n2\n')).toEqual([{ a: '1' }, { a: '2' }])
  })

  it('fills missing trailing cells with empty strings', () => {
    expect(parseCsv('a,b,c\n1,2')[0]).toEqual({ a: '1', b: '2', c: '' })
  })

  it('returns an empty array for an empty input', () => {
    expect(parseCsv('')).toEqual([])
  })
})
