// # Cookie policy page — accurate disclosure including analytics consent.
// # Server component, no 'use client' directive.

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — FluentPath',
  description: 'How FluentPath uses cookies.',
}

export default function CookiesPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* # Page title — serif font per design spec */}
        <h1 className="font-serif text-4xl font-bold">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>

        {/* ------------------------------------------------------------------ */}
        {/* # 1. Strictly necessary cookies */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">1. Strictly necessary cookies</h2>
        <p className="leading-relaxed text-muted-foreground">
          FluentPath sets a single authentication session cookie managed by Better Auth.
          This cookie identifies your logged-in session so you can access your account
          and learning data. Because it is strictly necessary for the service to operate,
          it cannot be disabled while using FluentPath.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 2. Analytics cookies (consent required) */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">2. Analytics cookies (consent required)</h2>
        <p className="leading-relaxed text-muted-foreground">
          If you consent, we use PostHog to understand how the platform is used — which
          features are popular, where learners get stuck, and how to improve the
          experience. PostHog may set cookies and use localStorage to track sessions.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Analytics cookies are <strong>only set after you click &ldquo;Accept&rdquo;</strong> on
          the cookie banner. If you decline, no analytics data is collected and no
          analytics cookies are set. You can change your preference at any time by
          clearing your browser storage and revisiting the site.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          We do not use:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Advertising or targeting cookies</li>
          <li>Cross-site tracking pixels</li>
          <li>Third-party cookies beyond PostHog (when consented)</li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 3. Managing your preferences */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">3. Managing your preferences</h2>
        <p className="leading-relaxed text-muted-foreground">
          You can withdraw analytics consent at any time by clearing your browser&apos;s
          localStorage for this site. On your next visit, the cookie banner will appear
          again and you can choose to decline. You can also block cookies entirely via
          your browser settings — the core FluentPath experience will still work, but
          you will need to sign in again on each visit.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 4. Contact */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">4. Contact</h2>
        <p className="leading-relaxed text-muted-foreground">
          If you have questions about our use of cookies, contact us at{' '}
          <a href="mailto:privacy@fluentpath.com" className="underline">
            privacy@fluentpath.com
          </a>.
        </p>
      </main>
    </>
  )
}
