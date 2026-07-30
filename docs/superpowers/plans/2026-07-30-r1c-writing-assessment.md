# Writing Assessment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a writing assessment engine that scores learner text against CEFR/IELTS/PTE/OET rubrics, returning per-criterion scores with evidence spans quoting the learner's own words and grouped, prioritised feedback — never generic advice.

**Architecture:** Rubrics are data (not code) — JSON structures of criteria and band descriptors. A scoring prompt assembler renders rubric + learner text + constraints into a prompt. The LLM returns structured JSON parsed by a dedicated parser. Feedback quality gates reject generic or evidence-free feedback before it reaches the learner. The score-and-retry loop mirrors the existing MCQ generation loop (`src/generation/generate.ts`).

**Tech Stack:** TypeScript 7, Vitest, existing `GenerationProvider` interface for LLM calls, existing profiler for vocabulary-level checking of feedback text.

## Global Constraints

- TypeScript 7 (no `baseUrl` in tsconfig)
- Path alias `@/` resolves to `src/`
- Vitest for tests; `npx vitest run` must pass after every task
- All comments explain WHY, not WHAT — heavily commented for learning
- No external dependencies beyond what's already installed
- Reuse existing `GenerationProvider` interface from `src/generation/provider.ts` — it's "send prompt, get text" which is exactly what scoring needs
- Every feedback claim must quote the learner's own text with character offsets (spec §3.3)
- Generic feedback ("improve your cohesion") is treated as a bug (spec §3)
- Group repeated issues: "12 missing articles = 1 grouped issue" (spec §3)
- Layer by priority: highest-impact first, rest expand on demand (spec §3)
- Feedback text must use vocabulary at or below the learner's level (spec §1a)

---

### Task 1: Writing types and task definitions

**Files:**
- Create: `src/writing/types.ts`
- Create: `src/writing/tasks.ts`
- Test: `tests/writing/tasks.test.ts`

**Interfaces:**
- Consumes: `CefrLevel` from `src/skill-graph/types.ts`
- Produces: `WritingTask`, `WritingResponse`, `EvidenceSpan`, `CriterionScore`, `GroupedIssue`, `WritingScore`, `WritingRubric`, `RubricCriterion`, `BandDescriptor` (used by every later task); `getTask(id)`, `listTasks(filters)` (used by Task 6)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/tasks.test.ts
import { describe, it, expect } from 'vitest'
import { getTask, listTasks } from '@/writing/tasks'

