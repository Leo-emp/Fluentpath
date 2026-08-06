// # Paddle payment integration — plan definitions, webhook signature verification, helpers.
// # Paddle is the merchant of record (spec §4e) — handles GST/VAT from first sale.

import { createHmac, timingSafeEqual } from 'crypto'

// # Plan definitions matching the spec pricing tiers.
export const PLANS = {
  learner: {
    id: 'learner',
    name: 'Learner',
    priceMonthly: 19,
    tier: 'free' as const, // # Maps to DB tier — free tier with extended limits.
    features: ['Placement test', 'Adaptive practice (10 items/day)', '1 mock test'],
  },
  exam: {
    id: 'exam',
    name: 'Exam Prep',
    priceMonthly: 49,
    tier: 'exam' as const,
    features: ['Unlimited practice', 'All mock tests', 'Score diagnosis', 'IELTS + PTE'],
  },
  complete: {
    id: 'complete',
    name: 'Complete',
    priceMonthly: 55,
    tier: 'complete' as const,
    features: ['Everything in Exam Prep', 'OET mock tests', 'TTS pronunciation', 'Priority support'],
  },
  oet: {
    id: 'oet',
    name: 'OET Specialist',
    priceMonthly: 79,
    tier: 'complete' as const,
    features: ['Full OET prep', 'All 4 sub-tests', 'Healthcare vocabulary', 'Referral letter practice'],
  },
} as const

export type PlanId = keyof typeof PLANS

// # Map Paddle price IDs (set in Paddle dashboard) to our plan IDs.
// # These are populated from PADDLE_PRICE_MAP env var (JSON).
export function getPlanFromPriceId(priceId: string): PlanId | null {
  const map = getPriceMap()
  return (map[priceId] as PlanId) ?? null
}

function getPriceMap(): Record<string, string> {
  const raw = process.env.PADDLE_PRICE_MAP
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

// # Verify Paddle webhook signature (HMAC-SHA256).
// # See: https://developer.paddle.com/webhooks/signature-verification
export function verifyPaddleWebhook(
  rawBody: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false

  // # Paddle sends signature as: ts=TIMESTAMP;h1=HASH
  const parts = signature.split(';')
  const tsPart = parts.find((p) => p.startsWith('ts='))
  const h1Part = parts.find((p) => p.startsWith('h1='))

  if (!tsPart || !h1Part) return false

  const ts = tsPart.slice(3)
  const h1 = h1Part.slice(3)

  // # Compute expected signature: HMAC-SHA256(ts:rawBody).
  const signedPayload = `${ts}:${rawBody}`
  const expected = createHmac('sha256', secret).update(signedPayload).digest('hex')

  // # Timing-safe comparison to prevent timing attacks.
  try {
    return timingSafeEqual(Buffer.from(h1, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}

// # Paddle webhook event types we handle.
export type PaddleEventType =
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.canceled'
  | 'subscription.past_due'

// # Extract subscription data from a Paddle webhook payload.
export interface PaddleSubscriptionData {
  customerId: string
  subscriptionId: string
  status: 'active' | 'past_due' | 'cancelled'
  priceId: string | null
}

// # Parse webhook payload into our internal format.
export function parseWebhookPayload(
  body: Record<string, unknown>,
): { eventType: string; data: PaddleSubscriptionData } | null {
  const eventType = body.event_type as string
  const data = body.data as Record<string, unknown> | undefined

  if (!eventType || !data) return null

  const customerId = data.customer_id as string
  const subscriptionId = data.id as string

  if (!customerId || !subscriptionId) return null

  // # Map Paddle status to our internal status.
  let status: PaddleSubscriptionData['status'] = 'active'
  if (eventType === 'subscription.canceled') {
    status = 'cancelled'
  } else if (eventType === 'subscription.past_due') {
    status = 'past_due'
  }

  // # Extract price ID from items array.
  const items = data.items as Array<Record<string, unknown>> | undefined
  const priceId = items?.[0]?.price?.id as string | null ?? null

  return {
    eventType,
    data: { customerId, subscriptionId, status, priceId },
  }
}
