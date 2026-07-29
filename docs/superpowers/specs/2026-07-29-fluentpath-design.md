# FluentPath — Design Spec

**Date:** 2026-07-29
**Status:** Draft for review
**Working name:** FluentPath (provisional — naming is a later decision)

---

## Quality bar — governs everything below

Non-negotiable standards. Where any decision in this document conflicts with one of these, the standard wins.

### 1. Content quality is the product

Everything else in this document is delivery mechanism. The content is what the learner actually pays for, and it is the only thing they can judge. **Every single piece must teach something real, at the learner's level, and be good enough that paying for it feels obviously correct.**

The concrete bar, applied to every item, passage, explanation and audio asset:

> *Would a qualified English teacher use this in a lesson they were being paid for, without editing it first?*

If no, it does not ship. That is the test, and it is binary.

What meeting it requires:

- **It teaches at level.** Not merely *free of* above-level vocabulary — actively targeting a specific node the learner is ready for, with the surrounding language supporting rather than obstructing it.
- **Distractors are diagnostic.** Every wrong option in a multiple-choice item maps to a specific, named misconception. Random wrong answers are worthless for both learning and diagnosis, and they are the clearest signature of generated filler.
- **Explanations teach the pattern, not the answer.** A learner should finish an explanation able to handle the next instance they meet, not just this one.
- **Language is contextualised and authentic.** Real language doing real work in a real situation. Decontextualised drill sentences teach learners to complete drill sentences.
- **Reading passages are worth reading on their own merits** — genuinely interesting, containing information a person would want to know. Tedium is the single largest destroyer of perceived value in language learning, and almost all competing content is tedious.
- **Audio sounds like human speech**, at natural pace with natural features, in real accents — not a synthetic voice reading textbook sentences.
- **Zero visible errors.** One wrong answer key does not damage one item; it destroys the learner's trust in every score and every explanation the platform has ever given them. There is no acceptable error rate in learner-facing content.

**Volume never justifies dilution.** AI makes it trivial to generate infinite mediocre exercises, and that is the failure mode this project must actively resist. A smaller bank that measurably teaches is worth more than ten times the volume that merely occupies time.

**The accepted consequence:** this bar caps content velocity. Levels and exam tracks ship when their content passes the bar, not when a date arrives. A level released half-good is worse than a level not yet released, because the first one costs trust that cannot be bought back.

### 1a. Grammar, specifically

Grammar is where most learning platforms lose people — not because the content is wrong, but because the explanation is unusable. The standard:

- **Explained in language the learner can already read.** An A2 grammar point explained in B2 English teaches nothing. The explanation's own language is level-controlled and passes the same profiling gates as any other content. Almost every textbook and app fails this, and it is the most common reason a learner concludes they are "bad at grammar".
- **No unexplained metalanguage.** Terms like *past participle* or *countable noun* are either avoided entirely or defined in place, at level, at first use.
- **Form, then meaning, then use.** What it looks like, what it means, and when a person would actually choose it over the alternatives. Most explanations stop at form — which is why learners can conjugate a tense perfectly and still never use it in speech.
- **Taught against its confusable neighbour.** Most grammar errors are not ignorance of a form but confusion between two: present perfect against past simple, *will* against *going to*, article against zero article. The contrast *is* the lesson; teaching either form in isolation leaves the actual error untouched.
- **The common error named explicitly**, shown as a wrong example beside the right one. Learners correct faster when the mistake is made visible than when it is left implied.
- **One rule at a time; exceptions deferred.** Exhaustive exception lists on first encounter are the single most reliable way to make a grammar explanation useless. Exceptions arrive once the core is secure.
- **Short.** A grammar explanation that runs long has already failed. If it genuinely needs the length, it is more than one lesson.
- **L1-aware where known.** Many errors are predictable from the learner's first language — article use for Slavic and East Asian L1s, aspect for Romance L1s, and so on. Where the L1 is known, the explanation preempts the errors that L1 actually produces rather than the generic ones.

### 1b. Exam task guidance, specifically

For IELTS, PTE and OET, the lesson tracks are not practice questions with a score attached — they are explicit instruction in **how to approach each task type**. Every task type in every exam ships with:

- **What the task actually assesses**, stated in terms of the published rubric, so the learner knows what is being rewarded instead of guessing at it.
- **A step-by-step procedure**, from reading the prompt to the final check.
- **Time allocation** — how long each stage should take, and what to sacrifice first when running short.
- **Worked examples, annotated** — a complete response with commentary explaining each decision as it is made.
- **Model answers at several band levels with the differences named.** Seeing a 6.0 and a 7.5 response side by side, with an explanation of exactly what separates them, is the fastest way a learner internalises what the bands actually mean. Almost no competitor provides this, and it is among the highest-value content in the product.
- **Named failure modes** — the specific, recurring ways candidates lose marks on that task.
- **A checklist** the learner can actually apply under exam conditions.

**Grounded in published criteria, never folklore.** Most exam advice in circulation is superstition — *use impressive vocabulary*, *write exactly 250 words*, *always argue both sides*. Some of it actively lowers scores. Every piece of guidance in this product traces to the published band descriptors or scoring criteria for that exam, and where a widely-believed rule is wrong, the lesson says so and explains why. Being the product that tells learners the truth about the exam is both a quality position and a marketing one.

### 2. Production over recognition

Multiple choice is easy to build, easy to grade, and weak for acquisition — a learner can pass it by elimination without ever producing the language. The item mix is therefore biased deliberately toward **retrieval and production**: type it, say it, transform it, construct it. Recognition items are used for diagnosis and comprehension checking, not as the backbone of practice.

### 3. Every wrong answer teaches

A wrong answer that returns only "incorrect" is a defect. Every incorrect response must return: what the correct form is, **why** the learner's answer failed, and where that maps in the skill graph. For writing and speaking, feedback must quote the learner's own words — generic advice ("improve your cohesion") is treated as a bug, not as feedback.

**Complete, but never overwhelming.** Every improvable thing is caught and reported — silently dropping errors to keep feedback short is a defect, not a kindness. Brevity is achieved two other ways instead:

- **Group repeats into one issue.** Twelve missing definite articles is *"you're dropping 'the' before specific nouns — 12 times"*, not twelve separate corrections.
- **Layer by priority.** The few highest-impact issues are shown first as "fix these first"; the remainder are marked inline in the learner's own text and expand on demand.

Length limits therefore apply **per issue, never to the number of issues.** A learner handed thirty flat corrections fixes none; the same thirty, grouped into six and ranked, get acted on.

### 4. Deliver comprehensible input, always just above level

Content is targeted at the learner's actual position plus one step — hard enough to stretch, not so hard it becomes noise. The skill graph exists precisely so this is computed, not guessed. Practice interleaves nodes rather than blocking on one, because interleaving produces durable retention and blocking produces the illusion of it.

### 5. Prove the learning

The platform must be able to demonstrate that it works, and be honest when it hasn't. That means measuring **real ability gain** on a consistent construct over time — not time-on-app, not streaks, not items completed. If a learner has practised for six weeks and their measured ability hasn't moved, the product says so and changes approach. Most edtech cannot answer the question "did this work?"; being able to answer it is both a quality forcing-function and the strongest marketing asset this product can have.

### 6. No engagement theatre

Streaks, badges and daily-goal confetti that decouple from actual learning are banned. The well-known failure mode is a learner maintaining a multi-year streak who still cannot hold a conversation. Motivation mechanics are permitted only where they reinforce genuine practice behaviour, and they never substitute for a real progress signal.

### 7. Smooth means fast, and never broken mid-task

Concrete standards, enforced as budgets rather than intentions:

- Practice items respond in **under 200ms** — no perceptible lag between answering and knowing
- Listening audio is **preloaded before an item begins**; buffering mid-question is a failure
- Speaking feedback returns in **seconds, not a minute** — assessment runs in parallel where possible
- Every session is **resumable** — no learner ever loses work to a dropped connection or a closed tab
- There is **always an obvious next action** — no dead ends, no empty states without a route forward
- Full functionality on mobile, since a substantial share of this audience has no other device
- Accessible by standard — a language learning platform that excludes disabled learners fails on its own terms

