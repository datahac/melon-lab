import Document, { Head, Main, NextScript } from "next/document";
import flush from 'styled-jsx/server';
import React from 'react';
import spriteBuild from 'svg-sprite-loader/runtime/sprite.build';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();
const sprites = spriteBuild.stringify();

const csp = config.isElectron && (require('electron-is-dev') ?
  `default-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src http://localhost:3000 ${config.jsonRpcEndpoint}; font-src data: http://localhost:3000;` :
  `default-src 'self' 'unsafe-inline'; connect-src ${config.jsonRpcEndpoint}; font-src data: file:;`
);

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, buildManifest } = renderPage();
    const styles = flush();
    return { html, head, styles, buildManifest };
  }

  public render() {
    return (
      <html lang="en">
        <title>Melon Asset Management</title>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {csp && <meta httpEquiv="Content-Security-Policy" content={csp} /> || null}
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/static/images/favicon.png" />
        </Head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: sprites }} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
