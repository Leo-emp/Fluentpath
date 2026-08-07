// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 5: A2 Elementary Lessons (1–25)
// # ═══════════════════════════════════════════════════════════════════════════
// # Full A2 level — past tenses, future forms, comparatives, modals,
// # first conditional, verb patterns, connectors, and more.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_5: LessonCategory[] = [
  {
    id: 'a2-elementary',
    name: 'A2: Elementary',
    description: 'Build on the basics — past tenses, future plans, comparisons, and connecting your ideas.',
    icon: '📗',
    lessons: [

      // # ─── 1. Past Simple: Regular ───
      {
        id: 'a2-past-simple-regular',
        title: 'Past Simple: Regular Verbs',
        description: 'Talk about what happened yesterday, last week, or in the past — "I worked," "She played," "They watched."',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Form past simple with -ed for regular verbs', 'Handle spelling changes (stop→stopped, study→studied)', 'Pronounce -ed correctly (/t/, /d/, /ɪd/)'],
        sections: [
          { title: 'How to Form It', type: 'rule', content: 'Add -ed to the base verb (same for ALL subjects): I/you/he/she/it/we/they + verb-ed: "I worked yesterday." "She played tennis." "They watched a film." Spelling rules: Most verbs: add -ed: work→worked, play→played. Verb ending in -e: add -d: live→lived, like→liked. Consonant + y: change y to -ied: study→studied, carry→carried. Short verb (CVC): double last consonant: stop→stopped, plan→planned.' },
          { title: 'Pronunciation of -ed', type: 'tip', content: 'Three different sounds: /t/ after voiceless sounds (k, p, f, s, sh, ch): worked, stopped, watched, washed. /d/ after voiced sounds (b, g, l, m, n, v, z, vowels): played, lived, called, opened. /ɪd/ after t or d: wanted, needed, started, decided. This pronunciation is natural — do not worry about memorising rules. Just listen and copy.' },
          { title: 'Time Expressions', type: 'rule', content: 'Past simple often comes with: yesterday, last night/week/month/year, ago (two days ago, a year ago), in 2020, on Monday, when I was young, this morning (if the morning is finished).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write the past simple.', question: 'study, stop, live, play, want', answer: 'studied, stopped, lived, played, wanted', answerExplanation: 'study→studied (y→ied), stop→stopped (CVC double), live→lived (e→d), play→played (regular), want→wanted (t→/ɪd/).' },
        ],
        keyTakeaways: ['Regular past: add -ed to base verb', 'Same form for ALL subjects (no -s for he/she)', 'CVC → double: stopped. Consonant+y → -ied: studied', 'Three pronunciations: /t/, /d/, /ɪd/'],
        commonMistakes: ['"She work yesterday" → "She worked yesterday"', '"I studyed" → "I studied" (y→ied)', '"He stoped" → "He stopped" (double p)'],
        relatedLessons: ['a2-past-simple-irregular', 'a2-past-simple-neg-q'],
      },

      // # ─── 2. Past Simple: Irregular ───
      {
        id: 'a2-past-simple-irregular',
        title: 'Past Simple: Irregular Verbs',
        description: 'English\'s biggest challenge at A2 — go→went, see→saw, eat→ate. No rules, just learn them.',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Know the 30 most common irregular past forms', 'Use them in sentences about the past', 'Understand that there is no pattern — just practice'],
        sections: [
          { title: 'The Most Important Irregular Verbs', type: 'rule', content: 'be→was/were, go→went, have→had, do→did, say→said, make→made, come→came, see→saw, take→took, get→got, give→gave, know→knew, think→thought, find→found, tell→told, eat→ate, drink→drank, buy→bought, bring→brought, write→wrote, read→read (/red/), run→ran, sit→sat, speak→spoke, leave→left, meet→met, feel→felt, pay→paid, put→put (no change!), cut→cut (no change!).' },
          { title: 'Patterns (Loose Groups)', type: 'tip', content: 'While there are no strict rules, some loose patterns help: -ought/-aught: buy→bought, bring→brought, think→thought, catch→caught. No change: put→put, cut→cut, shut→shut, hit→hit. Vowel change only: sit→sat, run→ran, drink→drank, swim→swam, come→came, give→gave. -ew: know→knew, grow→grew, fly→flew, draw→drew. These groupings can help, but you must learn each verb individually.' },
          { title: 'Examples in Context', type: 'example', examples: ['I went to the gym yesterday and ran for 30 minutes.', 'She ate breakfast and then left for work at 8.', 'We bought a new sofa and put it in the living room.', 'He thought it was a good idea, but I knew it was wrong.'], analysis: 'Notice that negatives and questions use "did" + base verb, NOT the irregular form: "I didn\'t go" (not "I didn\'t went"). Only positive sentences use the irregular past form.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write the past simple.', question: 'go, see, eat, buy, put', answer: 'went, saw, ate, bought, put', answerExplanation: 'All irregular — no -ed ending. "Put" does not change at all.' },
        ],
        keyTakeaways: ['Irregular verbs have no -ed pattern — memorise them', 'Same form for ALL subjects: I went, she went', 'Some loose groups: -ought (bought, thought), no change (put, cut)', 'Negatives/questions use "did" + BASE verb, not the past form'],
        commonMistakes: ['"I goed" → "I went"', '"She didn\'t went" → "She didn\'t go" (base verb after did)', '"I putted it" → "I put it" (put never changes)'],
        relatedLessons: ['a2-past-simple-regular', 'a2-past-simple-neg-q'],
      },

      // # ─── 3. Past Simple: Negatives & Questions ───
      {
        id: 'a2-past-simple-neg-q',
        title: 'Past Simple: Negatives & Questions',
        description: 'Learn to say what you didn\'t do and ask what happened — "I didn\'t go," "Did you see it?"',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Form negatives with didn\'t + base verb', 'Form yes/no questions with Did...?', 'Form Wh- questions in the past'],
        sections: [
          { title: 'Negative Form', type: 'rule', content: 'Subject + didn\'t (did not) + BASE verb: "I didn\'t go." (NOT "I didn\'t went") "She didn\'t eat breakfast." "They didn\'t come to the party." "didn\'t" is the same for ALL subjects. The main verb ALWAYS goes back to its base form.' },
          { title: 'Questions', type: 'rule', content: 'Did + subject + base verb? "Did you go to the cinema?" — "Yes, I did." / "No, I didn\'t." "Did she call you?" — "Yes, she did." "Did they enjoy the film?" — "No, they didn\'t." Wh-: Wh- word + did + subject + base verb? "Where did you go?" "What did she say?" "When did they arrive?" "Why did he leave early?" "How did you get here?"' },
          { title: 'Was/Were Questions', type: 'tip', content: '"Be" in the past does NOT use "did": "Were you at home?" (NOT "Did you be at home?") "Was she happy?" (NOT "Did she was happy?") "Where were you last night?" Only "be" works this way. All other verbs use "did" for questions and negatives.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Form a question.', question: 'She went to Paris. → Where _____?', answer: 'Where did she go?', answerExplanation: '"Where" + did + subject + base verb. "Went" goes back to "go" after "did."' },
        ],
        keyTakeaways: ['Negative: didn\'t + base verb (NEVER the past form)', 'Question: Did + subject + base verb?', '"Be" uses was/were without "did"', 'Same for all subjects: I didn\'t, she didn\'t, they didn\'t'],
        commonMistakes: ['"I didn\'t went" → "I didn\'t go"', '"Did she went?" → "Did she go?"', '"Did you were there?" → "Were you there?" (be = no did)'],
        relatedLessons: ['a2-past-simple-regular', 'a2-past-simple-irregular'],
      },

      // # ─── 4. Past Continuous ───
      {
        id: 'a2-past-continuous',
        title: 'Past Continuous: Actions in Progress in the Past',
        description: 'Describe what was happening at a specific moment — "I was sleeping when the phone rang."',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Form was/were + verb-ing', 'Use it for background actions in stories', 'Combine with past simple for interrupted actions'],
        sections: [
          { title: 'Form', type: 'rule', content: 'I/he/she/it + was + verb-ing: "I was watching TV." "She was sleeping." You/we/they + were + verb-ing: "They were playing football." Negative: "I wasn\'t listening." "They weren\'t paying attention." Question: "Were you sleeping?" "What was she doing?"' },
          { title: 'When to Use It', type: 'rule', content: 'Action in progress at a specific time: "At 8 o\'clock, I was having dinner." Background action when something else happened: "I was walking to work when it started raining." Two actions happening at the same time: "She was cooking while he was cleaning." Setting the scene in a story: "The sun was shining. Birds were singing. It was a perfect day."' },
          { title: 'Past Continuous + Past Simple', type: 'tip', content: 'The classic combination — a long action interrupted by a short action: Long action (past continuous) + WHEN + short action (past simple): "I was having a shower when the doorbell rang." "She was driving to work when she saw an accident." "While" introduces the long action: "While I was cooking, the smoke alarm went off."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose past simple or past continuous.', question: '"I _____ (walk) home when I _____ (meet) my old friend."', answer: 'was walking ... met', answerExplanation: 'Walking = long action in progress → past continuous. Meeting = short interrupting action → past simple.' },
        ],
        keyTakeaways: ['Form: was/were + verb-ing', 'For actions IN PROGRESS at a past moment', 'Past continuous + when + past simple = interrupted action', '"While" + past continuous = the background action'],
        commonMistakes: ['"I was walk" → "I was walking" (need -ing)', '"When I was walking, I was meeting him" → "When I was walking, I met him" (the interruption = past simple)'],
        relatedLessons: ['a2-past-simple-regular', 'a2-connectors'],
      },

      // # ─── 5. Future with Will ───
      {
        id: 'a2-future-will',
        title: 'Future with "Will"',
        description: 'Make promises, predictions, and spontaneous decisions — "I\'ll help you," "It will rain tomorrow."',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Form sentences with will + base verb', 'Use will for predictions, promises, decisions, and offers', 'Make negatives (won\'t) and questions (Will you...?)'],
        sections: [
          { title: 'Form', type: 'rule', content: 'Subject + will (\'ll) + base verb: "I will help you." = "I\'ll help you." "She will be there." = "She\'ll be there." Negative: will not (won\'t): "I won\'t forget." "It won\'t take long." Question: Will + subject + base verb? "Will you come?" "Will it rain?" "Will" is the same for ALL subjects — no changes.' },
          { title: 'When to Use Will', type: 'rule', content: 'Predictions (what you think will happen): "I think it will rain tomorrow." "She\'ll probably pass the exam." Promises: "I\'ll call you later." "I won\'t tell anyone." Spontaneous decisions (decided NOW): "I\'ll have the chicken, please." (ordering at a restaurant) "Wait — I\'ll come with you." Offers: "I\'ll carry that for you." "I\'ll help you with your homework."' },
          { title: 'Will vs Going To', type: 'tip', content: '"Will" = decided NOW (spontaneous): Phone rings. "I\'ll answer it." "Going to" = decided BEFORE (planned): "I\'m going to visit my parents this weekend." (already planned). Both can make predictions, but "going to" is for evidence you can see: "Look at those clouds — it\'s going to rain." "Will" is for opinions: "I think it will rain."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose will or going to.', question: '"A: I\'m cold. B: I _____ close the window."', answer: 'I\'ll close the window.', answerExplanation: 'This is a spontaneous decision made NOW in response to the situation → will (I\'ll).' },
        ],
        keyTakeaways: ['Form: will + base verb (same for all subjects)', 'Will = predictions, promises, spontaneous decisions, offers', 'Won\'t = will not', 'Will = decided now. Going to = decided before.'],
        commonMistakes: ['"I will to help" → "I will help" (no "to" after will)', '"She wills come" → "She will come" (no -s)', '"I\'ll going" → "I\'ll go" (base verb after will, not -ing)'],
        relatedLessons: ['a2-future-going-to', 'a2-present-continuous-future'],
      },

      // # ─── 6. Future with Going To ───
      {
        id: 'a2-future-going-to',
        title: 'Future with "Going To"',
        description: 'Talk about your plans and intentions — "I\'m going to travel to Japan next year."',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Form am/is/are + going to + base verb', 'Use going to for plans, intentions, and predictions with evidence', 'Make negatives and questions'],
        sections: [
          { title: 'Form', type: 'rule', content: 'Subject + am/is/are + going to + base verb: "I\'m going to study medicine." "She\'s going to move to London." "They\'re going to buy a house." Negative: "I\'m not going to work tomorrow." "He isn\'t going to come." Question: "Are you going to come to the party?" "What is she going to do?"' },
          { title: 'Plans and Intentions', type: 'rule', content: 'Use "going to" for things you have ALREADY DECIDED to do: "I\'m going to learn French next year." (decided already) "We\'re going to paint the kitchen this weekend." (planned) "She\'s going to apply for a new job." (intention) Compare with "will" (spontaneous): "The phone is ringing." — "I\'ll answer it!" (decided now, not before).' },
          { title: 'Predictions with Evidence', type: 'tip', content: 'Use "going to" when you can SEE evidence that something will happen: "Look at those dark clouds — it\'s going to rain." "She\'s studied really hard — she\'s going to pass." "The road is icy — be careful, you\'re going to fall!" Compare: "I think it will rain tomorrow." (opinion, no evidence right now).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with "going to."', question: '"What _____ (you / do) after university?" — "I _____ (travel) for a year."', answer: 'are you going to do ... am going to travel (I\'m going to travel)', answerExplanation: 'Both are planned intentions → going to. Question uses "are you going to + base verb."' },
        ],
        keyTakeaways: ['Form: am/is/are + going to + base verb', 'For plans already decided: "I\'m going to move."', 'For predictions with evidence: "It\'s going to rain" (you see the clouds)', 'Going to = planned before. Will = decided now.'],
        commonMistakes: ['"I going to study" → "I\'m going to study" (need am/is/are)', '"She\'s going to goes" → "She\'s going to go" (base verb)', 'Confusing will (spontaneous) with going to (planned)'],
        relatedLessons: ['a2-future-will', 'a2-present-continuous-future'],
      },

      // # ─── 7. Present Continuous for Future ───
      {
        id: 'a2-present-continuous-future',
        title: 'Present Continuous for Future Arrangements',
        description: 'Use "I\'m meeting Tom at 3" to talk about definite future arrangements.',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Use present continuous for fixed future arrangements', 'Distinguish from going to (plans) and will (spontaneous)'],
        sections: [
          { title: 'Present Continuous = Arranged Future', type: 'rule', content: 'Use present continuous (am/is/are + -ing) for arrangements that are FIXED — something definite, usually involving another person: "I\'m meeting Sarah for lunch tomorrow." (time and person arranged) "We\'re flying to Rome on Friday." (tickets booked) "She\'s starting her new job on Monday." (date confirmed) These are not just plans — they are ARRANGED and DEFINITE.' },
          { title: 'The Three Futures Compared', type: 'tip', content: 'Will = spontaneous decision or prediction: "I\'ll have the salad." Going to = plan/intention (decided but not necessarily arranged): "I\'m going to learn Spanish." Present continuous = fixed arrangement: "I\'m having dinner with Tom at 7." Example: "I\'m going to visit Paris someday." (vague intention). "I\'m visiting Paris next weekend." (booked, arranged). "I think I\'ll visit Paris." (just thought of it now).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the best future form.', question: '"I _____ (have) dinner with my boss tonight. We booked the restaurant yesterday."', answer: 'am having (I\'m having)', answerExplanation: 'Definite arrangement — restaurant already booked, time set → present continuous.' },
        ],
        keyTakeaways: ['Present continuous + future time = fixed arrangements', 'Key: something is ARRANGED, not just planned', 'Three futures: will (spontaneous) < going to (planned) < present continuous (arranged)'],
        commonMistakes: ['"I\'m going to have dinner with Tom at 7" when already arranged → "I\'m having dinner with Tom at 7"'],
        relatedLessons: ['a2-future-will', 'a2-future-going-to'],
      },

      // # ─── 8. Comparatives ───
      {
        id: 'a2-comparatives',
        title: 'Comparatives: -er / More ... Than',
        description: 'Compare two things — "London is bigger than Paris," "English is more useful than Latin."',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Form comparatives with -er and more', 'Know when to use -er vs more', 'Use "than" correctly', 'Handle irregular comparatives (good→better, bad→worse)'],
        sections: [
          { title: 'Short Adjectives: -er', type: 'rule', content: 'One syllable: add -er: tall→taller, old→older, cheap→cheaper. Ending in -e: add -r: nice→nicer, large→larger. Ending in CVC: double + -er: big→bigger, hot→hotter, thin→thinner. Two syllables ending in -y: change y to -ier: happy→happier, easy→easier, busy→busier. + than: "She is taller than her brother." "Tokyo is bigger than London."' },
          { title: 'Long Adjectives: More', type: 'rule', content: 'Two+ syllables (NOT ending in -y): use more + adjective: expensive→more expensive, beautiful→more beautiful, interesting→more interesting, comfortable→more comfortable. + than: "This hotel is more expensive than that one." "English is more useful than Latin."' },
          { title: 'Irregular Comparatives', type: 'rule', content: 'These do not follow any rule — memorise them: good→better: "Her English is better than mine." bad→worse: "The weather is worse today." far→farther/further: "The station is further than I thought." little→less: "I have less time than you." much/many→more: "She has more experience."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write the comparative.', question: 'cheap, interesting, good, happy, far', answer: 'cheaper, more interesting, better, happier, farther/further', answerExplanation: 'cheap→cheaper (short), interesting→more interesting (long), good→better (irregular), happy→happier (-y→-ier), far→farther/further (irregular).' },
        ],
        keyTakeaways: ['Short (1 syllable): -er + than (taller than)', 'Long (2+ syllables): more + adj + than (more expensive than)', '-y ending: -ier (happier)', 'Irregular: good→better, bad→worse, far→further'],
        commonMistakes: ['"More cheap" → "Cheaper" (short = -er)', '"Gooder" → "Better" (irregular)', '"More happier" → "Happier" (don\'t use both more and -er)'],
        relatedLessons: ['a2-superlatives', 'a2-too-enough'],
      },

      // # ─── 9. Superlatives ───
      {
        id: 'a2-superlatives',
        title: 'Superlatives: The -est / The Most',
        description: 'Talk about extremes — "the tallest building," "the most beautiful city," "the best day ever."',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Form superlatives with the -est and the most', 'Use "the" before every superlative', 'Handle irregular forms (the best, the worst)'],
        sections: [
          { title: 'Short Adjectives: The -est', type: 'rule', content: 'One syllable: the + adj-est: tall→the tallest, old→the oldest. -e: the + adj-st: nice→the nicest, large→the largest. CVC: double + -est: big→the biggest, hot→the hottest. -y: change to -iest: happy→the happiest, easy→the easiest. "She is the tallest person in her family." "It was the happiest day of my life."' },
          { title: 'Long Adjectives: The Most', type: 'rule', content: 'Two+ syllables: the most + adjective: expensive→the most expensive, beautiful→the most beautiful, interesting→the most interesting. "Tokyo is the most expensive city in the world." "She is the most intelligent person I know."' },
          { title: 'Irregular Superlatives', type: 'rule', content: 'good→the best: "This is the best restaurant in town." bad→the worst: "Monday was the worst day of the week." far→the farthest/furthest: "The furthest planet from the sun." little→the least: "She has the least experience." much/many→the most: "He has the most money."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write the superlative.', question: 'tall, expensive, good, happy, bad', answer: 'the tallest, the most expensive, the best, the happiest, the worst', answerExplanation: 'tall→the tallest (short), expensive→the most expensive (long), good→the best (irregular), happy→the happiest (-y→-iest), bad→the worst (irregular).' },
        ],
        keyTakeaways: ['Always use THE before a superlative', 'Short: the -est (the tallest)', 'Long: the most (the most beautiful)', 'Irregular: the best, the worst, the most, the least'],
        commonMistakes: ['"Most cheap" → "The cheapest" (short = -est)', '"The goodest" → "The best"', '"He is tallest in the class" → "He is THE tallest" (always the)'],
        relatedLessons: ['a2-comparatives', 'a2-too-enough'],
      },

      // # ─── 10. Should / Shouldn't ───
      {
        id: 'a2-should-shouldnt',
        title: 'Should & Shouldn\'t: Giving Advice',
        description: 'Give and ask for advice — "You should see a doctor," "You shouldn\'t eat so much sugar."',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Use should/shouldn\'t + base verb for advice', 'Ask for advice with "Should I...?"', 'Compare should with must (advice vs obligation)'],
        sections: [
          { title: 'Form and Use', type: 'rule', content: 'Should + base verb (advice — it is a good idea): "You should drink more water." "She should apply for that job." Shouldn\'t + base verb (advice against — it is a bad idea): "You shouldn\'t stay up so late." "He shouldn\'t eat so much junk food." Question: Should + subject + base verb? "Should I call him?" "What should we do?"' },
          { title: 'Should vs Must', type: 'tip', content: 'Should = advice (it is a good idea, but you choose): "You should exercise more." (my advice) Must = obligation/necessity (you have no choice): "You must wear a seatbelt." (it is the law) "I must finish this report by Friday." (deadline) Think: should = "I recommend..." / must = "It is necessary."' },
          { title: 'Examples', type: 'example', examples: ['You look tired. You should go to bed early tonight.', 'Should I take an umbrella? — Yes, you should. It might rain.', 'We shouldn\'t waste food. Let\'s keep the leftovers.', 'What should I wear to the interview? — You should wear something smart.'], analysis: '"Should" gives friendly advice without forcing. It is softer than "must" and more direct than "could."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Give advice using should or shouldn\'t.', question: '"I have a terrible headache."', answer: 'You should take some medicine and you shouldn\'t look at your phone screen.', answerExplanation: 'Should = positive advice (take medicine). Shouldn\'t = advice against (don\'t look at screen).' },
        ],
        keyTakeaways: ['Should + base verb = advice (a good idea)', 'Shouldn\'t = advice against (a bad idea)', 'Should = recommendation. Must = obligation.', 'Same form for all subjects (no -s)'],
        commonMistakes: ['"You should to rest" → "You should rest" (no "to")', '"She shoulds go" → "She should go" (no -s)'],
        relatedLessons: ['a2-must-have-to', 'a2-first-conditional'],
      },

      // # ─── 11. Must / Have To ───
      {
        id: 'a2-must-have-to',
        title: 'Must, Mustn\'t, Have To, Don\'t Have To',
        description: 'Rules, obligations, and things that are NOT necessary — know the difference.',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Use must and have to for obligations', 'Understand mustn\'t (forbidden) vs don\'t have to (not necessary)', 'Choose between must and have to'],
        sections: [
          { title: 'Must and Have To', type: 'rule', content: 'Both mean "it is necessary" but with a slight difference: Must = the speaker decides (personal/internal): "I must remember to call Mum." "I must study harder." Have to = an external rule/situation: "I have to wear a uniform." "She has to work on Saturdays." In practice, both are often interchangeable. In negatives, they are VERY different.' },
          { title: 'Mustn\'t vs Don\'t Have To', type: 'rule', content: 'Mustn\'t = it is FORBIDDEN / PROHIBITED: "You mustn\'t park here." = It is not allowed. "You mustn\'t tell anyone." = Do not do this! Don\'t have to = it is NOT NECESSARY (but you CAN): "You don\'t have to wear a tie." = It is optional. "She doesn\'t have to come." = She can come or not — her choice. HUGE difference: "You mustn\'t go" = Do NOT go! "You don\'t have to go" = You can go or stay — up to you.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose mustn\'t or don\'t have to.', question: '"You _____ touch the paintings in the museum. But you _____ pay to enter — it\'s free."', answer: 'mustn\'t ... don\'t have to', answerExplanation: 'Touching paintings = forbidden → mustn\'t. Paying = not necessary (it\'s free) → don\'t have to.' },
        ],
        keyTakeaways: ['Must/have to = it is necessary', 'Mustn\'t = it is FORBIDDEN (do NOT do this)', 'Don\'t have to = NOT NECESSARY (but you can if you want)', 'This difference is one of the most tested in English exams'],
        commonMistakes: ['"You don\'t have to smoke here" (meaning forbidden) → "You mustn\'t smoke here"', '"I must to go" → "I must go" (no "to" after must)'],
        relatedLessons: ['a2-should-shouldnt', 'a2-first-conditional'],
      },

      // # ─── 12. First Conditional ───
      {
        id: 'a2-first-conditional',
        title: 'First Conditional: If + Present, Will',
        description: 'Talk about real future possibilities — "If it rains, I\'ll stay home."',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Form the first conditional: If + present simple, will + base verb', 'Use it for real/possible future situations', 'Use unless (= if not)'],
        sections: [
          { title: 'Structure', type: 'rule', content: 'If + present simple, will + base verb: "If it rains, I\'ll stay home." "If you study hard, you\'ll pass the exam." "If she doesn\'t call, I\'ll send a message." You can also reverse the order (no comma needed): "I\'ll stay home if it rains." "You\'ll pass if you study hard." IMPORTANT: do NOT use "will" in the if-clause: "If it will rain" is WRONG. "If it rains" is CORRECT.' },
          { title: 'Unless = If Not', type: 'tip', content: '"Unless" means "if not" — it removes the negative: "If you don\'t hurry, you\'ll miss the bus." = "Unless you hurry, you\'ll miss the bus." "If she doesn\'t call, I\'ll go without her." = "Unless she calls, I\'ll go without her." Use "unless" to make your English sound more natural and advanced.' },
          { title: 'Examples', type: 'example', examples: ['If you eat too much, you\'ll feel sick.', 'She\'ll be angry if we arrive late.', 'If I get the job, I\'ll take you out for dinner.', 'We won\'t go to the beach unless the weather improves.'], analysis: 'All sentences describe REAL possibilities — things that might actually happen. The if-clause is in present simple (not will), and the result clause uses will.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Complete the sentence.', question: '"If I _____ (have) enough money, I _____ (buy) a new laptop."', answer: 'have ... will buy (\'ll buy)', answerExplanation: 'If-clause = present simple ("have"). Result clause = will + base verb ("will buy"). Never "If I will have."' },
        ],
        keyTakeaways: ['If + present simple, will + base verb', 'For REAL future possibilities', 'NO "will" in the if-clause', 'Unless = if not: "Unless you hurry, you\'ll be late"'],
        commonMistakes: ['"If it will rain" → "If it rains" (present in if-clause)', '"If you don\'t study, you don\'t pass" → "If you don\'t study, you won\'t pass" (result = will/won\'t)'],
        relatedLessons: ['a2-future-will', 'a2-connectors'],
      },

      // # ─── 13. Too & Enough ───
      {
        id: 'a2-too-enough',
        title: 'Too & Enough',
        description: 'Express problems and sufficiency — "too expensive," "not big enough," "enough time."',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Use too + adjective for "more than needed" (negative)', 'Use adjective + enough for "sufficient"', 'Use enough + noun for "sufficient amount"'],
        sections: [
          { title: 'Too + Adjective', type: 'rule', content: '"Too" = MORE THAN NEEDED (always negative/problematic): "This coffee is too hot." (I can\'t drink it) "The test was too difficult." (I couldn\'t do it) "He\'s too young to drive." (not old enough) "Too" always means there is a PROBLEM.' },
          { title: 'Adjective + Enough', type: 'rule', content: '"Enough" comes AFTER adjectives: "She\'s old enough to vote." (= she is 18+) "Is this room big enough?" (= sufficient size?) Not + adjective + enough = insufficient: "He isn\'t tall enough to reach the shelf." "The water isn\'t warm enough." Order: too BEFORE the adjective. Enough AFTER the adjective.' },
          { title: 'Enough + Noun', type: 'rule', content: 'With nouns, "enough" goes BEFORE: "We have enough time." "There aren\'t enough chairs." "Do you have enough money?" Not enough + noun: "There isn\'t enough space." "She doesn\'t have enough experience."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with too, enough, or not enough.', question: '"The bag is _____ heavy to carry. I\'m not strong _____."', answer: 'too ... enough', answerExplanation: 'Too heavy = more than I can manage (problem). Not strong enough = insufficient strength.' },
        ],
        keyTakeaways: ['Too + adjective = problem (too hot, too expensive)', 'Adjective + enough = sufficient (old enough, big enough)', 'Enough + noun = sufficient amount (enough time, enough money)', 'Too = before adj. Enough = after adj, before noun.'],
        commonMistakes: ['"Enough big" → "Big enough" (enough after adjective)', '"Too much expensive" → "Too expensive" (too + adjective, no "much")'],
        relatedLessons: ['a2-comparatives', 'a2-superlatives'],
      },

      // # ─── 14. Verb + Infinitive ───
      {
        id: 'a2-verb-infinitive',
        title: 'Verb + Infinitive: Want To, Need To, Decide To',
        description: 'Learn which verbs are followed by "to + verb" — "I want to go," "She decided to stay."',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Know common verbs followed by to + infinitive', 'Form sentences with verb + to + base verb', 'Distinguish from verb + gerund (-ing)'],
        sections: [
          { title: 'Common Verb + To Infinitive', type: 'rule', content: 'These verbs are followed by TO + base verb: want to: "I want to travel." need to: "She needs to study." decide to: "He decided to leave." plan to: "We plan to move next year." hope to: "I hope to see you soon." learn to: "She\'s learning to drive." agree to: "They agreed to help." promise to: "I promise to call you." would like to: "I\'d like to order, please." try to: "I\'m trying to understand."' },
          { title: 'Verb + Object + To Infinitive', type: 'tip', content: 'Some verbs need an OBJECT before "to": want someone to: "I want you to be happy." ask someone to: "She asked me to help." tell someone to: "He told her to wait." invite someone to: "They invited us to come." "I want to go." (I go) vs "I want you to go." (you go) — the object changes who does the action.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Correct the mistake.', question: '"She decided leaving early." / "I want that you come."', answer: '"She decided to leave early." / "I want you to come."', answerExplanation: 'Decide + to + infinitive (not -ing). Want + object + to + infinitive (not "that").' },
        ],
        keyTakeaways: ['Want/need/decide/hope/plan/learn + to + base verb', 'Want/ask/tell someone + to + base verb', 'Never: "want that you come" — always "want you to come"'],
        commonMistakes: ['"I want go" → "I want to go" (need "to")', '"She decided leaving" → "She decided to leave"', '"I want that you help" → "I want you to help"'],
        relatedLessons: ['a2-verb-gerund', 'a2-present-simple-positive'],
      },

      // # ─── 15. Verb + Gerund ───
      {
        id: 'a2-verb-gerund',
        title: 'Verb + Gerund: Enjoy, Finish, Avoid, Suggest',
        description: 'Learn which verbs are followed by -ing — "I enjoy swimming," "She suggested going out."',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Know common verbs followed by verb-ing', 'Distinguish from verb + to infinitive', 'Use preposition + -ing (interested in learning)'],
        sections: [
          { title: 'Common Verb + Gerund', type: 'rule', content: 'These verbs are followed by verb-ing: enjoy: "I enjoy reading." finish: "She finished cooking." avoid: "Try to avoid making mistakes." suggest: "He suggested going to the park." consider: "Have you considered moving?" mind: "Do you mind waiting?" keep: "Keep practising!" miss: "I miss living in London." practise: "She practises speaking every day." imagine: "Imagine living on a beach!"' },
          { title: 'Preposition + -ing', type: 'rule', content: 'After ANY preposition, use -ing (never "to + verb"): interested in: "I\'m interested in learning Japanese." good at: "She\'s good at drawing." afraid of: "He\'s afraid of flying." think about: "I\'m thinking about changing jobs." look forward to: "I look forward to meeting you." (this "to" is a preposition, not infinitive!) instead of: "Instead of driving, take the bus."' },
          { title: 'Verbs That Take Both', type: 'tip', content: 'Some verbs can take BOTH -ing and to-infinitive with NO change in meaning: like: "I like swimming" = "I like to swim." love: "She loves cooking" = "She loves to cook." start: "It started raining" = "It started to rain." Others change meaning: stop: "I stopped smoking" (= quit) vs "I stopped to smoke" (= paused in order to smoke). remember: "I remember locking the door" (= I have a memory of doing it) vs "I remember to lock the door" (= I don\'t forget to do it).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose -ing or to + infinitive.', question: '"I enjoy _____ (cook), but I avoid _____ (eat) too much."', answer: 'cooking ... eating', answerExplanation: 'Enjoy + -ing. Avoid + -ing. Both always take the gerund.' },
        ],
        keyTakeaways: ['Enjoy/finish/avoid/suggest/consider/miss/keep + -ing', 'After prepositions: always -ing (interested in learning)', 'Some verbs take both (like, love, start — same meaning)', 'Stop/remember change meaning depending on -ing vs to'],
        commonMistakes: ['"I enjoy to swim" → "I enjoy swimming"', '"I\'m interested in to learn" → "I\'m interested in learning"', '"I look forward to meet you" → "I look forward to meeting you"'],
        relatedLessons: ['a2-verb-infinitive', 'a1-like-gerund'],
      },

      // # ─── 16. Adverbs of Manner ───
      {
        id: 'a2-adverbs-manner',
        title: 'Adverbs of Manner: How We Do Things',
        description: 'Describe HOW actions happen — "slowly," "carefully," "well," "fast."',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Form adverbs from adjectives (+ly)', 'Know irregular adverbs (good→well, fast→fast)', 'Put adverbs in the correct position'],
        sections: [
          { title: 'Forming Adverbs', type: 'rule', content: 'Most adjectives: add -ly: slow→slowly, careful→carefully, quiet→quietly, polite→politely. Adjectives ending in -y: change to -ily: easy→easily, happy→happily, angry→angrily. Adjectives ending in -le: change to -ly: simple→simply, terrible→terribly. Irregular (no -ly): good→well, fast→fast, hard→hard, late→late, early→early. "She speaks English well." (NOT "good"). "He runs fast." (NOT "fastly").' },
          { title: 'Position', type: 'rule', content: 'Usually AFTER the verb (or after the object): "She speaks slowly." (after verb) "He drives his car carefully." (after object) "They played well." NOT before the main verb: "She slowly speaks" sounds unnatural. Better: "She speaks slowly."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Change the adjective to an adverb.', question: '"She is a (careful) driver. She drives very _____."', answer: 'carefully', answerExplanation: 'Careful + ly = carefully. Adjective before noun ("careful driver"), adverb after verb ("drives carefully").' },
        ],
        keyTakeaways: ['Most: adjective + ly = adverb (slow→slowly)', '-y ending: change to -ily (easy→easily)', 'Irregular: good→well, fast→fast, hard→hard', 'Position: after the verb or object'],
        commonMistakes: ['"She speaks English good" → "She speaks English well"', '"He drives fastly" → "He drives fast" (fast = same form)', '"She careful drives" → "She drives carefully"'],
        relatedLessons: ['a1-adjectives', 'a1-adverbs-frequency'],
      },

      // # ─── 17. Present Perfect Introduction ───
      {
        id: 'a2-present-perfect-intro',
        title: 'Present Perfect: Introduction',
        description: 'Connect past experiences to the present — "I have been to Paris," "She has lost her keys."',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Form have/has + past participle', 'Use it for life experiences and recent results', 'Distinguish from past simple'],
        sections: [
          { title: 'Form', type: 'rule', content: 'I/you/we/they + have (\'ve) + past participle: "I have visited 10 countries." = "I\'ve visited 10 countries." He/she/it + has (\'s) + past participle: "She has lost her keys." = "She\'s lost her keys." Past participles: regular = same as past simple (-ed): worked, played, studied. Irregular = third column: go→gone, see→seen, eat→eaten, be→been, do→done, have→had.' },
          { title: 'When to Use It', type: 'rule', content: 'Life experience (ever/never — no specific time): "Have you ever been to Japan?" "I\'ve never eaten sushi." Recent result (the result matters NOW): "She\'s lost her keys." (= she doesn\'t have them now) "I\'ve finished my homework." (= it\'s done now) With just/already/yet: "I\'ve just arrived." "She\'s already left." "Have you eaten yet?"' },
          { title: 'Present Perfect vs Past Simple', type: 'tip', content: 'Present perfect = no specific time / result matters now: "I\'ve been to Paris." (sometime in my life — when doesn\'t matter) Past simple = specific time in the past: "I went to Paris last year." (specific time) Compare: "She\'s broken her leg." (it\'s still broken — present result) "She broke her leg last year." (it\'s healed now — finished past event) Key question: does the EXACT TIME matter? Yes → past simple. No → present perfect.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose present perfect or past simple.', question: '"I _____ (see) that film." — "When _____ you _____ (see) it?" — "I _____ (see) it last week."', answer: 'have seen (\'ve seen) ... did ... see ... saw', answerExplanation: 'First: no specific time → present perfect. Question asks "when" = specific time → past simple. Answer gives specific time → past simple.' },
        ],
        keyTakeaways: ['Form: have/has + past participle', 'For experiences (ever/never) and recent results (just/already/yet)', 'No specific time → present perfect. Specific time → past simple.', 'Past participle: regular = -ed, irregular = learn the third form'],
        commonMistakes: ['"I have went" → "I have gone/been" (use past participle, not past simple)', '"I have seen it yesterday" → "I saw it yesterday" (specific time = past simple)', '"Did you ever been?" → "Have you ever been?"'],
        relatedLessons: ['a2-present-perfect-vs-past', 'a2-for-since'],
      },

      // # ─── 18. Present Perfect vs Past Simple ───
      {
        id: 'a2-present-perfect-vs-past',
        title: 'Present Perfect vs Past Simple',
        description: 'The most confusing grammar point at A2 — learn when each tense is the right choice.',
        skill: 'grammar', level: 'A2', duration: 12,
        objectives: ['Apply the time-specific rule consistently', 'Use signal words for each tense', 'Handle tricky situations (today, this week, just)'],
        sections: [
          { title: 'The Rule', type: 'rule', content: 'Past simple: WHEN matters. A finished time. "I saw her yesterday." "They moved here in 2020." "What did you do last weekend?" Present perfect: WHEN does not matter. The experience or result matters. "I\'ve seen that film." (sometime — doesn\'t matter when) "She\'s been to 20 countries." "Have you ever tried Thai food?"' },
          { title: 'Signal Words', type: 'rule', content: 'Past simple signals: yesterday, last week/month/year, ago, in 2020, when I was young, on Monday. Present perfect signals: ever, never, already, yet, just, recently, so far, this week/month/year, today (unfinished time period), for, since. "I\'ve already eaten." (present perfect — no specific time). "I ate at 7." (past simple — specific time).' },
          { title: 'Tricky Cases', type: 'tip', content: '"Today/this week/this year" = unfinished time period → present perfect: "I\'ve had three meetings today." (today isn\'t over yet) BUT if you add a specific time: "I had a meeting at 9 today." → past simple. Conversations often START with present perfect and SWITCH to past simple for details: "Have you been to Italy?" — "Yes, I have." — "When did you go?" — "I went last summer." — "What did you do there?"' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct tense.', question: '"I _____ (visit) Paris three times. The last time I _____ (go) was in 2023."', answer: 'have visited (\'ve visited) ... went', answerExplanation: 'Three times (life experience, no specific time) → present perfect. "In 2023" (specific time) → past simple.' },
        ],
        keyTakeaways: ['Specific time → past simple. No specific time → present perfect.', 'Start with present perfect for the topic, switch to past simple for details', 'Unfinished time (today, this week) → present perfect', 'Finished time (yesterday, last week) → past simple'],
        commonMistakes: ['"I\'ve seen her yesterday" → "I saw her yesterday"', '"Did you ever visit Japan?" → "Have you ever visited Japan?"'],
        relatedLessons: ['a2-present-perfect-intro', 'a2-for-since'],
      },

      // # ─── 19. For & Since ───
      {
        id: 'a2-for-since',
        title: 'For & Since with Present Perfect',
        description: 'Say how long something has been happening — "for three years" vs "since 2021."',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Use "for" with periods of time', 'Use "since" with points in time', 'Combine with present perfect for duration'],
        sections: [
          { title: 'For vs Since', type: 'rule', content: 'FOR + a period of time (how long): for two hours, for three days, for six months, for ten years, for a long time, for ages. "I\'ve lived here for five years." SINCE + a point in time (when it started): since Monday, since January, since 2020, since I was a child, since last summer, since 8 o\'clock. "I\'ve lived here since 2019."' },
          { title: 'Quick Test', type: 'tip', content: 'Ask yourself: is it a LENGTH of time or a STARTING POINT? Length = for: "three hours" = for three hours. Starting point = since: "2020" = since 2020. If you can answer "how long?" → for. If you can answer "when did it start?" → since.' },
          { title: 'Examples', type: 'example', examples: ['She\'s worked here for ten years / since 2014.', 'I haven\'t seen him for ages / since the party.', 'We\'ve been married for 20 years / since 2004.', 'How long have you lived here? — For about three years.'], analysis: 'Both sentences in each pair mean the same thing — "for" gives the duration, "since" gives the starting point.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with for or since.', question: '"I\'ve known her _____ we were children. That\'s _____ about 15 years."', answer: 'since ... for', answerExplanation: '"We were children" = a point in time → since. "15 years" = a period of time → for.' },
        ],
        keyTakeaways: ['For + period (for 3 years, for a long time)', 'Since + point (since 2020, since Monday)', 'Both used with present perfect for duration', 'How long? = for. When did it start? = since.'],
        commonMistakes: ['"Since three years" → "For three years" (period)', '"For 2020" → "Since 2020" (point)'],
        relatedLessons: ['a2-present-perfect-intro', 'a2-present-perfect-vs-past'],
      },

      // # ─── 20. So & Such ───
      {
        id: 'a2-so-such',
        title: 'So & Such: Emphasising How Much',
        description: 'Make your descriptions stronger — "It was so cold!" "She\'s such a nice person!"',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Use "so" before adjectives and adverbs', 'Use "such" before noun phrases', 'Use so...that and such...that for results'],
        sections: [
          { title: 'So + Adjective/Adverb', type: 'rule', content: '"So" goes directly before an adjective or adverb: "It\'s so hot today!" "She speaks so quickly!" "I\'m so tired." "The film was so boring." So + much/many/little/few: "There\'s so much traffic." "She has so many friends."' },
          { title: 'Such + (a/an) + Noun Phrase', type: 'rule', content: '"Such" goes before a noun (often with an adjective): "She\'s such a nice person!" "It was such a beautiful day!" "They\'re such lovely people!" (no "a" with plural) "It was such fun!" (no "a" with uncountable) Compare: "It was SO beautiful." (so + adjective alone) "It was SUCH a beautiful day." (such + a + adjective + noun)' },
          { title: 'So/Such...That', type: 'tip', content: 'Add "that" to show the RESULT: "It was so cold that we stayed inside." "She speaks so fast that I can\'t understand her." "It was such a long film that I fell asleep." "They\'re such good friends that they tell each other everything."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with so or such.', question: '"It was _____ a difficult exam! The questions were _____ hard that nobody finished."', answer: 'such ... so', answerExplanation: '"Such a difficult exam" = such + a + adjective + noun. "So hard" = so + adjective.' },
        ],
        keyTakeaways: ['So + adjective/adverb: "so tired," "so quickly"', 'Such + (a/an) + noun: "such a nice person"', 'So + much/many: "so much traffic"', '...that for results: "so hot that we stayed inside"'],
        commonMistakes: ['"It was so a nice day" → "It was such a nice day"', '"She\'s such beautiful" → "She\'s so beautiful" (no noun = so)'],
        relatedLessons: ['a2-too-enough', 'a2-comparatives'],
      },

      // # ─── 21. Connectors ───
      {
        id: 'a2-connectors',
        title: 'Connectors: Because, So, But, Although',
        description: 'Link your ideas together — give reasons, results, contrasts, and additions.',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Use because for reasons and so for results', 'Use but and although for contrast', 'Use and, also, as well for addition'],
        sections: [
          { title: 'Reason and Result', type: 'rule', content: 'Because = reason (WHY): "I stayed home because I was ill." "She\'s happy because she passed the exam." So = result (WHAT HAPPENED): "I was ill, so I stayed home." "She passed the exam, so she\'s happy." Because answers "why?" So answers "what happened as a result?"' },
          { title: 'Contrast', type: 'rule', content: 'But = simple contrast: "I like coffee, but I don\'t like tea." "The hotel was expensive, but it was very nice." Although/Even though = contrast (stronger, more formal): "Although it was raining, we went for a walk." "She passed the exam, even though she didn\'t study much." However = contrast between sentences (formal): "The hotel was expensive. However, it was very nice."' },
          { title: 'Addition', type: 'tip', content: 'And = basic connection: "I like coffee and tea." Also = extra information (before main verb, after be): "She also speaks French." "He is also a musician." As well / too = at the end of a sentence: "I like coffee. I like tea as well." "She speaks French too."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with because, so, but, or although.', question: '"_____ the food was delicious, the service was terrible. We complained, _____ they gave us a discount _____ we were unhappy."', answer: 'Although ... so ... because', answerExplanation: 'Although = contrast (food good, service bad). So = result (complaint → discount). Because = reason (why they gave a discount).' },
        ],
        keyTakeaways: ['Because = why. So = result.', 'But/although = contrast', 'And/also/too/as well = addition', 'Although + contrast clause at start or end'],
        commonMistakes: ['"Although it rained, but we went out" → choose one: "Although it rained, we went out" OR "It rained, but we went out"'],
        relatedLessons: ['a2-first-conditional', 'a2-past-continuous'],
      },

      // # ─── 22. Defining Relative Clauses ───
      {
        id: 'a2-relative-clauses-basic',
        title: 'Relative Clauses: Who, Which, That',
        description: 'Join sentences together — "The woman who lives next door is a doctor."',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Use who for people', 'Use which for things', 'Use that for both', 'Use where for places'],
        sections: [
          { title: 'Who, Which, That, Where', type: 'rule', content: 'WHO = people: "The man who called you is my boss." WHICH = things/animals: "The book which I bought is very good." THAT = people OR things (informal): "The man that called you..." "The book that I bought..." WHERE = places: "The restaurant where we ate was excellent." In everyday English, "that" is very common and can replace "who" and "which."' },
          { title: 'How It Works', type: 'tip', content: 'A relative clause adds information about a noun: "I have a friend." + "She lives in Tokyo." = "I have a friend who lives in Tokyo." "That\'s the film." + "I watched it last night." = "That\'s the film that I watched last night." The relative clause comes RIGHT AFTER the noun it describes.' },
          { title: 'Examples', type: 'example', examples: ['She\'s the teacher who taught me English.', 'Where\'s the letter that came this morning?', 'I love the café where we had our first date.', 'The car which is parked outside is mine.'], analysis: 'Each sentence has two ideas joined by who/which/that/where. The relative clause defines WHICH person, thing, or place we mean — that is why they are called "defining" relative clauses.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Join the sentences using who, which, that, or where.', question: '"That\'s the hotel." + "We stayed there last summer."', answer: '"That\'s the hotel where we stayed last summer."', answerExplanation: 'Hotel = place → use "where." The relative clause replaces "there."' },
        ],
        keyTakeaways: ['Who = people, Which = things, That = both', 'Where = places', 'Relative clause goes RIGHT AFTER the noun', 'In casual English, "that" works for almost everything'],
        commonMistakes: ['"The man which called" → "The man who/that called" (people = who/that)', '"The place who I visited" → "The place that/which I visited"'],
        relatedLessons: ['a2-connectors', 'a2-past-simple-neg-q'],
      },

      // # ─── 23. Prepositions of Movement ───
      {
        id: 'a2-prepositions-movement',
        title: 'Prepositions of Movement: Into, Out of, Through, Across',
        description: 'Describe how things move — "She walked into the room," "He ran across the road."',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Use prepositions to describe direction and movement', 'Distinguish from prepositions of place (static position)'],
        sections: [
          { title: 'Key Movement Prepositions', type: 'rule', content: 'Into = entering: "She walked into the room." Out of = leaving: "He got out of the car." Through = from one side to the other (inside): "We drove through the tunnel." Across = from one side to the other (surface): "She ran across the road." Along = following a line: "We walked along the river." Past = going by without stopping: "I drove past the school." Over = above and across: "The cat jumped over the fence." Under = below: "The boat went under the bridge." Up/Down = higher/lower: "She walked up the stairs."' },
          { title: 'In vs Into, On vs Onto', type: 'tip', content: 'Position (static) vs movement (direction): "She is IN the room." (static — she is there) "She walked INTO the room." (movement — she entered) "The book is ON the table." (static) "She put the book ONTO the table." (movement) Use "in/on" for WHERE something IS. Use "into/onto" for WHERE something MOVES TO.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with into, out of, through, across, or along.', question: '"He walked _____ the shop, bought a coffee, walked _____ of the shop, and then walked _____ the street to the park."', answer: 'into ... out ... across', answerExplanation: 'Into = entering. Out of = leaving. Across = crossing from one side to the other.' },
        ],
        keyTakeaways: ['Into = entering, Out of = leaving', 'Through = inside passage, Across = over a surface', 'Along = following, Past = going by', 'In = static position. Into = movement/direction.'],
        commonMistakes: ['"She walked in the room" (entering) → "She walked into the room"', '"He jumped on the wall" (movement) → "He jumped over the wall"'],
        relatedLessons: ['a1-prepositions-place', 'a1-basic-directions'],
      },

      // # ─── 24. Both, Either, Neither ───
      {
        id: 'a2-both-either-neither',
        title: 'Both, Either, Neither',
        description: 'Talk about two options — "Both are good," "Either is fine," "Neither works."',
        skill: 'grammar', level: 'A2', duration: 8,
        objectives: ['Use both for two together', 'Use either for any one of two', 'Use neither for not one and not the other'],
        sections: [
          { title: 'Both = Two Together', type: 'rule', content: '"Both" means "the two — together": "Both restaurants are good." "I like both of them." "Both my parents are teachers." Both + plural verb: "Both are correct." Both...and: "She speaks both English and French."' },
          { title: 'Either and Neither', type: 'rule', content: '"Either" = one OR the other (it doesn\'t matter which): "Either day is fine." "You can have either one." Either...or: "We can go either today or tomorrow." "Neither" = not one AND not the other: "Neither answer is correct." "Neither of them came." Neither...nor: "She speaks neither English nor French." Neither + singular verb: "Neither is correct."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with both, either, or neither.', question: '"_____ of the two films were boring. I liked _____ of them. You should watch _____ one — they\'re _____ great."', answer: 'Neither ... both ... either ... both', answerExplanation: 'Neither were boring (= both were good). I liked both. Watch either one (doesn\'t matter which). Both are great.' },
        ],
        keyTakeaways: ['Both = two together (both + plural verb)', 'Either = any one of two (either...or)', 'Neither = not one, not the other (neither...nor)', 'Neither + singular verb. Both + plural verb.'],
        commonMistakes: ['"Neither are correct" (formal) → "Neither is correct" (singular)', '"Both doesn\'t work" → "Neither works" (negative = neither, not both + not)'],
        relatedLessons: ['a1-some-any', 'a2-connectors'],
      },

      // # ─── 25. Giving Directions & Location ───
      {
        id: 'a2-describing-location',
        title: 'Describing Locations and Neighbourhoods',
        description: 'Describe where you live, what is nearby, and what your area is like.',
        skill: 'speaking', level: 'A2', duration: 10,
        objectives: ['Describe your neighbourhood', 'Use there is/are for facilities', 'Use location prepositions fluently'],
        sections: [
          { title: 'Describing Your Area', type: 'rule', content: 'Start general, then specific: "I live in a small town in the south of England." "My flat is on the third floor of a modern building." "It\'s a quiet neighbourhood near the city centre." Facilities: "There are two supermarkets and a park nearby." "There isn\'t a hospital, but there\'s a clinic." "The nearest station is about 10 minutes\' walk."' },
          { title: 'Likes and Dislikes About Where You Live', type: 'tip', content: 'What you like: "I like living here because it\'s quiet and safe." "The best thing about my area is the park." "It\'s very convenient — there are lots of shops." What you dislike: "The worst thing is the traffic/noise." "There aren\'t enough restaurants." "It\'s a bit far from the centre." "I wish there were a cinema nearby."' },
          { title: 'Sample Description', type: 'example', examples: ['I live in a small flat in the centre of Bangkok.', 'It\'s on the fifth floor of a high-rise building.', 'There are lots of street food stalls and a big shopping mall nearby.', 'The only problem is the traffic — it\'s terrible during rush hour.'], analysis: 'A good location description covers: where (city, area), what type of home, what is nearby, and your opinion. This is a common topic in speaking exams.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Describe where you live in 4 sentences: location, home type, facilities, and opinion.', question: 'Describe your neighbourhood.', answer: 'Example: "I live in a suburb of London. My house has three bedrooms and a small garden. There is a good school nearby and a park across the road. I like it because it\'s quiet, but I wish there were more restaurants."', answerExplanation: 'Four elements: location + home + facilities + opinion. Use there is/are for what exists nearby.' },
        ],
        keyTakeaways: ['Start general (city/area), then specific (home type)', 'Use there is/are for facilities', 'Include both likes and dislikes', 'Common exam topic: "Describe where you live"'],
        relatedLessons: ['a1-there-is-are', 'a1-prepositions-place', 'a1-basic-directions'],
      },
    ],
  },
]
