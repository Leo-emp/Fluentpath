// # B1 expanded content — sentence transforms, error correction, word formation,
// # matching, dialogue completion, plus more gap-fill, writing, speaking.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_B1_EXPANDED: UnifiedSeedItem[] = [
  // # ─── SENTENCE TRANSFORMATION (8) ────────────────────────────────────
  {
    id: 'item.st.b1.01', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: { originalSentence: 'I started learning English five years ago.', keyWord: 'been', acceptedAnswers: ['I have been learning English for five years.', "I've been learning English for five years."], explanation: '"Started... ago" → "have been... for" changes from past simple + time ago to present perfect continuous + for.', difficulty: 0.4 },
  },
  {
    id: 'item.st.b1.02', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: { originalSentence: 'Perhaps she is at the library.', keyWord: 'might', acceptedAnswers: ['She might be at the library.'], explanation: '"Perhaps" expresses possibility — the modal "might" does the same job.', difficulty: 0.4 },
  },
  {
    id: 'item.st.b1.03', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    payload: { originalSentence: 'This is my first time in New York.', keyWord: 'never', acceptedAnswers: ['I have never been to New York before.', "I've never been to New York before."], explanation: '"First time" = "never... before" with present perfect for life experience.', difficulty: 0.45 },
  },
  {
    id: 'item.st.b1.04', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: { originalSentence: 'It is necessary for students to wear a uniform.', keyWord: 'must', acceptedAnswers: ['Students must wear a uniform.'], explanation: '"It is necessary for... to" can be rewritten using the modal "must".', difficulty: 0.4 },
  },
  {
    id: 'item.st.b1.05', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: { originalSentence: 'When did they get married?', keyWord: 'long', acceptedAnswers: ['How long have they been married?', 'How long have they been married for?'], explanation: '"When did... ?" (past simple, point) → "How long have... ?" (present perfect, duration).', difficulty: 0.45 },
  },
  {
    id: 'item.st.b1.06', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: { originalSentence: 'I advise you to see a doctor.', keyWord: 'should', acceptedAnswers: ['You should see a doctor.'], explanation: '"I advise you to" gives advice — "should" is the modal equivalent.', difficulty: 0.35 },
  },
  {
    id: 'item.st.b1.07', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    payload: { originalSentence: 'The last time I saw her was in June.', keyWord: 'since', acceptedAnswers: ['I have not seen her since June.', "I haven't seen her since June."], explanation: '"The last time... was" → "have not... since" to express duration from a past point.', difficulty: 0.5 },
  },
  {
    id: 'item.st.b1.08', type: 'sentence_transform', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: { originalSentence: 'He is still writing his essay.', keyWord: 'finished', acceptedAnswers: ['He has not finished his essay yet.', "He hasn't finished his essay yet.", 'He has not finished writing his essay yet.'], explanation: '"Still doing" → "not finished... yet" with present perfect.', difficulty: 0.45 },
  },

  // # ─── ERROR CORRECTION (8) ──────────────────────────────────────────
  {
    id: 'item.ec.b1.01', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: { sentence: 'I have went to Paris three times.', errorPart: 'went', correction: 'been', explanation: 'Present perfect uses the past participle: "have been" not "have went". "Gone" means departed; "been" means visited.', difficulty: 0.35 },
  },
  {
    id: 'item.ec.b1.02', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    payload: { sentence: 'I have seen that film yesterday.', errorPart: 'have seen', correction: 'saw', explanation: '"Yesterday" is a finished time — use past simple "saw", not present perfect "have seen".', difficulty: 0.35 },
  },
  {
    id: 'item.ec.b1.03', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: { sentence: 'You must to study harder for the exam.', errorPart: 'to study', correction: 'study', explanation: 'After modal verbs (must, can, should), use the base form: "must study" not "must to study".', difficulty: 0.3 },
  },
  {
    id: 'item.ec.b1.04', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: { sentence: 'She has lived here since five years.', errorPart: 'since', correction: 'for', explanation: 'Use "for" with durations (five years) and "since" with points in time (2020, Monday).', difficulty: 0.35 },
  },
  {
    id: 'item.ec.b1.05', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { sentence: 'I am agree with your opinion.', errorPart: 'am agree', correction: 'agree', explanation: '"Agree" is a main verb, not an adjective. Say "I agree" not "I am agree".', difficulty: 0.3 },
  },
  {
    id: 'item.ec.b1.06', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: { sentence: 'You don\'t should eat so much sugar.', errorPart: "don't should", correction: "shouldn't", explanation: 'Modal negation is "shouldn\'t" — never "don\'t should".', difficulty: 0.3 },
  },
  {
    id: 'item.ec.b1.07', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { sentence: 'She suggested me to apply for the job.', errorPart: 'me to apply', correction: 'that I apply', explanation: '"Suggest" does not follow the pattern "suggest + person + to verb". Use "suggest that + subject + verb".', difficulty: 0.4 },
  },
  {
    id: 'item.ec.b1.08', type: 'error_correction', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: { sentence: 'How long are you waiting here?', errorPart: 'are you waiting', correction: 'have you been waiting', explanation: '"How long" with a continuing action needs present perfect continuous: "have you been waiting".', difficulty: 0.4 },
  },

  // # ─── WORD FORMATION (8) ────────────────────────────────────────────
  {
    id: 'item.wf.b1.01', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'She gave a very ______ presentation at the conference.', rootWord: 'IMPRESS', acceptedAnswers: ['impressive'], explanation: 'Add -ive to "impress" to make the adjective "impressive".', difficulty: 0.35 },
  },
  {
    id: 'item.wf.b1.02', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'The ______ of the project took longer than expected.', rootWord: 'COMPLETE', acceptedAnswers: ['completion'], explanation: 'Change "complete" (verb/adjective) to "completion" (noun) by adding -ion.', difficulty: 0.4 },
  },
  {
    id: 'item.wf.b1.03', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'It is ______ to wear a seatbelt in a car.', rootWord: 'NECESSITY', acceptedAnswers: ['necessary'], explanation: 'Change the noun "necessity" to the adjective "necessary".', difficulty: 0.35 },
  },
  {
    id: 'item.wf.b1.04', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'He was ______ about the exam results.', rootWord: 'NERVE', acceptedAnswers: ['nervous'], explanation: 'Add -ous to "nerve" to make the adjective "nervous" (anxious).', difficulty: 0.35 },
  },
  {
    id: 'item.wf.b1.05', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'The police are conducting an ______ into the accident.', rootWord: 'INVESTIGATE', acceptedAnswers: ['investigation'], explanation: 'Change "investigate" (verb) to "investigation" (noun) by adding -ion.', difficulty: 0.4 },
  },
  {
    id: 'item.wf.b1.06', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'It was very ______ of you to forget her birthday.', rootWord: 'THOUGHT', acceptedAnswers: ['thoughtless'], explanation: 'Add -less to "thought" to mean "without thought" = "careless, inconsiderate".', difficulty: 0.4 },
  },
  {
    id: 'item.wf.b1.07', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'The ______ between the two candidates was very close.', rootWord: 'COMPETE', acceptedAnswers: ['competition'], explanation: 'Change "compete" (verb) to "competition" (noun).', difficulty: 0.35 },
  },
  {
    id: 'item.wf.b1.08', type: 'word_formation', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'She is incredibly ______ — she always knows the right thing to say.', rootWord: 'DIPLOMACY', acceptedAnswers: ['diplomatic'], explanation: 'Change the noun "diplomacy" to the adjective "diplomatic".', difficulty: 0.4 },
  },

  // # ─── MATCHING (6) ──────────────────────────────────────────────────
  {
    id: 'item.ma.b1.01', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'Match each phrasal verb to its meaning.', pairs: [
      { left: 'give up', right: 'stop trying' },
      { left: 'look after', right: 'take care of' },
      { left: 'put off', right: 'postpone to a later time' },
      { left: 'turn down', right: 'refuse or reject' },
      { left: 'find out', right: 'discover information' },
    ], difficulty: 0.35 },
  },
  {
    id: 'item.ma.b1.02', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'Match the sentence beginning to its correct ending.', pairs: [
      { left: 'If I were you,', right: "I'd see a doctor about that cough." },
      { left: 'Although it was raining,', right: 'we decided to go for a walk.' },
      { left: 'She studied hard', right: 'so that she could pass the exam.' },
      { left: 'Unless you hurry,', right: 'you will miss the train.' },
    ], difficulty: 0.4 },
  },
  {
    id: 'item.ma.b1.03', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.present_perfect'],
    payload: { stem: 'Match the time expression to the correct tense.', pairs: [
      { left: 'yesterday', right: 'past simple' },
      { left: 'since 2020', right: 'present perfect' },
      { left: 'every day', right: 'present simple' },
      { left: 'at the moment', right: 'present continuous' },
      { left: 'already', right: 'present perfect' },
    ], difficulty: 0.35 },
  },
  {
    id: 'item.ma.b1.04', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'Match each job to its description.', pairs: [
      { left: 'accountant', right: 'manages financial records and taxes' },
      { left: 'architect', right: 'designs buildings and structures' },
      { left: 'journalist', right: 'writes news articles and reports' },
      { left: 'surgeon', right: 'performs medical operations' },
    ], difficulty: 0.3 },
  },
  {
    id: 'item.ma.b1.05', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['lex.b1.work_education'],
    payload: { stem: 'Match the formal expression to its informal equivalent.', pairs: [
      { left: 'I would like to enquire about...', right: 'I want to ask about...' },
      { left: 'I am writing to inform you...', right: 'I wanted to tell you...' },
      { left: 'I would be grateful if...', right: 'Could you please...?' },
      { left: 'I look forward to hearing from you.', right: 'Hope to hear from you soon!' },
    ], difficulty: 0.35 },
  },
  {
    id: 'item.ma.b1.06', type: 'matching', level: 'B1', skill: 'general',
    nodeIds: ['gram.b1.modals'],
    payload: { stem: 'Match each modal verb to its function.', pairs: [
      { left: 'must', right: 'obligation or strong certainty' },
      { left: 'should', right: 'advice or recommendation' },
      { left: 'might', right: 'possibility (less certain)' },
      { left: 'can', right: 'ability or permission' },
    ], difficulty: 0.3 },
  },

  // # ─── DIALOGUE COMPLETION (6) ───────────────────────────────────────
  {
    id: 'item.dc.b1.01', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    payload: { stem: 'Complete the conversation about a job interview.', lines: [
      { speaker: 'Interviewer', text: 'So, tell me about yourself and your experience.' },
      { speaker: 'Candidate', text: null, acceptedAnswers: ['I graduated from university two years ago and I have been working as...', 'I have three years of experience in...', 'Well, I studied... and then I worked at...'], hint: 'Talk about your background.' },
      { speaker: 'Interviewer', text: 'Why do you want to work for this company?' },
      { speaker: 'Candidate', text: null, acceptedAnswers: ['I admire your company\'s reputation for...', 'I believe this role would help me develop my skills in...', 'I have always been interested in... and your company is a leader in this field.'], hint: 'Give a reason for wanting the job.' },
      { speaker: 'Interviewer', text: 'What would you say is your greatest strength?' },
      { speaker: 'Candidate', text: null, acceptedAnswers: ['I am a very organised person and I always meet deadlines.', 'I work well in a team and I am a good communicator.', 'I am quick to learn new things and I adapt easily.'], hint: 'Name a strength with an example.' },
    ], difficulty: 0.45 },
  },
  {
    id: 'item.dc.b1.02', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    payload: { stem: 'Complete the conversation making a complaint.', lines: [
      { speaker: 'Customer', text: null, acceptedAnswers: ['Excuse me, I ordered my food over 40 minutes ago and it still hasn\'t arrived.', 'I\'m sorry but I have a complaint about the service.'], hint: 'State your complaint politely.' },
      { speaker: 'Manager', text: 'I\'m very sorry about that. Let me check with the kitchen.' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['Thank you. I would appreciate that.', 'I hope it won\'t be much longer — I have a meeting at 2.'], hint: 'Respond to the apology.' },
      { speaker: 'Manager', text: 'Your order will be ready in five minutes. I\'d like to offer you a free dessert for the inconvenience.' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['That\'s very kind of you, thank you.', 'I appreciate that. Thank you for sorting it out.'], hint: 'Accept the compensation.' },
    ], difficulty: 0.4 },
  },
  {
    id: 'item.dc.b1.03', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    payload: { stem: 'Complete the conversation giving advice to a friend.', lines: [
      { speaker: 'Friend', text: 'I\'m really stressed about my exams. I can\'t sleep at night.' },
      { speaker: 'You', text: null, acceptedAnswers: ['I\'m sorry to hear that. Have you tried making a study plan?', 'That sounds tough. Maybe you should take short breaks between studying.', 'I understand. You should try to exercise — it helps with stress.'], hint: 'Give helpful advice.' },
      { speaker: 'Friend', text: 'That\'s a good idea. But I feel like I\'m running out of time.' },
      { speaker: 'You', text: null, acceptedAnswers: ['Try to focus on the most important topics first.', 'If I were you, I would prioritise the subjects you find hardest.', 'Don\'t try to study everything — focus on what\'s most likely to come up.'], hint: 'Give more specific advice.' },
    ], difficulty: 0.4 },
  },
  {
    id: 'item.dc.b1.04', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    payload: { stem: 'Complete the conversation discussing plans for the weekend.', lines: [
      { speaker: 'A', text: 'I was thinking of going to the beach this weekend. Do you want to come?' },
      { speaker: 'B', text: null, acceptedAnswers: ['That sounds great! What time are you thinking?', 'I\'d love to, but I\'m not sure I\'m free. Let me check.', 'Definitely! Should we invite anyone else?'], hint: 'Respond to the invitation.' },
      { speaker: 'A', text: 'We could leave around 9 in the morning. The forecast says it\'ll be sunny.' },
      { speaker: 'B', text: null, acceptedAnswers: ['Perfect. Should I bring anything?', 'Sounds good. I\'ll bring some sandwiches.', 'Great! I\'ll be ready by 9.'], hint: 'Agree on details.' },
    ], difficulty: 0.35 },
  },
  {
    id: 'item.dc.b1.05', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    payload: { stem: 'Complete the conversation at a bank.', lines: [
      { speaker: 'Clerk', text: 'Good morning. How can I help you?' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['I\'d like to open a savings account, please.', 'I want to transfer some money to another account.', 'I need to report a problem with my bank card.'], hint: 'State what you need.' },
      { speaker: 'Clerk', text: 'Of course. Do you have some ID with you?' },
      { speaker: 'Customer', text: null, acceptedAnswers: ['Yes, I have my passport here.', 'Yes, here is my driving licence.', 'I have my ID card.'], hint: 'Provide identification.' },
    ], difficulty: 0.35 },
  },
  {
    id: 'item.dc.b1.06', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine'],
    payload: { stem: 'Complete the phone conversation making an appointment.', lines: [
      { speaker: 'Receptionist', text: 'Good morning, City Dental Practice. How can I help?' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['Hello, I\'d like to make an appointment, please.', 'Hi, I need to book a check-up.', 'Good morning. Could I book an appointment with the dentist?'], hint: 'Ask for an appointment.' },
      { speaker: 'Receptionist', text: 'When would be convenient for you?' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['Is there anything available next week?', 'Could I come on Thursday afternoon?', 'Any time on Monday or Tuesday would be fine.'], hint: 'Suggest a time.' },
      { speaker: 'Receptionist', text: 'We have a slot at 2:30 on Thursday. Would that work?' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['Yes, that\'s perfect. Thank you.', 'That works for me. Thank you.', '2:30 on Thursday is fine.'], hint: 'Confirm the appointment.' },
    ], difficulty: 0.35 },
  },

  // # ─── EXTRA WRITING (3) ─────────────────────────────────────────────
  {
    id: 'item.wt.b1.03', type: 'writing_task', level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    payload: { prompt: 'Write an email to a friend describing a recent experience (e.g. a concert, a trip, a meal at a restaurant). Include what happened, how you felt, and whether you would recommend it. Write 120–180 words.', format: 'short_message', minWords: 120, maxWords: 200, timeMinutes: 20, rubric: [
      { name: 'Task Achievement', description: 'Describes the experience, includes feelings and recommendation', maxScore: 5 },
      { name: 'Coherence', description: 'Well-organised with connecting words', maxScore: 5 },
      { name: 'Vocabulary', description: 'Range of descriptive vocabulary', maxScore: 5 },
      { name: 'Grammar', description: 'Accurate use of past tenses', maxScore: 5 },
    ], modelAnswer: 'Hi Alex,\n\nI wanted to tell you about the amazing concert I went to last Saturday! It was an outdoor music festival in the park, and my favourite band was playing.\n\nWe arrived at about 4 in the afternoon. The atmosphere was incredible — there were thousands of people, and everyone was dancing and singing along. The band played all their best songs, and the lead singer even came into the crowd at one point!\n\nThe only problem was the weather. It started raining quite heavily during the last few songs, so we got completely soaked. But honestly, nobody cared — it actually made it even more fun.\n\nI would definitely recommend going to this festival if you get the chance. The tickets were quite affordable and the experience was unforgettable. Let me know if you want to go together next year!\n\nBest,\nSara', difficulty: 0.4 },
  },
  {
    id: 'item.wt.b1.04', type: 'writing_task', level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    payload: { prompt: 'Your school is thinking about banning mobile phones during school hours. Write a short article for the school magazine giving your opinion. Write 120–180 words.', format: 'essay', minWords: 120, maxWords: 200, timeMinutes: 25, rubric: [
      { name: 'Task Achievement', description: 'Clear opinion with supporting arguments', maxScore: 5 },
      { name: 'Coherence', description: 'Logical structure with linking words', maxScore: 5 },
      { name: 'Vocabulary', description: 'Topic-related vocabulary used accurately', maxScore: 5 },
      { name: 'Grammar', description: 'Accurate B1 structures', maxScore: 5 },
    ], modelAnswer: 'Should Phones Be Banned at School?\n\nOur school is considering banning mobile phones during school hours. In my opinion, this is a good idea, but with some conditions.\n\nFirstly, phones can be very distracting. Many students check social media during lessons instead of paying attention. This affects their learning and also disturbs other students. Secondly, when phones are not allowed, students talk to each other more during breaks, which is better for making friends.\n\nHowever, I think a complete ban would be too strict. Students should be allowed to use their phones during lunch and after school. Some students also use their phones to contact their parents about transport, and this should still be possible.\n\nIn conclusion, I believe phones should be switched off during lessons but allowed at other times. This way, students can focus on their studies while still having access to their phones when they need them.', difficulty: 0.4 },
  },
  {
    id: 'item.wt.b1.05', type: 'writing_task', level: 'B1', skill: 'writing',
    nodeIds: ['cando.b1.write_connected_text'],
    payload: { prompt: 'You recently moved to a new neighbourhood. Write a letter to a friend describing your new area. Include what is nearby, what you like and dislike about it, and invite your friend to visit. Write 120–180 words.', format: 'letter_informal', minWords: 120, maxWords: 200, timeMinutes: 20, rubric: [
      { name: 'Task Achievement', description: 'Describes area, gives likes/dislikes, includes invitation', maxScore: 5 },
      { name: 'Tone', description: 'Informal and friendly', maxScore: 5 },
      { name: 'Vocabulary', description: 'Range of descriptive and neighbourhood vocabulary', maxScore: 5 },
      { name: 'Grammar', description: 'Accurate use of present and past tenses', maxScore: 5 },
    ], modelAnswer: 'Dear Tom,\n\nHow are you? I wanted to let you know that we finally moved to our new flat! We\'ve been here for two weeks now and I\'m starting to feel at home.\n\nThe neighbourhood is really nice. There\'s a big park just five minutes away, and I go jogging there every morning. We also have a great bakery on the corner — their croissants are the best I\'ve ever tasted! There are lots of small shops and a cinema within walking distance too.\n\nThe only thing I don\'t love is the traffic noise. Our flat is on a busy road, and it can be quite loud in the mornings. But we\'re getting used to it.\n\nI\'d love for you to come and visit soon! We have a spare bedroom, so you could stay for the weekend. How about the first weekend in March?\n\nHope to see you soon!\nLucia', difficulty: 0.4 },
  },

  // # ─── EXTRA SPEAKING (3) ────────────────────────────────────────────
  {
    id: 'item.sp.b1.04', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: { prompt: 'Let\'s talk about learning English.', format: 'part1_short', followUpQuestions: ['Why are you learning English?', 'How do you usually practise English?', 'What do you find most difficult about English?', 'What advice would you give to someone starting to learn English?'], prepTimeSeconds: 0, speakTimeSeconds: 120, targetLanguage: ['I am learning English because...', 'I usually practise by...', 'The most difficult thing for me is...', 'I would advise them to...'], modelAnswerNotes: 'Each answer 2–3 sentences. Give reasons and examples. Show self-awareness about learning. Use present tenses for habits, would for advice.', difficulty: 0.35 },
  },
  {
    id: 'item.sp.b1.05', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: { prompt: 'Let\'s talk about health and fitness.', format: 'part1_short', followUpQuestions: ['Do you do any exercise?', 'What do you think is the best way to stay healthy?', 'Do people in your country care about being healthy?', 'Has your attitude to health changed as you have got older?'], prepTimeSeconds: 0, speakTimeSeconds: 120, targetLanguage: ['I try to... regularly.', 'In my opinion, the best way is...', 'Many people in my country...', 'When I was younger, I used to... but now...'], modelAnswerNotes: 'Answers of 2–3 sentences each. Show opinion + reason. Use "used to" for past habits. Demonstrate vocabulary: exercise, diet, lifestyle, well-being.', difficulty: 0.35 },
  },
  {
    id: 'item.sp.b1.06', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: { prompt: 'Let\'s talk about shopping.', format: 'part1_short', followUpQuestions: ['Do you prefer shopping online or in shops?', 'What was the last thing you bought?', 'Do you think people spend too much money on clothes?', 'How has shopping changed in recent years?'], prepTimeSeconds: 0, speakTimeSeconds: 120, targetLanguage: ['I prefer... because...', 'The last thing I bought was...', 'I think that...', 'Shopping has changed a lot because...'], modelAnswerNotes: 'Extend answers beyond yes/no. Use comparisons. Show awareness of change over time. Vocabulary: online shopping, bargain, delivery, brand, second-hand.', difficulty: 0.35 },
  },
]
