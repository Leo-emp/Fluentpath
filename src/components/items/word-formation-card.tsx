'use client'

// # Word formation card — sentence with a gap, root word displayed,
// # learner types the correct derived form.

import { useState, useEffect, useRef } from 'react'

interface WordFormationCardProps {
  stem: string
  rootWord: string
  acceptedAnswers: string[]
  explanation: string
  onComplete: (correct: boolean) => void
}

export function WordFormationCard({
  stem,
  rootWord,
  acceptedAnswers,
  explanation,
  onComplete,
}: WordFormationCardProps) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setAnswer('')
    setSubmitted(false)
    setIsCorrect(false)
    inputRef.current?.focus()
  }, [stem])

  function normalize(s: string): string {
    return s.trim().toLowerCase()
  }

  function handleSubmit() {
    const correct = acceptedAnswers.some(
      (a) => normalize(a) === normalize(answer),
    )
    setIsCorrect(correct)
    setSubmitted(true)
    setTimeout(() => onComplete(correct), 2000)
  }

  // # Split stem around ______ to show inline input.
  const parts = stem.split(/______/)

  return (
    <div className="w-full max-w-lg">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Word Formation
        </span>
      </div>

      {/* # Root word — prominent display */}
      <div className="mb-8 text-center">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Use the correct form of
        </p>
        <span className="inline-block rounded-lg border-2 border-foreground px-6 py-3 font-serif text-2xl font-bold uppercase tracking-wide">
          {rootWord}
        </span>
      </div>

      {/* # Sentence with gap */}
      <div className="mb-8 rounded-lg border border-border bg-muted/30 p-6">
        <p className="font-serif text-xl leading-relaxed">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <input
                  ref={i === 0 ? inputRef : undefined}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && answer.trim()) handleSubmit()
                  }}
                  disabled={submitted}
                  placeholder="..."
                  className={`mx-1 inline-block w-36 border-b-2 bg-transparent px-1 pb-1 text-center font-sans text-lg outline-none transition-colors ${
                    submitted
                      ? isCorrect
                        ? 'border-success text-success font-semibold'
                        : 'border-error text-error'
                      : 'border-foreground/40 focus:border-foreground'
                  }`}
                />
              )}
            </span>
          ))}
        </p>
      </div>

      {/* # Feedback */}
      {submitted && (
        <div
          className={`mb-4 rounded-lg p-4 ${
            isCorrect
              ? 'border border-success/30 bg-success/5'
              : 'border border-error/30 bg-error/5'
          }`}
        >
          {!isCorrect && (
            <p className="mb-2">
              <span className="text-sm text-muted-foreground">Correct answer: </span>
              <span className="font-semibold">{acceptedAnswers[0]}</span>
            </p>
          )}
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
      )}

      {/* # Submit */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
        >
          Check
        </button>
      )}
    </div>
  )
}