### 8. Engineering quality is part of learning quality

Assessment logic, scoring, and the mastery model are tested as a matter of course — a scoring bug silently mis-teaching thousands of learners is the worst outcome this product can produce. Content generation is never shipped unvalidated. Correctness in this domain is not an engineering nicety; it is the product.

---

## 1. What this is

A complete English learning and assessment platform covering two connected jobs:

1. **Learn English from zero to mastery** — CEFR Pre-A1 through C2, across all four skills (reading, writing, listening, speaking), plus explicit vocabulary and grammar progression.
2. **Pass a high-stakes English exam** — IELTS, PTE Academic, and OET: lesson tracks, full mock tests, drill-down diagnosis, and an action plan that says exactly what to fix next.

These are one product, not two. The same underlying model of "what this learner can actually do" powers both. Exam scores are a *lens* on that model, not a separate system.

### The core positioning

Every competitor in exam prep sells a band score and some practice questions. Nobody answers the question that actually matters to a learner stuck at 6.0: **why**, and **what specifically do I do about it**.

The reason nobody answers it is that answering it requires a real model of the learner's language ability — which requires the A1–C2 ladder underneath. Most people grinding IELTS practice are B1 speakers trying to reach B2/C1. They don't have an exam-technique problem, they have an English problem. Only a platform that has both layers can say: *"You scored 5.5. Here's the specific set of gaps causing it, here's the ladder from where you actually are, and here's what fixing each one is worth in band terms."*

The scope is the moat.

---

## 2. Users

| Segment | Need | Urgency | Willingness to pay |
|---|---|---|---|
| Exam candidates (IELTS/PTE) | Score by a deadline for visa, university, migration | Very high | High, short duration |
| Healthcare migrants (OET/IELTS) | Pass to unlock a career move worth six figures | Very high | Highest |
| General learners (A1–C2) | Improve English for work, study, life | Low–medium | Moderate, long duration |

Exam candidates monetise immediately and fund the platform. General learners provide retention and lifetime value. The ladder converts the exam segment's natural churn (they leave when they pass) into continued subscription, because it gives them somewhere to go next.

---

## 2a. Market, demand and moat

### Demand

| | |
|---|---|
| IELTS test takers per year | 3.5–4 million, growing |
| Top five markets | India, China, Bangladesh, Pakistan, Philippines — over half of all sittings |
| Academic share | ~60–65% |
| Online language learning market (2026) | $24.4B, growing ~15.8%/year |
| English share of that revenue | 54.85% |

Three properties make this demand unusually strong: it is **compelled** (a visa, university place or professional registration depends on it, so no demand creation is needed), it **repeats** (candidates fail and retake, at ~$250 per sitting, which also sets a clear reference price for what avoiding a retake is worth), and the **largest markets are the target markets**.

### Moat — honest assessment

**Defensible:**

1. **The ladder beneath the exam prep.** A competitor selling band scores cannot answer *"why am I stuck at 6.0"* without building a full CEFR model across four skills — 12–18 months of work that does not fit their product shape. The scope expansion is the moat.
2. **Data flywheel.** Item statistics and learner outcomes compound: more learners produce better-calibrated items, sharper diagnosis, better results, more learners. Cannot be copied, only rebuilt slowly.
3. **Outcome calibration data.** Capturing what learners actually scored on the real exam against what was predicted builds a dataset nobody else holds, making predictions genuinely accurate while competitors guess. Potentially the strongest long-term moat, and it costs nothing to begin collecting from launch. **Start collecting on day one.**

**Not defensible, stated plainly:**

- AI scoring is commodity — every competitor has it
- No network effects; learners do not bring other learners
- Low switching costs beyond progress history
- Content is replicable by anyone with money and time

**Verdict: a medium moat built on accumulation rather than technology.** Defensibility comes from being 18 months ahead on validated content and holding outcome data — not from anything a competitor is unable to build.

### Earning potential

Realistic solo trajectory with functioning SEO and a product that works:

| | Paying users | Revenue |
|---|---|---|
| Year 1 | ~500 | ~$40k |
| Year 2 | ~3,000 | ~$250k |
| Year 3 | ~10,000 | ~$800k+ |

10,000 paying users is roughly **0.25% of annual IELTS candidates** — a small enough share to be credible.

**Honest ceiling:** $1–3M/year at good execution, at ~90% margins, run solo. Not a billion-dollar company on its own; that would require the B2B channel (agencies, schools and recruiters who prep candidates in bulk), which is explicitly out of scope.

---

## 3. Architecture

### 3.1 The Skill Graph — the core of everything

One data structure underpins the entire product. Everything else is a read or write against it.

**Nodes** — each an atomic, assessable capability:

- **Can-do nodes** — derived from the CEFR Companion Volume descriptors, per skill, per level. *"Can understand short, simple texts on familiar matters"* (A2 Reading).
- **Grammar nodes** — structures tagged to CEFR level, modelled on the English Grammar Profile inventory. *"Present perfect with `for`/`since`"* (B1).
- **Lexical nodes** — headwords, phrases, phrasal verbs and idioms with level tags, modelled on English Vocabulary Profile / CEFR-J inventories. Sense-level, not word-level: *bank* (money) is A1, *bank* (river) is B1.
- **Phonological nodes** — phonemes, minimal pairs, word stress, sentence stress, intonation contours, connected speech. These drive pronunciation diagnosis.
- **Strategy nodes** — exam- and task-specific technique. *"Paraphrasing the question in Task 2 introduction"*, *"signposting in OET roleplay"*.

**Edges** — prerequisite relations. `past simple` before `past perfect`. `word stress` before `sentence stress`. The graph is a DAG; cycles are a data error.

**Learner state** — for every node, per learner:

```
{ nodeId, mastery: 0..1, confidence: 0..1, lastSeen, exposures, correctStreak, decayRate }
```

Mastery updates on every assessed interaction. Confidence rises with the number and recency of independent observations. Mastery decays over time unless refreshed — this drives spaced review automatically rather than as a bolted-on feature.

**Why this matters:** the placement test, the lesson sequencer, the drill generator, the mock test diagnosis, and the action plan are all just different queries against this one structure. Building it first means the exam products are views, not separate systems. Building it later means a rewrite.

### 3.2 Content model

```
Course ──> Unit ──> Lesson ──> Item
                       │
                       └──> targets: [nodeId]
```

- **Lesson** — teaches 1–3 nodes. Structure: presentation (explanation + examples) → guided practice → free production → check.
- **Item** — a single assessable unit. Every item is tagged with the nodes it exercises, its CEFR level, and its measured difficulty.
- **Assets** — reading passages and listening audio, each vocabulary-profiled and level-certified.

**Item types:**

| Type | Skill | Grading |
|---|---|---|
| Multiple choice | R, L, G, V | Automatic |
| Gap fill / cloze | R, G, V | Automatic |
| Matching / ordering | R, L | Automatic |
| Dictation | L | Automatic (fuzzy match) |
| Short answer | R, L | LLM + key |
| Sentence transformation | G | LLM + key |
| Writing task | W | LLM against rubric |
| Speaking prompt | S | Pipeline (§3.3) |
| Roleplay turn | S | Pipeline + scenario state |

### 3.3 Assessment engines

**Reading** — auto-graded items over level-profiled passages. Sub-skills tracked separately: skimming for gist, scanning for detail, inference, attitude/opinion, vocabulary in context, text organisation. A learner missing only inference items gets a different diagnosis from one missing only scanning items — that distinction is the product.

**Listening** — audio generated once via TTS and cached permanently, across multiple accents (British, American, Australian, and for OET a spread of non-native speaker accents, which is a real feature of the exam). Items test the same sub-skill split as reading, plus dictation to isolate bottom-up decoding failures from comprehension failures.

**Writing** — LLM assessment against the relevant rubric. Non-negotiable output requirements: a per-criterion score, **evidence spans quoting the learner's own text**, and a concrete rewrite for each issue. Generic feedback ("improve your cohesion") is a product failure. Every claim must point at a location in the learner's writing.

**Speaking** — a turn-based loop, deliberately not a realtime voice API:

