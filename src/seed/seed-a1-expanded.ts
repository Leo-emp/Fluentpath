// # A1 expanded content — sentence transforms, error correction, word formation,
// # matching, dialogue completion, plus more gap-fill, reading, writing, speaking.
// # Target: 50+ new items for A1 learners (absolute beginners).

import type { UnifiedSeedItem } from './run-seed'

export const SEED_A1_EXPANDED: UnifiedSeedItem[] = [
  // # ─── SENTENCE TRANSFORMATION (6) ────────────────────────────────────
  {
    id: 'item.st.a1.01', type: 'sentence_transform', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      originalSentence: 'He is a teacher.',
      keyWord: 'works',
      acceptedAnswers: ['He works as a teacher.'],
      explanation: 'We can express someone\'s job using "be + a + job" or "work as + a + job".',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.st.a1.02', type: 'sentence_transform', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      originalSentence: 'I am not tired.',
      keyWord: 'feel',
      acceptedAnswers: ["I don't feel tired.", 'I do not feel tired.'],
      explanation: '"Be + adjective" can be rewritten with "feel + adjective" using don\'t for negation.',
      difficulty: 0.2,
    },
  },
  {
    id: 'item.st.a1.03', type: 'sentence_transform', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      originalSentence: 'She likes coffee.',
      keyWord: 'drink',
      acceptedAnswers: ['She likes to drink coffee.', 'She likes drinking coffee.'],
      explanation: 'We can add a verb after "like" using "to + verb" or "verb + -ing".',
      difficulty: 0.2,
    },
  },
  {
    id: 'item.st.a1.04', type: 'sentence_transform', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    payload: {
      originalSentence: 'He can speak French.',
      keyWord: 'able',
      acceptedAnswers: ['He is able to speak French.'],
      explanation: '"Can" expresses ability. The alternative is "be able to + verb".',
      difficulty: 0.25,
    },
  },
  {
    id: 'item.st.a1.05', type: 'sentence_transform', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      originalSentence: 'The shop opens at 9 o\'clock.',
      keyWord: 'time',
      acceptedAnswers: ['What time does the shop open? At 9 o\'clock.', 'The time the shop opens is 9 o\'clock.'],
      explanation: 'We use "what time" to ask about schedules with present simple.',
      difficulty: 0.2,
    },
  },
  {
    id: 'item.st.a1.06', type: 'sentence_transform', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      originalSentence: 'He does not eat meat.',
      keyWord: 'vegetarian',
      acceptedAnswers: ['He is a vegetarian.', 'He is vegetarian.'],
      explanation: 'Someone who does not eat meat is called a vegetarian.',
      difficulty: 0.2,
    },
  },

  // # ─── ERROR CORRECTION (8) ──────────────────────────────────────────
  {
    id: 'item.ec.a1.01', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      sentence: 'She are a student.',
      errorPart: 'are',
      correction: 'is',
      explanation: 'With she/he/it, we use "is" not "are". "Are" is used with you/we/they.',
      difficulty: 0.1,
    },
  },
  {
    id: 'item.ec.a1.02', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      sentence: 'He go to school every day.',
      errorPart: 'go',
      correction: 'goes',
      explanation: 'In present simple, he/she/it needs -s or -es on the verb: "goes".',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.ec.a1.03', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      sentence: 'Do she like music?',
      errorPart: 'Do',
      correction: 'Does',
      explanation: 'Questions with he/she/it use "does" not "do".',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.ec.a1.04', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      sentence: 'They is happy today.',
      errorPart: 'is',
      correction: 'are',
      explanation: 'With they/we/you, we use "are" not "is".',
      difficulty: 0.1,
    },
  },
  {
    id: 'item.ec.a1.05', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    payload: {
      sentence: 'She can speaks English.',
      errorPart: 'speaks',
      correction: 'speak',
      explanation: 'After "can", always use the base form of the verb without -s.',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.ec.a1.06', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      sentence: 'I have two childs.',
      errorPart: 'childs',
      correction: 'children',
      explanation: '"Child" has an irregular plural: "children", not "childs".',
      difficulty: 0.2,
    },
  },
  {
    id: 'item.ec.a1.07', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      sentence: 'I no like fish.',
      errorPart: 'no',
      correction: "don't",
      explanation: 'To make a negative in present simple, use "don\'t" (not "no") before the verb.',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.ec.a1.08', type: 'error_correction', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      sentence: 'I am have a cat.',
      errorPart: 'am have',
      correction: 'have',
      explanation: '"Have" is a main verb — it does not need "am/is/are" before it.',
      difficulty: 0.15,
    },
  },

  // # ─── WORD FORMATION (6) ────────────────────────────────────────────
  {
    id: 'item.wf.a1.01', type: 'word_formation', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'She is a very ______ person.',
      rootWord: 'FRIEND',
      acceptedAnswers: ['friendly'],
      explanation: 'Add -ly to "friend" to make the adjective "friendly".',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.wf.a1.02', type: 'word_formation', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'He is a good ______.',
      rootWord: 'TEACH',
      acceptedAnswers: ['teacher'],
      explanation: 'Add -er to "teach" to make the noun "teacher" (a person who teaches).',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.wf.a1.03', type: 'word_formation', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'I like ______ in the park.',
      rootWord: 'WALK',
      acceptedAnswers: ['walking'],
      explanation: 'After "like", add -ing to the verb: "walking".',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.wf.a1.04', type: 'word_formation', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'This book is very ______.',
      rootWord: 'INTEREST',
      acceptedAnswers: ['interesting'],
      explanation: 'Add -ing to "interest" to make the adjective "interesting".',
      difficulty: 0.2,
    },
  },
  {
    id: 'item.wf.a1.05', type: 'word_formation', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Be ______! The road is dangerous.',
      rootWord: 'CARE',
      acceptedAnswers: ['careful'],
      explanation: 'Add -ful to "care" to make the adjective "careful".',
      difficulty: 0.2,
    },
  },
  {
    id: 'item.wf.a1.06', type: 'word_formation', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'She is a ______ girl.',
      rootWord: 'BEAUTY',
      acceptedAnswers: ['beautiful'],
      explanation: 'Change "beauty" (noun) to "beautiful" (adjective) by adding -ful.',
      difficulty: 0.2,
    },
  },

  // # ─── MATCHING (6) ──────────────────────────────────────────────────
  {
    id: 'item.ma.a1.01', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match each word to its meaning.',
      pairs: [
        { left: 'breakfast', right: 'the first meal of the day' },
        { left: 'lunch', right: 'a meal in the middle of the day' },
        { left: 'dinner', right: 'the main meal in the evening' },
        { left: 'snack', right: 'a small amount of food between meals' },
      ],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.ma.a1.02', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match each place to what you do there.',
      pairs: [
        { left: 'hospital', right: 'see a doctor when you are ill' },
        { left: 'supermarket', right: 'buy food and drinks' },
        { left: 'library', right: 'borrow books to read' },
        { left: 'post office', right: 'send letters and parcels' },
      ],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.ma.a1.03', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match each opposite pair.',
      pairs: [
        { left: 'hot', right: 'cold' },
        { left: 'big', right: 'small' },
        { left: 'fast', right: 'slow' },
        { left: 'old', right: 'new' },
        { left: 'happy', right: 'sad' },
      ],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.ma.a1.04', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match each job to what the person does.',
      pairs: [
        { left: 'doctor', right: 'helps sick people' },
        { left: 'teacher', right: 'works in a school' },
        { left: 'chef', right: 'cooks food in a restaurant' },
        { left: 'driver', right: 'drives a bus or taxi' },
      ],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.ma.a1.05', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      stem: 'Match the pronoun to the correct form of "be".',
      pairs: [
        { left: 'I', right: 'am' },
        { left: 'She / He', right: 'is' },
        { left: 'We / They', right: 'are' },
      ],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.ma.a1.06', type: 'matching', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Match the country to its language.',
      pairs: [
        { left: 'France', right: 'French' },
        { left: 'Japan', right: 'Japanese' },
        { left: 'Spain', right: 'Spanish' },
        { left: 'Germany', right: 'German' },
      ],
      difficulty: 0.15,
    },
  },

  // # ─── DIALOGUE COMPLETION (8) ───────────────────────────────────────
  {
    id: 'item.dc.a1.01', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the conversation. Two people meet for the first time.',
      lines: [
        { speaker: 'A', text: 'Hello! My name is Tom. What is your name?' },
        { speaker: 'B', text: null, acceptedAnswers: ['My name is...', 'I\'m...', 'Hi, I\'m...'], hint: 'Tell the person your name.' },
        { speaker: 'A', text: 'Nice to meet you! Where are you from?' },
        { speaker: 'B', text: null, acceptedAnswers: ['I am from...', 'I\'m from...'], hint: 'Say your country or city.' },
        { speaker: 'A', text: 'That\'s interesting! I am from London.' },
      ],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.dc.a1.02', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the conversation at a coffee shop.',
      lines: [
        { speaker: 'Waiter', text: 'Good morning! What would you like?' },
        { speaker: 'Customer', text: null, acceptedAnswers: ['A coffee, please.', 'I would like a coffee, please.', 'Can I have a coffee, please?'], hint: 'Order a drink.' },
        { speaker: 'Waiter', text: 'Would you like milk?' },
        { speaker: 'Customer', text: null, acceptedAnswers: ['Yes, please.', 'No, thank you.', 'No, thanks.'], hint: 'Say yes or no politely.' },
        { speaker: 'Waiter', text: 'Here you are. That is two pounds fifty.' },
        { speaker: 'Customer', text: null, acceptedAnswers: ['Thank you.', 'Thanks.', 'Here you are.'], hint: 'Say thank you.' },
      ],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.dc.a1.03', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the conversation. Ask about someone\'s family.',
      lines: [
        { speaker: 'A', text: 'Do you have brothers or sisters?' },
        { speaker: 'B', text: null, acceptedAnswers: ['Yes, I have one brother.', 'Yes, I have a sister.', 'No, I don\'t.', 'I have two brothers.'], hint: 'Talk about your family.' },
        { speaker: 'A', text: 'How old are they?' },
        { speaker: 'B', text: null, acceptedAnswers: ['He is 15 years old.', 'She is 20.', 'They are older than me.'], hint: 'Say their age.' },
      ],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.dc.a1.04', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the conversation about the time.',
      lines: [
        { speaker: 'A', text: null, acceptedAnswers: ['Excuse me, what time is it?', 'What is the time?', 'What time is it, please?'], hint: 'Ask what time it is.' },
        { speaker: 'B', text: 'It is half past two.' },
        { speaker: 'A', text: null, acceptedAnswers: ['Thank you!', 'Thanks!', 'Thank you very much.'], hint: 'Say thank you.' },
      ],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.dc.a1.05', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the conversation at a shop.',
      lines: [
        { speaker: 'Shop assistant', text: 'Can I help you?' },
        { speaker: 'Customer', text: null, acceptedAnswers: ['Yes, how much is this?', 'How much does this cost?', 'Yes, I want to buy this.'], hint: 'Ask about the price.' },
        { speaker: 'Shop assistant', text: 'It is ten pounds.' },
        { speaker: 'Customer', text: null, acceptedAnswers: ['OK, I will take it.', 'I\'ll take it, please.', 'That\'s fine, thank you.'], hint: 'Decide to buy it.' },
      ],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.dc.a1.06', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the conversation asking for directions.',
      lines: [
        { speaker: 'Tourist', text: null, acceptedAnswers: ['Excuse me, where is the station?', 'Excuse me, how do I get to the station?', 'Can you tell me where the station is?'], hint: 'Ask how to get to the train station.' },
        { speaker: 'Local', text: 'Go straight and turn left. It is on the right.' },
        { speaker: 'Tourist', text: null, acceptedAnswers: ['Thank you very much!', 'Thanks a lot!', 'Thank you!'], hint: 'Say thank you.' },
      ],
      difficulty: 0.2,
    },
  },
  {
    id: 'item.dc.a1.07', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the phone conversation.',
      lines: [
        { speaker: 'A', text: 'Hello?' },
        { speaker: 'B', text: null, acceptedAnswers: ['Hi, this is...', 'Hello, it\'s...', 'Hi, can I speak to...?'], hint: 'Say who you are.' },
        { speaker: 'A', text: 'Oh, hi! How are you?' },
        { speaker: 'B', text: null, acceptedAnswers: ['I\'m fine, thanks. And you?', 'I\'m good, thank you.', 'Not bad, thanks.'], hint: 'Say how you are feeling.' },
      ],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.dc.a1.08', type: 'dialogue_completion', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      stem: 'Complete the conversation about likes and dislikes.',
      lines: [
        { speaker: 'A', text: 'Do you like football?' },
        { speaker: 'B', text: null, acceptedAnswers: ['Yes, I love it!', 'Yes, I do.', 'No, I don\'t like football.', 'Not really.'], hint: 'Say if you like football or not.' },
        { speaker: 'A', text: 'What is your favourite sport?' },
        { speaker: 'B', text: null, acceptedAnswers: ['My favourite sport is...', 'I like... the most.', 'I really like...'], hint: 'Name a sport you like.' },
      ],
      difficulty: 0.15,
    },
  },

  // # ─── EXTRA GAP-FILL (6) ────────────────────────────────────────────
  {
    id: 'item.gf.a1.07', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      stem: 'I ______ from Japan. Where ______ you from?',
      gaps: [
        { index: 0, acceptedAnswers: ['am', "'m"], hint: 'First person singular of "be"' },
        { index: 1, acceptedAnswers: ['are'], hint: '"You" takes "are"' },
      ],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a1.08', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      stem: 'What time ______ you wake up?',
      gaps: [{ index: 0, acceptedAnswers: ['do'], hint: 'Use "do" with you/I/we/they in questions' }],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.gf.a1.09', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'The ______ is shining. It is a beautiful day.',
      gaps: [{ index: 0, acceptedAnswers: ['sun'], hint: 'The bright thing in the sky' }],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a1.10', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      stem: 'She ______ not like spicy food.',
      gaps: [{ index: 0, acceptedAnswers: ['does'], hint: 'He/she/it uses "does" in negatives' }],
      difficulty: 0.2,
    },
  },
  {
    id: 'item.gf.a1.11', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'I brush my ______ every morning and every night.',
      gaps: [{ index: 0, acceptedAnswers: ['teeth'], hint: 'The white things in your mouth' }],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a1.12', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    payload: {
      stem: '______ you help me, please?',
      gaps: [{ index: 0, acceptedAnswers: ['Can', 'Could'], hint: 'A polite way to ask for help' }],
      difficulty: 0.15,
    },
  },

  // # ─── EXTRA WRITING (3) ─────────────────────────────────────────────
  {
    id: 'item.wt.a1.02', type: 'writing_task', level: 'A1', skill: 'writing',
    nodeIds: ['cando.a1.write_simple_phrases'],
    payload: {
      prompt: 'Write about your family. Who is in your family? What are their names? How old are they? Write 30–50 words.',
      format: 'short_message',
      minWords: 30, maxWords: 60, timeMinutes: 10,
      rubric: [
        { name: 'Task Completion', description: 'Names and ages of family members', maxScore: 3 },
        { name: 'Grammar', description: 'Uses "have", "is/are", numbers correctly', maxScore: 3 },
        { name: 'Vocabulary', description: 'Uses family vocabulary', maxScore: 3 },
      ],
      modelAnswer: 'My family is small. I have one brother and one sister. My brother is called Marco. He is 12 years old. My sister is called Sofia. She is 8 years old. My mother is a nurse and my father is an engineer. I love my family.',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.wt.a1.03', type: 'writing_task', level: 'A1', skill: 'writing',
    nodeIds: ['cando.a1.write_simple_phrases'],
    payload: {
      prompt: 'Write about your bedroom. What is in it? What colour is it? Do you like it? Write 30–50 words.',
      format: 'short_message',
      minWords: 30, maxWords: 60, timeMinutes: 10,
      rubric: [
        { name: 'Task Completion', description: 'Describes objects, colour, and opinion', maxScore: 3 },
        { name: 'Grammar', description: 'Uses "there is/are", adjectives correctly', maxScore: 3 },
        { name: 'Vocabulary', description: 'Uses furniture and colour vocabulary', maxScore: 3 },
      ],
      modelAnswer: 'My bedroom is small but I like it. The walls are blue. There is a bed, a desk, and a bookshelf. I have a big window. I can see the garden from my window. My favourite thing is my computer. I do my homework at my desk.',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.wt.a1.04', type: 'writing_task', level: 'A1', skill: 'writing',
    nodeIds: ['cando.a1.write_simple_phrases'],
    payload: {
      prompt: 'Write a short note to a friend. Invite them to your birthday party. Say when and where it is. Write 20–40 words.',
      format: 'short_message',
      minWords: 20, maxWords: 50, timeMinutes: 8,
      rubric: [
        { name: 'Task Completion', description: 'Includes invitation, date, place', maxScore: 3 },
        { name: 'Grammar', description: 'Basic sentence structure correct', maxScore: 3 },
        { name: 'Tone', description: 'Friendly and informal', maxScore: 3 },
      ],
      modelAnswer: 'Hi Maria! I am having a birthday party on Saturday at my house. It starts at 3 o\'clock. There will be cake and games. Can you come? I hope to see you there! Tom',
      difficulty: 0.1,
    },
  },

  // # ─── EXTRA SPEAKING (3) ────────────────────────────────────────────
  {
    id: 'item.sp.a1.02', type: 'speaking_prompt', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      prompt: 'Tell me about your favourite food.',
      format: 'general',
      followUpQuestions: ['What is your favourite food?', 'Can you cook it?', 'Where do you usually eat it?', 'Who cooks in your family?'],
      prepTimeSeconds: 0, speakTimeSeconds: 60,
      targetLanguage: ['My favourite food is...', 'I like... because...', 'I usually eat...', 'My mother/father cooks...'],
      modelAnswerNotes: 'Names a food, gives a reason for liking it, mentions who cooks or where they eat it. Simple present tense throughout.',
      difficulty: 0.1,
    },
  },
  {
    id: 'item.sp.a1.03', type: 'speaking_prompt', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      prompt: 'Describe your best friend.',
      format: 'general',
      followUpQuestions: ['What is their name?', 'How old are they?', 'What do they look like?', 'What do you do together?'],
      prepTimeSeconds: 0, speakTimeSeconds: 60,
      targetLanguage: ['My best friend is...', 'He/She is... years old.', 'He/She has... hair.', 'We like to...'],
      modelAnswerNotes: 'Covers name, age, appearance, shared activities. Uses present simple and "have" for descriptions.',
      difficulty: 0.1,
    },
  },
  {
    id: 'item.sp.a1.04', type: 'speaking_prompt', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      prompt: 'Tell me about your home.',
      format: 'general',
      followUpQuestions: ['Do you live in a house or a flat?', 'How many rooms are there?', 'What is your favourite room?', 'Do you have a garden?'],
      prepTimeSeconds: 0, speakTimeSeconds: 60,
      targetLanguage: ['I live in a...', 'There are... rooms.', 'My favourite room is... because...', 'We have/don\'t have...'],
      modelAnswerNotes: 'Describes home type, number of rooms, favourite room with reason. Uses "there is/are" and basic prepositions.',
      difficulty: 0.1,
    },
  },
]
