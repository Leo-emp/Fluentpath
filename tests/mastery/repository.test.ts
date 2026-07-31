import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { upsertNodes } from '@/skill-graph/repository'
import { getMastery, listMastery, saveMastery } from '@/mastery/repository'
import type { Db } from '@/db/client'
import type { MasteryRecord } from '@/mastery/types'
import { learners } from '@/db/schema'

const NOW = 1_700_000_000_000
let db: Db

beforeEach(async () => {
  db = await makeTestDb()
  // Insert learner rows so the FK on learner_mastery.learner_id is satisfied.
  await db.insert(learners).values([
    { id: 'u1', email: 'u1@test.com', createdAt: NOW, updatedAt: NOW },
    { id: 'u2', email: 'u2@test.com', createdAt: NOW, updatedAt: NOW },
  ])
  await upsertNodes(
    db,
    [
      { id: 'n1', type: 'grammar', level: 'A1', skill: 'general', title: 'n1', description: '', metadata: null },
      { id: 'n2', type: 'grammar', level: 'A2', skill: 'general', title: 'n2', description: '', metadata: null },
    ],
    NOW,
  )
})

function record(nodeId: string, mastery: number): MasteryRecord {
  return { learnerId: 'u1', nodeId, mastery, confidence: 0.5, exposures: 3, correctStreak: 1, lastSeenAt: NOW }
}

describe('mastery repository', () => {
  it('returns null when no record exists', async () => {
    expect(await getMastery(db, 'u1', 'n1')).toBeNull()
  })

  it('saves and reads back a record', async () => {
    await saveMastery(db, record('n1', 0.7))
    const found = await getMastery(db, 'u1', 'n1')
    expect(found?.mastery).toBeCloseTo(0.7)
    expect(found?.exposures).toBe(3)
    expect(found?.lastSeenAt).toBe(NOW)
  })

  it('overwrites an existing record for the same learner and node', async () => {
    await saveMastery(db, record('n1', 0.2))
    await saveMastery(db, { ...record('n1', 0.9), exposures: 4 })

    const all = await listMastery(db, 'u1')
    expect(all).toHaveLength(1)
    expect(all[0]?.mastery).toBeCloseTo(0.9)
    expect(all[0]?.exposures).toBe(4)
  })

  it('keeps learners separate', async () => {
    await saveMastery(db, record('n1', 0.5))
    await saveMastery(db, { ...record('n1', 0.8), learnerId: 'u2' })

    expect(await listMastery(db, 'u1')).toHaveLength(1)
    expect((await listMastery(db, 'u2'))[0]?.mastery).toBeCloseTo(0.8)
  })

  it('lists every node for one learner', async () => {
    await saveMastery(db, record('n1', 0.5))
    await saveMastery(db, record('n2', 0.6))
    expect(await listMastery(db, 'u1')).toHaveLength(2)
  })

  it('clamps values above 1 on write', async () => {
    await saveMastery(db, { ...record('n1', 1.7), confidence: 2 })
    const found = await getMastery(db, 'u1', 'n1')
    expect(found?.mastery).toBe(1)
    expect(found?.confidence).toBe(1)
  })

  it('clamps negative values on write', async () => {
    await saveMastery(db, { ...record('n1', -0.5), confidence: -3 })
    const found = await getMastery(db, 'u1', 'n1')
    expect(found?.mastery).toBe(0)
    expect(found?.confidence).toBe(0)
  })

  it('saves many records in one call', async () => {
    await saveMastery(db, [record('n1', 0.4), record('n2', 0.8)])
    expect(await listMastery(db, 'u1')).toHaveLength(2)
  })

  it('does nothing when given an empty batch', async () => {
    await saveMastery(db, [])
    expect(await listMastery(db, 'u1')).toHaveLength(0)
  })
})
