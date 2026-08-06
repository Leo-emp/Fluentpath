// # Gamification schema — streaks, XP, badges, and daily activity tracking.
// # This is the engagement layer that drives retention:
// # - Streaks: consecutive days of practice (Duolingo-style)
// # - XP: experience points earned from completing items/sessions
// # - Badges: achievements unlocked by milestones
// # - Daily log: tracks whether the learner was active each day

import { sqliteTable, text, integer, index, primaryKey } from 'drizzle-orm/sqlite-core'
import { learners } from './learners'

// # ═══════════════════════════════════════════════════════════════════
// # LEARNER STREAKS — one row per learner, updated daily
// # ═══════════════════════════════════════════════════════════════════

export const learnerStreaks = sqliteTable(
  'learner_streaks',
  {
    // # FK to learners table. One streak record per learner.
    learnerId: text('learner_id')
      .primaryKey()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // # Current consecutive days of practice.
    currentStreak: integer('current_streak').notNull().default(0),

    // # All-time longest streak (never decreases).
    longestStreak: integer('longest_streak').notNull().default(0),

    // # Date string (YYYY-MM-DD) of last activity. Used to determine
    // # if the streak continues, resets, or is already counted today.
    lastActiveDate: text('last_active_date'),

    // # Total XP accumulated across all time.
    totalXp: integer('total_xp').notNull().default(0),

    // # XP earned this week (resets every Monday). For weekly leaderboard.
    weeklyXp: integer('weekly_xp').notNull().default(0),

    // # ISO date of the Monday that weeklyXp counts from.
    weekStartDate: text('week_start_date'),

    // # Epoch ms — when streak tracking was initialised.
    createdAt: integer('created_at').notNull(),

    // # Epoch ms — last update to this record.
    updatedAt: integer('updated_at').notNull(),
  },
)

// # ═══════════════════════════════════════════════════════════════════
// # DAILY ACTIVITY LOG — one row per learner per day
// # ═══════════════════════════════════════════════════════════════════
// # Used for the "activity heatmap" (GitHub-style contribution graph)
// # and for streak verification.

export const dailyActivity = sqliteTable(
  'daily_activity',
  {
    // # FK to learners table.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // # Date string (YYYY-MM-DD) — one row per day per learner.
    activityDate: text('activity_date').notNull(),

    // # Number of items completed on this date.
    itemsCompleted: integer('items_completed').notNull().default(0),

    // # XP earned on this date.
    xpEarned: integer('xp_earned').notNull().default(0),

    // # Minutes spent practicing on this date.
    minutesPracticed: integer('minutes_practiced').notNull().default(0),

    // # Number of practice/test sessions completed.
    sessionsCompleted: integer('sessions_completed').notNull().default(0),
  },
  (t) => ({
    // # Composite PK: one row per learner per day.
    pk: primaryKey({ columns: [t.learnerId, t.activityDate] }),

    // # Fetch all activity for a learner (heatmap, weekly stats).
    learnerIdx: index('daily_activity_learner_idx').on(t.learnerId),
  }),
)

// # ═══════════════════════════════════════════════════════════════════
// # BADGES / ACHIEVEMENTS — earned once, kept forever
// # ═══════════════════════════════════════════════════════════════════

// # All possible badge types. Add new ones to this array.
export const BADGE_TYPES = [
  'first_practice',        // # Complete your first practice session
  'first_mock_test',       // # Complete your first mock test
  'streak_3',              // # 3-day streak
  'streak_7',              // # 7-day streak
  'streak_30',             // # 30-day streak
  'streak_100',            // # 100-day streak
  'xp_100',                // # Earn 100 XP total
  'xp_500',                // # Earn 500 XP total
  'xp_1000',               // # Earn 1000 XP total
  'xp_5000',               // # Earn 5000 XP total
  'items_50',              // # Complete 50 items
  'items_200',             // # Complete 200 items
  'items_1000',            // # Complete 1000 items
  'level_a2',              // # Reach A2 level
  'level_b1',              // # Reach B1 level
  'level_b2',              // # Reach B2 level
  'level_c1',              // # Reach C1 level
  'level_c2',              // # Reach C2 level
  'perfect_session',       // # Complete a session with 100% accuracy
  'all_skills',            // # Practice all 4 skills in one day
  'night_owl',             // # Practice after midnight
  'early_bird',            // # Practice before 6am
  'writing_warrior',       // # Complete 20 writing tasks
  'reading_master',        // # Complete 20 reading passages
  'listening_pro',         // # Complete 20 listening items
  'speaking_star',         // # Complete 20 speaking prompts
] as const

export type BadgeType = (typeof BADGE_TYPES)[number]

export const learnerBadges = sqliteTable(
  'learner_badges',
  {
    // # FK to learners table.
    learnerId: text('learner_id')
      .notNull()
      .references(() => learners.id, { onDelete: 'cascade' }),

    // # Which badge was earned.
    badgeType: text('badge_type').notNull(),

    // # Epoch ms — when the badge was earned.
    earnedAt: integer('earned_at').notNull(),
  },
  (t) => ({
    // # Composite PK: a learner can earn each badge only once.
    pk: primaryKey({ columns: [t.learnerId, t.badgeType] }),

    // # "Show all my badges" query.
    learnerIdx: index('learner_badges_learner_idx').on(t.learnerId),
  }),
)
