'use client'

// # Voice recorder — records audio via Web Audio API for speaking assessment.
// # Records to webm format, converts to base64, and submits to /api/speaking/assess.

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { apiFetch } from '@/lib/api'

interface VoiceRecorderProps {
  // # The speaking prompt being responded to.
  prompt: string
  // # IELTS speaking part number.
  part: 1 | 2 | 3
  // # Called when assessment is complete.
  onResult?: (result: SpeakingResult) => void
}

// # Public result type for consumers.
export interface SpeakingResult {
  overallBand: number
  criteria: Array<{ criterion: string; band: number; feedback: string }>
  transcript: string
  pronunciationIssues: string[]
  grammarCorrections: string[]
  modelAnswer: string
  topActions: string[]
}

type RecorderState = 'idle' | 'recording' | 'submitting' | 'done' | 'error'

export function VoiceRecorder({ prompt, part, onResult }: VoiceRecorderProps) {
  const [state, setState] = useState<RecorderState>('idle')
  const [result, setResult] = useState<SpeakingResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [seconds, setSeconds] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // # Start recording from the microphone.
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        // # Stop all audio tracks.
        stream.getTracks().forEach(t => t.stop())
        if (timerRef.current) clearInterval(timerRef.current)

        // # Convert recorded chunks to base64.
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const buffer = await blob.arrayBuffer()
        const base64 = btoa(
          new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''),
        )

        // # Submit for assessment.
        setState('submitting')
        try {
          const data = await apiFetch<{ assessment: SpeakingResult }>('/api/speaking/assess', {
            method: 'POST',
            body: JSON.stringify({
              audioBase64: base64,
              mimeType: 'audio/webm',
              prompt,
              part,
            }),
          })
          setResult(data.assessment)
          setState('done')
          onResult?.(data.assessment)
        } catch {
          setState('error')
          setErrorMsg('Assessment failed — try again')
        }
      }

      recorder.start(1000) // # Capture in 1-second chunks.
      mediaRecorderRef.current = recorder
      setSeconds(0)
      setState('recording')

      // # Timer for recording duration display.
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    } catch {
      setState('error')
      setErrorMsg('Microphone access denied')
    }
  }, [prompt, part, onResult])

  // # Stop recording.
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }, [])

  // # Reset to try again.
  const reset = useCallback(() => {
    setState('idle')
    setResult(null)
    setErrorMsg('')
    setSeconds(0)
  }, [])

  // # Format seconds to mm:ss.
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="space-y-4">
      {/* # Recording controls */}
      <div className="flex items-center gap-3">
        {state === 'idle' && (
          <Button onClick={startRecording}>Record Answer</Button>
        )}
        {state === 'recording' && (
          <>
            <Button variant="destructive" onClick={stopRecording}>
              Stop Recording
            </Button>
            <span className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              {formatTime(seconds)}
            </span>
          </>
        )}
        {state === 'submitting' && (
          <span className="text-sm text-muted-foreground">Analysing your response...</span>
        )}
        {(state === 'done' || state === 'error') && (
          <Button variant="outline" onClick={reset}>Try Again</Button>
        )}
      </div>

      {/* # Error */}
      {state === 'error' && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}

      {/* # Assessment results */}
      {result && (
        <Card className="space-y-4 border border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold">Speaking Assessment</h3>
            <span className="rounded-full bg-foreground px-3 py-1 font-serif text-lg font-bold text-background">
              Band {result.overallBand}
            </span>
          </div>

          {/* # Per-criterion scores */}
          <div className="grid gap-2 sm:grid-cols-2">
            {result.criteria.map(c => (
              <div key={c.criterion} className="rounded border border-border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{c.criterion}</span>
                  <span className="font-serif text-sm font-bold">{c.band}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.feedback}</p>
              </div>
            ))}
          </div>

          {/* # Transcript */}
          {result.transcript && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">What you said:</p>
              <p className="mt-1 text-sm italic">{result.transcript}</p>
            </div>
          )}

          {/* # Top actions */}
          {result.topActions.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">Priority improvements:</p>
              <ol className="mt-1 list-inside list-decimal space-y-0.5 text-sm">
                {result.topActions.map((a, i) => <li key={i}>{a}</li>)}
              </ol>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
