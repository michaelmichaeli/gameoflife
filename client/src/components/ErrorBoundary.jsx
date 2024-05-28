import React from 'react'
import Error from './Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);

    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Error errorInfo={this.state.errorInfo} /> ?? <h1>Ooops! Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;