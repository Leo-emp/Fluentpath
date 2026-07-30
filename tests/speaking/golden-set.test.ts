/**
 * Golden set regression suite for speaking assessment.
 *
 * Curated known-good and known-bad LLM scoring outputs that verify
 * the parser and feedback gates correctly accept and reject each case.
 * Also tests feature extraction accuracy with specific STT fixtures.
 *
 * Same pattern as tests/writing/golden-set.test.ts — every quality
 * gate and parser check has at least one golden case.
 */

import { describe, it, expect } from 'vitest'
import { parseScoringOutput } from '@/writing/parse-score'
import { checkFeedbackQuality } from '@/writing/feedback-gates'
import { getSpeakingRubric } from '@/speaking/rubrics'
import { extractFluency } from '@/speaking/features/fluency'
import { extractPronunciation } from '@/speaking/features/pronunciation'
import { extractAllFeatures } from '@/speaking/features/extract'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { SttResult } from '@/speaking/types'

const inventory = buildProfilerInventory()
const B1_RUBRIC = getSpeakingRubric('cefr_b1_speaking')!

// A realistic B1-level spoken transcript.
const B1_TRANSCRIPT =
  'I went to Thailand last year and it was very nice. The weather was sunny every day. I visited many temples and also the beach. The food was amazing because they use a lot of spices. I think Thai food is the best food in the world. I also tried some street food and it was delicious but very spicy.'

// ---------------------------------------------------------------------------
// GOOD OUTPUTS — must parse AND pass quality gates
// ---------------------------------------------------------------------------

describe('golden good speaking scoring outputs — must all pass', () => {
  it('B1 transcript with evidence and specific feedback', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 33,
            quote: 'I went to Thailand last year and',
            issue: 'Correct use of past tense',
            rewrite: null,
          },
        ],
        feedback:
          'You use the past tense correctly when talking about your trip.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)
    expect(parsed, 'should parse successfully').not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed, `gates failed: ${review.issues.join('; ')}`).toBe(
      true,
    )
  })

  it('output with grouped issues and proper priority layering', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 33,
            quote: 'I went to Thailand last year and',
            issue: 'Good topic introduction',
            rewrite: null,
          },
        ],
        feedback: 'You start your answer clearly by naming the place.',
      })),
      groupedIssues: [
        {
          category: 'simple_connectors',
          description: 'Over-reliance on simple connectors',
          count: 3,
          priority: 'high',
          examples: [
            {
              start: 33,
              end: 36,
              quote: 'and',
              issue: 'Repeated use of "and" to connect ideas',
              rewrite: null,
            },
          ],
        },
        {
          category: 'vocabulary_repetition',
          description: 'Repeated use of "nice" and "food"',
          count: 2,
          priority: 'medium',
          examples: [
            {
              start: 42,
              end: 51,
              quote: 'very nice',
              issue: 'Could use a more specific adjective',
              rewrite: 'very beautiful',
            },
          ],
        },
        {
          category: 'word_stress',
          description: 'Minor stress pattern issues',
          count: 1,
          priority: 'low',
          examples: [
            {
              start: 53,
              end: 64,
              quote: 'The weather',
              issue: 'Stress on first syllable is correct',
              rewrite: null,
            },
          ],
        },
        {
          category: 'article_usage',
          description: 'Occasional missing articles',
          count: 1,
          priority: 'low',
          examples: [
            {
              start: 112,
              end: 121,
              quote: 'The food w',
              issue: 'Article use is mostly correct',
              rewrite: null,
            },
          ],
        },
      ],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    // 4 issues but one is high priority → should pass.
    expect(review.passed).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// BAD OUTPUTS — must be caught by parser or gates
// ---------------------------------------------------------------------------

