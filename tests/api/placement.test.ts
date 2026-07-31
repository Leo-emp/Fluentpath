import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock auth before importing route handlers.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { Db } from '@/db/client'

// Import route handlers.
import { POST as startPOST } from '@/app/api/placement/start/route'
import { POST as answerPOST } from '@/app/api/placement/answer/route'
import { GET as activeGET } from '@/app/api/placement/active/route'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()
let db: Db

// An A1 node for placement items — use A1 because the MCQ payloads
// only pass the quality gate at A1 vocabulary level.
const NODES = [
  { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
]

// Use the same payload pattern that passes the content profiler quality gates.
const MCQ_PAYLOAD = {
  stem: 'She ______ a teacher.',
  options: [
    { text: 'is', misconception: null },
    { text: 'are', misconception: 'uses plural form with singular subject' },
    { text: 'am', misconception: 'uses first person with third person subject' },
    { text: 'be', misconception: 'uses base form instead of conjugated form' },
  ],
  correctIndex: 0,
}

function makeRequest(url: string, method = 'GET', body?: Record<string, unknown>): Request {
  const init: RequestInit = { method, headers: { 'content-type': 'application/json' } }
  if (body) init.body = JSON.stringify(body)
  return new Request(url, init)
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'learner.1',
    email: 'test@test.com',
  })

  await db.insert(learners).values({
    id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW,
  })
  await upsertNodes(db, NODES, NOW)
  await recordProvenance(db, { id: 'prov.1', sourceName: 'original', licence: 'original' }, NOW)

  // Publish 3 items at A1. Each stem must be unique and use A1-level
  // vocabulary to pass the content profiler quality gates.
  const stems = ['She ______ a teacher.', 'He ______ tall.', 'We ______ happy.']
  for (let i = 0; i < 3; i++) {
    const versionId = await createItem(db, {
      id: `item.a1.${i}`, type: 'mcq', level: 'A1', skill: 'general',
      nodeIds: ['gram.a1.be'], payload: { ...MCQ_PAYLOAD, stem: stems[i]! },
      provenanceId: 'prov.1',
    }, NOW)
    await publishItemVersion(db, versionId, inventory, NOW)
  }
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

describe('POST /api/placement/start', () => {
  it('creates a placement and returns the first item', async () => {
    const response = await startPOST(makeRequest(
      'http://localhost:3000/api/placement/start', 'POST', { startLevel: 'A1' },
    ) as any)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.placementId).toBeDefined()
    expect(data.item).toBeDefined()
    expect(data.item.stem).toBeDefined()
    expect(data.level).toBe('A1')
    expect(data.progress.answered).toBe(0)
  })

  it('returns 409 when active placement already exists', async () => {
    await startPOST(makeRequest(
      'http://localhost:3000/api/placement/start', 'POST', { startLevel: 'A1' },
    ) as any)
    const response = await startPOST(makeRequest(
      'http://localhost:3000/api/placement/start', 'POST', { startLevel: 'A1' },
    ) as any)
    expect(response.status).toBe(409)
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())
    const response = await startPOST(makeRequest(
      'http://localhost:3000/api/placement/start', 'POST', { startLevel: 'A1' },
    ) as any)
    expect(response.status).toBe(401)
  })
})

describe('GET /api/placement/active', () => {
  it('returns null when no active placement', async () => {
    const response = await activeGET(makeRequest(
      'http://localhost:3000/api/placement/active',
    ) as any)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.placement).toBeNull()
  })

  it('returns active placement after starting one', async () => {
    await startPOST(makeRequest(
      'http://localhost:3000/api/placement/start', 'POST', { startLevel: 'A1' },
    ) as any)
    const response = await activeGET(makeRequest(
      'http://localhost:3000/api/placement/active',
    ) as any)
    const data = await response.json()
    expect(data.placement).not.toBeNull()
    expect(data.placement.status).toBe('in_progress')
  })
})

describe('POST /api/placement/answer', () => {
  it('records an answer and returns progress', async () => {
    // Start placement to get the first item.
    const startRes = await startPOST(makeRequest(
      'http://localhost:3000/api/placement/start', 'POST', { startLevel: 'A1' },
    ) as any)
    const { placementId, item } = await startRes.json()

    const answerRes = await answerPOST(makeRequest(
      'http://localhost:3000/api/placement/answer', 'POST', {
        placementId,
        itemId: item.id,
        selectedIndex: item.correctIndex,
      },
    ) as any)
    expect(answerRes.status).toBe(200)
    const data = await answerRes.json()
    // Either returns next item or finishes.
    expect(data.finished === true || data.item !== undefined).toBe(true)
    expect(data.progress.answered).toBe(1)
    expect(data.correct).toBe(true)
  })

  it('returns 404 for wrong placement ID', async () => {
    await startPOST(makeRequest(
      'http://localhost:3000/api/placement/start', 'POST', { startLevel: 'A1' },
    ) as any)

    const answerRes = await answerPOST(makeRequest(
      'http://localhost:3000/api/placement/answer', 'POST', {
        placementId: 'wrong-id',
        itemId: 'item.b1.0',
        selectedIndex: 0,
      },
    ) as any)
    expect(answerRes.status).toBe(404)
  })
})
