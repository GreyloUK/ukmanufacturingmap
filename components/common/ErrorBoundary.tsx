import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // Sanitize error message to prevent security risks
  private sanitizeErrorMessage(error: Error): string {
    if (!error || !error.message) {
      return 'An unknown error occurred';
    }

    let message = error.message;

    // Remove potentially sensitive patterns
    const sensitivePatterns = [
      /password[s]?\s*[:=]\s*\S+/gi,
      /token[s]?\s*[:=]\s*\S+/gi,
      /key[s]?\s*[:=]\s*\S+/gi,
      /secret[s]?\s*[:=]\s*\S+/gi,
      /api[_-]?key[s]?\s*[:=]\s*\S+/gi,
      /authorization[s]?\s*[:=]\s*\S+/gi,
    ];

    sensitivePatterns.forEach(pattern => {
      message = message.replace(pattern, '[REDACTED]');
    });

    // Escape HTML characters to prevent XSS
    message = message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    // Limit message length to prevent excessively long error messages
    const maxLength = 500;
    if (message.length > maxLength) {
      message = message.substring(0, maxLength) + '... [truncated]';
    }

    // In production, show a generic message for certain error types
    if (process.env.NODE_ENV === 'production') {
      // Common error patterns that should be genericized in production
      const productionGenericPatterns = [
        /network error/i,
        /fetch.*failed/i,
        /connection.*refused/i,
        /unauthorized/i,
        /forbidden/i,
      ];

      const shouldGenericize = productionGenericPatterns.some(pattern => 
        pattern.test(message)
      );

      if (shouldGenericize) {
        return 'A technical error occurred. Please try again later.';
      }
    }

    return message;
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const sanitizedMessage = this.state.error 
        ? this.sanitizeErrorMessage(this.state.error)
        : 'An unknown error occurred';

      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
          </div>
          <p className="text-red-700 mb-4">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          {this.state.error && (
            <details className="text-sm text-red-600">
              <summary className="cursor-pointer font-medium mb-2">Error details</summary>
              <pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap break-words">
                {sanitizedMessage}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;