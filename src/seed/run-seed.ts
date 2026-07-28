import type { Db } from '@/db/client'
import { upsertEdges, upsertNodes } from '@/skill-graph/repository'
import { validateGraph } from '@/skill-graph/validation'
import { SEED_NODES, SEED_EDGES } from './seed-data'

/**
 * Load the starter graph.
 *
 * Validation runs first and refuses to write an invalid graph. This is the
 * gate that matters most in the whole module: a cycle or a level inversion
 * written to the database would make the sequencer silently skip a region of
 * the graph forever, and nobody would notice until learners complained that
 * some topic never appeared.
 *
 * Idempotent — safe to run repeatedly against an existing database.
 */
export async function seedGraph(db: Db, now: number): Promise<void> {
  const validation = validateGraph(SEED_NODES, SEED_EDGES)

  if (!validation.valid) {
    const detail = validation.errors.map((e) => `  ${e.code}: ${e.message}`).join('\n')
    throw new Error(`Refusing to seed an invalid skill graph:\n${detail}`)
  }

  // Nodes before edges — edges carry foreign keys onto nodes.
  await upsertNodes(db, SEED_NODES, now)
  await upsertEdges(db, SEED_EDGES)
}
