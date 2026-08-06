// # Expanded PTE Academic content — 80+ additional items covering all PTE task types.
// # Supplements seed-pte-prep.ts which has 23 items.
// # Total PTE content: ~100 items.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_PTE_EXPANDED: UnifiedSeedItem[] = [
  // # ═══════════════════════════════════════════════════════════════════
  // # READ ALOUD — 6 more passages
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.ra.04', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud.\n\n"The human brain contains approximately 86 billion neurons, each forming thousands of connections with other neurons. This intricate network enables everything from basic motor functions to complex abstract reasoning. Recent advances in neuroscience have revealed that the brain remains remarkably plastic throughout life, capable of forming new neural pathways in response to learning and experience."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35, speakTimeSeconds: 40,
      targetLanguage: ['Stress: ap-PROX-i-mate-ly, IN-tri-cate, re-MARK-ab-ly', 'Pause before contrast words'],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.ra.05', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud.\n\n"Biodiversity loss is accelerating at an unprecedented rate, with scientists estimating that approximately one million species are currently at risk of extinction. The primary drivers include habitat destruction, overexploitation of natural resources, pollution, and climate change. Conservation efforts must therefore address multiple interconnected threats simultaneously."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35, speakTimeSeconds: 40,
      targetLanguage: ['Key words: bi-o-di-VER-si-ty, un-PRE-ce-dent-ed, si-mul-TA-ne-ous-ly'],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.ra.06', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud.\n\n"Quantum computing represents a paradigm shift in computational capability. Unlike classical computers that process information in binary digits, quantum computers utilise quantum bits, or qubits, which can exist in multiple states simultaneously through a phenomenon known as superposition. This allows quantum systems to solve certain categories of problems exponentially faster than their classical counterparts."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35, speakTimeSeconds: 40,
      targetLanguage: ['Technical: PA-ra-digm, QU-bits, su-per-po-SI-tion, ex-po-NEN-tial-ly'],
      difficulty: 0.6,
    },
  },
  {
    id: 'pte.ra.07', type: 'speaking_prompt', level: 'B1', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud.\n\n"Regular physical exercise has been shown to have numerous benefits for both physical and mental health. Studies indicate that even moderate activity, such as brisk walking for thirty minutes a day, can significantly reduce the risk of heart disease, diabetes, and depression. Health organisations worldwide recommend that adults engage in at least 150 minutes of moderate exercise per week."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35, speakTimeSeconds: 40,
      targetLanguage: ['Number clarity: "thirty minutes", "150 minutes", "per week"'],
      difficulty: 0.3,
    },
  },
  {
    id: 'pte.ra.08', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud.\n\n"The concept of sustainable development gained prominence following the 1987 Brundtland Report, which defined it as development that meets the needs of the present without compromising the ability of future generations to meet their own needs. This principle has since become a cornerstone of international environmental policy and corporate social responsibility frameworks."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35, speakTimeSeconds: 40,
      targetLanguage: ['Named reference: BRUNDT-land, chunking at commas'],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.ra.09', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      prompt: 'Read the following text aloud.\n\n"Epigenetics, the study of heritable changes in gene expression that do not involve alterations to the underlying DNA sequence, has revolutionised our understanding of biological inheritance. Research has demonstrated that environmental factors such as diet, stress, and exposure to toxins can modify gene expression patterns, and these modifications may be transmitted across generations."',
      format: 'pte_read_aloud',
      followUpQuestions: [],
      prepTimeSeconds: 35, speakTimeSeconds: 40,
      targetLanguage: ['e-pi-ge-NE-tics, HE-ri-ta-ble, al-te-RA-tions, trans-MIT-ted'],
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # DESCRIBE IMAGE — 6 more prompts
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.di.03', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Describe this pie chart.\n\n"Global Energy Sources (2024)"\n- Oil: 31%\n- Natural Gas: 24%\n- Coal: 27%\n- Renewables: 13%\n- Nuclear: 5%',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: ['What the chart represents', 'Largest and smallest segments', 'Key comparisons', 'Overall pattern'],
      prepTimeSeconds: 25, speakTimeSeconds: 40,
      targetLanguage: ['Proportions: "accounts for", "comprises", "makes up"'],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.di.04', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Describe this table.\n\n"Top 5 Countries by GDP per Capita (USD, 2024)"\n1. Luxembourg: $131,300\n2. Ireland: $106,200\n3. Switzerland: $98,800\n4. Norway: $89,100\n5. Singapore: $72,800',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: ['What data is shown', 'The highest-ranked country', 'Differences between entries', 'Notable pattern'],
      prepTimeSeconds: 25, speakTimeSeconds: 40,
      targetLanguage: ['Rankings: "tops the list", "is followed by", "comes in at"'],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.di.05', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Describe this process diagram.\n\n"Steps in Recycling Plastic"\n1. Collection from households and businesses\n2. Sorting by type (PET, HDPE, etc.)\n3. Cleaning and shredding\n4. Melting and reforming into pellets\n5. Manufacturing new products\n6. Distribution to consumers',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: ['What process is shown', 'Number of steps', 'Key stages', 'Start and end points'],
      prepTimeSeconds: 25, speakTimeSeconds: 40,
      targetLanguage: ['Sequencing: "firstly", "subsequently", "following this", "finally"'],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.di.06', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Describe this dual-axis graph.\n\n"Australia: Unemployment Rate (%) vs Immigration (thousands), 2015-2024"\nUnemployment: 6.1% → 5.7% → 5.6% → 5.3% → 5.2% → 6.9% → 5.1% → 3.5% → 3.7% → 4.1%\nImmigration: 178K → 182K → 226K → 162K → 194K → -85K → 24K → 387K → 518K → 350K',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: ['Two variables shown', 'Overall trends', 'COVID anomaly (2020)', 'Relationship between variables'],
      prepTimeSeconds: 25, speakTimeSeconds: 40,
      targetLanguage: ['Correlation language: "inversely related", "coincided with", "corresponding"'],
      difficulty: 0.6,
    },
  },
  {
    id: 'pte.di.07', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Describe this map.\n\n"Proposed University Campus Expansion"\nCurrent campus: 4 buildings (Library, Science Block, Arts Faculty, Admin)\nProposed additions: Sports Complex (north), Student Housing (east), Research Lab (south)\nNew car park (west), pedestrian walkway connecting all buildings',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: ['Current layout', 'Proposed changes', 'Locations', 'Overall impact'],
      prepTimeSeconds: 25, speakTimeSeconds: 40,
      targetLanguage: ['Location language: "to the north of", "adjacent to", "is situated"'],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.di.08', type: 'speaking_prompt', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b2.describe_data', 'strat.pte.describe_image'],
    payload: {
      prompt: 'Describe this stacked bar chart.\n\n"Household Water Usage by Category (litres/day/person, 2024)"\nUSA: Shower 40, Toilet 30, Laundry 25, Kitchen 15, Garden 20 = 130 total\nUK: Shower 35, Toilet 25, Laundry 20, Kitchen 12, Garden 10 = 102 total\nAustralia: Shower 45, Toilet 28, Laundry 22, Kitchen 14, Garden 30 = 139 total',
      format: 'pte_describe_image',
      followUpQuestions: [],
      cueCardPoints: ['Chart type and topic', 'Highest total consumption', 'Largest category', 'Cross-country differences'],
      prepTimeSeconds: 25, speakTimeSeconds: 40,
      targetLanguage: ['Comparison: "consumes the most", "the largest proportion", "significantly less"'],
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SUMMARIZE WRITTEN TEXT — 8 passages
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.swt.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"The sharing economy, exemplified by platforms such as Airbnb and Uber, has disrupted traditional industries by enabling peer-to-peer transactions. While proponents argue that it increases efficiency and provides flexible income opportunities, critics highlight concerns about labour rights, regulatory compliance, and the erosion of established business models. Governments worldwide are grappling with how to regulate these platforms without stifling innovation."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'The sharing economy, as represented by platforms like Airbnb and Uber, has transformed traditional industries through peer-to-peer transactions but has simultaneously raised concerns regarding labour rights, regulation, and the displacement of established businesses, prompting governments to seek a balance between oversight and innovation.',
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.swt.04', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"Microplastics, tiny fragments of plastic less than five millimetres in diameter, have been found in virtually every ecosystem on Earth, from deep ocean trenches to Arctic ice cores. These particles enter the environment through the breakdown of larger plastic items, synthetic clothing fibres released during washing, and industrial processes. Growing evidence suggests they may pose risks to both wildlife and human health."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'Microplastics, which originate from degraded plastic products, synthetic clothing, and industrial activities, have permeated ecosystems worldwide, including oceans and polar regions, and emerging research indicates they may present significant health risks to wildlife and humans.',
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.swt.05', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"The phenomenon of brain drain, whereby highly skilled professionals emigrate from developing to developed nations in search of better opportunities, has profound implications for source countries. While remittances sent home can boost local economies, the loss of trained doctors, engineers, and researchers undermines institutional capacity and perpetuates cycles of underdevelopment. Some countries have implemented bonded service requirements for publicly funded graduates as a countermeasure."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'Brain drain, the emigration of skilled professionals from developing to developed countries, has both positive effects through remittances and negative consequences including diminished institutional capacity, leading some nations to implement service requirements for publicly funded graduates.',
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.swt.06', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"Vertical farming, the practice of growing crops in stacked layers within controlled indoor environments, has emerged as a potential solution to food security challenges. These facilities can produce crops year-round regardless of weather, use up to 95% less water than traditional farming, and eliminate the need for pesticides. However, high energy costs for artificial lighting remain a significant economic barrier."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'Vertical farming offers a promising approach to food security through year-round indoor crop production with dramatically reduced water usage and no pesticides, though the high energy costs of artificial lighting present a substantial economic challenge to widespread adoption.',
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.swt.07', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"The rise of telemedicine during the COVID-19 pandemic demonstrated both the potential and limitations of remote healthcare delivery. Virtual consultations increased access for rural and mobility-impaired patients, reduced waiting times, and lowered transmission risk. Nevertheless, concerns about diagnostic accuracy without physical examination, digital literacy barriers among elderly populations, and data privacy issues suggest that telemedicine should complement rather than replace in-person care."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'The COVID-19 pandemic accelerated telemedicine adoption, which improved healthcare access and efficiency, but limitations including reduced diagnostic accuracy, digital literacy challenges, and privacy concerns indicate it should serve as a supplement to, rather than a replacement for, traditional in-person medical consultations.',
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.swt.08', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"The circular economy model aims to eliminate waste by designing products for durability, reuse, and recyclability from the outset. Unlike the traditional linear model of take-make-dispose, circular approaches keep materials in use for as long as possible through repair, refurbishment, and recycling. Companies adopting circular practices often discover that reduced material costs and new revenue streams from secondary markets offset implementation expenses."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'The circular economy replaces the traditional linear take-make-dispose model with a system that designs products for longevity and recyclability, keeping materials in use through repair and refurbishment, while companies adopting this approach frequently find that cost savings and new revenue streams offset implementation costs.',
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.swt.09', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"Behavioural economics, which integrates psychological insights into economic models, has transformed policymaking through the concept of nudging. By subtly altering the choice architecture — for example, making organ donation opt-out rather than opt-in — governments can steer citizens toward beneficial decisions without restricting freedom. Critics, however, warn that such interventions may constitute manipulation and raise questions about paternalism in democratic societies."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'Behavioural economics has influenced government policy through nudging techniques that modify choice architecture to encourage beneficial decisions without limiting freedom, though critics argue these interventions risk manipulation and raise concerns about democratic paternalism.',
      difficulty: 0.6,
    },
  },
  {
    id: 'pte.swt.10', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.summarise_text', 'strat.pte.summarize_written'],
    payload: {
      prompt: 'Read the passage and summarise it in ONE sentence (5-75 words).\n\n"Sleep deprivation has reached epidemic proportions in modern societies, with research linking insufficient sleep to increased risks of obesity, cardiovascular disease, weakened immunity, and cognitive decline. The proliferation of screen-based devices and the culture of overwork are frequently cited as contributing factors. Health experts recommend establishing consistent sleep schedules, limiting screen time before bed, and creating dark, cool sleeping environments."',
      format: 'pte_summarize_written',
      minWords: 5, maxWords: 75,
      modelAnswer: 'Sleep deprivation, driven by screen usage and overwork culture, has become a widespread health concern associated with obesity, cardiovascular disease, and cognitive decline, prompting health experts to recommend consistent schedules, reduced screen time, and optimised sleeping environments as remedies.',
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # ESSAY — 6 more prompts
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.essay.03', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Write an essay of 200-300 words on the following topic:\n\n"Some people believe that governments should invest heavily in public transport to reduce traffic congestion and pollution, while others argue that improving road infrastructure for private vehicles is a better approach. Discuss both views and give your opinion."',
      format: 'pte_essay', minWords: 200, maxWords: 300, difficulty: 0.5,
    },
  },
  {
    id: 'pte.essay.04', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Write an essay of 200-300 words on the following topic:\n\n"In many countries, the gap between the rich and the poor is widening. What problems does this cause, and what measures can be taken to address this issue?"',
      format: 'pte_essay', minWords: 200, maxWords: 300, difficulty: 0.5,
    },
  },
  {
    id: 'pte.essay.05', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Write an essay of 200-300 words on the following topic:\n\n"With the advancement of artificial intelligence, many routine jobs will become automated. To what extent do you think this will have a positive or negative impact on society?"',
      format: 'pte_essay', minWords: 200, maxWords: 300, difficulty: 0.55,
    },
  },
  {
    id: 'pte.essay.06', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Write an essay of 200-300 words on the following topic:\n\n"Some people think that social media has a negative effect on individuals and society. To what extent do you agree or disagree?"',
      format: 'pte_essay', minWords: 200, maxWords: 300, difficulty: 0.45,
    },
  },
  {
    id: 'pte.essay.07', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Write an essay of 200-300 words on the following topic:\n\n"International tourism brings enormous economic benefits to host countries, but it also creates environmental damage and cultural disruption. Do the advantages outweigh the disadvantages?"',
      format: 'pte_essay', minWords: 200, maxWords: 300, difficulty: 0.55,
    },
  },
  {
    id: 'pte.essay.08', type: 'writing_task', level: 'B2', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.pte.write_essay'],
    payload: {
      prompt: 'Write an essay of 200-300 words on the following topic:\n\n"Some people believe that university education should be free for all students, while others argue that students should pay tuition fees. Discuss both views and state your position."',
      format: 'pte_essay', minWords: 200, maxWords: 300, difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # REORDER PARAGRAPHS — 8 items
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.rop.01', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'However, the long-term environmental costs of fast fashion are becoming increasingly apparent.',
        'The fashion industry has undergone a dramatic transformation over the past two decades.',
        'As a result, consumers and regulators are beginning to demand more sustainable practices.',
        'The rise of fast fashion has made trendy clothing affordable and widely accessible.',
        'Textile waste, water pollution, and carbon emissions from production are major concerns.',
      ],
      correctOrder: [1, 3, 0, 4, 2],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.rop.02', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'This has led to calls for greater transparency in how algorithms make decisions.',
        'Artificial intelligence is increasingly used to make important decisions in areas such as hiring, lending, and criminal justice.',
        'Research has shown that these systems can perpetuate and even amplify existing biases in historical data.',
        'Concerns about algorithmic fairness have therefore become a central topic in technology ethics.',
        'When biased data is used to train AI models, the resulting decisions may discriminate against certain groups.',
      ],
      correctOrder: [1, 2, 4, 3, 0],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.rop.03', type: 'reorder', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'These findings have significant implications for public health policy and workplace regulation.',
        'A growing body of evidence suggests that prolonged sitting is associated with increased mortality risk.',
        'Researchers have found that individuals who sit for more than eight hours daily without physical activity have a risk of dying similar to that posed by obesity and smoking.',
        'Experts now recommend breaking up sitting time with short periods of movement every 30 to 60 minutes.',
        'The health risks persist even among those who exercise regularly, though physical activity does mitigate the effects.',
      ],
      correctOrder: [1, 2, 4, 3, 0],
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.rop.04', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'For example, bilingual children consistently outperform monolingual peers in tasks requiring selective attention.',
        'Research in cognitive science has revealed that bilingualism confers significant cognitive advantages.',
        'These advantages extend beyond childhood, with studies showing that bilingualism may delay the onset of dementia by several years.',
        'Furthermore, bilingual individuals demonstrate greater mental flexibility and superior problem-solving skills.',
        'The ability to switch between two linguistic systems appears to strengthen executive function in the brain.',
      ],
      correctOrder: [1, 4, 0, 3, 2],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.rop.05', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'This has revolutionised fields ranging from medicine to materials science.',
        'Three-dimensional printing, also known as additive manufacturing, creates objects by depositing material layer by layer.',
        'In healthcare, 3D printing enables the production of customised prosthetics and even biocompatible implants.',
        'The technology was originally developed for rapid prototyping in industrial design.',
        'Today, however, its applications have expanded far beyond its original purpose.',
      ],
      correctOrder: [1, 3, 4, 0, 2],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.rop.06', type: 'reorder', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'Consequently, organisations must continually adapt their strategies to maintain relevance.',
        'The pace of technological change has accelerated markedly since the turn of the millennium.',
        'This rapid evolution creates both opportunities and challenges for businesses of all sizes.',
        'New technologies can create entirely new markets while simultaneously rendering existing products obsolete.',
        'Companies that fail to innovate risk being displaced by more agile competitors.',
      ],
      correctOrder: [1, 2, 3, 4, 0],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.rop.07', type: 'reorder', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'Meanwhile, urban gardens and community allotments have experienced a surge in popularity.',
        'The COVID-19 pandemic brought about a renewed interest in self-sufficiency and local food production.',
        'This trend reflects a broader shift toward valuing food security and environmental sustainability.',
        'Supply chain disruptions during lockdowns highlighted the fragility of global food systems.',
        'Many people began growing their own vegetables and herbs for the first time.',
      ],
      correctOrder: [1, 3, 4, 0, 2],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.rop.08', type: 'reorder', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      instructions: 'Reorder these sentences to form a coherent paragraph.',
      segments: [
        'Nevertheless, the principles of effective storytelling — conflict, resolution, emotional resonance — remain unchanged.',
        'The history of human communication can be understood as a series of technological revolutions.',
        'From the invention of writing to the printing press, and from radio to social media, each new medium has transformed how stories are shared.',
        'What changes is not the fundamental human need for narrative, but the speed, scale, and format of its delivery.',
        'Each transition has sparked concerns about the death of previous forms.',
      ],
      correctOrder: [1, 2, 4, 0, 3],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # READING: FILL IN THE BLANKS — 10 items
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.rfib.01', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'The discovery of antibiotics in the early twentieth century _____ a revolution in medicine, dramatically reducing deaths from bacterial infections.',
      gaps: [{ position: 0, answer: 'sparked', distractors: ['ignited', 'fired', 'launched'] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.rfib.02', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'Scientists have long debated whether nature or _____ plays a more significant role in shaping human behaviour.',
      gaps: [{ position: 0, answer: 'nurture', distractors: ['culture', 'upbringing', 'environment'] }],
      difficulty: 0.35,
    },
  },
  {
    id: 'pte.rfib.03', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'The government has _____ strict regulations to ensure that companies dispose of hazardous waste responsibly.',
      gaps: [{ position: 0, answer: 'implemented', distractors: ['enacted', 'applied', 'enforced'] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.rfib.04', type: 'gap_fill', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'The rise of remote work has _____ traditional notions of the workplace, forcing organisations to reconsider their approach to employee engagement and productivity.',
      gaps: [{ position: 0, answer: 'challenged', distractors: ['questioned', 'disputed', 'undermined'] }],
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.rfib.05', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'Despite _____ evidence to the contrary, some individuals continue to reject the scientific consensus on climate change.',
      gaps: [{ position: 0, answer: 'overwhelming', distractors: ['substantial', 'considerable', 'massive'] }],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.rfib.06', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'The charity aims to _____ awareness about the importance of mental health in the workplace.',
      gaps: [{ position: 0, answer: 'raise', distractors: ['increase', 'heighten', 'boost'] }],
      difficulty: 0.35,
    },
  },
  {
    id: 'pte.rfib.07', type: 'gap_fill', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'Renewable energy sources are expected to _____ fossil fuels as the primary source of electricity generation within the next few decades.',
      gaps: [{ position: 0, answer: 'supplant', distractors: ['replace', 'overtake', 'supersede'] }],
      difficulty: 0.6,
    },
  },
  {
    id: 'pte.rfib.08', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'Educational researchers have consistently found a strong _____ between parental involvement and student academic achievement.',
      gaps: [{ position: 0, answer: 'correlation', distractors: ['connection', 'relationship', 'link'] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.rfib.09', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'The study _____ light on the mechanisms by which regular exercise protects against cognitive decline in older adults.',
      gaps: [{ position: 0, answer: 'shed', distractors: ['threw', 'cast', 'shone'] }],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.rfib.10', type: 'gap_fill', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b1.use_vocabulary', 'strat.pte.time_management'],
    payload: {
      text: 'The journalist was accused of _____ the facts to fit a predetermined narrative, rather than reporting events objectively.',
      gaps: [{ position: 0, answer: 'distorting', distractors: ['bending', 'twisting', 'manipulating'] }],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # MCQ — Multiple choice, choose single answer — 10 items
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.mcq.01', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'Read the passage and choose the correct answer.\n\n"The development of the internet has had a profound impact on journalism. Traditional newspapers, which once held a near-monopoly on the distribution of news, have seen their circulations decline sharply as readers migrate to free online sources. This shift has forced news organisations to experiment with digital subscription models, targeted advertising, and even philanthropic funding to sustain quality reporting."\n\nWhat is the main idea of this passage?',
      options: [
        { text: 'Traditional newspapers are no longer relevant in the modern world.', misconception: 'Too extreme — passage says they are adapting, not irrelevant' },
        { text: 'The internet has disrupted traditional journalism business models, requiring new funding approaches.', misconception: null },
        { text: 'Online news is superior to printed newspapers in every way.', misconception: 'Not stated — passage is neutral on quality' },
        { text: 'Philanthropic funding is the best solution for struggling newspapers.', misconception: 'Only one option mentioned, not presented as best' },
      ],
      correctIndex: 1, difficulty: 0.4,
    },
  },
  {
    id: 'pte.mcq.02', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'Read the passage and choose the correct answer.\n\n"Urban heat islands occur when cities replace natural land cover with dense concentrations of pavement, buildings, and other surfaces that absorb and retain heat. This effect can raise temperatures in urban areas by 1-3°C compared to surrounding rural areas. Strategies to mitigate this include increasing green spaces, using reflective materials on buildings, and implementing cool roof technologies."\n\nAccording to the passage, what causes urban heat islands?',
      options: [
        { text: 'Higher population density in cities', misconception: 'Population is not mentioned as a cause' },
        { text: 'Industrial emissions and vehicle exhaust', misconception: 'Not stated in this passage' },
        { text: 'Replacement of natural surfaces with heat-absorbing materials', misconception: null },
        { text: 'Global climate change affecting urban areas more severely', misconception: 'Climate change is not discussed' },
      ],
      correctIndex: 2, difficulty: 0.35,
    },
  },
  {
    id: 'pte.mcq.03', type: 'mcq', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'Read the passage and choose the correct answer.\n\n"The placebo effect, whereby patients experience genuine improvements in their condition after receiving an inert treatment, has long puzzled medical researchers. Recent neuroimaging studies have shown that placebos can trigger measurable changes in brain activity, particularly in regions associated with pain processing and reward. This suggests that the therapeutic relationship and patient expectations play a more significant role in healing than previously acknowledged."\n\nWhat can be inferred from this passage?',
      options: [
        { text: 'Placebos are as effective as real medications', misconception: 'Not what the passage says' },
        { text: 'Patient beliefs and doctor-patient interactions contribute meaningfully to treatment outcomes', misconception: null },
        { text: 'Neuroimaging has proven that all illness is psychological', misconception: 'Extreme and not stated' },
        { text: 'Medical research should stop using placebo-controlled trials', misconception: 'Not implied' },
      ],
      correctIndex: 1, difficulty: 0.55,
    },
  },
  {
    id: 'pte.mcq.04', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'Read the passage and choose the correct answer.\n\n"The Mediterranean diet, characterised by high consumption of olive oil, fruits, vegetables, legumes, and moderate amounts of fish and wine, has been consistently associated with reduced cardiovascular risk. A landmark 2013 study found that participants following this diet had a 30% lower risk of heart attacks and strokes compared to a control group."\n\nWhat does the passage primarily discuss?',
      options: [
        { text: 'The history of Mediterranean cuisine', misconception: 'History is not the focus' },
        { text: 'The cardiovascular health benefits of the Mediterranean diet', misconception: null },
        { text: 'Why olive oil is the healthiest cooking fat', misconception: 'Too specific' },
        { text: 'Problems with modern Western diets', misconception: 'Not discussed' },
      ],
      correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'pte.mcq.05', type: 'mcq', level: 'C1', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'Read the passage and choose the correct answer.\n\n"The concept of digital citizenship has gained prominence as societies grapple with the responsibilities that accompany online participation. Digital citizens are expected to engage respectfully, verify information before sharing, protect their personal data, and consider the impact of their digital footprint. Educational institutions are increasingly incorporating digital literacy programmes into their curricula to prepare students for responsible online participation."\n\nWhat is the author\'s tone in this passage?',
      options: [
        { text: 'Critical of technology companies', misconception: 'No criticism of companies' },
        { text: 'Nostalgic for pre-digital communication', misconception: 'No nostalgia expressed' },
        { text: 'Informative and supportive of digital citizenship education', misconception: null },
        { text: 'Pessimistic about the future of online behaviour', misconception: 'Tone is neutral-positive' },
      ],
      correctIndex: 2, difficulty: 0.5,
    },
  },
  {
    id: 'pte.mcq.06', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'Read the passage and choose the correct answer.\n\n"Coral reefs, often called the rainforests of the sea, support approximately 25% of all marine species despite covering less than 1% of the ocean floor. Rising ocean temperatures have caused widespread coral bleaching, a stress response that can lead to coral death if prolonged. Marine biologists are exploring coral restoration techniques, including breeding heat-resistant coral varieties, to protect these vital ecosystems."\n\nWhat does the phrase "rainforests of the sea" suggest about coral reefs?',
      options: [
        { text: 'They receive as much rainfall as tropical forests', misconception: 'Literal misinterpretation' },
        { text: 'They support an exceptionally high concentration of biodiversity', misconception: null },
        { text: 'They are located primarily in tropical regions', misconception: 'Location is not the point of the metaphor' },
        { text: 'They are being deforested at alarming rates', misconception: 'Deforestation applies to forests, not reefs' },
      ],
      correctIndex: 1, difficulty: 0.4,
    },
  },
  {
    id: 'pte.mcq.07', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'PTE Listening Strategy: Which of the following is the BEST approach when answering "Highlight Incorrect Words" questions?',
      options: [
        { text: 'Read the transcript silently during the audio', misconception: 'Wrong — you must read ALONG with the audio to catch mismatches' },
        { text: 'Follow the text with your eyes while listening, clicking words that differ from what you hear', misconception: null },
        { text: 'Listen without looking at the text first, then read it after', misconception: 'The audio only plays once — you must compare in real time' },
        { text: 'Focus only on content words and ignore function words', misconception: 'Both types can be incorrect' },
      ],
      correctIndex: 1, difficulty: 0.35,
    },
  },
  {
    id: 'pte.mcq.08', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_argument', 'strat.pte.time_management'],
    payload: {
      stem: 'PTE Strategy: In "Write From Dictation," which technique maximises your score?',
      options: [
        { text: 'Write only the keywords you remember', misconception: 'Partial answers lose significant marks' },
        { text: 'Write the complete sentence exactly as you hear it, using correct spelling', misconception: null },
        { text: 'Paraphrase the sentence in your own words', misconception: 'You must reproduce the exact words' },
        { text: 'Focus on grammar rather than the exact words spoken', misconception: 'Exact words matter most' },
      ],
      correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'pte.mcq.09', type: 'mcq', level: 'B2', skill: 'speaking',
    nodeIds: ['cando.b1.read_aloud', 'strat.pte.read_aloud'],
    payload: {
      stem: 'PTE Speaking Strategy: What is the most important factor in scoring well on "Repeat Sentence"?',
      options: [
        { text: 'Speaking as quickly as possible', misconception: 'Speed causes errors and reduces fluency score' },
        { text: 'Reproducing the exact words in the correct order with natural rhythm', misconception: null },
        { text: 'Adding extra words to show vocabulary range', misconception: 'Adding words is penalised' },
        { text: 'Using a different accent from the speaker', misconception: 'Accent variation is fine but doesn\'t help score' },
      ],
      correctIndex: 1, difficulty: 0.3,
    },
  },
  {
    id: 'pte.mcq.10', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.follow_text_structure', 'strat.pte.reorder_paragraphs'],
    payload: {
      stem: 'PTE Reading Strategy: When reordering paragraphs, what should you identify FIRST?',
      options: [
        { text: 'The longest sentence, as it is usually the topic sentence', misconception: 'Length doesn\'t determine position' },
        { text: 'The sentence that introduces a new topic without referring back to previous information', misconception: null },
        { text: 'The sentence with the most complex grammar', misconception: 'Grammar complexity is irrelevant' },
        { text: 'The sentence containing a proper noun', misconception: 'Proper nouns can appear anywhere' },
      ],
      correctIndex: 1, difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # HIGHLIGHT INCORRECT WORDS — 6 items (listening skill)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.hiw.01', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      transcript: 'The government has announced new measures to combat rising inflation. Consumer prices have increased by nearly five percent over the past year, placing significant pressure on household budgets.',
      displayText: 'The government has announced new measures to combat rising deflation. Consumer prices have decreased by nearly five percent over the past year, placing significant pressure on household budgets.',
      incorrectWords: ['deflation', 'decreased'],
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.hiw.02', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      transcript: 'Marine biologists have discovered a new species of deep-sea fish that can survive at extreme depths exceeding ten thousand metres.',
      displayText: 'Marine biologists have discovered a new species of deep-sea fish that can survive at extreme heights exceeding ten million metres.',
      incorrectWords: ['heights', 'million'],
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.hiw.03', type: 'highlight_incorrect', level: 'C1', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      transcript: 'The university has implemented a comprehensive sustainability strategy, including solar panels on campus buildings and a complete transition to electric vehicles in its fleet.',
      displayText: 'The university has implemented a comprehensive sustainability strategy, including solar panels on campus buildings and a partial transition to electric vehicles in its fleet.',
      incorrectWords: ['partial'],
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.hiw.04', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      transcript: 'Research conducted over three decades has shown that early childhood education produces lasting cognitive and social benefits.',
      displayText: 'Research conducted over three decades has shown that early childhood education produces temporary cognitive and social benefits.',
      incorrectWords: ['temporary'],
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.hiw.05', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      transcript: 'The archaeological team uncovered artefacts dating back approximately three thousand years to the Bronze Age.',
      displayText: 'The archaeological team uncovered artefacts dating back approximately three hundred years to the Bronze Age.',
      incorrectWords: ['hundred'],
      difficulty: 0.35,
    },
  },
  {
    id: 'pte.hiw.06', type: 'highlight_incorrect', level: 'C1', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      transcript: 'The study demonstrated that participants who engaged in regular meditation showed reduced levels of cortisol and improved immune function over a twelve-week period.',
      displayText: 'The study demonstrated that participants who engaged in regular meditation showed increased levels of cortisol and improved immune function over a twelve-month period.',
      incorrectWords: ['increased', 'month'],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # WRITE FROM DICTATION — 10 items (listening + writing)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'pte.wfd.01', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'The library will be closed for renovations during the summer break.', distractors: [] }],
      difficulty: 0.3,
    },
  },
  {
    id: 'pte.wfd.02', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'Students must submit their assignments by the end of the semester.', distractors: [] }],
      difficulty: 0.3,
    },
  },
  {
    id: 'pte.wfd.03', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'The research findings were published in a leading international journal.', distractors: [] }],
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.wfd.04', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'Climate change is considered the most pressing issue of our generation.', distractors: [] }],
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.wfd.05', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'The professor will review the assignment criteria in the next lecture.', distractors: [] }],
      difficulty: 0.35,
    },
  },
  {
    id: 'pte.wfd.06', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'Technological innovations have transformed the way people communicate globally.', distractors: [] }],
      difficulty: 0.4,
    },
  },
  {
    id: 'pte.wfd.07', type: 'gap_fill', level: 'C1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'The pharmaceutical industry invests billions annually in research and development.', distractors: [] }],
      difficulty: 0.5,
    },
  },
  {
    id: 'pte.wfd.08', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'Access to clean water remains a fundamental challenge in many developing nations.', distractors: [] }],
      difficulty: 0.45,
    },
  },
  {
    id: 'pte.wfd.09', type: 'gap_fill', level: 'C1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'The committee recommended substantial changes to the existing regulatory framework.', distractors: [] }],
      difficulty: 0.55,
    },
  },
  {
    id: 'pte.wfd.10', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue', 'strat.pte.time_management'],
    payload: {
      text: 'Write the sentence exactly as you hear it:\n\n_____',
      gaps: [{ position: 0, answer: 'Universities play a crucial role in advancing scientific knowledge and innovation.', distractors: [] }],
      difficulty: 0.4,
    },
  },
]
