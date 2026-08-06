// # PWA Web App Manifest — enables "Add to Home Screen" on mobile.
// # Next.js App Router auto-serves this as /manifest.webmanifest.

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FluentPath',
    short_name: 'FluentPath',
    description: 'Master English. Precisely. IELTS, PTE, OET preparation with AI-powered feedback.',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
