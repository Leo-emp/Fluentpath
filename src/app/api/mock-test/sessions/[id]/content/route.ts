// # GET /api/mock-test/sessions/[id]/content
// # Serves the questions/passages/tasks for the current section.
// # Reading/Listening: pulls items from the seed data by skill.
// # Writing/Speaking: looks up tasks by taskRef.
// # Answer keys are ALWAYS stripped — the client never sees correctIndex.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { AuthError } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { findTestSessionById } from '@/db/repositories/test-sessions'
import { getExamDefinition } from '@/mock-test/exams/registry'
import type { TestSession, ExamSection, SectionSlot } from '@/mock-test/types'
import { getTask as getWritingTask, listTasks as listWritingTasks } from '@/writing/tasks'
import { getTask as getSpeakingTask, listTasks as listSpeakingTasks } from '@/speaking/tasks'
import { getReadingTestSet, getListeningTestSet } from '@/mock-test/content-bank'

// # Strip correctIndex and misconception from any nested object.
function stripAnswers(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(stripAnswers)
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (key === 'correctIndex' || key === 'misconception' || key === 'correctAnswer' || key === 'acceptedAlternatives') continue
      result[key] = stripAnswers(value)
    }
    return result
  }
  return obj
}

// # Rotate a taskRef to pick a different variant based on testNum.
// # e.g. 'ielts.task1.academic.1' → base 'ielts.task1.academic', then pick variant by index.
function rotateWritingTask(baseRef: string, testNum: number) {
  // # Extract the exam prefix from the taskRef (e.g. 'ielts.task1.academic' or 'ielts.task2').
  const dotParts = baseRef.split('.')
  const prefix = dotParts.slice(0, -1).join('.')
  // # Find all tasks matching this prefix.
  const variants = listWritingTasks({}).filter(t => t.id.startsWith(prefix + '.'))
  if (variants.length === 0) return getWritingTask(baseRef)
  return variants[testNum % variants.length]!
}

function rotateSpeakingTask(baseRef: string, testNum: number) {
  const dotParts = baseRef.split('.')
  const prefix = dotParts.slice(0, -1).join('.')
  const variants = listSpeakingTasks({}).filter(t => t.id.startsWith(prefix + '.'))
  if (variants.length === 0) return getSpeakingTask(baseRef)
  return variants[testNum % variants.length]!
}

// # Build content for a single slot.
// # testNum rotates which test set is served (0-indexed, wraps around).
function getSlotContent(slot: SectionSlot, sectionSkill: string, slotIndex: number, testNum: number) {
  if (sectionSkill === 'writing' && slot.taskRef) {
    const task = rotateWritingTask(slot.taskRef, testNum)
    if (task) {
      return {
        slotId: slot.id,
        type: 'writing',
        prompt: task.prompt,
        minWords: task.minWords,
        maxWords: task.maxWords,
        timeLimitMinutes: task.timeLimitMinutes,
        taskType: task.type,
      }
    }
  }

  if (sectionSkill === 'speaking' && slot.taskRef) {
    const task = rotateSpeakingTask(slot.taskRef, testNum)
    if (task) {
      return {
        slotId: slot.id,
        type: 'speaking',
        prompt: task.prompt,
        timeLimitSeconds: task.timeLimitSeconds,
        prepTimeSeconds: task.prepTimeSeconds,
        taskType: task.type,
      }
    }
  }

  if (sectionSkill === 'reading') {
    // # Pick a reading passage from the rotated test set.
    const testSet = getReadingTestSet(testNum)
    const passage = testSet[slotIndex]
    if (passage) {
      return stripAnswers({
        slotId: slot.id,
        type: 'reading_passage',
        ...passage,
      })
    }
  }

  if (sectionSkill === 'listening') {
    // # Pick a listening item from the rotated test set.
    const testSet = getListeningTestSet(testNum)
    const item = testSet[slotIndex]
    if (item) {
      return stripAnswers({
        slotId: slot.id,
        ...item,
      })
    }
  }

  return { slotId: slot.id, type: 'unknown', message: 'Content not available for this slot' }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const { id } = await params
    const db = getDb()

    const row = await findTestSessionById(db, id)
    if (!row) return jsonError(404, 'Session not found')
    if (row.learnerId !== learnerId) return jsonError(403, 'You do not own this session')

    const session = row.state as unknown as TestSession
    const exam = getExamDefinition(row.examId)
    if (!exam) return jsonError(500, 'Exam definition not found')

    // # Derive a test set number from the session ID for content rotation.
    // # Simple hash: sum char codes mod test count gives deterministic rotation.
    const testNum = id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)

    // # Build content for ALL sections so the client can display them.
    const sections = exam.sections.map((section: ExamSection, sectionIndex: number) => {
      const sectionState = session.sectionStates[sectionIndex]
      return {
        id: section.id,
        name: section.name,
        skill: section.skill,
        durationMinutes: section.durationMinutes,
        allowBacktrack: section.allowBacktrack,
        status: sectionState?.status ?? 'locked',
        elapsedMs: sectionState?.elapsedMs ?? 0,
        currentSlotIndex: sectionState?.currentSlotIndex ?? 0,
        slots: section.slots.map((slot, slotIdx) =>
          getSlotContent(slot, section.skill, slotIdx, testNum),
        ),
      }
    })

    return jsonOk({
      examName: exam.name,
      status: session.status,
      activeSectionIndex: session.activeSectionIndex,
      sections,
      responses: session.responses.map(r => ({
        slotId: r.slotId,
        sectionId: r.sectionId,
      })),
    })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/mock-test/sessions/[id]/content]', error)
    return jsonError(500, 'Internal server error')
  }
}