```
record → STT (word timings + per-word confidence + phoneme scores)
       → objective feature extraction
       → LLM assessment (transcript + features + rubric)
       → feedback + optional TTS reply
```

Objective features computed deterministically, never guessed by the model:

- *Fluency:* speech rate (wpm), articulation rate, pause count/duration/placement, filler frequency, false starts, mean length of run
- *Lexis:* type–token ratio, vocabulary level profile against the lexical inventory, lexical density, repetition rate
- *Grammar:* structures attempted vs. accurate, mean length of utterance, error density by type
- *Pronunciation:* phoneme-level accuracy scores, word stress errors, intonation contour on question forms

**This split is the single most important design decision in scoring.** The measurable is measured; the LLM only judges what genuinely requires judgment, and it does so *with the measurements in front of it*. This makes scores reproducible, explainable, and defensible — and it makes the diagnosis specific, because "your fluency score is capped by 3.2 pauses per minute averaging 1.8 seconds, mostly mid-clause" is actionable in a way that "work on fluency" is not.

### 3.4 Mock test engine

Exam definitions are **data, not code** — sections, timings, task sequences, item selection rules, and scoring conversion tables. Adding an exam means adding a definition and a content pack, not rebuilding the engine.

Supported: **IELTS Academic**, **IELTS General Training**, **PTE Academic**, **OET** (per-profession variants).

Requirements:

- Faithful timing and section locking — the time pressure is a large part of what the test measures
- Interruption-safe: state persisted continuously, resumable after a crash or a dropped connection
- Produces a complete **performance record**: every item, every response, response latency, revision history, audio, and confidence flags

### 3.5 Drill-down diagnosis and action plan

This is the feature people pay for. The chain:

1. **Performance record** → every response with timing and context.
2. **Node attribution** → map each success and failure onto skill-graph nodes.
3. **Aggregation** → identify weak nodes ranked by (impact × confidence), suppressing anything with insufficient evidence.
4. **Root-cause classification** — the step competitors skip. Distinguish:
   - **Knowledge gap** — the structure or word isn't known
   - **Processing gap** — known, but too slow under time pressure (detected via response latency vs. accuracy)
   - **Strategy gap** — misread the task or mismanaged time (detected via error patterns clustering by task type, not by language content)
   - **Production gap** — recognises it but can't produce it (receptive items correct, productive items wrong on the same node)

   These four require completely different remedies. Telling a processing-gap learner to study more grammar is why people plateau.

5. **Action plan** → an ordered remediation sequence: which nodes, in what order (respecting graph prerequisites), which specific lessons and drills address each, and estimated study time.
6. **Band impact projection** → *"Closing these five gaps moves your Writing from 6.0 to an estimated 6.5–7.0."* Modelled from the rubric's own criterion weightings plus observed cohort movement once there's data. Presented as a range with stated confidence — never a fake decimal.

### 3.6 Content generation and QC pipeline

Content volume is the largest cost in this build. Generation is cheap; **keeping it on-level and correct is the actual engineering problem.**

Pipeline per item:

1. **Constrained generation** — target node(s), CEFR level, permitted vocabulary set, permitted grammar set, forbidden structures above level.
2. **Correctness gates** — an item failing any gate is rejected, not repaired:
   - *Vocabulary profiler* — flags any token above target level
   - *Grammar profiler* — flags structures above target level
   - *Answer-key verification* — the item is solved independently and cross-checked against the supplied key
   - *Near-duplicate detection* — embedding similarity against the existing bank
   - *Naturalness check* — rejects stilted or textbook-artificial English

3. **Teaching-quality gates** — the harder and more important set. Correctness is necessary and nowhere near sufficient: an item can be perfectly on-level, perfectly keyed, and still teach nothing. Each candidate is scored by an independent evaluator against an explicit rubric, with a hard threshold below which it is rejected:

   - *Node targeting* — does this actually exercise its target node, or merely contain it incidentally?
   - *Diagnostic distractors* (MCQ) — does every wrong option correspond to a specific named misconception? Options that are merely wrong fail this gate.
   - *Explanatory transfer* — does the explanation equip a learner for the next instance, or only resolve this one?
   - *Contextual authenticity* — is this language doing real work in a real situation?
   - *Worth-reading test* (passages) — would someone read this if they weren't being made to?
   - *The teacher test* — would a qualified teacher use this unedited in a paid lesson?

   The evaluator is calibrated against a **golden set**: a hand-validated reference collection spanning levels and item types, with known-good and known-bad examples. The evaluator's agreement with the golden set is monitored; when it drifts, the evaluator is recalibrated before any further content is admitted. An uncalibrated judge is worse than no judge, because it manufactures false confidence at scale.

4. **Human review** — every lesson is reviewed by a person before release while the pipeline is being established. Sampling replaces full review only once the pipeline has demonstrated a sustained pass rate against human judgment, and full review resumes automatically whenever a content type changes or the generation prompt is modified.

5. **Live quality signals** — quality is monitored after release, not assumed:
   - *Item statistics* — difficulty (p-value) and discrimination tracked for every item in production. Items everyone gets right measure nothing; items that don't correlate with overall ability are broken. Both are auto-retired.
   - *Learner reporting* — a one-tap "this item is wrong or confusing" control on every item, routed to the review queue. Learners find defects no gate catches.
   - *Abandonment tracking* — items and passages that learners consistently quit part-way through are flagged for review regardless of their statistics.

Steps 3 and 5 are what separate a real teaching product from a question dump. Step 3 stops bad content shipping; step 5 catches what step 3 missed and improves the bank continuously without authoring effort.

**Source data note:** the CEFR Companion Volume and CEFR-J datasets are openly available. The English Vocabulary Profile and English Grammar Profile are free *to educators*, which is not a commercial redistribution licence — they are used to inform internally-built inventories, never republished as data. Exam practice material is original throughout; official past papers are copyrighted and are not used.

### 3.7 Content sourcing and licensing

Binding rules. Content that cannot demonstrate compliance with this section does not ship, regardless of quality.

*This is an engineering standard, not legal advice. It is designed so that the position is defensible and provable — a record rather than a recollection — and should be reviewed by a lawyer before any significant commercial launch.*

#### Approved sources

Nothing outside this list may enter the content pipeline without an explicit licence review.

| Source | Licence | Used for | Obligation |
|---|---|---|---|
| CEFR Companion Volume | Free (Council of Europe) | Can-do descriptors | Cite |
| **CEFR-J** (Tono Lab, TUFS) | Commercial permitted | Vocabulary and grammar profiles per level | **Cite** |
| Octanove Vocabulary Profile | CC BY-SA 4.0 | C1/C2 vocabulary | Attribute; keep separable |
| **VOA Learning English** | **Public domain** | Graded reading texts, human audio | **Credit learningenglish.voanews.com** |
| **LibriVox** | **Public domain** | Human audio, varied accents | Credit (courtesy) |
| US Government (NASA, NIH, CDC, NPS, LoC) | Public domain | Modern factual passages | None |
| Wikinews | CC BY | Contemporary-language passages | **Attribute** |
| Tatoeba | CC BY | Example sentences | **Attribute** |
| Project Gutenberg | Public domain (US) | Literary passages — *dated language, limited use* | Check jurisdiction |
| Unsplash / Pexels / Pixabay | Commercial permitted | Images | Per platform terms |
| Generated content | Original | Lessons, exercises, explanations, distractors | Human-edited (see below) |

**Licence preference order: public domain > CC BY > CC BY-SA.**

**CC BY-SA is used only where the asset stays separable** (a standalone image, an unmodified quotation). It is never used as the basis of an adapted passage, because share-alike would oblige the derivative to carry the same licence — handing a competitor the right to take it.

**CC BY-NC is prohibited outright.** Non-commercial licences are incompatible with a paid product. Most ELT material on OER Commons and OpenLearn falls here, and must be excluded by licence filter rather than by judgement.

#### Prohibited sources — never ingested, in any form

Not as training data, not as pipeline input, not as a prompt example, not as a style reference:

- Official past papers or practice tests from IELTS, Cambridge, IDP, Pearson/PTE, or OET
- British Council, BBC Learning English, or Cambridge English materials
- Any competitor's lessons, items or explanations
- Any CC BY-NC or all-rights-reserved material

