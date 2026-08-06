// # POST /api/speaking/assess
// # Submit recorded audio for AI-powered IELTS speaking assessment.
// # Expects base64-encoded audio + the original prompt.

import { type NextRequest } from 'next/server'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { assessSpeaking } from '@/speaking/assessment'

export async function POST(request: NextRequest) {
  try {
    await getAuthenticatedLearner(request)

    const body = (await request.json()) as Record<string, unknown>

    // # Validate required fields.
    const audioBase64 = body.audioBase64
    const mimeType = body.mimeType
    const prompt = body.prompt
    const part = body.part

    if (typeof audioBase64 !== 'string' || audioBase64.length < 100) {
      return jsonError(400, 'Audio data too short')
    }
    if (typeof mimeType !== 'string') {
      return jsonError(400, 'mimeType is required')
    }
    if (typeof prompt !== 'string' || prompt.length < 5) {
      return jsonError(400, 'Prompt is required')
    }
    if (part !== 1 && part !== 2 && part !== 3) {
      return jsonError(400, 'Part must be 1, 2, or 3')
    }

    const assessment = await assessSpeaking({ audioBase64, mimeType, prompt, part })

    if (!assessment) {
      return jsonError(503, 'Speaking assessment unavailable')
    }

    return jsonOk({ assessment })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/speaking/assess]', err)
    return jsonError(500, 'Internal server error')
  }
}
