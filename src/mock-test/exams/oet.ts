/**
 * OET (Occupational English Test) exam definition — pure data.
 *
 * This file defines the structure, timing, and scoring rules for the
 * OET. The engine reads this to run a mock test; nothing here
 * contains logic.
 *
 * OET is designed for healthcare professionals and has four sub-tests:
 * Listening (50min), Reading (60min), Writing (45min), Speaking (20min).
 *
 * Unlike IELTS, OET reports four separate sub-test grades (A–E) with
 * no overall score. Listening and Reading scores are converted to
 * letter grades via a grade conversion table. Writing and Speaking
 * are scored directly from rubrics.
 *
 * Grade scale:
 *   A  = 450+  (highest)
 *   B  = 350–449
 *   C+ = 300–349
 *   C  = 200–299
 *   D  = 100–199
 *   E  = 0–99  (lowest)
 */

import type {
  ExamDefinition,
  ExamSection,
  GradeConversionTable,
} from '@/mock-test/types'

// ---------------------------------------------------------------------------
// # Grade conversion table
// ---------------------------------------------------------------------------
// # OET uses numerical scores (0–500) converted to letter grades.
// # Entries are ordered descending by minScore — first match wins.
// # This table applies to Listening and Reading sub-tests.
// ---------------------------------------------------------------------------

const OET_GRADE_TABLE: GradeConversionTable = {
  entries: [
    { minScore: 450, grade: 'A' },
    { minScore: 350, grade: 'B' },
    { minScore: 300, grade: 'C+' },
    { minScore: 200, grade: 'C' },
    { minScore: 100, grade: 'D' },
    { minScore: 0, grade: 'E' },
  ],
}

// ---------------------------------------------------------------------------
// # Section definitions
// ---------------------------------------------------------------------------

// # Listening: 2 parts, 50 minutes total.
// # Part A: Consultation extracts — 5 items testing B2-level comprehension.
// # Part B: Presentations/interviews — 6 items testing C1-level lecture comprehension.
// # No backtracking — audio plays once, answers are locked in order.
const LISTENING: ExamSection = {
  id: 'listening',
  name: 'Listening',
  skill: 'listening',
  order: 0,
  durationMinutes: 50,
  slots: [
    {
      // # Part A: health professional consultations.
      id: 'partA',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      // # Maps to B2 can-do: understand discussions in professional context.
      nodeIds: ['cando.b2.understand_discussion'],
    },
    {
      // # Part B: workplace presentations and interviews.
      id: 'partB',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      // # Maps to C1 can-do: understand extended speech/lectures.
      nodeIds: ['cando.c1.understand_lecture'],
    },
  ],
  allowBacktrack: false,
}

// # Reading: 3 parts, 60 minutes total.
// # Each part has its own recommended time allocation:
// #   Part A: 15 min — expeditious reading (skimming/scanning).
// #   Part B: 22 min — detailed reading of short workplace texts.
// #   Part C: 23 min — careful reading of extended texts.
// # Backtracking allowed — learner can revisit answers within the section.
const READING: ExamSection = {
  id: 'reading',
  name: 'Reading',
  skill: 'reading',
  order: 1,
  durationMinutes: 60,
  slots: [
    {
      // # Part A: expeditious reading — skimming and scanning healthcare texts.
      id: 'partA',
      skill: 'reading',
      taskRef: null,
      // # 15 minutes recommended for 20 items.
      durationMinutes: 15,
      prepTimeSeconds: null,
      // # Maps to B1 can-do: understand straightforward factual text.
      nodeIds: ['cando.b1.understand_factual_text'],
    },
    {
      // # Part B: detailed reading — workplace extracts (6 items).
      id: 'partB',
      skill: 'reading',
      taskRef: null,
      // # 22 minutes recommended for 6 items.
      durationMinutes: 22,
      prepTimeSeconds: null,
      // # Maps to B2 can-do: understand the line of argument.
      nodeIds: ['cando.b2.understand_argument'],
    },
    {
      // # Part C: careful reading — two extended texts (8 items).
      id: 'partC',
      skill: 'reading',
      taskRef: null,
      // # 23 minutes recommended for 8 items.
      durationMinutes: 23,
      prepTimeSeconds: null,
      // # Maps to C1 can-do: understand long, complex abstract texts.
      nodeIds: ['cando.c1.understand_abstract_text'],
    },
  ],
  allowBacktrack: true,
}

