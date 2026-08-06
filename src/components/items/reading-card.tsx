'use client'

// # Reading passage card — scrollable passage with comprehension questions.
// # Questions appear below the passage, one at a time (MCQ format).

import { useState, useEffect } from 'react'

interface ReadingQuestion {
  stem: string
  options: string[]
  correctIndex: number
}

interface ReadingCardProps {
  title: string
  passage: string
  source?: string
  questions: ReadingQuestion[]
  onComplete: (correct: boolean) => void
}

export function ReadingCard({ title, passage, source, questions, onComplete }: ReadingCardProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  // # Reset on new passage.
  useEffect(() => {
    setQuestionIndex(0)
    setSelected(null)
    setShowFeedback(false)
    setCorrectCount(0)
  }, [title])

  const question = questions[questionIndex]
  if (!question) return null

  // # Capture for closure narrowing — TS can't narrow across function boundaries.
  const currentQuestion = question

  function handleSelect(optIndex: number) {
    if (selected !== null) return
    setSelected(optIndex)
    setShowFeedback(true)

    const isCorrect = optIndex === currentQuestion.correctIndex
    if (isCorrect) setCorrectCount((c) => c + 1)

    setTimeout(() => {
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex((i) => i + 1)
        setSelected(null)
        setShowFeedback(false)
      } else {
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount
        onComplete(finalCorrect === questions.length)
      }
    }, 1200)
  }

  return (
    <div className="w-full max-w-2xl">
      {/* # Type label */}
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Reading
        </span>
        <span className="text-xs text-muted-foreground">
          Question {questionIndex + 1} of {questions.length}
        </span>
      </div>

      {/* # Passage area — scrollable with left accent border */}
      <div className="mb-8 max-h-64 overflow-y-auto rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="mb-3 font-serif text-lg font-bold">{title}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          {passage.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {source && (
          <p className="mt-4 text-xs italic text-muted-foreground">
            — {source}
          </p>
        )}
      </div>

      {/* # Question */}
      <p className="mb-6 font-serif text-xl leading-relaxed">
        {question.stem}
      </p>

      {/* # Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => {
          let className =
            'w-full rounded-lg border-2 border-foreground px-6 py-4 text-left text-base transition-colors'

          if (selected === i) {
            if (showFeedback) {
              className += i === question.correctIndex
                ? ' bg-success text-white border-success'
                : ' bg-error text-white border-error'
            } else {
              className += ' bg-foreground text-background'
            }
          } else if (showFeedback && i === question.correctIndex) {
            className += ' bg-success text-white border-success'
          } else {
            className += ' bg-background hover:bg-foreground hover:text-background'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={className}
            >
              <span className="mr-3 font-bold text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
