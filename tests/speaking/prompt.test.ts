import { describe, it, expect } from 'vitest'
import { buildSpeakingScoringPrompt } from '@/speaking/prompt'
import { getSpeakingRubric } from '@/speaking/rubrics'
import { getTask } from '@/speaking/tasks'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { SttResult, SpeechFeatures } from '@/speaking/types'

const inventory = buildProfilerInventory()
const task = getTask('cefr.b1.long_turn.1')!
const rubric = getSpeakingRubric('cefr_b1_speaking')!

function sttFixture(): SttResult {
  return {
    transcript:
      'I think the city is a very nice place because there are many shops',
    words: [
      { word: 'I', startMs: 0, endMs: 200, confidence: 0.99 },
      { word: 'think', startMs: 210, endMs: 500, confidence: 0.98 },
    ],
    durationMs: 4000,
    phonemes: null,
  }
}

function featuresFixture(): SpeechFeatures {
  return {
    fluency: {
      speechRateWpm: 120,
      articulationRateWpm: 145,
      pauseCount: 3,
      meanPauseDurationMs: 650,
      fillerCount: 2,
      falseStartCount: 0,
      meanLengthOfRunWords: 5.5,
    },
    lexical: {
      typeTokenRatio: 0.85,
      vocabularyLevelProfile: { A1: 0.5, A2: 0.3, B1: 0.15, B2: 0.05, C1: 0, C2: 0 },
      lexicalDensity: 0.48,
      repetitionRate: 0.08,
    },
    grammar: {
      structuresAttempted: 4,
      structuresAccurate: 3,
      meanLengthOfUtterance: 6.5,
      errorDensity: 0.03,
    },
    pronunciation: {
      meanWordConfidence: 0.92,
      lowConfidenceWords: [
        { word: 'restaurants', confidence: 0.45, startMs: 3000, endMs: 3500 },
      ],
      phonemeAccuracy: null,
      mispronounced: [],
    },
  }
}

describe('buildSpeakingScoringPrompt', () => {
  const prompt = buildSpeakingScoringPrompt(
    sttFixture(),
    featuresFixture(),
    task,
    rubric,
    inventory,
  )

  it('includes the transcript', () => {
    expect(prompt).toContain('I think the city is a very nice place')
  })

  it('includes the task prompt', () => {
    expect(prompt).toContain(task.prompt)
  })

  it('includes the learner level', () => {
    expect(prompt).toContain('Level: B1')
  })

  it('includes all rubric criteria', () => {
    for (const criterion of rubric.criteria) {
      expect(prompt).toContain(criterion.name)
    }
  })

  it('includes band descriptors', () => {
    // At least one descriptor should appear.
    expect(prompt).toContain(rubric.criteria[0]!.descriptors[3]!.description)
  })

  it('includes computed speech features', () => {
    expect(prompt).toContain('Speech rate: 120 wpm')
    expect(prompt).toContain('Articulation rate: 145 wpm')
    expect(prompt).toContain('Pauses (>250ms): 3')
    expect(prompt).toContain('Type-token ratio: 0.85')
    expect(prompt).toContain('Structures attempted: 4')
    expect(prompt).toContain('Mean word confidence: 0.92')
  })

  it('includes low-confidence words', () => {
    expect(prompt).toContain('"restaurants" (confidence: 0.45)')
  })

  it('demands evidence spans from the transcript', () => {
    expect(prompt).toContain('exact text from the transcript')
    expect(prompt).toContain('exact character offsets')
  })

  it('bans generic feedback', () => {
    expect(prompt).toContain('NEVER give generic feedback')
  })

  it('demands JSON output', () => {
    expect(prompt).toContain('single JSON object')
    expect(prompt).toContain('criterionScores')
    expect(prompt).toContain('groupedIssues')
  })

  it('specifies feedback at the learner level', () => {
    expect(prompt).toContain('vocabulary at B1 level or below')
  })

  it('instructs the model not to override computed features', () => {
    expect(prompt).toContain('Do NOT override or')
    expect(prompt).toContain('computed deterministically')
  })

  it('includes the score range', () => {
    expect(prompt).toContain('Scale: 0 to 5')
  })
})
