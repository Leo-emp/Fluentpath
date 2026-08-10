// # GET /api/discussions/[id]/replies — get a post's replies
// # POST /api/discussions/[id]/replies — add a reply

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { discussionPosts, discussionReplies, learners } from '@/db/schema'
import { eq, asc, sql } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    // # Fetch post.
    const posts = await db.select().from(discussionPosts).where(eq(discussionPosts.id, id)).limit(1)
    if (!posts[0]) return jsonError(404, 'Post not found')

    // # Fetch replies with author names.
    const replies = await db.select({
      id: discussionReplies.id,
      body: discussionReplies.body,
      createdAt: discussionReplies.createdAt,
      authorName: learners.name,
      authorId: discussionReplies.authorId,
    })
      .from(discussionReplies)
      .leftJoin(learners, eq(discussionReplies.authorId, learners.id))
      .where(eq(discussionReplies.postId, id))
      .orderBy(asc(discussionReplies.createdAt))

    return jsonOk({ post: posts[0], replies })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/discussions/[id]/replies]', err)
    return jsonError(500, 'Internal server error')
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>

    // # Verify post exists.
    const posts = await db.select({ id: discussionPosts.id })
      .from(discussionPosts)
      .where(eq(discussionPosts.id, id))
      .limit(1)
    if (!posts[0]) return jsonError(404, 'Post not found')

    const text = body.body
    if (typeof text !== 'string' || text.trim().length < 2) {
      return jsonError(400, 'Reply must be at least 2 characters')
    }
    if (typeof text === 'string' && text.length > 5_000) {
      return jsonError(400, 'Reply must be under 5,000 characters')
    }

    const now = Date.now()
    const replyId = `reply.${now}.${Math.random().toString(36).slice(2, 8)}`

    // # Insert reply and increment count atomically — prevents miscounts
    // # from concurrent replies.
    await db.transaction(async (tx) => {
      await tx.insert(discussionReplies).values({
        id: replyId,
        postId: id,
        authorId: learnerId,
        body: text.trim(),
        createdAt: now,
      })
      await tx.update(discussionPosts)
        .set({ replyCount: sql`${discussionPosts.replyCount} + 1`, updatedAt: now })
        .where(eq(discussionPosts.id, id))
    })

    return jsonOk({ id: replyId }, 201)
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/discussions/[id]/replies]', err)
    return jsonError(500, 'Internal server error')
  }
}
