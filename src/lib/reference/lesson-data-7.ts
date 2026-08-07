// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 7: B2 Upper-Intermediate Expansion (17 new lessons)
// # ═══════════════════════════════════════════════════════════════════════════
// # Adds to the existing 8 B2 lessons to reach 25 total.
// # Topics: 3rd/mixed conditionals, wish/if only, causative, future perfect,
// # advanced passive, participle clauses, hedging, paraphrasing, etc.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_7: LessonCategory[] = [
  {
    id: 'b2-upper-intermediate',
    name: 'B2: Upper-Intermediate Expansion',
    description: 'Refine your English — conditionals, academic style, complex structures, and exam-ready writing.',
    icon: '📙',
    lessons: [

      // # ─── 1. Third Conditional ───
      {
        id: 'b2-third-conditional',
        title: 'Third Conditional: Past Regrets',
        description: 'Talk about imaginary past events — "If I had studied harder, I would have passed."',
        skill: 'grammar', level: 'B2', duration: 12,
        objectives: ['Form: If + past perfect, would have + past participle', 'Express regrets about the past', 'Distinguish from 1st and 2nd conditionals'],
        sections: [
          { title: 'Structure', type: 'rule', content: 'If + past perfect, would have + past participle: "If I had known, I would have helped." "If she had studied, she would have passed." "If they hadn\'t missed the bus, they would have arrived on time." Contractions: "If I\'d known, I\'d have helped." "If she\'d studied, she\'d have passed." The 3rd conditional is ALWAYS about the past — things that DID NOT happen.' },
          { title: 'Key Point: Unreal Past', type: 'tip', content: 'The 3rd conditional imagines a DIFFERENT past — the opposite of what really happened: Reality: I didn\'t study. I failed. 3rd conditional: "If I had studied, I would have passed." (= but I didn\'t study, so I failed) Reality: She took the job. She\'s unhappy. 3rd conditional: "If she hadn\'t taken the job, she would have been happier." Every 3rd conditional sentence implies the OPPOSITE really happened.' },
          { title: 'The Three Conditionals Compared', type: 'rule', content: '1st (real future): "If it rains, I\'ll stay home." (it might rain) 2nd (unreal present/future): "If I had money, I would buy a car." (I don\'t have money) 3rd (unreal past): "If I had had money, I would have bought a car." (I didn\'t have money back then) The further back the tense shifts, the more unreal the situation.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Complete the 3rd conditional.', question: '"If we _____ (leave) earlier, we _____ (not miss) the flight."', answer: 'had left ... would not have missed (wouldn\'t have missed)', answerExplanation: 'If-clause: past perfect (had left). Result: would have + past participle (would have missed). Reality: they left late and missed the flight.' },
        ],
        keyTakeaways: ['If + past perfect, would have + past participle', 'Always about the past — imagining a different outcome', 'Implies the opposite actually happened', '"If I\'d known" = "If I had known" (common contraction)'],
        commonMistakes: ['"If I would have known" → "If I had known" (no would in if-clause)', '"If I had knew" → "If I had known" (past participle, not past simple)'],
        relatedLessons: ['b2-mixed-conditionals', 'b2-wish-if-only'],
      },

      // # ─── 2. Mixed Conditionals ───
      {
        id: 'b2-mixed-conditionals',
        title: 'Mixed Conditionals',
        description: 'Combine past and present — "If I had studied medicine, I would be a doctor now."',
        skill: 'grammar', level: 'B2', duration: 12,
        objectives: ['Mix 2nd and 3rd conditional forms', 'Express how past actions affect the present', 'Express how present states affect the past'],
        sections: [
          { title: 'Type 1: Past Action → Present Result', type: 'rule', content: 'If + past perfect, would + base verb (present result): "If I had studied medicine, I would be a doctor now." (past decision → present situation) "If she had accepted the job, she would be living in New York." "If they hadn\'t moved, they would still live here." Formula: 3rd conditional IF-clause + 2nd conditional RESULT.' },
          { title: 'Type 2: Present State → Past Result', type: 'rule', content: 'If + past simple, would have + past participle (past result): "If I were taller, I would have played basketball." (present state → imaginary past) "If she spoke French, she would have got the job." "If he weren\'t so lazy, he would have finished by now." Formula: 2nd conditional IF-clause + 3rd conditional RESULT.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Complete the mixed conditional.', question: '"If I _____ (not break) my leg last month, I _____ (play) in the match today."', answer: 'hadn\'t broken ... would be playing', answerExplanation: 'Past event (broke leg) → present consequence (can\'t play today). If-clause: past perfect. Result: would + be + -ing (present result).' },
        ],
        keyTakeaways: ['Past → Present: If + past perfect, would + base verb', 'Present → Past: If + past simple, would have + past participle', 'Mix the tenses to connect past and present', 'Both halves must point to different times'],
        commonMistakes: ['Using the same time in both halves (that\'s regular 2nd or 3rd, not mixed)'],
        relatedLessons: ['b2-third-conditional', 'b2-wish-if-only'],
      },

      // # ─── 3. Wish / If Only ───
      {
        id: 'b2-wish-if-only',
        title: 'Wish & If Only: Regrets and Desires',
        description: 'Express what you want to be different — "I wish I spoke French," "If only I hadn\'t said that."',
        skill: 'grammar', level: 'B2', duration: 12,
        objectives: ['Use wish + past simple for present wishes', 'Use wish + past perfect for past regrets', 'Use wish + would for complaints about others'],
        sections: [
          { title: 'Wish About the Present', type: 'rule', content: 'Wish + past simple = wanting the present to be different: "I wish I spoke French." (= but I don\'t speak French) "She wishes she had more time." (= but she doesn\'t) "I wish I were taller." (= but I\'m not — "were" preferred) "If only I had a car!" (= if only = stronger wish)' },
          { title: 'Wish About the Past', type: 'rule', content: 'Wish + past perfect = regretting something in the past: "I wish I had studied harder." (= but I didn\'t — regret) "She wishes she hadn\'t said that." (= but she did — regret) "If only we had bought that house!" (= we didn\'t buy it — big regret) This is like the 3rd conditional without the "if...would have" structure.' },
          { title: 'Wish + Would', type: 'rule', content: 'Wish + someone/something + would = complaint or desire for change: "I wish it would stop raining." (= I\'m annoyed it keeps raining) "She wishes he would listen." (= he never listens — complaint) "I wish you wouldn\'t do that." (= please stop doing that) NOTE: You CANNOT say "I wish I would..." — wish + would is for OTHER people/things.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct form.', question: '"I wish I _____ (can) play the piano." / "I wish I _____ (not eat) so much last night."', answer: 'could ... hadn\'t eaten', answerExplanation: 'Present wish: wish + past (can → could). Past regret: wish + past perfect (hadn\'t eaten).' },
        ],
        keyTakeaways: ['Present wish: wish + past simple ("I wish I knew")', 'Past regret: wish + past perfect ("I wish I had known")', 'Complaint: wish + would ("I wish it would stop")', 'If only = stronger version of wish'],
        commonMistakes: ['"I wish I can fly" → "I wish I could fly" (past form)', '"I wish I would be taller" → "I wish I were taller" (wish + would = others only)'],
        relatedLessons: ['b2-third-conditional', 'b2-mixed-conditionals'],
      },

      // # ─── 4. Causative: Have/Get Something Done ───
      {
        id: 'b2-causative',
        title: 'Causative: Have/Get Something Done',
        description: 'Talk about services done by others — "I had my car repaired," "She got her hair cut."',
        skill: 'grammar', level: 'B2', duration: 10,
        objectives: ['Form have/get + object + past participle', 'Distinguish from doing something yourself', 'Use in different tenses'],
        sections: [
          { title: 'The Structure', type: 'rule', content: 'Have + object + past participle: "I had my car repaired." (= someone repaired it for me) "She has her hair cut every month." "We\'re having the house painted." Get + object + past participle (informal): "I got my car repaired." "She got her hair done." Both mean: someone else does the action FOR you. You arrange it, but you don\'t do it yourself.' },
          { title: 'Active vs Causative', type: 'tip', content: 'Compare: "I repaired my car." (= I did it myself) "I had my car repaired." (= I paid/asked someone to do it) "She cut her hair." (= she did it herself — unusual) "She had/got her hair cut." (= at a salon — normal) Context usually makes it clear, but the causative structure specifically tells the listener that someone else did the work.' },
          { title: 'Different Tenses', type: 'rule', content: 'Present simple: "I have my car serviced every year." Present continuous: "I\'m having my kitchen renovated." Past simple: "She had her nails done yesterday." Present perfect: "We\'ve had the roof repaired." Future: "I\'m going to have my eyes tested." / "I\'ll get it fixed."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite using the causative.', question: '"A professional cleaned our carpets last week."', answer: '"We had our carpets cleaned last week."', answerExplanation: 'Subject (we) + had + object (our carpets) + past participle (cleaned). Someone else did the cleaning.' },
        ],
        keyTakeaways: ['Have/get + object + past participle = someone does it for you', '"I had my car repaired" = I didn\'t repair it — someone else did', 'Have = slightly more formal. Get = informal.', 'Works in all tenses: am having, had, have had, will have'],
        commonMistakes: ['"I had repaired my car" (= past perfect, I did it) vs "I had my car repaired" (causative)'],
        relatedLessons: ['b1-passive-voice', 'b2-advanced-passive'],
      },

      // # ─── 5. Future Perfect & Future Continuous ───
      {
        id: 'b2-future-perfect-continuous',
        title: 'Future Perfect & Future Continuous',
        description: 'Talk about what will be happening and what will be finished by a certain time.',
        skill: 'grammar', level: 'B2', duration: 12,
        objectives: ['Form will have + past participle (future perfect)', 'Form will be + verb-ing (future continuous)', 'Use time markers: by, by the time, this time next week'],
        sections: [
          { title: 'Future Perfect: Completed Before a Future Point', type: 'rule', content: 'Will have + past participle: "By next June, I will have finished my degree." "She\'ll have left by the time you arrive." "By 2030, scientists will have found a cure." Use it when an action will be COMPLETED BEFORE a specific future moment. Key time markers: by (Monday, next year, 2030, then), by the time + present simple.' },
          { title: 'Future Continuous: In Progress at a Future Moment', type: 'rule', content: 'Will be + verb-ing: "This time tomorrow, I\'ll be flying to Tokyo." "At 8 tonight, she\'ll be watching the match." "Next week, they\'ll be living in their new house." Use it for an action that will be IN PROGRESS at a specific future moment. Key markers: this time tomorrow/next week, at (time) tonight/tomorrow.' },
          { title: 'The Difference', type: 'tip', content: 'Future perfect = COMPLETED by then: "By 10 o\'clock, I\'ll have finished." (done, complete) Future continuous = IN PROGRESS at that moment: "At 10 o\'clock, I\'ll be working." (still doing it) Compare: "By the time you arrive, I\'ll have cooked dinner." (dinner = ready) "When you arrive, I\'ll be cooking dinner." (still in the kitchen)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose future perfect or future continuous.', question: '"This time next week, I _____ (lie) on a beach." / "By Friday, I _____ (submit) all my assignments."', answer: 'will be lying ... will have submitted', answerExplanation: 'Lying on a beach = in progress at that moment → future continuous. Submitting = completed before Friday → future perfect.' },
        ],
        keyTakeaways: ['Future perfect: will have + p.p. (completed before a point)', 'Future continuous: will be + -ing (in progress at a point)', 'By + time = future perfect. At/this time + time = future continuous.', '"By 10, I\'ll have finished" vs "At 10, I\'ll be working"'],
        commonMistakes: ['"By next year I will finish" → "By next year I will have finished"', '"This time tomorrow I will fly" → "I\'ll be flying" (in progress)'],
        relatedLessons: ['a2-future-will', 'a2-future-going-to'],
      },

      // # ─── 6. Advanced Passive ───
      {
        id: 'b2-advanced-passive',
        title: 'Advanced Passive: Get Passive and Double Object',
        description: 'Expand your passive skills — "He got fired," "She was given a prize."',
        skill: 'grammar', level: 'B2', duration: 10,
        objectives: ['Use get + past participle for informal passive', 'Handle double-object passives', 'Use passive with reporting verbs'],
        sections: [
          { title: 'Get Passive', type: 'rule', content: '"Get" replaces "be" in informal/spoken passives: "He got fired." (= was fired) "She got promoted." "They got married." "I got stuck in traffic." Often used for: unexpected/unplanned events, negative situations, changes of state. "My phone got stolen." "The window got broken."' },
          { title: 'Double-Object Passive', type: 'rule', content: 'Some verbs have two objects. Either can become the passive subject: Active: "They gave her a prize." Passive 1: "She was given a prize." (person as subject — more common) Passive 2: "A prize was given to her." (thing as subject — less common) Other verbs: offer, send, tell, show, teach, pay: "I was offered the job." "She was told the news."' },
          { title: 'Passive with Reporting Verbs', type: 'rule', content: 'It + is/was + reported/believed/said/thought/known + that: "It is believed that the company will close." "It was reported that three people were injured." Subject + is/was + said/believed/known + to: "The company is said to be in trouble." "She is known to be very generous." "He was believed to have left the country."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite in two passive forms.', question: 'Active: "People say that he is a genius."', answer: '"It is said that he is a genius." / "He is said to be a genius."', answerExplanation: 'Two patterns for reporting verb passives: It + is said + that clause. OR Subject + is said + to + infinitive.' },
        ],
        keyTakeaways: ['Get passive = informal (got fired, got stolen)', 'Double object: either object can be subject (She was given a prize)', 'Reporting: "It is said that..." / "He is said to be..."', 'Get passive often for unexpected/negative events'],
        commonMistakes: ['"It is said that he is genius" → "...he is a genius" (article needed)', '"He is said that he is rich" → "He is said to be rich" (subject pattern = to + infinitive)'],
        relatedLessons: ['b1-passive-voice', 'b2-causative'],
      },

      // # ─── 7. Participle Clauses ───
      {
        id: 'b2-participle-clauses',
        title: 'Participle Clauses: -ing and -ed',
        description: 'Write more elegantly — "Having finished the report, she went home" instead of two short sentences.',
        skill: 'grammar', level: 'B2', duration: 10,
        objectives: ['Use present participle (-ing) clauses for simultaneous/reason', 'Use past participle (-ed) clauses for passive meaning', 'Use perfect participle (having done) for completed prior actions'],
        sections: [
          { title: 'Present Participle Clauses (-ing)', type: 'rule', content: 'Replace a subject + verb with just the -ing form: Simultaneous actions: "Walking home, I saw an accident." (= While I was walking...) Reason: "Being tired, she went to bed early." (= Because she was tired...) Result: "The storm hit the coast, causing widespread damage." (= ...and it caused...)' },
          { title: 'Past Participle Clauses (-ed)', type: 'rule', content: 'Used for passive meaning: "Written in 1960, the novel is still popular." (= The novel, which was written in 1960,...) "Shocked by the news, he sat down." (= Because he was shocked...) "Built in the 18th century, the bridge is a historic landmark."' },
          { title: 'Perfect Participle (Having + Past Participle)', type: 'rule', content: 'For an action completed BEFORE the main action: "Having finished the report, she went home." (= After she had finished...) "Having lived in Japan for 10 years, he speaks fluent Japanese." "Not having eaten all day, I was starving." (negative)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite using a participle clause.', question: '"Because she had lost her passport, she couldn\'t travel."', answer: '"Having lost her passport, she couldn\'t travel."', answerExplanation: 'Completed prior action + passive reason → perfect participle: "Having lost" replaces "Because she had lost."' },
        ],
        keyTakeaways: ['-ing clause: simultaneous or reason (Walking home, I saw...)', '-ed clause: passive meaning (Built in 1960, the bridge...)', 'Having + p.p.: completed action before (Having finished, she left)', 'Makes writing more concise and sophisticated'],
        commonMistakes: ['"Walking home, the rain started" → "Walking home, I got caught in the rain" (the subject of both clauses must be the same)'],
        relatedLessons: ['b1-narrative-tenses', 'b2-advanced-passive'],
      },

      // # ─── 8. Non-defining Relative Clauses ───
      {
        id: 'b2-non-defining-relative',
        title: 'Non-defining Relative Clauses',
        description: 'Add extra information with commas — "My sister, who lives in London, is a doctor."',
        skill: 'grammar', level: 'B2', duration: 10,
        objectives: ['Distinguish defining from non-defining clauses', 'Use commas correctly', 'Use which to refer to a whole clause'],
        sections: [
          { title: 'Defining vs Non-defining', type: 'rule', content: 'Defining (essential — no commas): "The woman who called you is my boss." (which woman? this tells us) Non-defining (extra info — WITH commas): "My boss, who is 45, has worked here for 20 years." (we already know who — extra info) Remove a defining clause → the sentence is unclear. Remove a non-defining clause → the core meaning stays.' },
          { title: 'Rules for Non-defining', type: 'rule', content: 'Always use commas: "Paris, which is the capital of France, attracts millions of tourists." CANNOT use "that": "My car, which is red, is parked outside." (NOT "that is red") Can use "which" for the whole previous clause: "He passed the exam, which surprised everyone." (= the fact that he passed — the whole idea)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Add commas and choose who, which, or where.', question: '"My brother _____ works in New York _____ is coming to visit next month."', answer: '"My brother, who works in New York, is coming to visit next month."', answerExplanation: 'I have one brother — the clause is extra information → non-defining → commas + who (person). Cannot use "that."' },
        ],
        keyTakeaways: ['Non-defining = extra info, always with commas', 'Cannot use "that" — only who/which/where/whose', 'Which can refer to a whole clause: "He won, which surprised me"', 'Remove it and the sentence still makes sense'],
        commonMistakes: ['"My sister, that lives in London" → "My sister, who lives in London" (no "that" in non-defining)'],
        relatedLessons: ['a2-relative-clauses-basic', 'b2-participle-clauses'],
      },

      // # ─── 9. Emphasis: Cleft Sentences ───
      {
        id: 'b2-cleft-sentences',
        title: 'Emphasis: Cleft Sentences (It is...that)',
        description: 'Emphasise specific information — "It was John who broke the window," "What I need is a holiday."',
        skill: 'grammar', level: 'B2', duration: 10,
        objectives: ['Form It is/was...that/who for emphasis', 'Form What...is/was for emphasis', 'Use cleft sentences to highlight information'],
        sections: [
          { title: 'It Clefts', type: 'rule', content: 'It + is/was + focused element + that/who: "John broke the window." → Person emphasis: "It was John who broke the window." (not someone else) Time emphasis: "It was yesterday that he broke it." (not another day) Thing emphasis: "It was the window that he broke." (not the door) Use to correct wrong information or stress a particular detail.' },
          { title: 'What Clefts', type: 'rule', content: 'What + subject + verb + is/was + focused element: "I need a holiday." → "What I need is a holiday." "She likes his honesty." → "What she likes is his honesty." Other patterns: "The thing that annoys me is..." "All I want is..." "What happened was..." These put the emphasized item at the END of the sentence for dramatic effect.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite for emphasis.', question: 'Emphasise "the noise" in: "The noise kept me awake."', answer: '"It was the noise that kept me awake." OR "What kept me awake was the noise."', answerExplanation: 'It-cleft: It was + focused item + that. What-cleft: What + rest + was + focused item.' },
        ],
        keyTakeaways: ['It is/was X that/who... (emphasise X)', 'What X is/was... (put emphasis at the end)', '"All I want is..." "The thing I like is..." — everyday clefts', 'Useful for contrast: "It wasn\'t me who broke it — it was Tom"'],
        relatedLessons: ['b2-participle-clauses', 'b2-non-defining-relative'],
      },

      // # ─── 10. Hedging: Academic Caution ───
      {
        id: 'b2-hedging',
        title: 'Hedging: Expressing Caution in Academic Writing',
        description: 'Write carefully and avoid being too certain — a key skill for essays and research.',
        skill: 'writing', level: 'B2', duration: 10,
        objectives: ['Use hedging language to soften claims', 'Know when hedging is appropriate', 'Apply in essays and academic writing'],
        sections: [
          { title: 'What Is Hedging?', type: 'text', content: 'Hedging means showing that you are not 100% certain. In academic and professional writing, strong claims without evidence sound arrogant: Too strong: "Social media causes depression." Hedged: "Social media may contribute to depression." Hedging shows you understand that issues are complex and that claims need evidence.' },
          { title: 'Hedging Tools', type: 'rule', content: 'Modal verbs: may, might, could, can: "This could explain the decline." Adverbs: perhaps, possibly, probably, apparently, seemingly: "This is possibly the main cause." Verbs: seem, appear, tend, suggest, indicate: "The data suggests that..." "It appears that..." Adjectives/phrases: likely, unlikely, probable, a degree of, to some extent: "It is likely that..." "To some extent, this is true."' },
          { title: 'Too Strong vs Appropriately Hedged', type: 'example', examples: ['Too strong: "Technology destroys jobs." → Hedged: "Technology may lead to a reduction in certain types of employment."', 'Too strong: "Everyone agrees that..." → Hedged: "It is widely believed that..."', 'Too strong: "This proves that..." → Hedged: "This suggests that..." / "This provides evidence that..."'], analysis: 'Hedging does not make your writing weak — it makes it more precise and credible. The strongest academic writing uses hedging appropriately.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Hedge this sentence appropriately.', question: '"Video games cause violence in teenagers."', answer: '"Video games may contribute to aggressive behaviour in some teenagers."', answerExplanation: 'Added: may (possibility), contribute to (less direct than cause), aggressive behaviour (more precise), some (not all).' },
        ],
        keyTakeaways: ['Hedging = showing appropriate uncertainty', 'May/might/could, seems/appears/suggests, possibly/probably', '"Proves" → "suggests." "Causes" → "may contribute to."', 'Essential for essays, reports, and academic writing'],
        relatedLessons: ['b2-text-organisation', 'b2-paraphrasing'],
      },

      // # ─── 11. Complex Prepositions ───
      {
        id: 'b2-complex-prepositions',
        title: 'Complex Prepositions: Despite, In Spite Of, Regardless Of',
        description: 'Express contrast and concession with more sophisticated prepositions.',
        skill: 'grammar', level: 'B2', duration: 8,
        objectives: ['Use despite / in spite of + noun/-ing', 'Distinguish from although + clause', 'Use regardless of, in addition to, instead of, apart from'],
        sections: [
          { title: 'Despite / In Spite Of', type: 'rule', content: 'Despite + noun/-ing (NOT a clause): "Despite the rain, we went out." "In spite of being tired, she kept working." "Despite having no experience, he got the job." NOT: "Despite it was raining" → WRONG. Compare with although + clause: "Although it was raining, we went out." ✓ "Despite it was raining, we went out." ✗ "Despite the rain / Despite it raining, we went out." ✓' },
          { title: 'Other Complex Prepositions', type: 'rule', content: 'In addition to + noun/-ing: "In addition to English, she speaks French." Instead of + noun/-ing: "Instead of driving, why not take the train?" Apart from + noun/-ing: "Apart from the price, the hotel was excellent." Regardless of + noun/-ing: "I\'ll go regardless of the weather." Due to / Owing to + noun: "The delay was due to bad weather." As a result of + noun: "As a result of the accident, the road was closed."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite using "despite."', question: '"Although she was ill, she went to work."', answer: '"Despite being ill, she went to work." OR "Despite her illness, she went to work."', answerExplanation: 'Despite + -ing or despite + noun. Cannot use despite + clause.' },
        ],
        keyTakeaways: ['Despite/in spite of + noun/-ing (never a clause)', 'Although + clause — different structure, same meaning', 'Regardless of = no matter what', 'In addition to, instead of, apart from + noun/-ing'],
        commonMistakes: ['"Despite she was tired" → "Despite being tired" (no clause after despite)', '"In spite of he left" → "In spite of his leaving" or "Although he left"'],
        relatedLessons: ['a2-connectors', 'b2-hedging'],
      },

      // # ─── 12. Noun Clauses ───
      {
        id: 'b2-noun-clauses',
        title: 'Noun Clauses: What Matters Is...',
        description: 'Use whole clauses as subjects or objects — "What matters is how you respond."',
        skill: 'grammar', level: 'B2', duration: 10,
        objectives: ['Use what/that/whether clauses as subjects', 'Use noun clauses as objects of verbs', 'Use the pattern in academic writing'],
        sections: [
          { title: 'What/How/Whether as Subject', type: 'rule', content: '"What" introduces a clause that acts as the subject: "What you said was very helpful." = "The thing (that) you said..." "How you treat people matters." = "The way you treat people..." "Whether he comes doesn\'t matter." = "The question of his coming..." "Whatever happens, I\'ll support you." "Whoever broke this must pay for it."' },
          { title: 'That Clauses as Objects', type: 'rule', content: 'Many verbs take a "that" clause: "I believe (that) she is right." "He mentioned (that) he was leaving." "We agreed (that) the plan was good." "That" can often be omitted in informal speech: "I think she\'s coming." (= I think that she\'s coming.)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Complete with a noun clause.', question: '"_____ you choose to study is your decision." (what / which)', answer: 'What', answerExplanation: '"What you choose to study" = the thing you choose. This whole clause is the subject of the sentence.' },
        ],
        keyTakeaways: ['What/how/whether + clause can be the SUBJECT: "What matters is..."', 'That + clause can be the OBJECT: "I believe that..."', 'Whatever/whoever/whenever = "it doesn\'t matter what/who/when"', 'Common in formal and academic writing'],
        relatedLessons: ['b2-cleft-sentences', 'b2-hedging'],
      },

      // # ─── 13. Writing Introductions & Conclusions ───
      {
        id: 'b2-introductions-conclusions',
        title: 'Writing an Introduction & Conclusion',
        description: 'Start and finish essays with impact — the most important paragraphs of any essay.',
        skill: 'writing', level: 'B2', duration: 12,
        objectives: ['Write a hook, background, and thesis statement', 'Write a conclusion that summarises and gives a final comment', 'Avoid common introduction/conclusion mistakes'],
        sections: [
          { title: 'Introduction Structure', type: 'rule', content: 'A good introduction has 3 parts: 1. HOOK: An interesting opening that grabs attention — a question, statistic, or surprising fact. "Did you know that 40% of food produced globally is wasted?" 2. BACKGROUND: 1-2 sentences of context. "Food waste is a growing problem that affects the environment, economy, and society." 3. THESIS STATEMENT: Your main argument or what the essay will discuss. "This essay will argue that government policy is the most effective solution to reducing food waste."' },
          { title: 'Conclusion Structure', type: 'rule', content: 'A good conclusion has 3 parts: 1. SUMMARY: Briefly restate your main points (do NOT copy-paste from the body). "In conclusion, food waste can be reduced through government regulation, education, and business innovation." 2. FINAL COMMENT: A broader implication, prediction, or call to action. "Unless urgent action is taken, food waste will continue to contribute to climate change." 3. NO new arguments: The conclusion is for wrapping up, not introducing new ideas.' },
          { title: 'What NOT to Do', type: 'tip', content: 'Introduction mistakes: Starting with "In this essay I will..." (too mechanical — hook first). Giving your opinion in the introduction of a discussion essay. Being too general: "Since the beginning of time, people have..." Conclusion mistakes: Introducing brand new arguments. Simply repeating the introduction. Starting with "In conclusion" then adding nothing new. Being wishy-washy: "It depends on the situation" (give a clear position).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write a thesis statement for this topic.', question: 'Topic: "Should university education be free?"', answer: 'Example: "This essay will argue that while free university education promotes equality, governments should focus on improving quality and accessibility rather than eliminating tuition fees entirely."', answerExplanation: 'A good thesis states your position clearly and hints at the structure of your argument.' },
        ],
        keyTakeaways: ['Introduction: Hook → Background → Thesis', 'Conclusion: Summary → Final comment (no new ideas)', 'Never start with "Since the beginning of time..."', 'The thesis statement is the most important sentence in the essay'],
        relatedLessons: ['b2-hedging', 'b2-paraphrasing'],
      },

      // # ─── 14. Paraphrasing & Summarising ───
      {
        id: 'b2-paraphrasing',
        title: 'Paraphrasing & Summarising',
        description: 'Say the same thing in different words — essential for exams and academic writing.',
        skill: 'writing', level: 'B2', duration: 12,
        objectives: ['Paraphrase sentences using synonyms and restructuring', 'Summarise paragraphs into key points', 'Avoid plagiarism through effective paraphrasing'],
        sections: [
          { title: 'Paraphrasing Techniques', type: 'rule', content: '1. Use synonyms: "important" → "significant/crucial/essential." 2. Change word forms: "discover" (verb) → "discovery" (noun). 3. Change voice: active → passive or vice versa. 4. Change sentence structure: split long sentences, combine short ones. 5. Change word order: "Because X, Y happened" → "Y happened due to X." Example: Original: "Technology has dramatically changed the way people communicate." Paraphrased: "The way in which people communicate has been significantly transformed by advances in technology."' },
          { title: 'Summarising', type: 'rule', content: 'Summarising = reducing to essential points (not word-by-word paraphrase): 1. Read the full text. 2. Identify the main idea and 2-3 key points. 3. Write them in your own words. 4. Use reporting language: "The author argues that..." "According to the text,..." "The main finding is that..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Paraphrase this sentence.', question: '"Many young people are choosing to live in cities because of better job opportunities."', answer: 'Example: "An increasing number of young adults are migrating to urban areas, attracted by greater employment prospects."', answerExplanation: 'Changed: many→increasing number, young people→young adults, choosing to live→migrating, cities→urban areas, better job opportunities→greater employment prospects, because of→attracted by.' },
        ],
        keyTakeaways: ['Synonyms + structure change = good paraphrasing', 'Change word forms: verb→noun, adjective→adverb', 'Summarising = main idea + key points only', 'Never just swap one or two words — change the whole structure'],
        relatedLessons: ['b2-hedging', 'b2-introductions-conclusions'],
      },

      // # ─── 15. Text Organisation ───
      {
        id: 'b2-text-organisation',
        title: 'Text Organisation & Paragraph Structure',
        description: 'Structure your writing clearly — topic sentences, supporting details, and logical flow.',
        skill: 'writing', level: 'B2', duration: 10,
        objectives: ['Write clear topic sentences', 'Develop paragraphs with evidence and examples', 'Link paragraphs with transitions'],
        sections: [
          { title: 'Paragraph Structure', type: 'rule', content: 'Each paragraph should have: 1. TOPIC SENTENCE: States the main idea (usually first sentence). "One significant advantage of remote work is increased flexibility." 2. SUPPORTING DETAILS: Evidence, examples, data. "Employees can choose their working hours, which allows them to balance family responsibilities." 3. CONCLUDING/LINKING SENTENCE: Wraps up or connects to the next paragraph. "This flexibility has been shown to improve both productivity and job satisfaction."' },
          { title: 'Paragraph Transitions', type: 'rule', content: 'Link paragraphs with transition words/phrases: Addition: Furthermore, Moreover, In addition, What is more. Contrast: However, On the other hand, Nevertheless, In contrast. Consequence: As a result, Therefore, Consequently, Thus. Example: For example, For instance, such as, namely. Sequence: Firstly, Secondly, Finally, To begin with. Concession: Admittedly, While it is true that...' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write a topic sentence for this paragraph content.', question: 'Supporting details: "Cycling is free, produces no emissions, and improves cardiovascular health. Many cities now have dedicated bike lanes."', answer: 'Example: "Cycling is one of the most practical and sustainable forms of urban transport."', answerExplanation: 'The topic sentence introduces the main idea. The supporting details then provide evidence (cost, environment, health, infrastructure).' },
        ],
        keyTakeaways: ['Every paragraph: topic sentence → support → link', 'Topic sentence = paragraph\'s main idea (usually first)', 'Use transitions between paragraphs for flow', 'One main idea per paragraph — don\'t mix topics'],
        relatedLessons: ['b2-introductions-conclusions', 'b2-paraphrasing'],
      },

      // # ─── 16. Expressing Contrast & Concession ───
      {
        id: 'b2-contrast-concession',
        title: 'Expressing Contrast & Concession',
        description: 'Master the full range of contrast language — however, although, in spite of, whereas, while.',
        skill: 'grammar', level: 'B2', duration: 10,
        objectives: ['Use the full range of contrast connectors', 'Distinguish concession (although) from contrast (whereas)', 'Apply in essay writing'],
        sections: [
          { title: 'Concession: Unexpected Contrast', type: 'rule', content: 'Concession = "this is true, but the opposite is also/still true": Although/Even though + clause: "Although it was expensive, we bought it." Despite/In spite of + noun/-ing: "Despite the cost, we bought it." However + new sentence: "It was expensive. However, we bought it." Nevertheless/Nonetheless (formal): "The evidence is limited. Nevertheless, it suggests..."' },
          { title: 'Direct Contrast: Two Different Things', type: 'rule', content: 'Whereas / While + clause: "She loves cooking, whereas/while he prefers eating out." In contrast / On the other hand + new sentence: "Japan has a low birth rate. In contrast, Nigeria has a very high one." Unlike + noun: "Unlike her sister, she is very quiet." Compared to/with: "Compared to last year, sales have improved."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Join these using an appropriate connector.', question: '"The study had a small sample. The findings are still significant."', answer: '"Although the study had a small sample, the findings are still significant." OR "Despite the small sample, the findings are still significant."', answerExplanation: 'Concession: the small sample should weaken the findings, but they are still significant — unexpected contrast.' },
        ],
        keyTakeaways: ['Concession (unexpected): although, despite, however, nevertheless', 'Direct contrast (two things): whereas, while, in contrast, unlike', 'Although + clause. Despite + noun/-ing.', 'However = new sentence. Although = same sentence.'],
        relatedLessons: ['a2-connectors', 'b2-complex-prepositions'],
      },

      // # ─── 17. Expressing Certainty & Deduction ───
      {
        id: 'b2-modals-deduction',
        title: 'Modals of Deduction: Must, Can\'t, Might Have',
        description: 'Make logical guesses about the present and past — "She must have forgotten," "He can\'t have known."',
        skill: 'grammar', level: 'B2', duration: 12,
        objectives: ['Use must/can\'t/might for present deductions', 'Use must have/can\'t have/might have for past deductions', 'Apply in conversation and writing'],
        sections: [
          { title: 'Present Deduction', type: 'rule', content: 'Must + base verb (almost certain — true): "She must be at home — her car is here." Can\'t + base verb (almost certain — not true): "He can\'t be 60 — he looks so young!" May/might/could + base verb (possible): "She might be asleep." "He could be stuck in traffic."' },
          { title: 'Past Deduction', type: 'rule', content: 'Must have + past participle (almost certain): "She must have forgotten about the meeting." "They must have left already." Can\'t have + past participle (almost certain — not true): "He can\'t have stolen it — he was with me all day." "She can\'t have known about the surprise." May/might/could have + past participle (possible): "She might have missed the train." "He could have got lost."' },
          { title: 'Must Have vs Had To', type: 'tip', content: '"Must have" = logical deduction about the past: "She must have studied hard." (= I think she did — evidence suggests it) "Had to" = past obligation: "She had to study hard." (= it was necessary — she was forced to) Compare: "He must have left early." (deduction — I think so) "He had to leave early." (obligation — he had no choice)' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct modal.', question: '"There\'s no food in the fridge. Someone _____ (eat) everything!" / "But it _____ (be) the dog — the fridge door was closed."', answer: 'must have eaten ... can\'t have been', answerExplanation: 'Must have eaten = logical deduction (evidence: no food). Can\'t have been = impossible (dogs can\'t open fridges).' },
        ],
        keyTakeaways: ['Present: must be / can\'t be / might be', 'Past: must have done / can\'t have done / might have done', 'Must have ≠ had to (deduction vs obligation)', 'Can\'t have = logically impossible'],
        commonMistakes: ['"She must forgot" → "She must have forgotten" (must have + past participle for past)', '"He must has left" → "He must have left"'],
        relatedLessons: ['b1-expressing-possibility', 'b2-third-conditional'],
      },
    ],
  },
]
