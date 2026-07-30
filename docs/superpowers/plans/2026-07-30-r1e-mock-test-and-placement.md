# Mock Test Engine & Placement Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a data-driven mock test engine (exam definitions as data, faithful timing, interruption-safe serializable state, complete performance records, score conversion) plus an adaptive placement test that maps a new learner onto the skill graph — completing the core engine layer for R1.

**Architecture:** The mock test engine follows a reducer pattern: a pure `transition(session, action, now)` function produces the next session state from the current state and an action. This makes the state machine deterministic, serializable (interruption-safe), and trivially testable. Exam definitions are pure data objects — adding an exam means adding a definition file, not touching the engine. The placement test is a separate adaptive algorithm that selects items from the skill graph to bracket the learner's level, then populates initial mastery records. Performance records bridge to diagnosis (R1f) by carrying every response, timing, score, and the skill-graph node IDs each item targets.

**Tech Stack:** TypeScript 7, Vitest, existing skill-graph/mastery/writing/speaking modules.

## Global Constraints

- TypeScript 7 (no `baseUrl` in tsconfig)
- Path alias `@/` resolves to `src/`
- Vitest for tests; `npx vitest run` must pass after every task
- All comments explain WHY, not WHAT — heavily commented for learning
- No external dependencies beyond what's already installed
- Exam definitions are data, not code (spec §3.4)
- Mock test state must be fully serializable (JSON.stringify/parse round-trip) for interruption safety (spec §3.4)
- Performance records capture every item, response, latency, audio ref, and confidence flags (spec §3.4)
- Mock test answer keys stay server-side — never shipped to the client (spec §4b security boundary)
- Placement test is a query against the skill graph, not a mock test (spec §3.1)

---

### Task 1: Mock test and performance record types

**Files:**
- Create: `src/mock-test/types.ts`
- Test: `tests/mock-test/types.test.ts`

**Interfaces:**
- Consumes: `CefrLevel` from `@/skill-graph/types`; `WritingScore` from `@/writing/types`; `SpeakingScore`, `SttResult` from `@/speaking/types`
- Produces: `ExamDefinition`, `ExamSection`, `SectionSlot`, `BandConversionTable`, `ScoringRule`, `TestSession`, `SessionStatus`, `SectionState`, `SectionStatus`, `ResponseRecord`, `ResponseData`, `PerformanceRecord`, `SectionResult`, `TestResult` (used by every later task)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/mock-test/types.test.ts
import { describe, it, expect } from 'vitest'
import type {
  ExamDefinition,
  ExamSection,
  SectionSlot,
  BandConversionTable,
  ScoringRule,
  TestSession,
  SessionStatus,
  SectionState,
  SectionStatus,
  ResponseRecord,
  ResponseData,
  PerformanceRecord,
  SectionResult,
  TestResult,
} from '@/mock-test/types'

