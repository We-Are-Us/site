import * as React from 'react';
import { boolean } from 'joi';

const logErrorToMyService = (error: Error, info: string) => {
  // tslint:disable-next-line:no-console
  console.error(info, error);
};

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container pt-5">
          <h1 className="h1 text-center">Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
