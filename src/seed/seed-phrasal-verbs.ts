// # ═══════════════════════════════════════════════════════════════════════════
// # PHRASAL VERBS — A2 through C2
// # ═══════════════════════════════════════════════════════════════════════════
// # All content is original and copyright-free.
// # A2: basic daily life (get up, turn on, put on)
// # B1: work/travel/social (check in, fill in, sort out)
// # B2: formal register + nuance (put forward, carry out, break down)
// # C1: academic/professional (account for, stem from, draw on)
// # C2: rare/literary/idiomatic (prevail upon, bear out, hold forth)

import type { UnifiedSeedItem } from './run-seed'

export const SEED_PHRASAL_VERBS: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # A2 — Basic Daily Life Phrasal Verbs
  // # Concrete, high-frequency verbs learners encounter every day.
  // # ═══════════════════════════════════════════════════════════════════

  // # MCQ — choose the correct phrasal verb
  {
    id: 'pv.a2.01', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'I ______ at 7 o\'clock every morning.',
      options: [
        { text: 'get up', misconception: null },
        { text: 'get on', misconception: 'get on = board a vehicle, not wake up' },
        { text: 'get off', misconception: 'get off = leave a vehicle' },
        { text: 'get in', misconception: 'get in = enter a car/taxi' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'pv.a2.02', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'It\'s cold outside. You should ______ a jacket.',
      options: [
        { text: 'put on', misconception: null },
        { text: 'put off', misconception: 'put off = delay/postpone' },
        { text: 'put out', misconception: 'put out = extinguish a fire' },
        { text: 'put up', misconception: 'put up = hang/display or tolerate' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'pv.a2.03', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Can you ______ the light? It\'s too dark in here.',
      options: [
        { text: 'turn off', misconception: 'turn off would make it darker' },
        { text: 'turn on', misconception: null },
        { text: 'turn up', misconception: 'turn up = increase volume, not switch on' },
        { text: 'turn over', misconception: 'turn over = flip something' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'pv.a2.04', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'I\'m ______ my keys. Have you seen them?',
      options: [
        { text: 'looking at', misconception: 'looking at = watching, not searching' },
        { text: 'looking for', misconception: null },
        { text: 'looking after', misconception: 'looking after = taking care of' },
        { text: 'looking up', misconception: 'looking up = searching in a dictionary/online' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },

  // # Gap fill — complete the sentence with the correct particle
  {
    id: 'pv.a2.05', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Please sit ______ . The doctor will see you soon.',
      gaps: [{ position: 0, answer: 'down', distractors: ['up', 'on', 'in'] }],
      difficulty: 0.25,
    },
  },
  {
    id: 'pv.a2.06', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'I need to take ______ my shoes before I go inside.',
      gaps: [{ position: 0, answer: 'off', distractors: ['on', 'up', 'out'] }],
      difficulty: 0.25,
    },
  },
  {
    id: 'pv.a2.07', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'Can I try ______ this dress? Where is the fitting room?',
      gaps: [{ position: 0, answer: 'on', distractors: ['off', 'up', 'out'] }],
      difficulty: 0.3,
    },
  },

  // # Matching — pair phrasal verbs with their meanings
  {
    id: 'pv.a2.08', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match each phrasal verb to its meaning.',
      pairs: [
        { left: 'wake up', right: 'stop sleeping' },
        { left: 'pick up', right: 'lift something from a surface' },
        { left: 'give back', right: 'return something' },
        { left: 'throw away', right: 'put in the rubbish bin' },
      ],
      difficulty: 0.25,
    },
  },
  {
    id: 'pv.a2.09', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'Match each phrasal verb to its meaning.',
      pairs: [
        { left: 'get on', right: 'board a bus or train' },
        { left: 'get off', right: 'leave a bus or train' },
        { left: 'get in', right: 'enter a car or taxi' },
        { left: 'set off', right: 'begin a journey' },
      ],
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # B1 — Work, Travel & Social Phrasal Verbs
  // # More abstract meanings, separable vs inseparable distinction.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pv.b1.01', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'We need to ______ this problem before it gets worse.',
      options: [
        { text: 'sort out', misconception: null },
        { text: 'sort off', misconception: 'sort off is not a phrasal verb' },
        { text: 'sort up', misconception: 'sort up is not a phrasal verb' },
        { text: 'sort in', misconception: 'sort in is not a phrasal verb' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'pv.b1.02', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'I ______ an interesting article about climate change while browsing online.',
      options: [
        { text: 'came across', misconception: null },
        { text: 'came up', misconception: 'came up = arose/appeared, not found by chance' },
        { text: 'came out', misconception: 'came out = was published/released' },
        { text: 'came off', misconception: 'came off = detached or succeeded' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'pv.b1.03', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'Could you ______ this form, please? We need your name and address.',
      options: [
        { text: 'fill out', misconception: null },
        { text: 'fill up', misconception: 'fill up = make completely full (a tank, a glass)' },
        { text: 'fill off', misconception: 'fill off is not a phrasal verb' },
        { text: 'fill over', misconception: 'fill over is not a phrasal verb' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'pv.b1.04', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'The manager wants to ______ the complaints from last week.',
      options: [
        { text: 'look into', misconception: null },
        { text: 'look after', misconception: 'look after = take care of someone' },
        { text: 'look out', misconception: 'look out = be careful' },
        { text: 'look over', misconception: 'look over = review quickly, not investigate' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },

  // # Gap fill — particles in context
  {
    id: 'pv.b1.05', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'We need to find ______ what time the meeting starts.',
      gaps: [{ position: 0, answer: 'out', distractors: ['up', 'in', 'off'] }],
      difficulty: 0.35,
    },
  },
  {
    id: 'pv.b1.06', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'We checked ______ at the hotel at 3 p.m. and went straight to the pool.',
      gaps: [{ position: 0, answer: 'in', distractors: ['out', 'on', 'up'] }],
      difficulty: 0.35,
    },
  },
  {
    id: 'pv.b1.07', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'The taxi will pick you ______ at the airport at noon.',
      gaps: [{ position: 0, answer: 'up', distractors: ['on', 'in', 'out'] }],
      difficulty: 0.35,
    },
  },

  // # Matching — phrasal verbs to definitions
  {
    id: 'pv.b1.08', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'Match each phrasal verb to its meaning.',
      pairs: [
        { left: 'carry on', right: 'continue doing something' },
        { left: 'give up', right: 'stop trying' },
        { left: 'put off', right: 'delay or postpone' },
        { left: 'look forward to', right: 'feel excited about a future event' },
      ],
      difficulty: 0.4,
    },
  },
  {
    id: 'pv.b1.09', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'Match each phrasal verb to its meaning.',
      pairs: [
        { left: 'bring back', right: 'return something to its place' },
        { left: 'take up', right: 'start a new hobby or activity' },
        { left: 'run out of', right: 'have none left' },
        { left: 'get along with', right: 'have a good relationship with' },
      ],
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # B2 — Formal Register & Nuance
  // # Phrasal verb ↔ formal single-word synonym pairs.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pv.b2.01', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The committee decided to ______ the proposal until next month.',
      options: [
        { text: 'put off', misconception: null },
        { text: 'put out', misconception: 'put out = extinguish or publish' },
        { text: 'put away', misconception: 'put away = store in its place' },
        { text: 'put through', misconception: 'put through = connect a phone call' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },
  {
    id: 'pv.b2.02', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'She ______ a brilliant idea during the brainstorming session.',
      options: [
        { text: 'came up with', misconception: null },
        { text: 'came out with', misconception: 'came out with = said something unexpected' },
        { text: 'came down with', misconception: 'came down with = became ill' },
        { text: 'came along with', misconception: 'came along with = accompanied' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },
  {
    id: 'pv.b2.03', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The scientists ______ a series of experiments to test the hypothesis.',
      options: [
        { text: 'carried out', misconception: null },
        { text: 'carried on', misconception: 'carried on = continued, not conducted' },
        { text: 'carried off', misconception: 'carried off = won or managed successfully' },
        { text: 'carried away', misconception: 'got carried away = became too excited' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },

  // # Sentence transform — replace phrasal verb with formal synonym
  {
    id: 'pv.b2.04', type: 'sentence_transform', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      originalSentence: 'They turned down the job offer because the salary was too low.',
      keyWord: 'rejected',
      acceptedAnswers: [
        'They rejected the job offer because the salary was too low.',
      ],
      explanation: '"Turn down" = reject. In formal writing, use "reject" instead of the phrasal verb.',
      difficulty: 0.5,
    },
  },
  {
    id: 'pv.b2.05', type: 'sentence_transform', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      originalSentence: 'The manager brought up the issue of staff shortages at the meeting.',
      keyWord: 'raised',
      acceptedAnswers: [
        'The manager raised the issue of staff shortages at the meeting.',
      ],
      explanation: '"Bring up" = raise (a topic). "Raise" is the formal single-word equivalent.',
      difficulty: 0.5,
    },
  },
  {
    id: 'pv.b2.06', type: 'sentence_transform', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      originalSentence: 'The company had to lay off 200 workers due to falling profits.',
      keyWord: 'make redundant',
      acceptedAnswers: [
        'The company had to make 200 workers redundant due to falling profits.',
        'The company had to make redundant 200 workers due to falling profits.',
      ],
      explanation: '"Lay off" = make redundant. In formal business English, "make redundant" is preferred.',
      difficulty: 0.55,
    },
  },

  // # Matching — phrasal verb to formal equivalent
  {
    id: 'pv.b2.07', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'Match each phrasal verb to its formal single-word equivalent.',
      pairs: [
        { left: 'put forward', right: 'propose' },
        { left: 'break down', right: 'analyse' },
        { left: 'make up for', right: 'compensate' },
        { left: 'look into', right: 'investigate' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'pv.b2.08', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'Match each phrasal verb to its formal single-word equivalent.',
      pairs: [
        { left: 'set up', right: 'establish' },
        { left: 'point out', right: 'indicate' },
        { left: 'take over', right: 'assume control' },
        { left: 'put up with', right: 'tolerate' },
      ],
      difficulty: 0.5,
    },
  },

  // # Gap fill
  {
    id: 'pv.b2.09', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'Let\'s break the problem ______ into smaller parts and tackle each one separately.',
      gaps: [{ position: 0, answer: 'down', distractors: ['up', 'off', 'out'] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'pv.b2.10', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'I don\'t know how she puts ______ with all that noise from the construction site.',
      gaps: [{ position: 0, answer: 'up', distractors: ['on', 'off', 'out'] }],
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C1 — Academic & Professional Phrasal Verbs
  // # Used in academic writing, presentations, and formal reports.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pv.c1.01', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'This discrepancy could ______ the differences in sampling methodology.',
      options: [
        { text: 'account for', misconception: null },
        { text: 'account to', misconception: 'account to is not standard — "account for" means explain' },
        { text: 'account on', misconception: 'account on is not a phrasal verb' },
        { text: 'account with', misconception: 'account with is not a phrasal verb' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },
  {
    id: 'pv.c1.02', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The author ______ earlier research to support her argument about language acquisition.',
      options: [
        { text: 'draws on', misconception: null },
        { text: 'draws up', misconception: 'draws up = creates a plan or document' },
        { text: 'draws out', misconception: 'draws out = prolongs or extracts' },
        { text: 'draws in', misconception: 'draws in = attracts or involves' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },
  {
    id: 'pv.c1.03', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The increase in temperature has ______ significant changes in migration patterns.',
      options: [
        { text: 'brought about', misconception: null },
        { text: 'brought up', misconception: 'brought up = raised a topic or raised a child' },
        { text: 'brought in', misconception: 'brought in = introduced or earned' },
        { text: 'brought out', misconception: 'brought out = published or revealed' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },

  // # Gap fill — academic context
  {
    id: 'pv.c1.04', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The government plans to phase ______ the use of fossil fuels by 2050.',
      gaps: [{ position: 0, answer: 'out', distractors: ['in', 'off', 'up'] }],
      difficulty: 0.55,
    },
  },
  {
    id: 'pv.c1.05', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'These findings stem ______ a decade-long longitudinal study of rural communities.',
      gaps: [{ position: 0, answer: 'from', distractors: ['out', 'off', 'up'] }],
      difficulty: 0.6,
    },
  },
  {
    id: 'pv.c1.06', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The report sets ______ to examine the long-term effects of remote working on productivity.',
      gaps: [{ position: 0, answer: 'out', distractors: ['up', 'off', 'in'] }],
      difficulty: 0.55,
    },
  },

  // # Matching — academic phrasal verbs to definitions
  {
    id: 'pv.c1.07', type: 'matching', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'Match each academic phrasal verb to its meaning.',
      pairs: [
        { left: 'rule out', right: 'eliminate as a possibility' },
        { left: 'build on', right: 'use as a foundation for further development' },
        { left: 'touch on', right: 'mention briefly without detail' },
        { left: 'boil down to', right: 'can be summarised as' },
      ],
      difficulty: 0.6,
    },
  },

  // # Error correction — wrong particle
  {
    id: 'pv.c1.08', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      sentence: 'The rapid urbanisation gave raise to a host of environmental problems.',
      errorPart: 'gave raise to',
      correction: 'gave rise to',
      explanation: 'The correct phrasal verb is "give rise to" (cause/produce), not "give raise to".',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C2 — Rare, Literary & Idiomatic Phrasal Verbs
  // # Low-frequency verbs found in literature, formal speeches, and
  // # advanced academic prose.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pv.c2.01', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The prime minister was ______ to reconsider the policy after intense lobbying from industry leaders.',
      options: [
        { text: 'prevailed upon', misconception: null },
        { text: 'prevailed over', misconception: 'prevailed over = defeated or overcame' },
        { text: 'prevailed in', misconception: 'prevailed in is not standard' },
        { text: 'prevailed with', misconception: 'prevailed with is not standard' },
      ],
      correctIndex: 0,
      difficulty: 0.75,
    },
  },
  {
    id: 'pv.c2.02', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'Subsequent research has largely ______ the original hypothesis about neural plasticity.',
      options: [
        { text: 'borne out', misconception: null },
        { text: 'borne up', misconception: 'borne up = endured under pressure' },
        { text: 'borne down', misconception: 'borne down = pressed heavily upon' },
        { text: 'borne in', misconception: 'borne in on = made to realise (different meaning)' },
      ],
      correctIndex: 0,
      difficulty: 0.75,
    },
  },
  {
    id: 'pv.c2.03', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The politician ______ for nearly an hour on the virtues of fiscal responsibility.',
      options: [
        { text: 'held forth', misconception: null },
        { text: 'held up', misconception: 'held up = delayed or robbed' },
        { text: 'held out', misconception: 'held out = offered or resisted' },
        { text: 'held on', misconception: 'held on = waited or gripped tightly' },
      ],
      correctIndex: 0,
      difficulty: 0.75,
    },
  },

  // # Gap fill — literary register
  {
    id: 'pv.c2.04', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The novel harks ______ to the pastoral traditions of 18th-century English literature.',
      gaps: [{ position: 0, answer: 'back', distractors: ['on', 'up', 'down'] }],
      difficulty: 0.7,
    },
  },
  {
    id: 'pv.c2.05', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'Many countries have sought to do ______ with outdated regulations that stifle innovation.',
      gaps: [{ position: 0, answer: 'away', distractors: ['off', 'out', 'up'] }],
      difficulty: 0.7,
    },
  },

  // # Matching — rare phrasal verbs
  {
    id: 'pv.c2.06', type: 'matching', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'Match each phrasal verb to its meaning.',
      pairs: [
        { left: 'see to it that', right: 'ensure or make certain' },
        { left: 'make good on', right: 'fulfil a promise or obligation' },
        { left: 'fly in the face of', right: 'contradict or challenge openly' },
        { left: 'get wind of', right: 'hear a rumour about' },
      ],
      difficulty: 0.75,
    },
  },

  // # Sentence transform — literary to neutral
  {
    id: 'pv.c2.07', type: 'sentence_transform', level: 'C2', skill: 'writing',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      originalSentence: 'The evidence flies in the face of conventional wisdom about economic growth.',
      keyWord: 'contradicts',
      acceptedAnswers: [
        'The evidence contradicts conventional wisdom about economic growth.',
      ],
      explanation: '"Fly in the face of" = contradict or go against. The single-word formal equivalent is "contradict".',
      difficulty: 0.7,
    },
  },
]