**The distinction that governs this:** reading something to understand a standard is research. Feeding it to a model to produce comparable material is derivative work, however different the output wording. Only the first is permitted.

Official published sample answers with examiner commentary may be **studied** to calibrate the golden set. They may never be **reproduced, adapted, or used as generation input**.

#### Provenance — a first-class schema field, not metadata

Every passage, audio file and image carries, from creation:

```
sourceName | sourceUrl | licence | licenceUrl | attributionText | retrievedAt | modifications
```

This is a build requirement in R1b, not an afterthought. Without it the project cannot prove compliance, cannot respond to a takedown, and cannot selectively remove an asset later. Bolted on afterwards it is unprovable, because there would be thousands of assets and no record of any of them.

An attributions page is generated automatically from this data, so credit obligations are met by construction rather than by discipline.

#### Trademarks

*IELTS*, *PTE Academic*, *OET*, *TOEFL* and *Cambridge English* are registered marks belonging to others.

- Nominative use is permitted: "preparation for IELTS", "IELTS practice test"
- Prohibited: their logos, their branding, any wording implying endorsement, accreditation or official status
- A visible disclaimer — *"Not affiliated with, endorsed by, or approved by [exam owner]"* — appears on every exam-related page

Exam formats and task types are not copyrightable; specific questions are. **All practice material is authored originally.**

#### AI output and ownership

Provider terms assign output rights to the user, but purely machine-generated content may not be copyrightable at all — meaning a competitor could copy the content bank with limited recourse.

This is a moat weakness rather than a liability, and it is a further argument for the human review layer: **meaningful human editing strengthens the ownership claim** as well as the quality.

#### Specific caveats

- **VOA:** text and audio only. AP and Reuters photographs inside VOA articles remain copyrighted.
- **LibriVox and Gutenberg:** public domain in the US; some works remain in copyright in life-plus-70 jurisdictions. Check before use in EU-facing content.
- **Stock images:** permitted within lessons; not permitted to be redistributed as an image library.

---

## 4. Technical stack

Chosen to match the existing toolchain so nothing is learned from scratch.

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16, TypeScript | Existing expertise |
| Database | Turso (libSQL) + Drizzle ORM | Metadata and learner state only — never content |
| Content storage | **Cloudflare R2 + CDN** | Free egress at any scale; strong edge presence in target markets |
| Auth | Better Auth | Already implemented and hardened |
| Payments | Stripe | Existing UK entity plan |
| Hosting | Vercel + Vercel Cron | Existing |
| Compute region | **`sin1` (Singapore)** | Vercel defaults to US East; must be set explicitly |
| TTS | ElevenLabs | Existing pipeline from Luminous Will |
| STT | Provider with word timings + confidence | Required for fluency metrics |
| Pronunciation | Speech service with phoneme-level scoring | Required for pronunciation diagnosis |
| Generation LLM | Gemini | Cost-efficient at content volume |
| Assessment LLM | Claude | Quality where scoring credibility matters |
| Monitoring | Sentry | Existing |

**Cost control:** listening audio is generated once and cached forever — the marginal cost of the thousandth learner hearing a passage is zero. STT is the only per-session variable cost and is measured in fractions of a cent per minute. Assessment LLM calls are bounded per task, never open-ended conversation. This is what holds margins near 90%.

### 4.1 Why content storage is not Vercel Blob

Vercel Blob charges $0.05/GB egress on every download, cache hit included — meaning the product's dominant cost would scale linearly with its own success. R2 charges nothing for egress, ever.

| Active learners (~10 MB content each/month) | Vercel Blob | Cloudflare R2 |
|---|---|---|
| 10,000 | ~$0 | $0 |
| 100,000 | ~$45/month | $0 |
| 1,000,000 | ~$495/month | $0 |

R2 also includes 10 GB of free storage against Vercel Blob's 1 GB, which comfortably holds the entire content library including versions. Cloudflare's edge network additionally has stronger presence across India, Southeast Asia, Africa and Latin America — precisely where the learners are. Cheaper and closer.

### 4.2 Free-tier ceilings, computed

Not marketing numbers — what the limits actually mean for this product.

**Turso free (5 GB, 10M writes/month, 500M reads/month):** at ~2.5 writes per item answered and ~400 items per active learner per month, the write quota supports roughly **10,000 monthly active learners**, and storage fills at a similar scale within about six months. The $4.99 Developer plan (9 GB, 25M writes) takes that to roughly **25,000 monthly active learners**.

**With batched session writes (§4c) this improves by 10–20×**, since a session's outcomes become one write rather than fifty.

**R2 free (10 GB storage, free egress):** holds the full content library with versions. Egress never costs anything at any scale.

---

## 4b. Content delivery and offline architecture

The quality bar commits to learning that feels instant (Quality bar 7). That is achieved not by making requests fast, but by **not making requests during the interaction**. The architecture below is what delivers that, and it is a requirement rather than an optimisation.

### Content never lives in the database

Turso stores a pointer; R2 stores the file. A content row is roughly 250 bytes:

```
lessonId | version | url | status | publishedAt | retiredAt
```

Lesson text, reading passages, exercise items and audio are published as files to R2 and served through the CDN. The database is never in the read path for content.

### Content is immutable and versioned

A published file at a given URL never changes. Updating a lesson means publishing a **new version at a new URL** and repointing the database row. The previous file remains in place.

This is not merely a caching trick — it buys four things:

- **Instant rollback.** A bad version is reverted by repointing a database row. Seconds, no redeploy, no cache purge.
- **No cache invalidation.** Purging CDN caches worldwide is the hardest problem in caching. With versioned URLs it does not exist, because a new version has a different address.
- **A/B testing.** Serve v2 to a fraction of learners and compare item statistics before rolling out. This is how you verify an "improvement" actually improved something.
- **Audit trail.** You can establish exactly which version a learner saw when they answered — which matters whenever a score is challenged.

Files ship with a one-year immutable cache header, since they can never change.

**Two consequences that must be built in deliberately:**

- **Item statistics are per version, not per item.** Fixing a confusing distractor invalidates the old difficulty and discrimination data. Mixing v1 and v2 performance produces meaningless statistics.
- **Learners mid-unit stay pinned to their version.** Swapping content under someone partway through corrupts their session data and is jarring. New versions apply from their next session.

### Retention

Text versions are 2–10 KB, so they are kept indefinitely — the storage cost is negligible and the rollback and audit value is real. **Text and audio are versioned independently**, so a typical revision to an explanation or distractor publishes a few kilobytes and reuses existing audio.

Audio is the only asset worth pruning: keep the current version and the one preceding it, and delete older versions once no learner is pinned to them. A nightly job.

### Prefetch and offline

Required behaviours, not enhancements:

- **Session prefetch.** Tapping "start" loads a batch of items in one request — text, audio, answer keys. The learner then works entirely locally.
- **Idle prefetch.** While the learner is on the dashboard, the next session loads in the background, so starting it costs nothing.
- **One step ahead.** Item N+1 and its audio load while item N is being answered. Audio never buffers mid-item.
- **Local-first state.** Progress lives in IndexedDB; the UI reads local state and syncs in the background.
- **Service worker.** The current unit is cached, so practice continues with no connection at all. For learners on patchy mobile networks across India, the Philippines and Nigeria, this is a genuine competitive advantage rather than a nicety.

**Security boundary on prefetch.** Practice items ship their answer keys to the client, because instant feedback is worth far more than preventing a learner from cheating themselves. **Mock tests do not** — scores there mean something, so keys stay server-side and responses submit at section end rather than per item.

### Latency budgets

Binding targets, in seconds.

| Action | Budget |
|---|---|
| Answer an item → feedback | 0.02s |
| Move to next item | 0.02s |
| Start audio playback | 0s (preloaded) |
| Open a prefetched lesson | 0.02s |
| Open a lesson from edge cache | 0.06s |
| Dashboard and progress | 0.02s |
| Session start (unprefetched) | 0.5s |
| First app load, new device | 2s |

For reference, a blink takes 0.1–0.4 seconds; everything in the learning loop is faster than that and reads as no wait at all.

**Not instant, and never presented as such** — these show honest progress instead:

