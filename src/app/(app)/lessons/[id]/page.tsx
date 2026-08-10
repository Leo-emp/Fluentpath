// # Lesson detail page — server component that resolves the lesson
// # server-side, keeping 2.6 MB of lesson data OFF the client bundle.
// # Only the single lesson's data is serialised to the client.

import { notFound } from 'next/navigation'
import { findLessonById, findNextLesson, resolveRelatedLessons } from '@/lib/reference/lesson-lookup'
import { LessonDetailClient } from './lesson-detail-client'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params

  // # Resolve the lesson server-side — data stays in the server bundle.
  const lesson = findLessonById(id)
  if (!lesson) notFound()

  const nextLesson = findNextLesson(lesson)
  const relatedLessons = resolveRelatedLessons(lesson)

  return (
    <LessonDetailClient
      lesson={lesson}
      nextLesson={nextLesson}
      relatedLessons={relatedLessons}
      isInitiallyCompleted={false}
    />
  )
}
