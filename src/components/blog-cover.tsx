// # Blog cover image — CSS gradient + SVG icon.
// # No external images needed, fully self-contained.

// # SVG icon paths keyed by name.
const ICONS: Record<string, string> = {
  // # Pencil — writing articles.
  pencil: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
  // # Scales — comparison articles.
  scales: 'M12 3v17.25m0-17.25c-1.33 0-2.67.11-3.97.32M12 3c1.33 0 2.67.11 3.97.32M5.03 3.32A11.98 11.98 0 0 0 3 9.5c0 1.12.15 2.21.44 3.24l2.06-.82m-.47-8.6 2.06.82M18.97 3.32A11.98 11.98 0 0 1 21 9.5c0 1.12-.15 2.21-.44 3.24l-2.06-.82m.47-8.6-2.06.82',
  // # Microphone — speaking articles.
  mic: 'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z',
  // # Stethoscope / medical — OET writing.
  stethoscope: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  // # Book — vocabulary articles.
  book: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  // # Clock — time management articles.
  clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  // # Volume / speaker — pronunciation articles.
  volume: 'M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z',
  // # Checkmark — grammar/correction articles.
  check: 'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75',
  // # Layers — CEFR levels articles.
  layers: 'M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-9.75 5.25L2.25 12l4.179-2.25m11.142 0-5.571 3-5.571-3m11.142 4.5L21.75 16.5l-9.75 5.25L2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3',
  // # Headphones — listening articles.
  headphones: 'M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V4.846a2.25 2.25 0 0 0-1.632-2.163l-1.32-.377a1.803 1.803 0 0 0-.99 3.467l2.31.66A2.25 2.25 0 0 1 9 9Z',
}

interface BlogCoverProps {
  icon: string
  gradient: string
  title: string
  // # 'card' = listing page (shorter), 'hero' = article page (taller).
  variant?: 'card' | 'hero'
}

export function BlogCover({ icon, gradient, title, variant = 'card' }: BlogCoverProps) {
  const iconPath = ICONS[icon] || ICONS.book
  const height = variant === 'hero' ? 'h-64 sm:h-80' : 'h-48'

  return (
    <div className={`relative ${height} w-full overflow-hidden rounded-t-xl bg-gradient-to-br ${gradient}`}>
      {/* # Decorative circles — adds depth to the gradient. */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-white/5" />
      <div className="absolute right-12 bottom-8 h-24 w-24 rounded-full bg-white/5" />

      {/* # Grid pattern overlay. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* # Center icon. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
        <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`text-white ${variant === 'hero' ? 'h-12 w-12' : 'h-8 w-8'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
        {/* # Show title on hero variant only. */}
        {variant === 'hero' && (
          <h1 className="max-w-2xl text-center font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
            {title}
          </h1>
        )}
      </div>
    </div>
  )
}
