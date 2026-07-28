import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { seedGraph } from '@/seed/run-seed'
import { SEED_EDGES, SEED_NODES } from '@/seed/seed-data'
import { listEdges, listNodes } from '@/skill-graph/repository'
import { validateGraph } from '@/skill-graph/validation'
import { selectNext } from '@/sequencer/select'
import { estimateLevels } from '@/sequencer/level'
import { recordOutcomes } from '@/mastery/service'
import { listMastery } from '@/mastery/repository'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const DAY = 86_400_000

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
})

describe('seed data integrity', () => {
  it('is a valid graph', () => {
    expect(validateGraph(SEED_NODES, SEED_EDGES)).toEqual({ valid: true, errors: [] })
  })

  it('has unique node ids', () => {
    const ids = SEED_NODES.map((n) => n.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers every node type', () => {
    const types = new Set(SEED_NODES.map((n) => n.type))
    expect(types).toEqual(new Set(['grammar', 'lexical', 'cando', 'phono', 'strategy']))
  })
})

describe('seeding', () => {
  it('loads into the database', async () => {
    await seedGraph(db, NOW)
    expect(await listNodes(db)).toHaveLength(SEED_NODES.length)
    expect(await listEdges(db)).toHaveLength(SEED_EDGES.length)
  })

  it('is idempotent', async () => {
    await seedGraph(db, NOW)
    await seedGraph(db, NOW + 1000)
    expect(await listNodes(db)).toHaveLength(SEED_NODES.length)
    expect(await listEdges(db)).toHaveLength(SEED_EDGES.length)
  })
})

describe('end to end on the seeded graph', () => {
  beforeEach(async () => {
    await seedGraph(db, NOW)
  })

  it('gives a brand-new learner something to do', async () => {
    const nodes = await listNodes(db)
    const edges = await listEdges(db)

    const next = selectNext({ nodes, edges, mastery: [], now: NOW, limit: 5 })
    expect(next.length).toBeGreaterThan(0)
    expect(next.every((c) => c.reason === 'new')).toBe(true)
  })

  it('offers only nodes with no unmet prerequisites at the start', async () => {
    const nodes = await listNodes(db)
    const edges = await listEdges(db)
    const gated = new Set(edges.map((e) => e.toNodeId))

    const next = selectNext({ nodes, edges, mastery: [], now: NOW, limit: 20 })
    // The only gated node that may appear is one whose edges are all weak
    // enough to pass at zero mastery; none in the seed qualify.
    for (const candidate of next) {
      if (gated.has(candidate.node.id)) {
        const required = edges.filter((e) => e.toNodeId === candidate.node.id)
        expect(required.every((e) => 0.6 * e.strength <= 0)).toBe(true)
      }
    }
  })

  it('places a brand-new learner at preA1 in every skill', async () => {
    const nodes = await listNodes(db)
    const levels = estimateLevels(nodes, [], NOW)
    expect(levels.length).toBeGreaterThan(0)
    expect(levels.every((l) => l.level === 'preA1')).toBe(true)
  })

  it('unlocks a dependent once its prerequisite is mastered', async () => {
    const nodes = await listNodes(db)
    const edges = await listEdges(db)

    // Drill the first grammar node until it is solid.
    for (let i = 0; i < 12; i++) {
      await recordOutcomes(db, 'u1', [{ nodeId: 'gram.a1.be_present', outcome: 1, difficulty: 0.6 }], NOW)
    }

    const mastery = await listMastery(db, 'u1')
    const next = selectNext({ nodes, edges, mastery, now: NOW, limit: 20 })

    expect(next.map((c) => c.node.id)).toContain('gram.a1.present_simple')
  })

  it('brings a faded node back as review', async () => {
    const nodes = await listNodes(db)
    const edges = await listEdges(db)

    for (let i = 0; i < 12; i++) {
      await recordOutcomes(db, 'u1', [{ nodeId: 'gram.a1.be_present', outcome: 1, difficulty: 0.6 }], NOW)
    }

    const mastery = await listMastery(db, 'u1')

    // Immediately after drilling it, there is nothing to review.
    const soon = selectNext({ nodes, edges, mastery, now: NOW, limit: 20 })
    expect(soon.find((c) => c.node.id === 'gram.a1.be_present')).toBeUndefined()

    // A year later it has faded below the review threshold and returns,
    // ahead of any new material.
    const later = selectNext({ nodes, edges, mastery, now: NOW + 365 * DAY, limit: 20 })
    const item = later.find((c) => c.node.id === 'gram.a1.be_present')
    expect(item?.reason).toBe('review')
    expect(later[0]?.reason).toBe('review')
  })
})
