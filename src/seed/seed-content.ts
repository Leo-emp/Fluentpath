// # Seed content: 300+ MCQ items covering A1 through C2.
// # Each item links to at least one skill-graph node from seed-data.ts.
// # Distribution: A1=30, A2=40, B1=60, B2=80, C1=60, C2=30 = 300 total.
// # Every distractor has a named misconception — never just "wrong".

// # Item payload shape matches McqOption / item_versions.payload.
interface SeedOption {
  text: string
  misconception: string | null // null = correct answer
}

interface SeedItem {
  id: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  skill: string
  nodeIds: string[] // references into skill_nodes
  stem: string
  options: SeedOption[]
  correctIndex: number
  difficulty: number // 0–1, lower = easier
}

// # Single provenance record for all original seed content.
export const SEED_PROVENANCE = {
  id: 'prov.original',
  sourceName: 'FluentPath — original content',
  sourceUrl: null,
  licence: 'proprietary',
  licenceUrl: null,
  attributionText: '',
  retrievedAt: null,
  modifications: '',
}

// ─── A1 items (30) ─────────────────────────────────────────────────────
// # Beginner items: present simple be, present simple other verbs, can/can't,
// # everyday objects, reading signs, basic listening and writing.

const A1_ITEMS: SeedItem[] = [
  // # ── gram.a1.be_present (items 01–05) ─────────────────────────────
  {
    id: 'item.a1.gram.01',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    stem: 'She ______ a teacher.',
    options: [
      { text: 'is', misconception: null },
      { text: 'are', misconception: 'are is used with you/we/they, not she' },
      { text: 'am', misconception: 'am is only used with I' },
      { text: 'be', misconception: 'be is the infinitive form, not conjugated' },
    ],
    correctIndex: 0,
    difficulty: 0.1,
  },
  {
    id: 'item.a1.gram.02',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    stem: 'They ______ from Brazil.',
    options: [
      { text: 'is', misconception: 'is is used with he/she/it, not they' },
      { text: 'are', misconception: null },
      { text: 'am', misconception: 'am is only used with I' },
      { text: 'was', misconception: 'was is past tense, the sentence is present' },
    ],
    correctIndex: 1,
    difficulty: 0.1,
  },
  {
    // # Tests negative form of be — learners often add "do not" before be.
    id: 'item.a1.gram.07',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    stem: 'The shop ______ open today.',
    options: [
      { text: 'isn\'t', misconception: null },
      { text: 'doesn\'t', misconception: 'doesn\'t is used with action verbs, not be' },
      { text: 'not is', misconception: 'the word order is wrong — the contraction is isn\'t, not not is' },
      { text: 'don\'t', misconception: 'don\'t is used with action verbs, not the verb be' },
    ],
    correctIndex: 0,
    difficulty: 0.15,
  },
  {
    // # Question formation with be — word order inversion.
    id: 'item.a1.gram.08',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    stem: '______ you hungry?',
    options: [
      { text: 'Are', misconception: null },
      { text: 'Do', misconception: 'do is used to form questions with action verbs, not be' },
      { text: 'Is', misconception: 'is is for he/she/it, not you' },
      { text: 'Have', misconception: 'have is not used to ask about states with be' },
    ],
    correctIndex: 0,
    difficulty: 0.12,
  },
  {
    // # Be + adjective — common pattern at A1.
    id: 'item.a1.gram.09',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.be_present'],
    stem: 'The weather ______ cold this morning.',
    options: [
      { text: 'is', misconception: null },
      { text: 'does', misconception: 'does is an auxiliary for action verbs, not for describing states with be' },
      { text: 'has', misconception: 'has indicates possession, not a state described by an adjective' },
      { text: 'are', misconception: 'are is for plural subjects, but weather is singular' },
    ],
    correctIndex: 0,
    difficulty: 0.1,
  },

  // # ── gram.a1.present_simple (items 03–04, 10–14) ──────────────────
  {
    id: 'item.a1.gram.03',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    stem: 'He ______ to school every day.',
    options: [
      { text: 'go', misconception: 'go is used with I/you/we/they, not he' },
      { text: 'goes', misconception: null },
      { text: 'going', misconception: 'going is the -ing form, not present simple' },
      { text: 'gone', misconception: 'gone is the past participle, not present simple' },
    ],
    correctIndex: 1,
    difficulty: 0.15,
  },
  {
    id: 'item.a1.gram.04',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    stem: 'I ______ coffee in the morning.',
    options: [
      { text: 'drink', misconception: null },
      { text: 'drinks', misconception: 'drinks is third person (he/she), not first person (I)' },
      { text: 'drinking', misconception: 'drinking is the continuous form, the sentence describes a habit' },
      { text: 'drank', misconception: 'drank is past tense, the sentence describes a routine' },
    ],
    correctIndex: 0,
    difficulty: 0.12,
  },
  {
    // # Third person -s with "have" — irregular form "has".
    id: 'item.a1.gram.10',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    stem: 'My brother ______ two cats.',
    options: [
      { text: 'has', misconception: null },
      { text: 'have', misconception: 'have is used with I/you/we/they — he/she/it uses has' },
      { text: 'haves', misconception: 'have is irregular: the third person form is has, not haves' },
      { text: 'having', misconception: 'having is the continuous form, not present simple for possession' },
    ],
    correctIndex: 0,
    difficulty: 0.15,
  },
  {
    // # Negative present simple — tests do/does + not.
    id: 'item.a1.gram.11',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    stem: 'She ______ like spicy food.',
    options: [
      { text: 'doesn\'t', misconception: null },
      { text: 'don\'t', misconception: 'don\'t is used with I/you/we/they, not she' },
      { text: 'isn\'t', misconception: 'isn\'t negates be, not action verbs like "like"' },
      { text: 'not', misconception: 'not alone cannot negate a verb — it needs doesn\'t or don\'t' },
    ],
    correctIndex: 0,
    difficulty: 0.18,
  },
  {
    // # Question with do/does — word order.
    id: 'item.a1.gram.12',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    stem: '______ you speak French?',
    options: [
      { text: 'Do', misconception: null },
      { text: 'Are', misconception: 'are is used with be, not action verbs like speak' },
      { text: 'Does', misconception: 'does is third person (he/she/it), not you' },
      { text: 'Is', misconception: 'is is for be questions, not action verb questions' },
    ],
    correctIndex: 0,
    difficulty: 0.15,
  },
  {
    // # Adverb of frequency placement with present simple.
    id: 'item.a1.gram.13',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.present_simple'],
    stem: 'We ______ eat dinner at 7 o\'clock.',
    options: [
      { text: 'usually', misconception: null },
      { text: 'use', misconception: 'use is a verb meaning to utilise something, not an adverb of frequency' },
      { text: 'usual', misconception: 'usual is an adjective, not an adverb — the adverb form is usually' },
      { text: 'used', misconception: 'used is past tense of use, not a frequency adverb' },
    ],
    correctIndex: 0,
    difficulty: 0.18,
  },

  // # ── gram.a1.can_cant (items 05–06, 14–16) ───────────────────────
  {
    id: 'item.a1.gram.05',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    stem: 'She ______ speak three languages.',
    options: [
      { text: 'can', misconception: null },
      { text: 'cans', misconception: 'can is a modal verb and never takes -s' },
      { text: 'is can', misconception: 'can does not use a form of be before it' },
      { text: 'could to', misconception: 'modal verbs are followed by the bare infinitive without to' },
    ],
    correctIndex: 0,
    difficulty: 0.12,
  },
  {
    id: 'item.a1.gram.06',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    stem: 'I ______ swim when I was three years old.',
    options: [
      { text: 'can', misconception: 'can is present tense, but the sentence is about the past' },
      { text: 'can\'t', misconception: 'can\'t is present tense, the sentence is about the past' },
      { text: 'couldn\'t', misconception: null },
      { text: 'don\'t can', misconception: 'can is negated with cannot/can\'t, not with do/don\'t' },
    ],
    correctIndex: 2,
    difficulty: 0.2,
  },
  {
    // # Can for permission at A1 — a frequent real-world usage.
    id: 'item.a1.gram.14',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    stem: '______ I open the window? It\'s very hot.',
    options: [
      { text: 'Can', misconception: null },
      { text: 'Do', misconception: 'do is for action verb questions, but can is needed for permission' },
      { text: 'Am', misconception: 'am forms questions with be, not permission requests' },
      { text: 'Have', misconception: 'have is for possession or perfect tenses, not permission' },
    ],
    correctIndex: 0,
    difficulty: 0.1,
  },
  {
    // # Can't + perception verb — natural context.
    id: 'item.a1.gram.15',
    level: 'A1', skill: 'general',
    nodeIds: ['gram.a1.can_cant'],
    stem: 'I ______ hear you. Please speak louder.',
    options: [
      { text: 'can\'t', misconception: null },
      { text: 'don\'t', misconception: 'don\'t negates action verbs, but hear with ability uses can\'t' },
      { text: 'am not', misconception: 'am not negates be, not perception verbs' },
      { text: 'haven\'t', misconception: 'haven\'t is for perfect tenses, not ability' },
    ],
    correctIndex: 0,
    difficulty: 0.12,
  },

  // # ── lex.a1.everyday_objects (items 01–02, 03–06) ─────────────────
  {
    id: 'item.a1.lex.01',
    level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    stem: 'Which of these do you use to write?',
    options: [
      { text: 'a pen', misconception: null },
      { text: 'a cup', misconception: 'a cup is for drinking, not writing' },
      { text: 'a chair', misconception: 'a chair is for sitting, not writing' },
      { text: 'a key', misconception: 'a key is for opening locks, not writing' },
    ],
    correctIndex: 0,
    difficulty: 0.05,
  },
  {
    id: 'item.a1.lex.02',
    level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    stem: '"I need to call my friend." What do you need?',
    options: [
      { text: 'a book', misconception: 'a book is for reading, not calling someone' },
      { text: 'a phone', misconception: null },
      { text: 'a bag', misconception: 'a bag is for carrying things, not calling' },
      { text: 'a clock', misconception: 'a clock shows the time, it is not for calling' },
    ],
    correctIndex: 1,
    difficulty: 0.05,
  },
  {
    // # Kitchen vocabulary — practical daily life context.
    id: 'item.a1.lex.03',
    level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    stem: 'You cut bread with a ______.',
    options: [
      { text: 'knife', misconception: null },
      { text: 'spoon', misconception: 'a spoon is for eating soup or cereal, not cutting' },
      { text: 'plate', misconception: 'a plate holds food, it does not cut' },
      { text: 'glass', misconception: 'a glass is for drinking, not cutting' },
    ],
    correctIndex: 0,
    difficulty: 0.05,
  },
  {
    // # Clothing vocabulary — dressing context.
    id: 'item.a1.lex.04',
    level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    stem: 'It\'s raining. I need my ______.',
    options: [
      { text: 'umbrella', misconception: null },
      { text: 'sunglasses', misconception: 'sunglasses are for sunny weather, not rain' },
      { text: 'wallet', misconception: 'a wallet holds money, it does not protect from rain' },
      { text: 'pillow', misconception: 'a pillow is for sleeping, not protection from rain' },
    ],
    correctIndex: 0,
    difficulty: 0.08,
  },
  {
    id: 'item.a1.lex.05',
    level: 'A1', skill: 'general',
    nodeIds: ['lex.a1.everyday_objects'],
    stem: 'I write with a ______.',
    options: [
      { text: 'pen', misconception: null },
      { text: 'cup', misconception: 'a cup is for drinking, not writing' },
      { text: 'shoe', misconception: 'a shoe is worn on the foot, not used for writing' },
      { text: 'hat', misconception: 'a hat is worn on the head, not used for writing' },
    ],
    correctIndex: 0,
    difficulty: 0.05,
  },

  // # ── cando.a1.read_signs (items read.01–read.04) ──────────────────
  {
    id: 'item.a1.read.01',
    level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    stem: 'A sign at the door says "PULL". What should you do?',
    options: [
      { text: 'Push the door', misconception: 'push is the opposite action of pull' },
      { text: 'Pull the door towards you', misconception: null },
      { text: 'Wait for the door to open', misconception: 'the sign tells you what action to take' },
      { text: 'Knock on the door', misconception: 'knocking is not what the sign instructs' },
    ],
    correctIndex: 1,
    difficulty: 0.08,
  },
  {
    id: 'item.a1.read.02',
    level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    stem: 'A café menu says: "Tea — £2.50, Coffee — £3.00". How much is coffee?',
    options: [
      { text: '£2.50', misconception: '£2.50 is the price of tea, not coffee' },
      { text: '£3.00', misconception: null },
      { text: '£5.50', misconception: '£5.50 is the total if you buy both, not the price of coffee' },
      { text: '£2.00', misconception: 'this price is not listed on the menu' },
    ],
    correctIndex: 1,
    difficulty: 0.05,
  },
  {
    // # Danger sign comprehension — safety context.
    id: 'item.a1.read.03',
    level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    stem: 'A sign says "NO SMOKING". What does it mean?',
    options: [
      { text: 'You cannot smoke here', misconception: null },
      { text: 'You can buy cigarettes here', misconception: 'the sign prohibits smoking, it does not sell cigarettes' },
      { text: 'Smoking is free here', misconception: 'the sign bans smoking, it does not offer it for free' },
      { text: 'The fire alarm is broken', misconception: 'the sign is about smoking rules, not fire alarms' },
    ],
    correctIndex: 0,
    difficulty: 0.05,
  },
  {
    // # Timetable reading — practical everyday skill.
    id: 'item.a1.read.04',
    level: 'A1', skill: 'reading',
    nodeIds: ['cando.a1.read_signs'],
    stem: 'A bus timetable shows: "Bus 42 — every 15 minutes". How often does the bus come?',
    options: [
      { text: 'Every 42 minutes', misconception: '42 is the bus number, not the frequency' },
      { text: 'Every 15 minutes', misconception: null },
      { text: 'Once a day', misconception: 'every 15 minutes means many times a day, not once' },
      { text: 'Every hour', misconception: 'the timetable says 15 minutes, not 60 minutes' },
    ],
    correctIndex: 1,
    difficulty: 0.08,
  },

  // # ── cando.a1.understand_instructions (items listen.01–02) ─────────
  {
    // # Simple instruction following — classroom context.
    id: 'item.a1.listen.01',
    level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    stem: 'The teacher says: "Please open your books to page 10." What should you do?',
    options: [
      { text: 'Close your book', misconception: 'close is the opposite of open' },
      { text: 'Open your book to page 10', misconception: null },
      { text: 'Write on page 10', misconception: 'the instruction is to open, not write' },
      { text: 'Give the book to the teacher', misconception: 'the teacher said to open your book, not give it away' },
    ],
    correctIndex: 1,
    difficulty: 0.05,
  },
  {
    // # Direction following — spatial instruction.
    id: 'item.a1.listen.02',
    level: 'A1', skill: 'listening',
    nodeIds: ['cando.a1.understand_instructions'],
    stem: '"Turn left at the traffic lights." Which direction should you go?',
    options: [
      { text: 'Right', misconception: 'right is the opposite direction of left' },
      { text: 'Left', misconception: null },
      { text: 'Straight', misconception: 'straight means continuing forward, not turning' },
      { text: 'Back', misconception: 'back means turning around, not turning left' },
    ],
    correctIndex: 1,
    difficulty: 0.05,
  },

  // # ── cando.a1.write_simple_phrases (items write.01–02) ────────────
  {
    // # Form-filling — the core A1 writing skill.
    id: 'item.a1.write.01',
    level: 'A1', skill: 'writing',
    nodeIds: ['cando.a1.write_simple_phrases'],
    stem: 'On a hotel form, the field says "Nationality". You are from Japan. You write:',
    options: [
      { text: 'Japanese', misconception: null },
      { text: 'Japan', misconception: 'Japan is the country name, but nationality asks for the adjective form' },
      { text: 'Tokyo', misconception: 'Tokyo is a city, not a nationality' },
      { text: 'Asia', misconception: 'Asia is a continent, not a nationality' },
    ],
    correctIndex: 0,
    difficulty: 0.1,
  },
  {
    // # Simple self-introduction writing.
    id: 'item.a1.write.02',
    level: 'A1', skill: 'writing',
    nodeIds: ['cando.a1.write_simple_phrases'],
    stem: 'Which sentence is correct for introducing yourself?',
    options: [
      { text: 'My name is Anna.', misconception: null },
      { text: 'My name are Anna.', misconception: 'are is plural, but name is singular — use is' },
      { text: 'I name Anna.', misconception: 'the verb be (is) is missing between the subject and the name' },
      { text: 'Name my is Anna.', misconception: 'the word order is wrong — subject + verb + complement' },
    ],
    correctIndex: 0,
    difficulty: 0.08,
  },

  // # ── cando.a1.introduce_self (items speak.01–02) ──────────────────
  {
    // # Greeting response — basic social interaction.
    id: 'item.a1.speak.01',
    level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    stem: 'Someone says: "Nice to meet you." You reply:',
    options: [
      { text: 'Nice to meet you too.', misconception: null },
      { text: 'I\'m fine, thank you.', misconception: 'this is a response to "How are you?", not "Nice to meet you"' },
      { text: 'See you later.', misconception: 'see you later is a goodbye, not a greeting response' },
      { text: 'You\'re welcome.', misconception: 'you\'re welcome responds to thank you, not introductions' },
    ],
    correctIndex: 0,
    difficulty: 0.08,
  },
  {
    // # Asking about someone's job — basic question.
    id: 'item.a1.speak.02',
    level: 'A1', skill: 'speaking',
    nodeIds: ['cando.a1.introduce_self'],
    stem: 'You want to know someone\'s job. You ask:',
    options: [
      { text: 'What do you do?', misconception: null },
      { text: 'Where do you do?', misconception: 'where asks about location, not occupation' },
      { text: 'Who do you do?', misconception: 'who asks about a person, not a job' },
      { text: 'How do you do?', misconception: 'how do you do is a formal greeting, not a job question' },
    ],
    correctIndex: 0,
    difficulty: 0.12,
  },
]

// ─── A2 items (40) ─────────────────────────────────────────────────────
// # Elementary items: past simple (regular + irregular), going to future,
// # comparatives/superlatives, travel vocabulary, reading letters, conversations.

