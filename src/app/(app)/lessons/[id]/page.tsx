'use client'

// # Individual lesson page — video player + lesson notes.
// # Video URL will come from database or blob storage in production.
// # For now, shows a placeholder with lesson info.

import { useParams } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LessonPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* # Video player area — placeholder until videos are uploaded */}
        <div className="mb-6 aspect-video w-full rounded-lg border border-border bg-muted">
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <span className="mb-2 text-4xl">&#9654;</span>
            <p className="text-sm">Video lesson: {id}</p>
            <p className="mt-1 text-xs">Video content coming soon</p>
          </div>
        </div>

        {/* # Lesson info */}
        <h1 className="mb-4 font-serif text-2xl font-bold">
          {formatTitle(id ?? '')}
        </h1>

        {/* # Quick actions */}
        <div className="mb-6 flex gap-3">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Lessons
          </Button>
        </div>

        {/* # Lesson notes / transcript area */}
        <Card className="border border-border p-6">
          <h2 className="mb-3 font-serif text-lg font-bold">Lesson Notes</h2>
          <p className="text-sm text-muted-foreground">
            Key takeaways and practice exercises will appear here alongside the video.
          </p>
        </Card>
      </main>
    </>
  )
}

// # Convert lesson slug to display title.
function formatTitle(id: string): string {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
