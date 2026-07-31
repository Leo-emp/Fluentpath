// Better Auth server instance — providers, adapter, and signup hooks.
// The databaseHooks.user.create.after hook creates a FluentPath learner
// row whenever a new auth user is created (email signup or first Google login).

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createAuthMiddleware } from 'better-auth/api'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/db/schema'
import { createLearner, findLearnerByEmail } from '@/db/repositories/learners'

// ─── Database ───────────────────────────────────────────────────────────
// Better Auth needs its own Drizzle instance with the full schema so the
// adapter can find the auth tables.

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? 'file:./local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const db = drizzle(client, { schema })

// ─── Auth instance ──────────────────────────────────────────────────────

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      // Map Better Auth's internal table names to our prefixed schema objects.
      user: schema.authUsers,
      session: schema.authSessions,
      account: schema.authAccounts,
      verification: schema.authVerifications,
    },
  }),

  // ─── Providers ──────────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },

  // ─── 18+ DOB gate ──────────────────────────────────────────────────
  // Intercept email signup requests and validate age >= 18.
  // India DPDP Act prohibits profiling of children — this is a legal
  // requirement, not a product choice.
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Only gate email signup — Google OAuth users have already accepted
      // Google's age requirements.
      if (ctx.path === '/sign-up/email') {
        const body = ctx.body as Record<string, unknown> | undefined
        const dob = body?.dateOfBirth
        if (typeof dob !== 'string' || !dob) {
          throw new Error('Date of birth is required')
        }
        const birthDate = new Date(dob)
        if (isNaN(birthDate.getTime())) {
          throw new Error('Invalid date of birth')
        }
        // Compute age in years.
        const now = new Date()
        let age = now.getFullYear() - birthDate.getFullYear()
        const monthDiff = now.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
          age--
        }
        if (age < 18) {
          throw new Error('You must be 18 or older to use FluentPath')
        }
      }
    }),
  },

  // ─── Database hooks ────────────────────────────────────────────────
  // After a new auth user is created (email signup or first Google login),
  // create a matching FluentPath learner row linked by email.
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Check if a learner already exists for this email (shouldn't
          // happen, but defensive). The learner repo's createLearner
          // generates its own ID — auth IDs and learner IDs are independent.
          const existing = await findLearnerByEmail(db, user.email)
          if (!existing) {
            await createLearner(db, {
              email: user.email,
              name: user.name ?? undefined,
              now: Date.now(),
            })
          }
        },
      },
    },
  },
})
