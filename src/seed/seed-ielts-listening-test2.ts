// # ═══════════════════════════════════════════════════════════════════════════
// # IELTS LISTENING — Test 2 (4 sections, 4 parts)
// # ═══════════════════════════════════════════════════════════════════════════

import type { UnifiedSeedItem } from './run-seed'

export const SEED_IELTS_LISTENING_TEST2: UnifiedSeedItem[] = [

  // # Section 1 — Everyday conversation: gap fill
  {
    id: 'ielts.ls.t2.01', type: 'gap_fill', level: 'B1', skill: 'listening',
    nodeIds: ['cando.a2.understand_conversation'],
    payload: {
      stem: 'IELTS Listening Section 1 — Renting a Storage Unit\n\nYou will hear a conversation between a customer and a storage facility manager.',
      transcript: '"Good morning, Safe & Secure Storage. How can I help?" "Hi, I\'m moving house next month and I need to store some furniture for about six weeks. What sizes do you have?" "We have three sizes: small units which are about 25 square feet — good for boxes and small items. Medium units are 75 square feet — that\'s enough for the contents of a one-bedroom flat. And our large units are 150 square feet." "I think medium would work. How much is that?" "Medium units are £______ per week, and there\'s a one-off ______ fee of £45." "That\'s reasonable. Is there 24-hour access?" "Not quite — access hours are 6am to ______ pm, seven days a week. We do have CCTV and individual ______ on every unit for security."',
      gaps: [
        { correctAnswer: '28', acceptedAlternatives: ['twenty-eight'], hint: 'weekly cost' },
        { correctAnswer: 'admin', acceptedAlternatives: ['administration', 'administrative'], hint: 'type of one-off fee' },
        { correctAnswer: '10', acceptedAlternatives: ['ten', '22:00'], hint: 'closing time' },
        { correctAnswer: 'alarms', acceptedAlternatives: ['alarm systems', 'alarm'], hint: 'security feature on each unit' },
      ],
      difficulty: 0.3,
    },
  },

  // # Section 2 — Monologue: MCQ
  {
    id: 'ielts.ls.t2.02', type: 'mcq', level: 'B1', skill: 'listening',
    nodeIds: ['cando.b1.understand_monologue'],
    payload: {
      stem: 'IELTS Listening Section 2 — Museum Tour Introduction\n\nYou will hear a museum guide speaking to a group of visitors.',
      transcript: '"Welcome to the National Maritime Museum. Before we begin the tour, I\'d like to give you an overview of what we\'ll see today. The museum was founded in 1934 and houses over two million items related to seafaring history. Our tour will focus on three galleries. First, we\'ll visit the Age of Exploration gallery, which covers the period from the 15th to the 18th century. This is where you\'ll find the original maps used by Ferdinand Magellan. Then we\'ll move to the Naval Warfare gallery, which includes a full-scale replica of a gun deck from a warship. Finally, we\'ll visit the Ocean Science gallery, which is our newest addition, opened just last year. The tour lasts approximately ninety minutes. Photography is allowed in all galleries except the Magellan map room, where flash could damage the documents."',
      options: [
        { text: 'In 1834', misconception: 'The museum was founded in 1934, not 1834' },
        { text: 'In 1934', misconception: null },
        { text: 'In 2023', misconception: '2023 is when the Ocean Science gallery opened' },
        { text: 'In the 15th century', misconception: 'The 15th century relates to the Age of Exploration' },
      ],
      correctIndex: 1,
      difficulty: 0.3,
    },
  },

  // # Section 3 — Academic discussion: MCQ
  {
    id: 'ielts.ls.t2.03', type: 'mcq', level: 'B2', skill: 'listening',
    nodeIds: ['cando.b2.understand_discussion'],
    payload: {
      stem: 'IELTS Listening Section 3 — Research Methods Discussion\n\nYou will hear a tutorial discussion between a student and their professor.',
      transcript: '"So, Laura, have you decided on your research methodology?" "I was thinking of using focus groups. I want to understand how teenagers feel about social media restrictions." "Focus groups could work, but there\'s a risk — teenagers might not express their true opinions in front of peers. They might say what they think others expect." "I hadn\'t considered that. What would you suggest?" "For this topic, I\'d recommend anonymous online surveys as your primary method, supplemented by individual interviews with a smaller sample. The surveys give you breadth — you can reach hundreds of respondents — and the interviews give you depth." "Would I need ethical approval for working with minors?" "Absolutely. You\'ll need parental consent forms for everyone under 16, and the ethics committee will want to see your data protection plan."',
      options: [
        { text: 'Teenagers might say what others expect rather than their true views', misconception: null },
        { text: 'Focus groups are too expensive', misconception: 'Cost is not mentioned as a concern' },
        { text: 'The professor dislikes qualitative research', misconception: 'The professor suggests interviews, which are qualitative' },
        { text: 'Focus groups take too long to organise', misconception: 'Time is not discussed as an issue' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },

  // # Section 4 — Academic lecture: gap fill
  {
    id: 'ielts.ls.t2.04', type: 'gap_fill', level: 'C1', skill: 'listening',
    nodeIds: ['cando.c1.understand_lecture'],
    payload: {
      stem: 'IELTS Listening Section 4 — Lecture on Behavioural Economics\n\nYou will hear part of a university lecture on behavioural economics.',
      transcript: '"The concept of loss aversion, first described by Kahneman and Tversky in 1979, states that people feel the pain of losing something approximately ______ times more intensely than the pleasure of gaining the same thing. This has profound implications for policy design. For example, a study in Chicago found that teachers whose bonuses were paid in ______ and then clawed back if students didn\'t meet targets worked significantly harder than teachers offered the same bonus as a future reward. The ______ of losing something already received was more motivating than the ______ of gaining something new. This principle has been applied in energy conservation programmes, health interventions, and retirement savings schemes."',
      gaps: [
        { correctAnswer: 'two', acceptedAlternatives: ['2', 'twice'], hint: 'multiplier for loss vs gain intensity' },
        { correctAnswer: 'advance', acceptedAlternatives: ['advance payment', 'upfront'], hint: 'when the bonus was paid' },
        { correctAnswer: 'fear', acceptedAlternatives: ['threat', 'prospect', 'possibility'], hint: 'emotion associated with losing' },
        { correctAnswer: 'prospect', acceptedAlternatives: ['possibility', 'hope', 'anticipation', 'promise'], hint: 'possibility of future reward' },
      ],
      difficulty: 0.6,
    },
  },
]
