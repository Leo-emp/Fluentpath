import type { NextConfig } from 'next'
import withSerwistInit from '@serwist/next'

// # Disable Serwist in dev — it doesn't support Turbopack.
const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV !== 'production',
})

const nextConfig: NextConfig = {
  // # Empty turbopack config lets Next.js 16 accept Serwist's webpack plugin.
  turbopack: {},
  experimental: {
    useTypeScriptCli: true,
  },
}

export default withSerwist(nextConfig)
