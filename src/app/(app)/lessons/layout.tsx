import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lessons',
  description: 'Browse 987 structured English lessons from A1 to C2 — grammar, reading, writing, speaking, listening, and vocabulary.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
