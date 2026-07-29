import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes } from '@/skill-graph/repository'
import {
  addItemVersion,
  createItem,
  getItem,
  listItemVersions,
  recordProvenance,
  retireItem,
} from '@/content/repository'
import {
  PublishRejectedError,
  UnsupportedItemTypeError,
  publishItemVersion,
  rollbackItem,
} from '@/content/publish'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

const GOOD_PAYLOAD = {
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past_simple'],
}

const BAD_PAYLOAD = {
  stem: 'We ______ to Japan in 2018.',
  options: [
    { text: 'went', misconception: null },
    { text: 'have gone', misconception: null },
    { text: 'have go', misconception: null },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past_simple'],
}

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(
    db,
    [
      {
        id: 'gram.b1.pp_vs_past_simple',
        type: 'grammar',
        level: 'B1',
        skill: 'general',
        title: 'Present perfect vs past simple',
        description: '',
        metadata: null,
      },
    ],
    NOW,
  )
  await recordProvenance(
    db,
    { id: 'prov.original', sourceName: 'original', licence: 'original' },
    NOW,
  )
})

async function makeItem(payload: Record<string, unknown>, id = 'item.1') {
  return createItem(
    db,
    {
      id,
      type: 'mcq',
      level: 'B1',
      skill: 'general',
      nodeIds: ['gram.b1.pp_vs_past_simple'],
      payload,
      provenanceId: 'prov.original',
    },
    NOW,
  )
}

describe('creating content', () => {
  it('creates an item as a draft, not published', async () => {
    await makeItem(GOOD_PAYLOAD)
    const item = await getItem(db, 'item.1')
    expect(item?.status).toBe('draft')
    expect(item?.currentVersionId).toBeNull()
  })

  it('requires provenance', async () => {
    await expect(
      createItem(
        db,
        {
          id: 'item.2',
          type: 'mcq',
          level: 'B1',
          skill: 'general',
          nodeIds: [],
          payload: GOOD_PAYLOAD,
          provenanceId: 'prov.missing',
        },
        NOW,
      ),
    ).rejects.toThrow()
  })
})

describe('the quality gate at publication', () => {
  it('publishes an item that passes', async () => {
    const versionId = await makeItem(GOOD_PAYLOAD)
    const result = await publishItemVersion(db, versionId, inventory, NOW)

    expect(result.review.passed).toBe(true)
    const item = await getItem(db, 'item.1')
    expect(item?.status).toBe('published')
    expect(item?.currentVersionId).toBe(versionId)
  })

  it('refuses to publish an item that fails', async () => {
    const versionId = await makeItem(BAD_PAYLOAD)
    await expect(publishItemVersion(db, versionId, inventory, NOW)).rejects.toThrow(
      PublishRejectedError,
    )
  })

  it('leaves a rejected item unpublished', async () => {
    const versionId = await makeItem(BAD_PAYLOAD)
    await publishItemVersion(db, versionId, inventory, NOW).catch(() => {})

    const item = await getItem(db, 'item.1')
    expect(item?.status).toBe('draft')
    expect(item?.currentVersionId).toBeNull()
  })

  it('names every reason for rejection', async () => {
    const versionId = await makeItem(BAD_PAYLOAD)
    const error = await publishItemVersion(db, versionId, inventory, NOW).catch((e) => e)

    expect(error).toBeInstanceOf(PublishRejectedError)
    expect(error.message).toContain('STEM_GIVEAWAY')
    expect(error.message).toContain('MALFORMED_OPTION')
  })
})

