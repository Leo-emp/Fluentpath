'use client'

// # Matching card — two columns, select left then right to create pairs.
// # Connected pairs shown with numbering. Check reveals correct matches.

import { useState, useEffect, useMemo } from 'react'

interface MatchPair {
  left: string
  right: string
}

interface MatchingCardProps {
  stem: string
  pairs: MatchPair[]
  onComplete: (correct: boolean) => void
}

// # Deterministic shuffle.
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

export function MatchingCard({ stem, pairs, onComplete }: MatchingCardProps) {
  // # Shuffle right column independently.
  const shuffledRight = useMemo(() => {
    const indexed = pairs.map((p, i) => ({ text: p.right, originalIndex: i }))
    return shuffle(indexed, stem.length * 37 + pairs.length)
  }, [stem, pairs])

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [matches, setMatches] = useState<Map<number, number>>(new Map())
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<Map<number, boolean>>(new Map())

  useEffect(() => {
    setSelectedLeft(null)
    setMatches(new Map())
    setSubmitted(false)
    setResults(new Map())
  }, [stem])

  function handleLeftClick(leftIndex: number) {
    if (submitted) return
    // # If already matched, un-match.
    if (matches.has(leftIndex)) {
      const next = new Map(matches)
      next.delete(leftIndex)
      setMatches(next)
      setSelectedLeft(null)
      return
    }
    setSelectedLeft(leftIndex)
  }

  function handleRightClick(shuffledRightIndex: number) {
    if (submitted || selectedLeft === null) return
    // # Check if this right side is already matched.
    const rightAlreadyUsed = [...matches.values()].includes(shuffledRightIndex)
    if (rightAlreadyUsed) return

    const next = new Map(matches)
    next.set(selectedLeft, shuffledRightIndex)
    setMatches(next)
    setSelectedLeft(null)
  }

  function handleSubmit() {
    const res = new Map<number, boolean>()
    for (const [leftIdx, shuffledRightIdx] of matches) {
      const rightItem = shuffledRight[shuffledRightIdx]
      res.set(leftIdx, rightItem?.originalIndex === leftIdx)
    }
    setResults(res)
    setSubmitted(true)

    const allCorrect = res.size === pairs.length && [...res.values()].every(Boolean)
    setTimeout(() => onComplete(allCorrect), 2000)
  }

  // # Which right-side indices are already matched?
  const usedRight = new Set(matches.values())

  return (
    <div className="w-full max-w-2xl">
      {/* # Type label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Matching
        </span>
      </div>

      {/* # Instruction */}
      <p className="mb-6 font-serif text-xl leading-relaxed">{stem}</p>

      {/* # Two-column layout */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* # Left column */}
        <div className="flex flex-col gap-2">
          {pairs.map((pair, leftIdx) => {
            const isMatched = matches.has(leftIdx)
            const isActive = selectedLeft === leftIdx

            let className =
              'rounded-lg border-2 px-4 py-3 text-left text-sm transition-all cursor-pointer select-none'

            if (submitted) {
              className += results.get(leftIdx)
                ? ' border-success bg-success/10'
                : ' border-error bg-error/10'
            } else if (isActive) {
              className += ' border-foreground bg-foreground/5 ring-2 ring-foreground/20'
            } else if (isMatched) {
              className += ' border-foreground bg-foreground/5'
            } else {
              className += ' border-foreground/20 hover:border-foreground'
            }

            return (
              <button key={leftIdx} onClick={() => handleLeftClick(leftIdx)} className={className}>
                <span className="flex items-center gap-2">
                  {isMatched && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                      {[...matches.keys()].indexOf(leftIdx) + 1}
                    </span>
                  )}
                  <span>{pair.left}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* # Right column (shuffled) */}
        <div className="flex flex-col gap-2">
          {shuffledRight.map((item, shuffledIdx) => {
            const isUsed = usedRight.has(shuffledIdx)
            // # Find which left index this is matched to.
            const matchedLeftIdx = [...matches.entries()].find(([, r]) => r === shuffledIdx)?.[0]

            let className =
              'rounded-lg border-2 px-4 py-3 text-left text-sm transition-all cursor-pointer select-none'

            if (submitted && matchedLeftIdx !== undefined) {
              className += results.get(matchedLeftIdx)
                ? ' border-success bg-success/10'
                : ' border-error bg-error/10'
            } else if (isUsed) {
              className += ' border-foreground bg-foreground/5'
            } else if (selectedLeft !== null) {
              className += ' border-foreground/40 hover:border-foreground hover:bg-foreground/5'
            } else {
              className += ' border-foreground/20'
            }

            return (
              <button
                key={shuffledIdx}
                onClick={() => handleRightClick(shuffledIdx)}
                disabled={submitted || selectedLeft === null}
                className={className}
              >
                <span className="flex items-center gap-2">
                  {isUsed && matchedLeftIdx !== undefined && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                      {[...matches.keys()].indexOf(matchedLeftIdx) + 1}
                    </span>
                  )}
                  <span>{item.text}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* # Correct pairs after wrong submission */}
      {submitted && [...results.values()].some((r) => !r) && (
        <div className="mb-4 rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Correct matches
          </p>
          {pairs.map((pair, i) => (
            <p key={i} className="text-sm">
              <span className="font-semibold">{pair.left}</span>
              <span className="mx-2 text-muted-foreground">→</span>
              {pair.right}
            </p>
          ))}
        </div>
      )}

      {/* # Submit */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={matches.size !== pairs.length}
          className="w-full rounded-lg border-2 border-foreground bg-foreground px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
        >
          Check Matches ({matches.size}/{pairs.length})
        </button>
      )}
    </div>
  )
}
