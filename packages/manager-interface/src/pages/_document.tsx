if (process.env.NODE_ENV === 'production') {
  require('dotenv-extended').config();
}

import Document, { Head, Main, NextScript } from "next/document";
import flush from 'styled-jsx/server';
import React from 'react';
import spriteBuild from 'svg-sprite-loader/runtime/sprite.build';

const sprites = spriteBuild.stringify();

const csp =
  "default-src 'self' 'unsafe-inline'; \
connect-src http://localhost:8545; \
font-src data: file:;";

const env = [
  'GRAPHQL_REMOTE_WS',
  'GRAPHQL_REMOTE_HTTP',
  'JSON_RPC_ENDPOINT',
  'TRACK',
].map((key) => `window.${key}=${JSON.stringify(process.env[key])};`).join('');

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
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
          {ELECTRON && (
            <meta http-equiv="Content-Security-Policy" content={csp} />
          )}
          <link rel="manifest" href="./static/manifest.json" />
          <link rel="shortcut icon" href="./static/favicon.png?v=2" />
          {!ELECTRON && <script src="./static/tracking.js" />}
          <title>Melon Olympiad</title>
        </Head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: sprites }} />
          <Main />
          <script dangerouslySetInnerHTML={{ __html: env }} />
          <NextScript />
        </body>
      </html>
    );
  }
}
