import type { Db } from '@/db/client'
import type { ProfilerInventory } from '@/profiler/profile'
import { reviewItem } from '@/items/review'
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

/**
 * Publish a version after checking it, making it the live one.
 *
 * @throws PublishRejectedError when any gate rejects the item
 */
export async function publishItemVersion(
  db: Db,
  versionId: string,
  inventory: ProfilerInventory,
  now: number,
): Promise<PublishResult> {
  const version = await getItemVersion(db, versionId)
  if (!version) throw new Error(`Unknown item version "${versionId}".`)

  const item = await getItem(db, version.itemId)
  if (!item) throw new Error(`Item "${version.itemId}" is missing for version "${versionId}".`)

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

  const review = reviewItem(mcq, inventory)
  if (!review.passed) throw new PublishRejectedError(versionId, review)

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
