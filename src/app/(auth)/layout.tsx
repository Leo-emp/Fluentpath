// # Auth layout — centered card for sign-up and sign-in pages.

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* # Wordmark at top of auth card */}
        <a href="/" className="mb-8 block text-center font-serif text-2xl font-bold">
          FluentPath
        </a>
        {children}
      </div>
    </div>
  )
}
