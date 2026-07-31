import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock auth before importing route handlers.
vi.mock('@/app/api/_lib/auth', () => ({
  getAuthenticatedLearner: vi.fn(),
}))

import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { makeTestDb } from '../../helpers/test-db'
import { _setTestDb } from '@/app/api/_lib/db'
import { POST } from '@/app/api/practice/assemble/route'
import { upsertNodes } from '@/skill-graph/repository'
import { createItem, recordProvenance } from '@/content/repository'
import { publishItemVersion } from '@/content/publish'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { learners } from '@/db/schema'
import type { Db } from '@/db/client'

const NOW = 1_700_000_000_000
const inventory = buildProfilerInventory()

let db: Db

// Minimal A1 grammar node.
const NODES = [
  { id: 'gram.a1.be', type: 'grammar' as const, level: 'A1' as const, skill: 'general' as const, title: 'Verb to be', description: '', metadata: null },
]

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

// Helper to build a POST request with JSON body.
function postRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost/api/practice/assemble', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(async () => {
  db = await makeTestDb()
  _setTestDb(db)
  // Mock auth to return the test learner.
  vi.mocked(getAuthenticatedLearner).mockResolvedValue({
    learnerId: 'learner.1',
    email: 'test@test.com',
  })
  // Insert a learner for FK constraints.
  await db.insert(learners).values({ id: 'learner.1', email: 'test@test.com', createdAt: NOW, updatedAt: NOW })
  await upsertNodes(db, NODES, NOW)
  await recordProvenance(db, { id: 'prov.1', sourceName: 'original', licence: 'original' }, NOW)
})

afterEach(() => {
  _setTestDb(null)
  vi.restoreAllMocks()
})

describe('POST /api/practice/assemble', () => {
  it('returns a session plan with items', async () => {
    // Publish one item so the bank is not empty.
    const versionId = await createItem(db, {
      id: 'item.be.1', type: 'mcq', level: 'A1', skill: 'general',
      nodeIds: ['gram.a1.be'], payload: BE_PAYLOAD, provenanceId: 'prov.1',
    }, NOW)
    await publishItemVersion(db, versionId, inventory, NOW)

    const res = await POST(postRequest({}))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.items.length).toBeGreaterThan(0)
    expect(data.nodeIds).toContain('gram.a1.be')
    expect(data.estimatedMinutes).toBeGreaterThan(0)
  })

  it('returns empty plan when no items are published', async () => {
    const res = await POST(postRequest({}))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.items).toHaveLength(0)
  })

  it('returns 401 when not authenticated', async () => {
    const { AuthError } = await import('@/app/api/_lib/validate')
    vi.mocked(getAuthenticatedLearner).mockRejectedValue(new AuthError())

    const res = await POST(postRequest({}))
    expect(res.status).toBe(401)
  })
})
