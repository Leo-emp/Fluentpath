import { and, eq, inArray, notInArray } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { itemNodes, itemVersions, items } from '@/db/schema'
import type { ContentStatus } from '@/db/schema/content'
import type { McqItem, McqOption } from '@/items/types'
import type { CefrLevel, SkillArea } from '@/skill-graph/types'

// ─── Types ───────────────────────────────────────────────────────────────

// Options shared by the convenience functions (findItemsByNodes/Level).
export interface ItemBankOptions {
  // Item IDs to exclude (e.g. already seen in session).
  excludeIds?: string[]
  // Maximum number of items to return.
  limit?: number
}

// Full filter for the general-purpose query.
export interface ItemBankFilter {
  level?: CefrLevel
  skill?: SkillArea
  // Item type — defaults to 'mcq'.
  type?: string
  // Items targeting ANY of these nodes.
  nodeIds?: string[]
  // Content lifecycle status — defaults to 'published'.
  status?: ContentStatus
  excludeIds?: string[]
  limit?: number
}

// ─── Row-to-domain conversion ────────────────────────────────────────────

// Reconstruct an McqItem from a DB item row, its current version payload,
// and the node IDs from the join table. Node IDs come from item_nodes, not
// the payload — the join table is authoritative.
function toMcqItem(
  itemRow: { id: string; level: string },
  payload: Record<string, unknown>,
  nodeIds: string[],
): McqItem {
  return {
    id: itemRow.id,
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

// ─── Shared query builder ────────────────────────────────────────────────

// Build and execute an item bank query with the given filters. All three
// public functions delegate here so the SQL join logic is not duplicated.
async function queryItems(db: Db, filter: ItemBankFilter): Promise<McqItem[]> {
  // Default to published MCQ items.
  const status = filter.status ?? 'published'
  const type = filter.type ?? 'mcq'

  // Build conditions. Drizzle's .where() replaces rather than accumulates,
  // so conditions are collected into an array and combined with and().
  const conditions = [
    eq(items.status, status),
    eq(items.type, type),
  ]

  if (filter.level) conditions.push(eq(items.level, filter.level))
  if (filter.skill) conditions.push(eq(items.skill, filter.skill))
  if (filter.excludeIds && filter.excludeIds.length > 0) {
    conditions.push(notInArray(items.id, filter.excludeIds))
  }

  // When filtering by nodeIds, join through item_nodes to find items
  // targeting any of the given nodes.
  if (filter.nodeIds && filter.nodeIds.length > 0) {
    conditions.push(inArray(itemNodes.nodeId, filter.nodeIds))
  }

  const needsNodeJoin = !!(filter.nodeIds && filter.nodeIds.length > 0)

  // Step 1: find matching item IDs with selectDistinct to deduplicate
  // items that target multiple of the requested nodes.
  let query = db
    .selectDistinct({
      id: items.id,
      level: items.level,
      currentVersionId: items.currentVersionId,
    })
    .from(items)
    .$dynamic()

  // Join item_nodes only when filtering by node — avoids the join cost
  // on queries that don't need it.
  if (needsNodeJoin) {
    query = query.innerJoin(itemNodes, eq(items.id, itemNodes.itemId))
  }

  const baseQuery = query.where(and(...conditions))
  const limitedQuery = filter.limit ? baseQuery.limit(filter.limit) : baseQuery
  const matchedItems = await limitedQuery

  if (matchedItems.length === 0) return []

  // Step 2: fetch the version payload for each matched item.
  // Published items use currentVersionId. Draft/in_review items have
  // currentVersionId = null, so we fall back to any version by itemId.
  const withVersionId = matchedItems.filter((r) => r.currentVersionId !== null)
  const withoutVersionId = matchedItems.filter((r) => r.currentVersionId === null)

  const versionIds = withVersionId
    .map((r) => r.currentVersionId!)

  // Fetch versions by ID for published items.
  const versionsByIdRows = versionIds.length > 0
    ? await db.select().from(itemVersions).where(inArray(itemVersions.id, versionIds))
    : []

  // Fetch versions by itemId for draft/in_review items.
  const draftItemIds = withoutVersionId.map((r) => r.id)
  const versionsByItemRows = draftItemIds.length > 0
    ? await db.select().from(itemVersions).where(inArray(itemVersions.itemId, draftItemIds))
    : []

  // Index versions: for published items, key by version ID; for drafts,
  // key by itemId (take the first version found).
  const versionMap = new Map(versionsByIdRows.map((v) => [v.id, v]))
  const draftVersionMap = new Map(versionsByItemRows.map((v) => [v.itemId, v]))

  if (versionMap.size === 0 && draftVersionMap.size === 0) return []

  // Step 3: fetch node IDs for each matched item from the join table.
  const itemIds = matchedItems.map((r) => r.id)
  const nodeRows = await db
    .select()
    .from(itemNodes)
    .where(inArray(itemNodes.itemId, itemIds))

  // Group node IDs by item ID.
  const nodeMap = new Map<string, string[]>()
  for (const row of nodeRows) {
    const list = nodeMap.get(row.itemId) ?? []
    list.push(row.nodeId)
    nodeMap.set(row.itemId, list)
  }

  // Step 4: assemble McqItem objects from the three data sources.
  const result: McqItem[] = []
  for (const row of matchedItems) {
    // Prefer the current version; fall back to the draft version.
    const version = row.currentVersionId
      ? versionMap.get(row.currentVersionId)
      : draftVersionMap.get(row.id)
    if (!version) continue
    result.push(toMcqItem(row, version.payload, nodeMap.get(row.id) ?? []))
  }

  return result
}

// ─── Public API ──────────────────────────────────────────────────────────

// Find published MCQ items targeting any of the given skill graph nodes.
// Used by the sequencer to fetch items for the nodes it selects.
export async function findItemsByNodes(
  db: Db,
  nodeIds: string[],
  opts?: ItemBankOptions,
): Promise<McqItem[]> {
  return queryItems(db, {
    nodeIds,
    excludeIds: opts?.excludeIds,
    limit: opts?.limit,
  })
}

// Find published MCQ items at a specific CEFR level.
// Used by placement to pull items at each level for the adaptive algorithm.
export async function findItemsByLevel(
  db: Db,
  level: CefrLevel,
  opts?: ItemBankOptions,
): Promise<McqItem[]> {
  return queryItems(db, {
    level,
    excludeIds: opts?.excludeIds,
    limit: opts?.limit,
  })
}

// General-purpose item bank query with all filter dimensions.
// Used by the mock-test engine and future admin UI.
export async function findItemsByFilter(
  db: Db,
  filter: ItemBankFilter,
): Promise<McqItem[]> {
  return queryItems(db, filter)
}
