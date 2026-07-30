# Skill Graph Seed Data — IELTS-Complete

## Goal

Replace the 13-node test fixture with a 45-node, 49-edge CEFR-aligned skill graph that makes the IELTS Academic mock test work end-to-end: placement → sequencer → mock test → diagnosis → action plan. Every node referenced by the IELTS exam definition exists, every prerequisite chain is walkable from A1, and every consumer (placement, sequencer, diagnosis) gets realistic data.

## Scope

**In scope:**

- All 17 node IDs referenced by `src/mock-test/exams/ielts-academic.ts`
- Prerequisite chains from A1 for every skill (listening, reading, writing, speaking)
- Grammar, lexical, and phonology support nodes that feed cross-type edges
- Fix the `strategy.` → `strat.` prefix mismatch in the exam definition
- Update seed tests to match new node/edge counts

**Out of scope:**

- Full CEFR inventory (hundreds of nodes) — that's R1b content pipeline work, expanded as the content pipeline generates items
- PTE/OET exam definitions and their nodes
- General English learning paths beyond what IELTS needs

---

## ID Convention

All node IDs follow `{type_prefix}.{level_or_exam}.{topic}`:

| Type | Prefix | Middle segment | Example |
|------|--------|---------------|---------|
| grammar | `gram.` | CEFR level | `gram.a1.be_present` |
| can-do | `cando.` | CEFR level | `cando.b1.understand_monologue` |
| lexical | `lex.` | CEFR level | `lex.a2.travel` |
| phonological | `phono.` | CEFR level | `phono.a1.word_stress` |
| strategy | `strat.` | exam name | `strat.ielts.task2_structure` |

Strategy nodes use `{exam}` instead of `{level}` because strategies are exam-specific — you look up "all IELTS strategies", not "all B1 strategies". The CEFR level is stored in the node's `level` field, not encoded in the ID.

### Breaking change: exam definition prefix

`src/mock-test/exams/ielts-academic.ts` currently uses `strategy.ielts.*` in 6 nodeIds references. These must change to `strat.ielts.*` to match the established convention. No other production files reference these IDs — diagnosis tests use independent inline fixtures and do not need changes.

---

## Node Inventory (45 nodes)

### Grammar — general skill (12 nodes)

| ID | Level | Title | Description |
|----|-------|-------|-------------|
| `gram.a1.be_present` | A1 | Present simple: be | am/is/are for identity, location, description |
| `gram.a1.present_simple` | A1 | Present simple: other verbs | I work, she lives — habitual actions |
| `gram.a1.can_cant` | A1 | Can / can't | Ability and permission in present |
| `gram.a2.past_simple` | A2 | Past simple | Regular and irregular past forms |
| `gram.a2.future_going_to` | A2 | Future: going to | Plans and intentions |
| `gram.a2.comparatives` | A2 | Comparatives and superlatives | bigger than, the most important |
| `gram.b1.present_perfect` | B1 | Present perfect | have/has + past participle for experience and result |
| `gram.b1.pp_vs_past_simple` | B1 | Present perfect vs past simple | When to use each — the single most tested IELTS grammar point |
| `gram.b1.modals` | B1 | Modals: must, should, might | Obligation, advice, possibility |
| `gram.b2.conditionals` | B2 | Conditionals: second and third | Hypothetical and counterfactual |
| `gram.b2.passive` | B2 | Passive voice | Process description, formal register |
| `gram.b2.reported_speech` | B2 | Reported speech | Transforming direct to indirect speech |

### Listening can-do — listening skill (5 nodes)

| ID | Level | Title | Description |
|----|-------|-------|-------------|
| `cando.a1.understand_instructions` | A1 | Can follow simple instructions | Short, clear directions spoken slowly |
| `cando.a2.understand_conversation` | A2 | Can understand a simple conversation | Two speakers on everyday topics — IELTS Listening Part 1 |
| `cando.b1.understand_monologue` | B1 | Can understand a monologue on a familiar topic | One speaker giving information — IELTS Listening Part 2 |
| `cando.b2.understand_discussion` | B2 | Can understand a discussion between multiple speakers | Academic or training context — IELTS Listening Part 3 |
| `cando.c1.understand_lecture` | C1 | Can understand an academic lecture | Extended monologue on abstract or complex topic — IELTS Listening Part 4 |

