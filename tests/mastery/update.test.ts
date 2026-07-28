import { describe, it, expect } from 'vitest'
import { updateMastery } from '@/mastery/update'
import type { MasteryRecord } from '@/mastery/types'

const NOW = 1_700_000_000_000
const DAY = 86_400_000

function rec(over: Partial<MasteryRecord> = {}): MasteryRecord {
  return {
    learnerId: 'u1',
    nodeId: 'n1',
    mastery: 0.5,
    confidence: 0,
    exposures: 0,
    correctStreak: 0,
    lastSeenAt: NOW,
    ...over,
  }
}

describe('direction', () => {
  it('raises mastery on a correct answer', () => {
    expect(updateMastery(rec(), 1, 0.5, NOW).mastery).toBeGreaterThan(0.5)
  })

  it('lowers mastery on a wrong answer', () => {
    expect(updateMastery(rec(), 0, 0.5, NOW).mastery).toBeLessThan(0.5)
  })
})

describe('difficulty weighting', () => {
  it('rewards succeeding on a hard item more than an easy one', () => {
    const hard = updateMastery(rec(), 1, 0.9, NOW).mastery
    const easy = updateMastery(rec(), 1, 0.1, NOW).mastery
    expect(hard).toBeGreaterThan(easy)
  })

  it('punishes failing an easy item more than failing a hard one', () => {
    const failedEasy = updateMastery(rec(), 0, 0.1, NOW).mastery
    const failedHard = updateMastery(rec(), 0, 0.9, NOW).mastery
    expect(failedEasy).toBeLessThan(failedHard)
  })

  it('treats partial credit as between the two', () => {
    const wrong = updateMastery(rec(), 0, 0.5, NOW).mastery
    const partial = updateMastery(rec(), 0.5, 0.5, NOW).mastery
    const right = updateMastery(rec(), 1, 0.5, NOW).mastery
    expect(partial).toBeGreaterThan(wrong)
    expect(partial).toBeLessThan(right)
  })
})

describe('confidence damping', () => {
  it('moves less once confidence is high', () => {
    const green = updateMastery(rec({ confidence: 0 }), 1, 0.5, NOW).mastery
    const seasoned = updateMastery(rec({ confidence: 0.9, exposures: 20 }), 1, 0.5, NOW).mastery
    expect(green - 0.5).toBeGreaterThan(seasoned - 0.5)
  })

  it('raises confidence with every exposure', () => {
    expect(updateMastery(rec({ confidence: 0.2, exposures: 2 }), 1, 0.5, NOW).confidence).toBeGreaterThan(0.2)
  })

  it('never lets confidence exceed 1', () => {
    expect(updateMastery(rec({ exposures: 500 }), 1, 0.5, NOW).confidence).toBeLessThanOrEqual(1)
  })
})

describe('bookkeeping', () => {
  it('increments exposures and extends the streak on success', () => {
    const next = updateMastery(rec({ exposures: 3, correctStreak: 2 }), 1, 0.5, NOW)
    expect(next.exposures).toBe(4)
    expect(next.correctStreak).toBe(3)
  })

  it('resets the streak on failure', () => {
    expect(updateMastery(rec({ correctStreak: 5 }), 0, 0.5, NOW).correctStreak).toBe(0)
  })

  it('stamps lastSeenAt with the supplied time', () => {
    const later = NOW + 5000
    expect(updateMastery(rec(), 1, 0.5, later).lastSeenAt).toBe(later)
  })

  it('preserves learner and node identity', () => {
    const next = updateMastery(rec(), 1, 0.5, NOW)
    expect(next.learnerId).toBe('u1')
    expect(next.nodeId).toBe('n1')
  })
})

describe('bounds', () => {
  it('keeps mastery within 0..1 under repeated success', () => {
    let r = rec()
    for (let i = 0; i < 100; i++) r = updateMastery(r, 1, 0.9, NOW)
    expect(r.mastery).toBeLessThanOrEqual(1)
    expect(r.mastery).toBeGreaterThan(0.9)
  })

  it('keeps mastery within 0..1 under repeated failure', () => {
    let r = rec()
    for (let i = 0; i < 100; i++) r = updateMastery(r, 0, 0.1, NOW)
    expect(r.mastery).toBeGreaterThanOrEqual(0)
    expect(r.mastery).toBeLessThan(0.1)
  })

  it('clamps an out-of-range outcome rather than propagating it', () => {
    const next = updateMastery(rec(), 5, 0.5, NOW)
    expect(next.mastery).toBeLessThanOrEqual(1)
  })
})

describe('decay interaction', () => {
  it('assesses against decayed mastery, not the stored value', () => {
    const stale = rec({ mastery: 1, confidence: 0.5, lastSeenAt: NOW - 200 * DAY })

    // Stored mastery is 1, but 200 days have passed, so the real starting
    // point is well below that. A wrong answer must land far below 0.5.
    expect(updateMastery(stale, 0, 0.5, NOW).mastery).toBeLessThan(0.5)
  })

  it('lets a correct answer after a long gap recover mastery', () => {
    const stale = rec({ mastery: 1, confidence: 0.5, lastSeenAt: NOW - 200 * DAY })
    const decayed = updateMastery(stale, 0, 0.5, NOW).mastery
    const recovered = updateMastery(stale, 1, 0.5, NOW).mastery
    expect(recovered).toBeGreaterThan(decayed)
  })
})
