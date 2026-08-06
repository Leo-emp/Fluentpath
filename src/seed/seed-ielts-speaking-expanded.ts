// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS SPEAKING — Expanded Authentic Practice
// # ═══════════════════════════════════════════════════════════════════════════
// # Real IELTS Speaking has 3 parts, 11-14 minutes total.
// # Part 1: 4-5 minutes (familiar topics, 2-3 questions each)
// # Part 2: 3-4 minutes (1 min prep + 2 min talk on cue card)
// # Part 3: 4-5 minutes (abstract discussion linked to Part 2 topic)
// # Every item has model answer notes, target language, and follow-ups.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_SPEAKING_EXPANDED: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # PART 1 — More Everyday Topics
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp1.exp.01', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about mobile phones. How often do you use your phone? What do you mainly use it for? Do you think people spend too much time on their phones?',
      format: 'ielts_part1',
      followUpQuestions: ['At what age did you get your first phone?', 'Do you prefer calling or messaging?', 'Have you ever tried to reduce your phone usage?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Frequency: "I\'d say I use it virtually constantly", "hardly a minute goes by without..."', 'Purpose: "primarily for...", "it\'s become indispensable for..."', 'Opinion with nuance: "While I appreciate the convenience, I do think..."'],
      modelAnswerNotes: 'Band 7+: Don\'t just list apps — reflect on your relationship with technology. Show self-awareness: "I\'m probably guilty of this myself, but..." Use specific examples rather than generalities.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.exp.02', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about mornings. What time do you usually wake up? What is the first thing you do in the morning? Are you a morning person?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you ever skip breakfast?', 'Has your morning routine changed over the years?', 'What would your ideal morning look like?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Routine language: "The first thing I do is...", "I have a pretty set routine"', 'Self-description: "I\'d describe myself as a night owl rather than an early bird"', 'Conditionals: "If I had more time in the morning, I\'d..."'],
      modelAnswerNotes: 'Band 7+: Be specific about YOUR routine — examiners notice vague or memorised answers. Use time expressions naturally: "by the time I...", "once I\'ve...". Show personality.',
      difficulty: 0.25,
    },
  },
  {
    id: 'ielts.sp1.exp.03', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about art. Do you enjoy any form of art? Have you ever visited an art gallery or museum? Would you like to learn an artistic skill?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you think art is important in education?', 'Do you have any artwork in your home?', 'Has your taste in art changed as you\'ve gotten older?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Artistic vocabulary: "abstract", "contemporary", "traditional", "craft", "installation"', 'Expressing interest: "I\'ve always been drawn to...", "I find it fascinating how..."', 'Hypothetical: "If I had the talent, I\'d love to try..."'],
      modelAnswerNotes: 'Band 7+: Even if you\'re not interested in art, explain why thoughtfully. "I wouldn\'t say I\'m particularly artistic, but I appreciate..." is better than "No, I don\'t like art." Show reflection.',
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.sp1.exp.04', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about public transport. Do you use public transport? What form of transport do you prefer? Is public transport in your city reliable?',
      format: 'ielts_part1',
      followUpQuestions: ['How could public transport in your area be improved?', 'Do you think people should use public transport more?', 'Have you ever had a bad experience on public transport?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Transport vocabulary: "commute", "fare", "congestion", "rush hour", "peak times"', 'Evaluating: "It\'s reasonably efficient, although...", "It leaves a lot to be desired"', 'Suggesting: "I think they should consider...", "It would make a difference if..."'],
      modelAnswerNotes: 'Band 7+: Use transport-specific vocabulary. Describe your personal experience with specifics: which routes, how long, what problems. Compare modes of transport.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.exp.05', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about photographs. Do you enjoy taking photos? Do you prefer taking photos with a phone or a camera? What kind of photos do you like to take?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you print your photos or keep them digital?', 'Do you post photos on social media?', 'What is your favourite photo you\'ve ever taken?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Photography vocabulary: "capture", "composition", "portrait", "landscape", "candid"', 'Preferences: "I\'m more of a spontaneous photographer", "I tend to focus on..."', 'Describing a specific photo: "One photo that I\'m particularly fond of is..."'],
      modelAnswerNotes: 'Band 7+: Go beyond "I like taking selfies" — discuss what you photograph and why. Mention specific photos or moments. Use photography vocabulary naturally.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.exp.06', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about time management. Are you good at managing your time? Do you use any tools to organise your schedule? Do you ever feel you don\'t have enough time?',
      format: 'ielts_part1',
      followUpQuestions: ['Are you ever late for things?', 'How do you decide what to prioritise?', 'Do you think people waste too much time?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Time idioms: "running against the clock", "make the most of", "pressed for time"', 'Self-assessment: "I\'d say I\'m reasonably organised, though I could improve..."', 'Tools: "I rely heavily on...", "I\'ve started using... which has been a game-changer"'],
      modelAnswerNotes: 'Band 7+: Be honest and self-aware. Use time-related idioms naturally — not forced. Give specific examples of how you manage (or fail to manage) your time.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.exp.07', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about animals and pets. Do you have any pets? Do you like animals? Are there any animals you\'re afraid of?',
      format: 'ielts_part1',
      followUpQuestions: ['Should children grow up with pets?', 'Are zoos a good idea?', 'What is the most interesting animal you\'ve seen?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Animal vocabulary: "breed", "domesticated", "wildlife", "endangered", "companion"', 'Describing pets: "loyal", "affectionate", "low-maintenance", "playful"', 'Fears: "I have a bit of a phobia of...", "They make me uneasy because..."'],
      modelAnswerNotes: 'Band 7+: Whether you have pets or not, give engaging, detailed answers. Describe the animal\'s personality if you have a pet. If not, explain your relationship with animals thoughtfully.',
      difficulty: 0.25,
    },
  },
  {
    id: 'ielts.sp1.exp.08', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about celebrations. What is the most important celebration in your country? How do people usually celebrate it? Do you enjoy celebrations?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you prefer big celebrations or small gatherings?', 'Has the way people celebrate changed over time?', 'Do you think people spend too much money on celebrations?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Celebration vocabulary: "festive", "commemorate", "gathering", "tradition", "occasion"', 'Describing customs: "It\'s customary to...", "People traditionally..."', 'Personal experience: "What I enjoy most about it is...", "For me, the highlight is..."'],
      modelAnswerNotes: 'Band 7+: Describe celebrations with cultural detail — food, customs, atmosphere. Use present simple for habits: "People typically gather..." Compare with your personal preference.',
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PART 2 — More Cue Cards (Diverse Categories)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp2.exp.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a place you have visited that you found particularly beautiful. You should say:\n- where it was\n- when you went there\n- what you did there\nand explain why you found it beautiful.',
      format: 'ielts_part2',
      cueCardPoints: ['Where it was', 'When you went there', 'What you did there', 'Why you found it beautiful'],
      followUpQuestions: ['Do you think people appreciate natural beauty enough?', 'Is it important to protect beautiful places?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Descriptive language: "breathtaking", "picturesque", "awe-inspiring", "unspoilt"', 'Sensory details: "The crystal-clear water...", "The air smelled of..."', 'Emotional impact: "What struck me most was...", "I was completely captivated by..."'],
      modelAnswerNotes: 'Band 7+: Paint a picture with your words — use all five senses. Don\'t just say "it was beautiful" — describe WHAT made it beautiful (light, colours, sounds, atmosphere). Use advanced descriptive vocabulary naturally.',
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.sp2.exp.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a time when you received some good news. You should say:\n- what the news was\n- how you heard about it\n- who told you\nand explain how you felt when you heard it.',
      format: 'ielts_part2',
      cueCardPoints: ['What the news was', 'How you heard about it', 'Who told you', 'How you felt'],
      followUpQuestions: ['Do you prefer to receive good news in person or by message?', 'How do you share good news with others?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Emotional vocabulary: "overjoyed", "elated", "relieved", "overwhelmed"', 'Narrative: "I remember the moment vividly", "I couldn\'t believe what I was hearing"', 'Reaction: "My immediate reaction was to...", "I was so excited that I..."'],
      modelAnswerNotes: 'Band 7+: Build narrative tension — describe the lead-up to the news, then the moment of receiving it, then your reaction. Use a range of emotion words beyond "happy" and "excited".',
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.sp2.exp.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a teacher who has had a positive impact on your learning. You should say:\n- who the teacher was\n- what subject they taught\n- what made them a good teacher\nand explain how they influenced your learning.',
      format: 'ielts_part2',
      cueCardPoints: ['Who the teacher was', 'What subject they taught', 'What made them good', 'How they influenced your learning'],
      followUpQuestions: ['What qualities make a good teacher?', 'Has technology changed the role of teachers?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Teaching qualities: "patient", "enthusiastic", "approachable", "knowledgeable"', 'Teaching methods: "made the subject come alive", "encouraged critical thinking"', 'Lasting impact: "Thanks to them, I developed a passion for...", "They instilled in me..."'],
      modelAnswerNotes: 'Band 7+: Focus on specific teaching methods and moments, not just general praise. Share an anecdote that shows their impact. Connect their influence to your present attitudes or abilities.',
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.sp2.exp.04', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe an achievement you are proud of. You should say:\n- what you achieved\n- when it happened\n- how difficult it was\nand explain why you are proud of this achievement.',
      format: 'ielts_part2',
      cueCardPoints: ['What you achieved', 'When it happened', 'How difficult it was', 'Why you are proud'],
      followUpQuestions: ['Do you think achievements need to be recognised by others?', 'What motivates people to achieve their goals?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Achievement vocabulary: "accomplishment", "milestone", "perseverance", "breakthrough"', 'Difficulty: "It required enormous dedication", "There were moments when I considered giving up"', 'Reflection: "What made it particularly meaningful was...", "Looking back, I realise that..."'],
      modelAnswerNotes: 'Band 7+: Include the struggle — achievements without difficulty are less compelling. Describe what you sacrificed or overcame. The "why I\'m proud" section should show personal growth, not just the result.',
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.sp2.exp.05', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe an item of clothing you particularly like wearing. You should say:\n- what it is\n- when and where you bought it\n- what it looks like\nand explain why you like wearing it.',
      format: 'ielts_part2',
      cueCardPoints: ['What it is', 'When and where you bought it', 'What it looks like', 'Why you like wearing it'],
      followUpQuestions: ['How important is fashion to you?', 'Do you think people judge others by what they wear?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Clothing vocabulary: "casual", "versatile", "flattering", "durable", "well-made"', 'Description: "It\'s made of...", "It has a slim fit with...", "The colour is a deep..."', 'Emotional connection: "It reminds me of...", "I feel confident whenever I wear it"'],
      modelAnswerNotes: 'Band 7+: Describe the item in detail — material, fit, colour, occasions you wear it. Connect it to how it makes you feel or a memory. This topic tests descriptive vocabulary well.',
      difficulty: 0.45,
    },
  },
  {
    id: 'ielts.sp2.exp.06', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a website or app that you find very useful. You should say:\n- what it is\n- how often you use it\n- what features it has\nand explain why you find it useful.',
      format: 'ielts_part2',
      cueCardPoints: ['What it is', 'How often you use it', 'What features it has', 'Why it is useful'],
      followUpQuestions: ['Do you think people rely too much on technology?', 'What makes a good app or website?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Tech vocabulary: "user-friendly", "intuitive interface", "functionality", "seamless"', 'Usage patterns: "I use it on a daily basis for...", "It\'s become an essential part of..."', 'Benefits: "What sets it apart is...", "The main advantage over alternatives is..."'],
      modelAnswerNotes: 'Band 7+: Be specific about features — don\'t just name the app. Explain HOW it helps you with concrete examples. Compare it briefly to alternatives to show analytical thinking.',
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PART 3 — Abstract Discussion (Linked to Part 2 Topics)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp3.exp.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about places. Let\'s discuss tourism more broadly. Do you think tourism has a positive or negative effect on local communities?',
      format: 'ielts_part3',
      followUpQuestions: ['Should there be limits on the number of tourists visiting popular destinations?', 'Is eco-tourism a genuine solution or just a marketing term?', 'How has the internet changed the way people travel?', 'Do you think people should travel to understand other cultures, or can they learn through other means?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Both sides: "On the one hand, tourism brings... On the other hand, it can lead to..."', 'Nuanced position: "It depends largely on the scale and management of tourism"', 'Examples: "Take Barcelona, for instance, where overtourism has led to..."'],
      modelAnswerNotes: 'Band 7+: Avoid a simplistic "tourism is good/bad" response. Discuss economic benefits vs cultural/environmental costs. Use specific examples of destinations. Show ability to see multiple perspectives and reach a nuanced conclusion.',
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.sp3.exp.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about learning. Let\'s discuss knowledge and information. In the age of the internet, is it still important to memorise facts?',
      format: 'ielts_part3',
      followUpQuestions: ['Has the internet made people more or less knowledgeable?', 'How can people distinguish reliable information from misinformation online?', 'Do you think schools focus too much on memorisation and not enough on critical thinking?', 'Will artificial intelligence change what we need to learn?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Knowledge vs information: "There\'s a distinction between knowing facts and understanding concepts"', 'Evaluating: "While it\'s true that... I would argue that..."', 'Speculating: "As AI becomes more prevalent, it\'s likely that..."'],
      modelAnswerNotes: 'Band 7+: This is an excellent topic to demonstrate abstract thinking. Distinguish between "knowing" and "understanding". Discuss how technology changes learning but doesn\'t replace critical thinking. Reference AI\'s impact on education naturally.',
      difficulty: 0.7,
    },
  },
  {
    id: 'ielts.sp3.exp.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about achievements. Let\'s discuss success more broadly. How should success be defined — by wealth, happiness, or something else?',
      format: 'ielts_part3',
      followUpQuestions: ['Is success mainly due to talent, hard work, or luck?', 'Are successful people always happy?', 'Does society put too much pressure on people to succeed?', 'Can failure ever be a positive experience?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Defining: "Success can be defined in many ways, but I believe..."', 'Contrasting: "While material wealth is one measure, it fails to capture..."', 'Philosophical: "The very concept of success is culturally constructed"'],
      modelAnswerNotes: 'Band 7+: Challenge the assumption that success = wealth. Discuss different cultural definitions of success. Use hedging language: "arguably", "it could be said that". Show ability to discuss abstract concepts without becoming vague.',
      difficulty: 0.7,
    },
  },
  {
    id: 'ielts.sp3.exp.04', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about technology. Let\'s discuss privacy in the digital age. Do you think people give away too much personal information online?',
      format: 'ielts_part3',
      followUpQuestions: ['Should governments regulate how companies use personal data?',  'Is privacy a fundamental human right?', 'How do you balance convenience with privacy?', 'Will people care more or less about privacy in the future?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Privacy vocabulary: "data breach", "surveillance", "consent", "digital footprint"', 'Weighing up: "The trade-off between convenience and privacy is..."', 'Predicting: "I anticipate that future generations will..."'],
      modelAnswerNotes: 'Band 7+: Show awareness of the tension between convenience and privacy. Use specific examples (social media, smart devices, government surveillance). Demonstrate vocabulary for discussing rights and technology. Give a considered personal view.',
      difficulty: 0.7,
    },
  },
  {
    id: 'ielts.sp3.exp.05', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about celebrations. Let\'s discuss traditions and change. Do you think it is important for societies to preserve their traditions?',
      format: 'ielts_part3',
      followUpQuestions: ['Which traditions are worth keeping and which should change?', 'How can globalisation and local traditions coexist?', 'Do young people value traditions as much as older generations?', 'Can new traditions be created, or must they develop organically?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Tradition vocabulary: "heritage", "cultural identity", "customs", "rituals"', 'Balance: "While preserving heritage is important, societies must also evolve"', 'Examples: "In my country, for instance, the tradition of... is being..."'],
      modelAnswerNotes: 'Band 7+: Don\'t romanticise all traditions or dismiss them all. Distinguish between traditions that strengthen community bonds and those that perpetuate harm. Use specific cultural examples from your own experience.',
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SPEAKING STRATEGY & VOCABULARY BUILDERS
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp.strat.01', type: 'mcq', level: 'B1', skill: 'speaking',
    nodeIds: ['strat.ielts.part1_answers'],
    payload: {
      stem: 'In IELTS Speaking Part 1, the examiner asks "Do you like cooking?" What is the BEST response?',
      options: [
        { text: '"Yes."', misconception: 'Too short — Part 1 answers should be 2-3 sentences with a reason' },
        { text: '"Yes, I really enjoy cooking. I find it relaxing after a long day at work, and I especially like trying recipes from different cuisines."', misconception: null },
        { text: '"Cooking is an important life skill that everyone should learn because it promotes healthy eating and saves money compared to eating out."', misconception: 'This sounds like an essay, not a natural spoken answer — too formal for Part 1' },
        { text: '"Well, I remember when I was five years old, my grandmother taught me to make dumplings, and ever since then I have been passionate about the culinary arts."', misconception: 'Too long and over-rehearsed for Part 1 — save extended narration for Part 2' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp.strat.02', type: 'mcq', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.ielts.part3_extend'],
    payload: {
      stem: 'In IELTS Speaking Part 3, when you don\'t immediately know the answer to an abstract question, you should:',
      options: [
        { text: 'Say "I don\'t know" and wait for the next question', misconception: 'Never say "I don\'t know" — the examiner is assessing your ability to discuss, not your knowledge' },
        { text: 'Use a filler phrase to buy time ("That\'s an interesting question... I suppose...") and develop your answer as you speak', misconception: null },
        { text: 'Recite a pre-memorised answer on a similar topic', misconception: 'Memorised answers are detectable and penalised — they sound unnatural' },
        { text: 'Change the topic to something you know more about', misconception: 'You must address the examiner\'s question, not redirect to another topic' },
      ],
      correctIndex: 1,
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.sp.strat.03', type: 'mcq', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.ielts.part2_structure'],
    payload: {
      stem: 'In IELTS Speaking Part 2, if you finish speaking before the 2-minute mark, the examiner will:',
      options: [
        { text: 'End the test early — shorter answers save time', misconception: 'Short Part 2 answers reduce your score — aim for the full 2 minutes' },
        { text: 'Ask follow-up questions to fill the time', misconception: null },
        { text: 'Deduct marks automatically', misconception: 'Marks aren\'t "deducted" but the short length will affect Fluency & Coherence scores' },
        { text: 'Ask you to repeat your answer from the beginning', misconception: 'You will not be asked to start over' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SPEAKING VOCABULARY — Gap fills for speaking fluency
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp.gf.01', type: 'gap_fill', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      stem: 'IELTS Speaking — Complete these Part 3 extending phrases:\n\n"To ______ an example, in my country..."\n"Having said ______, I should also mention..."\n"What I ______ by that is..."\n"This ______ me to my next point about..."',
      gaps: [
        { correctAnswer: 'give', acceptedAlternatives: ['take', 'cite', 'provide'], hint: 'to offer/present an example' },
        { correctAnswer: 'that', acceptedAlternatives: [], hint: 'phrase meaning "however"' },
        { correctAnswer: 'mean', acceptedAlternatives: [], hint: 'to clarify what you said' },
        { correctAnswer: 'brings', acceptedAlternatives: ['leads', 'takes'], hint: 'to transition to next point' },
      ],
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.sp.gf.02', type: 'gap_fill', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      stem: 'IELTS Speaking — Complete these opinion and hedging phrases:\n\n"As ______ as I\'m concerned, this is a positive development."\n"I\'m ______ certain that this will continue."\n"It\'s ______ to say whether this trend will last."\n"From my ______ of view, the benefits outweigh the drawbacks."',
      gaps: [
        { correctAnswer: 'far', acceptedAlternatives: [], hint: '"as ___ as I\'m concerned" = in my opinion' },
        { correctAnswer: 'fairly', acceptedAlternatives: ['reasonably', 'quite', 'pretty'], hint: 'moderately/somewhat certain' },
        { correctAnswer: 'hard', acceptedAlternatives: ['difficult', 'impossible'], hint: 'not easy to determine' },
        { correctAnswer: 'point', acceptedAlternatives: [], hint: '"from my ___ of view" = from my perspective' },
      ],
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # DIALOGUE COMPLETION — Speaking Part 1 Practice
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp.dc.01', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['strat.ielts.part1_answers'],
    payload: {
      stem: 'Complete the candidate\'s answers in this IELTS Speaking Part 1 practice about their neighbourhood.',
      lines: [
        { speaker: 'Examiner', text: 'Can you tell me about your neighbourhood?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['I live in', 'My neighbourhood is', 'I\'m based in a'], hint: 'Describe the area — type, location, atmosphere' },
        { speaker: 'Examiner', text: 'What do you like most about living there?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['What I appreciate most', 'The thing I like best', 'I particularly enjoy'], hint: 'Name a specific feature and explain why' },
        { speaker: 'Examiner', text: 'Is there anything you would change about it?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['If I could change one thing', 'The only thing I\'d improve', 'I wish there were'], hint: 'Use a conditional to suggest an improvement' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp.dc.02', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['strat.ielts.part1_answers'],
    payload: {
      stem: 'Complete the candidate\'s answers in this IELTS Speaking Part 1 practice about movies.',
      lines: [
        { speaker: 'Examiner', text: 'Do you enjoy watching films?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['Yes, I\'m a big', 'Absolutely, I\'m quite a', 'I do, I particularly'], hint: 'Express enthusiasm with specifics' },
        { speaker: 'Examiner', text: 'What kind of films do you prefer?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['I\'m drawn to', 'I tend to gravitate towards', 'I have a preference for'], hint: 'Name genres and explain why' },
        { speaker: 'Examiner', text: 'Do you prefer watching films at home or at the cinema?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['I\'d have to say', 'On balance, I prefer', 'It depends, but generally'], hint: 'State preference with supporting reason' },
      ],
      difficulty: 0.3,
    },
  },
]
