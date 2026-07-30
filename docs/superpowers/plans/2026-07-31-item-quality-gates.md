# Item Quality Gates (R1b-b) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three deterministic correctness gates (answer-key verification, near-duplicate detection, node-targeting verification) to the existing 5-gate MCQ review pipeline.

**Architecture:** Each gate is a pure function `(McqItem, ...) → ItemIssue[]` in its own file under `src/items/`. The orchestrator `reviewItem()` gains a `ReviewContext` object replacing the bare `inventory` parameter. All existing call sites update mechanically.

**Tech Stack:** TypeScript, Vitest, compromise.js (already a dependency for NLP tagging)

## Global Constraints

- All code uses `//` comments throughout for learning
- Every gate follows the existing pattern: pure function, returns `ItemIssue[]`, no side effects
- Issue codes must be added to the `ItemIssueCode` union type
- Tests follow the existing golden-set pattern: named items with expected outcomes
- No external API calls — all gates run locally in milliseconds

---

### Task 1: Tense Detection Utility + Answer-Key Verification Gate

**Files:**
- Create: `src/items/tense-detect.ts`
- Create: `src/items/answer-key.ts`
- Modify: `src/items/wellformed.ts:109` — export `findAuxiliaryProblem`
- Create: `tests/items/tense-detect.test.ts`
- Create: `tests/items/answer-key.test.ts`

**Interfaces:**
- Consumes: `findAuxiliaryProblem(text: string): string | null` from `wellformed.ts` (currently unexported — must be exported)
- Consumes: `McqItem`, `ItemIssue` from `types.ts`
- Produces: `detectTense(text: string): string | null` — returns tense label or null
- Produces: `checkAnswerKey(item: McqItem): ItemIssue[]` — returns issues with codes `WRONG_KEY`, `AMBIGUOUS_KEY`, `MISCONCEPTION_MISMATCH`

- [ ] **Step 1: Export `findAuxiliaryProblem` from wellformed.ts**

In `src/items/wellformed.ts`, change line 109 from:

```typescript
function findAuxiliaryProblem(text: string): string | null {
```

to:

```typescript
export function findAuxiliaryProblem(text: string): string | null {
```

- [ ] **Step 2: Run existing tests to confirm the export doesn't break anything**

Run: `npx vitest run tests/items/wellformed.test.ts`
Expected: all tests pass (the function is unchanged, only its visibility changed)

- [ ] **Step 3: Write the tense detection utility**

Create `src/items/tense-detect.ts`:

```typescript
import nlp from 'compromise'

// Map option text to the tense/form it uses.
//
// This is intentionally shallow — it detects the dominant tense from
// surface patterns rather than doing a full parse. Good enough for
// cross-checking misconceptions, where the question is "does the
// misconception's claimed tense match what the option actually does?"

// Tense labels used both here and when scanning misconception text.
export const TENSE_LABELS = [
  'present_perfect',
  'past_simple',
  'present_continuous',
  'past_continuous',
  'future_will',
  'future_going_to',
  'modal',
  'present_simple',
] as const

export type TenseLabel = (typeof TENSE_LABELS)[number]

// Tense names as they appear in misconception prose (e.g. "uses past
// simple"). The keys are the canonical labels; the values are all the
// natural-language phrases that map to that label.
const MISCONCEPTION_PHRASES: Record<TenseLabel, string[]> = {
  present_perfect: ['present perfect'],
  past_simple: ['past simple', 'simple past'],
  present_continuous: ['present continuous', 'present progressive'],
  past_continuous: ['past continuous', 'past progressive'],
  future_will: ['future simple', 'future will', 'will future'],
  future_going_to: ['going to future', 'future going to'],
  modal: ['modal'],
  present_simple: ['present simple', 'simple present'],
}

// Detect the dominant tense/form from a short text (typically an MCQ
// option like "has lost" or "went").
export function detectTense(text: string): TenseLabel | null {
  const lower = text.toLowerCase().trim()
  const words = lower.split(/\s+/).filter(Boolean)

  if (words.length === 0) return null

  // has/have + word → present_perfect (most specific, check first)
  if (words.some((w, i) => (w === 'has' || w === 'have') && i < words.length - 1)) {
    // Check that the word after has/have is tagged as a participle or
    // an invariant verb (which looks like a bare form but is valid).
    const auxIdx = words.findIndex((w) => w === 'has' || w === 'have')
    if (auxIdx < words.length - 1) {
      return 'present_perfect'
    }
  }

  // was/were + -ing → past_continuous
  if (words.some((w, i) => (w === 'was' || w === 'were') && words[i + 1]?.endsWith('ing'))) {
    return 'past_continuous'
  }

  // am/is/are + -ing → present_continuous
  if (words.some((w, i) => (w === 'am' || w === 'is' || w === 'are') && words[i + 1]?.endsWith('ing'))) {
    return 'present_continuous'
  }

  // will + verb → future_will
  if (words.includes('will')) return 'future_will'

  // going to + verb → future_going_to
  if (lower.includes('going to')) return 'future_going_to'

  // modal + verb → modal
  const modals = ['can', 'could', 'should', 'would', 'may', 'might', 'must', 'shall']
  if (words.some((w) => modals.includes(w))) return 'modal'

  // Use compromise for past simple vs present simple on the remaining
  // single-word or short-phrase cases.
  const doc = nlp(text)
  const tags = doc.json()[0]?.terms?.[0]?.tags ?? []

  if (tags.includes('PastTense')) return 'past_simple'
  if (tags.includes('Verb')) return 'present_simple'

  return null
}

// Scan misconception text for a named tense and return its label.
// Returns null if no tense name is found.
export function extractTenseFromMisconception(misconception: string): TenseLabel | null {
  const lower = misconception.toLowerCase()

  for (const [label, phrases] of Object.entries(MISCONCEPTION_PHRASES)) {
    if (phrases.some((phrase) => lower.includes(phrase))) {
      return label as TenseLabel
    }
  }

  return null
}
```