| Action | Realistic |
|---|---|
| Writing assessment | 3–10s |
| Speaking assessment | 5–15s |
| Full mock diagnosis | 20–60s |

---

## 4c. Reliability

### Batched session writes

Session outcomes are written **once at session end**, not per item. The data is already held locally, so this is free to do, and it reduces write volume by 10–20×. Since serialised writes are the single genuine scaling ceiling in this stack, this one decision removes it for any realistic horizon.

Partial sessions flush on a timer so an abandoned session is never lost.

### Backups

**Provider retention is not a backup strategy.** Turso's free plan offers one day of point-in-time restore, which is inadequate for data representing months of a person's study.

Required: **scheduled exports to independent storage**, on a different provider from the primary database, with a defined retention window and a restore procedure that has actually been tested. An untested backup is an assumption, not a safeguard.

### Sync model

Local-first is what makes the product fast, and it is also where local-first products fail. Each of the following needs defined behaviour rather than improvisation:

- The same learner on two devices
- A sync that fails partway
- A tab closed mid-write
- A device offline for days, then reconnecting

Baseline: outcomes are append-only events with client-generated IDs, making sync idempotent and replayable — the same event arriving twice is harmless. Derived state (mastery) is recomputed from the event log rather than synced directly, which removes most conflict cases entirely.

**Losing a learner's progress is unforgivable in a study product.** This is designed up front, not retrofitted.

### Failure behaviour

The local-first design means a learner mid-session continues working even if Vercel, Turso and R2 are all unavailable. Their outcomes queue locally and sync when service returns. That is stronger resilience than most applications have, and it is a direct consequence of the offline architecture rather than an additional feature.

### Known limitations, stated plainly

- **Analytics will outgrow SQLite.** Item statistics across millions of responses will eventually need a separate analytical store. Not soon, and it does not require migrating transactional data — but it is real.
- **Single-region compute.** Learners outside Asia pay roughly an extra 0.3s at session start. The learning loop is unaffected because it is local.
- **Three vendor dependencies** — Vercel, Turso, Cloudflare. Mitigated by offline capability, but the exposure exists.

---

## 4e. Legal and regulatory position

Binding decisions. *This is an engineering standard, not legal advice, and should be reviewed by a solicitor before significant commercial launch.*

### The governing principle

**Where the company is incorporated does not determine which laws apply. Where the customers are does.** The EU AI Act applies "irrespective of whether those providers are established in a third country" (Article 2(1)(a)), and catches non-EU providers whose output is used in the EU (Article 2(1)(c)). Incorporation is therefore not a lever; market selection is.

### Decision: no EU/EEA at launch

**FluentPath is a high-risk AI system if offered in the EU.** Annex III point 3(b) covers *"AI systems intended to be used to evaluate learning outcomes"* — and unlike points 3(c) and 3(d), that clause is **not limited to educational institutions**, so a consumer self-study app falls inside it.

The Article 6(3) derogation is unavailable. It exempts Annex III systems performing narrow procedural or preparatory tasks, but ends with an absolute override: *"an AI system referred to in Annex III shall **always** be considered to be high-risk where the AI system performs profiling of natural persons."* FluentPath builds a per-learner model across hundreds of skill nodes, predicts performance, and automatically decides what each learner sees — profiling under GDPR Article 4(4). The override applies.

**Mitigation:** geo-restrict EU/EEA by IP *and* billing address. Cost is near-zero — the target markets are India, the Philippines, Bangladesh, Pakistan, Nigeria and Vietnam. This removes the entire obligation set: risk management system, data governance, technical documentation, conformity assessment, CE marking, EU database registration, and an EU authorised representative.

Revisit deliberately when the EU is worth serving. Never drift into it.

### Decision: UK Ltd, not Australia (for now)

| | UK Ltd | Australia Pty Ltd |
|---|---|---|
| Resident director required | No | **Yes — at least one director must genuinely reside in Australia. Cannot be waived; ASIC will not register without one** |
| AI regulation | None (sector regulators, principles-based) | None currently — mandatory guardrails dropped Dec 2025 — but **legislation announced 15 July 2026, promised for 2027** |
| Privacy | UK GDPR | Privacy Act; **small-business exemption removed 10 Dec 2026**, plus mandatory disclosure of automated decision-making |
| Digital-services tax threshold | £90k VAT | A$75k GST |
| Penalties | ICO tiers | Up to **A$50M** serious; **A$66k** for a non-compliant privacy policy |

The resident-director requirement makes Australia impractical while operating from Thailand without paying for a nominee. **Revisit if the founder becomes Australian-resident** (a masters place from September 2027 would qualify).

### Decision: 18+ globally

*A 16+ threshold was considered and rejected once India's law was checked.*

**India's DPDP Act 2023 makes 16+ unworkable in the largest market:**

- A "child" is anyone **under 18** — stricter than GDPR (13–16) or COPPA (13)
- Consent must be **verifiable parental consent**; a checkbox is explicitly insufficient
- The Act **expressly prohibits tracking, monitoring, targeted advertising and profiling of children**
- It applies **extraterritorially** to any foreign company offering services to people in India, with no local entity required
- Penalties reach ₹250 crore (~$30M)

The prohibition is decisive. **The skill graph is a profile** — it models each learner's ability and automatically determines what they see. For under-18s in India that is banned outright, and consent cannot authorise it because it is a prohibition rather than a consent requirement. **There is no lawful version of this product for an Indian minor.**

**Per-country age gates were considered and rejected.** Residence cannot be verified, IP and billing address are both spoofable, age would have to propagate into every profiling decision permanently, and the asymmetry is bad: the upside is a few 17-year-old signups, the downside is prohibited profiling of a child in the largest market.

**Competitive evidence supports 18+:**

| Service | Minimum age | Model |
|---|---|---|
| Cambly (closest comparable paid service) | **18** | Separate Cambly Kids with verifiable consent |
| Duolingo | 13 | Free, gamified, separate Kids/ABC product; does not verify age |
| ELSA Speak | 13 | "13–18 with parental permission" — a request, not verification |
| **IELTS itself** | 16 recommended | **Parental consent form required for under-18 candidates** |

Cambly — a paid, adult-oriented English service — uses precisely this split. Duolingo and ELSA go lower but are free or gamified, run dedicated children's products alongside, and are arguably non-compliant in India at a scale where they can absorb the risk.

Most tellingly, IELTS already requires a parent's consent form from under-18 candidates, so 18+ on a preparation tool matches the ecosystem rather than departing from it.

**Enforced by a real date-of-birth field at signup, not a checkbox.**

**What is lost:** 17-year-old university applicants — a genuine cost, though largely deferral rather than loss, since they turn 18 during the application cycle.

**What is not lost:** school-age learners were never this product. Serving them requires a parent buyer, an oversight dashboard, age-appropriate content, and gamification that Quality bar 6 prohibits. That is a separate product and a deliberate future decision, exactly as Duolingo and Cambly both concluded — never a lowered number on this one.

### Accessibility is a legal duty, not only a quality standard

The **UK Equality Act 2010** requires reasonable adjustments for disabled users of services. Quality bar 7 already commits to accessibility; this records that it is additionally a legal obligation wherever UK customers are served.

### Markets served — one privacy layer covers them all

| Market | Law | Applies extraterritorially? |
|---|---|---|
| India | DPDP Act 2023 | **Yes** |
| Philippines | Data Privacy Act 2012 | Yes |
| Vietnam | Decree 13 / PDPL | **Yes** |
| Nigeria | NDPA 2023 | Yes |
| UK | UK GDPR | Yes (UK controller) |
| US | State laws + COPPA | Mostly below thresholds initially |
| Canada, Australia | PIPEDA / Privacy Act | Yes if served |
| Pakistan, Bangladesh | Developing | Monitor |

Every one of these requires substantially the same six things: tell people what is collected, obtain proper consent, allow access, allow correction, allow deletion, and notify breaches.

**Working principle: build to India's standard and the rest follow.** India is the strictest of the served markets on age and children's data, so meeting it clears the others. One privacy layer, one age gate, one deletion flow — not nine compliance systems.

### Decision: voice processed for assessment only, never identification

