import { describe, it, expect } from 'vitest'
import {
  ValidationError,
  requireString,
  requireNumber,
  optionalNumber,
  optionalArray,
  optionalObject,
  requireArray,
} from '@/app/api/_lib/validate'

describe('requireString', () => {
  it('returns the value when present', () => {
    expect(requireString({ name: 'alice' }, 'name')).toBe('alice')
  })

  it('throws on missing field', () => {
    expect(() => requireString({}, 'name')).toThrow(ValidationError)
  })

  it('throws on empty string', () => {
    expect(() => requireString({ name: '' }, 'name')).toThrow(ValidationError)
  })

  it('throws on non-string', () => {
    expect(() => requireString({ name: 42 }, 'name')).toThrow(ValidationError)
  })
})

describe('requireNumber', () => {
  it('returns the value when present', () => {
    expect(requireNumber({ count: 5 }, 'count')).toBe(5)
  })

  it('throws on missing field', () => {
    expect(() => requireNumber({}, 'count')).toThrow(ValidationError)
  })

  it('throws on NaN', () => {
    expect(() => requireNumber({ count: NaN }, 'count')).toThrow(ValidationError)
  })
})

describe('optionalNumber', () => {
  it('returns the value when present', () => {
    expect(optionalNumber({ n: 3 }, 'n')).toBe(3)
  })

  it('returns undefined when absent', () => {
    expect(optionalNumber({}, 'n')).toBeUndefined()
  })

  it('throws on wrong type', () => {
    expect(() => optionalNumber({ n: 'three' }, 'n')).toThrow(ValidationError)
  })
})

describe('optionalArray', () => {
  it('returns the array when present', () => {
    expect(optionalArray({ ids: [1, 2] }, 'ids')).toEqual([1, 2])
  })

  it('returns undefined when absent', () => {
    expect(optionalArray({}, 'ids')).toBeUndefined()
  })

  it('throws on non-array', () => {
    expect(() => optionalArray({ ids: 'nope' }, 'ids')).toThrow(ValidationError)
  })
})

describe('optionalObject', () => {
  it('returns the object when present', () => {
    expect(optionalObject({ plan: { a: 1 } }, 'plan')).toEqual({ a: 1 })
  })

  it('returns undefined when absent', () => {
    expect(optionalObject({}, 'plan')).toBeUndefined()
  })

  it('throws on array (not an object)', () => {
    expect(() => optionalObject({ plan: [1] }, 'plan')).toThrow(ValidationError)
  })
})

describe('requireArray', () => {
  it('returns the array when present', () => {
    expect(requireArray({ items: [1] }, 'items')).toEqual([1])
  })

  it('throws on missing field', () => {
    expect(() => requireArray({}, 'items')).toThrow(ValidationError)
  })

  it('throws on non-array', () => {
    expect(() => requireArray({ items: 'nope' }, 'items')).toThrow(ValidationError)
  })
})
