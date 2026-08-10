// # Seed runner — loads the skill graph AND content items into the database.
// # Idempotent: safe to run repeatedly against an existing database.
// # Supports ALL item types (mcq, gap_fill, reading_passage, writing_task,
// # speaking_prompt, reorder, highlight_incorrect).

import type { Db } from '@/db/client'
import { upsertNodes, upsertEdges } from '@/skill-graph/repository'
import { validateGraph } from '@/skill-graph/validation'
import { SEED_NODES, SEED_EDGES } from './seed-data'
import { SEED_ITEMS, SEED_PROVENANCE } from './seed-content'
import { SEED_DIVERSE_ITEMS } from './seed-diverse'
import { SEED_A1_EXPANDED } from './seed-a1-expanded'
import { SEED_A2_EXPANDED } from './seed-a2-expanded'
import { SEED_B1_EXPANDED } from './seed-b1-expanded'
import { SEED_B2_EXPANDED } from './seed-b2-expanded'
import { SEED_C1_EXPANDED } from './seed-c1-expanded'
import { SEED_C2_EXPANDED } from './seed-c2-expanded'
import { SEED_IELTS_PREP } from './seed-ielts-prep'
import { SEED_IELTS_READING_EXPANDED } from './seed-ielts-reading-expanded'
import { SEED_IELTS_LISTENING_EXPANDED } from './seed-ielts-listening-expanded'
import { SEED_IELTS_WRITING_EXPANDED } from './seed-ielts-writing-expanded'
import { SEED_IELTS_SPEAKING_EXPANDED } from './seed-ielts-speaking-expanded'
import { SEED_IELTS_BAND9 } from './seed-ielts-band9'
import { SEED_PTE_PREP } from './seed-pte-prep'
import { SEED_PTE_EXPANDED } from './seed-pte-expanded'
import { SEED_OET_PREP } from './seed-oet-prep'
import { SEED_OET_EXPANDED } from './seed-oet-expanded'
import { SEED_A1_READING_LISTENING } from './seed-a1-reading-listening'
import { SEED_A2_READING_LISTENING } from './seed-a2-reading-listening'
import { SEED_C2_GAPS } from './seed-c2-gaps'
import { SEED_B1_READING_BOOST } from './seed-b1-reading-boost'
import { SEED_OET_LISTENING } from './seed-oet-listening'
import { SEED_PTE_LISTENING_BOOST } from './seed-pte-listening-boost'
import { SEED_PTE_READING_PASSAGES } from './seed-pte-reading-passages'
import { SEED_OET_READING_BOOST } from './seed-oet-reading-boost'
import { SEED_PHRASAL_VERBS } from './seed-phrasal-verbs'
import { SEED_GRAMMAR_BOOST } from './seed-grammar-boost'
import { SEED_VOCABULARY_BOOST } from './seed-vocabulary-boost'
import { SEED_PRACTICE_BOOST } from './seed-practice-boost'
import { provenance, items, itemVersions, itemNodes } from '@/db/schema'
import { eq } from 'drizzle-orm'

// # Unified seed item shape — type + payload, works for ALL item types.
export interface UnifiedSeedItem {
  id: string
  type: string           // # 'mcq', 'gap_fill', 'reading_passage', etc.
  level: string          // # 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  skill: string          // # 'general', 'reading', 'writing', 'speaking', 'listening'
  nodeIds: string[]      // # references into skill_nodes
  payload: Record<string, unknown> // # type-specific content
}

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

  // # Seed legacy MCQ items (backward compatible — converts to unified format).
  for (const seedItem of SEED_ITEMS) {
    await seedOneItem(db, {
      id: seedItem.id,
      type: 'mcq',
      level: seedItem.level,
      skill: seedItem.skill,
      nodeIds: seedItem.nodeIds,
      payload: {
        stem: seedItem.stem,
        options: seedItem.options,
        correctIndex: seedItem.correctIndex,
        difficulty: seedItem.difficulty,
      },
    }, now)
  }

  // # Seed diverse items (gap-fill, reading, writing, speaking, reorder, etc.).
  for (const item of SEED_DIVERSE_ITEMS) {
    await seedOneItem(db, item, now)
  }

  // # Seed expanded per-level content (all 12 types, A1–C2).
  const expandedSets = [
    SEED_A1_EXPANDED, SEED_A2_EXPANDED,
    SEED_B1_EXPANDED, SEED_B2_EXPANDED,
    SEED_C1_EXPANDED, SEED_C2_EXPANDED,
  ]
  for (const set of expandedSets) {
    for (const item of set) {
      await seedOneItem(db, item, now)
    }
  }

  // # Seed exam preparation content (IELTS, PTE, OET — authentic exam formats).
  const examPrepSets = [
    SEED_IELTS_PREP,
    SEED_IELTS_READING_EXPANDED,
    SEED_IELTS_LISTENING_EXPANDED,
    SEED_IELTS_WRITING_EXPANDED,
    SEED_IELTS_SPEAKING_EXPANDED,
    SEED_IELTS_BAND9,
    SEED_PTE_PREP,
    SEED_PTE_EXPANDED,
    SEED_OET_PREP,
    SEED_OET_EXPANDED,
  ]
  for (const set of examPrepSets) {
    for (const item of set) {
      await seedOneItem(db, item, now)
    }
  }

  // # Seed gap-filling content — reading, listening, and missing item types
  // # for levels that were under-represented (A1, A2, B1, C2).
  const gapFillers = [
    SEED_A1_READING_LISTENING,
    SEED_A2_READING_LISTENING,
    SEED_B1_READING_BOOST,
    SEED_C2_GAPS,
    SEED_OET_LISTENING,
    SEED_PTE_LISTENING_BOOST,
    SEED_PTE_READING_PASSAGES,
    SEED_OET_READING_BOOST,
  ]
  for (const set of gapFillers) {
    for (const item of set) {
      await seedOneItem(db, item, now)
    }
  }

  // # Seed phrasal verbs, grammar boost, and vocabulary exercises
  // # across all CEFR levels (A1–C2).
  const languageBoost = [
    SEED_PHRASAL_VERBS,
    SEED_GRAMMAR_BOOST,
    SEED_VOCABULARY_BOOST,
    SEED_PRACTICE_BOOST,
  ]
  for (const set of languageBoost) {
    for (const item of set) {
      await seedOneItem(db, item, now)
    }
  }
}

// # Insert a single item + version + node links. Skips if already exists.
async function seedOneItem(db: Db, item: UnifiedSeedItem, now: number): Promise<void> {
  const existing = await db.select({ id: items.id }).from(items).where(eq(items.id, item.id)).limit(1)
  if (existing.length > 0) return

  const versionId = `iv.${item.id.replace('item.', '')}`

  // # Insert the item row.
  await db.insert(items).values({
    id: item.id,
    type: item.type,
    level: item.level,
    skill: item.skill,
    status: 'published',
    lessonId: null,
    currentVersionId: versionId,
    createdAt: now,
    updatedAt: now,
  })

  // # Insert the version with the type-specific payload.
  await db.insert(itemVersions).values({
    id: versionId,
    itemId: item.id,
    version: 1,
    payload: item.payload,
    provenanceId: SEED_PROVENANCE.id,
    publishedAt: now,
    retiredAt: null,
    createdAt: now,
  })

  // # Link item to skill graph nodes.
  for (const nodeId of item.nodeIds) {
    await db.insert(itemNodes).values({
      itemId: item.id,
      nodeId,
    })
  }
}
