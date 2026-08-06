import type { CefrLevel } from '@/skill-graph/types'
import type { SkillNode } from '@/skill-graph/types'
import type { ProfilerInventory } from '@/profiler/profile'
import type { McqItem, ItemReview } from '@/items/types'
import { reviewItem } from '@/items/review'
import type { ReviewContext } from '@/items/review'
import { buildConstraints, renderConstraints } from './constraints'
import type { GenerationProvider, GeneratedMcq } from './provider'
import { parseModelOutput } from './provider'
import { reviewItemLlm } from '@/items/llm-review'

// How many times to retry before giving up. Each attempt costs money and
// latency, so this is kept low. Three retries means four total attempts —
// enough to recover from a model that wraps JSON in prose on the first try,
// not enough to paper over a fundamentally broken prompt.
const MAX_RETRIES = 3

const MAX_TOKENS = 1024

export interface GenerateItemRequest {
  node: SkillNode
  level?: CefrLevel
  itemId: string
  // Stems already in the item bank, for duplicate detection.
  existingStems?: string[]
  // When provided, LLM quality gates run on items that pass the
  // deterministic gates. When absent, LLM gates are skipped.
  qualityProvider?: GenerationProvider
}

export type AttemptOutcome =
  | { kind: 'parse_failure'; raw: string }
  | { kind: 'gate_failure'; item: McqItem; review: ItemReview }
  | { kind: 'success'; item: McqItem; review: ItemReview }

export interface GenerateItemResult {
  item: McqItem | null
  review: ItemReview | null
  attempts: AttemptOutcome[]
}

// Assemble an MCQ item from the raw model output, filling in the fields the
// model does not control.
function toMcqItem(parsed: GeneratedMcq, id: string, level: CefrLevel): McqItem {
  return {
    id,
    type: 'mcq',
    stem: parsed.stem,
    options: parsed.options,
    correctIndex: parsed.correctIndex,
    nodeIds: parsed.nodeIds,
    level,
  }
}

// The loop: generate, parse, check, retry.
//
// On each attempt the full constraint prompt is sent fresh — models do not
// benefit from seeing their own rejected output in the context. Showing them
// the rejection reasons has been tried and makes them over-correct, producing
// bland items that technically pass but teach nothing.
export async function generateItem(
  provider: GenerationProvider,
  inventory: ProfilerInventory,
  request: GenerateItemRequest,
): Promise<GenerateItemResult> {
  const level = request.level ?? request.node.level
  const constraints = buildConstraints(request.node, inventory, level)
  const prompt = renderConstraints(constraints) + '\n\nRespond with a single JSON object. No prose.'
  const attempts: AttemptOutcome[] = []

  // Build the review context once — reused on every attempt.
  const reviewContext: ReviewContext = {
    inventory,
    existingStems: request.existingStems,
  }

  for (let i = 0; i <= MAX_RETRIES; i++) {
    const response = await provider.generate({ prompt, maxTokens: MAX_TOKENS })
    const parsed = response.parsed ?? parseModelOutput(response.raw)

    if (!parsed) {
      attempts.push({ kind: 'parse_failure', raw: response.raw })
      continue
    }

    const item = toMcqItem(parsed, request.itemId, level)
    const review = reviewItem(item, reviewContext)

    if (!review.passed) {
      attempts.push({ kind: 'gate_failure', item, review })
      continue
    }

    // LLM quality gates: run only on items that passed deterministic
    // gates, and only when a quality provider is configured.
    let finalReview = review
    if (request.qualityProvider) {
      const llmResult = await reviewItemLlm(item, request.qualityProvider, request.node.title)
      // Merge deterministic and LLM issues into one review.
      finalReview = {
        passed: llmResult.passed,
        issues: [...review.issues, ...llmResult.issues],
      }
      if (!finalReview.passed) {
        attempts.push({ kind: 'gate_failure', item, review: finalReview })
        continue
      }
    }

    attempts.push({ kind: 'success', item, review: finalReview })
    return { item, review: finalReview, attempts }
  }

  // All attempts exhausted. Return the last gate failure if one exists, so the
  // caller can see what went wrong.
  const lastGate = [...attempts].reverse().find((a) => a.kind === 'gate_failure') as
    | Extract<AttemptOutcome, { kind: 'gate_failure' }>
    | undefined

  return {
    item: lastGate?.item ?? null,
    review: lastGate?.review ?? null,
    attempts,
  }
}
