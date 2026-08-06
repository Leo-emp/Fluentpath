'use client'

// # Reorder card — shuffled sentences, click to build sequence.
// # Learner clicks sentences in order; numbered badges show position.

import { useState, useEffect, useMemo } from 'react'

interface ReorderCardProps {
  stem: string
  sentences: string[]
  onComplete: (correct: boolean) => void
}

// # Deterministic shuffle from seed (Fisher-Yates).
function shuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr]
  let s = seed
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647
    const j = s % (i + 1)
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}

export function ReorderCard({ stem, sentences, onComplete }: ReorderCardProps) {
  // # Create shuffled order (with original indices preserved).
  const shuffled = useMemo(() => {
    const indexed = sentences.map((text, originalIndex) => ({ text, originalIndex }))
    const seed = stem.length * 31 + sentences.length
    return shuffle(indexed, seed)
  }, [stem, sentences])

  const [selectedOrder, setSelectedOrder] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setSelectedOrder([])
    setSubmitted(false)
    setIsCorrect(false)
  }, [stem])

  // # Toggle a sentence in/out of the selected order.
  function handleClick(shuffledIndex: number) {
    if (submitted) return
    if (selectedOrder.includes(shuffledIndex)) {
      // # Remove and adjust subsequent selections.
      setSelectedOrder(selectedOrder.filter((i) => i !== shuffledIndex))
    } else {
      setSelectedOrder([...selectedOrder, shuffledIndex])
    }
  }

  function handleSubmit() {
    // # Check if the user's order produces the correct original sequence.
    const userSequence = selectedOrder.map((si) => shuffled[si]!.originalIndex)
    const correctSequence = sentences.map((_, i) => i)
    const correct = JSON.stringify(userSequence) === JSON.stringify(correctSequence)
    setIsCorrect(correct)
    setSubmitted(true)
    setTimeout(() => onComplete(correct), 1800)
  }

  function handleReset() {
    setSelectedOrder([])
  }

  return (
    <div className="w-full max-w-lg">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Reorder
        </span>
      </div>

      {/* # Instruction */}
      <p className="mb-6 font-serif text-xl leading-relaxed">{stem}</p>

      {/* # Sentences — click to select order */}
      <div className="mb-6 flex flex-col gap-3">
        {shuffled.map((item, shuffledIdx) => {
          const position = selectedOrder.indexOf(shuffledIdx)
          const isSelected = position !== -1

          let className =
            'w-full rounded-lg border-2 px-5 py-4 text-left text-base transition-all cursor-pointer select-none'

          if (submitted) {
            if (isSelected) {
              const userPos = position
              const isRightPlace = shuffled[selectedOrder[userPos]!]!.originalIndex === userPos
              className += isRightPlace
                ? ' border-success bg-success/10'
                : ' border-error bg-error/10'
            } else {
              className += ' border-border opacity-40'
            }
          } else if (isSelected) {
            className += ' border-foreground bg-foreground/5'
          } else {
            className += ' border-foreground/20 hover:border-foreground'
          }

          return (
            <button
              key={shuffledIdx}
              onClick={() => handleClick(shuffledIdx)}
              disabled={submitted}
              className={className}
            >
              <span className="flex items-center gap-3">
                {/* # Position badge */}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isSelected
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isSelected ? position + 1 : '·'}
                </span>
                <span>{item.text}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* # Correct order shown after wrong submission */}
      {submitted && !isCorrect && (
        <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Correct order
          </p>
          {sentences.map((s, i) => (
            <p key={i} className="text-sm">
              <span className="mr-2 font-bold text-muted-foreground">{i + 1}.</span>
              {s}
            </p>
          ))}
        </div>
      )}

      {/* # Action buttons */}
      {!submitted && (
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={selectedOrder.length === 0}
            className="rounded-lg border-2 border-foreground/20 px-6 py-4 text-base text-muted-foreground transition-colors hover:border-foreground disabled:opacity-40"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedOrder.length !== sentences.length}
            className="flex-1 rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
          >
            Check Order
          </button>
        </div>
      )}
    </div>
  )
}
