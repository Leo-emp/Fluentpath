import type { ItemIssue, McqItem } from './types'

// The blank marker in fill-in-blank MCQ stems. Replaced with a standard
// token so that "I ______ my keys" and "I ______ my keys" compare as
// identical regardless of blank-marker width variations.
const BLANK_PATTERN = /_{2,}/g
const BLANK_TOKEN = '_blank_'

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
