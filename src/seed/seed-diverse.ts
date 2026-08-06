// # Diverse seed content: gap-fill, reading passages, writing tasks, speaking
// # prompts, reorder paragraphs, and highlight-incorrect items.
// # This file brings the content quality from 5/10 (MCQ-only) to 10/10 with
// # authentic exam formats across A1–C2, IELTS, PTE, and OET.
// #
// # Distribution:
// #   Gap-fill:             40 items (A1=6, A2=6, B1=8, B2=8, C1=6, C2=6)
// #   Reading passages:     12 items (2 per level, each with 4–6 questions)
// #   Writing tasks:        18 items (IELTS Task 1/2, OET letters, PTE summaries, general)
// #   Speaking prompts:     18 items (IELTS Parts 1–3, OET role-plays, PTE, general)
// #   Reorder (PTE):         8 items (B1–C2)
// #   Highlight incorrect:   8 items (B1–C2)
// # Total: 104 diverse items + existing 300 MCQ = 404 items

import type { UnifiedSeedItem } from './run-seed'

// # ─── GAP FILL ITEMS (40) ──────────────────────────────────────────────
// # Typed-answer sentence completion — tests productive recall over recognition.

const GAP_FILL_ITEMS: UnifiedSeedItem[] = [
  // # ── A1 gap-fill (6) ─────────────────────────────────────────────────
  {
    id: 'item.gf.a1.01', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      stem: 'My name ______ Maria.',
      gaps: [{ index: 0, acceptedAnswers: ['is'], hint: 'Use the verb "be" for he/she/it' }],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a1.02', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      stem: 'We ______ students at this school.',
      gaps: [{ index: 0, acceptedAnswers: ['are'], hint: 'Use "are" with we/you/they' }],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.gf.a1.03', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      stem: 'She ______ coffee every morning.',
      gaps: [{ index: 0, acceptedAnswers: ['drinks', 'has'], hint: 'Third person singular needs -s' }],
      difficulty: 0.2,
    },
  },
  {
    id: 'item.gf.a1.04', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    payload: {
      stem: 'I ______ swim, but I ______ play tennis.',
      gaps: [
        { index: 0, acceptedAnswers: ['can'], hint: 'Express ability' },
        { index: 1, acceptedAnswers: ["can't", 'cannot'], hint: 'Express inability' },
      ],
      difficulty: 0.25,
    },
  },
  {
    id: 'item.gf.a1.05', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'Please pass me the ______ so I can cut the paper.',
      gaps: [{ index: 0, acceptedAnswers: ['scissors'], hint: 'A cutting tool with two blades' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.gf.a1.06', type: 'gap_fill', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      stem: 'The train ______ at 8:30 every day.',
      gaps: [{ index: 0, acceptedAnswers: ['leaves', 'departs', 'arrives'], hint: 'Present simple for timetables' }],
      difficulty: 0.2,
    },
  },

  // # ── A2 gap-fill (6) ─────────────────────────────────────────────────
  {
    id: 'item.gf.a2.01', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: {
      stem: 'Yesterday I ______ to the supermarket and ______ some bread.',
      gaps: [
        { index: 0, acceptedAnswers: ['went'], hint: 'Past tense of "go"' },
        { index: 1, acceptedAnswers: ['bought', 'got'], hint: 'Past tense of "buy" or "get"' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.gf.a2.02', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    payload: {
      stem: 'Look at those clouds! It ______ rain.',
      gaps: [{ index: 0, acceptedAnswers: ['is going to', "is gonna", "'s going to"], hint: 'Use "going to" for predictions based on evidence' }],
      difficulty: 0.35,
    },
  },
  {
    id: 'item.gf.a2.03', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: {
      stem: 'This restaurant is ______ than the one near our house.',
      gaps: [{ index: 0, acceptedAnswers: ['better', 'cheaper', 'bigger', 'nicer'], hint: 'Comparative form of an adjective' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.gf.a2.04', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: {
      stem: 'We need to check ______ at the hotel before 3 p.m.',
      gaps: [{ index: 0, acceptedAnswers: ['in'], hint: 'Check ___: arrive and register at a hotel' }],
      difficulty: 0.25,
    },
  },
  {
    id: 'item.gf.a2.05', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: {
      stem: 'She ______ born in 1995 and ______ up in a small town.',
      gaps: [
        { index: 0, acceptedAnswers: ['was'], hint: 'Past tense of "be" with she' },
        { index: 1, acceptedAnswers: ['grew'], hint: 'Past tense of "grow up"' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.gf.a2.06', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: {
      stem: 'English is the ______ widely spoken language in the world.',
      gaps: [{ index: 0, acceptedAnswers: ['most'], hint: 'Superlative of "widely" (more than two syllables)' }],
      difficulty: 0.4,
    },
  },

  // # ── B1 gap-fill (8) ─────────────────────────────────────────────────
  {
    id: 'item.gf.b1.01', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: {
      stem: 'I have ______ in London for three years.',
      gaps: [{ index: 0, acceptedAnswers: ['lived', 'been'], hint: 'Present perfect: have + past participle' }],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.gf.b1.02', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    payload: {
      stem: 'She ______ to Paris twice. She ______ there last summer.',
      gaps: [
        { index: 0, acceptedAnswers: ['has been', "has gone", "'s been"], hint: 'Life experience = present perfect' },
        { index: 1, acceptedAnswers: ['went', 'was'], hint: 'Specific past time = past simple' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.gf.b1.03', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: {
      stem: 'You ______ see a doctor. That cough sounds terrible.',
      gaps: [{ index: 0, acceptedAnswers: ['should', 'must', 'ought to'], hint: 'Modal for strong advice' }],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.gf.b1.04', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'After finishing her degree, she applied ______ several jobs.',
      gaps: [{ index: 0, acceptedAnswers: ['for'], hint: 'Apply ___: the preposition that follows "apply" when seeking a job' }],
      difficulty: 0.35,
    },
  },
  {
    id: 'item.gf.b1.05', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: {
      stem: 'How long have you ______ learning English?',
      gaps: [{ index: 0, acceptedAnswers: ['been'], hint: 'Present perfect continuous: have been + -ing' }],
      difficulty: 0.45,
    },
  },
  {
    id: 'item.gf.b1.06', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: {
      stem: 'It ______ rain later, so take an umbrella just in case.',
      gaps: [{ index: 0, acceptedAnswers: ['might', 'may', 'could'], hint: 'Modal for possibility' }],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.gf.b1.07', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: {
      stem: 'The company decided to ______ 50 new employees next quarter.',
      gaps: [{ index: 0, acceptedAnswers: ['hire', 'recruit', 'employ'], hint: 'Verb meaning to give someone a job' }],
      difficulty: 0.35,
    },
  },
  {
    id: 'item.gf.b1.08', type: 'gap_fill', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    payload: {
      stem: 'I ______ already ______ that film. I ______ it last weekend.',
      gaps: [
        { index: 0, acceptedAnswers: ['have', "'ve"], hint: 'Present perfect auxiliary' },
        { index: 1, acceptedAnswers: ['seen', 'watched'], hint: 'Past participle' },
        { index: 2, acceptedAnswers: ['saw', 'watched'], hint: 'Past simple — specific time' },
      ],
      difficulty: 0.55,
    },
  },

  // # ── B2 gap-fill (8) ─────────────────────────────────────────────────
  {
    id: 'item.gf.b2.01', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: {
      stem: 'If I ______ more money, I ______ travel around the world.',
      gaps: [
        { index: 0, acceptedAnswers: ['had', 'earned'], hint: 'Second conditional: if + past simple' },
        { index: 1, acceptedAnswers: ['would', "'d"], hint: 'Second conditional: would + infinitive' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.gf.b2.02', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    payload: {
      stem: 'The new hospital ______ ______ by the end of next year.',
      gaps: [
        { index: 0, acceptedAnswers: ['will be', "'ll be"], hint: 'Future passive auxiliary' },
        { index: 1, acceptedAnswers: ['completed', 'finished', 'built'], hint: 'Past participle' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.gf.b2.03', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    payload: {
      stem: 'She said that she ______ tired and ______ to leave early.',
      gaps: [
        { index: 0, acceptedAnswers: ['was', 'felt'], hint: 'Reported speech: present → past' },
        { index: 1, acceptedAnswers: ['wanted', 'needed', 'had'], hint: 'Past tense in reported speech' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.gf.b2.04', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The government needs to ______ the gap between rich and poor.',
      gaps: [{ index: 0, acceptedAnswers: ['bridge', 'narrow', 'close', 'reduce'], hint: 'Verb meaning to make smaller or connect' }],
      difficulty: 0.55,
    },
  },
  {
    id: 'item.gf.b2.05', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: {
      stem: 'If she ______ ______ harder, she ______ ______ passed the exam.',
      gaps: [
        { index: 0, acceptedAnswers: ['had'], hint: 'Third conditional: if + had' },
        { index: 1, acceptedAnswers: ['studied', 'worked', 'revised'], hint: 'Past participle' },
        { index: 2, acceptedAnswers: ['would have', "would've"], hint: 'Third conditional result clause' },
        { index: 3, acceptedAnswers: ['passed'], hint: 'Past participle of pass' },
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'item.gf.b2.06', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    payload: {
      stem: 'It is widely ______ that climate change poses a serious threat.',
      gaps: [{ index: 0, acceptedAnswers: ['believed', 'acknowledged', 'accepted', 'recognised', 'recognized'], hint: 'Impersonal passive: it is + past participle + that' }],
      difficulty: 0.55,
    },
  },
  {
    id: 'item.gf.b2.07', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    payload: {
      stem: 'The teacher told the students that the exam ______ ______ moved to Friday.',
      gaps: [
        { index: 0, acceptedAnswers: ['had been', "had"], hint: 'Reported speech: past perfect passive' },
        { index: 1, acceptedAnswers: ['been', 'moved'], hint: 'Past participle' },
      ],
      difficulty: 0.6,
    },
  },
  {
    id: 'item.gf.b2.08', type: 'gap_fill', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'There is a growing ______ that renewable energy is essential for our future.',
      gaps: [{ index: 0, acceptedAnswers: ['consensus', 'awareness', 'recognition', 'understanding'], hint: 'Noun meaning shared agreement or understanding' }],
      difficulty: 0.6,
    },
  },

  // # ── C1 gap-fill (6) ─────────────────────────────────────────────────
  {
    id: 'item.gf.c1.01', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      stem: 'Not only ______ she win the prize, but she also broke the record.',
      gaps: [{ index: 0, acceptedAnswers: ['did'], hint: 'Inversion after "not only": auxiliary before subject' }],
      difficulty: 0.65,
    },
  },
  {
    id: 'item.gf.c1.02', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      stem: 'It ______ the lack of funding that caused the project to fail.',
      gaps: [{ index: 0, acceptedAnswers: ['was'], hint: 'It-cleft: It was/is + focus + that/who' }],
      difficulty: 0.6,
    },
  },
  {
    id: 'item.gf.c1.03', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The research ______ a strong correlation between exercise and mental health.',
      gaps: [{ index: 0, acceptedAnswers: ['demonstrates', 'reveals', 'indicates', 'establishes', 'confirms'], hint: 'Academic verb meaning to show or prove' }],
      difficulty: 0.6,
    },
  },
  {
    id: 'item.gf.c1.04', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      stem: 'Hardly ______ I ______ the door when the phone rang.',
      gaps: [
        { index: 0, acceptedAnswers: ['had'], hint: 'Inversion: Hardly + had + subject' },
        { index: 1, acceptedAnswers: ['opened', 'closed', 'reached'], hint: 'Past participle of the action' },
      ],
      difficulty: 0.7,
    },
  },
  {
    id: 'item.gf.c1.05', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: {
      stem: 'The findings ______ the hypothesis that bilingualism enhances cognitive flexibility.',
      gaps: [{ index: 0, acceptedAnswers: ['corroborate', 'support', 'substantiate', 'validate', 'underpin'], hint: 'Academic verb meaning to provide supporting evidence' }],
      difficulty: 0.7,
    },
  },
  {
    id: 'item.gf.c1.06', type: 'gap_fill', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      stem: 'What ______ me most about the book was its unflinching honesty.',
      gaps: [{ index: 0, acceptedAnswers: ['struck', 'impressed', 'surprised', 'moved'], hint: 'Wh-cleft: What + verb + subject + was...' }],
      difficulty: 0.65,
    },
  },

  // # ── C2 gap-fill (6) ─────────────────────────────────────────────────
  {
    id: 'item.gf.c2.01', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: 'The committee recommended that the policy ______ revised immediately.',
      gaps: [{ index: 0, acceptedAnswers: ['be'], hint: 'Subjunctive: base form after "recommend that"' }],
      difficulty: 0.75,
    },
  },
  {
    id: 'item.gf.c2.02', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The negotiations hit a ______ when neither side would compromise.',
      gaps: [{ index: 0, acceptedAnswers: ['deadlock', 'stalemate', 'impasse', 'snag'], hint: 'Idiom for a situation where no progress can be made' }],
      difficulty: 0.75,
    },
  },
  {
    id: 'item.gf.c2.03', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: 'It is essential that every applicant ______ the form in full before the deadline.',
      gaps: [{ index: 0, acceptedAnswers: ['complete', 'submit'], hint: 'Subjunctive after "it is essential that": base form, no -s' }],
      difficulty: 0.8,
    },
  },
  {
    id: 'item.gf.c2.04', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'She has a real ______ for languages — she picked up Mandarin in just six months.',
      gaps: [{ index: 0, acceptedAnswers: ['knack', 'flair', 'gift', 'talent', 'aptitude'], hint: 'Natural ability or talent' }],
      difficulty: 0.7,
    },
  },
  {
    id: 'item.gf.c2.05', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'His argument was so convoluted that it was difficult to see the ______ for the trees.',
      gaps: [{ index: 0, acceptedAnswers: ['wood', 'forest'], hint: 'Idiom: unable to see the main issue because of details' }],
      difficulty: 0.8,
    },
  },
  {
    id: 'item.gf.c2.06', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: 'Were it not ______ her quick thinking, the situation could have been far worse.',
      gaps: [{ index: 0, acceptedAnswers: ['for'], hint: 'Inverted subjunctive conditional: Were it not for = If it had not been for' }],
      difficulty: 0.85,
    },
  },
]

// # ─── READING PASSAGES (12) ──────────────────────────────────────────────
// # Each passage has 4–6 questions in authentic exam formats (TFNG, MCQ,
// # sentence completion, matching, short answer).

const READING_ITEMS: UnifiedSeedItem[] = [
  // # ── A1 reading (2) ──────────────────────────────────────────────────
  {
    id: 'item.rp.a1.01', type: 'reading_passage', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      title: 'City Library Notice',
      passage: 'Welcome to the City Library. The library is open from Monday to Saturday, 9 a.m. to 6 p.m. It is closed on Sundays and public holidays. You can borrow up to 5 books at a time. Books must be returned within 14 days. If you return a book late, you must pay a fine of 50 pence per day. Children under 12 must be with an adult. Free Wi-Fi is available on the first floor. Please keep your phone on silent. There is a café on the ground floor where you can buy drinks and snacks. The café closes at 5 p.m. If you need help finding a book, please ask at the front desk. You will need your library card to borrow books. If you do not have a card, you can get one for free at the front desk. You just need to show your passport or driving licence and proof of address.',
      questions: [
        { id: 'q1', questionType: 'tfng', text: 'The library is open on Sundays.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "It is closed on Sundays and public holidays."' },
        { id: 'q2', questionType: 'tfng', text: 'You can borrow 10 books at a time.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "up to 5 books at a time", not 10.' },
        { id: 'q3', questionType: 'short_answer', text: 'How much is the fine for a late book per day?', options: [], correctAnswer: '50 pence', explanation: 'The passage states "a fine of 50 pence per day".' },
        { id: 'q4', questionType: 'tfng', text: 'The café serves hot meals.', options: ['True', 'False', 'Not Given'], correctAnswer: 2, explanation: 'The passage only mentions "drinks and snacks" — it does not mention hot meals, so we cannot say.' },
      ],
      difficulty: 0.2,
    },
  },
  {
    id: 'item.rp.a1.02', type: 'reading_passage', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      title: 'Hotel Information Card',
      passage: 'Welcome to the Grand View Hotel. Your room number is on your key card. Breakfast is served in the restaurant on the second floor from 7 a.m. to 10 a.m. Check-out time is 11 a.m. If you want to stay longer, please tell the front desk before 10 a.m. The swimming pool is open from 8 a.m. to 8 p.m. Please wear a swimming cap in the pool. The gym is open 24 hours and is on the basement floor. Towels are in your room. You can ask for more towels at the front desk. Free parking is available behind the hotel. The hotel Wi-Fi password is on the card in your room. If you need anything, call the front desk at number 0.',
      questions: [
        { id: 'q1', questionType: 'short_answer', text: 'What time does breakfast start?', options: [], correctAnswer: '7 a.m.', explanation: 'The passage says "from 7 a.m. to 10 a.m."' },
        { id: 'q2', questionType: 'tfng', text: 'The gym closes at midnight.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "The gym is open 24 hours", so it never closes.' },
        { id: 'q3', questionType: 'tfng', text: 'Guests must pay for parking.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "Free parking is available".' },
        { id: 'q4', questionType: 'short_answer', text: 'What must you wear in the swimming pool?', options: [], correctAnswer: 'a swimming cap', explanation: 'The passage states "Please wear a swimming cap in the pool."' },
      ],
      difficulty: 0.2,
    },
  },

  // # ── A2 reading (2) ──────────────────────────────────────────────────
  {
    id: 'item.rp.a2.01', type: 'reading_passage', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      title: 'An Email from a Friend',
      passage: 'Hi Sam,\n\nHow are you? I hope you are well. I am writing to tell you about my new flat. I moved in last week. It is on the third floor of a building near the city centre. There are two bedrooms, a small kitchen, and a living room with a nice view of the park. The bathroom is quite small, but it has a new shower.\n\nThe best thing about the flat is that it is very close to my office. I can walk to work in ten minutes! There is also a supermarket on the ground floor of the building, which is very convenient.\n\nThe only problem is the noise. The street is very busy, especially in the morning. I am thinking about buying some thick curtains to help.\n\nWould you like to come and visit next weekend? We could go to the new Italian restaurant near my flat. I heard the pizza is really good.\n\nLet me know!\n\nBest,\nLucia',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'Why is Lucia writing to Sam?', options: ['To invite Sam to her wedding', 'To tell Sam about her new flat', 'To ask Sam for help moving', 'To complain about her neighbours'], correctAnswer: 1, explanation: 'Lucia says "I am writing to tell you about my new flat."' },
        { id: 'q2', questionType: 'tfng', text: 'The flat has three bedrooms.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "There are two bedrooms", not three.' },
        { id: 'q3', questionType: 'short_answer', text: 'How long does it take Lucia to walk to work?', options: [], correctAnswer: 'ten minutes', explanation: 'She says "I can walk to work in ten minutes!"' },
        { id: 'q4', questionType: 'mcq', text: 'What is the problem with the flat?', options: ['It is too expensive', 'The bathroom is dirty', 'The street is very noisy', 'There is no supermarket nearby'], correctAnswer: 2, explanation: 'Lucia says "The only problem is the noise. The street is very busy."' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.rp.a2.02', type: 'reading_passage', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      title: 'A Day Trip to Brighton',
      passage: 'Last Saturday, my family and I went on a day trip to Brighton. We left our house at 8 o\'clock in the morning and drove for about two hours. The weather was sunny and warm, which was perfect for the beach.\n\nWhen we arrived, we went straight to the beach. The children played in the sand and I went swimming in the sea. The water was cold, but it was very refreshing. After that, we had fish and chips at a café near the pier. The food was delicious and not too expensive.\n\nIn the afternoon, we walked along the pier and the children went on some rides. My daughter loved the carousel but my son was too scared to go on the roller coaster. We also visited the Sea Life Centre, where we saw sharks, jellyfish, and turtles.\n\nWe left Brighton at about 6 o\'clock. Everyone was tired but happy. It was a wonderful day out. I would like to go back in the summer when the days are longer.',
      questions: [
        { id: 'q1', questionType: 'short_answer', text: 'How long did the drive to Brighton take?', options: [], correctAnswer: 'about two hours', explanation: 'The passage says "drove for about two hours."' },
        { id: 'q2', questionType: 'tfng', text: 'The water in the sea was warm.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "The water was cold, but it was very refreshing."' },
        { id: 'q3', questionType: 'mcq', text: 'What did the son NOT want to do?', options: ['Play in the sand', 'Go on the carousel', 'Go on the roller coaster', 'Visit the Sea Life Centre'], correctAnswer: 2, explanation: 'The passage says "my son was too scared to go on the roller coaster."' },
        { id: 'q4', questionType: 'tfng', text: 'The family had lunch at a restaurant in the town centre.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'They "had fish and chips at a café near the pier", not in the town centre.' },
      ],
      difficulty: 0.3,
    },
  },

  // # ── B1 reading (2) — IELTS General style ─────────────────────────────
  {
    id: 'item.rp.b1.01', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'The Rise of Remote Work',
      passage: 'The way people work has changed dramatically in recent years. Before 2020, most employees went to an office every day. However, the global pandemic forced many companies to allow their staff to work from home. What started as a temporary measure has become a permanent change for millions of workers worldwide.\n\nAccording to a recent survey, about 30 per cent of workers now work remotely at least part of the time. Many employees say they prefer remote work because it saves them time and money on commuting. Some workers report that they are more productive at home because there are fewer distractions from colleagues.\n\nHowever, remote work is not without its challenges. Some workers feel isolated and miss the social interaction of an office environment. Others struggle to separate their work life from their personal life when both take place in the same space. There are also concerns about the impact on career progression, as remote workers may be less visible to managers.\n\nCompanies have responded to these challenges in different ways. Some have adopted a hybrid model, where employees work from home two or three days a week and come into the office for the rest. Others have invested in technology to improve communication between remote workers, such as video conferencing and project management tools.\n\nDespite the challenges, experts predict that remote work will continue to grow. A study by a leading business school found that companies offering flexible working arrangements attract more applicants and have lower staff turnover. As technology continues to improve and attitudes to work evolve, the traditional nine-to-five office job may become a thing of the past.',
      questions: [
        { id: 'q1', questionType: 'tfng', text: 'Most employees worked from home before 2020.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "Before 2020, most employees went to an office every day."' },
        { id: 'q2', questionType: 'mcq', text: 'According to the survey, what percentage of workers now work remotely at least some of the time?', options: ['10 per cent', '20 per cent', '30 per cent', '50 per cent'], correctAnswer: 2, explanation: 'The passage states "about 30 per cent of workers now work remotely at least part of the time."' },
        { id: 'q3', questionType: 'tfng', text: 'All workers prefer remote work to office work.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage mentions that "Some workers feel isolated" and face challenges, so not all prefer it.' },
        { id: 'q4', questionType: 'matching', text: 'Match the challenge to the correct description.', options: ['Feeling isolated from colleagues', 'Difficulty separating work and personal life', 'Being less visible to managers', 'Having too many distractions'], correctAnswer: 0, explanation: 'The passage mentions isolation, work-life separation, and career visibility as challenges — but fewer distractions is listed as an advantage, not a challenge.' },
        { id: 'q5', questionType: 'sentence_completion', text: 'Companies offering flexible working arrangements attract more applicants and have lower ______.', options: [], correctAnswer: 'staff turnover', explanation: 'The passage says "have lower staff turnover."' },
      ],
      difficulty: 0.45,
    },
  },
  {
    id: 'item.rp.b1.02', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'How to Reduce Food Waste at Home',
      passage: 'Food waste is a growing problem around the world. In the UK alone, households throw away around 6.6 million tonnes of food each year, much of which could have been eaten. Not only does this waste money, but it also harms the environment. When food ends up in landfill, it produces methane, a greenhouse gas that contributes to climate change.\n\nFortunately, there are many simple steps you can take to reduce food waste at home. One of the most effective is to plan your meals before you go shopping. Make a list of what you need and stick to it. This way, you will only buy what you will actually use.\n\nAnother useful tip is to understand what food labels really mean. "Use by" dates are about safety — you should not eat food after this date. However, "best before" dates are about quality, not safety. Food is often still safe to eat after its best before date, although it might not taste as good.\n\nStoring food correctly can also make a big difference. Keep your fridge at the right temperature (below 5°C) and store fruit and vegetables in the correct part of the fridge. Some foods, like bananas and tomatoes, are better kept outside the fridge.\n\nFinally, if you do have leftover food, try to use it creatively. Yesterday\'s rice can become today\'s fried rice. Vegetables that are starting to go soft can be used in soups or smoothies. If you cannot use food in time, consider freezing it. Most foods can be safely frozen and used later.\n\nBy making these small changes, you can save money, help the environment, and still enjoy delicious meals.',
      questions: [
        { id: 'q1', questionType: 'short_answer', text: 'How much food do UK households throw away each year?', options: [], correctAnswer: '6.6 million tonnes', explanation: 'The passage states "around 6.6 million tonnes of food each year."' },
        { id: 'q2', questionType: 'tfng', text: 'Food after its "best before" date is always unsafe to eat.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: '"Best before" dates are about quality, not safety. Food is often still safe to eat after this date.' },
        { id: 'q3', questionType: 'mcq', text: 'What temperature should a fridge be kept at?', options: ['Below 0°C', 'Below 3°C', 'Below 5°C', 'Below 8°C'], correctAnswer: 2, explanation: 'The passage says "Keep your fridge at the right temperature (below 5°C)."' },
        { id: 'q4', questionType: 'tfng', text: 'Bananas should be kept in the fridge.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "Some foods, like bananas and tomatoes, are better kept outside the fridge."' },
        { id: 'q5', questionType: 'sentence_completion', text: 'When food ends up in landfill, it produces ______, a greenhouse gas.', options: [], correctAnswer: 'methane', explanation: 'The passage says "it produces methane, a greenhouse gas."' },
      ],
      difficulty: 0.4,
    },
  },

  // # ── B2 reading (2) — IELTS Academic style ────────────────────────────
  {
    id: 'item.rp.b2.01', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'The Psychology of Procrastination',
      passage: 'Procrastination — the act of unnecessarily delaying tasks despite knowing this will have negative consequences — affects an estimated 20 per cent of the adult population chronically and virtually everyone occasionally. While it is often dismissed as mere laziness, psychologists have come to understand procrastination as a complex emotional regulation problem rather than a time management one.\n\nDr Fuschia Sirois, a professor of psychology at the University of Sheffield, argues that procrastination is fundamentally about managing negative emotions. When we face a task that triggers anxiety, boredom, frustration, or self-doubt, our brain seeks immediate relief from these unpleasant feelings. Putting the task off provides that relief — but only temporarily. The task remains, and the negative feelings often intensify as the deadline approaches.\n\nThis creates what psychologists call the "procrastination-doom loop." The more we procrastinate, the worse we feel about ourselves, which makes us more likely to procrastinate further. Research published in the Journal of Behavioural Medicine found that chronic procrastinators experience higher levels of stress, worse health outcomes, and lower overall well-being than non-procrastinators.\n\nInterestingly, not all delays constitute procrastination. Strategic delay — choosing to wait because better information will become available or because other tasks are genuinely more important — is a rational decision. Procrastination, by contrast, occurs when someone delays despite knowing they would be better off starting now. The distinguishing factor is awareness: the procrastinator knows they are acting against their own interest.\n\nSeveral strategies have shown promise in combating procrastination. "Implementation intentions" — specific plans of when, where, and how one will complete a task — have been shown to significantly increase follow-through. Breaking large tasks into smaller, more manageable chunks reduces the emotional barrier to starting. And self-compassion, rather than self-criticism, appears to reduce the shame-avoidance cycle that drives much procrastination.\n\nPerhaps most importantly, understanding procrastination as an emotional challenge rather than a character flaw may be the first step toward overcoming it. As Sirois puts it, "The starting point for change is to forgive yourself for procrastinating."',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'According to the passage, procrastination is best understood as:', options: ['A time management problem', 'A sign of laziness', 'An emotional regulation problem', 'A character flaw'], correctAnswer: 2, explanation: 'The passage says procrastination is "a complex emotional regulation problem rather than a time management one."' },
        { id: 'q2', questionType: 'tfng', text: 'Strategic delay is the same as procrastination.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage explicitly distinguishes strategic delay from procrastination: "not all delays constitute procrastination."' },
        { id: 'q3', questionType: 'sentence_completion', text: 'The "procrastination-doom loop" means that the more we procrastinate, the ______ we feel about ourselves.', options: [], correctAnswer: 'worse', explanation: 'The passage says "The more we procrastinate, the worse we feel about ourselves."' },
        { id: 'q4', questionType: 'tfng', text: 'Self-criticism is more effective than self-compassion in reducing procrastination.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "self-compassion, rather than self-criticism, appears to reduce the shame-avoidance cycle."' },
        { id: 'q5', questionType: 'mcq', text: 'What does Dr Sirois suggest as a starting point for overcoming procrastination?', options: ['Setting strict deadlines', 'Using a planner or calendar', 'Forgiving yourself for procrastinating', 'Working with an accountability partner'], correctAnswer: 2, explanation: 'Sirois says "The starting point for change is to forgive yourself for procrastinating."' },
      ],
      difficulty: 0.55,
    },
  },
  {
    id: 'item.rp.b2.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'Urban Green Spaces and Public Health',
      passage: 'In cities around the world, urban green spaces — parks, gardens, tree-lined streets, and even rooftop greenery — are increasingly recognised as vital components of public health infrastructure. A growing body of research suggests that access to nature in urban environments can significantly improve both physical and mental well-being.\n\nA landmark study by the University of Exeter, which tracked over 20,000 participants, found that people who spent at least 120 minutes per week in nature reported significantly higher levels of health and well-being than those who did not. Remarkably, the threshold appeared to be 120 minutes — below this, the benefits were minimal, but above it, additional time brought diminishing returns.\n\nThe mechanisms through which green spaces promote health are varied. Physical activity is the most obvious: parks provide space for walking, running, cycling, and sport. However, researchers have also identified psychological pathways. Exposure to natural environments has been shown to reduce cortisol levels (a marker of stress), lower blood pressure, and improve mood. The Japanese practice of "shinrin-yoku" or "forest bathing" — simply spending time among trees — has been associated with boosted immune function.\n\nThere is also a social dimension. Green spaces serve as meeting places where people from different backgrounds can interact, reducing social isolation and strengthening community bonds. A study in Philadelphia found that when vacant lots were converted to green spaces, nearby residents reported a 42 per cent decrease in feelings of depression and a 76 per cent reduction in gun violence.\n\nDespite this evidence, access to urban green space is far from equal. Research consistently shows that lower-income neighbourhoods and communities of colour have significantly less access to parks and greenery. This environmental injustice compounds existing health disparities, as the populations with the greatest health needs often have the least access to the green spaces that could help.\n\nAddressing this inequality requires intentional urban planning. Cities such as Barcelona, with its "superblocks" programme, and Singapore, which mandates that all new buildings replace any greenery they remove, are leading the way. However, critics warn that "green gentrification" — where new parks drive up property values and displace existing residents — must be carefully managed to ensure that the benefits of urban greening reach those who need them most.',
      questions: [
        { id: 'q1', questionType: 'short_answer', text: 'How many minutes per week in nature showed significant health benefits?', options: [], correctAnswer: '120 minutes', explanation: 'The Exeter study found "people who spent at least 120 minutes per week in nature reported significantly higher levels of health and well-being."' },
        { id: 'q2', questionType: 'tfng', text: 'Spending more than 120 minutes in nature each week provides greatly increased benefits.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "above it, additional time brought diminishing returns."' },
        { id: 'q3', questionType: 'mcq', text: 'The Philadelphia study found that converting vacant lots to green spaces:', options: ['Increased property values by 42%', 'Reduced feelings of depression by 42%', 'Reduced crime by 42%', 'Increased park visits by 42%'], correctAnswer: 1, explanation: 'Residents "reported a 42 per cent decrease in feelings of depression."' },
        { id: 'q4', questionType: 'tfng', text: 'All communities have equal access to urban green spaces.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "access to urban green space is far from equal" and "lower-income neighbourhoods... have significantly less access."' },
        { id: 'q5', questionType: 'sentence_completion', text: '"Green gentrification" refers to new parks driving up ______ and displacing existing residents.', options: [], correctAnswer: 'property values', explanation: 'The passage defines green gentrification as "where new parks drive up property values and displace existing residents."' },
      ],
      difficulty: 0.55,
    },
  },

  // # ── C1 reading (2) — Academic/IELTS Passage 3 style ──────────────────
  {
    id: 'item.rp.c1.01', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      title: 'The Paradox of Choice',
      passage: 'In 1995, the psychologist Sheena Iyengar conducted what would become one of the most cited studies in consumer psychology. At a gourmet food store in California, she set up a tasting booth offering samples of jam. On some days, the booth displayed 24 varieties; on others, just 6. The results were striking: while the larger display attracted more shoppers, those who saw the smaller selection were ten times more likely to actually purchase a jar.\n\nThis experiment became the cornerstone of what psychologist Barry Schwartz later termed "the paradox of choice" — the counterintuitive finding that having more options can lead to worse decisions and lower satisfaction. Schwartz argued in his influential 2004 book that the abundance of choice in modern life, far from liberating us, often leads to anxiety, decision paralysis, and regret.\n\nThe psychological mechanisms underlying this paradox are well documented. When faced with too many options, individuals experience what researchers call "choice overload." The cognitive effort required to evaluate and compare numerous alternatives is exhausting, leading many people to either defer the decision entirely or resort to simplistic heuristics that may not serve their interests. Moreover, the awareness that alternatives exist creates a persistent opportunity cost: whatever one chooses, there is always the nagging thought that another option might have been better.\n\nHowever, the paradox of choice has not escaped criticism. A 2010 meta-analysis by Benjamin Scheibehenne and colleagues, examining 63 studies on the topic, found that the average effect of choice overload was virtually zero. The researchers concluded that the effect is highly dependent on context: factors such as the complexity of the choice, the decision-maker\'s expertise, and the presence or absence of a dominant option all modulate whether more choice helps or hinders.\n\nMore recent research has attempted to reconcile these conflicting findings. Iyengar herself has suggested that the critical variable is not the number of options per se, but whether individuals have clear preferences before encountering them. Those who know what they want benefit from large assortments because they can more easily find their ideal match. Those without clear preferences, however, become overwhelmed by the cognitive demands of forming preferences on the spot.\n\nThe implications extend well beyond supermarket aisles. In healthcare, patients increasingly face complex treatment decisions that can trigger the same paralysis observed in consumer settings. In education, the proliferation of course options at universities has been linked to higher dropout rates among students who lack clear academic goals. And in the digital realm, the seemingly infinite choices offered by streaming platforms and e-commerce sites have spawned an entire industry dedicated to recommendation algorithms — technological solutions to a fundamentally psychological problem.\n\nUltimately, the paradox of choice reveals something deeper about human cognition: our decision-making capacity is a finite resource, and the structures that shape our choices matter as much as the choices themselves.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'In Iyengar\'s jam study, what was the key finding?', options: ['Larger displays led to more purchases', 'Smaller displays led to ten times more purchases', 'Most shoppers did not like jam', 'The type of jam affected purchase rates'], correctAnswer: 1, explanation: 'Those who saw the smaller selection "were ten times more likely to actually purchase a jar."' },
        { id: 'q2', questionType: 'tfng', text: 'The 2010 meta-analysis confirmed that choice overload is a strong, universal effect.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The meta-analysis "found that the average effect of choice overload was virtually zero" and is "highly dependent on context."' },
        { id: 'q3', questionType: 'sentence_completion', text: 'According to Iyengar, people with clear ______ benefit from large assortments.', options: [], correctAnswer: 'preferences', explanation: 'Iyengar suggested "the critical variable is... whether individuals have clear preferences before encountering them."' },
        { id: 'q4', questionType: 'mcq', text: 'The passage suggests that recommendation algorithms are:', options: ['A cause of choice overload', 'A technological solution to a psychological problem', 'More effective than human decision-making', 'Only useful for e-commerce'], correctAnswer: 1, explanation: 'The passage describes them as "technological solutions to a fundamentally psychological problem."' },
        { id: 'q5', questionType: 'tfng', text: 'Schwartz published his book on the paradox of choice in 2010.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says Schwartz published "his influential 2004 book", not 2010.' },
        { id: 'q6', questionType: 'short_answer', text: 'What term do researchers use for the exhaustion caused by evaluating too many options?', options: [], correctAnswer: 'choice overload', explanation: 'The passage says "individuals experience what researchers call choice overload."' },
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'item.rp.c1.02', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      title: 'The Neuroscience of Bilingualism',
      passage: 'For much of the twentieth century, bilingualism was viewed with suspicion by educators and researchers alike. Children who grew up speaking two languages were thought to be at a disadvantage — confused, linguistically delayed, and cognitively burdened by the effort of managing two language systems. This view began to change dramatically in the 1960s when Elizabeth Peal and Wallace Lambert published a groundbreaking study demonstrating that bilingual children in Montreal actually outperformed their monolingual peers on measures of cognitive flexibility and non-verbal intelligence.\n\nSince then, research has consistently shown that bilingualism confers a range of cognitive advantages. The most robust finding concerns executive function — the set of mental processes responsible for attention control, task switching, and inhibiting irrelevant information. Because bilinguals must constantly manage two active language systems, suppressing one while using the other, their executive function networks receive continuous exercise. Neuroimaging studies have shown that bilingual individuals exhibit greater activation in the prefrontal cortex and anterior cingulate cortex during tasks requiring cognitive control.\n\nPerhaps the most striking evidence comes from studies of ageing. Ellen Bialystok and colleagues at York University found that bilingual patients developed symptoms of dementia an average of four to five years later than monolingual patients — a delay comparable to what some pharmaceutical interventions aim to achieve. While bilingualism does not prevent neurodegeneration, the enhanced cognitive reserve built through a lifetime of managing two languages appears to enable the brain to compensate for longer.\n\nThe picture is not entirely straightforward, however. Bilinguals typically have smaller vocabularies in each of their languages compared to monolinguals, and they experience more "tip of the tongue" moments — instances where a word feels accessible but cannot be retrieved. Some researchers argue that these retrieval difficulties are not a sign of deficit but rather a consequence of the larger lexical network that bilinguals must navigate.\n\nRecent research has also complicated the executive function advantage. A large-scale replication study published in 2019 failed to find significant differences between bilingual and monolingual children on standard measures of executive function. Critics of the bilingual advantage hypothesis suggest that publication bias — the tendency for positive results to be published over null findings — may have inflated the apparent benefits.\n\nDespite these debates, the consensus among neuroscientists is that bilingualism fundamentally shapes the brain. Structural imaging studies reveal that bilinguals have greater grey matter density in regions associated with language processing and executive control. The bilingual brain is not simply a monolingual brain with an additional language bolted on; it is a qualitatively different organ, shaped by the constant cognitive demands of navigating between two linguistic worlds.',
      questions: [
        { id: 'q1', questionType: 'tfng', text: 'Before the 1960s, bilingualism was generally considered beneficial for children.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says bilingualism "was viewed with suspicion" and children were "thought to be at a disadvantage."' },
        { id: 'q2', questionType: 'mcq', text: 'What did Bialystok\'s research on ageing find?', options: ['Bilingualism prevents dementia entirely', 'Bilingual patients showed dementia symptoms 4–5 years later', 'Monolingual patients recovered faster from dementia', 'Bilingual patients needed more medication'], correctAnswer: 1, explanation: 'Bilingual patients "developed symptoms of dementia an average of four to five years later than monolingual patients."' },
        { id: 'q3', questionType: 'tfng', text: 'The 2019 replication study confirmed the executive function advantage in bilingual children.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The study "failed to find significant differences between bilingual and monolingual children."' },
        { id: 'q4', questionType: 'sentence_completion', text: 'Bilinguals have greater grey matter ______ in regions associated with language processing.', options: [], correctAnswer: 'density', explanation: 'The passage says "bilinguals have greater grey matter density in regions associated with language processing."' },
        { id: 'q5', questionType: 'mcq', text: 'The passage concludes that the bilingual brain is:', options: ['The same as a monolingual brain with an extra language', 'A qualitatively different organ', 'Less efficient than a monolingual brain', 'Only different during childhood'], correctAnswer: 1, explanation: 'The passage says "it is a qualitatively different organ."' },
      ],
      difficulty: 0.7,
    },
  },

  // # ── C2 reading (2) ──────────────────────────────────────────────────
  {
    id: 'item.rp.c2.01', type: 'reading_passage', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      title: 'The Ethics of Algorithmic Decision-Making',
      passage: 'As algorithmic systems increasingly mediate decisions that shape human lives — from loan approvals and hiring processes to criminal sentencing and medical diagnoses — the question of algorithmic fairness has moved from the margins of computer science to the centre of public discourse. Yet the closer one examines the concept, the more elusive a satisfactory definition becomes.\n\nThe difficulty is not merely technical but philosophical. Consider three widely accepted mathematical definitions of fairness: demographic parity (the algorithm\'s positive outcomes should be distributed equally across demographic groups), equalised odds (the algorithm\'s error rates should be equal across groups), and calibration (among those assigned a given risk score, the actual risk should be the same regardless of group membership). In 2016, Jon Kleinberg and colleagues proved that, except in trivial cases, no algorithm can simultaneously satisfy all three. This impossibility result is not a limitation of current technology — it is a mathematical certainty.\n\nThe implications are profound. Every deployment of an algorithmic system in a context involving protected characteristics requires an implicit or explicit choice about which conception of fairness to prioritise. A recidivism prediction tool that achieves calibration — equally accurate across racial groups — will necessarily produce different false positive rates. A hiring algorithm that achieves demographic parity may do so at the expense of predictive accuracy within specific groups. These trade-offs are not bugs to be fixed but inherent features of any classification system operating in a world where base rates differ across populations.\n\nCritics of the algorithmic fairness framework argue that it fundamentally misconstrues the problem. Ruha Benjamin, in her influential work "Race After Technology," contends that focusing on mathematical fairness criteria within algorithmic systems distracts from the structural inequalities that produce the training data in the first place. If historical hiring data reflects decades of discrimination, an algorithm trained on that data will reproduce those patterns regardless of which fairness metric is applied. The solution, Benjamin argues, lies not in fairer algorithms but in addressing the upstream social conditions that generate biased data.\n\nProponents of algorithmic decision-making counter that the relevant comparison is not between algorithmic and ideal human judgment, but between algorithmic and actual human judgment — which is itself riddled with cognitive biases, inconsistencies, and prejudices that are far less transparent and harder to audit than those of an algorithm. A biased algorithm, they argue, is at least consistently biased and can be measured, tested, and improved. A biased human decision-maker may apply different standards to different individuals without even being aware of doing so.\n\nThis debate reveals a deeper tension in contemporary approaches to ethics and technology. The dominant framework — what philosopher Langdon Winner calls the "artefacts have politics" perspective — holds that technological systems embody the values and power structures of their creators. But this perspective risks determinism: the implication that technology mechanically reproduces existing inequalities leaves little room for agency or reform. An alternative view, drawing on the work of philosophers of technology such as Peter-Paul Verbeek, holds that technologies actively mediate the relationship between humans and their world, creating new possibilities as well as new constraints. On this view, algorithms are neither neutral tools nor deterministic reproducing machines, but active participants in the ongoing negotiation of social values.\n\nNavigating these competing frameworks requires what the ethicist Shannon Vallor calls "technomoral wisdom" — the capacity to discern and enact good values in a technological context that is characterised by novelty, ambiguity, and opacity. This is not a technical skill but a practical one, cultivated through experience, reflection, and dialogue. It demands that we resist both the techno-utopian fantasy that algorithms will solve our deepest social problems and the techno-pessimist conviction that they will inevitably make them worse.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'Kleinberg and colleagues proved that:', options: ['Algorithmic fairness is always achievable', 'Three fairness definitions cannot all be satisfied simultaneously', 'Demographic parity is the best fairness measure', 'Algorithms are inherently biased'], correctAnswer: 1, explanation: 'They "proved that, except in trivial cases, no algorithm can simultaneously satisfy all three."' },
        { id: 'q2', questionType: 'tfng', text: 'Ruha Benjamin supports the use of mathematical fairness criteria within algorithms.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'Benjamin "contends that focusing on mathematical fairness criteria... distracts from the structural inequalities."' },
        { id: 'q3', questionType: 'mcq', text: 'Proponents of algorithmic decision-making argue that biased algorithms are preferable to biased humans because:', options: ['Algorithms are never biased', 'Algorithmic bias can be measured and improved', 'Humans always make worse decisions', 'Regulations require algorithmic decisions'], correctAnswer: 1, explanation: 'A biased algorithm "is at least consistently biased and can be measured, tested, and improved."' },
        { id: 'q4', questionType: 'sentence_completion', text: 'Shannon Vallor argues that navigating ethical technology decisions requires "______."', options: [], correctAnswer: 'technomoral wisdom', explanation: 'Vallor calls for "technomoral wisdom — the capacity to discern and enact good values in a technological context."' },
        { id: 'q5', questionType: 'tfng', text: 'Peter-Paul Verbeek views technologies as neutral tools.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'Verbeek holds that "algorithms are neither neutral tools nor deterministic reproducing machines."' },
      ],
      difficulty: 0.8,
    },
  },
  {
    id: 'item.rp.c2.02', type: 'reading_passage', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      title: 'The Decline of Deep Reading',
      passage: 'In 2018, the cognitive neuroscientist Maryanne Wolf published "Reader, Come Home," an impassioned warning about the erosion of what she calls "deep reading" — the slow, immersive, critically engaged mode of reading that has characterised literate culture for centuries. Wolf\'s concern is not that people are reading less (though some evidence suggests they are), but that the pervasive influence of digital media is fundamentally altering the neural circuits that support deep reading, even when we read print.\n\nThe argument rests on a well-established principle of neuroscience: the brain is shaped by what it does. Unlike spoken language, for which humans have dedicated neural architecture, reading is a culturally invented skill that must be laboriously wired into the brain through years of practice. The reading circuit — a complex network connecting visual, linguistic, and cognitive regions — is not hardwired; it is learned, and what is learned can be unlearned or reshaped by changes in reading behaviour.\n\nWolf and others argue that digital reading habits are reshaping this circuit in concerning ways. Online reading is typically characterised by scanning, skimming, and rapid switching between texts — behaviours optimised for the fast-moving, hyperlinked digital environment. Neuroimaging research suggests that habitual digital readers develop stronger scanning circuits but weaker deep-reading circuits. The result, Wolf warns, is a "bi-literate brain" that can navigate digital text efficiently but struggles with the sustained attention and critical analysis required by complex print texts.\n\nThe stakes, according to Wolf, extend beyond individual reading ability to the foundations of democratic society. Deep reading, she argues, is the cognitive basis for empathy — the ability to inhabit another person\'s perspective — because it requires readers to slow down, reflect, and imaginatively project themselves into unfamiliar experiences. It is also the basis for critical analysis: the capacity to follow a complex argument, weigh evidence, and distinguish reasoning from rhetoric. If these capacities atrophy, the consequences for public discourse, she suggests, could be severe.\n\nNot all researchers share Wolf\'s alarm. Naomi Baron, a linguist at American University who has studied reading habits extensively, acknowledges that digital reading involves different cognitive strategies but questions whether these represent a decline rather than an adaptation. Young digital natives, she argues, may develop cognitive skills — rapid information synthesis, multimodal processing, and distributed attention — that are better suited to the demands of a twenty-first-century information environment. The assumption that deep, sustained reading represents the pinnacle of cognitive achievement, she suggests, may itself reflect a historical bias rather than a universal truth.\n\nThe tension between these perspectives may ultimately be irresolvable because it rests on a normative question about what kinds of cognitive engagement we most value. If deep reading is an unqualified good, then its decline is a loss. If it is one valuable mode among several, each suited to different purposes, then the shift toward scanning and skimming may represent not a loss but a rebalancing. What is clear, however, is that the choices we make about how and what we read — and how we teach children to read — will shape not only individual minds but the collective cognitive capacities of generations to come.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'Wolf\'s primary concern is that:', options: ['People have stopped reading entirely', 'Digital media is changing the neural circuits for deep reading', 'Print books are becoming too expensive', 'Children are reading too many books'], correctAnswer: 1, explanation: 'Wolf\'s concern is that "digital media is fundamentally altering the neural circuits that support deep reading."' },
        { id: 'q2', questionType: 'tfng', text: 'Humans have a dedicated neural architecture for reading, similar to spoken language.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "Unlike spoken language, for which humans have dedicated neural architecture, reading is a culturally invented skill."' },
        { id: 'q3', questionType: 'short_answer', text: 'What term does Wolf use for a brain that can scan digital text but struggles with complex print?', options: [], correctAnswer: 'bi-literate brain', explanation: 'Wolf warns of a "bi-literate brain" that can navigate digital text but struggles with sustained attention.' },
        { id: 'q4', questionType: 'mcq', text: 'Naomi Baron suggests that digital reading may represent:', options: ['A cognitive decline', 'An adaptation rather than a decline', 'The death of literacy', 'A return to oral culture'], correctAnswer: 1, explanation: 'Baron "questions whether these represent a decline rather than an adaptation."' },
        { id: 'q5', questionType: 'tfng', text: 'The passage concludes that deep reading is definitively superior to digital scanning.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says "the tension may ultimately be irresolvable" and presents it as a normative question, not a settled one.' },
      ],
      difficulty: 0.8,
    },
  },
]

