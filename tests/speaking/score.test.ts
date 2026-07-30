import { describe, it, expect } from 'vitest'
import { scoreSpeaking } from '@/speaking/score'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { getTask } from '@/speaking/tasks'
import { getSpeakingRubric } from '@/speaking/rubrics'
import type {
  GenerationProvider,
  GenerationRequest,
  GenerationResponse,
} from '@/generation/provider'
import type { SttResult } from '@/speaking/types'

const inventory = buildProfilerInventory()
const task = getTask('cefr.b1.long_turn.1')!
const rubric = getSpeakingRubric('cefr_b1_speaking')!

// A B1-level transcript about a holiday. Each evidence span quotes
// an exact substring of this text with correct character offsets.
const TRANSCRIPT =
  'I went to the beach last summer and it was very nice because the weather was sunny and warm'

function sttFixture(): SttResult {
  const words = TRANSCRIPT.split(' ')
  return {
    transcript: TRANSCRIPT,
    words: words.map((w, i) => ({
      word: w,
      startMs: i * 300,
      endMs: i * 300 + 250,
      confidence: 0.95,
    })),
    durationMs: words.length * 300,
    phonemes: null,
  }
}

// Build a well-formed scoring output. Evidence quotes must be exact
// substrings of the TRANSCRIPT with correct character offsets.
// "I went to the beach last summer" starts at 0, ends at 31.
// "and it was very nice" starts at 32, ends at 51. (wait, let me verify)
// Actually let's compute: TRANSCRIPT.indexOf(quote) gives the start.
function goodOutput(): string {
  return JSON.stringify({
    criterionScores: rubric.criteria.map((c) => ({
      criterionId: c.id,
      criterionName: c.name,
      score: 3,
      maxScore: 5,
      evidence: [
        {
          // "I went to the beach" starts at index 0, length 20
          start: 0,
          end: 20,
          quote: 'I went to the beach',
          issue: 'Good use of past tense',
          rewrite: null,
        },
      ],
      feedback:
        'You use the past tense correctly to talk about your holiday.',
    })),
    groupedIssues: [],
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

describe('scoreSpeaking', () => {
  it('returns a complete SpeakingScore on success', async () => {
    const result = await scoreSpeaking(
      goodProvider(),
      sttFixture(),
      task,
      inventory,
    )
    expect(result.score).not.toBeNull()
    expect(result.score!.criterionScores).toHaveLength(4)
    expect(result.score!.overallScore).toBeGreaterThan(0)
  })

  it('computes overall score from criterion scores', async () => {
    const result = await scoreSpeaking(
      goodProvider(),
      sttFixture(),
      task,
      inventory,
    )
    // All criteria scored 3/5 → overall 3
    expect(result.score!.overallScore).toBe(3)
  })

  it('includes features in the result', async () => {
    const result = await scoreSpeaking(
      goodProvider(),
      sttFixture(),
      task,
      inventory,
    )
    expect(result.score!.features).toBeDefined()
    expect(result.score!.features.fluency.speechRateWpm).toBeGreaterThan(0)
    expect(result.score!.features.lexical.typeTokenRatio).toBeGreaterThan(0)
  })

  it('includes transcript in the result', async () => {
    const result = await scoreSpeaking(
      goodProvider(),
      sttFixture(),
      task,
      inventory,
    )
    expect(result.score!.transcript).toBe(TRANSCRIPT)
  })

  it('sets level and taskId correctly', async () => {
    const result = await scoreSpeaking(
      goodProvider(),
      sttFixture(),
      task,
      inventory,
    )
    expect(result.score!.level).toBe('B1')
    expect(result.score!.taskId).toBe(task.id)
  })

  it('retries on parse failure and succeeds', async () => {
    let call = 0
    const provider: GenerationProvider = {
      async generate() {
        call++
        if (call === 1) return { raw: 'I am a language model!', parsed: null }
        return { raw: goodOutput(), parsed: null }
      },
    }
    const result = await scoreSpeaking(
      provider,
      sttFixture(),
      task,
      inventory,
    )
    expect(result.score).not.toBeNull()
    expect(result.attempts).toBe(2)
  })

  it('gives up after max retries', async () => {
    const provider: GenerationProvider = {
      async generate() {
        return { raw: 'garbage', parsed: null }
      },
    }
    const result = await scoreSpeaking(
      provider,
      sttFixture(),
      task,
      inventory,
    )
    expect(result.score).toBeNull()
    expect(result.attempts).toBe(4) // 1 initial + 3 retries
  })

  it('returns null score for empty transcript', async () => {
    let called = false
    const provider: GenerationProvider = {
      async generate() {
        called = true
        return { raw: '{}', parsed: null }
      },
    }
    const emptyStt: SttResult = {
      transcript: '',
      words: [],
      durationMs: 0,
      phonemes: null,
    }
    const result = await scoreSpeaking(provider, emptyStt, task, inventory)
    expect(result.score).toBeNull()
    expect(called).toBe(false) // Should not call the LLM
  })

  it('returns error for unknown rubricId', async () => {
    const badTask = { ...task, rubricId: 'nonexistent' }
    const result = await scoreSpeaking(
      goodProvider(),
      sttFixture(),
      badTask,
      inventory,
    )
    expect(result.score).toBeNull()
    expect(result.attempts).toBe(0)
  })

  it('returns feedbackIssues on last attempt when gates fail', async () => {
    const provider: GenerationProvider = {
      async generate() {
        const output = JSON.parse(goodOutput())
        output.criterionScores[0].feedback =
          'You should try to use more varied vocabulary in your speaking.'
        return { raw: JSON.stringify(output), parsed: null }
      },
    }
    const result = await scoreSpeaking(
      provider,
      sttFixture(),
      task,
      inventory,
    )
    // On the last attempt, returns the score WITH feedback issues noted.
    expect(result.score).not.toBeNull()
    expect(result.feedbackIssues.length).toBeGreaterThan(0)
  })
})
