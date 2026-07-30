# Skill Graph Seed Data — IELTS-Complete Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 13-node test fixture with a 45-node, 49-edge CEFR-aligned skill graph so the IELTS Academic mock test works end-to-end (placement → sequencer → mock test → diagnosis → action plan).

**Architecture:** The seed data lives in `src/seed/seed-data.ts` as two exported arrays (`SEED_NODES`, `SEED_EDGES`). The `seedGraph()` function in `src/seed/run-seed.ts` validates then upserts them — no changes to the seeder itself. The IELTS exam definition in `src/mock-test/exams/ielts-academic.ts` has a prefix mismatch (`strategy.ielts.*` instead of `strat.ielts.*`) that must be fixed so its nodeIds match the graph.

**Tech Stack:** TypeScript, Vitest, Drizzle ORM, libSQL (in-memory for tests)

## Global Constraints

- Node IDs follow `{type_prefix}.{level_or_exam}.{topic}` — see spec §ID Convention
- All code must be heavily commented with `//` throughout for learning
- Graph must pass `validateGraph()` before seeding: no cycles, no missing nodes, no level inversions
- Never promise a score (FTC compliance — spec §4e)

---

### Task 1: Fix IELTS exam definition prefix

The IELTS exam definition uses `strategy.ielts.*` for strategy node IDs, but the project convention is `strat.ielts.*`. Fix the 5 occurrences so the exam's nodeIds match the seed graph.

**Files:**
- Modify: `src/mock-test/exams/ielts-academic.ts:184,192,215,224,232`
- Test: `tests/mock-test/exams/ielts-academic.test.ts` (existing, no changes needed)

**Interfaces:**
- Consumes: nothing
- Produces: IELTS exam definition with `strat.ielts.*` nodeIds that Task 2's seed data will contain

- [ ] **Step 1: Change the 5 strategy nodeId prefixes**

In `src/mock-test/exams/ielts-academic.ts`, replace every `strategy.ielts.` with `strat.ielts.`. There are exactly 5 occurrences across the Writing and Speaking section slot definitions:

```typescript
// Line 184 — Writing Task 1 slot:
nodeIds: ['cando.b2.describe_data', 'strat.ielts.task1_structure'],

// Line 192 — Writing Task 2 slot:
nodeIds: ['cando.b2.write_essay', 'strat.ielts.task2_structure'],

// Line 215 — Speaking Part 1 slot:
nodeIds: ['cando.b1.describe_routine', 'strat.ielts.part1_answers'],

// Line 224 — Speaking Part 2 slot:
nodeIds: ['cando.b2.give_detailed_account', 'strat.ielts.part2_structure'],

// Line 232 — Speaking Part 3 slot:
nodeIds: ['cando.b2.discuss_abstract', 'strat.ielts.part3_extend'],
```

- [ ] **Step 2: Run IELTS exam tests to verify nothing breaks**

Run: `npx vitest run tests/mock-test/exams/ielts-academic.test.ts`
Expected: All 12 tests pass. The tests check structural properties (section count, durations, slot counts) — none reference the string `strategy.ielts.*` directly.

- [ ] **Step 3: Commit**

```bash
git add src/mock-test/exams/ielts-academic.ts
git commit -m "fix: rename strategy.ielts.* nodeIds to strat.ielts.* for ID convention"
```

---

### Task 2: Replace seed data with IELTS-complete graph

Replace the 13-node test fixture in `src/seed/seed-data.ts` with the full 45-node, 49-edge CEFR-aligned graph from the spec. Every node referenced by the IELTS exam definition must be present. All existing seed tests continue to pass because they use `SEED_NODES.length` / `SEED_EDGES.length`, not hard-coded counts.

**Files:**
- Modify: `src/seed/seed-data.ts` (full rewrite)
- Test: `tests/seed/seed.test.ts` (existing tests must pass, no modifications in this task)

**Interfaces:**
- Consumes: `SkillNode` and `SkillEdge` types from `@/skill-graph/types`
- Produces: `SEED_NODES: SkillNode[]` (45 nodes), `SEED_EDGES: SkillEdge[]` (49 edges) — consumed by `seedGraph()` and by Task 3's new tests

