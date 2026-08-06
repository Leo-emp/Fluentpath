// # Quality gates for speaking prompt items.
// # Checks: prompt exists, target language listed, model answer notes present,
// # time constraints set, role-play context for OET.

import type { SpeakingPromptItem, ItemIssue } from './types'

export function reviewSpeakingPrompt(item: SpeakingPromptItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Prompt must exist.
  if (!item.prompt || item.prompt.trim().length === 0) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Speaking prompt is empty.',
    })
  }

  // # Target language should list useful vocabulary/phrases.
  if (!item.targetLanguage || item.targetLanguage.length === 0) {
    issues.push({
      code: 'NO_TARGET_LANGUAGE',
      severity: 'warn',
      message: 'Speaking prompt has no target language suggestions.',
    })
  }

  // # Model answer notes required so the learner knows what a good answer includes.
  if (!item.modelAnswerNotes || item.modelAnswerNotes.trim().length === 0) {
    issues.push({
      code: 'NO_MODEL_NOTES',
      severity: 'reject',
      message: 'Speaking prompt has no model answer notes.',
    })
  }

  // # Part 2 long turn must have cue card points.
  if (item.format === 'part2_long_turn') {
    if (!item.cueCardPoints || item.cueCardPoints.length === 0) {
      issues.push({
        code: 'STRUCTURE',
        severity: 'reject',
        message: 'IELTS Part 2 long turn must include cue card points.',
      })
    }
    // # Part 2 should have 60s prep time.
    if (item.prepTimeSeconds < 30) {
      issues.push({
        code: 'STRUCTURE',
        severity: 'warn',
        message: 'IELTS Part 2 typically allows 60 seconds preparation time.',
      })
    }
  }

  // # Role-play tasks (OET) must include scenario context.
  if (item.format === 'role_play' && (!item.rolePlayContext || item.rolePlayContext.trim().length === 0)) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'OET role-play must include rolePlayContext with patient/scenario details.',
    })
  }

  // # Speaking time must be positive.
  if (item.speakTimeSeconds <= 0) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Speaking time must be greater than zero.',
    })
  }

  return issues
}
