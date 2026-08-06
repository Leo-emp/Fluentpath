// # Cloudflare R2 storage — production content storage.
// # R2 is S3-compatible with zero egress fees (spec §4.1).
// # All files get one-year immutable cache headers (spec §4b).

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import type { StorageProvider, R2Config } from './types'

export function createR2Provider(config: R2Config): StorageProvider {
  // # R2 uses the S3-compatible API with a Cloudflare-specific endpoint.
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  })

  return {
    async put(key, data, contentType) {
      await client.send(
        new PutObjectCommand({
          Bucket: config.bucketName,
          Key: key,
          Body: data,
          ContentType: contentType,
          // # Immutable cache: versioned URLs never change (spec §4b).
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      )
      return `${config.publicUrlBase}/${key}`
    },

    getUrl(key) {
      return `${config.publicUrlBase}/${key}`
    },

    async delete(key) {
      await client.send(
        new DeleteObjectCommand({
          Bucket: config.bucketName,
          Key: key,
        }),
      )
    },
  }
}
