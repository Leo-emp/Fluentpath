// # ElevenLabs TTS implementation — converts text to speech via ElevenLabs API.
// # Audio is stored via the StorageProvider (R2 in prod, local in dev).
// # Uses the v1 text-to-speech endpoint with mp3 output.

import type { StorageProvider } from '@/storage/types'
import type { TtsProvider, TtsOptions, TtsResult } from './types'

// # ElevenLabs API base URL.
const API_BASE = 'https://api.elevenlabs.io/v1'

export function createElevenLabsProvider(
  apiKey: string,
  storage: StorageProvider,
): TtsProvider {
  return {
    async generateSpeech(text, opts) {
      // # Call ElevenLabs text-to-speech endpoint.
      const response = await fetch(
        `${API_BASE}/text-to-speech/${opts.voiceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              // # Speed maps to ElevenLabs' speed parameter (0.5-2.0).
              speed: opts.speed ?? 1.0,
            },
          }),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`)
      }

      // # Read the audio data from the response.
      const audioBuffer = await response.arrayBuffer()
      const audioData = new Uint8Array(audioBuffer)

      // # Generate a unique storage key for this audio file.
      // # Format: tts/{hash}.mp3 where hash is derived from text + voice.
      const hash = simpleHash(`${text}:${opts.voiceId}:${opts.accent ?? ''}:${opts.speed ?? 1}`)
      const key = `tts/${hash}.mp3`

      // # Store the audio file and get its public URL.
      const audioUrl = await storage.put(key, audioData, 'audio/mpeg')

      // # Estimate duration from file size.
      // # MP3 at 128kbps: ~16KB per second of audio.
      const estimatedDurationMs = Math.round((audioData.length / 16000) * 1000)

      return {
        audioUrl,
        durationMs: estimatedDurationMs,
        format: 'mp3',
      }
    },
  }
}

// # Simple string hash — not cryptographic, just for deduplication keys.
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  return Math.abs(hash).toString(36)
}
