// # ═══════════════════════════════════════════════════════════════════════════
// # GRAMMAR BOOST — Advanced Structures for C1 & C2
// # ═══════════════════════════════════════════════════════════════════════════
// # All content is original and copyright-free.
// # Fills gaps in advanced grammar: mixed conditionals, participle clauses,
// # ellipsis, fronting, nominal clauses, advanced passive patterns.
// # Uses existing grammar nodes + can-do nodes from the skill graph.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_GRAMMAR_BOOST: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # C1 — Mixed Conditionals
  // # Past condition → present result, and present condition → past result.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'gramb.c1.01', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: {
      stem: 'If I ______ harder at university, I ______ a better job now. (mixed conditional: past → present)',
      options: [
        { text: 'had studied / would have', misconception: null },
        { text: 'studied / would have', misconception: 'Past simple in the if-clause does not create a mixed conditional about the past' },
        { text: 'had studied / will have', misconception: '"Will" cannot follow a past hypothetical if-clause' },
        { text: 'have studied / would have', misconception: 'Present perfect does not create a hypothetical past condition' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },
  {
    id: 'gramb.c1.02', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: {
      stem: 'If she ______ so stubborn, she ______ the compromise yesterday. (mixed conditional: present → past)',
      options: [
        { text: 'weren\'t / would have accepted', misconception: null },
        { text: 'hadn\'t been / would accept', misconception: 'This reverses the time references — the condition is about her present character' },
        { text: 'isn\'t / would have accepted', misconception: '"Isn\'t" is indicative, not subjunctive — use "weren\'t" for hypothetical present' },
        { text: 'weren\'t / would accept', misconception: '"Would accept" refers to the present/future, but the result happened yesterday' },
      ],
      correctIndex: 0,
      difficulty: 0.65,
    },
  },
  {
    id: 'gramb.c1.03', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.b2.conditionals'],
    payload: {
      originalSentence: 'He didn\'t learn to drive, so he can\'t get to work easily now.',
      keyWord: 'if',
      acceptedAnswers: [
        'If he had learned to drive, he could get to work easily now.',
        'If he had learnt to drive, he could get to work easily now.',
        'If he had learned to drive, he would be able to get to work easily now.',
        'If he had learnt to drive, he would be able to get to work easily now.',
      ],
      explanation: 'Mixed conditional: past condition (had learned) → present result (could get). The if-clause is third conditional, the main clause is second conditional.',
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C1 — Participle Clauses
  // # Replacing relative clauses and adverbial clauses with participles.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'gramb.c1.04', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      originalSentence: 'Because she had finished her assignment early, she decided to go for a walk.',
      keyWord: 'having',
      acceptedAnswers: [
        'Having finished her assignment early, she decided to go for a walk.',
      ],
      explanation: 'A perfect participle clause ("Having + past participle") replaces "Because + past perfect" when the subjects match. It makes writing more concise and formal.',
      difficulty: 0.6,
    },
  },
  {
    id: 'gramb.c1.05', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      originalSentence: 'The students who were sitting at the back could not hear the lecturer.',
      keyWord: 'sitting',
      acceptedAnswers: [
        'The students sitting at the back could not hear the lecturer.',
      ],
      explanation: 'A present participle replaces "who were + -ing" in defining relative clauses. This is common in formal and academic English.',
      difficulty: 0.55,
    },
  },
  {
    id: 'gramb.c1.06', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      stem: '______ by the results, the team decided to expand the study.',
      options: [
        { text: 'Encouraged', misconception: null },
        { text: 'Encouraging', misconception: 'The team was encouraged (passive), not encouraging others' },
        { text: 'Having encouraging', misconception: 'Grammatically incorrect — "Having" needs a past participle' },
        { text: 'To encourage', misconception: 'An infinitive of purpose does not fit here — the cause came before the decision' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },
  {
    id: 'gramb.c1.07', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      sentence: 'Walking along the beach, the sunset was breathtaking.',
      errorPart: 'Walking along the beach, the sunset',
      correction: 'Walking along the beach, we found the sunset',
      explanation: 'Dangling participle: "Walking" must share its subject with the main clause. The sunset wasn\'t walking — people were. Add a logical subject.',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C1 — Ellipsis & Substitution
  // # Omitting repeated words for conciseness in formal writing.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'gramb.c1.08', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      stem: '"Would you like to come to the party?" "I\'d love ______."',
      options: [
        { text: 'to', misconception: null },
        { text: 'it', misconception: '"I\'d love it" changes the meaning — ellipsis after "to" is the natural reply' },
        { text: 'that', misconception: '"I\'d love that" works but is not ellipsis — the question tests ellipsis of the infinitive' },
        { text: 'so', misconception: '"I\'d love so" is not grammatical' },
      ],
      correctIndex: 0,
      difficulty: 0.55,
    },
  },
  {
    id: 'gramb.c1.09', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      stem: '"Is it going to rain tomorrow?" "I don\'t think ______."',
      options: [
        { text: 'so', misconception: null },
        { text: 'it', misconception: '"I don\'t think it" is incomplete — needs "will" to finish' },
        { text: 'that', misconception: '"I don\'t think that" needs a full clause to follow' },
        { text: 'not', misconception: '"I don\'t think not" is a double negative' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C1 — Fronting (Moving elements for emphasis)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'gramb.c1.10', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      originalSentence: 'I have never seen such a beautiful performance.',
      keyWord: 'never',
      acceptedAnswers: [
        'Never have I seen such a beautiful performance.',
      ],
      explanation: 'When a negative adverbial ("never", "rarely", "seldom") is fronted, the subject and auxiliary verb invert. This creates emphasis and is common in formal English.',
      difficulty: 0.6,
    },
  },
  {
    id: 'gramb.c1.11', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      originalSentence: 'The government not only raised taxes but also cut public services.',
      keyWord: 'not only',
      acceptedAnswers: [
        'Not only did the government raise taxes, but it also cut public services.',
        'Not only did the government raise taxes but also cut public services.',
        'Not only did the government raise taxes, but they also cut public services.',
      ],
      explanation: '"Not only" at the start triggers inversion (did + subject + base verb). The second clause with "but also" does not invert.',
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C2 — Nominal Clauses & Advanced Patterns
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'gramb.c2.01', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: 'The board demanded that the CEO ______ immediately.',
      options: [
        { text: 'resign', misconception: null },
        { text: 'resigns', misconception: 'After "demand that", the mandative subjunctive uses the base form, not third person -s' },
        { text: 'resigned', misconception: 'Past tense is not used in the mandative subjunctive' },
        { text: 'would resign', misconception: '"Would" is not used in the mandative subjunctive after "demand that"' },
      ],
      correctIndex: 0,
      difficulty: 0.7,
    },
  },
  {
    id: 'gramb.c2.02', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: '______ as it may seem, the experiment yielded no significant results.',
      options: [
        { text: 'Surprising', misconception: null },
        { text: 'Surprised', misconception: '"Surprised as it may seem" is ungrammatical — the concessive clause needs the -ing form here' },
        { text: 'To surprise', misconception: 'The infinitive does not fit this concessive pattern' },
        { text: 'Having surprised', misconception: 'The perfect participle is too complex for this concessive pattern' },
      ],
      correctIndex: 0,
      difficulty: 0.7,
    },
  },
  {
    id: 'gramb.c2.03', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: '______ it not been for the quick intervention of the emergency services, the outcome would have been catastrophic.',
      options: [
        { text: 'Had', misconception: null },
        { text: 'Has', misconception: '"Has it not been" is present tense — the context is past hypothetical' },
        { text: 'If', misconception: '"If it not been" is ungrammatical — needs "If it had not been" or inverted "Had it not been"' },
        { text: 'Were', misconception: '"Were it not been" mixes two conditional patterns incorrectly' },
      ],
      correctIndex: 0,
      difficulty: 0.75,
    },
  },

  // # C2 — Advanced Passive & Causative Patterns
  {
    id: 'gramb.c2.04', type: 'sentence_transform', level: 'C2', skill: 'writing',
    nodeIds: ['gram.b2.passive'],
    payload: {
      originalSentence: 'People believe that the ancient city was destroyed by an earthquake.',
      keyWord: 'believed',
      acceptedAnswers: [
        'The ancient city is believed to have been destroyed by an earthquake.',
      ],
      explanation: 'Impersonal passive with infinitive: "People believe X did Y" → "X is believed to have done Y". Common in academic and news writing for distancing.',
      difficulty: 0.7,
    },
  },
  {
    id: 'gramb.c2.05', type: 'sentence_transform', level: 'C2', skill: 'writing',
    nodeIds: ['gram.b2.passive'],
    payload: {
      originalSentence: 'They say the company is planning a major restructure.',
      keyWord: 'said',
      acceptedAnswers: [
        'The company is said to be planning a major restructure.',
      ],
      explanation: '"They say X is doing Y" → "X is said to be doing Y". The passive reporting structure distances the writer from the claim.',
      difficulty: 0.7,
    },
  },

  // # C2 — Concessive & Contrastive Clauses
  {
    id: 'gramb.c2.06', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: '______ hard she tried, she could not solve the final equation.',
      options: [
        { text: 'However', misconception: null },
        { text: 'Whatever', misconception: '"Whatever" needs a noun: "Whatever effort she made"' },
        { text: 'Although', misconception: '"Although hard she tried" is ungrammatical — "Although she tried hard" is correct but not the tested pattern' },
        { text: 'Despite', misconception: '"Despite" takes a noun or gerund, not an adjective + clause' },
      ],
      correctIndex: 0,
      difficulty: 0.65,
    },
  },

  // # C2 — Cleft Sentences (Advanced Patterns)
  {
    id: 'gramb.c2.07', type: 'sentence_transform', level: 'C2', skill: 'writing',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      originalSentence: 'The lack of funding caused the project to fail.',
      keyWord: 'what',
      acceptedAnswers: [
        'What caused the project to fail was the lack of funding.',
      ],
      explanation: 'Wh-cleft: "What + verb phrase + was + focus". Puts emphasis on "the lack of funding" by placing it at the end (end-focus principle).',
      difficulty: 0.65,
    },
  },
  {
    id: 'gramb.c2.08', type: 'sentence_transform', level: 'C2', skill: 'writing',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      originalSentence: 'Her determination impressed the judges most.',
      keyWord: 'it',
      acceptedAnswers: [
        'It was her determination that impressed the judges most.',
        'It was her determination which impressed the judges most.',
      ],
      explanation: 'It-cleft: "It + was + focus + that/who + rest". Emphasises "her determination" by extracting it into the cleft position.',
      difficulty: 0.6,
    },
  },

  // # C2 — Error Correction (Advanced Grammar Mistakes)
  {
    id: 'gramb.c2.09', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      sentence: 'The committee recommended that the policy is revised before implementation.',
      errorPart: 'is revised',
      correction: 'be revised',
      explanation: 'After "recommend that", the mandative subjunctive requires the base form: "be revised", not "is revised". This applies to all verbs after demand, suggest, insist, recommend + that.',
      difficulty: 0.7,
    },
  },
  {
    id: 'gramb.c2.10', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      sentence: 'Hardly he had sat down when the phone rang.',
      errorPart: 'Hardly he had',
      correction: 'Hardly had he',
      explanation: '"Hardly" at the beginning triggers inversion: "Hardly had he sat down when..." The auxiliary "had" must come before the subject "he".',
      difficulty: 0.65,
    },
  },
]
