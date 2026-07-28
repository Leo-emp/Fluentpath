import { levelIndex, type SkillEdge, type SkillNode } from './types'

/**
 * Structural validation of the skill graph.
 *
 * This runs before any graph is written to the database. A malformed graph is
 * a content bug, not a runtime condition — a cycle would mean "A requires B
 * requires A", which no learner could ever enter, and it would make the
 * sequencer silently skip that whole region of the graph forever.
 *
 * Pure function: no database, no clock, no I/O. Easy to test exhaustively.
 */

export interface GraphError {
  code: 'CYCLE' | 'MISSING_NODE' | 'LEVEL_INVERSION'
  message: string
  nodeIds: string[]
}

export interface GraphValidationResult {
  valid: boolean
  errors: GraphError[]
}

export function validateGraph(nodes: SkillNode[], edges: SkillEdge[]): GraphValidationResult {
  const errors: GraphError[] = []
  const byId = new Map(nodes.map((n) => [n.id, n]))

  // --- Pass 1: every edge endpoint must exist, and levels must not invert ---
  //
  // Edges with a missing endpoint are collected out, so the cycle check below
  // only walks edges we can actually resolve.
  const resolvedEdges: SkillEdge[] = []

  for (const edge of edges) {
    const from = byId.get(edge.fromNodeId)
    const to = byId.get(edge.toNodeId)

    if (!from || !to) {
      const missing = !from ? edge.fromNodeId : edge.toNodeId
      errors.push({
        code: 'MISSING_NODE',
        message: `Edge references unknown node "${missing}".`,
        nodeIds: [edge.fromNodeId, edge.toNodeId],
      })
      continue
    }

    // A prerequisite may sit at the same level as its dependent — plenty of
    // B1 grammar depends on other B1 grammar. What it may never do is sit
    // *above* it, which would mean you need C1 knowledge to attempt an A1
    // task. That is always an authoring mistake.
    if (levelIndex(from.level) > levelIndex(to.level)) {
      errors.push({
        code: 'LEVEL_INVERSION',
        message: `Prerequisite "${from.id}" (${from.level}) is above dependent "${to.id}" (${to.level}).`,
        nodeIds: [from.id, to.id],
      })
    }

    resolvedEdges.push(edge)
  }

  // --- Pass 2: cycle detection by depth-first search ---
  //
  // Standard three-colour DFS. Each node is unvisited, in-progress (on the
  // current path), or done. Reaching an in-progress node means we have looped
  // back onto our own path, which is a cycle.

  const adjacency = new Map<string, string[]>()
  for (const edge of resolvedEdges) {
    const list = adjacency.get(edge.fromNodeId) ?? []
    list.push(edge.toNodeId)
    adjacency.set(edge.fromNodeId, list)
  }

  const UNVISITED = 0
  const IN_PROGRESS = 1
  const DONE = 2

  const state = new Map<string, number>()
  for (const n of nodes) state.set(n.id, UNVISITED)

  // `path` holds the nodes on the current DFS branch, so a detected cycle can
  // be reported as the actual loop rather than just "there is a cycle".
  const path: string[] = []

  function visit(id: string): void {
    state.set(id, IN_PROGRESS)
    path.push(id)

    for (const next of adjacency.get(id) ?? []) {
      const nextState = state.get(next) ?? UNVISITED

      if (nextState === IN_PROGRESS) {
        // `next` is already on our current path — slice from where it first
        // appears to show the loop, e.g. "b -> c -> a -> b".
        const loopStart = path.indexOf(next)
        errors.push({
          code: 'CYCLE',
          message: `Cycle detected: ${[...path.slice(loopStart), next].join(' -> ')}`,
          nodeIds: path.slice(loopStart),
        })
      } else if (nextState === UNVISITED) {
        visit(next)
      }
      // DONE means already fully explored via another branch — a diamond, not
      // a cycle. Nothing to do.
    }

    path.pop()
    state.set(id, DONE)
  }

  for (const n of nodes) {
    if (state.get(n.id) === UNVISITED) visit(n.id)
  }

  return { valid: errors.length === 0, errors }
}
