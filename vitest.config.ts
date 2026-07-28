import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      // `import.meta.dirname` rather than `__dirname` — this project is ESM.
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