Voice becomes GDPR Article 9 special-category biometric data only when processed **to uniquely identify a person**. FluentPath assesses pronunciation, not identity.

**Requirements:** the privacy notice states this explicitly; the pipeline is never used for speaker identification; audio is deleted on a retention schedule while transcripts and derived metrics are kept, because the transcript is what the product actually needs.

### Decision: merchant of record, not direct payments

**India's OIDAR regime requires non-resident digital service providers to register and remit GST regardless of revenue — no threshold.** India is the largest target market, so direct selling means Indian GST registration from the first sale, with similar rules across many target markets.

GST is a consumption tax borne by the customer, not a cost to the business — the burden is registration, filing and record-keeping in every jurisdiction, which is impractical solo.

**Paddle as merchant of record** becomes the legal seller and assumes those obligations globally. Cost ~5% + $0.50 against Stripe's ~2.9% + $0.30. The ~2% difference buys out multi-country tax administration.

*This differs from the Stripe setup used on other projects, because this product sells to consumers in jurisdictions with no registration threshold.*

### Marketing claims

**Never promise a score.** accessiBe was fined **$1M by the FTC** for overstating what its AI could do — the same category of claim and product.

| Prohibited | Permitted |
|---|---|
| "Guaranteed band 7" | "Estimated band range" |
| "Official", "accredited" | "Built using the published band descriptors" |
| "Examiner-accurate" | "Scored against the official criteria" |

The honest-ranges standard (Quality bar, §3.5) was a pedagogical decision. It is also the legal protection.

### Sanctions

As a UK company, services must not be provided to sanctioned jurisdictions or designated persons. UK sanctions on Russia and Iran were expanded again in May 2026.

**Iran matters specifically here** — Iranian IELTS candidates are a substantial segment, taking the test for Canadian and Australian migration. It is a market the product would naturally attract and must actively exclude.

**Paddle covers paying customers.** Sanctions screening of jurisdictions and designated persons is its legal obligation as merchant of record.

**The free tier is the gap.** A free scored mock does not pass through Paddle, so it carries no screening. The obligation is not to *provide services*, not merely not to take payment. Sanctioned jurisdictions are therefore added to the same geo-block built for the EU/EEA — one list, no additional work.

### US accessibility litigation

US courts apply the ADA to commercial websites, and 1,037 accessibility lawsuits were filed in Q1 2026 alone (3,117 across 2025, up 27%). Exposure exists for any business serving US customers regardless of where it is established.

**Proportionality:** roughly 70% of those suits target e-commerce and retail, with restaurants and fashion the most-hit sectors. Education SaaS is a smaller target, and a UK company with no US assets is a less attractive defendant. The risk is real but moderate.

**Mitigation is already committed:** WCAG 2.2 AA conformance (Quality bar 7) plus a published accessibility statement. Marginal cost approximately zero.

### Remaining items to verify before launch

| Item | Action |
|---|---|
| **AI provider acceptable use** | Confirm Gemini, Claude and ElevenLabs terms permit educational assessment, and check what each says about output ownership |
| **TTS voice licensing** | ElevenLabs commercial tier required; voices must be licensed for commercial synthetic speech |
| **Learner-submitted content** | Acceptable use policy plus the ability to remove content and suspend accounts — someone will eventually submit something illegal or infringing |
| **Vietnam data localisation** | Decree 53 requires local storage for certain services; verify before serving Vietnam |
| **Generated content about real people** | Prohibited. Passages draw on public-domain factual sources, never invented claims about living individuals |
| **Professional indemnity insurance** | Not legally required; the mechanism for transferring residual risk |

### Compliance checklist

**In code:** provenance per asset · source whitelist enforced · **18+ date-of-birth gate** · deletion and export endpoints · audio retention job · scores as ranges with confidence · auto-generated attributions page · accessibility to standard (Equality Act duty, not only quality).

**At launch:** EU/EEA geo-block · Paddle as MoR · ICO registration (~£50/yr) · processor agreements with Turso, Vercel, Cloudflare, ElevenLabs and LLM providers.

**Before first sale:** privacy notice (including the voice statement *and* disclosure of automated decision-making) · terms (16+, no outcome guarantee, liability limits, England & Wales) · exam disclaimer on every exam page · refund and cancellation policy with one-click cancel and pre-renewal reminders.

**Professional advice needed:** a UK company genuinely managed from Thailand raises a "central management and control" question about tax residency. An accountant, not this document.

---

## 4d. Interface and experience

### The learner dashboard

Most language apps open on a streak counter, an XP total and a row of badges. Those are banned here (Quality bar 6). The dashboard exists to answer four questions, and nothing else earns space on it:

1. **Where am I?** — current level, *broken down per skill*. A learner is rarely one level; B2 reading with A2 speaking is normal, and a single blended number hides exactly what they most need to see.
2. **Am I improving?** — real measured ability change since last check, honestly reported. If nothing has moved, it says so and offers a different approach.
3. **What do I do now?** — one clear next action.
4. **How far to my goal?** — for exam users, current estimated band against target band, and what closes the gap.

### One next action, never a menu

Decision fatigue is what ends practice habits. The primary control is always a single "continue" that hands the choice to the sequencer, which knows the learner's position in the skill graph better than the learner does. Browsing the full catalogue stays available, but it is never the default path.

### The feedback screen is the most important screen in the product

For writing and speaking it must present, in one view:

- The learner's own text or transcript, with issues marked inline where they occurred
- A short ranked list of what to fix first, grouped (Quality bar 3)
- Each issue expandable to its explanation, the correction, and a direct link to the lesson teaching that node
- The score per criterion, each with the evidence that produced it

A score without visible evidence is not acceptable output. The learner should never have to wonder where a number came from.

### The diagnosis screen is what people pay for

After a mock test: score per criterion, root-cause classification (knowledge, processing, strategy or production), gaps ranked by estimated band impact, and the resulting plan with time estimates — plus one button to begin it. This screen is the single strongest argument for the subscription and is designed accordingly.

### Mock tests replicate exam conditions

Faithful timing, section locking, no navigation chrome, no notifications. The pressure is part of what is being practised.

### Built for the devices and networks this audience actually has

- **Mobile-first, not mobile-tolerant.** A large share of this market has no other device, and speaking practice in particular will happen on a phone.
- **Low-bandwidth resilient.** Core markets include India, the Philippines, Vietnam, Nigeria and Brazil. Audio preloads, payloads stay small, and practice degrades gracefully on poor connections rather than failing.
- **Accessible by standard**, per Quality bar 7.

### Visual and interaction quality

Implementation follows the existing design doctrine and standards already established across the user's projects. The bar is a product that looks and feels worth paying for on first screen — because in a market full of free apps, perceived quality is a substantial part of the conversion argument.

---

## 5. Monetisation

**Free tier** — placement test, a capped amount of daily practice, one full mock test with basic scoring. The free mock is the acquisition engine and the primary SEO surface.

**Paid tiers:**

| Tier | Monthly | Other | Contains |
|---|---|---|---|
| **Learner** | **$19** | **$149/year** | Full A1–C2 ladder, all four skills, vocabulary and grammar progressions, unlimited lessons and practice, scored writing and speaking, level tracking |
| **Exam** | **$49** | $119 / 3-month pass | IELTS and PTE task guidance, strategies, model answers at multiple bands, timed mocks, drill-down diagnosis, action plan, band projection |
| **Complete** | **$55** | — | Both of the above |
| **OET** | **$79** | $199 / 3-month pass | Exam tier, profession-specific: clinical roleplays, medical scenarios, OET rubric |

**One global price. No regional discounting (decided 2026-07-29).** The value here is tied to a globally-priced outcome — the test costs ~$250 everywhere, the visa costs the same, the salary abroad is the same. A learner in Manila and one in São Paulo are buying an identical opportunity worth an identical amount. This is unlike consumer entertainment, where value is local. The market also demonstrably bears it: E2Language charges $79/month selling into exactly these markets.

**The real barrier in those markets is payment access, not price.** Many learners in India, the Philippines, Bangladesh and Nigeria have no internationally-enabled card. Supporting UPI, GCash and local wallets will convert far more people than any discount, and those failures are invisible in analytics because they never reach checkout.

