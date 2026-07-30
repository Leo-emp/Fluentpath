import { describe, it, expect } from 'vitest'
import { detectTense, extractTenseFromMisconception } from '@/items/tense-detect'

describe('detectTense', () => {
  // Present perfect: has/have + participle
  it('detects "has lost" as present_perfect', () => {
    expect(detectTense('has lost')).toBe('present_perfect')
  })

  it('detects "have been" as present_perfect', () => {
    expect(detectTense('have been')).toBe('present_perfect')
  })

  it('detects "has read" as present_perfect', () => {
    expect(detectTense('has read')).toBe('present_perfect')
  })

  // Past simple
  it('detects "went" as past_simple', () => {
    expect(detectTense('went')).toBe('past_simple')
  })

  it('detects "played" as past_simple', () => {
    expect(detectTense('played')).toBe('past_simple')
  })

  // Present continuous
  it('detects "is going" as present_continuous', () => {
    expect(detectTense('is going')).toBe('present_continuous')
  })

  it('detects "am losing" as present_continuous', () => {
    expect(detectTense('am losing')).toBe('present_continuous')
  })

  // Past continuous
  it('detects "was losing" as past_continuous', () => {
    expect(detectTense('was losing')).toBe('past_continuous')
  })

  // Future
  it('detects "will go" as future_will', () => {
    expect(detectTense('will go')).toBe('future_will')
  })

  it('detects "going to leave" as future_going_to', () => {
    expect(detectTense('going to leave')).toBe('future_going_to')
  })

  // Modal
  it('detects "should go" as modal', () => {
    expect(detectTense('should go')).toBe('modal')
  })

  // Present simple
  it('detects "goes" as present_simple', () => {
    expect(detectTense('goes')).toBe('present_simple')
  })

  // Edge cases
  it('returns null for empty string', () => {
    expect(detectTense('')).toBeNull()
  })
})

describe('extractTenseFromMisconception', () => {
  it('finds "past simple" in misconception text', () => {
    expect(extractTenseFromMisconception('uses past simple where the result still matters'))
      .toBe('past_simple')
  })

  it('finds "present perfect" in misconception text', () => {
    expect(extractTenseFromMisconception('applies present perfect to a finished event'))
      .toBe('present_perfect')
  })

  it('finds "present continuous" in misconception text', () => {
    expect(extractTenseFromMisconception('confuses with present continuous form'))
      .toBe('present_continuous')
  })

  it('returns null when no tense is named', () => {
    expect(extractTenseFromMisconception('treats a completed event as ongoing'))
      .toBeNull()
  })
})
