'use client'

// # Weekly XP leaderboard — shows top learners and your rank.

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { apiFetch } from '@/lib/api'

interface LeaderEntry {
  rank: number
  name: string
  weeklyXp: number
  currentStreak: number
  isYou: boolean
}

interface LeaderboardData {
  leaderboard: LeaderEntry[]
  yourRank: { rank: number; weeklyXp: number; currentStreak: number } | null
}

export function Leaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null)

  useEffect(() => {
    apiFetch<LeaderboardData>('/api/gamification/leaderboard')
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data || data.leaderboard.length === 0) return null

  return (
    <Card className="border border-border p-4">
      <h3 className="mb-3 font-serif text-sm font-bold">Weekly Leaderboard</h3>
      <div className="space-y-1">
        {data.leaderboard.slice(0, 10).map(entry => (
          <div
            key={entry.rank}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
              entry.isYou ? 'bg-foreground/5 font-bold' : ''
            }`}
          >
            {/* # Rank */}
            <span className={`w-6 text-center font-mono text-xs ${
              entry.rank <= 3 ? 'font-bold' : 'text-muted-foreground'
            }`}>
              {entry.rank === 1 ? '1st' : entry.rank === 2 ? '2nd' : entry.rank === 3 ? '3rd' : entry.rank}
            </span>

            {/* # Name */}
            <span className="flex-1 truncate">
              {entry.name}{entry.isYou ? ' (you)' : ''}
            </span>

            {/* # Streak */}
            {entry.currentStreak > 0 && (
              <span className="text-xs text-muted-foreground">{entry.currentStreak}d</span>
            )}

            {/* # XP */}
            <span className="font-mono text-xs">{entry.weeklyXp} XP</span>
          </div>
        ))}
      </div>

      {/* # Your rank if not in top 10 */}
      {data.yourRank && (
        <div className="mt-3 border-t border-border pt-3">
          <div className="flex items-center gap-3 rounded-md bg-foreground/5 px-3 py-2 text-sm font-bold">
            <span className="w-6 text-center font-mono text-xs">{data.yourRank.rank}</span>
            <span className="flex-1">You</span>
            {data.yourRank.currentStreak > 0 && (
              <span className="text-xs text-muted-foreground">{data.yourRank.currentStreak}d</span>
            )}
            <span className="font-mono text-xs">{data.yourRank.weeklyXp} XP</span>
          </div>
        </div>
      )}
    </Card>
  )
}
