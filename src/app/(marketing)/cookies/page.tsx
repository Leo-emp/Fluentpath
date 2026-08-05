// # Cookie policy page — simple disclosure of functional-only cookie usage.
// # Server component, no 'use client' directive.

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — FluentPath',
  description: 'How FluentPath uses cookies.',
}

export default function CookiesPage() {
  return (
    <>
      {/* # Draft banner — remove after legal review */}
      <div className="border-b border-yellow-500 bg-yellow-50 px-6 py-3 text-center text-sm text-yellow-800">
        DRAFT — This document is pending legal review and may change before launch.
      </div>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* # Page title — serif font per design spec */}
        <h1 className="font-serif text-4xl font-bold">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>

        {/* ------------------------------------------------------------------ */}
        {/* # 1. What cookies we use */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">1. What cookies we use</h2>
        <p className="leading-relaxed text-muted-foreground">
          FluentPath uses only functional cookies that are strictly necessary for the
          platform to work. Specifically, we set a single authentication session cookie
          managed by Better Auth. This cookie identifies your logged-in session so you
          can access your account and learning data.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          We do not use:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Analytics cookies</li>
          <li>Advertising or targeting cookies</li>
          <li>Third-party cookies</li>
          <li>Tracking pixels or similar technologies</li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 2. Why this cookie is required */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">2. Why this cookie is required</h2>
        <p className="leading-relaxed text-muted-foreground">
          The session cookie is essential for the login system to function. Without it,
          the platform cannot verify your identity or maintain your session across page
          loads. Because it is strictly necessary for the service to operate, it cannot
          be disabled while using FluentPath.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 3. Future changes */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">3. Future changes</h2>
        <p className="leading-relaxed text-muted-foreground">
          If we introduce analytics or any other non-essential cookies in the future,
          we will update this policy and request your consent before setting those
          cookies. You will always have the option to accept or decline non-essential
          cookies.
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
