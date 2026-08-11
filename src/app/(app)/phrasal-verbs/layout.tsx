import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Phrasal Verbs',
  description: '150+ English phrasal verbs organised by profession — meanings, examples, separability, and formal equivalents.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
