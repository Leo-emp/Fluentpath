// # Tests for the central exam registry — verifies all 4 exams are registered.

import { describe, it, expect } from 'vitest'
import { getExamDefinition, listExamDefinitions } from '@/mock-test/exams/registry'

describe('Exam Registry', () => {
  it('lists all 4 registered exams', () => {
    const exams = listExamDefinitions()
    expect(exams).toHaveLength(4)

    // # Verify all 4 exam IDs are present.
    const ids = exams.map((e) => e.id)
    expect(ids).toContain('ielts_academic')
    expect(ids).toContain('ielts_general')
    expect(ids).toContain('pte_academic')
    expect(ids).toContain('oet')
  })

  it('looks up each exam by ID', () => {
    expect(getExamDefinition('ielts_academic')).not.toBeNull()
    expect(getExamDefinition('ielts_general')).not.toBeNull()
    expect(getExamDefinition('pte_academic')).not.toBeNull()
    expect(getExamDefinition('oet')).not.toBeNull()
  })

  it('returns null for unknown exam ID', () => {
    expect(getExamDefinition('nonexistent')).toBeNull()
    expect(getExamDefinition('')).toBeNull()
  })

  it('returns a defensive copy from listExamDefinitions', () => {
    // # Modifying the returned array should not affect the registry.
    const exams1 = listExamDefinitions()
    const exams2 = listExamDefinitions()
    expect(exams1).not.toBe(exams2)
    expect(exams1).toEqual(exams2)
  })
})