- [ ] **Step 1: Replace the seed data file**

Rewrite `src/seed/seed-data.ts` with the complete IELTS-complete graph. The file uses the same `n()` helper as before, plus a new `nd()` helper that accepts a description.

```typescript
import type { SkillEdge, SkillNode } from '@/skill-graph/types'

/**
 * The IELTS-complete skill graph.
 *
 * 45 nodes and 49 edges covering every nodeId referenced by the IELTS
 * Academic exam definition, plus prerequisite chains from A1 so the
 * sequencer can walk a learner up from beginner. Cross-type edges
 * (grammar → can-do, phono → can-do, lex → can-do) let the diagnosis
 * engine trace gaps to root grammar/vocab causes.
 *
 * This is NOT the full CEFR inventory — that will grow as the content
 * pipeline generates items in R1b. This graph is the minimum needed
 * for placement, sequencer, mock test, and diagnosis to work end-to-end.
 */

// Helper: create a node with no description (used for well-known structures
// whose title is self-explanatory).
function n(
  id: string,
  type: SkillNode['type'],
  level: SkillNode['level'],
  skill: SkillNode['skill'],
  title: string,
): SkillNode {
  return { id, type, level, skill, title, description: '', metadata: null }
}

// Helper: create a node with a description. Used for can-do statements and
// strategy nodes where the title alone does not convey what is being assessed.
function nd(
  id: string,
  type: SkillNode['type'],
  level: SkillNode['level'],
  skill: SkillNode['skill'],
  title: string,
  description: string,
): SkillNode {
  return { id, type, level, skill, title, description, metadata: null }
}

// ---------------------------------------------------------------------------
// Nodes (45 total)
// ---------------------------------------------------------------------------

export const SEED_NODES: SkillNode[] = [
  // ── Grammar — general skill (12 nodes) ──────────────────────────────
  // A chain from A1 through B2 that the sequencer can walk. These are the
  // structures most frequently tested across IELTS sections.
  n('gram.a1.be_present', 'grammar', 'A1', 'general', 'Present simple: be'),
  n('gram.a1.present_simple', 'grammar', 'A1', 'general', 'Present simple: other verbs'),
  n('gram.a1.can_cant', 'grammar', 'A1', 'general', 'Can / can\'t'),
  n('gram.a2.past_simple', 'grammar', 'A2', 'general', 'Past simple'),
  n('gram.a2.future_going_to', 'grammar', 'A2', 'general', 'Future: going to'),
  n('gram.a2.comparatives', 'grammar', 'A2', 'general', 'Comparatives and superlatives'),
  n('gram.b1.present_perfect', 'grammar', 'B1', 'general', 'Present perfect'),
  n('gram.b1.pp_vs_past_simple', 'grammar', 'B1', 'general', 'Present perfect vs past simple'),
  n('gram.b1.modals', 'grammar', 'B1', 'general', 'Modals: must, should, might'),
  n('gram.b2.conditionals', 'grammar', 'B2', 'general', 'Conditionals: second and third'),
  n('gram.b2.passive', 'grammar', 'B2', 'general', 'Passive voice'),
  n('gram.b2.reported_speech', 'grammar', 'B2', 'general', 'Reported speech'),

  // ── Listening can-do — listening skill (5 nodes) ────────────────────
  // One per IELTS Listening part, plus an A1 foundation node.
  nd('cando.a1.understand_instructions', 'cando', 'A1', 'listening',
    'Can follow simple instructions',
    'Short, clear directions spoken slowly'),
  nd('cando.a2.understand_conversation', 'cando', 'A2', 'listening',
    'Can understand a simple conversation',
    'Two speakers on everyday topics — IELTS Listening Part 1'),
  nd('cando.b1.understand_monologue', 'cando', 'B1', 'listening',
    'Can understand a monologue on a familiar topic',
    'One speaker giving information — IELTS Listening Part 2'),
  nd('cando.b2.understand_discussion', 'cando', 'B2', 'listening',
    'Can understand a discussion between multiple speakers',
    'Academic or training context — IELTS Listening Part 3'),
  nd('cando.c1.understand_lecture', 'cando', 'C1', 'listening',
    'Can understand an academic lecture',
    'Extended monologue on abstract or complex topic — IELTS Listening Part 4'),

  // ── Reading can-do — reading skill (5 nodes) ────────────────────────
  // One per IELTS Reading passage, plus A1 and A2 foundations.
  nd('cando.a1.read_signs', 'cando', 'A1', 'reading',
    'Can understand short simple signs and notices',
    'Public signs, menus, timetables'),
  nd('cando.a2.read_personal_letter', 'cando', 'A2', 'reading',
    'Can understand short personal letters',
    'Simple narrative or description from a known person'),
  nd('cando.b1.understand_factual_text', 'cando', 'B1', 'reading',
    'Can understand straightforward factual text',
    'News, instructions, factual prose — IELTS Reading Passage 1'),
  nd('cando.b2.understand_argument', 'cando', 'B2', 'reading',
    'Can understand an argument\'s line of reasoning',
    'Opinion pieces, academic argument — IELTS Reading Passage 2'),
  nd('cando.c1.understand_abstract_text', 'cando', 'C1', 'reading',
    'Can understand complex abstract text',
    'Academic or specialised text requiring inference — IELTS Reading Passage 3'),

  // ── Writing can-do — writing skill (5 nodes) ────────────────────────
  // IELTS Writing Tasks 1 and 2 at B2, plus A1–B1 foundations.
  nd('cando.a1.write_simple_phrases', 'cando', 'A1', 'writing',
    'Can write simple phrases about themselves',
    'Name, nationality, address — form-filling level'),
  nd('cando.a2.write_short_messages', 'cando', 'A2', 'writing',
    'Can write short simple messages',
    'Notes, short emails, postcards'),
  nd('cando.b1.write_connected_text', 'cando', 'B1', 'writing',
    'Can write connected text on familiar topics',
    'Linked paragraphs, simple essays, letters'),
  nd('cando.b2.describe_data', 'cando', 'B2', 'writing',
    'Can describe data in a chart or graph',
    'Select, compare, summarise trends — IELTS Writing Task 1'),
  nd('cando.b2.write_essay', 'cando', 'B2', 'writing',
    'Can write a structured argumentative essay',
    'Clear position, developed argument, conclusion — IELTS Writing Task 2'),

  // ── Speaking can-do — speaking skill (5 nodes) ──────────────────────
  // IELTS Speaking Parts 1–3 at B1–B2, plus A1–A2 foundations.
  nd('cando.a1.introduce_self', 'cando', 'A1', 'speaking',
    'Can introduce themselves and others',
    'Name, where from, what they do'),
  nd('cando.a2.describe_routine', 'cando', 'A2', 'speaking',
    'Can describe daily routine in simple terms',
    'Short sentences, basic connectors'),
  nd('cando.b1.describe_routine', 'cando', 'B1', 'speaking',
    'Can describe experiences and routines with reasons',
    'Connected speech, some detail — IELTS Speaking Part 1'),
  nd('cando.b2.give_detailed_account', 'cando', 'B2', 'speaking',
    'Can give a detailed account of a topic',
    'Extended turn, narrative structure — IELTS Speaking Part 2'),
  nd('cando.b2.discuss_abstract', 'cando', 'B2', 'speaking',
    'Can discuss abstract or hypothetical topics',
    'Speculate, evaluate, compare viewpoints — IELTS Speaking Part 3'),

  // ── Lexical — general skill (4 nodes) ───────────────────────────────
  // Vocabulary bands from concrete (A1) to abstract (B2).
  n('lex.a1.everyday_objects', 'lexical', 'A1', 'general', 'Everyday objects'),
  n('lex.a2.travel', 'lexical', 'A2', 'general', 'Travel and transport'),
  n('lex.b1.work_education', 'lexical', 'B1', 'general', 'Work and education'),
  n('lex.b2.abstract_concepts', 'lexical', 'B2', 'general', 'Abstract concepts'),

  // ── Phonology — speaking skill (3 nodes) ────────────────────────────
  // Prosodic features that affect IELTS Speaking pronunciation scores.
  nd('phono.a1.word_stress', 'phono', 'A1', 'speaking',
    'Word stress in common words',
    'Which syllable carries the stress'),
  nd('phono.a2.sentence_stress', 'phono', 'A2', 'speaking',
    'Sentence stress and rhythm',
    'Content vs function words, natural rhythm'),
  nd('phono.b1.connected_speech', 'phono', 'B1', 'speaking',
    'Connected speech features',
    'Linking, elision, assimilation in natural flow'),

  // ── IELTS Strategy — various skills (6 nodes) ──────────────────────
  // Exam techniques orthogonal to language level. No CEFR prerequisites —
  // strategy nodes are gated only by other strategy nodes (time management).
  nd('strat.ielts.time_management', 'strategy', 'B1', 'general',
    'IELTS time management',
    'Pacing across sections, when to move on'),
  nd('strat.ielts.task1_structure', 'strategy', 'B1', 'writing',
    'IELTS Writing Task 1: report structure',
    'Overview → body paragraphs → key features'),
  nd('strat.ielts.task2_structure', 'strategy', 'B1', 'writing',
    'IELTS Writing Task 2: essay structure',
    'Introduction → body → conclusion, thesis statement'),
  nd('strat.ielts.part1_answers', 'strategy', 'B1', 'speaking',
    'IELTS Speaking Part 1: short answers',
    'Extend beyond yes/no, give reasons, 2-3 sentences'),
  nd('strat.ielts.part2_structure', 'strategy', 'B1', 'speaking',
    'IELTS Speaking Part 2: long turn',
    'Follow cue card, use 1 min prep, speak for 2 min'),
  nd('strat.ielts.part3_extend', 'strategy', 'B2', 'speaking',
    'IELTS Speaking Part 3: extending answers',
    'Speculate, exemplify, compare, evaluate'),
]

// ---------------------------------------------------------------------------
// Edges (49 total)
// ---------------------------------------------------------------------------

export const SEED_EDGES: SkillEdge[] = [
  // ── Grammar progression (13 edges) ──────────────────────────────────
  // Strength 1 = fully blocking: you genuinely cannot do the later one
  // without the earlier. Lower strengths mean "helps but does not block".

  // A1 be → present simple and can/can't.
  { fromNodeId: 'gram.a1.be_present', toNodeId: 'gram.a1.present_simple', strength: 1 },
  { fromNodeId: 'gram.a1.be_present', toNodeId: 'gram.a1.can_cant', strength: 1 },

  // A1 present simple → A2 past simple and future.
  { fromNodeId: 'gram.a1.present_simple', toNodeId: 'gram.a2.past_simple', strength: 1 },
  { fromNodeId: 'gram.a1.present_simple', toNodeId: 'gram.a2.future_going_to', strength: 1 },

  // A2 past simple → B1 present perfect.
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b1.present_perfect', strength: 1 },

  // The contrast node needs both forms it contrasts — a diamond, not a cycle.
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'gram.b1.pp_vs_past_simple', strength: 1 },
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b1.pp_vs_past_simple', strength: 1 },

  // can/can't → modals (the entry point to the full modal system).
  { fromNodeId: 'gram.a1.can_cant', toNodeId: 'gram.b1.modals', strength: 1 },

  // Past form + modals → conditionals (2nd conditional uses past; would/could
  // in consequence clauses).
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b2.conditionals', strength: 1 },
  { fromNodeId: 'gram.b1.modals', toNodeId: 'gram.b2.conditionals', strength: 0.7 },

  // Present perfect → passive (auxiliary verb pattern: have done → be done).
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'gram.b2.passive', strength: 1 },

  // Past simple + present perfect → reported speech (tense backshift).
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b2.reported_speech', strength: 1 },
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'gram.b2.reported_speech', strength: 0.7 },

  // gram.a2.comparatives is a root node — no prerequisites.

  // ── Lexical progression (3 edges) ───────────────────────────────────
  // Weak edges (0.5): vocabulary domains help but don't block each other.
  { fromNodeId: 'lex.a1.everyday_objects', toNodeId: 'lex.a2.travel', strength: 0.5 },
  { fromNodeId: 'lex.a2.travel', toNodeId: 'lex.b1.work_education', strength: 0.5 },
  { fromNodeId: 'lex.b1.work_education', toNodeId: 'lex.b2.abstract_concepts', strength: 0.5 },

  // ── Phonology progression (2 edges) ─────────────────────────────────
  // Fully blocking: sentence stress requires word stress; connected speech
  // requires sentence-level rhythm.
  { fromNodeId: 'phono.a1.word_stress', toNodeId: 'phono.a2.sentence_stress', strength: 1 },
  { fromNodeId: 'phono.a2.sentence_stress', toNodeId: 'phono.b1.connected_speech', strength: 1 },

  // ── Listening can-do chain (4 edges) ────────────────────────────────
  // Linear chain matching IELTS Listening parts 1–4 difficulty.
  { fromNodeId: 'cando.a1.understand_instructions', toNodeId: 'cando.a2.understand_conversation', strength: 1 },
  { fromNodeId: 'cando.a2.understand_conversation', toNodeId: 'cando.b1.understand_monologue', strength: 1 },
  { fromNodeId: 'cando.b1.understand_monologue', toNodeId: 'cando.b2.understand_discussion', strength: 1 },
  { fromNodeId: 'cando.b2.understand_discussion', toNodeId: 'cando.c1.understand_lecture', strength: 1 },

  // ── Reading can-do chain (4 edges) ──────────────────────────────────
  // Linear chain matching IELTS Reading passage 1–3 difficulty.
  { fromNodeId: 'cando.a1.read_signs', toNodeId: 'cando.a2.read_personal_letter', strength: 1 },
  { fromNodeId: 'cando.a2.read_personal_letter', toNodeId: 'cando.b1.understand_factual_text', strength: 1 },
  { fromNodeId: 'cando.b1.understand_factual_text', toNodeId: 'cando.b2.understand_argument', strength: 1 },
  { fromNodeId: 'cando.b2.understand_argument', toNodeId: 'cando.c1.understand_abstract_text', strength: 1 },

  // ── Writing can-do chain (4 edges) ──────────────────────────────────
  // B1 connected text fans out to B2 describe_data (Task 1) and write_essay
  // (Task 2) — a diamond, not a linear chain.
  { fromNodeId: 'cando.a1.write_simple_phrases', toNodeId: 'cando.a2.write_short_messages', strength: 1 },
  { fromNodeId: 'cando.a2.write_short_messages', toNodeId: 'cando.b1.write_connected_text', strength: 1 },
  { fromNodeId: 'cando.b1.write_connected_text', toNodeId: 'cando.b2.describe_data', strength: 1 },
  { fromNodeId: 'cando.b1.write_connected_text', toNodeId: 'cando.b2.write_essay', strength: 1 },

  // ── Speaking can-do chain (4 edges) ─────────────────────────────────
  // A2 describe_routine → B1 describe_routine (simple → detailed). B1 fans
  // out to B2 give_detailed_account (Part 2) and discuss_abstract (Part 3).
  { fromNodeId: 'cando.a1.introduce_self', toNodeId: 'cando.a2.describe_routine', strength: 1 },
  { fromNodeId: 'cando.a2.describe_routine', toNodeId: 'cando.b1.describe_routine', strength: 1 },
  { fromNodeId: 'cando.b1.describe_routine', toNodeId: 'cando.b2.give_detailed_account', strength: 1 },
  { fromNodeId: 'cando.b1.describe_routine', toNodeId: 'cando.b2.discuss_abstract', strength: 0.7 },

  // ── Cross-type: grammar → can-do (8 edges) ─────────────────────────
  // Grammar knowledge supports communicative skills. Lower strengths (0.3–0.7)
  // because grammar helps but rarely fully blocks a communicative skill.
  { fromNodeId: 'gram.a1.present_simple', toNodeId: 'cando.a2.describe_routine', strength: 0.7 },
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'cando.b1.describe_routine', strength: 0.5 },
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'cando.b2.give_detailed_account', strength: 0.5 },
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'cando.b2.write_essay', strength: 0.3 },
  { fromNodeId: 'gram.b2.passive', toNodeId: 'cando.b2.describe_data', strength: 0.3 },
  { fromNodeId: 'gram.b2.passive', toNodeId: 'cando.b2.write_essay', strength: 0.3 },
  { fromNodeId: 'gram.b2.conditionals', toNodeId: 'cando.b2.discuss_abstract', strength: 0.3 },
  { fromNodeId: 'gram.b2.reported_speech', toNodeId: 'cando.b2.discuss_abstract', strength: 0.3 },

  // ── Cross-type: phonology → can-do (2 edges) ───────────────────────
  // Pronunciation supports speaking intelligibility and fluency.
  { fromNodeId: 'phono.a1.word_stress', toNodeId: 'cando.a2.describe_routine', strength: 0.3 },
  { fromNodeId: 'phono.b1.connected_speech', toNodeId: 'cando.b2.give_detailed_account', strength: 0.3 },

  // ── Cross-type: lexical → can-do (3 edges) ─────────────────────────
  // Vocabulary range supports topic-specific communication.
  { fromNodeId: 'lex.b1.work_education', toNodeId: 'cando.b1.describe_routine', strength: 0.3 },
  { fromNodeId: 'lex.b2.abstract_concepts', toNodeId: 'cando.b2.discuss_abstract', strength: 0.5 },
  { fromNodeId: 'lex.b2.abstract_concepts', toNodeId: 'cando.b2.write_essay', strength: 0.3 },

  // ── Strategy prerequisites (2 edges) ────────────────────────────────
  // Time management supports task completion in timed writing sections.
  { fromNodeId: 'strat.ielts.time_management', toNodeId: 'strat.ielts.task1_structure', strength: 0.3 },
  { fromNodeId: 'strat.ielts.time_management', toNodeId: 'strat.ielts.task2_structure', strength: 0.3 },
]
```

