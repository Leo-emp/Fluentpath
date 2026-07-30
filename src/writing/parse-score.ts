/**
 * Score parser — validates structured scoring output from the LLM.
 *
 * The parser enforces several integrity checks:
 *   1. Valid JSON (handles markdown fences)
 *   2. Correct number of criterion scores (must match rubric)
 *   3. Scores within rubric range
 *   4. Evidence quotes are EXACT substrings of the learner's text
 *   5. Grouped issue priorities are valid enum values
 *
 * If ANY check fails, the entire output is rejected (returns null).
 * The score-and-retry loop will request a fresh attempt from the LLM.
 *
 * The quote-substring check is the most important quality gate here.
 * Without it, the LLM could fabricate quotes that look plausible but
 * don't actually exist in the learner's writing — making the feedback
 * misleading and the evidence spans useless for UI highlighting.
 */

import type { CriterionScore, GroupedIssue, EvidenceSpan, WritingRubric } from './types'

export interface ParsedScore {
  criterionScores: CriterionScore[]
  groupedIssues: GroupedIssue[]
}

// The only valid priority values. Anything else is a parse failure.
const VALID_PRIORITIES = new Set(['high', 'medium', 'low'])

/**
 * Parse and validate structured scoring output from the LLM.
 * Returns null when the output is malformed or fails any validation.
 */
export function parseScoringOutput(
  raw: string,
  rubric: WritingRubric,
  learnerText: string,
): ParsedScore | null {
  // Strip markdown fences if present — the prompt says "no fences"
  // but models sometimes wrap anyway.
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const text = fenced ? fenced[1]!.trim() : raw.trim()

  let obj: Record<string, unknown>
  try {
    obj = JSON.parse(text)
  } catch {
    return null
  }

  // criterionScores is mandatory.
  if (!Array.isArray(obj.criterionScores)) return null

  const rawScores = obj.criterionScores as Array<Record<string, unknown>>

  // Must have exactly as many scores as the rubric has criteria.
  // This catches partial outputs or hallucinated extra criteria.
  if (rawScores.length !== rubric.criteria.length) return null

  const criterionScores: CriterionScore[] = []

  for (const raw of rawScores) {
    // Type checks on required fields.
    if (typeof raw.criterionId !== 'string') return null
    if (typeof raw.score !== 'number') return null
    if (typeof raw.feedback !== 'string') return null

    // Score must be within the rubric's valid range.
    if (raw.score < rubric.scoreRange.min || raw.score > rubric.scoreRange.max) {
      return null
    }

    // Parse and validate evidence spans — every quote must be an exact
    // substring of the learner's text.
    const evidence = parseEvidence(raw.evidence, learnerText)
    if (evidence === null) return null

    criterionScores.push({
      criterionId: raw.criterionId as string,
      criterionName:
        typeof raw.criterionName === 'string'
          ? (raw.criterionName as string)
          : (raw.criterionId as string),
      score: raw.score as number,
      maxScore: rubric.scoreRange.max,
      evidence,
      feedback: raw.feedback as string,
    })
  }

  // Grouped issues are optional — a perfect response has none.
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

/**
 * Parse and validate an array of evidence spans.
 * Returns null if any span fails validation (bad types, quote not found).
 * Returns empty array if the field is undefined (evidence is optional
 * in some contexts).
 */
function parseEvidence(
  raw: unknown,
  learnerText: string,
): EvidenceSpan[] | null {
  // undefined means "no evidence provided" — valid but empty.
  if (raw === undefined) return []
  // Non-array means bad structure.
  if (!Array.isArray(raw)) return null

  const spans: EvidenceSpan[] = []
  for (const e of raw) {
    if (typeof e !== 'object' || e === null) return null
    const rec = e as Record<string, unknown>

    if (typeof rec.start !== 'number') return null
    if (typeof rec.end !== 'number') return null
    if (typeof rec.quote !== 'string') return null
    if (typeof rec.issue !== 'string') return null

    // The quote must actually appear in the learner's text.
    // This is the critical quality check — fabricated quotes are
    // the most common LLM failure mode in scoring tasks.
    if (!learnerText.includes(rec.quote as string)) return null

    spans.push({
      start: rec.start as number,
      end: rec.end as number,
      quote: rec.quote as string,
      issue: rec.issue as string,
      rewrite: typeof rec.rewrite === 'string' ? (rec.rewrite as string) : null,
    })
  }

  return spans
}