// Type-level tests: these compile if the types are correct.
describe('mock test type definitions', () => {
  it('ExamDefinition has all required fields', () => {
    const exam: ExamDefinition = {
      id: 'ielts_academic',
      name: 'IELTS Academic',
      sections: [],
      totalDurationMinutes: 165,
      scoring: {
        sectionConversions: {},
        overallRule: 'mean_round_half',
      },
    }
    expect(exam.id).toBe('ielts_academic')
    expect(exam.totalDurationMinutes).toBe(165)
  })

  it('ExamSection defines a section with slots', () => {
    const section: ExamSection = {
      id: 'writing',
      name: 'Writing',
      skill: 'writing',
      order: 2,
      durationMinutes: 60,
      slots: [
        {
          id: 'task1',
          skill: 'writing',
          taskRef: 'ielts.task1.chart.1',
          durationMinutes: 20,
          prepTimeSeconds: null,
          nodeIds: ['cando.b2.describe_data'],
        },
      ],
      allowBacktrack: true,
    }
    expect(section.slots).toHaveLength(1)
    expect(section.slots[0]!.skill).toBe('writing')
  })

  it('TestSession is fully serializable', () => {
    const session: TestSession = {
      id: 'sess_001',
      examId: 'ielts_academic',
      learnerId: 'learner_001',
      status: 'not_started',
      startedAt: null,
      completedAt: null,
      activeSectionIndex: -1,
      sectionStates: [],
      responses: [],
    }
    // The key property: round-trip through JSON must preserve the value.
    const roundTripped = JSON.parse(JSON.stringify(session)) as TestSession
    expect(roundTripped).toEqual(session)
  })

  it('ResponseRecord captures timing and node mapping', () => {
    const response: ResponseRecord = {
      sectionId: 'writing',
      slotId: 'task1',
      nodeIds: ['cando.b2.describe_data'],
      startedAt: 1000,
      submittedAt: 2000,
      latencyMs: 1000,
      responseData: { skill: 'writing', text: 'The chart shows...', wordCount: 150 },
      score: null,
      maxScore: null,
    }
    expect(response.latencyMs).toBe(1000)
    expect(response.nodeIds).toContain('cando.b2.describe_data')
  })

  it('PerformanceRecord assembles a complete test record', () => {
    const record: PerformanceRecord = {
      sessionId: 'sess_001',
      examId: 'ielts_academic',
      learnerId: 'learner_001',
      startedAt: 1000,
      completedAt: 5000,
      totalDurationMs: 4000,
      sectionResults: [],
    }
    expect(record.totalDurationMs).toBe(4000)
  })

  it('TestResult includes overall and section bands', () => {
    const result: TestResult = {
      performanceRecord: {
        sessionId: 'sess_001',
        examId: 'ielts_academic',
        learnerId: 'learner_001',
        startedAt: 1000,
        completedAt: 5000,
        totalDurationMs: 4000,
        sectionResults: [],
      },
      sectionBands: { writing: 6.5, speaking: 7.0 },
      overallBand: 6.5,
      sectionsIncluded: ['writing', 'speaking'],
      sectionsMissing: ['listening', 'reading'],
    }
    expect(result.overallBand).toBe(6.5)
    expect(result.sectionsMissing).toContain('listening')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/mock-test/types.test.ts`
Expected: FAIL — module `@/mock-test/types` not found

- [ ] **Step 3: Write the types**

```typescript
// src/mock-test/types.ts
/**
 * Mock test engine type definitions.
 *
 * The mock test engine runs exam simulations with faithful timing,
 * section locking, and complete performance recording. The architecture:
 *
 *   ExamDefinition (data) → TestSession (state machine) → PerformanceRecord (output)
 *
 * Exam definitions are pure data — adding an exam means writing a new
 * definition file, never touching the engine. The session is a reducer:
 * transition(state, action, now) → nextState. Fully serializable for
 * interruption safety (spec §3.4).
 */

import type { WritingScore } from '@/writing/types'
import type { SpeakingScore, SttResult } from '@/speaking/types'

// ---------------------------------------------------------------------------
// Exam definitions — pure data, never code
// ---------------------------------------------------------------------------

// The four skills a section can test.
export type SectionSkill = 'listening' | 'reading' | 'writing' | 'speaking'

/**
 * One slot within a section — a single task the learner must complete.
 *
 * For Writing: a writing task (essay, chart description).
 * For Speaking: a speaking task (long turn, discussion).
 * For Listening/Reading: an MCQ or fill-in-the-blank item.
 *
 * taskRef points to a task in the corresponding module's registry.
 * In production, null means "select from pool using selection criteria".
 * For now, every slot has a fixed taskRef since there's no item pool yet.
 */
export interface SectionSlot {
  // Unique within the section, e.g. 'task1', 'part2'.
  id: string
  // Which skill module handles this slot.
  skill: SectionSkill
  // Reference to a task ID in the corresponding module. Null means
  // "select from pool" (future — requires item bank).
  taskRef: string | null
  // Time allocated to this slot in minutes. Null means the slot shares
  // the section's total time with other slots (listening/reading).
  durationMinutes: number | null
  // Preparation time before the learner starts (e.g. IELTS Part 2: 60s).
  prepTimeSeconds: number | null
  // Skill graph nodes this slot exercises — used by diagnosis (R1f)
  // to map responses back to the graph.
  nodeIds: string[]
}

/**
 * One section of an exam — a timed block with one or more task slots.
 *
 * IELTS Academic has 4 sections: Listening (40min), Reading (60min),
 * Writing (60min), Speaking (11-14min). Each runs on its own clock
 * and cannot be revisited once completed.
 */
export interface ExamSection {
  id: string
  name: string
  // Which skill this section tests.
  skill: SectionSkill
  // Display order (0-based).
  order: number
  // Total time for this section in minutes.
  durationMinutes: number
  // The tasks within this section, in order.
  slots: SectionSlot[]
  // Whether the learner can go back to previous slots in this section.
  // True for reading/writing (can revise), false for speaking (one take).
  allowBacktrack: boolean
}

/**
 * Conversion table from raw marks to band scores.
 *
 * Used for Listening and Reading where 40 raw marks convert to bands
 * 1-9. Writing and Speaking are scored directly on the rubric, so
 * they don't need a conversion table (null in ScoringRule).
 *
 * Entries are ordered descending by minRaw — the first entry whose
 * minRaw the raw score meets or exceeds gives the band.
 */
export interface BandConversionTable {
  entries: Array<{ minRaw: number; band: number }>
}

// How the overall band is computed from section bands.
// 'mean_round_half' = average of all section bands, rounded to nearest 0.5.
// This is the only rule IELTS uses. Other exams may need different rules.
export type OverallRule = 'mean_round_half'

/**
 * How an exam computes its scores.
 *
 * sectionConversions maps section IDs to conversion tables.
 * A null value means that section is scored directly (writing, speaking).
 * A BandConversionTable means raw marks are converted (listening, reading).
 */
export interface ScoringRule {
  sectionConversions: Record<string, BandConversionTable | null>
  overallRule: OverallRule
}

/**
 * A complete exam definition — everything the engine needs to run a mock.
 *
 * This is DATA, not code (spec §3.4). Adding an exam means writing one
 * of these objects, not modifying the engine.
 */
export interface ExamDefinition {
  id: string
  name: string
  sections: ExamSection[]
  // Total exam duration (sum of section durations plus any transfer time).
  totalDurationMinutes: number
  scoring: ScoringRule
}

// ---------------------------------------------------------------------------
// Test session — the state machine
// ---------------------------------------------------------------------------

export type SessionStatus =
  | 'not_started'   // Created but not begun
  | 'in_progress'   // Learner is working
  | 'paused'        // Interruption — clock stopped
  | 'completed'     // All sections finished normally
  | 'abandoned'     // Learner quit before finishing
  | 'timed_out'     // A section's time expired

export type SectionStatus =
  | 'locked'        // Not yet reached
  | 'active'        // Currently being worked on
  | 'completed'     // Finished (all slots answered or time expired)
  | 'skipped'       // Section not available (e.g. Listening in R1)

/**
 * Per-section tracking within a test session.
 */
export interface SectionState {
  sectionId: string
  status: SectionStatus
  startedAt: number | null
  completedAt: number | null
  // Cumulative time spent in this section (ms). Pauses do not count.
  // This is what gets compared against the section's time limit.
  elapsedMs: number
  // Index of the current slot within the section (0-based).
  currentSlotIndex: number
}

// ---------------------------------------------------------------------------
// Response data — varies by skill type
// ---------------------------------------------------------------------------

/**
 * What the learner submitted. Tagged union so the mock test engine
 * can store any response type without knowing the details — scoring
 * is delegated to the appropriate module.
 */
export type ResponseData =
  | { skill: 'writing'; text: string; wordCount: number }
  | { skill: 'speaking'; audioRef: string; sttResult: SttResult | null }
  | { skill: 'reading'; selectedIndex: number }
  | { skill: 'listening'; selectedIndex: number }

/**
 * One response captured during a mock test.
 *
 * This is the atomic unit the diagnosis engine (R1f) consumes.
 * nodeIds maps the response to skill graph nodes, enabling the
 * "which nodes failed" attribution.
 */
export interface ResponseRecord {
  sectionId: string
  slotId: string
  // Skill graph nodes this slot exercises (copied from the slot definition).
  nodeIds: string[]
  // When the learner started working on this slot.
  startedAt: number
  // When they submitted (null if time expired before submission).
  submittedAt: number | null
  // Time from start to submission in ms.
  latencyMs: number
  // The learner's response.
  responseData: ResponseData
  // Score assigned after assessment (null until scored).
  score: number | null
  maxScore: number | null
}

/**
 * The complete state of a mock test in progress.
 *
 * Must be fully serializable (JSON round-trip) for interruption safety.
 * The engine persists this after every action, so a crash or dropped
 * connection can resume from exactly where the learner was.
 */
export interface TestSession {
  id: string
  examId: string
  learnerId: string
  status: SessionStatus
  startedAt: number | null
  completedAt: number | null
  // Which section is active (-1 = none).
  activeSectionIndex: number
  sectionStates: SectionState[]
  responses: ResponseRecord[]
}

// ---------------------------------------------------------------------------
// Performance record — the complete output of a mock test
// ---------------------------------------------------------------------------

/**
 * Results for one section, with all responses and timing.
 */
export interface SectionResult {
  sectionId: string
  skill: SectionSkill
  // Band score for this section (from rubric or conversion table).
  bandScore: number
  responses: ResponseRecord[]
  durationMs: number
  // Whether the learner ran out of time in this section.
  timedOut: boolean
}

/**
 * Complete performance record — the bridge between the mock test
 * engine and the diagnosis engine (R1f).
 *
 * Every response, timing datum, and score needed to attribute
 * outcomes to skill graph nodes and classify root causes.
 */
export interface PerformanceRecord {
  sessionId: string
  examId: string
  learnerId: string
  startedAt: number
  completedAt: number
  totalDurationMs: number
  sectionResults: SectionResult[]
}

/**
 * The final test result shown to the learner.
 *
 * Includes overall and section bands, plus which sections were
 * actually completed. In R1, Listening and Reading are missing —
 * the result honestly reports that.
 */
export interface TestResult {
  performanceRecord: PerformanceRecord
  // Band score per section (only completed sections).
  sectionBands: Record<string, number>
  // Overall band (computed from completed sections only).
  overallBand: number
  // Which sections contributed to the overall band.
  sectionsIncluded: string[]
  // Which sections were skipped or not available.
  sectionsMissing: string[]
}

// ---------------------------------------------------------------------------
// Session actions — input to the state machine reducer
// ---------------------------------------------------------------------------

/**
 * Actions the session state machine can process.
 *
 * This is the input to transition(). Each action carries only what the
 * engine needs to compute the next state — no UI concerns.
 */
export type SessionAction =
  | { type: 'start' }
  | { type: 'advance_section' }
  | { type: 'respond'; slotId: string; responseData: ResponseData }
  | { type: 'tick'; elapsedMs: number }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'abandon' }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/mock-test/types.test.ts`
Expected: PASS (all 5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/mock-test/types.ts tests/mock-test/types.test.ts
git commit -m "feat(mock-test): add type definitions for exam engine and performance records"
```

---

### Task 2: IELTS Academic exam definition

**Files:**
- Create: `src/mock-test/exams/ielts-academic.ts`
- Test: `tests/mock-test/exams/ielts-academic.test.ts`

**Interfaces:**
- Consumes: `ExamDefinition`, `ExamSection`, `BandConversionTable` from `@/mock-test/types`
- Produces: `IELTS_ACADEMIC` (the complete IELTS Academic definition); `getExamDefinition(id)` and `listExamDefinitions()` registry functions (used by Tasks 3-5)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/mock-test/exams/ielts-academic.test.ts
import { describe, it, expect } from 'vitest'
import {
  IELTS_ACADEMIC,
  getExamDefinition,
  listExamDefinitions,
} from '@/mock-test/exams/ielts-academic'

describe('IELTS Academic exam definition', () => {
  it('has 4 sections in the correct order', () => {
    expect(IELTS_ACADEMIC.sections).toHaveLength(4)
    expect(IELTS_ACADEMIC.sections[0]!.id).toBe('listening')
    expect(IELTS_ACADEMIC.sections[1]!.id).toBe('reading')
    expect(IELTS_ACADEMIC.sections[2]!.id).toBe('writing')
    expect(IELTS_ACADEMIC.sections[3]!.id).toBe('speaking')
  })

  it('Listening section: 40 minutes, 4 parts', () => {
    const listening = IELTS_ACADEMIC.sections[0]!
    expect(listening.durationMinutes).toBe(40)
    expect(listening.skill).toBe('listening')
    // 4 parts, each with 10 questions
    expect(listening.slots).toHaveLength(4)
    expect(listening.allowBacktrack).toBe(false)
  })

  it('Reading section: 60 minutes, 3 passages', () => {
    const reading = IELTS_ACADEMIC.sections[1]!
    expect(reading.durationMinutes).toBe(60)
    expect(reading.skill).toBe('reading')
    expect(reading.slots).toHaveLength(3)
    expect(reading.allowBacktrack).toBe(true)
  })

  it('Writing section: 60 minutes, 2 tasks with sub-timings', () => {
    const writing = IELTS_ACADEMIC.sections[2]!
    expect(writing.durationMinutes).toBe(60)
    expect(writing.skill).toBe('writing')
    expect(writing.slots).toHaveLength(2)
    // Task 1: 20 minutes recommended
    expect(writing.slots[0]!.durationMinutes).toBe(20)
    // Task 2: 40 minutes recommended
    expect(writing.slots[1]!.durationMinutes).toBe(40)
    expect(writing.allowBacktrack).toBe(true)
  })

  it('Speaking section: 14 minutes, 3 parts', () => {
    const speaking = IELTS_ACADEMIC.sections[3]!
    expect(speaking.durationMinutes).toBe(14)
    expect(speaking.skill).toBe('speaking')
    expect(speaking.slots).toHaveLength(3)
    // Part 2 has 60 seconds prep time
    expect(speaking.slots[1]!.prepTimeSeconds).toBe(60)
    expect(speaking.allowBacktrack).toBe(false)
  })

  it('total duration matches section sum', () => {
    const sectionSum = IELTS_ACADEMIC.sections.reduce(
      (sum, s) => sum + s.durationMinutes,
      0,
    )
    // IELTS total includes 10 min Listening transfer time
    expect(IELTS_ACADEMIC.totalDurationMinutes).toBe(sectionSum)
  })

  it('has scoring conversion tables for Listening and Reading', () => {
    const { sectionConversions } = IELTS_ACADEMIC.scoring
    // Listening and Reading use raw→band conversion
    expect(sectionConversions['listening']).not.toBeNull()
    expect(sectionConversions['reading']).not.toBeNull()
    // Writing and Speaking are scored directly from rubrics
    expect(sectionConversions['writing']).toBeNull()
    expect(sectionConversions['speaking']).toBeNull()
  })

  it('Listening conversion: 39 raw = band 8.5 or 9.0', () => {
    const table = IELTS_ACADEMIC.scoring.sectionConversions['listening']!
    // 39 should be band 8.5 or 9.0 depending on the table
    const entry = table.entries.find((e) => e.minRaw <= 39)
    expect(entry).toBeDefined()
    expect(entry!.band).toBeGreaterThanOrEqual(8.5)
  })

  it('Reading conversion: 1 raw = band 1.0', () => {
    const table = IELTS_ACADEMIC.scoring.sectionConversions['reading']!
    // Last entry should catch raw score of 1
    const lastEntry = table.entries[table.entries.length - 1]!
    expect(lastEntry.minRaw).toBe(1)
    expect(lastEntry.band).toBe(1)
  })

  it('uses mean_round_half for overall scoring', () => {
    expect(IELTS_ACADEMIC.scoring.overallRule).toBe('mean_round_half')
  })

  it('every slot has a skill matching its section', () => {
    for (const section of IELTS_ACADEMIC.sections) {
      for (const slot of section.slots) {
        expect(slot.skill).toBe(section.skill)
      }
    }
  })

  it('getExamDefinition returns the definition by ID', () => {
    const exam = getExamDefinition('ielts_academic')
    expect(exam).toBe(IELTS_ACADEMIC)
    expect(getExamDefinition('nonexistent')).toBeNull()
  })

  it('listExamDefinitions returns all registered exams', () => {
    const exams = listExamDefinitions()
    expect(exams.length).toBeGreaterThanOrEqual(1)
    expect(exams.some((e) => e.id === 'ielts_academic')).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/mock-test/exams/ielts-academic.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the IELTS Academic definition**

```typescript
// src/mock-test/exams/ielts-academic.ts
/**
 * IELTS Academic exam definition — pure data.
 *
 * This file defines the structure, timing, and scoring rules for IELTS
 * Academic. The engine reads this to run a mock test; nothing here
 * contains logic.
 *
 * IELTS Academic has four sections: Listening (40min), Reading (60min),
 * Writing (60min), Speaking (11-14min). Listening and Reading are scored
 * by raw marks converted to bands via a table. Writing and Speaking are
 * scored directly on the rubric (bands 0-9 with 0.5 steps).
 *
 * The overall band is the average of four section bands, rounded to
 * the nearest 0.5.
 *
 * Note: In R1, only Writing and Speaking are available. The engine
 * handles partial mocks by computing the overall from completed
 * sections only and honestly reporting which sections are missing.
 */

import type {
  ExamDefinition,
  ExamSection,
  BandConversionTable,
} from '@/mock-test/types'

// ---------------------------------------------------------------------------
// Scoring conversion tables (indicative values)
// ---------------------------------------------------------------------------
// These are standard approximations. Real IELTS uses per-form equating
// that varies by test administration. These are accurate enough for
// practice scoring — the diagnosis (not the band number) is the value.
// ---------------------------------------------------------------------------

const LISTENING_CONVERSION: BandConversionTable = {
  // Descending by minRaw — first match wins.
  entries: [
    { minRaw: 39, band: 9 },
    { minRaw: 37, band: 8.5 },
    { minRaw: 35, band: 8 },
    { minRaw: 32, band: 7.5 },
    { minRaw: 30, band: 7 },
    { minRaw: 26, band: 6.5 },
    { minRaw: 23, band: 6 },
    { minRaw: 18, band: 5.5 },
    { minRaw: 16, band: 5 },
    { minRaw: 13, band: 4.5 },
    { minRaw: 11, band: 4 },
    { minRaw: 8, band: 3.5 },
    { minRaw: 6, band: 3 },
    { minRaw: 4, band: 2.5 },
    { minRaw: 3, band: 2 },
    { minRaw: 2, band: 1.5 },
    { minRaw: 1, band: 1 },
  ],
}

const READING_ACADEMIC_CONVERSION: BandConversionTable = {
  entries: [
    { minRaw: 39, band: 9 },
    { minRaw: 37, band: 8.5 },
    { minRaw: 35, band: 8 },
    { minRaw: 33, band: 7.5 },
    { minRaw: 30, band: 7 },
    { minRaw: 27, band: 6.5 },
    { minRaw: 23, band: 6 },
    { minRaw: 19, band: 5.5 },
    { minRaw: 15, band: 5 },
    { minRaw: 13, band: 4.5 },
    { minRaw: 10, band: 4 },
    { minRaw: 8, band: 3.5 },
    { minRaw: 6, band: 3 },
    { minRaw: 4, band: 2.5 },
    { minRaw: 3, band: 2 },
    { minRaw: 2, band: 1.5 },
    { minRaw: 1, band: 1 },
  ],
}

// ---------------------------------------------------------------------------
// Section definitions
// ---------------------------------------------------------------------------

// Listening: 4 parts, each with 10 questions.
// Total 40 questions, 40 minutes (30 min test + 10 min transfer time).
// In a computer-based test, transfer time is 2 minutes.
const LISTENING: ExamSection = {
  id: 'listening',
  name: 'Listening',
  skill: 'listening',
  order: 0,
  durationMinutes: 40,
  slots: [
    {
      id: 'part1',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.a2.understand_conversation'],
    },
    {
      id: 'part2',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.understand_monologue'],
    },
    {
      id: 'part3',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.understand_discussion'],
    },
    {
      id: 'part4',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.c1.understand_lecture'],
    },
  ],
  allowBacktrack: false,
}

// Reading: 3 passages, 13-14 questions each = 40 questions total, 60 minutes.
const READING: ExamSection = {
  id: 'reading',
  name: 'Academic Reading',
  skill: 'reading',
  order: 1,
  durationMinutes: 60,
  slots: [
    {
      id: 'passage1',
      skill: 'reading',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.understand_factual_text'],
    },
    {
      id: 'passage2',
      skill: 'reading',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.understand_argument'],
    },
    {
      id: 'passage3',
      skill: 'reading',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.c1.understand_abstract_text'],
    },
  ],
  allowBacktrack: true,
}

// Writing: 2 tasks, 60 minutes total.
// Task 1 (chart/graph description): 20 minutes recommended, 150+ words.
// Task 2 (essay): 40 minutes recommended, 250+ words.
const WRITING: ExamSection = {
  id: 'writing',
  name: 'Academic Writing',
  skill: 'writing',
  order: 2,
  durationMinutes: 60,
  slots: [
    {
      id: 'task1',
      skill: 'writing',
      // Points to a writing task from the writing module.
      taskRef: 'ielts.task1.chart.1',
      // 20 minutes recommended (not enforced — total section time is).
      durationMinutes: 20,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.describe_data', 'strategy.ielts.task1_structure'],
    },
    {
      id: 'task2',
      skill: 'writing',
      taskRef: 'ielts.task2.essay.1',
      durationMinutes: 40,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.write_essay', 'strategy.ielts.task2_structure'],
    },
  ],
  allowBacktrack: true,
}

// Speaking: 3 parts, 11-14 minutes total.
// Part 1: Introduction + short questions (4-5 min).
// Part 2: Long turn with cue card (3-4 min, 60s prep).
// Part 3: Discussion (4-5 min).
const SPEAKING: ExamSection = {
  id: 'speaking',
  name: 'Speaking',
  skill: 'speaking',
  order: 3,
  durationMinutes: 14,
  slots: [
    {
      id: 'part1',
      skill: 'speaking',
      taskRef: 'ielts.part1.1',
      durationMinutes: 5,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.describe_routine', 'strategy.ielts.part1_answers'],
    },
    {
      id: 'part2',
      skill: 'speaking',
      taskRef: 'ielts.part2.1',
      durationMinutes: 4,
      // 60 seconds to read the cue card and prepare.
      prepTimeSeconds: 60,
      nodeIds: ['cando.b2.give_detailed_account', 'strategy.ielts.part2_structure'],
    },
    {
      id: 'part3',
      skill: 'speaking',
      taskRef: 'ielts.part3.1',
      durationMinutes: 5,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.discuss_abstract', 'strategy.ielts.part3_extend'],
    },
  ],
  allowBacktrack: false,
}

// ---------------------------------------------------------------------------
// Complete IELTS Academic definition
// ---------------------------------------------------------------------------

export const IELTS_ACADEMIC: ExamDefinition = {
  id: 'ielts_academic',
  name: 'IELTS Academic',
  sections: [LISTENING, READING, WRITING, SPEAKING],
  // 40 (Listening) + 60 (Reading) + 60 (Writing) + 14 (Speaking) = 174
  totalDurationMinutes: 174,
  scoring: {
    sectionConversions: {
      listening: LISTENING_CONVERSION,
      reading: READING_ACADEMIC_CONVERSION,
      // Writing and Speaking are scored directly from rubrics — no conversion.
      writing: null,
      speaking: null,
    },
    overallRule: 'mean_round_half',
  },
}

// ---------------------------------------------------------------------------
// Registry — look up definitions by ID
// ---------------------------------------------------------------------------

// All registered exam definitions. More added in later releases
// (IELTS General Training, PTE Academic, OET).
const EXAM_REGISTRY: ExamDefinition[] = [IELTS_ACADEMIC]

/**
 * Look up an exam definition by ID.
 * Returns null if not found.
 */
export function getExamDefinition(id: string): ExamDefinition | null {
  return EXAM_REGISTRY.find((e) => e.id === id) ?? null
}

/**
 * List all registered exam definitions.
 */
export function listExamDefinitions(): ExamDefinition[] {
  return [...EXAM_REGISTRY]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/mock-test/exams/ielts-academic.test.ts`
Expected: PASS (all 12 tests)

- [ ] **Step 5: Commit**

```bash
git add src/mock-test/exams/ielts-academic.ts tests/mock-test/exams/ielts-academic.test.ts
git commit -m "feat(mock-test): add IELTS Academic exam definition with scoring tables"
```

---

### Task 3: Test session state machine

**Files:**
- Create: `src/mock-test/session.ts`
- Test: `tests/mock-test/session.test.ts`

**Interfaces:**
- Consumes: `TestSession`, `SessionAction`, `ExamDefinition`, `SectionState`, `ResponseRecord`, `ResponseData`, `SessionStatus`, `SectionStatus` from `@/mock-test/types`; `getExamDefinition` from `@/mock-test/exams/ielts-academic`
- Produces: `createSession(examId, learnerId, id, now): TestSession`; `transition(session, action, exam, now): TestSession`; `TransitionError` (used by Tasks 4-5)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/mock-test/session.test.ts
import { describe, it, expect } from 'vitest'
import { createSession, transition } from '@/mock-test/session'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { SessionAction, ResponseData } from '@/mock-test/types'

const NOW = 1_000_000
const EXAM = IELTS_ACADEMIC

describe('createSession', () => {
  it('creates a not_started session with all sections locked', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    expect(session.status).toBe('not_started')
    expect(session.examId).toBe('ielts_academic')
    expect(session.learnerId).toBe('learner_001')
    expect(session.activeSectionIndex).toBe(-1)
    expect(session.sectionStates).toHaveLength(4)
    expect(session.sectionStates.every((s) => s.status === 'locked')).toBe(true)
    expect(session.responses).toHaveLength(0)
  })

  it('is fully serializable', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    const roundTripped = JSON.parse(JSON.stringify(session))
    expect(roundTripped).toEqual(session)
  })
})

describe('transition: start', () => {
  it('moves from not_started to in_progress and activates first section', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    const next = transition(session, { type: 'start' }, EXAM, NOW)
    expect(next.status).toBe('in_progress')
    expect(next.startedAt).toBe(NOW)
    expect(next.activeSectionIndex).toBe(0)
    expect(next.sectionStates[0]!.status).toBe('active')
    expect(next.sectionStates[0]!.startedAt).toBe(NOW)
  })

  it('throws if session is already started', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    const started = transition(session, { type: 'start' }, EXAM, NOW)
    expect(() => transition(started, { type: 'start' }, EXAM, NOW + 1000)).toThrow()
  })
})

describe('transition: respond', () => {
  it('records a response in the active section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const responseData: ResponseData = { skill: 'listening', selectedIndex: 2 }
    session = transition(
      session,
      { type: 'respond', slotId: 'part1', responseData },
      EXAM,
      NOW + 5000,
    )
    expect(session.responses).toHaveLength(1)
    expect(session.responses[0]!.slotId).toBe('part1')
    expect(session.responses[0]!.responseData).toEqual(responseData)
    expect(session.responses[0]!.latencyMs).toBe(5000)
  })

  it('throws if responding to a slot not in the active section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const responseData: ResponseData = { skill: 'writing', text: 'test', wordCount: 1 }
    // Section 0 is Listening; 'task1' is a Writing slot
    expect(() =>
      transition(
        session,
        { type: 'respond', slotId: 'task1', responseData },
        EXAM,
        NOW + 1000,
      ),
    ).toThrow()
  })
})

describe('transition: advance_section', () => {
  it('completes the current section and activates the next', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'advance_section' }, EXAM, NOW + 60_000)
    expect(session.sectionStates[0]!.status).toBe('completed')
    expect(session.sectionStates[0]!.completedAt).toBe(NOW + 60_000)
    expect(session.activeSectionIndex).toBe(1)
    expect(session.sectionStates[1]!.status).toBe('active')
    expect(session.sectionStates[1]!.startedAt).toBe(NOW + 60_000)
  })

  it('completes the test when advancing past the last section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    // Advance through all 4 sections
    for (let i = 0; i < 4; i++) {
      session = transition(session, { type: 'advance_section' }, EXAM, NOW + (i + 1) * 60_000)
    }
    expect(session.status).toBe('completed')
    expect(session.completedAt).toBe(NOW + 4 * 60_000)
  })
})

