/**
 * Writing rubrics — the criteria and band descriptors used to score
 * learner writing.
 *
 * Rubrics are pure data, not scoring logic. The scoring engine reads a
 * rubric to:
 *   1. Build the LLM prompt (criteria names + band descriptors)
 *   2. Validate the model's output (score in range, correct criteria count)
 *   3. Compute the overall score (weighted average)
 *
 * This file contains CEFR A1–C2 rubrics. IELTS, PTE, and OET rubrics
 * are defined in separate files and merged into the registry here.
 *
 * All CEFR rubrics use four criteria matching the widely-validated IELTS
 * structure: Task Achievement, Coherence & Cohesion, Lexical Resource,
 * and Grammatical Range & Accuracy. Band descriptors are grounded in the
 * CEFR Companion Volume (2020).
 */

import type { WritingRubric, RubricCriterion, CriterionScore } from './types'

// The four criteria used at every CEFR level. Criteria names are stable;
// only the band descriptors change per level.
const CEFR_CRITERIA_IDS = [
  'task_achievement',
  'coherence',
  'vocabulary',
  'grammar',
] as const

// Human-readable names for each criterion id.
const CRITERION_NAMES: Record<string, string> = {
  task_achievement: 'Task Achievement',
  coherence: 'Coherence and Cohesion',
  vocabulary: 'Lexical Resource',
  grammar: 'Grammatical Range and Accuracy',
}

/**
 * Build a CEFR rubric from a level string and descriptor arrays.
 * Each descriptor array has (max + 1) entries, from score 0 to score max.
 * Weights are equal (0.25 each) — all four criteria matter equally at
 * CEFR levels.
 */
function cefrRubric(
  level: string,
  max: number,
  descriptors: Record<string, string[]>,
): WritingRubric {
  return {
    id: `cefr_${level}`,
    name: `CEFR ${level.toUpperCase()} Writing`,
    exam: 'cefr',
    criteria: CEFR_CRITERIA_IDS.map((id) => ({
      id,
      name: CRITERION_NAMES[id]!,
      weight: 0.25,
      descriptors: descriptors[id]!.map((desc, i) => ({
        score: i,
        description: desc,
      })),
    })),
    scoreRange: { min: 0, max, step: 1 },
  }
}

// ---------------------------------------------------------------------------
// CEFR A1–C2 rubrics
// ---------------------------------------------------------------------------
// A1/A2 use a 0–3 scale (fewer distinctions at beginner levels).
// B1–C2 use a 0–5 scale (finer distinctions for more complex writing).
// ---------------------------------------------------------------------------

const CEFR_RUBRICS: WritingRubric[] = [
  // ---- A1: 0–3 scale ----
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

  // ---- A2: 0–3 scale ----
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

  // ---- B1: 0–5 scale ----
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

  // ---- B2: 0–5 scale ----
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

  // ---- C1: 0–5 scale ----
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

  // ---- C2: 0–5 scale ----
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

// ---------------------------------------------------------------------------
// Exam rubrics — imported from dedicated files and merged below.
// These imports will be uncommented as each task is implemented.
// For now, the RUBRICS array contains only CEFR rubrics.
// ---------------------------------------------------------------------------

// All rubrics registered in the system.
let ALL_RUBRICS: WritingRubric[] = [...CEFR_RUBRICS]
let RUBRIC_MAP = new Map(ALL_RUBRICS.map((r) => [r.id, r]))

/**
 * Register additional rubrics (called by exam rubric modules).
 * This avoids circular imports — exam files call registerRubrics()
 * in their module-level code.
 */
export function registerRubrics(rubrics: WritingRubric[]): void {
  ALL_RUBRICS = [...ALL_RUBRICS, ...rubrics]
  RUBRIC_MAP = new Map(ALL_RUBRICS.map((r) => [r.id, r]))
}

/**
 * Get a rubric by its unique id.
 * Returns null if the id doesn't match any registered rubric.
 */
export function getRubric(id: string): WritingRubric | null {
  return RUBRIC_MAP.get(id) ?? null
}

/**
 * List all registered rubrics.
 */
export function listRubrics(): WritingRubric[] {
  return [...ALL_RUBRICS]
}

/**
 * Compute a weighted-average overall score from per-criterion scores.
 *
 * The result is rounded to the rubric's step size. For CEFR (step=1)
 * this gives whole numbers; for IELTS (step=0.5) this gives half-bands.
 */
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

  // Round to the nearest step. E.g. with step=0.5, a raw 6.3 becomes 6.5.
  const { step } = rubric.scoreRange
  return Math.round(weighted / step) * step
}
