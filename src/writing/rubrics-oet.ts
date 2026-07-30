/**
 * OET (Occupational English Test) Writing rubric — referral letter.
 *
 * OET uses letter grades A–E mapped here to numeric 5–1 for scoring:
 *   A = 5 (highest), B = 4, C+ = 3, C = 2, D = 1, E = 0
 *
 * Five criteria based on the published OET Writing assessment:
 *   1. Overall Task Fulfilment
 *   2. Appropriateness of Language
 *   3. Comprehension of Stimulus
 *   4. Control of Linguistic Features (grammar, vocabulary, spelling)
 *   5. Control of Presentation Features (layout, organisation, register)
 *
 * Weights are equal (0.20 each). In the real OET the criteria
 * contribute to a single grade, but for practice and feedback we score
 * each independently to give targeted guidance.
 */

import type { WritingRubric } from './types'
import { registerRubrics } from './rubrics'

const OET_WRITING: WritingRubric = {
  id: 'oet_writing',
  name: 'OET Writing (Referral Letter)',
  exam: 'oet_writing',
  criteria: [
    {
      id: 'task_fulfilment',
      name: 'Overall Task Fulfilment',
      weight: 0.2,
      descriptors: [
        { score: 0, description: 'The letter is entirely off-task or no comprehensible letter is produced.' },
        { score: 1, description: 'The letter is largely incomplete; purpose is unclear; critical clinical information is missing.' },
        { score: 2, description: 'The letter partially fulfils the task; some relevant clinical information is included but purpose may be unclear or key details are missing.' },
        { score: 3, description: 'The letter fulfils the task adequately; purpose is clear and most relevant clinical information is included, though some minor details may be missing.' },
        { score: 4, description: 'The letter fulfils the task well; purpose is immediately clear; all relevant clinical information is included and appropriately prioritised.' },
        { score: 5, description: 'The letter fulfils the task fully and effectively; purpose is explicit; all clinical information is complete, accurate, and expertly prioritised for the recipient.' },
      ],
    },
    {
      id: 'appropriateness',
      name: 'Appropriateness of Language',
      weight: 0.2,
      descriptors: [
        { score: 0, description: 'Language is completely inappropriate for a professional healthcare referral.' },
        { score: 1, description: 'Language is largely inappropriate; tone may be too informal, too emotional, or unclear for a professional context.' },
        { score: 2, description: 'Language is partially appropriate; some lapses in register or tone that could affect professional credibility.' },
        { score: 3, description: 'Language is generally appropriate for a healthcare referral; minor lapses in register or formality.' },
        { score: 4, description: 'Language is consistently appropriate; professional register is maintained; clinical terminology is used correctly.' },
        { score: 5, description: 'Language is exemplary for a healthcare referral; register, tone, and clinical terminology are used with precision and professional authority.' },
      ],
    },
    {
      id: 'comprehension',
      name: 'Comprehension of Stimulus',
      weight: 0.2,
      descriptors: [
        { score: 0, description: 'No evidence that the case notes have been read or understood.' },
        { score: 1, description: 'Very limited comprehension of the case notes; critical details are missed or misinterpreted.' },
        { score: 2, description: 'Partial comprehension of the case notes; some relevant information is extracted but important details are missed or distorted.' },
        { score: 3, description: 'Adequate comprehension; most relevant information from the case notes is accurately extracted and used.' },
        { score: 4, description: 'Good comprehension; all relevant information is accurately extracted, appropriately selected, and effectively used.' },
        { score: 5, description: 'Full and nuanced comprehension; all information is accurately extracted, expertly selected, and seamlessly integrated into the referral.' },
      ],
    },
    {
      id: 'linguistic_features',
      name: 'Control of Linguistic Features',
      weight: 0.2,
      descriptors: [
        { score: 0, description: 'Grammar, vocabulary, and spelling errors are so pervasive that the letter is incomprehensible.' },
        { score: 1, description: 'Frequent and significant errors in grammar, vocabulary, and spelling impede understanding.' },
        { score: 2, description: 'Noticeable errors in grammar, vocabulary, or spelling; meaning is sometimes unclear.' },
        { score: 3, description: 'Generally accurate grammar, vocabulary, and spelling; errors are present but do not impede understanding.' },
        { score: 4, description: 'Good control of grammar, vocabulary, and spelling; errors are rare and minor.' },
        { score: 5, description: 'Excellent control of all linguistic features; grammar, vocabulary, and spelling are consistently accurate and precise.' },
      ],
    },
    {
      id: 'presentation',
      name: 'Control of Presentation Features',
      weight: 0.2,
      descriptors: [
        { score: 0, description: 'No recognisable letter format; layout is absent.' },
        { score: 1, description: 'Minimal letter formatting; layout is largely inappropriate for a referral letter.' },
        { score: 2, description: 'Some letter formatting is present but organisation is inconsistent; information may not flow logically.' },
        { score: 3, description: 'Adequate letter formatting; information is organised logically with clear paragraphing.' },
        { score: 4, description: 'Good letter formatting; information flows logically with effective use of paragraphing and layout conventions.' },
        { score: 5, description: 'Excellent letter formatting; the layout, organisation, and flow are professional and facilitate easy reading by the recipient.' },
      ],
    },
  ],
  scoreRange: { min: 0, max: 5, step: 1 },
}

export const OET_RUBRICS = [OET_WRITING]

registerRubrics(OET_RUBRICS)
