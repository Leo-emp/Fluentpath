/**
 * Feedback quality gates — the last line of defence before scoring
 * results reach the learner.
 *
 * These gates enforce the spec's non-negotiable quality requirements:
 *   - Every criterion score must have evidence from the learner's text
 *   - Feedback must never be empty
 *   - Generic phrases are rejected (spec §3: "generic feedback is a
 *     product failure")
 *   - When 4+ issues exist, at least one must be high priority so the
 *     learner knows where to start (spec §3: "layer by priority")
 *
 * If any gate fails, the score-and-retry loop will request a fresh
 * attempt from the LLM (up to MAX_RETRIES).
 */

import type { ProfilerInventory } from '@/profiler/profile'
import type { CefrLevel } from '@/skill-graph/types'
import type { ParsedScore } from './parse-score'

export interface FeedbackReview {
  passed: boolean
  issues: string[]
}

// Generic phrases that add nothing. Finding any of these in feedback
// text means the model has produced filler, not guidance. Each entry
// is checked as a substring match (case-insensitive).
const GENERIC_PHRASES = [
  'improve your cohesion',
  'use more varied vocabulary',
  'use a wider range of vocabulary',
  'improve your grammar',
  'use more complex sentences',
  'work on your coherence',
  'try to use more advanced vocabulary',
  'make fewer grammatical errors',
  'improve your writing skills',
  'use better linking words',
  'expand your vocabulary',
  'work on your sentence structure',
]

/**
 * Check the quality of scoring feedback against the spec's requirements.
 *
 * The inventory parameter is reserved for future use — it will be used
 * to check that feedback vocabulary is at or below the learner's level.
 */
export function checkFeedbackQuality(
  score: ParsedScore,
  _level: CefrLevel,
  _inventory: ProfilerInventory,
): FeedbackReview {
  const issues: string[] = []

  for (const cs of score.criterionScores) {
    // Gate 1: Every criterion must have evidence from the learner's text.
    // A score without evidence is a score without justification.
    if (cs.evidence.length === 0) {
      issues.push(
        `${cs.criterionName}: no evidence — every score must cite the learner's text`,
      )
    }

    // Gate 2: Empty feedback is always a failure.
    if (cs.feedback.trim().length === 0) {
      issues.push(`${cs.criterionName}: feedback is empty`)
      continue
    }

    // Gate 3: Check for generic phrases. Each one is a specific failure
    // that names the offending phrase so the developer can see exactly
    // what triggered the rejection.
    const lower = cs.feedback.toLowerCase()
    for (const phrase of GENERIC_PHRASES) {
      if (lower.includes(phrase)) {
        issues.push(
          `${cs.criterionName}: feedback contains generic phrase "${phrase}" — ` +
            'every claim must quote the learner\'s own words and name a specific fix',
        )
      }
    }
  }

  // Gate 4: Priority layering — if there are 4+ grouped issues, at
  // least one must be high priority. Without prioritisation the learner
  // sees a wall of corrections and fixes none of them.
  if (score.groupedIssues.length >= 4) {
    const hasHigh = score.groupedIssues.some((gi) => gi.priority === 'high')
    if (!hasHigh) {
      issues.push(
        `${score.groupedIssues.length} issues found but none marked high priority — ` +
          'the learner needs to know which 2-3 to fix first',
      )
    }
  }

  return { passed: issues.length === 0, issues }
}
