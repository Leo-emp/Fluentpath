'use client'

// # Sign-up page — email/password form + Google OAuth + DOB (18+ gate).

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // # Google OAuth — redirects to Google, comes back to /dashboard.
  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const name = form.get('name') as string
    const email = form.get('email') as string
    const password = form.get('password') as string
    const dob = form.get('dob') as string

    try {
      // # Better Auth server hook enforces 18+ via dateOfBirth.
      // # dateOfBirth is a custom field accepted by the server hook but not in the base type.
      const signUp = authClient.signUp.email as unknown as (opts: Record<string, unknown>) => Promise<{ error: { message?: string } | null }>
      const { error: authError } = await signUp({
        name,
        email,
        password,
        dateOfBirth: dob,
      })

      if (authError) {
        setError(authError.message ?? 'Sign up failed')
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardContent className="pt-6">
        <h1 className="mb-6 text-center font-serif text-2xl font-bold">
          Create your account
        </h1>

        {/* # Google OAuth button */}
        <Button variant="outline" className="mb-4 w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>

        {/* # "or" divider */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        {/* # Error banner */}
        {error && (
          <p className="mb-4 rounded bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {/* # Email/password form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" minLength={8} required />
          </div>
          <div>
            <Label htmlFor="dob">Date of birth</Label>
            <Input id="dob" name="dob" type="date" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
