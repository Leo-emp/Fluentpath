// # Marketing layout — wraps public pages (pricing, legal) that don't need auth.

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