- [ ] **Step 2: Run existing seed tests**

Run: `npx vitest run tests/seed/seed.test.ts`
Expected: All 7 tests pass. The existing tests use `SEED_NODES.length` and `SEED_EDGES.length`, so they adapt to the new counts automatically. The validation test catches any cycle, missing node, or level inversion in the new data.

- [ ] **Step 3: Run the full test suite**

Run: `npx vitest run`
Expected: All tests pass. No other files were modified, so only the seed tests exercise the new data.

- [ ] **Step 4: Commit**

```bash
git add src/seed/seed-data.ts
git commit -m "feat: expand seed graph to 45 nodes / 49 edges for IELTS-complete coverage"
```

---

### Task 3: Add IELTS integration tests to seed test suite

Add tests that verify the seed graph satisfies every IELTS exam requirement: all exam nodeIds exist, every skill has nodes at multiple levels, level estimation works per skill, and a learner can progress through the full A1→C1 chain.

**Files:**
- Modify: `tests/seed/seed.test.ts`
- Test: self (new tests within the existing file)

**Interfaces:**
- Consumes: `SEED_NODES`, `SEED_EDGES` from `@/seed/seed-data` (Task 2), `IELTS_ACADEMIC` from `@/mock-test/exams/ielts-academic` (Task 1), `validateGraph` from `@/skill-graph/validation`, `selectNext` from `@/sequencer/select`, `estimateLevels` from `@/sequencer/level`, `populateMastery` from `@/placement/populate`
- Produces: test coverage guaranteeing the seed graph works with every consumer

