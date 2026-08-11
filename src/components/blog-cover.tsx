// # Editorial blog covers — each coverId maps to a unique,
// # hand-crafted SVG composition. No templates, no repetition.

interface BlogCoverProps {
  coverId: number
  title: string
  category: string
  variant?: 'card' | 'hero'
}

export function BlogCover({ coverId, title, category, variant = 'card' }: BlogCoverProps) {
  const h = variant === 'hero' ? 320 : 200
  const w = variant === 'hero' ? 960 : 480
  const composition = COMPOSITIONS[coverId % COMPOSITIONS.length]!

  return (
    <div className={`relative w-full overflow-hidden ${variant === 'hero' ? 'rounded-xl' : 'rounded-t-xl'}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="block w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>{composition.defs?.(w, h)}</defs>
        {composition.render(w, h)}
      </svg>

      {/* # Title overlay — hero only. */}
      {variant === 'hero' && (
        <div className="absolute inset-0 flex items-end">
          <div className="w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent px-8 pb-8 pt-20">
            <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
              {category}
            </span>
            <h1 className="max-w-3xl font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h1>
          </div>
        </div>
      )}
    </div>
  )
}

// # ────────────────────────────────────────────────────────────
// # 10 unique compositions — each is a distinct editorial design.
// # ────────────────────────────────────────────────────────────

interface Composition {
  defs?: (w: number, h: number) => React.ReactNode
  render: (w: number, h: number) => React.ReactNode
}

const COMPOSITIONS: Composition[] = [

  // # 0 — "Manuscript" — IELTS Writing Task 2
  // # Stacked, offset text lines with a bold accent slash.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#0f172a" />
        {/* # Faint ruled lines like notebook paper. */}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={w * 0.08} y1={h * 0.12 + i * (h * 0.07)} x2={w * 0.7} y2={h * 0.12 + i * (h * 0.07)} stroke="#334155" strokeWidth={0.5} />
        ))}
        {/* # Bold diagonal accent bar. */}
        <rect x={w * 0.62} y={-h * 0.1} width={w * 0.06} height={h * 1.3} fill="#3b82f6" transform={`rotate(12 ${w * 0.65} ${h * 0.5})`} />
        {/* # Large typographic "7+" — the target score. */}
        <text x={w * 0.74} y={h * 0.62} fontFamily="Georgia, serif" fontSize={h * 0.55} fontWeight="bold" fill="#1e3a5f" opacity={0.25}>7+</text>
        <text x={w * 0.73} y={h * 0.6} fontFamily="Georgia, serif" fontSize={h * 0.55} fontWeight="bold" fill="#60a5fa" opacity={0.4}>7+</text>
        {/* # Scattered "paragraph" blocks. */}
        <rect x={w * 0.08} y={h * 0.15} width={w * 0.35} height={h * 0.04} rx={2} fill="#475569" opacity={0.5} />
        <rect x={w * 0.08} y={h * 0.22} width={w * 0.28} height={h * 0.04} rx={2} fill="#475569" opacity={0.35} />
        <rect x={w * 0.08} y={h * 0.29} width={w * 0.32} height={h * 0.04} rx={2} fill="#475569" opacity={0.25} />
        <rect x={w * 0.08} y={h * 0.42} width={w * 0.4} height={h * 0.04} rx={2} fill="#3b82f6" opacity={0.3} />
        <rect x={w * 0.08} y={h * 0.49} width={w * 0.25} height={h * 0.04} rx={2} fill="#475569" opacity={0.35} />
        {/* # Red edit mark — feels hand-annotated. */}
        <path d={`M${w * 0.15} ${h * 0.65} Q${w * 0.25} ${h * 0.58} ${w * 0.38} ${h * 0.67}`} stroke="#ef4444" strokeWidth={2.5} fill="none" opacity={0.6} />
        <circle cx={w * 0.38} cy={h * 0.67} r={3} fill="#ef4444" opacity={0.6} />
      </>
    ),
  },

  // # 1 — "Versus" — PTE vs IELTS
  // # Split composition with opposing geometric halves.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#1e1b4b" />
        {/* # Left half — cool angular shapes. */}
        <polygon points={`0,0 ${w * 0.48},0 ${w * 0.42},${h}`} fill="#312e81" />
        <polygon points={`0,${h} ${w * 0.42},${h} ${w * 0.15},0`} fill="#3730a3" opacity={0.4} />
        {/* # Right half — warm angular shapes. */}
        <polygon points={`${w * 0.52},0 ${w},0 ${w},${h} ${w * 0.58},${h}`} fill="#581c87" />
        <polygon points={`${w * 0.85},0 ${w},0 ${w},${h * 0.4}`} fill="#7c3aed" opacity={0.3} />
        {/* # Center divider — the "vs" zone. */}
        <line x1={w * 0.5} y1={0} x2={w * 0.5} y2={h} stroke="#a78bfa" strokeWidth={1} opacity={0.3} />
        {/* # Diamond at center. */}
        <polygon points={`${w * 0.5},${h * 0.3} ${w * 0.55},${h * 0.5} ${w * 0.5},${h * 0.7} ${w * 0.45},${h * 0.5}`} fill="none" stroke="#c4b5fd" strokeWidth={1.5} />
        {/* # Scattered dots — like data points on each side. */}
        {[0.12, 0.2, 0.28, 0.35].map((y, i) => (
          <circle key={`l${i}`} cx={w * (0.1 + i * 0.06)} cy={h * y + h * 0.2} r={3} fill="#818cf8" opacity={0.5 + i * 0.1} />
        ))}
        {[0.15, 0.25, 0.32, 0.4].map((y, i) => (
          <circle key={`r${i}`} cx={w * (0.65 + i * 0.07)} cy={h * y + h * 0.15} r={3} fill="#c084fc" opacity={0.5 + i * 0.1} />
        ))}
        {/* # Subtle arcs connecting both sides. */}
        <path d={`M${w * 0.3} ${h * 0.25} Q${w * 0.5} ${h * 0.05} ${w * 0.7} ${h * 0.25}`} stroke="#818cf8" strokeWidth={0.7} fill="none" opacity={0.25} />
        <path d={`M${w * 0.3} ${h * 0.75} Q${w * 0.5} ${h * 0.95} ${w * 0.7} ${h * 0.75}`} stroke="#c084fc" strokeWidth={0.7} fill="none" opacity={0.25} />
      </>
    ),
  },

  // # 2 — "Waveform" — IELTS Speaking
  // # Audio waveform + scattered sound particles.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#0c4a6e" />
        {/* # Radial glow from center-left. */}
        <ellipse cx={w * 0.35} cy={h * 0.5} rx={w * 0.5} ry={h * 0.8} fill="#0369a1" opacity={0.3} />
        {/* # Audio waveform bars — asymmetric heights, like real speech. */}
        {[18, 35, 55, 70, 42, 80, 65, 90, 50, 75, 38, 60, 85, 45, 68, 30, 55, 72, 40, 58, 25, 48, 62, 35, 52].map((pct, i) => {
          const barH = (pct / 100) * h * 0.55
          const x = w * 0.08 + i * (w * 0.036)
          return (
            <rect key={i} x={x} y={h * 0.5 - barH / 2} width={w * 0.018} height={barH} rx={w * 0.009}
              fill={i >= 10 && i <= 14 ? '#38bdf8' : '#0ea5e9'} opacity={i >= 10 && i <= 14 ? 0.9 : 0.4 + (pct / 100) * 0.3}
            />
          )
        })}
        {/* # Floating particles — sound dispersing. */}
        {[
          [0.82, 0.2, 4], [0.88, 0.35, 2.5], [0.78, 0.65, 3], [0.92, 0.55, 2],
          [0.85, 0.78, 3.5], [0.75, 0.15, 2], [0.95, 0.42, 1.5], [0.72, 0.82, 2.5],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={w * x!} cy={h * y!} r={r!} fill="#7dd3fc" opacity={0.15 + (i % 3) * 0.1} />
        ))}
        {/* # Concentric arcs from speaker position. */}
        {[0.12, 0.2, 0.28].map((r, i) => (
          <path key={i} d={`M${w * 0.05} ${h * (0.5 - r)} A${w * r} ${h * r} 0 0 1 ${w * 0.05} ${h * (0.5 + r)}`}
            stroke="#38bdf8" strokeWidth={0.7} fill="none" opacity={0.15 - i * 0.03}
          />
        ))}
      </>
    ),
  },

  // # 3 — "Clinical" — OET Writing
  // # Clean medical aesthetic: cross symbol, ECG line, structured blocks.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#064e3b" />
        <rect width={w} height={h} fill="#065f46" opacity={0.5} />
        {/* # Large ghosted medical cross. */}
        <rect x={w * 0.62} y={h * 0.05} width={w * 0.08} height={h * 0.9} rx={4} fill="#059669" opacity={0.15} />
        <rect x={w * 0.5} y={h * 0.3} width={w * 0.32} height={h * 0.08} rx={4} fill="#059669" opacity={0.15} />
        {/* # ECG heartbeat line across bottom third. */}
        <polyline
          points={`${w * 0.02},${h * 0.72} ${w * 0.15},${h * 0.72} ${w * 0.18},${h * 0.68} ${w * 0.2},${h * 0.72} ${w * 0.24},${h * 0.72} ${w * 0.26},${h * 0.55} ${w * 0.28},${h * 0.82} ${w * 0.3},${h * 0.65} ${w * 0.32},${h * 0.72} ${w * 0.5},${h * 0.72} ${w * 0.53},${h * 0.68} ${w * 0.55},${h * 0.72} ${w * 0.59},${h * 0.72} ${w * 0.61},${h * 0.55} ${w * 0.63},${h * 0.82} ${w * 0.65},${h * 0.65} ${w * 0.67},${h * 0.72} ${w * 0.98},${h * 0.72}`}
          stroke="#34d399" strokeWidth={1.5} fill="none" opacity={0.35}
        />
        {/* # Document/form blocks — referral letter feel. */}
        <rect x={w * 0.06} y={h * 0.08} width={w * 0.35} height={h * 0.06} rx={2} fill="#a7f3d0" opacity={0.12} />
        <rect x={w * 0.06} y={h * 0.17} width={w * 0.28} height={h * 0.04} rx={2} fill="#a7f3d0" opacity={0.08} />
        <rect x={w * 0.06} y={h * 0.23} width={w * 0.32} height={h * 0.04} rx={2} fill="#a7f3d0" opacity={0.08} />
        <rect x={w * 0.06} y={h * 0.29} width={w * 0.2} height={h * 0.04} rx={2} fill="#a7f3d0" opacity={0.08} />
        {/* # Signature line. */}
        <line x1={w * 0.06} y1={h * 0.88} x2={w * 0.3} y2={h * 0.88} stroke="#6ee7b7" strokeWidth={1} opacity={0.3} />
        <path d={`M${w * 0.08} ${h * 0.86} Q${w * 0.15} ${h * 0.82} ${w * 0.22} ${h * 0.85} T${w * 0.28} ${h * 0.84}`} stroke="#6ee7b7" strokeWidth={1.2} fill="none" opacity={0.4} />
      </>
    ),
  },

  // # 4 — "Lexicon" — Vocabulary Building
  // # Floating word fragments at different sizes and rotations.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#78350f" />
        <rect width={w} height={h} fill="#92400e" opacity={0.5} />
        {/* # Scattered word fragments at various angles. */}
        {[
          { text: 'ubiquitous', x: 0.08, y: 0.25, size: 0.08, angle: -8, op: 0.12 },
          { text: 'Aa', x: 0.72, y: 0.18, size: 0.22, angle: 0, op: 0.07 },
          { text: 'eloquent', x: 0.55, y: 0.45, size: 0.06, angle: 4, op: 0.15 },
          { text: 'nuance', x: 0.15, y: 0.7, size: 0.1, angle: -3, op: 0.1 },
          { text: 'lexicon', x: 0.6, y: 0.78, size: 0.07, angle: 6, op: 0.12 },
          { text: 'context', x: 0.35, y: 0.35, size: 0.05, angle: -12, op: 0.18 },
          { text: 'cognate', x: 0.82, y: 0.6, size: 0.055, angle: 8, op: 0.13 },
        ].map(({ text, x, y, size, angle, op }, i) => (
          <text key={i} x={w * x} y={h * y} fontFamily="Georgia, serif" fontSize={h * size} fill="#fbbf24"
            opacity={op} transform={`rotate(${angle} ${w * x} ${h * y})`}
          >{text}</text>
        ))}
        {/* # Connection lines between words — "word web". */}
        <line x1={w * 0.25} y1={h * 0.28} x2={w * 0.4} y2={h * 0.37} stroke="#f59e0b" strokeWidth={0.5} opacity={0.15} />
        <line x1={w * 0.4} y1={h * 0.37} x2={w * 0.6} y2={h * 0.47} stroke="#f59e0b" strokeWidth={0.5} opacity={0.15} />
        <line x1={w * 0.22} y1={h * 0.72} x2={w * 0.4} y2={h * 0.38} stroke="#f59e0b" strokeWidth={0.5} opacity={0.1} />
        {/* # Highlight box around one word. */}
        <rect x={w * 0.33} y={h * 0.29} width={w * 0.12} height={h * 0.12} rx={3} fill="none" stroke="#fbbf24" strokeWidth={1.5} opacity={0.25} />
        {/* # Spaced repetition curve — subtle. */}
        <path d={`M${w * 0.05} ${h * 0.92} Q${w * 0.2} ${h * 0.6} ${w * 0.4} ${h * 0.85} T${w * 0.75} ${h * 0.7} T${w * 0.95} ${h * 0.88}`}
          stroke="#fcd34d" strokeWidth={1} fill="none" opacity={0.12} strokeDasharray="4 3"
        />
      </>
    ),
  },

  // # 5 — "Countdown" — IELTS Reading Time Management
  // # Clock face deconstructed into geometric segments.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#0f172a" />
        {/* # Large deconstructed clock face — right side. */}
        <circle cx={w * 0.65} cy={h * 0.5} r={h * 0.42} fill="none" stroke="#1e40af" strokeWidth={2} opacity={0.15} />
        <circle cx={w * 0.65} cy={h * 0.5} r={h * 0.38} fill="none" stroke="#1e40af" strokeWidth={0.5} opacity={0.1} />
        {/* # Hour markers — only some, deconstructed feel. */}
        {[0, 30, 60, 90, 150, 210, 270, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const cx = w * 0.65; const cy = h * 0.5; const r = h * 0.38
          return (
            <line key={i}
              x1={cx + Math.cos(rad) * r * 0.88} y1={cy + Math.sin(rad) * r * 0.88}
              x2={cx + Math.cos(rad) * r} y2={cy + Math.sin(rad) * r}
              stroke="#3b82f6" strokeWidth={i === 0 ? 2.5 : 1.5} opacity={0.4}
            />
          )
        })}
        {/* # Minute hand — pointing at ~40 min mark. */}
        <line x1={w * 0.65} y1={h * 0.5} x2={w * 0.65 + h * 0.32 * Math.cos(240 * Math.PI / 180)} y2={h * 0.5 + h * 0.32 * Math.sin(240 * Math.PI / 180)}
          stroke="#60a5fa" strokeWidth={2} strokeLinecap="round" opacity={0.6}
        />
        {/* # Center dot. */}
        <circle cx={w * 0.65} cy={h * 0.5} r={3} fill="#93c5fd" />
        {/* # Left side — passage progress bars. */}
        <text x={w * 0.06} y={h * 0.22} fontFamily="ui-monospace, monospace" fontSize={h * 0.06} fill="#64748b" opacity={0.4}>P1</text>
        <rect x={w * 0.12} y={h * 0.17} width={w * 0.25} height={h * 0.04} rx={2} fill="#1e293b" />
        <rect x={w * 0.12} y={h * 0.17} width={w * 0.25} height={h * 0.04} rx={2} fill="#3b82f6" opacity={0.5} />
        <text x={w * 0.06} y={h * 0.42} fontFamily="ui-monospace, monospace" fontSize={h * 0.06} fill="#64748b" opacity={0.4}>P2</text>
        <rect x={w * 0.12} y={h * 0.37} width={w * 0.25} height={h * 0.04} rx={2} fill="#1e293b" />
        <rect x={w * 0.12} y={h * 0.37} width={w * 0.17} height={h * 0.04} rx={2} fill="#3b82f6" opacity={0.35} />
        <text x={w * 0.06} y={h * 0.62} fontFamily="ui-monospace, monospace" fontSize={h * 0.06} fill="#64748b" opacity={0.4}>P3</text>
        <rect x={w * 0.12} y={h * 0.57} width={w * 0.25} height={h * 0.04} rx={2} fill="#1e293b" />
        <rect x={w * 0.12} y={h * 0.57} width={w * 0.06} height={h * 0.04} rx={2} fill="#60a5fa" opacity={0.25} />
        {/* # "60" large ghost number. */}
        <text x={w * 0.06} y={h * 0.95} fontFamily="ui-monospace, monospace" fontSize={h * 0.18} fontWeight="bold" fill="#1e3a5f" opacity={0.12}>60:00</text>
      </>
    ),
  },

  // # 6 — "Resonance" — PTE Read Aloud Pronunciation
  // # Sound waves emanating from a mouth/speaker position, with phonetic text.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#2e1065" />
        <ellipse cx={w * 0.2} cy={h * 0.5} rx={w * 0.35} ry={h * 0.9} fill="#4c1d95" opacity={0.4} />
        {/* # Expanding sound arcs from left. */}
        {[0.15, 0.25, 0.35, 0.45, 0.55, 0.65].map((r, i) => (
          <path key={i}
            d={`M${w * 0.15} ${h * (0.5 - r * 0.8)} A${w * r * 0.6} ${h * r * 0.8} 0 0 1 ${w * 0.15} ${h * (0.5 + r * 0.8)}`}
            stroke="#a78bfa" strokeWidth={1.5 - i * 0.15} fill="none" opacity={0.3 - i * 0.035}
          />
        ))}
        {/* # Phonetic transcription fragments. */}
        {[
          { text: '/ˈɪŋ.ɡlɪʃ/', x: 0.45, y: 0.28, size: 0.065, op: 0.2 },
          { text: '/prəˌnʌn.siˈeɪ.ʃən/', x: 0.5, y: 0.52, size: 0.055, op: 0.15 },
          { text: '/ˈfluː.ənt/', x: 0.7, y: 0.38, size: 0.07, op: 0.18 },
          { text: '/streɪs/', x: 0.62, y: 0.72, size: 0.06, op: 0.12 },
          { text: '/ɪnˌtəʊˈneɪʃ/', x: 0.38, y: 0.82, size: 0.05, op: 0.1 },
        ].map(({ text, x, y, size, op }, i) => (
          <text key={i} x={w * x} y={h * y} fontFamily="ui-monospace, monospace" fontSize={h * size} fill="#c4b5fd" opacity={op}>
            {text}
          </text>
        ))}
        {/* # Pitch contour line. */}
        <path
          d={`M${w * 0.35} ${h * 0.6} Q${w * 0.45} ${h * 0.4} ${w * 0.55} ${h * 0.55} T${w * 0.7} ${h * 0.42} T${w * 0.85} ${h * 0.5} T${w * 0.95} ${h * 0.45}`}
          stroke="#8b5cf6" strokeWidth={2} fill="none" opacity={0.35} strokeLinecap="round"
        />
        {/* # Dots on the pitch contour. */}
        {[0.4, 0.55, 0.7, 0.85].map((x, i) => (
          <circle key={i} cx={w * x} cy={h * (0.42 + (i % 2) * 0.12)} r={3} fill="#a78bfa" opacity={0.5} />
        ))}
      </>
    ),
  },

  // # 7 — "Red Pen" — Grammar Mistakes
  // # Crossed-out text with corrections — editorial proofing aesthetic.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#fef2f2" />
        {/* # Paper texture — faint horizontal lines. */}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={w * 0.06} y1={h * 0.1 + i * (h * 0.085)} x2={w * 0.94} y2={h * 0.1 + i * (h * 0.085)} stroke="#fecaca" strokeWidth={0.5} />
        ))}
        {/* # "Typed" text lines. */}
        {[
          { y: 0.12, w: 0.6 }, { y: 0.2, w: 0.5 }, { y: 0.28, w: 0.55 },
          { y: 0.38, w: 0.45 }, { y: 0.46, w: 0.65 }, { y: 0.54, w: 0.4 },
          { y: 0.64, w: 0.5 }, { y: 0.72, w: 0.55 }, { y: 0.8, w: 0.35 },
        ].map((line, i) => (
          <rect key={i} x={w * 0.1} y={h * line.y} width={w * line.w} height={h * 0.025} rx={1} fill="#374151" opacity={0.15} />
        ))}
        {/* # Red strikethrough corrections. */}
        <line x1={w * 0.15} y1={h * 0.215} x2={w * 0.35} y2={h * 0.21} stroke="#dc2626" strokeWidth={1.5} opacity={0.55} />
        <line x1={w * 0.2} y1={h * 0.46} x2={w * 0.42} y2={h * 0.465} stroke="#dc2626" strokeWidth={1.5} opacity={0.55} />
        <line x1={w * 0.1} y1={h * 0.725} x2={w * 0.38} y2={h * 0.72} stroke="#dc2626" strokeWidth={1.5} opacity={0.55} />
        {/* # Red correction carets and annotations. */}
        <text x={w * 0.36} y={h * 0.195} fontFamily="Georgia, serif" fontSize={h * 0.04} fill="#dc2626" opacity={0.6} fontStyle="italic">the</text>
        <text x={w * 0.43} y={h * 0.45} fontFamily="Georgia, serif" fontSize={h * 0.04} fill="#dc2626" opacity={0.6} fontStyle="italic">on</text>
        <text x={w * 0.4} y={h * 0.71} fontFamily="Georgia, serif" fontSize={h * 0.04} fill="#dc2626" opacity={0.6} fontStyle="italic">for</text>
        {/* # Circle around an error. */}
        <ellipse cx={w * 0.52} cy={h * 0.395} rx={w * 0.06} ry={h * 0.05} fill="none" stroke="#dc2626" strokeWidth={1.5} opacity={0.4} />
        {/* # Margin annotation. */}
        <text x={w * 0.78} y={h * 0.3} fontFamily="Georgia, serif" fontSize={h * 0.035} fill="#dc2626" opacity={0.35} fontStyle="italic">Art. missing</text>
        <text x={w * 0.78} y={h * 0.5} fontFamily="Georgia, serif" fontSize={h * 0.035} fill="#dc2626" opacity={0.35} fontStyle="italic">Prep. error</text>
        {/* # Large "12" watermark. */}
        <text x={w * 0.65} y={h * 0.92} fontFamily="Georgia, serif" fontSize={h * 0.35} fontWeight="bold" fill="#fca5a5" opacity={0.08}>12</text>
        {/* # Checkmark in margin. */}
        <path d={`M${w * 0.82} ${h * 0.64} l${w * 0.02} ${h * 0.03} l${w * 0.04} ${-h * 0.05}`} stroke="#16a34a" strokeWidth={2} fill="none" opacity={0.4} />
      </>
    ),
  },

  // # 8 — "Staircase" — CEFR Levels
  // # Ascending steps A1 → C2 with gradient progression.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#171717" />
        {/* # Six ascending steps — one per CEFR level. */}
        {[
          { label: 'A1', color: '#a3e635', x: 0.05, h: 0.12 },
          { label: 'A2', color: '#4ade80', x: 0.2, h: 0.25 },
          { label: 'B1', color: '#2dd4bf', x: 0.35, h: 0.4 },
          { label: 'B2', color: '#38bdf8', x: 0.5, h: 0.55 },
          { label: 'C1', color: '#818cf8', x: 0.65, h: 0.72 },
          { label: 'C2', color: '#c084fc', x: 0.8, h: 0.88 },
        ].map(({ label, color, x, h: stepH }, i) => (
          <g key={i}>
            {/* # Step block. */}
            <rect x={w * x} y={h * (1 - stepH)} width={w * 0.13} height={h * stepH} fill={color} opacity={0.12} />
            <rect x={w * x} y={h * (1 - stepH)} width={w * 0.13} height={h * 0.005} fill={color} opacity={0.5} />
            {/* # Level label. */}
            <text x={w * (x + 0.065)} y={h * (1 - stepH) + h * 0.06} fontFamily="ui-monospace, monospace" fontSize={h * 0.06}
              fill={color} opacity={0.6} textAnchor="middle"
            >{label}</text>
          </g>
        ))}
        {/* # Connecting dotted line ascending. */}
        <path
          d={`M${w * 0.115} ${h * 0.92} L${w * 0.265} ${h * 0.79} L${w * 0.415} ${h * 0.64} L${w * 0.565} ${h * 0.49} L${w * 0.715} ${h * 0.32} L${w * 0.865} ${h * 0.16}`}
          stroke="#525252" strokeWidth={1} fill="none" strokeDasharray="4 4" opacity={0.4}
        />
        {/* # Dots at each level junction. */}
        {[
          [0.115, 0.92], [0.265, 0.79], [0.415, 0.64], [0.565, 0.49], [0.715, 0.32], [0.865, 0.16]
        ].map(([x, y], i) => (
          <circle key={i} cx={w * x!} cy={h * y!} r={3} fill="#d4d4d4" opacity={0.5} />
        ))}
      </>
    ),
  },

  // # 9 — "Pulse" — OET Listening
  // # Headphone silhouette with clinical audio visualization.
  {
    render: (w, h) => (
      <>
        <rect width={w} height={h} fill="#022c22" />
        <rect width={w} height={h} fill="#064e3b" opacity={0.4} />
        {/* # Large abstract headphone arc. */}
        <path
          d={`M${w * 0.3} ${h * 0.75} Q${w * 0.3} ${h * 0.15} ${w * 0.5} ${h * 0.12} Q${w * 0.7} ${h * 0.15} ${w * 0.7} ${h * 0.75}`}
          stroke="#34d399" strokeWidth={3} fill="none" opacity={0.2}
        />
        {/* # Ear cups. */}
        <rect x={w * 0.26} y={h * 0.6} width={w * 0.06} height={h * 0.22} rx={w * 0.03} fill="#059669" opacity={0.15} />
        <rect x={w * 0.68} y={h * 0.6} width={w * 0.06} height={h * 0.22} rx={w * 0.03} fill="#059669" opacity={0.15} />
        {/* # Audio spectrum bars inside headphone space. */}
        {Array.from({ length: 20 }, (_, i) => {
          const barH = [30, 50, 70, 45, 85, 60, 90, 40, 75, 55, 65, 80, 35, 70, 50, 85, 45, 60, 75, 40][i]!
          const x = w * 0.35 + i * (w * 0.015)
          const barPx = (barH / 100) * h * 0.3
          return (
            <rect key={i} x={x} y={h * 0.5 - barPx / 2} width={w * 0.008} height={barPx} rx={1}
              fill="#10b981" opacity={0.25 + (barH / 100) * 0.25}
            />
          )
        })}
        {/* # Clinical notation fragments. */}
        <text x={w * 0.08} y={h * 0.18} fontFamily="ui-monospace, monospace" fontSize={h * 0.04} fill="#6ee7b7" opacity={0.12}>Part A: Consultation</text>
        <text x={w * 0.08} y={h * 0.92} fontFamily="ui-monospace, monospace" fontSize={h * 0.04} fill="#6ee7b7" opacity={0.12}>Part B: Presentation</text>
        {/* # Subtle waveform across bottom. */}
        <path
          d={`M0 ${h * 0.85} Q${w * 0.1} ${h * 0.82} ${w * 0.2} ${h * 0.85} T${w * 0.4} ${h * 0.85} T${w * 0.6} ${h * 0.85} T${w * 0.8} ${h * 0.85} T${w} ${h * 0.85}`}
          stroke="#34d399" strokeWidth={0.7} fill="none" opacity={0.12}
        />
      </>
    ),
  },
]