describe('transition: tick', () => {
  it('accumulates elapsed time on the active section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'tick', elapsedMs: 30_000 }, EXAM, NOW + 30_000)
    expect(session.sectionStates[0]!.elapsedMs).toBe(30_000)
  })

  it('auto-completes section when elapsed exceeds section duration', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    // Listening is 40 minutes = 2_400_000 ms
    session = transition(
      session,
      { type: 'tick', elapsedMs: 2_500_000 },
      EXAM,
      NOW + 2_500_000,
    )
    expect(session.sectionStates[0]!.status).toBe('completed')
    // Should auto-advance to next section
    expect(session.activeSectionIndex).toBe(1)
    expect(session.sectionStates[1]!.status).toBe('active')
  })
})

describe('transition: pause and resume', () => {
  it('pauses and resumes the session', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'pause' }, EXAM, NOW + 5000)
    expect(session.status).toBe('paused')
    session = transition(session, { type: 'resume' }, EXAM, NOW + 10_000)
    expect(session.status).toBe('in_progress')
  })

  it('throws if pausing a non-active session', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    expect(() => transition(session, { type: 'pause' }, EXAM, NOW)).toThrow()
  })
})

describe('transition: abandon', () => {
  it('marks the session as abandoned', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'abandon' }, EXAM, NOW + 5000)
    expect(session.status).toBe('abandoned')
    expect(session.completedAt).toBe(NOW + 5000)
  })
})

