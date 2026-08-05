// # Terms of service page — governs use of FluentPath platform.
// # Server component, no 'use client' directive.

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — FluentPath',
  description: 'Terms and conditions for using FluentPath.',
}

export default function TermsPage() {
  return (
    <>
      {/* # Draft banner — remove after legal review */}
      <div className="border-b border-yellow-500 bg-yellow-50 px-6 py-3 text-center text-sm text-yellow-800">
        DRAFT — This document is pending legal review and may change before launch.
      </div>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* # Page title — serif font per design spec */}
        <h1 className="font-serif text-4xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>

        {/* ------------------------------------------------------------------ */}
        {/* # 1. Service description */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">1. Service description</h2>
        <p className="leading-relaxed text-muted-foreground">
          FluentPath is an English learning and exam preparation platform operated by
          FluentPath Ltd, a company registered in England and Wales. We provide
          diagnostic placement tests, personalised skill graph tracking, guided
          practice across all CEFR levels (A1 to C2), and estimated score ranges for
          IELTS, PTE Academic, and OET examinations.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 2. Eligibility */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">2. Eligibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          You must be at least 18 years old to create an account and use FluentPath.
          We verify this by collecting your date of birth during registration. By
          creating an account, you confirm that you are 18 or older and that the date
          of birth you provide is accurate.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 3. Your account */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">3. Your account</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each individual may hold one account. You must provide accurate and complete
          information when registering. You are responsible for maintaining the
          security of your account credentials and for all activity that occurs under
          your account. Notify us immediately if you suspect unauthorised access.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 4. Subscriptions and payments */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">4. Subscriptions and payments</h2>
        <p className="leading-relaxed text-muted-foreground">
          Paid subscriptions are managed by Paddle, which acts as our merchant of
          record. Paddle handles all billing, invoicing, sales tax, and refunds.
          Subscription pricing, billing cycles, and cancellation terms are displayed at
          the point of purchase and governed by Paddle&apos;s terms at{' '}
          <a href="https://paddle.com/billing" className="underline">
            paddle.com/billing
          </a>.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 5. Score estimates disclaimer */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">5. Score estimates disclaimer</h2>
        <p className="leading-relaxed text-muted-foreground">
          All scores and band estimates provided by FluentPath are approximations
          based on published assessment criteria. FluentPath does not guarantee any
          specific exam result. Estimated ranges are not predictions of actual exam
          performance. Your actual results will depend on the conditions of the
          official examination and other factors beyond our control.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 6. Exam trademarks */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">6. Exam trademarks</h2>
        <p className="leading-relaxed text-muted-foreground">
          IELTS is a registered trademark of University of Cambridge ESOL, British
          Council, and IDP Education Australia. PTE Academic is a registered trademark
          of Pearson Education Ltd. OET is a registered trademark of Cambridge Boxhill
          Language Assessment. FluentPath is not affiliated with, endorsed by, or
          approved by any of these organisations.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 7. Content ownership */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">7. Content ownership</h2>
        <p className="leading-relaxed text-muted-foreground">
          All original content on FluentPath — including lesson material, assessments,
          scoring algorithms, and platform design — is the property of FluentPath Ltd
          and is protected by copyright and intellectual property laws.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          User-generated content, including writing submissions and voice recordings,
          remains your property. By submitting this content, you grant FluentPath Ltd
          a non-exclusive, worldwide, royalty-free licence to process, analyse, and
          store it solely for the purpose of delivering the learning service to you.
          This licence ends when you delete your account.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 8. Prohibited use */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">8. Prohibited use</h2>
        <p className="leading-relaxed text-muted-foreground">
          When using FluentPath, you agree not to:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Share your account credentials with any other person.</li>
          <li>
            Use automated tools, bots, scrapers, or scripts to access the platform.
          </li>
          <li>
            Reverse engineer, decompile, or attempt to extract our scoring algorithms
            or assessment logic.
          </li>
          <li>
            Misrepresent your identity or provide false information during
            registration.
          </li>
          <li>
            Use the service for any purpose that is unlawful or prohibited by these
            terms.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 9. Termination */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">9. Termination</h2>
        <p className="leading-relaxed text-muted-foreground">
          You may close your account at any time. FluentPath may suspend or terminate
          your account if you breach these terms. Upon termination, your right to use
          the service ceases immediately. You may request deletion of your personal
          data in accordance with our{' '}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 10. Limitation of liability */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">10. Limitation of liability</h2>
        <p className="leading-relaxed text-muted-foreground">
          To the maximum extent permitted by the laws of England and Wales, FluentPath
          Ltd shall not be liable for any indirect, incidental, special, consequential,
          or punitive damages arising from your use of the service. Our total liability
          to you for any claim arising from or related to these terms shall not exceed
          the amount you paid to us in the twelve months preceding the claim.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Nothing in these terms excludes or limits our liability for death or personal
          injury caused by negligence, fraud, or any other liability that cannot be
          excluded or limited under applicable law.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 11. Changes to these terms */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">11. Changes to these terms</h2>
        <p className="leading-relaxed text-muted-foreground">
          We may update these terms from time to time. If we make material changes, we
          will notify you by email or through a notice on our platform. Your continued
          use of FluentPath after the changes take effect constitutes acceptance of the
          revised terms.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 12. Governing law */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">12. Governing law</h2>
        <p className="leading-relaxed text-muted-foreground">
          These terms are governed by and construed in accordance with the laws of
          England and Wales. Any dispute arising from these terms or your use of
          FluentPath shall be subject to the exclusive jurisdiction of the courts of
          England and Wales.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 13. Contact */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">13. Contact</h2>
        <p className="leading-relaxed text-muted-foreground">
          If you have any questions about these terms, contact us at{' '}
          <a href="mailto:privacy@fluentpath.com" className="underline">
            privacy@fluentpath.com
          </a>.
        </p>
      </main>
    </>
  )
}
