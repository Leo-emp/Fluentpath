// # Tests for Paddle webhook signature verification and payload parsing.
// # No real API calls — verifies the crypto and parsing logic.

import { describe, it, expect } from 'vitest'
import { createHmac } from 'crypto'
import {
  verifyPaddleWebhook,
  parseWebhookPayload,
  getPlanFromPriceId,
  PLANS,
} from '@/lib/paddle'

// # Test secret for webhook verification.
const TEST_SECRET = 'pdl_test_secret_abc123'

// # Helper to create a valid Paddle signature.
function createSignature(rawBody: string, secret: string, ts?: string): string {
  const timestamp = ts ?? '1234567890'
  const signedPayload = `${timestamp}:${rawBody}`
  const hash = createHmac('sha256', secret).update(signedPayload).digest('hex')
  return `ts=${timestamp};h1=${hash}`
}

describe('verifyPaddleWebhook', () => {
  it('accepts a valid signature', () => {
    const body = '{"event_type":"subscription.created"}'
    const sig = createSignature(body, TEST_SECRET)
    expect(verifyPaddleWebhook(body, sig, TEST_SECRET)).toBe(true)
  })

  it('rejects an invalid signature', () => {
    const body = '{"event_type":"subscription.created"}'
    const sig = createSignature(body, 'wrong-secret')
    expect(verifyPaddleWebhook(body, sig, TEST_SECRET)).toBe(false)
  })

  it('rejects null signature', () => {
    expect(verifyPaddleWebhook('body', null, TEST_SECRET)).toBe(false)
  })

  it('rejects malformed signature format', () => {
    expect(verifyPaddleWebhook('body', 'invalid-format', TEST_SECRET)).toBe(false)
    expect(verifyPaddleWebhook('body', 'ts=123', TEST_SECRET)).toBe(false)
    expect(verifyPaddleWebhook('body', 'h1=abc', TEST_SECRET)).toBe(false)
  })

  it('rejects tampered body', () => {
    const body = '{"event_type":"subscription.created"}'
    const sig = createSignature(body, TEST_SECRET)
    // # Modify the body after signing.
    expect(verifyPaddleWebhook(body + 'x', sig, TEST_SECRET)).toBe(false)
  })
})

describe('parseWebhookPayload', () => {
  it('parses a subscription.created event', () => {
    const payload = {
      event_type: 'subscription.created',
      data: {
        id: 'sub_123',
        customer_id: 'ctm_456',
        status: 'active',
        items: [{ price: { id: 'pri_789' } }],
      },
    }

    const result = parseWebhookPayload(payload)
    expect(result).not.toBeNull()
    expect(result!.eventType).toBe('subscription.created')
    expect(result!.data.customerId).toBe('ctm_456')
    expect(result!.data.subscriptionId).toBe('sub_123')
    expect(result!.data.status).toBe('active')
    expect(result!.data.priceId).toBe('pri_789')
  })

  it('maps subscription.canceled to cancelled status', () => {
    const payload = {
      event_type: 'subscription.canceled',
      data: {
        id: 'sub_123',
        customer_id: 'ctm_456',
        items: [],
      },
    }

    const result = parseWebhookPayload(payload)
    expect(result!.data.status).toBe('cancelled')
  })

  it('maps subscription.past_due to past_due status', () => {
    const payload = {
      event_type: 'subscription.past_due',
      data: {
        id: 'sub_123',
        customer_id: 'ctm_456',
        items: [],
      },
    }

    const result = parseWebhookPayload(payload)
    expect(result!.data.status).toBe('past_due')
  })

  it('returns null for missing event_type', () => {
    expect(parseWebhookPayload({ data: { id: '1', customer_id: '2' } })).toBeNull()
  })

  it('returns null for missing data', () => {
    expect(parseWebhookPayload({ event_type: 'subscription.created' })).toBeNull()
  })

  it('returns null for missing customer_id', () => {
    const payload = {
      event_type: 'subscription.created',
      data: { id: 'sub_123' },
    }
    expect(parseWebhookPayload(payload)).toBeNull()
  })

  it('handles empty items array gracefully', () => {
    const payload = {
      event_type: 'subscription.updated',
      data: {
        id: 'sub_123',
        customer_id: 'ctm_456',
        items: [],
      },
    }

    const result = parseWebhookPayload(payload)
    expect(result!.data.priceId).toBeNull()
  })
})

describe('PLANS', () => {
  it('has 4 plans with correct tiers', () => {
    expect(PLANS.learner.tier).toBe('free')
    expect(PLANS.exam.tier).toBe('exam')
    expect(PLANS.complete.tier).toBe('complete')
    expect(PLANS.oet.tier).toBe('complete')
  })

  it('has prices in ascending order', () => {
    expect(PLANS.learner.priceMonthly).toBeLessThan(PLANS.exam.priceMonthly)
    expect(PLANS.exam.priceMonthly).toBeLessThan(PLANS.complete.priceMonthly)
    expect(PLANS.complete.priceMonthly).toBeLessThan(PLANS.oet.priceMonthly)
  })

  it('every plan has at least one feature listed', () => {
    for (const plan of Object.values(PLANS)) {
      expect(plan.features.length).toBeGreaterThan(0)
    }
  })
})
