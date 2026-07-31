import { describe, it, expect } from 'vitest'
import { reviewItemLlm } from '@/items/llm-review'
import type { GenerationProvider, GenerationRequest, GenerationResponse } from '@/generation/provider'
import type { McqItem } from '@/items/types'
import type { LlmRubricResponse } from '@/items/llm-rubric'

// Fixture: a B1 present-perfect item.
const ITEM: McqItem = {
  id: 'llm-review.test',
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

// Helper: build a provider that returns a fixed rubric response as JSON.
function rubricProvider(response: LlmRubricResponse): GenerationProvider {
  return {
    async generate(_req: GenerationRequest): Promise<GenerationResponse> {
      return { raw: JSON.stringify(response), parsed: null }
    },
  }
}

// Helper: build a provider that returns raw text (not valid rubric JSON).
function rawProvider(text: string): GenerationProvider {
  return {
    async generate(): Promise<GenerationResponse> {
      return { raw: text, parsed: null }
    },
  }
}

// A response where all 4 dimensions pass.
const ALL_PASS: LlmRubricResponse = {
  naturalness: { verdict: 'pass', reason: 'Natural' },
  authenticity: { verdict: 'pass', reason: 'Plausible' },
  teacherTest: { verdict: 'pass', reason: 'Usable' },
  explanatoryTransfer: { verdict: 'pass', reason: 'Helpful' },
}

// A response where naturalness rejects.
const ONE_REJECT: LlmRubricResponse = {
  naturalness: { verdict: 'reject', reason: 'Stilted phrasing' },
  authenticity: { verdict: 'pass', reason: 'Plausible' },
  teacherTest: { verdict: 'pass', reason: 'Usable' },
  explanatoryTransfer: { verdict: 'pass', reason: 'Helpful' },
}

// A response where one dimension warns.
const ONE_WARN: LlmRubricResponse = {
  naturalness: { verdict: 'pass', reason: 'OK' },
  authenticity: { verdict: 'warn', reason: 'Borderline plausible' },
  teacherTest: { verdict: 'pass', reason: 'OK' },
  explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
}

describe('reviewItemLlm', () => {
  it('passes when all dimensions pass', async () => {
    const result = await reviewItemLlm(ITEM, rubricProvider(ALL_PASS), 'Present perfect vs past simple')
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(0)
    expect(result.raw).not.toBeNull()
  })

  it('fails when any dimension rejects', async () => {
    const result = await reviewItemLlm(ITEM, rubricProvider(ONE_REJECT), 'Present perfect vs past simple')
    expect(result.passed).toBe(false)
    expect(result.issues).toHaveLength(1)
    expect(result.issues[0]!.code).toBe('UNNATURAL')
    expect(result.issues[0]!.severity).toBe('reject')
  })

  it('passes with warnings (warns do not block)', async () => {
    const result = await reviewItemLlm(ITEM, rubricProvider(ONE_WARN), 'Present perfect vs past simple')
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(1)
    expect(result.issues[0]!.code).toBe('INAUTHENTIC_CONTEXT')
    expect(result.issues[0]!.severity).toBe('warn')
  })

  it('fail-open on unparseable output', async () => {
    const result = await reviewItemLlm(ITEM, rawProvider('I cannot evaluate this item.'), 'Test')
    // Unparseable LLM output = pass with no issues. The deterministic
    // gates already cleared this item.
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(0)
    expect(result.raw).toBeNull()
  })

  it('fail-open on markdown-wrapped garbage', async () => {
    const result = await reviewItemLlm(ITEM, rawProvider('```json\nnot json\n```'), 'Test')
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  it('passes the prompt to the provider', async () => {
    let captured: GenerationRequest | null = null
    const spy: GenerationProvider = {
      async generate(req) {
        captured = req
        return { raw: JSON.stringify(ALL_PASS), parsed: null }
      },
    }

    await reviewItemLlm(ITEM, spy, 'Present perfect vs past simple')

    expect(captured).not.toBeNull()
    expect(captured!.prompt).toContain('CEFR level B1')
    expect(captured!.prompt).toContain('Present perfect vs past simple')
    expect(captured!.prompt).toContain('have lost [correct]')
  })

  it('handles multiple rejects across dimensions', async () => {
    const multiReject: LlmRubricResponse = {
      naturalness: { verdict: 'reject', reason: 'Stilted' },
      authenticity: { verdict: 'reject', reason: 'Absurd scenario' },
      teacherTest: { verdict: 'pass', reason: 'OK' },
      explanatoryTransfer: { verdict: 'warn', reason: 'Could be better' },
    }
    const result = await reviewItemLlm(ITEM, rubricProvider(multiReject), 'Test')
    expect(result.passed).toBe(false)
    // 2 rejects + 1 warn = 3 issues.
    expect(result.issues).toHaveLength(3)
    const codes = result.issues.map((i) => i.code)
    expect(codes).toContain('UNNATURAL')
    expect(codes).toContain('INAUTHENTIC_CONTEXT')
    expect(codes).toContain('WEAK_EXPLANATION')
  })
})
