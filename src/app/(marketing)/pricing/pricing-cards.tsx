'use client'

// # Pricing cards component — renders the 4 plan cards with Paddle checkout buttons.
// # Uses Paddle.js overlay checkout (loaded via script tag in root layout).

import { PLANS } from '@/lib/paddle'

// # Plan display order and which one to highlight as "Most Popular".
const PLAN_ORDER = ['learner', 'exam', 'complete', 'oet'] as const
const POPULAR_PLAN = 'complete'

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {PLAN_ORDER.map((planId) => {
        const plan = PLANS[planId]
        const isPopular = planId === POPULAR_PLAN

        return (
          <div
            key={planId}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              isPopular
                ? 'border-black shadow-lg'
                : 'border-[#e5e5e5]'
            }`}
          >
            {/* # "Most Popular" badge */}
            {isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black px-4 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
            )}

            {/* # Plan name */}
            <h2 className="mb-2 text-xl font-bold text-black">{plan.name}</h2>

            {/* # Price */}
            <div className="mb-4">
              <span className="text-3xl font-bold text-black">
                ${plan.priceMonthly}
              </span>
              <span className="text-[#888]">/month</span>
            </div>

            {/* # Feature list */}
            <ul className="mb-6 flex-1 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-[#333]">
                  <span className="mt-0.5 text-[#22c55e]">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* # CTA button — triggers Paddle checkout overlay */}
            <button
              onClick={() => handleCheckout(planId)}
              className={`w-full rounded-lg py-3 text-sm font-medium transition-colors ${
                isPopular
                  ? 'bg-black text-white hover:bg-[#333]'
                  : 'border border-black bg-white text-black hover:bg-[#f5f5f5]'
              }`}
            >
              Get Started
            </button>
          </div>
        )
      })}
    </div>
  )
}

// # Opens Paddle checkout overlay for the selected plan.
// # Paddle.js must be loaded (script tag in root layout) and PADDLE_CLIENT_TOKEN set.
function handleCheckout(planId: string) {
  const paddleInstance = (window as Record<string, unknown>).Paddle as
    | { Checkout?: { open?: (opts: Record<string, unknown>) => void } }
    | undefined

  if (!paddleInstance?.Checkout?.open) {
    // # Paddle.js not loaded — show a fallback message.
    alert('Payment system is loading. Please try again in a moment.')
    return
  }

  // # The price ID mapping is set in PADDLE_PRICE_MAP env var.
  // # For now, use the planId as a placeholder until Paddle products are created.
  paddleInstance.Checkout.open({
    items: [{ priceId: `price_${planId}` }],
  })
}
