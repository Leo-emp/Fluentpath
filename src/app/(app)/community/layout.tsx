import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Discuss IELTS, PTE, OET strategies and English learning with other FluentPath learners.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
