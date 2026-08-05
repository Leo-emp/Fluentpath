/**
 * PTE Academic exam definition — pure data.
 *
 * This file defines the structure, timing, and scoring rules for PTE
 * Academic. The engine reads this to run a mock test; nothing here
 * contains logic.
 *
 * PTE Academic has three sections (not four — speaking and writing are
 * combined into a single timed block):
 *   1. Speaking & Writing (54-67 min, standardised to 60)
 *   2. Reading (29-30 min, standardised to 30)
 *   3. Listening (30-43 min, standardised to 40)
 *
 * Scoring uses a 10-90 integer scale across four communicative skills
 * (Listening, Reading, Speaking, Writing). The overall score is the
 * mean of the four communicative skill scores, rounded to the nearest
 * integer.
 *
 * Unlike IELTS, PTE does not use raw-to-band conversion tables —
 * scoring is handled by its own AI-based algorithm. All section
 * conversions are null.
 */

import type { ExamDefinition, ExamSection } from '@/mock-test/types'

// ---------------------------------------------------------------------------
// Section definitions
// ---------------------------------------------------------------------------

// # Speaking & Writing: combined section with mixed task types.
// # This is PTE's unique feature — speaking and writing tasks appear
// # interleaved in a single timed block. The test-taker cannot go back
// # to previous tasks (speaking recordings are final, writing tasks
// # auto-submit when time is up or the next task begins).
const SPEAKING_WRITING: ExamSection = {
  id: 'speaking_writing',
  name: 'Speaking & Writing',
  // # Primary skill for the combined section — speaking comes first
  // # and dominates the task count.
  skill: 'speaking',
  order: 0,
  // # Real PTE ranges 54-67 min; we use 60 as the standard.
  durationMinutes: 60,
  slots: [
    // # --- Speaking tasks ---
    {
      // # Read a text aloud — tests pronunciation, fluency, and content.
      id: 'read_aloud',
      skill: 'speaking',
      taskRef: 'pte.read_aloud.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.read_aloud'],
    },
    {
      // # Listen to a sentence and repeat it exactly.
      id: 'repeat_sentence',
      skill: 'speaking',
      taskRef: 'pte.repeat_sentence.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.reproduce_spoken'],
    },
    {
      // # Describe a chart, graph, or image in spoken English.
      id: 'describe_image',
      skill: 'speaking',
      taskRef: 'pte.describe_image.1',
      durationMinutes: null,
      // # 25 seconds to study the image before speaking.
      prepTimeSeconds: 25,
      nodeIds: ['cando.b2.describe_data'],
    },
    {
      // # Listen to a lecture and summarise the key points orally.
      id: 'retell_lecture',
      skill: 'speaking',
      taskRef: 'pte.retell_lecture.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.summarise_spoken'],
    },
    {
      // # Give a brief spoken answer to a question.
      id: 'answer_short_question',
      skill: 'speaking',
      taskRef: 'pte.answer_short_question.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.a2.answer_questions'],
    },
    // # --- Writing tasks ---
    {
      // # Read a passage and write a one-sentence summary (5-75 words).
      id: 'summarize_written_text',
      skill: 'writing',
      taskRef: 'pte.summarize_written_text.1',
      // # 10 minutes allocated for the summary task.
      durationMinutes: 10,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.summarise_text'],
    },
    {
      // # Write an argumentative essay (200-300 words).
      id: 'write_essay',
      skill: 'writing',
      taskRef: 'pte.write_essay.1',
      // # 20 minutes allocated for the essay.
      durationMinutes: 20,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.write_essay'],
    },
  ],
  // # Cannot go back — speaking recordings are one-take and tasks
  // # progress in a fixed sequence.
  allowBacktrack: false,
}

