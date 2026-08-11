import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Path',
  description: 'Your guided English curriculum — work through grammar, reading, listening, writing, and speaking at your CEFR level.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
