// # ═══════════════════════════════════════════════════════════════════════════
// # Reference Content Types — shared by vocabulary, grammar, and phrasal verbs
// # ═══════════════════════════════════════════════════════════════════════════

// # Vocabulary entry — a single word with full details.
export interface VocabEntry {
  word: string
  wordClass: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction'
  // # For verbs: three principal parts (base, past, past participle).
  verbForms?: { v1: string; v2: string; v3: string }
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  meaning: string
  context: string
  example: string
  explanation: string
}

// # A field/area of life that contains vocabulary entries.
export interface VocabField {
  id: string
  name: string
  description: string
  icon: string           // # emoji for the dropdown
  entries: VocabEntry[]
}

// # Grammar pattern — a single grammar rule with full details.
export interface GrammarPattern {
  id: string
  name: string
  category: string       // # 'tenses' | 'conditionals' | 'modals' | etc.
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  structure: string      // # e.g. "Subject + am/is/are + verb-ing"
  meaning: string
  context: string
  example: string
  explanation: string
  // # Additional examples for clarity.
  moreExamples?: string[]
  // # Common mistakes learners make with this pattern.
  commonMistakes?: string[]
}

// # A grammar category grouping related patterns.
export interface GrammarCategory {
  id: string
  name: string
  description: string
  patterns: GrammarPattern[]
}

// # Phrasal verb entry — a single phrasal verb with full details.
export interface PhrasalVerbEntry {
  phrasalVerb: string
  meaning: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  context: string
  example: string
  explanation: string
  // # Whether the verb is separable (you can put the object between).
  separable: boolean
  // # Formal single-word synonym, if applicable.
  formalEquivalent?: string
}

// # A field/profession that contains phrasal verb entries.
export interface PhrasalVerbField {
  id: string
  name: string
  description: string
  icon: string
  entries: PhrasalVerbEntry[]
}
