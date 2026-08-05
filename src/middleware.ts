import { NextResponse, type NextRequest } from 'next/server'

// # Countries blocked from accessing FluentPath.
// # EU/EEA: blocked due to EU AI Act Annex III 3(b) — FluentPath is high-risk
// # because it evaluates learning outcomes and profiles learners.
// # Sanctions: blocked per UK sanctions obligations.
// # These are LEGAL decisions, not deployment config — hardcoded, not env vars.
const BLOCKED_COUNTRIES = new Set([
  // # EU member states (27)
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // # EEA (non-EU)
  'IS', 'LI', 'NO',
  // # UK-sanctioned jurisdictions
  'RU', 'BY', 'IR', 'KP', 'SY', 'CU',
])

export function middleware(request: NextRequest) {
  // # Vercel provides the visitor's country via this header.
  // # In local dev, this header is absent — don't block.
  const country = request.headers.get('x-vercel-ip-country')

  if (country && BLOCKED_COUNTRIES.has(country)) {
    // # Redirect to the blocked page. Use rewrite (not redirect) so the
    // # user sees /blocked without changing their URL — avoids confusion.
    const blockedUrl = new URL('/blocked', request.url)
    return NextResponse.rewrite(blockedUrl)
  }

  return NextResponse.next()
}

// # Run middleware on all routes EXCEPT:
// # - _next (Next.js internals, static assets)
// # - api/webhooks (Paddle webhooks must always reach us)
// # - blocked (the blocked page itself — avoid redirect loops)
// # - favicon.ico, robots.txt, sitemap.xml
export const config = {
  matcher: [
    '/((?!_next|api/webhooks|blocked|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
}
