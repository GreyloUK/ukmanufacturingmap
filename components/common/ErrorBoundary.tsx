import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useThemeStore } from '../../store/themeStore';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  isDarkMode?: boolean;
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

      const isDarkMode = this.props.isDarkMode ?? false;
      
      return (
        <div className={`rounded-lg p-6 m-4 border ${isDarkMode ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <svg className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>Something went wrong</h2>
          </div>
          <p className={`${isDarkMode ? 'text-red-200' : 'text-red-700'} mb-4`}>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          {this.state.error && (
            <details className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
              <summary className="cursor-pointer font-medium mb-2">Error details</summary>
              <pre className={`p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap break-words ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
                {sanitizedMessage}
              </pre>
            </details>
          )}
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-4 py-2 rounded-lg transition-colors text-white ${isDarkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'}`}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide theme support to the class component
const ThemedErrorBoundary: React.FC<Omit<Props, 'isDarkMode'>> = (props) => {
  const { isDarkMode } = useThemeStore();
  return <ErrorBoundary {...props} isDarkMode={isDarkMode} />;
};

export default ThemedErrorBoundary;