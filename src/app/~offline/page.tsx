'use client'

// # Offline fallback page — shown when the user has no internet connection.

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 font-serif text-4xl font-bold">You&apos;re Offline</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        FluentPath needs an internet connection to load lessons and track your progress.
        Please reconnect and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-md border border-foreground px-6 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
      >
        Try Again
      </button>
    </main>
  )
}
