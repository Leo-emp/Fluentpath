import { describe, it, expect } from 'vitest'
import { reviewItemLlm } from '@/items/llm-review'
import type { LlmReview } from '@/items/llm-review'
import type { LlmVerdict } from '@/items/llm-rubric'
import type { GenerationProvider, GenerationRequest, GenerationResponse } from '@/generation/provider'
import type { McqItem } from '@/items/types'

// ─── Integration provider ────────────────────────────────────────────────
// Gated behind QUALITY_PROVIDER env var. When absent, all tests skip.
// Set QUALITY_PROVIDER to a Gemini API key to run calibration.

const QUALITY_PROVIDER = process.env.QUALITY_PROVIDER

// Minimal Gemini Flash provider for integration tests.
function createGeminiProvider(apiKey: string): GenerationProvider {
  return {
    async generate(req: GenerationRequest): Promise<GenerationResponse> {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: req.prompt }] }],
          generationConfig: { maxOutputTokens: req.maxTokens },
        }),
      })
      const data = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
      }
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
      return { raw, parsed: null }
    },
  }
}

// ─── Helper ──────────────────────────────────────────────────────────────

// Build an MCQ with defaults. Each golden item overrides only what matters.
function mcq(overrides: Partial<McqItem> & { stem: string }): McqItem {
  return {
    id: 'golden.quality',
    type: 'mcq' as const,
    level: 'B1',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    correctIndex: 0,
    options: [
      { text: 'have lost', misconception: null },
      { text: 'lost', misconception: 'uses past simple though the result still matters now' },
      { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
      { text: 'am losing', misconception: 'places a finished event in the present moment' },
    ],
    ...overrides,
  }
}

// ─── Expected labels ─────────────────────────────────────────────────────

interface GoldenQualityItem {
  label: string
  item: McqItem
  nodeTitle: string
  expected: {
    naturalness: LlmVerdict
    authenticity: LlmVerdict
    teacherTest: LlmVerdict
    explanatoryTransfer: LlmVerdict
  }
}

// ─── GOLDEN GOOD ITEMS ───────────────────────────────────────────────────

const goodItems: GoldenQualityItem[] = [
  {
    label: 'B1 present perfect: result still matters',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({ stem: 'I ______ my keys. I cannot open the door.' }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'B1 present perfect: experience',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'She ______ to three different countries.',
      options: [
        { text: 'has been', misconception: null },
        { text: 'went', misconception: 'uses past simple for a life experience with no time frame' },
        { text: 'was going', misconception: 'treats a life summary as a continuous action' },
        { text: 'is going', misconception: 'places a past experience in the present' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'A2 past simple: regular verb',
    nodeTitle: 'Past simple with regular verbs',
    item: mcq({
      stem: 'They ______ football every Saturday when they were young.',
      level: 'A2',
      nodeIds: ['gram.a2.past_simple_regular'],
      options: [
        { text: 'played', misconception: null },
        { text: 'play', misconception: 'uses present tense for a finished habit' },
        { text: 'are playing', misconception: 'treats a past habit as a current action' },
        { text: 'have played', misconception: 'uses present perfect for a habit that has ended' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'A1 to-be: subject-verb agreement',
    nodeTitle: 'To be: am, is, are',
    item: mcq({
      stem: 'My sister ______ a teacher.',
      level: 'A1',
      nodeIds: ['gram.a1.to_be'],
      options: [
        { text: 'is', misconception: null },
        { text: 'are', misconception: 'applies plural agreement to a singular subject' },
        { text: 'am', misconception: 'applies first-person agreement to a third-person subject' },
        { text: 'be', misconception: 'uses the bare infinitive instead of a conjugated form' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'B2 third conditional',
    nodeTitle: 'Third conditional',
    item: mcq({
      stem: 'If I ______ the email, I would have replied immediately.',
      level: 'B2',
      nodeIds: ['gram.b2.third_conditional'],
      options: [
        { text: 'had seen', misconception: null },
        { text: 'saw', misconception: 'uses second conditional form for an unreal past event' },
        { text: 'have seen', misconception: 'uses present perfect for a hypothetical past situation' },
        { text: 'would see', misconception: 'places the would-clause in both halves of the conditional' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'B1 modal: advice with should',
    nodeTitle: 'Modals: should for advice',
    item: mcq({
      stem: 'You look tired. You ______ to bed early tonight.',
      nodeIds: ['gram.b1.modal_should'],
      options: [
        { text: 'should go', misconception: null },
        { text: 'must go', misconception: 'selects obligation when the context calls for advice' },
        { text: 'would go', misconception: 'uses hypothetical would for a real suggestion' },
        { text: 'could go', misconception: 'weakens advice to mere possibility' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'C1 inversion after negative adverbial',
    nodeTitle: 'Inversion after negative adverbials',
    item: mcq({
      stem: 'Not only ______ the report, but she also presented it to the board.',
      level: 'C1',
      nodeIds: ['gram.c1.inversion'],
      options: [
        { text: 'did she write', misconception: null },
        { text: 'she wrote', misconception: 'keeps normal word order after a fronted negative adverbial' },
        { text: 'she did write', misconception: 'uses emphatic do without inverting subject and auxiliary' },
        { text: 'wrote she', misconception: 'inverts main verb and subject instead of inserting do-support' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'A2 comparative adjective',
    nodeTitle: 'Comparative adjectives',
    item: mcq({
      stem: 'This book is ______ than the one I read before.',
      level: 'A2',
      nodeIds: ['gram.a2.comparatives'],
      options: [
        { text: 'more interesting', misconception: null },
        { text: 'interestinger', misconception: 'applies -er rule to a multi-syllable adjective' },
        { text: 'most interesting', misconception: 'uses the superlative form in a comparison of two' },
        { text: 'interesting', misconception: 'omits the comparative marker entirely' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'A1 simple present: daily routine',
    nodeTitle: 'Simple present for routines',
    item: mcq({
      stem: 'I ______ breakfast every morning.',
      level: 'A1',
      nodeIds: ['gram.a1.simple_present'],
      options: [
        { text: 'eat', misconception: null },
        { text: 'eats', misconception: 'applies third-person -s to a first-person subject' },
        { text: 'eating', misconception: 'uses the gerund form as a main verb without a helper' },
        { text: 'ate', misconception: 'uses past tense for a regular daily habit' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'C1 mixed conditional',
    nodeTitle: 'Mixed conditionals',
    item: mcq({
      stem: 'If she had studied medicine, she ______ a doctor now.',
      level: 'C1',
      nodeIds: ['gram.c1.mixed_conditional'],
      options: [
        { text: 'would be', misconception: null },
        { text: 'would have been', misconception: 'uses third conditional result for a present-time consequence' },
        { text: 'will be', misconception: 'uses first conditional form for an unreal past condition' },
        { text: 'is', misconception: 'states the present result as fact when the condition is unreal' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
]

// ─── GOLDEN BAD ITEMS ────────────────────────────────────────────────────

const badItems: GoldenQualityItem[] = [
  {
    label: 'unnatural: over-formal register for A2',
    nodeTitle: 'Past simple with regular verbs',
    item: mcq({
      stem: 'I proceeded to the educational institution and ______ my scholarly obligations.',
      level: 'A2',
      nodeIds: ['gram.a2.past_simple_regular'],
      options: [
        { text: 'completed', misconception: null },
        { text: 'complete', misconception: 'uses present tense for a past event' },
        { text: 'completing', misconception: 'uses the gerund as a finite verb' },
        { text: 'have completed', misconception: 'uses present perfect for a simple past narrative' },
      ],
    }),
    expected: { naturalness: 'reject', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'unnatural: textbook-stilted construction',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'The boy, who is my neighbor, ______ his bicycle to the repair shop which is located on Main Street.',
      options: [
        { text: 'has taken', misconception: null },
        { text: 'took', misconception: 'uses past simple when the action has current relevance' },
        { text: 'was taking', misconception: 'treats a completed action as ongoing in the past' },
        { text: 'takes', misconception: 'uses present simple for a specific recent action' },
      ],
    }),
    expected: { naturalness: 'reject', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'inauthentic: absurd scenario',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'The cat ______ the quarterly financial report to the board of directors.',
      options: [
        { text: 'has submitted', misconception: null },
        { text: 'submitted', misconception: 'uses past simple when the submission has current relevance' },
        { text: 'was submitting', misconception: 'treats a completed submission as ongoing' },
        { text: 'submits', misconception: 'uses present simple for a specific past event' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'reject', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'inauthentic: grammar shoehorned into implausible context',
    nodeTitle: 'Third conditional',
    item: mcq({
      stem: 'If the pencil ______ the algebra test, it would have graduated from university.',
      level: 'B2',
      nodeIds: ['gram.b2.third_conditional'],
      options: [
        { text: 'had passed', misconception: null },
        { text: 'passed', misconception: 'uses second conditional form for an unreal past event' },
        { text: 'has passed', misconception: 'uses present perfect for a hypothetical past situation' },
        { text: 'would pass', misconception: 'places the would-clause in both halves of the conditional' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'reject', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'teacher reject: ambiguous stem with two defensible answers',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'She ______ in London.',
      options: [
        { text: 'has lived', misconception: null },
        { text: 'lived', misconception: 'uses past simple for an ongoing situation' },
        { text: 'was living', misconception: 'treats a state as a temporary action' },
        { text: 'is living', misconception: 'uses present continuous for a permanent state' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'reject', explanatoryTransfer: 'pass' },
  },
  {
    label: 'teacher reject: correct answer depends on unstated context',
    nodeTitle: 'Modals: should for advice',
    item: mcq({
      stem: 'You ______ talk to someone about it.',
      nodeIds: ['gram.b1.modal_should'],
      options: [
        { text: 'should', misconception: null },
        { text: 'could', misconception: 'weakens advice to mere possibility' },
        { text: 'must', misconception: 'selects obligation when the context calls for advice' },
        { text: 'would', misconception: 'uses hypothetical would for a real suggestion' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'reject', explanatoryTransfer: 'pass' },
  },
  {
    label: 'weak explanation: labels without explaining',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'I ______ my keys. I cannot open the door.',
      options: [
        { text: 'have lost', misconception: null },
        { text: 'lost', misconception: 'wrong tense' },
        { text: 'was losing', misconception: 'wrong form' },
        { text: 'am losing', misconception: 'incorrect' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'reject' },
  },
  {
    label: 'weak explanation: meta-commentary instead of teaching',
    nodeTitle: 'Past simple with regular verbs',
    item: mcq({
      stem: 'They ______ football every Saturday when they were young.',
      level: 'A2',
      nodeIds: ['gram.a2.past_simple_regular'],
      options: [
        { text: 'played', misconception: null },
        { text: 'play', misconception: 'this is a common mistake students make' },
        { text: 'are playing', misconception: 'learners often confuse this' },
        { text: 'have played', misconception: 'this distractor tests tense awareness' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'reject' },
  },
  {
    label: 'multi: unnatural + inauthentic',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'The refrigerator ______ the philosophical implications of quantum mechanics with great enthusiasm.',
      options: [
        { text: 'has discussed', misconception: null },
        { text: 'discussed', misconception: 'uses past simple for current relevance' },
        { text: 'was discussing', misconception: 'treats as ongoing' },
        { text: 'discusses', misconception: 'uses present for past' },
      ],
    }),
    expected: { naturalness: 'reject', authenticity: 'reject', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'multi: teacher-reject + weak-explanation',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'He ______ the book.',
      options: [
        { text: 'has read', misconception: null },
        { text: 'read', misconception: 'wrong' },
        { text: 'was reading', misconception: 'bad choice' },
        { text: 'reads', misconception: 'error' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'reject', explanatoryTransfer: 'reject' },
  },
]

// ─── Calibration tests ───────────────────────────────────────────────────

describe.skipIf(!QUALITY_PROVIDER)('golden quality set calibration', () => {
  const provider = QUALITY_PROVIDER ? createGeminiProvider(QUALITY_PROVIDER) : null
  const allItems = [...goodItems, ...badItems]

  let results: Array<{ item: GoldenQualityItem; review: LlmReview }> = []

  it('evaluates all 20 golden items', async () => {
    results = await Promise.all(
      allItems.map(async (golden) => {
        const review = await reviewItemLlm(golden.item, provider!, golden.nodeTitle)
        return { item: golden, review }
      }),
    )

    expect(results).toHaveLength(20)
  }, 60_000)

  function agreementRate(dimension: keyof GoldenQualityItem['expected']): number {
    if (results.length === 0) return 0

    const rubricKey = dimension as keyof NonNullable<LlmReview['raw']>

    let agreements = 0
    for (const { item, review } of results) {
      if (!review.raw) continue

      const expected = item.expected[dimension]
      const actual = review.raw[rubricKey].verdict

      // Relaxed match: pass agrees with pass; non-pass agrees with non-pass.
      const passExpected = expected === 'pass'
      const passActual = actual === 'pass'
      if (passExpected === passActual) agreements++
    }

    return agreements / results.length
  }

  it('agrees with human labels on >= 80% of naturalness verdicts', () => {
    const rate = agreementRate('naturalness')
    expect(rate, `Naturalness agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })

  it('agrees with human labels on >= 80% of authenticity verdicts', () => {
    const rate = agreementRate('authenticity')
    expect(rate, `Authenticity agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })

  it('agrees with human labels on >= 80% of teacherTest verdicts', () => {
    const rate = agreementRate('teacherTest')
    expect(rate, `Teacher test agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })

  it('agrees with human labels on >= 80% of explanatoryTransfer verdicts', () => {
    const rate = agreementRate('explanatoryTransfer')
    expect(rate, `Explanatory transfer agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })
})
