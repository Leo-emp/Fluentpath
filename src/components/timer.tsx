'use client'

// # Countdown timer — displays MM:SS, bold when under warn threshold.

import { useState, useEffect, useRef } from 'react'

interface TimerProps {
  durationMs: number
  onExpire: () => void
  warnAtMs?: number
}

export function Timer({ durationMs, onExpire, warnAtMs = 300_000 }: TimerProps) {
  const [remaining, setRemaining] = useState(durationMs)
  const expiredRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1000
        if (next <= 0 && !expiredRef.current) {
          expiredRef.current = true
          onExpire()
          return 0
        }
        return Math.max(0, next)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [onExpire])

  const mins = Math.floor(remaining / 60_000)
  const secs = Math.floor((remaining % 60_000) / 1000)
  // # Bold text when time is running low.
  const warn = remaining <= warnAtMs

  return (
    <span className={`font-mono tabular-nums ${warn ? 'font-bold' : ''}`}>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  )
}
