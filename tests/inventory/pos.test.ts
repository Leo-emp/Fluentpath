import { describe, it, expect } from 'vitest'
import { normalisePos } from '@/inventory/pos'

describe('normalisePos', () => {
  it('passes through standard tags', () => {
    expect(normalisePos('noun')).toBe('noun')
    expect(normalisePos('verb')).toBe('verb')
    expect(normalisePos('adjective')).toBe('adjective')
    expect(normalisePos('adverb')).toBe('adverb')
  })

  it('is case and whitespace tolerant', () => {
    expect(normalisePos('  NOUN ')).toBe('noun')
  })

  it("maps CEFR-J's verb variants onto verb", () => {
    expect(normalisePos('be-verb')).toBe('verb')
    expect(normalisePos('do-verb')).toBe('verb')
    expect(normalisePos('have-verb')).toBe('verb')
    expect(normalisePos('modal auxiliary')).toBe('verb')
  })

  it('maps remaining CEFR-J tags', () => {
    expect(normalisePos('determiner')).toBe('determiner')
    expect(normalisePos('preposition')).toBe('preposition')
    expect(normalisePos('conjunction')).toBe('conjunction')
    expect(normalisePos('pronoun')).toBe('pronoun')
    expect(normalisePos('interjection')).toBe('interjection')
    expect(normalisePos('number')).toBe('number')
    expect(normalisePos('infinitive-to')).toBe('other')
  })

  it("repairs Octanove's 'vern' typo", () => {
    expect(normalisePos('vern')).toBe('verb')
  })

  it('maps blank and unknown to other', () => {
    expect(normalisePos('')).toBe('other')
    expect(normalisePos('sparkle')).toBe('other')
  })
})