- [ ] **Step 4: Write tense detection tests**

Create `tests/items/tense-detect.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { detectTense, extractTenseFromMisconception } from '@/items/tense-detect'

describe('detectTense', () => {
  // Present perfect: has/have + participle
  it('detects "has lost" as present_perfect', () => {
    expect(detectTense('has lost')).toBe('present_perfect')
  })

  it('detects "have been" as present_perfect', () => {
    expect(detectTense('have been')).toBe('present_perfect')
  })

  it('detects "has read" as present_perfect', () => {
    expect(detectTense('has read')).toBe('present_perfect')
  })

  // Past simple
  it('detects "went" as past_simple', () => {
    expect(detectTense('went')).toBe('past_simple')
  })

  it('detects "played" as past_simple', () => {
    expect(detectTense('played')).toBe('past_simple')
  })

  // Present continuous
  it('detects "is going" as present_continuous', () => {
    expect(detectTense('is going')).toBe('present_continuous')
  })

  it('detects "am losing" as present_continuous', () => {
    expect(detectTense('am losing')).toBe('present_continuous')
  })

  // Past continuous
  it('detects "was losing" as past_continuous', () => {
    expect(detectTense('was losing')).toBe('past_continuous')
  })

  // Future
  it('detects "will go" as future_will', () => {
    expect(detectTense('will go')).toBe('future_will')
  })

  it('detects "going to leave" as future_going_to', () => {
    expect(detectTense('going to leave')).toBe('future_going_to')
  })

  // Modal
  it('detects "should go" as modal', () => {
    expect(detectTense('should go')).toBe('modal')
  })

  // Present simple
  it('detects "goes" as present_simple', () => {
    expect(detectTense('goes')).toBe('present_simple')
  })

  // Edge cases
  it('returns null for empty string', () => {
    expect(detectTense('')).toBeNull()
  })
})

describe('extractTenseFromMisconception', () => {
  it('finds "past simple" in misconception text', () => {
    expect(extractTenseFromMisconception('uses past simple where the result still matters'))
      .toBe('past_simple')
  })

  it('finds "present perfect" in misconception text', () => {
    expect(extractTenseFromMisconception('applies present perfect to a finished event'))
      .toBe('present_perfect')
  })

  it('finds "present continuous" in misconception text', () => {
    expect(extractTenseFromMisconception('confuses with present continuous form'))
      .toBe('present_continuous')
  })

  it('returns null when no tense is named', () => {
    expect(extractTenseFromMisconception('treats a completed event as ongoing'))
      .toBeNull()
  })
})
```

- [ ] **Step 5: Run tense detection tests**

Run: `npx vitest run tests/items/tense-detect.test.ts`
Expected: all tests pass

- [ ] **Step 6: Write the answer-key verification gate**

Create `src/items/answer-key.ts`:

```typescript
import type { ItemIssue, McqItem } from './types'
import { findAuxiliaryProblem } from './wellformed'
import { detectTense, extractTenseFromMisconception } from './tense-detect'

// The blank marker used in fill-in-blank MCQ stems.
const BLANK = '______'

// Substitute an option's text into the stem's blank to form a complete
// sentence. Returns null if the stem has no blank.
function substitute(stem: string, optionText: string): string | null {
  if (!stem.includes(BLANK)) return null
  return stem.replace(BLANK, optionText)
}

// Verify the answer key by substituting options into the stem.
//
// Three checks:
// 1. The correct option must produce grammatically valid English.
// 2. At least one distractor must be detectably wrong in context.
// 3. Each distractor's misconception must match what the option actually does.
export function checkAnswerKey(item: McqItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // Only applies to fill-in-blank items.
  if (!item.stem.includes(BLANK)) return issues

  // 1. Check the correct option produces valid English.
  const correctText = item.options[item.correctIndex]?.text
  if (correctText !== undefined) {
    const correctSentence = substitute(item.stem, correctText)!
    const problem = findAuxiliaryProblem(correctSentence)
    if (problem) {
      issues.push({
        code: 'WRONG_KEY',
        severity: 'reject',
        message:
          `The correct option ("${correctText}") produces ungrammatical English ` +
          `when placed in the stem: ${problem}. The answer key is wrong.`,
      })
    }
  }

  // 2. Check that at least one distractor is detectably wrong.
  let anyDistractorBroken = false
  item.options.forEach((option, index) => {
    if (index === item.correctIndex) return
    const sentence = substitute(item.stem, option.text)!
    if (findAuxiliaryProblem(sentence)) {
      anyDistractorBroken = true
    }
  })

  // If no distractor is detectably wrong, the answer key may be
  // arbitrary. This is a warning — the item might still be valid if the
  // grammar difference is subtler than the auxiliary check can detect.
  if (!anyDistractorBroken && item.options.length > 1) {
    issues.push({
      code: 'AMBIGUOUS_KEY',
      severity: 'warn',
      message:
        'No distractor is detectably ungrammatical in context. The answer key ' +
        'may be arbitrary — all options look equally valid to the grammar checker.',
    })
  }

  // 3. Cross-check misconceptions against what the option text actually does.
  item.options.forEach((option, index) => {
    if (index === item.correctIndex) return
    if (!option.misconception) return

    const claimedTense = extractTenseFromMisconception(option.misconception)
    if (claimedTense === null) return // misconception doesn't name a tense

    const actualTense = detectTense(option.text)
    if (actualTense === null) return // can't determine the tense

    if (claimedTense !== actualTense) {
      issues.push({
        code: 'MISCONCEPTION_MISMATCH',
        severity: 'reject',
        message:
          `Option ${index} ("${option.text}") is detected as ${actualTense}, ` +
          `but its misconception says "${option.misconception}" which names ` +
          `${claimedTense}. Either the option or the misconception is wrong.`,
        optionIndex: index,
      })
    }
  })

  return issues
}
```

