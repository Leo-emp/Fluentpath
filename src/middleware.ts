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

// # ─── Security headers applied to every response ──────────────────────
const SECURITY_HEADERS: Record<string, string> = {
  // # Prevent clickjacking — only allow FluentPath to frame itself.
  'X-Frame-Options': 'SAMEORIGIN',
  // # Block MIME type sniffing (stops browsers treating uploads as scripts).
  'X-Content-Type-Options': 'nosniff',
  // # Force HTTPS for 1 year, include subdomains.
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // # Prevent reflected XSS in older browsers.
  'X-XSS-Protection': '1; mode=block',
  // # Only send origin as referrer to external sites.
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // # Restrict what the page can do (no camera, microphone except for speaking assessment).
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(self)',
  // # CSP: allow self, inline styles (Tailwind), PostHog, Gemini, ElevenLabs, Paddle, Vercel.
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://*.posthog.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.posthog.com https://generativelanguage.googleapis.com https://api.elevenlabs.io https://*.paddle.com https://*.turso.io",
    "frame-src 'self' https://*.paddle.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}

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

  // # Apply security headers to every response.
  const response = NextResponse.next()
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value)
  }
  return response
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
