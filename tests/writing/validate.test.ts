import { describe, it, expect } from 'vitest'
import { validateResponse } from '@/writing/validate'
import type { WritingTask, WritingResponse } from '@/writing/types'

// Helper to build a task with optional overrides.
function task(overrides: Partial<WritingTask> = {}): WritingTask {
  return {
    id: 'test.task',
    type: 'essay',
    level: 'B1',
    exam: 'cefr',
    prompt: 'Write about your opinion on this topic.',
    minWords: 100,
    maxWords: 200,
    timeLimitMinutes: null,
    rubricId: 'cefr_b1',
    ...overrides,
  }
}

function response(text: string): WritingResponse {
  return { taskId: 'test.task', text, submittedAt: 1700000000000, timeTakenSeconds: null }
}

describe('validateResponse', () => {
  it('passes a response within word limits', () => {
    const text = 'word '.repeat(150).trim()
    const result = validateResponse(response(text), task())
    expect(result.valid).toBe(true)
    expect(result.wordCount).toBe(150)
  })

  it('rejects text below minimum words', () => {
    const result = validateResponse(response('Too short.'), task())
    expect(result.valid).toBe(false)
    expect(result.issues).toContain('below_minimum')
  })

  it('warns but does not reject text above maximum words', () => {
    const text = 'word '.repeat(250).trim()
    const result = validateResponse(response(text), task())
    expect(result.valid).toBe(true)
    expect(result.warnings).toContain('above_maximum')
  })

  it('rejects empty text', () => {
    const result = validateResponse(response(''), task())
    expect(result.valid).toBe(false)
    expect(result.issues).toContain('empty')
  })

  it('rejects whitespace-only text', () => {
    const result = validateResponse(response('   \n\n  '), task())
    expect(result.valid).toBe(false)
    expect(result.issues).toContain('empty')
  })

  it('detects copy of the prompt', () => {
    const t = task({ prompt: 'Write about your daily routine.' })
    const result = validateResponse(
      response('Write about your daily routine. I wake up at seven.'),
      t,
    )
    expect(result.warnings).toContain('contains_prompt')
  })

  it('reports word count accurately', () => {
    const result = validateResponse(
      response('One two three four five.'),
      task({ minWords: 1 }),
    )
    expect(result.wordCount).toBe(5)
  })

  it('counts hyphenated words as one word', () => {
    const result = validateResponse(
      response('This is a well-known fact in modern-day life.'),
      task({ minWords: 1 }),
    )
    expect(result.wordCount).toBe(8)
  })

  it('does not flag short prompts for copy detection', () => {
    const t = task({ prompt: 'Go.' })
    const result = validateResponse(
      response('Go. I went to the park today with my friends.'),
      t,
    )
    // Prompt is too short (< 20 chars normalised) to trigger detection.
    expect(result.warnings).not.toContain('contains_prompt')
  })

  it('handles multiple issues simultaneously', () => {
    const result = validateResponse(response(''), task())
    expect(result.valid).toBe(false)
    expect(result.issues.length).toBeGreaterThan(0)
  })
})
