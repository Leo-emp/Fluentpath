// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 4: A1 Beginner Lessons (14–25 of 25)
// # ═══════════════════════════════════════════════════════════════════════════
// # Completes the A1 set. Topics: articles, can/can't, imperatives,
// # adjectives, adverbs of frequency, demonstratives, telling time,
// # daily routines, have/has, object pronouns, basic directions, present continuous.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_4: LessonCategory[] = [
  {
    id: 'a1-foundations',
    name: 'A1: Foundations',
    description: 'Start from zero — learn the building blocks of English.',
    icon: '🌱',
    lessons: [

      // # ─── 14. Articles: A, An, The ───
      {
        id: 'a1-articles',
        title: 'Articles: A, An, The',
        description: 'The three small words that confuse every learner — learn when to use "a," "an," and "the."',
        skill: 'grammar', level: 'A1', duration: 12,
        objectives: [
          'Use "a" before consonant sounds and "an" before vowel sounds',
          'Use "the" when the listener already knows which one',
          'Know when to use NO article',
        ],
        sections: [
          { title: 'A vs An', type: 'rule', content: '"A" before consonant SOUNDS: a book, a car, a university (starts with /juː/ — a consonant sound). "An" before vowel SOUNDS: an apple, an hour (the "h" is silent — starts with /aʊ/), an umbrella. It is about the SOUND, not the letter: "a uniform" (starts with /juː/) but "an uncle" (starts with /ʌ/).' },
          { title: 'When to Use A/An', type: 'rule', content: 'Use a/an when you mention something for the FIRST TIME or when it is ONE OF MANY: "I saw a dog in the park." (any dog — first mention). "She is a teacher." (one of many teachers). "Can I have an apple?" (any apple). "I need a new phone." (any new phone). A/An = "one, any, not specific."' },
          { title: 'When to Use The', type: 'rule', content: 'Use "the" when BOTH the speaker and listener know WHICH ONE: "I saw a dog in the park. The dog was very friendly." (second mention — we know which dog). "Can you close the door?" (there is only one door in the room). "The sun is very bright today." (there is only one sun). "The" = "that specific one we both know about."' },
          { title: 'No Article', type: 'tip', content: 'Use NO article with: Plural/uncountable nouns used generally: "Dogs are friendly." "Water is important." (NOT "The dogs are friendly" when you mean dogs in general). Meals: "I have breakfast at 8." (NOT "the breakfast"). Sports/games: "She plays tennis." Countries (most): "I live in Japan." (but "the UK," "the USA," "the Netherlands"). Languages: "He speaks French."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with a, an, the, or Ø (nothing).', question: '"I bought _____ umbrella yesterday. _____ umbrella was blue. I love _____ blue."', answer: 'an ... The ... Ø', answerExplanation: '"An umbrella" = first mention, vowel sound. "The umbrella" = we now know which one. "Blue" in general (the colour itself) = no article.' },
        ],
        keyTakeaways: ['A + consonant sound, An + vowel sound (listen to the SOUND)', 'A/An = not specific, first mention, one of many', 'The = specific, both people know which one', 'No article for general plurals, meals, sports, most countries'],
        commonMistakes: ['"A hour" → "An hour" (silent h = vowel sound)', '"I love the dogs" (in general) → "I love dogs"', '"She is teacher" → "She is a teacher" (jobs always need a/an)'],
        relatedLessons: ['a1-countable-uncountable', 'a1-some-any'],
      },

      // # ─── 15. Can / Can't ───
      {
        id: 'a1-can-cant',
        title: 'Can & Can\'t: Ability and Permission',
        description: 'Talk about what you are able to do and what is allowed — "I can swim," "You can\'t park here."',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Use "can" for ability, permission, and requests',
          'Form negatives with "can\'t" (cannot)',
          'Ask questions with "Can you...?" and "Can I...?"',
        ],
        sections: [
          { title: 'Form', type: 'rule', content: 'Can + base verb (no "to"): "I can swim." "She can speak three languages." Can\'t (cannot) + base verb: "He can\'t drive." "We can\'t come tomorrow." Question: Can + subject + base verb: "Can you help me?" "Can she play the piano?" "Can" is the same for ALL subjects — no -s for he/she/it: "She can cook" (NOT "She cans cook").' },
          { title: 'Three Uses of Can', type: 'rule', content: 'Ability: "I can play guitar." = I know how to do it. Permission: "Can I open the window?" = Is it OK? / "You can\'t smoke here." = It is not allowed. Requests: "Can you pass the salt?" = Please do this. "Can you help me with my homework?" Offers: "I can carry that for you." = I am willing to help.' },
          { title: 'Examples', type: 'example', examples: ['She can speak English, French, and Arabic. (ability)', 'Can I use your phone? — Yes, of course you can. (permission)', 'I can\'t find my keys. Have you seen them? (inability)', 'Can you tell me the time, please? (request)'], analysis: 'Notice: no "to" after can — "I can swim" not "I can to swim." And "can" never changes — no "cans," "canned," or "canning" for this meaning.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Correct the mistake.', question: '"She cans to drive very well."', answer: '"She can drive very well."', answerExplanation: 'No -s on can (ever). No "to" after can. Just: subject + can + base verb.' },
        ],
        keyTakeaways: ['Can + base verb (no "to," no -s)', 'Can\'t = cannot', 'Three uses: ability, permission, requests', 'Same form for all subjects: I can, she can, they can'],
        commonMistakes: ['"She cans swim" → "She can swim" (no -s)', '"I can to drive" → "I can drive" (no "to")', '"Can you to help?" → "Can you help?"'],
        relatedLessons: ['a1-present-simple-positive', 'a1-imperatives'],
      },

      // # ─── 16. Imperatives ───
      {
        id: 'a1-imperatives',
        title: 'Imperatives: Commands, Instructions, and Requests',
        description: 'Give instructions, commands, and advice — "Sit down," "Don\'t touch that," "Please wait."',
        skill: 'grammar', level: 'A1', duration: 8,
        objectives: [
          'Form positive and negative imperatives',
          'Use imperatives for instructions, commands, warnings, and offers',
          'Make imperatives polite with "please"',
        ],
        sections: [
          { title: 'How to Form Imperatives', type: 'rule', content: 'Positive: use the BASE VERB alone (no subject): "Sit down." "Open your books." "Turn left." Negative: Don\'t + base verb: "Don\'t run." "Don\'t touch that." "Don\'t be late." Polite: add "please" at the beginning or end: "Please sit down." "Close the door, please."' },
          { title: 'When to Use Imperatives', type: 'tip', content: 'Instructions: "Mix the flour and eggs." "Click the blue button." Commands: "Stop!" "Be quiet!" Warnings: "Be careful!" "Don\'t cross the road!" Offers/invitations: "Come in!" "Have a seat." "Help yourself." Advice: "Don\'t worry." "Take an umbrella — it might rain." Signs: "Keep off the grass." "Do not enter."' },
          { title: 'Examples', type: 'example', examples: ['Open your books to page 42. (classroom instruction)', 'Don\'t forget your passport! (warning/reminder)', 'Please take a seat — the doctor will see you soon. (polite request)', 'Let\'s go! (suggestion — "let\'s" = let us)'], analysis: 'Imperatives have no subject — the "you" is understood. "Sit down" means "You sit down," but saying "you" would sound rude or aggressive.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Make this a negative imperative.', question: '"Use your phone in the exam."', answer: '"Don\'t use your phone in the exam."', answerExplanation: 'Add "Don\'t" before the base verb to make a negative imperative.' },
        ],
        keyTakeaways: ['Positive: base verb alone — "Open the door."', 'Negative: Don\'t + base verb — "Don\'t run."', 'No subject needed — "you" is understood', 'Add "please" for politeness'],
        commonMistakes: ['"Not run!" → "Don\'t run!" (need don\'t, not just not)', '"You sit down!" → "Sit down, please." (adding "you" sounds aggressive)'],
        relatedLessons: ['a1-can-cant', 'a1-present-simple-positive'],
      },

      // # ─── 17. Adjectives ───
      {
        id: 'a1-adjectives',
        title: 'Adjectives: Describing People and Things',
        description: 'Make your English more interesting — learn to describe size, colour, age, feelings, and more.',
        skill: 'vocabulary', level: 'A1', duration: 10,
        objectives: [
          'Put adjectives in the correct position (before nouns or after be)',
          'Use common adjectives for size, colour, quality, and feelings',
          'Know that adjectives do NOT change for plural nouns',
        ],
        sections: [
          { title: 'Where Do Adjectives Go?', type: 'rule', content: 'Before a noun: "a big house," "a red car," "an interesting book." After "be" (am/is/are): "The house is big." "I am tired." "They are happy." After verbs like look, feel, seem, sound, taste, smell: "She looks tired." "This cake tastes delicious." "That sounds interesting."' },
          { title: 'Adjectives Never Change', type: 'rule', content: 'In English, adjectives have NO plural form: "a tall man" → "two tall men" (NOT "two talls men"). "a blue car" → "three blue cars" (NOT "three blues cars"). Adjectives also have NO masculine/feminine form: "He is beautiful" and "She is beautiful" — same word.' },
          { title: 'Common Adjective Pairs', type: 'tip', content: 'Learn adjectives in opposite pairs — it doubles your vocabulary: big/small, hot/cold, old/new, young/old, tall/short, long/short, fast/slow, cheap/expensive, easy/difficult, happy/sad, good/bad, clean/dirty, quiet/noisy, light/dark, strong/weak, rich/poor, beautiful/ugly.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Correct the mistake.', question: '"I have two smalls cats. They are blacks."', answer: '"I have two small cats. They are black."', answerExplanation: 'Adjectives never take -s for plural. "Small" stays "small" and "black" stays "black" regardless of how many cats.' },
        ],
        keyTakeaways: ['Before nouns: "a big house"', 'After be/look/feel/seem: "She is happy"', 'Adjectives NEVER change for plural: "two big dogs" not "two bigs dogs"', 'No gender changes: same word for he/she/it'],
        commonMistakes: ['"Two bigs houses" → "Two big houses"', '"She is beauty" → "She is beautiful" (use the adjective, not the noun)', '"An interested book" → "An interesting book" (-ing for things, -ed for feelings)'],
        relatedLessons: ['a1-adverbs-frequency', 'a1-verb-to-be'],
      },

      // # ─── 18. Adverbs of Frequency ───
      {
        id: 'a1-adverbs-frequency',
        title: 'Adverbs of Frequency: Always, Usually, Sometimes, Never',
        description: 'Say how often you do things — from 100% (always) to 0% (never).',
        skill: 'grammar', level: 'A1', duration: 8,
        objectives: [
          'Order frequency adverbs from 100% to 0%',
          'Put them in the correct position in a sentence',
          'Use them naturally in daily conversation',
        ],
        sections: [
          { title: 'The Frequency Scale', type: 'rule', content: 'From most to least frequent: always (100%) — "I always brush my teeth." usually (90%) — "She usually walks to work." often (70%) — "We often eat out on Fridays." sometimes (50%) — "He sometimes forgets his keys." rarely/seldom (10%) — "They rarely watch TV." never (0%) — "I never drink alcohol."' },
          { title: 'Position in the Sentence', type: 'rule', content: 'BEFORE the main verb: "I always eat breakfast." "She never arrives late." AFTER "be" (am/is/are): "He is always happy." "They are never late." AFTER the first auxiliary: "I have never been to Japan." "She can usually help." "Sometimes" can also go at the start: "Sometimes I walk to work."' },
          { title: 'Examples', type: 'example', examples: ['I usually have coffee in the morning, but sometimes I have tea.', 'She is always on time — she is never late.', 'We rarely go to the cinema. We usually watch films at home.', 'Do you often travel for work? — No, I hardly ever travel.'], analysis: 'Notice: "She IS always on time" (after be) vs "She always ARRIVES on time" (before main verb). This position rule is the key to sounding natural.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Put the adverb in the correct position.', question: '"He is late for class." (never)', answer: '"He is never late for class."', answerExplanation: 'After "is" (the verb "be") — frequency adverbs go AFTER be.' },
        ],
        keyTakeaways: ['always > usually > often > sometimes > rarely > never', 'Before main verbs: "I always eat..."', 'After be: "She is always..."', '"Sometimes" can start a sentence'],
        commonMistakes: ['"I eat always breakfast" → "I always eat breakfast"', '"She always is happy" → "She is always happy" (after be)', '"I never don\'t smoke" → "I never smoke" (never = already negative)'],
        relatedLessons: ['a1-present-simple-positive', 'a1-adjectives'],
      },

      // # ─── 19. Demonstratives ───
      {
        id: 'a1-demonstratives',
        title: 'This, That, These, Those',
        description: 'Point to things near and far — "this book here" vs "that building over there."',
        skill: 'grammar', level: 'A1', duration: 8,
        objectives: [
          'Use this/that for singular and these/those for plural',
          'Choose based on distance (near = this/these, far = that/those)',
          'Use them in everyday situations',
        ],
        sections: [
          { title: 'The Four Demonstratives', type: 'rule', content: 'Near the speaker: THIS (singular): "This is my phone." / "I like this song." THESE (plural): "These are my friends." / "These shoes are nice." Far from the speaker: THAT (singular): "That is her car." / "What is that building?" THOSE (plural): "Those people are waiting." / "I want those shoes in the window."' },
          { title: 'Other Uses', type: 'tip', content: '"This" for introducing people: "This is my colleague, Sarah." "That" for referring back: "I passed the exam!" — "That\'s great!" On the phone: "Hello, this is John speaking." "Is that Maria?" For time: "this week, this morning" (= the current one). "That day, that time" (= a past or specific one).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose this, that, these, or those.', question: '(Pointing at mountains in the distance) "Look at _____ mountains! _____ are beautiful!"', answer: 'those ... They', answerExplanation: 'Mountains are far away → "those" (plural + far). After the first mention, switch to "they."' },
        ],
        keyTakeaways: ['Near + singular = this, Near + plural = these', 'Far + singular = that, Far + plural = those', '"This is..." for introductions and phone calls'],
        commonMistakes: ['"This books" → "These books" (plural needs these/those)', '"That are my friends" → "Those are my friends" (plural)'],
        relatedLessons: ['a1-pronouns', 'a1-articles'],
      },

      // # ─── 20. Telling the Time ───
      {
        id: 'a1-telling-time',
        title: 'Telling the Time',
        description: 'Learn to ask and tell the time in English — "It\'s half past three," "It\'s quarter to five."',
        skill: 'general', level: 'A1', duration: 10,
        objectives: [
          'Ask "What time is it?" and give the answer',
          'Use o\'clock, half past, quarter past, quarter to',
          'Say times using both the traditional and digital methods',
        ],
        sections: [
          { title: 'Asking the Time', type: 'rule', content: 'Formal: "What time is it?" / "Could you tell me the time, please?" Informal: "What\'s the time?" / "Have you got the time?" Answer: "It\'s..." + the time: "It\'s three o\'clock." "It\'s half past two."' },
          { title: 'Traditional Method', type: 'rule', content: 'O\'clock = exactly on the hour: 3:00 = "three o\'clock." Half past = 30 minutes after: 3:30 = "half past three." Quarter past = 15 minutes after: 3:15 = "quarter past three." Quarter to = 15 minutes before the NEXT hour: 2:45 = "quarter to three." Minutes past: 3:10 = "ten past three." 3:20 = "twenty past three." Minutes to: 2:50 = "ten to three." 2:40 = "twenty to three."' },
          { title: 'Digital Method', type: 'tip', content: 'Many people also say the numbers directly: 3:15 = "three fifteen." 3:30 = "three thirty." 2:45 = "two forty-five." 10:05 = "ten oh five" (say "oh" for the zero). This is simpler and very common, especially with digital clocks. Both methods are correct — use whichever feels easier.' },
          { title: 'Test Yourself', type: 'exercise', content: 'Say the time two ways.', question: '7:45', answer: '"Quarter to eight" or "seven forty-five"', answerExplanation: '7:45 = 15 minutes before 8 → "quarter to eight." Or simply read the numbers: "seven forty-five."' },
        ],
        keyTakeaways: ['O\'clock = :00, Half past = :30', 'Quarter past = :15, Quarter to = :45', 'Past = after the hour (1–30 mins), To = before the next hour (31–59 mins)', 'Digital method: just say the numbers (three thirty, two forty-five)'],
        commonMistakes: ['"Quarter to seven" for 7:15 → "Quarter past seven" (past, not to)', '"Half to three" → "Half past two" (English says "half PAST," not "half to")'],
        relatedLessons: ['a1-prepositions-time', 'a1-daily-routines'],
      },

      // # ─── 21. Daily Routines ───
      {
        id: 'a1-daily-routines',
        title: 'Daily Routines: Talking About Your Day',
        description: 'Describe your typical day from morning to night using present simple and time expressions.',
        skill: 'speaking', level: 'A1', duration: 10,
        objectives: [
          'Describe a typical day using present simple',
          'Use time expressions (in the morning, at night, every day)',
          'Learn common routine verbs (wake up, get dressed, have breakfast)',
        ],
        sections: [
          { title: 'Common Routine Verbs', type: 'rule', content: 'Morning: wake up, get up, have a shower, brush my teeth, get dressed, have breakfast, leave home, go to work/school. Daytime: start work, have lunch, finish work, go home. Evening: get home, cook dinner, have dinner, watch TV, read a book, check my phone, do homework. Night: have a bath, brush my teeth, go to bed, fall asleep.' },
          { title: 'A Sample Day', type: 'example', examples: ['I wake up at 7 o\'clock every morning.', 'After breakfast, I take the bus to work.', 'I usually have lunch at my desk at about 1 o\'clock.', 'In the evening, I cook dinner and watch TV.', 'I go to bed at around 11 and fall asleep quickly.'], analysis: 'All sentences use present simple because these are REGULAR actions — things that happen every day. Time expressions (at 7, every morning, in the evening) make the routine clear.' },
          { title: 'Useful Connectors', type: 'tip', content: 'Link your routine together with: First / Then / After that / Next / Finally: "First, I have a shower. Then I get dressed. After that, I have breakfast." Before / After: "Before work, I go to the gym." "After dinner, I read." At about / at around: "I leave home at about 8." "I finish work at around 5."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Describe your morning in 3 sentences using present simple.', question: 'What do you do every morning? (Use: wake up, have, leave)', answer: 'Example: "I wake up at 6:30. I have a quick shower and eat breakfast. I leave home at 7:15."', answerExplanation: 'Any three sentences using present simple for regular morning actions are correct. Include a time to make it more specific.' },
        ],
        keyTakeaways: ['Use present simple for daily routines', 'Common verbs: wake up, get dressed, have breakfast, go to work, go to bed', 'Connectors: first, then, after that, before, after', 'Add times for detail: "at 7," "in the morning," "at about 5"'],
        relatedLessons: ['a1-present-simple-positive', 'a1-telling-time', 'a1-adverbs-frequency'],
      },

      // # ─── 22. Have / Has ───
      {
        id: 'a1-have-has',
        title: 'Have & Has: Possession and Experiences',
        description: 'Talk about what you own, your family, your body, and your meals — "I have a car," "She has two brothers."',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Use have/has correctly for different subjects',
          'Form negatives with don\'t have / doesn\'t have',
          'Ask questions with Do you have...? / Does she have...?',
          'Know the common uses of have (possession, family, meals, illness)',
        ],
        sections: [
          { title: 'Have vs Has', type: 'rule', content: 'I/you/we/they + have: "I have a car." "We have three children." He/she/it + has: "She has blue eyes." "He has a new job." "It has a garden." Negative: I/you/we/they + don\'t have: "I don\'t have a car." He/she/it + doesn\'t have: "She doesn\'t have any pets."' },
          { title: 'Common Uses', type: 'rule', content: 'Possession: "I have a laptop." "She has a big house." Family: "He has two sisters." "We have a baby." Physical features: "She has long hair." "He has green eyes." Meals: "I have breakfast at 8." "Let\'s have lunch." Illness: "I have a cold." "She has a headache." Time: "Do you have time?" "I don\'t have enough time."' },
          { title: 'Have Got (British English)', type: 'tip', content: 'In British English, "have got" means the same as "have" for possession: "I have a car" = "I\'ve got a car." "She has blue eyes" = "She\'s got blue eyes." Negative: "I haven\'t got" = "I don\'t have." Question: "Have you got...?" = "Do you have...?" Both forms are correct. American English prefers "have"; British English often uses "have got."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Fill in with have, has, don\'t have, or doesn\'t have.', question: '"My sister _____ a dog, but she _____ a cat. We _____ any pets because our flat is too small."', answer: 'has ... doesn\'t have ... don\'t have', answerExplanation: '"My sister" = she → has. Negative for she → doesn\'t have. "We" → don\'t have.' },
        ],
        keyTakeaways: ['I/you/we/they have — He/she/it has', 'Negative: don\'t have / doesn\'t have', 'Used for: possession, family, body, meals, illness, time', '"Have got" (British) = "have" (American) for possession'],
        commonMistakes: ['"She have a cat" → "She has a cat"', '"He doesn\'t has" → "He doesn\'t have" (base form after doesn\'t)', '"I haven\'t a car" → "I don\'t have a car" or "I haven\'t got a car"'],
        relatedLessons: ['a1-present-simple-positive', 'a1-present-simple-negative'],
      },

      // # ─── 23. Present Continuous ───
      {
        id: 'a1-present-continuous',
        title: 'Present Continuous: What\'s Happening Now',
        description: 'Talk about what is happening RIGHT NOW — "I am reading," "She is cooking," "They are playing."',
        skill: 'grammar', level: 'A1', duration: 12,
        objectives: [
          'Form the present continuous: am/is/are + verb-ing',
          'Use it for actions happening RIGHT NOW',
          'Make negatives and questions',
          'Know the difference from present simple',
        ],
        sections: [
          { title: 'How to Form It', type: 'rule', content: 'Subject + am/is/are + verb-ing: "I am working." = "I\'m working." "She is sleeping." = "She\'s sleeping." "They are playing." = "They\'re playing." Spelling rules for -ing: Most verbs: add -ing: work→working, eat→eating, play→playing. Verbs ending in -e: drop e, add -ing: make→making, write→writing, come→coming. Short verbs (CVC): double the last consonant: sit→sitting, run→running, swim→swimming. Verbs ending in -ie: change to -ying: lie→lying, die→dying.' },
          { title: 'Negatives and Questions', type: 'rule', content: 'Negative: subject + am/is/are + not + verb-ing: "I\'m not watching TV." "She isn\'t sleeping." "They aren\'t coming." Question: am/is/are + subject + verb-ing? "Are you listening?" "Is she coming?" "What are they doing?"' },
          { title: 'Present Simple vs Present Continuous', type: 'tip', content: 'Present simple = regular, always, habits: "I drink coffee every morning." (habit) Present continuous = right now, this moment: "I am drinking coffee." (right now, at this second) Compare: "She works in a bank." (her job — permanent). "She is working late today." (just today — temporary). "It rains a lot in London." (general fact). "It is raining right now." (at this moment).' },
          { title: 'Test Yourself', type: 'exercise', content: 'Choose present simple or present continuous.', question: '"Shh! The baby _____ (sleep). She usually _____ (sleep) for two hours."', answer: 'is sleeping ... sleeps', answerExplanation: 'First gap: right now → present continuous "is sleeping." Second gap: a regular habit → present simple "sleeps."' },
        ],
        keyTakeaways: ['Form: am/is/are + verb-ing', 'Used for actions happening RIGHT NOW', 'Drop -e: make→making. Double CVC: sit→sitting', 'Present simple = always/habit. Present continuous = right now/temporary'],
        commonMistakes: ['"I working now" → "I am working now" (need am/is/are)', '"She is work" → "She is working" (need -ing)', '"I\'m understanding" → "I understand" (stative verbs don\'t use continuous)'],
        relatedLessons: ['a1-present-simple-positive', 'a1-verb-to-be'],
      },

      // # ─── 24. Basic Directions ───
      {
        id: 'a1-basic-directions',
        title: 'Basic Directions: Left, Right, Straight On',
        description: 'Ask for and give simple directions — essential for getting around in English.',
        skill: 'speaking', level: 'A1', duration: 10,
        objectives: [
          'Ask for directions politely',
          'Give simple directions using turn left/right, go straight, etc.',
          'Use prepositions of place in directions',
        ],
        sections: [
          { title: 'Asking for Directions', type: 'rule', content: 'Polite: "Excuse me, where is the nearest bank?" "Excuse me, how do I get to the station?" "Is there a supermarket near here?" "Could you tell me the way to the hospital, please?" Always start with "Excuse me" — it is polite and gets the person\'s attention.' },
          { title: 'Giving Directions', type: 'rule', content: 'Go straight (on) / Go straight ahead: "Go straight for 200 metres." Turn left / Turn right: "Turn left at the traffic lights." Take the first/second/third left/right: "Take the second right." Go past: "Go past the church." Cross: "Cross the bridge / Cross the road." It\'s on the left/right: "The bank is on your left." It\'s opposite / next to / between: "It\'s opposite the park." / "It\'s next to the café."' },
          { title: 'A Full Set of Directions', type: 'example', examples: ['Go straight ahead for about 100 metres.', 'Turn left at the traffic lights.', 'Go past the school — it\'s on your right.', 'You can\'t miss it — it\'s the big red building.'], analysis: 'Good directions use sequence (first, then) and landmarks (the traffic lights, the school, the big red building). Always end with where the destination is relative to the listener: "on your left/right."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Give directions from the station to the museum: station → straight 200m → right at lights → past the library → museum on left.', question: 'Write the directions.', answer: '"Go straight for about 200 metres. Turn right at the traffic lights. Go past the library. The museum is on your left."', answerExplanation: 'Use imperative verbs (go, turn, take) and landmarks. End with the location of the destination.' },
        ],
        keyTakeaways: ['Start with "Excuse me..." when asking', 'Key phrases: go straight, turn left/right, go past, cross', 'Use landmarks: "at the traffic lights," "past the church"', 'End with location: "It\'s on your left/right"'],
        relatedLessons: ['a1-prepositions-place', 'a1-imperatives'],
      },

      // # ─── 25. Like + Verb-ing ───
      {
        id: 'a1-like-gerund',
        title: 'Like + Verb-ing: Talking About What You Enjoy',
        description: 'Express your likes and dislikes — "I like swimming," "She doesn\'t like cooking."',
        skill: 'grammar', level: 'A1', duration: 10,
        objectives: [
          'Use like/love/enjoy/hate + verb-ing',
          'Talk about hobbies and free-time activities',
          'Form negatives and questions about preferences',
        ],
        sections: [
          { title: 'The Pattern', type: 'rule', content: 'Like/love/enjoy/hate/don\'t mind + verb-ing: "I like reading." "She loves cooking." "He enjoys swimming." "They hate getting up early." "I don\'t mind waiting." Negative: don\'t/doesn\'t like + verb-ing: "I don\'t like running." "He doesn\'t like cleaning." Question: Do/Does + subject + like + verb-ing? "Do you like dancing?" "Does she like travelling?"' },
          { title: 'Strength Scale', type: 'tip', content: 'From strongest positive to strongest negative: love (❤️) — "I love playing guitar." really like — "I really like cooking." like — "I like swimming." don\'t mind — "I don\'t mind driving." (= it\'s OK, neutral) don\'t like — "I don\'t like ironing." hate / can\'t stand — "I hate doing homework." / "I can\'t stand waiting."' },
          { title: 'Talking About Hobbies', type: 'example', examples: ['What do you like doing in your free time?', 'I love travelling and I enjoy trying new food.', 'I don\'t like watching horror films — I prefer comedies.', 'She can\'t stand getting up early, but she loves running in the evening.'], analysis: '"Like + verb-ing" is the main way to talk about hobbies and preferences at A1. "Prefer" is useful for comparing: "I prefer tea to coffee."' },
          { title: 'Test Yourself', type: 'exercise', content: 'Answer the question using like/love/hate + verb-ing.', question: '"What do you like doing at the weekend?"', answer: 'Example: "I love sleeping late and I enjoy meeting friends for lunch. I don\'t like shopping."', answerExplanation: 'Any answer using like/love/enjoy/hate/don\'t like + verb-ing is correct. Try to include both positives and negatives for variety.' },
        ],
        keyTakeaways: ['like/love/enjoy/hate + verb-ing (not "to verb" at A1)', '"Don\'t mind" = it\'s OK, neutral', 'Questions: "Do you like dancing?"', 'Strength: love > really like > like > don\'t mind > don\'t like > hate'],
        commonMistakes: ['"I like swim" → "I like swimming" (need -ing)', '"She enjoys to cook" → "She enjoys cooking" (enjoy always takes -ing)', '"I very like it" → "I really like it" (use "really," not "very")'],
        relatedLessons: ['a1-present-simple-positive', 'a1-present-continuous'],
      },
    ],
  },
]