### Reading can-do — reading skill (5 nodes)

| ID | Level | Title | Description |
|----|-------|-------|-------------|
| `cando.a1.read_signs` | A1 | Can understand short simple signs and notices | Public signs, menus, timetables |
| `cando.a2.read_personal_letter` | A2 | Can understand short personal letters | Simple narrative or description from a known person |
| `cando.b1.understand_factual_text` | B1 | Can understand straightforward factual text | News, instructions, factual prose — IELTS Reading Passage 1 |
| `cando.b2.understand_argument` | B2 | Can understand an argument's line of reasoning | Opinion pieces, academic argument — IELTS Reading Passage 2 |
| `cando.c1.understand_abstract_text` | C1 | Can understand complex abstract text | Academic or specialised text requiring inference — IELTS Reading Passage 3 |

### Writing can-do — writing skill (5 nodes)

| ID | Level | Title | Description |
|----|-------|-------|-------------|
| `cando.a1.write_simple_phrases` | A1 | Can write simple phrases about themselves | Name, nationality, address — form-filling level |
| `cando.a2.write_short_messages` | A2 | Can write short simple messages | Notes, short emails, postcards |
| `cando.b1.write_connected_text` | B1 | Can write connected text on familiar topics | Linked paragraphs, simple essays, letters |
| `cando.b2.describe_data` | B2 | Can describe data in a chart or graph | Select, compare, summarise trends — IELTS Writing Task 1 |
| `cando.b2.write_essay` | B2 | Can write a structured argumentative essay | Clear position, developed argument, conclusion — IELTS Writing Task 2 |

### Speaking can-do — speaking skill (5 nodes)

| ID | Level | Title | Description |
|----|-------|-------|-------------|
| `cando.a1.introduce_self` | A1 | Can introduce themselves and others | Name, where from, what they do |
| `cando.a2.describe_routine` | A2 | Can describe daily routine in simple terms | Short sentences, basic connectors |
| `cando.b1.describe_routine` | B1 | Can describe experiences and routines with reasons | Connected speech, some detail — IELTS Speaking Part 1 |
| `cando.b2.give_detailed_account` | B2 | Can give a detailed account of a topic | Extended turn, narrative structure — IELTS Speaking Part 2 |
| `cando.b2.discuss_abstract` | B2 | Can discuss abstract or hypothetical topics | Speculate, evaluate, compare viewpoints — IELTS Speaking Part 3 |

### Lexical — general skill (4 nodes)

| ID | Level | Title | Description |
|----|-------|-------|-------------|
| `lex.a1.everyday_objects` | A1 | Everyday objects | House, food, clothes, body — concrete nouns |
| `lex.a2.travel` | A2 | Travel and transport | Directions, tickets, accommodation |
| `lex.b1.work_education` | B1 | Work and education | Jobs, qualifications, workplace vocabulary |
| `lex.b2.abstract_concepts` | B2 | Abstract concepts | Society, environment, technology — essay vocabulary |

### Phonology — speaking skill (3 nodes)

| ID | Level | Title | Description |
|----|-------|-------|-------------|
| `phono.a1.word_stress` | A1 | Word stress in common words | Which syllable carries the stress |
| `phono.a2.sentence_stress` | A2 | Sentence stress and rhythm | Content vs function words, natural rhythm |
| `phono.b1.connected_speech` | B1 | Connected speech features | Linking, elision, assimilation in natural flow |

### IELTS Strategy — various skills (6 nodes)

Strategy nodes have no CEFR prerequisites — they are exam techniques orthogonal to language level. Each is assigned the CEFR level at which the strategy becomes meaningful.

