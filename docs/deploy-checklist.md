# FluentPath Deploy Checklist

## Required Environment Variables

### Database (Turso)
- [ ] `TURSO_DATABASE_URL` — Production Turso database URL
- [ ] `TURSO_AUTH_TOKEN` — Turso auth token

### Authentication (Better Auth)
- [ ] `BETTER_AUTH_SECRET` — Random 32+ char secret for session signing
- [ ] `BETTER_AUTH_URL` — Production URL (e.g., https://fluentpath.com)
- [ ] `GOOGLE_CLIENT_ID` — Google OAuth client ID
- [ ] `GOOGLE_CLIENT_SECRET` — Google OAuth client secret

### Payments (Paddle)
- [ ] `PADDLE_API_KEY` — Paddle API key
- [ ] `PADDLE_WEBHOOK_SECRET` — Paddle webhook signing secret
- [ ] `PADDLE_CLIENT_TOKEN` — Paddle client-side token (for checkout overlay)
- [ ] `PADDLE_PRICE_MAP` — JSON mapping price IDs to plan IDs: `{"pri_xxx":"exam","pri_yyy":"complete"}`

### Storage (Cloudflare R2)
- [ ] `R2_ACCOUNT_ID` — Cloudflare account ID
- [ ] `R2_ACCESS_KEY_ID` — R2 API token key ID
- [ ] `R2_SECRET_ACCESS_KEY` — R2 API token secret
- [ ] `R2_BUCKET_NAME` — R2 bucket name (e.g., `fluentpath-content`)
- [ ] `R2_PUBLIC_URL` — Public URL for the bucket

### TTS (ElevenLabs) — Optional
- [ ] `ELEVENLABS_API_KEY` — ElevenLabs API key (pronunciation features disabled without this)

### Security
- [ ] `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key (bot protection)
- [ ] `TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key

## Vercel Configuration
- [ ] Region set to `sin1` (Singapore) via `vercel.json`
- [ ] All env vars set in Vercel dashboard (Settings → Environment Variables)
- [ ] Paddle webhook URL configured: `https://your-domain.com/api/webhooks/paddle`

## Post-Deploy
- [ ] Run database migrations: `npx drizzle-kit push`
- [ ] Seed initial content: `npx tsx src/seed/run-seed.ts`
- [ ] Verify geo-blocking works (test from EU IP)
- [ ] Test Paddle checkout flow (sandbox mode)
- [ ] Verify webhook signature validation
- [ ] Check all legal pages render correctly