**Pricing rationale — anchored on exam prep, not consumer apps.** A single mock speaking test with a human examiner costs $20. Eight of those plus writing corrections and a few hours of tutoring is $340–380/month. Pricing at 15–25% of the displaced alternative puts the Exam tier at $50–95; $49 sits at the bottom of that and is 38% below E2Language while offering more.

| Reference point | Price |
|---|---|
| Babbel | $9/mo |
| ELSA Speak | $12/mo |
| Duolingo Max | $20–30/mo |
| Magoosh IELTS | $109–180 / 6 months |
| E2Language | $79/mo |
| Single examiner mock speaking test | $20 per session |
| Private tutor (India) | $8–24/hour |
| Full course (India) | $60–240 |

**Tier logic:**

- **Learner is the only price-elastic tier.** General learners have no deadline and compare against free Duolingo. $19 sits under the $20 threshold; $24 reads as "twenty-five". Most Learner revenue should come from the annual plan, which solves churn on the tier where churn is the real problem.
- **Exam is inelastic.** A test date and a $250 retake fee do the persuading. Sold as a 3-month pass as well as monthly, because people buy exam prep for a window, not a subscription.
- **OET is the least price-sensitive segment in the market.** Passing unlocks a UK or Australian salary often five to ten times the candidate's current one. Pricing it like a consumer app would signal that it does not work.
- **Complete is not merely a bundle** — it matches the product thesis. The free mock finds the gap, the diagnosis shows it is a *level* problem rather than a technique problem, and closing it needs the ladder. The Exam tier's diagnosis therefore sells the Learner tier by itself.

### 5.1 Usage limits

**The principle: unlimited consumption, metered production.** Lessons, reading, listening, vocabulary and grammar practice cost nothing to serve, so they are genuinely unlimited — that is also precisely the behaviour the product wants to encourage. Metering applies only where real cost sits, which is assessment of language the learner produces.

Diligent learners are not the cost risk. A person can produce only so much speech and writing in a day. The expensive users are abuse cases: scripts, shared accounts, and people using the writing assessor as a general-purpose AI. The limits are designed against those, not against committed learners.

**Practice tasks — designed to feel unlimited.** A single speaking prompt or writing task is cheap. Protection is by **burst rate limiting** (a ceiling per hour) rather than monthly quota — a human never reaches it, a script reaches it immediately. Supported by concurrent-session and device checks to catch account sharing.

**Full mock tests — explicitly counted.** A complete mock plus diagnosis is the expensive item, every exam prep product limits them, and learners neither expect nor resent otherwise. A set monthly allowance with additional mocks purchasable. This places the meter where users already accept one, and never in the middle of daily practice.

**Graceful failure is binding.** Hitting a limit offers a top-up, never a locked door. The learners most likely to reach a limit are exam candidates in their final fortnight — the moment they would most willingly pay more, and the moment a wall would be unforgivable.

**Numbers are set from data, not guesses.** R1 instruments per-user cost and runs generously. Limits are calibrated afterwards from observed behaviour. Numbers chosen now would be guesswork, and guessing tight strangles a product still proving it is worth paying for.

### 5.2 Cost control

**Governing rule: no cost control may degrade a learner-facing experience.** These act on infrastructure — caching, deduplication, input sanity, abuse detection — never on depth of teaching, quality of feedback, or accuracy of a score. If a saving would be felt by a genuine learner, it is not taken.

| Control | Mechanism | Learner impact |
|---|---|---|
| Content caching | Lessons, passages and audio generated once, served forever | None — this is what funds premium generation |
| Per-issue length limits | Each reported issue stated concisely; issue *count* never capped (§ Quality bar 3) | Improves feedback focus |
| Resubmission dedupe | Hash of normalised input + task + rubric version; exact match returns the cached assessment | Improves consistency |
| Input sanity limits | Reject submissions far outside task length, with a useful message | None — rejection doubles as feedback |
| Per-user cost tracking | Cost logged per user with outlier alerting | None — invisible |

**Deduplication matches exact text only, deliberately.** A learner who revises after feedback and resubmits *must* receive a fresh assessment — that is the core learning loop. Only true duplicates (double-click, network retry) return cached results. Whitespace is normalised before hashing so trivial differences do not force a re-bill. A secondary benefit: identical input always yields identical output, and a learner who resubmits unchanged work and receives a different band score loses trust in every score the platform has ever given them.

**Model selection: the best available model, everywhere (decided 2026-07-29).** No tiered routing to cheaper models for learner-facing work. This is affordable precisely because of the architecture — reading, listening and drilling make no model calls at all, so live inference occurs only on production tasks, which are naturally bounded by human capacity. Content generation likewise uses the best model, since generation is paid once and amortised across every learner who ever uses that asset. Cheap delivery is what funds expensive creation.

---

## 6. Release sequence

The destination is the full platform. This is shipping order, not scope reduction — every release is additive and nothing is rebuilt.

**Sequenced for earliest revenue, not for completeness.** The original plan reached first sale at three to four months. That is too long to go without evidence, and the risk it creates is not legal or competitive — it is spending a year building before discovering whether anyone pays for the differentiator.

| Release | Contents | Why here |
|---|---|---|
| **R0 — first revenue** | Free scored IELTS Writing mock + **paid diagnosis and action plan**. No ladder, no speaking, no PTE, no OET | **~8 weeks.** The skill graph already exists. Tests the one genuinely unproven thing: whether people pay for the *explanation* as well as the score |
| **R1** | Speaking assessment, complete IELTS Academic mocks, placement test | Completes the exam product once R0 has shown the diagnosis sells |
| **R2** | IELTS Listening + Reading; complete IELTS mock | Completes the highest-volume exam |
| **R3** | B1–C2 ladder, all four skills, vocabulary and grammar systems | Where existing users already are; converts exam churn into retention |
| **R4** | PTE Academic and OET tracks and mocks | Same engine, new content packs and rubrics |
| **R5** | Pre-A1–A2 true beginner | Largest content lift, lowest willingness to pay, benefits most from a proven engine |

Content generation for later releases runs continuously in the background from R1 onward, since it is pipeline-bound rather than blocked on engineering.

Realistic solo estimate with AI assistance: **R0 in ~8 weeks; R1 in 3–4 months; the full scope in 12–18 months.**

**The constraint is content, not code.** The engine is well-trodden API work on a familiar stack — the same author built JobPilot to 47 routes, 112 tests and an 8.8/10 security audit in roughly two months. What takes a year is generating, gating and reviewing thousands of validated items across six levels and four skills. R1b therefore matters more than any other release, and R0 exists so revenue starts before that year begins.

**What R0 answers:** the market is proven — 3.5–4M IELTS candidates annually, compelled demand, and established willingness to pay ($20 for a single examiner-marked mock, $60–240 for courses). What is *not* proven is whether learners pay for a diagnosis as well as a score. Eight weeks answers that; twelve months of content generation before asking is the actual risk in this project.

---

## 7. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Generated content is off-level or wrong | **High** | The validation gate pipeline (§3.6) is a first-class build, not an afterthought; live item statistics catch what the gates miss |
| Scores aren't trusted | **High** | Objective-feature split (§3.3); evidence-linked feedback; honest ranges with stated confidence rather than fake precision |
| Crowded market | **High** | Compete on diagnosis depth and the ladder underneath, not on having a band-score button — which is the only thing competitors have |
| **Content licensing / copyright challenge** | **High impact, low likelihood** | Whitelist of approved sources and an enforced blacklist (§3.7); provenance recorded per asset from creation; all practice material authored originally; no copyrighted source ever ingested in any form. Review by a lawyer before significant commercial launch |
| **Trademark challenge from an exam owner** | Medium | Nominative use only, no logos or implied endorsement, visible disclaimer on every exam page (§3.7). These are the rights holders of the exams being prepared for, so this is not a theoretical risk |
| Content bank copied by a competitor | Medium | Purely AI-generated content may not be copyrightable. Human editing strengthens the ownership claim — a further reason the review layer earns its cost |
| Exam-side churn | Medium | The ladder is the retention mechanism; this is precisely why the scope includes it |
| Scope fatigue over 12–18 months | Medium | Each release is independently sellable; revenue starts at R1 |
| **Learner loses progress to a sync failure** | **High** | Append-only events with client-generated IDs make sync idempotent and replayable; mastery is recomputed from the log rather than synced (§4c). Unforgivable in a study product, so designed up front |
| **Data loss with inadequate backups** | **High** | Provider retention is not a backup. Scheduled exports to independent storage on a different provider, with a *tested* restore procedure (§4c) |
| Write throughput ceiling on Turso | Low | Batched session writes cut volume 10–20×, moving the ceiling past any realistic horizon (§4c) |
| Analytics outgrow SQLite | Medium | Separate analytical store added later; requires no migration of transactional data |
| Vendor concentration (Vercel, Turso, Cloudflare) | Medium | Offline-capable client keeps learners working through any provider outage; exposure acknowledged rather than eliminated |

