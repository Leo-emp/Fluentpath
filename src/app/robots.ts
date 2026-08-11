// # Robots.txt — allow all crawlers, point to sitemap.
// # Block authenticated routes that shouldn't be indexed.

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/settings',
          '/admin',
          '/placement',
          '/practice',
          '/mock-test',
          '/diagnosis',
          '/learning-path',
          '/community',
          '/api/',
          '/blocked',
        ],
      },
    ],
    sitemap: 'https://fluentpath.co/sitemap.xml',
  }
}
