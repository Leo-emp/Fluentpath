import { NextResponse } from 'next/server'

// Return a JSON success response. Defaults to 200.
export function jsonOk(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

// Return a JSON error response with { error: message }.
export function jsonError(status: number, message: string): NextResponse {
  return NextResponse.json({ error: message }, { status })
}
