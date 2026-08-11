// # Blog listing page — displays all articles sorted by date.
// # Each card links to /blog/[slug]. Targets high-volume SEO keywords.

import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_ARTICLES } from '@/lib/reference/blog-articles'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert tips and strategies for IELTS, PTE Academic, OET, and English learning — from AI-powered practice to exam-day tactics.',
}

// # Category badge colours — muted, professional palette.
const CATEGORY_COLOURS: Record<string, string> = {
  ielts: 'bg-blue-50 text-blue-700',
  pte: 'bg-purple-50 text-purple-700',
  oet: 'bg-green-50 text-green-700',
  english: 'bg-amber-50 text-amber-700',
  'study-tips': 'bg-neutral-100 text-neutral-600',
}

export default function BlogPage() {
  // # Sort newest first.
  const articles = [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <main className="min-h-screen bg-white text-black">
      {/* # ─── NAV BAR ─── */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">FluentPath</Link>
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

      {/* # ─── HEADER ─── */}
      <section className="px-6 pb-12 pt-16 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight">Blog</h1>
        <p className="mx-auto max-w-xl text-lg text-neutral-500">
          Expert strategies, study tips, and exam insights to help you
          reach your target score faster.
        </p>
      </section>

      {/* # ─── ARTICLE GRID ─── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-400 hover:shadow-lg"
            >
              {/* # Category badge + reading time */}
              <div className="mb-4 flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLOURS[article.category] || 'bg-neutral-100 text-neutral-600'}`}>
                  {article.category.toUpperCase()}
                </span>
                <span className="text-xs text-neutral-400">{article.readingTime} min read</span>
              </div>

              {/* # Title */}
              <h2 className="mb-2 text-lg font-semibold leading-snug group-hover:text-neutral-600 transition-colors">
                {article.title}
              </h2>

              {/* # Description */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-500">
                {article.description}
              </p>

              {/* # Date */}
              <time className="text-xs text-neutral-400" dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
