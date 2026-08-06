'use client'

// # Sentence transformation card — original sentence, key word highlighted,
// # input for the rewritten sentence, checks against accepted answers.

import { useState, useEffect, useRef } from 'react'

interface SentenceTransformCardProps {
  originalSentence: string
  keyWord: string
  acceptedAnswers: string[]
  explanation: string
  onComplete: (correct: boolean) => void
}

export function SentenceTransformCard({
  originalSentence,
  keyWord,
  acceptedAnswers,
  explanation,
  onComplete,
}: SentenceTransformCardProps) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setAnswer('')
    setSubmitted(false)
    setIsCorrect(false)
    inputRef.current?.focus()
  }, [originalSentence])

  // # Normalize for comparison: lowercase, collapse whitespace, strip trailing punctuation.
  function normalize(s: string): string {
    return s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')
  }

  function handleSubmit() {
    const correct = acceptedAnswers.some(
      (accepted) => normalize(accepted) === normalize(answer),
    )
    setIsCorrect(correct)
    setSubmitted(true)
    setTimeout(() => onComplete(correct), 2000)
  }

  return (
    <div className="w-full max-w-lg">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Sentence Transformation
        </span>
      </div>

      {/* # Original sentence */}
      <div className="mb-6 rounded-lg border border-border bg-muted/30 p-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Rewrite this sentence
        </p>
        <p className="font-serif text-xl leading-relaxed">{originalSentence}</p>
      </div>

      {/* # Key word — prominently displayed */}
      <div className="mb-6 text-center">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Using the word
        </p>
        <span className="inline-block rounded-lg border-2 border-foreground px-6 py-3 font-serif text-2xl font-bold uppercase tracking-wide">
          {keyWord}
        </span>
      </div>

      {/* # Answer input */}
      <input
        ref={inputRef}
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && answer.trim()) handleSubmit()
        }}
        disabled={submitted}
        placeholder="Type your sentence here..."
        className={`mb-4 w-full rounded-lg border-2 bg-background px-5 py-4 text-lg outline-none transition-colors ${
          submitted
            ? isCorrect
              ? 'border-success text-success'
              : 'border-error text-error'
            : 'border-foreground/20 focus:border-foreground'
        }`}
      />

      {/* # Feedback after submission */}
      {submitted && (
        <div
          className={`mb-4 rounded-lg p-4 ${
            isCorrect
              ? 'border border-success/30 bg-success/5'
              : 'border border-error/30 bg-error/5'
          }`}
        >
          {!isCorrect && (
            <>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Accepted answer
              </p>
              <p className="mb-2 font-semibold">{acceptedAnswers[0]}</p>
            </>
          )}
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
      )}

      {/* # Submit button */}
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
