import type { CefrLevel } from '@/skill-graph/types'
import type { PassageConnector, SourcePassage } from './types'

// VOA Learning English levels map to CEFR as follows:
// "Beginning Level" / Level 1 → A1-A2
// "Intermediate Level" / Level 2 → B1-B2
// No explicit Level 3 exists; anything unlabelled is treated as B2+.
const LEVEL_MAP: Record<string, CefrLevel> = {
  '1': 'A2',
  '2': 'B1',
  'beginning': 'A2',
  'intermediate': 'B1',
  'advanced': 'B2',
}

// Extract text content from an XML element by tag name.
// This is a minimal XML parser — VOA's RSS is simple enough that a
// full DOM parser is unnecessary weight.
function extractTag(xml: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi')
  const results: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(xml)) !== null) {
    results.push(decodeXmlEntities(match[1]!.trim()))
  }
  return results
}

// Extract content from CDATA sections.
function extractCdata(text: string): string {
  const match = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  return match ? match[1]!.trim() : text
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
}

// Strip HTML tags from a string, preserving paragraph breaks.
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// Guess the VOA level from the RSS feed URL or category tags.
function guessLevel(url: string, categories: string[]): CefrLevel {
  const urlLower = url.toLowerCase()
  if (urlLower.includes('beginning') || urlLower.includes('level-1')) return 'A2'
  if (urlLower.includes('intermediate') || urlLower.includes('level-2')) return 'B1'
  if (urlLower.includes('advanced')) return 'B2'

  for (const cat of categories) {
    const lower = cat.toLowerCase()
    for (const [key, level] of Object.entries(LEVEL_MAP)) {
      if (lower.includes(key)) return level
    }
  }

  return 'B2'
}

// Parse a single RSS <item> block into a SourcePassage.
function parseItem(
  itemXml: string,
  feedUrl: string,
  retrievedAt: number,
): SourcePassage | null {
  const titles = extractTag(itemXml, 'title')
  const links = extractTag(itemXml, 'link')
  const descriptions = extractTag(itemXml, 'description')
  const categories = extractTag(itemXml, 'category')

  const title = titles[0]
  const link = links[0]
  const rawDescription = descriptions[0]

  if (!title || !link) return null

  const body = rawDescription ? stripHtml(extractCdata(rawDescription)) : ''
  if (body.length < 50) return null

  const level = guessLevel(link, categories)

  return {
    sourceId: `voa:${encodeURIComponent(link)}`,
    title,
    body,
    level,
    skill: 'reading',
    sourceUrl: link,
    sourceName: 'VOA Learning English',
    licence: 'public-domain',
    attributionText: 'Voice of America (VOA) Learning English — U.S. government work, public domain',
    retrievedAt,
  }
}

export const voaConnector: PassageConnector = {
  parseIndex(feedXml: string, retrievedAt: number): SourcePassage[] {
    // Split on <item> tags to get individual entries.
    const items = feedXml.split(/<item[\s>]/).slice(1)
    const passages: SourcePassage[] = []

    for (const itemBlock of items) {
      const closed = itemBlock.split('</item>')[0] ?? ''
      const passage = parseItem(closed, feedXml, retrievedAt)
      if (passage) passages.push(passage)
    }

    return passages
  },
}
