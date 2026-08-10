// # GET /api/me/data-export
// # GDPR Article 20 — data portability. Returns ALL user data as JSON.
// # The learner can download everything we store about them.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import {
  learners,
  learnerStreaks,
  dailyActivity,
  learnerBadges,
  learnerMastery,
  placementResults,
  testResults,
  diagnoses,
  practiceSessions,
  lessonCompletions,
  discussionPosts,
  discussionReplies,
} from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { learnerId, email } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # Fetch all user data in parallel.
    const [
      profile,
      streaks,
      activity,
      badges,
      mastery,
      placements,
      tests,
      diagnosisRows,
      practice,
      completions,
      posts,
      replies,
    ] = await Promise.all([
      db.select().from(learners).where(eq(learners.id, learnerId)),
      db.select().from(learnerStreaks).where(eq(learnerStreaks.learnerId, learnerId)),
      db.select().from(dailyActivity).where(eq(dailyActivity.learnerId, learnerId)),
      db.select().from(learnerBadges).where(eq(learnerBadges.learnerId, learnerId)),
      db.select().from(learnerMastery).where(eq(learnerMastery.learnerId, learnerId)),
      db.select().from(placementResults).where(eq(placementResults.learnerId, learnerId)),
      db.select().from(testResults).where(eq(testResults.learnerId, learnerId)),
      db.select().from(diagnoses).where(eq(diagnoses.learnerId, learnerId)),
      db.select().from(practiceSessions).where(eq(practiceSessions.learnerId, learnerId)),
      db.select().from(lessonCompletions).where(eq(lessonCompletions.learnerId, learnerId)),
      db.select().from(discussionPosts).where(eq(discussionPosts.authorId, learnerId)),
      db.select().from(discussionReplies).where(eq(discussionReplies.authorId, learnerId)),
    ])

    const exportData = {
      exportDate: new Date().toISOString(),
      email,
      profile: profile[0] ?? null,
      gamification: {
        streaks: streaks[0] ?? null,
        dailyActivity: activity,
        badges,
      },
      learning: {
        mastery,
        lessonCompletions: completions,
        placementResults: placements,
        testResults: tests,
        diagnoses: diagnosisRows,
        practiceSessions: practice,
      },
      community: {
        posts,
        replies,
      },
    }

    // # Return as downloadable JSON file.
    return new Response(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="fluentpath-data-export-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/me/data-export]', err)
    return jsonError(500, 'Internal server error')
  }
}
