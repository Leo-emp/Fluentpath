import { describe, it, expect } from 'vitest'
import { IELTS_GENERAL } from '@/mock-test/exams/ielts-general'

describe('IELTS General Training exam definition', () => {
  it('has 4 sections in the correct order', () => {
    expect(IELTS_GENERAL.sections).toHaveLength(4)
    expect(IELTS_GENERAL.sections[0]!.id).toBe('listening')
    expect(IELTS_GENERAL.sections[1]!.id).toBe('reading')
    expect(IELTS_GENERAL.sections[2]!.id).toBe('writing')
    expect(IELTS_GENERAL.sections[3]!.id).toBe('speaking')
  })

  it('Listening section: 40 minutes, 4 parts', () => {
    const listening = IELTS_GENERAL.sections[0]!
    expect(listening.durationMinutes).toBe(40)
    expect(listening.skill).toBe('listening')
    expect(listening.slots).toHaveLength(4)
    expect(listening.allowBacktrack).toBe(false)
  })

  it('Reading section: 60 minutes, 3 passages, named General Training Reading', () => {
    const reading = IELTS_GENERAL.sections[1]!
    expect(reading.durationMinutes).toBe(60)
    expect(reading.skill).toBe('reading')
    expect(reading.name).toBe('General Training Reading')
    expect(reading.slots).toHaveLength(3)
    expect(reading.allowBacktrack).toBe(true)
  })

  it('Writing section: 60 minutes, 2 tasks with sub-timings', () => {
    const writing = IELTS_GENERAL.sections[2]!
    expect(writing.durationMinutes).toBe(60)
    expect(writing.skill).toBe('writing')
    expect(writing.name).toBe('General Training Writing')
    expect(writing.slots).toHaveLength(2)
    // Task 1: 20 minutes recommended.
    expect(writing.slots[0]!.durationMinutes).toBe(20)
    // Task 2: 40 minutes recommended.
    expect(writing.slots[1]!.durationMinutes).toBe(40)
    expect(writing.allowBacktrack).toBe(true)
  })

  it('Writing Task 1 is a letter (not chart description)', () => {
    const writing = IELTS_GENERAL.sections[2]!
    // GT Task 1 uses letter taskRef, not the Academic chart taskRef.
    expect(writing.slots[0]!.taskRef).toBe('ielts_gt.task1.letter.1')
    // GT maps to B1 connected text, not B2 data description.
    expect(writing.slots[0]!.nodeIds).toContain('cando.b1.write_connected_text')
  })

  it('Speaking section: 14 minutes, 3 parts', () => {
    const speaking = IELTS_GENERAL.sections[3]!
    expect(speaking.durationMinutes).toBe(14)
    expect(speaking.skill).toBe('speaking')
    expect(speaking.slots).toHaveLength(3)
    // Part 2 has 60 seconds prep time.
    expect(speaking.slots[1]!.prepTimeSeconds).toBe(60)
    expect(speaking.allowBacktrack).toBe(false)
  })

  it('total duration matches section sum (174 minutes)', () => {
    const sectionSum = IELTS_GENERAL.sections.reduce(
      (sum, s) => sum + s.durationMinutes,
      0,
    )
    expect(IELTS_GENERAL.totalDurationMinutes).toBe(174)
    expect(IELTS_GENERAL.totalDurationMinutes).toBe(sectionSum)
  })

  it('has scoring conversion tables for Listening and Reading', () => {
    const { sectionConversions } = IELTS_GENERAL.scoring
    expect(sectionConversions['listening']).not.toBeNull()
    expect(sectionConversions['reading']).not.toBeNull()
    expect(sectionConversions['writing']).toBeNull()
    expect(sectionConversions['speaking']).toBeNull()
  })

  it('Reading conversion: 30 raw = band 6 (more lenient than Academic)', () => {
    // This is the KEY scoring difference — Academic gives band 7 for
    // 30 raw marks, GT gives band 6 because the passages are easier.
    const table = IELTS_GENERAL.scoring.sectionConversions['reading']!
    const entry = table.entries.find((e) => e.minRaw <= 30)
    expect(entry).toBeDefined()
    expect(entry!.band).toBe(6)
  })

  it('Listening conversion: 39 raw = band 9 (same as Academic)', () => {
    const table = IELTS_GENERAL.scoring.sectionConversions['listening']!
    const entry = table.entries.find((e) => e.minRaw <= 39)
    expect(entry).toBeDefined()
    expect(entry!.band).toBe(9)
  })

  it('uses mean_round_half for overall scoring', () => {
    expect(IELTS_GENERAL.scoring.overallRule).toBe('mean_round_half')
  })

  it('every slot has a skill matching its section', () => {
    for (const section of IELTS_GENERAL.sections) {
      for (const slot of section.slots) {
        expect(slot.skill).toBe(section.skill)
      }
    }
  })

  it('every slot has at least one nodeId', () => {
    for (const section of IELTS_GENERAL.sections) {
      for (const slot of section.slots) {
        expect(slot.nodeIds.length).toBeGreaterThan(0)
      }
    }
  })
})
