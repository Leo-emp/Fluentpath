'use client'

// # Multiple-choice question card — stem + 4 options + optional feedback.
// # Handles selection, correct/incorrect flash, keyboard shortcuts (1-4).

import { useState, useCallback, useEffect } from 'react'

interface McqOption {
  text: string
  misconception: string | null
}

interface McqCardProps {
  stem: string
  options: McqOption[]
  correctIndex?: number
  showFeedback: boolean
  onSelect: (selectedIndex: number) => void
}

export function McqCard({ stem, options, correctIndex, showFeedback, onSelect }: McqCardProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [feedbackVisible, setFeedbackVisible] = useState(false)

  // # Reset state when stem changes (new question).
  useEffect(() => {
    setSelected(null)
    setFeedbackVisible(false)
  }, [stem])

  const handleSelect = useCallback(
    (index: number) => {
      // # Ignore clicks after an option is already selected.
      if (selected !== null) return
      setSelected(index)

      if (showFeedback && correctIndex !== undefined) {
        // # Show green/red feedback for 800ms, then advance.
        setFeedbackVisible(true)
        setTimeout(() => {
          setFeedbackVisible(false)
          onSelect(index)
        }, 800)
      } else {
        // # No feedback (mock test mode) — brief highlight then advance.
        setTimeout(() => onSelect(index), 300)
      }
    },
    [selected, showFeedback, correctIndex, onSelect],
  )

  // # Keyboard shortcuts: 1-4 to select options.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const num = parseInt(e.key)
      if (num >= 1 && num <= options.length) {
        handleSelect(num - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSelect, options.length])

  const isCorrect = selected !== null && selected === correctIndex
  const selectedMisconception =
    selected !== null ? options[selected]?.misconception : null

  return (
    <div className="w-full max-w-lg">
      {/* # Question stem — large serif heading */}
      <p className="mb-8 text-center font-serif text-2xl leading-relaxed">
        {stem}
      </p>
      {/* # Answer options — stacked vertically */}
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => {
          let className =
            'w-full rounded-lg border-2 border-foreground px-6 py-4 text-left text-lg transition-colors'

          if (selected === i) {
            if (feedbackVisible && correctIndex !== undefined) {
              // # Selected + feedback visible: green if correct, red if wrong.
              className += isCorrect
                ? ' bg-success text-white border-success'
                : ' bg-error text-white border-error'
            } else {
              // # Selected, no feedback yet: solid black fill.
              className += ' bg-foreground text-background'
            }
          } else if (feedbackVisible && i === correctIndex) {
            // # Not selected but IS the correct answer — show green.
            className += ' bg-success text-white border-success'
          } else {
            // # Unselected default state.
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
                {i + 1}
              </span>
              {opt.text}
            </button>
          )
        })}
      </div>
      {/* # Misconception explanation — shown briefly after wrong answer */}
      {feedbackVisible && !isCorrect && selectedMisconception && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {selectedMisconception}
        </p>
      )}
    </div>
  )
}
