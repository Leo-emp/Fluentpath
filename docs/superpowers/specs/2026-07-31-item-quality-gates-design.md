# R1b-b: Item Quality Gates — Design Spec

**Date:** 2026-07-31
**Status:** Draft for review
**Depends on:** R1b-a (inventories and profiler — done), existing 5-gate pipeline (shape, wellformed, misconceptions, giveaway, level — done)

---

## Goal

Add three deterministic correctness gates to the existing item review pipeline. These catch **objectively wrong items** — wrong answer keys, recycled content, and items that don't test what they claim. Together with the existing five gates, they form a complete correctness layer that runs in milliseconds with zero external dependencies.

The subjective quality gates (naturalness, contextual authenticity, teacher test, explanatory transfer) belong to R1b-e, where they are calibrated against a golden set and evaluated by LLM. This spec does not touch those.

---

## Why these three, why now

| Gate | What it catches | Why it matters |
|---|---|---|
| Answer-key verification | The "correct" answer is actually wrong | Spec: "one wrong answer key destroys the learner's trust in every score and every explanation the platform has ever given them." Highest-severity defect possible |
| Near-duplicate detection | Generation loop produces the same item with minor rewording | Duplicates inflate item statistics, waste learner time, and degrade the learning experience. The generation loop retries on failure, making accidental duplication a real risk |
| Node-targeting verification | Item claims to test `gram.b1.present_perfect` but the options contain no present-perfect forms | Mis-targeted items break diagnosis — the skill graph attributes performance to the wrong node, which cascades into wrong weakness rankings and wrong action plans |

---

## Gate 1: Answer-Key Verification (`checkAnswerKey`)

**File:** `src/items/answer-key.ts`

### How it works

For fill-in-blank MCQs (stem contains `______`):

1. **Substitute each option into the blank** to form a complete sentence.
2. **Parse the correct-option sentence with compromise.js** and check for auxiliary-verb mismatches using the same logic as `checkWellFormed` (already proven on invariant verbs, modal errors, etc.).
3. **Check that at least one distractor is detectably wrong** — if every option produces an equally valid sentence, the answer key is arbitrary rather than defensible.
4. **Cross-check misconceptions against option text** — if a distractor's misconception says "uses past simple" but the distractor text contains `has gone` (present perfect), the misconception contradicts the option. Either the option or the misconception is wrong; either way, the item is broken.

### Rules

| Condition | Severity | Issue code |
|---|---|---|
| Correct option produces ungrammatical English when substituted into stem | reject | `WRONG_KEY` |
| No distractor is detectably ungrammatical in context (all options equally valid) | warn | `AMBIGUOUS_KEY` |
| A distractor's misconception names a tense/form that contradicts what the distractor text actually uses | reject | `MISCONCEPTION_MISMATCH` |

### Scope limitations

- Only applies to fill-in-blank MCQs (stem contains `______`). Items without a blank are skipped — their correct answer cannot be mechanically verified by substitution.
- Grammar checking reuses `findAuxiliaryProblem()` from `wellformed.ts` (currently not exported — must be exported as part of this work), which catches a specific set of patterns (have + bare verb, modal + inflected verb, modal + to). It does not catch every grammatical error. This is acceptable — the gate catches the highest-frequency failures; the LLM-based teacher test in R1b-e covers the rest.
- Invariant verbs (`read`, `put`, `cut`, etc.) are already handled by the existing whitelist in `wellformed.ts`.

### Tense detection for misconception cross-check

A small tense-detection utility maps option text to the tense/form it uses:

| Pattern | Detected as |
|---|---|
| `has/have` + past participle | `present_perfect` |
| Regular past (-ed) or known irregular past | `past_simple` |
| `am/is/are` + -ing | `present_continuous` |
| `was/were` + -ing | `past_continuous` |
| `will` + verb | `future_will` |
| `going to` + verb | `future_going_to` |
| Modal + verb | `modal` |
| Base form / 3rd person -s | `present_simple` |

The misconception text is scanned for these same tense names (e.g., "uses past simple"). If the misconception names tense X but the option text is detected as tense Y, that is a `MISCONCEPTION_MISMATCH`.

---

## Gate 2: Near-Duplicate Detection (`checkDuplicate`)

**File:** `src/items/duplicate.ts`

### How it works

Compare a candidate item's stem against a bank of existing stems using **word-bigram Jaccard similarity**.

1. **Normalize:** lowercase, strip punctuation, collapse whitespace, replace `______` with a standard token (`_BLANK_`).
2. **Tokenize into word bigrams:** `["the cat", "cat sat", "sat on", ...]`
3. **Compute Jaccard coefficient:** `|A ∩ B| / |A ∪ B|`
4. **Compare against every stem in the provided bank.**

### Thresholds

| Jaccard | Severity | Meaning |
|---|---|---|
| ≥ 0.85 | reject | Near-identical — just rewording the same question |
| ≥ 0.65 | warn | Suspiciously similar — worth human review |
| < 0.65 | pass | Sufficiently distinct |

### Interface

```typescript
function checkDuplicate(item: McqItem, existingStems: string[]): ItemIssue[]
```

