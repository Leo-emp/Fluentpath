'use client'

// # Daily goal widget — shows XP progress toward the daily target.
// # Includes a goal selector and circular progress ring.

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'

// # Available goal tiers with labels.
const GOAL_OPTIONS = [
  { value: 20, label: 'Casual', desc: '5 min/day' },
  { value: 50, label: 'Regular', desc: '15 min/day' },
  { value: 100, label: 'Serious', desc: '30 min/day' },
  { value: 200, label: 'Intense', desc: '60 min/day' },
] as const

interface GoalData {
  dailyXpGoal: number
  todayXp: number
  todayItems: number
  todayMinutes: number
  goalMet: boolean
}

export function DailyGoalWidget() {
  const [data, setData] = useState<GoalData | null>(null)
  const [picking, setPicking] = useState(false)
  const [saving, setSaving] = useState(false)

  // # Load on mount.
  useEffect(() => {
    apiFetch<GoalData>('/api/gamification/daily-goal')
      .then(setData)
      .catch(() => {})
  }, [])

  // # Set a new goal.
  async function setGoal(xp: number) {
    setSaving(true)
    try {
      await apiFetch('/api/gamification/daily-goal', {
        method: 'PATCH',
        body: JSON.stringify({ dailyXpGoal: xp }),
      })
      setData(prev => prev ? { ...prev, dailyXpGoal: xp, goalMet: prev.todayXp >= xp } : prev)
      setPicking(false)
    } catch {
      // # Silently fail — toast could go here.
    } finally {
      setSaving(false)
    }
  }

  if (!data) return null

  // # No goal set — show picker prompt.
  if (data.dailyXpGoal === 0 && !picking) {
    return (
      <Card className="border border-border p-4 text-center">
        <p className="mb-2 text-sm text-muted-foreground">Set a daily goal to build consistency</p>
        <Button variant="outline" size="sm" onClick={() => setPicking(true)}>
          Choose Goal
        </Button>
      </Card>
    )
  }

  // # Picking a goal.
  if (picking) {
    return (
      <Card className="border border-border p-4">
        <p className="mb-3 text-center text-sm font-medium">Daily XP Target</p>
        <div className="grid grid-cols-2 gap-2">
          {GOAL_OPTIONS.map(opt => (
            <button
              key={opt.value}
              disabled={saving}
              onClick={() => setGoal(opt.value)}
              className={`rounded-lg border border-border p-3 text-center transition-colors hover:bg-muted ${
                data.dailyXpGoal === opt.value ? 'border-foreground bg-foreground/5' : ''
              }`}
            >
              <p className="text-sm font-bold">{opt.value} XP</p>
              <p className="text-xs text-muted-foreground">{opt.label}</p>
            </button>
          ))}
        </div>
        {data.dailyXpGoal > 0 && (
          <button
            onClick={() => setPicking(false)}
            className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        )}
      </Card>
    )
  }

  // # Active goal — show progress ring.
  const pct = Math.min(100, Math.round((data.todayXp / data.dailyXpGoal) * 100))
  const circumference = 2 * Math.PI * 36
  const strokeDashoffset = circumference - (pct / 100) * circumference

  return (
    <Card className="border border-border p-4">
      <div className="flex items-center gap-4">
        {/* # Circular progress ring */}
        <div className="relative flex-shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88">
            {/* # Background ring */}
            <circle cx="44" cy="44" r="36" fill="none" stroke="currentColor" strokeWidth="6"
              className="text-muted" />
            {/* # Progress ring */}
            <circle cx="44" cy="44" r="36" fill="none" stroke="currentColor" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 44 44)"
              className={data.goalMet ? 'text-green-500' : 'text-foreground'}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold">{pct}%</span>
          </div>
        </div>

        {/* # Stats */}
        <div className="flex-1">
          <p className="text-sm font-bold">
            {data.goalMet ? 'Goal reached!' : 'Daily Goal'}
          </p>
          <p className="text-2xl font-bold">{data.todayXp} <span className="text-sm font-normal text-muted-foreground">/ {data.dailyXpGoal} XP</span></p>
          <p className="text-xs text-muted-foreground">
            {data.todayItems} items · {data.todayMinutes} min today
          </p>
          <button
            onClick={() => setPicking(true)}
            className="mt-1 text-xs text-muted-foreground underline hover:text-foreground"
          >
            Change goal
          </button>
        </div>
      </div>
    </Card>
  )
}
