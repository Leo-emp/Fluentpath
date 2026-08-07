// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 2: Advanced Grammar + Exam Technique Lessons (B2–C2)
// # ═══════════════════════════════════════════════════════════════════════════
// # Extends the lesson library with advanced structures, pronunciation,
// # collocations, error correction, and IELTS listening strategy.
// # All content is original and copyright-free.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_2: LessonCategory[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # CATEGORY: ADVANCED STRUCTURES
  // # ═══════════════════════════════════════════════════════════════════
  {
    id: 'advanced-structures',
    name: 'Advanced Structures',
    description: 'Sophisticated grammar patterns for B2–C2 learners — reported speech, inversion, cleft sentences, and more.',
    icon: '🔬',
    lessons: [

      // # ─── Reported Speech ───
      {
        id: 'reported-speech-lesson',
        title: 'Reported Speech: What Did They Say?',
        description: 'Master direct to indirect speech transformations — tense changes, pronoun shifts, and reporting verbs.',
        skill: 'grammar',
        level: 'B2',
        duration: 18,
        objectives: [
          'Transform direct speech into reported speech correctly',
          'Apply tense backshift rules and know when to skip them',
          'Use a variety of reporting verbs beyond "said" and "told"',
          'Report questions, commands, and requests',
        ],
        sections: [
          {
            title: 'What is Reported Speech?',
            type: 'text',
            content: 'When you repeat what someone said, you have two options. Direct speech uses the exact words in quotation marks: She said, "I am tired." Reported speech (indirect speech) rephrases it without quotation marks: She said that she was tired. The main changes are: tense goes back one step (am → was), pronouns change (I → she), and time/place references shift (today → that day, here → there).',
          },
          {
            title: 'Tense Backshift Rules',
            type: 'rule',
            content: 'When the reporting verb is past tense (said, told, explained), shift the original tense back: Present simple → Past simple: "I work" → she said she worked. Present continuous → Past continuous: "I am working" → she said she was working. Past simple → Past perfect: "I worked" → she said she had worked. Present perfect → Past perfect: "I have worked" → she said she had worked. Will → Would: "I will go" → she said she would go. Can → Could: "I can swim" → she said she could swim. Must → Had to: "I must leave" → she said she had to leave. Exception: Past perfect does NOT change — it stays past perfect.',
          },
          {
            title: 'When NOT to Backshift',
            type: 'tip',
            content: 'You do NOT need to backshift when: 1) The reporting verb is present tense: She says she is tired. (no change needed). 2) The information is still true now: He said the Earth is round. (general truth — backshift optional). 3) You are reporting very recent speech and the situation has not changed: "She said she\'s coming at 3." (still true right now). In real conversation, native speakers often skip backshift when the situation has not changed. In exams, always apply the backshift rules to be safe.',
          },
          {
            title: 'Reporting Verbs Beyond "Said"',
            type: 'rule',
            content: 'Using only "said" and "told" sounds repetitive. Upgrade: Neutral: mentioned, stated, explained, pointed out, noted, commented, remarked. Agreeing: agreed, admitted, acknowledged, accepted. Disagreeing: denied, refused, objected, argued. Advising: advised, recommended, suggested, urged, warned. Promising: promised, guaranteed, assured. Patterns: "She suggested going to the cinema." (suggest + gerund). "He advised me to see a doctor." (advise + object + infinitive). "They denied stealing the money." (deny + gerund).',
          },
          {
            title: 'Reporting Questions',
            type: 'example',
            examples: [
              'Direct: "Where do you live?" → Reported: She asked me where I lived. (no question mark, normal word order)',
              'Direct: "Are you coming?" → Reported: He asked if/whether I was coming. (yes/no questions use if/whether)',
            ],
            analysis: 'Two key changes for reported questions: 1) Word order becomes STATEMENT order (subject before verb): "where I lived" NOT "where did I live." 2) Yes/no questions need "if" or "whether": "He asked if I was coming." No question mark at the end — it is no longer a question.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Convert to reported speech.',
            question: '"I have never been to Japan," she said.',
            answer: 'She said (that) she had never been to Japan.',
            answerExplanation: 'Present perfect ("have been") backshifts to past perfect ("had been"). "I" changes to "she." "That" is optional in spoken English.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Report this question.',
            question: '"Can you help me with this?" he asked.',
            answer: 'He asked if/whether I could help him with that.',
            answerExplanation: 'Yes/no question → "asked if/whether." "Can" → "could" (backshift). "You" → "I" and "me" → "him." "This" → "that" (proximity shift). Statement word order: "I could help."',
          },
        ],
        keyTakeaways: [
          'Backshift tenses one step when reporting verb is past',
          'Change pronouns and time/place markers accordingly',
          'Questions: use statement word order + if/whether for yes/no questions',
          'Use varied reporting verbs: suggested, admitted, warned, denied',
          'Do not backshift general truths or very recent speech',
        ],
        commonMistakes: [
          '"She asked where did I live" → "She asked where I lived" (statement word order)',
          '"He said me" → "He told me" (say + to someone or tell + someone)',
          '"She suggested to go" → "She suggested going" (suggest + gerund)',
          'Forgetting to change "this/here/today" → "that/there/that day"',
        ],
        relatedLessons: ['passive-voice-lesson', 'conditionals-lesson'],
      },

      // # ─── Inversion for Emphasis ───
      {
        id: 'inversion-lesson',
        title: 'Inversion: Advanced Emphasis Structures',
        description: 'Use inverted word order for dramatic emphasis — a hallmark of C1/C2 level English.',
        skill: 'grammar',
        level: 'C1',
        duration: 16,
        objectives: [
          'Understand why English uses inversion for emphasis',
          'Form inverted sentences with negative adverbials',
          'Use "Not only...but also," "Hardly...when," "No sooner...than"',
          'Recognise inversion in formal writing and academic texts',
        ],
        sections: [
          {
            title: 'What is Inversion?',
            type: 'text',
            content: 'Normal English word order is Subject + Verb + Object: "She has never seen such a beautiful sunset." Inversion flips the subject and auxiliary verb: "Never has she seen such a beautiful sunset." Why? For EMPHASIS and DRAMA. The inverted version sounds more powerful, more literary, more formal. It is common in academic writing, formal speeches, and journalism. It is also tested at C1/C2 levels and in Cambridge Advanced/Proficiency exams.',
          },
          {
            title: 'Negative Adverbials That Trigger Inversion',
            type: 'rule',
            content: 'When a NEGATIVE or RESTRICTIVE adverbial starts the sentence, the subject and auxiliary verb SWAP: Never have I seen... Rarely does she complain... Seldom do they visit... Not only did he finish, but he also won. Hardly had I sat down when the phone rang. No sooner had I arrived than the meeting started. Under no circumstances should you open that door. At no point did he apologise. Only after the meeting did I understand. Little did they know what was about to happen.',
          },
          {
            title: 'Forming Inverted Sentences',
            type: 'example',
            examples: [
              'Normal: "I had never seen such chaos." → Inverted: "Never had I seen such chaos."',
              'Normal: "She not only passed but also got the highest score." → Inverted: "Not only did she pass, but she also got the highest score."',
              'Normal: "I had hardly finished eating when the alarm went off." → Inverted: "Hardly had I finished eating when the alarm went off."',
            ],
            analysis: 'The pattern is always: Negative adverbial + auxiliary verb + subject + main verb. If there is no auxiliary in the original sentence, add "do/does/did": "She rarely complains" → "Rarely does she complain." The auxiliary carries the tense; the main verb goes to base form.',
          },
          {
            title: 'Common Patterns to Memorise',
            type: 'tip',
            content: 'These paired structures appear frequently in exams: "Not only...but also": "Not only did she apologise, but she also offered compensation." "Hardly/Scarcely...when": "Hardly had we left when it started raining." "No sooner...than": "No sooner had I closed the door than the phone rang." "Only when/after/if": "Only when you experience it yourself do you truly understand." "Not until": "Not until I read the report did I realise the scale of the problem." Practise these as fixed patterns — they appear repeatedly in exams.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Rewrite with inversion for emphasis.',
            question: '"She has rarely made such a serious mistake."',
            answer: 'Rarely has she made such a serious mistake.',
            answerExplanation: '"Rarely" is a negative adverbial — move it to the front and swap "she" with "has": "Rarely has she made such a serious mistake."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Rewrite using "Not only...but also" with inversion.',
            question: '"He lost his job and his house."',
            answer: 'Not only did he lose his job, but he also lost his house.',
            answerExplanation: '"Not only" triggers inversion: "Not only did he lose..." (add "did," verb to base form). The second part uses normal word order: "but he also lost."',
          },
        ],
        keyTakeaways: [
          'Inversion = swap subject and auxiliary for emphasis',
          'Triggered by negative/restrictive adverbials at the start of a sentence',
          'Pattern: Never/Rarely/Seldom + auxiliary + subject + main verb',
          'If no auxiliary exists, add do/does/did',
          'Memorise paired patterns: Not only...but also, Hardly...when, No sooner...than',
          'Used in formal writing, journalism, and C1/C2 exams',
        ],
        commonMistakes: [
          '"Never I have seen" → "Never have I seen" (auxiliary before subject)',
          '"Not only she passed" → "Not only did she pass" (must invert)',
          '"Hardly I had finished" → "Hardly had I finished" (swap "I" and "had")',
          'Using inversion in casual speech (too formal — save for writing/exams)',
        ],
        relatedLessons: ['reported-speech-lesson', 'formal-register-lesson'],
      },

      // # ─── Articles Masterclass ───
      {
        id: 'articles-masterclass',
        title: 'Articles: A, An, The, and Zero Article',
        description: 'The most common source of errors for non-native speakers — master the English article system once and for all.',
        skill: 'grammar',
        level: 'B1',
        duration: 18,
        objectives: [
          'Choose between a/an, the, and no article correctly',
          'Understand "first mention" vs "second mention" logic',
          'Handle tricky cases: uncountable nouns, generalisations, unique nouns',
          'Apply article rules to academic and everyday English',
        ],
        sections: [
          {
            title: 'Why Are Articles So Difficult?',
            type: 'text',
            content: 'Many languages do not have articles at all (Chinese, Japanese, Russian, Thai, Hindi). Others have them but use them differently (French, Arabic, German). English articles are small words — a, an, the — but they carry important meaning. The difference between "I saw a dog" and "I saw the dog" is: do you and your listener both know WHICH dog? "A" = any dog, not specific. "The" = you both know which one. This "shared knowledge" concept is the key to the entire article system.',
          },
          {
            title: 'A/An — The Indefinite Article',
            type: 'rule',
            content: '"A" and "an" mean "one" or "any." Use when: The noun is mentioned for the FIRST TIME and the listener does not know which one. Countable, singular nouns only — never with uncountable or plural nouns. "A" before consonant sounds: a car, a university (starts with /j/ sound), a European. "An" before vowel sounds: an apple, an hour (silent h), an MBA (starts with /e/ sound). Note: it is about the SOUND, not the spelling. "An hour" (silent h) but "a hotel" (pronounced h).',
          },
          {
            title: 'The — The Definite Article',
            type: 'rule',
            content: 'Use "the" when both speaker and listener know WHICH specific thing. This happens when: 1) Second mention: "I bought a book. The book was expensive." (now we both know which book). 2) Unique things: the sun, the moon, the internet, the government, the president. 3) Superlatives: the best, the tallest, the most interesting. 4) Context makes it clear: "Close the door" (we both see which door). 5) Defining clause: "The man who called you." (the clause tells us which man). 6) Shared knowledge: "I\'m going to the bank" (the one we both know — our local branch).',
          },
          {
            title: 'Zero Article — No Article at All',
            type: 'rule',
            content: 'Use NO article for: 1) Uncountable nouns in general: "Water is essential for life" NOT "The water is essential." 2) Plural nouns in general: "Dogs are loyal animals" NOT "The dogs are loyal animals." 3) Most proper nouns: countries (France, Japan), cities (London), people (Sarah), languages (English). 4) Meals: breakfast, lunch, dinner ("Let\'s have lunch"). 5) School/work/home/bed as concepts: "She goes to school" (as a student). BUT "She went to the school" (as a visitor, to the building).',
          },
          {
            title: 'The Generalisation Test',
            type: 'tip',
            content: 'If you are talking about something IN GENERAL (all of them, the whole category), use zero article or a/an for singular. "I love music" = music in general (no article). "I love the music" = specific music (that music playing right now). "A dog is a faithful animal" = dogs in general (any dog represents the category). "The dog is a faithful animal" = also general, but more formal/scientific. "Dogs are faithful animals" = general, plural (most natural in conversation).',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose: a, an, the, or no article (Ø).',
            question: '"I need to buy ___ new laptop. ___ one I have is too slow."',
            answer: 'a ... The',
            answerExplanation: '"A new laptop" — first mention, any laptop, not specific yet. "The one I have" — now it is specific (the one you already own). This is the classic first mention (a) → second mention (the) pattern.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose: a, an, the, or no article (Ø).',
            question: '"___ education is ___ key to ___ success."',
            answer: 'Ø ... the ... Ø',
            answerExplanation: '"Education" = general concept (no article). "The key" = specific (there is one key). "Success" = general concept (no article). General abstract nouns do not take articles.',
          },
        ],
        keyTakeaways: [
          'A/an = not specific, first mention, any one of a category',
          'The = specific, both speaker and listener know which one',
          'Zero article = general statements, abstract concepts, most proper nouns',
          'A vs an depends on the SOUND, not the spelling (an hour, a university)',
          'First mention → a/an; Second mention → the',
          'General statements: "Music is..." not "The music is..."',
        ],
        commonMistakes: [
          '"I like the music" (meaning in general) → "I like music"',
          '"She goes to the school" (as a student) → "She goes to school"',
          '"I need a advice" → "I need advice" (uncountable — no "a")',
          '"An university" → "A university" (starts with /j/ sound)',
          '"I bought the car yesterday" (first mention, listener doesn\'t know) → "I bought a car yesterday"',
        ],
        relatedLessons: ['present-tenses', 'relative-clauses-lesson'],
      },
    ],
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # CATEGORY: SKILLS & FLUENCY
  // # ═══════════════════════════════════════════════════════════════════
  {
    id: 'skills-fluency',
    name: 'Skills & Fluency',
    description: 'Go beyond grammar — collocations, pronunciation, error correction, and IELTS Listening strategies.',
    icon: '🗣️',
    lessons: [

      // # ─── Collocations ───
      {
        id: 'collocations-lesson',
        title: 'Collocations: Natural Word Partnerships',
        description: 'Learn which words go together naturally — "make a decision" not "do a decision."',
        skill: 'vocabulary',
        level: 'B1',
        duration: 14,
        objectives: [
          'Understand what collocations are and why they matter',
          'Master the most common make/do, have/take, get/give collocations',
          'Sound more natural by using the right word combinations',
          'Build collocation awareness as a learning habit',
        ],
        sections: [
          {
            title: 'What Are Collocations?',
            type: 'text',
            content: 'A collocation is a pair (or group) of words that native speakers always use together. They COULD use other words, but they do not — it sounds wrong. You "make a mistake" — never "do a mistake." You take a photo" — never "make a photo." You "heavy rain" — never "strong rain." There is no grammar rule for this. It is simply how English works. Learning collocations is what makes the difference between "correct English" and "natural English."',
          },
          {
            title: 'Make vs Do',
            type: 'rule',
            content: 'MAKE (= creating or producing something): make a decision, make a mistake, make progress, make money, make an effort, make a complaint, make a suggestion, make a plan, make an appointment, make friends, make a promise, make a phone call, make breakfast/lunch/dinner. DO (= performing an activity or task): do homework, do the washing, do the housework, do business, do research, do a favour, do damage, do your best, do an exam, do exercise, do the shopping, do a course.',
          },
          {
            title: 'Have, Take, Get, Give',
            type: 'rule',
            content: 'HAVE: have a shower/bath, have breakfast/lunch/dinner, have a conversation, have a meeting, have a problem, have fun, have a good time, have an argument, have a look. TAKE: take a photo, take a break, take a shower, take notes, take a seat, take a taxi, take a risk, take responsibility, take action, take an exam. GET: get a job, get angry, get better/worse, get married, get lost, get ready, get started, get permission, get a degree. GIVE: give advice, give permission, give a speech, give a presentation, give someone a hand, give an answer, give someone a call.',
          },
          {
            title: 'Adjective + Noun Collocations',
            type: 'example',
            examples: [
              'heavy rain (NOT strong rain), heavy traffic (NOT big traffic)',
              'strong wind (NOT heavy wind), strong coffee (NOT powerful coffee)',
              'fast food (NOT quick food), fast asleep (NOT deeply asleep)',
              'high temperature (NOT tall temperature), high quality (NOT big quality)',
            ],
            analysis: 'These are the trickiest collocations because in other languages the "wrong" word might be perfectly natural. There is no logic — you must learn them as pairs. The good news: once you learn common ones, your English immediately sounds more natural.',
          },
          {
            title: 'Building Collocation Awareness',
            type: 'tip',
            content: 'When you learn a new word, ALWAYS learn what goes WITH it. Do not just learn "decision" — learn "make a decision, a difficult decision, reach a decision, the right/wrong decision." Keep a collocation notebook: group words by their common partners. When reading in English, notice unusual pairings and write them down. Dictionaries like the Oxford Collocations Dictionary show which words go together. This is more valuable than learning more individual words.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose "make" or "do."',
            question: '"She needs to _____ a decision about her career."',
            answer: 'make',
            answerExplanation: '"Make a decision" is the correct collocation. We create decisions (make), we do not perform them (do). Also: "make up your mind" = make a decision.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Choose the correct adjective.',
            question: '"We had _____ (heavy/strong) traffic on the way to work."',
            answer: 'heavy',
            answerExplanation: '"Heavy traffic" is the natural collocation. "Strong traffic" sounds unnatural to native speakers. Also: "heavy rain," "heavy smoker," "heavy workload."',
          },
        ],
        keyTakeaways: [
          'Collocations = words that naturally go together in English',
          'Make = creating (make a decision, make money, make progress)',
          'Do = performing (do homework, do research, do business)',
          'Learn words WITH their collocations, not in isolation',
          'Collocations are the difference between correct and natural English',
        ],
        commonMistakes: [
          '"Do a mistake" → "Make a mistake"',
          '"Make homework" → "Do homework"',
          '"Strong rain" → "Heavy rain"',
          '"Make a photo" → "Take a photo"',
          '"Big speed" → "High speed"',
        ],
        relatedLessons: ['formal-register-lesson', 'error-correction-lesson'],
      },

      // # ─── Error Correction ───
      {
        id: 'error-correction-lesson',
        title: 'Common English Errors: Find and Fix',
        description: 'The 20 most frequent mistakes learners make — and how to correct them permanently.',
        skill: 'grammar',
        level: 'B1',
        duration: 16,
        objectives: [
          'Identify the 20 most common grammar and vocabulary errors',
          'Understand WHY each error happens (not just the correction)',
          'Build self-correction habits for writing and speaking',
          'Spot errors in practice sentences and fix them',
        ],
        sections: [
          {
            title: 'Why Do Errors Persist?',
            type: 'text',
            content: 'Most learners make the same 20 errors over and over. These errors "fossilise" — they become habits that are hard to break. The reason is that learners know the RULE but do not apply it in real time. To fix an error permanently, you need three things: 1) Know the correct form, 2) Understand WHY the error happens (usually mother-tongue interference), 3) Practise until the correct form becomes automatic.',
          },
          {
            title: 'Subject-Verb Agreement',
            type: 'rule',
            content: 'Error: "She don\'t like coffee." / "The news are bad." Fix: "She doesn\'t like coffee." / "The news is bad." Rule: Third person singular (he/she/it) needs -s on the verb OR "does/doesn\'t" with base verb. Uncountable nouns (news, information, advice, furniture, money) are SINGULAR: "The information is correct" NOT "The information are correct." "Everyone/everybody/someone/nobody" are grammatically SINGULAR: "Everyone is here" NOT "Everyone are here."',
          },
          {
            title: 'Countable vs Uncountable',
            type: 'rule',
            content: 'Error: "I need an advice." / "She has many informations." Fix: "I need some advice." / "She has a lot of information." Rule: Uncountable nouns cannot take "a/an" or be made plural. Common uncountable nouns that learners mistakenly make plural: advice (NOT advices), information (NOT informations), furniture (NOT furnitures), research (NOT researches), luggage (NOT luggages), equipment (NOT equipments), knowledge (NOT knowledges). To count these, use: a piece of advice, two items of furniture, some information.',
          },
          {
            title: 'Preposition Errors',
            type: 'rule',
            content: 'These prepositions are different from most other languages: "Depend ON" (NOT depend of/from): "It depends on the weather." "Interested IN" (NOT interested for/to): "I\'m interested in history." "Good AT" (NOT good in): "She\'s good at maths." "Listen TO" (NOT listen —): "Listen to the teacher." "Arrive IN" a city/country, "arrive AT" a building: "arrive in London," "arrive at the hotel." "Married TO" (NOT married with): "She\'s married to a doctor." "Responsible FOR" (NOT responsible of): "Who is responsible for this?"',
          },
          {
            title: 'Common Word Confusion',
            type: 'example',
            examples: [
              'bored vs boring: "I\'m bored" (I feel boredom) vs "The film is boring" (it causes boredom)',
              'fun vs funny: "The party was fun" (enjoyable) vs "The joke was funny" (made me laugh)',
              'say vs tell: "She said (that) she was tired" vs "She told me (that) she was tired"',
              'make vs do: "make a mistake" vs "do homework" (see Collocations lesson)',
            ],
            analysis: '-ed adjectives describe how you FEEL (bored, tired, interested, excited). -ing adjectives describe what CAUSES the feeling (boring, tiring, interesting, exciting). "I am interesting" means people find YOU fascinating. "I am interested" means YOU find something fascinating.',
          },
          {
            title: 'The Missing "The" / Extra "The"',
            type: 'tip',
            content: 'Missing "the": "I went to hospital" means as a patient (British). "I went to the hospital" means to visit the building. Both are correct but mean different things. Extra "the": "The life is beautiful" (general) → "Life is beautiful." "I like the music" (general) → "I like music." "The people are friendly" (general) → "People are friendly." Rule: general statements about uncountable/plural nouns do NOT take "the."',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Find and fix the error.',
            question: '"Everyone were happy with the result and they wanted to celebrate."',
            answer: '"Everyone was happy with the result and they wanted to celebrate."',
            answerExplanation: '"Everyone" is grammatically SINGULAR (even though it refers to many people). It takes "was" not "were." However, the pronoun "they" is acceptable for referring back to "everyone" — this is standard modern English.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Find and fix the error.',
            question: '"She gave me a very useful advice about my career."',
            answer: '"She gave me some very useful advice about my career." (or "a very useful piece of advice")',
            answerExplanation: '"Advice" is uncountable — you cannot say "a advice" or "advices." Use "some advice" or "a piece of advice." Other uncountable nouns that trick learners: information, furniture, luggage, research.',
          },
        ],
        keyTakeaways: [
          'Third person singular: he/she/it + verb-s, or does/doesn\'t + base',
          'Uncountable nouns: no a/an, no plural — advice, information, furniture',
          '-ed = how you feel (bored); -ing = what causes it (boring)',
          'Prepositions must be memorised: depend ON, interested IN, good AT',
          'General statements: no "the" — "Life is beautiful" not "The life is beautiful"',
        ],
        commonMistakes: [
          '"She don\'t like it" → "She doesn\'t like it"',
          '"I need informations" → "I need information"',
          '"I am very interesting in science" → "I am very interested in science"',
          '"It depends of the weather" → "It depends on the weather"',
          '"The life is short" → "Life is short" (general statement)',
        ],
        relatedLessons: ['articles-masterclass', 'collocations-lesson', 'present-tenses'],
      },

      // # ─── IELTS Listening Strategy ───
      {
        id: 'ielts-listening-strategy',
        title: 'IELTS Listening: All Four Sections',
        description: 'What to expect in each Listening section, how to prepare, and techniques for catching every answer.',
        skill: 'listening',
        level: 'B1',
        duration: 16,
        objectives: [
          'Understand the format and difficulty progression of all 4 sections',
          'Predict answers before listening using context clues',
          'Handle distractors — answers that sound right but are wrong',
          'Manage the "you only hear it once" challenge',
        ],
        sections: [
          {
            title: 'The Listening Test Format',
            type: 'text',
            content: 'The IELTS Listening test has 4 sections, each with 10 questions, played ONCE. The recording moves from easiest to hardest: Section 1 — two speakers, everyday social context (booking a hotel, joining a gym). Section 2 — one speaker, everyday social context (a tour guide, a radio announcement). Section 3 — two to four speakers, academic context (students discussing an assignment). Section 4 — one speaker, academic lecture (university-level talk on a topic). You have about 30 minutes of listening plus 10 minutes to transfer answers to the answer sheet.',
          },
          {
            title: 'Before You Listen: Read and Predict',
            type: 'tip',
            content: 'You get time before each section to read the questions. USE THIS TIME. Read every question and predict what type of answer you need: a number? a name? an adjective? a place? For form-filling questions, predict what information goes in each blank: "Name: ____" = a name. "Date of birth: ____" = a date. "Membership type: ____" = probably "standard/premium/gold." Prediction narrows your focus so you catch the answer when you hear it.',
          },
          {
            title: 'Watch Out for Distractors',
            type: 'rule',
            content: 'Distractors are wrong answers that the recording deliberately puts before the correct one. Example: "The meeting was originally scheduled for Tuesday, but it has been moved to Wednesday." If the question asks "When is the meeting?", "Tuesday" is the distractor — "Wednesday" is the correct answer. Common distractor patterns: Speaker says one thing then corrects themselves ("Actually, no, it\'s..."). Speaker considers multiple options then chooses one. Two speakers disagree and one final answer emerges. Always listen for correction phrases: "actually," "no wait," "I mean," "let me check — yes, it\'s..."',
          },
          {
            title: 'Section-by-Section Strategy',
            type: 'rule',
            content: 'Section 1 (easiest): Focus on NUMBERS, NAMES, and SPELLINGS. Speakers often spell out names and repeat numbers. Write exactly what you hear. Section 2: Focus on KEY FACTS. The speaker gives a lot of information — you need to match it to the questions. Section 3: Multiple speakers — identify WHO says WHAT. Track the discussion and note when speakers agree/disagree. Section 4 (hardest): Academic lecture with no pauses. Read ALL 10 questions before it starts. This section requires concentration and fast writing.',
          },
          {
            title: 'Spelling and Transfer Tips',
            type: 'tip',
            content: 'Spelling matters — a misspelled answer is WRONG. Common problem areas: double letters (accommodation, committee, beginning), silent letters (Wednesday, psychology, receipt). At the end, you get 10 minutes to transfer answers. Use this time to: check spelling, ensure you have written EXACTLY the right number of words (if the instruction says "no more than two words"), capitalise proper nouns, and double-check your numbering (make sure question 15 is in box 15).',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'Identify the distractor.',
            question: 'You hear: "I thought the concert started at 7, but actually it\'s at 7:30." The question asks: "What time does the concert start?"',
            answer: '7:30. The distractor is 7 (the speaker corrects themselves with "but actually").',
            answerExplanation: '"But actually" signals the correction — the first answer (7) is wrong, and the corrected answer (7:30) is the one to write. Always listen for these self-correction phrases.',
          },
        ],
        keyTakeaways: [
          '4 sections, 10 questions each, played ONCE, easiest to hardest',
          'Read and predict answers before listening — type of word, likely content',
          'Distractors: speakers often say a wrong answer then correct it',
          'Listen for correction words: "actually," "no wait," "I mean"',
          'Spelling counts — a wrong spelling is a wrong answer',
          '10 minutes at the end to transfer and check answers',
        ],
        commonMistakes: [
          'Not reading questions before listening (prediction is essential)',
          'Writing the first answer you hear (could be a distractor)',
          'Panicking when you miss one answer (move on, do not lose the next one)',
          'Misspelling common words (accommodation, environment, government)',
          'Writing too many words when the limit says "no more than two"',
        ],
        relatedLessons: ['ielts-reading-strategy', 'ielts-speaking-all'],
      },

      // # ─── Pronunciation: Connected Speech ───
      {
        id: 'connected-speech-lesson',
        title: 'Pronunciation: Why Native Speakers Sound Different',
        description: 'Understand linking, elision, and assimilation — the reason spoken English sounds nothing like written English.',
        skill: 'pronunciation',
        level: 'B2',
        duration: 14,
        objectives: [
          'Understand why native speakers seem to "eat" words',
          'Recognise linking, elision, and weak forms in natural speech',
          'Improve listening comprehension by understanding these patterns',
          'Start using connected speech features in your own speaking',
        ],
        sections: [
          {
            title: 'Why Does Spoken English Sound So Different?',
            type: 'text',
            content: 'When you read English, every word is separate and clear: "I am going to ask him about it." When a native speaker says this, it sounds like: "Ahmgənnaskimaboudit." This is not sloppy or lazy speech — it is the natural rhythm of English. Understanding these patterns is crucial for listening comprehension. If you only recognise the "textbook" pronunciation of words, you will struggle to understand native speakers at natural speed.',
          },
          {
            title: 'Linking: Connecting Words Together',
            type: 'rule',
            content: 'When one word ends with a consonant and the next begins with a vowel, they LINK together and sound like one word. "Turn off" → "Tur-noff." "Look at" → "Loo-kat." "Come in" → "Cu-min." "Pick it up" → "Pi-ki-tup." This is why "an apple" sounds like "anapple" — the words merge. Linking also happens between two vowels with a /w/ or /j/ sound inserted: "Go away" → "Go-waway." "She asked" → "She-yasked."',
          },
          {
            title: 'Elision: Disappearing Sounds',
            type: 'rule',
            content: 'In natural speech, some sounds are simply DROPPED (elided). Common elisions: "Next day" → "Nexday" (the /t/ disappears). "Last night" → "Lasnight" (the /t/ drops). "I don\'t know" → "I dunno" (very common). "Going to" → "gonna" (almost universal in speech). "Want to" → "wanna." "Have to" → "hafta." "Give me" → "gimme." These are not errors — they are standard spoken English used by ALL native speakers, including in formal situations.',
          },
          {
            title: 'Weak Forms: Words That Shrink',
            type: 'tip',
            content: 'Many common words have a "strong" form (when stressed) and a "weak" form (when unstressed). In natural speech, most function words are WEAK: "and" → /ən/ ("fish n chips"). "to" → /tə/ ("I want tə go"). "for" → /fə/ ("It\'s fə you"). "can" → /kən/ ("I kən do it"). "of" → /əv/ ("cup əv tea"). "was" → /wəz/ ("She wəz late"). "are" → /ə/ ("They-ə coming"). "have" → /əv/ ("I should-əv gone"). Recognising weak forms is the single biggest improvement you can make to your listening comprehension.',
          },
          {
            title: 'Connected Speech in Action',
            type: 'example',
            examples: [
              '"Would you like a cup of tea?" → "Wʊdʒə laɪkə kʌpə tiː?" (linking, weak forms)',
              '"I\'m going to ask him about it." → "Ahmgənə askɪm əbaʊdɪt" (gonna, linking, weak forms)',
              '"What do you want to do?" → "Wʌdʒə wɒnə duː?" (elision, weak forms)',
            ],
            analysis: 'In each example, the "written" version has clear, separate words. The spoken version merges them together, drops sounds, and weakens function words. This is not fast speech or slang — it is completely normal speed for a native speaker.',
          },
          {
            title: 'Test Yourself',
            type: 'exercise',
            content: 'What is the listener actually hearing?',
            question: 'A speaker says what sounds like "Jeetyet?" — what are the actual words?',
            answer: '"Did you eat yet?"',
            answerExplanation: '"Did you" → "Dʒə" → "Jə" (elision + linking). "Eat yet" → "eetyet" (linking). The full sentence "Did you eat yet?" becomes "Jeetyet?" in natural speech. This is completely standard American English.',
          },
        ],
        keyTakeaways: [
          'Spoken English connects, drops, and weakens sounds — this is normal, not sloppy',
          'Linking: consonant + vowel merge ("turn off" → "turnoff")',
          'Elision: sounds disappear ("last night" → "lasnight")',
          'Weak forms: function words shrink ("and" → "n", "to" → "tə")',
          'Understanding connected speech dramatically improves listening comprehension',
          '"gonna/wanna/hafta" are standard spoken English, not errors',
        ],
        commonMistakes: [
          'Thinking connected speech is "wrong" or "lazy" — it is standard English',
          'Pronouncing every word separately (sounds robotic to native ears)',
          'Not recognising weak forms in listening tests (the biggest reason for missed answers)',
          'Over-correcting: using "gonna" in formal writing (keep it for speech only)',
        ],
        relatedLessons: ['ielts-listening-strategy', 'collocations-lesson'],
      },
    ],
  },
]