- [ ] **Step 7: Write answer-key tests**

Create `tests/items/answer-key.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { checkAnswerKey } from '@/items/answer-key'
import type { McqItem } from '@/items/types'

function mcq(overrides: Partial<McqItem> = {}): McqItem {
  return {
    id: 'test.key',
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
    ...overrides,
  }
}

describe('checkAnswerKey', () => {
  it('passes a well-formed item', () => {
    expect(checkAnswerKey(mcq())).toHaveLength(0)
  })

  it('skips items without a blank', () => {
    const noBlank = mcq({ stem: 'Choose the correct form of the verb.' })
    expect(checkAnswerKey(noBlank)).toHaveLength(0)
  })

  it('rejects when the correct option is ungrammatical', () => {
    // correctIndex points to "have lose" which is broken English.
    const bad = mcq({
      options: [
        { text: 'have lose', misconception: null },
        { text: 'lost', misconception: 'uses past simple though the result still matters now' },
        { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
        { text: 'am losing', misconception: 'places a finished event in the present moment' },
      ],
    })
    const issues = checkAnswerKey(bad)
    expect(issues.some((i) => i.code === 'WRONG_KEY' && i.severity === 'reject')).toBe(true)
  })

  it('warns when no distractor is detectably wrong', () => {
    // All options are valid English — the gate can't tell which is "correct".
    const ambiguous = mcq({
      stem: 'She ______ to work every day.',
      options: [
        { text: 'walks', misconception: null },
        { text: 'drives', misconception: 'chooses driving over walking as the routine action' },
        { text: 'runs', misconception: 'chooses running over walking as the routine action' },
        { text: 'cycles', misconception: 'chooses cycling over walking as the routine action' },
      ],
    })
    const issues = checkAnswerKey(ambiguous)
    expect(issues.some((i) => i.code === 'AMBIGUOUS_KEY' && i.severity === 'warn')).toBe(true)
  })

  it('rejects a misconception that contradicts the option text', () => {
    // Distractor says "uses past simple" but the option is "has gone" (present perfect).
    const mismatch = mcq({
      options: [
        { text: 'have lost', misconception: null },
        { text: 'has gone', misconception: 'uses past simple for a current-result situation' },
        { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
        { text: 'am losing', misconception: 'places a finished event in the present moment' },
      ],
    })
    const issues = checkAnswerKey(mismatch)
    expect(issues.some((i) => i.code === 'MISCONCEPTION_MISMATCH' && i.severity === 'reject')).toBe(true)
  })

  it('accepts when misconception does not name a tense', () => {
    // "treats a completed event as ongoing" doesn't name a specific tense,
    // so no cross-check is possible — and that is fine.
    expect(checkAnswerKey(mcq())).toHaveLength(0)
  })

  it('accepts invariant verb "has read" as a valid correct answer', () => {
    const item = mcq({
      stem: 'She ______ three books this month.',
      options: [
        { text: 'has read', misconception: null },
        { text: 'read', misconception: 'uses past simple for an unfinished time period' },
        { text: 'was reading', misconception: 'treats a quantity as a continuous action' },
        { text: 'reads', misconception: 'uses present simple for a recent achievement' },
      ],
    })
    const issues = checkAnswerKey(item)
    expect(issues.some((i) => i.code === 'WRONG_KEY')).toBe(false)
  })
})
```

- [ ] **Step 8: Run answer-key tests**

Run: `npx vitest run tests/items/answer-key.test.ts`
Expected: all tests pass

- [ ] **Step 9: Commit**

```bash
git add src/items/tense-detect.ts src/items/answer-key.ts src/items/wellformed.ts tests/items/tense-detect.test.ts tests/items/answer-key.test.ts
git commit -m "feat(items): add answer-key verification gate with tense detection"
```

---

### Task 2: Near-Duplicate Detection Gate

**Files:**
- Create: `src/items/duplicate.ts`
- Create: `tests/items/duplicate.test.ts`

**Interfaces:**
- Consumes: `McqItem`, `ItemIssue` from `types.ts`
- Produces: `checkDuplicate(item: McqItem, existingStems: string[]): ItemIssue[]`
- Produces: `jaccardBigram(a: string, b: string): number` (exported for testing)
- Produces: `normalizeStem(stem: string): string` (exported for testing)

- [ ] **Step 1: Write the near-duplicate detection gate**

Create `src/items/duplicate.ts`:

```typescript
import type { ItemIssue, McqItem } from './types'

// The blank marker in fill-in-blank MCQ stems. Replaced with a standard
// token so that "I ______ my keys" and "I ______ my keys" compare as
// identical regardless of blank-marker width variations.
const BLANK_PATTERN = /_{2,}/g
const BLANK_TOKEN = '_BLANK_'

// Similarity thresholds. Tuned to catch the failure mode that actually
// happens — the generation loop producing textually similar items when
// retrying or generating for the same node.
const REJECT_THRESHOLD = 0.85
const WARN_THRESHOLD = 0.65

// Normalize a stem for comparison: lowercase, strip punctuation, collapse
// whitespace, replace blank markers with a standard token.
export function normalizeStem(stem: string): string {
  return stem
    .toLowerCase()
    .replace(BLANK_PATTERN, BLANK_TOKEN)
    .replace(/[^a-z0-9_\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Extract word bigrams from a normalized string.
function bigrams(text: string): Set<string> {
  const words = text.split(' ')
  const result = new Set<string>()
  for (let i = 0; i < words.length - 1; i++) {
    result.add(`${words[i]} ${words[i + 1]}`)
  }
  return result
}

// Jaccard similarity on word bigrams: |A ∩ B| / |A ∪ B|.
// Returns 0 for empty inputs (avoids division by zero).
export function jaccardBigram(a: string, b: string): number {
  const setA = bigrams(normalizeStem(a))
  const setB = bigrams(normalizeStem(b))

  if (setA.size === 0 && setB.size === 0) return 0

  let intersection = 0
  for (const bg of setA) {
    if (setB.has(bg)) intersection++
  }

  const union = setA.size + setB.size - intersection
  if (union === 0) return 0

  return intersection / union
}

// Check a candidate item against a bank of existing stems.
// Returns issues when the candidate is too similar to any existing item.
export function checkDuplicate(item: McqItem, existingStems: string[]): ItemIssue[] {
  const issues: ItemIssue[] = []

  for (const existing of existingStems) {
    const similarity = jaccardBigram(item.stem, existing)

    if (similarity >= REJECT_THRESHOLD) {
      issues.push({
        code: 'NEAR_DUPLICATE',
        severity: 'reject',
        message:
          `Stem is ${(similarity * 100).toFixed(0)}% similar to an existing item: ` +
          `"${existing.slice(0, 80)}…". This is near-identical and would inflate statistics.`,
      })
      // One reject is enough — no need to compare against the rest.
      return issues
    }

    if (similarity >= WARN_THRESHOLD) {
      issues.push({
        code: 'NEAR_DUPLICATE',
        severity: 'warn',
        message:
          `Stem is ${(similarity * 100).toFixed(0)}% similar to an existing item: ` +
          `"${existing.slice(0, 80)}…". Worth reviewing for redundancy.`,
      })
    }
  }

  return issues
}
```

- [ ] **Step 2: Write near-duplicate detection tests**

Create `tests/items/duplicate.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { checkDuplicate, jaccardBigram, normalizeStem } from '@/items/duplicate'
import type { McqItem } from '@/items/types'

function mcq(stem: string): McqItem {
  return {
    id: 'test.dup',
    stem,
    options: [
      { text: 'have lost', misconception: null },
      { text: 'lost', misconception: 'uses past simple though the result still matters now' },
      { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
    ],
    correctIndex: 0,
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    level: 'B1',
  }
}

describe('normalizeStem', () => {
  it('lowercases and strips punctuation', () => {
    expect(normalizeStem('Hello, World!')).toBe('hello world')
  })

  it('replaces blank markers with standard token', () => {
    expect(normalizeStem('I ______ my keys.')).toBe('i _BLANK_ my keys')
  })

  it('collapses whitespace', () => {
    expect(normalizeStem('too   much    space')).toBe('too much space')
  })
})

describe('jaccardBigram', () => {
  it('returns 1 for identical strings', () => {
    expect(jaccardBigram('the cat sat', 'the cat sat')).toBe(1)
  })

  it('returns 0 for completely different strings', () => {
    expect(jaccardBigram('the cat sat', 'dogs run fast')).toBe(0)
  })

  it('returns a value between 0 and 1 for partial overlap', () => {
    const sim = jaccardBigram('the cat sat on the mat', 'the cat sat on the floor')
    expect(sim).toBeGreaterThan(0.3)
    expect(sim).toBeLessThan(1)
  })

  it('returns 0 for empty inputs', () => {
    expect(jaccardBigram('', '')).toBe(0)
  })

  it('ignores punctuation differences', () => {
    expect(jaccardBigram('Hello, world!', 'hello world')).toBe(1)
  })
})

describe('checkDuplicate', () => {
  it('passes when no existing stems match', () => {
    const item = mcq('I ______ my keys. I cannot open the door.')
    const existing = ['She ______ to school every day.']
    expect(checkDuplicate(item, existing)).toHaveLength(0)
  })

  it('rejects a near-identical stem', () => {
    const item = mcq('I ______ my keys. I cannot open the door.')
    const existing = ['I ______ my keys. I cannot open the door.']
    const issues = checkDuplicate(item, existing)
    expect(issues.some((i) => i.code === 'NEAR_DUPLICATE' && i.severity === 'reject')).toBe(true)
  })

  it('rejects a stem with trivial rewording', () => {
    const item = mcq('I ______ my keys. I cannot open the front door.')
    const existing = ['I ______ my keys. I cannot open the door.']
    const issues = checkDuplicate(item, existing)
    // With such high overlap, should be at least a warning.
    expect(issues.some((i) => i.code === 'NEAR_DUPLICATE')).toBe(true)
  })

  it('passes when stems are sufficiently different', () => {
    const item = mcq('She ______ to the store to buy groceries for dinner.')
    const existing = ['I ______ my keys. I cannot open the door.']
    expect(checkDuplicate(item, existing)).toHaveLength(0)
  })

  it('passes with an empty bank', () => {
    const item = mcq('I ______ my keys.')
    expect(checkDuplicate(item, [])).toHaveLength(0)
  })

  it('stops after the first reject (no need to check the rest)', () => {
    const item = mcq('I ______ my keys. I cannot open the door.')
    const existing = [
      'I ______ my keys. I cannot open the door.',
      'I ______ my keys. I cannot open the door.',
    ]
    const issues = checkDuplicate(item, existing)
    // Should return exactly one reject, not two.
    expect(issues.filter((i) => i.severity === 'reject')).toHaveLength(1)
  })
})
```

