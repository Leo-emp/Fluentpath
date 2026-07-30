import nlp from 'compromise'

// Map option text to the tense/form it uses.
//
// This is intentionally shallow — it detects the dominant tense from
// surface patterns rather than doing a full parse. Good enough for
// cross-checking misconceptions, where the question is "does the
// misconception's claimed tense match what the option actually does?"

// Tense labels used both here and when scanning misconception text.
export const TENSE_LABELS = [
  'present_perfect',
  'past_simple',
  'present_continuous',
  'past_continuous',
  'future_will',
  'future_going_to',
  'modal',
  'present_simple',
] as const

export type TenseLabel = (typeof TENSE_LABELS)[number]

// Tense names as they appear in misconception prose (e.g. "uses past
// simple"). The keys are the canonical labels; the values are all the
// natural-language phrases that map to that label.
const MISCONCEPTION_PHRASES: Record<TenseLabel, string[]> = {
  present_perfect: ['present perfect'],
  past_simple: ['past simple', 'simple past'],
  present_continuous: ['present continuous', 'present progressive'],
  past_continuous: ['past continuous', 'past progressive'],
  future_will: ['future simple', 'future will', 'will future'],
  future_going_to: ['going to future', 'future going to'],
  modal: ['modal'],
  present_simple: ['present simple', 'simple present'],
}

// Detect the dominant tense/form from a short text (typically an MCQ
// option like "has lost" or "went").
export function detectTense(text: string): TenseLabel | null {
  const lower = text.toLowerCase().trim()
  const words = lower.split(/\s+/).filter(Boolean)

  if (words.length === 0) return null

  // has/have + word → present_perfect (most specific, check first)
  if (words.some((w, i) => (w === 'has' || w === 'have') && i < words.length - 1)) {
    return 'present_perfect'
  }

  // was/were + -ing → past_continuous
  if (words.some((w, i) => (w === 'was' || w === 'were') && words[i + 1]?.endsWith('ing'))) {
    return 'past_continuous'
  }

  // am/is/are + -ing → present_continuous
  if (words.some((w, i) => (w === 'am' || w === 'is' || w === 'are') && words[i + 1]?.endsWith('ing'))) {
    return 'present_continuous'
  }

  // will + verb → future_will
  if (words.includes('will')) return 'future_will'

  // going to + verb → future_going_to
  if (lower.includes('going to')) return 'future_going_to'

  // modal + verb → modal
  const modals = ['can', 'could', 'should', 'would', 'may', 'might', 'must', 'shall']
  if (words.some((w) => modals.includes(w))) return 'modal'

  // Use compromise for past simple vs present simple on the remaining
  // single-word or short-phrase cases.
  const doc = nlp(text)
  const tags: string[] = doc.json()[0]?.terms?.[0]?.tags ?? []

  if (tags.includes('PastTense')) return 'past_simple'
  if (tags.includes('Verb')) return 'present_simple'

  return null
}

// Scan misconception text for a named tense and return its label.
// Returns null if no tense name is found.
export function extractTenseFromMisconception(misconception: string): TenseLabel | null {
  const lower = misconception.toLowerCase()

  for (const [label, phrases] of Object.entries(MISCONCEPTION_PHRASES)) {
    if (phrases.some((phrase) => lower.includes(phrase))) {
      return label as TenseLabel
    }
  }

  return null
}