| ID | Level | Skill | Title | Description |
|----|-------|-------|-------|-------------|
| `strat.ielts.time_management` | B1 | general | IELTS time management | Pacing across sections, when to move on |
| `strat.ielts.task1_structure` | B1 | writing | IELTS Writing Task 1: report structure | Overview → body paragraphs → key features |
| `strat.ielts.task2_structure` | B1 | writing | IELTS Writing Task 2: essay structure | Introduction → body → conclusion, thesis statement |
| `strat.ielts.part1_answers` | B1 | speaking | IELTS Speaking Part 1: short answers | Extend beyond yes/no, give reasons, 2-3 sentences |
| `strat.ielts.part2_structure` | B1 | speaking | IELTS Speaking Part 2: long turn | Follow cue card, use 1 min prep, speak for 2 min |
| `strat.ielts.part3_extend` | B2 | speaking | IELTS Speaking Part 3: extending answers | Speculate, exemplify, compare, evaluate |

### Summary matrix

|  | A1 | A2 | B1 | B2 | C1 | Total |
|--|----|----|----|----|----| ------|
| grammar | 3 | 3 | 3 | 3 | - | 12 |
| cando | 4 | 4 | 4 | 6 | 2 | 20 |
| lexical | 1 | 1 | 1 | 1 | - | 4 |
| phono | 1 | 1 | 1 | - | - | 3 |
| strategy | - | - | 4 | 2 | - | 6 |
| **Total** | **9** | **9** | **13** | **12** | **2** | **45** |

**Existing nodes retained:** 13 of the original seed nodes survive with identical IDs. The `strat.ielts.task2_structure` node keeps its ID but gains a proper description.

**New nodes added:** 32 nodes total. 17 required by the IELTS exam definition + 15 prerequisite/support nodes.

---

## Edge Inventory (48 edges)

Edges are organised by purpose. Strength values determine how strongly a prerequisite gates its dependent — 1.0 fully blocks, lower values mean "helps but does not block".

### Grammar progression (13 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `gram.a1.be_present` → `gram.a1.present_simple` | 1 | Subject-verb agreement pattern transfers |
| `gram.a1.be_present` → `gram.a1.can_cant` | 1 | Modal + bare infinitive needs be as foundation |
| `gram.a1.present_simple` → `gram.a2.past_simple` | 1 | Past is the present form with tense marking |
| `gram.a1.present_simple` → `gram.a2.future_going_to` | 1 | Uses present "be" + going to + infinitive |
| `gram.a2.past_simple` → `gram.b1.present_perfect` | 1 | Past participle builds on past forms |
| `gram.b1.present_perfect` → `gram.b1.pp_vs_past_simple` | 1 | Must know both forms to learn the contrast |
| `gram.a2.past_simple` → `gram.b1.pp_vs_past_simple` | 1 | Must know both forms to learn the contrast |
| `gram.a1.can_cant` → `gram.b1.modals` | 1 | can/can't is the entry point to the modal system |
| `gram.a2.past_simple` → `gram.b2.conditionals` | 1 | Past form appears in 2nd conditional |
| `gram.b1.modals` → `gram.b2.conditionals` | 0.7 | would/could/might in conditional consequences |
| `gram.b1.present_perfect` → `gram.b2.passive` | 1 | Auxiliary verb pattern (have done → be done) |
| `gram.a2.past_simple` → `gram.b2.reported_speech` | 1 | Tense backshift requires past forms |
| `gram.b1.present_perfect` → `gram.b2.reported_speech` | 0.7 | Backshift of present perfect to past perfect |


`gram.a2.comparatives` has no prerequisites — it is a root node (independent A2 structure).

### Lexical progression (3 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `lex.a1.everyday_objects` → `lex.a2.travel` | 0.5 | Concrete nouns help but don't block travel vocab |
| `lex.a2.travel` → `lex.b1.work_education` | 0.5 | Expanding from concrete to professional domains |
| `lex.b1.work_education` → `lex.b2.abstract_concepts` | 0.5 | Professional vocab is the bridge to abstract topics |

