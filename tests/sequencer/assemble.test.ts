import { describe, it, expect, beforeEach } from 'vitest'
import { makeTestDb } from '../helpers/test-db'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { upsertNodes, upsertEdges } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { saveMastery } from '@/mastery/repository'
import { assembleSession } from '@/sequencer/assemble'
import { learners } from '@/db/schema'
import type { ActionPlan } from '@/diagnosis/types'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

// Two nodes: A1 grammar (no prereqs) and A2 grammar (requires A1).
const NODES = [
  { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
  { id: 'gram.a2.past', type: 'grammar' as const, level: 'A2' as const, skill: 'general' as const, title: 'Past simple', description: '', metadata: null },
  { id: 'lex.a1.greetings', type: 'lexical' as const, level: 'A1' as const, skill: 'general' as const, title: 'Greetings', description: '', metadata: null },
]

const EDGES = [
  { fromNodeId: 'gram.a1.be', toNodeId: 'gram.a2.past', strength: 1.0 },
]

// MCQ payloads.
const BE_PAYLOAD = {
  stem: 'She ______ a teacher.',
  options: [
    { text: 'is', misconception: null },
    { text: 'are', misconception: 'uses plural form with singular subject' },
    { text: 'am', misconception: 'uses first person with third person subject' },
    { text: 'be', misconception: 'uses base form instead of conjugated form' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.a1.be'],
}

const PAST_PAYLOAD = {
  stem: 'They ______ football yesterday.',
  options: [
    { text: 'played', misconception: null },
    { text: 'play', misconception: 'uses present tense for a past event' },
    { text: 'playing', misconception: 'uses present participle without auxiliary' },
    { text: 'plays', misconception: 'uses third person present for past event' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.a2.past'],
}

const GREETINGS_PAYLOAD = {
  stem: 'You say "______" when you meet a friend.',
  options: [
    { text: 'Hello', misconception: null },
    { text: 'Goodbye', misconception: 'confuses greeting with farewell' },
    { text: 'Thank you', misconception: 'confuses greeting with gratitude' },
    { text: 'Sorry', misconception: 'confuses greeting with apology' },
  ],
  correctIndex: 0,
  nodeIds: ['lex.a1.greetings'],
}

beforeEach(async () => {
  db = await makeTestDb()
  // Insert a learner row so FKs on learner_mastery and practice_sessions are satisfied.
  await db.insert(learners).values({ id: 'learner.1', email: 'learner1@test.com', createdAt: NOW, updatedAt: NOW })
  await upsertNodes(db, NODES, NOW)
  await upsertEdges(db, EDGES, NOW)
  await recordProvenance(db, { id: 'prov.1', sourceName: 'original', licence: 'original' }, NOW)
})

// Helper: create, publish, and return an item.
async function publishItem(id: string, payload: Record<string, unknown>, level: string, nodeIds: string[]) {
  const versionId = await createItem(db, {
    id, type: 'mcq', level: level as 'A1', skill: 'general', nodeIds, payload, provenanceId: 'prov.1',
  }, NOW)
  await publishItemVersion(db, versionId, inventory, NOW)
}

describe('assembleSession', () => {
  it('returns items for a new learner (no mastery)', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])

    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    // New learner gets A1 items (A2 is blocked by prerequisite).
    expect(plan.items.length).toBeGreaterThan(0)
    expect(plan.items.every((si) => si.reason === 'new')).toBe(true)
    expect(plan.nodeIds).not.toContain('gram.a2.past')
    expect(plan.estimatedMinutes).toBeGreaterThan(0)
  })

  it('includes review items when mastery has decayed', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])

    // Set mastery to 0.65 (below REVIEW_THRESHOLD 0.75 but above MASTERY_THRESHOLD 0.6).
    await saveMastery(db, {
      learnerId: 'learner.1', nodeId: 'gram.a1.be',
      mastery: 0.65, confidence: 0.8, exposures: 10, correctStreak: 2, lastSeenAt: NOW,
    })

    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    expect(plan.items.length).toBeGreaterThan(0)
    const reviewItems = plan.items.filter((si) => si.reason === 'review')
    expect(reviewItems.length).toBeGreaterThan(0)
  })

  it('respects prerequisite gating', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.past.1', PAST_PAYLOAD, 'A2', ['gram.a2.past'])

    // gram.a2.past requires gram.a1.be at mastery >= 0.6.
    // New learner has 0 mastery on gram.a1.be, so A2 should be blocked.
    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    const a2Items = plan.items.filter((si) => si.nodeId === 'gram.a2.past')
    expect(a2Items).toHaveLength(0)
  })

  it('unlocks A2 when prerequisite is mastered', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.past.1', PAST_PAYLOAD, 'A2', ['gram.a2.past'])

    // Master the prerequisite.
    await saveMastery(db, {
      learnerId: 'learner.1', nodeId: 'gram.a1.be',
      mastery: 0.85, confidence: 0.8, exposures: 10, correctStreak: 5, lastSeenAt: NOW,
    })

    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    const a2Items = plan.items.filter((si) => si.nodeId === 'gram.a2.past')
    expect(a2Items.length).toBeGreaterThan(0)
  })

  it('returns empty plan when item bank is empty', async () => {
    // Nodes exist but no items published.
    const plan = await assembleSession(db, 'learner.1', { now: NOW })

    expect(plan.items).toHaveLength(0)
    expect(plan.nodeIds).toHaveLength(0)
    expect(plan.estimatedMinutes).toBe(0)
  })

  it('excludes items by ID', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.be.2', { ...BE_PAYLOAD, stem: 'He ______ tall.' }, 'A1', ['gram.a1.be'])

    const plan = await assembleSession(db, 'learner.1', {
      now: NOW,
      excludeItemIds: ['item.be.1'],
    })

    const itemIds = plan.items.map((si) => si.item.id)
    expect(itemIds).not.toContain('item.be.1')
  })

  it('boosts remediation nodes when actionPlan is provided', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])

    const actionPlan: ActionPlan = {
      steps: [{ order: 1, nodeId: 'lex.a1.greetings', nodeTitle: 'Greetings', rootCause: 'knowledge', activity: 'drill', estimatedMinutes: 10, prerequisiteNodeIds: [] }],
      totalEstimatedMinutes: 10,
      gapCount: 1,
    }

    const plan = await assembleSession(db, 'learner.1', { now: NOW, actionPlan })

    const remediationItems = plan.items.filter((si) => si.reason === 'remediation')
    expect(remediationItems.length).toBeGreaterThan(0)
    expect(remediationItems[0]!.nodeId).toBe('lex.a1.greetings')
  })

  it('respects maxItems', async () => {
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.be.2', { ...BE_PAYLOAD, stem: 'He ______ tall.' }, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])

    const plan = await assembleSession(db, 'learner.1', { now: NOW, maxItems: 2 })

    expect(plan.items.length).toBeLessThanOrEqual(2)
  })

  it('interleaves items from different nodes', async () => {
    // Publish 2 items per node.
    await publishItem('item.be.1', BE_PAYLOAD, 'A1', ['gram.a1.be'])
    await publishItem('item.be.2', { ...BE_PAYLOAD, stem: 'He ______ tall.' }, 'A1', ['gram.a1.be'])
    await publishItem('item.greet.1', GREETINGS_PAYLOAD, 'A1', ['lex.a1.greetings'])
    await publishItem('item.greet.2', { ...GREETINGS_PAYLOAD, stem: 'You say "______" to a new friend.' }, 'A1', ['lex.a1.greetings'])

    const plan = await assembleSession(db, 'learner.1', { now: NOW, maxItems: 4 })

    // No three consecutive items from the same node.
    for (let i = 2; i < plan.items.length; i++) {
      const threeInARow =
        plan.items[i]!.nodeId === plan.items[i - 1]!.nodeId &&
        plan.items[i]!.nodeId === plan.items[i - 2]!.nodeId
      expect(threeInARow).toBe(false)
    }
  })
})
