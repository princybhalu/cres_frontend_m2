import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when error is caught
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700">
          <h2 className="text-xl font-bold">Something went wrong.</h2>
          <p>We're working to fix the issue. Please try again later.</p>
        </div>
      );
    }

    // Render the children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
