# FluentPath

An adaptive English learning platform covering A1–C2 proficiency plus exam preparation (IELTS, PTE, OET). The system diagnoses each learner's CEFR skill profile, generates personalized lesson sequences, and tracks mastery decay across all language skills — reading, writing, listening, speaking, vocabulary, and grammar.

Built as a production-grade Next.js application: **82,000+ lines of TypeScript**, 42 database tables, 1,100+ automated tests, AI-powered assessment with rubric-based scoring, spaced repetition, and gamification.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    LEARNER DASHBOARD                          │
│  Skill graph · Lessons · Progress · Streaks · Achievements   │
└────────────────────────────┬─────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                     39 API ROUTES                             │
│  /diagnosis · /lessons · /placement · /speaking · /writing   │
│  /practice · /progress · /mock-test · /gamification          │
└────────────────────────────┬─────────────────────────────────┘
                             │
    ┌────────────────────────┼──────────────────────────┐
    │                        │                          │
    ▼                        ▼                          ▼
┌──────────────────┐  ┌──────────────┐  ┌─────────────────────┐
│  DIAGNOSIS       │  │  SEQUENCER   │  │  ASSESSMENT         │
│                  │  │              │  │                     │
│ CEFR classifier  │  │ Eligibility  │  │ Writing rubrics     │
│ Attribute engine │  │ Session plan │  │ Speaking rubrics     │
│ Skill projection │  │ Level select │  │ IELTS/PTE/OET       │
│ Gap analysis     │  │ Adaptive     │  │ AI scoring           │
│ Learning plan    │  │ Difficulty   │  │ Feedback gates       │
└──────────────────┘  └──────────────┘  └─────────────────────┘
        │                    │                      │
        ▼                    ▼                      ▼
┌──────────────────────────────────────────────────────────────┐
│                    CONTENT ENGINE                             │
│  Item bank · Content ingest · Lesson generation · Profiler   │
│  264 writing+speaking lessons · Vocabulary inventories       │
└────────────────────────────┬─────────────────────────────────┘
                             │
    ┌────────────────────────┼──────────────────────────┐
    │                        │                          │
    ▼                        ▼                          ▼
