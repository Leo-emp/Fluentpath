import { describe, it, expect } from 'vitest'
import { getTask, listTasks } from '@/speaking/tasks'

describe('speaking task definitions', () => {
  it('has tasks for every CEFR level A1 through C2', () => {
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) {
      const tasks = listTasks({ level })
      expect(tasks.length, `no tasks at ${level}`).toBeGreaterThan(0)
    }
  })

  it('has IELTS speaking tasks', () => {
    expect(listTasks({ exam: 'ielts_speaking' }).length).toBeGreaterThan(0)
  })

  it('has PTE speaking tasks', () => {
    expect(listTasks({ exam: 'pte_speaking' }).length).toBeGreaterThan(0)
  })

  it('has OET speaking tasks', () => {
    expect(listTasks({ exam: 'oet_speaking' }).length).toBeGreaterThan(0)
  })

  it('retrieves a task by id', () => {
    const task = getTask('cefr.a1.short_answer.1')
    expect(task).not.toBeNull()
    expect(task!.level).toBe('A1')
  })

  it('returns null for unknown id', () => {
    expect(getTask('nonexistent')).toBeNull()
  })

  it('every task has a non-empty prompt', () => {
    const all = listTasks({})
    for (const task of all) {
      expect(task.prompt.length, `task ${task.id} has empty prompt`).toBeGreaterThan(10)
    }
  })

  it('every task id is unique', () => {
    const all = listTasks({})
    const ids = all.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('IELTS speaking has time limits', () => {
    const tasks = listTasks({ exam: 'ielts_speaking' })
    for (const t of tasks) {
      expect(t.timeLimitSeconds).toBeGreaterThan(0)
    }
  })

  it('time limits increase with level', () => {
    const a1 = listTasks({ level: 'A1' })[0]!
    const c2 = listTasks({ level: 'C2' })[0]!
    expect(c2.timeLimitSeconds).toBeGreaterThanOrEqual(a1.timeLimitSeconds)
  })
})
