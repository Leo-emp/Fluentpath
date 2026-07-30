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
