/**
 * Speaking rubrics for CEFR A1–C2, IELTS Speaking, PTE Speaking,
 * and OET Speaking.
 *
 * Same data structure as writing rubrics (SpeakingRubric is a type
 * alias for WritingRubric) — criteria + band descriptors + weighted
 * scoring. This means we reuse computeOverallScore and parseScoringOutput
 * from the writing pipeline with zero code changes.
 *
 * CEFR speaking rubrics use 4 criteria matching the IELTS Speaking
 * assessment criteria: Fluency & Coherence, Lexical Resource,
 * Grammatical Range & Accuracy, and Pronunciation. Descriptors are
 * grounded in the CEFR Companion Volume (2020).
 */

import type { SpeakingRubric } from './types'
import type { RubricCriterion } from '@/writing/types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// The four speaking criteria used at every CEFR level.
const SPEAKING_CRITERIA_IDS = [
  'fluency_coherence',
  'lexical_resource',
  'grammar',
  'pronunciation',
] as const

const CRITERION_NAMES: Record<string, string> = {
  fluency_coherence: 'Fluency and Coherence',
  lexical_resource: 'Lexical Resource',
  grammar: 'Grammatical Range and Accuracy',
  pronunciation: 'Pronunciation',
}

/**
 * Build a CEFR speaking rubric from a level string and descriptor
 * arrays. Same pattern as the writing rubric builder — equal weights
 * (0.25 each) for all four criteria.
 */
function cefrSpeakingRubric(
  level: string,
  max: number,
  descriptors: Record<string, string[]>,
): SpeakingRubric {
  return {
    id: `cefr_${level}_speaking`,
    name: `CEFR ${level.toUpperCase()} Speaking`,
    exam: 'cefr',
    criteria: SPEAKING_CRITERIA_IDS.map((id) => ({
      id,
      name: CRITERION_NAMES[id]!,
      weight: 0.25,
      descriptors: descriptors[id]!.map((desc, i) => ({
        score: i,
        description: desc,
      })),
    })),
    scoreRange: { min: 0, max, step: 1 },
  }
}

// ---------------------------------------------------------------------------
// CEFR A1–C2 speaking rubrics
// ---------------------------------------------------------------------------