- [ ] **Step 3: Run near-duplicate tests**

Run: `npx vitest run tests/items/duplicate.test.ts`
Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
git add src/items/duplicate.ts tests/items/duplicate.test.ts
git commit -m "feat(items): add near-duplicate detection gate"
```

---

### Task 3: Node-Targeting Verification Gate

**Files:**
- Create: `src/items/targeting.ts`
- Create: `tests/items/targeting.test.ts`

**Interfaces:**
- Consumes: `McqItem`, `ItemIssue` from `types.ts`
- Produces: `checkTargeting(item: McqItem): ItemIssue[]`

- [ ] **Step 1: Write the node-targeting gate**

Create `src/items/targeting.ts`:

```typescript
import type { ItemIssue, McqItem } from './types'

// Expected linguistic signals for grammar nodes. Each entry maps a node
// ID segment (the last part after the final dot) to regex patterns that
// must appear in the option texts.
//
// A "contrast" field means the item tests the distinction between two
// forms — both sides must appear across the options.

interface TargetPattern {
  // The dot-segment to match in the node ID.
  segment: string
  // At least one pattern must match in the concatenated option texts.
  required: RegExp[]
  // If present, at least one of these must ALSO match (in a different
  // option), confirming both sides of the contrast are represented.
  contrast?: RegExp[]
}