const A2_ITEMS: SeedItem[] = [
  // # ── gram.a2.past_simple (items 01–10) ────────────────────────────
  {
    id: 'item.a2.gram.01',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'Yesterday I ______ to the park with my friends.',
    options: [
      { text: 'go', misconception: 'go is present tense, but yesterday indicates past' },
      { text: 'went', misconception: null },
      { text: 'gone', misconception: 'gone is the past participle, used with have/has' },
      { text: 'going', misconception: 'going is the continuous form, not past simple' },
    ],
    correctIndex: 1,
    difficulty: 0.2,
  },
  {
    id: 'item.a2.gram.02',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'She ______ a new dress last weekend.',
    options: [
      { text: 'buyed', misconception: 'buy is an irregular verb — buyed does not exist' },
      { text: 'bought', misconception: null },
      { text: 'buys', misconception: 'buys is present tense, but last weekend indicates past' },
      { text: 'buying', misconception: 'buying is the continuous form, not past simple' },
    ],
    correctIndex: 1,
    difficulty: 0.25,
  },
  {
    id: 'item.a2.gram.03',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'We ______ dinner at 7 o\'clock last night.',
    options: [
      { text: 'have', misconception: 'have is present tense, the sentence is about last night' },
      { text: 'having', misconception: 'having is the continuous form, not past simple' },
      { text: 'had', misconception: null },
      { text: 'has', misconception: 'has is third person present, not past' },
    ],
    correctIndex: 2,
    difficulty: 0.18,
  },
  {
    // # Regular -ed past tense — pronunciation and spelling.
    id: 'item.a2.gram.08',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'The children ______ football in the garden after school.',
    options: [
      { text: 'played', misconception: null },
      { text: 'play', misconception: 'play is present tense, but after school (past context) requires past' },
      { text: 'plays', misconception: 'plays is third person present, not past' },
      { text: 'plaid', misconception: 'plaid is a fabric pattern, not the past tense of play' },
    ],
    correctIndex: 0,
    difficulty: 0.15,
  },
  {
    // # Irregular past tense — "see" is commonly tested.
    id: 'item.a2.gram.09',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'I ______ a very interesting film on TV last night.',
    options: [
      { text: 'saw', misconception: null },
      { text: 'seed', misconception: 'see is irregular — its past form is saw, not seed' },
      { text: 'seen', misconception: 'seen is the past participle, used with have/has, not alone' },
      { text: 'see', misconception: 'see is present tense, but last night indicates past' },
    ],
    correctIndex: 0,
    difficulty: 0.22,
  },
  {
    // # Past simple negative — did + not + base form.
    id: 'item.a2.gram.10',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'He ______ to the party because he was ill.',
    options: [
      { text: 'didn\'t go', misconception: null },
      { text: 'didn\'t went', misconception: 'after didn\'t, use the base form (go), not the past form (went)' },
      { text: 'not went', misconception: 'English needs did + not to negate past simple, not just not' },
      { text: 'doesn\'t go', misconception: 'doesn\'t is present tense, but the sentence is past' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },
  {
    // # Past simple question — Did + subject + base form.
    id: 'item.a2.gram.11',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: '______ you enjoy the concert?',
    options: [
      { text: 'Did', misconception: null },
      { text: 'Do', misconception: 'do is present tense, but the concert already happened' },
      { text: 'Were', misconception: 'were is for be questions, not action verb questions in past simple' },
      { text: 'Have', misconception: 'have forms present perfect questions, not past simple' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },
  {
    // # Irregular verb "take" — common travel/daily life verb.
    id: 'item.a2.gram.12',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'She ______ a taxi to the airport this morning.',
    options: [
      { text: 'took', misconception: null },
      { text: 'taked', misconception: 'take is irregular — its past form is took, not taked' },
      { text: 'take', misconception: 'take is present tense, but this morning (completed) requires past' },
      { text: 'taken', misconception: 'taken is the past participle, used with have, not alone' },
    ],
    correctIndex: 0,
    difficulty: 0.22,
  },

  // # ── gram.a2.future_going_to (items 04–05, 13–16) ────────────────
  {
    id: 'item.a2.gram.04',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    stem: 'Look at those clouds! It ______ rain.',
    options: [
      { text: 'will', misconception: 'will is used for decisions and predictions without evidence, not plans based on evidence' },
      { text: 'is going to', misconception: null },
      { text: 'rains', misconception: 'rains is present simple, but this is a future prediction' },
      { text: 'rained', misconception: 'rained is past tense, but the rain hasn\'t happened yet' },
    ],
    correctIndex: 1,
    difficulty: 0.3,
  },
  {
    id: 'item.a2.gram.05',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    stem: 'I ______ study medicine at university next year.',
    options: [
      { text: 'am going to', misconception: null },
      { text: 'going', misconception: 'going to needs the auxiliary am/is/are before it' },
      { text: 'go to', misconception: 'go to is present tense, not a future construction' },
      { text: 'was going to', misconception: 'was going to is past tense, but next year is future' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },
  {
    // # Negative future with going to.
    id: 'item.a2.gram.13',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    stem: 'We ______ stay at home tonight. We have tickets for the theatre.',
    options: [
      { text: 'aren\'t going to', misconception: null },
      { text: 'don\'t going to', misconception: 'going to uses be (am/is/are) as its auxiliary, not do' },
      { text: 'won\'t going to', misconception: 'won\'t and going to are two different future forms — don\'t combine them' },
      { text: 'not going', misconception: 'the auxiliary are is needed before not going to' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },
  {
    // # Third person going to — he/she/it + is going to.
    id: 'item.a2.gram.14',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    stem: 'My sister ______ travel to Italy this summer.',
    options: [
      { text: 'is going to', misconception: null },
      { text: 'are going to', misconception: 'are is for plural subjects, but my sister is singular' },
      { text: 'am going to', misconception: 'am is only used with I, not she/my sister' },
      { text: 'going to', misconception: 'the auxiliary is (am/is/are) is missing before going to' },
    ],
    correctIndex: 0,
    difficulty: 0.22,
  },

  // # ── gram.a2.comparatives (items 06–07, 15–19) ───────────────────
  {
    id: 'item.a2.gram.06',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    stem: 'This book is ______ than that one.',
    options: [
      { text: 'more interesting', misconception: null },
      { text: 'more interestinger', misconception: 'long adjectives use more, not more + -er (double marking)' },
      { text: 'interestinger', misconception: 'long adjectives form the comparative with more, not -er' },
      { text: 'most interesting', misconception: 'most interesting is the superlative, not the comparative' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },
  {
    id: 'item.a2.gram.07',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    stem: 'My sister is ______ person in our family.',
    options: [
      { text: 'the tallest', misconception: null },
      { text: 'taller', misconception: 'taller is the comparative, but in our family suggests the superlative' },
      { text: 'the most tall', misconception: 'short adjectives like tall use -est, not most' },
      { text: 'more tall', misconception: 'short adjectives like tall use -er, not more' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    // # Irregular comparative — good/better.
    id: 'item.a2.gram.15',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    stem: 'This restaurant is ______ than the one near the station.',
    options: [
      { text: 'better', misconception: null },
      { text: 'gooder', misconception: 'good is irregular — its comparative is better, not gooder' },
      { text: 'more good', misconception: 'good is irregular — it does not use more, it becomes better' },
      { text: 'best', misconception: 'best is the superlative, not the comparative' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },
  {
    // # As...as comparison structure.
    id: 'item.a2.gram.16',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    stem: 'My bag is as ______ as yours.',
    options: [
      { text: 'heavy', misconception: null },
      { text: 'heavier', misconception: 'as...as uses the base adjective form, not the comparative' },
      { text: 'heaviest', misconception: 'as...as uses the base form, not the superlative' },
      { text: 'more heavy', misconception: 'as...as takes the base adjective, not the comparative form' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    // # Superlative with irregular — bad/worst.
    id: 'item.a2.gram.17',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    stem: 'That was the ______ meal I\'ve ever had.',
    options: [
      { text: 'worst', misconception: null },
      { text: 'baddest', misconception: 'bad is irregular — its superlative is worst, not baddest' },
      { text: 'most bad', misconception: 'bad is irregular — it does not use most, it becomes worst' },
      { text: 'worse', misconception: 'worse is the comparative, not the superlative' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },

  // # ── lex.a2.travel (items lex.01–06) ──────────────────────────────
  {
    id: 'item.a2.lex.01',
    level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    stem: 'The plane lands at the ______.',
    options: [
      { text: 'station', misconception: 'station is for trains and buses, not planes' },
      { text: 'airport', misconception: null },
      { text: 'harbour', misconception: 'harbour is for ships and boats, not planes' },
      { text: 'parking', misconception: 'parking is for cars, not where planes land' },
    ],
    correctIndex: 1,
    difficulty: 0.15,
  },
  {
    id: 'item.a2.lex.02',
    level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    stem: 'You need a ______ to travel to another country.',
    options: [
      { text: 'passport', misconception: null },
      { text: 'ticket', misconception: 'a ticket lets you board transport, but you need a passport to enter a country' },
      { text: 'suitcase', misconception: 'a suitcase carries your belongings, it does not allow entry to a country' },
      { text: 'map', misconception: 'a map helps you find places, not enter countries' },
    ],
    correctIndex: 0,
    difficulty: 0.12,
  },
  {
    // # Train vocabulary — departure context.
    id: 'item.a2.lex.03',
    level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    stem: 'The train ______ at platform 3.',
    options: [
      { text: 'departs', misconception: null },
      { text: 'leaves out', misconception: '"leave out" means to omit — trains depart or leave from a place' },
      { text: 'goes off', misconception: '"go off" means to explode or ring (alarm) — not a travel term' },
      { text: 'exits', misconception: '"exit" means to leave a building/room — trains depart, not exit' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },
  {
    // # Hotel vocabulary — checking in.
    id: 'item.a2.lex.04',
    level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    stem: 'I have a ______ at the Grand Hotel for two nights.',
    options: [
      { text: 'reservation', misconception: null },
      { text: 'invitation', misconception: 'an invitation is when someone asks you to come, not a hotel booking' },
      { text: 'subscription', misconception: 'a subscription is for magazines or services, not hotel stays' },
      { text: 'application', misconception: 'an application is for jobs or programmes, not hotel bookings' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },
  {
    // # Direction vocabulary — asking for help while travelling.
    id: 'item.a2.lex.05',
    level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    stem: '"Excuse me, where is the nearest ______?" "It\'s across the road, next to the supermarket."',
    options: [
      { text: 'pharmacy', misconception: null },
      { text: 'flight', misconception: 'a flight is a journey by plane, not a place you can walk to' },
      { text: 'departure', misconception: 'a departure is the act of leaving, not a physical location' },
      { text: 'journey', misconception: 'a journey is a trip, not a physical building you can visit' },
    ],
    correctIndex: 0,
    difficulty: 0.15,
  },

  // # ── cando.a2.read_personal_letter (items read.01–03) ─────────────
  {
    id: 'item.a2.read.01',
    level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    stem: '"Dear Tom, I arrived in Paris yesterday. The hotel is nice but small. See you next week. — Sara." Where is Sara?',
    options: [
      { text: 'At home', misconception: 'the letter says she arrived in Paris, so she is not at home' },
      { text: 'In Paris', misconception: null },
      { text: 'With Tom', misconception: 'she says see you next week, so she is not with Tom now' },
      { text: 'At the airport', misconception: 'she arrived yesterday and is at the hotel, not still at the airport' },
    ],
    correctIndex: 1,
    difficulty: 0.2,
  },
  {
    // # Short email comprehension — modern context.
    id: 'item.a2.read.02',
    level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    stem: '"Hi Mum, I passed my driving test today! I\'m so happy. Can we go out for dinner to celebrate? Love, Kate." What happened to Kate?',
    options: [
      { text: 'She failed her test', misconception: 'the message says she passed, not failed' },
      { text: 'She passed her driving test', misconception: null },
      { text: 'She had dinner', misconception: 'she is asking to go for dinner, it hasn\'t happened yet' },
      { text: 'She bought a car', misconception: 'the message is about passing a test, not buying a car' },
    ],
    correctIndex: 1,
    difficulty: 0.15,
  },

  // # ── cando.a2.understand_conversation (items listen.01–03) ────────
  {
    // # Simple shop conversation — price and quantity.
    id: 'item.a2.listen.01',
    level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    stem: 'Shop assistant: "That\'s £4.50, please." Customer: "Here you are. Can I have a bag?" What is the customer buying?',
    options: [
      { text: 'We don\'t know exactly, but it costs £4.50', misconception: null },
      { text: 'A bag for £4.50', misconception: 'the customer asks for a bag separately — the £4.50 is for the main purchase' },
      { text: 'Nothing — the customer is just asking for a bag', misconception: 'the customer is paying £4.50, so they are buying something' },
      { text: 'Something that costs £45.00', misconception: 'the price is £4.50, not £45.00' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },
  {
    // # Restaurant conversation — ordering food.
    id: 'item.a2.listen.02',
    level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    stem: 'Waiter: "Are you ready to order?" Customer: "Yes, I\'ll have the chicken, please." Waiter: "And to drink?" Customer: "Just water, thanks." What does the customer want to drink?',
    options: [
      { text: 'Coffee', misconception: 'the customer said water, not coffee' },
      { text: 'Water', misconception: null },
      { text: 'Juice', misconception: 'the customer said water, not juice' },
      { text: 'The customer didn\'t order a drink', misconception: 'the customer said "just water" when asked about drinks' },
    ],
    correctIndex: 1,
    difficulty: 0.15,
  },

  // # ── cando.a2.write_short_messages (items write.01–02) ────────────
  {
    // # Short message — cancellation note.
    id: 'item.a2.write.01',
    level: 'A2', skill: 'writing',
    nodeIds: ['cando.a2.write_short_messages'],
    stem: 'You cannot meet your friend tomorrow. Which message is best?',
    options: [
      { text: 'Sorry, I can\'t come tomorrow. Can we meet next week?', misconception: null },
      { text: 'I don\'t want to see you.', misconception: 'this is rude and does not suggest an alternative — cancellations should be polite' },
      { text: 'Tomorrow is cancelled.', misconception: 'you cannot cancel a day — you cancel a meeting or plan' },
      { text: 'Maybe I come, maybe not.', misconception: 'this is vague and does not clearly cancel the plan' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },

  // # ── cando.a2.describe_routine (items speak.01–02) ────────────────
  {
    // # Describing daily routine — time expressions.
    id: 'item.a2.speak.01',
    level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    stem: '"What time do you usually get up?" The best answer is:',
    options: [
      { text: 'I usually get up at 7 o\'clock.', misconception: null },
      { text: 'Yes, I do.', misconception: 'this is a yes/no answer, but the question asks for a time' },
      { text: 'I get up yesterday at 7.', misconception: 'yesterday is past tense, but the question asks about usual routine' },
      { text: 'At morning.', misconception: 'the preposition is wrong — it should be "in the morning", and a time is more specific' },
    ],
    correctIndex: 0,
    difficulty: 0.18,
  },

  // # ── gram.a2.past_simple (items gram.18–19) ──────────────────────────
  {
    // # Past simple with irregular verb "have".
    id: 'item.a2.gram.18',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'They ______ a great time at the beach yesterday.',
    options: [
      { text: 'had', misconception: null },
      { text: 'have', misconception: 'present tense, not past — yesterday requires past simple' },
      { text: 'haved', misconception: 'have is irregular — its past form is had, not haved' },
      { text: 'has', misconception: 'third person present tense, not past' },
    ],
    correctIndex: 0,
    difficulty: 0.18,
  },
  {
    // # Past simple with irregular verb "do".
    id: 'item.a2.gram.19',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'I ______ my homework before dinner last night.',
    options: [
      { text: 'did', misconception: null },
      { text: 'do', misconception: 'present tense, not past — last night requires past simple' },
      { text: 'does', misconception: 'third person present tense, not past' },
      { text: 'done', misconception: 'past participle — needs have/has before it' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },

  // # ── gram.a2.future_going_to (item gram.20) ─────────────────────────
  {
    // # Future with "going to" — plural subject agreement.
    id: 'item.a2.gram.20',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    stem: 'They ______ move to a new house next month.',
    options: [
      { text: 'are going to', misconception: null },
      { text: 'is going to', misconception: 'is is for singular subjects — they is plural, so use are' },
      { text: 'going to', misconception: 'missing auxiliary verb are before going to' },
      { text: 'were going to', misconception: 'past tense — but next month indicates future' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },

  // # ── gram.a2.comparatives (items gram.21–22) ────────────────────────
  {
    // # Comparative form of short adjective.
    id: 'item.a2.gram.21',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    stem: 'This exercise is ______ than the last one.',
    options: [
      { text: 'easier', misconception: null },
      { text: 'more easy', misconception: 'short adjectives use -er, not more' },
      { text: 'easiest', misconception: 'superlative form, not comparative — than signals comparative' },
      { text: 'easy', misconception: 'base form — comparative needs -er ending' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },
  {
    // # Superlative form of short adjective.
    id: 'item.a2.gram.22',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    stem: 'Winter is the ______ season in this country.',
    options: [
      { text: 'coldest', misconception: null },
      { text: 'colder', misconception: 'comparative form, but the signals superlative' },
      { text: 'most cold', misconception: 'short adjectives use -est, not most' },
      { text: 'more cold', misconception: 'short adjectives use -er/-est, not more/most' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },

  // # ── lex.a2.travel (items lex.06–07) ─────────────────────────────────
  {
    // # Hotel check-in phrasal verb.
    id: 'item.a2.lex.06',
    level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    stem: 'We need to ______ in at the hotel before we can go to our room.',
    options: [
      { text: 'check', misconception: null },
      { text: 'control', misconception: 'control means to manage, not register at a hotel' },
      { text: 'enter', misconception: 'enter means go inside, not the registration process' },
      { text: 'arrive', misconception: 'arrive means to reach a place, but check in is the registration act' },
    ],
    correctIndex: 0,
    difficulty: 0.22,
  },
  {
    // # Travel vocabulary — journey vs travel vs voyage.
    id: 'item.a2.lex.07',
    level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    stem: 'The ______ to London takes about two hours by train.',
    options: [
      { text: 'journey', misconception: null },
      { text: 'travel', misconception: 'travel is usually a verb — journey is the noun for a trip' },
      { text: 'voyage', misconception: 'voyage is typically for sea travel, not train' },
      { text: 'tour', misconception: 'a tour involves visiting many places, not a single trip' },
    ],
    correctIndex: 0,
    difficulty: 0.22,
  },

  // # ── cando.a2.read_personal_letter (item read.03) ────────────────────
  {
    // # Reading comprehension — short personal message.
    id: 'item.a2.read.03',
    level: 'A2', skill: 'reading',
    nodeIds: ['cando.a2.read_personal_letter'],
    stem: '"Hi David, I can\'t come to your party on Saturday. I have to visit my grandparents. Have fun! — Lily." Why can\'t Lily come?',
    options: [
      { text: 'She has to visit her grandparents.', misconception: null },
      { text: 'She doesn\'t like parties.', misconception: 'the reason given is visiting grandparents, not disliking parties' },
      { text: 'She is ill.', misconception: 'illness is not mentioned in the message' },
      { text: 'David cancelled the party.', misconception: 'the party is still happening — David did not cancel' },
    ],
    correctIndex: 0,
    difficulty: 0.15,
  },

  // # ── cando.a2.understand_conversation (item listen.03) ───────────────
  {
    // # Listening comprehension — appointment time detail.
    id: 'item.a2.listen.03',
    level: 'A2', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    stem: 'Receptionist: "Your appointment is at 3:30 with Dr. Patel." Patient: "Can I change it to 4 o\'clock?" Receptionist: "I\'m sorry, 4 o\'clock is fully booked." What time is the appointment?',
    options: [
      { text: '3:30', misconception: null },
      { text: '4 o\'clock', misconception: 'the patient requested 4 but it was not available' },
      { text: '3 o\'clock', misconception: '3 o\'clock was not mentioned — the time is 3:30' },
      { text: 'There is no appointment.', misconception: 'the original appointment at 3:30 still stands' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },

  // # ── cando.a2.write_short_messages (item write.02) ───────────────────
  {
    // # Writing — appropriate thank-you message.
    id: 'item.a2.write.02',
    level: 'A2', skill: 'writing',
    nodeIds: ['cando.a2.write_short_messages'],
    stem: 'You want to thank a friend for a gift. Which message is best?',
    options: [
      { text: 'Thank you so much for the lovely gift! I really like it.', misconception: null },
      { text: 'Gift received.', misconception: 'too blunt and unfriendly for a message to a friend' },
      { text: 'You gave me a thing.', misconception: 'vague and lacks any expression of gratitude' },
      { text: 'Why did you buy this?', misconception: 'sounds ungrateful and rude' },
    ],
    correctIndex: 0,
    difficulty: 0.15,
  },

  // # ── cando.a2.describe_routine (item speak.02) ───────────────────────
  {
    // # Speaking — describing after-work routine.
    id: 'item.a2.speak.02',
    level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    stem: '"What do you do after work?" The best answer is:',
    options: [
      { text: 'I usually go to the gym and then cook dinner at home.', misconception: null },
      { text: 'After.', misconception: 'not a complete sentence — does not answer the question' },
      { text: 'I worked yesterday.', misconception: 'answers a different question about the past, not routine' },
      { text: 'No.', misconception: 'does not answer a what question' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },

  // # ── gram.a2.past_simple (item gram.23) ──────────────────────────────
  {
    // # Past simple with irregular verb "go".
    id: 'item.a2.gram.23',
    level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    stem: 'We ______ to the cinema last Friday.',
    options: [
      { text: 'went', misconception: null },
      { text: 'go', misconception: 'present tense — last Friday requires past simple' },
      { text: 'goed', misconception: 'go is irregular — goed does not exist, the past form is went' },
      { text: 'gone', misconception: 'past participle — needs have/has before it' },
    ],
    correctIndex: 0,
    difficulty: 0.18,
  },
]

// ─── B1 items (60) — placement starts here ─────────────────────────────
// # Intermediate items: present perfect, present perfect vs past simple,
// # modals (must/should/might), work & education vocabulary, reading factual
// # texts, understanding monologues, connected writing, describing routines.

const B1_ITEMS: SeedItem[] = [
  // # ── gram.b1.present_perfect (items 01–03, 10–18) ─────────────────
  {
    id: 'item.b1.gram.01',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'I ______ to Japan twice.',
    options: [
      { text: 'have been', misconception: null },
      { text: 'was', misconception: 'was is past simple, but twice implies unfinished time' },
      { text: 'been', misconception: 'been needs the auxiliary have/has before it' },
      { text: 'go', misconception: 'go is present tense, the sentence describes life experience' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    id: 'item.b1.gram.02',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'She ______ here since 2019.',
    options: [
      { text: 'lives', misconception: 'since 2019 signals a time period, requiring the present perfect' },
      { text: 'has lived', misconception: null },
      { text: 'lived', misconception: 'lived is past simple, but since 2019 implies she still lives here' },
      { text: 'is living', misconception: 'present continuous does not express duration with since' },
    ],
    correctIndex: 1,
    difficulty: 0.38,
  },
  {
    id: 'item.b1.gram.03',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'Have you ever ______ sushi?',
    options: [
      { text: 'tried', misconception: null },
      { text: 'try', misconception: 'the present perfect needs the past participle, not the base form' },
      { text: 'trying', misconception: 'trying is the -ing form, not the past participle' },
      { text: 'tries', misconception: 'tries is third person present, not the past participle' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    // # Present perfect with "for" — duration up to now.
    id: 'item.b1.gram.10',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'They ______ married for twenty years.',
    options: [
      { text: 'have been', misconception: null },
      { text: 'are', misconception: 'are is present simple — for twenty years requires present perfect to show duration' },
      { text: 'were', misconception: 'were is past simple, implying they are no longer married' },
      { text: 'had been', misconception: 'had been is past perfect, but they are still married now' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Present perfect with "just" — very recent action.
    id: 'item.b1.gram.11',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'I ______ just finished my homework.',
    options: [
      { text: 'have', misconception: null },
      { text: 'am', misconception: 'am is used with be or continuous forms, not with finished as past participle' },
      { text: 'did', misconception: 'did is past simple — just with present perfect emphasises recency' },
      { text: 'was', misconception: 'was is past tense of be, not the correct auxiliary for present perfect' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    // # Present perfect with "yet" — negative and question contexts.
    id: 'item.b1.gram.12',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'Has the meeting started ______?',
    options: [
      { text: 'yet', misconception: null },
      { text: 'already', misconception: 'already is used in affirmative sentences, not questions expecting something to happen' },
      { text: 'still', misconception: 'still means continuing, but this question asks whether something has happened' },
      { text: 'ever', misconception: 'ever is for life experience questions, not about a specific expected event' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Present perfect with "already" — affirmative emphasis.
    id: 'item.b1.gram.13',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'Don\'t tell me the ending — I haven\'t ______ the film yet.',
    options: [
      { text: 'seen', misconception: null },
      { text: 'saw', misconception: 'saw is past simple, but haven\'t requires the past participle' },
      { text: 'see', misconception: 'see is the base form, but haven\'t needs the past participle' },
      { text: 'seeing', misconception: 'seeing is the -ing form, not used with have/haven\'t' },
    ],
    correctIndex: 0,
    difficulty: 0.32,
  },
  {
    // # Present perfect with "never" — life experience negative.
    id: 'item.b1.gram.14',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'She has never ______ a horse.',
    options: [
      { text: 'ridden', misconception: null },
      { text: 'rode', misconception: 'rode is past simple, but has never requires the past participle' },
      { text: 'ride', misconception: 'ride is the base form, not the past participle used with has' },
      { text: 'riding', misconception: 'riding is the continuous form, not used with has never' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },

  // # ── gram.b1.pp_vs_past_simple (items 04–06, 15–22) ──────────────
  {
    id: 'item.b1.gram.04',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'I ______ this book last summer.',
    options: [
      { text: 'read', misconception: null },
      { text: 'have read', misconception: 'last summer is a finished time, so present perfect cannot be used' },
      { text: 'have readed', misconception: 'read is an irregular verb — readed does not exist' },
      { text: 'was reading', misconception: 'was reading is past continuous, not appropriate for a completed action' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    id: 'item.b1.gram.05',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: '"Have you seen the new film?" — "Yes, I ______ it yesterday."',
    options: [
      { text: 'have seen', misconception: 'yesterday is a finished time, so past simple is required' },
      { text: 'saw', misconception: null },
      { text: 'see', misconception: 'see is present tense, but the action was yesterday' },
      { text: 'seeing', misconception: 'seeing is the -ing form, not past simple' },
    ],
    correctIndex: 1,
    difficulty: 0.42,
  },
  {
    id: 'item.b1.gram.06',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'I ______ my keys. I can\'t find them anywhere.',
    options: [
      { text: 'lost', misconception: 'lost (past simple) implies it is over — but the keys are still missing' },
      { text: 'have lost', misconception: null },
      { text: 'lose', misconception: 'lose is present tense, but the result is current' },
      { text: 'was losing', misconception: 'was losing is past continuous, not a current result' },
    ],
    correctIndex: 1,
    difficulty: 0.45,
  },
  {
    // # Specific time marker "in 1969" forces past simple.
    id: 'item.b1.gram.15',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'Humans first ______ on the moon in 1969.',
    options: [
      { text: 'walked', misconception: null },
      { text: 'have walked', misconception: 'in 1969 is a finished past time — present perfect cannot be used' },
      { text: 'walk', misconception: 'walk is present tense, but 1969 is in the past' },
      { text: 'had walked', misconception: 'past perfect is for an action before another past action, not for a standalone event' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    // # "This week" — unfinished time period uses present perfect.
    id: 'item.b1.gram.16',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'I ______ three cups of coffee today.',
    options: [
      { text: 'have had', misconception: null },
      { text: 'had', misconception: 'today is not finished, so present perfect is needed, not past simple' },
      { text: 'have', misconception: 'have alone is present simple, not present perfect — it needs have had' },
      { text: 'drink', misconception: 'drink is present simple and wrong tense; also the wrong verb form' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    // # "When" question always uses past simple.
    id: 'item.b1.gram.17',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'When ______ you arrive in London?',
    options: [
      { text: 'did', misconception: null },
      { text: 'have', misconception: 'when asks about a specific time, so past simple (did) is required' },
      { text: 'do', misconception: 'do is present tense, but the arrival already happened' },
      { text: 'are', misconception: 'are is for be questions, not action verb questions' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    // # Result visible now — present perfect.
    id: 'item.b1.gram.18',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'Oh no! I ______ my phone at the restaurant.',
    options: [
      { text: 'have left', misconception: null },
      { text: 'left', misconception: 'the result is relevant now (you still don\'t have it), so present perfect fits better' },
      { text: 'leave', misconception: 'leave is present tense, but the action already happened' },
      { text: 'am leaving', misconception: 'am leaving means departing right now, not forgetting an object' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },

  // # ── gram.b1.modals (items 07–09, 19–26) ─────────────────────────
  {
    id: 'item.b1.gram.07',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'You ______ see a doctor. That cough sounds bad.',
    options: [
      { text: 'should', misconception: null },
      { text: 'can', misconception: 'can expresses ability, not advice' },
      { text: 'would', misconception: 'would expresses hypothetical situations, not strong advice' },
      { text: 'shall', misconception: 'shall is used mainly for offers or suggestions with I/we' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    id: 'item.b1.gram.08',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'You ______ park here — it\'s a no-parking zone.',
    options: [
      { text: 'mustn\'t', misconception: null },
      { text: 'don\'t have to', misconception: 'don\'t have to means it is not necessary, not that it is prohibited' },
      { text: 'shouldn\'t', misconception: 'shouldn\'t is advice, but a no-parking zone is a rule' },
      { text: 'can', misconception: 'can means you are able to, but it is forbidden here' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    id: 'item.b1.gram.09',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'It ______ rain later — take an umbrella just in case.',
    options: [
      { text: 'must', misconception: 'must expresses certainty, but just in case implies uncertainty' },
      { text: 'might', misconception: null },
      { text: 'will', misconception: 'will expresses certainty, but just in case implies possibility' },
      { text: 'should', misconception: 'should is for advice, but the subject is weather' },
    ],
    correctIndex: 1,
    difficulty: 0.38,
  },
  {
    // # Must for logical deduction — he must be tired.
    id: 'item.b1.gram.19',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'He\'s been working for 12 hours. He ______ be exhausted.',
    options: [
      { text: 'must', misconception: null },
      { text: 'might', misconception: 'might expresses possibility, but 12 hours makes exhaustion near certain' },
      { text: 'should', misconception: 'should is for advice or expectation, not logical certainty from evidence' },
      { text: 'could', misconception: 'could expresses possibility, but the evidence strongly suggests certainty' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    // # Don't have to vs mustn't — lack of obligation.
    id: 'item.b1.gram.20',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'Tomorrow is a holiday. You ______ go to work.',
    options: [
      { text: 'don\'t have to', misconception: null },
      { text: 'mustn\'t', misconception: 'mustn\'t means it is forbidden, but a holiday means it is simply not necessary' },
      { text: 'can\'t', misconception: 'can\'t means it is impossible, but you could go if you wanted to' },
      { text: 'shouldn\'t', misconception: 'shouldn\'t is advice, but on a holiday there is no obligation at all' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    // # Should for recommendation — travel context.
    id: 'item.b1.gram.21',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'If you visit Bangkok, you ______ try the street food. It\'s amazing.',
    options: [
      { text: 'should', misconception: null },
      { text: 'must', misconception: 'must implies obligation, but this is a friendly recommendation' },
      { text: 'might', misconception: 'might expresses possibility, not a recommendation' },
      { text: 'could', misconception: 'could suggests ability, but the speaker is recommending the experience' },
    ],
    correctIndex: 0,
    difficulty: 0.32,
  },
  {
    // # Can't for impossibility deduction.
    id: 'item.b1.gram.22',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'That ______ be true. I saw him five minutes ago — he\'s fine.',
    options: [
      { text: 'can\'t', misconception: null },
      { text: 'mustn\'t', misconception: 'mustn\'t means prohibition, but this is about logical impossibility' },
      { text: 'shouldn\'t', misconception: 'shouldn\'t is advice, but the speaker is saying it is logically impossible' },
      { text: 'won\'t', misconception: 'won\'t is about future refusal, not about present impossibility' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },

  // # ── lex.b1.work_education (items lex.01–06) ─────────────────────
  {
    id: 'item.b1.lex.01',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'After finishing university, she applied for a ______ at a tech company.',
    options: [
      { text: 'position', misconception: null },
      { text: 'place', misconception: 'place can mean location, not typically used for job applications' },
      { text: 'situation', misconception: 'situation means circumstances, not a job role' },
      { text: 'post office', misconception: 'post office is a building, not a job' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    id: 'item.b1.lex.02',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'The company decided to ______ ten new employees.',
    options: [
      { text: 'fire', misconception: 'fire means to dismiss, the opposite of what the sentence describes' },
      { text: 'hire', misconception: null },
      { text: 'retire', misconception: 'retire means to stop working permanently' },
      { text: 'resign', misconception: 'resign means to voluntarily leave a job' },
    ],
    correctIndex: 1,
    difficulty: 0.28,
  },
  {
    // # Education vocabulary — degree types.
    id: 'item.b1.lex.03',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'She wants to do a ______ in computer science at university.',
    options: [
      { text: 'degree', misconception: null },
      { text: 'career', misconception: 'a career is long-term professional life, not a university qualification' },
      { text: 'profession', misconception: 'a profession is a type of work, not a university course of study' },
      { text: 'salary', misconception: 'a salary is money earned from a job, not a qualification' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },
  {
    // # Workplace vocabulary — meeting context.
    id: 'item.b1.lex.04',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'The team has a weekly ______ every Monday morning.',
    options: [
      { text: 'meeting', misconception: null },
      { text: 'interview', misconception: 'an interview is for job candidates, not regular team discussions' },
      { text: 'lecture', misconception: 'a lecture is a university talk, not a workplace team discussion' },
      { text: 'exam', misconception: 'an exam is a test, not a regular workplace gathering' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },
  {
    // # Work vocabulary — promotion and progression.
    id: 'item.b1.lex.05',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'After three years, she was ______ to senior manager.',
    options: [
      { text: 'promoted', misconception: null },
      { text: 'graduated', misconception: 'graduated is for completing education, not job advancement' },
      { text: 'applied', misconception: 'applied means to request something, not to be given a higher role' },
      { text: 'employed', misconception: 'employed means given a job, not moved to a higher position' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    // # Education vocabulary — scholarship.
    id: 'item.b1.lex.06',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'He received a ______ to study abroad, so he didn\'t have to pay tuition.',
    options: [
      { text: 'scholarship', misconception: null },
      { text: 'diploma', misconception: 'a diploma is a certificate you receive after completing study' },
      { text: 'curriculum', misconception: 'a curriculum is the set of courses, not financial aid' },
      { text: 'registration', misconception: 'registration is signing up, not financial support' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },

  // # ── cando.b1.understand_factual_text (items read.01–06) ──────────
  {
    id: 'item.b1.read.01',
    level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    stem: '"The Museum of Modern Art is open Tuesday to Sunday, 10:30 AM to 5:30 PM. Admission is free for children under 16." On which day is the museum closed?',
    options: [
      { text: 'Sunday', misconception: 'the text says Tuesday to Sunday, so Sunday is open' },
      { text: 'Monday', misconception: null },
      { text: 'Saturday', misconception: 'Saturday falls within Tuesday to Sunday, so it is open' },
      { text: 'It is open every day', misconception: 'the text says Tuesday to Sunday, meaning Monday is excluded' },
    ],
    correctIndex: 1,
    difficulty: 0.32,
  },
  {
    id: 'item.b1.read.02',
    level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    stem: '"Global temperatures have risen by 1.1°C since pre-industrial times. Scientists warn that exceeding 1.5°C could cause irreversible damage." What does the text say about 1.5°C?',
    options: [
      { text: 'We have already reached it', misconception: 'the text says 1.1°C so far, not 1.5°C' },
      { text: 'Going beyond it could cause permanent harm', misconception: null },
      { text: 'It is the ideal temperature', misconception: 'the text presents 1.5°C as a dangerous threshold, not an ideal' },
      { text: 'Temperatures will decrease after it', misconception: 'the text says nothing about temperatures decreasing' },
    ],
    correctIndex: 1,
    difficulty: 0.35,
  },
  {
    // # Health factual text — instructions.
    id: 'item.b1.read.03',
    level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    stem: '"Adults should drink at least 2 litres of water per day. During hot weather or exercise, more may be needed." According to the text, when should you drink more water?',
    options: [
      { text: 'When it is hot or you are exercising', misconception: null },
      { text: 'Only in the morning', misconception: 'the text does not mention time of day, just conditions' },
      { text: 'When you are ill', misconception: 'illness is not mentioned as a reason in this text' },
      { text: 'Only after meals', misconception: 'the text does not link water intake to meals' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },
  {
    // # Technology factual text — cause and effect.
    id: 'item.b1.read.04',
    level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    stem: '"Electric cars produce zero tailpipe emissions, but manufacturing their batteries requires significant mining of lithium and cobalt." What is the disadvantage of electric cars mentioned here?',
    options: [
      { text: 'They are too slow', misconception: 'speed is not discussed in the passage' },
      { text: 'Their batteries need materials that require heavy mining', misconception: null },
      { text: 'They produce harmful exhaust', misconception: 'the text says zero tailpipe emissions, contradicting this' },
      { text: 'They are too expensive to charge', misconception: 'charging cost is not mentioned in the passage' },
    ],
    correctIndex: 1,
    difficulty: 0.35,
  },

  // # ── cando.b1.understand_monologue (items listen.01–04) ────────────
  {
    id: 'item.b1.listen.01',
    level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    stem: 'A tour guide says: "The castle was built in 1245 and rebuilt after a fire in 1530. Today it houses a museum of medieval history." When was the castle originally built?',
    options: [
      { text: '1530', misconception: '1530 is when it was rebuilt, not originally built' },
      { text: '1245', misconception: null },
      { text: 'During the medieval period', misconception: 'the text gives a specific year, not just an era' },
      { text: 'The text doesn\'t say', misconception: 'the text clearly states 1245' },
    ],
    correctIndex: 1,
    difficulty: 0.3,
  },
  {
    id: 'item.b1.listen.02',
    level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    stem: 'An announcement says: "Due to engineering works, the 9:15 train to Manchester will depart from Platform 7 instead of Platform 3." What has changed?',
    options: [
      { text: 'The departure time', misconception: 'the time stays 9:15, only the platform changed' },
      { text: 'The destination', misconception: 'the destination is still Manchester' },
      { text: 'The platform', misconception: null },
      { text: 'The train has been cancelled', misconception: 'the train is still running, just from a different platform' },
    ],
    correctIndex: 2,
    difficulty: 0.28,
  },
  {
    // # Weather report monologue — extracting specifics.
    id: 'item.b1.listen.03',
    level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    stem: 'A weather report says: "Temperatures will reach 28 degrees in the south, but only 18 degrees in the north. Rain is expected in Scotland from the afternoon." Where will it rain?',
    options: [
      { text: 'In the south', misconception: 'the south will be warm; rain is expected in Scotland' },
      { text: 'Everywhere', misconception: 'the report specifically says Scotland, not the whole country' },
      { text: 'In Scotland', misconception: null },
      { text: 'It won\'t rain anywhere', misconception: 'the report clearly states rain is expected in Scotland' },
    ],
    correctIndex: 2,
    difficulty: 0.3,
  },

  // # ── cando.b1.write_connected_text (items write.01–03) ────────────
  {
    // # Paragraph linking — connectors.
    id: 'item.b1.write.01',
    level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    stem: '"I enjoy living in the city. ______, it can be very noisy at night."',
    options: [
      { text: 'However', misconception: null },
      { text: 'Because', misconception: 'because introduces a reason, but this is a contrast' },
      { text: 'So', misconception: 'so introduces a result, but noise is a contrast to enjoyment' },
      { text: 'And', misconception: 'and adds similar information, but this sentence introduces a negative contrast' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Ordering ideas — sequencing connectors.
    id: 'item.b1.write.02',
    level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    stem: '"______, preheat the oven to 180 degrees. Then, mix the flour and sugar together."',
    options: [
      { text: 'First', misconception: null },
      { text: 'Finally', misconception: 'finally introduces the last step, but this is the beginning of instructions' },
      { text: 'However', misconception: 'however shows contrast, not sequence' },
      { text: 'Meanwhile', misconception: 'meanwhile indicates simultaneous actions, but the oven step comes first' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },
  {
    // # Cause and result connector.
    id: 'item.b1.write.03',
    level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    stem: '"The road was covered in ice. ______, several cars skidded off the road."',
    options: [
      { text: 'As a result', misconception: null },
      { text: 'In contrast', misconception: 'in contrast shows difference, but this is cause and effect' },
      { text: 'For example', misconception: 'for example introduces an illustration, not a consequence' },
      { text: 'On the other hand', misconception: 'on the other hand introduces an alternative view, not a result' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },

  // # ── cando.b1.describe_routine (items speak.01–03) ────────────────
  {
    // # Describing a typical day — natural spoken context.
    id: 'item.b1.speak.01',
    level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    stem: '"What do you usually do at the weekend?" The most detailed answer is:',
    options: [
      { text: 'I usually meet friends on Saturday and relax at home on Sunday because I need to prepare for Monday.', misconception: null },
      { text: 'Weekend.', misconception: 'this is just a word, not a description of activities' },
      { text: 'Yes, I do.', misconception: 'this answers a yes/no question, but the question asks for description' },
      { text: 'I like it.', misconception: 'this expresses a feeling but does not describe what you actually do' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },

  // # ── phono.b1.connected_speech (items phono.01–02) ────────────────
  {
    // # Contraction recognition — natural speech patterns.
    id: 'item.b1.phono.01',
    level: 'B1', skill: 'speaking',
    nodeIds: ['phono.b1.connected_speech'],
    stem: 'In natural speech, "want to" is often pronounced as:',
    options: [
      { text: 'wanna', misconception: null },
      { text: 'won to', misconception: 'won is from the verb win — want does not become won in speech' },
      { text: 'want', misconception: 'the "to" does not disappear entirely — it merges with want as wanna' },
      { text: 'wanting', misconception: 'wanting is the -ing form, not a connected speech reduction' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Linking sounds between words.
    id: 'item.b1.phono.02',
    level: 'B1', skill: 'speaking',
    nodeIds: ['phono.b1.connected_speech'],
    stem: 'When a native speaker says "turn it off" quickly, the underlined sounds often:',
    options: [
      { text: 'Link together so it sounds like "tur-ni-toff"', misconception: null },
      { text: 'Are each spoken separately with clear pauses', misconception: 'in natural speech, words link together — pausing between each word sounds robotic' },
      { text: 'The "t" sounds disappear completely', misconception: 'the t sounds link with neighbouring vowels, they don\'t vanish entirely' },
      { text: 'Are spoken louder than other words', misconception: 'linking is about flow, not volume' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },

  // # ── gram.b1.present_perfect (items gram.23, 26, 29) ─────────────────
  {
    // # Present perfect with how long — duration up to now.
    id: 'item.b1.gram.23',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'How long ______ you known each other?',
    options: [
      { text: 'have', misconception: null },
      { text: 'do', misconception: 'present simple cannot express duration with how long + known' },
      { text: 'are', misconception: 'are is for be, not for perfect tenses' },
      { text: 'did', misconception: 'past simple cannot express duration up to now' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Present perfect — so far this year = unfinished time.
    id: 'item.b1.gram.24',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'She ______ three countries so far this year.',
    options: [
      { text: 'has visited', misconception: null },
      { text: 'visited', misconception: 'so far this year is unfinished time, requiring present perfect' },
      { text: 'visits', misconception: 'present simple does not express completed actions in a current period' },
      { text: 'is visiting', misconception: 'continuous describes current action, not accumulated visits' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    // # Modals — obligation from law.
    id: 'item.b1.gram.25',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'You ______ wear a seatbelt in the car. It\'s the law.',
    options: [
      { text: 'must', misconception: null },
      { text: 'should', misconception: 'should is advice, but the law makes it an obligation' },
      { text: 'might', misconception: 'might expresses possibility, not obligation' },
      { text: 'could', misconception: 'could expresses ability or possibility, not legal requirement' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Present perfect — irregular past participle.
    id: 'item.b1.gram.26',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'We have already ______ the tickets.',
    options: [
      { text: 'bought', misconception: null },
      { text: 'buy', misconception: 'base form, but have requires past participle' },
      { text: 'buying', misconception: 'ing form, not used with have' },
      { text: 'buyed', misconception: 'buy is irregular — buyed does not exist' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Past simple vs present perfect — finished period with dates.
    id: 'item.b1.gram.27',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: '"How long did you live in Paris?" "I ______ there for three years, from 2015 to 2018."',
    options: [
      { text: 'lived', misconception: null },
      { text: 'have lived', misconception: 'the period is finished with specific dates, so past simple is correct' },
      { text: 'live', misconception: 'present tense, but the period is past' },
      { text: 'was living', misconception: 'continuous suggests temporary or interrupted, not the full duration' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },
  {
    // # Modals — logical deduction from evidence.
    id: 'item.b1.gram.28',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'She ______ be at home. Her car is in the driveway.',
    options: [
      { text: 'must', misconception: null },
      { text: 'might', misconception: 'might is too uncertain — the car in the driveway is strong evidence' },
      { text: 'should', misconception: 'should is for advice/expectation, not logical deduction from evidence' },
      { text: 'could', misconception: 'could is too weak — the evidence strongly suggests she is home' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    // # Present perfect — already/yet/still distinction.
    id: 'item.b1.gram.29',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    stem: 'I\'ve ______ eaten, so I\'m not hungry.',
    options: [
      { text: 'already', misconception: null },
      { text: 'yet', misconception: 'yet is for negatives and questions, not affirmative statements' },
      { text: 'still', misconception: 'still means continuing, not about completion' },
      { text: 'ever', misconception: 'ever is for experience questions, not about recent completion' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    // # Past simple — specific finished time marker.
    id: 'item.b1.gram.30',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    stem: 'She ______ to university in 2020.',
    options: [
      { text: 'went', misconception: null },
      { text: 'has gone', misconception: 'in 2020 is a specific finished time, requiring past simple' },
      { text: 'goes', misconception: 'present tense, but 2020 is past' },
      { text: 'is going', misconception: 'present continuous describes current/future plans, not past events' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },
  {
    // # Modals — lack of necessity vs prohibition.
    id: 'item.b1.gram.31',
    level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    stem: 'You ______ to bring food. We\'ve ordered pizza for everyone.',
    options: [
      { text: 'don\'t have', misconception: null },
      { text: 'mustn\'t', misconception: 'mustn\'t means it is forbidden, but here it is simply not necessary' },
      { text: 'can\'t', misconception: 'can\'t means it is impossible, but you could bring food if you wanted' },
      { text: 'shouldn\'t', misconception: 'shouldn\'t is advice against, but the point is it is not necessary' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },

  // # ── lex.b1.work_education (items lex.07–09) ────────────────────────
  {
    // # Experience vs experiment — common false friend.
    id: 'item.b1.lex.07',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'She has a lot of ______ in marketing — she has worked in the field for ten years.',
    options: [
      { text: 'experience', misconception: null },
      { text: 'experiment', misconception: 'an experiment is a scientific test, not professional background' },
      { text: 'expression', misconception: 'an expression is a phrase or look, not professional background' },
      { text: 'expectation', misconception: 'expectation is what you hope for, not what you have done' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },
  {
    // # Register vs resign — confusable verbs.
    id: 'item.b1.lex.08',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'All students must ______ for the course before September 1st.',
    options: [
      { text: 'register', misconception: null },
      { text: 'resign', misconception: 'resign means to leave a job, not sign up' },
      { text: 'retire', misconception: 'retire means to stop working permanently' },
      { text: 'refuse', misconception: 'refuse means to say no, not to sign up' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },
  {
    // # Job vs work — countable vs uncountable.
    id: 'item.b1.lex.09',
    level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    stem: 'He got a ______ at the bank after his internship.',
    options: [
      { text: 'job', misconception: null },
      { text: 'work', misconception: 'work is uncountable — you get a job, not a work' },
      { text: 'labour', misconception: 'labour is hard physical work, not a position at a bank' },
      { text: 'career', misconception: 'career is a long-term profession, not a single position you get' },
    ],
    correctIndex: 0,
    difficulty: 0.2,
  },

  // # ── cando.b1.understand_factual_text (items read.05–07) ─────────────
  {
    // # Library opening hours — inference from absence.
    id: 'item.b1.read.05',
    level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    stem: '"The library offers free Wi-Fi and has over 10,000 books. Opening hours: Monday to Friday 9am-6pm, Saturday 10am-4pm." Can you visit the library on Sunday?',
    options: [
      { text: 'No, Sunday is not listed in the opening hours', misconception: null },
      { text: 'Yes, it is open all week', misconception: 'Sunday is not listed' },
      { text: 'Only if you have a library card', misconception: 'the text does not mention library cards for entry' },
      { text: 'Only in the morning', misconception: 'Sunday is not listed at all' },
    ],
    correctIndex: 0,
    difficulty: 0.28,
  },
  {
    // # Cycling text — extracting a specific number.
    id: 'item.b1.read.06',
    level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    stem: '"Cycling to work reduces carbon emissions by up to 67% compared to driving. It also provides 30 minutes of exercise, meeting half the recommended daily amount." How much daily exercise does cycling to work provide?',
    options: [
      { text: '30 minutes', misconception: null },
      { text: '67 minutes', misconception: '67% is the emissions reduction, not the exercise time' },
      { text: '60 minutes', misconception: '60 minutes is the full recommended amount — cycling provides half' },
      { text: '15 minutes', misconception: 'the text says 30 minutes, not 15' },
    ],
    correctIndex: 0,
    difficulty: 0.3,
  },
  {
    // # Job listing — distinguishing requirements from advantages.
    id: 'item.b1.read.07',
    level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    stem: '"Applicants must have a valid driving licence and at least two years of experience. Fluency in English is required; knowledge of French is an advantage." Is French required for the job?',
    options: [
      { text: 'No, it is helpful but not required', misconception: null },
      { text: 'Yes, you must speak French', misconception: 'the text says it is an advantage, not a requirement' },
      { text: 'French is not mentioned', misconception: 'the text explicitly mentions French' },
      { text: 'Only if you don\'t speak English', misconception: 'English is required regardless of French ability' },
    ],
    correctIndex: 0,
    difficulty: 0.32,
  },

  // # ── cando.b1.understand_monologue (items listen.04–05) ──────────────
  {
    // # Museum guide — extracting quantity from context.
    id: 'item.b1.listen.04',
    level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    stem: 'A museum guide says: "This painting was donated to the museum in 1952 by a private collector. It is believed to be one of only three surviving works by the artist." How many works by this artist are thought to exist?',
    options: [
      { text: 'Three', misconception: null },
      { text: '1952', misconception: '1952 is the year of donation, not the number of works' },
      { text: 'One', misconception: 'one was donated, but three are believed to survive' },
      { text: 'It is not mentioned', misconception: 'the guide says one of only three' },
    ],
    correctIndex: 0,
    difficulty: 0.32,
  },
  {
    // # Flight announcement — extracting temperature from mixed data.
    id: 'item.b1.listen.05',
    level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    stem: 'A flight attendant announces: "We are now beginning our descent into Bangkok. The local time is 2:15 PM and the temperature is 34 degrees. Please fasten your seatbelts." What is the temperature in Bangkok?',
    options: [
      { text: '34 degrees', misconception: null },
      { text: '2:15 degrees', misconception: '2:15 is the time, not the temperature' },
      { text: '215 degrees', misconception: 'this confuses the time with temperature' },
      { text: 'The announcement doesn\'t say', misconception: 'the temperature is clearly stated as 34 degrees' },
    ],
    correctIndex: 0,
    difficulty: 0.25,
  },

  // # ── cando.b1.write_connected_text (item write.04) ───────────────────
  {
    // # Introducing an example — for instance vs however.
    id: 'item.b1.write.04',
    level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    stem: '"There are several advantages to learning a second language. ______, it improves memory and cognitive skills."',
    options: [
      { text: 'For instance', misconception: null },
      { text: 'However', misconception: 'however shows contrast, but this gives a supporting example' },
      { text: 'In conclusion', misconception: 'in conclusion summarises, but this introduces a first example' },
      { text: 'On the contrary', misconception: 'on the contrary opposes, but this supports the main point' },
    ],
    correctIndex: 0,
    difficulty: 0.32,
  },

  // # ── cando.b1.describe_routine (item speak.02) ───────────────────────
  {
    // # Describing routine with reasons — spoken detail.
    id: 'item.b1.speak.02',
    level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    stem: '"Tell me about your morning routine." Which response gives the best description with reasons?',
    options: [
      { text: 'I wake up at 6:30 because I like to exercise before work. After my run, I have a quick breakfast and leave by 8.', misconception: null },
      { text: 'Morning.', misconception: 'one word is not a description' },
      { text: 'I get up.', misconception: 'too brief, no detail or reasons' },
      { text: 'Yes, I have a routine.', misconception: 'confirms but does not describe' },
    ],
    correctIndex: 0,
    difficulty: 0.32,
  },
]

// ─── B2 items (80) ─────────────────────────────────────────────────────
// # Upper-intermediate items: conditionals (2nd + 3rd), passive voice,
// # reported speech, abstract vocabulary, argument comprehension,
// # academic discussions, essay writing, data description.

const B2_ITEMS: SeedItem[] = [
  // # ── gram.b2.conditionals (items 01–03, 10–20) ───────────────────
  {
    id: 'item.b2.gram.01',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'If I ______ more time, I would learn another language.',
    options: [
      { text: 'have', misconception: 'have is present tense, but the second conditional uses past tense' },
      { text: 'had', misconception: null },
      { text: 'would have', misconception: 'would have belongs in the result clause, not the if clause' },
      { text: 'will have', misconception: 'will have is first conditional, not second conditional' },
    ],
    correctIndex: 1,
    difficulty: 0.5,
  },
  {
    id: 'item.b2.gram.02',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'If she ______ the bus, she wouldn\'t have been late.',
    options: [
      { text: 'caught', misconception: 'caught is past simple, but the third conditional needs past perfect' },
      { text: 'catches', misconception: 'catches is present tense, not used in third conditional' },
      { text: 'had caught', misconception: null },
      { text: 'would catch', misconception: 'would catch goes in the result clause, not the if clause' },
    ],
    correctIndex: 2,
    difficulty: 0.55,
  },
  {
    id: 'item.b2.gram.03',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'I wish I ______ at the party last night.',
    options: [
      { text: 'was', misconception: 'was is past simple; wish about the past needs past perfect' },
      { text: 'had been', misconception: null },
      { text: 'were', misconception: 'were is for unreal present/future, not past regret' },
      { text: 'am', misconception: 'am is present tense, but the regret is about last night' },
    ],
    correctIndex: 1,
    difficulty: 0.55,
  },
  {
    // # Mixed conditional — past condition, present result.
    id: 'item.b2.gram.10',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'If I had studied harder at school, I ______ a better job now.',
    options: [
      { text: 'would have', misconception: 'would have is for a past result, but now signals a present result' },
      { text: 'would', misconception: null },
      { text: 'will have', misconception: 'will have is not used in conditional structures about past regret' },
      { text: 'had', misconception: 'had belongs in the if clause, not the result clause' },
    ],
    correctIndex: 1,
    difficulty: 0.6,
  },
  {
    // # Unless = if not — conditional connector.
    id: 'item.b2.gram.11',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: '______ you hurry, we\'ll miss the train.',
    options: [
      { text: 'Unless', misconception: null },
      { text: 'If', misconception: 'if needs a negative (if you don\'t hurry) — unless already means if not' },
      { text: 'When', misconception: 'when implies certainty about timing, not a conditional warning' },
      { text: 'Although', misconception: 'although shows contrast, not a conditional relationship' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # I wish + past simple for present unreal.
    id: 'item.b2.gram.12',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'I wish I ______ taller.',
    options: [
      { text: 'were', misconception: null },
      { text: 'am', misconception: 'am is present real, but wish expresses something unreal — use past subjunctive' },
      { text: 'would be', misconception: 'would be is for wishes about other people\'s behaviour, not personal states' },
      { text: 'will be', misconception: 'will be is future real, but wish expresses unreal desire' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Third conditional — regret about a missed opportunity.
    id: 'item.b2.gram.13',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'If we had left earlier, we ______ the traffic jam.',
    options: [
      { text: 'would have avoided', misconception: null },
      { text: 'would avoid', misconception: 'would avoid is second conditional (present unreal), not third (past unreal)' },
      { text: 'will avoid', misconception: 'will avoid is first conditional (real future), not past unreal' },
      { text: 'avoided', misconception: 'avoided alone does not form the third conditional result clause' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Provided that — formal conditional.
    id: 'item.b2.gram.14',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'You can borrow my car ______ you return it by Friday.',
    options: [
      { text: 'provided that', misconception: null },
      { text: 'unless', misconception: 'unless means if not — the condition here is positive, not negative' },
      { text: 'although', misconception: 'although shows contrast, not a condition for permission' },
      { text: 'in case', misconception: 'in case means as a precaution, not a condition for permission' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },

  // # ── gram.b2.passive (items 04–06, 15–22) ────────────────────────
  {
    id: 'item.b2.gram.04',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'The report ______ by the committee last Friday.',
    options: [
      { text: 'approved', misconception: 'approved alone is active voice; the subject (report) received the action' },
      { text: 'was approved', misconception: null },
      { text: 'has approved', misconception: 'has approved is active and present perfect; the sentence is passive past' },
      { text: 'approving', misconception: 'approving is the -ing form, not a passive construction' },
    ],
    correctIndex: 1,
    difficulty: 0.45,
  },
  {
    id: 'item.b2.gram.05',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'The new hospital ______ by next year.',
    options: [
      { text: 'will be completed', misconception: null },
      { text: 'will complete', misconception: 'will complete is active, but the hospital is not doing the completing' },
      { text: 'completes', misconception: 'completes is present active, not future passive' },
      { text: 'is completing', misconception: 'is completing is active continuous, the hospital is the object' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    id: 'item.b2.gram.06',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'English ______ in many countries around the world.',
    options: [
      { text: 'speaks', misconception: 'speaks is active third person, but English is the object being spoken' },
      { text: 'is spoken', misconception: null },
      { text: 'speaking', misconception: 'speaking is not a complete verb form' },
      { text: 'has speaking', misconception: 'has speaking is not a valid verb form in English' },
    ],
    correctIndex: 1,
    difficulty: 0.4,
  },
  {
    // # Present perfect passive.
    id: 'item.b2.gram.15',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'The suspect ______ arrested.',
    options: [
      { text: 'has been', misconception: null },
      { text: 'has', misconception: 'has alone is active — the passive needs has been + past participle' },
      { text: 'is being', misconception: 'is being is present continuous passive, implying it is happening right now' },
      { text: 'have been', misconception: 'have been is for plural subjects, but the suspect is singular' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Passive with modal — formal register.
    id: 'item.b2.gram.16',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'This form must ______ in black ink.',
    options: [
      { text: 'be completed', misconception: null },
      { text: 'complete', misconception: 'complete is active, but the form receives the action' },
      { text: 'completed', misconception: 'completed alone after must is missing the passive auxiliary be' },
      { text: 'be completing', misconception: 'be completing is continuous passive, but this is an instruction' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # "It is said that" — impersonal passive.
    id: 'item.b2.gram.17',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'It ______ that the company is planning to relocate.',
    options: [
      { text: 'is said', misconception: null },
      { text: 'says', misconception: 'says is active — the impersonal construction needs it is said' },
      { text: 'said', misconception: 'said alone is past simple active, not the impersonal passive' },
      { text: 'is saying', misconception: 'is saying is active continuous, not the impersonal passive' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # Get + past participle — informal passive.
    id: 'item.b2.gram.18',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'Be careful or you\'ll ______ hurt.',
    options: [
      { text: 'get', misconception: null },
      { text: 'be', misconception: 'be is formal passive — get is used in informal warnings about accidents' },
      { text: 'have', misconception: 'have + past participle means arrange for someone to do it, not receive harm' },
      { text: 'become', misconception: 'become is a linking verb for states, not used for passive constructions' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },

  // # ── gram.b2.reported_speech (items 07–09, 19–26) ────────────────
  {
    id: 'item.b2.gram.07',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'She said she ______ tired.',
    options: [
      { text: 'is', misconception: 'in reported speech, present tense shifts to past tense' },
      { text: 'was', misconception: null },
      { text: 'be', misconception: 'be is the infinitive, not used in reported speech' },
      { text: 'has been', misconception: 'has been is present perfect, but said triggers tense backshift' },
    ],
    correctIndex: 1,
    difficulty: 0.45,
  },
  {
    id: 'item.b2.gram.08',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'He told me he ______ to the meeting the day before.',
    options: [
      { text: 'goes', misconception: 'goes is present tense; reported speech needs tense backshift' },
      { text: 'went', misconception: 'went is past simple, but the day before indicates a further shift' },
      { text: 'had gone', misconception: null },
      { text: 'will go', misconception: 'will go is future, but the event was in the past' },
    ],
    correctIndex: 2,
    difficulty: 0.52,
  },
  {
    id: 'item.b2.gram.09',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'The teacher asked the students ______ their homework.',
    options: [
      { text: 'to submit', misconception: null },
      { text: 'submit', misconception: 'ask someone requires the to-infinitive form' },
      { text: 'submitting', misconception: 'ask someone does not take the -ing form' },
      { text: 'that submit', misconception: 'that submit is not grammatically correct after asked' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Reported question — word order change.
    id: 'item.b2.gram.19',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'She asked me where I ______.',
    options: [
      { text: 'lived', misconception: null },
      { text: 'did live', misconception: 'reported questions use statement word order, not question inversion' },
      { text: 'do live', misconception: 'do live is present with emphasis; reported speech needs past tense' },
      { text: 'live', misconception: 'live is present tense; after asked (past), tense backshift is needed' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Reported yes/no question — if/whether.
    id: 'item.b2.gram.20',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'He asked me ______ I had finished the report.',
    options: [
      { text: 'whether', misconception: null },
      { text: 'that', misconception: 'that introduces reported statements, not reported yes/no questions' },
      { text: 'what', misconception: 'what introduces reported wh-questions, not yes/no questions' },
      { text: 'did', misconception: 'did is for direct questions; reported questions use if/whether + statement order' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Reported command — advise + object + to infinitive.
    id: 'item.b2.gram.21',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'The doctor advised him ______ smoking.',
    options: [
      { text: 'to stop', misconception: null },
      { text: 'stop', misconception: 'advise someone requires the to-infinitive, not the bare form' },
      { text: 'stopping', misconception: 'advise someone does not take the -ing form directly' },
      { text: 'that stop', misconception: 'that stop is not a valid construction after advise + object' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Time expression changes in reported speech.
    id: 'item.b2.gram.22',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: '"I\'ll call you tomorrow," she said. → She said she would call me ______.',
    options: [
      { text: 'the next day', misconception: null },
      { text: 'tomorrow', misconception: 'tomorrow shifts to the next day/the following day in reported speech' },
      { text: 'yesterday', misconception: 'yesterday is the opposite direction — tomorrow becomes the next day' },
      { text: 'today', misconception: 'today shifts to that day, not used for tomorrow' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },

  // # ── lex.b2.abstract_concepts (items lex.01–08) ──────────────────
  {
    id: 'item.b2.lex.01',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The government needs to address the growing ______ between rich and poor.',
    options: [
      { text: 'inequality', misconception: null },
      { text: 'difference', misconception: 'difference is too general; inequality specifically refers to unfair disparity' },
      { text: 'distance', misconception: 'distance refers to physical or emotional space, not social disparity' },
      { text: 'argument', misconception: 'argument means a disagreement, not a gap in wealth' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    id: 'item.b2.lex.02',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The research findings ______ the theory that exercise improves mental health.',
    options: [
      { text: 'contradict', misconception: 'contradict means to oppose, but the sentence implies support' },
      { text: 'support', misconception: null },
      { text: 'ignore', misconception: 'ignore means to pay no attention, which is not what findings do' },
      { text: 'replace', misconception: 'findings do not replace theories, they test them' },
    ],
    correctIndex: 1,
    difficulty: 0.4,
  },
  {
    // # Abstract concept — sustainability.
    id: 'item.b2.lex.03',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The company has made a strong ______ to reducing its carbon footprint.',
    options: [
      { text: 'commitment', misconception: null },
      { text: 'opinion', misconception: 'an opinion is a viewpoint, not a pledge to take action' },
      { text: 'comment', misconception: 'a comment is a remark, not a pledge to change behaviour' },
      { text: 'complaint', misconception: 'a complaint is an expression of dissatisfaction, not a pledge' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },
  {
    // # Abstract concept — ethical dilemma.
    id: 'item.b2.lex.04',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'There is a growing ______ about the ethics of artificial intelligence.',
    options: [
      { text: 'debate', misconception: null },
      { text: 'doubt', misconception: 'doubt is personal uncertainty, not public discussion' },
      { text: 'delay', misconception: 'delay means postponement, not discussion of ethics' },
      { text: 'defeat', misconception: 'defeat means losing, not a discussion' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },
  {
    // # Abstract verb — imply vs infer.
    id: 'item.b2.lex.05',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The data ______ that younger people prefer online shopping.',
    options: [
      { text: 'suggests', misconception: null },
      { text: 'insists', misconception: 'insists means to demand — data cannot demand' },
      { text: 'refuses', misconception: 'refuses means to decline — data cannot refuse' },
      { text: 'apologises', misconception: 'apologises is a human action, data cannot apologise' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },
  {
    // # Abstract noun — perspective.
    id: 'item.b2.lex.06',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'Living abroad gave her a new ______ on life.',
    options: [
      { text: 'perspective', misconception: null },
      { text: 'prescription', misconception: 'prescription is a medical instruction, not a viewpoint' },
      { text: 'perception', misconception: 'perception is how you see things through senses — perspective is a broader viewpoint' },
      { text: 'permission', misconception: 'permission is authorisation, not a viewpoint' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },

  // # ── cando.b2.understand_argument (items read.01–06) ─────────────
  {
    id: 'item.b2.read.01',
    level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    stem: '"While some argue that remote work increases productivity, critics point out that it can lead to social isolation and blurred work-life boundaries." What is the critics\' concern?',
    options: [
      { text: 'Remote work is too expensive', misconception: 'cost is not mentioned in the passage' },
      { text: 'It may cause loneliness and unclear separation between work and personal life', misconception: null },
      { text: 'Remote work reduces productivity', misconception: 'the passage says some argue it increases productivity; critics raise different concerns' },
      { text: 'Technology is unreliable', misconception: 'technology reliability is not mentioned in the passage' },
    ],
    correctIndex: 1,
    difficulty: 0.45,
  },
  {
    id: 'item.b2.read.02',
    level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    stem: '"Proponents of nuclear energy emphasise its low carbon emissions, while opponents highlight the risks of radioactive waste and potential meltdowns." The word "proponents" is closest in meaning to:',
    options: [
      { text: 'Critics', misconception: 'critics are opponents, not proponents' },
      { text: 'Supporters', misconception: null },
      { text: 'Scientists', misconception: 'proponents means supporters, not necessarily scientists' },
      { text: 'Victims', misconception: 'victims are people harmed, unrelated to proponents' },
    ],
    correctIndex: 1,
    difficulty: 0.42,
  },
  {
    // # Reading argument — inferring author's position.
    id: 'item.b2.read.03',
    level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    stem: '"The author argues that renewable energy subsidies should be reduced because they distort market signals." This implies the author believes:',
    options: [
      { text: 'Market forces alone would lead to better energy decisions', misconception: null },
      { text: 'Renewable energy is too expensive to produce', misconception: 'confuses market distortion with production cost — the argument is about price signals' },
      { text: 'Governments should not be involved in energy policy', misconception: 'reducing subsidies is not the same as removing all government involvement' },
      { text: 'Fossil fuels should receive the same subsidies', misconception: 'the argument is against subsidies distorting markets, not for equal subsidies' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Identifying a counterargument.
    id: 'item.b2.read.04',
    level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    stem: '"Supporters of school uniforms claim they reduce bullying based on appearance. However, studies show bullying rates remain unchanged in schools that introduce uniforms." The second sentence serves to:',
    options: [
      { text: 'Challenge the supporters\' claim with evidence', misconception: null },
      { text: 'Support the argument for uniforms', misconception: 'the evidence contradicts the claim, it does not support it' },
      { text: 'Change the topic to bullying in general', misconception: 'the topic stays on uniforms and bullying, not a shift' },
      { text: 'Provide a solution to bullying', misconception: 'the sentence presents evidence, not a solution' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },

  // # ── cando.b2.understand_discussion (items listen.01–06) ──────────
  {
    id: 'item.b2.listen.01',
    level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    stem: 'In a discussion, Speaker A says: "I think universities should be free." Speaker B replies: "That\'s idealistic — who would fund the lecturers and facilities?" What is Speaker B doing?',
    options: [
      { text: 'Agreeing with Speaker A', misconception: 'Speaker B is raising a practical objection, not agreeing' },
      { text: 'Questioning the practicality of the idea', misconception: null },
      { text: 'Changing the topic', misconception: 'Speaker B is responding to the same topic, not changing it' },
      { text: 'Giving an example', misconception: 'Speaker B is raising a counter-question, not giving an example' },
    ],
    correctIndex: 1,
    difficulty: 0.48,
  },
  {
    id: 'item.b2.listen.02',
    level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    stem: 'A panellist says: "The data suggests a correlation, but we shouldn\'t confuse correlation with causation." What does the panellist mean?',
    options: [
      { text: 'The data is wrong', misconception: 'the panellist accepts the data but warns against wrong conclusions' },
      { text: 'Two things happening together does not mean one causes the other', misconception: null },
      { text: 'The research should be repeated', misconception: 'the panellist is clarifying interpretation, not requesting new research' },
      { text: 'Causation is more important than correlation', misconception: 'the point is about not confusing the two, not ranking them' },
    ],
    correctIndex: 1,
    difficulty: 0.52,
  },
  {
    // # Identifying concession in discussion.
    id: 'item.b2.listen.03',
    level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    stem: 'Speaker A says: "I admit that social media has some benefits for networking, but the mental health costs outweigh them." Speaker A is:',
    options: [
      { text: 'Acknowledging the other side before disagreeing', misconception: null },
      { text: 'Fully supporting social media', misconception: 'the speaker says the costs outweigh the benefits' },
      { text: 'Avoiding the topic', misconception: 'the speaker directly addresses the issue' },
      { text: 'Asking for more information', misconception: 'the speaker is making a statement, not asking a question' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },

  // # ── cando.b2.describe_data (items data.01–04) ───────────────────
  {
    // # Graph description — trend vocabulary.
    id: 'item.b2.data.01',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data'],
    stem: 'Which phrase best describes a line on a graph that goes up quickly?',
    options: [
      { text: 'A sharp increase', misconception: null },
      { text: 'A gradual decline', misconception: 'decline means going down, not up' },
      { text: 'A steady plateau', misconception: 'a plateau is flat, not going up' },
      { text: 'A slight fluctuation', misconception: 'fluctuation is up and down movement, not a consistent rise' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },
  {
    // # Data comparison language.
    id: 'item.b2.data.02',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data'],
    stem: '"Sales in Q1 were £2 million, ______ Q2 saw a rise to £3.5 million."',
    options: [
      { text: 'whereas', misconception: null },
      { text: 'because', misconception: 'because shows cause — the sentence compares two quarters, not cause and effect' },
      { text: 'so', misconception: 'so shows result, but the sentence is comparing two periods' },
      { text: 'unless', misconception: 'unless is a conditional, not a comparison connector' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    // # Approximation language for data.
    id: 'item.b2.data.03',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data'],
    stem: 'The chart shows that ______ 60% of respondents preferred online shopping.',
    options: [
      { text: 'approximately', misconception: null },
      { text: 'exactly', misconception: 'exactly implies precision, but the data may not be that precise' },
      { text: 'never', misconception: 'never is a negative frequency word, not related to data amounts' },
      { text: 'always', misconception: 'always is a frequency word, not used for describing percentages' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },

  // # ── cando.b2.write_essay (items essay.01–04) ────────────────────
  {
    // # Essay structure — thesis statement.
    id: 'item.b2.essay.01',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    stem: 'Which sentence works best as a thesis statement for an essay about social media?',
    options: [
      { text: 'While social media offers valuable connections, its impact on mental health requires urgent attention.', misconception: null },
      { text: 'Social media is everywhere.', misconception: 'this is a general observation, not a debatable thesis' },
      { text: 'I like using Instagram.', misconception: 'this is a personal preference, not an academic thesis' },
      { text: 'This essay is about social media.', misconception: 'this announces the topic but does not present a position' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Essay connectors — adding a contrasting point.
    id: 'item.b2.essay.02',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    stem: '"Public transport reduces pollution. ______, many people still prefer driving because of convenience."',
    options: [
      { text: 'Nevertheless', misconception: null },
      { text: 'Therefore', misconception: 'therefore shows result, but this sentence contrasts two points' },
      { text: 'Similarly', misconception: 'similarly shows agreement between points, but these points contrast' },
      { text: 'Moreover', misconception: 'moreover adds a supporting point, but this introduces a contrasting point' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Essay conclusion language.
    id: 'item.b2.essay.03',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    stem: 'Which phrase best begins a conclusion paragraph?',
    options: [
      { text: 'In conclusion', misconception: null },
      { text: 'Firstly', misconception: 'firstly is for the beginning of the essay body, not the conclusion' },
      { text: 'For example', misconception: 'for example introduces evidence in body paragraphs, not conclusions' },
      { text: 'On the one hand', misconception: 'on the one hand starts a balanced argument in the body, not a conclusion' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },

  // # ── cando.b2.give_detailed_account (items speak.01–03) ──────────
  {
    // # Narrative structure in speaking.
    id: 'item.b2.speak.01',
    level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account'],
    stem: 'When telling a story in detail, the best approach is to:',
    options: [
      { text: 'Set the scene, describe the events in order, and explain how you felt', misconception: null },
      { text: 'Say everything as fast as possible', misconception: 'speed does not help clarity or detail in storytelling' },
      { text: 'Only answer yes or no', misconception: 'yes/no answers do not give a detailed account' },
      { text: 'Repeat the same point three times', misconception: 'repetition without new detail does not constitute a detailed account' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },

  // # ── cando.b2.discuss_abstract (items discuss.01–03) ─────────────
  {
    // # Speculating about abstract topics.
    id: 'item.b2.discuss.01',
    level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    stem: '"What would happen if nobody had to work?" Which response discusses the topic most effectively?',
    options: [
      { text: 'I think people would initially enjoy the freedom, but eventually many would feel purposeless because work gives structure.', misconception: null },
      { text: 'I don\'t know.', misconception: 'this avoids the discussion entirely instead of speculating' },
      { text: 'I like my job.', misconception: 'this is a personal statement that does not address the hypothetical' },
      { text: 'Work is important.', misconception: 'this is a simple statement without reasoning or speculation' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },

  // # ── strat.ielts items (strat.01–04) ─────────────────────────────
  {
    // # IELTS time management strategy.
    id: 'item.b2.strat.01',
    level: 'B2', skill: 'general',
    nodeIds: ['strat.ielts.time_management'],
    stem: 'In IELTS Reading, you have 60 minutes for 3 passages and 40 questions. The best time strategy is:',
    options: [
      { text: 'Spend about 20 minutes on each passage, starting with the easiest', misconception: null },
      { text: 'Spend 40 minutes on the first passage to get full marks', misconception: 'spending 40 minutes on one passage leaves too little time for the other two' },
      { text: 'Read all passages first, then answer all questions', misconception: 'this wastes time because you will need to re-read each passage anyway' },
      { text: 'Skip the hardest questions and only answer the easy ones', misconception: 'skipping entire sections means losing marks unnecessarily' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    // # IELTS Writing Task 2 structure.
    id: 'item.b2.strat.02',
    level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    stem: 'For an IELTS Writing Task 2 essay, the best structure is:',
    options: [
      { text: 'Introduction with thesis, body paragraphs with topic sentences, and conclusion', misconception: null },
      { text: 'Write everything in one long paragraph', misconception: 'a single paragraph lacks organisation, which is a key marking criterion' },
      { text: 'Start with the conclusion, then explain why', misconception: 'starting with the conclusion removes the logical build-up expected in academic essays' },
      { text: 'Write only bullet points', misconception: 'IELTS essays require connected prose, not bullet points' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    // # IELTS Speaking Part 1 strategy.
    id: 'item.b2.strat.03',
    level: 'B2', skill: 'speaking',
    nodeIds: ['strat.ielts.part1_answers'],
    stem: 'In IELTS Speaking Part 1, "Do you like reading?" A good answer is:',
    options: [
      { text: 'Yes, I enjoy reading, especially novels. I usually read before bed because it helps me relax.', misconception: null },
      { text: 'Yes.', misconception: 'one-word answers do not demonstrate language range or fluency' },
      { text: 'Reading is an important activity that all humans should do for intellectual development.', misconception: 'this is too formal and rehearsed for Part 1 — it should be natural and personal' },
      { text: 'I don\'t understand the question.', misconception: 'this avoids answering rather than attempting a response' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },
  {
    // # IELTS Speaking Part 2 strategy.
    id: 'item.b2.strat.04',
    level: 'B2', skill: 'speaking',
    nodeIds: ['strat.ielts.part2_structure'],
    stem: 'For IELTS Speaking Part 2 (long turn), you have 1 minute to prepare. You should:',
    options: [
      { text: 'Note key points from the cue card and plan your structure', misconception: null },
      { text: 'Write a complete script and read it out', misconception: 'reading from a script sounds unnatural and wastes preparation time' },
      { text: 'Start speaking immediately without preparing', misconception: 'skipping preparation usually leads to disorganised speech and pauses' },
      { text: 'Memorise a pre-prepared answer about a different topic', misconception: 'rehearsed answers on wrong topics will not address the cue card' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },

  // # ── gram.b2.conditionals (items gram.23–24, 29, 31, 34–35) ─────────
  {
    // # Second conditional — subjunctive were.
    id: 'item.b2.gram.23',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'If I ______ you, I would accept the job offer.',
    options: [
      { text: 'were', misconception: null },
      { text: 'was', misconception: 'in formal English, the subjunctive were is used in second conditional, not was' },
      { text: 'am', misconception: 'am is present real, but the second conditional is unreal' },
      { text: 'would be', misconception: 'would be is for the result clause, not the if clause' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Third conditional — past perfect in if clause.
    id: 'item.b2.gram.24',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'If they ______ harder, they would have passed the exam.',
    options: [
      { text: 'had studied', misconception: null },
      { text: 'studied', misconception: 'past simple is second conditional, but the result clause has would have passed = third' },
      { text: 'would study', misconception: 'would goes in the result clause, not the if clause' },
      { text: 'have studied', misconception: 'present perfect is not used in the if clause of third conditional' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Present perfect passive — singular subject.
    id: 'item.b2.gram.25',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'The meeting ______ postponed until next week.',
    options: [
      { text: 'has been', misconception: null },
      { text: 'has', misconception: 'has alone is active — the meeting received the action of postponing' },
      { text: 'is being', misconception: 'is being is present continuous passive, implying it is being postponed right now' },
      { text: 'have been', misconception: 'have been is for plural subjects, but the meeting is singular' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Past simple passive — yesterday time marker.
    id: 'item.b2.gram.26',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'The package ______ delivered yesterday.',
    options: [
      { text: 'was', misconception: null },
      { text: 'is', misconception: 'is is present tense, but yesterday indicates past' },
      { text: 'has', misconception: 'has alone is active, not passive' },
      { text: 'were', misconception: 'were is for plural subjects, but the package is singular' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    // # Reported speech — will shifts to would.
    id: 'item.b2.gram.27',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'She said that she ______ to call me back.',
    options: [
      { text: 'would try', misconception: null },
      { text: 'will try', misconception: 'will shifts to would in reported speech after said' },
      { text: 'tries', misconception: 'present shifts to past in reported speech' },
      { text: 'is trying', misconception: 'present continuous becomes past continuous in reported speech' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Reported commands — negative infinitive.
    id: 'item.b2.gram.28',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: '"Don\'t touch that!" she told the children. → She told the children ______ that.',
    options: [
      { text: 'not to touch', misconception: null },
      { text: 'don\'t touch', misconception: 'direct speech is not used in reported commands' },
      { text: 'to not touch', misconception: 'the negative infinitive in reported commands is not to + verb' },
      { text: 'didn\'t touch', misconception: 'past simple is not used for reported commands' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Suppose + unreal condition — past tense.
    id: 'item.b2.gram.29',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'Suppose you ______ a million pounds, what would you do?',
    options: [
      { text: 'won', misconception: null },
      { text: 'win', misconception: 'present tense, but suppose + unreal condition uses past tense' },
      { text: 'had won', misconception: 'past perfect is for third conditional about past, not present unreal' },
      { text: 'would win', misconception: 'would is for the result clause, not the if/suppose clause' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Past passive — plural subject agreement.
    id: 'item.b2.gram.30',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'Three people ______ injured in the accident.',
    options: [
      { text: 'were', misconception: null },
      { text: 'was', misconception: 'was is singular, but three people is plural' },
      { text: 'have', misconception: 'have alone is active voice' },
      { text: 'are', misconception: 'are is present, but the accident already happened' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    // # If only + past perfect — regret about past.
    id: 'item.b2.gram.31',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'If only I ______ what to say at that moment.',
    options: [
      { text: 'had known', misconception: null },
      { text: 'knew', misconception: 'knew is for present unreal wishes, but at that moment refers to a past event' },
      { text: 'know', misconception: 'present tense, but the wish is about a past moment' },
      { text: 'would know', misconception: 'would is not used in the if only clause' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Reported questions — backshift and statement order.
    id: 'item.b2.gram.32',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    stem: 'He asked me what time the shop ______.',
    options: [
      { text: 'closed', misconception: null },
      { text: 'closes', misconception: 'present tense needs to backshift to past after asked' },
      { text: 'did close', misconception: 'did + base is question form, but reported questions use statement order' },
      { text: 'close', misconception: 'base form without backshift is incorrect after asked' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },
  {
    // # Present continuous passive — at the moment.
    id: 'item.b2.gram.33',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    stem: 'A new policy ______ being discussed at the moment.',
    options: [
      { text: 'is', misconception: null },
      { text: 'was', misconception: 'was is past, but at the moment indicates now' },
      { text: 'has', misconception: 'has being is not a valid tense form' },
      { text: 'are', misconception: 'are is plural, but a new policy is singular' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },
  {
    // # Second conditional — would in question form.
    id: 'item.b2.gram.34',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'What ______ you do if you lost your passport abroad?',
    options: [
      { text: 'would', misconception: null },
      { text: 'will', misconception: 'will is for real conditions, but this is hypothetical' },
      { text: 'do', misconception: 'present tense, but this is an unreal hypothetical' },
      { text: 'did', misconception: 'did is for past questions, not unreal present hypotheticals' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },

  // # ── lex.b2.abstract_concepts (items lex.07–12) ─────────────────────
  {
    // # Concerns — worries about safety.
    id: 'item.b2.lex.07',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The report raised serious ______ about the safety of the building.',
    options: [
      { text: 'concerns', misconception: null },
      { text: 'concerts', misconception: 'concerts are musical performances, not worries' },
      { text: 'contacts', misconception: 'contacts are people you know, not worries' },
      { text: 'contents', misconception: 'contents are what is inside something, not worries' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },
  {
    // # Impact — profound effect on understanding.
    id: 'item.b2.lex.08',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The discovery had a profound ______ on our understanding of the disease.',
    options: [
      { text: 'impact', misconception: null },
      { text: 'import', misconception: 'import means bringing goods in, not effect' },
      { text: 'impulse', misconception: 'impulse is a sudden urge, not a lasting effect' },
      { text: 'image', misconception: 'image is a picture or perception, not an effect' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },
  {
    // # Correlation — statistical relationship.
    id: 'item.b2.lex.09',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'There is a strong ______ between diet and health outcomes.',
    options: [
      { text: 'correlation', misconception: null },
      { text: 'collection', misconception: 'collection is a group of items, not a relationship' },
      { text: 'celebration', misconception: 'celebration is a festive event, not a statistical relationship' },
      { text: 'circulation', misconception: 'circulation is movement in a circle, not a statistical relationship' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Adapt vs adopt — confusable verbs.
    id: 'item.b2.lex.10',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The company needs to ______ its strategy to remain competitive.',
    options: [
      { text: 'adapt', misconception: null },
      { text: 'adopt', misconception: 'adopt means to take on something new, not modify existing strategy' },
      { text: 'adept', misconception: 'adept is an adjective meaning skilled, not a verb' },
      { text: 'add', misconception: 'add means to include more, not to change/adjust' },
    ],
    correctIndex: 0,
    difficulty: 0.38,
  },
  {
    // # Contradictory — not mutually exclusive.
    id: 'item.b2.lex.11',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The two theories are not ______ — they can both be true at the same time.',
    options: [
      { text: 'contradictory', misconception: null },
      { text: 'contemporary', misconception: 'contemporary means of the same time period, not opposing' },
      { text: 'confidential', misconception: 'confidential means secret, not opposing' },
      { text: 'consecutive', misconception: 'consecutive means one after another, not opposing' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },
  {
    // # Stages — phases of development.
    id: 'item.b2.lex.12',
    level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    stem: 'The project is still in its early ______ and may change significantly.',
    options: [
      { text: 'stages', misconception: null },
      { text: 'states', misconception: 'states are conditions or countries, not phases of development' },
      { text: 'stories', misconception: 'stories are narratives, not phases' },
      { text: 'stations', misconception: 'stations are stops or buildings, not development phases' },
    ],
    correctIndex: 0,
    difficulty: 0.35,
  },

  // # ── cando.b2.understand_argument (items read.05–07) ─────────────────
  {
    // # Author criticism — identifying what is being criticised.
    id: 'item.b2.read.05',
    level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    stem: '"The author contends that standardised testing fails to measure creativity, critical thinking, or collaborative skills — precisely the competencies most valued in the modern workplace." The author\'s main criticism is that standardised tests:',
    options: [
      { text: 'Do not assess the skills that employers actually need', misconception: null },
      { text: 'Are too difficult for students', misconception: 'difficulty is not the criticism — it is about what is measured' },
      { text: 'Cost too much money to administer', misconception: 'cost is not mentioned' },
      { text: 'Should include more multiple-choice questions', misconception: 'the criticism is about what is tested, not question format' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Balanced argument — recognising two viewpoints.
    id: 'item.b2.read.06',
    level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    stem: '"Opponents of the minimum wage increase argue it will lead to job losses, while supporters maintain it will reduce poverty and boost consumer spending." The text presents:',
    options: [
      { text: 'Two opposing viewpoints without taking a side', misconception: null },
      { text: 'Only the arguments against a minimum wage increase', misconception: 'both sides are presented' },
      { text: 'Scientific evidence for one position', misconception: 'no scientific evidence is cited' },
      { text: 'The author\'s personal opinion', misconception: 'the text is balanced, presenting both sides neutrally' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },
  {
    // # Vocabulary in context — catastrophic.
    id: 'item.b2.read.07',
    level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    stem: '"The decline in bee populations threatens global food security, as bees pollinate approximately 75% of food crops. Without urgent action, the consequences could be catastrophic." The word "catastrophic" suggests the consequences would be:',
    options: [
      { text: 'Extremely severe and widespread', misconception: null },
      { text: 'Minor and temporary', misconception: 'catastrophic means the opposite of minor' },
      { text: 'Limited to one region', misconception: 'catastrophic implies widespread, not localised' },
      { text: 'Easily reversible', misconception: 'catastrophic implies damage that is very difficult to undo' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },

  // # ── cando.b2.understand_discussion (items listen.04–06) ─────────────
  {
    // # Discourse function — push back = partial disagreement.
    id: 'item.b2.listen.04',
    level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    stem: 'In a podcast, the host says: "That\'s a fair point, but I\'d push back on the assumption that..." The host is:',
    options: [
      { text: 'Acknowledging the guest\'s point before challenging part of it', misconception: null },
      { text: 'Completely agreeing with the guest', misconception: 'push back means to challenge, not agree' },
      { text: 'Changing the subject', misconception: 'the host is responding to the same point' },
      { text: 'Asking the guest to repeat themselves', misconception: 'fair point shows understanding, not a request to repeat' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Vocabulary in context — holistic.
    id: 'item.b2.listen.05',
    level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    stem: 'A speaker says: "We need to take a holistic approach to this problem rather than treating the symptoms." "Holistic" here means:',
    options: [
      { text: 'Considering the whole system rather than individual parts', misconception: null },
      { text: 'Focusing on one specific detail', misconception: 'holistic is the opposite — it means the whole' },
      { text: 'Using traditional medicine', misconception: 'holistic in this context means comprehensive, not medical' },
      { text: 'Ignoring the problem entirely', misconception: 'holistic means addressing it fully, not ignoring it' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Discourse function — using another speaker's point as support.
    id: 'item.b2.listen.06',
    level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    stem: 'Speaker A: "The evidence is inconclusive." Speaker B: "Exactly my point — we shouldn\'t be making policy decisions based on incomplete data." Speaker B is:',
    options: [
      { text: 'Using Speaker A\'s statement to support their own argument', misconception: null },
      { text: 'Disagreeing with Speaker A', misconception: 'Speaker B says exactly my point, showing agreement' },
      { text: 'Presenting new evidence', misconception: 'Speaker B does not introduce new evidence' },
      { text: 'Asking for more research', misconception: 'Speaker B is making a point about policy, not requesting research' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },

  // # ── cando.b2.describe_data (item data.04) ──────────────────────────
  {
    // # Data description — steady vs sudden.
    id: 'item.b2.data.04',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data'],
    stem: '"The graph shows a ______ decline in newspaper readership from 2010 to 2020."',
    options: [
      { text: 'steady', misconception: null },
      { text: 'sudden', misconception: 'sudden means quick and unexpected, but 10 years is gradual' },
      { text: 'static', misconception: 'static means unchanging, which contradicts decline' },
      { text: 'stagnant', misconception: 'stagnant means not moving, contradicting the trend of decline' },
    ],
    correctIndex: 0,
    difficulty: 0.4,
  },

  // # ── cando.b2.write_essay (items essay.04–05) ───────────────────────
  {
    // # Counterargument — recognising the opposing view pattern.
    id: 'item.b2.essay.04',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    stem: '"Some people believe that technology makes us less creative. ______." Which sentence best follows this as a counterargument?',
    options: [
      { text: 'Others, however, argue that digital tools have opened up new avenues for artistic expression.', misconception: null },
      { text: 'I agree with this view completely.', misconception: 'this is agreement, not a counterargument' },
      { text: 'Technology is very popular.', misconception: 'this is a fact, not a counterargument' },
      { text: 'Some people don\'t use technology.', misconception: 'this is tangential, not a direct counterargument' },
    ],
    correctIndex: 0,
    difficulty: 0.48,
  },
  {
    // # Topic sentence — clear and specific opening for a body paragraph.
    id: 'item.b2.essay.05',
    level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    stem: 'Which of these is the best topic sentence for a body paragraph about the benefits of exercise?',
    options: [
      { text: 'Regular physical activity has been shown to significantly improve both mental and physical health.', misconception: null },
      { text: 'I like running.', misconception: 'too personal and informal for an academic essay' },
      { text: 'Exercise.', misconception: 'a single word is not a topic sentence' },
      { text: 'There are many things in the world.', misconception: 'too vague and unrelated to exercise specifically' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },

  // # ── cando.b2.give_detailed_account (item speak.02) ─────────────────
  {
    // # Detailed spoken account — memorable journey.
    id: 'item.b2.speak.02',
    level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account'],
    stem: 'You are asked to describe a memorable journey. Which answer gives the best detailed account?',
    options: [
      { text: 'Last year, I took a train through the Swiss Alps. The scenery was breathtaking — snow-capped mountains and crystal-clear lakes. What made it special was the unexpected stop at a tiny village where we tried local cheese.', misconception: null },
      { text: 'I went somewhere nice.', misconception: 'too vague — no detail about where, when, or what' },
      { text: 'Trains are good for travelling.', misconception: 'a general statement, not a personal account' },
      { text: 'I don\'t remember my journeys.', misconception: 'avoids the task entirely' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },

  // # ── cando.b2.discuss_abstract (items discuss.02–03) ────────────────
  {
    // # Abstract discussion — money and happiness with nuance.
    id: 'item.b2.discuss.02',
    level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    stem: '"Do you think money brings happiness?" Which response discusses the topic most effectively?',
    options: [
      { text: 'To a certain extent, yes — financial security reduces stress. However, beyond a certain point, research suggests that relationships and purpose contribute more to wellbeing than wealth.', misconception: null },
      { text: 'Yes.', misconception: 'too brief for a discussion' },
      { text: 'Money is important.', misconception: 'a simple statement without reasoning or nuance' },
      { text: 'I don\'t think about money.', misconception: 'avoids engaging with the question' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # Abstract discussion — evaluating both sides of city vs countryside.
    id: 'item.b2.discuss.03',
    level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    stem: '"Is it better to live in a big city or the countryside?" Which response best evaluates both sides?',
    options: [
      { text: 'Cities offer more career opportunities and cultural activities, but the countryside provides a quieter, healthier lifestyle. Ultimately, it depends on individual priorities.', misconception: null },
      { text: 'Cities are better.', misconception: 'one-sided without reasoning' },
      { text: 'I live in a city.', misconception: 'personal fact, not an evaluation of both sides' },
      { text: 'The countryside is boring.', misconception: 'subjective and one-sided' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },

  // # ── strat.ielts (items strat.05–06) ────────────────────────────────
  {
    // # IELTS Writing Task 1 — overview first.
    id: 'item.b2.strat.05',
    level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    stem: 'In IELTS Writing Task 1, the first thing you should write after the introduction is:',
    options: [
      { text: 'An overview of the main trends or features', misconception: null },
      { text: 'A detailed description of every data point', misconception: 'the overview comes first, then selective details' },
      { text: 'Your personal opinion', misconception: 'Task 1 requires description, not personal opinion' },
      { text: 'A conclusion with recommendations', misconception: 'Task 1 does not require recommendations' },
    ],
    correctIndex: 0,
    difficulty: 0.42,
  },
  {
    // # IELTS Speaking Part 3 — extending answers.
    id: 'item.b2.strat.06',
    level: 'B2', skill: 'speaking',
    nodeIds: ['strat.ielts.part3_extend'],
    stem: 'In IELTS Speaking Part 3, the examiner asks: "Why do people enjoy travelling?" The best strategy is to:',
    options: [
      { text: 'Give a general answer, then develop it with examples, reasons, and a personal perspective', misconception: null },
      { text: 'Say "I don\'t know" and wait for the next question', misconception: 'this shows lack of engagement and loses marks' },
      { text: 'Give a one-word answer like "fun"', misconception: 'one-word answers do not demonstrate language range' },
      { text: 'Recite a memorised speech about tourism', misconception: 'memorised answers sound unnatural and may not fit the question' },
    ],
    correctIndex: 0,
    difficulty: 0.45,
  },

  // # ── gram.b2.conditionals (item gram.35) ────────────────────────────
  {
    // # I'd rather + subject + past tense.
    id: 'item.b2.gram.35',
    level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    stem: 'I\'d rather you ______ me before visiting.',
    options: [
      { text: 'called', misconception: null },
      { text: 'call', misconception: 'I\'d rather + subject uses past tense for present/future meaning' },
      { text: 'calling', misconception: 'ing form is not used after I\'d rather + subject' },
      { text: 'will call', misconception: 'will is not used after I\'d rather + subject — past tense is required' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
]

// ─── C1 items (60) ─────────────────────────────────────────────────────
// # Advanced items: abstract text comprehension, academic lectures,
// # inversion after negative adverbials, cleft sentences, academic
// # vocabulary, complex argument analysis.

const C1_ITEMS: SeedItem[] = [
  // # ── cando.c1.understand_abstract_text (items read.01–12) ─────────
  {
    id: 'item.c1.read.01',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The commodification of education has transformed students into consumers, prioritising employability metrics over intellectual curiosity." The author\'s tone is best described as:',
    options: [
      { text: 'Enthusiastic', misconception: 'the language (commodification, transformed) is negative, not enthusiastic' },
      { text: 'Critical', misconception: null },
      { text: 'Neutral', misconception: 'words like commodification carry a negative connotation, so the tone is not neutral' },
      { text: 'Humorous', misconception: 'there is no humour in this passage' },
    ],
    correctIndex: 1,
    difficulty: 0.6,
  },
  {
    id: 'item.c1.read.02',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The paradox of choice suggests that an abundance of options can lead to decision paralysis rather than satisfaction." What does "decision paralysis" mean in this context?',
    options: [
      { text: 'Making decisions very quickly', misconception: 'paralysis means inability to act, not speed' },
      { text: 'Being unable to choose because there are too many options', misconception: null },
      { text: 'Feeling satisfied with all options', misconception: 'the passage says it leads to paralysis rather than satisfaction' },
      { text: 'Preferring not to have choices', misconception: 'the passage describes an effect of too many choices, not a preference' },
    ],
    correctIndex: 1,
    difficulty: 0.58,
  },
  {
    id: 'item.c1.read.03',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"Cognitive dissonance — the discomfort of holding contradictory beliefs — often leads individuals to rationalise their behaviour rather than change it." The function of the dashes is to:',
    options: [
      { text: 'Introduce a contrasting idea', misconception: 'the dashes define the term, they do not introduce a contrast' },
      { text: 'Provide a definition of the preceding term', misconception: null },
      { text: 'Signal a change of topic', misconception: 'the content between dashes elaborates on the same concept' },
      { text: 'Add a personal opinion', misconception: 'the definition is factual, not an opinion' },
    ],
    correctIndex: 1,
    difficulty: 0.62,
  },
  {
    id: 'item.c1.read.04',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The author\'s argument rests on a false dichotomy: either we embrace unrestricted technological progress or we stagnate. This ignores the possibility of regulated innovation." The critic is accusing the author of:',
    options: [
      { text: 'Presenting only two extreme options when more exist', misconception: null },
      { text: 'Being too optimistic about technology', misconception: 'the criticism is about logical fallacy, not optimism' },
      { text: 'Ignoring scientific evidence', misconception: 'the criticism is about false dichotomy, not lack of evidence' },
      { text: 'Contradicting themselves', misconception: 'the accusation is false dichotomy, not self-contradiction' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    id: 'item.c1.read.05',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The ubiquity of smartphones has engendered a culture of perpetual connectivity, eroding the boundaries between public and private spheres." The word "engendered" most closely means:',
    options: [
      { text: 'Prevented', misconception: 'engendered means created, the opposite of prevented' },
      { text: 'Given rise to', misconception: null },
      { text: 'Endangered', misconception: 'endangered means put at risk — it sounds similar but has a different meaning' },
      { text: 'Simplified', misconception: 'simplified means made easier, not created' },
    ],
    correctIndex: 1,
    difficulty: 0.6,
  },
  {
    // # Hedging language recognition.
    id: 'item.c1.read.06',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"It could be argued that the decline in biodiversity is largely attributable to human activity." The phrase "it could be argued" functions as:',
    options: [
      { text: 'A hedge that presents the claim as debatable rather than absolute', misconception: null },
      { text: 'A statement of proven fact', misconception: 'could be argued is tentative, not asserting proven fact' },
      { text: 'An expression of personal doubt', misconception: 'it is an academic hedging device, not personal doubt' },
      { text: 'A request for the reader to argue', misconception: 'it presents a position cautiously, it does not ask the reader to argue' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Identifying assumptions in arguments.
    id: 'item.c1.read.07',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"Since economic growth correlates with higher energy consumption, transitioning to renewables will inevitably slow GDP growth." The hidden assumption is that:',
    options: [
      { text: 'Renewable energy cannot sustain the same level of output as fossil fuels', misconception: null },
      { text: 'GDP growth is undesirable', misconception: 'the author treats GDP growth as desirable, not undesirable' },
      { text: 'Renewable energy is cheaper than fossil fuels', misconception: 'the passage implies renewables are limiting, not cheaper' },
      { text: 'All countries use the same amount of energy', misconception: 'the passage does not make claims about equal energy use' },
    ],
    correctIndex: 0,
    difficulty: 0.68,
  },
  {
    // # Tone and register identification.
    id: 'item.c1.read.08',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The government\'s latest policy initiative is, to put it charitably, misguided." The phrase "to put it charitably" suggests the author:',
    options: [
      { text: 'Thinks the policy is even worse than misguided', misconception: null },
      { text: 'Is being generous in their praise', misconception: 'charitably here means being kind in criticism, not in praise' },
      { text: 'Supports the policy with reservations', misconception: 'misguided is clearly negative — the author opposes the policy' },
      { text: 'Is quoting someone else', misconception: 'the phrase is the author\'s own hedging, not a quotation' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },

  // # ── cando.c1.understand_lecture (items listen.01–08) ─────────────
  {
    id: 'item.c1.listen.01',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A professor says: "While Keynesian economics dominated post-war policy, the stagflation of the 1970s fundamentally undermined its prescriptions, paving the way for monetarist approaches." What caused the shift away from Keynesian economics?',
    options: [
      { text: 'The end of World War II', misconception: 'the post-war period is when Keynesian economics was dominant, not when it declined' },
      { text: 'The economic conditions of the 1970s that Keynesian theory could not explain', misconception: null },
      { text: 'The popularity of monetarism in universities', misconception: 'the passage says stagflation paved the way, not academic popularity' },
      { text: 'Government spending cuts', misconception: 'government spending is not mentioned as the cause of the shift' },
    ],
    correctIndex: 1,
    difficulty: 0.65,
  },
  {
    id: 'item.c1.listen.02',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A lecturer explains: "Epigenetics challenges the nature-versus-nurture dichotomy by demonstrating that environmental factors can alter gene expression without changing the DNA sequence itself." The main point is that:',
    options: [
      { text: 'DNA can be permanently changed by the environment', misconception: 'the passage says gene expression changes, not the DNA sequence' },
      { text: 'Nature and nurture interact in ways that blur the traditional divide', misconception: null },
      { text: 'Nurture is more important than nature', misconception: 'the passage says the dichotomy is challenged, not that nurture wins' },
      { text: 'Genetics has no influence on behaviour', misconception: 'the passage does not dismiss genetics, it shows interaction' },
    ],
    correctIndex: 1,
    difficulty: 0.68,
  },
  {
    id: 'item.c1.listen.03',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A researcher states: "The replication crisis has prompted a fundamental reassessment of statistical significance thresholds, with some advocating for a shift from p < 0.05 to p < 0.005." The purpose of the proposed change is to:',
    options: [
      { text: 'Make research easier to publish', misconception: 'a stricter threshold makes publication harder, not easier' },
      { text: 'Reduce the likelihood of false positive results', misconception: null },
      { text: 'Eliminate the need for statistics in research', misconception: 'the proposal refines the threshold, not removes statistics' },
      { text: 'Speed up the peer review process', misconception: 'the change is about reliability, not review speed' },
    ],
    correctIndex: 1,
    difficulty: 0.7,
  },
  {
    // # Following an extended argument in a lecture.
    id: 'item.c1.listen.04',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A lecturer says: "The prisoner\'s dilemma illustrates why rational individual choices can lead to collectively irrational outcomes." This means:',
    options: [
      { text: 'People acting in self-interest can produce a worse result for everyone', misconception: null },
      { text: 'Prisoners always make irrational decisions', misconception: 'the dilemma is a theoretical model, not about actual prisoners' },
      { text: 'Collective decisions are always better than individual ones', misconception: 'the dilemma shows the tension, not that collective is always better' },
      { text: 'Rational thinking should be avoided', misconception: 'the point is about unintended consequences, not avoiding rationality' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Understanding qualification in academic speech.
    id: 'item.c1.listen.05',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A professor states: "While the data is suggestive, it would be premature to draw definitive conclusions at this stage." The professor is:',
    options: [
      { text: 'Urging caution about interpreting the data too strongly', misconception: null },
      { text: 'Saying the data is wrong', misconception: 'suggestive means promising, not wrong' },
      { text: 'Dismissing the research entirely', misconception: 'premature means too early, not that the research is worthless' },
      { text: 'Recommending the study be published', misconception: 'the professor is cautioning, not recommending publication' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },

  // # ── gram.c1.inversion (items gram.01–08) ────────────────────────
  {
    // # Inversion after "never" — classic pattern.
    id: 'item.c1.gram.01',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Never ______ such a beautiful sunset.',
    options: [
      { text: 'have I seen', misconception: null },
      { text: 'I have seen', misconception: 'after never at the start, the subject and auxiliary must be inverted' },
      { text: 'I saw', misconception: 'past simple without inversion is wrong after fronted never' },
      { text: 'did I saw', misconception: 'did requires the base form (see), not the past form (saw)' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # Inversion after "rarely".
    id: 'item.c1.gram.02',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Rarely ______ so moved by a piece of music.',
    options: [
      { text: 'am I', misconception: null },
      { text: 'I am', misconception: 'rarely at the start triggers subject-auxiliary inversion' },
      { text: 'I be', misconception: 'be is the infinitive, not used as a conjugated form here' },
      { text: 'do I am', misconception: 'do cannot be used with be — be inverts directly' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Inversion after "not only...but also".
    id: 'item.c1.gram.03',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Not only ______ the exam, but she also won a scholarship.',
    options: [
      { text: 'did she pass', misconception: null },
      { text: 'she passed', misconception: 'not only at the start requires inversion — did + subject + base form' },
      { text: 'she did pass', misconception: 'the word order must be inverted: did she pass, not she did pass' },
      { text: 'has she pass', misconception: 'has requires the past participle (passed), not the base form' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Inversion after "hardly".
    id: 'item.c1.gram.04',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Hardly ______ home when the phone rang.',
    options: [
      { text: 'had I arrived', misconception: null },
      { text: 'I had arrived', misconception: 'hardly at the start triggers subject-auxiliary inversion' },
      { text: 'I arrived', misconception: 'hardly...when requires past perfect with inversion, not past simple' },
      { text: 'did I arrived', misconception: 'did requires the base form (arrive), not the past form (arrived)' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Inversion after "seldom".
    id: 'item.c1.gram.05',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Seldom ______ such dedication from a junior employee.',
    options: [
      { text: 'do we see', misconception: null },
      { text: 'we see', misconception: 'seldom at the start triggers inversion — auxiliary before subject' },
      { text: 'we do see', misconception: 'the auxiliary must come before the subject, not after' },
      { text: 'are we seeing', misconception: 'present continuous is not used for habitual observations with seldom' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # No sooner...than — double inversion pattern.
    id: 'item.c1.gram.06',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'No sooner ______ the door than the alarm went off.',
    options: [
      { text: 'had she opened', misconception: null },
      { text: 'she had opened', misconception: 'no sooner at the start triggers inversion — had before she' },
      { text: 'she opened', misconception: 'no sooner...than requires past perfect with inversion' },
      { text: 'did she opened', misconception: 'did requires the base form (open), not the past form (opened)' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },

  // # ── gram.c1.cleft_sentences (items cleft.01–06) ──────────────────
  {
    // # It-cleft for emphasis.
    id: 'item.c1.cleft.01',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: '______ the manager who made the final decision.',
    options: [
      { text: 'It was', misconception: null },
      { text: 'There was', misconception: 'there was introduces existence, not emphasis on who did something' },
      { text: 'He was', misconception: 'he was is not the cleft structure — it was...who emphasises the agent' },
      { text: 'That was', misconception: 'the it-cleft pattern requires it was, not that was' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Wh-cleft for emphasis.
    id: 'item.c1.cleft.02',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: '______ we need is more funding for research.',
    options: [
      { text: 'What', misconception: null },
      { text: 'That', misconception: 'that introduces a relative clause, not the wh-cleft emphasis structure' },
      { text: 'Which', misconception: 'which introduces a choice, but what introduces the emphasised need' },
      { text: 'It', misconception: 'it-cleft has a different structure: it is...that, not it + we need' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # It-cleft emphasising time.
    id: 'item.c1.cleft.03',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: 'It was in 2008 ______ the financial crisis began.',
    options: [
      { text: 'that', misconception: null },
      { text: 'when', misconception: 'when is used in relative clauses for time, but the cleft structure uses that' },
      { text: 'which', misconception: 'which refers to things, not time in a cleft structure' },
      { text: 'where', misconception: 'where refers to place, not time' },
    ],
    correctIndex: 0,
    difficulty: 0.58,
  },
  {
    // # Wh-cleft with "what...did was".
    id: 'item.c1.cleft.04',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: 'What she did ______ resign without notice.',
    options: [
      { text: 'was', misconception: null },
      { text: 'is', misconception: 'the action is past (did), so the linking verb should be past (was)' },
      { text: 'has', misconception: 'has does not link in this cleft structure — was is needed' },
      { text: 'were', misconception: 'were is plural, but the subject (what she did) is singular' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # It-cleft emphasising reason.
    id: 'item.c1.cleft.05',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: 'It was because of the bad weather ______ the event was cancelled.',
    options: [
      { text: 'that', misconception: null },
      { text: 'why', misconception: 'why is used in cleft sentences with the reason why, not after because of' },
      { text: 'which', misconception: 'which refers to things, not reasons in a cleft structure' },
      { text: 'so', misconception: 'so shows result, but the cleft structure requires that' },
    ],
    correctIndex: 0,
    difficulty: 0.58,
  },

  // # ── lex.c1.academic_vocabulary (items lex.01–10) ─────────────────
  {
    id: 'item.c1.lex.01',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The CEO\'s decision to restructure was met with considerable ______ from employees who feared redundancies.',
    options: [
      { text: 'ambivalence', misconception: 'ambivalence means mixed feelings, but the employees\' reaction is clearly negative' },
      { text: 'trepidation', misconception: null },
      { text: 'indifference', misconception: 'indifference means lack of concern, but the employees clearly cared' },
      { text: 'elation', misconception: 'elation means great happiness, the opposite of fearing redundancies' },
    ],
    correctIndex: 1,
    difficulty: 0.62,
  },
  {
    id: 'item.c1.lex.02',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The politician\'s speech was criticised for its ______ — it sounded impressive but said very little of substance.',
    options: [
      { text: 'brevity', misconception: 'brevity means shortness; the criticism is about lack of substance, not length' },
      { text: 'rhetoric', misconception: null },
      { text: 'sincerity', misconception: 'sincerity means genuineness, the opposite of the criticism' },
      { text: 'clarity', misconception: 'clarity means clearness; the criticism is about style over substance' },
    ],
    correctIndex: 1,
    difficulty: 0.6,
  },
  {
    // # Academic verb — undermine.
    id: 'item.c1.lex.03',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The new evidence could ______ the entire theory.',
    options: [
      { text: 'undermine', misconception: null },
      { text: 'undertake', misconception: 'undertake means to begin a task, not to weaken something' },
      { text: 'undergo', misconception: 'undergo means to experience, not to weaken' },
      { text: 'underestimate', misconception: 'underestimate means to judge as less than actual, not to weaken' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Academic noun — implications.
    id: 'item.c1.lex.04',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The study has significant ______ for future climate policy.',
    options: [
      { text: 'implications', misconception: null },
      { text: 'applications', misconception: 'applications are practical uses, not consequences or effects' },
      { text: 'complications', misconception: 'complications are difficulties, not broader consequences' },
      { text: 'duplications', misconception: 'duplications are copies, not consequences' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Academic adjective — unprecedented.
    id: 'item.c1.lex.05',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The pandemic caused an ______ disruption to global supply chains.',
    options: [
      { text: 'unprecedented', misconception: null },
      { text: 'unrelated', misconception: 'unrelated means not connected, not never-before-seen' },
      { text: 'unofficial', misconception: 'unofficial means not formally authorised, not extraordinary' },
      { text: 'undecided', misconception: 'undecided means not yet determined, not extraordinary' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # Academic verb — corroborate.
    id: 'item.c1.lex.06',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The witness\'s testimony ______ the evidence found at the scene.',
    options: [
      { text: 'corroborated', misconception: null },
      { text: 'contradicted', misconception: 'contradicted means to oppose — the sentence implies agreement with evidence' },
      { text: 'confiscated', misconception: 'confiscated means to seize, not to confirm' },
      { text: 'consolidated', misconception: 'consolidated means to combine, not to confirm' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # Academic adjective — inherent.
    id: 'item.c1.lex.07',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'There is an ______ risk in any investment.',
    options: [
      { text: 'inherent', misconception: null },
      { text: 'inherited', misconception: 'inherited means received from parents/predecessors, not built-in' },
      { text: 'inhabited', misconception: 'inhabited means lived in, not an intrinsic quality' },
      { text: 'inhibited', misconception: 'inhibited means restrained, not a built-in characteristic' },
    ],
    correctIndex: 0,
    difficulty: 0.58,
  },
  {
    // # Academic noun — paradigm.
    id: 'item.c1.lex.08',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The discovery represented a complete ______ shift in our understanding of the universe.',
    options: [
      { text: 'paradigm', misconception: null },
      { text: 'paradox', misconception: 'a paradox is a contradiction, not a framework change' },
      { text: 'parallel', misconception: 'a parallel is a similarity, not a fundamental change' },
      { text: 'partition', misconception: 'a partition is a division, not a change in understanding' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },

  // # ── cando.c1.understand_abstract_text (items read.09–16) ────────────
  {
    // # Academic vocabulary — epistemic.
    id: 'item.c1.read.09',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The proliferation of misinformation online has precipitated a crisis of epistemic trust." "Epistemic" relates to:',
    options: [
      { text: 'Knowledge and the basis for belief', misconception: null },
      { text: 'Emotional responses', misconception: 'epistemic concerns knowledge, not emotions' },
      { text: 'Religious faith', misconception: 'epistemic is philosophical about knowledge, not religious' },
      { text: 'Artistic expression', misconception: 'epistemic relates to knowledge theory, not art' },
    ],
    correctIndex: 0,
    difficulty: 0.68,
  },
  {
    // # Interpreting academic hedging — methodologically fraught.
    id: 'item.c1.read.10',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"Whilst the correlation between poverty and crime is well-documented, attributing causation remains methodologically fraught." "Methodologically fraught" means:',
    options: [
      { text: 'Difficult to prove using research methods', misconception: null },
      { text: 'Easy to demonstrate scientifically', misconception: 'fraught means full of difficulty, not easy' },
      { text: 'Irrelevant to the discussion', misconception: 'it is relevant but difficult to prove' },
      { text: 'Already proven beyond doubt', misconception: 'the passage says causation is hard to establish' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Comprehending a scientific thesis — anthropocene.
    id: 'item.c1.read.11',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The anthropocene thesis posits that human activity has become the dominant influence on climate and the environment, constituting a new geological epoch." The passage suggests humanity:',
    options: [
      { text: 'Has altered the planet to such a degree that it marks a new era in Earth\'s history', misconception: null },
      { text: 'Will soon stop affecting the environment', misconception: 'the thesis is about current/past impact, not future cessation' },
      { text: 'Has always been the dominant geological force', misconception: 'the thesis proposes a new epoch, not a permanent state' },
      { text: 'Should focus on space exploration', misconception: 'space is not mentioned' },
    ],
    correctIndex: 0,
    difficulty: 0.7,
  },
  {
    // # Literary device — litotes.
    id: 'item.c1.read.12',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The author\'s use of litotes — \'not uncommon\' rather than \'common\' — reveals a preference for understatement over directness." Litotes is:',
    options: [
      { text: 'An understatement using a negative of the opposite', misconception: null },
      { text: 'An exaggeration for effect', misconception: 'exaggeration is hyperbole, not litotes' },
      { text: 'A metaphor comparing two unlike things', misconception: 'that is metaphor, not litotes' },
      { text: 'Repetition for emphasis', misconception: 'that is anaphora or repetition, not litotes' },
    ],
    correctIndex: 0,
    difficulty: 0.7,
  },
  {
    // # Economic concept — self-correcting markets.
    id: 'item.c1.read.13',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The neoliberal consensus that markets are self-correcting has been increasingly challenged since the 2008 financial crisis." The phrase "self-correcting" implies markets:',
    options: [
      { text: 'Can fix their own problems without government intervention', misconception: null },
      { text: 'Always crash every few years', misconception: 'self-correcting means the opposite of systematic crashing' },
      { text: 'Need constant government control', misconception: 'self-correcting specifically means no government intervention needed' },
      { text: 'Cannot be understood by economists', misconception: 'the passage is about market behaviour, not economists\' understanding' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Academic discourse — concedes.
    id: 'item.c1.read.14',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The researcher concedes that the sample size was limited, yet maintains that the findings warrant further investigation." The word "concedes" shows the researcher:',
    options: [
      { text: 'Acknowledges a weakness while still defending the overall value of the work', misconception: null },
      { text: 'Is fully confident in the results', misconception: 'conceding a limitation shows awareness of weakness' },
      { text: 'Believes the study should be discarded', misconception: 'the researcher maintains the findings are valuable' },
      { text: 'Is criticising other researchers', misconception: 'the researcher is reflecting on their own work' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # Interpreting authorial stance — oscillates.
    id: 'item.c1.read.15',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"The essay oscillates between admiration for technological progress and anxiety about its unintended consequences." "Oscillates" suggests the author:',
    options: [
      { text: 'Moves back and forth between two contrasting positions', misconception: null },
      { text: 'Firmly supports technology', misconception: 'oscillates means going back and forth, not firm support' },
      { text: 'Completely rejects technology', misconception: 'the author also shows admiration, not just rejection' },
      { text: 'Is indifferent to the topic', misconception: 'the author feels both admiration and anxiety — not indifference' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Academic criticism — reductionist.
    id: 'item.c1.read.16',
    level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    stem: '"Critics have dismissed the theory as reductionist, arguing that it oversimplifies a complex phenomenon by attributing it to a single cause." "Reductionist" means:',
    options: [
      { text: 'Explaining something complex by reducing it to one simple factor', misconception: null },
      { text: 'Making something bigger than it is', misconception: 'that is exaggeration, not reductionism' },
      { text: 'Refusing to explain anything at all', misconception: 'reductionism is about oversimplifying, not refusing' },
      { text: 'Adding unnecessary complexity', misconception: 'reductionism is the opposite — oversimplifying, not overcomplicating' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },

  // # ── cando.c1.understand_lecture (items listen.06–09) ────────────────
  {
    // # Quantum mechanics — observer effect.
    id: 'item.c1.listen.06',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A professor explains: "The observer effect in quantum mechanics suggests that the mere act of measurement can alter the state of what is being measured." This means:',
    options: [
      { text: 'Observing a quantum system can change its behaviour', misconception: null },
      { text: 'Scientists cannot make accurate measurements', misconception: 'the point is about change through observation, not measurement accuracy' },
      { text: 'Quantum mechanics is based on guesswork', misconception: 'the observer effect is a real phenomenon, not guesswork' },
      { text: 'Observation has no effect on experiments', misconception: 'the passage says the opposite — measurement alters the state' },
    ],
    correctIndex: 0,
    difficulty: 0.68,
  },
  {
    // # Economics — tragedy of the commons.
    id: 'item.c1.listen.07',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A lecturer says: "The tragedy of the commons occurs when individuals, acting in their own self-interest, deplete a shared resource." An example would be:',
    options: [
      { text: 'Overfishing in international waters because each country tries to catch as much as possible', misconception: null },
      { text: 'A person buying a house for their family', misconception: 'private property is not a shared resource' },
      { text: 'A company developing a new product', misconception: 'product development does not deplete a shared resource' },
      { text: 'A student studying alone in a library', misconception: 'studying alone does not deplete a shared resource' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Psychology — Dunning-Kruger methodological criticism.
    id: 'item.c1.listen.08',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A speaker notes: "While the Dunning-Kruger effect is often cited in popular culture, the original research has been subject to significant methodological criticism." The speaker is:',
    options: [
      { text: 'Suggesting the concept is more nuanced than its popular understanding implies', misconception: null },
      { text: 'Proving the Dunning-Kruger effect is completely wrong', misconception: 'methodological criticism is not the same as proving something wrong' },
      { text: 'Supporting the popular understanding entirely', misconception: 'the speaker is questioning it, not supporting it' },
      { text: 'Discussing an unrelated topic', misconception: 'the speaker is directly addressing the Dunning-Kruger effect' },
    ],
    correctIndex: 0,
    difficulty: 0.68,
  },
  {
    // # Cognitive bias — insidious confirmation bias.
    id: 'item.c1.listen.09',
    level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    stem: 'A professor states: "Confirmation bias — our tendency to seek out information that supports our existing beliefs — is perhaps the most insidious cognitive bias, precisely because we are rarely aware of it." The word "insidious" suggests that confirmation bias is:',
    options: [
      { text: 'Harmful in a gradual, hidden way that is hard to detect', misconception: null },
      { text: 'Obvious and easy to correct', misconception: 'insidious means the opposite — subtle and hard to notice' },
      { text: 'Only affecting unintelligent people', misconception: 'the professor says we are all rarely aware of it' },
      { text: 'A positive trait that helps decision-making', misconception: 'insidious has a negative connotation' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },

  // # ── gram.c1.inversion (items gram.07–10) ────────────────────────────
  {
    // # Inversion after "only after".
    id: 'item.c1.gram.07',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Only after the meeting ______ the full extent of the problem.',
    options: [
      { text: 'did we understand', misconception: null },
      { text: 'we understood', misconception: 'only after at the start triggers subject-auxiliary inversion' },
      { text: 'we did understand', misconception: 'the auxiliary must come before the subject, not after' },
      { text: 'have we understand', misconception: 'have requires the past participle understood, not the base form' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Inversion after "under no circumstances".
    id: 'item.c1.gram.08',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Under no circumstances ______ this information to the public.',
    options: [
      { text: 'should you reveal', misconception: null },
      { text: 'you should reveal', misconception: 'under no circumstances triggers inversion — auxiliary before subject' },
      { text: 'you reveal', misconception: 'missing modal and inversion' },
      { text: 'should reveal you', misconception: 'the object you is misplaced — you is the subject' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Inversion after "little".
    id: 'item.c1.gram.09',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'Little ______ that the decision would change his life.',
    options: [
      { text: 'did he know', misconception: null },
      { text: 'he knew', misconception: 'little at the start triggers subject-auxiliary inversion' },
      { text: 'he did know', misconception: 'the auxiliary must precede the subject after little' },
      { text: 'he knows', misconception: 'present tense does not match the past context' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Inversion after "at no point".
    id: 'item.c1.gram.10',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    stem: 'At no point ______ given permission to enter the building.',
    options: [
      { text: 'were they', misconception: null },
      { text: 'they were', misconception: 'at no point triggers inversion — auxiliary before subject' },
      { text: 'they are', misconception: 'present tense does not match the past context' },
      { text: 'did they were', misconception: 'did and were cannot both serve as auxiliaries' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },

  // # ── gram.c1.cleft_sentences (items cleft.06–09) ─────────────────────
  {
    // # It-cleft with "that" — emphasising cause.
    id: 'item.c1.cleft.06',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: 'It was the traffic ______ made us late, not the weather.',
    options: [
      { text: 'that', misconception: null },
      { text: 'what', misconception: 'what is for wh-clefts like what made us late was..., not it-clefts' },
      { text: 'which', misconception: 'in it-clefts, that is the standard connector, not which' },
      { text: 'who', misconception: 'who refers to people, but traffic is a thing' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Wh-cleft with "was" — past tense linking verb.
    id: 'item.c1.cleft.07',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: 'What surprised everyone ______ the speed of the recovery.',
    options: [
      { text: 'was', misconception: null },
      { text: 'is', misconception: 'the surprise is past — the recovery has already happened' },
      { text: 'were', misconception: 'were is plural, but the subject what surprised everyone is singular' },
      { text: 'has', misconception: 'has does not link in this wh-cleft structure' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # It-cleft with "that" — present tense emphasis.
    id: 'item.c1.cleft.08',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: 'It is the lack of transparency ______ concerns us most.',
    options: [
      { text: 'that', misconception: null },
      { text: 'what', misconception: 'what starts wh-clefts, but this is an it-cleft' },
      { text: 'which', misconception: 'that is preferred over which in it-cleft constructions' },
      { text: 'who', misconception: 'who refers to people, not an abstract concept like lack of transparency' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # Wh-cleft with "is" — present tense.
    id: 'item.c1.cleft.09',
    level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    stem: 'What the company needs most ______ strong leadership.',
    options: [
      { text: 'is', misconception: null },
      { text: 'are', misconception: 'the complement strong leadership is singular conceptually' },
      { text: 'has', misconception: 'has does not link in wh-cleft structures' },
      { text: 'were', misconception: 'were is past and plural, but this is present' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },

  // # ── lex.c1.academic_vocabulary (items lex.09–16) ────────────────────
  {
    // # Academic noun — consequences.
    id: 'item.c1.lex.09',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The policy had unintended ______ that were worse than the original problem.',
    options: [
      { text: 'consequences', misconception: null },
      { text: 'conferences', misconception: 'conferences are meetings, not outcomes' },
      { text: 'conveniences', misconception: 'conveniences are comforts, not outcomes' },
      { text: 'consistencies', misconception: 'consistencies are uniformities, not outcomes' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # Academic adjective — consistent.
    id: 'item.c1.lex.10',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The data was ______ with previous studies, confirming the hypothesis.',
    options: [
      { text: 'consistent', misconception: null },
      { text: 'considerate', misconception: 'considerate means thoughtful towards others, not in agreement' },
      { text: 'constructive', misconception: 'constructive means helpful, not matching' },
      { text: 'consecutive', misconception: 'consecutive means in sequence, not in agreement' },
    ],
    correctIndex: 0,
    difficulty: 0.55,
  },
  {
    // # Academic verb — mitigate.
    id: 'item.c1.lex.11',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The government attempted to ______ the crisis through a series of emergency measures.',
    options: [
      { text: 'mitigate', misconception: null },
      { text: 'migrate', misconception: 'migrate means to move from one place to another' },
      { text: 'meditate', misconception: 'meditate means to think deeply or practise mindfulness' },
      { text: 'motivate', misconception: 'motivate means to inspire, not to reduce severity' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Academic verb — collaborate.
    id: 'item.c1.lex.12',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The two departments need to ______ more effectively to avoid duplication of effort.',
    options: [
      { text: 'collaborate', misconception: null },
      { text: 'collapse', misconception: 'collapse means to fall apart, not work together' },
      { text: 'collide', misconception: 'collide means to crash into, not cooperate' },
      { text: 'collect', misconception: 'collect means to gather things, not to work jointly' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # Academic adjective — significant.
    id: 'item.c1.lex.13',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The report highlights a ______ gap between policy and practice.',
    options: [
      { text: 'significant', misconception: null },
      { text: 'signified', misconception: 'signified is past tense of signify, not an adjective meaning important' },
      { text: 'singular', misconception: 'singular means unique or one, not important' },
      { text: 'synthetic', misconception: 'synthetic means artificial, not important' },
    ],
    correctIndex: 0,
    difficulty: 0.5,
  },
  {
    // # Academic verb — underscore.
    id: 'item.c1.lex.14',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The findings ______ the need for further research in this area.',
    options: [
      { text: 'underscore', misconception: null },
      { text: 'undermine', misconception: 'undermine means to weaken, not to emphasise' },
      { text: 'undertake', misconception: 'undertake means to begin a task, not to emphasise' },
      { text: 'undergo', misconception: 'undergo means to experience, not to emphasise' },
    ],
    correctIndex: 0,
    difficulty: 0.58,
  },
  {
    // # Academic verb — debated.
    id: 'item.c1.lex.15',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'The theory has been widely ______ by scholars in the field.',
    options: [
      { text: 'debated', misconception: null },
      { text: 'debased', misconception: 'debased means lowered in quality, not discussed' },
      { text: 'deflated', misconception: 'deflated means reduced in confidence or air, not discussed' },
      { text: 'defaulted', misconception: 'defaulted means failed to fulfil an obligation, not discussed' },
    ],
    correctIndex: 0,
    difficulty: 0.52,
  },
  {
    // # Academic noun — magnitude.
    id: 'item.c1.lex.16',
    level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    stem: 'Climate change is an issue of global ______ that requires international cooperation.',
    options: [
      { text: 'magnitude', misconception: null },
      { text: 'manufacture', misconception: 'manufacture means making products, not importance/scale' },
      { text: 'maintenance', misconception: 'maintenance means upkeep, not importance/scale' },
      { text: 'maturity', misconception: 'maturity means fully developed state, not importance/scale' },
    ],
    correctIndex: 0,
    difficulty: 0.58,
  },
]

// ─── C2 items (30) ─────────────────────────────────────────────────────
// # Mastery-level items: subjunctive mood, idiomatic/figurative language,
// # understanding any spoken language, reading complex texts, writing
// # complex reports, discussing any topic fluently.

const C2_ITEMS: SeedItem[] = [
  // # ── gram.c2.subjunctive (items gram.01–10) ──────────────────────
  {
    // # Subjunctive after "recommend" — formal register.
    id: 'item.c2.gram.01',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: 'The committee recommended that the proposal ______ reconsidered.',
    options: [
      { text: 'be', misconception: null },
      { text: 'is', misconception: 'present indicative — after "recommend that," formal English uses the subjunctive (bare infinitive)' },
      { text: 'was', misconception: 'past indicative — the subjunctive after "recommend" uses the base form regardless of tense' },
      { text: 'would be', misconception: 'conditional form — the subjunctive is required here, not a conditional construction' },
    ],
    correctIndex: 0,
    difficulty: 0.7,
  },
  {
    // # Subjunctive after "insist" — third person without -s.
    id: 'item.c2.gram.02',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: 'The board insists that every employee ______ the new policy.',
    options: [
      { text: 'follow', misconception: null },
      { text: 'follows', misconception: 'follows is indicative with third-person -s — insist that takes the subjunctive base form' },
      { text: 'followed', misconception: 'followed is past tense — the subjunctive uses the base form regardless of time' },
      { text: 'is following', misconception: 'is following is continuous — the subjunctive requires the bare infinitive' },
    ],
    correctIndex: 0,
    difficulty: 0.72,
  },
  {
    // # Subjunctive after "suggest" — negative form.
    id: 'item.c2.gram.03',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: 'The lawyer suggested that his client ______ anything further.',
    options: [
      { text: 'not say', misconception: null },
      { text: 'doesn\'t say', misconception: 'doesn\'t is indicative — the subjunctive negative is formed with not + base form' },
      { text: 'didn\'t say', misconception: 'didn\'t is past indicative — subjunctive negative uses not + base form' },
      { text: 'not saying', misconception: 'saying is the -ing form — the subjunctive uses the bare infinitive' },
    ],
    correctIndex: 0,
    difficulty: 0.75,
  },
  {
    // # Subjunctive after "demand" — with be.
    id: 'item.c2.gram.04',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: 'The union demanded that the workers ______ given fair compensation.',
    options: [
      { text: 'be', misconception: null },
      { text: 'are', misconception: 'are is indicative — demand that takes the subjunctive, which uses be for all persons' },
      { text: 'were', misconception: 'were is past subjunctive for unreal conditions — this is the present mandative subjunctive' },
      { text: 'will be', misconception: 'will be is future indicative — the subjunctive uses the bare infinitive be' },
    ],
    correctIndex: 0,
    difficulty: 0.72,
  },
  {
    // # Subjunctive in fixed expression.
    id: 'item.c2.gram.05',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: '"If need ______," we can arrange a second meeting.',
    options: [
      { text: 'be', misconception: null },
      { text: 'is', misconception: 'this is a fixed subjunctive expression: "if need be" — not indicative "if need is"' },
      { text: 'was', misconception: 'was is past indicative — "if need be" is a set phrase using the subjunctive' },
      { text: 'will', misconception: 'will is future — the fixed expression is "if need be"' },
    ],
    correctIndex: 0,
    difficulty: 0.7,
  },
  {
    // # Subjunctive after "it is essential that".
    id: 'item.c2.gram.06',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: 'It is essential that every student ______ the deadline.',
    options: [
      { text: 'meet', misconception: null },
      { text: 'meets', misconception: 'meets is indicative — "it is essential that" triggers the mandative subjunctive (base form)' },
      { text: 'will meet', misconception: 'will is future indicative — the subjunctive uses the base form without will' },
      { text: 'meeting', misconception: 'meeting is the -ing form — the subjunctive requires the bare infinitive' },
    ],
    correctIndex: 0,
    difficulty: 0.7,
  },
  {
    // # Subjunctive after "propose" in passive.
    id: 'item.c2.gram.07',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: 'It was proposed that a new committee ______ established.',
    options: [
      { text: 'be', misconception: null },
      { text: 'is', misconception: 'is is present indicative — proposed that takes the subjunctive (be)' },
      { text: 'was', misconception: 'was is past indicative — the subjunctive uses be regardless of the tense of the main verb' },
      { text: 'has been', misconception: 'has been is present perfect — the subjunctive after propose uses the base form be' },
    ],
    correctIndex: 0,
    difficulty: 0.72,
  },

  // # ── lex.c2.idiomatic_language (items lex.01–08) ──────────────────
  {
    // # Idiom comprehension — "the elephant in the room".
    id: 'item.c2.lex.01',
    level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    stem: '"Nobody wanted to address the elephant in the room." This means:',
    options: [
      { text: 'Nobody wanted to discuss the obvious but uncomfortable issue', misconception: null },
      { text: 'There was a real elephant in the room', misconception: 'this is a figurative expression, not literal' },
      { text: 'The room was too small for everyone', misconception: 'the idiom is about an avoided topic, not room size' },
      { text: 'Everyone was afraid of animals', misconception: 'the expression has nothing to do with actual animals' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # Idiom — "a double-edged sword".
    id: 'item.c2.lex.02',
    level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    stem: '"Social media is a double-edged sword." This means social media:',
    options: [
      { text: 'Has both advantages and disadvantages', misconception: null },
      { text: 'Is very dangerous', misconception: 'double-edged means it cuts both ways — good and bad, not just danger' },
      { text: 'Is used for fighting', misconception: 'this is figurative language, not about weapons' },
      { text: 'Is becoming less popular', misconception: 'the idiom says nothing about popularity trends' },
    ],
    correctIndex: 0,
    difficulty: 0.58,
  },
  {
    // # Figurative language — "turn a blind eye".
    id: 'item.c2.lex.03',
    level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    stem: '"The authorities turned a blind eye to the violations." This means they:',
    options: [
      { text: 'Deliberately ignored the violations', misconception: null },
      { text: 'Could not see the violations', misconception: 'the expression means choosing to ignore, not inability to see' },
      { text: 'Investigated the violations thoroughly', misconception: 'turning a blind eye is the opposite of investigating' },
      { text: 'Punished the violators severely', misconception: 'turning a blind eye means not acting, not punishing' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # Idiom — "to play devil's advocate".
    id: 'item.c2.lex.04',
    level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    stem: '"Let me play devil\'s advocate here." The speaker intends to:',
    options: [
      { text: 'Argue the opposing side to test the strength of the argument', misconception: null },
      { text: 'Support evil ideas sincerely', misconception: 'playing devil\'s advocate is a rhetorical technique, not sincere support' },
      { text: 'Change the subject entirely', misconception: 'the speaker stays on topic but takes the opposing view' },
      { text: 'Admit they were wrong', misconception: 'the expression means challenging ideas, not admitting fault' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Figurative language — "a watershed moment".
    id: 'item.c2.lex.05',
    level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    stem: '"The court ruling was a watershed moment for civil rights." This means the ruling was:',
    options: [
      { text: 'A turning point that changed things significantly', misconception: null },
      { text: 'Related to water management', misconception: 'watershed is used figuratively here to mean a pivotal event' },
      { text: 'A minor event with little impact', misconception: 'a watershed moment is significant, not minor' },
      { text: 'A temporary measure', misconception: 'a watershed moment implies lasting change, not something temporary' },
    ],
    correctIndex: 0,
    difficulty: 0.62,
  },
  {
    // # Idiom — "to have one's cake and eat it too".
    id: 'item.c2.lex.06',
    level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    stem: '"You can\'t have your cake and eat it too." This means:',
    options: [
      { text: 'You cannot enjoy two incompatible benefits at the same time', misconception: null },
      { text: 'You should not eat cake', misconception: 'the expression is about impossible trade-offs, not dietary advice' },
      { text: 'You should share your food', misconception: 'the idiom is about having incompatible things, not sharing' },
      { text: 'Cake is expensive', misconception: 'the idiom has nothing to do with the cost of cake' },
    ],
    correctIndex: 0,
    difficulty: 0.58,
  },

  // # ── cando.c2.understand_any_speech (items listen.01–04) ──────────
  {
    // # Following rapid colloquial speech with idioms.
    id: 'item.c2.listen.01',
    level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    stem: 'A speaker says quickly: "Look, at the end of the day, we\'re just going to have to bite the bullet and restructure the whole department." The speaker means they need to:',
    options: [
      { text: 'Accept an unpleasant but necessary decision', misconception: null },
      { text: 'Literally bite something', misconception: 'bite the bullet is an idiom meaning to face something unpleasant, not literal biting' },
      { text: 'Wait until the end of the day', misconception: 'at the end of the day is an idiom meaning ultimately, not a time reference' },
      { text: 'Avoid making a decision', misconception: 'the speaker is advocating for action, not avoidance' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Understanding sarcasm and irony in speech.
    id: 'item.c2.listen.02',
    level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    stem: 'After a terrible presentation, a colleague says: "Well, that went brilliantly." The colleague is being:',
    options: [
      { text: 'Sarcastic — they mean the opposite of what they said', misconception: null },
      { text: 'Genuinely impressed', misconception: 'given the context of a terrible presentation, the praise is ironic' },
      { text: 'Confused about what happened', misconception: 'the colleague understood the presentation was bad and is using irony' },
      { text: 'Encouraging and supportive', misconception: 'sarcasm after a failure is criticism disguised as praise, not encouragement' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # Following an argument with multiple speakers and interruptions.
    id: 'item.c2.listen.03',
    level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    stem: 'In a heated debate, Speaker A says "That\'s a straw man argument." Speaker A is accusing Speaker B of:',
    options: [
      { text: 'Misrepresenting their position to make it easier to attack', misconception: null },
      { text: 'Using scarecrows as examples', misconception: 'straw man is a logical fallacy term, not about scarecrows' },
      { text: 'Being too weak in their argument', misconception: 'straw man refers to misrepresentation, not weakness' },
      { text: 'Agreeing with everything too easily', misconception: 'a straw man attack is about distortion, not agreement' },
    ],
    correctIndex: 0,
    difficulty: 0.68,
  },

  // # ── cando.c2.read_any_text (items read.01–04) ───────────────────
  {
    // # Highly abstract academic text — philosophy.
    id: 'item.c2.read.01',
    level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    stem: '"The Cartesian cogito, far from establishing an unassailable foundation for knowledge, merely demonstrates the reflexivity of consciousness — that thinking presupposes a thinker, without specifying what that thinker is." The author is arguing that:',
    options: [
      { text: '"I think, therefore I am" proves something exists but not what that something is', misconception: null },
      { text: 'Descartes successfully proved the nature of the self', misconception: 'the author says the cogito fails to specify what the thinker is' },
      { text: 'Thinking is not real', misconception: 'the author accepts thinking occurs but questions what it proves about the self' },
      { text: 'Consciousness does not exist', misconception: 'the author accepts reflexivity of consciousness, not its non-existence' },
    ],
    correctIndex: 0,
    difficulty: 0.8,
  },
  {
    // # Legal text — archaic and formal register.
    id: 'item.c2.read.02',
    level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    stem: '"Notwithstanding any provision to the contrary herein, the party of the first part shall not be held liable for consequential damages arising from force majeure." "Force majeure" refers to:',
    options: [
      { text: 'Unforeseeable circumstances beyond anyone\'s control, such as natural disasters', misconception: null },
      { text: 'Military force used by the government', misconception: 'force majeure is a legal term for extraordinary events, not military action' },
      { text: 'The strongest party in the contract', misconception: 'majeure means major/superior, but the term refers to events, not parties' },
      { text: 'A type of insurance policy', misconception: 'force majeure is a contractual concept, not an insurance product' },
    ],
    correctIndex: 0,
    difficulty: 0.75,
  },
  {
    // # Colloquial slang text — understanding register.
    id: 'item.c2.read.03',
    level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    stem: '"The whole project went pear-shaped after the lead dev ghosted us mid-sprint." This means:',
    options: [
      { text: 'The project failed because the main developer suddenly stopped communicating', misconception: null },
      { text: 'The project was about designing pear shapes', misconception: 'pear-shaped is slang for going wrong, not about shapes' },
      { text: 'A ghost disrupted the project', misconception: 'ghosted means to disappear without warning, not involving ghosts' },
      { text: 'The developer was running too fast', misconception: 'sprint is an agile methodology term here, not physical running' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },

  // # ── cando.c2.write_complex_reports (items write.01–03) ──────────
  {
    // # Report language — hedging in academic writing.
    id: 'item.c2.write.01',
    level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    stem: 'Which sentence is most appropriate for an academic report?',
    options: [
      { text: 'The findings suggest a potential correlation between the variables.', misconception: null },
      { text: 'The findings totally prove everything.', misconception: 'academic writing avoids absolute claims — hedging language is expected' },
      { text: 'I think the findings are kind of interesting.', misconception: 'informal language and vague hedging are inappropriate in academic reports' },
      { text: 'Obviously, the theory is correct.', misconception: 'obviously and absolute claims violate academic hedging conventions' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Nominalisation — academic style transformation.
    id: 'item.c2.write.02',
    level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    stem: '"We investigated the problem" can be made more formal by writing:',
    options: [
      { text: 'An investigation of the problem was conducted.', misconception: null },
      { text: 'The problem got investigated by us.', misconception: 'got is informal — academic style uses be + past participle' },
      { text: 'We did an investigate.', misconception: 'investigate is a verb — the noun form is investigation' },
      { text: 'The problem was investigated real good.', misconception: 'real good is colloquial — academic writing requires formal register' },
    ],
    correctIndex: 0,
    difficulty: 0.68,
  },
  {
    // # Complex sentence structure for reports.
    id: 'item.c2.write.03',
    level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    stem: 'Which connector best links these ideas in a report? "The initial results were promising. ______, subsequent trials revealed significant methodological flaws."',
    options: [
      { text: 'Nonetheless', misconception: null },
      { text: 'Therefore', misconception: 'therefore shows result from the first sentence, but the second contradicts it' },
      { text: 'Furthermore', misconception: 'furthermore adds supporting information, but the second sentence contrasts' },
      { text: 'Consequently', misconception: 'consequently shows effect, but the relationship here is contrast' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },

  // # ── cando.c2.discuss_any_topic (items discuss.01–04) ─────────────
  {
    // # Nuanced opinion expression — academic discussion.
    id: 'item.c2.discuss.01',
    level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    stem: 'In a formal debate, which response best expresses a nuanced disagreement?',
    options: [
      { text: 'While I appreciate the merit of that argument, I would contend that it overlooks several critical factors.', misconception: null },
      { text: 'You\'re wrong.', misconception: 'this is blunt and lacks the nuance expected in formal academic discussion' },
      { text: 'I don\'t know about that.', misconception: 'this is vague and does not articulate the disagreement or its basis' },
      { text: 'Whatever you say.', misconception: 'this dismisses the discussion rather than engaging with it' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Restructuring mid-sentence — natural fluency marker.
    id: 'item.c2.discuss.02',
    level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    stem: 'A sign of C2 fluency is the ability to:',
    options: [
      { text: 'Restructure a sentence mid-flow without losing coherence', misconception: null },
      { text: 'Speak very loudly so everyone can hear', misconception: 'volume is unrelated to fluency level' },
      { text: 'Avoid using any complex vocabulary', misconception: 'C2 speakers use complex vocabulary naturally' },
      { text: 'Speak as fast as possible without pausing', misconception: 'natural pauses are part of fluent speech — speed alone is not fluency' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },
  {
    // # Expressing fine shades of meaning.
    id: 'item.c2.discuss.03',
    level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    stem: '"The proposal is not so much flawed as incomplete." The speaker is saying:',
    options: [
      { text: 'The main problem is missing elements, not fundamental errors', misconception: null },
      { text: 'The proposal is perfect', misconception: 'the speaker identifies a problem (incompleteness), not perfection' },
      { text: 'The proposal is completely wrong', misconception: 'the speaker explicitly says it is not so much flawed — the issue is incompleteness' },
      { text: 'The speaker does not care about the proposal', misconception: 'the speaker is making a precise distinction, showing active engagement' },
    ],
    correctIndex: 0,
    difficulty: 0.65,
  },
  {
    // # Concession and counter-argument in discussion.
    id: 'item.c2.discuss.04',
    level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    stem: 'Which phrase best introduces a concession before a counter-argument?',
    options: [
      { text: 'Granted, there is some truth to that, but I would argue that...', misconception: null },
      { text: 'No, that\'s completely wrong because...', misconception: 'this is direct contradiction without concession' },
      { text: 'I agree with everything you said.', misconception: 'this is full agreement, not a concession followed by a counter-argument' },
      { text: 'Anyway, let\'s change the subject.', misconception: 'this avoids the argument rather than engaging with it' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },

  // # ── gram.c2.subjunctive (item gram.08) ──────────────────────────────
  {
    // # Mandative subjunctive after "require that".
    id: 'item.c2.gram.08',
    level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    stem: 'The regulations require that each applicant ______ a valid passport.',
    options: [
      { text: 'present', misconception: null },
      { text: 'presents', misconception: 'indicative with -s — require that triggers the subjunctive base form' },
      { text: 'presented', misconception: 'past tense — the subjunctive uses the base form regardless of tense' },
      { text: 'will present', misconception: 'future indicative — the subjunctive does not use will' },
    ],
    correctIndex: 0,
    difficulty: 0.72,
  },

  // # ── lex.c2.idiomatic_language (item lex.07) ────────────────────────
  {
    // # Idiomatic expression — "red herring".
    id: 'item.c2.lex.07',
    level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    stem: '"The new regulations are a red herring designed to distract from the real issue." A "red herring" is:',
    options: [
      { text: 'Something misleading that diverts attention from the main point.', misconception: null },
      { text: 'A type of fish served at meetings.', misconception: 'red herring is figurative, not about actual fish' },
      { text: 'An important document.', misconception: 'a red herring is deliberately unimportant, designed to mislead' },
      { text: 'A warning sign of danger.', misconception: 'a red herring misleads — it does not warn' },
    ],
    correctIndex: 0,
    difficulty: 0.6,
  },

  // # ── cando.c2.read_any_text (item read.04) ──────────────────────────
  {
    // # Reading comprehension — Socratic irony in academic prose.
    id: 'item.c2.read.04',
    level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    stem: '"The author deploys a Socratic irony throughout the essay, ostensibly conceding to the interlocutor\'s position whilst systematically dismantling its premises." The phrase "Socratic irony" here refers to:',
    options: [
      { text: 'Pretending to agree while actually exposing weaknesses in the argument.', misconception: null },
      { text: 'Being genuinely confused about the topic.', misconception: 'Socratic irony is deliberate, not genuine confusion' },
      { text: 'Making jokes to lighten the mood.', misconception: 'irony here is a rhetorical strategy, not humour' },
      { text: 'Accidentally contradicting oneself.', misconception: 'Socratic irony is intentional, not accidental' },
    ],
    correctIndex: 0,
    difficulty: 0.8,
  },

  // # ── cando.c2.understand_any_speech (item listen.04) ────────────────
  {
    // # Listening comprehension — "volte-face" in rapid speech.
    id: 'item.c2.listen.04',
    level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    stem: 'A radio host says rapidly with background noise: "The minister\'s volte-face on the policy has left backbenchers in disarray." "Volte-face" means:',
    options: [
      { text: 'A complete reversal of position.', misconception: null },
      { text: 'A strong defence of a position.', misconception: 'volte-face is the opposite — it means reversing, not defending' },
      { text: 'A facial expression of anger.', misconception: 'volte-face comes from fencing/turning, not facial expressions' },
      { text: 'A minor adjustment to policy.', misconception: 'volte-face implies a complete U-turn, not a small change' },
    ],
    correctIndex: 0,
    difficulty: 0.7,
  },
]

// ─── Export all items ───────────────────────────────────────────────────
// # Flat array combining all level groups for the seed runner.

export const SEED_ITEMS: SeedItem[] = [
  ...A1_ITEMS,
  ...A2_ITEMS,
  ...B1_ITEMS,
  ...B2_ITEMS,
  ...C1_ITEMS,
  ...C2_ITEMS,
]
