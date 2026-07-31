'use client'

// # Wraps protected routes — redirects to /sign-in if no session.

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { PageSkeleton } from '@/components/page-skeleton'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/sign-in')
    }
  }, [isPending, session, router])

  // # Show skeleton while Better Auth checks the session cookie.
  if (isPending) return <PageSkeleton />

  // # Not authenticated — useEffect will redirect, render nothing.
  if (!session) return null

  return <>{children}</>
}
