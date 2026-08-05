// # App layout — wraps all protected routes with AuthGuard.
// # ErrorBoundary catches rendering errors so one page crash doesn't blank the app.
// # No visual chrome here — pages import NavBar or SessionShell as needed.

import { AuthGuard } from '@/components/auth-guard'
import { ErrorBoundary } from '@/components/error-boundary'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ErrorBoundary>{children}</ErrorBoundary>
    </AuthGuard>
  )
}
