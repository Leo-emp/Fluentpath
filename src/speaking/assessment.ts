// # AI speaking assessment — evaluates a learner's spoken response.
// # The client records audio via Web Audio API, uploads it as base64,
// # and this module sends it to Gemini for pronunciation + fluency scoring.
// #
// # IELTS Speaking rubric criteria:
// # - Fluency & Coherence (FC): smooth delivery, logical flow, no hesitation
// # - Lexical Resource (LR): vocabulary range and precision
// # - Grammatical Range & Accuracy (GRA): sentence structures, error rate
// # - Pronunciation (P): clarity, stress, intonation, intelligibility

// # ═══════════════════════════════════════════════════════════════════
// # TYPES
// # ═══════════════════════════════════════════════════════════════════

export interface SpeakingAssessmentRequest {
  // # Base64-encoded audio data (webm or wav).
  audioBase64: string
  // # MIME type of the audio (e.g., 'audio/webm', 'audio/wav').
  mimeType: string
  // # The speaking prompt/question the learner was responding to.
  prompt: string
  // # Which IELTS speaking part (affects expectations).
  part: 1 | 2 | 3
}

export interface SpeakingCriterion {
  criterion: string
  band: number
  feedback: string
}

export interface SpeakingAssessment {
  // # Overall band score (average, rounded to 0.5).
  overallBand: number
  // # Per-criterion scores and feedback.
  criteria: SpeakingCriterion[]
  // # Transcript of what the learner said.
  transcript: string
  // # Key pronunciation issues identified.
  pronunciationIssues: string[]
  // # Grammar corrections.
  grammarCorrections: string[]
  // # Suggested improved response.
  modelAnswer: string
  // # Top 3 improvement priorities.
  topActions: string[]
}

// # ═══════════════════════════════════════════════════════════════════
// # ASSESSMENT
// # ═══════════════════════════════════════════════════════════════════

export async function assessSpeaking(req: SpeakingAssessmentRequest): Promise<SpeakingAssessment | null> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) {
    console.error('[speaking/assessment] GOOGLE_AI_API_KEY not set')
    return null
  }

  const prompt = `You are an expert IELTS Speaking examiner. Assess this Part ${req.part} response.

## Speaking Prompt
${req.prompt}

## Instructions
Listen to the audio and assess against ALL four IELTS Speaking criteria.
Provide an accurate transcript of what was said.
Be honest but encouraging.

Return ONLY valid JSON:
{
  "fluencyCohesion": { "band": 6.0, "feedback": "..." },
  "lexicalResource": { "band": 6.5, "feedback": "..." },
  "grammaticalRange": { "band": 6.0, "feedback": "..." },
  "pronunciation": { "band": 6.5, "feedback": "..." },
  "transcript": "What the learner actually said...",
  "pronunciationIssues": ["Issue 1", "Issue 2"],
  "grammarCorrections": ["Said X, should be Y"],
  "modelAnswer": "A band 8+ example response...",
  "topActions": ["Action 1", "Action 2", "Action 3"]
}`

  // # Gemini supports audio input via inline data. Key in header, never URL.
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType: req.mimeType, data: req.audioBase64 } },
          ],
        }],
        generationConfig: { maxOutputTokens: 4096, temperature: 0.3 },
      }),
    },
  )

  if (!response.ok) {
    console.error('[speaking/assessment] Gemini error:', response.status)
    return null
  }

  const data = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!raw) return null

  return parseSpeakingAssessment(raw)
}

// # Parse the JSON response from Gemini.
function parseSpeakingAssessment(raw: string): SpeakingAssessment | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const text = fenced ? fenced[1]!.trim() : raw.trim()

  try {
    const obj = JSON.parse(text) as Record<string, unknown>

    const fc = obj.fluencyCohesion as { band: number; feedback: string } | undefined
    const lr = obj.lexicalResource as { band: number; feedback: string } | undefined
    const gra = obj.grammaticalRange as { band: number; feedback: string } | undefined
    const pron = obj.pronunciation as { band: number; feedback: string } | undefined

    if (!fc || !lr || !gra || !pron) return null

    const criteria: SpeakingCriterion[] = [
      { criterion: 'Fluency & Coherence', band: fc.band, feedback: fc.feedback },
      { criterion: 'Lexical Resource', band: lr.band, feedback: lr.feedback },
      { criterion: 'Grammatical Range & Accuracy', band: gra.band, feedback: gra.feedback },
      { criterion: 'Pronunciation', band: pron.band, feedback: pron.feedback },
    ]

    const sum = criteria.reduce((s, c) => s + c.band, 0)
    const overallBand = Math.round((sum / 4) * 2) / 2

    return {
      overallBand,
      criteria,
      transcript: (obj.transcript as string) ?? '',
      pronunciationIssues: (obj.pronunciationIssues as string[]) ?? [],
      grammarCorrections: (obj.grammarCorrections as string[]) ?? [],
      modelAnswer: (obj.modelAnswer as string) ?? '',
      topActions: (obj.topActions as string[]) ?? [],
    }
  } catch {
    return null
  }
}
