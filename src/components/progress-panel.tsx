'use client'

// # Progress panel — shows skill breakdown and predicted IELTS band score.
// # Displays a bar chart of per-skill mastery + predicted bands.
// # Used on the dashboard below the gamification section.

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { apiFetch } from '@/lib/api'

// # ═══════════════════════════════════════════════════════════════════
// # TYPES
// # ═══════════════════════════════════════════════════════════════════

interface SkillPrediction {
  skill: string
  mastery: number
  predictedBand: number
  level: string
  nodeCount: number
}

interface ScorePrediction {
  overallBand: number
  skills: SkillPrediction[]
  confidence: 'low' | 'medium' | 'high'
  totalNodes: number
  masteredNodes: number
}

// # ═══════════════════════════════════════════════════════════════════
// # COMPONENT
// # ═══════════════════════════════════════════════════════════════════

export function ProgressPanel() {
  const [prediction, setPrediction] = useState<ScorePrediction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch<{ prediction: ScorePrediction }>('/api/progress')
      .then(d => setPrediction(d.prediction))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card className="border border-border p-4">
        <div className="h-32 animate-pulse rounded bg-muted" />
      </Card>
    )
  }

  if (!prediction || prediction.totalNodes === 0) return null

  const skillLabels: Record<string, string> = {
    reading: 'Reading',
    writing: 'Writing',
    speaking: 'Speaking',
    listening: 'Listening',
  }

  return (
    <Card className="border border-border p-4">
      {/* # Predicted overall band */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-sm font-bold">Predicted IELTS Score</h3>
          <p className="text-xs text-muted-foreground">
            Based on {prediction.totalNodes} skills practiced
            ({prediction.confidence} confidence)
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-foreground">
          <span className="font-serif text-xl font-bold">{prediction.overallBand}</span>
        </div>
      </div>

      {/* # Per-skill breakdown bars */}
      <div className="space-y-3">
        {prediction.skills.map(skill => (
          <div key={skill.skill}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">
                {skillLabels[skill.skill] ?? skill.skill}
              </span>
              <span className="text-sm font-bold">
                {skill.nodeCount > 0 ? `Band ${skill.predictedBand}` : '--'}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-foreground transition-all duration-500"
                style={{ width: `${Math.round(skill.mastery * 100)}%` }}
              />
            </div>
            <div className="mt-0.5 flex justify-between text-xs text-muted-foreground">
              <span>{skill.level}</span>
              <span>{Math.round(skill.mastery * 100)}% mastery</span>
            </div>
          </div>
        ))}
      </div>

      {/* # Mastered nodes count */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span>{prediction.masteredNodes} skills mastered</span>
        <span>{prediction.totalNodes} total practiced</span>
      </div>
    </Card>
  )
}