### Phonology progression (2 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `phono.a1.word_stress` → `phono.a2.sentence_stress` | 1 | Can't stress sentences without stressing words |
| `phono.a2.sentence_stress` → `phono.b1.connected_speech` | 1 | Rhythm patterns drive linking and elision |

### Listening can-do chain (4 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `cando.a1.understand_instructions` → `cando.a2.understand_conversation` | 1 | Simple → conversational listening |
| `cando.a2.understand_conversation` → `cando.b1.understand_monologue` | 1 | Two speakers → sustained single speaker |
| `cando.b1.understand_monologue` → `cando.b2.understand_discussion` | 1 | Familiar → academic context |
| `cando.b2.understand_discussion` → `cando.c1.understand_lecture` | 1 | Discussion → extended abstract monologue |

### Reading can-do chain (4 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `cando.a1.read_signs` → `cando.a2.read_personal_letter` | 1 | Phrases → connected short text |
| `cando.a2.read_personal_letter` → `cando.b1.understand_factual_text` | 1 | Personal → factual/informational |
| `cando.b1.understand_factual_text` → `cando.b2.understand_argument` | 1 | Factual → argumentative reasoning |
| `cando.b2.understand_argument` → `cando.c1.understand_abstract_text` | 1 | Argument → complex abstract inference |

### Writing can-do chain (4 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `cando.a1.write_simple_phrases` → `cando.a2.write_short_messages` | 1 | Phrases → connected short messages |
| `cando.a2.write_short_messages` → `cando.b1.write_connected_text` | 1 | Short messages → multi-paragraph text |
| `cando.b1.write_connected_text` → `cando.b2.describe_data` | 1 | Connected text → data description (Task 1) |
| `cando.b1.write_connected_text` → `cando.b2.write_essay` | 1 | Connected text → argumentative essay (Task 2) |

### Speaking can-do chain (4 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `cando.a1.introduce_self` → `cando.a2.describe_routine` | 1 | Self-intro → describing habits |
| `cando.a2.describe_routine` → `cando.b1.describe_routine` | 1 | Simple → detailed with reasons |
| `cando.b1.describe_routine` → `cando.b2.give_detailed_account` | 1 | Short answers → extended turn (Part 2) |
| `cando.b1.describe_routine` → `cando.b2.discuss_abstract` | 0.7 | Conversational fluency supports, but abstract discussion also needs new skills |

### Cross-type: grammar → can-do (8 edges)

These edges model the reality that language skills depend on grammar knowledge. Strengths are lower (0.3-0.7) because grammar helps but rarely fully blocks a communicative skill.

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `gram.a1.present_simple` → `cando.a2.describe_routine` | 0.7 | Routines need present simple: "I wake up, I go..." |
| `gram.a2.past_simple` → `cando.b1.describe_routine` | 0.5 | Past events in routine narration |
| `gram.b1.present_perfect` → `cando.b2.give_detailed_account` | 0.5 | Experience narration: "I have visited..." |
| `gram.b1.present_perfect` → `cando.b2.write_essay` | 0.3 | Academic writing uses present perfect for evidence |
| `gram.b2.passive` → `cando.b2.describe_data` | 0.3 | Data description: "was produced", "are shown" |
| `gram.b2.passive` → `cando.b2.write_essay` | 0.3 | Formal register in academic essays |
| `gram.b2.conditionals` → `cando.b2.discuss_abstract` | 0.3 | Hypothetical reasoning: "if this happened..." |
| `gram.b2.reported_speech` → `cando.b2.discuss_abstract` | 0.3 | Reporting and evaluating others' views |

### Cross-type: phonology → can-do (2 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `phono.a1.word_stress` → `cando.a2.describe_routine` | 0.3 | Intelligibility for basic speaking |
| `phono.b1.connected_speech` → `cando.b2.give_detailed_account` | 0.3 | Fluency in the 2-minute long turn |

### Cross-type: lexical → can-do (3 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `lex.b1.work_education` → `cando.b1.describe_routine` | 0.3 | Work/study vocabulary for daily life description |
| `lex.b2.abstract_concepts` → `cando.b2.discuss_abstract` | 0.5 | Abstract discussion needs abstract vocabulary |
| `lex.b2.abstract_concepts` → `cando.b2.write_essay` | 0.3 | Essay writing needs topic vocabulary |