describe('golden bad speaking scoring outputs — must all be rejected', () => {
  it('missing criterionScores array', () => {
    const output = JSON.stringify({ groupedIssues: [] })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)).toBeNull()
  })

  it('score above rubric maximum', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 99,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I went to ',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback: 'test feedback.',
      })),
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)).toBeNull()
  })

  it('fabricated transcript quote not found in actual transcript', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 30,
            quote: 'THIS QUOTE WAS NEVER SPOKEN',
            issue: 'fabricated',
            rewrite: null,
          },
        ],
        feedback: 'Some feedback.',
      })),
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)).toBeNull()
  })

  it('generic feedback phrase caught by quality gates', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I went to ',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback:
          c.id === 'lexical_resource'
            ? 'You should try to use more varied vocabulary in your speaking.'
            : 'Your speaking shows good ability at this level.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('generic'))).toBe(true)
  })

  it('no evidence on any criterion', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [],
        feedback: 'Some feedback text.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.filter((i) => i.includes('no evidence')).length).toBe(
      4,
    )
  })

  it('wrong number of criteria for the rubric', () => {
    const output = JSON.stringify({
      criterionScores: [
        {
          criterionId: 'only_one',
          criterionName: 'Only',
          score: 3,
          maxScore: 5,
          evidence: [],
          feedback: 'test',
        },
      ],
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)).toBeNull()
  })

  it('invalid priority value', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I went to ',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback: 'Your speaking is clear.',
      })),
      groupedIssues: [
        {
          category: 'test',
          description: 'test',
          count: 1,
          priority: 'critical', // Invalid — must be high/medium/low
          examples: [],
        },
      ],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)).toBeNull()
  })

  it('all-low priority with 5+ issues', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I went to ',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback: 'Your speaking is clear.',
      })),
      groupedIssues: Array.from({ length: 5 }, (_, i) => ({
        category: `issue_${i}`,
        description: `Issue ${i}`,
        count: 1,
        priority: 'low',
        examples: [
          {
            start: 0,
            end: 5,
            quote: 'I wen',
            issue: 'test',
            rewrite: null,
          },
        ],
      })),
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_TRANSCRIPT)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('priority'))).toBe(true)
  })

  it('plain text instead of JSON', () => {
    expect(
      parseScoringOutput(
        'The student shows good pronunciation skills.',
        B1_RUBRIC,
        B1_TRANSCRIPT,
      ),
    ).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// FEATURE EXTRACTION — deterministic golden cases
// ---------------------------------------------------------------------------

describe('golden feature extraction cases', () => {
  it('detects fillers accurately', () => {
    const stt: SttResult = {
      transcript: 'I um think uh the er city is nice',
      words: [
        { word: 'I', startMs: 0, endMs: 200, confidence: 0.99 },
        { word: 'um', startMs: 300, endMs: 500, confidence: 0.5 },
        { word: 'think', startMs: 600, endMs: 900, confidence: 0.98 },
        { word: 'uh', startMs: 1000, endMs: 1150, confidence: 0.5 },
        { word: 'the', startMs: 1200, endMs: 1350, confidence: 0.97 },
        { word: 'er', startMs: 1400, endMs: 1550, confidence: 0.5 },
        { word: 'city', startMs: 1600, endMs: 1900, confidence: 0.96 },
        { word: 'is', startMs: 2000, endMs: 2150, confidence: 0.99 },
        { word: 'nice', startMs: 2200, endMs: 2500, confidence: 0.97 },
      ],
      durationMs: 2800,
      phonemes: null,
    }
    const f = extractFluency(stt)
    expect(f.fillerCount).toBe(3)
    // 6 real words (excluding 3 fillers) in 2.8 seconds
    expect(f.speechRateWpm).toBeGreaterThan(100)
  })

  it('counts pauses correctly with multiple gaps', () => {
    const stt: SttResult = {
      transcript: 'I think so yes',
      words: [
        { word: 'I', startMs: 0, endMs: 200, confidence: 0.99 },
        // 500ms pause
        { word: 'think', startMs: 700, endMs: 1000, confidence: 0.98 },
        // 800ms pause
        { word: 'so', startMs: 1800, endMs: 2000, confidence: 0.97 },
        // 300ms pause
        { word: 'yes', startMs: 2300, endMs: 2500, confidence: 0.99 },
      ],
      durationMs: 2800,
      phonemes: null,
    }
    const f = extractFluency(stt)
    expect(f.pauseCount).toBe(3) // All three gaps > 250ms
  })

  it('flags low-confidence words at the 0.6 threshold', () => {
    const stt: SttResult = {
      transcript: 'the particularly enthusiastic archaeologist',
      words: [
        { word: 'the', startMs: 0, endMs: 200, confidence: 0.98 },
        { word: 'particularly', startMs: 300, endMs: 800, confidence: 0.59 },
        { word: 'enthusiastic', startMs: 900, endMs: 1500, confidence: 0.61 },
        { word: 'archaeologist', startMs: 1600, endMs: 2300, confidence: 0.30 },
      ],
      durationMs: 2500,
      phonemes: null,
    }
    const f = extractPronunciation(stt)
    // 0.59 and 0.30 are below 0.6; 0.61 is above
    expect(f.lowConfidenceWords).toHaveLength(2)
    expect(f.lowConfidenceWords.map((w) => w.word)).toContain('particularly')
    expect(f.lowConfidenceWords.map((w) => w.word)).toContain('archaeologist')
    expect(f.lowConfidenceWords.map((w) => w.word)).not.toContain('enthusiastic')
  })

  it('extractAllFeatures returns complete structure for a B1 sample', () => {
    const stt: SttResult = {
      transcript:
        'I think the city is better than the country because there are more jobs and restaurants',
      words: 'I think the city is better than the country because there are more jobs and restaurants'
        .split(' ')
        .map((w, i) => ({
          word: w,
          startMs: i * 300,
          endMs: i * 300 + 250,
          confidence: 0.92,
        })),
      durationMs: 5000,
      phonemes: null,
    }
    const features = extractAllFeatures(stt, inventory)
    expect(features.fluency.speechRateWpm).toBeGreaterThan(0)
    expect(features.lexical.typeTokenRatio).toBeGreaterThan(0)
    expect(features.grammar.structuresAttempted).toBeGreaterThan(0)
    expect(features.pronunciation.meanWordConfidence).toBe(0.92)
    expect(features.pronunciation.lowConfidenceWords).toHaveLength(0)
  })

  it('handles very short response (3 words)', () => {
    const stt: SttResult = {
      transcript: 'I like cats',
      words: [
        { word: 'I', startMs: 0, endMs: 200, confidence: 0.99 },
        { word: 'like', startMs: 300, endMs: 600, confidence: 0.95 },
        { word: 'cats', startMs: 700, endMs: 1000, confidence: 0.93 },
      ],
      durationMs: 1200,
      phonemes: null,
    }
    const features = extractAllFeatures(stt, inventory)
    expect(features.fluency.speechRateWpm).toBeGreaterThan(0)
    expect(features.fluency.fillerCount).toBe(0)
    expect(features.lexical.typeTokenRatio).toBe(1.0)
  })
})
