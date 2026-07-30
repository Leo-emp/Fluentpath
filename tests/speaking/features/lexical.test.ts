import { describe, it, expect } from 'vitest'
import { extractLexical } from '@/speaking/features/lexical'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { CEFR_LEVELS } from '@/skill-graph/types'
import type { SttResult } from '@/speaking/types'

const inventory = buildProfilerInventory()

function sttWith(transcript: string): SttResult {
  return {
    transcript,
    words: transcript.split(/\s+/).map((w, i) => ({
      word: w,
      startMs: i * 300,
      endMs: i * 300 + 250,
      confidence: 0.95,
    })),
    durationMs: transcript.split(/\s+/).length * 300,
    phonemes: null,
  }
}

describe('extractLexical', () => {
  it('computes type-token ratio', () => {
    // "the cat sat on the mat" — 6 words, 5 unique ("the" repeats)
    const f = extractLexical(sttWith('the cat sat on the mat'), inventory)
    expect(f.typeTokenRatio).toBeGreaterThan(0.5)
    expect(f.typeTokenRatio).toBeLessThanOrEqual(1.0)
  })

  it('produces vocabulary level profile with all CEFR levels', () => {
    const f = extractLexical(
      sttWith('I think the city is a very nice place'),
      inventory,
    )
    for (const level of CEFR_LEVELS) {
      expect(level in f.vocabularyLevelProfile).toBe(true)
    }
    // At least some words should be classified.
    const total = Object.values(f.vocabularyLevelProfile).reduce(
      (s, v) => s + v,
      0,
    )
    expect(total).toBeGreaterThan(0)
  })

  it('computes lexical density as proportion of content words', () => {
    const f = extractLexical(
      sttWith('The beautiful garden has many colourful flowers'),
      inventory,
    )
    // Should have some content words (nouns, adjectives, verbs).
    expect(f.lexicalDensity).toBeGreaterThan(0)
    expect(f.lexicalDensity).toBeLessThanOrEqual(1.0)
  })

  it('computes repetition rate', () => {
    // Heavy repetition: "the" appears 4 times in 8 words.
    const f = extractLexical(
      sttWith('the cat the dog the bird the fish'),
      inventory,
    )
    expect(f.repetitionRate).toBeGreaterThan(0)
  })

  it('handles empty transcript', () => {
    const f = extractLexical(
      { transcript: '', words: [], durationMs: 0, phonemes: null },
      inventory,
    )
    expect(f.typeTokenRatio).toBe(0)
    expect(f.lexicalDensity).toBe(0)
    expect(f.repetitionRate).toBe(0)
  })

  it('TTR is 1.0 when all words are unique', () => {
    const f = extractLexical(sttWith('cat dog bird fish'), inventory)
    expect(f.typeTokenRatio).toBe(1.0)
  })
})
