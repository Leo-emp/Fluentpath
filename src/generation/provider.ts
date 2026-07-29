import type { McqItem } from '@/items/types'

// The shape the model must return. Kept identical to McqItem minus `id` and
// `level`, which the pipeline fills in — the model should not be choosing its
// own id or overriding the target level.
export interface GeneratedMcq {
  stem: string
  options: Array<{ text: string; misconception: string | null }>
  correctIndex: number
  nodeIds: string[]
}

// What the pipeline sends to whatever sits behind this interface.
export interface GenerationRequest {
  prompt: string
  /** Max tokens the model may produce. */
  maxTokens: number
}

// What comes back. The raw text is kept for logging; the parsed payload is
// what the pipeline actually uses.
export interface GenerationResponse {
  raw: string
  parsed: GeneratedMcq | null
}

// The seam between the pipeline and any LLM. Implementations can call
// Gemini, OpenAI, a local model, or return canned responses for tests.
export interface GenerationProvider {
  generate(request: GenerationRequest): Promise<GenerationResponse>
}

// Parses a JSON block from raw model output. Models wrap JSON in markdown
// fences ("```json … ```") more often than not, so strip those first.
export function parseModelOutput(raw: string): GeneratedMcq | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const text = fenced ? fenced[1]!.trim() : raw.trim()

  try {
    const obj = JSON.parse(text)

    if (
      typeof obj.stem !== 'string' ||
      !Array.isArray(obj.options) ||
      typeof obj.correctIndex !== 'number' ||
      !Array.isArray(obj.nodeIds)
    ) {
      return null
    }

    for (const opt of obj.options) {
      if (typeof opt.text !== 'string') return null
      if (opt.misconception !== null && typeof opt.misconception !== 'string') return null
    }

    return {
      stem: obj.stem,
      options: obj.options,
      correctIndex: obj.correctIndex,
      nodeIds: obj.nodeIds,
    }
  } catch {
    return null
  }
}
