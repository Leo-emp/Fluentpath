import { retainedMastery } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'
import { CEFR_LEVELS, levelIndex, type CefrLevel, type SkillArea, type SkillNode } from '@/skill-graph/types'
import { MASTERY_THRESHOLD } from './eligibility'

/**
 * Estimating what CEFR level a learner is at, per skill.
 *
 * Reported per skill and never blended into one number. A learner who reads at
 * B2 and speaks at A2 is completely normal, and a single averaged "B1" would
 * hide the exact thing they most need to see. The dashboard depends on this
 * distinction.
 */

/**
 * Share of a level's nodes that must be mastered to count as being at it.
 *
 * Not 100%, because content coverage is uneven and a learner should not be
 * held at A2 forever by three obscure nodes. Not much lower either, or the
 * estimate stops meaning anything.
 */
const COVERAGE_TO_PROMOTE = 0.8

export interface LevelEstimate {
  skill: SkillArea
  /** The highest level fully attained. */
  level: CefrLevel
  /** Progress through the level immediately above `level`, 0..1. */
  coverage: number
  /** Mean confidence across this skill's assessed nodes, 0..1. */
  confidence: number
}

export function estimateLevels(
  nodes: SkillNode[],
  mastery: MasteryRecord[],
  now: number,
): LevelEstimate[] {
  const retainedById = new Map<string, number>()
  const confidenceById = new Map<string, number>()

  for (const record of mastery) {
    retainedById.set(record.nodeId, retainedMastery(record, now))
    confidenceById.set(record.nodeId, record.confidence)
  }

  // Group nodes by skill — each skill gets its own independent estimate.
  const bySkill = new Map<SkillArea, SkillNode[]>()
  for (const node of nodes) {
    const list = bySkill.get(node.skill) ?? []
    list.push(node)
    bySkill.set(node.skill, list)
  }

  const estimates: LevelEstimate[] = []

  for (const [skill, skillNodes] of bySkill) {
    // How much of each level this learner has mastered.
    const coverageByLevel = new Map<CefrLevel, number>()

    for (const level of CEFR_LEVELS) {
      const atLevel = skillNodes.filter((n) => n.level === level)

      if (atLevel.length === 0) {
        // No content authored at this level, so there is no evidence either
        // way. Coverage 0 stops the walk below, which means a learner is never
        // credited with a level we cannot actually assess.
        //
        // The alternative — treating an empty level as covered — promotes a
        // learner straight through every unauthored level above them. During
        // early releases, when only the lower levels exist, that would put
        // an A1 learner at C2.
        coverageByLevel.set(level, 0)
        continue
      }

      const mastered = atLevel.filter((n) => (retainedById.get(n.id) ?? 0) >= MASTERY_THRESHOLD)
      coverageByLevel.set(level, mastered.length / atLevel.length)
    }

    // Walk upward from A1 and stop at the first level not covered. Levels are
    // cumulative: mastering B1 content while A1 is full of gaps does not make
    // someone B1, it makes them a preA1 learner with patchy knowledge.
    let attained: CefrLevel = 'preA1'
    for (const level of CEFR_LEVELS) {
      if (level === 'preA1') continue // Everyone starts here by definition.

      if ((coverageByLevel.get(level) ?? 0) >= COVERAGE_TO_PROMOTE) {
        attained = level
      } else {
        break
      }
    }

    // Progress toward the next level, which is what the dashboard shows as
    // "how far to go".
    const nextLevel = CEFR_LEVELS[levelIndex(attained) + 1]
    const coverage = nextLevel ? (coverageByLevel.get(nextLevel) ?? 0) : 1

    // Mean confidence over assessed nodes only — averaging in untouched nodes
    // as zero would make every estimate look uncertain forever.
    const confidences = skillNodes
      .map((n) => confidenceById.get(n.id))
      .filter((c): c is number => c !== undefined)

    const confidence =
      confidences.length === 0 ? 0 : confidences.reduce((a, b) => a + b, 0) / confidences.length

    estimates.push({ skill, level: attained, coverage, confidence })
  }

  return estimates
}
