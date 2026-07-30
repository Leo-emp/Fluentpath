# R1b-e: LLM-Judged Quality Gates — Design Spec

**Date:** 2026-07-31
**Status:** Draft for review
**Depends on:** R1b-b (8 deterministic gates — done), generation pipeline with `GenerationProvider` interface (done)

---

## Goal

Add a second quality layer — LLM-judged — on top of the 8 deterministic correctness gates. These catch **subjectively bad items** that are structurally sound but pedagogically poor: unnatural language, implausible scenarios, items a teacher would rewrite, and misconception text that doesn't help learning.

The deterministic gates answer "is this item correct?" The LLM gates answer "is this item good?"

---

## Why these four dimensions

| Dimension | What it catches | Why it matters |
|---|---|---|
| Naturalness | Stilted, textbook-sounding language that nobody actually says or writes | Spec quality bar: "every sentence the learner reads must be language that a competent speaker would actually produce in that situation." Unnatural input trains unnatural output — the learner internalizes patterns they'll never encounter in the real world |
| Contextual authenticity | Scenarios that are grammatically valid but situationally implausible | "The cat ______ the quarterly report" passes every deterministic gate. But a learner who practices with nonsense scenarios builds no transfer to real communication |
| Teacher test | Items a qualified ESL teacher would rewrite before using in class | The integration test: would a professional whose career depends on student outcomes put their name on this item? If not, something is wrong that the other dimensions haven't named |
| Explanatory transfer | Misconception text that doesn't actually help the learner understand their error | The misconception is the diagnosis engine's primary output. If it says "uses past simple" instead of "uses past simple because the event feels finished, but the result still matters now — the present perfect connects the past to the present," the learner gets a label, not an explanation |

---

## Architecture

### Two-tier review

```
Item generated
  │
  ▼
reviewItem() — 8 deterministic gates (sync, pure, free)
  │
  ├─ reject → retry generation
  │
  ▼
reviewItemLlm() — 4 quality dimensions (async, LLM call, costs money)
  │
  ├─ reject → retry generation
  │
  ▼
Item accepted
```

The two tiers are separate functions with separate interfaces:

- `reviewItem(item, context): ItemReview` — unchanged, deterministic, runs on every attempt
- `reviewItemLlm(item, provider): Promise<LlmReview>` — new, async, runs only on deterministic survivors

This split exists for three reasons:

1. **Cost**: Deterministic gates filter ~80% of bad items for free. LLM gates only pay for survivors.
2. **Testability**: Deterministic gates are tested with pure functions. LLM gates are tested with golden set calibration.
3. **Blast radius**: Publication (`publish.ts`) runs `reviewItem` but not `reviewItemLlm` — a previously-reviewed item doesn't need re-evaluation by an LLM at publish time.

### Where each tier runs

| Caller | `reviewItem` | `reviewItemLlm` |
|---|---|---|
| `generateItem()` | Yes, every attempt | Yes, only if deterministic gates pass |
| `publishItemVersion()` | Yes | No — item was already LLM-reviewed at generation time |
| Unit tests | Yes | Only in golden set calibration tests |

### Integration with the generation loop

The generation loop in `generate.ts` currently does:

```
for each attempt:
  generate → parse → reviewItem → pass/fail
```

After R1b-e:

```
for each attempt:
  generate → parse → reviewItem → if pass → reviewItemLlm → pass/fail
```

The `GenerateItemRequest` gains an optional `qualityProvider` field. When present, LLM quality gates run. When absent (e.g., in existing unit tests), they are skipped — backwards compatible.

---

## The LLM rubric

### Single-call design

All 4 dimensions are evaluated in one LLM call. The prompt sends the item and asks for structured JSON with a verdict per dimension. This is 4x cheaper than separate calls and lets dimensions inform each other (e.g., an unnatural scenario is also inauthentic).

### Prompt structure

```
You are an expert ESL item reviewer with 15 years of classroom experience
teaching CEFR levels A1 through C2.

Review this multiple-choice item for use in an English learning platform.
The item targets CEFR level {level} and the grammar point "{nodeTitle}".

ITEM:
Stem: {stem}
Options:
  A. {option0} [correct]
  B. {option1} — misconception: "{misconception1}"
  C. {option2} — misconception: "{misconception2}"
  D. {option3} — misconception: "{misconception3}"

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
}
```

