import type { Db } from '@/db/client'
import type { GenerateItemResult } from '@/generation/generate'
import type { ItemReview } from '@/items/types'
import type { ProfilerInventory } from '@/profiler/profile'
import type { SkillArea } from '@/skill-graph/types'
import { createItem, recordProvenance } from './repository'
import type { ProvenanceInput } from './repository'
import { PublishRejectedError, publishItemVersion } from './publish'

// ─── Types ───────────────────────────────────────────────────────────────

export interface IngestOptions {
  // Provenance record for this batch of generated items.
  provenance: ProvenanceInput
  // Quality gate inventory (passed through to publish).
  inventory: ProfilerInventory
  // Skill area for the item. Defaults to 'general'.
  skill?: SkillArea
}

export type IngestResult =
  | { status: 'published'; itemId: string; versionId: string }
  | { status: 'rejected'; itemId: string; versionId: string; review: ItemReview }
  | { status: 'failed' }

// ─── Bridge ──────────────────────────────────────────────────────────────

// Take a generation result and store it in the database. If generation
// succeeded, the item is created as a draft and then published through the
// same quality-gated publish boundary that all content passes through.
//
// Provenance is recorded idempotently — multiple items from the same model
// share one provenance row via onConflictDoNothing.
export async function ingestGeneratedItem(
  db: Db,
  result: GenerateItemResult,
  options: IngestOptions,
  now: number,
): Promise<IngestResult> {
  // Nothing to store when generation failed entirely.
  if (!result.item) return { status: 'failed' }

  const item = result.item
  const skill = options.skill ?? 'general'

  // Record provenance once per model. The onConflictDoNothing in
  // recordProvenance makes this idempotent.
  await recordProvenance(db, options.provenance, now)

  // Create the item as a draft with its first version.
  const versionId = await createItem(
    db,
    {
      id: item.id,
      type: 'mcq',
      level: item.level,
      skill,
      nodeIds: item.nodeIds,
      payload: {
        stem: item.stem,
        options: item.options,
        correctIndex: item.correctIndex,
        nodeIds: item.nodeIds,
      },
      provenanceId: options.provenance.id,
    },
    now,
  )

  // Publish through the quality-gated boundary. The deterministic gates
  // run again here as a safety net — they should pass since the generation
  // pipeline already gated the item.
  try {
    await publishItemVersion(db, versionId, options.inventory, now)
    return { status: 'published', itemId: item.id, versionId }
  } catch (err) {
    if (err instanceof PublishRejectedError) {
      return { status: 'rejected', itemId: item.id, versionId, review: err.review }
    }
    throw err
  }
}
