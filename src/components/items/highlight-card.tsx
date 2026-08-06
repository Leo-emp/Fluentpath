'use client'

// # Highlight incorrect words card — transcript displayed as clickable words.
// # Learner clicks words they think are wrong. Check reveals correct answers.

import { useState, useEffect } from 'react'

interface HighlightCardProps {
  transcript: string
  incorrectWordIndices: number[]
  correctWords: string[]
  onComplete: (correct: boolean) => void
}

export function HighlightCard({
  transcript,
  incorrectWordIndices,
  correctWords,
  onComplete,
}: HighlightCardProps) {
  const words = transcript.split(/\s+/)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setSelected(new Set())
    setSubmitted(false)
  }, [transcript])

  function toggleWord(index: number) {
    if (submitted) return
    const next = new Set(selected)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setSelected(next)
  }

  function handleSubmit() {
    setSubmitted(true)
    // # Correct if the selected set exactly matches the incorrect indices.
    const expectedSet = new Set(incorrectWordIndices)
    const correct =
      selected.size === expectedSet.size &&
      [...selected].every((i) => expectedSet.has(i))
    setTimeout(() => onComplete(correct), 2000)
  }

  return (
    <div className="w-full max-w-lg">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Highlight Incorrect
        </span>
      </div>

      {/* # Instruction */}
      <p className="mb-6 text-center text-muted-foreground">
        Tap the words that contain errors.
      </p>

      {/* # Transcript — clickable words */}
      <div className="mb-8 rounded-lg border border-border bg-muted/30 p-6">
        <div className="flex flex-wrap gap-1.5 leading-loose">
          {words.map((word, i) => {
            const isSelected = selected.has(i)
            const isActuallyWrong = incorrectWordIndices.includes(i)
            const correctionIndex = incorrectWordIndices.indexOf(i)

            let className =
              'inline-block cursor-pointer rounded-md px-1.5 py-0.5 text-lg transition-all select-none'

            if (submitted) {
              if (isActuallyWrong && isSelected) {
                // # Correctly identified error.
                className += ' bg-success/20 text-success line-through font-semibold'
              } else if (isActuallyWrong && !isSelected) {
                // # Missed error.
                className += ' bg-error/20 text-error underline decoration-wavy'
              } else if (!isActuallyWrong && isSelected) {
                // # False positive — wrongly selected.
                className += ' bg-error/10 text-error/60'
              } else {
                className += ' text-foreground/80'
              }
            } else if (isSelected) {
              className += ' bg-foreground text-background font-semibold'
            } else {
              className += ' hover:bg-foreground/10'
            }

            return (
              <button
                key={i}
                onClick={() => toggleWord(i)}
                disabled={submitted}
                className={className}
              >
                {word}
                {/* # Show correction for identified errors */}
                {submitted && isActuallyWrong && correctionIndex !== -1 && correctWords[correctionIndex] && (
                  <span className="ml-1 text-sm font-normal text-success">
                    → {correctWords[correctionIndex]}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* # Submit button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
        >
          Check ({selected.size} selected)
        </button>
      )}
    </div>
  )
}
