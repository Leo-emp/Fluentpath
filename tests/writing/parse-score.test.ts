import { describe, it, expect } from 'vitest'
import { parseScoringOutput } from '@/writing/parse-score'
import { getRubric } from '@/writing/rubrics'

const rubric = getRubric('cefr_b1')!
const LEARNER = 'I think city life is better than country life.'

// A valid scoring output with all required fields.
const VALID_OUTPUT = JSON.stringify({
  criterionScores: rubric.criteria.map((c) => ({
    criterionId: c.id,
    criterionName: c.name,
    score: 3,
    maxScore: 5,
    evidence: [
      {
        start: 0,
        end: 46,
        quote: 'I think city life is better than country life',
        issue: 'The opening directly states an opinion which is appropriate.',
        rewrite: null,
      },
    ],
    feedback: 'You clearly state your opinion, which is good for this level.',
  })),
  groupedIssues: [
    {
      category: 'missing_article',
      description: 'Missing articles before nouns',
      count: 1,
      priority: 'medium',
      examples: [
        {
          start: 8,
          end: 17,
          quote: 'city life',
          issue: 'Missing article',
          rewrite: 'the city life',
        },
      ],
    },
  ],
})

describe('parseScoringOutput', () => {
  it('parses valid JSON', () => {
    const result = parseScoringOutput(VALID_OUTPUT, rubric, LEARNER)
    expect(result).not.toBeNull()
    expect(result!.criterionScores).toHaveLength(4)
  })

  it('strips markdown fences', () => {
    const fenced = '```json\n' + VALID_OUTPUT + '\n```'
    expect(parseScoringOutput(fenced, rubric, LEARNER)).not.toBeNull()
  })

  it('returns null for invalid JSON', () => {
    expect(parseScoringOutput('not json', rubric, LEARNER)).toBeNull()
  })

  it('returns null when criterionScores is missing', () => {
    expect(parseScoringOutput('{}', rubric, LEARNER)).toBeNull()
  })

  it('returns null when a score is out of rubric range', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores[0].score = 99
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('returns null when a score is negative', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores[0].score = -1
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('returns null when criterion count does not match rubric', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores = bad.criterionScores.slice(0, 2)
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('validates that evidence quotes are substrings of learner text', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores[0].evidence[0].quote = 'text that is not in the response'
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('accepts empty groupedIssues', () => {
    const good = JSON.parse(VALID_OUTPUT)
    good.groupedIssues = []
    expect(
      parseScoringOutput(JSON.stringify(good), rubric, LEARNER),
    ).not.toBeNull()
  })

  it('validates grouped issue priority values', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.groupedIssues[0].priority = 'extreme'
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('accepts output without groupedIssues field at all', () => {
    const noIssues = JSON.parse(VALID_OUTPUT)
    delete noIssues.groupedIssues
    const result = parseScoringOutput(JSON.stringify(noIssues), rubric, LEARNER)
    expect(result).not.toBeNull()
    expect(result!.groupedIssues).toEqual([])
  })

  it('uses criterionId as fallback for missing criterionName', () => {
    const noName = JSON.parse(VALID_OUTPUT)
    delete noName.criterionScores[0].criterionName
    const result = parseScoringOutput(JSON.stringify(noName), rubric, LEARNER)
    expect(result).not.toBeNull()
    expect(result!.criterionScores[0]!.criterionName).toBe(
      result!.criterionScores[0]!.criterionId,
    )
  })

  it('returns null when evidence has non-object entries', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores[0].evidence = ['not an object']
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('sets rewrite to null when not provided', () => {
    const noRewrite = JSON.parse(VALID_OUTPUT)
    delete noRewrite.criterionScores[0].evidence[0].rewrite
    const result = parseScoringOutput(
      JSON.stringify(noRewrite),
      rubric,
      LEARNER,
    )
    expect(result).not.toBeNull()
    expect(result!.criterionScores[0]!.evidence[0]!.rewrite).toBeNull()
  })
})
