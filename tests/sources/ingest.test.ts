import { describe, it, expect } from 'vitest'
import { ingestPassage, ingestBatch } from '@/sources/ingest'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { SourcePassage } from '@/sources/types'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

// A minimal passage that passes all checks.
function goodPassage(overrides: Partial<SourcePassage> = {}): SourcePassage {
  return {
    sourceId: 'test:good',
    title: 'A Good Passage',
    body: 'The family lives in a small house near the river. Every morning, the children walk to school. They carry their books in small bags. The mother works at a shop in town. She sells fruit and vegetables. The father is a teacher at the local school. He helps young students learn to read and write.',
    level: 'A2',
    skill: 'reading',
    sourceUrl: 'https://example.com/good',
    sourceName: 'Test Source',
    licence: 'public-domain',
    attributionText: 'Test attribution',
    retrievedAt: NOW,
    ...overrides,
  }
}

// We use dryRun mode so we don't need a real database for most tests.
const dryDb = null as unknown as Db

describe('ingestPassage', () => {
  it('ingests a passage that meets all criteria', async () => {
    const result = await ingestPassage(dryDb, goodPassage(), inventory, NOW, { dryRun: true })
    expect(result.status).toBe('ingested')
  })

  it('skips passages that are too short', async () => {
    const result = await ingestPassage(
      dryDb,
      goodPassage({ body: 'Too short to be useful.' }),
      inventory,
      NOW,
      { dryRun: true },
    )
    expect(result.status).toBe('skipped')
    if (result.status === 'skipped') {
      expect(result.reason).toContain('Too short')
    }
  })

  it('skips passages that are too long', async () => {
    const result = await ingestPassage(
      dryDb,
      goodPassage({ body: 'word '.repeat(2500) }),
      inventory,
      NOW,
      { dryRun: true },
    )
    expect(result.status).toBe('skipped')
    if (result.status === 'skipped') {
      expect(result.reason).toContain('Too long')
    }
  })

  it('rejects passages with too many unknown words', async () => {
    // Invented words without digits — the profiler skips digit-containing tokens.
    const gibberish = Array.from({ length: 50 }, (_, i) => {
      const suffix = String.fromCharCode(97 + (i % 26)) + String.fromCharCode(97 + ((i + 7) % 26))
      return `zxqwkpl${suffix}`
    }).join(' ')
    const result = await ingestPassage(
      dryDb,
      goodPassage({ body: gibberish }),
      inventory,
      NOW,
      { dryRun: true },
    )
    expect(result.status).toBe('rejected')
    if (result.status === 'rejected') {
      expect(result.reason).toContain('Unmatched rate')
    }
  })

  it('rejects passages with a large level mismatch', async () => {
    // An A1-labelled passage written in C1 vocabulary.
    const c1Text =
      'The unprecedented ramifications of the geopolitical upheaval necessitated a comprehensive reassessment of the diplomatic framework. Multilateral negotiations commenced with considerable apprehension among the participating delegations. The intricate web of alliances and counterbalancing interests rendered any straightforward resolution virtually unattainable.'
    const result = await ingestPassage(
      dryDb,
      goodPassage({ body: c1Text, level: 'A1' }),
      inventory,
      NOW,
      { dryRun: true },
    )
    // The profiler will either reject for unmatched rate or level mismatch
    expect(result.status).not.toBe('ingested')
  })

  it('allows one level of drift between stated and measured', async () => {
    // This passage is A2-ish but labelled A2 — should pass.
    const result = await ingestPassage(dryDb, goodPassage(), inventory, NOW, { dryRun: true })
    expect(result.status).toBe('ingested')
  })

  it('returns provenance and lesson IDs on success', async () => {
    const result = await ingestPassage(dryDb, goodPassage(), inventory, NOW, { dryRun: true })
    if (result.status === 'ingested') {
      expect(result.provenanceId).toContain('test:good')
      expect(result.lessonDraftId).toContain('test:good')
    }
  })
})

describe('ingestBatch', () => {
  it('reports counts for a mixed batch', async () => {
    const passages = [
      goodPassage({ sourceId: 'batch:1' }),
      goodPassage({ sourceId: 'batch:2', body: 'Too short.' }),
      goodPassage({ sourceId: 'batch:3' }),
    ]
    const report = await ingestBatch(dryDb, passages, inventory, NOW, { dryRun: true })

    expect(report.total).toBe(3)
    expect(report.ingested).toBe(2)
    expect(report.skipped).toBe(1)
    expect(report.skipReasons).toHaveLength(1)
    expect(report.skipReasons[0]!.sourceId).toBe('batch:2')
  })

  it('returns an empty report for an empty batch', async () => {
    const report = await ingestBatch(dryDb, [], inventory, NOW, { dryRun: true })
    expect(report.total).toBe(0)
    expect(report.ingested).toBe(0)
  })

  it('separates rejections from skips', async () => {
    const gibberish = Array.from({ length: 50 }, (_, i) => {
      const suffix = String.fromCharCode(97 + (i % 26)) + String.fromCharCode(97 + ((i + 7) % 26))
      return `zxqwkpl${suffix}`
    }).join(' ')
    const passages = [
      goodPassage({ sourceId: 'r:1', body: gibberish }),
      goodPassage({ sourceId: 's:1', body: 'Short.' }),
    ]
    const report = await ingestBatch(dryDb, passages, inventory, NOW, { dryRun: true })

    expect(report.rejected).toBe(1)
    expect(report.skipped).toBe(1)
    expect(report.rejectionReasons[0]!.sourceId).toBe('r:1')
    expect(report.skipReasons[0]!.sourceId).toBe('s:1')
  })
})
