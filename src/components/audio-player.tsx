'use client'

// # Audio player component — plays TTS audio for listening exercises.
// # Can either play a pre-generated URL or request on-demand TTS via /api/tts.
// # Shows play/pause button, progress bar, speed control, and play count.

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'

interface AudioPlayerProps {
  // # Pre-generated audio URL (if already available).
  audioUrl?: string
  // # Text to generate TTS for (used when audioUrl is not provided).
  text?: string
  // # Maximum number of plays allowed (for exam simulation). 0 = unlimited.
  maxPlays?: number
  // # Playback speed options to show. Default: [0.75, 1, 1.25].
  speeds?: number[]
  // # Compact mode — smaller for inline use in items.
  compact?: boolean
}

export function AudioPlayer({
  audioUrl: initialUrl,
  text,
  maxPlays = 0,
  speeds = [0.75, 1, 1.25],
  compact = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [url, setUrl] = useState(initialUrl ?? '')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playCount, setPlayCount] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // # Generate TTS audio on demand if no URL provided.
  const ensureAudio = useCallback(async (): Promise<string | null> => {
    if (url) return url
    if (!text) return null

    setLoading(true)
    setError('')
    try {
      const data = await apiFetch<{ audioUrl: string }>('/api/tts', {
        method: 'POST',
        body: JSON.stringify({ text, speed }),
      })
      setUrl(data.audioUrl)
      return data.audioUrl
    } catch {
      setError('Audio unavailable')
      return null
    } finally {
      setLoading(false)
    }
  }, [url, text, speed])

  // # Play/pause toggle.
  const togglePlay = useCallback(async () => {
    // # Check play limit.
    if (maxPlays > 0 && playCount >= maxPlays) return

    if (playing && audioRef.current) {
      audioRef.current.pause()
      setPlaying(false)
      return
    }

    const audioUrl = await ensureAudio()
    if (!audioUrl) return

    // # Create or reuse audio element.
    if (!audioRef.current || audioRef.current.src !== audioUrl) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.playbackRate = speed

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current && audioRef.current.duration) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
        }
      })
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) setDuration(audioRef.current.duration)
      })
      audioRef.current.addEventListener('ended', () => {
        setPlaying(false)
        setProgress(0)
        setPlayCount(c => c + 1)
      })
    }

    audioRef.current.playbackRate = speed
    await audioRef.current.play()
    setPlaying(true)
  }, [playing, ensureAudio, speed, maxPlays, playCount])

  // # Change speed.
  const cycleSpeed = useCallback(() => {
    const idx = speeds.indexOf(speed)
    const next = speeds[(idx + 1) % speeds.length] ?? 1
    setSpeed(next)
    if (audioRef.current) audioRef.current.playbackRate = next
  }, [speed, speeds])

  // # Format seconds to mm:ss.
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const exhausted = maxPlays > 0 && playCount >= maxPlays
  const dim = compact ? 'p-2 gap-2' : 'p-3 gap-3'

  return (
    <div className={`flex items-center rounded-lg border border-border ${dim}`}>
      {/* # Play/pause button */}
      <Button
        variant="outline"
        size={compact ? 'sm' : 'default'}
        onClick={togglePlay}
        disabled={loading || exhausted}
        className="min-w-[60px]"
      >
        {loading ? '...' : playing ? 'Pause' : exhausted ? 'Done' : 'Play'}
      </Button>

      {/* # Progress bar */}
      <div className="relative flex-1">
        <div className="h-1.5 rounded-full bg-muted">
          <div
            className="h-1.5 rounded-full bg-foreground transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        {duration > 0 && !compact && (
          <span className="mt-0.5 block text-xs text-muted-foreground">
            {formatTime((progress / 100) * duration)} / {formatTime(duration)}
          </span>
        )}
      </div>

      {/* # Speed control */}
      <button
        onClick={cycleSpeed}
        className="rounded border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
      >
        {speed}x
      </button>

      {/* # Play count / limit */}
      {maxPlays > 0 && (
        <span className="text-xs text-muted-foreground">
          {playCount}/{maxPlays}
        </span>
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
