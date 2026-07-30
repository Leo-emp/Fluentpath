/**
 * Performance record assembly — the output of a mock test.
 *
 * Takes a completed TestSession and section-level band scores, and
 * produces a PerformanceRecord suitable for the diagnosis engine (R1f).
 *
 * The record groups responses by section, computes timing statistics,
 * and carries every data point the diagnosis needs: response data,
 * latency, nodeIds for skill-graph attribution, and scores.
 */

import type {
  TestSession,
  ExamDefinition,
  PerformanceRecord,
  SectionResult,
  ResponseRecord,
} from './types'

/**
 * Assemble a PerformanceRecord from a completed session.
 *
 * @param session         The completed (or abandoned) test session.
 * @param exam            The exam definition (for section metadata).
 * @param sectionBandScores  Band scores per section, keyed by section ID.
 *                           Sections without a score get 0.
 */
export function assemblePerformanceRecord(
  session: TestSession,
  exam: ExamDefinition,
  sectionBandScores: Record<string, number>,
): PerformanceRecord {
  const sectionResults: SectionResult[] = []

  for (const sectionState of session.sectionStates) {
    // Find the matching section definition for metadata (skill, duration).
    const sectionDef = exam.sections.find((s) => s.id === sectionState.sectionId)
    if (!sectionDef) continue

    // Gather responses that belong to this section.
    const responses = session.responses.filter(
      (r) => r.sectionId === sectionState.sectionId,
    )

    // Compute duration from section state timestamps.
    // If a section was never started, fall back to the session timestamps.
    const startedAt = sectionState.startedAt ?? session.startedAt ?? 0
    const completedAt = sectionState.completedAt ?? session.completedAt ?? startedAt
    const durationMs = completedAt - startedAt

    // A section timed out if its elapsed time reached or exceeded
    // its allocated duration. Sections that were never started can't
    // have timed out (elapsedMs stays 0).
    const sectionDurationMs = sectionDef.durationMinutes * 60_000
    const timedOut = sectionState.elapsedMs >= sectionDurationMs

    sectionResults.push({
      sectionId: sectionState.sectionId,
      skill: sectionDef.skill,
      bandScore: sectionBandScores[sectionState.sectionId] ?? 0,
      responses,
      durationMs,
      timedOut,
    })
  }

  return {
    sessionId: session.id,
    examId: session.examId,
    learnerId: session.learnerId,
    startedAt: session.startedAt ?? 0,
    completedAt: session.completedAt ?? 0,
    totalDurationMs: (session.completedAt ?? 0) - (session.startedAt ?? 0),
    sectionResults,
  }
}

/**
 * Apply a score to a response record (immutable).
 *
 * Returns a new ResponseRecord with the score fields set.
 * The original record is not mutated — this is important because
 * the session state must remain immutable for the reducer pattern.
 */
export function scoreResponse(
  response: ResponseRecord,
  score: number,
  maxScore: number,
): ResponseRecord {
  return { ...response, score, maxScore }
}
