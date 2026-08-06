// # Pricing page — 4-tier card layout with Paddle checkout overlay.
// # Monochrome palette with green accent for CTA buttons.
// # Server component for the page shell, client component for checkout buttons.

import type { Metadata } from 'next'
import { PricingCards } from './pricing-cards'

export const metadata: Metadata = {
  title: 'Pricing — FluentPath',
  description: 'Choose your FluentPath plan. IELTS, PTE Academic, and OET preparation.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* # Page header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black">
            Choose your plan
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#888]">
            All plans include adaptive placement testing and AI-powered feedback.
            Upgrade or cancel anytime.
          </p>
        </div>

        {/* # Pricing cards — client component for Paddle checkout interaction */}
        <PricingCards />

        {/* # Exam trademark disclaimer */}
        <p className="mt-12 text-center text-xs text-[#888]">
          IELTS is a registered trademark of University of Cambridge ESOL,
          the British Council, and IDP Education Australia. PTE Academic is a
          trademark of Pearson Education Ltd. OET is a trademark of Cambridge
          Boxhill Language Assessment. FluentPath is not affiliated with or
          endorsed by any of these organizations.
        </p>
      </div>
    </main>
  )
}
