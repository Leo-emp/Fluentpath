import { and, eq, inArray, notInArray } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { itemNodes, itemVersions, items } from '@/db/schema'
import type { ContentStatus } from '@/db/schema/content'
import type { McqItem, McqOption, ContentItem } from '@/items/types'
import type { CefrLevel, SkillArea } from '@/skill-graph/types'
import { reconstructContentItem } from './reconstruct'

// # ─── Types ───────────────────────────────────────────────────────────────

// # Options shared by the convenience functions (findItemsByNodes/Level).
export interface ItemBankOptions {
  // # Item IDs to exclude (e.g. already seen in session).
  excludeIds?: string[]
  // # Maximum number of items to return.
  limit?: number
}

// # Full filter for the general-purpose query.
export interface ItemBankFilter {
  level?: CefrLevel
  skill?: SkillArea
  // # Item type — defaults to 'mcq' for backward compatibility.
  type?: string
  // # Items targeting ANY of these nodes.
  nodeIds?: string[]
  // # Content lifecycle status — defaults to 'published'.
  status?: ContentStatus
  excludeIds?: string[]
  limit?: number
}

// # ─── Row-to-domain conversion ────────────────────────────────────────────

// # Reconstruct an McqItem from a DB item row, its current version payload,
// # and the node IDs from the join table.
function toMcqItem(
  itemRow: { id: string; level: string },
  payload: Record<string, unknown>,
  nodeIds: string[],
): McqItem {
  return {
    id: itemRow.id,
    type: 'mcq',
    stem: String(payload.stem ?? ''),
    options: Array.isArray(payload.options)
      ? (payload.options as McqOption[])
      : [],
    correctIndex: Number(payload.correctIndex ?? -1),
    nodeIds,
    level: itemRow.level as CefrLevel,
    difficulty: typeof payload.difficulty === 'number' ? payload.difficulty : null,
  }
}

// # ─── Shared query builder ────────────────────────────────────────────────

// # Internal query structure shared by MCQ and generic queries.
interface MatchedRow {
  id: string
  level: string
  type: string
  skill: string
  currentVersionId: string | null
}

// # Build and execute the common item query, returning raw matched rows
// # along with their version payloads and node IDs.
async function queryItemRows(db: Db, filter: ItemBankFilter): Promise<{
  matchedItems: MatchedRow[]
  versionMap: Map<string, { payload: Record<string, unknown> }>
  draftVersionMap: Map<string, { payload: Record<string, unknown> }>
  nodeMap: Map<string, string[]>
}> {
  // # Default to published MCQ items.
  const status = filter.status ?? 'published'
  const type = filter.type ?? 'mcq'

  const conditions = [
    eq(items.status, status),
    eq(items.type, type),
  ]

  if (filter.level) conditions.push(eq(items.level, filter.level))
  if (filter.skill) conditions.push(eq(items.skill, filter.skill))
  if (filter.excludeIds && filter.excludeIds.length > 0) {
    conditions.push(notInArray(items.id, filter.excludeIds))
  }

  if (filter.nodeIds && filter.nodeIds.length > 0) {
    conditions.push(inArray(itemNodes.nodeId, filter.nodeIds))
  }

  const needsNodeJoin = !!(filter.nodeIds && filter.nodeIds.length > 0)

  let query = db
    .selectDistinct({
      id: items.id,
      level: items.level,
      type: items.type,
      skill: items.skill,
      currentVersionId: items.currentVersionId,
    })
    .from(items)
    .$dynamic()

  if (needsNodeJoin) {
    query = query.innerJoin(itemNodes, eq(items.id, itemNodes.itemId))
  }

  const baseQuery = query.where(and(...conditions))
  const limitedQuery = filter.limit ? baseQuery.limit(filter.limit) : baseQuery
  const matchedItems = await limitedQuery

  if (matchedItems.length === 0) {
    return { matchedItems: [], versionMap: new Map(), draftVersionMap: new Map(), nodeMap: new Map() }
  }

  // # Fetch version payloads.
  const withVersionId = matchedItems.filter((r) => r.currentVersionId !== null)
  const withoutVersionId = matchedItems.filter((r) => r.currentVersionId === null)

  const versionIds = withVersionId.map((r) => r.currentVersionId!)

  const versionsByIdRows = versionIds.length > 0
    ? await db.select().from(itemVersions).where(inArray(itemVersions.id, versionIds))
    : []

  const draftItemIds = withoutVersionId.map((r) => r.id)
  const versionsByItemRows = draftItemIds.length > 0
    ? await db.select().from(itemVersions).where(inArray(itemVersions.itemId, draftItemIds))
    : []

  const versionMap = new Map(versionsByIdRows.map((v) => [v.id, v]))
  const draftVersionMap = new Map(versionsByItemRows.map((v) => [v.itemId, v]))

  // # Fetch node IDs.
  const itemIds = matchedItems.map((r) => r.id)
  const nodeRows = await db
    .select()
    .from(itemNodes)
    .where(inArray(itemNodes.itemId, itemIds))

  const nodeMap = new Map<string, string[]>()
  for (const row of nodeRows) {
    const list = nodeMap.get(row.itemId) ?? []
    list.push(row.nodeId)
    nodeMap.set(row.itemId, list)
  }

  return { matchedItems, versionMap, draftVersionMap, nodeMap }
}

