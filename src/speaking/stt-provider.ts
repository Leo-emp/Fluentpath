/**
 * STT provider interface — the seam between the pipeline and any
 * speech-to-text service.
 *
 * Defined by REQUIREMENT (word timings, confidence, optional phonemes),
 * not by vendor. This means the pipeline is testable with fixtures and
 * swappable between Azure Speech, Google Cloud STT, Whisper, etc.
 * Matches spec §9.5: STT vendor is TBD pending head-to-head evaluation
 * on accented non-native speech.
 */

import type { SttResult } from './types'

export interface SttProvider {
  transcribe(audioRef: string): Promise<SttResult>
}
