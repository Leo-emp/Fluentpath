// # GET /api/gamification/leaderboard
// # Returns the top learners by weekly XP for the current week.
// # Includes the requesting learner's rank even if not in top N.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { learnerStreaks } from '@/db/schema'
import { learners } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// # How many leaders to show.
const TOP_N = 20

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # Fetch top N learners by weekly XP (descending).
    const top = await db.select({
      learnerId: learnerStreaks.learnerId,
      weeklyXp: learnerStreaks.weeklyXp,
      totalXp: learnerStreaks.totalXp,
      currentStreak: learnerStreaks.currentStreak,
    })
      .from(learnerStreaks)
      .orderBy(desc(learnerStreaks.weeklyXp))
      .limit(TOP_N)

    // # Get names for the top learners.
    const leaderIds = top.map(t => t.learnerId)
    const learnerRows = leaderIds.length > 0
      ? await db.select({ id: learners.id, name: learners.name })
          .from(learners)
          .where(
            // # SQLite doesn't have IN operator in drizzle easily, so filter in JS.
            // # This is fine for 20 rows.
            eq(learners.id, learners.id),
          )
      : []

    // # Build a name map from all learners that match our top IDs.
    const allLearners = await db.select({ id: learners.id, name: learners.name }).from(learners)
    const nameMap = new Map(allLearners.filter(l => leaderIds.includes(l.id)).map(l => [l.id, l.name]))

    // # Build the leaderboard with ranks.
    const leaderboard = top.map((entry, i) => ({
      rank: i + 1,
      name: nameMap.get(entry.learnerId) ?? 'Learner',
      weeklyXp: entry.weeklyXp,
      currentStreak: entry.currentStreak,
      isYou: entry.learnerId === learnerId,
    }))

    // # Find the requesting learner's rank if not in top N.
    const inTop = leaderboard.some(l => l.isYou)
    let yourRank: { rank: number; weeklyXp: number; currentStreak: number } | null = null

    if (!inTop) {
      // # Count how many learners have more weekly XP.
      const yourStats = await db.select({
        weeklyXp: learnerStreaks.weeklyXp,
        currentStreak: learnerStreaks.currentStreak,
      })
        .from(learnerStreaks)
        .where(eq(learnerStreaks.learnerId, learnerId))
        .limit(1)

      if (yourStats[0]) {
        // # Count all learners with higher weekly XP to determine rank.
        const allByXp = await db.select({ weeklyXp: learnerStreaks.weeklyXp })
          .from(learnerStreaks)
          .orderBy(desc(learnerStreaks.weeklyXp))
        const rank = allByXp.findIndex(r => r.weeklyXp <= yourStats[0]!.weeklyXp) + 1
        yourRank = {
          rank: rank > 0 ? rank : allByXp.length + 1,
          weeklyXp: yourStats[0].weeklyXp,
          currentStreak: yourStats[0].currentStreak,
        }
      }
    }

    return jsonOk({ leaderboard, yourRank })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/gamification/leaderboard]', err)
    return jsonError(500, 'Internal server error')
  }
}
