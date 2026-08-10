'use client'

// # Admin dashboard — platform analytics, user management, content stats.
// # Protected by email allowlist via the admin API endpoints.

import { useState, useEffect } from 'react'
import { NavBar } from '@/components/nav-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageSkeleton } from '@/components/page-skeleton'
import { apiFetch } from '@/lib/api'

// # ═══════════════════════════════════════════════════════════════════
// # TYPES
// # ═══════════════════════════════════════════════════════════════════

interface PlatformStats {
  totalUsers: number
  tiers: Record<string, number>
  weeklyActive: number
  monthlyActive: number
  placementsCompleted: number
  levelDistribution: Record<string, number>
  testsCompleted: number
  topLearners: { name: string; email: string; totalXp: number; currentStreak: number }[]
  recentSignups: { name: string | null; email: string; tier: string; level: string | null; joinedAt: number }[]
}

interface UserRow {
  id: string
  name: string | null
  email: string
  tier: string
  level: string | null
  subscriptionStatus: string
  totalXp: number
  currentStreak: number
  lastActive: string | null
  joinedAt: number
}

interface UsersResponse {
  users: UserRow[]
  page: number
  total: number
  totalPages: number
}

// # ═══════════════════════════════════════════════════════════════════
// # MAIN PAGE
// # ═══════════════════════════════════════════════════════════════════

export default function AdminPage() {
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [users, setUsers] = useState<UsersResponse | null>(null)
  const [tab, setTab] = useState<'overview' | 'users'>('overview')
  const [userPage, setUserPage] = useState(1)
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // # Load stats on mount.
  useEffect(() => {
    apiFetch<PlatformStats>('/api/admin/stats')
      .then(data => { setStats(data); setLoading(false) })
      .catch(err => { setError('Access denied or server error'); setLoading(false) })
  }, [])

  // # Load users when tab switches or filters change.
  useEffect(() => {
    if (tab !== 'users') return
    const params = new URLSearchParams({ page: String(userPage), limit: '50' })
    if (tierFilter) params.set('tier', tierFilter)
    if (search) params.set('search', search)
    apiFetch<UsersResponse>(`/api/admin/users?${params}`)
      .then(setUsers)
      .catch(() => {})
  }, [tab, userPage, tierFilter, search])

  if (loading) return <><NavBar /><PageSkeleton /></>
  if (error) return (
    <><NavBar /><main className="mx-auto max-w-4xl px-6 py-12 text-center">
      <p className="text-lg text-muted-foreground">{error}</p>
    </main></>
  )
  if (!stats) return null

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-6 font-serif text-3xl font-bold">Admin Dashboard</h1>

        {/* # Tab selector */}
        <div className="mb-6 flex gap-2">
          <Button variant={tab === 'overview' ? 'default' : 'outline'} size="sm" onClick={() => setTab('overview')}>
            Overview
          </Button>
          <Button variant={tab === 'users' ? 'default' : 'outline'} size="sm" onClick={() => setTab('users')}>
            Users
          </Button>
        </div>

        {tab === 'overview' && <OverviewTab stats={stats} />}
        {tab === 'users' && (
          <UsersTab
            users={users}
            search={search}
            onSearch={setSearch}
            tierFilter={tierFilter}
            onTierFilter={setTierFilter}
            onPageChange={setUserPage}
          />
        )}
      </main>
    </>
  )
}

// # ═══════════════════════════════════════════════════════════════════
// # OVERVIEW TAB
// # ═══════════════════════════════════════════════════════════════════

