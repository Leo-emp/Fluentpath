import type { ItemIssue, ItemIssueCode, McqItem } from './types'

// ─── Types ───────────────────────────────────────────────────────────────

// The three possible LLM verdicts for each quality dimension.
export type LlmVerdict = 'pass' | 'warn' | 'reject'

// One dimension's result from the LLM rubric.
export interface LlmDimensionResult {
  verdict: LlmVerdict
  reason: string
}

// The structured response the LLM returns — one result per dimension.
export interface LlmRubricResponse {
  naturalness: LlmDimensionResult
  authenticity: LlmDimensionResult
  teacherTest: LlmDimensionResult
  explanatoryTransfer: LlmDimensionResult
}

// ─── Prompt builder ──────────────────────────────────────────────────────

// Build the rubric prompt for a single MCQ item. The prompt asks the LLM
// to evaluate all 4 quality dimensions in one call and return structured
// JSON. The correct option is marked so the reviewer can assess whether
// it is the defensible answer.
export function buildRubricPrompt(item: McqItem, nodeTitle: string): string {
  // Format each option with its letter label, correct marker, and
  // misconception text.
  const options = item.options
    .map((o, i) => {
      const marker = i === item.correctIndex ? ' [correct]' : ''
      const misconception = o.misconception ? ` — misconception: "${o.misconception}"` : ''
      return `  ${String.fromCharCode(65 + i)}. ${o.text}${marker}${misconception}`
    })
    .join('\n')

  return `You are an expert ESL item reviewer with 15 years of classroom experience
teaching CEFR levels A1 through C2.

Review this multiple-choice item for use in an English learning platform.
The item targets CEFR level ${item.level} and the grammar point "${nodeTitle}".

ITEM:
Stem: ${item.stem}
Options:
${options}

Score each dimension as "pass", "warn", or "reject".

DIMENSIONS:

1. NATURALNESS: Does the stem read like something a real person would
   actually say or write at this level? Not textbook-stilted, not
   artificially constructed to showcase the grammar point.

2. CONTEXTUAL AUTHENTICITY: Is the scenario plausible? Would this
   situation actually arise? Does the blank test something that matters
   in this context, or is the grammar point shoehorned in?

3. TEACHER TEST: Would a qualified ESL teacher use this item unedited?
   Is the stem unambiguous? Are the options clearly ordered? Is there
   exactly one defensible correct answer given the context?

4. EXPLANATORY TRANSFER: Do the misconception descriptions help a
   learner understand WHY their choice was wrong? Not just a label
   ("wrong tense") but a causal explanation that builds understanding?

Respond with JSON only. No prose.
{
  "naturalness": { "verdict": "pass|warn|reject", "reason": "..." },
  "authenticity": { "verdict": "pass|warn|reject", "reason": "..." },
  "teacherTest": { "verdict": "pass|warn|reject", "reason": "..." },
  "explanatoryTransfer": { "verdict": "pass|warn|reject", "reason": "..." }
}`
}

// ─── Response parser ─────────────────────────────────────────────────────

// The set of accepted verdict strings.
const VERDICTS = new Set<LlmVerdict>(['pass', 'warn', 'reject'])

// Normalize a verdict value. Unknown values default to 'reject' —
// fail-closed prevents unrecognised LLM output from silently passing.
function normalizeVerdict(v: unknown): LlmVerdict {
  if (typeof v === 'string' && VERDICTS.has(v as LlmVerdict)) return v as LlmVerdict
  return 'reject'
}

// Normalize a dimension result. Missing or malformed dimensions are
// rejected — a missing dimension likely means the LLM response is
// broken, not that the item is fine.
function normalizeDimension(d: unknown): LlmDimensionResult {
  if (typeof d !== 'object' || d === null) {
    return { verdict: 'reject', reason: 'LLM did not return this dimension — failing closed.' }
  }
  const obj = d as Record<string, unknown>
  return {
    verdict: normalizeVerdict(obj.verdict),
    reason: typeof obj.reason === 'string' ? obj.reason : '',
  }
}

// Parse the raw LLM output into a structured rubric response. Returns null
// only when the output is not valid JSON at all — individual dimension
// issues are handled by normalization (fail-open).
export function parseRubricResponse(raw: string): LlmRubricResponse | null {
  // Strip markdown fences if the model wrapped its JSON.
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const text = fenced ? fenced[1]!.trim() : raw.trim()

  try {
    const obj = JSON.parse(text)
    // Must be an object — arrays, strings, numbers, null are not valid.
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return null

    return {
      naturalness: normalizeDimension(obj.naturalness),
      authenticity: normalizeDimension(obj.authenticity),
      teacherTest: normalizeDimension(obj.teacherTest),
      explanatoryTransfer: normalizeDimension(obj.explanatoryTransfer),
    }
  } catch {
    return null
  }
}

// ─── Issue mapper ────────────────────────────────────────────────────────

// Maps each rubric dimension key to its corresponding ItemIssueCode.
const DIMENSION_MAP: ReadonlyArray<[keyof LlmRubricResponse, ItemIssueCode]> = [
  ['naturalness', 'UNNATURAL'],
  ['authenticity', 'INAUTHENTIC_CONTEXT'],
  ['teacherTest', 'TEACHER_REJECT'],
  ['explanatoryTransfer', 'WEAK_EXPLANATION'],
]

// Convert a parsed rubric response into ItemIssue objects. Only non-pass
// dimensions produce issues. The severity matches the LLM verdict.
export function rubricToIssues(response: LlmRubricResponse): ItemIssue[] {
  const issues: ItemIssue[] = []

  for (const [key, code] of DIMENSION_MAP) {
    const dim = response[key]
    // Pass = no issue.
    if (dim.verdict === 'pass') continue

    issues.push({
      code,
      severity: dim.verdict,
      message: dim.reason || `LLM reviewer flagged ${key}`,
    })
  }

  return issues
}
