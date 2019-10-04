import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

// const csp = process.env.NODE_ENV !== 'development' && `default-src 'self' 'unsafe-inline'; font-src data: file:;`;

export default class MyDocument extends Document {
  static getInitialProps(context) {
    return {
      ...context.renderPage(),
      styles: flush(),
    };
  }

  public render() {
    return (
      <html lang="en">
        <title>Melon Asset Management</title>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          {/* {csp ? <meta httpEquiv="Content-Security-Policy" content={csp} /> : null} */}
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/static/images/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