// # Writing: 1 task, 45 minutes total.
// # The learner writes a referral or discharge letter based on case notes.
// # This is a healthcare-specific writing task — not a general essay.
// # Backtracking allowed (can revise within the section time).
const WRITING: ExamSection = {
  id: 'writing',
  name: 'Writing',
  skill: 'writing',
  order: 2,
  durationMinutes: 45,
  slots: [
    {
      // # Single task: referral/discharge letter from case notes.
      id: 'letter1',
      skill: 'writing',
      // # Points to a specific OET writing task.
      taskRef: 'oet.writing.letter.1',
      // # Full 45 minutes for the single writing task.
      durationMinutes: 45,
      prepTimeSeconds: null,
      // # Maps to B2 can-do: write structured formal text.
      nodeIds: ['cando.b2.write_essay'],
    },
  ],
  allowBacktrack: true,
}

// # Speaking: 2 role-plays, 20 minutes total.
// # Each role-play simulates a patient/carer consultation:
// #   - 2 minutes preparation time to read the role card.
// #   - 8 minutes for the role-play interaction.
// # No backtracking — each role-play is a single take.
const SPEAKING: ExamSection = {
  id: 'speaking',
  name: 'Speaking',
  skill: 'speaking',
  order: 3,
  durationMinutes: 20,
  slots: [
    {
      // # Role-play 1: simulated patient/carer consultation.
      id: 'roleplay1',
      skill: 'speaking',
      taskRef: 'oet.speaking.roleplay.1',
      // # 8 minutes for the role-play itself.
      durationMinutes: 8,
      // # 2 minutes (120 seconds) to read the role card and prepare.
      prepTimeSeconds: 120,
      // # Maps to B2 can-do: discuss abstract topics in healthcare context.
      nodeIds: ['cando.b2.discuss_abstract'],
    },
    {
      // # Role-play 2: second simulated consultation scenario.
      id: 'roleplay2',
      skill: 'speaking',
      taskRef: 'oet.speaking.roleplay.2',
      // # 8 minutes for the role-play itself.
      durationMinutes: 8,
      // # 2 minutes (120 seconds) to read the role card and prepare.
      prepTimeSeconds: 120,
      // # Maps to B2 can-do: give detailed account of healthcare scenario.
      nodeIds: ['cando.b2.give_detailed_account'],
    },
  ],
  allowBacktrack: false,
}

// ---------------------------------------------------------------------------
// # Complete OET definition
// ---------------------------------------------------------------------------

export const OET: ExamDefinition = {
  id: 'oet',
  name: 'OET',
  sections: [LISTENING, READING, WRITING, SPEAKING],
  // # 50 (Listening) + 60 (Reading) + 45 (Writing) + 20 (Speaking) = 175
  totalDurationMinutes: 175,
  scoring: {
    // # OET doesn't use band conversion tables — all sections null.
    // # Listening and Reading are scored numerically then converted to grades
    // # via gradeConversions below. Writing and Speaking are scored from rubrics.
    sectionConversions: {
      listening: null,
      reading: null,
      writing: null,
      speaking: null,
    },
    // # OET reports 4 separate sub-test grades — no overall score.
    overallRule: 'none',
    // # Scores displayed as letter grades A–E.
    scoreScale: 'grade_a_e',
    // # Grade conversion tables for Listening and Reading.
    // # Writing and Speaking grades come directly from examiner rubrics.
    gradeConversions: {
      listening: OET_GRADE_TABLE,
      reading: OET_GRADE_TABLE,
    },
  },
}
