// # GET /api/gamification
// # Returns the learner's gamification stats: streak, XP, badges, recent activity.
// # Used by the dashboard to render the engagement section.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getStreakStats, getRecentActivity, getEarnedBadges } from '@/gamification/streaks'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # Fetch all gamification data in parallel for speed.
    const [stats, activity, badges] = await Promise.all([
      getStreakStats(db, learnerId),
      getRecentActivity(db, learnerId, 90),
      getEarnedBadges(db, learnerId),
    ])

    return jsonOk({
      streak: stats,
      activity: activity.map(a => ({
        date: a.activityDate,
        items: a.itemsCompleted,
        xp: a.xpEarned,
        minutes: a.minutesPracticed,
        sessions: a.sessionsCompleted,
      })),
      badges: badges.map(b => ({
        type: b.badgeType,
        earnedAt: b.earnedAt,
      })),
    })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/gamification]', err)
    return jsonError(500, 'Internal server error')
  }
}
