// # Server-side lesson lookup — single import point for resolving
// # lessons by ID without shipping 2.6 MB of data to the browser.
// # This module is imported ONLY in server components / API routes.

import type { LessonCategory, Lesson } from './types'
import { LESSON_CATEGORIES } from './lesson-data'
import { LESSON_CATEGORIES_2 } from './lesson-data-2'
import { LESSON_CATEGORIES_3 } from './lesson-data-3'
import { LESSON_CATEGORIES_4 } from './lesson-data-4'
import { LESSON_CATEGORIES_5 } from './lesson-data-5'
import { LESSON_CATEGORIES_6 } from './lesson-data-6'
import { LESSON_CATEGORIES_7 } from './lesson-data-7'
import { LESSON_CATEGORIES_8 } from './lesson-data-8'
import { LESSON_CATEGORIES_9 } from './lesson-data-9'
import { LESSON_CATEGORIES_10 } from './lesson-data-10'
import { LESSON_CATEGORIES_11 } from './lesson-data-11'
import { LESSON_CATEGORIES_12 } from './lesson-data-12'
import { LESSON_CATEGORIES_13 } from './lesson-data-13'
import { LESSON_CATEGORIES_14 } from './lesson-data-14'
import { LESSON_CATEGORIES_15 } from './lesson-data-15'
import { LESSON_CATEGORIES_16 } from './lesson-data-16'
import { LESSON_CATEGORIES_17 } from './lesson-data-17'
import { LESSON_CATEGORIES_18 } from './lesson-data-18'
import { LESSON_CATEGORIES_19 } from './lesson-data-19'
import { LESSON_CATEGORIES_20 } from './lesson-data-20'
import { LESSON_CATEGORIES_21 } from './lesson-data-21'
import { LESSON_CATEGORIES_22 } from './lesson-data-22'
import { LESSON_CATEGORIES_23 } from './lesson-data-23'
import { LESSON_CATEGORIES_24 } from './lesson-data-24'
import { LESSON_CATEGORIES_25 } from './lesson-data-25'
import { LESSON_CATEGORIES_26 } from './lesson-data-26'
import { LESSON_CATEGORIES_27 } from './lesson-data-27'
import { LESSON_CATEGORIES_28 } from './lesson-data-28'
import { LESSON_CATEGORIES_29 } from './lesson-data-29'
import { LESSON_CATEGORIES_30 } from './lesson-data-30'
import { LESSON_CATEGORIES_31 } from './lesson-data-31'
import { LESSON_CATEGORIES_32 } from './lesson-data-32'

// # Merge lesson categories from multiple data files.
function mergeLessonCategories(...sources: LessonCategory[][]): LessonCategory[] {
  const merged = new Map<string, LessonCategory>()
  for (const source of sources) {
    for (const cat of source) {
      const existing = merged.get(cat.id)
      if (existing) {
        existing.lessons = [...existing.lessons, ...cat.lessons]
      } else {
        merged.set(cat.id, { ...cat, lessons: [...cat.lessons] })
      }
    }
  }
  return Array.from(merged.values())
}

// # Merged categories — computed once per server boot.
export const ALL_LESSON_CATEGORIES = mergeLessonCategories(
  LESSON_CATEGORIES, LESSON_CATEGORIES_2, LESSON_CATEGORIES_3,
  LESSON_CATEGORIES_4, LESSON_CATEGORIES_5, LESSON_CATEGORIES_6,
  LESSON_CATEGORIES_7, LESSON_CATEGORIES_8, LESSON_CATEGORIES_9,
  LESSON_CATEGORIES_10, LESSON_CATEGORIES_11, LESSON_CATEGORIES_12,
  LESSON_CATEGORIES_13, LESSON_CATEGORIES_14, LESSON_CATEGORIES_15,
  LESSON_CATEGORIES_16, LESSON_CATEGORIES_17, LESSON_CATEGORIES_18,
  LESSON_CATEGORIES_19, LESSON_CATEGORIES_20, LESSON_CATEGORIES_21,
  LESSON_CATEGORIES_22, LESSON_CATEGORIES_23, LESSON_CATEGORIES_24,
  LESSON_CATEGORIES_25, LESSON_CATEGORIES_26, LESSON_CATEGORIES_27,
  LESSON_CATEGORIES_28, LESSON_CATEGORIES_29, LESSON_CATEGORIES_30,
  LESSON_CATEGORIES_31, LESSON_CATEGORIES_32,
)

// # Flat list of all lessons — for ID lookups.
export const ALL_LESSONS = ALL_LESSON_CATEGORIES.flatMap(c => c.lessons)

// # Lookup a single lesson by ID.
export function findLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find(l => l.id === id)
}

// # Find the next lesson in the same skill+level group.
export function findNextLesson(lesson: Lesson): Lesson | null {
  const sameSkilllevel = ALL_LESSONS.filter(
    l => l.level === lesson.level && l.skill === lesson.skill,
  )
  const idx = sameSkilllevel.findIndex(l => l.id === lesson.id)
  return idx >= 0 && idx < sameSkilllevel.length - 1 ? sameSkilllevel[idx + 1]! : null
}

// # Resolve related lesson IDs to full lesson objects.
export function resolveRelatedLessons(lesson: Lesson): Lesson[] {
  return (lesson.relatedLessons ?? [])
    .map(rid => ALL_LESSONS.find(l => l.id === rid))
    .filter(Boolean) as Lesson[]
}
