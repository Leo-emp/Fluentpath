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
  // # Additional example sentences for clarity (optional — same as grammar).
  moreExamples?: string[]
  // # Common mistakes learners make with this word (optional — same as grammar).
  commonMistakes?: string[]
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

// # ═══════════════════════════════════════════════════════════════════════════
// # Lesson Types — structured educational content for the lessons system
// # ═══════════════════════════════════════════════════════════════════════════

// # A single section within a lesson — different types control rendering.
// # 'text' = explanatory prose, 'rule' = highlighted grammar/rule box,
// # 'tip' = practical advice callout, 'example' = annotated example with
// # analysis, 'exercise' = interactive practice question with answer reveal.
export interface LessonSection {
  title: string
  type: 'text' | 'rule' | 'tip' | 'example' | 'exercise'
  // # Main prose content. Required for text/rule/tip/exercise sections.
  // # Optional for 'example' sections which use examples[] + analysis instead.
  content?: string
  // # For 'example' type — the example sentence(s) shown prominently.
  examples?: string[]
  // # For 'example' type — analysis/breakdown of each example.
  analysis?: string
  // # For 'exercise' type — question, answer, and explanation.
  question?: string
  answer?: string
  answerExplanation?: string
}

// # A full lesson with structured educational content.
export interface Lesson {
  id: string
  title: string
  description: string
  // # Skill area this lesson targets.
  skill: 'reading' | 'writing' | 'speaking' | 'listening' | 'grammar' | 'vocabulary' | 'pronunciation' | 'general'
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  // # Estimated time to complete in minutes.
  duration: number
  // # What the learner will achieve by the end.
  objectives: string[]
  // # Ordered sections that make up the lesson body.
  sections: LessonSection[]
  // # Key things to remember — shown as a summary at the bottom.
  keyTakeaways: string[]
  // # Common errors learners make with this topic.
  commonMistakes?: string[]
  // # IDs of related lessons for further study.
  relatedLessons?: string[]
}

// # A category grouping lessons by topic or skill area.
export interface LessonCategory {
  id: string
  name: string
  description: string
  icon: string
  lessons: Lesson[]
}
