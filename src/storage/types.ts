// # Storage provider interface — the seam between content pipeline and storage.
// # R2 in production, local filesystem in dev. Same API for both.

export interface StorageProvider {
  // # Upload a file and return its public URL.
  put(key: string, data: Buffer | Uint8Array, contentType: string): Promise<string>

  // # Get the public URL for a stored file.
  getUrl(key: string): string

  // # Delete a file by key.
  delete(key: string): Promise<void>
}

// # Configuration for Cloudflare R2 (S3-compatible).
export interface R2Config {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  // # Public URL prefix for the bucket (custom domain or R2 public URL).
  publicUrlBase: string
}
