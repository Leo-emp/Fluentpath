/**
 * IELTS General Training exam definition — pure data.
 *
 * This file defines the structure, timing, and scoring rules for IELTS
 * General Training. The engine reads this to run a mock test; nothing
 * here contains logic.
 *
 * IELTS General Training has the same four sections as Academic:
 * Listening (40min), Reading (60min), Writing (60min), Speaking (11-14min).
 *
 * Key differences from Academic:
 * - Reading passages are workplace/survival English (not academic texts).
 * - Reading scoring is more lenient (different conversion table).
 * - Writing Task 1 is a letter (not a chart/graph description).
 *
 * Listening and Speaking are IDENTICAL to Academic.
 *
 * The overall band is the average of four section bands, rounded to
 * the nearest 0.5.
 */

import type {
  ExamDefinition,
  ExamSection,
  BandConversionTable,
} from '@/mock-test/types'

// ---------------------------------------------------------------------------
// Scoring conversion tables
// ---------------------------------------------------------------------------
// # Listening conversion is identical to IELTS Academic — same test,
// # same scoring, regardless of Academic vs General Training.
// ---------------------------------------------------------------------------

const LISTENING_CONVERSION: BandConversionTable = {
  // # Descending by minRaw — first match wins.
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

// # General Training Reading conversion is MORE LENIENT than Academic.
// # The GT reading passages are easier (workplace/survival English),
// # so more raw marks are needed to reach the same band.
// # Example: 30 raw = band 6 in GT vs band 7 in Academic.
const READING_GT_CONVERSION: BandConversionTable = {
  entries: [
    { minRaw: 40, band: 9 },
    { minRaw: 39, band: 8.5 },
    { minRaw: 37, band: 8 },
    { minRaw: 36, band: 7.5 },
    { minRaw: 34, band: 7 },
    { minRaw: 32, band: 6.5 },
    { minRaw: 30, band: 6 },
    { minRaw: 27, band: 5.5 },
    { minRaw: 23, band: 5 },
    { minRaw: 19, band: 4.5 },
    { minRaw: 15, band: 4 },
    { minRaw: 12, band: 3.5 },
    { minRaw: 8, band: 3 },
    { minRaw: 5, band: 2.5 },
    { minRaw: 3, band: 2 },
    { minRaw: 2, band: 1.5 },
    { minRaw: 1, band: 1 },
  ],
}

// ---------------------------------------------------------------------------
// Section definitions
// ---------------------------------------------------------------------------

// # Listening: IDENTICAL to Academic.
// # 4 parts, each with 10 questions = 40 questions total, 40 minutes.
// # (30 min test + 10 min transfer time; 2 min on computer-based.)
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
      // # Part 1: everyday social conversation between two speakers.
      nodeIds: ['cando.a2.understand_conversation'],
    },
    {
      id: 'part2',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      // # Part 2: monologue in an everyday social context.
      nodeIds: ['cando.b1.understand_monologue'],
    },
    {
      id: 'part3',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      // # Part 3: conversation between up to 4 speakers (academic context).
      nodeIds: ['cando.b2.understand_discussion'],
    },
    {
      id: 'part4',
      skill: 'listening',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      // # Part 4: academic lecture or monologue.
      nodeIds: ['cando.c1.understand_lecture'],
    },
  ],
  allowBacktrack: false,
}

// # Reading: 3 sections, 40 questions total, 60 minutes.
// # GT reading uses workplace/survival English passages instead of
// # academic texts. Section 1 covers notices, ads, timetables;
// # Section 2 covers workplace descriptions; Section 3 is a longer
// # factual text requiring understanding of argument/opinion.
const READING: ExamSection = {
  id: 'reading',
  name: 'General Training Reading',
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
      // # Section 1: notices, advertisements, timetables — survival English.
      nodeIds: ['cando.a2.read_personal_letter'],
    },
    {
      id: 'passage2',
      skill: 'reading',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      // # Section 2: workplace descriptions, job descriptions, contracts.
      nodeIds: ['cando.b1.understand_factual_text'],
    },
    {
      id: 'passage3',
      skill: 'reading',
      taskRef: null,
      durationMinutes: null,
      prepTimeSeconds: null,
      // # Section 3: longer factual text — requires understanding argument.
      nodeIds: ['cando.b2.understand_argument'],
    },
  ],
  allowBacktrack: true,
}

// # Writing: 2 tasks, 60 minutes total.
// # KEY DIFFERENCE: Task 1 is a letter (not a chart/graph description).
// # The learner writes a letter in response to a situation — could be
// # formal, semi-formal, or informal depending on the prompt.
// # Task 2 (essay) is identical to Academic.
const WRITING: ExamSection = {
  id: 'writing',
  name: 'General Training Writing',
  skill: 'writing',
  order: 2,
  durationMinutes: 60,
  slots: [
    {
      id: 'task1',
      skill: 'writing',
      // # GT Task 1: letter writing (formal, semi-formal, or informal).
      taskRef: 'ielts_gt.task1.letter.1',
      // # 20 minutes recommended (not enforced — total section time is).
      durationMinutes: 20,
      prepTimeSeconds: null,
      // # Letter writing maps to B1 connected text production (not B2 data description).
      nodeIds: ['cando.b1.write_connected_text'],
    },
    {
      id: 'task2',
      skill: 'writing',
      // # Task 2: essay — identical to Academic.
      taskRef: 'ielts.task2.essay.1',
      durationMinutes: 40,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    },
  ],
  allowBacktrack: true,
}

// # Speaking: IDENTICAL to Academic.
// # 3 parts, 11-14 minutes total.
// # Part 1: Introduction + short questions (4-5 min).
// # Part 2: Long turn with cue card (3-4 min, 60s prep).
// # Part 3: Discussion (4-5 min).
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
      nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    },
    {
      id: 'part2',
      skill: 'speaking',
      taskRef: 'ielts.part2.1',
      durationMinutes: 4,
      // # 60 seconds to read the cue card and prepare.
      prepTimeSeconds: 60,
      nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    },
    {
      id: 'part3',
      skill: 'speaking',
      taskRef: 'ielts.part3.1',
      durationMinutes: 5,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    },
  ],
  allowBacktrack: false,
}

// ---------------------------------------------------------------------------
// Complete IELTS General Training definition
// ---------------------------------------------------------------------------

export const IELTS_GENERAL: ExamDefinition = {
  id: 'ielts_general',
  name: 'IELTS General Training',
  sections: [LISTENING, READING, WRITING, SPEAKING],
  // # 40 (Listening) + 60 (Reading) + 60 (Writing) + 14 (Speaking) = 174
  totalDurationMinutes: 174,
  scoring: {
    sectionConversions: {
      listening: LISTENING_CONVERSION,
      // # GT uses the more lenient reading conversion table.
      reading: READING_GT_CONVERSION,
      // # Writing and Speaking are scored directly from rubrics — no conversion.
      writing: null,
      speaking: null,
    },
    overallRule: 'mean_round_half',
  },
}
