import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError, requireArray } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { getPracticeSession, completePracticeSession } from '@/sequencer/session-store'
import { recordOutcomes, type AssessedOutcome } from '@/mastery/service'
import { recordActivity } from '@/gamification/streaks'
import { itemXp, SESSION_COMPLETE_XP, PERFECT_SESSION_BONUS } from '@/gamification/xp'

// POST /api/practice/sessions/[id]/complete
// Complete a session and record mastery outcomes. This is the "session end
// write" — outcomes are batched here, not written per item.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)

    const { id } = await params
    const body = (await request.json()) as Record<string, unknown>
    const db = getDb()

    // Verify the session exists and is still in progress.
    const session = await getPracticeSession(db, id)
    if (!session) return jsonError(404, 'Session not found.')
    if (session.status !== 'in_progress') {
      return jsonError(400, `Session is already "${session.status}".`)
    }

    // Ownership check — the authenticated user must own this session.
    if (session.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this session.')
    }

    const rawOutcomes = requireArray(body, 'outcomes')
    const outcomes = rawOutcomes as AssessedOutcome[]

    // Record mastery FIRST — if this fails the session stays in_progress
    // and the learner can retry. Completing first would lose their work.
    const now = Date.now()
    const mastery = await recordOutcomes(db, learnerId, outcomes, now)
    await completePracticeSession(db, id, now)

    // # Record gamification activity — XP, streaks, badges.
    // # AssessedOutcome has outcome (0-1), not itemType. Treat outcome >= 0.5 as correct.
    const correctCount = outcomes.filter(o => o.outcome >= 0.5).length
    const totalItemXp = outcomes.reduce(
      (sum, o) => sum + itemXp('mcq', o.outcome >= 0.5),
      0,
    )
    const isPerfect = correctCount === outcomes.length && outcomes.length > 0
    const xpEarned = totalItemXp + SESSION_COMPLETE_XP + (isPerfect ? PERFECT_SESSION_BONUS : 0)

    const gamification = await recordActivity(db, learnerId, {
      itemsCompleted: outcomes.length,
      xpEarned,
      minutesPracticed: Math.round((now - (session.startedAt ?? now)) / 60_000),
      sessionCompleted: true,
    }, now)

    return jsonOk({ mastery, gamification })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    if (err instanceof ValidationError) return jsonError(400, err.message)
    console.error('[POST /api/practice/sessions/[id]/complete]', err)
    return jsonError(500, 'Internal server error')
  }
}
