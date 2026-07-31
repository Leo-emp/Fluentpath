// # Seed runner — loads the skill graph AND content items into the database.
// # Idempotent: safe to run repeatedly against an existing database.

import type { Db } from '@/db/client'
import { upsertNodes, upsertEdges } from '@/skill-graph/repository'
import { validateGraph } from '@/skill-graph/validation'
import { SEED_NODES, SEED_EDGES } from './seed-data'
import { SEED_ITEMS, SEED_PROVENANCE } from './seed-content'
import { provenance, items, itemVersions, itemNodes } from '@/db/schema'
import { eq } from 'drizzle-orm'

/**
 * Load the starter graph + content items.
 *
 * Graph validation runs first — a cycle or level inversion would make the
 * sequencer skip regions permanently.
 *
 * Content seeding is additive: existing items are skipped (checked by ID).
 */
export async function seedGraph(db: Db, now: number): Promise<void> {
  const validation = validateGraph(SEED_NODES, SEED_EDGES)

  if (!validation.valid) {
    const detail = validation.errors.map((e) => `  ${e.code}: ${e.message}`).join('\n')
    throw new Error(`Refusing to seed an invalid skill graph:\n${detail}`)
  }

  // # Nodes before edges — edges carry foreign keys onto nodes.
  await upsertNodes(db, SEED_NODES, now)
  await upsertEdges(db, SEED_EDGES)

  // # Seed the provenance record for original content.
  const existingProv = await db.select().from(provenance).where(eq(provenance.id, SEED_PROVENANCE.id)).limit(1)
  if (existingProv.length === 0) {
    await db.insert(provenance).values({
      ...SEED_PROVENANCE,
      createdAt: now,
    })
  }

  // # Seed content items — skip any that already exist.
  for (const seedItem of SEED_ITEMS) {
    const existing = await db.select({ id: items.id }).from(items).where(eq(items.id, seedItem.id)).limit(1)
    if (existing.length > 0) continue

    const versionId = `iv.${seedItem.id.replace('item.', '')}`

    // # Insert the item row.
    await db.insert(items).values({
      id: seedItem.id,
      type: 'mcq',
      level: seedItem.level,
      skill: seedItem.skill,
      status: 'published',
      lessonId: null,
      currentVersionId: versionId,
      createdAt: now,
      updatedAt: now,
    })

    // # Insert the version with the MCQ payload.
    await db.insert(itemVersions).values({
      id: versionId,
      itemId: seedItem.id,
      version: 1,
      payload: {
        stem: seedItem.stem,
        options: seedItem.options,
        correctIndex: seedItem.correctIndex,
        difficulty: seedItem.difficulty,
      },
      provenanceId: SEED_PROVENANCE.id,
      publishedAt: now,
      retiredAt: null,
      createdAt: now,
    })

    // # Link item to skill graph nodes.
    for (const nodeId of seedItem.nodeIds) {
      await db.insert(itemNodes).values({
        itemId: seedItem.id,
        nodeId,
      })
    }
  }
}