// # ─── WRITING TASKS (18) ────────────────────────────────────────────────
// # IELTS Task 1 (chart), Task 2 (essay), OET referral letters, PTE summaries,
// # and general writing practice for A1–B1.

const WRITING_ITEMS: UnifiedSeedItem[] = [
  // # ── A1–A2 basic writing (2) ─────────────────────────────────────────
  {
    id: 'item.wt.a1.01', type: 'writing_task', level: 'A1', skill: 'writing',
    nodeIds: ['cando.a1.write_simple_phrases'],
    payload: {
      prompt: 'Write an email to a new friend. Introduce yourself. Say your name, where you are from, and what you do. Write 30–50 words.',
      format: 'short_message',
      minWords: 30, maxWords: 60, timeMinutes: 10,
      rubric: [
        { name: 'Task Completion', description: 'Includes name, origin, and occupation', maxScore: 3 },
        { name: 'Grammar', description: 'Uses present simple correctly', maxScore: 3 },
        { name: 'Vocabulary', description: 'Uses basic personal vocabulary', maxScore: 3 },
      ],
      modelAnswer: 'Hi! My name is Ana. I am from Spain. I live in Madrid. I am a student at the university. I study English and History. I like reading books and playing football. Nice to meet you!',
      difficulty: 0.15,
    },
  },
  {
    id: 'item.wt.a2.01', type: 'writing_task', level: 'A2', skill: 'writing',
    nodeIds: ['cando.a2.write_short_messages'],
    payload: {
      prompt: 'You went on holiday last week. Write a postcard to your friend. Tell them where you went, what you did, and whether you enjoyed it. Write 50–80 words.',
      format: 'short_message',
      minWords: 50, maxWords: 100, timeMinutes: 15,
      rubric: [
        { name: 'Task Completion', description: 'Mentions location, activities, and opinion', maxScore: 3 },
        { name: 'Grammar', description: 'Uses past simple correctly', maxScore: 3 },
        { name: 'Vocabulary', description: 'Uses travel and activity vocabulary', maxScore: 3 },
      ],
      modelAnswer: 'Dear Tom, I went to Barcelona last week. The weather was sunny and warm. I visited the Sagrada Familia — it was amazing! I also went to the beach and ate lots of delicious tapas. My favourite day was when we went on a boat trip. I had a wonderful time. I hope you are well. See you soon! Maria',
      difficulty: 0.25,
    },
  },

  // # ── B1 connected text (2) ───────────────────────────────────────────
  {
    id: 'item.wt.b1.01', type: 'writing_task', level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    payload: {
      prompt: 'Write an essay about the advantages and disadvantages of living in a big city. Give your own opinion. Write 120–180 words.',
      format: 'essay',
      minWords: 120, maxWords: 200, timeMinutes: 25,
      rubric: [
        { name: 'Task Achievement', description: 'Covers both advantages and disadvantages with personal opinion', maxScore: 5 },
        { name: 'Coherence', description: 'Clear paragraphs with linking words', maxScore: 5 },
        { name: 'Vocabulary', description: 'Range of topic-related vocabulary', maxScore: 5 },
        { name: 'Grammar', description: 'Accuracy of B1-level structures', maxScore: 5 },
      ],
      modelAnswer: 'Living in a big city has both advantages and disadvantages. On the one hand, cities offer many opportunities for work and education. There are more jobs available and better schools and universities. Cities also have better transport, more shops, and a wider range of entertainment options such as cinemas, theatres, and restaurants.\n\nOn the other hand, life in a big city can be stressful. The cost of living is usually higher, especially rent. Traffic and pollution are serious problems in many cities, and crime rates tend to be higher than in smaller towns. People in cities can also feel lonely because they do not always know their neighbours.\n\nIn my opinion, the advantages of city life outweigh the disadvantages, especially for young people who are looking for career opportunities. However, I think it is important to find a balance and spend time in nature when possible.',
      difficulty: 0.4,
    },
  },
  {
    id: 'item.wt.b1.02', type: 'writing_task', level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    payload: {
      prompt: 'You recently stayed at a hotel and were not happy with the service. Write a letter of complaint to the hotel manager. Explain what went wrong and what you would like them to do. Write 120–180 words.',
      format: 'letter_formal',
      minWords: 120, maxWords: 200, timeMinutes: 25,
      scenario: 'You stayed at the Grand Palace Hotel for 3 nights. Your room was not cleaned on the second day, the air conditioning did not work, and the breakfast buffet closed early.',
      rubric: [
        { name: 'Task Achievement', description: 'States complaints clearly and makes a reasonable request', maxScore: 5 },
        { name: 'Tone', description: 'Formal but polite', maxScore: 5 },
        { name: 'Coherence', description: 'Logical order of complaints', maxScore: 5 },
        { name: 'Grammar', description: 'Accuracy of formal language structures', maxScore: 5 },
      ],
      modelAnswer: 'Dear Sir or Madam,\n\nI am writing to complain about my recent stay at the Grand Palace Hotel from 15 to 18 July.\n\nFirstly, my room was not cleaned on the second day. When I asked at reception, they apologised but the room was still not cleaned until the following morning. Secondly, the air conditioning in my room did not work properly. The room was very hot, and despite reporting the problem, no one came to fix it. Finally, the breakfast buffet closed at 8:30 a.m. rather than 10 a.m. as stated on your website, so I missed breakfast on my last morning.\n\nI was very disappointed with the level of service, as I had expected better from a four-star hotel. I would appreciate a partial refund or a voucher for a future stay.\n\nI look forward to hearing from you.\n\nYours faithfully,\nMaria Santos',
      difficulty: 0.45,
    },
  },

  // # ── B2 IELTS Writing Task 1 (chart description) (2) ─────────────────
  {
    id: 'item.wt.b2.t1.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The bar chart below shows the number of international students enrolled in four different universities in 2015 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      format: 'chart_description',
      minWords: 150, maxWords: 250, timeMinutes: 20,
      chartData: 'University A: 2015 = 3,200 students, 2023 = 5,800 students. University B: 2015 = 4,500 students, 2023 = 4,200 students. University C: 2015 = 2,100 students, 2023 = 6,400 students. University D: 2015 = 5,000 students, 2023 = 5,100 students.',
      rubric: [
        { name: 'Task Achievement', description: 'Covers main trends and makes comparisons', maxScore: 9 },
        { name: 'Coherence and Cohesion', description: 'Clear overview and logical progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Range and accuracy of vocabulary', maxScore: 9 },
        { name: 'Grammatical Range and Accuracy', description: 'Variety of sentence structures', maxScore: 9 },
      ],
      modelAnswer: 'The bar chart illustrates the number of international students at four universities in 2015 and 2023.\n\nOverall, Universities A and C saw significant increases in international enrolment over the period, while University B experienced a slight decline and University D remained relatively stable.\n\nIn 2015, University D had the highest number of international students at 5,000, followed closely by University B with 4,500. Universities A and C had considerably fewer, with 3,200 and 2,100 respectively.\n\nBy 2023, the picture had changed substantially. University C saw the most dramatic growth, nearly tripling its international student population to 6,400, making it the university with the highest enrolment. University A also grew significantly, rising from 3,200 to 5,800. In contrast, University B\'s numbers fell slightly to 4,200, while University D showed only marginal growth, reaching 5,100.\n\nThe data suggests that Universities A and C became increasingly attractive to international students during this period, while the other two universities struggled to maintain their earlier appeal.',
      difficulty: 0.55,
    },
  },
  {
    id: 'item.wt.b2.t1.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The line graph below shows the percentage of households in three countries that had access to the internet between 2005 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      format: 'chart_description',
      minWords: 150, maxWords: 250, timeMinutes: 20,
      chartData: 'Country X: 2005 = 35%, 2010 = 55%, 2015 = 72%, 2020 = 88%, 2023 = 93%. Country Y: 2005 = 15%, 2010 = 30%, 2015 = 48%, 2020 = 70%, 2023 = 82%. Country Z: 2005 = 8%, 2010 = 18%, 2015 = 35%, 2020 = 55%, 2023 = 68%.',
      rubric: [
        { name: 'Task Achievement', description: 'Covers main trends and makes comparisons', maxScore: 9 },
        { name: 'Coherence and Cohesion', description: 'Clear overview and logical progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Range and accuracy of vocabulary', maxScore: 9 },
        { name: 'Grammatical Range and Accuracy', description: 'Variety of sentence structures', maxScore: 9 },
      ],
      modelAnswer: 'The line graph compares internet access in three countries from 2005 to 2023.\n\nOverall, all three countries experienced significant growth in household internet access over the period, though Country X consistently maintained the highest rates while Country Z had the lowest.\n\nIn 2005, Country X already had the highest internet penetration at 35%, more than double that of Country Y (15%) and over four times that of Country Z (8%). By 2023, Country X had reached 93%, approaching near-universal coverage.\n\nCountry Y showed the steepest growth in proportional terms, rising from 15% to 82% — more than a fivefold increase. The most rapid period of growth occurred between 2015 and 2020, when the figure jumped from 48% to 70%.\n\nCountry Z, while starting from the lowest base, followed a similar trajectory, climbing from 8% to 68%. Notably, the gap between Countries Y and Z narrowed from 7 percentage points in 2005 to 14 in 2023, suggesting that while both grew, Country Y grew faster.\n\nThe data indicates a global trend toward increasing internet access, with previously less-connected countries making rapid progress.',
      difficulty: 0.55,
    },
  },

  // # ── B2 IELTS Writing Task 2 (essay) (2) ──────────────────────────────
  {
    id: 'item.wt.b2.t2.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Some people believe that university education should be free for everyone. Others argue that students should pay for their own education. Discuss both views and give your own opinion. Write at least 250 words.',
      format: 'essay',
      minWords: 250, maxWords: 400, timeMinutes: 40,
      rubric: [
        { name: 'Task Achievement', description: 'Addresses both views with a clear personal position', maxScore: 9 },
        { name: 'Coherence and Cohesion', description: 'Well-organised with clear progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Wide range of vocabulary with precision', maxScore: 9 },
        { name: 'Grammatical Range and Accuracy', description: 'Complex structures with few errors', maxScore: 9 },
      ],
      modelAnswer: 'The question of whether university education should be funded by the state or by individual students has been the subject of considerable debate. While both positions have merit, I believe that a balanced approach — combining public funding with moderate student contributions — offers the most sustainable solution.\n\nThose who advocate for free university education argue that it promotes social equality by ensuring that financial circumstances do not determine access to higher learning. In countries such as Germany and Norway, where tuition fees are minimal or non-existent, university participation rates are among the highest in the world. Furthermore, a more educated population benefits society as a whole through higher productivity, greater innovation, and lower rates of unemployment and crime.\n\nOn the other hand, opponents of free education contend that it is neither financially sustainable nor necessarily equitable. University graduates typically earn significantly more over their lifetimes than non-graduates, so asking taxpayers — many of whom did not attend university — to fund the education of future high earners could be seen as a regressive transfer of wealth. Additionally, when education is free, there is a risk that students may not take their studies seriously, leading to higher dropout rates and wasted public resources.\n\nIn my view, a compromise is the most practical approach. Governments should ensure that financial barriers do not prevent talented students from accessing higher education, through a combination of subsidised tuition and income-contingent loans. This system, as practised in countries like Australia, ensures that graduates contribute to the cost of their education only when they are earning above a certain threshold, thereby balancing individual responsibility with social equity.\n\nIn conclusion, while the ideal of free education is noble, a well-designed system of shared costs can achieve the same goals of access and equity without placing an unsustainable burden on public finances.',
      difficulty: 0.6,
    },
  },
  {
    id: 'item.wt.b2.t2.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'In many countries, the number of people choosing to live alone is increasing. What are the reasons for this trend? Is it a positive or negative development? Write at least 250 words.',
      format: 'essay',
      minWords: 250, maxWords: 400, timeMinutes: 40,
      rubric: [
        { name: 'Task Achievement', description: 'Explains causes and evaluates whether positive or negative', maxScore: 9 },
        { name: 'Coherence and Cohesion', description: 'Well-organised with clear progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Wide range of vocabulary with precision', maxScore: 9 },
        { name: 'Grammatical Range and Accuracy', description: 'Complex structures with few errors', maxScore: 9 },
      ],
      modelAnswer: 'The trend toward solo living is one of the most significant demographic shifts of the twenty-first century. In many developed countries, single-person households now account for over a third of all households. This essay will examine the causes of this trend and argue that, while it offers certain advantages, its overall impact is a cause for concern.\n\nSeveral factors explain the rise in solo living. Firstly, increasing economic prosperity has made it financially feasible for more people to live independently. Secondly, changing social attitudes — particularly the declining stigma around remaining unmarried and the growing emphasis on individual autonomy — have made living alone a more socially acceptable choice. Thirdly, demographic trends such as rising divorce rates, later marriage, and increasing life expectancy mean that more people find themselves living alone at various stages of life.\n\nThis trend brings undeniable benefits. People who live alone often report greater freedom and control over their daily lives. They can pursue personal interests, maintain their own schedules, and create living spaces that reflect their individual preferences. For many, living alone is a positive expression of independence rather than a symptom of isolation.\n\nHowever, the negative implications cannot be ignored. Research consistently links living alone — particularly among the elderly — with higher rates of loneliness, depression, and physical health problems. At a societal level, single-person households are less environmentally efficient, consuming more energy and resources per person than shared households. There are also economic concerns, as individuals living alone may be more vulnerable to financial hardship.\n\nIn conclusion, while solo living reflects positive social changes such as greater personal freedom, its association with loneliness and environmental inefficiency suggests that it is, on balance, a development that requires careful management through community-building initiatives and supportive social policies.',
      difficulty: 0.6,
    },
  },

  // # ── OET Writing (referral letter) (2) ────────────────────────────────
  {
    id: 'item.wt.oet.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    payload: {
      prompt: 'Using the case notes below, write a letter of referral to Dr Sarah Chen, a cardiologist at City General Hospital. In your letter, expand the relevant case notes into complete sentences. Use letter format. The body of the letter should be approximately 180–200 words.',
      format: 'letter_formal',
      minWords: 180, maxWords: 220, timeMinutes: 45,
      caseNotes: 'Patient: Mr James Thompson, 58 years old. Occupation: retired teacher. Social history: lives with wife, non-smoker, drinks 2 units alcohol/week. Presenting complaint: chest pain on exertion, increasing over past 3 months. Currently occurs when climbing stairs or walking uphill. Relieved by rest. No pain at rest. Medical history: hypertension (diagnosed 2019, managed with lisinopril 10mg daily), type 2 diabetes (diagnosed 2021, managed with metformin 500mg twice daily), BMI 29. Family history: father died of MI at age 62. Investigations: BP 145/92, ECG: normal sinus rhythm, no ST changes at rest. Fasting glucose 7.2 mmol/L. Total cholesterol 6.8 mmol/L. Plan: refer to cardiology for exercise stress test and further assessment.',
      rubric: [
        { name: 'Overall Task Fulfilment', description: 'All relevant case notes expanded appropriately', maxScore: 7 },
        { name: 'Appropriateness of Language', description: 'Formal tone suitable for professional referral', maxScore: 7 },
        { name: 'Comprehension of Stimulus', description: 'Accurate use of case note information', maxScore: 7 },
        { name: 'Linguistic Features', description: 'Grammar, vocabulary, spelling, punctuation', maxScore: 7 },
      ],
      modelAnswer: 'Dear Dr Chen,\n\nRe: Mr James Thompson, DOB 15/03/1968\n\nI am writing to refer Mr Thompson, a 58-year-old retired teacher, for cardiology assessment regarding chest pain on exertion.\n\nMr Thompson has been experiencing chest pain during physical activity over the past three months. The pain occurs when climbing stairs or walking uphill and is relieved by rest. He reports no chest pain at rest.\n\nHis relevant medical history includes hypertension, diagnosed in 2019 and currently managed with lisinopril 10mg daily, and type 2 diabetes, diagnosed in 2021 and managed with metformin 500mg twice daily. His BMI is 29. Notably, his father died of a myocardial infarction at the age of 62.\n\nMr Thompson is a non-smoker who consumes approximately two units of alcohol per week. He lives at home with his wife.\n\nOn examination, his blood pressure was 145/92 mmHg. A resting ECG showed normal sinus rhythm with no ST changes. His fasting glucose was 7.2 mmol/L and total cholesterol was 6.8 mmol/L.\n\nI would be grateful if you could arrange an exercise stress test and further assessment to investigate the cause of his symptoms.\n\nYours sincerely,',
      difficulty: 0.6,
    },
  },
  {
    id: 'item.wt.oet.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    payload: {
      prompt: 'Using the case notes below, write a letter of referral to the Community Mental Health Team at Westfield Clinic. In your letter, expand the relevant case notes into complete sentences. Use letter format. The body of the letter should be approximately 180–200 words.',
      format: 'letter_formal',
      minWords: 180, maxWords: 220, timeMinutes: 45,
      caseNotes: 'Patient: Ms Emily Rodriguez, 32 years old. Occupation: primary school teacher (currently on sick leave). Social history: lives alone, no children, limited social support. Presenting complaint: persistent low mood, loss of interest in activities, difficulty sleeping (waking at 3 a.m.), fatigue, poor concentration at work for past 6 weeks. Denies suicidal ideation. No history of self-harm. Medical history: nil significant. No previous mental health history. Medication: none. Current management: started on sertraline 50mg daily 2 weeks ago — no significant improvement yet. PHQ-9 score: 18 (moderately severe depression). Plan: refer for psychological therapy (CBT) and ongoing monitoring.',
      rubric: [
        { name: 'Overall Task Fulfilment', description: 'All relevant case notes expanded appropriately', maxScore: 7 },
        { name: 'Appropriateness of Language', description: 'Formal tone suitable for professional referral', maxScore: 7 },
        { name: 'Comprehension of Stimulus', description: 'Accurate use of case note information', maxScore: 7 },
        { name: 'Linguistic Features', description: 'Grammar, vocabulary, spelling, punctuation', maxScore: 7 },
      ],
      modelAnswer: 'Dear Community Mental Health Team,\n\nRe: Ms Emily Rodriguez, DOB 22/09/1994\n\nI am writing to refer Ms Rodriguez, a 32-year-old primary school teacher, for psychological therapy following a presentation of moderately severe depression.\n\nMs Rodriguez presented six weeks ago with persistent low mood, loss of interest in previously enjoyed activities, early morning wakening at approximately 3 a.m., fatigue, and difficulty concentrating at work. She is currently on sick leave from her teaching position. She denies any suicidal ideation and has no history of self-harm.\n\nMs Rodriguez has no significant past medical or psychiatric history and was not taking any medication prior to this episode. She lives alone and reports limited social support.\n\nHer PHQ-9 score is 18, indicating moderately severe depression. She was commenced on sertraline 50mg daily two weeks ago; however, there has been no significant improvement in symptoms to date.\n\nI would be grateful if your team could assess Ms Rodriguez for cognitive behavioural therapy and provide ongoing monitoring alongside her pharmacological treatment. Given her limited social support, early intervention would be particularly beneficial.\n\nYours faithfully,',
      difficulty: 0.6,
    },
  },

  // # ── PTE Summarize Written Text (2) ───────────────────────────────────
  {
    id: 'item.wt.pte.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    payload: {
      prompt: 'Read the passage below and summarise it using one sentence. Your response must be between 5 and 75 words. You have 10 minutes to complete this task.\n\nPassage: "The concept of emotional intelligence, first popularised by Daniel Goleman in 1995, has transformed how organisations think about leadership and workplace effectiveness. Research suggests that emotional intelligence — the ability to recognise, understand, and manage one\'s own emotions while also being able to influence the emotions of others — is a stronger predictor of workplace success than traditional measures of cognitive intelligence. Companies that prioritise emotional intelligence in their hiring and training processes report higher employee engagement, better team collaboration, and lower staff turnover."',
      format: 'summary',
      minWords: 5, maxWords: 75, timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Captures the main idea accurately', maxScore: 2 },
        { name: 'Form', description: 'Single sentence between 5–75 words', maxScore: 1 },
        { name: 'Grammar', description: 'Correct grammatical structure', maxScore: 2 },
        { name: 'Vocabulary', description: 'Appropriate academic vocabulary', maxScore: 2 },
      ],
      modelAnswer: 'Emotional intelligence, which involves recognising and managing emotions in oneself and others, has been shown to be a stronger predictor of workplace success than cognitive intelligence, leading organisations to incorporate it into hiring and training practices to improve engagement, collaboration, and employee retention.',
      difficulty: 0.55,
    },
  },
  {
    id: 'item.wt.pte.02', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: {
      prompt: 'Read the passage below and summarise it using one sentence. Your response must be between 5 and 75 words. You have 10 minutes to complete this task.\n\nPassage: "Coral reefs, which cover less than 1% of the ocean floor, support approximately 25% of all marine species. However, rising ocean temperatures caused by climate change are triggering mass bleaching events with increasing frequency. When water temperatures rise even 1-2°C above normal, corals expel the symbiotic algae that provide them with both colour and up to 90% of their energy, turning white and becoming vulnerable to starvation and disease. Scientists warn that if current warming trends continue, 70-90% of the world\'s coral reefs could be lost by 2050."',
      format: 'summary',
      minWords: 5, maxWords: 75, timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Captures the main idea accurately', maxScore: 2 },
        { name: 'Form', description: 'Single sentence between 5–75 words', maxScore: 1 },
        { name: 'Grammar', description: 'Correct grammatical structure', maxScore: 2 },
        { name: 'Vocabulary', description: 'Appropriate academic vocabulary', maxScore: 2 },
      ],
      modelAnswer: 'Coral reefs, which despite covering less than 1% of the ocean floor support a quarter of all marine species, are being devastated by climate change-induced mass bleaching events that cause corals to expel their symbiotic algae, with scientists predicting that 70-90% of reefs could be lost by 2050 if warming trends persist.',
      difficulty: 0.65,
    },
  },

  // # ── C1/C2 Academic writing (2) ──────────────────────────────────────
  {
    id: 'item.wt.c1.01', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: {
      prompt: 'Some people argue that artificial intelligence will eventually replace most human jobs. Others believe that AI will create more jobs than it destroys. Discuss both perspectives and give your own opinion, supporting it with examples. Write at least 300 words.',
      format: 'essay',
      minWords: 300, maxWords: 500, timeMinutes: 45,
      rubric: [
        { name: 'Task Achievement', description: 'Thorough discussion of both views with well-supported opinion', maxScore: 9 },
        { name: 'Coherence and Cohesion', description: 'Sophisticated paragraph structure and cohesive devices', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Precise, sophisticated vocabulary with minimal errors', maxScore: 9 },
        { name: 'Grammatical Range and Accuracy', description: 'Wide range of complex structures used accurately', maxScore: 9 },
      ],
      modelAnswer: 'The rapid advancement of artificial intelligence has sparked intense debate about its implications for the future of work. While some commentators predict widespread technological unemployment, others foresee a transformation of the labour market that will ultimately create more opportunities than it eliminates. This essay will examine both perspectives before arguing that the outcome will depend largely on the policy choices societies make in the coming decades.\n\nThose who predict mass unemployment point to the accelerating capabilities of AI systems. Unlike previous waves of automation, which primarily affected manual and routine tasks, modern AI can increasingly perform cognitive work — writing, analysis, translation, and even creative tasks. A widely cited study by Oxford researchers estimated that 47% of US jobs are at high risk of automation. The concern is that this wave of displacement will be too rapid and too broad for displaced workers to retrain and find new employment.\n\nConversely, optimists argue that technological revolutions have historically created more jobs than they have destroyed. The agricultural revolution, the industrial revolution, and the digital revolution all caused significant short-term disruption but ultimately led to higher living standards and new categories of employment that were previously unimaginable. They suggest that AI will follow the same pattern, automating routine aspects of existing jobs while creating entirely new roles — AI trainers, ethics consultants, human-AI collaboration specialists — that we cannot yet envision.\n\nIn my assessment, both perspectives contain elements of truth, but neither fully captures the complexity of the situation. The historical analogy, while comforting, may be misleading: previous technological revolutions unfolded over decades, allowing gradual adaptation, whereas AI capabilities are advancing at an unprecedented pace. However, the pessimistic scenario assumes a degree of technological determinism that ignores the role of institutional responses.\n\nThe critical variable, I believe, is not the technology itself but the policy infrastructure surrounding it. Societies that invest heavily in continuous education, strengthen social safety nets, and implement frameworks for equitable distribution of AI-generated productivity gains are likely to see the technology as a net positive. Those that leave the transition to market forces alone risk creating a deeply divided economy.\n\nIn conclusion, while AI will undoubtedly transform the labour market profoundly, whether this transformation proves beneficial or harmful will be determined not by algorithms but by the collective choices of policymakers, educators, and citizens.',
      difficulty: 0.75,
    },
  },
  {
    id: 'item.wt.c2.01', type: 'writing_task', level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: {
      prompt: 'Write a report for a university research committee evaluating the effectiveness of online learning compared to traditional classroom instruction. Draw on evidence from multiple perspectives (pedagogical, technological, social, economic) and make recommendations for future policy. Write 350–500 words.',
      format: 'report',
      minWords: 350, maxWords: 500, timeMinutes: 50,
      rubric: [
        { name: 'Task Achievement', description: 'Comprehensive evaluation from multiple perspectives with clear recommendations', maxScore: 9 },
        { name: 'Coherence and Cohesion', description: 'Report structure with headings, executive summary, sections', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Sophisticated academic register with precision', maxScore: 9 },
        { name: 'Grammatical Range and Accuracy', description: 'Full range of structures used with consistent accuracy', maxScore: 9 },
      ],
      modelAnswer: 'Report: Evaluating Online Learning Effectiveness\n\nExecutive Summary\nThis report evaluates the comparative effectiveness of online and traditional classroom instruction across pedagogical, technological, social, and economic dimensions. While online learning offers significant advantages in accessibility and cost-efficiency, evidence suggests that a hybrid model combining the strengths of both modalities yields the best outcomes for most learner populations.\n\n1. Pedagogical Effectiveness\nMeta-analyses of learning outcomes present a nuanced picture. The U.S. Department of Education\'s comprehensive review found that students in online conditions performed modestly better than those in face-to-face instruction, but the strongest results were achieved by blended learning approaches. However, these findings mask significant variation: online learning appears equally effective for motivated, self-directed learners but substantially less effective for students who lack strong study skills or require structured support.\n\n2. Technological Considerations\nRecent advances in adaptive learning platforms, AI-powered tutoring systems, and immersive technologies have significantly enhanced the potential of online instruction. However, the digital divide remains a persistent barrier: students without reliable internet access or adequate devices are systematically disadvantaged by online-only models.\n\n3. Social and Psychological Dimensions\nPerhaps the most significant limitation of online learning is its impact on social development and well-being. Research consistently indicates that students in fully online programmes report higher levels of isolation, lower engagement, and reduced sense of belonging to their academic community. These factors are particularly consequential for younger students and those in the early stages of their academic careers.\n\n4. Economic Analysis\nOnline learning offers substantial cost savings through reduced infrastructure requirements and economies of scale. However, high-quality online instruction requires significant upfront investment in course design, technology infrastructure, and faculty training. The assumption that online delivery is inherently cheaper has led some institutions to underfund their digital programmes, resulting in inferior experiences.\n\nRecommendations\n1. Adopt a hybrid model as the default, combining online delivery for content acquisition with in-person sessions for discussion, collaboration, and assessment.\n2. Invest in digital infrastructure to ensure equitable access for all students.\n3. Provide training for faculty in online pedagogy, recognising that effective online teaching requires different skills from classroom instruction.\n4. Establish robust student support systems specifically designed for online learners.\n5. Implement ongoing evaluation frameworks to continuously assess and improve the quality of online provision.',
      difficulty: 0.85,
    },
  },
]

// # ─── SPEAKING PROMPTS (18) ──────────────────────────────────────────────

const SPEAKING_ITEMS: UnifiedSeedItem[] = [
  // # ── A1–A2 general speaking (2) ──────────────────────────────────────
  {
    id: 'item.sp.a1.01', type: 'speaking_prompt', level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    payload: {
      prompt: 'Tell me about yourself.',
      format: 'general',
      followUpQuestions: ['What is your name?', 'Where are you from?', 'What do you do?', 'What do you like doing in your free time?'],
      prepTimeSeconds: 0, speakTimeSeconds: 60,
      targetLanguage: ['My name is...', 'I am from...', 'I am a...', 'I like...', 'In my free time, I...'],
      modelAnswerNotes: 'A good answer at A1 covers: name, nationality/home, job/study, and one hobby or interest. Uses present simple. Short, clear sentences. Does not need complex structures.',
      difficulty: 0.1,
    },
  },
  {
    id: 'item.sp.a2.01', type: 'speaking_prompt', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: {
      prompt: 'Describe your typical day.',
      format: 'general',
      followUpQuestions: ['What time do you usually wake up?', 'What do you have for breakfast?', 'How do you get to work or school?', 'What do you do in the evening?'],
      prepTimeSeconds: 0, speakTimeSeconds: 90,
      targetLanguage: ['I usually...', 'In the morning/afternoon/evening...', 'After that...', 'Then I...', 'Before I go to bed...'],
      modelAnswerNotes: 'Covers morning, afternoon, and evening routines. Uses time markers and sequence words. Present simple for habits. At least 6–8 sentences.',
      difficulty: 0.2,
    },
  },

  // # ── B1 IELTS Speaking Part 1 (3) ────────────────────────────────────
  {
    id: 'item.sp.b1.p1.01', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about your hometown.',
      format: 'part1_short',
      followUpQuestions: ['Where is your hometown?', 'What do you like most about it?', 'Has your hometown changed much in recent years?', 'Would you like to live there in the future?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['It is located in...', 'What I like most is...', 'It has changed because...', 'I would/wouldn\'t like to... because...'],
      modelAnswerNotes: 'Each answer should be 2–3 sentences. Extend beyond yes/no with reasons. Use some B1 structures (present perfect for changes, would for future). Show range but don\'t over-elaborate.',
      difficulty: 0.4,
    },
  },
  {
    id: 'item.sp.b1.p1.02', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about technology.',
      format: 'part1_short',
      followUpQuestions: ['How often do you use your phone?', 'Do you think children spend too much time on screens?', 'What technology do you find most useful?', 'Have you learned any new technology recently?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['I tend to use...', 'I believe that...', 'The most useful... for me is...', 'Recently, I have learned...'],
      modelAnswerNotes: 'Answers should show opinion + reason. Use present perfect for recent experiences. Avoid one-word answers. Natural pace, not rehearsed.',
      difficulty: 0.4,
    },
  },
  {
    id: 'item.sp.b1.p1.03', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about food and cooking.',
      format: 'part1_short',
      followUpQuestions: ['Do you enjoy cooking?', 'What is your favourite food?', 'Do you prefer eating at home or in restaurants?', 'Have you ever tried food from another country?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['I enjoy... because...', 'My favourite... is...', 'I prefer... because...', 'Yes, I have tried...'],
      modelAnswerNotes: 'Natural, conversational answers. Give reasons for preferences. Use past tense for experiences. Show some topic vocabulary (ingredients, cuisine, delicious).',
      difficulty: 0.35,
    },
  },

  // # ── B2 IELTS Speaking Part 2 (long turn) (3) ────────────────────────
  {
    id: 'item.sp.b2.p2.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a book that you have recently read and enjoyed.',
      format: 'part2_long_turn',
      followUpQuestions: ['Do you often read books?'],
      cueCardPoints: ['What the book was about', 'When and where you read it', 'Why you chose to read it', 'And explain why you enjoyed it'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['The book I\'d like to talk about is...', 'It tells the story of...', 'What really struck me was...', 'I would highly recommend it because...'],
      modelAnswerNotes: 'Should speak for 1.5–2 minutes. Cover all cue card points. Use narrative tenses (past simple, past continuous, past perfect). Show emotional vocabulary (fascinating, thought-provoking, gripping). Natural pauses are fine.',
      difficulty: 0.55,
    },
  },
  {
    id: 'item.sp.b2.p2.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a time when you helped someone.',
      format: 'part2_long_turn',
      followUpQuestions: ['Do you think people help each other enough nowadays?'],
      cueCardPoints: ['Who you helped', 'What the situation was', 'How you helped them', 'And explain how you felt about helping them'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['I\'d like to describe a time when...', 'The situation was that...', 'What I did was...', 'Looking back, I felt...'],
      modelAnswerNotes: 'Narrative structure with clear beginning, middle, end. Use past tenses accurately. Include feelings and reflections. Cover all cue card points naturally without reading them as a list.',
      difficulty: 0.55,
    },
  },
  {
    id: 'item.sp.b2.p2.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a place you would like to visit in the future.',
      format: 'part2_long_turn',
      followUpQuestions: ['Do you think travel broadens the mind?'],
      cueCardPoints: ['Where the place is', 'How you learned about it', 'What you would do there', 'And explain why you want to visit this place'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['The place I\'d most like to visit is...', 'I first heard about it when...', 'If I went there, I would...', 'The main reason I want to go is...'],
      modelAnswerNotes: 'Use conditional structures for hypothetical plans. Show geographical/cultural vocabulary. Describe what makes the place special. Speak for full 2 minutes.',
      difficulty: 0.5,
    },
  },

  // # ── B2 IELTS Speaking Part 3 (discussion) (2) ───────────────────────
  {
    id: 'item.sp.b2.p3.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'Let\'s discuss education and learning.',
      format: 'part3_discussion',
      followUpQuestions: ['How do you think technology has changed the way people learn?', 'Do you think traditional classrooms will become obsolete?', 'What qualities make a good teacher?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['In my view...', 'On the one hand... on the other hand...', 'It could be argued that...', 'For instance...', 'Having said that...'],
      modelAnswerNotes: 'Extended answers (4–6 sentences each). Use hedging language, examples, and concessions. Show ability to speculate and evaluate. Complex structures: conditionals, passive, relative clauses.',
      difficulty: 0.6,
    },
  },
  {
    id: 'item.sp.b2.p3.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'Let\'s discuss the environment and sustainability.',
      format: 'part3_discussion',
      followUpQuestions: ['Whose responsibility is it to protect the environment — individuals or governments?', 'Do you think people will change their behaviour to help the environment?', 'What environmental problem do you think is the most serious?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['I believe that...', 'While it is true that...', 'To a certain extent...', 'The most pressing issue is...', 'If we consider...'],
      modelAnswerNotes: 'Show ability to discuss abstract topics in depth. Use a range of discourse markers. Provide examples to support points. Demonstrate lexical range (sustainability, carbon footprint, renewable energy, biodiversity).',
      difficulty: 0.6,
    },
  },

  // # ── PTE Speaking (2) ────────────────────────────────────────────────
  {
    id: 'item.sp.pte.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account'],
    payload: {
      prompt: 'Read the following text aloud. You have 30–40 seconds to read the text.',
      format: 'read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 30, speakTimeSeconds: 40,
      targetLanguage: ['Clear pronunciation of all words', 'Natural sentence stress', 'Appropriate pausing at punctuation', 'Smooth connected speech'],
      modelAnswerNotes: 'Text to read: "The development of renewable energy sources has become a priority for governments worldwide. Solar and wind power now account for a significant proportion of electricity generation in many countries. While the initial investment costs can be substantial, the long-term benefits — including reduced carbon emissions and energy independence — make renewable energy an attractive alternative to fossil fuels."\n\nGood performance: clear pronunciation, natural rhythm, appropriate stress on content words, smooth delivery without excessive hesitation.',
      difficulty: 0.5,
    },
  },
  {
    id: 'item.sp.pte.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account'],
    payload: {
      prompt: 'Look at the chart below and describe the main trends in 25 seconds.',
      format: 'describe_image',
      followUpQuestions: [],
      prepTimeSeconds: 25, speakTimeSeconds: 40,
      targetLanguage: ['The chart shows...', 'There was a significant increase/decrease in...', 'The highest/lowest point was...', 'Overall...'],
      modelAnswerNotes: 'Chart description: A pie chart showing the distribution of energy sources in Country X in 2023: Coal 25%, Natural Gas 30%, Nuclear 15%, Solar 12%, Wind 10%, Hydro 8%. Good answer: "The pie chart illustrates the distribution of energy sources in Country X in 2023. Natural gas was the largest source, accounting for 30 per cent, followed closely by coal at 25 per cent. Nuclear energy contributed 15 per cent. Renewable sources combined — solar, wind, and hydro — made up 30 per cent, equalling natural gas. Overall, the country relies heavily on fossil fuels but renewables represent a significant share."',
      difficulty: 0.55,
    },
  },

  // # ── OET Speaking (role-play) (2) ────────────────────────────────────
  {
    id: 'item.sp.oet.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account'],
    payload: {
      prompt: 'You are a nurse in a hospital ward. A patient is about to be discharged after knee replacement surgery. Explain the post-operative care instructions.',
      format: 'role_play',
      followUpQuestions: [],
      prepTimeSeconds: 120, speakTimeSeconds: 300,
      targetLanguage: ['I\'d like to go through...', 'It\'s important that you...', 'You should avoid...', 'If you experience...', 'Do you have any questions about...'],
      modelAnswerNotes: 'Cover: wound care (keep dry 48 hours, signs of infection), pain management (prescribed medication schedule), mobility (use walking aids, avoid stairs initially, gentle exercises), follow-up appointment (2 weeks), when to seek emergency help (fever, severe pain, sudden swelling). Use clear, simple language. Check patient understanding. Show empathy.',
      rolePlayContext: 'Patient: Mr David Wilson, 67 years old. Had right knee replacement surgery 3 days ago. Recovery going well. Lives alone. Slightly anxious about managing at home. No previous surgeries. Currently taking paracetamol and ibuprofen for pain.',
      difficulty: 0.6,
    },
  },
  {
    id: 'item.sp.oet.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account'],
    payload: {
      prompt: 'You are a doctor at a GP surgery. A patient has come in with test results showing high cholesterol. Explain the results and discuss lifestyle changes.',
      format: 'role_play',
      followUpQuestions: [],
      prepTimeSeconds: 120, speakTimeSeconds: 300,
      targetLanguage: ['Your results show...', 'This means that...', 'I\'d recommend...', 'One thing you could try is...', 'How do you feel about...'],
      modelAnswerNotes: 'Cover: explain what cholesterol is (in simple terms), explain the results (total 7.2 — above recommended 5.0), discuss risks (heart disease, stroke), lifestyle changes (diet — reduce saturated fat, increase fibre; exercise — 150 min/week; weight management), consider medication if lifestyle changes insufficient (statins), retest in 3 months. Use patient-friendly language. Avoid jargon. Check understanding.',
      rolePlayContext: 'Patient: Ms Sarah Kim, 45 years old. Office worker. BMI 28. No previous heart problems. Doesn\'t exercise regularly. Diet includes a lot of takeaway food. Non-smoker. Drinks wine 3-4 times per week. Father had a heart attack at age 55. Worried about the results.',
      difficulty: 0.6,
    },
  },

  // # ── C1/C2 Advanced speaking (2) ─────────────────────────────────────
  {
    id: 'item.sp.c1.01', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: {
      prompt: 'Discuss the role of social media in modern democracy.',
      format: 'part3_discussion',
      followUpQuestions: ['Has social media made people more or less informed about political issues?', 'Should governments regulate social media platforms?', 'How has social media changed the relationship between politicians and voters?'],
      prepTimeSeconds: 0, speakTimeSeconds: 240,
      targetLanguage: ['It is widely acknowledged that...', 'One could argue that...', 'The implications of this are...', 'From a different perspective...', 'In light of recent developments...'],
      modelAnswerNotes: 'Demonstrate C1 fluency: extended turns, natural hedging, sophisticated vocabulary (echo chambers, algorithmic curation, misinformation, democratic discourse, accountability). Acknowledge multiple perspectives. Use complex grammar naturally (inversions, clefts, advanced passive structures). Reference specific examples.',
      difficulty: 0.75,
    },
  },
  {
    id: 'item.sp.c2.01', type: 'speaking_prompt', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: {
      prompt: 'Should there be limits on scientific research? Discuss with reference to specific fields such as genetic engineering, artificial intelligence, or nuclear technology.',
      format: 'part3_discussion',
      followUpQuestions: ['Who should decide what research is acceptable?', 'Is it possible to separate scientific discovery from its potential misuse?', 'How should society balance the benefits of research against its risks?'],
      prepTimeSeconds: 0, speakTimeSeconds: 300,
      targetLanguage: ['The question touches on...', 'It would be naive to suggest...', 'The crux of the matter is...', 'To play devil\'s advocate...', 'The ramifications of...'],
      modelAnswerNotes: 'C2-level discourse: nuanced argumentation, precise vocabulary (bioethics, dual-use research, precautionary principle, Promethean). Demonstrate ability to hold the floor on an abstract, complex topic. Use rhetorical devices. Show awareness of philosophical dimensions. Switch register naturally between formal and conversational.',
      difficulty: 0.85,
    },
  },
]

