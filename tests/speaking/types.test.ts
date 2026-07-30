/**
 * Type-level tests for speaking assessment types.
 * These compile if the types are correct — runtime assertions
 * verify the structure is usable, not just syntactically valid.
 */

import { describe, it, expect } from 'vitest'
import type {
  SpeakingTask,
  SpeakingResponse,
  SttWord,
  SttResult,
  SpeechFeatures,
  SpeakingScore,
} from '@/speaking/types'
import type { SttProvider } from '@/speaking/stt-provider'

describe('speaking type definitions', () => {
  it('SpeakingTask has all required fields', () => {
    const task: SpeakingTask = {
      id: 'cefr.b1.describe.1',
      type: 'describe_image',
      level: 'B1',
      exam: 'cefr',
      prompt: 'Describe this picture.',
      timeLimitSeconds: 60,
      prepTimeSeconds: 10,
      rubricId: 'cefr_b1_speaking',
    }
    expect(task.id).toBe('cefr.b1.describe.1')
  })

  it('SttWord includes word timings and confidence', () => {
    const word: SttWord = {
      word: 'hello',
      startMs: 0,
      endMs: 500,
      confidence: 0.95,
    }
    expect(word.confidence).toBeGreaterThan(0)
  })

  it('SttResult includes transcript, words, and optional phonemes', () => {
    const result: SttResult = {
      transcript: 'Hello world.',
      words: [
        { word: 'Hello', startMs: 0, endMs: 400, confidence: 0.98 },
        { word: 'world', startMs: 450, endMs: 900, confidence: 0.92 },
      ],
      durationMs: 1000,
      phonemes: null,
    }
    expect(result.words).toHaveLength(2)
  })

  it('SpeechFeatures contains all four feature groups', () => {
    const features: SpeechFeatures = {
      fluency: {
        speechRateWpm: 120,
        articulationRateWpm: 140,
        pauseCount: 3,
        meanPauseDurationMs: 800,
        fillerCount: 1,
        falseStartCount: 0,
        meanLengthOfRunWords: 8,
      },
      lexical: {
        typeTokenRatio: 0.72,
        vocabularyLevelProfile: { A1: 0.4, A2: 0.3, B1: 0.2, B2: 0.1, C1: 0, C2: 0 },
        lexicalDensity: 0.48,
        repetitionRate: 0.05,
      },
      grammar: {
        structuresAttempted: 5,
        structuresAccurate: 4,
        meanLengthOfUtterance: 7.2,
        errorDensity: 0.02,
      },
      pronunciation: {
        meanWordConfidence: 0.91,
        lowConfidenceWords: [
          { word: 'specifically', confidence: 0.45, startMs: 2000, endMs: 2800 },
        ],
      },
    }
    expect(features.fluency.speechRateWpm).toBe(120)
  })

  it('SttProvider interface has a transcribe method', () => {
    const provider: SttProvider = {
      transcribe: async () => ({
        transcript: 'test',
        words: [],
        durationMs: 1000,
        phonemes: null,
      }),
    }
    expect(typeof provider.transcribe).toBe('function')
  })
})
