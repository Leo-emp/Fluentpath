// # PostHog analytics — consent-first event tracking.
// # Nothing fires until the user explicitly consents via the cookie banner.
// # Set NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST env vars.

import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

// # localStorage key for consent state.
const CONSENT_KEY = 'fluentpath_analytics_consent'

let initialised = false

// # Check if the user has given analytics consent.
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CONSENT_KEY) === 'granted'
}

// # Grant consent — initialises PostHog and starts tracking.
export function grantAnalyticsConsent() {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, 'granted')
  initPostHog()
}

// # Revoke consent — stops PostHog and clears stored data.
export function revokeAnalyticsConsent() {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, 'denied')
  if (POSTHOG_KEY) {
    posthog.opt_out_capturing()
    posthog.reset()
  }
}

// # Initialise PostHog — only fires if consent was previously granted.
export function initPostHog() {
  if (initialised || !POSTHOG_KEY || typeof window === 'undefined') return
  if (!hasAnalyticsConsent()) return
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
    autocapture: true,
  })
  initialised = true
}

// # Identify the user after sign-in.
export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY || !hasAnalyticsConsent()) return
  posthog.identify(userId, properties)
}

// # Track a custom event.
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY || !hasAnalyticsConsent()) return
  posthog.capture(event, properties)
}

// # Reset on sign-out.
export function resetAnalytics() {
  if (!POSTHOG_KEY) return
  posthog.reset()
}

// # Pre-defined events for consistent naming.
export const EVENTS = {
  PLACEMENT_STARTED: 'placement_started',
  PLACEMENT_COMPLETED: 'placement_completed',
  LESSON_STARTED: 'lesson_started',
  LESSON_COMPLETED: 'lesson_completed',
  PRACTICE_STARTED: 'practice_started',
  PRACTICE_COMPLETED: 'practice_completed',
  MOCK_TEST_STARTED: 'mock_test_started',
  MOCK_TEST_COMPLETED: 'mock_test_completed',
  DAILY_GOAL_SET: 'daily_goal_set',
  DAILY_GOAL_MET: 'daily_goal_met',
  BADGE_EARNED: 'badge_earned',
  STREAK_EXTENDED: 'streak_extended',
  SIGNUP_COMPLETED: 'signup_completed',
  SUBSCRIPTION_STARTED: 'subscription_started',
  TTS_USED: 'tts_used',
  WRITING_SUBMITTED: 'writing_submitted',
  SPEAKING_SUBMITTED: 'speaking_submitted',
} as const
