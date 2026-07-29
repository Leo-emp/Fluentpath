import { describe, it, expect } from 'vitest'
import { lemmaCandidates } from '@/profiler/lemmas'

describe('lemmaCandidates', () => {
  it('always includes the lowercased surface form', () => {
    expect(lemmaCandidates('Running', ['Verb'])).toContain('running')
  })

  it('recovers the infinitive of an inflected verb', () => {
    expect(lemmaCandidates('running', ['Verb', 'Gerund'])).toContain('run')
    expect(lemmaCandidates('eaten', ['Verb', 'PastTense'])).toContain('eat')
  })

  it('recovers the singular of a plural noun', () => {
    expect(lemmaCandidates('apples', ['Noun', 'Plural'])).toContain('apple')
  })

  it('handles irregular plurals', () => {
    expect(lemmaCandidates('children', ['Noun', 'Plural'])).toContain('child')
  })

  it('offers a suffix fallback for regular past tense', () => {
    expect(lemmaCandidates('walked', [])).toContain('walk')
  })

  it('offers both stems for -ing forms, with and without a restored e', () => {
    const c = lemmaCandidates('hoping', [])
    expect(c).toContain('hop')
    expect(c).toContain('hope')
  })

  it('strips -ly for adverbs', () => {
    expect(lemmaCandidates('quickly', ['Adverb'])).toContain('quick')
  })

  it('does not mangle short words', () => {
    expect(lemmaCandidates('is', [])).toContain('is')
    expect(lemmaCandidates('as', [])).toEqual(['as'])
  })

  it('returns unique candidates', () => {
    const c = lemmaCandidates('run', ['Verb'])
    expect(new Set(c).size).toBe(c.length)
  })
})
