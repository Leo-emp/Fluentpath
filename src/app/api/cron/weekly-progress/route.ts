// # GET /api/cron/weekly-progress
// # Sends weekly progress summary emails to all active learners.
// # Run every Monday at 9am UTC via Vercel cron.
// # Protected by CRON_SECRET.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { learnerStreaks, lessonCompletions } from '@/db/schema'
import { learners } from '@/db/schema'
import { gte } from 'drizzle-orm'
import { sendWeeklyProgressEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  // # Verify cron secret.
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return jsonError(401, 'Unauthorized')
  }

  const db = getDb()

  // # Get all learners with their streak stats.
  const allLearners = await db.select({
    id: learners.id,
    email: learners.email,
    name: learners.name,
    currentLevel: learners.currentLevel,
  }).from(learners)

  const streakRows = await db.select().from(learnerStreaks)
  const streakMap = new Map(streakRows.map(s => [s.learnerId, s]))

  // # Count lesson completions per learner (last 7 days).
  const sevenDaysAgo = Date.now() - 7 * 86_400_000
  const completions = await db.select().from(lessonCompletions)
    .where(gte(lessonCompletions.completedAt, sevenDaysAgo))
  const completionCounts = new Map<string, number>()
  for (const c of completions) {
    completionCounts.set(c.learnerId, (completionCounts.get(c.learnerId) ?? 0) + 1)
  }

  // # Only email learners who have XP (i.e. have actually used the platform).
  let sent = 0
  for (const learner of allLearners) {
    const streak = streakMap.get(learner.id)
    if (!streak || streak.totalXp === 0) continue

    await sendWeeklyProgressEmail(learner.email, learner.name, {
      weeklyXp: streak.weeklyXp,
      lessonsCompleted: completionCounts.get(learner.id) ?? 0,
      currentStreak: streak.currentStreak,
      level: learner.currentLevel ?? 'Not placed',
    })
    sent++
  }

  return jsonOk({ sent })
}
