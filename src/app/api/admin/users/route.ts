// # GET /api/admin/users
// # Returns paginated user list with stats for admin dashboard.
// # Query params: ?page=1&limit=50&tier=free&search=email

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { learners, learnerStreaks } from '@/db/schema'
import { eq, desc, like } from 'drizzle-orm'

// # Admin email allowlist.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').filter(Boolean)

export async function GET(request: NextRequest) {
  try {
    const { email } = await getAuthenticatedLearner(request)
    if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
      return jsonError(403, 'Admin access required')
    }

    const db = getDb()
    const url = new URL(request.url)
    const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'))
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') ?? '50')))
    const tierFilter = url.searchParams.get('tier')
    const search = url.searchParams.get('search')

    // # Fetch all learners (SQLite — fine for <100K users).
    let allUsers = await db.select({
      id: learners.id,
      name: learners.name,
      email: learners.email,
      tier: learners.tier,
      currentLevel: learners.currentLevel,
      subscriptionStatus: learners.subscriptionStatus,
      createdAt: learners.createdAt,
    })
      .from(learners)
      .orderBy(desc(learners.createdAt))

    // # Apply filters.
    if (tierFilter) {
      allUsers = allUsers.filter(u => u.tier === tierFilter)
    }
    if (search) {
      const q = search.toLowerCase()
      allUsers = allUsers.filter(u =>
        u.email.toLowerCase().includes(q) ||
        (u.name ?? '').toLowerCase().includes(q),
      )
    }

    const total = allUsers.length
    const offset = (page - 1) * limit
    const pageUsers = allUsers.slice(offset, offset + limit)

    // # Get XP stats for this page of users.
    const userIds = pageUsers.map(u => u.id)
    const streakRows = userIds.length > 0
      ? await db.select({
          learnerId: learnerStreaks.learnerId,
          totalXp: learnerStreaks.totalXp,
          currentStreak: learnerStreaks.currentStreak,
          lastActiveDate: learnerStreaks.lastActiveDate,
        }).from(learnerStreaks)
      : []
    const streakMap = new Map(
      streakRows.filter(s => userIds.includes(s.learnerId))
        .map(s => [s.learnerId, s]),
    )

    return jsonOk({
      users: pageUsers.map(u => {
        const s = streakMap.get(u.id)
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          tier: u.tier,
          level: u.currentLevel,
          subscriptionStatus: u.subscriptionStatus,
          totalXp: s?.totalXp ?? 0,
          currentStreak: s?.currentStreak ?? 0,
          lastActive: s?.lastActiveDate ?? null,
          joinedAt: u.createdAt,
        }
      }),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[GET /api/admin/users]', err)
    return jsonError(500, 'Internal server error')
  }
}
