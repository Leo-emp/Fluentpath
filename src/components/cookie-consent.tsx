'use client'

// # Cookie consent banner — GDPR-compliant opt-in for analytics.
// # Shows once, persists choice in localStorage, never blocks the UI.

import { useState, useEffect } from 'react'
import {
  hasAnalyticsConsent,
  grantAnalyticsConsent,
  revokeAnalyticsConsent,
} from '@/lib/posthog'

const CONSENT_KEY = 'fluentpath_analytics_consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // # Only show if user hasn't decided yet.
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background px-6 py-4 shadow-lg">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row">
        <p className="flex-1 text-sm text-muted-foreground">
          We use analytics cookies to understand how you use FluentPath and improve the
          platform. You can accept or decline — the platform works fully either way.{' '}
          <a href="/cookies" className="underline">
            Cookie Policy
          </a>
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { revokeAnalyticsConsent(); setVisible(false) }}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Decline
          </button>
          <button
            onClick={() => { grantAnalyticsConsent(); setVisible(false) }}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
