import { describe, it, expect } from 'vitest'
import { extractAllFeatures } from '@/speaking/features/extract'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { SttResult } from '@/speaking/types'

const inventory = buildProfilerInventory()

function sttFixture(): SttResult {
  return {
    transcript:
      'I think the city is a very nice place because there are many shops and restaurants',
    words: [
      { word: 'I', startMs: 0, endMs: 200, confidence: 0.99 },
      { word: 'think', startMs: 210, endMs: 500, confidence: 0.98 },
      { word: 'the', startMs: 510, endMs: 650, confidence: 0.97 },
      { word: 'city', startMs: 660, endMs: 1000, confidence: 0.96 },
      { word: 'is', startMs: 1010, endMs: 1200, confidence: 0.99 },
      { word: 'a', startMs: 1210, endMs: 1300, confidence: 0.99 },
      { word: 'very', startMs: 1310, endMs: 1500, confidence: 0.98 },
      { word: 'nice', startMs: 1510, endMs: 1700, confidence: 0.97 },
      { word: 'place', startMs: 1710, endMs: 2000, confidence: 0.96 },
      { word: 'because', startMs: 2010, endMs: 2400, confidence: 0.95 },
      { word: 'there', startMs: 2410, endMs: 2600, confidence: 0.97 },
      { word: 'are', startMs: 2610, endMs: 2750, confidence: 0.98 },
      { word: 'many', startMs: 2760, endMs: 2950, confidence: 0.96 },
      { word: 'shops', startMs: 2960, endMs: 3200, confidence: 0.95 },
      { word: 'and', startMs: 3210, endMs: 3350, confidence: 0.99 },
      { word: 'restaurants', startMs: 3360, endMs: 3800, confidence: 0.88 },
    ],
    durationMs: 4000,
    phonemes: null,
  }
}

describe('extractAllFeatures', () => {
  const features = extractAllFeatures(sttFixture(), inventory)

  it('returns all four feature groups', () => {
    expect(features).toHaveProperty('fluency')
    expect(features).toHaveProperty('lexical')
    expect(features).toHaveProperty('grammar')
    expect(features).toHaveProperty('pronunciation')
  })

  it('fluency has speech rate', () => {
    expect(features.fluency.speechRateWpm).toBeGreaterThan(0)
  })

  it('lexical has type-token ratio', () => {
    expect(features.lexical.typeTokenRatio).toBeGreaterThan(0)
    expect(features.lexical.typeTokenRatio).toBeLessThanOrEqual(1.0)
  })

  it('grammar has structures attempted', () => {
    expect(features.grammar.structuresAttempted).toBeGreaterThan(0)
  })

  it('pronunciation has mean word confidence', () => {
    expect(features.pronunciation.meanWordConfidence).toBeGreaterThan(0.5)
  })

  it('handles empty STT result', () => {
    const empty: SttResult = {
      transcript: '',
      words: [],
      durationMs: 0,
      phonemes: null,
    }
    const f = extractAllFeatures(empty, inventory)
    expect(f.fluency.speechRateWpm).toBe(0)
    expect(f.lexical.typeTokenRatio).toBe(0)
    expect(f.grammar.structuresAttempted).toBe(0)
    expect(f.pronunciation.meanWordConfidence).toBe(0)
  })
})
