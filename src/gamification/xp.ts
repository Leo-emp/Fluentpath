// # XP calculation — determines how many experience points an action earns.
// # XP values are tuned to feel rewarding without inflating too fast.
// # Completing 10 items/day should yield roughly 50-100 XP.

// # Base XP for completing a single item, by item type.
// # Writing and speaking earn more because they require more effort.
const ITEM_XP: Record<string, number> = {
  mcq: 5,
  gap_fill: 5,
  error_correction: 5,
  word_formation: 5,
  highlight_incorrect: 5,
  sentence_transform: 8,
  matching: 6,
  reorder: 7,
  dialogue_completion: 6,
  reading_passage: 10,
  writing_task: 15,
  speaking_prompt: 12,
}

// # XP awarded for completing a full session.
export const SESSION_COMPLETE_XP = 20

// # XP awarded for completing a full mock test.
export const MOCK_TEST_COMPLETE_XP = 50

// # Bonus XP for a perfect session (100% correct).
export const PERFECT_SESSION_BONUS = 25

// # Bonus XP for maintaining a streak (awarded once per day).
// # Increases with streak length to reward consistency.
export function streakBonusXp(currentStreak: number): number {
  // # Day 1-2: no bonus (just starting)
  // # Day 3-6: +5 XP bonus
  // # Day 7-13: +10 XP bonus
  // # Day 14-29: +15 XP bonus
  // # Day 30+: +25 XP bonus
  if (currentStreak < 3) return 0
  if (currentStreak < 7) return 5
  if (currentStreak < 14) return 10
  if (currentStreak < 30) return 15
  return 25
}

// # Calculate XP for completing a single item.
// # Correct answers earn full XP; incorrect answers earn 1 XP (participation).
export function itemXp(itemType: string, correct: boolean): number {
  const base = ITEM_XP[itemType] ?? 5
  return correct ? base : 1
}
