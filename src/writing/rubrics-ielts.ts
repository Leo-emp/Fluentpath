/**
 * IELTS Writing band descriptors — Task 1 and Task 2.
 *
 * Band descriptors are based on the published IELTS Writing assessment
 * criteria. Bands 0–9 with half-band scoring (step 0.5).
 *
 * Key difference between the two tasks:
 *   - Task 1 uses "Task Achievement" (describe/summarise data)
 *   - Task 2 uses "Task Response" (present/discuss/evaluate ideas)
 * The other three criteria share names but have task-specific descriptors.
 *
 * Weights are equal (0.25 each) matching published IELTS practice:
 * the overall band is the arithmetic mean of the four criteria,
 * rounded to the nearest half-band.
 */

import type { WritingRubric, RubricCriterion } from './types'
import { registerRubrics } from './rubrics'

// ---------------------------------------------------------------------------
// Helper to build a criterion with bands 0–9
// ---------------------------------------------------------------------------

function criterion(
  id: string,
  name: string,
  bands: string[],
): RubricCriterion {
  if (bands.length !== 10) {
    throw new Error(`${id}: expected 10 band descriptors (0–9), got ${bands.length}`)
  }
  return {
    id,
    name,
    weight: 0.25,
    descriptors: bands.map((desc, i) => ({ score: i, description: desc })),
  }
}

// ---------------------------------------------------------------------------
// IELTS Task 1 — Academic (describe visual data) / GT (letter)
// ---------------------------------------------------------------------------

const IELTS_TASK1: WritingRubric = {
  id: 'ielts_task1',
  name: 'IELTS Writing Task 1',
  exam: 'ielts_task1',
  criteria: [
    criterion('task_achievement', 'Task Achievement', [
      /* 0 */ 'Did not attempt the task or the response is completely unrelated.',
      /* 1 */ 'The response barely relates to the task; no key features are identified.',
      /* 2 */ 'The response has little relevance to the task; key features are not adequately covered.',
      /* 3 */ 'Key features are not adequately covered; the response does not select relevant information from the input.',
      /* 4 */ 'The response addresses the task only minimally; format may be inappropriate; key features are under-covered or inaccurate.',
      /* 5 */ 'Generally addresses the task; recounts detail mechanically with no clear overview; may lack data to support the description; may be under the minimum word count.',
      /* 6 */ 'Addresses the requirements of the task; provides an overview with key features highlighted; some details may be irrelevant, inappropriate or inaccurate.',
      /* 7 */ 'Covers the requirements of the task clearly; presents a clear overview of main trends, differences or stages; clearly presents and highlights key features but could be more fully extended.',
      /* 8 */ 'Covers all requirements of the task sufficiently; presents, highlights and illustrates key features clearly and appropriately.',
      /* 9 */ 'Fully satisfies all the requirements of the task; clearly presents a fully developed response with all key features appropriately highlighted.',
    ]),
    criterion('coherence', 'Coherence and Cohesion', [
      /* 0 */ 'Did not attempt the task.',
      /* 1 */ 'No discernible organisational pattern; fails to communicate any message.',
      /* 2 */ 'No organisational pattern is apparent; relationships between ideas are unclear.',
      /* 3 */ 'No clear progression of ideas; uses cohesive devices inadequately; paragraphing may be absent.',
      /* 4 */ 'Information and ideas are not arranged coherently; some basic cohesive devices are used but may be inaccurate or repetitive.',
      /* 5 */ 'Organisation is evident but is not wholly logical; cohesive devices are used but with some inaccuracy; referencing may lack clarity.',
      /* 6 */ 'Information is arranged coherently with clear overall progression; cohesive devices are used effectively but cohesion within or between sentences may be faulty or mechanical.',
      /* 7 */ 'Information is logically organised with clear progression throughout; a range of cohesive devices is used appropriately although there may be some under- or over-use.',
      /* 8 */ 'Information and ideas are logically sequenced; cohesion is managed well with only rare lapses; paragraphing is used sufficiently and appropriately.',
      /* 9 */ 'Cohesion is used in such a way that it attracts no attention; paragraphing is skilfully managed.',
    ]),
    criterion('vocabulary', 'Lexical Resource', [
      /* 0 */ 'Did not attempt the task.',
      /* 1 */ 'Can only use isolated words or formulaic phrases.',
      /* 2 */ 'Uses an extremely limited range of vocabulary; essentially no control of word formation and/or spelling.',
      /* 3 */ 'Uses only a very limited range of words and expressions; errors in word formation and/or spelling may severely distort the message.',
      /* 4 */ 'Uses only basic vocabulary; may use some words with inappropriate meaning; errors in spelling and/or word formation may cause difficulty for the reader.',
      /* 5 */ 'Uses a limited range of vocabulary but minimally adequate for the task; may make noticeable errors in spelling and/or word formation; errors may cause some difficulty for the reader.',
      /* 6 */ 'Uses an adequate range of vocabulary for the task; attempts to use less common vocabulary but with some inaccuracy; makes some errors in spelling and/or word formation but these do not impede communication.',
      /* 7 */ 'Uses a sufficient range of vocabulary to allow some flexibility and precision; uses less common lexical items with some awareness of style and collocation; may produce occasional errors in word choice, spelling and/or word formation.',
      /* 8 */ 'Uses a wide range of vocabulary fluently and flexibly; skilfully uses uncommon lexical items with only occasional inaccuracies; produces rare errors in spelling and/or word formation.',
      /* 9 */ 'Uses a wide range of vocabulary with very natural and sophisticated control; rare minor errors occur only as slips.',
    ]),
    criterion('grammar', 'Grammatical Range and Accuracy', [
      /* 0 */ 'Did not attempt the task.',
      /* 1 */ 'Cannot use sentence forms at all.',
      /* 2 */ 'Cannot use sentence forms except in memorised phrases.',
      /* 3 */ 'Attempts sentence forms but errors predominate and distort the meaning.',
      /* 4 */ 'Uses only a very limited range of structures; rare use of subordinate clauses; some structures are accurate but errors predominate.',
      /* 5 */ 'Uses only a limited range of structures; attempts complex sentences but these tend to be less accurate than simple sentences; may make frequent grammatical errors; punctuation may be faulty.',
      /* 6 */ 'Uses a mix of simple and complex sentence forms; makes some errors in grammar and punctuation but these rarely reduce communication.',
      /* 7 */ 'Uses a variety of complex structures; produces frequent error-free sentences; has good control of grammar and punctuation but may make a few errors.',
      /* 8 */ 'Uses a wide range of structures; the majority of sentences are error-free; makes only very occasional errors or inappropriacies.',
      /* 9 */ 'Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as slips.',
    ]),
  ],
  scoreRange: { min: 0, max: 9, step: 0.5 },
}

