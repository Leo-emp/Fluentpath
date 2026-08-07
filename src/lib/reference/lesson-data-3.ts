// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 3: A1 Beginner Lessons (1–13 of 25)
// # ═══════════════════════════════════════════════════════════════════════════
// # Absolute beginner lessons — assume zero English knowledge.
// # Simple language, lots of examples, gentle explanations.
// # All content is original and copyright-free.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_3: LessonCategory[] = [
  {
    id: 'a1-foundations',
    name: 'A1: Foundations',
    description: 'Start from zero — learn the building blocks of English: pronouns, verbs, questions, and everyday structures.',
    icon: '🌱',
    lessons: [

      // # ─── 1. The Verb "To Be" ───
      {
        id: 'a1-verb-to-be',
        title: 'The Verb "To Be": Am, Is, Are',
        description: 'The most important verb in English — learn to say who you are, where you are, and what things are like.',
        skill: 'grammar', level: 'A1', duration: 12,
        objectives: [
          'Use am, is, are correctly with different subjects',
          'Make negative sentences with am not, isn\'t, aren\'t',
          'Ask yes/no questions with be',
          'Describe people, things, and situations',
        ],
        sections: [
          { title: 'Why Is "To Be" So Important?', type: 'text', content: '"To be" is the first verb you need in English. You use it hundreds of times every day: "I am tired," "She is a doctor," "They are from Japan," "It is cold today." Unlike most English verbs, "to be" changes its form depending on who you are talking about — and that is what makes it tricky for beginners.' },
          { title: 'Positive Forms', type: 'rule', content: 'I am (I\'m) — "I am a student." / "I\'m happy." You are (you\'re) — "You are my friend." / "You\'re tall." He is (he\'s) — "He is a teacher." She is (she\'s) — "She is 25 years old." It is (it\'s) — "It is Monday." / "It\'s raining." We are (we\'re) — "We are ready." They are (they\'re) — "They are in the garden."' },
          { title: 'Negative Forms', type: 'rule', content: 'I am not (I\'m not) — "I\'m not tired." You are not (you aren\'t / you\'re not) — "You aren\'t late." He/She/It is not (isn\'t) — "She isn\'t here." / "It isn\'t cold." We/They are not (aren\'t) — "They aren\'t ready." Note: "I amn\'t" does NOT exist. Always say "I\'m not."' },
          { title: 'Questions with Be', type: 'rule', content: 'To make a question, put am/is/are BEFORE the subject: "You are happy." → "Are you happy?" "She is a doctor." → "Is she a doctor?" "They are at home." → "Are they at home?" Short answers: "Yes, I am." / "No, I\'m not." "Yes, she is." / "No, she isn\'t." "Yes, they are." / "No, they aren\'t."' },
          { title: 'Common Uses of Be', type: 'example', examples: ['I am 30 years old. (age)', 'She is from Brazil. (nationality/origin)', 'It is 3 o\'clock. (time)', 'We are hungry. (feeling/state)'], analysis: '"Be" describes states, not actions. You ARE something (a student, happy, tired) — you do not DO "be." This is different from action verbs like run, eat, or work.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in the blank with am, is, or are.', question: '"My parents _____ from Thailand. My father _____ an engineer and my mother _____ a teacher."', answer: 'are ... is ... is', answerExplanation: '"My parents" = they → are. "My father" = he → is. "My mother" = she → is.' },
        ],
        keyTakeaways: ['I am, you/we/they are, he/she/it is', 'Negative: I\'m not, isn\'t, aren\'t', 'Questions: swap subject and be — "Are you...?" "Is she...?"', '"Be" describes states (age, nationality, feelings), not actions'],
        commonMistakes: ['"I is happy" → "I am happy"', '"She are a doctor" → "She is a doctor"', '"Are you is ready?" → "Are you ready?"', '"I amn\'t" → "I\'m not" (amn\'t does not exist)'],
        relatedLessons: ['a1-pronouns', 'a1-present-simple-positive'],
      },

      // # ─── 2. Personal Pronouns ───
      {
        id: 'a1-pronouns',
        title: 'Personal Pronouns: I, You, He, She, It, We, They',
        description: 'Learn which word to use when talking about yourself, other people, and things.',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Choose the correct pronoun for any person or thing',
          'Understand the difference between subject and object pronouns',
          'Use "it" for things, animals, and weather/time',
          'Avoid common pronoun confusion',
        ],
        sections: [
          { title: 'What Are Pronouns?', type: 'text', content: 'Pronouns replace nouns so you do not repeat the same word. Instead of saying "Maria is a doctor. Maria works at a hospital. Maria likes Maria\'s job," you say "Maria is a doctor. She works at a hospital. She likes her job." Pronouns make language shorter and more natural.' },
          { title: 'Subject Pronouns', type: 'rule', content: 'Subject pronouns go BEFORE the verb — they do the action: I — the speaker: "I live in London." You — the listener (one person or many): "You speak English well." He — one male person: "He is my brother." She — one female person: "She is a nurse." It — one thing, animal, or idea: "It is a good book." / "It is raining." We — the speaker + other people: "We are students." They — other people or things: "They live in Paris."' },
          { title: 'Object Pronouns', type: 'rule', content: 'Object pronouns go AFTER the verb — they receive the action: me, you, him, her, it, us, them. "She loves me." "I called him." "Can you help us?" "I gave them the book." Compare: "He likes she" = WRONG. "He likes her" = CORRECT. After a verb or preposition, always use the object form.' },
          { title: 'Using "It"', type: 'tip', content: '"It" is used for more than just things: Weather: "It is raining." / "It is hot today." Time: "It is 5 o\'clock." / "It is Monday." Distance: "It is 10 kilometres." Situations: "It is difficult to learn English." (general "it" with no specific thing). Animals: "The dog is hungry. It wants food." (animals are usually "it" unless you know the pet\'s gender).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Replace the underlined words with a pronoun.', question: '"John and I went to the cinema. John and I watched a film. The film was very good."', answer: 'We went to the cinema. We watched a film. It was very good.', answerExplanation: '"John and I" = we (the speaker + another person). "The film" = it (a thing).' },
        ],
        keyTakeaways: ['Subject: I, you, he, she, it, we, they (before the verb)', 'Object: me, you, him, her, it, us, them (after the verb)', '"It" covers things, weather, time, and general situations', 'Pronouns replace nouns to avoid repetition'],
        commonMistakes: ['"Me am happy" → "I am happy" (subject position needs I)', '"He likes she" → "He likes her" (object position needs her)', '"My friends, they are nice" → "My friends are nice" (do not double up)'],
        relatedLessons: ['a1-verb-to-be', 'a1-possessives'],
      },

      // # ─── 3. Possessives ───
      {
        id: 'a1-possessives',
        title: 'Possessives: My, Your, His, Her, Our, Their',
        description: 'Learn to say who things belong to — my book, her car, their house.',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Use possessive adjectives correctly before nouns',
          'Match each pronoun to its possessive form',
          'Use the possessive \'s for names (Tom\'s book)',
          'Distinguish my/mine, your/yours, etc.',
        ],
        sections: [
          { title: 'Possessive Adjectives', type: 'rule', content: 'Possessive adjectives go BEFORE a noun to show who owns it: I → my: "my phone, my name, my family." You → your: "your house, your idea." He → his: "his car, his job." She → her: "her bag, her children." It → its: "its colour, its name" (no apostrophe!). We → our: "our school, our team." They → their: "their garden, their parents." Always followed by a noun: "my book" not just "my."' },
          { title: 'Possessive \'s', type: 'rule', content: 'Add \'s to a name or noun to show possession: "Tom\'s phone" = the phone belonging to Tom. "My sister\'s car" = the car belonging to my sister. "The dog\'s tail" = the tail of the dog. For plural nouns ending in -s, just add an apostrophe: "My parents\' house" = the house belonging to my parents. "The students\' books" = the books belonging to the students.' },
          { title: 'Possessive Pronouns: Mine, Yours, His, Hers, Ours, Theirs', type: 'tip', content: 'Possessive pronouns stand ALONE — no noun after them: "This book is mine." (not "This book is my.") "Is this pen yours?" "That car is hers." "The idea was ours." "The decision is theirs." Use them when the noun is already clear: "Whose bag is this?" — "It\'s mine." Note: "his" is the same for both: "his book" (adjective) and "It\'s his" (pronoun).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in the correct possessive.', question: '"I have a dog. _____ name is Max. Max is _____ best friend."', answer: 'Its ... my', answerExplanation: 'The dog\'s name → "its" (possessive of "it" — no apostrophe). Max belongs to me → "my" best friend.' },
        ],
        keyTakeaways: ['my, your, his, her, its, our, their + noun', 'mine, yours, his, hers, ours, theirs = stand alone (no noun)', 'Name\'s = possession: "Sarah\'s phone"', '"Its" (no apostrophe) = possession. "It\'s" = it is.'],
        commonMistakes: ['"It\'s tail is long" → "Its tail is long" (possessive its has no apostrophe)', '"This is me book" → "This is my book"', '"The book is my" → "The book is mine" (pronoun form)'],
        relatedLessons: ['a1-pronouns', 'a1-demonstratives'],
      },

      // # ─── 4. Present Simple: Positive ───
      {
        id: 'a1-present-simple-positive',
        title: 'Present Simple: Making Positive Sentences',
        description: 'Talk about your daily life, habits, and routines — "I work," "She likes," "They play."',
        skill: 'grammar', level: 'A1', duration: 12,
        objectives: [
          'Form positive present simple sentences',
          'Add -s/-es correctly for he/she/it',
          'Talk about habits, routines, and facts',
          'Handle spelling changes (study→studies, go→goes)',
        ],
        sections: [
          { title: 'When Do We Use Present Simple?', type: 'text', content: 'The present simple is for things that happen REGULARLY or are ALWAYS TRUE. Your daily routine: "I wake up at 7." Your habits: "She drinks coffee every morning." Facts: "Water boils at 100 degrees." Permanent situations: "He lives in London." Think of it as describing your "normal life" — not what is happening right now at this second.' },
          { title: 'The Form', type: 'rule', content: 'I/you/we/they + base verb: "I work," "You eat," "We play," "They live." He/she/it + verb + s: "He works," "She eats," "It rains." Spelling rules for -s: Most verbs: add -s: work→works, eat→eats, play→plays. Verbs ending in -s, -sh, -ch, -x, -o: add -es: go→goes, wash→washes, watch→watches. Verbs ending in consonant + y: change y to -ies: study→studies, carry→carries. But vowel + y: just add -s: play→plays, enjoy→enjoys.' },
          { title: 'Examples', type: 'example', examples: ['I eat breakfast at 8 every morning.', 'She works in a hospital.', 'The shop closes at 9 p.m.', 'My parents live in a small town.'], analysis: 'Every sentence describes something regular or permanent. Notice "She works" has -s because the subject is "she" (third person singular).' },
          { title: 'Time Expressions', type: 'tip', content: 'These words often go with present simple: every day/week/month/year, always, usually, often, sometimes, rarely, never, on Mondays, in the morning/evening, at weekends. "I always drink tea in the morning." "She sometimes goes to the gym." "We never eat fast food."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct form.', question: '"My brother _____ (study) medicine at university."', answer: 'studies', answerExplanation: '"My brother" = he (third person singular). "Study" ends in consonant + y, so change y to -ies: "studies."' },
        ],
        keyTakeaways: ['I/you/we/they + base verb: "I work"', 'He/she/it + verb-s: "She works"', '-s, -sh, -ch, -x, -o → add -es: goes, watches', 'Consonant + y → -ies: studies, carries', 'Used for habits, routines, facts, permanent situations'],
        commonMistakes: ['"She work in a bank" → "She works in a bank" (needs -s)', '"He studys hard" → "He studies hard" (-y → -ies)', '"I am work every day" → "I work every day" (no "am" with action verbs)'],
        relatedLessons: ['a1-present-simple-negative', 'a1-present-simple-questions', 'a1-adverbs-frequency'],
      },

      // # ─── 5. Present Simple: Negatives ───
      {
        id: 'a1-present-simple-negative',
        title: 'Present Simple: Negative Sentences',
        description: 'Learn to say what you do NOT do — "I don\'t eat meat," "She doesn\'t drive."',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Form negative present simple sentences with don\'t and doesn\'t',
          'Remember to use the BASE verb after don\'t/doesn\'t',
          'Talk about things you never do or do not like',
        ],
        sections: [
          { title: 'How to Make Negatives', type: 'rule', content: 'I/you/we/they + do not (don\'t) + base verb: "I don\'t like coffee." "They don\'t live here." He/she/it + does not (doesn\'t) + base verb: "She doesn\'t speak French." "It doesn\'t matter." IMPORTANT: after "doesn\'t," the verb goes back to BASE form — no -s! "She doesn\'t work" NOT "She doesn\'t works."' },
          { title: 'Why No -s After Doesn\'t?', type: 'tip', content: 'The -s moves to the helper word: "She works" → "She doesn\'t work." The "does" already carries the third-person -s, so the main verb stays in its base form. Think of it like a seesaw — the -s can only be in one place.' },
          { title: 'Examples', type: 'example', examples: ['I don\'t eat meat — I\'m vegetarian.', 'She doesn\'t drive. She takes the bus.', 'We don\'t have any milk. Can you buy some?', 'He doesn\'t know the answer.'], analysis: 'Every sentence uses don\'t or doesn\'t + base verb. Notice "doesn\'t drive" (not "doesn\'t drives") and "doesn\'t know" (not "doesn\'t knows").' },
          { title: 'Test Yourself', type: 'exercise', content: 'Make this sentence negative.', question: '"He speaks Japanese."', answer: 'He doesn\'t speak Japanese.', answerExplanation: 'He = third person singular → use "doesn\'t." The verb "speaks" loses its -s and goes back to base form: "speak."' },
        ],
        keyTakeaways: ['I/you/we/they + don\'t + base verb', 'He/she/it + doesn\'t + base verb', 'After doesn\'t: NO -s on the verb — "doesn\'t work" not "doesn\'t works"', 'The -s moves from the verb to "does" — it can only be in one place'],
        commonMistakes: ['"She doesn\'t works here" → "She doesn\'t work here"', '"I not like it" → "I don\'t like it"', '"He don\'t know" → "He doesn\'t know" (he = doesn\'t)'],
        relatedLessons: ['a1-present-simple-positive', 'a1-present-simple-questions'],
      },

      // # ─── 6. Present Simple: Questions ───
      {
        id: 'a1-present-simple-questions',
        title: 'Present Simple: Asking Questions',
        description: 'Learn to ask "Do you...?" and "Does she...?" — the foundation of English conversation.',
        skill: 'grammar', level: 'A1', duration: 12,
        objectives: [
          'Form yes/no questions with Do/Does',
          'Form Wh- questions (What do you do?)',
          'Give short answers correctly',
          'Use question intonation naturally',
        ],
        sections: [
          { title: 'Yes/No Questions', type: 'rule', content: 'Do + I/you/we/they + base verb? "Do you like pizza?" "Do they live here?" Does + he/she/it + base verb? "Does she speak English?" "Does it work?" Again: base verb after does — no -s. "Does she like..." NOT "Does she likes..."' },
          { title: 'Short Answers', type: 'rule', content: 'Do not answer yes/no questions with just "Yes" or "No" — add the helper: "Do you like pizza?" → "Yes, I do." / "No, I don\'t." "Does she work here?" → "Yes, she does." / "No, she doesn\'t." This sounds more natural and polite than just "Yes" or "No."' },
          { title: 'Wh- Questions', type: 'rule', content: 'Wh- word + do/does + subject + base verb? What: "What do you do?" (= What is your job?) Where: "Where does she live?" When: "When do you start work?" Why: "Why do they always arrive late?" How: "How does this machine work?" Who (as object): "Who do you work with?"' },
          { title: 'Special Case: Who/What as Subject', type: 'tip', content: 'When "who" or "what" IS the subject (does the action), do NOT use do/does: "Who lives here?" (NOT "Who does live here?") "What happens next?" (NOT "What does happen next?") Compare: "Who do you like?" (you = subject, who = object → use do). "Who likes you?" (who = subject → no do).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Form a question from this answer.', question: 'Answer: "She works in a bank."', answer: 'Where does she work?', answerExplanation: 'We want to know the place → "Where." She = third person → "does." Base verb (no -s): "work." → "Where does she work?"' },
        ],
        keyTakeaways: ['Do + I/you/we/they + base verb?', 'Does + he/she/it + base verb? (no -s on the verb)', 'Short answers: "Yes, I do" / "No, she doesn\'t"', 'Who/What as subject → no do/does: "Who lives here?"'],
        commonMistakes: ['"Does she likes tea?" → "Does she like tea?"', '"Where she works?" → "Where does she work?"', '"Who does live here?" → "Who lives here?" (who is the subject)'],
        relatedLessons: ['a1-present-simple-positive', 'a1-present-simple-negative', 'a1-question-words'],
      },

      // # ─── 7. Question Words ───
      {
        id: 'a1-question-words',
        title: 'Question Words: Who, What, Where, When, Why, How',
        description: 'The six essential question words — learn when to use each one and build natural questions.',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Match each question word to the type of information it asks for',
          'Form questions with all six question words',
          'Use "How" with adjectives and adverbs (how old, how often)',
        ],
        sections: [
          { title: 'The Six Question Words', type: 'rule', content: 'Who = people: "Who is your teacher?" What = things, actions, ideas: "What is your name?" / "What do you do?" Where = places: "Where do you live?" When = time: "When is your birthday?" Why = reason: "Why are you late?" How = manner/way: "How do you get to work?"' },
          { title: 'How + Adjective/Adverb', type: 'rule', content: '"How" combines with other words to ask specific questions: How old: "How old are you?" (age) How much: "How much does it cost?" (price/quantity — uncountable) How many: "How many brothers do you have?" (quantity — countable) How often: "How often do you exercise?" (frequency) How long: "How long is the film?" (duration/length) How far: "How far is the station?" (distance)' },
          { title: 'Common Questions for Daily Life', type: 'example', examples: ['What time is it? / What time does the shop open?', 'Where is the nearest station?', 'How much is this? / How much does it cost?', 'Why is the school closed today?'], analysis: 'These are questions you will use every day. Practise them until they feel automatic — they are the building blocks of conversation.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose the correct question word.', question: '"_____ do you go to work?" — "By bus."', answer: 'How', answerExplanation: 'The answer "By bus" describes the WAY/METHOD of getting to work. "How" asks about the way something is done.' },
        ],
        keyTakeaways: ['Who = people, What = things, Where = places', 'When = time, Why = reason, How = manner', 'How + adjective: how old, how much, how many, how often, how long, how far'],
        commonMistakes: ['"What is your age?" → "How old are you?" (more natural)', '"How many does it cost?" → "How much does it cost?" (price = how much)'],
        relatedLessons: ['a1-present-simple-questions', 'a1-there-is-are'],
      },

      // # ─── 8. There Is / There Are ───
      {
        id: 'a1-there-is-are',
        title: 'There Is / There Are',
        description: 'Describe what exists in a place — "There is a park near my house," "There are three bedrooms."',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Use "there is" for singular and "there are" for plural',
          'Make negative sentences with there isn\'t / there aren\'t',
          'Ask questions with "Is there...?" / "Are there...?"',
          'Describe rooms, places, and situations',
        ],
        sections: [
          { title: 'There Is vs There Are', type: 'rule', content: 'There is (there\'s) + singular noun: "There is a cat in the garden." "There\'s a problem." There are + plural noun: "There are two banks on this street." "There are many students in the class." Use "there is" for uncountable nouns: "There is some milk in the fridge." "There is a lot of traffic today."' },
          { title: 'Negatives and Questions', type: 'rule', content: 'Negative: "There isn\'t a hospital near here." "There aren\'t any shops in this village." Questions: "Is there a supermarket nearby?" — "Yes, there is." / "No, there isn\'t." "Are there any restaurants?" — "Yes, there are." / "No, there aren\'t." "How many rooms are there?" — "There are five."' },
          { title: 'Describing Places', type: 'example', examples: ['In my town, there is a river and there are two bridges.', 'There are 30 students in my class, but there isn\'t a whiteboard.', 'Is there a toilet near here? — Yes, there is one on the second floor.'], analysis: 'Use "there is/are" when you first INTRODUCE something — to say it EXISTS. After introducing it, switch to "it is" or "they are": "There is a park near my house. It is very beautiful."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose "there is" or "there are."', question: '"_____ three cinemas in the city centre and _____ a big shopping mall too."', answer: 'There are ... there is', answerExplanation: '"Three cinemas" = plural → "there are." "A big shopping mall" = singular → "there is."' },
        ],
        keyTakeaways: ['There is + singular/uncountable: "There is a book."', 'There are + plural: "There are two books."', 'Questions: "Is there...?" / "Are there...?"', 'Use to introduce something for the first time'],
        commonMistakes: ['"There are a problem" → "There is a problem" (singular)', '"It has three rooms" → "There are three rooms" (use "there are" to introduce)', '"There is many people" → "There are many people" (plural)'],
        relatedLessons: ['a1-prepositions-place', 'a1-some-any'],
      },

      // # ─── 9. Prepositions of Place ───
      {
        id: 'a1-prepositions-place',
        title: 'Prepositions of Place: In, On, At, Under, Next to',
        description: 'Describe where things are — "The book is on the table," "She lives in London."',
        skill: 'grammar', level: 'A1', duration: 12,
        objectives: [
          'Use in, on, at for locations correctly',
          'Use under, behind, in front of, next to, between',
          'Describe where objects and people are',
          'Remember the key rules for in/on/at',
        ],
        sections: [
          { title: 'In, On, At — The Big Three', type: 'rule', content: 'IN = inside a space or area: "in the box," "in the room," "in London," "in Japan," "in the car." ON = on a surface or line: "on the table," "on the wall," "on the floor," "on the bus," "on Main Street." AT = at a specific point or place: "at the door," "at the bus stop," "at home," "at work," "at school," "at the airport."' },
          { title: 'Simple Rules', type: 'tip', content: 'For places: IN = countries and cities: "in France," "in Tokyo." ON = streets: "on Oxford Street." AT = addresses and specific places: "at 42 Park Road," "at the station." For transport: IN = cars and taxis: "in the car," "in a taxi." ON = buses, trains, planes, bikes: "on the bus," "on the train." AT = home, work, school (no "the"): "at home," "at work," "at school."' },
          { title: 'Other Position Words', type: 'rule', content: 'Under = below: "The cat is under the table." Behind = at the back of: "The garden is behind the house." In front of = at the front: "The car is in front of the building." Next to / beside = at the side: "The bank is next to the post office." Between = in the middle of two things: "The shop is between the café and the library." Above / over = higher than: "The picture is above the sofa." Near = close to: "The school is near the park."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with in, on, or at.', question: '"She lives _____ Tokyo, _____ a flat _____ the 5th floor."', answer: 'in ... in ... on', answerExplanation: '"In Tokyo" = in a city. "In a flat" = inside a space. "On the 5th floor" = on a level/surface.' },
        ],
        keyTakeaways: ['IN = inside (in the box, in London, in the car)', 'ON = surface (on the table, on the bus, on Main Street)', 'AT = point (at home, at work, at the station)', 'Under, behind, in front of, next to, between for positions'],
        commonMistakes: ['"I live at London" → "I live in London" (city = in)', '"She is in the bus" → "She is on the bus" (bus/train/plane = on)', '"He is in home" → "He is at home" (at home — no "the")'],
        relatedLessons: ['a1-there-is-are', 'a1-prepositions-time'],
      },

      // # ─── 10. Prepositions of Time ───
      {
        id: 'a1-prepositions-time',
        title: 'Prepositions of Time: In, On, At',
        description: 'Say when things happen — "at 9 o\'clock," "on Monday," "in January."',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Use at, on, in for different time expressions',
          'Remember the rules for clock times, days, months, and years',
          'Use no preposition with next, last, every, this',
        ],
        sections: [
          { title: 'At, On, In for Time', type: 'rule', content: 'AT = specific times and moments: "at 7 o\'clock," "at noon," "at midnight," "at lunchtime," "at night," "at the weekend" (British). ON = days and dates: "on Monday," "on Tuesdays," "on 25th December," "on my birthday," "on New Year\'s Day." IN = longer periods: "in January," "in summer," "in 2024," "in the morning," "in the afternoon," "in the evening." Note: "at night" but "in the morning/afternoon/evening."' },
          { title: 'No Preposition!', type: 'tip', content: 'Do NOT use a preposition with: next: "I\'ll see you next Monday." (NOT "on next Monday") last: "She arrived last week." (NOT "in last week") every: "I go swimming every Friday." (NOT "on every Friday") this: "We\'re leaving this afternoon." (NOT "in this afternoon") today/tomorrow/yesterday: "I have a meeting tomorrow." (NOT "on tomorrow")' },
          { title: 'Examples', type: 'example', examples: ['I wake up at 6:30 in the morning.', 'Her birthday is on 14th March.', 'We go on holiday in August.', 'The shop is closed at night.'], analysis: 'Notice the pattern from small to large: AT = point in time (clock), ON = day/date, IN = month/year/period. The exception is "at night" (treated as a point, not a period).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with at, on, in, or no preposition (Ø).', question: '"I have English class _____ Tuesdays _____ the morning. But _____ next Tuesday, I have a dentist appointment _____ 10:30."', answer: 'on ... in ... Ø ... at', answerExplanation: '"On Tuesdays" = day. "In the morning" = period. "Next Tuesday" = no preposition. "At 10:30" = specific time.' },
        ],
        keyTakeaways: ['AT = clock times, night, weekend: "at 9 o\'clock"', 'ON = days and dates: "on Monday," "on 25th March"', 'IN = months, years, seasons, morning/afternoon/evening', 'No preposition with next, last, every, this, tomorrow'],
        commonMistakes: ['"In Monday" → "On Monday" (days = on)', '"On 2024" → "In 2024" (years = in)', '"On next week" → "Next week" (no preposition with next)'],
        relatedLessons: ['a1-prepositions-place', 'a1-telling-time'],
      },

      // # ─── 11. Plurals ───
      {
        id: 'a1-plurals',
        title: 'Plurals: How to Make Nouns Plural',
        description: 'One book, two books — learn all the rules for making English nouns plural, including irregular forms.',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Add -s or -es to regular nouns correctly',
          'Handle special endings: -y, -f/-fe, -o',
          'Memorise common irregular plurals',
          'Know which nouns are uncountable (no plural)',
        ],
        sections: [
          { title: 'Regular Plurals', type: 'rule', content: 'Most nouns: add -s: book→books, car→cars, day→days. Nouns ending in -s, -sh, -ch, -x, -z: add -es: bus→buses, dish→dishes, watch→watches, box→boxes. Nouns ending in consonant + y: change y to -ies: city→cities, baby→babies, country→countries. But vowel + y: just -s: boy→boys, key→keys, day→days. Nouns ending in -f/-fe: change to -ves: knife→knives, wife→wives, leaf→leaves, life→lives. But: roof→roofs, chef→chefs (some exceptions).' },
          { title: 'Irregular Plurals', type: 'rule', content: 'These common nouns do NOT follow any pattern — memorise them: man→men, woman→women, child→children, person→people, tooth→teeth, foot→feet, mouse→mice, sheep→sheep (no change!), fish→fish (no change!), deer→deer (no change!).' },
          { title: 'Uncountable Nouns', type: 'tip', content: 'Some nouns have NO plural form because they are uncountable: water, milk, bread, rice, money, information, advice, furniture, luggage, weather, news, homework. You CANNOT say "informations," "advices," or "furnitures." To count them, use a container word: "a glass of water," "a piece of advice," "two slices of bread," "a piece of furniture."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Write the plural.', question: 'child, city, sheep, knife, box', answer: 'children, cities, sheep, knives, boxes', answerExplanation: 'child→children (irregular), city→cities (-y→-ies), sheep→sheep (no change), knife→knives (-fe→-ves), box→boxes (-x→-es).' },
        ],
        keyTakeaways: ['Most nouns: add -s (books, cars)', '-s/-sh/-ch/-x: add -es (buses, watches)', 'Consonant + y: change to -ies (cities)', '-f/-fe: change to -ves (knives, lives)', 'Irregular: man→men, child→children, person→people', 'Uncountable nouns have no plural (information, advice, furniture)'],
        commonMistakes: ['"Two childs" → "Two children"', '"Many informations" → "A lot of information" (uncountable)', '"Citys" → "Cities" (-y→-ies)', '"Boxs" → "Boxes" (-x→-es)'],
        relatedLessons: ['a1-some-any', 'a1-countable-uncountable'],
      },

      // # ─── 12. Some & Any ───
      {
        id: 'a1-some-any',
        title: 'Some & Any',
        description: 'Learn when to use "some" and when to use "any" — essential for talking about quantities.',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Use "some" in positive sentences',
          'Use "any" in negatives and questions',
          'Handle the exceptions (offers and requests use "some")',
        ],
        sections: [
          { title: 'The Basic Rule', type: 'rule', content: 'SOME = positive sentences: "I have some friends in London." "There is some milk in the fridge." "She bought some new clothes." ANY = negative sentences: "I don\'t have any money." "There aren\'t any shops near here." ANY = questions: "Do you have any questions?" "Is there any coffee left?"' },
          { title: 'The Exception', type: 'tip', content: 'Use SOME (not any) in questions when you OFFER something or REQUEST something: Offers: "Would you like some coffee?" "Can I get you some water?" Requests: "Can I have some sugar, please?" "Could you give me some information?" Why? Because you EXPECT the answer to be yes — you are not asking whether it exists, you are offering or requesting.' },
          { title: 'Some/Any with Countable and Uncountable', type: 'example', examples: ['I need some eggs. (countable plural)', 'We don\'t have any sugar. (uncountable)', 'Are there any good restaurants here? (countable plural)', 'Would you like some tea? (uncountable — offer)'], analysis: '"Some" and "any" work with both countable plurals AND uncountable nouns. Never with singular countable: "I need a pen" (not "some pen").' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose "some" or "any."', question: '"Would you like _____ cake? I made it this morning. I hope there isn\'t _____ problem with the recipe."', answer: 'some ... any', answerExplanation: '"Would you like some cake?" = an offer (expect yes → some). "I hope there isn\'t any problem" = negative → any.' },
        ],
        keyTakeaways: ['Some = positive sentences', 'Any = negative sentences and questions', 'Exception: offers and requests use "some"', 'Both work with countable plural and uncountable nouns'],
        commonMistakes: ['"I don\'t have some money" → "I don\'t have any money"', '"Do you want any coffee?" (offering) → "Would you like some coffee?"', '"I need some pen" → "I need a pen" (singular countable = a/an)'],
        relatedLessons: ['a1-plurals', 'a1-countable-uncountable'],
      },

      // # ─── 13. Countable & Uncountable ───
      {
        id: 'a1-countable-uncountable',
        title: 'Countable & Uncountable Nouns',
        description: 'Why can you say "two books" but not "two informations"? Learn the difference.',
        skill: 'grammar', level: 'A1', duration: 12,
        objectives: [
          'Identify countable and uncountable nouns',
          'Use a/an, some, much, many, a lot of correctly',
          'Count uncountable nouns using container words',
          'Avoid the most common uncountable noun errors',
        ],
        sections: [
          { title: 'What Is the Difference?', type: 'text', content: 'Countable nouns are things you can count: one apple, two apples, three apples. They have a singular and plural form. Uncountable nouns are things you CANNOT count individually: water, music, information. They have NO plural form and you cannot use a/an with them. Think of it this way: if you can put a number before it (1, 2, 3...), it is countable. If you cannot, it is uncountable.' },
          { title: 'Common Uncountable Nouns', type: 'rule', content: 'Liquids: water, milk, coffee, tea, juice, oil. Food (mass): bread, rice, pasta, cheese, meat, fruit, sugar, salt. Materials: wood, glass, paper, gold, plastic. Abstract: information, advice, news, knowledge, homework, work, money, music, traffic, weather, furniture, luggage, equipment. These NEVER take "a/an" and NEVER become plural.' },
          { title: 'Much, Many, A Lot Of', type: 'rule', content: 'Much + uncountable (negatives/questions): "I don\'t have much time." "How much water do you need?" Many + countable plural (negatives/questions): "There aren\'t many students today." "How many brothers do you have?" A lot of + both (positive): "She has a lot of friends." "There is a lot of traffic."' },
          { title: 'Counting Uncountable Nouns', type: 'tip', content: 'Use a container or unit word: a glass/bottle/cup of water, a slice/piece/loaf of bread, a piece of advice/information/furniture/news, a bar of chocolate/soap, a bag of rice/sugar, a tube of toothpaste. "Can I have two pieces of information?" NOT "two informations."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Correct the error.', question: '"She gave me a very good advice and many informations about the course."', answer: '"She gave me some very good advice and a lot of information about the course."', answerExplanation: '"Advice" and "information" are uncountable — no "a" and no plural. Use "some" + uncountable and "a lot of" instead of "many."' },
        ],
        keyTakeaways: ['Countable: has plural, uses a/an and many', 'Uncountable: no plural, no a/an, uses much', 'A lot of works with both types', 'Common uncountable: information, advice, news, money, furniture, luggage', 'Count uncountable with containers: "a piece of advice"'],
        commonMistakes: ['"I need an advice" → "I need some advice"', '"Two breads" → "Two slices of bread"', '"How many money?" → "How much money?"', '"Many traffic" → "A lot of traffic"'],
        relatedLessons: ['a1-some-any', 'a1-plurals'],
      },
    ],
  },
]