const CEFR_SPEAKING: SpeakingRubric[] = [
  // ---- A1: 0–3 scale ----
  cefrSpeakingRubric('a1', 3, {
    fluency_coherence: [
      'Cannot produce connected speech; only isolated words or silence.',
      'Very slow with long pauses; only produces rehearsed phrases with great effort.',
      'Slow but manages simple connected utterances; pauses frequently to search for words but maintains basic communication.',
      'Speaks slowly but with reasonable fluency for A1; pauses are present but do not prevent basic communication.',
    ],
    lexical_resource: [
      'No recognisable vocabulary in context.',
      'Extremely limited vocabulary; only a few isolated words related to the topic.',
      'Uses basic vocabulary about personal and everyday topics; word choice errors occur but meaning is usually clear.',
      'Uses a range of A1 vocabulary accurately for familiar personal topics; occasional errors do not impede.',
    ],
    grammar: [
      'No evidence of sentence formation in speech.',
      'Attempts isolated phrases but cannot form complete sentences.',
      'Produces simple sentences (subject-verb-object) with frequent errors; meaning is usually recoverable.',
      'Uses simple sentence forms with reasonable accuracy; errors are present but the message is always clear.',
    ],
    pronunciation: [
      'Speech is unintelligible.',
      'Pronunciation errors are very frequent; a sympathetic listener can understand only isolated words.',
      'Pronunciation is influenced by the first language but a sympathetic listener can follow most of what is said.',
      'Generally intelligible at A1 level; individual sounds may be imprecise but communication is not impeded.',
    ],
  }),

  // ---- A2: 0–3 scale ----
  cefrSpeakingRubric('a2', 3, {
    fluency_coherence: [
      'Cannot produce connected speech beyond isolated words.',
      'Very hesitant with long pauses; links ideas with the most basic connectors only (and, but).',
      'Speaks with some hesitation but can sustain short stretches of connected speech; uses simple linkers to connect ideas.',
      'Reasonably fluent for A2; can describe experiences and routines with only natural pauses for thought.',
    ],
    lexical_resource: [
      'No functional vocabulary.',
      'Very limited vocabulary; relies on single words and formulaic expressions.',
      'Uses everyday vocabulary adequately; word choice errors are noticeable but meaning is maintained.',
      'Uses a range of A2 vocabulary with some variety; word choice is generally appropriate for the topic.',
    ],
    grammar: [
      'No recognisable sentence structures.',
      'Attempts simple sentences but errors are so frequent that meaning is often unclear.',
      'Produces simple and some compound sentences; errors occur, especially in verb forms, but meaning is clear.',
      'Uses simple and compound sentences with good accuracy; errors are present but do not impede understanding.',
    ],
    pronunciation: [
      'Speech is unintelligible.',
      'Frequent mispronunciations make understanding difficult even for a sympathetic listener.',
      'Pronunciation is generally clear enough to be understood; L1 influence is noticeable but does not prevent communication.',
      'Clear pronunciation for A2; individual sounds are generally accurate and word stress is mostly correct.',
    ],
  }),

  // ---- B1: 0–5 scale ----
  cefrSpeakingRubric('b1', 5, {
    fluency_coherence: [
      'Cannot produce connected speech.',
      'Extremely hesitant; very long pauses even for simple utterances.',
      'Speaks with noticeable hesitation; can maintain speech but with frequent pauses and false starts.',
      'Speaks with some fluency; pauses to plan what to say but maintains the conversation; uses discourse markers (well, so, actually).',
      'Speaks with reasonable fluency; can sustain extended turns with only occasional hesitation; ideas are clearly connected.',
      'Fluent and coherent for B1; speaks at length with natural pausing; uses a range of discourse markers effectively.',
    ],
    lexical_resource: [
      'No functional vocabulary.',
      'Vocabulary is insufficient for the topic; communication breaks down frequently.',
      'Limited vocabulary; relies on repetition and basic words; sometimes has to simplify the message.',
      'Adequate vocabulary for familiar topics; can paraphrase when lacking the exact word; some errors in word choice.',
      'Good range of B1 vocabulary; uses some less common words; word choice is generally precise.',
      'Wide range of vocabulary for familiar topics used naturally and accurately; word choice enhances communication.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Only isolated phrases; no control of sentence structure.',
      'Simple sentences mostly accurate; complex sentences are attempted but often faulty.',
      'Mix of simple and complex sentences with reasonable accuracy; errors in subordination and tense are present but do not impede.',
      'Good range of structures used with general accuracy; complex sentences are mostly well-formed.',
      'Confident use of B1 structures with only occasional slips; speech is grammatically natural for the level.',
    ],
    pronunciation: [
      'Unintelligible.',
      'Frequent mispronunciations impede understanding.',
      'Generally intelligible but L1 influence causes some difficulty; word stress is sometimes misplaced.',
      'Clearly intelligible; mispronunciations are occasional and rarely impede; word stress is mostly correct.',
      'Good pronunciation with clear articulation; intonation is generally appropriate for the context.',
      'Clear and natural pronunciation for B1; stress and intonation support meaning effectively.',
    ],
  }),

  // ---- B2: 0–5 scale ----
  cefrSpeakingRubric('b2', 5, {
    fluency_coherence: [
      'Cannot produce connected speech.',
      'Very hesitant; long pauses and repetition are frequent.',
      'Some fluency but with noticeable effort; can sustain speech on familiar topics but not complex ones.',
      'Speaks with reasonable fluency; can sustain extended discussion; some hesitation when dealing with complex ideas.',
      'Fluent with only occasional pauses to plan; ideas are well-connected with effective discourse management.',
      'Speaks fluently and coherently; develops topics at length with natural turn-taking and smooth topic transitions.',
    ],
    lexical_resource: [
      'No functional vocabulary.',
      'Very limited; communication is severely impaired.',
      'Limited range; relies on common words and struggles with less familiar topics.',
      'Good vocabulary range including some less common items; can discuss a range of topics though with occasional imprecision.',
      'Wide vocabulary used with flexibility; paraphrases effectively; few errors in word choice or collocation.',
      'Rich and precise vocabulary used naturally; collocations and idiomatic language are used effectively.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Very limited structures; errors prevent comprehension.',
      'Limited range of complex structures; errors are frequent when attempting subordination.',
      'Range of complex structures used with reasonable accuracy; errors occur but rarely impede communication.',
      'Wide range of structures used accurately; complex sentences are well-controlled with only occasional errors.',
      'Full range of B2 structures used flexibly and accurately; errors are very rare even in complex constructions.',
    ],
    pronunciation: [
      'Unintelligible.',
      'Frequent pronunciation errors impede understanding.',
      'Generally intelligible but mispronunciations of less common words are noticeable.',
      'Clear pronunciation; L1 influence may be present but does not affect intelligibility; stress and intonation are mostly appropriate.',
      'Good pronunciation with accurate articulation; intonation conveys meaning effectively.',
      'Clear, natural pronunciation; stress, rhythm and intonation patterns are used effectively to convey meaning and attitude.',
    ],
  }),

  // ---- C1: 0–5 scale ----
  cefrSpeakingRubric('c1', 5, {
    fluency_coherence: [
      'Cannot produce connected speech.',
      'Very hesitant; fluency breaks down beyond simple utterances.',
      'Some fluency but speech is not sustained at C1 level; ideas are sometimes disconnected.',
      'Fluent with only minor hesitation when searching for precise language; discourse is well-organised.',
      'Speaks fluently with natural pausing; develops complex topics coherently with sophisticated discourse management.',
      'Effortlessly fluent; speaks at length with sophisticated cohesion, natural rhythm and excellent discourse management.',
    ],
    lexical_resource: [
      'No functional vocabulary.',
      'Very limited; far below C1 expectations.',
      'Adequate vocabulary but lacks the precision and sophistication expected at C1.',
      'Good range of vocabulary including idiomatic and less common items; occasional imprecision in nuanced usage.',
      'Wide and precise vocabulary; uses idiomatic language, collocation and register effectively.',
      'Exceptional vocabulary deployed with precision, nuance and stylistic awareness; indistinguishable from an advanced speaker.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Very limited structures; errors prevent comprehension.',
      'Some complex structures but errors are noticeable and too frequent for C1.',
      'Wide range of structures with consistent accuracy; errors occur only in the most complex constructions.',
      'Full range of structures used flexibly and accurately; very few errors even in complex constructions.',
      'Complete grammatical control with only rare slips; speech is consistently accurate and natural.',
    ],
    pronunciation: [
      'Unintelligible.',
      'Pronunciation errors are frequent and impede comprehension.',
      'Generally clear but pronunciation lacks the precision expected at C1.',
      'Clear and natural pronunciation; stress and intonation are appropriate; L1 influence is minimal.',
      'Precise pronunciation with effective use of stress, intonation and rhythm to convey meaning and attitude.',
      'Near-native pronunciation; phonemic accuracy, stress, rhythm and intonation are consistently precise.',
    ],
  }),

  // ---- C2: 0–5 scale ----
  cefrSpeakingRubric('c2', 5, {
    fluency_coherence: [
      'Cannot produce connected speech.',
      'Very hesitant; far below C2 expectations.',
      'Some fluency but does not sustain the natural, effortless speech expected at C2.',
      'Fluent and well-organised; can develop complex arguments but occasional minor hesitation.',
      'Speaks effortlessly with sophisticated discourse management; arguments are compelling and well-structured.',
      'Indistinguishable from an educated native speaker in fluency, coherence and discourse management.',
    ],
    lexical_resource: [
      'No functional vocabulary.',
      'Very limited; far below C2 expectations.',
      'Adequate but lacks the sophistication and precision expected at C2.',
      'Wide vocabulary with sophisticated items; occasional imprecision in highly nuanced contexts.',
      'Exceptional range and precision; uses idiomatic language, connotation and register with complete control.',
      'Complete mastery of vocabulary; lexical choice is indistinguishable from an educated native speaker.',
    ],
    grammar: [
      'No recognisable grammar.',
      'Very limited structures; far below C2 expectations.',
      'Some range but errors are too frequent for C2.',
      'Full range with high accuracy; very rare errors even in complex constructions.',
      'Complete grammatical control; speech is consistently natural and accurate.',
      'Indistinguishable from a native speaker in grammatical range, accuracy and stylistic control.',
    ],
    pronunciation: [
      'Unintelligible.',
      'Pronunciation is far below C2 expectations.',
      'Generally clear but lacks the precision and naturalness expected at C2.',
      'Clear and natural; stress, intonation and rhythm are used effectively; any L1 influence is negligible.',
      'Near-native pronunciation with precise control of stress, rhythm, intonation and connected speech features.',
      'Indistinguishable from an educated native speaker in all aspects of pronunciation.',
    ],
  }),
]

