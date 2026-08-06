// # C2 gap filler — adds MCQ, gap fill, reading passages, and listening items
// # for proficient/mastery-level learners. Fills the missing reading and
// # listening skills plus MCQ, gap_fill, and reading_passage item types.
// # C2 content uses nuanced vocabulary, complex grammar, abstract reasoning,
// # and sophisticated texts (academic, literary, journalistic).

import type { UnifiedSeedItem } from './run-seed'

export const SEED_C2_GAPS: UnifiedSeedItem[] = [
  // # ─── MCQ — Reading Skill (6) ───────────────────────────────────────
  // # Complex texts requiring inference, tone detection, and abstract reasoning.
  {
    id: 'item.mcq.c2.r01', type: 'mcq', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      stem: 'A journalist writes: "The policy, while ostensibly designed to foster innovation, has had the paradoxical effect of stifling the very creativity it purported to encourage." The writer\'s tone is best described as:',
      options: [
        { text: 'Ironic and critical', misconception: null },
        { text: 'Enthusiastic and supportive', misconception: 'Misreads "paradoxical effect of stifling" as positive' },
        { text: 'Neutral and objective', misconception: 'Ignores the evaluative language and irony markers' },
        { text: 'Confused and uncertain', misconception: 'The writer is clear in their criticism, not confused' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },
  {
    id: 'item.mcq.c2.r02', type: 'mcq', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      stem: '"The committee\'s recommendations, far from being the radical overhaul some had anticipated, amounted to little more than rearranging the deckchairs on the Titanic." The idiom "rearranging the deckchairs on the Titanic" means:',
      options: [
        { text: 'Making superficial changes while ignoring a fundamental problem', misconception: null },
        { text: 'Organising a large event efficiently', misconception: 'Takes the idiom literally — ignores its metaphorical meaning' },
        { text: 'Making significant structural changes', misconception: 'Opposite of the idiom\'s meaning' },
        { text: 'Returning to a traditional approach', misconception: 'No connection to tradition in this idiom' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },
  {
    id: 'item.mcq.c2.r03', type: 'mcq', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      stem: 'An essay states: "The notion that language merely reflects thought is as reductive as claiming that a map merely reflects terrain; both are acts of construction that shape what they purport to represent." The author\'s main argument is that:',
      options: [
        { text: 'Language actively shapes thought rather than simply mirroring it', misconception: null },
        { text: 'Maps are inaccurate representations of geography', misconception: 'Focuses on the analogy rather than the main claim about language' },
        { text: 'Language and maps serve identical functions', misconception: 'Over-extends the analogy — the author uses maps as an illustration, not an equivalence' },
        { text: 'Thought exists independently of language', misconception: 'Contradicts the author\'s constructivist position' },
      ],
      correctIndex: 0,
      difficulty: 0.7,
    },
  },
  {
    id: 'item.mcq.c2.r04', type: 'mcq', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      stem: '"She had mastered the art of saying nothing with extraordinary eloquence — a skill that served her admirably in diplomatic circles." The phrase "saying nothing with extraordinary eloquence" implies:',
      options: [
        { text: 'She could speak impressively without committing to any position', misconception: null },
        { text: 'She was an excellent public speaker', misconception: 'Misses the irony — eloquence here masks emptiness of content' },
        { text: 'She preferred silence over speech', misconception: 'She does speak — she just says nothing meaningful' },
        { text: 'She had a speech impediment', misconception: 'Completely misreads the figurative language as literal' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },
  {
    id: 'item.mcq.c2.r05', type: 'mcq', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text', 'lex.c2.idiomatic_language'],
    payload: {
      stem: 'A review states: "The novel\'s prose oscillates between the luminous and the laboured, as though the author cannot decide whether they are writing for posterity or for the Sunday supplements." The reviewer thinks:',
      options: [
        { text: 'The writing quality is inconsistent, alternating between brilliant and forced', misconception: null },
        { text: 'The novel is consistently excellent', misconception: 'Ignores "laboured" — only one half of the oscillation' },
        { text: 'The novel is about journalism', misconception: 'Takes "Sunday supplements" literally rather than as a metaphor for lightweight writing' },
        { text: 'The author deliberately varies their style', misconception: 'The "as though... cannot decide" signals uncertainty, not deliberate craft' },
      ],
      correctIndex: 0,
      difficulty: 0.65,
    },
  },
  {
    id: 'item.mcq.c2.r06', type: 'mcq', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      stem: 'A philosopher writes: "To insist on certainty in a world characterised by irreducible complexity is not a sign of intellectual rigour but of intellectual timidity — a refusal to engage with the provisional nature of all human understanding." The author\'s position is that:',
      options: [
        { text: 'Accepting uncertainty is more intellectually courageous than demanding certainty', misconception: null },
        { text: 'Certainty is always achievable with enough effort', misconception: 'Directly contradicts the author\'s claim about "irreducible complexity"' },
        { text: 'Philosophy should avoid complex topics', misconception: 'The author advocates engaging with complexity, not avoiding it' },
        { text: 'Human understanding is fundamentally flawed', misconception: 'The author says understanding is "provisional", not "flawed"' },
      ],
      correctIndex: 0,
      difficulty: 0.75,
    },
  },

  // # ─── MCQ — Listening Skill (6) ─────────────────────────────────────
  // # Academic lectures, nuanced conversations, implied meanings.
  {
    id: 'item.mcq.c2.l01', type: 'mcq', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      stem: 'A lecturer says: "The prevailing consensus, while not without its detractors, has remained remarkably resilient in the face of contradictory evidence — a phenomenon that tells us as much about the sociology of science as it does about the science itself." The lecturer is suggesting that:',
      options: [
        { text: 'Social factors within the scientific community help maintain the consensus despite counter-evidence', misconception: null },
        { text: 'The consensus is correct because it has survived challenges', misconception: 'Confuses resilience of belief with correctness' },
        { text: 'Scientists always follow the evidence objectively', misconception: 'The lecturer implies the opposite — social factors influence science' },
        { text: 'The contradictory evidence is unreliable', misconception: 'The lecturer doesn\'t question the evidence — they question why the consensus persists despite it' },
      ],
      correctIndex: 0,
      difficulty: 0.7,
    },
  },
  {
    id: 'item.mcq.c2.l02', type: 'mcq', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      stem: 'In a debate, speaker A says: "With respect, I think my colleague is conflating correlation with causation." Speaker A is accusing their colleague of:',
      options: [
        { text: 'Assuming that because two things happen together, one causes the other', misconception: null },
        { text: 'Being disrespectful to the audience', misconception: '"With respect" is a politeness formula, not a comment about behaviour' },
        { text: 'Using outdated statistics', misconception: 'The criticism is about logical reasoning, not data quality' },
        { text: 'Speaking too quickly for the audience', misconception: 'Unrelated to the logical fallacy being identified' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },
  {
    id: 'item.mcq.c2.l03', type: 'mcq', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      stem: 'A podcast host says: "Our guest tonight has been described as a polymath, a provocateur, and — by those less charitably disposed — a dilettante." The word "dilettante" in this context most likely means:',
      options: [
        { text: 'Someone who dabbles in many fields without deep expertise', misconception: null },
        { text: 'A highly respected expert', misconception: '"Less charitably disposed" signals this is a negative characterisation' },
        { text: 'A controversial political figure', misconception: 'Confuses "provocateur" with "dilettante" — they are separate descriptions' },
        { text: 'A generous philanthropist', misconception: 'No connection to the context of knowledge and expertise' },
      ],
      correctIndex: 0,
      difficulty: 0.55,
    },
  },
  {
    id: 'item.mcq.c2.l04', type: 'mcq', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      stem: 'A radio commentator says: "The government\'s U-turn on the policy was executed with all the grace of a three-point turn in a cul-de-sac." The commentator is saying the U-turn was:',
      options: [
        { text: 'Clumsy and awkward', misconception: null },
        { text: 'Smooth and well-managed', misconception: 'Opposite — a three-point turn in a dead end is the epitome of awkwardness' },
        { text: 'Quick and decisive', misconception: 'Three-point turns in tight spaces are slow and difficult' },
        { text: 'Illegal and dangerous', misconception: 'The metaphor is about gracefulness, not legality' },
      ],
      correctIndex: 0,
      difficulty: 0.5,
    },
  },
  {
    id: 'item.mcq.c2.l05', type: 'mcq', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      stem: 'A professor says: "What\'s particularly insidious about this form of bias is its very invisibility — those who exhibit it most strongly are often the most adamant that they are entirely objective." The word "insidious" here means:',
      options: [
        { text: 'Harmful in a gradual, subtle way that is hard to notice', misconception: null },
        { text: 'Obvious and easily detected', misconception: 'Opposite — the professor emphasises "invisibility"' },
        { text: 'Deliberately malicious', misconception: '"Insidious" implies subtlety, not deliberate intent' },
        { text: 'Temporary and short-lived', misconception: 'No implication of the bias being temporary' },
      ],
      correctIndex: 0,
      difficulty: 0.6,
    },
  },
  {
    id: 'item.mcq.c2.l06', type: 'mcq', level: 'C2', skill: 'listening',
    nodeIds: ['cando.c2.understand_any_speech'],
    payload: {
      stem: 'In a seminar, a student says: "Isn\'t that essentially a mereological fallacy?" The student is raising a concern about:',
      options: [
        { text: 'Attributing properties of the whole to its parts, or vice versa', misconception: null },
        { text: 'Using statistics incorrectly', misconception: 'Mereology is about part-whole relationships, not statistics' },
        { text: 'Arguing in a circle', misconception: 'Circular reasoning is a different fallacy — petitio principii' },
        { text: 'Generalising from insufficient evidence', misconception: 'This describes a hasty generalisation, not a mereological fallacy' },
      ],
      correctIndex: 0,
      difficulty: 0.8,
    },
  },

  // # ─── GAP FILL (8) ─────────────────────────────────────────────────
  // # Advanced grammar and vocabulary — subjunctive, collocations, register.
  {
    id: 'item.gf.c2.01', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: 'The board insisted that the CEO ______ before the investigation concluded.',
      gaps: [{ index: 0, acceptedAnswers: ['resign', 'step down'], hint: 'Subjunctive — no -s on third person' }],
      difficulty: 0.6,
    },
  },
  {
    id: 'item.gf.c2.02', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: 'It is imperative that every student ______ the deadline without exception.',
      gaps: [{ index: 0, acceptedAnswers: ['meet', 'observe', 'respect'], hint: 'Subjunctive mood — base form of the verb' }],
      difficulty: 0.6,
    },
  },
  {
    id: 'item.gf.c2.03', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The negotiations reached an ______ when neither side would compromise on the key issue.',
      gaps: [{ index: 0, acceptedAnswers: ['impasse', 'deadlock', 'stalemate'], hint: 'A noun meaning a situation where no progress is possible' }],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.gf.c2.04', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'His argument, while superficially ______, fell apart under closer scrutiny.',
      gaps: [{ index: 0, acceptedAnswers: ['plausible', 'compelling', 'persuasive', 'convincing'], hint: 'An adjective meaning believable or reasonable on the surface' }],
      difficulty: 0.55,
    },
  },
  {
    id: 'item.gf.c2.05', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The report was criticised for its ______ optimism in the face of overwhelming contrary evidence.',
      gaps: [{ index: 0, acceptedAnswers: ['unwarranted', 'misplaced', 'unfounded'], hint: 'An adjective meaning not justified or supported' }],
      difficulty: 0.55,
    },
  },
  {
    id: 'item.gf.c2.06', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['gram.c2.subjunctive'],
    payload: {
      stem: 'Were it not for her ______ intervention, the project would have collapsed entirely.',
      gaps: [{ index: 0, acceptedAnswers: ['timely', 'decisive', 'crucial'], hint: 'An adjective describing the quality of the intervention' }],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.gf.c2.07', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The artist\'s later work represents a marked ______ from her earlier, more conventional style.',
      gaps: [{ index: 0, acceptedAnswers: ['departure', 'shift', 'deviation'], hint: 'A noun meaning a significant change from something' }],
      difficulty: 0.5,
    },
  },
  {
    id: 'item.gf.c2.08', type: 'gap_fill', level: 'C2', skill: 'general',
    nodeIds: ['lex.c2.idiomatic_language'],
    payload: {
      stem: 'The allegations, though never ______, cast a long shadow over his political career.',
      gaps: [{ index: 0, acceptedAnswers: ['substantiated', 'corroborated', 'proven', 'proved'], hint: 'A past participle meaning confirmed with evidence' }],
      difficulty: 0.6,
    },
  },

  // # ─── READING PASSAGE (3) ──────────────────────────────────────────
  // # Complex, abstract texts (400–600 words) requiring inference and analysis.
  {
    id: 'item.rp.c2.01', type: 'reading_passage', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      title: 'The Paradox of Choice',
      passage: 'The contemporary consumer inhabits a world of unprecedented abundance. Where once the challenge was scarcity — finding any viable option — the modern predicament is one of surfeit. The average supermarket stocks upwards of 40,000 products; streaming services offer catalogues numbering in the tens of thousands; and dating applications present an effectively infinite pool of potential partners. The psychologist Barry Schwartz termed this "the paradox of choice": the counterintuitive finding that an excess of options, rather than liberating the individual, tends to produce anxiety, decision fatigue, and a pervasive sense of dissatisfaction.\n\nThe mechanism is elegantly simple. When faced with two alternatives, the rejected option represents a single, manageable sacrifice. When faced with two hundred, every selection entails the implicit rejection of one hundred and ninety-nine alternatives, each of which might have been superior. The result is what economists call "opportunity cost salience" — an acute awareness of what has been foregone. This awareness is compounded by what Schwartz identifies as "maximising" behaviour: the tendency to seek not merely a satisfactory outcome but the optimal one, a pursuit that becomes exponentially more burdensome as the option set expands.\n\nCritics of Schwartz\'s thesis have noted that his evidence is drawn disproportionately from Western, educated, industrialised populations — the so-called WEIRD demographic — and that the paradox may be less a universal feature of human cognition than a culturally specific phenomenon. Others have pointed out that the relevant variable is not the number of options per se but the individual\'s perception of the stakes involved: choosing between forty brands of marmalade is qualitatively different from choosing between forty pension schemes.\n\nNevertheless, the paradox of choice has found practical application in fields ranging from user interface design to public policy. The behavioural economist Richard Thaler\'s concept of "libertarian paternalism" — structuring choices so that the default option is the one most likely to serve the individual\'s interests while preserving freedom of choice — owes a considerable intellectual debt to Schwartz\'s work. Similarly, the minimalist movement, which advocates the deliberate reduction of possessions and commitments, can be understood as an individual-level response to the collective malaise that Schwartz describes.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'What does "opportunity cost salience" refer to in this context?', options: ['A heightened awareness of what was given up by choosing one option', 'The financial cost of making a purchase', 'The time spent comparing products', 'The marketing strategy of showing alternatives'], correctAnswer: 0, explanation: 'The passage defines it as "an acute awareness of what has been foregone."' },
        { id: 'q2', questionType: 'mcq', text: 'What is the main criticism of Schwartz\'s thesis mentioned in the passage?', options: ['His research is too expensive', 'His findings may only apply to specific Western populations', 'He has too few options in his studies', 'His theory contradicts economic principles'], correctAnswer: 1, explanation: 'Critics note his evidence is drawn from WEIRD (Western, educated, industrialised) populations.' },
        { id: 'q3', questionType: 'tfng', text: 'The passage suggests that choosing between brands of marmalade and choosing between pension schemes involve the same psychological processes.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage explicitly states these are "qualitatively different" — the stakes involved change the experience.' },
        { id: 'q4', questionType: 'mcq', text: 'How does the passage characterise the relationship between Thaler\'s "libertarian paternalism" and Schwartz\'s work?', options: ['Thaler\'s concept directly contradicts Schwartz', 'Thaler\'s concept builds on Schwartz\'s insights', 'They are entirely unrelated ideas', 'Schwartz borrowed the concept from Thaler'], correctAnswer: 1, explanation: 'The passage says Thaler\'s concept "owes a considerable intellectual debt to Schwartz\'s work."' },
      ],
      difficulty: 0.7,
    },
  },
  {
    id: 'item.rp.c2.02', type: 'reading_passage', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text'],
    payload: {
      title: 'The Ethics of Artificial Memory',
      passage: 'The prospect of artificial memory enhancement — whether through pharmacological intervention, neural implants, or digital augmentation — raises ethical questions that existing frameworks are ill-equipped to address. Memory, as the philosopher John Locke recognised in the seventeenth century, is constitutive of personal identity: we are, in a meaningful sense, the sum of what we remember. To alter memory, therefore, is not merely to modify a cognitive faculty but to reshape the self.\n\nConsider the case of traumatic memory. Current therapeutic approaches, including EMDR and prolonged exposure therapy, aim to reduce the emotional intensity of traumatic recollections without erasing the factual content. A pharmacological agent capable of selectively deleting specific memories would represent a qualitative leap: not merely dimming the emotional valence of a recollection but excising it entirely. The therapeutic benefits are obvious. Yet so are the complications. A soldier who has committed atrocities cannot be morally absolved by forgetting them; a victim of domestic abuse who forgets the pattern of escalation loses a vital protective heuristic.\n\nAt the other end of the spectrum, enhancement raises its own dilemmas. A student who implants a chip containing the entire corpus of medical knowledge has not thereby become a physician; the chip provides information but not the clinical judgement that transforms information into wisdom. Yet they would possess a decisive advantage over peers who must laboriously acquire the same knowledge through years of study. The meritocratic assumptions that underpin professional credentialing — that achievement reflects effort, talent, and character — would be fundamentally undermined.\n\nPerhaps most troubling is the question of consent across time. The person who chooses to enhance or delete a memory is, by definition, a different person from the one who will live with the consequences of that choice. The twenty-year-old who elects to forget a painful relationship may deprive the thirty-year-old they will become of a formative experience. We do not, as a rule, allow present selves to make irrevocable decisions on behalf of future selves — yet memory modification demands precisely this.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'Why does the author reference John Locke?', options: ['To establish that memory is central to personal identity', 'To argue against memory enhancement', 'To provide a historical timeline of memory research', 'To criticise philosophical approaches to ethics'], correctAnswer: 0, explanation: 'The passage cites Locke to establish that "memory is constitutive of personal identity."' },
        { id: 'q2', questionType: 'mcq', text: 'What is the author\'s concern about a soldier who forgets atrocities?', options: ['The soldier might repeat them', 'Forgetting does not provide moral absolution', 'The military would lose valuable intelligence', 'Other soldiers would be envious'], correctAnswer: 1, explanation: 'The passage states that a soldier "cannot be morally absolved by forgetting" the acts.' },
        { id: 'q3', questionType: 'tfng', text: 'The author believes that implanting medical knowledge is equivalent to becoming a physician.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The passage explicitly states the chip "provides information but not the clinical judgement."' },
        { id: 'q4', questionType: 'mcq', text: 'What does the author mean by "consent across time"?', options: ['Getting permission from multiple people simultaneously', 'The problem that the person making the decision differs from the one living with its consequences', 'A legal framework for memory modification', 'The time required to process consent forms'], correctAnswer: 1, explanation: 'The passage explains that "the person who chooses to enhance or delete a memory is a different person from the one who will live with the consequences."' },
      ],
      difficulty: 0.8,
    },
  },
  {
    id: 'item.rp.c2.03', type: 'reading_passage', level: 'C2', skill: 'reading',
    nodeIds: ['cando.c2.read_any_text', 'lex.c2.idiomatic_language'],
    payload: {
      title: 'The Decline of Expertise',
      passage: 'In 2017, Tom Nichols published "The Death of Expertise," arguing that contemporary culture had developed an active hostility toward established knowledge. The book struck a nerve. Nichols\'s central claim — that democratised access to information had been confused with the democratisation of expertise itself — articulated a disquiet felt across professional and academic communities.\n\nThe confusion is understandable, if pernicious. The internet has indeed made information universally accessible, collapsing asymmetries that once gave professionals their authority. A patient can now read the same journal articles as their oncologist; a homeowner can access the same building regulations as their architect. The problem arises when access to information is mistaken for the capacity to interpret it. Reading a meta-analysis of cancer treatments does not equip one to weigh the relative merits of chemotherapy protocols any more than reading a statute equips one to practise law.\n\nNichols traces the roots of this confusion to several converging developments: the expansion of higher education, which created millions of degree-holders who believed their qualifications in one domain conferred competence across all domains; the rise of twenty-four-hour news, which elevated the pundit — the professional opinionist — above the specialist; and the architecture of social media, which flattened all voices to the same typographical register, rendering a Nobel laureate\'s tweet visually indistinguishable from a teenager\'s.\n\nYet Nichols\'s argument, while broadly compelling, contains a tension he never fully resolves. If expertise is as fragile and context-dependent as he suggests — if even distinguished specialists regularly err outside their narrow domains — then the public\'s scepticism is not entirely irrational. The appropriate response is not a return to uncritical deference but the development of a more sophisticated epistemology: one capable of distinguishing between healthy scepticism and corrosive denialism, and between the expert who speaks within their competence and the one who has wandered beyond it.',
      questions: [
        { id: 'q1', questionType: 'mcq', text: 'According to the passage, what has been "confused" in contemporary culture?', options: ['Access to information and the ability to interpret it', 'Education and intelligence', 'Social media and traditional media', 'Democracy and expertise'], correctAnswer: 0, explanation: 'The passage states that "democratised access to information had been confused with the democratisation of expertise itself."' },
        { id: 'q2', questionType: 'mcq', text: 'What role does social media play according to Nichols?', options: ['It makes experts more accessible to the public', 'It makes all voices appear equally authoritative', 'It helps the public verify expert claims', 'It has no significant effect on how expertise is perceived'], correctAnswer: 1, explanation: 'Social media "flattened all voices to the same typographical register, rendering a Nobel laureate\'s tweet visually indistinguishable from a teenager\'s."' },
        { id: 'q3', questionType: 'tfng', text: 'The author fully agrees with Nichols\'s argument without reservation.', options: ['True', 'False', 'Not Given'], correctAnswer: 1, explanation: 'The author identifies "a tension he never fully resolves" and suggests a more nuanced response.' },
        { id: 'q4', questionType: 'mcq', text: 'What does the author propose as the appropriate response to the decline of expertise?', options: ['Returning to uncritical trust in authorities', 'Developing a more sophisticated ability to evaluate expertise', 'Banning non-experts from public discourse', 'Expanding higher education further'], correctAnswer: 1, explanation: 'The author calls for "a more sophisticated epistemology" that distinguishes healthy scepticism from denialism.' },
      ],
      difficulty: 0.75,
    },
  },

  // # ─── WRITING TASK — C2 additions (3) ──────────────────────────────
  // # Advanced academic and professional writing.
  {
    id: 'item.wt.c2.04', type: 'writing_task', level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: {
      prompt: 'Some commentators argue that the concept of "national identity" is becoming obsolete in an increasingly globalised world. To what extent do you agree or disagree? Provide a nuanced argument that acknowledges the complexity of the issue.',
      format: 'essay',
      minWords: 300,
      maxWords: 450,
      timeMinutes: 40,
      rubric: [
        { name: 'Argumentation', description: 'Develops a nuanced, multi-layered argument with evidence and counter-arguments', maxScore: 9 },
        { name: 'Coherence', description: 'Logical structure with sophisticated cohesive devices and paragraph management', maxScore: 9 },
        { name: 'Lexical Sophistication', description: 'Precise, varied vocabulary including idiomatic and figurative language', maxScore: 9 },
        { name: 'Grammatical Range', description: 'Wide range of complex structures used accurately and appropriately', maxScore: 9 },
      ],
      modelAnswer: 'The proposition that national identity is becoming obsolete conflates two distinct phenomena: the erosion of the nation-state as a political unit and the persistence of national identity as a cultural and psychological construct. While globalisation has undeniably attenuated certain aspects of national sovereignty — trade barriers, information flows, and labour markets increasingly transcend borders — it has simultaneously provoked a defensive reassertion of national identity in many contexts. The Brexit referendum, the resurgence of nationalist movements across Europe, and the protectionist turn in American trade policy all suggest that reports of national identity\'s demise have been, to borrow Twain\'s phrase, greatly exaggerated. The more defensible position is that national identity is being transformed rather than abolished: hybridised, contested, and redefined, but far from obsolete.',
      difficulty: 0.8,
    },
  },
  {
    id: 'item.wt.c2.05', type: 'writing_task', level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: {
      prompt: 'Write a critical review (300–400 words) of the following claim: "Artificial intelligence will make human creativity redundant within a generation." Your review should demonstrate sophisticated argumentation and academic register.',
      format: 'essay',
      minWords: 300,
      maxWords: 400,
      timeMinutes: 35,
      rubric: [
        { name: 'Critical Analysis', description: 'Evaluates the claim from multiple perspectives with nuanced reasoning', maxScore: 9 },
        { name: 'Academic Register', description: 'Maintains appropriate formality, hedging, and scholarly conventions', maxScore: 9 },
        { name: 'Lexical Precision', description: 'Uses precise, discipline-appropriate vocabulary', maxScore: 9 },
        { name: 'Structural Coherence', description: 'Clear thesis, developed body, and synthesised conclusion', maxScore: 9 },
      ],
      modelAnswer: 'The claim that artificial intelligence will render human creativity redundant within a generation rests on a category error: it conflates the capacity to generate novel outputs with the capacity for creative intentionality. Current AI systems, however impressive their outputs, operate through sophisticated pattern matching across vast training corpora — they recombine existing cultural artefacts rather than originating new conceptual frameworks. While AI may indeed automate certain creative tasks — formulaic copywriting, stock illustration, routine musical composition — the irreducibly human dimensions of creativity, including the capacity for metaphor, for emotional authenticity, and for the kind of imaginative leap that transforms a discipline, remain beyond algorithmic reach.',
      difficulty: 0.85,
    },
  },
  {
    id: 'item.wt.c2.06', type: 'writing_task', level: 'C2', skill: 'writing',
    nodeIds: ['cando.c2.write_complex_reports'],
    payload: {
      prompt: 'Write a formal report (350–500 words) evaluating the potential benefits and risks of implementing a four-day working week across a national economy. Include recommendations based on available evidence.',
      format: 'report',
      minWords: 350,
      maxWords: 500,
      timeMinutes: 45,
      rubric: [
        { name: 'Evidence-Based Reasoning', description: 'Uses data, examples, and logical reasoning to support claims', maxScore: 9 },
        { name: 'Register and Tone', description: 'Maintains formal, objective, professional register throughout', maxScore: 9 },
        { name: 'Report Structure', description: 'Clear sections: introduction, analysis, recommendations, conclusion', maxScore: 9 },
        { name: 'Language Accuracy', description: 'Complex structures used with precision and minimal error', maxScore: 9 },
      ],
      modelAnswer: 'Executive Summary: This report evaluates the viability of a nationwide transition to a four-day working week. Evidence from pilot programmes in Iceland, the UK, and Japan suggests measurable improvements in employee wellbeing and, in many cases, maintained or increased productivity. However, the generalisability of these findings to entire economies remains contested, particularly in sectors where continuous staffing is operationally essential. Recommendation: a phased, sector-specific implementation supported by longitudinal monitoring, with exemptions for emergency services, healthcare, and critical infrastructure.',
      difficulty: 0.75,
    },
  },

  // # ─── SPEAKING PROMPT — Listening-adjacent (3) ─────────────────────
  // # C2 discussion topics that test ability to understand and respond
  // # to complex spoken arguments.
  {
    id: 'item.sp.c2.08', type: 'speaking_prompt', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: {
      prompt: 'Discuss the implications of deep-fake technology for democratic processes and public trust.',
      format: 'part3_discussion',
      followUpQuestions: [
        'To what extent should governments regulate deep-fake technology?',
        'Is it possible to maintain public trust in an era of synthetic media?',
        'How might deep-fakes affect the concept of evidence in legal proceedings?',
      ],
      prepTimeSeconds: 60,
      speakTimeSeconds: 300,
      targetLanguage: ['proliferation of synthetic media', 'epistemic uncertainty', 'erosion of trust', 'regulatory frameworks', 'authentication protocols', 'democratic discourse'],
      modelAnswerNotes: 'Should address: the asymmetry between creation and detection of deep-fakes; implications for electoral integrity; the "liar\'s dividend" — real footage dismissed as fake; philosophical questions about evidence and truth in a post-truth landscape. Vocabulary: synthetic media, adversarial AI, provenance, verification infrastructure.',
      difficulty: 0.8,
    },
  },
  {
    id: 'item.sp.c2.09', type: 'speaking_prompt', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: {
      prompt: 'Some argue that the concept of "meritocracy" is inherently flawed. Evaluate this claim.',
      format: 'part3_discussion',
      followUpQuestions: [
        'Can a truly meritocratic society exist, given structural inequalities?',
        'How does inherited privilege undermine meritocratic ideals?',
        'What alternative frameworks for distributing opportunity have been proposed?',
      ],
      prepTimeSeconds: 60,
      speakTimeSeconds: 300,
      targetLanguage: ['structural inequality', 'social mobility', 'inherited privilege', 'level playing field', 'systemic barriers', 'equal opportunity versus equal outcome'],
      modelAnswerNotes: 'Should interrogate: the assumption that talent and effort are independent of circumstances; the role of education, health, and networks as non-meritocratic advantages; Michael Young\'s original satirical intent in coining "meritocracy"; alternative frameworks such as Rawlsian justice or capabilities approach.',
      difficulty: 0.85,
    },
  },
  {
    id: 'item.sp.c2.10', type: 'speaking_prompt', level: 'C2', skill: 'speaking',
    nodeIds: ['cando.c2.discuss_any_topic'],
    payload: {
      prompt: 'Evaluate the proposition that privacy is no longer a realistic expectation in the digital age.',
      format: 'part3_discussion',
      followUpQuestions: [
        'Where should the line be drawn between security and privacy?',
        'How do cultural attitudes to privacy differ across societies?',
        'Is the "nothing to hide" argument philosophically sound?',
      ],
      prepTimeSeconds: 60,
      speakTimeSeconds: 300,
      targetLanguage: ['surveillance capitalism', 'data sovereignty', 'informed consent', 'right to be forgotten', 'algorithmic profiling', 'panopticon'],
      modelAnswerNotes: 'Should address: the distinction between privacy as a legal right and as a practical reality; Shoshana Zuboff\'s concept of surveillance capitalism; the asymmetry of power between individuals and corporations/states; cultural variation in privacy expectations; the philosophical foundations of privacy as autonomy.',
      difficulty: 0.8,
    },
  },
]
