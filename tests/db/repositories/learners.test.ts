import { describe, it, expect, beforeEach } from 'vitest'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import {
  createLearner,
  findLearnerByEmail,
  findLearnerById,
  updateLearnerTier,
  updateLearnerLevel,
} from '@/db/repositories/learners'

// In-memory SQLite for tests — fresh database every test.
function createTestDb() {
  const client = createClient({ url: ':memory:' })
  return drizzle(client, { schema })
}

// Create tables from schema. Drizzle doesn't auto-create in tests,
// so we run the CREATE TABLE statements manually.
async function migrateTestDb(db: ReturnType<typeof createTestDb>) {
  // For test purposes, we just need the learners table.
  await db.run(`
    CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      l1 TEXT,
      current_level TEXT,
      tier TEXT NOT NULL DEFAULT 'free',
      paddle_customer_id TEXT,
      paddle_subscription_id TEXT,
      subscription_status TEXT NOT NULL DEFAULT 'none',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `)
}

describe('learners repository', () => {
  let db: ReturnType<typeof createTestDb>

  beforeEach(async () => {
    db = createTestDb()
    await migrateTestDb(db)
  })

  describe('createLearner', () => {
    it('creates a learner with required fields', async () => {
      const now = Date.now()
      const learner = await createLearner(db, {
        email: 'test@example.com',
        now,
      })

      expect(learner.email).toBe('test@example.com')
      expect(learner.tier).toBe('free')
      expect(learner.subscriptionStatus).toBe('none')
      expect(learner.createdAt).toBe(now)
      expect(typeof learner.id).toBe('string')
    })

    it('creates a learner with optional fields', async () => {
      const learner = await createLearner(db, {
        email: 'test@example.com',
        name: 'Test User',
        l1: 'th',
        now: Date.now(),
      })

      expect(learner.name).toBe('Test User')
      expect(learner.l1).toBe('th')
    })

    it('rejects duplicate emails', async () => {
      const now = Date.now()
      await createLearner(db, { email: 'dupe@example.com', now })

      await expect(
        createLearner(db, { email: 'dupe@example.com', now }),
      ).rejects.toThrow()
    })
  })

  describe('findLearnerByEmail', () => {
    it('returns the learner when found', async () => {
      await createLearner(db, { email: 'find@example.com', now: Date.now() })
      const found = await findLearnerByEmail(db, 'find@example.com')
      expect(found).toBeDefined()
      expect(found!.email).toBe('find@example.com')
    })

    it('returns undefined when not found', async () => {
      const found = await findLearnerByEmail(db, 'ghost@example.com')
      expect(found).toBeUndefined()
    })
  })

  describe('findLearnerById', () => {
    it('returns the learner when found', async () => {
      const created = await createLearner(db, {
        email: 'byid@example.com',
        now: Date.now(),
      })
      const found = await findLearnerById(db, created.id)
      expect(found).toBeDefined()
      expect(found!.id).toBe(created.id)
    })

    it('returns undefined when not found', async () => {
      const found = await findLearnerById(db, 'nonexistent-id')
      expect(found).toBeUndefined()
    })
  })

  describe('updateLearnerTier', () => {
    it('updates the tier', async () => {
      const learner = await createLearner(db, {
        email: 'tier@example.com',
        now: Date.now(),
      })

      await updateLearnerTier(db, learner.id, 'exam')
      const updated = await findLearnerById(db, learner.id)
      expect(updated!.tier).toBe('exam')
    })

    it('updates tier with Paddle data', async () => {
      const learner = await createLearner(db, {
        email: 'paddle@example.com',
        now: Date.now(),
      })

      await updateLearnerTier(db, learner.id, 'complete', {
        paddleCustomerId: 'ctm_123',
        paddleSubscriptionId: 'sub_456',
        subscriptionStatus: 'active',
      })

      const updated = await findLearnerById(db, learner.id)
      expect(updated!.tier).toBe('complete')
      expect(updated!.paddleCustomerId).toBe('ctm_123')
      expect(updated!.paddleSubscriptionId).toBe('sub_456')
      expect(updated!.subscriptionStatus).toBe('active')
    })
  })

  describe('updateLearnerLevel', () => {
    it('updates the current CEFR level', async () => {
      const learner = await createLearner(db, {
        email: 'level@example.com',
        now: Date.now(),
      })

      await updateLearnerLevel(db, learner.id, 'B1')
      const updated = await findLearnerById(db, learner.id)
      expect(updated!.currentLevel).toBe('B1')
    })
  })
})
