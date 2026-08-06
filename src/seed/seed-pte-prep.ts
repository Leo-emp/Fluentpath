// # PTE Academic exam preparation content — authentic exam-format items
// # covering Speaking & Writing (Read Aloud, Describe Image, Summarize,
// # Essay), Reading (Reorder, Fill Blanks, MCQ), and test strategy.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_PTE_PREP: UnifiedSeedItem[] = [
  // # ═══════════════════════════════════════════════════════════════════
  // # PTE READ ALOUD — Speaking (scored on pronunciation + fluency)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.ra.01', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud. You will have 30-40 seconds to read the text. Speak clearly with natural stress and intonation.\n\n"Climate change represents one of the most significant challenges facing humanity today. Rising temperatures, extreme weather events, and rising sea levels threaten ecosystems and communities worldwide. Scientists agree that immediate and coordinated action is needed to mitigate the worst effects of global warming."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35,
      speakTimeSeconds: 40,
      targetLanguage: [
        'Chunking: "Climate change | represents one of the most significant challenges | facing humanity today."',
        'Stress key content words: SIGNIFICANT, CHALLENGES, IMMEDIATE, COORDINATED',
        'Natural falling intonation at end of each sentence',
        'Link sounds: "and_rising", "action_is", "effects_of"',
      ],
      modelAnswerNotes: 'PTE scoring: Content (reading all words) + Pronunciation (vowels, consonants, stress) + Fluency (smooth, natural pace). Don\'t rush. Pause at commas and full stops. Stress content words, unstress function words (the, of, and). Practise linking and connected speech.',
      difficulty: 0.35,
    },
  },
  {
    id: 'pte.ra.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud. You will have 30-40 seconds to read the text.\n\n"The development of artificial intelligence has fundamentally transformed the way businesses operate. From automated customer service to predictive analytics, AI technologies enable organisations to process vast quantities of data and derive actionable insights. However, this technological revolution also raises important ethical questions about privacy, employment, and algorithmic bias."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35,
      speakTimeSeconds: 40,
      targetLanguage: [
        'Multi-syllable stress: ar-ti-FI-cial, fun-da-MEN-tal-ly, or-gan-i-SA-tions',
        'Pause before "However" to signal contrast',
        'List intonation: "privacy↗, employment↗, and algorithmic bias↘"',
        'Unstress function words: "the", "of", "to", "and"',
      ],
      modelAnswerNotes: 'Key technical vocabulary to pronounce clearly: "artificial intelligence" (/ˌɑːtɪˈfɪʃəl/), "predictive analytics" (/prɪˈdɪktɪv/), "algorithmic" (/ˌælɡəˈrɪðmɪk/). Read through silently during prep time, identify tricky words, and decide where to pause.',
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.ra.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud. You will have 30-40 seconds to read the text.\n\n"Archaeological evidence suggests that the ancient Egyptians possessed a sophisticated understanding of astronomy, mathematics, and engineering. The construction of the Great Pyramid of Giza, for instance, required precise calculations and the coordination of thousands of workers over several decades. These achievements continue to inspire wonder and scholarly debate."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35,
      speakTimeSeconds: 40,
      targetLanguage: [
        'Difficult words: "archaeological" (/ˌɑːkiəˈlɒdʒɪkəl/), "sophisticated" (/səˈfɪstɪkeɪtɪd/)',
        'Parenthetical: "for instance" — slight pause before and after',
        'Stress pattern: "precise CALculations", "conTINue to inSPIRE"',
      ],
      modelAnswerNotes: 'During prep time: (1) identify multi-syllable words and rehearse stress, (2) mark natural pause points at commas, (3) note the parenthetical "for instance" which needs bracketing pauses. Aim for a steady pace — better to be slightly slow and clear than fast and stumbling.',
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE DESCRIBE IMAGE — Speaking (40 seconds)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.di.01', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Look at the bar chart below and describe it in detail. You will have 25 seconds to study the image, then 40 seconds to speak.\n\nBar chart: "Annual CO2 Emissions by Country (million tonnes, 2023)"\n- China: 11,400\n- United States: 5,100\n- India: 2,900\n- Russia: 1,800\n- Japan: 1,100',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: [
        'What the chart shows (type and topic)',
        'The highest and lowest values',
        'Key comparisons and patterns',
        'A concluding statement',
      ],
      prepTimeSeconds: 25,
      speakTimeSeconds: 40,
      targetLanguage: [
        'Opening: "This bar chart illustrates/presents/depicts..."',
        'Comparisons: "China emits more than double the amount of the US"',
        'Superlatives: "The highest/most significant/largest..."',
        'Conclusion: "Overall, there is a clear disparity between..."',
      ],
      modelAnswerNotes: 'PTE Describe Image template: (1) "This [chart type] shows [topic]." (2) "The most notable feature is [highest/key point]." (3) Compare 2-3 items. (4) "In conclusion, [overall pattern]." Aim for 35-38 seconds — don\'t stop early, don\'t get cut off.',
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.di.02', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Look at the line graph below and describe it in detail. You will have 25 seconds to study the image, then 40 seconds to speak.\n\nLine graph: "Global Smartphone Users (billions), 2015-2025"\n- 2015: 2.1\n- 2017: 2.7\n- 2019: 3.5\n- 2021: 4.0\n- 2023: 4.6\n- 2025 (projected): 5.1',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: [
        'Type of graph and what it represents',
        'Starting point and end point',
        'The overall trend',
        'Notable changes in the rate of growth',
      ],
      prepTimeSeconds: 25,
      speakTimeSeconds: 40,
      targetLanguage: [
        'Trend language: "steadily increased", "gradual upward trend", "consistent growth"',
        'Numbers: "approximately 2.1 billion", "just over 4 billion"',
        'Time phrases: "over the period from 2015 to 2025", "by the year 2025"',
        'Projection: "is projected to reach", "is expected to exceed"',
      ],
      modelAnswerNotes: 'Key: identify the overall trend first (steady increase), then note specifics (growth rate acceleration/deceleration). Always mention the starting and ending values. Use varied vocabulary — don\'t say "increase" five times.',
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE SUMMARIZE WRITTEN TEXT — One Sentence (5-75 words)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.swt.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage below and summarize it using one sentence (between 5 and 75 words). Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.\n\nPassage: "Recent research has shown that bilingual individuals may have cognitive advantages over monolinguals. Studies indicate that regularly using two languages strengthens executive functions such as attention control, cognitive flexibility, and working memory. Furthermore, bilingualism appears to delay the onset of dementia by an average of four to five years. These findings have important implications for education policy, suggesting that early language learning should be encouraged in schools."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75, timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Captures the main idea and key supporting points', maxScore: 2 },
        { name: 'Form', description: 'Single sentence between 5 and 75 words', maxScore: 1 },
        { name: 'Grammar', description: 'Grammatically correct with appropriate structure', maxScore: 2 },
        { name: 'Vocabulary', description: 'Appropriate word choice and collocations', maxScore: 2 },
      ],
      modelAnswer: 'Research demonstrates that bilingual individuals benefit from enhanced executive cognitive functions and a delayed onset of dementia compared to monolinguals, which has significant implications for education policy regarding the promotion of early language learning in schools.',
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.swt.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage below and summarize it using one sentence (between 5 and 75 words).\n\nPassage: "The concept of remote work has evolved dramatically since the global pandemic of 2020. What was initially an emergency measure has become a permanent feature of many organisations\' working arrangements. Research shows that remote workers report higher job satisfaction and productivity, though challenges remain around social isolation, work-life boundary management, and equal career advancement opportunities. Many companies have adopted hybrid models that attempt to balance the benefits of both in-office and remote work."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75, timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Captures the main idea and key supporting points', maxScore: 2 },
        { name: 'Form', description: 'Single sentence between 5 and 75 words', maxScore: 1 },
        { name: 'Grammar', description: 'Grammatically correct with appropriate structure', maxScore: 2 },
        { name: 'Vocabulary', description: 'Appropriate word choice and collocations', maxScore: 2 },
      ],
      modelAnswer: 'Since the 2020 pandemic transformed remote work from an emergency measure into a permanent arrangement, many companies have adopted hybrid models to harness the benefits of increased satisfaction and productivity while addressing ongoing challenges such as social isolation and career advancement inequality.',
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.swt.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage below and summarize it using one sentence (between 5 and 75 words).\n\nPassage: "Ocean acidification, caused by the absorption of excess atmospheric carbon dioxide, poses a severe threat to marine ecosystems. As seawater becomes more acidic, organisms that build calcium carbonate shells and skeletons — including corals, molluscs, and certain plankton species — find it increasingly difficult to maintain their structures. This has cascading effects throughout the food chain, potentially threatening fisheries that billions of people depend on for protein. Scientists warn that without significant reductions in CO2 emissions, ocean acidity could increase by 150% by 2100."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75, timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Captures the main idea and key supporting points', maxScore: 2 },
        { name: 'Form', description: 'Single sentence between 5 and 75 words', maxScore: 1 },
        { name: 'Grammar', description: 'Grammatically correct with appropriate structure', maxScore: 2 },
        { name: 'Vocabulary', description: 'Appropriate word choice and collocations', maxScore: 2 },
      ],
      modelAnswer: 'Ocean acidification caused by excess CO2 absorption threatens marine organisms that rely on calcium carbonate structures, creating cascading food chain effects that endanger global fisheries, and scientists predict a 150% increase in acidity by 2100 without significant emission reductions.',
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE WRITE ESSAY — 200-300 words, 20 minutes
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.essay.01', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Do you agree or disagree with the following statement?\n\n"The best way to learn about a country\'s culture is to live there."\n\nSupport your response with reasons and examples. Write between 200 and 300 words.',
      format: 'pte_essay',
      minWords: 200, maxWords: 300, timeMinutes: 20,
      rubric: [
        { name: 'Content', description: 'Addresses the topic with relevant ideas and examples', maxScore: 3 },
        { name: 'Development & Structure', description: 'Logical progression with clear paragraphing', maxScore: 2 },
        { name: 'Form', description: 'Within 200-300 word count range', maxScore: 2 },
        { name: 'Grammar', description: 'Range and accuracy of grammatical structures', maxScore: 2 },
        { name: 'Vocabulary', description: 'Appropriate and varied word choice', maxScore: 2 },
        { name: 'Spelling', description: 'Correct spelling throughout', maxScore: 2 },
      ],
      modelAnswer: 'While living in a country undoubtedly provides deep cultural immersion, I partially agree with this statement because other methods of cultural learning also offer valuable insights.\n\nLiving abroad offers unparalleled opportunities for cultural understanding. Daily interactions with local people expose residents to authentic customs, social norms, and communication styles that cannot be fully captured in books or media. For example, someone living in Japan would naturally learn the importance of bowing, gift-giving etiquette, and the concept of "wa" (harmony) through everyday experiences rather than theoretical study.\n\nHowever, simply living in a country does not guarantee cultural understanding. Many expatriates form communities with fellow foreigners and rarely engage with local culture. Without intentional effort to participate in local life, one might live somewhere for years without truly understanding its cultural depth.\n\nMoreover, alternative approaches can be highly effective. Studying a country\'s literature, art, and history provides intellectual context that enriches cultural understanding. Technology has also made virtual cultural exchange increasingly accessible through online communities, language exchange platforms, and documentaries.\n\nIn conclusion, while living in a country offers the most immersive cultural experience, meaningful cultural learning requires intentional engagement regardless of location, and complementary methods can significantly enhance one\'s understanding of any culture.',
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.essay.02', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Do you agree or disagree with the following statement?\n\n"Governments should spend more money on public transportation rather than building new roads for private vehicles."\n\nSupport your response with reasons and examples. Write between 200 and 300 words.',
      format: 'pte_essay',
      minWords: 200, maxWords: 300, timeMinutes: 20,
      rubric: [
        { name: 'Content', description: 'Addresses the topic with relevant ideas and examples', maxScore: 3 },
        { name: 'Development & Structure', description: 'Logical progression with clear paragraphing', maxScore: 2 },
        { name: 'Form', description: 'Within 200-300 word count range', maxScore: 2 },
        { name: 'Grammar', description: 'Range and accuracy of grammatical structures', maxScore: 2 },
        { name: 'Vocabulary', description: 'Appropriate and varied word choice', maxScore: 2 },
        { name: 'Spelling', description: 'Correct spelling throughout', maxScore: 2 },
      ],
      modelAnswer: 'I strongly agree that governments should prioritise investment in public transportation over building new roads, as this approach offers significant environmental, economic, and social benefits.\n\nFrom an environmental perspective, public transport systems produce far fewer emissions per passenger than private vehicles. Cities like Amsterdam and Copenhagen have demonstrated that investment in cycling infrastructure and public transit dramatically reduces urban pollution and carbon footprints. Building more roads, conversely, tends to increase traffic through a phenomenon known as "induced demand."\n\nEconomically, public transportation is more cost-effective in the long term. While initial infrastructure costs can be substantial, the per-person cost of moving passengers by bus, train, or metro is significantly lower than the combined costs of road construction, maintenance, and the healthcare expenses associated with pollution and accidents.\n\nFurthermore, accessible public transport promotes social equity by providing mobility to those who cannot afford private vehicles, including students, elderly citizens, and low-income workers. This improved accessibility can reduce social isolation and enhance economic participation across all segments of society.\n\nIn conclusion, investing in public transportation rather than expanding road networks is a more sustainable, equitable, and economically sound approach to urban mobility that governments should prioritise.',
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE REORDER PARAGRAPHS — Reading
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.ro.01', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      stem: 'The text boxes below have been placed in a random order. Restore the original order by identifying the topic sentence and following the logical progression.',
      sentences: [
        'The invention of the printing press in the 15th century revolutionised the spread of knowledge.',
        'Before its invention, books were copied by hand, making them extremely expensive and accessible only to the wealthy.',
        'Johannes Gutenberg\'s movable type technology dramatically reduced the cost and time required to produce books.',
        'As a result, literacy rates soared across Europe, and new ideas could be disseminated more rapidly than ever before.',
        'This democratisation of knowledge is considered one of the key catalysts for the Renaissance and the Scientific Revolution.',
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.ro.02', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      stem: 'Restore the original order of these text boxes by following the logical argument.',
      sentences: [
        'Sleep deprivation has become a widespread public health concern in modern society.',
        'Research indicates that adults who consistently sleep fewer than seven hours per night face increased risks of cardiovascular disease, obesity, and cognitive decline.',
        'The causes of insufficient sleep are multifaceted, ranging from work pressures and screen exposure to medical conditions such as insomnia and sleep apnoea.',
        'Health organisations recommend establishing consistent sleep schedules, limiting caffeine intake, and creating dark, cool sleeping environments.',
        'Addressing this issue is crucial, as the economic cost of sleep deprivation — through lost productivity and healthcare expenses — is estimated at billions of dollars annually.',
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.ro.03', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      stem: 'Put these sentences in the correct order to form a coherent paragraph.',
      sentences: [
        'Coral reefs, often called the "rainforests of the sea", support approximately 25% of all marine species.',
        'However, these vital ecosystems are under severe threat from rising ocean temperatures and acidification.',
        'When water temperatures exceed a critical threshold, corals expel the symbiotic algae that provide them with nutrients, resulting in coral bleaching.',
        'If conditions do not improve, bleached corals eventually die, leading to the collapse of the entire reef ecosystem.',
        'Conservation efforts, including marine protected areas and coral nurseries, aim to preserve these ecosystems for future generations.',
      ],
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE READING — Fill in the Blanks (Vocabulary in Context)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.rfb.01', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text', 'strat.pte.reorder_paragraphs'],
    payload: {
      stem: 'The discovery of antibiotics ______ one of the most significant medical breakthroughs of the 20th century. However, the ______ use of these drugs has led to the emergence of antibiotic-resistant bacteria, which ______ a growing threat to global health. Scientists are now ______ new approaches to combat these superbugs.',
      gaps: [
        { correctAnswer: 'represents', acceptedAlternatives: ['constitutes', 'remains'], hint: 'verb: is considered' },
        { correctAnswer: 'excessive', acceptedAlternatives: ['overuse', 'indiscriminate'], hint: 'adjective: too much' },
        { correctAnswer: 'poses', acceptedAlternatives: ['presents', 'constitutes'], hint: 'verb: creates (a threat)' },
        { correctAnswer: 'exploring', acceptedAlternatives: ['investigating', 'developing', 'researching'], hint: 'verb: searching for' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.rfb.02', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'Urbanisation has ______ rapidly over the past century, with more than half of the world\'s population now ______ in cities. This shift has created both opportunities and ______, as governments struggle to provide adequate infrastructure, housing, and services to ______ growing urban populations.',
      gaps: [
        { correctAnswer: 'accelerated', acceptedAlternatives: ['progressed', 'increased'], hint: 'verb: sped up' },
        { correctAnswer: 'residing', acceptedAlternatives: ['living', 'dwelling'], hint: 'verb: living in' },
        { correctAnswer: 'challenges', acceptedAlternatives: ['difficulties', 'problems'], hint: 'noun: difficulties' },
        { correctAnswer: 'accommodate', acceptedAlternatives: ['support', 'sustain', 'serve'], hint: 'verb: provide for' },
      ],
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE STRATEGY — MCQ
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.strat.01', type: 'mcq', level: 'B1', skill: 'general',
    nodeIds: ['strat.pte.time_management'],
    payload: {
      stem: 'In PTE Academic, the Speaking & Writing section is unique because:',
      options: [
        { text: 'Speaking and writing tasks appear in separate timed sections', misconception: 'Unlike IELTS, PTE combines speaking and writing into one section' },
        { text: 'Speaking and writing tasks are interleaved in a single timed block', misconception: null },
        { text: 'You can choose which speaking or writing tasks to attempt', misconception: 'All tasks are compulsory and appear in a fixed order' },
        { text: 'Speaking tasks are done separately with an examiner', misconception: 'PTE is entirely computer-based — there is no human examiner' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'pte.strat.02', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.pte.reorder_paragraphs'],
    payload: {
      stem: 'When tackling PTE Reorder Paragraphs, the best strategy is to:',
      options: [
        { text: 'Start with the longest sentence as it usually contains the most information', misconception: 'Length is not a reliable indicator of position' },
        { text: 'Look for the sentence that introduces the topic without referring to previous information', misconception: null },
        { text: 'Arrange sentences alphabetically by their first word', misconception: 'Alphabetical order has no connection to logical order' },
        { text: 'Place sentences with linking words (however, therefore) first', misconception: 'Linking words indicate subsequent sentences, not opening ones' },
      ],
      correctIndex: 1,
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.strat.03', type: 'mcq', level: 'B2', skill: 'writing',
    nodeIds: ['strat.pte.summarize_written'],
    payload: {
      stem: 'In PTE Summarize Written Text, your answer must be:',
      options: [
        { text: 'A bullet-pointed list of key ideas', misconception: 'The format requires a single grammatical sentence, not bullet points' },
        { text: 'A paragraph of 3-5 sentences under 75 words', misconception: 'It must be exactly ONE sentence, not a paragraph' },
        { text: 'A single sentence between 5 and 75 words capturing the main idea', misconception: null },
        { text: 'A copy of the most important sentence from the passage', misconception: 'You must paraphrase in your own words, not copy from the passage' },
      ],
      correctIndex: 2,
      difficulty: 0.35,
    },
  },
  {
    id: 'pte.strat.04', type: 'mcq', level: 'B1', skill: 'speaking',
    nodeIds: ['strat.pte.read_aloud'],
    payload: {
      stem: 'In PTE Read Aloud, which factor contributes MOST to your score?',
      options: [
        { text: 'Reading as fast as possible to finish within the time limit', misconception: 'Speed without clarity hurts pronunciation and fluency scores' },
        { text: 'Reading with natural stress, intonation, and smooth delivery', misconception: null },
        { text: 'Adding extra words or explanations to show understanding', misconception: 'Adding words not in the text reduces your content score' },
        { text: 'Pronouncing every word with exactly the same stress and rhythm', misconception: 'English is a stress-timed language — equal stress sounds robotic' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'pte.strat.05', type: 'mcq', level: 'B2', skill: 'speaking',
    nodeIds: ['strat.pte.describe_image'],
    payload: {
      stem: 'What is the recommended structure for PTE Describe Image?',
      options: [
        { text: 'List every single data point visible in the image', misconception: 'Listing all data is impossible in 40 seconds and misses the overview' },
        { text: 'Introduction (what the image shows) → Key features → Comparisons → Conclusion', misconception: null },
        { text: 'Start with your personal opinion about the data', misconception: 'PTE Describe Image is objective — no personal opinions needed' },
        { text: 'Describe the colours and visual design of the chart', misconception: 'Focus on data and trends, not the visual appearance of the chart' },
      ],
      correctIndex: 1,
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE HIGHLIGHT INCORRECT WORDS — Listening
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.hi.01', type: 'highlight_incorrect', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      transcript: 'The global economy has experienced significant fluctuations over the past decade particularly in the wake of unprecedented challenges such as pandemics and geopolitical tensions that have reshaped traditional trading patterns',
      incorrectWordIndices: [5, 14, 20],
      correctWords: ['fluctuations', 'unprecedented', 'reshaped'],
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PTE WORD FORMATION — Academic Vocabulary
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.wf.01', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.pte.write_essay'],
    payload: {
      stem: 'The ______ of new renewable energy sources is essential for achieving carbon neutrality by 2050.',
      rootWord: 'adopt',
      acceptedAnswers: ['adoption'],
      explanation: 'adopt → adoption (noun). In PTE essays, nominalisation creates formal academic register. "Countries adopt" → "The adoption of... by countries" — more appropriate for academic writing.',
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.wf.02', type: 'word_formation', level: 'B2', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.pte.write_essay'],
    payload: {
      stem: 'The ______ between economic growth and environmental protection remains a central challenge for policymakers.',
      rootWord: 'tense',
      acceptedAnswers: ['tension'],
      explanation: 'tense → tension (noun). "Tension between X and Y" is a key collocation for PTE essays discussing opposing forces or trade-offs.',
      difficulty: 0.4,
    },
  },
]
