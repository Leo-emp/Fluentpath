import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grammar Reference',
  description: '120+ English grammar patterns with examples — tenses, conditionals, modals, passive voice, and more. CEFR A1 to C2.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