// # MCQ-specific query — returns McqItem[] for backward compatibility.
async function queryMcqItems(db: Db, filter: ItemBankFilter): Promise<McqItem[]> {
  const { matchedItems, versionMap, draftVersionMap, nodeMap } = await queryItemRows(db, filter)

  const result: McqItem[] = []
  for (const row of matchedItems) {
    const version = row.currentVersionId
      ? versionMap.get(row.currentVersionId)
      : draftVersionMap.get(row.id)
    if (!version) continue
    result.push(toMcqItem(row, version.payload, nodeMap.get(row.id) ?? []))
  }

  return result
}

// # Generic query — returns ContentItem[] (discriminated union of all types).
async function queryContentItems(db: Db, filter: ItemBankFilter): Promise<ContentItem[]> {
  const { matchedItems, versionMap, draftVersionMap, nodeMap } = await queryItemRows(db, filter)

  const result: ContentItem[] = []
  for (const row of matchedItems) {
    const version = row.currentVersionId
      ? versionMap.get(row.currentVersionId)
      : draftVersionMap.get(row.id)
    if (!version) continue

    // # Inject node IDs from the join table into the payload before reconstruction.
    const payloadWithNodes = { ...version.payload, nodeIds: nodeMap.get(row.id) ?? [] }
    const contentItem = reconstructContentItem(
      { id: row.id, type: row.type, level: row.level, skill: row.skill },
      { itemId: row.id, payload: payloadWithNodes },
    )
    result.push(contentItem)
  }

  return result
}

// # ─── Public API ──────────────────────────────────────────────────────────

// # Find published MCQ items targeting any of the given skill graph nodes.
// # Used by the sequencer to fetch items for the nodes it selects.
export async function findItemsByNodes(
  db: Db,
  nodeIds: string[],
  opts?: ItemBankOptions,
): Promise<McqItem[]> {
  return queryMcqItems(db, {
    nodeIds,
    excludeIds: opts?.excludeIds,
    limit: opts?.limit,
  })
}

// # Find published items of ALL types targeting any of the given nodes.
// # Returns generic content items with type + payload for the practice UI.
export async function findAllItemsByNodes(
  db: Db,
  nodeIds: string[],
  opts?: ItemBankOptions,
): Promise<ContentItem[]> {
  // # Query each item type and merge results.
  const allItems: ContentItem[] = []
  const types = ['mcq', 'gap_fill', 'reading_passage', 'writing_task', 'speaking_prompt',
    'reorder', 'highlight_incorrect', 'sentence_transform', 'error_correction',
    'word_formation', 'matching', 'dialogue_completion']

  for (const type of types) {
    const items = await queryContentItems(db, {
      type,
      nodeIds,
      excludeIds: opts?.excludeIds,
    })
    allItems.push(...items)
  }

  // # Apply limit after merging all types.
  if (opts?.limit && allItems.length > opts.limit) {
    return allItems.slice(0, opts.limit)
  }
  return allItems
}

// # Find published MCQ items at a specific CEFR level.
// # Used by placement to pull items at each level for the adaptive algorithm.
export async function findItemsByLevel(
  db: Db,
  level: CefrLevel,
  opts?: ItemBankOptions,
): Promise<McqItem[]> {
  return queryMcqItems(db, {
    level,
    excludeIds: opts?.excludeIds,
    limit: opts?.limit,
  })
}

// # General-purpose MCQ query with all filter dimensions.
// # Used by the mock-test engine.
export async function findItemsByFilter(
  db: Db,
  filter: ItemBankFilter,
): Promise<McqItem[]> {
  return queryMcqItems(db, filter)
}

// # ─── Generic Content Queries ──────────────────────────────────────────────
// # These return the full ContentItem union type, supporting all item types.

// # Find content items of any type by filter. The `type` field determines
// # which item type is returned.
export async function findContentByFilter(
  db: Db,
  filter: ItemBankFilter,
): Promise<ContentItem[]> {
  return queryContentItems(db, filter)
}

// # Find content items of any type at a specific CEFR level.
export async function findContentByLevel(
  db: Db,
  level: CefrLevel,
  type: string,
  opts?: ItemBankOptions,
): Promise<ContentItem[]> {
  return queryContentItems(db, {
    level,
    type,
    excludeIds: opts?.excludeIds,
    limit: opts?.limit,
  })
}
