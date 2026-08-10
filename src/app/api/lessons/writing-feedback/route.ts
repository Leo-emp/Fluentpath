// # POST /api/lessons/writing-feedback
// # General AI writing feedback for in-lesson exercises.
// # Uses Gemini to score writing against CEFR-appropriate criteria.
// # Lighter than the full IELTS assessWriting — designed for quick,
// # actionable feedback during a lesson exercise.

import { type NextRequest } from 'next/server'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'

// # ─── Request / response types ──────────────────────────────────────────

interface FeedbackRequest {
  // # The student's written answer.
  text: string
  // # The exercise prompt / question.
  prompt: string
  // # The student's CEFR level (adjusts expectations).
  level: string
  // # The skill area (writing, speaking, etc.).
  skill?: string
}

// # ─── Prompt builder ────────────────────────────────────────────────────

function buildPrompt(req: FeedbackRequest): string {
  return `You are an expert English language teacher. Give helpful, encouraging feedback on this student's writing.

## Student Level
CEFR ${req.level} (${levelDescription(req.level)})

## Exercise Prompt
${req.prompt}

## Student's Answer
${req.text}

## Instructions
Evaluate the answer for a ${req.level} learner. Be encouraging but honest.
Adjust your expectations to match the level — an A1 student writing simple sentences correctly is excellent.

Return ONLY valid JSON:
{
  "score": 7,
  "strengths": ["What they did well — 2-3 specific items"],
  "improvements": ["What to improve — 2-3 specific, actionable items"],
  "corrected": "The corrected/improved version of their text",
  "tip": "One key takeaway for this student"
}

Rules:
- Score is 1-10 (5 = meets expectations for this level, 8+ = exceeds)
- strengths and improvements arrays: 2-3 items each, specific and brief
- corrected: their FULL text with corrections applied (not just the changes)
- tip: one sentence, practical and actionable
- Be warm and encouraging — learning takes courage`
}

function levelDescription(level: string): string {
  const map: Record<string, string> = {
    A1: 'absolute beginner — simple sentences, basic vocabulary',
    A2: 'elementary — short paragraphs, everyday topics',
    B1: 'intermediate — clear paragraphs, opinions with reasons',
    B2: 'upper-intermediate — structured essays, nuanced arguments',
    C1: 'advanced — sophisticated prose, academic register',
    C2: 'mastery — near-native fluency, published-quality writing',
  }
  return map[level] ?? 'intermediate'
}

// # ─── Response parser ───────────────────────────────────────────────────

interface ParsedFeedback {
  score: number
  strengths: string[]
  improvements: string[]
  corrected: string
  tip: string
}

function parseFeedback(raw: string): ParsedFeedback | null {
  // # Strip markdown code fences if present.
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const text = fenced ? fenced[1]!.trim() : raw.trim()

  try {
    const obj = JSON.parse(text) as ParsedFeedback
    if (typeof obj.score !== 'number' || !Array.isArray(obj.strengths)) return null
    return obj
  } catch {
    return null
  }
}

// # ─── Route handler ─────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    await getAuthenticatedLearner(request)

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return jsonError(503, 'AI feedback service not configured')
    }

    const body = (await request.json()) as FeedbackRequest

    if (!body.text || body.text.trim().length < 5) {
      return jsonError(400, 'Please write at least a few words before requesting feedback')
    }
    if (!body.prompt) {
      return jsonError(400, 'Exercise prompt is required')
    }

    const prompt = buildPrompt(body)

    // # Call Gemini API.
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2048, temperature: 0.3 },
        }),
      },
    )

    if (!response.ok) {
      console.error('[writing-feedback] Gemini API error:', response.status)
      return jsonError(502, 'AI service temporarily unavailable')
    }

    const data = await response.json() as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    }
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!raw) {
      return jsonError(502, 'No feedback generated')
    }

    const feedback = parseFeedback(raw)
    if (!feedback) {
      return jsonError(502, 'Could not parse feedback')
    }

    return jsonOk({ feedback })
  } catch (err) {
    if (err instanceof AuthError) return jsonError(401, err.message)
    console.error('[POST /api/lessons/writing-feedback]', err)
    return jsonError(500, 'Internal server error')
  }
}
