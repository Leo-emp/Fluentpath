// # In-memory sliding-window rate limiter.
// # Protects AI endpoints (Gemini, ElevenLabs) from abuse.
// # Each user gets a per-endpoint budget per time window.
// # State resets on function cold starts — acceptable for abuse prevention
// # (not billing-grade). Upgrade to Upstash @upstash/ratelimit for Redis-backed
// # persistence if needed.

import { jsonError } from './response'
import type { NextResponse } from 'next/server'

interface WindowEntry {
  // # Timestamps of requests within the current window.
  timestamps: number[]
}

// # Per-endpoint rate limit stores, keyed by learnerId.
const stores = new Map<string, Map<string, WindowEntry>>()

interface RateLimitConfig {
  // # Unique name for this endpoint's limiter (e.g. 'writing-feedback').
  name: string
  // # Maximum requests allowed in the window.
  maxRequests: number
  // # Window duration in milliseconds.
  windowMs: number
}

// # Pre-configured limits for different endpoint tiers.
export const RATE_LIMITS = {
  // # AI writing/speaking feedback — expensive Gemini calls.
  aiFeedback: { name: 'ai-feedback', maxRequests: 20, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
  // # TTS generation — ElevenLabs API calls.
  tts: { name: 'tts', maxRequests: 50, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
  // # Discussion posting — spam prevention.
  discussion: { name: 'discussion', maxRequests: 10, windowMs: 5 * 60 * 1000 } as RateLimitConfig,
  // # Data export — prevent hammering.
  dataExport: { name: 'data-export', maxRequests: 3, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
} as const

// # Check rate limit for a given user + endpoint. Returns null if allowed,
// # or a 429 NextResponse if the limit is exceeded.
export function checkRateLimit(
  learnerId: string,
  config: RateLimitConfig,
): NextResponse | null {
  const now = Date.now()
  const windowStart = now - config.windowMs

  // # Get or create the store for this endpoint.
  if (!stores.has(config.name)) {
    stores.set(config.name, new Map())
  }
  const store = stores.get(config.name)!

  // # Get or create the entry for this user.
  let entry = store.get(learnerId)
  if (!entry) {
    entry = { timestamps: [] }
    store.set(learnerId, entry)
  }

  // # Prune expired timestamps.
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart)

  if (entry.timestamps.length >= config.maxRequests) {
    // # Find when the oldest request in the window expires.
    const retryAfterMs = entry.timestamps[0]! + config.windowMs - now
    const retryAfterSec = Math.ceil(retryAfterMs / 1000)

    return jsonError(429, `Rate limit exceeded. Try again in ${retryAfterSec} seconds.`)
  }

  // # Allow the request and record the timestamp.
  entry.timestamps.push(now)
  return null
}

// # Periodic cleanup — remove entries older than 2 hours to prevent memory leaks.
// # Runs every 10 minutes.
if (typeof globalThis !== 'undefined') {
  const g = globalThis as Record<string, unknown>
  if (!g.__fluentpath_ratelimit_cleanup) {
    g.__fluentpath_ratelimit_cleanup = setInterval(() => {
      const cutoff = Date.now() - 2 * 60 * 60 * 1000
      for (const [, store] of stores) {
        for (const [key, entry] of store) {
          entry.timestamps = entry.timestamps.filter((t) => t > cutoff)
          if (entry.timestamps.length === 0) store.delete(key)
        }
      }
    }, 10 * 60 * 1000)
  }
}
