// # DELETE /api/me/delete-account
// # GDPR Article 17 — right to erasure. Deletes ALL user data.
// # Cascading deletes handle most child rows via FK onDelete: cascade.
// # This endpoint also cancels any active Paddle subscription.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { learners } from '@/db/schema'
import { authUsers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function DELETE(request: NextRequest) {
  try {
    const { learnerId, email } = await getAuthenticatedLearner(request)
    const db = getDb()

    // # 1. Get learner details before deletion (for Paddle cancellation).
    const learnerRows = await db.select().from(learners).where(eq(learners.id, learnerId))
    const learner = learnerRows[0]
    if (!learner) return jsonError(404, 'Learner not found')

    // # 2. Cancel Paddle subscription if active.
    if (learner.paddleSubscriptionId && learner.subscriptionStatus === 'active') {
      try {
        // # Paddle API cancel — fire and forget, don't block deletion.
        const paddleApiKey = process.env.PADDLE_API_KEY
        if (paddleApiKey) {
          await fetch(`https://api.paddle.com/subscriptions/${learner.paddleSubscriptionId}/cancel`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${paddleApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ effective_from: 'immediately' }),
          })
        }
      } catch {
        // # Log but don't block account deletion.
        console.error('[delete-account] Failed to cancel Paddle subscription')
      }
    }

    // # 3. Delete learner + auth user atomically — prevents orphaned rows
    // # if one delete succeeds and the other fails.
    await db.transaction(async (tx) => {
      // # Cascading deletes remove all child data (streaks, badges, activity,
      // # mastery, placements, tests, diagnoses, practice sessions, etc.).
      await tx.delete(learners).where(eq(learners.id, learnerId))
      // # Remove auth user row — sessions and accounts cascade too.
      await tx.delete(authUsers).where(eq(authUsers.email, email))
    })

    return jsonOk({ deleted: true })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[DELETE /api/me/delete-account]', err)
    return jsonError(500, 'Internal server error')
  }
}
