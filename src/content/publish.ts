import type { Db } from '@/db/client'
import type { ProfilerInventory } from '@/profiler/profile'
import type { GenerationProvider } from '@/generation/provider'
import { reviewItem } from '@/items/review'
import { reviewItemLlm } from '@/items/llm-review'
import type { ItemReview, McqItem } from '@/items/types'
import { getItem, getItemVersion, setCurrentVersion } from './repository'

/**
 * Publishing an item version.
 *
 * The quality gates run here, not earlier and not optionally. Draft content
 * may be as rough as an author likes; nothing reaches a learner without
 * passing.
 *
 * Putting the check at this boundary rather than at creation matters: it means
 * there is no route to a learner that bypasses it. A gate that can be skipped
 * under deadline pressure is not a gate.
 */

/**
 * Item types that have quality gates defined.
 *
 * Publishing a type absent from this list is refused outright. That is
 * deliberate: the alternative is coercing an unknown payload into the MCQ
 * shape and reporting a misleading failure — a gap-fill item has no options,
 * so it would be rejected for "needing at least three options" rather than for
 * the real reason, which is that nothing has been written to check it.
 *
 * Refusing clearly is safe. Checking the wrong thing and reporting success
 * would let unchecked content reach a learner.
 */
const GATED_ITEM_TYPES = new Set(['mcq'])

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

/**
 * Publish a version after checking it, making it the live one.
 *
 * Two-pass quality check:
 *   1. Deterministic gates (structure, answer key, level, duplicates)
 *   2. LLM rubric (naturalness, authenticity, teacher test, explanation)
 *
 * The LLM pass is required when a provider is given. Omitting it is only
 * acceptable in tests and seed data — production publishes must supply one.
 *
 * @throws PublishRejectedError when any gate rejects the item
 */
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

  // Refuse before reading the payload. Every gate below assumes the MCQ shape,
  // and running them over a different type would produce a confident, wrong
  // verdict rather than an honest refusal.
  if (!GATED_ITEM_TYPES.has(item.type)) throw new UnsupportedItemTypeError(item.type)

  // The payload is stored as JSON, so its shape is reconstructed here with the
  // level and node ids the item row carries.
  const mcq: McqItem = {
    id: version.itemId,
    stem: String(version.payload.stem ?? ''),
    options: Array.isArray(version.payload.options)
      ? (version.payload.options as McqItem['options'])
      : [],
    correctIndex: Number(version.payload.correctIndex ?? -1),
    nodeIds: Array.isArray(version.payload.nodeIds)
      ? (version.payload.nodeIds as string[])
      : [],
    level: item.level as McqItem['level'],
  }

  const review = reviewItem(mcq, { inventory })
  if (!review.passed) throw new PublishRejectedError(versionId, review)

  // Pass 2: LLM quality rubric — catches pedagogically weak items
  // that are structurally sound.
  if (options.llmProvider && options.nodeTitle) {
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

/**
 * Roll back to a previously published version.
 *
 * A pointer change, so recovery from a bad publish takes seconds and needs no
 * deploy. The bad version is left in place rather than deleted — it is part of
 * the record of what learners saw.
 */
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
