// # Dynamic sitemap — tells Google every public page on the site.
// # Next.js auto-serves this at /sitemap.xml.

import type { MetadataRoute } from 'next'
import { ALL_LESSONS } from '@/lib/reference/lesson-lookup'
import { BLOG_ARTICLES } from '@/lib/reference/blog-articles'

const BASE = 'https://fluentpath.co'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // # Static marketing + auth pages.
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/sign-up`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/sign-in`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    // # Public reference pages (crawlable even without login).
    { url: `${BASE}/lessons`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/grammar`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/vocabulary`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/phrasal-verbs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // # Individual lesson pages — high SEO value, each targets a long-tail keyword.
  const lessonPages: MetadataRoute.Sitemap = ALL_LESSONS.map(lesson => ({
    url: `${BASE}/lessons/${lesson.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // # Blog article pages — high SEO value, each targets a keyword cluster.
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...BLOG_ARTICLES.map(article => ({
      url: `${BASE}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [...staticPages, ...blogPages, ...lessonPages]
}
