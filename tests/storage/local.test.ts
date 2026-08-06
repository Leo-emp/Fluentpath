// # Tests for local filesystem storage provider.
// # Verifies put/getUrl/delete operations with temporary directories.

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createLocalProvider } from '@/storage/local'
import { mkdtemp, readFile, rm, stat } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

describe('LocalStorageProvider', () => {
  let tempDir: string
  let provider: ReturnType<typeof createLocalProvider>

  beforeEach(async () => {
    // # Create a fresh temp directory for each test.
    tempDir = await mkdtemp(join(tmpdir(), 'fluentpath-storage-test-'))
    provider = createLocalProvider(tempDir)
  })

  afterEach(async () => {
    // # Clean up the temp directory after each test.
    await rm(tempDir, { recursive: true, force: true })
  })

  it('puts a file and returns its URL', async () => {
    const data = Buffer.from('hello world')
    const url = await provider.put('test/file.txt', data, 'text/plain')

    // # URL should point to the file in the temp directory.
    expect(url).toContain(tempDir)
    // # On Windows, path.join uses backslashes, so check for the filename only.
    expect(url).toContain('file.txt')
    expect(url.startsWith('file://')).toBe(true)
  })

  it('stores the correct file content', async () => {
    const content = 'audio data here'
    const data = Buffer.from(content)
    await provider.put('audio/clip.mp3', data, 'audio/mpeg')

    // # Read the file back and verify content.
    const stored = await readFile(join(tempDir, 'audio/clip.mp3'), 'utf-8')
    expect(stored).toBe(content)
  })

  it('creates nested directories automatically', async () => {
    const data = Buffer.from('nested')
    await provider.put('deep/nested/path/file.txt', data, 'text/plain')

    // # File should exist at the nested path.
    const stored = await readFile(join(tempDir, 'deep/nested/path/file.txt'), 'utf-8')
    expect(stored).toBe('nested')
  })

  it('returns correct URL from getUrl', () => {
    const url = provider.getUrl('tts/abc123.mp3')
    expect(url).toContain(tempDir)
    // # On Windows, path.join converts forward slashes to backslashes.
    expect(url).toContain('abc123.mp3')
    expect(url.startsWith('file://')).toBe(true)
  })

  it('deletes a stored file', async () => {
    const data = Buffer.from('to delete')
    await provider.put('deleteme.txt', data, 'text/plain')

    // # File should exist before delete.
    const beforeStat = await stat(join(tempDir, 'deleteme.txt'))
    expect(beforeStat.isFile()).toBe(true)

    // # Delete the file.
    await provider.delete('deleteme.txt')

    // # File should not exist after delete.
    await expect(stat(join(tempDir, 'deleteme.txt'))).rejects.toThrow()
  })

  it('delete is idempotent for non-existent files', async () => {
    // # Deleting a file that doesn't exist should not throw.
    await expect(provider.delete('nonexistent.txt')).resolves.toBeUndefined()
  })
})
