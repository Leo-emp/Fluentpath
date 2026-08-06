// # B1 Reading & Listening boost — B1 had only 3 reading items and 13 listening
// # items. This file adds substantial reading passages, MCQs, and listening
// # comprehension to bring B1 up to a competitive content level.
// # B1 texts use factual prose, news-style writing, and instructions.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_B1_READING_BOOST: UnifiedSeedItem[] = [
  // # ─── READING PASSAGE (4) ──────────────────────────────────────────
  // # 200–400 word factual texts with 4 questions each.
  {
    id: 'item.rp.b1.04', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'The Benefits of Learning a Second Language',
      passage: 'Research has consistently shown that learning a second language provides benefits far beyond the ability to communicate with more people. Studies from the University of Edinburgh found that bilingual individuals tend to develop dementia four to five years later than those who speak only one language. This is because managing two language systems exercises the brain in ways that strengthen cognitive reserve.\n\nIn addition to health benefits, bilingualism has been linked to improved problem-solving skills. When bilingual people switch between languages, they practise a form of mental flexibility that transfers to other cognitive tasks. A study published in Psychological Science found that bilingual children were better at solving certain types of puzzles than their monolingual peers.\n\nThere are also economic advantages. The European Commission estimates that knowledge of a foreign language can increase a worker\'s salary by between 5% and 20%, depending on the sector. In the UK, the demand for employees who speak languages such as Mandarin, Arabic, and Spanish has grown significantly in recent years.\n\nHowever, learning a language as an adult is not easy. Research suggests that the critical period for effortless language acquisition ends around puberty. After this age, learners typically need deliberate practice, regular exposure, and considerable motivation. Despite these challenges, millions of adults successfully achieve fluency every year, proving that while youth confers an advantage, it is not a requirement.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'According to the passage, how does bilingualism affect dementia?', options: ['It prevents dementia completely', 'It delays the onset by 4-5 years', 'It has no effect on dementia', 'It increases the risk of dementia'], correctAnswer: 1, explanation: 'The passage states bilingual individuals "develop dementia four to five years later."' },
        { id: 'q2', questionType: 'tfng', text: 'Bilingual children are better at all types of puzzles than monolingual children.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The study found they were better at "certain types of puzzles," not all types.' },
        { id: 'q3', questionType: 'mcq', text: 'What does the passage say about learning a language after puberty?', options: ['It is impossible', 'It requires deliberate effort but is achievable', 'It is easier than learning as a child', 'Scientists disagree about whether it is possible'], correctAnswer: 1, explanation: 'The passage says adults "need deliberate practice" but "millions of adults successfully achieve fluency."' },
        { id: 'q4', questionType: 'mcq', text: 'The potential salary increase from knowing a foreign language is:', options: ['Always 20%', 'Between 5% and 20%', 'Less than 5%', 'Only in the UK'], correctAnswer: 1, explanation: 'The European Commission estimates "between 5% and 20%, depending on the sector."' },
      ],
      difficulty: 0.35,
    },
  },
  {
    id: 'item.rp.b1.05', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'How Recycling Works',
      passage: 'Most people know that recycling is important for the environment, but fewer understand what actually happens to their waste after it leaves the recycling bin. The process varies depending on the material.\n\nPaper and cardboard are taken to a recycling plant where they are sorted, cleaned, and mixed with water to create a pulp. This pulp is then spread onto screens to dry and form new sheets of paper. Paper can typically be recycled five to seven times before the fibres become too short to use.\n\nPlastic recycling is more complicated. There are seven different types of plastic, and not all can be recycled together. Most recycling programmes accept types 1 and 2 (such as water bottles and milk containers). The plastic is shredded, washed, melted, and formed into small pellets, which are then used to make new products like park benches, clothing fibres, or packaging.\n\nGlass is one of the easiest materials to recycle. It can be recycled endlessly without losing quality. The glass is crushed, melted at high temperatures, and moulded into new containers. Recycling glass uses about 30% less energy than making glass from raw materials.\n\nAluminium cans are also highly recyclable. A recycled can can be back on the shelf as a new can in as little as 60 days. Recycling aluminium saves up to 95% of the energy needed to produce it from scratch.\n\nDespite these processes being well-established, contamination remains a major problem. When non-recyclable items are placed in recycling bins — such as food-stained pizza boxes or plastic bags — they can contaminate entire batches of otherwise recyclable material.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'How many times can paper be recycled?', options: ['Unlimited times', '1–2 times', '5–7 times', 'Only once'], correctAnswer: 2, explanation: 'The passage states paper can be recycled "five to seven times."' },
        { id: 'q2', questionType: 'mcq', text: 'Why is plastic recycling more complicated than glass?', options: ['Plastic is more expensive to recycle', 'There are different types that cannot be mixed', 'Plastic cannot be melted', 'There are no plastic recycling plants'], correctAnswer: 1, explanation: 'The passage says there are seven types of plastic and "not all can be recycled together."' },
        { id: 'q3', questionType: 'tfng', text: 'Recycled glass is lower quality than new glass.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage says glass can be recycled "without losing quality."' },
        { id: 'q4', questionType: 'mcq', text: 'What is "contamination" in the context of recycling?', options: ['Chemical pollution from factories', 'Non-recyclable items placed in recycling bins', 'Bacteria growing on recycled materials', 'Mixing different colours of glass'], correctAnswer: 1, explanation: 'The passage defines it as "non-recyclable items placed in recycling bins" that ruin otherwise recyclable batches.' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'item.rp.b1.06', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'Remote Work: The New Normal?',
      passage: 'The COVID-19 pandemic forced millions of workers around the world to work from home. Now, several years later, many companies are still debating whether remote work should remain a permanent option.\n\nSupporters of remote work point to several advantages. Employees save time and money by not commuting. A study by Stanford University found that remote workers were 13% more productive than their office-based colleagues. Workers also reported higher job satisfaction and took fewer sick days.\n\nHowever, remote work is not without its drawbacks. Many managers worry that team collaboration suffers when people are not in the same physical space. Spontaneous conversations — the kind that happen in corridors and kitchens — often lead to creative ideas that are difficult to replicate on video calls. There are also concerns about employee wellbeing: some remote workers report feeling isolated and finding it difficult to separate work from personal life.\n\nA growing number of companies have adopted a hybrid model, in which employees work from home for part of the week and come to the office for the rest. This approach aims to combine the flexibility of remote work with the social and collaborative benefits of the office. Companies such as Microsoft and Google now offer hybrid arrangements to most of their employees.\n\nNot all jobs can be done remotely, of course. Healthcare workers, factory workers, and those in hospitality must be physically present. But for the estimated 40% of jobs that can be done from anywhere, the question is no longer whether remote work is possible, but how to make it work well.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'According to the Stanford study, remote workers were:', options: ['Less productive than office workers', '13% more productive than office workers', 'Equally productive as office workers', 'Unable to complete their tasks'], correctAnswer: 1, explanation: 'The passage cites "remote workers were 13% more productive than their office-based colleagues."' },
        { id: 'q2', questionType: 'tfng', text: 'All companies now require employees to work remotely full-time.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'Many companies use a hybrid model, and some jobs cannot be done remotely.' },
        { id: 'q3', questionType: 'mcq', text: 'What percentage of jobs can potentially be done remotely?', options: ['100%', '60%', '40%', '10%'], correctAnswer: 2, explanation: 'The passage estimates "40% of jobs that can be done from anywhere."' },
        { id: 'q4', questionType: 'mcq', text: 'What is a "hybrid model" of work?', options: ['Working only from home', 'Working only in the office', 'Splitting time between home and office', 'Working at different companies'], correctAnswer: 2, explanation: 'The passage defines hybrid as "work from home for part of the week and come to the office for the rest."' },
      ],
      difficulty: 0.35,
    },
  },
  {
    id: 'item.rp.b1.07', type: 'reading_passage', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      title: 'Sleep and Health',
      passage: 'Sleep is one of the most important factors in maintaining good health, yet many people do not get enough of it. The National Sleep Foundation recommends that adults aged 18 to 64 sleep between seven and nine hours per night. However, surveys consistently show that about a third of adults in developed countries regularly sleep less than seven hours.\n\nThe effects of poor sleep go beyond simply feeling tired. Research has linked chronic sleep deprivation to a range of serious health problems, including heart disease, diabetes, obesity, and depression. During sleep, the body repairs damaged cells, strengthens the immune system, and consolidates memories. Without adequate sleep, these processes are disrupted.\n\nOne of the biggest obstacles to good sleep in the modern world is technology. The blue light emitted by smartphones, tablets, and computers suppresses the production of melatonin, a hormone that regulates the sleep-wake cycle. Experts recommend avoiding screens for at least one hour before bedtime. Other helpful strategies include maintaining a consistent sleep schedule, keeping the bedroom cool and dark, and avoiding caffeine after midday.\n\nNapping can also be beneficial, but with caveats. A short nap of 20 to 30 minutes can improve alertness and performance without interfering with nighttime sleep. However, napping for longer than 30 minutes can lead to sleep inertia — a feeling of grogginess that can last for up to an hour after waking. Napping late in the afternoon can also make it harder to fall asleep at night.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'How many hours of sleep does the National Sleep Foundation recommend for adults?', options: ['5–6 hours', '6–7 hours', '7–9 hours', '9–11 hours'], correctAnswer: 2, explanation: 'The passage states "between seven and nine hours per night."' },
        { id: 'q2', questionType: 'mcq', text: 'Why is blue light from screens harmful for sleep?', options: ['It causes eye damage', 'It suppresses melatonin production', 'It keeps the room too bright', 'It causes headaches'], correctAnswer: 1, explanation: 'The passage explains that blue light "suppresses the production of melatonin."' },
        { id: 'q3', questionType: 'tfng', text: 'A 45-minute nap is recommended for optimal alertness.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage recommends "20 to 30 minutes" and warns that longer naps cause grogginess.' },
        { id: 'q4', questionType: 'mcq', text: 'What is "sleep inertia"?', options: ['The inability to fall asleep', 'Grogginess after waking from a long nap', 'Sleeping too much on weekends', 'A medical condition requiring treatment'], correctAnswer: 1, explanation: 'The passage defines it as "a feeling of grogginess that can last for up to an hour after waking."' },
      ],
      difficulty: 0.3,
    },
  },

  // # ─── MCQ — Reading (6) ────────────────────────────────────────────
  // # Standalone reading comprehension MCQs for B1.
  {
    id: 'item.mcq.b1.r01', type: 'mcq', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'A travel guide says: "The museum is open daily except Mondays and public holidays. Admission is free for children under 16 when accompanied by an adult." A family with two children aged 10 and 14 visits on a Tuesday. How much will the children pay?',
      options: [
        { text: 'Nothing — they are free with an adult', misconception: null },
        { text: 'Full adult price each', misconception: 'Ignores the under-16 free admission rule' },
        { text: 'Half price each', misconception: 'Invents a discount not mentioned in the text' },
        { text: 'Only the 14-year-old is free', misconception: 'Both are under 16 and with an adult' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },
  {
    id: 'item.mcq.b1.r02', type: 'mcq', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'An article says: "While electric cars produce no direct emissions, the electricity used to charge them often comes from fossil fuels. The environmental benefit therefore depends heavily on the energy mix of the country where the car is used." The main point is:',
      options: [
        { text: 'The environmental benefit of electric cars varies by country', misconception: null },
        { text: 'Electric cars are always better for the environment', misconception: 'Ignores the "depends heavily on the energy mix" qualifier' },
        { text: 'Electric cars are worse than petrol cars', misconception: 'The article doesn\'t say this — it says the benefit varies' },
        { text: 'All countries should ban petrol cars immediately', misconception: 'No policy recommendation is made in the text' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.mcq.b1.r03', type: 'mcq', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'A job advert states: "Candidates must have at least two years of experience and be fluent in English. Knowledge of a second language is desirable but not essential." Which of these candidates would NOT meet the minimum requirements?',
      options: [
        { text: 'Someone with one year of experience who speaks English and French', misconception: null },
        { text: 'Someone with three years of experience who only speaks English', misconception: 'They meet both requirements — experience and English fluency' },
        { text: 'Someone with five years of experience who speaks English and Spanish', misconception: 'Exceeds the requirements' },
        { text: 'Someone with two years of experience who speaks English', misconception: 'Exactly meets the minimum requirements' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },
  {
    id: 'item.mcq.b1.r04', type: 'mcq', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'A health website states: "Vitamin D is produced by the body when skin is exposed to sunlight. In countries with long winters, many people become deficient and may need supplements." People in which of these countries would most likely need supplements?',
      options: [
        { text: 'Finland', misconception: null },
        { text: 'Thailand', misconception: 'Tropical country with abundant sunlight year-round' },
        { text: 'Brazil', misconception: 'Near the equator — plenty of sunlight' },
        { text: 'Australia', misconception: 'Very sunny climate' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.mcq.b1.r05', type: 'mcq', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'A restaurant review says: "The food was excellent but the service was disappointingly slow. We waited 40 minutes for our main course." The reviewer\'s overall opinion is:',
      options: [
        { text: 'Mixed — good food but poor service', misconception: null },
        { text: 'Completely negative', misconception: 'Ignores "the food was excellent"' },
        { text: 'Completely positive', misconception: 'Ignores "disappointingly slow"' },
        { text: 'Neutral — they had no opinion', misconception: 'They clearly express both praise and criticism' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.b1.r06', type: 'mcq', level: 'B1', skill: 'reading',
    nodeIds: ['cando.b1.understand_factual_text'],
    payload: {
      stem: 'A policy notice says: "Employees may work from home up to two days per week with their manager\'s approval. All team members must be in the office on Wednesdays for team meetings." An employee wants to work from home on Monday, Wednesday, and Friday. Is this allowed?',
      options: [
        { text: 'No — they must be in the office on Wednesday and can only work from home two days', misconception: null },
        { text: 'Yes — they can choose any three days', misconception: 'Ignores both the two-day limit and the Wednesday requirement' },
        { text: 'Yes — if their manager approves', misconception: 'Even with approval, Wednesday is mandatory in-office and maximum is two days' },
        { text: 'No — working from home is not allowed', misconception: 'The policy explicitly allows up to two days' },
      ],
      correctIndex: 0,
      difficulty: 0.35,
    },
  },

  // # ─── MCQ — Listening (6) ──────────────────────────────────────────
  // # Monologues and conversations on familiar B1 topics.
  {
    id: 'item.mcq.b1.l14', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'A tour guide says: "This castle was built in 1285 and has been renovated several times. The most recent restoration was completed in 2019 and cost £3.2 million." When was the castle originally built?',
      options: [
        { text: '1285', misconception: null },
        { text: '2019', misconception: 'Confuses the restoration date with the construction date' },
        { text: '1825', misconception: 'Transposes digits of the correct year' },
        { text: '1200', misconception: 'Rounds down too aggressively' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.b1.l15', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'A radio presenter says: "Traffic on the M25 is moving slowly due to an accident near junction 10. Drivers are advised to use the A3 as an alternative route." What should drivers do?',
      options: [
        { text: 'Take the A3 instead of the M25', misconception: null },
        { text: 'Continue on the M25 past junction 10', misconception: 'Ignores the advice to avoid the M25' },
        { text: 'Stop and wait for the accident to clear', misconception: 'The advice is to take an alternative route, not wait' },
        { text: 'Turn around and go home', misconception: 'Not suggested — an alternative is provided' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.b1.l16', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'A speaker at a conference says: "Our research shows that 60% of customers prefer to shop online, but 75% still want the option to return items in a physical store." What do most customers want?',
      options: [
        { text: 'To shop online but return items in-store', misconception: null },
        { text: 'To do everything online including returns', misconception: 'Contradicts the 75% wanting in-store returns' },
        { text: 'To shop only in physical stores', misconception: 'Contradicts the 60% who prefer online' },
        { text: 'To stop shopping altogether', misconception: 'Not supported by any part of the statement' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },
  {
    id: 'item.mcq.b1.l17', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'A colleague says: "I was supposed to finish the report by Friday, but my manager has extended the deadline to next Wednesday. That gives me a few more days, which I really need because I\'m still waiting for data from the finance team." Why was the deadline extended?',
      options: [
        { text: 'The speaker needs more time and is waiting for data', misconception: null },
        { text: 'The manager cancelled the report', misconception: 'The report is still due — just later' },
        { text: 'Friday is a public holiday', misconception: 'No mention of a holiday — the reason is data delay' },
        { text: 'The finance team finished early', misconception: 'Opposite — the speaker is still waiting for their data' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },
  {
    id: 'item.mcq.b1.l18', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'A librarian announces: "The library will be closed for renovations from the 1st to the 14th of August. During this time, you can still use our online catalogue and e-book service." How long will the library be closed?',
      options: [
        { text: 'Two weeks', misconception: null },
        { text: 'One month', misconception: 'Over-estimates the closure period' },
        { text: 'One week', misconception: 'Under-estimates — 1st to 14th is two weeks' },
        { text: 'It will not close', misconception: 'Contradicts the announcement' },
      ],
      correctIndex: 0,
      difficulty: 0.2,
    },
  },
  {
    id: 'item.mcq.b1.l19', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'A podcast host says: "Many people think that eating fat makes you fat. But recent research suggests that the real culprit is added sugar, not dietary fat. In fact, healthy fats from foods like avocados, nuts, and olive oil are essential for brain function." According to the speaker, what is the real problem?',
      options: [
        { text: 'Added sugar, not fat', misconception: null },
        { text: 'All types of fat', misconception: 'The speaker distinguishes between healthy fats and added sugar' },
        { text: 'Eating too many avocados', misconception: 'Avocados are listed as a source of healthy fats' },
        { text: 'Not eating enough', misconception: 'Not mentioned — the discussion is about sugar vs fat' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },
]
