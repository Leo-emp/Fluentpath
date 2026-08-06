// # Paddle webhook handler — processes subscription lifecycle events.
// # Updates learner tier and subscription status in the database.
// # No auth required — verified by HMAC signature instead.

import { type NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { getDb } from '@/app/api/_lib/db'
import { learners } from '@/db/schema/learners'
import {
  verifyPaddleWebhook,
  parseWebhookPayload,
  getPlanFromPriceId,
  PLANS,
} from '@/lib/paddle'

export async function POST(request: NextRequest) {
  // # Read the raw body for signature verification.
  const rawBody = await request.text()

  // # Verify webhook signature.
  const signature = request.headers.get('paddle-signature')
  const secret = process.env.PADDLE_WEBHOOK_SECRET

  if (!secret) {
    console.error('[Paddle Webhook] PADDLE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (!verifyPaddleWebhook(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // # Parse the webhook payload.
  let body: Record<string, unknown>
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = parseWebhookPayload(body)
  if (!parsed) {
    // # Unknown event type or malformed payload — acknowledge to prevent retries.
    return NextResponse.json({ received: true })
  }

  const { eventType, data } = parsed

  // # Only process subscription events we care about.
  const handledEvents = [
    'subscription.created',
    'subscription.updated',
    'subscription.canceled',
    'subscription.past_due',
  ]

  if (!handledEvents.includes(eventType)) {
    return NextResponse.json({ received: true })
  }

  const db = getDb()

  // # Determine the tier from the price ID.
  const planId = data.priceId ? getPlanFromPriceId(data.priceId) : null
  const tier = planId ? PLANS[planId].tier : undefined

  // # Find the learner by Paddle customer ID.
  const existing = await db
    .select()
    .from(learners)
    .where(eq(learners.paddleCustomerId, data.customerId))
    .limit(1)

  if (existing.length === 0) {
    // # No learner found — might be a new customer.
    // # On subscription.created, we can't link without email from Paddle.
    // # Log and acknowledge — the frontend will link on checkout completion.
    console.warn(`[Paddle Webhook] No learner found for customer ${data.customerId}`)
    return NextResponse.json({ received: true })
  }

  // # Build the update payload.
  const updates: Record<string, unknown> = {
    paddleSubscriptionId: data.subscriptionId,
    subscriptionStatus: data.status,
    updatedAt: Date.now(),
  }

  // # Only update tier if we can determine it from the price.
  if (tier) {
    updates.tier = tier
  }

  // # On cancellation, downgrade to free tier.
  if (eventType === 'subscription.canceled') {
    updates.tier = 'free'
  }

  await db
    .update(learners)
    .set(updates)
    .where(eq(learners.paddleCustomerId, data.customerId))

  return NextResponse.json({ received: true })
}
