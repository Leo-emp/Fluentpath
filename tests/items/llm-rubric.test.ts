import { describe, it, expect } from 'vitest'
import {
  buildRubricPrompt,
  parseRubricResponse,
  rubricToIssues,
} from '@/items/llm-rubric'
import type { McqItem } from '@/items/types'

// Fixture: a B1 present-perfect item used across all rubric tests.
const ITEM: McqItem = {
  id: 'rubric.test',
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past_simple'],
  level: 'B1',
}

// ─── buildRubricPrompt ───────────────────────────────────────────────────

describe('buildRubricPrompt', () => {
  it('includes the CEFR level and node title', () => {
    const prompt = buildRubricPrompt(ITEM, 'Present perfect vs past simple')
    expect(prompt).toContain('CEFR level B1')
    expect(prompt).toContain('Present perfect vs past simple')
  })

  it('marks the correct option with [correct]', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('have lost [correct]')
    // Distractors should NOT have [correct].
    expect(prompt).not.toContain('B. lost [correct]')
  })

  it('includes misconception text for distractors', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('misconception: "uses past simple though the result still matters now"')
  })

  it('labels options with A, B, C, D', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('A. have lost')
    expect(prompt).toContain('B. lost')
    expect(prompt).toContain('C. was losing')
    expect(prompt).toContain('D. am losing')
  })

  it('asks for JSON-only output', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('Respond with JSON only')
  })
})

// ─── parseRubricResponse ─────────────────────────────────────────────────

describe('parseRubricResponse', () => {
  // A valid response with all 4 dimensions.
  const VALID_JSON = JSON.stringify({
    naturalness: { verdict: 'pass', reason: 'Sounds natural' },
    authenticity: { verdict: 'pass', reason: 'Plausible scenario' },
    teacherTest: { verdict: 'warn', reason: 'Slightly ambiguous' },
    explanatoryTransfer: { verdict: 'reject', reason: 'Labels without explaining' },
  })

  it('parses valid JSON', () => {
    const result = parseRubricResponse(VALID_JSON)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('pass')
    expect(result!.teacherTest.verdict).toBe('warn')
    expect(result!.explanatoryTransfer.verdict).toBe('reject')
  })

  it('strips markdown fences', () => {
    const fenced = '```json\n' + VALID_JSON + '\n```'
    const result = parseRubricResponse(fenced)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('pass')
  })

  it('returns null for invalid JSON', () => {
    expect(parseRubricResponse('I am a helpful assistant!')).toBeNull()
  })

  it('returns null for non-object JSON', () => {
    expect(parseRubricResponse('"just a string"')).toBeNull()
    expect(parseRubricResponse('42')).toBeNull()
    expect(parseRubricResponse('null')).toBeNull()
  })

  it('rejects missing dimensions (fail-closed)', () => {
    const partial = JSON.stringify({
      naturalness: { verdict: 'reject', reason: 'Too formal' },
    })
    const result = parseRubricResponse(partial)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('reject')
    // Missing dimensions are rejected — a broken response should
    // not silently pass items through.
    expect(result!.authenticity.verdict).toBe('reject')
    expect(result!.teacherTest.verdict).toBe('reject')
    expect(result!.explanatoryTransfer.verdict).toBe('reject')
  })

  it('rejects unknown verdict values (fail-closed)', () => {
    const weird = JSON.stringify({
      naturalness: { verdict: 'GOOD', reason: 'Nice' },
      authenticity: { verdict: 'maybe', reason: 'Hmm' },
      teacherTest: { verdict: 123, reason: 'Nope' },
      explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
    })
    const result = parseRubricResponse(weird)
    expect(result).not.toBeNull()
    // Unknown values are rejected — only 'pass', 'warn', 'reject' accepted.
    expect(result!.naturalness.verdict).toBe('reject')
    expect(result!.authenticity.verdict).toBe('reject')
    expect(result!.teacherTest.verdict).toBe('reject')
    expect(result!.explanatoryTransfer.verdict).toBe('pass')
  })

  it('handles missing reason gracefully', () => {
    const noReason = JSON.stringify({
      naturalness: { verdict: 'reject' },
      authenticity: { verdict: 'pass', reason: 'OK' },
      teacherTest: { verdict: 'pass', reason: 'OK' },
      explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
    })
    const result = parseRubricResponse(noReason)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('reject')
    expect(result!.naturalness.reason).toBe('')
  })
})

// ─── rubricToIssues ──────────────────────────────────────────────────────

describe('rubricToIssues', () => {
  it('returns no issues when all dimensions pass', () => {
    const allPass = {
      naturalness: { verdict: 'pass' as const, reason: '' },
      authenticity: { verdict: 'pass' as const, reason: '' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    expect(rubricToIssues(allPass)).toHaveLength(0)
  })

  it('maps reject to the correct issue code', () => {
    const oneReject = {
      naturalness: { verdict: 'reject' as const, reason: 'Stilted phrasing' },
      authenticity: { verdict: 'pass' as const, reason: '' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    const issues = rubricToIssues(oneReject)
    expect(issues).toHaveLength(1)
    expect(issues[0]!.code).toBe('UNNATURAL')
    expect(issues[0]!.severity).toBe('reject')
    expect(issues[0]!.message).toBe('Stilted phrasing')
  })

  it('maps warn to the correct severity', () => {
    const oneWarn = {
      naturalness: { verdict: 'pass' as const, reason: '' },
      authenticity: { verdict: 'warn' as const, reason: 'Borderline plausible' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    const issues = rubricToIssues(oneWarn)
    expect(issues).toHaveLength(1)
    expect(issues[0]!.code).toBe('INAUTHENTIC_CONTEXT')
    expect(issues[0]!.severity).toBe('warn')
  })

  it('maps all 4 dimensions to their codes', () => {
    const allReject = {
      naturalness: { verdict: 'reject' as const, reason: 'a' },
      authenticity: { verdict: 'reject' as const, reason: 'b' },
      teacherTest: { verdict: 'reject' as const, reason: 'c' },
      explanatoryTransfer: { verdict: 'reject' as const, reason: 'd' },
    }
    const codes = rubricToIssues(allReject).map((i) => i.code)
    expect(codes).toContain('UNNATURAL')
    expect(codes).toContain('INAUTHENTIC_CONTEXT')
    expect(codes).toContain('TEACHER_REJECT')
    expect(codes).toContain('WEAK_EXPLANATION')
  })

  it('uses a fallback message when reason is empty', () => {
    const noReason = {
      naturalness: { verdict: 'reject' as const, reason: '' },
      authenticity: { verdict: 'pass' as const, reason: '' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    const issues = rubricToIssues(noReason)
    expect(issues[0]!.message).toContain('naturalness')
  })
})
