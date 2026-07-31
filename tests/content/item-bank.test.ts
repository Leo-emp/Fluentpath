import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { findItemsByNodes, findItemsByLevel, findItemsByFilter } from '@/content/item-bank'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

// Two nodes at different levels for filtering tests.
const NODES = [
  {
    id: 'gram.b1.pp_vs_past',
    type: 'grammar' as const,
    level: 'B1' as const,
    skill: 'general' as const,
    title: 'Present perfect vs past simple',
    description: '',
    metadata: null,
  },
  {
    id: 'gram.a2.past_simple',
    type: 'grammar' as const,
    level: 'A2' as const,
    skill: 'general' as const,
    title: 'Past simple with regular verbs',
    description: '',
    metadata: null,
  },
]

// A valid B1 MCQ payload targeting the B1 node.
const B1_PAYLOAD = {
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past'],
}

// A valid A2 MCQ payload targeting the A2 node.
const A2_PAYLOAD = {
  stem: 'They ______ football every Saturday when they were young.',
  options: [
    { text: 'played', misconception: null },
    { text: 'play', misconception: 'uses present tense for a finished habit' },
    { text: 'are playing', misconception: 'treats a past habit as a current action' },
    { text: 'have played', misconception: 'uses present perfect for a habit that has ended' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.a2.past_simple'],
}

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(db, NODES, NOW)
  await recordProvenance(
    db,
    { id: 'prov.original', sourceName: 'original', licence: 'original' },
    NOW,
  )
})

// Helper: create and publish an item in one step.
async function publishItem(
  id: string,
  payload: Record<string, unknown>,
  level: string,
  nodeIds: string[],
) {
  const versionId = await createItem(
    db,
    {
      id,
      type: 'mcq',
      level: level as 'B1',
      skill: 'general',
      nodeIds,
      payload,
      provenanceId: 'prov.original',
    },
    NOW,
  )
  await publishItemVersion(db, versionId, inventory, NOW)
  return versionId
}

// ─── findItemsByNodes ────────────────────────────────────────────────────

describe('findItemsByNodes', () => {
  it('returns published items targeting any of the given nodes', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'])
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.1')
    expect(result[0]!.stem).toContain('keys')
    expect(result[0]!.level).toBe('B1')
    expect(result[0]!.nodeIds).toContain('gram.b1.pp_vs_past')
  })

  it('returns items for multiple nodes', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past', 'gram.a2.past_simple'])
    expect(result).toHaveLength(2)
  })

  it('returns empty when no items match', async () => {
    const result = await findItemsByNodes(db, ['gram.c1.nonexistent'])
    expect(result).toHaveLength(0)
  })

  it('excludes items by id', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem(
      'item.b1.2',
      { ...B1_PAYLOAD, stem: 'She ______ to three different countries.' },
      'B1',
      ['gram.b1.pp_vs_past'],
    )

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'], { excludeIds: ['item.b1.1'] })
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.2')
  })

  it('respects the limit option', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem(
      'item.b1.2',
      { ...B1_PAYLOAD, stem: 'She ______ to three different countries.' },
      'B1',
      ['gram.b1.pp_vs_past'],
    )

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'], { limit: 1 })
    expect(result).toHaveLength(1)
  })

  it('skips draft items', async () => {
    // Create but do NOT publish.
    await createItem(
      db,
      {
        id: 'item.draft',
        type: 'mcq',
        level: 'B1',
        skill: 'general',
        nodeIds: ['gram.b1.pp_vs_past'],
        payload: B1_PAYLOAD,
        provenanceId: 'prov.original',
      },
      NOW,
    )

    const result = await findItemsByNodes(db, ['gram.b1.pp_vs_past'])
    expect(result).toHaveLength(0)
  })
})

// ─── findItemsByLevel ────────────────────────────────────────────────────

describe('findItemsByLevel', () => {
  it('returns published items at the given level', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByLevel(db, 'A2')
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.a2.1')
    expect(result[0]!.level).toBe('A2')
  })

  it('returns empty when no items at that level', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    const result = await findItemsByLevel(db, 'C1')
    expect(result).toHaveLength(0)
  })

  it('excludes items by id', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    const result = await findItemsByLevel(db, 'B1', { excludeIds: ['item.b1.1'] })
    expect(result).toHaveLength(0)
  })
})

// ─── findItemsByFilter ───────────────────────────────────────────────────

describe('findItemsByFilter', () => {
  it('filters by level and node simultaneously', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    await publishItem('item.a2.1', A2_PAYLOAD, 'A2', ['gram.a2.past_simple'])

    const result = await findItemsByFilter(db, {
      level: 'B1',
      nodeIds: ['gram.b1.pp_vs_past', 'gram.a2.past_simple'],
    })
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.1')
  })

  it('defaults to published mcq items', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])
    // Draft item should not appear.
    await createItem(
      db,
      {
        id: 'item.draft',
        type: 'mcq',
        level: 'B1',
        skill: 'general',
        nodeIds: ['gram.b1.pp_vs_past'],
        payload: B1_PAYLOAD,
        provenanceId: 'prov.original',
      },
      NOW,
    )

    const result = await findItemsByFilter(db, {})
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.b1.1')
  })

  it('can query draft items when status is overridden', async () => {
    await createItem(
      db,
      {
        id: 'item.draft',
        type: 'mcq',
        level: 'B1',
        skill: 'general',
        nodeIds: ['gram.b1.pp_vs_past'],
        payload: B1_PAYLOAD,
        provenanceId: 'prov.original',
      },
      NOW,
    )

    const result = await findItemsByFilter(db, { status: 'draft' })
    expect(result).toHaveLength(1)
    expect(result[0]!.id).toBe('item.draft')
  })

  it('reconstructs McqItem with correct fields', async () => {
    await publishItem('item.b1.1', B1_PAYLOAD, 'B1', ['gram.b1.pp_vs_past'])

    const [item] = await findItemsByFilter(db, {})
    expect(item!.id).toBe('item.b1.1')
    expect(item!.stem).toBe('I ______ my keys. I cannot open the door.')
    expect(item!.options).toHaveLength(4)
    expect(item!.options[0]!.text).toBe('have lost')
    expect(item!.options[0]!.misconception).toBeNull()
    expect(item!.options[1]!.misconception).toContain('past simple')
    expect(item!.correctIndex).toBe(0)
    expect(item!.nodeIds).toEqual(['gram.b1.pp_vs_past'])
    expect(item!.level).toBe('B1')
  })
})
