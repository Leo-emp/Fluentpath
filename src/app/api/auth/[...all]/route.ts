// Catch-all route that delegates to Better Auth. Handles sign-in,
// sign-up, sign-out, OAuth callbacks, and session endpoints.

import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export const { GET, POST } = toNextJsHandler(auth)
