/**
 * PTE Academic Written Essay rubric.
 *
 * 7 criteria based on the published PTE scoring:
 *   - Content: 0–3
 *   - Form, Development, Grammar, Linguistic Range, Vocabulary, Spelling: 0–2
 *
 * The overall PTE score is NOT a simple weighted average (PTE uses a
 * complex IRT model), but for practice and feedback purposes we use
 * weights that approximate the relative contribution of each criterion.
 * Content gets double weight since PTE penalises off-topic responses
 * by zeroing all criteria.
 */

import type { WritingRubric } from './types'
import { registerRubrics } from './rubrics'

const PTE_ESSAY: WritingRubric = {
  id: 'pte_essay',
  name: 'PTE Academic Written Essay',
  exam: 'pte_essay',
  criteria: [
    {
      id: 'content',
      name: 'Content',
      // Content gets higher weight — off-topic responses score 0 across
      // all criteria in the real PTE.
      weight: 0.25,
      descriptors: [
        { score: 0, description: 'The response does not address the topic; content is completely irrelevant.' },
        { score: 1, description: 'The response addresses the topic but some parts are incomplete or only partly relevant.' },
        { score: 2, description: 'The response addresses the topic adequately with relevant content throughout.' },
        { score: 3, description: 'The response is fully relevant to the topic with thorough, well-developed content.' },
      ],
    },
    {
      id: 'form',
      name: 'Form',
      weight: 0.1,
      descriptors: [
        { score: 0, description: 'The word count is below 120 or above 380; or the response is not in essay format.' },
        { score: 1, description: 'The word count is between 120–199 or 301–380; essay format is attempted.' },
        { score: 2, description: 'The word count is between 200–300 and the response is in proper essay format with introduction, body, and conclusion.' },
      ],
    },
    {
      id: 'development',
      name: 'Development, Structure and Coherence',
      weight: 0.15,
      descriptors: [
        { score: 0, description: 'Ideas are not developed or organised; no clear structure or logical progression.' },
        { score: 1, description: 'Ideas are partially developed; structure is evident but coherence breaks down in places.' },
        { score: 2, description: 'Ideas are well-developed and logically organised; clear structure with effective coherence throughout.' },
      ],
    },
    {
      id: 'grammar',
      name: 'Grammar',
      weight: 0.15,
      descriptors: [
        { score: 0, description: 'Grammatical errors are pervasive and impede meaning; only simple or memorised structures are attempted.' },
        { score: 1, description: 'A mix of simple and complex structures is used; some grammatical errors are present but meaning is generally clear.' },
        { score: 2, description: 'A range of complex structures is used accurately; errors are rare and do not impede communication.' },
      ],
    },
    {
      id: 'linguistic_range',
      name: 'General Linguistic Range',
      weight: 0.1,
      descriptors: [
        { score: 0, description: 'Language is extremely limited; cannot express ideas beyond basic level.' },
        { score: 1, description: 'Language is adequate for the task; some range of expression but limited in precision.' },
        { score: 2, description: 'Language shows a wide range of expression used with precision and flexibility.' },
      ],
    },
    {
      id: 'vocabulary',
      name: 'Vocabulary Range',
      weight: 0.15,
      descriptors: [
        { score: 0, description: 'Vocabulary is extremely limited; words are frequently used incorrectly.' },
        { score: 1, description: 'Vocabulary is adequate for the task; some errors in word choice but meaning is maintained.' },
        { score: 2, description: 'A wide range of vocabulary is used accurately and appropriately for the topic.' },
      ],
    },
    {
      id: 'spelling',
      name: 'Spelling',
      weight: 0.1,
      descriptors: [
        { score: 0, description: 'Frequent spelling errors impede understanding of the text.' },
        { score: 1, description: 'Some spelling errors are present but they do not significantly impede understanding.' },
        { score: 2, description: 'Spelling is accurate throughout with only rare slips.' },
      ],
    },
  ],
  // PTE doesn't use a simple band scale like IELTS, but for scoring
  // purposes we report criterion scores on their native scales.
  // The step is 1 (whole numbers only).
  scoreRange: { min: 0, max: 3, step: 1 },
}

export const PTE_RUBRICS = [PTE_ESSAY]

registerRubrics(PTE_RUBRICS)