// ---------------------------------------------------------------------------
// IELTS Speaking rubric — bands 0–9 with 0.5 steps
// ---------------------------------------------------------------------------
// Uses the same four criteria as CEFR speaking (they're the official
// IELTS Speaking criteria). Descriptors at every whole band from 0 to 9.

function ieltsBandDescriptors(descs: string[]): Array<{ score: number; description: string }> {
  return descs.map((d, i) => ({ score: i, description: d }))
}

const IELTS_SPEAKING: SpeakingRubric = {
  id: 'ielts_speaking',
  name: 'IELTS Speaking',
  exam: 'ielts_speaking',
  criteria: [
    {
      id: 'fluency_coherence',
      name: 'Fluency and Coherence',
      weight: 0.25,
      descriptors: ieltsBandDescriptors([
        'Does not attend or does not attempt the format at all.',
        'No communication possible; no rateable language.',
        'Pauses lengthily before most words; little communication possible.',
        'Speaks with long pauses and frequent repetition; meaning is often unclear; limited ability to link simple sentences.',
        'Cannot respond without noticeable pauses; may speak slowly with frequent self-correction; links basic sentences but repetitively.',
        'Usually maintains flow but uses repetition and self-correction; may over-use certain connectors; produces simple speech fluently but loses coherence in complex communication.',
        'Willing to speak at length but coherence is occasionally lost; uses a range of connectives and discourse markers but not always appropriately.',
        'Speaks at length without noticeable effort or loss of coherence; may demonstrate language-related hesitation but uses a range of connectives and discourse markers with some flexibility.',
        'Speaks fluently with only occasional repetition or self-correction; hesitation is usually content-related; develops topics coherently and appropriately.',
        'Speaks fluently with only rare repetition or self-correction; any hesitation is content-related rather than to find words or grammar; speaks coherently with fully appropriate cohesive features.',
      ]),
    },
    {
      id: 'lexical_resource',
      name: 'Lexical Resource',
      weight: 0.25,
      descriptors: ieltsBandDescriptors([
        'Does not attend.',
        'No communication possible.',
        'Only produces isolated words.',
        'Uses simple vocabulary to convey personal information; insufficient vocabulary for less familiar topics.',
        'Can talk about familiar topics but can only convey basic meaning on unfamiliar topics; makes frequent errors in word choice.',
        'Has a sufficient vocabulary to discuss topics at length; meaning is generally clear despite inappropriate word choice; can generally paraphrase successfully.',
        'Has a wide enough vocabulary to discuss topics at length and make meaning clear in spite of inappropriacies; generally paraphrases effectively.',
        'Uses vocabulary resource flexibly to discuss a variety of topics; uses less common and idiomatic vocabulary with some awareness of style and collocation; may produce occasional errors in word choice.',
        'Uses a wide vocabulary resource readily and flexibly to convey precise meanings; uses less common and idiomatic vocabulary skilfully with occasional inaccuracies; uses paraphrase effectively as required.',
        'Uses vocabulary with full flexibility and precision in all topics; uses idiomatic language naturally and accurately.',
      ]),
    },
    {
      id: 'grammar',
      name: 'Grammatical Range and Accuracy',
      weight: 0.25,
      descriptors: ieltsBandDescriptors([
        'Does not attend.',
        'No communication possible.',
        'Cannot produce basic sentence forms.',
        'Attempts basic sentence forms but with limited success; subordinate clauses are rare; errors are frequent.',
        'Produces basic sentence forms and some correct simple sentences but subordinate structures are rarely produced correctly; errors are frequent and may cause some comprehension problems.',
        'Produces basic sentence forms with reasonable accuracy; uses a limited range of more complex structures but errors are frequent.',
        'Mixes simple and complex sentence forms; makes some errors in complex structures but these rarely cause comprehension problems.',
        'Uses a range of complex structures with some flexibility; frequently produces error-free sentences though some grammatical mistakes persist.',
        'Uses a wide range of structures flexibly; produces a majority of error-free sentences with only very occasional inappropriacies or basic errors.',
        'Uses a full range of structures naturally and appropriately; produces consistently accurate structures apart from slips characteristic of native-speaker speech.',
      ]),
    },
    {
      id: 'pronunciation',
      name: 'Pronunciation',
      weight: 0.25,
      descriptors: ieltsBandDescriptors([
        'Does not attend.',
        'No communication possible.',
        'Speech is often unintelligible.',
        'Mispronunciations are frequent and cause some difficulty for the listener; shows some features of bands below.',
        'Mispronunciations are frequent and cause some difficulty for the listener; uses a limited range of pronunciation features.',
        'Shows all the positive features of Band 4 and some of Band 6; mispronunciations are frequent but usually do not impede understanding.',
        'Uses a range of pronunciation features with mixed control; can generally be understood throughout though mispronunciation occasionally causes listener difficulty.',
        'Shows all the positive features of Band 6 and some of Band 8; uses a range of pronunciation features with general control.',
        'Uses a wide range of pronunciation features; sustains flexible use of features throughout; is easy to understand; L1 accent has minimal effect on intelligibility.',
        'Uses a full range of pronunciation features with precision and subtlety; sustains flexible use of features throughout; is effortless to understand.',
      ]),
    },
  ],
  scoreRange: { min: 0, max: 9, step: 0.5 },
}

