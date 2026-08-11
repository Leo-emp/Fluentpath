import Link from 'next/link'
import { Footer } from '@/components/footer'

// # ═══════════════════════════════════════════════════════════════════
// # LANDING PAGE — conversion-focused, premium monochrome design.
// # White background, black text, clean typography.
// # Sections: Hero → Trust → How It Works → Features → AI → Exams →
// #           Stats → Pricing Preview → FAQ → Final CTA → Footer
// # ═══════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* # ─── NAV BAR ─── */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-serif text-2xl font-bold tracking-tight">FluentPath</span>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-neutral-500 hover:text-black transition-colors">
            Pricing
          </Link>
          <Link href="/sign-in" className="text-sm text-neutral-500 hover:text-black transition-colors">
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* # ─── HERO ─── */}
      {/* # Large serif headline, clear value prop, dual CTAs. */}
      <section className="px-6 pb-24 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          {/* # Pill badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs text-neutral-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            AI-powered English exam preparation
          </div>

          <h1 className="mb-6 font-serif text-6xl font-bold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
            Master English.
            <br />
            <span className="text-neutral-400">Precisely.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-neutral-500">
            Adaptive placement, AI-powered feedback, and full-length mock tests for
            IELTS, PTE Academic, and OET — all in one platform.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sign-up"
              className="w-full rounded-lg bg-black px-10 py-4 text-base font-medium text-white hover:bg-neutral-800 transition-colors sm:w-auto"
            >
              Start Free Placement Test
            </Link>
            <Link
              href="/pricing"
              className="w-full rounded-lg border border-neutral-200 px-10 py-4 text-base font-medium text-black hover:bg-neutral-50 transition-colors sm:w-auto"
            >
              View Plans
            </Link>
          </div>

          <p className="mt-4 text-xs text-neutral-400">
            No credit card required. 5-minute placement test included free.
          </p>
        </div>
      </section>

      {/* # ─── TRUST BAR ─── */}
      {/* # Exam names + key stats in a clean horizontal strip. */}
      <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-sm text-neutral-500 sm:gap-16">
          <div className="text-center">
            <p className="text-2xl font-bold text-black">IELTS</p>
            <p>Academic &amp; General</p>
          </div>
          <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-black">PTE</p>
            <p>Academic</p>
          </div>
          <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-black">OET</p>
            <p>Healthcare English</p>
          </div>
          <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-black">A1–C2</p>
            <p>All CEFR Levels</p>
          </div>
        </div>
      </section>

      {/* # ─── HOW IT WORKS ─── */}
      {/* # Three numbered steps — simple, scannable. */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-neutral-400">
            How It Works
          </p>
          <h2 className="mb-16 text-center font-serif text-4xl font-bold sm:text-5xl">
            Three steps to your target score
          </h2>

          <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Take the Placement Test',
                desc: 'Our adaptive algorithm pinpoints your exact CEFR level across reading, writing, listening, and speaking in under 5 minutes.',
              },
              {
                step: '02',
                title: 'Practice Your Weak Areas',
                desc: 'AI-generated exercises target your specific skill gaps. Spaced repetition ensures you retain what you learn.',
              },
              {
                step: '03',
                title: 'Simulate the Real Exam',
                desc: 'Full-length timed mock tests with scoring that mirrors real exam rubrics. Get your predicted band score instantly.',
              },
            ].map((item) => (
              <div key={item.step}>
                <p className="mb-4 font-serif text-5xl font-bold text-neutral-200">{item.step}</p>
                <h3 className="mb-3 text-lg font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* # ─── FEATURES GRID ─── */}
      {/* # Six core features in a 2×3 grid with icons as large text symbols. */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-neutral-400">
            Features
          </p>
          <h2 className="mb-16 text-center font-serif text-4xl font-bold sm:text-5xl">
            Everything you need to succeed
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '◎',
                title: 'Adaptive Placement',
                desc: 'Computer-adaptive algorithm maps your CEFR level across all four skills. Adjusts difficulty in real time.',
              },
              {
                icon: '≡',
                title: '12 Exercise Types',
                desc: 'MCQ, gap-fill, reading passages, writing tasks, speaking prompts, reorder, error correction, and more.',
              },
              {
                icon: '∴',
                title: 'Skill Graph Engine',
                desc: '73-node CEFR skill graph with prerequisites. Mastery tracking ensures systematic, gap-free progress.',
              },
              {
                icon: '▒',
                title: 'AI Writing Feedback',
                desc: 'Submit essays and get scored using publicly available IELTS band descriptors. Task Achievement, Coherence, Lexical Resource, Grammar.',
              },
              {
                icon: '◔',
                title: 'AI Speaking Assessment',
                desc: 'Record your response, get scored on Fluency, Lexical Resource, Grammar, and Pronunciation with specific feedback.',
              },
              {
                icon: '█',
                title: 'Predicted Band Score',
                desc: 'Your mastery data maps to a predicted IELTS band. Track your trajectory toward your target score.',
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-neutral-200 bg-white p-8">
                <p className="mb-4 text-3xl text-neutral-300">{f.icon}</p>
                <h3 className="mb-2 text-base font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* # ─── AI-POWERED SECTION ─── */}
      {/* # Detailed breakdown of AI writing + speaking assessment. */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-neutral-400">
            AI-Powered
          </p>
          <h2 className="mb-6 text-center font-serif text-4xl font-bold sm:text-5xl">
            Feedback that actually helps
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-neutral-500">
            Our AI doesn&apos;t just score you — it tells you exactly what to fix and how to improve.
            Modelled on publicly available exam band descriptors so feedback mirrors what real examiners look for.
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* # Writing assessment card */}
            <div className="rounded-xl border border-neutral-200 p-8">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-neutral-400">Writing</p>
              <h3 className="mb-4 text-xl font-bold">Essay Assessment</h3>
              <div className="mb-6 space-y-3">
                {[
                  { label: 'Task Achievement', score: '7.0' },
                  { label: 'Coherence & Cohesion', score: '6.5' },
                  { label: 'Lexical Resource', score: '7.0' },
                  { label: 'Grammatical Range', score: '6.0' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">{c.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-black"
                          style={{ width: `${(parseFloat(c.score) / 9) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-sm font-bold">{c.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-500">
                Corrected essay, top 3 action items, and specific examples from your text.
              </p>
            </div>

            {/* # Speaking assessment card */}
            <div className="rounded-xl border border-neutral-200 p-8">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-neutral-400">Speaking</p>
              <h3 className="mb-4 text-xl font-bold">Voice Assessment</h3>
              <div className="mb-6 space-y-3">
                {[
                  { label: 'Fluency & Coherence', score: '7.0' },
                  { label: 'Lexical Resource', score: '6.5' },
                  { label: 'Grammatical Range', score: '6.5' },
                  { label: 'Pronunciation', score: '7.0' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">{c.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-black"
                          style={{ width: `${(parseFloat(c.score) / 9) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-sm font-bold">{c.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-neutral-500">
                Full transcript, pronunciation issues flagged, and a model answer for comparison.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* # ─── EXAM COVERAGE ─── */}
      {/* # Three exam cards with section breakdowns. */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-neutral-400">
            Exam Preparation
          </p>
          <h2 className="mb-16 text-center font-serif text-4xl font-bold sm:text-5xl">
            Full mock tests, real scoring
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* # IELTS */}
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <h3 className="mb-1 font-serif text-2xl font-bold">IELTS</h3>
              <p className="mb-6 text-sm text-neutral-500">Academic &amp; General Training</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Listening — 40 questions, 30 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Reading — 40 questions, 60 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Writing — 2 tasks, 60 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Speaking — 3 parts, 11–14 minutes</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-neutral-400">Band 1–9 scoring with 0.5 increments</p>
            </div>

            {/* # PTE Academic */}
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <h3 className="mb-1 font-serif text-2xl font-bold">PTE Academic</h3>
              <p className="mb-6 text-sm text-neutral-500">Pearson Test of English</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Speaking &amp; Writing — 54–67 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Reading — 29–30 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Listening — 30–43 minutes</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-neutral-400">10–90 scale across 4 communicative skills</p>
            </div>

            {/* # OET */}
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <h3 className="mb-1 font-serif text-2xl font-bold">OET</h3>
              <p className="mb-6 text-sm text-neutral-500">Occupational English Test</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Listening — 50 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Reading — 60 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Writing — referral letter, 45 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>Speaking — 2 role-plays, 20 minutes</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-neutral-400">Grade A–E per sub-test, B required to pass</p>
            </div>
          </div>
        </div>
      </section>

      {/* # ─── GAMIFICATION + PROGRESS ─── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neutral-400">
                Stay Motivated
              </p>
              <h2 className="mb-6 font-serif text-4xl font-bold">
                Track every step of your progress
              </h2>
              <p className="mb-8 text-neutral-500">
                Daily streaks, XP rewards, and 26 achievement badges keep you consistent.
                Your personalized dashboard shows exactly where you stand — and where you need to go.
              </p>
              <ul className="space-y-4">
                {[
                  'Daily streak tracking with bonus XP multipliers',
                  'Activity heatmap showing your study consistency',
                  'Per-skill progress bars (reading, writing, listening, speaking)',
                  'Predicted IELTS band score updated after every session',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 block h-1 w-4 shrink-0 bg-black" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* # Mock dashboard preview — static visual */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Current Streak</p>
                  <p className="text-3xl font-bold">14 days</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Total XP</p>
                  <p className="text-3xl font-bold">2,430</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Predicted</p>
                  <p className="text-3xl font-bold">7.0</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Reading', pct: 78 },
                  { label: 'Writing', pct: 62 },
                  { label: 'Listening', pct: 85 },
                  { label: 'Speaking', pct: 55 },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-neutral-600">{s.label}</span>
                      <span className="font-bold">{s.pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                      <div className="h-full rounded-full bg-black" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* # ─── STATS BAR ─── */}
      <section className="border-y border-neutral-100 bg-black px-6 py-16 text-white">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: '1,000+', label: 'Practice Items' },
            { value: '987', label: 'Structured Lessons' },
            { value: '73', label: 'Skill Nodes' },
            { value: '12', label: 'Exercise Types' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-4xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* # ─── WHY FLUENTPATH ─── */}
      {/* # Competitive differentiators — why us over alternatives. */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-neutral-400">
            Why FluentPath
          </p>
          <h2 className="mb-16 text-center font-serif text-4xl font-bold sm:text-5xl">
            What makes us different
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: '3 exams, 1 platform',
                desc: 'IELTS, PTE Academic, and OET preparation in a single subscription. No switching between apps.',
              },
              {
                title: 'AI, not generic tips',
                desc: 'Every piece of feedback is specific to YOUR essay, YOUR recording, YOUR skill gaps. Not pre-written templates.',
              },
              {
                title: 'Adaptive, not linear',
                desc: 'Our 73-node skill graph finds your weaknesses and drills them. No wasting time on skills you already have.',
              },
              {
                title: 'A1 to C2 coverage',
                desc: 'Most exam prep starts at B1. We cover beginners to advanced — start wherever you are and grow to exam readiness.',
              },
              {
                title: 'Fraction of tutor cost',
                desc: 'Private IELTS tutors charge $50-100/hour. Get unlimited AI feedback for $49/month — that pays for itself in one session.',
              },
              {
                title: '7-day guarantee',
                desc: 'Not satisfied within the first week? Full refund, no questions asked. We only win when you improve.',
              },
            ].map((d) => (
              <div key={d.title} className="rounded-xl border border-neutral-200 p-6">
                <h3 className="mb-2 text-base font-bold">{d.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* # ─── PRICING PREVIEW ─── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-neutral-400">
            Pricing
          </p>
          <h2 className="mb-6 text-center font-serif text-4xl font-bold sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-neutral-500">
            Start with a free placement test. Upgrade when you&apos;re ready to commit to your target score.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Learner', price: '$19', period: '/mo', desc: 'A1–C2 general English ladder', features: ['Adaptive practice', 'Progress tracking', 'Skill graph', 'Gamification'] },
              { name: 'Exam', price: '$49', period: '/mo', desc: 'IELTS & PTE preparation', features: ['Everything in Learner', 'Full mock tests', 'AI writing feedback', 'AI speaking assessment'], featured: true },
              { name: 'Complete', price: '$55', period: '/mo', desc: 'Learner + all exams', features: ['Everything in Exam', 'General English', 'All exercises', 'Best value'] },
              { name: 'OET', price: '$79', period: '/mo', desc: 'Healthcare professionals', features: ['OET mock tests', 'Clinical role-plays', 'Referral letters', 'Medical vocabulary'] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.featured
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-200 bg-white'
                }`}
              >
                <p className="mb-1 text-sm font-medium">{plan.name}</p>
                <p className="mb-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.featured ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {plan.period}
                  </span>
                </p>
                <p className={`mb-6 text-xs ${plan.featured ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className={`block h-1 w-3 ${plan.featured ? 'bg-white' : 'bg-black'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-black underline underline-offset-4 hover:text-neutral-600"
            >
              View full pricing details
            </Link>
          </div>
        </div>
      </section>

      {/* # ─── FAQ ─── */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-16 text-center font-serif text-4xl font-bold">
            Frequently asked questions
          </h2>

          <div className="divide-y divide-neutral-200">
            {[
              {
                q: 'How accurate are the predicted band scores?',
                a: 'Our prediction uses your mastery data across all skill graph nodes, mapped to IELTS band descriptors. While no prediction is perfect, our algorithm accounts for per-skill performance and uses the same criteria real examiners use.',
              },
              {
                q: 'Is the placement test really free?',
                a: 'Yes. The 5-minute adaptive placement test is completely free, with no credit card required. You also get one full mock test with your band score included.',
              },
              {
                q: 'How does the AI writing and speaking feedback work?',
                a: 'Your essays are scored using publicly available IELTS band descriptors (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy). Speaking recordings are assessed for Fluency, Vocabulary, Grammar, and Pronunciation. You get scores, specific feedback, and a corrected version.',
              },
              {
                q: 'What makes FluentPath different from other test prep platforms?',
                a: 'Most platforms give you practice questions and generic feedback. FluentPath uses a 73-node CEFR skill graph to map your exact weaknesses, then generates exercises that target those specific gaps. Every session makes you measurably better at the skills you need most.',
              },
              {
                q: 'Can I prepare for PTE and OET too, not just IELTS?',
                a: 'Yes. We offer full mock tests for IELTS Academic, IELTS General Training, PTE Academic, and OET. Each exam uses its own exam-style scoring system — bands for IELTS, 10–90 for PTE, and A–E grades for OET.',
              },
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes. All plans are month-to-month with no long-term commitment. Cancel anytime from your account settings and you keep access until the end of your billing period.',
              },
            ].map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  {item.q}
                  <span className="ml-4 shrink-0 text-neutral-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* # ─── EMAIL CAPTURE ─── */}
      {/* # For visitors not ready to sign up — capture email for follow-up. */}
      <section className="border-t border-neutral-100 bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Not ready yet? Get free tips.
          </h2>
          <p className="mb-8 text-neutral-500">
            Weekly IELTS strategies, PTE tricks, and English improvement tips.
            No spam — unsubscribe anytime.
          </p>
          <form
            action="/api/subscribe"
            method="POST"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Send me tips
            </button>
          </form>
          <p className="mt-3 text-xs text-neutral-400">
            Join 0 learners. We respect your inbox.
          </p>
        </div>
      </section>

      {/* # ─── FINAL CTA ─── */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 font-serif text-4xl font-bold sm:text-5xl">
            Start improving today
          </h2>
          <p className="mb-10 text-lg text-neutral-500">
            Take the free placement test, discover your level, and get a personalized study plan
            — all in under 5 minutes.
          </p>
          <Link
            href="/sign-up"
            className="inline-block rounded-lg bg-black px-12 py-4 text-base font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Get Started Free
          </Link>
          <p className="mt-4 text-xs text-neutral-400">
            Free forever for basic features. No credit card required.
          </p>
        </div>
      </section>

      {/* # ─── FOOTER ─── */}
      <Footer />
    </main>
  )
}
