/**
 * Speaking task definitions for CEFR A1–C2, IELTS Speaking,
 * PTE Speaking, and OET Speaking.
 *
 * Each task specifies what the learner is asked to do, how long
 * they have, how long they can prepare, and which rubric scores it.
 * Tasks are data, not code — adding a new task means adding an
 * object to the array, not writing new logic.
 */

import type { SpeakingTask, TaskFilter } from './types'

const TASKS: SpeakingTask[] = [
  // =========================================================================
  // CEFR A1 — simple short answers about self and immediate surroundings
  // =========================================================================
  {
    id: 'cefr.a1.short_answer.1',
    type: 'short_answer',
    level: 'A1',
    exam: 'cefr',
    prompt: 'Tell me about yourself. What is your name? Where are you from? What do you do?',
    timeLimitSeconds: 30,
    prepTimeSeconds: 5,
    rubricId: 'cefr_a1_speaking',
  },
  {
    id: 'cefr.a1.short_answer.2',
    type: 'short_answer',
    level: 'A1',
    exam: 'cefr',
    prompt: 'Tell me about your family. How many people are in your family?',
    timeLimitSeconds: 30,
    prepTimeSeconds: 5,
    rubricId: 'cefr_a1_speaking',
  },

  // =========================================================================
  // CEFR A2 — simple descriptions, routines, past events
  // =========================================================================
  {
    id: 'cefr.a2.describe_image.1',
    type: 'describe_image',
    level: 'A2',
    exam: 'cefr',
    prompt:
      'Look at the picture of a busy street market. Describe what you can see. What are the people doing?',
    timeLimitSeconds: 45,
    prepTimeSeconds: 10,
    rubricId: 'cefr_a2_speaking',
  },
  {
    id: 'cefr.a2.short_answer.1',
    type: 'short_answer',
    level: 'A2',
    exam: 'cefr',
    prompt: 'What did you do last weekend? Tell me about it.',
    timeLimitSeconds: 45,
    prepTimeSeconds: 5,
    rubricId: 'cefr_a2_speaking',
  },

  // =========================================================================
  // CEFR B1 — connected speech on familiar topics
  // =========================================================================
  {
    id: 'cefr.b1.long_turn.1',
    type: 'long_turn',
    level: 'B1',
    exam: 'cefr',
    prompt:
      'Talk about a holiday you enjoyed. Where did you go? What did you do? Why did you enjoy it?',
    timeLimitSeconds: 90,
    prepTimeSeconds: 15,
    rubricId: 'cefr_b1_speaking',
  },
  {
    id: 'cefr.b1.describe_image.1',
    type: 'describe_image',
    level: 'B1',
    exam: 'cefr',
    prompt:
      'Look at the picture showing people working in an office. Describe the scene and talk about what kind of work they might be doing.',
    timeLimitSeconds: 60,
    prepTimeSeconds: 10,
    rubricId: 'cefr_b1_speaking',
  },

  // =========================================================================
  // CEFR B2 — sustained speech on a wide range of topics
  // =========================================================================
  {
    id: 'cefr.b2.long_turn.1',
    type: 'long_turn',
    level: 'B2',
    exam: 'cefr',
    prompt:
      'Some people think working from home is better than working in an office. Do you agree? Give reasons for your answer.',
    timeLimitSeconds: 120,
    prepTimeSeconds: 15,
    rubricId: 'cefr_b2_speaking',
  },
  {
    id: 'cefr.b2.discussion.1',
    type: 'discussion',
    level: 'B2',
    exam: 'cefr',
    prompt:
      'What are the advantages and disadvantages of social media for young people? Give specific examples.',
    timeLimitSeconds: 120,
    prepTimeSeconds: 15,
    rubricId: 'cefr_b2_speaking',
  },

  // =========================================================================
  // CEFR C1 — fluent, well-structured speech on complex topics
  // =========================================================================
  {
    id: 'cefr.c1.long_turn.1',
    type: 'long_turn',
    level: 'C1',
    exam: 'cefr',
    prompt:
      'To what extent should governments use technology to monitor citizens in the interest of public safety? Consider the ethical implications and discuss with examples.',
    timeLimitSeconds: 120,
    prepTimeSeconds: 20,
    rubricId: 'cefr_c1_speaking',
  },

  // =========================================================================
  // CEFR C2 — near-native fluency, nuanced complex arguments
  // =========================================================================
  {
    id: 'cefr.c2.long_turn.1',
    type: 'long_turn',
    level: 'C2',
    exam: 'cefr',
    prompt:
      'Critically evaluate the claim that globalisation has done more harm than good. Draw on specific examples from economics, culture, and the environment.',
    timeLimitSeconds: 180,
    prepTimeSeconds: 30,
    rubricId: 'cefr_c2_speaking',
  },

  // =========================================================================
  // IELTS Speaking Part 1 — short answers, 4-5 minutes in real exam
  // =========================================================================
  {
    id: 'ielts.speaking.part1.1',
    type: 'short_answer',
    level: 'B1',
    exam: 'ielts_speaking',
    prompt:
      "Let's talk about your hometown. Where is your hometown? What do you like most about it? Has it changed much in recent years?",
    timeLimitSeconds: 60,
    prepTimeSeconds: null,
    rubricId: 'ielts_speaking',
  },

  // =========================================================================
  // IELTS Speaking Part 2 — long turn with cue card, 1 min prep + 1-2 min talk
  // =========================================================================
  {
    id: 'ielts.speaking.part2.1',
    type: 'long_turn',
    level: 'B2',
    exam: 'ielts_speaking',
    prompt:
      'Describe a book you have read recently that you found interesting. You should say: what the book was about, why you decided to read it, what you liked about it, and explain why you would or would not recommend it to others. You have 1 minute to prepare and should speak for 1-2 minutes.',
    timeLimitSeconds: 120,
    prepTimeSeconds: 60,
    rubricId: 'ielts_speaking',
  },

  // =========================================================================
  // IELTS Speaking Part 3 — two-way discussion, abstract/complex topics
  // =========================================================================
  {
    id: 'ielts.speaking.part3.1',
    type: 'discussion',
    level: 'B2',
    exam: 'ielts_speaking',
    prompt:
      'Do you think reading habits have changed in your country? Why do you think some people prefer e-books while others prefer printed books? How might reading habits change in the future?',
    timeLimitSeconds: 120,
    prepTimeSeconds: null,
    rubricId: 'ielts_speaking',
  },

  // =========================================================================
  // PTE Speaking — Read Aloud
  // =========================================================================
  {
    id: 'pte.speaking.read_aloud.1',
    type: 'read_aloud',
    level: 'B2',
    exam: 'pte_speaking',
    prompt:
      'Read the following text aloud: "Climate change is one of the most significant challenges facing humanity today. Rising global temperatures are causing widespread environmental disruption, from melting ice caps to more frequent extreme weather events. Scientists emphasise the need for immediate action to reduce greenhouse gas emissions."',
    timeLimitSeconds: 40,
    prepTimeSeconds: 30,
    rubricId: 'pte_speaking',
  },

  // =========================================================================
  // PTE Speaking — Retell Lecture
  // =========================================================================
  {
    id: 'pte.speaking.retell.1',
    type: 'retell_lecture',
    level: 'B2',
    exam: 'pte_speaking',
    prompt:
      'You will hear a short lecture about renewable energy. After listening, retell the lecture in your own words. Include the main points and supporting details.',
    timeLimitSeconds: 40,
    prepTimeSeconds: 10,
    rubricId: 'pte_speaking',
  },

  // =========================================================================
  // OET Speaking — Role Play (healthcare professional + patient)
  // =========================================================================
  {
    id: 'oet.speaking.roleplay.1',
    type: 'role_play',
    level: 'B2',
    exam: 'oet_speaking',
    prompt:
      'You are a nurse. A patient, Mr. David Thompson (age 45), has come to the clinic complaining of persistent headaches over the past two weeks. He works long hours at a computer and has been under significant stress at work. Take a focused history: ask about the headaches (onset, location, severity, triggers, associated symptoms), review his lifestyle, and provide initial advice.',
    timeLimitSeconds: 300,
    prepTimeSeconds: 120,
    rubricId: 'oet_speaking',
  },
]

// Pre-build a lookup map for O(1) retrieval by id.
const TASK_MAP = new Map(TASKS.map((t) => [t.id, t]))

/**
 * Retrieve a single speaking task by its unique id.
 * Returns null if the id doesn't match any task.
 */
export function getTask(id: string): SpeakingTask | null {
  return TASK_MAP.get(id) ?? null
}

/**
 * List speaking tasks, optionally filtered by level, exam, or type.
 * Pass an empty object to get all tasks.
 */
export function listTasks(filter: TaskFilter): SpeakingTask[] {
  return TASKS.filter((t) => {
    if (filter.level && t.level !== filter.level) return false
    if (filter.exam && t.exam !== filter.exam) return false
    if (filter.type && t.type !== filter.type) return false
    return true
  })
}