- [ ] **Step 1: Add new imports at the top of `tests/seed/seed.test.ts`**

Add these imports alongside the existing ones:

```typescript
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import { populateMastery } from '@/placement/populate'
import type { PlacementResult } from '@/placement/types'
import { SKILL_AREAS } from '@/skill-graph/types'
```

- [ ] **Step 2: Add exact-count tests to the 'seed data integrity' describe block**

Add these tests after the existing "covers every node type" test:

```typescript
  // Exact counts from the spec — catches accidental additions or deletions.
  it('has exactly 45 nodes', () => {
    expect(SEED_NODES).toHaveLength(45)
  })

  it('has exactly 49 edges', () => {
    expect(SEED_EDGES).toHaveLength(49)
  })

  // Every skill area that has content must appear in the graph.
  it('covers every skill area', () => {
    const skills = new Set(SEED_NODES.map((n) => n.skill))
    for (const area of SKILL_AREAS) {
      expect(skills.has(area), `missing skill area: ${area}`).toBe(true)
    }
  })

  // The graph must have nodes at multiple CEFR levels to support
  // level estimation and placement.
  it('covers at least 5 CEFR levels', () => {
    const levels = new Set(SEED_NODES.map((n) => n.level))
    expect(levels.size).toBeGreaterThanOrEqual(5)
  })
```

