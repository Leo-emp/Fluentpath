import { describe, it, expect } from 'vitest'
import { generateId } from '@/db/id'

describe('generateId', () => {
  it('returns a string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
  })

  it('returns a valid UUID v4 format', () => {
    const id = generateId()
    // UUID v4 format: 8-4-4-4-12 hex digits.
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    expect(id).toMatch(uuidRegex)
  })

  it('generates unique IDs', () => {
    const ids = Array.from({ length: 100 }, () => generateId())
    const unique = new Set(ids)
    // All 100 should be different.
    expect(unique.size).toBe(100)
  })
})