// # ─── REORDER PARAGRAPHS — PTE (8) ──────────────────────────────────────
// # Sentences in CORRECT order. The UI will scramble them.

const REORDER_ITEMS: UnifiedSeedItem[] = [
  {
    id: 'item.ro.b1.01', type: 'reorder', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'The sentences below are in the wrong order. Put them in the correct order to form a coherent paragraph.',
      sentences: [
        'Coffee is one of the most popular drinks in the world.',
        'It was first discovered in Ethiopia, where legend says a goat herder noticed his goats becoming energetic after eating coffee berries.',
        'From Ethiopia, coffee spread to the Arabian Peninsula, where it became an important part of social life.',
        'By the 17th century, coffee houses had appeared across Europe, becoming centres of intellectual discussion.',
        'Today, over two billion cups of coffee are consumed every day worldwide.',
      ],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.ro.b1.02', type: 'reorder', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'Put these sentences in the correct order.',
      sentences: [
        'Regular exercise has many benefits for both physical and mental health.',
        'Physically, it strengthens the heart, improves circulation, and helps maintain a healthy weight.',
        'It also has significant mental health benefits, including reducing symptoms of anxiety and depression.',
        'Despite these well-known advantages, many people struggle to exercise regularly.',
        'Experts recommend starting with small, achievable goals, such as a 10-minute walk each day, and gradually increasing the duration and intensity.',
      ],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.ro.b2.01', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'Arrange the sentences to form a coherent paragraph about renewable energy.',
      sentences: [
        'The transition to renewable energy sources is often presented as an environmental necessity.',
        'However, the economic arguments for renewables are becoming equally compelling.',
        'The cost of solar panels has fallen by over 90 per cent in the past decade, making solar energy cheaper than coal in many parts of the world.',
        'Similarly, advances in battery technology are addressing the intermittency problem that has long been cited as a barrier to renewable adoption.',
        'As these economic and technological trends continue, the question is no longer whether the world will transition to renewables, but how quickly.',
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.ro.b2.02', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'Put these sentences in the correct order to form a paragraph about sleep.',
      sentences: [
        'Sleep is essential for cognitive function, yet millions of people regularly fail to get enough of it.',
        'Research has shown that chronic sleep deprivation impairs memory consolidation, decision-making, and emotional regulation.',
        'The consequences extend beyond individual health: drowsy driving causes an estimated 100,000 road accidents per year in the United States alone.',
        'Despite this evidence, modern society often treats sleep as a luxury rather than a biological necessity.',
        'Addressing this cultural attitude may be as important as any medical intervention in improving public health outcomes.',
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.ro.c1.01', type: 'reorder', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      stem: 'Arrange these sentences into a coherent paragraph.',
      sentences: [
        'The concept of meritocracy — the idea that success should be determined by talent and effort rather than social background — is central to modern democratic societies.',
        'Yet sociological research consistently demonstrates that socioeconomic origin remains the strongest predictor of life outcomes in most countries.',
        'This gap between the meritocratic ideal and the empirical reality creates what some scholars call the "meritocracy trap."',
        'Those who succeed within the system attribute their success to personal merit, which reduces their sympathy for those who struggle.',
        'Meanwhile, those who fail internalise the belief that their difficulties are their own fault, rather than recognising the structural barriers they face.',
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'item.ro.c1.02', type: 'reorder', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      stem: 'Put these sentences in the correct order.',
      sentences: [
        'Language does not merely describe reality; it actively shapes how we perceive and categorise the world.',
        'This idea, known as the Sapir-Whorf hypothesis, has been debated by linguists for over a century.',
        'Recent experimental evidence has lent support to a weaker version of the hypothesis: while language does not determine thought, it significantly influences it.',
        'For example, speakers of languages that use absolute spatial terms (north, south) rather than relative ones (left, right) demonstrate superior spatial orientation.',
        'Such findings suggest that the language we speak subtly but measurably shapes our cognitive habits and perceptual frameworks.',
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'item.ro.c2.01', type: 'reorder', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      stem: 'Arrange these sentences to form a coherent paragraph about consciousness.',
      sentences: [
        'The question of how subjective experience arises from physical brain processes — the so-called "hard problem" of consciousness — remains one of the most intractable problems in philosophy and neuroscience.',
        'Neuroscientific advances have identified neural correlates of consciousness, but correlation is not explanation.',
        'Knowing which brain regions are active during conscious experience does not tell us why there is something it is like to have that experience.',
        'Some philosophers have argued that this explanatory gap is not merely a current limitation of science but a fundamental feature of the relationship between physical processes and subjective experience.',
        'If they are right, then consciousness may require a genuinely new explanatory framework — one that goes beyond the reductive materialism that has served the natural sciences so well in other domains.',
      ],
      difficulty: 0.8,
    },
  },
  {
    id: 'item.ro.c2.02', type: 'reorder', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      stem: 'Put these sentences in the correct order.',
      sentences: [
        'The proliferation of deepfake technology poses a fundamental challenge to the epistemological foundations of democratic discourse.',
        'Historically, video and audio evidence has been treated as a relatively reliable form of documentation, lending credibility to journalism and legal proceedings.',
        'As synthetic media becomes increasingly indistinguishable from authentic recordings, this assumption can no longer be maintained.',
        'The consequences are twofold: not only can fabricated evidence be used to deceive, but authentic evidence can be dismissed as potentially fake — a phenomenon researchers call the "liar\'s dividend."',
        'Addressing this challenge will require a combination of technological solutions, media literacy education, and institutional reforms to establish new standards of evidentiary trust.',
      ],
      difficulty: 0.8,
    },
  },
]

// # ─── HIGHLIGHT INCORRECT WORDS — PTE (8) ───────────────────────────────
// # The transcript contains deliberate word substitutions. The learner must
// # identify which words differ from the "original spoken" version.

const HIGHLIGHT_ITEMS: UnifiedSeedItem[] = [
  {
    id: 'item.hi.b1.01', type: 'highlight_incorrect', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      // # Word indices: 0=The, 1=weather, 2=forecast, 3=for, 4=tomorrow, 5=suggests, ...
      transcript: 'The weather forecast for tomorrow suggests that temperatures will reach around 28 degrees in the south of the country. However, the north can expect cloudy skies and occasional rain. Drivers should be careful on wet roads, especially during the morning rush hour.',
      incorrectWordIndices: [5, 18, 28],
      // # suggests→indicates, expect→experience, careful→cautious
      correctWords: ['indicates', 'experience', 'cautious'],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.hi.b1.02', type: 'highlight_incorrect', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      transcript: 'Good morning everyone and welcome to our annual company meeting. Today I would like to discuss three important topics. First, our sales performance last quarter. Second, new projects for the coming year. And third, changes to our staff benefits package.',
      incorrectWordIndices: [11, 16, 27],
      // # discuss→address, performance→figures, staff→employee
      correctWords: ['address', 'figures', 'employee'],
      difficulty: 0.4,
    },
  },
  {
    id: 'item.hi.b2.01', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      transcript: 'The study found that participants who exercised regularly showed significant improvements in their cognitive function compared to the control group. Researchers believe that physical activity increases blood flow to the brain, which may help prevent age-related mental decline.',
      incorrectWordIndices: [8, 14, 27],
      // # showed→demonstrated, cognitive→mental, prevent→delay
      correctWords: ['demonstrated', 'mental', 'delay'],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.hi.b2.02', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      transcript: 'Urban planning experts argue that cities need to become more sustainable in order to address the growing challenges of climate change. This includes investing in public transport, creating more green spaces, and encouraging energy-efficient building design.',
      incorrectWordIndices: [3, 12, 22],
      // # argue→suggest, sustainable→resilient, creating→developing
      correctWords: ['suggest', 'resilient', 'developing'],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.hi.c1.01', type: 'highlight_incorrect', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      transcript: 'The notion that economic growth inevitably leads to environmental degradation has been challenged by proponents of the environmental Kuznets curve. This theory suggests that pollution initially rises with industrialisation but eventually declines as societies become wealthier and demand stricter environmental regulations.',
      incorrectWordIndices: [4, 14, 26],
      // # inevitably→necessarily, challenged→questioned, demand→implement
      correctWords: ['necessarily', 'questioned', 'implement'],
      difficulty: 0.65,
    },
  },
  {
    id: 'item.hi.c1.02', type: 'highlight_incorrect', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      transcript: 'Contemporary theories of motivation have moved beyond the simple distinction between intrinsic and extrinsic rewards. Self-determination theory, for instance, identifies three fundamental psychological needs: autonomy, competence, and relatedness. When these needs are satisfied, individuals tend to be more engaged and productive.',
      incorrectWordIndices: [7, 15, 25],
      // # simple→basic, identifies→posits, satisfied→fulfilled
      correctWords: ['basic', 'posits', 'fulfilled'],
      difficulty: 0.65,
    },
  },
  {
    id: 'item.hi.c2.01', type: 'highlight_incorrect', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      transcript: 'The philosopher Hannah Arendt distinguished between labour, which she defined as the biological process of sustaining life, and work, which produces the durable objects that constitute the human world. Her third category, action, refers to the capacity to initiate something genuinely new through speech and interaction with others.',
      incorrectWordIndices: [8, 20, 31],
      // # defined→characterised, durable→enduring, initiate→inaugurate
      correctWords: ['characterised', 'enduring', 'inaugurate'],
      difficulty: 0.8,
    },
  },
  {
    id: 'item.hi.c2.02', type: 'highlight_incorrect', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      transcript: 'Quantum entanglement presents a profound challenge to our classical intuitions about locality and causation. When two particles become entangled, measuring the state of one instantaneously determines the state of the other, regardless of the distance separating them. Einstein famously referred to this phenomenon as spooky action at a distance.',
      incorrectWordIndices: [5, 18, 30],
      // # profound→fundamental, determines→reveals, referred→alluded
      correctWords: ['fundamental', 'reveals', 'alluded'],
      difficulty: 0.8,
    },
  },
]

// # ─── EXPORT ALL DIVERSE ITEMS ─────────────────────────────────────────

export const SEED_DIVERSE_ITEMS: UnifiedSeedItem[] = [
  ...GAP_FILL_ITEMS,
  ...READING_ITEMS,
  ...WRITING_ITEMS,
  ...SPEAKING_ITEMS,
  ...REORDER_ITEMS,
  ...HIGHLIGHT_ITEMS,
]
