import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* # Hero section — large serif heading + CTAs */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold leading-tight sm:text-7xl">
          Master English.
          <br />
          Precisely.
        </h1>
        <p className="mb-10 max-w-md text-lg text-muted-foreground">
          Adaptive placement, targeted practice, and full IELTS mock tests
          — all in one platform.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-up"
            className="rounded-lg bg-foreground px-8 py-3 text-lg font-medium text-background hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="text-lg text-muted-foreground underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* # Feature cards — three value props */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {[
            { title: 'Adaptive Placement', desc: 'Find your CEFR level in under 5 minutes.' },
            { title: 'Targeted Practice', desc: 'Exercises matched to your weakest areas.' },
            { title: 'IELTS Mock Tests', desc: 'Full-length timed exams with band scores.' },
          ].map((card) => (
            <div key={card.title} className="rounded-lg border border-border p-6">
              <h3 className="mb-2 font-serif text-xl font-bold">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* # Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        &copy; 2026 FluentPath
      </footer>
    </main>
  )
}
