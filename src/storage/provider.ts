// # Storage factory — returns R2 when env vars are set, local filesystem otherwise.
// # This is the only place that decides which backend to use.

import type { StorageProvider } from './types'
import { createR2Provider } from './r2'
import { createLocalProvider } from './local'

// # Singleton — created once and reused across the app lifetime.
let _provider: StorageProvider | null = null

export function getStorageProvider(): StorageProvider {
  if (_provider) return _provider

  // # Check for R2 configuration. All 5 env vars must be present.
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucketName = process.env.R2_BUCKET_NAME
  const publicUrlBase = process.env.R2_PUBLIC_URL

  if (accountId && accessKeyId && secretAccessKey && bucketName && publicUrlBase) {
    // # All R2 env vars present — use Cloudflare R2.
    _provider = createR2Provider({
      accountId,
      accessKeyId,
      secretAccessKey,
      bucketName,
      publicUrlBase,
    })
  } else {
    // # Missing R2 config — fall back to local filesystem for dev.
    _provider = createLocalProvider('.storage')
  }

  return _provider
}

// # Reset for tests — allows injecting a mock provider.
export function _resetStorageProvider(): void {
  _provider = null
}
