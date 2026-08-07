// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 6: B1 Intermediate Expansion (17 new lessons)
// # ═══════════════════════════════════════════════════════════════════════════
// # Adds to the existing 8 B1 lessons (from lesson-data.ts & lesson-data-2.ts)
// # to reach 25 total. Covers: used to, gerunds vs infinitives, second conditional,
// # perfect continuous, past perfect, indirect questions, phrasal verb patterns, etc.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_6: LessonCategory[] = [
  {
    id: 'b1-intermediate',
    name: 'B1: Intermediate Expansion',
    description: 'Deepen your grammar — past perfect, second conditional, verb patterns, and more sophisticated structures.',
    icon: '📘',
    lessons: [

      // # ─── 1. Used To / Would ───
      {
        id: 'b1-used-to',
        title: 'Used To & Would: Past Habits',
        description: 'Talk about things that were true in the past but are no longer — "I used to live in Paris."',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use "used to" for past states and habits', 'Use "would" for repeated past actions only', 'Distinguish from "be used to" (= be accustomed to)'],
        sections: [
          { title: 'Used To', type: 'rule', content: 'Subject + used to + base verb — for habits AND states that are no longer true: Habits: "I used to smoke, but I quit." "She used to walk to school." States: "He used to live in Paris." "This used to be a factory." Negative: "I didn\'t use to like coffee." (note: "use to," not "used to"). Question: "Did you use to play sports?" "Where did she use to live?"' },
          { title: 'Would for Past Habits', type: 'rule', content: '"Would" can replace "used to" for repeated ACTIONS — but NOT for states: ✓ "Every summer, we would go to the beach." (repeated action) ✓ "She would always bring flowers." (repeated action) ✗ "I would live in Paris." → WRONG (state, not action) ✗ "He would be a teacher." → WRONG (state) Use "used to" for everything. Use "would" only for repeated actions.' },
          { title: 'Be Used To ≠ Used To', type: 'tip', content: '"Be used to" + noun/-ing = be ACCUSTOMED to (present): "I\'m used to living alone." (= I\'m accustomed to it) "She\'s used to the cold weather." "Used to" + base verb = PAST habit: "I used to live alone." (= in the past, not now) Completely different meanings — don\'t confuse them.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose used to, would, or be used to.', question: '"When I was a child, I _____ (play) in the park every day. Now I _____ (be used to) working in an office."', answer: 'used to play (or would play) ... am used to', answerExplanation: 'Past repeated action → used to / would. Current state of being accustomed → am used to.' },
        ],
        keyTakeaways: ['Used to + base verb = past habit/state (no longer true)', 'Would = past repeated ACTIONS only (not states)', 'Didn\'t use to / Did you use to (no -d in negatives/questions)', 'Be used to + -ing = be accustomed to (present, different meaning)'],
        commonMistakes: ['"I would live in Paris" (state) → "I used to live in Paris"', '"I didn\'t used to" → "I didn\'t use to"', '"I\'m used to smoke" → "I\'m used to smoking" (be used to + -ing)'],
        relatedLessons: ['a2-past-simple-regular', 'b1-past-perfect'],
      },

      // # ─── 2. Gerunds vs Infinitives (Full) ───
      {
        id: 'b1-gerunds-vs-infinitives',
        title: 'Gerunds vs Infinitives: The Full Guide',
        description: 'Master the tricky choice between -ing and "to" — the rule set that drives learners crazy.',
        skill: 'grammar', level: 'B1', duration: 15,
        objectives: ['Know which verbs take -ing, which take to, which take both', 'Handle verbs that change meaning (stop, remember, try)', 'Apply the rules confidently'],
        sections: [
          { title: 'Verb + Gerund (-ing) Only', type: 'rule', content: 'enjoy, finish, avoid, mind, suggest, consider, miss, keep, practise, risk, imagine, deny, admit, delay, give up, put off, can\'t help, feel like: "I enjoy cooking." "She avoided answering." "He denied stealing the money." "I can\'t help laughing." After prepositions: always -ing: "good at dancing," "interested in learning," "think about moving."' },
          { title: 'Verb + To Infinitive Only', type: 'rule', content: 'want, need, decide, plan, hope, learn, agree, promise, refuse, offer, manage, afford, pretend, seem, appear, tend, choose, expect, would like: "I want to leave." "She decided to stay." "He refused to answer." "They can\'t afford to buy a house."' },
          { title: 'Verbs That Change Meaning', type: 'rule', content: 'STOP: "I stopped smoking." (= I quit — the smoking ended) "I stopped to smoke." (= I paused in order to have a cigarette) REMEMBER: "I remember locking the door." (= I have a memory of doing it) "I remember to lock the door." (= I don\'t forget to do it) TRY: "Try eating less sugar." (= experiment, see if it helps) "I tried to open the door." (= I attempted but maybe failed) FORGET: "I forgot meeting him." (= I don\'t have the memory) "I forgot to meet him." (= I didn\'t do it)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose -ing or to + infinitive.', question: '"She stopped _____ (talk) and started _____ (listen). He suggested _____ (take) a break."', answer: 'talking ... to listen (or listening) ... taking', answerExplanation: 'Stopped talking = quit talking. Started to listen/listening = both work. Suggest + -ing.' },
        ],
        keyTakeaways: ['enjoy/avoid/suggest/mind/finish → -ing only', 'want/need/decide/hope/agree → to only', 'stop/remember/try/forget → meaning changes based on choice', 'After prepositions → always -ing'],
        commonMistakes: ['"I enjoy to swim" → "I enjoy swimming"', '"She suggested to go" → "She suggested going"', 'Confusing "I stopped to smoke" and "I stopped smoking"'],
        relatedLessons: ['a2-verb-infinitive', 'a2-verb-gerund'],
      },

      // # ─── 3. Second Conditional ───
      {
        id: 'b1-second-conditional',
        title: 'Second Conditional: Imaginary Situations',
        description: 'Dream about things that are not real — "If I had a million dollars, I would travel the world."',
        skill: 'grammar', level: 'B1', duration: 12,
        objectives: ['Form: If + past simple, would + base verb', 'Use for unreal/hypothetical present/future situations', 'Use "were" instead of "was" in formal English'],
        sections: [
          { title: 'Structure', type: 'rule', content: 'If + past simple, would + base verb: "If I had more time, I would learn Japanese." "If she won the lottery, she would buy a house." "If I were you, I would apologise." Negative: "If I didn\'t have to work, I would travel." "I wouldn\'t do that if I were you." Note: use PAST tense in the if-clause, but the meaning is PRESENT/FUTURE (unreal).' },
          { title: 'If I Were (Not Was)', type: 'tip', content: 'In formal/correct English, use "were" for all subjects with "be": "If I were rich..." (not "If I was rich") "If she were here..." "If it were possible..." In informal speech, "was" is common and accepted: "If I was rich..." Both are understood, but "were" is considered more correct, especially in: "If I were you, I\'d..." (giving advice).' },
          { title: 'First vs Second Conditional', type: 'rule', content: 'First: REAL possibility → If + present, will: "If it rains tomorrow, I\'ll stay home." (it might really rain) Second: UNREAL/UNLIKELY → If + past, would: "If I were president, I would change the law." (I am not president) "If I had wings, I would fly to work." (impossible) Key: How likely is the situation? Possible → first. Imaginary → second.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Complete the second conditional.', question: '"If I _____ (speak) perfect English, I _____ (get) a better job."', answer: 'spoke ... would get', answerExplanation: 'If-clause: past simple (spoke). Result: would + base verb (would get). The speaker doesn\'t speak perfect English — it\'s hypothetical.' },
        ],
        keyTakeaways: ['If + past simple, would + base verb', 'For unreal/imaginary situations NOW or in the future', 'If I were you... (advice — "were" preferred)', 'Real possibility = 1st conditional. Imaginary = 2nd conditional.'],
        commonMistakes: ['"If I would have" → "If I had" (no would in if-clause)', '"If I was you" → "If I were you" (formal)', 'Using 2nd for real plans: "If I pass, I would celebrate" → "If I pass, I\'ll celebrate" (1st conditional)'],
        relatedLessons: ['a2-first-conditional', 'b1-expressing-possibility'],
      },

      // # ─── 4. Present Perfect Continuous ───
      {
        id: 'b1-present-perfect-continuous',
        title: 'Present Perfect Continuous',
        description: 'Emphasise how long an action has been going on — "I\'ve been waiting for 20 minutes!"',
        skill: 'grammar', level: 'B1', duration: 12,
        objectives: ['Form have/has been + verb-ing', 'Use for duration of an ongoing action', 'Distinguish from present perfect simple'],
        sections: [
          { title: 'Form', type: 'rule', content: 'Have/has + been + verb-ing: "I\'ve been working here for 3 years." "She\'s been studying all day." "They\'ve been waiting since 2 o\'clock." Negative: "I haven\'t been sleeping well recently." Question: "Have you been exercising?" "How long has she been learning English?"' },
          { title: 'When to Use It', type: 'rule', content: 'Duration of an action that started in the past and is STILL HAPPENING (or just stopped): "I\'ve been waiting for 30 minutes." (still waiting) "It\'s been raining all day." (still raining) "She\'s been cooking — the kitchen smells amazing." (just stopped — evidence remains) With for/since + time: "He\'s been working here since January." "I\'ve been learning English for 5 years."' },
          { title: 'Perfect Simple vs Perfect Continuous', type: 'tip', content: 'Present perfect simple = COMPLETED/RESULT: "I\'ve read three books this month." (result: 3 completed books) Present perfect continuous = ONGOING/DURATION: "I\'ve been reading a lot this month." (emphasis on the activity, still ongoing) Simple = how many/how much: "She\'s written 10 emails." Continuous = how long: "She\'s been writing emails all morning." Sometimes both are possible with little difference: "I\'ve lived here for 5 years." = "I\'ve been living here for 5 years."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose perfect simple or perfect continuous.', question: '"You look tired!" — "Yes, I _____ (run) for an hour." "How many kilometres _____ you _____ (run)?"', answer: 'have been running (\'ve been running) ... have ... run', answerExplanation: 'Duration/activity → continuous ("been running for an hour"). Result/quantity → simple ("have run" — how many km?).' },
        ],
        keyTakeaways: ['Form: have/has been + verb-ing', 'For ongoing actions with duration (for/since)', 'Continuous = how long (activity). Simple = how many (result).', 'Evidence of recent activity: "You\'ve been crying" (I can see your red eyes)'],
        commonMistakes: ['"I\'ve been knowing him" → "I\'ve known him" (know = stative, no continuous)', '"I\'ve been writing 3 emails" → "I\'ve written 3 emails" (completed number = simple)'],
        relatedLessons: ['a2-present-perfect-intro', 'a2-for-since'],
      },

      // # ─── 5. Past Perfect ───
      {
        id: 'b1-past-perfect',
        title: 'Past Perfect: The "Before-Past"',
        description: 'Talk about what happened BEFORE another past event — "I had already eaten when she arrived."',
        skill: 'grammar', level: 'B1', duration: 12,
        objectives: ['Form had + past participle', 'Use it to sequence two past events', 'Combine with past simple in sentences'],
        sections: [
          { title: 'Form', type: 'rule', content: 'Had + past participle (for ALL subjects): "I had finished before she arrived." = "I\'d finished before she arrived." "She had already left when I called." "They hadn\'t seen the film before." Question: "Had you eaten before the meeting?" Same form for all subjects: I/you/he/she/we/they had.' },
          { title: 'Why We Need It', type: 'text', content: 'The past perfect creates a "double past" — it shows that one thing happened BEFORE another thing in the past: "When I arrived at the station, the train had already left." Timeline: train left (past perfect, earlier) → I arrived (past simple, later). Without past perfect, the order is unclear: "When I arrived, the train left." (Did it leave before or after I arrived?)' },
          { title: 'Common Patterns', type: 'rule', content: 'After/before/when/by the time: "After she had finished dinner, she watched TV." "Before I moved to London, I had never tried fish and chips." "When we got to the cinema, the film had already started." "By the time he arrived, everyone had gone home." Already/just/never with past perfect: "I had just sat down when the phone rang." "She had never flown before that trip."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose past simple or past perfect.', question: '"When I _____ (get) home, my family _____ (already / eat) dinner."', answer: 'got ... had already eaten', answerExplanation: '"Got home" = the later event (past simple). "Eaten dinner" = happened first (past perfect). The dinner was finished before I arrived.' },
        ],
        keyTakeaways: ['Form: had + past participle (same for all subjects)', 'Shows the EARLIER of two past events', 'Past simple = the later event. Past perfect = the earlier event.', 'Key words: before, after, by the time, already, just, never'],
        commonMistakes: ['"When I arrived, the train already left" → "the train had already left"', '"I had went" → "I had gone" (use past participle, not past simple)'],
        relatedLessons: ['a2-present-perfect-intro', 'b1-used-to', 'b1-narrative-tenses'],
      },

      // # ─── 6. Passive Voice Introduction ───
      {
        id: 'b1-passive-voice',
        title: 'Passive Voice: Introduction',
        description: 'Shift the focus from who does something to what is done — "The book was written by Tolkien."',
        skill: 'grammar', level: 'B1', duration: 12,
        objectives: ['Form passive with be + past participle', 'Know when to use passive vs active', 'Form passive in different tenses'],
        sections: [
          { title: 'Active vs Passive', type: 'rule', content: 'Active: the subject DOES the action: "Shakespeare wrote Hamlet." Passive: the subject RECEIVES the action: "Hamlet was written by Shakespeare." Structure: subject + be + past participle (+ by agent): "The window was broken." "English is spoken in 67 countries." "The thief was arrested by the police."' },
          { title: 'Passive in Different Tenses', type: 'rule', content: 'Present simple: "Coffee is grown in Brazil." "Cars are made in Japan." Past simple: "The bridge was built in 1990." "The emails were sent yesterday." Present perfect: "The report has been finished." "Three people have been arrested." Future (will): "The results will be announced tomorrow." Present continuous: "The road is being repaired."' },
          { title: 'When to Use Passive', type: 'tip', content: 'Use passive when: The OBJECT is more important than the subject: "The Mona Lisa was painted by Leonardo da Vinci." (focus on the painting, not the painter). The doer is unknown or obvious: "My car was stolen." (I don\'t know who did it). "The suspect was arrested." (obviously by police). In formal/academic/scientific writing: "The experiment was conducted..." "The data were analysed..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Change to passive.', question: '"Alexander Graham Bell invented the telephone in 1876."', answer: '"The telephone was invented by Alexander Graham Bell in 1876."', answerExplanation: 'Object (telephone) becomes subject. Verb becomes was + past participle (was invented). Original subject becomes "by..." agent.' },
        ],
        keyTakeaways: ['Form: be + past participle', 'Each tense has its own form of "be"', 'Use when the action/object matters more than the doer', '"By" introduces the agent (often omitted if unknown/obvious)'],
        commonMistakes: ['"The book was write" → "The book was written" (past participle)', '"Coffee is grow in Brazil" → "Coffee is grown in Brazil"'],
        relatedLessons: ['a2-past-simple-regular', 'b1-past-perfect'],
      },

      // # ─── 7. Indirect Questions ───
      {
        id: 'b1-indirect-questions',
        title: 'Indirect Questions: "Could You Tell Me...?"',
        description: 'Ask questions politely — change word order to sound more formal and respectful.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Convert direct questions to indirect form', 'Use polite phrases: Could you tell me, Do you know, I wonder', 'Apply correct word order (no inversion)'],
        sections: [
          { title: 'The Key Change', type: 'rule', content: 'Direct: "Where is the station?" (question word order) Indirect: "Could you tell me where the station is?" (statement word order) The rule: after the polite phrase, use STATEMENT word order — NO inversion of subject and verb. "What time does the shop close?" → "Do you know what time the shop closes?" "Is there a bank near here?" → "Could you tell me if there is a bank near here?"' },
          { title: 'Common Polite Phrases', type: 'rule', content: 'Could you tell me...? "Could you tell me where the nearest ATM is?" Do you know...? "Do you know what time the film starts?" I was wondering... "I was wondering if you could help me." Would you mind telling me...? "Would you mind telling me how to get there?" I\'d like to know... "I\'d like to know when the next train leaves."' },
          { title: 'Yes/No → If/Whether', type: 'tip', content: 'When the original question is yes/no (no question word), use "if" or "whether": "Is the museum open?" → "Do you know if the museum is open?" "Does she speak English?" → "Could you tell me whether she speaks English?" "If" and "whether" are interchangeable here.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Make this indirect.', question: '"Where can I buy tickets?"', answer: '"Could you tell me where I can buy tickets?"', answerExplanation: 'Polite phrase + question word + statement order. "Can I" becomes "I can" — no inversion.' },
        ],
        keyTakeaways: ['After polite phrases: statement word order (no inversion)', '"Is it...?" → "...if/whether it is..."', 'Do/does/did disappear: "What time does it close?" → "...what time it closes"', 'Common starters: Could you tell me, Do you know, I wonder'],
        commonMistakes: ['"Could you tell me where is the bank?" → "...where the bank is"', '"Do you know does she work here?" → "Do you know if she works here?"'],
        relatedLessons: ['a1-present-simple-questions', 'a1-question-words'],
      },

      // # ─── 8. Quantifiers ───
      {
        id: 'b1-quantifiers',
        title: 'Quantifiers: All, Most, Some, Few, None',
        description: 'Express quantities precisely — from "all" to "none" with everything in between.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use the full range of quantifiers correctly', 'Match each with countable or uncountable nouns', 'Know a few vs few, a little vs little'],
        sections: [
          { title: 'The Quantifier Scale', type: 'rule', content: 'From most to least: all (100%) — "All students must register." most (majority) — "Most people like chocolate." a lot of / lots of (large amount) — "There are a lot of tourists." many/much (large, in negatives/questions) — "How many students?" some (moderate) — "Some shops are still open." a few / a little (small but enough) — "I have a few questions." few / little (small and NOT enough) — "Few people came." (= not many, disappointing) no / none (zero) — "There are no seats left." / "None of them came."' },
          { title: 'A Few vs Few, A Little vs Little', type: 'tip', content: 'This is a common exam question — the "a" makes a big difference: "A few" = some, enough (positive): "I have a few friends here." (= some, that\'s OK) "Few" = not many, not enough (negative): "I have few friends here." (= almost none, I\'m lonely) "A little" = some, enough: "There\'s a little milk left." (= enough for one coffee) "Little" = not much, not enough: "There\'s little milk left." (= almost none, we need to buy more)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose a few, few, a little, or little.', question: '"She has _____ patience with children — she gets angry quickly. But she has _____ good friends who help her."', answer: 'little ... a few', answerExplanation: 'Little patience = not enough (negative). A few friends = some, sufficient (positive).' },
        ],
        keyTakeaways: ['all > most > a lot of > many/much > some > a few/a little > few/little > no/none', 'A few/a little = small but sufficient (positive)', 'Few/little = not enough (negative)', 'Many + countable. Much + uncountable. A lot of + both.'],
        commonMistakes: ['"Most of students" → "Most students" or "Most of the students" (of + the)', '"I have few friends" when meaning positive → "I have a few friends"'],
        relatedLessons: ['a1-some-any', 'a1-countable-uncountable'],
      },

      // # ─── 9. Phrasal Verb Patterns ───
      {
        id: 'b1-phrasal-verb-patterns',
        title: 'Phrasal Verbs: Types and Patterns',
        description: 'Understand the four types of phrasal verbs and where the object goes.',
        skill: 'vocabulary', level: 'B1', duration: 12,
        objectives: ['Identify separable vs inseparable phrasal verbs', 'Know intransitive phrasal verbs (no object)', 'Place pronouns correctly'],
        sections: [
          { title: 'Type 1: Intransitive (No Object)', type: 'rule', content: 'Some phrasal verbs take NO object: "The plane took off." "I grew up in London." "She broke down and cried." "Sit down." / "Stand up." / "Wake up." You CANNOT add an object: "The plane took off the runway." → WRONG.' },
          { title: 'Type 2: Separable (Object Can Go in the Middle)', type: 'rule', content: 'The object can go AFTER the particle OR BETWEEN the verb and particle: "Turn off the light." = "Turn the light off." "Pick up your bag." = "Pick your bag up." BUT: if the object is a PRONOUN, it MUST go in the middle: "Turn it off." (NOT "Turn off it.") "Pick it up." (NOT "Pick up it.")' },
          { title: 'Type 3: Inseparable (Object Must Go After)', type: 'rule', content: 'The verb and particle CANNOT be separated: "Look after the children." (NOT "Look the children after.") "Get over the problem." (NOT "Get the problem over.") Other inseparable: look for, look into, come across, run into, get on with, look forward to. Even with pronouns: "Look after them." (NOT "Look them after.")' },
          { title: 'Test Yourself', type: 'exercise', content: 'Place the pronoun correctly.', question: 'Rewrite with "it": "I need to look up the word." / "I need to look after the baby."', answer: '"I need to look it up." / "I need to look after it."', answerExplanation: 'Look up = separable → pronoun goes in the middle. Look after = inseparable → pronoun stays after.' },
        ],
        keyTakeaways: ['Intransitive: no object (wake up, take off)', 'Separable: object can split (turn off/turn it off)', 'Inseparable: object must follow (look after them)', 'Pronouns MUST go in the middle for separable verbs'],
        commonMistakes: ['"Turn off it" → "Turn it off" (pronoun in the middle for separable)', '"Look them after" → "Look after them" (inseparable stays together)'],
        relatedLessons: ['a2-verb-gerund', 'b1-gerunds-vs-infinitives'],
      },

      // # ─── 10. Word Order ───
      {
        id: 'b1-word-order',
        title: 'Word Order: Adjectives, Adverbs, and Sentence Structure',
        description: 'Put words in the right order — English word order is strict and gets noticed when wrong.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Apply adjective order (opinion-size-age-colour-origin-material)', 'Place adverbs correctly in different positions', 'Structure complex sentences'],
        sections: [
          { title: 'Adjective Order', type: 'rule', content: 'When using multiple adjectives before a noun, follow this order: Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose: "A beautiful large old round brown Italian leather racing car." In practice, you rarely use more than 2-3: "A small red bag." (size + colour) "A lovely old house." (opinion + age) "An expensive Japanese car." (opinion + origin)' },
          { title: 'Adverb Position', type: 'rule', content: 'Frequency (always, often): before main verb, after be: "She always arrives early." "He is never late." Manner (slowly, well): after the verb/object: "She speaks English fluently." Time (yesterday, today): usually at the end: "I saw her yesterday." Place (here, there): before time: "I saw her here yesterday." Multiple adverbs: manner → place → time: "She sang beautifully at the concert last night."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Put the adjectives in order.', question: '"She wore a _____ dress." (Italian / red / beautiful / silk)', answer: 'beautiful red Italian silk dress', answerExplanation: 'Opinion (beautiful) → Colour (red) → Origin (Italian) → Material (silk) → noun (dress).' },
        ],
        keyTakeaways: ['Adjectives: Opinion → Size → Age → Colour → Origin → Material', 'Manner adverbs go AFTER the verb', 'Frequency adverbs go BEFORE the main verb (after be)', 'Time/place go at the end: manner → place → time'],
        commonMistakes: ['"A red beautiful dress" → "A beautiful red dress" (opinion before colour)', '"She speaks fluently English" → "She speaks English fluently" (manner after object)'],
        relatedLessons: ['a1-adjectives', 'a1-adverbs-frequency'],
      },

      // # ─── 11. Make vs Do vs Have vs Take ───
      {
        id: 'b1-make-do-have-take',
        title: 'Make vs Do vs Have vs Take',
        description: 'Four confusing verbs with collocations — "make a mistake," "do homework," "have a shower."',
        skill: 'vocabulary', level: 'B1', duration: 10,
        objectives: ['Learn the most common collocations for each verb', 'Avoid mixing them up'],
        sections: [
          { title: 'Make', type: 'rule', content: 'Make = create/produce/cause: make a mistake, make a decision, make money, make friends, make a phone call, make an effort, make progress, make a noise, make a promise, make a complaint, make an excuse, make a mess, make a plan, make breakfast/lunch/dinner.' },
          { title: 'Do', type: 'rule', content: 'Do = perform/complete tasks: do homework, do housework, do the washing/ironing/cleaning, do a course, do an exam, do exercise, do your best, do business, do a favour, do harm, do well/badly, do research, do the dishes.' },
          { title: 'Have and Take', type: 'rule', content: 'Have = experience/consume: have a shower/bath, have breakfast/lunch/dinner, have a drink, have a good time, have a rest, have a chat, have a look, have a baby, have a headache, have fun. Take = common combinations: take a photo, take a break, take a seat, take a taxi, take notes, take medicine, take a test, take a risk, take turns, take your time, take place.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose make, do, have, or take.', question: '"I need to _____ a decision. Let me _____ a break and _____ a coffee first."', answer: 'make ... take ... have', answerExplanation: 'Make a decision. Take a break. Have a coffee.' },
        ],
        keyTakeaways: ['Make = create: a mistake, a decision, money, friends', 'Do = tasks: homework, housework, exercise, research', 'Have = experience: a shower, a look, fun, a headache', 'Take = combinations: a photo, a break, notes, medicine'],
        commonMistakes: ['"Do a mistake" → "Make a mistake"', '"Make homework" → "Do homework"', '"Take a shower" and "Have a shower" are BOTH correct'],
        relatedLessons: ['b1-phrasal-verb-patterns', 'a2-adverbs-manner'],
      },

      // # ─── 12. Expressing Opinions ───
      {
        id: 'b1-expressing-opinions',
        title: 'Expressing Opinions & Agreement',
        description: 'Share your views and react to others — essential for conversations and exams.',
        skill: 'speaking', level: 'B1', duration: 10,
        objectives: ['Give opinions using appropriate phrases', 'Agree and disagree politely', 'Support opinions with reasons'],
        sections: [
          { title: 'Giving Opinions', type: 'rule', content: 'Standard: "I think (that)..." "I believe (that)..." "In my opinion,..." "In my view,..." Stronger: "I\'m convinced that..." "I strongly believe that..." Softer: "I tend to think that..." "It seems to me that..." "I would say that..." Asking: "What do you think?" "What\'s your opinion?" "How do you feel about...?"' },
          { title: 'Agreeing and Disagreeing', type: 'rule', content: 'Agreeing: "I agree." "That\'s true." "Exactly!" "I think so too." "You\'re absolutely right." "I couldn\'t agree more." Partially: "I see your point, but..." "That\'s true to some extent, but..." "I agree up to a point, however..." Disagreeing (politely): "I\'m not sure I agree." "I see what you mean, but I think..." "I\'m afraid I disagree." "I take your point, but..." NEVER: "You\'re wrong!" (too direct and rude).' },
          { title: 'Supporting with Reasons', type: 'tip', content: 'Always give a reason after your opinion: "I think remote work is better because it saves commuting time." "In my view, exercise is important. For example, even 20 minutes of walking improves your mood." Useful linking: because, since, as, for example, for instance, such as, that\'s why.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Disagree politely with this statement.', question: '"I think everyone should go to university."', answer: 'Example: "I see your point, but I think there are many successful careers that don\'t require a degree. For example, many skilled trades pay very well."', answerExplanation: 'Polite disagreement formula: acknowledge + but + your view + reason.' },
        ],
        keyTakeaways: ['Standard: "I think..." "In my opinion..."', 'Agree: "I agree" → "I couldn\'t agree more"', 'Disagree politely: "I see your point, but..."', 'Always support opinions with reasons (because, for example)'],
        relatedLessons: ['b1-indirect-questions', 'a2-connectors'],
      },

      // # ─── 13. Describing Trends ───
      {
        id: 'b1-describing-trends',
        title: 'Describing Trends & Changes',
        description: 'Talk about increases, decreases, and changes — useful for IELTS Writing Task 1 preparation.',
        skill: 'writing', level: 'B1', duration: 10,
        objectives: ['Use verbs and nouns for trends (rise, increase, fall, decline)', 'Add adverbs for degree (sharply, gradually, slightly)', 'Describe graphs and charts in writing'],
        sections: [
          { title: 'Trend Verbs', type: 'rule', content: 'Going UP: increase, rise, grow, go up, climb, surge (dramatic). Going DOWN: decrease, fall, drop, decline, go down, plunge (dramatic). NO CHANGE: remain stable, stay the same, level off, plateau. CHANGE DIRECTION: fluctuate (go up and down), recover, peak, reach a low.' },
          { title: 'Adverbs and Adjectives', type: 'rule', content: 'Degree: sharply/dramatically (big change), significantly, steadily, gradually, slightly (small change). "Sales increased sharply." "There was a gradual decline." Speed: rapidly, quickly, slowly. "Prices rose rapidly." Adjective forms: a sharp increase, a significant rise, a gradual decline, a slight drop, a dramatic fall.' },
          { title: 'Useful Patterns', type: 'tip', content: 'Verb pattern: "Sales increased by 20% between 2020 and 2023." "The population fell from 5 million to 4.2 million." Noun pattern: "There was a sharp increase in prices." "The graph shows a gradual decline in..." Time expressions: "between 2020 and 2023," "over the period," "during the first quarter," "from January to March."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Describe this trend using two different patterns.', question: 'Tourism: 2019: 10 million visitors → 2020: 2 million visitors.', answer: '"Tourism fell dramatically from 10 million to 2 million between 2019 and 2020." OR "There was a dramatic fall in tourism, dropping by 80%."', answerExplanation: 'Verb pattern: subject + fell + dramatically. Noun pattern: There was a dramatic fall in + noun.' },
        ],
        keyTakeaways: ['Up: increase, rise, grow, climb', 'Down: decrease, fall, drop, decline', 'Degree adverbs: sharply, significantly, gradually, slightly', 'Two patterns: verb (Sales rose) and noun (There was a rise)'],
        relatedLessons: ['b1-passive-voice', 'b1-expressing-opinions'],
      },

      // # ─── 14. Narrative Tenses ───
      {
        id: 'b1-narrative-tenses',
        title: 'Narrative Tenses: Telling Stories',
        description: 'Combine past simple, past continuous, and past perfect to tell compelling stories.',
        skill: 'speaking', level: 'B1', duration: 12,
        objectives: ['Use past simple for main events', 'Use past continuous for background/scene-setting', 'Use past perfect for events before the story'],
        sections: [
          { title: 'The Three Tenses in Stories', type: 'rule', content: 'Past simple = the main events (what happened): "I opened the door. A man stood there. He gave me a letter." Past continuous = the background (what was happening): "It was raining. The wind was blowing. I was sitting by the fire when I heard a knock." Past perfect = before the story (what had already happened): "I had never seen him before." "She had already left when I arrived."' },
          { title: 'Putting It Together', type: 'example', examples: ['It was a dark evening. The wind was blowing and rain was falling against the windows. (background — past continuous)', 'I was reading a book when I heard a strange noise outside. (interrupted action)', 'I got up, walked to the window, and looked out. (main events — past simple)', 'I couldn\'t see anything. Nobody had been there for hours. (earlier context — past perfect)'], analysis: 'A good story uses all three tenses: continuous sets the scene, simple drives the plot, and perfect provides context.' },
          { title: 'Time Connectors for Stories', type: 'tip', content: 'Start: One day... / Once upon a time... / Last summer... Sequence: First... Then... After that... Next... Finally... Contrast: But... However... Suddenly... Surprise: Suddenly... All of a sudden... To my surprise... End: In the end... Eventually... It turned out that...' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct tense.', question: '"I _____ (walk) home when I _____ (notice) that someone _____ (follow) me. I _____ (never/see) this person before."', answer: 'was walking ... noticed ... was following ... had never seen', answerExplanation: 'Was walking = background action. Noticed = main event. Was following = another ongoing action. Had never seen = before that moment.' },
        ],
        keyTakeaways: ['Past continuous = background/scene-setting', 'Past simple = main events/plot', 'Past perfect = events BEFORE the story', 'Combine all three for rich, compelling narratives'],
        relatedLessons: ['a2-past-continuous', 'b1-past-perfect', 'a2-past-simple-regular'],
      },

      // # ─── 15. Verb Patterns ───
      {
        id: 'b1-verb-patterns',
        title: 'Verb Patterns: Common Combinations',
        description: 'Master the structures that follow common verbs — patterns you need every day.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use verb + object + infinitive (I want you to go)', 'Use verb + preposition + gerund (I look forward to meeting)', 'Handle tricky patterns'],
        sections: [
          { title: 'Verb + Object + Infinitive', type: 'rule', content: 'want someone to: "I want you to help me." tell someone to: "She told me to wait." ask someone to: "He asked us to be quiet." advise someone to: "The doctor advised me to rest." allow/permit someone to: "They don\'t allow us to park here." encourage someone to: "My teacher encouraged me to apply." expect someone to: "I expected her to be here."' },
          { title: 'Verb + Object + Base Verb (No To)', type: 'rule', content: 'let someone do: "Let me help you." (NOT "let me to help") make someone do: "The film made me cry." (NOT "made me to cry") help someone (to) do: "She helped me (to) find it." ("to" optional) These three verbs NEVER take "to" in active sentences. But in passive: "I was made to cry by the film." ("to" appears in passive).' },
          { title: 'Verb + Preposition + -ing', type: 'rule', content: 'look forward to: "I look forward to meeting you." apologise for: "She apologised for being late." succeed in: "He succeeded in passing the exam." insist on: "They insisted on paying." think about/of: "I\'m thinking about changing jobs." prevent/stop someone from: "The rain prevented us from going out."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Correct the mistake.', question: '"She made me to wait. Then she let me to sit down."', answer: '"She made me wait. Then she let me sit down."', answerExplanation: 'Make and let take base verb WITHOUT "to."' },
        ],
        keyTakeaways: ['want/tell/ask + object + to + verb', 'let/make + object + base verb (no "to")', 'Preposition + -ing: look forward to meeting', 'Passive reversal: "She was made to wait" (to appears)'],
        commonMistakes: ['"Let me to go" → "Let me go"', '"She made me to cry" → "She made me cry"', '"I look forward to meet" → "I look forward to meeting"'],
        relatedLessons: ['b1-gerunds-vs-infinitives', 'a2-verb-infinitive'],
      },

      // # ─── 16. Expressing Possibility ───
      {
        id: 'b1-expressing-possibility',
        title: 'Expressing Possibility & Probability',
        description: 'Say how likely something is — from "definitely" to "probably" to "possibly" to "unlikely."',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use may, might, could for possibility', 'Express certainty with must and can\'t', 'Use adverbs of probability'],
        sections: [
          { title: 'Modal Verbs for Possibility', type: 'rule', content: 'Certain it IS true: must: "She must be tired — she\'s been working all day." "He\'s not answering — he must be busy." Possible: may/might/could: "She may/might/could be at home." (= it\'s possible) "It could rain later." "He might not come." (= it\'s possible he won\'t) Certain it is NOT true: can\'t: "That can\'t be right." "She can\'t be 60 — she looks 40!"' },
          { title: 'Adverbs of Probability', type: 'rule', content: 'Add adverbs to will/won\'t for degrees of certainty: "She\'ll definitely pass." (100% sure) "He\'ll probably be late." (very likely) "They\'ll possibly come." (maybe) "It probably won\'t rain." "She definitely won\'t agree." Position: definitely/probably/possibly BEFORE the main verb or AFTER will: "She will probably come." "She probably won\'t come."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose must, might, or can\'t.', question: '"He\'s been running for 2 hours. He _____ be exhausted." / "She said she _____ come to the party — she\'s not sure yet."', answer: 'must ... might', answerExplanation: 'Must = certain (logical deduction from running 2 hours). Might = possible but uncertain.' },
        ],
        keyTakeaways: ['Must = almost certain it IS true (logical deduction)', 'May/might/could = possible (not certain)', 'Can\'t = almost certain it is NOT true', 'Adverbs: definitely > probably > possibly'],
        commonMistakes: ['"She must to be tired" → "She must be tired" (no "to" after must)', '"He mights come" → "He might come" (no -s on modal verbs)'],
        relatedLessons: ['a1-can-cant', 'b1-second-conditional'],
      },

      // # ─── 17. Purpose & Reason ───
      {
        id: 'b1-purpose-reason',
        title: 'Purpose & Reason: So That, In Order To, Due To',
        description: 'Express WHY you do things and WHY things happen — with more sophistication than "because."',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use to / in order to / so as to for purpose', 'Use so that + subject + can/will', 'Use due to / because of / owing to for reasons'],
        sections: [
          { title: 'Purpose: Why You Do Something', type: 'rule', content: 'Simple: to + infinitive: "I went to the shop to buy milk." In order to (more formal): "She studied hard in order to pass the exam." So that + subject + can/could/will/would: "I\'ll leave early so that I can avoid the traffic." "She spoke slowly so that everyone could understand." So as to (formal): "He arrived early so as to get a good seat." So as not to / In order not to (negative purpose): "I whispered so as not to wake the baby."' },
          { title: 'Reason: Why Something Happens', type: 'rule', content: 'Because + clause (subject + verb): "The match was cancelled because it was raining." Because of + noun: "The match was cancelled because of the rain." Due to + noun (more formal): "The delay was due to bad weather." Owing to + noun (formal): "Owing to the storm, flights were cancelled." As / Since (= because, more formal): "As it was raining, we stayed inside." "Since you\'re here, let\'s start."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite using the word in brackets.', question: '"I set an alarm because I didn\'t want to oversleep." (so as not to)', answer: '"I set an alarm so as not to oversleep."', answerExplanation: '"So as not to" replaces "because I didn\'t want to" for expressing negative purpose more formally.' },
        ],
        keyTakeaways: ['Purpose: to / in order to / so that + can', 'Negative purpose: in order not to / so as not to', 'Reason: because + clause. Because of / due to + noun.', 'As / since = because (more formal)'],
        commonMistakes: ['"Because of it was raining" → "Because it was raining" (because of + noun, not clause)', '"Due to the rain was heavy" → "Due to the heavy rain" (due to + noun)'],
        relatedLessons: ['a2-connectors', 'b1-expressing-opinions'],
      },
    ],
  },
]
