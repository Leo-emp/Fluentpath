// # Quality gates for writing task items.
// # Checks: rubric exists, model answer present, word counts valid, prompt non-empty.

import type { WritingTaskItem, ItemIssue } from './types'

export function reviewWritingTask(item: WritingTaskItem): ItemIssue[] {
  const issues: ItemIssue[] = []

  // # Prompt must exist.
  if (!item.prompt || item.prompt.trim().length === 0) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Writing task has no prompt.',
    })
  }

  // # Must have at least one rubric criterion.
  if (!item.rubric || item.rubric.length === 0) {
    issues.push({
      code: 'NO_RUBRIC',
      severity: 'reject',
      message: 'Writing task has no rubric criteria for assessment.',
    })
  }

  // # Model answer must exist and be substantial.
  if (!item.modelAnswer || item.modelAnswer.trim().length === 0) {
    issues.push({
      code: 'NO_MODEL_ANSWER',
      severity: 'reject',
      message: 'Writing task has no model answer.',
    })
  } else if (item.minWords > 0) {
    // # Model answer should meet the minimum word count it asks learners for.
    const modelWordCount = item.modelAnswer.split(/\s+/).length
    if (modelWordCount < item.minWords) {
      issues.push({
        code: 'NO_MODEL_ANSWER',
        severity: 'warn',
        message: `Model answer is ${modelWordCount} words but the task requires ${item.minWords}.`,
      })
    }
  }

  // # Word count constraints must be logical.
  if (item.minWords < 0) {
    issues.push({
      code: 'WORD_COUNT_INVALID',
      severity: 'reject',
      message: 'Minimum word count cannot be negative.',
    })
  }
  if (item.maxWords > 0 && item.maxWords < item.minWords) {
    issues.push({
      code: 'WORD_COUNT_INVALID',
      severity: 'reject',
      message: `Max words (${item.maxWords}) is less than min words (${item.minWords}).`,
    })
  }

  // # Chart description tasks must include chart data.
  if (item.format === 'chart_description' && (!item.chartData || item.chartData.trim().length === 0)) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'reject',
      message: 'Chart description task needs chartData describing the data to summarise.',
    })
  }

  // # Letter tasks should include a scenario.
  if ((item.format === 'letter_formal' || item.format === 'letter_informal') &&
      (!item.scenario || item.scenario.trim().length === 0)) {
    issues.push({
      code: 'STRUCTURE',
      severity: 'warn',
      message: 'Letter writing task should include a scenario for context.',
    })
  }

  return issues
}