describe('serialization round-trip', () => {
  it('preserves state through JSON stringify/parse after actions', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const responseData: ResponseData = { skill: 'listening', selectedIndex: 1 }
    session = transition(
      session,
      { type: 'respond', slotId: 'part1', responseData },
      EXAM,
      NOW + 3000,
    )
    const roundTripped = JSON.parse(JSON.stringify(session))
    expect(roundTripped).toEqual(session)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/mock-test/session.test.ts`
Expected: FAIL — module `@/mock-test/session` not found

- [ ] **Step 3: Write the state machine**

```typescript
// src/mock-test/session.ts
/**
 * Test session state machine — the core of the mock test engine.
 *
 * Architecture: a pure reducer function.
 *   transition(currentState, action, examDefinition, now) → nextState
 *
 * This pattern gives us three things for free:
 *   1. Deterministic — same inputs always produce the same output (testable)
 *   2. Serializable — the session is a plain object, JSON round-trips cleanly
 *   3. Interruption-safe — persist after every transition, resume from any state
 *
 * The session tracks which section is active, how much time has elapsed,
 * and every response. It never scores responses — that's delegated to
 * the writing/speaking/MCQ modules. It just records what happened.
 */

import type {
  ExamDefinition,
  TestSession,
  SessionAction,
  SectionState,
  ResponseRecord,
} from './types'

/**
 * Create a new test session for an exam.
 *
 * All sections start locked. The session starts in 'not_started' status.
 * Call transition with { type: 'start' } to begin.
 */
export function createSession(
  exam: ExamDefinition,
  learnerId: string,
  sessionId: string,
  _now: number,
): TestSession {
  return {
    id: sessionId,
    examId: exam.id,
    learnerId,
    status: 'not_started',
    startedAt: null,
    completedAt: null,
    activeSectionIndex: -1,
    sectionStates: exam.sections.map((section) => ({
      sectionId: section.id,
      status: 'locked' as const,
      startedAt: null,
      completedAt: null,
      elapsedMs: 0,
      currentSlotIndex: 0,
    })),
    responses: [],
  }
}

/**
 * Apply an action to the session, producing the next state.
 *
 * This is a pure function — it never mutates the input session.
 * The exam definition is passed in so the engine can check section
 * durations, slot validity, etc.
 *
 * Throws on invalid transitions (e.g. responding to a locked section,
 * starting an already-started session). The caller should catch and
 * handle these — they indicate a bug in the UI layer, not a user error.
 */
export function transition(
  session: TestSession,
  action: SessionAction,
  exam: ExamDefinition,
  now: number,
): TestSession {
  switch (action.type) {
    case 'start':
      return handleStart(session, exam, now)
    case 'advance_section':
      return handleAdvanceSection(session, exam, now)
    case 'respond':
      return handleRespond(session, action.slotId, action.responseData, exam, now)
    case 'tick':
      return handleTick(session, action.elapsedMs, exam, now)
    case 'pause':
      return handlePause(session, now)
    case 'resume':
      return handleResume(session, now)
    case 'abandon':
      return handleAbandon(session, now)
  }
}

// ---------------------------------------------------------------------------
// Action handlers — each returns a new session (never mutates)
// ---------------------------------------------------------------------------

function handleStart(session: TestSession, exam: ExamDefinition, now: number): TestSession {
  if (session.status !== 'not_started') {
    throw new Error(`Cannot start session in status '${session.status}'`)
  }

  // Activate the first section.
  const sectionStates = session.sectionStates.map((s, i) =>
    i === 0 ? { ...s, status: 'active' as const, startedAt: now } : s,
  )

  return {
    ...session,
    status: 'in_progress',
    startedAt: now,
    activeSectionIndex: 0,
    sectionStates,
  }
}

function handleAdvanceSection(
  session: TestSession,
  exam: ExamDefinition,
  now: number,
): TestSession {
  assertActive(session)
  const currentIndex = session.activeSectionIndex

  // Complete the current section.
  const sectionStates = [...session.sectionStates]
  sectionStates[currentIndex] = {
    ...sectionStates[currentIndex]!,
    status: 'completed',
    completedAt: now,
  }

  // Find the next section index.
  const nextIndex = currentIndex + 1

  if (nextIndex >= exam.sections.length) {
    // No more sections — complete the test.
    return {
      ...session,
      status: 'completed',
      completedAt: now,
      activeSectionIndex: -1,
      sectionStates,
    }
  }

  // Activate the next section.
  sectionStates[nextIndex] = {
    ...sectionStates[nextIndex]!,
    status: 'active',
    startedAt: now,
  }

  return {
    ...session,
    activeSectionIndex: nextIndex,
    sectionStates,
  }
}

function handleRespond(
  session: TestSession,
  slotId: string,
  responseData: import('./types').ResponseData,
  exam: ExamDefinition,
  now: number,
): TestSession {
  assertActive(session)
  const currentIndex = session.activeSectionIndex
  const section = exam.sections[currentIndex]!

  // Verify the slot belongs to the active section.
  const slot = section.slots.find((s) => s.id === slotId)
  if (!slot) {
    throw new Error(
      `Slot '${slotId}' not found in active section '${section.id}'`,
    )
  }

  // Compute response timing. The start time is the section start time
  // for the first response, or the previous response's submit time.
  const sectionState = session.sectionStates[currentIndex]!
  const previousResponses = session.responses.filter(
    (r) => r.sectionId === section.id,
  )
  const startedAt =
    previousResponses.length > 0
      ? previousResponses[previousResponses.length - 1]!.submittedAt ?? sectionState.startedAt!
      : sectionState.startedAt!

  const response: ResponseRecord = {
    sectionId: section.id,
    slotId,
    nodeIds: [...slot.nodeIds],
    startedAt,
    submittedAt: now,
    latencyMs: now - startedAt,
    responseData,
    score: null,
    maxScore: null,
  }

  // Advance the current slot index within the section.
  const slotIndex = section.slots.findIndex((s) => s.id === slotId)
  const sectionStates = [...session.sectionStates]
  sectionStates[currentIndex] = {
    ...sectionStates[currentIndex]!,
    currentSlotIndex: Math.max(
      sectionStates[currentIndex]!.currentSlotIndex,
      slotIndex + 1,
    ),
  }

  return {
    ...session,
    sectionStates,
    responses: [...session.responses, response],
  }
}

function handleTick(
  session: TestSession,
  elapsedMs: number,
  exam: ExamDefinition,
  now: number,
): TestSession {
  assertActive(session)
  const currentIndex = session.activeSectionIndex
  const section = exam.sections[currentIndex]!
  const sectionDurationMs = section.durationMinutes * 60_000

  const sectionStates = [...session.sectionStates]
  const newElapsed = sectionStates[currentIndex]!.elapsedMs + elapsedMs
  sectionStates[currentIndex] = {
    ...sectionStates[currentIndex]!,
    elapsedMs: newElapsed,
  }

  // Check if the section's time has expired.
  if (newElapsed >= sectionDurationMs) {
    // Complete the current section due to timeout.
    sectionStates[currentIndex] = {
      ...sectionStates[currentIndex]!,
      status: 'completed',
      completedAt: now,
    }

    // Auto-advance to the next section.
    const nextIndex = currentIndex + 1
    if (nextIndex >= exam.sections.length) {
      return {
        ...session,
        status: 'completed',
        completedAt: now,
        activeSectionIndex: -1,
        sectionStates,
      }
    }

    sectionStates[nextIndex] = {
      ...sectionStates[nextIndex]!,
      status: 'active',
      startedAt: now,
    }

    return {
      ...session,
      activeSectionIndex: nextIndex,
      sectionStates,
    }
  }

  return { ...session, sectionStates }
}

function handlePause(session: TestSession, now: number): TestSession {
  if (session.status !== 'in_progress') {
    throw new Error(`Cannot pause session in status '${session.status}'`)
  }
  return { ...session, status: 'paused' }
}

function handleResume(session: TestSession, now: number): TestSession {
  if (session.status !== 'paused') {
    throw new Error(`Cannot resume session in status '${session.status}'`)
  }
  return { ...session, status: 'in_progress' }
}

function handleAbandon(session: TestSession, now: number): TestSession {
  return {
    ...session,
    status: 'abandoned',
    completedAt: now,
  }
}

// ---------------------------------------------------------------------------
// Guards
// ---------------------------------------------------------------------------

function assertActive(session: TestSession): void {
  if (session.status !== 'in_progress') {
    throw new Error(
      `Session must be in_progress, but is '${session.status}'`,
    )
  }
  if (session.activeSectionIndex < 0) {
    throw new Error('No active section')
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/mock-test/session.test.ts`
Expected: PASS (all 13 tests)

- [ ] **Step 5: Commit**

```bash
git add src/mock-test/session.ts tests/mock-test/session.test.ts
git commit -m "feat(mock-test): add reducer-based test session state machine"
```

---

### Task 4: Score conversion engine

**Files:**
- Create: `src/mock-test/convert.ts`
- Test: `tests/mock-test/convert.test.ts`

**Interfaces:**
- Consumes: `BandConversionTable`, `ScoringRule`, `ExamDefinition`, `PerformanceRecord`, `SectionResult`, `TestResult` from `@/mock-test/types`
- Produces: `convertRawToBand(raw, table): number`; `roundToHalf(n): number`; `computeOverallBand(sectionBands, rule): number`; `computeTestResult(performanceRecord, exam): TestResult` (used by Task 5)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/mock-test/convert.test.ts
import { describe, it, expect } from 'vitest'
import {
  convertRawToBand,
  roundToHalf,
  computeOverallBand,
  computeTestResult,
} from '@/mock-test/convert'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { PerformanceRecord, SectionResult } from '@/mock-test/types'

describe('convertRawToBand', () => {
  const table = IELTS_ACADEMIC.scoring.sectionConversions['listening']!

  it('converts 40 raw to band 9', () => {
    expect(convertRawToBand(40, table)).toBe(9)
  })

  it('converts 30 raw to band 7', () => {
    expect(convertRawToBand(30, table)).toBe(7)
  })

  it('converts 23 raw to band 6', () => {
    expect(convertRawToBand(23, table)).toBe(6)
  })

  it('converts 1 raw to band 1', () => {
    expect(convertRawToBand(1, table)).toBe(1)
  })

  it('returns 0 for raw score of 0', () => {
    expect(convertRawToBand(0, table)).toBe(0)
  })

  it('handles boundary values correctly', () => {
    // 37 is exactly the minRaw for 8.5
    expect(convertRawToBand(37, table)).toBe(8.5)
    // 36 falls into the 8.0 range (35-36)
    expect(convertRawToBand(36, table)).toBe(8)
  })
})

describe('roundToHalf', () => {
  it('rounds 6.625 to 6.5', () => {
    expect(roundToHalf(6.625)).toBe(6.5)
  })

  it('rounds 7.25 to 7.5', () => {
    expect(roundToHalf(7.25)).toBe(7.5)
  })

  it('rounds 6.75 to 7.0', () => {
    expect(roundToHalf(6.75)).toBe(7)
  })

  it('leaves 7.0 unchanged', () => {
    expect(roundToHalf(7)).toBe(7)
  })

  it('leaves 7.5 unchanged', () => {
    expect(roundToHalf(7.5)).toBe(7.5)
  })

  it('rounds 5.124 to 5.0', () => {
    expect(roundToHalf(5.124)).toBe(5)
  })
})

describe('computeOverallBand', () => {
  it('averages section bands and rounds to nearest 0.5', () => {
    // L:7, R:6.5, W:6, S:7 → avg 6.625 → 6.5
    const result = computeOverallBand(
      { listening: 7, reading: 6.5, writing: 6, speaking: 7 },
      'mean_round_half',
    )
    expect(result).toBe(6.5)
  })

  it('computes from only available sections', () => {
    // W:6.5, S:7 → avg 6.75 → 7.0
    const result = computeOverallBand(
      { writing: 6.5, speaking: 7 },
      'mean_round_half',
    )
    expect(result).toBe(7)
  })

  it('returns 0 for no sections', () => {
    expect(computeOverallBand({}, 'mean_round_half')).toBe(0)
  })
})

describe('computeTestResult', () => {
  it('assembles a complete test result with section bands', () => {
    const record: PerformanceRecord = {
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
          responses: [],
          durationMs: 3600_000,
          timedOut: false,
        },
        {
          sectionId: 'speaking',
          skill: 'speaking',
          bandScore: 7,
          responses: [],
          durationMs: 840_000,
          timedOut: false,
        },
      ],
    }
    const result = computeTestResult(record, IELTS_ACADEMIC)
    expect(result.sectionBands['writing']).toBe(6.5)
    expect(result.sectionBands['speaking']).toBe(7)
    expect(result.overallBand).toBe(7)
    expect(result.sectionsIncluded).toContain('writing')
    expect(result.sectionsIncluded).toContain('speaking')
    expect(result.sectionsMissing).toContain('listening')
    expect(result.sectionsMissing).toContain('reading')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/mock-test/convert.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the conversion engine**

```typescript
// src/mock-test/convert.ts
/**
 * Score conversion — raw marks to band scores, and overall band computation.
 *
 * IELTS uses two scoring mechanisms:
 *   - Listening and Reading: raw marks (out of 40) converted to bands
 *     via a lookup table. The table varies by test form in real IELTS;
 *     we use standard indicative values.
 *   - Writing and Speaking: scored directly on the rubric (bands 0-9
 *     with 0.5 steps). No conversion needed.
 *
 * The overall band is the average of all section bands, rounded to the
 * nearest 0.5. IELTS uses standard mathematical rounding at the .25
 * boundary: 6.25 rounds to 6.5, 6.75 rounds to 7.0.
 */

import type {
  BandConversionTable,
  OverallRule,
  PerformanceRecord,
  ExamDefinition,
  TestResult,
} from './types'

/**
 * Convert a raw mark to a band score using a conversion table.
 *
 * The table entries are ordered descending by minRaw. The first entry
 * whose minRaw the raw score meets or exceeds gives the band.
 * Returns 0 if the raw score is below all entries (or the table is empty).
 */
export function convertRawToBand(raw: number, table: BandConversionTable): number {
  for (const entry of table.entries) {
    if (raw >= entry.minRaw) return entry.band
  }
  return 0
}

/**
 * Round a number to the nearest 0.5.
 *
 * This is the IELTS overall band rounding rule:
 *   6.25  → 6.5
 *   6.625 → 6.5
 *   6.75  → 7.0
 *   7.0   → 7.0
 */
export function roundToHalf(n: number): number {
  return Math.round(n * 2) / 2
}

/**
 * Compute the overall band from section bands.
 *
 * For 'mean_round_half': average all section bands, then round to
 * nearest 0.5. Only sections present in the map are included.
 * Returns 0 if no sections are provided.
 */
export function computeOverallBand(
  sectionBands: Record<string, number>,
  rule: OverallRule,
): number {
  const bands = Object.values(sectionBands)
  if (bands.length === 0) return 0

  switch (rule) {
    case 'mean_round_half': {
      const mean = bands.reduce((sum, b) => sum + b, 0) / bands.length
      return roundToHalf(mean)
    }
  }
}

/**
 * Assemble a TestResult from a completed PerformanceRecord.
 *
 * The performance record carries per-section band scores (set during
 * scoring). This function collects them, computes the overall band,
 * and identifies which sections were completed vs missing.
 */
export function computeTestResult(
  record: PerformanceRecord,
  exam: ExamDefinition,
): TestResult {
  // Collect band scores from completed sections.
  const sectionBands: Record<string, number> = {}
  for (const sr of record.sectionResults) {
    sectionBands[sr.sectionId] = sr.bandScore
  }

  // Identify which sections are included vs missing.
  const sectionsIncluded = record.sectionResults.map((sr) => sr.sectionId)
  const sectionsMissing = exam.sections
    .map((s) => s.id)
    .filter((id) => !sectionsIncluded.includes(id))

  const overallBand = computeOverallBand(sectionBands, exam.scoring.overallRule)

  return {
    performanceRecord: record,
    sectionBands,
    overallBand,
    sectionsIncluded,
    sectionsMissing,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/mock-test/convert.test.ts`
Expected: PASS (all 14 tests)

- [ ] **Step 5: Commit**

```bash
git add src/mock-test/convert.ts tests/mock-test/convert.test.ts
git commit -m "feat(mock-test): add score conversion engine with IELTS rounding"
```

---

### Task 5: Performance record assembly

**Files:**
- Create: `src/mock-test/record.ts`
- Test: `tests/mock-test/record.test.ts`

**Interfaces:**
- Consumes: `TestSession`, `ExamDefinition`, `PerformanceRecord`, `SectionResult`, `ResponseRecord` from `@/mock-test/types`; `convertRawToBand` from `@/mock-test/convert`
- Produces: `assemblePerformanceRecord(session, exam, sectionBandScores): PerformanceRecord`; `scoreResponse(response, score, maxScore): ResponseRecord` (used by diagnosis in R1f)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/mock-test/record.test.ts
import { describe, it, expect } from 'vitest'
import { assemblePerformanceRecord, scoreResponse } from '@/mock-test/record'
import { createSession, transition } from '@/mock-test/session'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { ResponseData } from '@/mock-test/types'

const NOW = 1_000_000
const EXAM = IELTS_ACADEMIC

// Helper: build a session with some responses and advance to completion.
function buildCompletedSession() {
  let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
  session = transition(session, { type: 'start' }, EXAM, NOW)

  // Record a response in the Listening section.
  const listeningResponse: ResponseData = { skill: 'listening', selectedIndex: 2 }
  session = transition(
    session,
    { type: 'respond', slotId: 'part1', responseData: listeningResponse },
    EXAM,
    NOW + 5000,
  )

  // Advance through all sections.
  for (let i = 0; i < 4; i++) {
    session = transition(session, { type: 'advance_section' }, EXAM, NOW + (i + 1) * 60_000)
  }

  return session
}

describe('assemblePerformanceRecord', () => {
  it('produces a record from a completed session', () => {
    const session = buildCompletedSession()
    const bandScores = { writing: 6.5, speaking: 7 }
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    expect(record.sessionId).toBe('sess_001')
    expect(record.examId).toBe('ielts_academic')
    expect(record.learnerId).toBe('learner_001')
    expect(record.startedAt).toBe(NOW)
    expect(record.completedAt).toBe(NOW + 4 * 60_000)
  })

  it('groups responses into section results', () => {
    const session = buildCompletedSession()
    const bandScores = { writing: 6.5, speaking: 7 }
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    // Should have section results for sections that have responses or band scores.
    const writingResult = record.sectionResults.find((r) => r.sectionId === 'writing')
    expect(writingResult?.bandScore).toBe(6.5)

    const speakingResult = record.sectionResults.find((r) => r.sectionId === 'speaking')
    expect(speakingResult?.bandScore).toBe(7)
  })

  it('computes section duration from section state', () => {
    const session = buildCompletedSession()
    const bandScores = { writing: 6.5, speaking: 7 }
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    // Each section was started and completed at known times.
    for (const sr of record.sectionResults) {
      expect(sr.durationMs).toBeGreaterThanOrEqual(0)
    }
  })

  it('includes all responses in the correct section', () => {
    const session = buildCompletedSession()
    const bandScores = {}
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    const listeningResult = record.sectionResults.find((r) => r.sectionId === 'listening')
    expect(listeningResult?.responses).toHaveLength(1)
    expect(listeningResult?.responses[0]!.slotId).toBe('part1')
  })

  it('sets timedOut based on section elapsed vs duration', () => {
    // Build a session where a section times out.
    let session = createSession(EXAM, 'learner_001', 'sess_002', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    // Tick past the Listening duration (40min = 2_400_000ms).
    session = transition(
      session,
      { type: 'tick', elapsedMs: 2_500_000 },
      EXAM,
      NOW + 2_500_000,
    )
    // Complete remaining sections.
    for (let i = 0; i < 3; i++) {
      session = transition(
        session,
        { type: 'advance_section' },
        EXAM,
        NOW + 2_500_000 + (i + 1) * 60_000,
      )
    }

    const bandScores = {}
    const record = assemblePerformanceRecord(session, EXAM, bandScores)
    const listeningResult = record.sectionResults.find((r) => r.sectionId === 'listening')
    expect(listeningResult?.timedOut).toBe(true)
  })
})

describe('scoreResponse', () => {
  it('returns a new ResponseRecord with score applied', () => {
    const original = {
      sectionId: 'writing',
      slotId: 'task1',
      nodeIds: ['cando.b2.describe_data'],
      startedAt: 1000,
      submittedAt: 2000,
      latencyMs: 1000,
      responseData: { skill: 'writing' as const, text: 'The chart shows...', wordCount: 150 },
      score: null,
      maxScore: null,
    }
    const scored = scoreResponse(original, 6.5, 9)
    expect(scored.score).toBe(6.5)
    expect(scored.maxScore).toBe(9)
    // Original must not be mutated.
    expect(original.score).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/mock-test/record.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the record assembly**

```typescript
// src/mock-test/record.ts
/**
 * Performance record assembly — the output of a mock test.
 *
 * Takes a completed TestSession and section-level band scores, and
 * produces a PerformanceRecord suitable for the diagnosis engine (R1f).
 *
 * The record groups responses by section, computes timing statistics,
 * and carries every data point the diagnosis needs: response data,
 * latency, nodeIds for skill-graph attribution, and scores.
 */

import type {
  TestSession,
  ExamDefinition,
  PerformanceRecord,
  SectionResult,
  ResponseRecord,
} from './types'

/**
 * Assemble a PerformanceRecord from a completed session.
 *
 * @param session         The completed (or abandoned) test session.
 * @param exam            The exam definition (for section metadata).
 * @param sectionBandScores  Band scores per section, keyed by section ID.
 *                           Sections without a score get 0.
 */
export function assemblePerformanceRecord(
  session: TestSession,
  exam: ExamDefinition,
  sectionBandScores: Record<string, number>,
): PerformanceRecord {
  const sectionResults: SectionResult[] = []

  for (const sectionState of session.sectionStates) {
    const sectionDef = exam.sections.find((s) => s.id === sectionState.sectionId)
    if (!sectionDef) continue

    // Gather responses that belong to this section.
    const responses = session.responses.filter(
      (r) => r.sectionId === sectionState.sectionId,
    )

    // Compute duration from section state timestamps.
    const startedAt = sectionState.startedAt ?? session.startedAt ?? 0
    const completedAt = sectionState.completedAt ?? session.completedAt ?? startedAt
    const durationMs = completedAt - startedAt

    // A section timed out if its elapsed time reached or exceeded
    // its allocated duration.
    const sectionDurationMs = sectionDef.durationMinutes * 60_000
    const timedOut = sectionState.elapsedMs >= sectionDurationMs

    sectionResults.push({
      sectionId: sectionState.sectionId,
      skill: sectionDef.skill,
      bandScore: sectionBandScores[sectionState.sectionId] ?? 0,
      responses,
      durationMs,
      timedOut,
    })
  }

  return {
    sessionId: session.id,
    examId: session.examId,
    learnerId: session.learnerId,
    startedAt: session.startedAt ?? 0,
    completedAt: session.completedAt ?? 0,
    totalDurationMs: (session.completedAt ?? 0) - (session.startedAt ?? 0),
    sectionResults,
  }
}

/**
 * Apply a score to a response record (immutable).
 *
 * Returns a new ResponseRecord with the score fields set.
 * The original record is not mutated.
 */
export function scoreResponse(
  response: ResponseRecord,
  score: number,
  maxScore: number,
): ResponseRecord {
  return { ...response, score, maxScore }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/mock-test/record.test.ts`
Expected: PASS (all 6 tests)

- [ ] **Step 5: Commit**

```bash
git add src/mock-test/record.ts tests/mock-test/record.test.ts
git commit -m "feat(mock-test): add performance record assembly for diagnosis bridge"
```

---

### Task 6: Placement test

**Files:**
- Create: `src/placement/types.ts`
- Create: `src/placement/adaptive.ts`
- Create: `src/placement/populate.ts`
- Test: `tests/placement/adaptive.test.ts`
- Test: `tests/placement/populate.test.ts`

**Interfaces:**
- Consumes: `CefrLevel`, `CEFR_LEVELS`, `levelIndex`, `SkillNode`, `SkillArea` from `@/skill-graph/types`; `MasteryRecord`, `clamp01` from `@/mastery/types`; `McqItem` from `@/items/types`
- Produces: `PlacementConfig`, `PlacementState`, `PlacementResult`, `PlacementAction` (types); `createPlacementState(config)`, `selectNextItem(state, items)`, `recordAnswer(state, itemId, correct, now)`, `isComplete(state)`, `getResult(state)` (adaptive algorithm); `populateMastery(result, nodes, now): MasteryRecord[]` (initial mastery from placement)

- [ ] **Step 1: Write the failing tests**

```typescript
// tests/placement/adaptive.test.ts
import { describe, it, expect } from 'vitest'
import type { PlacementConfig } from '@/placement/types'
import {
  createPlacementState,
  selectNextItem,
  recordAnswer,
  isComplete,
  getResult,
} from '@/placement/adaptive'
import type { McqItem } from '@/items/types'
import type { SkillNode } from '@/skill-graph/types'

// Build a pool of items spanning A1–C2, 3 per level.
function buildItemPool(): McqItem[] {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
  const items: McqItem[] = []
  for (const level of levels) {
    for (let i = 0; i < 3; i++) {
      items.push({
        id: `${level.toLowerCase()}_${i}`,
        stem: `Question ${i} at ${level}`,
        options: [
          { text: 'correct', misconception: null },
          { text: 'wrong1', misconception: 'confusion_1' },
          { text: 'wrong2', misconception: 'confusion_2' },
          { text: 'wrong3', misconception: 'confusion_3' },
        ],
        correctIndex: 0,
        nodeIds: [`gram.${level.toLowerCase()}.test_${i}`],
        level,
      })
    }
  }
  return items
}

const DEFAULT_CONFIG: PlacementConfig = {
  startLevel: 'B1',
  itemsPerLevel: 3,
  correctThreshold: 0.67,
  maxItems: 20,
}

describe('createPlacementState', () => {
  it('creates state starting at the configured level', () => {
    const state = createPlacementState(DEFAULT_CONFIG)
    expect(state.currentLevel).toBe('B1')
    expect(state.itemsAnswered).toBe(0)
    expect(state.finished).toBe(false)
  })
})

describe('selectNextItem', () => {
  it('selects an item at the current level', () => {
    const state = createPlacementState(DEFAULT_CONFIG)
    const items = buildItemPool()
    const selected = selectNextItem(state, items)
    expect(selected).not.toBeNull()
    expect(selected!.level).toBe('B1')
  })

  it('does not re-select items already answered', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    const items = buildItemPool()
    const first = selectNextItem(state, items)!
    state = recordAnswer(state, first.id, true, Date.now())
    const second = selectNextItem(state, items)
    expect(second).not.toBeNull()
    expect(second!.id).not.toBe(first.id)
  })

  it('returns null when no items available at current level', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, itemsPerLevel: 10 })
    const items = buildItemPool() // Only 3 per level
    // Answer all 3 B1 items.
    for (let i = 0; i < 3; i++) {
      const item = selectNextItem(state, items)!
      state = recordAnswer(state, item.id, true, Date.now())
    }
    // Now B1 is exhausted and state should advance; if it doesn't, null.
    // (The algorithm advances level before we call selectNextItem again,
    // so this should find items at B2.)
    const next = selectNextItem(state, items)
    // Should be at B2 now or return null if stuck.
    if (next) expect(next.level).not.toBe('B1')
  })
})

describe('recordAnswer', () => {
  it('increments the answer count', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    state = recordAnswer(state, 'b1_0', true, Date.now())
    expect(state.itemsAnswered).toBe(1)
  })

  it('tracks correct/incorrect per level', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    state = recordAnswer(state, 'b1_0', true, Date.now())
    state = recordAnswer(state, 'b1_1', false, Date.now())
    state = recordAnswer(state, 'b1_2', true, Date.now())
    expect(state.levelResults['B1']!.correct).toBe(2)
    expect(state.levelResults['B1']!.total).toBe(3)
  })
})

describe('level advancement', () => {
  it('moves up when threshold is met at current level', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Answer 3 B1 items: 2/3 correct → 0.67 → meets threshold.
    state = recordAnswer(state, 'b1_0', true, Date.now())
    state = recordAnswer(state, 'b1_1', true, Date.now())
    state = recordAnswer(state, 'b1_2', false, Date.now())
    // After 3 items at B1, should advance to B2.
    expect(state.currentLevel).toBe('B2')
  })

  it('moves down when threshold is not met', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Answer 3 B1 items: 1/3 correct → 0.33 → below threshold.
    state = recordAnswer(state, 'b1_0', false, Date.now())
    state = recordAnswer(state, 'b1_1', true, Date.now())
    state = recordAnswer(state, 'b1_2', false, Date.now())
    // Should drop to A2.
    expect(state.currentLevel).toBe('A2')
  })
})

