import { describe, it, expect } from 'vitest'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import {
  getExamDefinition,
  listExamDefinitions,
} from '@/mock-test/exams/registry'

describe('IELTS Academic exam definition', () => {
  it('has 4 sections in the correct order', () => {
    expect(IELTS_ACADEMIC.sections).toHaveLength(4)
    expect(IELTS_ACADEMIC.sections[0]!.id).toBe('listening')
    expect(IELTS_ACADEMIC.sections[1]!.id).toBe('reading')
    expect(IELTS_ACADEMIC.sections[2]!.id).toBe('writing')
    expect(IELTS_ACADEMIC.sections[3]!.id).toBe('speaking')
  })

  it('Listening section: 40 minutes, 4 parts', () => {
    const listening = IELTS_ACADEMIC.sections[0]!
    expect(listening.durationMinutes).toBe(40)
    expect(listening.skill).toBe('listening')
    expect(listening.slots).toHaveLength(4)
    expect(listening.allowBacktrack).toBe(false)
  })

  it('Reading section: 60 minutes, 3 passages', () => {
    const reading = IELTS_ACADEMIC.sections[1]!
    expect(reading.durationMinutes).toBe(60)
    expect(reading.skill).toBe('reading')
    expect(reading.slots).toHaveLength(3)
    expect(reading.allowBacktrack).toBe(true)
  })

  it('Writing section: 60 minutes, 2 tasks with sub-timings', () => {
    const writing = IELTS_ACADEMIC.sections[2]!
    expect(writing.durationMinutes).toBe(60)
    expect(writing.skill).toBe('writing')
    expect(writing.slots).toHaveLength(2)
    // Task 1: 20 minutes recommended.
    expect(writing.slots[0]!.durationMinutes).toBe(20)
    // Task 2: 40 minutes recommended.
    expect(writing.slots[1]!.durationMinutes).toBe(40)
    expect(writing.allowBacktrack).toBe(true)
  })

  it('Speaking section: 14 minutes, 3 parts', () => {
    const speaking = IELTS_ACADEMIC.sections[3]!
    expect(speaking.durationMinutes).toBe(14)
    expect(speaking.skill).toBe('speaking')
    expect(speaking.slots).toHaveLength(3)
    // Part 2 has 60 seconds prep time.
    expect(speaking.slots[1]!.prepTimeSeconds).toBe(60)
    expect(speaking.allowBacktrack).toBe(false)
  })

  it('total duration matches section sum', () => {
    const sectionSum = IELTS_ACADEMIC.sections.reduce(
      (sum, s) => sum + s.durationMinutes,
      0,
    )
    expect(IELTS_ACADEMIC.totalDurationMinutes).toBe(sectionSum)
  })

  it('has scoring conversion tables for Listening and Reading', () => {
    const { sectionConversions } = IELTS_ACADEMIC.scoring
    expect(sectionConversions['listening']).not.toBeNull()
    expect(sectionConversions['reading']).not.toBeNull()
    expect(sectionConversions['writing']).toBeNull()
    expect(sectionConversions['speaking']).toBeNull()
  })

  it('Listening conversion: 39 raw = band 9', () => {
    const table = IELTS_ACADEMIC.scoring.sectionConversions['listening']!
    const entry = table.entries.find((e) => e.minRaw <= 39)
    expect(entry).toBeDefined()
    expect(entry!.band).toBe(9)
  })

  it('Reading conversion: 1 raw = band 1', () => {
    const table = IELTS_ACADEMIC.scoring.sectionConversions['reading']!
    const lastEntry = table.entries[table.entries.length - 1]!
    expect(lastEntry.minRaw).toBe(1)
    expect(lastEntry.band).toBe(1)
  })

  it('uses mean_round_half for overall scoring', () => {
    expect(IELTS_ACADEMIC.scoring.overallRule).toBe('mean_round_half')
  })

  it('every slot has a skill matching its section', () => {
    for (const section of IELTS_ACADEMIC.sections) {
      for (const slot of section.slots) {
        expect(slot.skill).toBe(section.skill)
      }
    }
  })

  it('every slot has at least one nodeId', () => {
    for (const section of IELTS_ACADEMIC.sections) {
      for (const slot of section.slots) {
        expect(slot.nodeIds.length).toBeGreaterThan(0)
      }
    }
  })

  it('getExamDefinition returns the definition by ID', () => {
    const exam = getExamDefinition('ielts_academic')
    expect(exam).toBe(IELTS_ACADEMIC)
    expect(getExamDefinition('nonexistent')).toBeNull()
  })

  it('listExamDefinitions returns all registered exams', () => {
    const exams = listExamDefinitions()
    expect(exams.length).toBeGreaterThanOrEqual(1)
    expect(exams.some((e) => e.id === 'ielts_academic')).toBe(true)
  })
})
