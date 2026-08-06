import type { CefrLevel } from '@/skill-graph/types'

// # ─── ITEM TYPE CONSTANTS ───────────────────────────────────────────────
// # Every item type the platform supports. Used by seed runner, item-bank,
// # publish gates, and the UI to determine rendering and scoring.

export const ITEM_TYPES = [
  'mcq',              // # multiple-choice question (grammar, vocab, reading, listening)
  'gap_fill',         // # type-the-answer sentence completion (no options given)
  'reading_passage',  // # long text with multiple attached questions (TFNG, matching, etc.)
  'writing_task',     // # essay/letter/report prompt with rubric criteria
  'speaking_prompt',  // # speaking topic with follow-up questions
  'reorder',          // # PTE re-order paragraphs (drag sentences into correct order)
  'highlight_incorrect', // # PTE highlight incorrect words in a transcript
  'sentence_transform',  // # rewrite a sentence using a key word (Cambridge Use of English)
  'error_correction',    // # find and fix the error in a sentence
  'word_formation',      // # change the form of a word to fit a sentence gap
  'matching',            // # match items from column A to column B
  'dialogue_completion', // # complete a conversation exchange with missing lines
] as const

export type ItemType = (typeof ITEM_TYPES)[number]

// # ─── MCQ ──────────────────────────────────────────────────────────────

// # One option in a multiple-choice item.
// # Every wrong option MUST name the misconception it targets — this is what
// # separates a diagnostic distractor from filler.
export interface McqOption {
  text: string
  // # Null only for the correct answer. For wrong answers: "uses past simple
  // # with an unfinished time reference", never just "wrong tense".
  misconception: string | null
}

export interface McqItem {
  id: string
  type: 'mcq'
  // # The question, with a blank written as `______` where one is needed.
  stem: string
  options: McqOption[]
  // # Index into `options`.
  correctIndex: number
  // # Skill graph nodes this item exercises.
  nodeIds: string[]
  // # CEFR level this item is written for.
  level: CefrLevel
  // # 0–1 difficulty within the node (0 = easiest). Null when unset.
  difficulty?: number | null
}

// # ─── GAP FILL ─────────────────────────────────────────────────────────
// # Sentence with one or more blanks — learner types the answer.
// # Tests productive recall, not recognition. Each gap has acceptable answers.

export interface GapFillGap {
  // # Position index (0-based) of this gap in the stem's `______` markers.
  index: number
  // # All acceptable answers (case-insensitive match). First is the "best" answer.
  acceptedAnswers: string[]
  // # Hint shown if the learner struggles (optional).
  hint?: string
}

