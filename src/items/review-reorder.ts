// # Quality gates for PTE reorder-paragraphs items.
// # Checks: minimum sentence count, stem exists, no duplicate sentences.

import type { ReorderItem, ItemIssue } from './types'

export function reviewReorder(item: ReorderItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Must have at least 3 sentences (PTE typically uses 4–5).
  if (!item.sentences || item.sentences.length < 3) {
    issues.push({
      code: 'TOO_FEW_SENTENCES',
      severity: 'reject',
      message: `Reorder item needs at least 3 sentences, has ${item.sentences?.length ?? 0}.`,
    })
  }

  // # Check for duplicate sentences.
  if (item.sentences) {
    const seen = new Set<string>()
    for (const s of item.sentences) {
      const normalised = s.trim().toLowerCase()
      if (seen.has(normalised)) {
        issues.push({
          code: 'STRUCTURE',
          severity: 'reject',
          message: `Duplicate sentence in reorder item: "${s.substring(0, 50)}..."`,
        })
      }
      seen.add(normalised)
    }
  }

  // # Stem/instruction must exist.
  if (!item.stem || item.stem.trim().length === 0) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'warn',
      message: 'Reorder item has no instruction text.',
    })
  }

  return issues
}
