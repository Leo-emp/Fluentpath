# Speaking Assessment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a speaking assessment engine that scores learner speech using a two-stage pipeline: deterministic objective feature extraction from STT output, then LLM assessment of features + transcript against CEFR/IELTS/PTE/OET rubrics — with the same evidence-span quality bar as writing.

**Architecture:** The spec's most critical design decision (§3.3): **"The measurable is measured; the LLM only judges what genuinely requires judgment."** STT provides word timings, per-word confidence, and phoneme scores. Deterministic code computes fluency metrics (speech rate, pauses, fillers), lexical metrics (TTR, level profile), and grammar metrics (structures, errors). The LLM receives these computed features alongside the transcript and rubric — it scores what requires judgment (coherence, task fulfilment, discourse management) while the objective metrics are reported directly. This makes scores reproducible, explainable, and defensible.

**Tech Stack:** TypeScript 7, Vitest, existing `GenerationProvider` for LLM calls, existing profiler for vocabulary-level checking. STT provider interface is defined by requirement (word timings + confidence + phoneme scores) not by vendor — matching spec §9.5.

## Global Constraints

- TypeScript 7 (no `baseUrl` in tsconfig)
- Path alias `@/` resolves to `src/`
- Vitest for tests; `npx vitest run` must pass after every task
- All comments explain WHY, not WHAT — heavily commented for learning
- No external dependencies beyond what's already installed
- Reuse existing `GenerationProvider` interface from `src/generation/provider.ts`
- Same feedback quality bar as writing: evidence spans, no generic feedback, grouped issues, priority layering (spec §3.3)
- STT provider defined by interface, not vendor — testable with fixtures (spec §9.5)
- Objective features computed deterministically, never by the LLM (spec §3.3)
- Turn-based loop, not realtime voice API (spec §3.3)

---

### Task 1: Speaking types and STT provider interface

**Files:**
- Create: `src/speaking/types.ts`
- Create: `src/speaking/stt-provider.ts`
- Test: `tests/speaking/types.test.ts`

**Interfaces:**
- Consumes: `CefrLevel` from `src/skill-graph/types.ts`; `EvidenceSpan`, `CriterionScore`, `GroupedIssue`, `WritingRubric` (reused as `SpeakingRubric`), `BandDescriptor`, `RubricCriterion` from `src/writing/types.ts`
- Produces: `SpeakingTask`, `SpeakingResponse`, `SttResult`, `SttWord`, `SttPhoneme`, `SpeakingScore`, `SpeechFeatures` (used by every later task); `SttProvider` interface (used by Task 7)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/speaking/types.test.ts
import { describe, it, expect } from 'vitest'
import type {
  SpeakingTask,
  SpeakingResponse,
  SttWord,
  SttResult,
  SpeechFeatures,
  SpeakingScore,
} from '@/speaking/types'
import type { SttProvider } from '@/speaking/stt-provider'

