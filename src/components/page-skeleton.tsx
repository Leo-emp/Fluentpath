'use client'

// # Full-page loading skeleton — pulsing grey bars matching content layout.

export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl animate-pulse px-6 pt-20">
      <div className="mb-6 h-8 w-48 rounded bg-muted" />
      <div className="mb-4 h-4 w-full rounded bg-muted" />
      <div className="mb-4 h-4 w-3/4 rounded bg-muted" />
      <div className="mb-8 h-4 w-1/2 rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-lg bg-muted" />
        <div className="h-32 rounded-lg bg-muted" />
      </div>
    </div>
  )
}
