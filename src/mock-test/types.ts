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
 * Null means "select from pool using selection criteria" — future
 * feature once the item bank exists.
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
// 'mean_round_half' = average of all section bands, rounded to nearest 0.5 (IELTS).
// 'mean_round_int' = average rounded to nearest integer (PTE).
// 'none' = no overall score computed (OET).
export type OverallRule = 'mean_round_half' | 'mean_round_int' | 'none'

// # Grade conversion for OET: numerical score → letter grade.
// # Entries ordered descending by minScore — first match wins.
export interface GradeConversionTable {
  entries: Array<{ minScore: number; grade: string }>
}

// # How scores are displayed for this exam.
// # 'band_0_9' = IELTS (0-9, 0.5 steps)
// # 'score_10_90' = PTE (10-90, integer)
// # 'grade_a_e' = OET (A, B, C+, C, D, E)
export type ScoreScale = 'band_0_9' | 'score_10_90' | 'grade_a_e'

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
  // # Score display scale — defaults to 'band_0_9' if not set.
  scoreScale?: ScoreScale
  // # Grade conversion tables for OET-style scoring.
  // # Maps section IDs to grade conversion tables.
  gradeConversions?: Record<string, GradeConversionTable>
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
