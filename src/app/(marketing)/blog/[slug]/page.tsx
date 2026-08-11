// # Individual blog article page — renders markdown-like content
// # from the static article data. Each slug maps to one article.
// # Generates metadata for SEO + social sharing.

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_ARTICLES } from '@/lib/reference/blog-articles'
import { Footer } from '@/components/footer'

// # Generate static params at build time so every article is pre-rendered.
export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }))
}

// # Dynamic metadata for each article — title, description, OG tags.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = BLOG_ARTICLES.find((a) => a.slug === slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

// # Simple markdown-ish renderer — converts ## headings, **bold**,
// # tables, bullet lists, and blank lines into HTML elements.
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]!

    // # Skip empty lines.
    if (line.trim() === '') {
      i++
      continue
    }

    // # H2 heading.
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={i}
          className="mb-4 mt-10 font-serif text-2xl font-bold tracking-tight first:mt-0"
        >
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    // # H3 heading.
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="mb-3 mt-8 text-lg font-semibold">
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }

    // # Table — collect all | lines.
    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i]!.startsWith('|')) {
        tableLines.push(lines[i]!)
        i++
      }
      // # Parse header, separator, body.
      const header = tableLines[0]!.split('|').filter(Boolean).map((c) => c.trim())
      const body = tableLines.slice(2).map((row) =>
        row.split('|').filter(Boolean).map((c) => c.trim())
      )
      elements.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                {header.map((h, hi) => (
                  <th
                    key={hi}
                    className="px-4 py-2 text-left font-semibold text-neutral-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-neutral-100">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-neutral-600">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // # Bullet list — collect consecutive - lines.
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i]!.startsWith('- ')) {
        items.push(lines[i]!.slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 list-disc space-y-2 pl-6">
          {items.map((item, ii) => (
            <li key={ii} className="text-neutral-600 leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // # Regular paragraph — collect lines until blank or heading.
    const paraLines: string[] = []
    while (
      i < lines.length &&
      lines[i]!.trim() !== '' &&
      !lines[i]!.startsWith('## ') &&
      !lines[i]!.startsWith('### ') &&
      !lines[i]!.startsWith('| ') &&
      !lines[i]!.startsWith('- ')
    ) {
      paraLines.push(lines[i]!)
      i++
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={`p-${i}`} className="my-4 leading-relaxed text-neutral-600">
          {renderInline(paraLines.join(' '))}
        </p>
      )
    }
  }

  return elements
}

// # Inline formatting — **bold** and backtick `code`.
function renderInline(text: string): React.ReactNode {
  // # Split on **bold** and `code` patterns.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-black">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = BLOG_ARTICLES.find((a) => a.slug === slug)
  if (!article) notFound()

  // # Find related articles (same category, exclude current).
  const related = BLOG_ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3)

  return (
    <main className="min-h-screen bg-white text-black">
      {/* # ─── NAV BAR ─── */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">FluentPath</Link>
        <div className="flex items-center gap-6">
          <Link href="/blog" className="text-sm text-neutral-500 hover:text-black transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="text-sm text-neutral-500 hover:text-black transition-colors">
            Pricing
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* # ─── ARTICLE ─── */}
      <article className="mx-auto max-w-2xl px-6 pb-16 pt-12">
        {/* # Back link */}
        <Link href="/blog" className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-black transition-colors">
          &larr; All articles
        </Link>

        {/* # Article header */}
        <header className="mb-10">
          {/* # Category + reading time */}
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              {article.category.toUpperCase()}
            </span>
            <span className="text-xs text-neutral-400">{article.readingTime} min read</span>
          </div>

          {/* # Title */}
          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {article.title}
          </h1>

          {/* # Description */}
          <p className="mb-4 text-lg text-neutral-500">{article.description}</p>

          {/* # Date + tags */}
          <div className="flex flex-wrap items-center gap-3">
            <time className="text-sm text-neutral-400" dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {article.tags.map((tag) => (
              <span key={tag} className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* # Divider */}
        <hr className="mb-10 border-neutral-200" />

        {/* # Article body */}
        <div className="prose-custom">{renderContent(article.content)}</div>

        {/* # ─── CTA ─── */}
        <div className="mt-16 rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center">
          <h3 className="mb-2 font-serif text-xl font-bold">Ready to improve your score?</h3>
          <p className="mb-6 text-neutral-500">
            Start with a free placement test and get personalised practice.
          </p>
          <Link
            href="/sign-up"
            className="inline-block rounded-lg bg-black px-8 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Start Free &rarr;
          </Link>
        </div>
      </article>

      {/* # ─── RELATED ARTICLES ─── */}
      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-xl border border-neutral-200 p-6 transition-all hover:border-neutral-400 hover:shadow-lg"
              >
                <h3 className="mb-2 font-semibold leading-snug group-hover:text-neutral-600 transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
