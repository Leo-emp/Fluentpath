/**
 * Writing feature extraction — deterministic text analysis computed
 * BEFORE the LLM scores, mirroring the speaking pipeline pattern.
 *
 * These features are injected into the scoring prompt so the LLM has
 * objective measurements in front of it and cannot contradict them.
 */

import type { ProfilerInventory } from '@/profiler/profile'
import type { CefrLevel } from '@/skill-graph/types'
import { profileText } from '@/profiler/profile'

// ─── Types ───────────────────────────────────────────────────────────────

export interface WritingFeatures {
  wordCount: number
  sentenceCount: number
  meanSentenceLength: number
  // Vocabulary level profile from the profiler — what % of words are
  // at each CEFR level.
  vocabularyLevelProfile: Record<string, number>
  // Type-token ratio: unique words / total words. Higher = more varied.
  typeTokenRatio: number
  // Error density signals (detected deterministically).
  missingArticleCount: number
  subjectVerbErrors: number
  // Overall counts for the LLM to cross-check.
  paragraphCount: number
}

// ─── Extraction ─────────────────────────────────────────────────────────

// Simple sentence splitter — splits on . ! ? followed by space or end.
function splitSentences(text: string): string[] {
  return text
    .split(/[.!?]+(?:\s|$)/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
}

// Count paragraphs (blocks separated by blank lines or double newlines).
function countParagraphs(text: string): number {
  return text
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0).length || 1
}

// Detect missing articles before common noun patterns.
// Catches "I went to ___ store" but not proper nouns or uncountable.
const MISSING_ARTICLE_PATTERN = /\b(go|went|visit|buy|see|saw|at|in|on|to|from|with)\s+(?!a\b|an\b|the\b|my\b|his\b|her\b|our\b|their\b|this\b|that\b|some\b|any\b|no\b|every\b)([a-z]+(?:ing|tion|ment|ness|er|or|ist|ity|ence|ance|ture)\b)/gi

// Detect simple subject-verb agreement errors.
const SV_ERROR_PATTERNS = [
  /\b(he|she|it)\s+(have|are|were|do)\b/gi,
  /\b(they|we|you)\s+(has|is|was|does)\b/gi,
  /\b(I)\s+(has|is|does)\b/gi,
]

/**
 * Extract deterministic writing features from learner text.
 *
 * Pure computation — no LLM calls. Results are facts the scoring
 * prompt can reference.
 */
export function extractWritingFeatures(
  text: string,
  inventory: ProfilerInventory,
  _level: CefrLevel,
): WritingFeatures {
  const words = text.split(/\s+/).filter(w => w.length > 0)
  const wordCount = words.length
  const sentences = splitSentences(text)
  const sentenceCount = Math.max(sentences.length, 1)
  const meanSentenceLength = Math.round((wordCount / sentenceCount) * 10) / 10

  // Vocabulary level profile via the profiler.
  const profile = profileText(text, inventory)
  const vocabularyLevelProfile: Record<string, number> = {}
  if (profile.matched > 0) {
    for (const [level, count] of Object.entries(profile.counts)) {
      if (count > 0) {
        vocabularyLevelProfile[level] = Math.round((count / profile.matched) * 100) / 100
      }
    }
  }

  // Type-token ratio.
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z']/g, '')))
  const typeTokenRatio = wordCount > 0
    ? Math.round((uniqueWords.size / wordCount) * 100) / 100
    : 0

  // Missing article detection.
  const articleMatches = text.match(MISSING_ARTICLE_PATTERN)
  const missingArticleCount = articleMatches ? articleMatches.length : 0

  // Subject-verb agreement errors.
  let subjectVerbErrors = 0
  for (const pattern of SV_ERROR_PATTERNS) {
    const matches = text.match(pattern)
    if (matches) subjectVerbErrors += matches.length
  }

  return {
    wordCount,
    sentenceCount,
    meanSentenceLength,
    vocabularyLevelProfile,
    typeTokenRatio,
    missingArticleCount,
    subjectVerbErrors,
    paragraphCount: countParagraphs(text),
  }
}
