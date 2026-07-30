/**
 * Test session state machine — the core of the mock test engine.
 *
 * Architecture: a pure reducer function.
 *   transition(currentState, action, examDefinition, now) → nextState
 *
 * This pattern gives us three things for free:
 *   1. Deterministic — same inputs always produce the same output (testable)
 *   2. Serializable — the session is a plain object, JSON round-trips cleanly
 *   3. Interruption-safe — persist after every transition, resume from any state
 *
 * The session tracks which section is active, how much time has elapsed,
 * and every response. It never scores responses — that's delegated to
 * the writing/speaking/MCQ modules. It just records what happened.
 */

import type {
  ExamDefinition,
  TestSession,
  SessionAction,
  SectionState,
  ResponseRecord,
  ResponseData,
} from './types'

/**
 * Create a new test session for an exam.
 *
 * All sections start locked. The session starts in 'not_started' status.
 * Call transition with { type: 'start' } to begin.
 */
export function createSession(
  exam: ExamDefinition,
  learnerId: string,
  sessionId: string,
  _now: number,
): TestSession {
  return {
    id: sessionId,
    examId: exam.id,
    learnerId,
    status: 'not_started',
    startedAt: null,
    completedAt: null,
    activeSectionIndex: -1,
    sectionStates: exam.sections.map((section) => ({
      sectionId: section.id,
      status: 'locked' as const,
      startedAt: null,
      completedAt: null,
      elapsedMs: 0,
      currentSlotIndex: 0,
    })),
    responses: [],
  }
}

/**
 * Apply an action to the session, producing the next state.
 *
 * This is a pure function — it never mutates the input session.
 * The exam definition is passed in so the engine can check section
 * durations, slot validity, etc.
 *
 * Throws on invalid transitions (e.g. responding to a locked section,
 * starting an already-started session). The caller should catch and
 * handle these — they indicate a bug in the UI layer, not a user error.
 */
export function transition(
  session: TestSession,
  action: SessionAction,
  exam: ExamDefinition,
  now: number,
): TestSession {
  switch (action.type) {
    case 'start':
      return handleStart(session, now)
    case 'advance_section':
      return handleAdvanceSection(session, exam, now)
    case 'respond':
      return handleRespond(session, action.slotId, action.responseData, exam, now)
    case 'tick':
      return handleTick(session, action.elapsedMs, exam, now)
    case 'pause':
      return handlePause(session)
    case 'resume':
      return handleResume(session)
    case 'abandon':
      return handleAbandon(session, now)
  }
}

// ---------------------------------------------------------------------------
// Action handlers — each returns a new session (never mutates)
// ---------------------------------------------------------------------------

function handleStart(session: TestSession, now: number): TestSession {
  if (session.status !== 'not_started') {
    throw new Error(`Cannot start session in status '${session.status}'`)
  }

  // Activate the first section.
  const sectionStates = session.sectionStates.map((s, i) =>
    i === 0 ? { ...s, status: 'active' as const, startedAt: now } : s,
  )

  return {
    ...session,
    status: 'in_progress',
    startedAt: now,
    activeSectionIndex: 0,
    sectionStates,
  }
}

function handleAdvanceSection(
  session: TestSession,
  exam: ExamDefinition,
  now: number,
): TestSession {
  assertActive(session)
  const currentIndex = session.activeSectionIndex

  // Complete the current section.
  const sectionStates = [...session.sectionStates]
  sectionStates[currentIndex] = {
    ...sectionStates[currentIndex]!,
    status: 'completed',
    completedAt: now,
  }

  // Find the next section.
  const nextIndex = currentIndex + 1

  if (nextIndex >= exam.sections.length) {
    // No more sections — complete the test.
    return {
      ...session,
      status: 'completed',
      completedAt: now,
      activeSectionIndex: -1,
      sectionStates,
    }
  }

  // Activate the next section.
  sectionStates[nextIndex] = {
    ...sectionStates[nextIndex]!,
    status: 'active',
    startedAt: now,
  }

  return {
    ...session,
    activeSectionIndex: nextIndex,
    sectionStates,
  }
}

