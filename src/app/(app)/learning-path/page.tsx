// # Learning Path page — server component that passes the flat
// # lesson list to the client, keeping 2.6 MB OFF the client bundle.

import { ALL_LESSONS } from '@/lib/reference/lesson-lookup'
import { LearningPathClient } from './learning-path-client'

export default function LearningPathPage() {
  return <LearningPathClient allLessons={ALL_LESSONS} />
}
