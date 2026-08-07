// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 8: C1 Advanced Lessons (24 new — 25 total with Inversion)
// # ═══════════════════════════════════════════════════════════════════════════
// # Adds to the existing 1 C1 lesson (Inversion, in lesson-data-2.ts).
// # Topics: advanced modals, cleft sentences, ellipsis, nominalisation,
// # advanced conditionals, discourse markers, subjunctive, hedging, etc.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_8: LessonCategory[] = [
  {
    id: 'c1-advanced',
    name: 'C1: Advanced',
    description: 'Master sophisticated structures — academic writing, nuance, and near-native precision.',
    icon: '🎓',
    lessons: [

      // # ─── 1. Advanced Modals ───
      {
        id: 'c1-advanced-modals',
        title: 'Advanced Modals: Must Have, Can\'t Have, Should Have',
        description: 'Express certainty, regret, and criticism about the past with modal perfects.',
        skill: 'grammar', level: 'C1', duration: 12,
        objectives: ['Use must/can\'t/may have for past deduction', 'Use should/shouldn\'t have for regret and criticism', 'Use could/would have for unrealised possibilities'],
        sections: [
          { title: 'Past Deduction (Review + Extension)', type: 'rule', content: 'Must have + p.p. = almost certain (positive): "She must have been delayed — she\'s never late." Can\'t/couldn\'t have + p.p. = almost certain (negative): "He couldn\'t have done it — he was abroad." May/might/could have + p.p. = possible: "They might have taken a different route." Continuous: must/can\'t have been + -ing: "She must have been sleeping when I called."' },
          { title: 'Regret and Criticism', type: 'rule', content: 'Should have + p.p. = regret (I/we) or criticism (you/he): "I should have studied harder." (= I regret not studying) "You shouldn\'t have said that." (= criticism — it was wrong to say it) "We should have left earlier." (= mistake — we left too late) Needn\'t have + p.p. = unnecessary (but it was done): "You needn\'t have bought flowers — but thank you." (= it wasn\'t necessary, but you did it anyway)' },
          { title: 'Unrealised Possibilities', type: 'rule', content: 'Could have + p.p. = ability/opportunity not used: "I could have helped, but nobody asked me." "She could have been a doctor." (= she had the ability, but chose differently) Would have + p.p. = willingness not realised (often in conditionals): "I would have come, but I was ill." Contrast: should have = moral/logical regret. Could have = missed opportunity. Would have = conditional willingness.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct modal perfect.', question: '"She _____ (should/take) the job — it was a great opportunity. But she _____ (can\'t/know) how good it was at the time."', answer: 'should have taken ... can\'t have known', answerExplanation: 'Should have taken = regret (missed opportunity). Can\'t have known = logical deduction (impossible to know).' },
        ],
        keyTakeaways: ['Must/can\'t have + p.p. = deduction about the past', 'Should/shouldn\'t have = regret or criticism', 'Could have = missed opportunity. Would have = conditional.', 'Needn\'t have = did it but it wasn\'t necessary'],
        commonMistakes: ['"I should have study" → "I should have studied" (past participle)', '"She must have been know" → "She must have known"'],
        relatedLessons: ['b2-modals-deduction', 'b2-third-conditional'],
      },

      // # ─── 2. Cleft Sentences Advanced ───
      {
        id: 'c1-cleft-advanced',
        title: 'Advanced Cleft Sentences',
        description: 'Go beyond basic clefts — all-clefts, reverse clefts, and sophisticated emphasis.',
        skill: 'grammar', level: 'C1', duration: 10,
        objectives: ['Use all/the thing/the reason clefts', 'Use reverse clefts for dramatic emphasis', 'Apply in academic and professional writing'],
        sections: [
          { title: 'Extended Cleft Patterns', type: 'rule', content: 'All I want/need/ask is...: "All I need is five more minutes." The thing that/which: "The thing that worries me is the deadline." The reason (why/that): "The reason I\'m calling is to confirm the meeting." The person who: "The person who should apologise is him." The place where: "The place where I feel happiest is by the sea." It\'s not X that..., it\'s Y: "It\'s not the salary that matters — it\'s the culture."' },
          { title: 'Reverse Clefts', type: 'tip', content: 'Move the focused element to the start for dramatic emphasis: Standard: "What amazed me was his confidence." Reversed: "His confidence was what amazed me." Standard: "What I need is more time." Reversed: "More time is what I need." Reverse clefts put the emphasis first — useful in speech for emotional impact.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Create a cleft sentence.', question: 'Emphasise "the lack of communication" in: "The lack of communication caused the project to fail."', answer: '"It was the lack of communication that caused the project to fail." OR "What caused the project to fail was the lack of communication."', answerExplanation: 'It-cleft or what-cleft — both valid. The what-cleft creates suspense by delaying the answer.' },
        ],
        keyTakeaways: ['All/the thing/the reason + relative clause + is...', 'Reverse clefts for dramatic emphasis', '"It\'s not X, it\'s Y" for contrast', 'Common in both academic writing and persuasive speech'],
        relatedLessons: ['b2-cleft-sentences', 'b2-non-defining-relative'],
      },

      // # ─── 3. Ellipsis & Substitution ───
      {
        id: 'c1-ellipsis',
        title: 'Ellipsis & Substitution',
        description: 'Leave out words without losing meaning — "I can if you want" instead of "I can come if you want me to come."',
        skill: 'grammar', level: 'C1', duration: 10,
        objectives: ['Remove repeated words through ellipsis', 'Use "so," "not," "do," "one" as substitutes', 'Apply in natural conversation'],
        sections: [
          { title: 'Ellipsis After Auxiliaries', type: 'rule', content: 'After modals and auxiliaries, you can drop the main verb: "Can you help me?" — "I can. (help you)" "Have you been to Japan?" — "No, I haven\'t. (been to Japan)" "She said she\'d come, but she didn\'t. (come)" "I don\'t like coffee, but my sister does. (like coffee)" "Will you be there?" — "I might. (be there)" This is extremely common in natural English conversation.' },
          { title: 'Substitution with So/Not', type: 'rule', content: '"So" replaces a whole clause (positive): "Is it going to rain?" — "I think so." (= I think it is going to rain) "Will she pass?" — "I hope so." / "I expect so." "Not" replaces a clause (negative): "Will they win?" — "I hope not." "I\'m afraid not." "I don\'t think so." (more natural than "I think not")' },
          { title: 'One/Ones as Substitutes', type: 'rule', content: '"One" replaces a singular countable noun: "Which car do you like?" — "The red one." "I need a pen. Do you have one?" "Ones" for plural: "Which shoes?" — "The black ones." NOT used with uncountable nouns: "Which coffee?" — "The strong coffee." (not "the strong one")' },
          { title: 'Test Yourself', type: 'exercise', content: 'Shorten this response using ellipsis.', question: '"Are you going to the party?" — "Yes, I think I am going to go to the party."', answer: '"Yes, I think so." OR "Yes, I think I am."', answerExplanation: '"I think so" = substitution with "so." "I think I am" = ellipsis after the auxiliary.' },
        ],
        keyTakeaways: ['Drop repeated verbs after auxiliaries: "Yes, I can."', '"I think so/I hope so/I\'m afraid not" = whole clause', '"One/ones" replace countable nouns: "the red one"', 'Makes speech natural and avoids clumsy repetition'],
        relatedLessons: ['c1-cleft-advanced', 'c1-fronting'],
      },

      // # ─── 4. Nominalisation ───
      {
        id: 'c1-nominalisation',
        title: 'Nominalisation: Turning Verbs into Nouns',
        description: 'Make your writing more formal and academic — "investigate" → "investigation."',
        skill: 'writing', level: 'C1', duration: 10,
        objectives: ['Convert verbs and adjectives to noun forms', 'Use nominalisation to make writing more formal', 'Know when NOT to nominalise (clarity vs formality)'],
        sections: [
          { title: 'What Is Nominalisation?', type: 'text', content: 'Nominalisation means using a noun form instead of a verb. It makes writing more formal, concise, and academic. Informal (verb-based): "The researchers discovered that pollution increased." Formal (nominalised): "The researchers\' discovery was that there was an increase in pollution." The meaning is the same, but the style shifts from conversational to academic.' },
          { title: 'Common Patterns', type: 'rule', content: 'Verb → Noun: decide → decision, discover → discovery, develop → development, investigate → investigation, analyse → analysis, fail → failure, improve → improvement, reduce → reduction, respond → response, apply → application. Adjective → Noun: important → importance, significant → significance, able → ability, available → availability, different → difference, relevant → relevance.' },
          { title: 'Examples', type: 'example', examples: ['Verbal: "They decided to expand the team." → Nominal: "The decision to expand the team was made."', 'Verbal: "The population grew rapidly." → Nominal: "There was rapid growth in the population."', 'Verbal: "She failed to complete the project." → Nominal: "Her failure to complete the project..."'], analysis: 'Nominalisation shifts the action from the verb into a noun, making the sentence feel more detached and objective — ideal for reports, research, and formal documents.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Nominalise this sentence.', question: '"The government reduced taxes, which improved the economy."', answer: '"The government\'s reduction of taxes led to an improvement in the economy."', answerExplanation: 'reduced → reduction. improved → improvement. Verbs become nouns; the sentence becomes more formal.' },
        ],
        keyTakeaways: ['Convert verbs/adjectives to nouns for formality', 'Common: decide→decision, improve→improvement, reduce→reduction', 'Makes writing more academic and objective', 'Don\'t overdo it — too much nominalisation becomes hard to read'],
        relatedLessons: ['b2-hedging', 'c1-discourse-markers'],
      },

      // # ─── 5. Advanced Conditionals ───
      {
        id: 'c1-advanced-conditionals',
        title: 'Advanced Conditionals: Were to, Should, Had I Known',
        description: 'Formal and literary conditional forms — "Were I to resign," "Should you need help."',
        skill: 'grammar', level: 'C1', duration: 12,
        objectives: ['Use formal inverted conditionals without "if"', 'Use "Were to" for formal hypotheticals', 'Use "Should" for formal future possibilities'],
        sections: [
          { title: 'Inverted Conditionals (No "If")', type: 'rule', content: 'Drop "if" and invert the subject/auxiliary: 2nd: "If I were you..." → "Were I you,..." "If he were to resign..." → "Were he to resign,..." 3rd: "If I had known..." → "Had I known,..." "If she had been there..." → "Had she been there,..." 1st (formal): "If you should need help..." → "Should you need help,..." This is VERY formal — used in academic writing, business, and literature.' },
          { title: 'Were To + Infinitive', type: 'rule', content: '"Were + subject + to" = formal hypothetical (more distant than past simple): "If the government were to raise taxes, there would be protests." "Were the company to close, 500 people would lose their jobs." "If this situation were to continue, the consequences would be severe." This signals a more remote, unlikely, or serious hypothetical than the standard 2nd conditional.' },
          { title: 'Should for Future Possibility (Formal)', type: 'rule', content: '"Should + subject" at the start = "If by any chance...": "Should you require further information, please contact us." "Should the weather improve, we will proceed." "Should there be any problems, call this number." Very common in business emails and formal letters. Less hypothetical than "were to" — just formal politeness.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite without "if" using inversion.', question: '"If I had known about the delay, I would have taken a different route."', answer: '"Had I known about the delay, I would have taken a different route."', answerExplanation: 'Drop "If." Move "Had" before the subject. The rest stays the same.' },
        ],
        keyTakeaways: ['Had I known = If I had known (3rd conditional inversion)', 'Were he to resign = If he were to resign (formal 2nd)', 'Should you need = If you should need (formal 1st)', 'All three: very formal — academic, business, literary'],
        commonMistakes: ['"Would I have known" → "Had I known" (not would in the if-clause)', '"Should you would need" → "Should you need" (base verb after should)'],
        relatedLessons: ['b2-third-conditional', 'b2-mixed-conditionals'],
      },

      // # ─── 6. Discourse Markers for Academic Writing ───
      {
        id: 'c1-discourse-markers',
        title: 'Discourse Markers for Academic Writing',
        description: 'Connect ideas like a scholar — master the linking phrases that make academic writing flow.',
        skill: 'writing', level: 'C1', duration: 12,
        objectives: ['Use discourse markers for addition, contrast, cause, result, example', 'Choose the right level of formality', 'Avoid overusing basic connectors (and, but, so)'],
        sections: [
          { title: 'Addition', type: 'rule', content: 'Furthermore / Moreover / In addition / What is more (formal): "Furthermore, the study found that..." "Moreover, there is evidence to suggest..." Additionally / Also (neutral): "Additionally, participants reported..." Besides / On top of that (informal — avoid in essays).' },
          { title: 'Contrast & Concession', type: 'rule', content: 'However / Nevertheless / Nonetheless (strong contrast): "However, the results were inconclusive." Conversely / On the contrary (opposite viewpoint): "Conversely, the control group showed no change." On the other hand / By contrast / In contrast (comparing): "By contrast, rural areas saw a decline." Granted / Admittedly (conceding a point): "Admittedly, the sample was small."' },
          { title: 'Cause & Result', type: 'rule', content: 'Consequently / As a result / As a consequence / Therefore / Thus / Hence: "Consequently, the project was delayed." "The data was insufficient; therefore, no conclusions could be drawn." This means that / It follows that (more explanatory): "It follows that further research is needed." Owing to / Due to / On account of (cause + noun): "Owing to budget constraints, the trial was cancelled."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Replace the informal connector with an academic one.', question: '"The experiment worked, but the results were surprising, so we did it again."', answer: '"The experiment yielded results; however, these were unexpected. Consequently, the experiment was replicated."', answerExplanation: 'but → however (contrast). so → consequently (result). Active → passive for academic tone.' },
        ],
        keyTakeaways: ['Addition: furthermore, moreover, in addition', 'Contrast: however, nevertheless, conversely', 'Result: consequently, therefore, thus, hence', 'Cause: owing to, due to, on account of'],
        relatedLessons: ['b2-text-organisation', 'c1-nominalisation'],
      },

      // # ─── 7. Advanced Passive: It is believed that... ───
      {
        id: 'c1-impersonal-passive',
        title: 'Impersonal Passive: It Is Believed That...',
        description: 'Report opinions and facts without naming the source — essential for academic objectivity.',
        skill: 'grammar', level: 'C1', duration: 10,
        objectives: ['Use It + passive reporting verb + that clause', 'Use Subject + passive reporting verb + to infinitive', 'Apply in academic and news writing'],
        sections: [
          { title: 'Two Patterns', type: 'rule', content: 'Pattern 1 — It + is/was + reported/believed/said + that: "It is believed that the earth is 4.5 billion years old." "It was reported that three people were injured." "It is widely known that exercise improves mental health." Pattern 2 — Subject + is/was + said/believed/known + to: "The earth is believed to be 4.5 billion years old." "He is said to be very wealthy." "She is known to speak five languages." These patterns avoid naming the source — objectivity.' },
          { title: 'Common Reporting Verbs', type: 'rule', content: 'believe, think, say, report, know, consider, expect, estimate, allege, claim, assume, understand, suppose: "It is estimated that 50% of marriages end in divorce." "The suspect is alleged to have fled the country." "The company is expected to announce layoffs." "It is generally understood that..." "It is widely thought that..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite using both impersonal passive patterns.', question: '"People think that he is the best candidate."', answer: '"It is thought that he is the best candidate." / "He is thought to be the best candidate."', answerExplanation: 'Pattern 1: It + is thought + that clause. Pattern 2: Subject + is thought + to be.' },
        ],
        keyTakeaways: ['It is + believed/said/known + that clause', 'Subject + is + believed/said + to + infinitive', 'Very common in academic writing and news', 'Avoids "People say..." — more objective and formal'],
        relatedLessons: ['b2-advanced-passive', 'c1-nominalisation'],
      },

      // # ─── 8. Subjunctive ───
      {
        id: 'c1-subjunctive',
        title: 'The Subjunctive: I Suggest That He Go',
        description: 'A rare but important grammar form — "It is essential that she be present."',
        skill: 'grammar', level: 'C1', duration: 8,
        objectives: ['Use the subjunctive after suggest/recommend/insist/demand', 'Use it in "It is important/essential that..." structures', 'Know when subjunctive is used vs "should"'],
        sections: [
          { title: 'What Is the Subjunctive?', type: 'rule', content: 'The subjunctive uses the BASE VERB for all subjects — no -s, no past tense: "I suggest that he go." (NOT "goes") "They recommend that she be promoted." (NOT "is") "It is essential that everyone attend." (NOT "attends") Negative: "I suggest that he not go." (NOT "doesn\'t go") The subjunctive is more common in American English. British English often uses "should" instead: "I suggest that he should go."' },
          { title: 'When to Use It', type: 'rule', content: 'After verbs of suggestion/command: suggest, recommend, propose, insist, demand, request, require, ask (formal). "The doctor recommended that he take a week off." "We demand that the company pay compensation." After adjectives of importance: It is important/essential/vital/necessary/crucial/imperative + that: "It is imperative that the report be submitted on time." "It is crucial that he understand the risks."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Correct the sentence.', question: '"The committee recommended that the plan is approved immediately."', answer: '"The committee recommended that the plan be approved immediately."', answerExplanation: 'After "recommended that" → subjunctive: "be" (not "is"). OR British: "should be approved."' },
        ],
        keyTakeaways: ['Subjunctive = base verb for all subjects (no -s)', 'After suggest/recommend/insist/demand + that', 'After It is essential/important/vital + that', 'British alternative: should + base verb'],
        commonMistakes: ['"I suggest that he goes" → "I suggest that he go" (or "should go")', '"It is important that she is here" → "that she be here"'],
        relatedLessons: ['c1-impersonal-passive', 'c1-advanced-conditionals'],
      },

      // # ─── 9. Complex Noun Phrases ───
      {
        id: 'c1-complex-noun-phrases',
        title: 'Complex Noun Phrases',
        description: 'Pack more information into fewer words — "the recently published government report on climate change."',
        skill: 'writing', level: 'C1', duration: 10,
        objectives: ['Build noun phrases with pre- and post-modifiers', 'Use noun phrases for concise academic writing', 'Unpack complex noun phrases for comprehension'],
        sections: [
          { title: 'Pre-Modifiers', type: 'rule', content: 'Words that come BEFORE the head noun: Determiner + adjectives + noun modifiers + HEAD NOUN: "the recently published quarterly financial report" the = determiner, recently published = adjective, quarterly = adjective, financial = noun modifier, report = head noun. Pre-modifiers compress information: "a government-funded research project" instead of "a research project that is funded by the government."' },
          { title: 'Post-Modifiers', type: 'rule', content: 'Words that come AFTER the head noun: Prepositional phrases: "the impact of technology on education." Relative clauses: "the report that was published yesterday." Participle clauses: "students studying abroad" / "measures taken by the government." Infinitive phrases: "the decision to close the factory." "The recently published government report on the impact of social media on teenage mental health" — one dense noun phrase replacing multiple sentences.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Compress into a noun phrase.', question: '"The government recently published a report. The report is about climate change."', answer: '"the recently published government report on climate change"', answerExplanation: 'Combined: recently published (pre-modifier), government (noun modifier), on climate change (post-modifier).' },
        ],
        keyTakeaways: ['Pre-modifiers: adjectives and noun modifiers before the head', 'Post-modifiers: prepositional phrases, relative/participle clauses after', 'Compress multiple sentences into one dense phrase', 'Very common in academic and news writing'],
        relatedLessons: ['c1-nominalisation', 'b2-participle-clauses'],
      },

      // # ─── 10. Hedging & Boosting in Academic Writing ───
      {
        id: 'c1-hedging-boosting',
        title: 'Hedging & Boosting in Academic Writing',
        description: 'Control the strength of your claims — from cautious to confident.',
        skill: 'writing', level: 'C1', duration: 10,
        objectives: ['Use the full hedging toolkit', 'Use boosters for strong claims with evidence', 'Balance hedging and boosting in essays'],
        sections: [
          { title: 'Advanced Hedging', type: 'rule', content: 'Tentative verbs: appear, seem, tend, suggest, indicate, imply. Tentative adjectives: possible, probable, likely, apparent. Tentative adverbs: perhaps, arguably, conceivably, to some extent. Distancing: "It could be argued that..." "One possible explanation is..." "The evidence appears to suggest..." "There is some evidence to support the view that..." "This is not necessarily the case."' },
          { title: 'Boosting for Strong Claims', type: 'rule', content: 'When evidence is strong, boosting shows confidence: Verbs: demonstrate, establish, prove, confirm, show clearly. Adverbs: clearly, undoubtedly, significantly, considerably. Phrases: "The evidence clearly demonstrates..." "It is well established that..." "There is overwhelming evidence that..." "This finding conclusively shows..." Use boosters ONLY when your evidence justifies it.' },
          { title: 'Balancing', type: 'tip', content: 'Good academic writing uses BOTH: "While some studies suggest a link between X and Y (hedge), recent large-scale research has conclusively demonstrated that Z (boost)." "The results appear to indicate (hedge) a trend, though further research is clearly needed (boost the need)." Over-hedging sounds uncertain. Over-boosting sounds arrogant. Balance is key.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Hedge this strong claim appropriately.', question: '"Social media definitely causes anxiety in all teenagers."', answer: '"Social media may contribute to increased anxiety among some teenagers, according to several recent studies."', answerExplanation: 'Hedged: may (possibility), contribute to (less direct), some (not all), according to (attribution).' },
        ],
        keyTakeaways: ['Hedge: appear, suggest, tend, perhaps, to some extent', 'Boost: clearly, demonstrate, establish, undoubtedly', 'Hedge when evidence is uncertain. Boost when evidence is strong.', 'Balance = credible academic voice'],
        relatedLessons: ['b2-hedging', 'c1-discourse-markers'],
      },

      // # ─── 11. Fronting & Focusing ───
      {
        id: 'c1-fronting',
        title: 'Fronting & Focusing',
        description: 'Move elements to the front of the sentence for emphasis — "Never have I seen such beauty."',
        skill: 'grammar', level: 'C1', duration: 10,
        objectives: ['Front adverbs and adverb phrases', 'Front objects and complements', 'Know when fronting requires subject-verb inversion'],
        sections: [
          { title: 'Negative Adverb Fronting (with Inversion)', type: 'rule', content: 'When a negative adverb/phrase moves to the front, the subject and auxiliary INVERT: Never + auxiliary + subject: "Never have I seen such a thing." Rarely/Seldom: "Rarely does she complain." Not only...but also: "Not only did he win, but he also set a record." Only after/when/if: "Only after the rain stopped did we go outside." Under no circumstances: "Under no circumstances should you open that door." Little: "Little did he know what was coming."' },
          { title: 'Non-Negative Fronting (No Inversion)', type: 'rule', content: 'Fronting objects/complements for emphasis (no inversion): "This I cannot accept." (normal: "I cannot accept this.") "Strange as it may seem, he was right." "Much as I appreciate your help, I must decline." "Hard though she tried, she couldn\'t reach the shelf." These draw attention to the fronted element.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rewrite with fronting.', question: '"She has never been so angry."', answer: '"Never has she been so angry."', answerExplanation: 'Negative adverb "never" moves to front → inversion: "has she" instead of "she has."' },
        ],
        keyTakeaways: ['Negative adverb at front → inversion: "Never have I..."', 'Non-negative fronting: no inversion: "This I cannot accept"', 'Creates dramatic emphasis and formal tone', 'Very common in literary and academic English'],
        relatedLessons: ['c1-cleft-advanced', 'c1-ellipsis'],
      },

      // # ─── 12. Advanced Relative Clauses ───
      {
        id: 'c1-advanced-relative',
        title: 'Advanced Relative Clauses',
        description: 'Relative clauses with prepositions, quantifiers, and "which" for whole clauses.',
        skill: 'grammar', level: 'C1', duration: 10,
        objectives: ['Use preposition + which/whom in formal relatives', 'Use of which/whom for quantifier relatives', 'Use which for whole-clause reference'],
        sections: [
          { title: 'Preposition + Which/Whom', type: 'rule', content: 'In formal English, prepositions go BEFORE the relative pronoun: Informal: "The company which she works for..." Formal: "The company for which she works..." Informal: "The man who I was talking to..." Formal: "The man to whom I was speaking..." "In which" = where: "The building in which the meeting took place..."' },
          { title: 'Quantifier + Of Which/Whom', type: 'rule', content: 'Add a quantifier before "of which/whom": "She has three children, two of whom are doctors." "He wrote 10 novels, several of which became bestsellers." "There were 100 applicants, none of whom were qualified." Other patterns: some, many, most, all, each, both, neither, the youngest, the majority: "The team has 15 members, the majority of whom are volunteers."' },
          { title: 'Which for Whole Clauses', type: 'tip', content: '"Which" can refer to an entire previous clause (not just a noun): "He arrived late, which annoyed everyone." (= the fact that he arrived late) "She passed the exam first time, which surprised no one." "The government raised taxes, which led to public protests." Always non-defining (with comma) when "which" refers to a whole clause.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Combine using a relative clause.', question: '"She invited 50 guests. Only 20 of them came."', answer: '"She invited 50 guests, only 20 of whom came."', answerExplanation: 'Quantifier (20) + of whom (people) in a non-defining relative clause.' },
        ],
        keyTakeaways: ['Formal: preposition + which/whom (for which, to whom)', 'Quantifier + of which/whom: "many of whom," "some of which"', 'Which for whole clause: "He lied, which was wrong"', 'All with commas when non-defining'],
        relatedLessons: ['b2-non-defining-relative', 'a2-relative-clauses-basic'],
      },

      // # ─── 13. Advanced Reported Speech ───
      {
        id: 'c1-reported-speech-advanced',
        title: 'Reported Speech: Advanced Patterns',
        description: 'Go beyond "He said that..." — report advice, warnings, offers, and complex speech.',
        skill: 'grammar', level: 'C1', duration: 12,
        objectives: ['Use a wide range of reporting verbs', 'Report questions, commands, and complex statements', 'Handle time/place/pronoun shifts fluently'],
        sections: [
          { title: 'Reporting Verb Patterns', type: 'rule', content: 'Verb + that: admit, agree, claim, complain, deny, explain, insist, mention, promise, suggest. "She admitted that she had made a mistake." Verb + to infinitive: agree, offer, promise, refuse, threaten. "He offered to help." Verb + object + to infinitive: advise, encourage, invite, order, persuade, remind, warn. "She warned me not to go." Verb + -ing: admit, deny, suggest, recommend. "He denied stealing the money." "She suggested going to the park."' },
          { title: 'Reporting Questions & Commands', type: 'rule', content: 'Questions: use ask + if/whether (yes/no) or wh-word: "She asked if I was coming." "He asked where I lived." (statement word order — no inversion) Commands: use tell/order/ask + object + to infinitive: "She told me to sit down." "The teacher ordered them to be quiet." Negative: "She told me not to worry."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Report this speech using different verbs.', question: 'Direct: "I\'ll definitely be there." / "I didn\'t take the money!"', answer: '"He promised to be there." / "She denied taking the money."', answerExplanation: 'Promise + to infinitive. Deny + -ing. Each reporting verb has its own pattern.' },
        ],
        keyTakeaways: ['Different reporting verbs take different patterns (that/to/-ing)', 'Reported questions: ask + if/wh-word + statement order', 'Reported commands: tell/order + object + to infinitive', 'Choosing the right verb (promise, deny, warn) adds precision'],
        relatedLessons: ['b1-indirect-questions', 'c1-impersonal-passive'],
      },

      // # ─── 14. Coherence: Theme & Rheme ───
      {
        id: 'c1-coherence',
        title: 'Coherence: Theme & Rheme',
        description: 'Make your writing flow naturally — connect old information to new information.',
        skill: 'writing', level: 'C1', duration: 10,
        objectives: ['Understand theme (given) and rheme (new) in sentences', 'Use thematic progression for text flow', 'Improve paragraph coherence'],
        sections: [
          { title: 'What Is Theme and Rheme?', type: 'text', content: 'Every sentence has two parts: Theme (topic) = what you are talking about — usually known information, at the START. Rheme (comment) = what you say about it — usually NEW information, at the END. "The government (theme) has announced new environmental regulations (rheme)." "These regulations (theme) will take effect next year (rheme)." Good writing connects the rheme of one sentence to the theme of the next.' },
          { title: 'Thematic Progression', type: 'rule', content: 'Linear: Rheme of sentence 1 → Theme of sentence 2: "Scientists discovered a new species. The species was found in the Amazon." Constant: Same theme repeated: "The Prime Minister announced a policy. She also proposed a new budget. She will address Parliament tomorrow." Split: Rheme splits into multiple themes: "The study examined diet and exercise. Diet was found to be more important. Exercise, however, had significant benefits too."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Improve the flow of these sentences.', question: '"A new vaccine was developed. Thousands of people were helped by the vaccine. It received approval from the WHO."', answer: '"A new vaccine was developed. The vaccine helped thousands of people and received approval from the WHO."', answerExplanation: 'Connected "the vaccine" (rheme→theme) and combined related information to avoid choppy repetition.' },
        ],
        keyTakeaways: ['Theme (known/old) → Rheme (new) in each sentence', 'Good flow: rheme of one sentence becomes theme of the next', 'Three patterns: linear, constant, split', 'Passive voice can help by changing theme: "A cure was found" vs "Scientists found a cure"'],
        relatedLessons: ['b2-text-organisation', 'c1-nominalisation'],
      },

      // # ─── 15. Connotation & Register ───
      {
        id: 'c1-connotation-register',
        title: 'Connotation & Register',
        description: 'Choose words that carry the right emotional tone — "thin" vs "slim" vs "skinny" vs "scrawny."',
        skill: 'vocabulary', level: 'C1', duration: 10,
        objectives: ['Distinguish positive, negative, and neutral connotations', 'Choose appropriate register (formal/neutral/informal)', 'Avoid inappropriate word choices in context'],
        sections: [
          { title: 'Connotation', type: 'rule', content: 'Words with similar denotation (dictionary meaning) can have very different connotations (feelings): Positive: slim, slender, petite (complimentary). Neutral: thin. Negative: skinny, scrawny, bony (critical). More examples: determined (positive) vs stubborn (negative). thrifty (positive) vs cheap/stingy (negative). confident (positive) vs arrogant (negative). curious (positive) vs nosy (negative).' },
          { title: 'Register', type: 'rule', content: 'Formal: commence, reside, sufficient, endeavour, purchase, enquire. Neutral: start/begin, live, enough, try, buy, ask. Informal: kick off, crash at, loads of, give it a go, grab, hit up. Match register to context: Academic essay: "The experiment commenced at 09:00." Email to friend: "We kicked off the project yesterday." Business email: "We would like to enquire about..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Rank from most positive to most negative.', question: 'Describe someone who doesn\'t spend money: thrifty, cheap, economical, stingy, frugal.', answer: 'Most positive: thrifty → frugal → economical → cheap → stingy (most negative)', answerExplanation: 'Thrifty/frugal = positive (wise with money). Economical = neutral. Cheap = mildly negative. Stingy = strongly negative (mean).' },
        ],
        keyTakeaways: ['Same meaning, different feeling: slim (+), thin (0), skinny (−)', 'Match register to audience: formal/neutral/informal', 'Wrong connotation can change your whole message', 'Wrong register can sound too casual or too stiff'],
        relatedLessons: ['c1-nominalisation', 'c1-discourse-markers'],
      },

      // # ─── 16. Critical Reading ───
      {
        id: 'c1-critical-reading',
        title: 'Critical Reading: Evaluating Arguments',
        description: 'Read beyond the surface — identify bias, evaluate evidence, and spot logical fallacies.',
        skill: 'reading', level: 'C1', duration: 12,
        objectives: ['Identify the author\'s purpose and bias', 'Evaluate the strength of evidence', 'Spot common logical fallacies'],
        sections: [
          { title: 'Questions to Ask', type: 'rule', content: 'When reading critically, ask: PURPOSE: Why was this written? To inform, persuade, entertain, or sell? AUDIENCE: Who is it written for? BIAS: Does the author have a vested interest? Do they present all sides? EVIDENCE: Are claims supported by data, examples, or expert opinion? LANGUAGE: Are emotional or loaded words used to manipulate? LOGIC: Does the argument make sense? Are there gaps?' },
          { title: 'Common Logical Fallacies', type: 'rule', content: 'Hasty generalisation: "I met two rude French people, so all French people are rude." False cause: "Crime went up after the new park opened, so parks cause crime." Appeal to authority: "A celebrity says this product works, so it must." Straw man: "She says we should reduce sugar → She wants to ban all enjoyable food." Ad hominem: Attacking the person instead of the argument. False dichotomy: "Either we ban cars completely, or we accept pollution." (false — there are middle options).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Identify the logical fallacy.', question: '"My grandfather smoked every day and lived to 95. Therefore, smoking isn\'t harmful."', answer: 'Hasty generalisation / anecdotal evidence', answerExplanation: 'One example (grandfather) does not disprove decades of scientific research. This generalises from a single case.' },
        ],
        keyTakeaways: ['Ask: purpose, audience, bias, evidence, logic', 'Spot fallacies: hasty generalisation, false cause, straw man', 'Check: is evidence from reliable sources?', 'Critical reading ≠ negative — it means thoughtful and analytical'],
        relatedLessons: ['c1-hedging-boosting', 'c1-connotation-register'],
      },

      // # ─── 17. Writing Abstracts & Summaries ───
      {
        id: 'c1-writing-abstracts',
        title: 'Writing Abstracts & Summaries',
        description: 'Condense long texts into clear, concise summaries — a key academic skill.',
        skill: 'writing', level: 'C1', duration: 10,
        objectives: ['Write an academic abstract with standard components', 'Summarise a text to 20-25% of the original', 'Use reporting language effectively'],
        sections: [
          { title: 'Abstract Structure', type: 'rule', content: 'An abstract is a 150-300 word summary of a research paper with 4-5 elements: 1. BACKGROUND: "Recent research has shown that..." 2. AIM: "This study aimed to investigate..." 3. METHOD: "A survey of 500 participants was conducted..." 4. RESULTS: "The findings indicate that..." 5. CONCLUSION: "These results suggest that..." Use past tense for what was done, present tense for what the results mean.' },
          { title: 'Summarising Strategy', type: 'rule', content: 'Steps: 1. Read the whole text. 2. Identify the thesis/main argument. 3. Find 3-5 key supporting points. 4. Write in your own words — do NOT copy. 5. Use reporting language: "The author argues/suggests/contends..." 6. Keep to 20-25% of the original length. 7. Do NOT include your own opinions in a summary.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write a one-sentence summary.', question: 'Text: "The study examined 1,000 office workers over 5 years. Those who took regular breaks showed 23% higher productivity and 40% fewer sick days. The researchers concluded that mandatory break policies should be implemented in all workplaces."', answer: 'Example: "A five-year study of 1,000 office workers found that regular breaks significantly increased productivity and reduced sick days, leading researchers to recommend mandatory break policies."', answerExplanation: 'One sentence capturing: who, what, key findings, and conclusion. No added opinion.' },
        ],
        keyTakeaways: ['Abstract: Background → Aim → Method → Results → Conclusion', 'Summary: 20-25% of original, in your own words', 'Use reporting language: argues, suggests, contends', 'Never include your own opinions in a summary'],
        relatedLessons: ['b2-paraphrasing', 'c1-nominalisation'],
      },

      // # ─── 18. Lexical Bundles & Academic Formulae ───
      {
        id: 'c1-lexical-bundles',
        title: 'Lexical Bundles & Academic Formulae',
        description: 'The pre-made phrases that academic writers use automatically — learn them and your writing improves instantly.',
        skill: 'writing', level: 'C1', duration: 10,
        objectives: ['Learn 30+ academic formulaic expressions', 'Use them naturally in essays and reports', 'Recognise their function (stance, organisation, reference)'],
        sections: [
          { title: 'Research Bundles', type: 'rule', content: 'Introducing research: "Previous research has shown that..." "A growing body of evidence suggests..." "According to recent findings,..." "Smith (2020) argues/contends/maintains that..." Gaps in research: "Little attention has been paid to..." "Few studies have examined..." "There remains a need for further research into..."' },
          { title: 'Stance Bundles', type: 'rule', content: 'Expressing your position: "It can be argued that..." "It is worth noting that..." "It is important to consider..." "This raises the question of whether..." Evaluating: "A significant limitation of this approach is..." "This finding has important implications for..." "Taken together, these results suggest..."' },
          { title: 'Organisational Bundles', type: 'rule', content: 'Structuring text: "As mentioned above/previously,..." "As will be discussed below,..." "In the following section,..." "Turning now to the question of..." "With regard to / With respect to..." "In light of the above,..." "On the basis of these findings,..."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Complete with an academic bundle.', question: '"_____ , we can conclude that the policy has been effective. _____ , more research is needed to assess its long-term impact."', answer: '"On the basis of these findings / Taken together, we can conclude... Nevertheless / However, more research is needed..."', answerExplanation: 'Organisation bundle → conclusion. Contrast bundle → limitation.' },
        ],
        keyTakeaways: ['Academic writing uses formulaic phrases constantly', 'Research: "Previous research has shown..." "Few studies have..."', 'Stance: "It can be argued that..." "This raises the question..."', 'Learn 20-30 bundles and your academic writing transforms'],
        relatedLessons: ['c1-discourse-markers', 'c1-hedging-boosting'],
      },

      // # ─── 19. Hypothesising & Speculating ───
      {
        id: 'c1-hypothesising',
        title: 'Hypothesising & Speculating',
        description: 'Think out loud with sophistication — "Suppose we were to..." "Hypothetically speaking..."',
        skill: 'speaking', level: 'C1', duration: 10,
        objectives: ['Use a range of speculation language', 'Speculate about past, present, and future', 'Use in discussions, debates, and presentations'],
        sections: [
          { title: 'Speculation Phrases', type: 'rule', content: 'Present/Future speculation: "Suppose / Supposing we were to..." "What if the government decided to..." "Let\'s say / Imagine that..." "Hypothetically speaking, if..." "In theory, it would be possible to..." Past speculation: "What if they had chosen differently?" "Suppose she hadn\'t resigned..." "Just imagine if we had never met."' },
          { title: 'Hedged Speculation', type: 'rule', content: 'Softer, more tentative: "I would imagine that..." "I\'d hazard a guess that..." "It\'s conceivable that..." "There\'s a chance that..." "It\'s not inconceivable that..." "One could argue that..." "It remains to be seen whether..."' },
          { title: 'In Practice', type: 'example', examples: ['Suppose the company were to close — what would happen to the 500 employees?', 'Hypothetically, if we removed all speed limits, would roads be safer or more dangerous?', 'Just imagine if Einstein had never published his theory — how different would our world be?'], analysis: 'Speculation lets you explore ideas without committing to them. It shows intellectual flexibility — essential for debates, interviews, and academic discussions.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Speculate about this situation.', question: 'What if humans could live to 200?', answer: 'Example: "If humans were to live to 200, it\'s conceivable that retirement systems would collapse entirely. One could argue that society would need to fundamentally restructure its approach to work and education."', answerExplanation: 'Uses: were to (formal conditional), it\'s conceivable (hedged speculation), one could argue (distanced opinion).' },
        ],
        keyTakeaways: ['Suppose/What if/Imagine for opening speculation', 'I would imagine / It\'s conceivable / One could argue — hedged forms', 'Past: What if...had (never)...', 'Shows intellectual maturity and flexibility in discussion'],
        relatedLessons: ['c1-advanced-conditionals', 'c1-hedging-boosting'],
      },

      // # ─── 20. Formal Letters & Proposals ───
      {
        id: 'c1-formal-letters',
        title: 'Writing Formal Letters & Proposals',
        description: 'Write professional letters, emails, and proposals with the right tone and structure.',
        skill: 'writing', level: 'C1', duration: 12,
        objectives: ['Structure a formal letter correctly', 'Use appropriate formal phrases', 'Write a brief proposal with problem-solution structure'],
        sections: [
          { title: 'Formal Letter Structure', type: 'rule', content: 'Opening: "Dear Mr/Ms [name]," "Dear Sir/Madam," (unknown name). Purpose: "I am writing to enquire about..." "I am writing with regard to..." "I wish to draw your attention to..." Body: Clear paragraphs, one point per paragraph. Closing: "I look forward to hearing from you." "Please do not hesitate to contact me." Sign-off: "Yours sincerely," (known name) / "Yours faithfully," (Dear Sir/Madam).' },
          { title: 'Formal Phrases', type: 'rule', content: 'Requesting: "I would be grateful if you could..." "I would appreciate it if..." "Could you kindly..." Apologising: "I apologise for any inconvenience caused." "Please accept my sincere apologies." Complaining: "I wish to express my dissatisfaction with..." "I would like to bring to your attention..." Suggesting: "I would like to propose that..." "May I suggest that..."' },
          { title: 'Proposal Structure', type: 'tip', content: 'A simple proposal: 1. INTRODUCTION: What is being proposed and why. 2. CURRENT SITUATION: What is the problem? 3. PROPOSED SOLUTION: What do you recommend? 4. BENEFITS: What will improve? 5. IMPLEMENTATION: How will it work? Cost? Timeline? 6. CONCLUSION: Summary and next steps.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write an opening paragraph for a complaint letter.', question: 'You ordered a laptop online. It arrived damaged and customer service has been unhelpful.', answer: 'Example: "Dear Sir/Madam, I am writing to express my dissatisfaction with a recent purchase (Order No. 12345). The laptop I received on 15 July arrived with a cracked screen, and despite contacting your customer service team on three occasions, I have yet to receive a satisfactory resolution."', answerExplanation: 'Formal opening, states the problem clearly, includes evidence (order number, date, three attempts).' },
        ],
        keyTakeaways: ['Formal openings: "I am writing to..." "With regard to..."', 'Yours sincerely (known name) vs Yours faithfully (unknown)', '"I would be grateful if you could..." = polite request', 'Proposals: problem → solution → benefits → implementation'],
        relatedLessons: ['c1-discourse-markers', 'c1-connotation-register'],
      },

      // # ─── 21. Advanced Listening: Note-Taking ───
      {
        id: 'c1-note-taking',
        title: 'Advanced Listening: Note-Taking Strategies',
        description: 'Capture key information from lectures and talks — essential for academic success.',
        skill: 'listening', level: 'C1', duration: 10,
        objectives: ['Use abbreviations and symbols for speed', 'Identify key points vs supporting details', 'Organise notes for later review'],
        sections: [
          { title: 'Common Abbreviations', type: 'rule', content: 'Standard abbreviations: → = leads to, results in. ← = comes from, caused by. ↑ = increase. ↓ = decrease. = = equals, is the same as. ≠ = is not, differs from. + = and, plus, in addition. ∴ = therefore. ∵ = because. e.g. = for example. i.e. = that is. cf. = compare. vs = versus. govt = government. info = information. imp = important. dev = development. esp = especially.' },
          { title: 'What to Write Down', type: 'tip', content: 'DO note: Main ideas and conclusions. Key terms and definitions. Names, dates, numbers, statistics. Examples that clarify a point. Signal phrases: "The key point is..." "What\'s important here is..." "To summarise..." DON\'T note: Every word the speaker says. Information you already know. Repeated information. Your own opinions (save for later).' },
          { title: 'Organisation Methods', type: 'rule', content: 'Cornell Method: divide page into 3 sections (notes, cues, summary). Mind map: central topic → branches for subtopics. Outline: hierarchical numbering (1, 1.1, 1.2, 2, 2.1). Whichever method you choose, leave space for additions and review within 24 hours — that is when memory fades fastest.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Convert this to abbreviated notes.', question: '"The government has decided to increase spending on education because research shows that investment in education leads to economic growth."', answer: 'Govt → ↑ education spending. ∵ research: education investment → economic growth.', answerExplanation: 'Abbreviated key words, used symbols for increase (↑), therefore (∵), and leads to (→).' },
        ],
        keyTakeaways: ['Use symbols: → ↑ ↓ = ≠ ∴ ∵', 'Note main ideas, not every word', 'Listen for signal phrases: "The key point is..."', 'Review notes within 24 hours'],
        relatedLessons: ['c1-critical-reading', 'c1-writing-abstracts'],
      },

      // # ─── 22. Pragmatics: Implied Meaning ───
      {
        id: 'c1-pragmatics',
        title: 'Pragmatics: Implied Meaning & Inference',
        description: 'Understand what people MEAN, not just what they SAY — read between the lines.',
        skill: 'listening', level: 'C1', duration: 12,
        objectives: ['Identify implied meaning in conversation', 'Understand indirect refusals, hints, and politeness strategies', 'Interpret tone, context, and cultural signals'],
        sections: [
          { title: 'What Is Pragmatics?', type: 'text', content: 'Pragmatics is the study of meaning IN CONTEXT. The literal words are often different from the intended meaning: "It\'s cold in here." → literal: a statement about temperature. Implied: "Please close the window" or "Can you turn up the heating?" "That\'s an interesting idea." → Could mean genuine interest OR polite disagreement (depending on tone). Understanding pragmatics means reading the situation, not just the words.' },
          { title: 'Common Indirect Meanings', type: 'rule', content: 'Indirect refusals: "I\'d love to, but..." = no. "I\'ll think about it." = probably no. "That\'s a bit difficult." = no. Indirect criticism: "That\'s one way to do it." = I don\'t think it\'s the best way. "It\'s fine, I suppose." = I\'m not happy. Understatement (British): "Not bad" = quite good. "A bit of a problem" = a serious problem. "I\'m not entirely sure about that" = I disagree strongly.' },
          { title: 'Context Clues', type: 'tip', content: 'To interpret implied meaning, consider: WHO is speaking? (Boss, friend, stranger — power dynamics) WHERE? (Formal meeting, casual chat) HOW? (Tone of voice, facial expression, body language) WHAT came before? (Previous context in the conversation) WHY might they say it indirectly? (Politeness, face-saving, cultural norms)' },
          { title: 'Test Yourself', type: 'exercise', content: 'What does the speaker probably mean?', question: 'Your colleague says: "Well, it certainly is an... original approach."', answer: 'They probably don\'t think the approach is good — "original" here is likely a euphemism for "unusual/strange" with polite hedging.', answerExplanation: 'The pause (...), "certainly," and "original" together suggest polite criticism. The speaker is being diplomatic rather than directly negative.' },
        ],
        keyTakeaways: ['Literal meaning ≠ intended meaning in many conversations', '"I\'ll think about it" often means no', 'British understatement: "not bad" = quite good', 'Consider context: who, where, how, why'],
        relatedLessons: ['c1-connotation-register', 'c1-hypothesising'],
      },

      // # ─── 23. Mixed Verb Patterns ───
      {
        id: 'c1-mixed-verb-patterns',
        title: 'Mixed Verb Patterns at C1',
        description: 'Master complex verb combinations — "She is thought to have been working..." "He denied having been there."',
        skill: 'grammar', level: 'C1', duration: 12,
        objectives: ['Use perfect and continuous infinitives (to have done, to be doing)', 'Use perfect gerunds (having done)', 'Combine passive and continuous forms'],
        sections: [
          { title: 'Perfect Infinitive: To Have + Past Participle', type: 'rule', content: 'Refers to a time BEFORE the main verb: "She seems to have left." (= it seems she left earlier) "He claims to have met the President." "They appear to have made a mistake." With modals: "She must have forgotten." (= I think she forgot) "He could have helped." (= it was possible, but he didn\'t) "You should have told me." (= regret/criticism)' },
          { title: 'Continuous Infinitive: To Be + -ing', type: 'rule', content: 'Shows an action in progress at the time referred to: "She seems to be enjoying the party." (= right now, it looks like she\'s enjoying it) "He appeared to be sleeping." (= at that moment) Perfect continuous: to have been + -ing: "She seems to have been crying." (= evidence of recent crying) "He claimed to have been working all night."' },
          { title: 'Perfect Gerund: Having + Past Participle', type: 'rule', content: 'For actions completed BEFORE the main verb: "Having finished the exam, she left the room." (= after finishing) "She denied having stolen the money." (= denied that she had stolen) "He regretted having said those words." (= regretted something he said earlier) Compare: "She denied stealing" (general denial) vs "She denied having stolen" (emphasises the past-ness).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct form.', question: '"He is believed _____ (work) on the project for months before anyone found out."', answer: 'to have been working', answerExplanation: 'Passive reporting structure + action before discovery + ongoing duration = perfect continuous infinitive: "to have been working."' },
        ],
        keyTakeaways: ['To have done = before the main verb time', 'To be doing = in progress at the main verb time', 'Having done = gerund version of "after doing"', 'Combine: to have been doing = before + ongoing'],
        relatedLessons: ['c1-advanced-modals', 'c1-impersonal-passive'],
      },

      // # ─── 24. English for Research: Literature Reviews ───
      {
        id: 'c1-literature-reviews',
        title: 'English for Research: Literature Reviews',
        description: 'Write about what other researchers have found — a foundation skill for academic work.',
        skill: 'writing', level: 'C1', duration: 12,
        objectives: ['Structure a literature review', 'Use reporting verbs with appropriate tenses', 'Synthesise multiple sources'],
        sections: [
          { title: 'Structure', type: 'rule', content: 'A literature review is NOT a list of summaries. It should: 1. GROUP sources by theme, not by author. 2. COMPARE and CONTRAST findings. 3. IDENTIFY trends and gaps. 4. BUILD an argument for your research. Pattern: "Several studies have examined X (Author1, Year; Author2, Year). While Author1 found that..., Author2 reported contrasting results..." End with: "However, few studies have addressed Y, which is the focus of this research."' },
          { title: 'Reporting Verbs and Tenses', type: 'rule', content: 'Present tense (for current relevance): "Smith argues that..." "The theory suggests..." Past tense (for what was done): "Johnson (2020) found that..." "The study revealed..." Present perfect (for recent/ongoing): "Several researchers have investigated..." "It has been widely debated whether..." Choosing the right verb: Strong positive: demonstrate, establish, confirm. Neutral: find, report, show, note. Tentative: suggest, indicate, imply. Critical: claim, assert, allege (the writer might disagree).' },
          { title: 'Synthesis', type: 'tip', content: 'Synthesis = combining multiple sources into a coherent argument: NOT: "Smith (2020) said X. Jones (2021) said Y. Lee (2022) said Z." (this is a list, not synthesis) YES: "While Smith (2020) and Jones (2021) both found evidence for X, Lee (2022) challenged these findings by demonstrating Y. This discrepancy may be attributed to differences in methodology (cf. Brown, 2019)."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Synthesise these two findings.', question: 'Study A: "Remote workers are 13% more productive." Study B: "Remote workers report higher burnout rates."', answer: 'Example: "Although Study A found a 13% increase in productivity among remote workers, Study B highlighted that this may come at a cost, with remote workers reporting significantly higher rates of burnout."', answerExplanation: 'Synthesised: acknowledged both, connected with contrast (although), interpreted the relationship (may come at a cost).' },
        ],
        keyTakeaways: ['Group by theme, not by author', 'Compare and contrast, don\'t just list', 'Use tense to show relevance: present = current, past = specific, perfect = recent', 'End with the gap your research fills'],
        relatedLessons: ['c1-writing-abstracts', 'c1-lexical-bundles'],
      },
    ],
  },
]
