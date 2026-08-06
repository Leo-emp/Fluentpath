// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS ACADEMIC READING — Expanded Authentic Exam Practice
// # ═══════════════════════════════════════════════════════════════════════════
// # Real IELTS Reading has 3 passages, 40 questions total, 60 minutes.
// # Question types: T/F/NG, matching headings, sentence completion,
// # summary completion, matching information, MCQ, flow-chart completion.
// # Each passage is original, copyright-free content in authentic exam style.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_READING_EXPANDED: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 1 — "The Rise of Urban Farming" (B1–B2, Passage 1 style)
  // # T/F/NG + Sentence Completion — the two most common IELTS types
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.01', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'The Rise of Urban Farming',
      passage: 'Urban farming — the practice of growing food in cities — has expanded rapidly in the last two decades. What was once seen as a hobby for enthusiasts has become a serious response to food security concerns, environmental degradation, and the desire for fresher produce.\n\nThe modern urban farming movement can be traced to Detroit, Michigan, where economic collapse in the 2000s left thousands of vacant lots across the city. Community groups began converting these abandoned spaces into productive gardens, growing vegetables for local food banks and farmers\' markets. By 2015, Detroit had over 1,400 urban farms and gardens, making it one of the most agriculturally active cities in America.\n\nVertical farming represents the most technologically advanced form of urban agriculture. These indoor facilities use hydroponic or aeroponic systems to grow crops in stacked layers, often within converted warehouses or purpose-built structures. LED lighting replaces sunlight, and computer-controlled environments maintain optimal temperature, humidity, and nutrient levels. A single vertical farm occupying one acre of floor space can produce the equivalent of 30 acres of conventional farmland.\n\nCritics point out that vertical farming requires significant energy input, particularly for lighting and climate control. A study by Cornell University found that the energy cost of growing lettuce in a vertical farm was approximately 25 times higher than in a conventional greenhouse. However, proponents argue that reduced transportation costs, year-round production, and water savings of up to 95% compared to traditional farming offset these energy concerns.\n\nRooftop gardens represent a simpler and more accessible form of urban farming. Cities such as Paris have introduced legislation requiring new commercial buildings to include either green roofs or solar panels. Singapore, where land is extremely scarce, has invested heavily in rooftop farming, with the goal of producing 30% of its nutritional needs domestically by 2030.\n\nBeyond food production, urban farms provide significant social benefits. They create green spaces in concrete-dominated environments, reduce urban heat island effects, and provide therapeutic opportunities for residents. Several hospitals in the United States have established rooftop gardens specifically for patient rehabilitation, finding that access to green space accelerated recovery times by an average of 15%.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: Urban farming has always been taken seriously as a food production method.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The urban farming movement in Detroit was triggered by economic problems.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Detroit had exactly 1,400 urban farms by 2015.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Vertical farms use natural sunlight through special windows.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The Cornell University study compared vertical farms to outdoor conventional farming.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Paris requires all new buildings to have green roofs.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Singapore has already achieved its 30% domestic food production target.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Some American hospitals use rooftop gardens for patient recovery.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
      ],
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 2 — "The Psychology of Colour" (B2, Passage 2 style)
  // # Matching Headings + MCQ — tests paragraph comprehension
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'The Psychology of Colour',
      passage: 'A) The influence of colour on human behaviour has been a subject of scientific investigation since Isaac Newton first demonstrated that white light could be separated into a spectrum of colours. While the physics of colour perception is well understood — it depends on the wavelengths of light detected by cone cells in the retina — the psychological effects of colour remain a topic of active debate.\n\nB) Red is perhaps the most studied colour in psychological research. Studies have consistently shown that exposure to red increases heart rate, blood pressure, and metabolic activity. In competitive contexts, athletes wearing red have been found to win more frequently — a 2005 study of Olympic combat sports showed that competitors in red won 55% of bouts, a statistically significant advantage. Researchers suggest this may be because red signals dominance in many animal species, triggering an instinctive response.\n\nC) Blue, by contrast, is associated with calmness and productivity. A study at the University of British Columbia found that blue backgrounds improved performance on creative tasks, while red backgrounds enhanced performance on detail-oriented tasks such as proofreading. This has practical implications for workplace design: companies such as Google and Facebook use blue prominently in their branding, though whether this was a deliberate psychological choice or coincidence is unclear.\n\nD) The cultural dimension of colour psychology complicates universal claims. White symbolises purity and marriage in Western cultures but is the traditional colour of mourning in many East Asian societies. Similarly, green is associated with nature and environmental awareness in Europe but carries religious significance in Islamic cultures. These cultural associations mean that marketing campaigns must be carefully adapted for different markets.\n\nE) In healthcare settings, colour choices can have measurable effects on patient outcomes. Hospitals that replaced their traditional white walls with pale green or blue reported reductions in patient anxiety of up to 22%. However, the same study noted that excessively bright or saturated colours could increase agitation in patients with certain mental health conditions, suggesting that moderation is key.\n\nF) The food industry has long understood the power of colour. Fast food chains predominantly use red and yellow in their branding — colours associated with appetite stimulation and urgency. Restaurants with blue or purple interiors tend to report lower customer spending, as these colours are rarely found in natural foods and may unconsciously signal that food is unsafe or unripe.',
      source: 'Original content',
      questions: [
        { stem: 'Which paragraph discusses how colour affects athletic performance?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], correctIndex: 1 },
        { stem: 'Which paragraph explains why colour psychology cannot be applied universally?', options: ['Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'], correctIndex: 1 },
        { stem: 'According to the passage, what colour improved performance on creative tasks?', options: ['Red', 'Blue', 'Green', 'White'], correctIndex: 1 },
        { stem: 'The author suggests that hospitals should:', options: ['Use only white walls', 'Use moderate, muted colours', 'Avoid all colour', 'Use bright saturated colours for energy'], correctIndex: 1 },
        { stem: 'Why do fast food chains use red and yellow?', options: ['They are the cheapest colours to produce', 'They stimulate appetite and create urgency', 'They are culturally neutral', 'They make buildings visible from a distance'], correctIndex: 1 },
        { stem: 'The author\'s overall attitude toward colour psychology research is:', options: ['Dismissive — it is pseudoscience', 'Cautious — effects exist but cultural context matters', 'Enthusiastic — colour determines behaviour', 'Neutral — no position is stated'], correctIndex: 1 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 3 — "Artificial Intelligence and Creative Arts" (C1)
  // # MCQ + T/F/NG — advanced academic argument comprehension
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.03', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      title: 'Artificial Intelligence and the Creative Arts',
      passage: 'The notion that artificial intelligence might produce genuine art strikes many as either revolutionary or absurd, depending on one\'s definition of creativity. At the heart of this debate lies a fundamental question: does art require intentionality, or is it defined solely by its impact on the viewer?\n\nIn 2018, a portrait generated by a generative adversarial network (GAN) sold at Christie\'s auction house for $432,500 — far exceeding its estimated price of $7,000 to $10,000. The work, titled "Portrait of Edmond de Belamy," was created by feeding the algorithm 15,000 portraits painted between the 14th and 20th centuries. The AI generated an entirely new image that bore no direct resemblance to any single training input, yet possessed the aesthetic qualities associated with classical portraiture.\n\nPhilosopher Margaret Boden distinguishes between three types of creativity: exploratory (working within established rules), combinational (making unexpected connections between ideas), and transformational (changing the rules themselves). By these criteria, current AI systems demonstrate exploratory and combinational creativity but fall short of transformational creativity. They can produce novel outputs within learned parameters but cannot fundamentally reimagine the parameters themselves.\n\nMusician and producer Brian Eno has argued that the creative value of AI lies not in replacing human artists but in functioning as a new kind of instrument — one that generates possibilities a human creator then selects from and refines. This "curator model" of AI creativity positions the human as an editor rather than a generator, a role Eno suggests is equally creative. Indeed, he notes that much of what we call human creativity involves selecting from possibilities generated by chance, experience, or unconscious processes.\n\nCritics of AI art raise several objections. First, they argue that art derives meaning from the artist\'s lived experience and emotional state — qualities that machines fundamentally lack. A painting of suffering by someone who has suffered carries different weight than one generated by pattern recognition. Second, they note that AI systems are trained on human-created works, raising questions about originality and intellectual property. When an AI produces an image "in the style of" a living artist, who owns the result?\n\nDespite these philosophical objections, the practical integration of AI into creative industries continues to accelerate. Architecture firms use generative algorithms to explore thousands of design variations; film studios employ AI to generate realistic visual effects; and music producers increasingly incorporate AI-generated melodies and harmonies into their compositions. Whether these applications constitute "art" may ultimately be less important than their undeniable impact on the creative landscape.',
      source: 'Original content',
      questions: [
        { stem: 'The author presents the debate about AI art as centring on:', options: ['Whether AI can pass the Turing test', 'Whether art requires intentionality or is defined by impact', 'Whether AI will make human artists unemployed', 'Whether AI art should be exhibited in museums'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The "Portrait of Edmond de Belamy" was a copy of a specific historical painting.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'According to Boden\'s framework, current AI systems cannot:', options: ['Work within established artistic rules', 'Make unexpected connections between ideas', 'Fundamentally change the rules of creativity', 'Produce aesthetically pleasing outputs'], correctIndex: 2 },
        { stem: 'Brian Eno suggests that AI is most valuable as:', options: ['A replacement for less talented artists', 'A tool that generates options for human curators', 'A way to preserve classical art styles', 'A teacher of music theory'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Critics believe AI-generated art about suffering has the same emotional weight as human art about suffering.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The author\'s conclusion suggests that:', options: ['AI will never create true art', 'The definition of art will need to change', 'The practical impact of AI on creativity matters more than philosophical definitions', 'Human artists should embrace AI or become irrelevant'], correctIndex: 2 },
      ],
      difficulty: 0.7,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 4 — "Microplastics in the Food Chain" (B2)
  // # Summary Completion (gap fill) + T/F/NG
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.04', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'Microplastics in the Food Chain',
      passage: 'Microplastics — fragments of plastic smaller than five millimetres — have been found in virtually every environment on Earth, from the deepest ocean trenches to Arctic ice cores. Their presence in the food chain, from plankton to large marine mammals, has raised urgent questions about the implications for human health.\n\nThe primary sources of microplastics are the degradation of larger plastic items, synthetic textile fibres released during washing, and microbeads used in cosmetics and cleaning products. A single load of laundry can release over 700,000 microscopic fibres into wastewater. Although treatment plants capture a significant proportion of these particles, studies suggest that between 15% and 30% pass through filtration systems and enter rivers, lakes, and oceans.\n\nOnce in aquatic environments, microplastics are ingested by organisms at every trophic level. Zooplankton mistake microplastics for food, and the particles then accumulate through the food chain — a process known as biomagnification. Research published in Environmental Science & Technology found that mussels in UK coastal waters contained an average of 70 microplastic particles per 100 grams of tissue. The implications are stark: a regular shellfish consumer in Europe may ingest up to 11,000 microplastic particles annually.\n\nBeyond the particles themselves, microplastics act as vectors for harmful chemicals. Their large surface area relative to their size allows them to adsorb persistent organic pollutants (POPs) such as PCBs and DDT from surrounding water. When ingested by organisms, these concentrated chemicals can leach into body tissues, potentially causing endocrine disruption, reproductive problems, and immune system suppression.\n\nThe scale of the problem has prompted regulatory responses. The European Union banned microbeads in cosmetics in 2020, and several countries have introduced restrictions on single-use plastics. However, addressing microplastic pollution from textile fibres — the largest single source — remains a significant challenge. Proposed solutions include mandatory filters on washing machines, development of fabrics that shed fewer fibres, and improved wastewater treatment technologies.\n\nScientists emphasise that research into the health effects of microplastic ingestion on humans is still in its early stages. While animal studies have demonstrated inflammation and cellular damage at high exposure levels, the doses used in laboratory settings often far exceed realistic human exposure. The long-term effects of chronic, low-level microplastic ingestion remain unknown.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: Microplastics have been found in locations ranging from deep oceans to polar regions.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Wastewater treatment plants remove all microplastic particles.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Biomagnification means that plastic particles become larger as they move up the food chain.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The EU banned microbeads in cosmetics before 2020.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Textile fibres are the largest single source of microplastic pollution.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Scientists have confirmed that microplastics cause cancer in humans.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
        { stem: 'The author\'s overall assessment of current research into human health effects is that:', options: ['It conclusively proves microplastics are harmful', 'It is still too early to draw firm conclusions', 'It shows no cause for concern', 'It has been suppressed by the plastics industry'], correctIndex: 1 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 5 — "The Economics of Happiness" (C1, Passage 3 style)
  // # Advanced MCQ + T/F/NG — requires inference and evaluation
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.05', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      title: 'The Economics of Happiness',
      passage: 'For most of the twentieth century, economists assumed that rising national income would lead directly to increased wellbeing. This assumption, deeply embedded in policy-making, drove the relentless pursuit of GDP growth as the primary measure of national success. However, a growing body of evidence suggests that the relationship between wealth and happiness is far more complex than classical economics predicted.\n\nThe paradox was first identified by economist Richard Easterlin in 1974. Analysing survey data from the United States, he observed that while real income per capita had doubled between 1946 and 1974, self-reported happiness levels had remained essentially flat. This phenomenon — that beyond a certain threshold, additional income does not translate into additional happiness — became known as the Easterlin Paradox and has since been replicated in numerous countries.\n\nSeveral explanations have been proposed. The most widely accepted is the theory of adaptation: humans rapidly adjust to improved material circumstances, returning to a baseline level of satisfaction regardless of income gains. A lottery winner experiences intense joy initially, but within months reports happiness levels similar to before their windfall. This "hedonic treadmill" suggests that the pursuit of material wealth is inherently self-defeating as a happiness strategy.\n\nSocial comparison offers another compelling explanation. Research by economists Alesina and Di Tella found that individuals\' happiness depends less on their absolute income than on their income relative to their peers. In societies where income inequality is high, even those above the median may feel relatively deprived. This finding has significant policy implications: it suggests that reducing inequality may increase aggregate happiness more effectively than increasing average income.\n\nThe Kingdom of Bhutan has attracted international attention for its adoption of "Gross National Happiness" (GNH) as an alternative to GDP. The GNH index measures nine domains including psychological wellbeing, health, education, time use, cultural resilience, good governance, ecological diversity, living standards, and community vitality. While critics argue that GNH is difficult to measure consistently and may be used to deflect attention from economic shortcomings, the concept has influenced policy debates worldwide.\n\nMore recently, the OECD\'s Better Life Index attempts to synthesise economic and non-economic indicators into a single framework. The index reveals striking patterns: countries such as Denmark, Iceland, and New Zealand consistently rank higher on life satisfaction than their GDP rankings would predict, while economically powerful nations such as the United States and Japan score lower than expected. The common factors among high-satisfaction countries appear to be strong social connections, work-life balance, and trust in institutions rather than raw economic output.',
      source: 'Original content',
      questions: [
        { stem: 'The main purpose of the passage is to:', options: ['Argue that GDP should be abolished as a measure', 'Examine why wealth does not straightforwardly produce happiness', 'Promote Bhutan\'s Gross National Happiness model', 'Criticise economists for ignoring wellbeing'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The Easterlin Paradox has only been observed in the United States.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The concept of the "hedonic treadmill" implies that:', options: ['Exercise makes people happier', 'People always want more than they currently have', 'People return to a baseline happiness level after material gains', 'Wealthy people are secretly unhappy'], correctIndex: 2 },
        { stem: 'According to Alesina and Di Tella, happiness is most influenced by:', options: ['Total national GDP', 'Individual absolute income level', 'Income relative to one\'s peers', 'The cost of living in a country'], correctIndex: 2 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The author fully endorses Bhutan\'s GNH as a replacement for GDP.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The OECD Better Life Index suggests that the key factors for life satisfaction are:', options: ['Military strength and political stability', 'Social connections, work-life balance, and institutional trust', 'Climate, geography, and natural resources', 'Technology adoption and innovation rates'], correctIndex: 1 },
      ],
      difficulty: 0.7,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 6 — "The Science of Sleep" (B1, factual text)
  // # T/F/NG + MCQ — accessible scientific topic
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.06', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'The Science of Sleep',
      passage: 'Sleep occupies roughly one-third of our lives, yet many people understand surprisingly little about why we need it and what happens when we do not get enough. Scientific research over the past few decades has revealed that sleep is not a passive state but an active process essential for both physical and mental health.\n\nThe average adult needs between seven and nine hours of sleep per night, although this varies between individuals. Teenagers require more — typically eight to ten hours — due to the demands of physical growth and brain development. Elderly adults often sleep less, averaging six to seven hours, though this does not necessarily mean they need less sleep; changes in sleep architecture with age may simply make sustained sleep more difficult.\n\nSleep consists of several stages that repeat in cycles of approximately 90 minutes. Light sleep (stages 1 and 2) accounts for about 50% of total sleep time. Deep sleep (stage 3) typically occurs more in the first half of the night and is crucial for physical restoration — tissue repair, immune system strengthening, and growth hormone release all occur primarily during this stage. REM (Rapid Eye Movement) sleep, during which most dreaming occurs, increases in the second half of the night and is associated with memory consolidation and emotional processing.\n\nChronic sleep deprivation — regularly sleeping fewer than six hours per night — has been linked to a wide range of health problems. A landmark study by the University of Warwick found that people who consistently slept fewer than six hours were 12% more likely to die prematurely than those who slept six to eight hours. Sleep deprivation impairs cognitive function, with effects comparable to alcohol intoxication: after 17 hours of wakefulness, performance on cognitive tasks deteriorates to a level equivalent to a blood alcohol concentration of 0.05%.\n\nDespite this evidence, many societies continue to undervalue sleep. A 2019 survey found that 35% of British adults reported getting fewer than seven hours of sleep on a typical night. The reasons included work pressure, screen use before bedtime, and irregular schedules. Sleep researchers advocate for several evidence-based improvements: maintaining a consistent sleep schedule, reducing exposure to blue light in the evening, keeping bedrooms cool and dark, and avoiding caffeine after 2pm.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: All adults need exactly eight hours of sleep.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Teenagers need more sleep than adults because of growth and brain development.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Deep sleep occurs equally throughout the night.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The University of Warwick study used participants from multiple countries.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
        { stem: 'According to the passage, being awake for 17 hours affects cognitive performance similarly to:', options: ['Mild illness', 'Moderate alcohol intoxication', 'Severe exhaustion', 'A 0.08% blood alcohol level'], correctIndex: 1 },
        { stem: 'Which of the following is NOT mentioned as a reason for poor sleep among British adults?', options: ['Work pressure', 'Screen use', 'Noisy neighbours', 'Irregular schedules'], correctIndex: 2 },
      ],
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 7 — "Renewable Energy: Progress and Challenges" (B2)
  // # Matching Information + MCQ
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.07', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'Renewable Energy: Progress and Challenges',
      passage: 'A) The global transition from fossil fuels to renewable energy sources has accelerated dramatically in the 2020s. Solar panel costs have fallen by 99% since 1976, making solar electricity cheaper than coal in most parts of the world. Wind energy has followed a similar trajectory, with offshore wind farms now generating electricity at costs competitive with natural gas.\n\nB) China leads the world in renewable energy deployment, having installed more solar capacity in 2023 alone than the United States has in total. The country\'s dominance extends to manufacturing: Chinese companies produce approximately 80% of the world\'s solar panels and 60% of its wind turbines. This concentration of production has raised concerns about supply chain vulnerability among Western nations.\n\nC) Energy storage remains the most significant technical challenge for renewable energy systems. Solar and wind are intermittent by nature — they produce energy only when the sun shines or the wind blows. Battery storage technology has improved substantially, with lithium-ion battery costs falling 97% since 1991. However, current battery capacity can typically store only four to eight hours of supply, insufficient for periods of extended low wind and cloud cover.\n\nD) The environmental impact of renewable energy infrastructure itself has attracted criticism. Wind turbines have been linked to bird and bat mortality, with estimates suggesting that turbines in the United States kill between 140,000 and 500,000 birds annually. Solar farms require significant land area — roughly 5 to 10 acres per megawatt of capacity — which can displace agricultural land or natural habitats.\n\nE) Grid infrastructure represents another major bottleneck. Most national electricity grids were designed for centralised power generation — large power stations feeding electricity outward to consumers. Renewable energy, by contrast, is distributed across many locations, requiring fundamental upgrades to transmission networks. The International Energy Agency estimates that $600 billion in annual grid investment is needed globally to meet climate targets.\n\nF) Despite these challenges, the economic momentum behind renewable energy appears irreversible. In 2023, global investment in clean energy reached $1.7 trillion, surpassing fossil fuel investment for the first time. This shift is driven not primarily by environmental policy but by economics: renewable energy is now simply cheaper to produce in most markets.',
      source: 'Original content',
      questions: [
        { stem: 'Which paragraph discusses the problem of renewable energy not producing power continuously?', options: ['Paragraph A', 'Paragraph C', 'Paragraph D', 'Paragraph E'], correctIndex: 1 },
        { stem: 'Which paragraph mentions the environmental damage caused by renewable energy equipment?', options: ['Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph F'], correctIndex: 2 },
        { stem: 'According to the passage, China produces approximately what percentage of global solar panels?', options: ['60%', '70%', '80%', '90%'], correctIndex: 2 },
        { stem: 'The author suggests that the shift to renewable energy is primarily driven by:', options: ['Government environmental regulations', 'Public demand for clean energy', 'Cost advantages over fossil fuels', 'International climate agreements'], correctIndex: 2 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Current battery technology can store enough energy for two weeks of low renewable output.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The IEA believes current grid infrastructure is adequate for renewable energy expansion.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SENTENCE COMPLETION (gap_fill format for reading passages)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.sc.01', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'IELTS Reading — Sentence Completion (use NO MORE THAN TWO WORDS from the passage)\n\nPassage excerpt: "The Great Wall of China, contrary to popular belief, is not visible from space with the naked eye. This myth, which has persisted since at least the 1930s, was definitively debunked by Chinese astronaut Yang Liwei in 2003, who confirmed that the wall could not be seen from orbit. The wall\'s maximum width of approximately 9 metres makes it narrower than many highways, which are also invisible from space."\n\nThe myth that the Great Wall is visible from space dates back to at least the ______. Chinese astronaut Yang Liwei proved it was ______ in 2003. The wall is no wider than approximately ______ metres.',
      gaps: [
        { correctAnswer: '1930s', acceptedAlternatives: ['nineteen thirties'], hint: 'decade' },
        { correctAnswer: 'false', acceptedAlternatives: ['incorrect', 'untrue', 'wrong', 'a myth'], hint: 'he debunked the claim' },
        { correctAnswer: '9', acceptedAlternatives: ['nine'], hint: 'maximum width measurement' },
      ],
      difficulty: 0.45,
    },
  },
  {
    id: 'ielts.rd.sc.02', type: 'gap_fill', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'IELTS Reading — Sentence Completion (use NO MORE THAN THREE WORDS from the passage)\n\nPassage excerpt: "Honeybees communicate the location of food sources through a remarkable behaviour known as the waggle dance. A forager returning to the hive performs a figure-eight movement, with the direction of the straight section indicating the angle between the sun and the food source. The duration of the waggle indicates distance — approximately one second of waggling represents one kilometre of travel. This sophisticated communication system was first decoded by Austrian biologist Karl von Frisch in 1967, earning him the Nobel Prize."\n\nThe waggle dance is performed in a ______ movement. The direction of the straight part shows the ______ between the sun and the food. Karl von Frisch received the ______ for decoding this system.',
      gaps: [
        { correctAnswer: 'figure-eight', acceptedAlternatives: ['figure eight', 'figure 8'], hint: 'shape of the dance' },
        { correctAnswer: 'angle', acceptedAlternatives: [], hint: 'geometric measurement' },
        { correctAnswer: 'Nobel Prize', acceptedAlternatives: ['Nobel prize', 'nobel prize'], hint: 'prestigious award' },
      ],
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # MATCHING HEADINGS — Classic IELTS Reading question type
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.mh.01', type: 'matching', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'IELTS Reading — Match each paragraph description to its heading. (Based on a passage about the development of the internet)',
      pairs: [
        { left: 'The military origins of network communication in the 1960s', right: 'From ARPANET to Global Network' },
        { left: 'How the invention of the World Wide Web made the internet accessible to ordinary users', right: 'Tim Berners-Lee and the Birth of the Web' },
        { left: 'The explosion of social media platforms and user-generated content after 2004', right: 'Web 2.0: The Participatory Internet' },
        { left: 'Growing concerns about data privacy and the concentration of power among technology companies', right: 'The Dark Side of Connectivity' },
        { left: 'Predictions about AI integration, decentralised networks, and the metaverse', right: 'The Future of the Internet' },
      ],
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.rd.mh.02', type: 'matching', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      stem: 'IELTS Reading — Match each paragraph description to its heading. (Based on a passage about endangered languages)',
      pairs: [
        { left: 'The rate at which languages are disappearing worldwide', right: 'A Global Crisis of Linguistic Diversity' },
        { left: 'Why the loss of a language means the loss of unique cultural knowledge', right: 'Languages as Repositories of Knowledge' },
        { left: 'Economic and social pressures that cause communities to abandon their native languages', right: 'The Forces Behind Language Death' },
        { left: 'Efforts by linguists and communities to document and revitalise dying languages', right: 'Fighting Back: Preservation and Revival' },
        { left: 'Successful cases where languages have been brought back from the brink of extinction', right: 'Against the Odds: Success Stories' },
        { left: 'The role of technology and digital tools in language preservation', right: 'Digital Lifelines for Dying Languages' },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # MATCHING FEATURES — Match statements to people/theories
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.mf.01', type: 'matching', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      stem: 'IELTS Reading — Match each view to the correct researcher. (Based on a passage about language acquisition theories)',
      pairs: [
        { left: 'Children are born with an innate language acquisition device', right: 'Noam Chomsky' },
        { left: 'Language develops through social interaction and scaffolding', right: 'Lev Vygotsky' },
        { left: 'Children learn language through imitation and reinforcement', right: 'B.F. Skinner' },
        { left: 'Language learning involves hypothesis testing and creative construction', right: 'Stephen Krashen' },
      ],
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 8 — "Migration and Globalisation" (B2)
  // # T/F/NG + MCQ — social science topic
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.08', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'Migration and Globalisation',
      passage: 'International migration has increased steadily over the past half-century, with the number of people living outside their country of birth reaching 281 million in 2020 — approximately 3.6% of the global population. While this figure may seem modest, it represents a 128% increase since 1990 and shows no sign of slowing.\n\nThe drivers of migration are conventionally divided into "push" and "pull" factors. Push factors include conflict, political instability, poverty, and environmental degradation. Pull factors include economic opportunity, family reunification, educational access, and political freedom. In practice, most migration decisions involve a complex interplay of multiple factors.\n\nEconomic research consistently demonstrates that immigration generates net positive economic effects for receiving countries. A comprehensive study by the National Academies of Sciences found that first-generation immigrants in the United States cost governments more in services than they contribute in taxes, but that the second generation — their children — become among the highest net fiscal contributors of any demographic group. Over a 75-year period, the net fiscal impact of a single immigrant was estimated at +$259,000.\n\nHowever, the benefits of immigration are not distributed evenly. Low-skilled native workers in sectors with high immigrant participation may face wage depression, while employers and consumers benefit from lower prices. This uneven distribution of costs and benefits helps explain the political controversy surrounding immigration in many countries.\n\nClimate change is emerging as an increasingly significant driver of migration. The World Bank estimates that by 2050, up to 216 million people could be forced to move within their own countries due to rising sea levels, drought, and declining agricultural productivity. This "climate migration" is expected to affect Sub-Saharan Africa, South Asia, and Latin America most severely.\n\nRemittances — money sent home by migrants to their families — represent a crucial economic lifeline for many developing countries. In 2022, global remittances reached $647 billion, exceeding foreign direct investment in many low-income nations. For countries such as Tonga, where remittances account for 44% of GDP, this income flow is essential for economic survival.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: The number of international migrants has more than doubled since 1990.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Most migration is caused by a single dominant factor.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'According to the passage, second-generation immigrants in the US:', options: ['Cost more in services than they pay in taxes', 'Have no measurable economic impact', 'Are among the highest net fiscal contributors', 'Leave the country at high rates'], correctIndex: 2 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Immigration benefits everyone in receiving countries equally.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The World Bank predicts that by 2050, climate migration will:', options: ['Force 216 million people to leave their countries', 'Force up to 216 million to move within their own countries', 'Primarily affect European nations', 'Be resolved through international agreements'], correctIndex: 1 },
        { stem: 'For countries like Tonga, remittances represent:', options: ['A minor supplementary income', 'Nearly half of the national GDP', 'A declining source of revenue', 'Less than foreign direct investment'], correctIndex: 1 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # YES/NO/NOT GIVEN (General Training style but useful practice)
  // # Same logic as T/F/NG but tests opinion not fact
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.exp.09', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'The Case for a Four-Day Working Week',
      passage: 'The traditional five-day, 40-hour working week has been the standard in most developed economies since the mid-20th century. However, a growing number of companies and countries are experimenting with a four-day week, and the results have been overwhelmingly positive.\n\nThe largest trial to date took place in the United Kingdom in 2022, involving 61 companies and approximately 2,900 employees. Companies reduced working hours by 20% while maintaining full pay. The results were striking: revenue increased by an average of 1.4%, sick days fell by 65%, and 39% of employees reported feeling less stressed. Of the participating companies, 56 out of 61 chose to continue with the four-day week after the trial ended.\n\nProductivity research supports these findings. Studies consistently show that productivity does not scale linearly with hours worked. Beyond approximately 50 hours per week, the quality and quantity of output decline sharply due to fatigue, reduced concentration, and increased error rates. A four-day week, by eliminating the least productive hours, may actually maintain or increase total output.\n\nCritics argue that a four-day week is impractical for certain industries, particularly healthcare, emergency services, and customer-facing businesses that require continuous coverage. However, proponents note that these sectors already operate on shift systems and that reducing individual hours does not necessarily mean reducing service availability — it simply requires hiring additional staff.\n\nThe environmental benefits are also noteworthy. Fewer commuting days mean reduced carbon emissions, and lower office energy consumption has been documented in trials. A study in the United States estimated that a nationwide four-day week could reduce the country\'s carbon footprint by approximately 8.6%.',
      source: 'Original content',
      questions: [
        { stem: 'YES, NO, or NOT GIVEN: The author believes the four-day working week should be adopted globally.', options: ['Yes', 'No', 'Not Given'], correctIndex: 2 },
        { stem: 'YES, NO, or NOT GIVEN: The author considers the UK trial results to be impressive.', options: ['Yes', 'No', 'Not Given'], correctIndex: 0 },
        { stem: 'YES, NO, or NOT GIVEN: The author thinks working longer hours always produces more output.', options: ['Yes', 'No', 'Not Given'], correctIndex: 1 },
        { stem: 'YES, NO, or NOT GIVEN: The author agrees that the four-day week is impossible for healthcare workers.', options: ['Yes', 'No', 'Not Given'], correctIndex: 1 },
        { stem: 'YES, NO, or NOT GIVEN: The author considers environmental benefits to be the most important argument for the four-day week.', options: ['Yes', 'No', 'Not Given'], correctIndex: 2 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # READING STRATEGY — T/F/NG technique items
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.strat.01', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'In IELTS Reading, when you encounter a True/False/Not Given statement that contains information which SEEMS logical but is not mentioned in the passage, you should choose:',
      options: [
        { text: 'True — if it seems logical, the passage probably supports it', misconception: 'IELTS tests what is IN the passage, not what is logical' },
        { text: 'False — if the passage doesn\'t mention it, it must be wrong', misconception: '"Not mentioned" and "contradicted" are different things' },
        { text: 'Not Given — information not stated in the passage, even if it seems logical', misconception: null },
        { text: 'Skip it — this type of question is too difficult to answer', misconception: 'T/F/NG questions follow consistent rules that can be learned' },
      ],
      correctIndex: 2,
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.rd.strat.02', type: 'mcq', level: 'B2', skill: 'reading',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'When answering IELTS Reading Matching Headings questions, the most effective approach is to:',
      options: [
        { text: 'Read every heading, then read every paragraph in full, then match', misconception: 'This is too time-consuming — you\'ll run out of time' },
        { text: 'Read the first and last sentence of each paragraph, identify the main idea, then match to headings', misconception: null },
        { text: 'Match headings based on keywords that appear in both the heading and paragraph', misconception: 'Keywords can be distractors — the heading must match the MAIN IDEA, not just a detail' },
        { text: 'Start with the easiest paragraphs and skip the difficult ones', misconception: 'This can work as a strategy but doesn\'t address HOW to identify the correct heading' },
      ],
      correctIndex: 1,
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.rd.strat.03', type: 'mcq', level: 'B1', skill: 'reading',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'In IELTS Academic Reading, how should you divide your 60 minutes across the three passages?',
      options: [
        { text: '20 minutes per passage — equal time for each', misconception: 'Passages increase in difficulty, so this doesn\'t account for the harder Passage 3' },
        { text: '15 minutes for Passage 1, 20 for Passage 2, 25 for Passage 3', misconception: null },
        { text: '30 minutes for Passage 1, 15 for Passage 2, 15 for Passage 3', misconception: 'Spending too long on the easiest passage wastes time needed for harder ones' },
        { text: 'Don\'t worry about time — focus on accuracy', misconception: 'Time management is essential — unanswered questions score zero' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
]