┌──────────────────┐  ┌──────────────┐  ┌─────────────────────┐
│  SKILL GRAPH     │  │  MASTERY     │  │  GAMIFICATION       │
│                  │  │              │  │                     │
│ CEFR skill map   │  │ Decay model  │  │ XP system           │
│ Dependency tree  │  │ Spaced rep   │  │ Streaks             │
│ Level validation │  │ Update rules │  │ Achievements        │
└──────────────────┘  └──────────────┘  └─────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                 │
│  Drizzle ORM · SQLite/Turso · 42 tables · 7 migrations      │
│  Better Auth · Paddle billing · Resend email · PostHog       │
└──────────────────────────────────────────────────────────────┘
```

## AI/ML Techniques

| # | Technique | Implementation | Purpose |
|---|-----------|---------------|---------|
| 1 | **CEFR Diagnostic Engine** | Multi-attribute classification (A1–C2) | Precise skill-level diagnosis per language domain |
| 2 | **Adaptive Placement** | Item Response Theory-based adaptive testing | Place learners at correct level without full diagnostic |
| 3 | **AI Writing Assessment** | Rubric-based scoring (IELTS/PTE/OET rubrics) | Score writing tasks with exam-aligned feedback |
| 4 | **AI Speaking Assessment** | Speech-to-text + rubric scoring | Evaluate pronunciation, fluency, grammar in speech |
| 5 | **Mastery Decay Model** | Spaced repetition with exponential decay | Schedule reviews at optimal intervals |
| 6 | **Adaptive Sequencer** | Eligibility + difficulty + gap analysis | Generate personalized lesson sequences per learner |
| 7 | **Content Generation** | AI-powered lesson and exercise creation | Scale content across 6 CEFR levels and 3 exam types |
| 8 | **Skill Graph Engine** | Dependency-aware CEFR competency map | Track and validate prerequisite mastery chains |

## Core Modules

| Module | Files | Purpose |
|--------|-------|---------|
| `diagnosis/` | 7 | CEFR classification, attribute analysis, gap detection, learning plans |
| `skill-graph/` | 3 | CEFR competency map, dependency validation, level progression |
| `mastery/` | 5 | Spaced repetition, decay modeling, mastery state management |
| `sequencer/` | 6 | Lesson selection, session assembly, difficulty adaptation |
| `writing/` | 13 | Writing tasks, rubrics (IELTS/PTE/OET), AI scoring, feedback gates |
| `speaking/` | 8 | Speaking tasks, STT provider, pronunciation assessment, rubrics |
| `placement/` | 3 | Adaptive placement test, item selection, score calculation |
| `content/` | 6 | Item bank, content ingestion, publishing, statistics |
| `generation/` | 3 | AI lesson generation, constraint system, provider abstraction |
| `profiler/` | 3 | Learner profiling, vocabulary inventory, lemma analysis |
| `gamification/` | 2 | XP system, streak tracking |
| `mock-test/` | — | Full-length practice exams (IELTS, PTE, OET) |

## Exam Preparation

| Exam | Support Level | Features |
|------|--------------|---------|
| **IELTS** | Full | Task 1 + Task 2 writing rubrics, speaking rubrics, mock tests |
| **PTE** | Full | Writing rubrics, speaking rubrics, scored practice |
| **OET** | Full | Healthcare-specific writing rubrics, speaking scenarios |
| **General English** | Full | A1–C2 curriculum, all 6 language skills |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Database | SQLite via Drizzle ORM (42 tables, 7 migrations) |
| Auth | Better Auth (email + social) |
| AI | Google Gemini (assessment, generation) |
| Speech | STT provider abstraction (speaking assessment) |
| TTS | Text-to-speech for listening exercises |
| Billing | Paddle |
| Email | Resend |
| Analytics | PostHog |
| Testing | Vitest (1,100+ tests) |
| Deployment | Vercel + Turso |

## Project Structure

```
fluentpath/                         # 82,000+ lines of TypeScript
├── src/
│   ├── app/
│   │   ├── api/                    # 39 API routes
│   │   │   ├── diagnosis/          # CEFR diagnostic endpoints
│   │   │   ├── placement/          # Adaptive placement test
│   │   │   ├── lessons/            # Lesson CRUD + sequencing
│   │   │   ├── lesson-completions/ # Progress tracking
│   │   │   ├── writing/            # Writing submission + scoring
│   │   │   ├── speaking/           # Speaking assessment + STT
│   │   │   ├── mock-test/          # Full exam simulations
│   │   │   ├── practice/           # Skill practice sessions
│   │   │   ├── progress/           # Learner progress queries
│   │   │   ├── gamification/       # XP + streaks + achievements
│   │   │   ├── tts/                # Text-to-speech generation
│   │   │   ├── subscribe/          # Paddle billing webhooks
│   │   │   └── admin/              # Admin content management
│   │   └── page.tsx                # Learner dashboard
│   ├── components/                 # 41 React components
│   ├── diagnosis/                  # CEFR diagnostic engine
│   ├── skill-graph/                # Competency dependency map
│   ├── mastery/                    # Spaced repetition + decay
│   ├── sequencer/                  # Adaptive lesson sequencer
│   ├── writing/                    # Writing assessment (13 files)
│   ├── speaking/                   # Speaking assessment (8 files)
│   ├── placement/                  # Adaptive placement test
│   ├── content/                    # Item bank + ingestion
│   ├── generation/                 # AI content generation
│   ├── profiler/                   # Learner profiling + vocab
│   ├── gamification/               # XP + streaks
│   ├── mock-test/                  # Exam simulation engine
│   ├── db/
│   │   ├── schema/                 # 42 tables across modules
│   │   ├── repositories/           # Data access layer
│   │   └── client.ts               # Drizzle + Turso connection
│   └── lib/                        # Auth, email, billing, utils
├── tests/                          # 109 test files, 1,100+ tests
├── data/inventories/               # Vocabulary inventory data
├── drizzle/                        # 7 versioned migrations
└── scripts/                        # Seeding + admin tooling
```

## By the Numbers

| Metric | Value |
|--------|-------|
| Lines of code | 82,000+ TypeScript |
| Source files | 483 modules |
| API routes | 39 endpoints |
| React components | 41 |
| Database tables | 42 |
| Migrations | 7 versioned |
| Test files | 109 |
| Passing tests | 1,100+ |
| Writing rubrics | 4 systems (general, IELTS, PTE, OET) |
| Speaking features | STT + rubric scoring + pronunciation |
| Content lessons | 264 (writing + speaking) |
| CEFR levels | 6 (A1–C2) |

## Key Engineering Decisions

**Why CEFR as the core model?** The Common European Framework of Reference is the international standard for language proficiency. Building the entire system around CEFR levels (A1–C2) ensures every diagnostic, lesson, and assessment maps to a globally recognized scale — critical for exam prep (IELTS, PTE, OET all reference CEFR).

**Why a skill graph with dependencies?** Language skills have prerequisites — you can't write complex arguments (C1) without mastering cohesion (B2). The skill graph enforces these dependencies, preventing the sequencer from assigning lessons above the learner's readiness level.

**Why mastery decay?** Language skills degrade without practice. The exponential decay model schedules reviews at optimal intervals (spaced repetition), so learners maintain skills they've already acquired while progressing to new ones.

**Why separate rubrics per exam?** IELTS, PTE, and OET score writing and speaking differently. IELTS uses band descriptors (0-9), PTE uses communicative skills scoring, OET uses healthcare-specific criteria. Each rubric system is implemented separately to give learners exam-accurate feedback.

**Why 1,100+ tests?** An adaptive learning platform where incorrect scoring damages learner outcomes. Every rubric, scoring algorithm, diagnostic classifier, and sequencing rule is tested to prevent regressions that could misdiagnose a learner's level or score an exam task incorrectly.

## Setup

```bash
git clone https://github.com/Leo-emp/Fluentpath.git
cd Fluentpath

npm install

# Configure environment
cp .env.example .env
# Add: DATABASE_URL, GEMINI_API_KEY, BETTER_AUTH_SECRET
# Add: PADDLE_API_KEY, RESEND_API_KEY, POSTHOG_KEY

npx drizzle-kit migrate
npm run dev
```

## Live

- **Repository:** [github.com/Leo-emp/Fluentpath](https://github.com/Leo-emp/Fluentpath)

## License

MIT
