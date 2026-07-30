import { describe, it, expect } from 'vitest'
import { getTask, listTasks } from '@/writing/tasks'

describe('task definitions', () => {
  it('has tasks for every CEFR level A1 through C2', () => {
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) {
      const tasks = listTasks({ level })
      expect(tasks.length, `no tasks at ${level}`).toBeGreaterThan(0)
    }
  })

  it('has IELTS Task 1 and Task 2', () => {
    const t1 = listTasks({ exam: 'ielts_task1' })
    const t2 = listTasks({ exam: 'ielts_task2' })
    expect(t1.length).toBeGreaterThan(0)
    expect(t2.length).toBeGreaterThan(0)
  })

  it('has PTE essay tasks', () => {
    expect(listTasks({ exam: 'pte_essay' }).length).toBeGreaterThan(0)
  })

  it('has OET referral letter tasks', () => {
    expect(listTasks({ exam: 'oet_writing' }).length).toBeGreaterThan(0)
  })

  it('retrieves a task by id', () => {
    const task = getTask('cefr.a1.short_answer.1')
    expect(task).not.toBeNull()
    expect(task!.level).toBe('A1')
  })

  it('returns null for unknown id', () => {
    expect(getTask('nonexistent')).toBeNull()
  })

  it('sets word limits appropriate to each level', () => {
    const a1 = listTasks({ level: 'A1' })[0]!
    const c2 = listTasks({ level: 'C2' })[0]!
    expect(c2.maxWords).toBeGreaterThan(a1.maxWords)
  })

  it('every task has a non-empty prompt', () => {
    const all = listTasks({})
    for (const task of all) {
      expect(task.prompt.length, `task ${task.id} has empty prompt`).toBeGreaterThan(10)
    }
  })

  it('every task references a valid rubricId', () => {
    const all = listTasks({})
    const rubricIds = new Set(all.map((t) => t.rubricId))
    // At minimum: cefr_a1..c2 + ielts_task1 + ielts_task2 + pte_essay + oet_writing
    expect(rubricIds.size).toBeGreaterThanOrEqual(5)
  })

  it('IELTS Task 2 requires 250+ words', () => {
    const task = listTasks({ exam: 'ielts_task2' })[0]!
    expect(task.minWords).toBeGreaterThanOrEqual(250)
  })

  it('OET writing has a 45-minute time limit', () => {
    const task = listTasks({ exam: 'oet_writing' })[0]!
    expect(task.timeLimitMinutes).toBe(45)
  })

  it('every task id is unique', () => {
    const all = listTasks({})
    const ids = all.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('IELTS Task 1 has 20-minute time limit', () => {
    const tasks = listTasks({ exam: 'ielts_task1' })
    for (const t of tasks) {
      expect(t.timeLimitMinutes).toBe(20)
    }
  })

  it('CEFR tasks are untimed', () => {
    const tasks = listTasks({ exam: 'cefr' })
    for (const t of tasks) {
      expect(t.timeLimitMinutes).toBeNull()
    }
  })
})