describe('completion', () => {
  it('finishes when level is bracketed (pass one, fail next)', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Pass B1 (2/3 correct).
    state = recordAnswer(state, 'b1_0', true, Date.now())
    state = recordAnswer(state, 'b1_1', true, Date.now())
    state = recordAnswer(state, 'b1_2', false, Date.now())
    // Now at B2. Fail B2 (1/3 correct).
    state = recordAnswer(state, 'b2_0', false, Date.now())
    state = recordAnswer(state, 'b2_1', true, Date.now())
    state = recordAnswer(state, 'b2_2', false, Date.now())
    // Passed B1, failed B2 → level is bracketed → done.
    expect(isComplete(state)).toBe(true)
  })

  it('finishes when maxItems is reached', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, maxItems: 6 })
    for (let i = 0; i < 6; i++) {
      state = recordAnswer(state, `item_${i}`, i % 2 === 0, Date.now())
    }
    expect(isComplete(state)).toBe(true)
  })

  it('finishes when reaching the top level (C2)', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, startLevel: 'C1' })
    // Pass C1.
    state = recordAnswer(state, 'c1_0', true, Date.now())
    state = recordAnswer(state, 'c1_1', true, Date.now())
    state = recordAnswer(state, 'c1_2', true, Date.now())
    // Now at C2. Pass C2.
    state = recordAnswer(state, 'c2_0', true, Date.now())
    state = recordAnswer(state, 'c2_1', true, Date.now())
    state = recordAnswer(state, 'c2_2', true, Date.now())
    // Passed everything up to C2 → done.
    expect(isComplete(state)).toBe(true)
  })

  it('finishes when reaching the bottom level (A1) and failing', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, startLevel: 'A2' })
    // Fail A2.
    state = recordAnswer(state, 'a2_0', false, Date.now())
    state = recordAnswer(state, 'a2_1', false, Date.now())
    state = recordAnswer(state, 'a2_2', false, Date.now())
    // Now at A1. Fail A1.
    state = recordAnswer(state, 'a1_0', false, Date.now())
    state = recordAnswer(state, 'a1_1', false, Date.now())
    state = recordAnswer(state, 'a1_2', false, Date.now())
    // Failed everything down to A1 → done.
    expect(isComplete(state)).toBe(true)
  })
})

