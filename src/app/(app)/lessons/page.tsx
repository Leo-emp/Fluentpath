// # Lessons library page — server component that resolves categories
// # server-side, keeping all lesson data OFF the client bundle.

import { ALL_LESSON_CATEGORIES } from '@/lib/reference/lesson-lookup'
import { LessonsListClient } from './lessons-list-client'

export default function LessonsPage() {
  return <LessonsListClient categories={ALL_LESSON_CATEGORIES} />
}
