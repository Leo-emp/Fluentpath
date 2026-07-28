import { and, eq } from 'drizzle-orm'
import type { Db } from '@/db/client'
import { skillEdges, skillNodes } from '@/db/schema'
import { sqlExcluded } from '@/db/sql-helpers'
import type { CefrLevel, NodeType, SkillArea, SkillEdge, SkillNode } from './types'

/**
 * Database access for the skill graph.
 *
 * Everything above this layer works with the domain types (SkillNode,
 * SkillEdge) and never sees a database row. That keeps the sequencer and
 * mastery logic pure and testable without a database.
 */

type NodeRow = typeof skillNodes.$inferSelect

/**
 * Convert a database row to a domain node.
 *
 * The casts are deliberate. SQLite has no enum type, so `type`, `level` and
 * `skill` come back as plain strings. They are constrained on the way in
 * (nothing writes a node that did not typecheck as a SkillNode), so this is
 * asserting a guarantee the write path already enforced.
 */
function toNode(row: NodeRow): SkillNode {
  return {
    id: row.id,
    type: row.type as NodeType,
    level: row.level as CefrLevel,
    skill: row.skill as SkillArea,
    title: row.title,
    description: row.description,
    metadata: row.metadata,
  }
}

/**
 * Insert or update nodes.
 *
 * Idempotent by design: re-running the seed, or republishing a content batch,
 * updates existing rows rather than failing on a duplicate key. `createdAt` is
 * only set on first insert; `updatedAt` moves every time.
 */
export async function upsertNodes(db: Db, nodes: SkillNode[], now: number): Promise<void> {
  // Drizzle rejects an insert with no values, so guard the empty case.
  if (nodes.length === 0) return

  await db
    .insert(skillNodes)
    .values(nodes.map((n) => ({ ...n, createdAt: now, updatedAt: now })))
    .onConflictDoUpdate({
      target: skillNodes.id,
      set: {
        type: sqlExcluded('type'),
        level: sqlExcluded('level'),
        skill: sqlExcluded('skill'),
        title: sqlExcluded('title'),
        description: sqlExcluded('description'),
        metadata: sqlExcluded('metadata'),
        updatedAt: now,
      },
    })
}

/** Insert or update prerequisite edges. Identity is the (from, to) pair. */
export async function upsertEdges(db: Db, edges: SkillEdge[]): Promise<void> {
  if (edges.length === 0) return

  await db
    .insert(skillEdges)
    .values(edges)
    .onConflictDoUpdate({
      target: [skillEdges.fromNodeId, skillEdges.toNodeId],
      set: { strength: sqlExcluded('strength') },
    })
}

export async function getNode(db: Db, id: string): Promise<SkillNode | null> {
  const rows = await db.select().from(skillNodes).where(eq(skillNodes.id, id)).limit(1)
  const row = rows[0]
  return row ? toNode(row) : null
}

/**
 * List nodes, optionally narrowed by level, type or skill.
 *
 * Conditions are built up rather than chained, because Drizzle's `.where()`
 * replaces rather than accumulates — calling it twice would silently drop the
 * first filter.
 */
export async function listNodes(
  db: Db,
  filter: { level?: CefrLevel; type?: NodeType; skill?: SkillArea } = {},
): Promise<SkillNode[]> {
  const conditions = []
  if (filter.level) conditions.push(eq(skillNodes.level, filter.level))
  if (filter.type) conditions.push(eq(skillNodes.type, filter.type))
  if (filter.skill) conditions.push(eq(skillNodes.skill, filter.skill))

  const rows =
    conditions.length > 0
      ? await db.select().from(skillNodes).where(and(...conditions))
      : await db.select().from(skillNodes)

  return rows.map(toNode)
}

export async function listEdges(db: Db): Promise<SkillEdge[]> {
  return db.select().from(skillEdges)
}

/** The edges pointing *into* a node — what it requires before it is available. */
export async function getPrerequisites(db: Db, nodeId: string): Promise<SkillEdge[]> {
  return db.select().from(skillEdges).where(eq(skillEdges.toNodeId, nodeId))
}
