/**
 * Diagnosis engine type definitions.
 *
 * The diagnosis pipeline transforms a PerformanceRecord into an
 * actionable report. The chain:
 *
 *   PerformanceRecord → NodeOutcome[] → WeakNode[] → ClassifiedGap[]
 *   → ActionPlan + BandImpact[]
 *
 * Each stage is a pure function. The types defined here flow between
 * stages — each type is the output of one stage and the input of the next.
 *
 * All types are fully serializable (no Sets, Maps, or classes) so the
 * complete Diagnosis can be persisted and displayed without transformation.
 */

import type { SectionSkill } from '@/mock-test/types'
import type { CefrLevel, NodeType, SkillArea } from '@/skill-graph/types'

// ---------------------------------------------------------------------------
// Stage 1 output: Node attribution
// ---------------------------------------------------------------------------

/**
 * One skill-graph node's outcome from one response.
 *
 * A single response can produce multiple NodeOutcomes if the slot's
 * nodeIds list has more than one entry (e.g. a writing task that
 * exercises both coherence and vocabulary nodes).
 */
export interface NodeOutcome {
  // Which skill-graph node this outcome is attributed to.
  nodeId: string
  // Which exam section the response came from.
  sectionId: string
  // Which macro skill (listening/reading/writing/speaking).
  skill: SectionSkill
  // Whether the response was successful for this node.
  correct: boolean
  // The score and max score from the response (null if unscored).
  score: number | null
  maxScore: number | null
  // How long the learner took on this response (ms).
  latencyMs: number
  // Index into PerformanceRecord's flattened response list.
  responseIndex: number
  // The misconception tag from the selected distractor (MCQ only).
  // Null when the learner answered correctly or the item isn't MCQ.
  selectedMisconception?: string | null
}

// ---------------------------------------------------------------------------
// Stage 2 output: Weakness ranking
// ---------------------------------------------------------------------------

/**
 * A skill-graph node identified as weak, with aggregate statistics.
 *
 * WeakNodes are ranked by `rank = impact × confidence`. Impact measures
 * how much this gap hurts the band score; confidence measures how sure
 * we are the gap is real (more attempts = higher confidence).
 */
export interface WeakNode {
  nodeId: string
  nodeTitle: string
  nodeType: NodeType
  level: CefrLevel
  skill: SkillArea
  // Aggregate statistics from all outcomes for this node.
  totalAttempts: number
  totalCorrect: number
  accuracy: number
  meanLatencyMs: number
  // How much fixing this node would improve the score (0..1).
  impact: number
  // How confident we are this is a real gap (0..1).
  confidence: number
  // Composite rank = impact × confidence. Higher = fix first.
  rank: number
}

// ---------------------------------------------------------------------------
// Stage 3 output: Root-cause classification
// ---------------------------------------------------------------------------

/**
 * The four root causes from spec §3.5.
 *
 * These require completely different remedies. Telling a processing-gap
 * learner to study more grammar is why people plateau.
 *
 * - knowledge:   The structure or word isn't known at all.
 * - processing:  Known, but too slow under time pressure.
 * - strategy:    Misread the task or mismanaged time.
 * - production:  Recognises it but can't produce it.
 */
export type RootCause = 'knowledge' | 'processing' | 'strategy' | 'production'

/**
 * A weak node with its root cause identified.
 */
export interface ClassifiedGap {
  nodeId: string
  nodeTitle: string
  nodeType: NodeType
  level: CefrLevel
  skill: SkillArea
  // Which of the four root causes applies.
  rootCause: RootCause
  // Human-readable explanation of why this root cause was assigned.
  evidence: string
  // Key statistics carried from WeakNode for display.
  accuracy: number
  meanLatencyMs: number
  impact: number
  rank: number
}

// ---------------------------------------------------------------------------
// Stage 4 output: Action plan
// ---------------------------------------------------------------------------

/**
 * One step in the remediation sequence.
 */
export interface RemediationStep {
  // Display order (1-based).
  order: number
  nodeId: string
  nodeTitle: string
  // The root cause determines the type of activity.
  rootCause: RootCause
  // What the learner should do (generated from root cause + node type).
  activity: string
  // Estimated time to complete this step.
  estimatedMinutes: number
  // Nodes that must be addressed first (from graph prerequisites).
  prerequisiteNodeIds: string[]
}

/**
 * The complete remediation plan.
 */
export interface ActionPlan {
  steps: RemediationStep[]
  totalEstimatedMinutes: number
  gapCount: number
  // Prerequisite nodes that were never tested — potential hidden
  // foundations that might explain the visible gaps.
  untestedPrerequisites?: string[]
}

// ---------------------------------------------------------------------------
// Stage 5 output: Band impact projection
// ---------------------------------------------------------------------------

/**
 * A projected band score range.
 *
 * Always a range, never a point estimate. "Never promise a score"
 * (spec §4e) — accessiBe was fined $1M by FTC for similar claims.
 */
export interface BandRange {
  low: number
  high: number
}

/**
 * Projected band improvement for one exam section.
 */
export interface BandImpact {
  section: string
  currentBand: number
  projectedRange: BandRange
  // How reliable this projection is. Based on evidence quantity.
  confidence: 'low' | 'moderate' | 'high'
  // How many gaps in this section the plan addresses.
  closedGapCount: number
  totalGapCount: number
}

// ---------------------------------------------------------------------------
// Complete diagnosis output
// ---------------------------------------------------------------------------

/**
 * The full diagnosis report — everything the UI needs to render the
 * diagnosis screen (spec §4d: "the single strongest argument for the
 * subscription").
 */
export interface Diagnosis {
  learnerId: string
  sessionId: string
  examId: string
  createdAt: number
  // Stage outputs, preserved for transparency and debugging.
  outcomes: NodeOutcome[]
  weakNodes: WeakNode[]
  gaps: ClassifiedGap[]
  actionPlan: ActionPlan
  bandImpacts: BandImpact[]
  // Recurring misconception patterns — the learner keeps choosing
  // the same wrong answer type. Empty when no patterns detected.
  confusablePairs: import('./classify').ConfusablePair[]
}

// ---------------------------------------------------------------------------
// Pipeline input — everything the diagnosis needs
// ---------------------------------------------------------------------------

/**
 * All inputs to the diagnosis pipeline, bundled for convenience.
 *
 * The pipeline is a pure function: diagnose(input) → Diagnosis.
 * No database access, no network — everything is passed in.
 */
export interface DiagnosisInput {
  // From the mock test engine (R1e).
  performanceRecord: import('@/mock-test/types').PerformanceRecord
  testResult: import('@/mock-test/types').TestResult
  examDefinition: import('@/mock-test/types').ExamDefinition
  // From the skill graph.
  nodes: import('@/skill-graph/types').SkillNode[]
  edges: import('@/skill-graph/types').SkillEdge[]
  // From the mastery system.
  masteryRecords: import('@/mastery/types').MasteryRecord[]
  // Rubric criterion weights (for band impact projection).
  criterionWeights: Record<string, number>
  // Current timestamp.
  now: number
}
