import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import {
  recordAttempt,
  recordAbandonment,
  recordReport,
  getStatistics,
} from '@/content/statistics'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db
let versionId: string

const PAYLOAD = {
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

beforeEach(async () => {
  db = await makeTestDb()
  await upsertNodes(
    db,
    [
      {
        id: 'gram.b1.pp_vs_past',
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
  versionId = await createItem(
    db,
    {
      id: 'item.1',
      type: 'mcq',
      level: 'B1',
      skill: 'general',
      nodeIds: ['gram.b1.pp_vs_past'],
      payload: PAYLOAD,
      provenanceId: 'prov.original',
    },
    NOW,
  )
  await publishItemVersion(db, versionId, inventory, NOW)
})

// ─── recordAttempt ───────────────────────────────────────────────────────

describe('recordAttempt', () => {
  it('creates statistics on first attempt', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats).not.toBeNull()
    expect(stats!.attempts).toBe(1)
    expect(stats!.correct).toBe(1)
    expect(stats!.pValue).toBeCloseTo(1.0)
  })

  it('increments on subsequent attempts', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)
    await recordAttempt(db, versionId, false, NOW + 2000)
    await recordAttempt(db, versionId, true, NOW + 3000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.attempts).toBe(3)
    expect(stats!.correct).toBe(2)
    expect(stats!.pValue).toBeCloseTo(2 / 3)
  })

  it('tracks incorrect answers without incrementing correct', async () => {
    await recordAttempt(db, versionId, false, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.attempts).toBe(1)
    expect(stats!.correct).toBe(0)
    expect(stats!.pValue).toBeCloseTo(0)
  })

  it('updates the timestamp on each attempt', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)
    await recordAttempt(db, versionId, true, NOW + 5000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.updatedAt).toBe(NOW + 5000)
  })
})

// ─── recordAbandonment ───────────────────────────────────────────────────

describe('recordAbandonment', () => {
  it('tracks abandonments separately from attempts', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)
    await recordAbandonment(db, versionId, NOW + 2000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.attempts).toBe(1)
    expect(stats!.abandonments).toBe(1)
  })

  it('creates statistics on first abandonment', async () => {
    await recordAbandonment(db, versionId, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats).not.toBeNull()
    expect(stats!.abandonments).toBe(1)
    expect(stats!.attempts).toBe(0)
  })
})

// ─── recordReport ────────────────────────────────────────────────────────

describe('recordReport', () => {
  it('tracks reports', async () => {
    await recordReport(db, versionId, NOW + 1000)
    await recordReport(db, versionId, NOW + 2000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.reports).toBe(2)
  })

  it('creates statistics on first report', async () => {
    await recordReport(db, versionId, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats).not.toBeNull()
    expect(stats!.reports).toBe(1)
    expect(stats!.attempts).toBe(0)
  })
})

// ─── getStatistics ───────────────────────────────────────────────────────

describe('getStatistics', () => {
  it('returns null when no statistics exist', async () => {
    const stats = await getStatistics(db, versionId)
    expect(stats).toBeNull()
  })

  it('leaves discrimination null (computed by batch pipeline)', async () => {
    await recordAttempt(db, versionId, true, NOW + 1000)

    const stats = await getStatistics(db, versionId)
    expect(stats!.discrimination).toBeNull()
  })
})
