'use client'

// # Top navigation bar — wordmark left, nav links center, user menu right.
// # Mobile responsive: hamburger menu collapses nav links into a dropdown.

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

// # Navigation links shown to logged-in users.
const NAV_LINKS = [
  { href: '/lessons', label: 'Lessons' },
  { href: '/vocabulary', label: 'Vocabulary' },
  { href: '/grammar', label: 'Grammar' },
  { href: '/phrasal-verbs', label: 'Phrasal Verbs' },
  { href: '/practice', label: 'Practice' },
  { href: '/community', label: 'Community' },
]

export function NavBar() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

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

        {session && (
          <>
            {/* # Desktop nav links — hidden on mobile */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>

            {/* # Desktop user menu — hidden on mobile */}
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-sm text-muted-foreground">
                {session.user.name ?? session.user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} aria-label="Sign out">
                Sign out
              </Button>
            </div>

            {/* # Mobile hamburger button — visible on mobile only */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {/* # Hamburger / X icon using spans */}
              <div className="relative h-5 w-5">
                <span className={`absolute left-0 block h-0.5 w-5 bg-foreground transition-all ${
                  mobileOpen ? 'top-2.5 rotate-45' : 'top-1'
                }`} />
                <span className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-foreground transition-opacity ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute left-0 block h-0.5 w-5 bg-foreground transition-all ${
                  mobileOpen ? 'top-2.5 -rotate-45' : 'top-4'
                }`} />
              </div>
            </button>
          </>
        )}
      </div>

      {/* # Mobile dropdown menu — slides open below the navbar */}
      {session && mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
          {/* # Mobile user info + sign out */}
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 text-sm text-muted-foreground">
              {session.user.name ?? session.user.email}
            </p>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
