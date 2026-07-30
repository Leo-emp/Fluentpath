import { describe, it, expect } from 'vitest'
import { scoreWriting } from '@/writing/score'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { getTask } from '@/writing/tasks'
import type {
  GenerationProvider,
  GenerationRequest,
  GenerationResponse,
} from '@/generation/provider'
import type { WritingResponse } from '@/writing/types'

const inventory = buildProfilerInventory()
const task = getTask('cefr.b1.essay.1')!

// 130+ words — must exceed the B1 essay task's 120-word minimum.
const LEARNER_TEXT =
  'I think city life is better than country life. In the city, there are many shops and restaurants. You can find everything you need very easily. Also, there is good public transport so you do not need a car. However, the city is very noisy and expensive. The air is not very clean because of the traffic. I prefer the city because I like to go out with friends and there are more jobs available. You can go to the cinema, eat at different restaurants, and visit museums. But I understand why some people want to live in the country because it is more quiet and peaceful. The country has fresh air and beautiful nature. In the end, I believe the city is the best place for young people who want to have an active social life and find good work.'

function response(): WritingResponse {
  return {
    taskId: task.id,
    text: LEARNER_TEXT,
    submittedAt: 1700000000000,
    timeTakenSeconds: null,
  }
}

// A well-formed scoring output the model might return.
function goodOutput(): string {
  return JSON.stringify({
    criterionScores: [
      {
        criterionId: 'task_achievement',
        criterionName: 'Task Achievement',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 0,
            end: 46,
            quote: 'I think city life is better than country life',
            issue: 'States opinion clearly',
            rewrite: null,
          },
        ],
        feedback:
          'You state your opinion clearly at the start. You give reasons for your choice, which is good.',
      },
      {
        criterionId: 'coherence',
        criterionName: 'Coherence and Cohesion',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 207,
            end: 215,
            quote: 'However,',
            issue: 'Good use of contrast linker',
            rewrite: null,
          },
        ],
        feedback:
          'You use linking words like "also" and "however" to connect your ideas.',
      },
      {
        criterionId: 'vocabulary',
        criterionName: 'Lexical Resource',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 47,
            end: 97,
            quote:
              'In the city, there are many shops and restaurants.',
            issue: 'Appropriate vocabulary',
            rewrite: null,
          },
        ],
        feedback:
          'Your vocabulary is correct for this level. You use words about daily life well.',
      },
      {
        criterionId: 'grammar',
        criterionName: 'Grammatical Range and Accuracy',
        score: 3,
        maxScore: 5,
        evidence: [
          {
            start: 539,
            end: 555,
            quote: 'it is more quiet',
            issue: 'Comparative form error',
            rewrite: 'it is quieter',
          },
        ],
        feedback:
          'Most of your sentences are correct. One small error: "more quiet" should be "quieter".',
      },
    ],
    groupedIssues: [
      {
        category: 'comparative_form',
        description:
          'Incorrect comparative form for short adjectives',
        count: 1,
        priority: 'high',
        examples: [
          {
            start: 539,
            end: 555,
            quote: 'it is more quiet',
            issue:
              '"more quiet" should be "quieter" for single-syllable adjectives',
            rewrite: 'it is quieter',
          },
        ],
      },
    ],
  })
}

function goodProvider(): GenerationProvider {
  return {
    async generate(
      _req: GenerationRequest,
    ): Promise<GenerationResponse> {
      return { raw: goodOutput(), parsed: null }
    },
  }
}

describe('scoreWriting', () => {
  it('returns a complete WritingScore on success', async () => {
    const result = await scoreWriting(
      goodProvider(),
      response(),
      task,
      inventory,
    )
    expect(result.score).not.toBeNull()
    expect(result.score!.criterionScores).toHaveLength(4)
    expect(result.score!.overallScore).toBeGreaterThan(0)
    expect(result.score!.wordCount).toBeGreaterThan(0)
  })

  it('computes overall score from criterion scores', async () => {
    const result = await scoreWriting(
      goodProvider(),
      response(),
      task,
      inventory,
    )
    // All criteria scored 3/5 → overall 3
    expect(result.score!.overallScore).toBe(3)
  })

  it('includes grouped issues', async () => {
    const result = await scoreWriting(
      goodProvider(),
      response(),
      task,
      inventory,
    )
    expect(result.score!.groupedIssues.length).toBeGreaterThan(0)
  })

  it('retries on parse failure and succeeds', async () => {
    let call = 0
    const provider: GenerationProvider = {
      async generate() {
        call++
        // First call returns garbage, second returns good output.
        if (call === 1) return { raw: 'I am a language model!', parsed: null }
        return { raw: goodOutput(), parsed: null }
      },
    }
    const result = await scoreWriting(provider, response(), task, inventory)
    expect(result.score).not.toBeNull()
    expect(result.attempts).toBe(2)
  })

  it('gives up after max retries', async () => {
    const provider: GenerationProvider = {
      async generate() {
        return { raw: 'garbage', parsed: null }
      },
    }
    const result = await scoreWriting(provider, response(), task, inventory)
    expect(result.score).toBeNull()
    expect(result.attempts).toBe(4) // 1 initial + 3 retries
  })

  it('rejects text below minimum words without calling the LLM', async () => {
    let called = false
    const provider: GenerationProvider = {
      async generate() {
        called = true
        return { raw: '{}', parsed: null }
      },
    }
    const short: WritingResponse = {
      taskId: task.id,
      text: 'Too short.',
      submittedAt: 0,
      timeTakenSeconds: null,
    }
    const result = await scoreWriting(provider, short, task, inventory)
    expect(result.score).toBeNull()
    expect(result.validationIssues).toContain('below_minimum')
    expect(called).toBe(false)
  })

  it('sets the level and taskId on the result', async () => {
    const result = await scoreWriting(
      goodProvider(),
      response(),
      task,
      inventory,
    )
    expect(result.score!.level).toBe('B1')
    expect(result.score!.taskId).toBe(task.id)
  })

  it('returns feedbackIssues on last attempt when gates fail', async () => {
    // A provider that returns valid structure but with generic feedback.
    const provider: GenerationProvider = {
      async generate() {
        const output = JSON.parse(goodOutput())
        output.criterionScores[0].feedback =
          'You should try to use more varied vocabulary in your writing.'
        return { raw: JSON.stringify(output), parsed: null }
      },
    }
    const result = await scoreWriting(provider, response(), task, inventory)
    // On the last attempt, it returns the score WITH feedback issues noted.
    expect(result.score).not.toBeNull()
    expect(result.feedbackIssues.length).toBeGreaterThan(0)
  })

  it('returns error for unknown rubricId', async () => {
    const badTask = { ...task, rubricId: 'nonexistent' }
    const result = await scoreWriting(
      goodProvider(),
      response(),
      badTask,
      inventory,
    )
    expect(result.score).toBeNull()
    expect(result.attempts).toBe(0)
    expect(result.validationIssues[0]).toContain('Unknown rubric')
  })

  it('reports word count in the score', async () => {
    const result = await scoreWriting(
      goodProvider(),
      response(),
      task,
      inventory,
    )
    expect(result.score!.wordCount).toBeGreaterThan(50)
  })
})
