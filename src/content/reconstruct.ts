// # Reconstruct typed ContentItem objects from DB rows.
// # The DB stores item type as text and payload as JSON. This module converts
// # them back into the discriminated union types used by review gates and the UI.

import type { CefrLevel } from '@/skill-graph/types'
import type {
  ContentItem, McqItem, GapFillItem, ReadingPassageItem,
  WritingTaskItem, SpeakingPromptItem, ReorderItem, HighlightIncorrectItem,
  SentenceTransformItem, ErrorCorrectionItem, WordFormationItem,
  MatchingItem, DialogueCompletionItem,
  McqOption, GapFillGap, ReadingQuestion, WritingRubricCriterion,
  WritingTaskFormat, SpeakingFormat, MatchPair, DialogueLine,
} from '@/items/types'

// # Minimal shape of an item row from the DB (items table).
interface ItemRow {
  id: string
  type: string
  level: string
  skill: string
}

// # Minimal shape of a version row from the DB (item_versions table).
interface VersionRow {
  itemId: string
  payload: Record<string, unknown>
}

// # Reconstruct a ContentItem from its DB rows.
// # The item row provides type/level, the version row provides the payload.
export function reconstructContentItem(item: ItemRow, version: VersionRow): ContentItem {
  const p = version.payload
  const level = item.level as CefrLevel
  const nodeIds = Array.isArray(p.nodeIds) ? (p.nodeIds as string[]) : []

  switch (item.type) {
    case 'mcq':
      return {
        id: item.id,
        type: 'mcq',
        stem: String(p.stem ?? ''),
        options: Array.isArray(p.options) ? (p.options as McqOption[]) : [],
        correctIndex: Number(p.correctIndex ?? -1),
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies McqItem

    case 'gap_fill':
      return {
        id: item.id,
        type: 'gap_fill',
        stem: String(p.stem ?? ''),
        gaps: Array.isArray(p.gaps) ? (p.gaps as GapFillGap[]) : [],
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies GapFillItem

    case 'reading_passage':
      return {
        id: item.id,
        type: 'reading_passage',
        title: String(p.title ?? ''),
        passage: String(p.passage ?? ''),
        source: typeof p.source === 'string' ? p.source : undefined,
        questions: Array.isArray(p.questions) ? (p.questions as ReadingQuestion[]) : [],
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies ReadingPassageItem

    case 'writing_task':
      return {
        id: item.id,
        type: 'writing_task',
        prompt: String(p.prompt ?? ''),
        format: (p.format ?? 'essay') as WritingTaskFormat,
        minWords: Number(p.minWords ?? 0),
        maxWords: Number(p.maxWords ?? 0),
        timeMinutes: Number(p.timeMinutes ?? 0),
        rubric: Array.isArray(p.rubric) ? (p.rubric as WritingRubricCriterion[]) : [],
        modelAnswer: String(p.modelAnswer ?? ''),
        chartData: typeof p.chartData === 'string' ? p.chartData : undefined,
        scenario: typeof p.scenario === 'string' ? p.scenario : undefined,
        caseNotes: typeof p.caseNotes === 'string' ? p.caseNotes : undefined,
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies WritingTaskItem

    case 'speaking_prompt':
      return {
        id: item.id,
        type: 'speaking_prompt',
        prompt: String(p.prompt ?? ''),
        format: (p.format ?? 'general') as SpeakingFormat,
        followUpQuestions: Array.isArray(p.followUpQuestions) ? (p.followUpQuestions as string[]) : [],
        cueCardPoints: Array.isArray(p.cueCardPoints) ? (p.cueCardPoints as string[]) : undefined,
        prepTimeSeconds: Number(p.prepTimeSeconds ?? 0),
        speakTimeSeconds: Number(p.speakTimeSeconds ?? 60),
        targetLanguage: Array.isArray(p.targetLanguage) ? (p.targetLanguage as string[]) : [],
        modelAnswerNotes: String(p.modelAnswerNotes ?? ''),
        rolePlayContext: typeof p.rolePlayContext === 'string' ? p.rolePlayContext : undefined,
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies SpeakingPromptItem

    case 'reorder':
      return {
        id: item.id,
        type: 'reorder',
        stem: String(p.stem ?? ''),
        sentences: Array.isArray(p.sentences) ? (p.sentences as string[]) : [],
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies ReorderItem

    case 'highlight_incorrect':
      return {
        id: item.id,
        type: 'highlight_incorrect',
        transcript: String(p.transcript ?? ''),
        incorrectWordIndices: Array.isArray(p.incorrectWordIndices) ? (p.incorrectWordIndices as number[]) : [],
        correctWords: Array.isArray(p.correctWords) ? (p.correctWords as string[]) : [],
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies HighlightIncorrectItem

    case 'sentence_transform':
      return {
        id: item.id,
        type: 'sentence_transform',
        originalSentence: String(p.originalSentence ?? ''),
        keyWord: String(p.keyWord ?? ''),
        acceptedAnswers: Array.isArray(p.acceptedAnswers) ? (p.acceptedAnswers as string[]) : [],
        explanation: String(p.explanation ?? ''),
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies SentenceTransformItem

    case 'error_correction':
      return {
        id: item.id,
        type: 'error_correction',
        sentence: String(p.sentence ?? ''),
        errorPart: String(p.errorPart ?? ''),
        correction: String(p.correction ?? ''),
        explanation: String(p.explanation ?? ''),
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies ErrorCorrectionItem

    case 'word_formation':
      return {
        id: item.id,
        type: 'word_formation',
        stem: String(p.stem ?? ''),
        rootWord: String(p.rootWord ?? ''),
        acceptedAnswers: Array.isArray(p.acceptedAnswers) ? (p.acceptedAnswers as string[]) : [],
        explanation: String(p.explanation ?? ''),
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies WordFormationItem

    case 'matching':
      return {
        id: item.id,
        type: 'matching',
        stem: String(p.stem ?? ''),
        pairs: Array.isArray(p.pairs) ? (p.pairs as MatchPair[]) : [],
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies MatchingItem

    case 'dialogue_completion':
      return {
        id: item.id,
        type: 'dialogue_completion',
        stem: String(p.stem ?? ''),
        lines: Array.isArray(p.lines) ? (p.lines as DialogueLine[]) : [],
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies DialogueCompletionItem

    default:
      // # Fallback: treat unknown types as MCQ shape for backward compatibility.
      return {
        id: item.id,
        type: 'mcq',
        stem: String(p.stem ?? ''),
        options: Array.isArray(p.options) ? (p.options as McqOption[]) : [],
        correctIndex: Number(p.correctIndex ?? -1),
        nodeIds,
        level,
        difficulty: typeof p.difficulty === 'number' ? p.difficulty : null,
      } satisfies McqItem
  }
}
