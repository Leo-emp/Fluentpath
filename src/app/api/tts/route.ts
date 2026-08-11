// # POST /api/tts
// # Generate text-to-speech audio for listening exercises.
// # Returns { audioUrl, durationMs } for the client to play.
// # Requires ELEVENLABS_API_KEY env var to be set.

import { type NextRequest } from 'next/server'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { checkPlanAccess } from '@/app/api/_lib/plan-gate'
import { checkRateLimit, RATE_LIMITS } from '@/app/api/_lib/rate-limit'
import { createElevenLabsProvider } from '@/tts/elevenlabs'
import { getStorageProvider } from '@/storage/provider'

// # Default voice ID — ElevenLabs "Rachel" (clear, professional, female).
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)

    // # Plan gate — TTS pronunciation requires complete tier.
    const access = await checkPlanAccess(learnerId, 'tts')
    if (!access.allowed) {
      return jsonError(403, access.reason ?? 'Upgrade to Complete for TTS pronunciation')
    }

    // # Rate limit — 50 TTS requests per hour per user.
    const limited = checkRateLimit(learnerId, RATE_LIMITS.tts)
    if (limited) return limited

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      return jsonError(503, 'TTS service not configured')
    }

    const body = (await request.json()) as Record<string, unknown>

    const text = body.text
    if (typeof text !== 'string' || text.trim().length < 1) {
      return jsonError(400, 'Text is required')
    }
    // # Cap TTS text at 5,000 chars — ElevenLabs has its own limits, but
    // # this prevents sending excessive payloads.
    if (text.length > 5_000) {
      return jsonError(400, 'Text must be under 5,000 characters')
    }

    // # Optional: voice, speed, accent.
    const voiceId = typeof body.voiceId === 'string' ? body.voiceId : DEFAULT_VOICE_ID
    const speed = typeof body.speed === 'number' ? body.speed : 1.0
    const accent = typeof body.accent === 'string' ? body.accent : undefined

    // # Create the TTS provider with storage backend.
    const storage = getStorageProvider()
    const tts = createElevenLabsProvider(apiKey, storage)

    const result = await tts.generateSpeech(text, { voiceId, speed, accent })

    return jsonOk({
      audioUrl: result.audioUrl,
      durationMs: result.durationMs,
    })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/tts]', err)
    return jsonError(500, 'TTS generation failed')
  }
}