---

## 8. Decisions made

**Levels carry confidence tiers, and only confident ones measure (decided 2026-07-29, from building R1b-a).**

Three tiers: **1.0** stated by a source dataset · **0.9** curated by this project · **≤0.7** derived from component words. The first two drive the measured level of a text; derived levels are reported as questions for review and never move a number.

This was learned the hard way. Deriving phrasal verb levels from component words inflated transparent phrases — `go to` and `live in` both became B1, so *"I live in a small house. I go to school by bus."* profiled as intermediate. Two attempts to distinguish idiomatic from transparent offline (WordNet definition glosses, tagged-sense frequency) both failed; the glosses are essentially random and `give up` has the *highest* frequency count of any phrase.

Measured accuracy of the derivation, against the 157 multi-word entries with stated levels: **32.5% exact, 70.7% within one level.** Honestly mediocre, which is why it is advisory only.

**Common phrasal verbs are curated, because no source levels them (decided 2026-07-29).**

CEFR-J contains only 19 multi-word entries of phrasal shape, and most are prepositions (*next to*) or adjectives (*fed up*). The only true phrasal verbs it holds are rare and literary — *eke out*, *mull over*, *dole out*, *glory in*, all C2. Every common phrasal verb a learner meets is absent.

So roughly 190 are authored, spanning A1–C2, at confidence 0.9. **Transparent phrases are included deliberately**: without an entry, `go to` falls through to derivation and gets guessed at B1. The fix is not to suppress the guess but to supply the answer.

Calibration check: the C2 assignments here independently match CEFR-J's own for the four it covers. These remain expert judgement rather than corpus evidence, and belong in the first batch a qualified teacher reviews.

**Every distractor must name its misconception (decided 2026-07-29).**

Enforced in the type, not merely documented — a wrong option carries a mandatory field describing the belief that would lead a learner to choose it.

The reason is Quality bar 1's diagnostic-distractor requirement, made concrete. A generated sample lesson contained the option `have lose` — broken English nobody picks for a reason, which turns a four-option question into a three-option one and tells the diagnosis engine nothing. Vagueness is rejected in two ways: terms describing the *item* (`distractor`, `placeholder`) anywhere in the text, and weak openers (`wrong`, `incorrect`) when they carry the whole description.

**R1b sequence reordered: item quality before content schema (decided 2026-07-29).**

The original order put the content schema next. A generated sample lesson showed the *explanation* met the quality bar while the *exercises* did not — lazy distractors, and one question answerable by spotting a date without understanding anything. Item quality is therefore the greater risk and is built and proven first.

Revised order: **R1b-a** inventories and profiler (done) · **R1b-b** item quality gates · **R1b-c** content schema · **R1b-d** constrained generation and correctness gates · **R1b-e** teaching-quality gates and golden set · **R1b-f** source connectors · **R1b-g** review queue and live signals.



**Turso retained over Postgres (decided 2026-07-29).** Postgres was seriously considered and rejected. Its advantages are real — concurrent writes, pgvector, and a far better query planner for aggregation. But the workload here is read-heavy at the edge with modest writes and *batch* analytics, which is Turso's shape rather than Postgres's. The deciding factors were the free tier (5 GB against Neon's 0.5 GB, supporting roughly ten times as many learners before paying), predictable cheap scaling ($4.99 for 9 GB and 25M writes), and existing familiarity. The one genuine loss is analytical query power, which is deferrable: a separate analytical store can be added later without migrating transactional data.

*Recorded honestly because the reasoning matters:* an earlier version of this argument leaned on Turso's sub-millisecond embedded replicas. That was wrong — embedded replicas require a persistent local filesystem and do not work on Vercel Functions. Turso is the right choice on cost, simplicity and fit, **not** on latency. Latency is solved in the application layer (§4b) and would need solving that way whichever database was chosen.

**Cloudflare R2 for content, not Vercel Blob (decided 2026-07-29).** Free egress at any scale versus $0.05/GB on every download including cache hits. See §4.1 for the cost comparison — the difference reaches hundreds of dollars a month at scale, and R2 additionally has better edge presence in the target markets.

**Local-first client with batched session writes (decided 2026-07-29).** Required to meet the latency budgets, and it simultaneously removes the write-throughput ceiling and delivers offline capability. See §4b and §4c.

**Content sourced entirely from public-domain and commercially-permissive sources; zero content budget (decided 2026-07-29).** No licensing fees, no paid content banks. The full sourcing whitelist, prohibited-source blacklist, provenance requirements and trademark rules are in §3.7 and are binding.

The accepted trade-off: quality is verified **empirically after release** — through item statistics, learner reporting and abandonment tracking — rather than **editorially before release** by a paid reviewer. Some flawed items will reach learners. That is acceptable only because the live signals catch them quickly, and it is a knowingly different risk profile from paid editorial review.

**Two consequences accepted with it:** OET is deferred until a healthcare professional can validate clinical scenarios, since neither AI nor an English teacher can verify medical plausibility and healthcare professionals lose trust instantly over wrong clinical detail. And expertise, where needed, is obtained by trading product access — free lifetime accounts for reviewers, practicum credit for TESOL students, revenue share for a former examiner — rather than by paying cash.

**Vercel compute region set to `sin1` (decided 2026-07-29).** Vercel defaults to US East, which would add roughly 0.2s to every request from the primary markets. Must be set explicitly in configuration.



**Content review — hybrid (decided 2026-07-29).** The founder reviews structure, pedagogy and level-fit; a paid CELTA/DELTA-qualified teacher reviews language accuracy and naturalness on a per-batch basis. This avoids both bottlenecking entirely on the founder and paying for full external review of everything. The review tooling must therefore support two distinct reviewer roles with separate queues and sign-off, and per-batch costing needs tracking since it scales with content volume.

**IELTS Academic first; General Training later (decided 2026-07-29).** Academic serves both target segments at once — university applicants and healthcare migrants, since the UK nursing regulator accepts IELTS Academic or OET but not General Training. General Training is a later, cheap addition rather than a second exam build, because Listening and Speaking are identical between the two, Writing Task 2 is the same task, and Reading uses the same question types over different texts. Only Writing Task 1 genuinely differs (chart description versus letter writing), so adding GT means one new task type, a different reading text set, and a different score conversion table.

---

## 9. Open questions

1. **Naming and domain** — "FluentPath" is a placeholder.
2. **Pricing levels** — tier structure is decided; numbers are not.
3. **Calibration data** — how examiner-scored samples are eventually acquired to validate scoring against real band awards.
4. **OET profession coverage** — all twelve professions, or nursing and medicine first (they dominate volume)?
5. **Speech vendor** — STT and pronunciation scoring are specified by *requirement* (word timings, per-word confidence, phoneme-level accuracy) rather than by vendor. Selection needs a head-to-head evaluation on accented non-native speech, which is where these services differ most and where marketing claims are least reliable.

---

## 10. What is explicitly in scope

Stated plainly, because the scope has been the main point of discussion:

- Full English lessons — reading, writing, listening, speaking — Pre-A1 through C2
- Complete vocabulary progression, sense-level, CEFR-tagged
- Complete grammar progression, CEFR-tagged, prerequisite-ordered
- Dedicated lesson tracks for IELTS, PTE Academic, and OET
- Full, faithful, timed mock tests for all three exams
- Drill-down diagnosis with root-cause classification
- Personalised action plans with projected band impact

All of it.
