# LLM Quality Gates (R1b-e) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add a second quality layer — 4 LLM-judged dimensions (naturalness, contextual authenticity, teacher test, explanatory transfer) — on top of the 8 deterministic correctness gates. Items that pass deterministic gates are evaluated by a single LLM call with a structured rubric. Fail-open on LLM errors.

**Architecture:** Two new files under `src/items/`: `llm-rubric.ts` (prompt template + response parser + issue mapper — pure functions) and `llm-review.ts` (async orchestrator that calls the provider). The generation loop gains an optional `qualityProvider` field — when present, LLM gates run on deterministic survivors. Publication (`publish.ts`) is unchanged.

**Tech Stack:** TypeScript, Vitest, `GenerationProvider` interface (existing)

## Global Constraints

- All code uses `//` comments throughout for learning
- LLM gates only run during generation, never at publish time
- Fail-open: unparseable LLM output = all dimensions pass
- Unknown verdict values are treated as 'pass'
- Missing dimensions in the response are treated as 'pass'
- The `GenerationProvider` interface is reused for quality review (same LLM, same interface)
- Golden set integration tests are gated behind `QUALITY_PROVIDER` env var
- No new npm dependencies

---

### Task 1: Add 4 New Issue Codes to Types

**Files:**
- Modify: `src/items/types.ts:42-55` — add 4 new codes to `ItemIssueCode` union

**Interfaces:**
- Consumes: nothing new
- Produces: `ItemIssueCode` now includes `'UNNATURAL' | 'INAUTHENTIC_CONTEXT' | 'TEACHER_REJECT' | 'WEAK_EXPLANATION'`

- [x] **Step 1: Add the 4 new issue codes**

In `src/items/types.ts`, change the `ItemIssueCode` union to include the 4 new LLM codes at the end:

```typescript
export type ItemIssueCode =
  | 'STRUCTURE'
  | 'MALFORMED_OPTION'
  | 'NO_MISCONCEPTION'
  | 'VAGUE_MISCONCEPTION'
  | 'DUPLICATE_MISCONCEPTION'
  | 'STEM_GIVEAWAY'
  | 'LENGTH_TELL'
  | 'ABOVE_LEVEL'
  | 'WRONG_KEY'
  | 'AMBIGUOUS_KEY'
  | 'MISCONCEPTION_MISMATCH'
  | 'NEAR_DUPLICATE'
  | 'OFF_TARGET'
  // LLM-judged quality dimensions (R1b-e).
  | 'UNNATURAL'
  | 'INAUTHENTIC_CONTEXT'
  | 'TEACHER_REJECT'
  | 'WEAK_EXPLANATION'
```

- [x] **Step 2: Run existing tests to verify nothing breaks**

Run: `npx vitest run tests/items/ --reporter verbose`
Expected: All existing tests pass unchanged. The new codes are just union members — no runtime code uses them yet.

- [x] **Step 3: Commit**

```bash
git add src/items/types.ts
git commit -m "feat(items): add 4 LLM quality gate issue codes

UNNATURAL, INAUTHENTIC_CONTEXT, TEACHER_REJECT, WEAK_EXPLANATION.
Type-only change — no runtime behavior yet.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: LLM Rubric Prompt Template + Response Parser

**Files:**
- Create: `src/items/llm-rubric.ts`
- Create: `tests/items/llm-rubric.test.ts`

**Interfaces:**
- Consumes: `McqItem`, `ItemIssue`, `ItemIssueCode` from `types.ts`
- Produces:
  - `type LlmVerdict = 'pass' | 'warn' | 'reject'`
  - `interface LlmDimensionResult { verdict: LlmVerdict; reason: string }`
  - `interface LlmRubricResponse { naturalness, authenticity, teacherTest, explanatoryTransfer: LlmDimensionResult }`
  - `buildRubricPrompt(item: McqItem, nodeTitle: string): string`
  - `parseRubricResponse(raw: string): LlmRubricResponse | null`
  - `rubricToIssues(response: LlmRubricResponse): ItemIssue[]`

- [x] **Step 1: Write the failing tests**

Create `tests/items/llm-rubric.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import {
  buildRubricPrompt,
  parseRubricResponse,
  rubricToIssues,
} from '@/items/llm-rubric'
import type { McqItem } from '@/items/types'

// Fixture: a B1 present-perfect item used across all rubric tests.
const ITEM: McqItem = {
  id: 'rubric.test',
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past_simple'],
  level: 'B1',
}

// ─── buildRubricPrompt ───────────────────────────────────────────────────

describe('buildRubricPrompt', () => {
  it('includes the CEFR level and node title', () => {
    const prompt = buildRubricPrompt(ITEM, 'Present perfect vs past simple')
    expect(prompt).toContain('CEFR level B1')
    expect(prompt).toContain('Present perfect vs past simple')
  })

  it('marks the correct option with [correct]', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('have lost [correct]')
    // Distractors should NOT have [correct].
    expect(prompt).not.toContain('lost [correct]')
  })

  it('includes misconception text for distractors', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('misconception: "uses past simple though the result still matters now"')
  })

  it('labels options with A, B, C, D', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('A. have lost')
    expect(prompt).toContain('B. lost')
    expect(prompt).toContain('C. was losing')
    expect(prompt).toContain('D. am losing')
  })

  it('asks for JSON-only output', () => {
    const prompt = buildRubricPrompt(ITEM, 'Test')
    expect(prompt).toContain('Respond with JSON only')
  })
})

// ─── parseRubricResponse ─────────────────────────────────────────────────

