import { describe, it, expect } from 'vitest'
import { retainedMastery, halfLifeDays, RETENTION_FLOOR, DEFAULT_HALF_LIFE_DAYS } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000
const DAY = 86_400_000

function rec(over: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    learnerId: 'u1',
    nodeId: 'n1',
    mastery: 1,
    confidence: 0.5,
    exposures: 5,
    correctStreak: 2,
    lastSeenAt: NOW,
    ...over,
  }
}

describe('halfLifeDays', () => {
  it('uses the default half-life at zero confidence', () => {
    expect(halfLifeDays(0)).toBe(DEFAULT_HALF_LIFE_DAYS)
  })

  it('gives well-established knowledge a longer half-life', () => {
    expect(halfLifeDays(0.9)).toBeGreaterThan(halfLifeDays(0.1))
  })

  it('rises monotonically with confidence', () => {
    expect(halfLifeDays(0.25)).toBeLessThan(halfLifeDays(0.5))
    expect(halfLifeDays(0.5)).toBeLessThan(halfLifeDays(0.75))
  })
})

describe('retainedMastery', () => {
  it('returns full mastery when no time has passed', () => {
    expect(retainedMastery(rec(), NOW)).toBeCloseTo(1)
  })

  it('decays halfway to the floor after one half-life', () => {
    const record = rec({ mastery: 1, confidence: 0.5 })
    const days = halfLifeDays(0.5)
    const result = retainedMastery(record, NOW + days * DAY)

    // Half the distance from 1 down to the floor, not half of 1.
    const expected = RETENTION_FLOOR + (1 - RETENTION_FLOOR) * 0.5
    expect(result).toBeCloseTo(expected, 5)
  })

  it('decays three quarters of the way after two half-lives', () => {
    const record = rec({ mastery: 1, confidence: 0.5 })
    const days = halfLifeDays(0.5) * 2
    const expected = RETENTION_FLOOR + (1 - RETENTION_FLOOR) * 0.25
    expect(retainedMastery(record, NOW + days * DAY)).toBeCloseTo(expected, 5)
  })

  it('never falls below the retention floor', () => {
    const result = retainedMastery(rec({ mastery: 1 }), NOW + 10_000 * DAY)
    expect(result).toBeGreaterThanOrEqual(RETENTION_FLOOR)
  })

  it('does not raise mastery that already sits below the floor', () => {
    expect(retainedMastery(rec({ mastery: 0.1 }), NOW + 100 * DAY)).toBeCloseTo(0.1)
  })

  it('leaves mastery exactly at the floor unchanged', () => {
    expect(retainedMastery(rec({ mastery: RETENTION_FLOOR }), NOW + 500 * DAY)).toBeCloseTo(RETENTION_FLOOR)
  })

  it('treats a timestamp before lastSeenAt as no elapsed time', () => {
    expect(retainedMastery(rec(), NOW - 5 * DAY)).toBeCloseTo(1)
  })

  it('decays confident knowledge more slowly than shaky knowledge', () => {
    const at = NOW + 60 * DAY
    const shaky = retainedMastery(rec({ mastery: 1, confidence: 0.1 }), at)
    const solid = retainedMastery(rec({ mastery: 1, confidence: 0.9 }), at)
    expect(solid).toBeGreaterThan(shaky)
  })

  it('decays monotonically as time passes', () => {
    const a = retainedMastery(rec(), NOW + 10 * DAY)
    const b = retainedMastery(rec(), NOW + 20 * DAY)
    const c = retainedMastery(rec(), NOW + 40 * DAY)
    expect(a).toBeGreaterThan(b)
    expect(b).toBeGreaterThan(c)
  })
})
