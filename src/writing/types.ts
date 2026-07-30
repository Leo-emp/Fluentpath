/**
 * Writing assessment type definitions.
 *
 * These types form the contract between every module in the writing
 * assessment pipeline: task definitions, rubric engine, scoring prompt,
 * parser, feedback gates, and the score-and-retry loop.
 *
 * The key architectural decision: every piece of feedback MUST carry
 * an EvidenceSpan that quotes the learner's own text. Generic advice
 * ("improve your cohesion") is treated as a product failure — the spec
 * calls it out explicitly in §3.3.
 */

import type { CefrLevel } from '@/skill-graph/types'

// ---------------------------------------------------------------------------
// Writing tasks — what the learner is asked to write
// ---------------------------------------------------------------------------

/**
 * A writing task is a prompt the learner responds to. Each task has a
 * CEFR level, an exam context, word limits, and a pointer to the rubric
 * used for scoring.
 */
export interface WritingTask {
  // Unique identifier, e.g. 'cefr.b1.essay.1' or 'ielts.task2.1'.
  id: string

  // The kind of writing. Determines UI presentation and rubric selection.
  type:
    | 'short_answer'
    | 'paragraph'
    | 'essay'
    | 'letter'
    | 'report'
    | 'review'
    | 'proposal'
    | 'article'
    | 'referral_letter'

  // CEFR level this task is pitched at.
  level: CefrLevel

  // Which exam this belongs to, or 'cefr' for general English practice.
  exam: 'cefr' | 'ielts_task1' | 'ielts_task2' | 'pte_essay' | 'oet_writing'

  // The prompt shown to the learner.
  prompt: string

  // Word count boundaries. Going below minWords is a hard rejection;
  // going above maxWords is a warning (not a rejection — the learner
  // may need to express ideas fully).
  minWords: number
  maxWords: number

  // Time limit in minutes. Null means untimed (general CEFR practice).
  // Exam tasks always have a time limit matching the real exam.
  timeLimitMinutes: number | null

  // Which rubric to score against. Must match a rubric id from the
  // rubrics module.
  rubricId: string
}

// ---------------------------------------------------------------------------
// Learner response — what the learner submits
// ---------------------------------------------------------------------------

export interface WritingResponse {
  taskId: string
  text: string
  submittedAt: number
  // How long the learner took, or null if not tracked.
  timeTakenSeconds: number | null
}

// ---------------------------------------------------------------------------
// Evidence spans — the mechanism that anchors every claim to the text
// ---------------------------------------------------------------------------

/**
 * A location in the learner's text, pointing at a specific span.
 *
 * This is the core quality mechanism: every feedback claim must quote
 * the learner's own words. The parser validates that `quote` is an
 * exact substring of the learner's text — if the LLM fabricates a
 * quote, the entire scoring attempt is rejected and retried.
 */
export interface EvidenceSpan {
  // Character offsets into WritingResponse.text.
  start: number
  end: number

  // The quoted text. Redundant with the offsets, but the model produces
  // it and keeping it means the UI can render a single issue without
  // needing the full response text.
  quote: string

  // What is wrong with this span (or what is good about it).
  issue: string

  // A concrete rewrite, or null when the issue is structural rather
  // than a fixable phrase (e.g. "this paragraph has no topic sentence").
  rewrite: string | null
}

// ---------------------------------------------------------------------------
// Criterion scores — per-criterion results from the rubric
// ---------------------------------------------------------------------------

/**
 * Score on one criterion of a rubric.
 *
 * Each criterion gets its own score, evidence spans, and feedback
 * paragraph. The feedback must be written at the learner's CEFR level
 * — a B1 learner should not see C1 vocabulary in their feedback.
 */
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

// ---------------------------------------------------------------------------
// Grouped issues — repeated errors collapsed into one item
// ---------------------------------------------------------------------------

/**
 * Repeated issues grouped so the learner sees "missing articles (7×)"
 * rather than seven separate corrections.
 *
 * From spec §3: "12 missing articles is one issue, not twelve."
 * From spec §3: "Layer by priority — highest-impact first as 'fix
 * these first'; the remainder expand on demand."
 */
export interface GroupedIssue {
  // Short machine-friendly category like 'missing_article'.
  category: string
  // Human-readable description of the pattern.
  description: string
  // How many times this issue appears in the text.
  count: number
  // Determines display order and presentation:
  //   high   → shown expanded, labelled "fix these first"
  //   medium → shown collapsed, expandable
  //   low    → shown inline in the text, expandable on demand
  priority: 'high' | 'medium' | 'low'
  // Up to 3 representative examples from the learner's text.
  examples: EvidenceSpan[]
}

// ---------------------------------------------------------------------------
// Writing score — the complete result of scoring a piece of writing
// ---------------------------------------------------------------------------

export interface WritingScore {
  taskId: string
  overallScore: number
  maxOverallScore: number
  criterionScores: CriterionScore[]
  groupedIssues: GroupedIssue[]
  wordCount: number
  level: CefrLevel
}

// ---------------------------------------------------------------------------
// Rubric definitions — data structures, not scoring logic
// ---------------------------------------------------------------------------

/**
 * One level of performance on one criterion.
 * E.g. for IELTS: band 7 descriptor on Task Response.
 */
export interface BandDescriptor {
  score: number
  description: string
}

/**
 * One criterion in a rubric.
 * E.g. "Task Achievement" with weight 0.25 and descriptors for each band.
 */
export interface RubricCriterion {
  id: string
  name: string
  // Relative weight for computing the overall score. Weights within a
  // rubric must sum to 1.0.
  weight: number
  descriptors: BandDescriptor[]
}

/**
 * A complete rubric — the data structure the scoring engine uses to
 * assemble the LLM prompt and validate the model's output.
 */
export interface WritingRubric {
  id: string
  name: string
  exam: string
  criteria: RubricCriterion[]
  // The scoring scale. step is 0.5 for IELTS (half-bands), 1 for others.
  scoreRange: { min: number; max: number; step: number }
}

// ---------------------------------------------------------------------------
// Filter for listing tasks
// ---------------------------------------------------------------------------

export interface TaskFilter {
  level?: CefrLevel
  exam?: WritingTask['exam']
  type?: WritingTask['type']
}
