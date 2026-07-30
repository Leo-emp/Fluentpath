import { describe, it, expect } from 'vitest'
import { buildScoringPrompt } from '@/writing/prompt'
import { getRubric } from '@/writing/rubrics'
import type { WritingTask, WritingResponse } from '@/writing/types'
import { buildProfilerInventory } from '@/profiler/build-inventory'

const inventory = buildProfilerInventory()

function task(): WritingTask {
  return {
    id: 'test.b1',
    type: 'essay',
    level: 'B1',
    exam: 'cefr',
    prompt: 'Do you prefer city or country life?',
    minWords: 120,
    maxWords: 180,
    timeLimitMinutes: null,
    rubricId: 'cefr_b1',
  }
}

const LEARNER_TEXT =
  'I think city life is better than country life. In the city, there are many shops and restaurants. You can find everything you need. Also, there is good public transport. However, the city is very noisy and expensive. I prefer the city because I like to go out with friends and there are more jobs. But I understand why some people want to live in the country because it is more quiet.'

function response(): WritingResponse {
  return {
    taskId: 'test.b1',
    text: LEARNER_TEXT,
    submittedAt: 1700000000000,
    timeTakenSeconds: null,
  }
}

describe('buildScoringPrompt', () => {
  const rubric = getRubric('cefr_b1')!
  const prompt = buildScoringPrompt(response(), task(), rubric, inventory)

  it('includes the learner text', () => {
    expect(prompt).toContain('I think city life is better')
  })

  it('includes the task prompt', () => {
    expect(prompt).toContain('city or country life')
  })

  it('includes every criterion name from the rubric', () => {
    for (const criterion of rubric.criteria) {
      expect(prompt).toContain(criterion.name)
    }
  })

  it('includes band descriptors so the model knows the scale', () => {
    // B1 rubric uses 0–5 scale.
    expect(prompt).toContain('0:')
    expect(prompt).toContain('5:')
  })

  it('demands evidence spans with character offsets', () => {
    expect(prompt).toContain('start')
    expect(prompt).toContain('end')
    expect(prompt).toContain('quote')
  })

  it('demands concrete rewrites', () => {
    expect(prompt).toContain('rewrite')
  })

  it('demands issue grouping', () => {
    expect(prompt.toLowerCase()).toContain('group')
  })

  it('demands priority layering', () => {
    expect(prompt).toContain('priority')
  })

  it('instructs the model to respond as JSON', () => {
    expect(prompt).toContain('JSON')
  })

  it('specifies the target level for feedback language', () => {
    expect(prompt).toContain('B1')
  })

  it('bans generic feedback explicitly', () => {
    expect(prompt.toLowerCase()).toContain('generic')
  })

  it('includes criterion weights', () => {
    expect(prompt).toContain('weight: 0.25')
  })

  it('includes criterion ids for structured output', () => {
    expect(prompt).toContain('"task_achievement"')
    expect(prompt).toContain('"coherence"')
  })
})
