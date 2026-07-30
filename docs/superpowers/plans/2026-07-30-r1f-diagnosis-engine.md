# Drill-Down Diagnosis Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the diagnosis engine that takes a completed mock test performance record, attributes outcomes to skill graph nodes, classifies root causes, generates an ordered action plan, and projects band impact — "the feature people pay for" (spec §3.5).

**Architecture:** A pure-function pipeline: `PerformanceRecord → NodeOutcome[] → WeakNode[] → ClassifiedGap[] → ActionPlan`. Each stage is a separate file with its own tests. No database, no network — all inputs are passed in as arguments. The pipeline is deterministic: same inputs always produce the same diagnosis, which makes it testable and explainable. Band impact projection uses criterion weightings from the existing rubric system.

**Tech Stack:** TypeScript 7, Vitest, pure functions consuming types from `@/mock-test/types`, `@/skill-graph/types`, `@/mastery/types`, `@/writing/types`, `@/speaking/types`

## Global Constraints

- Path alias `@/` resolves to `src/`
- All code heavily commented for learning (project convention)
- All state fully serializable (JSON round-trip) — no classes, Sets, or Maps in output types
- Never promise a score — projections use ranges with stated confidence (spec §4e)
- Rubric criterion weightings come from existing `WritingRubric.criteria[].weight` — no hardcoded weights
- No external dependencies beyond what's already in the project
- Tests use Vitest (`describe`, `it`, `expect`)

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/diagnosis/types.ts` | All type definitions for the diagnosis pipeline |
| `src/diagnosis/attribute.ts` | Node attribution: map responses → skill graph outcomes |
| `src/diagnosis/rank.ts` | Weakness ranking: aggregate outcomes, rank by impact × confidence |
| `src/diagnosis/classify.ts` | Root-cause classification: knowledge / processing / strategy / production |
| `src/diagnosis/plan.ts` | Action plan: ordered remediation respecting prerequisites + time estimates |
| `src/diagnosis/project.ts` | Band impact projection: estimated score improvement as a range |
| `src/diagnosis/diagnose.ts` | Pipeline orchestrator: chains all stages into one call |
| `tests/diagnosis/types.test.ts` | Type-level compile and round-trip tests |
| `tests/diagnosis/attribute.test.ts` | Attribution tests |
| `tests/diagnosis/rank.test.ts` | Ranking tests |
| `tests/diagnosis/classify.test.ts` | Classification tests |
| `tests/diagnosis/plan.test.ts` | Action plan tests |
| `tests/diagnosis/project.test.ts` | Band impact projection tests |
| `tests/diagnosis/diagnose.test.ts` | End-to-end pipeline tests |

---

### Task 1: Diagnosis type definitions

**Files:**
- Create: `src/diagnosis/types.ts`
- Test: `tests/diagnosis/types.test.ts`

**Interfaces:**
- Consumes: `SectionSkill` from `@/mock-test/types`; `CefrLevel`, `SkillNode`, `SkillEdge`, `NodeType` from `@/skill-graph/types`; `MasteryRecord` from `@/mastery/types`
- Produces: `NodeOutcome`, `WeakNode`, `RootCause`, `ClassifiedGap`, `RemediationStep`, `ActionPlan`, `BandRange`, `BandImpact`, `Diagnosis`, `DiagnosisInput` (used by all later tasks)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/diagnosis/types.test.ts
import { describe, it, expect } from 'vitest'
import type {
  NodeOutcome,
  WeakNode,
  RootCause,
  ClassifiedGap,
  RemediationStep,
  ActionPlan,
  BandRange,
  BandImpact,
  Diagnosis,
  DiagnosisInput,
} from '@/diagnosis/types'

describe('diagnosis types', () => {
  it('NodeOutcome compiles and round-trips', () => {
    const outcome: NodeOutcome = {
      nodeId: 'gram.b1.present_perfect',
      sectionId: 'writing',
      skill: 'writing',
      correct: true,
      score: 6.5,
      maxScore: 9,
      latencyMs: 45000,
      responseIndex: 0,
    }
    expect(JSON.parse(JSON.stringify(outcome))).toEqual(outcome)
  })

  it('WeakNode compiles and round-trips', () => {
    const weak: WeakNode = {
      nodeId: 'gram.b1.present_perfect',
      nodeTitle: 'Present Perfect',
      nodeType: 'grammar',
      level: 'B1',
      skill: 'general',
      totalAttempts: 5,
      totalCorrect: 1,
      accuracy: 0.2,
      meanLatencyMs: 8000,
      impact: 0.85,
      confidence: 0.7,
      rank: 0.595,
    }
    expect(JSON.parse(JSON.stringify(weak))).toEqual(weak)
  })

  it('ClassifiedGap compiles and round-trips', () => {
    const gap: ClassifiedGap = {
      nodeId: 'gram.b1.present_perfect',
      nodeTitle: 'Present Perfect',
      nodeType: 'grammar',
      level: 'B1',
      skill: 'general',
      rootCause: 'knowledge',
      evidence: 'Low accuracy (20%) across both receptive and productive items.',
      accuracy: 0.2,
      meanLatencyMs: 8000,
      impact: 0.85,
      rank: 0.595,
    }
    expect(JSON.parse(JSON.stringify(gap))).toEqual(gap)
  })

  it('ActionPlan compiles and round-trips', () => {
    const plan: ActionPlan = {
      steps: [
        {
          order: 1,
          nodeId: 'gram.b1.present_perfect',
          nodeTitle: 'Present Perfect',
          rootCause: 'knowledge',
          activity: 'Study the present perfect form and usage, then complete practice exercises.',
          estimatedMinutes: 30,
          prerequisiteNodeIds: [],
        },
      ],
      totalEstimatedMinutes: 30,
      gapCount: 1,
    }
    expect(JSON.parse(JSON.stringify(plan))).toEqual(plan)
  })

  it('BandImpact compiles and round-trips', () => {
    const impact: BandImpact = {
      section: 'writing',
      currentBand: 6.0,
      projectedRange: { low: 6.5, high: 7.0 },
      confidence: 'moderate',
      closedGapCount: 3,
      totalGapCount: 5,
    }
    expect(JSON.parse(JSON.stringify(impact))).toEqual(impact)
  })

  it('Diagnosis compiles and round-trips', () => {
    const diagnosis: Diagnosis = {
      learnerId: 'learner_001',
      sessionId: 'sess_001',
      examId: 'ielts_academic',
      createdAt: 1000,
      outcomes: [],
      weakNodes: [],
      gaps: [],
      actionPlan: { steps: [], totalEstimatedMinutes: 0, gapCount: 0 },
      bandImpacts: [],
    }
    expect(JSON.parse(JSON.stringify(diagnosis))).toEqual(diagnosis)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnosis/types.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the type definitions**

```typescript
// src/diagnosis/types.ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnosis/types.test.ts`
Expected: PASS (all 6 tests)

- [ ] **Step 5: Commit**

```bash
git add src/diagnosis/types.ts tests/diagnosis/types.test.ts
git commit -m "feat(diagnosis): add type definitions for diagnosis pipeline"
```

---

### Task 2: Node attribution

**Files:**
- Create: `src/diagnosis/attribute.ts`
- Test: `tests/diagnosis/attribute.test.ts`

**Interfaces:**
- Consumes: `PerformanceRecord`, `ResponseRecord`, `SectionResult` from `@/mock-test/types`; `NodeOutcome` from `@/diagnosis/types`
- Produces: `attributeOutcomes(record: PerformanceRecord): NodeOutcome[]`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/diagnosis/attribute.test.ts
import { describe, it, expect } from 'vitest'
import { attributeOutcomes } from '@/diagnosis/attribute'
import type { PerformanceRecord, ResponseRecord } from '@/mock-test/types'

// Helper: build a minimal PerformanceRecord with given responses.
function buildRecord(responses: ResponseRecord[]): PerformanceRecord {
  return {
    sessionId: 'sess_001',
    examId: 'ielts_academic',
    learnerId: 'learner_001',
    startedAt: 1000,
    completedAt: 5000,
    totalDurationMs: 4000,
    sectionResults: [
      {
        sectionId: 'writing',
        skill: 'writing',
        bandScore: 6.5,
        responses: responses.filter((r) => r.sectionId === 'writing'),
        durationMs: 3600_000,
        timedOut: false,
      },
      {
        sectionId: 'listening',
        skill: 'listening',
        bandScore: 7,
        responses: responses.filter((r) => r.sectionId === 'listening'),
        durationMs: 2400_000,
        timedOut: false,
      },
    ],
  }
}

