import { eq, and } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { generateId } from '@/db/id'
import { practiceSessions } from '@/db/schema'

// The row type returned by queries. The plan is stored as opaque JSON —
// the caller casts it to SessionPlan.
export interface PracticeSessionRow {
  id: string
  learnerId: string
  status: string
  plan: Record<string, unknown>
  progress: number
  startedAt: number
  completedAt: number | null
  updatedAt: number
}

// Create a new practice session in 'in_progress' status. Returns the
// generated session ID.
export async function createPracticeSession(
  db: Db,
  learnerId: string,
  plan: Record<string, unknown>,
  now: number,
): Promise<string> {
  const id = generateId()

  await db.insert(practiceSessions).values({
    id,
    learnerId,
    status: 'in_progress',
    plan,
    progress: 0,
    startedAt: now,
    completedAt: null,
    updatedAt: now,
  })

  return id
}

// Update the progress counter. Called periodically by the client
// (e.g. every 3 items, or on tab blur) to enable resume.
export async function updateProgress(
  db: Db,
  sessionId: string,
  progress: number,
  now: number,
): Promise<void> {
  await db
    .update(practiceSessions)
    .set({ progress, updatedAt: now })
    .where(eq(practiceSessions.id, sessionId))
}

// Mark a session as completed.
export async function completePracticeSession(
  db: Db,
  sessionId: string,
  now: number,
): Promise<void> {
  await db
    .update(practiceSessions)
    .set({ status: 'completed', completedAt: now, updatedAt: now })
    .where(eq(practiceSessions.id, sessionId))
}

// Mark a session as abandoned (learner quit before finishing).
export async function abandonPracticeSession(
  db: Db,
  sessionId: string,
  now: number,
): Promise<void> {
  await db
    .update(practiceSessions)
    .set({ status: 'abandoned', completedAt: now, updatedAt: now })
    .where(eq(practiceSessions.id, sessionId))
}

// Find the active (in_progress) practice session for a learner.
// Returns null if none. Used on app load to offer resume.
export async function findActivePracticeSession(
  db: Db,
  learnerId: string,
): Promise<PracticeSessionRow | null> {
  const rows = await db
    .select()
    .from(practiceSessions)
    .where(
      and(
        eq(practiceSessions.learnerId, learnerId),
        eq(practiceSessions.status, 'in_progress'),
      ),
    )
    .limit(1)

  return rows[0] ?? null
}

// Fetch a session by ID.
export async function getPracticeSession(
  db: Db,
  sessionId: string,
): Promise<PracticeSessionRow | null> {
  const rows = await db
    .select()
    .from(practiceSessions)
    .where(eq(practiceSessions.id, sessionId))
    .limit(1)

  return rows[0] ?? null
}
