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
      source: 'Adapted from academic psychology text',
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
      source: 'Adapted from environmental health journal',
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
]
