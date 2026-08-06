// # PTE Listening boost — adds more listening items covering all PTE listening
// # task types: Summarize Spoken Text, MCQ (single/multiple), Fill in Blanks,
// # Highlight Correct Summary, Select Missing Word, Write from Dictation.
// # All content is original and copyright-free.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_PTE_LISTENING_BOOST: UnifiedSeedItem[] = [
  // # ─── Summarize Spoken Text (3) ────────────────────────────────────
  // # Learner hears a lecture/talk and writes a 50-70 word summary.
  {
    id: 'item.pte.lb.01', type: 'writing_task', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.summarise_spoken', 'strat.pte.time_management'],
    payload: {
      prompt: 'You will hear a short lecture about urban farming. After listening, write a summary in 50-70 words.\n\nTranscript: "Urban farming has seen a remarkable surge in popularity over the past decade. What began as a grassroots movement in post-industrial cities has evolved into a sophisticated industry. Vertical farms using hydroponics can produce up to 350 times more food per square metre than traditional agriculture, while using 95% less water. Cities like Singapore and Tokyo are leading the way, integrating food production into residential buildings. Critics point out the high energy costs of artificial lighting, but proponents argue that reducing food miles and packaging waste more than compensates."',
      format: 'summary',
      minWords: 50,
      maxWords: 70,
      timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Covers key points: growth of urban farming, efficiency gains, leading cities, energy criticism', maxScore: 90 },
        { name: 'Form', description: 'Within word count, single paragraph, complete sentences', maxScore: 90 },
        { name: 'Grammar', description: 'Accurate grammar and sentence structure', maxScore: 90 },
        { name: 'Vocabulary', description: 'Appropriate academic vocabulary', maxScore: 90 },
      ],
      modelAnswer: 'Urban farming has grown from a grassroots movement into a sophisticated industry. Vertical farms using hydroponics produce significantly more food per square metre than conventional agriculture while consuming far less water. Cities such as Singapore and Tokyo are integrating food production into buildings. Despite concerns about the high energy costs of artificial lighting, supporters argue that reduced food miles and packaging waste offset this disadvantage.',
      difficulty: 0.5,
    },
  },
  {
    id: 'item.pte.lb.02', type: 'writing_task', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.summarise_spoken', 'strat.pte.time_management'],
    payload: {
      prompt: 'You will hear a short talk about sleep research. After listening, write a summary in 50-70 words.\n\nTranscript: "Recent neuroscience research has overturned our understanding of why we sleep. Far from being a passive state, sleep is when the brain\'s glymphatic system actively clears metabolic waste, including the beta-amyloid proteins associated with Alzheimer\'s disease. Studies show that consistently sleeping fewer than six hours per night increases the risk of dementia by 30%. The implications for shift workers and healthcare professionals, who frequently work through the night, are particularly concerning."',
      format: 'summary',
      minWords: 50,
      maxWords: 70,
      timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Covers: active brain cleaning during sleep, Alzheimer\'s link, dementia risk, shift worker implications', maxScore: 90 },
        { name: 'Form', description: 'Within word count, complete sentences, coherent paragraph', maxScore: 90 },
        { name: 'Grammar', description: 'Accurate and varied grammar', maxScore: 90 },
        { name: 'Vocabulary', description: 'Appropriate academic and scientific vocabulary', maxScore: 90 },
      ],
      modelAnswer: 'Neuroscience research reveals that sleep is an active process during which the brain\'s glymphatic system removes metabolic waste, including beta-amyloid proteins linked to Alzheimer\'s disease. Studies indicate that sleeping fewer than six hours nightly raises dementia risk by 30 per cent. These findings have significant implications for shift workers and healthcare professionals who regularly work overnight.',
      difficulty: 0.5,
    },
  },
  {
    id: 'item.pte.lb.03', type: 'writing_task', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.summarise_spoken', 'strat.pte.time_management'],
    payload: {
      prompt: 'You will hear a short lecture about microplastics. After listening, write a summary in 50-70 words.\n\nTranscript: "Microplastics — fragments smaller than five millimetres — have been found in the deepest ocean trenches, in Arctic ice, and most alarmingly, in human blood. A 2022 study detected microplastics in 80% of blood samples tested. While the long-term health effects remain unclear, laboratory studies suggest these particles can cross cell membranes and trigger inflammatory responses. The primary sources are synthetic clothing fibres released during washing and the degradation of larger plastic items."',
      format: 'summary',
      minWords: 50,
      maxWords: 70,
      timeMinutes: 10,
      rubric: [
        { name: 'Content', description: 'Covers: ubiquity of microplastics, human blood findings, potential health effects, primary sources', maxScore: 90 },
        { name: 'Form', description: 'Within word count, coherent structure', maxScore: 90 },
        { name: 'Grammar', description: 'Accurate and appropriately complex grammar', maxScore: 90 },
        { name: 'Vocabulary', description: 'Scientific and academic vocabulary used correctly', maxScore: 90 },
      ],
      modelAnswer: 'Microplastics, fragments under five millimetres, have been detected in oceans, Arctic ice, and human blood, with a 2022 study finding them in 80 per cent of blood samples. Although long-term health effects are uncertain, laboratory research suggests these particles can penetrate cell membranes and cause inflammation. The main sources are synthetic clothing fibres from laundry and degradation of larger plastic waste.',
      difficulty: 0.5,
    },
  },

  // # ─── MCQ — Listening Comprehension (8) ─────────────────────────────
  // # Single-answer MCQ based on academic lectures and talks.
  {
    id: 'item.pte.lb.04', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      stem: 'A lecturer says: "The placebo effect is far more powerful than most people realise. In clinical trials for pain medication, placebos can produce measurable changes in brain chemistry — the brain actually releases endorphins in response to a sugar pill. This suggests that belief itself has a physiological mechanism." The lecturer is arguing that:',
      options: [
        { text: 'The placebo effect has a real biological basis, not just a psychological one', misconception: null },
        { text: 'Sugar pills are as effective as real medication', misconception: 'The lecturer says placebos produce some effect, not equal effect' },
        { text: 'Clinical trials are unreliable', misconception: 'The point is about placebos, not trial methodology' },
        { text: 'Pain medication should be replaced with placebos', misconception: 'No such recommendation is made' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.pte.lb.05', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'A speaker says: "The concept of a \'digital divide\' has evolved. It\'s no longer simply about who has internet access and who doesn\'t. Today, the more pressing divide is between those who can critically evaluate online information and those who cannot — between digital literacy and mere digital access." The speaker believes the main issue today is:',
      options: [
        { text: 'The gap in ability to evaluate online information critically', misconception: null },
        { text: 'The cost of internet access', misconception: 'The speaker says the divide has moved beyond access' },
        { text: 'The speed of internet connections', misconception: 'Connection speed is not discussed' },
        { text: 'The number of devices people own', misconception: 'Device ownership is not the divide the speaker identifies' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.pte.lb.06', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'A researcher explains: "Deforestation in the Amazon doesn\'t just affect local ecosystems — it has global consequences. The rainforest acts as a carbon sink, absorbing approximately 2 billion tonnes of CO2 annually. When trees are cut down, that stored carbon is released. Furthermore, the moisture generated by the forest influences rainfall patterns as far away as Argentina and the southern United States." The term "carbon sink" means:',
      options: [
        { text: 'A system that absorbs more carbon dioxide than it releases', misconception: null },
        { text: 'A type of soil found only in the Amazon', misconception: 'Carbon sink is a general environmental term, not a soil type' },
        { text: 'A method of disposing of carbon waste', misconception: 'Confuses natural absorption with industrial waste disposal' },
        { text: 'A measurement unit for greenhouse gases', misconception: 'It is a concept, not a unit of measurement' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.pte.lb.07', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'A professor says: "The Industrial Revolution is often dated from the 1760s, but this is somewhat misleading. The technological innovations we associate with it — the spinning jenny, the steam engine — were the culmination of centuries of incremental progress in metallurgy, engineering, and agricultural productivity. Without the agricultural revolution that preceded it, there simply wouldn\'t have been enough surplus labour to staff the new factories." The professor\'s main point is:',
      options: [
        { text: 'The Industrial Revolution depended on earlier developments, not just 18th-century inventions', misconception: null },
        { text: 'The Industrial Revolution started earlier than the 1760s', misconception: 'The professor says the common date is misleading, not that it started earlier per se' },
        { text: 'Agriculture was more important than industry', misconception: 'The point is about prerequisites, not relative importance' },
        { text: 'The spinning jenny was not an important invention', misconception: 'The professor calls it a culmination, not unimportant' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.pte.lb.08', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'A psychologist explains: "Cognitive biases aren\'t bugs in human thinking — they\'re features. They evolved because they were useful. The confirmation bias, for example, helped our ancestors make quick decisions in dangerous environments. The problem is that these shortcuts, which worked well on the savannah, can lead to systematic errors in modern contexts like financial markets or courtrooms." The psychologist views cognitive biases as:',
      options: [
        { text: 'Evolutionary adaptations that cause problems in modern settings', misconception: null },
        { text: 'Rare conditions affecting only certain individuals', misconception: 'The psychologist presents them as universal human features' },
        { text: 'Deliberate thinking errors people choose to make', misconception: 'Biases are automatic, not deliberate' },
        { text: 'Problems that can be completely eliminated through education', misconception: 'The psychologist describes them as features, not fixable defects' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.pte.lb.09', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'A speaker says: "Remote sensing satellites have revolutionised archaeology. Using infrared imaging, researchers can detect ancient structures buried beneath dense vegetation or metres of sand. In 2011, a team identified 17 previously unknown pyramids in Egypt using satellite data alone, without any excavation." The main advantage of satellite technology for archaeology is:',
      options: [
        { text: 'It can reveal buried structures without physical excavation', misconception: null },
        { text: 'It is cheaper than traditional archaeology', misconception: 'Cost is not discussed as the primary advantage' },
        { text: 'It replaces the need for archaeologists', misconception: 'The technology aids archaeologists, it does not replace them' },
        { text: 'It works only in Egypt', misconception: 'Egypt is one example — the technology applies globally' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.pte.lb.10', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'A lecturer explains: "The tragedy of the commons describes what happens when individuals acting in their own self-interest deplete a shared resource. The classic example is overgrazing: if each farmer adds one more cow to the common pasture, the benefit goes entirely to that farmer while the cost — degradation of the pasture — is shared among all. The result is inevitable: the pasture is destroyed." What causes the resource to be destroyed?',
      options: [
        { text: 'Each individual benefits personally while costs are shared collectively', misconception: null },
        { text: 'A single person deliberately hoards the resource', misconception: 'The tragedy involves many individuals, not one hoarder' },
        { text: 'Natural disasters beyond human control', misconception: 'The destruction is caused by human behaviour, not natural events' },
        { text: 'Government regulation of the pasture', misconception: 'The tragedy occurs in the absence of regulation, not because of it' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.pte.lb.11', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'A speaker says: "The Dunning-Kruger effect shows that people with limited knowledge in a domain tend to overestimate their competence, while genuine experts tend to underestimate theirs. This creates a cruel irony: the people most confident in their opinions are often the least qualified to hold them, while those with the deepest understanding express the most doubt." The "cruel irony" the speaker describes is:',
      options: [
        { text: 'Those who know the least are the most confident, and vice versa', misconception: null },
        { text: 'Experts deliberately pretend to be unsure', misconception: 'Experts genuinely underestimate — they are not pretending' },
        { text: 'Everyone has the same level of confidence', misconception: 'The whole point is that confidence levels are inversely related to knowledge' },
        { text: 'Knowledge makes people arrogant', misconception: 'The opposite — knowledge tends to produce humility according to this effect' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },

  // # ─── Write from Dictation (6) ─────────────────────────────────────
  // # Learner hears a sentence and must type it exactly.
  // # Tests listening precision and spelling.
  {
    id: 'item.pte.lb.12', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion', 'strat.pte.time_management'],
    payload: {
      stem: 'Write from dictation: "The university has recently expanded its range of postgraduate ______."',
      gaps: [{ index: 0, acceptedAnswers: ['programmes', 'programs', 'courses'], hint: 'A noun — academic offerings' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.pte.lb.13', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'Write from dictation: "Students are required to submit their assignments by the end of the ______."',
      gaps: [{ index: 0, acceptedAnswers: ['semester', 'term', 'week'], hint: 'A time period in academic contexts' }],
      difficulty: 0.25,
    },
  },
  {
    id: 'item.pte.lb.14', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'Write from dictation: "The government has allocated additional funding for ______ research."',
      gaps: [{ index: 0, acceptedAnswers: ['scientific', 'medical', 'environmental', 'renewable energy'], hint: 'An adjective describing the type of research' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.pte.lb.15', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'Write from dictation: "The library will be closed for ______ during the first week of January."',
      gaps: [{ index: 0, acceptedAnswers: ['renovations', 'maintenance', 'refurbishment'], hint: 'A noun — building improvement work' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.pte.lb.16', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'Write from dictation: "Climate change is expected to have significant ______ on global food production."',
      gaps: [{ index: 0, acceptedAnswers: ['implications', 'effects', 'impacts', 'consequences'], hint: 'A noun meaning results or effects' }],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.pte.lb.17', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'Write from dictation: "The findings of the study ______ previous assumptions about childhood development."',
      gaps: [{ index: 0, acceptedAnswers: ['challenge', 'contradict', 'question', 'undermine'], hint: 'A verb meaning to dispute or go against' }],
      difficulty: 0.35,
    },
  },

  // # ─── Select Missing Word (4) ──────────────────────────────────────
  // # Learner hears a recording with the final word/phrase replaced by a beep.
  // # Tests ability to predict content from context.
  {
    id: 'item.pte.lb.18', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.predict_content', 'strat.pte.time_management'],
    payload: {
      stem: 'You hear: "The experiment was designed to test whether exposure to classical music could improve cognitive performance. The results were surprising — participants who listened to Mozart for 15 minutes before taking a spatial reasoning test scored significantly higher than the control group. However, the effect was temporary, lasting only about..." [BEEP]. The missing word is most likely:',
      options: [
        { text: 'ten minutes', misconception: null },
        { text: 'forever', misconception: 'Contradicts "the effect was temporary"' },
        { text: 'the next day', misconception: 'The context implies a much shorter duration' },
        { text: 'a year', misconception: 'Far too long for a temporary effect described in minutes' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.pte.lb.19', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.predict_content'],
    payload: {
      stem: 'You hear: "Solar panel efficiency has improved dramatically over the past two decades. Early models converted only about 6% of sunlight into electricity. Today, the best commercially available panels achieve over 22%, and laboratory prototypes have exceeded..." [BEEP]. The missing word is most likely:',
      options: [
        { text: '40%', misconception: null },
        { text: '100%', misconception: 'Physically impossible for current solar technology' },
        { text: '5%', misconception: 'Lower than the historical baseline mentioned' },
        { text: '22%', misconception: 'Same as commercial panels — lab prototypes would exceed this' },
      ],
      correctIndex: 0,
      difficulty: 0.4,
    },
  },
  {
    id: 'item.pte.lb.20', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.predict_content'],
    payload: {
      stem: 'You hear: "The human brain contains approximately 86 billion neurons, each connected to thousands of others. The total number of connections — or synapses — in the brain is estimated to be in the order of..." [BEEP]. The missing answer is most likely:',
      options: [
        { text: 'one hundred trillion', misconception: null },
        { text: 'one thousand', misconception: 'Far too low given 86 billion neurons with thousands of connections each' },
        { text: '86 billion', misconception: 'That is the number of neurons, not the larger number of connections' },
        { text: 'one million', misconception: 'Too low — each neuron has thousands of connections' },
      ],
      correctIndex: 0,
      difficulty: 0.45,
    },
  },
  {
    id: 'item.pte.lb.21', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b1.predict_content'],
    payload: {
      stem: 'You hear: "Migration patterns among birds are remarkably precise. The Arctic tern, for example, makes an annual round trip of approximately 70,000 kilometres, travelling from the Arctic to the Antarctic and back. This extraordinary journey means that, over a 30-year lifespan, a single bird travels a distance equivalent to three round trips to the..." [BEEP]. The missing word is most likely:',
      options: [
        { text: 'moon', misconception: null },
        { text: 'equator', misconception: 'The equator is only 40,000 km — not enough for the distance described' },
        { text: 'nearest country', misconception: 'Far too short for the cumulative distance described' },
        { text: 'sun', misconception: 'The sun is 150 million km away — far more than 3 round trips could cover' },
      ],
      correctIndex: 0,
      difficulty: 0.45,
    },
  },
]
