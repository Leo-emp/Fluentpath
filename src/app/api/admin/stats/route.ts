// # GET /api/admin/stats
// # Returns platform-wide stats for the admin dashboard.
// # Requires admin role (checked via email allowlist or future role field).

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { learners, learnerStreaks, dailyActivity, placementResults, testResults } from '@/db/schema'
import { sql, eq, gte, desc } from 'drizzle-orm'

// # Admin email allowlist — replace with role-based check when org layer ships.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').filter(Boolean)

function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export async function GET(request: NextRequest) {
  try {
    const { learnerId, email } = await getAuthenticatedLearner(request)
    if (!isAdmin(email)) return jsonError(403, 'Admin access required')

    const db = getDb()
    const now = Date.now()
    const sevenDaysAgo = new Date(now - 7 * 86_400_000).toISOString().slice(0, 10)
    const thirtyDaysAgo = new Date(now - 30 * 86_400_000).toISOString().slice(0, 10)

    // # Total users.
    const totalUsers = await db.select({ count: sql<number>`count(*)` }).from(learners)

    // # Users by tier.
    const tierCounts = await db.select({
      tier: learners.tier,
      count: sql<number>`count(*)`,
    })
      .from(learners)
      .groupBy(learners.tier)

    // # Active users (had activity in last 7 days).
    const activeRows = await db.select({ learnerId: dailyActivity.learnerId })
      .from(dailyActivity)
      .where(gte(dailyActivity.activityDate, sevenDaysAgo))
    const weeklyActive = new Set(activeRows.map(r => r.learnerId)).size

    // # Active users (last 30 days).
    const monthlyRows = await db.select({ learnerId: dailyActivity.learnerId })
      .from(dailyActivity)
      .where(gte(dailyActivity.activityDate, thirtyDaysAgo))
    const monthlyActive = new Set(monthlyRows.map(r => r.learnerId)).size

    // # Total placements completed.
    const placementsCompleted = await db.select({ count: sql<number>`count(*)` })
      .from(placementResults)
      .where(eq(placementResults.status, 'completed'))

    // # Level distribution from placements.
    const levelDist = await db.select({
      level: placementResults.estimatedLevel,
      count: sql<number>`count(*)`,
    })
      .from(placementResults)
      .where(eq(placementResults.status, 'completed'))
      .groupBy(placementResults.estimatedLevel)

    // # Mock tests completed.
    const testsCompleted = await db.select({ count: sql<number>`count(*)` }).from(testResults)

    // # Top XP earners (leaderboard snapshot).
    const topLearners = await db.select({
      learnerId: learnerStreaks.learnerId,
      totalXp: learnerStreaks.totalXp,
      currentStreak: learnerStreaks.currentStreak,
    })
      .from(learnerStreaks)
      .orderBy(desc(learnerStreaks.totalXp))
      .limit(10)

    // # Get names for top learners.
    const allLearnerData = await db.select({ id: learners.id, name: learners.name, email: learners.email, tier: learners.tier, currentLevel: learners.currentLevel, createdAt: learners.createdAt })
      .from(learners)

    const learnerMap = new Map(allLearnerData.map(l => [l.id, l]))

    return jsonOk({
      totalUsers: totalUsers[0]?.count ?? 0,
      tiers: Object.fromEntries(tierCounts.map(t => [t.tier, t.count])),
      weeklyActive,
      monthlyActive,
      placementsCompleted: placementsCompleted[0]?.count ?? 0,
      levelDistribution: Object.fromEntries(levelDist.map(l => [l.level, l.count])),
      testsCompleted: testsCompleted[0]?.count ?? 0,
      topLearners: topLearners.map(t => ({
        name: learnerMap.get(t.learnerId)?.name ?? 'Unknown',
        email: learnerMap.get(t.learnerId)?.email ?? '',
        totalXp: t.totalXp,
        currentStreak: t.currentStreak,
      })),
      recentSignups: allLearnerData
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 20)
        .map(l => ({
          name: l.name,
          email: l.email,
          tier: l.tier,
          level: l.currentLevel,
          joinedAt: l.createdAt,
        })),
    })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/admin/stats]', err)
    return jsonError(500, 'Internal server error')
  }
}
