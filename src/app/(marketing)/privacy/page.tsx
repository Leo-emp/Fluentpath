// # Privacy policy page — comprehensive UK GDPR + India DPDP compliant notice.
// # Server component, no 'use client' directive.

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — FluentPath',
  description: 'How FluentPath collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* # Page title — serif font per design spec */}
        <h1 className="font-serif text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>

        {/* ------------------------------------------------------------------ */}
        {/* # 1. Who we are */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">1. Who we are</h2>
        <p className="leading-relaxed text-muted-foreground">
          FluentPath Ltd is a company registered in England and Wales. We operate the
          FluentPath English learning and exam preparation platform. When this policy
          says &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;FluentPath&rdquo;, it
          means FluentPath Ltd acting as the data controller for your personal data.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          For any privacy-related questions, contact us at{' '}
          <a href="mailto:privacy@fluentpath.com" className="underline">
            privacy@fluentpath.com
          </a>.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 2. Eligibility */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">2. Eligibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          FluentPath is available to individuals aged 18 and over only. We enforce
          this requirement through a date of birth field at sign-up. We do not
          knowingly collect data from anyone under the age of 18. This also ensures
          compliance with the India Digital Personal Data Protection (DPDP) Act, which
          prohibits profiling of children (defined as anyone under 18).
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 3. Data we collect */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">3. Data we collect</h2>
        <p className="leading-relaxed text-muted-foreground">
          We collect the following personal data when you use our service:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>
            <strong>Account information:</strong> your email address, name, and date
            of birth (collected at sign-up).
          </li>
          <li>
            <strong>Learning progress:</strong> skill graph mastery data, CEFR level
            assessments, placement test results, practice session history, and exam
            score estimates. This data is core to the service we provide.
          </li>
          <li>
            <strong>Voice recordings:</strong> audio captured during speaking
            assessment exercises. These are processed solely for pronunciation and
            fluency evaluation. We never use voice recordings for speaker
            identification or biometric profiling.
          </li>
          <li>
            <strong>Writing submissions:</strong> text you submit for writing practice
            and assessment.
          </li>
          <li>
            <strong>Payment information:</strong> handled entirely by Paddle (our
            merchant of record). We do not store your card details.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 4. Legal basis for processing */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">4. Legal basis for processing</h2>
        <p className="leading-relaxed text-muted-foreground">
          We process your personal data under the following legal bases as defined by
          the UK General Data Protection Regulation (UK GDPR):
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>
            <strong>Consent:</strong> you provide consent when you create your account
            and agree to this privacy policy.
          </li>
          <li>
            <strong>Legitimate interest:</strong> processing necessary to deliver the
            learning service you signed up for, including generating skill assessments
            and tracking your progress.
          </li>
          <li>
            <strong>Legal obligation:</strong> where we are required to retain or
            disclose data to comply with applicable UK law.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 5. Voice data — important distinction */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">5. Voice data</h2>
        <p className="leading-relaxed text-muted-foreground">
          Voice recordings collected during speaking exercises are processed
          exclusively for pronunciation and fluency assessment. We do not use voice
          data for speaker identification or any form of biometric profiling. This
          means voice data is not treated as special-category biometric data under
          GDPR Article 9, because it is not processed for the purpose of uniquely
          identifying a natural person.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Raw audio recordings are deleted according to our retention schedule (see
          Section 9). Transcripts of your speech and derived pronunciation metrics are
          retained separately as part of your learning progress.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 6. How we use your data */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">6. How we use your data</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>To provide and personalise the English learning service.</li>
          <li>To assess your CEFR level and track your skill graph progress.</li>
          <li>To evaluate speaking pronunciation and writing quality.</li>
          <li>To generate estimated exam score ranges for IELTS, PTE, and OET.</li>
          <li>To manage your account and process payments (via Paddle).</li>
          <li>To communicate service-related updates (not marketing).</li>
          <li>To comply with legal obligations.</li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 7. Data processors (third parties) */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">7. Data processors</h2>
        <p className="leading-relaxed text-muted-foreground">
          We share your data with the following third-party processors, each bound by
          data processing agreements:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>
            <strong>Paddle</strong> — payment processing (merchant of record). Handles
            all billing, invoicing, and tax compliance.
          </li>
          <li>
            <strong>Turso</strong> — database hosting. Stores your account and learning
            data.
          </li>
          <li>
            <strong>Vercel</strong> — application hosting and delivery.
          </li>
          <li>
            <strong>ElevenLabs</strong> — text-to-speech generation for listening
            exercises.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 8. International data transfers */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">8. International data transfers</h2>
        <p className="leading-relaxed text-muted-foreground">
          Our application is hosted on Vercel in the Singapore (sin1) region. Your
          data is processed and stored in Singapore. Database hosting is provided by
          Turso. These transfers are governed by appropriate safeguards in accordance
          with UK GDPR requirements.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          We do not offer our service to individuals located in the EU or EEA. Access
          from EU/EEA countries is geo-restricted.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 9. Data retention */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">9. Data retention</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>
            <strong>Account data</strong> (email, name, date of birth): retained for
            as long as your account is active. Deleted upon account deletion request.
          </li>
          <li>
            <strong>Voice audio recordings:</strong> deleted 90 days after capture.
            Transcripts and derived pronunciation metrics are retained as part of your
            learning progress.
          </li>
          <li>
            <strong>Learning progress</strong> (skill graph, CEFR levels, scores):
            retained indefinitely while your account is active. This data is the core
            of the service — it represents the knowledge model that powers your
            personalised learning path.
          </li>
          <li>
            <strong>Writing submissions:</strong> retained while your account is active
            for review and progress tracking purposes.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 10. Your rights */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">10. Your rights</h2>
        <p className="leading-relaxed text-muted-foreground">
          Under UK GDPR, you have the following rights regarding your personal data:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>
            <strong>Access:</strong> request a copy of the personal data we hold about
            you.
          </li>
          <li>
            <strong>Correction:</strong> request correction of inaccurate or incomplete
            data.
          </li>
          <li>
            <strong>Deletion:</strong> request deletion of your personal data (subject
            to any legal obligation to retain it).
          </li>
          <li>
            <strong>Data portability:</strong> receive your data in a structured,
            commonly used, machine-readable format.
          </li>
          <li>
            <strong>Withdraw consent:</strong> withdraw your consent to data processing
            at any time. This does not affect the lawfulness of processing carried out
            before withdrawal.
          </li>
          <li>
            <strong>Complaint:</strong> lodge a complaint with the Information
            Commissioner&apos;s Office (ICO) at{' '}
            <a href="https://ico.org.uk" className="underline">
              ico.org.uk
            </a>.
          </li>
        </ul>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          To exercise any of these rights, email us at{' '}
          <a href="mailto:privacy@fluentpath.com" className="underline">
            privacy@fluentpath.com
          </a>.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 11. India DPDP Act compliance */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">11. India DPDP Act compliance</h2>
        <p className="leading-relaxed text-muted-foreground">
          For users located in India, we comply with the Digital Personal Data
          Protection (DPDP) Act, 2023. This includes:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Providing clear notice of data collection purposes before processing.</li>
          <li>Collecting data only with your informed consent.</li>
          <li>
            Granting you rights to access, correct, and delete your personal data.
          </li>
          <li>
            Notifying you and the relevant Data Protection Board in the event of a
            personal data breach.
          </li>
          <li>
            Prohibiting the collection or profiling of data from children (under 18),
            enforced by our date of birth verification at sign-up.
          </li>
        </ul>

        {/* ------------------------------------------------------------------ */}
        {/* # 12. Changes to this policy */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">12. Changes to this policy</h2>
        <p className="leading-relaxed text-muted-foreground">
          We may update this privacy policy from time to time. If we make material
          changes, we will notify you by email or through a notice on our platform. We
          encourage you to review this page periodically.
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* # 13. Contact */}
        {/* ------------------------------------------------------------------ */}
        <h2 className="mb-3 mt-8 text-xl font-bold">13. Contact</h2>
        <p className="leading-relaxed text-muted-foreground">
          If you have any questions about this privacy policy or how we handle your
          data, contact us at{' '}
          <a href="mailto:privacy@fluentpath.com" className="underline">
            privacy@fluentpath.com
          </a>.
        </p>
      </main>
    </>
  )
}
