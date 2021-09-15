/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React from 'react';

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundry">
          <span className="icon">:-(</span>
          <span className="title">Opps! Something Went Wrong.</span>
          <span className="desc">
            Whatever happpend, it was probably our fault. Please contact
            administrator.
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