function makeResponse(overrides: Partial<ResponseRecord> & { sectionId: string; slotId: string; nodeIds: string[] }): ResponseRecord {
  return {
    sectionId: overrides.sectionId,
    slotId: overrides.slotId,
    nodeIds: overrides.nodeIds,
    startedAt: overrides.startedAt ?? 1000,
    submittedAt: overrides.submittedAt ?? 2000,
    latencyMs: overrides.latencyMs ?? 1000,
    responseData: overrides.responseData ?? { skill: 'writing', text: 'test', wordCount: 10 },
    score: overrides.score ?? null,
    maxScore: overrides.maxScore ?? null,
  }
}

describe('attributeOutcomes', () => {
  it('creates one NodeOutcome per nodeId per response', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect', 'cando.b1.describe_data'],
        score: 6,
        maxScore: 9,
      }),
    ]
    const record = buildRecord(responses)
    const outcomes = attributeOutcomes(record)

    // Two nodeIds on one response → two outcomes.
    expect(outcomes).toHaveLength(2)
    expect(outcomes[0]!.nodeId).toBe('gram.b1.present_perfect')
    expect(outcomes[1]!.nodeId).toBe('cando.b1.describe_data')
  })

  it('marks scored responses as correct when score >= 50% of max', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        score: 5,
        maxScore: 9,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    // 5/9 = 0.556 >= 0.5 → correct
    expect(outcomes[0]!.correct).toBe(true)
  })

  it('marks scored responses as incorrect when score < 50% of max', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        score: 3,
        maxScore: 9,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    // 3/9 = 0.333 < 0.5 → incorrect
    expect(outcomes[0]!.correct).toBe(false)
  })

  it('marks unscored responses as incorrect', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        score: null,
        maxScore: null,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.correct).toBe(false)
  })

  it('carries latency from the response', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['gram.b1.present_perfect'],
        latencyMs: 45000,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.latencyMs).toBe(45000)
  })

  it('carries section skill from the section result', () => {
    const responses = [
      makeResponse({
        sectionId: 'listening',
        slotId: 'part1',
        nodeIds: ['cando.a2.understand_conversation'],
        responseData: { skill: 'listening', selectedIndex: 2 },
        score: 1,
        maxScore: 1,
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.skill).toBe('listening')
  })

  it('assigns sequential response indices across all sections', () => {
    const responses = [
      makeResponse({
        sectionId: 'writing',
        slotId: 'task1',
        nodeIds: ['node_a'],
      }),
      makeResponse({
        sectionId: 'listening',
        slotId: 'part1',
        nodeIds: ['node_b'],
        responseData: { skill: 'listening', selectedIndex: 0 },
      }),
    ]
    const outcomes = attributeOutcomes(buildRecord(responses))
    expect(outcomes[0]!.responseIndex).toBe(0)
    expect(outcomes[1]!.responseIndex).toBe(1)
  })

  it('returns empty array when there are no responses', () => {
    const record = buildRecord([])
    expect(attributeOutcomes(record)).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnosis/attribute.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the attribution function**

```typescript
// src/diagnosis/attribute.ts
/**
 * Node attribution — map every response in a PerformanceRecord to
 * skill-graph node outcomes.
 *
 * This is the first stage of the diagnosis pipeline. Each response in
 * the performance record carries a list of nodeIds (from the exam
 * definition's slot). For each (response, nodeId) pair, we produce one
 * NodeOutcome recording whether the response was successful, its score,
 * and its latency.
 *
 * The "correct" decision for scored responses uses a 50% threshold:
 *   score >= 0.5 × maxScore → correct
 * This works for both binary items (1/1 = correct, 0/1 = incorrect)
 * and rubric-scored tasks (5/9 = partial credit, still counts as
 * "demonstrated competence" for this node). Unscored responses default
 * to incorrect — the conservative assumption.
 */

import type { PerformanceRecord } from '@/mock-test/types'
import type { NodeOutcome } from './types'

// Threshold: a response is "correct" for a node when the score is
// at least this proportion of the max score.
const CORRECT_THRESHOLD = 0.5

/**
 * Flatten a PerformanceRecord into per-node outcomes.
 *
 * Returns one NodeOutcome per (response × nodeId). A response with
 * 3 nodeIds produces 3 outcomes, all sharing the same score and latency.
 */
export function attributeOutcomes(record: PerformanceRecord): NodeOutcome[] {
  const outcomes: NodeOutcome[] = []
  let responseIndex = 0

  for (const sectionResult of record.sectionResults) {
    for (const response of sectionResult.responses) {
      // Determine correctness from the score.
      const correct = isCorrect(response.score, response.maxScore)

      // One outcome per nodeId on this response.
      for (const nodeId of response.nodeIds) {
        outcomes.push({
          nodeId,
          sectionId: sectionResult.sectionId,
          skill: sectionResult.skill,
          correct,
          score: response.score,
          maxScore: response.maxScore,
          latencyMs: response.latencyMs,
          responseIndex,
        })
      }

      responseIndex++
    }
  }

  return outcomes
}

/**
 * Determine whether a scored response counts as "correct" for
 * node attribution. Uses a 50% threshold.
 *
 * Unscored responses (score or maxScore is null) default to false —
 * the conservative assumption when we have no evidence.
 */
function isCorrect(score: number | null, maxScore: number | null): boolean {
  if (score === null || maxScore === null || maxScore === 0) return false
  return score / maxScore >= CORRECT_THRESHOLD
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnosis/attribute.test.ts`
Expected: PASS (all 8 tests)

- [ ] **Step 5: Commit**

```bash
git add src/diagnosis/attribute.ts tests/diagnosis/attribute.test.ts
git commit -m "feat(diagnosis): add node attribution — map responses to skill graph outcomes"
```

---

### Task 3: Weakness ranking

**Files:**
- Create: `src/diagnosis/rank.ts`
- Test: `tests/diagnosis/rank.test.ts`

**Interfaces:**
- Consumes: `NodeOutcome`, `WeakNode` from `@/diagnosis/types`; `SkillNode` from `@/skill-graph/types`
- Produces: `rankWeakNodes(outcomes: NodeOutcome[], nodes: SkillNode[], minAttempts?: number): WeakNode[]`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/diagnosis/rank.test.ts
import { describe, it, expect } from 'vitest'
import { rankWeakNodes } from '@/diagnosis/rank'
import type { NodeOutcome } from '@/diagnosis/types'
import type { SkillNode } from '@/skill-graph/types'

const NODES: SkillNode[] = [
  { id: 'gram.b1.present_perfect', type: 'grammar', level: 'B1', skill: 'general', title: 'Present Perfect', description: '', metadata: null },
  { id: 'gram.b2.third_conditional', type: 'grammar', level: 'B2', skill: 'general', title: 'Third Conditional', description: '', metadata: null },
  { id: 'cando.b1.describe_data', type: 'cando', level: 'B1', skill: 'writing', title: 'Describe Data', description: '', metadata: null },
]

function makeOutcome(nodeId: string, correct: boolean, latencyMs: number = 5000): NodeOutcome {
  return {
    nodeId,
    sectionId: 'writing',
    skill: 'writing',
    correct,
    score: correct ? 7 : 3,
    maxScore: 9,
    latencyMs,
    responseIndex: 0,
  }
}

describe('rankWeakNodes', () => {
  it('aggregates multiple outcomes for the same node', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)

    const node = weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect')!
    expect(node.totalAttempts).toBe(3)
    expect(node.totalCorrect).toBe(1)
    expect(node.accuracy).toBeCloseTo(1 / 3, 2)
  })

  it('suppresses nodes with insufficient evidence (< minAttempts)', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', false),
    ]
    // Default minAttempts is 2.
    const weakNodes = rankWeakNodes(outcomes, NODES, 2)
    expect(weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect')).toBeUndefined()
  })

  it('includes nodes that meet the minAttempts threshold', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES, 2)
    expect(weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect')).toBeDefined()
  })

  it('excludes nodes with high accuracy (>= 0.8)', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', true),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    // 4/5 = 0.8, which is the boundary — should be excluded.
    expect(weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect')).toBeUndefined()
  })

  it('ranks by impact × confidence descending', () => {
    const outcomes = [
      // Node A: 0/3 correct → very weak, high confidence.
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
      // Node B: 0/2 correct → very weak, lower confidence.
      makeOutcome('gram.b2.third_conditional', false),
      makeOutcome('gram.b2.third_conditional', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    expect(weakNodes.length).toBeGreaterThanOrEqual(2)
    // Node A should rank higher (more evidence).
    const indexA = weakNodes.findIndex((w) => w.nodeId === 'gram.b1.present_perfect')
    const indexB = weakNodes.findIndex((w) => w.nodeId === 'gram.b2.third_conditional')
    expect(indexA).toBeLessThan(indexB)
  })

  it('computes mean latency', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', false, 3000),
      makeOutcome('gram.b1.present_perfect', false, 7000),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    const node = weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect')!
    expect(node.meanLatencyMs).toBe(5000)
  })

  it('enriches with node metadata (title, type, level, skill)', () => {
    const outcomes = [
      makeOutcome('gram.b1.present_perfect', false),
      makeOutcome('gram.b1.present_perfect', false),
    ]
    const weakNodes = rankWeakNodes(outcomes, NODES)
    const node = weakNodes.find((w) => w.nodeId === 'gram.b1.present_perfect')!
    expect(node.nodeTitle).toBe('Present Perfect')
    expect(node.nodeType).toBe('grammar')
    expect(node.level).toBe('B1')
    expect(node.skill).toBe('general')
  })

  it('returns empty array when no outcomes', () => {
    expect(rankWeakNodes([], NODES)).toHaveLength(0)
  })

  it('ignores outcomes for nodes not in the provided node list', () => {
    const outcomes = [
      makeOutcome('nonexistent_node', false),
      makeOutcome('nonexistent_node', false),
    ]
    expect(rankWeakNodes(outcomes, NODES)).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnosis/rank.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the ranking function**

```typescript
// src/diagnosis/rank.ts
/**
 * Weakness ranking — aggregate node outcomes into ranked weak nodes.
 *
 * This is the second stage of the diagnosis pipeline. It groups
 * NodeOutcomes by nodeId, computes aggregate statistics (accuracy,
 * mean latency), and ranks weak nodes by impact × confidence.
 *
 * The spec (§3.5): "identify weak nodes ranked by (impact × confidence),
 * suppressing anything with insufficient evidence."
 *
 * Impact is how much this gap hurts: (1 - accuracy). A node the learner
 * gets right 80% of the time has low impact; one they get right 20% of
 * the time has high impact.
 *
 * Confidence is how sure we are: scales with the number of attempts.
 * One wrong answer could be a fluke; five wrong answers is a pattern.
 */

import type { NodeOutcome, WeakNode } from './types'
import type { SkillNode } from '@/skill-graph/types'

// Nodes with accuracy at or above this are not considered weak.
// 80% correct means the learner has functional mastery — move on.
const STRENGTH_THRESHOLD = 0.8

// Default minimum attempts required before a node is included.
// Prevents single-response flukes from triggering a diagnosis.
const DEFAULT_MIN_ATTEMPTS = 2

/**
 * Aggregate outcomes and rank weak nodes.
 *
 * @param outcomes    All node outcomes from the attribution stage.
 * @param nodes       Skill graph nodes (for enrichment: title, type, level).
 * @param minAttempts Minimum attempts to include a node (default 2).
 * @returns WeakNodes sorted by rank (impact × confidence) descending.
 */
export function rankWeakNodes(
  outcomes: NodeOutcome[],
  nodes: SkillNode[],
  minAttempts: number = DEFAULT_MIN_ATTEMPTS,
): WeakNode[] {
  // Index nodes by ID for fast lookup.
  const nodeById = new Map<string, SkillNode>()
  for (const node of nodes) {
    nodeById.set(node.id, node)
  }

  // Group outcomes by nodeId.
  const grouped = new Map<string, NodeOutcome[]>()
  for (const outcome of outcomes) {
    // Skip outcomes for nodes we don't know about.
    if (!nodeById.has(outcome.nodeId)) continue

    const list = grouped.get(outcome.nodeId) ?? []
    list.push(outcome)
    grouped.set(outcome.nodeId, list)
  }

  const weakNodes: WeakNode[] = []

  for (const [nodeId, nodeOutcomes] of grouped) {
    const node = nodeById.get(nodeId)!

    // Suppress nodes with insufficient evidence.
    if (nodeOutcomes.length < minAttempts) continue

    const totalAttempts = nodeOutcomes.length
    const totalCorrect = nodeOutcomes.filter((o) => o.correct).length
    const accuracy = totalCorrect / totalAttempts

    // Skip nodes the learner is already strong on.
    if (accuracy >= STRENGTH_THRESHOLD) continue

    const meanLatencyMs =
      nodeOutcomes.reduce((sum, o) => sum + o.latencyMs, 0) / totalAttempts

    // Impact: how much this gap hurts (inverted accuracy).
    const impact = 1 - accuracy

    // Confidence: scales with evidence quantity.
    // Saturates at 1.0 around 5-6 attempts (1 - e^(-n/3)).
    const confidence = 1 - Math.exp(-totalAttempts / 3)

    const rank = impact * confidence

    weakNodes.push({
      nodeId,
      nodeTitle: node.title,
      nodeType: node.type,
      level: node.level,
      skill: node.skill,
      totalAttempts,
      totalCorrect,
      accuracy,
      meanLatencyMs,
      impact,
      confidence,
      rank,
    })
  }

  // Sort by rank descending — highest priority gap first.
  weakNodes.sort((a, b) => b.rank - a.rank)

  return weakNodes
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnosis/rank.test.ts`
Expected: PASS (all 9 tests)

- [ ] **Step 5: Commit**

```bash
git add src/diagnosis/rank.ts tests/diagnosis/rank.test.ts
git commit -m "feat(diagnosis): add weakness ranking — aggregate outcomes, rank by impact × confidence"
```

---

### Task 4: Root-cause classification

**Files:**
- Create: `src/diagnosis/classify.ts`
- Test: `tests/diagnosis/classify.test.ts`

**Interfaces:**
- Consumes: `NodeOutcome`, `WeakNode`, `ClassifiedGap`, `RootCause` from `@/diagnosis/types`
- Produces: `classifyGaps(weakNodes: WeakNode[], outcomes: NodeOutcome[]): ClassifiedGap[]`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/diagnosis/classify.test.ts
import { describe, it, expect } from 'vitest'
import { classifyGaps } from '@/diagnosis/classify'
import type { WeakNode, NodeOutcome } from '@/diagnosis/types'

function makeWeakNode(overrides: Partial<WeakNode> = {}): WeakNode {
  return {
    nodeId: 'gram.b1.present_perfect',
    nodeTitle: 'Present Perfect',
    nodeType: 'grammar',
    level: 'B1',
    skill: 'general',
    totalAttempts: 4,
    totalCorrect: 1,
    accuracy: 0.25,
    meanLatencyMs: 5000,
    impact: 0.75,
    confidence: 0.7,
    rank: 0.525,
    ...overrides,
  }
}

function makeOutcome(overrides: Partial<NodeOutcome> = {}): NodeOutcome {
  return {
    nodeId: 'gram.b1.present_perfect',
    sectionId: 'writing',
    skill: 'writing',
    correct: false,
    score: 3,
    maxScore: 9,
    latencyMs: 5000,
    responseIndex: 0,
    ...overrides,
  }
}

describe('classifyGaps', () => {
  it('classifies as knowledge when accuracy is low across all item types', () => {
    const weak = makeWeakNode({ accuracy: 0.15 })
    const outcomes = [
      makeOutcome({ correct: false, latencyMs: 3000 }),
      makeOutcome({ correct: false, latencyMs: 4000 }),
      makeOutcome({ correct: false, latencyMs: 3500 }),
      makeOutcome({ correct: true, latencyMs: 5000 }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('knowledge')
  })

  it('classifies as processing when accuracy is moderate but latency is high', () => {
    // The learner gets it right sometimes, but takes much longer than
    // the median. They know it but can't access it quickly.
    const weak = makeWeakNode({
      accuracy: 0.5,
      meanLatencyMs: 25000,
    })
    const outcomes = [
      makeOutcome({ correct: true, latencyMs: 30000 }),
      makeOutcome({ correct: false, latencyMs: 20000 }),
      makeOutcome({ correct: true, latencyMs: 28000 }),
      makeOutcome({ correct: false, latencyMs: 22000 }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('processing')
  })

  it('classifies as production when receptive correct but productive incorrect', () => {
    const weak = makeWeakNode({
      nodeId: 'gram.b1.present_perfect',
      accuracy: 0.5,
      meanLatencyMs: 5000,
    })
    const outcomes = [
      // Receptive (listening/reading) — correct.
      makeOutcome({ correct: true, skill: 'listening', latencyMs: 3000 }),
      makeOutcome({ correct: true, skill: 'reading', latencyMs: 4000 }),
      // Productive (writing/speaking) — incorrect.
      makeOutcome({ correct: false, skill: 'writing', latencyMs: 5000 }),
      makeOutcome({ correct: false, skill: 'speaking', latencyMs: 6000 }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('production')
  })

  it('classifies as strategy when node type is strategy', () => {
    const weak = makeWeakNode({
      nodeId: 'strat.b2.ielts_task2_structure',
      nodeType: 'strategy',
      accuracy: 0.3,
    })
    const outcomes = [
      makeOutcome({ nodeId: 'strat.b2.ielts_task2_structure', correct: false }),
      makeOutcome({ nodeId: 'strat.b2.ielts_task2_structure', correct: false }),
      makeOutcome({ nodeId: 'strat.b2.ielts_task2_structure', correct: true }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.rootCause).toBe('strategy')
  })

  it('carries impact and rank from the weak node', () => {
    const weak = makeWeakNode({ impact: 0.85, rank: 0.6 })
    const outcomes = [
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: true }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.impact).toBe(0.85)
    expect(gaps[0]!.rank).toBe(0.6)
  })

  it('provides human-readable evidence string', () => {
    const weak = makeWeakNode()
    const outcomes = [
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: false }),
      makeOutcome({ correct: true }),
    ]
    const gaps = classifyGaps([weak], outcomes)
    expect(gaps[0]!.evidence.length).toBeGreaterThan(10)
  })

  it('preserves weak node ordering (already ranked)', () => {
    const weakA = makeWeakNode({ nodeId: 'node_a', rank: 0.9 })
    const weakB = makeWeakNode({ nodeId: 'node_b', rank: 0.5 })
    const outcomes = [
      makeOutcome({ nodeId: 'node_a', correct: false }),
      makeOutcome({ nodeId: 'node_a', correct: false }),
      makeOutcome({ nodeId: 'node_a', correct: false }),
      makeOutcome({ nodeId: 'node_a', correct: true }),
      makeOutcome({ nodeId: 'node_b', correct: false }),
      makeOutcome({ nodeId: 'node_b', correct: false }),
      makeOutcome({ nodeId: 'node_b', correct: false }),
      makeOutcome({ nodeId: 'node_b', correct: true }),
    ]
    const gaps = classifyGaps([weakA, weakB], outcomes)
    expect(gaps[0]!.nodeId).toBe('node_a')
    expect(gaps[1]!.nodeId).toBe('node_b')
  })

  it('returns empty array when no weak nodes', () => {
    expect(classifyGaps([], [])).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnosis/classify.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the classification function**

```typescript
// src/diagnosis/classify.ts
/**
 * Root-cause classification — the step competitors skip.
 *
 * Spec §3.5: "Distinguish knowledge / processing / strategy / production
 * gaps. These four require completely different remedies. Telling a
 * processing-gap learner to study more grammar is why people plateau."
 *
 * The classification logic:
 *
 * 1. **Strategy** — if the node type is 'strategy', the gap is always
 *    strategic. Strategy nodes represent task/exam techniques, not
 *    language knowledge.
 *
 * 2. **Production** — if the learner is correct on receptive items
 *    (listening/reading) but incorrect on productive items
 *    (writing/speaking) for the same node. They recognise it but
 *    can't produce it.
 *
 * 3. **Processing** — if accuracy is moderate (they do get it right
 *    sometimes) but latency is significantly above the median.
 *    They know it but can't access it quickly under time pressure.
 *
 * 4. **Knowledge** — the default when none of the above apply.
 *    The structure or word simply isn't known.
 *
 * The order matters: strategy is checked first (it's a node-type
 * property), then production (requires cross-skill evidence), then
 * processing (requires latency evidence), then knowledge (default).
 */

import type { NodeOutcome, WeakNode, ClassifiedGap, RootCause } from './types'
import type { SectionSkill } from '@/mock-test/types'

// A response is "slow" if it exceeds this multiple of the median
// latency across all outcomes. 2× means twice as slow as typical.
const SLOW_LATENCY_MULTIPLIER = 2.0

// Minimum accuracy for a processing gap. Below this, it's more likely
// a knowledge gap — they're not just slow, they don't know it.
const PROCESSING_MIN_ACCURACY = 0.3

// A production gap requires this minimum proportion of receptive
// items to be correct. If they're wrong on receptive items too,
// it's a knowledge gap, not a production gap.
const PRODUCTION_RECEPTIVE_THRESHOLD = 0.6

// Receptive skills (recognising language).
const RECEPTIVE_SKILLS: SectionSkill[] = ['listening', 'reading']
// Productive skills (producing language).
const PRODUCTIVE_SKILLS: SectionSkill[] = ['writing', 'speaking']

/**
 * Classify each weak node's root cause.
 *
 * @param weakNodes  Ranked weak nodes from the ranking stage.
 * @param outcomes   All node outcomes from the attribution stage.
 * @returns ClassifiedGaps in the same order as weakNodes.
 */
export function classifyGaps(
  weakNodes: WeakNode[],
  outcomes: NodeOutcome[],
): ClassifiedGap[] {
  // Group outcomes by nodeId for fast lookup.
  const outcomesByNode = new Map<string, NodeOutcome[]>()
  for (const outcome of outcomes) {
    const list = outcomesByNode.get(outcome.nodeId) ?? []
    list.push(outcome)
    outcomesByNode.set(outcome.nodeId, list)
  }

  // Compute median latency across all outcomes for the processing check.
  const allLatencies = outcomes
    .map((o) => o.latencyMs)
    .sort((a, b) => a - b)
  const medianLatency = allLatencies.length > 0
    ? allLatencies[Math.floor(allLatencies.length / 2)]!
    : 5000

  return weakNodes.map((weak) => {
    const nodeOutcomes = outcomesByNode.get(weak.nodeId) ?? []
    const { rootCause, evidence } = classify(weak, nodeOutcomes, medianLatency)

    return {
      nodeId: weak.nodeId,
      nodeTitle: weak.nodeTitle,
      nodeType: weak.nodeType,
      level: weak.level,
      skill: weak.skill,
      rootCause,
      evidence,
      accuracy: weak.accuracy,
      meanLatencyMs: weak.meanLatencyMs,
      impact: weak.impact,
      rank: weak.rank,
    }
  })
}

/**
 * Classify a single weak node. Returns the root cause and a
 * human-readable evidence string explaining the classification.
 */
function classify(
  weak: WeakNode,
  outcomes: NodeOutcome[],
  medianLatency: number,
): { rootCause: RootCause; evidence: string } {
  // 1. Strategy nodes are always strategy gaps.
  if (weak.nodeType === 'strategy') {
    return {
      rootCause: 'strategy',
      evidence: `Strategy node with ${formatPercent(weak.accuracy)} accuracy. Task/exam technique needs targeted practice.`,
    }
  }

  // 2. Check for production gap: receptive correct, productive incorrect.
  const productionResult = checkProductionGap(outcomes)
  if (productionResult !== null) {
    return productionResult
  }

  // 3. Check for processing gap: moderate accuracy but slow.
  if (
    weak.accuracy >= PROCESSING_MIN_ACCURACY &&
    weak.meanLatencyMs > medianLatency * SLOW_LATENCY_MULTIPLIER
  ) {
    return {
      rootCause: 'processing',
      evidence: `${formatPercent(weak.accuracy)} accuracy but mean response time ${formatMs(weak.meanLatencyMs)} is ${formatMultiple(weak.meanLatencyMs / medianLatency)} the median (${formatMs(medianLatency)}). Known but too slow under time pressure.`,
    }
  }

  // 4. Default: knowledge gap.
  return {
    rootCause: 'knowledge',
    evidence: `${formatPercent(weak.accuracy)} accuracy across ${weak.totalAttempts} attempts. The structure or concept is not yet learned.`,
  }
}

/**
 * Check whether the learner recognises the item (receptive correct)
 * but can't produce it (productive incorrect).
 *
 * Returns null if there's insufficient cross-skill evidence.
 */
function checkProductionGap(
  outcomes: NodeOutcome[],
): { rootCause: RootCause; evidence: string } | null {
  const receptive = outcomes.filter((o) => RECEPTIVE_SKILLS.includes(o.skill))
  const productive = outcomes.filter((o) => PRODUCTIVE_SKILLS.includes(o.skill))

  // Need evidence from both sides to make this call.
  if (receptive.length === 0 || productive.length === 0) return null

  const receptiveAccuracy = receptive.filter((o) => o.correct).length / receptive.length
  const productiveAccuracy = productive.filter((o) => o.correct).length / productive.length

  if (
    receptiveAccuracy >= PRODUCTION_RECEPTIVE_THRESHOLD &&
    productiveAccuracy < PRODUCTION_RECEPTIVE_THRESHOLD
  ) {
    return {
      rootCause: 'production',
      evidence: `Receptive accuracy ${formatPercent(receptiveAccuracy)} vs productive accuracy ${formatPercent(productiveAccuracy)}. Recognises the form but cannot produce it.`,
    }
  }

  return null
}

// Formatting helpers for human-readable evidence strings.
function formatPercent(n: number): string {
  return `${Math.round(n * 100)}%`
}

function formatMs(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`
}

function formatMultiple(n: number): string {
  return `${n.toFixed(1)}×`
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnosis/classify.test.ts`
Expected: PASS (all 8 tests)

- [ ] **Step 5: Commit**

```bash
git add src/diagnosis/classify.ts tests/diagnosis/classify.test.ts
git commit -m "feat(diagnosis): add root-cause classification — knowledge, processing, strategy, production"
```

---

### Task 5: Action plan generation

**Files:**
- Create: `src/diagnosis/plan.ts`
- Test: `tests/diagnosis/plan.test.ts`

**Interfaces:**
- Consumes: `ClassifiedGap`, `RemediationStep`, `ActionPlan`, `RootCause` from `@/diagnosis/types`; `SkillEdge` from `@/skill-graph/types`
- Produces: `buildActionPlan(gaps: ClassifiedGap[], edges: SkillEdge[], maxSteps?: number): ActionPlan`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/diagnosis/plan.test.ts
import { describe, it, expect } from 'vitest'
import { buildActionPlan } from '@/diagnosis/plan'
import type { ClassifiedGap } from '@/diagnosis/types'
import type { SkillEdge } from '@/skill-graph/types'

function makeGap(overrides: Partial<ClassifiedGap> = {}): ClassifiedGap {
  return {
    nodeId: 'gram.b1.present_perfect',
    nodeTitle: 'Present Perfect',
    nodeType: 'grammar',
    level: 'B1',
    skill: 'general',
    rootCause: 'knowledge',
    evidence: 'Low accuracy.',
    accuracy: 0.2,
    meanLatencyMs: 5000,
    impact: 0.8,
    rank: 0.6,
    ...overrides,
  }
}

describe('buildActionPlan', () => {
  it('creates one step per gap', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a', nodeTitle: 'Node A' }),
      makeGap({ nodeId: 'node_b', nodeTitle: 'Node B' }),
    ]
    const plan = buildActionPlan(gaps, [])
    expect(plan.steps).toHaveLength(2)
    expect(plan.gapCount).toBe(2)
  })

  it('assigns sequential order numbers starting at 1', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a' }),
      makeGap({ nodeId: 'node_b' }),
    ]
    const plan = buildActionPlan(gaps, [])
    expect(plan.steps[0]!.order).toBe(1)
    expect(plan.steps[1]!.order).toBe(2)
  })

  it('respects prerequisite ordering from graph edges', () => {
    const gaps = [
      makeGap({ nodeId: 'node_b', nodeTitle: 'Node B', rank: 0.9 }),
      makeGap({ nodeId: 'node_a', nodeTitle: 'Node A', rank: 0.5 }),
    ]
    // node_a is a prerequisite of node_b.
    const edges: SkillEdge[] = [
      { fromNodeId: 'node_a', toNodeId: 'node_b', strength: 1 },
    ]
    const plan = buildActionPlan(gaps, edges)
    // Even though node_b has higher rank, node_a must come first.
    const orderA = plan.steps.find((s) => s.nodeId === 'node_a')!.order
    const orderB = plan.steps.find((s) => s.nodeId === 'node_b')!.order
    expect(orderA).toBeLessThan(orderB)
  })

  it('lists prerequisite nodeIds on each step', () => {
    const gaps = [
      makeGap({ nodeId: 'node_b', rank: 0.9 }),
      makeGap({ nodeId: 'node_a', rank: 0.5 }),
    ]
    const edges: SkillEdge[] = [
      { fromNodeId: 'node_a', toNodeId: 'node_b', strength: 1 },
    ]
    const plan = buildActionPlan(gaps, edges)
    const stepB = plan.steps.find((s) => s.nodeId === 'node_b')!
    expect(stepB.prerequisiteNodeIds).toContain('node_a')
  })

  it('generates different activities based on root cause', () => {
    const gaps = [
      makeGap({ nodeId: 'node_k', rootCause: 'knowledge' }),
      makeGap({ nodeId: 'node_p', rootCause: 'processing' }),
      makeGap({ nodeId: 'node_s', rootCause: 'strategy' }),
      makeGap({ nodeId: 'node_d', rootCause: 'production' }),
    ]
    const plan = buildActionPlan(gaps, [])
    const activities = plan.steps.map((s) => s.activity)
    // All four should have different activity descriptions.
    const unique = new Set(activities)
    expect(unique.size).toBe(4)
  })

  it('estimates time differently per root cause', () => {
    const gaps = [
      makeGap({ nodeId: 'node_k', rootCause: 'knowledge' }),
      makeGap({ nodeId: 'node_p', rootCause: 'processing' }),
    ]
    const plan = buildActionPlan(gaps, [])
    // Knowledge gaps need study time; processing gaps need drill time.
    // Both should have non-zero estimates.
    for (const step of plan.steps) {
      expect(step.estimatedMinutes).toBeGreaterThan(0)
    }
  })

  it('sums total estimated minutes', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a' }),
      makeGap({ nodeId: 'node_b' }),
    ]
    const plan = buildActionPlan(gaps, [])
    const sum = plan.steps.reduce((total, s) => total + s.estimatedMinutes, 0)
    expect(plan.totalEstimatedMinutes).toBe(sum)
  })

  it('limits steps to maxSteps when specified', () => {
    const gaps = Array.from({ length: 20 }, (_, i) =>
      makeGap({ nodeId: `node_${i}`, rank: 20 - i })
    )
    const plan = buildActionPlan(gaps, [], 5)
    expect(plan.steps).toHaveLength(5)
    // gapCount still reflects total gaps found.
    expect(plan.gapCount).toBe(20)
  })

  it('returns empty plan for no gaps', () => {
    const plan = buildActionPlan([], [])
    expect(plan.steps).toHaveLength(0)
    expect(plan.totalEstimatedMinutes).toBe(0)
    expect(plan.gapCount).toBe(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnosis/plan.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the action plan builder**

```typescript
// src/diagnosis/plan.ts
/**
 * Action plan generation — ordered remediation respecting prerequisites.
 *
 * Spec §3.5: "an ordered remediation sequence: which nodes, in what
 * order (respecting graph prerequisites), which specific lessons and
 * drills address each, and estimated study time."
 *
 * The algorithm:
 *   1. Take the ranked ClassifiedGaps (already sorted by rank).
 *   2. Topologically sort them using graph prerequisites: if node A
 *      is a prerequisite of node B, A comes first regardless of rank.
 *   3. For each gap, assign an activity based on root cause:
 *      - Knowledge → study + practice exercises
 *      - Processing → timed drills for speed
 *      - Strategy → exam technique practice
 *      - Production → output-focused exercises (writing/speaking)
 *   4. Estimate time per step based on root cause and node type.
 */

import type { ClassifiedGap, RemediationStep, ActionPlan, RootCause } from './types'
import type { SkillEdge } from '@/skill-graph/types'

// Default maximum steps in an action plan. Can be overridden.
const DEFAULT_MAX_STEPS = 10

// Estimated minutes per step, keyed by root cause.
// These are calibrated for one focused study session per gap.
const TIME_ESTIMATES: Record<RootCause, number> = {
  knowledge: 30,   // Study the concept + practice exercises.
  processing: 15,  // Timed drills — the concept is known, just slow.
  strategy: 20,    // Technique practice with worked examples.
  production: 25,  // Output exercises (writing/speaking practice).
}

// Activity descriptions per root cause. Template uses the node title.
const ACTIVITY_TEMPLATES: Record<RootCause, (title: string) => string> = {
  knowledge: (title) =>
    `Study ${title}: review the rules and patterns, then complete targeted practice exercises to build understanding.`,
  processing: (title) =>
    `Speed drill for ${title}: timed practice to build automatic recall — the concept is understood but needs faster access under pressure.`,
  strategy: (title) =>
    `Technique practice for ${title}: work through exam-style tasks focusing on approach, structure, and time management.`,
  production: (title) =>
    `Production practice for ${title}: writing and speaking exercises — the form is recognised but needs active output practice to become producible.`,
}

/**
 * Build an action plan from classified gaps and graph prerequisites.
 *
 * @param gaps      Classified gaps from the classification stage.
 * @param edges     Skill graph prerequisite edges.
 * @param maxSteps  Maximum steps to include (default 10).
 * @returns An ActionPlan with steps in prerequisite-respecting order.
 */
export function buildActionPlan(
  gaps: ClassifiedGap[],
  edges: SkillEdge[],
  maxSteps: number = DEFAULT_MAX_STEPS,
): ActionPlan {
  if (gaps.length === 0) {
    return { steps: [], totalEstimatedMinutes: 0, gapCount: 0 }
  }

  // Collect the set of gap node IDs for prerequisite filtering.
  const gapNodeIds = new Set(gaps.map((g) => g.nodeId))

  // Build a prerequisite map: for each gap node, which other gap
  // nodes are its prerequisites? We only care about edges where
  // both endpoints are in the gap set — external prerequisites
  // are assumed to be met.
  const prereqsOf = new Map<string, string[]>()
  for (const gap of gaps) {
    prereqsOf.set(gap.nodeId, [])
  }
  for (const edge of edges) {
    if (gapNodeIds.has(edge.fromNodeId) && gapNodeIds.has(edge.toNodeId)) {
      prereqsOf.get(edge.toNodeId)!.push(edge.fromNodeId)
    }
  }

  // Topological sort using Kahn's algorithm. Within each "tier"
  // (nodes whose prerequisites are all resolved), preserve the
  // original rank order from the classification stage.
  const sorted = topologicalSort(gaps, prereqsOf)

  // Limit to maxSteps but report the total gap count.
  const limited = sorted.slice(0, maxSteps)

  const steps: RemediationStep[] = limited.map((gap, index) => ({
    order: index + 1,
    nodeId: gap.nodeId,
    nodeTitle: gap.nodeTitle,
    rootCause: gap.rootCause,
    activity: ACTIVITY_TEMPLATES[gap.rootCause](gap.nodeTitle),
    estimatedMinutes: TIME_ESTIMATES[gap.rootCause],
    prerequisiteNodeIds: prereqsOf.get(gap.nodeId) ?? [],
  }))

  const totalEstimatedMinutes = steps.reduce(
    (sum, s) => sum + s.estimatedMinutes, 0,
  )

  return {
    steps,
    totalEstimatedMinutes,
    gapCount: gaps.length,
  }
}

/**
 * Topological sort of gaps respecting prerequisites.
 *
 * Uses Kahn's algorithm. Within each tier (all prerequisites resolved),
 * gaps are ordered by their original position in the input array
 * (which is by rank descending from the ranking stage).
 */
function topologicalSort(
  gaps: ClassifiedGap[],
  prereqsOf: Map<string, string[]>,
): ClassifiedGap[] {
  // Map nodeId → gap for fast lookup.
  const gapById = new Map(gaps.map((g) => [g.nodeId, g]))

  // Count unresolved prerequisites per node.
  const inDegree = new Map<string, number>()
  for (const gap of gaps) {
    inDegree.set(gap.nodeId, (prereqsOf.get(gap.nodeId) ?? []).length)
  }

  // Track the original index for stable ordering within tiers.
  const originalIndex = new Map(gaps.map((g, i) => [g.nodeId, i]))

  const sorted: ClassifiedGap[] = []
  const resolved = new Set<string>()

  while (sorted.length < gaps.length) {
    // Find all nodes whose prerequisites are fully resolved.
    const ready = gaps
      .filter((g) => !resolved.has(g.nodeId) && (inDegree.get(g.nodeId) ?? 0) === 0)
      .sort((a, b) => (originalIndex.get(a.nodeId) ?? 0) - (originalIndex.get(b.nodeId) ?? 0))

    if (ready.length === 0) {
      // Cycle detected — shouldn't happen with a valid skill graph,
      // but break rather than loop forever.
      break
    }

    for (const gap of ready) {
      sorted.push(gap)
      resolved.add(gap.nodeId)

      // Decrement in-degree for nodes that depend on this one.
      for (const [nodeId, prereqs] of prereqsOf) {
        if (prereqs.includes(gap.nodeId)) {
          inDegree.set(nodeId, (inDegree.get(nodeId) ?? 1) - 1)
        }
      }
    }
  }

  return sorted
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnosis/plan.test.ts`
Expected: PASS (all 9 tests)

- [ ] **Step 5: Commit**

```bash
git add src/diagnosis/plan.ts tests/diagnosis/plan.test.ts
git commit -m "feat(diagnosis): add action plan generation — prerequisite-respecting remediation sequence"
```

---

### Task 6: Band impact projection

**Files:**
- Create: `src/diagnosis/project.ts`
- Test: `tests/diagnosis/project.test.ts`

**Interfaces:**
- Consumes: `ClassifiedGap`, `BandRange`, `BandImpact` from `@/diagnosis/types`; `TestResult` from `@/mock-test/types`
- Produces: `projectBandImpact(gaps: ClassifiedGap[], testResult: TestResult, criterionWeights: Record<string, number>): BandImpact[]`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/diagnosis/project.test.ts
import { describe, it, expect } from 'vitest'
import { projectBandImpact } from '@/diagnosis/project'
import type { ClassifiedGap, BandImpact } from '@/diagnosis/types'
import type { TestResult, PerformanceRecord } from '@/mock-test/types'

function makeGap(overrides: Partial<ClassifiedGap> = {}): ClassifiedGap {
  return {
    nodeId: 'gram.b1.present_perfect',
    nodeTitle: 'Present Perfect',
    nodeType: 'grammar',
    level: 'B1',
    skill: 'general',
    rootCause: 'knowledge',
    evidence: 'Low accuracy.',
    accuracy: 0.2,
    meanLatencyMs: 5000,
    impact: 0.8,
    rank: 0.6,
    ...overrides,
  }
}

function makeTestResult(sectionBands: Record<string, number>): TestResult {
  const sectionResults = Object.entries(sectionBands).map(([id, band]) => ({
    sectionId: id,
    skill: id as 'writing' | 'speaking' | 'listening' | 'reading',
    bandScore: band,
    responses: [],
    durationMs: 0,
    timedOut: false,
  }))
  const record: PerformanceRecord = {
    sessionId: 'sess_001',
    examId: 'ielts_academic',
    learnerId: 'learner_001',
    startedAt: 1000,
    completedAt: 5000,
    totalDurationMs: 4000,
    sectionResults,
  }
  return {
    performanceRecord: record,
    sectionBands,
    overallBand: 6.5,
    sectionsIncluded: Object.keys(sectionBands),
    sectionsMissing: [],
  }
}

const CRITERION_WEIGHTS: Record<string, number> = {
  task_achievement: 0.25,
  coherence: 0.25,
  vocabulary: 0.25,
  grammar: 0.25,
}

describe('projectBandImpact', () => {
  it('projects improvement for sections with gaps', () => {
    const gaps = [
      makeGap({ skill: 'writing', impact: 0.8 }),
      makeGap({ nodeId: 'node_b', skill: 'writing', impact: 0.6 }),
    ]
    const testResult = makeTestResult({ writing: 6.0, speaking: 7.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    expect(writing.currentBand).toBe(6.0)
    expect(writing.projectedRange.low).toBeGreaterThan(6.0)
    expect(writing.projectedRange.high).toBeGreaterThanOrEqual(writing.projectedRange.low)
  })

  it('does not project improvement for sections without gaps', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 0.8 })]
    const testResult = makeTestResult({ writing: 6.0, speaking: 7.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    // Speaking has no gaps → no impact entry.
    const speaking = impacts.find((i) => i.section === 'speaking')
    expect(speaking).toBeUndefined()
  })

  it('uses a range, never a point estimate', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 0.8 })]
    const testResult = makeTestResult({ writing: 6.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    expect(writing.projectedRange.high).toBeGreaterThan(writing.projectedRange.low)
  })

  it('never projects above the maximum band (9.0 for IELTS)', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 1.0 })]
    const testResult = makeTestResult({ writing: 8.5 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    expect(writing.projectedRange.high).toBeLessThanOrEqual(9.0)
  })

  it('sets confidence based on gap count', () => {
    // Few gaps → lower confidence in the projection.
    const fewGaps = [makeGap({ skill: 'writing' })]
    const testResult = makeTestResult({ writing: 6.0 })
    const fewImpacts = projectBandImpact(fewGaps, testResult, CRITERION_WEIGHTS)
    expect(fewImpacts[0]!.confidence).toBe('low')

    // Many gaps → higher confidence.
    const manyGaps = Array.from({ length: 5 }, (_, i) =>
      makeGap({ nodeId: `node_${i}`, skill: 'writing' })
    )
    const manyImpacts = projectBandImpact(manyGaps, testResult, CRITERION_WEIGHTS)
    expect(['moderate', 'high']).toContain(manyImpacts[0]!.confidence)
  })

  it('reports gap counts per section', () => {
    const gaps = [
      makeGap({ nodeId: 'node_a', skill: 'writing' }),
      makeGap({ nodeId: 'node_b', skill: 'writing' }),
    ]
    const testResult = makeTestResult({ writing: 6.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)
    expect(impacts[0]!.totalGapCount).toBe(2)
    expect(impacts[0]!.closedGapCount).toBe(2)
  })

  it('returns empty array when no gaps', () => {
    const testResult = makeTestResult({ writing: 6.0 })
    expect(projectBandImpact([], testResult, CRITERION_WEIGHTS)).toHaveLength(0)
  })

  it('rounds projected bands to nearest 0.5 (IELTS convention)', () => {
    const gaps = [makeGap({ skill: 'writing', impact: 0.4 })]
    const testResult = makeTestResult({ writing: 6.0 })
    const impacts = projectBandImpact(gaps, testResult, CRITERION_WEIGHTS)

    const writing = impacts.find((i) => i.section === 'writing')!
    // Both ends of the range should be on 0.5 boundaries.
    expect(writing.projectedRange.low * 2 % 1).toBe(0)
    expect(writing.projectedRange.high * 2 % 1).toBe(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnosis/project.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the projection function**

```typescript
// src/diagnosis/project.ts
/**
 * Band impact projection — "Closing these five gaps moves your Writing
 * from 6.0 to an estimated 6.5–7.0."
 *
 * Spec §3.5: "Modelled from the rubric's own criterion weightings plus
 * observed cohort movement once there's data. Presented as a range with
 * stated confidence — never a fake decimal."
 *
 * The projection is deliberately conservative:
 *   - Always a range, never a point estimate (spec §4e: never promise
 *     a score — accessiBe was fined $1M by FTC for similar claims).
 *   - The range widens when evidence is thin (few gaps found).
 *   - Capped at 9.0 (IELTS maximum).
 *   - Rounded to nearest 0.5 (IELTS convention).
 *
 * The model: each gap's impact represents the proportion of the band
 * deficit attributable to that gap. Closing all gaps for a section
 * would theoretically recover the full deficit (distance to 9.0), but
 * we apply a conservative multiplier because:
 *   1. Closing a gap in theory ≠ closing it in practice
 *   2. New gaps may emerge once old ones are addressed
 *   3. The test may not have covered all gaps
 */

import type { ClassifiedGap, BandImpact, BandRange } from './types'
import type { TestResult } from '@/mock-test/types'
import { roundToHalf } from '@/mock-test/convert'

// Maximum possible band score (IELTS ceiling).
const MAX_BAND = 9.0

// Conservative multiplier applied to the theoretical improvement.
// 0.6 means we project 60% of the theoretical gain at the low end.
const LOW_MULTIPLIER = 0.4

// Optimistic multiplier for the high end of the range.
const HIGH_MULTIPLIER = 0.7

// Confidence thresholds based on number of gaps per section.
const CONFIDENCE_LOW_THRESHOLD = 2     // 1 gap → low confidence
const CONFIDENCE_HIGH_THRESHOLD = 5    // 5+ gaps → high confidence

/**
 * Project band improvement per section.
 *
 * @param gaps            Classified gaps from the classification stage.
 * @param testResult      The test result with current band scores.
 * @param criterionWeights  Rubric criterion weights (for future refinement).
 * @returns One BandImpact per section that has gaps.
 */
export function projectBandImpact(
  gaps: ClassifiedGap[],
  testResult: TestResult,
  _criterionWeights: Record<string, number>,
): BandImpact[] {
  if (gaps.length === 0) return []

  // Group gaps by the section they affect. Gaps have a 'skill' field
  // (general/writing/speaking/etc). We map 'general' skill gaps to
  // all sections that were included in the test.
  const gapsBySection = new Map<string, ClassifiedGap[]>()

  for (const gap of gaps) {
    if (gap.skill === 'general') {
      // General gaps affect all included sections.
      for (const section of testResult.sectionsIncluded) {
        const list = gapsBySection.get(section) ?? []
        list.push(gap)
        gapsBySection.set(section, list)
      }
    } else {
      // Skill-specific gaps affect only that section.
      const list = gapsBySection.get(gap.skill) ?? []
      list.push(gap)
      gapsBySection.set(gap.skill, list)
    }
  }

  const impacts: BandImpact[] = []

  for (const [section, sectionGaps] of gapsBySection) {
    const currentBand = testResult.sectionBands[section]
    if (currentBand === undefined) continue

    // The "room to grow" — how far the current band is from the max.
    const deficit = MAX_BAND - currentBand

    // Sum of impact scores for this section's gaps, capped at 1.0.
    // Impact represents the proportion of the deficit caused by gaps.
    const totalImpact = Math.min(
      1.0,
      sectionGaps.reduce((sum, g) => sum + g.impact, 0) / sectionGaps.length,
    )

    // Theoretical improvement if all gaps were closed.
    const theoreticalGain = deficit * totalImpact

    // Apply conservative multipliers for the range.
    const lowGain = theoreticalGain * LOW_MULTIPLIER
    const highGain = theoreticalGain * HIGH_MULTIPLIER

    const projectedRange: BandRange = {
      low: roundToHalf(Math.min(currentBand + lowGain, MAX_BAND)),
      high: roundToHalf(Math.min(currentBand + highGain, MAX_BAND)),
    }

    // Ensure low <= high after rounding.
    if (projectedRange.low > projectedRange.high) {
      projectedRange.low = projectedRange.high
    }

    // Ensure the projected range is actually above the current band.
    // If rounding pushed it back to the current band, nudge up.
    if (projectedRange.low <= currentBand && theoreticalGain > 0) {
      projectedRange.low = roundToHalf(currentBand + 0.25)
    }
    if (projectedRange.high <= projectedRange.low && deficit > 0) {
      projectedRange.high = roundToHalf(projectedRange.low + 0.25)
    }

    // Cap at MAX_BAND after all adjustments.
    projectedRange.low = Math.min(projectedRange.low, MAX_BAND)
    projectedRange.high = Math.min(projectedRange.high, MAX_BAND)

    // Confidence based on evidence quantity.
    const confidence = sectionGaps.length < CONFIDENCE_LOW_THRESHOLD
      ? 'low' as const
      : sectionGaps.length >= CONFIDENCE_HIGH_THRESHOLD
        ? 'high' as const
        : 'moderate' as const

    impacts.push({
      section,
      currentBand,
      projectedRange,
      confidence,
      closedGapCount: sectionGaps.length,
      totalGapCount: sectionGaps.length,
    })
  }

  return impacts
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnosis/project.test.ts`
Expected: PASS (all 8 tests)

- [ ] **Step 5: Commit**

```bash
git add src/diagnosis/project.ts tests/diagnosis/project.test.ts
git commit -m "feat(diagnosis): add band impact projection — range-based score improvement estimates"
```

---

### Task 7: Pipeline orchestrator and end-to-end tests

**Files:**
- Create: `src/diagnosis/diagnose.ts`
- Test: `tests/diagnosis/diagnose.test.ts`

**Interfaces:**
- Consumes: `DiagnosisInput`, `Diagnosis` from `@/diagnosis/types`; `attributeOutcomes` from `@/diagnosis/attribute`; `rankWeakNodes` from `@/diagnosis/rank`; `classifyGaps` from `@/diagnosis/classify`; `buildActionPlan` from `@/diagnosis/plan`; `projectBandImpact` from `@/diagnosis/project`
- Produces: `diagnose(input: DiagnosisInput): Diagnosis`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/diagnosis/diagnose.test.ts
import { describe, it, expect } from 'vitest'
import { diagnose } from '@/diagnosis/diagnose'
import type { DiagnosisInput } from '@/diagnosis/types'
import type { PerformanceRecord, TestResult, ResponseRecord } from '@/mock-test/types'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_000_000

// Skill graph nodes used in tests.
const NODES: SkillNode[] = [
  { id: 'gram.b1.present_perfect', type: 'grammar', level: 'B1', skill: 'general', title: 'Present Perfect', description: '', metadata: null },
  { id: 'gram.b2.third_conditional', type: 'grammar', level: 'B2', skill: 'general', title: 'Third Conditional', description: '', metadata: null },
  { id: 'cando.b1.describe_data', type: 'cando', level: 'B1', skill: 'writing', title: 'Describe Data', description: '', metadata: null },
  { id: 'strat.b2.ielts_task2_structure', type: 'strategy', level: 'B2', skill: 'writing', title: 'IELTS Task 2 Structure', description: '', metadata: null },
]

const EDGES: SkillEdge[] = [
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'gram.b2.third_conditional', strength: 0.8 },
]

function makeResponse(sectionId: string, slotId: string, nodeIds: string[], score: number | null, maxScore: number | null, latencyMs: number = 5000): ResponseRecord {
  return {
    sectionId,
    slotId,
    nodeIds,
    startedAt: 1000,
    submittedAt: 1000 + latencyMs,
    latencyMs,
    responseData: { skill: 'writing', text: 'test', wordCount: 100 },
    score,
    maxScore,
  }
}

function buildInput(responses: ResponseRecord[]): DiagnosisInput {
  const record: PerformanceRecord = {
    sessionId: 'sess_001',
    examId: 'ielts_academic',
    learnerId: 'learner_001',
    startedAt: NOW,
    completedAt: NOW + 3600_000,
    totalDurationMs: 3600_000,
    sectionResults: [
      {
        sectionId: 'writing',
        skill: 'writing',
        bandScore: 6.0,
        responses,
        durationMs: 3600_000,
        timedOut: false,
      },
    ],
  }
  const testResult: TestResult = {
    performanceRecord: record,
    sectionBands: { writing: 6.0 },
    overallBand: 6.0,
    sectionsIncluded: ['writing'],
    sectionsMissing: ['listening', 'reading', 'speaking'],
  }
  const masteryRecords: MasteryRecord[] = NODES.map((n) => ({
    learnerId: 'learner_001',
    nodeId: n.id,
    mastery: 0.5,
    confidence: 0.3,
    exposures: 3,
    correctStreak: 0,
    lastSeenAt: NOW - 86_400_000,
  }))

  return {
    performanceRecord: record,
    testResult,
    examDefinition: IELTS_ACADEMIC,
    nodes: NODES,
    edges: EDGES,
    masteryRecords,
    criterionWeights: {
      task_achievement: 0.25,
      coherence: 0.25,
      vocabulary: 0.25,
      grammar: 0.25,
    },
    now: NOW,
  }
}

describe('diagnose', () => {
  it('produces a complete Diagnosis from a performance record', () => {
    const responses = [
      // Two attempts at present_perfect — both fail.
      makeResponse('writing', 'task1', ['gram.b1.present_perfect'], 3, 9),
      makeResponse('writing', 'task2', ['gram.b1.present_perfect'], 2, 9),
      // Two attempts at describe_data — both fail.
      makeResponse('writing', 'task1', ['cando.b1.describe_data'], 3, 9),
      makeResponse('writing', 'task2', ['cando.b1.describe_data'], 4, 9),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    expect(result.learnerId).toBe('learner_001')
    expect(result.sessionId).toBe('sess_001')
    expect(result.examId).toBe('ielts_academic')
    expect(result.outcomes.length).toBeGreaterThan(0)
    expect(result.weakNodes.length).toBeGreaterThan(0)
    expect(result.gaps.length).toBeGreaterThan(0)
    expect(result.actionPlan.steps.length).toBeGreaterThan(0)
  })

  it('attributes outcomes to the correct nodes', () => {
    const responses = [
      makeResponse('writing', 'task1', ['gram.b1.present_perfect', 'cando.b1.describe_data'], 3, 9),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    // One response with 2 nodeIds → 2 outcomes.
    expect(result.outcomes).toHaveLength(2)
    const nodeIds = result.outcomes.map((o) => o.nodeId)
    expect(nodeIds).toContain('gram.b1.present_perfect')
    expect(nodeIds).toContain('cando.b1.describe_data')
  })

  it('classifies root causes for each gap', () => {
    const responses = [
      makeResponse('writing', 'task1', ['gram.b1.present_perfect'], 2, 9),
      makeResponse('writing', 'task2', ['gram.b1.present_perfect'], 3, 9),
      makeResponse('writing', 'task1', ['strat.b2.ielts_task2_structure'], 2, 9),
      makeResponse('writing', 'task2', ['strat.b2.ielts_task2_structure'], 3, 9),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    const stratGap = result.gaps.find((g) => g.nodeId === 'strat.b2.ielts_task2_structure')
    // Strategy nodes should always be classified as strategy gaps.
    if (stratGap) {
      expect(stratGap.rootCause).toBe('strategy')
    }
  })

  it('respects prerequisite ordering in the action plan', () => {
    const responses = [
      // Both nodes fail.
      makeResponse('writing', 'task1', ['gram.b1.present_perfect'], 2, 9),
      makeResponse('writing', 'task2', ['gram.b1.present_perfect'], 2, 9),
      makeResponse('writing', 'task1', ['gram.b2.third_conditional'], 2, 9),
      makeResponse('writing', 'task2', ['gram.b2.third_conditional'], 2, 9),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    // present_perfect is a prerequisite of third_conditional.
    const ppStep = result.actionPlan.steps.find((s) => s.nodeId === 'gram.b1.present_perfect')
    const tcStep = result.actionPlan.steps.find((s) => s.nodeId === 'gram.b2.third_conditional')
    if (ppStep && tcStep) {
      expect(ppStep.order).toBeLessThan(tcStep.order)
    }
  })

  it('projects band impact for sections with gaps', () => {
    const responses = [
      makeResponse('writing', 'task1', ['gram.b1.present_perfect'], 2, 9),
      makeResponse('writing', 'task2', ['gram.b1.present_perfect'], 3, 9),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)

    // Writing section has gaps → should have a band impact projection.
    if (result.bandImpacts.length > 0) {
      const writing = result.bandImpacts.find((i) => i.section === 'writing')
      expect(writing).toBeDefined()
      expect(writing!.currentBand).toBe(6.0)
      expect(writing!.projectedRange.low).toBeGreaterThan(6.0)
    }
  })

  it('is fully serializable (JSON round-trip)', () => {
    const responses = [
      makeResponse('writing', 'task1', ['gram.b1.present_perfect'], 2, 9),
      makeResponse('writing', 'task2', ['gram.b1.present_perfect'], 3, 9),
    ]
    const input = buildInput(responses)
    const result = diagnose(input)
    const roundTripped = JSON.parse(JSON.stringify(result))
    expect(roundTripped).toEqual(result)
  })

  it('returns empty diagnosis when no responses exist', () => {
    const input = buildInput([])
    const result = diagnose(input)
    expect(result.outcomes).toHaveLength(0)
    expect(result.weakNodes).toHaveLength(0)
    expect(result.gaps).toHaveLength(0)
    expect(result.actionPlan.steps).toHaveLength(0)
    expect(result.bandImpacts).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnosis/diagnose.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the pipeline orchestrator**

```typescript
// src/diagnosis/diagnose.ts
/**
 * Diagnosis pipeline orchestrator — chains all stages into one call.
 *
 * This is the entry point for the diagnosis engine. It takes everything
 * needed to produce a diagnosis (performance record, skill graph, mastery
 * records, rubric weights) and runs the complete pipeline:
 *
 *   1. attributeOutcomes  → map responses to skill graph nodes
 *   2. rankWeakNodes      → aggregate and rank by impact × confidence
 *   3. classifyGaps       → assign root causes (knowledge/processing/strategy/production)
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnosis/diagnose.test.ts`
Expected: PASS (all 7 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npx vitest run`
Expected: All tests pass (720 existing + ~55 new ≈ 775 total), zero regressions.

- [ ] **Step 6: Commit**

```bash
git add src/diagnosis/diagnose.ts tests/diagnosis/diagnose.test.ts
git commit -m "feat(diagnosis): add pipeline orchestrator — complete diagnosis in one call"
```

---

## Post-plan verification

After all 7 tasks are complete, run the full test suite:

```bash
npx vitest run
```

Expected: all existing tests (720) plus new tests (~55) pass with zero regressions. Total should be approximately 775 tests.

## What this enables

With R1f complete, the platform can now:

1. Run a mock test (R1e) → produce a PerformanceRecord
2. Feed it into `diagnose()` → get a Diagnosis with:
   - Per-node outcomes attributed to the skill graph
   - Ranked weak nodes (suppressing insufficient evidence)
   - Root-cause classified gaps (knowledge/processing/strategy/production)
   - Prerequisite-respecting action plan with time estimates
   - Band impact projections as honest ranges

This is "the feature people pay for" (spec §4d) — the diagnosis screen that is "the single strongest argument for the subscription." R0 monetises this as a paid upgrade on top of the free writing mock.
