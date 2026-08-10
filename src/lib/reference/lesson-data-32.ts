// # ═══════════════════════════════════════════════════════════════════════════
// # LESSON DATA — Part 32: Vocabulary Gap Fill (A2 ×3, B2 ×1, C2 ×1)
// # ═══════════════════════════════════════════════════════════════════════════
// # Closes the curriculum count gaps found during quality audit.
// # After this file: all 36 skill×level combinations have exactly 25 lessons.

import type { LessonCategory } from './types'

export const LESSON_CATEGORIES_32: LessonCategory[] = [
  // # ─── A2 Vocabulary — 3 more to reach 25 ──────────────────────────────
  {
    id: 'a2-vocabulary',
    name: 'A2: Elementary Vocabulary',
    description: 'Everyday words for shopping, weather, health, travel, and social situations.',
    icon: '📝',
    lessons: [
      // # ─── A2-23: Weather ───
      { id: 'a2-vocab-weather', title: 'Weather & Seasons', description: 'Talk about the weather — the most common topic of small talk in English.',
        skill: 'vocabulary', level: 'A2', duration: 10,
        objectives: ['Describe weather conditions using 15+ words', 'Ask and answer weather questions', 'Understand weather forecasts'],
        sections: [
          { title: 'Weather Words', type: 'rule', content: 'BASIC WEATHER:\nsunny — bright, clear sky with sun\ncloudy — grey sky, no sun\nrainy — water falling from the sky\nwindy — strong moving air\nsnowy — white ice crystals falling\nfoggy — thick mist, hard to see\nstormy — heavy rain + wind + possibly thunder\n\nTEMPERATURE:\nhot — 30°C+\nwarm — 20-29°C (pleasant)\ncool — 10-19°C (slightly cold)\ncold — 0-9°C\nfreezing — below 0°C (ice forms)\n\nUSEFUL PATTERNS:\n"It\'s sunny today."\n"It\'s going to rain later."\n"What\'s the weather like?" — the standard question\n"What\'s the forecast for tomorrow?"' },
          { title: 'Weather in Conversation', type: 'tip', content: 'Weather is the #1 small talk topic in English-speaking countries, especially Britain.\n\n"Lovely day, isn\'t it?" — expects agreement: "Yes, beautiful!"\n"Terrible weather we\'re having." — expects sympathy: "I know, awful!"\n"Looks like rain." — expects agreement: "Yes, I brought my umbrella."\n\nWeather adjectives come AFTER "it\'s":\n"It\'s hot." (NOT "Hot it is.")\n"It\'s getting colder." (= the temperature is dropping)\n\nWEATHER vs CLIMATE:\nWeather = today, this week (short-term)\nClimate = usual conditions over years (long-term)\n"The weather is cold today" vs "Thailand has a tropical climate."' },
          { title: 'Describe the Weather', type: 'exercise', question: 'Answer these questions:\n(a) It\'s 35°C and the sun is very bright. Describe the weather.\n(b) You can\'t see anything outside because of thick white mist. What\'s the weather?\n(c) It\'s -3°C. How do you describe the temperature?', answer: '(a) "It\'s really hot and sunny today." 35°C is hot, bright sun = sunny.\n(b) "It\'s very foggy." Thick white mist that blocks visibility = fog.\n(c) "It\'s freezing." Below 0°C = freezing (literally, because water freezes at 0°C).', answerExplanation: 'Notice the pattern: "It\'s + adjective." This is how English describes weather. You can add "really" or "very" for emphasis: "It\'s really hot" is stronger than "It\'s hot."' },
        ],
        keyTakeaways: ['"What\'s the weather like?" is the standard weather question', 'It\'s + adjective: sunny, cloudy, rainy, windy, foggy, stormy', 'Hot (30°C+), warm (20-29°C), cool (10-19°C), cold (0-9°C), freezing (below 0°C)'],
      },
      // # ─── A2-24: Shopping ───
      { id: 'a2-vocab-shopping', title: 'Shopping: Prices, Sizes & Paying', description: 'Buy things confidently — ask about prices, sizes, and make payments.',
        skill: 'vocabulary', level: 'A2', duration: 10,
        objectives: ['Ask about prices and sizes', 'Understand shop assistants\' questions', 'Pay and get receipts'],
        sections: [
          { title: 'Shopping Language', type: 'rule', content: 'ASKING ABOUT ITEMS:\n"How much is this?" — asking the price\n"How much are these?" — plural items\n"Do you have this in a medium?" — asking for a size\n"Do you have this in blue?" — asking for a colour\n"Can I try this on?" — asking to use the changing room\n"Where are the changing rooms?" — asking for location\n\nSIZES:\nXS (extra small), S (small), M (medium), L (large), XL (extra large)\nShoes use numbers: UK 7 / US 8 / EU 41\n\nPAYING:\n"I\'ll take this, please." — deciding to buy\n"Can I pay by card?" — card payment\n"Cash or card?" — shop assistant\'s question\n"Do you need a bag?" — bags often cost extra\n"Can I have the receipt, please?" — proof of purchase' },
          { title: 'Common Shop Conversations', type: 'tip', content: 'Shop assistant: "Can I help you?" or "Are you looking for anything?"\nYou: "I\'m just looking, thanks." (= browsing, no help needed)\nYou: "Yes, I\'m looking for a jacket." (= you want help)\n\nShop assistant: "Would you like anything else?"\nYou: "No, that\'s everything, thanks." (= ready to pay)\n\nRETURNS:\n"I\'d like to return this, please." — bringing something back\n"Can I get a refund?" — asking for money back\n"Can I exchange this for a different size?" — swapping\n"Do you have the receipt?" — shops usually need this for returns\n\nBARGAINING is NOT normal in most English-speaking shops (except markets and car boot sales).' },
          { title: 'What Do You Say?', type: 'exercise', question: '(a) You want to know the price of a shirt.\n(b) The shirt is nice but you need a bigger size.\n(c) You want to pay with your debit card.', answer: '(a) "How much is this shirt?" or "How much is this, please?"\n(b) "Do you have this in a large?" or "Do you have this in a bigger size?"\n(c) "Can I pay by card, please?"', answerExplanation: 'These three phrases cover 80% of what you need in a shop. "How much is...?" for prices, "Do you have this in...?" for options, "Can I pay by...?" for payment. Add "please" to sound polite.' },
        ],
        keyTakeaways: ['"How much is this?" for prices, "Do you have this in...?" for sizes/colours', '"I\'m just looking, thanks" when you don\'t need help', '"Can I pay by card?" — always add "please" in shops'],
      },
      // # ─── A2-25: Health & Body ───
      { id: 'a2-vocab-health-body', title: 'Health, Body & Feeling Ill', description: 'Describe symptoms, body parts, and basic health problems.',
        skill: 'vocabulary', level: 'A2', duration: 10,
        objectives: ['Name 15+ body parts', 'Describe common symptoms and illnesses', 'Communicate at a doctor\'s appointment'],
        sections: [
          { title: 'Body Parts & Symptoms', type: 'rule', content: 'BODY PARTS:\nhead, face, eye, ear, nose, mouth, neck\nshoulder, arm, elbow, wrist, hand, finger, thumb\nchest, stomach, back, hip\nleg, knee, ankle, foot (feet), toe\n\nCOMMON SYMPTOMS:\nheadache — pain in your head\nstomach ache — pain in your stomach\ntoothache — pain in a tooth\nsore throat — pain when swallowing\ncough — "koff" sound from your chest\ncold — runny nose, sneezing, mild illness\nflu — like a cold but much worse (fever, body pain)\nfever/temperature — body is too hot (above 37°C)\nnauseous — feeling like you might vomit\ndizzy — feeling like the room is spinning' },
          { title: 'At the Doctor', type: 'tip', content: 'DESCRIBING YOUR PROBLEM:\n"I have a headache." (NOT "I am headache.")\n"I\'ve got a sore throat."\n"My back hurts." / "I have a pain in my back."\n"I feel sick." (= nauseous) / "I feel dizzy."\n"I\'ve been coughing for three days."\n"It hurts when I swallow."\n\nDOCTOR\'S QUESTIONS:\n"What seems to be the problem?"\n"Where does it hurt?"\n"How long have you had this?"\n"Are you taking any medication?"\n"Are you allergic to anything?"\n\nUSEFUL RESPONSES:\n"It started two days ago."\n"The pain is here." (point to the area)\n"It gets worse at night."' },
          { title: 'Describe the Problem', type: 'exercise', question: '(a) Your head hurts a lot. What do you tell the doctor?\n(b) You feel very hot and your body aches. What might you have?\n(c) You have pain when you eat or drink. Where is the problem?', answer: '(a) "I have a really bad headache." or "I\'ve had a headache since this morning."\n(b) You might have the flu — fever (feeling hot) plus body aches are classic flu symptoms. "I think I have the flu. I have a temperature and my whole body aches."\n(c) Sore throat or toothache. "I have a sore throat — it hurts when I swallow." or "I have toothache — it hurts when I eat."', answerExplanation: 'Notice: "I have a headache" (not "I am headache"). English uses "have" for symptoms: have a cold, have a fever, have a cough. But for adjectives: "I feel sick," "I feel dizzy" (with "feel").' },
        ],
        keyTakeaways: ['"I have a..." for symptoms (headache, cold, fever, cough)', '"My ... hurts" or "I have a pain in my ..." for body pain', '"It started..." + time and "It gets worse when..." to help the doctor'],
      },
    ],
  },
  // # ─── B2 Vocabulary — 1 more to reach 25 ──────────────────────────────
  {
    id: 'b2-vocabulary',
    name: 'B2: Upper-Intermediate Vocabulary',
    description: 'Sophisticated vocabulary for academic, professional, and cultural contexts.',
    icon: '📝',
    lessons: [
      { id: 'b2-vocab-discourse-markers', title: 'Academic Discourse Markers', description: 'Moreover, nevertheless, furthermore — the linking words that make writing sound academic.',
        skill: 'vocabulary', level: 'B2', duration: 12,
        objectives: ['Use 15+ academic discourse markers correctly', 'Distinguish between additive, contrastive, and causal markers', 'Avoid overusing simple connectors (and, but, so)'],
        sections: [
          { title: 'Discourse Marker Categories', type: 'rule', content: 'ADDING INFORMATION:\nfurthermore — adds a stronger point: "The policy is expensive. Furthermore, it has shown no results."\nmoreover — similar to furthermore: "The hotel was beautiful. Moreover, the staff were excellent."\nin addition — adds without emphasis: "She speaks French. In addition, she is learning Mandarin."\n\nCONTRAST:\nhowever — BUT in formal writing: "The data is promising. However, the sample size is small."\nnevertheless / nonetheless — despite what was just said: "The odds were against them. Nevertheless, they succeeded."\non the other hand — introducing the opposite view\n\nCAUSE & RESULT:\ntherefore — so in formal writing: "The evidence is clear. Therefore, we recommend..."\nconsequently — as a result: "Funding was cut. Consequently, three projects were cancelled."\nhence — more formal than therefore: "Hence the need for reform."\n\nCLARIFYING:\nin other words — rephrasing: "The plan is untenable — in other words, it won\'t work."\nthat is to say — similar to i.e.: "The vote was unanimous, that is to say, everyone agreed."' },
          { title: 'Placement and Punctuation', type: 'tip', content: 'Discourse markers usually go at the START of a new sentence:\n"The results were positive. However, further testing is needed."\n\nOr after a semicolon:\n"The results were positive; however, further testing is needed."\n\nNEVER in the middle of a clause like "but":\nWRONG: "The results were however positive."\nCORRECT: "The results were, however, positive." (with commas)\n\nCOMMON MISTAKE: overusing "moreover" and "furthermore." Use them only when the new point genuinely ADDS to the argument. If you\'re just continuing, use simpler connectors.\n\nFORMALITY SCALE (same meaning, different register):\nbut → however → nevertheless → notwithstanding\nso → therefore → consequently → hence\nand → moreover → furthermore → in addition to this' },
          { title: 'Upgrade the Connectors', type: 'exercise', question: 'Replace the simple connectors with academic discourse markers:\n(a) "The theory is interesting, BUT the evidence is weak."\n(b) "Prices have risen by 20%. SO, many families are struggling."\n(c) "The school has excellent facilities. AND, the teachers are highly qualified."', answer: '(a) "The theory is interesting. However, the evidence is weak." (contrast)\n(b) "Prices have risen by 20%. Consequently, many families are struggling." (result)\n(c) "The school has excellent facilities. Moreover, the teachers are highly qualified." (adding a stronger point)', answerExplanation: '"However" replaces "but" at B2+ level. "Consequently" replaces "so" when showing a direct result. "Moreover" replaces "and" when the second point strengthens the first. These markers signal academic register and earn higher scores in IELTS, Cambridge, and university assignments.' },
        ],
        keyTakeaways: ['However/nevertheless (contrast), therefore/consequently (result), moreover/furthermore (addition)', 'Place at sentence start + comma, or after semicolon', 'Don\'t overuse — one discourse marker per paragraph is usually enough'],
      },
    ],
  },
  // # ─── C2 Vocabulary — 1 more to reach 25 ──────────────────────────────
  {
    id: 'c2-vocabulary',
    name: 'C2: Mastery Vocabulary',
    description: 'Near-native lexical sophistication — rare collocations, archaic echoes, and the precision of a published writer.',
    icon: '📝',
    lessons: [
      { id: 'c2-vocab-etymological-doublets', title: 'Etymological Doublets & Triplets', description: 'Kingly/royal/regal, ask/question/interrogate — English words from the same root that split into different registers.',
        skill: 'vocabulary', level: 'C2', duration: 12,
        objectives: ['Understand why English has multiple words for the same concept', 'Distinguish Anglo-Saxon, French, and Latin register layers', 'Choose the right register word for the context'],
        sections: [
          { title: 'The Three Layers of English', type: 'rule', content: 'English vocabulary has three historical layers, each carrying a different register:\n\nANGLO-SAXON (Old English) — everyday, warm, direct:\nask, help, begin, end, buy, sell, work, give, fire, water, house, land\n\nFRENCH (Norman) — polite, administrative, literary:\nquestion, aid, commence, finish, purchase, vend, labour, donate, flame, river\n\nLATIN/GREEK (scholarly) — academic, technical, formal:\ninterrogate, facilitate, initiate, terminate, acquire, alienate, endeavour, contribute, conflagration, aquatic\n\nTRIPLETS (same concept, three register levels):\nask → question → interrogate\nrise → mount → ascend\nfire → flame → conflagration\nfast → firm → secure\nfear → terror → trepidation\nhelp → aid → facilitate\nend → finish → terminate\nkingly → royal → regal\ngoodness → virtue → probity' },
          { title: 'Why This Matters', type: 'tip', content: 'Register mismatch is one of the most common C2-level errors:\n\nToo formal for conversation:\n"I shall endeavour to facilitate your comprehension." → "I\'ll try to help you understand."\n\nToo informal for an academic paper:\n"This bit helps us get why stuff happens." → "This section facilitates our understanding of causation."\n\nThe Anglo-Saxon layer sounds human and direct — use it for speeches, storytelling, emotional writing.\nThe French layer sounds professional and polished — use it for business, journalism, formal letters.\nThe Latin layer sounds scholarly and precise — use it for academic papers, legal documents, technical writing.\n\nGreat writers like George Orwell and Winston Churchill deliberately chose Anglo-Saxon words for impact:\n"We shall fight on the beaches..." (fight, not combat or engage)\n"Never in the field of human conflict..." (field, not domain or arena)' },
          { title: 'Choose the Right Register', type: 'exercise', question: 'For each context, choose the best register word:\n(a) A legal contract: "This agreement shall _____ on December 31st." (end / finish / terminate)\n(b) Telling a friend: "Can you _____ me move this table?" (facilitate / aid / help)\n(c) A news report: "The _____ family attended the ceremony." (kingly / royal / regal)', answer: '(a) terminate — Latin register for legal precision. "This agreement shall terminate on December 31st."\n(b) help — Anglo-Saxon for warmth and directness. "Can you help me move this table?"\n(c) royal — French register for journalistic/formal contexts. "The royal family attended the ceremony."', answerExplanation: '"Terminate" in a contract is expected and precise. "End" would sound too casual; "finish" implies completion of a task, not expiry of a document. "Help" between friends is natural; "facilitate" would sound absurd. "Royal" is the established journalistic term; "kingly" is archaic, "regal" describes bearing/appearance, not the institution. Choosing the right register layer is what makes C2 writing feel effortless and natural.' },
        ],
        keyTakeaways: ['Anglo-Saxon = everyday (ask, help, end). French = polite/formal (question, aid, finish). Latin = academic (interrogate, facilitate, terminate).', 'Match the register to the context — conversational, professional, or academic', 'Great speakers choose simpler words for impact: "fight" beats "engage in combat"'],
      },
    ],
  },
]