// ---------------------------------------------------------------------------
// IELTS Task 2 — discursive essay
// ---------------------------------------------------------------------------

const IELTS_TASK2: WritingRubric = {
  id: 'ielts_task2',
  name: 'IELTS Writing Task 2',
  exam: 'ielts_task2',
  criteria: [
    // Task 2 uses "Task Response" (not "Task Achievement").
    criterion('task_response', 'Task Response', [
      /* 0 */ 'Did not attempt the task or the response is completely unrelated.',
      /* 1 */ 'The response barely relates to the task; no position can be identified.',
      /* 2 */ 'The response has little relevance to the task; no position can be identified.',
      /* 3 */ 'No part of the prompt is adequately addressed; no relevant position is presented.',
      /* 4 */ 'Responds to the task only minimally; the format may be inappropriate; position is discernible but the development is not always clear.',
      /* 5 */ 'Addresses the task only partially; position is expressed but the development is not always clear; some relevant ideas presented but may be inadequately developed or unclear.',
      /* 6 */ 'Addresses all parts of the task although some parts may be more fully covered than others; presents a relevant position although the conclusions may become unclear or repetitive; some supporting ideas may not be sufficiently developed.',
      /* 7 */ 'Addresses all parts of the task; presents a clear position throughout the response; presents, extends and supports main ideas but there may be a tendency to over-generalise or supporting ideas may lack focus.',
      /* 8 */ 'Sufficiently addresses all parts of the task; presents a well-developed response with relevant, extended and supported ideas.',
      /* 9 */ 'Fully addresses all parts of the task; presents a fully developed position in answer to the question with relevant, fully extended and well-supported ideas.',
    ]),
    criterion('coherence', 'Coherence and Cohesion', [
      /* 0 */ 'Did not attempt the task.',
      /* 1 */ 'No discernible organisational pattern; fails to communicate any message.',
      /* 2 */ 'No organisational pattern is apparent; very little control of cohesive devices.',
      /* 3 */ 'No clear progression; inadequate use of cohesive devices; paragraphing may be absent.',
      /* 4 */ 'Information and ideas are not arranged coherently; basic cohesive devices used but may be inaccurate or repetitive; paragraphing may not be used or is confusing.',
      /* 5 */ 'Organisation is evident but is not wholly logical; there may be a lack of overall progression; cohesive devices may be inadequate or inaccurate; paragraphing may be inadequate.',
      /* 6 */ 'Information and ideas are generally arranged coherently; clear overall progression; cohesive devices are used effectively but cohesion within or between sentences may be faulty or mechanical; referencing may not always be clear.',
      /* 7 */ 'Information and ideas are logically organised with clear progression; a range of cohesive devices is used appropriately although there may be some under- or over-use; each paragraph has a clear central topic.',
      /* 8 */ 'Sequences information and ideas logically; manages all aspects of cohesion well; paragraphing is used sufficiently and appropriately.',
      /* 9 */ 'Uses cohesion in such a way that it attracts no attention; skilful paragraphing.',
    ]),
    criterion('vocabulary', 'Lexical Resource', [
      /* 0 */ 'Did not attempt the task.',
      /* 1 */ 'Can only use isolated words or memorised phrases.',
      /* 2 */ 'Uses an extremely limited range of vocabulary; essentially no control of word formation and/or spelling.',
      /* 3 */ 'Uses only a very limited range of words and expressions; limited control of word formation and/or spelling; errors may distort the message.',
      /* 4 */ 'Uses only basic vocabulary; may use some words with inappropriate meaning; limited control of word formation and/or spelling; errors may cause strain for the reader.',
      /* 5 */ 'Uses a limited range of vocabulary but minimally adequate for the task; may make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader.',
      /* 6 */ 'Uses an adequate range of vocabulary for the task; attempts to use less common vocabulary but with some inaccuracy; makes some errors in spelling and/or word formation but these do not impede communication.',
      /* 7 */ 'Uses a sufficient range of vocabulary to allow some flexibility and precision; uses less common lexical items with some awareness of style and collocation; may produce occasional errors in word choice, spelling and/or word formation.',
      /* 8 */ 'Uses a wide range of vocabulary fluently and flexibly to convey precise meanings; skilfully uses uncommon lexical items; produces rare errors in spelling and/or word formation.',
      /* 9 */ 'Uses a wide range of vocabulary with very natural and sophisticated control; rare minor errors occur only as slips.',
    ]),
    criterion('grammar', 'Grammatical Range and Accuracy', [
      /* 0 */ 'Did not attempt the task.',
      /* 1 */ 'Cannot use sentence forms at all.',
      /* 2 */ 'Cannot use sentence forms except in memorised phrases.',
      /* 3 */ 'Attempts sentence forms but errors predominate and distort the meaning.',
      /* 4 */ 'Uses only a very limited range of structures; subordinate clauses are rare; some structures are accurate but errors predominate.',
      /* 5 */ 'Uses only a limited range of structures; attempts complex sentences but these are less accurate than simple ones; grammatical errors may be frequent and may cause some difficulty for the reader; punctuation may be faulty.',
      /* 6 */ 'Uses a mix of simple and complex sentence forms; makes some errors in grammar and punctuation but these rarely reduce communication.',
      /* 7 */ 'Uses a variety of complex structures; produces frequent error-free sentences; has good control of grammar and punctuation but may make a few errors.',
      /* 8 */ 'Uses a wide range of structures; the majority of sentences are error-free; makes only very occasional errors or inappropriacies.',
      /* 9 */ 'Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as slips.',
    ]),
  ],
  scoreRange: { min: 0, max: 9, step: 0.5 },
}

// ---------------------------------------------------------------------------
// Registration — merge IELTS rubrics into the global registry
// ---------------------------------------------------------------------------

export const IELTS_RUBRICS = [IELTS_TASK1, IELTS_TASK2]

// Register immediately when this module is imported.
registerRubrics(IELTS_RUBRICS)
