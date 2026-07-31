'use client'

// # Thin progress bar — sits at the top of session flows.

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="h-1 w-full bg-muted">
      <div
        className="h-full bg-foreground transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
