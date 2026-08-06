// # B2 expanded content — exam-quality items across all 12 types.
// # Heavy on IELTS/PTE/OET patterns: conditional rewrites, passive voice,
// # reported speech, abstract vocabulary, academic register.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_B2_EXPANDED: UnifiedSeedItem[] = [
  // # ─── SENTENCE TRANSFORMATION (8) ────────────────────────────────────
  {
    id: 'item.st.b2.01', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: { originalSentence: 'I didn\'t study hard, so I failed the exam.', keyWord: 'would', acceptedAnswers: ['If I had studied hard, I would have passed the exam.', 'I would have passed the exam if I had studied hard.'], explanation: 'Third conditional: If + past perfect, would have + past participle — expresses an unreal past.', difficulty: 0.55 },
  },
  {
    id: 'item.st.b2.02', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    payload: { originalSentence: 'They are building a new hospital in the city centre.', keyWord: 'being', acceptedAnswers: ['A new hospital is being built in the city centre.'], explanation: 'Present continuous passive: subject + is/are being + past participle.', difficulty: 0.5 },
  },
  {
    id: 'item.st.b2.03', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    payload: { originalSentence: '"I will call you tomorrow," she said.', keyWord: 'told', acceptedAnswers: ['She told me she would call me the next day.', 'She told me that she would call me the following day.'], explanation: 'Reported speech: "will" → "would", "tomorrow" → "the next day/the following day", "you" → "me".', difficulty: 0.5 },
  },
  {
    id: 'item.st.b2.04', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: { originalSentence: 'He is too young to drive a car.', keyWord: 'enough', acceptedAnswers: ['He is not old enough to drive a car.', 'He isn\'t old enough to drive a car.'], explanation: '"Too young to" → "not old enough to" — reversing the adjective and switching the structure.', difficulty: 0.45 },
  },
  {
    id: 'item.st.b2.05', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    payload: { originalSentence: 'People believe that the company will close next year.', keyWord: 'believed', acceptedAnswers: ['It is believed that the company will close next year.', 'The company is believed to be closing next year.'], explanation: 'Impersonal passive: "People believe..." → "It is believed that..." — common in academic/news register.', difficulty: 0.55 },
  },
  {
    id: 'item.st.b2.06', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    payload: { originalSentence: '"Don\'t touch the equipment," the technician warned us.', keyWord: 'warned', acceptedAnswers: ['The technician warned us not to touch the equipment.'], explanation: 'Reported commands: "Don\'t + verb" → "warned + object + not to + verb".', difficulty: 0.5 },
  },
  {
    id: 'item.st.b2.07', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: { originalSentence: 'I regret not learning to play the piano.', keyWord: 'wish', acceptedAnswers: ['I wish I had learned to play the piano.', 'I wish I had learnt to play the piano.'], explanation: '"Regret not doing" → "wish + past perfect" for past regrets.', difficulty: 0.5 },
  },
  {
    id: 'item.st.b2.08', type: 'sentence_transform', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    payload: { originalSentence: 'Someone stole my laptop from the office.', keyWord: 'had', acceptedAnswers: ['I had my laptop stolen from the office.'], explanation: 'Causative "have something done" — used for things that happen to you (often unpleasant).', difficulty: 0.55 },
  },

  // # ─── ERROR CORRECTION (8) ──────────────────────────────────────────
  {
    id: 'item.ec.b2.01', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: { sentence: 'If I would have known, I would have come earlier.', errorPart: 'would have known', correction: 'had known', explanation: 'Third conditional: If + past perfect (had known), NOT "would have known" in the if-clause.', difficulty: 0.5 },
  },
  {
    id: 'item.ec.b2.02', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    payload: { sentence: 'She told that she was feeling unwell.', errorPart: 'told that', correction: 'said that', explanation: '"Tell" requires an object: "She told me that..." or use "said that" without an object.', difficulty: 0.45 },
  },
  {
    id: 'item.ec.b2.03', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    payload: { sentence: 'The report was been reviewed by the manager.', errorPart: 'was been', correction: 'has been', explanation: 'Present perfect passive: "has been reviewed" — not "was been reviewed".', difficulty: 0.45 },
  },
  {
    id: 'item.ec.b2.04', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { sentence: 'Despite of the rain, the event went ahead as planned.', errorPart: 'Despite of', correction: 'Despite', explanation: '"Despite" never takes "of". Use "despite the rain" or "in spite of the rain".', difficulty: 0.4 },
  },
  {
    id: 'item.ec.b2.05', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: { sentence: 'I wish I can speak French fluently.', errorPart: 'can', correction: 'could', explanation: '"Wish" for present situations uses past tense: "I wish I could" not "I wish I can".', difficulty: 0.45 },
  },
  {
    id: 'item.ec.b2.06', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { sentence: 'The data suggests that the economy is in recover.', errorPart: 'recover', correction: 'recovery', explanation: '"In" + noun form: "in recovery" not "in recover". "Recover" is a verb.', difficulty: 0.4 },
  },
  {
    id: 'item.ec.b2.07', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    payload: { sentence: 'He asked me where do I work.', errorPart: 'do I work', correction: 'I worked', explanation: 'Reported questions use statement word order (no inversion, no "do"): "where I worked".', difficulty: 0.45 },
  },
  {
    id: 'item.ec.b2.08', type: 'error_correction', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { sentence: 'The research aims to investigate the affect of social media on mental health.', errorPart: 'affect', correction: 'effect', explanation: '"Effect" (noun) = the result. "Affect" (verb) = to influence. Here a noun is needed.', difficulty: 0.45 },
  },

  // # ─── WORD FORMATION (8) ────────────────────────────────────────────
  {
    id: 'item.wf.b2.01', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'The government introduced new ______ to protect the environment.', rootWord: 'LEGISLATE', acceptedAnswers: ['legislation'], explanation: 'Change "legislate" (verb) to "legislation" (noun) — formal register.', difficulty: 0.5 },
  },
  {
    id: 'item.wf.b2.02', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'There has been a ______ improvement in air quality over the past decade.', rootWord: 'SIGNIFY', acceptedAnswers: ['significant'], explanation: 'Change "signify" (verb) to "significant" (adjective).', difficulty: 0.5 },
  },
  {
    id: 'item.wf.b2.03', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'The scientist\'s discovery was truly ______.', rootWord: 'REMARK', acceptedAnswers: ['remarkable'], explanation: 'Add -able to "remark" to form "remarkable" (worthy of notice).', difficulty: 0.45 },
  },
  {
    id: 'item.wf.b2.04', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'The policy was criticised for its ______ towards certain groups.', rootWord: 'FAIR', acceptedAnswers: ['unfairness'], explanation: 'Add un- (negative prefix) and -ness (noun suffix) to "fair" → "unfairness".', difficulty: 0.5 },
  },
  {
    id: 'item.wf.b2.05', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'The report highlighted the need for greater ______ in public services.', rootWord: 'EFFICIENT', acceptedAnswers: ['efficiency'], explanation: 'Change "efficient" (adjective) to "efficiency" (noun).', difficulty: 0.45 },
  },
  {
    id: 'item.wf.b2.06', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'The documentary provides an ______ account of the crisis.', rootWord: 'INFORM', acceptedAnswers: ['informative'], explanation: 'Add -ative to "inform" to make "informative" (giving useful information).', difficulty: 0.45 },
  },
  {
    id: 'item.wf.b2.07', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'His ______ to the project was widely recognised.', rootWord: 'CONTRIBUTE', acceptedAnswers: ['contribution'], explanation: 'Change "contribute" (verb) to "contribution" (noun).', difficulty: 0.45 },
  },
  {
    id: 'item.wf.b2.08', type: 'word_formation', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'The company is ______ committed to reducing its carbon footprint.', rootWord: 'DEEP', acceptedAnswers: ['deeply'], explanation: 'Change "deep" (adjective) to "deeply" (adverb) to modify "committed".', difficulty: 0.4 },
  },

  // # ─── MATCHING (6) ──────────────────────────────────────────────────
  {
    id: 'item.ma.b2.01', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'Match each academic verb to its definition.', pairs: [
      { left: 'analyse', right: 'examine something in detail to understand it' },
      { left: 'evaluate', right: 'judge the quality or importance of something' },
      { left: 'synthesise', right: 'combine different ideas into a coherent whole' },
      { left: 'hypothesise', right: 'suggest a possible explanation to be tested' },
      { left: 'substantiate', right: 'provide evidence to support a claim' },
    ], difficulty: 0.5 },
  },
  {
    id: 'item.ma.b2.02', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.conditionals'],
    payload: { stem: 'Match each conditional type to its example.', pairs: [
      { left: 'Zero conditional', right: 'If you heat water to 100°C, it boils.' },
      { left: 'First conditional', right: 'If it rains tomorrow, we will cancel the picnic.' },
      { left: 'Second conditional', right: 'If I had more time, I would learn Japanese.' },
      { left: 'Third conditional', right: 'If she had left earlier, she would have caught the train.' },
    ], difficulty: 0.45 },
  },
  {
    id: 'item.ma.b2.03', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'Match each discourse marker to its function.', pairs: [
      { left: 'Nevertheless', right: 'introducing a contrasting point' },
      { left: 'Furthermore', right: 'adding a supporting point' },
      { left: 'Consequently', right: 'showing a result' },
      { left: 'In other words', right: 'rephrasing for clarity' },
    ], difficulty: 0.45 },
  },
  {
    id: 'item.ma.b2.04', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.passive'],
    payload: { stem: 'Match the active sentence to its passive equivalent.', pairs: [
      { left: 'They cancelled the flight.', right: 'The flight was cancelled.' },
      { left: 'Someone has stolen the painting.', right: 'The painting has been stolen.' },
      { left: 'They are investigating the case.', right: 'The case is being investigated.' },
      { left: 'They will announce the results tomorrow.', right: 'The results will be announced tomorrow.' },
    ], difficulty: 0.45 },
  },
  {
    id: 'item.ma.b2.05', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: { stem: 'Match each prefix to its meaning.', pairs: [
      { left: 'anti-', right: 'against' },
      { left: 'mis-', right: 'wrongly' },
      { left: 'over-', right: 'too much' },
      { left: 'under-', right: 'not enough' },
      { left: 'pre-', right: 'before' },
    ], difficulty: 0.4 },
  },
  {
    id: 'item.ma.b2.06', type: 'matching', level: 'B2', skill: 'general',
    nodeIds: ['gram.b2.reported_speech'],
    payload: { stem: 'Match the direct speech to the correct reported form.', pairs: [
      { left: '"I am tired," she said.', right: 'She said she was tired.' },
      { left: '"We have finished," they said.', right: 'They said they had finished.' },
      { left: '"I will help you," he said.', right: 'He said he would help me.' },
      { left: '"I can swim," she said.', right: 'She said she could swim.' },
    ], difficulty: 0.45 },
  },

  // # ─── DIALOGUE COMPLETION (6) ───────────────────────────────────────
  {
    id: 'item.dc.b2.01', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    payload: { stem: 'Complete the discussion about working from home.', lines: [
      { speaker: 'A', text: 'I think working from home is better for productivity. You don\'t have commuting time and fewer distractions.' },
      { speaker: 'B', text: null, acceptedAnswers: ['I see your point, but I think some people actually find it harder to concentrate at home, especially if they have children.', 'That\'s partly true, but on the other hand, working in an office gives you structure and face-to-face collaboration.'], hint: 'Partially agree and give a counter-argument.' },
      { speaker: 'A', text: 'That\'s fair. I suppose a hybrid model might be the best compromise.' },
      { speaker: 'B', text: null, acceptedAnswers: ['I agree. A mix of both would give people flexibility without losing the benefits of being in the office.', 'Absolutely. That way employees get the best of both worlds — flexibility and teamwork.'], hint: 'Agree and elaborate on the compromise.' },
    ], difficulty: 0.5 },
  },
  {
    id: 'item.dc.b2.02', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    payload: { stem: 'Complete the formal email exchange about a project deadline.', lines: [
      { speaker: 'Manager', text: 'I need the final report by Friday. Is that feasible?' },
      { speaker: 'Employee', text: null, acceptedAnswers: ['I appreciate the urgency, but given the scope of the remaining analysis, I would need until Monday to deliver a thorough report. Would that be acceptable?', 'I understand the deadline, but I\'m concerned that rushing it could affect the quality. Would it be possible to extend it to early next week?'], hint: 'Negotiate the deadline professionally.' },
      { speaker: 'Manager', text: 'I understand your concern. Could you send a preliminary version by Friday and the final one by Monday?' },
      { speaker: 'Employee', text: null, acceptedAnswers: ['That sounds like a reasonable compromise. I can have the executive summary and key findings ready by Friday, with the complete report on Monday.', 'Yes, that would work well. I\'ll prioritise the critical sections for Friday.'], hint: 'Accept the compromise with specifics.' },
    ], difficulty: 0.55 },
  },
  {
    id: 'item.dc.b2.03', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    payload: { stem: 'Complete the conversation about environmental issues.', lines: [
      { speaker: 'Interviewer', text: 'Some people say that individual action is pointless because climate change requires systemic change. What do you think?' },
      { speaker: 'Candidate', text: null, acceptedAnswers: ['I believe both are necessary. While government policy is essential for large-scale change, individual choices create demand for sustainable products and put pressure on companies.', 'I partially agree — systemic change is crucial. However, individual actions raise awareness and can influence policy when they happen collectively.'], hint: 'Give a balanced opinion with reasoning.' },
      { speaker: 'Interviewer', text: 'Can you give an example?' },
      { speaker: 'Candidate', text: null, acceptedAnswers: ['For instance, the growing demand for electric vehicles has pushed major car manufacturers to invest billions in EV technology. That started with individual consumer choices.', 'A good example is the reduction in single-use plastic. Public pressure led to government bans, which shows how individual concern can drive policy.'], hint: 'Support your point with a concrete example.' },
    ], difficulty: 0.55 },
  },
  {
    id: 'item.dc.b2.04', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    payload: { stem: 'Complete the conversation at a doctor\'s appointment.', lines: [
      { speaker: 'Doctor', text: 'So, you mentioned you\'ve been having headaches. How often do they occur?' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['They\'ve been happening about three or four times a week for the past month. They usually start in the afternoon.', 'Almost daily for the last few weeks. They tend to be worse in the evening, especially after screen time.'], hint: 'Describe frequency and pattern.' },
      { speaker: 'Doctor', text: 'I see. And have you noticed anything that makes them better or worse?' },
      { speaker: 'Patient', text: null, acceptedAnswers: ['They get worse when I\'m stressed or haven\'t slept well. Painkillers help temporarily but the headache usually comes back.', 'I\'ve noticed they\'re triggered by bright lights and noise. Resting in a dark room seems to help.'], hint: 'Describe triggers and what helps.' },
    ], difficulty: 0.45 },
  },
  {
    id: 'item.dc.b2.05', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    payload: { stem: 'Complete the presentation Q&A session.', lines: [
      { speaker: 'Audience member', text: 'Your data shows a correlation between social media use and anxiety. But correlation isn\'t causation. How can you be sure?' },
      { speaker: 'Presenter', text: null, acceptedAnswers: ['That\'s an excellent point. You\'re right that we cannot establish causation from this data alone. However, several longitudinal studies have shown that increased social media use precedes anxiety symptoms, which strengthens the argument.', 'I appreciate the question. While our study is correlational, it\'s consistent with experimental research that has manipulated social media use and measured the effects.'], hint: 'Acknowledge the limitation and defend your position.' },
    ], difficulty: 0.6 },
  },
  {
    id: 'item.dc.b2.06', type: 'dialogue_completion', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract'],
    payload: { stem: 'Complete the conversation about travel.', lines: [
      { speaker: 'A', text: 'I\'m thinking of travelling solo for the first time. Any tips?' },
      { speaker: 'B', text: null, acceptedAnswers: ['Absolutely! I\'d recommend starting with a country where English is widely spoken and the public transport is reliable. That takes away a lot of the stress.', 'I think it\'s a great idea. My biggest tip would be to stay in hostels — you\'ll meet other travellers and won\'t feel lonely.'], hint: 'Give practical travel advice.' },
      { speaker: 'A', text: 'I\'m a bit nervous about safety though. Is it something you worried about?' },
      { speaker: 'B', text: null, acceptedAnswers: ['I was at first, but I found that as long as you stay aware of your surroundings, trust your instincts, and keep copies of your documents, you\'ll be fine.', 'It\'s natural to feel that way. I\'d suggest researching your destination beforehand and sharing your itinerary with someone at home.'], hint: 'Reassure and give safety tips.' },
    ], difficulty: 0.5 },
  },

  // # ─── EXTRA WRITING (4) — IELTS/PTE style ──────────────────────────
  {
    id: 'item.wt.b2.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: { prompt: 'Some people believe that university education should be free for all students. Others think that students should pay for their own education. Discuss both views and give your own opinion. Write at least 250 words.', format: 'essay', minWords: 250, maxWords: 350, timeMinutes: 40, rubric: [
      { name: 'Task Response', description: 'Addresses both views with a clear position', maxScore: 9 },
      { name: 'Coherence & Cohesion', description: 'Well-organised with clear progression', maxScore: 9 },
      { name: 'Lexical Resource', description: 'Wide range of vocabulary used accurately', maxScore: 9 },
      { name: 'Grammatical Range & Accuracy', description: 'Varied structures with few errors', maxScore: 9 },
    ], modelAnswer: 'The question of whether higher education should be funded by the state or by individual students is a topic of considerable debate. While there are strong arguments on both sides, I believe that a balanced approach is most effective.\n\nThose who advocate for free university education argue that it promotes equality of opportunity. When tuition fees are removed, students from disadvantaged backgrounds can access the same opportunities as their wealthier peers. Furthermore, an educated population benefits society as a whole through higher productivity, innovation, and lower unemployment.\n\nOn the other hand, opponents contend that making university free places an unsustainable burden on taxpayers. They argue that graduates typically earn significantly more over their lifetimes, so it is reasonable for them to contribute to the cost of their education. Additionally, when students invest financially in their studies, they may be more motivated to succeed.\n\nIn my view, the ideal solution lies between these two extremes. Governments should subsidise higher education to ensure affordability, while students contribute a manageable amount, potentially through income-contingent repayment schemes. This ensures that financial barriers do not prevent talented individuals from pursuing education, while also maintaining the fiscal sustainability of the system.\n\nIn conclusion, while completely free education is an admirable goal, a shared funding model strikes the right balance between accessibility and responsibility.', difficulty: 0.55 },
  },
  {
    id: 'item.wt.b2.04', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    payload: { prompt: 'Write a formal letter of complaint to a hotel manager about your recent stay. Describe the problems you experienced, explain how they affected your holiday, and state what action you expect the hotel to take. Write 180–250 words.', format: 'letter_formal', minWords: 180, maxWords: 280, timeMinutes: 30, rubric: [
      { name: 'Task Achievement', description: 'All three bullet points addressed with detail', maxScore: 5 },
      { name: 'Register', description: 'Consistently formal tone throughout', maxScore: 5 },
      { name: 'Vocabulary', description: 'Appropriate formal vocabulary', maxScore: 5 },
      { name: 'Grammar', description: 'Accurate complex structures', maxScore: 5 },
    ], modelAnswer: 'Dear Sir/Madam,\n\nI am writing to express my dissatisfaction with my recent stay at your hotel from 15 to 22 July. I had booked a sea-view room with full board, and I regret to say that the experience fell considerably short of expectations.\n\nFirstly, the room I was given overlooked the car park rather than the sea, despite my booking confirmation clearly stating otherwise. When I raised this at reception, I was told that no sea-view rooms were available and no alternative was offered. Secondly, the air conditioning unit in the room was broken throughout our stay. Given that temperatures exceeded 35°C during the day, this made it extremely difficult to sleep at night. I reported this on two occasions, but no engineer was sent.\n\nThese issues significantly affected our holiday experience. We had chosen your hotel specifically for its advertised views and facilities, and we were deeply disappointed.\n\nI would appreciate a partial refund to reflect the room downgrade and the broken air conditioning. I would also expect a written apology and assurance that such issues will not recur for future guests.\n\nI look forward to receiving your response within 14 working days.\n\nYours faithfully,\nDavid Chen', difficulty: 0.55 },
  },
  {
    id: 'item.wt.b2.05', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay'],
    payload: { prompt: 'You have been asked to write a report for your college principal about the facilities available for students. Describe the current situation, identify the main problems, and make recommendations for improvement. Write 180–250 words.', format: 'essay', minWords: 180, maxWords: 280, timeMinutes: 30, rubric: [
      { name: 'Task Achievement', description: 'Covers situation, problems, and recommendations', maxScore: 5 },
      { name: 'Organisation', description: 'Clear report structure with sections', maxScore: 5 },
      { name: 'Vocabulary', description: 'Formal, semi-academic register', maxScore: 5 },
      { name: 'Grammar', description: 'Accurate use of passive, conditionals', maxScore: 5 },
    ], modelAnswer: 'Report on Student Facilities\n\nIntroduction\nThe purpose of this report is to evaluate the current facilities available to students and to suggest improvements.\n\nCurrent Situation\nThe college offers a library, a computer lab, a canteen, and a sports hall. These facilities are generally adequate for the current student population. The library, in particular, is well-stocked and popular among students.\n\nProblems Identified\nHowever, several issues have been raised. The computer lab has only 20 workstations for over 500 students, which means there are often long waiting times during busy periods. The canteen menu is limited and does not cater for students with dietary requirements. Additionally, the sports hall is only available during term time and closes at 5pm, which is inconvenient for students who attend evening classes.\n\nRecommendations\nI would recommend the following improvements:\n1. The computer lab should be expanded or a second lab opened, with laptops available for loan.\n2. The canteen should introduce vegetarian, vegan, and halal options.\n3. The sports hall opening hours should be extended to 9pm and access provided during holidays.\n\nIf implemented, these changes would significantly enhance the student experience and demonstrate the college\'s commitment to supporting its students.', difficulty: 0.55 },
  },
  {
    id: 'item.wt.b2.06', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: { prompt: 'In many countries, the gap between the rich and the poor is increasing. What problems does this cause? What solutions can you suggest? Write at least 250 words.', format: 'essay', minWords: 250, maxWords: 350, timeMinutes: 40, rubric: [
      { name: 'Task Response', description: 'Identifies problems and proposes solutions', maxScore: 9 },
      { name: 'Coherence & Cohesion', description: 'Logical paragraphing with cohesive devices', maxScore: 9 },
      { name: 'Lexical Resource', description: 'Topic-specific vocabulary used naturally', maxScore: 9 },
      { name: 'Grammatical Range & Accuracy', description: 'Complex structures with minimal errors', maxScore: 9 },
    ], modelAnswer: 'The widening gap between affluent and disadvantaged members of society is a pressing global issue that carries significant social and economic consequences.\n\nOne of the most serious problems caused by wealth inequality is reduced access to essential services. In many countries, healthcare and education quality are directly linked to income. Those who cannot afford private healthcare may face long waiting times or substandard treatment, while children from low-income families often attend under-resourced schools. This creates a cycle of disadvantage that persists across generations.\n\nFurthermore, extreme inequality can lead to social instability. When a significant proportion of the population feels economically excluded, frustration and resentment grow. This can manifest in higher crime rates, political polarisation, and civil unrest, as has been observed in numerous countries experiencing rapid economic divergence.\n\nTo address these challenges, governments should consider implementing progressive taxation systems that require wealthier individuals and corporations to contribute proportionally more. The revenue generated could fund universal healthcare, improve public education, and expand social safety nets.\n\nAdditionally, investment in vocational training and skills development programmes would help bridge the employment gap. By equipping individuals with marketable skills, governments can promote upward mobility and reduce dependency on welfare.\n\nIn conclusion, while the causes of wealth inequality are complex, a combination of fair taxation, investment in public services, and skills development can help create a more equitable society. Without decisive action, the consequences of inaction will continue to undermine social cohesion and economic stability.', difficulty: 0.6 },
  },

  // # ─── EXTRA SPEAKING (3) — IELTS Part 2/3 style ────────────────────
  {
    id: 'item.sp.b2.04', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part2_structure'],
    payload: { prompt: 'Describe a skill you would like to learn.', format: 'part2_cue_card', cueCardPoints: ['what the skill is', 'why you want to learn it', 'how you would learn it', 'how difficult you think it would be'], prepTimeSeconds: 60, speakTimeSeconds: 120, targetLanguage: ['I would like to learn...', 'The reason I am interested in this is...', 'I think the best way to learn would be...', 'I imagine it would be quite challenging because...'], modelAnswerNotes: 'Sustained monologue 1–2 minutes. Cover all cue card points. Use conditionals and hedging language. Show range with complex structures.', difficulty: 0.5 },
  },
  {
    id: 'item.sp.b2.05', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: { prompt: 'Let\'s discuss the topic of technology and education.', format: 'part3_discussion', followUpQuestions: ['How has technology changed the way students learn?', 'Do you think online learning is as effective as face-to-face teaching?', 'What are the risks of children spending too much time on screens?', 'How do you think classrooms will change in the next 20 years?'], prepTimeSeconds: 0, speakTimeSeconds: 240, targetLanguage: ['Technology has fundamentally changed...', 'While online learning offers... it lacks...', 'There is growing concern that...', 'In the future, I believe...'], modelAnswerNotes: 'Extended discussion answers. Each response 3–4 sentences with examples. Show ability to compare, speculate, and evaluate. Use discourse markers: "Having said that", "On the whole", "It\'s worth noting that".', difficulty: 0.55 },
  },
  {
    id: 'item.sp.b2.06', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part2_structure'],
    payload: { prompt: 'Describe a time when you had to make a difficult decision.', format: 'part2_cue_card', cueCardPoints: ['what the decision was', 'why it was difficult', 'what you decided', 'whether you think you made the right choice'], prepTimeSeconds: 60, speakTimeSeconds: 120, targetLanguage: ['The decision I had to make was...', 'It was particularly difficult because...', 'In the end, I decided to...', 'Looking back, I believe it was the right/wrong decision because...'], modelAnswerNotes: 'Past tense narrative with reflection. Cover all four points. Use past perfect for background events. Show evaluation and reflection. Demonstrate range with phrases like "weighing up the options", "taking everything into consideration".', difficulty: 0.5 },
  },
]
