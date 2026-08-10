'use client'

// # Badge celebration overlay — shows when a new badge is earned.
// # Renders a full-screen centered card with the badge icon and name,
// # auto-dismisses after 3 seconds or on click.

import { useState, useEffect, useCallback } from 'react'

// # Badge display metadata.
const BADGE_META: Record<string, { name: string; icon: string; description: string }> = {
  first_practice:   { name: 'First Practice', icon: '1', description: 'Completed your first practice session' },
  first_mock_test:  { name: 'First Mock Test', icon: 'T', description: 'Completed your first mock test' },
  streak_3:         { name: '3-Day Streak', icon: '3', description: 'Practiced 3 days in a row' },
  streak_7:         { name: 'Week Warrior', icon: '7', description: 'Practiced 7 days in a row' },
  streak_30:        { name: 'Monthly Master', icon: '30', description: 'Practiced 30 days straight' },
  streak_100:       { name: 'Century Streak', icon: '!!', description: '100 days of practice — legendary' },
  xp_100:           { name: '100 XP', icon: 'C', description: 'Earned 100 experience points' },
  xp_500:           { name: '500 XP', icon: 'D', description: 'Earned 500 experience points' },
  xp_1000:          { name: '1K XP', icon: '1K', description: 'Earned 1,000 experience points' },
  xp_5000:          { name: '5K XP', icon: '5K', description: 'Earned 5,000 experience points' },
  items_50:         { name: '50 Items', icon: '50', description: 'Completed 50 practice items' },
  items_200:        { name: '200 Items', icon: '++', description: 'Completed 200 practice items' },
  items_1000:       { name: '1000 Items', icon: 'M', description: 'Completed 1,000 practice items' },
  level_a2:         { name: 'Reach A2', icon: 'A2', description: 'Achieved CEFR level A2' },
  level_b1:         { name: 'Reach B1', icon: 'B1', description: 'Achieved CEFR level B1' },
  level_b2:         { name: 'Reach B2', icon: 'B2', description: 'Achieved CEFR level B2' },
  level_c1:         { name: 'Reach C1', icon: 'C1', description: 'Achieved CEFR level C1' },
  level_c2:         { name: 'Reach C2', icon: 'C2', description: 'Achieved CEFR level C2' },
  perfect_session:  { name: 'Perfect Score', icon: '*', description: 'Scored 100% in a practice session' },
  all_skills:       { name: 'All Rounder', icon: '4', description: 'Practiced all skills in one day' },
  night_owl:        { name: 'Night Owl', icon: 'N', description: 'Practiced after midnight' },
  early_bird:       { name: 'Early Bird', icon: 'E', description: 'Practiced before 6am' },
  writing_warrior:  { name: 'Writing Warrior', icon: 'W', description: 'Completed 20 writing tasks' },
  reading_master:   { name: 'Reading Master', icon: 'R', description: 'Completed 20 reading passages' },
  listening_pro:    { name: 'Listening Pro', icon: 'L', description: 'Completed 20 listening items' },
  speaking_star:    { name: 'Speaking Star', icon: 'S', description: 'Completed 20 speaking prompts' },
}

interface BadgeCelebrationProps {
  // # Array of newly earned badge type strings.
  badges: string[]
  // # Called when all celebrations are dismissed.
  onDone: () => void
}

export function BadgeCelebration({ badges, onDone }: BadgeCelebrationProps) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const advance = useCallback(() => {
    if (currentIdx < badges.length - 1) {
      setCurrentIdx(i => i + 1)
    } else {
      onDone()
    }
  }, [currentIdx, badges.length, onDone])

  // # Auto-dismiss after 3 seconds.
  useEffect(() => {
    const timer = setTimeout(advance, 3000)
    return () => clearTimeout(timer)
  }, [currentIdx, advance])

  if (badges.length === 0) return null

  const badge = badges[currentIdx]
  if (!badge) return null
  const meta = BADGE_META[badge] ?? { name: badge, icon: '?', description: '' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={advance}
    >
      <div className="animate-in zoom-in-95 fade-in flex max-w-xs flex-col items-center rounded-2xl border border-border bg-background p-8 text-center shadow-2xl duration-300">
        {/* # Badge icon — large circle */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-foreground bg-foreground text-2xl font-bold text-background">
          {meta.icon}
        </div>

        {/* # Title */}
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Badge Earned
        </p>
        <h3 className="mb-2 font-serif text-2xl font-bold">{meta.name}</h3>
        <p className="text-sm text-muted-foreground">{meta.description}</p>

        {/* # Counter if multiple */}
        {badges.length > 1 && (
          <p className="mt-4 text-xs text-muted-foreground">
            {currentIdx + 1} of {badges.length}
          </p>
        )}

        <p className="mt-4 text-xs text-muted-foreground">Tap to continue</p>
      </div>
    </div>
  )
}