export interface GapFillItem {
  id: string
  type: 'gap_fill'
  // # Sentence with `______` marking each gap. Multiple gaps allowed.
  stem: string
  gaps: GapFillGap[]
  // # Skill graph nodes this item exercises.
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── READING PASSAGE ──────────────────────────────────────────────────
// # A long text (300–900 words) with multiple attached questions.
// # Questions can be TFNG, matching, sentence completion, or MCQ.
// # This is the core of IELTS/PTE/OET reading sections.

export type ReadingQuestionType = 'tfng' | 'mcq' | 'matching' | 'sentence_completion' | 'short_answer'

export interface ReadingQuestion {
  // # Unique within the passage (e.g. "q1", "q2").
  id: string
  questionType: ReadingQuestionType
  // # The question or statement text.
  text: string
  // # For MCQ: the options. For TFNG: always ["True","False","Not Given"].
  // # For matching: the list of headings/features to match against.
  // # For sentence_completion/short_answer: empty array.
  options: string[]
  // # Index into options (MCQ/TFNG/matching) or the text answer (sentence_completion/short_answer).
  correctAnswer: string | number
  // # Why this is the correct answer — shown after submission for learning.
  explanation: string
}

export interface ReadingPassageItem {
  id: string
  type: 'reading_passage'
  // # Title of the passage (shown to the learner).
  title: string
  // # The full passage text. 300+ words for B1, 600+ for B2, 800+ for C1/C2.
  passage: string
  // # Source attribution if adapted from real material.
  source?: string
  // # Questions attached to this passage.
  questions: ReadingQuestion[]
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── WRITING TASK ─────────────────────────────────────────────────────
// # A writing prompt with rubric criteria for self/AI assessment.
// # Covers IELTS Task 1 (charts), Task 2 (essays), OET referral letters,
// # PTE summarize written text, and general A1–C2 writing practice.

export type WritingTaskFormat =
  | 'essay'            // # IELTS Task 2, general essay
  | 'chart_description' // # IELTS Task 1 Academic
  | 'letter_formal'    // # IELTS General Task 1 (formal), OET referral letter
  | 'letter_informal'  // # IELTS General Task 1 (informal)
  | 'summary'          // # PTE summarize written text
  | 'short_message'    // # A1–A2 short writing (postcard, note)
  | 'report'           // # B2+ structured report

export interface WritingRubricCriterion {
  // # e.g. "Task Achievement", "Coherence", "Lexical Resource", "Grammar"
  name: string
  // # What the criterion measures, shown to the learner.
  description: string
  // # Maximum score for this criterion (typically 9 for IELTS, 90 for PTE).
  maxScore: number
}

export interface WritingTaskItem {
  id: string
  type: 'writing_task'
  // # The writing prompt/instructions.
  prompt: string
  // # What format the response should take.
  format: WritingTaskFormat
  // # Minimum word count (e.g. 150 for IELTS Task 1, 250 for Task 2).
  minWords: number
  // # Maximum word count (0 = no limit).
  maxWords: number
  // # Time allowed in minutes (0 = untimed).
  timeMinutes: number
  // # Rubric criteria for assessment.
  rubric: WritingRubricCriterion[]
  // # A model answer at the target band/score level.
  modelAnswer: string
  // # For chart_description: description of the chart data (since we can't embed images).
  chartData?: string
  // # For letter tasks: the scenario/context.
  scenario?: string
  // # OET-specific: case notes for referral letter.
  caseNotes?: string
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── SPEAKING PROMPT ──────────────────────────────────────────────────
// # A speaking task with topic, follow-up questions, and model answer notes.
// # Covers IELTS Parts 1–3, PTE Read Aloud/Describe Image, OET role-plays.

export type SpeakingFormat =
  | 'part1_short'      // # IELTS Part 1: short familiar-topic questions
  | 'part2_long_turn'  // # IELTS Part 2: 1-min prep + 2-min talk from cue card
  | 'part3_discussion' // # IELTS Part 3: abstract/hypothetical follow-up
  | 'read_aloud'       // # PTE: read a text aloud
  | 'describe_image'   // # PTE: describe a chart/image in 40 seconds
  | 'role_play'        // # OET: healthcare professional/patient scenario
  | 'general'          // # A1–B1: basic speaking practice

export interface SpeakingPromptItem {
  id: string
  type: 'speaking_prompt'
  // # Main topic or instruction.
  prompt: string
  format: SpeakingFormat
  // # Follow-up questions (IELTS Part 1 has 3–4, Part 3 has 2–3).
  followUpQuestions: string[]
  // # Cue card points for Part 2 long turn.
  cueCardPoints?: string[]
  // # Preparation time in seconds (60 for IELTS Part 2, 0 for others).
  prepTimeSeconds: number
  // # Speaking time in seconds (120 for Part 2, 30–45 for PTE, etc.).
  speakTimeSeconds: number
  // # Key vocabulary/phrases the learner should try to use.
  targetLanguage: string[]
  // # Notes on what a good answer includes (not a full transcript).
  modelAnswerNotes: string
  // # OET role-play: patient/professional scenario details.
  rolePlayContext?: string
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── REORDER (PTE) ────────────────────────────────────────────────────
// # PTE Re-order Paragraphs: sentences shown in scrambled order,
// # learner drags them into the correct sequence.

export interface ReorderItem {
  id: string
  type: 'reorder'
  // # Instruction text (e.g. "Put these sentences in the correct order").
  stem: string
  // # Sentences in their CORRECT order. The UI scrambles them for display.
  sentences: string[]
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── HIGHLIGHT INCORRECT (PTE) ────────────────────────────────────────
// # PTE Highlight Incorrect Words: a transcript with deliberate errors.
// # Learner clicks the words that differ from what was "spoken".

export interface HighlightIncorrectItem {
  id: string
  type: 'highlight_incorrect'
  // # The text as the learner reads it (with errors embedded).
  transcript: string
  // # Indices of words that are incorrect (0-based, split by whitespace).
  incorrectWordIndices: number[]
  // # The correct words that should replace the incorrect ones (same order).
  correctWords: string[]
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── SENTENCE TRANSFORMATION (Cambridge) ─────────────────────────────
// # Rewrite a sentence using a key word so the meaning stays the same.
// # Tests grammar manipulation — conditionals, passive, reported speech.

export interface SentenceTransformItem {
  id: string
  type: 'sentence_transform'
  // # The original sentence to be rewritten.
  originalSentence: string
  // # The key word that MUST appear in the rewritten sentence.
  keyWord: string
  // # Accepted correct transformations (case-insensitive).
  acceptedAnswers: string[]
  // # Explanation of the grammar point being tested.
  explanation: string
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── ERROR CORRECTION ────────────────────────────────────────────────
// # A sentence containing one grammatical or lexical error. The learner
// # identifies the error and provides the correction.

export interface ErrorCorrectionItem {
  id: string
  type: 'error_correction'
  // # The sentence WITH the error embedded.
  sentence: string
  // # The incorrect word or phrase.
  errorPart: string
  // # The correct version of the error part.
  correction: string
  // # Why this is wrong and the correction is right.
  explanation: string
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── WORD FORMATION ──────────────────────────────────────────────────
// # Given a root word, form the correct derivative to fill a gap.
// # Tests morphology: prefixes, suffixes, part-of-speech changes.

export interface WordFormationItem {
  id: string
  type: 'word_formation'
  // # Sentence with a `______` gap where the derived word goes.
  stem: string
  // # The root/base word given to the learner (e.g. "SUCCEED").
  rootWord: string
  // # Accepted correct forms (e.g. ["successful", "successfully"]).
  acceptedAnswers: string[]
  // # What kind of transformation is needed.
  explanation: string
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── MATCHING ────────────────────────────────────────────────────────
// # Match items from column A to column B. Tests vocabulary, definitions,
// # collocations, or concept associations.

export interface MatchPair {
  // # Left-side item (e.g. a word, phrase, or sentence start).
  left: string
  // # Right-side item (e.g. definition, synonym, or sentence end).
  right: string
}

export interface MatchingItem {
  id: string
  type: 'matching'
  // # Instruction text.
  stem: string
  // # Pairs in their CORRECT matching. The UI scrambles the right column.
  pairs: MatchPair[]
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── DIALOGUE COMPLETION ─────────────────────────────────────────────
// # A conversation with one or more missing lines. The learner fills in
// # contextually appropriate responses.

export interface DialogueLine {
  // # Speaker label (e.g. "A", "B", "Shop assistant", "Doctor").
  speaker: string
  // # The line text. Null = the learner must fill this line in.
  text: string | null
  // # Accepted answers when text is null (case-insensitive).
  acceptedAnswers?: string[]
  // # Hint shown if the learner struggles.
  hint?: string
}

export interface DialogueCompletionItem {
  id: string
  type: 'dialogue_completion'
  // # Instruction/context (e.g. "Complete the conversation at a restaurant").
  stem: string
  // # The conversation lines in order.
  lines: DialogueLine[]
  nodeIds: string[]
  level: CefrLevel
  difficulty?: number | null
}

// # ─── UNION TYPE ───────────────────────────────────────────────────────
// # Discriminated union of all item types. The `type` field is the discriminator.
// # Use this when handling items generically (item-bank queries, rendering).

export type ContentItem =
  | McqItem
  | GapFillItem
  | ReadingPassageItem
  | WritingTaskItem
  | SpeakingPromptItem
  | ReorderItem
  | HighlightIncorrectItem
  | SentenceTransformItem
  | ErrorCorrectionItem
  | WordFormationItem
  | MatchingItem
  | DialogueCompletionItem

export type IssueSeverity = 'reject' | 'warn'

export type ItemIssueCode =
  // # MCQ-specific codes.
  | 'STRUCTURE'
  | 'MALFORMED_OPTION'
  | 'NO_MISCONCEPTION'
  | 'VAGUE_MISCONCEPTION'
  | 'DUPLICATE_MISCONCEPTION'
  | 'STEM_GIVEAWAY'
  | 'LENGTH_TELL'
  | 'ABOVE_LEVEL'
  | 'WRONG_KEY'
  | 'AMBIGUOUS_KEY'
  | 'MISCONCEPTION_MISMATCH'
  | 'NEAR_DUPLICATE'
  | 'OFF_TARGET'
  // # LLM-judged quality dimensions.
  | 'UNNATURAL'
  | 'INAUTHENTIC_CONTEXT'
  | 'TEACHER_REJECT'
  | 'WEAK_EXPLANATION'
  // # Gap-fill codes.
  | 'NO_GAPS'
  | 'EMPTY_ACCEPTED_ANSWERS'
  | 'GAP_COUNT_MISMATCH'
  // # Reading passage codes.
  | 'PASSAGE_TOO_SHORT'
  | 'NO_QUESTIONS'
  | 'MISSING_EXPLANATION'
  | 'INVALID_ANSWER'
  // # Writing task codes.
  | 'NO_RUBRIC'
  | 'NO_MODEL_ANSWER'
  | 'WORD_COUNT_INVALID'
  // # Speaking prompt codes.
  | 'NO_TARGET_LANGUAGE'
  | 'NO_MODEL_NOTES'
  // # Reorder codes.
  | 'TOO_FEW_SENTENCES'
  // # Highlight incorrect codes.
  | 'NO_INCORRECT_WORDS'
  | 'INDEX_OUT_OF_RANGE'
  // # Sentence transformation codes.
  | 'NO_KEY_WORD'
  | 'NO_ACCEPTED_TRANSFORMS'
  | 'NO_EXPLANATION'
  // # Error correction codes.
  | 'NO_ERROR_PART'
  | 'NO_CORRECTION'
  | 'ERROR_NOT_IN_SENTENCE'
  // # Word formation codes.
  | 'NO_ROOT_WORD'
  | 'NO_ACCEPTED_FORMS'
  // # Matching codes.
  | 'TOO_FEW_PAIRS'
  | 'EMPTY_PAIR'
  // # Dialogue completion codes.
  | 'NO_LINES'
  | 'NO_MISSING_LINES'
  | 'MISSING_LINE_NO_ANSWERS'

export interface ItemIssue {
  code: ItemIssueCode
  severity: IssueSeverity
  message: string
  /** Index into `options` when the issue concerns one specific option. */
  optionIndex?: number
}

export interface ItemReview {
  /** True when no issue has severity 'reject'. */
  passed: boolean
  issues: ItemIssue[]
}
