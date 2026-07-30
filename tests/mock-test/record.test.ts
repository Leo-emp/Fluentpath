import { describe, it, expect } from 'vitest'
import { assemblePerformanceRecord, scoreResponse } from '@/mock-test/record'
import { createSession, transition } from '@/mock-test/session'
import { IELTS_ACADEMIC } from '@/mock-test/exams/ielts-academic'
import type { ResponseData } from '@/mock-test/types'

const NOW = 1_000_000
const EXAM = IELTS_ACADEMIC

// Helper: build a session with some responses and advance to completion.
function buildCompletedSession() {
  let session = createSession(EXAM, 'learner_001', 'sess_001', NOW)
  session = transition(session, { type: 'start' }, EXAM, NOW)

  // Record a response in the Listening section.
  const listeningResponse: ResponseData = { skill: 'listening', selectedIndex: 2 }
  session = transition(
    session,
    { type: 'respond', slotId: 'part1', responseData: listeningResponse },
    EXAM,
    NOW + 5000,
  )

  // Advance through all sections.
  for (let i = 0; i < 4; i++) {
    session = transition(session, { type: 'advance_section' }, EXAM, NOW + (i + 1) * 60_000)
  }

  return session
}

describe('assemblePerformanceRecord', () => {
  it('produces a record from a completed session', () => {
    const session = buildCompletedSession()
    const bandScores = { writing: 6.5, speaking: 7 }
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    expect(record.sessionId).toBe('sess_001')
    expect(record.examId).toBe('ielts_academic')
    expect(record.learnerId).toBe('learner_001')
    expect(record.startedAt).toBe(NOW)
    expect(record.completedAt).toBe(NOW + 4 * 60_000)
  })

  it('groups responses into section results', () => {
    const session = buildCompletedSession()
    const bandScores = { writing: 6.5, speaking: 7 }
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    // Should have section results for sections that have responses or band scores.
    const writingResult = record.sectionResults.find((r) => r.sectionId === 'writing')
    expect(writingResult?.bandScore).toBe(6.5)

    const speakingResult = record.sectionResults.find((r) => r.sectionId === 'speaking')
    expect(speakingResult?.bandScore).toBe(7)
  })

  it('computes section duration from section state', () => {
    const session = buildCompletedSession()
    const bandScores = { writing: 6.5, speaking: 7 }
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    // Each section was started and completed at known times.
    for (const sr of record.sectionResults) {
      expect(sr.durationMs).toBeGreaterThanOrEqual(0)
    }
  })

  it('includes all responses in the correct section', () => {
    const session = buildCompletedSession()
    const bandScores = {}
    const record = assemblePerformanceRecord(session, EXAM, bandScores)

    const listeningResult = record.sectionResults.find((r) => r.sectionId === 'listening')
    expect(listeningResult?.responses).toHaveLength(1)
    expect(listeningResult?.responses[0]!.slotId).toBe('part1')
  })

  it('sets timedOut based on section elapsed vs duration', () => {
    // Build a session where a section times out.
    let session = createSession(EXAM, 'learner_001', 'sess_002', NOW)
    session = transition(session, { type: 'start' }, EXAM, NOW)
    // Tick past the Listening duration (40min = 2_400_000ms).
    session = transition(
      session,
      { type: 'tick', elapsedMs: 2_500_000 },
      EXAM,
      NOW + 2_500_000,
    )
    // Complete remaining sections.
    for (let i = 0; i < 3; i++) {
      session = transition(
        session,
        { type: 'advance_section' },
        EXAM,
        NOW + 2_500_000 + (i + 1) * 60_000,
      )
    }

    const bandScores = {}
    const record = assemblePerformanceRecord(session, EXAM, bandScores)
    const listeningResult = record.sectionResults.find((r) => r.sectionId === 'listening')
    expect(listeningResult?.timedOut).toBe(true)
  })
})

describe('scoreResponse', () => {
  it('returns a new ResponseRecord with score applied', () => {
    const original = {
      sectionId: 'writing',
      slotId: 'task1',
      nodeIds: ['cando.b2.describe_data'],
      startedAt: 1000,
      submittedAt: 2000,
      latencyMs: 1000,
      responseData: { skill: 'writing' as const, text: 'The chart shows...', wordCount: 150 },
      score: null,
      maxScore: null,
    }
    const scored = scoreResponse(original, 6.5, 9)
    expect(scored.score).toBe(6.5)
    expect(scored.maxScore).toBe(9)
    // Original must not be mutated.
    expect(original.score).toBeNull()
  })
})