describe('parseRubricResponse', () => {
  // A valid response with all 4 dimensions.
  const VALID_JSON = JSON.stringify({
    naturalness: { verdict: 'pass', reason: 'Sounds natural' },
    authenticity: { verdict: 'pass', reason: 'Plausible scenario' },
    teacherTest: { verdict: 'warn', reason: 'Slightly ambiguous' },
    explanatoryTransfer: { verdict: 'reject', reason: 'Labels without explaining' },
  })

  it('parses valid JSON', () => {
    const result = parseRubricResponse(VALID_JSON)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('pass')
    expect(result!.teacherTest.verdict).toBe('warn')
    expect(result!.explanatoryTransfer.verdict).toBe('reject')
  })

  it('strips markdown fences', () => {
    const fenced = '```json\n' + VALID_JSON + '\n```'
    const result = parseRubricResponse(fenced)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('pass')
  })

  it('returns null for invalid JSON', () => {
    expect(parseRubricResponse('I am a helpful assistant!')).toBeNull()
  })

  it('returns null for non-object JSON', () => {
    expect(parseRubricResponse('"just a string"')).toBeNull()
    expect(parseRubricResponse('42')).toBeNull()
    expect(parseRubricResponse('null')).toBeNull()
  })

  it('treats missing dimensions as pass', () => {
    // Only naturalness present, rest missing.
    const partial = JSON.stringify({
      naturalness: { verdict: 'reject', reason: 'Too formal' },
    })
    const result = parseRubricResponse(partial)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('reject')
    // Missing dimensions default to pass.
    expect(result!.authenticity.verdict).toBe('pass')
    expect(result!.teacherTest.verdict).toBe('pass')
    expect(result!.explanatoryTransfer.verdict).toBe('pass')
  })

  it('treats unknown verdict values as pass', () => {
    const weird = JSON.stringify({
      naturalness: { verdict: 'GOOD', reason: 'Nice' },
      authenticity: { verdict: 'maybe', reason: 'Hmm' },
      teacherTest: { verdict: 123, reason: 'Nope' },
      explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
    })
    const result = parseRubricResponse(weird)
    expect(result).not.toBeNull()
    // All unknowns default to pass.
    expect(result!.naturalness.verdict).toBe('pass')
    expect(result!.authenticity.verdict).toBe('pass')
    expect(result!.teacherTest.verdict).toBe('pass')
    expect(result!.explanatoryTransfer.verdict).toBe('pass')
  })

  it('handles missing reason gracefully', () => {
    const noReason = JSON.stringify({
      naturalness: { verdict: 'reject' },
      authenticity: { verdict: 'pass', reason: 'OK' },
      teacherTest: { verdict: 'pass', reason: 'OK' },
      explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
    })
    const result = parseRubricResponse(noReason)
    expect(result).not.toBeNull()
    expect(result!.naturalness.verdict).toBe('reject')
    expect(result!.naturalness.reason).toBe('')
  })
})

// ─── rubricToIssues ──────────────────────────────────────────────────────

