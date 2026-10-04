// # Static content bank for mock test reading/listening sections.
// # Multiple test sets available — each array is indexed by slot position.
// # The exam definition has 3 reading slots (passages) and 4 listening slots (parts).
// # Call getReadingContent(testNum) / getListeningContent(testNum) to rotate tests.

export interface ReadingPassageContent {
  title: string
  passage: string
  questions: Array<{
    stem: string
    options: string[]
    correctIndex: number
  }>
}

export interface ListeningItemContent {
  type: 'mcq' | 'gap_fill'
  stem: string
  // # MCQ fields
  options?: Array<{ text: string; misconception: string | null }>
  correctIndex?: number
  // # Gap fill fields
  gaps?: Array<{
    correctAnswer: string
    acceptedAlternatives: string[]
    hint: string
  }>
  transcript?: string
}

// # ═══════════════════════════════════════════════════════════════════
// # READING PASSAGES — 3 per test, indexed by slot position
// # ═══════════════════════════════════════════════════════════════════

export const READING_CONTENT: ReadingPassageContent[] = [
  // # Passage 1 — B1 factual (Passage 1 style)
  {
    title: 'The Rise of Urban Farming',
    passage: 'Urban farming — the practice of growing food in cities — has expanded rapidly in the last two decades. What was once seen as a hobby for enthusiasts has become a serious response to food security concerns, environmental degradation, and the desire for fresher produce.\n\nThe modern urban farming movement can be traced to Detroit, Michigan, where economic collapse in the 2000s left thousands of vacant lots across the city. Community groups began converting these abandoned spaces into productive gardens, growing vegetables for local food banks and farmers\' markets. By 2015, Detroit had over 1,400 urban farms and gardens, making it one of the most agriculturally active cities in America.\n\nVertical farming represents the most technologically advanced form of urban agriculture. These indoor facilities use hydroponic or aeroponic systems to grow crops in stacked layers, often within converted warehouses or purpose-built structures. LED lighting replaces sunlight, and computer-controlled environments maintain optimal temperature, humidity, and nutrient levels. A single vertical farm occupying one acre of floor space can produce the equivalent of 30 acres of conventional farmland.\n\nCritics point out that vertical farming requires significant energy input, particularly for lighting and climate control. A study by Cornell University found that the energy cost of growing lettuce in a vertical farm was approximately 25 times higher than in a conventional greenhouse. However, proponents argue that reduced transportation costs, year-round production, and water savings of up to 95% compared to traditional farming offset these energy concerns.\n\nRooftop gardens represent a simpler and more accessible form of urban farming. Cities such as Paris have introduced legislation requiring new commercial buildings to include either green roofs or solar panels. Singapore, where land is extremely scarce, has invested heavily in rooftop farming, with the goal of producing 30% of its nutritional needs domestically by 2030.\n\nBeyond food production, urban farms provide significant social benefits. They create green spaces in concrete-dominated environments, reduce urban heat island effects, and provide therapeutic opportunities for residents. Several hospitals in the United States have established rooftop gardens specifically for patient rehabilitation, finding that access to green space accelerated recovery times by an average of 15%.',
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
  },
  // # Passage 2 — B2 argument (Passage 2 style)
  {
    title: 'The Psychology of Colour',
    passage: 'A) The influence of colour on human behaviour has been a subject of scientific investigation since Isaac Newton first demonstrated that white light could be separated into a spectrum of colours. While the physics of colour perception is well understood — it depends on the wavelengths of light detected by cone cells in the retina — the psychological effects of colour remain a topic of active debate.\n\nB) Red is perhaps the most studied colour in psychological research. Studies have consistently shown that exposure to red increases heart rate, blood pressure, and metabolic activity. In competitive contexts, athletes wearing red have been found to win more frequently — a 2005 study of Olympic combat sports showed that competitors in red won 55% of bouts, a statistically significant advantage. Researchers suggest this may be because red signals dominance in many animal species, triggering an instinctive response.\n\nC) Blue, by contrast, is associated with calmness and productivity. A study at the University of British Columbia found that blue backgrounds improved performance on creative tasks, while red backgrounds enhanced performance on detail-oriented tasks such as proofreading. This has practical implications for workplace design: companies such as Google and Facebook use blue prominently in their branding, though whether this was a deliberate psychological choice or coincidence is unclear.\n\nD) The cultural dimension of colour psychology complicates universal claims. White symbolises purity and marriage in Western cultures but is the traditional colour of mourning in many East Asian societies. Similarly, green is associated with nature and environmental awareness in Europe but carries religious significance in Islamic cultures. These cultural associations mean that marketing campaigns must be carefully adapted for different markets.\n\nE) In healthcare settings, colour choices can have measurable effects on patient outcomes. Hospitals that replaced their traditional white walls with pale green or blue reported reductions in patient anxiety of up to 22%. However, the same study noted that excessively bright or saturated colours could increase agitation in patients with certain mental health conditions, suggesting that moderation is key.\n\nF) The food industry has long understood the power of colour. Fast food chains predominantly use red and yellow in their branding — colours associated with appetite stimulation and urgency. Restaurants with blue or purple interiors tend to report lower customer spending, as these colours are rarely found in natural foods and may unconsciously signal that food is unsafe or unripe.',
    questions: [
      { stem: 'Which paragraph discusses how colour affects athletic performance?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], correctIndex: 1 },
      { stem: 'Which paragraph explains why colour psychology cannot be applied universally?', options: ['Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'], correctIndex: 1 },
      { stem: 'According to the passage, what colour improved performance on creative tasks?', options: ['Red', 'Blue', 'Green', 'White'], correctIndex: 1 },
      { stem: 'The author suggests that hospitals should:', options: ['Use only white walls', 'Use moderate, muted colours', 'Avoid all colour', 'Use bright saturated colours for energy'], correctIndex: 1 },
      { stem: 'Why do fast food chains use red and yellow?', options: ['They are the cheapest colours to produce', 'They stimulate appetite and create urgency', 'They are culturally neutral', 'They make buildings visible from a distance'], correctIndex: 1 },
      { stem: 'The author\'s overall attitude toward colour psychology research is:', options: ['Dismissive — it is pseudoscience', 'Cautious — effects exist but cultural context matters', 'Enthusiastic — colour determines behaviour', 'Neutral — no position is stated'], correctIndex: 1 },
    ],
  },
  // # Passage 3 — C1 abstract (Passage 3 style)
  {
    title: 'Artificial Intelligence and the Creative Arts',
    passage: 'The notion that artificial intelligence might produce genuine art strikes many as either revolutionary or absurd, depending on one\'s definition of creativity. At the heart of this debate lies a fundamental question: does art require intentionality, or is it defined solely by its impact on the viewer?\n\nIn 2018, a portrait generated by a generative adversarial network (GAN) sold at Christie\'s auction house for $432,500 — far exceeding its estimated price of $7,000 to $10,000. The work, titled "Portrait of Edmond de Belamy," was created by feeding the algorithm 15,000 portraits painted between the 14th and 20th centuries. The AI generated an entirely new image that bore no direct resemblance to any single training input, yet possessed the aesthetic qualities associated with classical portraiture.\n\nPhilosopher Margaret Boden distinguishes between three types of creativity: exploratory (working within established rules), combinational (making unexpected connections between ideas), and transformational (changing the rules themselves). By these criteria, current AI systems demonstrate exploratory and combinational creativity but fall short of transformational creativity. They can produce novel outputs within learned parameters but cannot fundamentally reimagine the parameters themselves.\n\nMusician and producer Brian Eno has argued that the creative value of AI lies not in replacing human artists but in functioning as a new kind of instrument — one that generates possibilities a human creator then selects from and refines. This "curator model" of AI creativity positions the human as an editor rather than a generator, a role Eno suggests is equally creative. Indeed, he notes that much of what we call human creativity involves selecting from possibilities generated by chance, experience, or unconscious processes.\n\nCritics of AI art raise several objections. First, they argue that art derives meaning from the artist\'s lived experience and emotional state — qualities that machines fundamentally lack. A painting of suffering by someone who has suffered carries different weight than one generated by pattern recognition. Second, they note that AI systems are trained on human-created works, raising questions about originality and intellectual property. When an AI produces an image "in the style of" a living artist, who owns the result?\n\nDespite these philosophical objections, the practical integration of AI into creative industries continues to accelerate. Architecture firms use generative algorithms to explore thousands of design variations; film studios employ AI to generate realistic visual effects; and music producers increasingly incorporate AI-generated melodies and harmonies into their compositions. Whether these applications constitute "art" may ultimately be less important than their undeniable impact on the creative landscape.',
    questions: [
      { stem: 'The author presents the debate about AI art as centring on:', options: ['Whether AI can pass the Turing test', 'Whether art requires intentionality or is defined by impact', 'Whether AI will make human artists unemployed', 'Whether AI art should be exhibited in museums'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: The "Portrait of Edmond de Belamy" was a copy of a specific historical painting.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'According to Boden\'s framework, current AI systems cannot:', options: ['Work within established artistic rules', 'Make unexpected connections between ideas', 'Fundamentally change the rules of creativity', 'Produce aesthetically pleasing outputs'], correctIndex: 2 },
      { stem: 'Brian Eno suggests that AI is most valuable as:', options: ['A replacement for less talented artists', 'A tool that generates options for human curators', 'A way to preserve classical art styles', 'A teacher of music theory'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Critics believe AI-generated art about suffering has the same emotional weight as human art about suffering.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'The author\'s conclusion suggests that:', options: ['AI will never create true art', 'The definition of art will need to change', 'The practical impact of AI on creativity matters more than philosophical definitions', 'Human artists should embrace AI or become irrelevant'], correctIndex: 2 },
    ],
  },
]

// # ═══════════════════════════════════════════════════════════════════
// # LISTENING CONTENT — 4 parts per test, indexed by slot position
// # ═══════════════════════════════════════════════════════════════════

export const LISTENING_CONTENT: ListeningItemContent[] = [
  // # Part 1 — Everyday conversation, gap fill
  {
    type: 'gap_fill',
    stem: 'Gym Membership Enquiry\n\nYou will hear a phone conversation between a customer and a gym receptionist.',
    transcript: '"Hello, Riverside Fitness Centre. How can I help?" "Hi, I\'d like to enquire about gym membership. My name is Sarah Bergman." "Could you spell that for me?" "S-A-R-A-H, and the surname is B-E-R-G-M-A-N." "And your address?" "It\'s 47 Oakwood Road, Westbury." "What type of membership are you interested in?" "I\'d like the off-peak membership — the one that\'s valid Monday to Friday before 5 pm." "That\'s £35 per month. Would you like to add swimming pool access? That\'s an extra £12." "Yes, please."',
    gaps: [
      { correctAnswer: 'Bergman', acceptedAlternatives: ['bergman'], hint: 'Customer surname (spelled out)' },
      { correctAnswer: 'Oakwood', acceptedAlternatives: ['oakwood'], hint: 'Street name' },
      { correctAnswer: '5', acceptedAlternatives: ['five', '17:00'], hint: 'Time in afternoon' },
      { correctAnswer: '35', acceptedAlternatives: ['thirty-five'], hint: 'Monthly cost in pounds' },
    ],
  },
  // # Part 2 — Monologue on everyday topic, MCQ
  {
    type: 'mcq',
    stem: 'Welcome Talk at a Conference\n\nYou will hear a speaker giving practical information at the start of a conference.',
    transcript: '"Good morning everyone, and welcome to the annual Technology in Education Conference. Before we begin, let me go over some practical information. The conference runs for three days, and there are six keynote presentations, all of which will be held in the Main Auditorium on the ground floor. In addition, there are over forty breakout sessions spread across three buildings. You\'ll find the full schedule in your delegate packs — not on the app this year, I\'m afraid, as we\'ve had some technical difficulties. Lunch will be served in the Garden Terrace restaurant between 12:30 and 2pm. Please note that the restaurant on the second floor is reserved for VIP guests and speakers only."',
    options: [
      { text: 'In the Garden Terrace', misconception: 'The Garden Terrace is where lunch is served' },
      { text: 'In the Main Auditorium on the ground floor', misconception: null },
      { text: 'Across three different buildings', misconception: 'Breakout sessions are in three buildings, not keynotes' },
      { text: 'On the second floor restaurant', misconception: 'The second floor restaurant is for VIP guests only' },
    ],
    correctIndex: 1,
  },
  // # Part 3 — Academic discussion, MCQ
  {
    type: 'mcq',
    stem: 'Presentation Planning Discussion\n\nYou will hear two students discussing how to organise their group presentation.',
    transcript: '"OK, so we need to finalise our group presentation on renewable energy policy. How do you want to divide it up?" "Well, there are four of us, so we could each take a different energy source — solar, wind, nuclear, and hydro." "I was actually thinking we should organise it thematically rather than by energy source. So one person covers the economics, another the environmental impact, a third does the politics, and the last one handles the technology." "That\'s better, actually. It avoids repetition — with the first approach, we\'d each end up talking about costs and environmental impact separately." "Agreed. I\'ll take the technology section since that\'s my strongest area."',
    options: [
      { text: 'By energy source — one person per source', misconception: 'This was the first suggestion but was rejected' },
      { text: 'By theme — economics, environment, politics, technology', misconception: null },
      { text: 'Chronologically — past, present, future', misconception: 'This structure was not discussed' },
      { text: 'Each person covers all aspects of one country\'s policy', misconception: 'Country-by-country was not proposed' },
    ],
    correctIndex: 1,
  },
  // # Part 4 — Academic lecture, gap fill
  {
    type: 'gap_fill',
    stem: 'Lecture on Ocean Acidification\n\nYou will hear part of a university lecture about the effects of carbon dioxide on oceans.',
    transcript: '"Today I want to talk about ocean acidification — sometimes called the evil twin of climate change. When carbon dioxide dissolves in seawater, it forms carbonic acid, which lowers the ocean\'s pH level. Since the Industrial Revolution, ocean pH has decreased by approximately 0.1 units — from 8.2 to about 8.1. Now, that might sound small, but because the pH scale is logarithmic, this actually represents a 26% increase in acidity. The organisms most immediately affected are those that build shells or skeletons from calcium carbonate — corals, molluscs, and certain types of plankton. As the water becomes more acidic, it becomes harder for these organisms to form their protective structures."',
    gaps: [
      { correctAnswer: 'evil', acceptedAlternatives: ['equally evil'], hint: 'Metaphor describing its relationship to climate change' },
      { correctAnswer: '0.1', acceptedAlternatives: ['zero point one'], hint: 'Amount of pH decrease' },
      { correctAnswer: 'logarithmic', acceptedAlternatives: [], hint: 'Type of mathematical scale' },
      { correctAnswer: 'plankton', acceptedAlternatives: ['phytoplankton', 'zooplankton'], hint: 'Tiny marine organisms' },
    ],
  },
]

// # ═══════════════════════════════════════════════════════════════════
// # TEST 2 — Reading Passages
// # ═══════════════════════════════════════════════════════════════════

const READING_CONTENT_2: ReadingPassageContent[] = [
  {
    title: 'The Hidden Cost of Fast Fashion',
    passage: 'The fashion industry is the second-largest polluter in the world, behind only the oil industry. Fast fashion — the rapid production of cheap clothing that mimics current luxury trends — has transformed how people buy and wear clothes, but at a significant environmental and human cost.\n\nThe average consumer now buys 60% more clothing than they did fifteen years ago, but keeps each item for only half as long. In the United Kingdom alone, approximately 350,000 tonnes of clothing end up in landfill each year. Synthetic fabrics, which make up 60% of all clothing, can take up to 200 years to decompose, releasing microplastics into soil and water systems throughout the process.\n\nThe human cost is equally troubling. The collapse of the Rana Plaza garment factory in Bangladesh in 2013, which killed 1,134 workers, drew international attention to the dangerous conditions in which much of the world\'s clothing is produced. Despite promises of reform, a 2022 investigation by the Clean Clothes Campaign found that only 7% of major fashion brands could demonstrate that workers in their supply chains were paid a living wage.\n\nWater consumption in fashion production is staggering. It takes approximately 2,700 litres of water to produce a single cotton T-shirt — enough drinking water for one person for two and a half years. Cotton farming is also heavily dependent on pesticides, accounting for 16% of global insecticide use despite covering only 2.4% of the world\'s arable land.\n\nSome companies are responding to these concerns. The "circular fashion" movement promotes designing clothes for durability, reuse, and eventual recycling. However, critics argue that truly sustainable fashion requires consuming less, not simply consuming differently.',
    questions: [
      { stem: 'TRUE, FALSE, or NOT GIVEN: The fashion industry is the world\'s largest polluter.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: People now keep clothing items longer than fifteen years ago.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Synthetic fabrics make up more than half of all clothing.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: The Rana Plaza collapse was caused by an earthquake.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
      { stem: 'Cotton farming uses 16% of global:', options: ['Water resources', 'Insecticide', 'Arable land', 'Agricultural budget'], correctIndex: 1 },
      { stem: 'What does the "circular fashion" movement promote?', options: ['Buying more clothes at lower prices', 'Designing clothes for durability and reuse', 'Banning synthetic fabrics', 'Only wearing natural fibres'], correctIndex: 1 },
    ],
  },
  {
    title: 'The Neuroscience of Decision-Making',
    passage: 'A) Every day, the average person makes approximately 35,000 decisions. For centuries, philosophers assumed that good decisions were the product of pure rational thinking. Modern neuroscience has revealed a far more complex picture.\n\nB) Research by neuroscientist Antonio Damasio studied patients with damage to the ventromedial prefrontal cortex. These patients retained their intelligence and logical reasoning abilities, yet they became unable to make effective decisions in daily life. Damasio concluded that emotions are not obstacles to good decision-making but essential components of it.\n\nC) The concept of "decision fatigue" has gained research support. A famous study of Israeli judges found that the likelihood of a favourable parole decision dropped from 65% at the start of a session to nearly 0% just before a food break, then jumped back to 65% after the break.\n\nD) Psychologist Daniel Kahneman proposed that the brain operates two thinking systems. System 1 is fast, automatic, and intuitive. System 2 is slow, deliberate, and analytical. Cognitive biases arise when System 1 handles decisions that require System 2.\n\nE) One practical implication is "choice architecture" — designing environments that help people make better decisions. Placing healthy food at eye level, automatically enrolling employees in pension schemes, or presenting organ donation as the default are all examples of "nudges."\n\nF) Critics argue that nudging is paternalistic. Supporters counter that every choice environment is designed somehow, and designing for better outcomes is responsible policy-making.',
    questions: [
      { stem: 'What did Damasio\'s research demonstrate?', options: ['Intelligence is more important than emotion', 'Emotions are essential for effective decision-making', 'Brain damage improves reasoning', 'Emotions always lead to poor decisions'], correctIndex: 1 },
      { stem: 'Which paragraph describes decision fatigue in judges?', options: ['B', 'C', 'D', 'E'], correctIndex: 1 },
      { stem: 'Cognitive biases occur when:', options: ['System 2 overrides System 1', 'System 1 handles decisions requiring System 2', 'Both systems activate simultaneously', 'Neither system is engaged'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: The Israeli judges were deliberately biased.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: '"Choice architecture" works because it:', options: ['Forces people to think more carefully', 'Aligns with how the brain processes decisions', 'Removes choices from individuals', 'Uses financial incentives'], correctIndex: 1 },
      { stem: 'Critics of nudging argue it is:', options: ['Too expensive', 'Ineffective', 'Paternalistic and manipulative', 'Only useful in healthcare'], correctIndex: 2 },
    ],
  },
  {
    title: 'The Future of Work: Automation, AI, and Human Adaptability',
    passage: 'Predictions about technology destroying jobs are as old as technology itself. In 1930, Keynes predicted that by 2030, humanity would work only fifteen hours per week. Nearly a century later, the average working week remains close to forty hours — yet the nature of work has transformed beyond recognition.\n\nThe current wave of anxiety centres on artificial intelligence. A 2013 study by Frey and Osborne estimated that 47% of US jobs were at high risk of automation. The OECD\'s 2019 analysis took a task-based approach, finding only 14% of jobs at high risk — because most jobs contain a bundle of tasks, only some of which are automatable.\n\nHistorically, technological revolutions have destroyed specific jobs while creating entirely new categories. The automobile eliminated carriage drivers but created mechanics, road engineers, and an entire suburban economy. The challenge is that displaced workers rarely fill the new roles.\n\nEconomist David Autor identified "Moravec\'s paradox": tasks easy for humans are hard for machines, and vice versa. A five-year-old can tie shoelaces and navigate unfamiliar rooms — tasks challenging the most advanced AI. This suggests jobs requiring physical dexterity, social intelligence, and common sense may be most resistant to automation.\n\nThe policy debate has shifted to how societies should manage the transition. Finland\'s basic income experiment found higher wellbeing and modest employment improvements, though critics noted the small sample. The most important insight is that human adaptability should not be underestimated.',
    questions: [
      { stem: 'Keynes\'s prediction about working hours was:', options: ['Essentially correct', 'Too pessimistic', 'Wrong about hours but right about transformation', 'Ignored entirely'], correctIndex: 2 },
      { stem: 'The key difference between Frey & Osborne and the OECD was:', options: ['Different countries', 'OECD looked at tasks, not whole jobs', 'Frey & Osborne used newer data', 'OECD focused on manufacturing'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: The author believes 47% of US jobs will be automated.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: '"Moravec\'s paradox" suggests jobs most resistant to automation require:', options: ['Advanced maths', 'Physical dexterity, social intelligence, common sense', 'Extensive education', 'Programming skills'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Finland\'s experiment proved UBI increases employment.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'The author\'s main conclusion is that:', options: ['Automation will cause mass unemployment', 'Human adaptability is strong but institutions must keep pace', 'UBI is the only solution', 'Technology predictions are always wrong'], correctIndex: 1 },
    ],
  },
]

// # ═══════════════════════════════════════════════════════════════════
// # TEST 3 — Reading Passages
// # ═══════════════════════════════════════════════════════════════════

const READING_CONTENT_3: ReadingPassageContent[] = [
  {
    title: 'The Growing Crisis of Water Scarcity',
    passage: 'Fresh water makes up only 2.5% of the Earth\'s total water supply. Of that, approximately 70% is locked in glaciers, leaving less than 1% readily available for human use. With demand increasing by roughly 1% per year, water scarcity has emerged as one of the most pressing challenges of the 21st century.\n\nAccording to the UN, 2.2 billion people lack access to safely managed drinking water. Cape Town came within weeks of running out of water entirely in 2018. California has experienced repeated drought emergencies.\n\nAgriculture accounts for approximately 70% of global fresh water withdrawals. Traditional flood irrigation loses up to 50% to evaporation. Modern drip irrigation reduces losses to below 10% but remains expensive.\n\nDesalination is expanding rapidly. Israel has invested so heavily that it now has a water surplus. However, desalination requires substantial energy and produces brine that can damage marine ecosystems.\n\nExperts argue the solution lies in using existing water more efficiently. A kilogram of beef requires approximately 15,000 litres of water, compared to 1,500 litres for wheat. Shifting dietary patterns could significantly reduce demand.',
    questions: [
      { stem: 'TRUE, FALSE, or NOT GIVEN: Most of Earth\'s fresh water is easily accessible.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Cape Town ran out of water in 2018.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Agriculture uses about 70% of global fresh water.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
      { stem: 'Israel now has a water surplus due to:', options: ['Heavy rainfall', 'Desalination and recycling investment', 'Reduced population', 'International aid'], correctIndex: 1 },
      { stem: 'The author suggests the best approach is:', options: ['Building more dams', 'Using existing water more efficiently', 'Relying entirely on desalination', 'Reducing population'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Drip irrigation is widely used across Africa.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
    ],
  },
  {
    title: 'The Evolution of Money',
    passage: 'A) Money is not a physical thing but an agreement — a shared belief that certain objects or numbers have value.\n\nB) The earliest form was commodity money — cattle, shells, salt. The word "salary" derives from the Latin "salarium," referring to salt rations paid to Roman soldiers.\n\nC) Metal coins, first minted in Lydia around 600 BCE, solved portability problems. Paper money emerged in China during the Tang Dynasty.\n\nD) Fractional reserve banking multiplied the money supply — a £100 deposit could support £900 in loans. This enabled unprecedented growth but created systemic fragility.\n\nE) Digital payments are displacing cash. In Sweden, cash accounts for less than 1% of transactions. M-Pesa has transformed financial inclusion in East Africa.\n\nF) Cryptocurrencies operate without central authority. Supporters say this removes the need to trust governments. Critics point to price volatility, energy consumption, and illegal use.',
    questions: [
      { stem: 'Which paragraph discusses the earliest forms of money?', options: ['A', 'B', 'C', 'D'], correctIndex: 1 },
      { stem: 'Which paragraph explains fractional reserve banking?', options: ['C', 'D', 'E', 'F'], correctIndex: 1 },
      { stem: '"Salary" is related to:', options: ['Gold', 'Salt rations', 'Greek coins', 'Chinese banking'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Europeans immediately adopted paper money from China.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: In Sweden, most shops no longer accept cash.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
      { stem: 'The passage defines money primarily as:', options: ['Physical coins and notes', 'A shared agreement about value', 'A government resource', 'A modern invention'], correctIndex: 1 },
    ],
  },
  {
    title: 'Epigenetics: Beyond the Genetic Code',
    passage: 'The central dogma of molecular biology held that information flows from DNA to RNA to protein, and that the DNA sequence is fixed for life. Epigenetics has revealed modifications that alter gene expression without changing the DNA sequence.\n\nDNA methylation silences genes by attaching methyl groups. Histone modification turns genes on or off. Together, these determine which genes are active in which cells.\n\nThese modifications can be influenced by environment. A study of the Dutch Hunger Winter (1944-1945) found that children conceived during famine had distinct epigenetic changes persisting into adulthood — higher rates of obesity, cardiovascular disease, and mental health problems.\n\nSome epigenetic modifications appear heritable. Studies in mice showed offspring of traumatised males exhibit anxiety behaviours and corresponding epigenetic changes, even when raised by non-traumatised foster parents.\n\nEpigenetic drugs have been approved for cancer treatment, reactivating tumour-suppressor genes. Researchers are exploring applications for Alzheimer\'s and PTSD. However, the field faces challenges: patterns vary between cell types, and mechanisms of transgenerational inheritance remain poorly understood.',
    questions: [
      { stem: 'The "central dogma" describes:', options: ['How epigenetics works', 'One-directional information flow from DNA to protein', 'Environmental effects on genes', 'Genetic mutation'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: Epigenetic modifications change the DNA sequence.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'The Dutch Hunger Winter study showed:', options: ['Famine has no lasting effects', 'Environmental conditions at conception cause lasting epigenetic changes', 'DNA sequences changed during famine', 'Only mothers were affected'], correctIndex: 1 },
      { stem: 'Mouse trauma studies are controversial because they suggest:', options: ['Genetic mutations increase with stress', 'Epigenetic changes from experience can pass to offspring', 'Mice are poor models for humans', 'Trauma always causes genetic damage'], correctIndex: 1 },
      { stem: 'TRUE, FALSE, or NOT GIVEN: All epigenetic drugs work for Alzheimer\'s.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
      { stem: 'The author\'s overall tone is:', options: ['Dismissive', 'Cautiously optimistic', 'Highly enthusiastic', 'Neutral'], correctIndex: 1 },
    ],
  },
]

// # ═══════════════════════════════════════════════════════════════════
// # TEST 2 — Listening Content
// # ═══════════════════════════════════════════════════════════════════

const LISTENING_CONTENT_2: ListeningItemContent[] = [
  {
    type: 'gap_fill',
    stem: 'Renting a Storage Unit\n\nYou will hear a conversation between a customer and a storage facility manager.',
    transcript: '"Good morning, Safe & Secure Storage. How can I help?" "Hi, I\'m moving house next month and I need to store furniture for about six weeks." "Medium units are £28 per week, with a one-off admin fee of £45." "Is there 24-hour access?" "Access hours are 6am to 10pm, seven days a week. We have CCTV and individual alarms on every unit."',
    gaps: [
      { correctAnswer: '28', acceptedAlternatives: ['twenty-eight'], hint: 'Weekly cost in pounds' },
      { correctAnswer: 'admin', acceptedAlternatives: ['administration'], hint: 'Type of one-off fee' },
      { correctAnswer: '10', acceptedAlternatives: ['ten'], hint: 'Closing time (pm)' },
      { correctAnswer: 'alarms', acceptedAlternatives: ['alarm'], hint: 'Security feature on each unit' },
    ],
  },
  {
    type: 'mcq',
    stem: 'Museum Tour Introduction\n\nYou will hear a museum guide speaking to visitors.',
    transcript: '"Welcome to the National Maritime Museum. The museum was founded in 1934 and houses over two million items. Our tour covers three galleries: the Age of Exploration (15th-18th century), Naval Warfare (with a full-scale replica gun deck), and Ocean Science (opened last year). The tour lasts ninety minutes. Photography is allowed except in the Magellan map room."',
    options: [
      { text: 'In 1834', misconception: 'Founded in 1934, not 1834' },
      { text: 'In 1934', misconception: null },
      { text: 'In 2023', misconception: '2023 relates to Ocean Science gallery' },
      { text: 'In the 15th century', misconception: 'Relates to Age of Exploration' },
    ],
    correctIndex: 1,
  },
  {
    type: 'mcq',
    stem: 'Research Methods Discussion\n\nYou will hear a student and professor discussing methodology.',
    transcript: '"I was thinking of using focus groups to understand how teenagers feel about social media restrictions." "There\'s a risk — teenagers might not express their true opinions in front of peers. I\'d recommend anonymous online surveys as your primary method, supplemented by individual interviews." "Would I need ethical approval for working with minors?" "Absolutely. You\'ll need parental consent forms for everyone under 16."',
    options: [
      { text: 'Teenagers might say what others expect rather than their true views', misconception: null },
      { text: 'Focus groups are too expensive', misconception: 'Cost not mentioned' },
      { text: 'The professor dislikes qualitative research', misconception: 'Interviews are qualitative' },
      { text: 'Focus groups take too long', misconception: 'Time not discussed' },
    ],
    correctIndex: 0,
  },
  {
    type: 'gap_fill',
    stem: 'Lecture on Behavioural Economics\n\nYou will hear part of a university lecture.',
    transcript: '"Loss aversion states that people feel losing something approximately two times more intensely than gaining the same thing. A study found teachers whose bonuses were paid in advance and clawed back if targets weren\'t met worked harder than those offered future bonuses. The fear of losing something already received was more motivating than the prospect of gaining something new."',
    gaps: [
      { correctAnswer: 'two', acceptedAlternatives: ['2', 'twice'], hint: 'Loss vs gain intensity multiplier' },
      { correctAnswer: 'advance', acceptedAlternatives: ['upfront'], hint: 'When the bonus was paid' },
      { correctAnswer: 'fear', acceptedAlternatives: ['threat', 'prospect'], hint: 'Emotion of losing' },
      { correctAnswer: 'prospect', acceptedAlternatives: ['possibility', 'hope'], hint: 'Possibility of future gain' },
    ],
  },
]

// # ═══════════════════════════════════════════════════════════════════
// # TEST 3 — Listening Content
// # ═══════════════════════════════════════════════════════════════════

const LISTENING_CONTENT_3: ListeningItemContent[] = [
  {
    type: 'gap_fill',
    stem: 'Booking a Holiday Cottage\n\nYou will hear a phone conversation between a customer and a holiday rental agent.',
    transcript: '"Hello, Lake District Cottages. How can I help?" "Hi, I\'d like to book a cottage for a week in August. There will be four adults and two children." "We have Birch Cottage available from the 12th to the 19th. It sleeps six people and has three bedrooms." "How much is it?" "In August it\'s £850 per week, and there\'s a refundable deposit of £200." "Is there parking?" "Yes, there\'s a private car park for up to two vehicles."',
    gaps: [
      { correctAnswer: '6', acceptedAlternatives: ['six'], hint: 'Maximum occupancy' },
      { correctAnswer: '850', acceptedAlternatives: ['eight hundred and fifty'], hint: 'Weekly rate in pounds' },
      { correctAnswer: 'deposit', acceptedAlternatives: ['security deposit'], hint: 'Refundable payment' },
      { correctAnswer: '2', acceptedAlternatives: ['two'], hint: 'Number of parking spaces' },
    ],
  },
  {
    type: 'mcq',
    stem: 'Library Orientation\n\nYou will hear a librarian speaking to new members.',
    transcript: '"Welcome to Greenfield Community Library. Your membership card gives you access to all physical resources. You can borrow up to twelve items at a time, for a maximum of three weeks. E-books and audiobooks are available through our app. Late returns incur a fine of 20p per day per item. We also have free Wi-Fi and six bookable study rooms on the first floor."',
    options: [
      { text: 'Up to 6 items for 2 weeks', misconception: 'It is 12 items for 3 weeks' },
      { text: 'Up to 12 items for 3 weeks', misconception: null },
      { text: 'Up to 12 items for 2 weeks', misconception: 'Duration is 3 weeks' },
      { text: 'Unlimited items for 3 weeks', misconception: 'Limit is 12 items' },
    ],
    correctIndex: 1,
  },
  {
    type: 'mcq',
    stem: 'Dissertation Methodology Discussion\n\nYou will hear two postgraduate students discussing their research.',
    transcript: '"How\'s your dissertation going?" "I\'m stuck on methodology. I\'ve done twenty interviews but my supervisor says I need to triangulate." "What does she suggest?" "She wants me to add a questionnaire to validate the themes from my interviews. If both methods produce similar findings, it strengthens the conclusions." "I\'m doing it the other way round — I started with a large survey and now I\'m following up with interviews."',
    options: [
      { text: 'To replace the interviews with a more reliable method', misconception: 'Both methods are used together' },
      { text: 'To confirm interview findings using a different method', misconception: null },
      { text: 'To reduce the number of interviews needed', misconception: 'Interviews are already complete' },
      { text: 'To save time by using faster data collection', misconception: 'Time not mentioned' },
    ],
    correctIndex: 1,
  },
  {
    type: 'gap_fill',
    stem: 'Lecture on Habit Formation\n\nYou will hear part of a university lecture on behavioural psychology.',
    transcript: '"Research suggests forming a new habit takes an average of sixty-six days, not the twenty-one days that popular culture claims. The process follows the habit loop: a cue triggers the behaviour, which produces a reward. Breaking bad habits requires identifying the cue that triggers the unwanted behaviour. Implementation intentions — \'when X happens, I will do Y\' — have been shown to double the success rate of behaviour change. The most effective strategies combine environmental design with specific planning."',
    gaps: [
      { correctAnswer: 'habit', acceptedAlternatives: ['habitual'], hint: 'Type of loop (cue-behaviour-reward)' },
      { correctAnswer: 'cue', acceptedAlternatives: ['trigger', 'stimulus'], hint: 'What triggers the behaviour' },
      { correctAnswer: 'double', acceptedAlternatives: ['increase'], hint: 'How much success rate improves' },
      { correctAnswer: 'design', acceptedAlternatives: ['changes', 'modification'], hint: 'Changing surroundings strategically' },
    ],
  },
]

// # ═══════════════════════════════════════════════════════════════════
// # Test set access functions — used by the content API
// # ═══════════════════════════════════════════════════════════════════

const ALL_READING_TESTS = [READING_CONTENT, READING_CONTENT_2, READING_CONTENT_3]
const ALL_LISTENING_TESTS = [LISTENING_CONTENT, LISTENING_CONTENT_2, LISTENING_CONTENT_3]

// # Get reading content for a specific test number (0-indexed, wraps around).
export function getReadingTestSet(testNum: number): ReadingPassageContent[] {
  return ALL_READING_TESTS[testNum % ALL_READING_TESTS.length]!
}

// # Get listening content for a specific test number (0-indexed, wraps around).
export function getListeningTestSet(testNum: number): ListeningItemContent[] {
  return ALL_LISTENING_TESTS[testNum % ALL_LISTENING_TESTS.length]!
}

// # Total available test sets.
export const READING_TEST_COUNT = ALL_READING_TESTS.length
export const LISTENING_TEST_COUNT = ALL_LISTENING_TESTS.length