describe('item types without gates', () => {
  // The schema allows gap_fill, writing_task and speaking_prompt, but only
  // MCQ has checks written. Coercing another type into the MCQ shape would
  // reject it for "needing three options" rather than for the real reason.

  it('refuses to publish a type it cannot check', async () => {
    await recordProvenance(db, { id: 'prov.x', sourceName: 'original', licence: 'original' }, NOW)
    const versionId = await createItem(
      db,
      {
        id: 'item.gap',
        type: 'gap_fill',
        level: 'B1',
        skill: 'general',
        nodeIds: [],
        payload: { stem: 'I ______ my keys.', answer: 'lost' },
        provenanceId: 'prov.x',
      },
      NOW,
    )

    await expect(publishItemVersion(db, versionId, inventory, NOW)).rejects.toThrow(
      UnsupportedItemTypeError,
    )
  })

  it('says why, naming the type and what is supported', async () => {
    await recordProvenance(db, { id: 'prov.y', sourceName: 'original', licence: 'original' }, NOW)
    const versionId = await createItem(
      db,
      {
        id: 'item.write',
        type: 'writing_task',
        level: 'B2',
        skill: 'writing',
        nodeIds: [],
        payload: { prompt: 'Describe a place you know well.' },
        provenanceId: 'prov.y',
      },
      NOW,
    )

    const error = await publishItemVersion(db, versionId, inventory, NOW).catch((e) => e)
    expect(error.message).toContain('writing_task')
    expect(error.message).toContain('mcq')
  })

  it('leaves the unsupported item unpublished', async () => {
    await recordProvenance(db, { id: 'prov.z', sourceName: 'original', licence: 'original' }, NOW)
    const versionId = await createItem(
      db,
      {
        id: 'item.speak',
        type: 'speaking_prompt',
        level: 'B1',
        skill: 'speaking',
        nodeIds: [],
        payload: { prompt: 'Talk about your last holiday.' },
        provenanceId: 'prov.z',
      },
      NOW,
    )

    await publishItemVersion(db, versionId, inventory, NOW).catch(() => {})
    expect((await getItem(db, 'item.speak'))?.status).toBe('draft')
  })
})

describe('versioning', () => {
  it('adds a version without touching the previous one', async () => {
    const first = await makeItem(GOOD_PAYLOAD)
    await publishItemVersion(db, first, inventory, NOW)

    const second = await addItemVersion(
      db,
      'item.1',
      { ...GOOD_PAYLOAD, stem: 'I ______ my wallet. I cannot pay.' },
      'prov.original',
      NOW + 1000,
    )

    const versions = await listItemVersions(db, 'item.1')
    expect(versions).toHaveLength(2)
    // The first is still published and still says what it always said.
    const original = versions.find((v) => v.id === first)
    expect(original?.publishedAt).toBe(NOW)
    expect((original?.payload as Record<string, unknown>).stem).toContain('keys')
    expect(second).toBe('item.1@2')
  })

  it('does not switch the live version until the new one is published', async () => {
    const first = await makeItem(GOOD_PAYLOAD)
    await publishItemVersion(db, first, inventory, NOW)
    await addItemVersion(db, 'item.1', GOOD_PAYLOAD, 'prov.original', NOW + 1000)

    expect((await getItem(db, 'item.1'))?.currentVersionId).toBe(first)
  })

  it('refuses to version an unknown item', async () => {
    await expect(
      addItemVersion(db, 'item.ghost', GOOD_PAYLOAD, 'prov.original', NOW),
    ).rejects.toThrow(/ghost/)
  })
})

describe('rollback', () => {
  it('restores a previous version with a pointer change', async () => {
    const first = await makeItem(GOOD_PAYLOAD)
    await publishItemVersion(db, first, inventory, NOW)

    const second = await addItemVersion(
      db,
      'item.1',
      { ...GOOD_PAYLOAD, stem: 'I ______ my wallet. I cannot pay.' },
      'prov.original',
      NOW + 1000,
    )
    await publishItemVersion(db, second, inventory, NOW + 1000)
    expect((await getItem(db, 'item.1'))?.currentVersionId).toBe(second)

    await rollbackItem(db, 'item.1', first, NOW + 2000)
    expect((await getItem(db, 'item.1'))?.currentVersionId).toBe(first)
  })

  it('refuses to roll back to a version that was never published', async () => {
    const first = await makeItem(GOOD_PAYLOAD)
    await publishItemVersion(db, first, inventory, NOW)
    const draft = await addItemVersion(db, 'item.1', GOOD_PAYLOAD, 'prov.original', NOW + 1000)

    await expect(rollbackItem(db, 'item.1', draft, NOW + 2000)).rejects.toThrow(/never published/)
  })
})

describe('retirement', () => {
  it('retires an item without deleting its history', async () => {
    const versionId = await makeItem(GOOD_PAYLOAD)
    await publishItemVersion(db, versionId, inventory, NOW)
    await retireItem(db, 'item.1', NOW + 5000)

    expect((await getItem(db, 'item.1'))?.status).toBe('retired')
    expect(await listItemVersions(db, 'item.1')).toHaveLength(1)
  })
})