The prompt deliberately marks the correct option with `[correct]`. The reviewer needs to know which answer is right to evaluate whether the teacher test passes (is this the defensible answer?) and whether the misconceptions are pedagogically useful relative to the correct answer.

### Verdict mapping

| LLM verdict | Severity | Meaning |
|---|---|---|
| `reject` | `reject` | Item fails this dimension — must not reach a learner |
| `warn` | `warn` | Marginal — surfaced in the review but does not block |
| `pass` | — | No issue generated for this dimension |

### Issue codes

| Code | Dimension | Example failure |
|---|---|---|
| `UNNATURAL` | naturalness | "I am proceeding to the educational institution" |
| `INAUTHENTIC_CONTEXT` | authenticity | "The elephant ______ the quarterly financial report" |
| `TEACHER_REJECT` | teacher test | Ambiguous stem where two options are equally defensible |
| `WEAK_EXPLANATION` | explanatory transfer | Misconception says "wrong" instead of explaining the confusion |

---

## Types

### New types in `src/items/types.ts`

```typescript
// 4 new issue codes added to ItemIssueCode union:
| 'UNNATURAL'
| 'INAUTHENTIC_CONTEXT'
| 'TEACHER_REJECT'
| 'WEAK_EXPLANATION'
```

### New types in `src/items/llm-review.ts`

```typescript
interface LlmDimensionResult {
  verdict: 'pass' | 'warn' | 'reject'
  reason: string
}

interface LlmRubricResponse {
  naturalness: LlmDimensionResult
  authenticity: LlmDimensionResult
  teacherTest: LlmDimensionResult
  explanatoryTransfer: LlmDimensionResult
}

interface LlmReview {
  passed: boolean
  issues: ItemIssue[]
  raw: LlmRubricResponse
}
```

### Updated `GenerateItemRequest`

```typescript
interface GenerateItemRequest {
  node: SkillNode
  level?: CefrLevel
  itemId: string
  existingStems?: string[]
  // When provided, LLM quality gates run on deterministic survivors.
  // When absent, LLM gates are skipped (backwards compatible).
  qualityProvider?: GenerationProvider
}
```

---

## Response parsing

The LLM returns JSON. Parsing must handle:

1. **Valid JSON with all 4 dimensions** — happy path
2. **JSON wrapped in markdown fences** — reuse `parseModelOutput` pattern (strip `` ```json ``` ``)
3. **Missing dimensions** — treat missing as `pass` (fail open on parse issues, not closed)
4. **Invalid JSON** — treat entire LLM review as `pass` with a logged warning. The deterministic gates already passed, and a flaky LLM call should not block a structurally sound item.
5. **Unexpected verdict values** — anything other than `pass`/`warn`/`reject` is treated as `pass`

The principle: deterministic gates are the hard floor. LLM gates add quality but never reduce availability below what the deterministic layer permits.

---

## Golden set calibration

### Purpose

The LLM rubric prompt must agree with human judgment before it can be trusted. The golden set is a fixed collection of items with human-assigned quality labels, used to:

1. **Calibrate** the prompt — iterate until agreement is high enough
2. **Regression-test** — catch prompt drift or model updates that change behavior

### Golden set structure

```typescript
interface GoldenQualityItem {
  label: string
  item: McqItem
  expected: {
    naturalness: 'pass' | 'warn' | 'reject'
    authenticity: 'pass' | 'warn' | 'reject'
    teacherTest: 'pass' | 'warn' | 'reject'
    explanatoryTransfer: 'pass' | 'warn' | 'reject'
  }
}
```

### Initial golden set (20 items)

**10 good items** — items that should pass all 4 dimensions:
- The 8 existing golden-good items from `golden-set.test.ts` (already known to be well-crafted)
- 2 additional items at extreme levels (A1 and C1) to test the rubric's sensitivity to level-appropriate naturalness

**10 bad items** — items that should fail specific dimensions:
- 2 unnatural: textbook-stilted language, over-formal register
- 2 inauthentic: absurd scenarios, grammar shoehorned into implausible context
- 2 teacher-reject: ambiguous stems, multiple defensible answers
- 2 weak explanation: misconceptions that label but don't explain
- 2 multi-dimensional: items that fail on more than one dimension

