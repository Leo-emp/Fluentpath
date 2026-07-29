import { describe, it, expect } from 'vitest'
import { librivoxConnector } from '@/sources/librivox'

const NOW = 1_700_000_000_000

// Realistic API response from LibriVox.
const API_RESPONSE = JSON.stringify({
  books: [
    {
      id: '127',
      title: 'Pride and Prejudice',
      url_librivox: 'https://librivox.org/pride-and-prejudice-by-jane-austen',
      url_text_source: 'https://www.gutenberg.org/ebooks/1342',
      totaltime: '11:35:03',
      totaltimesecs: 41703,
      sections: [
        {
          id: '1001',
          section_number: '1',
          title: 'Chapter 1',
          listen_url: 'https://www.archive.org/download/pride_and_prejudice_0711/prideandprejudice_01.mp3',
          playtime: '00:12:34',
        },
        {
          id: '1002',
          section_number: '2',
          title: 'Chapter 2',
          listen_url: 'https://www.archive.org/download/pride_and_prejudice_0711/prideandprejudice_02.mp3',
          playtime: '00:08:21',
        },
      ],
    },
    {
      id: '42',
      title: 'The Adventures of Sherlock Holmes',
      url_librivox: 'https://librivox.org/the-adventures-of-sherlock-holmes',
      totaltime: '09:22:00',
      totaltimesecs: 33720,
    },
  ],
})

describe('LibriVox connector', () => {
  const entries = librivoxConnector.parseResponse(API_RESPONSE, NOW)

  it('returns one entry per section when sections exist', () => {
    const pride = entries.filter((e) => e.sourceId.startsWith('librivox:127:'))
    expect(pride).toHaveLength(2)
  })

  it('returns one entry for a book without sections', () => {
    const sherlock = entries.filter((e) => e.sourceId === 'librivox:42')
    expect(sherlock).toHaveLength(1)
  })

  it('formats section titles as "Book — Chapter"', () => {
    expect(entries[0]!.title).toBe('Pride and Prejudice — Chapter 1')
  })

  it('extracts the audio URL', () => {
    expect(entries[0]!.audioUrl).toContain('prideandprejudice_01.mp3')
  })

  it('parses HH:MM:SS duration to seconds', () => {
    expect(entries[0]!.durationSec).toBe(754)
  })

  it('parses book-level duration for section-less books', () => {
    const sherlock = entries.find((e) => e.sourceId === 'librivox:42')!
    expect(sherlock.durationSec).toBe(33720)
  })

  it('sets level to null (profiler determines level later)', () => {
    for (const entry of entries) {
      expect(entry.level).toBeNull()
    }
  })

  it('sets provenance correctly', () => {
    const e = entries[0]!
    expect(e.sourceName).toBe('LibriVox')
    expect(e.licence).toBe('public-domain')
    expect(e.sourceUrl).toContain('librivox.org')
    expect(e.attributionText).toContain('Pride and Prejudice')
    expect(e.retrievedAt).toBe(NOW)
  })

  it('generates unique sourceIds', () => {
    const ids = new Set(entries.map((e) => e.sourceId))
    expect(ids.size).toBe(entries.length)
  })
})

describe('LibriVox edge cases', () => {
  it('returns empty array for invalid JSON', () => {
    expect(librivoxConnector.parseResponse('not json', NOW)).toEqual([])
  })

  it('returns empty array when books is missing', () => {
    expect(librivoxConnector.parseResponse('{}', NOW)).toEqual([])
  })

  it('returns empty array when books is empty', () => {
    expect(librivoxConnector.parseResponse('{"books":[]}', NOW)).toEqual([])
  })

  it('skips sections without a listen_url', () => {
    const data = JSON.stringify({
      books: [
        {
          id: '99',
          title: 'Missing Audio',
          url_librivox: 'https://librivox.org/missing',
          sections: [
            { id: '1', section_number: '1', title: 'Ch 1', listen_url: '' },
            { id: '2', section_number: '2', title: 'Ch 2', listen_url: 'https://example.com/ch2.mp3' },
          ],
        },
      ],
    })
    const entries = librivoxConnector.parseResponse(data, NOW)
    expect(entries).toHaveLength(1)
    expect(entries[0]!.title).toContain('Ch 2')
  })

  it('handles missing playtime gracefully', () => {
    const data = JSON.stringify({
      books: [
        {
          id: '88',
          title: 'No Duration',
          url_librivox: 'https://librivox.org/noduration',
          sections: [
            { id: '1', section_number: '1', title: 'Ch 1', listen_url: 'https://example.com/ch1.mp3' },
          ],
        },
      ],
    })
    const entries = librivoxConnector.parseResponse(data, NOW)
    expect(entries[0]!.durationSec).toBeNull()
  })
})
