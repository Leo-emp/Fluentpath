import { eq, and } from 'drizzle-orm'
import { testSessions } from '@/db/schema/test-sessions'
import type { Db } from '@/db/client'

// Input for creating a new test session. The session ID comes from
// the engine (TestSession.id), not from generateId().
export interface CreateTestSessionInput {
  sessionId: string
  learnerId: string
  examId: string
  state: Record<string, unknown>
  now: number
}

/**
 * Create a new test session.
 *
 * The session starts in 'in_progress' status. The full TestSession
 * state object is stored as JSON for instant resume.
 */
export async function createTestSession(db: Db, input: CreateTestSessionInput) {
  const [row] = await db
    .insert(testSessions)
    .values({
      id: input.sessionId,
      learnerId: input.learnerId,
      examId: input.examId,
      status: 'in_progress',
      state: input.state,
      startedAt: input.now,
      completedAt: null,
      updatedAt: input.now,
    })
    .returning()

  return row!
}

/**
 * Find a test session by ID (any status).
 */
export async function findTestSessionById(db: Db, sessionId: string) {
  const rows = await db
    .select()
    .from(testSessions)
    .where(eq(testSessions.id, sessionId))
    .limit(1)

  return rows[0]
}

/**
 * Find the active (in_progress) test session for a learner.
 *
 * Returns undefined if the learner has no active session.
 * A learner should have at most one active session at a time.
 */
export async function findActiveSession(db: Db, learnerId: string) {
  const rows = await db
    .select()
    .from(testSessions)
    .where(
      and(
        eq(testSessions.learnerId, learnerId),
        eq(testSessions.status, 'in_progress'),
      ),
    )
    .limit(1)

  return rows[0]
}

/**
 * Update the session state (called on every learner action).
 *
 * Writes the full TestSession object and updates the timestamp.
 * This is the hot write path — one write per action (answer, advance, etc).
 */
export async function updateSessionState(
  db: Db,
  sessionId: string,
  state: Record<string, unknown>,
  now: number,
) {
  await db
    .update(testSessions)
    .set({
      state,
      updatedAt: now,
    })
    .where(eq(testSessions.id, sessionId))
}

/**
 * Mark a session as completed.
 *
 * Sets status to 'completed', stores the final state, and records
 * the completion timestamp.
 */
export async function completeSession(
  db: Db,
  sessionId: string,
  finalState: Record<string, unknown>,
  now: number,
) {
  await db
    .update(testSessions)
    .set({
      status: 'completed',
      state: finalState,
      completedAt: now,
      updatedAt: now,
    })
    .where(eq(testSessions.id, sessionId))
}

/**
 * Mark a session as abandoned.
 *
 * Called when the learner quits before completing all sections.
 * The state is preserved for potential analytics.
 */
export async function abandonSession(db: Db, sessionId: string, now: number) {
  await db
    .update(testSessions)
    .set({
      status: 'abandoned',
      completedAt: now,
      updatedAt: now,
    })
    .where(eq(testSessions.id, sessionId))
}
