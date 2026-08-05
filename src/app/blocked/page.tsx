import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FluentPath — Not Available',
}

// # Static blocked page — shown to visitors from geo-restricted regions.
// # No auth, no nav, no interactivity. Just a clear message.
export default function BlockedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 font-serif text-4xl font-bold">
        Not Available in Your Region
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        FluentPath is not yet available in your region. We are working to
        expand access — please check back later.
      </p>
      <p className="mt-8 text-sm text-muted-foreground">
        If you believe this is an error, please contact support.
      </p>
    </main>
  )
}