The gate receives the existing bank as a parameter rather than accessing the database. The caller (generation loop or publication gate) provides it. This keeps the gate pure and testable.

### Why not embeddings

Embeddings would catch semantic duplicates that bigrams miss. But:
- They require an external API call (cost, latency, availability)
- The generation loop already sends stems with the same constraints, so duplicates are textually similar, not just semantically similar
- Bigrams catch what actually happens; embeddings catch what theoretically might happen
- If embedding-based dedup proves necessary, it layers on top without replacing this gate (R1b-e or later)

### Issue code

`NEAR_DUPLICATE` — reject at ≥ 0.85, warn at ≥ 0.65. The message includes the matching stem and the similarity score.

---

## Gate 3: Node-Targeting Verification (`checkTargeting`)

**File:** `src/items/targeting.ts`

### How it works

Each grammar node ID maps to **expected linguistic signals** that must appear in the item's options. If an item targets `gram.b1.present_perfect` but none of the options contain a present-perfect form, the item is testing something other than what it claims.

A lookup table maps node ID segments to required patterns:

| Node segment | Required in options | Example match |
|---|---|---|
| `be_present` | am/is/are (not as auxiliary) | "is", "are" |
| `present_simple` | base verb or 3rd-person -s | "goes", "like" |
| `can_cant` | can/can't/cannot | "can swim" |
| `past_simple` | regular -ed or known irregular past | "went", "played" |
| `future_going_to` | going to + verb | "going to leave" |
| `comparatives` | -er/more/most/than | "bigger than" |
| `present_perfect` | has/have + past participle | "has been" |
| `pp_vs_past_simple` | both present-perfect AND past-simple forms across options | "has lost" vs "lost" |
| `modals` | must/should/might/could/would | "should go" |
| `conditionals` | if + would/could/might, or had + would have | "if I had" |
| `passive` | be + past participle | "was built" |
| `reported_speech` | said/told/asked + that-clause or tense shift | "said that he was" |

### Rules

| Condition | Severity | Issue code |
|---|---|---|
| Item targets a grammar node and no option matches any required pattern | reject | `OFF_TARGET` |
| Item targets a contrast node (e.g. `pp_vs_past_simple`) and both sides of the contrast are not represented in the options | warn | `OFF_TARGET` |
| Item targets a non-grammar node (cando, lexical, phono, strategy) | skip | — |

### Why grammar-only

- MCQ generation currently only targets grammar nodes — the other node types don't have MCQ generation yet
- Grammar patterns are the most mechanically checkable — a regex can detect whether present-perfect forms appear
- When MCQ generation extends to lexical/phono nodes, their targeting patterns get added to this table

### Implementation

```typescript
interface TargetPattern {
  segment: string
  options: RegExp[]       // at least one must match in some option text
  contrast?: RegExp[]     // if present, at least one of THESE must also match (different option)
}

const GRAMMAR_TARGETS: TargetPattern[] = [...]

function checkTargeting(item: McqItem): ItemIssue[]
```

The function extracts the last dot-segment of each grammar nodeId, looks it up in `GRAMMAR_TARGETS`, and checks whether the required patterns appear in the option texts (concatenated). For contrast nodes, it additionally checks that both sides are represented.

---

## Integration

### Updated `reviewItem` signature

```typescript
interface ReviewContext {
  inventory: ProfilerInventory
  existingStems?: string[]    // for duplicate detection; omitted = skip gate
}

function reviewItem(item: McqItem, context: ReviewContext): ItemReview
```

The current signature `reviewItem(item, inventory)` changes to accept a context object. This is a **breaking change** to the signature, but the fix at each call site is mechanical: `reviewItem(item, inventory)` → `reviewItem(item, { inventory })`.

Call sites to update:
- `src/generation/generate.ts` line 74 — pass `{ inventory, existingStems }` (existingStems from the generation request)
- `src/content/publish.ts` — pass `{ inventory }` (duplicate check already happened at generation time)
- `tests/items/review.test.ts` — pass `{ inventory }`
- `tests/items/golden-set.test.ts` — pass `{ inventory }`
- `tests/items/acceptance.test.ts` — pass `{ inventory }`
- `tests/generation/generate.test.ts` — pass `{ inventory }`

### Updated `ItemIssueCode` type

Add five new codes:

```typescript
type ItemIssueCode =
  | 'STRUCTURE'
  | 'MALFORMED_OPTION'
  | 'NO_MISCONCEPTION'
  | 'VAGUE_MISCONCEPTION'
  | 'DUPLICATE_MISCONCEPTION'
  | 'STEM_GIVEAWAY'
  | 'LENGTH_TELL'
  | 'ABOVE_LEVEL'
  // New in R1b-b
  | 'WRONG_KEY'
  | 'AMBIGUOUS_KEY'
  | 'MISCONCEPTION_MISMATCH'
  | 'NEAR_DUPLICATE'
  | 'OFF_TARGET'
```

### Gate ordering in `reviewItem`

Gates run in order of cost (cheapest first) but all run regardless — an item collects every issue, not just the first:

