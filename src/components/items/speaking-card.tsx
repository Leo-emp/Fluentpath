'use client'

// # Speaking prompt card — displays prompt, cue card points, countdown timer,
// # follow-up questions, and model answer notes after time expires.

import { useState, useEffect, useRef, useCallback } from 'react'

interface SpeakingCardProps {
  prompt: string
  format: string
  followUpQuestions?: string[]
  cueCardPoints?: string[]
  prepTimeSeconds: number
  speakTimeSeconds: number
  targetLanguage: string[]
  modelAnswerNotes: string
  onComplete: (correct: boolean) => void
}

// # Human-readable format label.
function formatLabel(format: string): string {
  const labels: Record<string, string> = {
    part1_short: 'Part 1 — Short Answers',
    part2_cue_card: 'Part 2 — Cue Card',
    part3_discussion: 'Part 3 — Discussion',
    general: 'Speaking Practice',
    role_play: 'Role Play',
  }
  return labels[format] ?? format.replace(/_/g, ' ')
}

export function SpeakingCard({
  prompt,
  format,
  followUpQuestions,
  cueCardPoints,
  prepTimeSeconds,
  speakTimeSeconds,
  targetLanguage,
  modelAnswerNotes,
  onComplete,
}: SpeakingCardProps) {
  type Phase = 'prep' | 'speak' | 'review'
  const [phase, setPhase] = useState<Phase>(prepTimeSeconds > 0 ? 'prep' : 'speak')
  const [timeLeft, setTimeLeft] = useState(prepTimeSeconds > 0 ? prepTimeSeconds : speakTimeSeconds)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // # Reset on new prompt.
  useEffect(() => {
    setPhase(prepTimeSeconds > 0 ? 'prep' : 'speak')
    setTimeLeft(prepTimeSeconds > 0 ? prepTimeSeconds : speakTimeSeconds)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [prompt, prepTimeSeconds, speakTimeSeconds])

  // # Countdown timer.
  useEffect(() => {
    if (phase === 'review') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          if (phase === 'prep') {
            setPhase('speak')
            return speakTimeSeconds
          }
          setPhase('review')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase, speakTimeSeconds])

  const skipToSpeak = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('speak')
    setTimeLeft(speakTimeSeconds)
  }, [speakTimeSeconds])

  const skipToReview = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('review')
    setTimeLeft(0)
  }, [])

  // # Format time as M:SS.
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`

  return (
    <div className="w-full max-w-lg">
      {/* # Type + format label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Speaking
        </span>
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          {formatLabel(format)}
        </span>
      </div>

      {/* # Timer — large centered countdown */}
      {phase !== 'review' && (
        <div className="mb-8 text-center">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {phase === 'prep' ? 'Preparation Time' : 'Speaking Time'}
          </p>
          <p className="font-serif text-5xl font-bold tabular-nums">
            {timeDisplay}
          </p>
        </div>
      )}

      {/* # Prompt */}
      <div className="mb-6 rounded-lg border border-border bg-muted/30 p-5">
        <p className="font-serif text-xl leading-relaxed">{prompt}</p>
      </div>

      {/* # Cue card points (Part 2) */}
      {cueCardPoints && cueCardPoints.length > 0 && (
        <div className="mb-6 rounded-lg border-2 border-foreground/10 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            You should say:
          </p>
          <ul className="space-y-2">
            {cueCardPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-muted-foreground">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* # Follow-up questions */}
      {followUpQuestions && followUpQuestions.length > 0 && phase !== 'review' && (
        <div className="mb-6 space-y-3">
          {followUpQuestions.map((q, i) => (
            <div
              key={i}
              className="rounded-lg border border-border px-4 py-3 text-sm"
            >
              <span className="mr-2 font-semibold text-muted-foreground">
                Q{i + 1}.
              </span>
              {q}
            </div>
          ))}
        </div>
      )}

      {/* # Phase controls */}
      {phase === 'prep' && (
        <button
          onClick={skipToSpeak}
          className="w-full rounded-lg border-2 border-foreground px-6 py-4 text-lg transition-colors hover:bg-foreground hover:text-background"
        >
          Start Speaking
        </button>
      )}

      {phase === 'speak' && (
        <button
          onClick={skipToReview}
          className="w-full rounded-lg border-2 border-foreground px-6 py-4 text-lg transition-colors hover:bg-foreground hover:text-background"
        >
          I&apos;m Done
        </button>
      )}

      {/* # Review phase — target language + model notes */}
      {phase === 'review' && (
        <div className="space-y-4">
          {/* # Target language examples */}
          {targetLanguage.length > 0 && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Target Language
              </p>
              <ul className="space-y-1">
                {targetLanguage.map((t, i) => (
                  <li key={i} className="text-sm italic text-muted-foreground">
                    &ldquo;{t}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* # Model answer notes */}
          <div className="rounded-lg border-2 border-success/30 bg-success/5 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-success">
              Examiner Notes
            </p>
            <p className="text-sm leading-relaxed">{modelAnswerNotes}</p>
          </div>

          <button
            onClick={() => onComplete(true)}
            className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}
