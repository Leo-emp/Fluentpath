// # POST /api/subscribe
// # Email capture for the landing page newsletter/tips form.
// # Stores subscriber email in the database for follow-up campaigns.
// # No auth required — this is a public endpoint.

import { type NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonError } from '@/app/api/_lib/response'
import { subscribers } from '@/db/schema/subscribers'

export async function POST(request: NextRequest) {
  try {
    // # Accept both JSON and form-encoded bodies.
    const contentType = request.headers.get('content-type') ?? ''
    let email: string | undefined

    if (contentType.includes('application/json')) {
      const body = (await request.json()) as Record<string, unknown>
      email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : undefined
    } else {
      const form = await request.formData()
      const raw = form.get('email')
      email = typeof raw === 'string' ? raw.trim().toLowerCase() : undefined
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonError(400, 'A valid email address is required')
    }

    if (email.length > 254) {
      return jsonError(400, 'Email address is too long')
    }

    const db = getDb()

    // # Insert or ignore if already subscribed.
    await db.insert(subscribers).values({
      email,
      subscribedAt: Date.now(),
    }).onConflictDoNothing()

    // # Redirect back to homepage with success anchor for form submissions.
    if (contentType.includes('application/json')) {
      return NextResponse.json({ ok: true, message: 'Subscribed' })
    }

    // # Form POST — redirect back to homepage.
    return NextResponse.redirect(new URL('/?subscribed=1', request.url), 303)
  } catch (err) {
    console.error('[POST /api/subscribe]', err)
    return jsonError(500, 'Subscription failed')
  }
}
