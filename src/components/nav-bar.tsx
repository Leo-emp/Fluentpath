'use client'

// # Top navigation bar — wordmark left, user menu right.
// # Imported by pages that need it (dashboard, result pages, diagnosis).

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export function NavBar() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.replace('/')
  }

  return (
    <nav className="border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* # Logo — links back to dashboard */}
        <a href="/dashboard" className="font-serif text-xl font-bold" aria-label="FluentPath home">
          FluentPath
        </a>
        <div className="flex items-center gap-4">
          {session && (
            <>
              <span className="text-sm text-muted-foreground">
                {session.user.name ?? session.user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} aria-label="Sign out">
                Sign out
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
