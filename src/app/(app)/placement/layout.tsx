// # Placement test route metadata — sets the browser tab title.
// # Needed because the page itself is a client component.

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Placement Test — FluentPath' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
