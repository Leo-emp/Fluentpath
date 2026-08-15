# FluentPath: Technical Report

## Problem Statement

English language learning platforms face a fundamental trade-off: generic content is scalable but ineffective, while personalized instruction is effective but doesn't scale. Most platforms offer a fixed curriculum where every learner follows the same path regardless of their starting level, existing strengths, or target exam.

Three technical challenges make adaptive language learning harder than general adaptive education:

1. **Multi-dimensional proficiency** — Language competence isn't a single score. A learner might be B2 in reading but A2 in speaking. Diagnosis must map each skill independently across the 6 CEFR levels (A1–C2), producing a multi-dimensional profile rather than a single placement.
2. **Skill decay** — Unlike math or programming, language skills degrade without practice. A learner who reached B1 listening three months ago may have decayed to A2. The system must model decay and schedule reviews at the right intervals.
3. **Exam-specific scoring** — IELTS, PTE, and OET each use different scoring rubrics for writing and speaking. An AI scoring system must implement each rubric faithfully, not approximate with a generic "good/bad" signal.

## Approach

### CEFR Diagnostic Engine

The diagnostic module classifies learner proficiency across multiple language domains using a multi-attribute analysis pipeline:

**Stage 1 — Attribute Extraction:** Raw learner responses are decomposed into measurable attributes: vocabulary range, grammatical accuracy, cohesion, task achievement, pronunciation features (for speaking), and argument development.

**Stage 2 — CEFR Classification:** Each attribute is mapped to a CEFR level (A1–C2) using band descriptors derived from the official CEFR framework. The classifier handles the common case where a learner performs at different levels on different attributes — a B1 vocabulary range with A2 grammatical accuracy produces a split-level profile, not a blended score.

**Stage 3 — Gap Analysis:** The diagnosed profile is compared against the learner's target (general improvement, IELTS band 7, PTE 79+, OET B grade). The gap analysis identifies which skills need the most work and in what order, considering prerequisite dependencies in the skill graph.

**Stage 4 — Learning Plan:** The gap analysis feeds into a structured plan: which skills to prioritize, what lesson types to use, and how many practice sessions are needed to reach the target. The plan updates dynamically as the learner progresses.

### Skill Graph

Language competencies form a directed acyclic graph where each node is a CEFR-aligned skill and edges represent prerequisites. The graph enforces constraints that the sequencer must respect:

- **Level validation** — A learner cannot attempt C1 writing tasks without demonstrating B2 cohesion and B2 argument structure.
- **Cross-skill dependencies** — Speaking assessment at B2+ requires B2 vocabulary, because a learner cannot demonstrate fluency without sufficient lexical range.
- **Progression rules** — Mastery at one level unlocks the next level's skills in the same domain, but only when prerequisites from other domains are also satisfied.

The skill graph is the structural backbone of the platform. Every diagnostic, sequencing, and assessment decision references it.

### Mastery and Spaced Repetition

The mastery module models each learner's skill state as a combination of demonstrated level and decay:

**Mastery State:** Each skill the learner has practiced carries a mastery score, a timestamp, and a decay constant. The decay constant is calibrated per skill — vocabulary decays faster than grammar rules, and productive skills (writing, speaking) decay faster than receptive skills (reading, listening).

**Decay Model:** Mastery decays exponentially from the last practice timestamp. A skill mastered to 0.9 three weeks ago with a decay constant of 0.05/day is now at approximately 0.32 — below the threshold for "retained" and scheduled for review.

**Update Rules:** When a learner practices a skill and demonstrates mastery, the mastery score increases and the decay constant decreases (the skill becomes more durable). Repeated successful reviews make a skill increasingly resistant to decay, implementing the core spaced repetition principle.

### Adaptive Sequencer

The sequencer assembles personalized lesson sessions by selecting from the item bank based on multiple constraints:

1. **Eligibility** — Only lessons whose prerequisite skills are mastered (per the skill graph) are candidates.
2. **Gap priority** — Lessons targeting the learner's weakest skills (per the diagnostic gap analysis) are weighted higher.
3. **Decay urgency** — Skills approaching the decay threshold are prioritized for review before they drop below retention.
4. **Difficulty calibration** — Lesson difficulty is matched to the learner's current level with slight upward pressure (i+1 principle — one step above current competence).
5. **Variety** — The sequencer avoids repeating the same skill type in consecutive lessons, mixing reading, writing, listening, and speaking within a session.

### Writing Assessment

The writing module implements 4 independent rubric systems:

| Rubric | Criteria | Scale |
|--------|----------|-------|
| **General** | Task achievement, coherence, vocabulary, grammar | 1–10 |
| **IELTS** | Task response, coherence/cohesion, lexical resource, grammatical range | Band 0–9 |
| **PTE** | Content, form, grammar, vocabulary, spelling | 10–90 |
| **OET** | Purpose, content, tone, layout, grammar, vocabulary | A–E |

