// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS ACADEMIC READING — Test 3 (3 passages, 20 questions)
// # ═══════════════════════════════════════════════════════════════════════════

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_READING_TEST3: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 1 — "Water Scarcity" (B1)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.t3.01', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'The Growing Crisis of Water Scarcity',
      passage: 'Fresh water makes up only 2.5% of the Earth\'s total water supply. Of that small fraction, approximately 70% is locked in glaciers and ice caps, leaving less than 1% of the planet\'s water readily available for human use. With global demand for water increasing by roughly 1% per year, water scarcity has emerged as one of the most pressing challenges of the 21st century.\n\nAccording to the United Nations, 2.2 billion people — nearly one in three globally — lack access to safely managed drinking water. The situation is most critical in sub-Saharan Africa and South Asia, but water stress is increasingly affecting developed nations too. Cape Town, South Africa, came within weeks of running out of water entirely in 2018, in an event known as "Day Zero." California has experienced repeated drought emergencies, and southern Europe faces increasingly severe summer shortages.\n\nAgriculture is by far the largest consumer of fresh water, accounting for approximately 70% of global withdrawals. Much of this water is used inefficiently — traditional flood irrigation can lose up to 50% of water to evaporation before it reaches crop roots. Modern drip irrigation systems reduce losses to below 10%, but the technology remains expensive and is not widely adopted in the regions that need it most.\n\nDesalination — removing salt from seawater to produce fresh water — is expanding rapidly. Saudi Arabia, which has virtually no natural fresh water sources, produces over 50% of its drinking water through desalination. Israel has invested so heavily in desalination and water recycling that it now has a water surplus. However, desalination requires substantial energy and produces a brine by-product that can damage marine ecosystems if not managed carefully.\n\nExperts increasingly argue that the solution to water scarcity lies not in finding new sources but in using existing water more efficiently and reducing waste. The concept of "water footprint" — the total volume of water used to produce goods — is gaining attention. A single kilogram of beef requires approximately 15,000 litres of water to produce, compared to 1,500 litres for a kilogram of wheat. Simply shifting dietary patterns could significantly reduce water demand.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: Most of Earth\'s fresh water is easily accessible for human use.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Cape Town actually ran out of water in 2018.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Agriculture uses approximately 70% of global fresh water.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Drip irrigation is widely used across sub-Saharan Africa.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'According to the passage, Israel:', options: ['Has no desalination plants', 'Now has a water surplus', 'Relies entirely on rainfall', 'Imports water from neighbouring countries'], correctIndex: 1 },
        { stem: 'The author suggests that the most effective approach to water scarcity is:', options: ['Building more dams', 'Using existing water more efficiently', 'Relying entirely on desalination', 'Reducing the global population'], correctIndex: 1 },
      ],
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 2 — "The Evolution of Money" (B2)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.t3.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'The Evolution of Money',
      passage: 'A) Money is so fundamental to modern life that most people rarely pause to consider what it actually is. At its core, money is not a physical thing but an agreement — a shared belief that certain objects or numbers have value. This consensus has taken radically different forms throughout human history, and the latest transformation may be the most significant yet.\n\nB) The earliest known form of money was commodity money — items with intrinsic value used as mediums of exchange. Cattle, shells, salt, and grain all served this purpose in various cultures. The word "salary" derives from the Latin "salarium," believed to refer to the salt rations paid to Roman soldiers. Commodity money\'s great weakness was portability: transporting large quantities of grain or cattle to make a major purchase was impractical.\n\nC) Metal coins, first minted in Lydia (modern Turkey) around 600 BCE, solved the portability problem. Coins were durable, divisible, and easily recognised. They remained the dominant form of money for over two millennia. Paper money emerged in China during the Tang Dynasty (7th century CE), initially as receipts for coin deposits. The concept spread to Europe through the accounts of Marco Polo, though Europeans were initially sceptical.\n\nD) The modern banking system introduced a crucial innovation: fractional reserve banking. Banks discovered they could lend out a portion of their deposits because not all depositors would demand their money simultaneously. This effectively multiplied the money supply — a £100 deposit could support £900 in loans. While this system enabled unprecedented economic growth, it also created systemic fragility, as demonstrated by periodic bank runs.\n\nE) Digital payments have steadily displaced physical cash. In Sweden, cash now accounts for less than 1% of all transactions, and many shops no longer accept it. Mobile payment systems such as M-Pesa have transformed financial inclusion in East Africa, where millions of people who lacked bank accounts can now send and receive money via basic mobile phones.\n\nF) Cryptocurrencies represent the most radical departure from traditional money. Bitcoin, launched in 2009, operates without any central authority — transactions are verified by a distributed network of computers using blockchain technology. Supporters argue that this removes the need to trust governments and banks, which have historically debased currencies through inflation. Critics point to extreme price volatility, enormous energy consumption, and frequent use in illegal transactions as fundamental flaws.',
      source: 'Original content',
      questions: [
        { stem: 'Which paragraph discusses the earliest forms of money?', options: ['Paragraph A', 'Paragraph B', 'Paragraph C', 'Paragraph D'], correctIndex: 1 },
        { stem: 'Which paragraph explains how banks create money through lending?', options: ['Paragraph C', 'Paragraph D', 'Paragraph E', 'Paragraph F'], correctIndex: 1 },
        { stem: 'According to the passage, the word "salary" is related to:', options: ['The Latin word for gold', 'Salt rations paid to Roman soldiers', 'The Greek word for coins', 'A Chinese banking term'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Europeans immediately adopted paper money after learning about it from China.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: In Sweden, most shops no longer accept cash payments.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'The author presents cryptocurrency as:', options: ['The inevitable future of money', 'A radical innovation with both supporters and critics', 'A failed experiment', 'Superior to all previous forms of money'], correctIndex: 1 },
        { stem: 'The passage defines money primarily as:', options: ['Physical coins and notes', 'A shared agreement about value', 'A government-controlled resource', 'A modern banking invention'], correctIndex: 1 },
      ],
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 3 — "Epigenetics" (C1)
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.t3.03', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      title: 'Epigenetics: Beyond the Genetic Code',
      passage: 'For much of the 20th century, the central dogma of molecular biology held that the flow of information in cells was strictly one-directional: DNA makes RNA, RNA makes protein, and the DNA sequence — the genetic code inherited at conception — is fixed for life. While the core of this model remains valid, the emerging field of epigenetics has revealed an additional layer of biological complexity that challenges the notion of genetic determinism.\n\nEpigenetics — literally "above genetics" — refers to modifications that alter gene expression without changing the underlying DNA sequence. The most well-studied mechanism is DNA methylation, in which methyl groups attach to specific positions on the DNA molecule, effectively silencing the genes at those locations. Histone modification — chemical changes to the proteins around which DNA is wound — provides another mechanism for turning genes on or off. Together, these modifications create a layer of instruction that sits on top of the genetic code, determining which genes are active in which cells.\n\nWhat makes epigenetics revolutionary is the discovery that these modifications can be influenced by environmental factors. Diet, stress, exposure to toxins, and even social interactions have all been shown to alter epigenetic patterns. A landmark study of the Dutch Hunger Winter — a famine in the Netherlands during 1944-1945 — found that children conceived during the famine had distinct epigenetic modifications that persisted into adulthood, leading to higher rates of obesity, cardiovascular disease, and mental health problems decades later.\n\nPerhaps most controversially, some epigenetic modifications appear to be heritable — passed from parent to offspring without any change to the DNA sequence itself. Studies in mice have demonstrated that the offspring of traumatised males show anxiety-related behaviours and corresponding epigenetic changes, even though they were raised by non-traumatised foster parents. If similar mechanisms operate in humans — and preliminary evidence suggests they might — the implications for our understanding of inheritance are profound.\n\nThe therapeutic potential of epigenetics is considerable. Unlike genetic mutations, epigenetic modifications are potentially reversible. Several epigenetic drugs have already been approved for cancer treatment, working by reactivating tumour-suppressor genes that cancer cells had silenced. Researchers are exploring epigenetic approaches to conditions ranging from Alzheimer\'s disease to post-traumatic stress disorder.\n\nHowever, the field faces significant challenges. Epigenetic patterns vary between cell types, making them difficult to study in living humans. The statistical methods used in many epigenetic studies have been criticised for producing false positives, and the mechanisms of transgenerational inheritance in mammals remain poorly understood. The scientific community urges caution against overinterpreting preliminary findings, noting that the field is still in its early stages.',
      source: 'Original content',
      questions: [
        { stem: 'The "central dogma" of molecular biology describes:', options: ['How epigenetic modifications work', 'The one-directional flow of information from DNA to protein', 'How environmental factors affect genes', 'The process of genetic mutation'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Epigenetic modifications change the DNA sequence itself.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The Dutch Hunger Winter study demonstrated that:', options: ['Famine has no lasting health effects', 'Environmental conditions during conception can cause lasting epigenetic changes', 'DNA sequences changed during the famine', 'Only mothers\' health was affected'], correctIndex: 1 },
        { stem: 'The mouse studies on trauma inheritance are controversial because they suggest:', options: ['Genetic mutations increase with stress', 'Epigenetic changes from experience can be passed to offspring', 'Mice are poor models for human biology', 'Trauma always causes genetic damage'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: All epigenetic drugs have been proven effective for Alzheimer\'s disease.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The author believes epigenetics has the potential to overturn genetics entirely.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The author\'s overall tone is:', options: ['Dismissive — epigenetics is overhyped', 'Cautiously optimistic — promising but early-stage', 'Highly enthusiastic — a complete revolution', 'Neutral — presenting facts without opinion'], correctIndex: 1 },
      ],
      difficulty: 0.75,
    },
  },
]
