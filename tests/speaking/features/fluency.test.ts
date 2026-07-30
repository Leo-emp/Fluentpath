import { describe, it, expect } from 'vitest'
import { extractFluency } from '@/speaking/features/fluency'
import type { SttResult } from '@/speaking/types'

// A fixture: 10 words over 3.5 seconds with one 800ms pause and one filler.
function sttFixture(): SttResult {
  return {
    transcript: 'I think the city is um a very nice place',
    words: [
      { word: 'I', startMs: 0, endMs: 200, confidence: 0.99 },
      { word: 'think', startMs: 210, endMs: 500, confidence: 0.98 },
      { word: 'the', startMs: 510, endMs: 650, confidence: 0.97 },
      { word: 'city', startMs: 660, endMs: 1000, confidence: 0.96 },
      { word: 'is', startMs: 1010, endMs: 1200, confidence: 0.99 },
      // 800ms pause here (1200 → 2000)
      { word: 'um', startMs: 2000, endMs: 2200, confidence: 0.60 },
      { word: 'a', startMs: 2250, endMs: 2350, confidence: 0.99 },
      { word: 'very', startMs: 2360, endMs: 2600, confidence: 0.98 },
      { word: 'nice', startMs: 2610, endMs: 2900, confidence: 0.97 },
      { word: 'place', startMs: 2910, endMs: 3300, confidence: 0.96 },
    ],
    durationMs: 3500,
    phonemes: null,
  }
}

describe('extractFluency', () => {
  const features = extractFluency(sttFixture())

  it('computes speech rate in words per minute (excluding fillers)', () => {
    // 9 non-filler words in 3.5 seconds → ~154 wpm
    expect(features.speechRateWpm).toBeGreaterThan(100)
    expect(features.speechRateWpm).toBeLessThan(200)
  })

  it('computes articulation rate higher than speech rate', () => {
    // Articulation rate excludes pause time, so it's always >= speech rate.
    expect(features.articulationRateWpm).toBeGreaterThan(
      features.speechRateWpm,
    )
  })

  it('counts pauses above 250ms threshold', () => {
    // One 800ms pause between "is" (endMs=1200) and "um" (startMs=2000).
    expect(features.pauseCount).toBeGreaterThanOrEqual(1)
  })

  it('computes mean pause duration', () => {
    expect(features.meanPauseDurationMs).toBeGreaterThan(200)
  })

  it('counts filler words', () => {
    // "um" is in the filler set.
    expect(features.fillerCount).toBe(1)
  })

  it('computes mean length of run (words between pauses)', () => {
    expect(features.meanLengthOfRunWords).toBeGreaterThan(0)
  })

  it('handles empty word list gracefully', () => {
    const empty: SttResult = {
      transcript: '',
      words: [],
      durationMs: 0,
      phonemes: null,
    }
    const f = extractFluency(empty)
    expect(f.speechRateWpm).toBe(0)
    expect(f.articulationRateWpm).toBe(0)
    expect(f.pauseCount).toBe(0)
    expect(f.fillerCount).toBe(0)
    expect(f.meanLengthOfRunWords).toBe(0)
  })

  it('handles single word', () => {
    const single: SttResult = {
      transcript: 'hello',
      words: [{ word: 'hello', startMs: 0, endMs: 500, confidence: 0.95 }],
      durationMs: 1000,
      phonemes: null,
    }
    const f = extractFluency(single)
    expect(f.speechRateWpm).toBe(60) // 1 word in 1 second = 60 wpm
    expect(f.pauseCount).toBe(0)
    expect(f.meanLengthOfRunWords).toBe(1)
  })

  it('does not count fillers in speech rate', () => {
    // 3 words total, 2 fillers — only 1 real word.
    const fillerHeavy: SttResult = {
      transcript: 'um uh hello',
      words: [
        { word: 'um', startMs: 0, endMs: 200, confidence: 0.5 },
        { word: 'uh', startMs: 300, endMs: 500, confidence: 0.5 },
        { word: 'hello', startMs: 600, endMs: 1000, confidence: 0.9 },
      ],
      durationMs: 1000,
      phonemes: null,
    }
    const f = extractFluency(fillerHeavy)
    // 1 real word / (1000ms / 60000) = 60 wpm
    expect(f.speechRateWpm).toBe(60)
    expect(f.fillerCount).toBe(2)
  })
})
