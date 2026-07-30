import { describe, it, expect, beforeEach } from 'vitest'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import {
  createPlacementResult,
  findActivePlacement,
  updatePlacementState,
  completePlacement,
} from '@/db/repositories/placement'
import { createLearner } from '@/db/repositories/learners'

function createTestDb() {
  const client = createClient({ url: ':memory:' })
  return drizzle(client, { schema })
}

async function migrateTestDb(db: ReturnType<typeof createTestDb>) {
  await db.run(`
    CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE,
      name TEXT, l1 TEXT, current_level TEXT,
      tier TEXT NOT NULL DEFAULT 'free',
      paddle_customer_id TEXT, paddle_subscription_id TEXT,
      subscription_status TEXT NOT NULL DEFAULT 'none',
      created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
    )
  `)
  await db.run(`
    CREATE TABLE IF NOT EXISTS placement_results (
      id TEXT PRIMARY KEY,
      learner_id TEXT NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
      estimated_level TEXT,
      level_results TEXT,
      items_used INTEGER NOT NULL DEFAULT 0,
      state TEXT NOT NULL,
      status TEXT NOT NULL,
      started_at INTEGER NOT NULL,
      completed_at INTEGER
    )
  `)
}

describe('placement repository', () => {
  let db: ReturnType<typeof createTestDb>
  let learnerId: string
  const now = 1_000_000

  beforeEach(async () => {
    db = createTestDb()
    await migrateTestDb(db)

    const learner = await createLearner(db, {
      email: 'place@example.com',
      now,
    })
    learnerId = learner.id
  })

  // A minimal PlacementState-like object for the state column.
  const mockState = {
    config: { startLevel: 'B1', itemsPerLevel: 5, correctThreshold: 0.7, maxItems: 30 },
    currentLevel: 'B1',
    itemsAnswered: 0,
    levelResults: {},
    answeredItemIds: [],
    finished: false,
    direction: null,
    completedLevels: [],
  }

  describe('createPlacementResult', () => {
    it('creates an in_progress placement', async () => {
      const placement = await createPlacementResult(db, {
        learnerId,
        state: mockState,
        now,
      })

      expect(placement.learnerId).toBe(learnerId)
      expect(placement.status).toBe('in_progress')
      expect(placement.estimatedLevel).toBeNull()
      expect(placement.itemsUsed).toBe(0)
      expect(typeof placement.id).toBe('string')
    })
  })

  describe('findActivePlacement', () => {
    it('returns the active placement for a learner', async () => {
      await createPlacementResult(db, {
        learnerId,
        state: mockState,
        now,
      })

      const active = await findActivePlacement(db, learnerId)
      expect(active).toBeDefined()
      expect(active!.status).toBe('in_progress')
    })

    it('returns undefined when no active placement exists', async () => {
      const active = await findActivePlacement(db, learnerId)
      expect(active).toBeUndefined()
    })

    it('does not return completed placements', async () => {
      const placement = await createPlacementResult(db, {
        learnerId,
        state: mockState,
        now,
      })

      await completePlacement(db, placement.id, 'B1', { B1: { correct: 4, total: 5 } }, 5, mockState, now + 10000)

      const active = await findActivePlacement(db, learnerId)
      expect(active).toBeUndefined()
    })
  })

  describe('updatePlacementState', () => {
    it('updates the state and items count', async () => {
      const placement = await createPlacementResult(db, {
        learnerId,
        state: mockState,
        now,
      })

      const updatedState = { ...mockState, itemsAnswered: 3, currentLevel: 'B2' }
      await updatePlacementState(db, placement.id, updatedState, 3)

      const active = await findActivePlacement(db, learnerId)
      expect(active!.itemsUsed).toBe(3)
      const state = active!.state as Record<string, unknown>
      expect(state.currentLevel).toBe('B2')
    })
  })

  describe('completePlacement', () => {
    it('marks the placement as completed with a level', async () => {
      const placement = await createPlacementResult(db, {
        learnerId,
        state: mockState,
        now,
      })

      const levelResults = { A2: { correct: 5, total: 5 }, B1: { correct: 4, total: 5 }, B2: { correct: 1, total: 5 } }
      await completePlacement(db, placement.id, 'B1', levelResults, 15, { ...mockState, finished: true }, now + 60000)

      // Should not appear as active anymore.
      const active = await findActivePlacement(db, learnerId)
      expect(active).toBeUndefined()
    })
  })
})
