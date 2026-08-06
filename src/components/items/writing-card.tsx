'use client'

// # Writing task card — prompt, text area with live word count,
// # rubric criteria, model answer reveal after submission.

import { useState, useEffect, useRef } from 'react'

interface RubricCriterion {
  name: string
  description: string
  maxScore: number
}

interface WritingCardProps {
  prompt: string
  format: string
  minWords: number
  maxWords: number
  timeMinutes: number
  rubric: RubricCriterion[]
  modelAnswer: string
  onComplete: (correct: boolean) => void
}

// # Count words in a string (split by whitespace, filter empties).
function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

// # Human-readable format label.
function formatLabel(format: string): string {
  const labels: Record<string, string> = {
    essay: 'Essay',
    letter_formal: 'Formal Letter',
    letter_informal: 'Informal Letter',
    short_message: 'Short Message',
    report: 'Report',
    review: 'Review',
    proposal: 'Proposal',
  }
  return labels[format] ?? format.replace(/_/g, ' ')
}

export function WritingCard({
  prompt,
  format,
  minWords,
  maxWords,
  timeMinutes,
  rubric,
  modelAnswer,
  onComplete,
}: WritingCardProps) {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setText('')
    setSubmitted(false)
    setShowModel(false)
    textareaRef.current?.focus()
  }, [prompt])

  const words = wordCount(text)
  const meetsMin = words >= minWords

  function handleSubmit() {
    setSubmitted(true)
  }

  function handleShowModel() {
    setShowModel(true)
    // # Writing tasks always count as "completed" (self-assessed).
    setTimeout(() => onComplete(true), 2000)
  }

  return (
    <div className="w-full max-w-2xl">
      {/* # Type + format label */}
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Writing
        </span>
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          {formatLabel(format)}
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          {timeMinutes} min
        </span>
      </div>

      {/* # Prompt */}
      <div className="mb-6 rounded-lg border border-border bg-muted/30 p-5">
        <p className="font-serif text-lg leading-relaxed">{prompt}</p>
      </div>

      {/* # Rubric criteria — compact horizontal pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {rubric.map((c) => (
          <span
            key={c.name}
            title={c.description}
            className="cursor-help rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
          >
            {c.name}
            <span className="ml-1 font-semibold">/{c.maxScore}</span>
          </span>
        ))}
      </div>

      {!submitted ? (
        <>
          {/* # Text area */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing here..."
            rows={10}
            className="mb-3 w-full resize-y rounded-lg border-2 border-foreground/20 bg-background p-4 text-base leading-relaxed outline-none transition-colors focus:border-foreground"
          />

          {/* # Word count bar */}
          <div className="mb-6 flex items-center justify-between text-sm">
            <span className={words > maxWords ? 'text-error font-semibold' : 'text-muted-foreground'}>
              {words} / {minWords}–{maxWords} words
            </span>
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full transition-all duration-300 ${
                  words >= minWords && words <= maxWords
                    ? 'bg-success'
                    : words > maxWords
                      ? 'bg-error'
                      : 'bg-foreground/40'
                }`}
                style={{ width: `${Math.min((words / minWords) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* # Submit */}
          <button
            onClick={handleSubmit}
            disabled={!meetsMin}
            className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
          >
            Submit Writing
          </button>
        </>
      ) : !showModel ? (
        // # Post-submission: self-assessment prompt
        <div className="text-center">
          <div className="mb-6 rounded-lg border border-border bg-muted/30 p-6">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Your response
            </p>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {text}
            </p>
          </div>
          <p className="mb-4 text-muted-foreground">
            Compare your writing with the model answer below.
          </p>
          <button
            onClick={handleShowModel}
            className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            Show Model Answer
          </button>
        </div>
      ) : (
        // # Model answer revealed
        <div className="rounded-lg border-2 border-success/30 bg-success/5 p-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-success">
            Model Answer
          </p>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {modelAnswer}
          </div>
        </div>
      )}
    </div>
  )
}
