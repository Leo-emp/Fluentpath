// Thrown when a required field is missing or has the wrong type.
// Route handlers catch this and return 400.
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Require a string field. Throws ValidationError if missing or not a string.
export function requireString(body: Record<string, unknown>, field: string): string {
  const value = body[field]
  if (typeof value !== 'string' || value.length === 0) {
    throw new ValidationError(`"${field}" is required and must be a non-empty string.`)
  }
  return value
}

// Require a number field. Throws ValidationError if missing or not a number.
export function requireNumber(body: Record<string, unknown>, field: string): number {
  const value = body[field]
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new ValidationError(`"${field}" is required and must be a number.`)
  }
  return value
}

// Optional number — returns undefined if the field is absent.
export function optionalNumber(body: Record<string, unknown>, field: string): number | undefined {
  if (!(field in body) || body[field] === undefined || body[field] === null) return undefined
  const value = body[field]
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new ValidationError(`"${field}" must be a number when provided.`)
  }
  return value
}

// Optional array — returns undefined if the field is absent.
export function optionalArray(body: Record<string, unknown>, field: string): unknown[] | undefined {
  if (!(field in body) || body[field] === undefined || body[field] === null) return undefined
  const value = body[field]
  if (!Array.isArray(value)) {
    throw new ValidationError(`"${field}" must be an array when provided.`)
  }
  return value
}

// Optional object — returns undefined if the field is absent.
export function optionalObject(body: Record<string, unknown>, field: string): Record<string, unknown> | undefined {
  if (!(field in body) || body[field] === undefined || body[field] === null) return undefined
  const value = body[field]
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new ValidationError(`"${field}" must be an object when provided.`)
  }
  return value as Record<string, unknown>
}

// Require an array field. Throws ValidationError if missing or not an array.
export function requireArray(body: Record<string, unknown>, field: string): unknown[] {
  const value = body[field]
  if (!Array.isArray(value)) {
    throw new ValidationError(`"${field}" is required and must be an array.`)
  }
  return value
}
