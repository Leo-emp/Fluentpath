import { describe, it, expect } from 'vitest'
import { PTE_ACADEMIC } from '@/mock-test/exams/pte-academic'

describe('PTE Academic exam definition', () => {
  it('has 3 sections in the correct order', () => {
    expect(PTE_ACADEMIC.sections).toHaveLength(3)
    expect(PTE_ACADEMIC.sections[0]!.id).toBe('speaking_writing')
    expect(PTE_ACADEMIC.sections[1]!.id).toBe('reading')
    expect(PTE_ACADEMIC.sections[2]!.id).toBe('listening')
  })

  it('Speaking & Writing section: 60 minutes, 7 slots, no backtrack', () => {
    const sw = PTE_ACADEMIC.sections[0]!
    expect(sw.durationMinutes).toBe(60)
    expect(sw.skill).toBe('speaking')
    expect(sw.slots).toHaveLength(7)
    expect(sw.allowBacktrack).toBe(false)
  })

  it('Speaking & Writing has mixed skills — speaking and writing slots', () => {
    const sw = PTE_ACADEMIC.sections[0]!
    // # First 5 slots are speaking tasks.
    const speakingSlots = sw.slots.filter((s) => s.skill === 'speaking')
    // # Last 2 slots are writing tasks.
    const writingSlots = sw.slots.filter((s) => s.skill === 'writing')
    expect(speakingSlots.length).toBe(5)
    expect(writingSlots.length).toBe(2)
  })

  it('Reading section: 30 minutes, 4 slots, backtrack allowed', () => {
    const reading = PTE_ACADEMIC.sections[1]!
    expect(reading.durationMinutes).toBe(30)
    expect(reading.skill).toBe('reading')
    expect(reading.slots).toHaveLength(4)
    expect(reading.allowBacktrack).toBe(true)
  })

  it('Listening section: 40 minutes, 6 slots, no backtrack', () => {
    const listening = PTE_ACADEMIC.sections[2]!
    expect(listening.durationMinutes).toBe(40)
    expect(listening.skill).toBe('listening')
    expect(listening.slots).toHaveLength(6)
    expect(listening.allowBacktrack).toBe(false)
  })

  it('total duration matches section sum (130 minutes)', () => {
    const sectionSum = PTE_ACADEMIC.sections.reduce(
      (sum, s) => sum + s.durationMinutes,
      0,
    )
    expect(sectionSum).toBe(130)
    expect(PTE_ACADEMIC.totalDurationMinutes).toBe(sectionSum)
  })

  it('uses mean_round_int for overall scoring', () => {
    expect(PTE_ACADEMIC.scoring.overallRule).toBe('mean_round_int')
  })

  it('uses score_10_90 score scale', () => {
    expect(PTE_ACADEMIC.scoring.scoreScale).toBe('score_10_90')
  })

  it('all section conversions are null (PTE uses AI scoring)', () => {
    const { sectionConversions } = PTE_ACADEMIC.scoring
    expect(sectionConversions['speaking_writing']).toBeNull()
    expect(sectionConversions['reading']).toBeNull()
    expect(sectionConversions['listening']).toBeNull()
  })

  it('every slot has at least one nodeId', () => {
    for (const section of PTE_ACADEMIC.sections) {
      for (const slot of section.slots) {
        expect(slot.nodeIds.length).toBeGreaterThan(0)
      }
    }
  })

  it('Describe Image slot has prep time', () => {
    const sw = PTE_ACADEMIC.sections[0]!
    const describeImage = sw.slots.find((s) => s.id === 'describe_image')
    expect(describeImage).toBeDefined()
    expect(describeImage!.prepTimeSeconds).toBe(25)
  })

  it('writing slots in combined section have taskRefs', () => {
    const sw = PTE_ACADEMIC.sections[0]!
    const writingSlots = sw.slots.filter((s) => s.skill === 'writing')
    for (const slot of writingSlots) {
      expect(slot.taskRef).not.toBeNull()
    }
  })
})
