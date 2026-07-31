import type { ActionPlan } from '@/diagnosis/types'
import type { Candidate } from './select'

// Priority boost for remediation candidates. 2000 outranks both review
// (~1000) and new (~100), so diagnosis-flagged nodes always come first.
const REMEDIATION_BOOST = 2000

// Boost candidates that appear in a diagnosis action plan. Changes their
// reason to 'remediation' and adds REMEDIATION_BOOST to their priority.
// Re-sorts by priority descending so the caller gets the final ordering.
//
// This is applied *after* selectNext() so eligibility gating has already
// run — a diagnosis cannot promote a node whose prerequisites have decayed.
export function boostFromDiagnosis(
  candidates: Candidate[],
  actionPlan: ActionPlan,
): Candidate[] {
  if (candidates.length === 0 || actionPlan.steps.length === 0) return candidates

  // Build a lookup set from the action plan's node IDs.
  const remediationNodeIds = new Set(actionPlan.steps.map((s) => s.nodeId))

  const boosted = candidates.map((c) => {
    if (!remediationNodeIds.has(c.node.id)) return c
    return {
      ...c,
      reason: 'remediation' as const,
      priority: c.priority + REMEDIATION_BOOST,
    }
  })

  // Re-sort by priority descending. Stable sort preserves original order
  // for equal priorities.
  boosted.sort((a, b) => b.priority - a.priority)

  return boosted
}