// # Reading: multiple task types sharing a single timed block.
// # Test-takers can move freely between tasks within the section.
const READING: ExamSection = {
  id: 'reading',
  name: 'Reading',
  skill: 'reading',
  order: 1,
  // # Real PTE ranges 29-30 min; we use 30 as the standard.
  durationMinutes: 30,
  slots: [
    {
      // # Multiple-choice with single or multiple correct answers.
      id: 'mcq_reading',
      skill: 'reading',
      taskRef: 'pte.mcq_reading.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.understand_argument'],
    },
    {
      // # Drag text boxes to reorder a jumbled paragraph.
      id: 'reorder_paragraphs',
      skill: 'reading',
      taskRef: 'pte.reorder_paragraphs.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.follow_text_structure'],
    },
    {
      // # Select the correct word from a dropdown for each blank.
      id: 'reading_fill_blanks',
      skill: 'reading',
      taskRef: 'pte.reading_fill_blanks.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.understand_factual_text'],
    },
    {
      // # Combined reading & writing: fill blanks from a dropdown
      // # (scored for both reading and writing).
      id: 'rw_fill_blanks',
      skill: 'reading',
      taskRef: 'pte.rw_fill_blanks.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.understand_argument', 'cando.b1.use_vocabulary'],
    },
  ],
  // # Test-takers can navigate between reading tasks.
  allowBacktrack: true,
}

// # Listening: audio-based tasks in a fixed order.
// # Each item plays once — cannot be replayed or revisited.
const LISTENING: ExamSection = {
  id: 'listening',
  name: 'Listening',
  skill: 'listening',
  order: 2,
  // # Real PTE ranges 30-43 min; we use 40 as the standard.
  durationMinutes: 40,
  slots: [
    {
      // # Listen to a lecture and write a 50-70 word summary.
      id: 'summarize_spoken_text',
      skill: 'listening',
      taskRef: 'pte.summarize_spoken_text.1',
      // # 10 minutes to write the summary after listening.
      durationMinutes: 10,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.understand_discussion'],
    },
    {
      // # Multiple-choice on a spoken passage.
      id: 'mcq_listening',
      skill: 'listening',
      taskRef: 'pte.mcq_listening.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.understand_monologue'],
    },
    {
      // # Type missing words into blanks while listening.
      id: 'listening_fill_blanks',
      skill: 'listening',
      taskRef: 'pte.listening_fill_blanks.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.understand_monologue'],
    },
    {
      // # Choose the paragraph that best summarises the audio.
      id: 'highlight_correct_summary',
      skill: 'listening',
      taskRef: 'pte.highlight_correct_summary.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b2.understand_discussion'],
    },
    {
      // # A recording with the last word replaced by a beep —
      // # select the missing word from options.
      id: 'select_missing_word',
      skill: 'listening',
      taskRef: 'pte.select_missing_word.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.predict_content'],
    },
    {
      // # Listen to a sentence and type it exactly.
      id: 'write_from_dictation',
      skill: 'listening',
      taskRef: 'pte.write_from_dictation.1',
      durationMinutes: null,
      prepTimeSeconds: null,
      nodeIds: ['cando.b1.reproduce_spoken'],
    },
  ],
  // # Audio plays once in sequence — no going back.
  allowBacktrack: false,
}

// ---------------------------------------------------------------------------
// Complete PTE Academic definition
// ---------------------------------------------------------------------------

export const PTE_ACADEMIC: ExamDefinition = {
  id: 'pte_academic',
  name: 'PTE Academic',
  sections: [SPEAKING_WRITING, READING, LISTENING],
  // # 60 (Speaking & Writing) + 30 (Reading) + 40 (Listening) = 130
  totalDurationMinutes: 130,
  scoring: {
    // # PTE uses its own AI-based scoring algorithm — no raw-to-band
    // # conversion tables. All sections are null.
    sectionConversions: {
      speaking_writing: null,
      reading: null,
      listening: null,
    },
    // # Overall score = mean of 4 communicative skill scores (L, R, S, W),
    // # rounded to the nearest integer.
    overallRule: 'mean_round_int',
    // # PTE scores on a 10-90 integer scale (not 0-9 bands).
    scoreScale: 'score_10_90',
  },
}
