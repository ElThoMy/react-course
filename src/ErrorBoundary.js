import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false};
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // I log this to Sentry, Azure Monitor, New Relic, TrackJS...
    console.error("ErrorBoundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true}), 5000);
  }

  render () {
    if(this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This Listing has an error.
          <Link to="/">Click here to go back to the homepage</Link>
        </h2>
      );
    }
    return this.props.children;
  }
};

export default ErrorBoundary;
