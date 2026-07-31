// Better Auth client — used by frontend components to call auth endpoints.
// Imported in client components, never in API routes.

import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
})
