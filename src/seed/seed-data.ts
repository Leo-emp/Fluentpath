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