- [ ] **Step 3: Add IELTS exam coverage test**

Add a new describe block after the 'seed data integrity' block:

```typescript
describe('IELTS exam coverage', () => {
  // Every nodeId referenced by the IELTS exam definition must exist in
  // the seed graph. A missing node means the diagnosis engine would try
  // to attribute performance to a non-existent graph node.
  it('contains every node referenced by IELTS Academic', () => {
    const seedIds = new Set(SEED_NODES.map((n) => n.id))

    for (const section of IELTS_ACADEMIC.sections) {
      for (const slot of section.slots) {
        for (const nodeId of slot.nodeIds) {
          expect(
            seedIds.has(nodeId),
            `IELTS ${section.id}/${slot.id} references "${nodeId}" which is not in SEED_NODES`,
          ).toBe(true)
        }
      }
    }
  })

  // Strategy nodes must use the strat.ielts.* prefix, not strategy.ielts.*.
  it('IELTS strategy nodeIds use the strat.ielts.* prefix', () => {
    for (const section of IELTS_ACADEMIC.sections) {
      for (const slot of section.slots) {
        for (const nodeId of slot.nodeIds) {
          expect(nodeId).not.toMatch(/^strategy\./)
        }
      }
    }
  })
})
```

- [ ] **Step 4: Add placement integration test**

