// # C2 expanded content — mastery level. Subjunctive, idiomatic language,
// # literary register, near-native nuance, advanced exam formats.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_C2_EXPANDED: UnifiedSeedItem[] = [
  // # ─── SENTENCE TRANSFORMATION (8) ────────────────────────────────────
  {
    id: 'item.st.c2.01', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { originalSentence: 'It is essential that every employee attends the safety briefing.', keyWord: 'attend', acceptedAnswers: ['It is essential that every employee attend the safety briefing.'], explanation: 'Subjunctive after "essential that": bare infinitive "attend" (not "attends"). The -s is dropped.', difficulty: 0.7 },
  },
  {
    id: 'item.st.c2.02', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { originalSentence: 'She had no idea how difficult the task would be.', keyWord: 'inkling', acceptedAnswers: ['She didn\'t have the slightest inkling how difficult the task would be.', 'She had not the slightest inkling of how difficult the task would be.'], explanation: '"No idea" → "not the slightest inkling" — idiomatic intensification at C2 level.', difficulty: 0.7 },
  },
  {
    id: 'item.st.c2.03', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { originalSentence: 'The committee recommended that the policy should be reviewed immediately.', keyWord: 'be', acceptedAnswers: ['The committee recommended that the policy be reviewed immediately.'], explanation: 'Subjunctive after "recommend that": "be reviewed" (bare infinitive), dropping "should".', difficulty: 0.7 },
  },
  {
    id: 'item.st.c2.04', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { originalSentence: 'The project barely avoided complete failure.', keyWord: 'skin', acceptedAnswers: ['The project avoided complete failure by the skin of its teeth.'], explanation: '"By the skin of one\'s teeth" = by a very narrow margin. Literary/idiomatic.', difficulty: 0.75 },
  },
  {
    id: 'item.st.c2.05', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { originalSentence: 'If I were the CEO, I would restructure the entire division.', keyWord: 'were', acceptedAnswers: ['Were I the CEO, I would restructure the entire division.'], explanation: 'Subjunctive inversion: "Were I" (without "if") — literary/formal register.', difficulty: 0.7 },
  },
  {
    id: 'item.st.c2.06', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { originalSentence: 'His explanation was very different from the truth.', keyWord: 'far', acceptedAnswers: ['His explanation was far removed from the truth.', 'His explanation was far from the truth.'], explanation: '"Far removed from" = extremely different from — more emphatic and literary than "very different".', difficulty: 0.65 },
  },
  {
    id: 'item.st.c2.07', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { originalSentence: 'The board insisted that he should resign immediately.', keyWord: 'resign', acceptedAnswers: ['The board insisted that he resign immediately.'], explanation: 'Subjunctive after "insist that": bare infinitive "resign" without "should".', difficulty: 0.65 },
  },
  {
    id: 'item.st.c2.08', type: 'sentence_transform', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { originalSentence: 'The government tried to make the scandal seem less serious.', keyWord: 'play', acceptedAnswers: ['The government tried to play down the scandal.', 'The government attempted to play down the scandal.'], explanation: '"Play down" = make something appear less important or serious than it is.', difficulty: 0.65 },
  },

  // # ─── ERROR CORRECTION (8) ──────────────────────────────────────────
  {
    id: 'item.ec.c2.01', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { sentence: 'The doctor recommended that the patient takes bed rest for a week.', errorPart: 'takes', correction: 'take', explanation: 'Subjunctive after "recommend that": bare infinitive "take" regardless of subject (not "takes").', difficulty: 0.65 },
  },
  {
    id: 'item.ec.c2.02', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { sentence: 'He was at his wit end trying to solve the problem.', errorPart: "wit end", correction: "wit's end", explanation: '"At one\'s wit\'s end" (possessive) — meaning utterly frustrated or baffled.', difficulty: 0.6 },
  },
  {
    id: 'item.ec.c2.03', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { sentence: 'The report shed a light on systemic corruption within the organisation.', errorPart: 'a light', correction: 'light', explanation: 'The idiom is "shed light on" (no article) — meaning to clarify or reveal.', difficulty: 0.6 },
  },
  {
    id: 'item.ec.c2.04', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { sentence: 'It is imperative that the regulations are enforced without exception.', errorPart: 'are enforced', correction: 'be enforced', explanation: 'Subjunctive after "imperative that": "be enforced" (bare infinitive), not "are enforced".', difficulty: 0.7 },
  },
  {
    id: 'item.ec.c2.05', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { sentence: 'The candidate\'s speech struck a cord with the audience.', errorPart: 'cord', correction: 'chord', explanation: '"Strike a chord" (musical metaphor) = resonate emotionally. "Cord" = a rope or wire.', difficulty: 0.6 },
  },
  {
    id: 'item.ec.c2.06', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { sentence: 'The new policy, for all intensive purposes, has been abandoned.', errorPart: 'intensive', correction: 'intents and', explanation: 'The phrase is "for all intents and purposes" — a common eggcorn error.', difficulty: 0.7 },
  },
  {
    id: 'item.ec.c2.07', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { sentence: 'Had the evidence not been tampered with, the verdict would of been different.', errorPart: 'would of', correction: 'would have', explanation: '"Would have" not "would of" — the contraction "would\'ve" sounds like "of" but is "have".', difficulty: 0.6 },
  },
  {
    id: 'item.ec.c2.08', type: 'error_correction', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { sentence: 'The journalist claimed that the policy was a damp squid that failed to inspire the electorate.', errorPart: 'squid', correction: 'squib', explanation: '"Damp squib" (a firework that fails to go off) — commonly misspelled as "damp squid". A classic eggcorn at C2 level.', difficulty: 0.7 },
  },

  // # ─── WORD FORMATION (6) ────────────────────────────────────────────
  {
    id: 'item.wf.c2.01', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'The minister\'s ______ at the press conference did little to quell public anger.', rootWord: 'CONTRITE', acceptedAnswers: ['contrition'], explanation: '"Contrite" (adjective) → "contrition" (noun) — deep remorse. High-register vocabulary.', difficulty: 0.7 },
  },
  {
    id: 'item.wf.c2.02', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'The court ruled that the defendant\'s actions were ______ reckless.', rootWord: 'CONSCIENCE', acceptedAnswers: ['unconscionably'], explanation: 'Un- + "conscionable" + -ly → "unconscionably" (to an unreasonable degree).', difficulty: 0.75 },
  },
  {
    id: 'item.wf.c2.03', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'Her speech was characterised by a quiet ______ that belied the gravity of the situation.', rootWord: 'STATE', acceptedAnswers: ['understatement'], explanation: '"Under-" + "state" + "-ment" → "understatement" — saying less than is warranted.', difficulty: 0.65 },
  },
  {
    id: 'item.wf.c2.04', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'The treaty was ratified ______ by all member states.', rootWord: 'UNANIMOUS', acceptedAnswers: ['unanimously'], explanation: '"Unanimous" (adjective) → "unanimously" (adverb) — with complete agreement.', difficulty: 0.6 },
  },
  {
    id: 'item.wf.c2.05', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'The artist\'s later works show an increasing ______ with themes of mortality.', rootWord: 'OCCUPY', acceptedAnswers: ['preoccupation'], explanation: '"Pre-" + "occupy" + "-ation" → "preoccupation" (an absorbing concern).', difficulty: 0.7 },
  },
  {
    id: 'item.wf.c2.06', type: 'word_formation', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'The ______ between her public persona and private reality was striking.', rootWord: 'CONGRUOUS', acceptedAnswers: ['incongruity'], explanation: '"In-" (negative) + "congruous" → "incongruity" (noun) — a lack of harmony or consistency.', difficulty: 0.75 },
  },

  // # ─── MATCHING (4) ──────────────────────────────────────────────────
  {
    id: 'item.ma.c2.01', type: 'matching', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'Match each idiom to its meaning.', pairs: [
      { left: 'a Pyrrhic victory', right: 'a win that costs more than it was worth' },
      { left: 'a red herring', right: 'a misleading clue or distraction' },
      { left: 'the Midas touch', right: 'the ability to make money from anything' },
      { left: 'a Sisyphean task', right: 'an endlessly futile effort' },
      { left: 'a Faustian bargain', right: 'a deal in which something vital is sacrificed for gain' },
    ], difficulty: 0.7 },
  },
  {
    id: 'item.ma.c2.02', type: 'matching', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'Match each rhetorical device to its example.', pairs: [
      { left: 'Litotes', right: '"She\'s not unintelligent." (meaning she is very smart)' },
      { left: 'Synecdoche', right: '"All hands on deck." (hands = sailors)' },
      { left: 'Chiasmus', right: '"Ask not what your country can do for you..."' },
      { left: 'Zeugma', right: '"She lowered her standards and her neckline."' },
    ], difficulty: 0.75 },
  },
  {
    id: 'item.ma.c2.03', type: 'matching', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: { stem: 'Match each commonly confused pair to the correct distinction.', pairs: [
      { left: 'disinterested / uninterested', right: 'impartial vs. not interested' },
      { left: 'flaunt / flout', right: 'show off vs. deliberately disobey' },
      { left: 'militate / mitigate', right: 'work against vs. make less severe' },
      { left: 'prescribe / proscribe', right: 'recommend vs. forbid' },
      { left: 'compliment / complement', right: 'praise vs. complete or enhance' },
    ], difficulty: 0.7 },
  },
  {
    id: 'item.ma.c2.04', type: 'matching', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: { stem: 'Match each subjunctive trigger to its example.', pairs: [
      { left: 'insist (that)', right: 'They insisted that she be present.' },
      { left: 'recommend (that)', right: 'I recommend that he take the earlier flight.' },
      { left: 'it is vital (that)', right: 'It is vital that the report be submitted on time.' },
      { left: 'wish', right: 'I wish I were taller.' },
    ], difficulty: 0.65 },
  },

  // # ─── DIALOGUE COMPLETION (4) ───────────────────────────────────────
  {
    id: 'item.dc.c2.01', type: 'dialogue_completion', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: { stem: 'Complete the high-level diplomatic exchange about trade policy.', lines: [
      { speaker: 'Ambassador A', text: 'Our position is that the proposed tariffs would undermine the multilateral framework that has underpinned trade stability for decades.' },
      { speaker: 'Ambassador B', text: null, acceptedAnswers: ['I appreciate the candour of your position. However, we would contend that the existing framework has not delivered equitable outcomes for developing economies, and targeted tariffs are a legitimate tool for rebalancing.', 'We share your commitment to multilateralism. Our concern, however, is that the current arrangements disproportionately benefit certain economies at the expense of others. The tariffs are not protectionist — they are corrective.'], hint: 'Acknowledge the position while defending a different stance.' },
      { speaker: 'Ambassador A', text: 'Corrective measures risk escalation. History shows that retaliatory cycles are difficult to contain.' },
      { speaker: 'Ambassador B', text: null, acceptedAnswers: ['That is precisely why we have proposed a sunset clause — the tariffs would be subject to biannual review and automatically expire if the trade deficit falls below the agreed threshold.', 'We are acutely aware of that risk, which is why we have built in safeguards. The tariffs are sector-specific and time-bound, and we remain open to renegotiation within the existing institutional framework.'], hint: 'Propose a safeguard that addresses the concern.' },
    ], difficulty: 0.8 },
  },
  {
    id: 'item.dc.c2.02', type: 'dialogue_completion', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: { stem: 'Complete the literary analysis discussion.', lines: [
      { speaker: 'Professor', text: 'Woolf\'s use of stream of consciousness in "Mrs Dalloway" has been widely discussed. But what do you think she achieves with it that a conventional narrative structure could not?' },
      { speaker: 'Student', text: null, acceptedAnswers: ['I think the technique allows Woolf to collapse the boundary between past and present in a way that mirrors the actual workings of memory. Clarissa\'s thoughts don\'t proceed linearly — they spiral, interrupt, and loop back, which gives the reader an experience of consciousness rather than merely a description of it.', 'What Woolf achieves is a kind of psychological realism that conventional narration can\'t reach. By immersing us directly in Clarissa\'s interiority, she reveals how identity is not fixed but constantly reconstructed through the interplay of sensation, memory, and social performance.'], hint: 'Explain what stream of consciousness achieves beyond plot-level storytelling.' },
    ], difficulty: 0.8 },
  },
  {
    id: 'item.dc.c2.03', type: 'dialogue_completion', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: { stem: 'Complete the cross-examination in a legal context.', lines: [
      { speaker: 'Barrister', text: 'You stated in your written testimony that you were at home on the evening of the 15th. Yet your phone records place you three miles from the scene at 9:47pm. Can you explain that discrepancy?' },
      { speaker: 'Witness', text: null, acceptedAnswers: ['My partner may have been using my phone that evening. I lent it to them earlier in the day and they hadn\'t returned it by then.', 'I should clarify — when I said I was at home, I was referring to the period after 10pm. Earlier that evening I had gone out briefly to collect a takeaway order.'], hint: 'Provide a plausible explanation for the discrepancy.' },
      { speaker: 'Barrister', text: 'So you accept that your earlier testimony was, at best, incomplete. Would you like to amend your statement?' },
      { speaker: 'Witness', text: null, acceptedAnswers: ['I accept that my statement could have been more precise, and I am happy to clarify. I was at home for the majority of the evening, but I was briefly out between approximately 9:30 and 10:15pm.', 'I would not characterise it as incomplete. I understood the question to relate to where I was when the incident occurred. If greater specificity is required, I am willing to provide a revised timeline.'], hint: 'Respond carefully, accepting or clarifying.' },
    ], difficulty: 0.8 },
  },
  {
    id: 'item.dc.c2.04', type: 'dialogue_completion', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: { stem: 'Complete the philosophical discussion about consciousness.', lines: [
      { speaker: 'A', text: 'Chalmers calls it the "hard problem" — why is there subjective experience at all? You can explain every neural process, but that still doesn\'t explain why there is something it is like to see red.' },
      { speaker: 'B', text: null, acceptedAnswers: ['That\'s the crux, isn\'t it? And I think it points to a fundamental limit of reductionist materialism. No matter how complete our neuroscience becomes, there\'s an explanatory gap between third-person brain states and first-person qualia.', 'I\'m sympathetic to the problem, but I wonder whether it\'s a genuine metaphysical puzzle or a conceptual artefact. Dennett would argue that once you explain all the functional properties of consciousness, there\'s nothing left to explain — the "hardness" is an illusion generated by our intuitions.'], hint: 'Engage with the hard problem — either accept or challenge it.' },
    ], difficulty: 0.85 },
  },

  // # ─── WRITING (3) — mastery level ───────────────────────────────────
  {
    id: 'item.wt.c2.03', type: 'writing_task', level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports', 'strat.ielts.task2_structure'],
    payload: { prompt: 'In an age of information overload, the ability to think critically is more important than ever. To what extent do you agree, and how should educational systems respond? Write at least 300 words.', format: 'essay', minWords: 300, maxWords: 450, timeMinutes: 45, rubric: [
      { name: 'Task Response', description: 'Nuanced, fully developed argument with a clear, well-justified position', maxScore: 9 },
      { name: 'Coherence & Cohesion', description: 'Seamless progression with sophisticated cohesive devices', maxScore: 9 },
      { name: 'Lexical Resource', description: 'Precise, idiomatic, near-native lexical control', maxScore: 9 },
      { name: 'Grammatical Range & Accuracy', description: 'Full command of advanced structures with only rare slips', maxScore: 9 },
    ], modelAnswer: 'In a world saturated with information — much of it contradictory, algorithmically curated, and designed to provoke rather than inform — the capacity to think critically has become less a desirable skill than a survival imperative.\n\nThe challenge is not simply that misinformation exists; it is that the architecture of modern communication actively undermines our ability to evaluate it. Social media platforms, optimised for engagement rather than accuracy, create epistemic environments in which emotionally resonant falsehoods outperform nuanced truths. In this context, an individual who lacks the tools to interrogate sources, identify logical fallacies, and resist cognitive biases is not merely uninformed — they are vulnerable.\n\nEducational systems have a pivotal role to play, but meaningful reform requires more than adding "critical thinking" as a curriculum label. What is needed is a pedagogical shift away from content acquisition towards epistemic inquiry. Students should learn not only what to think, but how to think about thinking: how to evaluate the reliability of evidence, how to recognise the difference between correlation and causation, and how to hold provisional beliefs that can be updated in light of new information.\n\nPractically, this means embedding critical analysis across every subject, not siloing it into a single module. A history lesson should teach source evaluation; a science class should model the difference between peer-reviewed findings and pre-print speculation; a literature course should explore how rhetoric constructs reality.\n\nCritics may argue that young children lack the cognitive maturity for such skills, but research in developmental psychology suggests otherwise. Age-appropriate critical thinking — distinguishing fact from opinion, asking "how do we know?" — can and should begin in primary education.\n\nUltimately, a society in which critical thinking is an elite skill rather than a universal competency is one in which democratic participation becomes performative. If education does not equip citizens to navigate complexity, no amount of fact-checking will suffice.', difficulty: 0.8 },
  },
  {
    id: 'item.wt.c2.04', type: 'writing_task', level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: { prompt: 'A literary journal has invited contributions on the theme "The Space Between Languages." Write a reflective essay exploring what is gained and what is lost in translation — drawing on specific examples from literature, culture, or your own experience. Write 250–400 words.', format: 'essay', minWords: 250, maxWords: 420, timeMinutes: 40, rubric: [
      { name: 'Content', description: 'Original, insightful engagement with the theme', maxScore: 5 },
      { name: 'Register', description: 'Sophisticated literary register appropriate to context', maxScore: 5 },
      { name: 'Vocabulary', description: 'Precise, evocative, literary-quality lexis', maxScore: 5 },
      { name: 'Grammar', description: 'Complete mastery — native-like fluency and range', maxScore: 5 },
    ], modelAnswer: 'The Space Between Languages\n\nEvery act of translation is an act of faith — faith that meaning can survive the crossing from one linguistic universe to another. And yet, as anyone who has attempted it knows, something always remains on the other shore.\n\nConsider the Portuguese word "saudade," famously untranslatable. It is often glossed as "longing" or "nostalgia," but these English approximations flatten a concept that carries within it the simultaneous presence of joy and sorrow — the happiness of having loved and the ache of absence. To translate "saudade" is to hold up a photograph of a sunset and call it the sunset itself.\n\nThis is not merely a lexical problem. Languages do not simply label a shared reality; they construct different realities. The Hopi language, Whorf observed, treats time not as a linear sequence but as a dynamic process. Whether or not Whorf\'s thesis holds in its strongest form, the intuition resonates: to speak a different language is, to some degree, to inhabit a different world.\n\nAnd yet translation persists — and flourishes. Gregory Rabassa\'s English rendering of García Márquez\'s "Cien Años de Soledad" was so admired that the author reportedly preferred it to his own original. This suggests that translation, at its best, is not a diminishment but a reinvention — a second creation that honours the spirit of the first while discovering new music in a different key.\n\nIn my own experience, moving between languages has been less a loss than a widening. There are things I can say in one language that I cannot say in another — not because the words are missing, but because the emotional architecture is different. Each language gives me a different self to think with.\n\nPerhaps, then, the space between languages is not a void but a generative threshold — the place where meaning is not destroyed but multiplied. And translation, far from betrayal, is the most intimate form of reading: a declaration that understanding, though imperfect, is worth the attempt.', difficulty: 0.85 },
  },
  {
    id: 'item.wt.c2.05', type: 'writing_task', level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: { prompt: 'Write a formal proposal to a research funding body for a study investigating the long-term psychological effects of remote work on employee well-being. Include the research rationale, methodology, and expected outcomes. Write 250–400 words.', format: 'essay', minWords: 250, maxWords: 420, timeMinutes: 40, rubric: [
      { name: 'Task Achievement', description: 'Clear rationale, rigorous methodology, realistic outcomes', maxScore: 5 },
      { name: 'Academic Register', description: 'Consistently formal, appropriately hedged', maxScore: 5 },
      { name: 'Vocabulary', description: 'Precise academic and research-specific terminology', maxScore: 5 },
      { name: 'Grammar', description: 'Full command of passive, conditional, nominal structures', maxScore: 5 },
    ], modelAnswer: 'Research Proposal: Longitudinal Effects of Remote Work on Psychological Well-being\n\nRationale\nThe rapid shift to remote working triggered by the COVID-19 pandemic has fundamentally altered employment patterns, with an estimated 35% of knowledge workers now operating remotely on a permanent or hybrid basis. While initial research focused on productivity and work-life balance, there is a conspicuous gap in our understanding of the long-term psychological effects of sustained remote work, particularly in relation to social isolation, professional identity, and boundary dissolution.\n\nThis study aims to address that gap by conducting a three-year longitudinal investigation into the psychological well-being of remote workers across multiple sectors and demographics.\n\nMethodology\nThe study will adopt a mixed-methods design:\n\n1. Quantitative component: A cohort of 500 participants (stratified by age, gender, sector, and remote work duration) will complete validated psychometric instruments — including the WHO-5 Well-Being Index, the UCLA Loneliness Scale, and the Maslach Burnout Inventory — at six-month intervals over three years.\n\n2. Qualitative component: A purposive subsample of 40 participants will take part in semi-structured interviews at 12 and 36 months, exploring subjective experiences of professional isolation, boundary management, and evolving attitudes to remote work.\n\nData will be analysed using multilevel modelling (quantitative) and thematic analysis (qualitative), with integration at the interpretation stage.\n\nExpected Outcomes\nWe anticipate that the findings will reveal a non-linear relationship between remote work duration and well-being — specifically, that initial improvements in autonomy and flexibility may be offset over time by cumulative effects of social disconnection and blurred work-life boundaries.\n\nThe study is expected to yield evidence-based recommendations for employers, policymakers, and occupational health practitioners regarding sustainable remote work models.\n\nBudget and Timeline\nThe total requested funding is £285,000 over 42 months, covering personnel costs, participant incentives, transcription services, and dissemination activities.\n\nEthical approval has been granted by the University Ethics Committee (ref. UEC-2026-0487).', difficulty: 0.8 },
  },

  // # ─── SPEAKING (3) — mastery ────────────────────────────────────────
  {
    id: 'item.sp.c2.04', type: 'speaking_prompt', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic', 'strat.ielts.part3_extend'],
    payload: { prompt: 'Let\'s discuss the concept of justice.', format: 'part3_discussion', followUpQuestions: ['Is true justice achievable, or is it an ideal we can only approximate?', 'How do cultural differences affect our understanding of justice?', 'Some philosophers argue that mercy and justice are incompatible. What is your view?', 'Should the justice system prioritise punishment, rehabilitation, or deterrence?'], prepTimeSeconds: 0, speakTimeSeconds: 360, targetLanguage: ['One might argue that...', 'This tension between... and... lies at the heart of...', 'It would be reductive to suggest that...', 'The question presupposes that... but in fact...'], modelAnswerNotes: 'Mastery-level abstract discussion. Each answer 5+ sentences. Demonstrate ability to: challenge premises, introduce philosophical concepts, use layered hedging. Vocabulary: retribution, restorative justice, deterrence, moral relativism, jurisprudence, equity. Show natural use of subjunctive, inversion, and rhetorical devices.', difficulty: 0.8 },
  },
  {
    id: 'item.sp.c2.05', type: 'speaking_prompt', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic', 'strat.ielts.part2_structure'],
    payload: { prompt: 'Describe a piece of art, music, or literature that changed your perspective on something.', format: 'part2_cue_card', cueCardPoints: ['what the work is and who created it', 'what it is about', 'what perspective it changed', 'why it had such an impact on you'], prepTimeSeconds: 60, speakTimeSeconds: 120, targetLanguage: ['What struck me most forcefully was...', 'It challenged my assumption that...', 'The work operates on multiple levels — on the surface... but beneath that...', 'It crystallised something I had been unable to articulate.'], modelAnswerNotes: 'Mastery monologue. Literary and analytical register. Show ability to discuss abstract ideas with precision and nuance. Use participial clauses, inversions, hedging, and metaphor naturally. Demonstrate genuine personal reflection beyond surface description.', difficulty: 0.8 },
  },
  {
    id: 'item.sp.c2.06', type: 'speaking_prompt', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic', 'strat.ielts.part3_extend'],
    payload: { prompt: 'Let\'s discuss the ethics of artificial intelligence.', format: 'part3_discussion', followUpQuestions: ['Should AI systems be held accountable for their decisions?', 'Is there a meaningful difference between artificial and human intelligence?', 'How should society balance innovation with precaution?', 'Could an AI ever truly understand human values?'], prepTimeSeconds: 0, speakTimeSeconds: 360, targetLanguage: ['The notion of accountability presupposes...', 'One could draw a distinction between...', 'The precautionary principle would suggest...', 'Whether an AI can "understand" depends on what we mean by...'], modelAnswerNotes: 'Top-tier discussion. Demonstrate: ability to define terms, distinguish concepts, challenge premises, use philosophical reasoning. Vocabulary: algorithmic bias, sentience, moral agency, epistemic humility, existential risk, alignment problem. Show complete grammatical mastery with natural, flowing delivery.', difficulty: 0.85 },
  },
]
