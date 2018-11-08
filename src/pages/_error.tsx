import React, { Component } from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';

export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode, ...props } = this.props;

    switch (statusCode) {
      case 404:
      case 403: {
        return (
          <DefaultTemplate {...props} title="Page not found">
            <p>The page you are looking for does not exist or you do not have access to it.</p>
          </DefaultTemplate>
        );
      }

      default: {
        return (
          <DefaultTemplate {...props} title="Error">
            <p>An unknown error occurred.</p>
          </DefaultTemplate>
        );
      }
    }
  }
}