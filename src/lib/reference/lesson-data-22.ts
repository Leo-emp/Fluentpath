// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 22: Grammar Gap Fill — A1 (4) + A2 (1) + B1 (13)
// # ═══════════════════════════════════════════════════════════════════════════

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_22: LessonCategory[] = [
  // # ─── A1 Grammar — 4 more to reach 25 ───
  {
    id: 'a1-foundations',
    name: 'A1: Grammar Foundations',
    description: 'Build your first English grammar — the essential building blocks.',
    icon: '📐',
    lessons: [
      // # ─── A1-22: Conjunctions (and, but, or, so, because) ───
      { id: 'a1-conjunctions', title: 'Joining Words: And, But, Or, So, Because', description: 'Connect simple sentences using the five most common joining words.',
        skill: 'grammar', level: 'A1', duration: 8,
        objectives: ['Use "and" to add information', 'Use "but" for contrast', 'Use "or" for choices, "so" for results, "because" for reasons'],
        sections: [
          { title: 'The Five Joining Words', type: 'rule', content: 'AND = add more: "I like tea AND coffee." BUT = contrast/surprise: "She is young BUT very smart." OR = choice: "Do you want tea OR coffee?" SO = result: "I was tired, SO I went to bed." BECAUSE = reason: "I went to bed BECAUSE I was tired." These five words connect two simple sentences into one longer sentence.' },
          { title: 'Word Order Stays the Same', type: 'tip', content: 'The good news: when you use and/but/or/so/because, the word order of each sentence stays the same. You just put the joining word in the middle. "I like dogs." + "I like cats." → "I like dogs AND cats." "It is raining." + "I have an umbrella." → "It is raining, BUT I have an umbrella." Use a comma before but, so, and because when joining two full sentences.' },
          { title: 'Choose the Right Word', type: 'exercise', content: 'Fill in the gap with and, but, or, so, or because.', question: '"I want to go to the park, ___ it is raining." What word fits?', answer: '"but" — because you WANT to go (positive) but it is raining (negative problem). This is a contrast. "I want to go to the park, BUT it is raining."', answerExplanation: '"But" shows contrast between two ideas. You could also say "so I will stay home" (result) or "because it is sunny" (reason) — but the contrast between wanting to go and it raining makes "but" the best fit here.' },
        ],
        keyTakeaways: ['AND = adds more. BUT = contrast. OR = choice.', 'SO = result ("I was tired, so I slept"). BECAUSE = reason ("I slept because I was tired").', 'Word order stays the same — just add the joining word in the middle'],
      },
      // # ─── A1-23: Object Pronouns (me, you, him, her, it, us, them) ───
      { id: 'a1-object-pronouns', title: 'Object Pronouns: Me, You, Him, Her, It, Us, Them', description: 'Use the right pronoun when someone receives the action.',
        skill: 'grammar', level: 'A1', duration: 8,
        objectives: ['Know all 7 object pronouns', 'Choose between subject and object pronouns', 'Use object pronouns after verbs and prepositions'],
        sections: [
          { title: 'Subject vs Object Pronouns', type: 'rule', content: 'Subject pronouns DO the action: I, you, he, she, it, we, they. Object pronouns RECEIVE the action: me, you, him, her, it, us, them. SUBJECT: "I love chocolate." (I = the person who loves) OBJECT: "She loves me." (me = the person who is loved) The pairs: I → me. He → him. She → her. We → us. They → them. "You" and "it" stay the same for both.' },
          { title: 'After Verbs and Prepositions', type: 'tip', content: 'Object pronouns go AFTER the verb: "Call me." "I like him." "Tell them." Object pronouns also go after prepositions (for, with, to, from, about): "This is for you." "Come with us." "Talk to her." "I got it from them." WRONG: "Give it to I." → CORRECT: "Give it to me." WRONG: "Between you and I." → CORRECT: "Between you and me." After a preposition, ALWAYS use the object form.' },
          { title: 'Choose the Right Pronoun', type: 'exercise', content: 'Choose the correct pronoun.', question: '"I see (she/her) every day at school."', answer: '"her" — "I see HER every day." "Her" is the object pronoun because she receives the action of seeing. "She" is the subject pronoun (She sees me). After the verb "see," use the object form.', answerExplanation: 'The trick: if the pronoun comes AFTER the verb, use the object form. "I see her." "She sees me." "We like them." "They like us." Subject before the verb, object after.' },
        ],
        keyTakeaways: ['Subject pronouns (I, he, she) do the action. Object pronouns (me, him, her) receive it.', 'After verbs: "Call me." After prepositions: "For us." Always use object form.', '"You" and "it" are the same for subject and object'],
      },
      // # ─── A1-24: Ordinal Numbers & Sequencing ───
      { id: 'a1-ordinal-numbers', title: 'Ordinal Numbers: First, Second, Third...', description: 'Use ordinal numbers for dates, floors, positions, and instructions.',
        skill: 'grammar', level: 'A1', duration: 8,
        objectives: ['Say and write ordinal numbers 1st to 31st', 'Use ordinals for dates and positions', 'Know the irregular ordinals (first, second, third, fifth, twelfth)'],
        sections: [
          { title: 'The Pattern', type: 'rule', content: 'Most ordinal numbers add -th: fourth (4th), sixth (6th), seventh (7th), eighth (8th), ninth (9th), tenth (10th). IRREGULAR: first (1st), second (2nd), third (3rd), fifth (5th — NOT "fiveth"), eighth (8th — NOT "eightth"), ninth (9th — NOT "nineth"), twelfth (12th — NOT "twelveth"). FOR TEENS: eleventh (11th), thirteenth (13th), fourteenth (14th), fifteenth (15th)... FOR TENS: twentieth (20th), thirtieth (30th) — change y to ieth. COMPOUNDS: twenty-first (21st), twenty-second (22nd), twenty-third (23rd), twenty-fourth (24th)...' },
          { title: 'When to Use Ordinals', type: 'tip', content: 'DATES: "The fifth of March" or "March fifth." FLOORS: "She lives on the third floor." POSITION: "He finished first in the race." "She was second." ORDER: "First, open the book. Second, read page 10." BIRTHDAYS: "It is my twenty-first birthday." In written dates, use the number + suffix: 1st, 2nd, 3rd, 4th... "5th March 2026."' },
          { title: 'Write the Ordinal', type: 'exercise', content: 'Write these as ordinal numbers.', question: '"My birthday is on the ___ (12) of June. I live on the ___ (3) floor. This is my ___ (1) English lesson."', answer: '"twelfth (12th), third (3rd), first (1st)." My birthday is on the twelfth of June. I live on the third floor. This is my first English lesson.', answerExplanation: 'Twelfth is irregular (twelve → twelfth, not "twelveth"). Third is irregular (three → third, not "threeth"). First is completely irregular (one → first).' },
        ],
        keyTakeaways: ['Most ordinals add -th: fourth, sixth, seventh, tenth', 'Irregular: first, second, third, fifth, eighth, ninth, twelfth', 'Use for dates, floors, positions, and sequencing instructions'],
      },
      // # ─── A1-25: Whose & Possessive Questions ───
      { id: 'a1-whose-possessive', title: 'Whose Is This? Asking About Possession', description: 'Ask and answer questions about who owns something.',
        skill: 'grammar', level: 'A1', duration: 8,
        objectives: ['Use "whose" to ask about possession', 'Answer with possessive pronouns (mine, yours, his, hers)', 'Use possessive \'s correctly'],
        sections: [
          { title: 'Whose + Possessive Answers', type: 'rule', content: '"WHOSE" asks about the owner: "Whose bag is this?" "Whose car is that?" ANSWERS with possessive adjectives: "It is MY bag." "It is HER car." ANSWERS with possessive pronouns: "It is MINE." "It is HERS." Possessive adjectives: my, your, his, her, its, our, their (before a noun). Possessive pronouns: mine, yours, his, hers, ours, theirs (replace the noun). "This is MY book." = "This book is MINE." Note: "its" (possession) vs "it\'s" (it is) — no apostrophe for possession!' },
          { title: 'Possessive \'s', type: 'tip', content: 'Add \'s to a name or noun to show possession: "Tom\'s phone." "The teacher\'s desk." "My mother\'s car." For plural nouns ending in s, add just an apostrophe: "The students\' books." (= the books of the students) "My parents\' house." For irregular plurals: "The children\'s toys." "The men\'s room." WRONG: "It\'s Tom phone." → CORRECT: "It\'s Tom\'s phone." WRONG: "Whose is this book?" → CORRECT: "Whose book is this?"' },
          { title: 'Answer the Question', type: 'exercise', content: 'Answer using a possessive pronoun.', question: '"Whose phone is this?" — It belongs to Maria.', answer: '"It is hers." or "It\'s Maria\'s phone." / "It\'s Maria\'s." Possessive pronoun: hers (= her phone). Possessive \'s: Maria\'s (= belonging to Maria). Both answers are correct and natural.', answerExplanation: 'Possessive pronouns replace the noun entirely: "It is hers" (not "It is hers phone"). Possessive \'s attaches to the owner\'s name: "Maria\'s phone" or just "Maria\'s."' },
        ],
        keyTakeaways: ['"Whose" asks about possession: "Whose bag is this?"', 'Possessive pronouns (mine, yours, his, hers) replace the noun entirely', 'Add \'s to names for possession: "Tom\'s phone." Plural + s: "The students\' books."'],
      },
    ],
  },
  // # ─── A2 Grammar — 1 more to reach 25 ───
  {
    id: 'a2-elementary',
    name: 'A2: Elementary Grammar',
    description: 'Expand your grammar for everyday conversations and simple narratives.',
    icon: '📐',
    lessons: [
      // # ─── A2-25: Have Got vs Have ───
      { id: 'a2-have-got', title: 'Have Got vs Have', description: 'Understand the difference between "I have" and "I\'ve got" — and when to use each.',
        skill: 'grammar', level: 'A2', duration: 10,
        objectives: ['Use "have got" for possession in British English', 'Form negatives and questions with "have got"', 'Know when "have" and "have got" are NOT interchangeable'],
        sections: [
          { title: 'Two Ways to Say the Same Thing', type: 'rule', content: '"I have a car." = "I\'ve got a car." (same meaning) "She has blue eyes." = "She\'s got blue eyes." (same meaning) NEGATIVES: "I don\'t have a car." = "I haven\'t got a car." "She doesn\'t have a pet." = "She hasn\'t got a pet." QUESTIONS: "Do you have a pen?" = "Have you got a pen?" "Does she have a sister?" = "Has she got a sister?" SHORT ANSWERS: "Yes, I do." / "Yes, I have." "No, she doesn\'t." / "No, she hasn\'t." "Have got" is more common in British English. "Have" (without "got") is more common in American English.' },
          { title: 'When They Are NOT the Same', type: 'tip', content: '"Have got" is ONLY for possession and states. It does NOT replace "have" in other meanings: POSSESSION: "I\'ve got two brothers." ✓ = "I have two brothers." ✓ ILLNESS: "I\'ve got a headache." ✓ = "I have a headache." ✓ MEALS: "I have breakfast at 8." ✓ "I\'ve got breakfast at 8." ✗ (wrong) SHOWERS: "I have a shower every morning." ✓ "I\'ve got a shower every morning." ✗ (this means you own a shower) EXPERIENCES: "I usually have fun." ✓ "I usually\'ve got fun." ✗ Rule: if "have" means "eat," "take," or "experience," you cannot use "have got."' },
          { title: 'Choose the Right Form', type: 'exercise', content: 'Which is correct, or are both correct?', question: '(a) "I\'ve got three cats." / "I have three cats." (b) "She\'s got lunch at noon." / "She has lunch at noon."', answer: '(a) Both are correct — this is possession (owning cats). (b) Only "She has lunch at noon" is correct — "has lunch" means "eats lunch," which is an activity, not possession. "She\'s got lunch at noon" would mean she possesses a lunch (has it in her bag), which changes the meaning.', answerExplanation: 'The key test: does "have" mean "own/possess"? → Use either form. Does "have" mean "eat/take/experience"? → Only use "have" (without "got").' },
        ],
        keyTakeaways: ['"Have" and "have got" are interchangeable for POSSESSION only', '"Have got" questions: "Have you got...?" (no do/does needed)', 'For meals, showers, and experiences, only use "have" — never "have got"'],
      },
    ],
  },
  // # ─── B1 Grammar — 13 more to reach 25 ───
  {
    id: 'b1-intermediate',
    name: 'B1: Intermediate Grammar',
    description: 'Handle complex sentences, reported speech, and nuanced verb patterns.',
    icon: '📐',
    lessons: [
      // # ─── B1-13: Reported Speech (Statements) ───
      { id: 'b1-reported-speech', title: 'Reported Speech: Statements', description: 'Report what someone said without using their exact words.',
        skill: 'grammar', level: 'B1', duration: 12,
        objectives: ['Convert direct speech to reported speech', 'Apply tense backshift correctly', 'Change time and place references'],
        sections: [
          { title: 'Tense Backshift', type: 'rule', content: 'When you report what someone said, the verb tense usually moves ONE step back: DIRECT → REPORTED. Present simple → Past simple: "I like pizza" → She said she liked pizza. Present continuous → Past continuous: "I\'m working" → He said he was working. Past simple → Past perfect: "I went home" → She said she had gone home. Will → Would: "I will help" → He said he would help. Can → Could: "I can swim" → She said she could swim. Also change: "here" → "there." "Today" → "that day." "Tomorrow" → "the next day." "Yesterday" → "the day before." "This" → "that."' },
          { title: 'Say vs Tell', type: 'tip', content: '"Say" does NOT need a person: "She said she was tired." "He said (that) it was late." "Tell" NEEDS a person: "She told me she was tired." "He told us (that) it was late." WRONG: "She said me she was tired." ✗ WRONG: "He told that it was late." ✗ The word "that" is optional in reported speech: "She said (that) she was tired." Both are correct. In informal speech, people usually drop "that."' },
          { title: 'Report What They Said', type: 'exercise', content: 'Change to reported speech.', question: 'Tom: "I am going to the cinema tomorrow."', answer: 'Tom said (that) he was going to the cinema the next day. Changes: "I" → "he" (Tom is male). "Am going" → "was going" (present continuous → past continuous). "Tomorrow" → "the next day."', answerExplanation: 'Three things change: (1) the pronoun (I → he), (2) the tense (am → was), and (3) the time reference (tomorrow → the next day). The meaning stays the same — you are just reporting from a different perspective.' },
        ],
        keyTakeaways: ['Tenses shift back one step: present → past, past → past perfect, will → would', '"Say" needs no person object. "Tell" always needs one: "She told ME..."', 'Change time words: today → that day, tomorrow → the next day, here → there'],
      },
      // # ─── B1-14: Reported Questions ───
      { id: 'b1-reported-questions', title: 'Reported Speech: Questions', description: 'Report what someone asked — yes/no questions and wh-questions.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Report wh-questions using normal word order', 'Report yes/no questions with if/whether', 'Avoid the common mistake of keeping question word order'],
        sections: [
          { title: 'Reporting Questions', type: 'rule', content: 'WH-QUESTIONS: keep the question word but change to STATEMENT word order (no do/does/did). "Where do you live?" → She asked where I lived. "What are you doing?" → He asked what I was doing. YES/NO QUESTIONS: use "if" or "whether" + statement word order. "Do you like coffee?" → She asked if I liked coffee. "Are you coming?" → He asked whether I was coming. IMPORTANT: Reported questions are NOT questions — they do not use question marks or question word order. WRONG: "She asked where did I live." ✗ CORRECT: "She asked where I lived." ✓' },
          { title: 'No Question Marks!', type: 'tip', content: 'The most common mistake: keeping question word order in reported questions. DIRECT: "Where does she work?" (question word order: does she work) REPORTED: "He asked where she worked." (statement word order: she worked) DIRECT: "Is it raining?" REPORTED: "She asked if it was raining." (NOT: "She asked if was it raining.") Think of it this way: a reported question is a STATEMENT about a question — so it uses statement word order and ends with a full stop, not a question mark.' },
          { title: 'Report the Question', type: 'exercise', content: 'Change to reported speech.', question: 'The teacher asked: "Have you finished your homework?"', answer: 'The teacher asked if/whether I had finished my homework. Changes: yes/no question → add "if" or "whether." "Have finished" → "had finished" (present perfect → past perfect). "Your" → "my." No question mark — this is now a statement.', answerExplanation: 'Yes/no questions (no wh-word) always need "if" or "whether" in reported speech. The tense shifts back and the pronoun changes, just like reported statements.' },
        ],
        keyTakeaways: ['Wh-questions: keep the question word, use STATEMENT word order', 'Yes/no questions: add "if" or "whether" + statement word order', 'Reported questions end with a full stop, not a question mark'],
      },
      // # ─── B1-15: Defining Relative Clauses ───
      { id: 'b1-defining-relatives', title: 'Defining Relative Clauses: Who, Which, That, Where', description: 'Add essential information to a noun using relative clauses.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use who/that for people, which/that for things', 'Use where for places and when for times', 'Know when you can omit the relative pronoun'],
        sections: [
          { title: 'Relative Pronouns', type: 'rule', content: 'A defining relative clause tells us WHICH person/thing we mean — without it, the sentence is unclear. WHO/THAT = people: "The woman WHO lives next door is a doctor." "The man THAT called you is my brother." WHICH/THAT = things: "The book WHICH I bought is really good." "The car THAT he drives is very old." WHERE = places: "The restaurant WHERE we ate was expensive." WHEN = times: "I remember the day WHEN we first met." "That" can replace "who" and "which" in defining clauses. In informal English, "that" is actually more common than "who/which."' },
          { title: 'Omitting the Relative Pronoun', type: 'tip', content: 'You can REMOVE who/which/that when it is the OBJECT of the clause: "The book (which) I bought..." ✓ (I bought it — "which" is the object) "The man (that) she married..." ✓ (she married him — "that" is the object) You CANNOT remove it when it is the SUBJECT: "The woman who lives next door..." ✗ Cannot remove "who" (who IS the subject — who lives?) Test: if you can say "I bought IT / she married HIM," the pronoun is the object and can be removed. If removing it makes the sentence confusing, keep it.' },
          { title: 'Combine the Sentences', type: 'exercise', content: 'Join using a relative pronoun.', question: '"I met a girl. She speaks five languages."', answer: '"I met a girl who/that speaks five languages." "Who" or "that" replaces "she" and joins the two sentences. You cannot omit "who/that" here because it is the SUBJECT of "speaks" — the girl speaks five languages.', answerExplanation: 'When the relative pronoun is the subject (the girl speaks), you must keep it. When it is the object (the girl I met), you can drop it: "The girl I met speaks five languages."' },
        ],
        keyTakeaways: ['Who/that = people. Which/that = things. Where = places.', 'Omit the pronoun when it is the OBJECT: "The book I bought"', 'Cannot omit when it is the SUBJECT: "The woman who lives here"'],
      },
      // # ─── B1-16: Modals of Obligation & Permission ───
      { id: 'b1-modals-obligation', title: 'Must, Have To, Should, Can: Obligation & Permission', description: 'Express rules, obligations, advice, and permission using modal verbs.',
        skill: 'grammar', level: 'B1', duration: 12,
        objectives: ['Distinguish must vs have to vs should', 'Use can/be allowed to for permission', 'Form negatives correctly (mustn\'t vs don\'t have to)'],
        sections: [
          { title: 'Obligation & Necessity', type: 'rule', content: 'MUST = strong obligation (speaker\'s authority or personal feeling): "You must wear a seatbelt." (it\'s the law) "I must study harder." (personal decision) HAVE TO = obligation from external rules: "I have to wear a uniform at work." (the company requires it) "She has to take the exam." (the school requires it) SHOULD = advice, recommendation (not obligation): "You should drink more water." "She should see a doctor." KEY DIFFERENCE: "must" and "have to" are similar in positive sentences. In NEGATIVE sentences, they are very different: "You mustn\'t smoke here." = It is forbidden. "You don\'t have to come." = It is not necessary (but you can if you want).' },
          { title: 'Permission', type: 'tip', content: 'CAN = informal permission: "You can leave early today." "Can I use your phone?" MAY = formal permission: "You may begin the exam." "May I sit here?" BE ALLOWED TO = rules and regulations: "Students are allowed to use calculators." "You\'re not allowed to park here." CAN\'T / MUSTN\'T / NOT ALLOWED TO = prohibition: "You can\'t smoke indoors." = "You mustn\'t smoke indoors." = "You\'re not allowed to smoke indoors." (All three mean the same — it is forbidden.)' },
          { title: 'Must, Have To, or Should?', type: 'exercise', content: 'Choose the best modal.', question: '"You ___ see this film — it\'s amazing!" Is this a rule, necessity, or advice?', answer: '"You should see this film." — This is a recommendation/advice, not a rule or obligation. You could also say "You must see this film!" for strong emphasis (like a personal recommendation), but "should" is the neutral choice for advice.', answerExplanation: '"Should" = advice. "Must" can also express strong personal recommendation ("You must try this restaurant!"), but it sounds more forceful. "Have to" would be wrong here because nobody is forcing you to watch a film.' },
        ],
        keyTakeaways: ['Must = personal/strong obligation. Have to = external obligation. Should = advice.', 'Mustn\'t = forbidden. Don\'t have to = not necessary (big difference!)', 'Permission: can (informal), may (formal), be allowed to (rules)'],
      },
      // # ─── B1-17: Wish + Past Simple ───
      { id: 'b1-wish-past', title: 'Wish + Past Simple: Unreal Present', description: 'Express wishes about the present situation — things you want to be different.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Form wish + past simple for present wishes', 'Use "I wish I were" (subjunctive)', 'Distinguish wish from hope'],
        sections: [
          { title: 'Wishing About Now', type: 'rule', content: 'Use WISH + PAST SIMPLE to talk about things you want to be different RIGHT NOW: "I wish I had more money." (= I don\'t have enough money now) "She wishes she lived near the beach." (= she doesn\'t live near the beach now) "I wish I knew the answer." (= I don\'t know the answer now) "We wish it wasn\'t raining." (= it IS raining now) NOTE: "I wish I WERE taller" is more formal/traditional than "I wish I WAS taller." Both are accepted, but "were" is preferred in formal English for all persons: "I wish I were," "I wish he were," "I wish she were."' },
          { title: 'Wish vs Hope', type: 'tip', content: 'WISH = something you want but that is probably NOT true or impossible right now: "I wish I spoke Japanese." (I don\'t speak it — unlikely to change today) HOPE = something that is possible and might happen: "I hope it doesn\'t rain tomorrow." (it\'s possible) "I hope you pass the exam." (it\'s possible) WRONG: "I wish it doesn\'t rain tomorrow." ✗ (use hope for possible future events) WRONG: "I hope I were taller." ✗ (you can\'t become taller by hoping — use wish) Rule of thumb: wish = unreal/impossible. Hope = real/possible.' },
          { title: 'Express the Wish', type: 'exercise', content: 'Rewrite using "wish."', question: '"I don\'t have a car." → I wish...', answer: '"I wish I had a car." The present reality ("I don\'t have") becomes past simple in the wish ("I had"). The past tense here does NOT refer to the past — it signals that this is unreal/imaginary.', answerExplanation: 'The past simple after "wish" is not about the past — it creates distance from reality. "I wish I had a car" means "I don\'t have a car, and I want one." This use of past tense for unreal situations is called the "unreal past."' },
        ],
        keyTakeaways: ['Wish + past simple = "I want this to be different but it isn\'t"', '"I wish I were" (formal) = "I wish I was" (informal) — both are accepted', 'Wish = impossible/unreal. Hope = possible/real.'],
      },
      // # ─── B1-18: Tag Questions ───
      { id: 'b1-tag-questions', title: 'Tag Questions: You Like Coffee, Don\'t You?', description: 'Add question tags to check information or start conversation.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Form positive and negative tag questions', 'Use the correct auxiliary verb in tags', 'Understand rising vs falling intonation'],
        sections: [
          { title: 'The Rule', type: 'rule', content: 'POSITIVE statement → NEGATIVE tag: "You like coffee, DON\'T you?" "She is coming, ISN\'T she?" "They have finished, HAVEN\'T they?" NEGATIVE statement → POSITIVE tag: "You don\'t like coffee, DO you?" "She isn\'t coming, IS she?" "They haven\'t finished, HAVE they?" The tag uses the SAME auxiliary verb as the main sentence. No auxiliary? Use do/does/did: "You speak English, DON\'T you?" "She works here, DOESN\'T she?" "They went home, DIDN\'T they?" Special cases: "I am right, AREN\'T I?" (NOT "amn\'t I"). "Let\'s go, SHALL we?" "Pass the salt, WILL you?"' },
          { title: 'Intonation Changes the Meaning', type: 'tip', content: 'FALLING intonation (↘) = you expect agreement, you\'re quite sure: "Nice day, isn\'t it?" ↘ (= I think so, and I expect you agree) RISING intonation (↗) = you\'re genuinely asking, not sure: "You\'re coming tomorrow, aren\'t you?" ↗ (= I\'m not sure — please confirm) In written English, you can\'t show intonation, so context matters. In conversation, the way you say the tag completely changes whether it\'s a real question or just a conversation filler.' },
          { title: 'Add the Tag', type: 'exercise', content: 'Complete with the correct tag question.', question: '"She can swim, ___?"', answer: '"can\'t she?" Positive statement ("She can swim") → negative tag ("can\'t she?"). The auxiliary is "can," so the tag uses "can\'t" + the subject pronoun "she."', answerExplanation: 'Match the auxiliary: can → can\'t. Match the subject: She → she. Positive sentence → negative tag. If the sentence were "She can\'t swim," the tag would be "can she?" (negative → positive).' },
        ],
        keyTakeaways: ['Positive sentence → negative tag. Negative sentence → positive tag.', 'Match the auxiliary verb: is/isn\'t, do/don\'t, can/can\'t, have/haven\'t', 'Falling tone = "I think so." Rising tone = "Is that right?"'],
      },
      // # ─── B1-19: Future Continuous ───
      { id: 'b1-future-continuous', title: 'Future Continuous: Will Be + -ing', description: 'Talk about actions in progress at a specific time in the future.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Form the future continuous (will be + -ing)', 'Use it for actions in progress at a future time', 'Distinguish from simple future'],
        sections: [
          { title: 'Formation & Meaning', type: 'rule', content: 'FORM: will + be + verb-ing. "I will be working at 3 PM tomorrow." "She will be travelling next week." "They will be waiting for us." USE 1 — action in progress at a specific future time: "At 8 PM tonight, I will be watching TV." (= the action of watching will be in progress at that moment) USE 2 — things that will happen as part of a plan or routine: "I will be seeing John tomorrow." (= it\'s already arranged) "Will you be using the car tonight?" (= polite way to ask) USE 3 — polite questions (softer than "will you"): "Will you be joining us for dinner?" (more polite than "Will you join us?")' },
          { title: 'Future Simple vs Future Continuous', type: 'tip', content: 'SIMPLE FUTURE: focuses on the ACTION/DECISION. "I will call you tomorrow." (a decision) FUTURE CONTINUOUS: focuses on being IN THE MIDDLE of something. "I will be flying to London at this time tomorrow." (in the middle of the flight) Compare: "At 10 AM, I will have a meeting." (the meeting starts at 10) "At 10 AM, I will be having a meeting." (I will be in the middle of the meeting) The continuous emphasises that the action is ongoing around a specific time, not just that it happens.' },
          { title: 'Choose the Right Form', type: 'exercise', content: 'Simple future or future continuous?', question: '"This time next week, I ___ (lie) on a beach in Spain."', answer: '"will be lying" — Future continuous. "This time next week" specifies a moment in time. At that moment, you will be IN THE MIDDLE of lying on the beach. The continuous form emphasises the ongoing nature of the action at that specific point.', answerExplanation: '"This time next week/tomorrow/next year" is a strong signal for future continuous — it asks what will be happening at that exact moment. Simple future ("I will lie on a beach") sounds like a decision, not an ongoing action.' },
        ],
        keyTakeaways: ['Will be + -ing = action in progress at a specific future time', '"This time tomorrow/next week" signals → future continuous', 'Also used for polite questions: "Will you be needing anything?"'],
      },
      // # ─── B1-20: Time Clauses (when, while, until, as soon as) ───
      { id: 'b1-time-clauses', title: 'Time Clauses: When, While, Until, As Soon As', description: 'Connect actions in time — what happens before, during, and after another event.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use when, while, before, after, until, as soon as', 'Apply the present tense rule in future time clauses', 'Distinguish while (during) from when (at the point)'],
        sections: [
          { title: 'Time Conjunctions', type: 'rule', content: 'WHEN = at the point in time: "When I arrive, I will call you." WHILE = during (two actions at the same time): "While I was cooking, he was watching TV." BEFORE = earlier: "Finish your homework before you go out." AFTER = later: "After I eat dinner, I will study." UNTIL = up to that point: "Wait here until I come back." AS SOON AS = immediately when: "As soon as I get home, I will call you." CRITICAL RULE: In future time clauses, use PRESENT tense (not "will"): WRONG: "When I will arrive, I will call you." ✗ CORRECT: "When I arrive, I will call you." ✓ The time clause uses present simple; the main clause uses will.' },
          { title: 'While vs When', type: 'tip', content: 'WHILE = two LONG actions happening at the same time: "While I was reading, she was sleeping." (both ongoing) WHEN = one action INTERRUPTS another: "When the phone rang, I was reading." (the phone interrupted my reading) "When I arrived, they were eating dinner." (my arrival interrupted their dinner) Pattern: WHILE + continuous tense (ongoing action). WHEN + simple tense (single point in time). "While I was walking home, I saw an old friend." = "When I was walking home, I saw an old friend." (Both work here, but "while" emphasises the duration more.)' },
          { title: 'Fix the Mistake', type: 'exercise', content: 'Correct the error.', question: '"I will call you as soon as I will arrive."', answer: '"I will call you as soon as I arrive." Remove "will" from the time clause. After time words (when, as soon as, before, after, until), use PRESENT tense for future meaning, never "will." The main clause keeps "will": "I will call you."', answerExplanation: 'This is one of the most common B1 mistakes. The rule: time clause = present tense. Main clause = will/going to. "Before I leave" not "before I will leave." "After she finishes" not "after she will finish."' },
        ],
        keyTakeaways: ['After when/while/before/after/until/as soon as → use PRESENT tense (not will)', 'While = two ongoing actions. When = one event interrupts another.', 'Main clause uses will/going to. Time clause uses present simple.'],
      },
      // # ─── B1-21: Comparisons (as...as, not as...as, the...the) ───
      { id: 'b1-comparisons-advanced', title: 'Advanced Comparisons: As...As, The More...The More', description: 'Express equal, unequal, and proportional comparisons naturally.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use as + adjective + as for equal comparison', 'Use not as...as for unequal comparison', 'Use "the more...the more" for proportional change'],
        sections: [
          { title: 'Equal & Unequal Comparisons', type: 'rule', content: 'AS...AS = equal: "She is as tall as her brother." (same height) "This restaurant is as good as that one." NOT AS...AS = not equal (softer than comparatives): "He is not as tall as his brother." (= his brother is taller, but said more gently) "My car is not as fast as yours." (= yours is faster) Compare the softness: "He is shorter than his brother." (direct) vs "He is not as tall as his brother." (gentler) JUST AS...AS = exactly equal: "This test is just as hard as the last one." NOT NEARLY AS...AS = much less: "This is not nearly as difficult as I expected."' },
          { title: 'The More...The More', type: 'tip', content: 'THE + comparative...THE + comparative = proportional change: "The more you practise, the better you get." (more practice → better results) "The harder you work, the more you earn." "The bigger the house, the higher the price." "The sooner we leave, the earlier we arrive." "The older I get, the less I worry." This structure shows that two things change together — when one increases, the other also changes.' },
          { title: 'Complete the Comparison', type: 'exercise', content: 'Rewrite using "not as...as."', question: '"Tokyo is more expensive than Bangkok."', answer: '"Bangkok is not as expensive as Tokyo." The meaning is the same, but "not as...as" reverses the subject and sounds gentler. Instead of saying Tokyo is MORE, we say Bangkok is NOT AS MUCH. Both sentences mean Tokyo costs more.', answerExplanation: '"More expensive than" and "not as expensive as" express the same idea from opposite perspectives. "Not as...as" is often preferred in polite or diplomatic language because it avoids directly saying something is worse/less.' },
        ],
        keyTakeaways: ['As...as = equal. Not as...as = unequal (gentler than comparatives).', '"Not as tall as" = softer way of saying "shorter than"', '"The more...the more" = two things change together proportionally'],
      },
      // # ─── B1-22: Articles — Advanced Usage ───
      { id: 'b1-articles-advanced', title: 'Articles: The Tricky Cases', description: 'Master the difficult article choices that trip up B1 learners.',
        skill: 'grammar', level: 'B1', duration: 12,
        objectives: ['Use "the" with unique nouns, superlatives, and known information', 'Know when to use zero article (no article)', 'Handle geographical names, institutions, and abstract nouns'],
        sections: [
          { title: 'When to Use THE', type: 'rule', content: 'THE = the listener knows which one: "Pass me the salt." (there is only one on the table) THE with unique things: "the sun," "the moon," "the internet," "the government." THE with superlatives: "the best," "the tallest," "the most expensive." THE with ordinals: "the first," "the second," "the last." THE with musical instruments: "She plays the piano." THE with some countries/places: "the UK," "the USA," "the Netherlands," "the Alps," "the Amazon," "the Pacific." THE with known things: "I saw a dog. The dog was big." (second mention = the)' },
          { title: 'No Article (Zero Article)', type: 'tip', content: 'NO article with: General statements: "Dogs are friendly." (dogs in general, not specific dogs) Meals: "I had lunch." NOT "I had the lunch." Sports: "She plays tennis." NOT "She plays the tennis." Languages: "He speaks English." NOT "He speaks the English." Most countries: "I live in Japan." NOT "I live in the Japan." Academic subjects: "I study biology." Days/months: "See you on Monday." "It\'s June." BUT: "The Monday after next." (specific Monday = the) Compare: "I love music." (general) vs "I love the music in this café." (specific)' },
          { title: 'Choose A, The, or Nothing', type: 'exercise', content: 'Fill in the gaps.', question: '"I want to learn ___ (a/the/—) guitar. ___ (A/The/—) music is good for ___ (a/the/—) brain."', answer: '"I want to learn THE guitar." (musical instruments use "the") "— Music is good for THE brain." (general concept = no article; "the brain" = the brain in general as a known thing, like "the environment").', answerExplanation: 'Musical instruments always take "the": play the piano, learn the guitar. Abstract nouns used generally take no article: "Music is beautiful." Body parts/organs with general meaning use "the": "the brain," "the heart." These rules are learned through exposure — they don\'t follow one simple logic.' },
        ],
        keyTakeaways: ['THE = known, unique, superlative, ordinal, musical instruments', 'No article = general statements, meals, sports, languages, most countries', '"I love music" (general) vs "I love the music here" (specific)'],
      },
      // # ─── B1-23: So/Neither for Agreement ───
      { id: 'b1-so-neither', title: 'So Do I / Neither Do I: Agreeing', description: 'Express agreement quickly — "me too" and "me neither" in full form.',
        skill: 'grammar', level: 'B1', duration: 8,
        objectives: ['Use "So + auxiliary + I" for positive agreement', 'Use "Neither + auxiliary + I" for negative agreement', 'Match the auxiliary to the original sentence'],
        sections: [
          { title: 'Agreeing with Positive & Negative', type: 'rule', content: 'POSITIVE → SO + auxiliary + subject: "I like pizza." → "So do I." (= me too) "She can swim." → "So can I." "They have finished." → "So have we." NEGATIVE → NEITHER + auxiliary + subject: "I don\'t like spiders." → "Neither do I." (= me neither) "She can\'t drive." → "Neither can I." "They haven\'t been to Paris." → "Neither have we." Match the auxiliary: present simple → do/does. Past simple → did. Can → can. Have (perfect) → have. Be → am/is/are. "I am tired." → "So am I." "He was late." → "So was she."' },
          { title: 'Common Mistakes', type: 'tip', content: 'WRONG: "So I do." ✗ (word order is inverted: So + aux + subject) CORRECT: "So do I." ✓ WRONG: "Neither I do." ✗ CORRECT: "Neither do I." ✓ WRONG: "I don\'t like it." → "So don\'t I." ✗ (negative needs "neither," not "so") CORRECT: "Neither do I." ✓ In informal speech, "Me too" and "Me neither" work in all situations: "I love this song." → "Me too!" "I can\'t understand this." → "Me neither!" These are less grammatically precise but perfectly natural in conversation.' },
          { title: 'Agree', type: 'exercise', content: 'Respond with So/Neither.', question: '"I went to London last year." — You also went to London. What do you say?', answer: '"So did I." Past simple "went" → auxiliary "did." Positive sentence → use "So." Word order: So + did + I.', answerExplanation: '"Went" is past simple, so the auxiliary is "did." Positive agreement always uses "So + aux + subject." If the sentence were "I didn\'t go to London," you would say "Neither did I."' },
        ],
        keyTakeaways: ['Positive: "So do/did/can/am I." Negative: "Neither do/did/can/am I."', 'Word order is INVERTED: So + auxiliary + subject', 'Informal: "Me too" (positive) and "Me neither" (negative)'],
      },
      // # ─── B1-24: Present Perfect with Yet, Already, Just ───
      { id: 'b1-yet-already-just', title: 'Yet, Already, Just with Present Perfect', description: 'Use these three time words naturally with the present perfect tense.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use "just" for very recent actions', 'Use "already" for actions completed sooner than expected', 'Use "yet" in questions and negatives'],
        sections: [
          { title: 'Three Time Words', type: 'rule', content: 'JUST = a very short time ago (minutes, moments): "I have just finished my homework." "She has just left." (= a few minutes ago) Position: after "have/has," before the past participle. ALREADY = sooner than expected (surprise, emphasis): "I have already eaten." (= you don\'t need to offer me food) "She has already passed the exam." (= impressive, so soon!) Position: after "have/has," before the past participle. YET = until now (for things we expect to happen): Questions: "Have you finished yet?" "Has she arrived yet?" Negatives: "I haven\'t finished yet." "She hasn\'t called yet." Position: at the END of the sentence.' },
          { title: 'Already in Questions', type: 'tip', content: 'Using "already" in a question expresses surprise: "Have you already finished?" (= wow, that was fast!) Compare: "Have you finished yet?" (neutral — just checking) "Have you already finished?" (surprised — I didn\'t expect you to be done so soon) "Still" is the opposite of "yet": "She still hasn\'t called." (= I expected her to call by now, but she hasn\'t) "Are you still working?" (= I expected you to finish by now)' },
          { title: 'Choose Just, Already, or Yet', type: 'exercise', content: 'Fill in the gap.', question: '"Have you done your homework ___?" "Yes, I\'ve ___ finished it. I\'ve ___ sent it to the teacher."', answer: '"yet" / "just" / "already." "Have you done your homework YET?" (= asking if it\'s done, expected it by now) "I\'ve JUST finished it." (= a moment ago) "I\'ve ALREADY sent it." (= I did it sooner than expected — I\'m efficient!)', answerExplanation: 'Yet = end of questions/negatives, checking if expected action happened. Just = after have/has, very recent. Already = after have/has, emphasis on completion being sooner than expected.' },
        ],
        keyTakeaways: ['Just = a moment ago ("I\'ve just arrived"). Position: after have/has.', 'Already = done sooner than expected ("I\'ve already finished!"). Position: after have/has.', 'Yet = end of questions/negatives ("Have you eaten yet?" "Not yet.")'],
      },
      // # ─── B1-25: Present vs Past Habit (used to vs would) ───
      { id: 'b1-would-past-habit', title: 'Would vs Used To: Past Habits', description: 'Two ways to talk about past habits — and the important difference between them.',
        skill: 'grammar', level: 'B1', duration: 10,
        objectives: ['Use "would" for repeated past actions', 'Know why "would" cannot replace "used to" for states', 'Choose naturally between would and used to'],
        sections: [
          { title: 'Would for Repeated Actions', type: 'rule', content: '"Used to" works for BOTH past habits AND past states: HABIT: "I used to walk to school." (repeated action) STATE: "I used to live in Tokyo." (a state, not an action) "Would" works ONLY for past habits/actions — NOT states: HABIT: "I would walk to school every day." ✓ STATE: "I would live in Tokyo." ✗ WRONG — "would" cannot describe states. States include: live, be, have, like, love, know, believe, want. "She used to be very shy." ✓ "She would be very shy." ✗ "We used to have a dog." ✓ "We would have a dog." ✗ Rule: if it was a repeated ACTION → used to or would. If it was a STATE → only used to.' },
          { title: 'When Would Sounds Better', type: 'tip', content: '"Would" is often preferred for nostalgic storytelling: "Every summer, we would go to the beach. We would build sandcastles and swim all day. In the evening, we would eat ice cream and watch the sunset." This sounds warm and nostalgic — "used to" in every sentence would sound repetitive. Best practice: use "used to" to SET THE SCENE (introduce the situation), then switch to "would" for the repeated actions: "We used to spend every summer at the beach. We would swim, build sandcastles, and eat ice cream." "Used to" introduces the context. "Would" fills in the repeated details.' },
          { title: 'Used To or Would?', type: 'exercise', content: 'Which can you use?', question: '(a) "She ___ (live) in Paris when she was young." (b) "Every Friday, we ___ (order) pizza."', answer: '(a) "She used to live in Paris." — "live" is a STATE, so "would" is wrong here. (b) "We used to order / would order pizza." — "order" is a repeated ACTION, so both work. "Would" sounds slightly more natural for repeated routines in storytelling.', answerExplanation: 'The test: can you see someone doing it (action)? → both work. Is it a situation/condition (state)? → only "used to." Living somewhere is a state. Ordering pizza is an action.' },
        ],
        keyTakeaways: ['Would = repeated past ACTIONS only. Used to = actions AND states.', '"I would live in Tokyo" is WRONG — states need "used to"', 'Storytelling: set the scene with "used to," then fill details with "would"'],
      },
    ],
  },
]
