import type { GenerationProvider } from '@/generation/provider'
import type { ItemIssue, McqItem } from './types'
import { buildRubricPrompt, parseRubricResponse, rubricToIssues } from './llm-rubric'
import type { LlmRubricResponse } from './llm-rubric'

// The result of running the 4-dimension LLM quality rubric over an item.
export interface LlmReview {
  // True when no dimension has severity 'reject'.
  passed: boolean
  // Issues from the LLM rubric (one per non-pass dimension).
  issues: ItemIssue[]
  // The raw parsed rubric response. Null when the LLM returned
  // unparseable output (fail-open case).
  raw: LlmRubricResponse | null
}

// Max tokens for the rubric response. The structured JSON is ~200 tokens
// even with detailed reasons, so 512 gives generous headroom.
const MAX_TOKENS = 512

// Run the 4-dimension LLM rubric over a single item.
//
// Fail-open: if the LLM returns unparseable output, the item passes with
// zero LLM issues. The deterministic gates already cleared it — a flaky
// LLM call should not block a structurally sound item.
export async function reviewItemLlm(
  item: McqItem,
  provider: GenerationProvider,
  nodeTitle: string,
): Promise<LlmReview> {
  // Build the prompt with the item content and grammar point name.
  const prompt = buildRubricPrompt(item, nodeTitle)

  // Call the LLM provider. The same GenerationProvider interface is
  // reused for quality review — same LLM, same interface, different prompt.
  const response = await provider.generate({ prompt, maxTokens: MAX_TOKENS })

  // Parse the structured JSON response.
  const parsed = parseRubricResponse(response.raw)

  // Fail-open: unparseable LLM output = pass with no issues.
  if (!parsed) {
    return { passed: true, issues: [], raw: null }
  }

  // Convert the rubric dimensions to ItemIssue objects.
  const issues = rubricToIssues(parsed)

  return {
    passed: !issues.some((i) => i.severity === 'reject'),
    issues,
    raw: parsed,
  }
}
