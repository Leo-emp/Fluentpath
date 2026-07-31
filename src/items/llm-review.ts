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
// Fail-closed: if the LLM returns unparseable output, the item is
// rejected. A structurally sound item that cannot be quality-reviewed
// should not reach learners — retry generation instead.
export async function reviewItemLlm(
  item: McqItem,
  provider: GenerationProvider,
  nodeTitle: string,
): Promise<LlmReview> {
  const prompt = buildRubricPrompt(item, nodeTitle)

  const response = await provider.generate({ prompt, maxTokens: MAX_TOKENS })

  const parsed = parseRubricResponse(response.raw)

  // Fail-closed: unparseable LLM output = reject.
  if (!parsed) {
    return {
      passed: false,
      issues: [{
        code: 'TEACHER_REJECT' as ItemIssue['code'],
        severity: 'reject',
        message: 'LLM quality review returned unparseable output — rejecting item until it can be reviewed.',
      }],
      raw: null,
    }
  }

  const issues = rubricToIssues(parsed)

  return {
    passed: !issues.some((i) => i.severity === 'reject'),
    issues,
    raw: parsed,
  }
}
