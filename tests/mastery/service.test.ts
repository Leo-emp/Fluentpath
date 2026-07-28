import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { upsertNodes } from '@/skill-graph/repository'
import { recordOutcomes } from '@/mastery/service'
import { getMastery, listMastery } from '@/mastery/repository'
import type { Db } from '@/db/client'
import type { SkillNode } from '@/skill-graph/types'

const NOW = 1_700_000_000_000
let db: Db

function node(id: string): SkillNode {
  return { id, type: 'grammar', level: 'A1', skill: 'general', title: id, description: '', metadata: null }
}

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(db, [node('n1'), node('n2'), node('n3')], NOW)
})

describe('recordOutcomes', () => {
  it('creates a record on first observation', async () => {
    const result = await recordOutcomes(db, 'u1', [{ nodeId: 'n1', outcome: 1, difficulty: 0.5 }], NOW)

    expect(result).toHaveLength(1)
    expect(result[0]?.exposures).toBe(1)
    expect(result[0]?.mastery).toBeGreaterThan(0)
    expect(await getMastery(db, 'u1', 'n1')).not.toBeNull()
  })

  it('persists exactly what it returns', async () => {
    const [returned] = await recordOutcomes(db, 'u1', [{ nodeId: 'n1', outcome: 1, difficulty: 0.5 }], NOW)
    const stored = await getMastery(db, 'u1', 'n1')
    expect(stored?.mastery).toBeCloseTo(returned!.mastery)
    expect(stored?.confidence).toBeCloseTo(returned!.confidence)
  })

  it('accumulates across separate calls', async () => {
    await recordOutcomes(db, 'u1', [{ nodeId: 'n1', outcome: 1, difficulty: 0.5 }], NOW)
    const second = await recordOutcomes(db, 'u1', [{ nodeId: 'n1', outcome: 1, difficulty: 0.5 }], NOW + 1000)
    expect(second[0]?.exposures).toBe(2)
  })

  it('writes a whole session in one call', async () => {
    const result = await recordOutcomes(
      db,
      'u1',
      [
        { nodeId: 'n1', outcome: 1, difficulty: 0.5 },
        { nodeId: 'n2', outcome: 0, difficulty: 0.5 },
        { nodeId: 'n3', outcome: 1, difficulty: 0.8 },
      ],
      NOW,
    )

    expect(result).toHaveLength(3)
    expect(await listMastery(db, 'u1')).toHaveLength(3)
  })

  it('compounds repeated outcomes on the same node within one batch', async () => {
    const result = await recordOutcomes(
      db,
      'u1',
      [
        { nodeId: 'n1', outcome: 1, difficulty: 0.5 },
        { nodeId: 'n1', outcome: 1, difficulty: 0.5 },
        { nodeId: 'n1', outcome: 1, difficulty: 0.5 },
      ],
      NOW,
    )

    // One record returned, but all three answers counted.
    expect(result).toHaveLength(1)
    expect(result[0]?.exposures).toBe(3)
  })

  it('applies outcomes in order within a batch', async () => {
    const wrongThenRight = await recordOutcomes(
      db,
      'u1',
      [
        { nodeId: 'n1', outcome: 0, difficulty: 0.5 },
        { nodeId: 'n1', outcome: 1, difficulty: 0.5 },
      ],
      NOW,
    )

    const dbB = await makeTestDb()
    await upsertNodes(dbB, [node('n1')], NOW)
    const rightThenWrong = await recordOutcomes(
      dbB,
      'u1',
      [
        { nodeId: 'n1', outcome: 1, difficulty: 0.5 },
        { nodeId: 'n1', outcome: 0, difficulty: 0.5 },
      ],
      NOW,
    )

    // Ending on a success should leave the learner higher than ending on a
    // failure, even though the batch contains the same two answers.
    expect(wrongThenRight[0]!.mastery).toBeGreaterThan(rightThenWrong[0]!.mastery)
    expect(wrongThenRight[0]!.correctStreak).toBe(1)
    expect(rightThenWrong[0]!.correctStreak).toBe(0)
  })

  it('does nothing when given an empty batch', async () => {
    expect(await recordOutcomes(db, 'u1', [], NOW)).toEqual([])
    expect(await listMastery(db, 'u1')).toHaveLength(0)
  })

  it('keeps learners separate', async () => {
    await recordOutcomes(db, 'u1', [{ nodeId: 'n1', outcome: 1, difficulty: 0.5 }], NOW)
    await recordOutcomes(db, 'u2', [{ nodeId: 'n1', outcome: 0, difficulty: 0.5 }], NOW)

    const a = await getMastery(db, 'u1', 'n1')
    const b = await getMastery(db, 'u2', 'n1')
    expect(a!.mastery).toBeGreaterThan(b!.mastery)
  })

  it('rejects an outcome for a node that does not exist', async () => {
    await expect(
      recordOutcomes(db, 'u1', [{ nodeId: 'ghost', outcome: 1, difficulty: 0.5 }], NOW),
    ).rejects.toThrow(/ghost/)
  })
})
