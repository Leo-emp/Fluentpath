// # A1 Reading & Listening gap filler — adds MCQ and reading passage items
// # for absolute beginners. These cover the reading and listening skills
// # that were missing from the A1 expanded content.
// # Target: ~30 items covering reading comprehension, listening comprehension,
// # and MCQ questions for A1 learners.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_A1_READING_LISTENING: UnifiedSeedItem[] = [
  // # ─── MCQ — Reading Skill (8) ───────────────────────────────────────
  // # Simple multiple-choice questions testing basic reading comprehension.
  // # Uses short texts like signs, menus, and notices (CEFR A1 reading).
  {
    id: 'item.mcq.a1.r01', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'You see this sign at a shop: "OPEN Mon–Fri 9am–5pm". When is the shop closed?',
      options: [
        { text: 'Saturday and Sunday', misconception: null },
        { text: 'Monday and Tuesday', misconception: 'Confuses open days with closed days' },
        { text: 'Every day', misconception: 'Ignores the specific days listed' },
        { text: 'Friday only', misconception: 'Reads Friday as the closing day rather than the last open day' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.r02', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'A menu says: "Soup of the day — £3.50". What does this tell you?',
      options: [
        { text: 'The soup costs three pounds fifty', misconception: null },
        { text: 'The soup is free today', misconception: 'Misreads the price as an offer' },
        { text: 'There is no soup today', misconception: 'Reads "of the day" as meaning unavailable' },
        { text: 'The soup costs thirty-five pounds', misconception: 'Misreads decimal as whole number' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.r03', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'You read: "Please turn off your phone." What must you do?',
      options: [
        { text: 'Switch off your mobile phone', misconception: null },
        { text: 'Call someone on your phone', misconception: 'Confuses "turn off" with using the phone' },
        { text: 'Give your phone to someone', misconception: 'Misunderstands "turn off" as "hand over"' },
        { text: 'Turn your phone upside down', misconception: 'Takes "turn off" literally as a physical action' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.r04', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'An email says: "Dear Tom, See you at 3pm at the café. From, Sara." Where will they meet?',
      options: [
        { text: 'At a café', misconception: null },
        { text: 'At Tom\'s house', misconception: 'Assumes meeting is at the recipient\'s home' },
        { text: 'At Sara\'s office', misconception: 'Confuses sender\'s location with meeting place' },
        { text: 'At a school', misconception: 'Random guess — no textual support' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a1.r05', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'A bus timetable shows: "Bus 42 — City Centre — every 15 minutes". How often does the bus come?',
      options: [
        { text: 'Every fifteen minutes', misconception: null },
        { text: 'Every forty-two minutes', misconception: 'Confuses bus number with frequency' },
        { text: 'Once a day', misconception: 'Ignores the frequency information entirely' },
        { text: 'Every hour', misconception: 'Misreads the schedule frequency' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a1.r06', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'A label on food says: "Best before 10 June 2026". What does this mean?',
      options: [
        { text: 'Eat the food before this date', misconception: null },
        { text: 'The food was made on this date', misconception: 'Confuses expiry date with production date' },
        { text: 'Buy the food on this date', misconception: 'Misreads "best before" as a purchase instruction' },
        { text: 'The food is on sale until this date', misconception: 'Confuses food label with a shop sale' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a1.r07', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'A notice says: "No dogs allowed in the park." You have a dog. What should you do?',
      options: [
        { text: 'Do not bring the dog into the park', misconception: null },
        { text: 'Bring the dog but keep it on a lead', misconception: 'Assumes a lead makes it acceptable — ignores the ban' },
        { text: 'Leave the dog at the entrance to play', misconception: 'Misunderstands "not allowed" as partial restriction' },
        { text: 'Ask someone to watch the dog inside', misconception: 'Tries to find a loophole — still violates the rule' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.a1.r08', type: 'mcq', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      stem: 'A text message says: "Running late. Be there in 10 mins." The person is…',
      options: [
        { text: 'Not on time and will arrive soon', misconception: null },
        { text: 'Already at the meeting place', misconception: 'Contradicts "running late"' },
        { text: 'Going for a run', misconception: 'Takes "running" literally as exercise' },
        { text: 'Not coming', misconception: 'Ignores "be there in 10 mins" — they are coming' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },

  // # ─── MCQ — Listening Skill (8) ─────────────────────────────────────
  // # Questions about short spoken exchanges. At A1 the "audio" is described
  // # in text (transcript-based) since real audio needs ElevenLabs TTS.
  {
    id: 'item.mcq.a1.l01', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'You hear: "Go straight, then turn left at the bank." What do you do after going straight?',
      options: [
        { text: 'Turn left', misconception: null },
        { text: 'Turn right', misconception: 'Confuses left with right' },
        { text: 'Stop at the bank', misconception: 'Treats "at the bank" as the destination, not the landmark' },
        { text: 'Go back', misconception: 'Opposite of the instruction' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.l02', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'A teacher says: "Please open your books to page twelve." What is the page number?',
      options: [
        { text: '12', misconception: null },
        { text: '20', misconception: 'Confuses twelve with twenty' },
        { text: '2', misconception: 'Hears only the ending "two"' },
        { text: '21', misconception: 'Reverses the digits of twelve' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.l03', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'You hear: "The train to London leaves at half past two." What time does the train leave?',
      options: [
        { text: '2:30', misconception: null },
        { text: '2:00', misconception: 'Ignores "half past" — hears only "two"' },
        { text: '12:30', misconception: 'Confuses "two" with "twelve"' },
        { text: '3:30', misconception: 'Adds one hour to the stated time' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a1.l04', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'Someone says: "I\'d like a coffee with milk, please." What do they want?',
      options: [
        { text: 'Coffee with milk', misconception: null },
        { text: 'Tea with milk', misconception: 'Substitutes coffee with a different hot drink' },
        { text: 'Black coffee', misconception: 'Ignores the "with milk" part' },
        { text: 'A glass of milk', misconception: 'Focuses only on "milk" and drops "coffee"' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.l05', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'You hear: "It\'s raining outside. Don\'t forget your umbrella." What is the weather?',
      options: [
        { text: 'It is raining', misconception: null },
        { text: 'It is sunny', misconception: 'Opposite of the stated weather' },
        { text: 'It is snowing', misconception: 'Confuses rain with snow' },
        { text: 'It is windy', misconception: 'Picks a different weather type' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.l06', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'A shop assistant says: "That\'s five pounds, please." How much do you need to pay?',
      options: [
        { text: '£5', misconception: null },
        { text: '£15', misconception: 'Confuses "five" with "fifteen"' },
        { text: '£50', misconception: 'Confuses "five pounds" with "fifty pounds"' },
        { text: '£0.50', misconception: 'Confuses pounds with pence' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a1.l07', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'Someone says: "My name is Anna and I\'m from Poland." Where is Anna from?',
      options: [
        { text: 'Poland', misconception: null },
        { text: 'England', misconception: 'Does not process the country name correctly' },
        { text: 'Anna', misconception: 'Confuses the name with the country' },
        { text: 'She doesn\'t say', misconception: 'Misses the explicit "from Poland" statement' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.l08', type: 'mcq', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'You hear at a station: "The next bus is number seven to the hospital." Where does bus number 7 go?',
      options: [
        { text: 'To the hospital', misconception: null },
        { text: 'To the school', misconception: 'Substitutes a different destination' },
        { text: 'To bus stop 7', misconception: 'Confuses bus number with a stop number' },
        { text: 'It doesn\'t say', misconception: 'Misses the explicit destination' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },

  // # ─── READING PASSAGE (3) ───────────────────────────────────────────
  // # Short, simple texts (80–150 words) with 3–4 questions each.
  // # A1 passages use present simple, basic vocabulary, short sentences.
  {
    id: 'item.rp.a1.01', type: 'reading_passage', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      title: 'My Daily Routine',
      passage: 'My name is Maria. I am 25 years old. I live in a small flat in Madrid. Every morning, I wake up at 7 o\'clock. I have breakfast — usually bread and coffee. Then I go to work by bus. I work in a bookshop. I start work at 9 o\'clock and finish at 5 o\'clock. After work, I go home and cook dinner. I usually eat pasta or rice with vegetables. In the evening, I watch TV or read a book. I go to bed at 11 o\'clock. On Saturdays, I meet my friends. We go to a café or to the cinema.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'Where does Maria live?', options: ['Madrid', 'London', 'Paris', 'Rome'], correctAnswer: 0, explanation: 'The text says "I live in a small flat in Madrid."' },
        { id: 'q2', questionType: 'mcq', text: 'How does Maria get to work?', options: ['By car', 'By bus', 'On foot', 'By train'], correctAnswer: 1, explanation: 'The text says "I go to work by bus."' },
        { id: 'q3', questionType: 'mcq', text: 'What time does Maria finish work?', options: ['4 o\'clock', '5 o\'clock', '6 o\'clock', '3 o\'clock'], correctAnswer: 1, explanation: 'The text says "finish at 5 o\'clock."' },
        { id: 'q4', questionType: 'mcq', text: 'What does Maria do on Saturdays?', options: ['She works', 'She meets friends', 'She stays home', 'She studies'], correctAnswer: 1, explanation: 'The text says "On Saturdays, I meet my friends."' },
      ],
      difficulty: 0.15,
    },
  },
  {
    id: 'item.rp.a1.02', type: 'reading_passage', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      title: 'The New Student',
      passage: 'This is Kenji. He is from Japan. He is 19 years old. He is a new student at a language school in London. He studies English every day from Monday to Friday. His classes start at 9:30 in the morning. He has two teachers: Mrs Brown and Mr Garcia. Kenji lives with a host family. The family has two children: a boy called Sam and a girl called Emma. Kenji likes London. He thinks the parks are beautiful. But he says the weather is cold! He misses Japanese food, but he can find good sushi near his school.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'Where is Kenji from?', options: ['China', 'Korea', 'Japan', 'Thailand'], correctAnswer: 2, explanation: 'The text says "He is from Japan."' },
        { id: 'q2', questionType: 'mcq', text: 'How many teachers does Kenji have?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 1, explanation: 'The text says "He has two teachers: Mrs Brown and Mr Garcia."' },
        { id: 'q3', questionType: 'tfng', text: 'Kenji likes the weather in London.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The text says "he says the weather is cold!" — this suggests he does not like it.' },
        { id: 'q4', questionType: 'mcq', text: 'Who does Kenji live with?', options: ['Alone', 'With friends', 'With a host family', 'With his parents'], correctAnswer: 2, explanation: 'The text says "Kenji lives with a host family."' },
      ],
      difficulty: 0.2,
    },
  },
  {
    id: 'item.rp.a1.03', type: 'reading_passage', level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    payload: {
      title: 'At the Supermarket',
      passage: 'Lisa is at the supermarket. She has a shopping list. She needs milk, eggs, bread, apples, and chicken. The milk is in aisle 3. It costs £1.20. The eggs are next to the milk. A box of six eggs costs £1.80. Lisa cannot find the bread. She asks a shop assistant: "Excuse me, where is the bread?" The assistant says: "It\'s in aisle 1, near the door." Lisa says "Thank you" and finds the bread. Brown bread costs £1.10 and white bread costs 90p. Lisa buys brown bread. At the checkout, she pays with her card. The total is £9.50.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'What can Lisa NOT find?', options: ['Milk', 'Eggs', 'Bread', 'Apples'], correctAnswer: 2, explanation: 'The text says "Lisa cannot find the bread."' },
        { id: 'q2', questionType: 'mcq', text: 'Where is the bread?', options: ['Aisle 3', 'Aisle 1', 'Aisle 5', 'Aisle 2'], correctAnswer: 1, explanation: 'The assistant says "It\'s in aisle 1, near the door."' },
        { id: 'q3', questionType: 'mcq', text: 'How much does Lisa pay in total?', options: ['£1.20', '£1.80', '£9.50', '£5.00'], correctAnswer: 2, explanation: 'The text says "The total is £9.50."' },
        { id: 'q4', questionType: 'tfng', text: 'Lisa buys white bread.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The text says "Lisa buys brown bread."' },
      ],
      difficulty: 0.25,
    },
  },

  // # ─── MCQ — General Grammar (6) ─────────────────────────────────────
  // # Basic grammar MCQs that were missing from A1 expanded content.
  {
    id: 'item.mcq.a1.g01', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    payload: {
      stem: 'She ______ a doctor.',
      options: [
        { text: 'is', misconception: null },
        { text: 'are', misconception: 'Uses plural form with singular subject' },
        { text: 'am', misconception: 'Uses first-person form with third person' },
        { text: 'be', misconception: 'Uses base form instead of conjugated form' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.g02', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      stem: 'He ______ to school every day.',
      options: [
        { text: 'goes', misconception: null },
        { text: 'go', misconception: 'Omits third-person -s/-es ending' },
        { text: 'going', misconception: 'Uses present continuous form without auxiliary' },
        { text: 'goed', misconception: 'Over-applies regular past tense rule to irregular verb' },
      ],
      correctIndex: 0,
      difficulty: 0.15,
    },
  },
  {
    id: 'item.mcq.a1.g03', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    payload: {
      stem: 'They ______ in a big house.',
      options: [
        { text: 'live', misconception: null },
        { text: 'lives', misconception: 'Adds -s to plural subject verb' },
        { text: 'living', misconception: 'Uses continuous form without auxiliary' },
        { text: 'lived', misconception: 'Uses past tense for a present habit' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.g04', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    payload: {
      stem: 'I ______ swim, but I can\'t ride a horse.',
      options: [
        { text: 'can', misconception: null },
        { text: 'am', misconception: 'Uses "be" instead of modal "can" for ability' },
        { text: 'do', misconception: 'Uses "do" instead of "can" for ability' },
        { text: 'have', misconception: 'Uses "have" instead of "can" for ability' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.g05', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'I need a ______ to write my name on the paper.',
      options: [
        { text: 'pen', misconception: null },
        { text: 'cup', misconception: 'Selects an unrelated everyday object' },
        { text: 'bag', misconception: 'Selects an object that cannot be used for writing' },
        { text: 'chair', misconception: 'Selects furniture instead of a writing instrument' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },
  {
    id: 'item.mcq.a1.g06', type: 'mcq', level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    payload: {
      stem: 'I put my books in my ______ and go to school.',
      options: [
        { text: 'bag', misconception: null },
        { text: 'fridge', misconception: 'Selects an appliance — wrong context entirely' },
        { text: 'bed', misconception: 'Selects furniture — you don\'t carry books in a bed' },
        { text: 'window', misconception: 'Selects a building feature — cannot carry items' },
      ],
      correctIndex: 0,
      difficulty: 0.1,
    },
  },

  // # ─── GAP FILL — Listening Context (4) ──────────────────────────────
  // # Fill-in-the-blank from a described spoken situation.
  {
    id: 'item.gf.a1.l01', type: 'gap_fill', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'You hear: "Hello, my name is David and I am from ______." He says he is from Australia.',
      gaps: [{ index: 0, acceptedAnswers: ['Australia'], hint: 'A country — starts with A' }],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a1.l02', type: 'gap_fill', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'The teacher says: "Please sit ______." You should sit in your chair.',
      gaps: [{ index: 0, acceptedAnswers: ['down'], hint: 'A direction — opposite of "up"' }],
      difficulty: 0.1,
    },
  },
  {
    id: 'item.gf.a1.l03', type: 'gap_fill', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'Someone says: "The library is ______ the post office." It means next to it.',
      gaps: [{ index: 0, acceptedAnswers: ['next to', 'beside', 'near'], hint: 'A preposition meaning "very close to"' }],
      difficulty: 0.2,
    },
  },
  {
    id: 'item.gf.a1.l04', type: 'gap_fill', level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    payload: {
      stem: 'A waiter asks: "Would you like tea or ______?" The other drink is coffee.',
      gaps: [{ index: 0, acceptedAnswers: ['coffee'], hint: 'A hot drink — not tea' }],
      difficulty: 0.1,
    },
  },
]
