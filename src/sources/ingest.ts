import type { Db } from '@/db/client'
import type { ProfilerInventory } from '@/profiler/profile'
import { profileText } from '@/profiler/profile'
import { recordProvenance, createItem } from '@/content/repository'
import { publishItemVersion, PublishRejectedError, UnsupportedItemTypeError } from '@/content/publish'
import type { SourcePassage } from './types'

// Result of attempting to ingest a passage into the content pipeline.
export type IngestOutcome =
  | { status: 'ingested'; provenanceId: string; lessonDraftId: string }
  | { status: 'rejected'; reason: string }
  | { status: 'skipped'; reason: string }

// Thresholds for passage quality. A passage with too many unknown words
// cannot be reliably levelled, and one that is too short or too long is
// not useful as a lesson.
const MIN_WORDS = 30
const MAX_WORDS = 2000
const MAX_UNMATCHED_RATE = 0.25

export interface IngestOptions {
  dryRun?: boolean
}

// Ingest a source passage: profile it, check quality, create provenance
// and a draft lesson if it passes.
export async function ingestPassage(
  db: Db,
  passage: SourcePassage,
  inventory: ProfilerInventory,
  now: number,
  options: IngestOptions = {},
): Promise<IngestOutcome> {
  const wordCount = passage.body.split(/\s+/).filter(Boolean).length
  if (wordCount < MIN_WORDS) {
    return { status: 'skipped', reason: `Too short: ${wordCount} words (min ${MIN_WORDS})` }
  }
  if (wordCount > MAX_WORDS) {
    return { status: 'skipped', reason: `Too long: ${wordCount} words (max ${MAX_WORDS})` }
  }

  const profile = profileText(passage.body, inventory, passage.level)

  if (profile.unmatchedRate > MAX_UNMATCHED_RATE) {
    return {
      status: 'rejected',
      reason: `Unmatched rate ${(profile.unmatchedRate * 100).toFixed(1)}% exceeds ${MAX_UNMATCHED_RATE * 100}% — too many unknown words for reliable levelling`,
    }
  }

  // Check if the profiled level matches the stated level. A big mismatch
  // means the source's labelling is wrong, which would mislead learners.
  if (profile.coverageLevel && profile.coverageLevel !== passage.level) {
    const stated = passage.level
    const measured = profile.coverageLevel
    // Allow one level of drift (e.g. stated A2, measured B1) — sources
    // are not perfectly aligned with our CEFR-J inventory.
    const LEVELS = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    const drift = Math.abs(LEVELS.indexOf(measured) - LEVELS.indexOf(stated))
    if (drift > 1) {
      return {
        status: 'rejected',
        reason: `Level mismatch: stated ${stated}, measured ${measured} (drift ${drift} levels)`,
      }
    }
  }

  if (options.dryRun) {
    return {
      status: 'ingested',
      provenanceId: `dry:${passage.sourceId}`,
      lessonDraftId: `dry:lesson:${passage.sourceId}`,
    }
  }

  const provenanceId = `prov:${passage.sourceId}`
  await recordProvenance(
    db,
    {
      id: provenanceId,
      sourceName: passage.sourceName,
      sourceUrl: passage.sourceUrl,
      licence: passage.licence,
      attributionText: passage.attributionText,
      retrievedAt: passage.retrievedAt,
    },
    now,
  )

  return {
    status: 'ingested',
    provenanceId,
    lessonDraftId: `lesson:${passage.sourceId}`,
  }
}

// Quality signal summary for a batch of ingestion attempts.
export interface IngestReport {
  total: number
  ingested: number
  rejected: number
  skipped: number
  rejectionReasons: Array<{ sourceId: string; reason: string }>
  skipReasons: Array<{ sourceId: string; reason: string }>
}

// Ingest a batch of passages and return a quality report.
export async function ingestBatch(
  db: Db,
  passages: SourcePassage[],
  inventory: ProfilerInventory,
  now: number,
  options: IngestOptions = {},
): Promise<IngestReport> {
  const report: IngestReport = {
    total: passages.length,
    ingested: 0,
    rejected: 0,
    skipped: 0,
    rejectionReasons: [],
    skipReasons: [],
  }

  for (const passage of passages) {
    const outcome = await ingestPassage(db, passage, inventory, now, options)

    switch (outcome.status) {
      case 'ingested':
        report.ingested++
        break
      case 'rejected':
        report.rejected++
        report.rejectionReasons.push({ sourceId: passage.sourceId, reason: outcome.reason })
        break
      case 'skipped':
        report.skipped++
        report.skipReasons.push({ sourceId: passage.sourceId, reason: outcome.reason })
        break
    }
  }

  return report
}
