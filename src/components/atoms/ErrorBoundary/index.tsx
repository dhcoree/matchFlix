import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="glass rounded-2xl p-8 max-w-lg w-full space-y-4 text-center">
          <span className="text-5xl">💥</span>
          <h1 className="font-heading text-2xl font-bold text-foreground">Algo quebrou</h1>
          <p className="text-sm text-muted font-mono bg-surface rounded-xl p-3 text-left break-all">
            {error.message}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="px-6 py-2 rounded-xl bg-secondary text-white font-heading font-semibold text-sm hover:bg-secondary/90 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }
}
