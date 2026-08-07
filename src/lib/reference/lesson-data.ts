// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 1: General English Grammar Lessons (A1–B2)
// # ═══════════════════════════════════════════════════════════════════════════
// # Each lesson is a structured tutorial with objectives, multiple teaching
// # sections (text, rules, examples, tips, exercises), takeaways, and
// # common mistakes. All content is original and copyright-free.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES: LessonCategory[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # CATEGORY 1: ESSENTIAL GRAMMAR
  // # ═══════════════════════════════════════════════════════════════════
  {
    id: 'essential-grammar',
    name: 'Essential Grammar',
    description: 'Core grammar structures every English learner needs — from basic tenses to complex clause patterns.',
    icon: '📐',
    lessons: [

      // # ─── LESSON 1: Present Simple & Present Continuous ───
      {
        id: 'present-tenses',
        title: 'Present Simple vs Present Continuous',
        description: 'Learn when to use "I work" vs "I am working" — one of the most common mistakes at every level.',
        skill: 'grammar',
        level: 'A1',
        duration: 15,
        objectives: [
          'Distinguish between habits/routines and actions happening right now',
          'Form positive, negative, and question forms of both tenses',
          'Avoid the most common mistakes learners make with these tenses',
          'Use stative verbs correctly (know, believe, want)',
        ],
        sections: [
          {
            title: 'What is the Present Simple?',
            type: 'text',
            content: 'The present simple is the tense you use for things that are GENERALLY true — habits, routines, facts, and permanent situations. Think of it as describing your "normal life." You use it for things that happen regularly, not for what is happening right now at this exact moment. When someone asks "What do you do?" they want to know your job, your routine, your normal life — not what you are doing at this second.',
          },
          {
            title: 'Present Simple: The Rules',
            type: 'rule',
            content: 'Positive: I/you/we/they + base verb ("I work every day"). He/she/it + verb-s/es ("She works every day"). Negative: I/you/we/they + do not (don\'t) + base verb ("I don\'t work on Sundays"). He/she/it + does not (doesn\'t) + base verb ("She doesn\'t work on Sundays"). Questions: Do + I/you/we/they + base verb? ("Do you work here?"). Does + he/she/it + base verb? ("Does she work here?"). Remember: after "does/doesn\'t", the verb goes back to its base form — "Does she work" NOT "Does she works."',
          },
          {
            title: 'Present Simple in Action',
            type: 'example',
            examples: [
              'I drink coffee every morning.',
              'She doesn\'t eat meat — she\'s vegetarian.',
              'The sun rises in the east.',
              'Do you speak French?',
            ],
            analysis: 'Notice how every sentence describes something GENERAL — a daily habit (coffee every morning), a permanent choice (vegetarian), a scientific fact (sun rising), or a general ability (speaking French). None of these are happening right now at this second.',
          },
          {
            title: 'What is the Present Continuous?',
            type: 'text',
            content: 'The present continuous (also called present progressive) is for actions happening RIGHT NOW, at this moment, as you speak. It is also used for temporary situations that are happening "around now" but not necessarily at this exact second. Think of it as describing what is in progress — something that started, is still going, and will finish at some point.',
          },
          {
            title: 'Present Continuous: The Rules',
            type: 'rule',
            content: 'Form: Subject + am/is/are + verb-ing. Positive: "I am working," "She is studying," "They are playing." Negative: "I am not (I\'m not) working," "She is not (isn\'t) studying." Questions: "Are you working?", "Is she studying?", "What are they doing?" Spelling rules for -ing: Drop silent -e: make → making, write → writing. Double final consonant after short vowel: run → running, sit → sitting. -ie changes to -y: die → dying, lie → lying.',
          },
          {
            title: 'Present Continuous in Action',
            type: 'example',
            examples: [
              'I\'m reading a great book at the moment.',
              'She\'s living in Bangkok temporarily.',
              'Look! It\'s raining!',
              'Why are you wearing a coat? It\'s hot!',
            ],
            analysis: 'Every sentence describes something temporary and in progress — reading a book (will finish it), living in Bangkok (temporarily, not permanently), raining (happening now, will stop), wearing a coat (right now, you can take it off).',
          },
          {
            title: 'The Big Difference',
            type: 'tip',
            content: 'Here is the simplest test: Can you add "every day" or "usually" to the sentence? → Present Simple. Can you add "right now" or "at the moment"? → Present Continuous. "I eat rice" + every day = natural (present simple). "I\'m eating rice" + right now = natural (present continuous). "I eat rice right now" = WRONG. "I\'m eating rice every day" = WRONG (unless it is a new temporary habit).',
          },
          {
            title: 'Stative Verbs — The Exception',
            type: 'rule',
            content: 'Some verbs describe STATES, not ACTIONS. These verbs are almost never used in the continuous form. Common stative verbs: Mental states: know, believe, understand, remember, forget, think (= opinion), mean, suppose. Emotions: love, hate, like, prefer, want, need, wish. Senses: see, hear, smell, taste (when involuntary). Possession: have (= possess), own, belong, contain. Other: be, seem, appear, cost, weigh, owe. WRONG: "I am knowing the answer." CORRECT: "I know the answer." WRONG: "She is wanting a new car." CORRECT: "She wants a new car."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the correct form for this sentence.',
            question: '"Be quiet! The baby _____ (sleep)."',
            answer: 'is sleeping',
            answerExplanation: 'The baby is sleeping RIGHT NOW — it is an action in progress at this moment. The word "Be quiet!" tells us it is happening now. Present continuous: "The baby is sleeping."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the correct form for this sentence.',
            question: '"Water _____ (boil) at 100 degrees Celsius."',
            answer: 'boils',
            answerExplanation: 'This is a scientific fact — something that is ALWAYS true. It is not happening at this specific moment; it is a general truth. Present simple: "Water boils at 100 degrees Celsius."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the correct form.',
            question: '"I _____ (not understand) this word. What does it mean?"',
            answer: 'don\'t understand',
            answerExplanation: '"Understand" is a stative verb — it describes a mental state, not an action. We do not use stative verbs in the continuous form. Present simple: "I don\'t understand." NOT "I\'m not understanding."',
          },
        ],
        keyTakeaways: [
          'Present simple = habits, routines, facts, permanent situations',
          'Present continuous = actions happening now, temporary situations',
          'Add "every day" → present simple. Add "right now" → present continuous',
          'Stative verbs (know, want, love, believe) do NOT use continuous form',
          'He/she/it takes -s in present simple: "She works" not "She work"',
        ],
        commonMistakes: [
          '"I am go to school every day" → "I go to school every day" (habit = present simple)',
          '"She work in a bank" → "She works in a bank" (third person needs -s)',
          '"I\'m knowing the answer" → "I know the answer" (stative verb)',
          '"Does she works here?" → "Does she work here?" (base form after does)',
        ],
        relatedLessons: ['past-tenses', 'future-forms'],
      },

      // # ─── LESSON 2: Past Simple & Past Continuous ───
      {
        id: 'past-tenses',
        title: 'Past Simple vs Past Continuous',
        description: 'Master "I worked" vs "I was working" — essential for telling stories and describing past events.',
        skill: 'grammar',
        level: 'A2',
        duration: 15,
        objectives: [
          'Form the past simple with regular and irregular verbs',
          'Understand when to use past simple vs past continuous',
          'Tell stories using both tenses together naturally',
          'Handle common irregular verb forms correctly',
        ],
        sections: [
          {
            title: 'What is the Past Simple?',
            type: 'text',
            content: 'The past simple describes completed actions in the past. The action started and finished at a specific time. Think of it as telling someone about finished events: "I visited Paris last year," "She called me yesterday," "They won the match." The key idea is COMPLETED — the action is done, over, finished.',
          },
          {
            title: 'Past Simple: The Rules',
            type: 'rule',
            content: 'Regular verbs: add -ed to the base form. work → worked, play → played, study → studied, stop → stopped. Irregular verbs: each has its own past form (no pattern — you must memorise them). go → went, see → saw, take → took, eat → ate, buy → bought, think → thought. Negative: Subject + did not (didn\'t) + base verb. "I didn\'t go," "She didn\'t see it." Questions: Did + subject + base verb? "Did you go?", "Did she see it?" Important: after "did/didn\'t," the verb returns to BASE form — "Did you go" NOT "Did you went."',
          },
          {
            title: 'Past Simple in Action',
            type: 'example',
            examples: [
              'I moved to London in 2019.',
              'She didn\'t enjoy the film.',
              'We met at a conference last March.',
              'Did you finish the report?',
            ],
            analysis: 'Every action is COMPLETED. Moving to London — done. Not enjoying the film — finished. Meeting at a conference — over. Finishing the report — the question asks about a completed task.',
          },
          {
            title: 'What is the Past Continuous?',
            type: 'text',
            content: 'The past continuous describes actions that were IN PROGRESS at a specific time in the past. Think of it as the "background" of a story — what was already happening when something else occurred. "I was watching TV when the phone rang." The TV-watching was the ongoing background; the phone ringing was the sudden event that interrupted it.',
          },
          {
            title: 'Past Continuous: The Rules',
            type: 'rule',
            content: 'Form: Subject + was/were + verb-ing. I/he/she/it + was + verb-ing: "I was reading," "She was cooking." You/we/they + were + verb-ing: "They were sleeping," "We were talking." Negative: "I wasn\'t reading," "They weren\'t sleeping." Questions: "Were you reading?", "Was she cooking?"',
          },
          {
            title: 'Using Both Together — Storytelling',
            type: 'tip',
            content: 'The magic of these two tenses is how they work TOGETHER to tell stories. Past continuous sets the SCENE (the background). Past simple provides the EVENT (the action). Pattern: "I was [doing something] when [something happened]." Examples: "I was walking home when it started to rain." "She was cooking dinner when the fire alarm went off." "They were playing football when the storm began." The past continuous is the longer background action; the past simple is the shorter, sudden event that interrupts it.',
          },
          {
            title: 'Scene-Setting in Stories',
            type: 'example',
            examples: [
              'It was a cold evening. Snow was falling. People were hurrying home. Suddenly, a car crashed into a lamp post.',
              'While I was studying, my flatmate was playing loud music.',
            ],
            analysis: 'The first example uses past continuous to paint the scene (snow falling, people hurrying), then past simple for the sudden event (car crashed). The second example uses past continuous for two simultaneous background actions happening at the same time.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Complete the sentence with past simple or past continuous.',
            question: '"I _____ (read) a book when the doorbell _____ (ring)."',
            answer: 'was reading ... rang',
            answerExplanation: 'Reading was the ongoing background action (past continuous: "was reading"). The doorbell ringing was the sudden interruption (past simple: "rang").',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the correct form.',
            question: '"She _____ (live) in Tokyo for three years, then she _____ (move) to Seoul."',
            answer: 'lived ... moved',
            answerExplanation: 'Both actions are completed and happened one after the other (first she lived in Tokyo, then she moved). When telling a sequence of finished events, use past simple for both.',
          },
        ],
        keyTakeaways: [
          'Past simple = completed actions with a definite end point',
          'Past continuous = actions in progress at a specific past moment',
          'Together: past continuous = background scene, past simple = sudden event',
          'After did/didn\'t, always use the base verb: "Did you go" not "Did you went"',
          'Irregular verbs must be memorised — no shortcut',
        ],
        commonMistakes: [
          '"I was go to school yesterday" → "I went to school yesterday" (completed = past simple)',
          '"Did you went?" → "Did you go?" (base form after did)',
          '"When I was arriving, she left" → "When I arrived, she left" (arrival = completed instant)',
          '"I didn\'t knew" → "I didn\'t know" (base form after didn\'t)',
        ],
        relatedLessons: ['present-tenses', 'present-perfect', 'future-forms'],
      },

      // # ─── LESSON 3: Present Perfect ───
      {
        id: 'present-perfect',
        title: 'Present Perfect: Have/Has + Past Participle',
        description: 'The tense that connects the past to the present — experiences, unfinished time, and recent events.',
        skill: 'grammar',
        level: 'B1',
        duration: 18,
        objectives: [
          'Understand why the present perfect connects past to present',
          'Use the three main meanings: experience, unfinished time, recent events',
          'Distinguish present perfect from past simple',
          'Use key time expressions: ever, never, already, yet, just, since, for',
        ],
        sections: [
          {
            title: 'Why Does This Tense Exist?',
            type: 'text',
            content: 'The present perfect is probably the hardest tense for learners because many languages do not have it. Here is the key idea: the present perfect describes past actions that MATTER NOW. It builds a bridge between the past and the present. "I have lost my keys" — the losing happened in the past, but it matters RIGHT NOW because I still cannot find them. Compare: "I lost my keys yesterday, but I found them this morning" — the losing is finished, resolved, over. That is past simple.',
          },
          {
            title: 'Form: Have/Has + Past Participle',
            type: 'rule',
            content: 'I/you/we/they + have (\'ve) + past participle: "I have worked," "They\'ve eaten." He/she/it + has (\'s) + past participle: "She has finished," "He\'s gone." Negative: have not (haven\'t) / has not (hasn\'t): "I haven\'t seen it," "She hasn\'t arrived." Questions: Have/Has + subject + past participle: "Have you seen it?", "Has she arrived?" Past participle: regular verbs = same as past simple (-ed). Irregular verbs: go→gone, see→seen, eat→eaten, write→written, take→taken.',
          },
          {
            title: 'Meaning 1: Life Experience',
            type: 'example',
            examples: [
              'I have visited Japan three times.',
              'She has never eaten sushi.',
              'Have you ever been to a music festival?',
            ],
            analysis: '"Have you ever...?" asks about your entire life experience up to now. It does not ask about a specific time — it asks "at any point in your life, did this happen?" When you answer with a specific time, you switch to past simple: "Yes, I went to Japan in 2022." The present perfect opens the topic; the past simple gives the details.',
          },
          {
            title: 'Meaning 2: Unfinished Time Periods',
            type: 'example',
            examples: [
              'I have written three emails today. (today is not finished yet)',
              'She has read five books this month. (this month is still going)',
              'We haven\'t had any problems this year. (the year continues)',
            ],
            analysis: 'When the time period is still ongoing (today, this week, this month, this year), use present perfect. The time period started in the past but includes NOW. Compare: "I wrote three emails yesterday" — yesterday is finished, so we use past simple.',
          },
          {
            title: 'Meaning 3: Recent Events with Present Results',
            type: 'example',
            examples: [
              'I have just finished my homework. (so now I am free)',
              'She has broken her leg. (so she cannot walk now)',
              'They have already left. (so they are not here now)',
            ],
            analysis: 'The past event has a RESULT that matters right now. Breaking a leg is a past event, but the broken leg is a present reality. These sentences answer the question "What is the situation NOW?" not "What happened?"',
          },
          {
            title: 'Present Perfect vs Past Simple',
            type: 'tip',
            content: 'The golden rule: If you mention a SPECIFIC FINISHED TIME (yesterday, last week, in 2019, when I was young), use PAST SIMPLE. If the time is unfinished, unspecified, or the result matters now, use PRESENT PERFECT. "I have been to France" (sometime in my life — no specific time). "I went to France last summer" (specific finished time). "She has lost her phone" (result matters now — she still does not have it). "She lost her phone yesterday" (specific time, the story is about yesterday).',
          },
          {
            title: 'Key Time Expressions',
            type: 'rule',
            content: 'Present perfect markers: ever (Have you ever...?), never (I have never...), already (positive — sooner than expected), yet (negative/question — up to now), just (very recently), since (from a point in time: since 2020, since Monday), for (duration: for three years, for two hours). Past simple markers: yesterday, last week/month/year, ago (two days ago), in 2019, when I was young.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose present perfect or past simple.',
            question: '"I _____ (see) that film three times. I _____ (see) it again last weekend."',
            answer: 'have seen ... saw',
            answerExplanation: '"Have seen three times" = life experience, no specific time mentioned (present perfect). "Saw it last weekend" = specific finished time (past simple).',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the correct form.',
            question: '"She _____ (work) here since 2018."',
            answer: 'has worked',
            answerExplanation: '"Since 2018" means from 2018 until NOW — the time period is unfinished. She started in 2018 and still works here. Present perfect: "has worked."',
          },
        ],
        keyTakeaways: [
          'Present perfect = past actions that connect to or matter in the present',
          'Three uses: life experience, unfinished time periods, recent events with results',
          'Specific finished time → past simple. No time / unfinished time → present perfect',
          'ever/never/already/yet/just/since/for = present perfect signal words',
          'yesterday/last/ago/in 2019 = past simple signal words',
        ],
        commonMistakes: [
          '"I have seen him yesterday" → "I saw him yesterday" (specific time = past simple)',
          '"I went to Paris three times" → "I have been to Paris three times" (life experience)',
          '"She has broke her arm" → "She has broken her arm" (past participle, not past simple)',
          '"I have lived here since three years" → "I have lived here for three years" (for = duration)',
        ],
        relatedLessons: ['past-tenses', 'future-forms'],
      },

      // # ─── LESSON 4: Future Forms ───
      {
        id: 'future-forms',
        title: 'Talking About the Future: Will, Going To, Present Continuous',
        description: 'English has no single "future tense" — learn the three main ways to talk about the future and when to use each.',
        skill: 'grammar',
        level: 'A2',
        duration: 16,
        objectives: [
          'Understand why English uses three different forms for the future',
          'Choose between will, going to, and present continuous correctly',
          'Make predictions, plans, and spontaneous decisions naturally',
          'Avoid the most common future-form mistakes',
        ],
        sections: [
          {
            title: 'Why Three Future Forms?',
            type: 'text',
            content: 'Unlike many languages, English does not have one simple future tense. Instead, we choose between "will," "going to," and the present continuous based on the SITUATION — specifically, how certain the future event is and whether you decided it now or before now. This confuses learners, but there is a clear logic once you see it.',
          },
          {
            title: '"Will" — Predictions and Instant Decisions',
            type: 'rule',
            content: 'Form: Subject + will + base verb. "I will help you," "It will rain tomorrow," "She\'ll be fine." Use "will" for: 1) Predictions based on what you think/believe: "I think she will pass the exam." 2) Spontaneous decisions (decided RIGHT NOW): "The phone is ringing — I\'ll answer it." 3) Promises and offers: "I\'ll call you tomorrow," "I\'ll carry that for you." 4) Facts about the future: "The meeting will start at 3 p.m." Negative: will not (won\'t). Questions: Will + subject + verb? "Will you come?"',
          },
          {
            title: '"Going to" — Plans and Evidence-Based Predictions',
            type: 'rule',
            content: 'Form: Subject + am/is/are + going to + base verb. "I\'m going to study medicine," "They\'re going to move house." Use "going to" for: 1) Plans and intentions (decided BEFORE now): "I\'m going to start running next week" (I already decided this). 2) Predictions based on present EVIDENCE: "Look at those clouds — it\'s going to rain" (you can see the evidence now). Negative: "I\'m not going to accept that offer." Questions: "Are you going to apply for the job?"',
          },
          {
            title: 'Will vs Going To — The Decision Test',
            type: 'tip',
            content: 'The simplest way to choose: Did you decide BEFORE this conversation? → going to. Did you decide RIGHT NOW in this conversation? → will. "What are your plans for the weekend?" — "I\'m going to visit my parents." (already planned). Compare: "Oh no, I forgot it\'s Mum\'s birthday!" — "I\'ll buy some flowers on the way home." (decided right now, spontaneous). For predictions: No evidence, just opinion → will ("I think it will be a good film"). Evidence right in front of you → going to ("She looks terrible — she\'s going to be sick").',
          },
          {
            title: 'Present Continuous for Future — Fixed Arrangements',
            type: 'example',
            examples: [
              'I\'m meeting Sarah for lunch tomorrow. (we have arranged it)',
              'We\'re flying to Barcelona on Friday. (tickets are booked)',
              'She\'s starting her new job on Monday. (it is confirmed)',
            ],
            analysis: 'The present continuous is used for ARRANGED future events — things that are confirmed, in your diary, booked, or agreed with another person. The difference from "going to" is subtle: "I\'m going to see a doctor" = I intend to, I have decided. "I\'m seeing the doctor at 3 p.m." = the appointment is booked and confirmed.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the best future form.',
            question: '"Someone is knocking at the door." — "I _____ (get) it."',
            answer: 'I\'ll get it.',
            answerExplanation: 'This is a spontaneous decision — you decided RIGHT NOW because you heard the knock. Spontaneous decisions use "will": "I\'ll get it."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the best future form.',
            question: '"What are your plans for the summer?" — "We _____ (travel) around Europe."',
            answer: 'We\'re going to travel',
            answerExplanation: 'This is a plan made before now — the question asks about plans you already have. Plans decided before now use "going to": "We\'re going to travel around Europe."',
          },
        ],
        keyTakeaways: [
          'Will = predictions (opinion), spontaneous decisions, promises, offers',
          'Going to = plans (decided before), predictions (evidence you can see)',
          'Present continuous = confirmed arrangements (booked, agreed, in diary)',
          'Decided NOW → will. Decided BEFORE → going to. Already ARRANGED → present continuous',
          'All three are correct for the future — the choice depends on the situation, not the time',
        ],
        commonMistakes: [
          '"I will go to the dentist tomorrow" (if it\'s a booked appointment) → "I\'m going to the dentist tomorrow"',
          '"I\'m going to help you" (spontaneous) → "I\'ll help you" (decided right now)',
          '"I think it\'s going to be a good year" → "I think it will be a good year" (opinion, no evidence)',
          '"We will travel next month — we booked flights" → "We\'re travelling next month — we booked flights"',
        ],
        relatedLessons: ['present-tenses', 'past-tenses', 'conditionals-lesson'],
      },

      // # ─── LESSON 5: Conditionals ───
      {
        id: 'conditionals-lesson',
        title: 'Conditionals: Zero, First, Second, Third',
        description: 'If, then, would, could — master all four conditional forms to talk about real and imaginary situations.',
        skill: 'grammar',
        level: 'B1',
        duration: 20,
        objectives: [
          'Understand the logic behind each conditional type',
          'Form all four conditionals correctly',
          'Choose the right conditional based on how real/likely the situation is',
          'Mix conditionals naturally in conversation',
        ],
        sections: [
          {
            title: 'What Are Conditionals?',
            type: 'text',
            content: 'Conditionals are "if...then" sentences. They describe what happens (or would happen) under certain conditions. English has four main types, and the choice depends on ONE thing: how REAL or LIKELY is the situation? Zero conditional = always true (100%). First conditional = possible/likely future (maybe 50-90%). Second conditional = unlikely or imaginary present/future (5% or impossible). Third conditional = impossible past (0% — it is too late).',
          },
          {
            title: 'Zero Conditional — Always True',
            type: 'rule',
            content: 'Form: If + present simple, present simple. "If you heat water to 100°C, it boils." "If I eat too much, I feel sick." Use for: Scientific facts, general truths, things that ALWAYS happen. "If" can be replaced by "when" with no change in meaning: "When you heat water to 100°C, it boils."',
          },
          {
            title: 'First Conditional — Real Possibility',
            type: 'rule',
            content: 'Form: If + present simple, will + base verb. "If it rains tomorrow, I\'ll stay home." "If she passes the exam, she\'ll be very happy." Use for: Realistic future situations — things that might actually happen. The condition is possible, and you are talking about what you think WILL happen if it comes true. Note: "will" can be replaced by other modals: "If you study, you might/could/should pass."',
          },
          {
            title: 'Second Conditional — Unlikely or Imaginary',
            type: 'rule',
            content: 'Form: If + past simple, would + base verb. "If I won the lottery, I would buy a house." "If she spoke Chinese, she would apply for that job." Use for: Unlikely future situations or imaginary present situations. You are DREAMING, not planning. Special: After "if," we use "were" for all subjects (formal): "If I were you, I would accept the offer" (not "If I was" — though "was" is common in informal speech).',
          },
          {
            title: 'Second Conditional vs First Conditional',
            type: 'tip',
            content: 'The difference is how LIKELY you think the situation is. "If I get the job, I\'ll move to London." (first conditional — you applied, it might happen, it is realistic). "If I got a job in London, I\'d move there." (second conditional — you have not applied, it is just a thought, not very likely). The past tense in the second conditional does NOT mean past time — it means "unreal/imaginary." "If I were a bird, I would fly" — this is not about the past; you are imagining being a bird right now.',
          },
          {
            title: 'Third Conditional — Impossible Past',
            type: 'rule',
            content: 'Form: If + past perfect, would have + past participle. "If I had studied harder, I would have passed." "If she had left earlier, she wouldn\'t have missed the train." Use for: Past situations that DID NOT happen. You are looking back and imagining a different past. It is ALWAYS too late — you cannot change what happened. The third conditional often expresses regret: "If I had known, I would have helped."',
          },
          {
            title: 'All Four in Context',
            type: 'example',
            examples: [
              'If you mix red and blue, you get purple. (zero — always true)',
              'If the weather is nice this weekend, we\'ll go to the beach. (first — realistic plan)',
              'If I had more time, I\'d learn to play the piano. (second — I don\'t have time, imaginary)',
              'If I had taken that job, I would have moved to Sydney. (third — I didn\'t take it, too late)',
            ],
            analysis: 'Notice how each conditional moves further from reality: always true → possible → unlikely → impossible. The verb forms signal this: present/present → present/will → past/would → past perfect/would have.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Which conditional is correct?',
            question: '"If I _____ (be) you, I _____ (not accept) that offer."',
            answer: 'were ... would not (wouldn\'t) accept',
            answerExplanation: 'You are NOT the other person — this is imaginary advice. Imaginary present = second conditional: "If I were you, I wouldn\'t accept."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Which conditional is correct?',
            question: '"If she _____ (not miss) the bus, she _____ (not be) late for the interview."',
            answer: 'hadn\'t missed ... wouldn\'t have been',
            answerExplanation: 'She DID miss the bus and she WAS late — we are imagining a different past. Impossible past = third conditional: "If she hadn\'t missed the bus, she wouldn\'t have been late."',
          },
        ],
        keyTakeaways: [
          'Zero = always true (present + present)',
          'First = possible future (present + will)',
          'Second = unlikely/imaginary now (past + would)',
          'Third = impossible past (past perfect + would have)',
          'The past tense in second conditional = unreal, NOT past time',
          '"If I were you" is the correct formal form for advice',
        ],
        commonMistakes: [
          '"If I will go, I will see him" → "If I go, I will see him" (no "will" in the if-clause for first conditional)',
          '"If I would have money, I would travel" → "If I had money, I would travel" (no "would" in the if-clause)',
          '"If I studied harder, I would passed" → "If I had studied harder, I would have passed" (third, not second)',
          '"If I was you" → "If I were you" (formal/correct form with "were")',
        ],
        relatedLessons: ['future-forms', 'modal-verbs-lesson'],
      },

      // # ─── LESSON 6: Modal Verbs ───
      {
        id: 'modal-verbs-lesson',
        title: 'Modal Verbs: Can, Could, Must, Should, May, Might',
        description: 'Express ability, possibility, obligation, and advice using the full range of English modal verbs.',
        skill: 'grammar',
        level: 'B1',
        duration: 18,
        objectives: [
          'Understand the function of each modal verb',
          'Express degrees of certainty (must, might, could, can\'t)',
          'Give advice and talk about obligations (should, must, have to)',
          'Talk about ability in present and past (can, could, be able to)',
        ],
        sections: [
          {
            title: 'What Are Modal Verbs?',
            type: 'text',
            content: 'Modal verbs are special helper verbs that add MEANING to the main verb. They do not describe actions — they describe how you feel about the action: how possible it is, how necessary it is, or how certain you are. "She speaks French" = fact. "She can speak French" = ability. "She must speak French" = obligation. "She might speak French" = possibility. The main verb stays in its BASE form after a modal — no -s, no -ing, no -ed.',
          },
          {
            title: 'Modal Verbs: The Grammar Rules',
            type: 'rule',
            content: 'All modal verbs follow the same pattern: 1) No -s for third person: "She can swim" NOT "She cans swim." 2) Followed by BASE verb: "He must go" NOT "He must goes/going/went." 3) No "do/does" for negatives and questions: "Can you swim?" NOT "Do you can swim?" "She can\'t swim" NOT "She doesn\'t can swim." 4) No infinitive form: you cannot say "to must" or "to can." The main modals: can, could, will, would, shall, should, may, might, must.',
          },
          {
            title: 'Ability: Can, Could, Be Able To',
            type: 'example',
            examples: [
              'I can swim. (present ability)',
              'She could play the piano when she was five. (past general ability)',
              'I was able to finish the project on time. (past specific achievement)',
              'Will you be able to attend the meeting? (future ability)',
            ],
            analysis: '"Can" is for present ability. "Could" is for past general ability (something you could do at any time). For a specific past achievement (one occasion), use "was/were able to" instead of "could": "I was able to escape" (I actually did it), not "I could escape" (which implies general ability, not that you actually did).',
          },
          {
            title: 'Possibility and Certainty',
            type: 'tip',
            content: 'From most certain to least certain: Must be (95% sure, logical deduction): "She must be tired — she worked 14 hours." Will probably (80%): "He\'ll probably pass." Should (70% expectation): "The package should arrive tomorrow." May/might/could (50% or less): "It might rain later." All three mean about the same. Can\'t be (95% sure it is NOT true): "That can\'t be right — check the numbers." For negative certainty, use "can\'t" not "mustn\'t": "He can\'t be 60 — he looks 40!"',
          },
          {
            title: 'Obligation and Advice: Must, Should, Have To',
            type: 'rule',
            content: 'Must = strong obligation (often from the speaker): "You must wear a seatbelt" (it is the law, I am telling you). Have to = external obligation: "I have to work on Saturday" (my boss requires it). Should = advice, recommendation: "You should see a doctor" (my advice, not an order). Must not = prohibition (do NOT do this): "You must not park here." Don\'t have to = no obligation (you can if you want, but it is not necessary): "You don\'t have to come — it is optional."',
          },
          {
            title: 'Must Not vs Don\'t Have To',
            type: 'tip',
            content: 'This is one of the trickiest distinctions in English: "You must not drive" = it is FORBIDDEN — do NOT drive. "You don\'t have to drive" = it is NOT NECESSARY — driving is optional, you can take the bus. "Must not" = prohibition (like a red traffic light). "Don\'t have to" = no requirement (like an empty car park — you can park or not).',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the correct modal.',
            question: '"She\'s been studying all day. She _____ be exhausted."',
            answer: 'must',
            answerExplanation: 'You are making a logical deduction based on evidence (studying all day). High certainty deductions use "must": "She must be exhausted."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose "must not" or "don\'t have to."',
            question: '"It\'s a casual event. You _____ wear a suit."',
            answer: 'don\'t have to',
            answerExplanation: 'A casual event means wearing a suit is NOT NECESSARY — it is optional, not forbidden. "You don\'t have to wear a suit." If it were "must not," it would mean suits are banned.',
          },
        ],
        keyTakeaways: [
          'Modals never change form — no -s, no -ed, no -ing, no "to"',
          'Can = present ability; Could = past ability; Be able to = future/specific past',
          'Must = logical deduction (positive); Can\'t = logical deduction (negative)',
          'Must = obligation from speaker; Have to = external obligation',
          'Must not = forbidden; Don\'t have to = not necessary (optional)',
          'Should = advice and recommendations',
        ],
        commonMistakes: [
          '"She must to go" → "She must go" (no "to" after modals)',
          '"He can speaks French" → "He can speak French" (base form after modal)',
          '"You mustn\'t come if you don\'t want to" → "You don\'t have to come" (optional, not forbidden)',
          '"Do you can help me?" → "Can you help me?" (no do/does with modals)',
        ],
        relatedLessons: ['conditionals-lesson', 'passive-voice-lesson'],
      },

      // # ─── LESSON 7: Passive Voice ───
      {
        id: 'passive-voice-lesson',
        title: 'Active vs Passive Voice',
        description: 'Learn when and why to use the passive — essential for academic writing and formal English.',
        skill: 'grammar',
        level: 'B2',
        duration: 16,
        objectives: [
          'Understand why we use passive instead of active voice',
          'Form the passive in all tenses',
          'Identify when passive is better than active',
          'Use passive naturally in academic and formal writing',
        ],
        sections: [
          {
            title: 'Active vs Passive — What Changes?',
            type: 'text',
            content: 'In active voice, the subject DOES the action: "The dog bit the man." In passive voice, the subject RECEIVES the action: "The man was bitten by the dog." The information is the same, but the focus shifts. Active focuses on WHO did it (the dog). Passive focuses on WHO it happened to (the man). We choose passive when the receiver of the action is more important than the doer, when the doer is unknown, or when we want to sound more formal.',
          },
          {
            title: 'Forming the Passive',
            type: 'rule',
            content: 'Formula: Subject + be (correct tense) + past participle + (by agent). Present simple: "Coffee is grown in Brazil." Present continuous: "The road is being repaired." Past simple: "The window was broken." Past continuous: "The house was being painted." Present perfect: "The report has been submitted." Past perfect: "The car had been stolen." Future: "The results will be announced." Modal: "This must be done today." The "by agent" is optional — include it only when the doer matters: "The book was written by George Orwell."',
          },
          {
            title: 'When to Use Passive',
            type: 'tip',
            content: 'Use passive when: 1) The doer is unknown: "My car was stolen" (by whom? I don\'t know). 2) The doer is obvious: "He was arrested" (obviously by police). 3) The action matters more than the doer: "The Eiffel Tower was built in 1889" (we care about the tower, not the construction workers). 4) In academic/formal writing: "The results were analysed using SPSS" (impersonal, objective). 5) To be diplomatic: "Mistakes were made" (avoids blaming anyone). Do NOT overuse passive — it can make writing unclear and wordy.',
          },
          {
            title: 'Passive Across Tenses',
            type: 'example',
            examples: [
              'English is spoken in over 60 countries. (present simple passive)',
              'A new hospital is being built near the river. (present continuous passive)',
              'The suspect was seen near the bank at 3 p.m. (past simple passive)',
              'Three new employees have been hired. (present perfect passive)',
            ],
            analysis: 'In each sentence, we care about the RECEIVER (English, hospital, suspect, employees) more than the doer. The doer is either unknown, obvious, or unimportant.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Rewrite in passive voice.',
            question: '"Someone stole my laptop from the library."',
            answer: 'My laptop was stolen from the library.',
            answerExplanation: 'The doer is unknown ("someone"), so passive is natural. The focus shifts to what was stolen: "My laptop was stolen from the library." We drop "by someone" because it adds nothing.',
          },
        ],
        keyTakeaways: [
          'Passive = be (correct tense) + past participle',
          'Use when doer is unknown, obvious, or less important than the action',
          'Academic writing favours passive for objectivity',
          'Only include "by..." when the doer is important information',
          'Do not overuse passive — active voice is usually clearer and more direct',
        ],
        commonMistakes: [
          '"The window was broke" → "The window was broken" (past participle, not past simple)',
          '"The cake was make by my mother" → "The cake was made by my mother" (irregular: make→made)',
          'Using passive when active is clearer: "The ball was kicked by John" → "John kicked the ball"',
        ],
        relatedLessons: ['modal-verbs-lesson', 'relative-clauses-lesson'],
      },
    ],
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # CATEGORY 2: IELTS STRATEGIES
  // # ═══════════════════════════════════════════════════════════════════
  {
    id: 'ielts-strategies',
    name: 'IELTS Test Strategies',
    description: 'Targeted strategies and techniques for every section of the IELTS exam — Writing, Speaking, Reading, and Listening.',
    icon: '🎯',
    lessons: [

      // # ─── IELTS Writing Task 1 ───
      {
        id: 'ielts-writing-task1',
        title: 'IELTS Writing Task 1: Describing Visual Data',
        description: 'Learn the structure, language, and strategies for describing graphs, charts, tables, and diagrams.',
        skill: 'writing',
        level: 'B2',
        duration: 20,
        objectives: [
          'Structure a Task 1 response in 4 clear paragraphs',
          'Use key language for trends, comparisons, and data description',
          'Select and report main features without listing every number',
          'Achieve Band 7+ with overview paragraphs and range of vocabulary',
        ],
        sections: [
          {
            title: 'Task 1 Overview',
            type: 'text',
            content: 'In IELTS Academic Writing Task 1, you describe visual information — a graph, chart, table, map, or process diagram — in at least 150 words. You have about 20 minutes. The most important thing to understand: you are NOT giving opinions. You are REPORTING what the data shows. Think of yourself as a news reporter describing facts. The examiner wants to see: a clear overview, well-selected main features, accurate data, and a range of vocabulary.',
          },
          {
            title: 'The 4-Paragraph Structure',
            type: 'rule',
            content: 'Paragraph 1: INTRODUCTION — Paraphrase the question. Do NOT copy the question word for word. Rewrite it using synonyms. "The bar chart shows..." → "The bar chart illustrates..." / "The graph presents data on..." Paragraph 2: OVERVIEW — The most important paragraph. Summarise the 2-3 BIGGEST trends or features. No numbers here — just the general picture. "Overall, it is clear that X increased significantly while Y remained relatively stable." Paragraph 3-4: DETAILS — Describe specific data with numbers, dates, and comparisons. Group logically (by trend, by time period, by category).',
          },
          {
            title: 'The Overview — Your Most Important Paragraph',
            type: 'tip',
            content: 'Many students skip the overview or bury it at the end. The overview is what separates Band 6 from Band 7. Start with "Overall," or "In general," then state the 2-3 biggest patterns. Ask yourself: "If someone could only read one sentence about this chart, what would they need to know?" That is your overview. Example: "Overall, the number of people using public transport increased steadily, while car usage declined over the same period." No numbers — just the big picture.',
          },
          {
            title: 'Key Language for Trends',
            type: 'rule',
            content: 'Upward trends: increased, rose, grew, climbed, surged, soared. Downward trends: decreased, fell, dropped, declined, plummeted. No change: remained stable, stayed constant, plateaued, levelled off. Fluctuation: fluctuated, varied, was erratic. Degree modifiers: dramatically, significantly, substantially, moderately, slightly, marginally, gradually, steadily. Time references: over the period, between 2010 and 2020, from X to Y, during the first/last decade.',
          },
          {
            title: 'Describing Data Accurately',
            type: 'example',
            examples: [
              'Sales rose sharply from 2 million to 8 million between 2015 and 2020.',
              'The figure for Japan was approximately 45%, compared to just 12% for India.',
              'By 2025, the number had reached a peak of 3.5 billion.',
              'Spending on education remained relatively constant at around 5% of GDP.',
            ],
            analysis: 'Notice the variety: verbs for trends (rose, reached, remained), adverbs for degree (sharply, relatively), prepositions for data (from...to, at around, compared to). Using this range of vocabulary is what earns higher band scores.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Write an overview sentence for this data.',
            question: 'A line graph shows internet usage from 2000-2020: developed countries rose from 30% to 90%; developing countries rose from 2% to 55%.',
            answer: 'Overall, internet usage increased in both developed and developing countries over the two decades, although developed nations maintained a consistently higher rate of adoption.',
            answerExplanation: 'A good overview captures the main trend (both increased), the key difference (developed higher), and the time frame (two decades) — without specific numbers.',
          },
        ],
        keyTakeaways: [
          '4 paragraphs: Introduction, Overview, Detail 1, Detail 2',
          'The overview is the most important paragraph — never skip it',
          'Paraphrase the question in the introduction, never copy it',
          'Use trend vocabulary with degree modifiers for range',
          'Select main features — do not describe every single number',
          'No opinions in Task 1 — only report what the data shows',
        ],
        commonMistakes: [
          'Copying the question word for word (paraphrase it instead)',
          'No overview paragraph (this limits you to Band 6)',
          'Listing every number without grouping or comparing',
          'Using "I think" or giving opinions (Task 1 is objective)',
          'Writing fewer than 150 words (there is a penalty)',
        ],
        relatedLessons: ['ielts-writing-task2', 'linking-words-lesson'],
      },

      // # ─── IELTS Writing Task 2 ───
      {
        id: 'ielts-writing-task2',
        title: 'IELTS Writing Task 2: The 4-Paragraph Essay',
        description: 'Master the essay structure that examiners expect — introduction, body paragraphs, and conclusion.',
        skill: 'writing',
        level: 'B2',
        duration: 22,
        objectives: [
          'Write a clear thesis statement in the introduction',
          'Structure body paragraphs with topic sentences and support',
          'Develop ideas with explanations, examples, and consequences',
          'Write a concise conclusion that does not introduce new ideas',
        ],
        sections: [
          {
            title: 'Understanding the Task',
            type: 'text',
            content: 'Task 2 asks you to write a 250-word essay responding to a point of view, argument, or problem. Common types: Opinion (agree/disagree), Discussion (discuss both views), Problem/Solution, Advantages/Disadvantages, Two-part question. You have 40 minutes. Task 2 is worth TWICE as much as Task 1, so plan your time accordingly — most students should spend about 40 minutes on Task 2 and only 20 on Task 1.',
          },
          {
            title: 'The 4-Paragraph Structure',
            type: 'rule',
            content: 'Paragraph 1: INTRODUCTION (2-3 sentences). Sentence 1: Paraphrase the question topic. Sentence 2: Your thesis — your clear answer/position. Paragraph 2: BODY 1 (5-7 sentences). Topic sentence + explanation + example + result/consequence. This is your strongest argument. Paragraph 3: BODY 2 (5-7 sentences). Same structure. Second argument, or the opposing view (for discussion essays). Paragraph 4: CONCLUSION (1-2 sentences). Restate your position in different words. Do NOT add new ideas.',
          },
          {
            title: 'The Introduction Formula',
            type: 'tip',
            content: 'A strong introduction has exactly two jobs: show you understand the topic and state your position. Do NOT write background history, ask rhetorical questions, or use phrases like "In today\'s modern world" or "Since the dawn of time." These waste words and annoy examiners. Example question: "Some people think that children should start formal education at age 4. Others believe they should not start until age 7. Discuss both views and give your opinion." Introduction: "There is ongoing debate about the ideal age to begin formal schooling. While early education offers certain cognitive advantages, I believe children benefit more from starting school at six or seven, when they are developmentally ready for structured learning."',
          },
          {
            title: 'Body Paragraphs: The PEEL Method',
            type: 'rule',
            content: 'P — Point: Start with a clear topic sentence that states the paragraph\'s main idea. E — Explain: Explain WHY this point is true or important. E — Example: Give a specific example or evidence to support it. L — Link: End with a sentence that connects back to your thesis or links to the next paragraph. Example: "One significant advantage of later schooling is that young children learn best through play, not formal instruction. (Point) Research in developmental psychology shows that children under six absorb language, social skills, and problem-solving more effectively through unstructured play than through sitting at desks. (Explain) For instance, Finland, which starts formal education at seven, consistently ranks among the highest-performing nations in education. (Example) This suggests that delaying formal schooling can actually improve academic outcomes in the long term. (Link)"',
          },
          {
            title: 'The Conclusion — Keep It Short',
            type: 'tip',
            content: 'Your conclusion should be 1-2 sentences maximum. It has ONE job: summarise your position. Do NOT introduce new ideas, new examples, or new arguments. Simply restate what you have already argued, using different words from your introduction. Good: "In conclusion, while early formal education has some benefits, starting school at a later age appears to produce better outcomes for children\'s overall development." Bad: "In conclusion, I think the government should invest more money in preschool programs and also improve teacher training." (This introduces completely new ideas.)',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Identify the problem with this introduction.',
            question: '"In today\'s modern world, technology is everywhere. Since the beginning of time, humans have always wanted to communicate. I will discuss both sides and give my opinion."',
            answer: 'Three problems: (1) "In today\'s modern world" is a cliché examiners dislike. (2) "Since the beginning of time" is vague padding. (3) "I will discuss both sides" repeats the task instruction without showing understanding.',
            answerExplanation: 'A good introduction paraphrases the specific topic (not generic filler) and states a clear position. Remove clichés and replace with substance.',
          },
        ],
        keyTakeaways: [
          '4 paragraphs: Introduction (thesis), Body 1, Body 2, Conclusion',
          'Introduction = paraphrase topic + state your position (2-3 sentences)',
          'Body paragraphs use PEEL: Point, Explain, Example, Link',
          'Conclusion = restate position in different words, no new ideas',
          'Task 2 is worth double — spend 40 minutes, not 20',
          'Avoid clichés: "In today\'s modern world," "Since time immemorial"',
        ],
        commonMistakes: [
          'No clear thesis in the introduction — examiners cannot identify your position',
          'Body paragraphs without topic sentences — ideas feel random',
          'Conclusion introduces new arguments — this weakens the essay',
          'Writing less than 250 words — there is a penalty',
          'Using memorised phrases that do not fit the question',
        ],
        relatedLessons: ['ielts-writing-task1', 'linking-words-lesson', 'formal-register-lesson'],
      },

      // # ─── IELTS Speaking Parts 1-3 ───
      {
        id: 'ielts-speaking-all',
        title: 'IELTS Speaking: All Three Parts',
        description: 'What to expect in each part and how to maximise your score with natural, extended responses.',
        skill: 'speaking',
        level: 'B1',
        duration: 18,
        objectives: [
          'Understand what each Speaking part tests',
          'Extend your answers beyond one-word responses',
          'Use the 1-minute preparation time effectively in Part 2',
          'Discuss abstract topics confidently in Part 3',
        ],
        sections: [
          {
            title: 'Part 1: Personal Questions (4-5 minutes)',
            type: 'text',
            content: 'The examiner asks simple questions about familiar topics: your home, job, studies, hobbies, daily routines. The secret: do NOT give one-word answers. "Do you like cooking?" — Bad: "Yes." Good: "Yes, I really enjoy it. I usually cook dinner every evening and I find it quite relaxing after a long day at work. My favourite thing to make is Thai curry because I love spicy food." Aim for 2-3 sentences per answer. Use the "Answer + Reason + Detail" formula.',
          },
          {
            title: 'Part 1: The Answer + Reason + Detail Formula',
            type: 'rule',
            content: 'For every Part 1 question, give: ANSWER — directly answer the question. REASON — explain why (because/since/as). DETAIL — add one more interesting piece of information. Question: "Do you prefer reading or watching films?" Answer: "I\'d say I prefer reading, mainly because I can use my imagination to picture the story. I usually read before bed — I\'m currently reading a mystery novel that I can\'t put down." This takes about 15-20 seconds — perfect for Part 1.',
          },
          {
            title: 'Part 2: The Long Turn (3-4 minutes)',
            type: 'text',
            content: 'You receive a cue card with a topic and bullet points. You get 1 minute to prepare, then speak for 1-2 minutes. This is the ONLY part where you speak without interruption. The cue card always has "Describe..." followed by 3-4 bullet points. You MUST address all the bullet points to score well. Think of it as telling a mini-story.',
          },
          {
            title: 'Part 2: Using Your 1-Minute Preparation',
            type: 'tip',
            content: 'In your 1 minute, do NOT write full sentences — you will run out of time. Instead, write KEY WORDS and a STRUCTURE. For each bullet point, write 2-3 trigger words that will remind you what to say. Example cue card: "Describe a skill you learned as a child." Your notes: "Swimming — age 6 — dad taught — scared at first — now love it — confidence." These notes are enough to guide 2 minutes of speaking. Practise this technique before the exam.',
          },
          {
            title: 'Part 3: Abstract Discussion (4-5 minutes)',
            type: 'text',
            content: 'Part 3 is the hardest — the examiner asks abstract, opinion-based questions related to the Part 2 topic. If Part 2 was about "a skill you learned," Part 3 might ask: "Why is it important for children to learn practical skills?" "How has technology changed the way people learn new skills?" You need to give thoughtful, developed answers. This is where Band 7+ students shine.',
          },
          {
            title: 'Part 3: Structuring Your Answers',
            type: 'rule',
            content: 'Use this pattern for Part 3: STATE your opinion: "I believe that..." EXPLAIN why: "The main reason is..." GIVE an example: "For instance..." ADD a balancing point (for Band 7+): "Having said that..." / "On the other hand..." CONCLUDE: "So overall, I\'d say..." You should speak for about 30-45 seconds per question. If you are asked "Do you agree or disagree?" — pick ONE side and argue it clearly. Sitting on the fence ("it depends") is weaker than a clear position.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Identify what is wrong with this Part 1 answer.',
            question: 'Question: "What do you do in your free time?" Answer: "I like music."',
            answer: 'The answer is too short — only 3 words. It gives no reason or detail.',
            answerExplanation: 'Better: "I\'m quite into music. I usually listen to indie rock or jazz when I\'m relaxing at home, and I\'ve recently started learning to play the guitar, which is challenging but really enjoyable." This is about 30 words — much better for Part 1.',
          },
        ],
        keyTakeaways: [
          'Part 1: Answer + Reason + Detail (2-3 sentences per answer)',
          'Part 2: Write key words in your 1 minute, not full sentences',
          'Part 2: Address ALL bullet points on the cue card',
          'Part 3: State → Explain → Example → Balance → Conclude',
          'Never give one-word answers in any part',
          'Pick a clear position in Part 3 — avoid "it depends"',
        ],
        commonMistakes: [
          'One-word answers in Part 1 ("Yes" / "No" / "Sometimes")',
          'Writing full sentences in Part 2 prep time (write key words instead)',
          'Ignoring bullet points on the cue card in Part 2',
          'Not extending answers enough in Part 3 — aim for 30-45 seconds',
          'Memorised answers — examiners detect and penalise these',
        ],
        relatedLessons: ['ielts-writing-task2', 'formal-register-lesson'],
      },

      // # ─── IELTS Reading Strategy ───
      {
        id: 'ielts-reading-strategy',
        title: 'IELTS Reading: Speed and Strategy',
        description: 'Essential techniques for completing 40 questions in 60 minutes — skimming, scanning, and question-type tactics.',
        skill: 'reading',
        level: 'B2',
        duration: 18,
        objectives: [
          'Skim a passage in 3 minutes to understand the main idea',
          'Scan for specific information without reading every word',
          'Tackle each question type with the right technique',
          'Manage time across three sections (20 minutes each)',
        ],
        sections: [
          {
            title: 'The Time Problem',
            type: 'text',
            content: 'IELTS Reading has 3 passages and 40 questions in 60 minutes. That is 20 minutes per passage, or 1.5 minutes per question. You absolutely CANNOT read every word carefully — there is not enough time. Instead, you need two skills: SKIMMING (reading quickly for the main idea) and SCANNING (searching for specific words or data). These are not "cheating" — they are the skills the test is designed to measure.',
          },
          {
            title: 'Skimming: 3 Minutes for the Big Picture',
            type: 'rule',
            content: 'Before answering any questions, spend 2-3 minutes skimming the whole passage. Read: the title and subtitle, the first sentence of each paragraph (this is usually the topic sentence), the last paragraph (this often contains the conclusion). Skip: examples, data, lists, long descriptions. After skimming, you should be able to say: "This passage is about X" and "Paragraph 1 covers A, paragraph 2 covers B, etc." This mental map saves time when answering questions because you know WHERE to look.',
          },
          {
            title: 'Scanning: Finding Specific Information',
            type: 'tip',
            content: 'Scanning means searching for a specific word, name, number, or date WITHOUT reading the surrounding text. Your eyes move quickly over the page looking for the TARGET word. Tips for effective scanning: Look for CAPITAL letters (names, places), numbers, dates, and unusual words — they stand out on the page. Read the question FIRST, identify the key word, THEN scan the passage for that word or its synonym. The answer is usually within 2-3 lines of where you find the key word.',
          },
          {
            title: 'Question Types and Strategies',
            type: 'rule',
            content: 'True/False/Not Given: "True" = the passage says exactly this. "False" = the passage says the OPPOSITE. "Not Given" = the passage does not mention this at all. The hardest part is distinguishing False from Not Given. Matching Headings: skim for the MAIN IDEA of each paragraph — ignore details. Sentence Completion: find the location using key words, then read carefully to complete the sentence. Use the EXACT words from the passage. Summary Completion: similar to sentence completion but tests understanding of a longer section. Multiple Choice: read all options before choosing — wrong answers often contain words from the passage to trick you.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Classify this as True, False, or Not Given.',
            question: 'Passage says: "The experiment was conducted in 2019 with 500 participants." Statement: "More than 400 people took part in the study."',
            answer: 'True',
            answerExplanation: '500 participants is "more than 400." The passage confirms the statement with different words. This is True, not Not Given — the information IS there, just expressed differently.',
          },
        ],
        keyTakeaways: [
          'Skim first (2-3 min): title, first sentences, last paragraph',
          'Scan for key words — do not read every word',
          'Build a mental paragraph map before answering questions',
          'True = passage confirms it; False = passage contradicts it; Not Given = not mentioned',
          'Read the question first, THEN find the answer in the passage',
          '20 minutes per section — move on if stuck',
        ],
        commonMistakes: [
          'Reading every word from start to finish (too slow)',
          'Spending too long on one section (strict 20-minute limit)',
          'Confusing False and Not Given (False = opposite, NG = not mentioned)',
          'Changing passage words in completion questions (copy exactly)',
          'Answering from general knowledge instead of the passage',
        ],
        relatedLessons: ['ielts-writing-task1', 'linking-words-lesson'],
      },
    ],
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # CATEGORY 3: COMMUNICATION SKILLS
  // # ═══════════════════════════════════════════════════════════════════
  {
    id: 'communication-skills',
    name: 'Communication Skills',
    description: 'Beyond grammar — learn to link ideas, choose the right register, and express yourself with precision.',
    icon: '💬',
    lessons: [

      // # ─── Linking Words & Discourse Markers ───
      {
        id: 'linking-words-lesson',
        title: 'Linking Words & Discourse Markers',
        description: 'Connect your ideas smoothly using conjunctions, transitions, and discourse markers for cohesive writing and speech.',
        skill: 'writing',
        level: 'B2',
        duration: 16,
        objectives: [
          'Use linking words for addition, contrast, cause, and result',
          'Place discourse markers correctly in sentences',
          'Improve essay coherence and spoken fluency',
          'Avoid overusing "and," "but," and "so"',
        ],
        sections: [
          {
            title: 'Why Linking Words Matter',
            type: 'text',
            content: 'Linking words are the glue that holds your ideas together. Without them, your writing feels choppy and your speech sounds disconnected. With them, one idea flows naturally into the next. In IELTS, "Coherence and Cohesion" is 25% of your writing score — and linking words are a major part of that. But be careful: using too many linking words, or using them incorrectly, is just as bad as not using them at all.',
          },
          {
            title: 'Addition: Adding Ideas',
            type: 'rule',
            content: 'Simple: and, also, as well as, too. Academic: furthermore, moreover, in addition, besides this. Examples: "She speaks French. Moreover, she has a degree in Translation." "In addition to his teaching role, he runs the department." Warning: "Moreover" and "furthermore" are formal — do not use them in casual conversation.',
          },
          {
            title: 'Contrast: Showing Differences',
            type: 'rule',
            content: 'Simple: but, yet, while, whereas. Concession: however, nevertheless, nonetheless, although, even though, despite, in spite of. Examples: "The economy grew; however, unemployment also rose." "Despite the rain, the event was well attended." "Although she was tired, she kept working." Key difference: "Although" starts a clause (although + subject + verb). "Despite" starts a noun phrase (despite + noun/gerund): "Despite being tired, she kept working."',
          },
          {
            title: 'Cause and Result',
            type: 'rule',
            content: 'Cause/reason: because, since, as, due to, owing to, because of. Result/consequence: therefore, consequently, as a result, thus, hence. Purpose: in order to, so that, so as to. Examples: "Due to heavy rain, the match was cancelled." "The population has grown rapidly. Consequently, housing has become scarce." "She studied hard in order to pass the exam."',
          },
          {
            title: 'Sequencing and Examples',
            type: 'rule',
            content: 'Sequencing: firstly, secondly, next, then, finally, to begin with, subsequently. Examples: for example, for instance, such as, namely, to illustrate. Summary: in conclusion, to sum up, in summary, overall, on the whole. Examples: "Firstly, the government should invest in education. Secondly, healthcare needs reform." "Several factors contributed — for instance, rising costs and lower demand."',
          },
          {
            title: 'Common Mistakes with Linking Words',
            type: 'tip',
            content: 'Do NOT start every sentence with a linking word — it sounds mechanical. Use them where they genuinely connect ideas. Wrong pattern: "Firstly, I agree. Secondly, education is important. Moreover, it creates jobs. Furthermore, it reduces crime. In conclusion, I agree." This reads like a checklist, not an essay. Good writing uses linking words naturally within and between sentences, not as a formula pasted at the start of every sentence.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the best linking word.',
            question: '"_____ the company offered a high salary, many employees still left due to poor management."',
            answer: 'Although / Even though / Despite the fact that',
            answerExplanation: 'The sentence shows contrast between a positive (high salary) and a negative outcome (employees left). "Although" or "Even though" introduce the surprising contrast. "Despite" would need a noun: "Despite the high salary, many employees still left."',
          },
        ],
        keyTakeaways: [
          'Linking words connect ideas and improve coherence',
          'Addition: moreover, furthermore, in addition',
          'Contrast: however, nevertheless, although, despite',
          'Cause/result: due to, consequently, therefore',
          'Use naturally — do not paste them at the start of every sentence',
          '"Although" + clause vs "Despite" + noun/gerund',
        ],
        commonMistakes: [
          '"Despite she was tired" → "Despite being tired" or "Although she was tired" (despite + noun/gerund)',
          'Overusing "Moreover" in every paragraph (vary your connectors)',
          '"Firstly... Secondly... Thirdly... Fourthly..." (too mechanical)',
          '"Because of she studied hard" → "Because she studied hard" (because of + noun, because + clause)',
        ],
        relatedLessons: ['ielts-writing-task2', 'formal-register-lesson'],
      },

      // # ─── Formal vs Informal Register ───
      {
        id: 'formal-register-lesson',
        title: 'Formal vs Informal: Choosing the Right Register',
        description: 'Know when to write "I want to" vs "I would like to" — essential for academic, professional, and social English.',
        skill: 'vocabulary',
        level: 'B2',
        duration: 14,
        objectives: [
          'Identify formal, neutral, and informal registers',
          'Choose appropriate vocabulary for different contexts',
          'Transform informal sentences into formal/academic style',
          'Avoid mixing registers within a single piece of writing',
        ],
        sections: [
          {
            title: 'What is Register?',
            type: 'text',
            content: 'Register means the level of formality in your language. You naturally do this in your first language — you speak differently to your boss, your friends, and a police officer. English has three main registers: FORMAL (academic papers, business letters, legal documents), NEUTRAL (news articles, presentations, general communication), INFORMAL (texts to friends, social media, casual conversation). The key skill is MATCHING your register to the situation.',
          },
          {
            title: 'Formal vs Informal Vocabulary',
            type: 'rule',
            content: 'Common swaps: Informal → Formal. get → obtain/acquire. give → provide/supply. ask for → request. help → assist/facilitate. start → commence/initiate. end → conclude/terminate. buy → purchase. big → significant/substantial. good → beneficial/advantageous. bad → detrimental/adverse. find out → discover/ascertain. think about → consider/contemplate. get rid of → eliminate/remove. look into → investigate/examine. go up → increase/rise. go down → decrease/decline.',
          },
          {
            title: 'Structural Differences',
            type: 'example',
            examples: [
              'Informal: "Lots of people think social media is bad for kids." → Formal: "A significant proportion of the population believes that social media has a detrimental impact on young people."',
              'Informal: "You shouldn\'t do this because it\'s dangerous." → Formal: "This practice should be avoided due to the associated risks."',
            ],
            analysis: 'Formal English avoids contractions (shouldn\'t → should not), uses passive voice (you shouldn\'t → should be avoided), replaces phrasal verbs with single words (find out → discover), and avoids personal pronouns (you → one, or use passive).',
          },
          {
            title: 'When to Use Each Register',
            type: 'tip',
            content: 'FORMAL: IELTS essays, academic papers, business emails to clients, job applications, legal documents. NEUTRAL: presentations, emails to colleagues, news articles, general correspondence. INFORMAL: texts, social media, emails to friends, casual conversation. For IELTS Writing: use FORMAL or NEUTRAL register. Never use slang, contractions, or text abbreviations. For IELTS Speaking: use NEUTRAL — not too formal (sounds robotic) and not too informal (sounds unprofessional).',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Rewrite this informal sentence in formal register.',
            question: '"Kids these days spend way too much time on their phones and it\'s messing up their sleep."',
            answer: '"Young people today devote an excessive amount of time to mobile devices, which has an adverse effect on their sleep patterns."',
            answerExplanation: '"Kids" → "Young people." "Way too much" → "An excessive amount." "Messing up" → "Has an adverse effect on." "Phones" → "Mobile devices." "Their sleep" → "Their sleep patterns." No contractions. More precise vocabulary.',
          },
        ],
        keyTakeaways: [
          'Register = level of formality — match it to the situation',
          'Formal English: no contractions, no phrasal verbs, no slang',
          'Replace informal vocabulary with formal synonyms',
          'IELTS Writing = formal/neutral; IELTS Speaking = neutral',
          'Do not mix registers within the same piece of writing',
        ],
        commonMistakes: [
          'Using contractions in formal essays (don\'t → do not)',
          'Using "kids" instead of "children" in academic writing',
          'Mixing "gonna" or "wanna" with formal vocabulary',
          'Being too formal in speaking (sounds unnatural and robotic)',
        ],
        relatedLessons: ['linking-words-lesson', 'ielts-writing-task2'],
      },

      // # ─── Relative Clauses ───
      {
        id: 'relative-clauses-lesson',
        title: 'Relative Clauses: Who, Which, That, Where, Whose',
        description: 'Combine sentences and add detail naturally using defining and non-defining relative clauses.',
        skill: 'grammar',
        level: 'B1',
        duration: 15,
        objectives: [
          'Understand the difference between defining and non-defining clauses',
          'Choose the correct relative pronoun (who, which, that, where, whose)',
          'Use commas correctly with non-defining clauses',
          'Combine short sentences into complex, natural English',
        ],
        sections: [
          {
            title: 'What Are Relative Clauses?',
            type: 'text',
            content: 'A relative clause is a part of a sentence that gives extra information about a noun. Instead of writing two separate sentences — "I have a friend. She lives in Paris." — you combine them: "I have a friend who lives in Paris." The relative clause "who lives in Paris" tells us WHICH friend you mean. This is how fluent speakers build longer, more natural sentences.',
          },
          {
            title: 'Relative Pronouns',
            type: 'rule',
            content: 'Who = people: "The woman who called you is my sister." Which = things/animals: "The book which I bought is excellent." That = people or things (informal, defining only): "The car that I drive is old." Where = places: "The restaurant where we met is closing." When = times: "The day when we graduated was unforgettable." Whose = possession: "The student whose essay won the prize is in my class."',
          },
          {
            title: 'Defining vs Non-Defining Clauses',
            type: 'tip',
            content: 'DEFINING: tells you WHICH one — essential information. Remove it and the sentence loses its meaning. No commas. "The man who stole the car was arrested." (Which man? The one who stole the car.) NON-DEFINING: adds EXTRA information — nice to know but not essential. Remove it and the sentence still makes sense. Uses commas. "My brother, who lives in Tokyo, is visiting next week." (You only have one brother — "who lives in Tokyo" is bonus information, not identification.) Key rule: "that" can ONLY be used in defining clauses. Never: "My brother, that lives in Tokyo,..."',
          },
          {
            title: 'Defining vs Non-Defining Examples',
            type: 'example',
            examples: [
              'Defining: "Students who study regularly tend to get better grades." (which students? The ones who study regularly)',
              'Non-defining: "My neighbour, who is 85 years old, still goes jogging every morning." (extra information about a specific person)',
            ],
            analysis: 'Remove the defining clause: "Students tend to get better grades" — this changes the meaning (which students?). Remove the non-defining clause: "My neighbour still goes jogging every morning" — the sentence still works perfectly.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Combine these two sentences using a relative pronoun.',
            question: '"I met a woman. She has climbed Mount Everest."',
            answer: 'I met a woman who has climbed Mount Everest.',
            answerExplanation: '"Who" replaces "she" (a person) and combines the sentences. This is a defining clause — it tells us which woman — so no commas are needed.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Add commas if needed.',
            question: '"London which is the capital of England has a population of about 9 million."',
            answer: 'London, which is the capital of England, has a population of about 9 million.',
            answerExplanation: 'There is only one London — "which is the capital of England" is extra information (non-defining), so it needs commas. You cannot use "that" here.',
          },
        ],
        keyTakeaways: [
          'Who = people, which = things, that = both (defining only)',
          'Where = places, when = times, whose = possession',
          'Defining clauses: no commas, tell us WHICH one',
          'Non-defining clauses: commas, add EXTRA info',
          '"That" is NEVER used in non-defining clauses',
          'Relative clauses help you build longer, more natural sentences',
        ],
        commonMistakes: [
          '"The man which called" → "The man who/that called" (people = who/that)',
          '"My sister, that lives in Paris," → "My sister, who lives in Paris," (non-defining = who, not that)',
          'Missing commas in non-defining: "Paris which is in France" → "Paris, which is in France,"',
          '"The book who I read" → "The book which/that I read" (books = which/that)',
        ],
        relatedLessons: ['passive-voice-lesson', 'linking-words-lesson'],
      },
    ],
  },
]