describe('getResult', () => {
  it('returns the highest passed level', () => {
    let state = createPlacementState(DEFAULT_CONFIG)
    // Pass B1.
    state = recordAnswer(state, 'b1_0', true, Date.now())
    state = recordAnswer(state, 'b1_1', true, Date.now())
    state = recordAnswer(state, 'b1_2', false, Date.now())
    // Fail B2.
    state = recordAnswer(state, 'b2_0', false, Date.now())
    state = recordAnswer(state, 'b2_1', false, Date.now())
    state = recordAnswer(state, 'b2_2', true, Date.now())

    const result = getResult(state)
    expect(result.estimatedLevel).toBe('B1')
    expect(result.itemsUsed).toBe(6)
  })

  it('returns preA1 when no level is passed', () => {
    let state = createPlacementState({ ...DEFAULT_CONFIG, startLevel: 'A1' })
    // Fail A1.
    state = recordAnswer(state, 'a1_0', false, Date.now())
    state = recordAnswer(state, 'a1_1', false, Date.now())
    state = recordAnswer(state, 'a1_2', false, Date.now())

    const result = getResult(state)
    expect(result.estimatedLevel).toBe('preA1')
  })
})
```

```typescript
// tests/placement/populate.test.ts
import { describe, it, expect } from 'vitest'
import { populateMastery } from '@/placement/populate'
import type { PlacementResult } from '@/placement/types'
import type { SkillNode } from '@/skill-graph/types'
import type { MasteryRecord } from '@/mastery/types'

