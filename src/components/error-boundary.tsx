'use client'

// # Error boundary — catches rendering errors in child components.
// # Wraps the (app) layout so a single page crash doesn't blank the whole app.
// # React error boundaries require class components (no hook equivalent yet).

import { Component, type ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // # Initial state — no error.
    this.state = { hasError: false, error: null }
  }

  // # React lifecycle — called when a child throws during render.
  // # Returns new state to trigger the fallback UI.
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  // # Reset error state so the user can retry rendering.
  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  override render() {
    // # If a child threw, show a friendly error card instead of a blank screen.
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center px-6">
          <Card className="max-w-md border border-border p-8 text-center">
            <h2 className="mb-2 font-serif text-2xl font-bold">
              Something went wrong
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              An unexpected error occurred. Please try again.
            </p>
            <Button onClick={this.handleRetry}>
              Try Again
            </Button>
          </Card>
        </main>
      )
    }

    // # No error — render children normally.
    return this.props.children
  }
}
