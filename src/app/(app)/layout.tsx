// # App layout — wraps all protected routes with AuthGuard.
// # No visual chrome here — pages import NavBar or SessionShell as needed.

import { AuthGuard } from '@/components/auth-guard'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