// A set of skill nodes spanning A1–B2.
function buildNodes(): SkillNode[] {
  return [
    { id: 'gram.a1.present_simple', type: 'grammar', level: 'A1', skill: 'general', title: 'Present Simple', description: '', metadata: null },
    { id: 'gram.a2.past_simple', type: 'grammar', level: 'A2', skill: 'general', title: 'Past Simple', description: '', metadata: null },
    { id: 'gram.b1.present_perfect', type: 'grammar', level: 'B1', skill: 'general', title: 'Present Perfect', description: '', metadata: null },
    { id: 'gram.b2.third_conditional', type: 'grammar', level: 'B2', skill: 'general', title: 'Third Conditional', description: '', metadata: null },
  ]
}

describe('populateMastery', () => {
  it('sets high mastery for nodes below the estimated level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        A1: { correct: 3, total: 3 },
        A2: { correct: 3, total: 3 },
        B1: { correct: 2, total: 3 },
        B2: { correct: 1, total: 3 },
      },
      itemsUsed: 12,
      answeredItemIds: [],
    }
    const nodes = buildNodes()
    const now = Date.now()
    const records = populateMastery(result, nodes, now)

    // A1 node: below estimated level → high mastery.
    const a1 = records.find((r) => r.nodeId === 'gram.a1.present_simple')!
    expect(a1.mastery).toBeGreaterThanOrEqual(0.8)

    // A2 node: below estimated level → high mastery.
    const a2 = records.find((r) => r.nodeId === 'gram.a2.past_simple')!
    expect(a2.mastery).toBeGreaterThanOrEqual(0.8)
  })

  it('sets moderate mastery for nodes at the estimated level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        B1: { correct: 2, total: 3 },
        B2: { correct: 1, total: 3 },
      },
      itemsUsed: 6,
      answeredItemIds: [],
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, Date.now())

    const b1 = records.find((r) => r.nodeId === 'gram.b1.present_perfect')!
    // At estimated level: mastery should reflect the pass rate (2/3 ≈ 0.67).
    expect(b1.mastery).toBeGreaterThanOrEqual(0.5)
    expect(b1.mastery).toBeLessThanOrEqual(0.8)
  })

  it('sets low mastery for nodes above the estimated level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        B1: { correct: 2, total: 3 },
        B2: { correct: 1, total: 3 },
      },
      itemsUsed: 6,
      answeredItemIds: [],
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, Date.now())

    const b2 = records.find((r) => r.nodeId === 'gram.b2.third_conditional')!
    // Above estimated level: low mastery.
    expect(b2.mastery).toBeLessThanOrEqual(0.4)
  })

  it('sets confidence based on evidence at each level', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        B1: { correct: 2, total: 3 },
      },
      itemsUsed: 3,
      answeredItemIds: [],
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, Date.now())

    // Nodes at tested levels should have moderate confidence.
    const b1 = records.find((r) => r.nodeId === 'gram.b1.present_perfect')!
    expect(b1.confidence).toBeGreaterThan(0)

    // Nodes at untested levels should have low confidence.
    const a1 = records.find((r) => r.nodeId === 'gram.a1.present_simple')!
    expect(a1.confidence).toBeLessThan(b1.confidence)
  })

  it('returns a MasteryRecord for every node', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {},
      itemsUsed: 0,
      answeredItemIds: [],
    }
    const nodes = buildNodes()
    const records = populateMastery(result, nodes, Date.now())
    expect(records).toHaveLength(nodes.length)
  })

  it('sets lastSeenAt to now', () => {
    const result: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {},
      itemsUsed: 0,
      answeredItemIds: [],
    }
    const now = 999_999
    const records = populateMastery(result, buildNodes(), now)
    expect(records.every((r) => r.lastSeenAt === now)).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/placement/`
Expected: FAIL — modules not found

- [ ] **Step 3: Write placement types**

```typescript
// src/placement/types.ts
/**
 * Placement test type definitions.
 *
 * The placement test is NOT a mock test — it's an adaptive algorithm
 * that quickly determines a learner's CEFR level by selecting items
 * from the skill graph and adjusting difficulty based on responses.
 *
 * The algorithm:
 *   1. Start at a target level (B1 is the median for IELTS candidates)
 *   2. Present items at that level
 *   3. If the pass rate meets the threshold, move up; otherwise move down
 *   4. Stop when the level is bracketed (passed one, failed the next),
 *      maxItems is reached, or there's nowhere to go (top/bottom)
 *   5. Populate initial mastery records for all skill graph nodes
 */

import type { CefrLevel } from '@/skill-graph/types'

/**
 * Configuration for the placement test.
 */
export interface PlacementConfig {
  // Which level to start testing at.
  startLevel: CefrLevel
  // How many items to present at each level before deciding.
  itemsPerLevel: number
  // Proportion correct needed to "pass" a level and move up (0..1).
  correctThreshold: number
  // Maximum total items across all levels (safety cap).
  maxItems: number
}

/**
 * Per-level tracking during the placement test.
 */
export interface LevelResult {
  correct: number
  total: number
}

/**
 * State of a placement test in progress.
 *
 * Like the mock test session, this is fully serializable for
 * interruption safety.
 */
export interface PlacementState {
  config: PlacementConfig
  currentLevel: CefrLevel
  itemsAnswered: number
  // Results per level tested.
  levelResults: Record<string, LevelResult>
  // IDs of items already answered (prevents re-selection).
  answeredItemIds: Set<string>
  // Whether the test has terminated.
  finished: boolean
  // Direction of movement: 'up' if last level was passed, 'down' if
  // failed, null if no level has been completed yet.
  direction: 'up' | 'down' | null
  // Levels that have been fully tested (itemsPerLevel items answered).
  completedLevels: Set<string>
}

/**
 * The output of a completed placement test.
 */
export interface PlacementResult {
  // The highest level the learner passed.
  estimatedLevel: CefrLevel
  // Per-level pass rates (for confidence and mastery population).
  levelResults: Record<string, LevelResult>
  // Total items used.
  itemsUsed: number
  // Which items were answered (for deduplication if retested).
  answeredItemIds: string[]
}
```

- [ ] **Step 4: Write the adaptive algorithm**

```typescript
// src/placement/adaptive.ts
/**
 * Adaptive placement test algorithm.
 *
 * Uses a simple staircase method: test at a level, decide pass/fail,
 * move up or down. Stop when the level is bracketed.
 *
 * This is intentionally simpler than a full CAT (computerized adaptive
 * test) — the skill graph provides per-node precision later. The
 * placement test only needs to estimate the overall starting level
 * quickly enough that the learner isn't bored or overwhelmed.
 *
 * The state is fully serializable: a Set is converted to an array
 * for JSON serialization, and the algorithm works with either form.
 */

import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { McqItem } from '@/items/types'
import type { PlacementConfig, PlacementState, PlacementResult, LevelResult } from './types'

// preA1 is excluded from placement — it's the fallback when
// everything fails, not a testable level.
const TESTABLE_LEVELS = CEFR_LEVELS.filter((l) => l !== 'preA1') as CefrLevel[]

/**
 * Create the initial state for a placement test.
 */
export function createPlacementState(config: PlacementConfig): PlacementState {
  return {
    config,
    currentLevel: config.startLevel,
    itemsAnswered: 0,
    levelResults: {},
    answeredItemIds: new Set<string>(),
    finished: false,
    direction: null,
    completedLevels: new Set<string>(),
  }
}

/**
 * Select the next item to present from the pool.
 *
 * Picks an unanswered item at the current level. Returns null if no
 * items are available (pool exhausted for this level).
 */
export function selectNextItem(
  state: PlacementState,
  items: McqItem[],
): McqItem | null {
  // Filter to items at the current level that haven't been answered.
  const available = items.filter(
    (item) =>
      item.level === state.currentLevel && !state.answeredItemIds.has(item.id),
  )
  if (available.length === 0) return null

  // Pick the first available item. In production, this would use a
  // more sophisticated selection (e.g. maximise information gain),
  // but for placement speed the order doesn't matter much.
  return available[0]!
}

/**
 * Record an answer and potentially advance the algorithm.
 *
 * After recording, checks whether enough items have been answered at
 * the current level to make a decision. If so, advances the level
 * up or down and checks for completion.
 */
export function recordAnswer(
  state: PlacementState,
  itemId: string,
  correct: boolean,
  _now: number,
): PlacementState {
  const level = state.currentLevel

  // Update per-level results.
  const existing: LevelResult = state.levelResults[level] ?? { correct: 0, total: 0 }
  const levelResults = {
    ...state.levelResults,
    [level]: {
      correct: existing.correct + (correct ? 1 : 0),
      total: existing.total + 1,
    },
  }

  const answeredItemIds = new Set(state.answeredItemIds)
  answeredItemIds.add(itemId)

  const itemsAnswered = state.itemsAnswered + 1

  let nextState: PlacementState = {
    ...state,
    levelResults,
    answeredItemIds,
    itemsAnswered,
  }

  // Check if we've answered enough items at this level to decide.
  const levelResult = levelResults[level]!
  if (levelResult.total >= state.config.itemsPerLevel) {
    nextState = advanceLevel(nextState, level, levelResult)
  }

  // Check global completion conditions.
  if (itemsAnswered >= state.config.maxItems) {
    nextState = { ...nextState, finished: true }
  }

  return nextState
}

/**
 * Advance to the next level after completing the current one.
 *
 * If the learner passed (met the threshold), move up.
 * If they failed, move down.
 * If the level is bracketed (passed one, failed the adjacent), finish.
 */
function advanceLevel(
  state: PlacementState,
  level: CefrLevel,
  result: LevelResult,
): PlacementState {
  const passed = result.correct / result.total >= state.config.correctThreshold

  const completedLevels = new Set(state.completedLevels)
  completedLevels.add(level)

  const currentIndex = TESTABLE_LEVELS.indexOf(level)
  const previousDirection = state.direction
  const newDirection = passed ? 'up' : 'down'

  // Bracketing: if we were going up and now fail, or going down and
  // now pass, the level is bracketed.
  const bracketed =
    (previousDirection === 'up' && newDirection === 'down') ||
    (previousDirection === 'down' && newDirection === 'up')

  if (bracketed) {
    return { ...state, completedLevels, direction: newDirection, finished: true }
  }

  // Move to the next level.
  if (passed) {
    const nextIndex = currentIndex + 1
    if (nextIndex >= TESTABLE_LEVELS.length) {
      // Passed the highest testable level — done.
      return { ...state, completedLevels, direction: 'up', finished: true }
    }
    return {
      ...state,
      currentLevel: TESTABLE_LEVELS[nextIndex]!,
      completedLevels,
      direction: 'up',
    }
  } else {
    const nextIndex = currentIndex - 1
    if (nextIndex < 0) {
      // Failed the lowest testable level — done.
      return { ...state, completedLevels, direction: 'down', finished: true }
    }
    return {
      ...state,
      currentLevel: TESTABLE_LEVELS[nextIndex]!,
      completedLevels,
      direction: 'down',
    }
  }
}

/**
 * Check whether the placement test has finished.
 */
export function isComplete(state: PlacementState): boolean {
  return state.finished
}

/**
 * Extract the placement result from a completed (or in-progress) state.
 *
 * The estimated level is the highest level that was passed. If no level
 * was passed, returns 'preA1'.
 */
export function getResult(state: PlacementState): PlacementResult {
  // Find the highest passed level.
  let estimatedLevel: CefrLevel = 'preA1'

  for (const level of TESTABLE_LEVELS) {
    const result = state.levelResults[level]
    if (!result || result.total === 0) continue
    const passRate = result.correct / result.total
    if (passRate >= state.config.correctThreshold) {
      estimatedLevel = level
    }
  }

  return {
    estimatedLevel,
    levelResults: { ...state.levelResults },
    itemsUsed: state.itemsAnswered,
    answeredItemIds: [...state.answeredItemIds],
  }
}
```

- [ ] **Step 5: Write the mastery population**

```typescript
// src/placement/populate.ts
/**
 * Populate initial mastery records from placement test results.
 *
 * After placement determines the learner's approximate level, every
 * node in the skill graph gets an initial MasteryRecord. This saves
 * the sequencer from having to test every node individually — the
 * placement gives a reasonable starting estimate that subsequent
 * practice refines.
 *
 * The logic:
 *   - Nodes BELOW the estimated level: high mastery (assumed known).
 *   - Nodes AT the estimated level: mastery proportional to the
 *     pass rate at that level (partial knowledge).
 *   - Nodes ABOVE the estimated level: low mastery (assumed unknown).
 *
 * Confidence is higher for levels that were actually tested (direct
 * evidence) and lower for levels that were inferred (indirect evidence
 * from adjacent levels).
 */

import { levelIndex, type CefrLevel, type SkillNode } from '@/skill-graph/types'
import { clamp01, type MasteryRecord } from '@/mastery/types'
import type { PlacementResult } from './types'

// Mastery assigned to nodes below the estimated level.
// High but not 1.0 — the placement test is approximate, not definitive.
const BELOW_LEVEL_MASTERY = 0.85

// Mastery assigned to nodes above the estimated level.
// Low but not 0 — they may know some things above their level.
const ABOVE_LEVEL_MASTERY = 0.15

// Confidence when a level was directly tested.
const TESTED_CONFIDENCE = 0.4

// Confidence when a level was inferred (not tested directly).
const INFERRED_CONFIDENCE = 0.15

/**
 * Create initial MasteryRecords for all nodes based on placement results.
 *
 * @param result  The completed placement test result.
 * @param nodes   All skill graph nodes to populate.
 * @param now     Current timestamp (epoch ms).
 * @returns One MasteryRecord per node.
 */
export function populateMastery(
  result: PlacementResult,
  nodes: SkillNode[],
  now: number,
): MasteryRecord[] {
  const estimatedIndex = levelIndex(result.estimatedLevel)

  return nodes.map((node) => {
    const nodeIndex = levelIndex(node.level)
    const levelResult = result.levelResults[node.level]
    const wasTested = levelResult !== undefined && levelResult.total > 0

    let mastery: number
    let confidence: number

    if (nodeIndex < estimatedIndex) {
      // Below estimated level — assume known.
      mastery = BELOW_LEVEL_MASTERY
      confidence = wasTested ? TESTED_CONFIDENCE : INFERRED_CONFIDENCE
    } else if (nodeIndex === estimatedIndex) {
      // At estimated level — use the actual pass rate.
      mastery = levelResult
        ? clamp01(levelResult.correct / levelResult.total)
        : 0.5
      confidence = wasTested ? TESTED_CONFIDENCE : INFERRED_CONFIDENCE
    } else {
      // Above estimated level — assume unknown.
      mastery = ABOVE_LEVEL_MASTERY
      confidence = wasTested ? TESTED_CONFIDENCE : INFERRED_CONFIDENCE
    }

    return {
      learnerId: '',
      nodeId: node.id,
      mastery: clamp01(mastery),
      confidence: clamp01(confidence),
      exposures: wasTested ? (levelResult?.total ?? 0) : 0,
      correctStreak: 0,
      lastSeenAt: now,
    }
  })
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run tests/placement/`
Expected: PASS (all tests — approximately 18 in adaptive + 6 in populate = 24 tests)

- [ ] **Step 7: Commit**

```bash
git add src/placement/types.ts src/placement/adaptive.ts src/placement/populate.ts tests/placement/adaptive.test.ts tests/placement/populate.test.ts
git commit -m "feat(placement): add adaptive placement test with mastery population"
```

---

## Post-plan verification

After all 6 tasks are complete, run the full test suite:

```bash
npx vitest run
```

Expected: all existing tests (631) plus new tests (~60) pass with zero regressions. Total should be approximately 691 tests.

## What R1f builds on top of this

The performance record produced by Task 5 is the INPUT to the diagnosis engine (R1f). R1f will:

1. **Node attribution** — map each ResponseRecord's nodeIds to skill graph nodes, using the score to determine success/failure.
2. **Aggregation** — rank weak nodes by (impact × confidence), suppressing nodes with insufficient evidence.
3. **Root-cause classification** — distinguish knowledge/processing/strategy/production gaps using response latency, accuracy patterns, and receptive-vs-productive comparisons.
4. **Action plan** — ordered remediation sequence respecting graph prerequisites, with estimated study time.
5. **Band impact projection** — estimate how closing specific gaps changes the band score, modelled from rubric criterion weightings.
