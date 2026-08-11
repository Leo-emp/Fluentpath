// # Pricing page — comparison table, annual toggle, FAQ, guarantee.

import type { Metadata } from 'next'
import { PricingCards } from './pricing-cards'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Choose your FluentPath plan. IELTS, PTE Academic, and OET preparation from $19/month.',
}

// # Feature comparison data.
const FEATURES = [
  { name: 'Free placement test', free: true, learner: true, exam: true, complete: true },
  { name: 'CEFR level assessment', free: true, learner: true, exam: true, complete: true },
  { name: 'Adaptive practice', free: '10/day', learner: 'Unlimited', exam: 'Unlimited', complete: 'Unlimited' },
  { name: '987 structured lessons', free: true, learner: true, exam: true, complete: true },
  { name: 'Skill graph engine (73 nodes)', free: false, learner: true, exam: true, complete: true },
  { name: 'Progress tracking & streaks', free: false, learner: true, exam: true, complete: true },
  { name: 'Gamification & leaderboard', free: false, learner: true, exam: true, complete: true },
  { name: 'IELTS mock tests', free: '1 test', learner: false, exam: 'Unlimited', complete: 'Unlimited' },
  { name: 'PTE Academic mock tests', free: false, learner: false, exam: 'Unlimited', complete: 'Unlimited' },
  { name: 'AI writing feedback', free: false, learner: false, exam: true, complete: true },
  { name: 'AI speaking assessment', free: false, learner: false, exam: true, complete: true },
  { name: 'Score diagnosis & gap analysis', free: false, learner: false, exam: true, complete: true },
  { name: 'OET mock tests', free: false, learner: false, exam: false, complete: true },
  { name: 'TTS pronunciation practice', free: false, learner: false, exam: false, complete: true },
  { name: 'Priority support', free: false, learner: false, exam: false, complete: true },
]

function Check() {
  return <span className="text-[#22c55e] font-bold">&#10003;</span>
}

function Cross() {
  return <span className="text-neutral-300">&#8212;</span>
}

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <Check />
  if (val === false) return <Cross />
  return <span className="text-sm font-medium text-black">{val}</span>
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* # Page header */}
        <div className="mb-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#888]">
            Start free. Upgrade when you need AI feedback and full mock tests.
            All plans are month-to-month — cancel anytime.
          </p>
        </div>

        {/* # Money-back guarantee */}
        <p className="mb-12 text-center text-sm font-medium text-[#22c55e]">
          7-day money-back guarantee on all paid plans
        </p>

        {/* # Pricing cards */}
        <PricingCards />

        {/* # Feature comparison table */}
        <section className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-black">
            Compare plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left">
                  <th className="py-4 pr-4 font-medium text-neutral-500">Feature</th>
                  <th className="px-4 py-4 text-center font-medium text-neutral-500">Free</th>
                  <th className="px-4 py-4 text-center font-medium text-neutral-500">Learner<br/><span className="text-xs font-normal">$19/mo</span></th>
                  <th className="px-4 py-4 text-center font-medium text-neutral-500">Exam Prep<br/><span className="text-xs font-normal">$49/mo</span></th>
                  <th className="px-4 py-4 text-center font-bold text-black">Complete<br/><span className="text-xs font-normal">$55/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map(f => (
                  <tr key={f.name} className="border-b border-neutral-100">
                    <td className="py-3.5 pr-4 text-neutral-700">{f.name}</td>
                    <td className="px-4 py-3.5 text-center"><CellValue val={f.free} /></td>
                    <td className="px-4 py-3.5 text-center"><CellValue val={f.learner} /></td>
                    <td className="px-4 py-3.5 text-center"><CellValue val={f.exam} /></td>
                    <td className="px-4 py-3.5 text-center bg-neutral-50"><CellValue val={f.complete} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* # FAQ */}
        <section className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-black">
            Pricing FAQ
          </h2>
          <div className="mx-auto max-w-3xl divide-y divide-neutral-200">
            {[
              {
                q: 'What happens when my free practice limit runs out?',
                a: 'Free accounts get 10 practice items per day and one full mock test. Once you hit the limit, you\'ll see an upgrade prompt. Your progress and scores are saved — upgrade anytime to continue.',
              },
              {
                q: 'Can I switch plans mid-subscription?',
                a: 'Yes. Upgrade or downgrade at any time. When you upgrade, you get immediate access to new features. When you downgrade, your current plan continues until the end of the billing period.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'All paid plans come with a 7-day money-back guarantee. If you\'re not satisfied within the first 7 days, contact us for a full refund — no questions asked.',
              },
              {
                q: 'Do I need to pay for each exam separately?',
                a: 'No. The Exam Prep plan includes both IELTS and PTE Academic. The Complete plan adds OET on top. You don\'t pay per exam.',
              },
              {
                q: 'Can I use FluentPath for general English, not just exams?',
                a: 'Absolutely. The Learner plan ($19/mo) is designed for general English improvement — A1 to C2, no exam focus. It includes 987 structured lessons, grammar, vocabulary, and adaptive practice.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay through our payment provider Paddle. Paddle handles all taxes and currency conversion.',
              },
            ].map(item => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-black">
                  {item.q}
                  <span className="ml-4 shrink-0 text-neutral-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* # Exam trademark disclaimer */}
        <p className="mt-16 text-center text-xs text-[#888]">
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