1. `checkShape` (array indexing)
2. `checkWellFormed` (NLP parse per option)
3. `checkMisconceptions` (string matching)
4. `checkGiveaway` (string matching)
5. `checkAnswerKey` (NLP parse of substituted sentences) — **new**
6. `checkTargeting` (regex matching against pattern table) — **new**
7. `checkLevel` (profiler — the heaviest existing gate)
8. `checkDuplicate` (bigram computation against bank) — **new, only when existingStems provided**

### Updated `GenerateItemRequest`

```typescript
interface GenerateItemRequest {
  node: SkillNode
  level?: CefrLevel
  itemId: string
  existingStems?: string[]    // stems already in the item bank, for duplicate detection
}
```

The generation loop passes these through to `reviewItem`.

---

## New issue codes reference

| Code | Severity | Gate | Meaning |
|---|---|---|---|
| `WRONG_KEY` | reject | answer-key | Correct option is ungrammatical when substituted into the stem |
| `AMBIGUOUS_KEY` | warn | answer-key | No distractor is detectably wrong — answer key may be arbitrary |
| `MISCONCEPTION_MISMATCH` | reject | answer-key | Distractor's misconception names a tense that contradicts the distractor's actual text |
| `NEAR_DUPLICATE` | reject/warn | duplicate | Stem is ≥ 0.85 (reject) or ≥ 0.65 (warn) similar to an existing item |
| `OFF_TARGET` | reject/warn | targeting | Item lacks the linguistic patterns expected for its declared target node |

---

## Golden set expansion

Add to `tests/items/golden-set.test.ts`:

**Golden bad items (3 new):**
1. Wrong answer key — correct option is `have lose` (ungrammatical), should be `have lost`
2. Misconception mismatch — distractor says "uses past simple" but option text is `has gone` (present perfect)
3. Off-target — claims to test `present_perfect` but all options are past-simple forms

**Golden good edge cases (2 new):**
1. Invariant verb in answer key — `has read` must not be falsely flagged as ungrammatical
2. Non-grammar node — item targeting a `cando` node should not trigger the targeting gate

---

## Files changed

| File | Change |
|---|---|
| `src/items/types.ts` | Add 5 new `ItemIssueCode` values |
| `src/items/answer-key.ts` | **Create** — answer-key verification gate |
| `src/items/tense-detect.ts` | **Create** — small utility to detect tense/form from option text |
| `src/items/duplicate.ts` | **Create** — near-duplicate detection gate |
| `src/items/targeting.ts` | **Create** — node-targeting verification gate |
| `src/items/wellformed.ts` | Export `findAuxiliaryProblem` for reuse by answer-key gate |
| `src/items/review.ts` | Add `ReviewContext` interface, wire three new gates, update signature |
| `src/generation/generate.ts` | Update `GenerateItemRequest`, pass context to `reviewItem` |
| `src/content/publish.ts` | Update `reviewItem` call to use context object |
| `tests/items/answer-key.test.ts` | **Create** — tests for answer-key verification |
| `tests/items/duplicate.test.ts` | **Create** — tests for near-duplicate detection |
| `tests/items/targeting.test.ts` | **Create** — tests for node-targeting verification |
| `tests/items/golden-set.test.ts` | Add 5 new golden items (3 bad, 2 good edge cases) |
| `tests/items/review.test.ts` | Update `reviewItem` calls to context object |
| `tests/items/acceptance.test.ts` | Update `reviewItem` calls to context object |
| `tests/generation/generate.test.ts` | Update `reviewItem` calls, add existingStems |

---

## What this does NOT include (and why)

| Excluded | Belongs to | Reason |
|---|---|---|
| Naturalness check | R1b-e | Subjective — requires LLM evaluation and golden set calibration |
| Contextual authenticity | R1b-e | Subjective — "is this language doing real work in a real situation?" needs judgment |
| Teacher test | R1b-e | Subjective — "would a qualified teacher use this unedited?" |
| Explanatory transfer | R1b-e | Requires evaluating explanation content, not item structure |
| Non-MCQ quality gates | R1b-e+ | Gap-fill, writing, speaking items don't have generation yet |
| Embedding-based dedup | Later | Bigrams catch the actual failure mode; embeddings add cost and complexity for theoretical gain |
| Auto-retirement by statistics | R1b-g | Live signals — needs the item statistics pipeline running in production |
| Human review queue | R1b-g | UI/workflow — separate subsystem |

---

## Validation guarantees after R1b-b

An MCQ item that passes all 8 gates:

1. Has ≥ 3 options with no duplicates (shape)
2. Every option is plausible English — no broken verb forms (wellformed)
3. Every distractor names a specific, non-vague misconception (misconceptions)
4. No time markers give away the answer in tense-contrast items (giveaway)
5. **The correct answer is grammatically valid in context** (answer-key) — new
6. **The item is not a near-duplicate of an existing item** (duplicate) — new
7. **The item contains the linguistic patterns its target node requires** (targeting) — new
8. The stem language does not exceed the target CEFR level (level)

This is the complete deterministic correctness layer. Items that pass this are structurally sound. Whether they are *good teaching material* is the question R1b-e answers.
