import { describe, it, expect } from 'vitest'
import { createSession, transition } from '@/mock-test/session'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { ResponseData } from '@/mock-test/types'

const NOW = 1_000_000
const EXAM = IELTS_ACADEMIC

describe('createSession', () => {
  it('creates a not_started session with all sections locked', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    expect(session.status).toBe('not_started')
    expect(session.examId).toBe('ielts_academic')
    expect(session.learnerId).toBe('learner_001')
    expect(session.activeSectionIndex).toBe(-1)
    expect(session.sectionStates).toHaveLength(4)
    expect(session.sectionStates.every((s) => s.status === 'locked')).toBe(true)
    expect(session.responses).toHaveLength(0)
  })

  it('is fully serializable', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    const roundTripped = JSON.parse(JSON.stringify(session))
    expect(roundTripped).toEqual(session)
  })
})

describe('transition: start', () => {
  it('moves from not_started to in_progress and activates first section', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    const next = transition(session, { type: 'start' }, EXAM, NOW)
    expect(next.status).toBe('in_progress')
    expect(next.startedAt).toBe(NOW)
    expect(next.activeSectionIndex).toBe(0)
    expect(next.sectionStates[0]!.status).toBe('active')
    expect(next.sectionStates[0]!.startedAt).toBe(NOW)
  })

  it('throws if session is already started', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    const started = transition(session, { type: 'start' }, EXAM, NOW)
    expect(() => transition(started, { type: 'start' }, EXAM, NOW + 1000)).toThrow()
  })
})

describe('transition: respond', () => {
  it('records a response in the active section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const responseData: ResponseData = { skill: 'listening', selectedIndex: 2 }
    session = transition(
      session,
      { type: 'respond', slotId: 'part1', responseData },
      EXAM,
      NOW + 5000,
    )
    expect(session.responses).toHaveLength(1)
    expect(session.responses[0]!.slotId).toBe('part1')
    expect(session.responses[0]!.responseData).toEqual(responseData)
    expect(session.responses[0]!.latencyMs).toBe(5000)
  })

  it('copies nodeIds from the slot definition', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const responseData: ResponseData = { skill: 'listening', selectedIndex: 0 }
    session = transition(
      session,
      { type: 'respond', slotId: 'part1', responseData },
      EXAM,
      NOW + 3000,
    )
    // part1 in the Listening section has nodeIds.
    expect(session.responses[0]!.nodeIds).toContain('cando.a2.understand_conversation')
  })

  it('throws if responding to a slot not in the active section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const responseData: ResponseData = { skill: 'writing', text: 'test', wordCount: 1 }
    // Section 0 is Listening; 'task1' is a Writing slot.
    expect(() =>
      transition(
        session,
        { type: 'respond', slotId: 'task1', responseData },
        EXAM,
        NOW + 1000,
      ),
    ).toThrow()
  })

  it('advances the slot index within the section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const r1: ResponseData = { skill: 'listening', selectedIndex: 0 }
    session = transition(session, { type: 'respond', slotId: 'part1', responseData: r1 }, EXAM, NOW + 1000)
    expect(session.sectionStates[0]!.currentSlotIndex).toBe(1)
    const r2: ResponseData = { skill: 'listening', selectedIndex: 1 }
    session = transition(session, { type: 'respond', slotId: 'part2', responseData: r2 }, EXAM, NOW + 2000)
    expect(session.sectionStates[0]!.currentSlotIndex).toBe(2)
  })
})

describe('transition: advance_section', () => {
  it('completes the current section and activates the next', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'advance_section' }, EXAM, NOW + 60_000)
    expect(session.sectionStates[0]!.status).toBe('completed')
    expect(session.sectionStates[0]!.completedAt).toBe(NOW + 60_000)
    expect(session.activeSectionIndex).toBe(1)
    expect(session.sectionStates[1]!.status).toBe('active')
    expect(session.sectionStates[1]!.startedAt).toBe(NOW + 60_000)
  })

  it('completes the test when advancing past the last section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    for (let i = 0; i < 4; i++) {
      session = transition(session, { type: 'advance_section' }, EXAM, NOW + (i + 1) * 60_000)
    }
    expect(session.status).toBe('completed')
    expect(session.completedAt).toBe(NOW + 4 * 60_000)
    expect(session.activeSectionIndex).toBe(-1)
  })
})

describe('transition: tick', () => {
  it('accumulates elapsed time on the active section', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'tick', elapsedMs: 30_000 }, EXAM, NOW + 30_000)
    expect(session.sectionStates[0]!.elapsedMs).toBe(30_000)
  })

  it('accumulates across multiple ticks', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'tick', elapsedMs: 10_000 }, EXAM, NOW + 10_000)
    session = transition(session, { type: 'tick', elapsedMs: 20_000 }, EXAM, NOW + 30_000)
    expect(session.sectionStates[0]!.elapsedMs).toBe(30_000)
  })

  it('auto-completes section when elapsed exceeds section duration', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    // Listening is 40 minutes = 2_400_000 ms.
    session = transition(
      session,
      { type: 'tick', elapsedMs: 2_500_000 },
      EXAM,
      NOW + 2_500_000,
    )
    expect(session.sectionStates[0]!.status).toBe('completed')
    expect(session.activeSectionIndex).toBe(1)
    expect(session.sectionStates[1]!.status).toBe('active')
  })

  it('completes the test if last section times out', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    // Advance to the last section (Speaking).
    for (let i = 0; i < 3; i++) {
      session = transition(session, { type: 'advance_section' }, EXAM, NOW + (i + 1) * 60_000)
    }
    expect(session.activeSectionIndex).toBe(3)
    // Speaking is 14 minutes = 840_000 ms. Tick past it.
    session = transition(
      session,
      { type: 'tick', elapsedMs: 900_000 },
      EXAM,
      NOW + 4 * 60_000 + 900_000,
    )
    expect(session.status).toBe('completed')
    expect(session.activeSectionIndex).toBe(-1)
  })
})

describe('transition: pause and resume', () => {
  it('pauses and resumes the session', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'pause' }, EXAM, NOW + 5000)
    expect(session.status).toBe('paused')
    session = transition(session, { type: 'resume' }, EXAM, NOW + 10_000)
    expect(session.status).toBe('in_progress')
  })

  it('throws if pausing a non-active session', () => {
    const session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    expect(() => transition(session, { type: 'pause' }, EXAM, NOW)).toThrow()
  })

  it('throws if resuming a non-paused session', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    expect(() => transition(session, { type: 'resume' }, EXAM, NOW)).toThrow()
  })
})

describe('transition: abandon', () => {
  it('marks the session as abandoned', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    session = transition(session, { type: 'abandon' }, EXAM, NOW + 5000)
    expect(session.status).toBe('abandoned')
    expect(session.completedAt).toBe(NOW + 5000)
  })
})

describe('serialization round-trip', () => {
  it('preserves state through JSON stringify/parse after actions', () => {
    let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    const responseData: ResponseData = { skill: 'listening', selectedIndex: 1 }
    session = transition(
      session,
      { type: 'respond', slotId: 'part1', responseData },
      EXAM,
      NOW + 3000,
    )
    session = transition(session, { type: 'tick', elapsedMs: 3000 }, EXAM, NOW + 3000)
    const roundTripped = JSON.parse(JSON.stringify(session))
    expect(roundTripped).toEqual(session)
  })
})
