import { describe, it, expect } from 'vitest'
import { checkFeedbackQuality } from '@/writing/feedback-gates'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { ParsedScore } from '@/writing/parse-score'

const inventory = buildProfilerInventory()

// A well-formed score that passes all gates.
function goodScore(): ParsedScore {
  return {
    criterionScores: [
      {
        criterionId: 'task_achievement',
        criterionName: 'Task Achievement',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I think it',
            issue: 'States opinion clearly',
            rewrite: null,
          },
        ],
        feedback: 'You give your opinion clearly. This is good for this level.',
      },
      {
        criterionId: 'coherence',
        criterionName: 'Coherence',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I think it',
            issue: 'Good opening',
            rewrite: null,
          },
        ],
        feedback: 'Your ideas are easy to follow.',
      },
      {
        criterionId: 'vocabulary',
        criterionName: 'Vocabulary',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I think it',
            issue: 'Simple vocabulary used correctly',
            rewrite: null,
          },
        ],
        feedback: 'You use simple words correctly.',
      },
      {
        criterionId: 'grammar',
        criterionName: 'Grammar',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 10,
            quote: 'I think it',
            issue: 'Simple sentences well formed',
            rewrite: null,
          },
        ],
        feedback: 'Your sentences are correct.',
      },
    ],
    groupedIssues: [],
  }
}

describe('feedback quality gates', () => {
  it('passes feedback that quotes the learner and is at level', () => {
    const review = checkFeedbackQuality(goodScore(), 'B1', inventory)
    expect(review.passed).toBe(true)
    expect(review.issues).toHaveLength(0)
  })

  it('rejects when a criterion has no evidence', () => {
    const score = goodScore()
    score.criterionScores[0]!.evidence = []
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('no evidence'))).toBe(true)
  })

  it('rejects generic feedback phrases', () => {
    const score = goodScore()
    score.criterionScores[0]!.feedback =
      'You should improve your cohesion and use more varied vocabulary.'
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('generic'))).toBe(true)
  })

  it('catches multiple generic phrases', () => {
    const score = goodScore()
    score.criterionScores[0]!.feedback =
      'Try to use more advanced vocabulary and improve your grammar.'
    const review = checkFeedbackQuality(score, 'B1', inventory)
    // Should flag both "use more advanced vocabulary" and "improve your grammar"
    const genericIssues = review.issues.filter((i) => i.includes('generic'))
    expect(genericIssues.length).toBeGreaterThanOrEqual(2)
  })

  it('rejects empty feedback', () => {
    const score = goodScore()
    score.criterionScores[0]!.feedback = ''
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('empty'))).toBe(true)
  })

  it('rejects whitespace-only feedback', () => {
    const score = goodScore()
    score.criterionScores[0]!.feedback = '   '
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(false)
  })

  it('passes when grouped issues have proper priorities', () => {
    const score = goodScore()
    score.groupedIssues = [
      {
        category: 'test',
        description: 'test issue',
        count: 1,
        priority: 'high',
        examples: [
          { start: 0, end: 5, quote: 'I thi', issue: 'test', rewrite: null },
        ],
      },
    ]
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(true)
  })

  it('rejects when no high-priority issues exist but there are many issues', () => {
    const score = goodScore()
    score.groupedIssues = Array.from({ length: 5 }, (_, i) => ({
      category: `issue_${i}`,
      description: `Issue ${i}`,
      count: 1,
      priority: 'low' as const,
      examples: [
        { start: 0, end: 5, quote: 'I thi', issue: 'test', rewrite: null },
      ],
    }))
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('priority'))).toBe(true)
  })

  it('allows fewer than 4 issues without requiring high priority', () => {
    const score = goodScore()
    score.groupedIssues = Array.from({ length: 3 }, (_, i) => ({
      category: `issue_${i}`,
      description: `Issue ${i}`,
      count: 1,
      priority: 'low' as const,
      examples: [
        { start: 0, end: 5, quote: 'I thi', issue: 'test', rewrite: null },
      ],
    }))
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(true)
  })

  it('reports all issues at once (not just the first failure)', () => {
    const score = goodScore()
    // Break two criteria at once: no evidence AND empty feedback.
    score.criterionScores[0]!.evidence = []
    score.criterionScores[1]!.feedback = ''
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.issues.length).toBeGreaterThanOrEqual(2)
  })
})