function handleRespond(
  session: TestSession,
  slotId: string,
  responseData: ResponseData,
  exam: ExamDefinition,
  now: number,
): TestSession {
  assertActive(session)
  const currentIndex = session.activeSectionIndex
  const section = exam.sections[currentIndex]!

  // Verify the slot belongs to the active section.
  const slot = section.slots.find((s) => s.id === slotId)
  if (!slot) {
    throw new Error(
      `Slot '${slotId}' not found in active section '${section.id}'`,
    )
  }

  // Compute response timing. The start time is the section start time
  // for the first response, or the previous response's submit time.
  const sectionState = session.sectionStates[currentIndex]!
  const previousResponses = session.responses.filter(
    (r) => r.sectionId === section.id,
  )
  const startedAt =
    previousResponses.length > 0
      ? previousResponses[previousResponses.length - 1]!.submittedAt ?? sectionState.startedAt!
      : sectionState.startedAt!

  const response: ResponseRecord = {
    sectionId: section.id,
    slotId,
    nodeIds: [...slot.nodeIds],
    startedAt,
    submittedAt: now,
    latencyMs: now - startedAt,
    responseData,
    score: null,
    maxScore: null,
  }

  // Advance the current slot index within the section.
  const slotIndex = section.slots.findIndex((s) => s.id === slotId)
  const sectionStates = [...session.sectionStates]
  sectionStates[currentIndex] = {
    ...sectionStates[currentIndex]!,
    currentSlotIndex: Math.max(
      sectionStates[currentIndex]!.currentSlotIndex,
      slotIndex + 1,
    ),
  }

  return {
    ...session,
    sectionStates,
    responses: [...session.responses, response],
  }
}

function handleTick(
  session: TestSession,
  elapsedMs: number,
  exam: ExamDefinition,
  now: number,
): TestSession {
  assertActive(session)
  const currentIndex = session.activeSectionIndex
  const section = exam.sections[currentIndex]!
  const sectionDurationMs = section.durationMinutes * 60_000

  const sectionStates = [...session.sectionStates]
  const newElapsed = sectionStates[currentIndex]!.elapsedMs + elapsedMs
  sectionStates[currentIndex] = {
    ...sectionStates[currentIndex]!,
    elapsedMs: newElapsed,
  }

  // Check if the section's time has expired.
  if (newElapsed >= sectionDurationMs) {
    // Complete the current section due to timeout.
    sectionStates[currentIndex] = {
      ...sectionStates[currentIndex]!,
      status: 'completed',
      completedAt: now,
    }

    // Auto-advance to the next section.
    const nextIndex = currentIndex + 1
    if (nextIndex >= exam.sections.length) {
      return {
        ...session,
        status: 'completed',
        completedAt: now,
        activeSectionIndex: -1,
        sectionStates,
      }
    }

    sectionStates[nextIndex] = {
      ...sectionStates[nextIndex]!,
      status: 'active',
      startedAt: now,
    }

    return {
      ...session,
      activeSectionIndex: nextIndex,
      sectionStates,
    }
  }

  return { ...session, sectionStates }
}

function handlePause(session: TestSession): TestSession {
  if (session.status !== 'in_progress') {
    throw new Error(`Cannot pause session in status '${session.status}'`)
  }
  return { ...session, status: 'paused' }
}

function handleResume(session: TestSession): TestSession {
  if (session.status !== 'paused') {
    throw new Error(`Cannot resume session in status '${session.status}'`)
  }
  return { ...session, status: 'in_progress' }
}

function handleAbandon(session: TestSession, now: number): TestSession {
  return {
    ...session,
    status: 'abandoned',
    completedAt: now,
  }
}

// ---------------------------------------------------------------------------
// Guards
// ---------------------------------------------------------------------------

function assertActive(session: TestSession): void {
  if (session.status !== 'in_progress') {
    throw new Error(
      `Session must be in_progress, but is '${session.status}'`,
    )
  }
  if (session.activeSectionIndex < 0) {
    throw new Error('No active section')
  }
}
