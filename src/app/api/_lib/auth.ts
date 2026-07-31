// Per-request auth helper. Extracts the authenticated learnerId from the
// session so route handlers never touch auth internals directly.

import { auth } from '@/lib/auth'
import { getDb } from './db'
import { findLearnerByEmail } from '@/db/repositories/learners'
import { AuthError } from './validate'

// ─── Types ──────────────────────────────────────────────────────────────

export interface AuthResult {
  // FluentPath learner ID (NOT the Better Auth user ID).
  learnerId: string
  email: string
}

// ─── Helper ─────────────────────────────────────────────────────────────

// Authenticate the request and return the learner identity.
// Throws AuthError (caught as 401) if the session is missing/expired
// or no learner row exists for the session email.
export async function getAuthenticatedLearner(
  request: Request,
): Promise<AuthResult> {
  // Step 1: get the session from Better Auth.
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user?.email) {
    throw new AuthError('No active session')
  }

  // Step 2: look up the FluentPath learner by email.
  const db = getDb()
  const learner = await findLearnerByEmail(db, session.user.email)

  if (!learner) {
    // Auth user exists but no learner row — should not happen if the
    // databaseHooks.user.create.after hook ran correctly. Log and reject.
    console.error(`Auth user ${session.user.email} has no learner row`)
    throw new AuthError('Account not fully set up')
  }

  return {
    learnerId: learner.id,
    email: learner.email,
  }
}