Each rubric is a separate module with its own scoring logic. The AI assessment pipeline works in two stages:

**Pass 1 — Scoring:** The learner's writing is evaluated against the selected rubric's criteria. The prompt includes the specific band descriptors for each criterion, so the AI applies the exam's actual standards rather than a generic quality assessment.

**Pass 2 — Feedback Gates:** Before feedback is returned, it passes through validation gates that check: (a) the scores are internally consistent (a learner can't score Band 7 on lexical resource but Band 4 on task response in a standard IELTS task), (b) the feedback references specific passages from the learner's writing, and (c) the improvement suggestions are actionable and level-appropriate.

### Speaking Assessment

Speaking assessment combines speech-to-text transcription with rubric-based scoring:

**STT Provider Abstraction:** The system abstracts the speech-to-text provider behind an interface, allowing different STT engines to be swapped without changing the assessment logic. This is critical because STT accuracy varies by accent, and the platform serves learners globally.

**Pronunciation Features:** Beyond transcription, the system extracts pronunciation features — hesitation patterns, intonation contours, and phoneme accuracy — which feed into the speaking rubric alongside content quality.

**Rubric Scoring:** Like writing, speaking uses exam-specific rubrics. IELTS speaking evaluates fluency/coherence, lexical resource, grammatical range, and pronunciation. PTE speaking evaluates oral fluency, pronunciation, and content. Each rubric is implemented separately.

### Content Pipeline

Content enters the system through two paths:

**Authored Content:** Curated lessons and exercises created by language experts, ingested through the content pipeline (`ingest.ts` → `item-bank.ts` → `publish.ts`). Each item is tagged with CEFR level, skill domain, and exam relevance.

**AI-Generated Content:** The generation module produces new exercises and lessons using AI, with constraints that ensure generated content matches the target CEFR level, skill focus, and exam format. Generated content goes through the same publishing pipeline as authored content.

Currently 264 writing and speaking lessons are published, with reading, listening, and vocabulary content in the pipeline.

### Adaptive Placement Test

For learners who skip the full diagnostic, the placement test uses an adaptive algorithm inspired by Item Response Theory (IRT):

1. Start at B1 (mid-range) difficulty
2. If the learner answers correctly, increase difficulty; if incorrect, decrease
3. Continue until the confidence interval narrows below a threshold
4. Map the estimated ability to a CEFR level per skill tested

This typically requires 15–20 items to place a learner accurately, versus 40+ items in a fixed diagnostic.

## Results

### System Specifications

| Metric | Value |
|--------|-------|
| Total codebase | 82,000+ lines of TypeScript |
| Source files | 483 modules |
| API routes | 39 endpoints |
| React components | 41 |
| Database tables | 42 |
| Migrations | 7 versioned (Drizzle ORM) |
| Test files | 109 |
| Passing tests | 1,100+ (Vitest) |
| Writing rubrics | 4 systems (General, IELTS, PTE, OET) |
| Content lessons | 264 (writing + speaking) |
| CEFR coverage | A1–C2 (6 levels) |

### Architecture Highlights

- **Multi-dimensional diagnosis** — Each learner gets a per-skill CEFR profile, not a single blended score
- **Exam-faithful scoring** — IELTS, PTE, and OET rubrics implemented separately with exam-specific band descriptors
- **Mastery decay** — Exponential decay model prevents skill atrophy by scheduling reviews at optimal intervals
- **Prerequisite enforcement** — Skill graph prevents learners from attempting content above their readiness level
- **1,100+ tests** — Every scoring algorithm, diagnostic classifier, and sequencing rule is covered

## Conclusions

The core insight of FluentPath is that language proficiency is not a single dimension — it's a graph of interdependent skills, each with its own level, decay rate, and prerequisite chain. Building the platform around this model (rather than treating proficiency as a linear score) enables genuinely adaptive sequencing: a learner who is B2 in reading but A2 in speaking gets a fundamentally different curriculum than one at B1 across the board.

The mastery decay model is the second critical design decision. Without it, a learner who completed B1 listening six months ago would appear "done" with B1 listening forever. The decay model surfaces that this skill needs review, and the sequencer interleaves review sessions with new material automatically.

Exam-specific rubric systems are the third pillar. A generic "your writing is good/bad" assessment is useless for a learner preparing for IELTS Band 7. The system scores against the same criteria the exam uses, so feedback directly maps to score improvement.

## Future Work

- **Reading and listening content** — Expand the item bank to cover all 6 language skills with full CEFR coverage
- **Real-time speaking practice** — Live conversation mode with AI interlocutor for fluency development
- **Cohort analytics** — Dashboard for language schools and bootcamps tracking class-wide progress
- **Predictive scoring** — Use historical mastery data to predict exam scores before the learner sits the test
