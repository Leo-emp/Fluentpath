# FluentPath R1b-a — Level Inventories and Vocabulary Profiler Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the CEFR level inventories (vocabulary, multi-word verbs, grammar) and a text profiler that reports what CEFR level a piece of text is and which words sit above a target level — the first quality gate every generated item must pass.

**Architecture:** Three inventories loaded from vendored open-licensed data into Turso. The profiler tokenises text with `compromise`, matches **multi-word units first** and single words second, and reports a level distribution plus above-level items. Multi-word verb levels are *derived* (WordNet supplies the phrases but no levels), so a validation harness measures the levelling method against the 8,653 words whose levels are already known — the method ships only if it scores acceptably on that held-out set.

**Tech Stack:** TypeScript, Turso (libSQL) + Drizzle, Vitest, `compromise` (POS tagging + lemmatisation), `wordnet-db` (multi-word verb inventory).

## Global Constraints

- CEFR levels are exactly: `preA1`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`. Inventory data covers `A1`–`C2` only.
- Every inventory row records its `source` and, where the level was not supplied by the source, a `levelSource` of `derived` plus a `confidence` 0..1.
- Vendored data lives in `data/inventories/`. Licence and attribution files sit beside it. Never modify the vendored CSVs in place.
- Attribution is a legal obligation (spec §3.7). CEFR-J requires citation; WordNet requires its licence notice; Octanove is CC BY-SA.
- No `Date.now()` inside pure functions — time is a parameter.
- Pure functions live in modules with no database imports.
- **Acceptance gate for this plan:** the three sentences in Task 12 must profile correctly. The profiler is not done until they do.

## Verified facts this plan is built on

Checked directly against the data, not assumed:

| Fact | Value |
|---|---|
| CEFR-J vocabulary rows | 7,799 — levels A1/A2/B1/B2 only |
| Octanove C1/C2 rows | 2,136 — levels C1/C2 |
| Distinct headwords after merge, splitting `/` variants | ~8,845 |
| CEFR-J grammar rows | 500 |
| Grammar rows with blank `CEFR-J Level` | 330 (66%) |
| Grammar rows with a level in **some** column | 484 of 500 |
| WordNet multi-word verb entries | 2,838 |
| Malformed Octanove rows | 2 (`pos='vern'`, one blank `pos`) |
| Duplicate CEFR-J headword+pos | 1 (`March|noun` at A1 and B1) |

---

### Task 1: Vendor data and record attribution

**Files:**
- Verify present: `data/inventories/cefrj-vocabulary-profile-1.5.csv`
- Verify present: `data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv`
- Verify present: `data/inventories/cefrj-grammar-profile-20180315.csv`
- Create: `data/inventories/SOURCES.md`
- Test: `tests/inventory/sources.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: the three CSV files at known paths, plus `SOURCES.md`

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/sources.test.ts
import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'

const FILES = [
  'data/inventories/cefrj-vocabulary-profile-1.5.csv',
  'data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv',
  'data/inventories/cefrj-grammar-profile-20180315.csv',
]

