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
  title: 'FluentPath',
  description: 'Master English. Precisely.',
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
