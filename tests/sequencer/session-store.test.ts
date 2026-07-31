import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import {
  createPracticeSession,
  updateProgress,
  completePracticeSession,
  abandonPracticeSession,
  findActivePracticeSession,
  getPracticeSession,
} from '@/sequencer/session-store'
import type { Db } from '@/db/client'
import { learners } from '@/db/schema'

const NOW = 1_700_000_000_000

// A minimal session plan (the real one has McqItem objects, but the store
// treats it as opaque JSON).
const PLAN = {
  items: [{ item: { id: 'item.1' }, nodeId: 'gram.a1.be', reason: 'new' }],
  nodeIds: ['gram.a1.be'],
  estimatedMinutes: 0.5,
}

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  // Insert a learner for the FK constraint.
  await db.insert(learners).values({
    id: 'learner.1',
    name: 'Test',
    email: 'test@test.com',
    createdAt: NOW,
    updatedAt: NOW,
  })
})

describe('createPracticeSession', () => {
  it('creates a session and returns its ID', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  it('stores the plan as JSON', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    const session = await getPracticeSession(db, id)
    expect(session).not.toBeNull()
    expect(session!.status).toBe('in_progress')
    expect(session!.progress).toBe(0)
    expect((session!.plan as Record<string, unknown>).nodeIds).toEqual(['gram.a1.be'])
  })
})

describe('updateProgress', () => {
  it('updates the progress counter', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await updateProgress(db, id, 3, NOW + 1000)

    const session = await getPracticeSession(db, id)
    expect(session!.progress).toBe(3)
    expect(session!.updatedAt).toBe(NOW + 1000)
  })
})

describe('completePracticeSession', () => {
  it('sets status to completed', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await completePracticeSession(db, id, NOW + 5000)

    const session = await getPracticeSession(db, id)
    expect(session!.status).toBe('completed')
    expect(session!.completedAt).toBe(NOW + 5000)
  })
})

describe('abandonPracticeSession', () => {
  it('sets status to abandoned', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await abandonPracticeSession(db, id, NOW + 5000)

    const session = await getPracticeSession(db, id)
    expect(session!.status).toBe('abandoned')
    expect(session!.completedAt).toBe(NOW + 5000)
  })
})

describe('findActivePracticeSession', () => {
  it('returns the active session for a learner', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)

    const active = await findActivePracticeSession(db, 'learner.1')
    expect(active).not.toBeNull()
    expect(active!.id).toBe(id)
  })

  it('returns null when no active session', async () => {
    const active = await findActivePracticeSession(db, 'learner.1')
    expect(active).toBeNull()
  })

  it('ignores completed sessions', async () => {
    const id = await createPracticeSession(db, 'learner.1', PLAN, NOW)
    await completePracticeSession(db, id, NOW + 5000)

    const active = await findActivePracticeSession(db, 'learner.1')
    expect(active).toBeNull()
  })
})
