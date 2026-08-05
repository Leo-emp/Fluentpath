import { describe, it, expect } from 'vitest'
import { OET } from '@/mock-test/exams/oet'

describe('OET exam definition', () => {
  it('has 4 sections in the correct order', () => {
    expect(OET.sections).toHaveLength(4)
    expect(OET.sections[0]!.id).toBe('listening')
    expect(OET.sections[1]!.id).toBe('reading')
    expect(OET.sections[2]!.id).toBe('writing')
    expect(OET.sections[3]!.id).toBe('speaking')
  })

  it('Listening section: 50 minutes, 2 slots', () => {
    const listening = OET.sections[0]!
    expect(listening.durationMinutes).toBe(50)
    expect(listening.skill).toBe('listening')
    expect(listening.slots).toHaveLength(2)
    expect(listening.allowBacktrack).toBe(false)
  })

  it('Reading section: 60 minutes, 3 slots with sub-timings', () => {
    const reading = OET.sections[1]!
    expect(reading.durationMinutes).toBe(60)
    expect(reading.skill).toBe('reading')
    expect(reading.slots).toHaveLength(3)
    // # Part A: 15 minutes for expeditious reading.
    expect(reading.slots[0]!.durationMinutes).toBe(15)
    // # Part B: 22 minutes for detailed reading.
    expect(reading.slots[1]!.durationMinutes).toBe(22)
    // # Part C: 23 minutes for careful reading.
    expect(reading.slots[2]!.durationMinutes).toBe(23)
    expect(reading.allowBacktrack).toBe(true)
  })

  it('Writing section: 45 minutes, 1 slot', () => {
    const writing = OET.sections[2]!
    expect(writing.durationMinutes).toBe(45)
    expect(writing.skill).toBe('writing')
    expect(writing.slots).toHaveLength(1)
    // # Single referral/discharge letter task.
    expect(writing.slots[0]!.durationMinutes).toBe(45)
    expect(writing.allowBacktrack).toBe(true)
  })

  it('Speaking section: 20 minutes, 2 slots with 120s prep each', () => {
    const speaking = OET.sections[3]!
    expect(speaking.durationMinutes).toBe(20)
    expect(speaking.skill).toBe('speaking')
    expect(speaking.slots).toHaveLength(2)
    // # Each role-play has 2 minutes (120 seconds) preparation time.
    expect(speaking.slots[0]!.prepTimeSeconds).toBe(120)
    expect(speaking.slots[1]!.prepTimeSeconds).toBe(120)
    expect(speaking.allowBacktrack).toBe(false)
  })

  it('total duration = 175 minutes (sum of all sections)', () => {
    const sectionSum = OET.sections.reduce(
      (sum, s) => sum + s.durationMinutes,
      0,
    )
    expect(OET.totalDurationMinutes).toBe(175)
    expect(OET.totalDurationMinutes).toBe(sectionSum)
  })

  it('uses "none" overall rule — OET reports 4 separate grades', () => {
    expect(OET.scoring.overallRule).toBe('none')
  })

  it('has "grade_a_e" score scale', () => {
    expect(OET.scoring.scoreScale).toBe('grade_a_e')
  })

  it('all sectionConversions are null — OET does not use band conversion', () => {
    const { sectionConversions } = OET.scoring
    expect(sectionConversions['listening']).toBeNull()
    expect(sectionConversions['reading']).toBeNull()
    expect(sectionConversions['writing']).toBeNull()
    expect(sectionConversions['speaking']).toBeNull()
  })

  it('has grade conversion tables for listening and reading', () => {
    const { gradeConversions } = OET.scoring
    expect(gradeConversions).toBeDefined()
    expect(gradeConversions!['listening']).toBeDefined()
    expect(gradeConversions!['reading']).toBeDefined()
  })

  it('grade table: 450+ = A, 350+ = B, 300+ = C+, 200+ = C, 100+ = D, 0+ = E', () => {
    // # Both listening and reading use the same grade table.
    const table = OET.scoring.gradeConversions!['listening']!
    expect(table.entries).toHaveLength(6)

    // # Verify each grade boundary (descending order).
    expect(table.entries[0]).toEqual({ minScore: 450, grade: 'A' })
    expect(table.entries[1]).toEqual({ minScore: 350, grade: 'B' })
    expect(table.entries[2]).toEqual({ minScore: 300, grade: 'C+' })
    expect(table.entries[3]).toEqual({ minScore: 200, grade: 'C' })
    expect(table.entries[4]).toEqual({ minScore: 100, grade: 'D' })
    expect(table.entries[5]).toEqual({ minScore: 0, grade: 'E' })
  })

  it('every slot has a skill matching its section', () => {
    for (const section of OET.sections) {
      for (const slot of section.slots) {
        expect(slot.skill).toBe(section.skill)
      }
    }
  })

  it('every slot has at least one nodeId', () => {
    for (const section of OET.sections) {
      for (const slot of section.slots) {
        expect(slot.nodeIds.length).toBeGreaterThan(0)
      }
    }
  })
})
