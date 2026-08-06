// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS BAND 8–9 — Advanced Items for High-Scoring Candidates
// # ═══════════════════════════════════════════════════════════════════════════
// # These items target C1–C2 level candidates aiming for Band 8–9.
// # They cover: advanced grammar (inversions, cleft sentences, participle
// # clauses), sophisticated vocabulary (academic collocations, less common
// # idioms), Band 9 model answers, advanced reading inference, complex
// # listening comprehension, pronunciation/connected speech, and
// # paraphrase recognition. Every model answer here is written to Band 9
// # standard: zero errors, rare lexis, effortless structural complexity.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_BAND9: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # ADVANCED GRAMMAR — Inversion, Cleft, Participle Clauses
  // # These structures separate Band 7 from Band 9 in Writing/Speaking
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.gram.01', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      stem: 'Rewrite using inversion with "Seldom":\n\nOriginal: "People rarely consider the long-term consequences of their consumer choices."',
      original: 'People rarely consider the long-term consequences of their consumer choices.',
      transformType: 'inversion',
      acceptedAnswers: ['Seldom do people consider the long-term consequences of their consumer choices.'],
      explanation: 'Inversion after negative/restrictive adverbs is a C1 structure that instantly elevates writing to Band 8+. Pattern: Negative adverb + auxiliary + subject + main verb. "Seldom do people consider..." / "Never has there been..." / "Not only did the study reveal... but it also..." Use these sparingly — one or two per essay is powerful. More than that becomes over-rehearsed.',
      difficulty: 0.7,
    },
  },
  {
    id: 'ielts.b9.gram.02', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      stem: 'Rewrite using inversion with "Not only":\n\nOriginal: "The policy reduced carbon emissions and it also created thousands of new jobs."',
      original: 'The policy reduced carbon emissions and it also created thousands of new jobs.',
      transformType: 'inversion',
      acceptedAnswers: ['Not only did the policy reduce carbon emissions, but it also created thousands of new jobs.'],
      explanation: '"Not only + inversion... but also..." is one of the most useful Band 9 structures. It adds emphasis and shows grammatical sophistication in a natural way. Perfect for Task 2 body paragraphs when presenting multiple effects of a policy or trend.',
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.b9.gram.03', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.inversion'],
    payload: {
      stem: 'Rewrite using inversion with "Only by":\n\nOriginal: "Governments can address this crisis if they invest heavily in renewable infrastructure."',
      original: 'Governments can address this crisis if they invest heavily in renewable infrastructure.',
      transformType: 'inversion',
      acceptedAnswers: ['Only by investing heavily in renewable infrastructure can governments address this crisis.'],
      explanation: '"Only by + gerund + inversion" is a powerful concluding structure in Task 2. It sounds authoritative and decisive. Similar patterns: "Only when governments invest..." / "Only through sustained effort can..." This structure appears in virtually every published Band 9 essay.',
      difficulty: 0.7,
    },
  },
  {
    id: 'ielts.b9.gram.04', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      stem: 'Rewrite as a cleft sentence using "It is... that":\n\nOriginal: "Economic inequality drives most urban crime."',
      original: 'Economic inequality drives most urban crime.',
      transformType: 'cleft',
      acceptedAnswers: ['It is economic inequality that drives most urban crime.'],
      explanation: 'Cleft sentences (It is/was X that...) create emphasis by foregrounding one element. Band 9 writers use these to spotlight their main argument: "It is precisely this lack of regulation that has led to..." / "It was not until the 1990s that researchers identified..." Use one per essay for maximum impact.',
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.b9.gram.05', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.c1.cleft_sentences'],
    payload: {
      stem: 'Rewrite as a wh-cleft sentence using "What... is":\n\nOriginal: "Many developing countries need sustained investment in education."',
      original: 'Many developing countries need sustained investment in education.',
      transformType: 'cleft',
      acceptedAnswers: ['What many developing countries need is sustained investment in education.'],
      explanation: 'Wh-cleft sentences (What X needs/does is...) are ideal for making a strong point in Task 2. They sound natural in both writing and speaking: "What the evidence clearly shows is..." / "What distinguishes successful economies from struggling ones is..." In Speaking Part 3, they demonstrate C1 grammar effortlessly.',
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.b9.gram.06', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.b2.passive', 'gram.c1.cleft_sentences'],
    payload: {
      stem: 'Rewrite using a participle clause to combine the sentences:\n\nOriginal: "The government introduced strict regulations. It hoped to reduce pollution levels."',
      original: 'The government introduced strict regulations. It hoped to reduce pollution levels.',
      transformType: 'participle_clause',
      acceptedAnswers: ['Hoping to reduce pollution levels, the government introduced strict regulations.', 'The government introduced strict regulations, hoping to reduce pollution levels.'],
      explanation: 'Participle clauses (present: "-ing", past: "-ed") compress two sentences into one sophisticated structure. Band 9 candidates use these naturally: "Having analysed the data, researchers concluded..." / "Faced with rising costs, many companies resorted to..." / "Given the current trajectory, it is unlikely that..." These demonstrate grammatical range without sounding forced.',
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.b9.gram.07', type: 'sentence_transform', level: 'C1', skill: 'writing',
    nodeIds: ['gram.b2.conditionals'],
    payload: {
      stem: 'Rewrite using a mixed conditional:\n\nOriginal: "The government didn\'t invest in renewable energy in the past. The country still depends heavily on fossil fuels now."',
      original: 'The government didn\'t invest in renewable energy in the past. The country still depends heavily on fossil fuels now.',
      transformType: 'mixed_conditional',
      acceptedAnswers: ['Had the government invested in renewable energy, the country would not still depend heavily on fossil fuels.', 'If the government had invested in renewable energy, the country would not still depend so heavily on fossil fuels now.'],
      explanation: 'Mixed conditionals combine third conditional (past unreal: "had invested") with second conditional (present unreal: "would not depend"). This structure shows examiners you can handle complex temporal relationships. Band 9 candidates use these to discuss hypothetical policy outcomes: "Had early intervention been implemented, the crisis would not be as severe today."',
      difficulty: 0.75,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # ACADEMIC COLLOCATIONS — Band 9 Vocabulary
  // # These are the word combinations that separate Band 7 from Band 9
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.coll.01', type: 'gap_fill', level: 'C1', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task2_structure'],
    payload: {
      stem: 'Complete these sentences with the correct academic collocation. Band 9 candidates use these instead of simple verbs.\n\n1. Climate change ______ a significant threat to coastal communities. (simple: "is a threat")\n2. The study ______ light on the relationship between diet and mental health. (simple: "showed")\n3. These findings ______ the need for further research into the long-term effects. (simple: "show")\n4. The rapid expansion of cities has ______ enormous pressure on infrastructure. (simple: "caused pressure")',
      gaps: [
        { correctAnswer: 'poses', acceptedAlternatives: ['presents'], hint: 'verb + threat/risk/challenge' },
        { correctAnswer: 'sheds', acceptedAlternatives: ['shed', 'threw', 'cast'], hint: 'verb + light on' },
        { correctAnswer: 'underscore', acceptedAlternatives: ['underline', 'highlight', 'emphasise'], hint: 'verb meaning emphasise/highlight' },
        { correctAnswer: 'exerted', acceptedAlternatives: ['placed', 'put'], hint: 'verb + pressure/influence' },
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.b9.coll.02', type: 'gap_fill', level: 'C1', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task2_structure'],
    payload: {
      stem: 'Replace the simple vocabulary with Band 9 academic alternatives:\n\n1. The results clearly ______ that early intervention is more effective than later treatment. (simple: "show")\n2. This evidence ______ the argument that education is the most powerful tool for social mobility. (simple: "supports")\n3. Several factors ______ to the decline in biodiversity over the past century. (simple: "caused")\n4. The policy ______ widespread criticism from environmental groups. (simple: "got criticism")',
      gaps: [
        { correctAnswer: 'demonstrate', acceptedAlternatives: ['indicate', 'reveal', 'illustrate'], hint: 'formal synonym for "show" (used with evidence/results)' },
        { correctAnswer: 'bolsters', acceptedAlternatives: ['reinforces', 'substantiates', 'corroborates', 'underpins'], hint: 'verb meaning "strengthens/supports"' },
        { correctAnswer: 'contributed', acceptedAlternatives: ['led', 'gave rise'], hint: 'verb + to (cause)' },
        { correctAnswer: 'drew', acceptedAlternatives: ['attracted', 'elicited', 'provoked'], hint: 'verb + criticism/attention' },
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.b9.coll.03', type: 'gap_fill', level: 'C1', skill: 'writing',
    nodeIds: ['lex.b2.abstract_concepts', 'strat.ielts.task1_structure'],
    payload: {
      stem: 'Band 9 Task 1 trend vocabulary. Complete with the most precise word:\n\n1. Sales experienced a ______ increase between 2015 and 2018, rising from 200 to 800. (= very large and quick)\n2. After 2020, growth ______ off, remaining at approximately 850 for the next two years. (= became flat)\n3. The figure for coal consumption ______ steadily throughout the period. (= went down continuously)\n4. There was a ______ drop in tourism in 2020, before a partial recovery the following year. (= sudden and steep)',
      gaps: [
        { correctAnswer: 'dramatic', acceptedAlternatives: ['exponential', 'meteoric', 'substantial', 'fourfold'], hint: 'adjective for large, rapid increase' },
        { correctAnswer: 'levelled', acceptedAlternatives: ['plateaued', 'flattened', 'stabilised', 'leveled'], hint: 'verb meaning "became stable/flat"' },
        { correctAnswer: 'declined', acceptedAlternatives: ['fell', 'decreased', 'diminished', 'dwindled'], hint: 'formal verb for gradual decrease' },
        { correctAnswer: 'precipitous', acceptedAlternatives: ['sharp', 'steep', 'dramatic', 'abrupt', 'sudden'], hint: 'adjective for a very sudden, steep fall' },
      ],
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # BAND 9 WRITING — Full Model Answers at Examiner Level
  // # These demonstrate what examiners consider "exceptional"
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.wt2.01', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure', 'gram.c1.inversion'],
    payload: {
      prompt: 'Some people believe that technological progress is always beneficial, while others argue that technology can have harmful effects on society. Discuss both views and give your own opinion. Write at least 250 words.',
      format: 'ielts_task2_discuss_both_views',
      minWords: 250, maxWords: 380, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Both views fully developed with clear, well-supported personal position', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Sophisticated paragraphing with seamless transitions and referencing', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Wide range of rare, precise vocabulary used with full flexibility', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Full range of structures used naturally with consistent accuracy', maxScore: 9 },
      ],
      modelAnswer: 'The relentless march of technological innovation has transformed virtually every aspect of modern life. While some regard this transformation as unequivocally positive, others contend that the societal costs of unbridled technological progress are routinely underestimated.\n\nThose who champion technology point to its capacity to solve problems of unprecedented scale. Medical advances — from genome sequencing to AI-assisted diagnostics — have extended life expectancy and improved quality of life in ways that would have seemed miraculous a generation ago. Similarly, digital communication technologies have democratised access to information, enabling individuals in the most remote communities to participate in the global knowledge economy. It is difficult to overstate the transformative potential of these developments.\n\nHowever, this narrative of progress obscures significant harms. The proliferation of social media, for instance, has been convincingly linked to rising rates of anxiety, depression, and social isolation, particularly among adolescents. Furthermore, automation and artificial intelligence, while boosting productivity, threaten to render entire categories of employment obsolete, exacerbating economic inequality. Not only does technology displace workers, but it also concentrates wealth among a diminishing elite who control the platforms and algorithms that increasingly govern daily life.\n\nWhat these contrasting perspectives reveal is that technology is inherently neither beneficial nor harmful — its impact depends entirely on how it is deployed, regulated, and distributed. Had governments implemented robust regulatory frameworks earlier, many of the social harms associated with digital technology could have been mitigated.\n\nIn conclusion, while technological progress yields extraordinary benefits, only through deliberate policy intervention can societies ensure that these benefits are shared equitably and that the most vulnerable are protected from its adverse consequences.',
      difficulty: 0.8,
    },
  },
  {
    id: 'ielts.b9.wt2.02', type: 'writing_task', level: 'C1', skill: 'writing',
    nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure', 'gram.c1.cleft_sentences'],
    payload: {
      prompt: 'In many countries, the gap between the rich and the poor is increasing. What problems does this cause? What solutions can you suggest? Write at least 250 words.',
      format: 'ielts_task2_causes_solutions',
      minWords: 250, maxWords: 380, timeMinutes: 40,
      rubric: [
        { name: 'Task Response', description: 'Problems and solutions fully developed with specific examples', maxScore: 9 },
        { name: 'Coherence & Cohesion', description: 'Seamless problem-solution structure with sophisticated referencing', maxScore: 9 },
        { name: 'Lexical Resource', description: 'Precise socioeconomic vocabulary with natural collocations', maxScore: 9 },
        { name: 'Grammatical Range & Accuracy', description: 'Complex structures including clefts, inversions, and conditionals', maxScore: 9 },
      ],
      modelAnswer: 'The widening chasm between affluent and impoverished citizens represents one of the most pressing challenges facing contemporary societies. This essay will examine the multifaceted problems this disparity creates and propose measures to address them.\n\nEconomic inequality gives rise to a constellation of interconnected social problems. Perhaps the most damaging is the erosion of social cohesion: when citizens perceive that the economic system is fundamentally unjust, trust in institutions diminishes and social fragmentation accelerates. Research by epidemiologists Wilkinson and Pickett has demonstrated that more unequal societies suffer higher rates of mental illness, crime, and reduced life expectancy — not only among the poor but across all income levels. Furthermore, extreme wealth concentration undermines democratic governance, as affluent individuals and corporations exert disproportionate influence over political processes through lobbying and campaign financing.\n\nIt is education that offers perhaps the most sustainable long-term solution to this problem. Governments should ensure genuinely equal access to high-quality education from early childhood through to university, including subsidised childcare and means-tested tuition support. Such investment yields returns far exceeding its cost, as educated populations generate higher tax revenues and require less social support.\n\nComplementing this, progressive taxation and the closure of corporate tax loopholes would ensure that wealth generated by economic growth is distributed more equitably. Countries such as Denmark and Sweden demonstrate that high levels of redistribution are compatible with robust economic performance and high levels of entrepreneurship.\n\nIn conclusion, while income inequality poses severe threats to social stability and democratic integrity, targeted investment in education combined with fairer taxation can create a more just and cohesive society without stifling economic dynamism.',
      difficulty: 0.8,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # BAND 9 READING — Advanced Inference & Evaluation
  // # Passages require reading between the lines, not just facts
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.rd.01', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      title: 'The Paradox of Choice',
      passage: 'In his influential 2004 book, psychologist Barry Schwartz argued that the explosion of consumer choice in modern societies, far from liberating individuals, has become a source of anxiety, paralysis, and dissatisfaction. Drawing on research from behavioural economics and psychology, Schwartz distinguished between "maximisers" — those who exhaustively evaluate every option to find the objectively best choice — and "satisficers" — those who select the first option that meets a predetermined threshold of acceptability.\n\nSchwartz\'s research revealed a counterintuitive finding: maximisers, despite typically making objectively better choices, reported significantly lower satisfaction than satisficers. The explanation lies in what economists call "opportunity cost": the more options available, the more acutely one feels the loss of the rejected alternatives. A maximiser choosing from thirty varieties of jam not only spends more time and cognitive energy on the decision but is subsequently haunted by the possibility that one of the twenty-nine rejected options might have been superior.\n\nCritics of Schwartz\'s thesis have raised several objections. Psychologist Benjamin Scheibehenne conducted a meta-analysis of fifty studies on choice overload and found that the average effect size was virtually zero — suggesting that excessive choice does not consistently produce negative outcomes. Scheibehenne argued that the "paradox of choice" may be an artefact of specific experimental conditions rather than a universal psychological phenomenon.\n\nOthers have noted that Schwartz\'s framework implicitly reflects the concerns of affluent Western consumers. For the billions of people worldwide who lack access to adequate healthcare, education, or nutrition, the problem is not too much choice but too little. The paradox of choice, these critics suggest, is ultimately a luxury problem — real, perhaps, but trivial compared to the constraints of genuine scarcity.\n\nNevertheless, Schwartz\'s core insight retains value in an era of information overload. The proliferation of streaming services, dating apps, and online shopping platforms has only intensified the cognitive burden of decision-making. Whether or not "choice overload" is a robust psychological phenomenon, the subjective experience of overwhelm is widely reported — and the coping strategies Schwartz recommends, such as setting clear criteria before beginning a search and accepting "good enough" rather than pursuing "the best," remain practical advice for navigating an increasingly complex consumer landscape.',
      source: 'Original content',
      questions: [
        { stem: 'The author\'s primary purpose in this passage is to:', options: ['Prove that choice overload is real', 'Present Schwartz\'s argument alongside its criticisms and assess its relevance', 'Argue that consumer choice should be restricted', 'Compare maximisers and satisficers to determine which strategy is better'], correctIndex: 1 },
        { stem: 'The phrase "haunted by the possibility" in paragraph 2 suggests that maximisers:', options: ['Are afraid of making decisions', 'Experience persistent doubt about whether they chose correctly', 'Believe other people made better choices', 'Regret spending money on consumer goods'], correctIndex: 1 },
        { stem: 'Scheibehenne\'s meta-analysis challenges Schwartz by suggesting that:', options: ['Choice overload only affects wealthy people', 'The effect of too much choice is not consistently observed across studies', 'Maximisers do not actually make better choices', 'Consumer choice has no effect on behaviour at all'], correctIndex: 1 },
        { stem: 'The criticism in paragraph 4 implies that Schwartz\'s theory:', options: ['Is factually incorrect', 'May be culturally limited in its applicability', 'Should be applied to healthcare policy', 'Ignores the benefits of consumer choice entirely'], correctIndex: 1 },
        { stem: 'In the final paragraph, the author suggests that Schwartz\'s ideas are:', options: ['Completely discredited by the evidence', 'Still practically useful despite academic debate about their universality', 'Only relevant to online shopping', 'More important now than when they were first published'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Schwartz argues that having fewer choices always leads to greater happiness.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
      ],
      difficulty: 0.8,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # BAND 9 LISTENING — Academic Lecture with Complex Arguments
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.ls.01', type: 'mcq', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on the Sapir-Whorf Hypothesis\n\nTranscript: "The idea that language shapes thought — known as the Sapir-Whorf hypothesis — exists in two versions. The strong version, or linguistic determinism, claims that language determines thought: speakers of different languages literally perceive different realities. This extreme position has largely been abandoned by modern linguists. The weak version, linguistic relativity, makes a more modest claim: that language influences thought and perception without fully determining them. Recent experimental evidence has provided striking support for this weaker claim. Research by Lera Boroditsky found that speakers of Mandarin, who use vertical metaphors for time — \'shàng\' meaning up for earlier events and \'xià\' meaning down for later events — were faster at verifying temporal statements when primed with vertical spatial cues, whereas English speakers responded faster with horizontal cues. This suggests that habitual linguistic patterns create cognitive biases, even if they do not create impenetrable conceptual barriers."\n\nAccording to the lecture, the key difference between the strong and weak versions of the Sapir-Whorf hypothesis is:',
      options: [
        { text: 'The strong version was proposed by Sapir; the weak version by Whorf', misconception: 'The versions differ in their claims about language\'s power, not their authorship' },
        { text: 'The strong version claims language determines thought; the weak version claims language influences thought', misconception: null },
        { text: 'The strong version applies to grammar; the weak version applies to vocabulary', misconception: 'Both versions apply to language broadly, not to specific linguistic features' },
        { text: 'The strong version is supported by evidence; the weak version is not', misconception: 'The opposite: the strong version has been largely abandoned, while the weak version has experimental support' },
      ],
      correctIndex: 1,
      difficulty: 0.7,
    },
  },
  {
    id: 'ielts.b9.ls.02', type: 'gap_fill', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on Behavioural Nudges (Note Completion)\n\nTranscript: "The concept of a \'nudge\' in behavioural economics refers to any feature of the choice ______ that predictably alters behaviour without forbidding any options or significantly changing economic incentives. The classic example is organ donation. Countries that use an ______ system — where citizens are automatically registered as donors unless they actively choose not to be — have donation rates above 90%, compared to rates of just 15 to 20% in countries that require people to actively register. The key insight is that most people accept the ______ option, regardless of what it is. This has profound implications for policy design: by carefully selecting defaults, governments can dramatically influence outcomes in areas ranging from pension savings to energy consumption, while preserving individual ______."',
      gaps: [
        { correctAnswer: 'architecture', acceptedAlternatives: ['environment'], hint: 'how choices are structured/presented' },
        { correctAnswer: 'opt-out', acceptedAlternatives: ['opt out'], hint: 'system where you are included unless you choose not to be' },
        { correctAnswer: 'default', acceptedAlternatives: [], hint: 'the pre-selected option' },
        { correctAnswer: 'freedom', acceptedAlternatives: ['choice', 'autonomy', 'liberty'], hint: 'people can still choose differently' },
      ],
      difficulty: 0.65,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PARAPHRASE RECOGNITION — Critical for Band 9 Reading/Listening
  // # Matching a statement to its paraphrase (how IELTS tests comprehension)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.para.01', type: 'matching', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      stem: 'IELTS Paraphrase Recognition — Match each original sentence to its correct paraphrase. (Band 9 candidates must recognise sophisticated rewording.)',
      pairs: [
        { left: '"The government failed to anticipate the scale of the crisis."', right: '"The severity of the situation exceeded official expectations."' },
        { left: '"Unemployment disproportionately affects young people."', right: '"The burden of joblessness falls more heavily on the younger generation."' },
        { left: '"The benefits of this policy are not immediately apparent."', right: '"The advantages of this measure may take time to materialise."' },
        { left: '"There is a growing consensus among scientists."', right: '"Researchers are increasingly in agreement."' },
        { left: '"The study yielded unexpected results."', right: '"The findings of the research were contrary to predictions."' },
      ],
      difficulty: 0.7,
    },
  },
  {
    id: 'ielts.b9.para.02', type: 'matching', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      stem: 'IELTS Paraphrase Recognition — Match the informal expression to its academic equivalent. (Band 9 writing requires formal register.)',
      pairs: [
        { left: '"get worse"', right: '"deteriorate" / "exacerbate"' },
        { left: '"deal with"', right: '"address" / "tackle" / "mitigate"' },
        { left: '"a lot of"', right: '"a substantial number of" / "a considerable proportion of"' },
        { left: '"think about"', right: '"consider" / "contemplate" / "reflect on"' },
        { left: '"because of"', right: '"owing to" / "as a consequence of" / "attributable to"' },
        { left: '"help"', right: '"facilitate" / "foster" / "contribute to"' },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # COHESION & COHERENCE — Beyond "However" and "Moreover"
  // # Band 9 referencing, substitution, and linking
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.coh.01', type: 'gap_fill', level: 'C1', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure', 'gram.c1.cleft_sentences'],
    payload: {
      stem: 'Band 9 Cohesive Devices — Complete with the sophisticated linking expression. Avoid overused connectors like "However" and "Moreover".\n\n1. The economy grew by 3.5% in the first quarter. ______, this growth was unevenly distributed across regions. (= despite this positive figure)\n2. Several studies have linked social media to anxiety. ______, the direction of causation remains unclear. (= despite this)\n3. The policy was intended to reduce inequality. ______, it inadvertently widened the gap between rich and poor. (= opposite of intention)\n4. Education improves individual life chances. ______, it generates broader economic benefits through a more skilled workforce. (= in addition to this)',
      gaps: [
        { correctAnswer: 'That said', acceptedAlternatives: ['Notwithstanding this', 'Be that as it may', 'Admittedly'], hint: 'acknowledging the point but adding a qualification' },
        { correctAnswer: 'Nevertheless', acceptedAlternatives: ['Nonetheless', 'Even so', 'That notwithstanding'], hint: 'conceding a point while maintaining your argument' },
        { correctAnswer: 'Paradoxically', acceptedAlternatives: ['Ironically', 'In practice, however,', 'Counterintuitively'], hint: 'introducing an unexpected/opposite result' },
        { correctAnswer: 'Beyond this', acceptedAlternatives: ['Furthermore', 'What is more', 'By extension', 'In addition to this'], hint: 'adding a second, broader point' },
      ],
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.b9.coh.02', type: 'gap_fill', level: 'C1', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      stem: 'Band 9 Reference and Substitution — Complete with the correct referencing word to avoid repetition.\n\n1. The government invested heavily in solar energy. ______ decision was driven by both environmental and economic concerns. (= this specific decision)\n2. Critics argue that standardised testing narrows the curriculum. Proponents of ______ tests counter that they ensure accountability. (= the same tests being criticised)\n3. Japan\'s ageing population creates fiscal challenges. Other East Asian nations face ______ demographic pressures. (= the same kind of)\n4. The study examined 500 participants. Of ______, 60% reported improved wellbeing after the intervention. (= referring to the participants)',
      gaps: [
        { correctAnswer: 'This', acceptedAlternatives: ['The'], hint: 'demonstrative reference to the previous sentence' },
        { correctAnswer: 'such', acceptedAlternatives: ['these'], hint: 'referring to a category already mentioned' },
        { correctAnswer: 'similar', acceptedAlternatives: ['comparable', 'analogous'], hint: 'adjective meaning "the same kind of"' },
        { correctAnswer: 'these', acceptedAlternatives: ['those', 'them'], hint: 'pronoun referring to participants' },
      ],
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # BAND 9 SPEAKING — Advanced Fluency & Sophistication
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.sp3.01', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend', 'gram.c1.inversion'],
    payload: {
      prompt: 'We\'ve been talking about technology. Let\'s discuss a more philosophical question. To what extent should there be limits on scientific research?',
      format: 'ielts_part3',
      followUpQuestions: ['Should scientists be held responsible for how their discoveries are used?', 'Is there any area of research that should be completely banned?', 'How should society balance scientific progress with ethical concerns?', 'Do you think ordinary people should have a say in what research is funded?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Sophisticated hedging: "One could argue that...", "It is perhaps naive to suggest..."', 'Ethical vocabulary: "moral imperative", "ethical oversight", "dual-use research", "informed consent"', 'Inversion in speech: "Rarely has a scientific advance been without controversy"', 'Concession: "While I appreciate the libertarian position, I would contend that..."'],
      modelAnswerNotes: 'Band 9: This question demands philosophical depth. Distinguish between "can we?" and "should we?" Discuss specific examples (genetic engineering, nuclear research, AI). Use conditional and subjunctive structures naturally: "Were there no oversight, the consequences could be..." Show you can sustain an argument across 60+ seconds without repetition.',
      difficulty: 0.8,
    },
  },
  {
    id: 'ielts.b9.sp3.02', type: 'speaking_prompt', level: 'C1', skill: 'speaking',
    nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
    payload: {
      prompt: 'We\'ve been talking about media. Let\'s discuss truth and information. In an era of "fake news," how can societies distinguish between reliable and unreliable information?',
      format: 'ielts_part3',
      followUpQuestions: ['Should social media companies be responsible for the accuracy of content on their platforms?', 'Is objective journalism possible, or does all reporting contain bias?', 'How has the concept of "truth" changed in the digital age?', 'Should media literacy be a core subject in schools?'],
      prepTimeSeconds: 0, speakTimeSeconds: 180,
      targetLanguage: ['Media vocabulary: "echo chamber", "confirmation bias", "editorial integrity", "accountability"', 'Complex structures: "What distinguishes credible journalism from propaganda is..."', 'Nuanced opinion: "This is not a straightforward issue, as it intersects with questions of..."', 'Abstract: "The very notion of objective truth has been called into question by..."'],
      modelAnswerNotes: 'Band 9: Go beyond "people should check their sources." Discuss structural problems (algorithm-driven feeds, commercial pressures on journalism, declining trust in institutions). Use sophisticated discourse markers: "This raises a more fundamental question about..." / "The implications of this extend beyond..." Show genuine intellectual engagement.',
      difficulty: 0.8,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # CONNECTED SPEECH & PRONUNCIATION — Band 9 Speaking
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.pron.01', type: 'mcq', level: 'C1', skill: 'speaking',
    nodeIds: ['phono.b1.connected_speech'],
    payload: {
      stem: 'In natural connected speech, the phrase "next year" is typically pronounced:',
      options: [
        { text: '/nekst jɪər/ — with a clear /t/ at the end of "next"', misconception: 'This would sound unnatural and over-articulated in fluent speech' },
        { text: '/neks jɪər/ — with the /t/ elided (dropped) before the /j/ of "year"', misconception: null },
        { text: '/nekstyɪər/ — as one word with no pause', misconception: 'The sounds merge but the /t/ is specifically dropped, not merged' },
        { text: '/nekʃ jɪər/ — with the /t/ becoming /ʃ/', misconception: 'This assimilation doesn\'t occur in this context' },
      ],
      correctIndex: 1,
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.b9.pron.02', type: 'mcq', level: 'C1', skill: 'speaking',
    nodeIds: ['phono.b1.connected_speech'],
    payload: {
      stem: 'Which feature of connected speech is demonstrated in the phrase "black coffee" often sounding like "blac coffee" (/blæk kɒfi/ → /blæʔ kɒfi/)?',
      options: [
        { text: 'Linking — sounds are connected between words', misconception: 'Linking adds sounds; here a sound is being replaced' },
        { text: 'Elision — a sound is completely dropped', misconception: 'The /k/ is not dropped — it is replaced by a glottal stop' },
        { text: 'Glottalisation — the /k/ is replaced by a glottal stop /ʔ/ before another consonant', misconception: null },
        { text: 'Assimilation — the /k/ changes to match the following sound', misconception: 'Assimilation changes the place/manner of articulation; glottalisation replaces with a glottal stop' },
      ],
      correctIndex: 2,
      difficulty: 0.65,
    },
  },
  {
    id: 'ielts.b9.pron.03', type: 'mcq', level: 'C1', skill: 'speaking',
    nodeIds: ['phono.a2.sentence_stress'],
    payload: {
      stem: 'In the sentence "I didn\'t say HE stole the money," the emphasis on "HE" implies:',
      options: [
        { text: 'Nobody stole the money', misconception: 'Stressing "HE" implies someone else stole it, not that no one did' },
        { text: 'Someone else stole the money — not "he"', misconception: null },
        { text: 'The money was not stolen at all', misconception: 'This meaning would require stress on "stole" or "didn\'t"' },
        { text: 'He stole something else, not money', misconception: 'This meaning would require stress on "money"' },
      ],
      correctIndex: 1,
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # ERROR CORRECTION — Subtle Band 7→9 Grammar Upgrades
  // # These are errors that Band 7 candidates make but Band 9 don't
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.ec.01', type: 'error_correction', level: 'C1', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure', 'gram.c1.cleft_sentences'],
    payload: {
      sentence: 'The amount of people who are affected by this problem is increasing every year.',
      errorPart: 'amount of people',
      correction: 'number of people',
      explanation: '"Amount" is for uncountable nouns (money, time, effort). "Number" is for countable nouns (people, cars, countries). This error alone can prevent a Band 9. Memorise: "a large/growing/significant number of + countable noun" vs "a large/growing/significant amount of + uncountable noun".',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.b9.ec.02', type: 'error_correction', level: 'C1', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      sentence: 'Education is one of the most important thing in life.',
      errorPart: 'one of the most important thing',
      correction: 'one of the most important things',
      explanation: '"One of the + superlative + plural noun" — the noun MUST be plural. "One of the biggest problems" / "One of the most significant changes." This is a high-frequency error that Band 7 candidates make under exam pressure. Band 9 candidates never make this mistake.',
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.b9.ec.03', type: 'error_correction', level: 'C1', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      sentence: 'Although the government has invested heavily in healthcare, but the results have been disappointing.',
      errorPart: 'Although... but',
      correction: 'Although the government has invested heavily in healthcare, the results have been disappointing.',
      explanation: '"Although" and "but" serve the same function — they introduce contrast. Using both is a grammatical error. Choose one: "Although X, Y" OR "X, but Y." Never "Although X, but Y." This error is particularly common among candidates whose first language uses double-marking for contrast.',
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.b9.ec.04', type: 'error_correction', level: 'C1', skill: 'writing',
    nodeIds: ['strat.ielts.task1_structure'],
    payload: {
      sentence: 'According to the chart, it can be seen that the unemployment rate decreased gradually.',
      errorPart: 'According to the chart, it can be seen that',
      correction: 'The chart shows that',
      explanation: '"According to the chart, it can be seen that..." is a triple redundancy. "According to" and "it can be seen that" and "the chart shows" all mean the same thing. Band 9 candidates write concisely: "The chart shows that..." or simply describe the data directly. Wordiness is penalised under both Coherence and Lexical Resource.',
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # BAND 9 STRATEGY — Advanced Exam Technique
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.b9.strat.01', type: 'mcq', level: 'C1', skill: 'writing',
    nodeIds: ['strat.ielts.task2_structure'],
    payload: {
      stem: 'What separates a Band 7 Task 2 essay from a Band 9 essay? The most critical difference is:',
      options: [
        { text: 'Band 9 essays are longer (400+ words)', misconception: 'Length alone does not determine band score — a 280-word essay can score Band 9' },
        { text: 'Band 9 essays use more complex vocabulary in every sentence', misconception: 'Overusing complex vocabulary makes writing less natural — Band 9 candidates mix simple and complex language' },
        { text: 'Band 9 essays demonstrate full flexibility: effortless range of structures, precise vocabulary, and zero noticeable errors', misconception: null },
        { text: 'Band 9 essays include more examples and case studies', misconception: 'Examples help but are not the defining feature — Band 7 essays can also have good examples' },
      ],
      correctIndex: 2,
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.b9.strat.02', type: 'mcq', level: 'C1', skill: 'speaking',
    nodeIds: ['strat.ielts.part3_extend'],
    payload: {
      stem: 'A candidate who consistently uses phrases like "I think," "in my opinion," and "I believe" in Speaking Part 3 is likely to score Band 6-7 rather than Band 9. Why?',
      options: [
        { text: 'These phrases are grammatically incorrect', misconception: 'They are correct — the issue is lack of variety, not accuracy' },
        { text: 'Band 9 candidates never express personal opinions', misconception: 'They express opinions — but with a wider range of language' },
        { text: 'Repeating the same opinion phrases shows limited lexical range — Band 9 uses varied expressions like "from my perspective," "I\'m inclined to think," "it seems to me that"', misconception: null },
        { text: 'The examiner wants facts, not opinions', misconception: 'Part 3 specifically asks for opinions and speculation' },
      ],
      correctIndex: 2,
      difficulty: 0.45,
    },
  },
]
