// # GET /api/cron/streak-reminder
// # Sends streak reminder emails to users who haven't practiced today
// # but have an active streak >= 3 days. Run daily at 8pm UTC via Vercel cron.
// # Protected by CRON_SECRET to prevent unauthorized invocations.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { learnerStreaks } from '@/db/schema'
import { learners } from '@/db/schema'
import { gte, eq } from 'drizzle-orm'
import { sendStreakReminderEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  // # Verify cron secret.
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return jsonError(401, 'Unauthorized')
  }

  const db = getDb()
  const today = new Date().toISOString().slice(0, 10)

  // # Find learners with streak >= 3 who haven't practiced today.
  const atRisk = await db.select({
    learnerId: learnerStreaks.learnerId,
    currentStreak: learnerStreaks.currentStreak,
    lastActiveDate: learnerStreaks.lastActiveDate,
  })
    .from(learnerStreaks)
    .where(gte(learnerStreaks.currentStreak, 3))

  // # Filter to those who haven't practiced today.
  const needsReminder = atRisk.filter(s => s.lastActiveDate !== today)

  // # Get email addresses.
  const allLearners = await db.select({ id: learners.id, email: learners.email, name: learners.name })
    .from(learners)
  const learnerMap = new Map(allLearners.map(l => [l.id, l]))

  let sent = 0
  for (const s of needsReminder) {
    const learner = learnerMap.get(s.learnerId)
    if (!learner) continue
    await sendStreakReminderEmail(learner.email, learner.name, s.currentStreak)
    sent++
  }

  return jsonOk({ sent, total: needsReminder.length })
}
