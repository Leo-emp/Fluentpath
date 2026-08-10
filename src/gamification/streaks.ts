// # Streak service — manages daily streaks and activity logging.
// # Called at the end of every practice/test session to update the
// # learner's streak, record daily activity, and check for new badges.

import type { Db } from '@/db/client'
import { learnerStreaks, dailyActivity, learnerBadges } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { streakBonusXp } from './xp'

// # Format a timestamp as YYYY-MM-DD in UTC.
function toDateString(epochMs: number): string {
  return new Date(epochMs).toISOString().slice(0, 10)
}

// # Get the Monday of the week containing a given date (ISO weeks).
function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  const day = d.getUTCDay()
  // # Sunday = 0, Monday = 1, etc. Shift so Monday = 0.
  const diff = (day === 0 ? 6 : day - 1)
  d.setUTCDate(d.getUTCDate() - diff)
  return d.toISOString().slice(0, 10)
}

// # Check if two date strings are consecutive days.
function isYesterday(lastDate: string, todayDate: string): boolean {
  const last = new Date(lastDate + 'T00:00:00Z')
  const today = new Date(todayDate + 'T00:00:00Z')
  const diffMs = today.getTime() - last.getTime()
  return diffMs === 86_400_000 // # exactly one day
}

// # ═══════════════════════════════════════════════════════════════════
// # RECORD ACTIVITY — call after each session completion
// # ═══════════════════════════════════════════════════════════════════

export interface ActivityEvent {
  // # How many items were completed in this session.
  itemsCompleted: number
  // # XP earned from items (before streak bonus).
  xpEarned: number
  // # Approximate minutes spent on the session.
  minutesPracticed: number
  // # Whether this was a full session completion (vs partial).
  sessionCompleted: boolean
}

export interface ActivityResult {
  // # Updated streak count.
  currentStreak: number
  // # Whether the streak just increased (for UI celebration).
  streakIncreased: boolean
  // # Streak bonus XP awarded (0 if streak < 3 days).
  streakBonusXp: number
  // # Total XP for this event (items + streak bonus).
  totalXpAwarded: number
  // # Any new badges earned during this event.
  newBadges: string[]
}

export async function recordActivity(
  db: Db,
  learnerId: string,
  event: ActivityEvent,
  now: number,
): Promise<ActivityResult> {
  const todayDate = toDateString(now)
  const weekStart = getWeekStart(todayDate)

  // # 1. Get or create the streak record.
  const existing = await db.select()
    .from(learnerStreaks)
    .where(eq(learnerStreaks.learnerId, learnerId))
    .limit(1)

  let streak = existing[0]
  let streakIncreased = false
  let bonus = 0

  if (!streak) {
    // # First ever activity — create streak record.
    await db.insert(learnerStreaks).values({
      learnerId,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: todayDate,
      totalXp: event.xpEarned,
      weeklyXp: event.xpEarned,
      weekStartDate: weekStart,
      createdAt: now,
      updatedAt: now,
    })
    streakIncreased = true
    streak = { learnerId, currentStreak: 1, longestStreak: 1, lastActiveDate: todayDate, totalXp: event.xpEarned, weeklyXp: event.xpEarned, dailyXpGoal: 0, weekStartDate: weekStart, createdAt: now, updatedAt: now }
  } else {
    // # Calculate new streak value based on last active date.
    let newStreak = streak.currentStreak

    if (streak.lastActiveDate === todayDate) {
      // # Already active today — streak doesn't change, no bonus.
      streakIncreased = false
    } else if (streak.lastActiveDate && isYesterday(streak.lastActiveDate, todayDate)) {
      // # Consecutive day — streak continues!
      newStreak = streak.currentStreak + 1
      streakIncreased = true
      bonus = streakBonusXp(newStreak)
    } else {
      // # Gap of 2+ days — streak resets to 1.
      newStreak = 1
      streakIncreased = true
    }

    const newLongest = Math.max(streak.longestStreak, newStreak)

    // # Reset weekly XP if we've crossed into a new week.
    const newWeeklyXp = weekStart === streak.weekStartDate
      ? streak.weeklyXp + event.xpEarned + bonus
      : event.xpEarned + bonus

    await db.update(learnerStreaks)
      .set({
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastActiveDate: todayDate,
        totalXp: streak.totalXp + event.xpEarned + bonus,
        weeklyXp: newWeeklyXp,
        weekStartDate: weekStart,
        updatedAt: now,
      })
      .where(eq(learnerStreaks.learnerId, learnerId))

    streak = { ...streak, currentStreak: newStreak, totalXp: streak.totalXp + event.xpEarned + bonus }
  }

  // # 2. Upsert daily activity log.
  const existingDay = await db.select()
    .from(dailyActivity)
    .where(and(
      eq(dailyActivity.learnerId, learnerId),
      eq(dailyActivity.activityDate, todayDate),
    ))
    .limit(1)

  if (existingDay[0]) {
    await db.update(dailyActivity)
      .set({
        itemsCompleted: existingDay[0].itemsCompleted + event.itemsCompleted,
        xpEarned: existingDay[0].xpEarned + event.xpEarned + bonus,
        minutesPracticed: existingDay[0].minutesPracticed + event.minutesPracticed,
        sessionsCompleted: existingDay[0].sessionsCompleted + (event.sessionCompleted ? 1 : 0),
      })
      .where(and(
        eq(dailyActivity.learnerId, learnerId),
        eq(dailyActivity.activityDate, todayDate),
      ))
  } else {
    await db.insert(dailyActivity).values({
      learnerId,
      activityDate: todayDate,
      itemsCompleted: event.itemsCompleted,
      xpEarned: event.xpEarned + bonus,
      minutesPracticed: event.minutesPracticed,
      sessionsCompleted: event.sessionCompleted ? 1 : 0,
    })
  }

  // # 3. Check for new badges.
  const newBadges = await checkAndAwardBadges(db, learnerId, streak!, now)

  return {
    currentStreak: streak!.currentStreak,
    streakIncreased,
    streakBonusXp: bonus,
    totalXpAwarded: event.xpEarned + bonus,
    newBadges,
  }
}

