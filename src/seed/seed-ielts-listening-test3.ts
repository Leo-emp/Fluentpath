// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS LISTENING — Test 3 (4 sections, 4 parts)
// # ═══════════════════════════════════════════════════════════════════════════

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_LISTENING_TEST3: UnifiedSeedItem[] = [

  // # Section 1 — Everyday conversation: gap fill
  {
    id: 'ielts.ls.t3.01', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — Booking a Holiday Cottage\n\nYou will hear a phone conversation between a customer and a holiday rental agent.',
      transcript: '"Hello, Lake District Cottages. How can I help?" "Hi, I\'d like to book a cottage for a week in August. There will be four adults and two children." "Let me check availability. We have Birch Cottage available from the 12th to the 19th. It sleeps ______ people and has three bedrooms." "That sounds perfect. How much is it?" "In August it\'s £______ per week, and there\'s a refundable ______ of £200." "Is there parking?" "Yes, there\'s a private car park for up to ______ vehicles."',
      gaps: [
        { correctAnswer: '6', acceptedAlternatives: ['six'], hint: 'Maximum occupancy' },
        { correctAnswer: '850', acceptedAlternatives: ['eight hundred and fifty'], hint: 'Weekly rate in pounds' },
        { correctAnswer: 'deposit', acceptedAlternatives: ['security deposit'], hint: 'Refundable payment' },
        { correctAnswer: '2', acceptedAlternatives: ['two'], hint: 'Number of parking spaces' },
      ],
      difficulty: 0.3,
    },
  },

  // # Section 2 — Monologue: MCQ
  {
    id: 'ielts.ls.t3.02', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'IELTS Listening Section 2 — Library Orientation\n\nYou will hear a librarian giving an introduction to new members.',
      transcript: '"Welcome to Greenfield Community Library. We\'re open seven days a week — Monday to Friday 9am to 8pm, Saturdays 10am to 6pm, and Sundays 11am to 4pm. Your membership card gives you access to all physical resources. You can borrow up to twelve items at a time, for a maximum of three weeks. E-books and audiobooks are available through our app — you\'ll need your membership number to log in. Late returns incur a fine of 20p per day per item. We also have free Wi-Fi throughout the building and six bookable study rooms on the first floor."',
      options: [
        { text: 'Up to 6 items for 2 weeks', misconception: 'It is 12 items for 3 weeks' },
        { text: 'Up to 12 items for 3 weeks', misconception: null },
        { text: 'Up to 12 items for 2 weeks', misconception: 'Duration is 3 weeks, not 2' },
        { text: 'Unlimited items for 3 weeks', misconception: 'Limit is 12 items' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },

  // # Section 3 — Academic discussion: MCQ
  {
    id: 'ielts.ls.t3.03', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Section 3 — Dissertation Methodology\n\nYou will hear two postgraduate students discussing their research.',
      transcript: '"How\'s your dissertation going, James?" "I\'m stuck on the methodology chapter. I\'ve done twenty interviews but my supervisor says I need to triangulate with another method." "What does she suggest?" "She wants me to add a questionnaire to validate the themes from my interviews. The idea is that if both methods produce similar findings, it strengthens the conclusions." "That makes sense. I\'m doing it the other way round — I started with a large survey and now I\'m following up with interviews to explore the unexpected results." "That\'s interesting. So you\'re using mixed methods too, but in reverse order."',
      options: [
        { text: 'To replace the interviews with a more reliable method', misconception: 'She wants both methods, not replacement' },
        { text: 'To confirm interview findings using a different method', misconception: null },
        { text: 'To reduce the number of interviews needed', misconception: 'The interviews are already done' },
        { text: 'To save time by using a faster data collection method', misconception: 'Time efficiency is not mentioned' },
      ],
      correctIndex: 1,
      difficulty: 0.5,
    },
  },

  // # Section 4 — Academic lecture: gap fill
  {
    id: 'ielts.ls.t3.04', type: 'gap_fill', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — The Psychology of Habit Formation\n\nYou will hear part of a university lecture on behavioural psychology.',
      transcript: '"Research suggests that forming a new habit takes an average of sixty-six days, not the twenty-one days that popular culture claims. The process follows what psychologists call the ______ loop: a cue triggers the behaviour, the behaviour produces a reward, and the reward reinforces the association between cue and behaviour. The key to breaking bad habits isn\'t willpower — it\'s identifying the ______ that triggers the unwanted behaviour and either removing it or replacing the response. Implementation intentions — statements in the form \'when X happens, I will do Y\' — have been shown to ______ the success rate of behaviour change by up to 300%. The most effective strategies combine environmental ______ with specific planning."',
      gaps: [
        { correctAnswer: 'habit', acceptedAlternatives: ['habitual', 'habit-reward'], hint: 'Type of loop (cue-behaviour-reward)' },
        { correctAnswer: 'cue', acceptedAlternatives: ['trigger', 'stimulus'], hint: 'What triggers the behaviour' },
        { correctAnswer: 'double', acceptedAlternatives: ['increase', 'triple'], hint: 'How much success rate improves' },
        { correctAnswer: 'design', acceptedAlternatives: ['changes', 'modification', 'restructuring'], hint: 'Changing surroundings strategically' },
      ],
      difficulty: 0.6,
    },
  },
]
