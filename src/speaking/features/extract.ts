/**
 * Feature extraction orchestrator — calls all four extractors and
 * returns a single SpeechFeatures object.
 *
 * This is the entry point for the scoring pipeline. It takes an
 * SttResult and the profiler inventory, and returns everything the
 * LLM scoring prompt needs as computed, deterministic facts.
 */

import type { ProfilerInventory } from '@/profiler/profile'
import type { SttResult, SpeechFeatures } from '../types'
import { extractFluency } from './fluency'
import { extractLexical } from './lexical'
import { extractGrammar } from './grammar'
import { extractPronunciation } from './pronunciation'

/**
 * Extract all four feature groups from STT output.
 *
 * Each extractor is pure and deterministic — same input always produces
 * same output. The LLM receives these features in the scoring prompt
 * and is instructed not to override or contradict them.
 */
export function extractAllFeatures(
  stt: SttResult,
  inventory: ProfilerInventory,
): SpeechFeatures {
  return {
    fluency: extractFluency(stt),
    lexical: extractLexical(stt, inventory),
    grammar: extractGrammar(stt),
    pronunciation: extractPronunciation(stt),
  }
}
