import { retainedMastery } from '@/mastery/decay'
import type { MasteryRecord } from '@/mastery/types'
import { CEFR_LEVELS, levelIndex, type CefrLevel, type SkillArea, type SkillNode } from '@/skill-graph/types'
import { MASTERY_THRESHOLD } from './eligibility'

/**
 * Estimating what CEFR level a learner is at, per skill.
 *
 * Reported per skill and never blended into one number. A learner who reads at
 * B2 and speaks at A2 is completely normal, and a single averaged "B1" would
 * hide the exact thing they most need to see.
 *
 * The hard part is not the arithmetic — it is distinguishing three states that
 * look similar and mean very different things:
 *
 *   1. The learner has not mastered this level yet       → a real ceiling
 *   2. This level has no authored content                → our limitation
 *   3. The learner has mastered everything that exists   → the content ceiling
 *
 * Conflating any two of these produces a dishonest number. Treating an empty
 * level as "covered" promotes beginners to C2. Treating it as "not covered"
 * tells a learner who has finished everything available that they are making
 * no progress. Both have been implemented here; neither was acceptable.
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

  /** Highest level attained, judged only on levels that have content. */
  level: CefrLevel

  /**
   * The next level above `level` that has authored content, or null when
   * nothing exists above it. Null is the honest signal that the learner has
   * run out of material rather than run out of ability.
   */
  nextLevel: CefrLevel | null

  /** Progress through `nextLevel`, 0..1. Zero when `nextLevel` is null. */
  coverage: number

  /** True when the learner has mastered everything authored for this skill. */
  atContentCeiling: boolean

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

  // Each skill gets an entirely independent estimate.
  const bySkill = new Map<SkillArea, SkillNode[]>()
  for (const node of nodes) {
    const list = bySkill.get(node.skill) ?? []
    list.push(node)
    bySkill.set(node.skill, list)
  }

  const estimates: LevelEstimate[] = []

  for (const [skill, skillNodes] of bySkill) {
    // Per level: how many nodes exist, and what share are mastered.
    // `hasContent` is tracked separately from coverage precisely so the two
    // are never confused.
    const hasContent = new Map<CefrLevel, boolean>()
    const coverageByLevel = new Map<CefrLevel, number>()

    for (const level of CEFR_LEVELS) {
      const atLevel = skillNodes.filter((n) => n.level === level)
      hasContent.set(level, atLevel.length > 0)

      if (atLevel.length === 0) {
        coverageByLevel.set(level, 0)
        continue
      }

      const mastered = atLevel.filter((n) => (retainedById.get(n.id) ?? 0) >= MASTERY_THRESHOLD)
      coverageByLevel.set(level, mastered.length / atLevel.length)
    }

    // Walk upward. Empty levels are transparent: they neither promote the
    // learner nor stop the walk, because they carry no evidence either way.
    // Only a level that *has* content and is *not* mastered is a real ceiling.
    let attained: CefrLevel = 'preA1'

    for (const level of CEFR_LEVELS) {
      if (level === 'preA1') continue // Everyone starts here by definition.
      if (!hasContent.get(level)) continue // Nothing to judge — skip, don't credit.

      if ((coverageByLevel.get(level) ?? 0) >= COVERAGE_TO_PROMOTE) {
        attained = level
      } else {
        break // Genuine ceiling: content exists and it is not mastered.
      }
    }

    // The next level the learner can actually work on — skipping any empty
    // levels above them, since those offer nothing to do.
    const nextLevel =
      CEFR_LEVELS.slice(levelIndex(attained) + 1).find((l) => hasContent.get(l)) ?? null

    const coverage = nextLevel ? (coverageByLevel.get(nextLevel) ?? 0) : 0

    // Mean confidence over assessed nodes only. Averaging in untouched nodes
    // as zero would make every estimate look uncertain forever.
    const confidences = skillNodes
      .map((n) => confidenceById.get(n.id))
      .filter((c): c is number => c !== undefined)

    const confidence =
      confidences.length === 0 ? 0 : confidences.reduce((a, b) => a + b, 0) / confidences.length

    estimates.push({
      skill,
      level: attained,
      nextLevel,
      coverage,
      atContentCeiling: nextLevel === null,
      confidence,
    })
  }

  return estimates
}
