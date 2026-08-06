// # Central exam registry — imports all exam definitions and provides lookup functions.
// # This is the single place that knows about all available exams.

import type { ExamDefinition } from '@/mock-test/types'
import { IELTS_ACADEMIC } from './ielts-academic'
import { IELTS_GENERAL } from './ielts-general'
import { PTE_ACADEMIC } from './pte-academic'
import { OET } from './oet'

// # All registered exam definitions.
const EXAM_REGISTRY: ExamDefinition[] = [
  IELTS_ACADEMIC,
  IELTS_GENERAL,
  PTE_ACADEMIC,
  OET,
]

// # Look up a single exam by its ID string (e.g., 'ielts-academic').
export function getExamDefinition(id: string): ExamDefinition | null {
  return EXAM_REGISTRY.find((e) => e.id === id) ?? null
}

// # Return a copy of all registered exams (defensive copy).
export function listExamDefinitions(): ExamDefinition[] {
  return [...EXAM_REGISTRY]
}