// ---------------------------------------------------------------------------
// PTE Speaking rubric — Content, Oral Fluency, Pronunciation (0–5 each)
// ---------------------------------------------------------------------------

const PTE_SPEAKING: SpeakingRubric = {
  id: 'pte_speaking',
  name: 'PTE Academic Speaking',
  exam: 'pte_speaking',
  criteria: [
    {
      id: 'content',
      name: 'Content',
      weight: 0.34,
      descriptors: [
        { score: 0, description: 'No content is communicated; response is completely off-topic or no attempt.' },
        { score: 1, description: 'Very limited relevant content; only isolated relevant words or phrases.' },
        { score: 2, description: 'Some relevant content but many key points are missing or misrepresented.' },
        { score: 3, description: 'Most key points are covered with some relevant detail; some omissions or minor inaccuracies.' },
        { score: 4, description: 'All key points are covered with appropriate detail and accuracy.' },
        { score: 5, description: 'Comprehensive coverage of all key points with well-chosen detail and complete accuracy.' },
      ],
    },
    {
      id: 'oral_fluency',
      name: 'Oral Fluency',
      weight: 0.33,
      descriptors: [
        { score: 0, description: 'No fluent speech produced; silence or only isolated words.' },
        { score: 1, description: 'Extremely hesitant with very long pauses; only short bursts of speech.' },
        { score: 2, description: 'Hesitant speech with frequent long pauses and repetitions; rhythm is uneven.' },
        { score: 3, description: 'Speech flows at an acceptable rate with some hesitation; pauses occur but do not significantly impede communication.' },
        { score: 4, description: 'Smooth, well-paced speech with only occasional hesitation; natural rhythm and stress patterns.' },
        { score: 5, description: 'Native-like fluency; speech flows naturally with appropriate pacing, rhythm and stress throughout.' },
      ],
    },
    {
      id: 'pronunciation',
      name: 'Pronunciation',
      weight: 0.33,
      descriptors: [
        { score: 0, description: 'Unintelligible; no recognisable English sounds.' },
        { score: 1, description: 'Very difficult to understand; frequent mispronunciations of vowels and consonants.' },
        { score: 2, description: 'Understandable with effort; noticeable mispronunciations affect clarity.' },
        { score: 3, description: 'Generally clear pronunciation; some L1 influence but does not impede understanding.' },
        { score: 4, description: 'Clear and accurate pronunciation; stress and intonation are mostly appropriate.' },
        { score: 5, description: 'Native-like pronunciation; all phonemes, stress patterns and intonation are precise and natural.' },
      ],
    },
  ],
  scoreRange: { min: 0, max: 5, step: 1 },
}

