// # Email service — sends transactional emails via Resend.
// # Used for: welcome email, streak reminders, goal nudges, milestone celebrations.
// # Set RESEND_API_KEY and EMAIL_FROM env vars.

import { Resend } from 'resend'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''
const EMAIL_FROM = process.env.EMAIL_FROM ?? 'FluentPath <noreply@fluentpath.com>'

// # Lazy init — only create client when actually sending.
let client: Resend | null = null
function getClient(): Resend | null {
  if (!RESEND_KEY) return null
  if (!client) client = new Resend(RESEND_KEY)
  return client
}

// # ═══════════════════════════════════════════════════════════════════
// # SEND HELPERS
// # ═══════════════════════════════════════════════════════════════════

interface EmailResult {
  success: boolean
  id?: string
  error?: string
}

async function send(to: string, subject: string, html: string): Promise<EmailResult> {
  const resend = getClient()
  if (!resend) return { success: false, error: 'RESEND_API_KEY not configured' }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    })
    if (error) return { success: false, error: error.message }
    return { success: true, id: data?.id }
  } catch (err) {
    console.error('[email] send failed:', err)
    return { success: false, error: 'Send failed' }
  }
}

// # ═══════════════════════════════════════════════════════════════════
// # EMAIL TEMPLATES
// # ═══════════════════════════════════════════════════════════════════

export async function sendWelcomeEmail(to: string, name: string | null): Promise<EmailResult> {
  const displayName = name || 'there'
  return send(to, 'Welcome to FluentPath', `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 28px; margin-bottom: 8px;">Welcome to FluentPath</h1>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Hi ${displayName},
      </p>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Your account is ready. Here's how to get started:
      </p>
      <ol style="color: #666; font-size: 16px; line-height: 1.8;">
        <li><strong>Take the placement test</strong> (5 minutes) to find your CEFR level</li>
        <li><strong>Follow your learning path</strong> with structured lessons</li>
        <li><strong>Practice daily</strong> to build your streak and earn badges</li>
      </ol>
      <div style="margin: 32px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://fluentpath.com'}/dashboard"
           style="background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px;">
          Start Learning
        </a>
      </div>
      <p style="color: #999; font-size: 13px;">
        FluentPath - Master English. Precisely.
      </p>
    </div>
  `)
}

export async function sendStreakReminderEmail(to: string, name: string | null, currentStreak: number): Promise<EmailResult> {
  const displayName = name || 'there'
  return send(to, `Don't lose your ${currentStreak}-day streak`, `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 28px; margin-bottom: 8px;">Your streak is at risk</h1>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Hi ${displayName},
      </p>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        You've been practising for <strong>${currentStreak} days straight</strong>.
        Don't let it reset — even 5 minutes of practice keeps your streak alive.
      </p>
      <div style="margin: 32px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://fluentpath.com'}/practice"
           style="background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px;">
          Quick Practice
        </a>
      </div>
      <p style="color: #999; font-size: 13px;">
        FluentPath - Master English. Precisely.
      </p>
    </div>
  `)
}

export async function sendMilestoneEmail(to: string, name: string | null, milestone: string, description: string): Promise<EmailResult> {
  const displayName = name || 'there'
  return send(to, `You earned: ${milestone}`, `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 28px; margin-bottom: 8px;">Achievement unlocked</h1>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Hi ${displayName},
      </p>
      <div style="background: #f8f8f8; border: 1px solid #eee; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
        <p style="font-size: 32px; font-weight: bold; margin: 0;">${milestone}</p>
        <p style="color: #666; font-size: 14px; margin: 8px 0 0;">${description}</p>
      </div>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Keep going. Every session brings you closer to fluency.
      </p>
      <div style="margin: 32px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://fluentpath.com'}/dashboard"
           style="background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px;">
          Continue Learning
        </a>
      </div>
      <p style="color: #999; font-size: 13px;">
        FluentPath - Master English. Precisely.
      </p>
    </div>
  `)
}

export async function sendWeeklyProgressEmail(
  to: string,
  name: string | null,
  stats: { weeklyXp: number; lessonsCompleted: number; currentStreak: number; level: string },
): Promise<EmailResult> {
  const displayName = name || 'there'
  return send(to, 'Your weekly progress report', `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 28px; margin-bottom: 8px;">Weekly Progress</h1>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Hi ${displayName}, here's your week at a glance:
      </p>
      <div style="background: #f8f8f8; border: 1px solid #eee; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #666;">Level</td>
            <td style="padding: 8px 0; font-size: 18px; font-weight: bold; text-align: right;">${stats.level}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #666;">XP this week</td>
            <td style="padding: 8px 0; font-size: 18px; font-weight: bold; text-align: right;">${stats.weeklyXp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #666;">Lessons completed</td>
            <td style="padding: 8px 0; font-size: 18px; font-weight: bold; text-align: right;">${stats.lessonsCompleted}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #666;">Current streak</td>
            <td style="padding: 8px 0; font-size: 18px; font-weight: bold; text-align: right;">${stats.currentStreak} days</td>
          </tr>
        </table>
      </div>
      <div style="margin: 32px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://fluentpath.com'}/dashboard"
           style="background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px;">
          Keep Going
        </a>
      </div>
      <p style="color: #999; font-size: 13px;">
        FluentPath - Master English. Precisely.
      </p>
    </div>
  `)
}
