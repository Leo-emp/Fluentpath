// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS WRITING — Expanded Authentic Task 1 & Task 2 Practice
// # ═══════════════════════════════════════════════════════════════════════════
// # Real IELTS Writing has 2 tasks, 60 minutes total.
// # Task 1: 150+ words, 20 minutes (charts, maps, processes, tables).
// # Task 2: 250+ words, 40 minutes (4 essay types).
// # Every item has a full model answer at Band 7+ level and
// # detailed rubric matching the official IELTS marking criteria.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_WRITING_EXPANDED: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 1 — Double Bar Chart
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt1.exp.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The bar chart below shows the number of male and female students enrolled in three different university courses (Engineering, Medicine, and Arts) in 2015 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.\n\n| Course | 2015 Male | 2015 Female | 2023 Male | 2023 Female |\n|--------|-----------|-------------|-----------|-------------|\n| Engineering | 850 | 150 | 720 | 380 |\n| Medicine | 420 | 480 | 350 | 620 |\n| Arts | 300 | 600 | 280 | 640 |',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Covers key features with overview; gender comparisons made across years', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical grouping of data with smooth transitions', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Vocabulary for trends, proportions, and gender comparisons', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Past tenses, comparatives, and approximation used accurately', maxScore: 9 },
      ],
      modelAnswer: 'The bar chart compares male and female enrolment in Engineering, Medicine, and Arts courses at a university in 2015 and 2023.\n\nOverall, female participation increased across all three disciplines, while male enrolment declined. The gender gap narrowed most dramatically in Engineering.\n\nIn 2015, Engineering was overwhelmingly male-dominated, with 850 male students compared to just 150 females. By 2023, the male figure had fallen to 720 while females more than doubled to 380, significantly narrowing the disparity.\n\nMedicine showed a reversal of the gender balance. In 2015, the split was relatively even (420 males to 480 females), but by 2023 females had pulled further ahead, reaching 620 compared to 350 males.\n\nArts maintained a consistent female majority throughout both years, rising slightly from 600 to 640 females, while male numbers decreased marginally from 300 to 280.\n\nNotably, Engineering remained the only course where males outnumbered females in 2023, though the gap had narrowed considerably.',
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 1 — Line Graph (Multiple Lines)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt1.exp.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The line graph shows the average monthly temperatures (°C) in three cities — London, Cairo, and Sydney — over the course of a year. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.\n\nData points:\n• London: Jan 5, Apr 10, Jul 22, Oct 12\n• Cairo: Jan 14, Apr 22, Jul 35, Oct 24\n• Sydney: Jan 26, Apr 20, Jul 13, Oct 19',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Overview of contrasting seasonal patterns; key temperatures cited', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear progression through the year with cross-city comparisons', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Temperature and seasonal vocabulary used precisely', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Present simple for descriptions, comparatives, range of structures', maxScore: 9 },
      ],
      modelAnswer: 'The line graph illustrates how average monthly temperatures vary throughout the year in London, Cairo, and Sydney.\n\nOverall, Cairo is consistently the warmest city, while London and Sydney show opposite seasonal patterns reflecting their positions in different hemispheres.\n\nCairo experiences the highest temperatures year-round, peaking at 35°C in July and dropping to its lowest point of 14°C in January. Despite this seasonal variation, Cairo never falls below London\'s warmest month.\n\nLondon follows a typical Northern Hemisphere pattern, rising from a cold 5°C in January to a peak of 22°C in July. Its temperature range of 17 degrees is the smallest of the three cities.\n\nSydney, situated in the Southern Hemisphere, displays the reverse pattern to London. Its warmest month is January at 26°C, while July is coolest at just 13°C. Interestingly, Sydney\'s winter temperatures are considerably higher than London\'s, reflecting its more temperate climate.\n\nNotably, in January, the gap between the warmest (Sydney at 26°C) and coolest (London at 5°C) cities is 21 degrees.',
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 1 — Pie Charts (Comparison)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt1.exp.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The two pie charts below show the main sources of energy in Country X in 2000 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.\n\n2000: Oil 42%, Coal 30%, Natural Gas 18%, Nuclear 7%, Renewables 3%\n2023: Oil 28%, Coal 12%, Natural Gas 25%, Nuclear 10%, Renewables 25%',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Overview of shift from fossil fuels; key changes highlighted', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical comparison between two time periods', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Percentage, proportion, and change vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Past simple, present perfect for change, comparatives', maxScore: 9 },
      ],
      modelAnswer: 'The two pie charts compare the energy mix in Country X between 2000 and 2023.\n\nOverall, there was a significant shift away from fossil fuels — particularly oil and coal — toward renewable energy sources over the 23-year period. By 2023, the energy portfolio was considerably more diversified.\n\nIn 2000, oil was the dominant energy source at 42%, followed by coal at 30%. Together, these two fossil fuels accounted for nearly three-quarters of the country\'s energy supply. Natural gas contributed 18%, while nuclear and renewables were minor sources at 7% and 3% respectively.\n\nBy 2023, dramatic changes had occurred. Oil fell sharply to 28%, while coal experienced an even steeper decline to just 12%. Renewables saw the most remarkable growth, surging from 3% to 25% — an eightfold increase that made them equal to natural gas, which had risen modestly to 25%. Nuclear energy also expanded slightly to 10%.\n\nNotably, fossil fuels\' combined share dropped from 90% to 65%, while clean energy sources (nuclear and renewables) rose from 10% to 35%.',
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 1 — Mixed/Combined Chart
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt1.exp.04', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The bar chart shows the number of tourists (in millions) visiting Country Y between 2010 and 2022, while the line graph shows the revenue generated from tourism (in billions of dollars) over the same period. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.\n\nTourists (millions): 2010: 15, 2014: 22, 2018: 31, 2020: 8, 2022: 27\nRevenue ($bn): 2010: 12, 2014: 20, 2018: 35, 2020: 5, 2022: 32',
      format: 'ielts_task1',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'Both data sets described with overview linking them', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear integration of two data sources', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Vocabulary for tourism, trends, and economic data', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Past tenses, relative clauses, and approximation', maxScore: 9 },
      ],
      modelAnswer: 'The bar chart and line graph together illustrate tourist arrivals and tourism revenue in Country Y from 2010 to 2022.\n\nOverall, both tourist numbers and revenue followed a broadly similar upward trajectory, with a dramatic dip in 2020 — almost certainly due to the COVID-19 pandemic — followed by a strong recovery.\n\nBetween 2010 and 2018, tourist arrivals more than doubled from 15 million to 31 million. Revenue grew even more sharply over the same period, nearly tripling from $12 billion to $35 billion. This suggests that per-tourist spending increased during this time.\n\nThe pandemic caused a devastating collapse in both metrics. Tourist numbers plummeted to just 8 million in 2020, while revenue fell to $5 billion — the lowest figures in the entire period. This represented a 74% decline in visitors and an 86% drop in revenue compared to 2018.\n\nBy 2022, the recovery was well underway, with 27 million tourists generating $32 billion in revenue. While visitor numbers had not yet regained their 2018 peak, revenue was approaching pre-pandemic levels.',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 1 — Natural Process (Cycle Diagram)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt1.exp.05', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],
    payload: {
      prompt: 'The diagram below shows the water cycle. Summarise the information by selecting and reporting the main features. Write at least 150 words.\n\nStages:\n1. Sun heats ocean/lake water → evaporation\n2. Water vapour rises and cools → condensation into clouds\n3. Clouds move inland via wind\n4. Precipitation (rain/snow) falls on mountains and land\n5. Some water absorbed by soil → groundwater (underground aquifers)\n6. Remaining water flows as surface runoff into streams and rivers\n7. Rivers carry water back to the ocean\n8. Cycle repeats',
      format: 'ielts_task1_process',
      minWords: 150, maxWords: 200, timeMinutes: 20,
      rubric: [
        { name: 'Task Achievement', description: 'All stages covered with clear overview of cyclic nature', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Sequencing language and passive voice used throughout', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Scientific vocabulary used accurately (evaporation, precipitation, etc.)', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Passive voice dominant, present simple for describing process', maxScore: 9 },
      ],
      modelAnswer: 'The diagram illustrates the continuous cycle through which water circulates between the Earth\'s surface and the atmosphere.\n\nOverall, the process involves water changing state between liquid and gas, driven primarily by solar energy, with both surface and underground pathways returning water to the oceans.\n\nThe cycle begins when the sun heats the surface of oceans and lakes, causing water to evaporate into the atmosphere as water vapour. As this vapour rises, it cools and condenses to form clouds. These clouds are then carried inland by wind.\n\nWhen sufficient moisture accumulates, precipitation occurs in the form of rain or snow, falling primarily on mountains and surrounding land. At this point, the water follows two distinct pathways. A portion is absorbed into the soil, filtering down to replenish underground aquifers as groundwater. The remainder flows across the surface as runoff, collecting in streams and rivers.\n\nFinally, these rivers transport the water back to the ocean, where the entire process begins again. This continuous circulation ensures the constant redistribution of water across the planet.',
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 2 — Agree/Disagree (More Topics)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt2.exp.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime. Discuss both views and give your own opinion. Write at least 250 words.',
      format: 'ielts_task2_discuss_both_views',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Both views fully discussed with clear personal position', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Clear paragraphing with logical flow between arguments', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Crime/justice vocabulary used with precision', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Complex sentences with conditionals and passive voice', maxScore: 9 },
      ],
      modelAnswer: 'The question of how best to reduce crime has long divided policymakers. While some advocate for harsher sentences as a deterrent, others favour alternative approaches that address the root causes of criminal behaviour. This essay will examine both perspectives before presenting my own view.\n\nProponents of longer sentences argue that severe punishments deter potential offenders. The logic is straightforward: if the consequences of committing a crime are sufficiently harsh, rational individuals will choose not to offend. Furthermore, lengthy prison terms keep dangerous individuals away from the public for extended periods, directly reducing opportunities for reoffending.\n\nHowever, there is compelling evidence that this approach is limited. Recidivism rates in countries with harsh sentencing — such as the United States, where approximately 44% of released prisoners reoffend within a year — suggest that imprisonment alone does not reform behaviour. Alternative strategies have shown more promising results. Investment in education and employment programmes in deprived areas addresses the socioeconomic factors that drive much crime. Norway\'s rehabilitative prison model, which focuses on preparing inmates for productive lives after release, has achieved a recidivism rate of just 20%.\n\nIn my view, while prison sentences serve an important function for serious and violent offences, the most effective overall approach to crime reduction involves a combination of strategies. Preventive measures such as community programmes, mental health services, and drug rehabilitation tackle the underlying causes of crime, while restorative justice practices can be more effective than imprisonment for non-violent offenders.\n\nIn conclusion, a society that relies solely on punishment is unlikely to achieve lasting reductions in crime. A balanced approach combining appropriate sentencing with prevention and rehabilitation offers the best prospect for safer communities.',
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 2 — Causes and Solutions
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt2.exp.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'In many countries, the number of people suffering from stress-related illnesses is increasing. What do you think are the causes of this problem, and what measures could be taken to address it? Write at least 250 words.',
      format: 'ielts_task2_causes_solutions',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Causes and solutions clearly identified and developed', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Problem-solution structure with balanced treatment', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Health, wellbeing, and workplace vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Cause-effect structures, modals for recommendations', maxScore: 9 },
      ],
      modelAnswer: 'Stress-related illnesses have become one of the most pressing public health concerns of the 21st century. This essay will examine the primary causes of this trend and propose practical solutions.\n\nThe most significant cause is the intensification of work culture. Many employees now face longer hours, constant connectivity through smartphones, and pressure to be perpetually productive. The boundary between work and personal life has become increasingly blurred, particularly since the rise of remote working. Additionally, financial pressures — including rising housing costs and stagnant wages — create chronic anxiety for millions of people.\n\nSocial media represents another major contributor. Constant exposure to carefully curated images of others\' lives fosters unhealthy comparison and feelings of inadequacy. Research has consistently linked heavy social media use to increased rates of anxiety and depression, particularly among young adults.\n\nTo address this problem, several measures could be implemented. Employers should be legally required to respect employees\' right to disconnect outside working hours, as has already been legislated in France. Companies could also provide free access to mental health support, including counselling services and stress management workshops.\n\nAt an educational level, schools should incorporate mental health literacy into their curricula, teaching young people to recognise stress symptoms and develop healthy coping strategies. Governments could fund public awareness campaigns to reduce the stigma surrounding mental health issues, encouraging more people to seek help before their condition becomes severe.\n\nIn conclusion, while the causes of stress are deeply embedded in modern society, a combination of workplace reform, education, and greater mental health awareness could significantly reduce the toll of stress-related illness.',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 2 — Agree/Disagree (Direct Opinion)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt2.exp.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Some people believe that it is more important to spend public money on promoting a healthy lifestyle in order to prevent illness than to spend it on the treatment of people who are already ill. To what extent do you agree or disagree? Write at least 250 words.',
      format: 'ielts_task2_agree_disagree',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Clear position maintained throughout with developed reasoning', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical argument development with appropriate paragraphing', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Healthcare and public policy vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Conditionals, complex noun phrases, and accurate tense use', maxScore: 9 },
      ],
      modelAnswer: 'The allocation of healthcare spending between prevention and treatment is a critical policy question. While I believe that investing in preventive health measures is highly beneficial, I disagree that it should take priority over treating those who are already ill.\n\nThere are strong arguments for preventive healthcare spending. Promoting healthy lifestyles through public education campaigns, subsidised gym memberships, and improved access to nutritious food can reduce the incidence of chronic diseases such as diabetes, heart disease, and certain cancers. These conditions currently account for a substantial proportion of healthcare expenditure in most developed countries. Prevention is also considerably cheaper than treatment — the cost of a smoking cessation programme, for example, is a fraction of the cost of treating lung cancer.\n\nHowever, it would be ethically unacceptable to redirect funds away from treating people who are currently sick. Patients with existing conditions have an immediate and urgent need for medical care, and denying or reducing treatment would cause direct harm. Moreover, not all illnesses are lifestyle-related or preventable: genetic conditions, infectious diseases, and accidents require treatment regardless of how much is invested in prevention.\n\nThe most effective approach, in my view, is to increase overall healthcare budgets to accommodate both prevention and treatment. Governments could fund preventive programmes through specific measures such as taxes on tobacco and sugar-sweetened beverages, ring-fencing this revenue for health promotion without reducing treatment budgets.\n\nIn conclusion, while prevention should form a significant component of healthcare strategy, it must complement rather than replace spending on treatment for those who are already ill.',
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 2 — Two-Part Question (More Topics)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt2.exp.04', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'Many people are moving from rural areas to cities in search of a better life. Why do people move to cities? What problems does this cause? Write at least 250 words.',
      format: 'ielts_task2_two_part',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Both questions fully addressed with developed examples', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Two-part structure clearly signposted', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Urbanisation and infrastructure vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Cause-effect structures, complex sentences', maxScore: 9 },
      ],
      modelAnswer: 'The migration of populations from rural to urban areas is one of the defining trends of the modern era. This essay will examine the reasons behind this movement and the problems it creates.\n\nPeople move to cities primarily for economic reasons. Urban areas offer greater employment opportunities, higher wages, and more diverse career paths than rural regions. For young people in particular, cities represent access to higher education, professional development, and social mobility that may be unavailable in their home communities. Healthcare and public services also tend to be significantly better in urban centres, providing a further incentive for families to relocate.\n\nBeyond economics, cities offer a lifestyle that appeals to many. Cultural amenities, entertainment, social diversity, and the simple convenience of having services and shops nearby all contribute to the urban pull factor. In some countries, rural decline itself becomes a push factor — as communities shrink, schools close, transport links deteriorate, and remaining residents find life increasingly impractical.\n\nHowever, rapid urbanisation creates substantial problems. Housing shortages drive up property prices and rents, forcing lower-income residents into overcrowded or substandard accommodation, or informal settlements on city peripheries. Infrastructure — including transport, water supply, and sanitation — often cannot keep pace with population growth, leading to congestion, pollution, and health risks.\n\nSocially, the rapid growth of cities can lead to the erosion of community bonds. Many migrants find themselves isolated, lacking the support networks they had in their home villages. Crime rates tend to be higher in rapidly growing urban areas, and income inequality is often more visible and acute.\n\nIn conclusion, while urbanisation is driven by understandable aspirations for a better life, governments must invest heavily in urban infrastructure and social services to manage its consequences effectively.',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TASK 2 — Positive/Negative Development
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt2.exp.05', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],
    payload: {
      prompt: 'In many countries, traditional foods are being replaced by international fast food. This is having a negative effect on both families and societies. To what extent do you agree or disagree? Write at least 250 words.',
      format: 'ielts_task2_agree_disagree',
      minWords: 250, maxWords: 350, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Clear position on whether the effect is negative, with balanced argument', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Logical progression with appropriate examples', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Food, culture, and health vocabulary', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Range of structures with accurate use of conditionals and passive', maxScore: 9 },
      ],
      modelAnswer: 'The global spread of fast food chains at the expense of traditional cuisine is a trend that many consider harmful. I largely agree that this development has negative consequences, though I believe the picture is more nuanced than a simple condemnation allows.\n\nThe replacement of traditional meals with fast food undeniably damages family life. In many cultures, meal preparation and shared dining are important bonding activities that pass knowledge and traditions between generations. When families regularly eat fast food instead, these opportunities are lost. Children grow up without learning to cook traditional dishes, and the family meal — once a daily ritual — becomes increasingly rare.\n\nAt a societal level, the dominance of international fast food chains represents a form of cultural homogenisation. Traditional cuisines reflect centuries of local history, agricultural practice, and cultural identity. When a high street that once featured family-run restaurants serving regional specialities is replaced by identical multinational franchises, something genuinely valuable is lost.\n\nThe health implications are equally concerning. Fast food is typically high in calories, saturated fat, sugar, and salt, contributing to rising rates of obesity, diabetes, and cardiovascular disease. Countries that have experienced rapid westernisation of their diets — such as Mexico and several Pacific Island nations — have seen dramatic increases in diet-related illness.\n\nHowever, it would be unfair to blame fast food entirely. Traditional diets are not always healthy, and the convenience of fast food reflects genuine time pressures on modern families rather than cultural indifference. The solution lies not in banning fast food but in supporting local food cultures through education, subsidies for traditional producers, and regulations on fast food marketing.\n\nIn conclusion, while the decline of traditional food culture is largely negative, a balanced approach combining support for local cuisine with reasonable regulation of fast food is preferable to outright opposition.',
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # WRITING GRAMMAR — Common IELTS errors (error_correction)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt.ec.01', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      sentence: 'The graph illustrates how much money were spent on education in five countries.',
      errorPart: 'money were spent',
      correction: 'money was spent',
      explanation: '"Money" is an uncountable noun and takes the singular verb "was". This is one of the most frequent errors in IELTS Task 1 writing. Other uncountable nouns that often cause this error: "information was", "research was", "evidence was".',
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.wt.ec.02', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      sentence: 'Between 2000 and 2020, the number of tourists visiting the country raised significantly.',
      errorPart: 'raised',
      correction: 'rose',
      explanation: '"Rise" (rose, risen) is intransitive — the number goes up by itself. "Raise" (raised, raised) is transitive — someone raises something. "The number rose" (correct) vs "The government raised taxes" (correct). This rise/raise confusion costs many students marks in Task 1.',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.wt.ec.03', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      sentence: 'In my opinion, I think that governments should invest more in public transport.',
      errorPart: 'In my opinion, I think that',
      correction: 'In my opinion,',
      explanation: '"In my opinion" and "I think" mean the same thing — using both is redundant. Choose one. "In my opinion, governments should invest..." or "I think governments should invest..." — never both together. This tautology is extremely common in IELTS essays and is penalised under both Lexical Resource and Grammatical Range.',
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.wt.ec.04', type: 'error_correction', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      sentence: 'The chart shows the amount of students who graduated from university between 2010 and 2020.',
      errorPart: 'amount of students',
      correction: 'number of students',
      explanation: '"Amount" is used with uncountable nouns (amount of money, amount of time). "Number" is used with countable nouns (number of students, number of cars). This amount/number confusion is penalised under Lexical Resource in IELTS.',
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # WRITING VOCABULARY — Academic word formation
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt.wf.01', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task2_structure'],
    payload: {
      stem: 'The government has made a significant ______ to reducing carbon emissions by 2040.',
      rootWord: 'commit',
      acceptedAnswers: ['commitment'],
      explanation: 'commit → commitment (noun). "Make a commitment to + gerund" is a high-level collocation frequently used in IELTS Task 2. Note: "committed" (adjective) would also work in a different sentence structure.',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.wt.wf.02', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task2_structure'],
    payload: {
      stem: 'The ______ of children to violent media content is a growing concern among parents and educators.',
      rootWord: 'expose',
      acceptedAnswers: ['exposure'],
      explanation: 'expose → exposure (noun). "Exposure to" is a key academic collocation for IELTS. This word appears frequently in essays about media, health, and education topics.',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.wt.wf.03', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task1_structure'],
    payload: {
      stem: 'There was a ______ decline in the number of visitors to the museum after 2015.',
      rootWord: 'notice',
      acceptedAnswers: ['noticeable', 'notable'],
      explanation: 'notice → noticeable (adjective). "A noticeable/notable decline" is better than "a big decline" in IELTS Task 1 — it demonstrates lexical range and earns higher marks for Lexical Resource.',
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # WRITING STRATEGY — MCQs for exam technique
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.wt.strat.01', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      stem: 'In IELTS Writing Task 1, an "overview" paragraph should:',
      options: [
        { text: 'List every single data point in the chart', misconception: 'An overview summarises the BIG PICTURE, not every detail' },
        { text: 'Summarise the main trends or key features without specific figures', misconception: null },
        { text: 'Give your personal opinion on the data', misconception: 'Task 1 is purely descriptive — no opinions' },
        { text: 'Compare the data to real-world knowledge you already have', misconception: 'Only describe what is shown in the visual data provided' },
      ],
      correctIndex: 1,
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.wt.strat.02', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      stem: 'If you write only 220 words for IELTS Writing Task 2 (minimum is 250), what happens?',
      options: [
        { text: 'Nothing — quality matters more than quantity', misconception: 'There IS a penalty for writing under the word count' },
        { text: 'You lose marks under Task Response for not meeting the minimum', misconception: null },
        { text: 'Your essay is not marked at all', misconception: 'Short essays are still marked but with a penalty' },
        { text: 'The examiner adds extra marks if the content is excellent', misconception: 'No bonus marks compensate for being under the minimum' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.wt.strat.03', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      stem: 'What is the recommended structure for an IELTS Task 2 "discuss both views and give your opinion" essay?',
      options: [
        { text: 'Introduction → View 1 → View 2 → Your Opinion → Conclusion', misconception: null },
        { text: 'Introduction → Your Opinion → View 1 → View 2 → Conclusion', misconception: 'Presenting your opinion before discussing the views doesn\'t show balanced analysis' },
        { text: 'Introduction → View 1 + View 2 mixed in one paragraph → Conclusion', misconception: 'Mixing both views in one paragraph makes the essay unclear and poorly organised' },
        { text: 'Introduction → View 1 → Conclusion → View 2', misconception: 'The conclusion must come at the end, summarising your position' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
]