Add this test inside the existing 'end to end on the seeded graph' describe block, after the "places a brand-new learner at preA1 in every skill" test:

```typescript
  // After placement at B1, the level estimate should reflect the
  // placement result — not stay at preA1 forever.
  it('placement at B1 produces per-skill level estimates', async () => {
    const nodes = await listNodes(db)

    // Simulate a placement result at B1.
    const placementResult: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        A1: { correct: 5, total: 5 },
        A2: { correct: 4, total: 5 },
        B1: { correct: 3, total: 5 },
        B2: { correct: 1, total: 5 },
      },
      itemsUsed: 20,
      answeredItemIds: [],
    }

    const mastery = populateMastery(placementResult, nodes, NOW)

    // With B1 placement, levels should be above preA1 for skills that
    // have nodes at A1/A2/B1.
    const levels = estimateLevels(nodes, mastery, NOW)
    expect(levels.length).toBeGreaterThan(0)

    // Every IELTS skill (listening, reading, writing, speaking) should
    // have an estimate.
    const skillSet = new Set(levels.map((l) => l.skill))
    expect(skillSet.has('listening')).toBe(true)
    expect(skillSet.has('reading')).toBe(true)
    expect(skillSet.has('writing')).toBe(true)
    expect(skillSet.has('speaking')).toBe(true)
  })
```

- [ ] **Step 5: Add root node diversity test**

Add this test inside the 'end to end on the seeded graph' describe block, after the existing "gives a brand-new learner something to do" test:

```typescript
  // A brand-new learner should see multiple node types, not just grammar.
  // This validates that the root nodes are diverse enough for a good
  // first session.
  it('gives a brand-new learner diverse node types', async () => {
    const nodes = await listNodes(db)
    const edges = await listEdges(db)

    const next = selectNext({ nodes, edges, mastery: [], now: NOW, limit: 20 })
    const types = new Set(next.map((c) => c.node.type))

    // Should include at least 3 different types (grammar, cando, lexical,
    // phono, or strategy).
    expect(types.size).toBeGreaterThanOrEqual(3)
  })
```

- [ ] **Step 6: Run all seed tests**

Run: `npx vitest run tests/seed/seed.test.ts`
Expected: All tests pass (7 existing + 8 new = 15 total).

- [ ] **Step 7: Run the full test suite**

Run: `npx vitest run`
Expected: All tests pass with zero regressions.

- [ ] **Step 8: Commit**

```bash
git add tests/seed/seed.test.ts
git commit -m "test: add IELTS coverage and placement integration tests for seed graph"
```
