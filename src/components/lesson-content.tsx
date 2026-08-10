'use client'

// # Rich content formatter for lesson sections.
// # Transforms plain text from lesson data into structured, readable HTML.
// #
// # Detects patterns in content text:
// #   ALL CAPS LINE:     → sub-heading separator
// #   term — explanation → definition pair with visual alignment
// #   WRONG: text        → red error highlight
// #   CORRECT: text      → green correct highlight
// #   (a) text           → lettered list with styled bullets
// #   1. text            → numbered list
// #   "quoted text"      → styled quotation
// #   blank line         → paragraph separator

import { type ReactNode } from 'react'

// # ─── Line classification ───────────────────────────────────────────────

type LineKind =
  | 'heading'       // # ALL CAPS LINE:
  | 'definition'    // # term — explanation
  | 'wrong'         // # WRONG: ...
  | 'correct'       // # CORRECT: ...
  | 'letter'        // # (a) ...
  | 'numbered'      // # 1. ...
  | 'quote'         // # "quoted text..."
  | 'blank'         // # empty line
  | 'text'          // # everything else

function classifyLine(raw: string): LineKind {
  const t = raw.trim()
  if (!t) return 'blank'
  // # ALL CAPS with colon at end — "GREETINGS:", "POLITE WORDS:", "FORMAL/LEGAL:"
  if (/^[A-Z][A-Z\s&\/\(\),\-:.']+:$/.test(t) && t.length < 60) return 'heading'
  // # WRONG: or "✗ " prefix
  if (/^(WRONG|✗\s)/i.test(t)) return 'wrong'
  // # CORRECT: or "✓ " prefix
  if (/^(CORRECT|✓\s)/i.test(t)) return 'correct'
  // # (a) (b) (c) lettered items
  if (/^\([a-z]\)\s/.test(t)) return 'letter'
  // # 1. or 1) numbered items
  if (/^\d+[.)]\s/.test(t)) return 'numbered'
  // # Starts with opening quote
  if (/^[""“]/.test(t) && t.length < 200) return 'quote'
  // # Contains " — " with a short term before it (definition pattern)
  if (/ — /.test(t) && t.indexOf(' — ') < 50 && !t.startsWith('"')) return 'definition'
  return 'text'
}

// # ─── Inline text formatting ────────────────────────────────────────────

// # Highlight quoted phrases and key markers within text.
function renderInline(text: string): ReactNode {
  // # Split on quoted phrases to style them
  const parts = text.split(/("(?:[^"\\]|\\.)*?"|".*?"|".*?")/g)
  if (parts.length <= 1) return text

  return (
    <>
      {parts.map((part, i) => {
        if (/^[""“]/.test(part) && /[""”]$/.test(part)) {
          return <span key={i} className="font-medium italic text-primary/80">{part}</span>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

// # ─── Main component ────────────────────────────────────────────────────

interface LessonContentProps {
  // # The raw content string from lesson data.
  content: string
  // # Optional: darker text for tip/rule boxes where bg is already colored.
  className?: string
}

export function LessonContent({ content, className }: LessonContentProps) {
  const lines = content.split('\n')
  const elements: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]!
    const kind = classifyLine(line)

    switch (kind) {
      // # ─── Blank line → vertical spacer ───
      case 'blank':
        elements.push(<div key={`b-${i}`} className="h-2" />)
        i++
        break

      // # ─── ALL CAPS HEADING → small uppercase separator ───
      case 'heading': {
        const text = line.trim().replace(/:$/, '')
        elements.push(
          <div key={`h-${i}`} className="mt-4 first:mt-0">
            <h4 className="mb-1 text-[11px] font-bold uppercase tracking-widest text-foreground/50">
              {text}
            </h4>
            <div className="mb-2 h-px bg-foreground/10" />
          </div>
        )
        i++
        break
      }

      // # ─── Definition pairs (term — explanation) → aligned layout ───
      case 'definition': {
        const defs: string[] = []
        while (i < lines.length && classifyLine(lines[i]!) === 'definition') {
          defs.push(lines[i]!.trim())
          i++
        }
        elements.push(
          <div key={`d-${i}`} className="space-y-1">
            {defs.map((d, j) => {
              const dashIdx = d.indexOf(' — ')
              const term = d.slice(0, dashIdx)
              const def = d.slice(dashIdx + 3)
              return (
                <div key={j} className="grid grid-cols-[auto_1fr] gap-x-3 items-baseline">
                  <span className="font-semibold text-foreground whitespace-nowrap">{term}</span>
                  <span className="text-foreground/70">{renderInline(def)}</span>
                </div>
              )
            })}
          </div>
        )
        break
      }

      // # ─── WRONG: → red error row ───
      case 'wrong': {
        const text = line.trim().replace(/^(WRONG:\s*|✗\s*)/, '')
        elements.push(
          <div key={`w-${i}`} className="flex items-start gap-2 rounded-md bg-red-50 px-3 py-1.5 dark:bg-red-950/20">
            <span className="mt-0.5 shrink-0 text-red-500">✗</span>
            <span className="text-red-800 dark:text-red-300">{renderInline(text)}</span>
          </div>
        )
        i++
        break
      }

      // # ─── CORRECT: → green correct row ───
      case 'correct': {
        const text = line.trim().replace(/^(CORRECT:\s*|✓\s*)/, '')
        elements.push(
          <div key={`c-${i}`} className="flex items-start gap-2 rounded-md bg-green-50 px-3 py-1.5 dark:bg-green-950/20">
            <span className="mt-0.5 shrink-0 text-green-600">✓</span>
            <span className="text-green-800 dark:text-green-300">{renderInline(text)}</span>
          </div>
        )
        i++
        break
      }

      // # ─── (a) (b) (c) → lettered list with styled badges ───
      case 'letter': {
        const items: string[] = []
        while (i < lines.length && classifyLine(lines[i]!) === 'letter') {
          items.push(lines[i]!.trim())
          i++
        }
        elements.push(
          <div key={`l-${i}`} className="space-y-2 pl-1">
            {items.map((item, j) => {
              const letter = item.match(/^\(([a-z])\)/)?.[1] ?? ''
              const text = item.replace(/^\([a-z]\)\s*/, '')
              return (
                <div key={j} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {letter}
                  </span>
                  <span className="leading-relaxed">{renderInline(text)}</span>
                </div>
              )
            })}
          </div>
        )
        break
      }

      // # ─── 1. 2. 3. → numbered list with styled badges ───
      case 'numbered': {
        const items: string[] = []
        while (i < lines.length && classifyLine(lines[i]!) === 'numbered') {
          items.push(lines[i]!.trim())
          i++
        }
        elements.push(
          <div key={`n-${i}`} className="space-y-2 pl-1">
            {items.map((item, j) => {
              const num = item.match(/^(\d+)/)?.[1] ?? ''
              const text = item.replace(/^\d+[.)]\s*/, '')
              return (
                <div key={j} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {num}
                  </span>
                  <span className="leading-relaxed">{renderInline(text)}</span>
                </div>
              )
            })}
          </div>
        )
        break
      }

      // # ─── "Quoted text" → styled quote block ───
      case 'quote':
        elements.push(
          <p key={`q-${i}`} className="border-l-2 border-primary/30 pl-3 text-foreground/80 italic">
            {line.trim()}
          </p>
        )
        i++
        break

      // # ─── Default text → paragraph ───
      default:
        elements.push(
          <p key={`t-${i}`} className="leading-relaxed">{renderInline(line.trim())}</p>
        )
        i++
        break
    }
  }

  return <div className={`space-y-1.5 text-sm ${className ?? ''}`}>{elements}</div>
}
