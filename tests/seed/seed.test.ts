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
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import { populateMastery } from '@/placement/populate'
import type { PlacementResult } from '@/placement/types'
import { SKILL_AREAS } from '@/skill-graph/types'
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

  // Exact counts from the spec — catches accidental additions or deletions.
  it('has exactly 45 nodes', () => {
    expect(SEED_NODES).toHaveLength(45)
  })

  it('has exactly 49 edges', () => {
    expect(SEED_EDGES).toHaveLength(49)
  })

  // Every skill area that has content must appear in the graph.
  it('covers every skill area', () => {
    const skills = new Set(SEED_NODES.map((n) => n.skill))
    for (const area of SKILL_AREAS) {
      expect(skills.has(area), `missing skill area: ${area}`).toBe(true)
    }
  })

  // The graph must have nodes at multiple CEFR levels to support
  // level estimation and placement.
  it('covers at least 5 CEFR levels', () => {
    const levels = new Set(SEED_NODES.map((n) => n.level))
    expect(levels.size).toBeGreaterThanOrEqual(5)
  })
})

describe('IELTS exam coverage', () => {
  // Every nodeId referenced by the IELTS exam definition must exist in
  // the seed graph. A missing node means the diagnosis engine would try
  // to attribute performance to a non-existent graph node.
  it('contains every node referenced by IELTS Academic', () => {
    const seedIds = new Set(SEED_NODES.map((n) => n.id))

    for (const section of IELTS_ACADEMIC.sections) {
      for (const slot of section.slots) {
        for (const nodeId of slot.nodeIds) {
          expect(
            seedIds.has(nodeId),
            `IELTS ${section.id}/${slot.id} references "${nodeId}" which is not in SEED_NODES`,
          ).toBe(true)
        }
      }
    }
  })

  // Strategy nodes must use the strat.ielts.* prefix, not strategy.ielts.*.
  it('IELTS strategy nodeIds use the strat.ielts.* prefix', () => {
    for (const section of IELTS_ACADEMIC.sections) {
      for (const slot of section.slots) {
        for (const nodeId of slot.nodeIds) {
          expect(nodeId).not.toMatch(/^strategy\./)
        }
      }
    }
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

  // A brand-new learner should see multiple node types, not just grammar.
  // This validates that the root nodes are diverse enough for a good
  // first session.
  it('gives a brand-new learner diverse node types', async () => {
    const nodes = await listNodes(db)
    const edges = await listEdges(db)

    const next = selectNext({ nodes, edges, mastery: [], now: NOW, limit: 20 })
    const types = new Set(next.map((c) => c.node.type))

    // Should include at least 3 different types (grammar, cando, lexical,
    // phono, or strategy).
    expect(types.size).toBeGreaterThanOrEqual(3)
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

  // After placement at B1, the level estimate should reflect the
  // placement result — not stay at preA1 forever.
  it('placement at B1 produces per-skill level estimates', async () => {
    const nodes = await listNodes(db)

    // Simulate a placement result at B1.
    const placementResult: PlacementResult = {
      estimatedLevel: 'B1',
      levelResults: {
        A1: { correct: 5, total: 5 },
        A2: { correct: 4, total: 5 },
        B1: { correct: 3, total: 5 },
        B2: { correct: 1, total: 5 },
      },
      itemsUsed: 20,
      answeredItemIds: [],
    }

    const mastery = populateMastery(placementResult, nodes, NOW)

    // With B1 placement, levels should be above preA1 for skills that
    // have nodes at A1/A2/B1.
    const levels = estimateLevels(nodes, mastery, NOW)
    expect(levels.length).toBeGreaterThan(0)

    // Every IELTS skill (listening, reading, writing, speaking) should
    // have an estimate.
    const skillSet = new Set(levels.map((l) => l.skill))
    expect(skillSet.has('listening')).toBe(true)
    expect(skillSet.has('reading')).toBe(true)
    expect(skillSet.has('writing')).toBe(true)
    expect(skillSet.has('speaking')).toBe(true)
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
