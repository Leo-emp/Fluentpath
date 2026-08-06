// # GET /api/discussions — list discussion posts
// # POST /api/discussions — create a new post

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
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
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>

    const title = body.title
    const text = body.body
    const category = typeof body.category === 'string' ? body.category : 'general'

    if (typeof title !== 'string' || title.trim().length < 3) {
      return jsonError(400, 'Title must be at least 3 characters')
    }
    if (typeof text !== 'string' || text.trim().length < 10) {
      return jsonError(400, 'Body must be at least 10 characters')
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
