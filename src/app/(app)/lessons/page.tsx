'use client'

// # Video lessons page — lists available video lessons by skill and level.
// # Lessons link to individual lesson pages with embedded video player.

import { NavBar } from '@/components/nav-bar'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

// # Lesson metadata — will eventually come from the database.
// # For now, a static registry of available video lessons.
const LESSONS = [
  {
    id: 'ielts-writing-task1',
    title: 'IELTS Writing Task 1: Graphs & Charts',
    description: 'Learn the structure and language for describing visual data in Task 1.',
    skill: 'writing',
    level: 'B2',
    duration: '12 min',
    thumbnail: null,
  },
  {
    id: 'ielts-writing-task2',
    title: 'IELTS Writing Task 2: Essay Structure',
    description: 'Master the 4-paragraph essay structure that examiners expect.',
    skill: 'writing',
    level: 'B2',
    duration: '15 min',
    thumbnail: null,
  },
  {
    id: 'ielts-speaking-part1',
    title: 'IELTS Speaking Part 1: Common Topics',
    description: 'Practice answering personal questions with extended responses.',
    skill: 'speaking',
    level: 'B1',
    duration: '10 min',
    thumbnail: null,
  },
  {
    id: 'ielts-speaking-part2',
    title: 'IELTS Speaking Part 2: Cue Card Strategy',
    description: 'Learn the 1-minute preparation technique for the long turn.',
    skill: 'speaking',
    level: 'B2',
    duration: '11 min',
    thumbnail: null,
  },
  {
    id: 'ielts-reading-strategy',
    title: 'IELTS Reading: Skimming & Scanning',
    description: 'Essential speed-reading techniques for the Reading test.',
    skill: 'reading',
    level: 'B2',
    duration: '13 min',
    thumbnail: null,
  },
  {
    id: 'ielts-listening-sections',
    title: 'IELTS Listening: All 4 Sections Explained',
    description: 'What to expect in each Listening section and how to prepare.',
    skill: 'listening',
    level: 'B1',
    duration: '14 min',
    thumbnail: null,
  },
  {
    id: 'grammar-conditionals',
    title: 'Conditionals: Zero to Third',
    description: 'All conditional forms explained with examples and practice.',
    skill: 'general',
    level: 'B1',
    duration: '16 min',
    thumbnail: null,
  },
  {
    id: 'grammar-passive-voice',
    title: 'Passive Voice for Academic Writing',
    description: 'When and how to use passive constructions in IELTS writing.',
    skill: 'writing',
    level: 'B2',
    duration: '9 min',
    thumbnail: null,
  },
]

export default function LessonsPage() {
  const router = useRouter()

  const skillColors: Record<string, string> = {
    reading: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    writing: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    speaking: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    listening: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    general: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  }

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 font-serif text-3xl font-bold">Video Lessons</h1>
        <p className="mb-8 text-muted-foreground">
          Watch expert explanations of key topics and strategies.
        </p>

        <div className="space-y-3">
          {LESSONS.map(lesson => (
            <Card
              key={lesson.id}
              className="cursor-pointer border border-border p-4 transition-colors hover:bg-muted"
              onClick={() => router.push(`/lessons/${lesson.id}`)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{lesson.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${skillColors[lesson.skill] ?? ''}`}>
                      {lesson.skill}
                    </span>
                    <span className="text-xs text-muted-foreground">{lesson.level}</span>
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}