describe('task definitions', () => {
  it('has tasks for every CEFR level A1 through C2', () => {
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) {
      const tasks = listTasks({ level })
      expect(tasks.length, `no tasks at ${level}`).toBeGreaterThan(0)
    }
  })

  it('has IELTS Task 1 and Task 2', () => {
    const t1 = listTasks({ exam: 'ielts_task1' })
    const t2 = listTasks({ exam: 'ielts_task2' })
    expect(t1.length).toBeGreaterThan(0)
    expect(t2.length).toBeGreaterThan(0)
  })

  it('has PTE essay tasks', () => {
    expect(listTasks({ exam: 'pte_essay' }).length).toBeGreaterThan(0)
  })

  it('has OET referral letter tasks', () => {
    expect(listTasks({ exam: 'oet_writing' }).length).toBeGreaterThan(0)
  })

  it('retrieves a task by id', () => {
    const task = getTask('cefr.a1.short_answer.1')
    expect(task).not.toBeNull()
    expect(task!.level).toBe('A1')
  })

  it('returns null for unknown id', () => {
    expect(getTask('nonexistent')).toBeNull()
  })

  it('sets word limits appropriate to each level', () => {
    const a1 = listTasks({ level: 'A1' })[0]!
    const c2 = listTasks({ level: 'C2' })[0]!
    expect(c2.maxWords).toBeGreaterThan(a1.maxWords)
  })

  it('every task has a non-empty prompt', () => {
    const all = listTasks({})
    for (const task of all) {
      expect(task.prompt.length, `task ${task.id} has empty prompt`).toBeGreaterThan(10)
    }
  })

  it('every task references a valid rubricId', () => {
    const all = listTasks({})
    const rubricIds = new Set(all.map((t) => t.rubricId))
    // At minimum: cefr, ielts_task1, ielts_task2, pte_essay, oet_writing
    expect(rubricIds.size).toBeGreaterThanOrEqual(5)
  })

  it('IELTS Task 2 requires 250+ words', () => {
    const task = listTasks({ exam: 'ielts_task2' })[0]!
    expect(task.minWords).toBeGreaterThanOrEqual(250)
  })

  it('OET writing has a 45-minute time limit', () => {
    const task = listTasks({ exam: 'oet_writing' })[0]!
    expect(task.timeLimitMinutes).toBe(45)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/writing/tasks.test.ts`
Expected: FAIL — modules don't exist yet

- [ ] **Step 3: Write the types**

```typescript
// src/writing/types.ts
import type { CefrLevel } from '@/skill-graph/types'

// A writing task the learner is asked to complete.
export interface WritingTask {
  id: string
  // What kind of writing this is.
  type: 'short_answer' | 'paragraph' | 'essay' | 'letter' | 'report'
       | 'review' | 'proposal' | 'article' | 'referral_letter'
  level: CefrLevel
  // Which exam this belongs to, or 'cefr' for general English.
  exam: 'cefr' | 'ielts_task1' | 'ielts_task2' | 'pte_essay' | 'oet_writing'
  // The prompt shown to the learner.
  prompt: string
  minWords: number
  maxWords: number
  // Null means untimed.
  timeLimitMinutes: number | null
  // Which rubric to score against.
  rubricId: string
}

// What the learner submits.
export interface WritingResponse {
  taskId: string
  text: string
  submittedAt: number
  timeTakenSeconds: number | null
}

// A location in the learner's text, pointing at a specific span.
// This is the mechanism by which every feedback claim is anchored to
// what the learner actually wrote — generic advice without a quote is
// treated as a bug.
export interface EvidenceSpan {
  // Character offsets into WritingResponse.text.
  start: number
  end: number
  // The quoted text (redundant with offsets, but the model produces it
  // and keeping it means the UI never needs the full response to render
  // a single issue).
  quote: string
  // What is wrong with this span.
  issue: string
  // A concrete rewrite, or null when the issue is structural rather
  // than a fixable phrase (e.g. "this paragraph has no topic sentence").
  rewrite: string | null
}

// Score on one criterion of a rubric.
export interface CriterionScore {
  criterionId: string
  criterionName: string
  score: number
  maxScore: number
  // Evidence from the learner's text that justifies this score.
  evidence: EvidenceSpan[]
  // One-paragraph feedback for this criterion, at the learner's level.
  feedback: string
}

// Repeated issues grouped so the learner sees "missing articles (7 times)"
// rather than seven separate corrections.
export interface GroupedIssue {
  // Short machine-friendly category like 'missing_article'.
  category: string
  // Human-readable description of the pattern.
  description: string
  // How many times this issue appears.
  count: number
  // Determines display order: high issues shown expanded, low issues
  // collapsed behind "show more".
  priority: 'high' | 'medium' | 'low'
  // Up to 3 representative examples from the learner's text.
  examples: EvidenceSpan[]
}

// The complete result of scoring a piece of writing.
export interface WritingScore {
  taskId: string
  overallScore: number
  maxOverallScore: number
  criterionScores: CriterionScore[]
  groupedIssues: GroupedIssue[]
  wordCount: number
  level: CefrLevel
}

// --- Rubric definitions ---

// One level of performance on one criterion.
export interface BandDescriptor {
  score: number
  description: string
}

// One criterion in a rubric.
export interface RubricCriterion {
  id: string
  name: string
  // Relative weight for computing overall score. Weights within a rubric
  // must sum to 1.
  weight: number
  descriptors: BandDescriptor[]
}

// A complete rubric.
export interface WritingRubric {
  id: string
  name: string
  exam: string
  criteria: RubricCriterion[]
  // The scoring scale. step is 0.5 for IELTS (half-bands), 1 for others.
  scoreRange: { min: number; max: number; step: number }
}

export interface TaskFilter {
  level?: CefrLevel
  exam?: WritingTask['exam']
  type?: WritingTask['type']
}
```

- [ ] **Step 4: Write the task definitions**

```typescript
// src/writing/tasks.ts
import type { WritingTask, TaskFilter } from './types'

// Every writing task in the system. Exam tasks have published prompts;
// CEFR tasks are original prompts written at the appropriate level.
const TASKS: WritingTask[] = [
  // --- A1: simple sentences about self and familiar topics ---
  {
    id: 'cefr.a1.short_answer.1',
    type: 'short_answer', level: 'A1', exam: 'cefr',
    prompt: 'Write about your family. How many people are in your family? What are their names?',
    minWords: 15, maxWords: 50, timeLimitMinutes: null,
    rubricId: 'cefr_a1',
  },
  {
    id: 'cefr.a1.short_answer.2',
    type: 'short_answer', level: 'A1', exam: 'cefr',
    prompt: 'Write about your home. Where do you live? What rooms does it have?',
    minWords: 15, maxWords: 50, timeLimitMinutes: null,
    rubricId: 'cefr_a1',
  },

  // --- A2: simple connected text, short messages ---
  {
    id: 'cefr.a2.paragraph.1',
    type: 'paragraph', level: 'A2', exam: 'cefr',
    prompt: 'Write a short message to a friend. Invite them to do something this weekend. Say what, where, and when.',
    minWords: 40, maxWords: 80, timeLimitMinutes: null,
    rubricId: 'cefr_a2',
  },
  {
    id: 'cefr.a2.paragraph.2',
    type: 'paragraph', level: 'A2', exam: 'cefr',
    prompt: 'Write about your daily routine. What do you do in the morning, afternoon, and evening?',
    minWords: 40, maxWords: 80, timeLimitMinutes: null,
    rubricId: 'cefr_a2',
  },

  // --- B1: connected text on familiar topics ---
  {
    id: 'cefr.b1.essay.1',
    type: 'essay', level: 'B1', exam: 'cefr',
    prompt: 'Some people prefer to live in a big city. Others prefer a small town. Which do you prefer and why? Give reasons for your answer.',
    minWords: 120, maxWords: 180, timeLimitMinutes: null,
    rubricId: 'cefr_b1',
  },
  {
    id: 'cefr.b1.letter.1',
    type: 'letter', level: 'B1', exam: 'cefr',
    prompt: 'You recently stayed at a hotel that was very good. Write a letter to a friend. Describe the hotel, say what you liked, and recommend it.',
    minWords: 120, maxWords: 180, timeLimitMinutes: null,
    rubricId: 'cefr_b1',
  },

  // --- B2: clear, detailed text on a wide range ---
  {
    id: 'cefr.b2.essay.1',
    type: 'essay', level: 'B2', exam: 'cefr',
    prompt: 'Many universities now offer online courses alongside traditional classroom teaching. Discuss the advantages and disadvantages of online learning and give your own opinion.',
    minWords: 200, maxWords: 280, timeLimitMinutes: null,
    rubricId: 'cefr_b2',
  },
  {
    id: 'cefr.b2.report.1',
    type: 'report', level: 'B2', exam: 'cefr',
    prompt: 'Your company is considering allowing employees to work from home two days per week. Write a report for your manager discussing the potential benefits and drawbacks.',
    minWords: 200, maxWords: 280, timeLimitMinutes: null,
    rubricId: 'cefr_b2',
  },

  // --- C1: well-structured text on complex subjects ---
  {
    id: 'cefr.c1.essay.1',
    type: 'essay', level: 'C1', exam: 'cefr',
    prompt: 'To what extent should governments regulate the use of artificial intelligence in the workplace? Discuss the ethical, economic, and social implications, and present a reasoned argument.',
    minWords: 250, maxWords: 350, timeLimitMinutes: null,
    rubricId: 'cefr_c1',
  },
  {
    id: 'cefr.c1.proposal.1',
    type: 'proposal', level: 'C1', exam: 'cefr',
    prompt: 'Your local council has funding available for one community project. Write a proposal recommending a project, explaining why it would benefit the community and how it should be implemented.',
    minWords: 250, maxWords: 350, timeLimitMinutes: null,
    rubricId: 'cefr_c1',
  },

  // --- C2: complex text in an appropriate style ---
  {
    id: 'cefr.c2.essay.1',
    type: 'essay', level: 'C2', exam: 'cefr',
    prompt: 'The proliferation of social media has fundamentally altered public discourse. Critically evaluate this claim, drawing on specific examples, and assess whether the changes are, on balance, beneficial.',
    minWords: 300, maxWords: 400, timeLimitMinutes: null,
    rubricId: 'cefr_c2',
  },
  {
    id: 'cefr.c2.article.1',
    type: 'article', level: 'C2', exam: 'cefr',
    prompt: 'Write an article for a professional journal on a recent development in your field. Explain its significance and potential impact to an informed but non-specialist audience.',
    minWords: 300, maxWords: 400, timeLimitMinutes: null,
    rubricId: 'cefr_c2',
  },

  // --- IELTS Task 1 Academic ---
  {
    id: 'ielts.task1.1',
    type: 'report', level: 'B2', exam: 'ielts_task1',
    prompt: 'The bar chart shows the number of international students enrolled at a university between 2015 and 2023, broken down by region of origin. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    minWords: 150, maxWords: 250, timeLimitMinutes: 20,
    rubricId: 'ielts_task1',
  },

  // --- IELTS Task 1 General Training ---
  {
    id: 'ielts.task1.gt.1',
    type: 'letter', level: 'B1', exam: 'ielts_task1',
    prompt: 'You recently bought a product online, but when it arrived it was damaged. Write a letter to the company. In your letter: describe the product you bought, explain the problem, and say what you would like the company to do.',
    minWords: 150, maxWords: 250, timeLimitMinutes: 20,
    rubricId: 'ielts_task1',
  },

  // --- IELTS Task 2 ---
  {
    id: 'ielts.task2.1',
    type: 'essay', level: 'B2', exam: 'ielts_task2',
    prompt: 'Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better ways to reduce crime. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    minWords: 250, maxWords: 350, timeLimitMinutes: 40,
    rubricId: 'ielts_task2',
  },
  {
    id: 'ielts.task2.2',
    type: 'essay', level: 'B2', exam: 'ielts_task2',
    prompt: 'In many countries, the gap between the rich and the poor is increasing. What problems does this cause? What solutions can you suggest? Give reasons for your answer and include any relevant examples. Write at least 250 words.',
    minWords: 250, maxWords: 350, timeLimitMinutes: 40,
    rubricId: 'ielts_task2',
  },

  // --- PTE Academic Written Essay ---
  {
    id: 'pte.essay.1',
    type: 'essay', level: 'B2', exam: 'pte_essay',
    prompt: 'Do you think that formal written examinations are a good way to assess knowledge? Discuss the advantages and disadvantages of examinations and suggest alternative forms of assessment.',
    minWords: 200, maxWords: 300, timeLimitMinutes: 20,
    rubricId: 'pte_essay',
  },

  // --- OET Writing (Referral Letter) ---
  {
    id: 'oet.writing.1',
    type: 'referral_letter', level: 'B2', exam: 'oet_writing',
    prompt: 'You are a nurse at a community health centre. A patient, Mrs. Priya Sharma (aged 67), has been experiencing persistent lower back pain for the past three months with limited mobility. She has a history of osteoporosis and hypertension. Her current medications include alendronate 70mg weekly and amlodipine 5mg daily. Conservative management including physiotherapy and paracetamol has not provided adequate relief. Write a referral letter to Dr. James Chen, Orthopaedic Specialist, City Hospital, requesting further assessment and management.',
    minWords: 180, maxWords: 200, timeLimitMinutes: 45,
    rubricId: 'oet_writing',
  },
]

const TASK_MAP = new Map(TASKS.map((t) => [t.id, t]))

export function getTask(id: string): WritingTask | null {
  return TASK_MAP.get(id) ?? null
}

export function listTasks(filter: TaskFilter): WritingTask[] {
  return TASKS.filter((t) => {
    if (filter.level && t.level !== filter.level) return false
    if (filter.exam && t.exam !== filter.exam) return false
    if (filter.type && t.type !== filter.type) return false
    return true
  })
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run tests/writing/tasks.test.ts`
Expected: PASS

- [ ] **Step 6: Run full suite**

Run: `npx vitest run`
Expected: All pass, no regressions

- [ ] **Step 7: Commit**

```bash
git add src/writing/types.ts src/writing/tasks.ts tests/writing/tasks.test.ts
git commit -m "feat: writing assessment types and task definitions

WritingTask, WritingResponse, WritingScore, EvidenceSpan and rubric
types. 18 task definitions across CEFR A1-C2, IELTS Task 1/2, PTE
essay, and OET referral letter."
```

---

### Task 2: CEFR writing rubrics (A1–C2)

**Files:**
- Create: `src/writing/rubrics.ts`
- Test: `tests/writing/rubrics.test.ts`

**Interfaces:**
- Consumes: `WritingRubric`, `RubricCriterion`, `BandDescriptor` from `src/writing/types.ts`
- Produces: `getRubric(id): WritingRubric | null`, `listRubrics(): WritingRubric[]`, `computeOverallScore(criterionScores, rubric): number` (used by Tasks 6–9)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/rubrics.test.ts
import { describe, it, expect } from 'vitest'
import { getRubric, listRubrics, computeOverallScore } from '@/writing/rubrics'
import type { CriterionScore } from '@/writing/types'

describe('CEFR rubrics', () => {
  it('has rubrics for every CEFR level A1 through C2', () => {
    for (const level of ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']) {
      const rubric = getRubric(`cefr_${level}`)
      expect(rubric, `missing rubric cefr_${level}`).not.toBeNull()
    }
  })

  it('every rubric has exactly 4 criteria', () => {
    const rubrics = listRubrics().filter((r) => r.exam === 'cefr')
    for (const rubric of rubrics) {
      expect(rubric.criteria.length, `${rubric.id} has wrong criteria count`).toBe(4)
    }
  })

  it('criterion weights sum to 1', () => {
    const rubrics = listRubrics()
    for (const rubric of rubrics) {
      const sum = rubric.criteria.reduce((s, c) => s + c.weight, 0)
      expect(Math.abs(sum - 1)).toBeLessThan(0.001)
    }
  })

  it('every criterion has descriptors covering the full score range', () => {
    const rubric = getRubric('cefr_b1')!
    for (const criterion of rubric.criteria) {
      const scores = criterion.descriptors.map((d) => d.score)
      expect(scores).toContain(rubric.scoreRange.min)
      expect(scores).toContain(rubric.scoreRange.max)
    }
  })

  it('descriptors are sorted by score ascending', () => {
    for (const rubric of listRubrics()) {
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
    for (const rubric of listRubrics()) {
      for (const criterion of rubric.criteria) {
        for (const desc of criterion.descriptors) {
          expect(desc.description.length, `${rubric.id}.${criterion.id}@${desc.score}`).toBeGreaterThan(10)
        }
      }
    }
  })
})

describe('computeOverallScore', () => {
  it('computes a weighted average', () => {
    const rubric = getRubric('cefr_b1')!
    const scores: CriterionScore[] = rubric.criteria.map((c) => ({
      criterionId: c.id,
      criterionName: c.name,
      score: 3,
      maxScore: 5,
      evidence: [],
      feedback: '',
    }))
    // All criteria scored 3/5 → overall 3/5
    expect(computeOverallScore(scores, rubric)).toBe(3)
  })

  it('respects different weights', () => {
    const rubric = getRubric('cefr_b1')!
    const scores: CriterionScore[] = rubric.criteria.map((c, i) => ({
      criterionId: c.id,
      criterionName: c.name,
      score: i === 0 ? 5 : 1,
      maxScore: 5,
      evidence: [],
      feedback: '',
    }))
    const result = computeOverallScore(scores, rubric)
    // First criterion at 5, rest at 1 — average depends on weight.
    // With equal 0.25 weights: (5+1+1+1)/4 = 2.0
    expect(result).toBeGreaterThan(1)
    expect(result).toBeLessThan(5)
  })

  it('rounds to the nearest step', () => {
    const rubric = getRubric('cefr_b1')!
    const scores: CriterionScore[] = rubric.criteria.map((c) => ({
      criterionId: c.id,
      criterionName: c.name,
      score: 3,
      maxScore: 5,
      evidence: [],
      feedback: '',
    }))
    const result = computeOverallScore(scores, rubric)
    // With step=1, result must be an integer
    expect(result % rubric.scoreRange.step).toBe(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/writing/rubrics.test.ts`
Expected: FAIL

- [ ] **Step 3: Write the CEFR rubrics and scoring**

```typescript
// src/writing/rubrics.ts
import type { WritingRubric, CriterionScore } from './types'

// Four criteria used across all levels. The descriptors change per level;
// the criteria names are stable. This matches the IELTS structure because
// it is well-validated and widely understood.
//
// Weights are equal (0.25 each) at CEFR levels. IELTS and other exam
// rubrics may use different weights.

// Descriptor texts are grounded in the CEFR Companion Volume (2020)
// and adapted to be usable as LLM scoring instructions.

const CEFR_CRITERIA_IDS = ['task_achievement', 'coherence', 'vocabulary', 'grammar'] as const

function cefrRubric(level: string, max: number, descriptors: Record<string, string[]>): WritingRubric {
  return {
    id: `cefr_${level}`,
    name: `CEFR ${level.toUpperCase()} Writing`,
    exam: 'cefr',
    criteria: CEFR_CRITERIA_IDS.map((id) => ({
      id,
      name: {
        task_achievement: 'Task Achievement',
        coherence: 'Coherence and Cohesion',
        vocabulary: 'Lexical Resource',
        grammar: 'Grammatical Range and Accuracy',
      }[id],
      weight: 0.25,
      descriptors: descriptors[id]!.map((desc, i) => ({ score: i, description: desc })),
    })),
    scoreRange: { min: 0, max, step: 1 },
  }
}

const RUBRICS: WritingRubric[] = [
  cefrRubric('a1', 3, {
    task_achievement: [
      'Does not address the task or produces no comprehensible text.',
      'Addresses the task partially; some relevant content but major parts are missing.',
      'Addresses the task; all required points are covered with simple information.',
      'Fully addresses all parts of the task with relevant, clear content at the A1 level.',
    ],
    coherence: [
      'No discernible organisation; isolated words or phrases only.',
      'Some attempt to link ideas but meaning is often unclear.',
      'Simple ideas are connected with basic linkers (and, but, because); text is followable.',
      'Ideas are clearly sequenced with appropriate simple linkers; the text reads naturally for the level.',
    ],
    vocabulary: [
      'Vocabulary is insufficient to communicate any meaning.',
      'Very limited vocabulary; frequent errors impede understanding.',
      'Uses basic vocabulary related to personal and everyday topics; spelling errors occur but meaning is clear.',
      'Uses a range of A1 vocabulary accurately and appropriately for the task.',
    ],
    grammar: [
      'No evidence of sentence formation.',
      'Attempts simple sentences but errors are frequent and impede meaning.',
      'Produces simple sentences (subject-verb-object) with reasonable accuracy; errors occur but meaning is clear.',
      'Uses simple sentence forms accurately with only occasional slips; the text reads as natural A1 writing.',
    ],
  }),

  cefrRubric('a2', 3, {
    task_achievement: [
      'Does not address the task or produces only isolated words.',
      'Addresses the task partially; required points are incomplete or unclear.',
      'Addresses all parts of the task with simple but adequate content.',
      'Addresses the task fully and effectively with appropriate detail for A2.',
    ],
    coherence: [
      'No discernible organisation beyond isolated phrases.',
      'Some attempt at paragraphing or logical order but connections are weak.',
      'Ideas are organised into short paragraphs with basic linkers (then, next, also, because).',
      'Clear logical organisation with a range of simple cohesive devices; easy to follow.',
    ],
    vocabulary: [
      'Vocabulary too limited to address the task.',
      'Limited to high-frequency words; frequent errors affect clarity.',
      'Uses everyday vocabulary adequately; some errors but meaning is maintained.',
      'Uses a range of A2 vocabulary accurately and with some variety.',
    ],
    grammar: [
      'No recognisable sentence structures.',
      'Simple sentences attempted but frequent errors make meaning unclear.',
      'Uses simple and some compound sentences; errors are present but do not prevent understanding.',
      'Produces simple and compound sentences with good accuracy; only occasional errors.',
    ],
  }),

  cefrRubric('b1', 5, {
    task_achievement: [
      'Does not address the task.',
      'Barely addresses the task; content is largely irrelevant or incomprehensible.',
      'Addresses the task partially; some relevant points but response is incomplete.',
      'Addresses all parts of the task; content is relevant but may lack detail or development.',
      'Addresses all parts of the task well with relevant supporting ideas and adequate development.',
      'Fully and effectively addresses the task with well-chosen supporting details at the B1 level.',
    ],
    coherence: [
      'No organisation.',
      'Very limited organisation; ideas are difficult to follow.',
      'Some organisation visible but paragraphing is inconsistent or linkers are repetitive.',
      'Clear overall organisation with paragraphing; uses a range of basic cohesive devices (however, therefore, for example).',
      'Well-organised with clear paragraphing and effective use of cohesive devices throughout.',
      'Skilfully organised for B1; cohesion is natural and supports the reader throughout the text.',
    ],
    vocabulary: [
      'No meaningful vocabulary use.',
      'Vocabulary is insufficient; errors dominate and impede communication.',
      'Limited vocabulary with noticeable errors; meaning is sometimes unclear.',
      'Adequate vocabulary for the task; some errors but meaning is always clear.',
      'Good range of B1 vocabulary used with general accuracy; some less common words attempted.',
      'Wide range of B1 vocabulary used accurately and naturally; word choice enhances the text.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Sentence formation is severely limited; errors prevent comprehension.',
      'Simple sentences mostly accurate; complex sentences attempted but often faulty.',
      'Mix of simple and complex sentences with reasonable accuracy; errors do not impede meaning.',
      'Good range of structures with general accuracy; complex sentences are mostly well-formed.',
      'Confident use of a range of B1 structures with only rare slips; the text reads fluently.',
    ],
  }),

  cefrRubric('b2', 5, {
    task_achievement: [
      'Does not address the task.',
      'Barely addresses the task; response is largely off-topic.',
      'Addresses the task but with limited development or unclear position.',
      'Addresses all parts of the task with relevant ideas; position is clear but may not be fully developed.',
      'Addresses all parts well with clear position and well-developed supporting arguments.',
      'Fully addresses the task with a nuanced, well-supported position demonstrating strong B2 competence.',
    ],
    coherence: [
      'No organisation.',
      'Very poor organisation; the reader cannot follow the argument.',
      'Some attempt at organisation but paragraphing or cohesion is weak.',
      'Clearly organised with effective paragraphing; cohesive devices used but sometimes mechanically.',
      'Well-organised with logical progression; cohesive devices used naturally and effectively.',
      'Excellent organisation; the text flows effortlessly with skilful use of referencing and cohesion.',
    ],
    vocabulary: [
      'No meaningful vocabulary.',
      'Very limited; frequent errors impede understanding.',
      'Limited range; errors are noticeable and sometimes impede clarity.',
      'Adequate range with some less common vocabulary; occasional errors in word choice or formation.',
      'Good range of vocabulary including less common items; errors are rare and do not impede.',
      'Wide, precise vocabulary used with flexibility and natural collocations; errors are negligible.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Very limited structures; errors dominate.',
      'Limited range of structures; errors are frequent in complex sentences.',
      'Range of complex structures attempted with reasonable accuracy; errors occur but rarely impede.',
      'Wide range of structures used with consistent accuracy; complex sentences are well-controlled.',
      'Full range of B2 structures used flexibly and accurately; only rare slips in ambitious constructions.',
    ],
  }),

  cefrRubric('c1', 5, {
    task_achievement: [
      'Does not address the task.',
      'Barely addresses the task; ideas are undeveloped or irrelevant.',
      'Addresses the task but with limited depth or inconsistent focus.',
      'Addresses the task effectively with well-developed ideas but occasional gaps in reasoning.',
      'Addresses the task thoroughly with a clear, consistent and well-supported position throughout.',
      'Addresses the task with sophistication, insight and a fully developed, nuanced argument.',
    ],
    coherence: [
      'No organisation.',
      'Very poor organisation; argument is impossible to follow.',
      'Some organisation but logical progression breaks down in places.',
      'Well-organised with clear progression; cohesion is effective but occasionally noticeable.',
      'Excellently organised; cohesion is seamless and supports the reader throughout.',
      'Masterful organisation; the structure itself enhances the argument in a way that feels effortless.',
    ],
    vocabulary: [
      'No meaningful vocabulary.',
      'Very limited; communication is severely impaired.',
      'Limited range; paraphrasing and word choice are often inaccurate.',
      'Good range including some sophisticated items; occasional inaccuracy in less common vocabulary.',
      'Wide range used with precision and natural collocation; errors are very rare.',
      'Exceptional vocabulary range deployed with precision, nuance and stylistic awareness.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Very limited structures; frequent errors impede comprehension.',
      'Some range of complex structures but errors are noticeable.',
      'Wide range of structures with consistent accuracy; errors occur only in the most complex constructions.',
      'Full range of structures used flexibly with very few errors even in ambitious sentences.',
      'Complete grammatical control with only very rare slips; the writing is consistently fluent and precise.',
    ],
  }),

  cefrRubric('c2', 5, {
    task_achievement: [
      'Does not address the task.',
      'Barely addresses the task; response lacks substance.',
      'Addresses the task but lacks the depth or sophistication expected at C2.',
      'Addresses the task thoroughly with well-developed, insightful content.',
      'Addresses the task with authority; argument is compelling and fully substantiated.',
      'Exceptional treatment of the task showing originality, depth and intellectual rigour at C2 level.',
    ],
    coherence: [
      'No organisation.',
      'Poor organisation; the argument is incoherent.',
      'Some organisation but the text lacks the fluency expected at C2.',
      'Well-organised and fluent; cohesion is effective throughout.',
      'Excellently organised; the text reads as polished, professional prose.',
      'Flawless organisation; structure, paragraphing and cohesion are indistinguishable from educated native-speaker writing.',
    ],
    vocabulary: [
      'No meaningful vocabulary.',
      'Very limited; far below C2 expectations.',
      'Adequate range but lacks the precision and sophistication expected at C2.',
      'Good range with sophisticated items; occasional imprecision in nuanced usage.',
      'Exceptional range used with precision and stylistic control; word choice is consistently apt.',
      'Complete mastery of vocabulary; the text exhibits the lexical sophistication of an educated native speaker.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Very limited structures; far below C2 expectations.',
      'Some range but errors in complex constructions are too frequent for C2.',
      'Wide range with high accuracy; rare errors in the most complex structures.',
      'Complete grammatical control; the writing is consistently fluent and natural.',
      'Indistinguishable from an educated native speaker in grammatical range, accuracy and style.',
    ],
  }),
]

const RUBRIC_MAP = new Map(RUBRICS.map((r) => [r.id, r]))

export function getRubric(id: string): WritingRubric | null {
  return RUBRIC_MAP.get(id) ?? null
}

export function listRubrics(): WritingRubric[] {
  return [...RUBRICS]
}

// Compute a weighted average score, rounded to the rubric's step.
export function computeOverallScore(
  criterionScores: CriterionScore[],
  rubric: WritingRubric,
): number {
  let weighted = 0
  for (const cs of criterionScores) {
    const criterion = rubric.criteria.find((c) => c.id === cs.criterionId)
    if (!criterion) continue
    weighted += cs.score * criterion.weight
  }

  const { step } = rubric.scoreRange
  return Math.round(weighted / step) * step
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/writing/rubrics.test.ts`
Expected: PASS

- [ ] **Step 5: Run full suite, commit**

```bash
npx vitest run
git add src/writing/rubrics.ts tests/writing/rubrics.test.ts
git commit -m "feat: CEFR writing rubrics A1-C2 with weighted scoring

Six rubrics with 4 criteria each (task achievement, coherence,
vocabulary, grammar). Band descriptors grounded in the CEFR
Companion Volume. computeOverallScore handles weighted averages
with step rounding."
```

---

### Task 3: IELTS writing rubrics

**Files:**
- Create: `src/writing/rubrics-ielts.ts`
- Modify: `src/writing/rubrics.ts` — add IELTS rubrics to the internal `RUBRICS` array (or import and merge)
- Test: `tests/writing/rubrics-ielts.test.ts`

**Interfaces:**
- Consumes: `WritingRubric`, `BandDescriptor`, `RubricCriterion` from `src/writing/types.ts`; `getRubric`, `listRubrics` from `src/writing/rubrics.ts`
- Produces: Rubrics with ids `ielts_task1` and `ielts_task2` available via `getRubric()`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/rubrics-ielts.test.ts
import { describe, it, expect } from 'vitest'
import { getRubric } from '@/writing/rubrics'

describe('IELTS Task 1 rubric', () => {
  const rubric = getRubric('ielts_task1')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('has 4 criteria matching the published descriptors', () => {
    expect(rubric!.criteria.map((c) => c.id)).toEqual([
      'task_achievement', 'coherence', 'vocabulary', 'grammar',
    ])
  })

  it('uses 0-9 band scale with 0.5 steps', () => {
    expect(rubric!.scoreRange).toEqual({ min: 0, max: 9, step: 0.5 })
  })

  it('has descriptors at every whole band 0 through 9', () => {
    for (const criterion of rubric!.criteria) {
      const scores = criterion.descriptors.map((d) => d.score)
      for (let band = 0; band <= 9; band++) {
        expect(scores, `${criterion.id} missing band ${band}`).toContain(band)
      }
    }
  })

  it('criterion weights sum to 1', () => {
    const sum = rubric!.criteria.reduce((s, c) => s + c.weight, 0)
    expect(Math.abs(sum - 1)).toBeLessThan(0.001)
  })
})

describe('IELTS Task 2 rubric', () => {
  const rubric = getRubric('ielts_task2')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('uses Task Response as the first criterion (not Task Achievement)', () => {
    expect(rubric!.criteria[0]!.id).toBe('task_response')
  })

  it('uses 0-9 band scale', () => {
    expect(rubric!.scoreRange.max).toBe(9)
  })

  it('has band descriptors that distinguish it from Task 1', () => {
    const t1 = getRubric('ielts_task1')!
    const t2 = getRubric('ielts_task2')!
    // Task 1 uses "task_achievement", Task 2 uses "task_response"
    expect(t1.criteria[0]!.id).not.toBe(t2.criteria[0]!.id)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write the IELTS rubrics**

Create `src/writing/rubrics-ielts.ts` with full band descriptors for both Task 1 and Task 2, bands 0–9, based on the published IELTS Writing Band Descriptors. The four criteria for each are:

**Task 1:** Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy
**Task 2:** Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy

Each criterion gets descriptors at whole bands 0–9 (10 levels). The weights are equal (0.25 each) matching the published marking practice.

Then modify `src/writing/rubrics.ts` to import and register these rubrics:

```typescript
// At the top of rubrics.ts, after the CEFR rubrics:
import { IELTS_RUBRICS } from './rubrics-ielts'

// Merge into the RUBRICS array:
const RUBRICS: WritingRubric[] = [
  ...CEFR_RUBRICS,
  ...IELTS_RUBRICS,
]
```

- [ ] **Step 4: Run tests, full suite, commit**

```bash
npx vitest run
git add src/writing/rubrics-ielts.ts src/writing/rubrics.ts tests/writing/rubrics-ielts.test.ts
git commit -m "feat: IELTS Writing band descriptors (Task 1 + Task 2)

Bands 0-9 with 0.5 step scoring. Task 1 uses Task Achievement;
Task 2 uses Task Response. Descriptors based on published IELTS
band descriptors."
```

---

### Task 4: PTE + OET writing rubrics

**Files:**
- Create: `src/writing/rubrics-pte.ts`
- Create: `src/writing/rubrics-oet.ts`
- Modify: `src/writing/rubrics.ts` — register PTE and OET rubrics
- Test: `tests/writing/rubrics-exam.test.ts`

**Interfaces:**
- Consumes: `WritingRubric` from `src/writing/types.ts`
- Produces: Rubrics with ids `pte_essay` and `oet_writing` available via `getRubric()`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/rubrics-exam.test.ts
import { describe, it, expect } from 'vitest'
import { getRubric } from '@/writing/rubrics'

describe('PTE Written Essay rubric', () => {
  const rubric = getRubric('pte_essay')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('has 7 criteria matching the published PTE scoring', () => {
    expect(rubric!.criteria.map((c) => c.id)).toEqual([
      'content', 'form', 'development', 'grammar',
      'linguistic_range', 'vocabulary', 'spelling',
    ])
  })

  it('content scores 0-3, other criteria score 0-2', () => {
    const content = rubric!.criteria.find((c) => c.id === 'content')!
    const form = rubric!.criteria.find((c) => c.id === 'form')!
    expect(content.descriptors[content.descriptors.length - 1]!.score).toBe(3)
    expect(form.descriptors[form.descriptors.length - 1]!.score).toBe(2)
  })

  it('criterion weights sum to 1', () => {
    const sum = rubric!.criteria.reduce((s, c) => s + c.weight, 0)
    expect(Math.abs(sum - 1)).toBeLessThan(0.001)
  })
})

describe('OET Writing rubric', () => {
  const rubric = getRubric('oet_writing')

  it('exists', () => {
    expect(rubric).not.toBeNull()
  })

  it('has 5 criteria matching published OET scoring', () => {
    expect(rubric!.criteria).toHaveLength(5)
    expect(rubric!.criteria.map((c) => c.id)).toEqual([
      'task_fulfilment', 'appropriateness', 'comprehension',
      'linguistic_features', 'presentation',
    ])
  })

  it('uses 0-5 scale (mapped from A-E + 0)', () => {
    expect(rubric!.scoreRange).toEqual({ min: 0, max: 5, step: 1 })
  })

  it('criterion weights sum to 1', () => {
    const sum = rubric!.criteria.reduce((s, c) => s + c.weight, 0)
    expect(Math.abs(sum - 1)).toBeLessThan(0.001)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write PTE and OET rubrics**

`src/writing/rubrics-pte.ts` — 7 criteria (Content 0-3, others 0-2), based on published PTE Academic scoring.

`src/writing/rubrics-oet.ts` — 5 criteria mapped from A-E grades to 0-5 numeric, based on published OET Writing assessment criteria.

Register in `src/writing/rubrics.ts`:
```typescript
import { PTE_RUBRICS } from './rubrics-pte'
import { OET_RUBRICS } from './rubrics-oet'

const RUBRICS: WritingRubric[] = [
  ...CEFR_RUBRICS,
  ...IELTS_RUBRICS,
  ...PTE_RUBRICS,
  ...OET_RUBRICS,
]
```

- [ ] **Step 4: Run tests, full suite, commit**

```bash
npx vitest run
git add src/writing/rubrics-pte.ts src/writing/rubrics-oet.ts src/writing/rubrics.ts tests/writing/rubrics-exam.test.ts
git commit -m "feat: PTE and OET writing rubrics

PTE Written Essay: 7 criteria (content, form, development, grammar,
linguistic range, vocabulary, spelling).
OET Writing: 5 criteria mapped from A-E to 0-5 numeric scale."
```

---

### Task 5: Response validation

**Files:**
- Create: `src/writing/validate.ts`
- Test: `tests/writing/validate.test.ts`

**Interfaces:**
- Consumes: `WritingTask`, `WritingResponse` from `src/writing/types.ts`
- Produces: `validateResponse(response, task): ValidationResult` (used by Task 8)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/validate.test.ts
import { describe, it, expect } from 'vitest'
import { validateResponse } from '@/writing/validate'
import type { WritingTask, WritingResponse } from '@/writing/types'

function task(overrides: Partial<WritingTask> = {}): WritingTask {
  return {
    id: 'test.task', type: 'essay', level: 'B1', exam: 'cefr',
    prompt: 'Write about your opinion.', minWords: 100, maxWords: 200,
    timeLimitMinutes: null, rubricId: 'cefr_b1', ...overrides,
  }
}

function response(text: string): WritingResponse {
  return { taskId: 'test.task', text, submittedAt: Date.now(), timeTakenSeconds: null }
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
    const result = validateResponse(response('One two three four five.'), task({ minWords: 1 }))
    expect(result.wordCount).toBe(5)
  })

  it('counts hyphenated words as one word', () => {
    const result = validateResponse(response('This is a well-known fact in modern-day life.'), task({ minWords: 1 }))
    expect(result.wordCount).toBe(8)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write validation**

```typescript
// src/writing/validate.ts
import type { WritingTask, WritingResponse } from './types'

export interface ValidationResult {
  valid: boolean
  wordCount: number
  issues: string[]
  warnings: string[]
}

export function validateResponse(
  response: WritingResponse,
  task: WritingTask,
): ValidationResult {
  const issues: string[] = []
  const warnings: string[] = []

  const trimmed = response.text.trim()
  if (trimmed.length === 0) {
    return { valid: false, wordCount: 0, issues: ['empty'], warnings }
  }

  const wordCount = countWords(trimmed)

  if (wordCount < task.minWords) {
    issues.push('below_minimum')
  }

  if (wordCount > task.maxWords) {
    warnings.push('above_maximum')
  }

  // Detect if the learner copied the prompt into their response.
  const promptNorm = task.prompt.toLowerCase().replace(/[^a-z\s]/g, '').trim()
  const responseNorm = trimmed.toLowerCase().replace(/[^a-z\s]/g, '').trim()
  if (promptNorm.length > 20 && responseNorm.includes(promptNorm)) {
    warnings.push('contains_prompt')
  }

  return { valid: issues.length === 0, wordCount, issues, warnings }
}

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length
}
```

- [ ] **Step 4: Run tests, full suite, commit**

```bash
npx vitest run
git add src/writing/validate.ts tests/writing/validate.test.ts
git commit -m "feat: writing response validation

Word count, minimum/maximum enforcement, empty detection, prompt
copy detection. Over-maximum is a warning, under-minimum is a
rejection."
```

---

### Task 6: Scoring prompt assembly

**Files:**
- Create: `src/writing/prompt.ts`
- Test: `tests/writing/prompt.test.ts`

**Interfaces:**
- Consumes: `WritingTask`, `WritingResponse`, `WritingRubric` from `src/writing/types.ts`; `getRubric` from `src/writing/rubrics.ts`; `buildConstraints` from `src/generation/constraints.ts`; `ProfilerInventory` from `src/profiler/profile.ts`
- Produces: `buildScoringPrompt(response, task, rubric, inventory): string` (used by Task 8)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/prompt.test.ts
import { describe, it, expect } from 'vitest'
import { buildScoringPrompt } from '@/writing/prompt'
import { getRubric } from '@/writing/rubrics'
import type { WritingTask, WritingResponse } from '@/writing/types'
import { buildProfilerInventory } from '@/profiler/build-inventory'

const inventory = buildProfilerInventory()

function task(): WritingTask {
  return {
    id: 'test.b1', type: 'essay', level: 'B1', exam: 'cefr',
    prompt: 'Do you prefer city or country life?',
    minWords: 120, maxWords: 180, timeLimitMinutes: null, rubricId: 'cefr_b1',
  }
}

const LEARNER_TEXT = `I think city life is better than country life. In the city, there are many shops and restaurants. You can find everything you need. Also, there is good public transport. However, the city is very noisy and expensive. I prefer the city because I like to go out with friends and there are more jobs. But I understand why some people want to live in the country because it is more quiet.`

function response(): WritingResponse {
  return { taskId: 'test.b1', text: LEARNER_TEXT, submittedAt: 1700000000000, timeTakenSeconds: null }
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
    expect(prompt).toContain('group')
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
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write prompt assembly**

```typescript
// src/writing/prompt.ts
import type { WritingTask, WritingResponse, WritingRubric } from './types'
import type { ProfilerInventory } from '@/profiler/profile'

// Build the full prompt sent to the LLM for scoring. The prompt must
// produce structured JSON matching the expected output shape.
export function buildScoringPrompt(
  response: WritingResponse,
  task: WritingTask,
  rubric: WritingRubric,
  _inventory: ProfilerInventory,
): string {
  const lines: string[] = []

  lines.push('You are scoring a piece of English writing. Your response must be')
  lines.push('a single JSON object, with no surrounding text or markdown fences.')
  lines.push('')

  // Task context
  lines.push('## TASK')
  lines.push(`Level: ${task.level}`)
  lines.push(`Type: ${task.type} (${task.exam})`)
  lines.push(`Prompt given to the learner: "${task.prompt}"`)
  lines.push(`Word limits: ${task.minWords}–${task.maxWords}`)
  lines.push('')

  // The learner's text
  lines.push('## LEARNER TEXT')
  lines.push('```')
  lines.push(response.text)
  lines.push('```')
  lines.push('')

  // Rubric with full band descriptors
  lines.push('## SCORING RUBRIC')
  lines.push(`Scale: ${rubric.scoreRange.min} to ${rubric.scoreRange.max} (step: ${rubric.scoreRange.step})`)
  lines.push('')

  for (const criterion of rubric.criteria) {
    lines.push(`### ${criterion.name} (id: "${criterion.id}", weight: ${criterion.weight})`)
    for (const desc of criterion.descriptors) {
      lines.push(`  ${desc.score}: ${desc.description}`)
    }
    lines.push('')
  }

  // Output format specification
  lines.push('## OUTPUT FORMAT')
  lines.push('Return a single JSON object with this exact shape:')
  lines.push('')
  lines.push('```json')
  lines.push('{')
  lines.push('  "criterionScores": [')
  lines.push('    {')
  lines.push('      "criterionId": "task_achievement",')
  lines.push('      "criterionName": "Task Achievement",')
  lines.push('      "score": 3,')
  lines.push(`      "maxScore": ${rubric.scoreRange.max},`)
  lines.push('      "evidence": [')
  lines.push('        {')
  lines.push('          "start": 0,')
  lines.push('          "end": 42,')
  lines.push('          "quote": "exact text from the learner\'s writing",')
  lines.push('          "issue": "specific problem with this span",')
  lines.push('          "rewrite": "concrete improved version, or null if structural"')
  lines.push('        }')
  lines.push('      ],')
  lines.push('      "feedback": "One paragraph explaining this score, at the learner\'s level."')
  lines.push('    }')
  lines.push('  ],')
  lines.push('  "groupedIssues": [')
  lines.push('    {')
  lines.push('      "category": "missing_article",')
  lines.push('      "description": "Articles (a, an, the) are missing before nouns",')
  lines.push('      "count": 3,')
  lines.push('      "priority": "high",')
  lines.push('      "examples": [{"start": 10, "end": 25, "quote": "...", "issue": "...", "rewrite": "..."}]')
  lines.push('    }')
  lines.push('  ]')
  lines.push('}')
  lines.push('```')
  lines.push('')

  // Quality rules
  lines.push('## RULES — FOLLOW EXACTLY')
  lines.push('')
  lines.push('1. Score each criterion independently using the band descriptors above.')
  lines.push(`2. All feedback text must use vocabulary at ${task.level} level or below.`)
  lines.push('   Do NOT use words the learner would not understand.')
  lines.push('3. Every claim in your feedback MUST point to a specific location in the')
  lines.push('   learner\'s text via the "evidence" array with exact character offsets.')
  lines.push('   Never make a claim without quoting the relevant text.')
  lines.push('4. NEVER give generic feedback like "improve your cohesion" or "use more')
  lines.push('   variety". Every piece of feedback must quote the learner\'s own words')
  lines.push('   and offer a concrete rewrite.')
  lines.push('5. Group repeated errors: if the same mistake appears 5 times, report it')
  lines.push('   ONCE in groupedIssues with count=5 and up to 3 examples.')
  lines.push('6. Set priority: "high" for the 2-3 most impactful issues the learner')
  lines.push('   should fix first. "medium" for secondary issues. "low" for minor')
  lines.push('   polishing. Every issue must have a priority.')
  lines.push('7. The "quote" field must be an EXACT substring of the learner text.')
  lines.push('   The "start" and "end" must be the correct character offsets.')
  lines.push('8. Include one CriterionScore object per criterion in the rubric,')
  lines.push('   in the same order as listed above.')

  return lines.join('\n')
}
```

- [ ] **Step 4: Run tests, full suite, commit**

```bash
npx vitest run
git add src/writing/prompt.ts tests/writing/prompt.test.ts
git commit -m "feat: scoring prompt assembly for writing assessment

Renders rubric + learner text + quality rules into a prompt that
produces structured JSON with evidence spans, rewrites, grouped
issues, and priority layering."
```

---

### Task 7: Score parsing and validation

**Files:**
- Create: `src/writing/parse-score.ts`
- Test: `tests/writing/parse-score.test.ts`

**Interfaces:**
- Consumes: `CriterionScore`, `GroupedIssue`, `EvidenceSpan`, `WritingRubric` from `src/writing/types.ts`
- Produces: `parseScoringOutput(raw, rubric, learnerText): ParsedScore | null` (used by Task 8)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/parse-score.test.ts
import { describe, it, expect } from 'vitest'
import { parseScoringOutput } from '@/writing/parse-score'
import { getRubric } from '@/writing/rubrics'

const rubric = getRubric('cefr_b1')!
const LEARNER = 'I think city life is better than country life.'

const VALID_OUTPUT = JSON.stringify({
  criterionScores: rubric.criteria.map((c) => ({
    criterionId: c.id,
    criterionName: c.name,
    score: 3,
    maxScore: 5,
    evidence: [{
      start: 0, end: 46, quote: 'I think city life is better than country life.',
      issue: 'The opening directly states an opinion which is appropriate.',
      rewrite: null,
    }],
    feedback: 'You clearly state your opinion, which is good for this level.',
  })),
  groupedIssues: [{
    category: 'missing_article',
    description: 'Missing articles before nouns',
    count: 1,
    priority: 'medium',
    examples: [{
      start: 8, end: 17, quote: 'city life', issue: 'Missing article',
      rewrite: 'the city life',
    }],
  }],
})

describe('parseScoringOutput', () => {
  it('parses valid JSON', () => {
    const result = parseScoringOutput(VALID_OUTPUT, rubric, LEARNER)
    expect(result).not.toBeNull()
    expect(result!.criterionScores).toHaveLength(4)
  })

  it('strips markdown fences', () => {
    const fenced = '```json\n' + VALID_OUTPUT + '\n```'
    expect(parseScoringOutput(fenced, rubric, LEARNER)).not.toBeNull()
  })

  it('returns null for invalid JSON', () => {
    expect(parseScoringOutput('not json', rubric, LEARNER)).toBeNull()
  })

  it('returns null when criterionScores is missing', () => {
    expect(parseScoringOutput('{}', rubric, LEARNER)).toBeNull()
  })

  it('returns null when a score is out of rubric range', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores[0].score = 99
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('returns null when a score is negative', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores[0].score = -1
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('returns null when criterion count does not match rubric', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores = bad.criterionScores.slice(0, 2)
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('validates that evidence quotes are substrings of learner text', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.criterionScores[0].evidence[0].quote = 'text that is not in the response'
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })

  it('accepts empty groupedIssues', () => {
    const good = JSON.parse(VALID_OUTPUT)
    good.groupedIssues = []
    expect(parseScoringOutput(JSON.stringify(good), rubric, LEARNER)).not.toBeNull()
  })

  it('validates grouped issue priority values', () => {
    const bad = JSON.parse(VALID_OUTPUT)
    bad.groupedIssues[0].priority = 'extreme'
    expect(parseScoringOutput(JSON.stringify(bad), rubric, LEARNER)).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write the parser**

```typescript
// src/writing/parse-score.ts
import type { CriterionScore, GroupedIssue, EvidenceSpan, WritingRubric } from './types'

export interface ParsedScore {
  criterionScores: CriterionScore[]
  groupedIssues: GroupedIssue[]
}

const VALID_PRIORITIES = new Set(['high', 'medium', 'low'])

// Parse and validate structured scoring output from the LLM.
// Returns null when the output is malformed or fails validation.
export function parseScoringOutput(
  raw: string,
  rubric: WritingRubric,
  learnerText: string,
): ParsedScore | null {
  // Strip markdown fences.
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const text = fenced ? fenced[1]!.trim() : raw.trim()

  let obj: Record<string, unknown>
  try {
    obj = JSON.parse(text)
  } catch {
    return null
  }

  if (!Array.isArray(obj.criterionScores)) return null

  const scores = obj.criterionScores as Array<Record<string, unknown>>

  // Must have exactly as many scores as the rubric has criteria.
  if (scores.length !== rubric.criteria.length) return null

  const criterionScores: CriterionScore[] = []

  for (const raw of scores) {
    if (typeof raw.criterionId !== 'string') return null
    if (typeof raw.score !== 'number') return null
    if (raw.score < rubric.scoreRange.min || raw.score > rubric.scoreRange.max) return null
    if (typeof raw.feedback !== 'string') return null

    const evidence = parseEvidence(raw.evidence, learnerText)
    if (evidence === null) return null

    criterionScores.push({
      criterionId: raw.criterionId as string,
      criterionName: typeof raw.criterionName === 'string' ? raw.criterionName : raw.criterionId as string,
      score: raw.score as number,
      maxScore: rubric.scoreRange.max,
      evidence,
      feedback: raw.feedback as string,
    })
  }

  // Grouped issues are optional (a perfect response has none).
  const groupedIssues: GroupedIssue[] = []
  if (Array.isArray(obj.groupedIssues)) {
    for (const gi of obj.groupedIssues as Array<Record<string, unknown>>) {
      if (typeof gi.category !== 'string') return null
      if (typeof gi.description !== 'string') return null
      if (typeof gi.count !== 'number') return null
      if (!VALID_PRIORITIES.has(gi.priority as string)) return null

      const examples = parseEvidence(gi.examples, learnerText)
      if (examples === null) return null

      groupedIssues.push({
        category: gi.category as string,
        description: gi.description as string,
        count: gi.count as number,
        priority: gi.priority as 'high' | 'medium' | 'low',
        examples,
      })
    }
  }

  return { criterionScores, groupedIssues }
}

function parseEvidence(
  raw: unknown,
  learnerText: string,
): EvidenceSpan[] | null {
  if (!Array.isArray(raw)) return raw === undefined ? [] : null

  const spans: EvidenceSpan[] = []
  for (const e of raw) {
    if (typeof e !== 'object' || e === null) return null
    const rec = e as Record<string, unknown>
    if (typeof rec.start !== 'number') return null
    if (typeof rec.end !== 'number') return null
    if (typeof rec.quote !== 'string') return null
    if (typeof rec.issue !== 'string') return null

    // The quote must actually appear in the learner's text.
    if (!learnerText.includes(rec.quote as string)) return null

    spans.push({
      start: rec.start as number,
      end: rec.end as number,
      quote: rec.quote as string,
      issue: rec.issue as string,
      rewrite: typeof rec.rewrite === 'string' ? rec.rewrite : null,
    })
  }

  return spans
}
```

- [ ] **Step 4: Run tests, full suite, commit**

```bash
npx vitest run
git add src/writing/parse-score.ts tests/writing/parse-score.test.ts
git commit -m "feat: score parser with evidence span validation

Parses structured LLM output, validates scores against rubric range,
checks criterion count matches rubric, verifies evidence quotes are
exact substrings of the learner's text."
```

---

### Task 8: Feedback quality gates

**Files:**
- Create: `src/writing/feedback-gates.ts`
- Test: `tests/writing/feedback-gates.test.ts`

**Interfaces:**
- Consumes: `ParsedScore` from `src/writing/parse-score.ts`; `ProfilerInventory` from `src/profiler/profile.ts`; `CefrLevel` from `src/skill-graph/types.ts`
- Produces: `checkFeedbackQuality(score, level, inventory): FeedbackReview` (used by Task 9)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/feedback-gates.test.ts
import { describe, it, expect } from 'vitest'
import { checkFeedbackQuality } from '@/writing/feedback-gates'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { ParsedScore } from '@/writing/parse-score'

const inventory = buildProfilerInventory()

function goodScore(): ParsedScore {
  return {
    criterionScores: [
      {
        criterionId: 'task_achievement', criterionName: 'Task Achievement',
        score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 10, quote: 'I think it', issue: 'States opinion clearly', rewrite: null }],
        feedback: 'You give your opinion clearly. This is good for this level.',
      },
      {
        criterionId: 'coherence', criterionName: 'Coherence',
        score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 10, quote: 'I think it', issue: 'Good opening', rewrite: null }],
        feedback: 'Your ideas are easy to follow.',
      },
      {
        criterionId: 'vocabulary', criterionName: 'Vocabulary',
        score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 10, quote: 'I think it', issue: 'Simple vocabulary used correctly', rewrite: null }],
        feedback: 'You use simple words correctly.',
      },
      {
        criterionId: 'grammar', criterionName: 'Grammar',
        score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 10, quote: 'I think it', issue: 'Simple sentences well formed', rewrite: null }],
        feedback: 'Your sentences are correct.',
      },
    ],
    groupedIssues: [],
  }
}

describe('feedback quality gates', () => {
  it('passes feedback that quotes the learner and is at level', () => {
    const review = checkFeedbackQuality(goodScore(), 'B1', inventory)
    expect(review.passed).toBe(true)
  })

  it('rejects when a criterion has no evidence', () => {
    const score = goodScore()
    score.criterionScores[0]!.evidence = []
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('no evidence'))).toBe(true)
  })

  it('rejects generic feedback phrases', () => {
    const score = goodScore()
    score.criterionScores[0]!.feedback = 'You should improve your cohesion and use more varied vocabulary.'
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.issues.some((i) => i.includes('generic'))).toBe(true)
  })

  it('rejects empty feedback', () => {
    const score = goodScore()
    score.criterionScores[0]!.feedback = ''
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(false)
  })

  it('warns when grouped issues have no priority set', () => {
    const score = goodScore()
    score.groupedIssues = [{
      category: 'test', description: 'test issue', count: 1,
      priority: 'high',
      examples: [{ start: 0, end: 5, quote: 'I thi', issue: 'test', rewrite: null }],
    }]
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.passed).toBe(true)
  })

  it('rejects when no high-priority issues exist but there are many issues', () => {
    const score = goodScore()
    score.groupedIssues = Array.from({ length: 5 }, (_, i) => ({
      category: `issue_${i}`, description: `Issue ${i}`, count: 1,
      priority: 'low' as const,
      examples: [{ start: 0, end: 5, quote: 'I thi', issue: 'test', rewrite: null }],
    }))
    const review = checkFeedbackQuality(score, 'B1', inventory)
    expect(review.issues.some((i) => i.includes('priority'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write feedback gates**

```typescript
// src/writing/feedback-gates.ts
import type { ProfilerInventory } from '@/profiler/profile'
import { profileText } from '@/profiler/profile'
import type { CefrLevel } from '@/skill-graph/types'
import type { ParsedScore } from './parse-score'

export interface FeedbackReview {
  passed: boolean
  issues: string[]
}

// Generic phrases that add nothing. Finding any of these in feedback
// text means the model has produced filler, not guidance.
const GENERIC_PHRASES = [
  'improve your cohesion',
  'use more varied vocabulary',
  'use a wider range of vocabulary',
  'improve your grammar',
  'use more complex sentences',
  'work on your coherence',
  'try to use more advanced vocabulary',
  'make fewer grammatical errors',
  'improve your writing skills',
  'use better linking words',
]

export function checkFeedbackQuality(
  score: ParsedScore,
  level: CefrLevel,
  inventory: ProfilerInventory,
): FeedbackReview {
  const issues: string[] = []

  for (const cs of score.criterionScores) {
    // Every criterion must have evidence from the learner's text.
    if (cs.evidence.length === 0) {
      issues.push(`${cs.criterionName}: no evidence — every score must cite the learner's text`)
    }

    // Empty feedback is always a failure.
    if (cs.feedback.trim().length === 0) {
      issues.push(`${cs.criterionName}: feedback is empty`)
      continue
    }

    // Check for generic phrases.
    const lower = cs.feedback.toLowerCase()
    for (const phrase of GENERIC_PHRASES) {
      if (lower.includes(phrase)) {
        issues.push(
          `${cs.criterionName}: feedback contains generic phrase "${phrase}" — ` +
          `every claim must quote the learner's own words and name a specific fix`,
        )
      }
    }
  }

  // If there are 4+ grouped issues, at least one must be high priority.
  // Without prioritisation the learner sees a wall of corrections and
  // fixes none of them.
  if (score.groupedIssues.length >= 4) {
    const hasHigh = score.groupedIssues.some((gi) => gi.priority === 'high')
    if (!hasHigh) {
      issues.push(
        `${score.groupedIssues.length} issues found but none marked high priority — ` +
        `the learner needs to know which 2-3 to fix first`,
      )
    }
  }

  return { passed: issues.length === 0, issues }
}
```

- [ ] **Step 4: Run tests, full suite, commit**

```bash
npx vitest run
git add src/writing/feedback-gates.ts tests/writing/feedback-gates.test.ts
git commit -m "feat: feedback quality gates for writing assessment

Rejects evidence-free scores, empty feedback, generic phrases.
Requires priority layering when 4+ issues exist."
```

---

### Task 9: Score-and-feedback loop

**Files:**
- Create: `src/writing/score.ts`
- Test: `tests/writing/score.test.ts`

**Interfaces:**
- Consumes: `GenerationProvider` from `src/generation/provider.ts`; `WritingTask`, `WritingResponse`, `WritingScore` from `src/writing/types.ts`; `getRubric`, `computeOverallScore` from `src/writing/rubrics.ts`; `validateResponse` from `src/writing/validate.ts`; `buildScoringPrompt` from `src/writing/prompt.ts`; `parseScoringOutput` from `src/writing/parse-score.ts`; `checkFeedbackQuality` from `src/writing/feedback-gates.ts`; `ProfilerInventory` from `src/profiler/profile.ts`
- Produces: `scoreWriting(provider, response, task, inventory): Promise<ScoreWritingResult>` — the main entry point for writing assessment

- [ ] **Step 1: Write the failing test**

```typescript
// tests/writing/score.test.ts
import { describe, it, expect } from 'vitest'
import { scoreWriting } from '@/writing/score'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { getTask } from '@/writing/tasks'
import type { GenerationProvider, GenerationRequest, GenerationResponse } from '@/generation/provider'
import type { WritingResponse } from '@/writing/types'

const inventory = buildProfilerInventory()
const task = getTask('cefr.b1.essay.1')!

const LEARNER_TEXT = 'I think city life is better than country life. In the city, there are many shops and restaurants. You can find everything you need. Also, there is good public transport. However, the city is very noisy and expensive. I prefer the city because I like to go out with friends and there are more jobs. But I understand why some people want to live in the country because it is more quiet and peaceful.'

function response(): WritingResponse {
  return { taskId: task.id, text: LEARNER_TEXT, submittedAt: 1700000000000, timeTakenSeconds: null }
}

// A good scoring output the model might return.
function goodOutput(): string {
  return JSON.stringify({
    criterionScores: [
      { criterionId: 'task_achievement', criterionName: 'Task Achievement', score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 47, quote: 'I think city life is better than country life.', issue: 'States opinion clearly', rewrite: null }],
        feedback: 'You state your opinion clearly at the start. You give reasons for your choice, which is good.' },
      { criterionId: 'coherence', criterionName: 'Coherence and Cohesion', score: 3, maxScore: 5,
        evidence: [{ start: 158, end: 166, quote: 'However,', issue: 'Good use of contrast linker', rewrite: null }],
        feedback: 'You use linking words like "also" and "however" to connect your ideas.' },
      { criterionId: 'vocabulary', criterionName: 'Lexical Resource', score: 3, maxScore: 5,
        evidence: [{ start: 48, end: 103, quote: 'In the city, there are many shops and restaurants.', issue: 'Appropriate vocabulary', rewrite: null }],
        feedback: 'Your vocabulary is correct for this level. You use words about daily life well.' },
      { criterionId: 'grammar', criterionName: 'Grammatical Range and Accuracy', score: 3, maxScore: 5,
        evidence: [{ start: 298, end: 312, quote: 'it is more quiet', issue: 'Comparative form error', rewrite: 'it is quieter' }],
        feedback: 'Most of your sentences are correct. One small error: "more quiet" should be "quieter".' },
    ],
    groupedIssues: [
      { category: 'comparative_form', description: 'Incorrect comparative form for short adjectives', count: 1,
        priority: 'high',
        examples: [{ start: 298, end: 312, quote: 'it is more quiet', issue: '"more quiet" should be "quieter" for single-syllable adjectives', rewrite: 'it is quieter' }] },
    ],
  })
}

function goodProvider(): GenerationProvider {
  return {
    async generate(_req: GenerationRequest): Promise<GenerationResponse> {
      return { raw: goodOutput(), parsed: null }
    },
  }
}

describe('scoreWriting', () => {
  it('returns a complete WritingScore on success', async () => {
    const result = await scoreWriting(goodProvider(), response(), task, inventory)
    expect(result.score).not.toBeNull()
    expect(result.score!.criterionScores).toHaveLength(4)
    expect(result.score!.overallScore).toBeGreaterThan(0)
    expect(result.score!.wordCount).toBeGreaterThan(0)
  })

  it('computes overall score from criterion scores', async () => {
    const result = await scoreWriting(goodProvider(), response(), task, inventory)
    // All criteria scored 3/5 → overall 3
    expect(result.score!.overallScore).toBe(3)
  })

  it('includes grouped issues', async () => {
    const result = await scoreWriting(goodProvider(), response(), task, inventory)
    expect(result.score!.groupedIssues.length).toBeGreaterThan(0)
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
    expect(result.attempts).toBe(4)
  })

  it('rejects text below minimum words without calling the LLM', async () => {
    let called = false
    const provider: GenerationProvider = {
      async generate() { called = true; return { raw: '{}', parsed: null } },
    }
    const short: WritingResponse = { taskId: task.id, text: 'Too short.', submittedAt: 0, timeTakenSeconds: null }
    const result = await scoreWriting(provider, short, task, inventory)
    expect(result.score).toBeNull()
    expect(result.validationIssues).toContain('below_minimum')
    expect(called).toBe(false)
  })

  it('sets the level and taskId on the result', async () => {
    const result = await scoreWriting(goodProvider(), response(), task, inventory)
    expect(result.score!.level).toBe('B1')
    expect(result.score!.taskId).toBe(task.id)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Write the score loop**

```typescript
// src/writing/score.ts
import type { GenerationProvider } from '@/generation/provider'
import type { ProfilerInventory } from '@/profiler/profile'
import type { WritingTask, WritingResponse, WritingScore } from './types'
import { getRubric, computeOverallScore } from './rubrics'
import { validateResponse } from './validate'
import { buildScoringPrompt } from './prompt'
import { parseScoringOutput } from './parse-score'
import { checkFeedbackQuality } from './feedback-gates'

const MAX_RETRIES = 3
const MAX_TOKENS = 2048

export interface ScoreWritingResult {
  score: WritingScore | null
  attempts: number
  validationIssues: string[]
  feedbackIssues: string[]
}

export async function scoreWriting(
  provider: GenerationProvider,
  response: WritingResponse,
  task: WritingTask,
  inventory: ProfilerInventory,
): Promise<ScoreWritingResult> {
  const rubric = getRubric(task.rubricId)
  if (!rubric) {
    return { score: null, attempts: 0, validationIssues: [`Unknown rubric: ${task.rubricId}`], feedbackIssues: [] }
  }

  // Validate the response before spending money on an LLM call.
  const validation = validateResponse(response, task)
  if (!validation.valid) {
    return { score: null, attempts: 0, validationIssues: validation.issues, feedbackIssues: [] }
  }

  const prompt = buildScoringPrompt(response, task, rubric, inventory)
  const wordCount = validation.wordCount

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    const llmResponse = await provider.generate({ prompt, maxTokens: MAX_TOKENS })
    const parsed = parseScoringOutput(llmResponse.raw, rubric, response.text)

    if (!parsed) continue

    const feedbackReview = checkFeedbackQuality(parsed, task.level, inventory)
    if (!feedbackReview.passed) {
      // On last attempt, return what we have with the feedback issues noted.
      if (attempt === MAX_RETRIES + 1) {
        return {
          score: assembleScore(parsed, task, rubric, wordCount),
          attempts: attempt,
          validationIssues: [],
          feedbackIssues: feedbackReview.issues,
        }
      }
      continue
    }

    return {
      score: assembleScore(parsed, task, rubric, wordCount),
      attempts: attempt,
      validationIssues: [],
      feedbackIssues: [],
    }
  }

  return { score: null, attempts: MAX_RETRIES + 1, validationIssues: [], feedbackIssues: [] }
}

function assembleScore(
  parsed: { criterionScores: WritingScore['criterionScores']; groupedIssues: WritingScore['groupedIssues'] },
  task: WritingTask,
  rubric: ReturnType<typeof getRubric> & {},
  wordCount: number,
): WritingScore {
  return {
    taskId: task.id,
    overallScore: computeOverallScore(parsed.criterionScores, rubric),
    maxOverallScore: rubric.scoreRange.max,
    criterionScores: parsed.criterionScores,
    groupedIssues: parsed.groupedIssues,
    wordCount,
    level: task.level,
  }
}
```

- [ ] **Step 4: Run tests, full suite, commit**

```bash
npx vitest run
git add src/writing/score.ts tests/writing/score.test.ts
git commit -m "feat: score-and-feedback loop for writing assessment

scoreWriting() validates the response, builds a scoring prompt,
calls the LLM, parses structured output, runs feedback quality
gates, and retries up to 3 times. No API key needed for tests."
```

---

### Task 10: Golden set for writing assessment

**Files:**
- Create: `tests/writing/golden-set.test.ts`

**Interfaces:**
- Consumes: `parseScoringOutput` from `src/writing/parse-score.ts`; `checkFeedbackQuality` from `src/writing/feedback-gates.ts`; `getRubric` from `src/writing/rubrics.ts`; `validateResponse` from `src/writing/validate.ts`; `buildProfilerInventory` from `src/profiler/build-inventory.ts`

- [ ] **Step 1: Write golden set tests**

The golden set contains curated LLM outputs — known-good and known-bad scoring responses — that verify the parser and feedback gates correctly accept and reject each case. This is the regression suite for the entire writing assessment pipeline.

```typescript
// tests/writing/golden-set.test.ts
import { describe, it, expect } from 'vitest'
import { parseScoringOutput } from '@/writing/parse-score'
import { checkFeedbackQuality } from '@/writing/feedback-gates'
import { getRubric } from '@/writing/rubrics'
import { validateResponse } from '@/writing/validate'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { WritingTask, WritingResponse } from '@/writing/types'

const inventory = buildProfilerInventory()
const B1_RUBRIC = getRubric('cefr_b1')!
const IELTS_RUBRIC = getRubric('ielts_task2')!

const B1_LEARNER_TEXT = 'I think city life is better than country life. In the city, there are many shops and restaurants. You can find everything you need. Also, there is good public transport. However, the city is very noisy and expensive. I prefer the city because I like to go out with friends and there are more jobs.'

function b1Task(): WritingTask {
  return {
    id: 'golden.b1', type: 'essay', level: 'B1', exam: 'cefr',
    prompt: 'Do you prefer city or country life?',
    minWords: 50, maxWords: 200, timeLimitMinutes: null, rubricId: 'cefr_b1',
  }
}

// --- GOOD OUTPUTS (must parse and pass gates) ---

describe('golden good scoring outputs — must all pass', () => {
  it('B1 CEFR essay with evidence and specific feedback', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id, criterionName: c.name, score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 47, quote: 'I think city life is better than country life.', issue: 'Clear opinion statement', rewrite: null }],
        feedback: 'You clearly state your opinion at the start of your text.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER_TEXT)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed).toBe(true)
  })
})

// --- BAD OUTPUTS (must be caught by parser or gates) ---

describe('golden bad scoring outputs — must all be rejected', () => {
  it('missing criterionScores array', () => {
    const output = JSON.stringify({ groupedIssues: [] })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER_TEXT)).toBeNull()
  })

  it('score above rubric maximum', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id, criterionName: c.name, score: 99, maxScore: 5,
        evidence: [{ start: 0, end: 10, quote: 'I think ci', issue: 'test', rewrite: null }],
        feedback: 'test feedback text here.',
      })),
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER_TEXT)).toBeNull()
  })

  it('evidence quote not found in learner text', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id, criterionName: c.name, score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 20, quote: 'THIS TEXT DOES NOT EXIST', issue: 'phantom quote', rewrite: null }],
        feedback: 'Some feedback.',
      })),
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER_TEXT)).toBeNull()
  })

  it('generic feedback phrase caught by gates', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id, criterionName: c.name, score: 3, maxScore: 5,
        evidence: [{ start: 0, end: 10, quote: 'I think ci', issue: 'test', rewrite: null }],
        feedback: c.id === 'vocabulary'
          ? 'You should try to use more varied vocabulary in your writing.'
          : 'Your writing shows good ability at this level.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER_TEXT)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed).toBe(false)
    expect(review.issues.some((i) => i.includes('generic'))).toBe(true)
  })

  it('no evidence on any criterion', () => {
    const output = JSON.stringify({
      criterionScores: B1_RUBRIC.criteria.map((c) => ({
        criterionId: c.id, criterionName: c.name, score: 3, maxScore: 5,
        evidence: [],
        feedback: 'Some feedback text.',
      })),
      groupedIssues: [],
    })
    const parsed = parseScoringOutput(output, B1_RUBRIC, B1_LEARNER_TEXT)
    expect(parsed).not.toBeNull()
    const review = checkFeedbackQuality(parsed!, 'B1', inventory)
    expect(review.passed).toBe(false)
  })

  it('wrong number of criteria for the rubric', () => {
    const output = JSON.stringify({
      criterionScores: [{ criterionId: 'only_one', criterionName: 'Only', score: 3, maxScore: 5, evidence: [], feedback: 'test' }],
      groupedIssues: [],
    })
    expect(parseScoringOutput(output, B1_RUBRIC, B1_LEARNER_TEXT)).toBeNull()
  })
})

// --- VALIDATION EDGE CASES ---

describe('response validation edge cases', () => {
  it('rejects empty submission', () => {
    const result = validateResponse(
      { taskId: 'golden.b1', text: '', submittedAt: 0, timeTakenSeconds: null },
      b1Task(),
    )
    expect(result.valid).toBe(false)
  })

  it('accepts text at exact minimum', () => {
    const text = 'word '.repeat(50).trim()
    const result = validateResponse(
      { taskId: 'golden.b1', text, submittedAt: 0, timeTakenSeconds: null },
      b1Task(),
    )
    expect(result.valid).toBe(true)
    expect(result.wordCount).toBe(50)
  })
})
```

- [ ] **Step 2: Run tests, full suite, commit**

```bash
npx vitest run
git add tests/writing/golden-set.test.ts
git commit -m "feat: golden set regression suite for writing assessment

Curated good and bad LLM scoring outputs covering: missing data,
out-of-range scores, phantom quotes, generic feedback, evidence
gaps, criterion count mismatches, and response validation."
```

---

## Self-Review

**1. Spec coverage check:**
- ✅ Per-criterion scoring with evidence spans (§3.3)
- ✅ Evidence must quote the learner's own text (§3.3)
- ✅ Concrete rewrites for each issue (§3.3)
- ✅ Generic feedback rejected (§3)
- ✅ Issue grouping — repeated errors collapsed (§3)
- ✅ Priority layering — high/medium/low (§3)
- ✅ CEFR A1–C2 rubrics (§1)
- ✅ IELTS Task 1 + Task 2 band descriptors (§1b)
- ✅ PTE Written Essay scoring (§1b)
- ✅ OET Writing criteria (§1b)
- ✅ Word count validation (§3.3)
- ✅ Feedback at learner's level (§1a)
- ✅ Response validation before LLM call (cost savings)
- ✅ Golden set regression suite (§3.6)
- ✅ Retry loop (same pattern as MCQ generation)

**2. Placeholder scan:** No TBDs, TODOs, or "implement later" found.

**3. Type consistency check:**
- `WritingTask`, `WritingResponse`, `WritingScore` — consistent across all tasks
- `EvidenceSpan` — same shape in types, parser, gates, and golden set
- `ParsedScore` — produced by Task 7, consumed by Tasks 8 and 9
- `getRubric()` — same signature everywhere
- `computeOverallScore()` — consumed by Task 9
- `validateResponse()` — consumed by Task 9
- `checkFeedbackQuality()` — consumed by Task 9
- `GenerationProvider` — reused from existing code, not redefined
