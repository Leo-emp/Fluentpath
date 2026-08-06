'use client'

// # Universal item card dispatcher — routes any ContentItem to its
// # type-specific card component. Single entry point for the practice page.

import { McqCard } from '@/components/mcq-card'
import { GapFillCard } from './gap-fill-card'
import { ReadingCard } from './reading-card'
import { WritingCard } from './writing-card'
import { SpeakingCard } from './speaking-card'
import { ReorderCard } from './reorder-card'
import { HighlightCard } from './highlight-card'
import { SentenceTransformCard } from './sentence-transform-card'
import { ErrorCorrectionCard } from './error-correction-card'
import { WordFormationCard } from './word-formation-card'
import { MatchingCard } from './matching-card'
import { DialogueCard } from './dialogue-card'

// # Generic item shape from the API — type + payload.
export interface PracticeItem {
  id: string
  type: string
  payload: Record<string, unknown>
  nodeIds: string[]
  difficulty?: number | null
}

interface ItemCardProps {
  item: PracticeItem
  showFeedback: boolean
  onComplete: (correct: boolean) => void
}

export function ItemCard({ item, showFeedback, onComplete }: ItemCardProps) {
  const p = item.payload

  switch (item.type) {
    case 'mcq':
      return (
        <McqCard
          stem={String(p.stem ?? '')}
          options={(p.options as { text: string; misconception: string | null }[]) ?? []}
          correctIndex={Number(p.correctIndex ?? 0)}
          showFeedback={showFeedback}
          onSelect={(idx) => onComplete(idx === Number(p.correctIndex ?? 0))}
        />
      )

    case 'gap_fill':
      return (
        <GapFillCard
          stem={String(p.stem ?? '')}
          gaps={(p.gaps as { correctAnswer: string; acceptedAlternatives?: string[]; hint?: string }[]) ?? []}
          onComplete={onComplete}
        />
      )

    case 'reading_passage':
      return (
        <ReadingCard
          title={String(p.title ?? '')}
          passage={String(p.passage ?? '')}
          source={typeof p.source === 'string' ? p.source : undefined}
          questions={(p.questions as { stem: string; options: string[]; correctIndex: number }[]) ?? []}
          onComplete={onComplete}
        />
      )

    case 'writing_task':
      return (
        <WritingCard
          prompt={String(p.prompt ?? '')}
          format={String(p.format ?? 'essay')}
          minWords={Number(p.minWords ?? 100)}
          maxWords={Number(p.maxWords ?? 300)}
          timeMinutes={Number(p.timeMinutes ?? 30)}
          rubric={(p.rubric as { name: string; description: string; maxScore: number }[]) ?? []}
          modelAnswer={String(p.modelAnswer ?? '')}
          onComplete={onComplete}
        />
      )

    case 'speaking_prompt':
      return (
        <SpeakingCard
          prompt={String(p.prompt ?? '')}
          format={String(p.format ?? 'general')}
          followUpQuestions={Array.isArray(p.followUpQuestions) ? p.followUpQuestions as string[] : []}
          cueCardPoints={Array.isArray(p.cueCardPoints) ? p.cueCardPoints as string[] : undefined}
          prepTimeSeconds={Number(p.prepTimeSeconds ?? 0)}
          speakTimeSeconds={Number(p.speakTimeSeconds ?? 60)}
          targetLanguage={Array.isArray(p.targetLanguage) ? p.targetLanguage as string[] : []}
          modelAnswerNotes={String(p.modelAnswerNotes ?? '')}
          onComplete={onComplete}
        />
      )

    case 'reorder':
      return (
        <ReorderCard
          stem={String(p.stem ?? '')}
          sentences={Array.isArray(p.sentences) ? p.sentences as string[] : []}
          onComplete={onComplete}
        />
      )

    case 'highlight_incorrect':
      return (
        <HighlightCard
          transcript={String(p.transcript ?? '')}
          incorrectWordIndices={Array.isArray(p.incorrectWordIndices) ? p.incorrectWordIndices as number[] : []}
          correctWords={Array.isArray(p.correctWords) ? p.correctWords as string[] : []}
          onComplete={onComplete}
        />
      )

    case 'sentence_transform':
      return (
        <SentenceTransformCard
          originalSentence={String(p.originalSentence ?? '')}
          keyWord={String(p.keyWord ?? '')}
          acceptedAnswers={Array.isArray(p.acceptedAnswers) ? p.acceptedAnswers as string[] : []}
          explanation={String(p.explanation ?? '')}
          onComplete={onComplete}
        />
      )

    case 'error_correction':
      return (
        <ErrorCorrectionCard
          sentence={String(p.sentence ?? '')}
          errorPart={String(p.errorPart ?? '')}
          correction={String(p.correction ?? '')}
          explanation={String(p.explanation ?? '')}
          onComplete={onComplete}
        />
      )

    case 'word_formation':
      return (
        <WordFormationCard
          stem={String(p.stem ?? '')}
          rootWord={String(p.rootWord ?? '')}
          acceptedAnswers={Array.isArray(p.acceptedAnswers) ? p.acceptedAnswers as string[] : []}
          explanation={String(p.explanation ?? '')}
          onComplete={onComplete}
        />
      )

    case 'matching':
      return (
        <MatchingCard
          stem={String(p.stem ?? '')}
          pairs={(p.pairs as { left: string; right: string }[]) ?? []}
          onComplete={onComplete}
        />
      )

    case 'dialogue_completion':
      return (
        <DialogueCard
          stem={String(p.stem ?? '')}
          lines={(p.lines as { speaker: string; text: string | null; acceptedAnswers?: string[]; hint?: string }[]) ?? []}
          onComplete={onComplete}
        />
      )

    default:
      return (
        <div className="w-full max-w-lg text-center">
          <p className="text-muted-foreground">
            Unknown item type: {item.type}
          </p>
        </div>
      )
  }
}
