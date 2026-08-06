// # TTS provider interface — the seam between content pipeline and speech synthesis.
// # ElevenLabs in production, mock in tests. Same API for both.

export interface TtsOptions {
  // # ElevenLabs voice ID (e.g., 'rachel', '21m00Tcm4TlvDq8ikWAM').
  voiceId: string
  // # Accent/locale hint (e.g., 'en-GB', 'en-US', 'en-AU').
  accent?: string
  // # Speaking speed multiplier (0.5 = half speed, 2.0 = double speed).
  speed?: number
}

export interface TtsResult {
  // # Public URL of the generated audio file.
  audioUrl: string
  // # Duration of the audio in milliseconds.
  durationMs: number
  // # Audio format (e.g., 'mp3', 'wav').
  format: string
}

export interface TtsProvider {
  // # Convert text to speech and store the result.
  // # Returns the URL and metadata of the generated audio.
  generateSpeech(text: string, opts: TtsOptions): Promise<TtsResult>
}
