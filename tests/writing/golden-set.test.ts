/**
 * Golden set regression suite for writing assessment.
 *
 * Curated known-good and known-bad LLM scoring outputs that verify
 * the parser and feedback gates correctly accept and reject each case.
 *
 * This is the same pattern used for MCQ items in tests/items/golden-set.test.ts.
 * Every quality gate and parser check has at least one golden case.
 */

import { describe, it, expect } from 'vitest'
import { parseScoringOutput } from '@/writing/parse-score'
import { checkFeedbackQuality } from '@/writing/feedback-gates'
import { getRubric } from '@/writing/rubrics'
import '@/writing/rubrics-ielts'
import { validateResponse } from '@/writing/validate'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { WritingTask, WritingResponse } from '@/writing/types'

const inventory = buildProfilerInventory()
const B1_RUBRIC = getRubric('cefr_b1')!

// A realistic B1-level learner text (130+ words).
const B1_LEARNER =
  'I think city life is better than country life. In the city, there are many shops and restaurants. You can find everything you need very easily. Also, there is good public transport so you do not need a car. However, the city is very noisy and expensive. The air is not very clean because of the traffic. I prefer the city because I like to go out with friends and there are more jobs available. You can go to the cinema, eat at different restaurants, and visit museums. But I understand why some people want to live in the country because it is more quiet and peaceful. The country has fresh air and beautiful nature. In the end, I believe the city is the best place for young people who want to have an active social life and find good work.'

function b1Task(): WritingTask {
  return {
    id: 'golden.b1',
    type: 'essay',
    level: 'B1',
    exam: 'cefr',
    prompt: 'Do you prefer city or country life?',
    minWords: 50,
    maxWords: 200,
    timeLimitMinutes: null,
    rubricId: 'cefr_b1',
  }
}

// ---------------------------------------------------------------------------
// GOOD OUTPUTS — must parse AND pass quality gates
// ---------------------------------------------------------------------------

describe('golden good scoring outputs — must all pass', () => {
  it('B1 CEFR essay with evidence and specific feedback', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 46,
            quote: 'I think city life is better than country life',
            issue: 'Clear opinion statement',
            rewrite: null,
          },
        ],
        feedback:
          'You clearly state your opinion at the start of your text.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)
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
            end: 46,
            quote: 'I think city life is better than country life',
            issue: 'Good opening',
            rewrite: null,
          },
        ],
        feedback: 'Your opening sentence works well.',
      })),
      groupedIssues: [
        {
          category: 'comparative_form',
          description: 'Incorrect comparative form',
          count: 1,
          priority: 'high',
          examples: [
            {
              start: 539,
              end: 555,
              quote: 'it is more quiet',
              issue: 'Use "quieter" for short adjectives',
              rewrite: 'it is quieter',
            },
          ],
        },
        {
          category: 'word_choice',
          description: 'Repetitive word choice',
          count: 2,
          priority: 'medium',
          examples: [
            {
              start: 47,
              end: 62,
              quote: 'In the city, th',
              issue: 'Repeated "city"',
              rewrite: null,
            },
          ],
        },
        {
          category: 'punctuation',
          description: 'Minor punctuation issues',
          count: 1,
          priority: 'low',
          examples: [
            {
              start: 207,
              end: 215,
              quote: 'However,',
              issue: 'Comma placement is correct here',
              rewrite: null,
            },
          ],
        },
        {
          category: 'article_usage',
          description: 'Optional article improvements',
          count: 1,
          priority: 'low',
          examples: [
            {
              start: 143,
              end: 161,
              quote: 'there is good publ',
              issue: 'Could add "a" before "good"',
              rewrite: 'there is a good public',
            },
          ],
        },
      ],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    // 4 issues, but one is high priority → should pass
    expect(review.passed).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// BAD OUTPUTS — must be caught by parser or gates
// ---------------------------------------------------------------------------

describe('golden bad scoring outputs — must all be rejected', () => {
  it('missing criterionScores array', () => {
    const output = JSON.stringify({ groupedIssues: [] })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)).toBeNull()
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
            quote: 'I think ci',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback: 'test feedback text here.',
      })),
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)).toBeNull()
  })

  it('evidence quote not found in learner text', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id,
        criterionName: c.name,
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 20,
            quote: 'THIS TEXT DOES NOT EXIST',
            issue: 'phantom quote',
            rewrite: null,
          },
        ],
        feedback: 'Some feedback.',
      })),
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)).toBeNull()
  })

  it('generic feedback phrase caught by gates', () => {
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
            quote: 'I think ci',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback:
          c.id === 'vocabulary'
            ? 'You should try to use more varied vocabulary in your writing.'
            : 'Your writing shows good ability at this level.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)
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
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)
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
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)).toBeNull()
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
            quote: 'I think ci',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback: 'Your text shows good understanding.',
      })),
      groupedIssues: [
        {
          category: 'test',
          description: 'test',
          count: 1,
          priority: 'critical',
          examples: [],
        },
      ],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)).toBeNull()
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
            quote: 'I think ci',
            issue: 'test',
            rewrite: null,
          },
        ],
        feedback: 'Your writing is clear.',
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
            quote: 'I thi',
            issue: 'test',
            rewrite: null,
          },
        ],
      })),
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('priority'))).toBe(true)
  })

  it('plain text instead of JSON', () => {
    expect(
      parseScoringOutput(
        'The student shows good potential.',
        B1_RUBRIC,
        B1_LEARNER,
      ),
    ).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// VALIDATION EDGE CASES — response validation golden cases
// ---------------------------------------------------------------------------

describe('response validation edge cases', () => {
  it('rejects empty submission', () => {
    const result = validateResponse(
      { taskId: 'golden.b1', text: '', submittedAt: 0, timeTakenSeconds: null },
      b1Task(),
    )
    expect(result.valid).toBe(false)
    expect(result.issues).toContain('empty')
  })

  it('accepts text at exact minimum', () => {
    const text = 'word '.repeat(50).trim()
    const result = validateResponse(
      {
        taskId: 'golden.b1',
        text,
        submittedAt: 0,
        timeTakenSeconds: null,
      },
      b1Task(),
    )
    expect(result.valid).toBe(true)
    expect(result.wordCount).toBe(50)
  })

  it('warns about over-maximum without rejecting', () => {
    const text = 'word '.repeat(250).trim()
    const result = validateResponse(
      {
        taskId: 'golden.b1',
        text,
        submittedAt: 0,
        timeTakenSeconds: null,
      },
      b1Task(),
    )
    expect(result.valid).toBe(true)
    expect(result.warnings).toContain('above_maximum')
  })

  it('detects prompt copying', () => {
    const result = validateResponse(
      {
        taskId: 'golden.b1',
        text: 'Do you prefer city or country life? I prefer the city because it has more things to do and more jobs.',
        submittedAt: 0,
        timeTakenSeconds: null,
      },
      b1Task(),
    )
    expect(result.warnings).toContain('contains_prompt')
  })
})
