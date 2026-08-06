import type { Db } from '@/db/client'
import type { ProfilerInventory } from '@/profiler/profile'
import type { GenerationProvider } from '@/generation/provider'
import { reviewItem, reviewContentItem } from '@/items/review'
import { reviewItemLlm } from '@/items/llm-review'
import type { ItemReview, McqItem, ContentItem } from '@/items/types'
import { ITEM_TYPES } from '@/items/types'
import { getItem, getItemVersion, setCurrentVersion } from './repository'
import { reconstructContentItem } from './reconstruct'

// # All item types in ITEM_TYPES have quality gates defined.
// # Adding a type to types.ts + a reviewer in review-*.ts automatically enables it.
const GATED_ITEM_TYPES = new Set<string>(ITEM_TYPES)

export class UnsupportedItemTypeError extends Error {
  constructor(readonly itemType: string) {
    super(
      `No quality gates are defined for item type "${itemType}", so it cannot be published. ` +
        `Gated types: ${[...GATED_ITEM_TYPES].join(', ')}.`,
    )
    this.name = 'UnsupportedItemTypeError'
  }
}

export class PublishRejectedError extends Error {
  constructor(
    readonly versionId: string,
    readonly review: ItemReview,
  ) {
    const reasons = review.issues
      .filter((i) => i.severity === 'reject')
      .map((i) => `  ${i.code}: ${i.message}`)
      .join('\n')

    super(`Refusing to publish "${versionId}" — it fails the quality gates:\n${reasons}`)
    this.name = 'PublishRejectedError'
  }
}

export interface PublishResult {
  versionId: string
  review: ItemReview
}

export interface PublishOptions {
  llmProvider?: GenerationProvider
  nodeTitle?: string
}

// # Publish a version after checking it, making it the live one.
// # Two-pass quality check:
// #   1. Deterministic gates (structure, answer key, level, duplicates)
// #   2. LLM rubric (naturalness, authenticity) — MCQ only for now
export async function publishItemVersion(
  db: Db,
  versionId: string,
  inventory: ProfilerInventory,
  now: number,
  options: PublishOptions = {},
): Promise<PublishResult> {
  const version = await getItemVersion(db, versionId)
  if (!version) throw new Error(`Unknown item version "${versionId}".`)

  const item = await getItem(db, version.itemId)
  if (!item) throw new Error(`Item "${version.itemId}" is missing for version "${versionId}".`)

  // # Refuse types that have no quality gate defined.
  if (!GATED_ITEM_TYPES.has(item.type)) throw new UnsupportedItemTypeError(item.type)

  // # Reconstruct the domain object from the stored JSON payload.
  const contentItem = reconstructContentItem(item, version)

  // # Pass 1: deterministic structural review.
  const review = reviewContentItem(contentItem, { inventory })
  if (!review.passed) throw new PublishRejectedError(versionId, review)

  // # Pass 2: LLM quality rubric — only for MCQ items currently.
  if (item.type === 'mcq' && options.llmProvider && options.nodeTitle) {
    const mcq = contentItem as McqItem
    const llmReview = await reviewItemLlm(mcq, options.llmProvider, options.nodeTitle)
    if (!llmReview.passed) {
      const combined: ItemReview = {
        ...review,
        passed: false,
        issues: [...review.issues, ...llmReview.issues],
      }
      throw new PublishRejectedError(versionId, combined)
    }
    review.issues.push(...llmReview.issues)
  }

  await setCurrentVersion(db, version.itemId, versionId, now)

  return { versionId, review }
}

// # Roll back to a previously published version.
// # A pointer change — recovery from a bad publish takes seconds.
export async function rollbackItem(
  db: Db,
  itemId: string,
  versionId: string,
  now: number,
): Promise<void> {
  const version = await getItemVersion(db, versionId)
  if (!version || version.itemId !== itemId) {
    throw new Error(`Version "${versionId}" does not belong to item "${itemId}".`)
  }
  if (version.publishedAt === null) {
    throw new Error(`Cannot roll back to "${versionId}" — it was never published.`)
  }

  await setCurrentVersion(db, itemId, versionId, now)
}
