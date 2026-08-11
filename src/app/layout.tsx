import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { AnalyticsProvider } from '@/components/analytics-provider'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: 'FluentPath — AI-Powered IELTS, PTE & OET Preparation',
    template: '%s — FluentPath',
  },
  description:
    'Master English with AI-powered feedback. Adaptive placement, 1000+ practice items, full mock tests for IELTS, PTE Academic, and OET. CEFR A1–C2.',
  keywords: [
    'IELTS preparation', 'PTE Academic', 'OET preparation', 'English test prep',
    'AI English tutor', 'IELTS mock test', 'IELTS writing feedback',
    'PTE practice test', 'OET practice', 'CEFR placement test',
    'English learning platform', 'IELTS band score predictor',
  ],
  authors: [{ name: 'FluentPath' }],
  creator: 'FluentPath',
  metadataBase: new URL('https://fluentpath.co'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fluentpath.co',
    siteName: 'FluentPath',
    title: 'FluentPath — AI-Powered IELTS, PTE & OET Preparation',
    description:
      'Adaptive placement, AI writing & speaking feedback, full mock tests. IELTS, PTE Academic, OET — all in one platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FluentPath — Master English. Precisely.',
    description:
      'AI-powered exam prep for IELTS, PTE & OET. Free placement test, 1000+ practice items.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {/* # Skip link — keyboard users jump straight to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <AnalyticsProvider>
          {children}
          <CookieConsent />
        </AnalyticsProvider>
      </body>
    </html>
  )
}
