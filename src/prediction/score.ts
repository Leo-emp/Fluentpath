// # Predicted IELTS band score algorithm.
// # Uses mastery data across the 4 skills to estimate what the learner
// # would score if they took the real test today.
// #
// # The mapping is: mastery (0-1) → CEFR level → IELTS band.
// # Each skill contributes independently, and the overall is the average
// # rounded to the nearest 0.5 (matching real IELTS scoring).

// # ═══════════════════════════════════════════════════════════════════
// # TYPES
// # ═══════════════════════════════════════════════════════════════════

export interface SkillPrediction {
  skill: string
  mastery: number        // # 0-1 average across nodes for this skill
  predictedBand: number  // # IELTS band (0-9 in 0.5 steps)
  level: string          // # Estimated CEFR level
  nodeCount: number      // # How many nodes contributed
}

export interface ScorePrediction {
  overallBand: number
  skills: SkillPrediction[]
  confidence: 'low' | 'medium' | 'high'
  totalNodes: number
  masteredNodes: number  // # mastery >= 0.7
}

// # ═══════════════════════════════════════════════════════════════════
// # MASTERY → IELTS BAND MAPPING
// # ═══════════════════════════════════════════════════════════════════

// # Mastery thresholds for CEFR levels and their typical IELTS band equivalents:
// # A1 (0.0-0.15) → 1.0-2.5 | A2 (0.15-0.30) → 3.0-3.5
// # B1 (0.30-0.50) → 4.0-5.0 | B2 (0.50-0.70) → 5.5-6.5
// # C1 (0.70-0.85) → 7.0-7.5 | C2 (0.85-1.0)  → 8.0-9.0

function masteryToBand(mastery: number): number {
  // # Linear interpolation across the CEFR→band scale.
  // # Clamp to valid range.
  const m = Math.max(0, Math.min(1, mastery))

  // # Piecewise linear: maps mastery to band.
  let band: number
  if (m < 0.15) {
    band = 1 + (m / 0.15) * 1.5           // # 1.0 → 2.5
  } else if (m < 0.30) {
    band = 2.5 + ((m - 0.15) / 0.15) * 1  // # 2.5 → 3.5
  } else if (m < 0.50) {
    band = 3.5 + ((m - 0.30) / 0.20) * 1.5 // # 3.5 → 5.0
  } else if (m < 0.70) {
    band = 5.0 + ((m - 0.50) / 0.20) * 1.5 // # 5.0 → 6.5
  } else if (m < 0.85) {
    band = 6.5 + ((m - 0.70) / 0.15) * 1   // # 6.5 → 7.5
  } else {
    band = 7.5 + ((m - 0.85) / 0.15) * 1.5 // # 7.5 → 9.0
  }

  // # Round to nearest 0.5.
  return Math.round(band * 2) / 2
}

function masteryToLevel(mastery: number): string {
  if (mastery < 0.15) return 'A1'
  if (mastery < 0.30) return 'A2'
  if (mastery < 0.50) return 'B1'
  if (mastery < 0.70) return 'B2'
  if (mastery < 0.85) return 'C1'
  return 'C2'
}

// # ═══════════════════════════════════════════════════════════════════
// # PREDICTION ENGINE
// # ═══════════════════════════════════════════════════════════════════

interface MasteryNode {
  nodeId: string
  mastery: number
  confidence: number
  exposures: number
}

interface SkillGraphNode {
  id: string
  skill: string
}

export function predictScore(
  masteryRecords: MasteryNode[],
  graphNodes: SkillGraphNode[],
): ScorePrediction {
  // # Build a map from nodeId → skill.
  const nodeSkillMap = new Map(graphNodes.map(n => [n.id, n.skill]))

  // # Group mastery records by skill.
  const skillGroups = new Map<string, MasteryNode[]>()
  for (const record of masteryRecords) {
    const skill = nodeSkillMap.get(record.nodeId) ?? 'general'
    const group = skillGroups.get(skill) ?? []
    group.push(record)
    skillGroups.set(skill, group)
  }

  // # Compute per-skill predictions.
  const targetSkills = ['reading', 'writing', 'speaking', 'listening']
  const skills: SkillPrediction[] = targetSkills.map(skill => {
    const records = skillGroups.get(skill) ?? []
    // # Also include 'general' nodes as they contribute to all skills.
    const generalRecords = skillGroups.get('general') ?? []
    const allRecords = [...records, ...generalRecords]

    if (allRecords.length === 0) {
      return { skill, mastery: 0, predictedBand: 0, level: 'A1', nodeCount: 0 }
    }

    // # Weighted average — nodes with more exposures count more.
    const totalWeight = allRecords.reduce((s, r) => s + Math.max(1, r.exposures), 0)
    const weightedMastery = allRecords.reduce(
      (s, r) => s + r.mastery * Math.max(1, r.exposures),
      0,
    ) / totalWeight

    return {
      skill,
      mastery: Math.round(weightedMastery * 100) / 100,
      predictedBand: masteryToBand(weightedMastery),
      level: masteryToLevel(weightedMastery),
      nodeCount: allRecords.length,
    }
  })

  // # Overall = average of skill bands (IELTS calculation).
  const skillsWithData = skills.filter(s => s.nodeCount > 0)
  const overallBand = skillsWithData.length > 0
    ? Math.round((skillsWithData.reduce((s, sk) => s + sk.predictedBand, 0) / skillsWithData.length) * 2) / 2
    : 0

  // # Confidence based on data coverage.
  const totalNodes = masteryRecords.length
  const masteredNodes = masteryRecords.filter(r => r.mastery >= 0.7).length
  const confidence: 'low' | 'medium' | 'high' =
    totalNodes < 10 ? 'low' : totalNodes < 30 ? 'medium' : 'high'

  return {
    overallBand,
    skills,
    confidence,
    totalNodes,
    masteredNodes,
  }
}

// # Export for testing.
export { masteryToBand, masteryToLevel }
