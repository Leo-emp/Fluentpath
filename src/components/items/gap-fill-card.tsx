'use client'

// # Gap-fill card — sentence with blanks, inline inputs, check button.
// # Each gap shows an input field. Feedback highlights correct/incorrect.

import { useState, useEffect, useRef } from 'react'

interface GapFillGap {
  correctAnswer: string
  acceptedAlternatives?: string[]
  hint?: string
}

interface GapFillCardProps {
  stem: string
  gaps: GapFillGap[]
  onComplete: (correct: boolean) => void
}

export function GapFillCard({ stem, gaps, onComplete }: GapFillCardProps) {
  const [answers, setAnswers] = useState<string[]>(gaps.map(() => ''))
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const firstRef = useRef<HTMLInputElement>(null)

  // # Reset when stem changes.
  useEffect(() => {
    setAnswers(gaps.map(() => ''))
    setSubmitted(false)
    setResults([])
    firstRef.current?.focus()
  }, [stem, gaps])

  // # Check if a user answer matches the accepted answers.
  function isCorrect(userAnswer: string, gap: GapFillGap): boolean {
    const normalize = (s: string) => s.trim().toLowerCase()
    const accepted = [gap.correctAnswer, ...(gap.acceptedAlternatives ?? [])]
    return accepted.some((a) => normalize(a) === normalize(userAnswer))
  }

  function handleSubmit() {
    const gapResults = gaps.map((gap, i) => isCorrect(answers[i] ?? '', gap))
    setResults(gapResults)
    setSubmitted(true)

    const allCorrect = gapResults.every(Boolean)
    setTimeout(() => onComplete(allCorrect), 1800)
  }

  // # Split the stem by ______ markers to interleave text and inputs.
  const parts = stem.split(/______/)

  return (
    <div className="w-full max-w-lg">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Fill in the Blanks
        </span>
      </div>

      {/* # Sentence with inline inputs */}
      <div className="mb-8 font-serif text-xl leading-relaxed">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < gaps.length && (
              <span className="inline-block">
                <input
                  ref={i === 0 ? firstRef : undefined}
                  type="text"
                  value={answers[i] ?? ''}
                  onChange={(e) => {
                    const next = [...answers]
                    next[i] = e.target.value
                    setAnswers(next)
                  }}
                  disabled={submitted}
                  placeholder={gaps[i]?.hint ?? '...'}
                  className={`mx-1 inline-block w-32 border-b-2 bg-transparent px-1 pb-1 text-center font-sans text-lg outline-none transition-colors ${
                    submitted
                      ? results[i]
                        ? 'border-success text-success font-semibold'
                        : 'border-error text-error'
                      : 'border-foreground/40 focus:border-foreground'
                  }`}
                />
              </span>
            )}
          </span>
        ))}
      </div>

      {/* # Correct answers shown after submission */}
      {submitted && results.some((r) => !r) && (
        <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Correct answers
          </p>
          {gaps.map((gap, i) =>
            !results[i] ? (
              <p key={i} className="text-sm">
                <span className="text-muted-foreground">Gap {i + 1}:</span>{' '}
                <span className="font-semibold">{gap.correctAnswer}</span>
              </p>
            ) : null,
          )}
        </div>
      )}

      {/* # Submit button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={answers.some((a) => a.trim() === '')}
          className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
        >
          Check
        </button>
      )}
    </div>
  )
}
