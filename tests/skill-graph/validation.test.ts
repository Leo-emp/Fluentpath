import { describe, it, expect } from 'vitest'
import { validateGraph } from '@/skill-graph/validation'
import type { SkillNode, SkillEdge } from '@/skill-graph/types'

function node(id: string, level: SkillNode['level'] = 'A1'): SkillNode {
  return { id, type: 'grammar', level, skill: 'general', title: id, description: '', metadata: null }
}

describe('validateGraph', () => {
  it('accepts an empty graph', () => {
    expect(validateGraph([], [])).toEqual({ valid: true, errors: [] })
  })

  it('accepts a valid acyclic graph', () => {
    const nodes = [node('a', 'A1'), node('b', 'A2')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    expect(validateGraph(nodes, edges)).toEqual({ valid: true, errors: [] })
  })

  it('accepts a prerequisite at the same level as its dependent', () => {
    const nodes = [node('a', 'B1'), node('b', 'B1')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'b', strength: 1 }]
    expect(validateGraph(nodes, edges).valid).toBe(true)
  })

  it('rejects a direct cycle', () => {
    const nodes = [node('a'), node('b')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'b', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'a', strength: 1 },
    ]
    const result = validateGraph(nodes, edges)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === 'CYCLE')).toBe(true)
  })

  it('rejects an indirect cycle', () => {
    const nodes = [node('a'), node('b'), node('c')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'b', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'c', strength: 1 },
      { fromNodeId: 'c', toNodeId: 'a', strength: 1 },
    ]
    expect(validateGraph(nodes, edges).errors.some((e) => e.code === 'CYCLE')).toBe(true)
  })

  it('accepts a diamond, which is not a cycle', () => {
    const nodes = [node('a', 'A1'), node('b', 'A2'), node('c', 'A2'), node('d', 'B1')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'b', strength: 1 },
      { fromNodeId: 'a', toNodeId: 'c', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'd', strength: 1 },
      { fromNodeId: 'c', toNodeId: 'd', strength: 1 },
    ]
    expect(validateGraph(nodes, edges).valid).toBe(true)
  })

  it('rejects an edge referencing an unknown node', () => {
    const nodes = [node('a')]
    const edges: SkillEdge[] = [{ fromNodeId: 'a', toNodeId: 'ghost', strength: 1 }]
    const result = validateGraph(nodes, edges)
    expect(result.valid).toBe(false)
    expect(result.errors[0]?.code).toBe('MISSING_NODE')
  })

  it('rejects a prerequisite at a higher level than its dependent', () => {
    const nodes = [node('hard', 'C1'), node('easy', 'A1')]
    const edges: SkillEdge[] = [{ fromNodeId: 'hard', toNodeId: 'easy', strength: 1 }]
    const result = validateGraph(nodes, edges)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === 'LEVEL_INVERSION')).toBe(true)
  })

  it('names the offending nodes in a level inversion', () => {
    const nodes = [node('hard', 'C1'), node('easy', 'A1')]
    const edges: SkillEdge[] = [{ fromNodeId: 'hard', toNodeId: 'easy', strength: 1 }]
    const error = validateGraph(nodes, edges).errors.find((e) => e.code === 'LEVEL_INVERSION')
    expect(error?.nodeIds).toEqual(['hard', 'easy'])
  })

  it('reports every problem, not just the first', () => {
    const nodes = [node('a', 'C1'), node('b', 'A1')]
    const edges: SkillEdge[] = [
      { fromNodeId: 'a', toNodeId: 'b', strength: 1 },
      { fromNodeId: 'b', toNodeId: 'ghost', strength: 1 },
    ]
    const result = validateGraph(nodes, edges)
    expect(result.errors).toHaveLength(2)
  })
})
