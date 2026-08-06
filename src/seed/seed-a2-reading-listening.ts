// # A2 Reading & Listening gap filler — adds MCQ, reading passage, and
// # gap-fill items for elementary learners. Covers the reading and listening
// # skills missing from A2 expanded content.
// # Target: ~30 items covering reading comprehension, listening comprehension,
// # and MCQ questions for A2 learners.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_A2_READING_LISTENING: UnifiedSeedItem[] = [
  // # ─── MCQ — Reading Skill (8) ───────────────────────────────────────
  // # Short texts, personal letters, simple descriptions (CEFR A2 reading).
  {
    id: 'item.mcq.a2.r01', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'An email says: "Hi! I arrived in Paris yesterday. The hotel is nice but small. Tomorrow I\'m going to visit the Eiffel Tower." Where is the person?',
      options: [
        { text: 'In Paris', misconception: null },
        { text: 'At home', misconception: 'Ignores "I arrived in Paris"' },
        { text: 'At the Eiffel Tower', misconception: 'Confuses tomorrow\'s plan with current location' },
        { text: 'On a plane', misconception: 'Confuses "arrived" with still travelling' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.r02', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'A postcard says: "Having a great time! The beach is beautiful and the food is delicious. Wish you were here!" How is the person feeling?',
      options: [
        { text: 'Happy and enjoying the trip', misconception: null },
        { text: 'Bored and wanting to leave', misconception: 'Contradicts "great time" and "beautiful"' },
        { text: 'Sick from the food', misconception: 'Contradicts "delicious" — inverts the meaning' },
        { text: 'Angry about the weather', misconception: 'No weather complaint in the text' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.r03', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'A notice says: "Swimming pool hours: 6am–8pm weekdays, 8am–6pm weekends. Children under 12 must be with an adult." A 10-year-old wants to swim at 3pm on Saturday. What must happen?',
      options: [
        { text: 'An adult must go with the child', misconception: null },
        { text: 'The child cannot swim on Saturday', misconception: 'Misreads weekend hours as closed' },
        { text: 'The child can swim alone', misconception: 'Ignores the under-12 rule' },
        { text: 'The pool is closed at 3pm', misconception: 'Misreads the closing time' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a2.r04', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'A text message says: "Can\'t come tonight. Got a headache. Sorry! Maybe next week?" Why can\'t the person come?',
      options: [
        { text: 'They have a headache', misconception: null },
        { text: 'They are busy with work', misconception: 'Invents a reason not in the text' },
        { text: 'They forgot about the plan', misconception: 'Contradicts — they clearly remember and apologise' },
        { text: 'They are on holiday', misconception: 'No mention of travel or holiday' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.r05', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'An advert says: "Room to rent. £400/month. Near train station. No pets. Contact: landlord@email.com." You have a cat. Can you rent this room?',
      options: [
        { text: 'No, because pets are not allowed', misconception: null },
        { text: 'Yes, cats are not pets', misconception: 'Incorrectly categorises cats as non-pets' },
        { text: 'Yes, if you pay extra', misconception: 'Invents a condition not in the text' },
        { text: 'Yes, but only on weekdays', misconception: 'Invents a time restriction — no such rule' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a2.r06', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'A restaurant menu says: "Today\'s special: Grilled salmon with vegetables — £12.50. Includes a free drink." What comes free with the special?',
      options: [
        { text: 'A drink', misconception: null },
        { text: 'A dessert', misconception: 'Substitutes drink with dessert' },
        { text: 'The vegetables', misconception: 'Vegetables are part of the dish, not the free item' },
        { text: 'Nothing — you pay for everything', misconception: 'Ignores "includes a free drink"' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.r07', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'A letter says: "Dear Mrs Chen, Your appointment is on Tuesday 15 March at 2pm. Please bring your passport. If you cannot come, call us 48 hours before." When must Mrs Chen call if she can\'t come?',
      options: [
        { text: 'At least 48 hours before Tuesday', misconception: null },
        { text: 'On the same day', misconception: 'Ignores the 48-hour notice requirement' },
        { text: 'After the appointment', misconception: 'Too late — must be before, not after' },
        { text: 'She doesn\'t need to call', misconception: 'Ignores the explicit cancellation instruction' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },
  {
    id: 'item.mcq.a2.r08', type: 'mcq', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      stem: 'A friend writes: "I started a new job last week. It\'s at a hospital. I\'m a receptionist. The hours are long but the people are friendly." What is the friend\'s new job?',
      options: [
        { text: 'Receptionist', misconception: null },
        { text: 'Doctor', misconception: 'Assumes hospital = doctor' },
        { text: 'Nurse', misconception: 'Associates hospital with nursing without reading' },
        { text: 'Teacher', misconception: 'Unrelated to the hospital setting described' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },

  // # ─── MCQ — Listening Skill (8) ─────────────────────────────────────
  // # Questions about conversations and announcements. A2 handles two-speaker
  // # everyday exchanges.
  {
    id: 'item.mcq.a2.l01', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear two people: A: "What did you do last weekend?" B: "I went to the beach with my family." Where did person B go?',
      options: [
        { text: 'To the beach', misconception: null },
        { text: 'To the mountains', misconception: 'Substitutes a different outdoor location' },
        { text: 'To a restaurant', misconception: 'Invents a destination not mentioned' },
        { text: 'Nowhere — they stayed home', misconception: 'Contradicts "I went to the beach"' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a2.l02', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear: A: "How much is this T-shirt?" B: "It\'s fifteen pounds, but there\'s a 20% discount today." How much is the T-shirt before the discount?',
      options: [
        { text: '£15', misconception: null },
        { text: '£12', misconception: 'Calculates the discounted price instead of original' },
        { text: '£20', misconception: 'Confuses the discount percentage with the price' },
        { text: '£5', misconception: 'Subtracts incorrectly or confuses numbers' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a2.l03', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear an announcement: "Attention please. The 10:15 train to Manchester is delayed. It will now depart at 10:45." How late is the train?',
      options: [
        { text: '30 minutes late', misconception: null },
        { text: '15 minutes late', misconception: 'Subtracts incorrectly: 45 - 15 = 30, not 15' },
        { text: '45 minutes late', misconception: 'Uses the new departure time as the delay' },
        { text: 'On time', misconception: 'Ignores the word "delayed"' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a2.l04', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear: A: "What do you want for dinner?" B: "I\'m not very hungry. Maybe just some soup." What does person B want?',
      options: [
        { text: 'Soup', misconception: null },
        { text: 'A big meal', misconception: 'Contradicts "not very hungry" and "just some"' },
        { text: 'Nothing', misconception: 'They do want something — soup' },
        { text: 'Pizza', misconception: 'Invents a food not mentioned' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a2.l05', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear: "The weather forecast says it will be sunny tomorrow with temperatures around 28 degrees." What will the weather be like tomorrow?',
      options: [
        { text: 'Sunny and warm', misconception: null },
        { text: 'Rainy and cold', misconception: 'Opposite of the forecast' },
        { text: 'Cloudy with some rain', misconception: 'Contradicts the sunny forecast' },
        { text: 'Snowy', misconception: '28 degrees is warm — snow is impossible' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.l06', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear: A: "Where\'s the nearest pharmacy?" B: "Go to the end of this road, turn right, and it\'s on the left." Which direction do you turn?',
      options: [
        { text: 'Right', misconception: null },
        { text: 'Left', misconception: 'Confuses the turn direction with where the pharmacy is' },
        { text: 'Straight ahead', misconception: 'Ignores the turning instruction' },
        { text: 'Go back', misconception: 'Opposite of the stated direction' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.l07', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear: A: "I\'m going to learn Spanish next year." B: "That\'s great! Why Spanish?" A: "Because I want to work in South America." Why does person A want to learn Spanish?',
      options: [
        { text: 'To work in South America', misconception: null },
        { text: 'To go on holiday', misconception: 'Substitutes a leisure reason for a work reason' },
        { text: 'Because their friend speaks Spanish', misconception: 'Invents a reason not in the conversation' },
        { text: 'For school', misconception: 'Invents an academic reason not mentioned' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a2.l08', type: 'mcq', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear a voicemail: "Hi, this is Dr Lee\'s office. Your appointment is confirmed for Thursday at 3:30pm. Please arrive 10 minutes early." When should you arrive?',
      options: [
        { text: '3:20pm', misconception: null },
        { text: '3:30pm', misconception: 'Ignores "arrive 10 minutes early"' },
        { text: '3:40pm', misconception: 'Adds 10 minutes instead of subtracting' },
        { text: '3:00pm', misconception: 'Arrives 30 minutes early, not 10' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },

  // # ─── READING PASSAGE (3) ───────────────────────────────────────────
  // # Slightly longer texts (120–200 words) with 4 questions each.
  // # A2 passages use past simple, basic connectors, familiar topics.
  {
    id: 'item.rp.a2.01', type: 'reading_passage', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      title: 'A Weekend Trip',
      passage: 'Last Saturday, my friend Carlos and I went on a trip to Brighton. We took the train from London. The journey took about one hour. When we arrived, we walked to the beach. The weather was sunny but a bit windy. We ate fish and chips for lunch at a small café near the sea. After lunch, we visited the Royal Pavilion. It is a beautiful old building with Indian-style architecture. I took many photos. In the afternoon, we walked around the shops in The Lanes. Carlos bought a hat and I bought some chocolate. We caught the 5:30 train back to London. We were tired but happy. It was a lovely day out.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'How did they travel to Brighton?', options: ['By bus', 'By car', 'By train', 'By plane'], correctAnswer: 2, explanation: 'The text says "We took the train from London."' },
        { id: 'q2', questionType: 'mcq', text: 'What did they eat for lunch?', options: ['Pizza', 'Sandwiches', 'Fish and chips', 'Pasta'], correctAnswer: 2, explanation: 'The text says "We ate fish and chips for lunch."' },
        { id: 'q3', questionType: 'tfng', text: 'Carlos bought some chocolate.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The text says Carlos bought a hat. The narrator bought chocolate.' },
        { id: 'q4', questionType: 'mcq', text: 'How did they feel at the end of the day?', options: ['Bored', 'Angry', 'Tired but happy', 'Scared'], correctAnswer: 2, explanation: 'The text says "We were tired but happy."' },
      ],
      difficulty: 0.2,
    },
  },
  {
    id: 'item.rp.a2.02', type: 'reading_passage', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      title: 'My New Neighbour',
      passage: 'A new family moved into the flat next door last month. Their names are Tom and Sarah, and they have a little girl called Mia. She is four years old. Tom works as a chef at a restaurant in town. Sarah works from home — she is a graphic designer. They are very friendly. Last week, Sarah brought us some cake. It was chocolate cake, and it was delicious! Mia likes playing in the garden. She has a small bicycle and she rides it every afternoon. Sometimes she plays with our cat, Whiskers. Tom told me he wants to start a small vegetable garden. He asked if I had any gardening tools he could borrow. I gave him a spade and some seeds. I think they are going to be great neighbours.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'What is Tom\'s job?', options: ['Teacher', 'Chef', 'Designer', 'Doctor'], correctAnswer: 1, explanation: 'The text says "Tom works as a chef."' },
        { id: 'q2', questionType: 'mcq', text: 'How old is Mia?', options: ['Two', 'Three', 'Four', 'Five'], correctAnswer: 2, explanation: 'The text says "She is four years old."' },
        { id: 'q3', questionType: 'tfng', text: 'Sarah works in an office.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The text says "Sarah works from home."' },
        { id: 'q4', questionType: 'mcq', text: 'What does Tom want to start?', options: ['A bakery', 'A vegetable garden', 'A pet shop', 'A restaurant'], correctAnswer: 1, explanation: 'The text says "Tom told me he wants to start a small vegetable garden."' },
      ],
      difficulty: 0.25,
    },
  },
  {
    id: 'item.rp.a2.03', type: 'reading_passage', level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    payload: {
      title: 'An Email from a Friend',
      passage: 'Hi! How are you? I\'m writing to tell you about my new job. I started working at a bookshop two weeks ago. The shop is called "Pages" and it\'s in the city centre. I work from Tuesday to Saturday, 10am to 6pm. My favourite part is helping customers find books. Yesterday, a woman came in and asked for a book about cooking Italian food. I found three different books for her and she was very happy. My boss, Mr Adams, is nice. He lets me read during my lunch break. The only problem is that I don\'t have Sundays and Mondays to see my friends because everyone else is free on weekends. But I really like the job. Come and visit me at the shop sometime! Love, Priya',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'When did Priya start her new job?', options: ['Yesterday', 'Last week', 'Two weeks ago', 'Last month'], correctAnswer: 2, explanation: 'The text says "I started working at a bookshop two weeks ago."' },
        { id: 'q2', questionType: 'mcq', text: 'What is the name of the bookshop?', options: ['Books', 'Pages', 'Stories', 'Words'], correctAnswer: 1, explanation: 'The text says "The shop is called Pages."' },
        { id: 'q3', questionType: 'tfng', text: 'Priya works every day of the week.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'She works Tuesday to Saturday — she is free on Sunday and Monday.' },
        { id: 'q4', questionType: 'mcq', text: 'What is Priya\'s problem with the job?', options: ['The pay is low', 'She can\'t see friends on weekends', 'Her boss is strict', 'The shop is far away'], correctAnswer: 1, explanation: 'The text says the problem is not having Sundays and Mondays free when friends are.' },
      ],
      difficulty: 0.3,
    },
  },

  // # ─── MCQ — General Grammar (6) ─────────────────────────────────────
  // # A2 grammar MCQs — past simple, comparatives, going to future.
  {
    id: 'item.mcq.a2.g01', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: {
      stem: 'Yesterday, I ______ to the cinema with my friends.',
      options: [
        { text: 'went', misconception: null },
        { text: 'go', misconception: 'Uses present tense with past time marker "yesterday"' },
        { text: 'goed', misconception: 'Over-applies regular -ed ending to irregular verb "go"' },
        { text: 'going', misconception: 'Uses continuous form without auxiliary' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.g02', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: {
      stem: 'She ______ her homework last night.',
      options: [
        { text: 'did', misconception: null },
        { text: 'does', misconception: 'Uses present tense with past time marker' },
        { text: 'done', misconception: 'Uses past participle without auxiliary' },
        { text: 'doing', misconception: 'Uses continuous form without auxiliary' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.g03', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: {
      stem: 'My house is ______ than your house.',
      options: [
        { text: 'bigger', misconception: null },
        { text: 'more big', misconception: 'Uses "more" with a short adjective — should double consonant + -er' },
        { text: 'biggest', misconception: 'Uses superlative instead of comparative' },
        { text: 'big', misconception: 'Uses base form without comparative ending' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a2.g04', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: {
      stem: 'English is ______ than maths for me.',
      options: [
        { text: 'more interesting', misconception: null },
        { text: 'interestinger', misconception: 'Adds -er to a long adjective instead of using "more"' },
        { text: 'most interesting', misconception: 'Uses superlative instead of comparative' },
        { text: 'interesting', misconception: 'Missing comparative structure entirely' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a2.g05', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    payload: {
      stem: 'Look at those dark clouds! It ______ rain.',
      options: [
        { text: 'is going to', misconception: null },
        { text: 'will', misconception: 'Uses "will" for a prediction based on present evidence — "going to" is more natural here' },
        { text: 'goes to', misconception: 'Malformed future — missing "be" auxiliary' },
        { text: 'go to', misconception: 'Missing both subject agreement and auxiliary' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a2.g06', type: 'mcq', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    payload: {
      stem: 'We ______ visit our grandparents next Sunday.',
      options: [
        { text: 'are going to', misconception: null },
        { text: 'going to', misconception: 'Missing "are" auxiliary before "going to"' },
        { text: 'goes to', misconception: 'Wrong form — third person singular with plural subject' },
        { text: 'go', misconception: 'Uses present simple for a planned future event' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },

  // # ─── GAP FILL — Listening Context (4) ──────────────────────────────
  {
    id: 'item.gf.a2.l01', type: 'gap_fill', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear: "The film starts at ______ and finishes at nine thirty." The film starts at seven fifteen.',
      gaps: [{ index: 0, acceptedAnswers: ['seven fifteen', '7:15', 'quarter past seven'], hint: 'A time — between 7 and 8' }],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.gf.a2.l02', type: 'gap_fill', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'Person A asks: "How was your holiday?" Person B says: "It was ______. We had a great time." The holiday was wonderful.',
      gaps: [{ index: 0, acceptedAnswers: ['wonderful', 'great', 'fantastic', 'amazing', 'lovely'], hint: 'A positive adjective' }],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a2.l03', type: 'gap_fill', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'The announcement says: "Platform ______ for the train to Edinburgh." The train is on platform four.',
      gaps: [{ index: 0, acceptedAnswers: ['four', '4'], hint: 'A number — the platform' }],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a2.l04', type: 'gap_fill', level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'You hear: "I usually take the bus, but today I ______ because the weather is nice." The person chose to walk.',
      gaps: [{ index: 0, acceptedAnswers: ['walked', 'am walking', 'walk'], hint: 'A verb meaning travel on foot' }],
      difficulty: 0.2,
    },
  },
]
