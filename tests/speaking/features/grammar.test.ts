import { describe, it, expect } from 'vitest'
import { extractGrammar } from '@/speaking/features/grammar'
import type { SttResult } from '@/speaking/types'

function sttWith(
  transcript: string,
  confidences?: number[],
): SttResult {
  const wordList = transcript.split(/\s+/).filter((w) => w.length > 0)
  return {
    transcript,
    words: wordList.map((w, i) => ({
      word: w,
      startMs: i * 300,
      endMs: i * 300 + 250,
      confidence: confidences?.[i] ?? 0.95,
    })),
    durationMs: wordList.length * 300,
    phonemes: null,
  }
}

describe('extractGrammar', () => {
  it('counts clause markers as structure boundaries', () => {
    // "I like cats and I like dogs" has one clause marker ("and")
    // → 2 clauses = 2 structures attempted.
    const f = extractGrammar(sttWith('I like cats and I like dogs'))
    expect(f.structuresAttempted).toBe(2)
  })

  it('computes mean length of utterance (words per clause)', () => {
    // "I like cats because they are friendly" → 2 clauses, 7 words
    const f = extractGrammar(
      sttWith('I like cats because they are friendly'),
    )
    expect(f.meanLengthOfUtterance).toBeGreaterThan(0)
  })

  it('computes error density from low-confidence words', () => {
    // Two words with low confidence out of 5 total.
    const f = extractGrammar(
      sttWith('I goed to the shops', [0.95, 0.3, 0.95, 0.95, 0.4]),
    )
    expect(f.errorDensity).toBeGreaterThan(0)
    expect(f.errorDensity).toBeLessThanOrEqual(1.0)
  })

  it('structures accurate is less than attempted when errors exist', () => {
    const f = extractGrammar(
      sttWith('I goed to the shops and I buyed some food', [
        0.95, 0.3, 0.95, 0.95, 0.4, 0.95, 0.95, 0.3, 0.95, 0.4,
      ]),
    )
    expect(f.structuresAccurate).toBeLessThanOrEqual(
      f.structuresAttempted,
    )
  })

  it('handles empty transcript', () => {
    const f = extractGrammar({
      transcript: '',
      words: [],
      durationMs: 0,
      phonemes: null,
    })
    expect(f.structuresAttempted).toBe(0)
    expect(f.structuresAccurate).toBe(0)
    expect(f.meanLengthOfUtterance).toBe(0)
    expect(f.errorDensity).toBe(0)
  })

  it('single clause with no markers', () => {
    const f = extractGrammar(sttWith('I like cats'))
    expect(f.structuresAttempted).toBe(1)
    expect(f.structuresAccurate).toBe(1)
  })

  it('all high-confidence words means zero error density', () => {
    const f = extractGrammar(sttWith('I like cats'))
    expect(f.errorDensity).toBe(0)
  })
})
