'use client'

// # Gamification panel — displays streak, XP, badges, and activity heatmap.
// # Used on the dashboard to show learner engagement stats.

import { Card } from '@/components/ui/card'
import { BADGE_TYPES } from '@/db/schema/gamification'

// # ═══════════════════════════════════════════════════════════════════
// # TYPES
// # ═══════════════════════════════════════════════════════════════════

interface StreakStats {
  currentStreak: number
  longestStreak: number
  totalXp: number
  weeklyXp: number
}

interface DailyActivityItem {
  date: string
  items: number
  xp: number
  minutes: number
  sessions: number
}

interface Badge {
  type: string
  earnedAt: number
}

interface GamificationPanelProps {
  streak: StreakStats
  activity: DailyActivityItem[]
  badges: Badge[]
}

// # ═══════════════════════════════════════════════════════════════════
// # BADGE METADATA — display names and icons for each badge type.
// # ═══════════════════════════════════════════════════════════════════

const BADGE_META: Record<string, { name: string; icon: string }> = {
  first_practice:   { name: 'First Practice', icon: '1' },
  first_mock_test:  { name: 'First Mock Test', icon: 'T' },
  streak_3:         { name: '3-Day Streak', icon: '3' },
  streak_7:         { name: 'Week Warrior', icon: '7' },
  streak_30:        { name: 'Monthly Master', icon: '30' },
  streak_100:       { name: 'Century Streak', icon: '!!' },
  xp_100:           { name: '100 XP', icon: 'C' },
  xp_500:           { name: '500 XP', icon: 'D' },
  xp_1000:          { name: '1K XP', icon: '1K' },
  xp_5000:          { name: '5K XP', icon: '5K' },
  items_50:         { name: '50 Items', icon: '50' },
  items_200:        { name: '200 Items', icon: '++' },
  items_1000:       { name: '1000 Items', icon: 'M' },
  level_a2:         { name: 'Reach A2', icon: 'A2' },
  level_b1:         { name: 'Reach B1', icon: 'B1' },
  level_b2:         { name: 'Reach B2', icon: 'B2' },
  level_c1:         { name: 'Reach C1', icon: 'C1' },
  level_c2:         { name: 'Reach C2', icon: 'C2' },
  perfect_session:  { name: 'Perfect Score', icon: '*' },
  all_skills:       { name: 'All Rounder', icon: '4' },
  night_owl:        { name: 'Night Owl', icon: 'N' },
  early_bird:       { name: 'Early Bird', icon: 'E' },
  writing_warrior:  { name: 'Writing Warrior', icon: 'W' },
  reading_master:   { name: 'Reading Master', icon: 'R' },
  listening_pro:    { name: 'Listening Pro', icon: 'L' },
  speaking_star:    { name: 'Speaking Star', icon: 'S' },
}

// # ═══════════════════════════════════════════════════════════════════
// # MAIN COMPONENT
// # ═══════════════════════════════════════════════════════════════════

export function GamificationPanel({ streak, activity, badges }: GamificationPanelProps) {
  const earnedSet = new Set(badges.map(b => b.type))

  return (
    <div className="space-y-6">
      {/* # Stats row — streak, XP, weekly XP */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Streak"
          value={`${streak.currentStreak}d`}
          sub={`Best: ${streak.longestStreak}d`}
        />
        <StatCard
          label="Total XP"
          value={formatXp(streak.totalXp)}
          sub="All time"
        />
        <StatCard
          label="This Week"
          value={formatXp(streak.weeklyXp)}
          sub="Weekly XP"
        />
      </div>

      {/* # Activity heatmap — last 12 weeks */}
      <Card className="border border-border p-4">
        <h3 className="mb-3 font-serif text-sm font-bold">Activity</h3>
        <ActivityHeatmap activity={activity} />
      </Card>

      {/* # Badges earned */}
      {badges.length > 0 && (
        <Card className="border border-border p-4">
          <h3 className="mb-3 font-serif text-sm font-bold">
            Badges ({badges.length}/{BADGE_TYPES.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {BADGE_TYPES.map(type => {
              const meta = BADGE_META[type] ?? { name: type, icon: '?' }
              const earned = earnedSet.has(type)
              return (
                <div
                  key={type}
                  title={meta.name}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                    earned
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground opacity-30'
                  }`}
                >
                  {meta.icon}
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

// # ═══════════════════════════════════════════════════════════════════
// # SUB-COMPONENTS
// # ═══════════════════════════════════════════════════════════════════

// # Compact stat card for the top row.
function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="border border-border p-3 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-serif text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </Card>
  )
}

// # Activity heatmap — GitHub-style contribution graph for last 84 days (12 weeks).
function ActivityHeatmap({ activity }: { activity: DailyActivityItem[] }) {
  // # Build a map of date → items completed.
  const actMap = new Map(activity.map(a => [a.date, a.items]))

  // # Generate the last 84 days (12 weeks) of dates.
  const today = new Date()
  const days: { date: string; items: number }[] = []
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    days.push({ date: dateStr, items: actMap.get(dateStr) ?? 0 })
  }

  // # Arrange into 7 rows (Mon-Sun) x 12 columns (weeks).
  type DayEntry = { date: string; items: number }
  const weeks: (DayEntry | null)[][] = Array.from({ length: 12 }, () =>
    Array(7).fill(null) as (DayEntry | null)[],
  )
  // # Find what day of week the first date falls on (0=Sun, 1=Mon, ...).
  const firstEntry = days[0]
  if (!firstEntry) return null
  const firstDay = new Date(firstEntry.date)
  let dayOfWeek = firstDay.getDay()
  // # Convert to ISO (Mon=0).
  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  let weekIdx = 0
  let slotIdx = dayOfWeek
  for (const day of days) {
    if (slotIdx >= 7) {
      slotIdx = 0
      weekIdx++
    }
    if (weekIdx < 12 && weeks[weekIdx]) {
      weeks[weekIdx]![slotIdx] = day
    }
    slotIdx++
  }

  return (
    <div className="flex gap-[3px]">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((day, di) => (
            <div
              key={di}
              title={day ? `${day.date}: ${day.items} items` : ''}
              className={`h-3 w-3 rounded-[2px] ${
                !day
                  ? 'bg-transparent'
                  : day.items === 0
                    ? 'bg-muted'
                    : day.items < 5
                      ? 'bg-foreground/25'
                      : day.items < 15
                        ? 'bg-foreground/50'
                        : day.items < 30
                          ? 'bg-foreground/75'
                          : 'bg-foreground'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// # Format XP with K suffix for large numbers.
function formatXp(xp: number): string {
  if (xp >= 10_000) return `${(xp / 1000).toFixed(1)}K`
  if (xp >= 1_000) return `${(xp / 1000).toFixed(1)}K`
  return xp.toString()
}
