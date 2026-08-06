// # Tests for TTS provider using a mock implementation.
// # No real API calls — verifies the interface contract and factory behavior.

import { describe, it, expect } from 'vitest'
import type { TtsProvider, TtsResult, TtsOptions } from '@/tts/types'
import type { StorageProvider } from '@/storage/types'

// # Mock storage that records what was stored.
function createMockStorage(): StorageProvider & { stored: Map<string, Uint8Array> } {
  const stored = new Map<string, Uint8Array>()
  return {
    stored,
    async put(key, data, _contentType) {
      stored.set(key, data instanceof Buffer ? new Uint8Array(data) : data)
      return `https://mock.storage/${key}`
    },
    getUrl(key) {
      return `https://mock.storage/${key}`
    },
    async delete(key) {
      stored.delete(key)
    },
  }
}

// # Mock TTS provider that returns fake audio data.
function createMockTtsProvider(storage: StorageProvider): TtsProvider {
  return {
    async generateSpeech(text, opts) {
      // # Create fake MP3 data (just the text as bytes for testing).
      const audioData = new TextEncoder().encode(`FAKE_AUDIO:${text}`)

      // # Store via the storage provider.
      const key = `tts/mock-${opts.voiceId}.mp3`
      const audioUrl = await storage.put(key, audioData, 'audio/mpeg')

      return {
        audioUrl,
        durationMs: text.length * 80, // # ~80ms per character estimate.
        format: 'mp3',
      }
    },
  }
}

describe('TtsProvider interface', () => {
  it('generates speech and returns a TtsResult', async () => {
    const storage = createMockStorage()
    const tts = createMockTtsProvider(storage)

    const result = await tts.generateSpeech('Hello, world!', {
      voiceId: 'rachel',
      accent: 'en-GB',
      speed: 1.0,
    })

    // # Result should have all required fields.
    expect(result.audioUrl).toContain('https://mock.storage/')
    expect(result.durationMs).toBeGreaterThan(0)
    expect(result.format).toBe('mp3')
  })

  it('stores audio via the storage provider', async () => {
    const storage = createMockStorage()
    const tts = createMockTtsProvider(storage)

    await tts.generateSpeech('Test speech', { voiceId: 'adam' })

    // # Verify something was stored.
    expect(storage.stored.size).toBe(1)
    const storedKey = Array.from(storage.stored.keys())[0]
    expect(storedKey).toContain('tts/')
    expect(storedKey).toContain('.mp3')
  })

  it('includes voice ID in the storage key', async () => {
    const storage = createMockStorage()
    const tts = createMockTtsProvider(storage)

    await tts.generateSpeech('Hello', { voiceId: 'bella' })

    const key = Array.from(storage.stored.keys())[0]
    expect(key).toContain('bella')
  })

  it('estimates duration based on text length', async () => {
    const storage = createMockStorage()
    const tts = createMockTtsProvider(storage)

    const short = await tts.generateSpeech('Hi', { voiceId: 'rachel' })
    const long = await tts.generateSpeech('This is a much longer sentence for testing', {
      voiceId: 'rachel',
    })

    // # Longer text should have longer estimated duration.
    expect(long.durationMs).toBeGreaterThan(short.durationMs)
  })

  it('handles optional TtsOptions fields', async () => {
    const storage = createMockStorage()
    const tts = createMockTtsProvider(storage)

    // # Only voiceId is required — accent and speed are optional.
    const result = await tts.generateSpeech('Test', { voiceId: 'josh' })

    expect(result.audioUrl).toBeTruthy()
    expect(result.format).toBe('mp3')
  })
})
