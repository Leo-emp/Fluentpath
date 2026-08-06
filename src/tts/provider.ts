// # TTS factory — returns ElevenLabs when API key is set, null otherwise.
// # TTS is optional — the app works without audio, just no pronunciation features.

import type { TtsProvider } from './types'
import { createElevenLabsProvider } from './elevenlabs'
import { getStorageProvider } from '@/storage/provider'

// # Singleton — created once and reused.
let _provider: TtsProvider | null = null
let _initialized = false

export function getTtsProvider(): TtsProvider | null {
  if (_initialized) return _provider

  const apiKey = process.env.ELEVENLABS_API_KEY

  if (apiKey) {
    // # ElevenLabs API key present — create TTS provider.
    // # Audio files are stored via the storage provider (R2 or local).
    _provider = createElevenLabsProvider(apiKey, getStorageProvider())
  }

  _initialized = true
  return _provider
}

// # Reset for tests.
export function _resetTtsProvider(): void {
  _provider = null
  _initialized = false
}