// ---------------------------------------------------------------------------
// OET Speaking rubric — 5 criteria matching the OET assessment criteria
// ---------------------------------------------------------------------------
// OET uses letter grades (A=top, E=bottom) mapped to numbers 0–5.
// Criteria cover the clinical communication skills tested in role plays.

const OET_SPEAKING: SpeakingRubric = {
  id: 'oet_speaking',
  name: 'OET Speaking',
  exam: 'oet_speaking',
  criteria: [
    {
      id: 'intelligibility',
      name: 'Intelligibility',
      weight: 0.20,
      descriptors: [
        { score: 0, description: 'Unintelligible throughout; cannot be understood by the interlocutor.' },
        { score: 1, description: 'Very difficult to understand; intelligibility frequently breaks down.' },
        { score: 2, description: 'Sometimes difficult to understand; pronunciation and intonation errors impede at times.' },
        { score: 3, description: 'Generally intelligible; occasional mispronunciations do not significantly impede understanding.' },
        { score: 4, description: 'Clearly intelligible throughout; only very minor pronunciation issues.' },
        { score: 5, description: 'Fully intelligible; speech is clear, natural and easy to understand at all times.' },
      ],
    },
    {
      id: 'fluency',
      name: 'Fluency',
      weight: 0.20,
      descriptors: [
        { score: 0, description: 'No connected speech; only isolated words or silence.' },
        { score: 1, description: 'Very hesitant; extended pauses and frequent breakdowns in flow.' },
        { score: 2, description: 'Noticeable hesitation; can sustain speech but with frequent pausing and self-correction.' },
        { score: 3, description: 'Adequate fluency; can maintain the consultation with some pausing for thought.' },
        { score: 4, description: 'Good fluency; speech flows well with only occasional natural pauses.' },
        { score: 5, description: 'Natural, effortless fluency; speech flows smoothly throughout the consultation.' },
      ],
    },
    {
      id: 'appropriateness',
      name: 'Appropriateness of Language',
      weight: 0.20,
      descriptors: [
        { score: 0, description: 'No appropriate language used; communication fails entirely.' },
        { score: 1, description: 'Language is largely inappropriate for the clinical context; may use excessive jargon or be too informal.' },
        { score: 2, description: 'Some appropriate language but register is inconsistent; may alternate between jargon and lay terms.' },
        { score: 3, description: 'Generally appropriate language for the clinical context; uses lay terms when explaining to patients with only occasional lapses.' },
        { score: 4, description: 'Consistently appropriate language; adjusts register effectively for the clinical context; explains medical terms clearly.' },
        { score: 5, description: 'Fully appropriate language throughout; demonstrates excellent awareness of register, empathy markers and patient-centred communication.' },
      ],
    },
    {
      id: 'resources_of_grammar_and_expression',
      name: 'Resources of Grammar and Expression',
      weight: 0.20,
      descriptors: [
        { score: 0, description: 'No grammatical control; communication is impossible.' },
        { score: 1, description: 'Very limited grammar; only isolated phrases; errors prevent comprehension.' },
        { score: 2, description: 'Basic grammar with frequent errors; meaning is sometimes unclear.' },
        { score: 3, description: 'Adequate grammar with some errors; can express ideas with reasonable clarity.' },
        { score: 4, description: 'Good grammatical range and accuracy; complex ideas are expressed clearly with only minor errors.' },
        { score: 5, description: 'Full grammatical control; expresses complex clinical and interpersonal content with precision and natural fluency.' },
      ],
    },
    {
      id: 'clinical_communication',
      name: 'Relationship Building and Clinical Communication',
      weight: 0.20,
      descriptors: [
        { score: 0, description: 'No attempt at clinical communication; no rapport established.' },
        { score: 1, description: 'Minimal attempt at rapport; clinical information is disorganised or missing.' },
        { score: 2, description: 'Some attempt at rapport but communication is not patient-centred; information gathering is incomplete.' },
        { score: 3, description: 'Adequate clinical communication; gathers relevant information and shows some empathy; explanation is mostly clear.' },
        { score: 4, description: 'Good clinical communication; builds rapport effectively; gathers comprehensive information and explains clearly.' },
        { score: 5, description: 'Excellent clinical communication; demonstrates strong empathy, active listening, and patient-centred approach throughout; information is gathered and delivered expertly.' },
      ],
    },
  ],
  scoreRange: { min: 0, max: 5, step: 1 },
}

// ---------------------------------------------------------------------------
// Registry — all speaking rubrics in one place
// ---------------------------------------------------------------------------

const ALL_SPEAKING_RUBRICS: SpeakingRubric[] = [
  ...CEFR_SPEAKING,
  IELTS_SPEAKING,
  PTE_SPEAKING,
  OET_SPEAKING,
]

const RUBRIC_MAP = new Map(ALL_SPEAKING_RUBRICS.map((r) => [r.id, r]))

/**
 * Get a speaking rubric by its unique id.
 * Returns null if the id doesn't match any registered rubric.
 */
export function getSpeakingRubric(id: string): SpeakingRubric | null {
  return RUBRIC_MAP.get(id) ?? null
}

/**
 * List all registered speaking rubrics.
 */
export function listSpeakingRubrics(): SpeakingRubric[] {
  return [...ALL_SPEAKING_RUBRICS]
}
