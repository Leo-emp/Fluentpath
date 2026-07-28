import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import {
  upsertNodes,
  upsertEdges,
  getNode,
  listNodes,
  listEdges,
  getPrerequisites,
} from '@/skill-graph/repository'
import type { Db } from '@/db/client'
import type { SkillNode } from '@/skill-graph/types'

const NOW = 1_700_000_000_000

function node(id: string, level: SkillNode['level'] = 'A1'): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

let db: Db

beforeEach(async () => {
  db = await makeTestDb()
})

describe('nodes', () => {
  it('stores and retrieves a node', async () => {
    await upsertNodes(db, [node('gram.a1.be')], NOW)
    const found = await getNode(db, 'gram.a1.be')
    expect(found?.id).toBe('gram.a1.be')
    expect(found?.level).toBe('A1')
    expect(found?.type).toBe('grammar')
  })

  it('returns null for an unknown node', async () => {
    expect(await getNode(db, 'nope')).toBeNull()
  })

  it('does nothing when given an empty list', async () => {
    await upsertNodes(db, [], NOW)
    expect(await listNodes(db)).toHaveLength(0)
  })

  it('upserts idempotently, updating in place', async () => {
    await upsertNodes(db, [node('gram.a1.be')], NOW)
    await upsertNodes(db, [{ ...node('gram.a1.be'), title: 'updated' }], NOW + 1000)

    const all = await listNodes(db)
    expect(all).toHaveLength(1)
    expect(all[0]?.title).toBe('updated')
  })

  it('round-trips json metadata', async () => {
    await upsertNodes(db, [{ ...node('n'), metadata: { cefrRef: 'A1.3', tags: ['core'] } }], NOW)
    const found = await getNode(db, 'n')
    expect(found?.metadata).toEqual({ cefrRef: 'A1.3', tags: ['core'] })
  })

  it('filters by level', async () => {
    await upsertNodes(db, [node('a', 'A1'), node('b', 'B1')], NOW)
    const result = await listNodes(db, { level: 'B1' })
    expect(result.map((n) => n.id)).toEqual(['b'])
  })

  it('filters by several fields at once', async () => {
    await upsertNodes(
      db,
      [
        { ...node('a', 'A1'), skill: 'reading' },
        { ...node('b', 'A1'), skill: 'speaking' },
      ],
      NOW,
    )
    const result = await listNodes(db, { level: 'A1', skill: 'speaking' })
    expect(result.map((n) => n.id)).toEqual(['b'])
  })
})

describe('edges', () => {
  beforeEach(async () => {
    await upsertNodes(db, [node('base', 'A1'), node('next', 'A2'), node('other', 'A1')], NOW)
  })

  it('stores and lists edges', async () => {
    await upsertEdges(db, [{ fromNodeId: 'base', toNodeId: 'next', strength: 1 }])
    expect(await listEdges(db)).toHaveLength(1)
  })

  it('returns the prerequisites of a node', async () => {
    await upsertEdges(db, [
      { fromNodeId: 'base', toNodeId: 'next', strength: 1 },
      { fromNodeId: 'other', toNodeId: 'next', strength: 0.5 },
    ])
    const prereqs = await getPrerequisites(db, 'next')
    expect(prereqs.map((e) => e.fromNodeId).sort()).toEqual(['base', 'other'])
  })

  it('upserts an edge idempotently, updating strength', async () => {
    await upsertEdges(db, [{ fromNodeId: 'base', toNodeId: 'next', strength: 1 }])
    await upsertEdges(db, [{ fromNodeId: 'base', toNodeId: 'next', strength: 0.3 }])

    const edges = await listEdges(db)
    expect(edges).toHaveLength(1)
    expect(edges[0]?.strength).toBeCloseTo(0.3)
  })

  it('returns an empty list for a node with no prerequisites', async () => {
    expect(await getPrerequisites(db, 'base')).toEqual([])
  })
})
