import { describe, it, expect } from 'vitest'
import { parseModelOutput } from '@/generation/provider'

const VALID = {
  stem: 'She ______ here since 2019.',
  options: [
    { text: 'has lived', misconception: null },
    { text: 'lived', misconception: 'uses past simple for an unfinished time span' },
    { text: 'is living', misconception: 'treats a duration as a temporary action' },
    { text: 'lives', misconception: 'ignores the time reference entirely' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_duration'],
}

describe('parseModelOutput', () => {
  it('parses clean JSON', () => {
    expect(parseModelOutput(JSON.stringify(VALID))).toEqual(VALID)
  })

  it('strips markdown fences', () => {
    const wrapped = '```json\n' + JSON.stringify(VALID, null, 2) + '\n```'
    expect(parseModelOutput(wrapped)).toEqual(VALID)
  })

  it('strips bare fences without the json tag', () => {
    const wrapped = '```\n' + JSON.stringify(VALID) + '\n```'
    expect(parseModelOutput(wrapped)).toEqual(VALID)
  })

  it('handles leading/trailing whitespace', () => {
    expect(parseModelOutput('  \n' + JSON.stringify(VALID) + '\n  ')).toEqual(VALID)
  })

  it('returns null for invalid JSON', () => {
    expect(parseModelOutput('not json at all')).toBeNull()
  })

  it('returns null when stem is missing', () => {
    const { stem: _, ...rest } = VALID
    expect(parseModelOutput(JSON.stringify(rest))).toBeNull()
  })

  it('returns null when options is not an array', () => {
    expect(parseModelOutput(JSON.stringify({ ...VALID, options: 'wrong' }))).toBeNull()
  })

  it('returns null when correctIndex is not a number', () => {
    expect(parseModelOutput(JSON.stringify({ ...VALID, correctIndex: 'zero' }))).toBeNull()
  })

  it('returns null when nodeIds is missing', () => {
    const { nodeIds: _, ...rest } = VALID
    expect(parseModelOutput(JSON.stringify(rest))).toBeNull()
  })

  it('returns null when an option has a non-string text', () => {
    const bad = { ...VALID, options: [{ text: 42, misconception: null }] }
    expect(parseModelOutput(JSON.stringify(bad))).toBeNull()
  })

  it('returns null when misconception is neither string nor null', () => {
    const bad = {
      ...VALID,
      options: [{ text: 'ok', misconception: 123 }],
    }
    expect(parseModelOutput(JSON.stringify(bad))).toBeNull()
  })

  it('accepts null misconception on the correct option', () => {
    const result = parseModelOutput(JSON.stringify(VALID))
    expect(result!.options[0]!.misconception).toBeNull()
  })

  it('strips extra fields from the output', () => {
    const bloated = { ...VALID, temperature: 0.7, model: 'gemini-2.5-flash' }
    const result = parseModelOutput(JSON.stringify(bloated))
    expect(result).toEqual(VALID)
    expect((result as unknown as Record<string, unknown>)['temperature']).toBeUndefined()
  })
})
