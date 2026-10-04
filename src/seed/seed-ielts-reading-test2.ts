// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS ACADEMIC READING — Test 2 (3 passages, 20 questions)
// # ═══════════════════════════════════════════════════════════════════════════
// # Second full set of reading passages for mock test rotation.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_READING_TEST2: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 1 — "The Hidden Cost of Fast Fashion" (B1)
  // # T/F/NG + MCQ — accessible, high-interest topic
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.t2.01', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'The Hidden Cost of Fast Fashion',
      passage: 'The fashion industry is the second-largest polluter in the world, behind only the oil industry. Fast fashion — the rapid production of cheap clothing that mimics current luxury trends — has transformed how people buy and wear clothes, but at a significant environmental and human cost.\n\nThe average consumer now buys 60% more clothing than they did fifteen years ago, but keeps each item for only half as long. In the United Kingdom alone, approximately 350,000 tonnes of clothing end up in landfill each year. Synthetic fabrics, which make up 60% of all clothing, can take up to 200 years to decompose, releasing microplastics into soil and water systems throughout the process.\n\nThe human cost is equally troubling. The collapse of the Rana Plaza garment factory in Bangladesh in 2013, which killed 1,134 workers, drew international attention to the dangerous conditions in which much of the world\'s clothing is produced. Despite promises of reform, a 2022 investigation by the Clean Clothes Campaign found that only 7% of major fashion brands could demonstrate that workers in their supply chains were paid a living wage.\n\nWater consumption in fashion production is staggering. It takes approximately 2,700 litres of water to produce a single cotton T-shirt — enough drinking water for one person for two and a half years. Cotton farming is also heavily dependent on pesticides, accounting for 16% of global insecticide use despite covering only 2.4% of the world\'s arable land.\n\nSome companies are responding to these concerns. The "circular fashion" movement promotes designing clothes for durability, reuse, and eventual recycling. Brands such as Patagonia offer lifetime repairs on their products and buy back used items for resale. However, critics argue that truly sustainable fashion requires consuming less, not simply consuming differently — a message that conflicts with the fundamental business model of the fashion industry.',
      source: 'Original content',
      questions: [
        { stem: 'TRUE, FALSE, or NOT GIVEN: The fashion industry is the world\'s largest polluter.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: People now keep clothing items longer than they did fifteen years ago.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Synthetic fabrics make up more than half of all clothing produced.', options: ['True', 'False', 'Not Given'], correctIndex: 0 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The Rana Plaza collapse was caused by an earthquake.', options: ['True', 'False', 'Not Given'], correctIndex: 2 },
        { stem: 'According to the passage, cotton farming uses 16% of global:', options: ['Water resources', 'Insecticide', 'Arable land', 'Agricultural budget'], correctIndex: 1 },
        { stem: 'What does the "circular fashion" movement promote?', options: ['Buying more clothes at lower prices', 'Designing clothes for durability and reuse', 'Banning synthetic fabrics entirely', 'Only wearing natural fibres'], correctIndex: 1 },
        { stem: 'The author\'s main argument is that:', options: ['Fashion brands are doing enough to address sustainability', 'Sustainable fashion requires buying less, not just differently', 'Only luxury brands are environmentally responsible', 'Consumers should only buy second-hand clothing'], correctIndex: 1 },
      ],
      difficulty: 0.45,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 2 — "The Neuroscience of Decision-Making" (B2)
  // # MCQ + T/F/NG — psychological/scientific argument
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.t2.02', type: 'reading_passage', level: 'B2', skill: 'reading',
    nodeIds: ['cando.b2.understand_argument'],
    payload: {
      title: 'The Neuroscience of Decision-Making',
      passage: 'A) Every day, the average person makes approximately 35,000 decisions, from trivial choices about what to eat for breakfast to significant ones about career moves and relationships. For centuries, philosophers assumed that good decisions were the product of pure rational thinking — weighing options logically and choosing the best one. Modern neuroscience has revealed a far more complex picture.\n\nB) Research by neuroscientist Antonio Damasio fundamentally challenged the rationalist view. He studied patients with damage to the ventromedial prefrontal cortex — a brain region involved in processing emotions. These patients retained their intelligence and logical reasoning abilities, yet they became unable to make effective decisions in their daily lives. They could analyse options endlessly but could not commit to a choice. Damasio concluded that emotions are not obstacles to good decision-making but essential components of it.\n\nC) The concept of "decision fatigue" has gained substantial research support. A famous study of Israeli judges found that the likelihood of a favourable parole decision dropped from 65% at the start of a session to nearly 0% just before a food break, then jumped back to 65% after the break. The judges were not consciously biased; their depleted mental resources defaulted to the safest option — denial.\n\nD) Psychologist Daniel Kahneman, who won the Nobel Prize in Economics in 2002, proposed that the human brain operates two thinking systems. System 1 is fast, automatic, and intuitive — it handles routine decisions with minimal effort. System 2 is slow, deliberate, and analytical — it engages when we face novel or complex problems. The trouble arises when System 1 handles decisions that actually require System 2, leading to systematic errors known as cognitive biases.\n\nE) One practical implication of this research is the concept of "choice architecture" — designing environments that help people make better decisions. Placing healthy food at eye level in a cafeteria, automatically enrolling employees in pension schemes with an opt-out rather than opt-in, or presenting organ donation as the default on driving licence applications are all examples. These "nudges" work because they align with how the brain actually processes choices, rather than how we wish it would.\n\nF) Critics argue that nudging is paternalistic and manipulative, removing genuine choice under the guise of helping people. Supporters counter that every choice environment is designed somehow — there is no neutral option — and that designing environments that lead to better outcomes is simply responsible policy-making.',
      source: 'Original content',
      questions: [
        { stem: 'What did Damasio\'s research with brain-damaged patients demonstrate?', options: ['Intelligence is more important than emotion for decisions', 'Emotions are essential for effective decision-making', 'Brain damage improves logical reasoning', 'Emotions always lead to poor decisions'], correctIndex: 1 },
        { stem: 'Which paragraph describes the effect of mental tiredness on judicial decisions?', options: ['Paragraph B', 'Paragraph C', 'Paragraph D', 'Paragraph E'], correctIndex: 1 },
        { stem: 'According to Kahneman, cognitive biases occur when:', options: ['System 2 overrides System 1 unnecessarily', 'System 1 handles decisions that require System 2', 'Both systems activate simultaneously', 'Neither system is engaged'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The Israeli judges were deliberately showing bias against applicants.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Kahneman won the Nobel Prize in Psychology.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: '"Choice architecture" works because it:', options: ['Forces people to think more carefully', 'Aligns with how the brain naturally processes decisions', 'Removes all choices from the individual', 'Uses financial incentives to change behaviour'], correctIndex: 1 },
        { stem: 'The critics of nudging argue that it is:', options: ['Too expensive to implement', 'Ineffective in practice', 'Paternalistic and manipulative', 'Only useful in healthcare settings'], correctIndex: 2 },
      ],
      difficulty: 0.6,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # PASSAGE 3 — "The Future of Work" (C1)
  // # Advanced MCQ + T/F/NG — abstract argument with multiple perspectives
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.rd.t2.03', type: 'reading_passage', level: 'C1', skill: 'reading',
    nodeIds: ['cando.c1.understand_abstract_text'],
    payload: {
      title: 'The Future of Work: Automation, AI, and Human Adaptability',
      passage: 'Predictions about technology destroying jobs are as old as technology itself. In 1930, economist John Maynard Keynes coined the term "technological unemployment" and predicted that by 2030, humanity would work only fifteen hours per week, with machines handling the rest. Nearly a century later, the average working week in developed economies remains stubbornly close to forty hours — yet the nature of work has transformed beyond recognition.\n\nThe current wave of anxiety centres on artificial intelligence and its potential to automate not just manual labour but cognitive tasks previously considered uniquely human. A widely cited 2013 study by Frey and Osborne at Oxford University estimated that 47% of US jobs were at high risk of automation within the next two decades. The study sparked alarm, but subsequent research has suggested a more nuanced picture.\n\nThe OECD\'s 2019 analysis took a task-based rather than job-based approach, recognising that most jobs consist of a bundle of tasks, only some of which are automatable. By this method, only 14% of jobs across OECD countries faced a high probability of automation. The difference is significant: a radiologist might have image-reading tasks automated by AI, but their roles in patient communication, clinical judgement, and team coordination remain firmly human.\n\nHistorically, technological revolutions have destroyed specific jobs while creating entirely new categories of employment that were inconceivable beforehand. The automobile eliminated horse-drawn carriage drivers but created mechanics, road engineers, traffic police, insurance adjusters, and eventually an entire suburban economy dependent on car ownership. The challenge is that these transitions are not instantaneous or painless — the workers displaced are rarely the ones who fill the new roles.\n\nEconomist David Autor has identified a paradox at the heart of automation fears: tasks that are easy for humans are often hard for machines, and vice versa. A five-year-old can tie shoelaces, recognise a friend in a crowd, and navigate an unfamiliar room — all tasks that challenge the most advanced AI. Meanwhile, AI can process millions of medical images, optimise global supply chains, and generate legal documents in seconds. This "Moravec\'s paradox" suggests that the jobs most resistant to automation may be those requiring physical dexterity, social intelligence, and common sense.\n\nThe policy debate has shifted from whether automation will cause job losses to how societies should manage the transition. Proposals range from universal basic income — regular cash payments to all citizens regardless of employment — to massive investment in retraining programmes and education reform. Finland\'s basic income experiment (2017-2018) found that participants reported higher wellbeing and modest improvements in employment rates, though critics noted the small sample size.\n\nPerhaps the most important insight from a century of failed predictions about technology and unemployment is that human adaptability should not be underestimated. People do not simply accept displacement — they find new ways to create value, often in domains that no forecaster anticipated. The question is not whether humans will adapt, but whether institutions will adapt fast enough to support them through the transition.',
      source: 'Original content',
      questions: [
        { stem: 'Keynes\'s 1930 prediction about working hours was:', options: ['Essentially correct', 'Too pessimistic about technology\'s capabilities', 'Wrong about the length of the working week but right about work\'s transformation', 'Ignored by subsequent economists'], correctIndex: 2 },
        { stem: 'The key difference between the Frey & Osborne study and the OECD analysis was:', options: ['They studied different countries', 'The OECD looked at tasks within jobs, not whole jobs', 'Frey & Osborne used newer data', 'The OECD focused only on manufacturing'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: The author believes 47% of US jobs will be automated.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The automobile example illustrates that:', options: ['Technology always creates more jobs than it destroys', 'Transitions create new jobs but displaced workers rarely fill them', 'Manual jobs are always at higher risk', 'Government intervention is unnecessary during transitions'], correctIndex: 1 },
        { stem: '"Moravec\'s paradox" suggests that the jobs most resistant to automation are those requiring:', options: ['Advanced mathematical ability', 'Physical dexterity, social intelligence, and common sense', 'Extensive formal education', 'Computer programming skills'], correctIndex: 1 },
        { stem: 'TRUE, FALSE, or NOT GIVEN: Finland\'s basic income experiment conclusively proved that UBI increases employment.', options: ['True', 'False', 'Not Given'], correctIndex: 1 },
        { stem: 'The author\'s main conclusion is that:', options: ['Automation will inevitably cause mass unemployment', 'Human adaptability is strong but institutions need to keep pace', 'Universal basic income is the only solution', 'Technology predictions are always wrong'], correctIndex: 1 },
      ],
      difficulty: 0.75,
    },
  },
]
