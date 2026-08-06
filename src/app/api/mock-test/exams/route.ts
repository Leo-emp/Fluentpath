// GET /api/mock-test/exams
// Public endpoint — lists available exam definitions (no auth required).
// Returns metadata only, never item content.

import { type NextRequest } from 'next/server'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { listExamDefinitions } from '@/mock-test/exams/registry'

export async function GET(_request: NextRequest) {
  try {
    const exams = listExamDefinitions()

    // Strip item content — return metadata only.
    const summaries = exams.map((exam) => ({
      id: exam.id,
      name: exam.name,
      sections: exam.sections.map((s) => ({
        id: s.id,
        name: s.name,
        skill: s.skill,
        slotCount: s.slots.length,
        durationMinutes: s.durationMinutes,
      })),
    }))

    return jsonOk({ exams: summaries })
  } catch (error) {
    console.error('[GET /api/mock-test/exams]', error)
    return jsonError(500, 'Internal server error')
  }
}
