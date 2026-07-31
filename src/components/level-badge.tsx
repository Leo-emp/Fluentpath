'use client'

// # CEFR level badge — bold circle displaying e.g. "B1".

interface LevelBadgeProps {
  level: string
  size?: 'sm' | 'lg'
}

export function LevelBadge({ level, size = 'lg' }: LevelBadgeProps) {
  const dim = size === 'lg' ? 'h-24 w-24 text-3xl' : 'h-12 w-12 text-sm'

  return (
    <div
      className={`${dim} flex items-center justify-center rounded-full border-2 border-foreground font-serif font-bold`}
    >
      {level}
    </div>
  )
}
