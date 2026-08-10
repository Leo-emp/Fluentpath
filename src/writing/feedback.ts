// # AI writing feedback — scores essays against IELTS rubric using an LLM.
// # Returns structured band scores + actionable feedback for each criterion.
// #
// # The IELTS writing rubric has 4 criteria, each scored 0-9:
// # - Task Achievement (TA): Did the essay address the prompt fully?
// # - Coherence & Cohesion (CC): Is it well-organised with clear linking?
// # - Lexical Resource (LR): Vocabulary range, accuracy, appropriateness?
// # - Grammatical Range & Accuracy (GRA): Grammar variety and correctness?

// # ═══════════════════════════════════════════════════════════════════
// # TYPES
// # ═══════════════════════════════════════════════════════════════════

export interface WritingFeedbackRequest {
  // # The essay text the learner submitted.
  essay: string
  // # The original writing prompt/question.
  prompt: string
  // # Task type — affects scoring criteria emphasis.
  taskType: 'task1' | 'task2'
}

export interface CriterionFeedback {
  // # The criterion name (e.g. "Task Achievement").
  criterion: string
  // # Band score 0-9 in 0.5 increments (e.g. 6.5).
  band: number
  // # What the learner did well.
  strengths: string[]
  // # Specific issues to fix.
  weaknesses: string[]
  // # Concrete advice for improvement.
  suggestions: string[]
}

export interface WritingFeedback {
  // # Overall band score (average of 4 criteria, rounded to nearest 0.5).
  overallBand: number
  // # Per-criterion feedback.
  criteria: CriterionFeedback[]
  // # Word count of the submitted essay.
  wordCount: number
  // # Whether the essay meets the minimum word count (150 for T1, 250 for T2).
  meetsMinWords: boolean
  // # Model-corrected version of the essay (with improvements).
  correctedEssay: string
  // # Top 3 priority actions for the learner.
  topActions: string[]
}

// # ═══════════════════════════════════════════════════════════════════
// # PROMPT BUILDER — constructs the LLM prompt for essay assessment.
// # ═══════════════════════════════════════════════════════════════════

function buildAssessmentPrompt(req: WritingFeedbackRequest): string {
  const minWords = req.taskType === 'task1' ? 150 : 250

  return `You are an expert IELTS examiner. Score this ${req.taskType === 'task1' ? 'Task 1' : 'Task 2'} essay.

## Writing Prompt
${req.prompt}

## Student's Essay
${req.essay}

## Instructions
Score against ALL four IELTS Writing criteria. Be honest and specific.
Minimum word count for this task: ${minWords} words.

Return ONLY valid JSON in this exact format:
{
  "taskAchievement": { "band": 6.5, "strengths": ["..."], "weaknesses": ["..."], "suggestions": ["..."] },
  "coherenceCohesion": { "band": 6.0, "strengths": ["..."], "weaknesses": ["..."], "suggestions": ["..."] },
  "lexicalResource": { "band": 6.5, "strengths": ["..."], "weaknesses": ["..."], "suggestions": ["..."] },
  "grammaticalRange": { "band": 6.0, "strengths": ["..."], "weaknesses": ["..."], "suggestions": ["..."] },
  "correctedEssay": "The full essay with corrections applied...",
  "topActions": ["Priority 1...", "Priority 2...", "Priority 3..."]
}

Rules:
- Bands must be in 0.5 increments (5.0, 5.5, 6.0, etc.)
- Each strengths/weaknesses/suggestions array must have 2-4 items
- correctedEssay must be the COMPLETE essay, not a summary
- topActions must have exactly 3 items
- Be specific — quote the student's actual words when giving examples`
}

// # ═══════════════════════════════════════════════════════════════════
// # RESPONSE PARSER — extracts structured feedback from LLM output.
// # ═══════════════════════════════════════════════════════════════════

interface RawFeedback {
  taskAchievement: { band: number; strengths: string[]; weaknesses: string[]; suggestions: string[] }
  coherenceCohesion: { band: number; strengths: string[]; weaknesses: string[]; suggestions: string[] }
  lexicalResource: { band: number; strengths: string[]; weaknesses: string[]; suggestions: string[] }
  grammaticalRange: { band: number; strengths: string[]; weaknesses: string[]; suggestions: string[] }
  correctedEssay: string
  topActions: string[]
}

function parseWritingFeedback(raw: string, essay: string, taskType: 'task1' | 'task2'): WritingFeedback | null {
  // # Strip markdown code fences if present.
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const text = fenced ? fenced[1]!.trim() : raw.trim()

  try {
    const obj = JSON.parse(text) as RawFeedback

    // # Validate required fields.
    if (!obj.taskAchievement || !obj.coherenceCohesion || !obj.lexicalResource || !obj.grammaticalRange) {
      return null
    }

    const criteria: CriterionFeedback[] = [
      { criterion: 'Task Achievement', ...obj.taskAchievement },
      { criterion: 'Coherence & Cohesion', ...obj.coherenceCohesion },
      { criterion: 'Lexical Resource', ...obj.lexicalResource },
      { criterion: 'Grammatical Range & Accuracy', ...obj.grammaticalRange },
    ]

    // # Overall = average of 4 criteria, rounded to nearest 0.5.
    const sum = criteria.reduce((s, c) => s + c.band, 0)
    const avg = sum / 4
    const overallBand = Math.round(avg * 2) / 2

    const wordCount = essay.trim().split(/\s+/).length
    const minWords = taskType === 'task1' ? 150 : 250

    return {
      overallBand,
      criteria,
      wordCount,
      meetsMinWords: wordCount >= minWords,
      correctedEssay: obj.correctedEssay ?? essay,
      topActions: obj.topActions ?? [],
    }
  } catch {
    return null
  }
}

// # ═══════════════════════════════════════════════════════════════════
// # ASSESSMENT FUNCTION — callable from API routes.
// # ═══════════════════════════════════════════════════════════════════

// # Uses fetch to call the Gemini API directly (avoids needing the SDK).
// # Requires GOOGLE_AI_API_KEY env var.
export async function assessWriting(req: WritingFeedbackRequest): Promise<WritingFeedback | null> {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) {
    console.error('[writing/feedback] GOOGLE_AI_API_KEY not set')
    return null
  }

  const prompt = buildAssessmentPrompt(req)

  // # Call Gemini API — key in header, never in URL (avoids log leaks).
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 4096, temperature: 0.3 },
      }),
    },
  )

  if (!response.ok) {
    console.error('[writing/feedback] Gemini API error:', response.status, await response.text())
    return null
  }

  const data = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!raw) {
    console.error('[writing/feedback] No content in Gemini response')
    return null
  }

  return parseWritingFeedback(raw, req.essay, req.taskType)
}

// # Export for testing.
export { buildAssessmentPrompt, parseWritingFeedback }