describe('rubricToIssues', () => {
  it('returns no issues when all dimensions pass', () => {
    const allPass = {
      naturalness: { verdict: 'pass' as const, reason: '' },
      authenticity: { verdict: 'pass' as const, reason: '' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    expect(rubricToIssues(allPass)).toHaveLength(0)
  })

  it('maps reject to the correct issue code', () => {
    const oneReject = {
      naturalness: { verdict: 'reject' as const, reason: 'Stilted phrasing' },
      authenticity: { verdict: 'pass' as const, reason: '' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    const issues = rubricToIssues(oneReject)
    expect(issues).toHaveLength(1)
    expect(issues[0]!.code).toBe('UNNATURAL')
    expect(issues[0]!.severity).toBe('reject')
    expect(issues[0]!.message).toBe('Stilted phrasing')
  })

  it('maps warn to the correct severity', () => {
    const oneWarn = {
      naturalness: { verdict: 'pass' as const, reason: '' },
      authenticity: { verdict: 'warn' as const, reason: 'Borderline plausible' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    const issues = rubricToIssues(oneWarn)
    expect(issues).toHaveLength(1)
    expect(issues[0]!.code).toBe('INAUTHENTIC_CONTEXT')
    expect(issues[0]!.severity).toBe('warn')
  })

  it('maps all 4 dimensions to their codes', () => {
    const allReject = {
      naturalness: { verdict: 'reject' as const, reason: 'a' },
      authenticity: { verdict: 'reject' as const, reason: 'b' },
      teacherTest: { verdict: 'reject' as const, reason: 'c' },
      explanatoryTransfer: { verdict: 'reject' as const, reason: 'd' },
    }
    const codes = rubricToIssues(allReject).map((i) => i.code)
    expect(codes).toContain('UNNATURAL')
    expect(codes).toContain('INAUTHENTIC_CONTEXT')
    expect(codes).toContain('TEACHER_REJECT')
    expect(codes).toContain('WEAK_EXPLANATION')
  })

  it('uses a fallback message when reason is empty', () => {
    const noReason = {
      naturalness: { verdict: 'reject' as const, reason: '' },
      authenticity: { verdict: 'pass' as const, reason: '' },
      teacherTest: { verdict: 'pass' as const, reason: '' },
      explanatoryTransfer: { verdict: 'pass' as const, reason: '' },
    }
    const issues = rubricToIssues(noReason)
    expect(issues[0]!.message).toContain('naturalness')
  })
})
```

- [x] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/items/llm-rubric.test.ts --reporter verbose`
Expected: FAIL — module `@/items/llm-rubric` does not exist yet.

- [x] **Step 3: Write the implementation**

Create `src/items/llm-rubric.ts`:

```typescript
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

// The set of accepted verdict strings. Anything else is treated as 'pass'
// (fail-open: the deterministic gates already cleared this item).
const VERDICTS = new Set<LlmVerdict>(['pass', 'warn', 'reject'])

// Normalize a verdict value. Unknown values default to 'pass'.
function normalizeVerdict(v: unknown): LlmVerdict {
  if (typeof v === 'string' && VERDICTS.has(v as LlmVerdict)) return v as LlmVerdict
  return 'pass'
}

// Normalize a dimension result. Missing or malformed objects get pass + empty reason.
function normalizeDimension(d: unknown): LlmDimensionResult {
  if (typeof d !== 'object' || d === null) return { verdict: 'pass', reason: '' }
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
  // Strip markdown fences if the model wrapped its JSON (same pattern as
  // parseModelOutput in provider.ts).
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
```

- [x] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/items/llm-rubric.test.ts --reporter verbose`
Expected: All tests pass.

- [x] **Step 5: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 872+ tests pass.

- [x] **Step 6: Commit**

```bash
git add src/items/llm-rubric.ts tests/items/llm-rubric.test.ts
git commit -m "feat(items): add LLM rubric prompt builder and response parser

Pure functions: buildRubricPrompt, parseRubricResponse, rubricToIssues.
Fail-open on invalid JSON or unknown verdicts. No provider dependency.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: LLM Review Orchestrator

**Files:**
- Create: `src/items/llm-review.ts`
- Create: `tests/items/llm-review.test.ts`

**Interfaces:**
- Consumes: `buildRubricPrompt`, `parseRubricResponse`, `rubricToIssues`, `LlmRubricResponse` from `llm-rubric.ts`
- Consumes: `GenerationProvider` from `@/generation/provider`
- Consumes: `McqItem`, `ItemIssue` from `types.ts`
- Produces:
  - `interface LlmReview { passed: boolean; issues: ItemIssue[]; raw: LlmRubricResponse | null }`
  - `reviewItemLlm(item: McqItem, provider: GenerationProvider, nodeTitle: string): Promise<LlmReview>`

- [x] **Step 1: Write the failing tests**

Create `tests/items/llm-review.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { reviewItemLlm } from '@/items/llm-review'
import type { GenerationProvider, GenerationRequest, GenerationResponse } from '@/generation/provider'
import type { McqItem } from '@/items/types'
import type { LlmRubricResponse } from '@/items/llm-rubric'

// Fixture: a B1 present-perfect item.
const ITEM: McqItem = {
  id: 'llm-review.test',
  stem: 'I ______ my keys. I cannot open the door.',
  options: [
    { text: 'have lost', misconception: null },
    { text: 'lost', misconception: 'uses past simple though the result still matters now' },
    { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    { text: 'am losing', misconception: 'places a finished event in the present moment' },
  ],
  correctIndex: 0,
  nodeIds: ['gram.b1.pp_vs_past_simple'],
  level: 'B1',
}

// Helper: build a provider that returns a fixed rubric response as JSON.
function rubricProvider(response: LlmRubricResponse): GenerationProvider {
  return {
    async generate(_req: GenerationRequest): Promise<GenerationResponse> {
      return { raw: JSON.stringify(response), parsed: null }
    },
  }
}

// Helper: build a provider that returns raw text (not valid rubric JSON).
function rawProvider(text: string): GenerationProvider {
  return {
    async generate(): Promise<GenerationResponse> {
      return { raw: text, parsed: null }
    },
  }
}

// A response where all 4 dimensions pass.
const ALL_PASS: LlmRubricResponse = {
  naturalness: { verdict: 'pass', reason: 'Natural' },
  authenticity: { verdict: 'pass', reason: 'Plausible' },
  teacherTest: { verdict: 'pass', reason: 'Usable' },
  explanatoryTransfer: { verdict: 'pass', reason: 'Helpful' },
}

// A response where naturalness rejects.
const ONE_REJECT: LlmRubricResponse = {
  naturalness: { verdict: 'reject', reason: 'Stilted phrasing' },
  authenticity: { verdict: 'pass', reason: 'Plausible' },
  teacherTest: { verdict: 'pass', reason: 'Usable' },
  explanatoryTransfer: { verdict: 'pass', reason: 'Helpful' },
}

// A response where one dimension warns.
const ONE_WARN: LlmRubricResponse = {
  naturalness: { verdict: 'pass', reason: 'OK' },
  authenticity: { verdict: 'warn', reason: 'Borderline plausible' },
  teacherTest: { verdict: 'pass', reason: 'OK' },
  explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
}

describe('reviewItemLlm', () => {
  it('passes when all dimensions pass', async () => {
    const result = await reviewItemLlm(ITEM, rubricProvider(ALL_PASS), 'Present perfect vs past simple')
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(0)
    expect(result.raw).not.toBeNull()
  })

  it('fails when any dimension rejects', async () => {
    const result = await reviewItemLlm(ITEM, rubricProvider(ONE_REJECT), 'Present perfect vs past simple')
    expect(result.passed).toBe(false)
    expect(result.issues).toHaveLength(1)
    expect(result.issues[0]!.code).toBe('UNNATURAL')
    expect(result.issues[0]!.severity).toBe('reject')
  })

  it('passes with warnings (warns do not block)', async () => {
    const result = await reviewItemLlm(ITEM, rubricProvider(ONE_WARN), 'Present perfect vs past simple')
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(1)
    expect(result.issues[0]!.code).toBe('INAUTHENTIC_CONTEXT')
    expect(result.issues[0]!.severity).toBe('warn')
  })

  it('fail-open on unparseable output', async () => {
    const result = await reviewItemLlm(ITEM, rawProvider('I cannot evaluate this item.'), 'Test')
    // Unparseable LLM output = pass with no issues. The deterministic
    // gates already cleared this item.
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(0)
    expect(result.raw).toBeNull()
  })

  it('fail-open on markdown-wrapped garbage', async () => {
    const result = await reviewItemLlm(ITEM, rawProvider('```json\nnot json\n```'), 'Test')
    expect(result.passed).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  it('passes the prompt to the provider', async () => {
    let captured: GenerationRequest | null = null
    const spy: GenerationProvider = {
      async generate(req) {
        captured = req
        return { raw: JSON.stringify(ALL_PASS), parsed: null }
      },
    }

    await reviewItemLlm(ITEM, spy, 'Present perfect vs past simple')

    expect(captured).not.toBeNull()
    expect(captured!.prompt).toContain('CEFR level B1')
    expect(captured!.prompt).toContain('Present perfect vs past simple')
    expect(captured!.prompt).toContain('have lost [correct]')
  })

  it('handles multiple rejects across dimensions', async () => {
    const multiReject: LlmRubricResponse = {
      naturalness: { verdict: 'reject', reason: 'Stilted' },
      authenticity: { verdict: 'reject', reason: 'Absurd scenario' },
      teacherTest: { verdict: 'pass', reason: 'OK' },
      explanatoryTransfer: { verdict: 'warn', reason: 'Could be better' },
    }
    const result = await reviewItemLlm(ITEM, rubricProvider(multiReject), 'Test')
    expect(result.passed).toBe(false)
    // 2 rejects + 1 warn = 3 issues.
    expect(result.issues).toHaveLength(3)
    const codes = result.issues.map((i) => i.code)
    expect(codes).toContain('UNNATURAL')
    expect(codes).toContain('INAUTHENTIC_CONTEXT')
    expect(codes).toContain('WEAK_EXPLANATION')
  })
})
```

- [x] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/items/llm-review.test.ts --reporter verbose`
Expected: FAIL — module `@/items/llm-review` does not exist yet.

- [x] **Step 3: Write the implementation**

Create `src/items/llm-review.ts`:

```typescript
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
```

- [x] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/items/llm-review.test.ts --reporter verbose`
Expected: All tests pass.

- [x] **Step 5: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 872+ tests pass.

- [x] **Step 6: Commit**

```bash
git add src/items/llm-review.ts tests/items/llm-review.test.ts
git commit -m "feat(items): add LLM quality review orchestrator

reviewItemLlm() calls a provider with the rubric prompt, parses the
structured response, and returns pass/fail with issues. Fail-open on
unparseable LLM output.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Wire LLM Gates into the Generation Loop

**Files:**
- Modify: `src/generation/generate.ts:19-25` — add `qualityProvider` to `GenerateItemRequest`
- Modify: `src/generation/generate.ts:57-105` — call `reviewItemLlm` on deterministic survivors
- Modify: `tests/generation/generate.test.ts` — add tests for qualityProvider behavior

**Interfaces:**
- Consumes: `reviewItemLlm(item, provider, nodeTitle): Promise<LlmReview>` from `llm-review.ts`
- Consumes: `LlmReview` from `llm-review.ts`
- Produces: `GenerateItemRequest.qualityProvider?: GenerationProvider` (new optional field)

- [x] **Step 1: Write the failing tests**

Add the following tests to `tests/generation/generate.test.ts` at the end of the existing `describe('generateItem')` block:

```typescript
  // ─── LLM quality gates ─────────────────────────────────────────────────

  it('skips LLM gates when qualityProvider is absent (backwards compat)', async () => {
    // This is the existing behavior — no qualityProvider, no LLM call.
    const provider = sequenceProvider([GOOD_MCQ])
    const result = await generateItem(provider, inventory, {
      node: node(),
      itemId: 'item.gen.llm.1',
    })

    expect(result.item).not.toBeNull()
    expect(result.review!.passed).toBe(true)
    // No LLM issue codes in the review.
    const llmCodes = ['UNNATURAL', 'INAUTHENTIC_CONTEXT', 'TEACHER_REJECT', 'WEAK_EXPLANATION']
    expect(result.review!.issues.filter((i) => llmCodes.includes(i.code))).toHaveLength(0)
  })

  it('runs LLM gates when qualityProvider is present and passes', async () => {
    const genProvider = sequenceProvider([GOOD_MCQ])
    // LLM quality review returns all-pass.
    const qualityProvider = sequenceProvider([
      {
        naturalness: { verdict: 'pass', reason: 'Natural' },
        authenticity: { verdict: 'pass', reason: 'Plausible' },
        teacherTest: { verdict: 'pass', reason: 'Usable' },
        explanatoryTransfer: { verdict: 'pass', reason: 'Helpful' },
      },
    ])

    const result = await generateItem(genProvider, inventory, {
      node: node(),
      itemId: 'item.gen.llm.2',
      qualityProvider,
    })

    expect(result.item).not.toBeNull()
    expect(result.review!.passed).toBe(true)
    expect(result.attempts).toHaveLength(1)
    expect(result.attempts[0]!.kind).toBe('success')
  })

  it('rejects when LLM gates fail and retries', async () => {
    // First attempt: deterministic passes, LLM rejects.
    // Second attempt: deterministic passes, LLM passes.
    const genProvider = sequenceProvider([GOOD_MCQ, GOOD_MCQ])

    let qualityCalls = 0
    const qualityProvider: GenerationProvider = {
      async generate(): Promise<GenerationResponse> {
        qualityCalls++
        if (qualityCalls === 1) {
          // First call: reject naturalness.
          return {
            raw: JSON.stringify({
              naturalness: { verdict: 'reject', reason: 'Stilted' },
              authenticity: { verdict: 'pass', reason: 'OK' },
              teacherTest: { verdict: 'pass', reason: 'OK' },
              explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
            }),
            parsed: null,
          }
        }
        // Second call: all pass.
        return {
          raw: JSON.stringify({
            naturalness: { verdict: 'pass', reason: 'Natural' },
            authenticity: { verdict: 'pass', reason: 'OK' },
            teacherTest: { verdict: 'pass', reason: 'OK' },
            explanatoryTransfer: { verdict: 'pass', reason: 'OK' },
          }),
          parsed: null,
        }
      },
    }

    const result = await generateItem(genProvider, inventory, {
      node: node(),
      itemId: 'item.gen.llm.3',
      qualityProvider,
    })

    expect(result.item).not.toBeNull()
    expect(result.review!.passed).toBe(true)
    expect(result.attempts).toHaveLength(2)
    expect(result.attempts[0]!.kind).toBe('gate_failure')
    // The first attempt's review should contain the UNNATURAL issue.
    const firstReview = (result.attempts[0] as { kind: 'gate_failure'; review: { issues: Array<{ code: string }> } }).review
    expect(firstReview.issues.some((i) => i.code === 'UNNATURAL')).toBe(true)
    expect(result.attempts[1]!.kind).toBe('success')
  })

  it('fail-open: LLM returns garbage, item still passes', async () => {
    const genProvider = sequenceProvider([GOOD_MCQ])
    // Quality provider returns unparseable text.
    const qualityProvider = sequenceProvider(['I cannot evaluate this.'])

    const result = await generateItem(genProvider, inventory, {
      node: node(),
      itemId: 'item.gen.llm.4',
      qualityProvider,
    })

    // Fail-open: the item passes because deterministic gates passed and
    // the LLM review could not be parsed.
    expect(result.item).not.toBeNull()
    expect(result.review!.passed).toBe(true)
    expect(result.attempts).toHaveLength(1)
    expect(result.attempts[0]!.kind).toBe('success')
  })

  it('LLM warnings appear in the review but do not block', async () => {
    const genProvider = sequenceProvider([GOOD_MCQ])
    const qualityProvider = sequenceProvider([
      {
        naturalness: { verdict: 'pass', reason: '' },
        authenticity: { verdict: 'warn', reason: 'Borderline scenario' },
        teacherTest: { verdict: 'pass', reason: '' },
        explanatoryTransfer: { verdict: 'pass', reason: '' },
      },
    ])

    const result = await generateItem(genProvider, inventory, {
      node: node(),
      itemId: 'item.gen.llm.5',
      qualityProvider,
    })

    expect(result.item).not.toBeNull()
    expect(result.review!.passed).toBe(true)
    // The warning should be in the issues.
    expect(result.review!.issues.some((i) => i.code === 'INAUTHENTIC_CONTEXT' && i.severity === 'warn')).toBe(true)
  })

  it('does not call qualityProvider when deterministic gates fail', async () => {
    const genProvider = sequenceProvider([BAD_MCQ, GOOD_MCQ])
    let qualityCalls = 0
    const qualityProvider: GenerationProvider = {
      async generate(): Promise<GenerationResponse> {
        qualityCalls++
        return {
          raw: JSON.stringify({
            naturalness: { verdict: 'pass', reason: '' },
            authenticity: { verdict: 'pass', reason: '' },
            teacherTest: { verdict: 'pass', reason: '' },
            explanatoryTransfer: { verdict: 'pass', reason: '' },
          }),
          parsed: null,
        }
      },
    }

    const result = await generateItem(genProvider, inventory, {
      node: node(),
      itemId: 'item.gen.llm.6',
      qualityProvider,
    })

    expect(result.item).not.toBeNull()
    expect(result.attempts).toHaveLength(2)
    // First attempt was a deterministic gate failure — LLM should NOT
    // have been called for it.
    expect(result.attempts[0]!.kind).toBe('gate_failure')
    // Only 1 quality call (for the second attempt that passed deterministic).
    expect(qualityCalls).toBe(1)
  })
```

Note: `GenerationResponse` is already imported on line 4 of the existing file — no new imports needed for the tests.

- [x] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/generation/generate.test.ts --reporter verbose`
Expected: FAIL — `GenerateItemRequest` does not have `qualityProvider` yet.

- [x] **Step 3: Modify generate.ts**

In `src/generation/generate.ts`, make the following changes:

**3a. Add import for reviewItemLlm:**

After the existing `import { parseModelOutput } from './provider'` line, add:

```typescript
import { reviewItemLlm } from '@/items/llm-review'
```

**3b. Add `qualityProvider` to `GenerateItemRequest`:**

Change the `GenerateItemRequest` interface to:

```typescript
export interface GenerateItemRequest {
  node: SkillNode
  level?: CefrLevel
  itemId: string
  // Stems already in the item bank, for duplicate detection.
  existingStems?: string[]
  // When provided, LLM quality gates run on items that pass the
  // deterministic gates. When absent, LLM gates are skipped
  // (backwards compatible with all existing callers).
  qualityProvider?: GenerationProvider
}
```

**3c. Add LLM gate check after the deterministic review:**

Replace this section (lines ~83-91):

```typescript
    const item = toMcqItem(parsed, request.itemId, level)
    const review = reviewItem(item, reviewContext)

    if (!review.passed) {
      attempts.push({ kind: 'gate_failure', item, review })
      continue
    }

    attempts.push({ kind: 'success', item, review })
    return { item, review, attempts }
```

With:

```typescript
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
      // Merge deterministic and LLM issues into one review. LLM issues
      // are appended after the deterministic ones.
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
```

- [x] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/generation/generate.test.ts --reporter verbose`
Expected: All tests pass (existing + new).

- [x] **Step 5: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 872+ tests pass. Existing callers that don't pass `qualityProvider` are unaffected.

- [x] **Step 6: Commit**

```bash
git add src/generation/generate.ts tests/generation/generate.test.ts
git commit -m "feat(generation): wire LLM quality gates into generate loop

Items that pass deterministic gates are evaluated by reviewItemLlm when
qualityProvider is present. LLM rejection triggers retry. Fail-open on
unparseable LLM output. Backwards compatible — existing callers unchanged.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Golden Set Calibration Items + Integration Tests

**Files:**
- Create: `tests/items/golden-quality.test.ts`

**Interfaces:**
- Consumes: `reviewItemLlm(item, provider, nodeTitle): Promise<LlmReview>` from `llm-review.ts`
- Consumes: `GenerationProvider` from `@/generation/provider`
- Consumes: `McqItem` from `types.ts`
- Consumes: `LlmVerdict` from `llm-rubric.ts`
- Produces: Golden set calibration tests (integration, gated behind `QUALITY_PROVIDER` env var)

- [x] **Step 1: Write the golden set test file**

Create `tests/items/golden-quality.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { reviewItemLlm } from '@/items/llm-review'
import type { LlmReview } from '@/items/llm-review'
import type { LlmVerdict } from '@/items/llm-rubric'
import type { GenerationProvider, GenerationRequest, GenerationResponse } from '@/generation/provider'
import type { McqItem } from '@/items/types'

// ─── Integration provider ────────────────────────────────────────────────
// Gated behind QUALITY_PROVIDER env var. When absent, all tests skip.
// Set QUALITY_PROVIDER to a Gemini API key to run calibration.

const QUALITY_PROVIDER = process.env.QUALITY_PROVIDER

// Minimal Gemini Flash provider for integration tests. No external
// dependencies — just a fetch call to the Gemini API.
function createGeminiProvider(apiKey: string): GenerationProvider {
  return {
    async generate(req: GenerationRequest): Promise<GenerationResponse> {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: req.prompt }] }],
          generationConfig: { maxOutputTokens: req.maxTokens },
        }),
      })
      const data = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
      }
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
      return { raw, parsed: null }
    },
  }
}

// ─── Helper ──────────────────────────────────────────────────────────────

// Build an MCQ with defaults. Each golden item overrides only what matters.
function mcq(overrides: Partial<McqItem> & { stem: string }): McqItem {
  return {
    id: 'golden.quality',
    level: 'B1',
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    correctIndex: 0,
    options: [
      { text: 'have lost', misconception: null },
      { text: 'lost', misconception: 'uses past simple though the result still matters now' },
      { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
      { text: 'am losing', misconception: 'places a finished event in the present moment' },
    ],
    ...overrides,
  }
}

// ─── Expected labels ─────────────────────────────────────────────────────

interface GoldenQualityItem {
  label: string
  item: McqItem
  nodeTitle: string
  expected: {
    naturalness: LlmVerdict
    authenticity: LlmVerdict
    teacherTest: LlmVerdict
    explanatoryTransfer: LlmVerdict
  }
}

// ─── GOLDEN GOOD ITEMS ───────────────────────────────────────────────────
// These are well-crafted items that should pass all 4 dimensions.

const goodItems: GoldenQualityItem[] = [
  {
    label: 'B1 present perfect: result still matters',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({ stem: 'I ______ my keys. I cannot open the door.' }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'B1 present perfect: experience',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'She ______ to three different countries.',
      options: [
        { text: 'has been', misconception: null },
        { text: 'went', misconception: 'uses past simple for a life experience with no time frame' },
        { text: 'was going', misconception: 'treats a life summary as a continuous action' },
        { text: 'is going', misconception: 'places a past experience in the present' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'A2 past simple: regular verb',
    nodeTitle: 'Past simple with regular verbs',
    item: mcq({
      stem: 'They ______ football every Saturday when they were young.',
      level: 'A2',
      nodeIds: ['gram.a2.past_simple_regular'],
      options: [
        { text: 'played', misconception: null },
        { text: 'play', misconception: 'uses present tense for a finished habit' },
        { text: 'are playing', misconception: 'treats a past habit as a current action' },
        { text: 'have played', misconception: 'uses present perfect for a habit that has ended' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'A1 to-be: subject-verb agreement',
    nodeTitle: 'To be: am, is, are',
    item: mcq({
      stem: 'My sister ______ a teacher.',
      level: 'A1',
      nodeIds: ['gram.a1.to_be'],
      options: [
        { text: 'is', misconception: null },
        { text: 'are', misconception: 'applies plural agreement to a singular subject' },
        { text: 'am', misconception: 'applies first-person agreement to a third-person subject' },
        { text: 'be', misconception: 'uses the bare infinitive instead of a conjugated form' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'B2 third conditional',
    nodeTitle: 'Third conditional',
    item: mcq({
      stem: 'If I ______ the email, I would have replied immediately.',
      level: 'B2',
      nodeIds: ['gram.b2.third_conditional'],
      options: [
        { text: 'had seen', misconception: null },
        { text: 'saw', misconception: 'uses second conditional form for an unreal past event' },
        { text: 'have seen', misconception: 'uses present perfect for a hypothetical past situation' },
        { text: 'would see', misconception: 'places the would-clause in both halves of the conditional' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'B1 modal: advice with should',
    nodeTitle: 'Modals: should for advice',
    item: mcq({
      stem: 'You look tired. You ______ to bed early tonight.',
      nodeIds: ['gram.b1.modal_should'],
      options: [
        { text: 'should go', misconception: null },
        { text: 'must go', misconception: 'selects obligation when the context calls for advice' },
        { text: 'would go', misconception: 'uses hypothetical would for a real suggestion' },
        { text: 'could go', misconception: 'weakens advice to mere possibility' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'C1 inversion after negative adverbial',
    nodeTitle: 'Inversion after negative adverbials',
    item: mcq({
      stem: 'Not only ______ the report, but she also presented it to the board.',
      level: 'C1',
      nodeIds: ['gram.c1.inversion'],
      options: [
        { text: 'did she write', misconception: null },
        { text: 'she wrote', misconception: 'keeps normal word order after a fronted negative adverbial' },
        { text: 'she did write', misconception: 'uses emphatic do without inverting subject and auxiliary' },
        { text: 'wrote she', misconception: 'inverts main verb and subject instead of inserting do-support' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'A2 comparative adjective',
    nodeTitle: 'Comparative adjectives',
    item: mcq({
      stem: 'This book is ______ than the one I read before.',
      level: 'A2',
      nodeIds: ['gram.a2.comparatives'],
      options: [
        { text: 'more interesting', misconception: null },
        { text: 'interestinger', misconception: 'applies -er rule to a multi-syllable adjective' },
        { text: 'most interesting', misconception: 'uses the superlative form in a comparison of two' },
        { text: 'interesting', misconception: 'omits the comparative marker entirely' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  // 2 additional items at extreme levels for rubric sensitivity testing.
  {
    label: 'A1 simple present: daily routine',
    nodeTitle: 'Simple present for routines',
    item: mcq({
      stem: 'I ______ breakfast every morning.',
      level: 'A1',
      nodeIds: ['gram.a1.simple_present'],
      options: [
        { text: 'eat', misconception: null },
        { text: 'eats', misconception: 'applies third-person -s to a first-person subject' },
        { text: 'eating', misconception: 'uses the gerund form as a main verb without a helper' },
        { text: 'ate', misconception: 'uses past tense for a regular daily habit' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'C1 mixed conditional',
    nodeTitle: 'Mixed conditionals',
    item: mcq({
      stem: 'If she had studied medicine, she ______ a doctor now.',
      level: 'C1',
      nodeIds: ['gram.c1.mixed_conditional'],
      options: [
        { text: 'would be', misconception: null },
        { text: 'would have been', misconception: 'uses third conditional result for a present-time consequence' },
        { text: 'will be', misconception: 'uses first conditional form for an unreal past condition' },
        { text: 'is', misconception: 'states the present result as fact when the condition is unreal' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
]

// ─── GOLDEN BAD ITEMS ────────────────────────────────────────────────────
// Each has a specific quality defect the LLM should catch.

const badItems: GoldenQualityItem[] = [
  // 2 unnatural items.
  {
    label: 'unnatural: over-formal register for A2',
    nodeTitle: 'Past simple with regular verbs',
    item: mcq({
      stem: 'I proceeded to the educational institution and ______ my scholarly obligations.',
      level: 'A2',
      nodeIds: ['gram.a2.past_simple_regular'],
      options: [
        { text: 'completed', misconception: null },
        { text: 'complete', misconception: 'uses present tense for a past event' },
        { text: 'completing', misconception: 'uses the gerund as a finite verb' },
        { text: 'have completed', misconception: 'uses present perfect for a simple past narrative' },
      ],
    }),
    expected: { naturalness: 'reject', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'unnatural: textbook-stilted construction',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'The boy, who is my neighbor, ______ his bicycle to the repair shop which is located on Main Street.',
      options: [
        { text: 'has taken', misconception: null },
        { text: 'took', misconception: 'uses past simple when the action has current relevance' },
        { text: 'was taking', misconception: 'treats a completed action as ongoing in the past' },
        { text: 'takes', misconception: 'uses present simple for a specific recent action' },
      ],
    }),
    expected: { naturalness: 'reject', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  // 2 inauthentic context items.
  {
    label: 'inauthentic: absurd scenario',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'The cat ______ the quarterly financial report to the board of directors.',
      options: [
        { text: 'has submitted', misconception: null },
        { text: 'submitted', misconception: 'uses past simple when the submission has current relevance' },
        { text: 'was submitting', misconception: 'treats a completed submission as ongoing' },
        { text: 'submits', misconception: 'uses present simple for a specific past event' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'reject', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'inauthentic: grammar shoehorned into implausible context',
    nodeTitle: 'Third conditional',
    item: mcq({
      stem: 'If the pencil ______ the algebra test, it would have graduated from university.',
      level: 'B2',
      nodeIds: ['gram.b2.third_conditional'],
      options: [
        { text: 'had passed', misconception: null },
        { text: 'passed', misconception: 'uses second conditional form for an unreal past event' },
        { text: 'has passed', misconception: 'uses present perfect for a hypothetical past situation' },
        { text: 'would pass', misconception: 'places the would-clause in both halves of the conditional' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'reject', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  // 2 teacher-reject items.
  {
    label: 'teacher reject: ambiguous stem with two defensible answers',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'She ______ in London.',
      options: [
        { text: 'has lived', misconception: null },
        { text: 'lived', misconception: 'uses past simple for an ongoing situation' },
        { text: 'was living', misconception: 'treats a state as a temporary action' },
        { text: 'is living', misconception: 'uses present continuous for a permanent state' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'reject', explanatoryTransfer: 'pass' },
  },
  {
    label: 'teacher reject: correct answer depends on unstated context',
    nodeTitle: 'Modals: should for advice',
    item: mcq({
      stem: 'You ______ talk to someone about it.',
      nodeIds: ['gram.b1.modal_should'],
      options: [
        { text: 'should', misconception: null },
        { text: 'could', misconception: 'weakens advice to mere possibility' },
        { text: 'must', misconception: 'selects obligation when the context calls for advice' },
        { text: 'would', misconception: 'uses hypothetical would for a real suggestion' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'reject', explanatoryTransfer: 'pass' },
  },
  // 2 weak-explanation items.
  {
    label: 'weak explanation: labels without explaining',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'I ______ my keys. I cannot open the door.',
      options: [
        { text: 'have lost', misconception: null },
        { text: 'lost', misconception: 'wrong tense' },
        { text: 'was losing', misconception: 'wrong form' },
        { text: 'am losing', misconception: 'incorrect' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'reject' },
  },
  {
    label: 'weak explanation: meta-commentary instead of teaching',
    nodeTitle: 'Past simple with regular verbs',
    item: mcq({
      stem: 'They ______ football every Saturday when they were young.',
      level: 'A2',
      nodeIds: ['gram.a2.past_simple_regular'],
      options: [
        { text: 'played', misconception: null },
        { text: 'play', misconception: 'this is a common mistake students make' },
        { text: 'are playing', misconception: 'learners often confuse this' },
        { text: 'have played', misconception: 'this distractor tests tense awareness' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'pass', explanatoryTransfer: 'reject' },
  },
  // 2 multi-dimensional failures.
  {
    label: 'multi: unnatural + inauthentic',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'The refrigerator ______ the philosophical implications of quantum mechanics with great enthusiasm.',
      options: [
        { text: 'has discussed', misconception: null },
        { text: 'discussed', misconception: 'uses past simple for current relevance' },
        { text: 'was discussing', misconception: 'treats as ongoing' },
        { text: 'discusses', misconception: 'uses present for past' },
      ],
    }),
    expected: { naturalness: 'reject', authenticity: 'reject', teacherTest: 'pass', explanatoryTransfer: 'pass' },
  },
  {
    label: 'multi: teacher-reject + weak-explanation',
    nodeTitle: 'Present perfect vs past simple',
    item: mcq({
      stem: 'He ______ the book.',
      options: [
        { text: 'has read', misconception: null },
        { text: 'read', misconception: 'wrong' },
        { text: 'was reading', misconception: 'bad choice' },
        { text: 'reads', misconception: 'error' },
      ],
    }),
    expected: { naturalness: 'pass', authenticity: 'pass', teacherTest: 'reject', explanatoryTransfer: 'reject' },
  },
]

// ─── Calibration tests ───────────────────────────────────────────────────
// These tests run the rubric prompt against a real LLM and compare the
// verdicts to human labels. They assert agreement rate >= 80% per
// dimension, not per-item exactness (LLMs are non-deterministic).

describe.skipIf(!QUALITY_PROVIDER)('golden quality set calibration', () => {
  // Create the provider once for all tests.
  const provider = QUALITY_PROVIDER ? createGeminiProvider(QUALITY_PROVIDER) : null

  // Collect all items for batch processing.
  const allItems = [...goodItems, ...badItems]

  // Run all items through the rubric and collect results.
  let results: Array<{ item: GoldenQualityItem; review: LlmReview }> = []

  // Run before all tests — evaluate every golden item once.
  it('evaluates all 20 golden items', async () => {
    results = await Promise.all(
      allItems.map(async (golden) => {
        const review = await reviewItemLlm(golden.item, provider!, golden.nodeTitle)
        return { item: golden, review }
      }),
    )

    // Sanity check: we got results for all items.
    expect(results).toHaveLength(20)
  }, 60_000) // 60s timeout for 20 LLM calls.

  // Helper: compute agreement rate for one dimension.
  function agreementRate(dimension: keyof GoldenQualityItem['expected']): number {
    if (results.length === 0) return 0

    // Map dimension name to the rubric response key.
    const rubricKey = dimension as keyof NonNullable<LlmReview['raw']>

    let agreements = 0
    for (const { item, review } of results) {
      // If the LLM returned unparseable output, treat as disagreement.
      if (!review.raw) continue

      const expected = item.expected[dimension]
      const actual = review.raw[rubricKey].verdict

      // For calibration, we check exact verdict match. In practice,
      // warn vs reject disagreements are less critical than pass vs
      // reject, but exact match is the strictest calibration.
      //
      // Relaxed match: pass agrees with pass; non-pass agrees with
      // non-pass. This is more forgiving for warn/reject boundaries.
      const passExpected = expected === 'pass'
      const passActual = actual === 'pass'
      if (passExpected === passActual) agreements++
    }

    return agreements / results.length
  }

  it('agrees with human labels on >= 80% of naturalness verdicts', () => {
    const rate = agreementRate('naturalness')
    expect(rate, `Naturalness agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })

  it('agrees with human labels on >= 80% of authenticity verdicts', () => {
    const rate = agreementRate('authenticity')
    expect(rate, `Authenticity agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })

  it('agrees with human labels on >= 80% of teacherTest verdicts', () => {
    const rate = agreementRate('teacherTest')
    expect(rate, `Teacher test agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })

  it('agrees with human labels on >= 80% of explanatoryTransfer verdicts', () => {
    const rate = agreementRate('explanatoryTransfer')
    expect(rate, `Explanatory transfer agreement: ${(rate * 100).toFixed(0)}%`).toBeGreaterThanOrEqual(0.8)
  })
})
```

- [x] **Step 2: Run tests to verify they skip (no env var)**

Run: `npx vitest run tests/items/golden-quality.test.ts --reporter verbose`
Expected: All tests skipped (QUALITY_PROVIDER not set).

- [x] **Step 3: Run full suite to check for regressions**

Run: `npx vitest run --reporter verbose`
Expected: All 872+ tests pass. Golden quality tests are skipped.

- [x] **Step 4: Commit**

```bash
git add tests/items/golden-quality.test.ts
git commit -m "test(items): add golden quality set for LLM rubric calibration

20 items (10 good, 10 bad) with human-assigned quality labels across
4 dimensions. Integration tests gated behind QUALITY_PROVIDER env var.
Asserts >= 80% agreement per dimension.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
