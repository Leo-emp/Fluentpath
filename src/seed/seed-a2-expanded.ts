// # A2 expanded content — all new types plus more gap-fill, writing, speaking,
// # dialogue completion. Covers everyday topics: travel, shopping, routines.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_A2_EXPANDED: UnifiedSeedItem[] = [
  // # ─── SENTENCE TRANSFORMATION (6) ────────────────────────────────────
  {
    id: 'item.st.a2.01', type: 'sentence_transform', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { originalSentence: 'I went to the cinema yesterday.', keyWord: 'film', acceptedAnswers: ['I watched a film yesterday.', 'I saw a film yesterday.'], explanation: '"Went to the cinema" means "watched/saw a film" — same idea, different expression.', difficulty: 0.25 },
  },
  {
    id: 'item.st.a2.02', type: 'sentence_transform', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    payload: { originalSentence: 'I plan to visit my grandmother next week.', keyWord: 'going', acceptedAnswers: ['I am going to visit my grandmother next week.', "I'm going to visit my grandmother next week."], explanation: '"Plan to" and "going to" both express future intentions.', difficulty: 0.25 },
  },
  {
    id: 'item.st.a2.03', type: 'sentence_transform', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: { originalSentence: 'This bag is not as heavy as that one.', keyWord: 'lighter', acceptedAnswers: ['This bag is lighter than that one.'], explanation: '"Not as heavy as" = "lighter than" — negating a comparison can be rephrased as the opposite comparative.', difficulty: 0.3 },
  },
  {
    id: 'item.st.a2.04', type: 'sentence_transform', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { originalSentence: 'She did not remember to call me.', keyWord: 'forgot', acceptedAnswers: ['She forgot to call me.'], explanation: '"Did not remember to" = "forgot to" — expressing the same idea more concisely.', difficulty: 0.25 },
  },
  {
    id: 'item.st.a2.05', type: 'sentence_transform', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: { originalSentence: 'No other student in the class is taller than Marco.', keyWord: 'tallest', acceptedAnswers: ['Marco is the tallest student in the class.'], explanation: '"No other... taller than" = "the tallest" — superlative from a comparative statement.', difficulty: 0.35 },
  },
  {
    id: 'item.st.a2.06', type: 'sentence_transform', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    payload: { originalSentence: 'It will probably rain tomorrow.', keyWord: 'going', acceptedAnswers: ['It is going to rain tomorrow.', "It's going to rain tomorrow."], explanation: 'Predictions based on evidence or likelihood can use "going to" instead of "will".', difficulty: 0.3 },
  },

  // # ─── ERROR CORRECTION (8) ──────────────────────────────────────────
  {
    id: 'item.ec.a2.01', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { sentence: 'I goed to the park yesterday.', errorPart: 'goed', correction: 'went', explanation: '"Go" is irregular: go → went → gone. It does not follow the -ed pattern.', difficulty: 0.2 },
  },
  {
    id: 'item.ec.a2.02', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { sentence: 'Did you went to school yesterday?', errorPart: 'went', correction: 'go', explanation: 'After "did", always use the base form: "Did you go?" not "Did you went?"', difficulty: 0.2 },
  },
  {
    id: 'item.ec.a2.03', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: { sentence: 'She is more tall than her brother.', errorPart: 'more tall', correction: 'taller', explanation: 'Short adjectives (one syllable) use -er, not "more": taller, not more tall.', difficulty: 0.25 },
  },
  {
    id: 'item.ec.a2.04', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    payload: { sentence: 'We going to have dinner at 7.', errorPart: 'We going', correction: 'We are going', explanation: '"Going to" needs the verb "be" before it: "We ARE going to..."', difficulty: 0.2 },
  },
  {
    id: 'item.ec.a2.05', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { sentence: 'I want to go at the beach.', errorPart: 'at', correction: 'to', explanation: 'We go TO a place, not AT a place. "At" is for position: "I am at the beach."', difficulty: 0.2 },
  },
  {
    id: 'item.ec.a2.06', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { sentence: 'He buyed a new phone last week.', errorPart: 'buyed', correction: 'bought', explanation: '"Buy" is irregular: buy → bought. It does not add -ed.', difficulty: 0.2 },
  },
  {
    id: 'item.ec.a2.07', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: { sentence: 'This is the most cheap restaurant in town.', errorPart: 'most cheap', correction: 'cheapest', explanation: 'Short adjectives use -est for superlative: cheapest, not most cheap.', difficulty: 0.25 },
  },
  {
    id: 'item.ec.a2.08', type: 'error_correction', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { sentence: 'We was very tired after the walk.', errorPart: 'was', correction: 'were', explanation: '"We" takes "were" in the past tense, not "was". "Was" is for I/he/she/it.', difficulty: 0.2 },
  },

  // # ─── WORD FORMATION (6) ────────────────────────────────────────────
  {
    id: 'item.wf.a2.01', type: 'word_formation', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'The hotel room was very ______ and clean.', rootWord: 'COMFORT', acceptedAnswers: ['comfortable'], explanation: 'Add -able to "comfort" to make the adjective "comfortable".', difficulty: 0.25 },
  },
  {
    id: 'item.wf.a2.02', type: 'word_formation', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'The ______ of the town was very interesting.', rootWord: 'HISTORY', acceptedAnswers: ['history'], explanation: 'Here the noun form "history" is needed — no change required.', difficulty: 0.2 },
  },
  {
    id: 'item.wf.a2.03', type: 'word_formation', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'She was very ______ to help us find the hotel.', rootWord: 'HELP', acceptedAnswers: ['helpful'], explanation: 'Add -ful to "help" to make the adjective "helpful" (willing to help).', difficulty: 0.25 },
  },
  {
    id: 'item.wf.a2.04', type: 'word_formation', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'The food was ______ — I ate everything!', rootWord: 'WONDER', acceptedAnswers: ['wonderful'], explanation: 'Add -ful to "wonder" to make "wonderful" (extremely good).', difficulty: 0.2 },
  },
  {
    id: 'item.wf.a2.05', type: 'word_formation', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'It was a ______ day. The sky was grey all day.', rootWord: 'CLOUD', acceptedAnswers: ['cloudy'], explanation: 'Add -y to "cloud" to make the adjective "cloudy" (full of clouds).', difficulty: 0.2 },
  },
  {
    id: 'item.wf.a2.06', type: 'word_formation', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'The ______ took us to the airport in 30 minutes.', rootWord: 'DRIVE', acceptedAnswers: ['driver'], explanation: 'Add -r to "drive" to make "driver" — the person who drives.', difficulty: 0.2 },
  },

  // # ─── MATCHING (6) ──────────────────────────────────────────────────
  {
    id: 'item.ma.a2.01', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'Match the travel word to its meaning.', pairs: [
      { left: 'boarding pass', right: 'the paper you need to get on a plane' },
      { left: 'luggage', right: 'bags and suitcases you take when travelling' },
      { left: 'departure', right: 'the time a plane, bus, or train leaves' },
      { left: 'arrival', right: 'the time you reach your destination' },
    ], difficulty: 0.2 },
  },
  {
    id: 'item.ma.a2.02', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { stem: 'Match the present tense verb to its past tense form.', pairs: [
      { left: 'eat', right: 'ate' },
      { left: 'drink', right: 'drank' },
      { left: 'see', right: 'saw' },
      { left: 'take', right: 'took' },
      { left: 'write', right: 'wrote' },
    ], difficulty: 0.2 },
  },
  {
    id: 'item.ma.a2.03', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'Match each shop to what you buy there.', pairs: [
      { left: 'bakery', right: 'bread and cakes' },
      { left: 'pharmacy', right: 'medicine' },
      { left: 'butcher\'s', right: 'meat' },
      { left: 'newsagent\'s', right: 'newspapers and magazines' },
    ], difficulty: 0.2 },
  },
  {
    id: 'item.ma.a2.04', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'Match the weather word to its description.', pairs: [
      { left: 'foggy', right: 'you cannot see far because of mist' },
      { left: 'stormy', right: 'strong wind and heavy rain' },
      { left: 'freezing', right: 'extremely cold, below zero' },
      { left: 'mild', right: 'not too hot and not too cold' },
    ], difficulty: 0.25 },
  },
  {
    id: 'item.ma.a2.05', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: { stem: 'Match each adjective to its comparative form.', pairs: [
      { left: 'good', right: 'better' },
      { left: 'bad', right: 'worse' },
      { left: 'far', right: 'further' },
      { left: 'much', right: 'more' },
    ], difficulty: 0.25 },
  },
  {
    id: 'item.ma.a2.06', type: 'matching', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'Match each phrase to the correct situation.', pairs: [
      { left: 'I\'d like to book a room, please.', right: 'At a hotel' },
      { left: 'Could I have the bill, please?', right: 'At a restaurant' },
      { left: 'A return ticket to London, please.', right: 'At a train station' },
      { left: 'How much is this T-shirt?', right: 'At a shop' },
    ], difficulty: 0.2 },
  },

  // # ─── DIALOGUE COMPLETION (8) ───────────────────────────────────────
  {
    id: 'item.dc.a2.01', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation at a restaurant.', lines: [
      { speaker: 'Waiter', text: 'Good evening. Do you have a reservation?' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['Yes, for two people. The name is...', 'No, but do you have a table for two?'], hint: 'Answer about reservation.' },
      { speaker: 'Waiter', text: 'Of course. Follow me, please. Here is the menu.' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['Thank you. Can I have a glass of water, please?', 'Thank you. What do you recommend?'], hint: 'Order a drink or ask for a recommendation.' },
      { speaker: 'Waiter', text: 'The pasta is very popular. Are you ready to order?' },
      { speaker: 'Customer', text: null, acceptedAnswers: ["I'll have the pasta, please.", 'Can I have the chicken, please?', 'I would like the fish, please.'], hint: 'Choose your food.' },
    ], difficulty: 0.25 },
  },
  {
    id: 'item.dc.a2.02', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation at a doctor\'s surgery.', lines: [
      { speaker: 'Doctor', text: 'Good morning. What seems to be the problem?' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['I have a headache and a sore throat.', 'I feel sick and I have a temperature.', 'My back hurts.'], hint: 'Describe your health problem.' },
      { speaker: 'Doctor', text: 'How long have you had this problem?' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['Since yesterday.', 'For about three days.', 'It started on Monday.'], hint: 'Say how long you have been ill.' },
      { speaker: 'Doctor', text: 'I see. I\'m going to give you some medicine. Take it twice a day.' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['Thank you, doctor.', 'OK, thank you. Should I come back if it doesn\'t get better?'], hint: 'Thank the doctor.' },
    ], difficulty: 0.3 },
  },
  {
    id: 'item.dc.a2.03', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation booking a hotel room.', lines: [
      { speaker: 'Receptionist', text: 'Good afternoon. How can I help you?' },
      { speaker: 'Guest', text: null, acceptedAnswers: ['I\'d like to book a room, please.', 'Do you have any rooms available?', 'I need a room for two nights.'], hint: 'Ask about booking a room.' },
      { speaker: 'Receptionist', text: 'For how many nights?' },
      { speaker: 'Guest', text: null, acceptedAnswers: ['Three nights, please.', 'From Friday to Sunday.', 'Two nights.'], hint: 'Say how long you want to stay.' },
      { speaker: 'Receptionist', text: 'Would you like a single or a double room?' },
      { speaker: 'Guest', text: null, acceptedAnswers: ['A double room, please.', 'A single room is fine.'], hint: 'Choose the room type.' },
    ], difficulty: 0.25 },
  },
  {
    id: 'item.dc.a2.04', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation about weekend plans.', lines: [
      { speaker: 'A', text: 'What are you doing this weekend?' },
      { speaker: 'B', text: null, acceptedAnswers: ['I\'m going to visit my grandparents.', 'I\'m going shopping.', 'Nothing special. Why?'], hint: 'Talk about your plans.' },
      { speaker: 'A', text: 'Do you want to come to the cinema with me on Saturday?' },
      { speaker: 'B', text: null, acceptedAnswers: ['Sure! What time?', 'Sorry, I can\'t. I\'m busy.', 'That sounds great!'], hint: 'Accept or decline the invitation.' },
    ], difficulty: 0.2 },
  },
  {
    id: 'item.dc.a2.05', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation returning an item to a shop.', lines: [
      { speaker: 'Customer', text: null, acceptedAnswers: ['Excuse me, I bought this shirt yesterday but it\'s too small.', 'I\'d like to return this, please.'], hint: 'Explain the problem.' },
      { speaker: 'Shop assistant', text: 'Do you have the receipt?' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['Yes, here it is.', 'Yes, I have it here.'], hint: 'Give them the receipt.' },
      { speaker: 'Shop assistant', text: 'Would you like to exchange it for a bigger size or have a refund?' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['A bigger size, please.', 'I\'d like a refund, please.', 'Can I exchange it?'], hint: 'Choose exchange or refund.' },
    ], difficulty: 0.25 },
  },
  {
    id: 'item.dc.a2.06', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation about the weather.', lines: [
      { speaker: 'A', text: 'It\'s a lovely day today, isn\'t it?' },
      { speaker: 'B', text: null, acceptedAnswers: ['Yes, it is! The sun is shining.', 'Yes, it\'s really nice today.', 'It is! Much better than yesterday.'], hint: 'Agree about the good weather.' },
      { speaker: 'A', text: 'Do you think it will rain later?' },
      { speaker: 'B', text: null, acceptedAnswers: ['I hope not!', 'I don\'t think so.', 'Maybe. I saw some clouds earlier.'], hint: 'Give your opinion about rain.' },
    ], difficulty: 0.2 },
  },
  {
    id: 'item.dc.a2.07', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation on a bus.', lines: [
      { speaker: 'Passenger', text: null, acceptedAnswers: ['Excuse me, does this bus go to the city centre?', 'Is this the right bus for the station?'], hint: 'Ask if the bus goes where you want.' },
      { speaker: 'Driver', text: 'Yes, it does. Where exactly do you want to go?' },
      { speaker: 'Passenger', text: null, acceptedAnswers: ['To the main square, please.', 'To the shopping centre.', 'Near the hospital, please.'], hint: 'Say your destination.' },
      { speaker: 'Driver', text: 'That\'s three stops from here. I\'ll tell you when to get off.' },
      { speaker: 'Passenger', text: null, acceptedAnswers: ['Thank you very much!', 'That\'s very kind, thanks!'], hint: 'Say thank you.' },
    ], difficulty: 0.2 },
  },
  {
    id: 'item.dc.a2.08', type: 'dialogue_completion', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { stem: 'Complete the conversation about a past holiday.', lines: [
      { speaker: 'A', text: 'Where did you go on holiday last summer?' },
      { speaker: 'B', text: null, acceptedAnswers: ['I went to Greece.', 'We visited Italy.', 'I stayed at home, actually.'], hint: 'Name a place.' },
      { speaker: 'A', text: 'That sounds nice! What did you do there?' },
      { speaker: 'B', text: null, acceptedAnswers: ['We went to the beach every day.', 'I visited some old buildings and ate lots of local food.', 'We went hiking in the mountains.'], hint: 'Describe activities.' },
      { speaker: 'A', text: 'Did you enjoy it?' },
      { speaker: 'B', text: null, acceptedAnswers: ['Yes, it was wonderful!', 'Yes, I had a great time.', 'It was OK, but the weather was bad.'], hint: 'Give your opinion.' },
    ], difficulty: 0.25 },
  },

  // # ─── EXTRA WRITING (3) ─────────────────────────────────────────────
  {
    id: 'item.wt.a2.02', type: 'writing_task', level: 'A2', skill: 'writing',
    nodeIds: ['cando.a2.write_short_messages'],
    payload: { prompt: 'Your English teacher asked you to write about your daily routine. Write about what you do in the morning, afternoon, and evening. Write 60–100 words.', format: 'short_message', minWords: 60, maxWords: 120, timeMinutes: 15, rubric: [
      { name: 'Task Completion', description: 'Covers morning, afternoon, and evening activities', maxScore: 3 },
      { name: 'Grammar', description: 'Uses present simple and time markers correctly', maxScore: 3 },
      { name: 'Vocabulary', description: 'Uses daily routine vocabulary', maxScore: 3 },
    ], modelAnswer: 'Every morning, I wake up at 7 o\'clock. I have a shower and eat breakfast. I usually have toast and juice. Then I go to school by bus.\n\nIn the afternoon, I come home at about 3:30. I do my homework and then I play football with my friends in the park.\n\nIn the evening, I have dinner with my family. After dinner, I watch TV or read a book. I go to bed at about 10 o\'clock.', difficulty: 0.25 },
  },
  {
    id: 'item.wt.a2.03', type: 'writing_task', level: 'A2', skill: 'writing',
    nodeIds: ['cando.a2.write_short_messages'],
    payload: { prompt: 'Write an email to a friend about a film you saw recently. Say what the film was about, whether you liked it, and why. Write 60–100 words.', format: 'short_message', minWords: 60, maxWords: 120, timeMinutes: 15, rubric: [
      { name: 'Task Completion', description: 'Names a film, describes plot, gives opinion', maxScore: 3 },
      { name: 'Grammar', description: 'Uses past simple correctly', maxScore: 3 },
      { name: 'Vocabulary', description: 'Uses entertainment and opinion vocabulary', maxScore: 3 },
    ], modelAnswer: 'Hi Sarah,\n\nLast weekend I watched a really good film called "The Secret Garden". It was about a girl who moves to her uncle\'s big house in the countryside. She finds a hidden garden and starts to look after it. The garden changes her life.\n\nI really liked the film because the story was beautiful and the pictures were amazing. The acting was good too. I think you would enjoy it. Do you want to watch it together next time?\n\nBest,\nMaria', difficulty: 0.25 },
  },
  {
    id: 'item.wt.a2.04', type: 'writing_task', level: 'A2', skill: 'writing',
    nodeIds: ['cando.a2.write_short_messages'],
    payload: { prompt: 'You lost something at school. Write a message to the school office. Say what you lost, where you think you lost it, and what it looks like. Write 40–60 words.', format: 'short_message', minWords: 40, maxWords: 80, timeMinutes: 10, rubric: [
      { name: 'Task Completion', description: 'Describes the lost item, location, and appearance', maxScore: 3 },
      { name: 'Grammar', description: 'Uses past simple and descriptions correctly', maxScore: 3 },
      { name: 'Tone', description: 'Appropriate semi-formal tone', maxScore: 3 },
    ], modelAnswer: 'Dear School Office,\n\nI lost my pencil case yesterday afternoon. I think I left it in Room 204 after my English class. It is a blue pencil case with a zip. Inside there are two pens, a pencil, a rubber, and a ruler. If someone finds it, please contact me. My name is Tom Green and I am in Class 8B.\n\nThank you.', difficulty: 0.2 },
  },

  // # ─── EXTRA SPEAKING (3) ────────────────────────────────────────────
  {
    id: 'item.sp.a2.02', type: 'speaking_prompt', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { prompt: 'Talk about your last birthday.', format: 'general', followUpQuestions: ['When was your last birthday?', 'What did you do?', 'Who came to celebrate?', 'Did you get any presents?'], prepTimeSeconds: 0, speakTimeSeconds: 90, targetLanguage: ['My last birthday was on...', 'I had a party / dinner / ...', 'My friends / family came...', 'I got... as a present.'], modelAnswerNotes: 'Past tense throughout. Describes the celebration, people present, and gifts. At least 6 sentences.', difficulty: 0.2 },
  },
  {
    id: 'item.sp.a2.03', type: 'speaking_prompt', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { prompt: 'Describe your favourite place in your town or city.', format: 'general', followUpQuestions: ['Where is it?', 'What can you do there?', 'How often do you go there?', 'Why do you like it?'], prepTimeSeconds: 0, speakTimeSeconds: 90, targetLanguage: ['My favourite place is...', 'It is near / in the centre of...', 'You can... there.', 'I go there every...', 'I like it because...'], modelAnswerNotes: 'Names the place, describes location, activities, frequency, and reason for liking it. Uses present simple for habits.', difficulty: 0.2 },
  },
  {
    id: 'item.sp.a2.04', type: 'speaking_prompt', level: 'A2', skill: 'speaking',
    nodeIds: ['cando.a2.describe_routine'],
    payload: { prompt: 'Tell me about something you are good at.', format: 'general', followUpQuestions: ['What are you good at?', 'How did you learn it?', 'How long have you been doing it?', 'Do you want to get better at it?'], prepTimeSeconds: 0, speakTimeSeconds: 90, targetLanguage: ['I am good at...', 'I learned it from / by...', 'I started... years ago.', 'I want to improve...'], modelAnswerNotes: 'Names a skill/activity, explains how learned, mentions duration, shows self-awareness. Mix of past and present tenses.', difficulty: 0.2 },
  },

  // # ─── EXTRA GAP-FILL (6) ────────────────────────────────────────────
  {
    id: 'item.gf.a2.07', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { stem: 'Last night we ______ a delicious pizza at the Italian restaurant.', gaps: [{ index: 0, acceptedAnswers: ['ate', 'had'], hint: 'Past tense of eat' }], difficulty: 0.2 },
  },
  {
    id: 'item.gf.a2.08', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.future_going_to'],
    payload: { stem: 'They ______ going to move to a new house next month.', gaps: [{ index: 0, acceptedAnswers: ['are', "'re"], hint: 'They + be' }], difficulty: 0.2 },
  },
  {
    id: 'item.gf.a2.09', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { stem: 'I ______ a very strange dream last night.', gaps: [{ index: 0, acceptedAnswers: ['had'], hint: 'Past tense of "have"' }], difficulty: 0.2 },
  },
  {
    id: 'item.gf.a2.10', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.comparatives'],
    payload: { stem: 'My sister is two years ______ than me.', gaps: [{ index: 0, acceptedAnswers: ['older', 'younger'], hint: 'Comparative adjective for age' }], difficulty: 0.2 },
  },
  {
    id: 'item.gf.a2.11', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['lex.a2.travel'],
    payload: { stem: 'The ______ to London takes about two hours by train.', gaps: [{ index: 0, acceptedAnswers: ['journey', 'trip', 'travel'], hint: 'A word for going from one place to another' }], difficulty: 0.25 },
  },
  {
    id: 'item.gf.a2.12', type: 'gap_fill', level: 'A2', skill: 'general',
    nodeIds: ['gram.a2.past_simple'],
    payload: { stem: 'She ______ her homework and then ______ to bed.', gaps: [
      { index: 0, acceptedAnswers: ['did', 'finished'], hint: 'Past tense: complete homework' },
      { index: 1, acceptedAnswers: ['went'], hint: 'Past tense of "go"' },
    ], difficulty: 0.25 },
  },
]
