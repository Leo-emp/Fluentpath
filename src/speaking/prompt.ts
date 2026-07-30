/**
 * Speaking scoring prompt assembly — builds the full prompt sent to
 * the LLM for speaking assessment.
 *
 * The key difference from writing: the prompt includes COMPUTED speech
 * features (fluency, lexical, grammar, pronunciation metrics) so the
 * LLM has the measurements in front of it. The LLM scores what
 * genuinely requires judgment (coherence, discourse management, task
 * fulfilment) while the objective metrics are reported directly.
 *
 * An additional rule specific to speaking: "The metrics in MEASURED
 * FEATURES have been computed deterministically. Do NOT override or
 * contradict them."
 */

import type { SpeakingTask, SpeechFeatures, SpeakingRubric } from './types'
import type { SttResult } from './types'
import type { ProfilerInventory } from '@/profiler/profile'

/**
 * Build the full prompt for LLM-based speaking assessment.
 *
 * The prompt includes:
 *   - The task context (level, type, prompt given to learner)
 *   - The full transcript
 *   - Computed speech features (deterministic, not for the model to guess)
 *   - The complete rubric with band descriptors
 *   - Structured output format specification
 *   - Quality rules preventing generic or evidence-free feedback
 */
export function buildSpeakingScoringPrompt(
  sttResult: SttResult,
  features: SpeechFeatures,
  task: SpeakingTask,
  rubric: SpeakingRubric,
  _inventory: ProfilerInventory,
): string {
  const lines: string[] = []

  // System instruction: respond as JSON only.
  lines.push('You are scoring a piece of spoken English. Your response must be')
  lines.push('a single JSON object, with no surrounding text or markdown fences.')
  lines.push('')

  // ---------------------------------------------------------------------------
  // Task context
  // ---------------------------------------------------------------------------
  lines.push('## TASK')
  lines.push(`Level: ${task.level}`)
  lines.push(`Type: ${task.type} (${task.exam})`)
  lines.push(`Prompt given to the learner: "${task.prompt}"`)
  lines.push(`Time limit: ${task.timeLimitSeconds}s`)
  lines.push('')

  // ---------------------------------------------------------------------------
  // Transcript — what the learner said
  // ---------------------------------------------------------------------------
  lines.push('## TRANSCRIPT')
  lines.push('```')
  lines.push(sttResult.transcript)
  lines.push('```')
  lines.push('')

  // ---------------------------------------------------------------------------
  // Measured features — computed deterministically, the LLM must NOT
  // override these. They are FACTS, not estimates.
  // ---------------------------------------------------------------------------
  lines.push('## MEASURED FEATURES (computed — do NOT override)')
  lines.push('')
  lines.push('### Fluency')
  lines.push(`- Speech rate: ${features.fluency.speechRateWpm} wpm`)
  lines.push(`- Articulation rate: ${features.fluency.articulationRateWpm} wpm`)
  lines.push(`- Pauses (>250ms): ${features.fluency.pauseCount}`)
  lines.push(`- Mean pause duration: ${features.fluency.meanPauseDurationMs}ms`)
  lines.push(`- Fillers: ${features.fluency.fillerCount}`)
  lines.push(`- Mean length of run: ${features.fluency.meanLengthOfRunWords} words`)
  lines.push('')
  lines.push('### Lexical')
  lines.push(`- Type-token ratio: ${features.lexical.typeTokenRatio}`)
  lines.push(`- Lexical density: ${features.lexical.lexicalDensity}`)
  lines.push(`- Repetition rate: ${features.lexical.repetitionRate}`)
  lines.push('- Vocabulary level profile:')
  for (const [level, proportion] of Object.entries(
    features.lexical.vocabularyLevelProfile,
  )) {
    if (proportion > 0) {
      lines.push(`    ${level}: ${(proportion * 100).toFixed(0)}%`)
    }
  }
  lines.push('')
  lines.push('### Grammar')
  lines.push(`- Structures attempted: ${features.grammar.structuresAttempted}`)
  lines.push(`- Structures accurate: ${features.grammar.structuresAccurate}`)
  lines.push(`- Mean length of utterance: ${features.grammar.meanLengthOfUtterance}`)
  lines.push(`- Error density: ${features.grammar.errorDensity}`)
  lines.push('')
  lines.push('### Pronunciation')
  lines.push(`- Mean word confidence: ${features.pronunciation.meanWordConfidence}`)
  if (features.pronunciation.lowConfidenceWords.length > 0) {
    lines.push('- Low-confidence words:')
    for (const w of features.pronunciation.lowConfidenceWords) {
      lines.push(`    "${w.word}" (confidence: ${w.confidence})`)
    }
  } else {
    lines.push('- No low-confidence words detected')
  }
  lines.push('')

  // ---------------------------------------------------------------------------
  // Full rubric with band descriptors
  // ---------------------------------------------------------------------------
  lines.push('## SCORING RUBRIC')
  lines.push(
    `Scale: ${rubric.scoreRange.min} to ${rubric.scoreRange.max} (step: ${rubric.scoreRange.step})`,
  )
  lines.push('')

  for (const criterion of rubric.criteria) {
    lines.push(
      `### ${criterion.name} (id: "${criterion.id}", weight: ${criterion.weight})`,
    )
    for (const desc of criterion.descriptors) {
      lines.push(`  ${desc.score}: ${desc.description}`)
    }
    lines.push('')
  }

  // ---------------------------------------------------------------------------
  // Output format — exact JSON shape
  // ---------------------------------------------------------------------------
  lines.push('## OUTPUT FORMAT')
  lines.push('Return a single JSON object with this exact shape:')
  lines.push('')
  lines.push('{')
  lines.push('  "criterionScores": [')
  lines.push('    {')
  lines.push('      "criterionId": "fluency_coherence",')
  lines.push('      "criterionName": "Fluency and Coherence",')
  lines.push('      "score": 3,')
  lines.push(`      "maxScore": ${rubric.scoreRange.max},`)
  lines.push('      "evidence": [')
  lines.push('        {')
  lines.push('          "start": 0,')
  lines.push('          "end": 42,')
  lines.push('          "quote": "exact text from the transcript",')
  lines.push('          "issue": "specific observation about this span",')
  lines.push(
    '          "rewrite": "improved version, or null if not applicable"',
  )
  lines.push('        }')
  lines.push('      ],')
  lines.push(
    '      "feedback": "One paragraph explaining this score, at the learner\'s level."',
  )
  lines.push('    }')
  lines.push('  ],')
  lines.push('  "groupedIssues": [')
  lines.push('    {')
  lines.push('      "category": "filler_words",')
  lines.push(
    '      "description": "Frequent use of filler words (um, uh) disrupts fluency",',
  )
  lines.push('      "count": 5,')
  lines.push('      "priority": "high",')
  lines.push(
    '      "examples": [{"start": 10, "end": 25, "quote": "...", "issue": "...", "rewrite": null}]',
  )
  lines.push('    }')
  lines.push('  ]')
  lines.push('}')
  lines.push('')

  // ---------------------------------------------------------------------------
  // Quality rules
  // ---------------------------------------------------------------------------
  lines.push('## RULES — FOLLOW EXACTLY')
  lines.push('')
  lines.push(
    '1. Score each criterion independently using the band descriptors above.',
  )
  lines.push(
    `2. All feedback text must use vocabulary at ${task.level} level or below.`,
  )
  lines.push('   Do NOT use words the learner would not understand.')
  lines.push(
    '3. Every claim in your feedback MUST point to a specific location in the',
  )
  lines.push(
    '   transcript via the "evidence" array with exact character offsets.',
  )
  lines.push('   Never make a claim without quoting the relevant text.')
  lines.push(
    '4. NEVER give generic feedback like "improve your fluency" or "use more',
  )
  lines.push(
    '   varied vocabulary". Every piece of feedback must quote the learner\'s',
  )
  lines.push('   own words and offer a concrete rewrite or specific observation.')
  lines.push(
    '5. Group repeated errors: if the same mistake appears 5 times, report it',
  )
  lines.push('   ONCE in groupedIssues with count=5 and up to 3 examples.')
  lines.push(
    '6. Set priority: "high" for the 2-3 most impactful issues the learner',
  )
  lines.push('   should fix first. "medium" for secondary issues. "low" for minor')
  lines.push('   polishing. Every issue must have a priority.')
  lines.push(
    '7. The "quote" field must be an EXACT substring of the transcript.',
  )
  lines.push('   The "start" and "end" must be the correct character offsets.')
  lines.push(
    '8. Include one CriterionScore object per criterion in the rubric,',
  )
  lines.push('   in the same order as listed above.')
  lines.push(
    '9. The fluency, lexical, grammar, and pronunciation metrics in MEASURED',
  )
  lines.push(
    '   FEATURES have been computed deterministically. Do NOT override or',
  )
  lines.push(
    '   contradict them. Use them as evidence to support your criterion scores.',
  )

  return lines.join('\n')
}
