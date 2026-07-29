import type { AudioConnector, SourceAudio } from './types'

// LibriVox API returns JSON with this shape. Only the fields we use are typed.
interface LibriVoxBook {
  id: string
  title: string
  url_librivox: string
  url_text_source?: string
  totaltime?: string
  totaltimesecs?: number
  sections?: LibriVoxSection[]
}

interface LibriVoxSection {
  id: string
  section_number: string
  title: string
  listen_url: string
  playtime?: string
}

interface LibriVoxResponse {
  books?: LibriVoxBook[]
}

// LibriVox content is all public domain (pre-1929 or explicitly released).
// No CEFR level is available from the API — the profiler determines level
// after the text is fetched separately from the text source URL.
function bookToAudio(book: LibriVoxBook, retrievedAt: number): SourceAudio[] {
  const entries: SourceAudio[] = []

  if (book.sections && book.sections.length > 0) {
    for (const section of book.sections) {
      if (!section.listen_url) continue

      entries.push({
        sourceId: `librivox:${book.id}:${section.id}`,
        title: `${book.title} — ${section.title}`,
        audioUrl: section.listen_url,
        durationSec: parseDuration(section.playtime),
        level: null,
        sourceUrl: book.url_librivox ?? '',
        sourceName: 'LibriVox',
        licence: 'public-domain',
        attributionText: `LibriVox recording of "${book.title}" — public domain`,
        retrievedAt,
      })
    }
  } else if (book.url_librivox) {
    entries.push({
      sourceId: `librivox:${book.id}`,
      title: book.title,
      audioUrl: book.url_librivox,
      durationSec: book.totaltimesecs ?? parseDuration(book.totaltime),
      level: null,
      sourceUrl: book.url_librivox,
      sourceName: 'LibriVox',
      licence: 'public-domain',
      attributionText: `LibriVox recording of "${book.title}" — public domain`,
      retrievedAt,
    })
  }

  return entries
}

// Parse "HH:MM:SS" or "MM:SS" to seconds.
function parseDuration(time: string | undefined): number | null {
  if (!time) return null
  const parts = time.split(':').map(Number)
  if (parts.some(isNaN)) return null

  if (parts.length === 3) return parts[0]! * 3600 + parts[1]! * 60 + parts[2]!
  if (parts.length === 2) return parts[0]! * 60 + parts[1]!
  return null
}

export const librivoxConnector: AudioConnector = {
  parseResponse(json: string, retrievedAt: number): SourceAudio[] {
    let data: LibriVoxResponse
    try {
      data = JSON.parse(json)
    } catch {
      return []
    }

    if (!data.books || !Array.isArray(data.books)) return []

    return data.books.flatMap((book) => bookToAudio(book, retrievedAt))
  },
}
