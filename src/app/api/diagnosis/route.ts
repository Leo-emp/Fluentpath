// /api/diagnosis
// GET: list diagnoses for the authenticated learner.
// POST: run diagnosis on a completed test result.

import { type NextRequest } from 'next/server'
import { getDb } from '@/app/api/_lib/db'
import { jsonOk, jsonError } from '@/app/api/_lib/response'
import { ValidationError, AuthError, requireString } from '@/app/api/_lib/validate'
import { getAuthenticatedLearner } from '@/app/api/_lib/auth'
import { checkPlanAccess } from '@/app/api/_lib/plan-gate'
import { findDiagnosesByLearner, createDiagnosis } from '@/db/repositories/diagnoses'
import { findTestResultById } from '@/db/repositories/test-results'
import { findLearnerById } from '@/db/repositories/learners'
import { listNodes, listEdges } from '@/skill-graph/repository'
import { listMastery } from '@/mastery/repository'
import { diagnose } from '@/diagnosis/diagnose'
import { getExamDefinition } from '@/mock-test/exams/registry'
import type { DiagnosisInput } from '@/diagnosis/types'
import type { PerformanceRecord, TestResult } from '@/mock-test/types'

export async function GET(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)
    const db = getDb()
    const rows = await findDiagnosesByLearner(db, learnerId)
    return jsonOk({ diagnoses: rows })
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    console.error('[GET /api/diagnosis]', error)
    return jsonError(500, 'Internal server error')
  }
}

export async function POST(request: NextRequest) {
  try {
    const { learnerId } = await getAuthenticatedLearner(request)

    // # Plan gate — diagnosis requires exam tier or higher.
    const access = await checkPlanAccess(learnerId, 'diagnosis')
    if (!access.allowed) {
      return jsonError(403, access.reason ?? 'Upgrade required')
    }

    const db = getDb()
    const body = (await request.json()) as Record<string, unknown>
    const testResultId = requireString(body, 'testResultId')
    const now = Date.now()

    // Load and verify ownership of the test result.
    const testResult = await findTestResultById(db, testResultId)
    if (!testResult) return jsonError(404, 'Test result not found')
    if (testResult.learnerId !== learnerId) {
      return jsonError(403, 'You do not own this test result')
    }

    // Load all inputs for the diagnosis pipeline.
    const learner = await findLearnerById(db, learnerId)
    const [nodes, edges, masteryRecords] = await Promise.all([
      listNodes(db),
      listEdges(db),
      listMastery(db, learnerId),
    ])

    const examDef = getExamDefinition(testResult.examId)
    if (!examDef) return jsonError(404, 'Exam definition not found')

    // Build the diagnosis input and run the pipeline.
    // The performanceRecord column stores the full TestResult as JSON.
    const storedRecord = testResult.performanceRecord as unknown as PerformanceRecord & TestResult
    const input: DiagnosisInput = {
      performanceRecord: storedRecord,
      testResult: storedRecord,
      examDefinition: examDef,
      nodes,
      edges,
      masteryRecords,
      criterionWeights: {},
      l1: learner?.l1 ?? null,
      now,
    }

    const result = diagnose(input)

    // Persist the diagnosis.
    const row = await createDiagnosis(db, {
      testResultId,
      learnerId,
      gapCount: result.gaps.length,
      topRootCause: result.gaps[0]?.rootCause ?? null,
      totalStudyMinutes: result.actionPlan.totalEstimatedMinutes,
      diagnosis: result as unknown as Record<string, unknown>,
      now,
    })

    return jsonOk({
      diagnosisId: row.id,
      summary: {
        gapCount: result.gaps.length,
        topGaps: result.gaps.slice(0, 5).map((g) => ({
          nodeTitle: g.nodeTitle, rootCause: g.rootCause, accuracy: g.accuracy,
        })),
        totalStudyMinutes: result.actionPlan.totalEstimatedMinutes,
        bandImpacts: result.bandImpacts,
      },
    }, 201)
  } catch (error) {
    if (error instanceof AuthError) return jsonError(401, error.message)
    if (error instanceof ValidationError) return jsonError(400, error.message)
    console.error('[POST /api/diagnosis]', error)
    return jsonError(500, 'Internal server error')
  }
}