describe('vendored inventory data', () => {
  it('has all three source files', () => {
    for (const f of FILES) expect(existsSync(f), `missing ${f}`).toBe(true)
  })

  it('has a SOURCES.md recording licence and attribution', () => {
    expect(existsSync('data/inventories/SOURCES.md')).toBe(true)
    const text = readFileSync('data/inventories/SOURCES.md', 'utf8')
    // Attribution is a legal obligation, so assert the required names appear.
    expect(text).toContain('CEFR-J')
    expect(text).toContain('Tono')
    expect(text).toContain('Octanove')
    expect(text).toContain('CC BY-SA')
    expect(text).toContain('WordNet')
    expect(text).toContain('Princeton')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/sources.test.ts`
Expected: FAIL — `SOURCES.md` does not exist.

- [ ] **Step 3: Create `data/inventories/SOURCES.md`**

```markdown
# Inventory data sources

Every entry here is used commercially. Attribution below is a licence
obligation, not a courtesy. The attributions page in the application is
generated from this file.

## CEFR-J Vocabulary Profile 1.5
- File: `cefrj-vocabulary-profile-1.5.csv`
- Rows: 7,799 (levels A1-B2)
- Copyright: Tono Laboratory, Tokyo University of Foreign Studies (TUFS)
- Licence: free for research and commercial use, with proper citation
- Source: https://github.com/openlanguageprofiles/olp-en-cefrj
- Required citation: Tono, Y. (ed.) CEFR-J Wordlist Version 1.5.
  Compiled by Yukio Tono, Tokyo University of Foreign Studies.

## Octanove Vocabulary Profile C1/C2 1.0
- File: `octanove-vocabulary-profile-c1c2-1.0.csv`
- Rows: 2,136 (levels C1-C2)
- Copyright: Octanove Labs
- Licence: CC BY-SA 4.0
- Note: share-alike. Used as an internal reference lookup only; never
  republished as a dataset, and never used as the basis of an adapted work.

## CEFR-J Grammar Profile 2018-03-15
- File: `cefrj-grammar-profile-20180315.csv`
- Rows: 500
- Copyright: Tono Laboratory, TUFS
- Licence: as CEFR-J above
- Known limitation: partially translated from Japanese; 330 of 500 rows have
  a blank primary level and require the fallback cascade in `level-parser.ts`.

## WordNet 3.1 (via `wordnet-db`)
- Used for: multi-word verb inventory (2,838 entries)
- Copyright: Princeton University
- Licence: permits commercial use with the copyright notice retained
- Note: WordNet supplies the phrases but NOT CEFR levels. Levels for these
  entries are derived by this project and marked `levelSource: 'derived'`.

## Methodology note

CEFR levels for words are not defined by the CEFR itself, which describes
competences rather than vocabulary. They are measured. CEFR-J derived its
levels from English textbooks used in Japan, China and Korea, then aligned
B1-B2 against the Cambridge English Vocabulary Profile. Levels are therefore
evidence-based approximations, and different sources legitimately disagree.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/inventory/sources.test.ts`
Expected: PASS, 2 tests.

- [ ] **Step 5: Commit**

```bash
git add data package.json package-lock.json tests/inventory/sources.test.ts
git commit -m "chore: vendor CEFR-J inventories with licence attribution"
```

---

### Task 2: CEFR level parser

**Files:**
- Create: `src/inventory/level-parser.ts`
- Test: `tests/inventory/level-parser.test.ts`

**Interfaces:**
- Consumes: `CefrLevel`, `CEFR_LEVELS`, `levelIndex` from `@/skill-graph/types`
- Produces: `parseCefrLevel(raw: string): CefrLevel | null`

**Design note:** the grammar CSV contains sub-levels (`A1.1`), asterisks (`B2.2*`), ranges with an ASCII hyphen (`A1-B1`), ranges with a **Japanese full-width dash** (`A1ーB1`, U+30FC), parenthesised ranges (`A1-(A2)-B1`), comma lists (`B1, C2`), and the literal `N/A`. Every one of these appears in the real file. Ranges resolve to the **lowest** level, because that is where the structure is first introduced.

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/level-parser.test.ts
import { describe, it, expect } from 'vitest'
import { parseCefrLevel } from '@/inventory/level-parser'

describe('plain levels', () => {
  it('parses a bare level', () => {
    expect(parseCefrLevel('A1')).toBe('A1')
    expect(parseCefrLevel('C2')).toBe('C2')
  })

  it('is case and whitespace tolerant', () => {
    expect(parseCefrLevel('  b1 ')).toBe('B1')
  })
})

describe('sub-levels', () => {
  it('collapses a sub-level to its major level', () => {
    expect(parseCefrLevel('A1.1')).toBe('A1')
    expect(parseCefrLevel('B2.2')).toBe('B2')
  })
})

describe('annotations', () => {
  it('strips a trailing asterisk', () => {
    expect(parseCefrLevel('B2.2*')).toBe('B2')
    expect(parseCefrLevel('B1*')).toBe('B1')
  })
})

describe('ranges', () => {
  it('takes the lowest level of an ASCII range', () => {
    expect(parseCefrLevel('A1-B1')).toBe('A1')
    expect(parseCefrLevel('B2-C1')).toBe('B2')
  })

  it('handles the Japanese full-width dash used in the real file', () => {
    expect(parseCefrLevel('A1ーB1')).toBe('A1')
  })

  it('handles parenthesised ranges', () => {
    expect(parseCefrLevel('A1-(A2)-B1')).toBe('A1')
  })

  it('handles comma lists', () => {
    expect(parseCefrLevel('B1, C2')).toBe('B1')
    expect(parseCefrLevel('A1,B1,B2')).toBe('A1')
  })
})

describe('absent values', () => {
  it('returns null for blank', () => {
    expect(parseCefrLevel('')).toBeNull()
    expect(parseCefrLevel('   ')).toBeNull()
  })

  it('returns null for N/A', () => {
    expect(parseCefrLevel('N/A')).toBeNull()
    expect(parseCefrLevel('n/a')).toBeNull()
  })

  it('returns null for unrecognisable text', () => {
    expect(parseCefrLevel('unknown')).toBeNull()
    expect(parseCefrLevel('Z9')).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/level-parser.test.ts`
Expected: FAIL — cannot resolve `@/inventory/level-parser`.

- [ ] **Step 3: Create `src/inventory/level-parser.ts`**

```ts
import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'

/**
 * Parse a CEFR level out of the messy strings the source data actually
 * contains.
 *
 * Every format handled here was observed in the real CEFR-J grammar file:
 * sub-levels (A1.1), asterisks (B2.2*), ASCII ranges (A1-B1), ranges using a
 * Japanese full-width dash (A1ーB1), parenthesised ranges (A1-(A2)-B1),
 * comma lists (B1, C2), and the literal "N/A".
 *
 * Ranges resolve to the LOWEST level in them, because a structure spanning
 * A1-B1 is introduced at A1.
 *
 * @returns the level, or null when the value carries no level information
 */
export function parseCefrLevel(raw: string): CefrLevel | null {
  if (!raw) return null

  const cleaned = raw.trim().toUpperCase()
  if (cleaned === '' || cleaned === 'N/A') return null

  // Find every level-shaped token, ignoring sub-level digits, asterisks,
  // brackets and whichever dash or separator was used. This deliberately
  // sidesteps parsing the separator itself — the Japanese full-width dash
  // (U+30FC) appears in at least one row and is easy to miss.
  const matches = cleaned.match(/[ABC][12]/g)
  if (!matches || matches.length === 0) return null

  let lowest: CefrLevel | null = null
  for (const token of matches) {
    // The regex can only produce two-character tokens, but guard anyway so a
    // future change to the pattern cannot inject an invalid level.
    if (!(CEFR_LEVELS as readonly string[]).includes(token)) continue
    const level = token as CefrLevel
    if (lowest === null || levelIndex(level) < levelIndex(lowest)) lowest = level
  }

  return lowest
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/inventory/level-parser.test.ts`
Expected: PASS, 12 tests.

- [ ] **Step 5: Commit**

```bash
git add src/inventory/level-parser.ts tests/inventory/level-parser.test.ts
git commit -m "feat: CEFR level parser handling the real data's messy formats"
```

---

### Task 3: Inventory types and CSV reader

**Files:**
- Create: `src/inventory/types.ts`
- Create: `src/inventory/csv.ts`
- Test: `tests/inventory/csv.test.ts`

**Interfaces:**
- Consumes: `CefrLevel`
- Produces:
  - `LevelSource = 'source' | 'derived'`
  - `LexicalEntry = { headword: string; pos: string; level: CefrLevel; source: string; levelSource: LevelSource; confidence: number }`
  - `MultiwordEntry = { phrase: string; level: CefrLevel; source: string; levelSource: LevelSource; confidence: number }`
  - `GrammarEntry = { id: string; item: string; sentenceType: string; level: CefrLevel; source: string; levelSource: LevelSource; confidence: number }`
  - `parseCsv(text: string): Record<string, string>[]`

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/csv.test.ts
import { describe, it, expect } from 'vitest'
import { parseCsv } from '@/inventory/csv'

describe('parseCsv', () => {
  it('parses headers and rows', () => {
    const rows = parseCsv('a,b\n1,2\n3,4')
    expect(rows).toEqual([
      { a: '1', b: '2' },
      { a: '3', b: '4' },
    ])
  })

  it('handles quoted fields containing commas', () => {
    const rows = parseCsv('a,b\n"x,y",z')
    expect(rows[0]).toEqual({ a: 'x,y', b: 'z' })
  })

  it('trims whitespace around values', () => {
    expect(parseCsv('a,b\n  x ,  y ')[0]).toEqual({ a: 'x', b: 'y' })
  })

  it('tolerates CRLF line endings', () => {
    expect(parseCsv('a,b\r\n1,2\r\n')).toEqual([{ a: '1', b: '2' }])
  })

  it('skips blank lines', () => {
    expect(parseCsv('a\n1\n\n2\n')).toEqual([{ a: '1' }, { a: '2' }])
  })

  it('fills missing trailing cells with empty strings', () => {
    expect(parseCsv('a,b,c\n1,2')[0]).toEqual({ a: '1', b: '2', c: '' })
  })

  it('returns an empty array for an empty input', () => {
    expect(parseCsv('')).toEqual([])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/csv.test.ts`
Expected: FAIL — cannot resolve `@/inventory/csv`.

- [ ] **Step 3: Create `src/inventory/types.ts`**

```ts
import type { CefrLevel } from '@/skill-graph/types'

/**
 * Where a level came from.
 *
 * `source` means the dataset stated it. `derived` means this project computed
 * it — currently only multi-word verbs, because WordNet supplies the phrases
 * but no levels. The distinction is surfaced to reviewers and never collapsed,
 * because derived levels are estimates and must not be mistaken for evidence.
 */
export type LevelSource = 'source' | 'derived'

export interface LexicalEntry {
  headword: string
  /** Normalised part of speech — see `normalisePos`. */
  pos: string
  level: CefrLevel
  /** Dataset identifier, e.g. 'cefrj-1.5'. */
  source: string
  levelSource: LevelSource
  /** 1 for stated levels; below 1 for derived ones. */
  confidence: number
}

export interface MultiwordEntry {
  /** Space-separated, lowercase, e.g. 'give up'. */
  phrase: string
  level: CefrLevel
  source: string
  levelSource: LevelSource
  confidence: number
}

export interface GrammarEntry {
  /** Shorthand code from the source, e.g. 'PP.I_am'. */
  id: string
  item: string
  sentenceType: string
  level: CefrLevel
  source: string
  levelSource: LevelSource
  confidence: number
}
```

- [ ] **Step 4: Create `src/inventory/csv.ts`**

```ts
/**
 * Minimal CSV reader for the vendored inventory files.
 *
 * A dependency would be overkill: these are three static files whose exact
 * shape is known and pinned. The only non-trivial case they contain is quoted
 * fields with embedded commas, which is handled below.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '')
  if (lines.length === 0) return []

  const headers = splitRow(lines[0]!).map((h) => h.trim())

  return lines.slice(1).map((line) => {
    const cells = splitRow(line)
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = (cells[i] ?? '').trim()
    })
    return row
  })
}

/** Split one CSV line, respecting double-quoted fields. */
function splitRow(line: string): string[] {
  const cells: string[] = []
  let current = ''
  let inQuotes = false

  for (const ch of line) {
    if (ch === '"') inQuotes = !inQuotes
    else if (ch === ',' && !inQuotes) {
      cells.push(current)
      current = ''
    } else current += ch
  }
  cells.push(current)

  return cells
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/inventory/csv.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 6: Commit**

```bash
git add src/inventory/types.ts src/inventory/csv.ts tests/inventory/csv.test.ts
git commit -m "feat: inventory types and CSV reader"
```

---

### Task 4: Part-of-speech normalisation

**Files:**
- Create: `src/inventory/pos.ts`
- Test: `tests/inventory/pos.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `NORMALISED_POS` (readonly tuple)
  - `NormalisedPos` type
  - `normalisePos(raw: string): NormalisedPos`

**Design note:** CEFR-J uses non-standard tags observed in the real file — `be-verb`, `do-verb`, `have-verb`, `infinitive-to`, `modal auxiliary`, `number`. Octanove contains one typo (`vern`) and one blank. All must collapse onto one vocabulary or the inventory holds inconsistent parts of speech.

Note that the profiler does **not** use part of speech for lookup — `build-inventory.ts` keys words by headword alone, taking the lowest level across parts of speech. That is the conservative choice for a gate. POS is retained on inventory entries because it is linguistically meaningful and R1b-b will store it, but a POS-aware lookup is a later refinement, not built here.

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/pos.test.ts
import { describe, it, expect } from 'vitest'
import { normalisePos } from '@/inventory/pos'

describe('normalisePos', () => {
  it('passes through standard tags', () => {
    expect(normalisePos('noun')).toBe('noun')
    expect(normalisePos('verb')).toBe('verb')
    expect(normalisePos('adjective')).toBe('adjective')
    expect(normalisePos('adverb')).toBe('adverb')
  })

  it('is case and whitespace tolerant', () => {
    expect(normalisePos('  NOUN ')).toBe('noun')
  })

  it("maps CEFR-J's verb variants onto verb", () => {
    expect(normalisePos('be-verb')).toBe('verb')
    expect(normalisePos('do-verb')).toBe('verb')
    expect(normalisePos('have-verb')).toBe('verb')
    expect(normalisePos('modal auxiliary')).toBe('verb')
  })

  it('maps remaining CEFR-J tags', () => {
    expect(normalisePos('determiner')).toBe('determiner')
    expect(normalisePos('preposition')).toBe('preposition')
    expect(normalisePos('conjunction')).toBe('conjunction')
    expect(normalisePos('pronoun')).toBe('pronoun')
    expect(normalisePos('interjection')).toBe('interjection')
    expect(normalisePos('number')).toBe('number')
    expect(normalisePos('infinitive-to')).toBe('other')
  })

  it("repairs Octanove's 'vern' typo", () => {
    expect(normalisePos('vern')).toBe('verb')
  })

  it('maps blank and unknown to other', () => {
    expect(normalisePos('')).toBe('other')
    expect(normalisePos('sparkle')).toBe('other')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/pos.test.ts`
Expected: FAIL — cannot resolve `@/inventory/pos`.

- [ ] **Step 3: Create `src/inventory/pos.ts`**

```ts
export const NORMALISED_POS = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'determiner',
  'conjunction',
  'interjection',
  'number',
  'other',
] as const

export type NormalisedPos = (typeof NORMALISED_POS)[number]

/**
 * Map a source dataset's part-of-speech string onto our vocabulary.
 *
 * CEFR-J splits verbs into be-verb / do-verb / have-verb / modal auxiliary,
 * which is useful for grammar teaching but not for vocabulary lookup — all of
 * them collapse to `verb`. `vern` is a typo in the Octanove file.
 */
export function normalisePos(raw: string): NormalisedPos {
  const key = raw.trim().toLowerCase()

  const map: Record<string, NormalisedPos> = {
    noun: 'noun',
    verb: 'verb',
    vern: 'verb', // typo in octanove-vocabulary-profile-c1c2-1.0.csv
    'be-verb': 'verb',
    'do-verb': 'verb',
    'have-verb': 'verb',
    'modal auxiliary': 'verb',
    adjective: 'adjective',
    adverb: 'adverb',
    pronoun: 'pronoun',
    preposition: 'preposition',
    determiner: 'determiner',
    conjunction: 'conjunction',
    interjection: 'interjection',
    number: 'number',
  }

  return map[key] ?? 'other'
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/inventory/pos.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add src/inventory/pos.ts tests/inventory/pos.test.ts
git commit -m "feat: part-of-speech normalisation across source datasets and compromise"
```

---

### Task 5: Vocabulary loader

**Files:**
- Create: `src/inventory/load-vocabulary.ts`
- Test: `tests/inventory/load-vocabulary.test.ts`

**Interfaces:**
- Consumes: `parseCsv`, `parseCefrLevel`, `normalisePos`, `LexicalEntry`
- Produces: `loadVocabulary(cefrjCsv: string, octanoveCsv: string): LexicalEntry[]`

**Design note:** entries like `airplane/aeroplane` and `a.m./A.M./am/AM` list spelling variants separated by `/`. Each variant becomes its own entry so either spelling matches. Where the same headword+pos appears twice (the real file has `March|noun` at both A1 and B1), the **lowest** level wins — a learner meets the word at the earlier level.

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/load-vocabulary.test.ts
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { loadVocabulary } from '@/inventory/load-vocabulary'

const CEFRJ = 'headword,pos,CEFR,CoreInventory 1,CoreInventory 2,Threshold\n'
const OCT = 'headword,pos,CEFR,notes\n'

describe('loadVocabulary', () => {
  it('loads a simple entry', () => {
    const out = loadVocabulary(CEFRJ + 'cat,noun,A1,,,', OCT)
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({ headword: 'cat', pos: 'noun', level: 'A1', levelSource: 'source', confidence: 1 })
  })

  it('lowercases headwords', () => {
    expect(loadVocabulary(CEFRJ + 'March,noun,A1,,,', OCT)[0]?.headword).toBe('march')
  })

  it('splits slash-separated spelling variants into separate entries', () => {
    const out = loadVocabulary(CEFRJ + 'airplane/aeroplane,noun,A1,,,', OCT)
    expect(out.map((e) => e.headword).sort()).toEqual(['aeroplane', 'airplane'])
  })

  it('keeps the lowest level when a headword+pos repeats', () => {
    const out = loadVocabulary(CEFRJ + 'march,noun,B1,,,\nmarch,noun,A1,,,', OCT)
    expect(out).toHaveLength(1)
    expect(out[0]?.level).toBe('A1')
  })

  it('treats different parts of speech as separate entries', () => {
    const out = loadVocabulary(CEFRJ + 'water,noun,A1,,,\nwater,verb,B2,,,', OCT)
    expect(out).toHaveLength(2)
  })

  it('normalises CEFR-J verb variants', () => {
    expect(loadVocabulary(CEFRJ + 'be,be-verb,A1,,,', OCT)[0]?.pos).toBe('verb')
  })

  it('merges the Octanove C1/C2 file', () => {
    const out = loadVocabulary(CEFRJ + 'cat,noun,A1,,,', OCT + 'timid,adjective,C1,')
    expect(out).toHaveLength(2)
    expect(out.find((e) => e.headword === 'timid')?.level).toBe('C1')
  })

  it('repairs the Octanove vern typo', () => {
    expect(loadVocabulary(CEFRJ, OCT + 'remonstrate,vern,C2,')[0]?.pos).toBe('verb')
  })

  it('keeps an entry whose pos is blank, as other', () => {
    expect(loadVocabulary(CEFRJ, OCT + 'batter,,C1,')[0]?.pos).toBe('other')
  })

  it('skips rows with no parseable level', () => {
    expect(loadVocabulary(CEFRJ + 'ghost,noun,,,,', OCT)).toHaveLength(0)
  })

  it('records which dataset each entry came from', () => {
    const out = loadVocabulary(CEFRJ + 'cat,noun,A1,,,', OCT + 'timid,adjective,C1,')
    expect(out.find((e) => e.headword === 'cat')?.source).toBe('cefrj-1.5')
    expect(out.find((e) => e.headword === 'timid')?.source).toBe('octanove-c1c2-1.0')
  })
})

describe('against the real vendored files', () => {
  const entries = loadVocabulary(
    readFileSync('data/inventories/cefrj-vocabulary-profile-1.5.csv', 'utf8'),
    readFileSync('data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv', 'utf8'),
  )

  it('loads a realistic number of entries', () => {
    // 7,799 + 2,136 source rows, minus duplicates, plus slash-variant splits.
    expect(entries.length).toBeGreaterThan(9000)
    expect(entries.length).toBeLessThan(12000)
  })

  it('covers every level A1 to C2', () => {
    const levels = new Set(entries.map((e) => e.level))
    expect([...levels].sort()).toEqual(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  })

  it('places core words at A1', () => {
    const lowest = (w: string) =>
      entries.filter((e) => e.headword === w).map((e) => e.level).sort()[0]
    for (const w of ['the', 'be', 'have', 'go', 'want', 'water', 'house', 'good']) {
      expect(lowest(w), `${w} should be A1`).toBe('A1')
    }
  })

  it('places academic words above A2', () => {
    const lowest = (w: string) =>
      entries.filter((e) => e.headword === w).map((e) => e.level).sort()[0]
    expect(lowest('notwithstanding')).toBe('C1')
    expect(lowest('hypothesis')).toBe('C2')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/load-vocabulary.test.ts`
Expected: FAIL — cannot resolve `@/inventory/load-vocabulary`.

- [ ] **Step 3: Create `src/inventory/load-vocabulary.ts`**

```ts
import { levelIndex } from '@/skill-graph/types'
import { parseCsv } from './csv'
import { parseCefrLevel } from './level-parser'
import { normalisePos } from './pos'
import type { LexicalEntry } from './types'

const CEFRJ_SOURCE = 'cefrj-1.5'
const OCTANOVE_SOURCE = 'octanove-c1c2-1.0'

/**
 * Load the two vocabulary files into one deduplicated inventory.
 *
 * Both files share the columns we need (`headword`, `pos`, `CEFR`), so they
 * are processed identically and differ only in the recorded source.
 */
export function loadVocabulary(cefrjCsv: string, octanoveCsv: string): LexicalEntry[] {
  // Keyed by "headword|pos" so the same word can hold different levels as a
  // noun and a verb, which is linguistically correct.
  const byKey = new Map<string, LexicalEntry>()

  const ingest = (csv: string, source: string) => {
    for (const row of parseCsv(csv)) {
      const level = parseCefrLevel(row.CEFR ?? '')
      if (!level) continue // No level means the row tells us nothing.

      const pos = normalisePos(row.pos ?? '')

      // Entries like "airplane/aeroplane" list spelling variants; each becomes
      // its own entry so either spelling matches during profiling.
      for (const variant of (row.headword ?? '').split('/')) {
        const headword = variant.trim().toLowerCase()
        if (!headword) continue

        const key = `${headword}|${pos}`
        const existing = byKey.get(key)

        // Lowest level wins: a learner meets the word at the earlier level.
        if (existing && levelIndex(existing.level) <= levelIndex(level)) continue

        byKey.set(key, {
          headword,
          pos,
          level,
          source,
          levelSource: 'source',
          confidence: 1,
        })
      }
    }
  }

  ingest(cefrjCsv, CEFRJ_SOURCE)
  ingest(octanoveCsv, OCTANOVE_SOURCE)

  return [...byKey.values()]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/inventory/load-vocabulary.test.ts`
Expected: PASS, 15 tests.

- [ ] **Step 5: Commit**

```bash
git add src/inventory/load-vocabulary.ts tests/inventory/load-vocabulary.test.ts
git commit -m "feat: vocabulary inventory loader with variant splitting and dedup"
```

---

### Task 6: Grammar loader with fallback cascade

**Files:**
- Create: `src/inventory/load-grammar.ts`
- Test: `tests/inventory/load-grammar.test.ts`

**Interfaces:**
- Consumes: `parseCsv`, `parseCefrLevel`, `GrammarEntry`
- Produces:
  - `GRAMMAR_LEVEL_COLUMNS` (ordered fallback list)
  - `loadGrammar(csv: string): { entries: GrammarEntry[]; unresolved: string[] }`

**Design note:** 330 of 500 rows have a blank `CEFR-J Level`. Four columns can carry a level, so they are tried in order of reliability: the CEFR-J assignment first, then EGP (best coverage of the remainder), then Core Inventory, then GSELO. 484 of 500 rows resolve; the remaining 16 are returned in `unresolved` rather than silently dropped.

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/load-grammar.test.ts
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { loadGrammar, GRAMMAR_LEVEL_COLUMNS } from '@/inventory/load-grammar'

const HEAD =
  'ID,Shorthand Code,Grammatical Item,Sentence Type,CEFR-J Level,FREQ*DISP,Core Inventory,EGP,GSELO,Notes\n'

describe('loadGrammar', () => {
  it('uses the CEFR-J level when present', () => {
    const { entries } = loadGrammar(HEAD + '1,PP.I_am,I am,AFF. DEC.,A1.1,A1,A1,A1,A1,')
    expect(entries[0]).toMatchObject({ id: 'PP.I_am', item: 'I am', level: 'A1', levelSource: 'source' })
  })

  it('falls back to EGP when the CEFR-J level is blank', () => {
    const { entries } = loadGrammar(HEAD + '2,X.y,thing,DEC.,,,,B1,,')
    expect(entries[0]?.level).toBe('B1')
  })

  it('falls back to Core Inventory when CEFR-J and EGP are absent', () => {
    const { entries } = loadGrammar(HEAD + '3,X.z,thing,DEC.,,,A2,N/A,,')
    expect(entries[0]?.level).toBe('A2')
  })

  it('falls back to GSELO last', () => {
    const { entries } = loadGrammar(HEAD + '4,X.w,thing,DEC.,,,,N/A,B2,')
    expect(entries[0]?.level).toBe('B2')
  })

  it('takes the lowest level of a range in a fallback column', () => {
    const { entries } = loadGrammar(HEAD + '5,X.v,thing,DEC.,,,A1-C1,,,')
    expect(entries[0]?.level).toBe('A1')
  })

  it('reports rows with no level anywhere instead of dropping them', () => {
    const { entries, unresolved } = loadGrammar(HEAD + '6,X.u,thing,DEC.,,,,N/A,,')
    expect(entries).toHaveLength(0)
    expect(unresolved).toEqual(['X.u'])
  })

  it('skips rows with no shorthand code', () => {
    const { entries } = loadGrammar(HEAD + '7,,thing,DEC.,A1,,,,,')
    expect(entries).toHaveLength(0)
  })

  it('exposes the fallback order it uses', () => {
    expect(GRAMMAR_LEVEL_COLUMNS).toEqual(['CEFR-J Level', 'EGP', 'Core Inventory', 'GSELO'])
  })
})

describe('against the real vendored file', () => {
  const { entries, unresolved } = loadGrammar(
    readFileSync('data/inventories/cefrj-grammar-profile-20180315.csv', 'utf8'),
  )

  it('resolves the great majority of rows', () => {
    // Verified against the real file: 484 of 500 carry a level somewhere.
    expect(entries.length).toBeGreaterThanOrEqual(480)
    expect(entries.length).toBeLessThanOrEqual(500)
  })

  it('leaves only a handful unresolved', () => {
    expect(unresolved.length).toBeLessThanOrEqual(20)
  })

  it('produces unique ids', () => {
    const ids = entries.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers a spread of levels', () => {
    const levels = new Set(entries.map((e) => e.level))
    expect(levels.size).toBeGreaterThanOrEqual(4)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/load-grammar.test.ts`
Expected: FAIL — cannot resolve `@/inventory/load-grammar`.

- [ ] **Step 3: Create `src/inventory/load-grammar.ts`**

```ts
import { parseCsv } from './csv'
import { parseCefrLevel } from './level-parser'
import type { GrammarEntry } from './types'

const GRAMMAR_SOURCE = 'cefrj-grammar-20180315'

/**
 * Columns that may carry a level, in order of reliability.
 *
 * Two-thirds of rows leave the CEFR-J assignment blank, so the other
 * frameworks the file cross-references are used as fallbacks. EGP comes second
 * because it covers the most remaining rows.
 */
export const GRAMMAR_LEVEL_COLUMNS = ['CEFR-J Level', 'EGP', 'Core Inventory', 'GSELO'] as const

export function loadGrammar(csv: string): { entries: GrammarEntry[]; unresolved: string[] } {
  const entries: GrammarEntry[] = []
  const unresolved: string[] = []

  for (const row of parseCsv(csv)) {
    const id = (row['Shorthand Code'] ?? '').trim()
    if (!id) continue // Without a stable code the row cannot be referenced.

    let level = null
    for (const column of GRAMMAR_LEVEL_COLUMNS) {
      level = parseCefrLevel(row[column] ?? '')
      if (level) break
    }

    if (!level) {
      // Surfaced rather than dropped, so a content author can see exactly what
      // the source data failed to classify.
      unresolved.push(id)
      continue
    }

    entries.push({
      id,
      item: (row['Grammatical Item'] ?? '').trim(),
      sentenceType: (row['Sentence Type'] ?? '').trim(),
      level,
      source: GRAMMAR_SOURCE,
      levelSource: 'source',
      confidence: 1,
    })
  }

  return { entries, unresolved }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/inventory/load-grammar.test.ts`
Expected: PASS, 12 tests.

- [ ] **Step 5: Commit**

```bash
git add src/inventory/load-grammar.ts tests/inventory/load-grammar.test.ts
git commit -m "feat: grammar inventory loader with four-column level fallback"
```

---

### Task 7: Multi-word verb extraction from WordNet

**Files:**
- Create: `src/inventory/load-multiword.ts`
- Test: `tests/inventory/load-multiword.test.ts`
- Modify: `package.json` (add `wordnet-db` dependency)

**Interfaces:**
- Consumes: nothing
- Produces: `extractMultiwordVerbs(indexVerbText: string): string[]`

**Design note:** WordNet's `index.verb` lists one lemma per line, underscore-separated for multi-word entries (`give_up`). Verified: 2,838 such entries exist, including every phrasal verb tested. Lines beginning with two spaces are the licence header and must be skipped.

- [ ] **Step 1: Add the dependency**

```bash
npm install wordnet-db
```

- [ ] **Step 2: Write the failing test**

```ts
// tests/inventory/load-multiword.test.ts
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { extractMultiwordVerbs } from '@/inventory/load-multiword'

describe('extractMultiwordVerbs', () => {
  it('extracts an underscore-joined lemma as a spaced phrase', () => {
    expect(extractMultiwordVerbs('give_up v 2 1 @ 2 0 01234567 02345678')).toEqual(['give up'])
  })

  it('ignores single-word lemmas', () => {
    expect(extractMultiwordVerbs('run v 1 1 @ 1 0 01234567')).toEqual([])
  })

  it('skips the licence header, whose lines begin with two spaces', () => {
    expect(extractMultiwordVerbs('  1 This software and database is being provided')).toEqual([])
  })

  it('deduplicates repeated lemmas', () => {
    expect(extractMultiwordVerbs('give_up v 1\ngive_up v 1')).toEqual(['give up'])
  })

  it('lowercases and ignores blank lines', () => {
    expect(extractMultiwordVerbs('\nGive_Up v 1\n')).toEqual(['give up'])
  })
})

describe('against the real WordNet database', () => {
  const text = readFileSync('node_modules/wordnet-db/dict/index.verb', 'utf8')
  const phrases = extractMultiwordVerbs(text)

  it('extracts the expected number of multi-word verbs', () => {
    // Verified directly against WordNet 3.1: 2,838 entries contain '_'.
    expect(phrases.length).toBeGreaterThan(2500)
    expect(phrases.length).toBeLessThan(3200)
  })

  it('contains the phrasal verbs the profiler currently misses', () => {
    for (const p of ['give up', 'look after', 'find out', 'carry out', 'put off', 'get on']) {
      expect(phrases, `missing "${p}"`).toContain(p)
    }
  })

  it('produces phrases with no underscores remaining', () => {
    expect(phrases.some((p) => p.includes('_'))).toBe(false)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/inventory/load-multiword.test.ts`
Expected: FAIL — cannot resolve `@/inventory/load-multiword`.

- [ ] **Step 4: Create `src/inventory/load-multiword.ts`**

```ts
/**
 * Multi-word verbs from WordNet.
 *
 * This is the fix for a proven defect: without these, the profiler reads
 * "carried out" as carry (A1) + out (A1) and scores a B2 sentence as A2.
 *
 * WordNet supplies the phrases but no CEFR levels. Levels are derived
 * separately (see `level-multiword.ts`) and marked as such.
 *
 * File format: one lemma per line, space-delimited fields, multi-word lemmas
 * joined by underscores. The first 29 lines are a licence header, each
 * beginning with two spaces.
 */
export function extractMultiwordVerbs(indexVerbText: string): string[] {
  const seen = new Set<string>()

  for (const line of indexVerbText.split(/\r?\n/)) {
    if (line === '' || line.startsWith('  ')) continue // blank or licence header

    const lemma = line.split(' ')[0]
    if (!lemma || !lemma.includes('_')) continue

    seen.add(lemma.toLowerCase().replace(/_/g, ' '))
  }

  return [...seen]
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/inventory/load-multiword.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 6: Commit**

```bash
git add src/inventory/load-multiword.ts tests/inventory/load-multiword.test.ts package.json package-lock.json
git commit -m "feat: extract multi-word verbs from WordNet"
```

---

### Task 8: Deriving levels for multi-word verbs

**Files:**
- Create: `src/inventory/level-multiword.ts`
- Test: `tests/inventory/level-multiword.test.ts`

**Interfaces:**
- Consumes: `LexicalEntry`, `CefrLevel`, `levelIndex`, `CEFR_LEVELS`
- Produces:
  - `LexicalLookup = Map<string, CefrLevel>` (headword → lowest level, ignoring pos)
  - `buildLexicalLookup(entries: LexicalEntry[]): LexicalLookup`
  - `deriveMultiwordLevel(phrase: string, lookup: LexicalLookup, opts?: { idiomatic?: boolean }): { level: CefrLevel; confidence: number }`

**Design note:** WordNet gives no levels, so they must be derived. Two signals are available offline and deterministically: the level of the component words, and whether the phrase is idiomatic. A phrase is at least as hard as its hardest component. Idiomatic phrases — where the meaning is not the sum of the parts — are raised **two** levels, because phrasal verbs are built from the commonest words in English and are still hard (`give up` is two A1 words that Cambridge places at B1). This is a deliberately simple, explainable rule; Task 9 measures how accurate it actually is rather than assuming.

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/level-multiword.test.ts
import { describe, it, expect } from 'vitest'
import { buildLexicalLookup, deriveMultiwordLevel } from '@/inventory/level-multiword'
import type { LexicalEntry } from '@/inventory/types'

function entry(headword: string, level: LexicalEntry['level'], pos = 'verb'): LexicalEntry {
  return { headword, pos, level, source: 'test', levelSource: 'source', confidence: 1 }
}

const lookup = buildLexicalLookup([
  entry('give', 'A1'),
  entry('up', 'A1', 'preposition'),
  entry('look', 'A1'),
  entry('after', 'A1', 'preposition'),
  entry('carry', 'A1'),
  entry('out', 'A1', 'preposition'),
  entry('abandon', 'B1'),
  entry('ship', 'A2', 'noun'),
])

describe('buildLexicalLookup', () => {
  it('keeps the lowest level across parts of speech', () => {
    const l = buildLexicalLookup([entry('water', 'B2', 'verb'), entry('water', 'A1', 'noun')])
    expect(l.get('water')).toBe('A1')
  })
})

describe('deriveMultiwordLevel', () => {
  it('is at least as hard as its hardest component', () => {
    expect(deriveMultiwordLevel('abandon ship', lookup).level).toBe('B1')
  })

  it('raises an idiomatic phrase two levels above its components', () => {
    // give (A1) + up (A1), but "give up" means quit. Cambridge places it at
    // B1 — two levels above its parts, which is typical for phrasal verbs.
    expect(deriveMultiwordLevel('give up', lookup, { idiomatic: true }).level).toBe('B1')
  })

  it('leaves a transparent phrase at its component level', () => {
    expect(deriveMultiwordLevel('carry out', lookup, { idiomatic: false }).level).toBe('A1')
  })

  it('never exceeds C2 when raising', () => {
    const l = buildLexicalLookup([entry('arcane', 'C2'), entry('lore', 'C2')])
    expect(deriveMultiwordLevel('arcane lore', l, { idiomatic: true }).level).toBe('C2')
  })

  it('reports lower confidence than a stated level', () => {
    expect(deriveMultiwordLevel('give up', lookup, { idiomatic: true }).confidence).toBeLessThan(1)
  })

  it('reports lower confidence when a component is unknown', () => {
    const known = deriveMultiwordLevel('abandon ship', lookup).confidence
    const partial = deriveMultiwordLevel('abandon frobnicate', lookup).confidence
    expect(partial).toBeLessThan(known)
  })

  it('falls back to B1 when no component is known', () => {
    // Mid-scale is the least-wrong default when there is no evidence at all.
    const r = deriveMultiwordLevel('frobnicate quux', lookup)
    expect(r.level).toBe('B1')
    expect(r.confidence).toBeLessThan(0.5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/level-multiword.test.ts`
Expected: FAIL — cannot resolve `@/inventory/level-multiword`.

- [ ] **Step 3: Create `src/inventory/level-multiword.ts`**

```ts
import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { LexicalEntry } from './types'

export type LexicalLookup = Map<string, CefrLevel>

/** Headword to its lowest level across all parts of speech. */
export function buildLexicalLookup(entries: LexicalEntry[]): LexicalLookup {
  const lookup: LexicalLookup = new Map()
  for (const e of entries) {
    const existing = lookup.get(e.headword)
    if (!existing || levelIndex(e.level) < levelIndex(existing)) {
      lookup.set(e.headword, e.level)
    }
  }
  return lookup
}

/** Used when not one component word is known — the least-wrong default. */
const UNKNOWN_FALLBACK: CefrLevel = 'B1'

/**
 * How far above its components an idiomatic phrase sits.
 *
 * Two, not one. Phrasal verbs are built from the commonest words in English
 * and are still hard — "give up" is two A1 words that Cambridge places at B1.
 * A one-level boost was tried first and left the acceptance sentences scoring
 * A2, which is the very defect this exists to fix.
 */
const IDIOMATIC_BOOST = 2

/**
 * Derive a CEFR level for a multi-word phrase.
 *
 * WordNet supplies phrases without levels, so this computes one from two
 * signals that are available offline and behave deterministically:
 *
 *   1. Component difficulty — a phrase is at least as hard as its hardest word.
 *   2. Idiomaticity — when the meaning is not the sum of the parts, the learner
 *      must acquire it as a separate item, so it is harder than its components
 *      suggest. "give up" is two A1 words meaning "quit".
 *
 * The returned confidence is always below 1: these are estimates, and Task 9
 * measures how good they are against words whose levels are known.
 */
export function deriveMultiwordLevel(
  phrase: string,
  lookup: LexicalLookup,
  opts: { idiomatic?: boolean } = {},
): { level: CefrLevel; confidence: number } {
  const words = phrase.toLowerCase().split(/\s+/).filter(Boolean)

  const known: CefrLevel[] = []
  for (const w of words) {
    const level = lookup.get(w)
    if (level) known.push(level)
  }

  if (known.length === 0) {
    return { level: UNKNOWN_FALLBACK, confidence: 0.2 }
  }

  // Hardest component sets the floor.
  let base = known[0]!
  for (const level of known) {
    if (levelIndex(level) > levelIndex(base)) base = level
  }

  // Idiomatic phrases must be learned as whole units, so they sit above what
  // their parts imply. Clamped so C2 cannot overflow.
  let index = levelIndex(base)
  if (opts.idiomatic) index = Math.min(index + IDIOMATIC_BOOST, CEFR_LEVELS.length - 1)

  const coverage = known.length / words.length
  // Derived levels never claim full confidence. Complete component coverage
  // caps at 0.7; partial coverage scales down from there.
  const confidence = Number((0.7 * coverage).toFixed(2))

  return { level: CEFR_LEVELS[index]!, confidence }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/inventory/level-multiword.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add src/inventory/level-multiword.ts tests/inventory/level-multiword.test.ts
git commit -m "feat: derive CEFR levels for multi-word verbs from component difficulty"
```

---

### Task 9: Validate the derivation against known levels

**Files:**
- Create: `src/inventory/validate-derivation.ts`
- Test: `tests/inventory/validate-derivation.test.ts`

**Interfaces:**
- Consumes: `LexicalEntry`, `LexicalLookup`, `deriveMultiwordLevel`, `levelIndex`
- Produces:
  - `DerivationAccuracy = { total: number; exact: number; withinOne: number; exactRate: number; withinOneRate: number }`
  - `measureDerivationAccuracy(entries: LexicalEntry[], sampleSize: number, seed: number): DerivationAccuracy`

**Design note:** this is what turns "the model guessed B1" into "the method is *n*% accurate." Multi-word entries in the vocabulary file (`according to`, `air conditioning` — 299 of them) already carry stated CEFR levels. Holding those levels out, deriving them from their components, and comparing gives a measured accuracy for the exact method used on WordNet phrases. Sampling is seeded so results are reproducible.

- [ ] **Step 1: Write the failing test**

```ts
// tests/inventory/validate-derivation.test.ts
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { loadVocabulary } from '@/inventory/load-vocabulary'
import { measureDerivationAccuracy } from '@/inventory/validate-derivation'
import type { LexicalEntry } from '@/inventory/types'

function entry(headword: string, level: LexicalEntry['level']): LexicalEntry {
  return { headword, pos: 'other', level, source: 'test', levelSource: 'source', confidence: 1 }
}

describe('measureDerivationAccuracy', () => {
  it('reports perfect accuracy when derivation matches', () => {
    const entries = [entry('big', 'A1'), entry('house', 'A1'), entry('big house', 'A1')]
    const r = measureDerivationAccuracy(entries, 10, 1)
    expect(r.total).toBe(1)
    expect(r.exact).toBe(1)
    expect(r.exactRate).toBe(1)
  })

  it('counts a one-level miss as withinOne but not exact', () => {
    const entries = [entry('big', 'A1'), entry('house', 'A1'), entry('big house', 'A2')]
    const r = measureDerivationAccuracy(entries, 10, 1)
    expect(r.exact).toBe(0)
    expect(r.withinOne).toBe(1)
  })

  it('returns zeroed results when there is nothing to measure', () => {
    const r = measureDerivationAccuracy([entry('solo', 'A1')], 10, 1)
    expect(r).toMatchObject({ total: 0, exact: 0, exactRate: 0, withinOneRate: 0 })
  })

  it('is reproducible for a given seed', () => {
    const entries = [entry('big', 'A1'), entry('house', 'A1'), entry('big house', 'A2')]
    expect(measureDerivationAccuracy(entries, 1, 42)).toEqual(measureDerivationAccuracy(entries, 1, 42))
  })
})

describe('measured accuracy on the real vocabulary', () => {
  const entries = loadVocabulary(
    readFileSync('data/inventories/cefrj-vocabulary-profile-1.5.csv', 'utf8'),
    readFileSync('data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv', 'utf8'),
  )
  const result = measureDerivationAccuracy(entries, 250, 20260729)

  it('has enough multi-word entries to measure against', () => {
    expect(result.total).toBeGreaterThan(50)
  })

  it('lands within one level most of the time', () => {
    // Deliberately a floor, not a target. If this fails, the derivation rule
    // in level-multiword.ts is wrong and must be fixed rather than the
    // threshold lowered.
    console.log(
      `derivation accuracy: exact ${(result.exactRate * 100).toFixed(1)}%, ` +
        `within one level ${(result.withinOneRate * 100).toFixed(1)}% ` +
        `(n=${result.total})`,
    )
    expect(result.withinOneRate).toBeGreaterThan(0.6)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/inventory/validate-derivation.test.ts`
Expected: FAIL — cannot resolve `@/inventory/validate-derivation`.

- [ ] **Step 3: Create `src/inventory/validate-derivation.ts`**

```ts
import { levelIndex } from '@/skill-graph/types'
import { buildLexicalLookup, deriveMultiwordLevel } from './level-multiword'
import type { LexicalEntry } from './types'

export interface DerivationAccuracy {
  /** Multi-word entries with a stated level that could be measured. */
  total: number
  exact: number
  /** Derived level within one CEFR level of the stated one. */
  withinOne: number
  exactRate: number
  withinOneRate: number
}

/**
 * Measure how accurate the multi-word derivation rule actually is.
 *
 * The vocabulary file contains several hundred multi-word entries that already
 * carry stated CEFR levels. Hiding those levels, deriving them from their
 * components, and comparing gives a real accuracy figure for the same method
 * applied to WordNet phrases — which have no stated level to check against.
 *
 * Without this, derived levels would be unfalsifiable. With it, they carry a
 * number.
 */
export function measureDerivationAccuracy(
  entries: LexicalEntry[],
  sampleSize: number,
  seed: number,
): DerivationAccuracy {
  const multiword = entries.filter((e) => e.headword.includes(' '))

  // Single words only, so a phrase is never used to derive itself.
  const lookup = buildLexicalLookup(entries.filter((e) => !e.headword.includes(' ')))

  const sample = seededSample(multiword, sampleSize, seed)

  let exact = 0
  let withinOne = 0

  for (const e of sample) {
    // Idiomaticity is unknown for these, so the neutral setting is used —
    // matching how an unclassified WordNet phrase would be treated.
    const derived = deriveMultiwordLevel(e.headword, lookup)
    const distance = Math.abs(levelIndex(derived.level) - levelIndex(e.level))

    if (distance === 0) exact++
    if (distance <= 1) withinOne++
  }

  const total = sample.length
  return {
    total,
    exact,
    withinOne,
    exactRate: total ? exact / total : 0,
    withinOneRate: total ? withinOne / total : 0,
  }
}

/**
 * Deterministic sample.
 *
 * A seeded generator rather than Math.random, so a failing accuracy figure can
 * be reproduced and investigated instead of shifting on every run.
 */
function seededSample<T>(items: T[], size: number, seed: number): T[] {
  if (items.length <= size) return [...items]

  // Mulberry32 — small, fast, adequate for sampling.
  let state = seed >>> 0
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled.slice(0, size)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/inventory/validate-derivation.test.ts`
Expected: PASS, 6 tests. **Read the logged accuracy figure** — it is the honest measure of how much these derived levels can be trusted, and it belongs in the spec.

- [ ] **Step 5: Commit**

```bash
git add src/inventory/validate-derivation.ts tests/inventory/validate-derivation.test.ts
git commit -m "feat: measure derivation accuracy against known multi-word levels"
```

---

### Task 10: Lemmatisation

**Files:**
- Create: `src/profiler/lemmas.ts`
- Test: `tests/profiler/lemmas.test.ts`

**Interfaces:**
- Consumes: `compromise`
- Produces: `lemmaCandidates(surface: string, tags: string[]): string[]`

**Design note:** the inventory is keyed on headwords, but text contains inflections. Without lemmatisation the profiler misses most words. `compromise` handles the common cases; suffix fallbacks catch what it misses. Candidates are returned as a list rather than a single answer because the lookup takes the lowest level found across all of them — over-generating is safe, under-generating loses matches.

- [ ] **Step 1: Write the failing test**

```ts
// tests/profiler/lemmas.test.ts
import { describe, it, expect } from 'vitest'
import { lemmaCandidates } from '@/profiler/lemmas'

describe('lemmaCandidates', () => {
  it('always includes the lowercased surface form', () => {
    expect(lemmaCandidates('Running', ['Verb'])).toContain('running')
  })

  it('recovers the infinitive of an inflected verb', () => {
    expect(lemmaCandidates('running', ['Verb', 'Gerund'])).toContain('run')
    expect(lemmaCandidates('eaten', ['Verb', 'PastTense'])).toContain('eat')
  })

  it('recovers the singular of a plural noun', () => {
    expect(lemmaCandidates('apples', ['Noun', 'Plural'])).toContain('apple')
  })

  it('handles irregular plurals', () => {
    expect(lemmaCandidates('children', ['Noun', 'Plural'])).toContain('child')
  })

  it('offers a suffix fallback for regular past tense', () => {
    expect(lemmaCandidates('walked', [])).toContain('walk')
  })

  it('offers both stems for -ing forms, with and without a restored e', () => {
    const c = lemmaCandidates('hoping', [])
    expect(c).toContain('hop')
    expect(c).toContain('hope')
  })

  it('strips -ly for adverbs', () => {
    expect(lemmaCandidates('quickly', ['Adverb'])).toContain('quick')
  })

  it('does not mangle short words', () => {
    expect(lemmaCandidates('is', [])).toContain('is')
    expect(lemmaCandidates('as', [])).toEqual(['as'])
  })

  it('returns unique candidates', () => {
    const c = lemmaCandidates('run', ['Verb'])
    expect(new Set(c).size).toBe(c.length)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/profiler/lemmas.test.ts`
Expected: FAIL — cannot resolve `@/profiler/lemmas`.

- [ ] **Step 3: Create `src/profiler/lemmas.ts`**

```ts
import nlp from 'compromise'

/**
 * Possible dictionary forms of a surface word.
 *
 * The inventory is keyed on headwords ("run"), but text contains inflections
 * ("running", "ran"). Without this the profiler matches almost nothing.
 *
 * A list is returned rather than one answer because the caller takes the
 * lowest level found across all candidates. Over-generating costs a few map
 * lookups; under-generating silently loses matches and inflates the
 * unmatched rate.
 */
export function lemmaCandidates(surface: string, tags: string[]): string[] {
  const word = surface.toLowerCase()
  const out = new Set<string>([word])

  // Very short words are function words; suffix rules would only corrupt them.
  if (word.length <= 2) return [...out]

  if (tags.includes('Verb')) {
    const infinitive = nlp(word).verbs().toInfinitive().text().toLowerCase()
    if (infinitive) out.add(infinitive)
  }

  if (tags.includes('Noun')) {
    const singular = nlp(word).nouns().toSingular().text().toLowerCase()
    if (singular) out.add(singular)
  }

  // Suffix fallbacks for forms compromise does not resolve, e.g. when it has
  // mis-tagged the word or the tags array is empty.
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) {
    out.add(word.slice(0, -1))
  }
  if (word.endsWith('es') && word.length > 4) out.add(word.slice(0, -2))
  if (word.endsWith('ed') && word.length > 4) {
    out.add(word.slice(0, -2)) // walked -> walk
    out.add(word.slice(0, -1)) // hoped  -> hope
  }
  if (word.endsWith('ing') && word.length > 5) {
    out.add(word.slice(0, -3)) // hoping -> hop
    out.add(word.slice(0, -3) + 'e') // hoping -> hope
  }
  if (word.endsWith('ly') && word.length > 4) out.add(word.slice(0, -2))

  return [...out]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/profiler/lemmas.test.ts`
Expected: PASS, 9 tests.

- [ ] **Step 5: Commit**

```bash
git add src/profiler/lemmas.ts tests/profiler/lemmas.test.ts
git commit -m "feat: lemmatisation with compromise plus suffix fallbacks"
```

---

### Task 11: The profiler

**Files:**
- Create: `src/profiler/profile.ts`
- Test: `tests/profiler/profile.test.ts`

**Interfaces:**
- Consumes: `lemmaCandidates`, `CefrLevel`, `CEFR_LEVELS`, `levelIndex`, `compromise`
- Produces:
  - `ProfilerInventory = { words: Map<string, CefrLevel>; phrases: Map<string, CefrLevel> }`
  - `ProfiledItem = { surface: string; lemma: string; level: CefrLevel; isPhrase: boolean }`
  - `ProfileResult = { totalTokens, matched, counts, aboveLevel, unmatched, properNouns, coverageLevel, unmatchedRate }`
  - `profileText(text: string, inventory: ProfilerInventory, targetLevel?: CefrLevel): ProfileResult`

**Design note:** phrases are matched **before** single words, longest first. This ordering is the whole fix — matching "give" and "up" separately is exactly the defect being repaired. `coverageLevel` is the level at which cumulative coverage reaches 90% of matched tokens, which discriminated cleanly in the prototype.

- [ ] **Step 1: Write the failing test**

```ts
// tests/profiler/profile.test.ts
import { describe, it, expect } from 'vitest'
import { profileText, type ProfilerInventory } from '@/profiler/profile'
import type { CefrLevel } from '@/skill-graph/types'

function inv(
  words: Record<string, CefrLevel>,
  phrases: Record<string, CefrLevel> = {},
): ProfilerInventory {
  return {
    words: new Map(Object.entries(words)) as Map<string, CefrLevel>,
    phrases: new Map(Object.entries(phrases)) as Map<string, CefrLevel>,
  }
}

describe('single words', () => {
  it('counts matched words by level', () => {
    const r = profileText('the cat', inv({ the: 'A1', cat: 'A1' }))
    expect(r.matched).toBe(2)
    expect(r.counts.A1).toBe(2)
  })

  it('matches inflected forms via lemmatisation', () => {
    const r = profileText('cats', inv({ cat: 'A1' }))
    expect(r.matched).toBe(1)
  })

  it('reports unmatched words', () => {
    const r = profileText('the frobnicator', inv({ the: 'A1' }))
    expect(r.unmatched).toContain('frobnicator')
  })

  it('separates proper nouns from unmatched words', () => {
    const r = profileText('I visited London', inv({ i: 'A1', visit: 'A1' }))
    expect(r.properNouns).toContain('London')
    expect(r.unmatched).not.toContain('London')
  })

  it('ignores punctuation', () => {
    expect(profileText('cat, cat.', inv({ cat: 'A1' })).matched).toBe(2)
  })
})

describe('multi-word phrases', () => {
  it('matches a phrase rather than its parts', () => {
    const r = profileText('She gave up smoking', inv(
      { she: 'A1', give: 'A1', up: 'A1', smoke: 'A2' },
      { 'give up': 'B1' },
    ))
    expect(r.counts.B1).toBe(1)
    // give and up must NOT also be counted individually
    expect(r.counts.A1).toBe(1) // just "she"
  })

  it('prefers the longest phrase when several match', () => {
    const r = profileText('I look forward to it', inv(
      { i: 'A1', look: 'A1', forward: 'A2', to: 'A1', it: 'A1' },
      { 'look forward': 'B1', 'look forward to': 'B2' },
    ))
    expect(r.counts.B2).toBe(1)
    expect(r.counts.B1).toBe(0)
  })

  it('matches a phrase whose verb is inflected', () => {
    const r = profileText('He carried out the plan', inv(
      { he: 'A1', carry: 'A1', out: 'A1', the: 'A1', plan: 'A2' },
      { 'carry out': 'B2' },
    ))
    expect(r.counts.B2).toBe(1)
  })
})

describe('level reporting', () => {
  it('reports the level at which 90% coverage is reached', () => {
    const words: Record<string, CefrLevel> = {}
    for (let i = 0; i < 9; i++) words[`w${i}`] = 'A1'
    words.hard = 'C1'
    const r = profileText('w0 w1 w2 w3 w4 w5 w6 w7 w8 hard', inv(words))
    expect(r.coverageLevel).toBe('A1')
  })

  it('lists items above the target level', () => {
    const r = profileText('easy hard', inv({ easy: 'A1', hard: 'B2' }), 'A2')
    expect(r.aboveLevel.map((i) => i.lemma)).toContain('hard')
    expect(r.aboveLevel.map((i) => i.lemma)).not.toContain('easy')
  })

  it('flags an above-level phrase', () => {
    const r = profileText('She gave up', inv({ she: 'A1', give: 'A1', up: 'A1' }, { 'give up': 'B1' }), 'A2')
    expect(r.aboveLevel[0]).toMatchObject({ lemma: 'give up', level: 'B1', isPhrase: true })
  })

  it('reports the unmatched rate', () => {
    const r = profileText('cat dog', inv({ cat: 'A1' }))
    expect(r.unmatchedRate).toBeCloseTo(0.5)
  })

  it('handles empty text without dividing by zero', () => {
    const r = profileText('', inv({}))
    expect(r.totalTokens).toBe(0)
    expect(r.unmatchedRate).toBe(0)
    expect(r.coverageLevel).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/profiler/profile.test.ts`
Expected: FAIL — cannot resolve `@/profiler/profile`.

- [ ] **Step 3: Create `src/profiler/profile.ts`**

```ts
import nlp from 'compromise'
import { CEFR_LEVELS, levelIndex, type CefrLevel } from '@/skill-graph/types'
import { lemmaCandidates } from './lemmas'

export interface ProfilerInventory {
  /** headword -> lowest level */
  words: Map<string, CefrLevel>
  /** space-separated phrase -> level */
  phrases: Map<string, CefrLevel>
}

export interface ProfiledItem {
  surface: string
  lemma: string
  level: CefrLevel
  isPhrase: boolean
}

export interface ProfileResult {
  totalTokens: number
  matched: number
  counts: Record<CefrLevel, number>
  aboveLevel: ProfiledItem[]
  unmatched: string[]
  properNouns: string[]
  /** Level at which cumulative coverage reaches 90% of matched tokens. */
  coverageLevel: CefrLevel | null
  unmatchedRate: number
}

/** Longest phrase considered. WordNet multi-word verbs are almost all 2-3. */
const MAX_PHRASE_WORDS = 4

/**
 * Report what CEFR level a text is, and what sits above a target level.
 *
 * Phrases are matched before single words, longest first. That ordering is the
 * entire point: without it, "carried out" reads as carry (A1) + out (A1), and
 * a B2 sentence profiles as A2. That defect was measured before this was
 * built, and Task 12 proves it is fixed.
 */
export function profileText(
  text: string,
  inventory: ProfilerInventory,
  targetLevel?: CefrLevel,
): ProfileResult {
  const counts = Object.fromEntries(CEFR_LEVELS.map((l) => [l, 0])) as Record<CefrLevel, number>
  const aboveLevel: ProfiledItem[] = []
  const unmatched: string[] = []
  const properNouns: string[] = []

  // Flatten to a single term list; sentence boundaries do not matter here, and
  // phrases very occasionally straddle clause punctuation.
  const terms: Array<{ surface: string; tags: string[] }> = []
  for (const sentence of nlp(text).json()) {
    for (const term of sentence.terms) {
      const surface = (term.text ?? '').replace(/[^A-Za-z'-]/g, '')
      if (surface) terms.push({ surface, tags: term.tags ?? [] })
    }
  }

  const record = (item: ProfiledItem) => {
    counts[item.level]++
    if (targetLevel && levelIndex(item.level) > levelIndex(targetLevel)) aboveLevel.push(item)
  }

  let i = 0
  while (i < terms.length) {
    const phrase = matchPhraseAt(terms, i, inventory)

    if (phrase) {
      record({ surface: phrase.surface, lemma: phrase.lemma, level: phrase.level, isPhrase: true })
      i += phrase.length
      continue
    }

    const term = terms[i]!
    i++

    if (term.tags.includes('ProperNoun')) {
      properNouns.push(term.surface)
      continue
    }

    const single = matchWord(term.surface, term.tags, inventory)
    if (single) record({ ...single, isPhrase: false })
    else unmatched.push(term.surface)
  }

  const matched = CEFR_LEVELS.reduce((sum, l) => sum + counts[l], 0)

  let cumulative = 0
  let coverageLevel: CefrLevel | null = null
  for (const level of CEFR_LEVELS) {
    cumulative += counts[level]
    if (coverageLevel === null && matched > 0 && cumulative / matched >= 0.9) coverageLevel = level
  }

  return {
    totalTokens: terms.length,
    matched,
    counts,
    aboveLevel,
    unmatched,
    properNouns,
    coverageLevel,
    unmatchedRate: terms.length ? unmatched.length / terms.length : 0,
  }
}

/**
 * Longest phrase starting at `index`, or null.
 *
 * The head word is lemmatised so inflected phrases match — "carried out" has
 * to find "carry out". Later words are used as written, since particles and
 * prepositions do not inflect.
 */
function matchPhraseAt(
  terms: Array<{ surface: string; tags: string[] }>,
  index: number,
  inventory: ProfilerInventory,
): { surface: string; lemma: string; level: CefrLevel; length: number } | null {
  const maxLength = Math.min(MAX_PHRASE_WORDS, terms.length - index)

  for (let length = maxLength; length >= 2; length--) {
    const window = terms.slice(index, index + length)
    const head = window[0]!
    const tail = window.slice(1).map((t) => t.surface.toLowerCase())

    for (const headLemma of lemmaCandidates(head.surface, head.tags)) {
      const candidate = [headLemma, ...tail].join(' ')
      const level = inventory.phrases.get(candidate)
      if (level) {
        return {
          surface: window.map((t) => t.surface).join(' '),
          lemma: candidate,
          level,
          length,
        }
      }
    }
  }

  return null
}

/** Lowest level across all lemma candidates for a single word. */
function matchWord(
  surface: string,
  tags: string[],
  inventory: ProfilerInventory,
): { surface: string; lemma: string; level: CefrLevel } | null {
  let best: { lemma: string; level: CefrLevel } | null = null

  for (const candidate of lemmaCandidates(surface, tags)) {
    const level = inventory.words.get(candidate)
    if (!level) continue
    if (!best || levelIndex(level) < levelIndex(best.level)) best = { lemma: candidate, level }
  }

  return best ? { surface, lemma: best.lemma, level: best.level } : null
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/profiler/profile.test.ts`
Expected: PASS, 13 tests.

- [ ] **Step 5: Commit**

```bash
git add src/profiler/profile.ts tests/profiler/profile.test.ts
git commit -m "feat: text profiler matching phrases before single words"
```

---

### Task 12: Acceptance — the profiler must fix the measured defect

**Files:**
- Create: `src/profiler/build-inventory.ts`
- Test: `tests/profiler/acceptance.test.ts`

**Interfaces:**
- Consumes: `loadVocabulary`, `extractMultiwordVerbs`, `buildLexicalLookup`, `deriveMultiwordLevel`, `profileText`
- Produces: `buildProfilerInventory(): ProfilerInventory` (reads the vendored files and WordNet from disk)

**Design note:** this is the gate for the whole plan. Before the multi-word layer, all three sentences below profiled as A2 — a measured defect, not a suspicion. They must now come out right. If they do not, the derivation rule in Task 8 is wrong and must be fixed; the assertions must not be relaxed.

- [ ] **Step 1: Write the failing test**

```ts
// tests/profiler/acceptance.test.ts
import { describe, it, expect } from 'vitest'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import { profileText } from '@/profiler/profile'
import { levelIndex } from '@/skill-graph/types'

const inventory = buildProfilerInventory()

describe('inventory is populated from the real sources', () => {
  it('has the expected order of magnitude of words', () => {
    expect(inventory.words.size).toBeGreaterThan(8000)
  })

  it('has the multi-word verbs from WordNet', () => {
    expect(inventory.phrases.size).toBeGreaterThan(2500)
    for (const p of ['give up', 'look after', 'carry out', 'put off']) {
      expect(inventory.phrases.has(p), `missing phrase "${p}"`).toBe(true)
    }
  })
})

describe('the measured defect is fixed', () => {
  // Each of these profiled as A2 before phrases were matched. Recorded here as
  // regression tests so the defect cannot silently return.

  it('recognises "gave up" as above A2', () => {
    const r = profileText('She gave up smoking last year.', inventory)
    expect(r.aboveLevel).toBeDefined()
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('recognises "look after" as above A2', () => {
    const r = profileText('Please look after my cat while I am away.', inventory)
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('recognises a sentence with two phrasal verbs as clearly above A2', () => {
    const r = profileText(
      'The committee carried out a review and put off the decision.',
      inventory,
    )
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThan(levelIndex('A2'))
  })

  it('flags the phrases themselves when targeting A2', () => {
    const r = profileText('She gave up smoking.', inventory, 'A2')
    const phrases = r.aboveLevel.filter((i) => i.isPhrase).map((i) => i.lemma)
    expect(phrases).toContain('give up')
  })
})

describe('still discriminates level on ordinary prose', () => {
  it('rates simple everyday text at A1 or A2', () => {
    const r = profileText(
      'My name is Anna. I live in a small house with my family. I eat bread and drink milk. ' +
        'Then I go to school by bus. I like my teacher because she is kind.',
      inventory,
    )
    expect(levelIndex(r.coverageLevel!)).toBeLessThanOrEqual(levelIndex('A2'))
  })

  it('rates academic prose at C1 or C2, with many unknown words', () => {
    const r = profileText(
      'The ubiquity of algorithmic mediation has engendered considerable scholarly disquiet, ' +
        'particularly regarding the opacity of proprietary systems whose deliberations remain ' +
        'inaccessible to scrutiny.',
      inventory,
    )
    expect(levelIndex(r.coverageLevel!)).toBeGreaterThanOrEqual(levelIndex('C1'))
    // Advanced text uses words outside an A1-C2 inventory; that rate is itself
    // an independent level signal.
    expect(r.unmatchedRate).toBeGreaterThan(0.15)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/profiler/acceptance.test.ts`
Expected: FAIL — cannot resolve `@/profiler/build-inventory`.

- [ ] **Step 3: Create `src/profiler/build-inventory.ts`**

```ts
import { readFileSync } from 'node:fs'
import { loadVocabulary } from '@/inventory/load-vocabulary'
import { extractMultiwordVerbs } from '@/inventory/load-multiword'
import { buildLexicalLookup, deriveMultiwordLevel } from '@/inventory/level-multiword'
import { levelIndex, type CefrLevel } from '@/skill-graph/types'
import type { ProfilerInventory } from './profile'

const VOCAB_CSV = 'data/inventories/cefrj-vocabulary-profile-1.5.csv'
const OCTANOVE_CSV = 'data/inventories/octanove-vocabulary-profile-c1c2-1.0.csv'
const WORDNET_VERBS = 'node_modules/wordnet-db/dict/index.verb'

/**
 * Assemble the profiler's inventory from the vendored sources.
 *
 * Reads from disk on each call. That is fine for tests and for the offline
 * content pipeline; the application will load this from the database instead,
 * built by the ingestion step in R1b-b.
 */
export function buildProfilerInventory(): ProfilerInventory {
  const entries = loadVocabulary(
    readFileSync(VOCAB_CSV, 'utf8'),
    readFileSync(OCTANOVE_CSV, 'utf8'),
  )

  // Single-word lookup: headword to its lowest level across parts of speech.
  const words = new Map<string, CefrLevel>()
  for (const e of entries) {
    if (e.headword.includes(' ')) continue // multi-word entries go in `phrases`
    const existing = words.get(e.headword)
    if (!existing || levelIndex(e.level) < levelIndex(existing)) words.set(e.headword, e.level)
  }

  const phrases = new Map<string, CefrLevel>()

  // Multi-word entries that came with a stated level are authoritative and
  // take precedence over anything derived.
  for (const e of entries) {
    if (!e.headword.includes(' ')) continue
    const existing = phrases.get(e.headword)
    if (!existing || levelIndex(e.level) < levelIndex(existing)) phrases.set(e.headword, e.level)
  }

  // WordNet phrases have no stated level, so derive one. Multi-word verbs are
  // treated as idiomatic by default: that is what makes them worth listing
  // separately, and it is the conservative choice for a gate — over-estimating
  // difficulty rejects content, under-estimating ships it to the wrong learner.
  const lookup = buildLexicalLookup(entries.filter((e) => !e.headword.includes(' ')))
  for (const phrase of extractMultiwordVerbs(readFileSync(WORDNET_VERBS, 'utf8'))) {
    if (phrases.has(phrase)) continue // never override a stated level
    phrases.set(phrase, deriveMultiwordLevel(phrase, lookup, { idiomatic: true }).level)
  }

  return { words, phrases }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/profiler/acceptance.test.ts`
Expected: PASS, 8 tests.

If the three defect tests still fail, **do not relax the assertions.** Investigate in this order: is the phrase present in `inventory.phrases`; is the head verb lemmatising correctly (`carried` → `carry`); is `matchPhraseAt` being reached before single-word matching.

- [ ] **Step 5: Run the whole suite and typecheck**

Run: `npm run typecheck && npm test`
Expected: all previous tests plus these still pass.

- [ ] **Step 6: Commit**

```bash
git add src/profiler/build-inventory.ts tests/profiler/acceptance.test.ts
git commit -m "feat: profiler inventory assembly, with regression tests for the phrasal verb defect"
```

---

## Done when

- `npm test` passes, including the three defect regression tests.
- `buildProfilerInventory()` yields >8,000 words and >2,500 phrases from the vendored sources.
- The measured derivation accuracy from Task 9 has been read and recorded in the spec.
- Simple text profiles at A1/A2 and academic text at C1/C2.

## Deliberately excluded

- **Persisting inventories to the database** — R1b-b, alongside the content schema.
- **Grammar profiling** (detecting which structures a text uses) — needs pattern matching against the 484 grammar entries; separate piece of work.
- **Collocations and idioms** beyond multi-word verbs — no free levelled source found; recorded as a known gap.
- **Sense-level distinctions** — CEFR-J is headword+pos only. WordNet could supply senses later.
- **Frequency-based levelling** — Google N-Gram counts via the MIT Words-CEFR-Dataset would improve derived levels; deferred until Task 9's accuracy figure shows whether it is needed.
