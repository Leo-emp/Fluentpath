import { describe, it, expect } from 'vitest'
import { buildConstraints, renderConstraints } from '@/generation/constraints'
import { buildProfilerInventory } from '@/profiler/build-inventory'
import type { SkillNode } from '@/skill-graph/types'

const inventory = buildProfilerInventory()

function node(level: SkillNode['level']): SkillNode {
  return {
    id: 'gram.test.node',
    type: 'grammar',
    level,
    skill: 'general',
    title: 'Test structure',
    description: '',
    metadata: null,
  }
}

describe('vocabulary constraints', () => {
  it('permits far more words at B2 than at A1', () => {
    const a1 = buildConstraints(node('A1'), inventory)
    const b2 = buildConstraints(node('B2'), inventory)
    expect(b2.allowedVocabularySize).toBeGreaterThan(a1.allowedVocabularySize * 3)
  })

  it('permits everything at C2', () => {
    const c2 = buildConstraints(node('C2'), inventory)
    expect(c2.allowedVocabularySize).toBe(inventory.words.size)
  })

  it('caps the sample so the prompt is not mostly a word list', () => {
    const c = buildConstraints(node('B2'), inventory)
    expect(c.allowedVocabulary.length).toBeLessThanOrEqual(250)
    expect(c.allowedVocabularySize).toBeGreaterThan(c.allowedVocabulary.length)
  })

  it('samples across the alphabet rather than taking the first n', () => {
    // The inventory is roughly alphabetical, so slicing would return only
    // words beginning with "a" and convey nothing about the level's range.
    const c = buildConstraints(node('B1'), inventory)
    const initials = new Set(c.allowedVocabulary.map((w) => w[0]))
    expect(initials.size).toBeGreaterThan(10)
  })

  it('names only the level immediately above as discouraged', () => {
    const a1 = buildConstraints(node('A1'), inventory)
    for (const word of a1.discouragedVocabulary) {
      expect(inventory.words.get(word)).toBe('A2')
    }
  })

  it('discourages nothing at C2, since nothing is above it', () => {
    expect(buildConstraints(node('C2'), inventory).discouragedVocabulary).toHaveLength(0)
  })
})

describe('phrase constraints', () => {
  it('forbids an above-level phrase at A1', () => {
    const a1 = buildConstraints(node('A1'), inventory)
    expect(a1.forbiddenPhrases).toContain('give up')
    expect(a1.allowedPhrases).not.toContain('give up')
  })

  it('forbids every above-level phrase, without sampling', () => {
    // These are the one constraint the model cannot infer: "give up" looks
    // easy and is B1. Dropping any of them loses the point of sending them.
    const a1 = buildConstraints(node('A1'), inventory)
    for (const phrase of ['give up', 'carry out', 'look after', 'put off', 'find out']) {
      expect(a1.forbiddenPhrases, `"${phrase}" was not forbidden at A1`).toContain(phrase)
    }
  })

  it('permits a transparent phrase at A1', () => {
    expect(buildConstraints(node('A1'), inventory).allowedPhrases).toContain('go to')
  })

  it('permits an idiomatic phrase once the level reaches it', () => {
    expect(buildConstraints(node('B1'), inventory).allowedPhrases).toContain('give up')
  })

  it('ignores phrases whose level is only an estimate', () => {
    // Forbidding a phrase on a guess would cripple beginner content — the
    // derivation put "go to" at B1 before the curated list corrected it.
    const a1 = buildConstraints(node('A1'), inventory)
    const constrained = new Set([...a1.allowedPhrases, ...a1.forbiddenPhrases])

    for (const phrase of constrained) {
      expect(inventory.phrases.get(phrase)!.confidence).toBeGreaterThanOrEqual(0.8)
    }
  })
})

describe('rendered prompt', () => {
  const text = renderConstraints(buildConstraints(node('A2'), inventory))

  it('names the target and level', () => {
    expect(text).toContain('gram.test.node')
    expect(text).toContain('A2')
  })

  it('states the true vocabulary size, not just the sample', () => {
    const size = buildConstraints(node('A2'), inventory).allowedVocabularySize
    expect(text).toContain(String(size))
  })

  it('demands a misconception on every distractor, with an example', () => {
    expect(text).toContain('mistaken belief')
    expect(text).toContain('uses past simple though the result still matters now')
  })

  it('warns against stems answerable on sight', () => {
    expect(text.toLowerCase()).toContain('time markers')
  })
})