function OverviewTab({ stats }: { stats: PlatformStats }) {
  return (
    <div className="space-y-6">
      {/* # Key metrics row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Users" value={stats.totalUsers} />
        <MetricCard label="Weekly Active" value={stats.weeklyActive} sub={`${stats.totalUsers > 0 ? Math.round((stats.weeklyActive / stats.totalUsers) * 100) : 0}% of total`} />
        <MetricCard label="Monthly Active" value={stats.monthlyActive} />
        <MetricCard label="Tests Completed" value={stats.testsCompleted} />
      </div>

      {/* # Tier breakdown */}
      <Card className="border border-border p-4">
        <h3 className="mb-3 font-serif text-sm font-bold">Users by Tier</h3>
        <div className="grid grid-cols-3 gap-3">
          {['free', 'exam', 'complete'].map(tier => (
            <div key={tier} className="rounded-lg border border-border p-3 text-center">
              <p className="text-2xl font-bold">{stats.tiers[tier] ?? 0}</p>
              <p className="text-xs capitalize text-muted-foreground">{tier}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* # Level distribution */}
      <Card className="border border-border p-4">
        <h3 className="mb-3 font-serif text-sm font-bold">Level Distribution</h3>
        <div className="grid grid-cols-6 gap-2">
          {['preA1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
            <div key={level} className="rounded-lg border border-border p-2 text-center">
              <p className="text-lg font-bold">{stats.levelDistribution[level] ?? 0}</p>
              <p className="text-xs text-muted-foreground">{level}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* # Top learners */}
      <Card className="border border-border p-4">
        <h3 className="mb-3 font-serif text-sm font-bold">Top Learners (by XP)</h3>
        <div className="space-y-1">
          {stats.topLearners.map((l, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm">
              <span className="w-6 text-center font-mono text-xs text-muted-foreground">{i + 1}</span>
              <span className="flex-1 truncate">{l.name || l.email}</span>
              <span className="text-xs text-muted-foreground">{l.currentStreak}d streak</span>
              <span className="font-mono text-xs">{l.totalXp} XP</span>
            </div>
          ))}
          {stats.topLearners.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">No learners yet</p>
          )}
        </div>
      </Card>

      {/* # Recent signups */}
      <Card className="border border-border p-4">
        <h3 className="mb-3 font-serif text-sm font-bold">Recent Signups</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Tier</th>
                <th className="pb-2 pr-4">Level</th>
                <th className="pb-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentSignups.map((u, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 pr-4">{u.name || '—'}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{u.email}</td>
                  <td className="py-2 pr-4 capitalize">{u.tier}</td>
                  <td className="py-2 pr-4">{u.level || '—'}</td>
                  <td className="py-2 text-muted-foreground">{new Date(u.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// # ═══════════════════════════════════════════════════════════════════
// # USERS TAB
// # ═══════════════════════════════════════════════════════════════════

function UsersTab({
  users,
  search,
  onSearch,
  tierFilter,
  onTierFilter,
  onPageChange,
}: {
  users: UsersResponse | null
  search: string
  onSearch: (s: string) => void
  tierFilter: string
  onTierFilter: (t: string) => void
  onPageChange: (p: number) => void
}) {
  const [searchInput, setSearchInput] = useState(search)

  return (
    <div className="space-y-4">
      {/* # Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch(searchInput)}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        />
        <Button variant="outline" size="sm" onClick={() => onSearch(searchInput)}>
          Search
        </Button>
        <select
          value={tierFilter}
          onChange={e => onTierFilter(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        >
          <option value="">All tiers</option>
          <option value="free">Free</option>
          <option value="exam">Exam</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      {/* # User table */}
      {users && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="pb-2 pr-3">Name</th>
                  <th className="pb-2 pr-3">Email</th>
                  <th className="pb-2 pr-3">Tier</th>
                  <th className="pb-2 pr-3">Level</th>
                  <th className="pb-2 pr-3">XP</th>
                  <th className="pb-2 pr-3">Streak</th>
                  <th className="pb-2 pr-3">Last Active</th>
                  <th className="pb-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.users.map(u => (
                  <tr key={u.id} className="border-b border-border/50">
                    <td className="py-2 pr-3">{u.name || '—'}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{u.email}</td>
                    <td className="py-2 pr-3 capitalize">{u.tier}</td>
                    <td className="py-2 pr-3">{u.level || '—'}</td>
                    <td className="py-2 pr-3 font-mono">{u.totalXp}</td>
                    <td className="py-2 pr-3">{u.currentStreak}d</td>
                    <td className="py-2 pr-3 text-muted-foreground">{u.lastActive || '—'}</td>
                    <td className="py-2 text-muted-foreground">{new Date(u.joinedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* # Pagination */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">{users.total} users total</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={users.page <= 1} onClick={() => onPageChange(users.page - 1)}>
                Previous
              </Button>
              <span className="flex items-center text-xs text-muted-foreground">
                Page {users.page} / {users.totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={users.page >= users.totalPages} onClick={() => onPageChange(users.page + 1)}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// # ═══════════════════════════════════════════════════════════════════
// # SHARED COMPONENTS
// # ═══════════════════════════════════════════════════════════════════

function MetricCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <Card className="border border-border p-4 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-serif text-3xl font-bold">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </Card>
  )
}
