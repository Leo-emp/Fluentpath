'use client'

// # Full-screen distraction-free session wrapper.
// # Progress bar at top, quit link top-right, content centered.

import { ProgressBar } from '@/components/progress-bar'

interface SessionShellProps {
  children: React.ReactNode
  current: number
  total: number
  onQuit: () => void
}

export function SessionShell({ children, current, total, onQuit }: SessionShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* # Thin progress indicator across top edge */}
      <ProgressBar current={current} total={total} />
      <div className="flex items-center justify-end px-6 py-3">
        <button
          onClick={onQuit}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Quit
        </button>
      </div>
      {/* # Main content area — vertically + horizontally centered */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {children}
      </div>
    </div>
  )
}
