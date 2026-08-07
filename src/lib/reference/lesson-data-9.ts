// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 9: C2 Proficiency Lessons (25 lessons)
// # ═══════════════════════════════════════════════════════════════════════════
// # Native-level mastery — idiomatic language, rhetorical devices, nuance,
// # register switching, figurative language, argumentation, and cultural fluency.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_9: LessonCategory[] = [
  {
    id: 'c2-proficiency',
    name: 'C2: Proficiency',
    description: 'Near-native mastery — idioms, rhetoric, nuance, style, and cultural fluency.',
    icon: '👑',
    lessons: [

      // # ─── 1. Idiomatic Language ───
      {
        id: 'c2-idiomatic-language',
        title: 'Idiomatic Language & Fixed Expressions',
        description: 'Master the phrases native speakers use daily — "the elephant in the room," "a blessing in disguise."',
        skill: 'vocabulary', level: 'C2', duration: 12,
        objectives: ['Learn 40+ common English idioms', 'Use idioms naturally in context', 'Understand idioms that are culture-specific'],
        sections: [
          { title: 'Body Idioms', type: 'rule', content: 'Keep an eye on = watch carefully: "Keep an eye on the kids." Turn a blind eye = ignore deliberately: "Management turned a blind eye to the problem." Get cold feet = become nervous: "She got cold feet before the wedding." Cost an arm and a leg = very expensive: "That car cost an arm and a leg." Give someone a hand = help: "Can you give me a hand with this?" By heart = from memory: "She knows the poem by heart."' },
          { title: 'Situation Idioms', type: 'rule', content: 'The elephant in the room = obvious problem nobody mentions. A blessing in disguise = something bad that turns out good. Hit the nail on the head = describe exactly right. Bite off more than you can chew = take on too much. Under the weather = feeling ill. On the same page = in agreement. Beat around the bush = avoid the main point. A piece of cake = very easy. Break the ice = start conversation with strangers. Burn bridges = destroy relationships permanently.' },
          { title: 'Using Idioms Naturally', type: 'tip', content: 'Idioms are most natural in: Casual conversation: "How was the test?" — "A piece of cake!" Storytelling: "We were all on the same page until John changed his mind." Writing (informal): blog posts, personal essays. Avoid in: Formal academic writing, technical reports, business emails to non-native speakers. Learning tip: learn idioms in context (full sentences), not as isolated phrases.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Explain the meaning.', question: '"After losing his job, he decided to turn over a new leaf and go back to university."', answer: '"Turn over a new leaf" means to make a fresh start, to change your behaviour for the better.', answerExplanation: 'The idiom suggests starting fresh — like turning to a blank page in a book.' },
        ],
        keyTakeaways: ['Idioms cannot be understood from individual words', 'Learn in full sentences with context', 'Natural in speech; avoid in formal academic writing', 'Culture-specific: check if your audience will understand'],
        relatedLessons: ['c2-figurative-language', 'c2-colloquial-english'],
      },

      // # ─── 2. Register Switching ───
      {
        id: 'c2-register-switching',
        title: 'Register Switching in Context',
        description: 'Adapt your language instantly — formal in a meeting, casual with friends, technical with experts.',
        skill: 'speaking', level: 'C2', duration: 12,
        objectives: ['Switch between formal, neutral, and informal registers', 'Recognise when register is inappropriate', 'Adapt vocabulary, grammar, and tone to context'],
        sections: [
          { title: 'The Three Registers', type: 'rule', content: 'Formal: "I would like to express my gratitude for your assistance." → Reports, interviews, official letters. Neutral: "Thank you for helping me." → Most workplace communication, general writing. Informal: "Cheers for the help, mate!" → Friends, family, casual messaging. Frozen/ceremonial: "We the people..." — legal, religious, ceremonial texts. Intimate: "Love ya!" — closest relationships only.' },
          { title: 'What Changes Between Registers', type: 'rule', content: 'Vocabulary: acquire → get → grab. Commence → start → kick off. Reside → live → crash (at). Grammar: "To whom it may concern" → "Hi everyone" → "Hey guys." Passive (formal): "It was decided" → Active (informal): "We decided." Full forms (formal): "I would appreciate" → Contractions (informal): "I\'d appreciate." Sentence length: long + complex (formal) → short + simple (informal).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite in three registers.', question: 'Message: "Come to my party on Saturday."', answer: 'Formal: "I would be delighted if you could attend a gathering at my residence on Saturday evening." Neutral: "I\'m having a party on Saturday — would you like to come?" Informal: "Party at mine Sat night — you in?"', answerExplanation: 'Each version says the same thing but with different vocabulary, grammar, and tone for different audiences.' },
        ],
        keyTakeaways: ['Match register to audience, context, and purpose', 'Vocabulary, grammar, and sentence length all change', 'Formal ≠ better. Informal ≠ lazy. Both require skill.', 'Wrong register is more noticeable than grammar mistakes'],
        relatedLessons: ['c1-connotation-register', 'c2-professional-settings'],
      },

      // # ─── 3. Politeness Strategies ───
      {
        id: 'c2-politeness',
        title: 'Politeness Strategies & Face Theory',
        description: 'Understand WHY English speakers are indirect — and use it to your advantage.',
        skill: 'speaking', level: 'C2', duration: 10,
        objectives: ['Understand positive and negative face', 'Use appropriate directness levels', 'Make requests, refusals, and criticisms without offending'],
        sections: [
          { title: 'Face Theory', type: 'text', content: 'In linguistics, "face" means your public self-image. Everyone has two types of face: Positive face: the need to be liked, appreciated, and included. Negative face: the need for autonomy, freedom, and not being imposed upon. English politeness strategies protect both types of face. Being too direct threatens face. Being too indirect can seem evasive. The skill is finding the right balance for each situation.' },
          { title: 'Softening Strategies', type: 'rule', content: 'Questions instead of commands: "Could you possibly...?" "Would you mind...?" "I was wondering if you might..." Past tense for distance: "I wanted to ask you..." (softer than "I want to ask you") Hedging: "It might be worth considering..." Apologising before imposing: "Sorry to bother you, but..." "I hate to ask, but..." "If it\'s not too much trouble..." Giving an out: "Only if you have time..." "No pressure at all..."' },
          { title: 'Refusal Strategies', type: 'tip', content: 'Direct refusal (can seem rude): "No." Softened refusal (appropriate): "I\'d love to, but I\'m afraid I can\'t." "That sounds great, but unfortunately..." "I\'m not sure I can make it, but thank you for asking." "I wish I could, but I already have plans." Always: acknowledge the request/invitation positively, then give a reason.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Soften this request.', question: '"Give me a discount."', answer: '"I was wondering if there might be any possibility of a discount? I\'d really appreciate it."', answerExplanation: 'Added: I was wondering (tentative), might be (possibility), any possibility (vague), I\'d really appreciate it (shows gratitude).' },
        ],
        keyTakeaways: ['Politeness protects "face" (public self-image)', 'Use past tense, questions, and hedging to soften', 'Refusals: acknowledge positively + give a reason', '"Could you possibly..." > "Can you..." > "Do this."'],
        relatedLessons: ['c1-pragmatics', 'c2-register-switching'],
      },

      // # ─── 4. Rhetorical Devices ───
      {
        id: 'c2-rhetorical-devices',
        title: 'Rhetorical Devices in Writing',
        description: 'Write with power and elegance — parallelism, tricolon, antithesis, and more.',
        skill: 'writing', level: 'C2', duration: 12,
        objectives: ['Use parallelism, tricolon, and antithesis', 'Apply rhetorical questions and repetition', 'Recognise devices in speeches and writing'],
        sections: [
          { title: 'Parallelism & Tricolon', type: 'rule', content: 'Parallelism = same grammatical structure repeated: "She came, she saw, she conquered." "Government of the people, by the people, for the people." Tricolon = three parallel items (the most powerful pattern): "Life, liberty, and the pursuit of happiness." "Education, education, education." Things come in threes for rhythm and emphasis. Two feels incomplete. Four feels like a list. Three feels just right.' },
          { title: 'Antithesis & Chiasmus', type: 'rule', content: 'Antithesis = two contrasting ideas in parallel: "It was the best of times, it was the worst of times." "One small step for man, one giant leap for mankind." Chiasmus = reversed parallel structure (ABBA): "Ask not what your country can do for you — ask what you can do for your country." "We shape our buildings; thereafter, our buildings shape us."' },
          { title: 'Other Devices', type: 'rule', content: 'Rhetorical question: "If not now, when? If not us, who?" (no answer expected) Anaphora (repetition at start): "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields..." Epistrophe (repetition at end): "...of the people, by the people, for the people." Hypophora: asking a question then answering it. Litotes (understatement through negation): "Not bad" = quite good. "No small achievement" = a great achievement.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Identify the rhetorical device.', question: '"I have a dream that one day... I have a dream that one day..."', answer: 'Anaphora — repetition of "I have a dream" at the start of successive clauses.', answerExplanation: 'Martin Luther King Jr.\'s famous use of anaphora creates rhythm, emphasis, and emotional power through repetition.' },
        ],
        keyTakeaways: ['Tricolon: three parallel items for maximum impact', 'Antithesis: opposing ideas in parallel structure', 'Anaphora: repetition at the start of clauses', 'Rhetorical devices make writing memorable and persuasive'],
        relatedLessons: ['c2-persuasion', 'c2-style-tone'],
      },

      // # ─── 5. Irony, Sarcasm, Understatement ───
      {
        id: 'c2-irony-sarcasm',
        title: 'Irony, Sarcasm & Understatement',
        description: 'Understand and use indirect humour — "Nice weather!" (during a storm).',
        skill: 'speaking', level: 'C2', duration: 10,
        objectives: ['Distinguish verbal irony, dramatic irony, and sarcasm', 'Use and interpret British understatement', 'Know when indirect language is humorous vs offensive'],
        sections: [
          { title: 'Types of Irony', type: 'rule', content: 'Verbal irony: saying the opposite of what you mean: "Oh great, another Monday." (= you don\'t think it\'s great) "Nice parking!" (to someone who parked terribly) Dramatic irony: the audience knows something a character doesn\'t: In a film, we know the killer is behind the door, but the character doesn\'t. Situational irony: the opposite of what\'s expected happens: A fire station burns down. A marriage counsellor gets divorced.' },
          { title: 'Sarcasm vs Irony', type: 'tip', content: 'Sarcasm = irony used to mock or criticise (can be hurtful): "Oh, you\'re SO helpful." (= you\'re not helping at all — critical tone) Irony = broader, can be gentle or humorous: "Well, isn\'t that convenient." (wry observation) Key difference: sarcasm has a TARGET. Irony can be self-directed or observational. In writing, sarcasm is harder to detect — context and tone are everything.' },
          { title: 'British Understatement', type: 'rule', content: 'British English frequently understates for effect: "A spot of bother" = serious trouble. "Not exactly my cup of tea" = I strongly dislike it. "I\'m not entirely convinced" = I completely disagree. "It wasn\'t the best idea" = it was a terrible idea. "He\'s not the sharpest tool in the shed" = he\'s quite stupid. "Quite good" can mean "excellent" or "mediocre" depending on tone. Understanding understatement is essential for navigating British culture and media.' },
          { title: 'Test Yourself', type: 'exercise', content: 'What does the speaker really mean?', question: '"After getting soaked in a rainstorm: \'Well, that was a lovely walk.\'"', answer: 'Verbal irony — they mean the exact opposite. The walk was terrible because they got soaked.', answerExplanation: 'The contrast between "lovely walk" and being soaked signals irony. Tone and context make it clear.' },
        ],
        keyTakeaways: ['Verbal irony: saying the opposite of what you mean', 'Sarcasm: irony with a critical/mocking target', 'British understatement: "not bad" can mean "excellent"', 'Context, tone, and facial expression distinguish irony from literal meaning'],
        relatedLessons: ['c1-pragmatics', 'c2-colloquial-english'],
      },

      // # ─── 6. Style & Tone ───
      {
        id: 'c2-style-tone',
        title: 'Style & Tone: Finding Your Voice',
        description: 'Develop your unique writing voice — confident, clear, and unmistakably yours.',
        skill: 'writing', level: 'C2', duration: 12,
        objectives: ['Identify and develop a consistent writing voice', 'Control tone: authoritative, empathetic, critical, neutral', 'Read model texts to absorb style'],
        sections: [
          { title: 'What Is Voice?', type: 'text', content: 'Voice = the personality that comes through in your writing. It is the difference between writing that sounds like a textbook and writing that sounds like a human. Compare: "It is widely acknowledged that climate change poses a significant threat." (neutral academic) "The planet is on fire, and we\'re arguing about the thermostat." (distinctive voice — urgent, metaphorical) Both are valid. Voice is about CHOOSING the right tone for your purpose and audience.' },
          { title: 'Controlling Tone', type: 'rule', content: 'Authoritative: Short declarative sentences. "This is the most critical challenge of our generation." Empathetic: Second person, shared experience. "You know that feeling when..." "We\'ve all been there." Critical: Contrast, precision, evidence. "Despite the government\'s claims, the evidence suggests otherwise." Humorous: Unexpected comparisons, understatement. "The meeting was about as productive as a chocolate teapot." Each tone uses different vocabulary, sentence length, and structure.' },
          { title: 'Developing Your Voice', type: 'tip', content: 'Read widely: absorb styles from writers you admire. Write regularly: your voice develops with practice. Be specific: "She walked quickly" → "She marched." Remove filler: cut words that add nothing (very, really, quite, just, actually). Use strong verbs: "The company decided" → "The company committed." Read your work aloud: if it sounds unnatural, it probably is. Your voice is discovered, not invented — write naturally and patterns will emerge.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite this sentence with a more distinctive voice.', question: '"The weather was very bad and it made the journey difficult."', answer: 'Examples: "The storm turned the highway into a river." OR "Rain hammered the windscreen so hard we could barely see the road." OR "Mother Nature had other plans for our road trip."', answerExplanation: 'Each version uses specific imagery, strong verbs, and personality instead of vague adjectives.' },
        ],
        keyTakeaways: ['Voice = personality in writing. Tone = emotional register.', 'Control tone through vocabulary, sentence length, and person', 'Strong verbs > weak verb + adverb: "marched" > "walked quickly"', 'Read aloud to check if it sounds natural'],
        relatedLessons: ['c2-rhetorical-devices', 'c2-persuasion'],
      },

      // # ─── 7. Advanced Cohesion ───
      {
        id: 'c2-advanced-cohesion',
        title: 'Advanced Cohesion: Lexical Chains',
        description: 'Weave vocabulary through your text to create seamless flow — the secret to polished writing.',
        skill: 'writing', level: 'C2', duration: 10,
        objectives: ['Create lexical chains through synonyms, hypernyms, and collocations', 'Use reference (this, such, the former) for cohesion', 'Avoid both repetition and confusing variety'],
        sections: [
          { title: 'Lexical Chains', type: 'rule', content: 'A lexical chain links related words throughout a text: Repetition: using the same word (sometimes necessary). Synonym: "car" → "vehicle" → "automobile." Hypernym (general): "dog" → "animal" → "creature." Collocation: "heavy rain" → "downpour" → "torrential conditions." Example chain: "The smartphone → the device → it → this technology → mobile computing." Each link maintains the topic without boring repetition.' },
          { title: 'Reference Words', type: 'rule', content: 'This/these/that/those: "The company launched a new product. This move surprised analysts." Such: "Such developments are common in the tech industry." The former/the latter: "Both Apple and Samsung released phones. The former focused on design, the latter on features." The above/the following: "The above examples demonstrate..." "The following section discusses..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Replace repetition with a lexical chain.', question: '"The teacher helped the students. The teacher explained the topic clearly. The teacher then gave the students an exercise."', answer: '"The teacher helped the students by explaining the topic clearly. She then gave them an exercise to practise."', answerExplanation: 'Removed repetitive "the teacher" with pronoun "she" and combined sentences. "The students" → "them." Smoother flow.' },
        ],
        keyTakeaways: ['Lexical chains link related words across a text', 'Mix: repetition + synonyms + hypernyms + pronouns', 'This/such/the former for reference without repetition', 'Too much synonym variation = confusing. Too little = repetitive. Balance.'],
        relatedLessons: ['c1-coherence', 'b2-text-organisation'],
      },

      // # ─── 8. Ambiguity & Disambiguation ───
      {
        id: 'c2-ambiguity',
        title: 'Ambiguity & Disambiguation',
        description: 'Spot and fix unclear language — "I saw the man with the telescope" (who has the telescope?).',
        skill: 'grammar', level: 'C2', duration: 10,
        objectives: ['Identify lexical and structural ambiguity', 'Rewrite ambiguous sentences clearly', 'Use ambiguity deliberately for humour or rhetoric'],
        sections: [
          { title: 'Types of Ambiguity', type: 'rule', content: 'Lexical ambiguity: a word has multiple meanings: "The bank was steep." (river bank? financial bank?) Structural ambiguity: the sentence structure allows two readings: "I saw the man with the telescope." (I used a telescope? The man had a telescope?) "Flying planes can be dangerous." (the act of flying? planes that fly?) Referential ambiguity: "John told Bill that he was wrong." (who is "he"?)' },
          { title: 'How to Fix It', type: 'rule', content: 'Restructure the sentence: "Using my telescope, I saw the man." OR "I saw the man who was holding a telescope." Replace pronouns with nouns: "John told Bill that Bill was wrong." Add context: "The river bank was steep." "Piloting aircraft can be dangerous." Use punctuation: "Let\'s eat, Grandma!" vs "Let\'s eat Grandma!" (commas save lives)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Explain the two meanings and disambiguate.', question: '"The chicken is ready to eat."', answer: 'Meaning 1: The chicken (meal) is ready for us to eat it. Meaning 2: The chicken (animal) is ready to eat (something). Disambiguated: "The chicken is cooked and ready to serve." OR "The hen is hungry and ready to feed."', answerExplanation: '"Chicken" = food or animal. "Ready to eat" = ready to be eaten or ready to eat something. Context usually clarifies, but rewording removes doubt.' },
        ],
        keyTakeaways: ['Lexical: word has multiple meanings', 'Structural: sentence allows two grammatical readings', 'Fix: restructure, specify, add context, use punctuation', 'Deliberate ambiguity = humour, poetry, headlines'],
        relatedLessons: ['c2-figurative-language', 'c1-pragmatics'],
      },

      // # ─── 9. Metaphor & Figurative Language ───
      {
        id: 'c2-figurative-language',
        title: 'Metaphor & Figurative Language',
        description: 'The engine of creative and persuasive English — "time is money," "she has a heart of gold."',
        skill: 'vocabulary', level: 'C2', duration: 12,
        objectives: ['Understand and use metaphor, simile, personification, and hyperbole', 'Identify conceptual metaphors in everyday language', 'Use figurative language in your own writing'],
        sections: [
          { title: 'Key Figures of Speech', type: 'rule', content: 'Metaphor: "Life is a journey." "He\'s a walking encyclopedia." Simile: "She sings like an angel." "He ran as fast as the wind." Personification: "The wind whispered." "Opportunity knocked." Hyperbole: "I\'ve told you a million times." "I\'m so hungry I could eat a horse." Metonymy: "The White House announced..." (= the President/administration). Synecdoche: "All hands on deck." (hands = workers/people).' },
          { title: 'Conceptual Metaphors', type: 'tip', content: 'English is built on hidden metaphors we use without realising: TIME IS MONEY: "spend time," "waste time," "save time," "invest time." ARGUMENT IS WAR: "defend a position," "attack an idea," "win an argument." UNDERSTANDING IS SEEING: "I see what you mean," "a clear explanation," "shed light on." IDEAS ARE FOOD: "food for thought," "digest information," "half-baked idea." These are not just literary — they shape how we think.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Identify the figurative language.', question: '"After the scandal, his reputation was in tatters and the company was haemorrhaging money."', answer: '"In tatters" = metaphor (reputation as fabric that is torn). "Haemorrhaging money" = metaphor (losing money as bleeding — urgent, dangerous).', answerExplanation: 'Both use physical imagery for abstract concepts. "Haemorrhaging" adds urgency — more powerful than "losing."' },
        ],
        keyTakeaways: ['Metaphor: A IS B. Simile: A is LIKE B.', 'Personification gives human qualities to non-human things', 'Conceptual metaphors shape everyday language and thought', 'Figurative language makes writing vivid, persuasive, and memorable'],
        relatedLessons: ['c2-idiomatic-language', 'c2-rhetorical-devices'],
      },

      // # ─── 10. Advanced Word Formation ───
      {
        id: 'c2-word-formation',
        title: 'Advanced Word Formation: Prefixes, Suffixes, Roots',
        description: 'Unlock thousands of words by understanding how English words are built.',
        skill: 'vocabulary', level: 'C2', duration: 12,
        objectives: ['Use prefixes to change meaning (un-, mis-, over-, under-, re-, pre-, anti-)', 'Use suffixes to change word class (-ness, -ment, -tion, -ify, -ise)', 'Recognise Greek and Latin roots'],
        sections: [
          { title: 'Prefixes', type: 'rule', content: 'Negative: un- (unhappy), in-/im-/il-/ir- (impossible, illegal, irregular), dis- (disagree), non- (non-profit). Degree: over- (overwork), under- (underestimate), out- (outperform). Time/order: pre- (predict), post- (postpone), re- (rebuild), fore- (foresee). Attitude: anti- (anti-war), pro- (pro-democracy), counter- (counterargument). Size: super- (supernatural), sub- (submarine), mega- (megacity), micro- (microscope).' },
          { title: 'Suffixes', type: 'rule', content: 'Noun-forming: -tion/-sion (education, decision), -ment (development), -ness (happiness), -ity (reality), -ance/-ence (performance, existence), -er/-or (teacher, actor). Adjective-forming: -able/-ible (comfortable, visible), -ful (beautiful), -less (careless), -ous (dangerous), -ive (creative), -al (national). Verb-forming: -ify (simplify), -ise/-ize (modernise), -en (strengthen). Adverb-forming: -ly (quickly, carefully).' },
          { title: 'Common Roots', type: 'tip', content: 'Latin/Greek roots unlock meaning: dict/dic = say: predict, dictate, contradict. duct/duc = lead: conduct, reduce, produce. port = carry: transport, export, import. spec/spect = look: inspect, spectator, respect. scrib/script = write: describe, manuscript, prescribe. rupt = break: interrupt, corrupt, erupt. Knowing 20-30 roots helps you guess the meaning of hundreds of unfamiliar words.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Break down this word and guess its meaning.', question: '"counterproductive"', answer: 'counter- (against) + productive (creating results) = working against the intended result; having the opposite effect from what was desired.', answerExplanation: 'Understanding the prefix "counter-" (against/opposite) + the base word "productive" gives the meaning directly.' },
        ],
        keyTakeaways: ['Prefixes change meaning (un-, re-, over-, anti-)', 'Suffixes change word class (-tion = noun, -ful = adjective)', 'Roots unlock meaning: spec = look, dict = say, port = carry', 'Word formation knowledge helps with unknown words in exams'],
        relatedLessons: ['c1-nominalisation', 'c2-figurative-language'],
      },

      // # ─── 11. Nuances of Modal Verbs ───
      {
        id: 'c2-modal-nuances',
        title: 'Nuances of Modal Verbs at C2',
        description: 'The subtle differences between "can," "could," "may," and "might" that dictionaries miss.',
        skill: 'grammar', level: 'C2', duration: 10,
        objectives: ['Master the subtle differences between similar modals', 'Use modals for precise social meaning', 'Handle modal verbs in formal and informal contexts'],
        sections: [
          { title: 'Can vs Could vs May vs Might', type: 'rule', content: 'Permission: "Can I...?" (informal) "Could I...?" (polite) "May I...?" (formal/old-fashioned) Possibility: "It can happen." (general/theoretical) "It could happen." (specific/more tentative) "It may happen." (possible) "It might happen." (less likely than may) Offer: "Can I help?" (friendly) "May I help you?" (formal/professional) Past ability: "I could swim." (general) "I was able to swim across." (specific achievement)' },
          { title: 'Shall vs Will vs Would', type: 'rule', content: 'Shall: offers/suggestions (British): "Shall I open the window?" "Shall we go?" Will: facts, promises, spontaneous decisions. Would: hypothetical, polite requests, past habits. "He would always bring flowers." "Would you mind closing the door?" Fine distinctions: "Will you help?" (request — slightly demanding) "Would you help?" (request — polite, tentative) "Could you help?" (request — polite, questioning ability)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the most appropriate modal.', question: 'To a professor: "_____ I have an extension on my essay?"', answer: '"Would it be possible for me to have an extension?" OR "May I request an extension?"', answerExplanation: 'For a professor: formal context. "Can I" = too casual. "May I" = appropriate. "Would it be possible" = most polite.' },
        ],
        keyTakeaways: ['Can (informal) → Could (polite) → May (formal)', 'May (more likely) → Might (less likely)', 'Would for politeness, hypotheticals, past habits', 'Context determines which modal is socially appropriate'],
        relatedLessons: ['c1-advanced-modals', 'c2-politeness'],
      },

      // # ─── 12. Academic Argumentation ───
      {
        id: 'c2-argumentation',
        title: 'Academic Writing: Argumentation Structure',
        description: 'Build and deconstruct arguments like a scholar — claim, evidence, warrant, counter.',
        skill: 'writing', level: 'C2', duration: 12,
        objectives: ['Structure arguments using the Toulmin model', 'Use evidence, warrants, and qualifications', 'Address and refute counterarguments'],
        sections: [
          { title: 'Argument Components', type: 'rule', content: 'CLAIM: Your main assertion: "Renewable energy should replace fossil fuels." EVIDENCE: Data, research, examples supporting the claim: "Solar costs have dropped 89% since 2010 (IRENA, 2023)." WARRANT: The reasoning connecting evidence to claim: "Cheaper energy sources are adopted more quickly by markets." BACKING: Support for the warrant itself. QUALIFIER: Acknowledging limits: "In most developed economies..." REBUTTAL: Addressing counterarguments: "While critics argue that renewables are unreliable..."' },
          { title: 'Counterargument Strategy', type: 'rule', content: 'Acknowledge → Evaluate → Refute: "It has been argued that X (acknowledge). While this may be true in some cases (evaluate), the evidence overwhelmingly suggests Y (refute)." "Critics contend that... However, this overlooks the fact that..." "Admittedly, there are limitations. Nevertheless, the benefits outweigh..." Never ignore opposing views — acknowledging them strengthens your position.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Add a counterargument and refutation.', question: 'Claim: "Working from home increases productivity."', answer: 'Example: "Opponents argue that remote work reduces collaboration and spontaneous innovation. However, research by Bloom et al. shows that while informal interaction decreases, focused productivity rises by 13%, suggesting that the net effect remains positive."', answerExplanation: 'Acknowledged the counter (reduces collaboration), evaluated (while...decreases), refuted with evidence (13% rise, net positive).' },
        ],
        keyTakeaways: ['Claim + Evidence + Warrant = a complete argument', 'Qualifiers show intellectual honesty', 'Always address counterarguments (acknowledge → evaluate → refute)', 'Ignoring the other side weakens your position'],
        relatedLessons: ['c1-critical-reading', 'c1-hedging-boosting'],
      },

      // # ─── 13. Critical Analysis ───
      {
        id: 'c2-critical-analysis',
        title: 'Critical Analysis: Evaluating Sources',
        description: 'Assess the reliability, bias, and quality of sources — essential for research.',
        skill: 'reading', level: 'C2', duration: 10,
        objectives: ['Evaluate source reliability and credibility', 'Identify bias in academic and media texts', 'Apply the CRAAP test to sources'],
        sections: [
          { title: 'The CRAAP Test', type: 'rule', content: 'Currency: When was it published? Is it up to date? Relevance: Does it relate to your topic? Who is the intended audience? Authority: Who wrote it? What are their credentials? Accuracy: Is it supported by evidence? Can you verify it? Purpose: Why was it written? To inform, persuade, sell, entertain?' },
          { title: 'Identifying Bias', type: 'rule', content: 'Types of bias: Selection bias: cherry-picking evidence. Confirmation bias: only seeking evidence that supports your view. Funding bias: "Research funded by Coca-Cola finds sugar is not harmful." Language bias: loaded/emotional words instead of neutral ones. Publication bias: journals prefer positive results. Questions to ask: Who funded this research? What evidence is missing? Are alternative explanations considered? Does the language steer you toward a conclusion?' },
          { title: 'Test Yourself', type: 'exercise', content: 'Evaluate this source.', question: 'A blog post titled "Why Organic Food Cures Cancer" by a health food company, no citations, published 2015.', answer: 'Unreliable: Currency = outdated (2015). Authority = a company, not a researcher (conflict of interest). Accuracy = no citations. Purpose = to sell organic food (bias). The headline makes an unsupported claim (organic food doesn\'t "cure" cancer).', answerExplanation: 'CRAAP test reveals multiple red flags: old, biased source, no evidence, commercial purpose, and a misleading headline.' },
        ],
        keyTakeaways: ['CRAAP: Currency, Relevance, Authority, Accuracy, Purpose', 'Always ask: who funded this? What\'s missing?', 'Bias ≠ wrong, but it means reading more critically', 'Peer-reviewed > government reports > news > blogs > social media'],
        relatedLessons: ['c1-critical-reading', 'c2-argumentation'],
      },

      // # ─── 14. Professional Settings ───
      {
        id: 'c2-professional-settings',
        title: 'Formal vs Informal in Professional Settings',
        description: 'Navigate workplace communication — emails, meetings, negotiations, and small talk.',
        skill: 'speaking', level: 'C2', duration: 10,
        objectives: ['Write professional emails at different formality levels', 'Use appropriate language in meetings', 'Make workplace small talk and build rapport'],
        sections: [
          { title: 'Email Formality Levels', type: 'rule', content: 'Very formal (to client/senior): "Dear Mr Smith, I am writing to follow up on our discussion regarding..." Standard (to colleague): "Hi Sarah, Just following up on our chat about..." Casual (to close team member): "Hey! Quick one — did you get a chance to look at...?" Key phrases: Opening: "I hope this finds you well." (formal) → "Hope you\'re well!" (casual). Requesting: "I would be grateful if..." → "Could you...?" → "Can you...?" Closing: "Kind regards" → "Best" → "Cheers"' },
          { title: 'Meeting Language', type: 'rule', content: 'Opening: "Shall we get started?" "Let\'s begin." Giving opinions: "I\'d like to suggest that..." "In my view..." Agreeing: "I\'m in complete agreement." "Absolutely." Disagreeing: "I see your point, but..." "I\'m not entirely convinced." Interrupting politely: "Sorry, could I just add something?" "If I may..." Summarising: "So to sum up..." "The key takeaway is..."' },
          { title: 'Small Talk', type: 'tip', content: 'Safe topics: weather, weekend plans, travel, sports, food, hobbies, industry news. Risky topics: politics, religion, salary, personal problems, controversial issues. Good openers: "How was your weekend?" "Did you see the news about...?" "Have you tried that new restaurant on...?" "How are you finding the new system?" Follow up: show genuine interest, ask follow-up questions, share something brief about yourself.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite this email more professionally.', question: '"Hey, you didn\'t send me the report. I need it now."', answer: '"Hi [name], I hope you\'re well. I just wanted to check in regarding the quarterly report — I don\'t think I\'ve received it yet. Would you be able to send it through when you get a chance? Many thanks, [your name]"', answerExplanation: 'Softened: removed accusation, added polite framing, used hedging (I don\'t think), added please/thanks, gave flexibility (when you get a chance).' },
        ],
        keyTakeaways: ['Match email formality to your relationship with the reader', 'Disagree politely in meetings: "I see your point, but..."', 'Small talk: weather/plans = safe. Politics/salary = risky.', 'Politeness increases with power distance and formality'],
        relatedLessons: ['c2-register-switching', 'c2-politeness'],
      },

      // # ─── 15. Colloquial English ───
      {
        id: 'c2-colloquial-english',
        title: 'Colloquial English: Slang, Fillers, and Spoken Patterns',
        description: 'Understand real spoken English — "gonna," "wanna," "you know," "like," "I mean."',
        skill: 'listening', level: 'C2', duration: 10,
        objectives: ['Understand common spoken reductions', 'Recognise fillers and discourse markers in speech', 'Use colloquial language appropriately'],
        sections: [
          { title: 'Spoken Reductions', type: 'rule', content: 'going to → gonna: "I\'m gonna leave." want to → wanna: "I wanna go home." got to → gotta: "I gotta run." have to → hafta: "I hafta finish this." don\'t know → dunno: "I dunno what happened." kind of → kinda: "I kinda like it." sort of → sorta: "It\'s sorta weird." These are SPOKEN only — never write them in formal contexts.' },
          { title: 'Fillers and Discourse Markers', type: 'rule', content: 'Thinking time: "um," "uh," "er," "well," "let me think..." Softening: "like" = approximately or softener: "It was, like, 10 o\'clock." "You know" = checking understanding: "It was, you know, really difficult." Correcting: "I mean" = clarification: "I\'m tired. I mean, I didn\'t sleep at all." "Actually" = correction: "Actually, I think you\'re right." "Basically" = simplifying: "Basically, we need more time." "Literally" (informal intensifier): "I literally died laughing." (hyperbole, not literal)' },
          { title: 'When to Use (and Not Use) Colloquial English', type: 'tip', content: 'USE in: casual conversation, social media, creative writing, understanding native speakers. DO NOT USE in: academic essays, formal emails, job interviews, IELTS/PTE writing, official documents. Understanding ≠ using: you need to understand "gonna" when native speakers say it, but you should generally use "going to" in your own formal speech and writing.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Translate this colloquial speech to standard English.', question: '"I dunno, I kinda wanna go but I gotta finish this first, you know?"', answer: '"I\'m not sure. I would quite like to go, but I need to finish this first."', answerExplanation: 'dunno→I\'m not sure, kinda→quite, wanna→would like to, gotta→need to. Removed filler "you know."' },
        ],
        keyTakeaways: ['gonna/wanna/gotta = spoken forms (don\'t write in formal contexts)', 'Fillers (like, you know, I mean) are normal in speech', 'Understanding colloquial ≠ needing to use it', 'Know both registers: understand casual, produce formal'],
        relatedLessons: ['c2-register-switching', 'c2-irony-sarcasm'],
      },

      // # ─── 16. Persuasion & Argumentation ───
      {
        id: 'c2-persuasion',
        title: 'Persuasion & Argumentation Techniques',
        description: 'Convince others through logic, emotion, and credibility — ethos, pathos, logos.',
        skill: 'writing', level: 'C2', duration: 12,
        objectives: ['Apply Aristotle\'s three modes of persuasion', 'Use persuasive techniques ethically', 'Write compelling opinion pieces'],
        sections: [
          { title: 'The Three Modes', type: 'rule', content: 'Ethos (credibility): Establish your authority and trustworthiness: "As a doctor with 20 years of experience..." "Research from Harvard shows..." Pathos (emotion): Appeal to the audience\'s feelings: "Imagine a child who goes to bed hungry every night." "How would you feel if this happened to your family?" Logos (logic): Use evidence, data, and reasoning: "Studies show that X leads to Y." "If A is true, then B must follow." The most effective persuasion uses all three.' },
          { title: 'Persuasive Techniques', type: 'rule', content: 'Call to action: "We must act now." "Join us in making a difference." Inclusive language: "We" instead of "you" — "Together, we can..." Repetition for emphasis: "Education changes lives. Education breaks cycles. Education builds futures." Rhetorical questions: "Can we really afford to ignore this?" Evidence + story: statistics prove the point, stories make people care. Concession: "Admittedly, X is true. However, Y is more important because..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Identify ethos, pathos, and logos.', question: '"According to WHO data, 3 million children die from malnutrition each year. Imagine holding a child who hasn\'t eaten in three days. As medical professionals, we cannot stand by."', answer: 'Logos: "WHO data, 3 million children" (evidence). Pathos: "Imagine holding a child who hasn\'t eaten" (emotional appeal). Ethos: "As medical professionals" (credibility/authority).', answerExplanation: 'All three modes in one paragraph — this is effective persuasion: it\'s credible, emotional, and logical.' },
        ],
        keyTakeaways: ['Ethos = credibility. Pathos = emotion. Logos = logic.', 'Best persuasion combines all three', 'Conceding a point STRENGTHENS your argument', 'Stories make data memorable; data makes stories credible'],
        relatedLessons: ['c2-rhetorical-devices', 'c2-argumentation'],
      },

      // # ─── 17. Writing for Audiences ───
      {
        id: 'c2-writing-audiences',
        title: 'Writing for Different Purposes & Audiences',
        description: 'Adapt your writing for essays, reports, reviews, blogs, and creative pieces.',
        skill: 'writing', level: 'C2', duration: 10,
        objectives: ['Identify the features of different text types', 'Adapt style for different audiences', 'Write multi-purpose texts (inform + persuade)'],
        sections: [
          { title: 'Text Types', type: 'rule', content: 'Essay: formal, structured (intro-body-conclusion), impersonal, hedged. Report: formal, factual, headings, recommendations. Review: semi-formal, evaluative, recommendation. Article: engaging, clear, may include opinion, wider audience. Blog: informal, personal, conversational, first person. Letter/email: varies by purpose (complaint, application, enquiry). Each type has conventions — following them shows competence.' },
          { title: 'Audience Adaptation', type: 'tip', content: 'For experts: use technical vocabulary, assume background knowledge, go deeper. For general public: avoid jargon, explain terms, use examples. For children: shorter sentences, simpler vocabulary, more visuals. For decision-makers: lead with conclusions, be concise, focus on impact. Ask: What does my reader already know? What do they need to know? What will make them care? How do they want to receive information?' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite this for a general audience.', question: 'Technical: "The patient presented with acute myocardial infarction secondary to coronary artery occlusion."', answer: '"The patient had a heart attack caused by a blocked artery."', answerExplanation: 'Replaced medical terminology with everyday language. Same information, accessible audience.' },
        ],
        keyTakeaways: ['Different text types have different conventions', 'Always consider: What does my reader know? What do they need?', 'Experts: technical language. Public: plain language.', 'Purpose determines structure: inform, persuade, evaluate, entertain'],
        relatedLessons: ['c2-style-tone', 'c2-register-switching'],
      },

      // # ─── 18. Pronunciation: Stress & Intonation ───
      {
        id: 'c2-stress-intonation',
        title: 'Advanced Pronunciation: Stress, Rhythm, Intonation',
        description: 'Sound more natural — word stress, sentence stress, and intonation patterns that convey meaning.',
        skill: 'pronunciation', level: 'C2', duration: 12,
        objectives: ['Use word stress to distinguish meaning (record vs record)', 'Apply sentence stress for emphasis', 'Use intonation patterns for questions, lists, and attitudes'],
        sections: [
          { title: 'Word Stress Shifts Meaning', type: 'rule', content: 'Some words change meaning when stress moves: REcord (noun) vs reCORD (verb). PREsent (noun/adj) vs preSENT (verb). PROduce (noun) vs proDUCE (verb). OBject (noun) vs obJECT (verb). CONtract (noun) vs conTRACT (verb). Pattern: many two-syllable words stress the FIRST syllable as nouns and the SECOND as verbs.' },
          { title: 'Sentence Stress', type: 'rule', content: 'English is a stress-timed language — stressed words carry the meaning: "I DIDN\'T say he STOLE the money." (someone else said it) "I didn\'t SAY he stole the money." (I implied it) "I didn\'t say HE stole the money." (someone else stole it) "I didn\'t say he stole the MONEY." (he stole something else) Same words, different stress = completely different meaning. Content words (nouns, verbs, adjectives) are stressed. Function words (a, the, is, to) are usually unstressed.' },
          { title: 'Intonation Patterns', type: 'rule', content: 'Rising intonation ↗: yes/no questions, checking, surprise. "Are you coming? ↗" "Really? ↗" Falling intonation ↘: statements, wh-questions, finished thoughts. "I\'m going home. ↘" "Where are you going? ↘" Rise-fall: listing (rise on each item, fall on the last): "I need eggs ↗, milk ↗, bread ↗, and butter ↘."' },
          { title: 'Test Yourself', type: 'exercise', content: 'How does stress change the meaning?', question: 'Sentence: "I never said she was beautiful." Stress "SHE."', answer: '"I never said SHE was beautiful" implies: I said someone else was beautiful, but not her specifically.', answerExplanation: 'Stressing SHE contrasts her with other people. The stress identifies which word the speaker wants to emphasise or correct.' },
        ],
        keyTakeaways: ['Word stress can change meaning: REcord ≠ reCORD', 'Sentence stress changes what you\'re emphasising', 'Rising = questions/uncertainty. Falling = statements/certainty.', 'English rhythm is stress-timed, not syllable-timed'],
        relatedLessons: ['c2-colloquial-english', 'c2-register-switching'],
      },

      // # ─── 19–25. Remaining C2 Lessons ───

      { id: 'c2-accent-variation', title: 'Advanced Listening: Accent Variation', description: 'Understand English from around the world — British, American, Australian, Indian, and more.',
        skill: 'listening', level: 'C2', duration: 10,
        objectives: ['Identify key features of major English accents', 'Understand speakers from different English-speaking regions', 'Avoid accent-based assumptions'],
        sections: [
          { title: 'Major Accent Groups', type: 'rule', content: 'British RP: non-rhotic (no "r" in "car"), long vowels, clear pronunciation. American General: rhotic ("r" in "car"), flapped "t" (water = "wader"), flat "a" (bath). Australian: raised vowels, upward intonation, "no" sounds like "naow." Irish: rhotic, distinct vowels, musicality. Indian: retroflex consonants, syllable-timed rhythm, "v" and "w" sometimes swapped. South African: distinctive vowels, influenced by Afrikaans.' },
          { title: 'Vocabulary Differences', type: 'tip', content: 'British vs American: flat/apartment, lift/elevator, boot/trunk, biscuit/cookie, queue/line, rubbish/garbage, petrol/gas, holiday/vacation. Australian: arvo (afternoon), barbie (barbecue), heaps (lots). Indian English: prepone (opposite of postpone), do the needful, itself (emphasis: "today itself"). These are all CORRECT — English is pluricentric (no single "correct" version).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Which accent features are described?', question: '"The speaker drops the R at the end of words, says \'bahth\' instead of \'bath\', and pronounces every T clearly."', answer: 'British RP (Received Pronunciation) — non-rhotic, long "ah" vowel in bath, and clear /t/ sounds.', answerExplanation: 'These are classic RP features: non-rhotic (no final R), broad A in bath words, and unaflapped T.' },
        ],
        keyTakeaways: ['No accent is more "correct" — English is pluricentric', 'Rhotic (pronounce R) vs non-rhotic is a major divider', 'Exposure is the best training — listen to diverse speakers', 'Vocabulary varies: lift/elevator, boot/trunk'],
        relatedLessons: ['c2-colloquial-english', 'c2-stress-intonation'],
      },

      { id: 'c2-turn-taking', title: 'Discourse Management: Turn-Taking', description: 'Manage conversations naturally — interrupt politely, hold the floor, give turns.',
        skill: 'speaking', level: 'C2', duration: 10,
        objectives: ['Enter and exit conversations smoothly', 'Hold the floor when speaking at length', 'Use back-channelling to show active listening'],
        sections: [
          { title: 'Taking a Turn', type: 'rule', content: 'Starting: "Can I just say something?" "If I could just come in here..." "That reminds me of..." "Going back to what you said about..." Polite interruption: "Sorry, could I just add..." "If I may..." "Just to pick up on that point..."' },
          { title: 'Holding the Floor', type: 'rule', content: 'Signal you have more to say: "There are two things I want to mention..." "Let me finish this point..." "What I\'m trying to say is..." "The thing is..." Use connectors: "firstly... secondly... and finally..." Back-channelling (showing you\'re listening): "Mm-hmm." "Right." "I see." "Uh-huh." "Really?" "That\'s interesting."' },
          { title: 'Test Yourself', type: 'exercise', content: 'How would you politely interrupt to add a related point?', question: 'Your colleague is talking about sales figures and you have relevant data.', answer: '"Sorry to jump in, but I think the data I have might be relevant here — we actually saw a similar trend in Q3."', answerExplanation: 'Polite interruption (sorry to jump in) + relevance justification (might be relevant) + brief contribution.' },
        ],
        keyTakeaways: ['Use phrases to enter, hold, and give up turns', 'Back-channel to show you\'re listening (mm-hmm, I see)', '"Sorry, could I just..." = polite interruption', 'Signal you have more to say before someone else takes over'],
        relatedLessons: ['c2-politeness', 'c2-professional-settings'],
      },

      { id: 'c2-extended-arguments', title: 'Speaking: Building Extended Arguments', description: 'Speak at length with structure and coherence — essential for C2 speaking exams.',
        skill: 'speaking', level: 'C2', duration: 12,
        objectives: ['Structure a 2-minute monologue', 'Use signposting language', 'Develop points with examples and personal experience'],
        sections: [
          { title: 'Structure', type: 'rule', content: 'For a 2-minute response: Opening (10 sec): State your main point clearly. "I believe that..." Body (90 sec): 2-3 supporting points with examples. "Firstly... For example..." "Another important factor is..." Conclusion (20 sec): Summarise and give a final thought. "So overall, I\'d say that..."' },
          { title: 'Signposting', type: 'rule', content: 'First point: "To begin with..." "The first thing I\'d say is..." Adding: "In addition to that..." "On top of that..." Contrasting: "Having said that..." "On the other hand..." Exemplifying: "Take, for instance..." "A good example of this would be..." Concluding: "All things considered..." "On balance, I\'d say..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Plan a 2-minute answer.', question: '"Do you think technology makes people\'s lives better?"', answer: 'Opening: "On balance, I believe technology has significantly improved our lives, though not without drawbacks." Point 1: Healthcare — "Medical technology has transformed diagnosis and treatment. For example, AI can now detect cancer earlier than human doctors." Point 2: Communication — "Technology connects us globally. However, this has come at the cost of face-to-face interaction." Conclusion: "So while technology brings challenges, the overall impact on health, communication, and access to information is overwhelmingly positive."', answerExplanation: 'Structured: opening position → 2 points with examples → balanced conclusion. Uses signposting throughout.' },
        ],
        keyTakeaways: ['Open with your position. Support with 2-3 points. Conclude.', 'Use signposting: firstly, in addition, having said that', 'Every point needs an example or personal experience', '"All things considered" / "On balance" for balanced conclusions'],
        relatedLessons: ['c2-argumentation', 'c2-turn-taking'],
      },

      { id: 'c2-language-culture', title: 'Language & Culture: Understanding Context', description: 'How culture shapes language — taboos, politeness norms, humour, and communication styles.',
        skill: 'general', level: 'C2', duration: 10,
        objectives: ['Understand how culture influences communication style', 'Navigate cultural differences in English-speaking countries', 'Avoid cultural misunderstandings'],
        sections: [
          { title: 'High vs Low Context Cultures', type: 'rule', content: 'Low context (UK, US, Australia): meaning is in the WORDS. People say what they mean (mostly). Communication is direct, explicit, and verbal. High context (Japan, Korea, Middle East): meaning is in the SITUATION. Much is implied, not stated. Reading between the lines is essential. English-speaking countries tend to be low-context BUT: British English uses more indirectness and understatement than American English.' },
          { title: 'Cultural Communication Differences', type: 'tip', content: 'Directness: American > Australian > British (most indirect). Humour: British = dry, ironic, self-deprecating. American = bigger, more obvious. Australian = teasing as affection. Formality: varies hugely by country, industry, and generation. Taboo topics: In the UK, asking someone\'s salary is very rude. In the US, political discussion can be divisive. In Australia, being pretentious ("too serious") is disliked. These are generalisations — individuals vary enormously.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Interpret this British English response.', question: 'You suggest a plan. Your British colleague says: "That\'s a very brave idea."', answer: 'In British English, "brave" here likely means "risky/unwise/foolish" — it\'s a polite way of saying they disagree with the plan.', answerExplanation: 'British understatement: "brave" = they think it\'s a bad idea but won\'t say so directly. Similar: "interesting" can mean "I disagree."' },
        ],
        keyTakeaways: ['English-speaking cultures are mostly low-context (explicit)', 'British = indirect + understatement. American = more direct.', 'Humour, directness, and taboos vary by culture', 'When in doubt: observe, ask, and adapt'],
        relatedLessons: ['c1-pragmatics', 'c2-irony-sarcasm'],
      },

      { id: 'c2-conditional-review', title: 'All Conditionals: Comprehensive Review', description: 'Master every conditional form — zero to mixed, formal inversions, and alternatives to "if."',
        skill: 'grammar', level: 'C2', duration: 12,
        objectives: ['Use all conditional types fluently', 'Replace "if" with alternatives', 'Handle conditional nuances at C2'],
        sections: [
          { title: 'All Five Types', type: 'rule', content: 'Zero: If + present, present (facts): "If you heat water, it boils." First: If + present, will (real future): "If it rains, we\'ll cancel." Second: If + past, would (unreal present): "If I were rich, I\'d travel." Third: If + past perfect, would have (unreal past): "If I had known, I would have helped." Mixed: past→present or present→past: "If I had studied medicine, I would be a doctor now."' },
          { title: 'Alternatives to "If"', type: 'rule', content: 'Provided (that) / Providing (that): "You can go, provided that you finish your work." As long as: "You can borrow it as long as you return it." On condition that: "I\'ll help on condition that you help me too." Suppose / Supposing: "Supposing you won the lottery — what would you do?" Even if (concessive): "I wouldn\'t go even if you paid me." Unless (= if not): "Unless you hurry, you\'ll be late." But for (= if it weren\'t for): "But for your help, I would have failed."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Identify the conditional type and rewrite using an alternative to "if."', question: '"If she hadn\'t reminded me, I would have forgotten."', answer: 'Type: 3rd conditional. Rewrite: "But for her reminder, I would have forgotten." OR "Had she not reminded me, I would have forgotten."', answerExplanation: '3rd conditional (unreal past). "But for" replaces "if...not." Inversion "Had she not" replaces "If she hadn\'t."' },
        ],
        keyTakeaways: ['Five types: zero, 1st, 2nd, 3rd, mixed', 'Alternatives: provided, as long as, suppose, unless, but for', 'Inversion: Had I known... Were she here... Should you need...', 'At C2, fluent switching between all forms is expected'],
        relatedLessons: ['c1-advanced-conditionals', 'b2-mixed-conditionals'],
      },

      { id: 'c2-error-analysis', title: 'Error Analysis: Fossilised Mistakes', description: 'Identify and fix the errors that persist even at advanced levels — the "last 5%" of accuracy.',
        skill: 'grammar', level: 'C2', duration: 10,
        objectives: ['Identify common fossilised errors at C2', 'Understand why these errors persist', 'Develop strategies to correct them'],
        sections: [
          { title: 'Common Fossilised Errors', type: 'rule', content: 'Articles (the/a/Ø): The most common error at ALL levels: "I went to the school" (general) → "I went to school." "She plays the piano" ✓ but "She plays football" (no "the"). Subject-verb agreement with complex subjects: "The number of students has increased." (number = singular) "A number of students have complained." (a number of = several = plural). Preposition errors: "I\'m interested in..." "She depends on..." "I\'m married to..." (prepositions don\'t follow logic — learn each verb\'s preposition).' },
          { title: 'Why They Persist', type: 'tip', content: 'Errors fossilise because: L1 interference: your first language\'s patterns override English rules. Comfort: you\'ve been saying it wrong for years and it feels "right." Communication success: people understand you despite the error, so there\'s no pressure to fix it. To fix: awareness (know what your errors are), practice (targeted exercises), feedback (ask for correction), and patience (rewiring takes time).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Find and correct the errors.', question: '"I am agree with this opinion. She married with a doctor and depends of her parents."', answer: '"I agree with this opinion. She married a doctor and depends on her parents."', answerExplanation: '"Am agree" → "agree" (agree doesn\'t use be). "Married with" → "married" (no preposition). "Depends of" → "depends on."' },
        ],
        keyTakeaways: ['Articles, prepositions, and subject-verb agreement are the "last 5%"', 'Errors fossilise because communication succeeds despite them', 'Fix strategy: awareness → targeted practice → feedback → time', 'Even C2 speakers have blind spots — the goal is progress, not perfection'],
        relatedLessons: ['c2-conditional-review', 'c2-modal-nuances'],
      },

      { id: 'c2-synthesis', title: 'Synthesis: Bringing It All Together', description: 'The final lesson — integrate every skill into fluent, natural, confident English.',
        skill: 'general', level: 'C2', duration: 15,
        objectives: ['Self-assess across all skill areas', 'Identify remaining gaps for continued improvement', 'Set goals for lifelong English development'],
        sections: [
          { title: 'The C2 Standard', type: 'text', content: 'C2 does not mean "perfect." It means: You can understand virtually everything you read or hear. You can express yourself spontaneously, fluently, and precisely. You can distinguish fine shades of meaning. You can produce clear, well-structured, detailed text on complex subjects. You can still make occasional errors — even native speakers do. The difference is that C2 speakers can self-correct and adapt.' },
          { title: 'Continued Growth Areas', type: 'rule', content: 'Even at C2, focus on: Vocabulary depth: synonyms, collocations, connotations. Idiomatic fluency: using the right idiom at the right moment. Cultural competence: understanding humour, references, subtext. Academic precision: hedging, nominalisation, cohesion. Accent and pronunciation: clarity, natural rhythm, stress. Strategies: read widely (novels, academic papers, journalism). Listen actively (podcasts, lectures, films without subtitles). Write regularly (journals, essays, creative pieces). Speak with native and non-native speakers.' },
          { title: 'Self-Assessment Checklist', type: 'tip', content: 'Rate yourself 1-5 on each: Grammar accuracy in speech ___. Grammar accuracy in writing ___. Vocabulary range ___. Reading comprehension ___. Listening (native speed) ___. Speaking fluency ___. Writing organisation ___. Cultural awareness ___. Pronunciation clarity ___. Pragmatic competence ___. Any score below 4? That is your next focus area.' },
          { title: 'Final Reflection', type: 'exercise', content: 'Think about your English journey.', question: 'What is the one thing you could NOT do in English a year ago that you CAN do now?', answer: 'This is personal — there is no wrong answer. The purpose is to recognise your progress, which is the most powerful motivator for continued learning.', answerExplanation: 'Language learning is a lifelong journey. Celebrating progress keeps motivation high.' },
        ],
        keyTakeaways: ['C2 = near-native fluency, not perfection', 'Continued growth: vocabulary depth, cultural fluency, pragmatics', 'Read widely, listen actively, write regularly, speak often', 'Celebrate progress — language learning never truly ends'],
        relatedLessons: ['c2-error-analysis', 'c2-argumentation', 'c2-register-switching'],
      },
    ],
  },
]
