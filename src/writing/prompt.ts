/**
 * Scoring prompt assembly — builds the full prompt sent to the LLM
 * for writing assessment.
 *
 * The prompt must produce structured JSON matching the expected output
 * shape (criterion scores with evidence spans + grouped issues).
 *
 * Key quality rules baked into the prompt:
 *   1. Every claim must quote the learner's own words (evidence spans)
 *   2. Generic feedback is explicitly banned
 *   3. Repeated errors must be grouped (not listed N times)
 *   4. Issues must be prioritised (high/medium/low)
 *   5. Feedback language must be at the learner's CEFR level
 */

import type { WritingTask, WritingResponse, WritingRubric } from './types'
import type { ProfilerInventory } from '@/profiler/profile'
import type { WritingFeatures } from './features'

/**
 * Build the full prompt sent to the LLM for scoring.
 *
 * The prompt includes:
 *   - The task context (level, type, prompt given to learner)
 *   - The learner's full text
 *   - The complete rubric with band descriptors
 *   - A structured output format specification
 *   - Quality rules that prevent generic or evidence-free feedback
 *
 * When features are provided, they are injected as pre-computed facts
 * the LLM cannot contradict — the same pattern as speaking assessment.
 */
export function buildScoringPrompt(
  response: WritingResponse,
  task: WritingTask,
  rubric: WritingRubric,
  _inventory: ProfilerInventory,
  features?: WritingFeatures,
): string {
  const lines: string[] = []

  // System instruction: respond as JSON only.
  lines.push('You are scoring a piece of English writing. Your response must be')
  lines.push('a single JSON object, with no surrounding text or markdown fences.')
  lines.push('')

  // ---------------------------------------------------------------------------
  // Task context — tells the model what the learner was asked to do
  // ---------------------------------------------------------------------------
  lines.push('## TASK')
  lines.push(`Level: ${task.level}`)
  lines.push(`Type: ${task.type} (${task.exam})`)
  lines.push(`Prompt given to the learner: "${task.prompt}"`)
  lines.push(`Word limits: ${task.minWords}–${task.maxWords}`)
  lines.push('')

  // ---------------------------------------------------------------------------
  // The learner's text — the model scores THIS text
  // ---------------------------------------------------------------------------
  lines.push('## LEARNER TEXT')
  lines.push('```')
  lines.push(response.text)
  lines.push('```')
  lines.push('')

  // ---------------------------------------------------------------------------
  // Full rubric with band descriptors — the model uses these to assign scores
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
  // Pre-computed features — objective measurements the LLM must not override
  // ---------------------------------------------------------------------------
  if (features) {
    lines.push('## PRE-COMPUTED FEATURES (do NOT contradict these)')
    lines.push(`Word count: ${features.wordCount}`)
    lines.push(`Sentence count: ${features.sentenceCount}`)
    lines.push(`Mean sentence length: ${features.meanSentenceLength} words`)
    lines.push(`Paragraphs: ${features.paragraphCount}`)
    lines.push(`Type-token ratio: ${features.typeTokenRatio}`)
    if (features.missingArticleCount > 0) {
      lines.push(`Detected missing articles: ${features.missingArticleCount} (verify and include in groupedIssues)`)
    }
    if (features.subjectVerbErrors > 0) {
      lines.push(`Detected subject-verb agreement errors: ${features.subjectVerbErrors} (verify and include in groupedIssues)`)
    }
    if (Object.keys(features.vocabularyLevelProfile).length > 0) {
      lines.push(`Vocabulary level profile: ${JSON.stringify(features.vocabularyLevelProfile)}`)
    }
    lines.push('')
  }

  // ---------------------------------------------------------------------------
  // Output format — exact JSON shape the model must produce
  // ---------------------------------------------------------------------------
  lines.push('## OUTPUT FORMAT')
  lines.push('Return a single JSON object with this exact shape:')
  lines.push('')
  lines.push('{')
  lines.push('  "criterionScores": [')
  lines.push('    {')
  lines.push('      "criterionId": "task_achievement",')
  lines.push('      "criterionName": "Task Achievement",')
  lines.push('      "score": 3,')
  lines.push(`      "maxScore": ${rubric.scoreRange.max},`)
  lines.push('      "evidence": [')
  lines.push('        {')
  lines.push('          "start": 0,')
  lines.push('          "end": 42,')
  lines.push('          "quote": "exact text from the learner\'s writing",')
  lines.push('          "issue": "specific problem with this span",')
  lines.push(
    '          "rewrite": "concrete improved version, or null if structural"',
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
  lines.push('      "category": "missing_article",')
  lines.push(
    '      "description": "Articles (a, an, the) are missing before nouns",',
  )
  lines.push('      "count": 3,')
  lines.push('      "priority": "high",')
  lines.push(
    '      "examples": [{"start": 10, "end": 25, "quote": "...", "issue": "...", "rewrite": "..."}]',
  )
  lines.push('    }')
  lines.push('  ]')
  lines.push('}')
  lines.push('')

  // ---------------------------------------------------------------------------
  // Quality rules — these prevent the model from producing generic feedback
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
    '   learner\'s text via the "evidence" array with exact character offsets.',
  )
  lines.push('   Never make a claim without quoting the relevant text.')
  lines.push(
    '4. NEVER give generic feedback like "improve your cohesion" or "use more',
  )
  lines.push(
    '   variety". Every piece of feedback must quote the learner\'s own words',
  )
  lines.push('   and offer a concrete rewrite.')
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
    '7. The "quote" field must be an EXACT substring of the learner text.',
  )
  lines.push('   The "start" and "end" must be the correct character offsets.')
  lines.push(
    '8. Include one CriterionScore object per criterion in the rubric,',
  )
  lines.push('   in the same order as listed above.')

  return lines.join('\n')
}
