import type { SkillEdge, SkillNode } from '@/skill-graph/types'

/**
 * A small, correct starter graph.
 *
 * This is not the CEFR inventory — that is thousands of nodes generated and
 * quality-gated by the content pipeline in R1b. This slice exists so every
 * code path can be exercised end to end: multiple node types, multiple
 * skills, single and multiple prerequisites, strong and weak edges, and a
 * chain deep enough for level estimation to climb.
 */

function n(
  id: string,
  type: SkillNode['type'],
  level: SkillNode['level'],
  skill: SkillNode['skill'],
  title: string,
): SkillNode {
  return { id, type, level, skill, title, description: '', metadata: null }
}

export const SEED_NODES: SkillNode[] = [
  // Grammar spine: a chain from A1 through B1 that the sequencer can walk.
  n('gram.a1.be_present', 'grammar', 'A1', 'general', 'Present simple: be'),
  n('gram.a1.present_simple', 'grammar', 'A1', 'general', 'Present simple: other verbs'),
  n('gram.a2.past_simple', 'grammar', 'A2', 'general', 'Past simple'),
  n('gram.b1.present_perfect', 'grammar', 'B1', 'general', 'Present perfect'),
  // The confusable-pair node — teaching the contrast, not either form alone.
  n('gram.b1.pp_vs_past_simple', 'grammar', 'B1', 'general', 'Present perfect vs past simple'),

  // Vocabulary.
  n('lex.a1.everyday_objects', 'lexical', 'A1', 'general', 'Everyday objects'),
  n('lex.a2.travel', 'lexical', 'A2', 'general', 'Travel and transport'),

  // Can-do statements, tied to specific skills.
  n('cando.a1.read_signs', 'cando', 'A1', 'reading', 'Can understand short simple signs and notices'),
  n('cando.a2.read_personal_letter', 'cando', 'A2', 'reading', 'Can understand short personal letters'),
  n('cando.a1.introduce_self', 'cando', 'A1', 'speaking', 'Can introduce themselves and others'),
  n('cando.a2.describe_routine', 'cando', 'A2', 'speaking', 'Can describe daily routine in simple terms'),

  // Pronunciation.
  n('phono.a1.word_stress', 'phono', 'A1', 'speaking', 'Word stress in common two-syllable words'),

  // Exam technique — no prerequisites, since it is orthogonal to language level.
  n('strat.ielts.task2_structure', 'strategy', 'B1', 'writing', 'IELTS Writing Task 2: essay structure'),
]

export const SEED_EDGES: SkillEdge[] = [
  // Grammar chain. All strength 1 — you genuinely cannot do the later one
  // without the earlier.
  { fromNodeId: 'gram.a1.be_present', toNodeId: 'gram.a1.present_simple', strength: 1 },
  { fromNodeId: 'gram.a1.present_simple', toNodeId: 'gram.a2.past_simple', strength: 1 },
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b1.present_perfect', strength: 1 },

  // The contrast node needs both forms it contrasts — a diamond, not a cycle.
  { fromNodeId: 'gram.b1.present_perfect', toNodeId: 'gram.b1.pp_vs_past_simple', strength: 1 },
  { fromNodeId: 'gram.a2.past_simple', toNodeId: 'gram.b1.pp_vs_past_simple', strength: 1 },

  // Weak edge: travel vocabulary is easier with everyday objects behind you,
  // but not blocked by it.
  { fromNodeId: 'lex.a1.everyday_objects', toNodeId: 'lex.a2.travel', strength: 0.5 },

  // Can-do progressions within a skill.
  { fromNodeId: 'cando.a1.read_signs', toNodeId: 'cando.a2.read_personal_letter', strength: 1 },
  { fromNodeId: 'cando.a1.introduce_self', toNodeId: 'cando.a2.describe_routine', strength: 1 },

  // Cross-type edges: describing a routine leans on present simple grammar
  // and, more loosely, on word stress being intelligible.
  { fromNodeId: 'gram.a1.present_simple', toNodeId: 'cando.a2.describe_routine', strength: 0.7 },
  { fromNodeId: 'phono.a1.word_stress', toNodeId: 'cando.a2.describe_routine', strength: 0.3 },
]
