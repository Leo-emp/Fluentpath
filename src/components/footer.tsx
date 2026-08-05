'use client'

// # Shared footer — used on landing page and marketing pages.
// # Contains legal page links and exam trademark disclaimer.

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* # Legal page links */}
        <div className="mb-4 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/cookies" className="hover:underline">Cookies</Link>
        </div>

        {/* # Exam trademark disclaimer — required on every exam-related page */}
        <p className="mb-4 text-center text-xs text-muted-foreground">
          IELTS is a registered trademark of University of Cambridge ESOL, the British Council, and IDP Education.
          PTE Academic is a registered trademark of Pearson Education Ltd.
          OET is a registered trademark of Cambridge Boxhill Language Assessment.
          FluentPath is not affiliated with, endorsed by, or approved by any of these organizations.
        </p>

        {/* # Copyright */}
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2026 FluentPath Ltd
        </p>
      </div>
    </footer>
  )
}