### Strategy prerequisites (2 edges)

| From → To | Strength | Rationale |
|-----------|----------|-----------|
| `strat.ielts.time_management` → `strat.ielts.task1_structure` | 0.3 | Pacing supports task completion |
| `strat.ielts.time_management` → `strat.ielts.task2_structure` | 0.3 | Pacing supports task completion |

### Edge summary

| Category | Count | Typical strength |
|----------|-------|-----------------|
| Grammar progression | 13 | 0.7–1.0 |
| Lexical progression | 3 | 0.5 |
| Phonology progression | 2 | 1.0 |
| Listening chain | 4 | 1.0 |
| Reading chain | 4 | 1.0 |
| Writing chain | 4 | 1.0 |
| Speaking chain | 4 | 1.0 |
| Cross-type: grammar → cando | 8 | 0.3–0.7 |
| Cross-type: phono → cando | 2 | 0.3 |
| Cross-type: lex → cando | 3 | 0.3–0.5 |
| Strategy prerequisites | 2 | 0.3 |
| **Total** | **49** | |

### Root nodes (no prerequisites, available to brand-new learners)

9 nodes have no incoming edges — these are what the sequencer offers a brand-new learner:

- `gram.a1.be_present`
- `gram.a2.comparatives` (independent A2 grammar)
- `cando.a1.understand_instructions`
- `cando.a1.read_signs`
- `cando.a1.write_simple_phrases`
- `cando.a1.introduce_self`
- `lex.a1.everyday_objects`
- `phono.a1.word_stress`
- `strat.ielts.time_management`

---

## Validation Guarantees

The graph must pass `validateGraph()` before it can be seeded:

1. **No cycles** — every path terminates. The grammar subgraph is a DAG, can-do chains are linear, cross-type edges only go grammar/phono/lex → cando (never back), strategy edges are self-contained.

2. **No missing nodes** — every edge endpoint exists in the node list. All 17 IELTS exam nodeIds are present.

3. **No level inversions** — every edge has `from.level ≤ to.level`. The lowest cross-type edge is `gram.a1.present_simple` (A1) → `cando.a2.describe_routine` (A2). Same-level edges (e.g. `gram.b2.passive` → `cando.b2.describe_data`) are allowed and correct.

---

## Consumer Impact

### Placement (`populateMastery`)

With nodes at A1, A2, B1, B2, and C1 across all four skills, placement can now estimate level per skill with real data. Previously only reading and speaking had can-do nodes; now listening and writing do too.

### Sequencer (`selectNext`, `estimateLevels`)

- 9 root nodes means a brand-new learner gets a diverse first session (grammar, vocab, phono, can-do, strategy) rather than being stuck on a single chain.
- Level estimation works per skill because every skill has nodes at multiple levels.
- The interleaving algorithm in `selectNext` benefits from all 5 node types being present.

### Mock test (`ielts-academic.ts`)

All 17 nodeIds now resolve to real graph nodes. The diagnosis engine can attribute performance to actual nodes, rank weaknesses, classify root causes, and generate remediation steps that reference real prerequisites.

### Diagnosis

Cross-type edges enable the action plan to recommend grammar study when a writing can-do is weak — the prerequisite graph tells the plan generator that improving `gram.b2.passive` would help with `cando.b2.describe_data`. Without cross-type edges, the plan would only ever recommend "practise more data description", missing the root cause.

---

## Files Changed

| File | Change |
|------|--------|
| `src/seed/seed-data.ts` | Replace node and edge arrays with 45 nodes + 49 edges |
| `src/mock-test/exams/ielts-academic.ts` | Fix 6 `strategy.ielts.*` → `strat.ielts.*` |
| `tests/seed/seed.test.ts` | Update node/edge count expectations |

No other files need changes. Diagnosis tests, session tests, and mock-test type tests use independent inline fixtures.
