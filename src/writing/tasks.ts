/**
 * Writing task definitions — every writing prompt in the system.
 *
 * Tasks are split by context:
 *   - CEFR A1–C2: general English practice, untimed, original prompts
 *   - IELTS Task 1/2: exam practice with published-style prompts and
 *     time limits matching the real exam
 *   - PTE Written Essay: Pearson exam format
 *   - OET Writing: healthcare referral letters
 *
 * Each task points to a rubricId that tells the scoring engine which
 * rubric (criteria + band descriptors) to use for assessment.
 */

import type { WritingTask, TaskFilter } from './types'

const TASKS: WritingTask[] = [
  // -----------------------------------------------------------------------
  // A1: simple sentences about self and familiar topics
  // Word limits: 15–50 words (short answers about daily life)
  // -----------------------------------------------------------------------
  {
    id: 'cefr.a1.short_answer.1',
    type: 'short_answer',
    level: 'A1',
    exam: 'cefr',
    prompt:
      'Write about your family. How many people are in your family? What are their names?',
    minWords: 15,
    maxWords: 50,
    timeLimitMinutes: null,
    rubricId: 'cefr_a1',
  },
  {
    id: 'cefr.a1.short_answer.2',
    type: 'short_answer',
    level: 'A1',
    exam: 'cefr',
    prompt:
      'Write about your home. Where do you live? What rooms does it have?',
    minWords: 15,
    maxWords: 50,
    timeLimitMinutes: null,
    rubricId: 'cefr_a1',
  },

  // -----------------------------------------------------------------------
  // A2: simple connected text, short messages and paragraphs
  // Word limits: 40–80 words
  // -----------------------------------------------------------------------
  {
    id: 'cefr.a2.paragraph.1',
    type: 'paragraph',
    level: 'A2',
    exam: 'cefr',
    prompt:
      'Write a short message to a friend. Invite them to do something this weekend. Say what, where, and when.',
    minWords: 40,
    maxWords: 80,
    timeLimitMinutes: null,
    rubricId: 'cefr_a2',
  },
  {
    id: 'cefr.a2.paragraph.2',
    type: 'paragraph',
    level: 'A2',
    exam: 'cefr',
    prompt:
      'Write about your daily routine. What do you do in the morning, afternoon, and evening?',
    minWords: 40,
    maxWords: 80,
    timeLimitMinutes: null,
    rubricId: 'cefr_a2',
  },

  // -----------------------------------------------------------------------
  // B1: connected text on familiar topics, personal letters, simple essays
  // Word limits: 120–180 words
  // -----------------------------------------------------------------------
  {
    id: 'cefr.b1.essay.1',
    type: 'essay',
    level: 'B1',
    exam: 'cefr',
    prompt:
      'Some people prefer to live in a big city. Others prefer a small town. Which do you prefer and why? Give reasons for your answer.',
    minWords: 120,
    maxWords: 180,
    timeLimitMinutes: null,
    rubricId: 'cefr_b1',
  },
  {
    id: 'cefr.b1.letter.1',
    type: 'letter',
    level: 'B1',
    exam: 'cefr',
    prompt:
      'You recently stayed at a hotel that was very good. Write a letter to a friend. Describe the hotel, say what you liked, and recommend it.',
    minWords: 120,
    maxWords: 180,
    timeLimitMinutes: null,
    rubricId: 'cefr_b1',
  },

  // -----------------------------------------------------------------------
  // B2: clear, detailed text on a wide range of subjects
  // Word limits: 200–280 words
  // -----------------------------------------------------------------------
  {
    id: 'cefr.b2.essay.1',
    type: 'essay',
    level: 'B2',
    exam: 'cefr',
    prompt:
      'Many universities now offer online courses alongside traditional classroom teaching. Discuss the advantages and disadvantages of online learning and give your own opinion.',
    minWords: 200,
    maxWords: 280,
    timeLimitMinutes: null,
    rubricId: 'cefr_b2',
  },
  {
    id: 'cefr.b2.report.1',
    type: 'report',
    level: 'B2',
    exam: 'cefr',
    prompt:
      'Your company is considering allowing employees to work from home two days per week. Write a report for your manager discussing the potential benefits and drawbacks.',
    minWords: 200,
    maxWords: 280,
    timeLimitMinutes: null,
    rubricId: 'cefr_b2',
  },

  // -----------------------------------------------------------------------
  // C1: well-structured text on complex subjects
  // Word limits: 250–350 words
  // -----------------------------------------------------------------------
  {
    id: 'cefr.c1.essay.1',
    type: 'essay',
    level: 'C1',
    exam: 'cefr',
    prompt:
      'To what extent should governments regulate the use of artificial intelligence in the workplace? Discuss the ethical, economic, and social implications, and present a reasoned argument.',
    minWords: 250,
    maxWords: 350,
    timeLimitMinutes: null,
    rubricId: 'cefr_c1',
  },
  {
    id: 'cefr.c1.proposal.1',
    type: 'proposal',
    level: 'C1',
    exam: 'cefr',
    prompt:
      'Your local council has funding available for one community project. Write a proposal recommending a project, explaining why it would benefit the community and how it should be implemented.',
    minWords: 250,
    maxWords: 350,
    timeLimitMinutes: null,
    rubricId: 'cefr_c1',
  },

  // -----------------------------------------------------------------------
  // C2: complex text in an appropriate and effective style
  // Word limits: 300–400 words
  // -----------------------------------------------------------------------
  {
    id: 'cefr.c2.essay.1',
    type: 'essay',
    level: 'C2',
    exam: 'cefr',
    prompt:
      'The proliferation of social media has fundamentally altered public discourse. Critically evaluate this claim, drawing on specific examples, and assess whether the changes are, on balance, beneficial.',
    minWords: 300,
    maxWords: 400,
    timeLimitMinutes: null,
    rubricId: 'cefr_c2',
  },
  {
    id: 'cefr.c2.article.1',
    type: 'article',
    level: 'C2',
    exam: 'cefr',
    prompt:
      'Write an article for a professional journal on a recent development in your field. Explain its significance and potential impact to an informed but non-specialist audience.',
    minWords: 300,
    maxWords: 400,
    timeLimitMinutes: null,
    rubricId: 'cefr_c2',
  },

  // -----------------------------------------------------------------------
  // IELTS Task 1 — Academic (describe visual data) and GT (letter)
  // 150+ words, 20 minutes
  // -----------------------------------------------------------------------
  {
    id: 'ielts.task1.academic.1',
    type: 'report',
    level: 'B2',
    exam: 'ielts_task1',
    prompt:
      'The bar chart shows the number of international students enrolled at a university between 2015 and 2023, broken down by region of origin. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
    minWords: 150,
    maxWords: 250,
    timeLimitMinutes: 20,
    rubricId: 'ielts_task1',
  },
  {
    id: 'ielts.task1.gt.1',
    type: 'letter',
    level: 'B1',
    exam: 'ielts_task1',
    prompt:
      'You recently bought a product online, but when it arrived it was damaged. Write a letter to the company. In your letter: describe the product you bought, explain the problem, and say what you would like the company to do. Write at least 150 words.',
    minWords: 150,
    maxWords: 250,
    timeLimitMinutes: 20,
    rubricId: 'ielts_task1',
  },

  // -----------------------------------------------------------------------
  // IELTS Task 2 — discursive essay
  // 250+ words, 40 minutes
  // -----------------------------------------------------------------------
  {
    id: 'ielts.task2.1',
    type: 'essay',
    level: 'B2',
    exam: 'ielts_task2',
    prompt:
      'Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better ways to reduce crime. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
    minWords: 250,
    maxWords: 350,
    timeLimitMinutes: 40,
    rubricId: 'ielts_task2',
  },
  {
    id: 'ielts.task2.2',
    type: 'essay',
    level: 'B2',
    exam: 'ielts_task2',
    prompt:
      'In many countries, the gap between the rich and the poor is increasing. What problems does this cause? What solutions can you suggest? Give reasons for your answer and include any relevant examples. Write at least 250 words.',
    minWords: 250,
    maxWords: 350,
    timeLimitMinutes: 40,
    rubricId: 'ielts_task2',
  },

  // -----------------------------------------------------------------------
  // PTE Academic Written Essay
  // 200–300 words, 20 minutes
  // -----------------------------------------------------------------------
  {
    id: 'pte.essay.1',
    type: 'essay',
    level: 'B2',
    exam: 'pte_essay',
    prompt:
      'Do you think that formal written examinations are a good way to assess knowledge? Discuss the advantages and disadvantages of examinations and suggest alternative forms of assessment.',
    minWords: 200,
    maxWords: 300,
    timeLimitMinutes: 20,
    rubricId: 'pte_essay',
  },

  // -----------------------------------------------------------------------
  // OET Writing — referral letter for healthcare professionals
  // 180–200 words, 45 minutes
  // -----------------------------------------------------------------------
  {
    id: 'oet.writing.1',
    type: 'referral_letter',
    level: 'B2',
    exam: 'oet_writing',
    prompt:
      'You are a nurse at a community health centre. A patient, Mrs. Priya Sharma (aged 67), has been experiencing persistent lower back pain for the past three months with limited mobility. She has a history of osteoporosis and hypertension. Her current medications include alendronate 70mg weekly and amlodipine 5mg daily. Conservative management including physiotherapy and paracetamol has not provided adequate relief. Write a referral letter to Dr. James Chen, Orthopaedic Specialist, City Hospital, requesting further assessment and management.',
    minWords: 180,
    maxWords: 200,
    timeLimitMinutes: 45,
    rubricId: 'oet_writing',
  },
]

// Pre-build a lookup map for O(1) retrieval by id.
const TASK_MAP = new Map(TASKS.map((t) => [t.id, t]))

/**
 * Get a single task by its unique id.
 * Returns null if the id doesn't match any task.
 */
export function getTask(id: string): WritingTask | null {
  return TASK_MAP.get(id) ?? null
}

/**
 * List tasks matching the given filter. Pass an empty object to get all.
 * Filters are AND-combined: { level: 'B1', exam: 'cefr' } returns only
 * B1 CEFR tasks.
 */
export function listTasks(filter: TaskFilter): WritingTask[] {
  return TASKS.filter((t) => {
    if (filter.level && t.level !== filter.level) return false
    if (filter.exam && t.exam !== filter.exam) return false
    if (filter.type && t.type !== filter.type) return false
    return true
  })
}
