// # Blog article data — SEO-targeted content for organic traffic.
// # Each article targets a high-volume search keyword in the
// # IELTS/PTE/OET/English learning space.

export interface BlogArticle {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: number
  category: 'ielts' | 'pte' | 'oet' | 'english' | 'study-tips'
  tags: string[]
  // # Each article gets a unique cover composition (0-9).
  coverId: number
  content: string
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'ielts-writing-task-2-tips',
    title: 'IELTS Writing Task 2: 10 Tips to Score Band 7+',
    description: 'Proven strategies for IELTS Writing Task 2 essays. Learn how to structure your argument, manage time, and avoid common mistakes that cost you band points.',
    publishedAt: '2026-08-01',
    readingTime: 8,
    category: 'ielts',
    tags: ['IELTS', 'Writing', 'Task 2', 'Band 7'],
    coverId: 0,
    content: `## Why Task 2 Matters More Than You Think

IELTS Writing Task 2 accounts for two-thirds of your Writing band score. A strong Task 2 can compensate for a weaker Task 1, but not the other way around. Yet most candidates spend too long on Task 1 and rush through Task 2.

## 1. Spend 40 Minutes, Not 30

The recommended split is 20 minutes for Task 1 and 40 minutes for Task 2. Many candidates ignore this. Task 2 is worth double — give it double the time.

## 2. Plan Before You Write

Spend 5 minutes planning. Write your thesis statement, list 2-3 main ideas, and note one example for each. A planned essay reads coherently. An unplanned one rambles.

**Planning template:**
- Thesis: your position in one sentence
- Body 1: main idea + example/evidence
- Body 2: main idea + example/evidence
- Body 3 (optional): concession or additional point

## 3. Answer the Question — All of It

Read the prompt twice. Underline the key instruction words: "discuss both views and give your opinion", "to what extent do you agree", "what are the causes and solutions". If the prompt asks for both causes AND solutions, you must cover both. Partial answers are capped at Band 5 for Task Achievement.

## 4. Use a Clear 4-Paragraph Structure

Introduction, Body 1, Body 2, Conclusion. This isn't creative writing — examiners want clarity. Each body paragraph needs a topic sentence, explanation, and example.

**Example topic sentence:** "The primary reason for urban air pollution is the reliance on private vehicles for daily commuting."

## 5. Write a Strong Thesis in the Introduction

Your introduction should paraphrase the question and state your position. Two sentences is enough. Don't write a long background paragraph — it wastes time and adds nothing to your score.

**Weak:** "In today's modern world, there are many problems that affect society and one of them is pollution which I will discuss in this essay."

**Strong:** "While some argue that government regulation is the most effective way to reduce pollution, I believe that individual behaviour change is equally important."

## 6. Use Specific Examples

"Many countries have this problem" scores lower than "In Beijing, the PM2.5 index exceeded 300 on 58 days in 2023, forcing schools to cancel outdoor activities." You don't need to cite sources — just be specific and plausible.

## 7. Vary Your Sentence Structure

Mix simple, compound, and complex sentences. Examiners score Grammatical Range — using only simple sentences caps you at Band 5-6.

- Simple: "Pollution affects health."
- Compound: "Pollution affects health, and it also damages ecosystems."
- Complex: "Although governments have introduced emission standards, pollution levels continue to rise in developing nations."

## 8. Use Cohesive Devices Naturally

"Firstly, Secondly, Thirdly, In conclusion" is mechanical and overused. Instead, use topic sentences that logically connect to the previous paragraph. Natural cohesion scores higher than forced linking words.

## 9. Don't Memorise Templates

Examiners are trained to spot memorised essays. They mark them down for "lack of original thought." Learn structures, not scripts. Your language should feel natural, not rehearsed.

## 10. Check Your Work

Leave 3 minutes to proofread. Look for:
- Subject-verb agreement errors
- Missing articles (a, an, the)
- Spelling mistakes in common words
- Run-on sentences

These small errors compound. Fixing 5 grammar mistakes can push you from Band 6.5 to Band 7.

## What Band 7 Actually Looks Like

Band 7 requires:
- **Task Achievement:** A clear position maintained throughout, with well-developed main ideas
- **Coherence:** Logical progression, clear paragraphing, effective use of cohesive devices
- **Lexical Resource:** Sufficient vocabulary with some awareness of style and collocation
- **Grammar:** A variety of complex structures with frequent error-free sentences

You don't need to be perfect. You need to be clear, specific, and structured.

## Practice With AI Feedback

The fastest way to improve is to write under timed conditions and get immediate, criteria-specific feedback. FluentPath's AI writing assessment scores your essay on all four IELTS criteria and shows you exactly where to improve — in seconds, not days.`,
  },
  {
    slug: 'pte-vs-ielts-which-is-easier',
    title: 'PTE vs IELTS: Which Is Easier? An Honest Comparison',
    description: 'A detailed comparison of PTE Academic and IELTS — difficulty, scoring, format, acceptance, and which test suits your strengths.',
    publishedAt: '2026-08-03',
    readingTime: 7,
    category: 'study-tips',
    tags: ['PTE', 'IELTS', 'Comparison', 'Test Selection'],
    coverId: 1,
    content: `## The Short Answer

Neither test is objectively easier. PTE favours fast readers and clear speakers. IELTS favours strong writers and those comfortable with human interaction. Your strengths determine which test is "easier" for you.

## Format Differences

### IELTS
- **Speaking:** Face-to-face with a human examiner, 11-14 minutes
- **Writing:** Handwritten (paper-based) or typed (computer-based)
- **Scoring:** Human examiners score writing and speaking
- **Results:** 13 calendar days (paper) or 3-5 days (computer)

### PTE Academic
- **Speaking:** Record into a microphone, computer-scored
- **Writing:** Typed only
- **Scoring:** Entirely computer-scored (AI algorithms)
- **Results:** Usually within 48 hours

## Who Should Choose PTE

PTE Academic is better if you:
- Have clear pronunciation but feel nervous speaking to a human
- Type faster than you handwrite
- Want results quickly (visa deadlines, university applications)
- Are comfortable with integrated tasks (read, then speak about what you read)
- Score well on reading — PTE's reading section can boost your overall score

## Who Should Choose IELTS

IELTS is better if you:
- Express yourself more naturally in conversation than recorded speech
- Have strong writing skills (IELTS writing is scored by humans who appreciate nuance)
- Prefer standalone tasks (reading passages are independent, not integrated)
- Need the test for UK visa applications (IELTS is the only SELT-approved test for most UK visas)

## Score Equivalence

| IELTS Band | PTE Score |
|-----------|-----------|
| 9.0 | 86-90 |
| 8.0 | 79-85 |
| 7.0 | 65-78 |
| 6.5 | 58-64 |
| 6.0 | 50-57 |
| 5.0 | 36-49 |

Most universities and immigration authorities accept both. Check your specific institution's requirements — some specify one or the other.

## The Scoring Debate

IELTS writing is scored by trained human examiners. This means:
- Your handwriting quality can subtly influence scores
- Examiners recognise and reward genuine argumentation
- But there's inherent subjectivity — two examiners might give different scores

PTE is entirely computer-scored. This means:
- Consistent scoring — you'll get the same score regardless of when or where you test
- The algorithm values specific patterns (keyword matching, pronunciation clarity)
- But it can miss nuance and reward formulaic responses

## Acceptance

Both tests are widely accepted:
- **Australia:** Both accepted for student and migration visas
- **Canada:** Both accepted for Express Entry and study permits
- **UK:** IELTS for most visas; PTE accepted for some visa categories
- **USA:** Both accepted by most universities
- **New Zealand:** Both accepted

Always verify with your specific institution or immigration authority.

## Cost Comparison

Both tests cost approximately $200-250 USD, depending on your country. PTE occasionally offers discounts. Neither is significantly cheaper.

## Preparation Strategy

The best strategy: take a practice test for both and compare your scores. FluentPath offers mock tests for both IELTS and PTE Academic with AI scoring, so you can make an informed decision before booking.

## Bottom Line

Choose the test that plays to your strengths. If you're unsure, take FluentPath's free placement test — it assesses all four skills and gives you a CEFR level that maps to both IELTS bands and PTE scores.`,
  },
  {
    slug: 'ielts-speaking-part-2-cue-card-strategy',
    title: 'IELTS Speaking Part 2: How to Handle Any Cue Card',
    description: 'A complete strategy for IELTS Speaking Part 2 — how to use preparation time, structure your talk, and speak for 2 minutes on any topic.',
    publishedAt: '2026-08-05',
    readingTime: 6,
    category: 'ielts',
    tags: ['IELTS', 'Speaking', 'Part 2', 'Cue Card'],
    coverId: 2,
    content: `## The Challenge

You get a cue card with a topic and 4 bullet points. You have 1 minute to prepare and must speak for 1-2 minutes. Most candidates either run out of things to say after 40 seconds or ramble without structure.

## The 1-Minute Preparation

Don't try to write full sentences. You only have 60 seconds. Instead:

1. **Read all bullet points** (10 seconds)
2. **Write 4-5 keywords** — one per bullet point, plus one for your opening (20 seconds)
3. **Think of one specific example or story** (20 seconds)
4. **Decide your closing sentence** (10 seconds)

Your notes are a roadmap, not a script. Write single words that trigger full ideas.

## The Structure

**Opening (10 seconds):** Introduce the topic naturally.
"I'd like to talk about a time when I had to make a difficult decision..."

**Bullet point 1 (20-25 seconds):** Set the scene — when, where, who.

**Bullet point 2 (20-25 seconds):** Describe the situation in detail.

**Bullet point 3 (20-25 seconds):** Explain your feelings, actions, or the outcome.

**Bullet point 4 (20-25 seconds):** Reflect — what you learned, how it changed you.

**Closing (5-10 seconds):** Wrap up with a reflective statement.
"Looking back, I think that experience taught me that..."

## The Storytelling Technique

The highest-scoring candidates tell a story, not list facts. Compare:

**Weak:** "The place I want to describe is Paris. Paris is in France. It is a famous city. Many tourists visit Paris."

**Strong:** "The place that comes to mind is a small bookshop I stumbled into during my first trip to Paris. It was tucked away on a side street near the Seine, and what struck me immediately was the smell — old paper and coffee."

The second version is vivid, personal, and impossible to run out of material on — because you're describing an experience, not listing facts.

## When You Run Out of Things to Say

If you finish early, use these extenders:
- "Actually, now that I think about it..."
- "What made it particularly memorable was..."
- "If I compare it to similar experiences..."
- "I think the reason this stands out is..."

These buy you 15-20 seconds each and sound natural.

## Common Mistakes

1. **Speaking too fast** — Nervousness causes rushing. Deliberately slow down. Pausing to think is not penalised; unclear speech is.

2. **Ignoring bullet points** — The examiner expects you to cover all points. Skipping one suggests you can't handle the full topic.

3. **Memorised answers** — Examiners can tell. Your intonation flattens, your eye contact breaks, and your language becomes unnaturally formal.

4. **One-word answers to Part 3** — Part 3 follows immediately. The examiner will ask follow-up questions. Give full, developed answers.

## Practice Strategy

Record yourself responding to cue cards under timed conditions. Listen back and check:
- Did you speak for at least 90 seconds?
- Did you cover all bullet points?
- Did you use specific examples?
- Was your grammar varied (not just simple sentences)?

FluentPath's AI speaking assessment gives you instant scores on Fluency, Vocabulary, Grammar, and Pronunciation — the same criteria IELTS examiners use.`,
  },
  {
    slug: 'oet-writing-referral-letter-guide',
    title: 'OET Writing: How to Write a Referral Letter That Passes',
    description: 'Step-by-step guide to the OET Writing sub-test — structure, tone, what to include, and common mistakes that fail candidates.',
    publishedAt: '2026-08-07',
    readingTime: 7,
    category: 'oet',
    tags: ['OET', 'Writing', 'Referral Letter', 'Healthcare'],
    coverId: 3,
    content: `## What the OET Writing Task Requires

You receive case notes about a patient and must write a referral, discharge, or transfer letter to another healthcare professional. You have 45 minutes and must write approximately 180-200 words.

This is not an essay. It is a professional clinical letter.

## The Structure

Every OET letter follows this format:

**Opening:** State the purpose of the letter and identify the patient.
"I am writing to refer Mrs. Ananya Patel, a 62-year-old female, for further investigation of persistent lower back pain."

**Body paragraph 1:** Relevant medical history and presenting complaint.

**Body paragraph 2:** Examination findings, test results, current management.

**Body paragraph 3:** Specific request to the recipient — what you need them to do.

**Closing:** Thank the recipient and offer to provide further information.
"I would appreciate your assessment and management of this patient. Please do not hesitate to contact me should you require any further information."

## What to Include From the Case Notes

You will NOT include everything from the case notes. Select only what is relevant to the purpose of the letter. Ask yourself: "Does the recipient need this information to treat the patient?"

**Include:**
- Relevant medical history
- Current medications (if relevant to the referral)
- Key examination findings
- Test results that support the referral
- Current treatment and response

**Exclude:**
- Social chit-chat from the consultation
- Medical history unrelated to the referral
- Detailed family history (unless directly relevant)
- Information the recipient already knows

## Tone and Register

OET writing requires a formal, professional tone. This means:

- Use clinical language: "The patient presents with" not "The patient has got"
- Use passive voice where appropriate: "An X-ray was performed" not "I did an X-ray"
- Be concise: "The patient reports a 3-week history of cough" not "The patient told me that for the last three weeks they have been coughing"
- Avoid contractions: "does not" not "doesn't"

## Common Mistakes That Fail Candidates

1. **Copying case notes verbatim** — The examiner wants to see you transform telegraphic notes into fluent prose. "Pt c/o LBP x 3/52" must become "The patient presents with a three-week history of lower back pain."

2. **Including everything** — Relevance is scored. Including irrelevant information suggests poor clinical judgment.

3. **Wrong recipient** — Read who you're writing to. A letter to a GP reads differently from one to a specialist or a community nurse.

4. **Missing the purpose** — If the task says "write a referral letter," your letter must clearly request a specific action from the recipient.

5. **Poor organisation** — Information should flow logically: history, then examination, then request. Don't jump between past and present.

## Scoring Criteria

OET Writing is scored on:
- **Overall task fulfilment:** Did you address the purpose? Is information relevant?
- **Appropriateness of language:** Is the tone professional? Is the register correct?
- **Comprehension of case notes:** Did you accurately interpret and transform the notes?
- **Linguistic features:** Grammar, vocabulary, spelling, punctuation

You need a B grade (score of 350+) to pass. Most regulatory bodies require B in all four sub-tests.

## Practice Approach

Write one referral letter per day under timed conditions. Compare your letter against the case notes and check: Did I include only relevant information? Did I transform the notes into proper sentences? Did I clearly state the purpose?

FluentPath provides OET writing practice with AI feedback scored against OET criteria — so you know exactly where you stand before test day.`,
  },
  {
    slug: 'how-to-improve-english-vocabulary-fast',
    title: 'How to Build English Vocabulary Fast: 7 Methods That Actually Work',
    description: 'Evidence-based vocabulary learning strategies — spaced repetition, context learning, word families, and how to move from passive to active vocabulary.',
    publishedAt: '2026-08-09',
    readingTime: 6,
    category: 'english',
    tags: ['Vocabulary', 'English Learning', 'Study Methods'],
    coverId: 4,
    content: `## Why Most Vocabulary Study Fails

Memorising word lists doesn't work. Research shows you forget 80% of new words within 24 hours if you only see them once. Yet that's exactly what most learners do — read a list, feel productive, forget everything.

Effective vocabulary building requires three things: **context**, **repetition**, and **use**.

## 1. Learn Words in Context, Not Isolation

Don't memorise "ubiquitous — existing everywhere." Instead, read: "Smartphones have become ubiquitous in modern life — even in remote villages, you'll find people scrolling through social media." Now "ubiquitous" has a mental image attached to it.

**How to do it:** When you encounter a new word while reading, write down the entire sentence. Your brain stores the word with its context, making recall much easier.

## 2. Use Spaced Repetition

Review new words at increasing intervals: after 1 day, 3 days, 7 days, 14 days, 30 days. Each successful recall strengthens the memory. Each failure resets the interval.

This is the most research-backed vocabulary method. It exploits how human memory works — we remember things better when we review them just before we're about to forget.

## 3. Learn Word Families, Not Single Words

When you learn "investigate," also learn:
- investigation (noun)
- investigator (noun — person)
- investigative (adjective)
- investigatory (adjective — formal)

One root word gives you 4-5 usable words. This multiplies your vocabulary efficiently and helps with IELTS/PTE word formation tasks.

## 4. Use the Word Within 24 Hours

The gap between "knowing" a word and "using" a word is huge. Most learners have large passive vocabularies (words they recognise) but small active vocabularies (words they actually use).

**Fix:** After learning a new word, write 2-3 sentences using it. Then try to use it in conversation or writing that day. This forces the word from passive to active memory.

## 5. Group Words by Topic, Not Alphabet

Your brain organises information by association, not alphabetical order. Learn vocabulary in clusters:

**Environment cluster:** deforestation, emissions, sustainability, biodiversity, renewable, carbon footprint, conservation

**Healthcare cluster:** diagnosis, prognosis, chronic, acute, symptom, treatment, rehabilitation

When you need vocabulary for an IELTS essay about the environment, this entire cluster activates at once.

## 6. Read Extensively at Your Level

Reading is the single best way to encounter vocabulary naturally. But the material must be at the right level — you should understand about 95% of the words on a page. If you're looking up every other word, the text is too hard.

**Graded readers:** Cambridge English Readers, Oxford Bookworms, Penguin Readers — all sorted by CEFR level.

**News:** BBC Learning English (A2-B1), BBC News (B2-C1), The Economist (C1-C2).

## 7. Test Yourself Actively

Passive review (re-reading notes) creates an illusion of knowledge. Active recall (testing yourself) creates actual knowledge.

Instead of re-reading your vocabulary notebook, cover the definitions and try to recall them. Or cover the words and try to recall them from the definitions. The struggle of retrieval is what builds memory.

## How Many Words Do You Need?

| Level | Vocabulary Size | What You Can Do |
|-------|----------------|-----------------|
| A1 | 500 | Basic survival — greetings, numbers, simple directions |
| A2 | 1,000 | Daily routines, simple opinions, basic shopping |
| B1 | 2,000 | Work discussions, news articles, social conversations |
| B2 | 4,000 | Academic texts, professional emails, complex arguments |
| C1 | 8,000 | Nuanced discussion, academic writing, professional presentations |
| C2 | 16,000+ | Near-native comprehension and expression |

For IELTS Band 7, you need approximately B2-C1 level vocabulary (4,000-8,000 words) with good control of academic and semi-formal register.

## Start Building Today

FluentPath's vocabulary reference covers 1,250+ entries across 25 categories, all tagged by CEFR level. Combined with adaptive practice that uses spaced repetition, it's the fastest way to build exam-ready vocabulary.`,
  },
  {
    slug: 'ielts-reading-time-management',
    title: 'IELTS Reading: How to Finish All 40 Questions in 60 Minutes',
    description: 'Time management strategies for IELTS Academic Reading — skimming, scanning, question-first approach, and passage prioritisation.',
    publishedAt: '2026-08-11',
    readingTime: 6,
    category: 'ielts',
    tags: ['IELTS', 'Reading', 'Time Management', 'Test Strategy'],
    coverId: 5,
    content: `## The Problem

IELTS Academic Reading gives you 3 passages and 40 questions in 60 minutes. That's 90 seconds per question — including reading time. Most candidates run out of time on Passage 3 and guess the last 10 answers.

## The 20-20-20 Myth

The common advice is to spend 20 minutes per passage. This is wrong. Passages increase in difficulty:
- Passage 1: Easiest (factual, descriptive)
- Passage 2: Moderate (analytical, semi-academic)
- Passage 3: Hardest (abstract, dense academic text)

**Better split:** 15 minutes for Passage 1, 20 minutes for Passage 2, 25 minutes for Passage 3. Finish the easy passage fast, save time for the hard one.

## Read Questions First

Don't read the passage first. Read the questions. This tells you what information to look for, turning reading into a targeted search rather than passive comprehension.

For each question, underline the key search terms — names, dates, specific nouns. These are your scanning targets.

## Skim, Don't Read

For your first pass through a passage, skim:
- Read the title and any subtitles
- Read the first sentence of each paragraph
- Note any names, numbers, or italicised terms

This takes 2-3 minutes and gives you a mental map of where information is located. When you return to answer specific questions, you know which paragraph to read carefully.

## Question Type Strategies

**True/False/Not Given:** The hardest question type. "True" means the passage explicitly states it. "False" means the passage explicitly contradicts it. "Not Given" means the passage doesn't mention it at all. If you're debating between False and Not Given, ask: "Does the passage address this topic?" If yes, it's True or False. If the topic isn't discussed, it's Not Given.

**Matching Headings:** Read the first and last sentence of each paragraph. Headings summarise the main idea, which is almost always in the topic sentence.

**Fill in the Blanks:** The answer is always in the passage verbatim or as a close paraphrase. Don't use your own words — copy from the text.

**Multiple Choice:** Eliminate wrong answers first. If you can eliminate 2 of 4 options, you have a 50% chance even if you're unsure.

## Transfer Answers Efficiently

If you're taking the paper-based test, transfer answers at the end of each passage, not at the very end. Transferring 40 answers in a rush leads to errors (wrong line, misspelling).

Computer-based test: answers save automatically, so this isn't an issue.

## When to Guess

Never leave a question blank. If you have 2 minutes left and 5 unanswered questions, guess intelligently:
- For True/False/Not Given, the distribution is roughly even — pick whichever you've used least
- For multiple choice, pick C if you have no idea (slight statistical advantage in many tests)
- For fill-in-the-blank, write a plausible word from the passage near the referenced paragraph

A guess has a chance. A blank has zero chance.

## Practice Under Timed Conditions

Untimed practice builds comprehension but not exam readiness. Always practice with a timer. FluentPath's mock IELTS reading tests enforce the 60-minute limit and show you exactly which question types are costing you time.`,
  },
  {
    slug: 'pte-speaking-read-aloud-tips',
    title: 'PTE Read Aloud: Score 90 With These Pronunciation Strategies',
    description: 'Master PTE Read Aloud — the highest-value question type. Pacing, intonation, stress patterns, and common pronunciation traps.',
    publishedAt: '2026-08-13',
    readingTime: 5,
    category: 'pte',
    tags: ['PTE', 'Speaking', 'Read Aloud', 'Pronunciation'],
    coverId: 6,
    content: `## Why Read Aloud Is the Most Important PTE Question

Read Aloud is the only PTE question that contributes to BOTH your Speaking AND Reading scores. A strong Read Aloud performance can boost two scores simultaneously. Most high-scorers prioritise this task above all others.

## How It Works

You see a text on screen (60 words maximum). You have 30-40 seconds to prepare, then a 3-second countdown before recording begins. You have up to 40 seconds to read the text aloud.

## The Preparation Phase

Use your 30 seconds wisely:
1. **Read silently once** — understand the meaning
2. **Identify difficult words** — practice them silently
3. **Mark natural pause points** — commas, semicolons, full stops
4. **Note stressed words** — content words (nouns, verbs, adjectives) carry stress

## Pacing

The biggest mistake is reading too fast. Fast reading causes:
- Swallowed syllables (the computer can't recognise them)
- Monotone delivery (no intonation variation)
- Stumbling on complex words

**Aim for 130-150 words per minute.** This is a natural conversational pace. The text is only 60 words, so you'll finish in about 25 seconds — well within the time limit.

## Intonation Patterns

English has predictable intonation:
- **Statements** fall at the end: "The results were CLEAR." (pitch drops on "clear")
- **Lists** rise on each item, fall on the last: "red, BLUE, GREEN, and YELLow." (yellow falls)
- **Questions** rise at the end: "Did you see the reSULTS?" (pitch rises)

The PTE algorithm scores intonation. A flat, robotic reading loses points even if every word is correct.

## Word Stress

English words have fixed stress patterns. Mispronouncing stress is penalised:
- phOtograph (stress on first syllable)
- photoGRAPHic (stress shifts to third syllable)
- phoTOgraphy (stress shifts to second syllable)

**Common traps:** development (dEVelopment, not develOPment), comfortable (COMFortable, not comFORTable), interesting (INteresting, not interESTing).

## Linking and Connected Speech

Natural English links words together:
- "an apple" sounds like "a-NAPple"
- "good idea" sounds like "goo-dIDea"
- "want to" sounds like "wanna" (but for PTE, keep it clear: "want to")

Don't over-link. Clear pronunciation scores higher than natural-but-mumbled speech.

## What to Do When You Stumble

If you mispronounce a word, keep going. Don't go back and re-read it. The algorithm penalises hesitation and self-correction more than a single mispronounced word. One error in a fluent delivery scores better than three corrections in a choppy one.

## Practice Method

Record yourself reading news articles aloud. Play back and compare your pronunciation to a native speaker (BBC News presenters are good models). Focus on one aspect per week: Week 1 = pacing, Week 2 = intonation, Week 3 = stress, Week 4 = linking.

FluentPath's TTS pronunciation feature lets you hear the correct pronunciation of any text, and the AI speaking assessment scores your recording on fluency, pronunciation, and oral fluency — matching PTE's own scoring criteria.`,
  },
  {
    slug: 'english-grammar-mistakes-advanced-learners',
    title: '12 Grammar Mistakes Even Advanced English Learners Make',
    description: 'Common grammar errors at B2-C1 level that hold you back from Band 7+ — articles, prepositions, conditionals, and subtle tense errors.',
    publishedAt: '2026-08-15',
    readingTime: 7,
    category: 'english',
    tags: ['Grammar', 'Advanced', 'Common Mistakes', 'B2-C1'],
    coverId: 7,
    content: `## The B2 Plateau

Most English learners hit a plateau at B2. They can communicate effectively, but their writing and speaking contain persistent errors that cap their exam scores at Band 6-6.5. These aren't beginner mistakes — they're subtle patterns that native speakers notice but learners don't.

## 1. Missing "The" With Unique Things

Wrong: "Sun rises in east."
Right: "**The** sun rises in **the** east."

Use "the" when there's only one of something (the sun, the moon, the government), or when both speaker and listener know which specific thing is meant.

## 2. "Depend" Without "On"

Wrong: "It depends the situation."
Right: "It depends **on** the situation."

"Depend" always takes "on." This error is so common in IELTS essays that examiners notice it immediately.

## 3. "According to me"

Wrong: "According to me, education is important."
Right: "**In my opinion**, education is important."

"According to" means "as stated by" — you use it for external sources (according to the report, according to experts), not for your own opinion.

## 4. Uncountable Noun Errors

Wrong: "I need some informations." / "She gave me an advice."
Right: "I need some **information**." / "She gave me **some advice**."

Common uncountable nouns: information, advice, research, knowledge, equipment, furniture, luggage, evidence. They never take "a/an" or plural "-s."

## 5. Present Perfect vs Past Simple

Wrong: "I have visited Paris last year."
Right: "I **visited** Paris last year."

If you specify WHEN (last year, yesterday, in 2020), use Past Simple. Present Perfect is for unspecified time or ongoing relevance: "I **have visited** Paris three times."

## 6. Mixed Conditionals

Wrong: "If I would have more time, I will study harder."
Right: "If I **had** more time, I **would** study harder." (Second conditional)

Second conditional: If + past simple, would + infinitive.
Third conditional: If + past perfect, would have + past participle.
Never use "would" in the "if" clause.

## 7. "Make" vs "Do"

There's no logical rule — these are collocations you must memorise:
- **Make:** a decision, a mistake, progress, an effort, a suggestion, money
- **Do:** homework, research, damage, business, a favour, exercise

## 8. Double Negatives

Wrong: "I don't have no money."
Right: "I **don't have any** money." OR "I have **no** money."

In standard English, double negatives create a positive meaning (logically, "I don't have no money" = "I have some money"). Use one negative per clause.

## 9. "Since" vs "For" With Present Perfect

Wrong: "I have lived here since 5 years."
Right: "I have lived here **for** 5 years."

"Since" = a point in time (since 2020, since Monday, since I was a child).
"For" = a duration (for 5 years, for 3 hours, for a long time).

## 10. Dangling Modifiers

Wrong: "Walking down the street, the building caught my eye."
Right: "Walking down the street, **I noticed** the building."

The subject after the comma must be the one doing the action in the modifier. Buildings don't walk.

## 11. "Despite" With a Clause

Wrong: "Despite he was tired, he continued working."
Right: "**Despite being** tired, he continued working." OR "**Although** he was tired, he continued working."

"Despite/In spite of" take a noun or gerund. "Although/Even though" take a full clause.

## 12. Overusing "Very"

Not wrong, but weak: "The movie was very good and very interesting."
Better: "The movie was **compelling** and **thought-provoking**."

Replacing "very + adjective" with a single strong adjective immediately sounds more advanced. Very tired = exhausted. Very big = enormous. Very small = tiny. Very important = crucial.

## How to Fix These

Awareness is the first step, but correction requires practice with feedback. FluentPath's AI writing assessment catches these exact errors and explains why they're wrong — so you learn the rule, not just the correction.`,
  },
  {
    slug: 'cefr-levels-explained',
    title: 'CEFR Levels Explained: A1 to C2 — What Can You Actually Do?',
    description: 'A practical guide to CEFR levels — what each level means, how long it takes to reach, and how they map to IELTS, PTE, and OET scores.',
    publishedAt: '2026-08-17',
    readingTime: 5,
    category: 'english',
    tags: ['CEFR', 'English Levels', 'A1', 'B2', 'C1'],
    coverId: 8,
    content: `## What Is CEFR?

The Common European Framework of Reference for Languages (CEFR) is the international standard for describing language ability. It defines six levels from A1 (beginner) to C2 (mastery). Universities, employers, and immigration authorities worldwide use CEFR to set language requirements.

## The Six Levels

### A1 — Breakthrough
You can introduce yourself, ask and answer simple questions (Where do you live? How old are you?), and interact if the other person speaks slowly.

**Real-world ability:** Order food at a restaurant, ask for directions, fill in a simple form.

### A2 — Waystage
You can describe your background, immediate environment, and matters of immediate need. You can handle routine tasks and short social exchanges.

**Real-world ability:** Shop for groceries, have a simple phone conversation, describe your daily routine.

### B1 — Threshold
You can deal with most situations while travelling. You can describe experiences, events, hopes, and briefly give reasons for opinions. You can understand the main point of clear, standard speech.

**Real-world ability:** Follow a university lecture on a familiar topic, write a simple email to a colleague, participate in meetings on familiar topics.

### B2 — Vantage
You can interact with native speakers without strain for either party. You can produce clear, detailed text on a wide range of subjects and explain a viewpoint, giving advantages and disadvantages.

**Real-world ability:** Write professional reports, participate in debates, understand TV news and current affairs programmes.

### C1 — Effective Operational Proficiency
You can express yourself fluently and spontaneously. You can use language flexibly for social, academic, and professional purposes. You can produce well-structured, detailed text on complex subjects.

**Real-world ability:** Give professional presentations, write academic papers, understand implicit meaning and humour.

### C2 — Mastery
You can understand virtually everything heard or read. You can summarise information from different sources, reconstructing arguments in a coherent presentation. You can express yourself spontaneously and precisely, differentiating finer shades of meaning.

**Real-world ability:** Write publishable academic papers, simultaneous note-taking in lectures, professional interpreting.

## How Long Does Each Level Take?

| Level | Guided Hours (Approximate) | From Previous Level |
|-------|---------------------------|-------------------|
| A1 | 80-100 hours | — |
| A2 | 180-200 hours | 100 hours |
| B1 | 350-400 hours | 150-200 hours |
| B2 | 500-600 hours | 150-200 hours |
| C1 | 700-800 hours | 200 hours |
| C2 | 1,000-1,200 hours | 200-400 hours |

These are averages. Your actual pace depends on your native language, study intensity, and exposure to English.

## CEFR to Exam Score Mapping

| CEFR | IELTS | PTE Academic | OET |
|------|-------|-------------|-----|
| C2 | 8.5-9.0 | 86-90 | A |
| C1 | 7.0-8.0 | 65-85 | B |
| B2 | 5.5-6.5 | 50-64 | C+ |
| B1 | 4.0-5.0 | 36-49 | C |
| A2 | 3.0-3.5 | 25-35 | — |

Most university admissions require B2 (IELTS 6.0-6.5). Professional registration (nursing, medicine) typically requires C1 (IELTS 7.0, OET B).

## Find Your Level

FluentPath's free placement test pinpoints your CEFR level across reading, writing, listening, and speaking in under 5 minutes. It's adaptive — the questions get harder or easier based on your answers, so it's accurate across the full A1-C2 range.`,
  },
  {
    slug: 'oet-listening-tips-healthcare',
    title: 'OET Listening: 8 Tips for Healthcare Professionals',
    description: 'Strategies for OET Listening — understanding medical consultations, note-taking, accents, and the two-part structure.',
    publishedAt: '2026-08-19',
    readingTime: 5,
    category: 'oet',
    tags: ['OET', 'Listening', 'Healthcare', 'Tips'],
    coverId: 9,
    content: `## Why OET Listening Is Different

Unlike IELTS or PTE, OET Listening uses healthcare-specific scenarios: doctor-patient consultations, ward handovers, conference presentations. If you're a nurse, doctor, pharmacist, or other healthcare professional, this should be familiar territory — but the test format still trips people up.

## The Two Parts

**Part A: Consultation (24 questions)**
You hear a healthcare professional consulting with a patient. You complete notes — gaps in a structured form (patient details, symptoms, history, plan). You hear the recording ONCE.

**Part B: Short extracts (24 questions)**
You hear 6 short recordings (presentations, interviews, lectures) and answer 4 multiple-choice questions per recording. You hear each recording ONCE.

## Tip 1: Read the Notes Before Listening

In Part A, you get 1-2 minutes to read the notes before the recording starts. USE THIS TIME. Predict what type of information each gap needs: a medication name? A duration? A body part? A number?

## Tip 2: Listen for Corrections

Patients often correct themselves: "I've had this pain for two weeks — actually, more like three weeks." The answer is THREE weeks. The speaker's final answer is what counts.

## Tip 3: Don't Write Full Sentences

Part A requires short answers — often single words or short phrases. If the gap is next to "Duration:", write "3 weeks" not "The patient has had pain for three weeks."

## Tip 4: Spell Medical Terms Correctly

Common medical terms must be spelled correctly: diarrhoea (not diahrea), paracetamol (not paracetimol), hypertension (not hypertention). If you're unsure about spelling, practise the 200 most common medical terms before the test.

## Tip 5: Understand Multiple Accents

OET recordings feature speakers from the UK, Australia, the US, and other English-speaking countries. Exposure to different accents is essential. Listen to:
- BBC Health podcasts (British)
- ABC Health Report (Australian)
- NIH MedlinePlus videos (American)

## Tip 6: Don't Overthink Multiple Choice

In Part B, the wrong answers often contain words that appear in the recording but in a different context. The correct answer is usually a paraphrase. If the speaker says "The study showed a significant reduction in mortality," the correct answer might say "Death rates decreased substantially."

## Tip 7: Keep Writing When You Miss an Answer

If you miss an answer, move on. Don't dwell on it while the next answer plays. You'll miss two answers instead of one. Leave it blank and come back at the end if you remember.

## Tip 8: Practise With Clinical Audio

General English listening practice helps, but clinical audio is essential. Hospital podcasts, medical lectures, and consultation recordings train your ear for the specific vocabulary and speaking patterns you'll hear on test day.

FluentPath's OET mock tests include realistic consultation recordings and healthcare lecture extracts, scored against OET criteria — so you know exactly where you stand before the real test.`,
  },
]
