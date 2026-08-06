'use client'

// # Error correction card — sentence with an error, learner identifies the
// # error part and types the correction.

import { useState, useEffect, useRef } from 'react'

interface ErrorCorrectionCardProps {
  sentence: string
  errorPart: string
  correction: string
  explanation: string
  onComplete: (correct: boolean) => void
}

export function ErrorCorrectionCard({
  sentence,
  errorPart,
  correction,
  explanation,
  onComplete,
}: ErrorCorrectionCardProps) {
  const [userCorrection, setUserCorrection] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUserCorrection('')
    setSubmitted(false)
    setIsCorrect(false)
    inputRef.current?.focus()
  }, [sentence])

  function normalize(s: string): string {
    return s.trim().toLowerCase()
  }

  function handleSubmit() {
    const correct = normalize(userCorrection) === normalize(correction)
    setIsCorrect(correct)
    setSubmitted(true)
    setTimeout(() => onComplete(correct), 2000)
  }

  // # Split sentence around the error part to highlight it.
  const errorIndex = sentence.indexOf(errorPart)
  const beforeError = errorIndex >= 0 ? sentence.slice(0, errorIndex) : ''
  const afterError = errorIndex >= 0 ? sentence.slice(errorIndex + errorPart.length) : ''

  return (
    <div className="w-full max-w-lg">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Error Correction
        </span>
      </div>

      {/* # Instruction */}
      <p className="mb-4 text-center text-sm text-muted-foreground">
        Find and correct the underlined error.
      </p>

      {/* # Sentence with error highlighted */}
      <div className="mb-8 rounded-lg border border-border bg-muted/30 p-6">
        <p className="font-serif text-xl leading-relaxed">
          {errorIndex >= 0 ? (
            <>
              {beforeError}
              <span
                className={`inline border-b-2 font-semibold ${
                  submitted
                    ? 'border-error text-error line-through'
                    : 'border-foreground/60'
                }`}
              >
                {errorPart}
              </span>
              {afterError}
            </>
          ) : (
            sentence
          )}
        </p>
      </div>

      {/* # Correction input */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Your correction for &ldquo;{errorPart}&rdquo;
        </label>
        <input
          ref={inputRef}
          type="text"
          value={userCorrection}
          onChange={(e) => setUserCorrection(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && userCorrection.trim()) handleSubmit()
          }}
          disabled={submitted}
          placeholder={`Replace "${errorPart}" with...`}
          className={`w-full rounded-lg border-2 bg-background px-5 py-4 text-lg outline-none transition-colors ${
            submitted
              ? isCorrect
                ? 'border-success text-success'
                : 'border-error text-error'
              : 'border-foreground/20 focus:border-foreground'
          }`}
        />
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
              <span className="font-semibold">{correction}</span>
            </p>
          )}
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
      )}

      {/* # Submit */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!userCorrection.trim()}
          className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
        >
          Check
        </button>
      )}
    </div>
  )
}
