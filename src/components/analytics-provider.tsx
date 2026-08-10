'use client'

// # Analytics provider — initialises PostHog on mount.
// # Wrap the app layout with this component.

import { useEffect } from 'react'
import { initPostHog } from '@/lib/posthog'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog()
  }, [])

  return <>{children}</>
}
