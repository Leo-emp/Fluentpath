// # GET /api/gamification/daily-goal — returns goal + today's progress
// # PATCH /api/gamification/daily-goal — update the daily XP target

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { learnerStreaks, dailyActivity } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

// # Valid daily goal options (XP per day).
const VALID_GOALS = [0, 20, 50, 100, 200]

// # Today's date as YYYY-MM-DD in UTC.
function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # Get the goal setting.
    const streakRow = await db.select({
      dailyXpGoal: learnerStreaks.dailyXpGoal,
    })
      .from(learnerStreaks)
      .where(eq(learnerStreaks.learnerId, learnerId))
      .limit(1)

    const goal = streakRow[0]?.dailyXpGoal ?? 0

    // # Get today's earned XP.
    const today = todayStr()
    const actRow = await db.select({
      xpEarned: dailyActivity.xpEarned,
      itemsCompleted: dailyActivity.itemsCompleted,
      minutesPracticed: dailyActivity.minutesPracticed,
    })
      .from(dailyActivity)
      .where(and(
        eq(dailyActivity.learnerId, learnerId),
        eq(dailyActivity.activityDate, today),
      ))
      .limit(1)

    return jsonOk({
      dailyXpGoal: goal,
      todayXp: actRow[0]?.xpEarned ?? 0,
      todayItems: actRow[0]?.itemsCompleted ?? 0,
      todayMinutes: actRow[0]?.minutesPracticed ?? 0,
      goalMet: goal > 0 && (actRow[0]?.xpEarned ?? 0) >= goal,
    })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/gamification/daily-goal]', err)
    return jsonError(500, 'Internal server error')
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()

    const body = await request.json() as { dailyXpGoal?: number }
    const goal = body.dailyXpGoal

    if (goal === undefined || !VALID_GOALS.includes(goal)) {
      return jsonError(400, `dailyXpGoal must be one of: ${VALID_GOALS.join(', ')}`)
    }

    // # Upsert — update if exists, create if not.
    const existing = await db.select({ learnerId: learnerStreaks.learnerId })
      .from(learnerStreaks)
      .where(eq(learnerStreaks.learnerId, learnerId))
      .limit(1)

    if (existing[0]) {
      await db.update(learnerStreaks)
        .set({ dailyXpGoal: goal, updatedAt: Date.now() })
        .where(eq(learnerStreaks.learnerId, learnerId))
    } else {
      await db.insert(learnerStreaks).values({
        learnerId,
        currentStreak: 0,
        longestStreak: 0,
        totalXp: 0,
        weeklyXp: 0,
        dailyXpGoal: goal,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    }

    return jsonOk({ dailyXpGoal: goal })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[PATCH /api/gamification/daily-goal]', err)
    return jsonError(500, 'Internal server error')
  }
}