### Calibration process

1. Run the rubric prompt on all 20 golden items
2. Compare LLM verdicts against human labels
3. Compute agreement rate per dimension
4. If agreement < 80% on any dimension, revise the prompt and re-run
5. Lock the prompt when all dimensions reach ≥ 80% agreement

### Testing strategy

Golden set tests are **integration tests** that call a real LLM provider. They are:
- Expensive to run (20 LLM calls)
- Non-deterministic (LLM may give different verdicts across runs)
- Gated behind a `QUALITY_PROVIDER` environment variable — when absent, they are skipped

The test asserts agreement rate ≥ 80%, not per-item exactness. This accommodates the inherent non-determinism of LLM evaluation while still catching gross prompt failures.

```typescript
describe('golden set calibration', () => {
  it('agrees with human labels on ≥80% of naturalness verdicts', ...)
  it('agrees with human labels on ≥80% of authenticity verdicts', ...)
  it('agrees with human labels on ≥80% of teacher test verdicts', ...)
  it('agrees with human labels on ≥80% of explanatory transfer verdicts', ...)
})
```

---

## Cost and latency

### Per-item cost

One LLM call per item that passes deterministic gates. Using the prompt above (~400 tokens input, ~200 tokens output):

| Provider | Approx cost per item |
|---|---|
| Gemini 2.0 Flash | ~$0.0002 |
| Gemini 2.5 Pro | ~$0.003 |
| GPT-4o-mini | ~$0.0003 |

Recommendation: use the same provider as generation. If generation uses Gemini Flash, quality review uses Gemini Flash. No separate provider config needed.

### Latency

One additional round-trip per accepted item (~500ms–2s depending on provider). Since generation already takes ~2–5s per attempt, this adds 20–50% to the total generation time for accepted items.

### Generation loop impact

Worst case: 4 attempts × (generation + deterministic review + LLM review) = 4 generation calls + 4 LLM review calls. But in practice, deterministic gates reject most bad items before the LLM call, so the expected cost is closer to 4 generation calls + 1–2 LLM review calls.

---

## Files changed

| File | Change |
|---|---|
| `src/items/types.ts` | Add 4 new `ItemIssueCode` values |
| `src/items/llm-review.ts` | **Create** — LLM rubric prompt, response parsing, `reviewItemLlm()` |
| `src/items/llm-rubric.ts` | **Create** — prompt template and response parser (separated for testability) |
| `src/generation/generate.ts` | Add `qualityProvider` to request, call `reviewItemLlm` on survivors |
| `tests/items/llm-review.test.ts` | **Create** — unit tests for response parsing and issue mapping |
| `tests/items/llm-rubric.test.ts` | **Create** — unit tests for prompt rendering |
| `tests/items/golden-quality.test.ts` | **Create** — golden set calibration tests (integration, gated) |

---

## What this does NOT include (and why)

| Excluded | Reason |
|---|---|
| Human review queue | UI/workflow concern — separate subsystem (R1b-g) |
| Auto-retirement by statistics | Needs live learner data — separate subsystem (R1b-g) |
| Per-dimension prompt tuning | Premature — start with one rubric, split only if a dimension consistently underperforms |
| Caching LLM results | Items are reviewed once at generation time; caching adds complexity for near-zero benefit |
| Multiple LLM evaluators (ensemble) | Overkill for launch. Add if single-evaluator agreement drops below 80% |

---

## Validation guarantees after R1b-e

An MCQ item that passes all 12 checks (8 deterministic + 4 LLM):

1. Has ≥ 3 options with no duplicates (shape)
2. Every option is plausible English (wellformed)
3. Every distractor names a specific misconception (misconceptions)
4. No time markers give away the answer (giveaway)
5. The correct answer is grammatically valid in context (answer-key)
6. The item is not a near-duplicate (duplicate)
7. The item tests what its target node claims (targeting)
8. The stem language fits the target CEFR level (level)
9. **The language sounds natural at the target level** (naturalness) — new
10. **The scenario is plausible and grounded** (authenticity) — new
11. **A qualified teacher would use it unedited** (teacher test) — new
12. **The misconception text builds understanding** (explanatory transfer) — new

This is the complete quality pipeline. Items that survive are both structurally correct and pedagogically sound.
