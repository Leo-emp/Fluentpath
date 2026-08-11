import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vocabulary',
  description: '1,250+ English vocabulary entries across 25 categories — business, travel, medicine, technology, and more. CEFR A1 to C2.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
