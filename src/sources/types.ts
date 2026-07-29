import type { CefrLevel } from '@/skill-graph/types'

// What a source connector produces after fetching and parsing.
// Each entry becomes a provenance row + a lesson draft, so every field
// that the content pipeline needs is required here.

export interface SourcePassage {
  sourceId: string
  title: string
  body: string
  level: CefrLevel
  skill: 'reading' | 'listening'
  sourceUrl: string
  sourceName: string
  licence: string
  attributionText: string
  retrievedAt: number
}

export interface SourceAudio {
  sourceId: string
  title: string
  audioUrl: string
  /** Duration in seconds, when available. */
  durationSec: number | null
  level: CefrLevel | null
  sourceUrl: string
  sourceName: string
  licence: string
  attributionText: string
  retrievedAt: number
}

// A connector returns a list of passages or audio entries. The HTTP
// fetching is the caller's responsibility — connectors receive raw
// response text and parse it. This keeps them testable without network.
export interface PassageConnector {
  parseIndex(feedXml: string, retrievedAt: number): SourcePassage[]
}

export interface AudioConnector {
  parseResponse(json: string, retrievedAt: number): SourceAudio[]
}
