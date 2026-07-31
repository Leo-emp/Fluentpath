'use client'

// # Thin API fetch wrapper — handles 401 redirects and 429 rate limiting.

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiFetch<T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    headers: { 'content-type': 'application/json', ...options?.headers },
    ...options,
  })

  // # Session expired — redirect to sign-in.
  if (res.status === 401) {
    window.location.href = '/sign-in'
    throw new ApiError(401, 'Session expired')
  }

  // # Rate limited — tell the user to slow down.
  if (res.status === 429) {
    throw new ApiError(429, 'Please wait a moment')
  }

  const data = await res.json()

  if (!res.ok) {
    throw new ApiError(res.status, data.error ?? 'Something went wrong')
  }

  return data as T
}
