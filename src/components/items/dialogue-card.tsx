'use client'

// # Dialogue completion card — chat-bubble layout with missing lines.
// # Learner types responses for the missing lines, then checks.

import { useState, useEffect, useRef } from 'react'

interface DialogueLine {
  speaker: string
  text: string | null
  acceptedAnswers?: string[]
  hint?: string
}

interface DialogueCardProps {
  stem: string
  lines: DialogueLine[]
  onComplete: (correct: boolean) => void
}

export function DialogueCard({ stem, lines, onComplete }: DialogueCardProps) {
  // # Track user inputs for each missing line.
  const missingIndices = lines
    .map((line, i) => (line.text === null ? i : -1))
    .filter((i) => i !== -1)

  const [answers, setAnswers] = useState<Map<number, string>>(
    new Map(missingIndices.map((i) => [i, ''])),
  )
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<Map<number, boolean>>(new Map())
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setAnswers(new Map(missingIndices.map((i) => [i, ''])))
    setSubmitted(false)
    setResults(new Map())
    setTimeout(() => firstInputRef.current?.focus(), 100)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stem])

  function normalize(s: string): string {
    return s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?,']+$/g, '')
  }

  function handleSubmit() {
    const res = new Map<number, boolean>()
    for (const idx of missingIndices) {
      const line = lines[idx]!
      const userAnswer = answers.get(idx) ?? ''
      const accepted = line.acceptedAnswers ?? []
      // # Partial credit: accept if the user's answer starts with or contains any accepted answer.
      const correct = accepted.some((a) => {
        const normA = normalize(a)
        const normU = normalize(userAnswer)
        return normU === normA || normU.includes(normA) || normA.includes(normU)
      })
      res.set(idx, correct)
    }
    setResults(res)
    setSubmitted(true)

    const allCorrect = [...res.values()].every(Boolean)
    setTimeout(() => onComplete(allCorrect), 2500)
  }

  const allFilled = [...answers.values()].every((a) => a.trim() !== '')

  return (
    <div className="w-full max-w-lg">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Dialogue
        </span>
      </div>

      {/* # Context */}
      <p className="mb-6 text-center text-sm text-muted-foreground">{stem}</p>

      {/* # Chat bubbles */}
      <div className="mb-6 space-y-3">
        {lines.map((line, i) => {
          const isMissing = line.text === null
          const isFirstMissing = i === missingIndices[0]
          const result = results.get(i)

          return (
            <div key={i} className="flex flex-col">
              {/* # Speaker label */}
              <span className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {line.speaker}
              </span>

              {isMissing ? (
                // # Missing line — input field styled as chat bubble
                <div className="relative">
                  <input
                    ref={isFirstMissing ? firstInputRef : undefined}
                    type="text"
                    value={answers.get(i) ?? ''}
                    onChange={(e) => {
                      const next = new Map(answers)
                      next.set(i, e.target.value)
                      setAnswers(next)
                    }}
                    disabled={submitted}
                    placeholder={line.hint ?? 'Type your response...'}
                    className={`w-full rounded-lg border-2 bg-background px-4 py-3 text-sm outline-none transition-colors ${
                      submitted
                        ? result
                          ? 'border-success bg-success/5'
                          : 'border-error bg-error/5'
                        : 'border-dashed border-foreground/30 focus:border-foreground'
                    }`}
                  />
                  {/* # Show accepted answer after wrong submission */}
                  {submitted && !result && line.acceptedAnswers?.[0] && (
                    <p className="mt-1 text-xs text-success">
                      Example: {line.acceptedAnswers[0]}
                    </p>
                  )}
                </div>
              ) : (
                // # Given line — solid chat bubble
                <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed">
                  {line.text}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* # Submit */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
        >
          Check Dialogue
        </button>
      )}
    </div>
  )
}