const GRAMMAR_TARGETS: TargetPattern[] = [
  {
    segment: 'be_present',
    required: [/\b(am|is|are)\b/i],
  },
  {
    segment: 'present_simple',
    required: [/\b\w+(s|es)\b/i, /\b(go|do|have|like|want|need|know|think|see|come|take|make|get|give|live|work|play|say|use|try)\b/i],
  },
  {
    segment: 'can_cant',
    required: [/\b(can|can't|cannot)\b/i],
  },
  {
    segment: 'past_simple',
    required: [/\b\w+ed\b/i, /\b(went|saw|came|took|made|got|gave|said|had|did|was|were|knew|thought|ran|ate|drank|drove|wrote|spoke|bought|sold|built|found|left|met|read|told|won|lost|broke|chose|fell|forgot|grew|held|kept|led|meant|paid|put|sat|sent|set|shot|shut|stood|spent|stuck|taught|threw|wore|woke|understood)\b/i],
  },
  {
    segment: 'future_going_to',
    required: [/\bgoing to\b/i],
  },
  {
    segment: 'comparatives',
    required: [/\b\w+(er|ier)\b/i, /\b(more|most|than|less|least|better|worse|best|worst)\b/i],
  },
  {
    segment: 'present_perfect',
    required: [/\b(has|have)\s+\w+/i],
  },
  {
    // The contrast node: must have both present-perfect AND past-simple
    // forms across the options.
    segment: 'pp_vs_past_simple',
    required: [/\b(has|have)\s+\w+/i],
    contrast: [/\b(went|saw|came|took|made|got|gave|said|had|did|was|were|knew|thought|\w+ed)\b/i],
  },
  {
    segment: 'modals',
    required: [/\b(must|should|might|could|would|may)\b/i],
  },
  {
    segment: 'conditionals',
    required: [/\b(if|would|could|might)\b/i],
  },
  {
    segment: 'passive',
    required: [/\b(is|are|was|were|been|being)\s+\w+(ed|en|t)\b/i, /\b(was|were|is|are|been)\s+(built|made|done|given|taken|seen|known|found|left|told|written|spoken|bought|sold|broken|chosen|forgotten|held|kept|meant|sent|set|shot|shut|spent|stuck|taught|thrown|worn|woken|understood)\b/i],
  },
  {
    segment: 'reported_speech',
    required: [/\b(said|told|asked)\b/i],
  },
]

// Check whether the item's options contain the linguistic patterns
// expected for its target grammar node.
export function checkTargeting(item: McqItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // Only check grammar nodes — cando, lexical, phono, strategy items
  // don't have MCQ generation yet and their "targeting" is semantic,
  // not structural.
  const grammarNodeIds = item.nodeIds.filter((id) => id.startsWith('gram.'))
  if (grammarNodeIds.length === 0) return issues

  // Concatenate all option texts for pattern matching.
  const allOptions = item.options.map((o) => o.text).join(' | ')

  for (const nodeId of grammarNodeIds) {
    // Extract the last segment: "gram.b1.present_perfect" → "present_perfect"
    const segments = nodeId.split('.')
    const lastSegment = segments[segments.length - 1]!

    const target = GRAMMAR_TARGETS.find((t) => t.segment === lastSegment)
    if (!target) continue // unknown node — no pattern defined, skip

    // Check required patterns.
    const hasRequired = target.required.some((re) => re.test(allOptions))
    if (!hasRequired) {
      issues.push({
        code: 'OFF_TARGET',
        severity: 'reject',
        message:
          `Item targets ${nodeId} but the options contain none of the ` +
          `expected linguistic patterns for "${lastSegment}". The item ` +
          `may be testing something other than what it claims.`,
      })
      continue
    }

    // Check contrast patterns (e.g. pp_vs_past_simple needs both sides).
    if (target.contrast) {
      const hasContrast = target.contrast.some((re) => re.test(allOptions))
      if (!hasContrast) {
        issues.push({
          code: 'OFF_TARGET',
          severity: 'warn',
          message:
            `Item targets ${nodeId} (a contrast node) but only one side of ` +
            `the contrast appears in the options. A contrast item should ` +
            `offer both forms so the learner must choose between them.`,
        })
      }
    }
  }

  return issues
}
```

- [ ] **Step 2: Write node-targeting tests**

Create `tests/items/targeting.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { checkTargeting } from '@/items/targeting'
import type { McqItem } from '@/items/types'

function mcq(overrides: Partial<McqItem> = {}): McqItem {
  return {
    id: 'test.target',
    stem: 'I ______ my keys.',
    options: [
      { text: 'have lost', misconception: null },
      { text: 'lost', misconception: 'uses past simple though the result still matters now' },
      { text: 'was losing', misconception: 'treats a completed event as an ongoing action' },
      { text: 'am losing', misconception: 'places a finished event in the present moment' },
    ],
    correctIndex: 0,
    nodeIds: ['gram.b1.pp_vs_past_simple'],
    level: 'B1',
    ...overrides,
  }
}

describe('checkTargeting', () => {
  it('passes a well-targeted pp_vs_past_simple item', () => {
    // "have lost" (present perfect) vs "lost" (past simple) — both sides present.
    expect(checkTargeting(mcq())).toHaveLength(0)
  })

  it('skips non-grammar nodes', () => {
    const item = mcq({ nodeIds: ['cando.b1.understand_monologue'] })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('skips items with no nodeIds', () => {
    const item = mcq({ nodeIds: [] })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('rejects a present_perfect item with no present-perfect forms', () => {
    const item = mcq({
      nodeIds: ['gram.b1.present_perfect'],
      options: [
        { text: 'went', misconception: null },
        { text: 'walked', misconception: 'uses a different past-tense verb' },
        { text: 'ran', misconception: 'uses running instead of going' },
        { text: 'drove', misconception: 'uses driving instead of going' },
      ],
    })
    const issues = checkTargeting(item)
    expect(issues.some((i) => i.code === 'OFF_TARGET' && i.severity === 'reject')).toBe(true)
  })

  it('warns when a contrast node only has one side', () => {
    // pp_vs_past_simple needs both present perfect AND past simple.
    // This item has present perfect but no past simple forms.
    const item = mcq({
      nodeIds: ['gram.b1.pp_vs_past_simple'],
      options: [
        { text: 'have lost', misconception: null },
        { text: 'have taken', misconception: 'confuses the verb but keeps the right tense' },
        { text: 'have seen', misconception: 'confuses the verb but keeps the right tense' },
        { text: 'have made', misconception: 'confuses the verb but keeps the right tense' },
      ],
    })
    const issues = checkTargeting(item)
    expect(issues.some((i) => i.code === 'OFF_TARGET' && i.severity === 'warn')).toBe(true)
  })

  it('passes a modals item with modal verbs in options', () => {
    const item = mcq({
      nodeIds: ['gram.b1.modals'],
      options: [
        { text: 'should go', misconception: null },
        { text: 'must go', misconception: 'uses obligation instead of advice' },
        { text: 'might go', misconception: 'uses possibility instead of advice' },
        { text: 'go', misconception: 'omits the modal entirely' },
      ],
    })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('passes a past_simple item with past-tense forms', () => {
    const item = mcq({
      nodeIds: ['gram.a2.past_simple'],
      options: [
        { text: 'went', misconception: null },
        { text: 'go', misconception: 'uses present form for a past event' },
        { text: 'going', misconception: 'uses the gerund for a completed action' },
        { text: 'goes', misconception: 'uses third-person present for a past event' },
      ],
    })
    expect(checkTargeting(item)).toHaveLength(0)
  })

  it('rejects a passive item with no passive forms', () => {
    const item = mcq({
      nodeIds: ['gram.b2.passive'],
      options: [
        { text: 'runs', misconception: null },
        { text: 'ran', misconception: 'uses past tense instead of passive' },
        { text: 'running', misconception: 'uses gerund instead of passive' },
        { text: 'run', misconception: 'uses bare form instead of passive' },
      ],
    })
    const issues = checkTargeting(item)
    expect(issues.some((i) => i.code === 'OFF_TARGET' && i.severity === 'reject')).toBe(true)
  })

  it('passes when nodeId segment is not in the lookup table', () => {
    // Unknown grammar structure — no pattern defined, so the gate
    // cannot check it and should not guess.
    const item = mcq({ nodeIds: ['gram.c2.cleft_sentences'] })
    expect(checkTargeting(item)).toHaveLength(0)
  })
})
```

- [ ] **Step 3: Run targeting tests**

Run: `npx vitest run tests/items/targeting.test.ts`
Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
git add src/items/targeting.ts tests/items/targeting.test.ts
git commit -m "feat(items): add node-targeting verification gate"
```

---

### Task 4: Wire Gates into Orchestrator + Update All Call Sites

**Files:**
- Modify: `src/items/types.ts:42-50` — add 5 new issue codes
- Modify: `src/items/review.ts` — add `ReviewContext`, wire 3 new gates
- Modify: `src/generation/generate.ts:18-22,54-57,74` — add `existingStems` to request, pass context
- Modify: `src/content/publish.ts:100` — update `reviewItem` call
- Modify: `tests/items/review.test.ts:25,29` — update `reviewItem` calls
- Modify: `tests/items/acceptance.test.ts:45-46,102,127` — update `reviewItem` calls
- Modify: `tests/items/golden-set.test.ts:6,132-134,292-293` — update `reviewItem` calls, add new golden items
- Modify: `tests/generation/generate.test.ts:62,74` — update `generateItem` calls
- Modify: `tests/content/publish.test.ts` — no changes needed (publish.ts calls reviewItem internally)

**Interfaces:**
- Consumes: `checkAnswerKey(item: McqItem): ItemIssue[]` from Task 1
- Consumes: `checkDuplicate(item: McqItem, existingStems: string[]): ItemIssue[]` from Task 2
- Consumes: `checkTargeting(item: McqItem): ItemIssue[]` from Task 3
- Produces: `ReviewContext` type, updated `reviewItem(item: McqItem, context: ReviewContext): ItemReview`

- [ ] **Step 1: Add new issue codes to types.ts**

In `src/items/types.ts`, replace the `ItemIssueCode` type (lines 42-50):

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
```

with:

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
```

- [ ] **Step 2: Update the orchestrator in review.ts**

Replace the entire `src/items/review.ts` with:

```typescript
import { levelIndex } from '@/skill-graph/types'
import { profileText } from '@/profiler/profile'
import type { ProfilerInventory } from '@/profiler/profile'
import { checkMisconceptions } from './misconceptions'
import { checkWellFormed } from './wellformed'
import { checkGiveaway } from './giveaway'
import { checkShape } from './shape'
import { checkAnswerKey } from './answer-key'
import { checkTargeting } from './targeting'
import { checkDuplicate } from './duplicate'
import type { ItemIssue, ItemReview, McqItem } from './types'

// Context needed by the review pipeline. The inventory is always
// required; other fields enable optional gates.
export interface ReviewContext {
  inventory: ProfilerInventory
  // Stems of items already in the bank. When provided, the duplicate
  // gate compares the candidate against them. When omitted (e.g. in
  // unit tests that don't need dedup), the gate is skipped.
  existingStems?: string[]
}

// Run every gate over one item.
//
// The gates are deliberately separate and each was built from a real
// failure rather than from imagining what might go wrong. An item passes
// only when nothing rejects it; warnings are surfaced but do not block.
export function reviewItem(item: McqItem, context: ReviewContext): ItemReview {
  const issues: ItemIssue[] = [
    // Cheapest gates first, all run regardless — an item collects every issue.
    ...checkShape(item),
    ...checkWellFormed(item),
    ...checkMisconceptions(item),
    ...checkGiveaway(item),
    ...checkAnswerKey(item),
    ...checkTargeting(item),
    ...checkLevel(item, context.inventory),
    // Duplicate gate only runs when a bank is provided.
    ...(context.existingStems ? checkDuplicate(item, context.existingStems) : []),
  ]

  return {
    passed: !issues.some((i) => i.severity === 'reject'),
    issues,
  }
}

// Reject an item whose own language sits above the level it targets.
function checkLevel(item: McqItem, inventory: ProfilerInventory): ItemIssue[] {
  const issues: ItemIssue[] = []

  const profile = profileText(item.stem, inventory, item.level)

  for (const above of profile.aboveLevel) {
    issues.push({
      code: 'ABOVE_LEVEL',
      severity: 'reject',
      message: `The stem uses "${above.lemma}" (${above.level}) in an item targeting ${item.level}. A learner who cannot read the question cannot demonstrate what it tests.`,
    })
  }

  for (const uncertain of profile.uncertainPhrases) {
    if (levelIndex(uncertain.level) <= levelIndex(item.level)) continue
    issues.push({
      code: 'ABOVE_LEVEL',
      severity: 'warn',
      message: `The stem may use "${uncertain.lemma}" above ${item.level} — its level is estimated, not established, so this needs a human decision.`,
    })
  }

  return issues
}
```

- [ ] **Step 3: Update generate.ts**

In `src/generation/generate.ts`, update the `GenerateItemRequest` interface (lines 18-22):

```typescript
export interface GenerateItemRequest {
  node: SkillNode
  level?: CefrLevel
  itemId: string
}
```

to:

```typescript
export interface GenerateItemRequest {
  node: SkillNode
  level?: CefrLevel
  itemId: string
  // Stems already in the item bank, for duplicate detection.
  existingStems?: string[]
}
```

Then update the import at line 5:

```typescript
import { reviewItem } from '@/items/review'
```

to:

```typescript
import { reviewItem } from '@/items/review'
import type { ReviewContext } from '@/items/review'
```

Then update the `generateItem` function signature and the `reviewItem` call. Replace lines 54-74:

```typescript
export async function generateItem(
  provider: GenerationProvider,
  inventory: ProfilerInventory,
  request: GenerateItemRequest,
): Promise<GenerateItemResult> {
  const level = request.level ?? request.node.level
  const constraints = buildConstraints(request.node, inventory, level)
  const prompt = renderConstraints(constraints) + '\n\nRespond with a single JSON object. No prose.'
  const attempts: AttemptOutcome[] = []

  for (let i = 0; i <= MAX_RETRIES; i++) {
    const response = await provider.generate({ prompt, maxTokens: MAX_TOKENS })
    const parsed = response.parsed ?? parseModelOutput(response.raw)

    if (!parsed) {
      attempts.push({ kind: 'parse_failure', raw: response.raw })
      continue
    }

    const item = toMcqItem(parsed, request.itemId, level)
    const review = reviewItem(item, inventory)
```

to:

```typescript
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
```

- [ ] **Step 4: Update publish.ts**

In `src/content/publish.ts`, update line 100:

```typescript
  const review = reviewItem(mcq, inventory)
```

to:

```typescript
  const review = reviewItem(mcq, { inventory })
```

- [ ] **Step 5: Update test files — review.test.ts**

In `tests/items/review.test.ts`, update the `codes` helper (line 25):

```typescript
const codes = (i: McqItem) => reviewItem(i, inventory).issues.map((x) => x.code)
```

to:

```typescript
const codes = (i: McqItem) => reviewItem(i, { inventory }).issues.map((x) => x.code)
```

And update line 29:

```typescript
    const review = reviewItem(item(), inventory)
```

to:

```typescript
    const review = reviewItem(item(), { inventory })
```

And update line 71:

```typescript
    const review = reviewItem(telling, inventory)
```

to:

```typescript
    const review = reviewItem(telling, { inventory })
```

And update line 107:

```typescript
    expect(reviewItem(bad, inventory).passed).toBe(false)
```

to:

```typescript
    expect(reviewItem(bad, { inventory }).passed).toBe(false)
```

- [ ] **Step 6: Update test files — acceptance.test.ts**

In `tests/items/acceptance.test.ts`, update all `reviewItem` calls from `reviewItem(X, inventory)` to `reviewItem(X, { inventory })`. There are 4 call sites: lines 45, 46 (implicit via `codes`), 102, and 127.

Replace all occurrences of `reviewItem(QUESTION_ONE, inventory)` with `reviewItem(QUESTION_ONE, { inventory })`, `reviewItem(QUESTION_TWO, inventory)` with `reviewItem(QUESTION_TWO, { inventory })`, `reviewItem(repaired, inventory)` with `reviewItem(repaired, { inventory })`.

- [ ] **Step 7: Update test files — golden-set.test.ts**

In `tests/items/golden-set.test.ts`, update all `reviewItem(item, inventory)` calls to `reviewItem(item, { inventory })` using replace-all. There are approximately 6 call sites across the good items loop, bad items loop, and edge case tests.

- [ ] **Step 8: Add 5 new golden items to golden-set.test.ts**

Add to the `badItems` array in `tests/items/golden-set.test.ts`:

```typescript
    {
      label: 'wrong answer key: correct option is ungrammatical',
      expectedCode: 'WRONG_KEY',
      item: mcq({
        stem: 'I ______ my homework.',
        options: [
          { text: 'have finish', misconception: null },
          { text: 'finished', misconception: 'uses past simple for a just-completed action' },
          { text: 'was finishing', misconception: 'treats a completed action as ongoing' },
          { text: 'am finishing', misconception: 'treats a completed action as happening now' },
        ],
      }),
    },
    {
      label: 'misconception mismatch: claims past simple but option is present perfect',
      expectedCode: 'MISCONCEPTION_MISMATCH',
      item: mcq({
        stem: 'She ______ to many countries.',
        options: [
          { text: 'has been', misconception: null },
          { text: 'has gone', misconception: 'uses past simple for a life experience' },
          { text: 'was going', misconception: 'treats a life summary as a continuous action' },
          { text: 'went', misconception: 'uses past simple for a life experience with no time frame' },
        ],
      }),
    },
    {
      label: 'off-target: claims present_perfect but all options are past simple',
      expectedCode: 'OFF_TARGET',
      item: mcq({
        nodeIds: ['gram.b1.present_perfect'],
        stem: 'They ______ home early.',
        options: [
          { text: 'went', misconception: null },
          { text: 'walked', misconception: 'uses a different past-tense verb than expected' },
          { text: 'ran', misconception: 'uses running rather than going home' },
          { text: 'drove', misconception: 'uses driving rather than going home' },
        ],
      }),
    },
```

Add to the edge case `describe` block:

```typescript
  it('accepts "has read" in answer-key verification — invariant verb', () => {
    const item = mcq({
      stem: 'She ______ three books this month.',
      options: [
        { text: 'has read', misconception: null },
        { text: 'read', misconception: 'uses past simple for an unfinished time period' },
        { text: 'was reading', misconception: 'treats a quantity achievement as a continuous action' },
        { text: 'reads', misconception: 'uses present simple for a recent achievement' },
      ],
    })
    const review = reviewItem(item, { inventory })
    expect(review.issues.some((i) => i.code === 'WRONG_KEY')).toBe(false)
  })

  it('skips targeting gate for cando nodes', () => {
    const item = mcq({
      nodeIds: ['cando.b1.understand_monologue'],
      stem: 'She ______ the lecture.',
      options: [
        { text: 'understood', misconception: null },
        { text: 'understands', misconception: 'uses present for a past event' },
        { text: 'understanding', misconception: 'uses gerund as a finite verb' },
        { text: 'understand', misconception: 'uses bare form for a past event' },
      ],
    })
    const review = reviewItem(item, { inventory })
    expect(review.issues.some((i) => i.code === 'OFF_TARGET')).toBe(false)
  })
```

- [ ] **Step 9: Run the full test suite**

Run: `npx vitest run`
Expected: all tests pass (820+ existing plus new ones from Tasks 1-3)

- [ ] **Step 10: Commit**

```bash
git add src/items/types.ts src/items/review.ts src/generation/generate.ts src/content/publish.ts tests/items/review.test.ts tests/items/acceptance.test.ts tests/items/golden-set.test.ts tests/generation/generate.test.ts
git commit -m "feat(items): wire answer-key, duplicate, and targeting gates into review pipeline"
```
