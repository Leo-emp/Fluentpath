// # Lesson completion tracking — records which lessons a learner has finished.
// # One row per learner per lesson. Used by the Learning Path page to show
// # progress through the guided curriculum.

import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'

export const lessonCompletions = sqliteTable(
  'lesson_completions',
  {
    // # FK to learners table. CASCADE on delete.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // # Lesson ID — matches the static lesson data ID (e.g. 'a1-writing-simple-sentences').
    lessonId: text('lesson_id').notNull(),

    // # Epoch ms — when the learner completed this lesson.
    completedAt: integer('completed_at').notNull(),
  },
  (t) => ({
    // # Composite PK: a learner can complete each lesson only once.
    pk: primaryKey({ columns: [t.learnerId, t.lessonId] }),

    // # Fetch all completions for a learner (learning path progress).
    learnerIdx: index('lesson_completions_learner_idx').on(t.learnerId),
  }),
)
