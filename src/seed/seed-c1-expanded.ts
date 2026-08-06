// # C1 expanded content — advanced academic/professional register.
// # Inversion, cleft sentences, academic vocabulary, nuanced argumentation.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_C1_EXPANDED: UnifiedSeedItem[] = [
  // # ─── SENTENCE TRANSFORMATION (8) ────────────────────────────────────
  {
    id: 'item.st.c1.01', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: { originalSentence: 'I had never seen such a magnificent sunset.', keyWord: 'never', acceptedAnswers: ['Never had I seen such a magnificent sunset.', 'Never before had I seen such a magnificent sunset.'], explanation: 'Inversion with negative adverbs: "Never" at the start triggers auxiliary-subject inversion ("had I" not "I had").', difficulty: 0.65 },
  },
  {
    id: 'item.st.c1.02', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: { originalSentence: 'The lack of funding caused the project to fail.', keyWord: 'what', acceptedAnswers: ['What caused the project to fail was the lack of funding.'], explanation: 'Wh-cleft: "What + verb + was + focus" — emphasises the cause by fronting it.', difficulty: 0.65 },
  },
  {
    id: 'item.st.c1.03', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: { originalSentence: 'She not only speaks French, but she also writes novels in it.', keyWord: 'only', acceptedAnswers: ['Not only does she speak French, but she also writes novels in it.'], explanation: '"Not only" at the start triggers inversion: "does she speak" not "she speaks".', difficulty: 0.6 },
  },
  {
    id: 'item.st.c1.04', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: { originalSentence: 'His arrogance annoyed everyone.', keyWord: 'it', acceptedAnswers: ['It was his arrogance that annoyed everyone.'], explanation: 'It-cleft: "It was + focus + that/who + rest" — highlights "his arrogance" as the key element.', difficulty: 0.6 },
  },
  {
    id: 'item.st.c1.05', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: { originalSentence: 'The delegates realised the full extent of the crisis only when the report was published.', keyWord: 'only', acceptedAnswers: ['Only when the report was published did the delegates realise the full extent of the crisis.'], explanation: '"Only when/after/if" at the start triggers inversion in the main clause.', difficulty: 0.7 },
  },
  {
    id: 'item.st.c1.06', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { originalSentence: 'Although the evidence is compelling, the theory has not been universally accepted.', keyWord: 'notwithstanding', acceptedAnswers: ['Notwithstanding the compelling evidence, the theory has not been universally accepted.', 'The evidence notwithstanding, the theory has not been universally accepted.'], explanation: '"Although" → "Notwithstanding" (formal concession) — can precede or follow the noun phrase.', difficulty: 0.65 },
  },
  {
    id: 'item.st.c1.07', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: { originalSentence: 'As soon as she had finished her speech, the audience burst into applause.', keyWord: 'sooner', acceptedAnswers: ['No sooner had she finished her speech than the audience burst into applause.'], explanation: '"No sooner + had + subject + past participle + than" — formal correlative with inversion.', difficulty: 0.7 },
  },
  {
    id: 'item.st.c1.08', type: 'sentence_transform', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: { originalSentence: 'We need to address the underlying causes, not just the symptoms.', keyWord: 'what', acceptedAnswers: ['What we need to address is the underlying causes, not just the symptoms.', 'What we need to address are the underlying causes, not just the symptoms.'], explanation: 'Wh-cleft fronts "what we need" to emphasise the focus — both singular and plural copula are accepted.', difficulty: 0.6 },
  },

  // # ─── ERROR CORRECTION (8) ──────────────────────────────────────────
  {
    id: 'item.ec.c1.01', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: { sentence: 'Seldom the committee has reached a unanimous decision.', errorPart: 'the committee has', correction: 'has the committee', explanation: 'Negative adverb "seldom" at the start requires inversion: "has the committee" not "the committee has".', difficulty: 0.6 },
  },
  {
    id: 'item.ec.c1.02', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { sentence: 'The study was carried out in order to investigate the affect of poverty on educational outcomes.', errorPart: 'affect', correction: 'effect', explanation: '"Effect" (noun) = result/impact. "Affect" (verb) = influence. Common C1 academic error.', difficulty: 0.55 },
  },
  {
    id: 'item.ec.c1.03', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { sentence: 'The evidence is not enough substantial to support the hypothesis.', errorPart: 'enough substantial', correction: 'substantial enough', explanation: '"Enough" follows adjectives: "substantial enough" not "enough substantial".', difficulty: 0.55 },
  },
  {
    id: 'item.ec.c1.04', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: { sentence: 'Not until the results were published the researchers understood the implications.', errorPart: 'the researchers understood', correction: 'did the researchers understand', explanation: '"Not until" at the start triggers inversion in the main clause: "did the researchers understand".', difficulty: 0.65 },
  },
  {
    id: 'item.ec.c1.05', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { sentence: 'The principal reason for the decline is economical rather than political.', errorPart: 'economical', correction: 'economic', explanation: '"Economic" = relating to the economy. "Economical" = not wasteful/thrifty. Different meanings.', difficulty: 0.6 },
  },
  {
    id: 'item.ec.c1.06', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { sentence: 'The findings are broadly consisted with previous research.', errorPart: 'consisted', correction: 'consistent', explanation: '"Consistent with" (adjective) — not "consisted with". "Consisted of" has a different meaning entirely.', difficulty: 0.55 },
  },
  {
    id: 'item.ec.c1.07', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: { sentence: 'It was the manager which approved the budget.', errorPart: 'which', correction: 'who', explanation: 'In it-clefts, use "who" for people: "It was the manager who..." not "which".', difficulty: 0.5 },
  },
  {
    id: 'item.ec.c1.08', type: 'error_correction', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { sentence: 'The report raises several interesting points, most of what are supported by data.', errorPart: 'what', correction: 'which', explanation: 'Relative pronoun after "of": "most of which" not "most of what". "What" is not used in non-defining relative clauses.', difficulty: 0.55 },
  },

  // # ─── WORD FORMATION (8) ────────────────────────────────────────────
  {
    id: 'item.wf.c1.01', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'The committee expressed its ______ with the proposed changes.', rootWord: 'SATISFY', acceptedAnswers: ['dissatisfaction'], explanation: 'Noun form of "satisfy" is "satisfaction"; add dis- prefix for negative: "dissatisfaction".', difficulty: 0.6 },
  },
  {
    id: 'item.wf.c1.02', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'The decision was ______ controversial and sparked widespread debate.', rootWord: 'DENY', acceptedAnswers: ['undeniably'], explanation: 'Adjective "undeniable" → adverb "undeniably" (un- + deny + -ably).', difficulty: 0.6 },
  },
  {
    id: 'item.wf.c1.03', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'The ______ of the existing infrastructure has been a major obstacle to development.', rootWord: 'ADEQUATE', acceptedAnswers: ['inadequacy'], explanation: '"Adequate" → "inadequacy" (in- prefix for negative, -acy noun suffix).', difficulty: 0.6 },
  },
  {
    id: 'item.wf.c1.04', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Her research has been ______ in shaping government policy on public health.', rootWord: 'INFLUENCE', acceptedAnswers: ['influential'], explanation: 'Change "influence" (verb/noun) to "influential" (adjective) with -ial suffix.', difficulty: 0.55 },
  },
  {
    id: 'item.wf.c1.05', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'The policy was abandoned due to ______ from multiple stakeholders.', rootWord: 'OPPOSE', acceptedAnswers: ['opposition'], explanation: '"Oppose" → "opposition" (noun form with -ition suffix).', difficulty: 0.55 },
  },
  {
    id: 'item.wf.c1.06', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'The candidate\'s ______ to pressure was noted by the interview panel.', rootWord: 'VULNERABLE', acceptedAnswers: ['vulnerability'], explanation: '"Vulnerable" (adjective) → "vulnerability" (noun).', difficulty: 0.55 },
  },
  {
    id: 'item.wf.c1.07', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'The judge described the defendant\'s behaviour as wholly ______.', rootWord: 'DEFEND', acceptedAnswers: ['indefensible'], explanation: 'In- (negative) + "defend" + -ible (capable of) → "indefensible" (cannot be justified).', difficulty: 0.65 },
  },
  {
    id: 'item.wf.c1.08', type: 'word_formation', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'The report calls for a ______ overhaul of the current system.', rootWord: 'COMPREHEND', acceptedAnswers: ['comprehensive'], explanation: '"Comprehend" → "comprehensive" (adjective meaning thorough, all-encompassing).', difficulty: 0.6 },
  },

  // # ─── MATCHING (5) ──────────────────────────────────────────────────
  {
    id: 'item.ma.c1.01', type: 'matching', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Match each hedging expression to its degree of certainty.', pairs: [
      { left: 'It is clear that...', right: 'high certainty (strong claim)' },
      { left: 'The evidence suggests that...', right: 'moderate certainty (cautious claim)' },
      { left: 'It could be argued that...', right: 'low certainty (tentative)' },
      { left: 'There appears to be...', right: 'moderate certainty (observational)' },
      { left: 'It is conceivable that...', right: 'low certainty (speculative)' },
    ], difficulty: 0.6 },
  },
  {
    id: 'item.ma.c1.02', type: 'matching', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Match each collocation to its correct combination.', pairs: [
      { left: 'conduct', right: 'an investigation / research' },
      { left: 'draw', right: 'a conclusion / attention to' },
      { left: 'raise', right: 'awareness / concerns' },
      { left: 'pose', right: 'a threat / a question' },
      { left: 'exert', right: 'influence / pressure' },
    ], difficulty: 0.6 },
  },
  {
    id: 'item.ma.c1.03', type: 'matching', level: 'C1', skill: 'general',
    nodeIds: ['gram.c1.inversion'],
    payload: { stem: 'Match each inverted structure to its meaning.', pairs: [
      { left: 'Rarely have I...', right: 'I have almost never...' },
      { left: 'Not until... did he...', right: 'He only... when...' },
      { left: 'No sooner had she... than...', right: 'Immediately after she...' },
      { left: 'Under no circumstances should you...', right: 'You absolutely must not...' },
    ], difficulty: 0.6 },
  },
  {
    id: 'item.ma.c1.04', type: 'matching', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Match each commonly confused word to its correct definition.', pairs: [
      { left: 'imply', right: 'to suggest something indirectly' },
      { left: 'infer', right: 'to conclude something from evidence' },
      { left: 'comprise', right: 'to consist of / be made up of' },
      { left: 'compose', right: 'to make up / form part of' },
    ], difficulty: 0.6 },
  },
  {
    id: 'item.ma.c1.05', type: 'matching', level: 'C1', skill: 'general',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Match each formal transition to its function in academic writing.', pairs: [
      { left: 'Conversely', right: 'introducing an opposing viewpoint' },
      { left: 'In light of this', right: 'considering previously mentioned evidence' },
      { left: 'By the same token', right: 'for the same reason / similarly' },
      { left: 'Notwithstanding', right: 'despite / in spite of' },
    ], difficulty: 0.6 },
  },

  // # ─── DIALOGUE COMPLETION (4) ───────────────────────────────────────
  {
    id: 'item.dc.c1.01', type: 'dialogue_completion', level: 'C1', skill: 'speaking',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Complete the academic seminar discussion on research methodology.', lines: [
      { speaker: 'Professor', text: 'Your study uses a qualitative approach, but some reviewers have questioned whether a mixed-methods design would have been more robust. How would you respond to that?' },
      { speaker: 'Student', text: null, acceptedAnswers: ['That\'s a valid concern, and I did consider a mixed-methods approach initially. However, given the exploratory nature of the research question, I felt that in-depth qualitative data would yield richer insights at this stage.', 'I appreciate the feedback. While quantitative data would add breadth, the aim of this study was to understand participants\' lived experiences, which requires the depth that only qualitative methods can provide.'], hint: 'Defend your methodology with academic reasoning.' },
      { speaker: 'Professor', text: 'Fair point. But how do you address concerns about generalisability?' },
      { speaker: 'Student', text: null, acceptedAnswers: ['I acknowledge that the findings are not generalisable in the statistical sense. However, they offer transferability — other researchers can assess whether the context is sufficiently similar to apply the findings to their own settings.', 'That\'s inherent to qualitative research, and I\'ve addressed it by using thick description and triangulation to enhance the credibility of the findings.'], hint: 'Address the limitation of generalisability in qualitative research.' },
    ], difficulty: 0.7 },
  },
  {
    id: 'item.dc.c1.02', type: 'dialogue_completion', level: 'C1', skill: 'speaking',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Complete the professional negotiation about a contract renewal.', lines: [
      { speaker: 'Client', text: 'We\'ve been happy with the service overall, but we think the pricing needs to be revised. Your competitors are offering 20% less for comparable packages.' },
      { speaker: 'Provider', text: null, acceptedAnswers: ['I understand your position, and I appreciate your transparency. However, I\'d encourage you to consider the value beyond pricing — our service includes 24/7 support and a dedicated account manager, which most competitors charge extra for.', 'Thank you for raising that. While I can\'t match a 20% reduction without affecting service quality, I\'d be open to discussing a volume-based discount or an extended contract term that works for both sides.'], hint: 'Respond to price pressure without conceding immediately.' },
      { speaker: 'Client', text: 'We do value the relationship. What specifically could you offer to make this work?' },
      { speaker: 'Provider', text: null, acceptedAnswers: ['What I can propose is a 10% discount on a two-year renewal, which would give you cost savings while allowing us to maintain the level of service you\'ve come to expect.', 'I\'d suggest we look at a tiered pricing structure — a lower rate for your current usage level, with the flexibility to scale up at a discounted rate as your needs grow.'], hint: 'Make a concrete counter-offer.' },
    ], difficulty: 0.7 },
  },
  {
    id: 'item.dc.c1.03', type: 'dialogue_completion', level: 'C1', skill: 'speaking',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Complete the panel discussion about artificial intelligence in healthcare.', lines: [
      { speaker: 'Moderator', text: 'There\'s a growing debate about whether AI should be allowed to make diagnostic decisions independently. Dr. Chen, what\'s your view?' },
      { speaker: 'Dr. Chen', text: null, acceptedAnswers: ['I believe AI should augment clinical decision-making rather than replace it. The technology excels at pattern recognition in imaging data, for instance, but lacks the contextual understanding that comes from the patient-doctor relationship.', 'While the potential is enormous, I\'d advocate for a supervised model where AI flags potential diagnoses for clinical review. The liability and ethical implications of fully autonomous diagnosis are still unresolved.'], hint: 'Give a nuanced position on AI in diagnosis.' },
      { speaker: 'Moderator', text: 'And what about the argument that AI could reduce diagnostic errors, which are a significant cause of harm?' },
      { speaker: 'Dr. Chen', text: null, acceptedAnswers: ['That\'s a compelling argument, and the data supports it in certain domains — radiology being the prime example. But we must also consider algorithmic bias: if the training data is not representative, AI systems could actually increase disparities in care.', 'It\'s true that AI can process data more consistently than humans. However, medicine involves ambiguity, and an AI system trained on historical data may perpetuate existing biases rather than correct them.'], hint: 'Acknowledge the benefit while raising a critical counter-point.' },
    ], difficulty: 0.7 },
  },
  {
    id: 'item.dc.c1.04', type: 'dialogue_completion', level: 'C1', skill: 'speaking',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { stem: 'Complete the media interview about urban planning.', lines: [
      { speaker: 'Journalist', text: 'Your proposed development has faced opposition from local residents who say it will destroy the character of the neighbourhood. What would you say to them?' },
      { speaker: 'Developer', text: null, acceptedAnswers: ['I understand and respect their concerns. Heritage and community identity matter. That\'s precisely why we\'ve incorporated adaptive reuse of the existing buildings into the design, and we\'ve held six public consultations to incorporate residents\' feedback.', 'Their concerns are entirely legitimate. What I would point out is that the alternative — doing nothing — means these buildings continue to deteriorate. Our plan preserves the facades and ground-floor character while bringing much-needed housing and economic activity.'], hint: 'Show empathy for opposition while defending the project.' },
    ], difficulty: 0.65 },
  },

  // # ─── EXTRA WRITING (3) — advanced academic ─────────────────────────
  {
    id: 'item.wt.c1.03', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['lex.c1.academic_vocabulary', 'strat.ielts.task2_structure'],
    payload: { prompt: 'Some scientists believe that in the future, computers will be more intelligent than human beings. While some see this as a positive development, others worry about the negative consequences. Discuss both sides and give your own opinion. Write at least 250 words.', format: 'essay', minWords: 250, maxWords: 400, timeMinutes: 40, rubric: [
      { name: 'Task Response', description: 'Nuanced discussion with clear, justified position', maxScore: 9 },
      { name: 'Coherence & Cohesion', description: 'Sophisticated paragraph structure with cohesive devices', maxScore: 9 },
      { name: 'Lexical Resource', description: 'Precise, academic vocabulary with collocations', maxScore: 9 },
      { name: 'Grammatical Range & Accuracy', description: 'Wide range of structures, rare errors', maxScore: 9 },
    ], modelAnswer: 'The prospect of artificial intelligence surpassing human cognitive capabilities has moved from the realm of science fiction to the forefront of academic and public discourse. While this development offers unprecedented opportunities, it also raises profound ethical and practical concerns.\n\nAdvocates of artificial superintelligence point to its potential to revolutionise fields such as medicine, climate science, and logistics. An AI system capable of analysing vast datasets could identify patterns invisible to human researchers, accelerating the development of treatments for diseases or optimising energy distribution on a global scale. Moreover, such systems could take over hazardous tasks, thereby reducing human exposure to risk.\n\nConversely, critics raise legitimate concerns about the socioeconomic implications. Mass automation could render entire professions obsolete, exacerbating inequality unless governments proactively implement retraining programmes and social safety nets. There are also existential risks: a system whose objectives are misaligned with human values could, in theory, pursue its goals at humanity\'s expense — a scenario that, while speculative, is taken seriously by researchers in the field.\n\nPerhaps the most nuanced concern, however, is one of autonomy. If critical decisions in healthcare, criminal justice, and governance are delegated to machines, we risk undermining the democratic accountability and moral reasoning that underpin these institutions.\n\nIn my view, the development of advanced AI is neither inherently beneficial nor inherently dangerous — its impact will depend entirely on the regulatory frameworks, ethical guidelines, and governance structures we put in place. The priority must be to ensure that human oversight remains central to any system whose decisions affect human lives.', difficulty: 0.7 },
  },
  {
    id: 'item.wt.c1.04', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { prompt: 'You have attended a conference on sustainable urban development. Write a proposal to your city council recommending one initiative that your city should adopt, based on what you learned. Include the rationale, implementation steps, and potential challenges. Write 250–350 words.', format: 'essay', minWords: 250, maxWords: 380, timeMinutes: 35, rubric: [
      { name: 'Task Achievement', description: 'Clear recommendation with rationale, steps, and challenges', maxScore: 5 },
      { name: 'Register', description: 'Formal, persuasive, professional tone', maxScore: 5 },
      { name: 'Vocabulary', description: 'Precise, sophisticated lexis appropriate to context', maxScore: 5 },
      { name: 'Grammar', description: 'Complex, varied structures with minimal errors', maxScore: 5 },
    ], modelAnswer: 'Proposal: Urban Green Corridor Initiative\n\nTo: City Council Planning Committee\nFrom: [Name], Urban Development Consultant\n\nRationale\nAt the recent International Conference on Sustainable Cities, a recurring theme was the transformation of underutilised urban spaces into green corridors — interconnected networks of parks, cycle paths, and pedestrian zones that improve air quality, promote active transport, and enhance biodiversity.\n\nOur city would benefit significantly from such an initiative. Currently, 40% of journeys under 3km are made by car, contributing to congestion and poor air quality. A green corridor connecting the city centre to the eastern suburbs would provide a viable alternative for commuters and recreational users alike.\n\nImplementation Steps\n1. Phase 1 (Months 1–6): Conduct a feasibility study and community consultation to identify the optimal route and address concerns from affected businesses.\n2. Phase 2 (Months 7–18): Secure funding through a combination of municipal bonds and central government green infrastructure grants.\n3. Phase 3 (Months 19–36): Begin construction in stages, starting with the most congested sections to demonstrate immediate impact.\n\nAnticipated Challenges\nThe primary obstacle is likely to be opposition from businesses that fear reduced vehicle access. This can be mitigated by providing evidence from comparable projects — in particular, the Seville Green Corridor, which saw a 15% increase in footfall to local shops within 12 months of completion.\n\nAdditionally, ongoing maintenance costs must be factored into the long-term budget. A community stewardship programme, in which local volunteers contribute to upkeep, could supplement municipal funding.\n\nConclusion\nThe Green Corridor Initiative offers a cost-effective, evidence-based approach to improving urban liveability. I recommend that the council commission a feasibility study as a first step.', difficulty: 0.7 },
  },
  {
    id: 'item.wt.c1.05', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['lex.c1.academic_vocabulary'],
    payload: { prompt: 'Write a review of a book, film, or exhibition that you believe everyone should experience. Explain what it is about, why it is significant, and what impact it had on you. Write 200–300 words.', format: 'essay', minWords: 200, maxWords: 320, timeMinutes: 25, rubric: [
      { name: 'Content', description: 'Clear description, reasoned evaluation, personal reflection', maxScore: 5 },
      { name: 'Engagement', description: 'Compelling, persuasive, holds the reader\'s interest', maxScore: 5 },
      { name: 'Vocabulary', description: 'Sophisticated descriptive and evaluative language', maxScore: 5 },
      { name: 'Grammar', description: 'Varied, accurate structures showing C1 mastery', maxScore: 5 },
    ], modelAnswer: 'If I could recommend one book to anyone navigating the modern world, it would be Yuval Noah Harari\'s Sapiens: A Brief History of Humankind.\n\nThe book traces the history of Homo sapiens from the Cognitive Revolution 70,000 years ago to the present day, examining how shared myths — religion, money, nationhood — have enabled us to cooperate on an unprecedented scale. What makes it exceptional is not the breadth of its scope, but the clarity with which Harari distils complex anthropological, economic, and biological concepts into accessible prose.\n\nOne passage that particularly stayed with me was the discussion of the Agricultural Revolution, which Harari provocatively describes as "history\'s biggest fraud." He argues that while farming increased total food production, it actually reduced the quality of life for individual humans. This kind of counterintuitive thinking runs throughout the book and forces the reader to question assumptions that are so deeply embedded as to be invisible.\n\nThe significance of Sapiens lies in its ability to provide perspective. In a world of 24-hour news cycles and short-term thinking, it reminds us that the structures we take for granted — markets, borders, laws — are relatively recent inventions, and therefore can be reinvented.\n\nReading it fundamentally changed how I view institutions and social norms. I no longer see them as fixed or inevitable, but as collective agreements that can be renegotiated. For anyone seeking to understand not just where we came from but why we live the way we do, Sapiens is indispensable.', difficulty: 0.65 },
  },

  // # ─── EXTRA SPEAKING (3) — IELTS Part 3 / academic ─────────────────
  {
    id: 'item.sp.c1.04', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['lex.c1.academic_vocabulary', 'strat.ielts.part3_extend'],
    payload: { prompt: 'Let\'s discuss the role of media in modern society.', format: 'part3_discussion', followUpQuestions: ['To what extent do you think social media has replaced traditional journalism?', 'How can people distinguish between reliable and unreliable news sources?', 'Some argue that the media should be more regulated. Do you agree?', 'How has the way people consume news changed over the past decade?'], prepTimeSeconds: 0, speakTimeSeconds: 300, targetLanguage: ['It could be argued that...', 'While there is some truth to the claim that...', 'The distinction between... and... is crucial.', 'One must consider the broader implications of...'], modelAnswerNotes: 'Extended academic discussion. Each answer 4–5 sentences. Show nuance with hedging, concession, and counter-argument. Vocabulary: credibility, accountability, misinformation, echo chamber, editorial independence, verification. Use inversions and clefts naturally.', difficulty: 0.65 },
  },
  {
    id: 'item.sp.c1.05', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['lex.c1.academic_vocabulary', 'strat.ielts.part2_structure'],
    payload: { prompt: 'Describe a leader who you admire.', format: 'part2_cue_card', cueCardPoints: ['who the person is', 'what makes them a good leader', 'what challenges they have faced', 'what you have learned from their example'], prepTimeSeconds: 60, speakTimeSeconds: 120, targetLanguage: ['What distinguishes this person is...', 'One of the qualities I find most admirable is...', 'They faced considerable opposition when...', 'The lesson I take from their example is...'], modelAnswerNotes: 'Sustained 2-minute monologue. Cover all points with depth. Use complex structures: participle clauses ("Having faced criticism, she..."), relative clauses, hedging. Show sophisticated vocabulary: integrity, resilience, vision, accountability, empathy.', difficulty: 0.65 },
  },
  {
    id: 'item.sp.c1.06', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['lex.c1.academic_vocabulary', 'strat.ielts.part3_extend'],
    payload: { prompt: 'Let\'s discuss globalisation and cultural identity.', format: 'part3_discussion', followUpQuestions: ['How has globalisation affected traditional cultures?', 'Is it possible for a country to embrace globalisation without losing its cultural identity?', 'What role does language play in preserving culture?', 'Do you think future generations will feel less connected to their cultural heritage?'], prepTimeSeconds: 0, speakTimeSeconds: 300, targetLanguage: ['Globalisation has undeniably...', 'There is a tension between... and...', 'Language is arguably the most fundamental...', 'It is difficult to predict, but...'], modelAnswerNotes: 'Nuanced, abstract discussion. Show ability to speculate, evaluate, and synthesise. Vocabulary: homogenisation, assimilation, cultural erosion, cosmopolitan, indigenous, heritage. Demonstrate sophistication with cleft structures and complex noun phrases.', difficulty: 0.7 },
  },
]
