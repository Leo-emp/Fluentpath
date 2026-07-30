/**
 * Diagnosis pipeline orchestrator — chains all stages into one call.
 *
 * This is the entry point for the diagnosis engine. It takes everything
 * needed to produce a diagnosis (performance record, skill graph, mastery
 * records, rubric weights) and runs the complete pipeline:
 *
 *   1. attributeOutcomes  → map responses to skill graph nodes
 *   2. rankWeakNodes      → aggregate and rank by impact × confidence
 *   3. classifyGaps       → assign root causes
 *   4. buildActionPlan    → ordered remediation respecting prerequisites
 *   5. projectBandImpact  → estimated score improvement as a range
 *
 * The function is pure: same inputs always produce the same diagnosis.
 * No database access, no network, no randomness.
 */

import type { DiagnosisInput, Diagnosis } from './types'
import { attributeOutcomes } from './attribute'
import { rankWeakNodes } from './rank'
import { classifyGaps } from './classify'
import { buildActionPlan } from './plan'
import { projectBandImpact } from './project'

/**
 * Run the complete diagnosis pipeline.
 *
 * @param input  Everything the diagnosis needs — bundled for convenience.
 * @returns A complete Diagnosis object ready for the UI.
 */
export function diagnose(input: DiagnosisInput): Diagnosis {
  // Stage 1: Map every response to skill-graph node outcomes.
  const outcomes = attributeOutcomes(input.performanceRecord)

  // Stage 2: Aggregate outcomes and rank weak nodes.
  const weakNodes = rankWeakNodes(outcomes, input.nodes)

  // Stage 3: Classify root causes for each weak node.
  const gaps = classifyGaps(weakNodes, outcomes)

  // Stage 4: Build the remediation plan respecting prerequisites.
  const actionPlan = buildActionPlan(gaps, input.edges)

  // Stage 5: Project band improvement per section.
  const bandImpacts = projectBandImpact(
    gaps,
    input.testResult,
    input.criterionWeights,
  )

  return {
    learnerId: input.performanceRecord.learnerId,
    sessionId: input.performanceRecord.sessionId,
    examId: input.performanceRecord.examId,
    createdAt: input.now,
    outcomes,
    weakNodes,
    gaps,
    actionPlan,
    bandImpacts,
  }
}
