// # POST /api/writing/feedback
// # Submit an essay for AI-powered IELTS writing assessment.
// # Returns band scores per criterion + corrected essay + action items.

import { type NextRequest } from 'next/server'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { assessWriting } from '@/writing/feedback'

export async function POST(request: NextRequest) {
  try {
    // # Auth check — only logged-in learners can use AI feedback.
    await getAuthenticatedLearner(request)

    const body = (await request.json()) as Record<string, unknown>

    // # Validate required fields.
    const essay = body.essay
    const prompt = body.prompt
    const taskType = body.taskType

    if (typeof essay !== 'string' || essay.trim().length < 20) {
      return jsonError(400, 'Essay must be at least 20 characters')
    }
    if (typeof prompt !== 'string' || prompt.trim().length < 10) {
      return jsonError(400, 'Prompt must be at least 10 characters')
    }
    if (taskType !== 'task1' && taskType !== 'task2') {
      return jsonError(400, 'taskType must be "task1" or "task2"')
    }

    // # Run the AI assessment.
    const feedback = await assessWriting({ essay, prompt, taskType })

    if (!feedback) {
      return jsonError(503, 'AI assessment unavailable — check back later')
    }

    return jsonOk({ feedback })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/writing/feedback]', err)
    return jsonError(500, 'Internal server error')
  }
}
