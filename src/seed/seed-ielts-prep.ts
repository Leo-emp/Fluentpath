// # IELTS exam preparation content — authentic exam-format items
// # covering Academic Writing (Task 1 & 2), Speaking (Parts 1-3),
// # Academic Reading, and test strategy across all item types.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_PREP: UnifiedSeedItem[] = [
  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS WRITING TASK 1 — Chart/Graph Description
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt1.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The bar chart below shows the percentage of households with internet access in five countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Covers all key features with a clear overview', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical organisation with clear progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Range of vocabulary for describing data trends', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Variety of structures used accurately', maxScore: 9 },
      ],
      modelAnswer: 'The bar chart illustrates the proportion of households with internet access in the USA, UK, Japan, Brazil, and India from 2000 to 2020.\n\nOverall, internet penetration increased substantially in all five nations over the two decades, with the USA and UK consistently leading. The most dramatic growth occurred in developing countries.\n\nIn 2000, the USA had the highest rate at approximately 40%, followed by the UK at 25% and Japan at 20%. Brazil and India lagged significantly behind at around 5% and 1% respectively.\n\nBy 2020, the USA and UK had reached near-saturation levels of approximately 90% and 95%. Japan showed similar growth, reaching 85%. Meanwhile, Brazil demonstrated the steepest increase, climbing from 5% to roughly 75%. India, despite remaining the lowest, showed remarkable growth from 1% to about 50%.\n\nNotably, the gap between developed and developing nations narrowed considerably by 2020, suggesting a global trend toward digital inclusion.',
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.wt1.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The pie charts below show the main reasons why agricultural land becomes less productive in three regions of the world. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Covers all key features with a clear overview', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical organisation with clear progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Range of vocabulary for describing proportions', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Variety of structures used accurately', maxScore: 9 },
      ],
      modelAnswer: 'The three pie charts compare the causes of land degradation in North America, Europe, and Oceania.\n\nOverall, while deforestation is the leading cause in Europe and Oceania, over-grazing dominates in Oceania. North America presents a more balanced picture with over-cultivation as the primary factor.\n\nIn Europe, deforestation accounts for the largest proportion of degraded land at 38%, followed by over-grazing and over-cultivation at 23% and 22% respectively. Industrial and urban development causes the remaining 17%.\n\nBy contrast, Oceania shows a strikingly different pattern: over-grazing is responsible for approximately 52% of land degradation, making it by far the most significant cause. Deforestation contributes 28%, while over-cultivation accounts for just 13%.\n\nNorth America presents the most evenly distributed causes, with over-cultivation leading at 32%, deforestation at 28%, and over-grazing at 24%. Industrial causes contribute the smallest share at 16%.',
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.wt1.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The line graph below shows the consumption of three types of fast food by teenagers in Australia between 1975 and 2000. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Covers all key features with a clear overview', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical organisation with clear progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Appropriate vocabulary for trend description', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Variety of structures used accurately', maxScore: 9 },
      ],
      modelAnswer: 'The line graph depicts changes in the consumption of pizza, hamburgers, and fish and chips among Australian teenagers from 1975 to 2000.\n\nOverall, pizza consumption rose dramatically to become the most popular choice by 2000, while fish and chips declined significantly. Hamburger consumption fluctuated but ultimately showed little net change.\n\nIn 1975, fish and chips was the most consumed fast food at approximately 100 times per year. Hamburgers were eaten about 80 times annually, while pizza was the least popular at roughly 50 times per year.\n\nPizza consumption increased steadily throughout the period, rising from 50 to approximately 200 times per year by 2000 — a fourfold increase. In contrast, fish and chips consumption fell sharply from 100 to about 40 times per year.\n\nHamburger consumption peaked at around 90 in 1985 before declining to approximately 80 by 2000, almost returning to its 1975 level.',
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS WRITING TASK 2 — Essay
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt2.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Some people believe that universities should focus on providing academic skills and knowledge, while others think universities should prepare students for employment. Discuss both views and give your own opinion. Write at least 250 words.',
      format: 'ielts_task2_discuss',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Addresses all parts of the task with a clear position', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear progression, appropriate paragraphing', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Sufficient range with some less common vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Mix of simple and complex sentences', maxScore: 9 },
      ],
      modelAnswer: 'There is an ongoing debate about whether universities should prioritise academic knowledge or vocational preparation. While both perspectives have merit, I believe that the most effective approach combines elements of both.\n\nProponents of academic education argue that universities exist primarily to advance knowledge and critical thinking. They contend that a rigorous academic foundation equips graduates with transferable analytical skills that remain valuable regardless of how job markets evolve. Furthermore, academic research drives innovation that ultimately benefits society and the economy.\n\nOn the other hand, those favouring employment-focused education point to rising graduate unemployment rates as evidence that academic curricula alone are insufficient. They argue that practical skills, internships, and industry partnerships better prepare students for the realities of the workplace. This view is supported by employers who frequently report that graduates lack essential professional competencies.\n\nIn my view, the dichotomy between academic and vocational education is a false one. The most successful universities integrate both approaches — for example, requiring research projects that address real-world problems or embedding professional placements within academic programmes. This prepares students not only for their first job but for a lifetime of career adaptation.\n\nIn conclusion, rather than choosing between academic rigour and practical preparation, universities should aim to deliver both, producing graduates who can think critically and contribute productively from day one.',
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.wt2.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'In many countries, the gap between the rich and the poor is increasing. What problems does this cause? What solutions can you suggest? Write at least 250 words.',
      format: 'ielts_task2_problems_solutions',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Identifies problems and proposes relevant solutions', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear progression, appropriate paragraphing', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Topic-specific vocabulary used appropriately', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Mix of simple and complex sentences', maxScore: 9 },
      ],
      modelAnswer: 'The widening wealth gap between the affluent and the disadvantaged is a growing concern in many nations. This essay will examine the key problems this disparity creates and suggest potential remedies.\n\nThe most significant problem caused by income inequality is limited access to essential services. When wealth concentrates among a small elite, public funding for healthcare, education, and infrastructure suffers, creating a cycle where the poor remain trapped in poverty. Additionally, extreme inequality breeds social tension and can lead to increased crime rates, as those at the bottom of the economic ladder may feel they have little to lose.\n\nFurthermore, economic inequality undermines democratic institutions. Wealthy individuals and corporations can exert disproportionate political influence through lobbying and campaign contributions, resulting in policies that further entrench their advantages.\n\nSeveral solutions could address these issues. Progressive taxation, where higher earners pay a larger percentage of their income, can fund social programmes that provide equal opportunities. Governments should also invest heavily in free or subsidised education, which remains the most reliable pathway out of poverty.\n\nAdditionally, raising minimum wages and strengthening workers\' rights can help ensure that economic growth benefits all segments of society. Corporate governance reforms requiring companies to share profits more equitably with employees could also narrow the gap.\n\nIn conclusion, while income inequality presents serious social and political challenges, a combination of fiscal policy, educational investment, and labour reforms can create a more equitable society.',
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.wt2.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime. Discuss both views and give your opinion. Write at least 250 words.',
      format: 'ielts_task2_discuss',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Addresses all parts with clear position throughout', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear progression, appropriate paragraphing', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Uses less common vocabulary with awareness of style', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Frequent error-free sentences', maxScore: 9 },
      ],
      modelAnswer: 'Crime reduction is a pressing concern for governments worldwide, and there is considerable debate about whether harsher prison sentences or alternative approaches are more effective. I believe that while imprisonment has its place, alternative methods offer greater long-term benefits.\n\nAdvocates of longer sentences argue that they serve as a powerful deterrent. The prospect of extended incarceration, they suggest, discourages potential offenders from committing crimes. Moreover, keeping criminals in prison for longer periods protects the public by removing dangerous individuals from society.\n\nHowever, evidence from many countries suggests that longer sentences do not necessarily reduce reoffending rates. In fact, prisons can serve as "schools of crime" where inmates learn more sophisticated criminal techniques. Alternative approaches such as rehabilitation programmes, community service, and education have shown more promising results in reducing recidivism.\n\nFurthermore, addressing the root causes of crime — poverty, lack of education, substance abuse, and mental health issues — through targeted social programmes can prevent crime before it occurs. Countries like Norway, which focus on rehabilitation rather than punishment, consistently report lower reoffending rates than those with punitive systems.\n\nIn conclusion, while long prison sentences may be necessary for the most serious offences, a comprehensive approach that combines rehabilitation, education, and social support is more likely to achieve lasting reductions in crime rates.',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS SPEAKING PART 1 — Short Answers
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp1.01', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about your hometown. Where is your hometown? What do you like most about it? Has it changed much since you were a child?',
      format: 'ielts_part1',
      followUpQuestions: [
        'Is your hometown a good place for young people?',
        'Would you recommend visitors to go there?',
        'Do you think you will continue living there in the future?',
      ],
      prepTimeSeconds: 0,
      speakTimeSeconds: 120,
      targetLanguage: [
        'Present tense for descriptions: "My hometown is located in..."',
        'Present perfect for changes: "It has developed significantly..."',
        'Extending answers: reason + example in 2-3 sentences per question',
      ],
      modelAnswerNotes: 'Band 7+: Extend each answer with reasons and examples. Avoid one-word answers. Use varied vocabulary (e.g., "bustling" instead of "busy"). Show natural fluency — don\'t memorise scripts but practise having flexible answer frameworks.',
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.sp1.02', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about reading. Do you like reading? What kind of books or articles do you usually read? Do you prefer reading paper books or e-books?',
      format: 'ielts_part1',
      followUpQuestions: [
        'Did you read a lot when you were a child?',
        'Do you think reading is important? Why?',
        'What would you like to read in the future?',
      ],
      prepTimeSeconds: 0,
      speakTimeSeconds: 120,
      targetLanguage: [
        'Expressing preferences: "I tend to prefer...", "I\'m particularly drawn to..."',
        'Giving reasons: "The main reason is that...", "This is largely because..."',
        'Past habits: "I used to read...", "When I was younger, I would..."',
      ],
      modelAnswerNotes: 'Band 7+: Don\'t just state preferences — justify them. Use a range of tenses naturally: present for current habits, past for childhood, conditional for hypotheticals. Show topic vocabulary beyond basic ("genre", "non-fiction", "page-turner").',
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.sp1.03', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about technology. How often do you use your phone? What do you mainly use it for? Do you think people spend too much time on their phones?',
      format: 'ielts_part1',
      followUpQuestions: [
        'Have you ever tried to reduce your phone usage?',
        'What technology could you not live without?',
        'Do you think technology has made life easier or more complicated?',
      ],
      prepTimeSeconds: 0,
      speakTimeSeconds: 120,
      targetLanguage: [
        'Frequency adverbs: "constantly", "on a daily basis", "virtually all the time"',
        'Hedging opinions: "I suppose...", "To some extent...", "It depends on..."',
        'Concession: "While I acknowledge that..., I still believe..."',
      ],
      modelAnswerNotes: 'Band 7+: Show nuanced opinions — avoid binary "yes/no" stances. Use hedging language to show sophistication. Demonstrate topic-specific vocabulary ("addictive", "screen time", "digital detox").',
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS SPEAKING PART 2 — Long Turn (Cue Card)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp2.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a time when you helped someone. You should say:\n- who you helped\n- how you helped them\n- why they needed help\nand explain how you felt about helping them.',
      format: 'ielts_part2',
      cueCardPoints: [
        'Who you helped',
        'How you helped them',
        'Why they needed help',
        'How you felt about helping them',
      ],
      followUpQuestions: [
        'Do you think people help each other enough in modern society?',
        'Should schools teach children about helping others?',
      ],
      prepTimeSeconds: 60,
      speakTimeSeconds: 120,
      targetLanguage: [
        'Narrative tenses: past simple, past continuous, past perfect',
        'Feeling vocabulary: "gratifying", "fulfilling", "touched"',
        'Discourse markers: "What happened was...", "Looking back on it..."',
      ],
      modelAnswerNotes: 'Band 7+: Use the 1-minute prep to make brief notes on each bullet point. Structure your answer chronologically. Aim for 1.5-2 minutes of speech. Use a range of past tenses naturally. End with a reflection on the experience — don\'t just list facts.',
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.sp2.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a piece of technology you find useful. You should say:\n- what it is\n- how often you use it\n- what you use it for\nand explain why you find it useful.',
      format: 'ielts_part2',
      cueCardPoints: [
        'What the technology is',
        'How often you use it',
        'What you use it for',
        'Why you find it useful',
      ],
      followUpQuestions: [
        'Do you think older people struggle with modern technology?',
        'How do you think technology will change in the next 20 years?',
      ],
      prepTimeSeconds: 60,
      speakTimeSeconds: 120,
      targetLanguage: [
        'Describing function: "It enables me to...", "The main purpose is..."',
        'Expressing frequency: "On a daily basis", "Hardly a day goes by without..."',
        'Evaluating impact: "It has revolutionised the way I...", "It\'s indispensable for..."',
      ],
      modelAnswerNotes: 'Band 7+: Don\'t just describe — evaluate. Show WHY the technology matters to your life. Use specific examples rather than generalisations. Demonstrate vocabulary beyond basic tech terms ("streamline", "user-friendly", "seamless integration").',
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.sp2.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a place you would like to visit in the future. You should say:\n- where it is\n- how you know about it\n- what you would like to do there\nand explain why you would like to visit this place.',
      format: 'ielts_part2',
      cueCardPoints: [
        'Where the place is',
        'How you know about it',
        'What you would like to do there',
        'Why you would like to visit',
      ],
      followUpQuestions: [
        'Do you prefer travelling alone or with other people?',
        'How has international travel changed in recent years?',
      ],
      prepTimeSeconds: 60,
      speakTimeSeconds: 120,
      targetLanguage: [
        'Conditional: "If I had the chance, I would...", "I\'d love to..."',
        'Sources of knowledge: "I\'ve seen documentaries about...", "A friend of mine went there and..."',
        'Descriptive language: "breathtaking scenery", "culturally rich", "off the beaten track"',
      ],
      modelAnswerNotes: 'Band 7+: Use conditionals naturally when talking about future plans. Paint a vivid picture with descriptive adjectives. Show personal connection — why THIS place specifically, not just generic travel desire.',
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS SPEAKING PART 3 — Abstract Discussion
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp3.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about helping people. Now I\'d like to discuss charity and volunteering more generally. Why do you think some people choose to volunteer their time?',
      format: 'ielts_part3',
      followUpQuestions: [
        'Do you think governments or charities are better at helping people in need?',
        'Some people say that charity creates dependency. What is your opinion?',
        'How has the way people donate to charity changed with technology?',
        'Do you think wealthy people have a responsibility to give to charity?',
      ],
      prepTimeSeconds: 0,
      speakTimeSeconds: 180,
      targetLanguage: [
        'Speculating: "It could be argued that...", "One possible reason is..."',
        'Comparing viewpoints: "While some maintain that..., others contend that..."',
        'Evaluating: "On balance, I would say...", "The evidence suggests..."',
      ],
      modelAnswerNotes: 'Band 7+: This tests your ability to discuss ABSTRACT ideas, not personal anecdotes. Generalise from the Part 2 topic. Give balanced arguments before stating your position. Use sophisticated discourse markers ("Nevertheless", "Having said that", "By the same token").',
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.sp3.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about technology. Let\'s discuss the impact of technology on society. In what ways has technology changed the way people communicate?',
      format: 'ielts_part3',
      followUpQuestions: [
        'Do you think technology has made people more or less sociable?',
        'What are the dangers of children using technology at a young age?',
        'How might artificial intelligence affect employment in the future?',
        'Should governments regulate how companies use personal data?',
      ],
      prepTimeSeconds: 0,
      speakTimeSeconds: 180,
      targetLanguage: [
        'Exemplifying: "A case in point is...", "For instance..."',
        'Predicting: "It is likely that...", "We can expect to see..."',
        'Qualifying: "To a certain extent...", "It\'s not necessarily the case that..."',
      ],
      modelAnswerNotes: 'Band 7+: Develop each answer for 30-45 seconds. Structure: state opinion → give reason → provide example → add nuance. Don\'t agree with everything the examiner says — show independent thinking.',
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS ACADEMIC READING — Exam-Style Passages
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.01', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.ielts.time_management'],
    payload: {
      title: 'The Psychology of Decision-Making',
      passage: 'Human beings make thousands of decisions every day, from trivial choices about what to eat to life-changing decisions about careers and relationships. Psychologists have long been fascinated by the processes that underlie these decisions, and their research has revealed that our choices are far less rational than we might assume.\n\nDaniel Kahneman, a Nobel Prize-winning psychologist, proposed that humans use two distinct systems of thinking. System 1 is fast, automatic, and intuitive — it allows us to make quick judgements based on patterns and past experience. System 2 is slower, more deliberate, and requires conscious effort. While System 2 is capable of complex reasoning, we tend to rely on System 1 for most decisions, which can lead to systematic errors known as cognitive biases.\n\nOne of the most well-documented biases is the anchoring effect, whereby people are influenced by irrelevant information presented before they make a decision. In a classic experiment, participants were asked to estimate the percentage of African countries in the United Nations. Before answering, they watched a rigged wheel of fortune that landed on either 10 or 65. Those who saw the wheel land on 65 gave significantly higher estimates than those who saw it land on 10, despite the number being entirely random.\n\nAnother common bias is loss aversion — the tendency to feel the pain of losing something more intensely than the pleasure of gaining something of equal value. Research shows that most people would reject a fair coin toss where they could win £110 or lose £100, even though the expected value is positive. This asymmetry in how we process gains and losses has profound implications for everything from investment behaviour to public policy.\n\nThe implications of these findings extend beyond academia. Behavioural economists have used insights from decision-making research to design "nudges" — subtle changes to the environment that guide people toward better choices without restricting their freedom. For example, automatically enrolling employees in pension schemes (with the option to opt out) has dramatically increased retirement savings rates in many countries.',
      source: 'Original content',
      questions: [
        { stem: 'According to the passage, what is the main characteristic of System 1 thinking?', options: ['It requires conscious effort and deliberation', 'It is fast, automatic, and based on intuition', 'It is used only for important decisions', 'It is free from cognitive biases'], correctIndex: 1 },
        { stem: 'The anchoring effect experiment demonstrated that:', options: ['African geography knowledge varies widely', 'Random numbers can systematically influence estimates', 'Wheel of fortune results predict geographic knowledge', 'People tend to underestimate percentages'], correctIndex: 1 },
        { stem: 'Loss aversion suggests that people:', options: ['Always make rational financial decisions', 'Are equally affected by gains and losses', 'Feel losses more strongly than equivalent gains', 'Prefer risky gambles to certain outcomes'], correctIndex: 2 },
        { stem: 'What is the main purpose of "nudges" as described in the passage?', options: ['To restrict people\'s freedom of choice', 'To eliminate all cognitive biases from decisions', 'To guide people toward better choices through environmental design', 'To force people to save for retirement'], correctIndex: 2 },
      ],
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.rd.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'Urban Green Spaces and Public Health',
      passage: 'The relationship between urban green spaces and public health has attracted considerable research attention in recent decades. As the world becomes increasingly urbanised — with projections suggesting that 68% of the global population will live in cities by 2050 — understanding how urban environments affect physical and mental health has become a priority for public health researchers.\n\nStudies consistently show that access to parks, gardens, and other green spaces is associated with improved mental health outcomes. A landmark study conducted in the Netherlands found that residents living within one kilometre of green space reported fewer symptoms of depression and anxiety compared to those in areas with less vegetation. The researchers controlled for socioeconomic factors, suggesting that the relationship was not simply due to wealthier communities having more parks.\n\nThe mechanisms through which green spaces benefit health are multiple. Physical activity is perhaps the most obvious pathway — people with access to parks are more likely to exercise regularly. However, the benefits extend beyond exercise. Exposure to natural environments has been shown to reduce cortisol levels, lower blood pressure, and improve immune function. Japanese researchers have popularised the concept of "forest bathing" (shinrin-yoku), demonstrating that even short periods spent in woodland settings produce measurable physiological benefits.\n\nUrban green spaces also serve important social functions. Parks provide neutral meeting places where people from different backgrounds can interact, potentially strengthening community bonds and reducing social isolation — itself a significant risk factor for poor health. Community gardens, in particular, have been associated with increased social cohesion, improved nutrition through home-grown produce, and enhanced neighbourhood safety.\n\nDespite this evidence, access to quality green space is far from equitable. Research from multiple countries reveals that low-income and minority neighbourhoods typically have fewer and lower-quality parks. This "green space gap" means that those who might benefit most from these spaces are least likely to have access to them, potentially exacerbating existing health inequalities.',
      source: 'Original content',
      questions: [
        { stem: 'According to the passage, why has research into urban green spaces become a priority?', options: ['Because city parks are becoming more expensive to maintain', 'Because rapid urbanisation is making the research urgent', 'Because governments are cutting green space funding', 'Because rural areas are losing their green spaces'], correctIndex: 1 },
        { stem: 'The Netherlands study controlled for socioeconomic factors in order to:', options: ['Prove that wealthy people have better mental health', 'Show that the green space effect wasn\'t just about wealth', 'Demonstrate that poor areas lack parks', 'Compare urban and rural mental health'], correctIndex: 1 },
        { stem: 'What does the passage suggest about the "green space gap"?', options: ['It is gradually closing in most countries', 'It affects all income groups equally', 'It may worsen existing health inequalities', 'It is only a problem in developing countries'], correctIndex: 2 },
        { stem: 'Community gardens are described as beneficial because they:', options: ['Replace the need for public parks entirely', 'Only improve physical health through exercise', 'Enhance social connections, nutrition, and safety', 'Are cheaper than traditional parks to maintain'], correctIndex: 2 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS STRATEGY — MCQ + Gap Fill + Error Correction
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.strat.01', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'In IELTS Writing, you have 60 minutes for both tasks. The recommended time split is:',
      options: [
        { text: '30 minutes for Task 1, 30 minutes for Task 2', misconception: 'Equal time ignores that Task 2 is worth twice as many marks' },
        { text: '20 minutes for Task 1, 40 minutes for Task 2', misconception: null },
        { text: '15 minutes for Task 1, 45 minutes for Task 2', misconception: 'Too little time for Task 1 risks an incomplete response' },
        { text: '25 minutes for Task 1, 35 minutes for Task 2', misconception: 'Too much time on Task 1 leaves insufficient time for the higher-scoring Task 2' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.strat.02', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      stem: 'What should the first paragraph of an IELTS Writing Task 1 response contain?',
      options: [
        { text: 'Your personal opinion about the data', misconception: 'Task 1 is descriptive — no personal opinions' },
        { text: 'A paraphrase of the question and an overview of the main trends', misconception: null },
        { text: 'Specific data points and exact numbers', misconception: 'Specific data belongs in body paragraphs, not the introduction' },
        { text: 'A thesis statement arguing for or against something', misconception: 'Thesis statements are for Task 2 essays, not Task 1 reports' },
      ],
      correctIndex: 1,
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.strat.03', type: 'mcq', level: 'B2', skill: 'general',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      stem: 'In an IELTS Task 2 "discuss both views" essay, what is the most effective structure?',
      options: [
        { text: 'Introduction → View 1 paragraph → View 2 paragraph → Your opinion in conclusion', misconception: null },
        { text: 'Introduction → All arguments mixed together → Conclusion', misconception: 'Mixing both views makes the essay confusing and hard to follow' },
        { text: 'Introduction → Your opinion only → Conclusion', misconception: 'Ignoring one side fails to address all parts of the task' },
        { text: 'Introduction → Personal anecdotes → Conclusion', misconception: 'IELTS essays require generalised arguments, not personal stories' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.strat.04', type: 'mcq', level: 'B1', skill: 'speaking',
    nodeIds: ['strat.ielts.part1_answers'],
    payload: {
      stem: 'In IELTS Speaking Part 1, what is the ideal length for each answer?',
      options: [
        { text: 'One word or a short phrase', misconception: 'Too short — fails to demonstrate language ability' },
        { text: '2-3 sentences with a reason or example', misconception: null },
        { text: 'A full paragraph of 8-10 sentences', misconception: 'Too long — Part 1 answers should be concise, not monologues' },
        { text: 'A memorised script about the topic', misconception: 'Memorised answers are penalised — examiners can detect them' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.strat.05', type: 'mcq', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.ielts.part3_extend'],
    payload: {
      stem: 'Which technique best demonstrates a Band 7+ answer in IELTS Speaking Part 3?',
      options: [
        { text: 'Repeating the examiner\'s question back before answering', misconception: 'Parroting wastes time and doesn\'t demonstrate language skill' },
        { text: 'Giving a one-sided strong opinion without qualification', misconception: 'Unqualified opinions lack the nuance expected at Band 7+' },
        { text: 'Stating an opinion, giving a reason, providing an example, then adding a counterpoint', misconception: null },
        { text: 'Speaking as fast as possible to show fluency', misconception: 'Speed without clarity hurts fluency and pronunciation scores' },
      ],
      correctIndex: 2,
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS VOCABULARY & GRAMMAR — Gap Fill, Error Correction
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.gf.01', type: 'gap_fill', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      stem: 'The graph ______ a significant increase in internet usage ______ 2010 and 2020, ______ the rate of growth varied ______ countries.',
      gaps: [
        { correctAnswer: 'illustrates', acceptedAlternatives: ['shows', 'depicts', 'reveals'], hint: 'verb to describe what the graph does' },
        { correctAnswer: 'between', acceptedAlternatives: [], hint: 'preposition for a time range' },
        { correctAnswer: 'although', acceptedAlternatives: ['though', 'while'], hint: 'concession linking word' },
        { correctAnswer: 'across', acceptedAlternatives: ['between', 'among'], hint: 'preposition for comparing multiple items' },
      ],
      difficulty: 0.45,
    },
  },
  {
    id: 'ielts.gf.02', type: 'gap_fill', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      stem: '______, there are compelling arguments on both sides. ______, I believe that the advantages ______ outweigh the disadvantages. ______, education remains the most effective long-term solution.',
      gaps: [
        { correctAnswer: 'Overall', acceptedAlternatives: ['In conclusion', 'To conclude'], hint: 'opening word for a conclusion' },
        { correctAnswer: 'However', acceptedAlternatives: ['Nevertheless', 'Nonetheless'], hint: 'contrast linker before your opinion' },
        { correctAnswer: 'significantly', acceptedAlternatives: ['clearly', 'considerably', 'far'], hint: 'adverb to strengthen comparison' },
        { correctAnswer: 'Ultimately', acceptedAlternatives: ['In the long run', 'Fundamentally'], hint: 'final emphasis adverb' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.ec.01', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      sentence: 'The chart shows that the amount of people using public transport raised dramatically between 2005 and 2015.',
      errorPart: 'amount of people',
      correction: 'number of people',
      explanation: '"Amount" is used with uncountable nouns; "number" is used with countable nouns. Since "people" is countable, use "number of people". Also note: "raised" should be "rose" (intransitive), but the primary error here is the amount/number distinction — a common IELTS mistake.',
      difficulty: 0.45,
    },
  },
  {
    id: 'ielts.ec.02', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      sentence: 'In my point of view, the government should invest more money for education instead of military spending.',
      errorPart: 'In my point of view',
      correction: 'In my view',
      explanation: '"In my point of view" is a common error combining "in my view" and "from my point of view". Either form is correct, but the hybrid is not. Additionally, "invest money for" should be "invest money in" — but the main error is the mixed expression.',
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS MATCHING — Heading/Information Matching
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.mt.01', type: 'matching', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'Match each paragraph topic with the correct description of its role in an IELTS Academic Reading passage.',
      pairs: [
        { left: 'Abstract concepts defined with examples', right: 'Introduction paragraph' },
        { left: 'Evidence from research studies', right: 'Supporting body paragraph' },
        { left: 'Contrasting viewpoints presented', right: 'Discussion paragraph' },
        { left: 'Practical applications and future directions', right: 'Conclusion paragraph' },
      ],
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS WORD FORMATION — Academic Register
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wf.01', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task2_structure'],
    payload: {
      stem: 'The ______ of renewable energy sources has become a global priority in recent years.',
      rootWord: 'develop',
      acceptedAnswers: ['development'],
      explanation: 'develop → development (noun). In IELTS Writing Task 2, nominalisation (turning verbs into nouns) is essential for academic register: "X developed" → "the development of X".',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.wf.02', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task2_structure'],
    payload: {
      stem: 'There has been a ______ improvement in healthcare outcomes across developing nations.',
      rootWord: 'signify',
      acceptedAnswers: ['significant'],
      explanation: 'signify → significant (adjective). Using precise modifiers like "significant", "substantial", "marginal" instead of "big" or "a lot" distinguishes Band 7+ writing.',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.wf.03', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'Contrary to popular ______, most immigrants contribute positively to the economy.',
      rootWord: 'believe',
      acceptedAnswers: ['belief'],
      explanation: 'believe → belief (noun). "Contrary to popular belief" is a set phrase frequently used in IELTS Task 2 to introduce a counterargument.',
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS WRITING TASK 1 — Table, Map, Process (missing chart types)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt1.04', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The table below shows the percentage of the population aged 65 and over in four countries in 1980, 2000, and 2020 (projected for 2040). Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.\n\n| Country | 1980 | 2000 | 2020 | 2040 (proj.) |\n|---------|------|------|------|--------------|\n| Japan | 9.1% | 17.4% | 28.7% | 36.5% |\n| Germany | 15.5% | 16.4% | 21.7% | 31.2% |\n| USA | 11.3% | 12.4% | 16.6% | 21.4% |\n| Brazil | 4.0% | 5.8% | 9.6% | 17.6% |',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Covers key features with overview; comparisons made', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical organisation with clear progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Vocabulary for describing table data accurately', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Variety of structures used accurately', maxScore: 9 },
      ],
      modelAnswer: 'The table compares the proportion of elderly residents (aged 65+) in Japan, Germany, the USA, and Brazil across four decades from 1980 to a projected 2040.\n\nOverall, all four countries show a steady increase in their ageing populations, with Japan consistently recording the highest percentages and expected to reach over a third of its population by 2040.\n\nIn 1980, Germany had the largest elderly population at 15.5%, while Brazil had the smallest at just 4.0%. Japan stood at 9.1%, below both Germany and the USA (11.3%). By 2020, however, Japan had overtaken all others dramatically, reaching 28.7% — almost triple its 1980 figure.\n\nProjections for 2040 suggest Japan will peak at 36.5%, followed by Germany at 31.2%. The USA is predicted to reach 21.4%, while Brazil, despite starting lowest, is forecast to nearly quadruple its 1980 figure to 17.6%.\n\nNotably, Japan and Brazil show the steepest rates of change, albeit from very different starting points.',
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.wt1.05', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The two maps below show the village of Millford in 1980 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.\n\n1980: Small village centre with a church, post office, and primary school around a village green. Farmland to the north and east. A single road running east-west. River running along the southern boundary. A few houses along the main road.\n\n2020: Village green replaced by a car park. New housing estate to the north (where farmland was). Supermarket and medical centre built on the eastern farmland. Primary school expanded with a sports centre. New bypass road to the south. Post office closed, replaced by a café. Church unchanged.',
      format: 'ielts_task1_map',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Covers all major changes with clear overview', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Spatial language used effectively', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Vocabulary for describing change and location', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Passive voice and past tenses used accurately', maxScore: 9 },
      ],
      modelAnswer: 'The two maps illustrate the development of Millford village between 1980 and 2020.\n\nOverall, the village has undergone significant urbanisation, with farmland being replaced by residential and commercial developments, while few original features remain unchanged.\n\nIn 1980, Millford was a small rural settlement centred around a village green, with a church, post office, and primary school nearby. Farmland occupied the northern and eastern areas, and a single road ran east-west through the village.\n\nBy 2020, the village had expanded considerably. The village green was converted into a car park, and the northern farmland was replaced by a housing estate. To the east, a supermarket and medical centre were constructed on former agricultural land. The primary school was extended, and a new sports centre was added alongside it.\n\nThe post office closed and was replaced by a café, while the church remained the only original building that was unaltered. A new bypass road was built to the south of the village, parallel to the river.\n\nThese changes reflect a typical pattern of rural-to-suburban transformation.',
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.wt1.06', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The diagram below shows the process of making orange juice from harvest to packaging. Summarise the information by selecting and reporting the main features. Write at least 150 words.\n\nProcess stages:\n1. Oranges harvested from trees by hand or machine\n2. Transported by truck to the processing plant\n3. Washed and sorted — damaged oranges removed\n4. Oranges cut in half and juice extracted by mechanical press\n5. Seeds and pulp separated by filtration\n6. Juice pasteurised at 95°C for 30 seconds to kill bacteria\n7. Cooled rapidly to 4°C\n8. Tested for quality (sugar content, acidity, flavour)\n9. Packaged in cartons or bottles\n10. Stored in refrigerated warehouse before distribution',
      format: 'ielts_task1_process',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'All stages covered with clear overview', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Sequencing language used effectively', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Process vocabulary used accurately', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Passive voice used appropriately throughout', maxScore: 9 },
      ],
      modelAnswer: 'The diagram illustrates the ten-stage process by which orange juice is produced, from initial harvesting through to storage for distribution.\n\nOverall, the process involves three main phases: harvesting and transport, juice extraction and treatment, and quality control and packaging.\n\nIn the first phase, oranges are harvested from trees either manually or using machinery. They are then transported by truck to a processing plant, where they are washed thoroughly and sorted. Any damaged fruit is removed at this stage.\n\nNext, the oranges are halved and their juice is extracted using a mechanical press. The resulting liquid is filtered to remove seeds and pulp. The juice then undergoes pasteurisation, during which it is heated to 95°C for 30 seconds to eliminate harmful bacteria, before being rapidly cooled to 4°C.\n\nFinally, the juice is subjected to quality testing, which checks sugar content, acidity levels, and flavour. Once approved, it is packaged into cartons or bottles and transferred to a refrigerated warehouse, where it is stored prior to distribution.',
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS WRITING TASK 2 — Agree/Disagree, Advantages/Disadvantages
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt2.04', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Some people believe that children should be allowed to use social media, while others think it should be banned for those under 16. To what extent do you agree or disagree with banning social media for children? Write at least 250 words.',
      format: 'ielts_task2_agree_disagree',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Clear position sustained throughout with developed ideas', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear progression, appropriate paragraphing', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Topic-specific vocabulary used with precision', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Wide range of structures with flexibility', maxScore: 9 },
      ],
      modelAnswer: 'The question of whether children under 16 should be prohibited from using social media is increasingly relevant in today\'s digital world. While I acknowledge the concerns about young people\'s online safety, I largely disagree with an outright ban, as I believe regulated access is more practical and beneficial.\n\nAdmittedly, there are legitimate reasons for restricting children\'s social media use. Cyberbullying, exposure to inappropriate content, and the negative effects on mental health — including anxiety and body image issues — are well-documented risks. Furthermore, young users may lack the critical thinking skills needed to identify misinformation or resist manipulative advertising.\n\nHowever, a complete ban would be both impractical and counterproductive. Firstly, enforcing such a prohibition would be extremely difficult, as children could easily access platforms using false age information or their parents\' devices. Secondly, social media offers genuine educational and social benefits: it allows young people to connect with peers, access learning resources, and develop digital literacy skills that are essential in the modern workforce.\n\nA more effective approach would be to combine parental guidance with digital literacy education in schools. Teaching children to use social media responsibly — including how to protect their privacy, recognise manipulation, and manage screen time — would equip them with lifelong skills rather than simply delaying their exposure.\n\nIn conclusion, while children\'s online safety must be prioritised, education and supervised access are preferable to an outright ban that is likely to be both unenforceable and educationally limiting.',
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.wt2.05', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Many people now work from home rather than travelling to a workplace. What are the advantages and disadvantages of this trend? Write at least 250 words.',
      format: 'ielts_task2_advantages_disadvantages',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Both advantages and disadvantages fully developed', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear paragraphing with logical progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Good range of work-related vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Complex structures used with control', maxScore: 9 },
      ],
      modelAnswer: 'The rise of remote working has transformed employment patterns globally, particularly since the COVID-19 pandemic accelerated this trend. While working from home offers significant benefits, it also presents notable challenges.\n\nThe primary advantage of remote work is the flexibility it provides. Employees can structure their day around personal commitments, eliminating lengthy commutes and thereby saving both time and money. This flexibility often leads to improved work-life balance and higher job satisfaction. Additionally, companies benefit from reduced overhead costs, as they require less office space, and can recruit talent from a wider geographical pool.\n\nFurthermore, many studies indicate that remote workers are more productive than their office-based counterparts. Without the distractions of an open-plan office — such as impromptu meetings and background noise — employees can often concentrate more effectively on complex tasks.\n\nHowever, remote working also carries significant drawbacks. The lack of face-to-face interaction can lead to feelings of isolation and disconnection from colleagues, which may negatively impact mental health over time. Collaboration and spontaneous idea-sharing, which often occur naturally in an office environment, can be more difficult to replicate virtually.\n\nMoreover, the blurred boundary between home and work can result in employees working longer hours, as the physical separation between professional and personal space disappears. This can paradoxically undermine the very work-life balance that remote working promises.\n\nIn conclusion, while remote work offers compelling advantages in terms of flexibility and productivity, employers must actively address the risks of isolation and overwork to ensure this arrangement benefits both parties.',
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.wt2.06', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Nowadays many people choose to be self-employed, rather than to work for a company or organisation. Why might this be the case? What could be the disadvantages of being self-employed? Write at least 250 words.',
      format: 'ielts_task2_two_part',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Both questions fully addressed with developed ideas', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear two-part structure with progression', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Appropriate employment/business vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Range of structures with accuracy', maxScore: 9 },
      ],
      modelAnswer: 'An increasing number of people are opting for self-employment over traditional corporate careers. This essay will examine the factors driving this trend and the potential drawbacks associated with working independently.\n\nThere are several compelling reasons why self-employment has become more attractive. The desire for autonomy is perhaps the most significant factor — many individuals value the freedom to choose their projects, set their own schedules, and work from any location. The digital economy has made this more feasible than ever, with platforms enabling freelancers to find clients globally.\n\nFinancial motivation also plays a role. Self-employed individuals can potentially earn more than salaried workers, as they capture the full value of their labour rather than receiving a fixed wage. Additionally, the gig economy and remote work technologies have lowered the barriers to starting a business.\n\nHowever, self-employment carries considerable disadvantages. The most significant is financial insecurity — without a guaranteed monthly salary, income can be unpredictable and irregular. Self-employed workers must also fund their own pension, health insurance, and holiday pay, which can be substantial.\n\nFurthermore, the isolation of working alone can affect mental wellbeing. Without colleagues, self-employed individuals may miss the social interactions and professional development opportunities that a workplace provides. The burden of managing every aspect of a business — from accounting to marketing — can also be overwhelming.\n\nIn conclusion, while self-employment offers attractive freedoms, prospective entrepreneurs should carefully consider the financial risks and personal challenges before leaving traditional employment.',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS SPEAKING PART 1 — 12 More Common Topics
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp1.04', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about your work or studies. What do you do? What do you enjoy most about your work/studies? Would you like to change anything about your current job/course?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you prefer working alone or in a team?', 'What are your future career plans?', 'Is your job/field popular in your country?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Present simple for routines: "I currently work as..."', 'Expressing preferences: "What I find most rewarding is..."', 'Conditionals for change: "If I could change one thing, I would..."'],
      modelAnswerNotes: 'Band 7+: Don\'t just name your job — describe what it involves. Show enthusiasm and use specific details rather than generic statements. Vary your sentence openings.',
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.sp1.05', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about food and cooking. What kind of food do you like? Can you cook? Do you think it\'s important for people to learn to cook?',
      format: 'ielts_part1',
      followUpQuestions: ['Have your food preferences changed since you were a child?', 'Do you prefer eating at home or in restaurants?', 'Is there any food you really don\'t like?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Food vocabulary: "cuisine", "flavour", "ingredients", "home-cooked"', 'Expressing ability: "I\'m fairly competent at...", "I can manage basic dishes..."', 'Giving opinions with reasons: "I believe it\'s essential because..."'],
      modelAnswerNotes: 'Band 7+: Use specific food vocabulary rather than "nice food" or "delicious". Share a brief anecdote. Show cultural awareness if discussing food from different countries.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.06', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about sports and exercise. Do you do any sport or physical activity? How often do you exercise? Do you prefer watching sports or playing them?',
      format: 'ielts_part1',
      followUpQuestions: ['What sports are popular in your country?', 'Did you play any sports as a child?', 'Do you think exercise is more important now than in the past?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Frequency: "I try to exercise at least three times a week"', 'Preferences: "I\'m more of a spectator than a participant"', 'Past habits: "I used to play... but now I tend to..."'],
      modelAnswerNotes: 'Band 7+: Use sports-specific vocabulary ("competitive", "recreational", "stamina"). Give reasons for your preferences. Compare past and present habits naturally.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.07', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about music. What type of music do you enjoy listening to? Do you play any musical instrument? Has your taste in music changed over the years?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you prefer listening to music alone or with others?', 'How important is music in your culture?', 'Do you ever go to live concerts?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Genre vocabulary: "classical", "contemporary", "acoustic", "upbeat"', 'Change over time: "My taste has evolved from... to..."', 'Describing feelings: "It helps me unwind", "It lifts my mood"'],
      modelAnswerNotes: 'Band 7+: Go beyond "I like pop music" — describe how and when you listen, what music means to you. Use less common adjectives: "soothing", "energising", "melancholic".',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.08', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about weather. What\'s the weather like in your country? Do you prefer hot or cold weather? Does the weather affect your mood?',
      format: 'ielts_part1',
      followUpQuestions: ['What do you usually do on rainy days?', 'Has the weather in your country changed in recent years?', 'What is your favourite season?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Weather vocabulary: "humid", "mild", "overcast", "scorching"', 'Describing impact: "I find that... tends to make me..."', 'Comparing: "Unlike summer, the winter months are..."'],
      modelAnswerNotes: 'Band 7+: Use varied weather vocabulary beyond "hot/cold/rainy". Connect weather to daily life and mood. Show ability to compare seasons and describe changes over time.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.09', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about travel. Do you like travelling? What was the last trip you took? Do you prefer travelling alone or with others?',
      format: 'ielts_part1',
      followUpQuestions: ['What kind of places do you like to visit?', 'Do you prefer planning a trip or being spontaneous?', 'How has travel changed with technology?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Travel collocations: "go on a trip", "explore a destination", "immerse yourself in"', 'Narrating past trips: "Last summer I had the opportunity to..."', 'Expressing preferences: "I\'m drawn to... rather than..."'],
      modelAnswerNotes: 'Band 7+: Be specific about your last trip — don\'t generalise. Use destination-related vocabulary. Show cultural curiosity when describing travel preferences.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.10', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about your home. What kind of housing do you live in? What is your favourite room? Would you like to move to a different place?',
      format: 'ielts_part1',
      followUpQuestions: ['What do you like about your neighbourhood?', 'Is it better to live in a house or a flat?', 'How would you improve your home if you could?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Housing vocabulary: "apartment", "detached house", "spacious", "cosy"', 'Describing rooms: "My favourite room is... because it has..."', 'Second conditional: "If I could move, I would choose..."'],
      modelAnswerNotes: 'Band 7+: Describe your living space with vivid adjectives. Give reasons for your favourite room. Use conditionals naturally when discussing ideal housing.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.11', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about friends. How often do you see your friends? What do you usually do together? Have you stayed in touch with childhood friends?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you prefer having many friends or a few close ones?', 'Is it easy to make new friends as an adult?', 'How has social media affected friendships?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Friendship collocations: "close friend", "keep in touch", "drift apart", "bond with"', 'Frequency: "We try to catch up at least once a month"', 'Present perfect: "We\'ve been friends since..."'],
      modelAnswerNotes: 'Band 7+: Use friendship-specific vocabulary. Share brief anecdotes. Demonstrate ability to discuss changing relationships over time.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.12', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about shopping. Do you enjoy shopping? Do you prefer shopping online or in stores? What was the last thing you bought?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you ever buy things you don\'t need?', 'How has shopping changed in recent years?', 'Do you compare prices before buying something?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Shopping vocabulary: "browse", "bargain", "impulse purchase", "value for money"', 'Comparing: "Online shopping is more convenient, whereas..."', 'Describing habits: "I tend to... when it comes to shopping"'],
      modelAnswerNotes: 'Band 7+: Avoid generic answers. Give specific examples of recent purchases. Compare online and in-store experiences with nuance.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.13', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about learning languages. Are you learning any foreign languages? What is the most difficult part of learning a new language? How do you usually practise?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you think everyone should learn a second language?', 'What is the best age to start learning a language?', 'How has technology changed language learning?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Learning vocabulary: "fluent", "proficient", "pick up", "immerse yourself"', 'Describing challenges: "What I find most challenging is..."', 'Methods: "I practise by...", "I\'ve found that... works best for me"'],
      modelAnswerNotes: 'Band 7+: Be specific about your learning strategies. Reflect on challenges honestly. This is a great topic to show self-awareness and varied vocabulary.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.sp1.14', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about the environment. Are you concerned about environmental issues? What do you do to help the environment? Is recycling common in your country?',
      format: 'ielts_part1',
      followUpQuestions: ['Do you think individuals or governments should do more?', 'What environmental problems are most serious in your area?', 'Has your awareness of environmental issues changed over time?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Environment vocabulary: "sustainable", "carbon footprint", "renewable", "conservation"', 'Personal actions: "I make a conscious effort to..."', 'Expressing concern: "I\'m particularly worried about..."'],
      modelAnswerNotes: 'Band 7+: Show genuine engagement with the topic. Use environment-specific vocabulary. Balance personal actions with broader societal observations.',
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.sp1.15', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],
    payload: {
      prompt: 'Let\'s talk about sleep. How many hours do you usually sleep? Do you ever have trouble sleeping? Do you think sleep is important for health?',
      format: 'ielts_part1',
      followUpQuestions: ['Are you a morning person or a night owl?', 'Do you take naps during the day?', 'What do you do before going to bed?'],
      prepTimeSeconds: 0, speakTimeSeconds: 120,
      targetLanguage: ['Sleep vocabulary: "insomnia", "sleep-deprived", "wind down", "restful"', 'Habits: "I tend to stay up late...", "My routine involves..."', 'Health connection: "Getting adequate sleep is crucial for..."'],
      modelAnswerNotes: 'Band 7+: Go beyond "I sleep 8 hours" — describe your sleep routine, challenges, and how sleep affects your daily life. Show awareness of sleep as a health topic.',
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS SPEAKING PART 2 — More Cue Cards (Person, Event, Object)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp2.04', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a person who has influenced you. You should say:\n- who this person is\n- how you know them\n- what they have done that influenced you\nand explain why this person had such an impact on you.',
      format: 'ielts_part2',
      cueCardPoints: ['Who the person is', 'How you know them', 'What they did that influenced you', 'Why they had such an impact'],
      followUpQuestions: ['Do you think famous people are good role models?', 'Is it important to have mentors in life?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Describing character: "selfless", "determined", "inspiring", "down-to-earth"', 'Impact language: "They taught me the value of...", "They shaped my perspective on..."', 'Present perfect for lasting influence: "They have always encouraged me to..."'],
      modelAnswerNotes: 'Band 7+: Focus on HOW and WHY, not just WHAT. Show emotional depth. Use specific examples of their influence rather than generic praise. End with a reflective statement about lasting impact.',
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.sp2.05', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a challenging experience you have had. You should say:\n- what the challenge was\n- when and where it happened\n- how you dealt with it\nand explain what you learned from this experience.',
      format: 'ielts_part2',
      cueCardPoints: ['What the challenge was', 'When and where it happened', 'How you dealt with it', 'What you learned'],
      followUpQuestions: ['Do you think challenges make people stronger?', 'How can parents help children deal with challenges?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Narrative structure: "At first I felt..., but gradually I realised..."', 'Emotional vocabulary: "daunting", "overwhelming", "persevere", "resilient"', 'Reflection: "In hindsight, I can see that...", "This experience taught me..."'],
      modelAnswerNotes: 'Band 7+: Structure as a narrative arc: situation → challenge → response → resolution → lesson. Use emotional vocabulary. Show personal growth. The "what you learned" part is where you demonstrate higher-level language.',
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.sp2.06', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a book or film that made a strong impression on you. You should say:\n- what it was about\n- when you read/watched it\n- why you chose it\nand explain what impression it made on you.',
      format: 'ielts_part2',
      cueCardPoints: ['What it was about', 'When you read/watched it', 'Why you chose it', 'What impression it made'],
      followUpQuestions: ['Do young people read less than in the past?', 'Are films better at telling stories than books?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Plot description: "It centres around...", "The story follows...", "Set in..."', 'Impact: "It profoundly changed my perspective on...", "It resonated with me because..."', 'Recommendation: "I would highly recommend it to anyone who..."'],
      modelAnswerNotes: 'Band 7+: Don\'t retell the entire plot — focus on what made it memorable. Use literary/film vocabulary ("compelling narrative", "thought-provoking", "protagonist"). Connect the work to your own experience or worldview.',
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.sp2.07', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],
    payload: {
      prompt: 'Describe a skill you would like to learn. You should say:\n- what the skill is\n- why you want to learn it\n- how you would learn it\nand explain how this skill would benefit you.',
      format: 'ielts_part2',
      cueCardPoints: ['What the skill is', 'Why you want to learn it', 'How you would learn it', 'How it would benefit you'],
      followUpQuestions: ['Are practical skills more important than academic ones?', 'Should schools teach more life skills?'],
      prepTimeSeconds: 60, speakTimeSeconds: 120,
      targetLanguage: ['Motivation: "I\'ve always been fascinated by...", "It\'s something I\'ve been meaning to..."', 'Learning methods: "I would start by...", "I\'d consider enrolling in..."', 'Benefits: "It would enable me to...", "It would open up opportunities for..."'],
      modelAnswerNotes: 'Band 7+: Be specific about the skill — not just "learn a language" but which one and why. Show awareness of practical steps. Use conditionals and future forms naturally.',
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS SPEAKING PART 3 — More Abstract Discussions
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.sp3.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about education. Let\'s discuss learning and education more broadly. Do you think the education system in most countries prepares students well for adult life?',
      format: 'ielts_part3',
      followUpQuestions: ['What subjects should be added to school curricula?', 'Is university education still worth the cost?', 'How will technology change education in the future?', 'Should teachers be paid more than they currently are?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Evaluating systems: "The current system tends to prioritise... at the expense of..."', 'Suggesting improvements: "One potential reform would be..."', 'Hedging: "It could be argued that...", "This is debatable, but..."'],
      modelAnswerNotes: 'Band 7+: Show critical thinking about education — don\'t just say "schools are good/bad". Discuss specific aspects (curriculum, teaching methods, assessment). Compare education systems across countries if possible. Use abstract language and generalisations.',
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.sp3.04', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about the environment. Let\'s discuss environmental responsibility. Who should be most responsible for protecting the environment — individuals, businesses, or governments?',
      format: 'ielts_part3',
      followUpQuestions: ['Can economic growth and environmental protection coexist?', 'Are international agreements effective at tackling climate change?', 'What role should developing countries play in reducing emissions?', 'Will future generations judge us harshly for our environmental record?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Distributing responsibility: "While individuals can..., it is ultimately governments that..."', 'Cause and effect: "This has led to...", "As a consequence..."', 'Conceding: "Granted, there are limitations, but..."'],
      modelAnswerNotes: 'Band 7+: Don\'t choose just one answer — discuss the interplay between all three. Use sophisticated hedging: "It\'s a shared responsibility, but the balance should shift toward..." Show awareness of economic vs environmental trade-offs.',
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.sp3.05', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about health. Let\'s discuss public health and lifestyle. Do you think people today are healthier or less healthy than previous generations?',
      format: 'ielts_part3',
      followUpQuestions: ['Should unhealthy food be taxed more heavily?', 'Is mental health given enough attention compared to physical health?', 'How much responsibility should individuals take for their own health?', 'What is the biggest health challenge facing your country?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Comparing generations: "Whereas our grandparents..., modern lifestyles tend to..."', 'Both sides: "On one hand... On the other hand..."', 'Qualifying: "To some extent this is true, however..."'],
      modelAnswerNotes: 'Band 7+: This question requires nuance — some aspects are better (medicine, sanitation), others worse (sedentary lifestyle, processed food). Show ability to see multiple perspectives. Use generation-comparison language naturally.',
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.sp3.06', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about work. Let\'s discuss employment and the future of work. Do you think automation and artificial intelligence will create more jobs or destroy them?',
      format: 'ielts_part3',
      followUpQuestions: ['What skills will be most important in the future job market?', 'Should governments provide a basic income for everyone?', 'Is it better to have one career for life or change careers frequently?', 'How important is job satisfaction compared to salary?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Predicting: "It\'s likely that...", "We can anticipate that..."', 'Balancing: "While certain roles will inevitably be automated, new types of..."', 'Abstract discussion: "The very nature of work is being redefined..."'],
      modelAnswerNotes: 'Band 7+: Avoid simple predictions. Discuss which sectors are most/least affected. Introduce concepts like "creative destruction" or "upskilling". Show awareness that this is a complex issue with winners and losers.',
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS READING — True/False/Not Given (the most iconic IELTS type)
  // # ═══════════════════════════════════════════════════════════════════
  // # Implemented as MCQ with T/F/NG options — maps to the mcq card.

  {
    id: 'ielts.tfng.01', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'The History of Coffee',
      passage: 'Coffee is one of the most widely consumed beverages in the world, with an estimated 2.25 billion cups drunk every day. The origins of coffee consumption are traditionally traced to Ethiopia, where legend holds that a goatherd named Kaldi noticed his goats became unusually energetic after eating berries from a particular tree. While this story is almost certainly apocryphal, archaeological evidence does support East Africa as the birthplace of the coffee plant.\n\nCoffee cultivation spread to the Arabian Peninsula by the 15th century, where it was first roasted and brewed in a manner similar to how it is prepared today. The port city of Mocha in Yemen became a major centre for coffee trade, giving its name to a popular coffee variety. By the 16th century, coffee had reached Persia, Egypt, Syria, and Turkey, where coffeehouses — known as "schools of the wise" — became important centres for social interaction and intellectual discourse.\n\nCoffee arrived in Europe in the 17th century and was initially met with suspicion. Some called it the "bitter invention of Satan." Pope Clement VIII was asked to ban the drink but reportedly found it so satisfying that he gave it papal approval instead. Coffeehouses quickly proliferated across Europe, with over 3,000 operating in England by the early 18th century. These establishments became known as "penny universities" because for the price of a cup of coffee, anyone could engage in stimulating conversation.\n\nToday, Brazil is the world\'s largest coffee producer, generating approximately one-third of global supply. Vietnam is the second-largest producer, having rapidly expanded its coffee industry since the 1990s. The global coffee industry is valued at over $450 billion annually, making it one of the world\'s most traded commodities after petroleum.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: The story of Kaldi and his goats has been confirmed by archaeological evidence.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The city of Mocha was located in Ethiopia.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Pope Clement VIII banned coffee in Europe.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: There were more than 3,000 coffeehouses in England by the early 18th century.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Vietnam became the second-largest coffee producer before the year 2000.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Coffee is the most traded commodity in the world.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      ],
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.tfng.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'Sleep and Memory Consolidation',
      passage: 'The relationship between sleep and memory has been a subject of scientific inquiry for over a century. While early researchers suspected that sleep played a role in learning, it was not until the discovery of rapid eye movement (REM) sleep in 1953 that the complex nature of sleep\'s contribution to memory began to be understood.\n\nModern research has identified two main types of memory that are affected differently by sleep stages. Declarative memory — the recall of facts and events — appears to benefit primarily from slow-wave sleep (SWS), the deepest stage of non-REM sleep. During SWS, the brain replays neural patterns associated with recently learned information, effectively transferring memories from the hippocampus, where they are initially stored, to the neocortex for long-term storage.\n\nProcedural memory — the ability to perform skills and tasks — is more closely linked to REM sleep. Studies have shown that people who are deprived of REM sleep after learning a new motor skill show significantly impaired performance compared to those who sleep normally. Interestingly, the amount of REM sleep increases naturally on nights following intensive learning, suggesting that the brain actively adjusts its sleep architecture to accommodate new procedural information.\n\nResearchers at Harvard University conducted a landmark study in which participants were taught a visual discrimination task. Those who were tested after a night of sleep performed 20% better than those tested after an equivalent period of wakefulness during the day. Moreover, the improvement was directly correlated with the amount of SWS obtained in the first quarter of the night and the amount of REM sleep in the last quarter.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: REM sleep was discovered in the 19th century.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Declarative memory benefits most from REM sleep.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The brain transfers memories from the hippocampus to the neocortex during slow-wave sleep.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: REM sleep deprivation has no effect on procedural learning.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The Harvard study used participants who were all university students.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Participants who slept performed 20% better than those who stayed awake.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
      ],
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS LISTENING — Transcript-Based Items (audio via TTS later)
  // # Section 1: Social/everyday, Section 2: Monologue, Section 3:
  // # Academic discussion, Section 4: Academic lecture
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.01', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — Accommodation Enquiry (Note Completion)\n\nYou will hear a phone conversation between a student and a housing officer.\n\nTranscript: "Good morning, Riverside Student Accommodation. How can I help you?" "Hi, I\'m looking for a room for next semester. My name is ______ Petrova." "And what course are you studying?" "I\'m doing a Master\'s in ______ Science." "And when would you need the room from?" "From the ______ of September." "We have rooms in Maple House. They\'re ______ pounds per week including bills."',
      gaps: [
        { correctAnswer: 'Anna', acceptedAlternatives: [], hint: 'first name (female)' },
        { correctAnswer: 'Computer', acceptedAlternatives: ['Computing'], hint: 'academic subject' },
        { correctAnswer: 'fifteenth', acceptedAlternatives: ['15th'], hint: 'date in September' },
        { correctAnswer: '145', acceptedAlternatives: ['one hundred and forty-five'], hint: 'weekly rent amount' },
      ],
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.ls.02', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — GP Registration (Form Completion)\n\nYou will hear a conversation at a medical clinic reception.\n\nTranscript: "I\'d like to register as a new patient, please." "Certainly. What\'s your full name?" "It\'s Michael ______." "And your date of birth?" "The ______ of March, 1995." "Do you have any existing medical conditions?" "Yes, I have ______." "And are you currently taking any medication?" "Just ______ — 10mg daily."',
      gaps: [
        { correctAnswer: 'Thornton', acceptedAlternatives: [], hint: 'surname' },
        { correctAnswer: 'twenty-third', acceptedAlternatives: ['23rd'], hint: 'date in March' },
        { correctAnswer: 'asthma', acceptedAlternatives: [], hint: 'respiratory condition' },
        { correctAnswer: 'Cetirizine', acceptedAlternatives: ['cetirizine'], hint: 'antihistamine medication' },
      ],
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.ls.03', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'IELTS Listening Section 2 — Museum Tour (MCQ)\n\nTranscript: "Welcome to the National Science Museum. Today I\'ll be guiding you through our three main galleries. The first gallery, which we\'ll visit now, focuses on space exploration and features a full-size replica of the Apollo 11 command module. The second gallery covers marine biology and includes a 20-metre interactive ocean floor display. Our final gallery, which opened just last month, is dedicated to artificial intelligence and robotics. Please note that photography is permitted in all galleries except the AI exhibition, where some displays are on loan from private collections."\n\nIn which gallery is photography NOT allowed?',
      options: [
        { text: 'Space exploration gallery', misconception: 'Photography is permitted in this gallery' },
        { text: 'Marine biology gallery', misconception: 'Photography is permitted in this gallery' },
        { text: 'Artificial intelligence and robotics gallery', misconception: null },
        { text: 'Photography is banned in all galleries', misconception: 'Only one gallery restricts photography' },
      ],
      correctIndex: 2,
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.ls.04', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Section 3 — Tutorial Discussion (MCQ)\n\nTranscript: "So, for your dissertation, you\'ve chosen to examine the impact of social media on political engagement among young adults?" "Yes, Professor. I was initially going to focus on voter turnout, but I realised that political engagement is broader than just voting — it includes online activism, petition signing, and contacting representatives." "Good thinking. What methodology are you planning?" "I\'m going to use a mixed-methods approach: a survey of 500 students followed by in-depth interviews with 20 participants." "Have you considered the sampling bias issue? University students aren\'t representative of all young adults."\n\nWhy did the student change their research focus?',
      options: [
        { text: 'The professor told them to change it', misconception: 'The student made the decision independently' },
        { text: 'They realised political engagement is wider than voter turnout', misconception: null },
        { text: 'Voter turnout data was not available', misconception: 'Data availability was not mentioned as a reason' },
        { text: 'They wanted to study social media instead of politics', misconception: 'The topic still centres on political engagement' },
      ],
      correctIndex: 1,
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.ls.05', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Academic Lecture (Note Completion)\n\nTranscript excerpt: "Today\'s lecture examines the phenomenon of urban heat islands. An urban heat island occurs when a city experiences significantly ______ temperatures than surrounding rural areas. The primary cause is the replacement of natural vegetation with ______ surfaces such as concrete and asphalt, which absorb and retain heat. Studies show that large cities can be up to ______ degrees Celsius warmer than nearby countryside. Mitigation strategies include increasing ______ cover, installing reflective roofing materials, and creating urban water features."',
      gaps: [
        { correctAnswer: 'higher', acceptedAlternatives: ['warmer'], hint: 'comparative adjective for temperature' },
        { correctAnswer: 'impervious', acceptedAlternatives: ['impermeable', 'dark', 'artificial'], hint: 'adjective describing concrete/asphalt' },
        { correctAnswer: '5', acceptedAlternatives: ['five'], hint: 'number of degrees difference' },
        { correctAnswer: 'tree', acceptedAlternatives: ['green', 'vegetation', 'canopy'], hint: 'type of cover to add' },
      ],
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.ls.06', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on Behavioural Economics (MCQ)\n\nTranscript: "The endowment effect, first described by Richard Thaler in 1980, refers to the tendency for people to value an item more highly simply because they own it. In a classic experiment, participants who were given a coffee mug demanded roughly twice as much to sell it as other participants were willing to pay to buy it. This asymmetry cannot be explained by standard economic theory, which assumes that willingness to pay and willingness to accept should be approximately equal. The endowment effect has practical implications for negotiations, where sellers consistently overvalue their assets, and for public policy, where loss aversion makes people resist changes to existing programmes even when alternatives are objectively superior."\n\nWhat did the coffee mug experiment demonstrate?',
      options: [
        { text: 'People prefer coffee mugs to other items', misconception: 'The specific item was irrelevant — the experiment tested ownership bias' },
        { text: 'Owners demanded about twice the price buyers would pay', misconception: null },
        { text: 'Standard economic theory accurately predicts pricing behaviour', misconception: 'The experiment showed the opposite — standard theory failed to predict the asymmetry' },
        { text: 'Sellers consistently undervalue their possessions', misconception: 'The endowment effect shows overvaluation by sellers, not undervaluation' },
      ],
      correctIndex: 1,
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # MORE IELTS STRATEGY — Covering All Sections
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.strat.06', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'In IELTS Reading, what is the key difference between "False" and "Not Given" in True/False/Not Given questions?',
      options: [
        { text: '"False" means the information contradicts the passage; "Not Given" means it isn\'t mentioned', misconception: null },
        { text: 'They mean the same thing and can be used interchangeably', misconception: 'They have distinct meanings — confusing them is the most common IELTS Reading error' },
        { text: '"Not Given" means the statement is probably false but not proven', misconception: '"Not Given" means there is no information to determine truth or falsity' },
        { text: '"False" means partially correct; "Not Given" means completely wrong', misconception: '"False" means directly contradicted; "Not Given" means absent from the text' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.strat.07', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'In IELTS Listening, you hear each recording:',
      options: [
        { text: 'Twice — once for understanding, once for answering', misconception: 'IELTS Listening plays each recording only once' },
        { text: 'Only once — you must answer while listening', misconception: null },
        { text: 'Three times — at different speeds', misconception: 'The recording plays at normal speed, once only' },
        { text: 'As many times as you want within the time limit', misconception: 'You cannot control playback in IELTS Listening' },
      ],
      correctIndex: 1,
      difficulty: 0.25,
    },
  },
  {
    id: 'ielts.strat.08', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      stem: 'When describing a map in IELTS Writing Task 1, which language feature is MOST essential?',
      options: [
        { text: 'Superlative adjectives to rank locations', misconception: 'Maps describe change and location, not rankings' },
        { text: 'Passive voice to describe changes: "A school was built", "The road was widened"', misconception: null },
        { text: 'First-person narrative: "I can see that the village..."', misconception: 'IELTS Task 1 uses impersonal, formal register — never "I"' },
        { text: 'Statistical language with percentages and exact figures', misconception: 'Maps rarely contain statistics — they show spatial change' },
      ],
      correctIndex: 1,
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.strat.09', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      stem: 'When describing a process diagram in IELTS Writing Task 1, you should:',
      options: [
        { text: 'Give your opinion on which stage is most important', misconception: 'Task 1 is purely descriptive — no opinions' },
        { text: 'Use sequencing language and passive voice to describe each stage in order', misconception: null },
        { text: 'Compare the process to similar processes in other countries', misconception: 'Only describe what is shown in the diagram' },
        { text: 'Write a separate paragraph for every single stage', misconception: 'Group related stages into 2-3 body paragraphs for coherence' },
      ],
      correctIndex: 1,
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.strat.10', type: 'mcq', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.ielts.part2_structure'],
    payload: {
      stem: 'During the 1-minute preparation time for IELTS Speaking Part 2, you should:',
      options: [
        { text: 'Write out a complete script to read during your talk', misconception: 'Reading from notes sounds unnatural and reduces fluency scores' },
        { text: 'Jot down key words and ideas for each bullet point on the cue card', misconception: null },
        { text: 'Memorise a pre-prepared answer that matches the topic', misconception: 'Memorised answers are detectable and penalised' },
        { text: 'Not make any notes — just think silently', misconception: 'You are given a pencil and paper specifically to make notes' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS READING — Sentence Completion & Matching Headings
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.gf.03', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'IELTS Reading — Sentence Completion (use NO MORE THAN TWO WORDS from the passage)\n\nPassage excerpt: "The Great Barrier Reef extends over 2,300 kilometres along the northeast coast of Australia. It is the largest living structure on Earth, visible from space. The reef system comprises approximately 2,900 individual reefs and 900 islands."\n\nThe Great Barrier Reef is located along Australia\'s ______ coast. It can be seen from ______. The reef system includes about 2,900 reefs and ______ islands.',
      gaps: [
        { correctAnswer: 'northeast', acceptedAlternatives: ['north-east', 'north east'], hint: 'direction' },
        { correctAnswer: 'space', acceptedAlternatives: [], hint: 'where it is visible from' },
        { correctAnswer: '900', acceptedAlternatives: ['nine hundred'], hint: 'number of islands' },
      ],
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.mt.02', type: 'matching', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'IELTS Reading — Match each paragraph summary to the correct heading.',
      pairs: [
        { left: 'The relationship between diet and chronic disease prevention', right: 'Nutrition and Health' },
        { left: 'How regular physical activity affects brain function and cognition', right: 'Exercise and Mental Performance' },
        { left: 'The role of sleep duration in regulating hormones and metabolism', right: 'Sleep and Metabolic Health' },
        { left: 'Why social connections reduce mortality risk in elderly populations', right: 'Social Ties and Longevity' },
        { left: 'The mechanisms by which chronic stress damages the immune system', right: 'Stress and Immunity' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.mt.03', type: 'matching', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'IELTS Reading — Match each researcher\'s finding to the correct study.',
      pairs: [
        { left: 'Found that bilingualism delays dementia onset by 4-5 years', right: 'Bialystok (2007)' },
        { left: 'Showed that green spaces reduce cortisol levels in urban residents', right: 'Thompson (2012)' },
        { left: 'Demonstrated that sleep-deprived students scored 20% lower on tests', right: 'Walker (2017)' },
        { left: 'Proved that regular exercise increases hippocampal volume by 2%', right: 'Erickson (2011)' },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # MORE IELTS ERROR CORRECTION & VOCABULARY
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ec.03', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      sentence: 'Nowadays, the number of people who goes to university is increasing dramatically.',
      errorPart: 'who goes',
      correction: 'who go',
      explanation: '"The number of people" is plural in meaning — the relative pronoun "who" refers to "people" (plural), so the verb must be "go" not "goes". This subject-verb agreement error with relative clauses is extremely common in IELTS essays.',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.ec.04', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      sentence: 'The graph shows that the percentage of car owners rose dramaticly between 2000 and 2020.',
      errorPart: 'dramaticly',
      correction: 'dramatically',
      explanation: '"Dramatic" → "dramatically" (adverb). The adjective "dramatic" drops the final "-c" pattern — the adverb is formed as "dramatically" not "dramaticly". This spelling error is penalised under Lexical Resource in IELTS Writing.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.ec.05', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      sentence: 'Many people think that studying abroad have many advantages for students.',
      errorPart: 'studying abroad have',
      correction: 'studying abroad has',
      explanation: '"Studying abroad" is a gerund phrase acting as the subject — it is singular, so the verb must be "has" not "have". Gerund subjects always take singular verbs in English. This is a Band 6 vs Band 7 grammar distinction.',
      difficulty: 0.4,
    },
  },

  {
    id: 'ielts.wf.04', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task2_structure'],
    payload: {
      stem: 'There is a growing ______ that governments should invest more in renewable energy.',
      rootWord: 'recognise',
      acceptedAnswers: ['recognition'],
      explanation: 'recognise → recognition (noun). "There is a growing recognition that..." is a sophisticated way to introduce a widely-held view in IELTS Task 2, better than "Many people think...".',
      difficulty: 0.45,
    },
  },
  {
    id: 'ielts.wf.05', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts'],
    payload: {
      stem: 'The ______ of the local community to the proposed development was overwhelmingly negative.',
      rootWord: 'respond',
      acceptedAnswers: ['response'],
      explanation: 'respond → response (noun). "The response of... to..." is a formal construction used in IELTS Reading and Writing. Note the irregular form — not "respondence".',
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # IELTS DIALOGUE — Speaking Part 1 Practice Conversations
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.dc.01', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['strat.ielts.part1_answers'],
    payload: {
      stem: 'Complete the candidate\'s answers in this IELTS Speaking Part 1 practice. Give extended answers with reasons.',
      lines: [
        { speaker: 'Examiner', text: 'Do you enjoy reading?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['Yes, I do', 'Absolutely', 'I\'m quite an avid reader'], hint: 'Start with your answer, then give a reason' },
        { speaker: 'Examiner', text: 'What kind of books do you usually read?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['I tend to read', 'I mostly enjoy', 'I\'m particularly drawn to'], hint: 'Name a genre and explain why' },
        { speaker: 'Examiner', text: 'Do you prefer reading paper books or e-books?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['I personally prefer', 'I\'d say I lean towards', 'To be honest, I find'], hint: 'State preference with a specific reason' },
      ],
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.dc.02', type: 'dialogue_completion', level: 'B1', skill: 'speaking',
    nodeIds: ['strat.ielts.part1_answers'],
    payload: {
      stem: 'Complete the candidate\'s answers. Aim for 2-3 sentences per response with reasons and examples.',
      lines: [
        { speaker: 'Examiner', text: 'What do you do in your free time?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['In my spare time', 'When I have free time', 'I usually spend my free time'], hint: 'Describe your hobby with some detail' },
        { speaker: 'Examiner', text: 'Have your hobbies changed since you were younger?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['Yes, definitely', 'They\'ve changed quite a lot', 'When I was younger I used to'], hint: 'Compare past and present using different tenses' },
        { speaker: 'Examiner', text: 'Do you think hobbies are important? Why?' },
        { speaker: 'Candidate', text: null, acceptedAnswers: ['I think they\'re essential', 'Absolutely, I believe hobbies', 'In my view, having hobbies is crucial'], hint: 'Give your opinion with supporting reasons' },
      ],
      difficulty: 0.35,
    },
  },
]
