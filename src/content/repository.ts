import { and, eq, max } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { itemNodes, itemVersions, items, provenance } from '@/db/schema'
import type { ContentStatus } from '@/db/schema/content'
import type { CefrLevel, SkillArea } from '@/skill-graph/types'

/**
 * Storage for items and their versions.
 *
 * Every write goes through here so two invariants hold everywhere: a published
 * version is never mutated, and nothing is stored without provenance.
 */

export interface ProvenanceInput {
  id: string
  sourceName: string
  sourceUrl?: string
  licence: string
  licenceUrl?: string
  attributionText?: string
  retrievedAt?: number
  modifications?: string
}

export async function recordProvenance(
  db: Db,
  input: ProvenanceInput,
  now: number,
): Promise<string> {
  await db
    .insert(provenance)
    .values({
      id: input.id,
      sourceName: input.sourceName,
      sourceUrl: input.sourceUrl ?? null,
      licence: input.licence,
      licenceUrl: input.licenceUrl ?? null,
      attributionText: input.attributionText ?? '',
      retrievedAt: input.retrievedAt ?? null,
      modifications: input.modifications ?? '',
      createdAt: now,
    })
    .onConflictDoNothing()

  return input.id
}

export interface CreateItemInput {
  id: string
  type: string
  level: CefrLevel
  skill: SkillArea
  nodeIds: string[]
  payload: Record<string, unknown>
  provenanceId: string
  lessonId?: string
}

/**
 * Create an item together with its first version, as a draft.
 *
 * Nothing is published here. An item becomes visible to learners only through
 * `publishItemVersion`, which runs the quality gates first.
 */
export async function createItem(db: Db, input: CreateItemInput, now: number): Promise<string> {
  const versionId = `${input.id}@1`

  await db.insert(items).values({
    id: input.id,
    type: input.type,
    level: input.level,
    skill: input.skill,
    status: 'draft',
    lessonId: input.lessonId ?? null,
    currentVersionId: null,
    createdAt: now,
    updatedAt: now,
  })

  await db.insert(itemVersions).values({
    id: versionId,
    itemId: input.id,
    version: 1,
    payload: input.payload,
    provenanceId: input.provenanceId,
    publishedAt: null,
    retiredAt: null,
    createdAt: now,
  })

  if (input.nodeIds.length > 0) {
    await db
      .insert(itemNodes)
      .values(input.nodeIds.map((nodeId) => ({ itemId: input.id, nodeId })))
      .onConflictDoNothing()
  }

  return versionId
}

/**
 * Add a new version of an existing item.
 *
 * The previous version is left exactly as it was. This is what makes rollback
 * a pointer change rather than a restore, and what lets item statistics stay
 * meaningful — old numbers continue to describe the version they measured.
 */
export async function addItemVersion(
  db: Db,
  itemId: string,
  payload: Record<string, unknown>,
  provenanceId: string,
  now: number,
): Promise<string> {
  const rows = await db
    .select({ highest: max(itemVersions.version) })
    .from(itemVersions)
    .where(eq(itemVersions.itemId, itemId))

  const next = (rows[0]?.highest ?? 0) + 1
  if (next === 1) throw new Error(`Cannot add a version to unknown item "${itemId}".`)

  const versionId = `${itemId}@${next}`

  await db.insert(itemVersions).values({
    id: versionId,
    itemId,
    version: next,
    payload,
    provenanceId,
    publishedAt: null,
    retiredAt: null,
    createdAt: now,
  })

  await db.update(items).set({ updatedAt: now }).where(eq(items.id, itemId))

  return versionId
}

export async function getItemVersion(db: Db, versionId: string) {
  const rows = await db.select().from(itemVersions).where(eq(itemVersions.id, versionId)).limit(1)
  return rows[0] ?? null
}

export async function listItemVersions(db: Db, itemId: string) {
  return db.select().from(itemVersions).where(eq(itemVersions.itemId, itemId))
}

export async function getItem(db: Db, itemId: string) {
  const rows = await db.select().from(items).where(eq(items.id, itemId)).limit(1)
  return rows[0] ?? null
}

/** Set which version is live and mark the item published. */
export async function setCurrentVersion(
  db: Db,
  itemId: string,
  versionId: string,
  now: number,
): Promise<void> {
  const version = await getItemVersion(db, versionId)
  if (!version || version.itemId !== itemId) {
    throw new Error(`Version "${versionId}" does not belong to item "${itemId}".`)
  }

  await db
    .update(itemVersions)
    .set({ publishedAt: now })
    .where(and(eq(itemVersions.id, versionId), eq(itemVersions.itemId, itemId)))

  await db
    .update(items)
    .set({ currentVersionId: versionId, status: 'published', updatedAt: now })
    .where(eq(items.id, itemId))
}

/** Take an item out of service without deleting anything. */
export async function retireItem(db: Db, itemId: string, now: number): Promise<void> {
  await db
    .update(items)
    .set({ status: 'retired' satisfies ContentStatus, updatedAt: now })
    .where(eq(items.id, itemId))
}
