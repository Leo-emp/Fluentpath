import { levelIndex } from '@/skill-graph/types'
import { profileText } from '@/profiler/profile'
import type { ProfilerInventory } from '@/profiler/profile'
import { checkMisconceptions } from './misconceptions'
import { checkWellFormed } from './wellformed'
import { checkGiveaway } from './giveaway'
import { checkShape } from './shape'
import { checkAnswerKey } from './answer-key'
import { checkTargeting } from './targeting'
import { checkDuplicate } from './duplicate'
import { reviewGapFill } from './review-gap-fill'
import { reviewReadingPassage } from './review-reading'
import { reviewWritingTask } from './review-writing'
import { reviewSpeakingPrompt } from './review-speaking'
import { reviewReorder } from './review-reorder'
import { reviewHighlightIncorrect } from './review-highlight'
import { reviewSentenceTransform } from './review-sentence-transform'
import { reviewErrorCorrection } from './review-error-correction'
import { reviewWordFormation } from './review-word-formation'
import { reviewMatching } from './review-matching'
import { reviewDialogueCompletion } from './review-dialogue'
import type {
  ItemIssue, ItemReview, McqItem, ContentItem,
  GapFillItem, ReadingPassageItem, WritingTaskItem,
  SpeakingPromptItem, ReorderItem, HighlightIncorrectItem,
  SentenceTransformItem, ErrorCorrectionItem, WordFormationItem,
  MatchingItem, DialogueCompletionItem,
} from './types'

// # Context needed by the review pipeline. The inventory is always
// # required; other fields enable optional gates.
export interface ReviewContext {
  inventory: ProfilerInventory
  // # Stems of items already in the bank. When provided, the duplicate
  // # gate compares the candidate against them.
  existingStems?: string[]
}

// # ─── MCQ Review (existing) ────────────────────────────────────────────

// # Run every gate over one MCQ item.
export function reviewItem(item: McqItem, context: ReviewContext): ItemReview {
  const issues: ItemIssue[] = [
    // # Cheapest gates first, all run regardless — an item collects every issue.
    ...checkShape(item),
    ...checkWellFormed(item),
    ...checkMisconceptions(item),
    ...checkGiveaway(item),
    ...checkAnswerKey(item),
    ...checkTargeting(item),
    ...checkLevel(item, context.inventory),
    // # Duplicate gate only runs when a bank is provided.
    ...(context.existingStems ? checkDuplicate(item, context.existingStems) : []),
  ]

  return {
    passed: !issues.some((i) => i.severity === 'reject'),
    issues,
  }
}

// # ─── Generic Review Dispatcher ────────────────────────────────────────
// # Routes any ContentItem to its type-specific reviewer. This is the single
// # entry point for publish gates — every new item type gets reviewed here.

export function reviewContentItem(item: ContentItem, context: ReviewContext): ItemReview {
  let issues: ItemIssue[] = []

  switch (item.type) {
    case 'mcq':
      return reviewItem(item as McqItem, context)
    case 'gap_fill':
      issues = reviewGapFill(item as GapFillItem)
      break
    case 'reading_passage':
      issues = reviewReadingPassage(item as ReadingPassageItem)
      break
    case 'writing_task':
      issues = reviewWritingTask(item as WritingTaskItem)
      break
    case 'speaking_prompt':
      issues = reviewSpeakingPrompt(item as SpeakingPromptItem)
      break
    case 'reorder':
      issues = reviewReorder(item as ReorderItem)
      break
    case 'highlight_incorrect':
      issues = reviewHighlightIncorrect(item as HighlightIncorrectItem)
      break
    case 'sentence_transform':
      issues = reviewSentenceTransform(item as SentenceTransformItem)
      break
    case 'error_correction':
      issues = reviewErrorCorrection(item as ErrorCorrectionItem)
      break
    case 'word_formation':
      issues = reviewWordFormation(item as WordFormationItem)
      break
    case 'matching':
      issues = reviewMatching(item as MatchingItem)
      break
    case 'dialogue_completion':
      issues = reviewDialogueCompletion(item as DialogueCompletionItem)
      break
    default:
      issues.push({
        code: 'STRUCTURE',
        severity: 'reject',
        message: `Unknown item type: ${(item as ContentItem).type}`,
      })
  }

  return {
    passed: !issues.some((i) => i.severity === 'reject'),
    issues,
  }
}

// # Reject an item whose own language sits above the level it targets.
function checkLevel(item: McqItem, inventory: ProfilerInventory): ItemIssue[] {
  const issues: ItemIssue[] = []

  const profile = profileText(item.stem, inventory, item.level)

  for (const above of profile.aboveLevel) {
    issues.push({
      code: 'ABOVE_LEVEL',
      severity: 'reject',
      message: `The stem uses "${above.lemma}" (${above.level}) in an item targeting ${item.level}. A learner who cannot read the question cannot demonstrate what it tests.`,
    })
  }

  for (const uncertain of profile.uncertainPhrases) {
    if (levelIndex(uncertain.level) <= levelIndex(item.level)) continue
    issues.push({
      code: 'ABOVE_LEVEL',
      severity: 'warn',
      message: `The stem may use "${uncertain.lemma}" above ${item.level} — its level is estimated, not established, so this needs a human decision.`,
    })
  }

  return issues
}