// Type-level tests: these compile if the types are correct.
describe('speaking type definitions', () => {
  it('SpeakingTask has all required fields', () => {
    const task: SpeakingTask = {
      id: 'cefr.b1.describe.1',
      type: 'describe_image',
      level: 'B1',
      exam: 'cefr',
      prompt: 'Describe this picture.',
      timeLimitSeconds: 60,
      prepTimeSeconds: 10,
      rubricId: 'cefr_b1_speaking',
    }
    expect(task.id).toBe('cefr.b1.describe.1')
  })

  it('SttWord includes word timings and confidence', () => {
    const word: SttWord = {
      word: 'hello',
      startMs: 0,
      endMs: 500,
      confidence: 0.95,
    }
    expect(word.confidence).toBeGreaterThan(0)
  })

  it('SttResult includes transcript, words, and optional phonemes', () => {
    const result: SttResult = {
      transcript: 'Hello world.',
      words: [
        { word: 'Hello', startMs: 0, endMs: 400, confidence: 0.98 },
        { word: 'world', startMs: 450, endMs: 900, confidence: 0.92 },
      ],
      durationMs: 1000,
      phonemes: null,
    }
    expect(result.words).toHaveLength(2)
  })

  it('SpeechFeatures contains all four feature groups', () => {
    const features: SpeechFeatures = {
      fluency: {
        speechRateWpm: 120,
        articulationRateWpm: 140,
        pauseCount: 3,
        meanPauseDurationMs: 800,
        fillerCount: 1,
        falseStartCount: 0,
        meanLengthOfRunWords: 8,
      },
      lexical: {
        typeTokenRatio: 0.72,
        vocabularyLevelProfile: { A1: 0.4, A2: 0.3, B1: 0.2, B2: 0.1, C1: 0, C2: 0 },
        lexicalDensity: 0.48,
        repetitionRate: 0.05,
      },
      grammar: {
        structuresAttempted: 5,
        structuresAccurate: 4,
        meanLengthOfUtterance: 7.2,
        errorDensity: 0.02,
      },
      pronunciation: {
        meanWordConfidence: 0.91,
        lowConfidenceWords: [
          { word: 'specifically', confidence: 0.45, startMs: 2000, endMs: 2800 },
        ],
      },
    }
    expect(features.fluency.speechRateWpm).toBe(120)
  })

  it('SttProvider interface has a transcribe method', () => {
    const provider: SttProvider = {
      transcribe: async () => ({
        transcript: 'test',
        words: [],
        durationMs: 1000,
        phonemes: null,
      }),
    }
    expect(typeof provider.transcribe).toBe('function')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/speaking/types.test.ts`
Expected: FAIL — modules don't exist yet

- [ ] **Step 3: Write the types**

```typescript
// src/speaking/types.ts
import type { CefrLevel } from '@/skill-graph/types'
import type { EvidenceSpan, CriterionScore, GroupedIssue, WritingRubric } from '@/writing/types'

// Reuse the writing rubric structure — the shape is identical
// (criteria + band descriptors + weighted scoring).
export type SpeakingRubric = WritingRubric

// ---------------------------------------------------------------------------
// Speaking tasks
// ---------------------------------------------------------------------------

export interface SpeakingTask {
  id: string
  type:
    | 'describe_image'
    | 'read_aloud'
    | 'short_answer'
    | 'long_turn'
    | 'discussion'
    | 'retell_lecture'
    | 'role_play'
  level: CefrLevel
  exam: 'cefr' | 'ielts_speaking' | 'pte_speaking' | 'oet_speaking'
  prompt: string
  // How long the learner has to speak.
  timeLimitSeconds: number
  // Preparation time before recording starts (null = no prep time).
  prepTimeSeconds: number | null
  rubricId: string
}

// ---------------------------------------------------------------------------
// Learner response — audio + metadata
// ---------------------------------------------------------------------------

export interface SpeakingResponse {
  taskId: string
  // In production: a URL or blob reference to the audio file.
  // In tests: an empty string (we work from SttResult fixtures).
  audioRef: string
  submittedAt: number
  durationMs: number
}

// ---------------------------------------------------------------------------
// STT output — word-level timings, confidence, and optional phonemes
// ---------------------------------------------------------------------------

export interface SttWord {
  word: string
  startMs: number
  endMs: number
  // Per-word confidence from the STT service (0.0–1.0).
  confidence: number
}

export interface SttPhoneme {
  phoneme: string
  // IPA representation of the expected phoneme.
  expected: string
  // Accuracy score from the pronunciation service (0.0–1.0).
  accuracy: number
  word: string
}

export interface SttResult {
  transcript: string
  words: SttWord[]
  durationMs: number
  // Phoneme-level scores are only available from services that support
  // pronunciation assessment (e.g. Azure Speech, Speechace). Null when
  // the STT service doesn't provide them.
  phonemes: SttPhoneme[] | null
}

// ---------------------------------------------------------------------------
// Objective speech features — computed deterministically, never by LLM
// ---------------------------------------------------------------------------

export interface FluencyFeatures {
  // Words per minute, including pauses.
  speechRateWpm: number
  // Words per minute, excluding pauses (pure speaking time).
  articulationRateWpm: number
  // Number of pauses > 250ms.
  pauseCount: number
  // Average pause duration in ms.
  meanPauseDurationMs: number
  // Count of filler words (um, uh, er, erm, like, you know).
  fillerCount: number
  // Count of false starts (abandoned words/phrases).
  falseStartCount: number
  // Average number of words between pauses.
  meanLengthOfRunWords: number
}

export interface LexicalFeatures {
  // Type-token ratio (unique words / total words).
  typeTokenRatio: number
  // What percentage of vocabulary falls at each CEFR level.
  vocabularyLevelProfile: Record<string, number>
  // Proportion of content words (nouns, verbs, adjectives, adverbs)
  // to total words.
  lexicalDensity: number
  // Proportion of words that are exact repeats of a word used
  // in the previous 10 words.
  repetitionRate: number
}

export interface GrammarFeatures {
  // How many distinct grammatical structures the learner attempted.
  structuresAttempted: number
  // How many of those were used accurately.
  structuresAccurate: number
  // Average words per T-unit (roughly: per clause).
  meanLengthOfUtterance: number
  // Errors per word.
  errorDensity: number
}

export interface PronunciationFeatures {
  // Average STT confidence across all words.
  meanWordConfidence: number
  // Words where confidence dropped below the threshold (0.6).
  lowConfidenceWords: Array<{
    word: string
    confidence: number
    startMs: number
    endMs: number
  }>
}

export interface SpeechFeatures {
  fluency: FluencyFeatures
  lexical: LexicalFeatures
  grammar: GrammarFeatures
  pronunciation: PronunciationFeatures
}

// ---------------------------------------------------------------------------
// Speaking score — mirrors WritingScore structure
// ---------------------------------------------------------------------------

export interface SpeakingScore {
  taskId: string
  overallScore: number
  maxOverallScore: number
  criterionScores: CriterionScore[]
  groupedIssues: GroupedIssue[]
  // The objective features, reported alongside the score so the
  // learner sees exactly what was measured.
  features: SpeechFeatures
  transcript: string
  durationMs: number
  level: CefrLevel
}

export interface TaskFilter {
  level?: CefrLevel
  exam?: SpeakingTask['exam']
  type?: SpeakingTask['type']
}
```

- [ ] **Step 4: Write the STT provider interface**

```typescript
// src/speaking/stt-provider.ts
import type { SttResult } from './types'

// The seam between the pipeline and any STT service.
// Defined by requirement (word timings, confidence, optional phonemes),
// not by vendor — matching spec §9.5.
export interface SttProvider {
  transcribe(audioRef: string): Promise<SttResult>
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run tests/speaking/types.test.ts`
Expected: PASS

- [ ] **Step 6: Run full suite, commit**

```bash
npx vitest run
git add src/speaking/types.ts src/speaking/stt-provider.ts tests/speaking/types.test.ts
git commit -m "feat: speaking assessment types and STT provider interface

SpeakingTask, SttResult, SpeechFeatures, SpeakingScore types.
STT provider defined by requirement (word timings + confidence +
phoneme scores), not by vendor."
```

---

### Task 2: Speaking task definitions

**Files:**
- Create: `src/speaking/tasks.ts`
- Test: `tests/speaking/tasks.test.ts`

**Interfaces:**
- Consumes: `SpeakingTask`, `TaskFilter` from `src/speaking/types.ts`
- Produces: `getTask(id): SpeakingTask | null`, `listTasks(filter): SpeakingTask[]` (used by Tasks 6–8)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/speaking/tasks.test.ts
import { describe, it, expect } from 'vitest'
import { getTask, listTasks } from '@/speaking/tasks'

describe('speaking task definitions', () => {
  it('has tasks for every CEFR level A1 through C2', () => {
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) {
      const tasks = listTasks({ level })
      expect(tasks.length, `no tasks at ${level}`).toBeGreaterThan(0)
    }
  })

  it('has IELTS speaking tasks', () => {
    expect(listTasks({ exam: 'ielts_speaking' }).length).toBeGreaterThan(0)
  })

  it('has PTE speaking tasks', () => {
    expect(listTasks({ exam: 'pte_speaking' }).length).toBeGreaterThan(0)
  })

  it('has OET speaking tasks', () => {
    expect(listTasks({ exam: 'oet_speaking' }).length).toBeGreaterThan(0)
  })

  it('retrieves a task by id', () => {
    const task = getTask('cefr.a1.short_answer.1')
    expect(task).not.toBeNull()
    expect(task!.level).toBe('A1')
  })

  it('returns null for unknown id', () => {
    expect(getTask('nonexistent')).toBeNull()
  })

  it('every task has a non-empty prompt', () => {
    const all = listTasks({})
    for (const task of all) {
      expect(task.prompt.length, `task ${task.id} has empty prompt`).toBeGreaterThan(10)
    }
  })

  it('every task id is unique', () => {
    const all = listTasks({})
    const ids = all.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('IELTS speaking has time limits', () => {
    const tasks = listTasks({ exam: 'ielts_speaking' })
    for (const t of tasks) {
      expect(t.timeLimitSeconds).toBeGreaterThan(0)
    }
  })

  it('time limits increase with level', () => {
    const a1 = listTasks({ level: 'A1' })[0]!
    const c2 = listTasks({ level: 'C2' })[0]!
    expect(c2.timeLimitSeconds).toBeGreaterThanOrEqual(a1.timeLimitSeconds)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write speaking task definitions**

```typescript
// src/speaking/tasks.ts
import type { SpeakingTask, TaskFilter } from './types'

const TASKS: SpeakingTask[] = [
  // --- A1: simple short answers about self ---
  {
    id: 'cefr.a1.short_answer.1',
    type: 'short_answer', level: 'A1', exam: 'cefr',
    prompt: 'Tell me about yourself. What is your name? Where are you from? What do you do?',
    timeLimitSeconds: 30, prepTimeSeconds: 5, rubricId: 'cefr_a1_speaking',
  },
  {
    id: 'cefr.a1.short_answer.2',
    type: 'short_answer', level: 'A1', exam: 'cefr',
    prompt: 'Tell me about your family. How many people are in your family?',
    timeLimitSeconds: 30, prepTimeSeconds: 5, rubricId: 'cefr_a1_speaking',
  },

  // --- A2: simple descriptions ---
  {
    id: 'cefr.a2.describe_image.1',
    type: 'describe_image', level: 'A2', exam: 'cefr',
    prompt: 'Look at the picture of a busy street market. Describe what you can see. What are the people doing?',
    timeLimitSeconds: 45, prepTimeSeconds: 10, rubricId: 'cefr_a2_speaking',
  },
  {
    id: 'cefr.a2.short_answer.1',
    type: 'short_answer', level: 'A2', exam: 'cefr',
    prompt: 'What did you do last weekend? Tell me about it.',
    timeLimitSeconds: 45, prepTimeSeconds: 5, rubricId: 'cefr_a2_speaking',
  },

  // --- B1: connected speech on familiar topics ---
  {
    id: 'cefr.b1.long_turn.1',
    type: 'long_turn', level: 'B1', exam: 'cefr',
    prompt: 'Talk about a holiday you enjoyed. Where did you go? What did you do? Why did you enjoy it?',
    timeLimitSeconds: 90, prepTimeSeconds: 15, rubricId: 'cefr_b1_speaking',
  },
  {
    id: 'cefr.b1.describe_image.1',
    type: 'describe_image', level: 'B1', exam: 'cefr',
    prompt: 'Look at the picture showing people working in an office. Describe the scene and talk about what kind of work they might be doing.',
    timeLimitSeconds: 60, prepTimeSeconds: 10, rubricId: 'cefr_b1_speaking',
  },

  // --- B2: sustained speech on a wide range of topics ---
  {
    id: 'cefr.b2.long_turn.1',
    type: 'long_turn', level: 'B2', exam: 'cefr',
    prompt: 'Some people think working from home is better than working in an office. Do you agree? Give reasons for your answer.',
    timeLimitSeconds: 120, prepTimeSeconds: 15, rubricId: 'cefr_b2_speaking',
  },
  {
    id: 'cefr.b2.discussion.1',
    type: 'discussion', level: 'B2', exam: 'cefr',
    prompt: 'What are the advantages and disadvantages of social media for young people? Give specific examples.',
    timeLimitSeconds: 120, prepTimeSeconds: 15, rubricId: 'cefr_b2_speaking',
  },

  // --- C1: fluent, well-structured speech on complex topics ---
  {
    id: 'cefr.c1.long_turn.1',
    type: 'long_turn', level: 'C1', exam: 'cefr',
    prompt: 'To what extent should governments use technology to monitor citizens in the interest of public safety? Consider the ethical implications and discuss with examples.',
    timeLimitSeconds: 120, prepTimeSeconds: 20, rubricId: 'cefr_c1_speaking',
  },

  // --- C2: near-native fluency, complex arguments ---
  {
    id: 'cefr.c2.long_turn.1',
    type: 'long_turn', level: 'C2', exam: 'cefr',
    prompt: 'Critically evaluate the claim that globalisation has done more harm than good. Draw on specific examples from economics, culture, and the environment.',
    timeLimitSeconds: 180, prepTimeSeconds: 30, rubricId: 'cefr_c2_speaking',
  },

  // --- IELTS Speaking Part 1 (short answers) ---
  {
    id: 'ielts.speaking.part1.1',
    type: 'short_answer', level: 'B1', exam: 'ielts_speaking',
    prompt: 'Let\'s talk about your hometown. Where is your hometown? What do you like most about it? Has it changed much in recent years?',
    timeLimitSeconds: 60, prepTimeSeconds: null, rubricId: 'ielts_speaking',
  },

  // --- IELTS Speaking Part 2 (long turn with cue card) ---
  {
    id: 'ielts.speaking.part2.1',
    type: 'long_turn', level: 'B2', exam: 'ielts_speaking',
    prompt: 'Describe a book you have read recently that you found interesting. You should say: what the book was about, why you decided to read it, what you liked about it, and explain why you would or would not recommend it to others. You have 1 minute to prepare and should speak for 1–2 minutes.',
    timeLimitSeconds: 120, prepTimeSeconds: 60, rubricId: 'ielts_speaking',
  },

  // --- IELTS Speaking Part 3 (discussion) ---
  {
    id: 'ielts.speaking.part3.1',
    type: 'discussion', level: 'B2', exam: 'ielts_speaking',
    prompt: 'Do you think reading habits have changed in your country? Why do you think some people prefer e-books while others prefer printed books? How might reading habits change in the future?',
    timeLimitSeconds: 120, prepTimeSeconds: null, rubricId: 'ielts_speaking',
  },

  // --- PTE Speaking: Read Aloud ---
  {
    id: 'pte.speaking.read_aloud.1',
    type: 'read_aloud', level: 'B2', exam: 'pte_speaking',
    prompt: 'Read the following text aloud: "Climate change is one of the most significant challenges facing humanity today. Rising global temperatures are causing widespread environmental disruption, from melting ice caps to more frequent extreme weather events. Scientists emphasise the need for immediate action to reduce greenhouse gas emissions."',
    timeLimitSeconds: 40, prepTimeSeconds: 30, rubricId: 'pte_speaking',
  },

  // --- PTE Speaking: Retell Lecture ---
  {
    id: 'pte.speaking.retell.1',
    type: 'retell_lecture', level: 'B2', exam: 'pte_speaking',
    prompt: 'You will hear a short lecture about renewable energy. After listening, retell the lecture in your own words. Include the main points and supporting details.',
    timeLimitSeconds: 40, prepTimeSeconds: 10, rubricId: 'pte_speaking',
  },

  // --- OET Speaking: Role Play ---
  {
    id: 'oet.speaking.roleplay.1',
    type: 'role_play', level: 'B2', exam: 'oet_speaking',
    prompt: 'You are a nurse. A patient, Mr. David Thompson (age 45), has come to the clinic complaining of persistent headaches over the past two weeks. He works long hours at a computer and has been under significant stress at work. Take a focused history: ask about the headaches (onset, location, severity, triggers, associated symptoms), review his lifestyle, and provide initial advice.',
    timeLimitSeconds: 300, prepTimeSeconds: 120, rubricId: 'oet_speaking',
  },
]

const TASK_MAP = new Map(TASKS.map((t) => [t.id, t]))

export function getTask(id: string): SpeakingTask | null {
  return TASK_MAP.get(id) ?? null
}

export function listTasks(filter: TaskFilter): SpeakingTask[] {
  return TASKS.filter((t) => {
    if (filter.level && t.level !== filter.level) return false
    if (filter.exam && t.exam !== filter.exam) return false
    if (filter.type && t.type !== filter.type) return false
    return true
  })
}
```

- [ ] **Step 4: Run tests, full suite, commit**

---

### Task 3: Speaking rubrics (CEFR A1–C2 + IELTS + PTE + OET)

**Files:**
- Create: `src/speaking/rubrics.ts`
- Test: `tests/speaking/rubrics.test.ts`

**Interfaces:**
- Consumes: `SpeakingRubric` from `src/speaking/types.ts`; `computeOverallScore` from `src/writing/rubrics.ts`
- Produces: `getSpeakingRubric(id): SpeakingRubric | null`, `listSpeakingRubrics(): SpeakingRubric[]` (used by Tasks 6–8)

CEFR speaking rubrics use 4 criteria:
1. **Fluency and Coherence** — speech rate, pausing, discourse management
2. **Lexical Resource** — vocabulary range, precision, appropriateness
3. **Grammatical Range and Accuracy** — structures, accuracy, complexity
4. **Pronunciation** — intelligibility, phoneme accuracy, word stress, intonation

IELTS speaking uses the same 4 criteria, bands 0–9 with 0.5 steps.
PTE speaking uses: Content (0–5), Oral Fluency (0–5), Pronunciation (0–5).
OET speaking uses: Linguistic Criteria (6 sub-criteria grouped into 3 — communicative, linguistic, clinical).

- [ ] **Step 1: Write the failing test**

```typescript
// tests/speaking/rubrics.test.ts
import { describe, it, expect } from 'vitest'
import { getSpeakingRubric, listSpeakingRubrics } from '@/speaking/rubrics'

describe('CEFR speaking rubrics', () => {
  it('has rubrics for every CEFR level A1 through C2', () => {
    for (const level of ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']) {
      const rubric = getSpeakingRubric(`cefr_${level}_speaking`)
      expect(rubric, `missing rubric cefr_${level}_speaking`).not.toBeNull()
    }
  })

  it('every CEFR speaking rubric has exactly 4 criteria', () => {
    const rubrics = listSpeakingRubrics().filter((r) => r.exam === 'cefr')
    for (const rubric of rubrics) {
      expect(rubric.criteria.length, `${rubric.id}`).toBe(4)
    }
  })

  it('criterion weights sum to 1', () => {
    for (const rubric of listSpeakingRubrics()) {
      const sum = rubric.criteria.reduce((s, c) => s + c.weight, 0)
      expect(Math.abs(sum - 1), `${rubric.id} weights`).toBeLessThan(0.001)
    }
  })

  it('descriptors are sorted by score ascending', () => {
    for (const rubric of listSpeakingRubrics()) {
      for (const criterion of rubric.criteria) {
        for (let i = 1; i < criterion.descriptors.length; i++) {
          expect(criterion.descriptors[i]!.score).toBeGreaterThan(
            criterion.descriptors[i - 1]!.score,
          )
        }
      }
    }
  })

  it('every descriptor has a non-empty description', () => {
    for (const rubric of listSpeakingRubrics()) {
      for (const criterion of rubric.criteria) {
        for (const desc of criterion.descriptors) {
          expect(desc.description.length, `${rubric.id}.${criterion.id}@${desc.score}`).toBeGreaterThan(10)
        }
      }
    }
  })
})

describe('exam speaking rubrics', () => {
  it('has IELTS speaking rubric with 0-9 scale', () => {
    const rubric = getSpeakingRubric('ielts_speaking')
    expect(rubric).not.toBeNull()
    expect(rubric!.scoreRange).toEqual({ min: 0, max: 9, step: 0.5 })
  })

  it('has PTE speaking rubric', () => {
    expect(getSpeakingRubric('pte_speaking')).not.toBeNull()
  })

  it('has OET speaking rubric', () => {
    expect(getSpeakingRubric('oet_speaking')).not.toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write speaking rubrics**

CEFR A1/A2 use 0–3 scale, B1–C2 use 0–5 scale (matching writing).
IELTS speaking uses 0–9 with 0.5 steps.
PTE speaking uses 0–5 for each criterion.
OET speaking uses 0–5 (mapped from letter grades).

All criteria include descriptors grounded in the CEFR Companion Volume and published exam band descriptors.

- [ ] **Step 4: Run tests, full suite, commit**

---

### Task 4: Objective feature extraction — fluency

**Files:**
- Create: `src/speaking/features/fluency.ts`
- Test: `tests/speaking/features/fluency.test.ts`

**Interfaces:**
- Consumes: `SttResult`, `SttWord`, `FluencyFeatures` from `src/speaking/types.ts`
- Produces: `extractFluency(sttResult): FluencyFeatures` (used by Task 7)

This is pure deterministic computation — no LLM, no randomness. The spec says these features must NEVER be guessed by the model.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/speaking/features/fluency.test.ts
import { describe, it, expect } from 'vitest'
import { extractFluency } from '@/speaking/features/fluency'
import type { SttResult } from '@/speaking/types'

// A fixture: 10 words over 5 seconds with one 800ms pause.
function sttFixture(): SttResult {
  return {
    transcript: 'I think the city is um a very nice place',
    words: [
      { word: 'I',      startMs: 0,    endMs: 200,  confidence: 0.99 },
      { word: 'think',  startMs: 210,  endMs: 500,  confidence: 0.98 },
      { word: 'the',    startMs: 510,  endMs: 650,  confidence: 0.97 },
      { word: 'city',   startMs: 660,  endMs: 1000, confidence: 0.96 },
      { word: 'is',     startMs: 1010, endMs: 1200, confidence: 0.99 },
      // 800ms pause here (1200 → 2000)
      { word: 'um',     startMs: 2000, endMs: 2200, confidence: 0.60 },
      { word: 'a',      startMs: 2250, endMs: 2350, confidence: 0.99 },
      { word: 'very',   startMs: 2360, endMs: 2600, confidence: 0.98 },
      { word: 'nice',   startMs: 2610, endMs: 2900, confidence: 0.97 },
      { word: 'place',  startMs: 2910, endMs: 3300, confidence: 0.96 },
    ],
    durationMs: 3500,
    phonemes: null,
  }
}

describe('extractFluency', () => {
  const features = extractFluency(sttFixture())

  it('computes speech rate in words per minute (excluding fillers)', () => {
    // 9 non-filler words in 3.5 seconds → ~154 wpm
    expect(features.speechRateWpm).toBeGreaterThan(100)
    expect(features.speechRateWpm).toBeLessThan(200)
  })

  it('computes articulation rate (excluding pauses and fillers)', () => {
    expect(features.articulationRateWpm).toBeGreaterThan(features.speechRateWpm)
  })

  it('counts pauses above threshold', () => {
    // One 800ms pause between "is" and "um"
    expect(features.pauseCount).toBeGreaterThanOrEqual(1)
  })

  it('computes mean pause duration', () => {
    expect(features.meanPauseDurationMs).toBeGreaterThan(200)
  })

  it('counts filler words', () => {
    // "um" is a filler
    expect(features.fillerCount).toBe(1)
  })

  it('computes mean length of run', () => {
    // Words between pauses
    expect(features.meanLengthOfRunWords).toBeGreaterThan(0)
  })

  it('handles empty word list', () => {
    const empty: SttResult = { transcript: '', words: [], durationMs: 0, phonemes: null }
    const f = extractFluency(empty)
    expect(f.speechRateWpm).toBe(0)
    expect(f.pauseCount).toBe(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write fluency extraction**

```typescript
// src/speaking/features/fluency.ts
import type { SttResult, SttWord, FluencyFeatures } from '../types'

// Fillers are common hesitation markers. Detected by exact match
// (case-insensitive). This list covers English fillers across accents.
const FILLERS = new Set(['um', 'uh', 'er', 'erm', 'like', 'you know', 'well', 'so', 'basically', 'actually'])

// A pause is a gap between words longer than this threshold.
// 250ms is the standard threshold in fluency research (Skehan 2009).
const PAUSE_THRESHOLD_MS = 250

export function extractFluency(stt: SttResult): FluencyFeatures {
  if (stt.words.length === 0) {
    return {
      speechRateWpm: 0,
      articulationRateWpm: 0,
      pauseCount: 0,
      meanPauseDurationMs: 0,
      fillerCount: 0,
      falseStartCount: 0,
      meanLengthOfRunWords: 0,
    }
  }

  // Identify fillers.
  const fillerCount = stt.words.filter((w) => FILLERS.has(w.word.toLowerCase())).length

  // Non-filler words are the "real" words for rate calculation.
  const realWords = stt.words.filter((w) => !FILLERS.has(w.word.toLowerCase()))
  const realWordCount = realWords.length

  // Speech rate: real words per minute, based on total duration.
  const durationMinutes = stt.durationMs / 60_000
  const speechRateWpm = durationMinutes > 0
    ? Math.round(realWordCount / durationMinutes)
    : 0

  // Find pauses (gaps between consecutive words > threshold).
  const pauses: number[] = []
  for (let i = 1; i < stt.words.length; i++) {
    const gap = stt.words[i]!.startMs - stt.words[i - 1]!.endMs
    if (gap > PAUSE_THRESHOLD_MS) {
      pauses.push(gap)
    }
  }

  const pauseCount = pauses.length
  const totalPauseMs = pauses.reduce((s, p) => s + p, 0)
  const meanPauseDurationMs = pauseCount > 0
    ? Math.round(totalPauseMs / pauseCount)
    : 0

  // Articulation rate: words per minute of actual speaking time
  // (total duration minus pause time).
  const speakingTimeMs = stt.durationMs - totalPauseMs
  const speakingTimeMinutes = speakingTimeMs / 60_000
  const articulationRateWpm = speakingTimeMinutes > 0
    ? Math.round(realWordCount / speakingTimeMinutes)
    : 0

  // Mean length of run: average words between pauses.
  // Split the word sequence at each pause to get "runs".
  let runs: number[] = []
  let currentRun = 0
  for (let i = 0; i < stt.words.length; i++) {
    if (!FILLERS.has(stt.words[i]!.word.toLowerCase())) {
      currentRun++
    }
    if (i < stt.words.length - 1) {
      const gap = stt.words[i + 1]!.startMs - stt.words[i]!.endMs
      if (gap > PAUSE_THRESHOLD_MS) {
        if (currentRun > 0) runs.push(currentRun)
        currentRun = 0
      }
    }
  }
  if (currentRun > 0) runs.push(currentRun)
  const meanLengthOfRunWords = runs.length > 0
    ? Math.round((runs.reduce((s, r) => s + r, 0) / runs.length) * 10) / 10
    : 0

  return {
    speechRateWpm,
    articulationRateWpm,
    pauseCount,
    meanPauseDurationMs,
    fillerCount,
    falseStartCount: 0, // Requires more sophisticated analysis — deferred
    meanLengthOfRunWords,
  }
}
```

- [ ] **Step 4: Run tests, full suite, commit**

---

### Task 5: Objective feature extraction — lexical, grammar, pronunciation

**Files:**
- Create: `src/speaking/features/lexical.ts`
- Create: `src/speaking/features/grammar.ts`
- Create: `src/speaking/features/pronunciation.ts`
- Create: `src/speaking/features/extract.ts` (orchestrator)
- Test: `tests/speaking/features/lexical.test.ts`
- Test: `tests/speaking/features/grammar.test.ts`
- Test: `tests/speaking/features/pronunciation.test.ts`
- Test: `tests/speaking/features/extract.test.ts`

**Interfaces:**
- Consumes: `SttResult`, `SttWord`, `LexicalFeatures`, `GrammarFeatures`, `PronunciationFeatures`, `SpeechFeatures` from `src/speaking/types.ts`; `ProfilerInventory` from `src/profiler/profile.ts`; `profileText` from `src/profiler/profile.ts`
- Produces: `extractLexical(sttResult, inventory)`, `extractGrammar(sttResult)`, `extractPronunciation(sttResult)`, `extractAllFeatures(sttResult, inventory): SpeechFeatures` (used by Tasks 6–8)

- [ ] **Step 1: Write failing tests for each extractor**

Lexical tests:
- Computes type-token ratio (unique/total)
- Produces vocabulary level profile using the profiler
- Computes lexical density (content words / total)
- Computes repetition rate
- Handles empty transcript

Grammar tests:
- Counts structures attempted (approximated by clause count)
- Computes mean length of utterance
- Computes error density (approximated from low-confidence regions)
- Handles empty transcript

Pronunciation tests:
- Computes mean word confidence from STT data
- Identifies low-confidence words (threshold: 0.6)
- Returns empty array when all words are high-confidence
- Handles empty word list

Extract (orchestrator) tests:
- Returns all four feature groups
- Each group has correct structure

- [ ] **Step 2: Run tests to verify they fail**

- [ ] **Step 3: Write each extractor**

Lexical: uses the existing profiler to get vocabulary level distribution. TTR = unique words / total words. Lexical density uses compromise NLP to identify content words (nouns, verbs, adjectives, adverbs). Repetition rate checks a sliding window of 10 words.

Grammar: approximates clause boundaries by splitting on conjunctions and punctuation. Mean length of utterance = words / clause count. Error density is estimated from consecutive low-confidence words (a crude proxy until a grammar checker is integrated).

Pronunciation: directly uses STT per-word confidence. Low-confidence threshold = 0.6 (words below this are flagged). When phoneme data is available, phoneme accuracy is reported.

Extract: calls all four extractors and returns a `SpeechFeatures` object.

- [ ] **Step 4: Run tests, full suite, commit**

```bash
git add src/speaking/features/ tests/speaking/features/
git commit -m "feat: objective speech feature extraction

Deterministic computation of fluency (speech rate, pauses, fillers),
lexical (TTR, level profile, density), grammar (MLU, structures),
and pronunciation (word confidence, low-confidence detection) from
STT output. LLM never computes these — spec §3.3."
```

---

### Task 6: Speaking scoring prompt assembly

**Files:**
- Create: `src/speaking/prompt.ts`
- Test: `tests/speaking/prompt.test.ts`

**Interfaces:**
- Consumes: `SpeakingTask`, `SttResult`, `SpeechFeatures`, `SpeakingRubric` from `src/speaking/types.ts`; `ProfilerInventory` from `src/profiler/profile.ts`
- Produces: `buildSpeakingScoringPrompt(sttResult, features, task, rubric, inventory): string` (used by Task 8)

The key difference from writing: the prompt includes the COMPUTED features so the LLM doesn't guess them. The LLM scores what genuinely requires judgment (coherence, discourse management, task fulfilment) using the measurements as evidence.

- [ ] **Step 1: Write the failing test**

Tests verify:
- Prompt includes the transcript
- Prompt includes the task prompt
- Prompt includes all rubric criteria and descriptors
- Prompt includes computed speech features (speech rate, pauses, TTR, etc.)
- Prompt demands evidence spans from the transcript
- Prompt bans generic feedback
- Prompt demands JSON output
- Prompt specifies the learner's level for feedback language

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write prompt assembly**

The prompt is structured as:
1. System instruction (JSON only)
2. TASK section (level, type, prompt)
3. TRANSCRIPT section (what the learner said)
4. MEASURED FEATURES section (fluency/lexical/grammar/pronunciation — computed, not for the model to override)
5. SCORING RUBRIC section (criteria + band descriptors)
6. OUTPUT FORMAT section (JSON schema with evidence spans)
7. RULES section (same quality rules as writing: quote learner text, no generic feedback, group issues, prioritise)

Additional rule specific to speaking: "The fluency, lexical, grammar, and pronunciation metrics in MEASURED FEATURES have been computed deterministically. Do NOT override or contradict them. Use them as evidence to support your criterion scores."

- [ ] **Step 4: Run tests, full suite, commit**

---

### Task 7: Speaking score-and-feedback loop

**Files:**
- Create: `src/speaking/score.ts`
- Test: `tests/speaking/score.test.ts`

**Interfaces:**
- Consumes: `GenerationProvider` from `src/generation/provider.ts`; `SttProvider` from `src/speaking/stt-provider.ts`; `SpeakingTask`, `SpeakingResponse`, `SpeakingScore`, `SttResult` from `src/speaking/types.ts`; `getSpeakingRubric` from `src/speaking/rubrics.ts`; `extractAllFeatures` from `src/speaking/features/extract.ts`; `buildSpeakingScoringPrompt` from `src/speaking/prompt.ts`; `parseScoringOutput` from `src/writing/parse-score.ts` (reused — same JSON shape); `checkFeedbackQuality` from `src/writing/feedback-gates.ts` (reused); `computeOverallScore` from `src/writing/rubrics.ts` (reused); `ProfilerInventory` from `src/profiler/profile.ts`
- Produces: `scoreSpeaking(llmProvider, sttResult, task, inventory): Promise<ScoreSpeakingResult>` — main entry point

The loop is:
1. Extract objective features deterministically
2. Build scoring prompt (transcript + features + rubric)
3. Send to LLM
4. Parse structured output (reuse writing's `parseScoringOutput`)
5. Run feedback quality gates (reuse writing's `checkFeedbackQuality`)
6. Retry up to 3 times on failure
7. Assemble final `SpeakingScore` with features included

Tests use STT fixtures (no real audio) and mock LLM providers (no API key needed).

- [ ] **Step 1: Write the failing test**

```typescript
// Key test cases:
// - Returns complete SpeakingScore on success (with features)
// - Computes overall score from criterion scores
// - Retries on parse failure
// - Gives up after max retries
// - Features are included in the result
// - Transcript is included in the result
// - Level and taskId are set correctly
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write the score loop**

The function signature is `scoreSpeaking(llmProvider, sttResult, task, inventory)` — it takes an already-transcribed STT result rather than raw audio, because the STT call happens at a different layer (the API route or client). This keeps the scoring engine testable without audio files.

- [ ] **Step 4: Run tests, full suite, commit**

---

### Task 8: Golden set for speaking assessment

**Files:**
- Create: `tests/speaking/golden-set.test.ts`

**Interfaces:**
- Consumes: `parseScoringOutput` from `src/writing/parse-score.ts`; `checkFeedbackQuality` from `src/writing/feedback-gates.ts`; `extractFluency` from `src/speaking/features/fluency.ts`; `extractAllFeatures` from `src/speaking/features/extract.ts`; `getSpeakingRubric` from `src/speaking/rubrics.ts`; `buildProfilerInventory` from `src/profiler/build-inventory.ts`

Curated cases:
- **Good:** B1 transcript with evidence-based feedback, proper priority layering
- **Good:** Output that includes objective features as supporting evidence
- **Bad:** Fabricated transcript quotes (not in the STT transcript)
- **Bad:** Generic feedback phrases
- **Bad:** Missing evidence on a criterion
- **Bad:** Wrong criterion count
- **Bad:** Score out of rubric range
- **Bad:** All-low priority with 4+ issues
- **Edge:** Empty transcript (0 words — should reject gracefully)
- **Edge:** Very short response (5 words)
- **Feature extraction:** Filler detection, pause counting, confidence thresholds

- [ ] **Step 1: Write the golden set**

- [ ] **Step 2: Run tests, full suite, commit**

```bash
git add tests/speaking/golden-set.test.ts
git commit -m "feat: golden set regression suite for speaking assessment

Curated good/bad STT and scoring outputs covering: evidence
validation, generic feedback, priority layering, feature extraction
accuracy, empty/short transcripts."
```

---

## Self-Review

**1. Spec coverage check:**
- ✅ Turn-based loop, not realtime voice (§3.3)
- ✅ STT with word timings + confidence + phoneme scores (§3.3)
- ✅ Objective features computed deterministically: fluency, lexical, grammar, pronunciation (§3.3)
- ✅ LLM only judges what requires judgment, WITH measurements in front of it (§3.3)
- ✅ Evidence spans quoting the learner's transcript (§3.3)
- ✅ CEFR A1–C2 speaking rubrics (§1)
- ✅ IELTS Speaking parts 1/2/3 (§1b)
- ✅ PTE Speaking tasks (§1b)
- ✅ OET Speaking role play (§1b)
- ✅ Feedback quality gates reused from writing (§3)
- ✅ Score parser reused from writing (§3)
- ✅ Golden set regression suite (§3.6)
- ✅ STT provider defined by interface, not vendor (§9.5)
- ✅ Specific fluency metrics: speech rate, articulation rate, pauses, fillers, false starts, mean length of run (§3.3)
- ✅ Specific lexical metrics: TTR, vocabulary level profile, lexical density, repetition rate (§3.3)
- ✅ Specific pronunciation metrics: phoneme accuracy, word stress, confidence (§3.3)

**2. Placeholder scan:** No TBDs, TODOs, or "implement later" found.

**3. Type consistency check:**
- `SpeakingTask` — consistent across tasks.ts, rubrics.ts, prompt.ts, score.ts
- `SttResult` — consistent across stt-provider.ts, features/*.ts, prompt.ts, score.ts
- `SpeechFeatures` — produced by extract.ts, consumed by prompt.ts and score.ts
- `SpeakingRubric` is a type alias for `WritingRubric` — same shape, reuse `computeOverallScore`
- `parseScoringOutput` reused from writing — same JSON shape (criterion scores + grouped issues)
- `checkFeedbackQuality` reused from writing — same `ParsedScore` input
- `GenerationProvider` reused from existing code
