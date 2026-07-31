import { describe, it, expect } from 'vitest'
import { extractPronunciation } from '@/speaking/features/pronunciation'
import type { SttResult } from '@/speaking/types'

describe('extractPronunciation', () => {
  it('computes mean word confidence', () => {
    const stt: SttResult = {
      transcript: 'hello world',
      words: [
        { word: 'hello', startMs: 0, endMs: 400, confidence: 0.9 },
        { word: 'world', startMs: 500, endMs: 900, confidence: 0.8 },
      ],
      durationMs: 1000,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    expect(f.meanWordConfidence).toBe(0.85)
  })

  it('identifies low-confidence words below 0.6 threshold', () => {
    const stt: SttResult = {
      transcript: 'I specifically want',
      words: [
        { word: 'I', startMs: 0, endMs: 200, confidence: 0.99 },
        { word: 'specifically', startMs: 300, endMs: 900, confidence: 0.42 },
        { word: 'want', startMs: 1000, endMs: 1300, confidence: 0.95 },
      ],
      durationMs: 1500,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    expect(f.lowConfidenceWords).toHaveLength(1)
    expect(f.lowConfidenceWords[0]!.word).toBe('specifically')
    expect(f.lowConfidenceWords[0]!.confidence).toBe(0.42)
  })

  it('returns empty array when all words are high-confidence', () => {
    const stt: SttResult = {
      transcript: 'hello there',
      words: [
        { word: 'hello', startMs: 0, endMs: 400, confidence: 0.95 },
        { word: 'there', startMs: 500, endMs: 800, confidence: 0.92 },
      ],
      durationMs: 1000,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    expect(f.lowConfidenceWords).toHaveLength(0)
  })

  it('handles empty word list', () => {
    const stt: SttResult = {
      transcript: '',
      words: [],
      durationMs: 0,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    expect(f.meanWordConfidence).toBe(0)
    expect(f.lowConfidenceWords).toHaveLength(0)
  })

  it('flags multiple low-confidence words', () => {
    const stt: SttResult = {
      transcript: 'the particularly enthusiastic archaeologist',
      words: [
        { word: 'the', startMs: 0, endMs: 200, confidence: 0.98 },
        { word: 'particularly', startMs: 300, endMs: 800, confidence: 0.35 },
        { word: 'enthusiastic', startMs: 900, endMs: 1500, confidence: 0.40 },
        { word: 'archaeologist', startMs: 1600, endMs: 2300, confidence: 0.28 },
      ],
      durationMs: 2500,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    expect(f.lowConfidenceWords).toHaveLength(3)
  })

  it('preserves timing data on flagged words', () => {
    const stt: SttResult = {
      transcript: 'specifically',
      words: [
        { word: 'specifically', startMs: 500, endMs: 1200, confidence: 0.4 },
      ],
      durationMs: 1500,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    expect(f.lowConfidenceWords[0]!.startMs).toBe(500)
    expect(f.lowConfidenceWords[0]!.endMs).toBe(1200)
  })

  it('returns null phonemeAccuracy when no phoneme data', () => {
    const stt: SttResult = {
      transcript: 'hello',
      words: [{ word: 'hello', startMs: 0, endMs: 400, confidence: 0.9 }],
      durationMs: 500,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    expect(f.phonemeAccuracy).toBeNull()
    expect(f.mispronounced).toHaveLength(0)
  })

  it('computes phoneme accuracy when phoneme data is available', () => {
    const stt: SttResult = {
      transcript: 'think',
      words: [{ word: 'think', startMs: 0, endMs: 500, confidence: 0.7 }],
      durationMs: 600,
      phonemes: [
        { phoneme: 'θ', expected: 'θ', accuracy: 0.3, word: 'think' },
        { phoneme: 'ɪ', expected: 'ɪ', accuracy: 0.9, word: 'think' },
        { phoneme: 'ŋ', expected: 'ŋ', accuracy: 0.8, word: 'think' },
        { phoneme: 'k', expected: 'k', accuracy: 0.95, word: 'think' },
      ],
    }
    const f = extractPronunciation(stt)
    expect(f.phonemeAccuracy).toBeGreaterThan(0)
    expect(f.phonemeAccuracy).toBeLessThan(1)
    // θ at 0.3 is below the 0.5 threshold — should be flagged.
    expect(f.mispronounced).toHaveLength(1)
    expect(f.mispronounced[0]!.phoneme).toBe('θ')
    expect(f.mispronounced[0]!.word).toBe('think')
  })
})
