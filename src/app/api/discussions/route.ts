// # GET /api/discussions — list discussion posts
// # POST /api/discussions — create a new post

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { checkRateLimit, RATE_LIMITS } from '@/app/api/_lib/rate-limit'
import { discussionPosts, learners } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    await getAuthenticatedLearner(request)
    const db = getDb()

    // # Fetch recent posts with author names.
    const posts = await db.select({
      id: discussionPosts.id,
      title: discussionPosts.title,
      body: discussionPosts.body,
      category: discussionPosts.category,
      replyCount: discussionPosts.replyCount,
      createdAt: discussionPosts.createdAt,
      authorName: learners.name,
      authorId: discussionPosts.authorId,
    })
      .from(discussionPosts)
      .leftJoin(learners, eq(discussionPosts.authorId, learners.id))
      .orderBy(desc(discussionPosts.createdAt))
      .limit(50)

    return jsonOk({ posts })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/discussions]', err)
    return jsonError(500, 'Internal server error')
  }
}

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)

    // # Rate limit — 10 posts per 5 minutes per user (spam prevention).
    const limited = checkRateLimit(learnerId, RATE_LIMITS.discussion)
    if (limited) return limited

    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>

    const title = body.title
    const text = body.body
    const rawCategory = typeof body.category === 'string' ? body.category : 'general'

    // # Allowed discussion categories.
    const VALID_CATEGORIES = ['general', 'grammar', 'vocabulary', 'ielts', 'pte', 'oet'] as const
    const category = VALID_CATEGORIES.includes(rawCategory as typeof VALID_CATEGORIES[number])
      ? rawCategory
      : 'general'

    if (typeof title !== 'string' || title.trim().length < 3) {
      return jsonError(400, 'Title must be at least 3 characters')
    }
    if (typeof title === 'string' && title.length > 200) {
      return jsonError(400, 'Title must be under 200 characters')
    }
    if (typeof text !== 'string' || text.trim().length < 10) {
      return jsonError(400, 'Body must be at least 10 characters')
    }
    if (typeof text === 'string' && text.length > 5_000) {
      return jsonError(400, 'Body must be under 5,000 characters')
    }

    const now = Date.now()
    const id = `post.${now}.${Math.random().toString(36).slice(2, 8)}`

    await db.insert(discussionPosts).values({
      id,
      authorId: learnerId,
      title: title.trim(),
      body: text.trim(),
      category,
      replyCount: 0,
      createdAt: now,
      updatedAt: now,
    })

    return jsonOk({ id }, 201)
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/discussions]', err)
    return jsonError(500, 'Internal server error')
  }
}