// # ═══════════════════════════════════════════════════════════════════
// # BADGE CHECKING — award badges when milestones are reached
// # ═══════════════════════════════════════════════════════════════════

async function checkAndAwardBadges(
  db: Db,
  learnerId: string,
  streak: { currentStreak: number; totalXp: number },
  now: number,
): Promise<string[]> {
  // # Get already-earned badges to avoid re-awarding.
  const earned = await db.select({ badgeType: learnerBadges.badgeType })
    .from(learnerBadges)
    .where(eq(learnerBadges.learnerId, learnerId))
  const earnedSet = new Set(earned.map(b => b.badgeType))

  const newBadges: string[] = []

  // # Streak badges.
  const streakMilestones = [
    { threshold: 3, badge: 'streak_3' },
    { threshold: 7, badge: 'streak_7' },
    { threshold: 30, badge: 'streak_30' },
    { threshold: 100, badge: 'streak_100' },
  ] as const
  for (const { threshold, badge } of streakMilestones) {
    if (streak.currentStreak >= threshold && !earnedSet.has(badge)) {
      newBadges.push(badge)
    }
  }

  // # XP badges.
  const xpMilestones = [
    { threshold: 100, badge: 'xp_100' },
    { threshold: 500, badge: 'xp_500' },
    { threshold: 1000, badge: 'xp_1000' },
    { threshold: 5000, badge: 'xp_5000' },
  ] as const
  for (const { threshold, badge } of xpMilestones) {
    if (streak.totalXp >= threshold && !earnedSet.has(badge)) {
      newBadges.push(badge)
    }
  }

  // # Item-count badges — sum all daily activity items for this learner.
  const itemBadges = [
    { threshold: 50, badge: 'items_50' },
    { threshold: 200, badge: 'items_200' },
    { threshold: 1000, badge: 'items_1000' },
  ] as const
  const needsItemCheck = itemBadges.some(m => !earnedSet.has(m.badge))
  if (needsItemCheck) {
    const rows = await db.select({ items: dailyActivity.itemsCompleted })
      .from(dailyActivity)
      .where(eq(dailyActivity.learnerId, learnerId))
    const totalItems = rows.reduce((sum, r) => sum + r.items, 0)
    for (const { threshold, badge } of itemBadges) {
      if (totalItems >= threshold && !earnedSet.has(badge)) {
        newBadges.push(badge)
      }
    }
  }

  // # Time-of-day badges — check current hour (UTC).
  const hour = new Date(now).getUTCHours()
  if (hour >= 0 && hour < 5 && !earnedSet.has('night_owl')) {
    newBadges.push('night_owl')
  }
  if (hour >= 4 && hour < 6 && !earnedSet.has('early_bird')) {
    newBadges.push('early_bird')
  }

  // # Insert all new badges.
  for (const badge of newBadges) {
    await db.insert(learnerBadges).values({
      learnerId,
      badgeType: badge,
      earnedAt: now,
    })
  }

  return newBadges
}

// # ═══════════════════════════════════════════════════════════════════
// # READ FUNCTIONS — for dashboard display
// # ═══════════════════════════════════════════════════════════════════

// # Get a learner's current streak and XP stats.
export async function getStreakStats(db: Db, learnerId: string) {
  const rows = await db.select()
    .from(learnerStreaks)
    .where(eq(learnerStreaks.learnerId, learnerId))
    .limit(1)

  if (!rows[0]) {
    return { currentStreak: 0, longestStreak: 0, totalXp: 0, weeklyXp: 0 }
  }

  return {
    currentStreak: rows[0].currentStreak,
    longestStreak: rows[0].longestStreak,
    totalXp: rows[0].totalXp,
    weeklyXp: rows[0].weeklyXp,
  }
}

// # Get recent daily activity for the heatmap (last N days).
export async function getRecentActivity(db: Db, learnerId: string, days: number = 90) {
  const cutoff = toDateString(Date.now() - days * 86_400_000)

  const rows = await db.select()
    .from(dailyActivity)
    .where(and(
      eq(dailyActivity.learnerId, learnerId),
    ))

  // # Filter in JS since SQLite text comparison with >= works for ISO dates.
  return rows.filter(r => r.activityDate >= cutoff)
}

// # Get all earned badges for a learner.
export async function getEarnedBadges(db: Db, learnerId: string) {
  return db.select()
    .from(learnerBadges)
    .where(eq(learnerBadges.learnerId, learnerId))
}
