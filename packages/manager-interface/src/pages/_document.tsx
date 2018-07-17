import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import flush from 'styled-jsx/server';

const csp =
  "default-src 'self' 'unsafe-inline'; \
connect-src http://localhost:8545; \
font-src data: file:;";

export default class MyDocument extends Document {
  public static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context);
    const styles = flush();
    return { ...initialProps, styles };
  }

  public render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          {global.isElectron && (
            <meta http-equiv="Content-Security-Policy" content={csp} />
          )}
          <link rel="manifest" href="./static/manifest.json" />
          <link rel="shortcut icon" href="./static/favicon.png?v=2" />
          <link rel="stylesheet" href="./static/css/semantic.min.css" />
          <link rel="stylesheet" href="./static/css/overwrites.css" />
          {!global.isElectron && <script src="./static/tracking.js" />}
          <title>Melon Olympiad</title>
        </Head>
        <body>
          <Main />
          <NextScript />

          <div
            style={{
              textAlign: 'center',
              marginTop: '2em',
              marginBottom: '2em',
            }}
          >
            Hosted with ❤ on IPFS |
            <a
              href="https://github.com/melonproject/melon-labs/issues"
              target="_blank"
            >
              {' '}
              Report an issue
            </a>{' '}
            |
            <a href="https://www.melonport.com" target="_blank">
              {' '}
              Melonport
            </a>
          </div>
        </body>
      </html>
    );
  }
}
