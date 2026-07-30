import { randomUUID } from 'node:crypto'

/**
 * Generate a unique ID for database records.
 *
 * Uses Node.js built-in crypto.randomUUID() — no external dependencies.
 * Returns a standard UUID v4 string (36 chars, e.g. '550e8400-e29b-41d4-a716-446655440000').
 */
export function generateId(): string {
  return randomUUID()
}
