'use client'

// # Settings page — account management, data export, account deletion.
// # GDPR compliance: users can export all data and delete their account.

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'

interface Profile {
  id: string
  email: string
  name: string | null
  currentLevel: string | null
}

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    apiFetch<{ learner: Profile }>('/api/me')
      .then(data => { setProfile(data.learner); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // # Download all user data as JSON.
  async function handleExport() {
    setExporting(true)
    try {
      const res = await fetch('/api/me/data-export', { credentials: 'include' })
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fluentpath-data-export-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Failed to export data. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  // # Permanently delete account and all data.
  async function handleDelete() {
    setDeleting(true)
    try {
      await fetch('/api/me/delete-account', {
        method: 'DELETE',
        credentials: 'include',
      })
      router.push('/')
    } catch {
      alert('Failed to delete account. Please try again.')
      setDeleting(false)
    }
  }

  if (loading) return <><NavBar /><PageSkeleton /></>
  if (!profile) return null

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 font-serif text-3xl font-bold">Settings</h1>

        {/* # Account info */}
        <Card className="mb-6 border border-border p-6">
          <h2 className="mb-4 font-serif text-lg font-bold">Account</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span>{profile.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Level</span>
              <span>{profile.currentLevel || 'Not placed'}</span>
            </div>
          </div>
        </Card>

        {/* # Data export (GDPR Article 20) */}
        <Card className="mb-6 border border-border p-6">
          <h2 className="mb-2 font-serif text-lg font-bold">Export Your Data</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Download all your data including profile, progress, test results, and activity history.
          </p>
          <Button variant="outline" size="sm" disabled={exporting} onClick={handleExport}>
            {exporting ? 'Preparing...' : 'Download My Data'}
          </Button>
        </Card>

        {/* # Account deletion (GDPR Article 17) */}
        <Card className="border border-destructive/20 p-6">
          <h2 className="mb-2 font-serif text-lg font-bold text-destructive">Delete Account</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
            Any active subscriptions will be cancelled.
          </p>
          {!confirmDelete ? (
            <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={() => setConfirmDelete(true)}>
              Delete My Account
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-destructive">
                Are you sure? This will permanently delete all your progress, test results, and account data.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </Button>
                <Button size="sm" disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleDelete}>
                  {deleting ? 'Deleting...' : 'Yes, Delete Everything'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </>
  )
}
