import { describe, it, expect } from 'vitest'
import { generateItem } from '@/generation/generate'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { GenerationProvider, GenerationRequest, GenerationResponse } from '@/generation/provider'
import type { SkillNode } from '@/skill-graph/types'

const inventory = buildProfilerInventory()

function node(level: SkillNode['level'] = 'B1'): SkillNode {
  return {
    id: 'gram.b1.pp_vs_past',
    type: 'grammar',
    level,
    skill: 'general',
    title: 'Present perfect vs past simple',
    description: '',
    metadata: null,
  }
}

// A valid MCQ that passes all quality gates at B1.
const GOOD_MCQ = {
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past'],
}

// Bad: only 3 options, missing misconceptions, giveaway time marker.
const BAD_MCQ = {
  stem: 'We ______ to Japan in 2018.',
  options: [
    { text: 'went', misconception: null },
    { text: 'have gone', misconception: null },
    { text: 'have go', misconception: null },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past'],
}

// Helper: build a provider from a sequence of responses.
function sequenceProvider(responses: Array<string | object>): GenerationProvider {
  let call = 0
  return {
    async generate(_req: GenerationRequest): Promise<GenerationResponse> {
      const r = responses[call] ?? responses[responses.length - 1]
      call++
      const raw = typeof r === 'string' ? r : JSON.stringify(r)
      return { raw, parsed: null }
    },
  }
}

describe('generateItem', () => {
  it('returns the item when the first attempt passes', async () => {
    const provider = sequenceProvider([GOOD_MCQ])
    const result = await generateItem(provider, inventory, {
      node: node(),
      itemId: 'item.gen.1',
    })

    expect(result.item).not.toBeNull()
    expect(result.item!.id).toBe('item.gen.1')
    expect(result.item!.level).toBe('B1')
    expect(result.review!.passed).toBe(true)
    expect(result.attempts).toHaveLength(1)
    expect(result.attempts[0]!.kind).toBe('success')
  })

  it('retries on parse failure and succeeds', async () => {
    const provider = sequenceProvider([
      'I am a language model and here is your question!',
      GOOD_MCQ,
    ])
    const result = await generateItem(provider, inventory, {
      node: node(),
      itemId: 'item.gen.2',
    })

    expect(result.item).not.toBeNull()
    expect(result.attempts).toHaveLength(2)
    expect(result.attempts[0]!.kind).toBe('parse_failure')
    expect(result.attempts[1]!.kind).toBe('success')
  })

  it('retries on gate failure and succeeds', async () => {
    const provider = sequenceProvider([BAD_MCQ, GOOD_MCQ])
    const result = await generateItem(provider, inventory, {
      node: node(),
      itemId: 'item.gen.3',
    })

    expect(result.item).not.toBeNull()
    expect(result.attempts).toHaveLength(2)
    expect(result.attempts[0]!.kind).toBe('gate_failure')
    expect(result.attempts[1]!.kind).toBe('success')
  })

  it('gives up after max retries and returns the last gate failure', async () => {
    const provider = sequenceProvider([BAD_MCQ, BAD_MCQ, BAD_MCQ, BAD_MCQ])
    const result = await generateItem(provider, inventory, {
      node: node(),
      itemId: 'item.gen.4',
    })

    expect(result.item).not.toBeNull()
    expect(result.review!.passed).toBe(false)
    expect(result.attempts).toHaveLength(4)
    expect(result.attempts.every((a) => a.kind === 'gate_failure')).toBe(true)
  })

  it('returns null item when all attempts are parse failures', async () => {
    const provider = sequenceProvider(['garbage', 'still garbage', '???', '!!!!'])
    const result = await generateItem(provider, inventory, {
      node: node(),
      itemId: 'item.gen.5',
    })

    expect(result.item).toBeNull()
    expect(result.review).toBeNull()
    expect(result.attempts).toHaveLength(4)
  })

  it('uses the node level when no explicit level is given', async () => {
    const provider = sequenceProvider([GOOD_MCQ])
    const result = await generateItem(provider, inventory, {
      node: node('B1'),
      itemId: 'item.gen.6',
    })

    expect(result.item!.level).toBe('B1')
  })

  it('uses an explicit level when provided', async () => {
    // The good MCQ is valid at A2 too — it uses only basic vocabulary.
    const provider = sequenceProvider([GOOD_MCQ])
    const result = await generateItem(provider, inventory, {
      node: node('B1'),
      level: 'A2',
      itemId: 'item.gen.7',
    })

    expect(result.item!.level).toBe('A2')
  })

  it('passes the prompt to the provider', async () => {
    let captured: GenerationRequest | null = null
    const provider: GenerationProvider = {
      async generate(req) {
        captured = req
        return { raw: JSON.stringify(GOOD_MCQ), parsed: null }
      },
    }

    await generateItem(provider, inventory, { node: node(), itemId: 'item.gen.8' })

    expect(captured).not.toBeNull()
    expect(captured!.prompt).toContain('gram.b1.pp_vs_past')
    expect(captured!.prompt).toContain('B1')
    expect(captured!.prompt).toContain('JSON')
  })

  it('handles markdown-fenced JSON from the model', async () => {
    const fenced = '```json\n' + JSON.stringify(GOOD_MCQ, null, 2) + '\n```'
    const provider = sequenceProvider([fenced])
    const result = await generateItem(provider, inventory, {
      node: node(),
      itemId: 'item.gen.9',
    })

    expect(result.item).not.toBeNull()
    expect(result.attempts[0]!.kind).toBe('success')
  })
})
