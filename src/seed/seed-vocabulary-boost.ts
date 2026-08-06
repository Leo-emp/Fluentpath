// # ═══════════════════════════════════════════════════════════════════════════
// # VOCABULARY BOOST — Dedicated Vocabulary Exercises A1 through C2
// # ═══════════════════════════════════════════════════════════════════════════
// # All content is original and copyright-free.
// # Covers: definitions, context clues, collocations, word families,
// # academic vocabulary, and idiomatic expressions.
// # Each level targets the appropriate lexical skill graph node.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_VOCABULARY_BOOST: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # A1 — Everyday Objects, Body, Food, Colours
  // # Simple definitions and picture-based vocabulary.
  // # ═══════════════════════════════════════════════════════════════════

  // # Matching — everyday objects to definitions
  {
    id: 'vocab.a1.01', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match each word to its meaning.',
      pairs: [
        { left: 'wallet', right: 'a small flat case for money and cards' },
        { left: 'umbrella', right: 'you hold it over your head when it rains' },
        { left: 'scissors', right: 'a tool for cutting paper' },
        { left: 'pillow', right: 'you put your head on it when you sleep' },
      ],
      difficulty: 0.2,
    },
  },
  {
    id: 'vocab.a1.02', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match each word to its meaning.',
      pairs: [
        { left: 'fridge', right: 'keeps food cold' },
        { left: 'oven', right: 'cooks food with heat' },
        { left: 'towel', right: 'you use it to dry yourself' },
        { left: 'soap', right: 'you use it to wash your hands' },
      ],
      difficulty: 0.2,
    },
  },

  // # MCQ — choose the word that fits the definition
  {
    id: 'vocab.a1.03', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Which word means "a room where you sleep"?',
      options: [
        { text: 'kitchen', misconception: 'A kitchen is for cooking food' },
        { text: 'bedroom', misconception: null },
        { text: 'bathroom', misconception: 'A bathroom is for washing' },
        { text: 'garden', misconception: 'A garden is outside the house' },
      ],
      correctIndex: 1,
      difficulty: 0.2,
    },
  },
  {
    id: 'vocab.a1.04', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'You feel cold. What do you need?',
      options: [
        { text: 'a blanket', misconception: null },
        { text: 'a fork', misconception: 'A fork is for eating' },
        { text: 'a mirror', misconception: 'A mirror is for looking at yourself' },
        { text: 'a stamp', misconception: 'A stamp is for posting letters' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },

  // # Gap fill — body parts in context
  {
    id: 'vocab.a1.05', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'I wear glasses on my ______ because I cannot see well.',
      gaps: [{ position: 0, answer: 'eyes', distractors: ['ears', 'hands', 'feet'] }],
      difficulty: 0.2,
    },
  },
  {
    id: 'vocab.a1.06', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'She plays the piano with her ______ .',
      gaps: [{ position: 0, answer: 'hands', distractors: ['legs', 'head', 'back'] }],
      difficulty: 0.2,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # A2 — Travel, Shopping, Weather, Health
  // # Context clues and choosing the right word.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'vocab.a2.01', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'The sky is grey and it\'s going to rain. The weather is ______ .',
      options: [
        { text: 'sunny', misconception: 'Sunny means bright with no clouds' },
        { text: 'cloudy', misconception: null },
        { text: 'windy', misconception: 'Windy = lots of wind, not necessarily rain' },
        { text: 'foggy', misconception: 'Foggy = you cannot see far, different from rain clouds' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'vocab.a2.02', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'I need to buy some medicine. I should go to the ______ .',
      options: [
        { text: 'library', misconception: 'A library has books, not medicine' },
        { text: 'pharmacy', misconception: null },
        { text: 'post office', misconception: 'A post office is for letters and parcels' },
        { text: 'bakery', misconception: 'A bakery sells bread and cakes' },
      ],
      correctIndex: 1,
      difficulty: 0.25,
    },
  },

  // # Matching — travel vocabulary
  {
    id: 'vocab.a2.03', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'Match each place to what you do there.',
      pairs: [
        { left: 'platform', right: 'wait for a train' },
        { left: 'check-in desk', right: 'show your passport at the airport' },
        { left: 'departure lounge', right: 'wait before boarding your flight' },
        { left: 'currency exchange', right: 'change money to another country\'s money' },
      ],
      difficulty: 0.3,
    },
  },

  // # Gap fill — health vocabulary
  {
    id: 'vocab.a2.04', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'I have a terrible ______ . I think I need to see a dentist.',
      gaps: [{ position: 0, answer: 'toothache', distractors: ['headache', 'stomachache', 'backache'] }],
      difficulty: 0.3,
    },
  },
  {
    id: 'vocab.a2.05', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'The shop assistant asked: "Would you like a ______ or a bag?"',
      gaps: [{ position: 0, answer: 'receipt', distractors: ['recipe', 'ticket', 'menu'] }],
      difficulty: 0.3,
    },
  },

  // # Word formation — adjective from noun
  {
    id: 'vocab.a2.06', type: 'word_formation', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'It\'s very ______ today. I need a coat. (WIND)',
      baseWord: 'wind',
      correctForm: 'windy',
      explanation: 'Add -y to "wind" to make the adjective "windy" (describing weather).',
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # B1 — Work, Education & Collocations
  // # Common collocations and word partnerships.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'vocab.b1.01', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'She has a lot of ______ in marketing. She worked in the field for 10 years.',
      options: [
        { text: 'experience', misconception: null },
        { text: 'experiment', misconception: 'An experiment is a scientific test, not work history' },
        { text: 'expert', misconception: 'Expert is a noun/adjective for a person, not the quality itself' },
        { text: 'expectation', misconception: 'Expectation = what you think will happen' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'vocab.b1.02', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'Which collocation is correct?',
      options: [
        { text: 'make a decision', misconception: null },
        { text: 'do a decision', misconception: '"Do" does not collocate with "decision" — use "make"' },
        { text: 'take a decision', misconception: 'Acceptable in British English but "make a decision" is more standard globally' },
        { text: 'have a decision', misconception: '"Have a decision" is not a standard collocation' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },

  // # Matching — common collocations
  {
    id: 'vocab.b1.03', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'Match the verb to the noun it collocates with.',
      pairs: [
        { left: 'attend', right: 'a meeting' },
        { left: 'submit', right: 'an application' },
        { left: 'earn', right: 'a salary' },
        { left: 'gain', right: 'experience' },
      ],
      difficulty: 0.4,
    },
  },
  {
    id: 'vocab.b1.04', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'Match each adjective to the noun it commonly goes with.',
      pairs: [
        { left: 'heavy', right: 'traffic' },
        { left: 'strong', right: 'opinion' },
        { left: 'close', right: 'friend' },
        { left: 'deep', right: 'sleep' },
      ],
      difficulty: 0.4,
    },
  },

  // # Gap fill — confusing words
  {
    id: 'vocab.b1.05', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'I need to ______ some money from the bank to pay the rent.',
      gaps: [{ position: 0, answer: 'borrow', distractors: ['lend', 'rent', 'owe'] }],
      difficulty: 0.4,
    },
  },
  {
    id: 'vocab.b1.06', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'The teacher ______ the students to work in groups for the project.',
      gaps: [{ position: 0, answer: 'advised', distractors: ['said', 'told', 'suggested'] }],
      difficulty: 0.4,
    },
  },

  // # Word formation
  {
    id: 'vocab.b1.07', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'The company is looking for someone with good ______ skills. (COMMUNICATE)',
      baseWord: 'communicate',
      correctForm: 'communication',
      explanation: 'Add -tion to "communicate" → "communication" (noun). Communication skills = ability to share ideas clearly.',
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # B2 — Abstract Concepts, Environment & Academic Vocabulary
  // # More nuanced word choice and formal register.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'vocab.b2.01', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The government needs to ______ stricter laws to reduce pollution.',
      options: [
        { text: 'implement', misconception: null },
        { text: 'implicate', misconception: 'Implicate = suggest involvement in something negative' },
        { text: 'imply', misconception: 'Imply = suggest indirectly without stating' },
        { text: 'impose', misconception: 'Impose = force upon (close but "implement" means put into action)' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },
  {
    id: 'vocab.b2.02', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'There is a growing ______ between the rich and the poor in many countries.',
      options: [
        { text: 'gap', misconception: null },
        { text: 'hole', misconception: 'Hole = a physical opening, not a social difference' },
        { text: 'space', misconception: 'Space = physical area, not a social divide' },
        { text: 'crack', misconception: 'Crack = a thin break, not the right collocation for inequality' },
      ],
      correctIndex: 0,
      difficulty: 0.45,
    },
  },

  // # Matching — confusing word pairs
  {
    id: 'vocab.b2.03', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'Match each word to its correct definition.',
      pairs: [
        { left: 'affect', right: 'to influence or have an impact on (verb)' },
        { left: 'effect', right: 'the result or outcome of a change (noun)' },
        { left: 'principal', right: 'the most important; head of a school' },
        { left: 'principle', right: 'a fundamental rule or belief' },
      ],
      difficulty: 0.5,
    },
  },

  // # Gap fill — academic register
  {
    id: 'vocab.b2.04', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The study ______ that regular exercise reduces the risk of heart disease.',
      gaps: [{ position: 0, answer: 'demonstrates', distractors: ['shows', 'tells', 'says'] }],
      difficulty: 0.5,
    },
  },
  {
    id: 'vocab.b2.05', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'Climate change poses a ______ threat to biodiversity worldwide.',
      gaps: [{ position: 0, answer: 'significant', distractors: ['big', 'large', 'strong'] }],
      difficulty: 0.45,
    },
  },

  // # Word formation — noun to adjective
  {
    id: 'vocab.b2.06', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The results of the survey were highly ______ . (SIGNIFICANCE)',
      baseWord: 'significance',
      correctForm: 'significant',
      explanation: 'Remove -ance and add -ant: "significance" → "significant" (adjective meaning important or meaningful).',
      difficulty: 0.5,
    },
  },
  {
    id: 'vocab.b2.07', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The ______ of renewable energy has increased dramatically. (AVAILABLE)',
      baseWord: 'available',
      correctForm: 'availability',
      explanation: '"Available" (adjective) → "availability" (noun). Add -ity to make the noun form.',
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C1 — Academic Word List & Formal Collocations
  // # High-frequency academic vocabulary for essays and reports.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'vocab.c1.01', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The data ______ a strong correlation between income and educational attainment.',
      options: [
        { text: 'reveals', misconception: null },
        { text: 'opens', misconception: '"Opens" is too literal — data does not physically open' },
        { text: 'discovers', misconception: '"Discovers" implies a person finding something, not data showing it' },
        { text: 'invents', misconception: '"Invents" means to create something new, not to show evidence' },
      ],
      correctIndex: 0,
      difficulty: 0.55,
    },
  },
  {
    id: 'vocab.c1.02', type: 'mcq', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The findings are ______ with previous research in the field.',
      options: [
        { text: 'consistent', misconception: null },
        { text: 'persistent', misconception: 'Persistent = continuing for a long time, not agreeing with' },
        { text: 'resistant', misconception: 'Resistant = opposing or not affected by' },
        { text: 'insistent', misconception: 'Insistent = demanding firmly, not in agreement with' },
      ],
      correctIndex: 0,
      difficulty: 0.55,
    },
  },

  // # Matching — academic collocations
  {
    id: 'vocab.c1.03', type: 'matching', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'Match each academic verb to the noun it commonly collocates with.',
      pairs: [
        { left: 'conduct', right: 'research' },
        { left: 'draw', right: 'a conclusion' },
        { left: 'pose', right: 'a threat' },
        { left: 'yield', right: 'results' },
      ],
      difficulty: 0.55,
    },
  },

  // # Gap fill — hedging language
  {
    id: 'vocab.c1.04', type: 'gap_fill', level: 'C1', skill: 'writing',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'It could be ______ that social media has a detrimental effect on adolescent mental health.',
      gaps: [{ position: 0, answer: 'argued', distractors: ['said', 'told', 'spoken'] }],
      difficulty: 0.55,
    },
  },
  {
    id: 'vocab.c1.05', type: 'gap_fill', level: 'C1', skill: 'writing',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The evidence ______ suggests that early intervention is more effective.',
      gaps: [{ position: 0, answer: 'overwhelmingly', distractors: ['very', 'really', 'totally'] }],
      difficulty: 0.6,
    },
  },

  // # Word formation — academic vocabulary
  {
    id: 'vocab.c1.06', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The ______ of traditional farming methods has been well documented. (EFFECTIVE)',
      baseWord: 'effective',
      correctForm: 'effectiveness',
      explanation: '"Effective" (adjective) → "effectiveness" (noun). Add -ness to form the abstract noun.',
      difficulty: 0.55,
    },
  },
  {
    id: 'vocab.c1.07', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'There are ______ differences between the two approaches. (FUNDAMENT)',
      baseWord: 'fundament',
      correctForm: 'fundamental',
      explanation: '"Fundament" → "fundamental" (adjective meaning basic or essential). Add -al to form the adjective.',
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # C2 — Idiomatic, Figurative & Rare Vocabulary
  // # Low-frequency words, literary expressions, and nuanced distinctions.
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'vocab.c2.01', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'Her speech was deliberately ______ , designed to stir strong emotions in the audience.',
      options: [
        { text: 'inflammatory', misconception: null },
        { text: 'flammable', misconception: 'Flammable = can catch fire (literal, physical property)' },
        { text: 'inflamed', misconception: 'Inflamed = swollen/irritated (usually medical)' },
        { text: 'inflated', misconception: 'Inflated = exaggerated or filled with air' },
      ],
      correctIndex: 0,
      difficulty: 0.7,
    },
  },
  {
    id: 'vocab.c2.02', type: 'mcq', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The politician\'s ______ remarks about immigration were widely condemned by civil rights groups.',
      options: [
        { text: 'disparaging', misconception: null },
        { text: 'disparate', misconception: 'Disparate = fundamentally different, not insulting' },
        { text: 'dispassionate', misconception: 'Dispassionate = unemotional and objective — the opposite of what fits here' },
        { text: 'dispensable', misconception: 'Dispensable = not essential, easily removed' },
      ],
      correctIndex: 0,
      difficulty: 0.75,
    },
  },

  // # Matching — literary/formal vocabulary
  {
    id: 'vocab.c2.03', type: 'matching', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'Match each word to its meaning.',
      pairs: [
        { left: 'ubiquitous', right: 'found everywhere; seeming to be in all places' },
        { left: 'ephemeral', right: 'lasting only a very short time' },
        { left: 'pernicious', right: 'having a harmful effect, especially gradually' },
        { left: 'ostensible', right: 'appearing to be true but not necessarily so' },
      ],
      difficulty: 0.7,
    },
  },
  {
    id: 'vocab.c2.04', type: 'matching', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'Match each idiom to its meaning.',
      pairs: [
        { left: 'a moot point', right: 'something debatable or no longer relevant' },
        { left: 'a red herring', right: 'something misleading that distracts from the real issue' },
        { left: 'the crux of the matter', right: 'the most important point' },
        { left: 'a foregone conclusion', right: 'a result that is certain before it happens' },
      ],
      difficulty: 0.7,
    },
  },

  // # Gap fill — nuanced word choice
  {
    id: 'vocab.c2.05', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The author\'s prose style is characterised by a ______ wit that reveals itself only on a second reading.',
      gaps: [{ position: 0, answer: 'sardonic', distractors: ['sarcastic', 'funny', 'comic'] }],
      difficulty: 0.75,
    },
  },
  {
    id: 'vocab.c2.06', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The company\'s attempts to rebrand itself as environmentally conscious were widely dismissed as ______ .',
      gaps: [{ position: 0, answer: 'disingenuous', distractors: ['dishonest', 'insincere', 'fake'] }],
      difficulty: 0.75,
    },
  },

  // # Word formation — rare academic forms
  {
    id: 'vocab.c2.07', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The ______ of information on social media makes it difficult to identify reliable sources. (PROLIFERATE)',
      baseWord: 'proliferate',
      correctForm: 'proliferation',
      explanation: '"Proliferate" (verb) → "proliferation" (noun). Add -ion after removing the final -e. Means rapid increase or spread.',
      difficulty: 0.7,
    },
  },
  {
    id: 'vocab.c2.08', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The negotiations reached an ______ when neither side would make concessions. (IMPASSE)',
      baseWord: 'impasse',
      correctForm: 'impasse',
      explanation: '"Impasse" is already a noun meaning a deadlock or situation with no progress. No transformation needed — the trap is that students try to change it. Recognising unchanged words is a C2 skill.',
      difficulty: 0.7,
    },
  },
]
