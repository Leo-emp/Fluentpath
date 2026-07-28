import { describe, it, expect } from 'vitest'

describe('test harness', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })

  it('resolves the @ path alias', async () => {
    const mod = await import('@/db/schema')
    expect(mod).toBeDefined()
  })
})
