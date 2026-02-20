import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '2rem auto',
          background: '#131a24',
          border: '1px solid #2a3544',
          borderRadius: '12px',
          color: '#e6e1cf'
        }}>
          <h2 style={{ color: '#f07178', marginBottom: '1rem' }}>Something went wrong</h2>
          <pre style={{ fontSize: '0.85rem', overflow: 'auto', color: '#8b949e' }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#39bae6',
              color: '#0a0e14',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
