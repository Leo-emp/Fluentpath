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

// Lookup table of expected patterns per grammar node segment.
const GRAMMAR_TARGETS: TargetPattern[] = [
  {
    segment: 'be_present',
    required: [/\b(am|is|are)\b/i],
  },
  {
    segment: 'present_simple',
    required: [
      /\b\w+(s|es)\b/i,
      /\b(go|do|have|like|want|need|know|think|see|come|take|make|get|give|live|work|play|say|use|try)\b/i,
    ],
  },
  {
    segment: 'can_cant',
    required: [/\b(can|can't|cannot)\b/i],
  },
  {
    segment: 'past_simple',
    required: [
      /\b\w+ed\b/i,
      /\b(went|saw|came|took|made|got|gave|said|had|did|was|were|knew|thought|ran|ate|drank|drove|wrote|spoke|bought|sold|built|found|left|met|read|told|won|lost|broke|chose|fell|forgot|grew|held|kept|led|meant|paid|put|sat|sent|set|shot|shut|stood|spent|stuck|taught|threw|wore|woke|understood)\b/i,
    ],
  },
  {
    segment: 'future_going_to',
    required: [/\bgoing to\b/i],
  },
  {
    segment: 'comparatives',
    required: [
      /\b\w+(er|ier)\b/i,
      /\b(more|most|than|less|least|better|worse|best|worst)\b/i,
    ],
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
    contrast: [
      /\b(went|saw|came|took|made|got|gave|said|had|did|was|were|knew|thought|\w+ed)\b/i,
    ],
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
    required: [
      /\b(is|are|was|were|been|being)\s+\w+(ed|en|t)\b/i,
      /\b(was|were|is|are|been)\s+(built|made|done|given|taken|seen|known|found|left|told|written|spoken|bought|sold|broken|chosen|forgotten|held|kept|meant|sent|set|shot|shut|spent|stuck|taught|thrown|worn|woken|understood)\b/i,
    ],
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
