'use client'

// # Upgrade prompt — shown when a free user hits a plan limit.
// # Displays the limit reason and a CTA to the pricing page.

import { useRouter } from 'next/navigation'

interface UpgradePromptProps {
  // # What feature they tried to use.
  feature: string
  // # Human-readable limit message.
  message: string
}

export function UpgradePrompt({ feature, message }: UpgradePromptProps) {
  const router = useRouter()

  return (
    <div className="mx-auto max-w-md rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
      {/* # Lock icon */}
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
        <span className="text-xl">&#128274;</span>
      </div>

      <h3 className="mb-2 text-lg font-bold text-black">
        {feature} limit reached
      </h3>

      <p className="mb-6 text-sm text-neutral-500">
        {message}
      </p>

      <button
        onClick={() => router.push('/pricing')}
        className="w-full rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        View Plans & Upgrade
      </button>

      <p className="mt-3 text-xs text-neutral-400">
        Plans start at $19/month. Cancel anytime.
      </p>
    </div>
  )
}
