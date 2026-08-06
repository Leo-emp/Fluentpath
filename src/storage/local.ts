// # Local filesystem storage — used in dev when R2 is not configured.
// # Stores files in a local directory and serves them via file:// URLs.

import { writeFile, unlink, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import type { StorageProvider } from './types'

export function createLocalProvider(baseDir: string): StorageProvider {
  return {
    async put(key, data, _contentType) {
      // # Ensure the directory exists for nested keys like audio/item1/v1.mp3.
      const filePath = join(baseDir, key)
      const dir = dirname(filePath)
      await mkdir(dir, { recursive: true })

      await writeFile(filePath, data)
      return `file://${filePath}`
    },

    getUrl(key) {
      return `file://${join(baseDir, key)}`
    },

    async delete(key) {
      const filePath = join(baseDir, key)
      await unlink(filePath).catch(() => {
        // # Ignore if file doesn't exist — delete is idempotent.
      })
    },
  }
}
