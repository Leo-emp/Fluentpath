// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS LISTENING — Expanded Authentic Exam Practice
// # ═══════════════════════════════════════════════════════════════════════════
// # Real IELTS Listening has 4 sections, 40 questions, ~30 minutes.
// # Section 1: Conversation (everyday), Section 2: Monologue (everyday),
// # Section 3: Discussion (academic), Section 4: Lecture (academic).
// # Each item includes full transcripts. Audio via ElevenLabs TTS later.
// # Question types: note completion, form filling, MCQ, matching,
// # map/plan labelling, table completion, sentence completion.

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_LISTENING_EXPANDED: UnifiedSeedItem[] = [

  // # ═══════════════════════════════════════════════════════════════════
  // # SECTION 1 — Everyday Conversations (A2–B1)
  // # Note/form completion, personal details, booking, enquiry
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.exp.01', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — Gym Membership Enquiry\n\nYou will hear a phone conversation between a customer and a gym receptionist.\n\nTranscript: "Hello, Riverside Fitness Centre. How can I help?" "Hi, I\'d like to enquire about gym membership. My name is Sarah ______." "Could you spell that for me?" "S-A-R-A-H, and the surname is B-E-R-G-M-A-N." "And your address?" "It\'s 47 ______ Road, Westbury." "What type of membership are you interested in?" "I\'d like the off-peak membership — the one that\'s valid Monday to Friday before ______ pm." "That\'s £______ per month. Would you like to add swimming pool access? That\'s an extra £12." "Yes, please."',
      gaps: [
        { correctAnswer: 'Bergman', acceptedAlternatives: ['bergman'], hint: 'surname (spelled out)' },
        { correctAnswer: 'Oakwood', acceptedAlternatives: ['oakwood'], hint: 'street name' },
        { correctAnswer: '5', acceptedAlternatives: ['five', '17:00'], hint: 'time in afternoon' },
        { correctAnswer: '35', acceptedAlternatives: ['thirty-five'], hint: 'monthly cost in pounds' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.ls.exp.02', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — Car Insurance Claim\n\nYou will hear a phone call between a policyholder and an insurance company.\n\nTranscript: "Thank you for calling Swift Insurance. Can I take your policy number?" "Yes, it\'s ______." "And the date of the incident?" "It happened on the ______ of July." "Can you describe what happened?" "I was driving along Church Street when another car reversed out of a ______ without looking. There\'s damage to the front bumper and left headlight." "Was anyone injured?" "No, thankfully. But the repair estimate from the garage is ______ pounds."',
      gaps: [
        { correctAnswer: 'SW-4782', acceptedAlternatives: ['sw-4782', 'SW4782'], hint: 'policy number (letters + digits)' },
        { correctAnswer: 'fourteenth', acceptedAlternatives: ['14th', '14'], hint: 'date in July' },
        { correctAnswer: 'driveway', acceptedAlternatives: ['drive way'], hint: 'type of entrance to property' },
        { correctAnswer: '1,850', acceptedAlternatives: ['1850', 'one thousand eight hundred and fifty'], hint: 'repair cost' },
      ],
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.ls.exp.03', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — Holiday Apartment Booking\n\nYou will hear a conversation between a tourist and a booking agent.\n\nTranscript: "Good morning, Coastal Retreats. How may I assist you?" "I\'d like to book a holiday apartment in ______. Do you have anything available for the first week of August?" "Let me check... yes, we have a two-bedroom apartment overlooking the ______. It sleeps up to four people." "How much is it per night?" "It\'s ______ euros per night, which includes WiFi and parking. There\'s a ______ deposit required to confirm the booking." "And what time is check-in?" "Check-in is from 3pm onwards."',
      gaps: [
        { correctAnswer: 'Barcelona', acceptedAlternatives: ['barcelona'], hint: 'Spanish city' },
        { correctAnswer: 'harbour', acceptedAlternatives: ['harbor', 'port', 'marina'], hint: 'waterfront feature' },
        { correctAnswer: '185', acceptedAlternatives: ['one hundred and eighty-five'], hint: 'nightly rate' },
        { correctAnswer: '200', acceptedAlternatives: ['two hundred', '200-euro'], hint: 'amount of deposit' },
      ],
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SECTION 2 — Monologue on Everyday Topic (B1)
  // # MCQ, matching, map labelling
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.exp.04', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'IELTS Listening Section 2 — Welcome Talk at a Conference\n\nTranscript: "Good morning everyone, and welcome to the annual Technology in Education Conference. Before we begin, let me go over some practical information. The conference runs for three days, and there are six keynote presentations, all of which will be held in the Main Auditorium on the ground floor. In addition, there are over forty breakout sessions spread across three buildings. You\'ll find the full schedule in your delegate packs — not on the app this year, I\'m afraid, as we\'ve had some technical difficulties. Lunch will be served in the Garden Terrace restaurant between 12:30 and 2pm. Please note that the restaurant on the second floor is reserved for VIP guests and speakers only. If you have any dietary requirements that you haven\'t already notified us about, please speak to the catering team at the front desk."\n\nWhere will the keynote presentations take place?',
      options: [
        { text: 'In the Garden Terrace', misconception: 'The Garden Terrace is where lunch is served' },
        { text: 'In the Main Auditorium on the ground floor', misconception: null },
        { text: 'Across three different buildings', misconception: 'Breakout sessions are in three buildings, not keynotes' },
        { text: 'On the second floor restaurant', misconception: 'The second floor restaurant is for VIP guests only' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.ls.exp.05', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'IELTS Listening Section 2 — Radio Announcement about a Festival\n\nTranscript: "And now for details of this year\'s Riverdale Summer Festival, which takes place from the 15th to the 17th of August. New this year is the Street Food Village, which will be located in Victoria Park — that\'s a change from last year when it was in the town square. We\'ve expanded from twelve food stalls to twenty-five, with cuisine from over fifteen different countries. Entertainment includes live music on two stages, a children\'s area with face painting and puppet shows, and for the first time, a vintage cinema showing classic films in a converted barn. Tickets are available online at riverdalefestival.co.uk. Adult day tickets are eighteen pounds, or you can buy a weekend pass for forty pounds — that\'s a saving of fourteen pounds compared to buying three separate day tickets. Children under twelve go free."\n\nWhat is different about the festival this year compared to last year?',
      options: [
        { text: 'The dates have changed', misconception: 'The dates for last year are not mentioned' },
        { text: 'The Street Food Village has moved to Victoria Park', misconception: null },
        { text: 'Children now have to pay for tickets', misconception: 'Children under 12 go free' },
        { text: 'There is no live music this year', misconception: 'Live music on two stages is mentioned' },
      ],
      correctIndex: 1,
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.ls.exp.06', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'IELTS Listening Section 2 — Library Orientation Tour\n\nTranscript: "Welcome to your orientation tour of the university library. The building has ______ floors. The ground floor houses the main reception desk and the short-loan collection — these are high-demand textbooks that can be borrowed for up to ______ hours. The first floor is the quiet study area with individual desks and power outlets at every seat. Please note that talking and phone calls are not permitted on this floor. The second floor has our ______ rooms, which can be booked online for up to two hours at a time. Groups of between three and ______ students can use these rooms. The top floor is our digital media suite, with editing software and recording equipment available for all students."',
      gaps: [
        { correctAnswer: 'four', acceptedAlternatives: ['4'], hint: 'number of floors' },
        { correctAnswer: '48', acceptedAlternatives: ['forty-eight'], hint: 'loan period in hours' },
        { correctAnswer: 'group study', acceptedAlternatives: ['group-study', 'study'], hint: 'type of rooms on second floor' },
        { correctAnswer: 'eight', acceptedAlternatives: ['8'], hint: 'maximum group size' },
      ],
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SECTION 3 — Academic Discussion (B2)
  // # MCQ, matching, sentence completion
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.exp.07', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Section 3 — Presentation Planning\n\nTranscript: "OK, so we need to finalise our group presentation on renewable energy policy. How do you want to divide it up?" "Well, there are four of us, so we could each take a different energy source — solar, wind, nuclear, and hydro." "I was actually thinking we should organise it thematically rather than by energy source. So one person covers the economics, another the environmental impact, a third does the politics, and the last one handles the technology." "That\'s better, actually. It avoids repetition — with the first approach, we\'d each end up talking about costs and environmental impact separately." "Agreed. I\'ll take the technology section since that\'s my strongest area." "Can I do the politics? I\'ve been reading a lot about government subsidies and lobbying." "Sure. I\'ll do economics then. That leaves environmental impact for you, James."\n\nHow did the group decide to organise their presentation?',
      options: [
        { text: 'By energy source — one person per source', misconception: 'This was the first suggestion but was rejected' },
        { text: 'By theme — economics, environment, politics, technology', misconception: null },
        { text: 'Chronologically — past, present, future', misconception: 'This structure was not discussed' },
        { text: 'Each person covers all aspects of one country\'s policy', misconception: 'Country-by-country was not proposed' },
      ],
      correctIndex: 1,
      difficulty: 0.45,
    },
  },
  {
    id: 'ielts.ls.exp.08', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Section 3 — Feedback on a Research Proposal\n\nTranscript: "I\'ve read through your research proposal, Maria, and overall it\'s a strong piece of work. Your literature review is thorough and well-structured." "Thank you, Professor." "However, I have some concerns about your methodology. You\'re proposing to use only questionnaires, but for a study on emotional responses to architecture, I think you\'d benefit from adding a qualitative component — perhaps semi-structured interviews." "I considered interviews, but I was worried about the time involved in transcribing and coding them." "I understand, but relying solely on quantitative data risks missing the nuance of people\'s emotional reactions. Even just ten interviews would strengthen your triangulation." "That makes sense. Would you suggest doing the interviews before or after the questionnaire?" "After — use the questionnaire results to identify participants with particularly interesting responses, then interview them for depth."\n\nWhat is the professor\'s main criticism of the proposal?',
      options: [
        { text: 'The literature review needs more sources', misconception: 'The professor praised the literature review as thorough' },
        { text: 'The research question is too broad', misconception: 'The research question was not criticised' },
        { text: 'The methodology relies only on questionnaires and needs interviews added', misconception: null },
        { text: 'The proposal is too long', misconception: 'Length was not mentioned' },
      ],
      correctIndex: 2,
      difficulty: 0.5,
    },
  },
  {
    id: 'ielts.ls.exp.09', type: 'gap_fill', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Section 3 — Study Skills Workshop Discussion\n\nTranscript: "So what did you learn from the study skills workshop?" "Quite a lot, actually. The most useful part was about ______ reading — you know, the technique where you read different parts of the text at different speeds depending on what you need." "Like skimming and scanning?" "Yes, but more nuanced than that. She talked about four levels: skimming for the ______ idea, scanning for specific facts, search reading where you look for information about a particular topic, and then ______ reading where you read every word carefully." "Did she talk about note-taking?" "Yes — she recommended the ______ method where you divide the page into sections: one for notes, one for key questions, and one for a summary."',
      gaps: [
        { correctAnswer: 'selective', acceptedAlternatives: ['strategic', 'flexible'], hint: 'type of reading technique' },
        { correctAnswer: 'main', acceptedAlternatives: ['general', 'overall', 'central'], hint: 'what skimming identifies' },
        { correctAnswer: 'careful', acceptedAlternatives: ['detailed', 'close', 'intensive'], hint: 'type of reading for every word' },
        { correctAnswer: 'Cornell', acceptedAlternatives: ['cornell'], hint: 'famous note-taking system from a university' },
      ],
      difficulty: 0.5,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SECTION 4 — Academic Lecture (C1)
  // # Note completion, MCQ — the hardest section
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.exp.10', type: 'gap_fill', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on Ocean Acidification\n\nTranscript: "Today I want to talk about ocean acidification — sometimes called the ______ twin of climate change. When carbon dioxide dissolves in seawater, it forms carbonic acid, which lowers the ocean\'s pH level. Since the Industrial Revolution, ocean pH has decreased by approximately ______ units — from 8.2 to about 8.1. Now, that might sound small, but because the pH scale is ______, this actually represents a 26% increase in acidity.\n\nThe organisms most immediately affected are those that build shells or skeletons from calcium carbonate — corals, molluscs, and certain types of ______. As the water becomes more acidic, it becomes harder for these organisms to form their protective structures. In some regions, the water is already corrosive enough to dissolve existing shells."',
      gaps: [
        { correctAnswer: 'evil', acceptedAlternatives: ['equally evil', 'lesser-known'], hint: 'metaphor for the relationship to climate change' },
        { correctAnswer: '0.1', acceptedAlternatives: ['zero point one', 'nought point one'], hint: 'amount of pH decrease' },
        { correctAnswer: 'logarithmic', acceptedAlternatives: [], hint: 'type of mathematical scale' },
        { correctAnswer: 'plankton', acceptedAlternatives: ['phytoplankton', 'zooplankton'], hint: 'tiny marine organisms' },
      ],
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.ls.exp.11', type: 'gap_fill', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on the History of Vaccination\n\nTranscript: "The concept of vaccination predates the germ theory of disease by nearly a century. In 1796, Edward Jenner observed that ______ who had contracted cowpox appeared to be immune to smallpox. He tested this by inoculating an eight-year-old boy named James ______ with material from a cowpox lesion. Six weeks later, the boy was exposed to smallpox and showed no signs of infection.\n\nJenner\'s approach was initially met with ______ — critics published cartoons showing vaccinated people growing cow parts from their bodies. However, within two decades, vaccination had spread across Europe and the Americas. The term \'vaccine\' itself comes from the Latin word ______, meaning cow — a direct reference to Jenner\'s original cowpox experiments."',
      gaps: [
        { correctAnswer: 'milkmaids', acceptedAlternatives: ['dairy maids', 'dairy workers', 'milk maids'], hint: 'women who worked with cows' },
        { correctAnswer: 'Phipps', acceptedAlternatives: ['phipps'], hint: 'surname of the boy' },
        { correctAnswer: 'ridicule', acceptedAlternatives: ['mockery', 'resistance', 'opposition', 'scepticism'], hint: 'negative reaction from critics' },
        { correctAnswer: 'vacca', acceptedAlternatives: [], hint: 'Latin word for cow' },
      ],
      difficulty: 0.6,
    },
  },
  {
    id: 'ielts.ls.exp.12', type: 'mcq', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on Cognitive Biases\n\nTranscript: "One of the most pervasive cognitive biases is the Dunning-Kruger effect, named after psychologists David Dunning and Justin Kruger, who published their findings in 1999. Their research demonstrated a paradoxical pattern: people with the least competence in a given area tend to dramatically overestimate their abilities, while those with the most expertise tend to slightly underestimate theirs. The explanation lies in metacognition — the ability to evaluate one\'s own thinking. Beginners lack the knowledge needed to recognise what they don\'t know, creating a dangerous illusion of competence. Experts, by contrast, assume that what comes easily to them must also be easy for others, leading them to undervalue their own abilities."\n\nAccording to the lecture, why do beginners overestimate their abilities?',
      options: [
        { text: 'They want to impress others', misconception: 'The bias is unconscious, not intentional' },
        { text: 'They lack the knowledge to recognise what they don\'t know', misconception: null },
        { text: 'They have been taught incorrectly', misconception: 'Teaching quality is not mentioned as a factor' },
        { text: 'They compare themselves to experts unfairly', misconception: 'The bias is about self-assessment, not comparison' },
      ],
      correctIndex: 1,
      difficulty: 0.55,
    },
  },
  {
    id: 'ielts.ls.exp.13', type: 'mcq', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on Urbanisation\n\nTranscript: "By 2050, it\'s projected that 68% of the world\'s population will live in urban areas — up from 55% today. But the nature of urbanisation varies dramatically by region. In Africa and Asia, most urban growth is occurring in secondary cities — those with populations between 500,000 and 5 million — rather than in mega-cities. This pattern has important implications for planning and infrastructure investment. Secondary cities typically lack the institutional capacity and tax base of capital cities, making it harder to provide adequate housing, sanitation, and transport. Yet because they are still growing, there is an opportunity to shape their development in ways that mega-cities, with their entrenched infrastructure, cannot easily achieve."\n\nAccording to the lecturer, secondary cities present both:',
      options: [
        { text: 'Higher crime rates and better employment prospects', misconception: 'Crime and employment are not discussed in this excerpt' },
        { text: 'Resource limitations and planning opportunities', misconception: null },
        { text: 'Environmental damage and economic growth', misconception: 'These are not the contrasting factors mentioned' },
        { text: 'Political instability and cultural diversity', misconception: 'Political and cultural factors are not discussed' },
      ],
      correctIndex: 1,
      difficulty: 0.55,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # TABLE COMPLETION — Common IELTS Listening format
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.exp.14', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'IELTS Listening — Table Completion (Section 2: Tour Guide)\n\nTranscript: "Let me give you the schedule for today\'s city tour. We\'ll start at the Cathedral, which was built in ______. Then we\'ll walk to the Old Market Square — that\'s about a ______-minute walk. After that, we\'ll visit the Art Gallery. Entrance is free, but donations are welcome. Lunch will be at the Riverside Café, where a set menu costs ______ per person. Our final stop will be the Botanical Gardens, which close at ______ pm, so we\'ll need to be there by 3."',
      gaps: [
        { correctAnswer: '1350', acceptedAlternatives: ['thirteen fifty', '1350 AD'], hint: 'year cathedral was built' },
        { correctAnswer: '10', acceptedAlternatives: ['ten'], hint: 'walking time in minutes' },
        { correctAnswer: '£14.50', acceptedAlternatives: ['14.50', 'fourteen fifty', '14 pounds 50'], hint: 'cost of set menu' },
        { correctAnswer: '4', acceptedAlternatives: ['four', '16:00', '4:00'], hint: 'closing time' },
      ],
      difficulty: 0.35,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # LISTENING STRATEGY MCQs
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.strat.01', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'Before each section of the IELTS Listening test begins, you are given time to read the questions. What should you do during this time?',
      options: [
        { text: 'Read the questions and underline key words to listen for', misconception: null },
        { text: 'Try to answer the questions from general knowledge', misconception: 'You need to listen for specific information, not guess' },
        { text: 'Read ahead to questions in later sections', misconception: 'You won\'t be able to turn back to earlier sections later' },
        { text: 'Close your eyes and prepare to concentrate', misconception: 'Reading the questions first is essential for knowing what to listen for' },
      ],
      correctIndex: 0,
      difficulty: 0.25,
    },
  },
  {
    id: 'ielts.ls.strat.02', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'In IELTS Listening note/form completion, what should you be aware of regarding the word limit?',
      options: [
        { text: 'You can write as many words as you want', misconception: 'The instructions always specify a word limit' },
        { text: 'Hyphenated words count as one word; numbers written as figures are not counted as words', misconception: null },
        { text: 'Articles (a, an, the) don\'t count toward the word limit', misconception: 'All words count, including articles' },
        { text: 'You should always use exactly the maximum number of words allowed', misconception: 'Use only the words needed — often one or two words is correct' },
      ],
      correctIndex: 1,
      difficulty: 0.35,
    },
  },
  {
    id: 'ielts.ls.strat.03', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'In IELTS Listening, speakers often change their mind or correct themselves. When this happens, you should:',
      options: [
        { text: 'Write the first answer you hear — it\'s usually correct', misconception: 'Speakers sometimes give wrong information first, then correct it' },
        { text: 'Write both answers and choose later', misconception: 'You should identify the corrected/final answer while listening' },
        { text: 'Listen for correction signals like "actually", "no wait", "I mean" and use the corrected information', misconception: null },
        { text: 'Ignore corrections — they are distractors', misconception: 'Corrections are deliberately included and the corrected answer is always the right one' },
      ],
      correctIndex: 2,
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.ls.strat.04', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['strat.ielts.time_management'],
    payload: {
      stem: 'At the end of the IELTS Listening test, you are given 10 minutes to transfer your answers to the answer sheet. What should you be careful about?',
      options: [
        { text: 'Spelling — incorrect spelling is marked wrong, even if the word is recognisable', misconception: null },
        { text: 'Handwriting — the answer sheet must be in cursive', misconception: 'Print or cursive is acceptable as long as it\'s legible' },
        { text: 'Speed — most people don\'t finish in 10 minutes', misconception: '10 minutes is ample time to transfer 40 answers' },
        { text: 'Nothing special — just copy your answers across', misconception: 'Spelling, capitalisation of proper nouns, and number formatting all matter' },
      ],
      correctIndex: 0,
      difficulty: 0.3,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # HIGHLIGHT INCORRECT WORD — Listening skill builder
  // # Tests ability to spot errors in a transcript while "listening"
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.hiw.01', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Practice — Identify the word that does NOT match what the speaker said.\n\nWhat you read: "The university library is open seven days a week during term time. Students can borrow up to fifteen books at a time for a maximum of four weeks."\n\nWhat the speaker actually said: "The university library is open seven days a week during term time. Students can borrow up to twelve books at a time for a maximum of four weeks."',
      passage: 'The university library is open seven days a week during term time. Students can borrow up to fifteen books at a time for a maximum of four weeks.',
      incorrectWords: ['fifteen'],
      difficulty: 0.4,
    },
  },
  {
    id: 'ielts.ls.hiw.02', type: 'highlight_incorrect', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Practice — Identify the word that does NOT match what the speaker said.\n\nWhat you read: "Research has shown that regular physical exercise can improve memory function by up to 30 percent. The most effective form of exercise for cognitive benefits appears to be aerobic activity such as running or cycling."\n\nWhat the speaker actually said: "Research has shown that regular physical exercise can improve memory function by up to 20 percent. The most effective form of exercise for cognitive benefits appears to be aerobic activity such as running or cycling."',
      passage: 'Research has shown that regular physical exercise can improve memory function by up to 30 percent. The most effective form of exercise for cognitive benefits appears to be aerobic activity such as running or cycling.',
      incorrectWords: ['30'],
      difficulty: 0.4,
    },
  },

  // # ═══════════════════════════════════════════════════════════════════
  // # SECTION 1 — More Everyday Conversations
  // # ═══════════════════════════════════════════════════════════════════

  {
    id: 'ielts.ls.exp.15', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — Event Ticket Booking\n\nTranscript: "Hello, City Theatre box office." "Hi, I\'d like to book tickets for the Saturday ______ performance of The Glass Menagerie." "The evening show at 7:30?" "Yes, please. I need ______ tickets." "For adults?" "Three adults and one child — she\'s ______. Is there a child discount?" "Yes, under-16s are half price. So that\'s three at £28 each and one at £14. Your total is ______." "Can I pay by card?" "Of course."',
      gaps: [
        { correctAnswer: 'evening', acceptedAlternatives: ['night'], hint: 'time of day for the performance' },
        { correctAnswer: 'four', acceptedAlternatives: ['4'], hint: 'total number of tickets' },
        { correctAnswer: '12', acceptedAlternatives: ['twelve'], hint: 'child\'s age' },
        { correctAnswer: '£98', acceptedAlternatives: ['98', 'ninety-eight pounds', '98 pounds'], hint: 'total cost' },
      ],
      difficulty: 0.3,
    },
  },
  {
    id: 'ielts.ls.exp.16', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Section 3 — Dissertation Progress Meeting\n\nTranscript: "So how\'s the data collection going, Tom?" "To be honest, not as well as I\'d hoped. I\'ve sent out 200 surveys but only had 43 responses so far." "That\'s about a 21% response rate. For an online survey, that\'s actually not bad. What were you expecting?" "I was hoping for at least 100 responses to make the statistical analysis meaningful." "One thing you could try is sending a reminder email. Research shows that a single reminder can increase response rates by 25 to 30 percent. Also, have you considered offering an incentive — like a small prize draw?" "I hadn\'t thought of that. Would that introduce any bias?" "Not if you keep it small — a coffee voucher, for example, wouldn\'t attract people who aren\'t genuinely part of your target population."\n\nWhat is Tom\'s main problem?',
      options: [
        { text: 'His survey questions are poorly designed', misconception: 'Survey design is not discussed' },
        { text: 'He has not received enough survey responses', misconception: null },
        { text: 'His supervisor wants him to change his topic', misconception: 'The supervisor offers practical help, not a topic change' },
        { text: 'He cannot access statistical analysis software', misconception: 'Software access is not mentioned' },
      ],
      correctIndex: 1,
      difficulty: 0.45,
    },
  },
]
