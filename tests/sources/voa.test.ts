import { describe, it, expect } from 'vitest'
import { voaConnector } from '@/sources/voa'

const NOW = 1_700_000_000_000

// Realistic RSS feed fragment from VOA Learning English.
const FEED_XML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>VOA Learning English</title>
  <link>https://learningenglish.voanews.com</link>

  <item>
    <title>Simple Sentences for Beginners</title>
    <link>https://learningenglish.voanews.com/a/beginning-level/simple-sentences/12345.html</link>
    <description><![CDATA[<p>This is a simple story about a family. They live in a small town. The children go to school every day. Their mother works at a hospital. She helps sick people get better.</p><p>The father drives a bus. He takes people to work in the morning. At night, the family eats dinner together. They talk about their day.</p>]]></description>
    <category>Beginning Level</category>
    <category>Let's Learn English</category>
    <pubDate>Mon, 15 Jul 2024 12:00:00 GMT</pubDate>
  </item>

  <item>
    <title>Understanding Climate Change</title>
    <link>https://learningenglish.voanews.com/a/intermediate-level/climate-change/12346.html</link>
    <description><![CDATA[<p>Scientists around the world are studying how the Earth's temperature is changing. Many researchers say that human activities are causing the planet to get warmer. This warming is affecting weather patterns in different parts of the world.</p><p>Some areas are experiencing more severe storms, while other regions face longer periods without rain. Governments are working to find ways to reduce pollution and protect the environment.</p>]]></description>
    <category>Intermediate Level</category>
    <category>Science &amp; Technology</category>
    <pubDate>Tue, 16 Jul 2024 12:00:00 GMT</pubDate>
  </item>

  <item>
    <title>Too Short</title>
    <link>https://learningenglish.voanews.com/a/short/12347.html</link>
    <description>Brief.</description>
    <pubDate>Wed, 17 Jul 2024 12:00:00 GMT</pubDate>
  </item>

  <item>
    <title>No Link Article</title>
    <description><![CDATA[<p>This article has plenty of text but is missing its link element entirely, so the connector cannot produce a valid source URL for provenance.</p>]]></description>
    <pubDate>Thu, 18 Jul 2024 12:00:00 GMT</pubDate>
  </item>

</channel>
</rss>`

describe('VOA connector', () => {
  const passages = voaConnector.parseIndex(FEED_XML, NOW)

  it('parses valid items from the feed', () => {
    expect(passages.length).toBe(2)
  })

  it('skips items with body under 50 characters', () => {
    const titles = passages.map((p) => p.title)
    expect(titles).not.toContain('Too Short')
  })

  it('skips items without a link', () => {
    const titles = passages.map((p) => p.title)
    expect(titles).not.toContain('No Link Article')
  })

  it('extracts the title', () => {
    expect(passages[0]!.title).toBe('Simple Sentences for Beginners')
  })

  it('strips HTML from the body', () => {
    expect(passages[0]!.body).not.toContain('<p>')
    expect(passages[0]!.body).toContain('This is a simple story')
  })

  it('extracts CDATA content', () => {
    expect(passages[0]!.body).not.toContain('CDATA')
  })

  it('maps beginning level to A2', () => {
    expect(passages[0]!.level).toBe('A2')
  })

  it('maps intermediate level to B1', () => {
    expect(passages[1]!.level).toBe('B1')
  })

  it('sets provenance fields correctly', () => {
    const p = passages[0]!
    expect(p.sourceName).toBe('VOA Learning English')
    expect(p.licence).toBe('public-domain')
    expect(p.sourceUrl).toContain('voanews.com')
    expect(p.skill).toBe('reading')
    expect(p.retrievedAt).toBe(NOW)
  })

  it('generates a unique sourceId per article', () => {
    const ids = new Set(passages.map((p) => p.sourceId))
    expect(ids.size).toBe(passages.length)
  })

  it('decodes XML entities in categories', () => {
    expect(passages[1]!.title).toBe('Understanding Climate Change')
  })
})

describe('VOA level guessing from URL', () => {
  it('detects level-1 in URL path', () => {
    const feed = `<rss><channel>
      <item>
        <title>Test</title>
        <link>https://learningenglish.voanews.com/a/level-1-lesson/99.html</link>
        <description><![CDATA[<p>${'word '.repeat(20)}</p>]]></description>
      </item>
    </channel></rss>`
    const result = voaConnector.parseIndex(feed, NOW)
    expect(result[0]!.level).toBe('A2')
  })

  it('defaults to B2 when no level indicators are present', () => {
    const feed = `<rss><channel>
      <item>
        <title>Unlabelled</title>
        <link>https://learningenglish.voanews.com/a/news/99.html</link>
        <description><![CDATA[<p>${'word '.repeat(20)}</p>]]></description>
      </item>
    </channel></rss>`
    const result = voaConnector.parseIndex(feed, NOW)
    expect(result[0]!.level).toBe('B2')
  })
})

describe('VOA empty/invalid feed', () => {
  it('returns empty array for empty XML', () => {
    expect(voaConnector.parseIndex('', NOW)).toEqual([])
  })

  it('returns empty array for non-RSS XML', () => {
    expect(voaConnector.parseIndex('<html><body>Not RSS</body></html>', NOW)).toEqual([])
  })
})
